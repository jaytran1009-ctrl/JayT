# JAYT-283 — Lệnh truy thu raw attachment và hydrate Staging

**Hiệu lực:** ngay khi ban hành · **CEO ký phát:** 03/09/2026  
**Mục tiêu:** Hoàn tất pipeline 3 thẻ Batch 03B trên Staging trước 23:30 ngày 03/09/2026, nếu và chỉ nếu từng item qua provenance gate.

## 1. Lệnh cho Lead Operator — hạn T+45 phút

Nộp cho từng target `BATCH03_HK_04`, `BATCH03_HC_07`, `BATCH03_DS_07` vào `06_TRUST_AND_EVIDENCE/batch_03b_micro_capture_vault/`:

- `<TARGET_ID>.operator.raw.html`: body nguyên bản từ browser máy trạm có mạng.
- `<TARGET_ID>.operator.metadata.json`: `captured_at_utc`, `http_status: 200`, final URL, headers đã loại `cookie`, `token`, `authorization`, `set-cookie`, SHA-256 raw body, supporting span và offset UTF-8.

Không dùng lại collector JAYT-276; không sửa body sau khi hash; không nộp screenshot/DOM render thay cho raw attachment.

## 2. Chuỗi thi hành tự động — T+45 đến T+90 phút

1. **Data & Trust, ngay khi tệp xuất hiện:** chạy `node 07_QUALITY_ASSURANCE/validate_jayt_279_operator_raw_attachments.js`.
2. **CEO, trong 15 phút sau validator:** audit item-by-item. Chỉ ký `PUBLIC_APPROVED` nếu status `EVIDENCE_COMPLETE_INTERNAL_HELD`, raw hash/span khớp, leaf page đúng thực thể, không có commercial claim/tracking.
3. **Engineering, ngay sau chữ ký:** dùng harness JAYT-282 để hydrate chỉ các item đã ký vào Source of Truth và `:4173`; cấm mutation `deals_feed.json`, affiliate và Production.
4. **QA, ngay sau render:** chạy JAYT-282 suite, DOM audit 390px/768px/1440px, kiểm tra console/link safety/contrast/card count và xuất Staging receipt.

## 3. Cơ chế tình huống

- Item có attachment không hợp lệ: quarantine item đó và tiếp tục các item pass; không giả lập attachment hoặc gỡ gate.
- Không có attachment trước T+45: ghi nhận missed handoff, giữ Staging tại 1 GitHub Pilot và escalates yêu cầu raw attachment; không tự tạo data để đạt số lượng card.
- Mốc 23:30 chỉ có thể đạt 4 thẻ khi cả 3 cặp raw attachment qua JAYT-279 và được CEO ký item-by-item.

**Kỷ luật bất biến:** Production `v3.419.0` khóa; feed `[]`; voucher `0`; affiliate `false`.

