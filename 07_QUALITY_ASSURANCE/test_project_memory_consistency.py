"""
=============================================================================
JAYT CORP - QUALITY ASSURANCE: PROJECT MEMORY CONSISTENCY TEST SUITE (PYTHON)
WORK ORDER: JAYT-PROJECT-MEMORY-027 / JAYT-LIVE-CATALOG-TRUTH-025B
Purpose: Read-only automated verification of PROJECT_MEMORY.md consistency
         against real system state on disk. Zero hardcoded counts.
Execution: & $env:JAYT_PYTHON 07_QUALITY_ASSURANCE/test_project_memory_consistency.py
=============================================================================
"""

import unittest
import os
import json
import re
import hashlib

REPO_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
MEMORY_PATH = os.path.join(REPO_ROOT, 'PROJECT_MEMORY.md')
MANIFEST_PATH = os.path.join(REPO_ROOT, '08_RELEASE_VAULT', 'RELEASE_MANIFEST.json')
DEALS_FEED_PATH = os.path.join(REPO_ROOT, '05_DEAL_AND_AFFILIATE', 'deals_feed.json')
CANDIDATES_DIR = os.path.join(REPO_ROOT, '05_DEAL_AND_AFFILIATE', 'candidates', 'pending_review')
QUARANTINE_MANIFEST_PATH = os.path.join(REPO_ROOT, '05_DEAL_AND_AFFILIATE', 'quarantine_vault', 'QUARANTINE_MANIFEST.json')
QUARANTINE_GAP_PATH = os.path.join(REPO_ROOT, '05_DEAL_AND_AFFILIATE', 'quarantine_vault', 'QUARANTINE_INTEGRITY_GAP.md')


