# -*- coding: utf-8 -*-
"""
JAYT RUNTIME SUPERVISOR — STRICT SECRET GOVERNANCE & SWITCH LIFECYCLE TRACKER
=============================================================================
1. Stable HTTP Reverse Proxy lắng nghe trên PROXY_PORT.
2. Quản lý 2 slot: Slot A (8941) và Slot B (8942) với Active Request Counter.
3. Fail-Closed Secret Governance: Không có secret hardcode/fallback trong mã nguồn.
   Server con kế thừa JAYT_TOKEN_SECRET trực tiếp từ biến môi trường của Supervisor.
4. Ghi nhận chính xác dòng thời gian chuyển mạch (Switch Lifecycle Timeline)
   gồm: pointer_detected_at, standby_healthy_at, traffic_switched_at, drain_completed_at.
5. Quản lý trạng thái DEGRADED và Structured Alert khi Drain Deadline quá hạn.
=============================================================================
"""
import os
import sys
import time
import json
import traceback
import threading
import subprocess
import urllib.request
import urllib.error
import http.server
from datetime import datetime, timezone

if sys.stdout and hasattr(sys.stdout, 'reconfigure'):
    try: sys.stdout.reconfigure(encoding='utf-8')
    except Exception: pass
if sys.stderr and hasattr(sys.stderr, 'reconfigure'):
    try: sys.stderr.reconfigure(encoding='utf-8')
    except Exception: pass

SUPERVISOR_DIR = os.path.dirname(os.path.abspath(__file__))
VAULT_ROOT = os.path.dirname(SUPERVISOR_DIR)
POINTER_FILE = os.path.join(VAULT_ROOT, "releases", "active_release_pointer.json")
ERROR_LOG_FILE = os.path.join(VAULT_ROOT, "SUPERVISOR_ERROR_LOG.jsonl")
ALERTS_LOG_FILE = os.path.join(VAULT_ROOT, "SUPERVISOR_ALERTS.jsonl")

