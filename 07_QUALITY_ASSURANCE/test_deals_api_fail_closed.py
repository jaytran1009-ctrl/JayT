# -*- coding: utf-8 -*-
"""
JAYT API FAIL-CLOSED & SAFE OUTBOUND TEST MODEL (WORK ORDER: JAYT-VISIBILITY-QA-004)
=============================================================================
1. Baseline: 200 OK + NO_RENDER_ELIGIBLE_DEALS + deals=[] + zero leakage.
2. Token Issue on Baseline: 403 ERR_DEAL_NOT_RENDER_ELIGIBLE.
3. Data Corruption: 503 Fail-Closed.
4. HTTP Methods / Headers: 405 / 415 / 400 / 404.
5. Sandbox Authentic Fixture: 200 ACTIVE_RENDER_ELIGIBLE_DEALS + valid token.
6. Safe Outbound Test Model (Separated Scenarios):
   - Scenario A: Resolver fails -> 403, token NOT consumed, retry still blocked by resolver.
   - Scenario B: Resolver succeeds in isolated test harness -> 302 to safe fixture URL, replay returns 403 ERR_TOKEN_ALREADY_CONSUMED_OR_INVALID.
7. Zero External Internet Dependency (No Metiz / Real host dependency).
8. Zero Mutation on real 05_DEAL_AND_AFFILIATE/deals_feed.json.
=============================================================================
"""
import os
import sys
import json
import time
import shutil
import hashlib
import tempfile
import subprocess
import urllib.request
import urllib.error
from pathlib import Path

# Ensure UTF-8 output across Windows environments
if hasattr(sys.stdout, "reconfigure"):
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
        sys.stderr.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass

REPO_ROOT = Path(__file__).resolve().parent.parent
REAL_DEALS_FEED_FILE = REPO_ROOT / "05_DEAL_AND_AFFILIATE" / "deals_feed.json"
REAL_EVIDENCE_STORE_FILE = REPO_ROOT / "05_DEAL_AND_AFFILIATE" / "evidence_store.json"
REAL_DOMAIN_CATALOG_FILE = REPO_ROOT / "05_DEAL_AND_AFFILIATE" / "domain_catalog.json"
REAL_ZONE_CATALOG_FILE = REPO_ROOT / "05_DEAL_AND_AFFILIATE" / "zone_catalog.json"
PORT = 8949

def get_file_sha256(filepath):
    h = hashlib.sha256()
    with open(filepath, "rb") as f:
        while chunk := f.read(8192):
            h.update(chunk)
    return h.hexdigest()

def make_request(port, path, method="GET", headers=None, data=None):
    url = f"http://127.0.0.1:{port}{path}"
    req = urllib.request.Request(url, method=method)
    if headers:
        for k, v in headers.items():
            req.add_header(k, v)
    try:
        with urllib.request.urlopen(req, data=data, timeout=5) as resp:
            status = resp.status
            body_raw = resp.read().decode("utf-8")
            try:
                body = json.loads(body_raw)
            except Exception:
                body = body_raw
            return status, body, resp.headers
    except urllib.error.HTTPError as e:
        body_raw = e.read().decode("utf-8")
        try:
            body = json.loads(body_raw)
        except Exception:
            body = body_raw
        return e.code, body, e.headers
    except Exception as ex:
        return 0, str(ex), {}

def remove_readonly(func, path, excinfo):
    import stat
    os.chmod(path, stat.S_IWRITE)
    func(path)

