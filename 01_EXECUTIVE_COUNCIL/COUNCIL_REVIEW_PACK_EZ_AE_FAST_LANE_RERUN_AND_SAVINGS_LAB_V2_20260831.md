# HỒ SƠ HỘI ĐỒNG LIÊN BỘ — JAYT SECTION EZ-AE
## CÁCH LY BATCH CŨ, MỞ LẠI FAST LANE 2 CANDIDATE MỚI VÀ NGHIỆM THU SAVINGS LAB V2 TRÊN STAGING VERSION MỚI

**Mã hồ sơ:** `COUNCIL_REVIEW_PACK_EZ_AE_FAST_LANE_RERUN_AND_SAVINGS_LAB_V2_20260831`  
**Phiên bản Staging SOT:** `v3.481.0-staging.ez`  
**Chỉ thị chỉ đạo:** JAYT-245 Mục EZ-AE (Dòng 4770–4798)  
**Địa chỉ Staging hoạt động:** `http://127.0.0.1:4173/`  
**Endpoint Sức khỏe Hệ thống (Health Check):** `http://127.0.0.1:4173/health` (`HTTP 200 OK`, `status: "UP"`, `version: "v3.481.0-staging.ez"`, `parity: "PERFECT_MATCH_ZERO_DRIFT"`, `changelog: "Savings Lab v2 Local-First..."`)  
**HTTP Status:** `200 OK` (Content-Type: `text/html; charset=utf-8`)  
**Thời gian lập hồ sơ:** 2026-08-31T15:28:00+07:00  
**Trạng thái Quản trị:** `FAST_LANE_RERUN_OPEN_AND_SAVINGS_LAB_V2_BROWSER_REVIEWED` (Production khóa `v3.419.0`, P0_EQ mở, T1/Voucher public = 0, Affiliate activation = 0, Public T2 Docs Pilot = 1, External Links DOM = 1, New Public Cards = 0, Historical Location Branch = CLOSED)

---

### I. KẾT QUẢ CÁCH LY BATCH CŨ & SỬA LỖI SLA PREMATURE (MANDATE EZ-AE.1)

1. **Báo Cáo Cách Ly:**
   - Ban hành [`QUARANTINED_REUSED_RAW_AND_PREMATURE_SLA_VERDICTS_EZ_AE.json`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/06_TRUST_AND_EVIDENCE/QUARANTINED_REUSED_RAW_AND_PREMATURE_SLA_VERDICTS_EZ_AE.json).
   - **Lý do cách ly:** Batch EZ-AD đã tái sử dụng các file raw từ các mốc cũ và chốt phán quyết trước khi hạn 24h kết thúc. Đó là hành vi backfill không đạt tiêu chuẩn Fast Lane.
2. **Trạng Thái Các Ứng Viên Cũ:**
   - Spotify: `HELD_INTERNAL_CHAIN_FORMALLY_CLOSED`
   - Notion: `HELD_INTERNAL_DESCRIPTIVE_ONLY`
   - Thư viện Đà Nẵng: `HELD_INTERNAL_HISTORICAL_ARCHIVE_ONLY`
   - Đường sắt & Bưu điện: `HELD_INTERNAL_INTAKE_QUEUE`
   - Toàn bộ giữ nguyên trạng thái cũ, không được tính vào batch Fast Lane mới và không đưa vào public.

---

### II. MỞ LẠI FAST LANE BATCH 2 ỨNG VIÊN MỚI HOÀN TOÀN (MANDATE EZ-AE.3)

Ban hành [`FAST_LANE_BATCH_PILOT_2_CANDIDATES_SLA_LEDGER_EZ_AE.json`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/06_TRUST_AND_EVIDENCE/FAST_LANE_BATCH_PILOT_2_CANDIDATES_SLA_LEDGER_EZ_AE.json):

