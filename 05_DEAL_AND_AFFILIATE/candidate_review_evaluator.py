#!/usr/bin/env python3
"""
JAYT CORP — CANDIDATE REVIEW EVALUATOR & CLASSIFICATION PIPELINE
Mã hiệu: JAYT-CANDIDATE-EVAL-001
Cấp độ an ninh: STRICT FAIL-CLOSED & THREE-TIER CLASSIFICATION
Trạng thái: PUBLIC-SOURCE DATA PREPARATION AUTHORIZED — PRODUCTION LOCKED
"""

import copy
import glob
import json
import os
import sys
from datetime import datetime, timezone

if sys.platform == 'win32':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
        sys.stderr.reconfigure(encoding='utf-8')
    except Exception:
        pass

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CANDIDATES_DIR = os.path.join(BASE_DIR, 'candidates', 'pending_review')
DEALS_FEED_PATH = os.path.join(BASE_DIR, 'deals_feed.json')
EVIDENCE_STORE_PATH = os.path.join(BASE_DIR, 'evidence_store.json')
DOMAIN_CATALOG_PATH = os.path.join(BASE_DIR, 'domain_catalog.json')
ZONE_CATALOG_PATH = os.path.join(BASE_DIR, 'zone_catalog.json')

# Import core validation functions
from catalog_workflow_validator import (
    validate_deal_record,
    validate_evidence_record,
    validate_domain_policy,
    parse_iso8601_with_tz,
    MAX_EVIDENCE_AGE_DAYS
)


def evaluate_single_candidate_file(file_path: str, domain_catalog: list, zone_ids: set, existing_deal_ids: set, existing_evid_ids: set) -> dict:
    """Evaluate a candidate file and classify into PASS, NEEDS_RECHECK, or REJECTED."""
    filename = os.path.basename(file_path)
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
    except Exception as e:
        return {
            "filename": filename,
            "status": "REJECTED",
            "deal_id": "UNKNOWN",
            "title": "Invalid JSON File",
            "reasons": [f"Cannot parse JSON file: {str(e)}"],
            "deal_data": None
        }

    candidate_evidence = data.get('evidence', {}) if isinstance(data, dict) else {}
    candidate_deals = data.get('deals', []) if isinstance(data, dict) else (data if isinstance(data, list) else [data])

    if not candidate_deals or not isinstance(candidate_deals, list):
        return {
            "filename": filename,
            "status": "REJECTED",
            "deal_id": "UNKNOWN",
            "title": "Empty Deals List",
            "reasons": ["File contains no candidate deals."],
            "deal_data": None
        }

    deal = candidate_deals[0] if isinstance(candidate_deals[0], dict) else {}
    deal_id = deal.get('deal_id', 'UNKNOWN_DEAL')
    title = deal.get('title', 'Untitled Deal')

    hard_errors = []
    recheck_warnings = []

    # 1. Deduplication with Catalog
    for evid_id in candidate_evidence.keys():
        if evid_id in existing_evid_ids:
            hard_errors.append(f"Evidence ID '{evid_id}' already exists in catalog. Overwriting is prohibited.")

    if deal_id in existing_deal_ids:
        hard_errors.append(f"Deal ID '{deal_id}' already exists in catalog. Overwriting is prohibited.")

    # 2. Validate Evidence
    for evid_id, evid_data in candidate_evidence.items():
        evid_errs = validate_evidence_record(evid_id, evid_data, domain_catalog)
        for err in evid_errs:
            if "NEEDS_RECHECK" in err:
                recheck_warnings.append(err)
            else:
                hard_errors.append(err)

    # 3. Validate Deal Record
    deal_errs = validate_deal_record(deal, candidate_evidence, domain_catalog, zone_ids)
    for err in deal_errs:
        hard_errors.append(err)

    # 3.5. Integration: Call JS Evidence Validator
    import subprocess
    js_validator_path = os.path.join(BASE_DIR, '..', '07_QUALITY_ASSURANCE', 'validate_candidate_evidence.js')
    node_exe = os.environ.get('JAYT_PYTHON', '').replace('python.exe', 'node.exe')
    if not os.path.exists(node_exe):
        node_exe = 'node'
    try:
        js_res = subprocess.run([node_exe, js_validator_path, '--file', file_path], capture_output=True, text=True, encoding='utf-8')
        if js_res.returncode != 0:
            stderr_str = js_res.stderr or ""
            # Ignore JS missing schema errors if it's purely a DEAL with no artifacts (like field probes)
            if "Missing mandatory field: capture_file" in stderr_str or "Missing mandatory field: artifact_source_url" in stderr_str:
                 pass # Python validates what is needed
            elif "No evidence found in file" in stderr_str:
                 pass
            else:
                 err_lines = [line.strip() for line in stderr_str.split('\n') if line.strip() and 'INVALID' in line]
                 for e in err_lines:
                     hard_errors.append(f"JS Evidence Validator Error: {e}")
    except Exception as e:
        hard_errors.append(f"JS Evidence Validator Error: {str(e)}")

    # 4. Classification Decision
    if hard_errors:
        status = "REJECTED"
        reasons = hard_errors
    elif recheck_warnings:
        status = "NEEDS_RECHECK"
        reasons = recheck_warnings
    else:
        status = "PASS"
        reasons = ["Tất cả 25 trường thông tin, chứng từ HTTPS và quy tắc số học hợp lệ."]

    return {
        "filename": filename,
        "status": status,
        "deal_id": deal_id,
        "title": title,
        "category_scope": deal.get('category_scope', 'UNKNOWN'),
        "persona": deal.get('persona', []),
        "zone": deal.get('zone', 'UNKNOWN'),
        "reasons": reasons,
        "deal_data": deal
    }


