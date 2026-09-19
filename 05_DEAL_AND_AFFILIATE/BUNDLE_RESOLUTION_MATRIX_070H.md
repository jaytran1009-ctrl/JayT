# JAYT RELATIONAL EVIDENCE BUNDLE RESOLUTION MATRIX (070H)
**Chỉ thị**: `JAYT-070H — RELATIONAL EVIDENCE BUNDLE RESOLUTION BATCH`  
**Thời điểm lập**: 2026-08-24T07:47:05.734Z | **Run ID**: `run_070h_bundle_resolution_1787557548815`  
**Tổng số Seed xử lý**: đúng **8 PROMO_SOURCE seeds** | **Tổng URLs swept**: **14 endpoints**  
**Quy tắc**: `RELATIONAL_EVALUATION_ONLY` (0 candidate, 0 staging, 0 CEO receipt)

---

## 1. MA TRẬN ĐỐI SOÁT 5 MẢNH CHỨNG CỨ QUAN HỆ (RELATIONAL EVIDENCE RESOLUTION)

| # | Seed ID & Deal Title | Pricing Piece | Terms Piece | Validity Piece (2026) | Da Nang Locality Piece | Promo Receipt SHA | Locality Receipt SHA | Trạng Thái Bundle & Lý Do |
|---|---|---|---|---|---|---|---|---|
| 1 | `SEED_01_DOMINOS`<br>**Domino’s Pizza — Deal Đôi Bánh Đỉnh / Menu Chay -50%** | `VERIFIED: giảm 70%` | `VERIFIED: Áp dụng` | `VERIFIED: 20/07/2026` | `MISSING` | `ccf895ea...` | `3c5a5289...` | 🟡 **INCOMPLETE**<br>Thiếu bằng chứng địa bàn Đà Nẵng từ nguồn locality chính thức (Locality status: DEAD_ROUTE). |
| 2 | `SEED_02_GALAXY_HAPPY_DAY`<br>**Galaxy Cinema Đà Nẵng — Happy Day Thứ Ba (50K/70K)** | `MISSING` | `VERIFIED: U22` | `MISSING` | `VERIFIED: Co.opmart Đà Nẵng` | `6b1a86cf...` | `1b76fb0c...` | 🟡 **INCOMPLETE**<br>Thiếu văn bản mức giá hoặc thời hạn 2026 tường minh (Pricing: NONE, Validity: NONE). |
| 3 | `SEED_03_GALAXY_MEMBER_DAY`<br>**Galaxy Cinema Đà Nẵng — Ngày Hội Thành Viên** | `MISSING` | `VERIFIED: U22` | `MISSING` | `VERIFIED: Co.opmart Đà Nẵng` | `c6a12857...` | `1b76fb0c...` | 🟡 **INCOMPLETE**<br>Thiếu văn bản mức giá hoặc thời hạn 2026 tường minh (Pricing: NONE, Validity: NONE). |
| 4 | `SEED_04_GONGCHA`<br>**Gong Cha Vietnam — Khuyến Mãi** | `MISSING` | `VERIFIED: THÀNH VIÊN` | `VERIFIED: 2026` | `VERIFIED: Hải Châu` | `9a654eb3...` | `581ea3fb...` | 🟡 **INCOMPLETE**<br>Thiếu văn bản mức giá hoặc thời hạn 2026 tường minh (Pricing: NONE, Validity: 2026). |
| 5 | `SEED_05_LOTTE_CINEMA`<br>**Lotte Cinema Đà Nẵng — Sự Kiện & Khuyến Mãi** | `MISSING` | `VERIFIED: thành viên` | `VERIFIED: 16/08/2026` | `MISSING` | `84261132...` | `86def933...` | 🟡 **INCOMPLETE**<br>Thiếu bằng chứng địa bàn Đà Nẵng từ nguồn locality chính thức (Locality status: NO_VERIFIED_DANANG_LOCALITY). |
| 6 | `SEED_06_METIZ_SUPER_MONDAY`<br>**Metiz Cinema Đà Nẵng — Super Monday 55K** | `MISSING` | `VERIFIED: Thành Viên` | `MISSING` | `MISSING` | `b9d86717...` | `cb820ab2...` | 🟡 **INCOMPLETE**<br>Thiếu bằng chứng địa bàn Đà Nẵng từ nguồn locality chính thức (Locality status: NO_VERIFIED_DANANG_LOCALITY). |
| 7 | `SEED_07_METIZ_U22`<br>**Metiz Cinema Đà Nẵng — U22 Vui Vẻ 55K** | `MISSING` | `VERIFIED: Thành Viên` | `MISSING` | `MISSING` | `ae9892ea...` | `cb820ab2...` | 🟡 **INCOMPLETE**<br>Thiếu bằng chứng địa bàn Đà Nẵng từ nguồn locality chính thức (Locality status: NO_VERIFIED_DANANG_LOCALITY). |
| 8 | `SEED_08_PHUCLONG`<br>**Phúc Long — Tin Khuyến Mãi** | `MISSING` | `VERIFIED: điều kiện` | `VERIFIED: 2026` | `MISSING` | `fb1a76e0...` | `c2321073...` | 🟡 **INCOMPLETE**<br>Thiếu bằng chứng địa bàn Đà Nẵng từ nguồn locality chính thức (Locality status: DEAD_ROUTE). |

