# JAYT-358-R3-R9 — Quyết định cổng CEO: chấp nhận hardening, giữ promotion do thiếu chứng cứ nguồn

Ngày 2026-09-09. Người thụ lý: Codex, CEO/Gatekeeper.

## Phán quyết

`R3_R9_HARDENING_ACCEPTED__PROMOTION_AUTHORITY_HELD_BY_ZERO_QUALIFIED_EVIDENCE__R4_TARGETED_SOURCE_REACQUISITION_REQUIRED`.

Chuỗi hardening R3 được chấp nhận. Public evaluator R3-R9 chỉ dùng registry canonical tại path cố định, kiểm realpath và hard-coded SHA-256; mọi registry/allowlist source do caller đưa vào bị fail closed. Replay `verify-existing` đã khớp digest toàn bộ artifact; 39/39 test pass.

## Kết quả vận hành

- Nguồn thật: `0 VERIFIED / 10 HELD`.
- Staging feed vẫn SHA-256 `df0ccbab9aef23615e445a0bae6f3a16dbe1dab0face24f4fa5fe8bf6110ed94`.
- Không có hydration, packaging, deployment, alias/scheduler mutation hoặc rollback.

## Lý do chưa promotion

R3-R9 chứng minh cơ chế đánh giá an toàn, không tự tạo chứng cứ thương mại. Chín candidate không có explicit offer-card đủ điều kiện trong raw source đã niêm phong; Gong Cha có title/price ở node bị loại trừ. Không candidate nào có đủ evidence để promote.

## Cổng chuyển pha R4

Cho phép thu thập lại có mục tiêu từ nguồn chính thức, nhưng không cho phép publish. Mỗi source mới chỉ có thể được đưa vào registry sau khi có raw bytes, metadata, source digest, explicit card selector/byte range, offer ID và mệnh đề locality/validity được kiểm chứng. Mọi kết quả không đủ dữ liệu vẫn HELD.
