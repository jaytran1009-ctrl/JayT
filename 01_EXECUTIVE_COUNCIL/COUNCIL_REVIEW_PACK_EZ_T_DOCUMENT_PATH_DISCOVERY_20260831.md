# HỒ SƠ HỘI ĐỒNG LIÊN BỘ — JAYT SECTION EZ-T
## PHÁT HIỆN ĐƯỜNG DẪN TÀI LIỆU READ-ONLY, ĐỐI SOÁT BẢN THÔ VĂN BẢN VÀ BẢO TỒN RANH GIỚI STAGING

**Mã hồ sơ:** `COUNCIL_REVIEW_PACK_EZ_T_DOCUMENT_PATH_DISCOVERY_20260831`  
**Phiên bản Staging SOT:** `v3.480.0-staging.ez`  
**Chỉ thị chỉ đạo:** JAYT-245 Mục EZ-T (Dòng 4432–4454)  
**Địa chỉ Staging hoạt động:** `http://127.0.0.1:4173/`  
**Endpoint Sức khỏe Hệ thống (Health Check):** `http://127.0.0.1:4173/health` (`HTTP 200 OK`, `status: "UP"`, `version: "v3.480.0-staging.ez"`, `parity: "PERFECT_MATCH_ZERO_DRIFT"`)  
**HTTP Status:** `200 OK` (Content-Type: `text/html; charset=utf-8`)  
**Thời gian lập hồ sơ:** 2026-08-31T14:31:00+07:00  
**Trạng thái Quản trị:** `DOCUMENT_PATH_DISCOVERY_ACTIVE` (Production khóa `v3.419.0`, P0_EQ mở, T1/Voucher public = 0, Affiliate activation = 0, Public T2 Docs Pilot = 1, External Links DOM = 1, New Public Cards = 0, Document Paths Discovered = 1, Captured Document = 1 (Held Internal))

---

### I. KẾT QUẢ KHẢO SÁT ĐIỀU HƯỚNG READ-ONLY (MANDATE EZ-T.1 & EZ-T.2)

Khảo sát tối đa 3 link nội bộ trên 2 ứng viên đang giữ nội bộ qua phương thức `READ_ONLY_VISIBLE_DOM_NAVIGATION` (0 login, 0 search bulk, 0 form, 0 API ngầm):

1. **Ứng viên 1: `INTAKE_02_DANANG_GENERAL_SCIENCE_LIBRARY` (`http://thuvien.danang.gov.vn/`):**
   - Link 1: `Nội quy Thư viện` -> `https://thuvien.danang.gov.vn/News/ReadNews/1409` (`DISCOVERED_UNVERIFIED`)
   - Link 2: `Thủ tục cấp thẻ` -> `https://thuvien.danang.gov.vn/News/ReadNews/1408` (`SELECTED_FOR_V3_DOCUMENT_EVALUATION`)
   - Link 3: `Đăng ký thẻ` -> `http://opac.thuvien.danang.gov.vn:82/pages/opac/wpid-regreader.html` (`DISCOVERED_UNVERIFIED`)
   - **Kết quả:** Chọn đúng **1 văn bản tài liệu cụ thể** (`https://thuvien.danang.gov.vn/News/ReadNews/1408`) để thực hiện capture theo Evidence Contract v3.

2. **Ứng viên 2: `INTAKE_07_VIETNAM_RAILWAY_OFFICIAL` (`https://dsvn.vn/`):**
   - Link 1: `CÁC QUY ĐỊNH` -> `https://dsvn.vn/#/quydinhmuave` (`DISCOVERED_UNVERIFIED_CLIENT_ROUTED`)
   - Link 2: `Chính sách mua hàng` -> `https://dsvn.vn/#/pages/dieukienvadieukhoan` (`DISCOVERED_UNVERIFIED_CLIENT_ROUTED`)
   - Link 3: `Chính sách thanh toán` -> `https://dsvn.vn/#/pages/phuongthucthanhtoan` (`DISCOVERED_UNVERIFIED_CLIENT_ROUTED`)
   - **Kết quả:** Các đường dẫn phụ thuộc client-routing; không chọn capture trong vòng này (`NO_STATIC_RAW_DOCUMENT_SELECTED_IN_ROUND`).

---

### II. ĐỐI SOÁT VĂN BẢN V3 CHO THỦ TỤC CẤP THẺ THƯ VIỆN (MANDATE EZ-T.3)

- **Tài liệu gốc:** `https://thuvien.danang.gov.vn/News/ReadNews/1408`
- **Dung lượng raw:** `49,293 B`
- **Mã băm SHA-256:** `57ff87a63afab5b6cfb029075bb073bbd11eedfc9d94cccd0680df2353903b16`
- **Bằng chứng Byte Offsets:**
  - Excerpt 1 (`CLAUSE_01_TITLE`): `"Thủ tục cấp thẻ"` (Byte offset 9520 -> 9543)
  - Excerpt 2 (`CLAUSE_02_SUPERIOR_BODY`): `"SỞ VĂN HOÁ & THỂ THAO TP. ĐÀ NẴNG"` (Byte offset 14181 -> 14240)
  - Excerpt 3 (`CLAUSE_03_OPERATING_BODY`): `"THƯ VIỆN KHOA HỌC TỔNG HỢP"` (Byte offset 14502 -> 14537)
  - Excerpt 4 (`CLAUSE_04_DATE_FRESHNESS`): `"11/03/2016"` (Byte offset 12242 -> 12252)
