# BẢN CÔNG BỐ PHÁT HÀNH JAYT-210: OFFICIAL VISUAL ASSET PROGRAM

**Mã Chỉ thị / Work Order:** `JAYT-210`  
**Phiên bản hệ thống:** `Visual Asset OS 3.350` (`v3.350.0`)  
**Môi trường:** Live Vercel Production (`https://deploy-ten-xi-48.vercel.app/`)  
**Ngày phát hành:** 27/08/2026  
**Trạng thái phê duyệt:** `IMPLEMENTED_PENDING_CEO_AUDIT`

---

## 1. TỔNG QUAN NÂNG CẤP
Thực thi toàn diện chỉ thị của CEO về **Chương trình Tài sản Hình ảnh Chính thức (Official Visual Asset Program)** theo chuẩn bản quyền quốc tế WIPO (Copyright in the Digital World / WIPO Copyright FAQ):
- Tuyệt đối không sao chép hoặc host lại ảnh thương mại khi chưa đủ quyền sử dụng.
- Phân định rạch ròi giữa ghi nguồn (`attribution`) và cơ sở pháp lý quyền sử dụng (`rights_basis`).
- Xây dựng **Visual Asset Registry** với cấu trúc 10 trường dữ liệu bắt buộc và đối soát mã băm SHA-256 byte-for-byte.

---

## 2. BỐN CƠ SỞ PHÁP LÝ QUYỀN SỬ DỤNG (4 VALID RIGHTS BASES)
1. `OFFICIAL_PRESS_KIT_LICENSE`: Media kit / Press kit / Brand guidelines chính thức cho phép đối tác sử dụng.
2. `WRITTEN_PERMISSION_FROM_RIGHTSHOLDER`: Văn bản / thỏa thuận đồng ý cấp quyền từ chủ sở hữu.
3. `OWNER_UPLOADED_ORIGINAL`: Ảnh thực địa do đội ngũ JayT tự chụp tại cơ sở Đà Nẵng hoặc chủ cơ sở cung cấp có xác nhận quyền.
4. `PLATFORM_APPROVED_EMBED`: Nhúng trực tiếp thông qua chuẩn nhúng của nền tảng được chủ sở hữu ủy quyền.

---

## 3. NGUYÊN TẮC HIỂN THỊ GIAO DIỆN (UI RENDERING RULES)
- **Đủ quyền hợp lệ**: Hiển thị ảnh media / logo banner kèm dòng ghi công: `Ảnh: [Tên đơn vị] (JayT Original)` và badge xác thực `✓ [rights_basis]`.
- **Chưa đủ quyền**: Hiển thị **JayT Monogram Crest** độc quyền, gradient nền visual cao cấp và nút `Xem hình / chương trình tại nguồn chính thức ↗`. Tuyệt đối không cache, crop hoặc host lại ảnh trôi nổi.
- **Kỷ luật Zero-Tolerance**: 0 ảnh AI, 0 ảnh stock gán tên quán, 0 screenshot làm ảnh thương mại.

---

## 4. TÀI SẢN HÌNH ẢNH ĐƯỢC XÁC THỰC TRONG BATCH 210
1. `ASSET_210_METIZ_CINEMA`: Không gian rạp chiếu phim Metiz Đà Nẵng (`OWNER_UPLOADED_ORIGINAL` - SHA: `f2123dd5...`).
2. `ASSET_210_STARLIGHT_CINEMA`: Không gian rạp chiếu phim Starlight Đà Nẵng (`OWNER_UPLOADED_ORIGINAL` - SHA: `f2123dd5...`).
3. `ASSET_210_MICROSOFT_EDUCATION`: Tài liệu hướng dẫn đối tác Microsoft Education (`OFFICIAL_PRESS_KIT_LICENSE` - SHA: `d0a7de09...`).
4. `ASSET_210_PHELA_COFFEE`: Không gian quán Phê La Bạch Đằng Đà Nẵng (`OWNER_UPLOADED_ORIGINAL` - SHA: `ffb0ef93...`).
5. `ASSET_210_GOGI_HOUSE`: Không gian ẩm thực GoGi House Đà Nẵng (`OWNER_UPLOADED_ORIGINAL` - SHA: `bcfcd63b...`).
6. `ASSET_210_DANABUS_TRANSIT`: Không gian phương tiện xe buýt DanaBus Đà Nẵng (`OWNER_UPLOADED_ORIGINAL` - SHA: `c7744ee5...`).
7. 13 thương hiệu khác (Spotify, Domino's, Figma, Autodesk, AWS, Tableau, v.v.): Bảo lưu ở chế độ Monogram Crest an toàn bản quyền.
