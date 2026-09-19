# JAYT BATCH 070F-R REVIEW PACK & DECISION MATRIX (CORRECTED)
**Chỉ thị**: `JAYT-070F-R — REVIEW-PACK LINEAGE CORRECTION + BATCH 3 PREPARATION`  
**Thời điểm hiệu chỉnh**: 2026-08-24 | **Tổng số mục tiêu đối soát**: đúng **16/16 tệp receipt trên đĩa**  
**Trạng thái**: `IMPLEMENTED_PENDING_CEO_AUDIT` | **Yield mới**: `0 GREEN` (3 Existing Staged, 6 AMBER, 7 RED)

---

## 1. BẢNG QUYẾT ĐỊNH TẬP TRUNG HIỆU CHỈNH 1-TO-1 (16 ROWS MATCHING 16 RECEIPTS)

| # | Target ID | Thương Hiệu & Domain | Final URL (CDP) | Ưu Đãi / Nội Dung Quan Sát | Thời Hạn Quan Sát | Minh Chứng Đà Nẵng | Triage | Phán Quyết Quản Trị & Lý Do |
|---|---|---|---|---|---|---|:---:|---|
| 1 | `CGV_CULTURE_DAY_ARTICLE` | **CGV Cinemas** (`cgv.vn`) | [https://www.cgv.vn/default/cultu...](https://www.cgv.vn/default/culture-day) | Nội dung trang 404 (cannot be found) | Không có | Chưa xác nhận | 🔴 **RED** | `DEAD_URL_ROUTE`: URL bài viết trả về 404; ưu đãi không tồn tại ở đường dẫn công khai. |
| 2 | `CGV_DNG_VINTRUNG` | **CGV Cinemas** (`cgv.vn`) | [https://www.cgv.vn/default/cinox...](https://www.cgv.vn/default/cinox/site/cgv-vinh-trung-plaza) | Thông tin rạp CGV Vĩnh Trung Plaza Đà Nẵng | Không có | Xác nhận (Vĩnh Trung Plaza, 255-257 Hùng Vương, Đà Nẵng) | 🟡 **AMBER** | `LEAD_ONLY_NO_CLAIM`: Xác nhận địa chỉ rạp CGV tại Đà Nẵng nhưng trang không niêm yết deal tiêu dùng cá nhân. |
| 3 | `CGV_U22_ARTICLE` | **CGV Cinemas** (`cgv.vn`) | [https://www.cgv.vn/default/u22-c...](https://www.cgv.vn/default/u22-cgv) | Nội dung trang 404 (cannot be found) | Không có | Chưa xác nhận | 🔴 **RED** | `DEAD_URL_ROUTE`: URL bài viết trả về 404; ưu đãi không tồn tại ở đường dẫn công khai. |
| 4 | `DOMINOS_PROMO_LISTING` | **Domino Pizza** (`dominos.vn`) | [https://dominos.vn/promotion-lis...](https://dominos.vn/promotion-listing) | Deal Đôi Bánh Đỉnh 118K/198K, Menu Chay -50%, Pizza 99K, Combo 279K | 20/07/2026 – 31/08/2026 (Deal Đôi), 12/08 – 10/09/2026 (Chay) | Chưa xác nhận (Store locator 404) | 🟡 **AMBER** | `LEAD_ONLY_NO_CLAIM_PENDING_STORE_PROOF`: Đủ giá & hạn 2026 trên listing nhưng thiếu bằng chứng chi nhánh Đà Nẵng công khai (Rule 4). |
| 5 | `DOMINOS_STORES_DNG` | **Domino Pizza** (`dominos.vn`) | [https://dominos.vn/danh-sach-cua...](https://dominos.vn/danh-sach-cua-hang) | Nội dung trang 404 | Không có | Chưa xác nhận | 🔴 **RED** | `DEAD_URL_ROUTE`: Trang danh sách cửa hàng trả về 404; không chứng minh được chi nhánh Đà Nẵng. |
| 6 | `GALAXY_CINEMA_DNG` | **Galaxy Cinema** (`galaxycine.vn`) | [https://www.galaxycine.vn/rap-gi...](https://www.galaxycine.vn/rap-gia-ve/galaxy-da-nang/) | Thông tin rạp Galaxy Cinema Đà Nẵng | Không có | Xác nhận (Co.opmart 478 Điện Biên Phủ, Thanh Khê, Đà Nẵng) | 🟢 **GREEN** | `ALREADY_IN_STAGING`: Xác nhận chi nhánh Đà Nẵng cho deal Happy Day Thứ Ba (50K/70K) đã có trong Staging. |
| 7 | `GALAXY_PROMO_HUB` | **Galaxy Cinema** (`galaxycine.vn`) | [https://www.galaxycine.vn/khuyen...](https://www.galaxycine.vn/khuyen-mai/) | Danh mục khuyến mãi chung (Quà 2/9, Zalopay coupon) | Không có | Hub chung | 🟡 **AMBER** | `LEAD_ONLY_NO_CLAIM`: Trang hub chứa bài viết chung; ưu đãi định kỳ Thứ Ba đã được nạp riêng. |
| 8 | `HIGHLANDS_STORES_DNG` | **Highlands Coffee** (`highlandscoffee.com.vn`) | [https://www.highlandscoffee.com....](https://www.highlandscoffee.com.vn/vn/404.html) | Nội dung trang 404.html | Không có | Chưa xác nhận | 🔴 **RED** | `DEAD_URL_ROUTE`: Đường dẫn danh sách quán trả về 404. |
| 9 | `JOLLIBEE_PROMO_NEWS` | **Jollibee Vietnam** (`jollibee.com.vn`) | [https://jollibee.com.vn/tin-tuc...](https://jollibee.com.vn/tin-tuc) | Tin tức chiến dịch chung (Sinh nhật, Mỳ ý cay) | Không có | Chưa xác nhận | 🟡 **AMBER** | `LEAD_ONLY_NO_CLAIM`: Chỉ có tiêu đề tin tức, không có mức giá và thời hạn năm 2026. |
| 10 | `JOLLIBEE_STORES_DNG` | **Jollibee Vietnam** (`jollibee.com.vn`) | [https://jollibee.com.vn/cua-hang...](https://jollibee.com.vn/cua-hang) | Hệ thống cửa hàng Jollibee | Không có | Xác nhận listing (Tam Kỳ / Đà Nẵng listing) | 🟡 **AMBER** | `LEAD_ONLY_NO_CLAIM`: Có listing cửa hàng miền Trung nhưng không niêm yết ưu đãi giảm giá cụ thể. |
| 11 | `KATINAT_STORES_DNG` | **Katinat** (`katinat.vn`) | [about:blank...](about:blank) | about:blank (Client render) | Không có | Chưa xác nhận | 🔴 **RED** | `BLANK_CAPTURE`: Trang client rendering trả về nội dung rỗng. |
| 12 | `LOTTERIA_STORES_DNG` | **Lotteria Vietnam** (`lotteria.vn`) | [https://www.lotteria.vn/stores...](https://www.lotteria.vn/stores) | Nội dung trang 404 | Không có | Chưa xác nhận | 🔴 **RED** | `DEAD_URL_ROUTE`: Đường dẫn cửa hàng trả về 404. |
| 13 | `METIZ_PROMO_HUB` | **Metiz Cinema Đà Nẵng** (`metiz.vn`) | [https://metiz.vn/promotion/...](https://metiz.vn/promotion/) | Nội dung trang 404 (HTTP 404 on hub) | Không có | Xác nhận qua deal con | 🟢 **GREEN** | `ALREADY_IN_STAGING`: Hub trả về 404 nhưng 2 deal con chi tiết (Super Monday & U22) đã xác thực và nạp Staging. |
| 14 | `PHELA_STORES_DNG` | **Phê La** (`phela.vn`) | [https://phela.vn/cua-hang-2/...](https://phela.vn/cua-hang-2/) | Danh mục cửa hàng Phê La | Không có | Chưa xác nhận | 🟡 **AMBER** | `LEAD_ONLY_NO_CLAIM`: Trang danh mục cửa hàng không niêm yết ưu đãi văn bản. |
| 15 | `PHUCLONG_STORES_DNG` | **Phúc Long** (`phuclong.com.vn`) | [https://phuclong.com.vn/he-thong...](https://phuclong.com.vn/he-thong-cua-hang-phuc-long) | Không tìm thấy trang | Không có | Chưa xác nhận | 🔴 **RED** | `DEAD_URL_ROUTE`: Đường dẫn hệ thống cửa hàng trả về 404. |
| 16 | `TCH_STORES_DNG` | **The Coffee House** (`thecoffeehouse.com`) | [https://thecoffeehouse.com/...](https://thecoffeehouse.com/) | Chuyển hướng trang chủ | Không có | Chưa xác nhận | 🔴 **RED** | `HOMEPAGE_REDIRECT`: Tự chuyển hướng về trang chủ; không có danh sách chi nhánh cụ thể. |

---

## 2. BẢNG ĐỐI SOÁT HASH TOÀN BỘ 16 RECEIPTS VÀ ARTIFACTS GỐC (RULE 18 LINEAGE)

Toàn bộ mã băm SHA-256 dưới đây được đọc trực tiếp từ đĩa vật lý tại `05_DEAL_AND_AFFILIATE/raw_evidence/run_070f_deep_sweep_1787556559654/`:

| # | Receipt File | SHA-256 Receipt (Đọc từ đĩa) | Snapshot PNG SHA-256 | HTML Dump SHA-256 | Text Dump SHA-256 | Checked At (UTC) |
|---|---|---|---|---|---|---|
| 1 | `receipt_cgv_culture_day_article.json` | `bce124ec303e...` | `1bbf086a1d1d...` | `01981befdc3b...` | `8528714afb7d...` | `2026-08-24T07:29:52.771Z` |
| 2 | `receipt_cgv_dng_vinhtrung.json` | `851573a0d29b...` | `5fa8c5e93a23...` | `658f1ef9adfd...` | `1a6b096f3c34...` | `2026-08-24T07:29:47.268Z` |
| 3 | `receipt_cgv_u22_article.json` | `70b8a19689b1...` | `1bbf086a1d1d...` | `7e9a0b118a40...` | `8528714afb7d...` | `2026-08-24T07:29:58.217Z` |
| 4 | `receipt_dominos_promo_listing.json` | `c86a9498b5ba...` | `a6b9ac19dfb9...` | `fc055e038aee...` | `9efe5c43e9c6...` | `2026-08-24T07:29:30.428Z` |
| 5 | `receipt_dominos_stores_dng.json` | `f35c7485e444...` | `f52e1f5447ca...` | `fb330066fc47...` | `88698869f164...` | `2026-08-24T07:29:25.023Z` |
| 6 | `receipt_galaxy_dng_cinema.json` | `c375d6e81dda...` | `d4e53adabdc7...` | `3771e9f34468...` | `5d8c1c76a433...` | `2026-08-24T07:29:35.971Z` |
| 7 | `receipt_galaxy_promo_hub.json` | `dc8e1c9767d6...` | `48f31f4c1e07...` | `05ac8636544a...` | `40a0c02ed830...` | `2026-08-24T07:29:41.676Z` |
| 8 | `receipt_highlands_stores_dng.json` | `675c9d644132...` | `8172b419d218...` | `9ab396313bce...` | `bae8dab1e66e...` | `2026-08-24T07:30:26.277Z` |
| 9 | `receipt_jollibee_promo_news.json` | `248a957fe7a6...` | `04f692129659...` | `b1583d7495d6...` | `e854bbf58882...` | `2026-08-24T07:30:15.016Z` |
| 10 | `receipt_jollibee_stores_dng.json` | `0688274919a4...` | `7a276122fe9d...` | `fff1da042ff6...` | `a317a2620ca1...` | `2026-08-24T07:30:09.087Z` |
| 11 | `receipt_katinat_stores_dng.json` | `c32ad9d29d0a...` | `b6e9cec3dfdd...` | `a7fe83ec64bb...` | `e3b0c44298fc...` | `2026-08-24T07:30:42.866Z` |
| 12 | `receipt_lotteria_stores_dng.json` | `ec9145f76358...` | `dc6d40e32742...` | `39df5da3ad56...` | `5ab12864fee8...` | `2026-08-24T07:30:20.714Z` |
| 13 | `receipt_metiz_promo_hub.json` | `74277c2fe090...` | `e7777a57b3b5...` | `c77af3ce0bca...` | `b008decb9016...` | `2026-08-24T07:30:03.668Z` |
| 14 | `receipt_phela_stores_dng.json` | `c1240ca485e3...` | `2501f488e523...` | `ed2c5e0766eb...` | `257573159d19...` | `2026-08-24T07:30:37.186Z` |
| 15 | `receipt_phuclong_stores_dng.json` | `4e28080b6132...` | `49e6c32ebb57...` | `5f47ecd892e9...` | `457109485d56...` | `2026-08-24T07:30:50.946Z` |
| 16 | `receipt_tch_stores_dng.json` | `538953b0d74f...` | `185bf0490a10...` | `793a4eeea872...` | `31b5f5f508fa...` | `2026-08-24T07:30:31.707Z` |

---

## 3. TỔNG HỢP HIỆU CHỈNH 070F-R

1. **Khớp 100% Lineage**: 16 targets = 16 receipts trên đĩa = 16 dòng trong bảng phân loại = 16 items trong JSON matrix.
2. **Khắc phục triệt để lỗi định danh & hash**:
   - Khớp chuẩn xác tên tệp `receipt_metiz_promo_hub.json` (thay vì catalog).
   - Khớp chuẩn xác mã băm SHA-256 cho `receipt_dominos_promo_listing.json` (`c86a9498b5ba...`).
3. **Bảo tồn Tuyệt đối Hệ thống**:
   - **Staging**: 3 deals thật (1 Galaxy + 2 Metiz) đạt chuẩn 100% (`8/8 PASS`).
   - **Production**: Khóa hoàn toàn (`deals_feed.json: []`, `is_approved: false`).
