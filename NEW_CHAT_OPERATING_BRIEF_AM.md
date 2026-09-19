# HƯỚNG DẪN VẬN HÀNH BẮT BUỘC CHO PHIÊN LÀM VIỆC MỚI (MỤC AM — JAYT-245)

**Dành cho:** Tất cả các Agent / Lập trình viên bắt đầu phiên làm việc mới trên JayT  
**Thời gian ban hành:** 2026-08-29T01:14:00+07:00  
**Căn cứ duy nhất:** [JAYT-245 — Tổng Chỉ Thị CEO Duy Nhất Về Vận Hành Và Go-Live JayT](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/02_CEO_DIRECTIVES/JAYT-245_TONG_CHI_THI_CEO_DUY_NHAT_VAN_HANH_JAYT.md)

---

## 1. Thứ Tự Đọc Bắt Buộc Khi Bắt Đầu Phiên Mới

Mọi agent / phiên làm việc mới **BẮT BUỘC** phải đọc theo đúng thứ tự 5 bước sau đây:

1. **[NEW_CHAT_OPERATING_BRIEF_AM.md](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/NEW_CHAT_OPERATING_BRIEF_AM.md)** (Tài liệu này — Nắm các quy tắc cốt lõi).
2. **[00_PROGRAM_BASELINE/CORE_BASELINE_MANIFEST_AM.json](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/00_PROGRAM_BASELINE/CORE_BASELINE_MANIFEST_AM.json)** (Manifest ngắn gọn chứa toàn bộ tài sản quyết định hệ thống).
3. **[00_PROGRAM_BASELINE/JAYT_245_HO_SO_NEN_TANG_VA_BAN_GIAO_AM.md](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/00_PROGRAM_BASELINE/JAYT_245_HO_SO_NEN_TANG_VA_BAN_GIAO_AM.md)** (Hồ sơ bàn giao chi tiết 9 phần).
4. **[02_CEO_DIRECTIVES/JAYT-245_TONG_CHI_THI_CEO_DUY_NHAT_VAN_HANH_JAYT.md](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/02_CEO_DIRECTIVES/JAYT-245_TONG_CHI_THI_CEO_DUY_NHAT_VAN_HANH_JAYT.md)** (Đọc từ mục mới nhất để nhận mệnh lệnh).
5. **[07_QUALITY_ASSURANCE/production_release_receipt_v3419.json](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/07_QUALITY_ASSURANCE/production_release_receipt_v3419.json)** (Đối soát trạng thái live thực tế trên Production).
*(Khi cần tra cứu đường dẫn chi tiết của các file phụ trợ, mới mở [00_PROGRAM_BASELINE/JAYT_245_PLATFORM_REGISTRY_AM.json](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/00_PROGRAM_BASELINE/JAYT_245_PLATFORM_REGISTRY_AM.json)).*

---

## 2. Các Nguyên Tắc Vận Hành Bất Khả Xâm Phạm

1. **Hợp Nhất Nền Tảng — Upgrade-Only Contract:**
   - Tuyệt đối không xóa, không ghi đè, không xây dựng lại từ đầu. Mọi thay đổi đều là nâng cấp kế thừa (migration / diff).
2. **Không Tự Ý Deploy Production:**
   - Phiên bản `v3.419.0` đang được khóa làm baseline rollback. Mọi giao diện mới phải chạy ở Staging (`jayt_storefront_staging.js`) và chờ CEO kiểm tra trực tiếp trước khi deploy.
3. **Báo Cáo Không Phải Là Bằng Chứng Nghiệm Thu:**
   - CEO luôn kiểm tra độc lập trên mã nguồn, raw bytes trong Vault và DOM Live. Antigravity không được tự nghiệm thu bằng lời nói hay báo cáo.
4. **Bảo Toàn 100% Sự Thật Bằng Chứng (Data Provenance):**
   - 0 claim giá giả, 0 voucher suy diễn, 0 locality bịa đặt.
   - Cấm 100% việc phục hồi các tài sản nằm trong vùng cách ly (`09_CONTAINMENT_QUARANTINE_NON_SERVED/` hoặc artifact AC).
5. **Affiliate Value-First:**
   - Duy trì trạng thái `PORTAL_ACCESS_NOT_VERIFIED`. 0 link tiếp thị, 0 chiến dịch, 0 secret.
