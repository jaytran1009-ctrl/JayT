# -*- coding: utf-8 -*-
"""
JAYT APEX PRODUCTION SERVER — STRICT FAIL-CLOSED READINESS & INTEGRITY GATE
=============================================================================
1. /healthz & /livez: Process liveness probe (UP).
2. /readyz: Strict Traffic Readiness probe:
   - Secret Governance (>= 32 chars).
   - Full Catalog Schema Validation (Every entry: ACTIVE, kill-switch false, https protocol, unexpired UTC).
   - Build Manifest & Physical File Hash Integrity Verification (No missing files, No empty files list, No traversal).
   - Pointer Binding & Vault Containment Security Verification.
3. /api/time: Trusted Server Baseline Time (ISO-8601 Asia/Ho_Chi_Minh).
4. /api/truth-status: Single Source of Truth integrity ledger.
5. /api/token/issue: Exact Deal ID matching & Secret Governed Token Issuer.
6. /out: TRUE TLS-SNI IP-Pinned, 2xx Terminal, Hop-by-Hop Redirect Gateway.
7. /__test/*: Internal test endpoint (HARD-BLOCKED in Production unconditionally).
=============================================================================
"""
import os
import sys
import ssl
import json
import time
import hmac
import socket
import hashlib
import ipaddress
import threading
import http.client
import http.server
from urllib.parse import urlparse, parse_qs, urljoin
from datetime import datetime, timezone, timedelta

PORT = int(os.environ.get("PORT", os.environ.get("JAYT_PORT", 8080)))
START_TIME = time.time()
GOLDEN_MASTER_FILE = "index.html"
VN_TZ = timezone(timedelta(hours=7))

# 1. STRICT SECRET GOVERNANCE (FAIL-CLOSED)
RAW_SECRET = os.environ.get("JAYT_TOKEN_SECRET", os.environ.get("JAYT_HMAC_SECRET", "")).strip()
if not RAW_SECRET or len(RAW_SECRET) < 32:
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
    if not os.path.exists(manifest_file):
        manifest_file = os.path.join(vault_root, "08_RELEASE_VAULT", "RELEASE_MANIFEST.json")
        
    build_id = None
    manifest_hash = None
    manifest_data = None
    
    if os.path.exists(manifest_file):
        try:
            with open(manifest_file, "r", encoding="utf-8-sig") as f:
                manifest_data = json.load(f)
                build_id = manifest_data.get("build_id")
            with open(manifest_file, "rb") as f:
                manifest_hash = hashlib.sha256(f.read()).hexdigest()
        except Exception:
            pass
    return build_id, manifest_hash, manifest_data

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

def validate_catalog_policy_for_domain(hostname, catalog):
    if not hostname or not isinstance(hostname, str):
        return False, None, "ERR_EMPTY_OR_INVALID_HOSTNAME"

    hostname_clean = hostname.lower()
    matched = None
    for dom_name, dom_entry in catalog.items():
        if hostname_clean == dom_name or hostname_clean.endswith("." + dom_name):
            matched = dom_entry
            break
            
    if not matched:
        return False, None, f"ERR_DOMAIN_NOT_IN_CATALOG: {hostname_clean}"

    if matched.get("status") != "ACTIVE":
        return False, None, f"ERR_DOMAIN_STATUS_INACTIVE: {hostname_clean}"

    if matched.get("emergency_kill_switch_active", False) is True or matched.get("is_enabled", True) is False:
        return False, None, f"ERR_DOMAIN_KILL_SWITCH_ACTIVE: {hostname_clean}"

    approved_protos = matched.get("approved_protocols")
    if not approved_protos or not isinstance(approved_protos, list):
        return False, None, f"ERR_MISSING_OR_INVALID_APPROVED_PROTOCOLS: {hostname_clean}"

    normalized_protos = [p.lower().rstrip(":") for p in approved_protos]
    if "https" not in normalized_protos:
        return False, None, f"ERR_PROTOCOL_NOT_APPROVED: {hostname_clean}"

    expiry_str = matched.get("expires_at")
    if not expiry_str or not isinstance(expiry_str, str):
        return False, None, f"ERR_MISSING_EXPIRY_TIMESTAMP: {hostname_clean}"

    try:
        exp_clean = expiry_str.replace("Z", "+00:00")
        exp_dt = datetime.fromisoformat(exp_clean)
        now_utc = datetime.now(timezone.utc)
        if now_utc > exp_dt:
            return False, None, f"ERR_DOMAIN_POLICY_EXPIRED: {expiry_str}"
    except Exception as e:
        return False, None, f"ERR_INVALID_EXPIRY_TIMESTAMP_FORMAT: {str(e)}"

    return True, matched, None

