# JAYT-370 — Tiếp nhận và cấp quyền thi công

Ban hành: 10/09/2026, 12:43:25 Asia/Ho_Chi_Minh.

CEO tiếp nhận JAYT-370 và cấp quyền triển khai trực tiếp Production, kích hoạt affiliate bằng cấu hình đối tác thực của JayT, cùng thu hồi các môi trường Preview cũ. Các lệnh giới hạn Staging, cấm Production và cấm affiliate trước đây được thay thế trong phạm vi sắc lệnh này. Không yêu cầu thêm một sắc lệnh phát hành chung.

Lệnh thực thi: `04_DATA_PIPELINE/dispatch/WORK_ORDER_J370_EXECUTIVE_ENFORCEMENT.json`. Đích duy nhất cho người dùng là `https://jayt-production-v3420.vercel.app`, project `prj_YzcODtsWLzPWaIVItzd4K6QEWERm`. Antigravity là đơn vị thi công; hạn yêu cầu là 00:43:25 ngày 11/09/2026, tức 12 giờ từ lúc phát dispatch. Chưa có xác nhận bắt đầu của Antigravity trong lượt này.

Nguồn ưu đãi được tiếp nhận theo URL chính hãng, screenshot trang chi tiết thật và văn bản điều khoản có hash. Không yêu cầu selector DOM tĩnh, không yêu cầu mọi ưu đãi có mã copy. Mục tiêu là ít nhất 20 ưu đãi đủ nội dung áp dụng và 30 SKU có liên kết đối tác thật. Cấp quyền không đồng nghĩa đã có capture, publisher ID, giá hiện hành hoặc hoa hồng phát sinh.

Khi thu hồi Preview, lưu artifact nội bộ rồi ngừng phục vụ URL cũ; việc bỏ SSO phải gắn với thu hồi để không đưa fixture thử nghiệm ra công khai. Hostname hạ tầng tự sinh của Vercel cần được ghi nhận đúng giới hạn nhà cung cấp. QA chạy local và hậu kiểm trên domain Production; không tạo Preview mới.

Gói Production phải hợp nhất giao diện Porcelain và công cụ tương tác với dữ liệu hiện hành, không đẩy feed rỗng của simulator đè lên feed Production. Snapshot rollback và hậu kiểm live là bước thi công trong quyền đã cấp. Mọi thiếu hụt cấu hình affiliate hoặc bằng chứng phải nêu rõ từng mục để giải quyết, không báo hoàn tất dựa trên chỉ tiêu hay trạng thái cờ.
