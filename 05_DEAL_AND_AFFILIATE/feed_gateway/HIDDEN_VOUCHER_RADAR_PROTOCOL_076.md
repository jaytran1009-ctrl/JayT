# JAYT HIDDEN VOUCHER RADAR PROTOCOL (076)

**Mã tài liệu**: `HIDDEN-VOUCHER-RADAR-076`  
**Chỉ thị điều hành**: `JAYT-HIDDEN-VOUCHER-RADAR-076`  
**Thời điểm ban hành**: 2026-08-24T16:12:00+07:00  
**Phân loại dữ liệu**: `DISCOVERY_SIGNALS_ONLY · KHÔNG PHẢI PUBLIC CATALOG DEAL`

---

## 1. RANH GIỚI BẰNG CHỨNG VOUCHER & KHUYẾN MÃI ĐỘNG (EVIDENCE BOUNDARY)

1. **Bản chất của Voucher & Mã Giảm Giá Động**:
   - Phần lớn các loại mã (Shopee Video, Flash Sale khung giờ, Food apps, mã theo vị trí địa lý) có tính chất **phụ thuộc tài khoản, ngân sách theo thời gian thực, thiết bị hoặc phương thức thanh toán**.
   - Việc áp mã thành công trên 1 giỏ hàng cá nhân chỉ chứng minh mã có hiệu lực cho tài khoản/giỏ hàng đó tại thời điểm đó; **không bảo đảm hiệu lực cho toàn bộ người dùng cộng đồng**.
2. **Phân Loại Bắt Buộc**: Toàn bộ các tín hiệu mã giảm giá, khung giờ hay banner chiến dịch được xếp vào danh mục **`DISCOVERY_SIGNALS_ONLY`**.
3. **Cấm Tuyệt Đối Các Tuyên Bố Chưa Có Bằng Chứng**:
   - Cấm công bố mức giảm giật gân (ví dụ: *"50%"*, *"40K"*), khung giờ cố định (*"11h/14h/20h"*), hoặc nhãn *"độc quyền"* khi chưa có điều khoản chính thức còn hiệu lực trên đĩa.
   - Cấm tự ý cào dữ liệu, vượt CAPTCHA, bypass app wall hoặc đăng nhập trái phép.

---

## 2. QUY CHUẨN TIẾP NHẬN BẰNG CHỨNG VOUCHER (5 MẢNH CHỨNG CỨ GỐC)

Mỗi deal voucher muốn được đưa vào xem xét cấp candidate bắt buộc phải có đầy đủ:
1. **Giá / Sản phẩm áp dụng**: Mức giảm thực tế và giá sau giảm (nếu có).
2. **Mã hoặc Điều kiện áp dụng**: Kèm nhãn bắt buộc `ACCOUNT_OR_CART_DEPENDENT` nếu phụ thuộc tài khoản/giỏ hàng.
3. **Thời hạn hiệu lực (`valid_to`)**: Ngày giờ hết hạn tường minh từ nguồn chính thức.
4. **Phạm vi áp dụng & Phí liên quan**: Điều kiện áp dụng, phí ship tối thiểu hoặc giới hạn ngành hàng.
5. **Bằng chứng nguồn gốc (Raw Source Provenance)**: Receipt snapshot hoặc văn bản điều khoản chính thức.

---

## 3. BẢO TOÀN TRẠNG THÁI HỆ THỐNG

- **Production Feed**: Khóa hoàn toàn (`deals_feed.json: []`, `is_approved: false`).
- **Public Beta**: Duy trì giao diện Honest Empty State minh bạch: *"JayT đang mở beta, dữ liệu ưu đãi sẽ chỉ xuất hiện khi được đối soát."*
- **Staging Feed**: Duy trì đúng 3 deal tham chiếu nội bộ (1 Galaxy + 2 Metiz).
- **Affiliate Deep Links**: Chỉ tạo khi link được sinh trực tiếp từ Partner Portal của chính tài khoản và tuân thủ đúng chính sách nền tảng.