| Mã Ứng Viên | Nhóm JTBD | Nguồn Khảo Sát | Thời điểm Capture | Dung lượng & SHA-256 | Trạng Thái SLA 24h |
| :--- | :--- | :--- | :---: | :--- | :---: |
| **`FAST_LANE_RERUN_01`** | `DEVELOPER_EDUCATION_PROGRAM` | `https://www.jetbrains.com/community/education/#students` | 2026-08-31T08:28:15Z | `494,398 B`<br>`355d9e1e6d07125c0dfedda229b1880a...` | **`OPEN_EVALUATING`** (Hạn: 2026-09-01T08:28:00Z) |
| **`FAST_LANE_RERUN_02`** | `DESIGN_EDUCATION_PROGRAM` | `https://www.figma.com/education/` | 2026-08-31T08:28:18Z | `1,658,429 B`<br>`090801961331bd51a6ca07ee0b16527a...` | **`OPEN_EVALUATING`** (Hạn: 2026-09-01T08:28:00Z) |

- **Kỷ Luật SLA 24h:** Cả 2 ứng viên được capture thành công **sau** thời điểm mở SLA (`sla_open_utc = 2026-08-31T08:28:00Z`), có raw binary mới trong `evidence_vault_ez_ae/`, hash mới và đang ở trạng thái `OPEN_EVALUATING`. Phán quyết sớm chỉ được kích hoạt nếu có đủ core fields hoặc P0 failure; nếu không, phán quyết chỉ được ghi khi hết hạn SLA.

---

### III. NGHIỆM THU TRÌNH DUYỆT SAVINGS LAB V2 TRÊN VERSION MỚI (MANDATE EZ-AE.4)

Đã nâng cấp version Staging lên **`v3.481.0-staging.ez`** và thực hiện kiểm định tương tác trực tiếp qua Puppeteer Browser Suite:
1. **Kiểm thử Presets Nhu Cầu (Solo vs Group):**
   - Chế độ Solo: `aria-pressed="true"` mặc định, số người = 1.
   - Chế độ Group: Chuyển số người sang 2+ và tự động tính toán lại mức chia tiền người/người.
2. **Hiển thị Phép Tính Từng Thành Phần (Formula Breakdown):**
   - Cập nhật thời gian thực: `[Giá niêm yết: X] + [Ship: Y] - [Giảm trực tiếp: Z] - [Voucher: W] = [Tổng thực trả: T VNĐ]`.
3. **Kiểm Soát Nhập Liệu & Ngăn Số Âm:**
   - Tự động ép cận dưới 0 đối với các giá trị nhập, ngăn chặn triệt để các kết quả âm vô lý.
4. **Kiểm thử Phím Bấm & Screen Reader (A11y):**
   - Hỗ trợ phím `Enter` trên các ô nhập, nút `🔄 Đặt lại giá trị` trả về mặc định, `aria-live="polite"` thông báo kết quả.
5. **Responsive trên 3 Viewport:**
   - Hoạt động mượt mà trên Desktop (1440x900), Tablet (768x1024) và Mobile (390x844).

---

### IV. TỔNG HỢP KIỂM THỬ TOÀN DIỆN (234/234 TESTS PASS 100%)

| Bộ kiểm thử | Số bài test | Kết quả |
| :--- | :---: | :---: |
| **EZ-AE Fast Lane Rerun & Savings Lab v2 QA Suite** | 11 | **11/11 PASS** ✅ |
| **EZ-AC Linked Terms & Graph QA Suite** | 10 | **10/10 PASS** ✅ |
| **EZ-Z Corrected Pilot Zero QA Suite** | 9 | **9/9 PASS** ✅ |
| **EZ-W Pure JTBD & Ban-List QA Suite** | 10 | **10/10 PASS** ✅ |
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
| **Tổng cộng** | **234** | **234/234 PASS (100%)** ✅ |

---

### V. BỘ ARTIFACTS CỦA EZ-AE REVIEW PACK

