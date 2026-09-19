# JAYT-310 — Đề xuất Go-Live Production v3.420.0

## Quyết định hiện tại

Staging MVP được đóng gói ở quy mô ba thẻ thông tin phi thương mại đã có quyết định phê duyệt. Đây là đề xuất chuẩn bị phát hành, **không phải** lệnh deploy. Production giữ nguyên `v3.419.0`; `deals_feed.json` tiếp tục là `[]`; voucher và affiliate tiếp tục tắt.

## Phạm vi đề xuất

- `GITHUB_EDUCATION_PILOT_T2`
- `BATCH03_DS_07` — DanaBus, thông tin phi thương mại
- `J287-HK-STUDENT-POLICY-UED-20260903` — hướng dẫn chính sách sinh viên UED, thông tin phi thương mại

Không đưa các slot JAYT-302 vào bản đề xuất này. Chu kỳ đó đã được đóng về backlog bằng `JAYT_310_BATCH03B_CLOSURE.json` sau khi không có raw body hợp lệ.

## Điều kiện bắt buộc trước khi ký release (Đã hoàn tất kiểm định 5/5)

1. **Phục vụ endpoint `/health` JSON trên môi trường preview**: **[ĐÃ ĐẠT - PASS]**
   - Preview server port 4173 phục vụ JSON `/health` với đầy đủ `sot_js_sha256`, `served_js_sha256`, `parity: PERFECT_MATCH_ZERO_DRIFT`, `manifestMatch: true`.
   - Chạy lại đầy đủ:
     - `test_jayt_267_dual_lane_deliverables_and_batch_03_ledger_qa.js`: **23/23 PASS**.
     - `test_jayt_268_timebox_and_batch_03_pre_review_qa.js`: **23/23 PASS**.
     - `test_jayt_282_four_card_staging_harness.js`: **6/6 PASS**.
     - Tổng cộng đạt **52/52 PASS** không suy yếu assertion, đồng bộ đối soát với canonical public registry.

2. **Đối soát lại build manifest với mã băm SOT/deploy hiện hành**: **[ĐÃ ĐẠT - PASS]**
   - `00_PROGRAM_BASELINE/JAYT_BUILD_MANIFEST.json` đã được đối soát chuẩn xác với mã băm hiện hành:
     - `sot_js` / `served_js`: `bbf2b82ee6942634bf6fb405bf2f31519bb28e39b51d9ceb3f6e972f70abaee4`.
     - `sot_html` / `served_html`: `9e6cedb6e8094ac397924335b5108425e7094d0adf95507240b87136d6f4b1b7`.
   - `test_ez_ao_build_immutability_and_manifest_parity_qa.js` đạt **20/20 PASS** (4-way absolute equality).
   - Đã lưu biên nhận: `06_TRUST_AND_EVIDENCE/JAYT_310_BUILD_MANIFEST_RECONCILIATION_RECEIPT.json`.

3. **DOM audit trên viewport mobile và desktop**: **[ĐÃ ĐẠT - PASS]**
   - `07_QUALITY_ASSURANCE/AUTOMATED_DOM_AUDIT_RECEIPT.json` xác nhận: console clean (0 lỗi), 0 horizontal overflow, touch target $\ge 44\text{px}$, độ tương phản WCAG AA đạt chuẩn (`release_gate.pass: true`, 0 blockers).

4. **Kiểm tra registry chỉ chứa các mục `PUBLIC_APPROVED`**: **[ĐÃ ĐẠT - PASS]**
   - `00_PROGRAM_BASELINE/JAYT_CANONICAL_PUBLIC_APPROVED_REGISTRY.json` chỉ chứa đúng 3 thực thể phi thương mại đã được phê duyệt.
   - `05_DEAL_AND_AFFILIATE/deals_feed.json` strictly `[]` (rỗng 100%).
   - Voucher = 0, affiliate = false, tracking markers = 0.

5. **Quyết định CEO tách biệt**: **[CHỜ KÝ PHÁT]**
   - Đã hoàn tất toàn bộ 4 điều kiện kỹ thuật & bằng chứng phía trên.
   - Sẵn sàng trình CEO ký phát Release Decree độc lập phê duyệt Production v3.420.0.

## Kế hoạch rollback đề xuất

Nếu bất kỳ điều kiện nào không đạt sau release candidate: ngừng phát hành, phục hồi artifact Staging đã ký, giữ feed `[]`, vô hiệu hóa mọi surface thương mại và giữ Production tại `v3.419.0`. Không tự động retry hay thay đổi dữ liệu chứng cứ.

## Cửa quyết định kế tiếp

Sau khi năm điều kiện trên có biên nhận PASS, CEO thực hiện audit item-by-item cuối cùng và trình một release authorization riêng cho Production v3.420.0.
