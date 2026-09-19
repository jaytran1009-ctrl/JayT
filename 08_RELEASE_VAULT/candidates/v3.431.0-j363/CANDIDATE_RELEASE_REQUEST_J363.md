# YÊU CẦU ĐÁNH GIÁ VÀ PHÊ DUYỆT ỨNG VIÊN PHÁT HÀNH v3.431.0 (JAYT-363)
**Kính gửi:** Hội đồng Điều hành OPC JayT & Ban Kiểm Định Chiến Lược Gemini  
**Mã hồ sơ:** CANDIDATE_RELEASE_REQUEST_J363  
**Phiên bản ứng viên:** `v3.431.0`  
**Thời điểm niêm phong:** 2026-09-09T07:36:26.268Z  
**Môi trường thử nghiệm:** Staging Preview `http://127.0.0.1:4176` (Cổng độc quyền :4176)  
**Trạng thái triển khai Production:** ❌ CHƯA CẤP PHÉP (`production_deployment_authorized: false`) — Production giữ nguyên `v3.430.0` (`dpl_72b2G579GhCPSS7A6AoLHrypQa91`).

---

## 1. MỤC TIÊU & PHẠM VI JAYT-363 MAXIMUM EXPERIENCE
Thực thi toàn diện chỉ thị `WORK_ORDER_J363_MAXIMUM_EXPERIENCE.json` dưới thẩm quyền Chủ tịch JAYT-363:
1. **Workstream 1 — Time-Aware Bento Hub & 5 Cụm Trường Đại Học (First Viewport):**
   - Đặt Bento Hub tại vị trí trên cùng trang chủ (First Viewport, trên nếp gấp màn hình), hiển thị ngay lập tức không cần cuộn.
   - 5 khung giờ thời gian tự động thích ứng: Sáng (07:00-11:00), Trưa cứu đói (11:00-14:00 ≤35k), Chiều học bài & DanaBus (14:00-18:00), Tối phim & kèo bạn (18:00-23:00), Đêm khuya & sáng mai (23:00-07:00).
   - Hỗ trợ tiêm đồng hồ kiểm thử qua `window.__JAYT_CLOCK__` và API `window.setJaytClock(timeStr)`.
   - Bộ lọc 5 cụm trường (Bách Khoa, Sư Phạm, Kinh Tế DUE, Duy Tân, Ngoại Ngữ) + Tất cả: chuyển đổi dữ liệu tức thì trong bộ nhớ với độ trễ ghi nhận < 20ms (đo kiểm bằng `performance.now()` và ghi log vào `window.__BENTO_LATENCY_LOG__`).
2. **Workstream 2 — Danh Mục 34 Ưu Đãi Hành Động (Actionable Vouchers):**
   - Đạt 34 ưu đãi hành động thực tế (vượt chỉ tiêu tối thiểu 30).
   - 0 ưu đãi hết hạn, 0 ưu đãi tạm giữ (HELD) lọt vào danh mục hành động công khai.
   - Chuẩn hóa 3 loại CTA: Link chính thức / xem tại quầy, Vé Kèo Zalo Pass 🍿, Sao chép mã ưu đãi 1-chạm 📋 (`PL5KSEP`, `TPCNEW20`).
3. **Workstream 3 — KTX Radar 30 Sản Phẩm Khảo Sát Thực Tế:**
   - Đúng 30 sản phẩm công nghệ và học tập thiết yếu chia đều 6 danh mục (5 Ấm đun siêu tốc, 5 Quạt mini KTX, 5 Đèn học chống cận, 5 Chuột máy tính, 5 USB lưu trữ, 5 Sách giáo trình).
   - Đơn vị khảo sát thực tế, URL chính hãng sạch 100%, giá VND nguyên số, gắn nhãn minh bạch: *"Giá khảo sát thực tế — Kiểm tra tồn kho tại sàn"*.
   - Chính sách kiếm tiền: Ghi nhận minh bạch *"Monetization pending publisher configuration"*, cam kết 0 doanh thu ảo.
4. **Workstream 4 — Zalo Pass (Boarding Pass Canvas 600x750 & Tin Nhắn Kèo):**
   - Vẽ vé rủ bạn dạng vé lên máy bay hiện đại trên HTML5 Canvas (600x750) với góc khuyết vé, vạch xé, thông tin số người, số tiền mỗi bạn chuyển, phân bổ số dư lẻ từng đồng VND.
   - Tuyên bố Zero-PII: Không lưu trữ thông tin cá nhân, không GPS.
   - Hỗ trợ Web Share API, nút tải ảnh PNG về máy và nút sao chép nội dung tin nhắn rủ bạn.
5. **Workstream 5 — Phi Chức Năng & Trải Nghiệm Thực Tế:**
   - 0 lỗi console, 0 lỗi runtime JavaScript.
   - 0 tràn ngang (zero horizontal overflow) trên cả 3 kích thước: 1440px Desktop, 768px Tablet, 390px Mobile.
   - Mục tiêu chạm tối thiểu 44x44px, độ tương phản màu chuẩn WCAG AA.

---

## 2. BẢNG BĂM TÍCH HỢP TẬP TIN ỨNG VIÊN (CANDIDATE ARTIFACTS SHA-256)
| Tên tập tin | Kích thước (bytes) | SHA-256 Checksum |
| :--- | :--- | :--- |
| `index.html` | 12949 | `6b9f88a614ff275dcfc897f01f4295ee7e138f89728cdc98bffa660d582a42b5` |
| `jayt_storefront_sprint_b.js` | 274547 | `550574c884afa53798e20174d6c977eaa67eea1c3814defb9417865769a2db75` |
| `styles.css` | 75703 | `de46452be14e138fa6a05c16e11e753ac5f573036604bd854e83e55a26cbe3a2` |
| `deals_feed.json` | 115015 | `7bc8b005ba210b07fa4dea0e2a3a02dfcbdb2604536bebaf56de0a468e86987c` |
| `registry.json` | 48380 | `89b51757dc6d0a2df8dba712cbee5e3427f1dd626e3539ba5c38275f5ed69e04` |
| `rollback_manifest.json` | 474 | `f30195f190e2e096b8e11c4b086c21c161609e910eb9cf0e65a75d5760c7b4c0` |

---

## 3. LỆNH CẤM & ĐIỀU KIỆN PHÁT HÀNH
- Tuyệt đối KHÔNG triển khai lên môi trường Production hoặc thay đổi alias Vercel cho đến khi có phán quyết PASS từ Gemini Strategic Experience Review và sắc lệnh ký duyệt Go-Live riêng của Chủ tịch.
- Mọi hoạt động kiểm thử chỉ được diễn ra trên máy chủ Staging Preview cổng `:4176`.
