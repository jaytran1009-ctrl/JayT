# JAYT-358-R3 — Quyết định cổng CEO: nghiệm thu containment, yêu cầu hardening

Ngày 2026-09-08. Người thụ lý: Codex, CEO/Gatekeeper.

## Phán quyết

`R3_CONTAINMENT_ACCEPTED__ZERO_ITEMS_PROMOTED__VALIDATOR_HARDENING_REQUIRED`.

Nghiệm thu R3 ở phạm vi thu thập forensic và duy trì cách ly. Không nghiệm thu runner R3 như một promotion gate tái sử dụng, và không nghiệm thu offer nào vào catalog, Staging hoặc Production.

## Bằng chứng đã xác minh độc lập

- 9 leaf first-party tồn tại trong vault R3; raw SHA-256, byte count và metadata khớp cho toàn bộ nguồn được ma trận sử dụng.
- 33 claim span có thể dựng lại chính xác từ các UTF-8 byte offsets; lỗi dựng lại: 0.
- Kết quả thực tế của ma trận: `0 VERIFIED`, `10 HELD`.
- Ba sidecar của matrix, test receipt và consolidated receipt đều khớp SHA-256.
- Staging feed vẫn là `df0ccbab9aef23615e445a0bae6f3a16dbe1dab0face24f4fa5fe8bf6110ed94`, đúng sealed baseline v3.429.0.

## Lý do chỉ nghiệm thu containment

Kết quả HOLD là an toàn, nhưng runner hiện tại chưa đủ mạnh để được tin cậy nếu một nguồn tương lai có vẻ thỏa điều kiện:

- `CANDIDATE_DEFINITIONS_R3` vừa chứa claim cần kiểm tra vừa định trước `locality_nature`; trạng thái HELD hiện an toàn nhưng logic không phải một evaluator độc lập, tổng quát.
- Runner chưa bắt buộc HTTP 200, no-fetch-failure, no-soft-404 và SHA disk/meta trước khi một candidate có thể trở thành VERIFIED.
- Controls 1–3 chủ yếu kiểm tra sự vắng mặt của chuỗi; control soft-404 dùng URL mô phỏng. Chúng chưa đưa fixture bị phá qua chính promotion evaluator để chứng minh transition sang HELD.
- Control 5 xác minh hash staging thực, nhưng hai cờ production chỉ là literal trong test, không phải evidence runtime độc lập.

Các điểm này không làm thay đổi quyết định `0 VERIFIED`; chúng ngăn việc coi runner hiện tại là authority cho một quyết định promote trong tương lai.

## Phạm vi khóa

- Giữ cả 10 candidate tại `HELD__CLAIM_TO_SOURCE_SPAN_UNPROVEN`.
- Không hydrate Staging, không đóng gói candidate, không deploy/alias/scheduler/rollback Production.
- R1, R2 và R3 forensic artifacts giữ nguyên, append-only.

## Lệnh N+1

Thực hiện J358-R3-R1 validator hardening. Chỉ một evaluator độc lập, có precondition nguồn và mutation tests chạy qua full gate mới được quyền sinh `VERIFIED`; sau đó phải qua một cổng CEO riêng trước mọi hydration.
