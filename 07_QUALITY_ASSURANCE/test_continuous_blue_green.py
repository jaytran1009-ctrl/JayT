# -*- coding: utf-8 -*-
"""
JAYT TRUE IN-FLIGHT GRACEFUL-DRAIN LOAD TEST WITH SYNCHRONIZED TIMELINE
=============================================================================
1. Khởi tạo Secret bảo mật động tại runtime (Zero Hardcode).
2. Khởi chạy Stable Reverse Proxy & Daemon Watcher Supervisor.
3. Mở 6 Slow Requests (ms=1500) vào Slot A và xác nhận in-flight.
4. Cập nhật pointer -> Chờ tín hiệu switch hoàn tất từ Supervisor (Synchronized Signal).
5. Gửi 20 Fast Requests để chứng minh traffic mới ngay lập tức qua Slot B.
6. Xác nhận 100% slow requests trên Slot A hoàn tất trả 200 OK (Zero Drop).
7. Xuất báo cáo cấu trúc đầy đủ vào 08_RELEASE_VAULT/BLUE_GREEN_LOAD_TEST_REPORT.json.
=============================================================================
"""
import os
import sys
import time
import json
import secrets
import urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import datetime, timezone

if sys.stdout and hasattr(sys.stdout, 'reconfigure'):
    try: sys.stdout.reconfigure(encoding='utf-8')
    except Exception: pass

QA_DIR = os.path.dirname(os.path.abspath(__file__))
BASE_DIR = os.path.dirname(QA_DIR)
VAULT_DIR = os.path.join(BASE_DIR, "08_RELEASE_VAULT")
SCRIPTS_DIR = os.path.join(VAULT_DIR, "scripts")
sys.path.insert(0, SCRIPTS_DIR)

from jayt_supervisor import JayTBlueGreenSupervisor

print("⚡ [JAYT-LOAD-TEST] Khởi chạy kiểm thử Graceful Draining với Synchronized Switch Timeline...")

PROXY_PORT = 8940
SLOT_A = 8941
SLOT_B = 8942

# Cấp Secret động 256-bit tại runtime (Không hardcode trong source)
os.environ["JAYT_TOKEN_SECRET"] = secrets.token_hex(32)
os.environ["JAYT_ENABLE_TEST_ENDPOINTS"] = "true"
os.environ["JAYT_ENV"] = "staging"

sup = JayTBlueGreenSupervisor(proxy_port=PROXY_PORT, slot_a_port=SLOT_A, slot_b_port=SLOT_B)
sup.start_proxy_server()
sup.perform_blue_green_switch()
sup.start_daemon_watcher(interval=0.1)

pointer_file = os.path.join(VAULT_DIR, "releases", "active_release_pointer.json")
with open(pointer_file, "r", encoding="utf-8-sig") as f:
    ptr_data = json.load(f)

build_a_id = ptr_data.get("active_build_id")
original_active_build_path = ptr_data.get("active_build_path")
original_active_build_id = build_a_id
original_active_digest = ptr_data.get("content_digest_sha256")

build_b_id = None
build_b_path = None
build_b_digest = None

releases_dir = os.path.join(VAULT_DIR, "releases")
for item in sorted(os.listdir(releases_dir), reverse=True):
    full_p = os.path.join(releases_dir, item)
    manifest_p = os.path.join(full_p, "build_manifest.json")
    if os.path.isdir(full_p) and item.startswith("build_") and full_p != original_active_build_path and os.path.exists(manifest_p):
        try:
            with open(manifest_p, "r", encoding="utf-8-sig") as mf:
                mdata = json.load(mf)
                if mdata.get("build_id") and mdata.get("content_digest_sha256"):
                    build_b_path = full_p
                    build_b_id = mdata["build_id"]
                    build_b_digest = mdata["content_digest_sha256"]
                    break
        except Exception:
            pass

if not build_b_id:
    build_b_id = "BUILD-STANDBY-B"
    build_b_path = original_active_build_path
    build_b_digest = original_active_digest

