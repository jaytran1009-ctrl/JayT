# HỒ SƠ HỘI ĐỒNG LIÊN BỘ — JAYT SECTION EZ-AH
## THỰC THI JAYT-254: BROWSER REVIEW EVIDENCE, SLA VERDICT, COHORT CINEMA/TRANSIT & ACCESSTRADE JTBD

**Mã hồ sơ:** `COUNCIL_REVIEW_PACK_EZ_AH_BROWSER_REVIEW_SLA_COHORT_20260831`
**Phiên bản Staging SOT:** `v3.481.0-staging.ez`
**Chỉ thị chỉ đạo:** JAYT-245 Mục EZ-AH (Dòng 4854–4887)
**Thời gian lập hồ sơ:** 2026-08-31T08:55:51.618Z

---

### I. BROWSER REVIEW EVIDENCE PACK — SAVINGS LAB V2 (MANDATE EZ-AH.1)

Engineering/QA đã chuẩn bị bộ chứng cứ kỹ thuật cho CEO trực tiếp browser review:

| Evidence | Desktop 1440 | Mobile 390 |
| :--- | :---: | :---: |
| Homepage state | ✅ `desktop_1440_01_home.png` | ✅ `mobile_390_01_home.png` |
| Savings Lab empty | ✅ `desktop_1440_02_savings_lab_empty.png` | ✅ `mobile_390_02_savings_lab_empty.png` |
| Solo filled + formula | ✅ `desktop_1440_03_solo_filled.png` | ✅ `mobile_390_03_solo_filled.png` |
| Group split | ✅ `desktop_1440_04_group_split.png` | ✅ `mobile_390_04_group_split.png` |
| Non-negative clamping | ✅ `desktop_1440_05_negative_clamped.png` | ✅ `mobile_390_05_negative_clamped.png` |
| Reset to defaults | ✅ `desktop_1440_06_after_reset.png` | ✅ `mobile_390_06_after_reset.png` |
| Keyboard Enter | ✅ `desktop_1440_07_keyboard_enter.png` | ✅ `mobile_390_07_keyboard_enter.png` |
| Network log (0 external) | ✅ `ZERO_EXTERNAL_NETWORK_REQUESTS` | ✅ `ZERO_EXTERNAL_NETWORK_REQUESTS` |
| aria-live="polite" | ✅ FOUND | ✅ FOUND |

**Trạng thái UX:** `UX_ACCEPTANCE_PENDING_CEO_BROWSER_REVIEW` — chỉ CEO mới ghi `UX_ACCEPTED` hoặc `UX_HOLD`.

---

### II. SLA VERDICT — HAI CANDIDATE JETBRAINS & FIGMA (MANDATE EZ-AH.2)

| Ứng viên | Core Fields | Tier Verdict | Public Eligible |
| :--- | :--- | :---: | :---: |
| **JetBrains Student** | Title ✅, Eligibility ✅ (student, education, free, license), Scope ✅ (individual, personal, non-commercial, academic), Action URL ❌ (không tìm thấy apply/register link trong raw) | **`T4_DESCRIPTIVE_ONLY_HELD_INTERNAL`** | **false** |
| **Figma Education** | Title ✅, Eligibility ✅ (student, education, free, design), Scope ✅ (classroom, learning), Action URL ✅ (figma.com/education/) | **`T2_DOCUMENTATION_HELD_INTERNAL`** | **false** |

- **JetBrains:** Raw bytes có đầy đủ title, eligibility và scope nhưng thiếu action URL dạng apply/register/sign-up → phân loại **T4 Descriptive Only** theo EZ-AF. Vẫn HELD_INTERNAL.
- **Figma:** Raw bytes có đầy đủ 4/4 core fields (title, eligibility, scope, action URL) → phân loại **T2 Documentation** theo EZ-AF. Tuy nhiên vẫn HELD_INTERNAL cho đến khi có Council review + CEO authorization cho card mới.

Cả hai verdict đều là early verdict hợp lệ (core fields analysis complete, per EZ-AF/EZ-AH rules). Không có affiliate link, price claim hay card được tạo.

---

### III. COHORT CINEMA & TRANSIT — 15 CANDIDATE NGUỒN (MANDATE EZ-AH.3)

