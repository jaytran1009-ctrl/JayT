# JAYT CORP — QUY TRÌNH & ĐẶC TẢ NHẬP CATALOG DEAL (CATALOG WORKFLOW SPEC)
**Mã hiệu:** `JAYT-CATALOG-SPEC-001`  
**Cấp độ an ninh:** `FAIL-CLOSED & CAPTURE AUTHENTICITY GATE ENFORCED (WORK ORDER 004)`  
**Trạng thái:** `PROVENANCE INTEGRITY IMPLEMENTED — CAPTURE AUTHENTICITY NOT YET PROVEN — ZERO CANDIDATE APPROVED — PRODUCTION LOCKED`

---

## 1. Mục Đích & Cổng Tính Xác Thực Của Tệp Lưu Vết (Capture Authenticity Gate)

1. **Cổng Tính Xác Thực Của Tệp Lưu Vết (Capture Authenticity Gate)**:
   - Một tệp văn bản tự tường thuật (`text/plain`, `.txt`) do nhân sự tự ghi chép **KHÔNG ĐƯỢC PHÉP ĐẠT `PASS`**, dù có mã băm SHA-256 hợp lệ.
   - Để đạt trạng thái **`PASS`**, tệp lưu vết (`capture_file`) bắt buộc phải là **dữ liệu nguyên bản có thể tái kiểm tra độc lập (Verifiable Raw Source Artifact)**:
     - Ảnh chụp màn hình trình duyệt / PDF của trang cụ thể (`image/png`, `image/jpeg`, `application/pdf`), HOẶC
     - Phản hồi thô HTTPS / mã nguồn HTML lưu nguyên bản từ endpoint (`text/html`, `application/json`).
2. **Ý Nghĩa Thực Của Mã Băm SHA-256 (Local Tamper-Evident Integrity)**:
   - Mã băm SHA-256 chỉ mang ý nghĩa **chống can thiệp dữ liệu cục bộ trên đĩa (Tamper-evident)** sau khi tệp được lưu.
   - Tuyệt đối **không được dùng từ "verified", "đã xác thực"** hay suy diễn rằng nguồn tin của đối tác là chính xác chỉ vì mã băm khớp.
3. **Các Trường Bắt Buộc Của Hồ Sơ Bằng Chứng Xác Thực (`EvidenceRecord`)**:
   - `capture_file`: Tên tệp lưu vết thực tế trong `candidates/evidence_snapshots/`.
   - `evidence_content_hash`: Mã băm SHA-256 hex (64 ký tự) của tệp trên đĩa.
   - `capture_method`: `BROWSER_FULLPAGE_SCREENSHOT`, `RAW_HTTPS_RESPONSE_PAYLOAD`, `PDF_DOCUMENT_SNAPSHOT`, hoặc `ARCHIVE_SNAPSHOT`.
   - `artifact_mime_type`: MIME type chuẩn (`image/png`, `image/jpeg`, `application/pdf`, `text/html`, `application/json`). Các tệp `text/plain` tự tường thuật tự động bị chuyển sang **`NEEDS_RECHECK`**.
   - `artifact_source_url`: URL gốc được ghi nhận trong tệp lưu vết. Nếu khai báo `artifact_source_url` mà **khác với `source_url`** $\rightarrow$ **`REJECTED` (Lỗi sai lệch nguồn / URL Mismatch)**.
   - `captured_at`: Thời điểm chụp/lưu vết có timezone rõ ràng.
4. **Quy Định Thời Hạn Áp Dụng (`expires_at` & `expiry_basis`)**:
   - `expires_at` chỉ được coi là hợp lệ khi tệp lưu vết thể hiện rõ mốc thời hạn hoặc chính sách năm học/quý.
   - Nguồn hoặc artifact không nêu rõ hạn $\rightarrow$ Bắt buộc phân loại **`NEEDS_RECHECK`**, cấm tự ý gán hạn mặc định 31/12.
5. **Ranh Giới Kỷ Luật Vận Hành Tuyệt Đối**:
   - 0 candidate được phê duyệt (`ZERO CANDIDATE APPROVED`).
   - Không import bất kỳ dữ liệu nào vào `deals_feed.json`.
   - Không liên hệ merchant.
   - Không khảo sát thực địa trái phép.
   - Không thu thập dữ liệu người dùng / PII.
   - Không bật analytics.
   - Tiếp tục khóa sản xuất (`is_approved: false`, `PRODUCTION LOCKED`).

