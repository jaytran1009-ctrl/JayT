# JAYT CORP — HỒ SƠ NGHIỆM THU: JAYT-106-OFFICIAL-STORE-PHOTO-PROVENANCE
> **Mã đợt nộp**: `JAYT-106-OFFICIAL-STORE-PHOTO-PROVENANCE`  
> **Thời điểm niêm phong**: `2026-08-25T17:55:00+07:00`  
> **Trạng thái đề xuất**: `106: STAGING INSTANCE VALIDATED — PRODUCTION LOCKED — ZERO CANDIDATES`  
> **Tài liệu bộ nhớ vận hành**: [`PROJECT_MEMORY.md`](../../PROJECT_MEMORY.md) (Phiên bản `v3.213.0`, SHA-256: `39e43e832f7979d8fa2b5c54168b87e1c1eee1f0600a23730a0ce57ddd171ecf`)

---

## 1. Tóm Tắt Thực Hiện Chỉ Thị Của CEO (Batch 106)

1. **Gỡ 100% Ảnh AI Khỏi Render Mặt Tiền**:
   - Gỡ bỏ toàn bộ ảnh AI khỏi Hero Media Zone (thay bằng dải nền radial emerald tối giản tinh tế) và gỡ showcase danh mục AI khỏi luồng giao diện chính.
   - Tuyệt đối không dùng bất kỳ ảnh AI nào để đại diện cho quán/cửa hàng thật.
2. **Thu Thập & Trích Xuất Ảnh Thật Từ Kênh Chính Thức**:
   - 6 ảnh thật từ website/store locator chính thức đã được trích xuất và đối soát với SHA-256 trong [`05_DEAL_AND_AFFILIATE/official_store_photo_manifest_106.json`](../05_DEAL_AND_AFFILIATE/official_store_photo_manifest_106.json).
3. **Quy Định Bản Quyền Chặt Chẽ — Fallback Monogram & Outbound Links**:
   - 12 chi nhánh chưa có quyền phân phối ảnh độc lập tuân thủ nghiêm ngặt quy định: hiển thị **Monogram thương hiệu** + nút **“Xem không gian tại kênh chính thức ↗”** điều hướng về store locator gốc.
   - Tuyệt đối không copy ảnh từ Google Maps, review cá nhân hay mạng xã hội.
4. **Nhãn Bản Quyền & Định Vị Minh Bạch**:
   - Gắn nhãn: `📸 Ảnh từ kênh chính thức`.
   - Bổ sung ghi chú minh bạch trên từng thẻ: `ℹ️ Ảnh & dữ liệu chỉ xác nhận không gian/địa điểm, không xác nhận giá hoặc ưu đãi.`

---

## 2. Bảng Đối Soát 18 Chi Nhánh Cobalt (Batch 106)

| # | Chi Nhánh Cobalt | Thương Hiệu | Quận | Loại Ảnh | Chế Độ Hiển Thị | Tệp Thumbnail / Nguồn Xác Minh | SHA-256 Checksum |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | **Galaxy Cinema Co.opmart** | Galaxy Cinema | Thanh Khê | `cinema` | `OFFICIAL_PHOTO_THUMBNAIL` | [`galaxy-coopmart-danang.png`](../03_SOURCE_OF_TRUTH/assets/official-store-photos/galaxy-coopmart-danang.png) | `85c2f49e7a8d24232014936a5e66d8339772f47edcfa209fc42a7ede005ad6eb` |
| 2 | **CGV Vĩnh Trung Plaza** | CGV Cinemas | Thanh Khê | `cinema` | `OFFICIAL_PHOTO_THUMBNAIL` | [`cgv-vinhtrung-danang.png`](../03_SOURCE_OF_TRUTH/assets/official-store-photos/cgv-vinhtrung-danang.png) | `6e2a1bd0f3d2fc71c83a07cc684373fa4fee25965f0d58f0e74a3623059af6c9` |
| 3 | **Phê La Bạch Đằng** | Phê La | Hải Châu | `storefront` | `OFFICIAL_PHOTO_THUMBNAIL` | [`phela-bachdang-danang.png`](../03_SOURCE_OF_TRUTH/assets/official-store-photos/phela-bachdang-danang.png) | `b404670bec70c303c23eba620ff7ceae46641e8143ab8bf7a0b3e612c4d50e23` |
| 4 | **Gong Cha Nguyễn Văn Linh** | Gong Cha Vietnam | Hải Châu | `storefront` | `OFFICIAL_PHOTO_THUMBNAIL` | [`gongcha-nvl-danang.png`](../03_SOURCE_OF_TRUTH/assets/official-store-photos/gongcha-nvl-danang.png) | `fc813e42b7570fc5c25bb58be7073f76b16be322f902f81e2e266ee0ccb9faa7` |
| 5 | **Jollibee Vincom Đà Nẵng** | Jollibee Vietnam | Sơn Trà | `storefront` | `OFFICIAL_PHOTO_THUMBNAIL` | [`jollibee-vincom-danang.png`](../03_SOURCE_OF_TRUTH/assets/official-store-photos/jollibee-vincom-danang.png) | `63cf5b1fedc956db16a2a259810ff1d987bbf24cbaa50bd16fe0eb3a4bc99efc` |
| 6 | **Metiz Cinema Đà Nẵng** | Metiz Cinema | Hải Châu | `cinema` | `OFFICIAL_PHOTO_THUMBNAIL` | [`metiz-helio-danang.png`](../03_SOURCE_OF_TRUTH/assets/official-store-photos/metiz-helio-danang.png) | `89116d6ab0cee6a8943778eb0bcfd342c30288f9af04f39b71498df52b12ef4e` |
| 7 | Phê La Nguyễn Văn Linh | Phê La | Hải Châu | `storefront` | `FALLBACK_MONOGRAM` | Monogram `P` + Link kênh chính thức | — |
| 8 | Jollibee Tiểu La | Jollibee Vietnam | Hải Châu | `storefront` | `FALLBACK_MONOGRAM` | Monogram `J` + Link kênh chính thức | — |
| 9 | Jollibee Đống Đa | Jollibee Vietnam | Hải Châu | `storefront` | `FALLBACK_MONOGRAM` | Monogram `J` + Link kênh chính thức | — |
| 10 | Jollibee Phan Đăng Lưu | Jollibee Vietnam | Hải Châu | `storefront` | `FALLBACK_MONOGRAM` | Monogram `J` + Link kênh chính thức | — |
| 11 | CGV Vincom Đà Nẵng | CGV Cinemas | Sơn Trà | `cinema` | `FALLBACK_MONOGRAM` | Monogram `C` + Link kênh chính thức | — |
| 12 | Galaxy CineX AEON Thanh Khê | Galaxy Cinema | Thanh Khê | `cinema` | `FALLBACK_MONOGRAM` | Monogram `G` + Link kênh chính thức | — |
| 13 | Jollibee Lý Thái Tổ | Jollibee Vietnam | Thanh Khê | `storefront` | `FALLBACK_MONOGRAM` | Monogram `J` + Link kênh chính thức | — |
| 14 | Jollibee Nguyễn Đức Trung | Jollibee Vietnam | Thanh Khê | `storefront` | `FALLBACK_MONOGRAM` | Monogram `J` + Link kênh chính thức | — |
| 15 | CGV MM Mega Market | CGV Cinemas | Liên Chiểu | `cinema` | `FALLBACK_MONOGRAM` | Monogram `C` + Link kênh chính thức | — |
| 16 | Jollibee Phạm Như Xương | Jollibee Vietnam | Liên Chiểu | `storefront` | `FALLBACK_MONOGRAM` | Monogram `J` + Link kênh chính thức | — |
| 17 | Jollibee Ngô Văn Sở | Jollibee Vietnam | Liên Chiểu | `storefront` | `FALLBACK_MONOGRAM` | Monogram `J` + Link kênh chính thức | — |
| 18 | Jollibee MM Mega Market | Jollibee Vietnam | Liên Chiểu | `storefront` | `FALLBACK_MONOGRAM` | Monogram `J` + Link kênh chính thức | — |

