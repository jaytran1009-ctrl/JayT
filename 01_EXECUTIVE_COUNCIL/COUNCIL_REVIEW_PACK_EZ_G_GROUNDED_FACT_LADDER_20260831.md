# HỒ SƠ HỘI ĐỒNG LIÊN BỘ — JAYT SECTION EZ-G
## CHUẨN HÓA CÂU HIỂN THỊ BÁM SÁT LOCATOR (GROUNDED FACT LADDER), XÁC LẬP ASSET REGISTER & DUY TRÌ PUBLIC ELIGIBLE = 0

**Mã hồ sơ:** `COUNCIL_REVIEW_PACK_EZ_G_GROUNDED_FACT_LADDER_20260831`  
**Phiên bản Staging SOT:** `v3.480.0-staging.ez`  
**Chỉ thị chỉ đạo:** JAYT-245 Mục EZ-G (Dòng 4078–4098)  
**Địa chỉ Staging hoạt động:** `http://127.0.0.1:4173/`  
**Endpoint Sức khỏe Hệ thống (Health Check):** `http://127.0.0.1:4173/health` (`HTTP 200 OK`, `status: "UP"`, `version: "v3.480.0-staging.ez"`, `parity: "PERFECT_MATCH_ZERO_DRIFT"`)  
**HTTP Status:** `200 OK` (Content-Type: `text/html; charset=utf-8`)  
**Thời gian lập hồ sơ:** 2026-08-31T13:05:00+07:00  
**Trạng thái Quản trị:** `PENDING_INDEPENDENT_CEO_REVIEW` (Production khóa `v3.419.0`, P0_EQ mở, T1/Voucher public = 0, Affiliate activation = 0, Public Eligible = 0)

---

### I. CÔ LẬP WORDING SUY DIỄN & QUY TẮC CÂU HIỂN THỊ DUY NHẤT BÁM SÁT LOCATOR (MANDATES EZ-G.1 & EZ-G.2)

1. **Cô lập Triệt để Cụm từ Suy diễn:** Đã xóa bỏ hoàn toàn các cụm từ *"email hoặc thẻ sinh viên hợp lệ"*, *"gói miễn phí"*, *"tin tức chỉ đạo/hướng dẫn thủ tục"* và các tuyên bố chung chung về *"SVG mã nguồn mở"* khỏi toàn bộ sổ bộ đăng ký, prototype và review pack.
2. **Quy tắc Câu hiển thị Khách hàng Duy nhất:** Mỗi fact đề xuất chỉ có duy nhất 1 câu bám sát 100% locator nguyên văn từ raw bytes, kèm scope và loại trừ rõ ràng:

