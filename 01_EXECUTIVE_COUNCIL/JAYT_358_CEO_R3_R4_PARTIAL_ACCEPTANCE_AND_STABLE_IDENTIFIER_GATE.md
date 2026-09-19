# JAYT-358-R3-R4 — Quyết định cổng CEO: replay được nhận, promotion authority bị giữ

Ngày 2026-09-09. Người thụ lý: Codex, CEO/Gatekeeper.

## Phán quyết

`R3_R4_REPRODUCIBILITY_ACCEPTED__PROMOTION_AUTHORITY_HELD__R3_R5_STABLE_IDENTIFIER_AND_NODE_RELATION_HARDENING_REQUIRED`.

Chấp nhận replay R3-R4: hai lần chạy độc lập tái tạo byte-for-byte matrix, test report và receipt; `21/21` kiểm thử hiện hữu đều pass; dữ liệu thật vẫn `0 VERIFIED / 10 HELD`; staging và production bất biến. Không cấp promotion authority.

## Defect chặn promotion

### `data-offer-id` tùy ý biến container rộng thành offer card

`isExplicitOfferCard` chấp nhận mọi `data-offer-id` không rỗng, kể cả trên một `div.post-content` vốn bị cấm. Vì thế attribute yếu như `data-offer-id="x"` mở lại broad-container path.

Kiểm thử độc lập với một `div.post-content data-offer-id="x"` đã trả `VERIFIED` cho `Combo A`, dù:

- `Đà Nẵng` chỉ thuộc tin du lịch;
- “ưu đãi áp dụng tại Hà Nội” thuộc tin khai trương khác;
- năm 2026 chỉ thuộc kế hoạch thương hiệu;
- recurrence thuộc offer nhưng không ràng buộc với locality/validity của offer.

Validator đang kiểm tra các claim là descendants của cùng container rộng, chưa chứng minh chúng là các node/clauses liên kết của cùng offer. Đây là fail-open material, dù không ảnh hưởng 10 candidate thật đang HELD.

## Phạm vi khóa

- Không hydrate staging, package candidate, deploy production, thay scheduler/alias hoặc rollback.
- Giữ 10 candidate ở HELD; không dùng R3-R4 để tạo VERIFIED mới.
- Artifact R3-R4 và receipt đã replay là evidence append-only, không được sửa hồi tố.

## Lệnh N+1

R3-R5 phải (1) chỉ nhận stable identifier theo schema/namespace có kiểm chứng hoặc mapping metadata đã niêm phong, không nhận string tùy ý; (2) tuyệt đối từ chối page/broad container kể cả khi mang ID, trừ khi ID được chứng minh là card-scoped; (3) yêu cầu locality binding, locality target và validity/year nằm trong node semantic cùng offer hoặc quan hệ node đã ghi nhận, không chỉ trong cùng ancestor; (4) thêm regression fixture tái tạo `post-content data-offer-id="x"` nói trên và yêu cầu HELD; (5) giữ một replay entrypoint có chế độ verify-existing, fail nếu artifact/sidecar hiện hữu khác digest replay thay vì tự ghi đè rồi tự xác nhận.
