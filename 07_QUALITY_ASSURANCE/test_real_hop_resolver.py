# -*- coding: utf-8 -*-
"""
JAYT REAL HOP-BY-HOP REDIRECT RESOLVER TEST SUITE (FAIL-CLOSED)
=============================================================================
Work Order: JAYT-VISIBILITY-QA-004 (Safe Outbound Test Model)
1. Kiểm tra chính sách Catalog toàn diện (status, kill-switch, expiry, approved_protocols).
2. Kiểm tra Exact Match Deal ID (Zero substring matching).
3. Kiểm tra Strict Hop Resolution & Fail-Closed Validation (Zero Real Internet dependency).
=============================================================================
"""
import os
import sys
import time
import json

if sys.stdout and hasattr(sys.stdout, 'reconfigure'):
    try: sys.stdout.reconfigure(encoding='utf-8')
    except Exception: pass

QA_DIR = os.path.dirname(os.path.abspath(__file__))
BASE_DIR = os.path.dirname(QA_DIR)
SRC_DIR = os.path.join(BASE_DIR, "03_SOURCE_OF_TRUTH")
sys.path.insert(0, SRC_DIR)

import jayt_production_server as server_mod

print("🧪 [JAYT-RESOLVER-QA] Khởi chạy kiểm thử Real Hop-by-Hop & Catalog Policy Suite...")

mock_catalog = {
    "safe-fixture.test": {
        "domain": "safe-fixture.test",
        "status": "ACTIVE",
        "emergency_kill_switch_active": False,
        "is_enabled": True,
        "approved_protocols": ["https:"],
        "expires_at": "2030-12-31T23:59:59Z"
    },
    "killed-domain.com": {
        "domain": "killed-domain.com",
        "status": "ACTIVE",
        "emergency_kill_switch_active": True,
        "is_enabled": True,
        "approved_protocols": ["https:"],
        "expires_at": "2030-12-31T23:59:59Z"
    },
    "expired-domain.com": {
        "domain": "expired-domain.com",
        "status": "ACTIVE",
        "emergency_kill_switch_active": False,
        "is_enabled": True,
        "approved_protocols": ["https:"],
        "expires_at": "2020-01-01T00:00:00Z"
    },
    "missing-expiry.com": {
        "domain": "missing-expiry.com",
        "status": "ACTIVE",
        "emergency_kill_switch_active": False,
        "is_enabled": True,
        "approved_protocols": ["https:"]
    },
    "unapproved-proto.com": {
        "domain": "unapproved-proto.com",
        "status": "ACTIVE",
        "emergency_kill_switch_active": False,
        "is_enabled": True,
        "approved_protocols": ["ftp:"],
        "expires_at": "2030-12-31T23:59:59Z"
    }
}

# TEST 1: Active Valid Domain Policy
print("--- TEST 1: ACTIVE VALID DOMAIN POLICY ---")
ok1, ent1, err1 = server_mod.validate_catalog_policy_for_domain("safe-fixture.test", mock_catalog)
print(f"  [POL_01] Valid Domain Policy: [{ 'PASS' if ok1 else 'FAIL' }]")

# TEST 2: Kill Switch Active Blocked
print("--- TEST 2: EMERGENCY KILL SWITCH ACTIVE ---")
ok2, ent2, err2 = server_mod.validate_catalog_policy_for_domain("killed-domain.com", mock_catalog)
print(f"  [POL_02] Kill Switch Active Blocked: [{ 'PASS' if not ok2 else 'FAIL' }] (Reason: {err2})")

# TEST 3: Expired Domain Policy Blocked
print("--- TEST 3: EXPIRED DOMAIN POLICY ---")
ok3, ent3, err3 = server_mod.validate_catalog_policy_for_domain("expired-domain.com", mock_catalog)
print(f"  [POL_03] Expired Domain Policy Blocked: [{ 'PASS' if not ok3 else 'FAIL' }] (Reason: {err3})")

# TEST 4: Missing Expiry Timestamp (Fail-Closed)
print("--- TEST 4: MISSING EXPIRY TIMESTAMP FAIL-CLOSED ---")
ok4, ent4, err4 = server_mod.validate_catalog_policy_for_domain("missing-expiry.com", mock_catalog)
print(f"  [POL_04] Missing Expiry Timestamp Blocked: [{ 'PASS' if not ok4 else 'FAIL' }] (Reason: {err4})")

# TEST 5: Unapproved Protocol Blocked
print("--- TEST 5: UNAPPROVED PROTOCOL (NON-HTTPS) BLOCKED ---")
ok5, ent5, err5 = server_mod.validate_catalog_policy_for_domain("unapproved-proto.com", mock_catalog)
print(f"  [POL_05] Unapproved Protocol Blocked: [{ 'PASS' if not ok5 else 'FAIL' }] (Reason: {err5})")

# TEST 6: Exact Deal ID Matching (Zero Substring Match)
print("--- TEST 6: EXACT DEAL ID MATCHING (ZERO SUBSTRING) ---")
deals_feed = server_mod.get_deals_feed()
exact_match = deals_feed.get("DNG-METIZ-45K") is not None
substring_rejected = deals_feed.get("METIZ") is None
print(f"  [DEAL_01] Exact ID 'DNG-METIZ-45K' Found: [{ 'PASS' if exact_match else 'FAIL' }]")
print(f"  [DEAL_02] Substring 'METIZ' Rejected (None): [{ 'PASS' if substring_rejected else 'FAIL' }]")

# TEST 7: Strict Hop Resolution & Fail-Closed Unknown Host (Zero Live Internet Dependency)
print("--- TEST 7: STRICT HOP RESOLUTION & FAIL-CLOSED UNKNOWN HOST ---")
ok7a, final7a, err7a = server_mod.execute_strict_ip_pinned_hop_resolution("https://unregistered-domain.com/offer", mock_catalog, timeout=2)
t7a_ok = (ok7a is False and final7a is None and "ERR_DOMAIN_NOT_IN_CATALOG" in str(err7a))
print(f"  [HOP_01a] Unregistered Domain Fail-Closed: [{ 'PASS' if t7a_ok else 'FAIL' }] (Reason: {err7a})")

ok7b, final7b, err7b = server_mod.execute_strict_ip_pinned_hop_resolution("https://safe-fixture.test/offer", mock_catalog, timeout=2)
t7b_ok = (ok7b is False and final7b is None and "ERR_HOP_CONNECTION_FAILED" in str(err7b))
print(f"  [HOP_01b] Unresolvable Sandbox Host Fail-Closed: [{ 'PASS' if t7b_ok else 'FAIL' }] (Reason: {err7b})")

all_passed = ok1 and (not ok2) and (not ok3) and (not ok4) and (not ok5) and exact_match and substring_rejected and t7a_ok and t7b_ok
if all_passed:
    print(f"\n🟢 [RESOLVER-QA-SUMMARY] TOÀN BỘ KIỂM THỬ POLICY & HOP RESOLVER ĐÃ ĐẠT (PASS)!")
    sys.exit(0)
else:
    print(f"\n❌ [RESOLVER-QA-SUMMARY] CÓ LỖI XẢY RA TRONG BỘ KIỂM THỬ RESOLVER!")
    sys.exit(1)
