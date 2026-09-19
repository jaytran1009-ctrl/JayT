# HỒ SƠ HỘI ĐỒNG LIÊN BỘ — JAYT SECTION EZ-AD
## THỰC THI BATCH FAST LANE 5 ỨNG VIÊN ĐA NGUỒN (24H TIME-BOX) & NÂNG CẤP SAVINGS LAB V2

**Mã hồ sơ:** `COUNCIL_REVIEW_PACK_EZ_AD_BATCH_FAST_LANE_AND_SAVINGS_LAB_V2_20260831`  
**Phiên bản Staging SOT:** `v3.480.0-staging.ez`  
**Chỉ thị chỉ đạo:** JAYT-245 Mục EZ-AD (Dòng 4741–4768)  
**Địa chỉ Staging hoạt động:** `http://127.0.0.1:4173/`  
**Endpoint Sức khỏe Hệ thống (Health Check):** `http://127.0.0.1:4173/health` (`HTTP 200 OK`, `status: "UP"`, `version: "v3.480.0-staging.ez"`, `parity: "PERFECT_MATCH_ZERO_DRIFT"`)  
**HTTP Status:** `200 OK` (Content-Type: `text/html; charset=utf-8`)  
**Thời gian lập hồ sơ:** 2026-08-31T15:22:00+07:00  
**Trạng thái Quản trị:** `BATCH_FAST_LANE_EVALUATED_AND_SAVINGS_LAB_V2_ACTIVE` (Production khóa `v3.419.0`, P0_EQ mở, T1/Voucher public = 0, Affiliate activation = 0, Public T2 Docs Pilot = 1, External Links DOM = 1, New Public Cards = 0, Historical Location Branch = CLOSED)

---

### I. SỔ BỘ BATCH FAST LANE 5 ỨNG VIÊN ĐA NGUỒN (MANDATES EZ-AD.1 - EZ-AD.4)

Ban hành [`BATCH_FAST_LANE_5_CANDIDATES_SLA_LEDGER_EZ_AD.json`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/06_TRUST_AND_EVIDENCE/BATCH_FAST_LANE_5_CANDIDATES_SLA_LEDGER_EZ_AD.json):

| Mã Ứng Viên | Nhóm JTBD | Nguồn Khảo Sát | File Raw Vault | Phán Quyết Sau 24h |
| :--- | :--- | :--- | :--- | :--- |
| **`FAST_LANE_01_NOTION`** | `OFFICIAL_PROGRAM_DOCUMENTATION` | `https://www.notion.so/product/notion-for-education` | `evidence_vault_ez_j/candidate_ez_j_01_...` | **`T4_SOURCE_TO_WATCH`** (HELD_INTERNAL) |
| **`FAST_LANE_02_SPOTIFY`** | `OFFICIAL_PROMOTION_OFFER` | `https://www.spotify.com/vn-vi/student/` | `evidence_vault_ez_ac/candidate_ez_ac_doc_c_...` | **`HELD_INTERNAL`** (Chuỗi đã đóng) |
| **`FAST_LANE_03_LIBRARY`** | `PUBLIC_LOCATION_UTILITY` | `http://thuvien.danang.gov.vn/ReadNews/1408` | `evidence_vault_ez_t/candidate_ez_t_01_...` | **`T4_SOURCE_TO_WATCH`** (HELD_INTERNAL) |
| **`FAST_LANE_04_RAILWAY`** | `TRANSIT_MOBILITY_UTILITY` | `https://dsvn.vn/` | `evidence_vault_ez_m/intake_07_vn_railway_...` | **`T4_SOURCE_TO_WATCH`** (HELD_INTERNAL) |
| **`FAST_LANE_05_VNPOST`** | `ESSENTIAL_STUDENT_LOGISTICS` | `https://vietnampost.vn/` | `evidence_vault_ez_m/intake_08_vietnam_post_...` | **`T4_SOURCE_TO_WATCH`** (HELD_INTERNAL) |

- **Quy tắc Fast Lane:** Đúng 5 ứng viên được mở đồng thời; 0 mở ứng viên thứ 6 trước khi có phán quyết; 0 chuyển T4/HELD thành deal công khai.

---

### II. NÂNG CẤP TOÀN DIỆN SAVINGS LAB V2 TRÊN STAGING (MANDATE EZ-AD.5)

Đã hoàn thiện và triển khai **Savings Lab v2** trực tiếp trên Staging DOM:
1. **Lựa chọn Chế độ Nhu cầu (Empty Presets):**
   - Nút `👤 Mua Sắm Cá Nhân (Solo)` (`aria-pressed="true"` mặc định, số người = 1).
   - Nút `👥 Mua Sắm / Đi Lại Nhóm (Group Split)` (khi click tự động focus và chuyển số người thành 2+).
