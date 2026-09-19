# -*- coding: utf-8 -*-
"""
JAYT APEX PRODUCTION SERVER — STRICT FAIL-CLOSED SSRF & EPHEMERAL TOKEN GATEWAY
=============================================================================
1. /healthz & /health: Dynamic active_build_id & build_manifest_hash.
2. /api/time: Trusted Server Baseline Time (ISO-8601 Asia/Ho_Chi_Minh).
3. /api/truth-status: Single Source of Truth integrity ledger.
4. /api/token/issue: Server-side ephemeral signed navigation token issuer.
5. /out: Tokenized fail-closed SSRF & IPv4/IPv6 Domain Resolver Gateway.
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
import http.server
from urllib.parse import urlparse, parse_qs
from datetime import datetime, timezone, timedelta

PORT = int(os.environ.get("PORT", 8080))
START_TIME = time.time()
GOLDEN_MASTER_FILE = "index.html"
VN_TZ = timezone(timedelta(hours=7))

# Ephemeral secret for HMAC signing (loaded from environment or generated securely per runtime)
HMAC_SECRET = os.environ.get("JAYT_TOKEN_SECRET", os.urandom(32))
if isinstance(HMAC_SECRET, str):
    HMAC_SECRET = HMAC_SECRET.encode("utf-8")

# Server-side consumed tokens store (Anti-Replay Protection)
CONSUMED_TOKENS = set()
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
    """Nạp danh mục domain chuẩn xác từ 05_DEAL_AND_AFFILIATE/domain_catalog.json (Fail-Closed)."""
    vault_root = get_vault_root()
    cat_file = os.path.join(vault_root, "05_DEAL_AND_AFFILIATE", "domain_catalog.json")
    if not os.path.exists(cat_file):
        cat_file = os.path.join(os.path.dirname(vault_root), "05_DEAL_AND_AFFILIATE", "domain_catalog.json")
    
    if not os.path.exists(cat_file):
        return {} # FAIL-CLOSED: Không có fallback hardcode
        
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
        return {} # FAIL-CLOSED khi đọc tệp lỗi

def get_deals_feed():
    """Nạp feed deal canonical từ 05_DEAL_AND_AFFILIATE/deals_feed.json."""
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
    """Tạo token điều hướng ngắn hạn có chữ ký HMAC-SHA256 và timestamp."""
    now = int(time.time())
    payload = f"{deal_id}|{target_url}|{now}"
    signature = hmac.new(HMAC_SECRET, payload.encode("utf-8"), hashlib.sha256).hexdigest()
    token = f"{deal_id}.{now}.{signature}"
    return token

def verify_and_consume_token(token):
    """Xác minh token: chữ ký, hạn dùng và chống replay."""
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
        
    # Tra cứu deal_id trong deals feed
    deals = get_deals_feed()
    deal = deals.get(deal_id)
    if not deal:
        # Fallback tra cứu id rút gọn nếu có
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
        
    # Consume token (Anti-Replay)
    CONSUMED_TOKENS.add(token)
    return True, canonical_url, None

def validate_outbound_url_strict_fail_closed(target_url):
    """
    FAIL-CLOSED SSRF & DOMAIN RESOLVER:
    1. Scheme strictly HTTPS
    2. No credentials (@)
    3. Hostname in domain_catalog.json (status=ACTIVE, is_enabled=True)
    4. socket.getaddrinfo resolves ALL IPv4 & IPv6 records.
    5. Rejects if ANY IP is private, loopback, link-local, multicast, or reserved.
    6. Fails closed on any DNS error/timeout.
    """
    if not target_url or not isinstance(target_url, str):
        return False, "ERR_MISSING_URL"
    
    parsed = urlparse(target_url)
    if parsed.scheme.lower() != "https":
        return False, "ERR_NON_HTTPS_SCHEME"
    
    if "@" in parsed.netloc:
        return False, "ERR_CREDENTIALS_IN_URL"
    
    hostname = parsed.hostname
    if not hostname or "." not in hostname:
        return False, "ERR_INVALID_HOSTNAME"
    
    # Check domain catalog (Single Source of Truth)
    catalog = get_domain_catalog()
    if not catalog:
        return False, "ERR_DOMAIN_CATALOG_EMPTY_OR_UNAVAILABLE"
        
    hostname_clean = hostname.lower()
    matched_domain = None
    for dom_name, dom_entry in catalog.items():
        if hostname_clean == dom_name or hostname_clean.endswith("." + dom_name):
            # Verify status and kill switch
            if dom_entry.get("status") == "ACTIVE" and dom_entry.get("is_enabled", True) is not False:
                matched_domain = dom_entry
                break
            else:
                return False, f"ERR_DOMAIN_DISABLED_OR_INACTIVE: {dom_name}"
                
    if not matched_domain:
        return False, f"ERR_DOMAIN_NOT_IN_CATALOG: {hostname_clean}"
    
    # Strict DNS resolution across all IPv4 & IPv6 records
    try:
        addr_info = socket.getaddrinfo(hostname, 443, proto=socket.IPPROTO_TCP)
        if not addr_info:
            return False, f"ERR_DNS_RESOLUTION_EMPTY: {hostname}"
            
        for family, socktype, proto, canonname, sockaddr in addr_info:
            ip_str = sockaddr[0]
            ip_obj = ipaddress.ip_address(ip_str)
            if (ip_obj.is_private or ip_obj.is_loopback or ip_obj.is_link_local or 
                ip_obj.is_multicast or ip_obj.is_reserved or ip_obj.is_unspecified):
                return False, f"ERR_SSRF_PRIVATE_IP_BLOCKED: {ip_str} ({hostname})"
    except Exception as e:
        # FAIL-CLOSED: Không có pass lỏng lẻo
        return False, f"ERR_DNS_RESOLUTION_FAILED: {str(e)}"
        
    return True, target_url

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
                "server_root": os.path.abspath(os.getcwd())
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
            token = generate_ephemeral_token(deal_id, canonical_url)
            
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
                
            # Verify and consume token
            valid_token, target_url, token_err = verify_and_consume_token(token)
            if not valid_token:
                self.send_response(403)
                self.send_header("Content-Type", "application/json; charset=utf-8")
                self.end_headers()
                self.wfile.write(json.dumps({"error": "FORBIDDEN_TOKEN", "reason": token_err}).encode("utf-8"))
                return
                
            # Fail-closed DNS and SSRF resolver check
            valid_url, result = validate_outbound_url_strict_fail_closed(target_url)
            if not valid_url:
                self.send_response(403)
                self.send_header("Content-Type", "application/json; charset=utf-8")
                self.end_headers()
                err_data = {
                    "error": "FORBIDDEN_OUTBOUND_REDIRECT",
                    "reason": result,
                    "target_url": target_url
                }
                self.wfile.write(json.dumps(err_data, ensure_ascii=False, indent=2).encode("utf-8"))
                return
            else:
                self.send_response(302)
                self.send_header("Location", result)
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