def validate_entire_domain_catalog(catalog):
    """KIỂM TOÁN TẤT CẢ CÁC ENTRY TRONG CATALOG KHI READINESS"""
    if not catalog or not isinstance(catalog, dict):
        return False, ["ERR_DOMAIN_CATALOG_EMPTY_OR_UNREADABLE"]

    errors = []
    now_utc = datetime.now(timezone.utc)

    for dom_name, entry in catalog.items():
        if not isinstance(entry, dict):
            errors.append(f"ERR_CATALOG_ENTRY_NOT_DICT: {dom_name}")
            continue

        if entry.get("status") != "ACTIVE":
            errors.append(f"ERR_CATALOG_DOMAIN_INACTIVE: {dom_name}")

        if entry.get("emergency_kill_switch_active", False) is True or entry.get("is_enabled", True) is False:
            errors.append(f"ERR_CATALOG_KILL_SWITCH_ACTIVE: {dom_name}")

        approved_protos = entry.get("approved_protocols")
        if not approved_protos or not isinstance(approved_protos, list):
            errors.append(f"ERR_CATALOG_MISSING_APPROVED_PROTOCOLS: {dom_name}")
        else:
            normalized = [p.lower().rstrip(":") for p in approved_protos]
            if "https" not in normalized:
                errors.append(f"ERR_CATALOG_PROTOCOL_NOT_APPROVED: {dom_name}")

        expiry_str = entry.get("expires_at")
        if not expiry_str or not isinstance(expiry_str, str):
            errors.append(f"ERR_CATALOG_MISSING_EXPIRY_TIMESTAMP: {dom_name}")
        else:
            try:
                exp_clean = expiry_str.replace("Z", "+00:00")
                exp_dt = datetime.fromisoformat(exp_clean)
                if now_utc > exp_dt:
                    errors.append(f"ERR_CATALOG_DOMAIN_EXPIRED: {dom_name} ({expiry_str})")
            except Exception as e:
                errors.append(f"ERR_CATALOG_INVALID_EXPIRY_FORMAT: {dom_name} ({str(e)})")

    if errors:
        return False, errors
    return True, []

