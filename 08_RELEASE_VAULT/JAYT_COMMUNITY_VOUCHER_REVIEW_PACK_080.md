# HỒ SƠ PHÁT HÀNH & KIỂM TOÁN: JAYT COMMUNITY SAVINGS HUB (080)

**Mã đợt phát hành**: `RELEASE_PACK_COMMUNITY_VOUCHER_080`  
**Chỉ thị điều hành**: `JAYT-COMMUNITY-VOUCHER-080`  
**Thời điểm phát hành**: 2026-08-24T19:10:00+07:00  
**Trạng thái**: `IMPLEMENTED — PENDING CEO AUDIT (COMMUNITY SAVINGS HUB LIVE AT DEPLOY-TEN-XI-48.VERCEL.APP)`  
**URL Live**: [`https://deploy-ten-xi-48.vercel.app`](https://deploy-ten-xi-48.vercel.app)  
**Mã băm Source of Truth JS (SHA-256)**: `021808d55b5c9ec207304f8238449d75f14fdd6128d9e183bc72a65c8c71486f`  
**Mã băm Live CDN JS (SHA-256)**: `021808d55b5c9ec207304f8238449d75f14fdd6128d9e183bc72a65c8c71486f` (`MATCH 100%`)  
**Production Feed Invariant**: `deals_feed.json: []` (0 records, 0 bytes, `is_approved: false`, 0 affiliate link)

---

## 1. NÂNG CẤP COMMUNITY SAVINGS HUB THEO 4 TRỤ CỘT CHỈ THỊ 080

1. **Trang "Voucher của tôi" (My Vouchers Vault)**:
   - Cho phép người dùng tự lưu các mã voucher họ đang có trên điện thoại (mã, thương hiệu/app, mức giảm, đơn tối thiểu, hạn dùng, ghi chú).
   - Tự động phân loại trạng thái: `Còn hạn`, `Sắp hết hạn (<= 3 ngày)`, `Đã hết hạn`.
   - Nút hành động 1-click: `🧮 Áp vào Máy Tính` và `➕ Thêm vào Kế Hoạch Ngày`.
   - Gắn nhãn minh bạch: `✍️ Kho Voucher Do Bạn Tự Nhập — Lưu trên thiết bị, không công khai`.

2. **Luồng "Báo voucher vừa thấy" (Inbound Community Voucher Signals)**:
   - Cho phép người dùng ghi nhận nhanh một mã vừa thấy trong app của họ (tên app, mã, điều kiện, nguồn ảnh/banner).
   - Gắn nhãn nghiêm ngặt: `⚠️ Chưa xác thực — chỉ lưu vào radar cá nhân của bạn, không công khai và không gắn affiliate`.
   - Hỗ trợ nút `📥 Xuất file JSON đối soát` để chuẩn bị dữ liệu đối soát độc lập.

3. **Dashboard Hôm Nay Nâng Cấp**:
   - Phân định rõ ràng 2 khu vực:
     - `🛡️ KHU VỰC 1: Ưu Đãi Đã Xác Thực (Verified Deals)`: Tiếp tục hiển thị Honest Empty State rõ ràng: *"JayT đang mở beta. Ưu đãi chỉ xuất hiện khi đủ điều kiện đối soát."*
     - `✍️ KHU VỰC 2: Kho Voucher Do Bạn Tự Nhập (User-Entered Vouchers)`: Hiển thị ví voucher của người dùng, tích hợp widget cảnh báo voucher sắp hết hạn.

4. **Đợt Quét Sâu 16 Nguồn Chính Thức (Deep Sweep 080)**:
   - Đã quét toàn diện 16 endpoints của các thương hiệu / sàn tại Đà Nẵng: 6 trang trả HTTP 200 (CGV Vĩnh Trung, Jollibee, KFC, Phê La, Katinat, ShopeeFood Đà Nẵng), 10 trang trả redirect/SPA.
   - Toàn bộ raw response bodies và headers được lưu trữ độc lập tại `07_QUALITY_ASSURANCE/runtime_evidence/sweep_080/`.
   - Tuân thủ nghiêm ngặt chỉ thị: Vì quét công khai các trang hub không chứa đủ 10 Evidence Bundles 5 chiều, hệ thống **duy trì phân loại là tín hiệu radar đang theo dõi**, không tự ý biến thành deal công khai. Catalog thương mại tiếp tục khóa `[]`.

---

## 2. KẾT QUẢ KIỂM THỬ THỰC ĐỊA TRÊN PRODUCTION LIVE

| Kiểm Tra | Phương Thức | Trạng Thái | Kết Quả |
|---|---|---|---|
| Desktop Live | HTTPS GET | **PASS** | HTTP 200 OK, render đầy đủ 9 navigation tabs, topbar, mobile nav |
| Mobile Live | Viewport 390px | **PASS** | HTTP 200 OK, bố cục responsive không tràn ngang, touch targets >= 44px |
| Byte Parity | CDN Live vs Source of Truth | **PASS** | Khớp 100% SHA-256: `021808d55b5c9ec207304f8238449d75f14fdd6128d9e183bc72a65c8c71486f` |
| Tính Năng 080 | Live JS Bundle | **PASS** | Đầy đủ Ví Voucher cá nhân, Báo Voucher Vừa Thấy, Phân định 2 khu vực |
| Negative Invariants | Toàn hệ thống | **PASS** | `deals_feed.json: []`, `is_approved: false`, 0 affiliate link |
