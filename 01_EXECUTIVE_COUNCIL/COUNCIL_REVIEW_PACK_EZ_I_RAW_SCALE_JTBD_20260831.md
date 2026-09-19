# HỒ SƠ HỘI ĐỒNG LIÊN BỘ — JAYT SECTION EZ-I
## MỞ RỘNG THEO TỪNG BẰNG CHỨNG NGUYÊN BẢN (RAW-FIRST SCALE), ỔN ĐỊNH SAVINGS LAB VÀ CHUYỂN ACCESSTRADE SANG JTBD ĐỊNH TÍNH

**Mã hồ sơ:** `COUNCIL_REVIEW_PACK_EZ_I_RAW_SCALE_JTBD_20260831`  
**Phiên bản Staging SOT:** `v3.480.0-staging.ez`  
**Chỉ thị chỉ đạo:** JAYT-245 Mục EZ-I (Dòng 4127–4147)  
**Địa chỉ Staging hoạt động:** `http://127.0.0.1:4173/`  
**Endpoint Sức khỏe Hệ thống (Health Check):** `http://127.0.0.1:4173/health` (`HTTP 200 OK`, `status: "UP"`, `version: "v3.480.0-staging.ez"`, `parity: "PERFECT_MATCH_ZERO_DRIFT"`)  
**HTTP Status:** `200 OK` (Content-Type: `text/html; charset=utf-8`)  
**Thời gian lập hồ sơ:** 2026-08-31T13:35:00+07:00  
**Trạng thái Quản trị:** `SCALE_RAW_FIRST_CANDIDATES_HELD_FAIL_CLOSED` (Production khóa `v3.419.0`, P0_EQ mở, T1/Voucher public = 0, Affiliate activation = 0, Public T2 Docs Pilot = 1, New Candidates Public = 0)

---

### I. 2 CANDIDATE RAW-FIRST KHẢO SÁT CHÍNH XÁC (MANDATE EZ-I.1)

Tuân thủ tuyệt đối chỉ thị EZ-I, 2 candidate mới được **thu thập raw bytes thực tế và lưu trữ trong Evidence Vault**, thiết lập đầy đủ 4 locators và **giữ nguyên trạng thái nội bộ (Held Internal / Public Eligible = 0)**, không render lên Staging trước khi CEO kiểm tra độc lập:

| Thuộc tính kiểm định | Candidate 1: `CANDIDATE_EZ_I_01_NOTION_EDUCATION` | Candidate 2: `CANDIDATE_EZ_I_02_CANVA_EDUCATION` |
| :--- | :--- | :--- |
| **Tên đối tượng** | Notion for Education — Thông tin chương trình | Canva for Education — Giải pháp giáo dục |
| **Cohort phân bổ** | `COHORT_1_HOC_TAP` | `COHORT_1_HOC_TAP` |
| **URL Yêu cầu ban đầu** | `https://www.notion.so/product/notion-for-education` | `https://www.canva.com/education/` |
| **URL Cuối cùng** | `https://www.notion.com/product/notion-for-education` | `https://www.canva.com/education/` |
| **HTTP Status Code** | `200 OK` | `200 OK` |
| **Kích thước byte thực tế** | **199243 bytes** | **323860 bytes** |
| **Mã băm SHA-256 Raw Bytes** | `7cd3812fdc2c9f67f4f0bd27d671208d589754ce2fb111c72e7cba341126c7fd` | `166219aa422fde4ac8d71670c97bcfec32121c54587113e144d283d0350dc264` |
| **4 Locators Trích xuất** | 1. Title: `<title>Notion for Education</title>`<br>2. Eligibility: `students and educators`<br>3. Scope: `education`<br>4. Action URL: `https://www.notion.com/...` | 1. Title: `<title>Education Solutions for K–12 & Higher Ed - Canva</title>`<br>2. Eligibility: `teachers, students`<br>3. Scope: `K–12 & Higher Ed`<br>4. Action URL: `https://www.canva.com/...` |
| **Câu hiển thị duy nhất (Grounded Sentence)** | **"Theo tài liệu chính thức của Notion, học sinh, sinh viên và nhà giáo dục có thể tìm hiểu và đăng ký chương trình Notion for Education."** | **"Theo trang thông tin chính thức của Canva, giáo viên và người học tại các cơ sở giáo dục đủ điều kiện có thể tham gia chương trình Canva for Education."** |
| **Phạm vi chứng minh (Scope Provenance)** | Toàn cầu / Học sinh, sinh viên và giảng viên tại các cơ sở giáo dục. | Toàn cầu / Giáo viên và học sinh, sinh viên tại các cơ sở giáo dục đủ điều kiện. |
| **Loại trừ & Caveat (Exclusions)** | **Trang thông tin này không chứng minh phương thức xác thực cụ thể hay quyền lợi cục bộ tại bất kỳ tỉnh thành nào; JayT không bảo đảm việc cấp gói hay giá trị kinh tế.** | **Trang này không chứng minh tiêu chuẩn phê duyệt chi tiết cho từng cá nhân; JayT không xác nhận voucher, ưu đãi thương mại hay quyền lợi địa phương.** |
| **Hành động chính thức (Canonical Action)** | `https://www.notion.so/product/notion-for-education` | `https://www.canva.com/education/` |
| **Chính sách đối soát (Freshness)** | Định kỳ 30 ngày | Định kỳ 30 ngày |
| **Minh chứng Bản quyền (Asset Right)** | `ASSET_GLYPH_SHIELD` (Unicode Plain Text / Public Domain) | `ASSET_GLYPH_EXTERNAL_LINK` (Unicode Plain Text / Public Domain) |
| **Phân tầng đề xuất** | `T2_OFFICIAL_PROGRAM_CANDIDATE_INTERNAL` | `T2_OFFICIAL_PROGRAM_CANDIDATE_INTERNAL` |
| **Trạng thái Public Staging** | `public_eligible: false` (**CÔ LẬP NỘI BỘ — CHƯA RENDER**) | `public_eligible: false` (**CÔ LẬP NỘI BỘ — CHƯA RENDER**) |

