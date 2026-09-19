# SỔ TAY VẬN HÀNH & TRIỂN KHAI HỆ THỐNG JAYT (OPERATIONS RUNBOOK)
**Cơ quan ban hành:** Ban Điều Hành Kỹ Thuật JayT Corp & GStack DevOps  
**Tiêu chuẩn:** Runtime-Active Pointer, Content-Addressed Sealed Builds & Two-Phase Recovery

---

## 1. QUY CHẾ BẢO VỆ CONTENT-ADDRESSED BUILDS (READ-ONLY)
- Mỗi bản build tại `08_RELEASE_VAULT/releases/build_*` được gán định danh Content-Addressed SHA-256 Merkle Root và thiết lập thuộc tính `IsReadOnly = $true`.
- **Kỷ luật an toàn:** Mã nguồn gốc (`03_SOURCE_OF_TRUTH/`, `05_DEAL_AND_AFFILIATE/`) TUYỆT ĐỐI KHÔNG bị đặt read-only để bảo đảm khả năng phát triển liên tục.

---

## 2. QUY TRÌNH MỞ KHÓA BẢN BUILD ĐÃ SEAL (UNLOCK PROCEDURE)
Khi có sự cố cần can thiệp khẩn cấp vào một bản build lịch sử:
1. Mở PowerShell với quyền thích hợp.
2. Thực thi lệnh gỡ bỏ thuộc tính Read-Only cho thư mục build đích:
   ```powershell
   Get-ChildItem -Path "08_RELEASE_VAULT\releases\build_TARGET" -Recurse -File | ForEach-Object {
       Set-ItemProperty -Path $_.FullName -Name IsReadOnly -Value $false
   }
   ```
3. Sau khi sửa đổi, bắt buộc phải chạy lại `backup.ps1` để tính toán lại Content-Digest SHA-256 mới. Không được giữ nguyên bản build cũ bị lệch hash.

---

## 3. QUY TRÌNH KHÔI PHỤC KHẨN CẤP (ROLLBACK RUNBOOK)
1. **Kiểm tra con trỏ phát hành:** Đọc `08_RELEASE_VAULT/releases/active_release_pointer.json`.
2. **Kích hoạt Rollback tự động:**
   ```powershell
   & "08_RELEASE_VAULT\scripts\rollback.ps1"
   ```
3. **Cơ chế vận hành:**
   - Pre-validation 100% SHA-256 của `BUILD_MANIFEST.json` tại build đích trước khi chuyển pointer.
   - Chuyển `active_build_path` sang `previous_build_path` (Pure Pointer Switch - Zero `Copy-Item`).
   - Khởi chạy server kiểm tra Live HTTP `/healthz` chứng minh runtime đã phục hồi đúng `previous_build_id`.
   - Ghi nhận chỉ số RTO vào nhật ký vận hành.

---

## 4. BẢO MẬT REDIRECT & CHỐNG SSRF (/out ENDPOINT)
- Endpoint `/out` thực thi bộ phân giải server-side fail-closed.
- Bắt buộc schema `https://`, loại bỏ credential `@`, đối soát với `domain_catalog.json` và chặn toàn bộ dải IP Private/Loopback.
- Bất kỳ URL nào vi phạm lập tức trả về mã `403 Forbidden` (`FORBIDDEN_OUTBOUND_REDIRECT`).
