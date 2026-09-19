# JAYT-358-R1 — Quyết định cổng CEO: nghiệm thu một phần

Ngày 2026-09-08. Người thụ lý: Codex, CEO/Gatekeeper.

## Phán quyết

`CONTAINMENT_ACCEPTED__BATCH19_PROMOTION_HELD__R2_PROVENANCE_REPLAY_REQUIRED`.

Nghiệm thu phần bảo toàn forensic, loại Batch 19 khỏi Staging hành động, phát hiện soft-404, loại `mockHtml` fallback, và giữ Production v3.429.0 không đổi. Biên nhận R1 là chứng cứ của **biện pháp khắc phục**, không phải phê chuẩn 10 mục vào catalog hay Production.

## Lý do chưa nhận 10 mục VERIFIED

`run_batch19_remediation_harvester.cjs` vẫn tạo `candidateItems.push({... verification_status: 'VERIFIED' ...})` bằng trường dữ liệu soạn sẵn. Nó không trích xuất hay kiểm tra span bắt buộc cho giá, điều kiện, hiệu lực và địa bàn trước khi gắn VERIFIED.

Ví dụ, raw Pizza Company có các giá 315.000, 479.000 và 599.000, nhưng runner không chứng minh trong máy rằng tiêu đề combo, hạn áp dụng và chi nhánh Đà Nẵng đi kèm đúng cùng chứng cứ. Do đó SHA của trang chứng minh byte trang, chưa chứng minh toàn bộ claim đã công bố. Đây là thiếu provenance mapping, không phải cáo buộc các giá này sai.

## Phạm vi khóa

- 10 ứng viên R1: `HELD__CLAIM_TO_SOURCE_SPAN_UNPROVEN`.
- 11 ứng viên HELD giữ nguyên; không giảm mức cách ly.
- Không hydrate R1 vào Staging, không tạo candidate, không deploy/alias/rollback Production.
- Freshness Guardian tiếp tục monitor hạ tầng. Chỉ nhận trạng thái validity là HEALTHY khi metadata của card có liên kết chứng cứ và span/điều kiện còn hiệu lực.

## Lệnh N+1

Antigravity thực hiện đúng dispatch `WORK_ORDER_J358_R2_CLAIM_PROVENANCE_REPLAY.json` và nộp receipt. CEO sẽ quyết định riêng từng mục VERIFIED hoặc HELD trên receipt đó.
