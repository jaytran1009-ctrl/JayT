#!/usr/bin/env python3
"""
JAYT CORP — CANDIDATE INGESTION FAIL-CLOSED CONTRACT TEST SUITE
WORK ORDER: JAYT-INGESTION-SAFETY-029A (TRUE 2-FILE ATOMIC RECOVERY)
"""

import hashlib
import json
import os
import shutil
import subprocess
import sys
import tempfile
import unittest

if sys.platform == 'win32':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
        sys.stderr.reconfigure(encoding='utf-8')
    except Exception:
        pass

QA_DIR = os.path.dirname(os.path.abspath(__file__))
REPO_ROOT = os.path.abspath(os.path.join(QA_DIR, '..'))
DEALS_DIR = os.path.join(REPO_ROOT, '05_DEAL_AND_AFFILIATE')
sys.path.insert(0, DEALS_DIR)

from ingest_candidate_to_catalog import ingest_candidate_file
from catalog_workflow_validator import compute_file_sha256

LIVE_FEED_PATH = os.path.join(DEALS_DIR, 'deals_feed.json')
METIZ_CANDIDATE_PATH = os.path.join(DEALS_DIR, 'candidates', 'pending_review', 'candidate_18_CAND-DNG-METIZ-U22-REAL.json')
INGEST_SCRIPT_PATH = os.path.join(DEALS_DIR, 'ingest_candidate_to_catalog.py')