def verify_build_manifest_integrity():
    """KIỂM TOÁN TÍNH TOÀN VẸN CỦA BUILD MANIFEST, PHYSICAL MERKLE TREE DIGEST & CANONICAL POINTER BINDING"""
    raw_vault_root = get_vault_root()
    canon_vault_root = os.path.realpath(os.path.abspath(raw_vault_root))
    
    # 1. BẮT BUỘC POINTER FILE TỒN TẠI (FAIL-CLOSED 100%)
    pointer_candidates = [
        os.path.join(canon_vault_root, "08_RELEASE_VAULT", "releases", "active_release_pointer.json"),
        os.path.join(os.path.dirname(canon_vault_root), "active_release_pointer.json"),
        os.path.join(os.path.dirname(canon_vault_root), "08_RELEASE_VAULT", "releases", "active_release_pointer.json"),
        os.path.join(canon_vault_root, "active_release_pointer.json")
    ]
    
    pointer_file = None
    for cand in pointer_candidates:
        if os.path.exists(cand):
            pointer_file = cand
            break

    if not pointer_file or not os.path.exists(pointer_file):
        return False, None, None, ["ERR_ACTIVE_RELEASE_POINTER_MISSING"]

    try:
        with open(pointer_file, "r", encoding="utf-8-sig") as pf:
            pdata = json.load(pf)
    except Exception as e:
        return False, None, None, [f"ERR_CORRUPTED_POINTER_JSON: {str(e)}"]

    pointer_build_id = pdata.get("active_build_id")
    pointer_build_path = pdata.get("active_build_path")
    pointer_digest = pdata.get("content_digest_sha256")

    if not pointer_build_id or not pointer_build_path:
        return False, None, None, ["ERR_POINTER_MISSING_ACTIVE_BUILD_OR_PATH"]

    if not pointer_digest or not isinstance(pointer_digest, str) or len(pointer_digest.strip()) != 64:
        return False, None, None, ["ERR_POINTER_MISSING_OR_INVALID_CONTENT_DIGEST"]

    # Kiểm tra Canonical Realpath & Direct Child của releases folder
    if not os.path.exists(pointer_build_path) or not os.path.isdir(pointer_build_path):
        return False, None, None, [f"ERR_POINTER_BUILD_PATH_NOT_EXISTING_DIR: {pointer_build_path}"]

    canon_ptr_path = os.path.realpath(os.path.abspath(pointer_build_path))
    canon_parent = os.path.realpath(os.path.dirname(canon_ptr_path))
    
    # Bắt buộc thư mục cha canonical phải là 'releases' nằm trong '08_RELEASE_VAULT'
    parent_base = os.path.basename(canon_parent).lower()
    grandparent_base = os.path.basename(os.path.dirname(canon_parent)).lower()
    
    if parent_base != "releases" or grandparent_base != "08_release_vault":
        return False, None, None, [f"ERR_POINTER_NOT_CANONICAL_DIRECT_CHILD_OF_RELEASES: {canon_ptr_path}"]

    # Kiểm tra Runtime Server Binding: server runtime phải chạy đúng tại canonical build root (ZERO EXCEPTION)
    if canon_vault_root != canon_ptr_path:
        return False, None, None, [f"ERR_RUNTIME_SERVER_NOT_RUNNING_IN_ACTIVE_BUILD_PATH: server={canon_vault_root}, pointer={canon_ptr_path}"]

    # 2. Manifest file location & schema check
    manifest_file = os.path.join(canon_vault_root, "BUILD_MANIFEST.json")
    if not os.path.exists(manifest_file):
        manifest_file = os.path.join(canon_vault_root, "08_RELEASE_VAULT", "RELEASE_MANIFEST.json")

    if not os.path.exists(manifest_file):
        return False, None, None, ["ERR_BUILD_MANIFEST_MISSING"]

    try:
        with open(manifest_file, "r", encoding="utf-8-sig") as f:
            data = json.load(f)
        with open(manifest_file, "rb") as f:
            manifest_hash = hashlib.sha256(f.read()).hexdigest()
    except Exception as e:
        return False, None, None, [f"ERR_BUILD_MANIFEST_CORRUPTED_JSON: {str(e)}"]

    build_id = data.get("build_id")
    if not build_id or not isinstance(build_id, str):
        return False, None, None, ["ERR_BUILD_MANIFEST_MISSING_BUILD_ID"]

    if pointer_build_id != build_id:
        return False, build_id, manifest_hash, [f"ERR_POINTER_BUILD_ID_MISMATCH: pointer={pointer_build_id}, manifest={build_id}"]

    manifest_digest = data.get("content_digest_sha256")
    if not manifest_digest or not isinstance(manifest_digest, str) or len(manifest_digest.strip()) != 64:
        return False, build_id, manifest_hash, ["ERR_BUILD_MANIFEST_MISSING_OR_INVALID_CONTENT_DIGEST"]

    # 3. Files List & Deterministic Merkle Tree Digest Recomputation (Fail-Closed 100%)
    files_list = data.get("files")
    if files_list is None or not isinstance(files_list, list) or len(files_list) == 0:
        return False, build_id, manifest_hash, ["ERR_BUILD_MANIFEST_EMPTY_FILES_LIST"]

    try:
        sorted_files = sorted(files_list, key=lambda x: x.get("relative_path", "").replace("\\", "/").strip("/"))
    except Exception as e:
        return False, build_id, manifest_hash, [f"ERR_SORTING_MANIFEST_FILES: {str(e)}"]

    tree_bytes = bytearray()
    for file_entry in sorted_files:
        if not isinstance(file_entry, dict):
            return False, build_id, manifest_hash, ["ERR_MANIFEST_FILE_ENTRY_NOT_DICT"]

        rel_path = file_entry.get("relative_path", "")
        expected_hash = file_entry.get("sha256", "")

        if not rel_path or not expected_hash or not isinstance(expected_hash, str) or len(expected_hash.strip()) != 64:
            return False, build_id, manifest_hash, [f"ERR_MANIFEST_INVALID_FILE_METADATA: {rel_path}"]

        expected_hash_clean = expected_hash.strip().lower()

        # Chặn Path Traversal
        if ".." in rel_path:
            return False, build_id, manifest_hash, [f"ERR_PATH_TRAVERSAL_DETECTED: {rel_path}"]

        clean_rel = rel_path.lstrip("\\/")
        target_path = os.path.join(canon_vault_root, clean_rel)

        # File phải tồn tại trên đĩa
        if not os.path.exists(target_path):
            return False, build_id, manifest_hash, [f"ERR_MANIFEST_FILE_MISSING_ON_DISK: {clean_rel}"]

        try:
            with open(target_path, "rb") as pf:
                actual_hash = hashlib.sha256(pf.read()).hexdigest().lower()
            if actual_hash != expected_hash_clean:
                return False, build_id, manifest_hash, [f"ERR_FILE_DIGEST_MISMATCH: {clean_rel} (expected {expected_hash_clean}, got {actual_hash})"]
        except Exception as e:
            return False, build_id, manifest_hash, [f"ERR_READING_FILE: {clean_rel} ({str(e)})"]

        norm_rel = rel_path.replace("\\", "/").strip("/")
        tree_bytes.extend(norm_rel.encode("utf-8"))
        tree_bytes.append(0)
        tree_bytes.extend(actual_hash.encode("utf-8"))
        tree_bytes.append(0)

    # Tính toán Merkle Tree Digest thực tế từ toàn bộ cây tệp bằng normalized_relative_path + NUL + sha256 + NUL
    recomputed_tree_digest = hashlib.sha256(tree_bytes).hexdigest().lower()

    if recomputed_tree_digest != manifest_digest.strip().lower():
        return False, build_id, manifest_hash, [f"ERR_MANIFEST_TREE_DIGEST_MISMATCH: recomputed={recomputed_tree_digest}, manifest={manifest_digest}"]

    if recomputed_tree_digest != pointer_digest.strip().lower():
        return False, build_id, manifest_hash, [f"ERR_POINTER_TREE_DIGEST_MISMATCH: recomputed={recomputed_tree_digest}, pointer={pointer_digest}"]

    return True, build_id, manifest_hash, []

