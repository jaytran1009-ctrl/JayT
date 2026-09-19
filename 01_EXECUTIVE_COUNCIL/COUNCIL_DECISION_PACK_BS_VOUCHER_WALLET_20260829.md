# HỘI ĐỒNG ĐIỀU HÀNH JAYT — QUYẾT NGHỊ TRIỂN KHAI VÍ ƯU ĐÃI & VOUCHER JAYT (MỤC BS)
**Mã hồ sơ:** `COUNCIL_DECISION_PACK_BS_VOUCHER_WALLET_20260829`  
**Ngày ban hành:** 29/08/2026  
**Chỉ thị chi phối:** [JAYT-245 — Mục BS](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/02_CEO_DIRECTIVES/JAYT-245_TONG_CHI_THI_CEO_DUY_NHAT_VAN_HANH_JAYT.md#L1658)  
**Phiên bản ứng cử viên:** `v3.425.0-staging.bs`  
**Staging URL:** [https://jayt-storefront-staging-bs.vercel.app](https://jayt-storefront-staging-bs.vercel.app)  
**Production Target:** `v3.419.0` — **TIẾP TỤC KHÓA AN TOÀN 100% (NO-SHIP)**

---

## 1. TỔNG QUAN CHIẾN LƯỢC & MỤC TIÊU MỤC BS

Chủ dự án và CEO yêu cầu: khách vào JayT phải thấy ngay ưu đãi và có **voucher thực tế để sử dụng khi cần (trải nghiệm săn hời chân thực)**, giúp hoàn thành công việc cụ thể (tìm ưu đãi, biết rõ điều kiện, sao chép mã chính thức hoặc mở đúng trang nguồn).

Tuy nhiên, JayT **cấm tuyệt đối**:
1. **0 mã giảm giá giả / suy đoán.**
2. **0 giá sản phẩm ảo.**
3. **0 freeship bịa đặt.**
4. **0 affiliate link ngầm / deeplink khi chưa đối soát.**
5. **0 biến giao diện đẹp thành xác nhận thương mại merchant.**

Hội đồng Điều hành đã hoàn thành xây dựng **"Ví ưu đãi & Voucher JayT"** đáp ứng trọn vẹn giá trị săn hời nhưng giữ vững 100% sự trung thực và tính toàn vẹn dữ liệu.

---

## 2. KIẾN TRÚC 4 ACTION CONTRACTS BẮT BUỘC (BS.3)

Mọi voucher/ưu đãi hiển thị trên JayT bắt buộc tuân theo 1 trong 4 action contracts sau:

| Action Contract | Điều Kiện Kích Hoạt | Hành Động Giao Diện | Thông Báo Phản Hồi | Nguồn Minh Chứng |
| :--- | :--- | :--- | :--- | :--- |
| **`Sao chép mã` (COPY_CODE)** | Mã văn bản chính thức + 100% điều kiện, thời hạn, phạm vi áp dụng đã xác minh | Nút bấm sao chép mã trực tiếp vào clipboard | `Đã sao chép: [CODE] — Kiểm tra điều kiện trước khi dùng!` | CGV Cinemas x VNPAY-QR (`VNPAYCGV`) |
| **`Nhận trên trang chính thức` (CLAIM_OFFICIAL)** | Merchant yêu cầu khách tự nhận trên website/ứng dụng chính thức | Mở URL chính thức của merchant (không qua trung gian/affiliate) | Mở tab mới tới trang gốc đơn vị | Domino's Pizza, Lotteria, GitHub Student Pack, Notion Plus |
| **`Xem điều kiện` (VIEW_CONDITIONS)** | Ưu đãi áp dụng tại quầy hoặc dịch vụ công cộng không cần nhập mã | Nút dẫn tới thể lệ / lộ trình / điểm phục vụ | Hiển thị bảng giá & điều kiện chi tiết | DanaBus (45k/tháng), TNGO Xe đạp (5k/30p), Metiz U22 (45k), Starlight Combo (10k) |
| **`Theo dõi mở mã` (WATCH_MONITOR)** | Đang theo dõi định kỳ nhưng chưa có mã chính thức hôm nay | Nút lưu nhắc nhở local, không hứa hẹn trước | `Đang theo dõi định kỳ trên kênh chính thức` | Highlands Coffee, Phúc Long Tea, Vincom Plaza Đà Nẵng |

---

## 3. BẢNG TỔNG HỢP 12 VOUCHER / CHƯƠNG TRÌNH MẪU ĐỐI SOÁT (BS.2, BS.5)

Tất cả 12 voucher được đăng ký tại [JAYT_VOUCHER_LEDGER_BS.json](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/00_PROGRAM_BASELINE/JAYT_VOUCHER_LEDGER_BS.json):

1. **`VOUCHER_CGV_VNPAY_BOGO`**: CGV Cinemas x VNPAY-QR: Mua 1 Tặng 1 Vé 2D $	o$ **Mã:** `VNPAYCGV` (Action: `Sao chép mã`).
2. **`VOUCHER_DOMINOS_BOGO`**: Domino's Pizza: Mua 1 Tặng 1 Pizza Mỗi Thứ 3 & CN $	o$ Action: `Nhận tại trang chính thức`.
3. **`VOUCHER_LOTTERIA_HAPPY_LUNCH`**: Lotteria: Happy Lunch Đồng Giá 38.000đ $	o$ Action: `Xem thực đơn trưa chính thức`.
4. **`VOUCHER_GITHUB_STUDENT_PACK`**: GitHub Student Developer Pack $	o$ Action: `Đăng ký GitHub Student chính thức`.
5. **`VOUCHER_NOTION_EDUCATION_PLUS`**: Notion Plus Miễn Phí Trọn Đời Cho Sinh Viên $	o$ Action: `Kích hoạt Notion Plus chính thức`.
6. **`VOUCHER_DANABUS_MONTHLY_PASS`**: DanaBus: Vé Tháng HSSV Chỉ 45.000đ/tháng $	o$ Action: `Xem điểm làm vé & lộ trình`.
7. **`VOUCHER_TNGO_BIKE_DA_NANG`**: TNGO: Đạp Xe Dạo Sông Hàn 5.000đ/30 phút $	o$ Action: `Xem trạm xe gần bạn`.
8. **`VOUCHER_METIZ_U22_TICKETS`**: Metiz Cinema: Vé Xem Phim U22 Chỉ 45.000đ $	o$ Action: `Xem bảng giá & điều kiện rạp`.
9. **`VOUCHER_STARLIGHT_COMBO_10K`**: Starlight Cinema: Bắp Nước HSSV 10.000đ $	o$ Action: `Xem thể lệ tại rạp Starlight`.
10. **`VOUCHER_HIGHLANDS_COFFEE_RADAR`**: Highlands Coffee: Theo Dõi Ưu Đãi Định Kỳ $	o$ Action: `Theo dõi mở mã ưu đãi`.
11. **`VOUCHER_PHUC_LONG_RADAR`**: Phúc Long: Theo Dõi Thẻ Thành Viên & Voucher $	o$ Action: `Theo dõi mở mã ưu đãi`.
12. **`VOUCHER_VINCOM_PLAZA_RADAR`**: Vincom Plaza Đà Nẵng: Lễ Hội Mua Sắm Cuối Tuần $	o$ Action: `Theo dõi sự kiện mua sắm`.

---

## 4. BẰNG CHỨNG KIỂM THỬ LIVE CHROME CDP & VIEWPORT SCREENSHOTS (BS.8)

Hội đồng đã thực thi quy trình kiểm thử tự động trực tiếp trên Google Chrome Headless thông qua giao thức Chrome DevTools Protocol (CDP) trên Staging BS live:

- **1. 2-Second Initial Arrival:** [staging_bs_2second_cinematic_arrival.png](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/07_QUALITY_ASSURANCE/screenshots/staging_bs_2second_cinematic_arrival.png) (877 KB)
- **2. Voucher Wallet Spotlight:** [staging_bs_voucher_wallet_spotlight.png](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/07_QUALITY_ASSURANCE/screenshots/staging_bs_voucher_wallet_spotlight.png) (242 KB)
- **3. Copy Code Toast Interaction:** [staging_bs_copy_code_toast_interaction.png](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/07_QUALITY_ASSURANCE/screenshots/staging_bs_copy_code_toast_interaction.png) (249 KB)
- **4. Voucher Tickets Grid:** [staging_bs_voucher_tickets_grid.png](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/07_QUALITY_ASSURANCE/screenshots/staging_bs_voucher_tickets_grid.png) (174 KB)
- **5. Dark Mode Wallet View:** [staging_bs_dark_mode_wallet.png](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/07_QUALITY_ASSURANCE/screenshots/staging_bs_dark_mode_wallet.png) (148 KB)
- **6. Mobile 390px Viewport:** [staging_bs_mobile_390px_wallet.png](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/07_QUALITY_ASSURANCE/screenshots/staging_bs_mobile_390px_wallet.png) (324 KB)

---

## 5. KẾ TOÁN NGUỒN CUNG VÀ BẢO VỆ DỮ LIỆU CÁ NHÂN (ZERO-PII)

1. **Kế toán nguồn cung minh bạch:** $1\text{ Deal xác minh} + 19\text{ Pending AU} + 13\text{ Radar} = 33\text{ Hiển thị công khai} (+ 1\text{ Cách ly quarantine} = 34)$.
2. **Zero-PII Telemetry:** Module `jayt_observability_engine.js` giám sát các event `STOREFRONT_INITIALIZED`, `VOUCHER_CODE_COPIED`, `VOUCHER_SAVED_LOCAL` mà không thu thập clipboard content cá nhân, địa chỉ IP hay vị trí người dùng.
3. **Affiliate Gate Safe:** Giữ nguyên `PORTAL_ACCESS_NOT_VERIFIED`, 0 deeplink, 0 AccessTrade tracking.

---

## 6. QUYẾT NGHỊ HỘI ĐỒNG

- **Duyệt phát hành bản Staging BS:** `v3.425.0-staging.bs` trên [https://jayt-storefront-staging-bs.vercel.app](https://jayt-storefront-staging-bs.vercel.app) để CEO trực tiếp trải nghiệm và nghiệm thu.
- **Khóa Production:** Production `v3.419.0` tiếp tục khóa an toàn 100%. Không có bất kỳ thay đổi nào được đẩy lên Production khi chưa có lệnh ký duyệt bằng văn bản từ CEO.
