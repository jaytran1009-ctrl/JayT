# HỒ SƠ HỘI ĐỒNG LIÊN BỘ — JAYT-256-ADDENDUM
## THỰC THI SCHEMA DỮ LIỆU 2 TRỤC (contentTier × admissionState), BẢO TỒN EVIDENCE LỊCH SỬ & KHÓA RANH GIỚI ADMISSION

**Mã hồ sơ:** `COUNCIL_REVIEW_PACK_JAYT_256_ADDENDUM_2D_SCHEMA_20260901`
**Phiên bản Staging Hiện Hành:** `v3.483.0-staging.ao`
**Build ID:** `BUILD_JAYT_STAGING_v3.483.0-staging.ao`
**Chỉ thị chỉ đạo:** JAYT-245 Phụ lục kỹ thuật JAYT-256-ADDENDUM (Dòng 4962–5010)
**Thời gian phát hành:** 2026-09-01T12:50:30.059Z

---

### I. MA TRẬN MAPPING 2 TRỤC 4 TIER × 5 ADMISSION STATE (MANDATE JAYT-256.1 & JAYT-256.2)

Toàn bộ các thực thể dữ liệu trong hệ thống đã được phân loại độc lập theo 2 trục:

| contentTier \ admissionState | OPEN_EVALUATING | EVIDENCE_COMPLETE_INTERNAL_HELD | HELD_NEW_COHORT_REQUIRED | CLOSED | PUBLIC_APPROVED | Tổng Theo Tier |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **T1_DEAL** | 0 | 0 | 0 | 0 | 0 | **0** |
| **T2_PROGRAM** | 0 | 2 (Figma, Notion Trial) | 0 | 0 | 1 (GitHub Pilot) | **3** |
| **T3_PLACE** | 0 | 1 (Thư viện Đà Nẵng) | 0 | 0 | 0 | **1** |
| **T4_RADAR** | 14 (Cohort 15 Reachable) | 0 | 1 (JetBrains) | 1 (BHD Star) | 0 | **16** |
| **Tổng Theo State** | **14** | **3** | **1** | **1** | **1** | **20** |

- **Quy tắc bất biến:** `contentTier` trả lời loại nội dung; `admissionState` trả lời trạng thái phát hành.
- **Phân loại GitHub Education Pilot:** `T2_PROGRAM + PUBLIC_APPROVED` — truy vết trực tiếp từ phê chuẩn của CEO trong JAYT-245 Mục EZ-H/EZ-AO và evidence bundle `fact_ez_g_01_github_education_raw_contract.json`.
- **Tổng số mục công khai trên Staging DOM:** Duy nhất **1 mục** (`PUBLIC_APPROVED = 1`).

---

### II. BẢNG ĐỐI SOÁT BẢO TOÀN MÃ BĂM VÀ EVIDENCE LỊCH SỬ (MANDATE JAYT-256.2 & JAYT-256.5)

Toàn bộ raw binary payloads lịch sử được giữ nguyên 100% byte length và SHA-256:

| Raw Artifact Lịch Sử | Section Khởi Tạo | Byte Length | SHA-256 Dynamic Recomputed | Trạng Thái Toàn Vẹn |
| :--- | :---: | :---: | :---: | :---: |
| `fact_ez_g_01_github_docs_raw_bytes.bin` | EZ-G / EZ-H | 135.348 B | `f21354b988f6db93fda0460932ce00f336bf8210cf69d5b3329cb68626e1f237` | **KHỚP 100% (BẢO TOÀN)** |
| `candidate_ez_ae_01_jetbrains_student_raw_bytes.bin` | EZ-AE | 494.398 B | `355d9e1e6d07125c0dfedda229b1880a78a54f86044a5c183c4b8b780637dceb` | **KHỚP 100% (BẢO TOÀN)** |
| `candidate_ez_ae_02_figma_education_raw_bytes.bin` | EZ-AE | 1.658.429 B | `090801961331bd51a6ca07ee0b16527a18854b77f51cf26f26382064cc9d7892` | **KHỚP 100% (BẢO TOÀN)** |
| `candidate_ez_j_01_notion_education_raw_bytes.bin` | EZ-J | 188.523 B | `efa0ff3b7f8037d76fa445bf458136452541d1c981dc041576ed6f8cc1aeca30` | **KHỚP 100% (BẢO TOÀN)** |
| `candidate_ez_j_02_canva_education_raw_bytes.bin` | EZ-J | 270.597 B | `a41e00e0448da7b5e0423ccb022c3e6da0f86a5d5254c5b697907231c1fb8810` | **KHỚP 100% (BẢO TOÀN)** |
| `candidate_ez_t_01_danang_library_card_policy_raw_bytes.bin` | EZ-T | 49.293 B | `57ff87a63afab5b6cfb029075bb073bbd11eedfc9d94cccd0680df2353903b16` | **KHỚP 100% (BẢO TOÀN)** |
| `candidate_ez_am_01_cgv_cinemas_raw_bytes.bin` | EZ-AM | 5.364 B | `2c4e43d7fa7ed9676d7b88a425e5687d5be2ef940e192f0c9c8a6804ec80fbc4` | **KHỚP 100% (BẢO TOÀN)** |

