# HỒ SƠ BÀN GIAO KIỂM TOÁN TẬP TRUNG: BATCH REVIEW PACK 083

**Mã đợt kiểm duyệt**: `BATCH_REVIEW_PACK_083`  
**Chỉ thị điều hành**: `JAYT-P0.2-VERIFIED-SUPPLY-EXPANSION-083`  
**Thời điểm tạo**: 2026-08-24T13:14:01.551Z  
**Trạng thái đề xuất**: `READY_FOR_CEO_BATCH_AUDIT — ZERO AUTO-PUBLISH`  
**Tổng số tín hiệu thẩm định**: **60 tín hiệu** (6 nhóm ngành)  
**Biên bản máy đọc đối soát**: [`07_QUALITY_ASSURANCE/runtime_evidence/batch_083/BATCH_083_EVIDENCE_RECEIPT.json`](../07_QUALITY_ASSURANCE/runtime_evidence/batch_083/BATCH_083_EVIDENCE_RECEIPT.json)  
**Khóa sản xuất Invariant**: `deals_feed.json: []` (`is_approved: false`, 0 deal tự động xuất bản)

---

## 1. BẢNG THỐNG KÊ TỔNG HỢP (AGGREGATE TRIAGE MATRIX)

### A. Phân Bổ Theo Quyết Định Triage

| Trạng Thái Quyết Định | Số Lượng | Tỷ Lệ | Hành Động Vận Hành |
|---|:---:|:---:|---|
| **`READY_FOR_BATCH_REVIEW`** | **25** | **41.7%** | **Đủ 6/6 điểm đối soát trên nguồn công khai (Level B) — Trình CEO xem xét phê duyệt** |
| **`NEEDS_RECHECK`** | **12** | **20.0%** | Giữ ở hàng đợi Tín hiệu cộng đồng (Level D) chờ đối soát bằng chứng độc lập |
| **`REJECTED_OR_ACCOUNT_DEPENDENT`** | **23** | **38.3%** | Loại bỏ khỏi diện deal công khai vì phụ thuộc tài khoản/giỏ hàng riêng (Level C) |

### B. Phân Bổ Theo Cấp Độ Tin Cậy (Confidence Levels)

| Cấp Độ Tin Cậy | Định Nghĩa Quản Trị | Số Lượng Tín Hiệu | Trạng Thái Xử Lý |
|---|---|:---:|---|
| **Level A** | *Provider/Merchant Verified* (Feed API chính thức / Hồ sơ đối tác ký kết) | **0** | Chờ kết nối Partner Center có tài liệu xác thực |
| **Level B** | *Public Browser Verified* (Trang web/fanpage công khai có giá, hạn, điều kiện, phạm vi ĐN) | **25** | Đạt 6/6 điểm đối soát ➔ Trình CEO xem xét Staging |
| **Level C** | *Account/Cart Dependent* (Tín hiệu trong app, giỏ hàng riêng, ví voucher giới hạn) | **23** | Khóa lại ở ranh giới radar, không công khai như deal chung |
| **Level D** | *Community Signal* (Tín hiệu do cộng đồng quan sát và gửi báo) | **12** | Hiển thị trung thực dưới nhãn `CHƯA XÁC MINH`, 0 CTA |

---

## 2. DANH SÁCH 25 TÍN HIỆU ĐỦ ĐIỀU KIỆN REVIEW (`READY_FOR_BATCH_REVIEW`)

Toàn bộ các mục dưới đây đạt **6/6 điểm kiểm tra** trên lưới Triage (Giá, Điều kiện, Thời hạn, Phạm vi Đà Nẵng, Tính công khai phổ quát, và URL nguồn chính thức):

