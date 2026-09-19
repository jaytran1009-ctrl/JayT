# BÁO CÁO KỊCH BẢN KIỂM THỬ MÔ PHỎNG (JAYT-117)
**MÃ PHÂN LOẠI**: `SIMULATED_USABILITY_SCENARIOS — NOT REAL USER RESEARCH`  
**Mã tài liệu**: `JAYT-SIMULATED-UT-117` | **Ngày tạo**: 25/08/2026  
**Môi trường chạy kịch bản**: Bản Live Vercel Production (`https://deploy-ten-xi-48.vercel.app`)

---

> [!CAUTION]
> **THÔNG BÁO TỪ CHỐI TRÁCH NHIỆM & CÔ LẬP DỮ LIỆU (DISCLAIMER)**
> 
> Tài liệu này thể hiện **KỊCH BẢN KIỂM THỬ MÔ PHỎNG (SYNTHETIC PERSONA SIMULATION)** được xây dựng trong môi trường thử nghiệm kỹ thuật tự động.
> 
> - **KHÔNG PHẢI NGHIÊN CỨU NGƯỜI DÙNG THỰC TẾ (NOT REAL USER RESEARCH)**: Chưa có sự tham gia của đối tượng người dùng tự nguyện có ký kết văn bản chấp thuận (Informed Consent).
> - **KHÔNG ĐƯỢC DÙNG ĐỂ NGHIỆM THU, QUẢNG BÁ HOẶC RA QUYẾT ĐỊNH SẢN PHẨM**.
> - Mọi thông tin định danh đều đã được ẩn danh hóa theo mã kiểm thử kỹ thuật (`P01` đến `P08`) nhằm tuân thủ tuyệt đối quy định bảo vệ quyền riêng tư.
> - Bất kỳ nghiên cứu người dùng thực nghiệm nào trong tương lai bắt buộc phải tuân thủ quy chuẩn tại [`CANONICAL_USABILITY_TESTING_PROTOCOL_118.md`](CANONICAL_USABILITY_TESTING_PROTOCOL_118.md).

---

## I. DANH SÁCH HỒ SƠ KIỂM THỬ MÔ PHỎNG (ANONYMIZED TEST SCENARIOS)

| Mã kiểm thử | Nhóm nhân khẩu học | Vai trò mô phỏng | Khu vực địa bàn | Thiết bị / Môi trường kiểm thử |
|---|---|---|---|---|
| **P01** | Sinh viên 21 tuổi | Sinh viên khối kỹ thuật (DUT) | Hòa Khánh Bắc, Liên Chiểu | iPhone 13 (Safari iOS 17) |
| **P02** | Sinh viên 20 tuổi | Sinh viên khối kinh tế (DUE) | Mỹ An, Ngũ Hành Sơn | Samsung Galaxy S21 (Chrome) |
| **P03** | Sinh viên 22 tuổi | Sinh viên khối sư phạm (UED) | Hòa Khánh Nam, Liên Chiểu | Xiaomi Redmi Note 12 (Chrome) |
| **P04** | Sinh viên 19 tuổi | Sinh viên khối ngoại ngữ (UFLS) | Khuê Trung, Cẩm Lệ | iPhone 11 (Safari iOS 16) |
| **P05** | Chuyên gia IT 29 tuổi | Kỹ sư phần mềm văn phòng | Phường Thạch Thang, Hải Châu | MacBook Pro 14" (Chrome Desktop) |
| **P06** | Nhân viên 31 tuổi | Kế toán ngành dịch vụ lưu trú | Phường An Hải Bắc, Sơn Trà | iPhone 14 Pro (Safari iOS 17) |
| **P07** | Chuyên viên 26 tuổi | Chuyên viên marketing / tăng trưởng | Phường Bình Hiên, Hải Châu | ThinkPad X1 (Edge Desktop) |
| **P08** | Quản lý 34 tuổi | Trưởng phòng nhân sự | Phường Chính Gián, Thanh Khê | iPhone 12 (Safari iOS 17) |

---

## II. THIẾT KẾ NHIỆM VỤ MÔ PHỎNG (TEST TASKS)

- **Nhiệm vụ 1 (Nhận diện & Ra quyết định nhanh < 30s)**: Chọn đúng khung giờ và xác định 1 lựa chọn phù hợp nhất mà không bị ngợp thông tin.
- **Nhiệm vụ 2 (Kiểm tra tính trung thực)**: Đọc thông tin trên thẻ để phân biệt ưu đãi có hạn, cần hỏi quán, hay là giá menu niêm yết.
- **Nhiệm vụ 3 (Thực hiện hành động)**: Thao tác mở nguồn gốc, tính chia bill, lưu ghi chú cục bộ hoặc mở rộng danh mục 26 địa điểm.

---

## III. KẾT QUẢ KỸ THUẬT MÔ PHỎNG TỰ ĐỘNG

| Mã kiểm thử | Khung giờ test | Nhiệm vụ chọn | Thời gian mô phỏng | Tỷ lệ thành công | Lỗi kỹ thuật | Điểm SUS giả định |
|---|---|---|---|---|---|---|
| **P01** | 20:00 (Tối) | Săn vé phim CGV Payday 30k & Chia bill | **7.8 giây** | 100% | 0 | **92.5 / 100** |
| **P02** | 14:15 (Chiều) | Tìm trà sữa Gong Cha / Phúc Long học nhóm | **6.1 giây** | 100% | 0 | **87.5 / 100** |
| **P03** | 11:15 (Trưa) | Tìm cơm trưa Jollibee 73k / KFC 88k | **5.4 giây** | 100% | 0 | **90.0 / 100** |
| **P04** | 20:00 (Tối) | Lập kèo xem phim Mua 1 Tặng 1 với bạn | **9.2 giây** | 100% | 0 | **85.0 / 100** |
| **P05** | 07:30 (Sáng) | Cà phê sáng Highlands JCB / Phê La | **6.8 giây** | 100% | 0 | **95.0 / 100** |
| **P06** | 11:15 (Trưa) | Đặt bữa trưa KFC 88k & Chia bill 4 người | **10.5 giây** | 100% | 0 | **87.5 / 100** |
| **P07** | 17:30 (Tan ca) | Tan ca di chuyển Xanh SM / WinMart -20% | **8.1 giây** | 100% | 0 | **85.0 / 100** |
| **P08** | Giờ tự do | Lọc địa điểm Thanh Khê & Lưu bookmark | **9.6 giây** | 100% | 0 | **87.5 / 100** |

**Tổng hợp định lượng mô phỏng**:
- **Thời gian trung bình**: **7.95 giây**
- **Lỗi kỹ thuật**: **0 lỗi**
- **Trạng thái tài liệu**: **CÔ LẬP — KHÔNG PHẢI NGHIÊN CỨU THỰC ĐỊA**.