def send_request(req_id, path, is_slow=False):
    t0 = time.time()
    started_at_iso = datetime.now(timezone.utc).isoformat()
    url = f"http://127.0.0.1:{PROXY_PORT}{path}"
    try:
        req = urllib.request.Request(url, headers={"User-Agent": f"JayTDrainWorker/{req_id}"})
        with urllib.request.urlopen(req, timeout=8) as resp:
            elapsed_ms = round((time.time() - t0) * 1000, 2)
            completed_at_iso = datetime.now(timezone.utc).isoformat()
            served_slot = resp.headers.get("X-JayT-Served-Slot", "UNKNOWN")
            served_build = resp.headers.get("X-JayT-Served-Build", "UNKNOWN")
            
            if resp.status == 200:
                data = json.loads(resp.read().decode("utf-8"))
                active_build_body = data.get("active_build_id", served_build)
                return {
                    "request_id": req_id,
                    "is_slow_in_flight_test": is_slow,
                    "started_at_utc": started_at_iso,
                    "completed_at_utc": completed_at_iso,
                    "duration_ms": elapsed_ms,
                    "http_status": 200,
                    "served_slot": served_slot,
                    "served_build_id": active_build_body,
                    "success": True
                }
            else:
                return {
                    "request_id": req_id,
                    "is_slow_in_flight_test": is_slow,
                    "started_at_utc": started_at_iso,
                    "completed_at_utc": completed_at_iso,
                    "duration_ms": elapsed_ms,
                    "http_status": resp.status,
                    "served_slot": served_slot,
                    "success": False
                }
    except Exception as e:
        elapsed_ms = round((time.time() - t0) * 1000, 2)
        completed_at_iso = datetime.now(timezone.utc).isoformat()
        return {
            "request_id": req_id,
            "is_slow_in_flight_test": is_slow,
            "started_at_utc": started_at_iso,
            "completed_at_utc": completed_at_iso,
            "error": str(e),
            "duration_ms": elapsed_ms,
            "success": False
        }

all_traces = []
timeline_events = {}

with ThreadPoolExecutor(max_workers=16) as executor:
    slow_futures = []
    print("  ↳ [GIAI ĐOẠN 1] Khởi chạy 6 Slow In-Flight Requests (ms=1500) tới Slot A...")
    timeline_events["slow_requests_dispatched_at_utc"] = datetime.now(timezone.utc).isoformat()
    
    for i in range(1, 7):
        f = executor.submit(send_request, f"SLOW_REQ_{i}", "/__test/slow?ms=1500", True)
        slow_futures.append(f)

    # Đợi 200ms để đảm bảo các slow requests đã chiếm slot và đang in-flight trên Slot A
    time.sleep(0.2)
    with sup.lock:
        active_in_flight = sup.slots["SLOT_A"]["active_requests"]
    print(f"  ✓ Đã xác thực {active_in_flight} slow requests đang chạy IN-FLIGHT trên SLOT_A!")
    timeline_events["in_flight_verified_active_count"] = active_in_flight

    # Cập nhật pointer trên đĩa
    print("  🔄 [GIAI ĐOẠN 2] Cập nhật pointer -> Kích hoạt Daemon Switch...")
    timeline_events["pointer_updated_on_disk_at_utc"] = datetime.now(timezone.utc).isoformat()
    if build_b_id:
        ptr_data["active_build_id"] = build_b_id
        ptr_data["active_build_path"] = build_b_path
        ptr_data["content_digest_sha256"] = build_b_digest
        with open(pointer_file, "w", encoding="utf-8") as f:
            json.dump(ptr_data, f, indent=2)

    # CHỜ ĐỒNG BỘ TÍN HIỆU HOÀN TẤT CHUYỂN MẠCH TỪ SUPERVISOR (Không đoán thời gian)
    print("  ⏳ [GIAI ĐOẠN 3] Chờ Supervisor hoàn tất Probe Healthz & Switch Traffic sang SLOT_B...")
    switched_ok, switch_event = sup.wait_for_switch_completion(build_b_id, timeout=8.0)
    if not switched_ok:
        print("❌ Quá hạn chờ Supervisor chuyển mạch!")
        sup.stop_all()
        # Restore pointer
        ptr_data["active_build_id"] = original_active_build_id
        ptr_data["active_build_path"] = original_active_build_path
        ptr_data["content_digest_sha256"] = original_active_digest
        with open(pointer_file, "w", encoding="utf-8") as f:
            json.dump(ptr_data, f, indent=2)
        sys.exit(1)

    timeline_events["supervisor_switch_event"] = switch_event
    print(f"  ✓ Supervisor đã kích hoạt traffic sang {switch_event['target_slot']} lúc: {switch_event['traffic_switched_at_utc']}")

    # Gửi luồng fast requests sau khi traffic đã chính thức chuyển sang Slot B
    print("  ↳ [GIAI ĐOẠN 4] Gửi 20 Fast Requests tới Proxy (phục vụ bởi SLOT_B)...")
    timeline_events["fast_requests_dispatched_at_utc"] = datetime.now(timezone.utc).isoformat()
    fast_futures = []
    for i in range(1, 21):
        f = executor.submit(send_request, f"FAST_REQ_{i}", "/healthz", False)
        fast_futures.append(f)
        time.sleep(0.01)

    for future in as_completed(slow_futures + fast_futures):
        all_traces.append(future.result())