class TestCandidateIngestFailClosedContract(unittest.TestCase):
    """Test suite proving that unconfirmed temporal validity candidates are strictly rejected by the real ingestion pipeline."""

    @classmethod
    def setUpClass(cls):
        cls.live_pre_hash = compute_file_sha256(LIVE_FEED_PATH)

    def setUp(self):
        self.temp_dir = tempfile.mkdtemp(prefix='jayt_py_ingest_test_')
        self.isolated_feed = os.path.join(self.temp_dir, 'test_deals_feed.json')
        self.isolated_evidence = os.path.join(self.temp_dir, 'test_evidence_store.json')
        with open(self.isolated_feed, 'w', encoding='utf-8') as f:
            json.dump([], f, indent=2)
        with open(self.isolated_evidence, 'w', encoding='utf-8') as f:
            json.dump({}, f, indent=2)
        self.pre_feed_hash = compute_file_sha256(self.isolated_feed)
        self.pre_evidence_hash = compute_file_sha256(self.isolated_evidence)

    def tearDown(self):
        shutil.rmtree(self.temp_dir, ignore_errors=True)

    def test_01_real_metiz_unconfirmed_blocked_from_ingestion(self):
        """Proof: Real Metiz candidate with UNCONFIRMED_AT_CAPTURE_TIME fails ingestion and preserves 0 items."""
        res = ingest_candidate_file(METIZ_CANDIDATE_PATH, self.isolated_feed, self.isolated_evidence)
        self.assertFalse(res['success'], "Ingestion must return success=False")
        self.assertIn("REJECTED_UNCONFIRMED_TEMPORAL_VALIDITY", res['message'])

        post_feed_hash = compute_file_sha256(self.isolated_feed)
        post_evidence_hash = compute_file_sha256(self.isolated_evidence)
        self.assertEqual(self.pre_feed_hash, post_feed_hash, "Target deals feed must have identical SHA-256 byte-for-byte")
        self.assertEqual(self.pre_evidence_hash, post_evidence_hash, "Target evidence store must have identical SHA-256 byte-for-byte")

        with open(self.isolated_feed, 'r', encoding='utf-8') as f:
            feed_data = json.load(f)
        self.assertEqual(len(feed_data), 0, "Feed must contain 0 deals")

    def test_02_synthetic_fixture_unconfirmed_blocked(self):
        """Proof: Synthetic candidate with UNCONFIRMED_AT_CAPTURE_TIME is blocked from ingestion."""
        fixture_path = os.path.join(self.temp_dir, 'synthetic_candidate.json')
        synthetic_data = {
            "evidence": {
                "EVID_SYNTHETIC": {
                    "deal_id": "DNG-SYNTHETIC-01",
                    "source_url": "https://metiz.vn/promo",
                    "source_type": "OFFICIAL_PROMOTION_ANNOUNCEMENT",
                    "recorded_by": "JAYT_DESK_REVIEW_PUBLIC_SOURCE",
                    "verification_status": "NEEDS_RECHECK",
                    "temporal_validity": "UNCONFIRMED_AT_CAPTURE_TIME",
                    "expiry_basis": "NOT_OBSERVED_ON_CAPTURED_PROMOTION_PAGE",
                    "checked_at": "2026-08-22T00:00:00Z",
                    "captured_at": "2026-08-22T00:00:00Z",
                    "notes": "Test synthetic"
                }
            },
            "deals": [
                {
                    "deal_id": "DNG-SYNTHETIC-01",
                    "title": "Deal Test",
                    "merchant": "Metiz",
                    "zone": "ZONE_HELIO_METIZ",
                    "category": "local_entertainment",
                    "need_collection": "general",
                    "budget_tier": "under_100k",
                    "group_size": "1_person",
                    "contextual_reason": "Test",
                    "taxonomy": "PROBING",
                    "affiliate_type": "DIRECT_DEAL",
                    "source_url": "https://metiz.vn/promo",
                    "evidence_ref": "EVID_SYNTHETIC",
                    "disclosure": "Test",
                    "lifecycle_status": "PROBING",
                    "category_scope": "LOCAL_EXPERIENCE"
                }
            ]
        }
        with open(fixture_path, 'w', encoding='utf-8') as f:
            json.dump(synthetic_data, f, indent=2)

        res = ingest_candidate_file(fixture_path, self.isolated_feed, self.isolated_evidence)
        self.assertFalse(res['success'])
        self.assertEqual(res['error_code'], 'ERR_UNCONFIRMED_TEMPORAL_VALIDITY')

        post_feed_hash = compute_file_sha256(self.isolated_feed)
        post_evidence_hash = compute_file_sha256(self.isolated_evidence)
        self.assertEqual(self.pre_feed_hash, post_feed_hash)
        self.assertEqual(self.pre_evidence_hash, post_evidence_hash)

    def test_03_pass_deal_without_ceo_approval_blocked(self):
        """Proof: Ready/Pass candidate without explicit CEO approval manifest is strictly BLOCKED from ingestion."""
        fixture_path = os.path.join(self.temp_dir, 'ready_deal.json')
        ready_data = {
            "evidence": {
                "EVID_READY": {
                    "deal_id": "DNG-READY-01",
                    "source_url": "https://metiz.vn/promotion/khuyen-mai-gia-ve-u22-21.html",
                    "source_type": "OFFICIAL_PROMOTION_ANNOUNCEMENT",
                    "recorded_by": "JAYT_DESK_REVIEW_PUBLIC_SOURCE",
                    "verification_status": "READY_FOR_CEO_REVIEW",
                    "checked_at": "2026-08-22T00:00:00Z",
                    "captured_at": "2026-08-22T00:00:00Z",
                    "notes": "Valid test"
                }
            },
            "deals": [
                {
                    "deal_id": "DNG-READY-01",
                    "title": "Deal Ready",
                    "merchant": "Metiz Cinema",
                    "zone": "ZONE_HELIO_METIZ",
                    "category": "local_entertainment",
                    "need_collection": "general",
                    "budget_tier": "under_100k",
                    "group_size": "1_person",
                    "contextual_reason": "Test",
                    "taxonomy": "PROBING",
                    "affiliate_type": "DIRECT_DEAL",
                    "source_url": "https://metiz.vn/promotion/khuyen-mai-gia-ve-u22-21.html",
                    "evidence_ref": "EVID_READY",
                    "disclosure": "Test",
                    "lifecycle_status": "PROBING",
                    "category_scope": "LOCAL_EXPERIENCE"
                }
            ]
        }
        with open(fixture_path, 'w', encoding='utf-8') as f:
            json.dump(ready_data, f, indent=2)

        res = ingest_candidate_file(fixture_path, self.isolated_feed, self.isolated_evidence)
        self.assertFalse(res['success'])
        self.assertEqual(res['error_code'], 'ERR_CEO_APPROVAL_REQUIRED')

        post_feed_hash = compute_file_sha256(self.isolated_feed)
        post_evidence_hash = compute_file_sha256(self.isolated_evidence)
        self.assertEqual(self.pre_feed_hash, post_feed_hash)
        self.assertEqual(self.pre_evidence_hash, post_evidence_hash)

    def test_04a_fault_injection_phase1_crash_rollback(self):
        """Proof: Crash during Phase 1 evidence write triggers atomic rollback; both feeds retain exact pre-test SHA-256."""
        fixture_path = os.path.join(self.temp_dir, 'ready_deal.json')
        ready_data = {
            "evidence": {
                "EVID_READY": {
                    "deal_id": "DNG-READY-01",
                    "source_url": "https://metiz.vn/promotion/khuyen-mai-gia-ve-u22-21.html",
                    "source_type": "OFFICIAL_PROMOTION_ANNOUNCEMENT",
                    "recorded_by": "JAYT_DESK_REVIEW_PUBLIC_SOURCE",
                    "verification_status": "READY_FOR_CEO_REVIEW",
                    "checked_at": "2026-08-22T00:00:00Z",
                    "captured_at": "2026-08-22T00:00:00Z",
                    "notes": "Valid test"
                }
            },
            "deals": [
                {
                    "deal_id": "DNG-READY-01",
                    "title": "Deal Ready",
                    "merchant": "Metiz Cinema",
                    "zone": "ZONE_HELIO_METIZ",
                    "category": "local_entertainment",
                    "need_collection": "general",
                    "budget_tier": "under_100k",
                    "group_size": "1_person",
                    "contextual_reason": "Test",
                    "taxonomy": "PROBING",
                    "affiliate_type": "DIRECT_DEAL",
                    "source_url": "https://metiz.vn/promotion/khuyen-mai-gia-ve-u22-21.html",
                    "evidence_ref": "EVID_READY",
                    "disclosure": "Test",
                    "lifecycle_status": "PROBING",
                    "category_scope": "LOCAL_EXPERIENCE"
                }
            ]
        }
        with open(fixture_path, 'w', encoding='utf-8') as f:
            json.dump(ready_data, f, indent=2)

        mock_approval = {
            "work_order": "JAYT-TEST-001",
            "candidate_id": "DNG-READY-01",
            "approved_by": "CEO_JAY_TRAN",
            "status": "AUTHORIZED_FOR_CATALOG_INGESTION"
        }

        res = ingest_candidate_file(
            fixture_path,
            self.isolated_feed,
            self.isolated_evidence,
            approval_manifest=mock_approval,
            simulate_evidence_write_failure=True
        )

        self.assertFalse(res['success'])
        self.assertEqual(res['error_code'], 'ERR_INGESTION_ROLLBACK')

        post_feed_hash = compute_file_sha256(self.isolated_feed)
        post_evidence_hash = compute_file_sha256(self.isolated_evidence)
        self.assertEqual(self.pre_feed_hash, post_feed_hash, "Feed must be completely rolled back")
        self.assertEqual(self.pre_evidence_hash, post_evidence_hash, "Evidence store must be completely rolled back")

    def test_04b_fault_injection_post_feed_swap_recovery_proof(self):
        """Proof: Crash AFTER feed swap restores feed from backup copy; 0 partial mutation."""
        fixture_path = os.path.join(self.temp_dir, 'ready_deal.json')
        ready_data = {
            "evidence": {
                "EVID_READY": {
                    "deal_id": "DNG-READY-01",
                    "source_url": "https://metiz.vn/promotion/khuyen-mai-gia-ve-u22-21.html",
                    "source_type": "OFFICIAL_PROMOTION_ANNOUNCEMENT",
                    "recorded_by": "JAYT_DESK_REVIEW_PUBLIC_SOURCE",
                    "verification_status": "READY_FOR_CEO_REVIEW",
                    "checked_at": "2026-08-22T00:00:00Z",
                    "captured_at": "2026-08-22T00:00:00Z",
                    "notes": "Valid test"
                }
            },
            "deals": [
                {
                    "deal_id": "DNG-READY-01",
                    "title": "Deal Ready",
                    "merchant": "Metiz Cinema",
                    "zone": "ZONE_HELIO_METIZ",
                    "category": "local_entertainment",
                    "need_collection": "general",
                    "budget_tier": "under_100k",
                    "group_size": "1_person",
                    "contextual_reason": "Test",
                    "taxonomy": "PROBING",
                    "affiliate_type": "DIRECT_DEAL",
                    "source_url": "https://metiz.vn/promotion/khuyen-mai-gia-ve-u22-21.html",
                    "evidence_ref": "EVID_READY",
                    "disclosure": "Test",
                    "lifecycle_status": "PROBING",
                    "category_scope": "LOCAL_EXPERIENCE"
                }
            ]
        }
        with open(fixture_path, 'w', encoding='utf-8') as f:
            json.dump(ready_data, f, indent=2)

        mock_approval = {
            "work_order": "JAYT-TEST-001",
            "candidate_id": "DNG-READY-01",
            "approved_by": "CEO_JAY_TRAN",
            "status": "AUTHORIZED_FOR_CATALOG_INGESTION"
        }

        res = ingest_candidate_file(
            fixture_path,
            self.isolated_feed,
            self.isolated_evidence,
            approval_manifest=mock_approval,
            simulate_post_feed_swap_failure=True
        )

        self.assertFalse(res['success'])
        self.assertEqual(res['error_code'], 'ERR_INGESTION_ROLLBACK')

        post_feed_hash = compute_file_sha256(self.isolated_feed)
        post_evidence_hash = compute_file_sha256(self.isolated_evidence)
        self.assertEqual(self.pre_feed_hash, post_feed_hash, "Feed must be restored from backup file")
        self.assertEqual(self.pre_evidence_hash, post_evidence_hash, "Evidence store must remain intact")

        with open(self.isolated_feed, 'r', encoding='utf-8') as f:
            feed_data = json.load(f)
        self.assertEqual(len(feed_data), 0, "Feed must contain 0 items after rollback")

    def test_05_cli_subprocess_exits_non_zero(self):
        """Proof: CLI subprocess for ingestion pipeline exits with exit code 1 on unconfirmed temporal candidate."""
        python_exe = sys.executable
        res = subprocess.run([
            python_exe,
            INGEST_SCRIPT_PATH,
            '--candidate', METIZ_CANDIDATE_PATH,
            '--target-feed', self.isolated_feed,
            '--target-evidence', self.isolated_evidence
        ], capture_output=True, text=True, encoding='utf-8')

        self.assertEqual(res.returncode, 1, f"Expected non-zero exit code 1, got {res.returncode}")
        self.assertIn("REJECTED_UNCONFIRMED_TEMPORAL_VALIDITY", res.stdout)

        post_feed_hash = compute_file_sha256(self.isolated_feed)
        post_evidence_hash = compute_file_sha256(self.isolated_evidence)
        self.assertEqual(self.pre_feed_hash, post_feed_hash)
        self.assertEqual(self.pre_evidence_hash, post_evidence_hash)

    def test_06_live_catalog_unmutated_invariant(self):
        """Proof: Live deals_feed.json remains completely unmutated [] (4f53cda18c2baa0c0354bb5f9a3ecbe5ed12ab4d8e11ba873c2f11161202b945)."""
        live_post_hash = compute_file_sha256(LIVE_FEED_PATH)
        self.assertEqual(self.live_pre_hash, live_post_hash)
        self.assertEqual(live_post_hash, '4f53cda18c2baa0c0354bb5f9a3ecbe5ed12ab4d8e11ba873c2f11161202b945')

        with open(LIVE_FEED_PATH, 'r', encoding='utf-8') as f:
            live_data = json.load(f)
        self.assertEqual(len(live_data), 0)


if __name__ == '__main__':
    suite = unittest.TestLoader().loadTestsFromTestCase(TestCandidateIngestFailClosedContract)
    runner = unittest.TextTestRunner(verbosity=2)
    result = runner.run(suite)
    sys.exit(0 if result.wasSuccessful() else 1)
