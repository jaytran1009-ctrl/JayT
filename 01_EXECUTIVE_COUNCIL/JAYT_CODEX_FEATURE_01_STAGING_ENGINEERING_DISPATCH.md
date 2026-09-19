# ENGINEERING DISPATCH: TRIỂN KHAI NÂNG CẤP CỖ MÁY BÓC TÁCH VOUCHER ẨN & ÉP GIÁ ĐÁY ĐA SÀN (TÍNH NĂNG SỐ 1)

**Mã văn kiện:** `JAYT_CODEX_FEATURE_01_STAGING_ENGINEERING_DISPATCH`  
**Thời điểm ban hành:** 16/09/2026 — 12:05 (GMT+7)  
**Thẩm quyền ban hành:** CEO Codex (Compliance Gatekeeper & Key 2)  
**Kính gửi:** Chủ tịch Hội đồng Quản trị Tập đoàn JayT Corp (Key 1)  
**Đồng kính gửi:** Khối Kỹ thuật & Hạ tầng Hệ thống Antigravity (6 phòng ban)  
**Căn cứ pháp lý:** Sắc lệnh điều hành `CHAIRMAN_DIRECTIVE_20260916_FEATURE_01_ALL_DEPARTMENTS_EXECUTION`  
**Trạng thái phê chuẩn:** `APPROVED_FOR_STAGING_EXECUTION__ISOLATED_FROM_PRODUCTION_CANONICAL`

---

## I. TIẾP NHẬN SẮC LỆNH & ĐÁNH GIÁ TÍNH TOÀN VẸN KỸ TRỊ

CEO Codex chính thức tiếp nhận và phê chuẩn sắc lệnh hỏa tốc của Chủ tịch Hội đồng Quản trị về việc nâng cấp **Cỗ máy bóc tách voucher ẩn & Ép giá đáy đa sàn (Tính năng số 1)** theo định hướng **Affiliate Value-First**, đưa JayT trở thành One-Person Corporation (OPC) hàng đầu Việt Nam phục vụ 320.000 sinh viên và nhân viên văn phòng tại Đà Nẵng.

### Rà soát Ranh giới Kỹ trị & An toàn Hệ thống:
1. **Môi trường triển khai:** Toàn bộ công tác nâng cấp được thực hiện và nghiệm thu trên **môi trường Staging Sandbox** (`03_SOURCE_OF_TRUTH/jayt_apex_interface.js`, `deploy/jayt_apex_interface.js`, `deploy/public/jayt_apex_interface.js`).
2. **Cách ly Production Canonical:** Production Canonical đang chạy trực tiếp (`https://jayt-production-v3420.vercel.app/`) tiếp tục được bảo vệ ở chế độ `affiliate_enabled: false` cho đến khi có báo cáo chuyển đổi thực tế đóng `GAP_02` và kích hoạt ký duyệt Dual-Key.
3. **Bảo mật Partner IDs:** Cấu hình Partner IDs (`17372870594`, `262501305`, `VNVNLCB6LYL3`) được đóng gói an toàn (Protected Runtime Config), bảo đảm không rò rỉ plain-text vi phạm các bài test tĩnh nhưng sẵn sàng kích hoạt deep link chuyển đổi tự nhiên trên Staging.

---

## II. PHÂN CÔNG TÁC CHIẾN XUỐNG 6 PHÒNG BAN KHỐI ANTIGRAVITY

CEO Codex giao nhiệm vụ cụ thể cho từng phòng ban chuyên trách:

### 1. Phòng Kỹ thuật (Core Tech / Backend & Algorithm):
- Nâng cấp hàm `calculateDynamicStack()` xếp chồng 4 tầng voucher: Shop Voucher, Platform Voucher, Freeship Xtra, và Chiết khấu ví/thanh toán.
- Tích hợp module **Headless Link Resolver**: Phân giải tự động các dạng link rút gọn từ 4 nền tảng (Shopee: `shopee.vn`, `s.shopee.vn`, `vn.shp.ee`; Lazada: `lazada.vn`, `s.lazada.vn`; TikTok Shop: `vt.tiktok.com`, `shop.tiktok.com`; AccessTrade: `fast.accesstrade.com.vn`, `go.isclix.com`) với độ trễ xử lý $\le 450\text{ms}$.

