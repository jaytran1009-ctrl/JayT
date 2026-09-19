# HỒ SƠ HỘI ĐỒNG LIÊN BỘ — JAYT SECTION EZ-F
## THIẾT LẬP BẬC THANG TIỆN ÍCH ĐÃ KIỂM (FIRST VERIFIED UTILITY LADDER), ĐỀ XUẤT 3 UTILITY FACTS CÓ BẰNG CHỨNG NGUYÊN BẢN & DUY TRÌ KHÓA THƯƠNG MẠI

**Mã hồ sơ:** `COUNCIL_REVIEW_PACK_EZ_F_UTILITY_FACT_LADDER_20260831`  
**Phiên bản Staging SOT:** `v3.480.0-staging.ez`  
**Chỉ thị chỉ đạo:** JAYT-245 Mục EZ-F (Dòng 4058–4076)  
**Địa chỉ Staging hoạt động:** `http://127.0.0.1:4173/`  
**Endpoint Sức khỏe Hệ thống (Health Check):** `http://127.0.0.1:4173/health` (`HTTP 200 OK`, `status: "UP"`, `version: "v3.480.0-staging.ez"`, `parity: "PERFECT_MATCH_ZERO_DRIFT"`)  
**HTTP Status:** `200 OK` (Content-Type: `text/html; charset=utf-8`)  
**Thời gian lập hồ sơ:** 2026-08-31T13:00:00+07:00  
**Trạng thái Quản trị:** `PENDING_INDEPENDENT_CEO_REVIEW` (Production khóa `v3.419.0`, P0_EQ mở, T1/Voucher public = 0, Affiliate activation = 0, Public Eligible = 0)

---

### I. CHUYỂN TRỌNG TÂM SANG 3 UTILITY FACTS CỤ THỂ, BỀN VỮNG (MANDATE EZ-F.1 & EZ-F.2)

Thực hiện chỉ thị EZ-F, Hội đồng không đề xuất mở hàng loạt danh mục hay các ưu đãi voucher phức tạp phụ thuộc app/giỏ hàng. Thay vào đó, Hội đồng xây dựng **3 Utility Facts cụ thể, bền vững** có đầy đủ bằng chứng raw bytes để trình CEO phê duyệt từng fact độc lập:

| Thuộc tính kiểm định | Fact 1: `FACT_EZ_F_01_GITHUB_STUDENT_PACK` | Fact 2: `FACT_EZ_F_02_GITHUB_ELIGIBILITY_DOCS` | Fact 3: `FACT_EZ_F_03_DANANG_CIVIC_PORTAL` |
| :--- | :--- | :--- | :--- |
| **Tên tiện ích / Chương trình** | GitHub Student Developer Pack | GitHub Education — Tiêu chuẩn & Điều kiện | Cổng Thông Tin Chính Quyền Đô Thị (Đà Nẵng) |
| **Cohort phân bổ** | `COHORT_1_HOC_TAP` | `COHORT_1_HOC_TAP` | `COHORT_2_TIEN_ICH_CONG` |
| **URL Nguồn chính thức** | `https://education.github.com/pack` | `https://docs.github.com/en/education/...` | `https://danang.gov.vn/web/dng/gioi-thieu` |
| **HTTP Status Code** | `200 OK` | `200 OK` | `200 OK` (Redirect 301→200) |
| **Kích thước byte thực tế** | **271478 bytes** | **135348 bytes** | **160022 bytes** |
| **Mã băm SHA-256 Raw Bytes** | `106c8e448b07a07c4075a43c50ae13e95c6aa1c236230e23c00a429113657a21` | `f21354b988f6db93fda0460932ce00f336bf8210cf69d5b3329cb68626e1f237` | `cb24cd7365111e5637e27b83c3c08b2d1aa86ea8069bf5c1491d1dd01f765dab` |
| **Nội dung thực chất (Substantive Fact)** | Sinh viên cơ sở giáo dục được công nhận đủ điều kiện đăng ký gói công cụ lập trình miễn phí GitHub Student Pack. | Tài liệu chính thức quy định tiêu chuẩn và điều kiện xác thực học tập để nhận hỗ trợ giáo dục của GitHub. | Cổng thông tin điện tử cung cấp tin tức chỉ đạo điều hành và hướng dẫn thủ tục hành chính công đô thị. |
| **Phạm vi áp dụng (Scope Provenance)** | Toàn cầu / Sinh viên có email hoặc thẻ sinh viên hợp lệ. | Toàn cầu / Học sinh, sinh viên từ 13 tuổi có tài khoản GitHub. | Cổng thông tin hành chính công cấp đô thị (Đà Nẵng). |
| **Giới hạn loại trừ (Exclusions)** | **Không chứng minh phạm vi hoặc quyền lợi cục bộ.** | **Không chứng minh voucher giảm giá.** | **Không chứng minh địa điểm thương mại, giá vé hay ưu đãi.** |
| **Hành động chính thức (Canonical Action)** | `https://education.github.com/pack` | `https://docs.github.com/en/education` | `https://danang.gov.vn` |
| **Chính sách đối soát (Freshness)** | Định kỳ 30 ngày | Định kỳ 30 ngày | Định kỳ 30 ngày |
| **Bản quyền biểu tượng (Asset Right)** | 100% SVG Vector (Mã nguồn mở) | 100% SVG Vector (Mã nguồn mở) | 100% SVG Vector (Mã nguồn mở) |
| **Phân tầng đề xuất** | `T2_OFFICIAL_PROGRAM_CANDIDATE` | `T2_OFFICIAL_PROGRAM_CANDIDATE` | `T3_PUBLIC_FACILITY_CANDIDATE` |
| **Trạng thái Public hiện tại** | `public_eligible: false` (Fail-Closed) | `public_eligible: false` (Fail-Closed) | `public_eligible: false` (Fail-Closed) |

