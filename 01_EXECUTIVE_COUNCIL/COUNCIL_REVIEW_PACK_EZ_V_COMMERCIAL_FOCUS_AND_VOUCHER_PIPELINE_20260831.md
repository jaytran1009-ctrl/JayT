# HỒ SƠ HỘI ĐỒNG LIÊN BỘ — JAYT SECTION EZ-V
## CHUYỂN TRỌNG TÂM THƯƠNG MẠI CÓ KIỂM SOÁT: SAVINGS LAB, VOUCHER EVIDENCE PIPELINE VÀ ACCESSTRADE JTBD

**Mã hồ sơ:** `COUNCIL_REVIEW_PACK_EZ_V_COMMERCIAL_FOCUS_AND_VOUCHER_PIPELINE_20260831`  
**Phiên bản Staging SOT:** `v3.480.0-staging.ez`  
**Chỉ thị chỉ đạo:** JAYT-245 Mục EZ-V (Dòng 4475–4539)  
**Địa chỉ Staging hoạt động:** `http://127.0.0.1:4173/`  
**Endpoint Sức khỏe Hệ thống (Health Check):** `http://127.0.0.1:4173/health` (`HTTP 200 OK`, `status: "UP"`, `version: "v3.480.0-staging.ez"`, `parity: "PERFECT_MATCH_ZERO_DRIFT"`)  
**HTTP Status:** `200 OK` (Content-Type: `text/html; charset=utf-8`)  
**Thời gian lập hồ sơ:** 2026-08-31T14:44:00+07:00  
**Trạng thái Quản trị:** `COMMERCIAL_FOCUS_PIVOT_ACTIVE` (Production khóa `v3.419.0`, P0_EQ mở, T1/Voucher public = 0, Affiliate activation = 0, Public T2 Docs Pilot = 1, External Links DOM = 1, New Public Cards = 0, Historical Location Branch = CLOSED)

---

### I. ĐÓNG HOÀN TOÀN NHÁNH ĐỊA ĐIỂM LỊCH SỬ (MANDATE EZ-V.1)

Lập văn bản [`HISTORICAL_LOCATION_BRANCH_CLOSURE_EZ_V.json`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/06_TRUST_AND_EVIDENCE/HISTORICAL_LOCATION_BRANCH_CLOSURE_EZ_V.json) chính thức dừng đầu tư vào các địa điểm công cộng tĩnh (Thư viện Tổng hợp, Bảo tàng Đà Nẵng, Thư viện Quốc gia):
- Toàn bộ raw bytes đã thu thập được lưu trữ nội bộ để làm bằng chứng lịch sử.
- Tuyệt đối **không tạo card công khai, không suy diễn quan hệ cơ quan hay quyền lợi địa phương**.
- Dồn 100% nguồn lực vào bài toán chi tiêu thực tế, voucher và Savings Lab.

---

### II. BA LUỒNG CÔNG VIỆC TRỌNG TÂM CỦA SECTION EZ-V

#### 1. Luồng A — Hoàn Thiện Savings Lab Local-First (Mandate EZ-V.2)
- **Công thức chuẩn hóa:** `Giá niêm yết + Phí giao hàng - Giảm giá trực tiếp - Giảm từ voucher = Tổng thực trả`.
- **Hiển thị minh bạch:** Tổng số tiền thực trả, Tổng số tiền tiết kiệm, Số tiền mỗi người trả (khi chia nhóm).
- **Thông báo giới hạn rõ ràng:** *"Lưu ý: JayT không đọc giỏ hàng và không xác thực mã cá nhân của bạn. Vui lòng kiểm tra mã tại ứng dụng hoặc giỏ hàng chính thức của đơn vị bán."*
- **Kỷ luật dữ liệu:** 100% local-first, zero-network, zero-PII, không chèn số mẫu, không tự nhận xét "rẻ nhất/hời nhất".

