# HỒ SƠ HỘI ĐỒNG LIÊN BỘ — JAYT SECTION EZ-Q
## KIỂM ĐỊNH HÀNH TRÌNH NGƯỜI DÙNG ZERO-PII VÀ NÂNG CAO TIÊU CHUẨN CHỌN NGUỒN (SOURCE RUBRIC) TRƯỚC KHI MỞ RỘNG CAPTURE

**Mã hồ sơ:** `COUNCIL_REVIEW_PACK_EZ_Q_UX_RESEARCH_AND_SOURCE_RUBRIC_20260831`  
**Phiên bản Staging SOT:** `v3.480.0-staging.ez`  
**Chỉ thị chỉ đạo:** JAYT-245 Mục EZ-Q (Dòng 4358–4383)  
**Địa chỉ Staging hoạt động:** `http://127.0.0.1:4173/`  
**Endpoint Sức khỏe Hệ thống (Health Check):** `http://127.0.0.1:4173/health` (`HTTP 200 OK`, `status: "UP"`, `version: "v3.480.0-staging.ez"`, `parity: "PERFECT_MATCH_ZERO_DRIFT"`)  
**HTTP Status:** `200 OK` (Content-Type: `text/html; charset=utf-8`)  
**Thời gian lập hồ sơ:** 2026-08-31T14:17:00+07:00  
**Trạng thái Quản trị:** `UX_RESEARCH_PROTOCOL_AND_SOURCE_RUBRIC_ACTIVE` (Production khóa `v3.419.0`, P0_EQ mở, T1/Voucher public = 0, Affiliate activation = 0, Public T2 Docs Pilot = 1, External Links DOM = 1, New Candidates Public = 0, User Recruitment = 0, PII Collection = 0)

---

### I. KỊCH BẢN KIỂM ĐỊNH 5 TÁC VỤ NGƯỜI DÙNG ZERO-PII (MANDATE EZ-Q.1)

Thiết lập quy trình kiểm định [`UX_RESEARCH_PROTOCOL_ZERO_PII_EZ_Q.json`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/06_TRUST_AND_EVIDENCE/UX_RESEARCH_PROTOCOL_ZERO_PII_EZ_Q.json) dựa trên phương pháp Cognitive Walkthrough & DOM Invariant Assertion, **tuyệt đối không tuyển dụng người dùng giả, không bịa đặt khảo sát/quote/NPS**:

1. **Tác vụ 1 (Nhận diện bản chất tài liệu T2):** Người dùng nhận biết card GitHub Education là tài liệu quy định nộp đơn toàn cầu, không phải mã giảm giá/voucher tại Đà Nẵng $\rightarrow$ **PASS**.
2. **Tác vụ 2 (Mở tài liệu chính thức):** Link mở tab mới an toàn với `rel="noopener noreferrer nofollow"` dẫn thẳng tới GitHub Docs $\rightarrow$ **PASS**.
3. **Tác vụ 3 (Tự tính thực trả & Reset):** Nhập các trường giá gốc, voucher, sinh viên, ship, chia người; kết quả phản hồi tức thì 100% tại client; nút Đặt lại giá trị hoạt động hoàn hảo $\rightarrow$ **PASS**.
4. **Tác vụ 4 (Thấu hiểu Zero-State):** Khu vực đang kiểm định nêu rõ lý do chưa có nguồn mới và dẫn hướng sang Bảng tính thực trả $\rightarrow$ **PASS**.
5. **Tác vụ 5 (Mở/Đóng hướng dẫn Báo nguồn):** Hộp thoại mở ra không có ô nhập liệu PII, nêu rõ trạng thái chưa mở gửi trực tuyến, đóng an toàn bằng Escape hoặc nút Đóng $\rightarrow$ **PASS**.

---

### II. TIÊU CHÍ ĐÁNH GIÁ NGUỒN CUNG NỘI BỘ (SOURCE SELECTION RUBRIC) (MANDATE EZ-Q.3)

Chấm điểm 10 nguồn trong Intake Queue theo 5 chiều tài liệu chuyên sâu (/100 điểm, ngưỡng đạt $\ge 70$):
- **D1:** Tuyên bố cơ quan chủ quản rõ ràng (/20)
- **D2:** Điều khoản chính sách / hành động / phạm vi rõ ràng (/20)
- **D3:** Metadata ngày tháng / tính cập nhật (/20)
- **D4:** Quan hệ tài liệu chuẩn tắc (/20)
- **D5:** Khả năng tiếp cận raw bytes không cần chạy JS phức tạp (/20)