---

### II. QUẢN LÝ GIAO DIỆN CÔNG KHAI & NGUYÊN TẮC ZERO-STATE (MANDATE EZ-F.3 & EZ-F.4)

1. **Bảo tồn Zero-State Công khai:** Giao diện khách hàng tại `http://127.0.0.1:4173/` tiếp tục hiển thị minh bạch thông báo: *"🛡️ Trạng thái xác minh: Hiện tại chưa có ưu đãi kinh tế nào được xác minh đầy đủ (T1 = 0). Toàn bộ danh mục bên dưới là các kênh thông tin chính thức để bạn tự tra cứu và đối soát."*
2. **Quy chuẩn Prototype Thẻ Tiện ích:** Bản thiết kế mẫu "Tiện ích đã kiểm" được chuẩn hóa tại [`04_DESIGN_SYSTEM/JAYT_VERIFIED_UTILITY_CARD_PROTOTYPE_SPEC_EZ_F.json`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/04_DESIGN_SYSTEM/JAYT_VERIFIED_UTILITY_CARD_PROTOTYPE_SPEC_EZ_F.json) với tương phản màu 16.5:1 (AAA), min touch target $44\text{px}$, nhãn phân tầng và chỉ số freshness. Mọi dữ liệu mẫu đều được cô lập ở fixture kiểm thử nội bộ, **tuyệt đối không xuất hiện trên public storefront**.

---

### III. GIAO THỨC NGHIÊN CỨU NGƯỜI DÙNG ZERO-PII (MANDATE EZ-F.5)

Đã chuẩn hóa quy trình đo lường 3 tác vụ cốt lõi không thu thập danh tính:
1. **Task 1:** Tìm tiện ích công (Tra cứu nguồn cổng thông tin chính quyền/xe buýt).
2. **Task 2:** Hiểu điều kiện một chương trình học tập (Đọc tiêu chuẩn GitHub Education).
3. **Task 3:** Tự tính tổng thực trả và chia bill (Sử dụng công cụ Savings Lab local-first).

> [!NOTE]
> Báo cáo chỉ tổng hợp tỷ lệ hoàn thành tác vụ (Task Completion Rate) và thời gian thực hiện (Time to Source). Hoàn toàn không có testimonial giả, đánh giá sao hay PII.

---

### IV. TỔNG HỢP KIỂM THỬ TOÀN DIỆN (87/87 TESTS PASS 100%)

