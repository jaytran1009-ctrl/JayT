# HỒ SƠ HỘI ĐỒNG LIÊN BỘ — JAYT SECTION EZ-AN
## KHẮC PHỤC TRIỆT ĐỂ EXTERNAL DEPENDENCY VÀ CHUẨN HÓA NGỮ NGHĨA PRE-SLA

**Mã hồ sơ:** `COUNCIL_REVIEW_PACK_EZ_AN_EXTERNAL_DEPENDENCY_AND_PRE_SLA_CORRECTION_20260901`
**Phiên bản Staging Authoritative:** `v3.482.0-staging.ez`
**Chỉ thị chỉ đạo:** JAYT-245 Mục EZ-AN (Dòng 5018–5046)
**Thời gian lập hồ sơ:** 2026-09-01T07:11:38.223Z

---

### I. KHẮC PHỤC P1: LOẠI BỎ TOÀN BỘ DEPENDENCY BÊN THỨ BA TRÊN STAGING (MANDATE EZ-AN.2)

1. **Phát hiện của CEO:** `staging_deploy_ey/index.html` tải Google Fonts (`fonts.googleapis.com` / `fonts.gstatic.com`), gây lỗi `net::ERR_NETWORK_ACCESS_DENIED` khi chạy trình duyệt trong môi trường bị chặn kết nối mạng bên ngoài.
2. **Biện pháp xử lý triệt để:**
   - Đã gỡ bỏ toàn bộ 3 thẻ `<link>` font bên thứ ba khỏi `03_SOURCE_OF_TRUTH/index.html` và `staging_deploy_ey/index.html`.
   - Sử dụng 100% **System Font Stack** (`-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`), không phát sinh bất kỳ request ra mạng ngoài nào khi tải trang.
   - **Cam kết kiểm thử:** Tuyệt đối không suppress console, không filter lỗi mạng; toàn bộ lifecycle trình duyệt trên 1440, 768, 390 phải đạt **chính xác 0 console error**.

#### Danh sách Request khi tải Staging (Audit đối chiếu cho CEO):
| STT | URL Request | Nguồn gốc | Trạng thái |
| :---: | :--- | :---: | :---: |
| 1 | `http://127.0.0.1:4173/` | Internal Staging Server | HTTP 200 OK |
| 2 | `http://127.0.0.1:4173/styles.css` | Internal Staging Server | HTTP 200 OK |
| 3 | `http://127.0.0.1:4173/jayt_storefront_staging_ey.js` | Internal Staging Server | HTTP 200 OK |
| 4 | `http://127.0.0.1:4173/assets/images/board_a_afterglow_hero.svg` | Internal Staging Server | HTTP 200 OK |
| **Tổng** | **4 internal requests / 0 external requests** | **Hoàn toàn độc lập mạng** | **0 Network Errors** |

---

### II. CHUẨN HÓA NGỮ NGHĨA PRE-SLA CHO COHORT 15 NGUỒN CUNG (MANDATE EZ-AN.3)

1. **Phát hiện của CEO:** 14 candidate đang `OPEN_EVALUATING` nhưng ledger lại gán `interim_assessment = T4_DESCRIPTIVE_ONLY_HELD_INTERNAL` và đếm `t4_held_internal = 14`, tạo cảm giác phán quyết tier trước hạn SLA.
2. **Chuẩn hóa rành mạch 3 trạng thái:**
   - **14 Candidate đang mở SLA:** Mang trạng thái duy nhất `OPEN_EVALUATING`, liệt kê rõ `missing_fields` và `preclosure_block_reason`. **Đã xóa bỏ hoàn toàn** các trường `interim_assessment`, `verdict_tier` và aggregate T1–T4.
   - **1 Candidate lỗi kết nối (BHD Star):** Chuyển sang trạng thái intake `INTAKE_FAILED_NO_RAW`, `public_eligible = false`, không gán tier và không tính là closure hay verdict. Có thể mở lại bằng raw capture mới trong tương lai.
   - **Chính sách phán quyết:** Chỉ tại hoặc sau thời điểm SLA close thực tế mới cho phép đánh giá và tạo tier verdict fail-closed. Test QA có negative fixture chặn đứng mọi hành vi gán tier trước close.

---