---

### II. BẢO TỒN VÀ ỔN ĐỊNH SAVINGS LAB LOCAL-FIRST (MANDATE EZ-I.2)

1. **Duy trì 5 Input Người dùng Tự nhập:** Giá niêm yết, Phí vận chuyển, Giảm giá voucher, Giảm giá sinh viên bổ sung, Số người chia bill.
2. **100% Thuật toán Tính toán Cục bộ (Local-First):** Không có cuộc gọi mạng, không lưu trữ theo dõi, không thu thập PII.
3. **Tự động Chặn Số âm & Nút Reset:** Tự động điều chỉnh các giá trị âm về 0 kèm cảnh báo giao diện; nút Reset xóa sạch dữ liệu nhập.
4. **Disclaimer Minh bạch:** *"Công cụ tính toán cục bộ (Local-First). JayT không truy cập giỏ hàng, không can thiệp thanh toán và không xác thực voucher cá nhân."*

---

### III. SỔ BỘ ACCESSTRADE CHUYỂN THÀNH JTBD ĐỊNH TÍNH (MANDATE EZ-I.3)

Tài liệu [`06_TRUST_AND_EVIDENCE/ACCESSTRADE_QUALITATIVE_JTBD_RESEARCH_LEDGER_EZ_I.json`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/06_TRUST_AND_EVIDENCE/ACCESSTRADE_QUALITATIVE_JTBD_RESEARCH_LEDGER_EZ_I.json) đã được chuẩn hóa:
- **Cấu trúc 5 phần:** Problem Statement, Desired Outcome, Safety & Fit Questions, Evidence Needed, Authority Required.
- **Xóa bỏ 100% dữ liệu suy diễn:** Không có giá thương mại, số sao đánh giá, số lượng bán, tình trạng kho, thời gian giao hàng, tỷ lệ hoa hồng, mã chiến dịch hay đề xuất sản phẩm chưa được chứng minh.
- **Cụm trường / Quận huyện:** Được phân loại nghiêm ngặt là **Giả thuyết Nghiên cứu Định tính (`QUALITATIVE_RESEARCH_HYPOTHESIS_ONLY`)**, không phải dữ liệu thực tế hay phân đoạn thị trường.

---

### IV. TỔNG HỢP KIỂM THỬ TOÀN DIỆN (87/87 TESTS PASS 100%)

| Bộ kiểm thử | Số bài test | Kết quả |
| :--- | :---: | :---: |
| **EZ-I Raw Scale & JTBD QA Suite** | 26 | **26/26 PASS** ✅ |
| **EZ-H T2 Pilot E2E Browser Suite (1440, 768, 390 viewports)** | 30 | **30/30 PASS** ✅ |
| **Review Pack QA Assertion Suite (Port 4173)** | 21 | **21/21 PASS** ✅ |
| **Calculator Unit Test Suite (Math & Edge Cases)** | 10 | **10/10 PASS** ✅ |
| **Tổng cộng** | **87** | **87/87 PASS (100%)** ✅ |