| # | Mã Ứng Viên | JTBD | Hypothesis | Trạng Thái |
| :---: | :--- | :--- | :--- | :---: |
| 1 | COHORT_EZ_AH_01 | CINEMA_ENTERTAINMENT | CGV Cinemas Student Program | OPEN_RAW_PENDING |
| 2 | COHORT_EZ_AH_02 | CINEMA_ENTERTAINMENT | Lotte Cinema Youth Engagement | OPEN_RAW_PENDING |
| 3 | COHORT_EZ_AH_03 | CINEMA_ENTERTAINMENT | Galaxy Cinema Student Offer | OPEN_RAW_PENDING |
| 4 | COHORT_EZ_AH_04 | CINEMA_ENTERTAINMENT | BHD Star Cineplex Student Access | OPEN_RAW_PENDING |
| 5 | COHORT_EZ_AH_05 | CINEMA_ENTERTAINMENT | Mega GS Student Program | OPEN_RAW_PENDING |
| 6 | COHORT_EZ_AH_06 | CINEMA_ENTERTAINMENT | CineStar Student Engagement | OPEN_RAW_PENDING |
| 7 | COHORT_EZ_AH_07 | CINEMA_ENTERTAINMENT | DCINE Student Program | OPEN_RAW_PENDING |
| 8 | COHORT_EZ_AH_08 | PUBLIC_TRANSIT_URBAN | Da Nang Bus Student Pass | OPEN_RAW_PENDING |
| 9 | COHORT_EZ_AH_09 | RIDE_HAILING_MOBILITY | Grab Student Discount Program | OPEN_RAW_PENDING |
| 10 | COHORT_EZ_AH_10 | RIDE_HAILING_MOBILITY | Be Student Mobility Program | OPEN_RAW_PENDING |
| 11 | COHORT_EZ_AH_11 | RIDE_HAILING_MOBILITY | Xanh SM Student Green Transport | OPEN_RAW_PENDING |
| 12 | COHORT_EZ_AH_12 | LONG_DISTANCE_TRANSIT | Vietnam Railways Student Fare | OPEN_RAW_PENDING |
| 13 | COHORT_EZ_AH_13 | LONG_DISTANCE_TRANSIT | Vietnam Airlines Student Fare | OPEN_RAW_PENDING |
| 14 | COHORT_EZ_AH_14 | LONG_DISTANCE_TRANSIT | VietJet Air Student Campaign | OPEN_RAW_PENDING |
| 15 | COHORT_EZ_AH_15 | BIKE_SHARING_URBAN | TNGO Bike Sharing Student Plan | OPEN_RAW_PENDING |

**Cam kết kỷ luật:** 0 giá cụ thể, 0 mã giảm, 0 U22, 0 đồng giá, 0 lịch chiếu, 0 địa chỉ, 0 link thương mại. Mỗi candidate theo quy trình: RAW HTTP → Locator → Content Manifest Verdict (SLA 12h).

---

### IV. ACCESSTRADE JTBD OFFLINE RESEARCH MAP (MANDATE EZ-AH.4)

Đã lập bản đồ JTBD cho 5 nhóm nhu cầu KTX ngân sách thấp:
1. **KTX_BEDDING_ESSENTIALS** — Đồ dùng giường ngủ cơ bản
2. **KTX_STORAGE_ORGANIZATION** — Tổ chức không gian nhỏ
3. **KTX_PERSONAL_CARE_HYGIENE** — Vệ sinh cá nhân
4. **KTX_ELECTRONICS_BUDGET** — Thiết bị điện tử nhỏ
5. **KTX_FOOD_MEAL_PREP** — Giải pháp ăn uống tiết kiệm

**Cam kết:** 0 product list, 0 giá, 0 merchant claim, 0 campaign rate, 0 link. Authority Gate affiliate: **LOCKED ABSOLUTELY**.

---

### V. STAGING & CONTAINMENT INVARIANTS

| Chỉ số | Giá trị |
| :--- | :--- |
| Staging Version | `v3.481.0-staging.ez` |
| Parity | `PERFECT_MATCH_ZERO_DRIFT` |
| Production | **LOCKED `v3.419.0`** |
| T1 Verified Vouchers | **0** |
| Public T2 Docs | **1** (GitHub Education Pilot) |
| External Links DOM | **1** (`docs.github.com`) |
| Affiliate Activation | **false** |
| AccessTrade Authority | **LOCKED** |

---

### VI. LỆNH TÁI LẬP KIỂM ĐỊNH ĐỘC LẬP CHO CEO

```powershell
# 1. Kiểm tra sức khỏe Staging
Invoke-RestMethod -Uri http://127.0.0.1:4173/health

# 2. Chạy EZ-AH QA Suite
node "07_QUALITY_ASSURANCE/test_ez_ah_browser_review_sla_and_cohort_qa.js"

# 3. Mở trình duyệt CEO Browser Review (Desktop)
Start-Process "http://127.0.0.1:4173/"

# 4. Xem Evidence Pack
dir "06_TRUST_AND_EVIDENCE/BROWSER_REVIEW_EVIDENCE_PACK_SAVINGS_LAB_V2_EZ_AH/"
```
