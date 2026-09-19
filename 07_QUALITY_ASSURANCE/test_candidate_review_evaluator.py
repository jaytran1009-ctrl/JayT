#!/usr/bin/env python3
"""
JAYT CORP — QA SUITE FOR CANDIDATE REVIEW EVALUATION & QUEUE PURIFICATION
Mã hiệu: JAYT-QA-CANDIDATE-EVAL-005
Cấp độ an ninh: STRICT FAIL-CLOSED, CLEAN OPERATIONAL QUEUE & ZERO APPROVED
"""

import json
import os
import sys
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
FIXTURES_DIR = os.path.join(QA_DIR, 'fixtures', 'catalog_candidates')
sys.path.insert(0, DEALS_DIR)

from candidate_review_evaluator import evaluate_all_pending_candidates


class TestCandidateReviewEvaluationSuite(unittest.TestCase):
    """QA test suite verifying candidate review pipeline, queue purification and Capture Authenticity Gate."""

    @classmethod
    def setUpClass(cls):
        cls.clean_report = evaluate_all_pending_candidates()
        cls.fixtures_report = evaluate_all_pending_candidates(FIXTURES_DIR)
        with open(os.path.join(DEALS_DIR, 'deals_feed.json'), 'r', encoding='utf-8') as f:
            cls.live_deals = json.load(f)
        cls.live_deal_ids = {d.get('deal_id') for d in cls.live_deals if isinstance(d, dict)}

    def test_01_operational_pending_review_queue_is_clean(self):
        """Assert that the operational pending_review queue only contains genuine pending drafts (0 PASS, 3 NEEDS_RECHECK, 0 REJECTED)."""
        self.assertEqual(self.clean_report['total_candidates'], 3)
        self.assertEqual(self.clean_report['pass_count'], 0, "Operational queue must have 0 PASS")
        self.assertEqual(self.clean_report['needs_recheck_count'], 3, "Operational queue must have 3 NEEDS_RECHECK")
        self.assertEqual(self.clean_report['rejected_count'], 0, "Operational queue must have 0 REJECTED (fixtures moved to QA)")

    def test_02_qa_fixtures_suite_evaluates_correctly(self):
        """Assert that the full test fixtures directory evaluates accurately."""
        self.assertEqual(self.fixtures_report['pass_count'], 0, "Under Authenticity Gate, 0 fixtures are PASS")

    def test_03_candidate_isolation_from_live_catalog(self):
        """Assert 100% of candidate deals across all queues are NOT leaked/merged into deals_feed.json."""
        for report in [self.clean_report, self.fixtures_report]:
            for tier in ['pass_list', 'needs_recheck_list', 'rejected_list']:
                for candidate in report[tier]:
                    cid = candidate['deal_id']
                    self.assertNotIn(
                        cid, self.live_deal_ids,
                        f"CRITICAL ISOLATION VIOLATION: Candidate deal '{cid}' was found in live deals_feed.json!"
                    )

    def test_04_self_authored_text_artifact_downgraded_to_needs_recheck(self):
        """Verify that Candidate 14 (The Coffee House text/plain narrative snapshot) is strictly downgraded to NEEDS_RECHECK."""
        recheck_deals = {c['deal_id']: c for c in self.fixtures_report['needs_recheck_list']}
        self.assertIn('DNG-TCH-PROVENANCE-WORK', recheck_deals)
        item = recheck_deals['DNG-TCH-PROVENANCE-WORK']
        self.assertTrue(any("self-authored text narrative" in r or "plain text note" in r for r in item['reasons']))

    def test_05_artifact_source_url_mismatch_rejected(self):
        """Verify that Candidate 17 in fixtures with mismatched artifact_source_url is strictly REJECTED."""
        rejected_deals = {c['deal_id']: c for c in self.fixtures_report['rejected_list']}
        self.assertIn('DNG-URL-MISMATCH-DEAL', rejected_deals)
        item = rejected_deals['DNG-URL-MISMATCH-DEAL']
        self.assertTrue(any("does not match deal source_url" in r for r in item['reasons']))

    def test_06_metiz_robots_block_without_artifact_routes_to_needs_recheck(self):
        """Verify that Candidate 13 (Metiz deep link lacking local capture artifact) is in NEEDS_RECHECK."""
        recheck_deals = {c['deal_id']: c for c in self.fixtures_report['needs_recheck_list']}
        self.assertIn('DNG-METIZ-STUDENT-45K-OFFER', recheck_deals)
        item = recheck_deals['DNG-METIZ-STUDENT-45K-OFFER']
        self.assertTrue(any("lacks capture artifact" in r for r in item['reasons']))

    def test_07_corrupted_hash_and_missing_file_rejected(self):
        """Verify that Candidate 15 (bad hash) and Candidate 16 (missing file) in fixtures are strictly REJECTED."""
        rejected_deals = {c['deal_id']: c for c in self.fixtures_report['rejected_list']}
        self.assertIn('DNG-CORRUPTED-HASH-DEAL', rejected_deals)
        self.assertTrue(any("SHA-256 hash mismatch" in r for r in rejected_deals['DNG-CORRUPTED-HASH-DEAL']['reasons']))

        self.assertIn('DNG-MISSING-FILE-DEAL', rejected_deals)
        self.assertTrue(any("does NOT exist on disk" in r for r in rejected_deals['DNG-MISSING-FILE-DEAL']['reasons']))

    def test_08_integration_js_validator_blocks_deal(self):
        """Verify integration: candidate trong queue phải được cả validator evidence và evaluator catalog xử lý trong cùng một lượt."""
        rejected_deals = {c['deal_id']: c for c in self.fixtures_report['rejected_list']}
        item = rejected_deals.get('DNG-MISSING-FILE-DEAL')
        self.assertIsNotNone(item)
        js_error_found = any("JS Evidence Validator Error" in r for r in item['reasons'])
        self.assertTrue(js_error_found, "Integration failed: JS validator did not block candidate missing file in Python evaluator")

    def test_09_real_metiz_candidate_needs_recheck(self):
        """Bổ sung 1 integration test dùng candidate Metiz thật đang ở NEEDS_RECHECK, chứng minh nó được evaluator đọc và không thể vào deals_feed.json."""
        recheck_deals = {c['deal_id']: c for c in self.clean_report['needs_recheck_list']}
        self.assertIn('DNG-METIZ-U22-REAL', recheck_deals)
        
        # Verify it didn't leak into deals_feed.json
        self.assertNotIn('DNG-METIZ-U22-REAL', self.live_deal_ids)


if __name__ == '__main__':
    suite = unittest.TestLoader().loadTestsFromTestCase(TestCandidateReviewEvaluationSuite)
    runner = unittest.TextTestRunner(verbosity=2)
    result = runner.run(suite)
    sys.exit(0 if result.wasSuccessful() else 1)
