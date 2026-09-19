# HỒ SƠ HỘI ĐỒNG LIÊN BỘ — JAYT-256-CORRECTION-1
## KHẮC PHỤC LỖI SEMANTICS P0 — CÔ LẬP MAPPING TRƯỚC SLA, TÁCH BẠCH CONTENT ENTITY VÀ INTAKE CANDIDATES

**Mã hồ sơ:** `COUNCIL_REVIEW_PACK_JAYT_256_CORRECTION_1_SEMANTICS_20260901`
**Phiên bản Staging Hiện Hành:** `v3.483.0-staging.ao`
**Build ID:** `BUILD_JAYT_STAGING_v3.483.0-staging.ao`
**Chỉ thị chỉ đạo:** JAYT-245 Mục JAYT-256-CORRECTION-1 (Dòng 5012–5038)
**Thời gian phát hành:** 2026-09-01T13:00:50.236Z

---

### I. KẾT QUẢ CÔ LẬP VÀ ĐIỀU CHỈNH SEMANTICS (MANDATES CORRECTION-1.1 & 1.2)

1. **Cô lập Registry lỗi:** Toàn bộ file registry cũ (vốn gán sai `T4_RADAR` cho 14 candidate mở và đóng BHD sớm) đã được cô lập tại `06_TRUST_AND_EVIDENCE/QUARANTINED_JAYT_256_DATASET_2D_MAPPING_REGISTRY_FAULTY.json` làm artifact audit lịch sử.
2. **Tách bạch rõ ràng giữa Content Entities và Pre-SLA Intake Candidates:**
   - **Content Entities (Chỉ gồm các mục thỏa mãn contract):** Chính xác **4 thực thể** trong ma trận 4×5.
   - **Pre-SLA Intake Candidates (Cohort 15):** 15 ứng viên được đồng bộ động 1-1 từ canonical ledger với `admissionState = OPEN_EVALUATING`, `contentTier = null` (không bị gán nhãn T1–T4 trước SLA).
   - **BHD Star (COHORT_EZ_AM_04):** Giữ đúng `OPEN_EVALUATING + INTAKE_FAILED_NO_RAW`, tuyệt đối không `CLOSED` trước hạn SLA.
   - **JetBrains Student:** Giữ hồ sơ `FAST_LANE_LIFECYCLE_RECORD` (`HELD_NEW_COHORT_REQUIRED`) bên ngoài ma trận content cho đến khi có T4 contract độc lập.

---

### II. MA TRẬN MAPPING 4 TIER × 5 ADMISSION STATE ĐÃ HIỆU CHỈNH CHUẨN XÁC

| contentTier \ admissionState | OPEN_EVALUATING | EVIDENCE_COMPLETE_INTERNAL_HELD | HELD_NEW_COHORT_REQUIRED | CLOSED | PUBLIC_APPROVED | Tổng Theo Tier |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **T1_DEAL** | 0 | 0 | 0 | 0 | 0 | **0** |
| **T2_PROGRAM** | 0 | 2 (Figma, Notion Trial) | 0 | 0 | 1 (GitHub Pilot) | **3** |
| **T3_PLACE** | 0 | 1 (Thư viện Đà Nẵng) | 0 | 0 | 0 | **1** |
| **T4_RADAR** | 0 | 0 | 0 | 0 | 0 | **0** |
| **Tổng Theo State** | **0** | **3** | **0** | **0** | **1** | **4** |

- **Tổng Content Entities:** **4 mục** (chỉ các mục đã có contract rõ ràng).
- **Public Storefront:** Duy nhất **1 mục** (`PUBLIC_APPROVED = 1`, GitHub Education Pilot).

---

### III. BẢNG ĐỐI CHIẾU DIFF GIỮA MAPPING CŨ (FAULTY) VÀ MAPPING HIỆU CHỈNH (CORRECTED)

| Hạng mục đối soát | Registry Cũ (Faulty) | Registry Hiệu Chỉnh (Corrected) | Đánh Giá Tuân Thủ Policy |
| :--- | :---: | :---: | :--- |
| **14 Candidate Cohort 15 Reachable** | Gán sai `T4_RADAR + OPEN_EVALUATING` | Tách vào Intake Pool: `contentTier = null`, `RAW_CAPTURED` | **ĐÚNG POLICY PRE-SLA (KHÔNG GÁN TIER TRƯỚC SLA)** |
| **BHD Star (COHORT_EZ_AM_04)** | Gán sai `T4_RADAR + CLOSED` | Giữ trong Intake Pool: `contentTier = null`, `INTAKE_FAILED_NO_RAW` | **ĐÚNG POLICY (KHÔNG CLOSURE SỚM TRƯỚC SLA)** |
| **JetBrains Student** | Gán sai vào ma trận 4×5 (`T4_RADAR`) | Giữ ngoài ma trận làm Lifecycle Audit Record | **ĐÚNG POLICY (T4 CẦN STANDALONE CONTRACT)** |
| **Tổng Thực Thể Trong Ma Trận 4×5** | Đếm sai 20 thực thể | Đúng chuẩn 4 Content Entities | **CHÍNH XÁC 100% THEO CHỈ THỊ CEO** |

---

### IV. BÁO CÁO DIFF PUBLIC DOM & BẢO VỆ BỀ MẶT THƯƠNG MẠI

- **Diff Public DOM:** `0` (Không có bất kỳ thẻ, nút hay liên kết mới nào).
- **Public Cards Rendered:** Chính xác **1 thẻ T2 duy nhất (GitHub Education Pilot)**.
- **External Links Rendered:** Chính xác **1 link ngoài duy nhất (`docs.github.com/...`)**.
- **Commercial Locks:** T1 Vouchers = **0**, Commercial Deals = **0**, Affiliate Links = **0**.
- **Console Errors:** Đạt **chính xác 0 console error** trên 1440, 768, 390.

---

### V. DANH MỤC CÁC QUYẾT ĐỊNH CẦN THẨM QUYỀN CEO PHÊ DUYỆT (AUTHORITY CHECKLIST)

| Số TT | Hạng mục đề xuất | contentTier | admissionState Hiện Tại | Quyết định thẩm quyền xin CEO phê chuẩn | Đề xuất của Hội Đồng |
| :---: | :--- | :---: | :---: | :--- | :--- |
| 1 | **Figma for Education** | `T2_PROGRAM` | `EVIDENCE_COMPLETE_INTERNAL_HELD` | Phê duyệt chuyển sang `PUBLIC_APPROVED` hay tiếp tục giữ nội bộ? | Đề xuất: **TIẾP TỤC GIỮ NỘI BỘ** |
| 2 | **Thư viện Tổng hợp Đà Nẵng** | `T3_PLACE` | `EVIDENCE_COMPLETE_INTERNAL_HELD` | Phê duyệt chuyển sang `PUBLIC_APPROVED` hay giữ nội bộ do date lịch sử? | Đề xuất: **TIẾP TỤC GIỮ NỘI BỘ** |
| 3 | **Cohort 15 Nguồn Cung (EZ-AM)** | `null` (Intake Pool) | 15 `OPEN_EVALUATING` | Duy trì intake nội bộ, đóng fail-closed tại SLA riêng (`19:04Z`) | Tuân thủ: **DUY TRÌ THEO DÕI NỘI BỘ** |
| 4 | **Production Release** | Toàn hệ thống | Khóa tại `v3.419.0` (`P0_EQ = OPEN`) | Duy trì khóa sản xuất | Tuân thủ: **PRODUCTION TIẾP TỤC HOLD** |
