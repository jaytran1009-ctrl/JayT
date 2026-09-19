# JAYT-333 — Accelerated Commercial Unlock Work Order

**Phạm vi:** Commercial Staging `:4176`; Production `v3.422.0` không thay đổi.

## Track A — Inherited Locality

- Chạy Store Locator Matrix một lần cho toàn lô.
- Chỉ áp dụng kế thừa địa bàn cho Jollibee, Phi Long và Phúc Long khi locator có địa chỉ cơ sở Đà Nẵng và SHA-256 raw source.
- Kế thừa địa bàn chỉ chứng minh thương hiệu có cơ sở. Không suy diễn tồn kho, giá tại từng cơ sở, phụ phí hay khả năng áp dụng mọi ưu đãi.

## Track B — Voucher & Value Radar UI

- Hiển thị ba tầng: Deal quầy; Mã/Quyền lợi thương hiệu; Voucher app/mã ẩn.
- Tầng thiếu mã thật phải hiện trạng thái trống; cấm tạo mã minh họa.
- Radar hiển thị giá quan sát, thời điểm, nguồn chính thức và cảnh báo kiểm tra lại giá/tồn kho.
- `affiliate_url` tiếp tục `null`; không gắn tham số tracking trong giai đoạn pilot.

## Track C — Release Readiness

- Mục tiêu nghiệm thu Staging: ít nhất 20 thẻ đủ điều kiện địa bàn, DOM sạch ở 1440/768/390px.
- Chuẩn bị Release Candidate `v3.423.0` ở trạng thái chờ Sắc lệnh M4.
- Không deploy Production trong Work Order này; rollback chuẩn là `v3.422.0`.
