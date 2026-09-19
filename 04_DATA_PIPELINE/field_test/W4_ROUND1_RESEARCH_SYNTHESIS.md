# Wave 4 — Tổng hợp nghiên cứu khả dụng Round 1

**Nguồn:** sáu biên bản ẩn danh đã đồng thuận, được kiểm tra bằng `validate_w4_round1_results.cjs` ngày 2026-09-12.  
**Phạm vi:** đánh giá khả năng hoàn thành tác vụ; đây không phải khảo sát đại diện hay đo lường mức hài lòng định lượng.

## Kết quả tin cậy

- 6/6 biên bản hợp lệ, có đồng thuận, không có trường PII/GPS/tài khoản.
- 6/6 hoàn thành ba tác vụ: bàn tính bữa trưa, mô phỏng xếp chồng KTX, và tra cứu Spotify/DanaBus.
- Không có biên bản nào báo cáo sự cố quyền riêng tư.

## Chủ đề phát hiện

1. **Nhãn “tự nhập/mô phỏng” được hiểu đúng.** Một sinh viên nêu rõ công cụ không bị hiểu là giá live trên ứng dụng; đây là tín hiệu tích cực cho cách diễn đạt hiện tại.
2. **Tác vụ so sánh có giá trị cho cả hai nhóm.** Phản hồi sinh viên và nhân viên văn phòng đều mô tả việc nhập giá/đối chiếu là trực quan.
3. **Điều kiện sinh viên cần tiếp tục hiển thị ngay cạnh lợi ích.** SheerID của Spotify và việc giữ giá cũ DanaBus được người dùng nhận biết đúng.
4. **Tín hiệu mobile ban đầu ổn.** Một người tham gia báo không tràn ngang ở 390px; đây là quan sát định tính, không thay thế kiểm thử thiết bị có đo đạc.

## Khuyến nghị trước Round 2

- Giữ nhãn “dữ liệu bạn tự nhập” ngay phía trên kết quả bàn tính.
- Giữ nội dung DanaBus về biểu giá ở trạng thái hold, không suy diễn giá hiện hành.
- Giữ xác thực SheerID và giới hạn thời hạn ngay trong card Spotify.
- Round 2 chỉ thu thập sau đồng thuận; dùng cùng schema ẩn danh và không suy rộng kết quả 6 người thành tổng thể Đà Nẵng.

## Ranh giới

Kết quả không cấp quyền thay đổi Production, không chứng minh ưu đãi thương mại, và không cấp quyền affiliate/tracking/sub-ID.
