# JAYT CORP — HỒ SƠ NGHIỆM THU: JAYT-107-STORE-PHOTO-TRUTH-AND-RIGHTS-RESOLUTION
> **Mã đợt nộp**: `JAYT-107-STORE-PHOTO-TRUTH-AND-RIGHTS-RESOLUTION`  
> **Thời điểm niêm phong**: `2026-08-25T18:01:00+07:00`  
> **Trạng thái đề xuất**: `107: STAGING INSTANCE VALIDATED — PRODUCTION LOCKED — ZERO CANDIDATES`  
> **Tài liệu bộ nhớ vận hành**: [`PROJECT_MEMORY.md`](../../PROJECT_MEMORY.md) (Phiên bản `v3.214.0`, SHA-256: `2cd4aee2253037989c90233a160a2c48cff2b742f01935152ee421734a95f88a`)

---

## 1. Tóm Tắt Thực Hiện Chỉ Thị Của CEO (Batch 107)

1. **Gỡ 100% Ảnh Crop 106 Khỏi Giao Diện Thẻ Địa Điểm**:
   - Gỡ bỏ toàn bộ 6 file ảnh crop khỏi giao diện người dùng.
   - Chuyển trạng thái 6 file crop trong hồ sơ dữ liệu thành `OFFICIAL_PAGE_SCREENSHOT_CONTEXT_ONLY`.
   - Khẳng định rõ: ảnh chụp màn hình HTML không đủ tư cách làm ảnh thực tế của từng cơ sở cụ thể.
2. **Quy Chuẩn Chân Lý & Bản Quyền 4 Điều Kiện Bắt Buộc Để Host Ảnh**:
   - (1) `media_original_url`: URL media gốc trực tiếp từ CDN/website chính thức;
   - (2) `file_sha256`: Tệp gốc vật lý trên đĩa + mã băm SHA-256 xác thực;
   - (3) `facility_attribution_match`: Trang nguồn chính thức nêu rõ đích danh cơ sở/địa chỉ tại Đà Nẵng (không suy diễn banner/trang chủ thành ảnh chi nhánh);
   - (4) `rights_status == DISPLAY_PERMISSION_CONFIRMED`: Quyền sao chép và hiển thị lại trên JayT được xác nhận minh bạch.
   - ⚠️ **Nguyên tắc Fail-Closed**: Thiếu bất kỳ 1 trong 4 mục $\rightarrow$ **Tuyệt đối không host ảnh trên JayT**.
3. **Áp Dụng Chuẩn 100% Fallback Brand Monogram + Outbound Links Cho 18 Cơ Sở**:
   - 100% 18 chi nhánh Cobalt sử dụng **Monogram thương hiệu chính hãng** (`getBrandMonogram`) + nút **“Xem không gian tại kênh chính thức ↗”** điều hướng về website/store locator gốc.
   - Không dùng ảnh AI, không dùng ảnh crop, không copy ảnh từ Google Maps, review cá nhân hay mạng xã hội bên thứ ba.
4. **Bổ Sung Test Chặn Nghiêm Ngặt (Regression-Proof)**:
   - Thêm suite [`07_QUALITY_ASSURANCE/test_store_photo_truth_and_rights_107.js`](../07_QUALITY_ASSURANCE/test_store_photo_truth_and_rights_107.js) kiểm thử tự động 10/10 bài test, chặn toàn bộ hành vi suy diễn ảnh trang chủ hoặc tự gán quyền hiển thị khi chưa xác minh.

---

## 2. Bảng Đối Soát 18 Chi Nhánh Cobalt Theo Quy Chuẩn 107