def make_true_tls_ip_pinned_request(url, timeout=5):
    parsed = urlparse(url)
    hostname = parsed.hostname
    port = parsed.port or 443
    path = parsed.path or "/"
    if parsed.query:
        path += "?" + parsed.query
        
    addr_info = socket.getaddrinfo(hostname, port, proto=socket.IPPROTO_TCP)
    if not addr_info:
        raise Exception(f"ERR_DNS_NO_RECORDS for {hostname}")
        
    for family, socktype, proto, canonname, sockaddr in addr_info:
        ip_str = sockaddr[0]
        ip_obj = ipaddress.ip_address(ip_str)
        if (ip_obj.is_private or ip_obj.is_loopback or ip_obj.is_link_local or 
            ip_obj.is_multicast or ip_obj.is_reserved or ip_obj.is_unspecified):
            raise Exception(f"ERR_SSRF_PRIVATE_IP_BLOCKED: {ip_str} ({hostname})")
            
    pinned_ip = addr_info[0][4][0]
    
    raw_sock = socket.create_connection((pinned_ip, port), timeout=timeout)
    ctx = ssl.create_default_context()
    tls_sock = ctx.wrap_socket(raw_sock, server_hostname=hostname)
    
    request_data = f"GET {path} HTTP/1.1\r\nHost: {hostname}\r\nUser-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36\r\nAccept: */*\r\nConnection: close\r\n\r\n"
    tls_sock.sendall(request_data.encode("utf-8"))
    
    raw_resp = b""
    while b"\r\n\r\n" not in raw_resp and len(raw_resp) < 16384:
        chunk = tls_sock.recv(2048)
        if not chunk:
            break
        raw_resp += chunk
        
    tls_sock.close()
    raw_sock.close()
    
    header_part = raw_resp.split(b"\r\n\r\n")[0].decode("utf-8", errors="ignore")
    lines = header_part.split("\r\n")
    if not lines or not lines[0].startswith("HTTP/"):
        raise Exception("ERR_INVALID_HTTP_RESPONSE")
        
    status_code = int(lines[0].split(" ")[1])
    headers = {}
    for line in lines[1:]:
        if ":" in line:
            k, v = line.split(":", 1)
            headers[k.strip().title()] = v.strip()
            
    return status_code, headers, pinned_ip

