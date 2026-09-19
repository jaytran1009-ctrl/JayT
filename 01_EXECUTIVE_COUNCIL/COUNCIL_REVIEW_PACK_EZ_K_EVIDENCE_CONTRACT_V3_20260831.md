# HỒ SƠ HỘI ĐỒNG LIÊN BỘ — JAYT SECTION EZ-K
## THIẾT LẬP EVIDENCE CONTRACT V3, MA TRẬN PHÂN TÍCH LỖI NGỮ NGHĨA (SEMANTIC FAILURE MATRIX) VÀ KẾT LUẬN FAIL-CLOSED 'NO PUBLISHABLE FACT'

**Mã hồ sơ:** `COUNCIL_REVIEW_PACK_EZ_K_EVIDENCE_CONTRACT_V3_20260831`  
**Phiên bản Staging SOT:** `v3.480.0-staging.ez`  
**Chỉ thị chỉ đạo:** JAYT-245 Mục EZ-K (Dòng 4182–4210)  
**Địa chỉ Staging hoạt động:** `http://127.0.0.1:4173/`  
**Endpoint Sức khỏe Hệ thống (Health Check):** `http://127.0.0.1:4173/health` (`HTTP 200 OK`, `status: "UP"`, `version: "v3.480.0-staging.ez"`, `parity: "PERFECT_MATCH_ZERO_DRIFT"`)  
**HTTP Status:** `200 OK` (Content-Type: `text/html; charset=utf-8`)  
**Thời gian lập hồ sơ:** 2026-08-31T13:45:00+07:00  
**Trạng thái Quản trị:** `EVIDENCE_CONTRACT_V3_FAIL_CLOSED` (Production khóa `v3.419.0`, P0_EQ mở, T1/Voucher public = 0, Affiliate activation = 0, Public T2 Docs Pilot = 1, New Candidates Public = 0)

---

### I. MA TRẬN PHÂN TÍCH LỖI NGỮ NGHĨA RESURVEY EZ-J (SEMANTIC FAILURE MATRIX)

Theo đúng kết luận thanh tra độc lập của CEO, Hội đồng đã lập ma trận phân loại nguyên nhân cốt lõi khiến 2 resurvey EZ-J không thể nâng thành fact contract:

| Candidate ID | Token rời rạc đã dùng ở EZ-J | Mệnh đề suy diễn không hợp lệ | Nguyên nhân gốc rễ (Root Cause) | Phán quyết Quản trị |
| :--- | :--- | :--- | :--- | :--- |
| **`CANDIDATE_EZ_J_01_NOTION_EDUCATION`** | `schoolwork`, `classroom` | "Học sinh và nhà trường … hỗ trợ học tập và quản lý dự án" / "Phạm vi toàn cầu" | Các từ rời rạc trong unrendered template props không chứa vị ngữ điều kiện (predicate); không có chứng cứ hợp đồng cho scope toàn cầu. | `HELD_INTERNAL_SEMANTIC_LOCATOR_INSUFFICIENT` |
| **`CANDIDATE_EZ_J_02_CANVA_EDUCATION`** | `Canva`, `Education`, `learning` | "Cơ sở giáo dục và người học" / "Phạm vi toàn cầu" | Danh từ tiếp thị chung bị đồng nhất hóa sai với bằng chứng quyền lợi/tiêu chuẩn đối tượng; thiếu vị ngữ quy định điều kiện tham gia. | `HELD_INTERNAL_SEMANTIC_LOCATOR_INSUFFICIENT` |

---

### II. ĐẶC TẢ EVIDENCE CONTRACT V3 & CỔNG ENTAILMENT GATE (MANDATE EZ-K.2)

