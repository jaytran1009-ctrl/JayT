# JAYT-286 — Lệnh tác chiến mở rộng pipeline Cohort 1 & 2

**Hiệu lực:** ngay khi ban hành · **Môi trường:** Staging-only · **CEO ký:** 04/09/2026

## Phạm vi được giao

| Cohort | Mục tiêu | Đơn vị chịu trách nhiệm |
| --- | --- | --- |
| 1 — Hòa Khánh | `BATCH03_HK_01`, `HK_02`, `HK_03`, `HK_05`, `HK_06` | Data & Trust + Lead Operator |
| 2 — An Thượng | `BATCH03_AT_01`, `AT_02`, `AT_03`, `AT_04`, `AT_05` | Data & Trust + Lead Operator |

`HK_04` (học bổng 2025) và `HC_07` (Tết 2026) được đóng sổ khỏi pipeline công bố hiện hành. Data & Trust phải tìm trang lá thay thế: (a) lịch Cầu Rồng cuối tuần đang hiệu lực từ nguồn thành phố và (b) thông báo hỗ trợ/học bổng sinh viên năm học 2026 còn nhận hồ sơ.

## Chuỗi thi hành bắt buộc

1. **T+2 giờ — leaf-page discovery:** chỉ ghi URL nguồn chính thức, ngày xuất bản/cập nhật, đoạn văn bản chứng minh và lý do phù hợp. Homepage, URL placeholder, trang lỗi 200, archive hết hạn và nội dung thương mại đều bị loại.
2. **Sau khi CEO ghi nhận từng URL trong scope:** Lead Operator tải một HTTP GET không xác thực cho từng leaf-page từ máy trạm sạch; nạp `<TARGET>.operator.raw.html` và `<TARGET>.operator.metadata.json` vào vault JAYT-279. Header phải redact cookie/token/authorization; body nguyên byte; hash SHA-256 và offset UTF-8 bắt buộc khớp.
3. **Data & Trust:** chạy `validate_jayt_279_operator_raw_attachments.js` hoặc bản validator scope mở rộng cùng quy tắc; kết quả hợp lệ là `EVIDENCE_COMPLETE_INTERNAL_HELD`, chưa phải public approval.
4. **CEO + Engineering:** chỉ CEO mới cấp `PUBLIC_APPROVED_STAGING_ONLY` từng mục; Engineering chỉ render card đã ký. Cấm giá, voucher, CTA mua, affiliate/tracking, mutate `deals_feed.json`, hoặc deploy Production.

## KPI và cơ chế dừng

Mục tiêu 18:00 là 6–8 thẻ Staging **nếu và chỉ nếu** đủ raw provenance, còn hiệu lực và có chữ ký CEO từng mục. Mục thiếu leaf-page hoặc fail validator bị cách ly độc lập; không kéo lùi toàn cohort, cũng không được thay bằng dữ liệu suy diễn.

**Bất biến:** Production `v3.419.0` khóa; `deals_feed.json = []`; voucher = 0; affiliate = false.
