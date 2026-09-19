# JAYT PHA 2 — PHÁN QUYẾT TỐI CAO CỦA CHỦ TỊCH: PHÊ CHUẨN CON ĐƯỜNG 1 (PUBLIC BETA VALUE-FIRST)

- **Số hiệu văn bản**: `JAYT-DECREE-2026-0915-PATH1-PUBLIC-BETA-COMMUNITY-UNLEASH`
- **Căn cứ tối cao**: `MY_REQUEST_20260915_PUBLIC_BETA_COMMUNITY_UNLEASH`
- **Cơ quan ban hành**: Chủ tịch Hội đồng Quản trị Tập đoàn JayT Corp (Key 1)
- **Đồng thuận phối thuộc**: Hội đồng Cố vấn Chiến lược & Ban Kiểm toán Kỹ trị Codex
- **Cơ quan thực thi**: Khối Vận hành & Kỹ thuật Antigravity (Execution Lead)
- **Thời gian ban hành**: 2026-09-15T14:32:00+07:00 (2026-09-15T07:32:00Z)
- **Trạng thái**: `PATH_1_RATIFIED__PUBLIC_BETA_VALUE_FIRST_ACTIVE__FAIL_CLOSED_CONFIRMED`

---

## I. NỘI DUNG PHÁN QUYẾT TỐI CAO

1. **Chính thức bác bỏ Con đường 2 (Ký số ngoại biên / Tự ký cục bộ)**:
   - Phương án tự tạo khóa ngoại biên không giải quyết được nguồn gốc xác thực với bên thứ ba (Shopee/Lazada) và đi ngược lại nguyên tắc kiểm toán khách quan.
2. **Chuẩn y tuyệt đối Con đường 1 (Khai hỏa Public Beta Tiện ích Cộng đồng Value-First)**:
   - Phát hành ngay cỗ máy tiết kiệm giá trị thực đến 320.000 khách hàng mục tiêu tại Đà Nẵng:
     * **Trọng tài bữa trưa 3 App**: So sánh menu quán vs Pick-up ShopeeFood/GrabFood tiết kiệm 20.000₫–30.000₫/bữa.
     * **Cashier HUD 3 giây**: Nhắc thẻ HSSV giảm 10%–15% và ví hoàn tiền tại quầy ($P_{95} \le 30\text{ms}$).
     * **VietQR Chia bill nhóm**: Xuất thẻ ảnh Zalo Pass Canvas 1080x1440 PNG tạo vòng lặp lan tỏa 0 đồng.
     * **Kệ 20 SKU Thiết yếu KTX**: Hiển thị giá thật đã đối soát từ Shop chính hãng kèm link Canonical Shopee.
3. **Quy chế Vận hành Thương mại An toàn**:
   - Tạm thời duy trì `affiliate_enabled: false` để bảo vệ uy tín thương hiệu và tài khoản đối tác tiếp thị liên kết.
   - Khi lượng người dùng thật phát sinh đơn hàng tự nhiên qua link Canonical trên Portal Shopee, tải tệp CSV về nạp vào `raw_portal_exports/`.
   - Module `reconcile_w8_conversion_report.cjs` tự động đối soát, đóng kín GAP_02 và chính thức kích hoạt `affiliate_enabled: true` với đầy đủ chứng cứ bên thứ ba!

---

## II. KỶ LUẬT NIÊM PHONG HỆ THỐNG

- Baseline Static Pipeline Seal: **24/24 PASS TUYỆT ĐỐI**.
- Feed Toolchain Seal: **5/5 PASS TUYỆT ĐỐI**.
- Parity WS1 - WS2: **100% BIT-IDENTICAL**.
- Production Canonical: `https://jayt-production-v3420.vercel.app/`.

---

*Phán quyết có hiệu lực thi hành ngay lập tức.*