class TestProjectMemoryConsistency(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        if not os.path.exists(MEMORY_PATH):
            raise FileNotFoundError(f"PROJECT_MEMORY.md not found at {MEMORY_PATH}")
        with open(MEMORY_PATH, 'r', encoding='utf-8') as f:
            cls.memory_text = f.read()

    def test_01_memory_file_exists_and_not_empty(self):
        """Kiểm tra tệp PROJECT_MEMORY.md tồn tại và có dung lượng hợp lệ."""
        self.assertTrue(os.path.exists(MEMORY_PATH))
        self.assertGreater(len(self.memory_text), 1000, "PROJECT_MEMORY.md quá ngắn hoặc bị rỗng")

    def test_02_operational_ssot_scope(self):
        """
        Kiểm tra định vị tài liệu: là Operational SSOT & State Index,
        không thay thế catalog, manifest, evidence hay runtime artifacts.
        """
        is_operational_ssot = ("nguồn sự thật điều hành và chỉ mục trạng thái" in self.memory_text or
                               "Operational SSOT & State Index" in self.memory_text)
        self.assertTrue(is_operational_ssot, "Memory phải định vị là nguồn sự thật điều hành và chỉ mục trạng thái")
        
        does_not_replace = ("tuyệt đối không thay thế" in self.memory_text or
                            "không thay thế catalog" in self.memory_text)
        self.assertTrue(does_not_replace, "Memory phải ghi rõ không thay thế catalog/manifest/evidence.")

    def test_03_production_lock_state_consistency(self):
        """
        FAIL nếu: Memory tuyên bố production mở hoặc được duyệt trong khi
        manifest thực tế vẫn là is_approved: false.
        """
        self.assertTrue(os.path.exists(MANIFEST_PATH), "RELEASE_MANIFEST.json không tồn tại")
        with open(MANIFEST_PATH, 'r', encoding='utf-8') as f:
            manifest = json.load(f)

        is_approved_manifest = manifest.get('governance_locks', {}).get('immutable_ceo_approval_record', {}).get('is_approved', False)

        # Manifest phải là false
        self.assertFalse(is_approved_manifest, "Manifest thực tế đang ở trạng thái mở khóa trái phép!")

        # Memory không được nói production is_approved: true hay Unlocked
        self.assertNotIn("is_approved: true", self.memory_text, "Memory tuyên bố is_approved: true trái phép")
        self.assertIn("is_approved: false", self.memory_text, "Memory phải ghi nhận rõ is_approved: false")
        self.assertIn("PRODUCTION LOCKED", self.memory_text, "Memory phải ghi rõ PRODUCTION LOCKED")

    def test_04_dynamic_deals_feed_consistency(self):
        """
        FAIL nếu:
        - Feed có record nhưng Memory không nêu đúng số lượng record và trạng thái BLOCKED.
        - Feed rỗng nhưng Memory không nêu Honest Empty State [].
        """
        self.assertTrue(os.path.exists(DEALS_FEED_PATH), "deals_feed.json không tồn tại")
        with open(DEALS_FEED_PATH, 'r', encoding='utf-8') as f:
            deals = json.load(f)

        actual_deal_count = len(deals)

        if actual_deal_count > 0:
            mentions_count = (f"{actual_deal_count} bản ghi" in self.memory_text or
                              f"{actual_deal_count} record" in self.memory_text)
            self.assertTrue(mentions_count, f"Memory phải nêu đúng số lượng {actual_deal_count} bản ghi trong feed")
            mentions_blocked = ("BLOCKED" in self.memory_text or "CHƯA ĐỦ ĐIỀU KIỆN" in self.memory_text)
            self.assertTrue(mentions_blocked, "Memory phải ghi nhận catalog hiện chưa đủ điều kiện / BLOCKED")
        else:
            mentions_empty = ("[]" in self.memory_text or "Honest Empty State" in self.memory_text)
            self.assertTrue(mentions_empty, "Memory phải ghi nhận Honest Empty State [] khi feed rỗng")

    def test_05_dynamic_candidate_status_consistency(self):
        """
        FAIL nếu:
        - Số lượng candidate NEEDS_RECHECK không khớp thực tế trên đĩa.
        - Memory tuyên bố candidate 'ready', 'verified', 'approved' để import.
        """
        self.assertTrue(os.path.exists(CANDIDATES_DIR), "Thư mục candidate không tồn tại")
        candidate_files = [f for f in os.listdir(CANDIDATES_DIR) if f.endswith('.json') and 'dossier' not in f]

        actual_recheck_count = 0
        for f in candidate_files:
            filepath = os.path.join(CANDIDATES_DIR, f)
            with open(filepath, 'r', encoding='utf-8') as cf:
                cdata = json.load(cf)
            ev_keys = list(cdata.get('evidence', {}).keys())
            if ev_keys:
                ev_obj = cdata.get('evidence', {}).get(ev_keys[0], {})
                ev_status = ev_obj.get('verification_status') or ev_obj.get('verification_readiness')
                if ev_status == 'NEEDS_RECHECK':
                    actual_recheck_count += 1

        mentions_count = (f"{actual_recheck_count} hồ sơ" in self.memory_text or
                          f"{actual_recheck_count} candidate" in self.memory_text or
                          f"{len(candidate_files)} candidate" in self.memory_text)
        self.assertTrue(mentions_count, f"Memory phải phản ánh đúng số candidate ({actual_recheck_count})")

        self.assertIn("NEEDS_RECHECK", self.memory_text)
        self.assertIn("0 PASS / 0 IMPORT", self.memory_text)
        self.assertNotIn("Candidate đã VERIFIED", self.memory_text)
        self.assertNotIn("Candidate sẵn sàng import", self.memory_text)

    def test_06_linked_artifacts_exist_on_disk(self):
        """
        FAIL nếu: Link artifact được liệt kê trong PROJECT_MEMORY.md không tồn tại trên đĩa.
        """
        link_pattern = r'\[([^\]]+)\]\(([^)]+)\)'
        matches = re.findall(link_pattern, self.memory_text)

        checked_links = 0
        missing_links = []
        for label, target in matches:
            target = target.strip()
            if target.startswith('http://') or target.startswith('https://') or target.startswith('#') or target.startswith('mailto:'):
                continue

            clean_target = target.split('#')[0].strip()
            if not clean_target:
                continue

            full_path = os.path.normpath(os.path.join(REPO_ROOT, clean_target))
            if not os.path.exists(full_path):
                missing_links.append(f"{clean_target} ({label})")
            else:
                checked_links += 1

        self.assertEqual(len(missing_links), 0, f"Các link không tồn tại: {', '.join(missing_links)}")
        self.assertGreater(checked_links, 0, "Phải kiểm tra ít nhất 1 link artifact trên đĩa")

    def test_07_active_work_order_has_acceptance_criteria(self):
        """
        FAIL nếu: Work order đang hoạt động không có tiêu chí nghiệm thu rõ ràng.
        """
        has_heading = ("Work Order Đang Hoạt Động" in self.memory_text or "Work Order Tiếp Theo" in self.memory_text)
        self.assertTrue(has_heading)
        has_criteria = ("Tiêu chí nghiệm thu" in self.memory_text or "Mục tiêu chiến lược" in self.memory_text)
        self.assertTrue(has_criteria)
        has_wo = ("JAYT-EVIDENCE-ACQUISITION-036" in self.memory_text or "JAYT-UX-INTEGRATION-035C" in self.memory_text or "JAYT-UX-INTEGRATION-035B" in self.memory_text)
        self.assertTrue(has_wo)

    def test_08_immutable_principles_enforced(self):
        """
        FAIL nếu: Các nguyên tắc bất biến không được định nghĩa đầy đủ.
        """
        self.assertIn("MODEL ≠ OBSERVED ≠ EVIDENCE", self.memory_text)
        self.assertIn("Fail-Closed Gate", self.memory_text)
        self.assertIn("Không Tạo Dữ Liệu Ảo", self.memory_text)
        self.assertIn("Candidate Không Phải Live Catalog", self.memory_text)
        self.assertIn("Production Mặc Định Khóa Chặt", self.memory_text)

    def test_09_quarantine_integrity_contract(self):
        """
        FAIL nếu:
        - Manifest TRUTH-025 không giữ đúng work_order gốc, thiếu remediation_work_order, hoặc thiếu QUARANTINE_INTEGRITY_GAP.md
        - Hoặc bất kỳ manifest tương lai nào dám khai báo snapshot_byte_for_byte_persisted: false
        - Hoặc manifest tương lai có snapshot nhưng file không khớp SHA-256 byte-for-byte.
        """
        self.assertTrue(os.path.exists(QUARANTINE_MANIFEST_PATH), "QUARANTINE_MANIFEST.json không tồn tại")
        with open(QUARANTINE_MANIFEST_PATH, 'r', encoding='utf-8') as qf:
            q_manifest = json.load(qf)

        work_order = q_manifest.get('work_order')
        if work_order == 'JAYT-LIVE-CATALOG-TRUTH-025':
            # Single historical exemption
            self.assertEqual(q_manifest.get('remediation_work_order'), 'JAYT-LIVE-CATALOG-TRUTH-025A')
            self.assertEqual(q_manifest.get('integrity_remediation_status'), 'DISCLOSED_GAP')
            self.assertFalse(q_manifest.get('snapshot_byte_for_byte_persisted', True))
            self.assertEqual(q_manifest.get('snapshot_gap_status'), 'INTEGRITY_GAP_DISCLOSED_NO_RAW_BYTE_COPY')
            self.assertTrue(os.path.exists(QUARANTINE_GAP_PATH), "QUARANTINE_INTEGRITY_GAP.md phải tồn tại")
        else:
            # All future / other work orders MUST have byte-for-byte snapshot persisted
            is_persisted = q_manifest.get('snapshot_byte_for_byte_persisted', False)
            self.assertTrue(is_persisted, f"Work order '{work_order}' MUST set snapshot_byte_for_byte_persisted: true")
            raw_snapshot_rel = q_manifest.get('raw_byte_for_byte_snapshot_file')
            expected_sha256 = q_manifest.get('source_sha256_pre_quarantine')
            self.assertIsNotNone(raw_snapshot_rel)
            self.assertIsNotNone(expected_sha256)
            raw_path = os.path.normpath(os.path.join(REPO_ROOT, raw_snapshot_rel))
            self.assertTrue(os.path.exists(raw_path))
            with open(raw_path, 'rb') as rf:
                actual_sha = hashlib.sha256(rf.read()).hexdigest()
            self.assertEqual(actual_sha, expected_sha256, "Raw snapshot file must match SHA-256 byte-for-byte")


if __name__ == '__main__':
    unittest.main(verbosity=2)
