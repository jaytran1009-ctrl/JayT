# JAYT-358-R3-R6 — Quyết định cổng CEO: replay được nhận, trust boundary bị vi phạm

Ngày 2026-09-09. Người thụ lý: Codex, CEO/Gatekeeper.

## Phán quyết

`R3_R6_REPRODUCIBILITY_ACCEPTED__PROMOTION_AUTHORITY_HELD__R3_R7_REMOVE_CALLER_AUTH_INJECTION_REQUIRED`.

Chấp nhận replay `verify-existing` non-mutating: artifact và sidecar R3-R6 khớp byte/digest, 29/29 test pass, staging không đổi và 10 candidate thật vẫn `0 VERIFIED / 10 HELD`. Không cấp promotion authority.

## Defect chặn promotion

`authenticateCardIdentifier` chấp nhận `candidate.authenticated_offer_id` như một authenticity proof. Candidate là input của evaluator, không phải sealed capture metadata/manifest. Do đó caller có thể tự thêm:

```text
authenticated_offer_id: "deal-2026-combo-a"
```

và biến một thẻ `.deal-card` không có `meta.authenticated_offer_ids` thành `VERIFIED`. Kiểm thử độc lập đã tái tạo kết quả này; output còn ghi rõ `mapping_key: "candidate.authenticated_offer_id"`.

Đây là crossing trust boundary, trái với yêu cầu ID phải được chứng thực bởi mapping niêm phong. Các test R3-R6 không có negative case chống caller-supplied authentication nên `29/29` không đủ chứng minh promotion safety.

## Phạm vi khóa

- Không staging hydration, packaging, deployment, alias/scheduler mutation, rollback hoặc refetch.
- 10 candidate thật giữ HELD; mọi artifact R3-R6 giữ append-only.

## Lệnh N+1

R3-R7 phải loại bỏ hoàn toàn candidate-controlled authentication. Chỉ metadata/manifest niêm phong đã hash cùng raw leaf được phép xác thực ID. Mapping phải ràng buộc ít nhất leaf ID, raw source SHA, DOM card selector/byte range và authenticated offer ID. Thêm negative test caller injection với meta mapping rỗng, forged metadata mapping/hash mismatch, và ID hợp schema nhưng map cho byte-range/card khác; tất cả phải HELD. Chỉ evidence sourced from sealed inputs được đưa vào receipt.
