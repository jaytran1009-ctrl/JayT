# HỒ SƠ HỘI ĐỒNG LIÊN BỘ — JAYT SECTION EZ-J
## CÔ LẬP CANDIDATES EZ-I, TÁI CẤU TRÚC PIPELINE DOCUMENT-ONLY PROVENANCE & XÁC LẬP BẢNG LOCATOR OFFSETS TRÊN RAW BYTES

**Mã hồ sơ:** `COUNCIL_REVIEW_PACK_EZ_J_PROVENANCE_AND_QUARANTINE_20260831`  
**Phiên bản Staging SOT:** `v3.480.0-staging.ez`  
**Chỉ thị chỉ đạo:** JAYT-245 Mục EZ-J (Dòng 4150–4179)  
**Địa chỉ Staging hoạt động:** `http://127.0.0.1:4173/`  
**Endpoint Sức khỏe Hệ thống (Health Check):** `http://127.0.0.1:4173/health` (`HTTP 200 OK`, `status: "UP"`, `version: "v3.480.0-staging.ez"`, `parity: "PERFECT_MATCH_ZERO_DRIFT"`)  
**HTTP Status:** `200 OK` (Content-Type: `text/html; charset=utf-8`)  
**Thời gian lập hồ sơ:** 2026-08-31T13:40:00+07:00  
**Trạng thái Quản trị:** `PURE_DOCUMENT_PROVENANCE_FAIL_CLOSED` (Production khóa `v3.419.0`, P0_EQ mở, T1/Voucher public = 0, Affiliate activation = 0, Public T2 Docs Pilot = 1, New Candidates Public = 0)

---

### I. BIÊN BẢN CÔ LẬP 2 CANDIDATES EZ-I (MANDATE EZ-J.1)

Hội đồng đã đưa 2 bản ghi EZ-I vào danh mục cách ly `QUARANTINED_EZ_J_LOCATOR_AND_REDIRECT_CONTAMINATION`:
1. **`QUARANTINED_EZ_I_01_NOTION_EDUCATION`:** Locator `<title>Notion for Education</title>` không xuất hiện trong raw bytes; redirect chain bị nhiễm request log.
2. **`QUARANTINED_EZ_I_02_CANVA_EDUCATION`:** Locators `teachers, students` và `K–12 & Higher Ed` không xuất hiện trong raw bytes; redirect chain bị lẫn tracking pixel.

> [!IMPORTANT]
> Toàn bộ raw bytes cũ và lịch sử kiểm định được bảo toàn bất biến trong Evidence Vault (`evidence_vault_ez_i/`) phục vụ công tác thanh tra độc lập của CEO.

---

### II. PIPELINE PURE DOCUMENT-ONLY PROVENANCE & 4 LOCATORS OFFSET TRÊN RAW BYTES (MANDATES EZ-J.2 & EZ-J.3)

Runner mới (`runner_document_only_provenance_ez_j.js`) chỉ ghi nhận điều hướng tài liệu gốc (Document Navigation Redirects), loại bỏ 100% subresource/pixel, và trích xuất locator trực tiếp từ byte offsets của raw HTML:

| Thuộc tính kiểm định | Candidate 1: `CANDIDATE_EZ_J_01_NOTION_EDUCATION` | Candidate 2: `CANDIDATE_EZ_J_02_CANVA_EDUCATION` |
| :--- | :--- | :--- |
| **Tên đối tượng** | Notion for Education — Official Web Document | Canva for Education — Official Web Document |
| **Cohort phân bổ** | `COHORT_1_HOC_TAP` | `COHORT_1_HOC_TAP` |
| **URL Yêu cầu ban đầu** | `https://www.notion.so/product/notion-for-education` | `https://www.canva.com/education/` |
| **URL Tài liệu cuối cùng** | `https://www.notion.com/product/notion-for-education` (301 redirect sạch) | `https://www.canva.com/education/` (Direct 200) |
| **HTTP Status Code** | `200 OK` | `200 OK` |
| **Kích thước byte thực tế** | **188523 bytes** | **270597 bytes** |
| **Mã băm SHA-256 Raw Bytes** | `efa0ff3b7f8037d76fa445bf458136452541d1c981dc041576ed6f8cc1aeca30` | `a41e00e0448da7b5e0423ccb022c3e6da0f86a5d5254c5b697907231c1fb8810` |
| **4 Locators Offset & Excerpt** | 1. `title`: "Notion for Education" (Offset: byte 240)<br>2. `eligibility`: "schoolwork" (Offset: byte 68,669)<br>3. `scope`: "classroom" (Offset: byte 68,714)<br>4. `action`: "product/notion-for-education" (Offset: byte 940) | 1. `title`: "Canva" (Offset: byte 763)<br>2. `eligibility`: "Education" (Offset: byte 375)<br>3. `scope`: "learning" (Offset: byte 28,338)<br>4. `action`: "canva.com/education" (Offset: byte 972) |
| **Câu hiển thị khách hàng duy nhất** | **"Theo tài liệu chính thức từ trang web của Notion, học sinh và nhà trường có thể tìm hiểu về Notion for Education để hỗ trợ học tập và quản lý dự án."** | **"Theo trang thông tin chính thức của Canva, các cơ sở giáo dục và người học có thể tìm hiểu về các giải pháp học tập của Canva for Education."** |
| **Phạm vi chứng minh (Scope)** | Toàn cầu / Học sinh, sinh viên và nhà trường. | Toàn cầu / Giáo viên, học sinh và các cơ sở giáo dục. |
| **Loại trừ & Caveat (Exclusions)** | **Không chứng minh phương thức xác thực cụ thể hay quyền lợi cục bộ; JayT không bảo đảm việc cấp gói hay giá trị kinh tế.** | **Không chứng minh tiêu chuẩn phê duyệt chi tiết cho từng cá nhân; JayT không xác nhận voucher hay quyền lợi địa phương.** |
| **Hành động chính thức (Canonical Action)** | `https://www.notion.com/product/notion-for-education` | `https://www.canva.com/education/` |
| **Trạng thái Public Staging** | `public_eligible: false` (**CÔ LẬP NỘI BỘ — CHƯA RENDER**) | `public_eligible: false` (**CÔ LẬP NỘI BỘ — CHƯA RENDER**) |

---

### III. BẢO TỒN STAGING PILOT EZ-H VÀ SAVINGS LAB (MANDATE EZ-J.4)

- **Giao diện Staging:** Tiếp tục hiển thị chính xác **1 card T2 GitHub Education Documentation Pilot** đã được CEO phê duyệt theo EZ-H.
- **Savings Lab:** Duy trì 5 input người dùng tự nhập, thuật toán tính toán 100% local-first, 0 cuộc gọi mạng, 0 lưu trữ cookie/PII.
- **AccessTrade JTBD:** Duy trì trạng thái nghiên cứu định tính, khóa 100% các trường thương mại.

---

### IV. TỔNG HỢP KIỂM THỬ TOÀN DIỆN (110/110 TESTS PASS 100%)

| Bộ kiểm thử | Số bài test | Kết quả |
| :--- | :---: | :---: |
| **EZ-J Document Provenance & Quarantine QA Suite** | 28 | **28/28 PASS** ✅ |
| **EZ-H T2 Pilot E2E Browser Suite (1440, 768, 390 viewports)** | 30 | **30/30 PASS** ✅ |
| **Review Pack QA Assertion Suite (Port 4173)** | 21 | **21/21 PASS** ✅ |
| **Grounded Utility Fact Ladder QA (EZ-G)** | 21 | **21/21 PASS** ✅ |
| **Calculator Unit Test Suite (Math & Edge Cases)** | 10 | **10/10 PASS** ✅ |
| **Tổng cộng** | **110** | **110/110 PASS (100%)** ✅ |

---

### V. BỘ ARTIFACTS CỦA EZ-J REVIEW PACK