2. **Hiển Thị Phép Tính Từng Thành Phần (Component Formula Breakdown):**
   - Hiển thị trực quan: `[Giá niêm yết: X] + [Ship: Y] - [Giảm trực tiếp: Z] - [Voucher: W] = [Tổng thực trả: T VNĐ]`.
3. **Kiểm Soát Nhập Liệu & Ngăn Chặn Số Âm:**
   - Hàm `calculateSavingsMath()` tự động ép cận dưới 0 đối với các giá trị nhập, ngăn chặn triệt để các kết quả âm vô lý.
4. **Hỗ Trợ Toàn Diện Bàn Phím & Trợ Năng (A11y):**
   - Hỗ trợ phím `Enter` và `Tab` trên toàn bộ ô nhập liệu; cấu trúc nhãn `label for`, `aria-describedby`, `aria-live="polite"`.
5. **Kỷ Luật Không Dữ Liệu Mẫu / Không Tracking:**
   - 100% người dùng tự nhập; 0 prefill giá, 0 mã giảm giá mẫu, 0 cookie/localStorage tracking, 0 kết luận "Mua/Chờ".

---

### III. TỔNG HỢP KIỂM THỬ TOÀN DIỆN (225/225 TESTS PASS 100%)

| Bộ kiểm thử | Số bài test | Kết quả |
| :--- | :---: | :---: |
| **EZ-AD Batch Fast Lane & Savings Lab v2 QA Suite** | 12 | **12/12 PASS** ✅ |
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
| **Tổng cộng** | **225** | **225/225 PASS (100%)** ✅ |

---

### IV. BỘ ARTIFACTS CỦA EZ-AD REVIEW PACK

- **Hồ sơ Hội đồng Liên bộ chính thức EZ-AD:** [`COUNCIL_REVIEW_PACK_EZ_AD_BATCH_FAST_LANE_AND_SAVINGS_LAB_V2_20260831.md`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/01_EXECUTIVE_COUNCIL/COUNCIL_REVIEW_PACK_EZ_AD_BATCH_FAST_LANE_AND_SAVINGS_LAB_V2_20260831.md)
- **Sổ bộ 5 Ứng viên Fast Lane SLA:** [`BATCH_FAST_LANE_5_CANDIDATES_SLA_LEDGER_EZ_AD.json`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/06_TRUST_AND_EVIDENCE/BATCH_FAST_LANE_5_CANDIDATES_SLA_LEDGER_EZ_AD.json)
- **Mã nguồn JavaScript Storefront Staging (SOT):** [`jayt_storefront_staging_ey.js`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/03_SOURCE_OF_TRUTH/jayt_storefront_staging_ey.js)
- **Manifest Đồng nhất Phiên bản Parity:** [`JAYT_VERSION_PARITY_MANIFEST_EZ_AD.json`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/00_PROGRAM_BASELINE/JAYT_VERSION_PARITY_MANIFEST_EZ_AD.json)
- **Biên nhận Phát hành Release Receipt EZ-AD:** [`JAYT_RELEASE_RECEIPT_EZ_AD.json`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/00_PROGRAM_BASELINE/JAYT_RELEASE_RECEIPT_EZ_AD.json)
- **Script Kiểm thử EZ-AD Batch Fast Lane & Savings Lab v2 QA:** [`test_ez_ad_batch_fast_lane_and_savings_lab_v2_qa.js`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/test_ez_ad_batch_fast_lane_and_savings_lab_v2_qa.js)

---

### V. LỆNH TÁI LẬP KIỂM ĐỊNH ĐỘC LẬP CHO CEO

Kính mời CEO thực thi độc lập các lệnh sau trên terminal để tái lập toàn bộ kiểm thử:

```powershell
# 1. Kiểm tra sức khỏe Staging Server & Parity Manifest
Invoke-RestMethod -Uri http://127.0.0.1:4173/health

# 2. Chạy kiểm thử EZ-AD Batch Fast Lane & Savings Lab v2 QA Suite (12 tests)
node "07_QUALITY_ASSURANCE/test_ez_ad_batch_fast_lane_and_savings_lab_v2_qa.js"

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

### VI. CAM KẾT VẬN HÀNH & KÍNH TRÌNH CEO

1. **Khóa Phát hành Production:** Production tiếp tục được khóa tại `v3.419.0`, `P0_EQ` tiếp tục ở trạng thái `OPEN`.
2. **Kỷ luật Fast Lane & Savings Lab v2:** Đã đánh giá đúng 5 ứng viên đa nguồn với 5 phán quyết minh bạch trong sổ bộ 24h; nâng cấp hoàn thiện Savings Lab v2 local-first; giữ nguyên 0 card public mới.
3. **Kính trình CEO trực tiếp kiểm định độc lập toàn bộ hồ sơ EZ-AD, sổ bộ Fast Lane, và giao diện Savings Lab v2 trên staging trước khi đưa ra phán quyết tiếp theo trong JAYT-245.**
