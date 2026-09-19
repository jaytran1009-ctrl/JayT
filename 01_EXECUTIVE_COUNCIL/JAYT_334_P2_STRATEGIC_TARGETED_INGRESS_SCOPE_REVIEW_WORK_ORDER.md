# JAYT-334 — P2 Strategic Targeted Ingress Scope Review Work Order

## Trình Cố vấn Chiến lược

Đề nghị thẩm định việc cấp Targeted Ingress Scope riêng cho đúng bốn ứng viên đã vượt tiền kiểm độc lập:

1. `P2O_GALAXY_MEMBER_2026`
2. `P2O_GALAXY_SHOPEEPAY_SEP_2026`
3. `P2O_PHILONG_LENOVO_STUDENT_2026`
4. `P2O_PHILONG_HP_BTS_2026`

## Phạm vi xin xem xét

- Mỗi ứng viên chỉ được cấp tối đa một lượt capture có định danh riêng nếu Cố vấn và Chủ tịch phê duyệt.
- Tệp đầu ra dự kiến gồm raw body nguyên bản, headers đã làm sạch, UTC timestamp và SHA-256 nhị phân.
- Validator phải kiểm tra nguyên văn TTL, điều kiện, hạn mức/model áp dụng và các cảnh báo hết ngân sách/hết quà.
- Galaxy–ShopeePay phải hiển thị rõ yêu cầu claim voucher trong ứng dụng, thời hạn 30/09/2026 và khả năng kết thúc sớm; tuyệt đối không công bố một mã voucher do hệ thống tự tạo.
- Hai chương trình Phi Long phải giữ danh sách model áp dụng; locality không được dùng để suy diễn tồn kho tại từng showroom.

## Ba mục tiếp tục HELD

- `P2O_CGV_FANC_2026`: direct leaf timeout trong hai lần tiền kiểm.
- `P2O_GALAXY_ZALOPAY_REWARDS_2026Q3`: trang trực tiếp hiện chỉ trả `common:Updating` và không có điều khoản ưu đãi.
- `P2O_GALAXY_JCB_WEEKEND_2026Q3`: direct leaf rơi vào redirect loop.

Không dùng search result hoặc cache discovery để thay thế raw evidence. Muốn mở lại ba mục trên phải có URL chính thức khả dụng hoặc bằng chứng Lead Operator được cấp scope riêng.

## Trạng thái quyền hạn

Văn bản này là hồ sơ trình duyệt, không phải Ingress Authorization: `capture_authorized=false`, `public_approved=false`, `render_permitted=false`, `production_deploy_permitted=false`.

Production v3.423.0 (47 thẻ) và rollback v3.422.0 giữ nguyên.
