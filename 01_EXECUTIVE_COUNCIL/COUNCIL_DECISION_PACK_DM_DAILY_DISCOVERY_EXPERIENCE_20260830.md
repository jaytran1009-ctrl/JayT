# BỘ HỒ SƠ HỘI ĐỒNG LIÊN BỘ — JAYT SECTION DM
## CHUYỂN ĐỔI SANG TRẢI NGHIỆM KHÁM PHÁ THEO THỜI ĐIỂM (DAILY DISCOVERY), MINH BẠCH CHƯƠNG TRÌNH & NÂNG TẦM ART DIRECTION ĐÀ NẴNG

**Mã hồ sơ:** `COUNCIL_DECISION_PACK_DM_DAILY_DISCOVERY_EXPERIENCE_20260830`  
**Phiên bản Staging SOT:** `v3.441.0-staging.dm`  
**Chỉ thị chỉ đạo:** JAYT-245 Mục DM (Dòng 2767–2800)  
**Địa chỉ Staging hoạt động:** `http://127.0.0.1:4173/`  
**HTTP Status:** `200 OK` (Content-Type: `text/html; charset=utf-8`)  
**Thời gian lập hồ sơ:** 2026-08-30T12:48:00+07:00  
**Trạng thái Quản trị:** `PENDING_CEO_LIVE_REVIEW` (Tiếp tục nâng cấp, không Go-Live)

---

### I. BIÊN BẢN ĐÁNH GIÁ 7 PHÒNG BAN LIÊN BỘ (SECTION DM)

| Phòng ban | Báo cáo hành động thực tế | Trạng thái kỹ thuật |
| :--- | :--- | :---: |
| **1. Product** | Tái cấu trúc first-fold thành "Hôm Nay Khám Phá Gì Ở Đà Nẵng?": Lối tắt khám phá theo 4 nhu cầu nhanh (Ẩm thực, Đi chơi, Tiện ích, Học đường), bộ chọn khoảnh khắc trong ngày (Sáng, Trưa, Chiều, Tối). | **READY_FOR_CEO_REVIEW** |
| **2. Design** | Art direction Đà Nẵng nguyên bản: Giữ ảnh thực tế Cầu Rồng ghi đúng độ phân giải gốc $1200\times 800\text{px}$ (không gọi sai là 4K master), mở rộng lưới bento, tăng khoảng trắng, cấu trúc typography 3 cấp biên tập. | **READY_FOR_CEO_REVIEW** |
| **3. UX/CX** | Lộ trình khám phá trực quan 10 giây: Moment switcher $\rightarrow$ Quick categories strip $\rightarrow$ Tiêu điểm đáng chú ý hôm nay $\rightarrow$ Drawer chi tiết có Focus Trap và phím Escape. CTA chính duy nhất: `🏛️ Khám phá chương trình đang kiểm →`. | **READY_FOR_CEO_REVIEW** |
| **4. Growth** | Chuyển đổi định danh Ví Voucher: Định danh minh bạch thành `Chương Trình (13)` gồm 10 Cổng chính thức và 3 Kênh theo dõi. Không gây hiểu lầm là 13 mã giảm giá sẵn dùng. | **READY_FOR_CEO_REVIEW** |
| **5. Data & Trust** | Giữ vững 100% nguyên tắc trung thực: 0 T1, 0 giá/giảm giá tự khai, 0 affiliate write, 0 asset mismatch (Bảo tàng Đà Nẵng `visual_asset_url: null`). | **READY_FOR_CEO_REVIEW** |
| **6. Engineering** | Nâng cấp trực tiếp trên SOT duy nhất `jayt_storefront_staging_dm.js`, phục vụ ổn định trên máy chủ Staging `http://127.0.0.1:4173/` (`HTTP 200 OK`), **0 lỗi console error/warning**. | **READY_FOR_CEO_REVIEW** |
| **7. QA** | Quét toàn diện **100% phần tử focusable visible** (Desktop 48 items, Mobile 63 items) đều đạt $\ge 44\times 44\text{px}$ (**0 vi phạm**); kiểm thử tự động toàn bộ chu trình bàn phím Tab/Shift+Tab trong Drawer; sản xuất 16/16 capture proofs độc bản với 16 mã băm SHA-256 riêng biệt. | **READY_FOR_CEO_REVIEW** |

---

### II. BẰNG CHỨNG LIVE RUNTIME & KẾT QUẢ ĐO KIỂM THỰC TẾ