| # | Chi Nhánh Cobalt | Thương Hiệu | Quận | Đích Danh Cơ Sở | Trạng Thái Quyền | Chế Độ Hiển Thị |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | **Metiz Cinema Đà Nẵng** | Metiz Cinema | Hải Châu | `NO_DIRECT_FACILITY_PHOTO` | `UNAUTHORIZED_PENDING_RIGHTS` | **Monogram `M`** + Xem không gian tại kênh chính thức ↗ |
| 2 | **Phê La — Bạch Đằng** | Phê La | Hải Châu | `HOME_BANNER_ONLY` | `UNAUTHORIZED_PENDING_RIGHTS` | **Monogram `P`** + Xem không gian tại kênh chính thức ↗ |
| 3 | **Phê La — Nguyễn Văn Linh** | Phê La | Hải Châu | `STORE_LOCATOR_LISTING_ONLY` | `UNAUTHORIZED_PENDING_RIGHTS` | **Monogram `P`** + Xem không gian tại kênh chính thức ↗ |
| 4 | **Gong Cha — Nguyễn Văn Linh** | Gong Cha Vietnam | Hải Châu | `HOME_BANNER_ONLY` | `UNAUTHORIZED_PENDING_RIGHTS` | **Monogram `G`** + Xem không gian tại kênh chính thức ↗ |
| 5 | **Jollibee Tiểu La** | Jollibee Vietnam | Hải Châu | `STORE_LOCATOR_TEXT_ONLY` | `UNAUTHORIZED_PENDING_RIGHTS` | **Monogram `J`** + Xem không gian tại kênh chính thức ↗ |
| 6 | **Jollibee Đống Đa** | Jollibee Vietnam | Hải Châu | `STORE_LOCATOR_TEXT_ONLY` | `UNAUTHORIZED_PENDING_RIGHTS` | **Monogram `J`** + Xem không gian tại kênh chính thức ↗ |
| 7 | **Jollibee Phan Đăng Lưu** | Jollibee Vietnam | Hải Châu | `STORE_LOCATOR_TEXT_ONLY` | `UNAUTHORIZED_PENDING_RIGHTS` | **Monogram `J`** + Xem không gian tại kênh chính thức ↗ |
| 8 | **CGV Vincom Đà Nẵng** | CGV Cinemas | Sơn Trà | `STORE_LOCATOR_UNVERIFIED` | `UNAUTHORIZED_PENDING_RIGHTS` | **Monogram `C`** + Xem không gian tại kênh chính thức ↗ |
| 9 | **Jollibee Vincom Đà Nẵng** | Jollibee Vietnam | Sơn Trà | `HOME_BANNER_ONLY` | `UNAUTHORIZED_PENDING_RIGHTS` | **Monogram `J`** + Xem không gian tại kênh chính thức ↗ |
| 10 | **CGV Vĩnh Trung Plaza** | CGV Cinemas | Thanh Khê | `BLANK_OR_UNRENDERED_FRAME` | `UNAUTHORIZED_PENDING_RIGHTS` | **Monogram `C`** + Xem không gian tại kênh chính thức ↗ |
| 11 | **Galaxy Cinema Co.opmart** | Galaxy Cinema | Thanh Khê | `GENERIC_HEADER_UNVERIFIED` | `UNAUTHORIZED_PENDING_RIGHTS` | **Monogram `G`** + Xem không gian tại kênh chính thức ↗ |
| 12 | **Galaxy CineX AEON Thanh Khê** | Galaxy Cinema | Thanh Khê | `UPCOMING_BRANCH_NO_PHOTOS` | `UNAUTHORIZED_PENDING_RIGHTS` | **Monogram `G`** + Xem không gian tại kênh chính thức ↗ |
| 13 | **Jollibee Lý Thái Tổ** | Jollibee Vietnam | Thanh Khê | `STORE_LOCATOR_TEXT_ONLY` | `UNAUTHORIZED_PENDING_RIGHTS` | **Monogram `J`** + Xem không gian tại kênh chính thức ↗ |
| 14 | **Jollibee Nguyễn Đức Trung** | Jollibee Vietnam | Thanh Khê | `STORE_LOCATOR_TEXT_ONLY` | `UNAUTHORIZED_PENDING_RIGHTS` | **Monogram `J`** + Xem không gian tại kênh chính thức ↗ |
| 15 | **CGV MM Mega Market** | CGV Cinemas | Liên Chiểu | `STORE_LOCATOR_TEXT_ONLY` | `UNAUTHORIZED_PENDING_RIGHTS` | **Monogram `C`** + Xem không gian tại kênh chính thức ↗ |
| 16 | **Jollibee Phạm Như Xương** | Jollibee Vietnam | Liên Chiểu | `STORE_LOCATOR_TEXT_ONLY` | `UNAUTHORIZED_PENDING_RIGHTS` | **Monogram `J`** + Xem không gian tại kênh chính thức ↗ |
| 17 | **Jollibee Ngô Văn Sở** | Jollibee Vietnam | Liên Chiểu | `STORE_LOCATOR_TEXT_ONLY` | `UNAUTHORIZED_PENDING_RIGHTS` | **Monogram `J`** + Xem không gian tại kênh chính thức ↗ |
| 18 | **Jollibee MM Mega Market** | Jollibee Vietnam | Liên Chiểu | `STORE_LOCATOR_TEXT_ONLY` | `UNAUTHORIZED_PENDING_RIGHTS` | **Monogram `J`** + Xem không gian tại kênh chính thức ↗ |