---

## 2. Đặc Tả JSON Schema: Bản Ghi Bằng Chứng Bổ Sung Authenticity (`EvidenceRecord`)

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "JayTEvidenceRecord",
  "type": "object",
  "required": [
    "deal_id", "source_url", "source_type", "recorded_by",
    "verification_status", "checked_at", "notes",
    "claim_summary", "source_specificity", "observed_price_or_offer",
    "observed_conditions", "expiry_basis", "captured_at"
  ],
  "properties": {
    "deal_id": { "type": "string" },
    "source_url": {
      "type": "string",
      "pattern": "^https://[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}(/.*)?$"
    },
    "source_type": {
      "type": "string",
      "enum": ["PUBLIC_LANDING_PAGE_REFERENCE", "INSPECTION_RECORD", "OFFICIAL_PROMOTION_ANNOUNCEMENT"]
    },
    "recorded_by": {
      "type": "string",
      "enum": ["JAYT_DESK_REVIEW_PUBLIC_SOURCE", "JAYT_ONSITE_REVIEW"]
    },
    "verification_status": {
      "type": "string",
      "enum": ["NOT_INDEPENDENTLY_VERIFIED"]
    },
    "checked_at": { "type": "string", "format": "date-time" },
    "captured_at": { "type": "string", "format": "date-time" },
    "claim_summary": { "type": "string", "minLength": 15 },
    "source_specificity": {
      "type": "string",
      "enum": ["EXACT_OFFER_PAGE", "GENERAL_REFERENCE"]
    },
    "observed_price_or_offer": { "type": "string", "minLength": 5 },
    "observed_conditions": { "type": "string", "minLength": 10 },
    "expiry_basis": { "type": "string", "minLength": 15 },
    "capture_file": { "type": "string", "minLength": 3 },
    "evidence_content_hash": {
      "type": "string",
      "pattern": "^[a-f0-9]{64}$"
    },
    "capture_method": {
      "type": "string",
      "enum": ["BROWSER_FULLPAGE_SCREENSHOT", "RAW_HTTPS_RESPONSE_PAYLOAD", "PDF_DOCUMENT_SNAPSHOT", "ARCHIVE_SNAPSHOT", "MANUAL_DESK_CAPTURE"]
    },
    "artifact_mime_type": {
      "type": "string",
      "enum": ["image/png", "image/jpeg", "application/pdf", "text/html", "application/json", "text/plain"]
    },
    "artifact_source_url": { "type": "string", "pattern": "^https://" },
    "notes": { "type": "string", "minLength": 20 }
  },
  "additionalProperties": false
}
```

---

## 3. Ma Trận Đánh Giá Phân Hạng 3 Nhóm Capture Authenticity Gate

| Nhóm | Tiêu Chí Bằng Chứng & Tệp Lưu Vết | Hành Vi Hệ Thống |
|---|---|:---:|
| **🟢 PASS** | • `source_specificity == 'EXACT_OFFER_PAGE'`.<br>• Có `capture_file` dạng ảnh (`image/png`, `image/jpeg`), PDF (`application/pdf`) hoặc HTML/JSON thô (`text/html`, `application/json`).<br>• `evidence_content_hash` khớp 100% SHA-256 của tệp trên đĩa.<br>• `artifact_source_url` khớp hoàn toàn với `source_url`.<br>• Giá, điều kiện, hạn có thể quan sát thấy rõ trong tệp lưu vết.<br>• 100% hợp lệ về Schema, Domain, Protocol, và Công thức số học. | **Đủ điều kiện trình CEO phê duyệt nạp catalog** |
| **🟡 NEEDS_RECHECK** | • `source_specificity == 'GENERAL_REFERENCE'` (trang chủ chung).<br>• `capture_file` là tệp văn bản tự tường thuật (`text/plain`, `.txt`) dù có SHA-256.<br>• `EXACT_OFFER_PAGE` nhưng thiếu MIME type hoặc tệp lưu vết raw payload/screenshot.<br>• Nguồn hoặc tệp lưu vết không nêu rõ hạn áp dụng.<br>• URL bị robots chặn.<br>• `checked_at` hoặc `captured_at` quá 90 ngày (bằng chứng cũ). | **Tạm giữ tại pending_review; CẤM đưa vào Live Feed / Right Now** |
| **🔴 REJECTED** | • `artifact_source_url` **không khớp với `source_url`** (Sai lệch nguồn).<br>• `capture_file` được khai báo nhưng **không tồn tại trên đĩa**.<br>• SHA-256 của `capture_file` **không khớp với `evidence_content_hash`** (Lỗi can thiệp).<br>• Tên miền chưa đăng ký trong `domain_catalog.json`.<br>• Khai báo `EXACT_OFFER_PAGE` trên URL trang chủ gốc `/`.<br>• Dùng `recorded_by` trái phép (như `FIELD_PROBE` hoặc `ONSITE` chưa ủy quyền).<br>• Sai lệch công thức chiết khấu (`discount_pct`). | **HỦY BỎ HỒ SƠ; CẤM PHÊ DUYỆT** |

---

## 4. Cổng Kiểm Soát Hiển Thị (Live Visibility Gate — JAYT-CATALOG-VISIBILITY-GATE-001)

### 4.1. Nguyên Tắc Cốt Lõi
1. **Server/Client Render Eligibility**: Chỉ ưu đãi nào thỏa mãn `isDealRenderEligible(deal, evidenceStore) === true` mới được phép render thành Thẻ Ưu Đãi (Deal Card), Thẻ Đề Xuất (Decision Matrix Pick) hoặc Thẻ Mini-Deal trong Lịch Săn.
2. **Tiêu chuẩn Render Eligibility**:
   - `evidence` có tệp lưu vết nguyên bản có thể kiểm tra (`capture_file` tồn tại, không phải `.txt` / `.md`).
   - `artifact_mime_type` thuộc danh mục định dạng chứng cứ thô: `image/png`, `image/jpeg`, `application/pdf`, `text/html`, `application/json`.
   - `evidence_content_hash` là chuỗi SHA-256 64 ký tự hợp lệ.
   - `artifact_source_url` khớp hoàn toàn với `deal.source_url`.
   - Mức giá, điều kiện và căn cứ thời hạn thể hiện rõ trong tệp lưu vết (`observed_price_or_offer`, `observed_conditions`, `expiry_basis`).
   - `lifecycle_status` không phải `NEEDS_RECHECK` hoặc `ARCHIVED`.
   - Giữ nguyên nhãn phân loại `PROBING` (tuyệt đối không dùng `VERIFIED` khi chưa có phê duyệt go-live).
3. **Xử lý 10 Deal Baseline Hiện Hữu**:
   - Do chưa có tệp lưu vết raw screenshot/payload trên đĩa, toàn bộ 10 hồ sơ baseline có `isDealRenderEligible === false`.
   - Hệ thống lưu trữ nội bộ trong store để audit, **không render thành Deal Card hay nút CTA outbound**.
4. **Trạng Thái Rỗng Trung Thực & Hữu Ích (Honest Empty State)**:
   - Khi catalog có 0 ưu đãi đủ điều kiện hiển thị, giao diện render thông báo minh bạch:
     *"JayT chưa có ưu đãi đủ chứng cứ để đề xuất hôm nay."*
   - Đồng thời giữ nguyên toàn bộ công cụ **Trình Lập Kế Hoạch (Planner)**, cho phép người dùng chọn bối cảnh, khu vực, khung giờ, ngân sách và lưu trữ nhu cầu cá nhân cục bộ trên trình duyệt mà không tạo bất kỳ cam kết giả định nào về mức giá.
5. **Cổng Chuyển Hướng Outbound (Fail-Closed Token Gateway)**:
   - Nút mở nguồn / phát hành token chỉ hoạt động với deal có `render_eligible: true`.
   - Đối với các deal chưa đủ chứng cứ lưu vết, gateway chặn phát hành token fail-closed với mã lỗi `ERR_DEAL_NOT_RENDER_ELIGIBLE` và hiển thị thông báo toast hướng dẫn.
