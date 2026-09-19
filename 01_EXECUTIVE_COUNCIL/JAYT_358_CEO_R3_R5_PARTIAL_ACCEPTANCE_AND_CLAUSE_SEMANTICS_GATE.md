# JAYT-358-R3-R5 — Quyết định cổng CEO: replay được nhận, promotion authority tiếp tục bị giữ

Ngày 2026-09-09. Người thụ lý: Codex, CEO/Gatekeeper.

## Phán quyết

`R3_R5_REPRODUCIBILITY_ACCEPTED__PROMOTION_AUTHORITY_HELD__R3_R6_CARD_ID_AUTHENTICITY_AND_CLAUSE_SEMANTICS_REQUIRED`.

Chấp nhận chế độ `verify-existing` không ghi đè: replay xác nhận matrix, test report và receipt byte-for-byte, `25/25` test pass, staging giữ baseline và 10 candidate thật vẫn `0 VERIFIED / 10 HELD`. Không cấp quyền phát `VERIFIED` cho R3-R5.

## Bypass đã xác minh độc lập

Validator vẫn trả `VERIFIED` với HTML sau về mặt cấu trúc:

- container `div.post-content deal-card data-offer-id="deal-abc"`;
- `Đà Nẵng` chỉ là câu du lịch;
- một ưu đãi khác áp dụng tại Hà Nội xuất hiện trong cùng paragraph;
- recurrence và năm 2026 bị ghép từ nội dung thương hiệu không liên quan.

`deal-abc` chỉ đúng regex, không phải bằng chứng ID card-scoped có tính xác thực. Đồng thời regex locality cho phép thứ tự “Đà Nẵng ... áp dụng tại Hà Nội”, còn validity chấp nhận bất kỳ `2026` nào trong clause. Vì broad shell được phép khi mang class card + ID hợp schema, mọi evidence không liên quan trong shell có thể được nâng thành VERIFIED.

## Phạm vi khóa

- Giữ nguyên 10 candidate HELD và shortfall policy.
- Cấm staging hydration, packaging, production deployment, scheduler/alias mutation, rollback và refetch.
- Receipt R3-R5 chỉ là evidence append-only; không được sửa hồi tố.

## Lệnh N+1

R3-R6 phải cấm vô điều kiện broad/page shell theo class/tag đã biết, dù chứa class card hay ID. Mọi ID promotion phải có authentic mapping từ metadata/capture manifest niêm phong, không chỉ pass pattern. Locality clause phải liên kết có hướng offer-binding với chính target locality và phải bác bỏ địa danh đối kháng; validity clause phải thể hiện chính sách hiệu lực với 2026, không chỉ đồng xuất hiện năm. Thêm regression chính xác của bypass trên, yêu cầu HELD; verify-existing vẫn mặc định và non-mutating.