---

### V. BỘ ARTIFACTS CỦA EZ-I REVIEW PACK

- **Hồ sơ Hội đồng Liên bộ chính thức EZ-I:** [`COUNCIL_REVIEW_PACK_EZ_I_RAW_SCALE_JTBD_20260831.md`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/01_EXECUTIVE_COUNCIL/COUNCIL_REVIEW_PACK_EZ_I_RAW_SCALE_JTBD_20260831.md)
- **Sổ bộ Đăng ký Candidates EZ-I:** [`PROPOSED_UTILITY_FACTS_EZ_I.json`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/06_TRUST_AND_EVIDENCE/PROPOSED_UTILITY_FACTS_EZ_I.json)
- **Sổ bộ AccessTrade JTBD Định tính:** [`ACCESSTRADE_QUALITATIVE_JTBD_RESEARCH_LEDGER_EZ_I.json`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/06_TRUST_AND_EVIDENCE/ACCESSTRADE_QUALITATIVE_JTBD_RESEARCH_LEDGER_EZ_I.json)
- **Manifest Đồng nhất Phiên bản Parity:** [`JAYT_VERSION_PARITY_MANIFEST_EZ_I.json`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/00_PROGRAM_BASELINE/JAYT_VERSION_PARITY_MANIFEST_EZ_I.json)
- **Biên nhận Phát hành Release Receipt EZ-I:** [`JAYT_RELEASE_RECEIPT_EZ_I.json`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/00_PROGRAM_BASELINE/JAYT_RELEASE_RECEIPT_EZ_I.json)
- **Kho Lưu trữ Raw Binary & Transcript EZ-I (Notion & Canva):** Thư mục [`06_TRUST_AND_EVIDENCE/evidence_vault_ez_i/`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/06_TRUST_AND_EVIDENCE/evidence_vault_ez_i/)
- **Script Kiểm thử EZ-I Raw Scale & JTBD QA:** [`test_ez_i_raw_scale_and_jtbd_qa.js`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/test_ez_i_raw_scale_and_jtbd_qa.js)
- **Script Kiểm thử T2 Pilot E2E Browser Suite EZ-H:** [`test_ez_h_t2_pilot_e2e.js`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/test_ez_h_t2_pilot_e2e.js)
- **Script Kiểm thử Toàn diện Review Pack QA:** [`test_ez_review_pack_assertions.js`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/test_ez_review_pack_assertions.js)

---

### VI. LỆNH TÁI LẬP KIỂM ĐỊNH ĐỘC LẬP CHO CEO

Kính mời CEO thực thi độc lập các lệnh sau trên terminal để tái lập toàn bộ kiểm thử:

```powershell
# 1. Kiểm tra sức khỏe Staging Server & Parity Manifest
Invoke-RestMethod -Uri http://127.0.0.1:4173/health

# 2. Chạy kiểm thử EZ-I Raw Scale & JTBD QA Suite (26 tests)
node "07_QUALITY_ASSURANCE/test_ez_i_raw_scale_and_jtbd_qa.js"

# 3. Chạy kiểm thử EZ-H T2 Pilot E2E Browser Suite trên 3 Viewport (30 tests)
node "07_QUALITY_ASSURANCE/test_ez_h_t2_pilot_e2e.js"

# 4. Chạy kiểm thử Toàn diện Review Pack QA trên cổng 4173 (21 tests)
node "07_QUALITY_ASSURANCE/test_ez_review_pack_assertions.js"

# 5. Chạy kiểm thử đơn vị Bảng tính Local-First (10 tests)
node "07_QUALITY_ASSURANCE/test_calculator_unit_ez.js"

# 6. Mở trình duyệt kiểm tra trực tiếp Staging Server
Start-Process "http://127.0.0.1:4173/"
```

---

### VII. CAM KẾT VẬN HÀNH & KÍNH TRÌNH CEO

1. **Khóa Phát hành Production:** Production tiếp tục được khóa tại `v3.419.0`, `P0_EQ` tiếp tục ở trạng thái `OPEN`.
2. **Khóa Kích hoạt Affiliate & Voucher Public:** `T1 Voucher Verified = 0`, `Public T2 Documentation = 1`, `New Candidates Public = 0`, `Affiliate Activation = false`.
3. **Kính trình CEO trực tiếp kiểm định độc lập toàn bộ hồ sơ EZ-I, 2 candidate raw-first contracts và sổ bộ JTBD trước khi quyết định bước tiếp theo.**