| ID | Nhóm Ngành | Thương Hiệu | Tiêu Đề Ưu Đãi | Mức Giá Quan Sát | Lịch Áp Dụng | Phạm Vi |
|---|---|---|---|---|---|---|
| `SIG_FB_01` | F_AND_B | **Lotteria Đà Nẵng** | Gà Rán Thứ Tư Vui Vẻ 35k/miếng | 35000đ | Thứ Tư hàng tuần | Đà Nẵng & Toàn quốc |
| `SIG_FB_02` | F_AND_B | **KFC Đà Nẵng** | Ưu Đãi Trưa Vui Vẻ 39k | 39000đ | Thứ Hai - Thứ Sáu (10h-14h) | Đà Nẵng & Toàn quốc |
| `SIG_FB_03` | F_AND_B | **Jollibee Đà Nẵng** | Combo Gà Giòn Tiết Kiệm 55k | 55000đ | Hàng ngày | Hệ thống Jollibee Đà Nẵng |
| `SIG_FB_04` | F_AND_B | **Pizza Hut Đà Nẵng** | Mua 1 Tặng 1 Thứ Ba & Thứ Tư | 149000đ | Thứ Ba, Thứ Tư | Pizza Hut Đà Nẵng (Nguyễn Văn Linh, Lê Duẩn) |
| `SIG_FB_05` | F_AND_B | **Domino's Pizza Đà Nẵng** | Mua 1 Tặng 1 Cả Tuần Khi Mua Cỡ Lớn | 199000đ | Tất cả các ngày trong tuần | Đà Nẵng |
| `SIG_FB_06` | F_AND_B | **The Pizza Company Đà Nẵng** | Mua 1 Tặng 1 Thứ Ba Hàng Tuần | 169000đ | Thứ Ba hàng tuần | Chi nhánh Đà Nẵng |
| `SIG_FB_07` | F_AND_B | **Dookki Lotte Mart Đà Nẵng** | Buffet Topokki 139k/người | 139000đ | Áp dụng cố định | Lotte Mart & Indochina Đà Nẵng |
| `SIG_FB_10` | F_AND_B | **Al Fresco's Đà Nẵng** | Rib Day Giảm 50% Sườn Nướng Thứ Hai | 165000đ | Thứ Hai hàng tuần | Trần Phú, Hải Châu, Đà Nẵng |
| `SIG_CT_01` | CAFE_TEA | **Highlands Coffee** | Cà Phê Phin Sữa Tươi 29k Giờ Sáng | 29000đ | Hằng ngày 07:00-10:00 | Hệ thống Highlands Coffee Đà Nẵng |
| `SIG_CT_02` | CAFE_TEA | **Phê La Đà Nẵng** | Trà Ô Long Nhài Sữa Đậm Vị 45k | 45000đ | Hàng ngày | Nguyễn Văn Linh & Bạch Đằng, Đà Nẵng |
| `SIG_CT_03` | CAFE_TEA | **Phúc Long Đà Nẵng** | Trà Đào Cam Sả Combo Sáng 49k | 49000đ | 07:00 - 11:00 hàng ngày | Phúc Long Đà Nẵng (Vincom, Nguyễn Văn Thoại) |
| `SIG_CT_06` | CAFE_TEA | **Gong Cha Đà Nẵng** | Thứ Ba Mua 1 Tặng 1 Trà Sữa Trân Châu | 47000đ | Thứ Ba hàng tuần | Hoàng Diệu & Nguyễn Văn Thoại Đà Nẵng |
| `SIG_CT_07` | CAFE_TEA | **TocoToco Đà Nẵng** | Đồng Giá 25k Toàn Bộ Trà Sữa Size M | 25000đ | Thứ Hai và Thứ Tư | Đà Nẵng |
| `SIG_CT_08` | CAFE_TEA | **Mixue Đà Nẵng** | Kem Ốc Quế 10k & Trà Chanh Tươi Lạnh 20k | 10000đ | Cố định hàng ngày | Tất cả điểm bán Mixue Đà Nẵng |
| `SIG_CT_09` | CAFE_TEA | **Trung Nguyên E-Coffee** | Cà Phê Năng Lượng Buổi Sáng 25k | 25000đ | 06:30 - 09:00 hàng ngày | Đà Nẵng |
| `SIG_CIN_01` | CINEMA | **Galaxy Cinema** | Happy Day — Thứ Ba Giá Vé 50k / 70k | 50000đ | Thứ Ba hàng tuần | Galaxy CoopMart Đà Nẵng (478 Điện Biên Phủ, Thanh Khê) |
| `SIG_CIN_02` | CINEMA | **CGV Cinemas** | Culture Day — Thứ Tư Cuối Tháng Vé 50k | 50000đ | Thứ Tư cuối tháng | CGV Vincom & CGV Vĩnh Trung Đà Nẵng |
| `SIG_CIN_03` | CINEMA | **Metiz Cinema** | Super Monday — Thứ Hai Siêu Ưu Đãi 45k | 45000đ | Thứ Hai hàng tuần | Metiz Cinema Helio Center Đà Nẵng |
| `SIG_CIN_04` | CINEMA | **Metiz Cinema** | U22 Vui Vẻ — Vé Học Sinh Sinh Viên 45k | 45000đ | Thứ Hai đến Thứ Sáu | Metiz Cinema Helio Center Đà Nẵng |
| `SIG_CIN_05` | CINEMA | **Lotte Cinema** | Cinema Day — Thứ Hai Vé 50k | 50000đ | Thứ Hai hàng tuần | Lotte Cinema Đà Nẵng (Tầng 5 Lotte Mart) |
| `SIG_CIN_06` | CINEMA | **Starlight Cinema** | Thứ Ba Vui Vẻ — Vé Đồng Giá 45k | 45000đ | Thứ Ba hàng tuần | Starlight Nguyễn Kim Đà Nẵng |
| `SIG_CIN_07` | CINEMA | **CGV Cinemas** | U22 CGV — Giá Vé 55k Cho Học Sinh Sinh Viên | 55000đ | Thứ Hai đến Thứ Sáu | Toàn hệ thống CGV Đà Nẵng |
| `SIG_CIN_08` | CINEMA | **Lotte Cinema** | Combo Bắp Nước Ưu Đãi Hội Viên 59k | 59000đ | Hàng ngày khi mua kèm vé | Lotte Mart Đà Nẵng |
| `SIG_CIN_09` | CINEMA | **Galaxy Cinema** | Vé Học Sinh Sinh Viên 45k Giờ Sáng | 45000đ | Thứ Hai đến Thứ Sáu (trước 12h) | Galaxy Đà Nẵng |
| `SIG_CIN_10` | CINEMA | **Metiz Cinema** | Metiz Member Day — Thứ Tư Tích Lũy Nhân Đôi | 0đ | Thứ Tư hàng tuần | Helio Center Đà Nẵng |

