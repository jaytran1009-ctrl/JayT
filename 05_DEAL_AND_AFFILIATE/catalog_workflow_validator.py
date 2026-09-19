#!/usr/bin/env python3
"""
JAYT CORP — CATALOG WORKFLOW VALIDATOR & INGESTION PIPELINE (FAIL-CLOSED)
Mã hiệu: JAYT-CATALOG-VAL-001
Cấp độ an ninh: STRICT FAIL-CLOSED & DATA HONESTY ENFORCED
Trạng thái: CATALOG WORKFLOW PREPARATION AUTHORIZED — PRODUCTION LOCKED
"""

import hashlib
import json
import os
import re
import sys
from datetime import datetime, timezone
from urllib.parse import urlparse

if sys.platform == 'win32':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
        sys.stderr.reconfigure(encoding='utf-8')
    except Exception:
        pass

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
SNAPSHOTS_DIR = os.path.join(BASE_DIR, 'candidates', 'evidence_snapshots')
DEALS_FEED_PATH = os.path.join(BASE_DIR, 'deals_feed.json')
EVIDENCE_STORE_PATH = os.path.join(BASE_DIR, 'evidence_store.json')
DOMAIN_CATALOG_PATH = os.path.join(BASE_DIR, 'domain_catalog.json')
ZONE_CATALOG_PATH = os.path.join(BASE_DIR, 'zone_catalog.json')

VALID_PERSONAS = {'student', 'office', 'family', 'group'}
VALID_BUDGET_TIERS = {'under_30k', 'under_50k', 'under_100k'}
VALID_GROUP_SIZES = {'1_person', '2_to_4_persons', '5_plus_persons'}
VALID_NEED_COLLECTIONS = {'lunch_under_50k', 'coffee_work', 'campus_student', 'group_hangout', 'online_shopping'}
VALID_CATEGORIES = {'local_food', 'local_beverage', 'local_entertainment', 'local_workspace', 'ecommerce_voucher', 'online_service'}
VALID_CATEGORY_SCOPES = {'LOCAL_EXPERIENCE', 'ONLINE_PLATFORM'}
VALID_AFFILIATE_TYPES = {'DIRECT_DEAL', 'AFFILIATE_LINK', 'NO_AFFILIATE'}
VALID_SOURCE_TYPES = {'PUBLIC_LANDING_PAGE_REFERENCE', 'INSPECTION_RECORD', 'OFFICIAL_PROMOTION_ANNOUNCEMENT', 'GENERAL_REFERENCE'}
VALID_CAPTURE_METHODS = {'MANUAL_DESK_CAPTURE', 'ARCHIVE_SNAPSHOT', 'PUBLIC_API_RESPONSE', 'AUTOMATED_PUBLIC_BROWSER_CAPTURE', 'BROWSER_FULLPAGE_SCREENSHOT', 'PDF_DOCUMENT_SNAPSHOT', 'RAW_HTTPS_RESPONSE_PAYLOAD'}
MAX_EVIDENCE_AGE_DAYS = 90


def compute_file_sha256(filepath: str) -> str:
    """Compute SHA-256 hex digest of a file."""
    h = hashlib.sha256()
    with open(filepath, 'rb') as f:
        for chunk in iter(lambda: f.read(65536), b''):
            h.update(chunk)
    return h.hexdigest()


def parse_iso8601_with_tz(dt_str: str) -> tuple[datetime | None, str]:
    """Parse ISO8601 date string requiring explicit timezone offset."""
    if not dt_str or not isinstance(dt_str, str):
        return None, "Timestamp must be a non-empty string"

    # Require explicit timezone suffix: 'Z', '+HH:MM', '-HH:MM', '+HHMM', '-HHMM'
    tz_pattern = r'(Z|[+-]\d{2}:\d{2}|[+-]\d{4})$'
    if not re.search(tz_pattern, dt_str.strip()):
        return None, f"Timestamp '{dt_str}' is missing explicit timezone offset (e.g. 'Z' or '+07:00') (Fail-Closed)."

    try:
        clean_str = dt_str.strip().replace('Z', '+00:00')
        dt = datetime.fromisoformat(clean_str)
        if dt.tzinfo is None:
            return None, f"Timestamp '{dt_str}' parsed without timezone information."
        return dt, ""
    except Exception as e:
        return None, f"Invalid ISO8601 timestamp '{dt_str}': {str(e)}"


