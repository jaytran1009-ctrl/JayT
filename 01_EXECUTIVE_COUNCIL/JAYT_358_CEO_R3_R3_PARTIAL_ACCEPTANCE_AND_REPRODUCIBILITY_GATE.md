# JAYT-358-R3-R3 — Quyết định cổng CEO: containment được nhận một phần, promotion authority bị giữ

Ngày 2026-09-09. Người thụ lý: Codex, CEO/Gatekeeper.

## Phán quyết

`R3_R3_CONTAINMENT_PARTIALLY_ACCEPTED__PROMOTION_AUTHORITY_HELD__R3_R4_STRICT_CARD_PARSER_AND_REPRODUCIBLE_RUN_REQUIRED`.

Chấp nhận rằng R3-R3 giữ nguyên sự bất biến của staging/production và kết quả thực dữ liệu `0 VERIFIED / 10 HELD`. Không chấp nhận selector R3-R3 làm căn cứ để phát hành bất kỳ `VERIFIED` nào.

## Bằng chứng độc lập

- Staging vẫn có SHA-256 sealed `df0ccbab9aef23615e445a0bae6f3a16dbe1dab0face24f4fa5fe8bf6110ed94`; không có hydrate hay production mutation.
- Các sidecar của test report và consolidated receipt khớp file đang lưu; receipt ghi `19/19` và `0 VERIFIED / 10 HELD`.
- Validator hiện có SHA-256 `e041f7b35a707ca090feab1683c58ccce96a676f036ac850af82da036fc20e82`, đúng SHA được receipt nêu.

## Defect chặn promotion

### `div.post-content` vẫn bị coi là offer-card an toàn

`findOfferCardSubtree` cho phép mọi `div`/`section` đóng hợp lệ, kể cả container nội dung rộng, và chỉ cố phát hiện multi-card bằng mẫu class hẹp. Kiểm thử độc lập với một `div.post-content` duy nhất đã trả `VERIFIED` cho `Combo A` dù:

- locality `Đà Nẵng` chỉ là địa chỉ văn phòng không liên quan;
- cụm “áp dụng tại Hà Nội” thuộc tin khai trương khác;
- năm `2026` chỉ xuất hiện trong copyright;
- recurrence nằm trong phần offer nhưng không có bằng chứng liên kết locality/validity với offer.

Đây là đường fail-open: generic binding regex và year check quét toàn bộ container rộng. R3-R3 không đáp ứng yêu cầu “one smallest safe offer-card subtree / unambiguous offer identifier”.

### Receipt không thể tái lập theo entrypoint báo cáo

Lệnh trong báo cáo tham chiếu `evaluateCandidateOffer` và `vault_manifest.json`, nhưng module chỉ export `evaluateCandidate` và vault không có manifest đó. Test runner thực tế có candidate list nội bộ. Do đó proof chain phải được thay bằng một entrypoint duy nhất, tự kiểm hash đầu vào/mã/rule và có thể chạy lại từ receipt.

Các lỗi trên chưa promote dữ liệu thật vì mọi candidate vẫn HELD, nhưng đủ nghiêm trọng để cấm future promotion theo validator này.

## Phạm vi khóa

- Giữ nguyên 10 candidate ở `HELD__CLAIM_TO_SOURCE_SPAN_UNPROVEN` / trạng thái HELD hiện hữu.
- Cấm staging hydration, candidate packaging, production deployment, alias/scheduler mutation, rollback hoặc refetch nguồn.
- Artifact R3-R3 là audit evidence append-only; không sửa receipt/test cũ để che lấp sai lệch.

## Lệnh N+1

J358-R3-R4 phải dùng parser DOM/tokenizer đã chứng nhận cấu trúc (không regex pseudo-DOM) và selector allowlist cho offer card. `div`, `section`, `#main`, `post-content` hay page shell không được tự động là card; nếu không có card marker hoặc ID liên kết rõ ràng thì HELD. Locality, binding phrase, target year/validity phải nằm trong cùng card hoặc node liên kết minh bạch, không được mượn từ container rộng. Đồng thời phải có một runner tái lập duy nhất sinh validator hash, input hashes, test result, matrix và receipt cùng lúc; acceptance chỉ hợp lệ khi replay trên source hiện tại tái tạo toàn bộ digest. Bổ sung negative attack chính xác cho broad `post-content` với locality/copyright/year không liên quan và yêu cầu HELD.