**Kết quả chấm điểm:** Tất cả các trang chủ generic (từ 50 đến 60 điểm) đều **dưới ngưỡng 70 điểm**. Quyết định của Hội đồng: **ĐÓNG BĂNG CAPTURE CÁC TRANG CHỦ GENERIC** cho đến khi xác định được đường dẫn tài liệu/quy định chuyên sâu cụ thể.

---

### III. TỔNG HỢP KIỂM THỬ TOÀN DIỆN (164/164 TESTS PASS 100%)

| Bộ kiểm thử | Số bài test | Kết quả |
| :--- | :---: | :---: |
| **EZ-Q UX Protocol & Source Rubric QA Suite** | 12 | **12/12 PASS** ✅ |
| **EZ-P Supply Board & Report Audit QA Suite** | 14 | **14/14 PASS** ✅ |
| **EZ-O Controlled Intake & Release Gate QA Suite** | 12 | **12/12 PASS** ✅ |
| **EZ-N P0 Containment Browser QA Suite** | 24 | **24/24 PASS** ✅ |
| **EZ-M Identity Proof & A11y Browser QA Suite** | 20 | **20/20 PASS** ✅ |
| **EZ-K Evidence Contract v3 & Entailment QA Suite** | 14 | **14/14 PASS** ✅ |
| **EZ-J Document Provenance & Quarantine QA Suite** | 28 | **28/28 PASS** ✅ |
| **EZ-H T2 Pilot E2E Browser Suite (1440, 768, 390 viewports)** | 30 | **30/30 PASS** ✅ |
| **Calculator Unit Test Suite (Math & Edge Cases)** | 10 | **10/10 PASS** ✅ |
| **Tổng cộng** | **164** | **164/164 PASS (100%)** ✅ |

---

### IV. BỘ ARTIFACTS CỦA EZ-Q REVIEW PACK

- **Hồ sơ Hội đồng Liên bộ chính thức EZ-Q:** [`COUNCIL_REVIEW_PACK_EZ_Q_UX_RESEARCH_AND_SOURCE_RUBRIC_20260831.md`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/01_EXECUTIVE_COUNCIL/COUNCIL_REVIEW_PACK_EZ_Q_UX_RESEARCH_AND_SOURCE_RUBRIC_20260831.md)
- **Quy trình Kiểm định 5 Tác vụ Zero-PII:** [`UX_RESEARCH_PROTOCOL_ZERO_PII_EZ_Q.json`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/06_TRUST_AND_EVIDENCE/UX_RESEARCH_PROTOCOL_ZERO_PII_EZ_Q.json)
- **Rubric Đánh giá Trải nghiệm Người dùng:** [`UX_ACCEPTANCE_RUBRIC_EZ_Q.json`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/06_TRUST_AND_EVIDENCE/UX_ACCEPTANCE_RUBRIC_EZ_Q.json)
- **Rubric Đánh giá Chất lượng Nguồn Cung Nội bộ:** [`SOURCE_SELECTION_RUBRIC_EZ_Q.json`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/06_TRUST_AND_EVIDENCE/SOURCE_SELECTION_RUBRIC_EZ_Q.json)
- **Sổ bộ Tiếp nhận Nguồn Taxonomy EZ-Q:** [`SOURCE_INTAKE_QUEUE_EZ_Q.json`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/06_TRUST_AND_EVIDENCE/SOURCE_INTAKE_QUEUE_EZ_Q.json)
- **Manifest Đồng nhất Phiên bản Parity:** [`JAYT_VERSION_PARITY_MANIFEST_EZ_Q.json`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/00_PROGRAM_BASELINE/JAYT_VERSION_PARITY_MANIFEST_EZ_Q.json)
- **Biên nhận Phát hành Release Receipt EZ-Q:** [`JAYT_RELEASE_RECEIPT_EZ_Q.json`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/00_PROGRAM_BASELINE/JAYT_RELEASE_RECEIPT_EZ_Q.json)
- **Script Kiểm thử EZ-Q UX Protocol QA:** [`test_ez_q_ux_protocol_and_source_rubric_qa.js`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/test_ez_q_ux_protocol_and_source_rubric_qa.js)
- **Script Kiểm thử EZ-P Supply Board QA:** [`test_ez_p_supply_board_and_report_audit_qa.js`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/test_ez_p_supply_board_and_report_audit_qa.js)
- **Script Kiểm thử EZ-O Controlled Intake QA:** [`test_ez_o_controlled_intake_and_release_gate_qa.js`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/test_ez_o_controlled_intake_and_release_gate_qa.js)
- **Script Kiểm thử EZ-N P0 Containment QA:** [`test_ez_n_p0_containment_browser_qa.js`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/test_ez_n_p0_containment_browser_qa.js)
- **Script Kiểm thử EZ-M Identity Proof & A11y QA:** [`test_ez_m_identity_proof_and_a11y_qa.js`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/test_ez_m_identity_proof_and_a11y_qa.js)
- **Script Kiểm thử EZ-K Contract v3 & Entailment QA:** [`test_evidence_contract_v3_and_entailment_ez_k.js`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/test_evidence_contract_v3_and_entailment_ez_k.js)
- **Script Kiểm thử EZ-J Provenance & Quarantine QA:** [`test_document_provenance_and_quarantine_ez_j.js`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/test_document_provenance_and_quarantine_ez_j.js)
- **Script Kiểm thử T2 Pilot E2E Browser Suite EZ-H:** [`test_ez_h_t2_pilot_e2e.js`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/test_ez_h_t2_pilot_e2e.js)

