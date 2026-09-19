# JAYT-260-CORRECTION-10: ĐỀ XUẤT THIẾT KẾ & LỰA CHỌN QUYỀN LỰC XÁC THỰC PROVENANCE (AUTHORITY GATEWAY)

**Căn cứ pháp lý:** [JAYT-245 Section JAYT-260-CORRECTION-10 (Lines 5589–5604)](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/02_CEO_DIRECTIVES/JAYT-245_TONG_CHI_THI_CEO_DUY_NHAT_VAN_HANH_JAYT.md#L5589-L5604)

---

## 1. Bối Cảnh & Nhận Diện Vấn Đề Cốt Lõi

CEO đã chỉ rõ: Mọi cơ chế băm chuỗi (hash-chain) nội bộ trong cùng một file JSON chỉ chứng minh được tính toàn vẹn cấu trúc (structural integrity), không thể thay thế cho **Cryptographic Provenance** (nguồn gốc xuất xứ mật mã học tin cậy).

Để mở boundary tin cậy và cho phép intake các batch ứng viên địa phương mới (như Micro-Batch 02 Đà Nẵng), hệ thống cần một **Authority Độc Lập** được Chủ dự án (Product Owner / CEO) chính thức phê duyệt.

---

## 2. Hai Tùy Chọn Quyền Lực Xác Thực (Authority Options)

### TÙY CHỌN A: Managed Capture Service & Cryptographic Signer (Tự Động Hóa Có Khóa Quản Lý)

- **Mô hình hoạt động:**
  - Một tiến trình Capture Service độc lập chạy trên môi trường cô lập, sở hữu cặp khóa Ed25519 hoặc HMAC secret được quản lý qua KMS / Environment Secret an toàn.
  - Khi thực hiện HTTP fetch tới URL nguồn (thuộc Allowlist URL được duyệt), service tạo transport metadata, tải raw binary và ký bằng Private Key.
  - Worker Intake của JayT chỉ lưu trữ Public Key của service để giải mã và xác minh chữ ký (Keyless / Public-Key Verification).
- **Ưu điểm:** Tự động hóa cao, bảo đảm tính bất biến mật mã học, ngăn chặn hoàn toàn việc giả lập metadata từ phía người dùng CLI.
- **Yêu cầu triển khai:** Cần Chủ dự án cấp cấu hình / hạ tầng cho Capture Agent độc lập và quản lý Private Key.

---

### TÙY CHỌN B: Human-Reviewed Evidence Intake & Council/CEO Checkpoint (Quy Trình Kiểm Duyệt Nhân Sự)

- **Mô hình hoạt động:**
  - Nhân viên kiểm định (Auditor/Intake Lead) trực tiếp thực hiện capture bằng công cụ chuẩn, thu thập raw payload, HTTP response header và locator trực quan.
  - Hồ sơ bằng chứng được lập thành một Micro-Batch Intake Pack (gồm 3–5 ứng viên Đà Nẵng).
  - Hội đồng liên bộ (Council) và CEO trực tiếp kiểm tra bằng chứng, xác nhận tính chân thực và ký văn bản quyết định phê duyệt (CEO Written Decision Approval) cho từng batch cụ thể.
- **Ưu điểm:** Trực quan, fail-closed tuyệt đối, không phụ thuộc vào hạ tầng signing phức tạp, gắn liền trách nhiệm trực tiếp của nhân sự vận hành.
- **Yêu cầu triển khai:** Cần CEO/Council định kỳ phê duyệt từng batch trước khi tiến hành admission.

---

## 3. Trạng Thái Hệ Thống Trong Giai Đoạn Chờ Quyết Định

- **Trạng thái Micro-Batch 02:** Tiếp tục **`BLOCKED`** (không khởi tạo ledger, không capture candidate mới).
- **Sổ bộ Cohort 15:** [`06_TRUST_AND_EVIDENCE/JAYT_COHORT_15_SLA_CLOSURE_LEDGER.json`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/06_TRUST_AND_EVIDENCE/JAYT_COHORT_15_SLA_CLOSURE_LEDGER.json) giữ nguyên trạng thái audit bất biến (14 `HELD_NEW_COHORT_REQUIRED`, 1 `CLOSED`, 0 `PUBLIC_APPROVED`).
- **Production Status:** Tiếp tục **`HOLD`** (`v3.419.0`, `P0_EQ = OPEN`), voucher công khai = **0**, affiliate = **false**.
- **Staging Static Preview Server:** Cổng 4173 hoạt động bình thường (`v3.483.0-staging.ao`, `PERFECT_MATCH_ZERO_DRIFT`).
- **Registry Công Khai:** Chỉ bảo toàn 1 mục duy nhất là GitHub Education Pilot theo đúng phê duyệt lịch sử `EZ-AR.1`.
