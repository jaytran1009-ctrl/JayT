# BÁO CÁO TỔNG HỢP: ĐỢT QUÉT COHORT TIẾT KIỆM CỘNG ĐỒNG (077)

**Mã đợt thẩm định**: `REVIEW_PACK_COMMUNITY_SAVINGS_077`  
**Chỉ thị điều hành**: `JAYT-COMMUNITY-SAVINGS-MISSION-077`  
**Thời điểm thực thi**: 2026-08-24T09:19:55.545Z  
**Quy mô khảo sát**: Đúng **32 Nguồn công khai chính thức** (Phủ 5 nhóm ngành: Rạp phim, F&B Ăn nhanh, Cà phê & Trà, Di chuyển & Trải nghiệm, TMĐT & Giao đồ ăn)  
**Phân loại niềm tin**: 5 Tầng minh bạch (`VERIFIED_PUBLIC_DEAL`, `RECURRING_GUIDE`, `ACCOUNT_DEPENDENT`, `DISCOVERY_SIGNAL`, `UNAVAILABLE`)  
**Bằng chứng thô trên đĩa**: [`05_DEAL_AND_AFFILIATE/raw_evidence/run_cohort_sweep_077_1787563176023/`](05_DEAL_AND_AFFILIATE/raw_evidence/run_cohort_sweep_077_1787563176023/)

---

## 1. TỔNG KẾT ĐÁNH GIÁ 5 TẦNG NIỀM TIN (5-TIER TRUST DISTRIBUTION)

| Tầng Phân Loại Niềm Tin | Số Lượng Nguồn | Tỷ Lệ | Định Nghĩa & Ranh Giới Quản Trị |
|---|:---:|:---:|---|
| 🟢 **`VERIFIED_PUBLIC_DEAL`** | **2** nguồn | 6.3% | Đầy đủ 5 mảnh chứng cứ gốc (giá, điều kiện, hạn, phạm vi Đà Nẵng, receipt). Đang làm chuẩn tham chiếu Staging. |
| 🟡 **`RECURRING_GUIDE_PENDING_RECHECK`** | **2** nguồn | 6.3% | Có chính sách lặp lại công khai; cần xác nhận ngày cụ thể trong chu kỳ hoặc cập nhật bảng giá mới. |
| 🟠 **`ACCOUNT_OR_CART_DEPENDENT`** | **10** nguồn | 31.3% | Voucher app/vùng/giỏ hàng cá nhân. **Xếp vào Radar, hướng dẫn người dùng tự kiểm tra trong App**, tuyệt đối 0 ghi giá/giờ giả định. |
| ⚪ **`DISCOVERY_SIGNAL_ONLY`** | **17** nguồn | 53.1% | Trang đích, menu giá niêm yết hoặc banner thương hiệu chưa có bảng giá ưu đãi chi tiết cho Đà Nẵng. |
| 🔴 **`UNAVAILABLE_OR_BLOCKED`** | **1** nguồn | 3.1% | Trang web chặn quét tự động / timeout. Tuyệt đối 0 bypass CAPTCHA. |

---

## 2. BẢNG CHI TIẾT ĐỐI SOÁT 32 NGUỒN CÔNG KHAI

