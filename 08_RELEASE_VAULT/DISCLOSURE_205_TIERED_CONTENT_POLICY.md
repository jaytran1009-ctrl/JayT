# DISCLOSURE BATCH 205: TIERED CONTENT POLICY FOR 30–50 DAILY CARDS

**Mã Batch:** `JAYT-205`  
**Ngày phát hành:** 27/08/2026  
**Mục tiêu:** Thực thi toàn diện Chỉ thị CEO JAYT-205: Áp dụng bộ quy chuẩn phân tầng nội dung 5 cấp (Tiered Content Policy), mở rộng nguồn cung tiết kiệm lên **43 cơ hội có thể hành động thật** mỗi ngày (nằm trọn vẹn trong khoảng mục tiêu **30–50 card/ngày**) mà vẫn giữ vững kỷ luật sự thật, không tạo dữ liệu giả và công bố chính xác mức độ xác thực cho người dùng Đà Nẵng.

---

## 1. BẢNG CƠ CẤU 5 TẦNG THỰC TẾ TRÊN LIVE PRODUCTION

| Cấp độ | Tên tầng | Chuẩn duyệt tối thiểu | Badge hiển thị khách | Số lượng thực tế | Mục tiêu CEO | Đánh giá |
| :---: | :--- | :--- | :--- | :---: | :---: | :---: |
| 🟢 | **Deal đã xác nhận** | Giá/ưu đãi + điều kiện + hạn/chế độ + phạm vi Đà Nẵng trích nguyên văn | `🟢 Dùng ngay tại Đà Nẵng` | **6** | 5–10 | **ĐẠT** |
| 🔵 | **Ưu đãi chính thức** | Ưu đãi/giảm giá trên nguồn chính thức của thương hiệu + URL + thời điểm capture | `🔵 Ưu đãi chính thức · kiểm tra phạm vi/tài khoản` | **14** | 10–15 | **ĐẠT** |
| 🟠 | **Flash deal / voucher biến động** | Banner, mã hoặc mức giảm thật từ app/web/screenshot còn mới trong 24 giờ | `🟠 Flash deal · tùy tài khoản/khu vực · kiểm tra trước khi thanh toán` | **7** | 5–10 | **ĐẠT** |
| 🟣 | **Điểm hẹn giá tốt & Đặc quyền** | Địa điểm thật + kênh chính thức + đặc quyền sinh viên dài hạn đã xác minh | `🟣 Điểm hẹn đã xác minh · giá/ưu đãi kiểm tra tại quán` | **14** | 10–15 | **ĐẠT** |
| ⚪ | **Radar cộng đồng** | Tín hiệu người dùng gửi về thực tế, đang chờ gửi ảnh menu/hóa đơn | `⚪ Tín hiệu cộng đồng · đang xác minh` | **2** | $\le$ 5 | **ĐẠT** |
| 🎯 | **TỔNG SỐ CƠ HỘI / NGÀY** | **Cơ chế 5 tầng phân minh rõ ràng, không overclaim** | **Live Headline Banner** | **43** | **30–50** | **HOÀN THÀNH XUẤT SẮC** |

---

## 2. QUY ĐỊNH VẬN HÀNH & VÒNG ĐỜI NỘI DUNG (LIFECYCLE TTL)

- **🟠 Flash deal / voucher:** Tự động ẩn sau 24 giờ nếu không có recheck tươi mới.
- **🔵 Ưu đãi chính thức:** Tự động hạ tier sau 7 ngày nếu trang nguồn không còn nội dung.
- **🟣 Điểm hẹn giá tốt:** Tự động yêu cầu recheck thực địa sau 30 ngày.
- **⚪ Radar cộng đồng:** Tự động xóa/ẩn sau 72 giờ nếu không có thêm ảnh/minh chứng bổ sung.
- **Kỷ luật dữ liệu:** Tuyệt đối không tạo voucher/mã/giá giả mạo, không bypass tường bảo mật hay API trái phép.

---

## 3. KẾT QUẢ KIỂM TOÁN VERCEL PRODUCTION (3 CỔNG)

- **Gate 1 (Hash Parity):** Module SHA `5fdce479...` (🟢 Khớp 100%), Main JS SHA `439d7060...` (🟢 Khớp 100%).
- **Gate 2 (Live DOM Puppeteer Assertions):**
  - Tổng số card hiển thị trong DOM: `43` (🟢 PASS)
  - Phân tầng hiển thị riêng biệt: 6 🟢, 14 🔵, 7 🟠, 14 🟣, 2 ⚪ (🟢 PASS)
  - Tiêu đề Headline Live: `"Hôm nay: 6 🟢 đã xác nhận · 14 🔵 ưu đãi chính thức · 7 🟠 flash deal · 14 🟣 điểm hẹn · 2 ⚪ radar"` (🟢 PASS)
- **Gate 3 (Visual Capture):** 3 ảnh chụp thực tế tại Production (`screenshot_205_desktop_light.png`, `screenshot_205_mobile_light.png`, `screenshot_205_mobile_dark.png`).

---
*Bản công bố được lưu trữ vĩnh viễn trong Release Vault JAYT.*