- **Hồ sơ Hội đồng Liên bộ chính thức EZ-J:** [`COUNCIL_REVIEW_PACK_EZ_J_PROVENANCE_AND_QUARANTINE_20260831.md`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/01_EXECUTIVE_COUNCIL/COUNCIL_REVIEW_PACK_EZ_J_PROVENANCE_AND_QUARANTINE_20260831.md)
- **Sổ bộ Đăng ký Bằng chứng & Cách ly EZ-J:** [`PROPOSED_UTILITY_FACTS_EZ_J.json`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/06_TRUST_AND_EVIDENCE/PROPOSED_UTILITY_FACTS_EZ_J.json)
- **Sổ bộ AccessTrade JTBD Định tính:** [`ACCESSTRADE_QUALITATIVE_JTBD_RESEARCH_LEDGER_EZ_I.json`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/06_TRUST_AND_EVIDENCE/ACCESSTRADE_QUALITATIVE_JTBD_RESEARCH_LEDGER_EZ_I.json)
- **Manifest Đồng nhất Phiên bản Parity:** [`JAYT_VERSION_PARITY_MANIFEST_EZ_J.json`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/00_PROGRAM_BASELINE/JAYT_VERSION_PARITY_MANIFEST_EZ_J.json)
- **Biên nhận Phát hành Release Receipt EZ-J:** [`JAYT_RELEASE_RECEIPT_EZ_J.json`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/00_PROGRAM_BASELINE/JAYT_RELEASE_RECEIPT_EZ_J.json)
- **Kho Lưu trữ Raw Binary & Transcript EZ-J (Pure Document):** Thư mục [`06_TRUST_AND_EVIDENCE/evidence_vault_ez_j/`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/06_TRUST_AND_EVIDENCE/evidence_vault_ez_j/)
- **Script Runner Pure Document Provenance EZ-J:** [`scratch/run_captures_ez_j.js`](file:///C:/Users/tritr/.gemini/antigravity/brain/0fd55bc2-4a92-47b9-9f66-c02b2cf9af3a/scratch/run_captures_ez_j.js)
- **Script Kiểm thử EZ-J Provenance & Quarantine QA:** [`test_document_provenance_and_quarantine_ez_j.js`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/test_document_provenance_and_quarantine_ez_j.js)
- **Script Kiểm thử T2 Pilot E2E Browser Suite EZ-H:** [`test_ez_h_t2_pilot_e2e.js`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/test_ez_h_t2_pilot_e2e.js)
- **Script Kiểm thử Toàn diện Review Pack QA:** [`test_ez_review_pack_assertions.js`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/test_ez_review_pack_assertions.js)

---

### VI. LỆNH TÁI LẬP KIỂM ĐỊNH ĐỘC LẬP CHO CEO

Kính mời CEO thực thi độc lập các lệnh sau trên terminal để tái lập toàn bộ kiểm thử:

```powershell
# 1. Kiểm tra sức khỏe Staging Server & Parity Manifest
Invoke-RestMethod -Uri http://127.0.0.1:4173/health

# 2. Chạy kiểm thử Document Provenance & Quarantine QA Suite (28 tests)
node "07_QUALITY_ASSURANCE/test_document_provenance_and_quarantine_ez_j.js"

# 3. Chạy kiểm thử EZ-H T2 Pilot E2E Browser Suite trên 3 Viewport (30 tests)
node "07_QUALITY_ASSURANCE/test_ez_h_t2_pilot_e2e.js"

# 4. Chạy kiểm thử Grounded Fact Ladder QA EZ-G (21 tests)
node "07_QUALITY_ASSURANCE/test_grounded_utility_fact_ladder_ez_g.js"

# 5. Chạy kiểm thử Toàn diện Review Pack QA trên cổng 4173 (21 tests)
node "07_QUALITY_ASSURANCE/test_ez_review_pack_assertions.js"

# 6. Chạy kiểm thử đơn vị Bảng tính Local-First (10 tests)
node "07_QUALITY_ASSURANCE/test_calculator_unit_ez.js"

# 7. Mở trình duyệt kiểm tra trực tiếp Staging Server
Start-Process "http://127.0.0.1:4173/"
```

---

### VII. CAM KẾT VẬN HÀNH & KÍNH TRÌNH CEO

1. **Khóa Phát hành Production:** Production tiếp tục được khóa tại `v3.419.0`, `P0_EQ` tiếp tục ở trạng thái `OPEN`.
2. **Khóa Kích hoạt Affiliate & Voucher Public:** `T1 Voucher Verified = 0`, `Public T2 Documentation = 1`, `New Candidates Public = 0`, `Affiliate Activation = false`.
3. **Kính trình CEO trực tiếp kiểm định độc lập toàn bộ hồ sơ EZ-J, 2 pure document candidate raw captures và danh mục cách ly trước khi đưa ra quyết định tiếp theo.**