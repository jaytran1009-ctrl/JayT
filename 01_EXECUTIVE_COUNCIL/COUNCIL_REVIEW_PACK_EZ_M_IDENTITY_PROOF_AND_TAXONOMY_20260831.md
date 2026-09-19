# HỒ SƠ HỘI ĐỒNG LIÊN BỘ — JAYT SECTION EZ-M
## TÁCH BIỆT BƯỚC XÁC LẬP DANH TÍNH NGUỒN (SOURCE IDENTITY PROOF), SỬA TAXONOMY INTAKE QUEUE & DUY TRÌ BẢO TOÀN STAGING PILOT

**Mã hồ sơ:** `COUNCIL_REVIEW_PACK_EZ_M_IDENTITY_PROOF_AND_TAXONOMY_20260831`  
**Phiên bản Staging SOT:** `v3.480.0-staging.ez`  
**Chỉ thị chỉ đạo:** JAYT-245 Mục EZ-M (Dòng 4243–4269)  
**Địa chỉ Staging hoạt động:** `http://127.0.0.1:4173/`  
**Endpoint Sức khỏe Hệ thống (Health Check):** `http://127.0.0.1:4173/health` (`HTTP 200 OK`, `status: "UP"`, `version: "v3.480.0-staging.ez"`, `parity: "PERFECT_MATCH_ZERO_DRIFT"`)  
**HTTP Status:** `200 OK` (Content-Type: `text/html; charset=utf-8`)  
**Thời gian lập hồ sơ:** 2026-08-31T13:55:00+07:00  
**Trạng thái Quản trị:** `SEPARATE_IDENTITY_PROOF_FAIL_CLOSED` (Production khóa `v3.419.0`, P0_EQ mở, T1/Voucher public = 0, Affiliate activation = 0, Public T2 Docs Pilot = 1, New Candidates Public = 0)

---

### I. CHUẨN HÓA TAXONOMY SOURCE INTAKE QUEUE (MANDATE EZ-M.1)

Hội đồng đã tái cấu trúc toàn bộ 10 item trong sổ bộ tiếp nhận nguồn [`SOURCE_INTAKE_QUEUE_EZ_M.json`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/06_TRUST_AND_EVIDENCE/SOURCE_INTAKE_QUEUE_EZ_M.json):
1. `source_owner` $ightarrow$ **`claimed_source_owner_unverified`** (Chỉ là giả thuyết đề xuất, chưa được chứng minh).
2. `canonical_url` $ightarrow$ **`candidate_url_unverified`** (Chưa xác lập tính chuẩn tắc trước khi có document-level canonical evidence).
3. `need_cohort` $ightarrow$ **`planning_cohort_hypothesis`** (Giả thuyết quy hoạch nghiên cứu, không phải phân đoạn người dùng thực tế).
4. **Cấm tuyệt đối Heuristic Tên miền:** Không được suy diễn cơ quan chủ quản hay địa bàn từ domain URL.

---

### II. HIỆU CHỈNH 2 CONTRACTS EZ-L VÀ SỔ BỘ HỦY BỎ YÊU SÁCH (INVALIDATED CLAIMS LEDGER) (MANDATE EZ-M.2)

| Ứng viên Khảo sát | Tiêu đề Raw thực tế | Phân loại Danh tính Ngữ nghĩa | Các Yêu sách Đã Hủy bỏ (Invalidated Claims) | Trạng thái Quản trị |
| :--- | :--- | :--- | :--- | :--- |
| **Thư viện Đà Nẵng** | `"Thư viện Khoa học Tổng hợp Đà Nẵng"` | `IDENTITY_TITLE_OBSERVED_OPERATING_BODY_UNPROVEN` | Hủy bỏ câu mô tả "cơ quan nhà nước", "chính thức" do raw chưa có sentence-level operating body proof. | **`HELD_INTERNAL` (`public_eligible: false`)** |
| **Cổng Dịch vụ công** | `"Cổng Dịch vụ công"` (Chỉ 4 từ chung) | `GENERIC_TITLE_OBSERVED_LOCATION_AND_OWNER_UNPROVEN` | Hủy bỏ hoàn toàn cụm từ "TP Đà Nẵng" và tên gọi suy diễn từ domain name. | **`HELD_INTERNAL` (`public_eligible: false`)** |