- **Phán quyết Hội đồng (Entailment Verdict):**
  - Bằng chứng cơ quan vận hành và cơ quan chủ quản: **ĐÃ ĐƯỢC CHỨNG MINH** ✅ (Thư viện Khoa học Tổng hợp Đà Nẵng, thuộc Sở Văn hóa & Thể thao TP. Đà Nẵng).
  - Tính cập nhật (Freshness): Văn bản đăng tải năm 2016 (lịch sử).
  - **Hành động:** `HELD_INTERNAL` (`public_eligible: false`), **không tạo card public trên Staging**, giữ nội bộ chờ CEO trực tiếp thẩm duyệt.

---

### III. TỔNG HỢP KIỂM THỬ TOÀN DIỆN (195/195 TESTS PASS 100%)

| Bộ kiểm thử | Số bài test | Kết quả |
| :--- | :---: | :---: |
| **EZ-T Document Discovery & Contract v3 QA Suite** | 11 | **11/11 PASS** ✅ |
| **EZ-S Proof Gate Cleanup & Schema QA Suite** | 10 | **10/10 PASS** ✅ |
| **EZ-R De-syntheticized Protocol & Proof Gate QA Suite** | 11 | **11/11 PASS** ✅ |
| **EZ-Q UX Protocol & Source Rubric QA Suite** | 11 | **11/11 PASS** ✅ |
| **EZ-P Supply Board & Report Audit QA Suite** | 14 | **14/14 PASS** ✅ |
| **EZ-O Controlled Intake & Release Gate QA Suite** | 12 | **12/12 PASS** ✅ |
| **EZ-N P0 Containment Browser QA Suite** | 24 | **24/24 PASS** ✅ |
| **EZ-M Identity Proof & A11y Browser QA Suite** | 20 | **20/20 PASS** ✅ |
| **EZ-K Evidence Contract v3 & Entailment QA Suite** | 14 | **14/14 PASS** ✅ |
| **EZ-J Document Provenance & Quarantine QA Suite** | 28 | **28/28 PASS** ✅ |
| **EZ-H T2 Pilot E2E Browser Suite (1440, 768, 390 viewports)** | 30 | **30/30 PASS** ✅ |
| **Calculator Unit Test Suite (Math & Edge Cases)** | 10 | **10/10 PASS** ✅ |
| **Tổng cộng** | **195** | **195/195 PASS (100%)** ✅ |

---

### IV. BỘ ARTIFACTS CỦA EZ-T REVIEW PACK

- **Hồ sơ Hội đồng Liên bộ chính thức EZ-T:** [`COUNCIL_REVIEW_PACK_EZ_T_DOCUMENT_PATH_DISCOVERY_20260831.md`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/01_EXECUTIVE_COUNCIL/COUNCIL_REVIEW_PACK_EZ_T_DOCUMENT_PATH_DISCOVERY_20260831.md)
- **Sổ bộ Phát hiện Đường dẫn Tài liệu Read-Only:** [`DOCUMENT_PATH_DISCOVERY_LEDGER_EZ_T.json`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/06_TRUST_AND_EVIDENCE/DOCUMENT_PATH_DISCOVERY_LEDGER_EZ_T.json)
- **Hợp đồng Bằng chứng v3 Tài liệu Thư viện Đà Nẵng:** [`EVIDENCE_CONTRACT_V3_CANDIDATE_EZ_T_01_DANANG_LIBRARY.json`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/06_TRUST_AND_EVIDENCE/EVIDENCE_CONTRACT_V3_CANDIDATE_EZ_T_01_DANANG_LIBRARY.json)
- **File Raw Bytes Đã Thu Thập:** [`candidate_ez_t_01_danang_library_card_policy_raw_bytes.bin`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/06_TRUST_AND_EVIDENCE/evidence_vault_ez_t/candidate_ez_t_01_danang_library_card_policy_raw_bytes.bin)
- **Sổ bộ Proof Gate Nhị phân EZ-T:** [`SOURCE_PROOF_GATE_LEDGER_EZ_T.json`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/06_TRUST_AND_EVIDENCE/SOURCE_PROOF_GATE_LEDGER_EZ_T.json)
- **Sổ bộ Tiếp nhận Nguồn Taxonomy EZ-T:** [`SOURCE_INTAKE_QUEUE_EZ_T.json`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/06_TRUST_AND_EVIDENCE/SOURCE_INTAKE_QUEUE_EZ_T.json)
- **Manifest Đồng nhất Phiên bản Parity:** [`JAYT_VERSION_PARITY_MANIFEST_EZ_T.json`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/00_PROGRAM_BASELINE/JAYT_VERSION_PARITY_MANIFEST_EZ_T.json)
- **Biên nhận Phát hành Release Receipt EZ-T:** [`JAYT_RELEASE_RECEIPT_EZ_T.json`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/00_PROGRAM_BASELINE/JAYT_RELEASE_RECEIPT_EZ_T.json)
- **Script Kiểm thử EZ-T Document Discovery QA:** [`test_ez_t_document_discovery_qa.js`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/test_ez_t_document_discovery_qa.js)
- **Script Kiểm thử EZ-S Proof Gate Cleanup QA:** [`test_ez_s_proof_gate_cleanup_and_schema_qa.js`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/test_ez_s_proof_gate_cleanup_and_schema_qa.js)
- **Script Kiểm thử EZ-R De-syntheticized QA:** [`test_ez_r_desyntheticized_protocol_and_proof_gate_qa.js`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/test_ez_r_desyntheticized_protocol_and_proof_gate_qa.js)
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