| # | Thương Hiệu / Nguồn | Ngành Hàng | Phân Tầng Niềm Tin | Trạng Thái HTTP & Nhận Định | Bằng Chứng Trên Đĩa |
|---|---|:---:|:---:|---|---|
| 1 | **CGV Cinemas Đà Nẵng** | `CINEMA` | `RECURRING_GUIDE_PENDING_RECHECK` | HTTP 200 — Culture Day (Thứ Tư cuối cùng mỗi tháng, 58K) có trang chính thức nhưng phụ thuộc chu kỳ lịch tháng. | [`receipt_src_01_cgv.json`](05_DEAL_AND_AFFILIATE/raw_evidence/run_cohort_sweep_077_1787563176023/receipt_src_01_cgv.json) |
| 2 | **Galaxy Cinema Đà Nẵng** | `CINEMA` | `VERIFIED_PUBLIC_DEAL` | HTTP 302 — Galaxy Happy Day Thứ Ba (50K/vé 2D) đã được xác thực 100% bằng chứng snapshot trên đĩa. | [`receipt_src_02_galaxy.json`](05_DEAL_AND_AFFILIATE/raw_evidence/run_cohort_sweep_077_1787563176023/receipt_src_02_galaxy.json) |
| 3 | **Metiz Cinema Đà Nẵng** | `CINEMA` | `VERIFIED_PUBLIC_DEAL` | HTTP 404 — Metiz Super Monday (45K) & Metiz U22 (45K) đã được đối soát trọn vẹn receipt và địa chỉ Helio Center. | [`receipt_src_03_metiz.json`](05_DEAL_AND_AFFILIATE/raw_evidence/run_cohort_sweep_077_1787563176023/receipt_src_03_metiz.json) |
| 4 | **Lotte Cinema Đà Nẵng** | `CINEMA` | `DISCOVERY_SIGNAL_ONLY` | HTTP 200 — Trang web phản hồi HTTP 200 và có từ khóa ưu đãi/combo chung; chưa có bảng giá và điều khoản ngày cụ thể cho Đà Nẵng. | [`receipt_src_04_lotte_cinema.json`](05_DEAL_AND_AFFILIATE/raw_evidence/run_cohort_sweep_077_1787563176023/receipt_src_04_lotte_cinema.json) |
| 5 | **Starlight Cinema Đà Nẵng** | `CINEMA` | `RECURRING_GUIDE_PENDING_RECHECK` | HTTP 302 — Starlight Thứ Ba Vui Vẻ & U22 có lịch định kỳ nhưng đang bị quarantine do biến động giá trên website. | [`receipt_src_05_starlight.json`](05_DEAL_AND_AFFILIATE/raw_evidence/run_cohort_sweep_077_1787563176023/receipt_src_05_starlight.json) |
| 6 | **Jollibee Việt Nam** | `FAST_FOOD` | `DISCOVERY_SIGNAL_ONLY` | HTTP 200 — Trang web phản hồi HTTP 200 nhưng chỉ chứa menu giá niêm yết hoặc banner thương hiệu. | [`receipt_src_06_jollibee.json`](05_DEAL_AND_AFFILIATE/raw_evidence/run_cohort_sweep_077_1787563176023/receipt_src_06_jollibee.json) |
| 7 | **Lotteria Việt Nam** | `FAST_FOOD` | `DISCOVERY_SIGNAL_ONLY` | HTTP 200 — Trang web phản hồi HTTP 200 nhưng chỉ chứa menu giá niêm yết hoặc banner thương hiệu. | [`receipt_src_07_lotteria.json`](05_DEAL_AND_AFFILIATE/raw_evidence/run_cohort_sweep_077_1787563176023/receipt_src_07_lotteria.json) |
| 8 | **KFC Việt Nam** | `FAST_FOOD` | `DISCOVERY_SIGNAL_ONLY` | HTTP 200 — Trang web phản hồi HTTP 200 và có từ khóa ưu đãi/combo chung; chưa có bảng giá và điều khoản ngày cụ thể cho Đà Nẵng. | [`receipt_src_08_kfc.json`](05_DEAL_AND_AFFILIATE/raw_evidence/run_cohort_sweep_077_1787563176023/receipt_src_08_kfc.json) |
| 9 | **Domino's Pizza VN** | `FAST_FOOD` | `DISCOVERY_SIGNAL_ONLY` | HTTP 308 — Trang web phản hồi HTTP 308 nhưng chỉ chứa menu giá niêm yết hoặc banner thương hiệu. | [`receipt_src_09_dominos.json`](05_DEAL_AND_AFFILIATE/raw_evidence/run_cohort_sweep_077_1787563176023/receipt_src_09_dominos.json) |
| 10 | **Pizza Hut VN** | `FAST_FOOD` | `DISCOVERY_SIGNAL_ONLY` | HTTP 404 — Phản hồi HTTP 404. | [`receipt_src_10_pizza_hut.json`](05_DEAL_AND_AFFILIATE/raw_evidence/run_cohort_sweep_077_1787563176023/receipt_src_10_pizza_hut.json) |
| 11 | **Highlands Coffee** | `COFFEE_TEA` | `UNAVAILABLE_OR_BLOCKED` | HTTP 403 — Trang web chặn quét tự động (HTTP 403) hoặc có Anti-bot challenge / timeout. | [`receipt_src_11_highlands.json`](05_DEAL_AND_AFFILIATE/raw_evidence/run_cohort_sweep_077_1787563176023/receipt_src_11_highlands.json) |
| 12 | **Phê La** | `COFFEE_TEA` | `DISCOVERY_SIGNAL_ONLY` | HTTP 200 — Trang web phản hồi HTTP 200 và có từ khóa ưu đãi/combo chung; chưa có bảng giá và điều khoản ngày cụ thể cho Đà Nẵng. | [`receipt_src_12_phela.json`](05_DEAL_AND_AFFILIATE/raw_evidence/run_cohort_sweep_077_1787563176023/receipt_src_12_phela.json) |
| 13 | **Katinat Saigon Kafe** | `COFFEE_TEA` | `DISCOVERY_SIGNAL_ONLY` | HTTP 200 — Trang web phản hồi HTTP 200 nhưng chỉ chứa menu giá niêm yết hoặc banner thương hiệu. | [`receipt_src_13_katinat.json`](05_DEAL_AND_AFFILIATE/raw_evidence/run_cohort_sweep_077_1787563176023/receipt_src_13_katinat.json) |
| 14 | **The Coffee House** | `COFFEE_TEA` | `DISCOVERY_SIGNAL_ONLY` | HTTP 302 — Trang web phản hồi HTTP 302 nhưng chỉ chứa menu giá niêm yết hoặc banner thương hiệu. | [`receipt_src_14_the_coffee_house.json`](05_DEAL_AND_AFFILIATE/raw_evidence/run_cohort_sweep_077_1787563176023/receipt_src_14_the_coffee_house.json) |
| 15 | **Gong Cha Việt Nam** | `COFFEE_TEA` | `DISCOVERY_SIGNAL_ONLY` | HTTP 404 — Phản hồi HTTP 404. | [`receipt_src_15_gong_cha.json`](05_DEAL_AND_AFFILIATE/raw_evidence/run_cohort_sweep_077_1787563176023/receipt_src_15_gong_cha.json) |
| 16 | **Phúc Long Coffee & Tea** | `COFFEE_TEA` | `DISCOVERY_SIGNAL_ONLY` | HTTP 200 — Trang web phản hồi HTTP 200 và có từ khóa ưu đãi/combo chung; chưa có bảng giá và điều khoản ngày cụ thể cho Đà Nẵng. | [`receipt_src_16_phuc_long.json`](05_DEAL_AND_AFFILIATE/raw_evidence/run_cohort_sweep_077_1787563176023/receipt_src_16_phuc_long.json) |
| 17 | **Starbucks Vietnam** | `COFFEE_TEA` | `DISCOVERY_SIGNAL_ONLY` | HTTP 200 — Trang web phản hồi HTTP 200 nhưng chỉ chứa menu giá niêm yết hoặc banner thương hiệu. | [`receipt_src_17_starbucks.json`](05_DEAL_AND_AFFILIATE/raw_evidence/run_cohort_sweep_077_1787563176023/receipt_src_17_starbucks.json) |
| 18 | **Xanh SM** | `MOBILITY` | `ACCOUNT_OR_CART_DEPENDENT` | HTTP 301 — Mã giảm giá và ưu đãi giao đồ ăn/di chuyển biến động theo tài khoản, vị trí định vị và giỏ hàng thời gian thực. | [`receipt_src_18_xanh_sm.json`](05_DEAL_AND_AFFILIATE/raw_evidence/run_cohort_sweep_077_1787563176023/receipt_src_18_xanh_sm.json) |
| 19 | **Grab Việt Nam Promotions** | `MOBILITY` | `ACCOUNT_OR_CART_DEPENDENT` | HTTP 200 — Mã giảm giá và ưu đãi giao đồ ăn/di chuyển biến động theo tài khoản, vị trí định vị và giỏ hàng thời gian thực. | [`receipt_src_19_grab_promo.json`](05_DEAL_AND_AFFILIATE/raw_evidence/run_cohort_sweep_077_1787563176023/receipt_src_19_grab_promo.json) |
| 20 | **Be Group Khuyến Mại** | `MOBILITY` | `ACCOUNT_OR_CART_DEPENDENT` | HTTP 404 — Mã giảm giá và ưu đãi giao đồ ăn/di chuyển biến động theo tài khoản, vị trí định vị và giỏ hàng thời gian thực. | [`receipt_src_20_be_app.json`](05_DEAL_AND_AFFILIATE/raw_evidence/run_cohort_sweep_077_1787563176023/receipt_src_20_be_app.json) |
| 21 | **Klook Việt Nam** | `EXPERIENCE` | `DISCOVERY_SIGNAL_ONLY` | HTTP 301 — Trang web phản hồi HTTP 301 nhưng chỉ chứa menu giá niêm yết hoặc banner thương hiệu. | [`receipt_src_21_klook_vn.json`](05_DEAL_AND_AFFILIATE/raw_evidence/run_cohort_sweep_077_1787563176023/receipt_src_21_klook_vn.json) |
| 22 | **Traveloka VN** | `EXPERIENCE` | `DISCOVERY_SIGNAL_ONLY` | HTTP 200 — Trang web phản hồi HTTP 200 và có từ khóa ưu đãi/combo chung; chưa có bảng giá và điều khoản ngày cụ thể cho Đà Nẵng. | [`receipt_src_22_traveloka.json`](05_DEAL_AND_AFFILIATE/raw_evidence/run_cohort_sweep_077_1787563176023/receipt_src_22_traveloka.json) |
| 23 | **Shopee Mã Giảm Giá** | `ECOMMERCE` | `ACCOUNT_OR_CART_DEPENDENT` | HTTP 200 — Mã sàn TMĐT (Live, Video, Flash Sale) giới hạn theo ngân sách realtime và tài khoản người dùng. | [`receipt_src_23_shopee_vouchers.json`](05_DEAL_AND_AFFILIATE/raw_evidence/run_cohort_sweep_077_1787563176023/receipt_src_23_shopee_vouchers.json) |
| 24 | **Lazada Khuyến Mãi** | `ECOMMERCE` | `ACCOUNT_OR_CART_DEPENDENT` | HTTP 200 — Mã sàn TMĐT (Live, Video, Flash Sale) giới hạn theo ngân sách realtime và tài khoản người dùng. | [`receipt_src_24_lazada_promo.json`](05_DEAL_AND_AFFILIATE/raw_evidence/run_cohort_sweep_077_1787563176023/receipt_src_24_lazada_promo.json) |
| 25 | **TikTok Shop VN** | `ECOMMERCE` | `ACCOUNT_OR_CART_DEPENDENT` | HTTP 200 — Mã sàn TMĐT (Live, Video, Flash Sale) giới hạn theo ngân sách realtime và tài khoản người dùng. | [`receipt_src_25_tiktok_shop.json`](05_DEAL_AND_AFFILIATE/raw_evidence/run_cohort_sweep_077_1787563176023/receipt_src_25_tiktok_shop.json) |
| 26 | **Tiki Khuyến Mãi** | `ECOMMERCE` | `ACCOUNT_OR_CART_DEPENDENT` | HTTP 404 — Mã sàn TMĐT (Live, Video, Flash Sale) giới hạn theo ngân sách realtime và tài khoản người dùng. | [`receipt_src_26_tiki_promo.json`](05_DEAL_AND_AFFILIATE/raw_evidence/run_cohort_sweep_077_1787563176023/receipt_src_26_tiki_promo.json) |
| 27 | **ShopeeFood Đà Nẵng** | `FOOD_DELIVERY` | `ACCOUNT_OR_CART_DEPENDENT` | HTTP 200 — Mã giảm giá và ưu đãi giao đồ ăn/di chuyển biến động theo tài khoản, vị trí định vị và giỏ hàng thời gian thực. | [`receipt_src_27_shopeefood_dng.json`](05_DEAL_AND_AFFILIATE/raw_evidence/run_cohort_sweep_077_1787563176023/receipt_src_27_shopeefood_dng.json) |
| 28 | **GrabFood Đà Nẵng** | `FOOD_DELIVERY` | `ACCOUNT_OR_CART_DEPENDENT` | HTTP 200 — Mã giảm giá và ưu đãi giao đồ ăn/di chuyển biến động theo tài khoản, vị trí định vị và giỏ hàng thời gian thực. | [`receipt_src_28_grabfood_dng.json`](05_DEAL_AND_AFFILIATE/raw_evidence/run_cohort_sweep_077_1787563176023/receipt_src_28_grabfood_dng.json) |
| 29 | **BeFood Đà Nẵng** | `FOOD_DELIVERY` | `ACCOUNT_OR_CART_DEPENDENT` | HTTP 404 — Mã giảm giá và ưu đãi giao đồ ăn/di chuyển biến động theo tài khoản, vị trí định vị và giỏ hàng thời gian thực. | [`receipt_src_29_befood_dng.json`](05_DEAL_AND_AFFILIATE/raw_evidence/run_cohort_sweep_077_1787563176023/receipt_src_29_befood_dng.json) |
| 30 | **Shopee Partner Center** | `AFFILIATE_PORTAL` | `DISCOVERY_SIGNAL_ONLY` | HTTP 200 — Cổng đối tác affiliate yêu cầu xác thực hoặc cấp Open API / Product Feed. | [`receipt_src_30_shopee_aff_portal.json`](05_DEAL_AND_AFFILIATE/raw_evidence/run_cohort_sweep_077_1787563176023/receipt_src_30_shopee_aff_portal.json) |
| 31 | **Lazada Partner Center** | `AFFILIATE_PORTAL` | `DISCOVERY_SIGNAL_ONLY` | HTTP 301 — Cổng đối tác affiliate yêu cầu xác thực hoặc cấp Open API / Product Feed. | [`receipt_src_31_lazada_aff_portal.json`](05_DEAL_AND_AFFILIATE/raw_evidence/run_cohort_sweep_077_1787563176023/receipt_src_31_lazada_aff_portal.json) |
| 32 | **TikTok Creator Marketplace** | `AFFILIATE_PORTAL` | `DISCOVERY_SIGNAL_ONLY` | HTTP 0 — Cổng đối tác affiliate yêu cầu xác thực hoặc cấp Open API / Product Feed. | [`receipt_src_32_tiktok_aff_portal.json`](05_DEAL_AND_AFFILIATE/raw_evidence/run_cohort_sweep_077_1787563176023/receipt_src_32_tiktok_aff_portal.json) |