def validate_domain_policy(source_url: str, domain_catalog: list) -> tuple[bool, str]:
    """Validate source_url against active, unrevoked domain catalog with exact subdomain policy."""
    if not source_url or not isinstance(source_url, str):
        return False, "source_url must be a non-empty string"

    if not source_url.startswith('https://'):
        return False, f"Insecure protocol in source_url: '{source_url}'. Only HTTPS is permitted (Fail-Closed)."

    try:
        parsed = urlparse(source_url)
        hostname = (parsed.hostname or '').lower()
    except Exception as e:
        return False, f"Failed to parse source_url '{source_url}': {str(e)}"

    if not hostname:
        return False, f"Missing hostname in source_url: '{source_url}'"

    # Find matching domain entry: Exact hostname match by default; subdomain only if allow_subdomains is True
    matched_entry = None
    for entry in domain_catalog:
        entry_domain = entry.get('domain', '').lower()
        allow_subdomains = entry.get('allow_subdomains', False)

        if hostname == entry_domain:
            matched_entry = entry
            break
        elif allow_subdomains and hostname.endswith('.' + entry_domain):
            matched_entry = entry
            break

    if not matched_entry:
        return False, f"Domain '{hostname}' is NOT permitted in domain_catalog.json (exact match required; subdomains require allow_subdomains=true) (Fail-Closed)."

    if matched_entry.get('status') != 'ACTIVE':
        return False, f"Domain '{hostname}' status is '{matched_entry.get('status')}' (Must be 'ACTIVE')."

    if not matched_entry.get('is_enabled', False):
        return False, f"Domain '{hostname}' is disabled (is_enabled=False)."

    if matched_entry.get('emergency_kill_switch_active', False):
        return False, f"Domain '{hostname}' has active emergency kill-switch (Fail-Closed)."

    approved_protocols = matched_entry.get('approved_protocols', [])
    if 'https' not in approved_protocols:
        return False, f"Domain '{hostname}' does not permit HTTPS in approved_protocols."

    # Check domain expiration
    if matched_entry.get('expires_at'):
        exp_dt, err = parse_iso8601_with_tz(matched_entry['expires_at'])
        if err:
            return False, f"Domain '{hostname}' has invalid expires_at: {err}"
        if datetime.now(timezone.utc) > exp_dt:
            return False, f"Domain '{hostname}' registration expired at {matched_entry['expires_at']}."

    return True, "OK"


VALID_SPECIFICITY = {'EXACT_OFFER_PAGE', 'GENERAL_REFERENCE'}
VALID_RECORDED_BY = {'JAYT_DESK_REVIEW_PUBLIC_SOURCE', 'JAYT_ONSITE_REVIEW', 'JAYT_INTERNAL_RECORD_KEEPER'}
PROHIBITED_RECORDED_BY = {'JAYT_COMMUNITY_FIELD_PROBE', 'JAYT_COMMUNITY_PROBE', 'UNAUTHORIZED_FIELD_AUDIT'}


VALID_MIME_TYPES = {'image/png', 'image/jpeg', 'application/pdf', 'text/html', 'application/json', 'text/plain'}
AUTHENTIC_VERIFIABLE_MIMES = {'image/png', 'image/jpeg', 'application/pdf', 'text/html', 'application/json'}


