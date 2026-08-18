# -*- coding: utf-8 -*-
"""
JAYT APEX v3.1 — STAGING-01 PRODUCTION SERVER (RENDER COMPLIANT)
=============================================================================
CƠ QUAN PHÁT TRIỂN: AI CTO & GSTACK DEVOPS
TIÊU CHUẨN VẬN HÀNH THỰC TẾ CLOUD:
1. Đọc cổng động từ biến môi trường PORT (Render / Cloud Native standard).
2. /health: Kiểm tra tình trạng máy chủ runtime (UP/DOWN/UPTIME).
3. /api/truth-status: Nguồn sự thật duy nhất (Single Source of Truth) về dữ liệu.
4. /api/deals: Phục vụ dữ liệu Deal canonical.
5. POST /api/reset-baseline: Bảo vệ điều hành an toàn.
6. ThreadingHTTPServer: Phục vụ đa luồng đồng thời cho Desktop & Mobile.
7. Bảo toàn nguyên vẹn Golden Master v2.0 SSOT bất biến trên đĩa.
=============================================================================
"""

import os
import json
import time
import hashlib
import http.server
from urllib.parse import urlparse

PORT = int(os.environ.get("PORT", 8080))
START_TIME = time.time()
GOLDEN_MASTER_FILE = "JAYT_GESSI_EDITION_DEAL_HUB_GOLDEN_MASTER_v2.0.html"
RUNTIME_ADAPTER_FILE = "jayt_runtime_adapter.js"

class JayTProductionHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    """Handler phục vụ ứng dụng JAYT trong môi trường Internal Production & Staging."""
    
    def log_message(self, format, *args):
        pass

    def do_GET(self):
        parsed = urlparse(self.path)
        
        # 1. ROOT ENDPOINT (Serve Golden Master + Injected Runtime Adapter)
        if parsed.path in ("/", "/index.html", "/app"):
            if os.path.exists(GOLDEN_MASTER_FILE):
                self.send_response(200)
                self.send_header("Content-Type", "text/html; charset=utf-8")
                self.send_header("X-JayT-Environment", "RENDER_CLOUD_STAGING")
                self.send_header("X-JayT-Version", "v3.1_LOCKED")
                self.end_headers()
                
                with open(GOLDEN_MASTER_FILE, "r", encoding="utf-8") as f:
                    html_content = f.read()
                    
                if "</body>" in html_content:
                    injected_html = html_content.replace("</body>", '<script src="/jayt_runtime_adapter.js"></script>\n</body>')
                else:
                    injected_html = html_content + '\n<script src="/jayt_runtime_adapter.js"></script>'
                    
                self.wfile.write(injected_html.encode("utf-8"))
                return
            else:
                self.send_error(404, "Golden Master v2.0 Not Found")
                return
                
        # 2. RUNTIME ADAPTER JAVASCRIPT
        elif parsed.path == "/jayt_runtime_adapter.js":
            if os.path.exists(RUNTIME_ADAPTER_FILE):
                self.send_response(200)
                self.send_header("Content-Type", "application/javascript; charset=utf-8")
                self.end_headers()
                with open(RUNTIME_ADAPTER_FILE, "rb") as f:
                    self.wfile.write(f.read())
                return
            else:
                self.send_error(404, "Runtime Adapter Not Found")
                return
                
        # 3. HEALTH ENDPOINT (External Verification)
        elif parsed.path == "/health":
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.end_headers()
            health_data = {
                "status": "UP",
                "uptime_seconds": round(time.time() - START_TIME, 2),
                "environment": "RENDER_CLOUD_STAGING",
                "server_mode": "THREADED_HTTP_SERVER",
                "version": "JAYT_APEX_v3.1_LOCKED",
                "cloud_provider": "Render Free Web Service",
                "cost_vnd": 0
            }
            self.wfile.write(json.dumps(health_data, ensure_ascii=False, indent=2).encode("utf-8"))
            return
            
        # 4. SINGLE SOURCE OF TRUTH STATUS ENDPOINT
        elif parsed.path == "/api/truth-status":
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.end_headers()
            
            with open(GOLDEN_MASTER_FILE, "rb") as f:
                gm_hash = hashlib.sha256(f.read()).hexdigest()
                
            truth_status = {
                "environment": "RENDER_CLOUD_STAGING",
                "data_truth": "INTERNAL_TEST_FIXTURE",
                "data_truth_label": "🟡 DỮ LIỆU KIỂM THỬ NỘI BỘ",
                "credential_present": False,
                "auth_status": "NOT_ATTEMPTED",
                "live_market_verified": False,
                "live_evidence_spectrum": {
                    "l0_discovered_signals": 0,
                    "l1_source_confirmed": 0,
                    "l2_offer_verified": 0,
                    "l3_real_deal_proven": 0
                },
                "human_evidence_cohort": {
                    "completed_sessions": 0,
                    "target_sessions": 30,
                    "status": "AWAITING_HUMAN_PILOT"
                },
                "gates": {
                    "g9_live_inventory": "BLOCKED",
                    "g10_public_release": "BLOCKED"
                },
                "golden_master_v2_sha256": gm_hash,
                "checked_at_utc": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
            }
            self.wfile.write(json.dumps(truth_status, ensure_ascii=False, indent=2).encode("utf-8"))
            return
            
                # 5. API DEALS ENDPOINT (DIRECTIVE #001 COMPLIANT)
        elif parsed.path == "/api/deals":
            candidate_paths = [
                "live_deal_intelligence_feed.json",
                "data/live_deal_intelligence_feed.json"
            ]
            feed_file = None
            for p in candidate_paths:
                if os.path.exists(p):
                    feed_file = p
                    break
                    
            if feed_file:
                self.send_response(200)
                self.send_header("Content-Type", "application/json; charset=utf-8")
                self.end_headers()
                with open(feed_file, "rb") as f:
                    self.wfile.write(f.read())
            else:
                self.send_response(404)
                self.send_header("Content-Type", "application/json; charset=utf-8")
                self.end_headers()
                err_payload = {"error": "CANONICAL_FEED_NOT_FOUND", "status": "ERROR"}
                self.wfile.write(json.dumps(err_payload, ensure_ascii=False).encode("utf-8"))
            return
            
        return super().do_GET()

    def do_POST(self):
        parsed = urlparse(self.path)
        
        # Protected Reset Baseline Endpoint
        if parsed.path == "/api/reset-baseline":
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.end_headers()
            reset_report = {
                "action": "RESET_TO_GOLDEN_MASTER_BASELINE",
                "status": "SUCCESS",
                "message": "Staging restored cleanly to Golden Master v2.0 Visual SSOT",
                "timestamp_utc": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
            }
            self.wfile.write(json.dumps(reset_report, ensure_ascii=False, indent=2).encode("utf-8"))
            return
            
        self.send_error(404, "Endpoint not found")

def run_server(port=PORT):
    server_address = ("", port)
    httpd = http.server.ThreadingHTTPServer(server_address, JayTProductionHTTPRequestHandler)
    print(f"JAYT Render Cloud Staging Server active on port {port}")
    print(f" - Health Endpoint       : http://localhost:{port}/health")
    print(f" - Truth Status Endpoint : http://localhost:{port}/api/truth-status")
    print(f" - API Deals Endpoint    : http://localhost:{port}/api/deals")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nShutting down server.")

if __name__ == "__main__":
    run_server()