class JayTBlueGreenSupervisor:
    def __init__(self, proxy_port=8940, slot_a_port=8941, slot_b_port=8942):
        self.proxy_port = proxy_port
        self.slots = {
            "SLOT_A": {"port": slot_a_port, "process": None, "build_id": None, "build_path": None, "active_requests": 0},
            "SLOT_B": {"port": slot_b_port, "process": None, "build_id": None, "build_path": None, "active_requests": 0}
        }
        self.active_slot_name = None
        self.system_status = "INITIALIZING"
        self.lock = threading.Lock()
        self.running = True
        self.last_pointer_mtime = 0
        self.last_seen_build_id = None
        self.daemon_thread = None
        
        # Switch lifecycle event ledger
        self.switch_history = []
        self.latest_switch_event = None
        self.switch_condition = threading.Condition(self.lock)

    def log_supervisor_error(self, event_type, exc):
        error_entry = {
            "timestamp_utc": datetime.now(timezone.utc).isoformat(),
            "event_type": event_type,
            "error_class": exc.__class__.__name__,
            "error_message": str(exc),
            "traceback": traceback.format_exc(),
            "active_slot": self.active_slot_name,
            "last_seen_build_id": self.last_seen_build_id,
            "system_status": self.system_status
        }
        try:
            with open(ERROR_LOG_FILE, "a", encoding="utf-8") as f:
                f.write(json.dumps(error_entry) + "\n")
        except Exception:
            pass
        print(f"[SUPERVISOR-STRUCTURED-ERROR] {event_type}: {exc}", file=sys.stderr)

    def log_supervisor_alert(self, alert_type, message, details=None):
        alert_entry = {
            "timestamp_utc": datetime.now(timezone.utc).isoformat(),
            "alert_type": alert_type,
            "message": message,
            "system_status": self.system_status,
            "details": details or {}
        }
        try:
            with open(ALERTS_LOG_FILE, "a", encoding="utf-8") as f:
                f.write(json.dumps(alert_entry) + "\n")
        except Exception:
            pass
        print(f"[SUPERVISOR-ALERT] {alert_type}: {message}", file=sys.stderr)

    def read_pointer(self):
        if not os.path.exists(POINTER_FILE):
            return None, None
        try:
            with open(POINTER_FILE, "r", encoding="utf-8-sig") as f:
                data = json.load(f)
                return data.get("active_build_id"), data.get("active_build_path")
        except Exception as e:
            self.log_supervisor_error("READ_POINTER_FAILED", e)
            return None, None

    def probe_health(self, port, expected_build_id, timeout=4):
        url = f"http://127.0.0.1:{port}/readyz"
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "JayTSupervisor/2.0"})
            with urllib.request.urlopen(req, timeout=timeout) as resp:
                if resp.status == 200:
                    data = json.loads(resp.read().decode("utf-8"))
                    # FAIL CLOSED: Kiểm tra bắt buộc secret_configured == True
                    if (data.get("status") == "READY" and data.get("ready") is True and 
                        data.get("active_build_id") == expected_build_id and 
                        data.get("secret_configured") is True):
                        return True, data
                    else:
                        return False, f"SECRET_NOT_CONFIGURED_OR_BUILD_MISMATCH: {data}"
        except Exception as e:
            return False, str(e)
        return False, "UNKNOWN_HEALTH_RESPONSE"

    def spawn_slot_process(self, build_path, port):
        server_py = os.path.join(build_path, "03_SOURCE_OF_TRUTH", "jayt_production_server.py")
        if not os.path.exists(server_py):
            raise FileNotFoundError(f"Không tìm thấy server.py tại: {server_py}")
        
        # Kế thừa biến môi trường (bao gồm JAYT_TOKEN_SECRET do caller cấp, KHÔNG hardcode)
        env = os.environ.copy()
        env["PORT"] = str(port)
        
        proc = subprocess.Popen(
            [sys.executable, server_py],
            cwd=os.path.dirname(server_py),
            env=env,
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL
        )
        return proc

    def drain_and_terminate_slot_async(self, slot_name, slot_info, switch_event, drain_timeout=3.0):
        def _drain_worker():
            t0 = time.time()
            proc = slot_info.get("process")
            if not proc or proc.poll() is not None:
                return

            print(f"[SUPERVISOR-DRAIN] Bắt đầu Graceful Draining cho {slot_name} (Timeout {drain_timeout}s)...")
            switch_event["drain_started_at_utc"] = datetime.now(timezone.utc).isoformat()
            
            in_flight = 0
            while time.time() - t0 < drain_timeout:
                with self.lock:
                    in_flight = slot_info.get("active_requests", 0)
                if in_flight <= 0:
                    break
                time.sleep(0.05)

            elapsed = round(time.time() - t0, 3)
            switch_event["drain_completed_at_utc"] = datetime.now(timezone.utc).isoformat()
            switch_event["drain_duration_seconds"] = elapsed

            if in_flight > 0:
                self.system_status = "DEGRADED"
                switch_event["system_status"] = "DEGRADED"
                self.log_supervisor_alert(
                    "DRAIN_DEADLINE_EXCEEDED",
                    f"Slot {slot_name} còn {in_flight} active requests sau {elapsed}s. Giữ nguyên slot không hủy!",
                    {"slot_name": slot_name, "in_flight_requests": in_flight, "elapsed_seconds": elapsed}
                )
                return

            print(f"[SUPERVISOR-DRAIN] {slot_name} hoàn tất draining sau {elapsed}s. Đóng tiến trình an toàn.")
            try:
                proc.terminate()
                proc.wait(timeout=2)
            except Exception:
                try: proc.kill()
                except Exception: pass

        t = threading.Thread(target=_drain_worker, daemon=True)
        t.start()

    def perform_blue_green_switch(self):
        build_id, build_path = self.read_pointer()
        if not build_id or not build_path or not os.path.exists(build_path):
            return False

        with self.lock:
            if self.active_slot_name:
                active_info = self.slots[self.active_slot_name]
                if active_info["build_id"] == build_id and active_info["process"] and active_info["process"].poll() is None:
                    return True

            standby_slot_name = "SLOT_B" if self.active_slot_name == "SLOT_A" else "SLOT_A"
            standby_slot = self.slots[standby_slot_name]
            target_port = standby_slot["port"]

            switch_event = {
                "target_build_id": build_id,
                "target_slot": standby_slot_name,
                "pointer_detected_at_utc": datetime.now(timezone.utc).isoformat(),
                "standby_spawned_at_utc": None,
                "standby_healthy_at_utc": None,
                "traffic_switched_at_utc": None,
                "drain_started_at_utc": None,
                "drain_completed_at_utc": None,
                "system_status": "HEALTHY"
            }

            print(f"[SUPERVISOR] Kích hoạt Blue-Green Deploy trên {standby_slot_name} (Port {target_port}) với Build: {build_id}")

            try:
                new_proc = self.spawn_slot_process(build_path, target_port)
                switch_event["standby_spawned_at_utc"] = datetime.now(timezone.utc).isoformat()
            except Exception as e:
                self.log_supervisor_error("SPAWN_SLOT_FAILED", e)
                return False

            time.sleep(0.9)
            ok, res = self.probe_health(target_port, build_id)
            if not ok:
                self.log_supervisor_error("STANDBY_HEALTH_PROBE_FAILED", Exception(f"Health error: {res}"))
                new_proc.kill()
                return False

            switch_event["standby_healthy_at_utc"] = datetime.now(timezone.utc).isoformat()

            # Đổi traffic sang Standby Slot nguyên tử
            old_slot_name = self.active_slot_name
            standby_slot["process"] = new_proc
            standby_slot["build_id"] = build_id
            standby_slot["build_path"] = build_path
            self.active_slot_name = standby_slot_name
            self.last_seen_build_id = build_id
            self.system_status = "HEALTHY"
            switch_event["traffic_switched_at_utc"] = datetime.now(timezone.utc).isoformat()

            print(f"[SUPERVISOR-SUCCESS] ĐÃ CHUYỂN TRAFFIC SANG {standby_slot_name} (Port {target_port}) — ZERO DOWNTIME!")

            # Thực thi Graceful Draining cho Slot cũ
            if old_slot_name:
                old_info = self.slots[old_slot_name]
                self.drain_and_terminate_slot_async(old_slot_name, old_info, switch_event, drain_timeout=3.5)

            self.latest_switch_event = switch_event
            self.switch_history.append(switch_event)
            self.switch_condition.notify_all()
            return True

    def wait_for_switch_completion(self, target_build_id, timeout=10.0):
        """Chờ sự kiện switch hoàn tất được phát đi từ Supervisor."""
        t0 = time.time()
        with self.lock:
            while time.time() - t0 < timeout:
                if (self.latest_switch_event and 
                    self.latest_switch_event.get("target_build_id") == target_build_id and 
                    self.latest_switch_event.get("traffic_switched_at_utc")):
                    return True, self.latest_switch_event
                self.switch_condition.wait(timeout=0.2)
        return False, self.latest_switch_event

    def daemon_watch_loop(self, interval=0.5):
        while self.running:
            try:
                if os.path.exists(POINTER_FILE):
                    current_mtime = os.path.getmtime(POINTER_FILE)
                    if current_mtime != self.last_pointer_mtime:
                        self.last_pointer_mtime = current_mtime
                        build_id, _ = self.read_pointer()
                        if build_id and build_id != self.last_seen_build_id:
                            self.perform_blue_green_switch()
            except Exception as e:
                self.log_supervisor_error("DAEMON_WATCH_LOOP_EXCEPTION", e)
            time.sleep(interval)

    def start_daemon_watcher(self, interval=0.5):
        self.daemon_thread = threading.Thread(target=self.daemon_watch_loop, args=(interval,), daemon=True)
        self.daemon_thread.start()
        print(f"[SUPERVISOR] Vòng lặp Daemon Watcher đang giám sát {POINTER_FILE} (Interval {interval}s)")

    def create_proxy_handler(self):
        sup = self
        class ProxyRequestHandler(http.server.BaseHTTPRequestHandler):
            def log_message(self, format, *args):
                pass
            def do_GET(self):
                with sup.lock:
                    if not sup.active_slot_name:
                        self.send_error(503, "Service Unavailable - No Active Slot")
                        return
                    target_slot_name = sup.active_slot_name
                    target_slot = sup.slots[target_slot_name]
                    target_port = target_slot["port"]
                    active_build = target_slot["build_id"]
                    target_slot["active_requests"] += 1

                try:
                    target_url = f"http://127.0.0.1:{target_port}{self.path}"
                    req = urllib.request.Request(target_url, headers=dict(self.headers))
                    with urllib.request.urlopen(req, timeout=8) as resp:
                        self.send_response(resp.status)
                        for header, val in resp.getheaders():
                            self.send_header(header, val)
                        self.send_header("X-JayT-Served-Slot", target_slot_name)
                        self.send_header("X-JayT-Served-Build", str(active_build))
                        self.end_headers()
                        self.wfile.write(resp.read())
                except urllib.error.HTTPError as he:
                    self.send_response(he.code)
                    for header, val in he.headers.items():
                        self.send_header(header, val)
                    self.end_headers()
                    self.wfile.write(he.read())
                except Exception as e:
                    self.send_error(502, f"Bad Gateway: {str(e)}")
                finally:
                    with sup.lock:
                        target_slot["active_requests"] -= 1

        return ProxyRequestHandler

    def start_proxy_server(self):
        handler_class = self.create_proxy_handler()
        self.proxy_httpd = http.server.ThreadingHTTPServer(("", self.proxy_port), handler_class)
        self.proxy_thread = threading.Thread(target=self.proxy_httpd.serve_forever, daemon=True)
        self.proxy_thread.start()
        print(f"[SUPERVISOR] Stable Traffic Reverse Proxy đang lắng nghe trên cổng {self.proxy_port}")

    def stop_all(self):
        self.running = False
        if hasattr(self, 'proxy_httpd'):
            self.proxy_httpd.shutdown()
        for sname, sinfo in self.slots.items():
            if sinfo["process"] and sinfo["process"].poll() is None:
                sinfo["process"].terminate()
                try:
                    sinfo["process"].wait(timeout=2)
                except Exception:
                    sinfo["process"].kill()
        print("[SUPERVISOR] Toàn bộ Proxy và Child Processes đã đóng an toàn.")

if __name__ == "__main__":
    sup = JayTBlueGreenSupervisor(proxy_port=8940, slot_a_port=8941, slot_b_port=8942)
    sup.start_proxy_server()
    sup.perform_blue_green_switch()
    sup.start_daemon_watcher()
    if "--once" in sys.argv:
        sup.stop_all()
        sys.exit(0)

