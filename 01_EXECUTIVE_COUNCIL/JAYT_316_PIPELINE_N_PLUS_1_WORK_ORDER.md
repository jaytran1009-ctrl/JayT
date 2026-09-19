# JAYT-316 — Work Order Pipeline N+1

**Trạng thái:** Discovery-only. Không cấp quyền network capture, render, feed mutation hay Production deploy.

## Đầu việc

1. **Data & Trust:** chuẩn hóa shortlist từ Batch 04 roadmap cho `B04_04`–`B04_08`, ưu tiên các track `B04_DIGITAL_03`, `B04_CITIZEN_01`, `B04_HEALTH_01`, `B04_EDUCATION_01`, `B04_GREEN_01`. Mỗi đề xuất phải có URL trang lá, ngày/niên hạn và exact span dự kiến.
2. **QA & Compliance:** kiểm tra từng đề xuất trước scope: không homepage, không archive hết hiệu lực, không span suy diễn, không pricing/voucher/affiliate/tracking.
3. **Product & Design:** duy trì một template T2/T3 phi thương mại, không bundle vào Staging cho tới khi CEO cấp `PUBLIC_APPROVED_STAGING_ONLY`.
4. **Engineering:** không sửa registry/card count; chuẩn bị hydrate theo registry để một mục pass độc lập có thể được thêm mà không ảnh hưởng 4 thẻ hiện tại.
5. **Growth:** xếp hạng giá trị người dùng Đà Nẵng của shortlist mà không biến đánh giá nhu cầu thành claim thực tế của nguồn.

## Deliverable liên bộ

Một `JAYT_316_BATCH_04_CANDIDATE_CONSENSUS.json` chỉ ở dạng proposal, gồm: slot, URL, recency evidence, exact span, rationale, review verdict Data & Trust/QA và `capture_authorized: false`.

## Bất biến

Staging giữ 4 thẻ; Production v3.420.0 giữ 3 thẻ; `deals_feed.json` là `[]`; voucher/affiliate/tracking vẫn khóa.
