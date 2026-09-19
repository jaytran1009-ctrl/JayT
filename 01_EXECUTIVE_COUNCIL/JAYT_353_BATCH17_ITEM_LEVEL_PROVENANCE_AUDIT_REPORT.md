# JAYT-353 — Batch 17 Item-Level Provenance Audit Report

- **Date:** 2026-09-08
- **Governing Directives:**
  - [JAYT_353_CEO_PRODUCTION_ACCEPTANCE_AND_BATCH17_GATE_DECISION.md](file:///D:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/01_EXECUTIVE_COUNCIL/JAYT_353_CEO_PRODUCTION_ACCEPTANCE_AND_BATCH17_GATE_DECISION.md)
  - [WORK_ORDER_J353_BATCH17.json](file:///D:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/04_DATA_PIPELINE/dispatch/WORK_ORDER_J353_BATCH17.json)
- **Executor:** Antigravity — external software
- **Authority:** Codex — CEO / Gatekeeper; Reviewer: Gemini — Independent Strategic Advisor; Supreme Authority: Chairman.
- **Production Baseline Status:** `v3.427.0` is `PRODUCTION_ACCEPTED__V3427_BASELINE_EFFECTIVE` (Deployment ID `dpl_F7XM5WPhKCD34MEEMkBwai65Vqfy`, verified across 6 endpoints, 76 entities, Split Bill Pro, 0 errors, empty deals feed).

---

## 1. Context & Gate Phán Quyết

CEO Gate Decision ghi nhận:
- Phán quyết: **`HARVEST_ACCEPTED__STAGING_PROMOTION_HELD_FOR_ITEM_LEVEL_PROVENANCE`**.
- Biên nhận Harvest [RECEIPT_J353_BATCH17_HARVEST.json](file:///D:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/runtime_evidence/RECEIPT_J353_BATCH17_HARVEST.json) (SHA-256: `f213a4c9...`) được chấp thuận ở tầng thu thập/khám phá ban đầu.
- **Điểm nghẽn cần xử lý trước khi hydrate Staging:** Tách biệt triệt để URL leaf và bằng chứng raw cho từng mặt hàng radar; cấm tuyệt đối việc dùng chung URL sản phẩm/catalog của một SKU (DTX/64GB) để gán cho các SKU khác.
- Mọi mặt hàng chưa có URL leaf độc lập và raw SHA-256 riêng biệt phải được giữ lại tại cổng provenance (`HELD__SHARED_PRODUCT_URL_LACKS_DEDICATED_LEAF_PROVENANCE`).

---

## 2. Ma Trận Kiểm Toán Item-Level Provenance (16 Radar Items)

Căn cứ 3 tiêu chí ràng buộc bắt buộc:
1. **Tiêu chí 1 (Exact Official Leaf URL):** URL lá chính thức độc lập của chính SKU/chương trình đó (không dùng URL dùng chung hay URL của SKU khác).
2. **Tiêu chí 2 (Raw SHA-256 & Span):** Tệp bằng chứng thô và span trích xuất giá/tên mặt hàng thực tế.
3. **Tiêu chí 3 (Da Nang Locality Source):** Nguồn chứng minh sự hiện diện thực tế tại địa bàn Đà Nẵng.

### 2.1 Bảng Tổng Hợp Kiểm Toán

| # | SKU / Mã Ứng Viên | Tên Sản Phẩm / Ưu Đãi | Tiêu Chí 1 (Leaf URL) | Tiêu Chí 2 (Raw SHA & Span) | Tiêu Chí 3 (Đà Nẵng Locality) | Phán Quyết Provenance Gate |
| :---: | :--- | :--- | :---: | :---: | :---: | :---: |
| 1 | `B17_RADAR_PL_DTX64GB` | HDD USB Kingston 64GB Exodia DTX/64GB | **PASS** (Đúng URL leaf DTX/64GB) | **PASS** (`108a8554...`, `290.000 đ`) | **PASS** (Showroom Hàm Nghi & NVL) | **`VERIFIED__PROVENANCE_BOUND`** |
| 2 | `B17_RADAR_DMX_M170` | Chuột Không dây Logitech M170 Đen | **PASS** (Đúng URL leaf M170) | **PASS** (`f60c3dd2...`, `210.000₫`) | **CONDITIONAL** (Bắt buộc kèm badge chưa xác thực kho) | **`VERIFIED__BOUND_WITH_DISCLOSURE`** |
| 3 | `B17_RADAR_PL_LENOVO_STUDENT_2026` | Ưu đãi laptop sinh viên Lenovo 2026 | **PASS** (Đúng URL chiến dịch Lenovo) | **PASS** (`b4475c7d...`, Balo + quà) | **PASS** (Showroom Hàm Nghi & NVL) | **`VERIFIED__PROVENANCE_BOUND`** |
| 4 | `B17_RADAR_PL_HP_BTS_2026` | HP Back to School 2026 (Victus & OmniBook) | **PASS** (Đúng URL chiến dịch HP BTS) | **PASS** (`7e9a01fa...`, Tai nghe & chuột) | **PASS** (Showroom Hàm Nghi & NVL) | **`VERIFIED__PROVENANCE_BOUND`** |
| 5 | `B17_RADAR_PL_LJDS080064G` | USB Lexar JumpDrive S80 64GB | **FAIL** (Dùng chung URL DTX/64GB) | **FAIL** (Trích từ carousel liên quan) | PASS (Footer cửa hàng) | **`HELD__QUARANTINED`** |
| 6 | `B17_RADAR_PL_LJDM400064G` | USB Lexar JumpDrive M400 64GB | **FAIL** (Dùng chung URL DTX/64GB) | **FAIL** (Trích từ carousel liên quan) | PASS (Footer cửa hàng) | **`HELD__QUARANTINED`** |
| 7 | `B17_RADAR_PL_SDDDC6` | USB Sandisk 64GB Phone Drive Type-C/A | **FAIL** (Dùng chung URL DTX/64GB) | **FAIL** (Trích từ carousel liên quan) | PASS (Footer cửa hàng) | **`HELD__QUARANTINED`** |
| 8 | `B17_RADAR_PL_CZ600` | USB 64GB Sandisk Cruzer Glide CZ600 | **FAIL** (Dùng chung URL DTX/64GB) | **FAIL** (Trích từ carousel liên quan) | PASS (Footer cửa hàng) | **`HELD__QUARANTINED`** |
| 9 | `B17_RADAR_PL_SDCZ74` | HDD USB 64GB SANDISK ULTRA LUXE | **FAIL** (Dùng chung URL DTX/64GB) | **FAIL** (Trích từ carousel liên quan) | PASS (Footer cửa hàng) | **`HELD__QUARANTINED`** |
| 10 | `B17_RADAR_PL_SXS1000` | SSD Di Động Kingston XS1000 1TB | **FAIL** (Dùng chung URL DTX/64GB) | **FAIL** (Trích từ carousel liên quan) | PASS (Footer cửa hàng) | **`HELD__QUARANTINED`** |
| 11 | `B17_RADAR_PL_DTXM128GB` | USB Kingston 128GB DataTraveler Exodia M | **FAIL** (Dùng chung URL DTX/64GB) | **FAIL** (Trích từ carousel liên quan) | PASS (Footer cửa hàng) | **`HELD__QUARANTINED`** |
| 12 | `B17_RADAR_PL_DTX256GB` | USB Kingston 256GB DataTraveler Exodia | **FAIL** (Dùng chung URL DTX/64GB) | **FAIL** (Trích từ carousel liên quan) | PASS (Footer cửa hàng) | **`HELD__QUARANTINED`** |
| 13 | `B17_RADAR_PL_SA400_480G` | SSD 480GB KINGSTON A400 SATA 3 | **FAIL** (Dùng chung URL DTX/64GB) | **FAIL** (Trích từ carousel liên quan) | PASS (Footer cửa hàng) | **`HELD__QUARANTINED`** |
| 14 | `B17_RADAR_PL_SKC3000_1024G` | SSD Kingston KC3000 1024GB PCIe 4.0 | **FAIL** (Dùng chung URL DTX/64GB) | **FAIL** (Trích từ carousel liên quan) | PASS (Footer cửa hàng) | **`HELD__QUARANTINED`** |
| 15 | `B17_RADAR_PL_SNV3S_1000G` | SSD Kingston NV3 1TB M.2 PCIe Gen4 | **FAIL** (Dùng chung URL DTX/64GB) | **FAIL** (Trích từ carousel liên quan) | PASS (Footer cửa hàng) | **`HELD__QUARANTINED`** |
| 16 | `B17_RADAR_PL_KVR56S46BS8` | Ram Laptop DDR5 Kingston 16GB 5600MHz | **FAIL** (Dùng chung URL DTX/64GB) | **FAIL** (Trích từ carousel liên quan) | PASS (Footer cửa hàng) | **`HELD__QUARANTINED`** |

---

## 3. Phân Lập & Hành Động Kỷ Luật Dữ Liệu

1. **Nhóm Cách Ly (Quarantined - 12 SKUs):**
   - Các mặt hàng từ số 5 đến 16 bị **giữ lại tuyệt đối tại cổng provenance**.
   - **Lý do:** Tồn tại lỗi kiến trúc dữ liệu khi gán URL lá của sản phẩm Kingston 64GB Exodia cho các mặt hàng khác xuất hiện ở danh mục sản phẩm liên quan (carousel) mà chưa thực hiện capture trang lá chi tiết riêng biệt.
   - **Kỷ luật:** Cấm tuyệt đối việc hydrate 12 mặt hàng này vào Staging DOM hoặc đóng gói vào bất kỳ Release Candidate nào cho đến khi quy trình crawl trang lá độc lập được thực thi và xác nhận băm riêng.
2. **Nhóm Đủ Điều Kiện Provenance (4 SKUs):**
   - 3 sản phẩm đạt chuẩn hoàn toàn: `B17_RADAR_PL_DTX64GB`, `B17_RADAR_PL_LENOVO_STUDENT_2026`, `B17_RADAR_PL_HP_BTS_2026`.
   - 1 sản phẩm đạt chuẩn kèm điều kiện minh bạch địa bàn: `B17_RADAR_DMX_M170` (Logitech M170) do trang hệ thống siêu thị Điện Máy Xanh Đà Nẵng trả về HTTP 500 (`JAYT_333_R3_DMX_LOCALITY_VERDICT.json`), nếu nạp Staging bắt buộc phải hiển thị nhãn cảnh báo tồn kho địa phương chưa xác nhận.

---

## 4. Tệp Dữ Liệu Máy Đọc Được (Machine-Readable Artifact)

- **Đường dẫn tệp ma trận:** [JAYT_353_BATCH17_ITEM_LEVEL_PROVENANCE_MATRIX.json](file:///D:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/runtime_evidence/JAYT_353_BATCH17_ITEM_LEVEL_PROVENANCE_MATRIX.json)
- **SHA-256:** `a42aa17ffc5a0a22a28f8842ad5f33f2e9ddb9be62479414d39c35510e331348`
- **Khóa Sidecar:** [JAYT_353_BATCH17_ITEM_LEVEL_PROVENANCE_MATRIX.json.sha256](file:///D:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/runtime_evidence/JAYT_353_BATCH17_ITEM_LEVEL_PROVENANCE_MATRIX.json.sha256)
