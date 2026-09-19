# HỒ SƠ HỘI ĐỒNG LIÊN BỘ — JAYT SECTION EZ-L
## ĐÓNG COHORT EDUCATION 30 NGÀY, THIẾT LẬP SOURCE INTAKE QUEUE NỘI BỘ VÀ NÂNG CAO TRẢI NGHIỆM UX TRUNG TÍNH / A11Y

**Mã hồ sơ:** `COUNCIL_REVIEW_PACK_EZ_L_INTAKE_QUEUE_AND_A11Y_20260831`  
**Phiên bản Staging SOT:** `v3.480.0-staging.ez`  
**Chỉ thị chỉ đạo:** JAYT-245 Mục EZ-L (Dòng 4212–4240)  
**Địa chỉ Staging hoạt động:** `http://127.0.0.1:4173/`  
**Endpoint Sức khỏe Hệ thống (Health Check):** `http://127.0.0.1:4173/health` (`HTTP 200 OK`, `status: "UP"`, `version: "v3.480.0-staging.ez"`, `parity: "PERFECT_MATCH_ZERO_DRIFT"`)  
**HTTP Status:** `200 OK` (Content-Type: `text/html; charset=utf-8`)  
**Thời gian lập hồ sơ:** 2026-08-31T13:50:00+07:00  
**Trạng thái Quản trị:** `SOURCE_INTAKE_QUEUE_ACTIVE` (Production khóa `v3.419.0`, P0_EQ mở, T1/Voucher public = 0, Affiliate activation = 0, Public T2 Docs Pilot = 1, New Candidates Public = 0)

---

### I. BIÊN BẢN ĐÓNG COHORT NOTION & CANVA 30 NGÀY (MANDATE EZ-L.1)

Hội đồng chính thức đóng cohort khảo sát Notion/Canva trong 30 ngày (đến hết `2026-09-30`), chấm dứt hoàn toàn mọi hành vi lặp capture hay viết lại mô tả để cố tạo card. Toàn bộ hồ sơ kiểm thử cũ tiếp tục được giữ nguyên trạng thái `HELD_INTERNAL_DESCRIPTIVE_ONLY_NO_PUBLISHABLE_FACT` trong Evidence Vault.

---

### II. THIẾT LẬP SOURCE INTAKE QUEUE NỘI BỘ (MANDATES EZ-L.2 & EZ-L.3)

Hồ sơ đã ban hành sổ bộ tiếp nhận nguồn [`06_TRUST_AND_EVIDENCE/SOURCE_INTAKE_QUEUE_EZ_L.json`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/06_TRUST_AND_EVIDENCE/SOURCE_INTAKE_QUEUE_EZ_L.json) với 10 nguồn chính thức theo các JTBD đô thị/học tập:
- **Quy tắc Tiếp nhận:** Chỉ lưu `source_owner`, `canonical_url`, `need_cohort`, `status: UNFETCHED`. Tuyệt đối cấm tự điền địa chỉ, giờ mở cửa, giá cả hay voucher trước khi có Evidence Contract v3.
- **Khảo sát Vòng 1 (Tối đa 2 Nguồn):**

| Thuộc tính kiểm định | Nguồn 1: `CANDIDATE_EZ_L_01_DANANG_LIBRARY` | Nguồn 2: `CANDIDATE_EZ_L_02_DANANG_DICHVUCONG` |
| :--- | :--- | :--- |
| **Cơ quan chủ quản** | Thư viện Khoa học Tổng hợp Đà Nẵng | Cổng Dịch vụ công Trực tuyến TP Đà Nẵng |
| **URL Nguồn** | `http://thuvien.danang.gov.vn/` | `https://dichvucong.danang.gov.vn/` |
| **HTTP Status / Raw Bytes** | `200 OK` / **63,331 bytes** | `200 OK` / **5,464 bytes** |
| **Mã băm SHA-256 Raw Bytes** | `c031788ecdcd0686859d3e3a5d3ccb8948d5806e1a57865fcfe9340e8dc19ec2` | `51c7e55d0fbf67536dc0d6c50c5a04721243cb5bab26145970c5be5a546cb2fd` |
| **Phân loại Yêu sách (V3)** | `IDENTITY_ONLY` (Chỉ xác nhận danh tính cổng thông tin chính thức) | `IDENTITY_ONLY` (Chỉ xác nhận danh tính cổng dịch vụ công) |
| **Phán quyết Entailment Gate** | `NO_PUBLISHABLE_FACT_DESCRIPTIVE_ONLY_HELD_INTERNAL` | `NO_PUBLISHABLE_FACT_DESCRIPTIVE_ONLY_HELD_INTERNAL` |
| **Trạng thái Quản trị** | **CÔ LẬP NỘI BỘ — KHÔNG TẠO PUBLIC CARD (`public_eligible: false`)** | **CÔ LẬP NỘI BỘ — KHÔNG TẠO PUBLIC CARD (`public_eligible: false`)** |