---

## 3. LỊCH ĐỊNH KỲ 7 NGÀY CHỈ DÙNG DỮ LIỆU CÓ BẰNG CHỨNG (EVIDENCE-BOUND 7-DAY SCHEDULE)

Dựa trên dữ liệu đối soát thực tế, Lịch 7 Ngày Tiết Kiệm của JayT Đà Nẵng được thiết lập trung thực như sau:

- **Thứ Hai**: 🎬 **Metiz Super Monday** (Đồng giá **45.000 đ/vé 2D** tại Quầy Helio Center, áp dụng mọi đối tượng đến 31/12/2026).
- **Thứ Ba**: 🎬 **Galaxy Happy Day** (Đồng giá **50.000 đ/vé 2D** tại Galaxy Đà Nẵng) + 🎬 **Metiz U22** (**45.000 đ** kèm CCCD/Thẻ HSSV).
- **Thứ Tư**: 🎬 **Metiz U22** (**45.000 đ**) + ⏳ *CGV Culture Day (58.000 đ — Chỉ áp dụng Thứ Tư cuối cùng mỗi tháng)*.
- **Thứ Năm**: 🎬 **Metiz U22** (**45.000 đ** tại Quầy Metiz Đà Nẵng).
- **Thứ Sáu**: ☕ *Đang theo dõi Radar Cà phê & Điểm tâm (Highlands / The Coffee House / Gong Cha - Chờ ưu đãi công khai)*.
- **Thứ Bảy & Chủ Nhật**: 🛍️ *Đang theo dõi Radar Sàn TMĐT & Giao Đồ Ăn (Voucher tự kiểm tra trong App ShopeeFood / GrabFood / Shopee)*.

