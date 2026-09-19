# JAYT-373 CEO R2 — Chấp thuận candidate R1 và mở cổng nghiệm thu Gemini

**Quyết định:** `J373_R1_STAGING_CANDIDATE_ACCEPTED__GEMINI_PRACTICAL_REVIEW_AUTHORIZED__PRODUCTION_NOT_AUTHORIZED`

CEO đã hậu kiểm độc lập candidate `v3.437.0-j373-r1` tại `http://127.0.0.1:4176`.

- Bundle `jayt_apex_interface.js` trong source và staging cùng SHA-256 `354f11de35259360cda77608804982ab5908d12a34468b2e733eaa4484cf958d`, khớp manifest/receipt R1.
- Trong browser, form VietQR bắt đầu với tài khoản và tên người nhận rỗng, không có QR; modal có các trường sửa tên món/đơn giá/số lượng và nút thêm phí chung. Candidate vẫn phải yêu cầu xác nhận trước khi tạo QR.
- Syntax source hợp lệ. Artifact locator Phúc Long và Popeyes có hash khớp chuỗi provenance R1.
- Tất cả 4 chi nhánh trong candidate R1 đều hạ Wi‑Fi và DanaBus về UNKNOWN; không có mật khẩu Wi‑Fi, tuyến xe hay ưu đãi ví được công bố như dữ kiện đã xác thực.
- `NOT_TESTED` cho nhận diện camera trên app ngân hàng là chính xác và phải giữ nguyên trong Gemini packet lẫn mọi quyết định tiếp theo.

Candidate được chuyển sang nghiệm thu thực dụng Gemini theo ba kịch bản trong packet R1: chọn quán tại quầy, chia bill ba người với phí lẻ, và tra cứu 500m khi GPS bị từ chối. Gemini cần ghi nhận riêng: thao tác mobile thật, khả năng đọc QR bằng thiết bị, và trải nghiệm của người dùng trước khi có bất kỳ yêu cầu phát hành nào.

Không có thẩm quyền deploy/đổi alias Production hoặc kích hoạt affiliate. Production v3.436.0-j372-r2 tiếp tục là baseline.

