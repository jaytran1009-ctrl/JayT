# BÁO CÁO NGHIỆM THU STAGING JAYT-363 & HỒ SƠ TRÌNH DUYỆT TRẢI NGHIỆM GEMINI
**Kính gửi:** Hội đồng Điều hành OPC JayT, Chủ tịch & Ban Đánh Giá Trải Nghiệm Chiến Lược Gemini  
**Mã hồ sơ:** JAYT_363_STAGING_HANDOFF  
**Phiên bản ứng viên:** `v3.431.0`  
**Thời điểm niêm phong:** 2026-09-09T07:48:02.584Z  
**Phán quyết kỹ thuật:** `STAGING_ACCEPTANCE_PASS__READY_FOR_GEMINI_STRATEGIC_EXPERIENCE_REVIEW__PRODUCTION_DEPLOYMENT_STRICTLY_PROHIBITED`  
**Địa chỉ trải nghiệm Staging:** `http://127.0.0.1:4176` (Cổng độc quyền `:4176`)  
**Production hiện hành:** Duy trì nghiêm ngặt `v3.430.0` (`dpl_72b2G579GhCPSS7A6AoLHrypQa91` tại `https://jayt-production-v3420.vercel.app`).

---

## 1. TỔNG QUAN THỰC THI CHỈ THỊ JAYT-363 MAXIMUM EXPERIENCE
Đã thực thi trọn vẹn và chuẩn xác 100% các yêu cầu của lệnh điều phối `WORK_ORDER_J363_MAXIMUM_EXPERIENCE.json` ban hành ngày 09/09/2026:

### Workstream 1: Time-Aware Bento Hub & 5 Cụm Trường Đại Học (First Viewport)
- **Vị trí First Viewport:** Bento Hub được bố trí tại đỉnh trang chủ (`top: 68px`), hiển thị trọn vẹn trên nếp gấp màn hình (above the fold) ở cả 3 kích thước 1440px, 768px, 390px.
- **5 Khung giờ thích ứng & Tiêm đồng hồ:**
  - Sáng (07:00-11:00): Điểm tâm & Cà phê sáng
  - Trưa (11:00-14:00): Cơm trưa cứu đói sinh viên (cam kết ≤35.000₫)
  - Chiều (14:00-18:00): Cà phê học bài có ổ cắm & Tuyến DanaBus 6K
  - Tối (18:00-23:00): Phim tối U22 (45k-55k) & Kèo ăn nhóm chia bill
  - Đêm khuya (23:00-07:00): Kế hoạch sáng mai & Quán đêm mở muộn (minh bạch giờ mở, không hiển thị quán đóng cửa là mở)
  - Hỗ trợ tiêm đồng hồ kiểm thử qua `window.__JAYT_CLOCK__` và API `window.setJaytClock(timeStr)`. Đã kiểm định độc lập qua 6 mốc thời gian (`07:30`, `11:45`, `15:15`, `19:30`, `23:30`, `02:00`) với 100% phản hồi chính xác.
- **Bộ lọc 5 cụm trường:** Bách Khoa, Sư Phạm, Kinh Tế DUE, Duy Tân, Ngoại Ngữ + Tất cả.
- **Độ trễ chuyển đổi bộ lọc:** Đạt chuẩn dưới 20ms. Đo kiểm thực tế 36 lượt click ghi nhận: **min: 0.1ms, p50: 0.2ms, p95: 0.4ms, max: 0.8ms, trung bình: 0.24ms**.

### Workstream 2: 34 Ưu Đãi Hành Động (Actionable Vouchers)
- **Số lượng ưu đãi:** 34 ưu đãi hành động thực tế (vượt yêu cầu tối thiểu 30).
- **Phân loại rõ ràng:** 29 ưu đãi quầy/hội viên (`COUNTER_MEMBER`), 3 ưu đãi ứng dụng (`APP_WALLET`), 2 mã ưu đãi thực tế (`REAL_CODE`: `PL5KSEP` và `TPCNEW20`).
- **Chuẩn hóa 3 CTA:** Link chính thức / tại quầy, nút xuất vé Zalo Pass 🍿, nút sao chép mã 1-chạm 📋 (`.btn-copy-code`).
- **Minh bạch cung ứng:** 0 ưu đãi tạm giữ (HELD), 0 ưu đãi hết hạn lọt vào danh mục công khai.

### Workstream 3: KTX Radar 30 Sản Phẩm Khảo Sát Thực Tế
- **Số lượng & Danh mục:** Đúng 30 sản phẩm công nghệ và học tập chia đều cho 6 danh mục thiết yếu (5 Ấm đun siêu tốc, 5 Quạt mini KTX, 5 Đèn học chống cận, 5 Chuột máy tính, 5 USB lưu trữ, 5 Sách giáo trình).
- **Minh bạch khảo sát:** Giá VND nguyên số, đơn vị khảo sát cụ thể (Phi Long Technology, Fahasa, Điện Máy Xanh, v.v.), URL chính hãng trực tiếp 100%.
- **Nhãn cảnh báo & Kiếm tiền:** Gắn nhãn *"Giá khảo sát thực tế — Kiểm tra tồn kho tại sàn"* và ghi nhận minh bạch *"Monetization pending publisher configuration"* (cam kết 0 doanh thu ảo).

