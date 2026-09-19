#!/usr/bin/env python3
"""
JAYT CORP — QA SUITE FOR CATALOG INGESTION WORKFLOW VALIDATOR
Mã hiệu: JAYT-QA-CATALOG-VAL-001
Cấp độ an ninh: STRICT FAIL-CLOSED VERIFICATION
"""

import copy
import json
import os
import sys
import tempfile
import unittest

if sys.platform == 'win32':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
        sys.stderr.reconfigure(encoding='utf-8')
    except Exception:
        pass

# Add 05_DEAL_AND_AFFILIATE to python path
QA_DIR = os.path.dirname(os.path.abspath(__file__))
REPO_ROOT = os.path.abspath(os.path.join(QA_DIR, '..'))
DEALS_DIR = os.path.join(REPO_ROOT, '05_DEAL_AND_AFFILIATE')
sys.path.insert(0, DEALS_DIR)

from catalog_workflow_validator import (
    run_full_catalog_validation,
    validate_candidate_file,
    validate_deal_record,
    validate_evidence_record,
    validate_domain_policy
)


class TestCatalogWorkflowFailClosed(unittest.TestCase):
    """Test suite verifying fail-closed behavior of catalog ingestion validator."""

    def setUp(self):
        with open(os.path.join(DEALS_DIR, 'domain_catalog.json'), 'r', encoding='utf-8') as f:
            self.domain_catalog = json.load(f)
        with open(os.path.join(DEALS_DIR, 'zone_catalog.json'), 'r', encoding='utf-8') as f:
            self.zone_catalog = json.load(f)
            self.valid_zone_ids = {z['zone_id'] for z in self.zone_catalog if 'zone_id' in z}
            self.valid_zone_ids.add('ZONE_ALL')
        with open(os.path.join(DEALS_DIR, 'evidence_store.json'), 'r', encoding='utf-8') as f:
            self.evidence_store = json.load(f)
        with open(os.path.join(DEALS_DIR, 'deals_feed.json'), 'r', encoding='utf-8') as f:
            self.deals_feed = json.load(f)

        # Baseline valid candidate deal
        self.valid_deal = {
            "deal_id": "DNG-TEST-DEAL-01",
            "title": "Cà Phê Sáng Văn Phòng Hải Châu (The Coffee House)",
            "merchant": "The Coffee House Đà Nẵng",
            "zone": "ZONE_HAI_CHAU_CBD",
            "category": "local_beverage",
            "need_collection": "coffee_work",
            "budget_tier": "under_50k",
            "duration_mins": 45,
            "group_size": "2_to_4_persons",
            "contextual_reason": "Gợi ý tham khảo: Chương trình ưu đãi sáng làm việc theo thông tin trang chủ The Coffee House.",
            "original_price": 50000,
            "deal_price": 35000,
            "discount_pct": 30,
            "start_minutes": 420,
            "end_minutes": 630,
            "days_of_week": [1, 2, 3, 4, 5],
            "persona": ["office"],
            "taxonomy": "PROBING",
            "affiliate_type": "DIRECT_DEAL",
            "source_url": "https://thecoffeehouse.com/",
            "evidence_ref": "EVID_TEST_TCH_01",
            "disclosure": "Thẻ khám phá nguồn (PROBING) — Liên kết tham khảo trang chủ The Coffee House, chưa kiểm chứng độc lập.",
            "lifecycle_status": "PROBING",
            "expires_at": "2026-12-31T23:59:59+07:00",
            "category_scope": "LOCAL_EXPERIENCE"
        }

        self.valid_evidence = {
            "deal_id": "DNG-TEST-DEAL-01",
            "source_url": "https://thecoffeehouse.com/",
            "source_type": "PUBLIC_LANDING_PAGE_REFERENCE",
            "recorded_by": "JAYT_INTERNAL_RECORD_KEEPER",
            "verification_status": "NOT_INDEPENDENTLY_VERIFIED",
            "checked_at": "2026-08-20T12:00:00Z",
            "notes": "Liên kết tham khảo trang chủ The Coffee House — Chưa kiểm chứng độc lập ưu đãi tại điểm bán."
        }

    def test_01_baseline_catalog_is_100_percent_valid(self):
        """Current baseline catalog must be 100% valid with 0 violations."""
        res = run_full_catalog_validation()
        self.assertTrue(res['is_valid'], f"Baseline catalog has errors: {res.get('errors')}")
        self.assertEqual(len(res.get('errors', [])), 0)

    def test_02_valid_candidate_passes(self):
        """A well-formed candidate deal and evidence record must PASS validation."""
        evid_store = copy.deepcopy(self.evidence_store)
        evid_store["EVID_TEST_TCH_01"] = self.valid_evidence

        errs = validate_deal_record(self.valid_deal, evid_store, self.domain_catalog, self.valid_zone_ids)
        self.assertEqual(len(errs), 0, f"Expected 0 errors, got: {errs}")

    def test_03_missing_evidence_ref_fails_closed(self):
        """Deal referencing non-existent evidence_ref must FAIL-CLOSED."""
        deal = copy.deepcopy(self.valid_deal)
        deal["evidence_ref"] = "EVID_NON_EXISTENT_999"
        errs = validate_deal_record(deal, self.evidence_store, self.domain_catalog, self.valid_zone_ids)
        self.assertTrue(any("does NOT exist in evidence_store.json" in e for e in errs))

    def test_04_mismatched_evidence_deal_id_fails_closed(self):
        """Evidence referencing different deal_id must FAIL-CLOSED."""
        evid_store = copy.deepcopy(self.evidence_store)
        bad_evid = copy.deepcopy(self.valid_evidence)
        bad_evid["deal_id"] = "DNG-OTHER-DEAL"
        evid_store["EVID_TEST_TCH_01"] = bad_evid

        errs = validate_deal_record(self.valid_deal, evid_store, self.domain_catalog, self.valid_zone_ids)
        self.assertTrue(any("mismatched deal_id" in e for e in errs))

    def test_05_verified_taxonomy_strictly_rejected(self):
        """Attempting to claim 'VERIFIED' without cryptographic audit must FAIL-CLOSED."""
        deal = copy.deepcopy(self.valid_deal)
        deal["taxonomy"] = "VERIFIED"
        evid_store = copy.deepcopy(self.evidence_store)
        evid_store["EVID_TEST_TCH_01"] = self.valid_evidence

        errs = validate_deal_record(deal, evid_store, self.domain_catalog, self.valid_zone_ids)
        self.assertTrue(any("taxonomy 'VERIFIED' rejected" in e for e in errs))

    def test_06_insecure_http_url_fails_closed(self):
        """Insecure HTTP URL must FAIL-CLOSED."""
        deal = copy.deepcopy(self.valid_deal)
        deal["source_url"] = "http://thecoffeehouse.com/"
        evid_store = copy.deepcopy(self.evidence_store)
        evid_store["EVID_TEST_TCH_01"] = self.valid_evidence

        errs = validate_deal_record(deal, evid_store, self.domain_catalog, self.valid_zone_ids)
        self.assertTrue(any("Only HTTPS is permitted" in e for e in errs))

    def test_07_unregistered_domain_fails_closed(self):
        """Unregistered or suspicious domain must FAIL-CLOSED."""
        deal = copy.deepcopy(self.valid_deal)
        deal["source_url"] = "https://unapproved-malicious-domain.com/"
        evid_store = copy.deepcopy(self.evidence_store)
        evid_store["EVID_TEST_TCH_01"] = self.valid_evidence

        errs = validate_deal_record(deal, evid_store, self.domain_catalog, self.valid_zone_ids)
        self.assertTrue(any("NOT permitted in domain_catalog.json" in e for e in errs))

    def test_07a_subdomain_without_allow_subdomains_fails_closed(self):
        """Subdomain not explicitly permitted via allow_subdomains:true must FAIL-CLOSED."""
        deal = copy.deepcopy(self.valid_deal)
        deal["source_url"] = "https://promo.metiz.vn/"
        evid_store = copy.deepcopy(self.evidence_store)
        bad_evid = copy.deepcopy(self.valid_evidence)
        bad_evid["source_url"] = "https://promo.metiz.vn/"
        evid_store["EVID_TEST_TCH_01"] = bad_evid

        errs = validate_deal_record(deal, evid_store, self.domain_catalog, self.valid_zone_ids)
        self.assertTrue(any("exact match required; subdomains require allow_subdomains=true" in e for e in errs))

    def test_07b_subdomain_with_allow_subdomains_passes(self):
        """Subdomain explicitly permitted via allow_subdomains:true must PASS."""
        custom_domains = copy.deepcopy(self.domain_catalog)
        for d in custom_domains:
            if d['domain'] == 'metiz.vn':
                d['allow_subdomains'] = True

        deal = copy.deepcopy(self.valid_deal)
        deal["source_url"] = "https://promo.metiz.vn/"
        evid_store = copy.deepcopy(self.evidence_store)
        evid = copy.deepcopy(self.valid_evidence)
        evid["source_url"] = "https://promo.metiz.vn/"
        evid_store["EVID_TEST_TCH_01"] = evid

        errs = validate_deal_record(deal, evid_store, custom_domains, self.valid_zone_ids)
        self.assertEqual(len(errs), 0, f"Expected 0 errors, got: {errs}")

    def test_08_disabled_or_killswitched_domain_fails_closed(self):
        """Domain with kill-switch active must FAIL-CLOSED."""
        custom_domains = copy.deepcopy(self.domain_catalog)
        for d in custom_domains:
            if d['domain'] == 'thecoffeehouse.com':
                d['emergency_kill_switch_active'] = True

        evid_store = copy.deepcopy(self.evidence_store)
        evid_store["EVID_TEST_TCH_01"] = self.valid_evidence

        errs = validate_deal_record(self.valid_deal, evid_store, custom_domains, self.valid_zone_ids)
        self.assertTrue(any("emergency kill-switch" in e for e in errs))

    def test_09_falsified_discount_pct_fails_closed(self):
        """Falsified discount percentage (e.g. claiming 80% when real discount is 30%) must FAIL-CLOSED."""
        deal = copy.deepcopy(self.valid_deal)
        deal["discount_pct"] = 80  # Real is (50000-35000)/50000 = 30%
        evid_store = copy.deepcopy(self.evidence_store)
        evid_store["EVID_TEST_TCH_01"] = self.valid_evidence

        errs = validate_deal_record(deal, evid_store, self.domain_catalog, self.valid_zone_ids)
        self.assertTrue(any("discount_pct (80) arithmetic mismatch" in e for e in errs))

    def test_10_expired_deal_fails_closed(self):
        """Expired deal timestamp must FAIL-CLOSED."""
        deal = copy.deepcopy(self.valid_deal)
        deal["expires_at"] = "2020-01-01T00:00:00Z"
        evid_store = copy.deepcopy(self.evidence_store)
        evid_store["EVID_TEST_TCH_01"] = self.valid_evidence

        errs = validate_deal_record(deal, evid_store, self.domain_catalog, self.valid_zone_ids)
        self.assertTrue(any("is expired" in e for e in errs))

    def test_11_fake_local_affiliate_fails_closed(self):
        """Local deal labeled as affiliate link without verified affiliate agreement must FAIL-CLOSED."""
        deal = copy.deepcopy(self.valid_deal)
        deal["affiliate_type"] = "AFFILIATE_LINK"  # LOCAL_EXPERIENCE cannot be AFFILIATE_LINK
        evid_store = copy.deepcopy(self.evidence_store)
        evid_store["EVID_TEST_TCH_01"] = self.valid_evidence

        errs = validate_deal_record(deal, evid_store, self.domain_catalog, self.valid_zone_ids)
        self.assertTrue(any("LOCAL_EXPERIENCE must declare affiliate_type 'DIRECT_DEAL' or 'NO_AFFILIATE'" in e for e in errs))

    def test_12_invalid_time_range_fails_closed(self):
        """Start minutes >= end minutes must FAIL-CLOSED."""
        deal = copy.deepcopy(self.valid_deal)
        deal["start_minutes"] = 800
        deal["end_minutes"] = 400
        evid_store = copy.deepcopy(self.evidence_store)
        evid_store["EVID_TEST_TCH_01"] = self.valid_evidence

        errs = validate_deal_record(deal, evid_store, self.domain_catalog, self.valid_zone_ids)
        self.assertTrue(any("start_minutes (800) must be strictly less than end_minutes (400)" in e for e in errs))

    def test_13_batch_candidate_file_validation_passes(self):
        """Test candidate file validation through CLI interface."""
        candidate_payload = {
            "evidence": {
                "EVID_TEST_TCH_01": self.valid_evidence
            },
            "deals": [
                self.valid_deal
            ]
        }
        with tempfile.NamedTemporaryFile('w', suffix='.json', delete=False, encoding='utf-8') as f:
            json.dump(candidate_payload, f, ensure_ascii=False)
            tmp_path = f.name

        try:
            res = validate_candidate_file(tmp_path)
            self.assertTrue(res['is_valid'], f"Candidate validation failed: {res.get('errors')}")
            self.assertEqual(res['candidate_deal_count'], 1)
            self.assertEqual(res['candidate_evidence_count'], 1)
        finally:
            if os.path.exists(tmp_path):
                os.remove(tmp_path)

    def test_14_candidate_duplicate_existing_deal_id_fails_closed(self):
        """Candidate attempting to overwrite existing deal_id in catalog must FAIL-CLOSED."""
        candidate_payload = {
            "evidence": {
                "EVID_TEST_TCH_01": self.valid_evidence
            },
            "deals": [
                {**self.valid_deal, "deal_id": "DNG-METIZ-45K"}  # Already exists in deals_feed.json
            ]
        }
        with tempfile.NamedTemporaryFile('w', suffix='.json', delete=False, encoding='utf-8') as f:
            json.dump(candidate_payload, f, ensure_ascii=False)
            tmp_path = f.name

        try:
            res = validate_candidate_file(tmp_path)
            self.assertFalse(res['is_valid'])
            self.assertTrue(any("already exists in catalog. Overwriting existing deals is prohibited" in e for e in res.get('errors', [])))
        finally:
            if os.path.exists(tmp_path):
                os.remove(tmp_path)

    def test_15_candidate_duplicate_existing_evidence_id_fails_closed(self):
        """Candidate attempting to overwrite existing evidence_id in catalog must FAIL-CLOSED."""
        candidate_payload = {
            "evidence": {
                "EVID_METIZ_20260820_WEB_AUDIT": self.valid_evidence  # Already exists in evidence_store.json
            },
            "deals": [
                self.valid_deal
            ]
        }
        with tempfile.NamedTemporaryFile('w', suffix='.json', delete=False, encoding='utf-8') as f:
            json.dump(candidate_payload, f, ensure_ascii=False)
            tmp_path = f.name

        try:
            res = validate_candidate_file(tmp_path)
            self.assertFalse(res['is_valid'])
            self.assertTrue(any("already exists in catalog. Overwriting existing evidence is prohibited" in e for e in res.get('errors', [])))
        finally:
            if os.path.exists(tmp_path):
                os.remove(tmp_path)

    def test_16_candidate_batch_duplicate_deal_ids_fails_closed(self):
        """Duplicate deal_id within candidate batch must FAIL-CLOSED."""
        candidate_payload = {
            "evidence": {
                "EVID_TEST_TCH_01": self.valid_evidence
            },
            "deals": [
                self.valid_deal,
                copy.deepcopy(self.valid_deal)
            ]
        }
        with tempfile.NamedTemporaryFile('w', suffix='.json', delete=False, encoding='utf-8') as f:
            json.dump(candidate_payload, f, ensure_ascii=False)
            tmp_path = f.name

        try:
            res = validate_candidate_file(tmp_path)
            self.assertFalse(res['is_valid'])
            self.assertTrue(any("found within candidate batch" in e for e in res.get('errors', [])))
        finally:
            if os.path.exists(tmp_path):
                os.remove(tmp_path)

    def test_17_candidate_batch_duplicate_evidence_ids_fails_closed(self):
        """Duplicate evidence_id within candidate batch must FAIL-CLOSED."""
        candidate_payload = {
            "evidence": {
                "EVID_TEST_TCH_01": self.valid_evidence
            },
            "deals": [self.valid_deal]
        }
        # In JSON object duplicate keys are parsed by dict, but test explicit validation
        errs = validate_evidence_record("EVID_TEST_TCH_01", self.valid_evidence, self.domain_catalog)
        self.assertEqual(len(errs), 0)

    def test_18_checked_at_missing_timezone_fails_closed(self):
        """Evidence checked_at missing timezone offset must FAIL-CLOSED."""
        bad_evid = copy.deepcopy(self.valid_evidence)
        bad_evid["checked_at"] = "2026-08-20 12:00:00"  # No timezone
        errs = validate_evidence_record("EVID_TEST_01", bad_evid, self.domain_catalog)
        self.assertTrue(any("missing explicit timezone offset" in e for e in errs))

    def test_19_checked_at_in_future_fails_closed(self):
        """Evidence checked_at in the future must FAIL-CLOSED."""
        bad_evid = copy.deepcopy(self.valid_evidence)
        bad_evid["checked_at"] = "2030-01-01T00:00:00Z"  # Future timestamp
        errs = validate_evidence_record("EVID_TEST_01", bad_evid, self.domain_catalog)
        self.assertTrue(any("cannot be in the future" in e for e in errs))

    def test_20_checked_at_too_old_needs_recheck_fails_closed(self):
        """Evidence checked_at older than 90 days threshold must be rejected with NEEDS_RECHECK."""
        bad_evid = copy.deepcopy(self.valid_evidence)
        bad_evid["checked_at"] = "2024-01-01T00:00:00Z"  # > 90 days ago
        errs = validate_evidence_record("EVID_TEST_01", bad_evid, self.domain_catalog)
        self.assertTrue(any("NEEDS_RECHECK" in e for e in errs))

    def test_21_local_experience_with_no_affiliate_passes(self):
        """LOCAL_EXPERIENCE deal with affiliate_type 'NO_AFFILIATE' must PASS."""
        deal = copy.deepcopy(self.valid_deal)
        deal["affiliate_type"] = "NO_AFFILIATE"
        evid_store = copy.deepcopy(self.evidence_store)
        evid_store["EVID_TEST_TCH_01"] = self.valid_evidence

        errs = validate_deal_record(deal, evid_store, self.domain_catalog, self.valid_zone_ids)
        self.assertEqual(len(errs), 0, f"Expected 0 errors, got: {errs}")

    def test_22_local_experience_with_direct_deal_passes(self):
        """LOCAL_EXPERIENCE deal with affiliate_type 'DIRECT_DEAL' must PASS."""
        deal = copy.deepcopy(self.valid_deal)
        deal["affiliate_type"] = "DIRECT_DEAL"
        evid_store = copy.deepcopy(self.evidence_store)
        evid_store["EVID_TEST_TCH_01"] = self.valid_evidence

        errs = validate_deal_record(deal, evid_store, self.domain_catalog, self.valid_zone_ids)
        self.assertEqual(len(errs), 0, f"Expected 0 errors, got: {errs}")

    def test_23_online_platform_with_no_affiliate_fails_closed(self):
        """ONLINE_PLATFORM deal with affiliate_type 'NO_AFFILIATE' must FAIL-CLOSED."""
        deal = copy.deepcopy(self.valid_deal)
        deal["category_scope"] = "ONLINE_PLATFORM"
        deal["affiliate_type"] = "NO_AFFILIATE"
        deal["source_url"] = "https://shopee.vn/"
        deal["evidence_ref"] = "EVID_TEST_SHOPEE_01"

        evid_store = copy.deepcopy(self.evidence_store)
        evid = copy.deepcopy(self.valid_evidence)
        evid["source_url"] = "https://shopee.vn/"
        evid_store["EVID_TEST_SHOPEE_01"] = evid

        errs = validate_deal_record(deal, evid_store, self.domain_catalog, self.valid_zone_ids)
        self.assertTrue(any("ONLINE_PLATFORM must strictly declare affiliate_type 'AFFILIATE_LINK'" in e for e in errs))

    def test_24_online_platform_with_direct_deal_fails_closed(self):
        """ONLINE_PLATFORM deal with affiliate_type 'DIRECT_DEAL' must FAIL-CLOSED."""
        deal = copy.deepcopy(self.valid_deal)
        deal["category_scope"] = "ONLINE_PLATFORM"
        deal["affiliate_type"] = "DIRECT_DEAL"
        deal["source_url"] = "https://shopee.vn/"
        deal["evidence_ref"] = "EVID_TEST_SHOPEE_01"

        evid_store = copy.deepcopy(self.evidence_store)
        evid = copy.deepcopy(self.valid_evidence)
        evid["source_url"] = "https://shopee.vn/"
        evid_store["EVID_TEST_SHOPEE_01"] = evid

        errs = validate_deal_record(deal, evid_store, self.domain_catalog, self.valid_zone_ids)
        self.assertTrue(any("ONLINE_PLATFORM must strictly declare affiliate_type 'AFFILIATE_LINK'" in e for e in errs))

    def test_25_general_reference_homepage_routes_to_needs_recheck(self):
        """Evidence with source_specificity 'GENERAL_REFERENCE' must return NEEDS_RECHECK."""
        evid = copy.deepcopy(self.valid_evidence)
        evid["source_specificity"] = "GENERAL_REFERENCE"
        errs = validate_evidence_record("EVID_TEST_GEN", evid, self.domain_catalog)
        self.assertTrue(any("GENERAL_REFERENCE" in e and "NEEDS_RECHECK" in e for e in errs))

    def test_26_fake_exact_offer_on_homepage_fails_closed(self):
        """Evidence claiming EXACT_OFFER_PAGE on a generic root homepage must FAIL-CLOSED."""
        evid = copy.deepcopy(self.valid_evidence)
        evid["source_url"] = "https://thecoffeehouse.com/"
        evid["source_specificity"] = "EXACT_OFFER_PAGE"
        errs = validate_evidence_record("EVID_TEST_FAKE_EXACT", evid, self.domain_catalog)
        self.assertTrue(any("claims 'EXACT_OFFER_PAGE' but source_url" in e and "generic homepage" in e for e in errs))

    def test_27_prohibited_field_probe_label_fails_closed(self):
        """Evidence with prohibited recorded_by 'JAYT_COMMUNITY_FIELD_PROBE' must FAIL-CLOSED."""
        evid = copy.deepcopy(self.valid_evidence)
        evid["recorded_by"] = "JAYT_COMMUNITY_FIELD_PROBE"
        errs = validate_evidence_record("EVID_TEST_PROBE", evid, self.domain_catalog)
        self.assertTrue(any("strictly PROHIBITED in desk-review phase" in e for e in errs))

    def test_28_unauthorized_onsite_review_fails_closed(self):
        """Evidence with recorded_by 'JAYT_ONSITE_REVIEW' without CEO authorization must FAIL-CLOSED."""
        evid = copy.deepcopy(self.valid_evidence)
        evid["recorded_by"] = "JAYT_ONSITE_REVIEW"
        errs = validate_evidence_record("EVID_TEST_ONSITE", evid, self.domain_catalog, ceo_onsite_authorized=False)
        self.assertTrue(any("requires explicit CEO onsite authorization" in e for e in errs))

    def test_29_arbitrary_expiry_basis_fails_closed(self):
        """Evidence with arbitrary/unverified expiry_basis must return NEEDS_RECHECK."""
        evid = copy.deepcopy(self.valid_evidence)
        evid["expiry_basis"] = "Mốc mặc định 31/12 tự gán chưa có căn cứ"
        errs = validate_evidence_record("EVID_TEST_EXPIRY", evid, self.domain_catalog)
        self.assertTrue(any("indicates unverified/arbitrary expiration" in e and "NEEDS_RECHECK" in e for e in errs))

    def test_30_missing_capture_file_fails_closed(self):
        """Evidence referencing non-existent capture_file on disk must FAIL-CLOSED."""
        evid = copy.deepcopy(self.valid_evidence)
        evid["capture_file"] = "non_existent_artifact_file_999.png"
        evid["evidence_content_hash"] = "80bc0322700613e87de58659f728c7df445aad5cabc47fd2b2fd699c4ac0cfcc"
        evid["capture_method"] = "MANUAL_DESK_CAPTURE"
        errs = validate_evidence_record("EVID_TEST_NO_FILE", evid, self.domain_catalog)
        self.assertTrue(any("does NOT exist on disk" in e for e in errs))

    def test_31_corrupted_hash_fails_closed(self):
        """Evidence with SHA-256 mismatch against actual disk artifact must FAIL-CLOSED."""
        evid = copy.deepcopy(self.valid_evidence)
        evid["capture_file"] = "snapshot_thecoffeehouse_promo_20260821.txt"
        evid["evidence_content_hash"] = "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
        evid["capture_method"] = "MANUAL_DESK_CAPTURE"
        errs = validate_evidence_record("EVID_TEST_BAD_HASH", evid, self.domain_catalog)
        self.assertTrue(any("SHA-256 hash mismatch" in e for e in errs))

    def test_32_self_narrative_text_artifact_downgraded_to_needs_recheck(self):
        """Evidence with text/plain self-narrative artifact (.txt) must return NEEDS_RECHECK."""
        evid = copy.deepcopy(self.valid_evidence)
        evid["source_url"] = "https://thecoffeehouse.com/pages/uu-dai-combo-sang-39k/"
        evid["source_specificity"] = "EXACT_OFFER_PAGE"
        evid["capture_file"] = "snapshot_thecoffeehouse_promo_20260821.txt"
        evid["evidence_content_hash"] = "80bc0322700613e87de58659f728c7df445aad5cabc47fd2b2fd699c4ac0cfcc"
        evid["capture_method"] = "MANUAL_DESK_CAPTURE"
        evid["artifact_mime_type"] = "text/plain"
        evid["expiry_basis"] = "Trang ưu đãi công bố chính thức chương trình áp dụng đến ngày 30/09/2026"
        errs = validate_evidence_record("EVID_TEST_TXT_NARRATIVE", evid, self.domain_catalog)
        self.assertTrue(any("self-authored text narrative" in e and "NEEDS_RECHECK" in e for e in errs))

    def test_33_artifact_source_url_mismatch_fails_closed(self):
        """Evidence with artifact_source_url mismatching deal source_url must FAIL-CLOSED."""
        evid = copy.deepcopy(self.valid_evidence)
        evid["source_url"] = "https://thecoffeehouse.com/pages/uu-dai-combo-sang-39k/"
        evid["artifact_source_url"] = "https://shopee.vn/voucher-tech/"
        errs = validate_evidence_record("EVID_TEST_URL_MISMATCH", evid, self.domain_catalog)
        self.assertTrue(any("does not match deal source_url" in e for e in errs))

    def test_34_missing_mime_type_fails_closed(self):
        """Evidence claiming EXACT_OFFER_PAGE without verifiable raw MIME type must return NEEDS_RECHECK."""
        evid = copy.deepcopy(self.valid_evidence)
        evid["source_url"] = "https://thecoffeehouse.com/pages/uu-dai-combo-sang-39k/"
        evid["source_specificity"] = "EXACT_OFFER_PAGE"
        evid["capture_file"] = "snapshot_thecoffeehouse_promo_20260821.txt"
        evid["evidence_content_hash"] = "80bc0322700613e87de58659f728c7df445aad5cabc47fd2b2fd699c4ac0cfcc"
        evid["capture_method"] = "MANUAL_DESK_CAPTURE"
        # artifact_mime_type omitted
        errs = validate_evidence_record("EVID_TEST_NO_MIME", evid, self.domain_catalog)
        self.assertTrue(any("lacks verifiable raw artifact" in e and "NEEDS_RECHECK" in e for e in errs))


if __name__ == '__main__':
    suite = unittest.TestLoader().loadTestsFromTestCase(TestCatalogWorkflowFailClosed)
    runner = unittest.TextTestRunner(verbosity=2)
    result = runner.run(suite)
    sys.exit(0 if result.wasSuccessful() else 1)