def validate_evidence_record(evidence_id: str, evidence: dict, domain_catalog: list, ceo_onsite_authorized: bool = False) -> list[str]:
    """Validate a single evidence record with timezone, freshness, specificity, Provenance and Capture Authenticity Gate checks."""
    errors = []
    required_fields = ['deal_id', 'source_url', 'source_type', 'recorded_by', 'verification_status', 'checked_at', 'notes']

    for f in required_fields:
        if f not in evidence or evidence[f] is None:
            errors.append(f"Evidence '{evidence_id}' missing required field: '{f}' (Fail-Closed)")

    if errors:
        return errors

    recorded_by = str(evidence.get('recorded_by', ''))
    if recorded_by in PROHIBITED_RECORDED_BY or 'FIELD_PROBE' in recorded_by:
        errors.append(f"Evidence '{evidence_id}' recorded_by '{recorded_by}' is strictly PROHIBITED in desk-review phase (Fail-Closed). Must use 'JAYT_DESK_REVIEW_PUBLIC_SOURCE'.")
    elif recorded_by == 'JAYT_ONSITE_REVIEW' and not ceo_onsite_authorized:
        errors.append(f"Evidence '{evidence_id}' recorded_by 'JAYT_ONSITE_REVIEW' requires explicit CEO onsite authorization (Fail-Closed).")
    elif recorded_by not in VALID_RECORDED_BY:
        errors.append(f"Evidence '{evidence_id}' invalid recorded_by '{recorded_by}'. Must be one of {sorted(VALID_RECORDED_BY)}.")

    if evidence.get('verification_status') != 'NOT_INDEPENDENTLY_VERIFIED':
        errors.append(f"Evidence '{evidence_id}' verification_status must strictly be 'NOT_INDEPENDENTLY_VERIFIED' (got '{evidence.get('verification_status')}').")

    if evidence.get('source_type') not in VALID_SOURCE_TYPES:
        errors.append(f"Evidence '{evidence_id}' invalid source_type '{evidence.get('source_type')}'. Must be one of {sorted(VALID_SOURCE_TYPES)}.")

    # Capture Authenticity Gate: Artifact verification
    capture_file = evidence.get('capture_file')
    content_hash = evidence.get('evidence_content_hash')
    capture_method = evidence.get('capture_method')
    mime_type = evidence.get('artifact_mime_type')
    artifact_url = evidence.get('artifact_source_url')
    source_url = str(evidence.get('source_url', ''))

    if artifact_url:
        if artifact_url.rstrip('/') != source_url.rstrip('/'):
            errors.append(f"Evidence '{evidence_id}' artifact_source_url '{artifact_url}' does not match deal source_url '{source_url}' (Source Mismatch / Fail-Closed).")

    if capture_file or content_hash or capture_method:
        if not capture_file or not content_hash or not capture_method:
            errors.append(f"Evidence '{evidence_id}' incomplete provenance metadata: capture_file, evidence_content_hash, and capture_method must all be specified together (Fail-Closed).")
        else:
            if capture_method not in VALID_CAPTURE_METHODS:
                errors.append(f"Evidence '{evidence_id}' invalid capture_method '{capture_method}'. Must be one of {sorted(VALID_CAPTURE_METHODS)}.")

            # Path traversal guard
            if '..' in capture_file or capture_file.startswith('/') or capture_file.startswith('\\'):
                errors.append(f"Evidence '{evidence_id}' capture_file '{capture_file}' contains invalid path traversal characters (Fail-Closed).")
            else:
                target_artifact_path = os.path.join(SNAPSHOTS_DIR, capture_file)
                if not os.path.isfile(target_artifact_path):
                    errors.append(f"Evidence '{evidence_id}' capture_file '{capture_file}' does NOT exist on disk at {target_artifact_path} (Fail-Closed).")
                else:
                    actual_hash = compute_file_sha256(target_artifact_path)
                    if actual_hash != content_hash.lower():
                        errors.append(f"Evidence '{evidence_id}' SHA-256 hash mismatch on '{capture_file}': expected {content_hash}, computed {actual_hash} (Tampering / Fail-Closed).")

    # MIME Type and self-authored narrative prohibition
    if mime_type:
        if mime_type not in VALID_MIME_TYPES:
            errors.append(f"Evidence '{evidence_id}' invalid artifact_mime_type '{mime_type}'. Must be one of {sorted(VALID_MIME_TYPES)}.")
        elif mime_type == 'text/plain':
            errors.append(f"Evidence '{evidence_id}' artifact is a self-authored text narrative ('text/plain'). Marked NEEDS_RECHECK — self-narrated text notes cannot substantiate PASS status without verifiable screenshot or raw HTTPS payload (Fail-Closed).")

    if capture_file and (capture_file.endswith('.txt') or capture_file.endswith('.md')) and mime_type != 'text/plain':
        errors.append(f"Evidence '{evidence_id}' artifact '{capture_file}' is a plain text note. Marked NEEDS_RECHECK (Capture Authenticity Gate Fail-Closed).")

    # Specificity checks (Evidence Truth & Provenance Gate)
    specificity = evidence.get('source_specificity')
    if specificity:
        if specificity not in VALID_SPECIFICITY:
            errors.append(f"Evidence '{evidence_id}' invalid source_specificity '{specificity}'. Must be one of {sorted(VALID_SPECIFICITY)}.")
        elif specificity == 'GENERAL_REFERENCE':
            errors.append(f"Evidence '{evidence_id}' source_specificity is 'GENERAL_REFERENCE'. Marked NEEDS_RECHECK — homepage / general reference cannot substantiate specific offer/price (Fail-Closed).")
        elif specificity == 'EXACT_OFFER_PAGE':
            try:
                parsed_url = urlparse(source_url)
                if not parsed_url.path or parsed_url.path == '/':
                    errors.append(f"Evidence '{evidence_id}' claims 'EXACT_OFFER_PAGE' but source_url '{source_url}' is a generic homepage. Must provide exact offer/campaign deep link (Fail-Closed).")
            except Exception:
                pass
            # Provenance & Authenticity requirement
            if not capture_file or not content_hash or not capture_method:
                errors.append(f"Evidence '{evidence_id}' source_specificity is 'EXACT_OFFER_PAGE' but lacks capture artifact (capture_file / evidence_content_hash / capture_method). Marked NEEDS_RECHECK (Provenance Gate Fail-Closed).")
            elif not mime_type or mime_type not in AUTHENTIC_VERIFIABLE_MIMES:
                errors.append(f"Evidence '{evidence_id}' lacks verifiable raw artifact (MIME type must be image/png, image/jpeg, application/pdf, text/html, or application/json). Marked NEEDS_RECHECK (Capture Authenticity Gate Fail-Closed).")

    # Expiry basis check
    if 'expiry_basis' in evidence:
        exp_basis = str(evidence.get('expiry_basis', '')).strip()
        if len(exp_basis) < 15:
            errors.append(f"Evidence '{evidence_id}' expiry_basis must be at least 15 characters stating factual basis for expiration.")
        low_exp = exp_basis.lower()
        if any(k in low_exp for k in ['mặc định', 'tự gán', 'arbitrary', 'mặc định 31/12', 'chưa có căn cứ', 'không rõ hạn']):
            errors.append(f"Evidence '{evidence_id}' expiry_basis indicates unverified/arbitrary expiration ('{exp_basis}'). Marked NEEDS_RECHECK (Fail-Closed).")

    # Timezone & freshness verification for checked_at
    checked_dt, tz_err = parse_iso8601_with_tz(evidence.get('checked_at', ''))
    if tz_err:
        errors.append(f"Evidence '{evidence_id}' checked_at validation failed: {tz_err}")
    elif checked_dt:
        now_utc = datetime.now(timezone.utc)
        if checked_dt > now_utc:
            errors.append(f"Evidence '{evidence_id}' checked_at cannot be in the future ({evidence.get('checked_at')} > {now_utc.isoformat()}) (Fail-Closed).")
        else:
            age_days = (now_utc - checked_dt).days
            if age_days > MAX_EVIDENCE_AGE_DAYS:
                errors.append(f"Evidence '{evidence_id}' checked_at is too old ({age_days} days > {MAX_EVIDENCE_AGE_DAYS} days max threshold). Marked NEEDS_RECHECK — cannot presume deal/price is still valid (Fail-Closed).")

    # Timezone check for captured_at if present
    if 'captured_at' in evidence and evidence['captured_at']:
        cap_dt, cap_err = parse_iso8601_with_tz(evidence.get('captured_at', ''))
        if cap_err:
            errors.append(f"Evidence '{evidence_id}' captured_at validation failed: {cap_err}")

    # Domain check
    dom_ok, dom_msg = validate_domain_policy(evidence.get('source_url', ''), domain_catalog)
    if not dom_ok:
        errors.append(f"Evidence '{evidence_id}' domain validation failed: {dom_msg}")

    return errors