# 2. Chạy kiểm thử EZ-T Document Discovery & Contract v3 QA Suite (11 tests)
node "07_QUALITY_ASSURANCE/test_ez_t_document_discovery_qa.js"

# 3. Chạy kiểm thử EZ-S Proof Gate Cleanup & Schema QA Suite (10 tests)
node "07_QUALITY_ASSURANCE/test_ez_s_proof_gate_cleanup_and_schema_qa.js"

# 4. Chạy kiểm thử EZ-R De-syntheticized Protocol & Proof Gate QA Suite (11 tests)
node "07_QUALITY_ASSURANCE/test_ez_r_desyntheticized_protocol_and_proof_gate_qa.js"

# 5. Chạy kiểm thử EZ-Q UX Protocol QA Suite (11 tests)
node "07_QUALITY_ASSURANCE/test_ez_q_ux_protocol_and_source_rubric_qa.js"

# 6. Chạy kiểm thử EZ-P Supply Board & Report Audit QA Suite (14 tests)
node "07_QUALITY_ASSURANCE/test_ez_p_supply_board_and_report_audit_qa.js"

# 7. Chạy kiểm thử EZ-O Controlled Intake & Release Gate QA Suite (12 tests)
node "07_QUALITY_ASSURANCE/test_ez_o_controlled_intake_and_release_gate_qa.js"

# 8. Chạy kiểm thử EZ-N P0 Containment Browser QA Suite (24 tests)
node "07_QUALITY_ASSURANCE/test_ez_n_p0_containment_browser_qa.js"

# 9. Chạy kiểm thử EZ-M Identity Proof & A11y QA Suite (20 tests)
node "07_QUALITY_ASSURANCE/test_ez_m_identity_proof_and_a11y_qa.js"

# 10. Chạy kiểm thử EZ-K Evidence Contract v3 & Entailment QA Suite (14 tests)
node "07_QUALITY_ASSURANCE/test_evidence_contract_v3_and_entailment_ez_k.js"

# 11. Chạy kiểm thử EZ-J Document Provenance & Quarantine QA Suite (28 tests)
node "07_QUALITY_ASSURANCE/test_document_provenance_and_quarantine_ez_j.js"

# 12. Chạy kiểm thử EZ-H T2 Pilot E2E Browser Suite trên 3 Viewport (30 tests)
node "07_QUALITY_ASSURANCE/test_ez_h_t2_pilot_e2e.js"

# 13. Chạy kiểm thử đơn vị Bảng tính Local-First (10 tests)
node "07_QUALITY_ASSURANCE/test_calculator_unit_ez.js"

# 14. Mở trình duyệt kiểm tra trực tiếp Staging Server
Start-Process "http://127.0.0.1:4173/"
```

---

### VI. CAM KẾT VẬN HÀNH & KÍNH TRÌNH CEO

1. **Khóa Phát hành Production:** Production tiếp tục được khóa tại `v3.419.0`, `P0_EQ` tiếp tục ở trạng thái `OPEN`.
2. **Không Tự Ý Tạo Card Public:** Tài liệu thư viện mới được phát hiện có bằng chứng cơ quan vận hành rõ ràng nhưng có ngày tháng cũ (2016) nên được giữ nội bộ (`public_eligible: false`). Số card public trên staging giữ nguyên = 1 (GitHub Docs Pilot).
3. **Khóa Kích hoạt Affiliate & Voucher Public:** `T1 Voucher Verified = 0`, `Public T2 Documentation = 1`, `External Links in Public DOM = 1`, `New Public Cards = 0`, `Affiliate Activation = false`.
4. **Kính trình CEO trực tiếp kiểm định độc lập toàn bộ hồ sơ EZ-T, sổ bộ discovery và hợp đồng bằng chứng v3 của tài liệu thư viện trước khi đưa ra quyết định tiếp theo.**