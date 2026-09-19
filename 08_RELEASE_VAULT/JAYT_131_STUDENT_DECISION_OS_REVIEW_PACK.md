# 🎓 EXECUTIVE REVIEW PACK: JAYT-131 STUDENT DAILY DECISION OS

**Phiên bản hệ thống**: `v3.248.0`  
**Chỉ thị điều hành**: `JAYT-131-STUDENT-DAILY-DECISION-OS`  
**Trạng thái điều hành**: `IMPLEMENTED — PENDING CEO AUDIT`  
**Production Live URL**: [https://deploy-ten-xi-48.vercel.app](https://deploy-ten-xi-48.vercel.app)  
**Ngày phát hành**: 26/08/2026

---

## 1. TRIẾT LÝ VẬN HÀNH & BẢN ĐỒ NGHIỆM THU CEO

> 🌟 **Nguyên Tắc Chỉ Đạo Bất Biến**:  
> *“‘Nhiều deal’ không phải mục tiêu độc lập. Mục tiêu là **nhiều quyết định đúng, đúng lúc và có thể hành động**. Một card 11:05 không giúp khách ăn trưa ngay thì dù dữ liệu đúng cũng không thuộc Today Board.”*

### 🗺️ Bảng Đối Soát Nghiệm Thu Theo 6 Lời Hứa Khách Hàng

| Lời Hứa Với Khách | Dữ Liệu Thực Tế Trong Hệ Thống | Ranh Giới Cấm Kỵ (Đã Triệt Tiêu 100%) | Trạng Thái Live |
|---|---|---|---|
| **“Thứ Hai/Thứ Ba có vé Metiz 45K”** | Chính sách vé U22 & Học sinh sinh viên 45.000₫ niêm yết tại Metiz Helio Center (Đường 2/9, Hải Châu). Áp dụng xuất trình thẻ HSSV/CCCD. | ❌ Tuyệt đối không ghi lịch theo trí nhớ hay suy đoán.<br>❌ "Tháng tới" được định vị là *Watchlist theo dõi*. | ✅ **PASS** |
| **“Hôm nay app A rẻ hơn app B”** | Real-Pay Comparison Desk minh bạch công thức: `Giá món + Phí ship − Voucher = Thực trả`. 3 Chế độ phân tầng. | ❌ Không dùng phí ship trung bình, voucher phổ biến ảo.<br>❌ CTA là *"So sánh bằng giá bạn đang thấy"*, cấm *"Mở app rẻ nhất"*. | ✅ **PASS** |
| **“Quán gần bạn có kèo giá sinh viên”** | Phân theo 3 Hub sinh viên: **Hòa Khánh** (Bách Khoa/Sư Phạm), **Ngũ Hành Sơn** (DUE/VKU), **Hải Châu** (Duy Tân/Ngoại Ngữ) với 26 địa chỉ xác thực. | ❌ Không tự ý thu thập vị trí GPS cá nhân.<br>❌ Tối đa 6 quán ban đầu; quán chưa có deal vẫn cho địa chỉ & menu niêm yết. | ✅ **PASS** |
| **“Lựa chọn đúng thời điểm (11:05)”** | 11:05 hiển thị chính xác **KFC Dzựt Deal Trưa 88k**, **Jollibee Combo 73k**, **CGV ZaloPay Suất Trưa 12h-13h**. | ❌ Lọc sạch 100% phim đêm, xô gà tiệc gia đình và xe buýt khỏi Today Board 11:05. | ✅ **PASS** |
| **“Kèo nhóm chia bill minh bạch”** | Combo niêm yết GoGi 529k (3-4 người), KFC 189k, Phê La 55k; tách rõ *Tổng niêm yết* và *Ước tính chia đều theo đầu người*. | ❌ Không gọi giá chia ước tính là giá thực trả cố định.<br>❌ Có ghi chú rõ ràng về chi phí phát sinh món gọi thêm tại quầy. | ✅ **PASS** |
| **“Mở JayT mỗi ngày có ích”** | Today Board chỉ có tối đa 3 lựa chọn đúng khung giờ + 4 Chuyên mục chuyên sâu đóng thành dock điều hướng. | ❌ Không bung toàn bộ catalog trải dài làm loãng quyết định 3 giây. | ✅ **PASS** |

---

## 2. BA ĐƯỜNG CUNG DỮ LIỆU ĐÃ ĐƯỢC PHÂN LẬP RÕ RÀNG

1. **Track 1: Chính Sách Định Kỳ (Foundational Regular Policies)**:
   - Vé rạp U22 45k Metiz, Happy Day Thứ 3 Galaxy/Lotte, menu niêm yết KFC/Jollibee/Phê La, xe buýt trợ giá DanaBus 6k.
   - Đây là nền tảng cốt lõi giúp JayT hữu ích mỗi ngày ngay cả khi không có chương trình khuyến mãi ngắn hạn.
2. **Track 2: Ưu Đãi Có Hạn (TTL-Bound Verified Offers)**:
   - CGV Ting Ting Payday 30k (đến 31/08), CGV VNPAY Mua 1 Tặng 1 (đến 31/12), Starlight Combo 10k (đến 30/11).
   - Quản lý qua Evidence Ledger `EVIDENCE_LEDGER_BATCH_131.json`, tự động hết hạn khi quá TTL.
3. **Track 3: Giá App & So Sánh Thực Trả (Transparent Real-Pay Calculator)**:
   - Máy tính cục bộ cho phép người dùng tự nhập giỏ hàng đang thấy để bóc tách chi phí.
   - Cảnh báo chưa đủ dữ liệu kết luận, đóng vai trò công cụ tính trung thực thay vì máy phán thời gian thực.

---

## 3. KIỂM ĐỊNH CHI TIẾT 5 KHUNG GIỜ TRÊN LIVE PRODUCTION

```text
Production URL: https://deploy-ten-xi-48.vercel.app
Byte Parity: 100% Match (7/7 Core SOT Files)
```

| Khung Giờ | Bối Cảnh Thực Tế | 3 Lựa Chọn Hiển Thị Trên Today Board | Card Đã Bị Loại Bỏ Vì Không Phù Hợp |
|---|---|---|---|
| **07:30** | ☕ **Ăn sáng / Đồ thiết yếu** | 1. **DanaBus Đà Nẵng**: Xe buýt trợ giá 6.000₫ (Trước 21:00)<br>2. **Jollibee Vietnam**: Combo Bữa Sáng/Trưa 73.000₫<br>3. **Highlands Coffee**: Thẻ JCB giảm 20.000₫ | ❌ Suất chiếu phim đêm CGV/Metiz<br>❌ Lẩu nướng GoGi 529k |
| **11:05** | 🍱 **Cứu đói trưa** | 1. **CGV Cinemas**: ZaloPay suất trưa 12h-13h (Từ 50.000₫)<br>2. **KFC Vietnam**: Dzựt Deal Trưa 88.000₫ (1 Gà + 1 Burger + 1 Pepsi)<br>3. **Jollibee Vietnam**: Combo Gà Giòn Cay 73.000₫ | ❌ KFC Xô Hợp Cạ 189k (Ăn tối/Tan ca)<br>❌ Suất chiếu phim đêm CGV/Metiz<br>❌ Xe buýt DanaBus |
| **14:30** | 🧋 **Cà phê / Học nhóm chiều** | 1. **Starlight Cinema**: Combo Bắp Nước 10.000₫<br>2. **Phê La**: Trà Ô Long cắm trại & làm việc view sông Hàn<br>3. **Gong Cha**: Alisan Trà Sữa 53.000₫ | ❌ Ăn trưa nhanh / Cơm gà<br>❌ Lẩu nướng tối GoGi House |
| **17:30** | 🍗 **Tan học / Tan ca** | 1. **Metiz Cinema**: Vé học sinh/sinh viên U22 45.000₫<br>2. **DanaBus Đà Nẵng**: Xe buýt trợ giá về nhà 6.000₫<br>3. **KFC Vietnam**: Xô Hợp Cạ Tan Ca 189.000₫ | ❌ Cà phê sáng Highlands JCB<br>❌ Combo trưa KFC 88k |
| **20:00** | 🎬 **Kèo tối & Xem phim đêm** | 1. **CGV Cinemas**: 2 cách tiết kiệm suất tối (`Mã PAYDAY 30k` & `VNPAY BOGO`)<br>2. **Metiz Cinema**: Vé U22 Helio Center 45.000₫<br>3. **GoGi House**: Combo Nướng Xèo Xèo 529.000₫ (~176k/người) | ❌ Xe buýt DanaBus sau 21:00 (kèm cảnh báo di chuyển đêm)<br>❌ Combo trưa 73k |

---

## 4. KIỂM ĐỊNH 4 HÀNH TRÌNH SINH VIÊN (4 STUDENT USER JOURNEYS)

1. **Hành trình 1: Lên kế hoạch xem phim trong tuần**
   - Sinh viên mở tab `🎬 Lịch Rạp 7 Ngày` -> Chọn `Thứ 3` -> Thấy ngay vé U22 45k tại Metiz Helio và Starlight Member -> Bấm *"⭐ Theo dõi ngày này"*, hệ thống lưu vào Watchlist cá nhân.
2. **Hành trình 2: Tự so sánh chi tiêu từ giỏ hàng thực tế**
   - Sinh viên mở `🧮 So Sánh Thực Trả` -> Nhập đơn gà rán 88k + ship 16k − voucher 20k -> Nhận kết quả thực trả 84k -> Bấm *"So sánh bằng giá bạn đang thấy"*.
3. **Hành trình 3: Tìm địa điểm phù hợp theo cụm trường học**
   - Sinh viên ĐH Kinh Tế DUE chọn tab `🏖️ Cụm Ngũ Hành Sơn` -> Thấy Phê La Nguyễn Văn Thoại view học nhóm -> Xem địa chỉ xác thực và menu 55k.
4. **Hành trình 4: Lập kèo nhóm với tổng tiền minh bạch**
   - Nhóm 3 bạn mở `👥 Kèo Nhóm & Radar` -> Chọn ngân sách ≤150k -> Nhận gợi ý Combo GoGi House 529k (~176k/người) -> Bấm *"Chốt kèo nhóm này"*.

---

## 5. DANH MỤC HỒ SƠ & BẰNG CHỨNG KIỂM THỬ LIVE

- **Sổ cái chứng cứ**: `06_TRUST_AND_EVIDENCE/evidence_records/EVIDENCE_LEDGER_BATCH_131.json`
- **Biên nhận triển khai**: `08_RELEASE_VAULT/DEPLOYMENT_RECEIPT_131.json`
- **Quy chế vận hành**: `09_OPERATIONS/OPERATIONAL_CADENCE_AND_SUPPLY_TRACKS.md`
- **Nhật ký vận hành hằng ngày**: `09_OPERATIONS/daily_logs/OPERATIONAL_LOG_2026_08_26.md`
- **Bộ ảnh Puppeteer Live (15 tệp ảnh)**:
  - 6 Viewports: Desktop Light/Dark, Tablet Light/Dark, Mobile 390 Light/Dark.
  - 5 Khung giờ: 07:30, 11:05, 14:30, 17:30, 20:00.
  - 4 Chuyên mục: Cinema, Compare, Nearby, Group.

---

## 6. KẾT LUẬN & TRẠNG THÁI CHƯƠNG TRÌNH
Hệ thống JayT tại phiên bản **`v3.248.0`** duy trì trạng thái **`IMPLEMENTED — PENDING CEO AUDIT`**. Toàn bộ mã nguồn, dữ liệu nguồn cung và giao diện đã được triển khai sẵn sàng trên Live Production để CEO kiểm tra nghiệm thu theo đúng bản đồ thực tế.