def execute_strict_ip_pinned_hop_resolution(initial_url, catalog, max_hops=5, timeout=5):
    current_url = initial_url
    visited_urls = set()

    for hop in range(max_hops):
        if current_url in visited_urls:
            return False, None, f"ERR_CIRCULAR_REDIRECT_LOOP at hop {hop+1}: {current_url}"
        visited_urls.add(current_url)

        parsed = urlparse(current_url)
        if parsed.scheme.lower() != "https":
            return False, None, f"ERR_NON_HTTPS_SCHEME at hop {hop+1}: {parsed.scheme}"
        if "@" in parsed.netloc:
            return False, None, f"ERR_CREDENTIALS_IN_URL at hop {hop+1}"

        hostname = parsed.hostname
        if not hostname or "." not in hostname:
            return False, None, f"ERR_INVALID_HOSTNAME at hop {hop+1}: {hostname}"

        valid_policy, entry, policy_err = validate_catalog_policy_for_domain(hostname, catalog)
        if not valid_policy:
            return False, None, f"Hop {hop+1} failed catalog policy: {policy_err}"

        try:
            status_code, headers, pinned_ip = make_true_tls_ip_pinned_request(current_url, timeout=timeout)
            
            if status_code in (301, 302, 303, 307, 308):
                next_loc = headers.get("Location")
                if not next_loc:
                    return False, None, f"ERR_MISSING_LOCATION_HEADER at hop {hop+1}"
                next_url = urljoin(current_url, next_loc)
                current_url = next_url
                continue
                
            elif 200 <= status_code <= 299:
                return True, current_url, None
            else:
                return False, None, f"ERR_TERMINAL_NON_2XX_STATUS at hop {hop+1}: HTTP {status_code}"

        except Exception as e:
            return False, None, f"ERR_HOP_CONNECTION_FAILED at hop {hop+1}: {str(e)}"

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
        return False, None, f"ERR_DEAL_NOT_FOUND_EXACT_MATCH: {deal_id}"
        
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
        
    ok, final_url, hop_err = execute_strict_ip_pinned_hop_resolution(canonical_url, catalog)
    if not ok:
        return False, None, hop_err
        
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
                
        # 2. LIVENESS PROBE (/healthz, /livez, /health)
        elif parsed.path in ("/health", "/healthz", "/livez"):
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Cache-Control", "no-store")
            self.end_headers()
            
            build_id, manifest_hash, _ = get_active_build_metadata()
            health_data = {
                "status": "UP",
                "active_build_id": build_id or "LOCAL_DEVELOPMENT_BUILD",
                "build_manifest_hash": manifest_hash or "UNTRACKED",
                "uptime_seconds": round(time.time() - START_TIME, 2),
                "environment": os.environ.get("JAYT_ENV", "staging").lower()
            }
            self.wfile.write(json.dumps(health_data, ensure_ascii=False, indent=2).encode("utf-8"))
            return

        # 3. READINESS PROBE (/readyz) — STRICT FAIL-CLOSED (Secret + Full Catalog + Manifest & Pointer Integrity)
        elif parsed.path == "/readyz":
            not_ready_reasons = []
            
            # Check 1: Secret configured
            if not TOKEN_SIGNING_CONFIGURED:
                not_ready_reasons.append("ERR_TOKEN_SECRET_NOT_CONFIGURED_OR_TOO_SHORT")

            # Check 2: Full domain catalog validation
            catalog = get_domain_catalog()
            cat_ok, cat_errs = validate_entire_domain_catalog(catalog)
            if not cat_ok:
                not_ready_reasons.extend(cat_errs)

            # Check 3: Build manifest, physical file digest & pointer containment validation
            mani_ok, build_id, manifest_hash, mani_errs = verify_build_manifest_integrity()
            if not mani_ok:
                not_ready_reasons.extend(mani_errs)

            if not_ready_reasons:
                self.send_response(503)
                self.send_header("Content-Type", "application/json; charset=utf-8")
                self.send_header("Cache-Control", "no-store")
                self.end_headers()
                ready_data = {
                    "status": "NOT_READY",
                    "ready": False,
                    "active_build_id": build_id,
                    "secret_configured": TOKEN_SIGNING_CONFIGURED,
                    "reasons": not_ready_reasons
                }
                self.wfile.write(json.dumps(ready_data, ensure_ascii=False, indent=2).encode("utf-8"))
                return
            else:
                self.send_response(200)
                self.send_header("Content-Type", "application/json; charset=utf-8")
                self.send_header("Cache-Control", "no-store")
                self.end_headers()
                ready_data = {
                    "status": "READY",
                    "ready": True,
                    "active_build_id": build_id,
                    "build_manifest_hash": manifest_hash,
                    "secret_configured": True,
                    "catalog_entries_count": len(catalog),
                    "resolver_engine": "TRUE_TLS_SNI_IP_PINNED_v7_POINTER_BOUND_INTEGRITY_GATED"
                }
                self.wfile.write(json.dumps(ready_data, ensure_ascii=False, indent=2).encode("utf-8"))
                return

        # 4. INTERNAL TEST SLOW ENDPOINT (HARD-BLOCKED IN PRODUCTION)
        elif parsed.path.startswith("/__test/"):
            current_env = os.environ.get("JAYT_ENV", "staging").lower()
            test_enabled = os.environ.get("JAYT_ENABLE_TEST_ENDPOINTS", "false").lower() == "true"
            
            if current_env == "production" or not test_enabled:
                self.send_error(404, "Endpoint Not Found")
                return

            if parsed.path == "/__test/slow":
                qs = parse_qs(parsed.query)
                delay_ms = int(qs.get("ms", ["1000"])[0])
                delay_sec = max(0.01, min(delay_ms / 1000.0, 10.0))
                time.sleep(delay_sec)
                
                build_id, manifest_hash, _ = get_active_build_metadata()
                self.send_response(200)
                self.send_header("Content-Type", "application/json; charset=utf-8")
                self.send_header("Cache-Control", "no-store")
                self.end_headers()
                resp_body = {
                    "status": "SLOW_REQUEST_COMPLETED",
                    "slept_seconds": delay_sec,
                    "active_build_id": build_id
                }
                self.wfile.write(json.dumps(resp_body).encode("utf-8"))
                return
            else:
                self.send_error(404, "Test Endpoint Not Found")
                return
                
        # 5. TRUSTED SERVER TIME BASELINE ENDPOINT (RFC-3339 Asia/Ho_Chi_Minh)
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

        # 6. SINGLE SOURCE OF TRUTH STATUS ENDPOINT
        elif parsed.path == "/api/truth-status":
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.end_headers()
            build_id, manifest_hash, _ = get_active_build_metadata()
            gm_hash = "FILE_NOT_FOUND"
            if os.path.exists(GOLDEN_MASTER_FILE):
                with open(GOLDEN_MASTER_FILE, "rb") as f:
                    gm_hash = hashlib.sha256(f.read()).hexdigest()
                    
            self.wfile.write(json.dumps({
                "system_status": "ONLINE",
                "active_build_id": build_id or "DEV",
                "manifest_hash": manifest_hash or "DEV",
                "golden_master_sha256": gm_hash
            }, ensure_ascii=False, indent=2).encode("utf-8"))
            return

        # 6b. DEALS FEED & EVIDENCE DATA ADAPTER ENDPOINT (/api/deals) — FAIL-CLOSED
        elif parsed.path == "/api/deals":
            errors = []
            feed_file = os.path.join(get_vault_root(), "05_DEAL_AND_AFFILIATE", "deals_feed.json")
            ev_file = os.path.join(get_vault_root(), "05_DEAL_AND_AFFILIATE", "evidence_store.json")
            
            if not os.path.exists(feed_file):
                errors.append("ERR_DEALS_FEED_FILE_NOT_FOUND")
            if not os.path.exists(ev_file):
                errors.append("ERR_EVIDENCE_STORE_FILE_NOT_FOUND")

            raw_deals = []
            evidence_data = {}

            if not errors:
                try:
                    with open(feed_file, "r", encoding="utf-8-sig") as ff:
                        raw_deals = json.load(ff)
                        if not isinstance(raw_deals, list) or len(raw_deals) == 0:
                            errors.append("ERR_DEALS_FEED_EMPTY_OR_NOT_LIST")
                except Exception as e:
                    errors.append(f"ERR_DEALS_FEED_MALFORMED_JSON: {str(e)}")

                try:
                    with open(ev_file, "r", encoding="utf-8-sig") as ef:
                        evidence_data = json.load(ef)
                        if not isinstance(evidence_data, dict):
                            errors.append("ERR_EVIDENCE_STORE_NOT_OBJECT")
                except Exception as e:
                    errors.append(f"ERR_EVIDENCE_STORE_MALFORMED_JSON: {str(e)}")

            if not errors:
                # Validate each deal and cross-reference evidence
                for d in raw_deals:
                    if not isinstance(d, dict):
                        errors.append("ERR_DEAL_ENTRY_NOT_OBJECT")
                        continue
                    did = d.get("deal_id")
                    if not did or not isinstance(did, str):
                        errors.append(f"ERR_DEAL_MISSING_ID: {d}")
                        continue
                    if not d.get("merchant"):
                        errors.append(f"ERR_DEAL_MISSING_MERCHANT: {did}")
                    if d.get("taxonomy") not in ("VERIFIED", "PROBING", "UNVERIFIED"):
                        errors.append(f"ERR_DEAL_INVALID_TAXONOMY: {did} -> {d.get('taxonomy')}")
                    src_url = d.get("source_url") or d.get("url")
                    if not src_url or not src_url.startswith("https://"):
                        errors.append(f"ERR_DEAL_INVALID_SOURCE_URL: {did} -> {src_url}")
                    ev_ref = d.get("evidence_ref")
                    if not ev_ref or not isinstance(ev_ref, str):
                        errors.append(f"ERR_DEAL_MISSING_EVIDENCE_REF: {did}")
                    elif ev_ref not in evidence_data:
                        errors.append(f"ERR_DEAL_EVIDENCE_NOT_IN_STORE: {did} -> {ev_ref}")
                    else:
                        ev_obj = evidence_data[ev_ref]
                        if ev_obj.get("deal_id") != did:
                            errors.append(f"ERR_EVIDENCE_DEAL_ID_MISMATCH: {did} vs {ev_obj.get('deal_id')}")
                        if ev_obj.get("source_url") != src_url:
                            errors.append(f"ERR_EVIDENCE_SOURCE_URL_MISMATCH: {src_url} vs {ev_obj.get('source_url')}")

            if errors:
                self.send_response(503)
                self.send_header("Content-Type", "application/json; charset=utf-8")
                self.send_header("Cache-Control", "no-store")
                self.end_headers()
                resp_data = {
                    "status": "NOT_READY",
                    "error": "ERR_FAIL_CLOSED_DEALS_VALIDATION",
                    "reasons": errors
                }
                self.wfile.write(json.dumps(resp_data, ensure_ascii=False, indent=2).encode("utf-8"))
                return
            else:
                self.send_response(200)
                self.send_header("Content-Type", "application/json; charset=utf-8")
                self.send_header("Cache-Control", "no-store, no-cache, must-revalidate")
                self.end_headers()
                resp_data = {
                    "status": "OK",
                    "deals": raw_deals,
                    "evidence": evidence_data,
                    "total_count": len(raw_deals)
                }
                self.wfile.write(json.dumps(resp_data, ensure_ascii=False, indent=2).encode("utf-8"))
                return

        # 7. TOKEN ISSUANCE ENDPOINT (/api/token/issue?deal_id=...)
        elif parsed.path == "/api/token/issue":
            if not TOKEN_SIGNING_CONFIGURED:
                self.send_response(500)
                self.send_header("Content-Type", "application/json; charset=utf-8")
                self.end_headers()
                self.wfile.write(json.dumps({"error": "FAIL_CLOSED_SECRET_NOT_CONFIGURED"}).encode("utf-8"))
                return

            qs = parse_qs(parsed.query)
            deal_id = qs.get("deal_id", [""])[0].strip()
            if not deal_id:
                self.send_response(400)
                self.send_header("Content-Type", "application/json; charset=utf-8")
                self.end_headers()
                self.wfile.write(json.dumps({"error": "MISSING_DEAL_ID"}).encode("utf-8"))
                return
                
            deals = get_deals_feed()
            deal = deals.get(deal_id)
            if not deal:
                self.send_response(404)
                self.send_header("Content-Type", "application/json; charset=utf-8")
                self.end_headers()
                self.wfile.write(json.dumps({"error": "DEAL_NOT_FOUND_EXACT", "deal_id": deal_id}).encode("utf-8"))
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

        # 8. TOKENIZED FAIL-CLOSED REDIRECT RESOLVER (/out?token=...)
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