def validate_deal_record(deal: dict, evidence_store: dict, domain_catalog: list, valid_zone_ids: set) -> list[str]:
    """Validate a candidate deal record with strict fail-closed constraints."""
    errors = []
    deal_id = deal.get('deal_id', 'UNKNOWN_DEAL')

    is_needs_recheck = False
    evid_ref = deal.get('evidence_ref')
    if evid_ref in evidence_store:
        evid = evidence_store[evid_ref]
        status = evid.get('verification_status') or evid.get('verification_readiness')
        if status == 'NEEDS_RECHECK':
            is_needs_recheck = True

    required_fields = [
        'deal_id', 'title', 'merchant', 'zone', 'category', 'need_collection',
        'budget_tier', 'group_size', 'contextual_reason',
        'taxonomy', 'affiliate_type', 'source_url',
        'evidence_ref', 'disclosure', 'lifecycle_status', 'category_scope'
    ]
    if not is_needs_recheck:
        required_fields.extend([
            'original_price', 'deal_price', 'discount_pct', 'expires_at',
            'start_minutes', 'end_minutes', 'days_of_week', 'persona', 'duration_mins'
        ])

    for f in required_fields:
        if f not in deal or deal[f] is None:
            errors.append(f"Deal '{deal_id}' missing required field: '{f}' (Fail-Closed)")

    if errors:
        return errors

    # 1. Deal ID format
    if not re.match(r'^(DNG|ECOM|ONL)-[A-Z0-9_-]+$', deal['deal_id']):
        errors.append(f"Deal '{deal_id}' deal_id format invalid. Must match ^(DNG|ECOM|ONL)-[A-Z0-9_-]+$")

    # 2. Category Scope
    cat_scope = deal['category_scope']
    if cat_scope not in VALID_CATEGORY_SCOPES:
        errors.append(f"Deal '{deal_id}' invalid category_scope '{cat_scope}'. Must be in {sorted(VALID_CATEGORY_SCOPES)}")

    # 3. Taxonomy & Lifecycle (Strictly PROBING - NOT verified)
    if deal.get('taxonomy') != 'PROBING':
        errors.append(f"Deal '{deal_id}' taxonomy '{deal.get('taxonomy')}' rejected. Strictly 'PROBING' required without independent multi-party audit certificate.")

    if deal.get('lifecycle_status') != 'PROBING':
        errors.append(f"Deal '{deal_id}' lifecycle_status '{deal.get('lifecycle_status')}' rejected. Strictly 'PROBING' required.")

    # 4. Affiliate Type & Disclosure Truth (Harmonized)
    aff_type = deal.get('affiliate_type')
    if aff_type not in VALID_AFFILIATE_TYPES:
        errors.append(f"Deal '{deal_id}' invalid affiliate_type '{aff_type}'. Must be in {sorted(VALID_AFFILIATE_TYPES)}")

    if cat_scope == 'LOCAL_EXPERIENCE':
        if aff_type not in {'DIRECT_DEAL', 'NO_AFFILIATE'}:
            errors.append(f"Deal '{deal_id}' LOCAL_EXPERIENCE must declare affiliate_type 'DIRECT_DEAL' or 'NO_AFFILIATE' (got '{aff_type}') (Affiliate Truth violation).")

    if cat_scope == 'ONLINE_PLATFORM':
        if aff_type not in {'AFFILIATE_LINK', 'NO_AFFILIATE'}:
            errors.append(f"Deal '{deal_id}' ONLINE_PLATFORM must strictly declare affiliate_type 'AFFILIATE_LINK' or 'NO_AFFILIATE' (got '{aff_type}') (Fail-Closed).")

    if len(str(deal.get('disclosure', '')).strip()) < 20:
        errors.append(f"Deal '{deal_id}' disclosure must be at least 20 characters informing user of terms / probe status.")

    # 5. Zone & Persona
    if cat_scope == 'LOCAL_EXPERIENCE':
        if deal['zone'] not in valid_zone_ids:
            errors.append(f"Deal '{deal_id}' zone '{deal['zone']}' is not in approved zone_catalog.json.")

    if deal.get('persona') is not None or not is_needs_recheck:
        personas = deal.get('persona', [])
        if not isinstance(personas, list) or len(personas) == 0:
            errors.append(f"Deal '{deal_id}' persona must be a non-empty list.")
        else:
            for p in personas:
                if p not in VALID_PERSONAS:
                    errors.append(f"Deal '{deal_id}' invalid persona '{p}'. Must be in {sorted(VALID_PERSONAS)}")

    # 6. Pricing Truth (Note: Arithmetic consistency check only, not a real-world merchant price verification)
    orig = deal.get('original_price')
    prc = deal.get('deal_price')
    pct = deal.get('discount_pct')

    if orig is not None or prc is not None or not is_needs_recheck:
        if not isinstance(orig, (int, float)) or orig <= 0:
            errors.append(f"Deal '{deal_id}' original_price must be positive integer (> 0).")
        if not isinstance(prc, (int, float)) or prc < 0:
            errors.append(f"Deal '{deal_id}' deal_price must be non-negative integer (>= 0).")

        if isinstance(orig, (int, float)) and isinstance(prc, (int, float)) and orig > 0 and prc >= 0:
            if prc > orig:
                errors.append(f"Deal '{deal_id}' deal_price ({prc}) cannot exceed original_price ({orig}).")
            expected_pct = round((orig - prc) * 100 / orig)
            if pct != expected_pct:
                errors.append(f"Deal '{deal_id}' discount_pct ({pct}) arithmetic mismatch with formula round(({orig}-{prc})*100/{orig}) = {expected_pct}%.")

        # 7. Timing Matrix
    if deal.get('start_minutes') is not None or deal.get('end_minutes') is not None or not is_needs_recheck:
        start_m = deal.get('start_minutes')
        end_m = deal.get('end_minutes')
        if not isinstance(start_m, int) or start_m < 0 or start_m > 1439:
            errors.append(f"Deal '{deal_id}' start_minutes ({start_m}) must be 0..1439.")
        if not isinstance(end_m, int) or end_m < 1 or end_m > 1440:
            errors.append(f"Deal '{deal_id}' end_minutes ({end_m}) must be 1..1440.")
        if isinstance(start_m, int) and isinstance(end_m, int) and start_m >= end_m:
            errors.append(f"Deal '{deal_id}' start_minutes ({start_m}) must be strictly less than end_minutes ({end_m}).")

    if deal.get('days_of_week') is not None or not is_needs_recheck:
        days = deal.get('days_of_week', [])
        if not isinstance(days, list) or len(days) == 0:
            errors.append(f"Deal '{deal_id}' days_of_week must be a non-empty list.")
        else:
            for d in days:
                if not isinstance(d, int) or d < 1 or d > 7:
                    errors.append(f"Deal '{deal_id}' invalid day_of_week '{d}' (must be 1..7).")

    # 8. Expiration
    if deal.get('expires_at') is not None or not is_needs_recheck:
        exp_dt, exp_err = parse_iso8601_with_tz(deal.get('expires_at', ''))
        if exp_err:
            errors.append(f"Deal '{deal_id}' expires_at validation failed: {exp_err}")
        elif exp_dt:
            now_dt = datetime.now(timezone.utc)
            if exp_dt <= now_dt:
                errors.append(f"Deal '{deal_id}' is expired (expires_at={deal.get('expires_at')}, current_utc={now_dt.isoformat()}).")

    # 9. Evidence Store Linkage
    evid_ref = deal.get('evidence_ref')
    if evid_ref not in evidence_store:
        errors.append(f"Deal '{deal_id}' references evidence '{evid_ref}' which does NOT exist in evidence_store.json (Fail-Closed).")
    else:
        evid = evidence_store[evid_ref]
        if evid.get('deal_id') != deal['deal_id']:
            errors.append(f"Deal '{deal_id}' evidence_ref '{evid_ref}' has mismatched deal_id: expected '{deal['deal_id']}', found '{evid.get('deal_id')}'.")
        if evid.get('source_url') != deal['source_url']:
            errors.append(f"Deal '{deal_id}' evidence_ref '{evid_ref}' has mismatched source_url: expected '{deal['source_url']}', found '{evid.get('source_url')}'.")

    # 10. Domain Policy
    dom_ok, dom_msg = validate_domain_policy(deal.get('source_url', ''), domain_catalog)
    if not dom_ok:
        errors.append(f"Deal '{deal_id}' domain validation failed: {dom_msg}")

    return errors


