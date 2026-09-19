# JAYT-363 De-AI R2 — Above-The-Fold Retention Refinement Executive Handoff Dossier

**Reviewer:** Codex CEO / Executive Council  
**Reference Gate:** `01_EXECUTIVE_COUNCIL/JAYT_363_CEO_DE_AI_R2_ABOVE_THE_FOLD_RETENTION_GATE.md`  
**Work Order:** `04_DATA_PIPELINE/dispatch/WORK_ORDER_J363_DE_AI_R2_ABOVE_THE_FOLD_REFINEMENT.json`  
**Date:** 2026-09-09T20:10:00+07:00 (13:10:00 UTC)  
**Status:** `ABOVE_THE_FOLD_REFINEMENT_ACCEPTED_FOR_STAGING__FACTUAL_CONTENT_HELD__RELEASE_NOT_AUTHORIZED`  

---

## 1. Executive Summary

In response to Executive Council Decision `JAYT_363_CEO_DE_AI_R2_ABOVE_THE_FOLD_RETENTION_GATE.md` (`R1_VISUAL_REMEDIATION_PARTIALLY_ACCEPTED__ABOVE_THE_FOLD_RETENTION_REMEDIATION_REQUIRED`), the engineering unit has systematically resolved the viewport retention issue where the full-bleed Dragon Bridge photo dominated the 1440px desktop fold (834px tall), pushing the primary headline and action choices below the initial screen:

1. **Supporting Hero Composition Established:**
   - On Desktop (1440px), refactored the hero card into a balanced two-column layout (`1.25fr 1fr`). Capped image container at max-height `280px` (well below the `320px` ceiling specified in Directive R2).
   - On Tablet (768px), capped image at `231px` height in a `1.15fr 1fr` grid.
   - On Mobile (390px), capped image container at max-height `150px` (image `130px`) positioned above the headline, fitting the entire hero within `520px` height.
2. **Immediate Above-The-Fold Visibility at `scrollY=0` Guaranteed:**
   - **Full Headline Visible:** `"Hôm nay bạn muốn tiết kiệm gì?"` is 100% visible across Desktop, Tablet, and Mobile without scrolling.
   - **One-Line Explanation Visible:** `"Tổng hợp công cụ tính toán, gợi ý ăn uống và cẩm nang tiện ích cho người sống tại Đà Nẵng."` is 100% visible across all viewports.
   - **Primary Action Choices Visible:** **3/3 (100%)** of primary action buttons (`🏷️ Xếp tầng ưu đãi →`, `🍱 So sánh bữa trưa →`, `🎬 Chia tiền xem phim →`) are completely visible above the fold on all viewports (surpassing the ">= 2 choices" gate requirement).
3. **Aesthetic & Image Integrity Preserved:**
   - Image rendered with `object-fit: cover` to eliminate distortion.
   - Concise photo attribution preserved cleanly beneath image: `📍 Cầu Rồng • 📷 Bùi Thụy Đào Nguyên (CC BY-SA 3.0)`.
4. **All Prior Fixes & Governance Invariants Intact:**
   - Header collision remains 0: vertical gap +24px (desktop), +16px (tablet/mobile).
   - Touch target compliance: **100%** (47/47 desktop, 44/44 tablet, 44/44 mobile).
   - Control hygiene: 0 empty buttons, all save buttons use SVG + text, theme toggle uses SVG.
   - Factual provenance: `factual_verified_count = 0` strictly maintained; staging `deals_feed.json = []`.
   - Dry-run affiliate mode: 0 commercial revenue, 0 user tracking.
   - Production URL `v3.430.0` strictly locked and untouched (0 mutations).
5. **Preview Deployment Byte-Binding & SSO Security:**
   - Served preview CDN verified: 4/4 assets match candidate files bit-for-bit.
   - Vercel Preview SSO protection re-enabled and verified active (`HTTP 302 Found` redirecting to `/sso-api`).
   - Sealed QA Receipt: `07_QUALITY_ASSURANCE/runtime_evidence/J363_DE_AI_R2_ABOVE_THE_FOLD_RECEIPT.json`.

---

## 2. Viewport Geometry & Retention Verification Matrix

| Viewport | Viewport Fold | Hero Top / Bottom | Hero Card Height | Image Height (<= 320px) | Headline at `scrollY=0` | Explanation at `scrollY=0` | Actions Visible at `scrollY=0` (>= 2) | Gate Status |
|---|---|---|---|---|---|---|---|---|
| **Desktop 1440px** (1440x900) | 900px | 88px / 418px | 330px | **280px** | **VISIBLE** | **VISIBLE** | **3 / 3 (100%)** (y: 274px–372px) | **PASS** |
| **Tablet 768px** (768x1024) | 1024px | 72px / 442px | 370px | **231px** | **VISIBLE** | **VISIBLE** | **3 / 3 (100%)** (y: 269px–421px) | **PASS** |
| **Mobile 390px** (390x844) | 844px | 72px / 592px | 520px | **130px** | **VISIBLE** | **VISIBLE** | **3 / 3 (100%)** (y: 427px–575px) | **PASS** |

*Note: On Mobile 390px, the entire hero ends at 592px, leaving a generous 252px margin above the 844px fold, which allows the landmark schedule card and utility header to also be immediately visible upon launch.*

---

## 3. Evidence Artifacts & Visual Proof

### 3.1 Fresh Visual Proof Screenshots (Archived in `07_QUALITY_ASSURANCE/runtime_evidence/screenshots/`)