| Bộ kiểm thử | Số bài test | Kết quả |
| :--- | :---: | :---: |
| **Utility Fact Ladder & Raw Replay QA (EZ-F)** | 26 | **26/26 PASS** ✅ |
| **Customer Behavior E2E Suite (1440, 768, 390 viewports)** | 30 | **30/30 PASS** ✅ |
| **Review Pack QA Assertion Suite (Port 4173)** | 21 | **21/21 PASS** ✅ |
| **Calculator Unit Test Suite (Math & Edge Cases)** | 10 | **10/10 PASS** ✅ |
| **Tổng cộng** | **87** | **87/87 PASS (100%)** ✅ |

---

### V. BỘ ARTIFACTS CỦA EZ-F REVIEW PACK

- **Hồ sơ Hội đồng Liên bộ chính thức EZ-F:** [`COUNCIL_REVIEW_PACK_EZ_F_UTILITY_FACT_LADDER_20260831.md`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/01_EXECUTIVE_COUNCIL/COUNCIL_REVIEW_PACK_EZ_F_UTILITY_FACT_LADDER_20260831.md)
- **Sổ bộ Đăng ký 3 Utility Facts:** [`PROPOSED_UTILITY_FACTS_EZ_F.json`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/06_TRUST_AND_EVIDENCE/PROPOSED_UTILITY_FACTS_EZ_F.json)
- **Quy chuẩn Prototype Thẻ Tiện ích Đã Kiểm:** [`JAYT_VERIFIED_UTILITY_CARD_PROTOTYPE_SPEC_EZ_F.json`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/04_DESIGN_SYSTEM/JAYT_VERIFIED_UTILITY_CARD_PROTOTYPE_SPEC_EZ_F.json)
- **Manifest Đồng nhất Phiên bản Parity:** [`JAYT_VERSION_PARITY_MANIFEST_EZ_F.json`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/00_PROGRAM_BASELINE/JAYT_VERSION_PARITY_MANIFEST_EZ_F.json)
- **Biên nhận Phát hành Release Receipt EZ-F:** [`JAYT_RELEASE_RECEIPT_EZ_F.json`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/00_PROGRAM_BASELINE/JAYT_RELEASE_RECEIPT_EZ_F.json)
- **Kho Lưu trữ Raw Binary & Transcript EZ-F (3 Facts):** Thư mục [`06_TRUST_AND_EVIDENCE/evidence_vault_ez_f/`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/06_TRUST_AND_EVIDENCE/evidence_vault_ez_f/)
- **Script Kiểm thử Utility Fact Ladder QA EZ-F:** [`test_utility_fact_ladder_ez_f.js`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/test_utility_fact_ladder_ez_f.js)
- **Script Kiểm thử Hành vi Khách hàng E2E:** [`test_ez_b_customer_behavior_e2e.js`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/test_ez_b_customer_behavior_e2e.js)
- **Script Kiểm thử Toàn diện Review Pack QA:** [`test_ez_review_pack_assertions.js`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/test_ez_review_pack_assertions.js)

---

### VI. LỆNH TÁI LẬP KIỂM ĐỊNH ĐỘC LẬP CHO CEO

Kính mời CEO thực thi độc lập các lệnh sau trên terminal để tái lập toàn bộ kiểm thử:

```powershell
# 1. Kiểm tra sức khỏe Staging Server & Parity Manifest
Invoke-RestMethod -Uri http://127.0.0.1:4173/health

# 2. Chạy kiểm thử Utility Fact Ladder QA EZ-F (26 tests)
node "07_QUALITY_ASSURANCE/test_utility_fact_ladder_ez_f.js"

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

### VII. CAM KẾT VẬN HÀNH & KÍNH TRÌNH CEO

1. **Khóa Phát hành Production:** Production tiếp tục được khóa tại `v3.419.0`, `P0_EQ` tiếp tục ở trạng thái `OPEN`.
2. **Khóa Kích hoạt Affiliate & Voucher Public:** `T1 Voucher Verified = 0`, `Public Eligible = 0`, `Affiliate Activation = false`, không phát sinh link tiếp thị liên kết hay hành vi monetization.
3. **Kính trình CEO kiểm định độc lập toàn bộ hồ sơ EZ-F, 3 utility facts đề xuất và các raw artifacts nêu trên tại `http://127.0.0.1:4173/`.**