---

## 2. THỐNG KÊ KẾT QUẢ GHÉP NỐI BUNDLE 070H

| Trạng Thái Bundle | Số Lượng Seed | Phân Loại Xử Lý Tiếp Theo |
|---|:---:|---|
| 🟢 **COMPLETE** (Đủ 5 mảnh chứng cứ) | **0** | Đủ điều kiện chuyển sang Batch 4 để tạo candidate intake chuẩn hóa |
| 🟡 **INCOMPLETE** (Thiếu ≥1 mảnh chứng cứ) | **8** | `LEAD_ONLY_NO_CLAIM` — Không được tạo candidate |
| 🔴 **BLOCKED** (Lỗi route / 404) | **0** | `FAIL_CLOSED_BLOCKED` — Đóng rào chắn |

---

## 3. BẢNG ĐỐI SOÁT MÃ BĂM ARTIFACTS GỐC CỦA ĐỢT QUÉT 070H (RULE 18 LINEAGE)

Tất cả mã băm đọc trực tiếp từ đĩa tại `05_DEAL_AND_AFFILIATE/raw_evidence/run_070h_bundle_resolution_1787557548815/`:

| Target ID | Requested URL | Final URL | Checked At (UTC) | Receipt SHA-256 | Text Dump SHA-256 |
|---|---|---|---|---|---|
| `070H_DOMINOS_PROMO_LEAF` | [https://dominos.vn/promotion-lis...](https://dominos.vn/promotion-listing) | [https://dominos.vn/promotion-lis...](https://dominos.vn/promotion-listing) | `2026-08-24T07:45:54.170Z` | `ccf895eaf107...` | `9efe5c43e9c6...` |
| `070H_DOMINOS_STORE_LOCATOR` | [https://dominos.vn/danh-sach-cua...](https://dominos.vn/danh-sach-cua-hang) | [https://dominos.vn/danh-sach-cua...](https://dominos.vn/danh-sach-cua-hang) | `2026-08-24T07:45:59.707Z` | `3c5a52898046...` | `88698869f164...` |
| `070H_GALAXY_HAPPY_DAY_LEAF` | [https://www.galaxycine.vn/khuyen...](https://www.galaxycine.vn/khuyen-mai/happy-day/) | [https://www.galaxycine.vn/khuyen...](https://www.galaxycine.vn/khuyen-mai/happy-day/) | `2026-08-24T07:46:05.092Z` | `6b1a86cf8a8c...` | `b990b9bfe7c8...` |
| `070H_GALAXY_DNG_CINEMA` | [https://www.galaxycine.vn/rap-gi...](https://www.galaxycine.vn/rap-gia-ve/galaxy-da-nang/) | [https://www.galaxycine.vn/rap-gi...](https://www.galaxycine.vn/rap-gia-ve/galaxy-da-nang/) | `2026-08-24T07:46:10.597Z` | `1b76fb0c66de...` | `07b822f0ba34...` |
| `070H_GALAXY_MEMBER_DAY_LEAF` | [https://www.galaxycine.vn/khuyen...](https://www.galaxycine.vn/khuyen-mai/ngay-thanh-vien/) | [https://www.galaxycine.vn/khuyen...](https://www.galaxycine.vn/khuyen-mai/ngay-thanh-vien/) | `2026-08-24T07:46:16.144Z` | `c6a1285730f2...` | `b990b9bfe7c8...` |
| `070H_GONGCHA_PROMO_HUB` | [https://gongcha.com.vn/tin-tuc-k...](https://gongcha.com.vn/tin-tuc-khuyen-mai/) | [https://gongcha.com.vn/tin-tuc-k...](https://gongcha.com.vn/tin-tuc-khuyen-mai/) | `2026-08-24T07:46:21.620Z` | `9a654eb36d0c...` | `b87abaea7e88...` |
| `070H_GONGCHA_STORES` | [https://gongcha.com.vn/cua-hang/...](https://gongcha.com.vn/cua-hang/) | [https://gongcha.com.vn/cua-hang/...](https://gongcha.com.vn/cua-hang/) | `2026-08-24T07:46:27.017Z` | `581ea3fb9345...` | `7e741437a947...` |
| `070H_LOTTE_EVENTS_HUB` | [https://www.lottecinemavn.com/LC...](https://www.lottecinemavn.com/LCHS/Contents/Event/Event-List.aspx) | [https://www.lottecinemavn.com/LC...](https://www.lottecinemavn.com/LCHS/Contents/Event/Event-List.aspx) | `2026-08-24T07:46:32.495Z` | `842611327e6a...` | `61d0380f0614...` |
| `070H_LOTTE_CINEMA_DNG` | [https://www.lottecinemavn.com/LC...](https://www.lottecinemavn.com/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=5&cinemaID=8001) | [https://www.lottecinemavn.com/LC...](https://www.lottecinemavn.com/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=5&cinemaID=8001) | `2026-08-24T07:46:38.044Z` | `86def933e287...` | `fa2f6acefd18...` |
| `070H_METIZ_SUPER_MONDAY_LEAF` | [https://metiz.vn/promotion/super...](https://metiz.vn/promotion/super-monday-thu-hai-sieu-hang-2.html) | [https://metiz.vn/promotion/super...](https://metiz.vn/promotion/super-monday-thu-hai-sieu-hang-2.html) | `2026-08-24T07:46:43.501Z` | `b9d86717e6c4...` | `a7a568b0ad7d...` |
| `070H_METIZ_HOME_LOCALITY` | [https://metiz.vn/...](https://metiz.vn/) | [https://metiz.vn/...](https://metiz.vn/) | `2026-08-24T07:46:49.009Z` | `cb820ab27544...` | `f50a22b9aea8...` |
| `070H_METIZ_U22_LEAF` | [https://metiz.vn/promotion/u22-v...](https://metiz.vn/promotion/u22-vui-ve-bap-nuoc-sieu-re-2.html) | [https://metiz.vn/promotion/u22-v...](https://metiz.vn/promotion/u22-vui-ve-bap-nuoc-sieu-re-2.html) | `2026-08-24T07:46:54.587Z` | `ae9892ea0af2...` | `a7a568b0ad7d...` |
| `070H_PHUCLONG_PROMO_HUB` | [https://phuclong.com.vn/khuyen-m...](https://phuclong.com.vn/khuyen-mai) | [https://phuclong.com.vn/khuyen-m...](https://phuclong.com.vn/khuyen-mai) | `2026-08-24T07:47:00.104Z` | `fb1a76e05421...` | `71262b1a234e...` |
| `070H_PHUCLONG_STORES` | [https://phuclong.com.vn/he-thong...](https://phuclong.com.vn/he-thong-cua-hang-phuc-long) | [https://phuclong.com.vn/he-thong...](https://phuclong.com.vn/he-thong-cua-hang-phuc-long) | `2026-08-24T07:47:05.677Z` | `c23210733ca5...` | `457109485d56...` |

---

## 4. BẢO TOÀN BẤT BIẾN HỆ THỐNG

- **0 tạo candidate, 0 staging, 0 CEO decision receipt** trong đợt ghép chứng cứ 070H.
- **Staging**: Duy trì đúng **3 deal sạch** (1 Galaxy + 2 Metiz) đạt chuẩn 100% (`8/8 PASS` & `6/6 PASS`).
- **Production**: Khóa hoàn toàn (`deals_feed.json: []`, `is_approved: false`).
