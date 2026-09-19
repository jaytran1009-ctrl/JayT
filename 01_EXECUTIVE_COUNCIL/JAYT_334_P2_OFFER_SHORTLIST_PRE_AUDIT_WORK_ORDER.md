# JAYT-334 — P2 Offer Shortlist Independent Pre-Audit Work Order

## Phạm vi

QA và Data & Trust thực hiện tiền kiểm độc lập bảy ứng viên mang trạng thái `PRE_AUDIT_PASS__READY_FOR_STRATEGIC_SCOPE_REVIEW` trong `JAYT_334_P2_OFFER_LEAF_DISCOVERY_SHORTLIST.json`.

Các ứng viên được chuyển cổng gồm: `P2O_CGV_FANC_2026`, `P2O_GALAXY_MEMBER_2026`, `P2O_GALAXY_ZALOPAY_REWARDS_2026Q3`, `P2O_GALAXY_SHOPEEPAY_SEP_2026`, `P2O_GALAXY_JCB_WEEKEND_2026Q3`, `P2O_PHILONG_LENOVO_STUDENT_2026` và `P2O_PHILONG_HP_BTS_2026`.

## Kiểm tra bắt buộc

1. Xác nhận URL thuộc miền chính thức và là trang lá, không phải trang kết quả tìm kiếm hoặc danh mục.
2. Xác nhận chương trình còn hiệu lực tại ngày thẩm định; gắn cảnh báo TTL cho ba chương trình Galaxy kết thúc ngày 30/09/2026.
3. Đối chiếu điều kiện, hạn mức, phương thức thanh toán, model áp dụng và giới hạn quà; không rút gọn làm thay đổi nghĩa.
4. So trùng theo `source_url`, `brand_id`, policy/offer identity và nội dung với registry Production v3.423.0.
5. Xác nhận locality basis chỉ chứng minh nơi thương hiệu hoạt động; không suy diễn tồn kho hoặc giá tại từng cơ sở.

## Các mục không được chuyển cổng

- CGV birthday tháng 05/2026: thông báo theo tháng đã hết hạn.
- Metiz member policy: có mốc năm nội bộ không nhất quán và giao thoa với thẻ U22 hiện hữu.
- Jollibee Combo 69K: xung đột với lần capture có thẩm quyền trước đó đã chuyển hướng về homepage.
- Phúc Long 99K: chưa chứng minh hiệu lực hiện tại.
- Phúc Long Member Benefits: trùng chính xác thẻ Production hiện hữu.

## Đầu ra

Xuất verdict item-by-item. Chỉ dòng vượt đủ năm kiểm tra mới được đưa vào gói trình Cố vấn Chiến lược xin Targeted Ingress Scope. Không Work Order nào trong bước này cấp quyền tải raw bytes.

## Khóa vận hành

`capture_authorized=false`; `public_approved=false`; `render_permitted=false`; `production_deploy_permitted=false`. Production v3.423.0 và rollback v3.422.0 giữ nguyên.