Hồ sơ đã ban hành schema chính thức [`06_TRUST_AND_EVIDENCE/JAYT_EVIDENCE_CONTRACT_V3_SCHEMA_EZ_K.json`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/06_TRUST_AND_EVIDENCE/JAYT_EVIDENCE_CONTRACT_V3_SCHEMA_EZ_K.json) thiết lập 5 trụ cột bảo vệ ngữ nghĩa:
1. **Sentence-Level Raw Excerpts:** Bắt buộc trích xuất trọn vẹn câu/mệnh đề kèm `byte_start` và `byte_end`, không chấp nhận token dưới 10 ký tự.
2. **Clause-by-Clause Translation Mapping:** Mọi mệnh đề tiếng Việt hiển thị cho khách hàng phải có ánh xạ trực tiếp 1-1 với mệnh đề trong văn bản gốc.
3. **Taxonomy Phân loại Yêu sách (Claim Class):** Tách bạch rõ `IDENTITY_ONLY`, `DESCRIPTIVE_ONLY`, `ELIGIBILITY_REQUIREMENT`, `SCOPE_RESTRICTION`, `ECONOMIC_BENEFIT`, `LOCAL_TERRITORY`.
4. **Ranh giới Phạm vi (Scope Boundary):** Cấm tự gán nhãn `global` nếu văn bản gốc không nêu rõ `global`/`worldwide` hoặc chính sách được văn bản hóa chính thức.
5. **Entailment Gate:** Tự động bác bỏ mọi heuristic suy diễn từ token rời rạc (`isolated_token_heuristic_rejected = true`).

---

### III. KẾT QUẢ THỬ NGHIỆM ĐƠN LẺ VÀ PHÁN QUYẾT 'NO PUBLISHABLE FACT' (MANDATE EZ-K.3)

Áp dụng Evidence Contract v3 cho ứng viên thử nghiệm duy nhất (**Notion for Education**):
- **Trích đoạn Raw duy nhất:** `"The all-in-one workspace for students and educators."` (Nằm tại byte offset 302–355 trong thẻ `<meta name="description">`).
- **Phân loại:** `DESCRIPTIVE_ONLY` (Chỉ là câu khẩu hiệu mô tả sản phẩm tiếp thị, không chứa điều khoản điều kiện xét duyệt sinh viên, thời hạn cấp hay quyền lợi kinh tế).
- **Phán quyết Hội đồng:** **`NO_PUBLISHABLE_FACT_DESCRIPTIVE_ONLY_HELD_INTERNAL`**.
- **Hành động Quản trị:** **Tuyệt đối KHÔNG tạo card, KHÔNG tạo CTA, KHÔNG tăng đếm trên Staging hay Production.**

---

### IV. BẢO TỒN STAGING PILOT EZ-H VÀ SAVINGS LAB (MANDATE EZ-K.4)

- **Staging Server (`http://127.0.0.1:4173/`):** Tiếp tục phục vụ duy nhất **1 card T2 GitHub Education Documentation Pilot** đã được CEO duyệt (`public_eligible_t2_documentation = 1`).
- **Savings Lab Local-First:** 5 input người dùng tự nhập, 0 network call, 0 cookie/PII, 0 giá mẫu.
- **AccessTrade JTBD:** Duy trì 100% định tính, 0 trường thương mại, cụm trường là `QUALITATIVE_RESEARCH_HYPOTHESIS_ONLY`.

---

### V. TỔNG HỢP KIỂM THỬ TOÀN DIỆN (115/115 TESTS PASS 100%)

| Bộ kiểm thử | Số bài test | Kết quả |
| :--- | :---: | :---: |
| **EZ-K Evidence Contract v3 & Entailment QA Suite** | 25 | **25/25 PASS** ✅ |
| **EZ-J Document Provenance & Quarantine QA Suite** | 28 | **28/28 PASS** ✅ |
| **EZ-H T2 Pilot E2E Browser Suite (1440, 768, 390 viewports)** | 30 | **30/30 PASS** ✅ |
| **Review Pack QA Assertion Suite (Port 4173)** | 21 | **21/21 PASS** ✅ |
| **Calculator Unit Test Suite (Math & Edge Cases)** | 10 | **10/10 PASS** ✅ |
| **Tổng cộng** | **114** | **114/114 PASS (100%)** ✅ |

---

### VI. BỘ ARTIFACTS CỦA EZ-K REVIEW PACK

