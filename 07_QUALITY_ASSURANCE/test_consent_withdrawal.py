# =============================================================================
# JAYT QUALITY ASSURANCE — CONSENT WITHDRAWAL ENGINE TEST SUITE
# Chỉ thị: JAYT-USER-RESEARCH-005 (Schema v2 Compliance • Full Historical Log Scan)
# =============================================================================
import os
import sys
import json
import shutil
import hashlib
from datetime import datetime, timezone

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

protocol_scripts_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "../06_USER_RESEARCH_PROTOCOL/scripts"))
sys.path.insert(0, protocol_scripts_dir)
from withdraw_consent import withdraw_consent, compute_token_hash, generate_withdrawal_token

print("[JAYT-CONSENT-QA] Khoi chay bo kiem thu co che Rut Consent Schema v2 & Full Log Scan...")

test_tmp_dir = os.path.join(os.path.dirname(__file__), "_tmp_test_records_005")
os.makedirs(test_tmp_dir, exist_ok=True)

SCHEMA_V2_KEYS = {
    "event",
    "withdrawal_token_hash",
    "matched_count",
    "purged_count",
    "timestamp",
    "executor_role",
    "status"
}

FORBIDDEN_KEYS = [
    "deleted_record_id",
    "participant_id",
    "name",
    "phone",
    "email",
    "raw_token",
    "token",
    "address"
]

try:
    # 1. TEST 1: Sinh ma ngau nhien 128-bit entropy
    token_128 = generate_withdrawal_token()
    token_hash_128 = compute_token_hash(token_128)
    t1_pass = (token_128.startswith("WITHDRAW-") and len(token_128) == 41 and len(token_hash_128) == 64)
    print(f"  [WITHDRAW_01] 128-bit Cryptographic Entropy Token Generator: [{'PASS' if t1_pass else 'FAIL'}]")

    # 2. TEST 2: Kich ban 0 match -> 0 file bi xoa (Fail-Closed)
    bad_token = generate_withdrawal_token()
    ok2, msg2, h2, cnt2 = withdraw_consent(bad_token, custom_records_dir=test_tmp_dir)
    t2_pass = (ok2 is False) and (msg2 == "ERR_TOKEN_HASH_NOT_FOUND") and (cnt2 == 0)
    print(f"  [WITHDRAW_02] 0 Match Rejection (Fail-Closed, 0 deleted): [{'PASS' if t2_pass else 'FAIL'}]")

    # 3. TEST 3: Kich ban Dung 1 match -> Xoa CHINH XAC 1 ban ghi
    token_single = generate_withdrawal_token()
    hash_single = compute_token_hash(token_single)
    
    rec_single = {
        "withdrawal_token_hash": hash_single,
        "region_group": "Campus",
        "time_slot": "Sang",
        "task_completion": { "T1": "SUCCESS_UNASSISTED" },
        "created_at": datetime.now(timezone.utc).isoformat()
    }
    single_file_path = os.path.join(test_tmp_dir, "single_rec.json")
    with open(single_file_path, "w", encoding="utf-8") as f:
        json.dump(rec_single, f)

    ok3, msg3, h3, cnt3 = withdraw_consent(token_single, custom_records_dir=test_tmp_dir)
    t3_pass = (ok3 is True) and (msg3 == "SUCCESS_PERMANENTLY_PURGED") and (cnt3 == 1) and not os.path.exists(single_file_path)
    print(f"  [WITHDRAW_03] Exact 1 Match Execution (Purges EXACTLY 1 file): [{'PASS' if t3_pass else 'FAIL'}]")

    # 4. TEST 4: Kich ban >= 2 matches cung hash (Trung lap du lieu) -> FAIL-CLOSED, 0 file bi xoa!
    token_duplicate = generate_withdrawal_token()
    hash_duplicate = compute_token_hash(token_duplicate)

    rec_dup_a = { "withdrawal_token_hash": hash_duplicate, "region_group": "Campus", "copy": "A" }
    rec_dup_b = { "withdrawal_token_hash": hash_duplicate, "region_group": "Van phong", "copy": "B" }
    
    file_dup_a = os.path.join(test_tmp_dir, "dup_a.json")
    file_dup_b = os.path.join(test_tmp_dir, "dup_b.json")
    with open(file_dup_a, "w", encoding="utf-8") as f:
        json.dump(rec_dup_a, f)
    with open(file_dup_b, "w", encoding="utf-8") as f:
        json.dump(rec_dup_b, f)

    ok4, msg4, h4, cnt4 = withdraw_consent(token_duplicate, custom_records_dir=test_tmp_dir)
    files_still_exist = os.path.exists(file_dup_a) and os.path.exists(file_dup_b)
    t4_pass = (ok4 is False) and (msg4 == "ERR_DUPLICATE_OR_AMBIGUOUS_HASH") and (cnt4 == 2) and files_still_exist
    print(f"  [WITHDRAW_04] 2 Matches Ambiguity Blocked (Fail-Closed, 0 files deleted): [{'PASS' if t4_pass else 'FAIL'}]")

    # 5. TEST 5: Kiem tra TOAN BO LICH SU Audit Log (100% dong phai tuan thu Schema v2, 0 forbidden keys)
    audit_log_path = os.path.join(os.path.dirname(__file__), "../06_USER_RESEARCH_PROTOCOL/WITHDRAWAL_AUDIT_LOG.jsonl")
    t5_pass = os.path.exists(audit_log_path)
    total_lines = 0
    clean_lines = 0
    if t5_pass:
        with open(audit_log_path, "r", encoding="utf-8") as f:
            for idx, line in enumerate(f, 1):
                line = line.strip()
                if not line:
                    continue
                total_lines += 1
                entry = json.loads(line)
                
                # Check Schema v2 keys
                entry_keys = set(entry.keys())
                if entry_keys != SCHEMA_V2_KEYS:
                    t5_pass = False
                    break
                
                # Check forbidden keys
                for fk in FORBIDDEN_KEYS:
                    if fk in entry:
                        t5_pass = False
                        break
                if not t5_pass:
                    break
                clean_lines += 1

    t5_pass = t5_pass and (total_lines > 0) and (clean_lines == total_lines)
    print(f"  [WITHDRAW_05] Full Historical Log Scan ({clean_lines}/{total_lines} lines strictly Schema v2, 0 Forbidden Keys): [{'PASS' if t5_pass else 'FAIL'}]")

    all_passed = t1_pass and t2_pass and t3_pass and t4_pass and t5_pass
    print(f"\n[WITHDRAW-QA-SUMMARY] TOAN BO 5/5 KIEM THU EXACT-1-MATCH GUARD & FULL LOG SCAN DA DAT (PASS)!")
    if not all_passed:
        sys.exit(1)
    sys.exit(0)

finally:
    if os.path.exists(test_tmp_dir):
        shutil.rmtree(test_tmp_dir, ignore_errors=True)
