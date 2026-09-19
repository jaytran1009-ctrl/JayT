# JAYT-373 CEO R1 — Chấp thuận kỹ thuật một phần, từ chối nghiệm thu candidate

**Quyết định:** `STAGING_SHELL_AND_COUNTER_SEARCH_ACCEPTED__ITEMIZED_SPLIT_QR_AND_FACTUAL_MICRO_UTILITIES_NOT_ACCEPTED__R1_REMEDIATION_REQUIRED`

CEO hậu kiểm trực tiếp candidate tại `http://127.0.0.1:4176` đã thấy trang phục vụ `v3.437.0-j373`, không có lỗi console/page trong kịch bản cơ bản, combobox tìm Jollibee có kết quả, modal quán mở được và mobile 390px không tràn ngang. Biên nhận staging cùng fingerprint bytes có thể dùng làm evidence cho các phần đó; `CHECK_05_BANK_APP_RECOGNITION` vẫn đúng là **NOT_TESTED**.

Candidate chưa được nghiệm thu để trình Gemini vì ba lỗi cổng:

1. **Itemized Split chưa hoàn chỉnh.** Giao diện chỉ hiển thị các món hiện có; không cho sửa số lượng hay đơn giá của món hiện hữu, thêm món qua `prompt` và ép `parseInt(... ) || 50000`, không có giao diện thêm/sửa/xóa phí chung. Đây không đáp ứng thao tác “ai ăn gì trả nấy” và phân bổ phí chung tại bàn.
2. **QR thanh toán xuất hiện trước xác nhận người nhận.** Modal khởi tạo sẵn số tài khoản và tên người nhận mẫu, tạo payload/QR ngay cả khi người dùng chưa xác nhận. QR chỉ được tạo sau khi người dùng nhập lại, xác nhận ngân hàng–tài khoản–tên hiển thị–số tiền; dữ liệu mẫu chỉ có thể tồn tại trong test fixture, không được render trong luồng người dùng.
3. **Dữ liệu factual không có chuỗi chứng cứ có thể truy vết.** `branch_micro_utilities.json` dùng nhãn như `STORE_AUDIT_BATCH_13`, `VENUE_POLICY_VERIFIED` và hash rời, còn `counter_offer_rules.json` chủ yếu liên kết homepage. Chúng không chỉ ra raw artifact, URL trang cụ thể, thời điểm, phạm vi chi nhánh và hash đối chiếu cho từng Wi‑Fi/tiện ích/bus/điều khoản ưu đãi. Không được hiển thị các giá trị này là AVAILABLE, “đã kiểm chứng”, hoặc giảm giá chắc chắn.

Không có deploy Production, đổi alias, hoặc kích hoạt affiliate theo quyết định này. Candidate được phép sửa tiếp trên staging :4176.

