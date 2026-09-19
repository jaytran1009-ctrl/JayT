# HỒ SƠ HỘI ĐỒNG LIÊN BỘ — JAYT SECTION EZ-AC
## CÁCH LY QUAN HỆ FOOTER SUY DIỄN & THỰC HIỆN LINKED-TERMS CAPTURE CHÍNH XÁC

**Mã hồ sơ:** `COUNCIL_REVIEW_PACK_EZ_AC_LINKED_TERMS_PILOT_20260831`  
**Phiên bản Staging SOT:** `v3.480.0-staging.ez`  
**Chỉ thị chỉ đạo:** JAYT-245 Mục EZ-AC (Dòng 4709–4739)  
**Địa chỉ Staging hoạt động:** `http://127.0.0.1:4173/`  
**Endpoint Sức khỏe Hệ thống (Health Check):** `http://127.0.0.1:4173/health` (`HTTP 200 OK`, `status: "UP"`, `version: "v3.480.0-staging.ez"`, `parity: "PERFECT_MATCH_ZERO_DRIFT"`)  
**HTTP Status:** `200 OK` (Content-Type: `text/html; charset=utf-8`)  
**Thời gian lập hồ sơ:** 2026-08-31T15:18:00+07:00  
**Trạng thái Quản trị:** `LINKED_TERMS_INTERNAL_EVALUATION` (Production khóa `v3.419.0`, P0_EQ mở, T1/Voucher public = 0, Affiliate activation = 0, Public T2 Docs Pilot = 1, External Links DOM = 1, New Public Cards = 0, Historical Location Branch = CLOSED)

---

### I. KẾT QUẢ CÁCH LY SUY DIỄN FOOTER LINK TRONG EZ-AA (MANDATE EZ-AC.1)

1. **Báo Cáo Cách Ly:**
   - Ban hành [`QUARANTINED_INDIRECT_FOOTER_LINK_NOT_DOCUMENT_RELATION_EZ_AC.json`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/06_TRUST_AND_EVIDENCE/QUARANTINED_INDIRECT_FOOTER_LINK_NOT_DOCUMENT_RELATION_EZ_AC.json).
   - **Lý do cách ly:** Liên kết được báo cáo trong EZ-AA là liên kết footer chung `/vn-vi/legal/`, không trỏ trực tiếp tới `/vn-vi/legal/end-user-agreement/`. Liên kết gián tiếp không chứng minh quan hệ vận hành trực tiếp giữa 2 tài liệu.
2. **Bảo Toàn Raw Binaries:**
   - Doc A (`candidate_ez_aa_doc_a_...` - `209,220 B`, SHA: `81fecb62...`) và Doc B (`candidate_ez_aa_doc_b_...` - `213,153 B`, SHA: `1e2ee74d...`) được giữ nguyên trong vault với trạng thái quan sát thuần raw:
     - Doc A: `LEGAL_PARTY_STATEMENT_OBSERVED_FOR_DOC_A_ONLY`
     - Doc B: `LISTED_PRICE_AND_ELIGIBILITY_OBSERVED_FOR_DOC_B_ONLY`

---

### II. THÔNG SỐ LINKED-TERMS CAPTURE DUY NHẤT (MANDATE EZ-AC.3)

| Thuộc tính Đối soát | Tài liệu Gốc (Doc B - Student Page) | Tài liệu Liên kết Trực tiếp (Doc C - Linked Terms) |
| :--- | :--- | :--- |
| **URL Khảo sát** | `https://www.spotify.com/vn-vi/student/` | `https://www.spotify.com/legal/premium-promotional-offer-terms` |
| **Vị trí Direct Hyperlink trên Doc B** | Byte offset: `138043 -> 138111` | `href="https://www.spotify.com/legal/premium-promotional-offer-terms"` |
| **Độ Khớp URL Graph (`url_graph_verified`)** | `Target URL Doc B href === Captured Request URL Doc C` | **EXACT MATCH (100% Khớp URL Đích)** ✅ |
| **HTTP Status / Content-Type** | `200 OK` / `text/html; charset=utf-8` | `200 OK` / `text/html; charset=utf-8` |
| **Dung lượng Raw Binary** | `213,153 B` | `224,281 B` |
| **Mã băm SHA-256 Verbatim** | `1e2ee74dfd5799e55a7fa1847693cea0e206b591c873041c50887dbff7e66118` | `090fab48caea184351d6c34722431055154f57fdf00626cb22a515d5e874e2d1` |
| **File Lưu trữ Vault** | [`candidate_ez_aa_doc_b_program_policy_raw_bytes.bin`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/06_TRUST_AND_EVIDENCE/evidence_vault_ez_aa/candidate_ez_aa_doc_b_program_policy_raw_bytes.bin) | [`candidate_ez_ac_doc_c_linked_promotional_terms_raw_bytes.bin`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/06_TRUST_AND_EVIDENCE/evidence_vault_ez_ac/candidate_ez_ac_doc_c_linked_promotional_terms_raw_bytes.bin) |

