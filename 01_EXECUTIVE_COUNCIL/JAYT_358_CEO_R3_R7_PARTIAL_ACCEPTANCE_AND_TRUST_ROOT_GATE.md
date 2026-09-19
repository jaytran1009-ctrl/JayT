# JAYT-358-R3-R7 — Quyết định cổng CEO: caller injection đã chặn, trust root chưa được cưỡng chế

Ngày 2026-09-09. Người thụ lý: Codex, CEO/Gatekeeper.

## Phán quyết

`R3_R7_REPRODUCIBILITY_ACCEPTED__PROMOTION_AUTHORITY_HELD__R3_R8_REQUIRE_SEALED_METADATA_CONTEXT`.

Chấp nhận replay `verify-existing`: R3-R7 tái tạo artifact/sidecar byte-for-byte, 35/35 test pass và dữ liệu thật vẫn `0 VERIFIED / 10 HELD`. Không cấp promotion authority.

## Defect chặn promotion

R3-R7 chỉ kiểm `validMetadataHashes` khi option này được caller truyền vào. Khi gọi evaluator mà không truyền option, một metadata giả có source SHA đúng, leaf ID tự đặt và `offer_card_manifest` tự dựng được chấp nhận. Kiểm thử độc lập đã nhận `VERIFIED` từ mapping giả, dù metadata không thuộc receipt hay vault niêm phong.

Nói cách khác, runner có thể bảo vệ replay của nó, nhưng API evaluator vẫn không tự cưỡng chế trust root. Điều này trái yêu cầu “only sealed metadata/manifest bytes loaded from the same leaf”.

## Phạm vi khóa

- Giữ nguyên 10 candidate HELD, staging/production bất biến.
- Cấm hydrate, package, deployment, scheduler/alias mutation, rollback và refetch.
- Artifact R3-R7 append-only.

## Lệnh N+1

R3-R8 phải yêu cầu sealed-metadata context bắt buộc trong evaluator, không optional. Context phải được nạp từ registry/receipt hash allowlist bất biến do runner sở hữu, không do caller cung cấp; mapping metadata missing/forged/unregistered phải HELD. Tách API public thành high-level evaluator tự load/verify sealed leaf và internal pure function không export cho promotion. Bổ sung test gọi public evaluator không context, metadata giả đúng source SHA, allowlist caller giả, và path traversal/leaf substitution; tất cả phải HELD. Positive control phải dùng fixture registry niêm phong độc lập.