---

## 3. DANH SÁCH 12 TÍN HIỆU CẦN ĐỐI SOÁT BỔ SUNG (`NEEDS_RECHECK`)

Các tín hiệu do cộng đồng gửi báo hoặc còn thiếu điều kiện chứng thực độc lập. Duy trì hiển thị trong app dưới nhãn **`⚠️ Tín hiệu cộng đồng — chưa xác minh`**:

| ID | Nhóm Ngành | Thương Hiệu / Quán | Nội Dung Tín Hiệu | Lý Do Cần Recheck |
|---|---|---|---|---|
| `SIG_CT_10` | CAFE_TEA | **May Coffee & Tea Đà Nẵng** | Ưu Đãi Học Sinh Sinh Viên Giảm 20% | Tín hiệu cộng đồng chưa qua đối soát độc lập (Chờ evidence bundle độc lập từ đối soát thực tế). |
| `SIG_MOB_10` | MOBILITY | **VietGo / Gojek** | Ưu Đãi Di Chuyển Điểm Du Lịch Sơn Trà | Tín hiệu cộng đồng chưa qua đối soát độc lập (Chờ evidence bundle độc lập từ đối soát thực tế). |
| `SIG_COM_01` | COMMUNITY | **Bánh Mỳ Chấm Chu Văn An** | Học Sinh Sinh Viên Giảm 5k/phần | Tín hiệu cộng đồng chưa qua đối soát độc lập (Chờ evidence bundle độc lập từ đối soát thực tế). |
| `SIG_COM_02` | COMMUNITY | **Trà Sữa May Sơn Trà** | Mua 2 Tặng 1 Giờ Vàng Tan Trường | Tín hiệu cộng đồng chưa qua đối soát độc lập (Chờ evidence bundle độc lập từ đối soát thực tế). |
| `SIG_COM_03` | COMMUNITY | **Bún Chả Cá Hùng Vương** | Đi Nhóm Từ 4 Người Tặng Nước Mía | Tín hiệu cộng đồng chưa qua đối soát độc lập (Chờ evidence bundle độc lập từ đối soát thực tế). |
| `SIG_COM_04` | COMMUNITY | **Tiệm Cà Phê Nhà Đỏ** | Check-in Fanpage Giảm 15% Hóa Đơn | Tín hiệu cộng đồng chưa qua đối soát độc lập (Chờ evidence bundle độc lập từ đối soát thực tế). |
| `SIG_COM_05` | COMMUNITY | **Cơm Gà Tam Kỳ Liên Chiểu** | Suất Sinh Viên 25k Đầy Đủ | Tín hiệu cộng đồng chưa qua đối soát độc lập (Chờ evidence bundle độc lập từ đối soát thực tế). |
| `SIG_COM_06` | COMMUNITY | **Bánh Tráng Cuốn Thịt Heo Đại Lộc** | Bàn Đi 4 Tính Tiền 3 Vào Thứ Năm | Tín hiệu cộng đồng chưa qua đối soát độc lập (Chờ evidence bundle độc lập từ đối soát thực tế). |
| `SIG_COM_07` | COMMUNITY | **Cafe Sách Đà Nẵng** | Giảm 20% Đồ Uống Khi Đọc Sách Tại Quán | Tín hiệu cộng đồng chưa qua đối soát độc lập (Chờ evidence bundle độc lập từ đối soát thực tế). |
| `SIG_COM_08` | COMMUNITY | **Kem Bơ Cô Vân Chợ Bắc Mỹ An** | Kem Bơ Cốt Dừa Đồng Giá 15k | Tín hiệu cộng đồng chưa qua đối soát độc lập (Chờ evidence bundle độc lập từ đối soát thực tế). |
| `SIG_COM_09` | COMMUNITY | **Gà Rán Cay Hàn Quốc Tôn Đức Thắng** | Combo 2 Miếng Gà + Nước 35k | Tín hiệu cộng đồng chưa qua đối soát độc lập (Chờ evidence bundle độc lập từ đối soát thực tế). |
| `SIG_COM_10` | COMMUNITY | **Lẩu Bò Sáu Hưng** | Giảm 50k Nồi Lẩu Cho Bàn Đặt Trước Qua Điện Thoại | Tín hiệu cộng đồng chưa qua đối soát độc lập (Chờ evidence bundle độc lập từ đối soát thực tế). |