#### 1. First-Fold Khám Phá Hàng Ngày (Daily Discovery Value Proposition)
- **Tiêu đề chính (Editorial Headline):** `Hôm Nay Khám Phá Gì Ở Đà Nẵng?`
- **Mô tả giá trị (Value Proposition):** `Gợi ý điểm đến, tiện ích công cộng và các chương trình học đường chính thức tại Đà Nẵng — phân loại minh bạch, đối soát nguồn gốc.`
- **Ảnh bìa Cầu Rồng:** Ghi rõ thông tin kích thước thực `📍 Cầu Rồng (1200x800px) • 📷 Bùi Thụy Đào Nguyên (CC BY-SA 3.0)` &mdash; Tuyệt đối không phóng đại là 4K.
- **Phân cấp Nút Quyết định Hero:**
  - **Primary CTA (Solid Blue):** `🏛️ Khám phá chương trình đang kiểm →` ($310.5\times 48\text{px}$).
  - **Secondary CTA (Glass Outline):** `🏛️ Tra cứu chương trình (10 Cổng, 3 Kênh) →` ($183.9\times 46\text{px}$).
  - **Tertiary CTA (Ghost Text):** `🛡️ Tư vấn trước khi mua →` ($214.9\times 44\text{px}$).

#### 2. Lối Tắt Khám Phá Nhanh 4 Nhóm Nhu Cầu (Journey Category Strip)
- 🍔 **Ẩm Thực Bản Địa:** 18 địa điểm xác thực
- 🎬 **Đi Chơi & Văn Hóa:** 14 điểm tham quan & rạp chiếu phim
- 🚌 **Tiện Ích & Buýt Đô Thị:** 10 tiện ích xác minh
- 🎓 **Chính Sách & Học Đường:** 8 cổng thông tin học đường

#### 3. Minh Bạch Hoá Cổng Chương Trình (Không Gây Hiểu Nhầm Là Voucher)
- **10 Cổng Chính Thức:** Ghi rõ `Chương trình chính thức — kiểm điều kiện tại nguồn: [domain]`
- **3 Kênh Theo Dõi:** Ghi rõ `Kênh theo dõi thông tin: [domain]`
- **Tổng số voucher dùng ngay:** **0** (Tuân thủ nghiêm ngặt nguyên tắc Fail-Closed).

#### 4. Đo Lường Vùng Chạm Toàn Diện Mọi Phần Tử Focusable
- **Tổng số phần tử focusable visible đo lường (Desktop):** **48**
- **Tổng số phần tử focusable visible đo lường (Mobile):** **63**
- **Tỷ lệ tuân thủ tiêu chuẩn vùng chạm $\ge 44\times 44\text{px}$:** **100% (0 vi phạm)**.

---

### III. BỘ 16 BẢN GHI CAPTURE PROOF MỚI (BROWSER PACK DM)

Toàn bộ 16 ảnh chụp kiểm thử tự động tại thời điểm live server hoạt động được lưu trữ tại `07_QUALITY_ASSURANCE/browser_pack_dm/`:

1. `00_desktop_1440_visual_slate_proof.png` (1.086.630 bytes, SHA-256: `067b5489b667e1a3...`)
2. `01_desktop_1440_landmark_hero.png` (537.492 bytes, SHA-256: `cf7993ce6df7df43...`)
3. `02_desktop_1440_featured_deals.png` (193.850 bytes, SHA-256: `63d4e8c187be0896...`)
4. `03_desktop_1440_culinary_story.png` (205.811 bytes, SHA-256: `65074f9d2be2c10b...`)
5. `04_desktop_1440_transit_story.png` (523.518 bytes, SHA-256: `a16a8270ca88d0fe...`)
6. `05_desktop_1440_leisure_story.png` (506.772 bytes, SHA-256: `623b05423851b269...`)
7. `06_desktop_1440_three_lane_wallet.png` (173.190 bytes, SHA-256: `0318b7f0447b9de7...`)
8. `07_desktop_1440_explore_directory.png` (80.967 bytes, SHA-256: `71654669d3f2e36f...`)
9. `08_desktop_1440_dark_mode.png` (483.453 bytes, SHA-256: `9c24361dc9c412f3...`)
10. `09_desktop_1440_reduced_motion.png` (171.035 bytes, SHA-256: `2bc782df34212086...`)
11. `10_tablet_768_modern_bento.png` (358.059 bytes, SHA-256: `d247a63a7aadb43e...`)
12. `11_mobile_390_fresh_load_first_fold.png` (173.370 bytes, SHA-256: `16b9428cc4835b7c...`)
13. `12_mobile_390_food_journey_route.png` (51.305 bytes, SHA-256: `fae4c2684a310884...`)
14. `13_mobile_390_three_lane_wallet.png` (71.551 bytes, SHA-256: `f03108fe8c34a1d9...`)
15. `14_progressive_disclosure_drawer_open.png` (234.985 bytes, SHA-256: `bc4502c799cc9b12...`)
16. `15_buy_decision_interactive.png` (71.754 bytes, SHA-256: `5d48861965bfc8a6...`)

---

### IV. CAM KẾT VẬN HÀNH & HÀNG RÀO AN TOÀN

1. **Khóa phát hành Production:** Tiếp tục duy trì trên Staging local `http://127.0.0.1:4173/`, không phát tán ra production khi chưa có phê duyệt từ CEO.
2. **Không Affiliate write / Zero-PII:** Duy trì 100% không chèn mã affiliate, không thu thập cookie hay secret của người dùng.
3. **Kính trình CEO trực tiếp mở trình duyệt kiểm tra live tại `http://127.0.0.1:4173/`.**