def run_full_catalog_validation() -> dict:
    """Run full catalog validation across all source of truth JSON databases."""
    errors = []

    # 1. Load Files
    try:
        with open(DOMAIN_CATALOG_PATH, 'r', encoding='utf-8') as f:
            domain_catalog = json.load(f)
    except Exception as e:
        return {"is_valid": False, "errors": [f"Cannot load domain_catalog.json: {str(e)}"]}

    try:
        with open(ZONE_CATALOG_PATH, 'r', encoding='utf-8') as f:
            zone_catalog = json.load(f)
            valid_zone_ids = {z['zone_id'] for z in zone_catalog if 'zone_id' in z}
            valid_zone_ids.add('ZONE_ALL')
    except Exception as e:
        return {"is_valid": False, "errors": [f"Cannot load zone_catalog.json: {str(e)}"]}

    try:
        with open(EVIDENCE_STORE_PATH, 'r', encoding='utf-8') as f:
            evidence_store = json.load(f)
    except Exception as e:
        return {"is_valid": False, "errors": [f"Cannot load evidence_store.json: {str(e)}"]}

    try:
        with open(DEALS_FEED_PATH, 'r', encoding='utf-8') as f:
            deals_feed = json.load(f)
    except Exception as e:
        return {"is_valid": False, "errors": [f"Cannot load deals_feed.json: {str(e)}"]}

    # 2. Validate Evidence Store
    for evid_id, evid_data in evidence_store.items():
        evid_errs = validate_evidence_record(evid_id, evid_data, domain_catalog)
        errors.extend(evid_errs)

    # 3. Validate Deals Feed
    deal_ids_seen = set()
    for deal in deals_feed:
        did = deal.get('deal_id')
        if did in deal_ids_seen:
            errors.append(f"Duplicate deal_id found in catalog: '{did}'")
        deal_ids_seen.add(did)

        deal_errs = validate_deal_record(deal, evidence_store, domain_catalog, valid_zone_ids)
        errors.extend(deal_errs)

    is_valid = len(errors) == 0
    return {
        "is_valid": is_valid,
        "deal_count": len(deals_feed),
        "evidence_count": len(evidence_store),
        "domain_count": len(domain_catalog),
        "zone_count": len(zone_catalog),
        "errors": errors
    }