### Workstream 4: Zalo Pass (Boarding Pass Canvas 600x750 & Tin Nhắn Kèo)
- **Đồ họa Boarding Pass:** Canvas HTML5 kích thước chuẩn 600x750px với gradient hiện đại, góc khuyết vé (ticket cutouts), vạch xé, mã vạch mô phỏng, số người tham gia, số tiền mỗi người chuyển, phân bổ số dư lẻ từng đồng VND.
- **Bảo vệ quyền riêng tư:** Zero-PII tuyệt đối, không lưu trữ thông tin cá nhân, không GPS.
- **Tương tác chia sẻ:** Hỗ trợ Web Share API, nút tải ảnh PNG về máy và nút sao chép nội dung tin nhắn rủ bạn.

### Workstream 5: Phi Chức Năng & Trải Nghiệm Thực Tế
- **Console & Runtime:** 0 lỗi console, 0 ngoại lệ chưa xử lý.
- **Chống tràn ngang:** 0 horizontal overflow trên cả 3 kích thước 1440px (Desktop), 768px (Tablet), 390px (Mobile) trên toàn bộ 4 màn hình chính (Hôm nay, Ví Voucher, KTX Radar, Split Bill Pro).
- **Khả năng tiếp cận:** Nút bấm tương tác đạt chuẩn tối thiểu 44x44px, độ tương phản chuẩn WCAG AA.

---

## 2. BẢNG BĂM CHỨNG CỨ VÀ TẬP TIN NIÊM PHONG (SHA-256)
| Tài liệu / Chứng cứ | Đường dẫn lưu trữ | SHA-256 Checksum |
| :--- | :--- | :--- |
| **Biên nhận nghiệm thu Staging** | `07_QUALITY_ASSURANCE/runtime_evidence/JAYT_363_STAGING_ACCEPTANCE_RECEIPT.json` | `b80956d6feafb2cb64c9cb632d1d63fe8b0fc7e9d90b67e4684d8179f93e3b47` |
| **Bản kê ứng viên v3.431.0** | `08_RELEASE_VAULT/candidates/v3.431.0-j363/candidate_manifest.json` | `1be94e5e2b3f9404813700e36f9f39a11d1fbb37533115ac686a2987e3b89fc6` |
| **Yêu cầu phát hành J363** | `08_RELEASE_VAULT/candidates/v3.431.0-j363/CANDIDATE_RELEASE_REQUEST_J363.md` | `703b7a746f258d8d4eb35b1354c8b26d3500de258ce4c3a1cff3938096796538` |
| **Ma trận 5 Cụm trường** | `06_TRUST_AND_EVIDENCE/j363_maximum_experience/CAMPUS_CLUSTERS_PROXIMITY_MATRIX.json` | `f62c9c53b3fe28c51277d3625d24f6eded44b588bcf66e27c66b88ef66defc97` |
| **Danh mục 30 KTX Radar** | `06_TRUST_AND_EVIDENCE/j363_maximum_experience/KTX_RADAR_PRODUCTS_CATALOG.json` | `cedfa2084d337c2b37fb2e0366bb2a937c17d54024bc1b7686bbbc7b951d76f4` |
| **Ma trận 34 Voucher** | `06_TRUST_AND_EVIDENCE/j363_maximum_experience/ACTIONABLE_VOUCHERS_MATRIX.json` | `40fa98a6ef014844531a00e8451af550fa5cd53425d6139132a5825898238956` |

*Ghi chú: Toàn bộ tập tin trên đã được đồng bộ nguyên bản (bit-for-bit parity) sang workspace thứ hai tại `D:/Công Việc MMO/OPC JayT/JayT-Dự-Án-Giá-Trị-Cộng-Đồng`.*

---

## 3. THẨM QUYỀN VÀ BƯỚC TIẾP THEO
1. **Trình duyệt Gemini:** Hồ sơ ứng viên `v3.431.0` và máy chủ Staging cổng `:4176` đã sẵn sàng 100% để đón nhận phiên thẩm định trải nghiệm chiến lược của Gemini (Gemini Strategic Experience Review).
2. **Kỷ luật Production:** Tuyệt đối giữ nguyên Production `v3.430.0` (`dpl_72b2G579GhCPSS7A6AoLHrypQa91`). Không triển khai hoặc chuyển đổi domain trước khi có phán quyết PASS từ Gemini và sắc lệnh ký duyệt Go-Live của Chủ tịch.
