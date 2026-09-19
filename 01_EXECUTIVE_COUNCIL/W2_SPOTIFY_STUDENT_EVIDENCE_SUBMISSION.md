# Wave 2 Spotify Student VN — Evidence Submission & Audit Dossier

**Date:** 2026-09-11  
**Work Order:** `WORK_ORDER_POST_WAVE1_EXPANSION_W2`  
**Governing Directive:** `CHAIRMAN-SUPREME-DIRECTIVE-2026-0911-POST-WAVE1-EXPANSION`  
**Status:** `SUBMITTED_FOR_EXECUTIVE_COUNCIL_AUDIT`  
**Operational Scope:** `STAGING_ONLY__ZERO_PRODUCTION__AFFILIATE_ROUTER_HOLD`  

---

## 1. Executive Summary

In execution of Priority 2 of Work Order [WORK_ORDER_POST_WAVE1_EXPANSION_W2.json](file:///D:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/04_DATA_PIPELINE/dispatch/WORK_ORDER_POST_WAVE1_EXPANSION_W2.json), the pipeline has captured, verified, and byte-bound the complete first-party evidence bundle for **Spotify Student Vietnam** directly from the authoritative domain `https://www.spotify.com/vn-vi/student/`.

Unlike archived regulatory transit tariffs, this capture provides **active point-in-time commercial validity (September 2026)** for pricing, introductory trial terms, verification mechanisms, and student eligibility.

---

## 2. Evidence Artifact Inventory & Cryptographic Hashes

All evidence files are stored in `06_TRUST_AND_EVIDENCE/w2/spotify/` and synchronized to Secondary Workspace (WS2) with **100% SHA-256 byte parity**.

| Artifact Role | Filename | Size (Bytes) | SHA-256 Hash |
| :--- | :--- | :--- | :--- |
| **Evidence Receipt** | `SPOTIFY_STUDENT_EVIDENCE_RECEIPT.json` | 3,923 | `0a2ad2608f92ffded041092ec41c278e20867b1e5a26fc1ea7800c2d2701f8e8` |
| **Raw First-Party HTML** | `spotify_student_offer_2026-09-11T10-03-45.048Z.html` | 214,746 | `e11418ac399cb3a43f5029ae42ce06f7beb277a207bd442caa23770ae862190f` |
| **Full-Page Screenshot** | `spotify_student_offer_2026-09-11T10-03-45.048Z.png` | 236,031 | `ece31ade8a0b7bed6d054b6c8a037e49dab9984f8447039226d1893035dee74d` |

---

## 3. Byte-Bound Predicates & Verified Claims

All 9/9 predicates have been replayed and verified against the raw UTF-8 byte buffer:

| Predicate Key | Byte Range `[Start, End]` | Length | Exact First-Party Quote | Factual Determination |
| :--- | :---: | :---: | :--- | :--- |
| `HERO_PROMO_TRIAL` | `[135996, 136068]` | 72 B | `Sinh viên nhận 2 tháng dùng gói Premium với giá 33.000&nbsp;₫` | Introductory trial: 2 months for 33,000₫ total |
| `MONTHLY_STUDENT_SUBSCRIPTION_RATE` | `[136322, 136388]` | 66 B | `Sau đó chỉ 33.000&nbsp;₫/tháng. Hủy bất cứ lúc nào.` | Monthly recurring tariff: 33,000₫/month |
| `STUDENT_MONTHLY_WHILE_STUDYING` | `[867, 949]` | 82 B | `Chỉ 33.000&nbsp;₫/tháng khi bạn còn đi học. Hủy bất cứ lúc nào.` | Ongoing student rate guaranteed while studying |
| `STANDARD_INDIVIDUAL_COMPARISON_RATE` | `[148629, 148753]` | 124 B | `Gói đăng ký của bạn sẽ tự động chuyển sang gói Premium Individual với mức giá 65.000&nbsp;₫/tháng.` | Baseline non-student plan: 65,000₫/month |
| `ACCREDITED_INSTITUTION_ELIGIBILITY` | `[138032, 138141]` | 109 B | `Ưu đãi chỉ dành cho sinh viên tại các trường cao đẳng và đại học được công nhận.` | Enrolled students at accredited tertiary colleges/universities |
| `THIRD_PARTY_VERIFICATION_PROVIDER` | `[143165, 143172]` | 7 B | `SheerID` | Independent student verification vendor |
| `DURATION_LIMITATION` | `[142904, 142920]` | 16 B | `tối đa 4 năm` | Maximum duration: up to 4 years per student identity |
| `LEGAL_TERMS_REFERENCE` | `[138142, 138264]` | 122 B | `Áp dụng <a href="https://www.spotify.com/legal/premium-promotional-offer-terms">điều khoản và điều kiện</a>.` | Bound to official terms & conditions |
| `JURISDICTION_AND_CURRENCY` | `[164934, 164961]` | 27 B | `Việt Nam (Tiếng Việt)` | Localized VND currency and VN territory |

---

## 4. Consumer Value Claim Matrix

From the verified first-party evidence, the following factual metrics are established:
- **Student Monthly Subscription**: **33.000 ₫/tháng**
- **Standard Individual Subscription**: **65.000 ₫/tháng**
- **Factual Net Monthly Saving**: **32.000 ₫/tháng** (49,2% discount)
- **Introductory Promo Trial**: **2 tháng với giá 33.000 ₫**
- **Annual Student Savings Potential**: **384.000 ₫/năm** (tiết kiệm thuần túy)
- **Fulfillment Requirement**: Thẻ sinh viên hoặc giấy xác nhận sinh viên hợp lệ qua SheerID; tối đa 4 năm.

---

## 5. Operational Boundaries

1. **Staging Only**: This evidence bundle is submitted for Staging catalog inclusion under the category `student_digital_benefit`.
2. **Zero Production Mutation**: No changes to production artifacts, manifests, or Vercel alias `https://jayt-production-v3420.vercel.app`.
3. **Affiliate Router Strict HOLD**:
   - `affiliate_enabled: false`
   - Zero affiliate tracking codes or redirect networks.
   - Outbound link remains direct official landing page: `https://www.spotify.com/vn-vi/student/`.
   - Zero revenue or commission claims.
4. **Dual Workspace Parity**: 100% bit-identical sync verified across WS1 and WS2.
5. **Pipeline Seal**: 24/24 files sealed and verified PASS.
