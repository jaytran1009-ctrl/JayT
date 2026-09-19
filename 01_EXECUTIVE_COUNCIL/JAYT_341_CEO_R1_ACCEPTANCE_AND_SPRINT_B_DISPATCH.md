# Quyết định CEO — JAYT-341 R1 và Sprint B

## Phán quyết R1

CEO chấp nhận kết quả deploy `v3.424.0-r1` là baseline Production hiện hành. Kiểm tra độc lập trên domain công khai xác nhận HTTP 200, runtime `v3.424.0`, 51 thẻ tổng, 24 thẻ công ích và 27 thẻ thương mại; `deals_feed.json` trả HTTP 200 với `[]`; không có console/runtime error hay tràn ngang tại kiểm tra CEO.

Baseline công nhận:

- Production: `v3.424.0-r1` (runtime `v3.424.0`), deployment `dpl_Ey7N7FGzDmNoJn9FFbnKRp64SL16`.
- Rollback standby: `v3.423.0`, deployment `dpl_9Gug4BDaBDxzpUXXAv1HrGAcLZmA`.
- Receipt Antigravity: `08_RELEASE_VAULT/JAYT_341_R1_PRODUCTION_DEPLOYMENT_RECEIPT.json`.

## Hiệu chỉnh QA bắt buộc

Receipt live dùng selector `.card` để đếm thẻ công ích, trong khi component thật dùng `.t2-pilot-card-section`; vì vậy receipt đã ghi `civicDomCount: 0` dù 24 thẻ thực sự render. CEO đã kiểm tra trực tiếp và xác nhận đúng 24 Evidence ID duy nhất. Antigravity phải sửa audit selector thành `.t2-pilot-card-section` hoặc selector gắn Evidence ID trước bất kỳ release tiếp theo; đây là cải thiện chứng từ QA, không phải lý do rollback R1.

## Dispatch Sprint B cho Antigravity

Antigravity triển khai một Full Feature Preview trên Staging tách biệt, hạn 48 giờ kể từ lệnh này, gồm đủ bốn module sau:

1. Voucher Vault ba tầng với tối thiểu 15 ưu đãi/chương trình có nguồn, điều kiện, hạn dùng, phạm vi địa bàn, cảnh báo ngân sách và raw evidence. Chỉ ưu đãi có mã nguồn công bố mới có nút Copy.
2. Split-Bill Pro chạy hoàn toàn trong browser, hỗ trợ tổng hóa đơn, số người, chia số dư VND và soạn tin nhắn để người dùng tự chia sẻ qua Zalo. Không đưa dữ liệu hoá đơn hoặc nhóm vào URL, storage từ xa hay backend.
3. Lịch tiết kiệm 7 ngày theo `Asia/Ho_Chi_Minh`, từng ngày gắn với dữ liệu ưu đãi đã kiểm chứng. Mục thiếu bằng chứng hiển thị trạng thái trống; không suy diễn quy luật tuần/tháng.
4. Smart Value Radar gồm tối thiểu 15 mục thiết yếu có model, giá quan sát, thời điểm, nguồn chính thức và trạng thái tồn kho theo nguồn. Không gắn affiliate/tracking khi chưa có phê duyệt riêng.

Antigravity bàn giao một gói Preview gồm URL Staging, source bundle, catalog chứng cứ, test/DOM/keyboard/mobile receipt và danh sách mục chưa đạt. Sprint B không có quyền deploy Production; CEO sẽ thẩm định gói sau khi Antigravity nộp.
