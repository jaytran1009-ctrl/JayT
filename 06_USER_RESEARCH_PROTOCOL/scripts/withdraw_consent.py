# =============================================================================
# JAYT — ZERO-PII CRYPTOGRAPHIC CONSENT WITHDRAWAL ENGINE
# Chỉ thị: JAYT-USER-RESEARCH-005 (Schema v2 Compliance • Exact-1-Match Guard)
# =============================================================================
import os
import sys
import json
import secrets
import hashlib
import argparse
from datetime import datetime, timezone

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

VAULT_BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RECORDS_DIR = os.path.join(VAULT_BASE, "raw_records")
AUDIT_LOG_FILE = os.path.join(VAULT_BASE, "WITHDRAWAL_AUDIT_LOG.jsonl")

def generate_withdrawal_token() -> str:
    """Sinh mã rút consent ngẫu nhiên với entropy tối thiểu 128-bit (16 bytes hex = 32 ký tự)."""
    entropy_hex = secrets.token_hex(16).upper()
    return f"WITHDRAW-{entropy_hex}"

def compute_token_hash(raw_token: str) -> str:
    cleaned = raw_token.strip()
    return hashlib.sha256(cleaned.encode("utf-8")).hexdigest()

def withdraw_consent(raw_token: str, executor_role: str = "RESEARCH_LEAD", custom_records_dir: str = None) -> tuple:
    """
    Thực thi rút consent với chốt chặn Exact-1-Match Guard và Schema v2 Audit Log:
    - Nếu khớp 0 bản ghi: Từ chối, 0 file bị xóa.
    - Nếu khớp > 1 bản ghi (trùng lặp / mơ hồ): DỪNG FAIL-CLOSED, 0 file bị xóa, ghi log DUPLICATE_OR_AMBIGUOUS_BLOCKED.
    - Nếu khớp ĐÚNG 1 bản ghi: Xóa vĩnh viễn 1 file duy nhất trên Windows.
    """
    if not raw_token or len(raw_token.strip()) < 8:
        return False, "ERR_INVALID_TOKEN_FORMAT", None, 0

    token_hash = compute_token_hash(raw_token)
    target_dir = custom_records_dir or RECORDS_DIR
    
    if not os.path.exists(target_dir):
        os.makedirs(target_dir, exist_ok=True)
        return False, "ERR_NO_RECORDS_STORED", token_hash, 0

    matching_files = []

    for fname in os.listdir(target_dir):
        if not fname.endswith(".json"):
            continue
        fpath = os.path.join(target_dir, fname)
        try:
            with open(fpath, "r", encoding="utf-8") as f:
                data = json.load(f)
                if isinstance(data, dict) and data.get("withdrawal_token_hash") == token_hash:
                    matching_files.append(fpath)
        except Exception:
            continue

    matched_count = len(matching_files)

    # 1. Kịch bản 0 match
    if matched_count == 0:
        return False, "ERR_TOKEN_HASH_NOT_FOUND", token_hash, 0

    # 2. Kịch bản > 1 match: FAIL-CLOSED AMBIGUITY GUARD
    if matched_count > 1:
        audit_entry = {
            "event": "CONSENT_WITHDRAWAL_BLOCKED_AMBIGUITY",
            "withdrawal_token_hash": token_hash,
            "matched_count": matched_count,
            "purged_count": 0,
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "executor_role": executor_role,
            "status": "DUPLICATE_OR_AMBIGUOUS_BLOCKED"
        }
        with open(AUDIT_LOG_FILE, "a", encoding="utf-8") as f:
            f.write(json.dumps(audit_entry, ensure_ascii=False) + "\n")
        return False, "ERR_DUPLICATE_OR_AMBIGUOUS_HASH", token_hash, matched_count

    # 3. Kịch bản ĐÚNG 1 match: Tiến hành tiêu hủy tệp duy nhất
    target_file = matching_files[0]
    try:
        file_len = os.path.getsize(target_file)
        with open(target_file, "wb") as f:
            f.write(b"\x00" * file_len)
        os.remove(target_file)
        
        if os.path.exists(target_file):
            return False, "ERR_FILE_PURGE_FAILED", token_hash, 1
    except Exception as e:
        return False, f"ERR_FILE_PURGE_EXCEPTION: {str(e)}", token_hash, 1

    # Ghi nhật ký kiểm toán Schema v2 tuyệt đối không PII và không participant_id
    audit_entry = {
        "event": "CONSENT_WITHDRAWAL_EXECUTED",
        "withdrawal_token_hash": token_hash,
        "matched_count": 1,
        "purged_count": 1,
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "executor_role": executor_role,
        "status": "PERMANENTLY_PURGED"
    }

    with open(AUDIT_LOG_FILE, "a", encoding="utf-8") as f:
        f.write(json.dumps(audit_entry, ensure_ascii=False) + "\n")

    return True, "SUCCESS_PERMANENTLY_PURGED", token_hash, 1

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="JayT Exact-1-Match Consent Withdrawal Tool (Zero-PII)")
    parser.add_argument("--token", help="Participant-held withdrawal token string")
    parser.add_argument("--generate-token", action="store_true", help="Generate a 128-bit cryptographic token")
    parser.add_argument("--executor-role", default="RESEARCH_LEAD", help="Executor role")
    args = parser.parse_args()

    if args.generate_token:
        newToken = generate_withdrawal_token()
        print(f"Generated 128-bit Token: {newToken}")
        print(f"SHA-256 Token Hash:     {compute_token_hash(newToken)}")
        sys.exit(0)

    if not args.token:
        print("Error: --token is required when not using --generate-token")
        sys.exit(1)

    success, message, t_hash, count = withdraw_consent(args.token, args.executor_role)
    if success:
        print(f"[SUCCESS] Consent withdrawn. Token Hash: {t_hash}. Purged files: {count}")
        sys.exit(0)
    else:
        print(f"[FAILED] Consent withdrawal rejected: {message}. Token Hash: {t_hash}. Matched files: {count}")
        sys.exit(1)
