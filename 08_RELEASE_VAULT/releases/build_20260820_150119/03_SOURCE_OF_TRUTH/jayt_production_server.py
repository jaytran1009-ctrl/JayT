# -*- coding: utf-8 -*-
"""
JAYT APEX PRODUCTION SERVER — RUNTIME-ACTIVE RELEASE POINTER COMPLIANT
"""
import os
import json
import time
import hashlib
import http.server
from urllib.parse import urlparse

PORT = int(os.environ.get("PORT", 8080))
START_TIME = time.time()
GOLDEN_MASTER_FILE = "index.html"

def get_active_build_metadata():
    """Đọc build_id và build_manifest_hash từ BUILD_MANIFEST.json nếu có."""
    cur_dir = os.path.dirname(os.path.abspath(__file__))
    parent_dir = os.path.dirname(cur_dir)
    manifest_file = os.path.join(parent_dir, "BUILD_MANIFEST.json")
    
    build_id = "LOCAL_DEVELOPMENT_BUILD"
    manifest_hash = "UNTRACKED_DEV_HASH"
    
    if os.path.exists(manifest_file):
        try:
            with open(manifest_file, "r", encoding="utf-8") as f:
                data = json.load(f)
                build_id = data.get("build_id", build_id)
            with open(manifest_file, "rb") as f:
                manifest_hash = hashlib.sha256(f.read()).hexdigest()
        except Exception:
            pass
    return build_id, manifest_hash

class JayTProductionHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, format, *args):
        pass

    def do_GET(self):
        parsed = urlparse(self.path)
        
        if parsed.path in ("/", "/index.html", "/app"):
            if os.path.exists(GOLDEN_MASTER_FILE):
                self.send_response(200)
                self.send_header("Content-Type", "text/html; charset=utf-8")
                self.send_header("X-JayT-Environment", "RENDER_CLOUD_STAGING")
                self.end_headers()
                with open(GOLDEN_MASTER_FILE, "rb") as f:
                    self.wfile.write(f.read())
                return
            else:
                self.send_error(404, "Index Not Found")
                return
                
        elif parsed.path in ("/health", "/healthz"):
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.end_headers()
            
            build_id, manifest_hash = get_active_build_metadata()
            health_data = {
                "status": "UP",
                "active_build_id": build_id,
                "build_manifest_hash": manifest_hash,
                "uptime_seconds": round(time.time() - START_TIME, 2),
                "environment": "RENDER_CLOUD_STAGING",
                "server_root": os.path.abspath(os.getcwd())
            }
            self.wfile.write(json.dumps(health_data, ensure_ascii=False, indent=2).encode("utf-8"))
            return
            
        elif parsed.path == "/api/truth-status":
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.end_headers()
            build_id, manifest_hash = get_active_build_metadata()
            self.wfile.write(json.dumps({
                "system_status": "ONLINE",
                "active_build_id": build_id,
                "manifest_hash": manifest_hash
            }).encode("utf-8"))
            return
            
        else:
            return super().do_GET()

if __name__ == "__main__":
    server_address = ("", PORT)
    httpd = http.server.ThreadingHTTPServer(server_address, JayTProductionHTTPRequestHandler)
    print(f"JAYT Production Server listening on port {PORT}")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass
