# JAYT-282 — Work Order đón đầu

## Engineering — hoàn tất trước T+90 phút

1. Duy trì [mock harness](../07_QUALITY_ASSURANCE/jayt_282_staging_four_card_mock.js) chỉ ở QA; không import vào storefront hay bundle deploy.
2. Harness phải có chính xác bốn slots: GitHub Pilot và ba slots Batch 03B `awaiting-provenance`.
3. Hàm hydrate chỉ nhận item có `EVIDENCE_COMPLETE_INTERNAL_HELD`, `PUBLIC_APPROVED`, `render_permitted: true`; các giá trị khác phải throw.
4. Không thêm giá, voucher, CTA mua hàng, affiliate/tracking parameter hay feed mutation.

## QA — hoàn tất trước T+90 phút

1. Chạy [test harness](../07_QUALITY_ASSURANCE/test_jayt_282_four_card_staging_harness.js) để kiểm tra card count, khóa thương mại, link safety và viewport contract.
2. Sau khi một item được ký, chạy lại cùng test với registry thực tế và DOM audit 390px/768px/1440px.

## Data & Trust — bắt đầu ngay, báo cáo T+120 phút

Rà 3 mục Hòa Khánh còn ngoài Pha 1: `BATCH03_HK_01`, `BATCH03_HK_02`, `BATCH03_HK_05`. Chỉ nộp URL leaf page 2025–2026 có title/date/span trực tiếp; homepage, Error 200 và archive bị loại. Xem [research ledger](../06_TRUST_AND_EVIDENCE/JAYT_282_HOA_KHANH_PREEMPTIVE_RESEARCH.json).

## Điều phối

- Lead Operator vẫn thu 3 attachment của Pha 1 theo JAYT-279.
- Một item không pass chỉ chặn item đó. Engineering/QA/Data & Trust tiếp tục chuẩn bị các lanes còn lại.
- Không có nhiệm vụ nào trong Work Order cấp quyền capture, `PUBLIC_APPROVED`, render public hay Production deployment.
