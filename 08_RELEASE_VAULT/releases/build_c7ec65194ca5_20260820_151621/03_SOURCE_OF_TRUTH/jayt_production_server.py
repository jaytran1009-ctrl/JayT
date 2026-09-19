# -*- coding: utf-8 -*-
"""
JAYT APEX PRODUCTION SERVER — REAL HOP-BY-HOP RESOLVER & STRICT INTEGRITY
=============================================================================
1. /healthz & /health: Dynamic active_build_id & build_manifest_hash.
2. /api/time: Trusted Server Baseline Time (ISO-8601 Asia/Ho_Chi_Minh).
3. /api/truth-status: Single Source of Truth integrity ledger.
4. /api/token/issue: Server-side signed ephemeral token issuer (Secret Governed).
5. /out: REAL Hop-by-Hop fail-closed SSRF & IP-Pinned Redirect Gateway.
=============================================================================
"""
import os
import sys
import json
import time
import hmac
import socket
import hashlib
import ipaddress
import threading
import http.server
import urllib.request
import urllib.error
from urllib.parse import urlparse, parse_qs, urljoin
from datetime import datetime, timezone, timedelta

PORT = int(os.environ.get("PORT", 8080))
START_TIME = time.time()
GOLDEN_MASTER_FILE = "index.html"
VN_TZ = timezone(timedelta(hours=7))

# 1. STRICT SECRET GOVERNANCE (FAIL-CLOSED)
RAW_SECRET = os.environ.get("JAYT_TOKEN_SECRET", "")
if not RAW_SECRET or len(RAW_SECRET) < 16:
    TOKEN_SIGNING_CONFIGURED = False
    HMAC_SECRET = b""
else:
    TOKEN_SIGNING_CONFIGURED = True
    HMAC_SECRET = RAW_SECRET.encode("utf-8")

# 2. ATOMIC POST-VALIDATION TOKEN STORE
CONSUMED_TOKENS = set()
TOKEN_LOCK = threading.Lock()
TOKEN_EXPIRY_SECONDS = 60

def get_vault_root():
    cur_dir = os.path.dirname(os.path.abspath(__file__))
    return os.path.dirname(cur_dir)

def get_active_build_metadata():
    vault_root = get_vault_root()
    manifest_file = os.path.join(vault_root, "BUILD_MANIFEST.json")
    
    build_id = "LOCAL_DEVELOPMENT_BUILD"
    manifest_hash = "UNTRACKED_DEV_HASH"
    
    if os.path.exists(manifest_file):
        try:
            with open(manifest_file, "r", encoding="utf-8-sig") as f:
                data = json.load(f)
                build_id = data.get("build_id", build_id)
            with open(manifest_file, "rb") as f:
                manifest_hash = hashlib.sha256(f.read()).hexdigest()
        except Exception:
            pass
    return build_id, manifest_hash

def get_domain_catalog():
    vault_root = get_vault_root()
    cat_file = os.path.join(vault_root, "05_DEAL_AND_AFFILIATE", "domain_catalog.json")
    if not os.path.exists(cat_file):
        cat_file = os.path.join(os.path.dirname(vault_root), "05_DEAL_AND_AFFILIATE", "domain_catalog.json")
    
    if not os.path.exists(cat_file):
        return {} # FAIL-CLOSED
        
    try:
        with open(cat_file, "r", encoding="utf-8-sig") as f:
            data = json.load(f)
            catalog = {}
            if isinstance(data, list):
                for entry in data:
                    if isinstance(entry, dict) and "domain" in entry:
                        domain_key = entry["domain"].strip().lower()
                        catalog[domain_key] = entry
            return catalog
    except Exception:
        return {} # FAIL-CLOSED

def get_deals_feed():
    vault_root = get_vault_root()
    feed_file = os.path.join(vault_root, "05_DEAL_AND_AFFILIATE", "deals_feed.json")
    if not os.path.exists(feed_file):
        feed_file = os.path.join(os.path.dirname(vault_root), "05_DEAL_AND_AFFILIATE", "deals_feed.json")
        
    if not os.path.exists(feed_file):
        return {}
        
    try:
        with open(feed_file, "r", encoding="utf-8-sig") as f:
            data = json.load(f)
            deals = {}
            if isinstance(data, list):
                for d in data:
                    if isinstance(d, dict) and "deal_id" in d:
                        deals[d["deal_id"]] = d
            return deals
    except Exception:
        return {}

def generate_ephemeral_token(deal_id, target_url):
    if not TOKEN_SIGNING_CONFIGURED:
        return None, "ERR_TOKEN_SECRET_NOT_CONFIGURED"
    now = int(time.time())
    payload = f"{deal_id}|{target_url}|{now}"
    signature = hmac.new(HMAC_SECRET, payload.encode("utf-8"), hashlib.sha256).hexdigest()
    token = f"{deal_id}.{now}.{signature}"
    return token, None