---

### III. MA TRẬN BẰNG CHỨNG HỢP ĐỒNG V3 ĐIỀU CHỈNH EZ-AC (MANDATE EZ-AC.3)

Ban hành [`EVIDENCE_CONTRACT_V3_LINKED_PROMOTIONAL_TERMS_EZ_AC.json`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/06_TRUST_AND_EVIDENCE/EVIDENCE_CONTRACT_V3_LINKED_PROMOTIONAL_TERMS_EZ_AC.json):

1. **Mệnh đề Phạm vi Điều khoản Khuyến mãi (Doc C - Byte 130521 -> 130772):**
   > *"Chào mừng bạn đến với Điều khoản ưu đãi khuyến mãi Spotify Premium. Trên trang này, bạn có thể tìm thấy và đọc các điều khoản và điều kiện áp dụng cho ưu đãi khuyến mãi mà bạn đã đăng ký."* (`promotional_terms_linked_proven: true`).
2. **Mệnh đề Giới hạn Ưu đãi 1 Lần (Doc C - Byte 137806 -> 137969):**
   > *"Người dùng đủ điều kiện có thể chấp nhận Ưu đãi khuyến mãi một lần - người dùng trước đó không thể đổi lại ưu đãi."*
3. **Mệnh đề Thời hạn & Bảo lưu (Doc C - Byte 138039 -> 138164):**
   > *"Ưu đãi khuyến mãi phải được chấp nhận trước ngày hết hạn áp dụng được quảng cáo, nếu có."*
4. **Kiểm tra Pháp nhân trong Thân Văn bản Doc C:**
   - `operator_entity_in_linked_terms_body_observed: "UNOBSERVED"` (`relation_to_legal_entity_proven: false`).
   - Không suy diễn từ copyright footer `© 2026 Spotify AB`.
5. **Các Mệnh đề Không Thấy (`UNOBSERVED`):**
   - Mã voucher, phạm vi địa phương Đà Nẵng, cơ chế xác thực sinh viên, tổng chi phí giỏ hàng: **`UNOBSERVED`**.
6. **Phán quyết Hội đồng:** **`HELD_INTERNAL_LINKED_PROMOTIONAL_TERMS_EVALUATED`** (`public_eligible: false`).
   - **Tuyệt đối không tạo card mới, không tạo CTA, không tạo link public, không tăng counter.**

---

### IV. TỔNG HỢP KIỂM THỬ TOÀN DIỆN (225/225 TESTS PASS 100%)

| Bộ kiểm thử | Số bài test | Kết quả |
| :--- | :---: | :---: |
| **EZ-AC Linked Terms & Graph QA Suite** | 11 | **11/11 PASS** ✅ |
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

### V. BỘ ARTIFACTS CỦA EZ-AC REVIEW PACK

- **Hồ sơ Hội đồng Liên bộ chính thức EZ-AC:** [`COUNCIL_REVIEW_PACK_EZ_AC_LINKED_TERMS_PILOT_20260831.md`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/01_EXECUTIVE_COUNCIL/COUNCIL_REVIEW_PACK_EZ_AC_LINKED_TERMS_PILOT_20260831.md)
- **Sổ bộ Cách ly Liên kết Footer:** [`QUARANTINED_INDIRECT_FOOTER_LINK_NOT_DOCUMENT_RELATION_EZ_AC.json`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/06_TRUST_AND_EVIDENCE/QUARANTINED_INDIRECT_FOOTER_LINK_NOT_DOCUMENT_RELATION_EZ_AC.json)
- **Hợp đồng Bằng chứng Linked Terms EZ-AC:** [`EVIDENCE_CONTRACT_V3_LINKED_PROMOTIONAL_TERMS_EZ_AC.json`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/06_TRUST_AND_EVIDENCE/EVIDENCE_CONTRACT_V3_LINKED_PROMOTIONAL_TERMS_EZ_AC.json)
- **Sổ bộ Đối soát Linked Terms EZ-AC:** [`LINKED_PROMOTIONAL_TERMS_LEDGER_EZ_AC.json`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/06_TRUST_AND_EVIDENCE/LINKED_PROMOTIONAL_TERMS_LEDGER_EZ_AC.json)
- **Raw Binary Doc C (Linked Terms):** [`candidate_ez_ac_doc_c_linked_promotional_terms_raw_bytes.bin`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/06_TRUST_AND_EVIDENCE/evidence_vault_ez_ac/candidate_ez_ac_doc_c_linked_promotional_terms_raw_bytes.bin)
- **Manifest Đồng nhất Phiên bản Parity:** [`JAYT_VERSION_PARITY_MANIFEST_EZ_AC.json`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/00_PROGRAM_BASELINE/JAYT_VERSION_PARITY_MANIFEST_EZ_AC.json)
- **Biên nhận Phát hành Release Receipt EZ-AC:** [`JAYT_RELEASE_RECEIPT_EZ_AC.json`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/00_PROGRAM_BASELINE/JAYT_RELEASE_RECEIPT_EZ_AC.json)
- **Script Kiểm thử EZ-AC Linked Terms QA:** [`test_ez_ac_linked_terms_and_graph_qa.js`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/test_ez_ac_linked_terms_and_graph_qa.js)

