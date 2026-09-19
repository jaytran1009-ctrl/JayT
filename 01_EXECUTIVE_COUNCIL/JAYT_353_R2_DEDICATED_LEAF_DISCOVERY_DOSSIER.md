# JAYT-353-R2 — Executive Dossier: Dedicated Leaf Discovery for 12 Phi Long SKUs

- **Date:** 2026-09-08
- **Governing Directives:**
  - [JAYT_353_CEO_R1_BATCH17_STAGING_ACCEPTANCE.md](01_EXECUTIVE_COUNCIL/JAYT_353_CEO_R1_BATCH17_STAGING_ACCEPTANCE.md)
  - [WORK_ORDER_J353-R2_DEDICATED_LEAF_DISCOVERY.json](04_DATA_PIPELINE/dispatch/WORK_ORDER_J353-R2_DEDICATED_LEAF_DISCOVERY.json)
- **Authority:** Codex — CEO / Gatekeeper; Reviewer: Gemini — Strategic Advisor; Supreme Authority: Chairman.
- **Executor:** Antigravity — external software
- **Active Production Baseline:** `v3.427.0` (`dpl_F7XM5WPhKCD34MEEMkBwai65Vqfy`, Standby Rollback: `v3.426.0`).
- **Permissions Status:** `discovery_and_evidence_capture_authorized: true`; `staging_hydration_authorized: false`; `release_candidate_authorized: false`; `production_deploy_authorized: false`; `affiliate_tracking_authorized: false`.

---

## 1. Mục Đích & Bối Cảnh Lệnh R2

Tại đợt nghiệm thu JAYT-353-R1, CEO đã chấp nhận nạp Staging cho 3 mục đủ provenance (`B17_RADAR_PL_DTX64GB`, `B17_RADAR_PL_LENOVO_STUDENT_2026`, `B17_RADAR_PL_HP_BTS_2026`). Đồng thời, lệnh **J353-R2** được ban hành nhằm xử lý dứt điểm khiếm khuyết nguồn của **12 mặt hàng Phi Long bị cách ly** do tái sử dụng URL trang lá của sản phẩm Kingston DTX/64GB.

Yêu cầu nghiêm ngặt của Work Order J353-R2:
1. **Mỗi SKU một URL leaf độc lập:** Khám phá trang lá chính thức, xác thực HTTP 200, tuyệt đối không dùng lại URL của SKU khác.
2. **Thu thập và niêm phong bằng chứng thô:** Lưu trữ `.raw.html` và `.headers.json` (đã khử cookie/nhạy cảm) vào kho bằng chứng riêng biệt.
3. **Trích xuất span nguyên văn:** Ghi nhận chuỗi hiển thị tên sản phẩm (H1), span giá niêm yết từ DOM (`.p-price`), và số tiền VND thực tế.
4. **Chứng minh địa bàn thực tế:** Xác thực sự hiện diện của showroom Phi Long tại TP. Đà Nẵng trực tiếp từ thân trang lá đã capture.
5. **Kỷ luật dữ liệu:** Không suy diễn tồn kho tức thời; không gắn token affiliate/tracking; không thay đổi giao diện Staging hay Production khi chưa có lệnh mới.

---

## 2. Kết Quả Khám Phá & Thu Thập Bằng Chứng (12/12 PASS)

Đội ngũ thực thi đã tiến hành truy vấn trực tiếp đến hệ thống `philong.com.vn` với User-Agent tiêu chuẩn, phân tích cấu trúc DOM và thu thập đầy đủ 12 tệp HTML thô cùng header tương ứng vào kho `06_TRUST_AND_EVIDENCE/batch_17_r2_vault/`.

### 2.1 Chỉ Số Tổng Quan
- **Tổng số SKU mục tiêu:** 12 / 12
- **Số lượng có URL leaf độc lập:** 12 / 12 (100%)
- **Số lượng vi phạm URL dùng chung:** 0 (0%)
- **Số lượng trích xuất giá nguyên văn:** 12 / 12 (100%)
- **Số lượng xác thực địa bàn Đà Nẵng tại leaf:** 12 / 12 (100% - Showroom 152 Hàm Nghi & 52 Nguyễn Văn Linh)
- **Phán quyết:** **`PASS__ALL_12_SKUS_VERIFIED_DEDICATED_LEAF_BOUND`**

---

## 3. Bảng Đối Soát Chi Tiết 12 SKU Đã Xác Minh

