# JAYT TRACK 1 PORTAL CAPABILITY DISCLOSURE (074)

**Mã tài liệu**: `TRACK-1-PORTAL-CAPABILITY-074`  
**Chỉ thị điều hành**: `JAYT-074 — MVP CLICK-TRACKING FIRST PIVOT`  
**Thời điểm ban hành**: 2026-08-24T15:58:00+07:00  
**Trạng thái quản trị**: `APPEND_ONLY_GROUND_TRUTH_DISCLOSURE`

---

## 1. KẾT LUẬN THẨM ĐỊNH NĂNG LỰC CỔNG SHOPEE AFFILIATE (ACCOUNT TIER tritran1009)

Qua thực nghiệm đối soát trên giao diện Partner Center thực tế của tài khoản `tritran1009` (`partner_id: 17372870594`), xác lập 3 kết luận sự thật khách quan:

1. **`Báo cáo chuyển đổi` (Conversion Report)**: Chỉ phát sinh và cho phép xuất dữ liệu sau khi đã có lưu lượng click và đơn hàng thực tế phát sinh qua link affiliate. Bảng dữ liệu hiện tại trống (`0 records`) nên nút xuất file bị khóa.
2. **`Hoa hồng Sản phẩm` (Product Offers)**: Cho phép tạo link tiếp thị rút gọn (`s.shopee.vn/...`), nhưng không có chức năng xuất file tự động kèm đầy đủ 5 chiều ngữ cảnh (giá, điều khoản áp dụng, hạn dùng `valid_to` cụ thể theo chuẩn kiểm định của JayT).
3. **`Product Feed` (Automated Feed)**:
   - **Trạng thái quan sát được**: `PRODUCT_FEED: NOT_USABLE_FOR_EXPORT_ON_CURRENT_PORTAL_SESSION` (Giao diện hiển thị bảng trống `Không có dữ liệu`, không có nút xuất dữ liệu trực tiếp trong phiên hiện tại).
   - **Nguyên nhân kỹ thuật**: `CAUSE: UNVERIFIED` (Không suy diễn nguyên nhân do cấp độ tài khoản hay quyền hạn; chỉ ghi nhận đúng sự thật quan sát được trên giao diện).

---

## 2. ĐỊNH HƯỚNG VẬN HÀNH TINH GỌN (MVP: CLICK-TRACKING TRƯỚC, CATALOG TỰ ĐỘNG SAU)

Để tối ưu hóa chi phí vận hành (OPC vốn 0) và không lặp lại các vi phạm suy diễn dữ liệu:

1. **Duy Trì Staging Chuẩn Mực**: Giữ **3 deal Staging** đã được CEO nghiệm thu độc lập (Galaxy Happy Day, Metiz Super Monday, Metiz U22) làm dữ liệu tham chiếu nội bộ chuẩn mực.
2. **Kích Hoạt MVP Click-Tracking**:
   - Sử dụng các link affiliate chính chủ được tạo từ mục *Hoa hồng Sản phẩm* của tài khoản `tritran1009` để đo lường chuyển đổi và lưu lượng người dùng thật.
   - Minh bạch 100% affiliate disclosure đối với mọi liên kết dẫn ra sàn TMĐT.
3. **Đóng Băng Tự Động Hóa Catalog (Catalog Automation Standby)**:
   - Tạm dừng tự động hóa catalog lớn của Track 1 cho đến khi Shopee cấp quyền `Product Feed` hoặc `Open API Key`.
   - Tuyệt đối cấm cào màn hình (screen-scraping), chép ảnh thành bảng CSV, hoặc tự suy diễn thời hạn/điều kiện ưu đãi.

---

## 3. BẢO TOÀN TRẠNG THÁI BẤT BIẾN HỆ THỐNG

- **Production Feed**: Khóa hoàn toàn (`deals_feed.json: []`, `is_approved: false`).
- **Staging Feed**: 3 deals thật đạt 100% kiểm thử Staging Acceptance (`8/8 PASS`) và Cross-Layer Lineage Gate (`6/6 PASS`).
- **Track 2 Pipeline**: Lưu trữ an toàn (`PAUSED`).
