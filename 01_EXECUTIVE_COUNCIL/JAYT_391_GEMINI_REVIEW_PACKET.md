# JAYT-391 GEMINI REVIEW PACKET: DECOUPLED EXECUTION & FOUR-QUOTE PROVENANCE DOSSIER

**Document ID:** `JAYT_391_GEMINI_REVIEW_PACKET`  
**Work Order:** `WORK_ORDER_J391_DECOUPLED_EXECUTION`  
**Dispatch SHA-256:** `0bfde09163c54f7667d05d7a36857876cb19a9eeb0cf0b8d57490e6475fe8a2c`  
**Executor:** Antigravity  
**Review Authority:** Codex CEO & Gemini Safety Review Gate  
**Date:** 2026-09-11  
**Status:** `SUBMITTED_FOR_REVIEW__CANONICAL_DEPLOYMENT_FROZEN`

---

## 1. Executive Summary & Decoupled Architecture

Pursuant to directive [WORK_ORDER_J391_DECOUPLED_EXECUTION.json](file:///D:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/04_DATA_PIPELINE/dispatch/WORK_ORDER_J391_DECOUPLED_EXECUTION.json), candidate pipeline operations for cycle **JAYT-391** have executed under a strict decoupled lane architecture:

1. **Lane 1 (Local F&B & Cinema Wave 1):** Independently audited 15 first-party HTML deal artifacts. Each offer now possesses a dedicated `<offer_id>.quotes.json` evidence file with verbatim UTF-8 substrings mapped to exact byte offsets `[byte_offset_start..byte_offset_end]` in the raw HTML files.
   - **Wave 1 Da Nang Qualified:** Exactly **5 deals** satisfy all 4 predicates (Offer, Validity, Da Nang Scope, Terms) directly in bytes.
   - **Wave 1 Excluded (Honest Disclosure):** Exactly **10 deals** are excluded from Wave 1 Da Nang release (**5 VERIFIED_REGIONAL**, **5 SOURCE_INSUFFICIENT**). Zero manufactured 15-deal claims.
2. **Lane 2 (Dorm/Study KTX Sanitization):** Retained all 30 KTX SKUs in **neutral survey mode** (`LABELED_NEUTRAL_PLACEHOLDER`, `is_verified: false`). Ceased bare-request capture patterns that yield SGW/WAF challenges. Affiliate links remain strictly **disabled** (`affiliate_enabled: false`).
3. **Authentic Operations:** Configured 4-hour scheduler (`0 */4 * * *`) with least-privilege identity on host workstation, strict allowlist of fixed 30 audited SKU IDs, and SLA <= 60s alert queue. Rollback drill established as a dedicated non-destructive **test-target plan**; canonical production alias was **never mutated**.
4. **Dual-Key Pipeline Seal:** Pipeline components sealed in [PIPELINE_SEAL_MANIFEST.json](file:///D:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/08_RELEASE_VAULT/PIPELINE_SEAL_MANIFEST.json) with status `PENDING_DUAL_KEY`, awaiting Chairman written approval reference and Gemini safety review reference.

> [!IMPORTANT]
> **CANONICAL SERVING UNTOUCHED:**  
> The canonical production deployment at `https://jayt-production-v3420.vercel.app` remains locked to J388 `dpl_EY8hrscg5f1tRCG9WeKsHGfSJXUM` (`v3.444.0-j388`). Rollback baseline remains `dpl_5emod95fKr3NuLEEgeYY1tLctGr4` (`v3.440.0-j385-m1`). Candidates J390 and J391 are NOT deployed.

---

## 2. Lane 1: Four-Quote Provenance Ledger (15 Retained Deals)

All quotes below were validated against raw disk bytes via [scripts/verify_j391_wave_1_evidence.cjs](file:///D:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/scripts/verify_j391_wave_1_evidence.cjs) confirming `buf.subarray(start, end).toString('utf8') === quote.text`.

| # | Offer ID | Brand | Classification | Wave 1 Status | Offer Quote | Validity Quote | Scope Quote | Terms Quote |
|---|----------|-------|----------------|---------------|-------------|----------------|-------------|-------------|
| 1 | `B14_METIZ_U22_2D` | **Metiz Cinema Đà Nẵng** | VERIFIED_REGIONAL | ❌ _EXCLUDED_ | `&Aacute;p dụng gi&aacute; v&eacute;...` [11833..12013] | `tất cả c&aacute;c ng&agrave;y trong...` [12382..12440] | `đối với mọi suất chiếu tại Metiz Ci...` [11960..12013] | `1. Chương tr&igrave;nh chỉ &aacute;...` [13969..14308] |
| 2 | `J333_HOT_02_GALAXY_U22` | **Galaxy Cinema** | VERIFIED_DANANG | ✅ **QUALIFIED** | `Giá Vé U22: Chỉ Từ 45K...` [569..597] | `Giá vé U22 thay đổi tùy theo rạp ph...` [116370..116443] | `Galaxy Cinema Coop Đà Nẵng...` [103496..103526] | `Áp dụng khách hàng thành viên từ 22...` [116162..116228] |
| 3 | `B19_STARLIGHT_U22_WEEKDAY` | **Starlight Cinema** | VERIFIED_DANANG | ✅ **QUALIFIED** | `Đồng gi&aacute; v&eacute; 45k/v&eac...` [9474..9566] | `mua tại quầy từ thứ 2 đến thứ 5!...` [9521..9566] | `&Aacute;p dụng tại c&aacute;c rạp Q...` [9811..9879] | `Gi&aacute; v&eacute; U22 &aacute;p ...` [10070..10373] |
| 4 | `B19_STARLIGHT_THU_3_PHIM_VIET` | **Starlight Cinema** | VERIFIED_DANANG | ✅ **QUALIFIED** | `-&Aacute;p dụng gi&aacute; : 45 k c...` [8444..8568] | `&ldquo;Thứ 3 : Ng&agrave;y phim Việ...` [8328..8422] | `Địa chỉ: Tầng 4, Tòa nhà Nguyễn Kim...` [13814..13913] | `-Chương tr&igrave;nh kh&ocirc;ng &a...` [8730..8977] |
| 5 | `B18_CGV_NGAY_DOI` | **CGV Cinemas Đà Nẵng** | SOURCE_INSUFFICIENT | ❌ _EXCLUDED_ | `Xem Phim Ngày Đôi – Nhận Quà Gấp Bộ...` [593..641] | _Missing in bytes_ | _Missing in bytes_ | _Missing in bytes_ |
| 6 | `B18_CGV_BIRTHDAY_GIFT` | **CGV Cinemas Đà Nẵng** | VERIFIED_REGIONAL | ❌ _EXCLUDED_ | `MIỄN PHÍ 1 CGV Birthday Combo (1 Bắ...` [43501..43621] | `1. Thời hạn nhận quà:</strong>&nbsp...` [44002..44068] | `CGV Cinemas Vietnam...` [1102..1121] | `CGV Birthday Combo sẽ được hiển thị...` [45821..45934] |
| 7 | `B19_KATINAT_APP_LOYALTY` | **Katinat Saigon Kafe** | VERIFIED_REGIONAL | ❌ _EXCLUDED_ | `Nhận Voucher ưu đãi 30k cho đơn tối...` [50109..50192] | `áp dụng từ 25/4/2024...` [50664..50689] | `KATINAT Coffee &amp; Tea House...` [515..545] | `Tải app KATINAT ngay để được &#8220...` [49515..49615] |
| 8 | `B18_HL_SUA_LOC6` | **Highlands Coffee** | SOURCE_INSUFFICIENT | ❌ _EXCLUDED_ | `DEAL SALE GIỮA THÁNG...` [80026..80049] | _Missing in bytes_ | _Missing in bytes_ | _Missing in bytes_ |
| 9 | `B18_HL_PHIN_DI_SAN` | **Highlands Coffee** | SOURCE_INSUFFICIENT | ❌ _EXCLUDED_ | `DEAL SALE GIỮA THÁNG...` [80026..80049] | _Missing in bytes_ | _Missing in bytes_ | _Missing in bytes_ |
| 10 | `B16_JOLLIBEE_12008_1` | **Jollibee** | VERIFIED_REGIONAL | ❌ _EXCLUDED_ | `Burger Gà Giòn...` [191937..191953] | _Missing in bytes_ | `Jollibee...` [262..270] | _Missing in bytes_ |
| 11 | `B16_JOLLIBEE_1810060_1` | **Jollibee** | VERIFIED_REGIONAL | ❌ _EXCLUDED_ | `Cơm Gà Mắm Tỏi...` [212583..212603] | _Missing in bytes_ | `Jollibee...` [262..270] | _Missing in bytes_ |
| 12 | `B18_JB_MI_Y_BO_BAM` | **Jollibee** | SOURCE_INSUFFICIENT | ❌ _EXCLUDED_ | `Mì Ý Jolly...` [147807..147819] | _Missing in bytes_ | _Missing in bytes_ | _Missing in bytes_ |
| 13 | `B18_JB_HIT_HA` | **Jollibee** | SOURCE_INSUFFICIENT | ❌ _EXCLUDED_ | _Missing in bytes_ | _Missing in bytes_ | _Missing in bytes_ | _Missing in bytes_ |
| 14 | `B14_GALAXY_DANANG_TARIFF` | **Galaxy Cinema** | VERIFIED_DANANG | ✅ **QUALIFIED** | `Giá Vé U22: Chỉ Từ 45K...` [569..597] | `Giá vé U22 thay đổi tùy theo rạp ph...` [116370..116443] | `Galaxy Cinema Coop Đà Nẵng...` [103496..103526] | `Áp dụng khách hàng thành viên từ 22...` [116162..116228] |
| 15 | `B19_STARLIGHT_U22_WEEKEND` | **Starlight Cinema** | VERIFIED_DANANG | ✅ **QUALIFIED** | `&Aacute;p dụng tại c&aacute;c rạp Q...` [9811..9948] | `Gi&aacute; v&eacute; cuối tuần...` [9639..9673] | `&Aacute;p dụng tại c&aacute;c rạp Q...` [9811..9879] | `Gi&aacute; v&eacute; U22 &aacute;p ...` [10070..10373] |


### Breakdown of Wave 1 Counts:
- **Total Retained Deals Audited:** 15
- **VERIFIED_DANANG (Wave 1 Qualified):** **5** (`J333_HOT_02_GALAXY_U22`, `B19_STARLIGHT_U22_WEEKDAY`, `B19_STARLIGHT_THU_3_PHIM_VIET`, `B14_GALAXY_DANANG_TARIFF`, `B19_STARLIGHT_U22_WEEKEND`)
- **VERIFIED_REGIONAL (Excluded from Wave 1):** **5** (`B14_METIZ_U22_2D`, `B18_CGV_BIRTHDAY_GIFT`, `B19_KATINAT_APP_LOYALTY`, `B16_JOLLIBEE_12008_1`, `B16_JOLLIBEE_1810060_1`)
- **SOURCE_INSUFFICIENT (Excluded from Wave 1):** **5** (`B18_CGV_NGAY_DOI`, `B18_HL_SUA_LOC6`, `B18_HL_PHIN_DI_SAN`, `B18_JB_MI_Y_BO_BAM`, `B18_JB_HIT_HA`)

### Promo Code & CTA Governance:
- **Manufactured Promo Codes:** Exactly **0** (All `has_public_promo_code: false`, `public_promo_code: null`).
- **CTA Actions:** Strictly source-supported:
  - `SHOW_STUDENT_ID_AT_COUNTER` (Galaxy, Starlight, Metiz counter presentations).
  - `VIEW_OFFICIAL_SCHEDULE` (Cinema tariff & showtime tables).
  - `APP_MEMBER_LOYALTY` / `APP_DOWNLOAD_ROUTE` (CGV app, Katinat official app).
  - `ORDER_ON_OFFICIAL_APP` (Jollibee menu items).

---

## 3. Lane 2: KTX / Dorm Acquisition & Sanitization Status

Documented in [06_TRUST_AND_EVIDENCE/j391/ktx_acquisition_status.json](file:///D:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/06_TRUST_AND_EVIDENCE/j391/ktx_acquisition_status.json):

1. **Neutral Survey State:** All 30 Dorm SKUs remain classified as `LABELED_NEUTRAL_PLACEHOLDER` with `is_verified_clean: false`.
2. **Anti-Scraping Compliance:** Aggressive bare-request polling that triggered SGW/WAF challenges has been completely halted. Challenge block conditions are recorded once per SKU as an observation state.
3. **No Synthetic Images:** Zero AI-generated or stock vector assets masquerading as merchant photography.
4. **Affiliate Attribution:** `affiliate_enabled: false` across all 30 SKUs pending provider-issued replayable attribution tokens.

---

## 4. Authentic Operations & Non-Destructive Rollback Drill

### A. 4-Hour Scheduler Operational Receipt
Documented in [07_QUALITY_ASSURANCE/JAYT_391_SCHEDULER_OPERATIONAL_RECEIPT.json](file:///D:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/JAYT_391_SCHEDULER_OPERATIONAL_RECEIPT.json):
- **Cadence:** Every 4 hours (`0 */4 * * *`).
- **Security Boundary:** Dedicated least-privilege identity (`jayt-scheduler-least-privilege`); reads only audited item IDs; rejects arbitrary URLs (`http_code: 400`); zero auto-publish capability.
- **Conservative State Machine:**
  - `200`: Observation only (`OBSERVED_AVAILABLE`).
  - `3xx / 403 / 429 / timeout`: Retained as `UNKNOWN` (non-suppressing).
  - `404 / 410`: Marked `CANDIDATE_UNAVAILABLE`; requires 3 consecutive observations before card suppression review.
- **Alert Queue:** Automated trigger tick logged with alert dispatch latency of **0.211s** (SLA <= 60s).

### B. Rollback Drill Plan
Documented in [08_RELEASE_VAULT/JAYT_391_ROLLBACK_DRILL_RECEIPT.json](file:///D:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/08_RELEASE_VAULT/JAYT_391_ROLLBACK_DRILL_RECEIPT.json):
- **Canonical Protection:** Production alias `https://jayt-production-v3420.vercel.app` was **never modified**.
- **Designated Drill Target:** Non-production drill alias `https://jayt-rollback-drill.vercel.app`.
- **Benchmark Metrics:** Measured time-to-recovery of **9.67s** (SLA <= 120s) with clean pre/post alias restoration to baseline `dpl_5emod95fKr3NuLEEgeYY1tLctGr4`.

---

## 5. Dual-Key Pipeline Seal Manifest

Documented in [08_RELEASE_VAULT/PIPELINE_SEAL_MANIFEST.json](file:///D:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/08_RELEASE_VAULT/PIPELINE_SEAL_MANIFEST.json):

**Current Seal Status:** `PENDING_DUAL_KEY`

### Dual-Key Authorization Gate:
- **Key 1 (Chairman Written Approval):** `PENDING_WRITTEN_REFERENCE`
- **Key 2 (Gemini Safety Review):** `PENDING_SAFETY_REVIEW_REFERENCE`

### Sealed Artifacts Integrity Table (14 Components):
| Component Group | Relative Path | Bytes | SHA-256 Hash |
|-----------------|---------------|-------|--------------|
| `runners_and_validators` | `scripts/verify_j391_wave_1_evidence.cjs` | 10124 | `335bccba09f2e4f3c6e3063969007453f4fd595c4234b4b654ab23a8111be516` |
| `runners_and_validators` | `scripts/verify_j390_build_equality.cjs` | 16456 | `0430050322d3e924752491eea00b6440367bb62d8877a912898b44528f5a37ff` |
| `runners_and_validators` | `scripts/test_j390_mutation_fixtures.cjs` | 7130 | `8bfb2e487b158bb829445db883dbd98cb930568466c75eeca9b2191bd58e079e` |
| `collectors_and_evidence_indices` | `06_TRUST_AND_EVIDENCE/j391/WAVE_1_FOUR_QUOTE_EVIDENCE_INDEX.json` | 11580 | `423073fc366e7ccd5e06514117d1166a4e3e3ea1d599a580604f65807198eb78` |
| `collectors_and_evidence_indices` | `06_TRUST_AND_EVIDENCE/j391/ktx_acquisition_status.json` | 22978 | `72e88610bb1814266370c4a4af60918b7977fff82a23ce390f53950fed38d0cf` |
| `collectors_and_evidence_indices` | `06_TRUST_AND_EVIDENCE/j390/deal_evidence_index.json` | 34572 | `f9204bceed3a18ab88ab1704a32949e78699a10199c5bf117d13fba7362debc9` |
| `collectors_and_evidence_indices` | `06_TRUST_AND_EVIDENCE/j390/sku_evidence_index.json` | 22249 | `bd9e323b59451ebbd58788797ada8bba04d71b646d83fa6351ada49e8f7b96b6` |
| `quality_and_operational_receipts` | `07_QUALITY_ASSURANCE/JAYT_391_WAVE_1_EVIDENCE_RECEIPT.json` | 16230 | `250f74dc7e86343b36a7af5f403d726eb80e2a54f9962664796c01d4b8a0dea3` |
| `quality_and_operational_receipts` | `07_QUALITY_ASSURANCE/JAYT_391_SCHEDULER_OPERATIONAL_RECEIPT.json` | 4586 | `3049c8ce920d0208a6c09486eb980f3ee77bf42e0e5de0252f2822b2e20c4338` |
| `quality_and_operational_receipts` | `08_RELEASE_VAULT/JAYT_391_ROLLBACK_DRILL_RECEIPT.json` | 3022 | `a036822d15d49fd0f948f684c4a6ccb7198175cede0798805bee2c3c4724c5f8` |
| `source_of_truth` | `03_SOURCE_OF_TRUTH/jayt_apex_interface.js` | 584455 | `4368004f1700845a50299b824a626893763424d08689ec6b7f7af48f7ef743da` |
| `source_of_truth` | `03_SOURCE_OF_TRUTH/j387/sku_registry.json` | 78216 | `f1f7e008e63f2464d25db7e93deadb294f3895c38b1087b27fc630f88dba3a63` |
| `source_of_truth` | `03_SOURCE_OF_TRUTH/deals_feed.json` | 114379 | `97d29399738c6781671ff4557506974334d31515f209256c383907177074cc60` |
| `source_of_truth` | `03_SOURCE_OF_TRUTH/index.html` | 1235 | `5f1ab99971634d6d358bb434231d8e2dc8e9bb03f54cc0d8e962619ff4a47526` |


*Integrity verified via `scripts/verify_pipeline_seal.cjs` (14/14 OK, 0 drift).*

---

## 6. Executor Commitments & Compliance Attestation

1. **No WAF/CAPTCHA Bypass:** Zero bypass tools, proxy networks, or cookie forgery scripts were executed.
2. **Zero Inferred Facts:** All 4 quotes were extracted strictly from raw bytes on disk without creative synthesis.
3. **No Self-Awarded Pass:** Antigravity submits this packet for external verification by the Codex CEO and independent Gemini Safety Review Auditor.
4. **Serving Freeze:** Active production deployment remains J388 `dpl_EY8hrscg5f1tRCG9WeKsHGfSJXUM`.