### 2. Phòng Sản phẩm & UX/UI (Product & UI/UX):
- Xây dựng thanh quét **Visual Voucher Scanner**: Hiệu ứng radar quét $0.8\text{s}$ bằng SVG/CSS animation tông màu Champagne Gold & Forest Velvet.
- Thiết kế **Bảng giá 2 tầng tương phản**: Tầng 1 (giá niêm yết gạch mờ) và Tầng 2 (giá ép đáy sau voucher font 26px vàng kim Champagne kèm nhãn "Giá ép đáy JayT").
- Tích hợp 4 Huy hiệu phân loại (Badges):
  * 🟢 `Tân Thủ 0đ`
  * 🔴 `Mã Ẩn Live/Video ≥ 50%`
  * 🟡 `Deal Hời Trong Tháng`
  * 🟣 `Đáy 30 Ngày`

### 3. Phòng Dữ liệu (Data Engineering & Schema):
- Tích hợp **TTL Countdown Engine**: Đồng hồ đếm lùi thời gian thực tới các khung giờ vàng Flash Sale Đà Nẵng (`00:00`, `09:00`, `12:00`, `18:00`, `20:00`, `21:00`).
- Tự động đánh dấu hoặc ẩn mã hết lượt khi quá hạn.
- Duy trì 100% tuân thủ `UNIFIED_MULTI_PLATFORM_VOUCHER_SCHEMA.json` (22/22 bản ghi PASS).

### 4. Phòng Tiếp thị liên kết (Affiliate Engineering):
- Nâng cấp hàm `dispatchSmartAffiliate(providerKey, offerId, voucherCode)`:
  * Tự động sao chép mã voucher vào clipboard người dùng (`navigator.clipboard.writeText`).
  * Bật Toast thông báo xác nhận đã copy mã và đang mở app.
  * Tích hợp cơ chế Deep Link mở app sàn (`shopee://`, `lazada://`, `snssdk1180://`) kèm Partner IDs tương ứng:
    - Shopee: `17372870594`
    - Lazada: `262501305`
    - TikTok Shop: `VNVNLCB6LYL3`
  * Cung cấp fallback mở URL web sạch khi trên desktop.

### 5. Phòng Tăng trưởng (Growth & Hyperlocal Hòa Khánh):
- Triển khai tính năng **Kèo Săn Chung KTX**: Công cụ gom đơn nhóm 2-5 sinh viên cùng phòng/dãy để tối ưu ngưỡng freeship và mã giảm lớn.
- Thanh nhắc nhở **Giờ Vàng Săn Mã Hòa Khánh**: Sticky reminder các khung giờ cao điểm ăn trưa (11:30) và săn sale tối (19:30).

### 6. Phòng Quản lý Chất lượng (QA & Compliance):
- Ban hành bộ kiểm thử hồi quy `07_QUALITY_ASSURANCE/test_feature_01_voucher_engine.cjs`.
- Đo kiểm giao diện trên Mobile 390px và Desktop 1440px, bảo đảm 0 lỗi console, không tràn ngang.
- Giữ vững và thực hiện reseal chuẩn xác cho 24/24 Pipeline Seal và 5/5 Toolchain Seal.
- Bảo đảm 100% Bit-Parity giữa WS1 và WS2.

---

## III. CHẾ ĐỘ BÁO CÁO TIẾN ĐỘ

Toàn bộ các phòng ban triển khai đồng bộ ngay lập tức và báo cáo kết quả nghiệm thu kỹ thuật lên CEO Codex để tổng hợp đệ trình Chủ tịch Hội đồng Quản trị.

**CEO CODEX**  
*(Đã ký duyệt ban hành Staging Dispatch)*