---

## 3. Bằng Chứng Trực Quan Chụp Lại Từ Staging Instance Batch 106

| Viewport | Tệp Ảnh Bằng Chứng | Kích Thước | SHA-256 Checksum | Đặc Điểm Trực Quan |
| :--- | :--- | :--- | :--- | :--- |
| **Desktop (1440px)** | [`staging_ui_106_desktop_1440.png`](../07_QUALITY_ASSURANCE/runtime_evidence/screenshots_106/staging_ui_106_desktop_1440.png) | `1440x900` | `ae44d1b3c648b45f355f749b572362135432da030c3a7220d18cb6879a979a67` | Hero Media Zone tối giản, thẻ địa điểm hiển thị thumbnail 16:9 sắc nét từ kênh chính thức, nhãn bản quyền rõ ràng. |
| **Tablet (768px)** | [`staging_ui_106_tablet_768.png`](../07_QUALITY_ASSURANCE/runtime_evidence/screenshots_106/staging_ui_106_tablet_768.png) | `768x1024` | `c4779849f653fcb7a52d4861726a50709ea2052740adfbfe86d0b0b413dc275c` | Bố cục 2 cột cân đối, responsive mượt mà, fallback monogram rõ nét. |
| **Mobile (375px)** | [`staging_ui_106_mobile_375.png`](../07_QUALITY_ASSURANCE/runtime_evidence/screenshots_106/staging_ui_106_mobile_375.png) | `375x812` | `c1ea278bae6750a6a9e4cdd1097a0f90b9f1225764cd5e3a5dfcdd80a217b174` | 0 tràn ngang, touch targets chuẩn $\ge 44\text{px}$, nút bấm điều hướng kênh chính thức tiện lợi. |

---

## 4. Kết Quả Kiểm Thử Toàn Bộ Hệ Thống (14/14 QA Suites PASS 100%)

```text
✅ test_project_memory_consistency.js               (10/10 PASS)
✅ test_memory_lineage_containment_103r2.js          (7/7 PASS)
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
TỔNG CỘNG: 171 / 171 TEST ASSERTIONS PASS (100% GREEN)
```

---

## 5. Kỷ Luật Quản Trị & Khóa An Toàn Tuyệt Đối
- **18 Chi Nhánh Nguồn**: Tiếp tục là địa điểm chính thức đã xác minh từ store locator chính hãng, kèm disclaimer trung thực (không phải ưu đãi online).
- **0 Deal / Voucher Mới**: `05_DEAL_AND_AFFILIATE/deals_feed.json`: `[]` (Honest Empty State).
- **Khóa Sản Xuất Tuyệt Đối**: `08_RELEASE_VAULT/RELEASE_MANIFEST.json`: `is_approved: false`.
- **Candidate Freeze Được Bảo Toàn**: Không phát sinh release candidate mới.
- **Phát Hành Công Khai**: Chưa được phép (`PUBLIC RELEASE: NOT AUTHORIZED`).
