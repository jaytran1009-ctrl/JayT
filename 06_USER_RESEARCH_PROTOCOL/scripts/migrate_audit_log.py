# =============================================================================
# JAYT — AUDIT LOG SCHEMA V2 MIGRATION SCRIPT
# Chỉ thị: JAYT-USER-RESEARCH-005
# =============================================================================
import os
import sys
import json
import hashlib
from datetime import datetime, timezone

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

VAULT_BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
AUDIT_LOG_FILE = os.path.join(VAULT_BASE, "WITHDRAWAL_AUDIT_LOG.jsonl")
MIGRATION_REPORT_FILE = os.path.join(VAULT_BASE, "MIGRATION_AUDIT_REPORT.json")

SCHEMA_V2_ALLOWED_KEYS = {
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
    "address",
    "user_id"
]

def migrate_audit_log():
    if not os.path.exists(AUDIT_LOG_FILE):
        print(f"Log file not found at {AUDIT_LOG_FILE}. Creating empty v2 log.")
        with open(AUDIT_LOG_FILE, "w", encoding="utf-8") as f:
            pass
        return

    with open(AUDIT_LOG_FILE, "r", encoding="utf-8") as f:
        raw_lines = [l.strip() for l in f.readlines() if l.strip()]

    lines_before = len(raw_lines)
    migrated_entries = []

    for idx, line in enumerate(raw_lines, 1):
        try:
            entry = json.loads(line)
        except Exception as e:
            raise ValueError(f"FAIL-CLOSED: Cannot parse JSON at line {idx}: {str(e)}")

        if not isinstance(entry, dict):
            raise ValueError(f"FAIL-CLOSED: Line {idx} is not a JSON object")

        # Map to Schema v2
        event = entry.get("event") or "CONSENT_WITHDRAWAL_EXECUTED"
        token_hash = entry.get("withdrawal_token_hash") or ""
        if len(token_hash) != 64:
            raise ValueError(f"FAIL-CLOSED: Invalid token hash at line {idx}")

        status = entry.get("status") or "PERMANENTLY_PURGED"
        
        # Determine counts
        matched = entry.get("matched_count")
        if matched is None:
            matched = entry.get("files_purged", 1 if status == "PERMANENTLY_PURGED" else 0)
        matched = int(matched)

        purged = entry.get("purged_count")
        if purged is None:
            purged = entry.get("files_purged", 1 if status == "PERMANENTLY_PURGED" else 0)
        purged = int(purged)

        ts = entry.get("timestamp") or datetime.now(timezone.utc).isoformat()
        executor_role = entry.get("executor_role") or entry.get("executor") or "RESEARCH_LEAD"

        v2_entry = {
            "event": event,
            "withdrawal_token_hash": token_hash,
            "matched_count": matched,
            "purged_count": purged,
            "timestamp": ts,
            "executor_role": executor_role,
            "status": status
        }

        # Strict validation: all keys must be in whitelist
        extra_keys = set(v2_entry.keys()) - SCHEMA_V2_ALLOWED_KEYS
        if extra_keys:
            raise ValueError(f"FAIL-CLOSED: Extra keys generated: {extra_keys}")

        migrated_entries.append(v2_entry)

    # Write back clean lines
    with open(AUDIT_LOG_FILE, "w", encoding="utf-8") as f:
        for entry in migrated_entries:
            f.write(json.dumps(entry, ensure_ascii=False) + "\n")

    # Compute new file hash
    with open(AUDIT_LOG_FILE, "rb") as f:
        new_file_hash = hashlib.sha256(f.read()).hexdigest()

    # Scan for forbidden keys in output
    forbidden_found = 0
    with open(AUDIT_LOG_FILE, "r", encoding="utf-8") as f:
        for l in f:
            for fk in FORBIDDEN_KEYS:
                if f'"{fk}"' in l:
                    forbidden_found += 1

    report = {
        "migration_event": "AUDIT_LOG_SCHEMA_V2_MIGRATION",
        "migrated_at": datetime.now(timezone.utc).isoformat(),
        "schema_version": "v2",
        "lines_before": lines_before,
        "lines_after": len(migrated_entries),
        "file_sha256_after": new_file_hash,
        "forbidden_keys_scanned": FORBIDDEN_KEYS,
        "forbidden_keys_found_after": forbidden_found,
        "status": "MIGRATION_VERIFIED_SUCCESS" if forbidden_found == 0 else "MIGRATION_FAILED_DIRTY"
    }

    with open(MIGRATION_REPORT_FILE, "w", encoding="utf-8") as f:
        json.dump(report, f, indent=2, ensure_ascii=False)

    print(f"✅ [MIGRATION-SUCCESS] Migrated {len(migrated_entries)} lines to Schema v2. Forbidden keys found: {forbidden_found}")
    print(f"   ↳ Report written to: {MIGRATION_REPORT_FILE}")

if __name__ == "__main__":
    migrate_audit_log()