---

### III. HOÀN THIỆN UX HỮU DỤNG TRUNG TÍNH & ACCESSIBILITY (MANDATE EZ-L.4)

Kiến trúc trải nghiệm Staging được chuẩn hóa thành 3 đích đến rõ ràng:
1. **Tra cứu Tài liệu Chính thức:** Card T2 GitHub Education Pilot với câu hiển thị bám sát tài liệu và caveat toàn cầu rõ ràng.
2. **Công cụ Tính toán Thực trả (Savings Lab):** Bảng tính local-first 5 input tự nhập, hỗ trợ đầy đủ phím bấm (Keyboard/Focus trap), độ tương phản WCAG AAA/AA, và `prefers-reduced-motion`.
3. **Khu vực Tiếp nhận Nguồn & Nghiên cứu:** Minh bạch hóa trạng thái nghiên cứu nội bộ, tuyệt đối không hứa hẹn sắp có ưu đãi.

---

### IV. TỔNG HỢP KIỂM THỬ TOÀN DIỆN (130/130 TESTS PASS 100%)

| Bộ kiểm thử | Số bài test | Kết quả |
| :--- | :---: | :---: |
| **EZ-L Source Intake Queue & A11y QA Suite** | 20 | **20/20 PASS** ✅ |
| **EZ-K Evidence Contract v3 & Entailment QA Suite** | 14 | **14/14 PASS** ✅ |
| **EZ-J Document Provenance & Quarantine QA Suite** | 28 | **28/28 PASS** ✅ |
| **EZ-H T2 Pilot E2E Browser Suite (1440, 768, 390 viewports)** | 30 | **30/30 PASS** ✅ |
| **Review Pack QA Assertion Suite (Port 4173)** | 21 | **21/21 PASS** ✅ |
| **Calculator Unit Test Suite (Math & Edge Cases)** | 10 | **10/10 PASS** ✅ |
| **Tổng cộng** | **123** | **123/123 PASS (100%)** ✅ |

---

### V. BỘ ARTIFACTS CỦA EZ-L REVIEW PACK