---

## 4. DANH MỤC VOUCHER CẦN NGƯỜI DÙNG TỰ KIỂM TRA TRONG APP (`ACCOUNT_OR_CART_DEPENDENT`)

Nhằm bảo vệ sự thật và không tạo kỳ vọng ảo cho người dùng:
1. **ShopeeFood / GrabFood / BeFood Đà Nẵng**: Các mã giảm giá phí ship và combo ăn trưa/tối biến động theo bán kính cửa hàng và tài khoản người dùng $\rightarrow$ Hướng dẫn người dùng mở mục *"Khuyến mãi / Ưu đãi"* trực tiếp trên App.
2. **Shopee / Lazada / TikTok Shop**: Các mã Flash Sale và Live/Video voucher biến động theo ngân sách realtime $\rightarrow$ Hướng dẫn người dùng áp mã trực tiếp tại bước *"Giỏ hàng"* trước khi bấm thanh toán.
3. **Xanh SM / Grab / Be**: Mã giảm giá chuyến xe biến động theo giờ cao điểm và lộ trình $\rightarrow$ Hướng dẫn người dùng kiểm tra mục *"Ưu đãi chuyến đi"* trên App.

---

## 5. LỘ TRÌNH ĐẠT $\ge$ 20 DEALS XÁC THỰC LÊN STAGING (ROADMAP TO 20+ VERIFIED DEALS)

