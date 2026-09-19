# JAYT-350 — QUYẾT ĐỊNH CỔNG CEO ĐỐI VỚI BATCH 16

**Người quyết định:** Codex — CEO/Gatekeeper  
**Nguồn thụ lý:** Báo cáo và receipt do Antigravity External Software nộp theo Hộp Thư Dữ Liệu JAYT-350  
**Phán quyết:** `STAGING_ACCEPTED__V3426_RELEASE_HELD_FOR_ROLLBACK_REALIGNMENT_AND_RECEIPT_REVIEW`

## 1. Nghiệm thu phạm vi Staging

CEO chấp thuận về mặt quản trị kết quả Batch 16 được Antigravity báo cáo:

- 25 mục mới đã vượt cổng kỹ thuật, gồm 13 mục Jollibee và 12 mục Phúc Long.
- 6 mục CGV, Lotte Cinema và Highlands Coffee tiếp tục được giữ lại do chứng cứ chưa đủ.
- Voucher Vault tăng từ 12 lên 37 mục.
- Candidate có 76 thực thể: 24 công ích và 52 thương mại.
- Báo cáo automated audit ghi nhận 794/794 mẫu contrast đạt, heading hợp lệ trên 5 route, touch target đạt, 0 overflow và 0 nút copy mã không có bằng chứng.
- Production không có thay đổi trong giao dịch Batch 16.

Các con số và SHA-256 trên là dữ liệu Antigravity khai báo trong `RECEIPT_JAYT-350.json`. Theo Hiến chương JAYT-350, CEO không chạy terminal hoặc công cụ kỹ thuật để tái tạo phép đo; quyết định phát hành chỉ được mở sau khi receipt hiệu chỉnh tự chứa đầy đủ bảng đối soát.

## 2. Chốt chưa đạt của candidate v3.426.0

Rollback manifest đang neo về `v3.423.0` với 47 thẻ. Baseline Production hiện hành đã được JAYT-346 xác lập là `v3.425.0-sprint-b-r1`, 51 thẻ, deployment `dpl_CvczfzmWBk4XJvd7RgfNX1Dwe55o`.

Phát hành `v3.426.0` phải có bước hoàn nguyên trực tiếp về baseline gần nhất đã nghiệm thu. Neo về `v3.423.0` sẽ làm mất toàn bộ Sprint B và giảm phạm vi từ 51 xuống 47 thẻ. Đây không phải rollback tương đương cho đợt phát hành kế tiếp.

Chuỗi mô tả `v3.425.0-sprint-b-r1 / v3.424.0-r1` trong báo cáo cũng phải được tách rõ:

- `production_release_baseline`: `v3.425.0-sprint-b-r1`.
- `runtime_ledger_version`: chỉ ghi `v3.424.0` nếu đó là nhãn nội bộ còn tồn tại trong bundle.

## 3. Điều kiện mở cổng trình ký v3.426.0

Antigravity phải nộp lại một receipt hiệu chỉnh bất biến, gồm:

1. Rollback manifest trỏ tới `v3.425.0-sprint-b-r1`, 51 thẻ, deployment `dpl_CvczfzmWBk4XJvd7RgfNX1Dwe55o`, kèm artifact root có thể triển khai.
2. Bảng 25 ID mới và 6 ID HELD, tổng kiểm 76 ID duy nhất, không trùng candidate hiện hành.
3. Bảng SHA-256 của candidate manifest, registry, feed, bundle, audit receipt và rollback artifact.
4. Xác nhận `production_mutations: 0` trong Batch 16.
5. Trạng thái 25 mục mới theo đúng loại: giá quan sát, deal quầy, quyền lợi hội viên hoặc chương trình theo mùa; không gọi tất cả là voucher/mã giảm giá.

Sau khi nhận receipt đạt đủ năm điều kiện, CEO sẽ lập đúng một tờ trình v3.426.0 cho Cố Vấn Chiến Lược và Chủ Tịch. Chưa có quyền deploy Production từ quyết định này.

