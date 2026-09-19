#!/usr/bin/env python3
"""
JAYT CORP — CATALOG INGESTION PIPELINE (TRUE 2-FILE ATOMIC 2PC & CEO APPROVAL GATE)
Mã hiệu: JAYT-CATALOG-INGEST-001
Cấp độ an ninh: STRICT FAIL-CLOSED & CEO APPROVAL GATE (WORK ORDER 029A)
"""

import copy
import hashlib
import json
import os
import shutil
import sys
import time
from datetime import datetime, timezone

if sys.platform == 'win32':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
        sys.stderr.reconfigure(encoding='utf-8')
    except Exception:
        pass

# Dynamic Root Resolution (NO HARD-CODED DRIVES)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
REPO_ROOT = os.path.abspath(os.path.join(BASE_DIR, '..'))

DEALS_FEED_PATH = os.path.join(BASE_DIR, 'deals_feed.json')
EVIDENCE_STORE_PATH = os.path.join(BASE_DIR, 'evidence_store.json')
DOMAIN_CATALOG_PATH = os.path.join(BASE_DIR, 'domain_catalog.json')
ZONE_CATALOG_PATH = os.path.join(BASE_DIR, 'zone_catalog.json')

from catalog_workflow_validator import (
    validate_candidate_file,
    validate_deal_record,
    validate_evidence_record,
    compute_file_sha256
)
from candidate_review_evaluator import evaluate_single_candidate_file


def validate_ceo_approval_manifest(approval_manifest: dict | None, candidate_data: dict, candidate_path: str | None) -> tuple[bool, str, str]:
    """Validate mandatory explicit CEO Approval Token/Manifest."""
    if not approval_manifest or not isinstance(approval_manifest, dict):
        return False, "ERR_CEO_APPROVAL_REQUIRED", "FAIL-CLOSED: Ingestion requires an explicit CEO Approval Manifest. Auto-import from PASS or READY_FOR_CEO_REVIEW is strictly prohibited."

    if approval_manifest.get('approved_by') != 'CEO_JAY_TRAN':
        return False, "ERR_INVALID_APPROVER", f"FAIL-CLOSED: Approval manifest must be signed by 'CEO_JAY_TRAN' (got '{approval_manifest.get('approved_by')}')."

    if approval_manifest.get('status') != 'AUTHORIZED_FOR_CATALOG_INGESTION':
        return False, "ERR_APPROVAL_NOT_AUTHORIZED", f"FAIL-CLOSED: Approval status is '{approval_manifest.get('status')}'. Must be 'AUTHORIZED_FOR_CATALOG_INGESTION'."

    candidate_id = candidate_data.get('candidate_id')
    if not candidate_id and candidate_data.get('deals') and isinstance(candidate_data['deals'], list) and candidate_data['deals']:
        candidate_id = candidate_data['deals'][0].get('deal_id')

    if approval_manifest.get('candidate_id') != candidate_id:
        return False, "ERR_APPROVAL_CANDIDATE_MISMATCH", f"FAIL-CLOSED: Approval manifest candidate_id '{approval_manifest.get('candidate_id')}' does not match deal candidate_id '{candidate_id}'."

    if candidate_path and os.path.exists(candidate_path):
        actual_hash = compute_file_sha256(candidate_path)
        if approval_manifest.get('candidate_sha256') and approval_manifest['candidate_sha256'] != actual_hash:
            return False, "ERR_APPROVAL_HASH_MISMATCH", f"FAIL-CLOSED: Candidate SHA-256 '{actual_hash}' does not match approval token '{approval_manifest.get('candidate_sha256')}'."

    return True, "", ""


