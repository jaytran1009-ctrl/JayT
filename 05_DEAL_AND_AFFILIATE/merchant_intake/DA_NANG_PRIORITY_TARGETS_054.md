# JAYT CORP — HỒ SƠ & DANH MỤC ĐỐI TÁC ƯU TIÊN ĐÀ NẴNG (054)
> **Mã chỉ thị**: `JAYT-REAL-DATA-TO-GO-LIVE-054 — TRACK 2 LOCAL MERCHANT DOSSIER`  
> **Phạm vi**: `Khu vực Thành phố Đà Nẵng (Hải Châu, Thanh Khê, Sơn Trà, Ngũ Hành Sơn, Cẩm Lệ)`  
> **Kỷ luật vận hành**: `Nghiêm cấm tự ý liên hệ đại diện công ty khi chưa có kênh liên hệ doanh nghiệp chính thức và chỉ định cụ thể từ CEO.`

---

## 1. Mục Tiêu Chiến Lược Track 2

Hạ tầng tiếp nhận trực tiếp ưu đãi từ các cơ sở dịch vụ, rạp phim, quán ăn uống tại Đà Nẵng nhằm đáp ứng North Star: **“Biết hôm nay có gì, tính được mình trả bao nhiêu, rồi rủ đúng người đi cùng.”**

---

## 2. Danh Mục Cụm Merchant Ưu Tiên Tại Đà Nẵng

### Cụm 1: Rạp Chiếu Phim & Giải Trí (Local Entertainment)
1. **CGV Cinemas Vĩnh Trung Plaza**:
   - Địa chỉ: 255-257 Hùng Vương, P. Vĩnh Trung, Q. Thanh Khê, Đà Nẵng.
   - Nhóm ưu đãi mục tiêu: Culture Day (thứ 4 cuối tháng), U22 (học sinh/sinh viên), vé ngày thường trước 12h.
2. **Metiz Cinema Helio Center**:
   - Địa chỉ: Tầng 1 Helio Center, Đường 2/9, P. Hòa Cường Bắc, Q. Hải Châu, Đà Nẵng.
   - Nhóm ưu đãi mục tiêu: Giá vé Thứ 3 vui vẻ (Happy Tuesday), vé học sinh U22, ưu đãi hội viên Metiz.
3. **Galaxy Cinema Đà Nẵng (Coopmart Đà Nẵng)**:
   - Địa chỉ: 478 Điện Biên Phủ, P. Thanh Khê Đông, Q. Thanh Khê, Đà Nẵng.
   - Nhóm ưu đãi mục tiêu: Happy Day (Thứ 3), Ngày Tri Ân, Ngày Thành Viên.

### Cụm 2: Ăn Uống & Fastfood (Local F&B / Quick Service)
1. **Jollibee Đà Nẵng**:
   - Chi nhánh: Big C Đà Nẵng, Coopmart Đà Nẵng, Vincom Đà Nẵng.
   - Nhóm ưu đãi mục tiêu: Combo trưa tiết kiệm, ưu đãi combo gà giòn + mì Ý.
2. **Lotteria Đà Nẵng**:
   - Chi nhánh: 93 Nguyễn Văn Linh, Big C Đà Nẵng, Lotte Mart Đà Nẵng.
   - Nhóm ưu đãi mục tiêu: Crazy Day (Thứ 4), Burger Day, Combo học sinh sinh viên.

### Cụm 3: Cà Phê, Trà Sữa & Tụ Tập Bạn Bè (Local Coffee & Tea)
1. **Highlands Coffee Đà Nẵng**:
   - Các chi nhánh trung tâm: Nguyễn Văn Linh, Bạch Đằng, Điện Biên Phủ.
   - Nhóm ưu đãi mục tiêu: Combo ăn sáng bánh mì + phin sữa đá, voucher mua 2 tặng 1 định kỳ.
2. **Phê La Đà Nẵng**:
   - Chi nhánh: Nguyễn Văn Linh, Bạch Đằng.
   - Nhóm ưu đãi mục tiêu: Ưu đãi khung giờ mở bán món mới, combo mua theo nhóm.
3. **Katinat Saigon Kafe Đà Nẵng**:
   - Chi nhánh: Bạch Đằng, Nguyễn Văn Thoại.
   - Nhóm ưu đãi mục tiêu: Ưu đãi ngày hội thành viên, tích điểm đổi quà.

---

## 3. Bộ 6 Điều Kiện Bắt Buộc Khi Tiếp Nhận Hồ Sơ Merchant (Track 2 Intake Validator)

Mọi hồ sơ đăng ký từ merchant phải điền qua schema `merchant_intake_form.schema.json` và vượt qua `merchant_intake_validator.js`:

1. **Mức giá minh bạch**: Giá gốc, giá khuyến mãi hoặc tỷ lệ giảm giá có thể tính toán số học chính xác (đồng nhất đơn vị VND).
2. **Điều kiện chi tiết**: Điều kiện áp dụng, mức chi tiêu tối thiểu (`min_spend`), phương thức thanh toán, khung giờ áp dụng.
3. **Phạm vi địa lý Đà Nẵng**: Xác định rõ chi nhánh áp dụng tại TP. Đà Nẵng (kèm địa chỉ cụ thể).
4. **Hạn dùng xác thực**: Thời gian bắt đầu (`valid_from`) và thời gian kết thúc (`valid_to`) hợp lệ, chưa hết hạn.
5. **Chứng từ xác thực SHA-256**: Ảnh chụp bảng giá / tờ rơi / văn bản xác nhận có chữ ký đại diện kèm mã băm SHA-256 nguyên bản.
6. **Người liên hệ & Thẩm định**: Họ tên, chức vụ người đại diện cơ sở (không chứa ký hiệu giả lập/synthetic).

---

## 4. Trạng Thái Vận Hành & Kỷ Luật An Toàn

- **Chưa gửi liên hệ ra bên ngoài**: Không gửi email/tin nhắn/gọi điện mạo danh JayT khi CEO chưa cấp kênh liên hệ doanh nghiệp chính thức.
- **Hồ sơ mẫu mang nhãn `TEST_ONLY_NOT_EVIDENCE`**: Chỉ dùng trong private sandbox để kiểm thử validator, không nạp vào live feed.
- **Production Lock**: `is_approved: false (LOCKED)`.
