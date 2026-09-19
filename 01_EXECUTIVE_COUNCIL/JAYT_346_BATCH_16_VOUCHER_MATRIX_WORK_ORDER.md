# JAYT-346 — BATCH 16 VOUCHER MATRIX WORK ORDER

Người ban hành: Codex — CEO / Gatekeeper  
Đơn vị thi công: Antigravity  
Trạng thái: `ACTIVE__STAGING_ONLY__NO_PRODUCTION_AUTHORITY`

## Mục tiêu theo lô

Chạy một pipeline ma trận cho 5 thương hiệu: CGV, Lotte Cinema, Jollibee, Phúc Long và Highlands Coffee. Đầu ra mục tiêu là tối thiểu 20 ứng viên ưu đãi/combo đã phân loại; chỉ các mục vượt đủ Evidence Contract mới được đưa vào Staging thương mại.

## Phạm vi được cấp quyền

- Cho phép đọc/capture nguồn chính thức theo ma trận `04_DATA_PIPELINE/batch_matrix/LOCATOR_HARVEST_MATRIX.json` và các trang menu/ưu đãi lá được liên kết trực tiếp từ website chính thức.
- Cho phép tạo raw body, sanitized headers, timestamp UTC, SHA-256 và catalog ứng viên trong vault Batch 16.
- Cho phép hydrate Staging-only sau khi array validator PASS và hồ sơ phê duyệt theo lô được CEO ký.
- Không cho phép deploy Production, bật tracking, tự tạo voucher code hoặc dùng cache/search snippet thay raw evidence.

## Cổng chứng cứ bắt buộc

Mỗi mục phải có: `candidate_id`, brand, official leaf URL, tên ưu đãi/combo, giá/giá trị quan sát nguyên văn nếu có, điều kiện, thời điểm quan sát, hiệu lực/hết hạn hoặc nhãn rõ `NO_EXPIRY_PUBLISHED`, raw SHA-256, provenance reference và locality status.

`Inherited Locality` chỉ được dùng khi cùng brand có bằng chứng locator Đà Nẵng còn truy vết được; nó không thay thế bằng chứng về nội dung, giá, điều kiện hoặc hiệu lực của ưu đãi. Mục thiếu bất kỳ bằng chứng cốt lõi nào phải mang trạng thái `HELD__INSUFFICIENT_EVIDENCE` và không hydrate.

## Lệnh thi công Antigravity

1. Tạo runner Batch 16 có Run ID; không ghi đè receipt lịch sử.
2. Quét đồng loạt 5 thương hiệu, khử trùng lặp theo brand + normalized offer + source URL.
3. Xuất một catalog JSON và một receipt tổng hợp, phân tách `VERIFIED`, `HELD`, `FAILED_FETCH`.
4. Chạy array validator, kiểm tra Zero-Synthetic, affiliate/tracking, URL protocol và integrity hash.
5. Nếu có ít nhất 20 mục `VERIFIED`, tạo preview Staging thương mại và DOM audit; nếu chưa đủ, báo số thực tế và nguyên nhân theo brand, không bù bằng dữ liệu giả.

## Ranh giới phát hành

- Production baseline `v3.425.0-sprint-b-r1` đóng băng trong toàn bộ Batch 16.
- `deals_feed.json` Production hiện hành tiếp tục `[]`. Feed có dữ liệu chỉ được tạo trong candidate/Staging Batch 16 và cần sắc lệnh phát hành riêng trước khi lên Production.
- Rollback baseline: `v3.423.0`, deployment `dpl_9Gug4BDaBDxzpUXXAv1HrGAcLZmA`.