def ingest_candidate_file(
    candidate_path: str,
    target_feed_path: str = DEALS_FEED_PATH,
    target_evidence_path: str = EVIDENCE_STORE_PATH,
    approval_manifest: dict | None = None,
    simulate_evidence_write_failure: bool = False,
    simulate_post_feed_swap_failure: bool = False
) -> dict:
    """
    True 2-File Atomic Ingest Candidate with Dual-Backup Rollback Journal.
    """
    if not os.path.exists(candidate_path):
        return {
            "success": False,
            "error_code": "ERR_CANDIDATE_NOT_FOUND",
            "message": f"Candidate file not found: {candidate_path}",
            "ingested_deals": 0
        }

    pre_feed_hash = compute_file_sha256(target_feed_path) if os.path.exists(target_feed_path) else None
    pre_evidence_hash = compute_file_sha256(target_evidence_path) if os.path.exists(target_evidence_path) else None

    # 1. Parse JSON
    try:
        with open(candidate_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
    except Exception as e:
        return {
            "success": False,
            "error_code": "ERR_JSON_PARSE",
            "message": f"Invalid JSON in candidate file: {str(e)}",
            "ingested_deals": 0
        }

    # 2. Check Candidate Evidence for Temporal Validity Gate (Gate G2)
    candidate_evidence = data.get('evidence', {}) if isinstance(data, dict) else {}
    for evid_id, evid in candidate_evidence.items():
        if evid.get('temporal_validity') == 'UNCONFIRMED_AT_CAPTURE_TIME':
            return {
                "success": False,
                "error_code": "ERR_UNCONFIRMED_TEMPORAL_VALIDITY",
                "message": f"REJECTED_UNCONFIRMED_TEMPORAL_VALIDITY: Evidence '{evid_id}' has temporal_validity 'UNCONFIRMED_AT_CAPTURE_TIME'. Missing verified expiry on promotion page (Fail-Closed).",
                "ingested_deals": 0,
                "pre_feed_hash": pre_feed_hash,
                "post_feed_hash": compute_file_sha256(target_feed_path) if os.path.exists(target_feed_path) else None,
                "pre_evidence_hash": pre_evidence_hash,
                "post_evidence_hash": compute_file_sha256(target_evidence_path) if os.path.exists(target_evidence_path) else None
            }
        if evid.get('expiry_basis') == 'NOT_OBSERVED_ON_CAPTURED_PROMOTION_PAGE':
            return {
                "success": False,
                "error_code": "ERR_EXPIRY_NOT_OBSERVED",
                "message": f"REJECTED_EXPIRY_NOT_OBSERVED: Evidence '{evid_id}' has expiry_basis 'NOT_OBSERVED_ON_CAPTURED_PROMOTION_PAGE'. Cannot ingest deal without confirmed expiry (Fail-Closed).",
                "ingested_deals": 0,
                "pre_feed_hash": pre_feed_hash,
                "post_feed_hash": compute_file_sha256(target_feed_path) if os.path.exists(target_feed_path) else None,
                "pre_evidence_hash": pre_evidence_hash,
                "post_evidence_hash": compute_file_sha256(target_evidence_path) if os.path.exists(target_evidence_path) else None
            }

    # 3. Mandatory CEO Approval Gate (Neither PASS nor READY_FOR_REVIEW may auto-import)
    ok_appr, err_code, err_msg = validate_ceo_approval_manifest(approval_manifest, data, candidate_path)
    if not ok_appr:
        return {
            "success": False,
            "error_code": err_code,
            "message": err_msg,
            "ingested_deals": 0,
            "pre_feed_hash": pre_feed_hash,
            "post_feed_hash": compute_file_sha256(target_feed_path),
            "pre_evidence_hash": pre_evidence_hash,
            "post_evidence_hash": compute_file_sha256(target_evidence_path)
        }

    # 4. TRUE 2-FILE ATOMIC COMMIT WITH DUAL-BACKUP ROLLBACK JOURNAL
    timestamp = int(time.time() * 1000)
    stage_feed_path = f"{target_feed_path}.stage.{timestamp}"
    stage_evidence_path = f"{target_evidence_path}.stage.{timestamp}"
    backup_feed_path = f"{target_feed_path}.bak.{timestamp}"
    backup_evidence_path = f"{target_evidence_path}.bak.{timestamp}"

    feed_swapped = False
    evidence_swapped = False

    try:
        with open(target_feed_path, 'r', encoding='utf-8') as f:
            target_feed = json.load(f)
        with open(target_evidence_path, 'r', encoding='utf-8') as f:
            target_evidence = json.load(f)

        candidate_deals = data.get('deals', []) if isinstance(data, dict) else [data]
        new_feed = copy.deepcopy(target_feed)
        new_feed.extend(candidate_deals)
        new_evidence = copy.deepcopy(target_evidence)
        new_evidence.update(candidate_evidence)

        # Phase 1: Write Staged Copies
        with open(stage_feed_path, 'w', encoding='utf-8') as f:
            json.dump(new_feed, f, indent=2, ensure_ascii=False)

        if simulate_evidence_write_failure:
            raise RuntimeError("SIMULATED_FAULT: Evidence store write crash during Phase 1")

        with open(stage_evidence_path, 'w', encoding='utf-8') as f:
            json.dump(new_evidence, f, indent=2, ensure_ascii=False)

        # Phase 2: Create Preserved Backups before touching target files
        shutil.copy2(target_feed_path, backup_feed_path)
        shutil.copy2(target_evidence_path, backup_evidence_path)

        # Swap Feed First
        shutil.copy2(stage_feed_path, target_feed_path)
        feed_swapped = True

        # Simulate Fault-Injection AFTER Feed is Swapped, but BEFORE Evidence is Swapped
        if simulate_post_feed_swap_failure:
            raise RuntimeError("SIMULATED_FAULT: Crash after feed swapped but before evidence swapped")

        # Swap Evidence Second
        shutil.copy2(stage_evidence_path, target_evidence_path)
        evidence_swapped = True

        # Both Swapped Successfully: Clean up stage and backup files
        for p in [stage_feed_path, stage_evidence_path, backup_feed_path, backup_evidence_path]:
            if os.path.exists(p):
                try: os.remove(p)
                except Exception: pass

        post_feed_hash = compute_file_sha256(target_feed_path)
        post_evidence_hash = compute_file_sha256(target_evidence_path)

        return {
            "success": True,
            "message": f"SUCCESSFULLY_INGESTED: Ingested {len(candidate_deals)} deal(s) from '{candidate_path}'.",
            "ingested_deals": len(candidate_deals),
            "pre_feed_hash": pre_feed_hash,
            "post_feed_hash": post_feed_hash,
            "pre_evidence_hash": pre_evidence_hash,
            "post_evidence_hash": post_evidence_hash
        }

    except Exception as e:
        # ATOMIC ROLLBACK / RECOVERY:
        # If feed was swapped, restore it from backup!
        if feed_swapped and os.path.exists(backup_feed_path):
            try: shutil.copy2(backup_feed_path, target_feed_path)
            except Exception: pass
        if evidence_swapped and os.path.exists(backup_evidence_path):
            try: shutil.copy2(backup_evidence_path, target_evidence_path)
            except Exception: pass

        for p in [stage_feed_path, stage_evidence_path, backup_feed_path, backup_evidence_path]:
            if os.path.exists(p):
                try: os.remove(p)
                except Exception: pass

        return {
            "success": False,
            "error_code": "ERR_INGESTION_ROLLBACK",
            "message": f"INGESTION_ABORTED_AND_ROLLED_BACK: {str(e)}",
            "ingested_deals": 0,
            "pre_feed_hash": pre_feed_hash,
            "post_feed_hash": compute_file_sha256(target_feed_path),
            "pre_evidence_hash": pre_evidence_hash,
            "post_evidence_hash": compute_file_sha256(target_evidence_path)
        }


if __name__ == '__main__':
    if len(sys.argv) < 3 or sys.argv[1] != '--candidate':
        print("Usage: python ingest_candidate_to_catalog.py --candidate <path_to_candidate.json> [--approval-manifest <path>] [--target-feed <path>] [--target-evidence <path>]", file=sys.stderr)
        sys.exit(1)

    candidate_file = sys.argv[2]
    target_feed = DEALS_FEED_PATH
    target_evidence = EVIDENCE_STORE_PATH
    approval_path = None

    if '--target-feed' in sys.argv:
        idx = sys.argv.index('--target-feed')
        if idx + 1 < len(sys.argv):
            target_feed = sys.argv[idx + 1]

    if '--target-evidence' in sys.argv:
        idx = sys.argv.index('--target-evidence')
        if idx + 1 < len(sys.argv):
            target_evidence = sys.argv[idx + 1]

    if '--approval-manifest' in sys.argv:
        idx = sys.argv.index('--approval-manifest')
        if idx + 1 < len(sys.argv):
            approval_path = sys.argv[idx + 1]

    approval_manifest = None
    if approval_path and os.path.exists(approval_path):
        with open(approval_path, 'r', encoding='utf-8') as f:
            approval_manifest = json.load(f)

    res = ingest_candidate_file(candidate_file, target_feed, target_evidence, approval_manifest=approval_manifest)
    print(json.dumps(res, indent=2, ensure_ascii=False))

    if not res['success']:
        sys.exit(1)
    sys.exit(0)
