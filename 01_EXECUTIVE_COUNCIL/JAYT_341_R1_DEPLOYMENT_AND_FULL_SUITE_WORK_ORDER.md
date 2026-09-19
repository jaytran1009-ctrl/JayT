# JAYT-341 — Lệnh CEO giao Antigravity

Thẩm quyền: Chỉ thị trực tiếp JAYT-341 của Chủ tịch. Codex chịu trách nhiệm nghiệm thu và điều phối; Antigravity chịu trách nhiệm triển khai, kiểm thử và bàn giao chứng từ. Đây là lệnh thi công có hiệu lực, không phải tờ trình xin phê duyệt lại.

## A. Deploy r1 — thực hiện trước, bàn giao trong 30 phút từ lúc nhận lệnh

- `is_approved: true`, `deployment_permitted: true`, `deployment_authorized: true` chỉ áp dụng cho candidate `08_RELEASE_VAULT/candidates/v3.424.0-r1/` đã được Chủ tịch phê duyệt.
- Manifest SHA-256 bắt buộc: `fa32477934f92af35827f874361c687a830afd0f148f57af927f63f8d187af48`.
- Đối chiếu các artifact với `08_RELEASE_VAULT/JAYT_339_V3424_R1_RESEALED_FINGERPRINTS.json`; giữ nguyên chứng từ lịch sử. Thẩm quyền mới nằm trong lệnh này, không sửa manifest niêm phong để đổi cờ cũ.
- Deploy bản sao nguyên gói lên `https://jayt-production-v3420.vercel.app`. Mã r1 là revision đóng gói; runtime vẫn khai báo v3.424.0 theo bundle đã ký.
- Hậu kiểm qua domain công khai: `/`, `/registry.json`, `/deals_feed.json` đều HTTP 200; feed parse đúng []; đối chiếu hash nội dung served với bundle; xác minh 24 ID công ích và 27 ID thương mại thực sự render trong các màn hình tương ứng, tại 1440/768/390px. Không thay bằng kiểm tra số lượng biến trong bộ nhớ.
- Kiểm tra bàn phím, 0 console/runtime error, 0 overflow, liên kết nguồn sạch, 4 mục loại trừ vắng mặt. Nếu cổng bắt buộc thất bại, rollback về v3.423.0, deployment `dpl_9Gug4BDaBDxzpUXXAv1HrGAcLZmA`, và xác minh khôi phục.
- Xuất `08_RELEASE_VAULT/JAYT_341_R1_PRODUCTION_DEPLOYMENT_RECEIPT.json` và receipt hậu kiểm riêng, ghi thời gian thật, deployment ID, hash, kết quả từng cổng. Chỉ cập nhật baseline sau hậu kiểm PASS; nối giao dịch PROJECT_MEMORY.md. Cập nhật monitor hiện có sang baseline đã nghiệm thu và đích rolling riêng, tránh ghi đè receipt phát hành.

## B. Sprint Full Feature Preview — bàn giao một gói trong 48 giờ

Ngay sau hậu kiểm r1, triển khai cả bốn module trong workspace Staging tách biệt. Kiểm kê tính năng đang có trước khi mở rộng để tái sử dụng Search/Filter, renderer và công cụ tính hiện hành. Quyền deploy trên chỉ dành cho r1; gói tính năng mới bàn giao dưới dạng Preview.

| Module | Đầu ra cụ thể | Điều kiện nghiệm thu |
|---|---|---|
| Voucher Vault | Ba tầng Deal quầy, Quyền lợi thương hiệu, Voucher app; tối thiểu 15 ưu đãi/mã thật theo lô từ các thương hiệu chỉ định | Chỉ hiện nút Copy khi nguồn công bố mã cụ thể; ưu đãi không có mã hiện cách nhận tại quầy/app. Có điều kiện, địa bàn, hạn dùng, thời điểm kiểm tra, cảnh báo ngân sách và bằng chứng nguồn. Kiểm tra clipboard thành công/thất bại; không tự tạo mã. |
| Split-Bill Pro | Nhập tổng hóa đơn, số người; chia tiền; tạo và sao chép tin nhắn để người dùng chia sẻ qua Zalo, kèm link JayT | Tính VND bằng số nguyên, tổng các phần bằng hóa đơn; xử lý số người bằng 0, số âm, nhập sai và số dư. Tính in-memory; không truyền/lưu hóa đơn hoặc thông tin nhóm qua URL, analytics hay backend. Không tự gửi tin; hỗ trợ sao chép khi thiết bị không hỗ trợ chia sẻ. |
| Lịch tiết kiệm 7 ngày | Bảy ngày Thứ Hai–Chủ Nhật, lọc ưu đãi theo ngày và điều kiện, liên kết nguồn | Dùng múi giờ Asia/Ho_Chi_Minh. Metiz 55K, Happy Day, Culture Day là các mục phải kiểm chứng quy luật ngày/tuần/tháng và ngoại lệ trước khi hiển thị. Không chuyển Culture Day thành mọi Thứ Tư nếu nguồn chỉ quy định một ngày trong tháng. Ngày thiếu dữ liệu có trạng thái trống rõ ràng. Đây là lịch ưu đãi, không tự tuyên bố lịch suất chiếu đồng bộ khi chưa có nguồn. |
| Smart Value Radar | 15 thiết bị thiết yếu, lọc theo nhu cầu KTX/học tập, link nguồn chính thức | Có sản phẩm/model, giá quan sát, thời điểm, nguồn và trạng thái tồn kho theo nguồn; chưa rõ phải ghi chưa xác minh. Chỉ công bố mức giảm khi có giá đối chiếu hợp lệ. Link chính thức không đồng nghĩa có hợp đồng đối tác; không tự gắn affiliate/tracking. |

Cho phép discovery và thu thập nguồn công khai chính thức phục vụ hai catalog 15 mục và lịch ưu đãi theo lô; lưu raw/headers/timestamp/hash và điều kiện áp dụng. Không vượt đăng nhập, chống bot hay dùng cache tìm kiếm thay raw chứng cứ. Hồ sơ HELD chỉ được mở lại khi có bằng chứng mới đủ điều kiện. Số lượng là chỉ tiêu nghiệm thu, không phải quyền bịa dữ liệu; nếu thiếu phải báo số đạt, nguồn lỗi và phần thiếu trong cùng gói.

## C. Bàn giao và giám sát

Antigravity ghi nhận thời điểm nhận lệnh để tính hạn 30 phút/48 giờ. Bàn giao theo hai mốc: receipt deploy r1; sau đó một Full Feature Preview chứa đủ bốn module, URL Staging, catalog bằng chứng, ma trận test chức năng/HTTP/DOM/bàn phím/mobile và danh sách thiếu sót còn lại. Kiểm thử tự động phải được ghi đúng là tự động, không giả chứng thực Narrator hoặc máy người dùng thật.

CEO nghiệm thu dựa trên sản phẩm và chứng từ của Antigravity. Khi r1 PASS, sprint B tự động tiếp tục theo lệnh này, không cần xin chỉ thị mới. Phiên bản full-suite lên Production cần quyết định phát hành cho bundle mới sau nghiệm thu Preview.