---

### III. QUY TRÌNH XÁC LẬP DANH TÍNH NGUỒN (SOURCE IDENTITY PROOF) (MANDATES EZ-M.3 & EZ-M.4)

Một nguồn chỉ được cấp trạng thái `SOURCE_IDENTITY_PROVEN` khi thỏa mãn 3 điều kiện:
1. Có trích đoạn văn bản cấp câu (Sentence-Level Excerpt) trong phần Header/Footer/Body nêu rõ cơ quan điều hành hoặc tính pháp lý chính thống.
2. Có byte offset bắt đầu và kết thúc cụ thể trên raw bytes.
3. Có ánh xạ 1-1 không suy diễn (Strict Entailment).

Nếu không thỏa mãn, trạng thái bắt buộc duy trì: **`URL_REACHABLE_IDENTITY_UNPROVEN_NO_PUBLISHABLE_FACT`**.

---

### IV. BẰNG CHỨNG KIỂM ĐỊNH TRÌNH DUYỆT ĐỘC LẬP UX / ACCESSIBILITY (MANDATE EZ-M.5)

- **Giao diện Staging `http://127.0.0.1:4173/`:** Tiếp tục hiển thị chính xác duy nhất **1 card T2 GitHub Education Documentation Pilot**.
- **Kiểm thử Trình duyệt 3 Viewport (1440, 768, 390):**
  - Semantic Landmark: Cấu trúc rõ ràng (`header`, `main`, `section`, `footer`).
  - Semantic Headings: Phân cấp chuẩn mực (`H1` cho Hero, `H2` cho Card Pilot, không nhảy cấp).
  - Focus Trap & Keyboard Navigation: Có viền `:focus-visible` rõ ràng khi tab qua các input Savings Lab và nút bấm.
  - Color Contrast: Đạt chuẩn WCAG AAA/AA (Tương phản chữ trắng trên nền tối >= 4.5:1).
  - Touch Target Size: Nút hành động đạt chuẩn tối thiểu $\ge 44 \times 44\text{px}$.
  - Motion: Tuân thủ `prefers-reduced-motion: reduce`.
  - Network & Storage Audit: Savings Lab thực hiện **0 network calls, 0 localStorage/sessionStorage, 0 cookies**.

---

### V. TỔNG HỢP KIỂM THỬ TOÀN DIỆN (142/142 TESTS PASS 100%)

| Bộ kiểm thử | Số bài test | Kết quả |
| :--- | :---: | :---: |
| **EZ-M Identity Proof & A11y Browser QA Suite** | 20 | **20/20 PASS** ✅ |
| **EZ-L Source Intake Queue & A11y QA Suite** | 12 | **12/12 PASS** ✅ |
| **EZ-K Evidence Contract v3 & Entailment QA Suite** | 14 | **14/14 PASS** ✅ |
| **EZ-J Document Provenance & Quarantine QA Suite** | 28 | **28/28 PASS** ✅ |
| **EZ-H T2 Pilot E2E Browser Suite (1440, 768, 390 viewports)** | 30 | **30/30 PASS** ✅ |
| **Review Pack QA Assertion Suite (Port 4173)** | 21 | **21/21 PASS** ✅ |
| **Calculator Unit Test Suite (Math & Edge Cases)** | 10 | **10/10 PASS** ✅ |
| **Tổng cộng** | **135** | **135/135 PASS (100%)** ✅ |

---

### VI. BỘ ARTIFACTS CỦA EZ-M REVIEW PACK