---

### III. BÁO CÁO DIFF PUBLIC DOM & BẢO VỆ BỀ MẶT THƯƠNG MẠI (MANDATE JAYT-256.5)

- **Diff Public DOM:** `0` (Không có bất kỳ thẻ, nút hay liên kết mới nào xuất hiện trên public storefront).
- **Public Cards Rendered:** Chính xác **1 thẻ T2 duy nhất (GitHub Education Pilot)**.
- **External Links Rendered:** Chính xác **1 link duy nhất (`docs.github.com/...`)**.
- **Commercial Locks:** T1 Vouchers = **0**, Commercial Deals = **0**, Affiliate Links = **0**.
- **Console Errors:** Đạt **chính xác 0 console error** trên Desktop 1440, Tablet 768, Mobile 390.

---

### IV. BÁO CÁO KẾT QUẢ KIỂM THỬ TIÊU CỰC (NEGATIVE TESTS)

Đã cài đặt và kiểm định thành công các negative fixtures:
1. **[Negative Test 1] T1 thiếu trường bắt buộc hoặc raw locator:** Cố tình đăng ký T1 thiếu listed_price locator → **BẮT BUỘC FAIL (`T1_CONTRACT_VIOLATION`)**.
2. **[Negative Test 2] T4 chứa trường thương mại hoặc CTA:** Cố tình đưa price hoặc affiliate CTA vào T4 → **BẮT BUỘC FAIL (`T4_CONTRACT_VIOLATION`)**.
3. **[Negative Test 3] PUBLIC_APPROVED không có CEO Approval ID:** Cố tình gán PUBLIC_APPROVED không có approval ref → **BẮT BUỘC FAIL (`AUTO_PUBLISH_FORBIDDEN`)**.

---

### V. DANH MỤC CÁC QUYẾT ĐỊNH CẦN THẨM QUYỀN CEO PHÊ DUYỆT (AUTHORITY CHECKLIST)

| Số TT | Hạng mục đề xuất | contentTier | admissionState Hiện Tại | Quyết định thẩm quyền xin CEO phê chuẩn | Đề xuất của Hội Đồng |
| :---: | :--- | :---: | :---: | :--- | :--- |
| 1 | **Figma for Education** | `T2_PROGRAM` | `EVIDENCE_COMPLETE_INTERNAL_HELD` | Phê duyệt chuyển sang `PUBLIC_APPROVED` hay tiếp tục giữ nội bộ? | Đề xuất: **TIẾP TỤC GIỮ NỘI BỘ** |
| 2 | **Thư viện Tổng hợp Đà Nẵng** | `T3_PLACE` | `EVIDENCE_COMPLETE_INTERNAL_HELD` | Phê duyệt chuyển sang `PUBLIC_APPROVED` hay giữ nội bộ do date lịch sử? | Đề xuất: **TIẾP TỤC GIỮ NỘI BỘ** |
| 3 | **Cohort 15 Nguồn Cung (EZ-AM)** | `T4_RADAR` | 14 `OPEN_EVALUATING` + 1 `CLOSED` | Duy trì intake nội bộ, đóng fail-closed tại SLA riêng | Tuân thủ: **DUY TRÌ THEO DÕI NỘI BỘ** |
| 4 | **Production Release** | Toàn hệ thống | Khóa tại `v3.419.0` (`P0_EQ = OPEN`) | Duy trì khóa sản xuất | Tuân thủ: **PRODUCTION TIẾP TỤC HOLD** |
