# JAYT-361 — Áp dụng quy chuẩn nghiệm thu và lệnh thi công

Codex CEO/Gatekeeper tiếp nhận JAYT-361. Quy định mới thay thế yêu cầu selector tĩnh và cho phép chuẩn bị candidate v3.430.0 song song với việc thu thập bằng chứng Batch 19. Không cần mã chữ để hiển thị hoặc nghiệm thu ưu đãi quầy, hội viên, app/ví.

Đã ban hành `04_DATA_PIPELINE/dispatch/WORK_ORDER_J361_SMART_ACCELERATOR.json`. Antigravity được phép tạo vault ảnh mới, đối soát văn bản điều khoản, hydrate staging và đóng gói tại `08_RELEASE_VAULT/candidates/v3.430.0-j361/`. Mục tiêu là ít nhất tám ưu đãi gốc Batch 19 và ít nhất mười ưu đãi mới tổng cộng, bổ sung The Coffee House và Popeyes. Không cộng lặp 15 Radar hiện hữu vào 87 định danh.

Ba hành động hiển thị: mã có chứng cứ → Copy; ưu đãi quầy/hội viên → xem điều kiện; app/ví → liên kết chính thức để nhận ưu đãi. Thẻ thiếu mã hoặc không đọc được bằng selector vẫn hiển thị theo loại nguồn phù hợp. Trạng thái VERIFIED yêu cầu bằng chứng hỗ trợ điều khoản; ảnh chụp và SHA xác minh artifact, không tự chứng minh nội dung đúng hoặc còn hiệu lực.

Kiểm tra ban đầu: vault J360 chưa có ảnh PNG; timeline cũ ghi Starlight U22 có khác biệt 45k và mức Đà Nẵng 55k. Cần đối soát chênh lệch này khi chụp nguồn mới. Số 10.000đ của Galaxy/ShopeePay cũng cần phân biệt là giá phải trả hay lợi ích voucher trước khi đưa vào phép chia hóa đơn. Nghiệm thu số học trước đây không xác minh được ý nghĩa của giá.

Sửa metadata Vercel dùng project `jayt-production-v3420`, ID `prj_YzcODtsWLzPWaIVItzd4K6QEWERm`. Metadata mới được ghi trực tiếp trong dispatch; các gói đã niêm phong được giữ làm lịch sử.

Điều 3 JAYT-361 quy định Gemini kiểm toán PASS rồi Chủ tịch ký mở cổng. Vì vậy lệnh hiện tại cho phép thi công và đóng gói; xuất bản production v3.430.0 chờ hai bước đó. Batch 19 chưa được đổi sang VERIFIED trong phiên này vì chưa có bộ ảnh/điều khoản mới được đối soát. Hồ sơ này là lệnh triển khai quy chuẩn, không phải tuyên bố hoàn tất Go-Live.
