# 🛡️ JAYT-134A: CROSS-FUNCTIONAL SCORE CALIBRATION & CUSTOMER RED TEAM PACK

**Cơ chế điều hành**: `JAYT-134A — CROSS-FUNCTIONAL SCORE CALIBRATION & CUSTOMER RED TEAM`  
**Phiên bản hệ thống**: `v3.257.0`  
**Trạng thái điều hành**: `READY_FOR_CEO_FINAL_AUDIT`  
**Production Live URL**: [https://deploy-ten-xi-48.vercel.app](https://deploy-ten-xi-48.vercel.app)  
**Ngày hiệu chỉnh**: 26/08/2026

---

## 1. KHẮC PHỤC 5 LỖI QUẢN TRỊ THEO CHỈ THỊ CEO

Thực hiện nghiêm túc phán quyết của CEO, toàn bộ các phòng ban đã tiến hành tự phê bình và hiệu chỉnh chéo (Cross-Calibration) để xóa bỏ tư duy cục bộ:

```text
                  BẢNG HIỆU CHỈNH 5 LỖI QUẢN TRỊ (JAYT-134A)
┌──────────────────────────────────────┬─────────────┬─────────────┬────────────────────────────────────────────────────────┐
│ Lỗi quản trị do CEO chỉ ra           │ Điểm tự gán │ Điểm chuẩn  │ Biện pháp khắc phục & Bằng chứng thực tế               │
├──────────────────────────────────────┼─────────────┼─────────────┼────────────────────────────────────────────────────────┤
│ 1. Privacy tự chấm 10/10 sai quy tắc │ 10.0 / 10   │ 8.5 / 10    │ Hạ điểm: Bảo mật cao không bù đắp được thiếu hụt data  │
│ 2. CTO thiếu bằng chứng độc lập      │ 9.5 / 10    │ 8.0 / 10    │ Chạy Puppeteer E2E đo thời gian DOM và dark mode thật  │
│ 3. QA chưa test click/form thực tế   │ 9.0 / 10    │ 7.5 / 10    │ Chạy Red Team E2E click form, .ics, share, split bill  │
│ 4. CDO phủ nhận rủi ro thông tin     │ 9.0 / 10    │ 8.0 / 10    │ Thừa nhận: Thiếu giá delivery thật là rủi ro cho khách │
│ 5. Thiếu phản biện chéo              │ Đơn phương  │ Đa chiều    │ Mỗi điểm số được ít nhất 2 phòng ban khác chất vấn     │
└──────────────────────────────────────┴─────────────┴─────────────┴────────────────────────────────────────────────────────┘
```

---

## 2. KẾT QUẢ 4 BÀI KIỂM THỬ KHÁCH HÀNG THỰC TẾ (CUSTOMER RED TEAM)

Toàn bộ 4 kịch bản được kiểm thử trực tiếp trên môi trường Live Production bằng Puppeteer E2E ([test_customer_red_team_e2e_134a.js](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/test_customer_red_team_e2e_134a.js)):

---

### 🧪 Bài 1: 11:05 tại Hòa Khánh (Tìm bữa trưa sinh viên)
- **Hành vi người dùng**: Sinh viên Bách Khoa/Sư Phạm mở JayT lúc 11:05 trưa để tìm quán ăn gần hoặc đặt đồ ăn.
- **Trải nghiệm thực tế**:
  - Tầng 1 tự động hiển thị dock `11:05 Cứu đói bữa trưa` và lọc cụm `Hòa Khánh`.
  - Thẻ Hero & Hot Now hiển thị các món ăn niêm yết: **KFC Dzựt Deal 88k**, **Lotteria Cơm Trưa 40k**.
  - **Minh bạch nhãn**: Thẻ mang nhãn rõ ràng `📋 GIÁ THAM KHẢO (MENU NIÊM YẾT)`, người dùng nhận biết ngay đây là giá niêm yết chứ không phải deal giảm giá live riêng tại cửa hàng.
- **CTA Audit**: Bấm `Xem menu gốc ↗` mở trang chính thức; bấm `🧮 Chia bill` nạp ngay số tiền vào máy tính.
- **Ảnh chụp bằng chứng**: [`runtime_evidence/red_team_134a/scenario_1_hoakhanh_1105.png`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/runtime_evidence/red_team_134a/scenario_1_hoakhanh_1105.png)
- **Hạn chế phát hiện**: Chưa có quán cơm/bún sinh viên bình dân (20k-30k) ở ngõ Ngô Thì Nhậm, Tôn Đức Thắng.
- **Người chịu trách nhiệm**: `Head of Deal Operations` (Khắc phục trong `JAYT-135`).

---

### 🧪 Bài 2: 14:30 tại Ngũ Hành Sơn (Tìm quán học nhóm / Cà phê)
- **Hành vi người dùng**: Nhóm sinh viên Kinh Tế / FPT tìm quán trà sữa, cà phê để ngồi học nhóm buổi chiều.
- **Trải nghiệm thực tế**:
  - Tầng 1 chuyển sang `14:30 Học nhóm / Cà phê`.
  - Hiển thị: **Phúc Long Trà Ô Long 55k**, **Gong Cha Alisan 53k**, **Phê La 55k**, **Starlight Combo 10k**.
  - **Không có Happy Hour ảo**: Không đưa ra bất kỳ lời hứa hẹn giảm 50% hay mua 1 tặng 1 nào chưa có bằng chứng leaf capture.
  - Hộp giao hàng hiển thị cảnh báo minh bạch: `⚠️ TÙY TÀI KHOẢN & GIỎ HÀNG — JayT không hiển thị voucher ảo chung`.
- **CTA Audit**: Nút `👥 Lập kèo` mở ngay bảng lập kế hoạch đi nhóm; nút `🧮 Chia bill` chia đều tiền theo đầu người.
- **Ảnh chụp bằng chứng**: [`runtime_evidence/red_team_134a/scenario_2_nguhanhson_1430.png`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/runtime_evidence/red_team_134a/scenario_2_nguhanhson_1430.png)
- **Người chịu trách nhiệm**: `CPO & CX Lead`.

---

### 🧪 Bài 3: 17:30 tại Hải Châu (Kèo phim / Ăn tối + Xuất Lịch + Lập Kèo)
- **Hành vi người dùng**: Người đi làm/sinh viên tan học tìm kèo xem phim tối hoặc ăn nướng cùng bạn bè.
- **Trải nghiệm thực tế**:
  - Giao diện tự động chuyển đổi sang **Dark Mode** dịu mắt.
  - Hiển thị: **Metiz Cinema Vé U22 45.000₫**, **CGV Payday 30.000₫**, **Starlight Combo 10.000₫**, **GoGi Nhóm 529.000₫ (~176k/người)**.
  - Điều kiện hiển thị rõ: *Metiz áp dụng T2-T6 cho HSSV/CCCD dưới 22 tuổi; CGV áp dụng mua từ 2 vé trên App*.
- **CTA Audit**:
  - Bấm `📅 Nhắc lịch (.ics)`: Trình duyệt tạo và tải ngay tệp `JayT_CGV_Payday_30k_Da_Nang.ics` theo chuẩn RFC 5545 (không cần đăng nhập).
  - Bấm `👥 Lập kèo`: Mở Bảng Lập Kèo Nhóm với nội dung soạn sẵn để gửi qua Zalo/Messenger.
- **Ảnh chụp bằng chứng**: [`runtime_evidence/red_team_134a/scenario_3_haichau_1730.png`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/runtime_evidence/red_team_134a/scenario_3_haichau_1730.png)
- **Người chịu trách nhiệm**: `CTO & CDO`.

---

### 🧪 Bài 4: So Sánh Giỏ Hàng Delivery (Máy Tính Thực Trả Cục Bộ)
- **Hành vi người dùng**: Người dùng nhập giỏ hàng thực tế đang thấy trên ShopeeFood/Grab để kiểm tra thực trả và chia tiền.
- **Trải nghiệm thực tế**:
  - Bấm `Nhập giỏ hàng để đối chiếu 🧮` mở Bàn So Sánh Thực Trả.
  - Người dùng có thể chọn nhanh các mức giá ví dụ (88k, 120k, 180k) hoặc tự gõ số tiền:
    - Giá món: `120.000₫`
    - Phí ship: `18.000₫`
    - Voucher giảm: `25.000₫`
    - Đơn tối thiểu: `100.000₫`
    - Số người: `2`
  - **Kết quả tính toán chuẩn xác**:
    - Thực trả tổng đơn: `113.000₫`
    - Mỗi người trả: `56.500₫`
    - Tiết kiệm được: `25.000₫`
  - Bấm `Sao chép kết quả chia bill 📋` lưu ngay text vào clipboard để dán vào nhóm chat.
- **Ảnh chụp bằng chứng**: [`runtime_evidence/red_team_134a/scenario_4_delivery_calculator.png`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/runtime_evidence/red_team_134a/scenario_4_delivery_calculator.png)
- **Người chịu trách nhiệm**: `CTO & QA Director`.

---

## 3. MA TRẬN ĐIỂM ĐÃ HIỆU CHỈNH CHÉO (CALIBRATED SCORECARD)

Sau khi phản biện chéo giữa 10 phòng ban, điểm số được điều chỉnh về mức thực tế và trung thực:

```text
               MA TRẬN ĐIỂM HIỆU CHỈNH CHÉO LIÊN PHÒNG BAN (JAYT-134A)
┌──────────────────────────────────────────┬───────────┬─────────────┬───────────────────────────────────────────────────────┐
│ Hành trình khách hàng                    │ Điểm 134  │ Điểm chuẩn  │ Lý do hiệu chỉnh chéo từ các phòng ban                │
├──────────────────────────────────────────┼───────────┼─────────────┼───────────────────────────────────────────────────────┤
│ 1. Rạp phim, giá vé & lập kèo            │ 7.5 / 10  │ 7.5 / 10    │ Giữ nguyên: 5 deal có capture, lịch rạp 5 chuỗi       │
│ 2. So sánh thực trả giao đồ ăn           │ 4.5 / 10  │ 4.0 / 10    │ Hạ điểm: Máy tính tốt nhưng chưa có API giá tự động   │
│ 3. Khám phá món/quán gần theo cụm & giờ  │ 6.5 / 10  │ 6.5 / 10    │ Giữ nguyên: 5 Cụm 26 địa điểm + Lọc 5 khung giờ       │
│ 4. Happy hour/F&B tạo thói quen          │ 5.5 / 10  │ 5.0 / 10    │ Hạ điểm: Chưa có deal live F&B nào ngoài menu         │
│ 5. Minh bạch dữ liệu, an toàn & CSKH     │ 8.5 / 10  │ 8.0 / 10    │ Hạ điểm: Privacy & CSKH hạ từ 10 xuống 8.0-8.5        │
├──────────────────────────────────────────┼───────────┼─────────────┼───────────────────────────────────────────────────────┤
│ 🏆 ĐIỂM TRUNG BÌNH TOÀN DIỆN (OVERALL)   │ 6.5 / 10  │ 6.2 / 10    │ 🟠 BETA HỮU ÍCH — ĐIỂM NGHẼN LÀ NGUỒN CUNG F&B        │
└──────────────────────────────────────────┴───────────┴─────────────┴───────────────────────────────────────────────────────┘
```

---

## 4. BẢNG PHÂN CÔNG TRÁCH NHIỆM & BUGS CẦN SỬA

| STT | Tồn tại phát hiện qua Red Team | Phòng ban phụ trách | Biện pháp xử lý cụ thể | Sprint cam kết |
|---|---|---|---|:---:|
| 1 | Thiếu quán ăn sinh viên giá rẻ (<35k) quanh ĐHBK/ĐHKT | `Deal Ops` + `Data Trust` | Thành lập đội Ground Scout đi chụp menu thực tế tại quán | `JAYT-135` |
| 2 | Chưa có cơ chế đối soát thời hạn deal rạp tự động (TTL) | `COO` + `CTO` | Viết script TTL monitor chạy hàng ngày tự hạ deal hết hạn | `JAYT-135` |
| 3 | Máy tính giỏ hàng cần thêm mẹo gộp đơn nhóm freeship | `Product` + `Engineering`| Bổ sung thanh gợi ý "Thêm 1 món để đạt freeship" | `JAYT-136` |
| 4 | Tầng 4 & 5 chưa có liên kết affiliate chính thức | `Commercial Director` | Đàm phán trực tiếp với đối tác, cấm tuyệt đối link lậu | `JAYT-137` |

---

Kính trình CEO nghiệm thu Báo Cáo Hiệu Chỉnh Điểm Chéo và Kiểm Thử Khách Hàng Thực Tế **JAYT-134A**.
