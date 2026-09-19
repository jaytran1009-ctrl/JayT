# HỒ SƠ HỘI ĐỒNG LIÊN BỘ — JAYT SECTION EZ-AQ
## THỰC THI ĐÓNG FAST LANE SLA FAIL-CLOSED SAU THỜI HẠN THỰC TẾ & BẢO LƯU RANH GIỚI AN TOÀN

**Mã hồ sơ:** `COUNCIL_REVIEW_PACK_EZ_AQ_FAST_LANE_SLA_CLOSURE_20260901`
**Phiên bản Staging Hiện Hành:** `v3.483.0-staging.ao`
**Build ID:** `BUILD_JAYT_STAGING_v3.483.0-staging.ao`
**Chỉ thị chỉ đạo:** JAYT-245 Mục EZ-AK (Dòng 5108–5128) & Mục EZ-AP (Dòng 5057–5062)
**Thời điểm thực thi Closure:** `2026-09-01T12:01:19Z` (Runtime thực tế sau mốc đóng SLA `2026-09-01T08:28:00Z`)
**Trạng thái Fast Lane:** `CLOSED_SLA_COMPLETED_FAIL_CLOSED`

---

### I. KIỂM ĐỊNH CLOCK GUARD & TÍNH HỢP LỆ THỜI GIAN (MANDATE EZ-AK.2 & EZ-AP)

Hội đồng liên bộ đã thực thi quy tắc Clock Guard trước khi thực hiện phán quyết:
1. **Mốc đóng SLA theo quy định:** `2026-09-01T08:28:00Z` (24 giờ kể từ khi mở lúc `2026-08-31T08:28:00Z`).
2. **Thời gian runtime UTC thực tế:** `2026-09-01T12:01:19Z` (`19:01:19+07:00`).
3. **Điều kiện thời gian:** `now (12:01:19Z) >= close (08:28:00Z)` → **HỢP LỆ (ĐÃ HẾT HẠN SLA 3h33m)**.
4. **Chống Backdate & Timestamp tương lai:** Timestamp ghi nhận trên hồ sơ và ledger là chính xác thời gian runtime thực tế `2026-09-01T12:01:19Z`, tuyệt đối không backdate về `08:28:00Z`.

---

### II. BÁO CÁO KẾT QUẢ PHÁN QUYẾT TỪ RAW EVIDENCE (MANDATE EZ-AK.2)

#### 1. Candidate 1: JetBrains Student (`FAST_LANE_RERUN_01_JETBRAINS_STUDENT`)
- **Raw File:** `06_TRUST_AND_EVIDENCE/evidence_vault_ez_ae/candidate_ez_ae_01_jetbrains_student_raw_bytes.bin` (494.398 B, SHA-256: `355d9e1e6d07125c0dfedda229b1880a78a54f86044a5c183c4b8b780637dceb`).
- **Khảo sát 4 Core Fields:**
  - `title`: **PRESENT** (Offset 7207, `<title>Free JetBrains Student Pack</title>`).
  - `eligibility_cohort`: **PRESENT** (Offset 7229, `Free JetBrains Student Pack`).
  - `scope`: **PRESENT** (Offset 407708, `strictly for non-commercial educational purposes`).
  - `action_url`: **MISSING** (HTML tĩnh chỉ có liên kết thông tin `/academy/student-pack/`, thiếu nút form đăng ký trực tiếp; luồng form động client-side không có trong static bytes).
- **Phán quyết Fail-Closed:** Thiếu trường bắt buộc `action_url` → **`T4_DESCRIPTIVE_ONLY_HELD_INTERNAL`**.
- **Public Eligible:** `false` (Lưu hành nội bộ, không tạo thẻ, không tạo voucher, không affiliate).

#### 2. Candidate 2: Figma for Education (`FAST_LANE_RERUN_02_FIGMA_EDUCATION`)
- **Raw File:** `06_TRUST_AND_EVIDENCE/evidence_vault_ez_ae/candidate_ez_ae_02_figma_education_raw_bytes.bin` (1.658.429 B, SHA-256: `090801961331bd51a6ca07ee0b16527a18854b77f51cf26f26382064cc9d7892`).
- **Khảo sát 4 Core Fields:**
  - `title`: **PRESENT** (Offset 5091, `<title>Figma for Education | Free Tools for the Classroom</title>`).
  - `eligibility_cohort`: **PRESENT** (Offset 175134, `all free, as a student or teacher`).
  - `scope`: **PRESENT** (Offset 5139, `Classroom`).
  - `action_url`: **PRESENT** (Offset 175374, nút CTA `Get verified`).
- **Phán quyết Fail-Closed:** Đủ 4 trường cốt lõi theo JAYT-245 Mục EZ-AK: *"nếu đủ đầy đủ core fields của T2 thì chỉ ghi T2 nội bộ chờ Council"*.
- **Phân loại:** **`T2_DOCUMENTATION_HELD_INTERNAL`** (Ghi nhận nội bộ, chờ thẩm quyền CEO phê duyệt).
- **Public Eligible:** `false` (Tạm giữ nội bộ, KHÔNG đưa lên bề mặt public staging).

---

### III. DANH MỤC CÁC QUYẾT ĐỊNH CẦN THẨM QUYỀN CEO PHÊ DUYỆT (AUTHORITY GATES)

| Số TT | Hạng mục đề xuất | Hiện trạng kỹ thuật | Quyết định thẩm quyền cần CEO phê chuẩn | Đề xuất của Hội Đồng |
| :---: | :--- | :--- | :--- | :--- |
| 1 | **Figma for Education Public Card** | Đã đủ 4/4 core fields trong raw bytes, phân loại `T2_DOCUMENTATION_HELD_INTERNAL` | Cho phép phát hành thẻ tài liệu T2 lên Staging DOM hay tiếp tục HELD nội bộ? | Đề xuất: **GIỮ NỘI BỘ (HELD)** cho đến khi hoàn thành cohort cinema/transit |
| 2 | **JetBrains Student Form Capture** | Thiếu action URL trong static HTML, phân loại `T4_DESCRIPTIVE_ONLY_HELD_INTERNAL` | Mở đợt capture thứ 2 với dynamic renderer hay đóng vĩnh viễn ở T4? | Đề xuất: **GIỮ NGUYÊN T4**, không thực hiện khảo sát bổ sung lúc này |
| 3 | **Cohort 15 Nguồn Cung (EZ-AM)** | 14 OPEN + 1 INTAKE_FAILED_NO_RAW, đang trong cửa sổ 12h SLA | Duy trì intake nội bộ, không gán tier trước khi SLA đóng | Tuân thủ: **GIỮ OPEN KHÔNG TIER** |
| 4 | **Production Release** | Khóa nghiêm ngặt tại `v3.419.0` (`P0_EQ = OPEN`) | Tiếp tục khóa sản xuất | Tuân thủ: **PRODUCTION TIẾP TỤC HOLD** |

---

### IV. CAM KẾT BẢO TỒN NỀN TẢNG

1. **Bề mặt Public Staging:** Tuyệt đối giữ nguyên **1 thẻ duy nhất (GitHub Education Pilot)** và **1 external link duy nhất (`docs.github.com/...`)**.
2. **Thương mại:** T1 Verified Vouchers = **0**, Commercial Deals = **0**, Affiliate Links = **0** (Authority Gate: **LOCKED**).
3. **Mã băm Artifact:** Giữ nguyên tính toàn vẹn 4 chiều tuyệt đối của build `v3.483.0-staging.ao`.