#### 2. Luồng B — Thiết Lập Voucher Evidence Pipeline (Mandate EZ-V.3)
- Thiết lập [`VOUCHER_EVIDENCE_PIPELINE_SCHEMA_EZ_V.json`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/06_TRUST_AND_EVIDENCE/VOUCHER_EVIDENCE_PIPELINE_SCHEMA_EZ_V.json) với 12 trường bằng chứng bắt buộc.
- Lập [`INTERNAL_VOUCHER_CANDIDATE_REGISTRY_EZ_V.json`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/06_TRUST_AND_EVIDENCE/INTERNAL_VOUCHER_CANDIDATE_REGISTRY_EZ_V.json) quản lý các nguồn giả thuyết (Shopee KOL, TikTok Shop, Vé xem phim U22, Vé xe buýt DanaBus).
- Mặc định: `T1_DEAL = 0`, `public_eligible_voucher = 0`. Thiếu bằng chứng raw $\rightarrow$ `HELD_INTERNAL` / `T4_SOURCE_TO_WATCH`.

#### 3. Luồng C — Commercial Opportunity Map Định Tính (Mandate EZ-V.4)
- Thiết lập [`COMMERCIAL_OPPORTUNITY_MAP_QUALITATIVE_EZ_V.json`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/06_TRUST_AND_EVIDENCE/COMMERCIAL_OPPORTUNITY_MAP_QUALITATIVE_EZ_V.json) qua 7 nhóm JTBD:
  1. Ăn trưa văn phòng & sinh viên
  2. Di chuyển hàng ngày
  3. Học tập & Công việc
  4. Đồ dùng phòng KTX & gia dụng $\le 50\text{K}$
  5. Sức khỏe & Thể thao
  6. Giải trí cuối tuần & Rạp chiếu phim
  7. Mua sắm nhu yếu phẩm
- Không ghi nhận hoa hồng, doanh thu, rating hay deeplink. Khóa toàn bộ tính năng affiliate chờ ủy quyền bằng văn bản.

---

### III. TỔNG HỢP KIỂM THỬ TOÀN DIỆN (205/205 TESTS PASS 100%)

| Bộ kiểm thử | Số bài test | Kết quả |
| :--- | :---: | :---: |
| **EZ-V Commercial Pipeline & Savings Lab QA Suite** | 11 | **11/11 PASS** ✅ |
| **EZ-T Document Discovery & Contract v3 QA Suite** | 10 | **10/10 PASS** ✅ |
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
| **Tổng cộng** | **205** | **205/205 PASS (100%)** ✅ |

---

### IV. BỘ ARTIFACTS CỦA EZ-V REVIEW PACK

- **Hồ sơ Hội đồng Liên bộ chính thức EZ-V:** [`COUNCIL_REVIEW_PACK_EZ_V_COMMERCIAL_FOCUS_AND_VOUCHER_PIPELINE_20260831.md`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/01_EXECUTIVE_COUNCIL/COUNCIL_REVIEW_PACK_EZ_V_COMMERCIAL_FOCUS_AND_VOUCHER_PIPELINE_20260831.md)
- **Văn bản Đóng Nhánh Địa điểm Lịch sử:** [`HISTORICAL_LOCATION_BRANCH_CLOSURE_EZ_V.json`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/06_TRUST_AND_EVIDENCE/HISTORICAL_LOCATION_BRANCH_CLOSURE_EZ_V.json)
- **Schema Pipeline Bằng chứng Voucher:** [`VOUCHER_EVIDENCE_PIPELINE_SCHEMA_EZ_V.json`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/06_TRUST_AND_EVIDENCE/VOUCHER_EVIDENCE_PIPELINE_SCHEMA_EZ_V.json)
- **Sổ bộ Ứng viên Voucher Nội bộ:** [`INTERNAL_VOUCHER_CANDIDATE_REGISTRY_EZ_V.json`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/06_TRUST_AND_EVIDENCE/INTERNAL_VOUCHER_CANDIDATE_REGISTRY_EZ_V.json)
- **Bản đồ Cơ hội Thương mại Định tính (JTBD Map):** [`COMMERCIAL_OPPORTUNITY_MAP_QUALITATIVE_EZ_V.json`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/06_TRUST_AND_EVIDENCE/COMMERCIAL_OPPORTUNITY_MAP_QUALITATIVE_EZ_V.json)
- **Manifest Đồng nhất Phiên bản Parity:** [`JAYT_VERSION_PARITY_MANIFEST_EZ_V.json`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/00_PROGRAM_BASELINE/JAYT_VERSION_PARITY_MANIFEST_EZ_V.json)
- **Biên nhận Phát hành Release Receipt EZ-V:** [`JAYT_RELEASE_RECEIPT_EZ_V.json`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/00_PROGRAM_BASELINE/JAYT_RELEASE_RECEIPT_EZ_V.json)
- **Script Kiểm thử EZ-V Commercial Pipeline & Savings Lab QA:** [`test_ez_v_commercial_pipeline_and_savings_lab_qa.js`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/test_ez_v_commercial_pipeline_and_savings_lab_qa.js)
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