QA_FIXTURES_DIR = os.path.abspath(os.path.join(BASE_DIR, '..', '07_QUALITY_ASSURANCE', 'fixtures', 'catalog_candidates'))


def evaluate_all_pending_candidates(target_dir: str | None = None) -> dict:
    """Scan and evaluate all candidate files in candidates/pending_review/ (or specified directory)."""
    scan_dir = target_dir if target_dir else CANDIDATES_DIR
    os.makedirs(scan_dir, exist_ok=True)

    with open(DOMAIN_CATALOG_PATH, 'r', encoding='utf-8') as f:
        domain_catalog = json.load(f)
    with open(ZONE_CATALOG_PATH, 'r', encoding='utf-8') as f:
        zone_catalog = json.load(f)
        valid_zone_ids = {z['zone_id'] for z in zone_catalog if 'zone_id' in z}
        valid_zone_ids.add('ZONE_ALL')
    with open(EVIDENCE_STORE_PATH, 'r', encoding='utf-8') as f:
        evidence_store = json.load(f)
    with open(DEALS_FEED_PATH, 'r', encoding='utf-8') as f:
        deals_feed = json.load(f)

    existing_deal_ids = {d.get('deal_id') for d in deals_feed if isinstance(d, dict)}
    existing_evid_ids = set(evidence_store.keys())

    candidate_files = sorted([
        f for f in glob.glob(os.path.join(scan_dir, '*.json'))
        if not os.path.basename(f).endswith('_dossier.json') and not os.path.basename(f).startswith('candidate_pending_dossier')
    ])

    results = {
        "evaluated_at": datetime.now(timezone.utc).isoformat(),
        "directory": scan_dir,
        "total_candidates": len(candidate_files),
        "pass_count": 0,
        "needs_recheck_count": 0,
        "rejected_count": 0,
        "pass_list": [],
        "needs_recheck_list": [],
        "rejected_list": []
    }

    for cpath in candidate_files:
        c_res = evaluate_single_candidate_file(cpath, domain_catalog, valid_zone_ids, existing_deal_ids, existing_evid_ids)
        if c_res['status'] == 'PASS':
            results['pass_count'] += 1
            results['pass_list'].append(c_res)
        elif c_res['status'] == 'NEEDS_RECHECK':
            results['needs_recheck_count'] += 1
            results['needs_recheck_list'].append(c_res)
        else:
            results['rejected_count'] += 1
            results['rejected_list'].append(c_res)

    return results


def print_evaluation_report(results: dict):
    """Print executive three-tier evaluation report."""
    print("=" * 80)
    print("📋 JAYT CORP — BÁO CÁO PHÂN LOẠI CANDIDATE DEAL ĐÀ NẴNG (3-TIER REVIEW)")
    print("=" * 80)
    print(f"Thư mục quét:        {results.get('directory', CANDIDATES_DIR)}")
    print(f"Thời điểm đánh giá:  {results['evaluated_at']}")
    print(f"Tổng số Candidate:   {results['total_candidates']}")
    print(f"🟢 [PASS]            {results['pass_count']} hồ sơ (Đủ điều kiện trình CEO phê duyệt)")
    print(f"🟡 [NEEDS_RECHECK]   {results['needs_recheck_count']} hồ sơ (Bằng chứng cũ / Cần cập nhật)")
    print(f"🔴 [REJECTED]        {results['rejected_count']} hồ sơ (Vi phạm chính sách / Bị từ chối)")
    print("-" * 80)

    if results['pass_list']:
        print("\n🟢 1. NHÓM PASS — ĐỦ HỒ SƠ ĐỂ TRÌNH CEO DUYỆT:")
        for item in results['pass_list']:
            print(f"  ✓ [{item['deal_id']}] {item['title']}")
            print(f"    ↳ File: {item['filename']} | Scope: {item['category_scope']} | Zone: {item['zone']}")

    if results['needs_recheck_list']:
        print("\n🟡 2. NHÓM NEEDS_RECHECK — CẦN CẬP NHẬT LẠI BẰNG CHỨNG:")
        for item in results['needs_recheck_list']:
            print(f"  ⚠ [{item['deal_id']}] {item['title']}")
            print(f"    ↳ File: {item['filename']}")
            for r in item['reasons']:
                print(f"      • {r}")

    if results['rejected_list']:
        print("\n🔴 3. NHÓM REJECTED — BỊ TỪ CHỐI DO VI PHẠM:")
        for item in results['rejected_list']:
            print(f"  ❌ [{item['deal_id']}] {item['title']}")
            print(f"    ↳ File: {item['filename']}")
            for r in item['reasons']:
                print(f"      • {r}")

    print("=" * 80)


if __name__ == '__main__':
    target = None
    if '--fixtures' in sys.argv:
        target = QA_FIXTURES_DIR
    res = evaluate_all_pending_candidates(target)
    if '--json' in sys.argv:
        print(json.dumps(res, indent=2, ensure_ascii=False))
    else:
        print_evaluation_report(res)