### III. BẢNG TRẠNG THÁI CHUẨN HÓA COHORT 15 CANDIDATES

| Mã Ứng Viên | Nhóm | Tên Nguồn | Trạng Thái Pre-SLA | SLA Window | Lý Do Block Preclosure |
| :--- | :---: | :--- | :---: | :---: | :--- |
| `COHORT_EZ_AM_01` | Cinema | CGV Cinemas | `OPEN_EVALUATING` | 12h SLA | Thiếu voucher/giá cụ thể trên portal; đang trong SLA |
| `COHORT_EZ_AM_02` | Cinema | Lotte Cinema | `OPEN_EVALUATING` | 12h SLA | Thiếu voucher/giá cụ thể trên portal; đang trong SLA |
| `COHORT_EZ_AM_03` | Cinema | Galaxy Cinema | `OPEN_EVALUATING` | 12h SLA | Thiếu voucher/giá cụ thể trên portal; đang trong SLA |
| `COHORT_EZ_AM_04` | Cinema | BHD Star Cineplex | `INTAKE_FAILED_NO_RAW` | N/A | Lỗi kết nối (ECONNREFUSED) khi intake; không raw bytes |
| `COHORT_EZ_AM_05` | Cinema | Mega GS Cinemas | `OPEN_EVALUATING` | 12h SLA | Thiếu voucher/giá cụ thể trên portal; đang trong SLA |
| `COHORT_EZ_AM_06` | Cinema | CineStar Cinemas | `OPEN_EVALUATING` | 12h SLA | Thiếu voucher/giá cụ thể trên portal; đang trong SLA |
| `COHORT_EZ_AM_07` | Cinema | DCINE Vietnam | `OPEN_EVALUATING` | 12h SLA | Thiếu voucher/giá cụ thể trên portal; đang trong SLA |
| `COHORT_EZ_AM_08` | Transit | Da Nang Bus (DATRAMAC) | `OPEN_EVALUATING` | 12h SLA | Thiếu voucher/giá cụ thể trên portal; đang trong SLA |
| `COHORT_EZ_AM_09` | Transit | Grab Vietnam Co., Ltd. | `OPEN_EVALUATING` | 12h SLA | Thiếu voucher/giá cụ thể trên portal; đang trong SLA |
| `COHORT_EZ_AM_10` | Transit | Be Group JSC | `OPEN_EVALUATING` | 12h SLA | Thiếu voucher/giá cụ thể trên portal; đang trong SLA |
| `COHORT_EZ_AM_11` | Transit | Xanh SM (GSM JSC) | `OPEN_EVALUATING` | 12h SLA | Thiếu voucher/giá cụ thể trên portal; đang trong SLA |
| `COHORT_EZ_AM_12` | Transit | Đường Sắt Việt Nam (VNR) | `OPEN_EVALUATING` | 12h SLA | Thiếu voucher/giá cụ thể trên portal; đang trong SLA |
| `COHORT_EZ_AM_13` | Transit | Vietnam Airlines JSC | `OPEN_EVALUATING` | 12h SLA | Thiếu voucher/giá cụ thể trên portal; đang trong SLA |
| `COHORT_EZ_AM_14` | Transit | VietJet Aviation JSC | `OPEN_EVALUATING` | 12h SLA | Thiếu voucher/giá cụ thể trên portal; đang trong SLA |
| `COHORT_EZ_AM_15` | Transit | TNGO Xe Đạp (Tri Nam Group) | `OPEN_EVALUATING` | 12h SLA | Thiếu voucher/giá cụ thể trên portal; đang trong SLA |

---

### IV. BẢO TOÀN TRẠNG THÁI FAST LANE VÀ NỀN TẢNG

- **Fast Lane (JetBrains & Figma):** Giữ nguyên `OPEN_EVALUATING` theo chỉ thị EZ-AL đến đúng mốc `>= 2026-09-01T08:28:00Z`.
- **Production Status:** **LOCKED `v3.419.0` (`P0_EQ = OPEN`)**.
- **Staging Server:** `http://127.0.0.1:4173/` (`v3.482.0-staging.ez`).
- **T1 Verified Deals:** **0**.
- **Public Vouchers:** **0**.
- **Affiliate Links:** **0 (KHÓA)**.