| Thuộc tính kiểm định | Fact 1: `FACT_EZ_G_01_GITHUB_DOCS_ELIGIBILITY` | Fact 2: `FACT_EZ_G_02_DANANG_CIVIC_PORTAL_IDENTITY` |
| :--- | :--- | :--- |
| **Tên đối tượng** | GitHub Education — Tiêu chuẩn & Điều kiện đăng ký | Cổng Thông Tin Điện Tử Thành Phố Đà Nẵng |
| **Cohort phân bổ** | `COHORT_1_HOC_TAP` | `COHORT_2_TIEN_ICH_CONG` |
| **URL Nguồn chính thức** | `https://docs.github.com/en/education/about-github-education/github-education-for-students/about-github-education-for-students` | `https://danang.gov.vn/web/guest/chinh-quyen` $\rightarrow$ `https://danang.gov.vn/web/dng/gioi-thieu` |
| **HTTP Status Code** | `200 OK` | `200 OK` (Redirect 301 $\rightarrow$ 200) |
| **Kích thước byte thực tế** | **135348 bytes** | **160022 bytes** |
| **Mã băm SHA-256 Raw Bytes** | `f21354b988f6db93fda0460932ce00f336bf8210cf69d5b3329cb68626e1f237` | `3ac7e2a40dee37ab7ac45ea001eb9ef61e3a89923cee2942a316e3c9120adab9` |
| **Locator Nguyên văn (Exact Locator)** | `"As a student or faculty member at an accredited educational institution, you can apply for GitHub Education."` | `"<title>Cổng Thông tin điện tử Thành phố Đà Nẵng</title>"` |
| **Câu hiển thị Khách hàng duy nhất (Grounded Sentence)** | **"Theo tài liệu chính thức của GitHub, người học hoặc giảng viên tại một cơ sở giáo dục được công nhận có thể nộp đơn đăng ký GitHub Education để được xem xét cấp quyền truy cập các quyền lợi dành cho sinh viên."** | **"Trang giới thiệu chính thức xác nhận đây là Cổng Thông tin điện tử của Thành phố Đà Nẵng."** |
| **Phạm vi chứng minh (Scope Provenance)** | Toàn cầu / Người học hoặc giảng viên tại cơ sở giáo dục được công nhận có tài khoản GitHub. | Cổng thông tin điện tử cấp thành phố (Đà Nẵng). |
| **Loại trừ & Caveat rõ ràng (Exclusions)** | **Tài liệu này không chứng minh phương thức xác thực cụ thể (như email trường hay thẻ sinh viên) tại trang này; không chứng minh danh mục gói công cụ cụ thể; không chứng minh quyền lợi cục bộ.** | **Trang giới thiệu này chỉ xác nhận danh tính Cổng thông tin điện tử; KHÔNG chứng minh danh mục thủ tục hành chính, dịch vụ công trực tuyến hay ưu đãi cụ thể.** |
| **Hành động chính thức (Canonical Action)** | `https://docs.github.com/en/education/about-github-education/github-education-for-students/about-github-education-for-students` | `https://danang.gov.vn` |
| **Chính sách đối soát (Freshness)** | Định kỳ 30 ngày | Định kỳ 30 ngày |
| **Minh chứng Bản quyền (Asset Right)** | `ASSET_GLYPH_SHIELD` (Unicode Plain Text Glyph / Public Domain) | `ASSET_GLYPH_EXTERNAL_LINK` (Unicode Plain Text Glyph / Public Domain) |
| **Phân tầng đề xuất** | `T2_OFFICIAL_PROGRAM_CANDIDATE` | `T4_RADAR_SOURCE_IDENTITY_ONLY` |
| **Trạng thái Public** | `public_eligible: false` (Fail-Closed) | `public_eligible: false` (Fail-Closed) |

---

### II. SỔ BỘ BẢN QUYỀN BIỂU TƯỢNG (ASSET REGISTER — MANDATE EZ-G.4)

Theo [`04_DESIGN_SYSTEM/JAYT_ASSET_REGISTER_EZ_G.json`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/04_DESIGN_SYSTEM/JAYT_ASSET_REGISTER_EZ_G.json):
- Toàn bộ biểu tượng trên giao diện và prototype sử dụng **Ký tự Unicode Plain Text (🛡️, 🔄, ↗) thuộc Public Domain** hoặc **CSS Vector tự viết nội bộ**.
- Loại bỏ 100% tuyên bố chung chung về *"100% SVG mã nguồn mở"*.
- **Tuyệt đối không sử dụng logo thương mại của bên thứ ba** khi chưa có văn bản cấp phép nhãn hiệu trực tiếp.

---

### III. TỔNG HỢP KIỂM THỬ TOÀN DIỆN (88/88 TESTS PASS 100%)

| Bộ kiểm thử | Số bài test | Kết quả |
| :--- | :---: | :---: |
| **Grounded Utility Fact Ladder & SHA Parity QA (EZ-G)** | 27 | **27/27 PASS** ✅ |
| **Customer Behavior E2E Suite (1440, 768, 390 viewports)** | 30 | **30/30 PASS** ✅ |
| **Review Pack QA Assertion Suite (Port 4173)** | 21 | **21/21 PASS** ✅ |
| **Calculator Unit Test Suite (Math & Edge Cases)** | 10 | **10/10 PASS** ✅ |
| **Tổng cộng** | **88** | **88/88 PASS (100%)** ✅ |

---

### IV. BỘ ARTIFACTS CỦA EZ-G REVIEW PACK