def validate_candidate_file(candidate_path: str) -> dict:
    """Validate an external candidate deal or batch of deals before ingestion with deduplication guards."""
    if not os.path.exists(candidate_path):
        return {"is_valid": False, "errors": [f"File not found: {candidate_path}"]}

    try:
        with open(candidate_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
    except Exception as e:
        return {"is_valid": False, "errors": [f"Invalid JSON file: {str(e)}"]}

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
    existing_evidence_ids = set(evidence_store.keys())

    candidate_evidence = data.get('evidence', {}) if isinstance(data, dict) else {}
    candidate_deals = data.get('deals', []) if isinstance(data, dict) else (data if isinstance(data, list) else [data])

    errors = []

    # 1. Deduplication Checks for Evidence
    candidate_evid_seen = set()
    for evid_id in candidate_evidence.keys():
        if evid_id in existing_evidence_ids:
            errors.append(f"Candidate evidence_id '{evid_id}' already exists in catalog. Overwriting existing evidence is prohibited (Fail-Closed).")
        if evid_id in candidate_evid_seen:
            errors.append(f"Duplicate evidence_id '{evid_id}' found within candidate batch (Fail-Closed).")
        candidate_evid_seen.add(evid_id)

    # 2. Deduplication Checks for Deals
    candidate_deal_seen = set()
    for deal in candidate_deals:
        did = deal.get('deal_id') if isinstance(deal, dict) else None
        if did:
            if did in existing_deal_ids:
                errors.append(f"Candidate deal_id '{did}' already exists in catalog. Overwriting existing deals is prohibited (Fail-Closed).")
            if did in candidate_deal_seen:
                errors.append(f"Duplicate deal_id '{did}' found within candidate batch (Fail-Closed).")
            candidate_deal_seen.add(did)

    # If duplicate IDs exist, fail immediately without merging
    if errors:
        return {
            "is_valid": False,
            "candidate_deal_count": len(candidate_deals),
            "candidate_evidence_count": len(candidate_evidence),
            "errors": errors
        }

    merged_evidence = {**evidence_store, **candidate_evidence}

    # 3. Validate candidate evidence
    for evid_id, evid_data in candidate_evidence.items():
        evid_errs = validate_evidence_record(evid_id, evid_data, domain_catalog)
        errors.extend(evid_errs)

    # 4. Validate candidate deals
    for deal in candidate_deals:
        deal_errs = validate_deal_record(deal, merged_evidence, domain_catalog, valid_zone_ids)
        errors.extend(deal_errs)

    return {
        "is_valid": len(errors) == 0,
        "candidate_deal_count": len(candidate_deals),
        "candidate_evidence_count": len(candidate_evidence),
        "errors": errors
    }


if __name__ == '__main__':
    if len(sys.argv) > 1 and sys.argv[1] == '--candidate' and len(sys.argv) > 2:
        res = validate_candidate_file(sys.argv[2])
        print(json.dumps(res, indent=2, ensure_ascii=False))
        sys.exit(0 if res['is_valid'] else 1)

    result = run_full_catalog_validation()
    print("=" * 70)
    print("📋 JAYT CORP — CATALOG INTEGRITY & INGESTION WORKFLOW REPORT")
    print("=" * 70)
    print(f"Status:             {'🟢 VALID (100% PASS)' if result['is_valid'] else '🔴 INVALID (FAIL-CLOSED)'}")
    print(f"Active Deals:       {result.get('deal_count', 0)}")
    print(f"Evidence Records:   {result.get('evidence_count', 0)}")
    print(f"Approved Domains:   {result.get('domain_count', 0)}")
    print(f"Approved Zones:     {result.get('zone_count', 0)}")
    print(f"Total Violations:   {len(result.get('errors', []))}")
    if result.get('errors'):
        print("\nViolations List:")
        for err in result['errors']:
            print(f"  ❌ {err}")
    print("=" * 70)
    sys.exit(0 if result['is_valid'] else 1)