- **Hồ sơ Hội đồng Liên bộ chính thức EZ-K:** [`COUNCIL_REVIEW_PACK_EZ_K_EVIDENCE_CONTRACT_V3_20260831.md`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/01_EXECUTIVE_COUNCIL/COUNCIL_REVIEW_PACK_EZ_K_EVIDENCE_CONTRACT_V3_20260831.md)
- **Đặc tả Schema Evidence Contract v3:** [`JAYT_EVIDENCE_CONTRACT_V3_SCHEMA_EZ_K.json`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/06_TRUST_AND_EVIDENCE/JAYT_EVIDENCE_CONTRACT_V3_SCHEMA_EZ_K.json)
- **Sổ bộ Bằng chứng & Ma trận Thất bại Ngữ nghĩa EZ-K:** [`PROPOSED_UTILITY_FACTS_EZ_K.json`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/06_TRUST_AND_EVIDENCE/PROPOSED_UTILITY_FACTS_EZ_K.json)
- **Manifest Đồng nhất Phiên bản Parity:** [`JAYT_VERSION_PARITY_MANIFEST_EZ_K.json`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/00_PROGRAM_BASELINE/JAYT_VERSION_PARITY_MANIFEST_EZ_K.json)
- **Biên nhận Phát hành Release Receipt EZ-K:** [`JAYT_RELEASE_RECEIPT_EZ_K.json`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/00_PROGRAM_BASELINE/JAYT_RELEASE_RECEIPT_EZ_K.json)
- **Script Kiểm thử EZ-K Contract v3 & Entailment QA:** [`test_evidence_contract_v3_and_entailment_ez_k.js`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/test_evidence_contract_v3_and_entailment_ez_k.js)
- **Script Kiểm thử EZ-J Provenance & Quarantine QA:** [`test_document_provenance_and_quarantine_ez_j.js`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/test_document_provenance_and_quarantine_ez_j.js)
- **Script Kiểm thử T2 Pilot E2E Browser Suite EZ-H:** [`test_ez_h_t2_pilot_e2e.js`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/test_ez_h_t2_pilot_e2e.js)
- **Script Kiểm thử Toàn diện Review Pack QA:** [`test_ez_review_pack_assertions.js`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/test_ez_review_pack_assertions.js)

---

### VII. LỆNH TÁI LẬP KIỂM ĐỊNH ĐỘC LẬP CHO CEO

Kính mời CEO thực thi độc lập các lệnh sau trên terminal để tái lập toàn bộ kiểm thử:

```powershell
# 1. Kiểm tra sức khỏe Staging Server & Parity Manifest
Invoke-RestMethod -Uri http://127.0.0.1:4173/health

# 2. Chạy kiểm thử Evidence Contract v3 & Entailment QA Suite (25 tests)
node "07_QUALITY_ASSURANCE/test_evidence_contract_v3_and_entailment_ez_k.js"

# 3. Chạy kiểm thử Document Provenance & Quarantine QA Suite (28 tests)
node "07_QUALITY_ASSURANCE/test_document_provenance_and_quarantine_ez_j.js"

# 4. Chạy kiểm thử EZ-H T2 Pilot E2E Browser Suite trên 3 Viewport (30 tests)
node "07_QUALITY_ASSURANCE/test_ez_h_t2_pilot_e2e.js"

# 5. Chạy kiểm thử Toàn diện Review Pack QA trên cổng 4173 (21 tests)
node "07_QUALITY_ASSURANCE/test_ez_review_pack_assertions.js"

# 6. Chạy kiểm thử đơn vị Bảng tính Local-First (10 tests)
node "07_QUALITY_ASSURANCE/test_calculator_unit_ez.js"

# 7. Mở trình duyệt kiểm tra trực tiếp Staging Server
Start-Process "http://127.0.0.1:4173/"
```

---

### VIII. CAM KẾT VẬN HÀNH & KÍNH TRÌNH CEO

1. **Khóa Phát hành Production:** Production tiếp tục được khóa tại `v3.419.0`, `P0_EQ` tiếp tục ở trạng thái `OPEN`.
2. **Khóa Kích hoạt Affiliate & Voucher Public:** `T1 Voucher Verified = 0`, `Public T2 Documentation = 1`, `New Candidates Public = 0`, `Affiliate Activation = false`.
3. **Kính trình CEO trực tiếp kiểm định độc lập toàn bộ hồ sơ EZ-K, Evidence Contract v3 schema, Semantic Failure Matrix và kết luận fail-closed trước khi đưa ra quyết định tiếp theo.**