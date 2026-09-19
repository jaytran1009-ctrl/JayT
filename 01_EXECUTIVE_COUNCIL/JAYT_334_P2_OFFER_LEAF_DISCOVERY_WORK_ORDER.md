# JAYT-334 — P2 Offer Leaf Discovery Work Order

## Mục tiêu

Khởi động Luồng 2 trên sáu thương hiệu đã có bằng chứng địa bàn hiện hành: Phúc Long, Jollibee, Phi Long, CGV, Galaxy Cinema và Metiz Cinema. Chỉ tìm ứng viên ưu đãi mới, có giá trị độc lập và không trùng 23 thẻ thương mại đang phục vụ trên Production v3.423.0.

## Phân công

- **Data & Trust:** đối chiếu trang lá chính thức, ngày hiệu lực/hết hạn, điều kiện áp dụng, phạm vi chương trình và verbatim text span. Mỗi đề xuất phải ghi rõ URL chuẩn, thời điểm quan sát, policy/offer ID và quan hệ chống trùng lặp với registry v3.423.0.
- **Product:** phân loại đề xuất thành `COUNTER_DEAL`, `BRAND_PROGRAM` hoặc `VALUE_RADAR`; không gán nhãn voucher nếu nguồn không công bố mã voucher thật.
- **QA:** loại các trang chủ, trang danh mục không có điều kiện cụ thể, nguồn hết hạn, nội dung không chứng minh ưu đãi, hoặc đề xuất trùng card/source URL hiện hành.
- **Engineering:** chuẩn bị schema validator cho hồ sơ discovery; không gọi mạng, không ghi raw vault và không hydrate ở Work Order này.

## Tiêu chí đầu ra

Xuất một shortlist tối đa 12 ứng viên, ưu tiên 2–3 ứng viên tốt nhất trên mỗi nhóm rạp phim, F&B và bán lẻ/công nghệ. Mỗi dòng phải có đủ: `candidate_id`, `brand_id`, `official_leaf_url`, `observed_at_utc`, `published_or_effective_date`, `expiry_or_review_date`, `verbatim_span`, `conditions`, `locality_basis`, `dedup_verdict`, `commercial_surface` và `risk_flags`.

Ứng viên thiếu niên hạn hoặc không chứng minh trực tiếp điều kiện/giá trị phải mang trạng thái `HELD__INSUFFICIENT_OFFER_EVIDENCE`; không được lấp số lượng bằng suy diễn.

## Rào chắn

- `capture_authorized: false`
- `public_approved: false`
- `render_permitted: false`
- `production_deploy_permitted: false`
- Không tạo voucher code, giá, hạn dùng, tồn kho hay phạm vi địa bàn không có trong nguồn.
- Production v3.423.0 và rollback v3.422.0 giữ nguyên.

## Điều kiện chuyển cổng

Chỉ các dòng vượt qua pre-audit và không trùng registry mới được trình Cố vấn Chiến lược/Chủ tịch để cấp Targeted Ingress Scope riêng. Bốn thương hiệu unresolved (Lotte Cinema, Điện Máy Xanh, Highlands Coffee, Lotteria) tiếp tục ở nhánh locality remediation, không được kế thừa địa bàn.