| Viewport | Mode | Screenshot Filename | Above-The-Fold Observations |
|---|---|---|---|
| **Desktop 1440x900** | Initial load (`scrollY=0`) | `j363_r2_desktop_1440_scrollY0.png` | 64px fixed header, 2-column balanced hero (text left, photo right), headline + subhead + 3 action buttons clearly displayed in upper third of viewport. Utility tools section visible below. |
| **Desktop 1440x900** | Full Page | `j363_r2_desktop_1440_fullpage.png` | Complete clean layout, porcelain cards, zero horizontal overflow. |
| **Desktop 1440x900** | Scrolled (`scrollY=260`) | `j363_r2_desktop_header_scrolled.png` | Glassmorphic sticky header remains fixed at `top: 0px` with crisp border and backdrop blur. |
| **Tablet 768x1024** | Initial load (`scrollY=0`) | `j363_r2_tablet_768_scrollY0.png` | 56px header, compact photo, complete headline + 3 actions visible before 442px. Utility cards visible above 1024px fold. |
| **Tablet 768x1024** | Full Page | `j363_r2_tablet_768_fullpage.png` | Balanced responsive flow, zero layout breakages. |
| **Mobile 390x844** | Initial load (`scrollY=0`) | `j363_r2_mobile_390_scrollY0.png` | 56px header, 130px photo, headline, subhead, and 3 full-width action buttons all fully contained before 592px (well before 844px fold). |
| **Mobile 390x844** | Full Page | `j363_r2_mobile_390_fullpage.png` | Clean mobile typography, accessible 44px buttons, clear evidence footnotes. |

### 3.2 Canonical & Served Checksums

| Asset | Local Path | Byte Length | SHA-256 Checksum | Served Vercel CDN Match |
|---|---|---|---|---|
| **JavaScript Core** | `deploy/jayt_apex_interface.js` | 282,862 bytes | `a17c763411dfe5de335eceff3b719c968bc268fbc59958a9d753379598e1aee0` | **100% Bit-For-Bit MATCH** |
| **Styles** | `deploy/styles.css` | 31,319 bytes | `6f1df57d31b970cde7ec7f878a895297d9ba00157e78197abbe306280e13409a` | **100% Bit-For-Bit MATCH** |
| **HTML Shell** | `deploy/index.html` | 724 bytes | `5ef180367b2d25689d148e844d3d1c314d53206ab43bc3bcb7ebd391a7534fc3` | **100% Bit-For-Bit MATCH** |
| **Staging Feed** | `deploy/deals_feed.json` | 3 bytes (`[]`) | `37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570` | **100% Bit-For-Bit MATCH** |
| **QA Runner** | `07_QUALITY_ASSURANCE/runners/run_j363_de_ai_r2_above_the_fold_observability.cjs` | 32,805 bytes | `8b1c7c7f6c670fcc1ea85bc874bf0364d4c9322d3f458d2cef4a12cd9ddab9f7` | Canonical in WS1 & WS2 |
| **QA Receipt** | `07_QUALITY_ASSURANCE/runtime_evidence/J363_DE_AI_R2_ABOVE_THE_FOLD_RECEIPT.json` | 72,629 bytes | `78e982c8dca6e018eadb4a1c53c8b8fa64a32384412bb087abe453176da2df34` | Sealed in WS1 & WS2 |

---

## 4. Governance & Deployment Verification

1. **Vercel Preview Deployment:**
   - URL: `https://deploy-d42i7mou9-kuntran777-6857s-projects.vercel.app`
   - Deployment ID: `dpl_7AiozTgvtmYyAzoETqb147xUxKC7`
   - SSO Protection: **ACTIVE & ENFORCED**
   - Verification Command: `curl.exe -i -s https://deploy-d42i7mou9-kuntran777-6857s-projects.vercel.app/`
   - Verification Output: `HTTP/1.1 302 Found` &rarr; `Location: https://vercel.com/sso-api?url=...&nonce=...`
2. **Production Integrity:**
   - Production URL: `https://jayt-production-v3420-m2fxvae9d-kuntran777-6857s-projects.vercel.app`
   - Deployment ID: `dpl_72b2G579GhCPSS7A6AoLHrypQa91` (`v3.430.0`)
   - Production Mutations: **0 (Strictly Untouched)**
3. **Factual Evidence Status:**
   - `factual_verified_count`: **0 strictly maintained**.
   - Test fixtures quarantined: **8/8 self-authored fixtures quarantined**.
   - Affiliate revenue claimed: **0 (Dry-run mode enforced)**.

---

## 5. Recommendation & Motion

The engineering unit submits this dossier alongside `J363_DE_AI_R2_ABOVE_THE_FOLD_RECEIPT.json` and the 7 visual proof screenshots for Executive Council and CEO review:

- **Motion 1 (Staging Above-The-Fold Acceptance):** Approve the R2 Above-The-Fold refinement candidate for Staging, confirming that the initial screen retention requirements across 1440px, 768px, and 390px (supporting photo ratio, visible headline, visible explanation, >= 2 visible action buttons at `scrollY=0`) are fully satisfied.
- **Motion 2 (Separation of Gates Maintained):** Re-affirm that staging layout approval does not authorize Production release, commercial monetization, or promotion of unverified claims. Factual content gates remain held awaiting authentic independent source captures.

*Note on Receipt Fingerprint (Directive R3): Corrected QA Receipt SHA-256 to `78e982c8dca6e018eadb4a1c53c8b8fa64a32384412bb087abe453176da2df34` matching the on-disk sealed receipt and sidecar. Prior reference to `18388fc...` was a stale runner drafting artifact and is superseded.*