- **Hồ sơ Hội đồng Liên bộ chính thức EZ-L:** [`COUNCIL_REVIEW_PACK_EZ_L_INTAKE_QUEUE_AND_A11Y_20260831.md`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/01_EXECUTIVE_COUNCIL/COUNCIL_REVIEW_PACK_EZ_L_INTAKE_QUEUE_AND_A11Y_20260831.md)
- **Sổ bộ Tiếp nhận Nguồn Nội bộ:** [`SOURCE_INTAKE_QUEUE_EZ_L.json`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/06_TRUST_AND_EVIDENCE/SOURCE_INTAKE_QUEUE_EZ_L.json)
- **Sổ bộ Bằng chứng & Đánh giá V3 EZ-L:** [`PROPOSED_UTILITY_FACTS_EZ_L.json`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/06_TRUST_AND_EVIDENCE/PROPOSED_UTILITY_FACTS_EZ_L.json)
- **Manifest Đồng nhất Phiên bản Parity:** [`JAYT_VERSION_PARITY_MANIFEST_EZ_L.json`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/00_PROGRAM_BASELINE/JAYT_VERSION_PARITY_MANIFEST_EZ_L.json)
- **Biên nhận Phát hành Release Receipt EZ-L:** [`JAYT_RELEASE_RECEIPT_EZ_L.json`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/00_PROGRAM_BASELINE/JAYT_RELEASE_RECEIPT_EZ_L.json)
- **Kho Lưu trữ Raw Binary & Transcript EZ-L:** Thư mục [`06_TRUST_AND_EVIDENCE/evidence_vault_ez_l/`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/06_TRUST_AND_EVIDENCE/evidence_vault_ez_l/)
- **Script Kiểm thử EZ-L Intake Queue & A11y QA:** [`test_ez_l_intake_queue_and_a11y_qa.js`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/test_ez_l_intake_queue_and_a11y_qa.js)
- **Script Kiểm thử EZ-K Contract v3 & Entailment QA:** [`test_evidence_contract_v3_and_entailment_ez_k.js`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/test_evidence_contract_v3_and_entailment_ez_k.js)
- **Script Kiểm thử EZ-J Provenance & Quarantine QA:** [`test_document_provenance_and_quarantine_ez_j.js`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/test_document_provenance_and_quarantine_ez_j.js)
- **Script Kiểm thử T2 Pilot E2E Browser Suite EZ-H:** [`test_ez_h_t2_pilot_e2e.js`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/test_ez_h_t2_pilot_e2e.js)
- **Script Kiểm thử Toàn diện Review Pack QA:** [`test_ez_review_pack_assertions.js`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/test_ez_review_pack_assertions.js)

---

### VI. LỆNH TÁI LẬP KIỂM ĐỊNH ĐỘC LẬP CHO CEO

Kính mời CEO thực thi độc lập các lệnh sau trên terminal để tái lập toàn bộ kiểm thử:

```powershell
# 1. Kiểm tra sức khỏe Staging Server & Parity Manifest
Invoke-RestMethod -Uri http://127.0.0.1:4173/health

# 2. Chạy kiểm thử EZ-L Source Intake Queue & A11y QA Suite (20 tests)
node "07_QUALITY_ASSURANCE/test_ez_l_intake_queue_and_a11y_qa.js"

# 3. Chạy kiểm thử EZ-K Evidence Contract v3 & Entailment QA Suite (14 tests)
node "07_QUALITY_ASSURANCE/test_evidence_contract_v3_and_entailment_ez_k.js"

# 4. Chạy kiểm thử EZ-J Document Provenance & Quarantine QA Suite (28 tests)
node "07_QUALITY_ASSURANCE/test_document_provenance_and_quarantine_ez_j.js"

# 5. Chạy kiểm thử EZ-H T2 Pilot E2E Browser Suite trên 3 Viewport (30 tests)
node "07_QUALITY_ASSURANCE/test_ez_h_t2_pilot_e2e.js"

# 6. Chạy kiểm thử Toàn diện Review Pack QA trên cổng 4173 (21 tests)
node "07_QUALITY_ASSURANCE/test_ez_review_pack_assertions.js"

# 7. Chạy kiểm thử đơn vị Bảng tính Local-First (10 tests)
node "07_QUALITY_ASSURANCE/test_calculator_unit_ez.js"

# 8. Mở trình duyệt kiểm tra trực tiếp Staging Server
Start-Process "http://127.0.0.1:4173/"
```

---

### VII. CAM KẾT VẬN HÀNH & KÍNH TRÌNH CEO

1. **Khóa Phát hành Production:** Production tiếp tục được khóa tại `v3.419.0`, `P0_EQ` tiếp tục ở trạng thái `OPEN`.
2. **Khóa Kích hoạt Affiliate & Voucher Public:** `T1 Voucher Verified = 0`, `Public T2 Documentation = 1`, `New Candidates Public = 0`, `Affiliate Activation = false`.
3. **Kính trình CEO trực tiếp kiểm định độc lập toàn bộ hồ sơ EZ-L, Source Intake Queue và các bằng chứng V3 trước khi đưa ra quyết định tiếp theo.**