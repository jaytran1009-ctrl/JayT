# JAYT PROGRAM: QUY CHẾ NÂNG CẤP BẤT BIẾN (UPGRADE-ONLY CONTRACT AZ)

**Căn cứ pháp lý:** [JAYT-245 — Tổng Chỉ Thị CEO Duy Nhất Về Vận Hành Và Go-Live JayT (Mục AZ)](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/02_CEO_DIRECTIVES/JAYT-245_TONG_CHI_THI_CEO_DUY_NHAT_VAN_HANH_JAYT.md)  
**Thời gian ban hành:** 2026-08-29T02:32:00+07:00  
**Đối tượng áp dụng:** Toàn bộ Agent Antigravity, Kỹ sư, Subagent, và Thành viên Hội đồng 7 Phòng ban.

---

## 1. Nguyên Tắc Cốt Lõi (Core Contract Principles)

Mọi thay đổi trên nền tảng JayT **bắt buộc** phải tuân thủ nguyên tắc **Nâng Cấp Kế Thừa (Upgrade-Only)**:

1. **Khởi Điểm Bắt Buộc (Declared Base Epoch):** Mọi bản vá hoặc tính năng mới phải chỉ rõ `base_epoch` (Ví dụ: xuất phát từ `v3.422.0-staging.ay`), không được tạo ra từ khoảng trống (clean-slate).
2. **Khai Báo Định Danh Ảnh Hưởng (Affected Persistent IDs):** Mọi thành phần mã nguồn, dữ liệu, test bị tác động phải được liệt kê rõ persistent ID theo [JAYT_PLATFORM_CATALOG_AZ.json](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/00_PROGRAM_BASELINE/JAYT_PLATFORM_CATALOG_AZ.json).
3. **Cấm Ghi Đè / Thay Thế File Nguồn Gốc (Zero Blind Replacement):** Không được chạy script tạo lại toàn bộ file nguồn thay thế cho phiên bản trước mà không có diff/migration logic rõ ràng.
4. **Cô Lập Môi Trường (Strict Staging Isolation):** Phiên bản mới chỉ được triển khai lên URL staging độc lập; cấm deploy, alias hoặc ghi đè môi trường Production `v3.419.0`.
5. **Cơ Chế Khôi Phục (Rollback Pointer):** Mỗi lần triển khai phải có con trỏ rollback trỏ về phiên bản an toàn trước đó.
6. **Ràng Buộc Dữ Liệu Thực (Data Truth Binding):** Không một thẻ nào được công bố trên giao diện nếu thiếu liên kết chứng minh tới URL chính thức hoặc raw capture.

---

## 2. Tiêu Chí Đánh Giá Của Trình Kiểm Định Tự Động (Validator Invariants)

Trình kiểm định tự động `test_jayt_upgrade_only_validator_az.js` sẽ **báo lỗi (Fail-Closed)** nếu phát hiện bất kỳ vi phạm nào sau đây:

- ❌ Vi phạm 1: Thay thế file nguồn mà không có biên nhận phát hành (Release Receipt).
- ❌ Vi phạm 2: Import hoặc sử dụng tài sản trong danh mục cách ly (Quarantined Assets) vào Storefront công khai.
- ❌ Vi phạm 3: Con trỏ hiện trạng `JAYT_CURRENT_STATE_AZ.json` không khớp SHA-256 với file Epoch thực tế.
- ❌ Vi phạm 4: Phát hiện link affiliate thương mại hoặc CTA hoa hồng khi cổng M3 vẫn ở trạng thái `PORTAL_ACCESS_NOT_VERIFIED`.
- ❌ Vi phạm 5: Ghi đè hoặc làm thay đổi mã nguồn của Production Live `v3.419.0`.
- ❌ Vi phạm 6: Thẻ hiển thị trên giao diện có liên kết trỏ về trang chủ chung chung thay vì trang thể lệ/menu chi tiết.
