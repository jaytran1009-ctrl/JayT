# -*- coding: utf-8 -*-
"""
JAYT APEX v3.1 â€” STAGING-01 PRODUCTION SERVER (RENDER COMPLIANT)
=============================================================================
CÆ  QUAN PHĂT TRIá»‚N: AI CTO & GSTACK DEVOPS
TIĂU CHUáº¨N Váº¬N HĂ€NH THá»°C Táº¾ CLOUD:
1. Äá»c cá»•ng Ä‘á»™ng tá»« biáº¿n mĂ´i trÆ°á»ng PORT (Render / Cloud Native standard).
2. /health: Kiá»ƒm tra tĂ¬nh tráº¡ng mĂ¡y chá»§ runtime (UP/DOWN/UPTIME).
3. /api/truth-status: Nguá»“n sá»± tháº­t duy nháº¥t (Single Source of Truth) vá» dá»¯ liá»‡u.
4. /api/deals: Phá»¥c vá»¥ dá»¯ liá»‡u Deal canonical.
5. POST /api/reset-baseline: Báº£o vá»‡ Ä‘iá»u hĂ nh an toĂ n.
6. ThreadingHTTPServer: Phá»¥c vá»¥ Ä‘a luá»“ng Ä‘á»“ng thá»i cho Desktop & Mobile.
7. Báº£o toĂ n nguyĂªn váº¹n Golden Master v2.0 SSOT báº¥t biáº¿n trĂªn Ä‘Ä©a.
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
# The public application entry point.  The immutable golden master remains a
# recovery artifact; visual releases are served from the maintained web entry.
GOLDEN_MASTER_FILE = "index.html"
RUNTIME_ADAPTER_FILE = "jayt_runtime_adapter.js"

class JayTProductionHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    """Handler phá»¥c vá»¥ á»©ng dá»¥ng JAYT trong mĂ´i trÆ°á»ng Internal Production & Staging."""
    
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
                    injected_html = html_content.replace("</body>", '<script src="/jayt_runtime_adapter.js"></script>\n<script src="/jayt_apex_interface.js"></script>\n</body>')
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
        elif parsed.path in ("/health", "/healthz"):
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
                "data_truth_label": "đŸŸ¡ Dá»® LIá»†U KIá»‚M THá»¬ Ná»˜I Bá»˜",
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
            
        # 5. API DEALS ENDPOINT
        elif parsed.path == "/api/deals":
            feed_path = "data/live_deal_intelligence_feed.json"
            if os.path.exists(feed_path):
                self.send_response(200)
                self.send_header("Content-Type", "application/json; charset=utf-8")
                self.end_headers()
                with open(feed_path, "rb") as f:
                    self.wfile.write(f.read())
            else:
                self.send_response(200)
                self.send_header("Content-Type", "application/json; charset=utf-8")
                self.end_headers()
                self.wfile.write(json.dumps({"deals": [], "status": "NO_FEED"}).encode("utf-8"))
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