---

## 3. Bằng Chứng Trực Quan Chụp Lại Từ Staging Instance Batch 107

| Viewport | Tệp Ảnh Bằng Chứng | Kích Thước | SHA-256 Checksum | Đặc Điểm Trực Quan |
| :--- | :--- | :--- | :--- | :--- |
| **Desktop (1440px)** | [`staging_ui_107_desktop_1440.png`](../07_QUALITY_ASSURANCE/runtime_evidence/screenshots_107/staging_ui_107_desktop_1440.png) | `1440x900` | `6ab3c6ff19ae74c98ab424c1b942cccb4ad3b85dc8d863b92428137683f816bc` | Giao diện tối giản, 0 ảnh crop/AI trôi nổi, 100% thẻ cơ sở hiển thị Monogram thương hiệu chuẩn + nút mở kênh chính thức. |
| **Tablet (768px)** | [`staging_ui_107_tablet_768.png`](../07_QUALITY_ASSURANCE/runtime_evidence/screenshots_107/staging_ui_107_tablet_768.png) | `768x1024` | `e1003c51d68545f0b886bc92b1ef228bc37937fd7b217ff88a18930f6b96219b` | Bố cục 2 cột cân đối, responsive mượt mà, typography tương phản cao. |
| **Mobile (375px)** | [`staging_ui_107_mobile_375.png`](../07_QUALITY_ASSURANCE/runtime_evidence/screenshots_107/staging_ui_107_mobile_375.png) | `375x812` | `92da7ebef754f334362168135df5248a97d43f6ac7f7fe207f287456b88d2e72` | 0 tràn ngang, touch targets chuẩn $\ge 44\text{px}$, nút bấm điều hướng kênh chính thức tiện lợi. |

---

## 4. Kết Quả Kiểm Thử Toàn Bộ Hệ Thống (15/15 QA Suites PASS 100%)

```text
✅ test_project_memory_consistency.js               (10/10 PASS)
✅ test_memory_lineage_containment_103r2.js          (7/7 PASS)
✅ test_store_photo_truth_and_rights_107.js         (10/10 PASS)
✅ test_official_store_photo_provenance_106.js      (10/10 PASS)
✅ test_visual_asset_enrichment_105.js              (10/10 PASS)
✅ test_humanized_discovery_polish_104.js           (10/10 PASS)
✅ test_split_bill_single_entry_103r1.js            (18/18 PASS)
✅ test_cobalt_canonicalization_and_ux_103.js       (20/20 PASS)
✅ test_locality_and_supply_resolution_102.js       (19/19 PASS)
✅ test_controlled_live_provenance_101.js           (18/18 PASS)
✅ test_fail_closed_collector_100.js                (5/5 PASS)
✅ test_provenance_containment_099a.js              (17/17 PASS)
✅ test_customer_journey_north_star_096.js          (12/12 PASS)
✅ test_network_airgap_and_strict_mem07_093b.js     (5/5 PASS)
✅ test_semantic_and_memory_correction_093a.js      (10/10 PASS)
----------------------------------------------------------------
TỔNG CỘNG: 181 / 181 TEST ASSERTIONS PASS (100% GREEN)
```

---

## 5. Kỷ Luật Quản Trị & Khóa An Toàn Tuyệt Đối
- **18 Chi Nhánh Nguồn**: Tiếp tục là địa điểm chính thức đã xác minh từ store locator chính hãng, kèm disclaimer trung thực (không phải ưu đãi online).
- **0 Deal / Voucher Mới**: `05_DEAL_AND_AFFILIATE/deals_feed.json`: `[]` (Honest Empty State).
- **Khóa Sản Xuất Tuyệt Đối**: `08_RELEASE_VAULT/RELEASE_MANIFEST.json`: `is_approved: false`.
- **Candidate Freeze Được Bảo Toàn**: Không phát sinh release candidate mới.
- **Phát Hành Công Khai**: Chưa được phép (`PUBLIC RELEASE: NOT AUTHORIZED`).