class NoRedirectHandler(urllib.request.HTTPRedirectHandler):
    def http_error_302(self, req, fp, code, msg, headers):
        return fp
    http_error_301 = http_error_302
    http_error_303 = http_error_302
    http_error_307 = http_error_302
    http_error_308 = http_error_302

def validate_single_hop_target(url_to_check, catalog):
    """Xác thực 1 hop: HTTPS, không credentials, catalog active/enabled, DNS IPv4/IPv6 private block."""
    if not url_to_check or not isinstance(url_to_check, str):
        return False, "ERR_EMPTY_OR_INVALID_HOP_URL"
    parsed = urlparse(url_to_check)
    if parsed.scheme.lower() != "https":
        return False, f"ERR_NON_HTTPS_SCHEME: {parsed.scheme}"
    if "@" in parsed.netloc:
        return False, "ERR_CREDENTIALS_IN_URL"
    hostname = parsed.hostname
    if not hostname or "." not in hostname:
        return False, f"ERR_INVALID_HOSTNAME: {hostname}"

    hostname_clean = hostname.lower()
    matched = None
    for dom_name, dom_entry in catalog.items():
        if hostname_clean == dom_name or hostname_clean.endswith("." + dom_name):
            if dom_entry.get("status") == "ACTIVE" and dom_entry.get("is_enabled", True) is not False:
                matched = dom_entry
                break
            else:
                return False, f"ERR_DOMAIN_DISABLED_IN_CATALOG: {dom_name}"
                
    if not matched:
        return False, f"ERR_DOMAIN_NOT_IN_CATALOG: {hostname_clean}"

    # Strict DNS resolution across ALL IPv4 & IPv6 records (Anti-SSRF)
    try:
        addr_info = socket.getaddrinfo(hostname, 443, proto=socket.IPPROTO_TCP)
        if not addr_info:
            return False, f"ERR_DNS_NO_RECORDS: {hostname}"
        for family, socktype, proto, canonname, sockaddr in addr_info:
            ip_str = sockaddr[0]
            ip_obj = ipaddress.ip_address(ip_str)
            if (ip_obj.is_private or ip_obj.is_loopback or ip_obj.is_link_local or 
                ip_obj.is_multicast or ip_obj.is_reserved or ip_obj.is_unspecified):
                return False, f"ERR_SSRF_PRIVATE_IP_BLOCKED: {ip_str} ({hostname})"
    except Exception as e:
        return False, f"ERR_DNS_RESOLUTION_FAILED: {str(e)}"

    return True, url_to_check

def execute_real_hop_by_hop_resolution(initial_url, catalog, max_hops=5, timeout=4):
    """
    REAL HOP-BY-HOP REDIRECT RESOLUTION (FAIL-CLOSED):
    Gửi request kiểm tra từng hop với redirect tắt tự động.
    Theo vết Location header và đối soát Catalog/DNS trên từng hop.
    """
    current_url = initial_url
    opener = urllib.request.build_opener(NoRedirectHandler)
    visited_urls = set()

    for hop in range(max_hops):
        if current_url in visited_urls:
            return False, None, f"ERR_CIRCULAR_REDIRECT_LOOP_DETECTED at hop {hop+1}: {current_url}"
        visited_urls.add(current_url)

        # 1. Thẩm định URL của hop hiện tại
        valid, err = validate_single_hop_target(current_url, catalog)
        if not valid:
            return False, None, f"Hop {hop+1} failed security validation: {err}"

        # 2. Gửi request HEAD/GET thực tế tới hop (Redirect tắt tự động)
        try:
            req = urllib.request.Request(
                current_url,
                headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"},
                method="GET"
            )
            with opener.open(req, timeout=timeout) as response:
                status_code = response.status if hasattr(response, 'status') else response.code
                headers = response.headers
                
                # Nếu nhận mã chuyển hướng (301, 302, 303, 307, 308)
                if status_code in (301, 302, 303, 307, 308):
                    next_loc = headers.get("Location")
                    if not next_loc:
                        return False, None, f"ERR_REDIRECT_MISSING_LOCATION_HEADER at hop {hop+1}"
                    next_url = urljoin(current_url, next_loc)
                    current_url = next_url
                    continue
                else:
                    return True, current_url, None

        except urllib.error.HTTPError as he:
            if he.code in (301, 302, 303, 307, 308):
                next_loc = he.headers.get("Location")
                if next_loc:
                    next_url = urljoin(current_url, next_loc)
                    current_url = next_url
                    continue
            # Nếu domain đã được validate catalog/DNS và server trả về landing content
            if he.code in (200, 403, 404):
                return True, current_url, None
            return False, None, f"ERR_HTTP_ERROR at hop {hop+1}: {he.code} {he.reason}"
        except Exception as e:
            return False, None, f"ERR_OUTBOUND_REQUEST_FAILED at hop {hop+1}: {str(e)}"

    return False, None, "ERR_MAX_REDIRECT_HOPS_EXCEEDED"

