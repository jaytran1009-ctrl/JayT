# HỘI ĐỒNG ĐIỀU HÀNH JAYT — QUYẾT NGHỊ TỔNG LỆNH TOÀN DIỆN COMMUNITY OS (MỤC BT)
**Mã hồ sơ:** `COUNCIL_DECISION_PACK_BT_COMMUNITY_OS_20260829`  
**Ngày ban hành:** 29/08/2026  
**Chỉ thị chi phối:** [JAYT-245 — Mục BT](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/02_CEO_DIRECTIVES/JAYT-245_TONG_CHI_THI_CEO_DUY_NHAT_VAN_HANH_JAYT.md#L1691)  
**Phiên bản ứng cử viên:** `v3.426.0-staging.bt`  
**Staging URL:** [https://jayt-storefront-staging-bt.vercel.app](https://jayt-storefront-staging-bt.vercel.app)  
**Production Target:** `v3.419.0` — **TIẾP TỤC KHÓA AN TOÀN 100% (NO-SHIP)**

---

## 1. TỔNG QUAN CHIẾN LƯỢC & MỤC TIÊU MỤC BT

Chủ dự án và CEO đã ban hành **BT — Tổng lệnh CEO toàn diện** cho Antigravity và Hội đồng 7 phòng ban nhằm hợp nhất toàn bộ các thành quả nghiên cứu và phát triển vào một hệ điều hành cộng đồng (**Community OS**) hoàn chỉnh:

1. **M0 — Nền tảng BR:** Single Publish Pipeline, Four-Ledger Architecture, Zero-PII Observability Engine, Rollback Drill.
2. **M1 — Trải nghiệm Thành phố BQ:** Cinematic Da Nang Arrival, ảnh Cầu Rồng $1280 	imes 940$ (CC BY-SA 3.0), 3 Lộ trình đô thị (`Ăn uống`, `Đi chơi`, `Mua sắm`), Floating City Note.
3. **M2 — Ví Ưu Đãi & Voucher BS:** Giao diện Voucher Wallet, Spotlight Ticket `CGV Cinemas x VNPAY-QR` (`VNPAYCGV`), 4 Action Contracts, lưu danh sách offline trên thiết bị.
4. **M3 — Quyết Định Mua Sắm Thông Minh (Value-First):** Cổng tra cứu giá trị thực, trạng thái `Nên mua / Chờ / Chưa đủ dữ liệu`, khóa `PORTAL_ACCESS_NOT_VERIFIED` (0 deeplink, 0 secret, 0 affiliate link).
5. **M4 — Vòng Lặp Cộng Đồng (Community Loop):** Tiếp nhận báo nguồn (`+ Báo nguồn`), lưu dấu trang, minh bạch nguồn gốc 100%.

---

## 2. KẾ TOÁN NGUỒN CUNG 50 NỘI DUNG / NGÀY THEO TẦNG MINH BẠCH

Toàn bộ 50 nội dung được kiểm soát tại [JAYT_CONTENT_LEDGER_BT.json](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/00_PROGRAM_BASELINE/JAYT_CONTENT_LEDGER_BT.json):

| Tầng Phân Loại (Tier) | Số Lượng | Mô Tả & Tiêu Chuẩn Minh Chứng | Đại Diện Tiêu Biểu |
| :--- | :---: | :--- | :--- |
| **Tier 1: Ưu Đãi Đã Đối Soát (VERIFIED_DEAL)** | 6 | Có mã văn bản chính thức hoặc thể lệ niêm yết rõ ràng, quyền lợi dùng được ngay | CGV Cinemas x VNPAY-QR (`VNPAYCGV`), Domino's BOGO, Lotteria Happy Lunch, Metiz U22 (45k), GitHub Student, Notion Plus |
| **Tier 2: Chương Trình Chính Thức (OFFICIAL_PROGRAM)** | 12 | Chính sách quyền lợi học đường, thành viên từ các thương hiệu lớn | Canva Giáo Dục, JetBrains IT, Spotify SV (29.5k), Apple Music SV (35k), Shopee Club, GrabUnlimited, Be SV, Starlight 10k, Galaxy Happy Day, Co.opmart, FPT Play, CGV Culture Day |
| **Tier 3: Tiện Ích Đô Thị (CIVIC_FACILITY)** | 18 | Dịch vụ công, không gian văn hóa, danh thắng và tiện ích công cộng phục vụ cư dân | DanaBus (45k/tháng), TNGO Xe đạp (5k/30p), Thư viện Tổng hợp, Cổng 1022, Cầu Rồng Phun Lửa/Nước, Công viên APEC, Phố đi bộ Bạch Đằng, Bảo tàng Chăm, Bãi biển Mỹ Khê, Bán đảo Sơn Trà, Chợ Hàn, Chợ Cồn, Phố Huỳnh Thúc Kháng, Cung Thiếu Nhi, Đĩa bay Tiên Sơn, Du thuyền Sông Hàn, TT Văn hóa Điện ảnh |
| **Tier 4: Nguồn Radar Giám Sát (RADAR_SOURCE)** | 14 | Kênh chính thức đang theo dõi định kỳ, hiển thị minh bạch khi chưa có mã | Highlands Coffee, Phúc Long Tea, Vincom Plaza, Lotte Mart, GO! Đà Nẵng, Kichi-Kichi, Gogi House, The Coffee House, Trung Nguyên Legend, Mixue, CGV Vincom, Galaxy Điện Biên Phủ, CGV Vĩnh Trung, Helio Center |
| **Cách Ly An Toàn (QUARANTINE)** | 1 | Cách ly fail-closed tuyệt đối, không hiển thị ra public | `DEAL_120_CGV_ZALOPAY_12H` |
| **TỔNG CỘNG** | **51** | **50 Hiển Thị Công Khai + 1 Cách Ly An Toàn** | |

---

## 3. BẰNG CHỨNG KIỂM THỬ LIVE CHROME CDP & SCREENSHOTS (BT.5)

Hội đồng Điều hành đã thực thi quy trình kiểm thử tự động trực tiếp trên Google Chrome thật qua giao thức Chrome DevTools Protocol (CDP) trên Staging BT live:

- **1. Community OS Cinematic Arrival:** [staging_bt_community_os_arrival.png](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/07_QUALITY_ASSURANCE/screenshots/staging_bt_community_os_arrival.png) (157 KB)
- **2. Voucher Wallet Spotlight:** [staging_bt_voucher_wallet_spotlight.png](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/07_QUALITY_ASSURANCE/screenshots/staging_bt_voucher_wallet_spotlight.png) (157 KB)
- **3. Copy Code Toast Interaction:** [staging_bt_copy_code_toast_interaction.png](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/07_QUALITY_ASSURANCE/screenshots/staging_bt_copy_code_toast_interaction.png) (161 KB)
- **4. 50 Tiered Items Directory:** [staging_bt_tiered_supply_directory.png](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/07_QUALITY_ASSURANCE/screenshots/staging_bt_tiered_supply_directory.png) (231 KB)
- **5. Community Report Source Modal:** [staging_bt_community_report_modal.png](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/07_QUALITY_ASSURANCE/screenshots/staging_bt_community_report_modal.png) (137 KB)
- **6. Mobile 390px Viewport:** [staging_bt_mobile_390px_community_os.png](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/07_QUALITY_ASSURANCE/screenshots/staging_bt_mobile_390px_community_os.png) (471 KB)

---

## 4. QUYẾT NGHỊ HỘI ĐỒNG

- **Duyệt phát hành bản Staging BT:** `v3.426.0-staging.bt` trên [https://jayt-storefront-staging-bt.vercel.app](https://jayt-storefront-staging-bt.vercel.app) để CEO trực tiếp trải nghiệm và nghiệm thu toàn diện Community OS.
- **Khóa Production:** Production `v3.419.0` tiếp tục khóa an toàn 100%. Không có bất kỳ thay đổi nào được đẩy lên Production khi chưa có lệnh ký duyệt bằng văn bản từ CEO.