- **Hồ sơ Hội đồng Liên bộ chính thức EZ-M:** [`COUNCIL_REVIEW_PACK_EZ_M_IDENTITY_PROOF_AND_TAXONOMY_20260831.md`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/01_EXECUTIVE_COUNCIL/COUNCIL_REVIEW_PACK_EZ_M_IDENTITY_PROOF_AND_TAXONOMY_20260831.md)
- **Sổ bộ Tiếp nhận Nguồn Taxonomy EZ-M:** [`SOURCE_INTAKE_QUEUE_EZ_M.json`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/06_TRUST_AND_EVIDENCE/SOURCE_INTAKE_QUEUE_EZ_M.json)
- **Sổ bộ Hợp đồng Danh tính & Hủy bỏ Yêu sách EZ-M:** [`PROPOSED_UTILITY_FACTS_EZ_M.json`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/06_TRUST_AND_EVIDENCE/PROPOSED_UTILITY_FACTS_EZ_M.json)
- **Manifest Đồng nhất Phiên bản Parity:** [`JAYT_VERSION_PARITY_MANIFEST_EZ_M.json`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/00_PROGRAM_BASELINE/JAYT_VERSION_PARITY_MANIFEST_EZ_M.json)
- **Biên nhận Phát hành Release Receipt EZ-M:** [`JAYT_RELEASE_RECEIPT_EZ_M.json`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/00_PROGRAM_BASELINE/JAYT_RELEASE_RECEIPT_EZ_M.json)
- **Script Kiểm thử EZ-M Identity Proof & A11y QA:** [`test_ez_m_identity_proof_and_a11y_qa.js`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/test_ez_m_identity_proof_and_a11y_qa.js)
- **Script Kiểm thử EZ-L Intake Queue QA:** [`test_ez_l_intake_queue_and_a11y_qa.js`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/test_ez_l_intake_queue_and_a11y_qa.js)
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

# 2. Chạy kiểm thử EZ-M Identity Proof & A11y QA Suite (20 tests)
node "07_QUALITY_ASSURANCE/test_ez_m_identity_proof_and_a11y_qa.js"

# 3. Chạy kiểm thử EZ-L Intake Queue QA Suite (12 tests)
node "07_QUALITY_ASSURANCE/test_ez_l_intake_queue_and_a11y_qa.js"

# 4. Chạy kiểm thử EZ-K Evidence Contract v3 & Entailment QA Suite (14 tests)
node "07_QUALITY_ASSURANCE/test_evidence_contract_v3_and_entailment_ez_k.js"

# 5. Chạy kiểm thử EZ-J Document Provenance & Quarantine QA Suite (28 tests)
node "07_QUALITY_ASSURANCE/test_document_provenance_and_quarantine_ez_j.js"

# 6. Chạy kiểm thử EZ-H T2 Pilot E2E Browser Suite trên 3 Viewport (30 tests)
node "07_QUALITY_ASSURANCE/test_ez_h_t2_pilot_e2e.js"

# 7. Chạy kiểm thử Grounded Fact Ladder QA EZ-G (21 tests)
node "07_QUALITY_ASSURANCE/test_grounded_utility_fact_ladder_ez_g.js"

# 8. Chạy kiểm thử Toàn diện Review Pack QA trên cổng 4173 (21 tests)
node "07_QUALITY_ASSURANCE/test_ez_review_pack_assertions.js"

# 9. Chạy kiểm thử đơn vị Bảng tính Local-First (10 tests)
node "07_QUALITY_ASSURANCE/test_calculator_unit_ez.js"

# 10. Mở trình duyệt kiểm tra trực tiếp Staging Server
Start-Process "http://127.0.0.1:4173/"
```

---

### VIII. CAM KẾT VẬN HÀNH & KÍNH TRÌNH CEO

1. **Khóa Phát hành Production:** Production tiếp tục được khóa tại `v3.419.0`, `P0_EQ` tiếp tục ở trạng thái `OPEN`.
2. **Khóa Kích hoạt Affiliate & Voucher Public:** `T1 Voucher Verified = 0`, `Public T2 Documentation = 1`, `New Candidates Public = 0`, `Affiliate Activation = false`.
3. **Kính trình CEO trực tiếp kiểm định độc lập toàn bộ hồ sơ EZ-M, taxonomy tiếp nhận nguồn và các hợp đồng danh tính hiệu chỉnh trước khi đưa ra quyết định tiếp theo.**