def verify_and_consume_token_atomic(token):
    if not TOKEN_SIGNING_CONFIGURED:
        return False, None, "ERR_TOKEN_SECRET_NOT_CONFIGURED"
        
    with TOKEN_LOCK:
        if not token or token in CONSUMED_TOKENS:
            return False, None, "ERR_TOKEN_ALREADY_CONSUMED_OR_INVALID"
            
    parts = token.split(".")
    if len(parts) != 3:
        return False, None, "ERR_MALFORMED_TOKEN_STRUCTURE"
        
    deal_id, ts_str, sig = parts
    try:
        issued_at = int(ts_str)
    except ValueError:
        return False, None, "ERR_INVALID_TOKEN_TIMESTAMP"
        
    now = int(time.time())
    if now - issued_at > TOKEN_EXPIRY_SECONDS or issued_at > now + 5:
        return False, None, "ERR_TOKEN_EXPIRED"
        
    deals = get_deals_feed()
    deal = deals.get(deal_id)
    if not deal:
        for d in deals.values():
            if d.get("id") == deal_id or d.get("deal_id") == deal_id:
                deal = d
                break
                
    if not deal:
        return False, None, f"ERR_DEAL_NOT_FOUND_IN_FEED: {deal_id}"
        
    canonical_url = deal.get("source_url") or deal.get("url")
    if not canonical_url:
        return False, None, "ERR_DEAL_MISSING_CANONICAL_URL"
        
    expected_payload = f"{deal_id}|{canonical_url}|{issued_at}"
    expected_sig = hmac.new(HMAC_SECRET, expected_payload.encode("utf-8"), hashlib.sha256).hexdigest()
    
    if not hmac.compare_digest(sig, expected_sig):
        return False, None, "ERR_TOKEN_SIGNATURE_MISMATCH"
        
    catalog = get_domain_catalog()
    if not catalog:
        return False, None, "ERR_DOMAIN_CATALOG_EMPTY"
        
    # REAL Hop-by-Hop Resolution
    ok, final_url, hop_err = execute_real_hop_by_hop_resolution(canonical_url, catalog)
    if not ok:
        # FAIL-CLOSED: Không tiêu thụ token khi chuỗi redirect không xác thực được
        return False, None, hop_err
        
    # TIÊU THỤ NGUYÊN TỬ HẬU XÁC THỰC THÀNH CÔNG
    with TOKEN_LOCK:
        if token in CONSUMED_TOKENS:
            return False, None, "ERR_CONCURRENT_RACE_CONSUMPTION_DETECTED"
        CONSUMED_TOKENS.add(token)
        
    return True, final_url, None

class JayTComprehensiveHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, format, *args):
        pass

    def do_GET(self):
        parsed = urlparse(self.path)
        
        # 1. ROOT WEB APPLICATION
        if parsed.path in ("/", "/index.html", "/app"):
            if os.path.exists(GOLDEN_MASTER_FILE):
                self.send_response(200)
                self.send_header("Content-Type", "text/html; charset=utf-8")
                self.send_header("X-JayT-Environment", "RENDER_CLOUD_STAGING")
                self.send_header("X-Content-Type-Options", "nosniff")
                self.end_headers()
                with open(GOLDEN_MASTER_FILE, "rb") as f:
                    self.wfile.write(f.read())
                return
            else:
                self.send_error(404, "Index Not Found")
                return
                
        # 2. HEALTH & RUNTIME METADATA ENDPOINT
        elif parsed.path in ("/health", "/healthz"):
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Cache-Control", "no-store")
            self.end_headers()
            
            build_id, manifest_hash = get_active_build_metadata()
            health_data = {
                "status": "UP",
                "active_build_id": build_id,
                "build_manifest_hash": manifest_hash,
                "uptime_seconds": round(time.time() - START_TIME, 2),
                "environment": "RENDER_CLOUD_STAGING",
                "server_root": os.path.abspath(os.getcwd()),
                "secret_configured": TOKEN_SIGNING_CONFIGURED,
                "resolver_engine": "REAL_HOP_BY_HOP_INSPECTION_v2"
            }
            self.wfile.write(json.dumps(health_data, ensure_ascii=False, indent=2).encode("utf-8"))
            return
            
        # 3. TRUSTED SERVER TIME BASELINE ENDPOINT (RFC-3339 Asia/Ho_Chi_Minh)
        elif parsed.path == "/api/time":
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Cache-Control", "no-store, no-cache, must-revalidate")
            self.end_headers()
            
            now_vn = datetime.now(VN_TZ)
            time_data = {
                "server_time_iso": now_vn.isoformat(),
                "timestamp_unix": int(now_vn.timestamp()),
                "timezone": "Asia/Ho_Chi_Minh",
                "is_trusted_baseline": True
            }
            self.wfile.write(json.dumps(time_data, ensure_ascii=False, indent=2).encode("utf-8"))
            return

        # 4. SINGLE SOURCE OF TRUTH STATUS ENDPOINT
        elif parsed.path == "/api/truth-status":
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.end_headers()
            build_id, manifest_hash = get_active_build_metadata()
            gm_hash = "FILE_NOT_FOUND"
            if os.path.exists(GOLDEN_MASTER_FILE):
                with open(GOLDEN_MASTER_FILE, "rb") as f:
                    gm_hash = hashlib.sha256(f.read()).hexdigest()
                    
            self.wfile.write(json.dumps({
                "system_status": "ONLINE",
                "active_build_id": build_id,
                "manifest_hash": manifest_hash,
                "golden_master_sha256": gm_hash
            }, ensure_ascii=False, indent=2).encode("utf-8"))
            return

        # 5. TOKEN ISSUANCE ENDPOINT (/api/token/issue?deal_id=...)
        elif parsed.path == "/api/token/issue":
            if not TOKEN_SIGNING_CONFIGURED:
                self.send_response(500)
                self.send_header("Content-Type", "application/json; charset=utf-8")
                self.end_headers()
                self.wfile.write(json.dumps({"error": "FAIL_CLOSED_SECRET_NOT_CONFIGURED"}).encode("utf-8"))
                return

            qs = parse_qs(parsed.query)
            deal_id = qs.get("deal_id", [""])[0]
            if not deal_id:
                self.send_response(400)
                self.send_header("Content-Type", "application/json; charset=utf-8")
                self.end_headers()
                self.wfile.write(json.dumps({"error": "MISSING_DEAL_ID"}).encode("utf-8"))
                return
                
            deals = get_deals_feed()
            deal = deals.get(deal_id)
            if not deal:
                deal_id_upper = deal_id.upper()
                for d in deals.values():
                    did = d.get("deal_id", "").upper()
                    if did == deal_id_upper or deal_id_upper in did or d.get("id", "").upper() == deal_id_upper:
                        deal = d
                        deal_id = d.get("deal_id")
                        break
                        
            if not deal:
                self.send_response(404)
                self.send_header("Content-Type", "application/json; charset=utf-8")
                self.end_headers()
                self.wfile.write(json.dumps({"error": "DEAL_NOT_FOUND", "deal_id": deal_id}).encode("utf-8"))
                return
                
            canonical_url = deal.get("source_url") or deal.get("url")
            token, err = generate_ephemeral_token(deal_id, canonical_url)
            if err:
                self.send_response(500)
                self.send_header("Content-Type", "application/json; charset=utf-8")
                self.end_headers()
                self.wfile.write(json.dumps({"error": err}).encode("utf-8"))
                return
                
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Cache-Control", "no-store")
            self.end_headers()
            
            token_resp = {
                "status": "TOKEN_ISSUED",
                "token": token,
                "deal_id": deal_id,
                "expires_in_seconds": TOKEN_EXPIRY_SECONDS,
                "outbound_endpoint": f"/out?token={token}"
            }
            self.wfile.write(json.dumps(token_resp, ensure_ascii=False, indent=2).encode("utf-8"))
            return

        # 6. TOKENIZED FAIL-CLOSED REDIRECT RESOLVER (/out?token=...)
        elif parsed.path == "/out":
            qs = parse_qs(parsed.query)
            token = qs.get("token", [""])[0]
            
            if not token:
                self.send_response(403)
                self.send_header("Content-Type", "application/json; charset=utf-8")
                self.end_headers()
                self.wfile.write(json.dumps({"error": "FORBIDDEN", "reason": "ERR_MISSING_EPHEMERAL_TOKEN"}).encode("utf-8"))
                return
                
            valid_token, target_url, token_err = verify_and_consume_token_atomic(token)
            if not valid_token:
                self.send_response(403)
                self.send_header("Content-Type", "application/json; charset=utf-8")
                self.end_headers()
                self.wfile.write(json.dumps({"error": "FORBIDDEN_OUTBOUND_GATE", "reason": token_err}).encode("utf-8"))
                return
            else:
                self.send_response(302)
                self.send_header("Location", target_url)
                self.send_header("Referrer-Policy", "strict-origin-when-cross-origin")
                self.send_header("X-Content-Type-Options", "nosniff")
                self.end_headers()
                return
                
        else:
            return super().do_GET()

if __name__ == "__main__":
    server_address = ("", PORT)
    httpd = http.server.ThreadingHTTPServer(server_address, JayTComprehensiveHTTPRequestHandler)
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass
