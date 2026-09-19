# HỒ SƠ ĐÁNH GIÁ ỨNG VIÊN B11_01 & B11_02 CHO ĐỢT PHÁT HÀNH RIÊNG (JAYT-325)

---

## 1. Mục Đích & Ranh Giới Cách Ly Production Tuyệt Đối

Hồ sơ này được thiết lập theo chỉ thị **JAYT-325** nhằm thực hiện công tác chuẩn bị hồ sơ đánh giá cho 2 ứng viên thuộc Lô 11:
- **B11_01:** `B11_01_TRA_CUU_CHUYEN_BAY_DANANG_SMART_CITY_1022`
- **B11_02:** `B11_02_HOAT_DONG_VAN_HOA_BAO_TANG_CHAM_1022`

### Ranh Giới Bất Biến:
1. **Tuyệt đối không đưa vào Production trong đợt vận hành hiện tại**: Live Production giữ nguyên vẹn ở phiên bản **v3.421.0** với đúng **22 thẻ**, zero deployment command.
2. **Trạng thái Staging hiện hữu**: Cả hai thẻ hiện đang hoạt động độc lập và ổn định trên Staging (:4173) với vị trí thẻ 23 và 24, trạng thái `PUBLIC_APPROVED_STAGING_ONLY`.
3. **Phát hành tương lai phải có quy trình độc lập**: Việc phát hành B11_01 và B11_02 (dự kiến v3.422.0) bắt buộc phải đóng gói ứng viên riêng, chạy kiểm thử DOM / so khớp URL độc lập, và có Sắc lệnh phê chuẩn riêng của Chủ tịch Hội đồng.

---

## 2. Thẩm Định Chi Tiết Ứng Viên 1: B11_01

- **Mã định danh**: `B11_01_TRA_CUU_CHUYEN_BAY_DANANG_SMART_CITY_1022`
- **Tiêu đề thẻ**: *Thông tin chuyến bay trên Danang Smart City*
- **Phân loại nội dung**: `T2_CIVIC_NAV` (Điều hướng tiện ích công dân)
- **Cổng phát hành gốc**: Cổng Thông tin Dịch vụ công 1022 Đà Nẵng (`1022.vn`)
- **Liên kết ngoại vi chuẩn**:
  ```text
  https://1022.vn/ra-mat-tien-ich-thong-tin-chuyen-bay-tren-ung-dung-danang-smart-city/
  ```
- **Bằng chứng gốc (Raw Evidence)**:
  - Tệp: `06_TRUST_AND_EVIDENCE/batch_11_ingress_vault/B11_01.raw.html` (229.477 bytes, HTTP 200)
  - SHA-256: `5fc20b13b11f26190db87b07cf6d7d462bc1a90bc459cd7654c2ea4fc9cfd190`
  - Trích đoạn nguyên văn (Offset UTF-8: 102480):
    > *"Dịch vụ được triển khai dựa trên việc chia sẻ dữ liệu theo thời gian thực từ Hệ thống cơ sở dữ liệu điều hành sân bay (AODB), chính thức đưa vào phục vụ người dân và du khách từ ngày 27/8/2026. Sự kiện nằm trong khuôn khổ Lễ công bố triển khai các dự án mở rộng Cảng hàng không quốc tế Đà Nẵng."*
- **Tuyên bố miễn trừ trách nhiệm bắt buộc**:
  > *"Thông tin tiện ích theo bài đăng của Cổng 1022 Đà Nẵng; không bán vé, không nhận đặt chỗ, không thu phí và không cam kết dữ liệu chuyến bay theo thời gian thực."*
- **8 Điều cấm nghiêm ngặt**: Cấm bán vé, cấm đặt chỗ, cấm thu phí, cấm cam kết thay hãng hàng không, cấm thu thập dữ liệu cá nhân, cấm affiliate, cấm tracking, cấm tự ý sửa đổi Production.
- **Trạng thái phê duyệt**: Hội đồng Điều hành đã ban hành quyết định [JAYT_323_B11_01_INDEPENDENT_PROMOTION_REVIEW_DECISION.md](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/01_EXECUTIVE_COUNCIL/JAYT_323_B11_01_INDEPENDENT_PROMOTION_REVIEW_DECISION.md) công nhận phán quyết: **`FUTURE_RELEASE_CANDIDATE_REVIEW_APPROVED`**.

