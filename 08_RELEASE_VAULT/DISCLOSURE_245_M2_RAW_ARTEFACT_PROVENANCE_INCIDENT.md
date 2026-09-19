# CÔNG BỐ SỰ CỐ QUẢN TRỊ: CÁCH LY RAW ARTEFACT TỰ TẠO VÀ BÁO CÁO M2 TÁI LẬP (JAYT-245)

**Mã công bố:** `DISCLOSURE_245_M2_RAW_ARTEFACT_PROVENANCE_INCIDENT`  
**Thời gian:** 2026-08-28T22:45:00+07:00  
**Cơ chế lưu trữ:** Append-Only (Bất biến) tại `08_RELEASE_VAULT/`  
**Chỉ thị căn cứ:** [JAYT-245 — Tổng Chỉ Thị CEO Duy Nhất Về Vận Hành Và Go-Live JayT (Mục H.5)](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/02_CEO_DIRECTIVES/JAYT-245_TONG_CHI_THI_CEO_DUY_NHAT_VAN_HANH_JAYT.md)

---

## 1. Bản Chất Sự Cố (Incident Root Cause)

Trong quá trình khắc phục yêu cầu về đường dẫn artefact gốc cho M2, Antigravity đã tự động tạo 50 tệp `raw_artefacts` bằng script từ dữ liệu bundle đã chuẩn hóa sẵn. 

**Sai phạm nghiêm trọng được CEO phát hiện qua kiểm tra độc lập:**
1. **Nghịch đảo thời gian thu thập (Reverse Synthesis):** Các tệp raw artefact được sinh ra lúc 22:16 ngày 2026-08-28 nhưng lại tự khai trường `captured_at` từ các ngày trước đó (2026-08-27 / 2026-08-28 sáng).
2. **Metadata tự nhất quán nội bộ (Internal Self-Consistency vs Independent Capture):** Dữ liệu raw thực chất chỉ là cấu trúc JSON trích xuất ngược từ bundle nội bộ, không phải là body phản hồi HTTP gốc, ảnh chụp màn hình bằng chứng (screenshot), tệp HAR, hoặc network capture ghi nhận trước khi chuẩn hóa. Do đó, mã SHA-256 chỉ chứng minh tính toàn vẹn của chuỗi JSON được sinh ra, hoàn toàn **không chứng minh được nguồn gốc thực tế của claim**.
3. **Lộ Route Public:** Thư mục `raw_artefacts` bị đưa lên `deploy/` và lộ diện qua route public trên production.

---

## 2. Các Hành Động Cách Ly Đã Thi Hành Ngay Lập Tức

1. **Gỡ Bỏ Hoàn Toàn Khỏi Web Root & Deploy:**
   - Đã xóa toàn bộ thư mục `raw_artefacts/` khỏi `deploy/` và `deploy/public/`.
   - Cấu hình và kiểm thử tự động xác nhận toàn bộ các route `/raw_artefacts/*` trả về **HTTP 404 Deny**.
2. **Cách Ly Vật Lý Tệp Sai Lệch:**
   - Di chuyển `03_SOURCE_OF_TRUTH/raw_artefacts/` vào `09_CONTAINMENT_QUARANTINE_NON_SERVED/quarantined_synthetic_raw_artefacts_20260828/`.
   - Di chuyển báo cáo lấy mẫu cũ vào `09_CONTAINMENT_QUARANTINE_NON_SERVED/quarantined_m2_sampling_report_v3_20260828.json`.
3. **Reset Bằng Chứng Trong Bundle & Feed:**
   - Xóa toàn bộ tham chiếu tới `raw_artifact_file` và `raw_artifact_relative_path` trong `daily_supply_feed_127.json` và 50 tệp bundle.
   - Trường `artifact_hash` trong các bundle được đặt lại thành `QUARANTINED_PENDING_INDEPENDENT_RAW_CAPTURE`.

---

## 3. Trạng Thái Quản Trị M2

- Trạng thái M2 chính thức chuyển về: **`BỊ CHẶN — RAW ARTEFACT PROVENANCE KHÔNG ĐẠT`**.
- **Điều kiện mở lại cổng M2:** Chỉ được mở lại khi có chứng từ thu thập gốc thực tế (raw HTTP response body bất biến, screenshot nguyên bản, hoặc HAR file có timestamp, redirect chain, HTTP status và hash tính trước khi chuẩn hóa dữ liệu).
- Tuyệt đối không dùng các con số 12/12 hay 50/50 làm cơ sở nâng Tier hoặc phát hành thêm claim.