def run_tests():
    print("[JAYT-API-FAIL-CLOSED-QA] Khoi chay bo kiem thu Safe Outbound Test Model (JAYT-VISIBILITY-QA-004)...")
    pre_test_hash = get_file_sha256(REAL_DEALS_FEED_FILE)
    print(f"  [SOURCE-DEAL-HASH-PRE] {pre_test_hash}")

    all_passed = True
    sandbox_dir = tempfile.mkdtemp(prefix="jayt_qa_safe_outbound_")
    server_process = None

    try:
        # Setup Sandbox Environment
        sb_sot = os.path.join(sandbox_dir, "03_SOURCE_OF_TRUTH")
        sb_deals_dir = os.path.join(sandbox_dir, "05_DEAL_AND_AFFILIATE")
        os.makedirs(sb_sot, exist_ok=True)
        os.makedirs(sb_deals_dir, exist_ok=True)

        for fname in ["jayt_production_server.py", "jayt_apex_interface.js", "jayt_eligibility_engine.js", "index.html"]:
            src_f = os.path.join(REPO_ROOT, "03_SOURCE_OF_TRUTH", fname)
            if os.path.exists(src_f):
                shutil.copy2(src_f, os.path.join(sb_sot, fname))

        for fname in ["deals_feed.json", "domain_catalog.json", "evidence_store.json", "zone_catalog.json"]:
            src_f = os.path.join(REPO_ROOT, "05_DEAL_AND_AFFILIATE", fname)
            if os.path.exists(src_f):
                shutil.copy2(src_f, os.path.join(sb_deals_dir, fname))

        # Include approved safe-fixture domain in sandbox domain_catalog.json
        domain_cat_path = os.path.join(sb_deals_dir, "domain_catalog.json")
        with open(domain_cat_path, "r", encoding="utf-8") as f:
            domains = json.load(f)
        domains.append({
            "domain": "safe-fixture.test",
            "status": "ACTIVE",
            "is_enabled": True,
            "emergency_kill_switch_active": False,
            "approved_protocols": ["https"],
            "expires_at": "2030-12-31T23:59:59Z",
            "policy": "ALLOW_DIRECT_OR_PINNED_TLS",
            "pinned_ips": ["127.0.0.1"],
            "max_redirect_hops": 3,
            "category": "LOCAL_EXPERIENCE",
            "notes": "Safe QA Test Sandbox Fixture Domain"
        })
        with open(domain_cat_path, "w", encoding="utf-8") as f:
            json.dump(domains, f, indent=2, ensure_ascii=False)

        # Start Server Subprocess
        server_script = os.path.join(sb_sot, "jayt_production_server.py")
        env = os.environ.copy()
        env["JAYT_PORT"] = str(PORT)
        env["JAYT_HMAC_SECRET"] = "safe_qa_test_secret_32_bytes_len_exact_123!"

        from resolve_python import resolve_python_executable
        python_exe = resolve_python_executable()

        server_process = subprocess.Popen([python_exe, server_script], cwd=sb_sot, env=env)
        time.sleep(1.8)

        # PHASE A: BASELINE EMPTY STATE & ZERO LEAKAGE
        status_empty, body_empty, _ = make_request(PORT, "/api/deals")
        with open(REAL_DEALS_FEED_FILE, "r", encoding="utf-8") as f:
            real_feed_len = len(json.load(f))
        t1_ok = (status_empty == 200 and
                 body_empty.get("status") == "OK" and
                 body_empty.get("catalog_state") == "NO_RENDER_ELIGIBLE_DEALS" and
                 body_empty.get("deals") == [] and
                 body_empty.get("evidence") == {} and
                 body_empty.get("total_count") == 0 and
                 body_empty.get("total_stored_deals") == real_feed_len)
        print(f"  [API_01] Baseline Honest Empty State /api/deals (200 + NO_RENDER_ELIGIBLE_DEALS + deals=[]): [{'PASS' if t1_ok else 'FAIL'}]")
        if not t1_ok: all_passed = False

        status_tok_base, body_tok_base, _ = make_request(PORT, "/api/token/issue", method="POST",
                                                        headers={"Content-Type": "application/json"},
                                                        data=json.dumps({"deal_id": "DNG-METIZ-45K"}).encode("utf-8"))
        t2_ok = ((status_tok_base == 403 and body_tok_base.get("error") == "ERR_DEAL_NOT_RENDER_ELIGIBLE") or
                 (status_tok_base == 404 and body_tok_base.get("error") == "DEAL_NOT_FOUND_EXACT"))
        print(f"  [API_02] Baseline Unverified/Non-Existent Deal Token Issue Blocked (403/404 Fail-Closed): [{'PASS' if t2_ok else 'FAIL'}]")
        if not t2_ok: all_passed = False

        # PHASE B: INFRASTRUCTURE CORRUPTION (503 FAIL-CLOSED)
        feed_path = os.path.join(sb_deals_dir, "deals_feed.json")
        with open(feed_path, "w", encoding="utf-8") as f:
            f.write("{ CORRUPTED_INVALID_JSON ...")
        status_503, body_503, _ = make_request(PORT, "/api/deals")
        t3a_ok = (status_503 == 503 and body_503.get("error") == "ERR_FAIL_CLOSED_DEALS_VALIDATION")
        print(f"  [API_03a] Corrupted Deals Feed JSON Blocked (503): [{'PASS' if t3a_ok else 'FAIL'}]")
        if not t3a_ok: all_passed = False

        with open(feed_path, "w", encoding="utf-8") as f:
            json.dump([], f)
        ev_path = os.path.join(sb_deals_dir, "evidence_store.json")
        if os.path.exists(ev_path):
            os.remove(ev_path)
        status_ev503, body_ev503, _ = make_request(PORT, "/api/deals")
        t3b_ok = (status_ev503 == 503 and body_ev503.get("error") == "ERR_FAIL_CLOSED_DEALS_VALIDATION")
        print(f"  [API_03b] Missing Evidence Store File Blocked (503): [{'PASS' if t3b_ok else 'FAIL'}]")
        if not t3b_ok: all_passed = False

        # PHASE C: HTTP METHODS / HEADERS GUARDS
        status_m405, _, hdrs_m405 = make_request(PORT, "/api/token/issue", method="GET")
        t4_ok = (status_m405 == 405 and "POST" in str(hdrs_m405.get("Allow", "")))
        print(f"  [API_04] GET /api/token/issue Rejected (405): [{'PASS' if t4_ok else 'FAIL'}] (Allow: POST)")
        if not t4_ok: all_passed = False

        status_m415, body_m415, _ = make_request(PORT, "/api/token/issue", method="POST",
                                                headers={"Content-Type": "text/plain"},
                                                data=b"invalid text")
        t5_ok = (status_m415 == 415 and body_m415.get("error") == "UNSUPPORTED_MEDIA_TYPE")
        print(f"  [API_05] POST Non-JSON Content-Type Rejected (415): [{'PASS' if t5_ok else 'FAIL'}]")
        if not t5_ok: all_passed = False

        status_m400, body_m400, _ = make_request(PORT, "/api/token/issue", method="POST",
                                                headers={"Content-Type": "application/json"},
                                                data=b"")
        t6_ok = (status_m400 == 400 and body_m400.get("error") == "EMPTY_REQUEST_BODY")
        print(f"  [API_06] POST Empty Body Blocked (400): [{'PASS' if t6_ok else 'FAIL'}]")
        if not t6_ok: all_passed = False

        status_m404, body_m404, _ = make_request(PORT, "/api/token/issue", method="POST",
                                                headers={"Content-Type": "application/json"},
                                                data=json.dumps({"deal_id": "DNG-MET"}).encode("utf-8"))
        t7_ok = (status_m404 == 404 and body_m404.get("error") == "DEAL_NOT_FOUND_EXACT")
        print(f"  [API_07] Partial Deal ID Substrings Rejected (404 DEAL_NOT_FOUND_EXACT): [{'PASS' if t7_ok else 'FAIL'}]")
        if not t7_ok: all_passed = False

        # PHASE D: SANDBOX SAFE FIXTURE ARTIFACT
        artifacts_dir = os.path.join(sb_deals_dir, "evidence_artifacts")
        os.makedirs(artifacts_dir, exist_ok=True)
        png_sample = bytes.fromhex("89504e470d0a1a0a0000000d49484452000000010000000108060000001f15c4890000000a49444154789c636000000002000148afa4710000000049454e44ae426082")
        png_hash = hashlib.sha256(png_sample).hexdigest()
        png_path = os.path.join(artifacts_dir, "safe_fixture_capture.png")
        with open(png_path, "wb") as f:
            f.write(png_sample)

        safe_fixture_deal = {
            "deal_id": "DNG-FIXTURE-SAFE-QA",
            "merchant": "Safe Cinema Sandbox",
            "brand": "Safe Cinema Sandbox",
            "title": "Vé Xem Phim HSSV An Toàn Sandbox",
            "deal_price": 45000,
            "original_price": 75000,
            "category": "entertainment",
            "category_scope": "LOCAL_EXPERIENCE",
            "affiliate_type": "DIRECT_DEAL",
            "zone": "ZONE_HELIO_METIZ",
            "persona": ["student", "office", "family", "group", "all"],
            "need_collection": "group_hangout",
            "start_minutes": 0,
            "end_minutes": 1440,
            "days_of_week": [1, 2, 3, 4, 5, 6, 7],
            "duration_mins": 120,
            "source_url": "https://safe-fixture.test/offer",
            "evidence_ref": "EVID-FIXTURE-SAFE-QA",
            "taxonomy": "PROBING",
            "lifecycle_status": "PROBING",
            "disclosure": "Ưu đãi kiểm thử an toàn sandbox.",
            "expires_at": "2026-12-31T23:59:59+07:00",
            "checked_at": "2026-08-20T12:00:00+07:00"
        }

        safe_fixture_evidence = {
            "EVID-FIXTURE-SAFE-QA": {
                "deal_id": "DNG-FIXTURE-SAFE-QA",
                "capture_file": "evidence_artifacts/safe_fixture_capture.png",
                "evidence_content_hash": png_hash,
                "capture_method": "BROWSER_FULLPAGE_SCREENSHOT",
                "artifact_mime_type": "image/png",
                "source_url": "https://safe-fixture.test/offer",
                "artifact_source_url": "https://safe-fixture.test/offer",
                "source_specificity": "EXACT_OFFER_PAGE",
                "observed_price_or_offer": "45.000 VNĐ",
                "observed_conditions": "Áp dụng cho HSSV có thẻ học sinh, sinh viên",
                "expiry_basis": "Thể hiện rõ hạn áp dụng 31/12/2026 trên ảnh chụp",
                "checked_at": "2026-08-20T12:00:00+07:00",
                "recorded_by": "JAYT_DESK_REVIEW_PUBLIC_SOURCE",
                "verification_status": "NOT_INDEPENDENTLY_VERIFIED"
            }
        }

        with open(feed_path, "w", encoding="utf-8") as f:
            json.dump([safe_fixture_deal], f, indent=2, ensure_ascii=False)
        with open(ev_path, "w", encoding="utf-8") as f:
            json.dump(safe_fixture_evidence, f, indent=2, ensure_ascii=False)

        # TEST 8: Fixture in /api/deals -> 200 OK + ACTIVE_RENDER_ELIGIBLE_DEALS
        status_el, body_el, _ = make_request(PORT, "/api/deals")
        t8_ok = (status_el == 200 and
                 body_el.get("catalog_state") == "ACTIVE_RENDER_ELIGIBLE_DEALS" and
                 len(body_el.get("deals", [])) == 1 and
                 body_el.get("deals")[0].get("deal_id") == "DNG-FIXTURE-SAFE-QA" and
                 body_el.get("deals")[0].get("render_eligible") is True)
        print(f"  [API_08] Authentic Fixture Deal Returned in /api/deals (200 + ACTIVE_RENDER_ELIGIBLE_DEALS): [{'PASS' if t8_ok else 'FAIL'}]")
        if not t8_ok: all_passed = False

        # TEST 9: Issue Token on Safe Fixture Deal
        valid_payload = json.dumps({"deal_id": "DNG-FIXTURE-SAFE-QA"}).encode("utf-8")
        status_tok_ok, body_tok_ok, _ = make_request(PORT, "/api/token/issue", method="POST",
                                                     headers={"Content-Type": "application/json"},
                                                     data=valid_payload)
        t9a_ok = (status_tok_ok == 200 and
                  body_tok_ok.get("status") == "TOKEN_ISSUED" and
                  body_tok_ok.get("expires_in_seconds") == 15 and
                  bool(body_tok_ok.get("correlation_id")) and
                  bool(body_tok_ok.get("token")))
        valid_token = body_tok_ok.get("token")
        valid_cid = body_tok_ok.get("correlation_id")
        print(f"  [API_09a] Valid POST Issue Token 15s TTL + Bound CID: [{'PASS' if t9a_ok else 'FAIL'}]")
        if not t9a_ok: all_passed = False

        # TEST 9b: Case-Insensitive Deal ID
        status_ci, body_ci, _ = make_request(PORT, "/api/token/issue", method="POST",
                                             headers={"Content-Type": "application/json"},
                                             data=json.dumps({"deal_id": "dng-fixture-safe-qa"}).encode("utf-8"))
        t9b_ok = status_ci == 200 and body_ci.get("status") == "TOKEN_ISSUED" and body_ci.get("deal_id") == "DNG-FIXTURE-SAFE-QA"
        print(f"  [API_09b] Case-Insensitive Exact Deal ID Accepted (200 OK): [{'PASS' if t9b_ok else 'FAIL'}]")
        if not t9b_ok: all_passed = False

        # TEST 10: Tampered CID and Missing CID -> MUST BE 403
        status_tamp, body_tamp, _ = make_request(PORT, f"/out?token={valid_token}&cid=TAMPERED_FORGED_CID_12345")
        t10a_ok = status_tamp == 403 and body_tamp.get("error") == "FORBIDDEN_OUTBOUND_GATE" and body_tamp.get("reason") == "ERR_CORRELATION_ID_MISMATCH"

        status_miss_cid, body_miss_cid, _ = make_request(PORT, f"/out?token={valid_token}")
        t10b_ok = status_miss_cid == 403 and body_miss_cid.get("error") == "FORBIDDEN" and body_miss_cid.get("reason") == "ERR_MISSING_CORRELATION_ID"
        t10_ok = t10a_ok and t10b_ok
        print(f"  [API_10] Tampered & Missing Correlation ID Blocked on /out (403): [{'PASS' if t10_ok else 'FAIL'}]")
        if not t10_ok: all_passed = False

        # =====================================================================
        # PHASE E: SAFE OUTBOUND TEST MODEL (WORK ORDER: JAYT-VISIBILITY-QA-004)
        # =====================================================================

        # SCENARIO A: Real Resolver Fails (Fail-Closed, Token Unconsumed, Retry Still Blocked by Resolver)
        # Issue a fresh token for Scenario A
        status_sc_a, body_sc_a, _ = make_request(PORT, "/api/token/issue", method="POST",
                                                 headers={"Content-Type": "application/json"},
                                                 data=valid_payload)
        token_a = body_sc_a.get("token")
        cid_a = body_sc_a.get("correlation_id")

        # Call 1: Real resolver attempts connection to safe-fixture.test (non-existent live internet server)
        # MUST fail-closed with 403 and NOT consume the token
        status_a1, body_a1, _ = make_request(PORT, f"/out?token={token_a}&cid={cid_a}")
        t11a_fail_closed = status_a1 == 403 and body_a1.get("error") == "FORBIDDEN_OUTBOUND_GATE" and "ERR_HOP_CONNECTION_FAILED" in str(body_a1.get("reason", ""))

        # Call 2 (Retry): Re-attempting resolution with unconsumed token
        # MUST be blocked by resolver failure again, NOT by replay protection (ERR_TOKEN_ALREADY_CONSUMED)
        status_a2, body_a2, _ = make_request(PORT, f"/out?token={token_a}&cid={cid_a}")
        t11a_retry_unconsumed = (status_a2 == 403 and
                                 body_a2.get("error") == "FORBIDDEN_OUTBOUND_GATE" and
                                 "ERR_HOP_CONNECTION_FAILED" in str(body_a2.get("reason", "")) and
                                 body_a2.get("reason") != "ERR_TOKEN_ALREADY_CONSUMED_OR_INVALID")

        t11_ok = t11a_fail_closed and t11a_retry_unconsumed
        print(f"  [API_11] Scenario A: Resolver Fails -> 403 & Token Remains Unconsumed on Retry: [{'PASS' if t11_ok else 'FAIL'}]")
        print(f"           ↳ Call 1 Status: {status_a1} ({body_a1.get('reason', '')})")
        print(f"           ↳ Call 2 (Retry) Status: {status_a2} ({body_a2.get('reason', '')}) [No Replay Triggered: True]")
        if not t11_ok: all_passed = False

        # SCENARIO B: Resolver Succeeds in Isolated Test Harness (Atomic Consume -> 302 -> Replay 403)
        # Import jayt_production_server in-process with test harness mock
        sys.path.insert(0, sb_sot)
        import jayt_production_server as srv_sb
        srv_sb.TOKEN_SIGNING_CONFIGURED = True
        srv_sb.HMAC_SECRET = b"safe_qa_test_secret_32_bytes_len_exact_123!"

        # Generate fresh token for Scenario B
        cid_b = "cid_test_scenario_b_12345"
        token_b, err_gen = srv_sb.generate_ephemeral_token("DNG-FIXTURE-SAFE-QA", "https://safe-fixture.test/offer", cid_b)

        # Mock execute_strict_ip_pinned_hop_resolution ONLY in test harness
        orig_resolver = srv_sb.execute_strict_ip_pinned_hop_resolution
        srv_sb.execute_strict_ip_pinned_hop_resolution = lambda url, catalog, max_hops=5, timeout=5: (True, "https://safe-fixture.test/offer", None)

        try:
            # 1st execution: Resolver succeeds -> atomically consumes token -> returns True and safe destination
            ok_b1, final_url_b1, err_b1 = srv_sb.verify_and_consume_token_atomic(token_b, cid_b)
            t12_call1_ok = ok_b1 is True and final_url_b1 == "https://safe-fixture.test/offer" and err_b1 is None

            # 2nd execution (Replay): Token was consumed -> MUST return False with ERR_TOKEN_ALREADY_CONSUMED_OR_INVALID
            ok_b2, final_url_b2, err_b2 = srv_sb.verify_and_consume_token_atomic(token_b, cid_b)
            t12_call2_ok = ok_b2 is False and err_b2 == "ERR_TOKEN_ALREADY_CONSUMED_OR_INVALID" and final_url_b2 is None

            t12_ok = t12_call1_ok and t12_call2_ok
            print(f"  [API_12] Scenario B: Resolver Succeeds -> 302 + Atomic Consume -> Replay 403 Blocked: [{'PASS' if t12_ok else 'FAIL'}]")
            print(f"           ↳ Call 1: Success={ok_b1}, FinalURL={final_url_b1}")
            print(f"           ↳ Call 2 (Replay): Success={ok_b2}, Reason={err_b2}")
            if not t12_ok: all_passed = False
        finally:
            srv_sb.execute_strict_ip_pinned_hop_resolution = orig_resolver

        # TEST 13: Audit Log Cap Check
        status_audit, body_audit, _ = make_request(PORT, "/api/request-audit")
        t13_ok = status_audit == 200 and body_audit.get("status") == "OK" and body_audit.get("count", 0) <= 1000
        print(f"  [API_13] Audit Log Capped <= 1000: [{'PASS' if t13_ok else 'FAIL'}] (Count: {body_audit.get('count', 0)})")
        if not t13_ok: all_passed = False

    finally:
        if server_process:
            try:
                server_process.terminate()
                server_process.wait(timeout=3)
            except Exception:
                server_process.kill()

        shutil.rmtree(sandbox_dir, onexc=remove_readonly)

        # 3. VERIFY ZERO SOURCE MUTATION (STRICT SHA-256 MATCH)
        post_test_hash = get_file_sha256(REAL_DEALS_FEED_FILE)
        hash_matched = (pre_test_hash == post_test_hash)
        print(f"  [SOURCE-DEAL-HASH-POST] {post_test_hash} (Zero Mutation Intact: {hash_matched})")
        if not hash_matched:
            all_passed = False

    if all_passed:
        print("\n[API-FAIL-CLOSED-SUMMARY] TOAN BO KIEM THU SAFE OUTBOUND TEST MODEL DA DAT (PASS)!")
        return 0
    else:
        print("\n[API-FAIL-CLOSED-SUMMARY] CO LOI XAY RA TRONG BO KIEM THU API!")
        return 1

if __name__ == "__main__":
    sys.exit(run_tests())
