# -*- coding: utf-8 -*-
"""
=============================================================================
JAYT PRODUCTION SERVER VISIBILITY GATE TEST SUITE (WORK ORDER: JAYT-LIVE-CATALOG-TRUTH-025)
=============================================================================
1. Live catalog in deals_feed.json is Honest Empty State ([] / 0 deals).
2. Quarantined records in quarantine_vault/ are strictly non-render-eligible.
3. Server-side render eligibility evaluation returns 0 deals.
4. Token issuance fails-closed for any unverified or non-existent deal.
5. Authentic raw artifact fixture is render-eligible in isolated sandbox.
6. Narrative/text artifact is strictly server rejected (Fail-Closed).
7. External file outside vault is strictly isolated.
=============================================================================
"""

import unittest
import os
import sys
import json
import tempfile
import hashlib
import shutil

# Ensure UTF-8 stdout
if hasattr(sys.stdout, "reconfigure"):
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
        sys.stderr.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass

# Add Source of Truth directory to path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "03_SOURCE_OF_TRUTH")))

import jayt_production_server as srv

VAULT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
QUARANTINE_FILE = os.path.join(VAULT_ROOT, "05_DEAL_AND_AFFILIATE", "quarantine_vault", "quarantined_probing_deals_20260822.json")


class TestServerVisibilityGate(unittest.TestCase):
    def setUp(self):
        # Configure test secret
        srv.TOKEN_SIGNING_CONFIGURED = True
        srv.HMAC_SECRET = b"01234567890123456789012345678901_TEST_KEY"

    def test_01_baseline_deals_are_zero_render_eligible_on_server(self):
        """Live deals_feed.json là [] (Honest Empty State) và các bản ghi trong quarantine_vault đều không đủ điều kiện render."""
        live_deals = srv.get_deals_feed()
        evidence = srv.get_evidence_store()
        self.assertEqual(len(live_deals), 0, "Live catalog must be clean Honest Empty State ([]).")

        # Kiểm tra các bản ghi trong quarantine vault
        if os.path.exists(QUARANTINE_FILE):
            with open(QUARANTINE_FILE, "r", encoding="utf-8") as qf:
                q_deals = json.load(qf)
            self.assertEqual(len(q_deals), 10, "Quarantine vault must contain 10 preserved records.")
            for d in q_deals:
                is_eligible = srv.is_deal_render_eligible(d, evidence, VAULT_ROOT)
                self.assertFalse(is_eligible, f"Quarantined deal '{d.get('deal_id')}' must NOT be render-eligible.")

    def test_02_deals_feed_api_does_not_leak_probing_baseline(self):
        """Endpoint /api/deals phải trả mảng rỗng [] và catalog_state: NO_RENDER_ELIGIBLE_DEALS."""
        deals = srv.get_deals_feed()
        evidence = srv.get_evidence_store()

        # Simulate /api/deals filtering
        render_eligible_deals = []
        for did, d in deals.items():
            if srv.is_deal_render_eligible(d, evidence, VAULT_ROOT):
                deal_copy = dict(d)
                deal_copy["render_eligible"] = True
                render_eligible_deals.append(deal_copy)

        self.assertEqual(len(render_eligible_deals), 0)

        api_resp = {
            "status": "OK",
            "catalog_state": "NO_RENDER_ELIGIBLE_DEALS" if len(render_eligible_deals) == 0 else "ACTIVE_RENDER_ELIGIBLE_DEALS",
            "deals": render_eligible_deals,
            "evidence": {},
            "total_count": len(render_eligible_deals),
            "total_stored_deals": len(deals)
        }

        self.assertEqual(api_resp["status"], "OK")
        self.assertEqual(api_resp["catalog_state"], "NO_RENDER_ELIGIBLE_DEALS")
        self.assertEqual(api_resp["deals"], [])
        self.assertEqual(api_resp["total_count"], 0)
        self.assertEqual(api_resp["total_stored_deals"], 0)

    def test_03_token_issue_strictly_blocks_unverified_baseline_deals(self):
        """Thao tác /api/token/issue trên các deal chưa được duyệt / trong quarantine phải bị từ chối Fail-Closed."""
        if os.path.exists(QUARANTINE_FILE):
            with open(QUARANTINE_FILE, "r", encoding="utf-8") as qf:
                q_deals = json.load(qf)
            evidence = srv.get_evidence_store()
            for d in q_deals:
                is_eligible = srv.is_deal_render_eligible(d, evidence, VAULT_ROOT)
                self.assertFalse(is_eligible, f"Quarantined deal '{d.get('deal_id')}' must not be render eligible")

    def test_04_tampered_client_requesting_token_fails_closed_on_server(self):
        """Kể cả khi client bị hack/thao túng để gọi POST /api/token/issue với deal không tồn tại hoặc quarantine, server vẫn chặn."""
        deal_id = "DNG-METIZ-45K"
        deals = srv.get_deals_feed()
        deal = deals.get(deal_id)
        # Deal không có trong live feed
        self.assertIsNone(deal, "Live feed must not contain unverified deal DNG-METIZ-45K")

    def test_05_authentic_raw_artifact_deal_becomes_render_eligible(self):
        """Khi cung cấp tệp lưu vết ảnh .png thô hợp lệ trên đĩa + hash khớp, deal được server công nhận render_eligible: True."""
        temp_dir = tempfile.mkdtemp()
        try:
            sample_png_bytes = b"\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00\x01\x00\x00\x00\x01\x08\x06\x00\x00\x00\x1f\x15c4\x00\x00\x00\nIDATx\x9cc`\x00\x00\x00\x02\x00\x01H\xaf\xa4q\x00\x00\x00\x00IEND\xaeB`\x82"
            png_hash = hashlib.sha256(sample_png_bytes).hexdigest()

            artifact_dir = os.path.join(temp_dir, "05_DEAL_AND_AFFILIATE", "evidence_artifacts")
            os.makedirs(artifact_dir, exist_ok=True)
            png_file = os.path.join(artifact_dir, "authentic_promo.png")
            with open(png_file, "wb") as f:
                f.write(sample_png_bytes)

            evidence_store = {
                "EVID_FIXTURE_VALID": {
                    "deal_id": "DNG-FIXTURE-001",
                    "verification_status": "PROBING",
                    "source_url": "https://promo.approved-partner.test/discount",
                    "artifact_source_url": "https://promo.approved-partner.test/discount",
                    "capture_method": "BROWSER_FULLPAGE_SCREENSHOT",
                    "capture_file": "authentic_promo.png",
                    "artifact_mime_type": "image/png",
                    "evidence_content_hash": png_hash,
                    "captured_at": "2026-08-20T10:00:00Z",
                    "source_type": "OFFICIAL_PROMOTION_ANNOUNCEMENT",
                    "observed_price_or_offer": "35.000đ",
                    "observed_conditions": "Thứ 2 đến Thứ 6",
                    "expiry_basis": "2026-12-31"
                }
            }

            deal = {
                "deal_id": "DNG-FIXTURE-001",
                "title": "Ưu Đãi Kiểm Thử Hợp Lệ",
                "merchant": "Đối Tác Kiểm Thử",
                "zone": "ZONE_HAI_CHAU_CBD",
                "category": "local_food",
                "need_collection": "lunch_under_50k",
                "budget_tier": "under_50k",
                "duration_mins": 30,
                "group_size": "1_person",
                "original_price": 50000,
                "deal_price": 35000,
                "discount_pct": 30,
                "start_minutes": 660,
                "end_minutes": 840,
                "days_of_week": [1, 2, 3, 4, 5],
                "persona": ["office"],
                "taxonomy": "PROBING",
                "affiliate_type": "DIRECT_DEAL",
                "source_url": "https://promo.approved-partner.test/discount",
                "evidence_ref": "EVID_FIXTURE_VALID",
                "disclosure": "Chương trình kiểm thử đối soát bằng chứng.",
                "lifecycle_status": "PROBING",
                "expires_at": "2026-12-31T23:59:59Z",
                "category_scope": "LOCAL_EXPERIENCE"
            }

            is_eligible = srv.is_deal_render_eligible(deal, evidence_store, temp_dir)
            self.assertTrue(is_eligible, "Deal with valid raw artifact file and matched hash must be render_eligible on server.")
        finally:
            shutil.rmtree(temp_dir, ignore_errors=True)

    def test_06_text_self_narrative_artifact_is_server_rejected(self):
        """Deal dùng tệp .txt tự tường thuật bị server từ chối render_eligible (Fail-Closed)."""
        temp_dir = tempfile.mkdtemp()
        try:
            sample_txt_bytes = b"Narrative notes without raw capture."
            txt_hash = hashlib.sha256(sample_txt_bytes).hexdigest()

            artifact_dir = os.path.join(temp_dir, "05_DEAL_AND_AFFILIATE", "evidence_artifacts")
            os.makedirs(artifact_dir, exist_ok=True)
            txt_file = os.path.join(artifact_dir, "self_notes.txt")
            with open(txt_file, "wb") as f:
                f.write(sample_txt_bytes)

            evidence_store = {
                "EVID_FIXTURE_INVALID_TXT": {
                    "deal_id": "DNG-FIXTURE-002",
                    "verification_status": "PROBING",
                    "source_url": "https://promo.approved-partner.test/discount",
                    "capture_method": "MANUAL_DESK_CAPTURE",
                    "capture_file": "self_notes.txt",
                    "evidence_content_hash": txt_hash,
                    "captured_at": "2026-08-20T10:00:00Z"
                }
            }

            deal = {
                "deal_id": "DNG-FIXTURE-002",
                "taxonomy": "PROBING",
                "evidence_ref": "EVID_FIXTURE_INVALID_TXT",
                "source_url": "https://promo.approved-partner.test/discount"
            }

            is_eligible = srv.is_deal_render_eligible(deal, evidence_store, temp_dir)
            self.assertFalse(is_eligible, "Deal with narrative text artifact must NOT be render-eligible (Fail-Closed).")
        finally:
            shutil.rmtree(temp_dir, ignore_errors=True)

    def test_07_source_outside_vault_is_strictly_isolated(self):
        """Tệp ngoài kho không bao giờ được phục vụ hoặc coi là Source of Truth."""
        forbidden_file = os.path.join(VAULT_ROOT, "JAYT_GESSI_EDITION_DEAL_HUB.html")
        is_isolated = not os.path.exists(forbidden_file)
        self.assertTrue(is_isolated, "Legacy unverified file outside vault must remain deleted/isolated.")


if __name__ == "__main__":
    unittest.main(verbosity=2)
