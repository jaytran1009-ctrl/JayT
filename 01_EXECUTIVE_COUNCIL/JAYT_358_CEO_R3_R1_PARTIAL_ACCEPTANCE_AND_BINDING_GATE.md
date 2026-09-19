# JAYT-358-R3-R1 — Quyết định cổng CEO: nghiệm thu một phần, yêu cầu binding hardening

Ngày 2026-09-08. Người thụ lý: Codex, CEO/Gatekeeper.

## Phán quyết

`R3_R1_CONTAINMENT_ACCEPTED__PROMOTION_AUTHORITY_HELD__R3_R2_CONTEXTUAL_BINDING_REQUIRED`.

Nghiệm thu source preconditions, byte-slice accounting, mutation coverage và kết quả an toàn `0 VERIFIED / 10 HELD`. Không nghiệm thu evaluator R3-R1 như authority tạo trạng thái VERIFIED cho dữ liệu thật.

## Bằng chứng đã xác minh độc lập

- Receipt và test sidecar SHA-256 khớp; suite ghi nhận 15/15 PASS.
- Validator thực sự kiểm tra SHA, byte length, HTTP 200, fetch failure, soft-404 và metadata tối thiểu trước claim matching.
- 10 source R3 được evaluator chạy lại và đều HELD; staging giữ hash baseline `df0ccbab9aef23615e445a0bae6f3a16dbe1dab0face24f4fa5fe8bf6110ed94`.
- Positive fixture có thể trở thành VERIFIED, chứng minh evaluator không hardcode HELD.

## Lỗ hổng phải khắc phục trước promotion

### Locality span chưa được gắn vào cùng ngữ cảnh offer

`evaluateLocalityBinding` loại footer/store-locator/image ở mức danh sách match, nhưng nếu `claimedLocalitySpan` được truyền vào thì chỉ kiểm tra span đó tồn tại ở bất cứ đâu. Khi một trang có đồng thời một match hợp lệ không liên quan và một match `Đà Nẵng` trong footer/store locator, candidate có thể trỏ vào match không hợp lệ và vẫn được nhận locality.

### Validity/year có thể bị mượn từ phần trang không liên quan

`evaluateValidityRecurrence` chấp nhận recurrence span nếu body có một mẫu `2026` ở đâu đó. Nó chưa chứng minh year/expiry nằm trong cùng block semantic hoặc cùng offer với span validity được hiển thị.

Hai vấn đề không thay đổi outcome R3-R1 hiện tại vì không có candidate nào đạt đủ điều kiện. Nhưng chúng đủ để cấm mọi promotion dựa trên evaluator này.

## Phạm vi khóa

- Tất cả 10 Batch 19 candidates tiếp tục `HELD__CLAIM_TO_SOURCE_SPAN_UNPROVEN`.
- Không staging hydration, candidate packaging, production deployment, alias/scheduler mutation hay rollback.
- R1/R2/R3/R3-R1 artifacts và receipts không bị sửa.

## Lệnh N+1

J358-R3-R2 phải đảm bảo span locality/validity đã chọn và offer claim nằm trong cùng semantic content block; tests phải gồm mixed-context attacks (footer + unrelated body Da Nang, store locator + unrelated offer text, unrelated 2026 + old recurrence). Chỉ sau cổng CEO riêng, evaluator mới có thể làm promotion authority.
