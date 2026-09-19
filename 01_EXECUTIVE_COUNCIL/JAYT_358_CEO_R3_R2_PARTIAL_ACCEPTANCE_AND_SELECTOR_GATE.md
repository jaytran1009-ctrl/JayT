# JAYT-358-R3-R2 — Quyết định cổng CEO: containment được nhận, promotion selector bị giữ

Ngày 2026-09-08. Người thụ lý: Codex, CEO/Gatekeeper.

## Phán quyết

`R3_R2_CONTAINMENT_ACCEPTED__PROMOTION_AUTHORITY_HELD__R3_R3_SELECTOR_AND_BLOCK_HARDENING_REQUIRED`.

Nghiệm thu mixed-context tests, source preconditions, byte offsets và kết quả thực tế `0 VERIFIED / 10 HELD`. Không cấp quyền promotion authority cho contextual validator R3-R2.

## Bằng chứng đã xác minh độc lập

- Test receipt ghi 15/15 PASS; test và receipt sidecar SHA-256 khớp.
- Các test thật sự gọi cùng `evaluateCandidate`, gồm footer, store locator, image attribute, cross-block, unrelated-year, precondition và positive control.
- Staging feed giữ hash sealed v3.429.0; không có hydrate hay production mutation.

## Defect ngăn promotion

### Fallback `document` là fail-open về phạm vi block

Khi parser không có closed semantic container bao trùm title/price, `findEnclosingSemanticBlock` fallback sang toàn bộ document. Với block rộng này, locality/validity ở phần trang không liên quan có thể thỏa containment byte range. Cần fail closed (`HELD__SEMANTIC_BLOCK_NOT_FOUND`), không bao giờ dùng document fallback để xác nhận offer.

### Chọn title gần price hiện không có hiệu lực

`evaluateCandidate` tính `bestIdx` cho title nhưng gọi `findRawByteSpan(..., { searchStartChar: bestIdx })`; hàm này không dùng option đó và luôn trả về occurrence đầu tiên. Một title trong metadata/head hoặc card khác có thể được chọn sai, làm semantic block sai hoặc document fallback.

### Binding trong block còn quá rộng

Regex “áp dụng tại/chi nhánh/…” trong cửa sổ ±100 ký tự hoặc một `div.overview` lớn chưa tự chứng minh locality gắn với chính title/price candidate. Gate cần dùng cùng offer-card subtree (hoặc explicit shared offer identifier), không chỉ cùng page/container rộng.

Những defect này không làm 10 held item được promote; chúng chỉ ngăn bất kỳ verified decision tương lai nào dựa trên R3-R2.

## Phạm vi khóa

- 10 candidate vẫn `HELD__CLAIM_TO_SOURCE_SPAN_UNPROVEN`.
- Không staging hydration, candidate packaging, production deployment, alias/scheduler mutation hoặc rollback.
- Mọi artifact cũ append-only và không bị sửa.

## Lệnh N+1

J358-R3-R3 phải bỏ document fallback, thực thi occurrence selector, và chứng minh 5 claim thuộc cùng offer-card subtree / shared offer identifier. Test phải có: title metadata-vs-body duplicate, title/price ở hai cards khác nhau, no-semantic-block document fallback và locality clause của card khác cùng container. Chỉ sau CEO gate mới có thể phát `VERIFIED`.