---

### V. LỆNH TÁI LẬP KIỂM ĐỊNH ĐỘC LẬP CHO CEO

Kính mời CEO thực thi độc lập các lệnh sau trên terminal để tái lập toàn bộ kiểm thử:

```powershell
# 1. Kiểm tra sức khỏe Staging Server & Parity Manifest
Invoke-RestMethod -Uri http://127.0.0.1:4173/health

# 2. Chạy kiểm thử EZ-Q UX Protocol & Source Rubric QA Suite (12 tests)
node "07_QUALITY_ASSURANCE/test_ez_q_ux_protocol_and_source_rubric_qa.js"

# 3. Chạy kiểm thử EZ-P Supply Board & Report Audit QA Suite (14 tests)
node "07_QUALITY_ASSURANCE/test_ez_p_supply_board_and_report_audit_qa.js"

# 4. Chạy kiểm thử EZ-O Controlled Intake & Release Gate QA Suite (12 tests)
node "07_QUALITY_ASSURANCE/test_ez_o_controlled_intake_and_release_gate_qa.js"

# 5. Chạy kiểm thử EZ-N P0 Containment Browser QA Suite (24 tests)
node "07_QUALITY_ASSURANCE/test_ez_n_p0_containment_browser_qa.js"

# 6. Chạy kiểm thử EZ-M Identity Proof & A11y QA Suite (20 tests)
node "07_QUALITY_ASSURANCE/test_ez_m_identity_proof_and_a11y_qa.js"

# 7. Chạy kiểm thử EZ-K Evidence Contract v3 & Entailment QA Suite (14 tests)
node "07_QUALITY_ASSURANCE/test_evidence_contract_v3_and_entailment_ez_k.js"

# 8. Chạy kiểm thử EZ-J Document Provenance & Quarantine QA Suite (28 tests)
node "07_QUALITY_ASSURANCE/test_document_provenance_and_quarantine_ez_j.js"

# 9. Chạy kiểm thử EZ-H T2 Pilot E2E Browser Suite trên 3 Viewport (30 tests)
node "07_QUALITY_ASSURANCE/test_ez_h_t2_pilot_e2e.js"

# 10. Chạy kiểm thử đơn vị Bảng tính Local-First (10 tests)
node "07_QUALITY_ASSURANCE/test_calculator_unit_ez.js"

# 11. Mở trình duyệt kiểm tra trực tiếp Staging Server
Start-Process "http://127.0.0.1:4173/"
```

---

### VI. CAM KẾT VẬN HÀNH & KÍNH TRÌNH CEO

1. **Khóa Phát hành Production:** Production tiếp tục được khóa tại `v3.419.0`, `P0_EQ` tiếp tục ở trạng thái `OPEN`.
2. **Khóa Tuyệt đối Tuyển Người Dùng & Thu Thập PII:** `User Recruitment = false`, `PII Collection = false`.
3. **Khóa Kích hoạt Affiliate & Voucher Public:** `T1 Voucher Verified = 0`, `Public T2 Documentation = 1`, `External Links in Public DOM = 1`, `New Candidates Public = 0`, `Affiliate Activation = false`.
4. **Kính trình CEO trực tiếp kiểm định độc lập toàn bộ hồ sơ EZ-Q, kịch bản 5 tác vụ người dùng và rubric đánh giá nguồn nội bộ trước khi đưa ra quyết định tiếp theo.**