---

## 3. Thẩm Định Chi Tiết Ứng Viên 2: B11_02

- **Mã định danh**: `B11_02_HOAT_DONG_VAN_HOA_BAO_TANG_CHAM_1022`
- **Tiêu đề thẻ**: *Lịch biểu diễn vũ điệu Champa — Bảo tàng Chăm Đà Nẵng*
- **Phân loại nội dung**: `T2_CIVIC_CULTURE` (Văn hóa & Di sản cộng đồng)
- **Cổng phát hành gốc**: `1022.vn` (Bài đăng ngày 28/08/2026)
- **Liên kết ngoại vi chuẩn**:
  ```text
  https://1022.vn/nhieu-trai-nghiem-moi-cho-du-khach-tai-bao-tang-dieu-khac-cham-da-nang/
  ```
- **Bằng chứng gốc (Raw Evidence)**:
  - Tệp: `06_TRUST_AND_EVIDENCE/batch_11_ingress_vault/B11_02.raw.html` (219.872 bytes, HTTP 200)
  - SHA-256: `452ed5ff689139b0201bab1c9312b539a12fd205cabb0b9c2fac2bc501c93fd8`
  - Trích đoạn nguyên văn (Offset UTF-8: 101313):
    > *"Chương trình nghệ thuật vũ điệu Champa gồm các tiết mục múa Apsara, hòa tấu nhạc cụ Chăm và múa Vũ hội làng Chăm sẽ được tổ chức vào buổi sáng các ngày 15 và 30 hằng tháng."*
- **Quy tắc lịch trình cố định**: Đã loại bỏ hoàn toàn các cụm từ mập mờ; chốt quy tắc tuần hoàn cụ thể: **Buổi sáng ngày 15 và 30 hằng tháng**.
- **Tuyên bố miễn trừ trách nhiệm bắt buộc**:
  > *"Lịch biểu diễn văn hóa nghệ thuật định kỳ tại Bảo tàng Điêu khắc Chăm Đà Nẵng; người xem cần đối soát thông báo trực tiếp từ ban quản lý bảo tàng trong trường hợp có điều chỉnh thời tiết hoặc lịch đón tiếp ngoại giao."*
- **Điều cấm nghiêm ngặt**: Cấm bán vé tham quan/tour, cấm đặt lịch thu phí, cấm chèn liên kết thương mại.
- **Trạng thái kiểm định**: Bộ kiểm thử độc lập `validate_jayt_323_b11_02_schedule_pre_audit.js` đã xác nhận **23/23 PASS** tại biên nhận [JAYT_323_B11_02_SCHEDULE_PRE_AUDIT_QA_RECEIPT.json](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/runtime_evidence/JAYT_323_B11_02_SCHEDULE_PRE_AUDIT_QA_RECEIPT.json).

---

## 4. Điều Kiện Tiên Quyết Cho Đợt Phát Hành Riêng Trong Tương Lai

Để bất kỳ thẻ nào trong Lô 11 được xem xét chuyển từ Staging sang Production trong tương lai, quy trình bắt buộc phải hội đủ 5 tiêu chí:
1. **Ban hành Quyết định Nâng Hạng Độc Lập** cho từng thẻ (đặc biệt là phiên họp đánh giá cho B11_02).
2. **Khởi tạo Danh Mục Ứng Viên Riêng**: Thiết lập registry ứng viên riêng (ví dụ: `RELEASE_CANDIDATE_v3.422.0_REGISTRY.json`).
3. **Đóng gói Bundle & Preview Độc Lập**: Kiểm tra trực tiếp trên cổng preview độc lập (ví dụ cổng 4175).
4. **Hậu kiểm DOM & URL Chính Xác**: Xác minh 24/24 URL khớp tuyệt đối (`===`), 0 lỗi console, WCAG AA contrast.
5. **Sắc Lệnh Phát Hành Có Chữ Ký Của Chủ Tịch Hội Đồng**: Phê chuẩn riêng trước khi có bất kỳ lệnh deploy nào.