| # | Mã Ứng Viên | SKU | Tên Sản Phẩm / H1 | Giá Niêm Yết | URL Leaf Độc Lập | Raw HTML SHA-256 | Phán Quyết |
| :---: | :--- | :--- | :--- | :---: | :--- | :--- | :---: |
| 1 | `B17_RADAR_PL_LJDS080064G` | `LJDS080064G-BNBNG` | USB Lexar JumpDrive S80 64GB USB 3.2 Gen 1 150MB/s (LJDS080064G-BNBNG) | 275.000đ | [philong.com.vn/...](https://philong.com.vn/usb-lexar-jumpdrive-s80-64gb.html) | `74f0610362e01700...` | **`VERIFIED__DEDICATED_LEAF_BOUND`** |
| 2 | `B17_RADAR_PL_LJDM400064G` | `LJDM400064G-BNBNG` | USB Lexar JumpDrive M400 64GB USB 3.2 150MB/s (LJDM400064G-BNBNG) | 290.000đ | [philong.com.vn/...](https://philong.com.vn/usb-lexar-jumpdrive-m400-64gb-ljdm400064g-bnbng.html) | `4ab247e3d2c8dad6...` | **`VERIFIED__DEDICATED_LEAF_BOUND`** |
| 3 | `B17_RADAR_PL_SDDDC6` | `SDDDC6-064G-G46` | USB Sandisk 64GB Phone Drive USB 3.2 Type-C/A (SDDDC6-064G-G46) | 590.000đ | [philong.com.vn/...](https://philong.com.vn/usb-sandisk-64gb-phone-drive-sdddc6-064g-g46.html) | `30a1b53e0570446d...` | **`VERIFIED__DEDICATED_LEAF_BOUND`** |
| 4 | `B17_RADAR_PL_CZ600` | `CZ600-64GB` | USB 64GB Sandisk Cruzer Glide CZ600 USB3.0 | 450.000đ | [philong.com.vn/...](https://philong.com.vn/usb-64gb-sandisk-3.0-cz600.html) | `dd3cc16905fe1529...` | **`VERIFIED__DEDICATED_LEAF_BOUND`** |
| 5 | `B17_RADAR_PL_SDCZ74` | `SDCZ74-064G` | HDD USB 64GB SANDISK ULTRA LUXE USB 3.1(SDCZ74-064G) | 590.000đ | [philong.com.vn/...](https://philong.com.vn/usb-64gb-sandisk-ultra-luxe-sdcz74-3.1.html) | `3ddda327cc1e2598...` | **`VERIFIED__DEDICATED_LEAF_BOUND`** |
| 6 | `B17_RADAR_PL_SXS1000` | `SXS1000/1000GA` | Ổ Cứng Di Động SSD Kingston XS1000 1TB USB 3.2 Gen 2 Black (SXS1000/1000GA) | 5.290.000đ | [philong.com.vn/...](https://philong.com.vn/ssd-kingston-xs1000-1tb-black-sxs1000-1000ga.html) | `b7c19c5800dfb3ba...` | **`VERIFIED__DEDICATED_LEAF_BOUND`** |
| 7 | `B17_RADAR_PL_DTXM128GB` | `DTXM/128GB` | USB Kingston 128GB DataTraveler Exodia M DTXM/128GB (USB 3.2 Gen 1) | 350.000đ | [philong.com.vn/...](https://philong.com.vn/usb-kingston-datatraveler-exodia-m-dtxm-128gb.html) | `c698b35960346866...` | **`VERIFIED__DEDICATED_LEAF_BOUND`** |
| 8 | `B17_RADAR_PL_DTX256GB` | `DTX/256GB` | USB Kingston 256GB DataTraveler Exodia USB 3.2 (DTX/256GB) | 790.000đ | [philong.com.vn/...](https://philong.com.vn/usb-kingston-256gb-datatraveler-exodia-dtx-256gb.html) | `f864411b251c7a7e...` | **`VERIFIED__DEDICATED_LEAF_BOUND`** |
| 9 | `B17_RADAR_PL_SA400_480G` | `SA400S37/480G` | SSD 480GB KINGSTON A400 SATA 3 2.5 INCH (SA400S37/480G) | 3.490.000đ | [philong.com.vn/...](https://philong.com.vn/ssd-kingston-480gb-a400-sa400s37480g-sata-iii.html) | `e244156c9ae73e5f...` | **`VERIFIED__DEDICATED_LEAF_BOUND`** |
| 10 | `B17_RADAR_PL_SKC3000_1024G` | `SKC3000S/1024G` | SSD Kingston KC3000 1024GB PCIe 4.0 NVMe M.2 (SKC3000S/1024G) | 8.990.000đ | [philong.com.vn/...](https://philong.com.vn/ssd-kingston-kc3000-1024gb-pcie-4.0-nvme-m.2-ssd.html) | `d768e90be4071e70...` | **`VERIFIED__DEDICATED_LEAF_BOUND`** |
| 11 | `B17_RADAR_PL_SNV3S_1000G` | `SNV3S/1000G` | Ổ cứng gắn trong SSD Kingston NV3 1TB M.2 2280 NVMe PCIe Gen4x4 (SNV3S/1000G) | 4.490.000đ | [philong.com.vn/...](https://philong.com.vn/o-cung-gan-trong-ssd-kingston-nv3-1tb.html) | `f899114ba74611c7...` | **`VERIFIED__DEDICATED_LEAF_BOUND`** |
| 12 | `B17_RADAR_PL_KVR56S46BS8` | `KVR56S46BS8-16WP` | Ram Laptop DDR5 Kingston 16GB 5600MHz 1.1V (KVR56S46BS8-16WP) | 7.490.000đ | [philong.com.vn/...](https://philong.com.vn/ram-laptop-ddr5-kingston-16gb-5600mhz-kvr56s46bs8-16wp.html) | `47bac45e7264c1fe...` | **`VERIFIED__DEDICATED_LEAF_BOUND`** |

---

## 4. Ràng Buộc Địa Bàn & Minh Bạch Tồn Kho

Tất cả 12 trang lá đã được kiểm toán tự động về phần chân trang (footer) chứa địa chỉ pháp lý và cơ sở kinh doanh thực tế tại Đà Nẵng:
- Showroom 1: `152 Hàm Nghi, Thanh Khê, TP. Đà Nẵng`
- Showroom 2: `52 Nguyễn Văn Linh, Hải Châu, TP. Đà Nẵng`

**Quy chuẩn hiển thị đề xuất khi hydrate (nếu được cấp phép):**
- Hiển thị nhãn nguồn giá: *"Giá niêm yết theo trang lá chính thức Phi Long Technology tại Đà Nẵng"*.
- Hiển thị disclaimer bắt buộc: *"Không khẳng định số lượng tồn kho tức thời tại quầy; người dùng kiểm tra thực tế trước khi đến"*.

---

## 5. Tệp Biên Nhận Máy Đọc Được (Machine-Readable Artifacts)

- **Biên nhận chính thức:** [RECEIPT_J353-R2_DEDICATED_LEAF_DISCOVERY.json](07_QUALITY_ASSURANCE/runtime_evidence/RECEIPT_J353-R2_DEDICATED_LEAF_DISCOVERY.json)
- **Mã băm SHA-256:** `2aea5ec8befc6b60af890412d8d4280096ff6fb5e12182916505c1ad86fce5e5`
- **Khóa Sidecar:** [RECEIPT_J353-R2_DEDICATED_LEAF_DISCOVERY.json.sha256](07_QUALITY_ASSURANCE/runtime_evidence/RECEIPT_J353-R2_DEDICATED_LEAF_DISCOVERY.json.sha256)
- **Kho bằng chứng thô (24 tệp):** `06_TRUST_AND_EVIDENCE/batch_17_r2_vault/` (đồng bộ 100% không lệch byte giữa 2 workspace).

---

## 6. Trình Cổng Quyết Định (CEO & Strategic Review Submission)

Toàn bộ 12 SKU bị giam giữ tại cổng Provenance đã hoàn tất quy trình khám phá lá độc lập đạt chuẩn 100%. Antigravity kính trình CEO/Gatekeeper (Codex) và Cố vấn Chiến lược (Gemini) xem xét:
1. **Chấp thuận Biên nhận R2:** `RECEIPT_J353-R2_DEDICATED_LEAF_DISCOVERY.json`.
2. **Quyết định phạm vi Hydrate:** Có cho phép hydrate 12 SKU này vào Staging Smart Value Radar trong một Work Order R3 hay giữ nguyên cấu hình hiện tại.
3. **Bảo toàn trạng thái Production:** Production `v3.427.0` tiếp tục được niêm phong bất biến.