---

### VI. LỆNH TÁI LẬP KIỂM ĐỊNH ĐỘC LẬP CHO CEO

Kính mời CEO thực thi độc lập các lệnh sau trên terminal để tái lập toàn bộ kiểm thử:

```powershell
# 1. Kiểm tra sức khỏe Staging Server & Parity Manifest
Invoke-RestMethod -Uri http://127.0.0.1:4173/health

# 2. Chạy kiểm thử EZ-AC Linked Terms QA Suite (11 tests)
node "07_QUALITY_ASSURANCE/test_ez_ac_linked_terms_and_graph_qa.js"

# 3. Chạy kiểm thử EZ-Z Corrected Pilot Zero QA Suite (9 tests)
node "07_QUALITY_ASSURANCE/test_ez_z_corrected_pilot_zero_qa.js"

# 4. Chạy kiểm thử EZ-W Pure JTBD & Ban-List QA Suite (10 tests)
node "07_QUALITY_ASSURANCE/test_ez_w_pure_jtbd_and_banlist_qa.js"

# 5. Chạy kiểm thử EZ-T Document Discovery & Contract v3 QA Suite (10 tests)
node "07_QUALITY_ASSURANCE/test_ez_t_document_discovery_qa.js"

# 6. Chạy kiểm thử EZ-S Proof Gate Cleanup & Schema QA Suite (10 tests)
node "07_QUALITY_ASSURANCE/test_ez_s_proof_gate_cleanup_and_schema_qa.js"

# 7. Chạy kiểm thử EZ-R De-syntheticized Protocol & Proof Gate QA Suite (11 tests)
node "07_QUALITY_ASSURANCE/test_ez_r_desyntheticized_protocol_and_proof_gate_qa.js"

# 8. Chạy kiểm thử EZ-Q UX Protocol QA Suite (11 tests)
node "07_QUALITY_ASSURANCE/test_ez_q_ux_protocol_and_source_rubric_qa.js"

# 9. Chạy kiểm thử EZ-P Supply Board & Report Audit QA Suite (14 tests)
node "07_QUALITY_ASSURANCE/test_ez_p_supply_board_and_report_audit_qa.js"

# 10. Chạy kiểm thử EZ-O Controlled Intake & Release Gate QA Suite (12 tests)
node "07_QUALITY_ASSURANCE/test_ez_o_controlled_intake_and_release_gate_qa.js"

# 11. Chạy kiểm thử EZ-N P0 Containment Browser QA Suite (24 tests)
node "07_QUALITY_ASSURANCE/test_ez_n_p0_containment_browser_qa.js"

# 12. Chạy kiểm thử EZ-M Identity Proof & A11y QA Suite (20 tests)
node "07_QUALITY_ASSURANCE/test_ez_m_identity_proof_and_a11y_qa.js"

# 13. Chạy kiểm thử EZ-K Evidence Contract v3 & Entailment QA Suite (14 tests)
node "07_QUALITY_ASSURANCE/test_evidence_contract_v3_and_entailment_ez_k.js"

# 14. Chạy kiểm thử EZ-J Document Provenance & Quarantine QA Suite (28 tests)
node "07_QUALITY_ASSURANCE/test_document_provenance_and_quarantine_ez_j.js"

# 15. Chạy kiểm thử EZ-H T2 Pilot E2E Browser Suite trên 3 Viewport (30 tests)
node "07_QUALITY_ASSURANCE/test_ez_h_t2_pilot_e2e.js"

# 16. Chạy kiểm thử đơn vị Bảng tính Local-First (10 tests)
node "07_QUALITY_ASSURANCE/test_calculator_unit_ez.js"

# 17. Mở trình duyệt kiểm tra trực tiếp Staging Server
Start-Process "http://127.0.0.1:4173/"
```

---

### VII. CAM KẾT VẬN HÀNH & KÍNH TRÌNH CEO

1. **Khóa Phát hành Production:** Production tiếp tục được khóa tại `v3.419.0`, `P0_EQ` tiếp tục ở trạng thái `OPEN`.
2. **Kỷ luật URL Graph Chính Xác:** Liên kết trực tiếp giữa Doc B và Doc C đã được đối soát 100% không qua footer link; không suy diễn pháp nhân từ copyright; phân loại đúng `HELD_INTERNAL_LINKED_PROMOTIONAL_TERMS_EVALUATED`.
3. **Kính trình CEO trực tiếp kiểm định độc lập toàn bộ hồ sơ EZ-AC, 3 file raw bytes, và evidence contract trước khi đưa ra phán quyết tiếp theo trong JAYT-245.**