# 2. Chạy kiểm thử EZ-V Commercial Pipeline & Savings Lab QA Suite (11 tests)
node "07_QUALITY_ASSURANCE/test_ez_v_commercial_pipeline_and_savings_lab_qa.js"

# 3. Chạy kiểm thử EZ-T Document Discovery & Contract v3 QA Suite (10 tests)
node "07_QUALITY_ASSURANCE/test_ez_t_document_discovery_qa.js"

# 4. Chạy kiểm thử EZ-S Proof Gate Cleanup & Schema QA Suite (10 tests)
node "07_QUALITY_ASSURANCE/test_ez_s_proof_gate_cleanup_and_schema_qa.js"

# 5. Chạy kiểm thử EZ-R De-syntheticized Protocol & Proof Gate QA Suite (11 tests)
node "07_QUALITY_ASSURANCE/test_ez_r_desyntheticized_protocol_and_proof_gate_qa.js"

# 6. Chạy kiểm thử EZ-Q UX Protocol QA Suite (11 tests)
node "07_QUALITY_ASSURANCE/test_ez_q_ux_protocol_and_source_rubric_qa.js"

# 7. Chạy kiểm thử EZ-P Supply Board & Report Audit QA Suite (14 tests)
node "07_QUALITY_ASSURANCE/test_ez_p_supply_board_and_report_audit_qa.js"

# 8. Chạy kiểm thử EZ-O Controlled Intake & Release Gate QA Suite (12 tests)
node "07_QUALITY_ASSURANCE/test_ez_o_controlled_intake_and_release_gate_qa.js"

# 9. Chạy kiểm thử EZ-N P0 Containment Browser QA Suite (24 tests)
node "07_QUALITY_ASSURANCE/test_ez_n_p0_containment_browser_qa.js"

# 10. Chạy kiểm thử EZ-M Identity Proof & A11y QA Suite (20 tests)
node "07_QUALITY_ASSURANCE/test_ez_m_identity_proof_and_a11y_qa.js"

# 11. Chạy kiểm thử EZ-K Evidence Contract v3 & Entailment QA Suite (14 tests)
node "07_QUALITY_ASSURANCE/test_evidence_contract_v3_and_entailment_ez_k.js"

# 12. Chạy kiểm thử EZ-J Document Provenance & Quarantine QA Suite (28 tests)
node "07_QUALITY_ASSURANCE/test_document_provenance_and_quarantine_ez_j.js"

# 13. Chạy kiểm thử EZ-H T2 Pilot E2E Browser Suite trên 3 Viewport (30 tests)
node "07_QUALITY_ASSURANCE/test_ez_h_t2_pilot_e2e.js"

# 14. Chạy kiểm thử đơn vị Bảng tính Local-First (10 tests)
node "07_QUALITY_ASSURANCE/test_calculator_unit_ez.js"

# 15. Mở trình duyệt kiểm tra trực tiếp Staging Server
Start-Process "http://127.0.0.1:4173/"
```

---

### VI. CAM KẾT VẬN HÀNH & KÍNH TRÌNH CEO

1. **Khóa Phát hành Production:** Production tiếp tục được khóa tại `v3.419.0`, `P0_EQ` tiếp tục ở trạng thái `OPEN`.
2. **Đóng Hoàn toàn Nhánh Khảo sát Địa điểm Lịch sử:** Không tốn tài nguyên đào bới văn bản hành chính cũ, bảo toàn ranh giới dữ liệu.
3. **Tập Trung 100% Vào Giá Trị Tiết Kiệm & Voucher:** `T1 Voucher Verified = 0`, `Public T2 Documentation = 1`, `External Links in Public DOM = 1`, `New Public Cards = 0`, `Affiliate Activation = false`.
4. **Kính trình CEO trực tiếp kiểm định độc lập toàn bộ hồ sơ EZ-V, bản đồ cơ hội thương mại JTBD, pipeline bằng chứng voucher và trải nghiệm Savings Lab trên browser trước khi đưa ra quyết định tiếp theo.**