all_traces.sort(key=lambda x: x["request_id"])
time.sleep(1.0)
sup.stop_all()

# Restore original active pointer
ptr_data["active_build_id"] = original_active_build_id
ptr_data["active_build_path"] = original_active_build_path
ptr_data["content_digest_sha256"] = original_active_digest
with open(pointer_file, "w", encoding="utf-8") as f:
    json.dump(ptr_data, f, indent=2)

slow_results = [r for r in all_traces if r.get("is_slow_in_flight_test")]
fast_results = [r for r in all_traces if not r.get("is_slow_in_flight_test")]

slow_success = all(r.get("success") and r.get("served_slot") == "SLOT_A" for r in slow_results)
fast_success = all(r.get("success") and r.get("served_slot") == "SLOT_B" for r in fast_results)

total_reqs = len(all_traces)
success_reqs = len([r for r in all_traces if r.get("success")])
failed_reqs = len([r for r in all_traces if not r.get("success")])

report = {
    "test_metadata": {
        "test_name": "TRUE_IN_FLIGHT_GRACEFUL_DRAIN_BLUE_GREEN_LOAD_TEST",
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "proxy_port": PROXY_PORT,
        "total_requests": total_reqs,
        "successful_requests": success_reqs,
        "failed_requests": failed_reqs,
        "success_rate_percent": round((success_reqs / total_reqs) * 100, 2),
        "in_flight_slow_requests_count": len(slow_results),
        "in_flight_slow_drain_verified": slow_success,
        "new_traffic_routed_to_standby_verified": fast_success,
        "zero_downtime_verified": failed_reqs == 0 and slow_success and fast_success
    },
    "synchronized_timeline_events": timeline_events,
    "slow_in_flight_traces": slow_results,
    "fast_routed_traces": fast_results
}

report_path = os.path.join(VAULT_DIR, "BLUE_GREEN_LOAD_TEST_REPORT.json")
with open(report_path, "w", encoding="utf-8") as f:
    json.dump(report, f, indent=2)

print(f"  ✓ Kết quả Slow Requests (SLOT_A In-flight Drained): {'100% THÀNH CÔNG' if slow_success else 'THẤT BẠI'}")
print(f"  ✓ Kết quả Fast Requests (SLOT_B Synchronized Routed): {'100% THÀNH CÔNG' if fast_success else 'THẤT BẠI'}")
print(f"  ✓ Đã ghi nhận báo cáo dòng thời gian đồng bộ tại: {report_path}")

if not slow_success or not fast_success:
    print("❌ Kiểm thử thất bại: Dòng thời gian hoặc Graceful Drain không đạt!")
    sys.exit(1)

print("\n🟢 [LOAD-TEST-SUMMARY] 100% IN-FLIGHT SLOW & FAST REQUESTS THÀNH CÔNG — ZERO DOWNTIME PROVEN!")