- **Hồ sơ Hội đồng Liên bộ chính thức EZ-AE:** [`COUNCIL_REVIEW_PACK_EZ_AE_FAST_LANE_RERUN_AND_SAVINGS_LAB_V2_20260831.md`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/01_EXECUTIVE_COUNCIL/COUNCIL_REVIEW_PACK_EZ_AE_FAST_LANE_RERUN_AND_SAVINGS_LAB_V2_20260831.md)
- **Sổ bộ Cách ly Batch EZ-AD:** [`QUARANTINED_REUSED_RAW_AND_PREMATURE_SLA_VERDICTS_EZ_AE.json`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/06_TRUST_AND_EVIDENCE/QUARANTINED_REUSED_RAW_AND_PREMATURE_SLA_VERDICTS_EZ_AE.json)
- **Sổ bộ 2 Ứng viên Fast Lane Rerun SLA:** [`FAST_LANE_BATCH_PILOT_2_CANDIDATES_SLA_LEDGER_EZ_AE.json`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/06_TRUST_AND_EVIDENCE/FAST_LANE_BATCH_PILOT_2_CANDIDATES_SLA_LEDGER_EZ_AE.json)
- **Mã nguồn JavaScript Storefront Staging (SOT):** [`jayt_storefront_staging_ey.js`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/03_SOURCE_OF_TRUTH/jayt_storefront_staging_ey.js)
- **Raw Binary Ứng viên 1 (JetBrains):** [`candidate_ez_ae_01_jetbrains_student_raw_bytes.bin`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/06_TRUST_AND_EVIDENCE/evidence_vault_ez_ae/candidate_ez_ae_01_jetbrains_student_raw_bytes.bin)
- **Raw Binary Ứng viên 2 (Figma):** [`candidate_ez_ae_02_figma_education_raw_bytes.bin`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/06_TRUST_AND_EVIDENCE/evidence_vault_ez_ae/candidate_ez_ae_02_figma_education_raw_bytes.bin)
- **Manifest Đồng nhất Phiên bản Parity:** [`JAYT_VERSION_PARITY_MANIFEST_EZ_AE.json`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/00_PROGRAM_BASELINE/JAYT_VERSION_PARITY_MANIFEST_EZ_AE.json)
- **Biên nhận Phát hành Release Receipt EZ-AE:** [`JAYT_RELEASE_RECEIPT_EZ_AE.json`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/00_PROGRAM_BASELINE/JAYT_RELEASE_RECEIPT_EZ_AE.json)
- **Script Kiểm thử EZ-AE Fast Lane Rerun & Savings Lab v2 QA:** [`test_ez_ae_fast_lane_rerun_and_savings_lab_v2_qa.js`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/test_ez_ae_fast_lane_rerun_and_savings_lab_v2_qa.js)

---

### VI. LỆNH TÁI LẬP KIỂM ĐỊNH ĐỘC LẬP CHO CEO

Kính mời CEO thực thi độc lập các lệnh sau trên terminal để tái lập toàn bộ kiểm thử:

```powershell
# 1. Kiểm tra sức khỏe Staging Server & Parity Manifest (Version v3.481.0-staging.ez)
Invoke-RestMethod -Uri http://127.0.0.1:4173/health

# 2. Chạy kiểm thử EZ-AE Fast Lane Rerun & Savings Lab v2 QA Suite (11 tests)
node "07_QUALITY_ASSURANCE/test_ez_ae_fast_lane_rerun_and_savings_lab_v2_qa.js"

# 3. Chạy kiểm thử EZ-AC Linked Terms QA Suite (10 tests)
node "07_QUALITY_ASSURANCE/test_ez_ac_linked_terms_and_graph_qa.js"

# 4. Chạy kiểm thử EZ-Z Corrected Pilot Zero QA Suite (9 tests)
node "07_QUALITY_ASSURANCE/test_ez_z_corrected_pilot_zero_qa.js"

# 5. Chạy kiểm thử EZ-W Pure JTBD & Ban-List QA Suite (10 tests)
node "07_QUALITY_ASSURANCE/test_ez_w_pure_jtbd_and_banlist_qa.js"

# 6. Chạy kiểm thử EZ-T Document Discovery & Contract v3 QA Suite (10 tests)
node "07_QUALITY_ASSURANCE/test_ez_t_document_discovery_qa.js"

# 7. Chạy kiểm thử EZ-S Proof Gate Cleanup & Schema QA Suite (10 tests)
node "07_QUALITY_ASSURANCE/test_ez_s_proof_gate_cleanup_and_schema_qa.js"

# 8. Chạy kiểm thử EZ-R De-syntheticized Protocol & Proof Gate QA Suite (11 tests)
node "07_QUALITY_ASSURANCE/test_ez_r_desyntheticized_protocol_and_proof_gate_qa.js"

# 9. Chạy kiểm thử EZ-Q UX Protocol QA Suite (11 tests)
node "07_QUALITY_ASSURANCE/test_ez_q_ux_protocol_and_source_rubric_qa.js"

# 10. Chạy kiểm thử EZ-P Supply Board & Report Audit QA Suite (14 tests)
node "07_QUALITY_ASSURANCE/test_ez_p_supply_board_and_report_audit_qa.js"

# 11. Chạy kiểm thử EZ-O Controlled Intake & Release Gate QA Suite (12 tests)
node "07_QUALITY_ASSURANCE/test_ez_o_controlled_intake_and_release_gate_qa.js"

# 12. Chạy kiểm thử EZ-N P0 Containment Browser QA Suite (24 tests)
node "07_QUALITY_ASSURANCE/test_ez_n_p0_containment_browser_qa.js"

# 13. Chạy kiểm thử EZ-M Identity Proof & A11y QA Suite (20 tests)
node "07_QUALITY_ASSURANCE/test_ez_m_identity_proof_and_a11y_qa.js"

# 14. Chạy kiểm thử EZ-K Evidence Contract v3 & Entailment QA Suite (14 tests)
node "07_QUALITY_ASSURANCE/test_evidence_contract_v3_and_entailment_ez_k.js"

# 15. Chạy kiểm thử EZ-J Document Provenance & Quarantine QA Suite (28 tests)
node "07_QUALITY_ASSURANCE/test_document_provenance_and_quarantine_ez_j.js"

# 16. Chạy kiểm thử EZ-H T2 Pilot E2E Browser Suite trên 3 Viewport (30 tests)
node "07_QUALITY_ASSURANCE/test_ez_h_t2_pilot_e2e.js"

# 17. Chạy kiểm thử đơn vị Bảng tính Local-First (10 tests)
node "07_QUALITY_ASSURANCE/test_calculator_unit_ez.js"

# 18. Mở trình duyệt kiểm tra trực tiếp Staging Server
Start-Process "http://127.0.0.1:4173/"
```

---

### VII. CAM KẾT VẬN HÀNH & KÍNH TRÌNH CEO

1. **Khóa Phát hành Production:** Production tiếp tục được khóa tại `v3.419.0`, `P0_EQ` tiếp tục ở trạng thái `OPEN`.
2. **Kỷ luật Fast Lane Rerun:** 2 candidate mới hoàn toàn đang mở đúng quy chuẩn SLA 24h (`OPEN_EVALUATING`); version Staging được nâng lên `v3.481.0-staging.ez` với changelog rõ ràng; giao diện Savings Lab v2 đã vượt qua toàn bộ browser interaction tests.
3. **Kính trình CEO trực tiếp kiểm định độc lập toàn bộ hồ sơ EZ-AE, 2 raw binaries mới, và trải nghiệm tương tác Savings Lab v2 trên staging trước khi đưa ra phán quyết tiếp theo trong JAYT-245.**