- **Hồ sơ Hội đồng Liên bộ chính thức EZ-G:** [`COUNCIL_REVIEW_PACK_EZ_G_GROUNDED_FACT_LADDER_20260831.md`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/01_EXECUTIVE_COUNCIL/COUNCIL_REVIEW_PACK_EZ_G_GROUNDED_FACT_LADDER_20260831.md)
- **Sổ bộ Đăng ký Grounded Utility Facts:** [`PROPOSED_UTILITY_FACTS_EZ_G.json`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/06_TRUST_AND_EVIDENCE/PROPOSED_UTILITY_FACTS_EZ_G.json)
- **Sổ bộ Bản quyền Biểu tượng Asset Register:** [`JAYT_ASSET_REGISTER_EZ_G.json`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/04_DESIGN_SYSTEM/JAYT_ASSET_REGISTER_EZ_G.json)
- **Manifest Đồng nhất Phiên bản Parity:** [`JAYT_VERSION_PARITY_MANIFEST_EZ_G.json`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/00_PROGRAM_BASELINE/JAYT_VERSION_PARITY_MANIFEST_EZ_G.json)
- **Biên nhận Phát hành Release Receipt EZ-G:** [`JAYT_RELEASE_RECEIPT_EZ_G.json`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/00_PROGRAM_BASELINE/JAYT_RELEASE_RECEIPT_EZ_G.json)
- **Kho Lưu trữ Raw Binary & Transcript EZ-G (2 Facts):** Thư mục [`06_TRUST_AND_EVIDENCE/evidence_vault_ez_g/`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/06_TRUST_AND_EVIDENCE/evidence_vault_ez_g/)
- **Script Kiểm thử Grounded Fact Ladder QA EZ-G:** [`test_grounded_utility_fact_ladder_ez_g.js`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/test_grounded_utility_fact_ladder_ez_g.js)
- **Script Kiểm thử Hành vi Khách hàng E2E:** [`test_ez_b_customer_behavior_e2e.js`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/test_ez_b_customer_behavior_e2e.js)
- **Script Kiểm thử Toàn diện Review Pack QA:** [`test_ez_review_pack_assertions.js`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/test_ez_review_pack_assertions.js)

---

### V. LỆNH TÁI LẬP KIỂM ĐỊNH ĐỘC LẬP CHO CEO

Kính mời CEO thực thi độc lập các lệnh sau trên terminal để tái lập toàn bộ kiểm thử:

```powershell
# 1. Kiểm tra sức khỏe Staging Server & Parity Manifest
Invoke-RestMethod -Uri http://127.0.0.1:4173/health

# 2. Chạy kiểm thử Grounded Fact Ladder QA EZ-G (27 tests)
node "07_QUALITY_ASSURANCE/test_grounded_utility_fact_ladder_ez_g.js"

# 3. Chạy kiểm thử Hành vi Khách hàng E2E trên 3 Viewport (30 tests)
node "07_QUALITY_ASSURANCE/test_ez_b_customer_behavior_e2e.js"

# 4. Chạy kiểm thử Toàn diện Review Pack QA trên cổng 4173 (21 tests)
node "07_QUALITY_ASSURANCE/test_ez_review_pack_assertions.js"

# 5. Chạy kiểm thử đơn vị Bảng tính Local-First (10 tests)
node "07_QUALITY_ASSURANCE/test_calculator_unit_ez.js"

# 6. Mở trình duyệt kiểm tra trực tiếp giao diện và form Savings Lab
Start-Process "http://127.0.0.1:4173/"
```

---

### VI. CAM KẾT VẬN HÀNH & KÍNH TRÌNH CEO

1. **Khóa Phát hành Production:** Production tiếp tục được khóa tại `v3.419.0`, `P0_EQ` tiếp tục ở trạng thái `OPEN`.
2. **Khóa Kích hoạt Affiliate & Voucher Public:** `T1 Voucher Verified = 0`, `Public Eligible = 0`, `Affiliate Activation = false`, không phát sinh link tiếp thị liên kết hay hành vi monetization.
3. **Kính trình CEO kiểm định độc lập toàn bộ hồ sơ EZ-G, 2 grounded utility facts đề xuất và các raw artifacts nêu trên tại `http://127.0.0.1:4173/`.**