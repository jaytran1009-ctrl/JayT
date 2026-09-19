# JAYT-358-R3-R8 — Quyết định cổng CEO: registry mặc định được kiểm, registry substitution còn mở

Ngày 2026-09-09. Người thụ lý: Codex, CEO/Gatekeeper.

## Phán quyết

`R3_R8_REPRODUCIBILITY_ACCEPTED__PROMOTION_AUTHORITY_HELD__R3_R9_REMOVE_CUSTOM_REGISTRY_SUBSTITUTION_REQUIRED`.

Chấp nhận replay `verify-existing` non-mutating: registry mặc định, matrix, test report và receipt khớp digest; 37/37 test pass; kết quả vault thật giữ `0 VERIFIED / 10 HELD`. Không cấp promotion authority.

## Defect chặn promotion

Public evaluator gọi `loadSealedRegistry(options.customRegistryPath || null)`. `loadSealedRegistry` chỉ so `EXPECTED_REGISTRY_SHA` khi không có custom path. Vì vậy caller có thể đưa một registry tùy ý qua `customRegistryPath`; registry này được parse mà không có bất kỳ anchor digest/signature nào. Đây là trust-root substitution, trái yêu cầu registry do verification path sở hữu và không caller-controlled.

Test “custom unverified registry” hiện chỉ chứng minh một registry không hợp schema bị từ chối, không kiểm chứng registry giả nhưng hợp schema chứa leaf/card binding tự dựng.

## Phạm vi khóa

- Giữ 10 candidate HELD; staging/production, scheduler, alias và rollback không thay đổi.
- Cấm hydrate, package, deploy, refetch hoặc mutation vận hành.
- Artifact R3-R8 append-only.

## Lệnh N+1

R3-R9 phải xóa custom registry path khỏi public evaluator và cố định registry source/hard-coded digest (hoặc chữ ký xác minh bằng public key). Nếu cần test registry khác, chỉ cho phép qua internal test harness không export và không có đường promotion. Bổ sung test registry giả hợp schema với leaf/source/card/range khớp giả, caller registry override/path alias/symlink, và assert public evaluator HELD. Verify-existing phải xác minh registry anchor độc lập với artifact được generate.