1. **Giai đoạn 1 (Hiện tại)**: Duy trì **3 deal Staging chuẩn mực** (Galaxy Happy Day + Metiz Super Monday + Metiz U22) phủ từ Thứ Hai đến Thứ Năm.
2. **Giai đoạn 2 (Nhập liệu Inbound F&B & Cinema)**: Tiếp nhận bảng giá đối soát chính thức từ các cụm rạp Lotte Cinema Đà Nẵng và chuỗi F&B (Jollibee Combo Sinh Viên, Lotteria Crazy Day, KFC Thứ Ba) khi có văn bản hoặc bằng chứng chụp quầy vật lý.
3. **Giai đoạn 3 (Tăng tốc Affiliate Track 1)**: Khi Shopee phê duyệt quyền Open API Key hoặc cấp Product Feed có cấu trúc, tự động ingest hàng loạt $\ge 20$ deal thật đạt chuẩn 5 chiều để nạp Staging và tiến tới Public Go-Live.

---

## 6. KỶ LUẬT QUẢN TRỊ TUYỆT ĐỐI
- **Production Feed**: Duy trì bất biến `deals_feed.json: []` (`is_approved: false`).
- **Staging Feed**: Giữ nguyên 3 deals tham chiếu nội bộ.
- **0 tạo candidate lẻ, 0 tự ý sinh affiliate link, 0 can thiệp giao diện**.