---

## 4. DANH SÁCH 23 TÍN HIỆU BỊ LOẠI KHỎI DIỆN CÔNG KHAI (`REJECTED_OR_ACCOUNT_DEPENDENT`)

Các ưu đãi phụ thuộc vào tài khoản cụ thể, phân đoạn người dùng, ví voucher có giới hạn lượt dùng trong app hoặc giỏ hàng cụ thể:

| ID | Nhóm Ngành | Nền Tảng / Thương Hiệu | Nội Dung Ưu Đãi | Lý Do Loại Bỏ Khỏi Deal Công Khai |
|---|---|---|---|---|
| `SIG_FB_08` | F_AND_B | **Kichi-Kichi Đà Nẵng** | Ưu Đãi Nhóm Đi 4 Tặng 1 | Phụ thuộc tài khoản cá nhân / Giỏ hàng / Ví voucher trong app (Level C) |
| `SIG_FB_09` | F_AND_B | **Gogi House Đà Nẵng** | Combo Nướng Tiết Kiệm 299k | Phụ thuộc tài khoản cá nhân / Giỏ hàng / Ví voucher trong app (Level C) |
| `SIG_CT_04` | CAFE_TEA | **The Coffee House** | Thứ Năm Đồng Giá 35k Món Yêu Thích | Phụ thuộc tài khoản cá nhân / Giỏ hàng / Ví voucher trong app (Level C) |
| `SIG_CT_05` | CAFE_TEA | **Katinat Đà Nẵng** | Ưu Đãi Đổi Điểm Hội Viên Katinat | Phụ thuộc tài khoản cá nhân / Giỏ hàng / Ví voucher trong app (Level C) |
| `SIG_MOB_01` | MOBILITY | **Grab** | Mã GRABDI Giảm 20% Chuyến Xe Đi Lại | Phụ thuộc tài khoản cá nhân / Giỏ hàng / Ví voucher trong app (Level C) |
| `SIG_MOB_02` | MOBILITY | **Grab** | Mã SANBAY Giảm 30k Đi Sân Bay Đà Nẵng | Phụ thuộc tài khoản cá nhân / Giỏ hàng / Ví voucher trong app (Level C) |
| `SIG_MOB_03` | MOBILITY | **Be** | Mã BECHIEU Giảm 15k Cho Chuyến Chiều | Phụ thuộc tài khoản cá nhân / Giỏ hàng / Ví voucher trong app (Level C) |
| `SIG_MOB_04` | MOBILITY | **Be** | Mã BANMOI Giảm 50% Cho 3 Chuyến Đầu | Phụ thuộc tài khoản cá nhân / Giỏ hàng / Ví voucher trong app (Level C) |
| `SIG_MOB_05` | MOBILITY | **Xanh SM** | Giảm 25% Chuyến Xe Thuần Điện Giờ Thấp Điểm | Phụ thuộc tài khoản cá nhân / Giỏ hàng / Ví voucher trong app (Level C) |
| `SIG_MOB_06` | MOBILITY | **Xanh SM** | Mã XANHDANANG Giảm 30k Taxi | Phụ thuộc tài khoản cá nhân / Giỏ hàng / Ví voucher trong app (Level C) |
| `SIG_MOB_07` | MOBILITY | **ShopeeFood** | Freeship 0đ Cho Đơn Từ 30k Quán Quen | Phụ thuộc tài khoản cá nhân / Giỏ hàng / Ví voucher trong app (Level C) |
| `SIG_MOB_08` | MOBILITY | **GrabFood** | Mã QUANNGON Giảm 25k Đơn Từ 60k | Phụ thuộc tài khoản cá nhân / Giỏ hàng / Ví voucher trong app (Level C) |
| `SIG_MOB_09` | MOBILITY | **BeFood** | Combo Ăn Trưa Freeship 15k | Phụ thuộc tài khoản cá nhân / Giỏ hàng / Ví voucher trong app (Level C) |
| `SIG_ECOM_01` | ECOMMERCE | **Shopee** | Voucher Toàn Sàn Giảm 15% Đơn Từ 100k | Phụ thuộc tài khoản cá nhân / Giỏ hàng / Ví voucher trong app (Level C) |
| `SIG_ECOM_02` | ECOMMERCE | **Shopee** | Mã Miễn Phí Vận Chuyển Freeship Xtra | Phụ thuộc tài khoản cá nhân / Giỏ hàng / Ví voucher trong app (Level C) |
| `SIG_ECOM_03` | ECOMMERCE | **Lazada** | Voucher Tích Lũy 10k Cho Mỗi 150k | Phụ thuộc tài khoản cá nhân / Giỏ hàng / Ví voucher trong app (Level C) |
| `SIG_ECOM_04` | ECOMMERCE | **Lazada** | Freeship Max Giảm 15k Đơn 49k | Phụ thuộc tài khoản cá nhân / Giỏ hàng / Ví voucher trong app (Level C) |
| `SIG_ECOM_05` | ECOMMERCE | **Tiki** | Mã TIKICLUB Giảm 20k Cho Hội Viên | Phụ thuộc tài khoản cá nhân / Giỏ hàng / Ví voucher trong app (Level C) |
| `SIG_ECOM_06` | ECOMMERCE | **Tiki** | TikiNOW Giao Siêu Tốc 2h Giảm 10k Phí Ship | Phụ thuộc tài khoản cá nhân / Giỏ hàng / Ví voucher trong app (Level C) |
| `SIG_ECOM_07` | ECOMMERCE | **TikTok Shop** | Voucher Khách Hàng Mới Giảm 25k Đơn 0đ | Phụ thuộc tài khoản cá nhân / Giỏ hàng / Ví voucher trong app (Level C) |
| `SIG_ECOM_08` | ECOMMERCE | **TikTok Shop** | Freeship Extra Giờ Vàng Livestream | Phụ thuộc tài khoản cá nhân / Giỏ hàng / Ví voucher trong app (Level C) |
| `SIG_ECOM_09` | ECOMMERCE | **Sendo** | Hoàn Tiền Senlive Đến 20k | Phụ thuộc tài khoản cá nhân / Giỏ hàng / Ví voucher trong app (Level C) |
| `SIG_ECOM_10` | ECOMMERCE | **Shopee** | Voucher Shopee Video Giảm 20% Tối Đa 30k | Phụ thuộc tài khoản cá nhân / Giỏ hàng / Ví voucher trong app (Level C) |

---

## 5. KẾT LUẬN & KIẾN NGHỊ TRÌNH CEO

1. **Tuân thủ ranh giới kỹ thuật**: Toàn bộ quá trình quét và lọc không sử dụng bất kỳ kỹ thuật vượt rào cản app wall hay giỏ hàng riêng nào.
2. **Nguyên tắc không tự thăng cấp**: 10/10 tín hiệu cộng đồng Level D được giữ nguyên ở trạng thái `NEEDS_RECHECK`, tuyệt đối không tự nâng thành Level B.
3. **Không tự xuất bản**: `deals_feed.json` duy trì `[]`. Bản báo cáo này đóng vai trò bàn giao dữ liệu đã phân loại để CEO xem xét từng ứng viên khi mở đợt nhập Staging tiếp theo.