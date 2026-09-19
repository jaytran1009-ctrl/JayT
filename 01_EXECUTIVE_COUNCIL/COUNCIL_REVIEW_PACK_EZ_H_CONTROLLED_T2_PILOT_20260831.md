# HỒ SƠ HỘI ĐỒNG LIÊN BỘ — JAYT SECTION EZ-H
## THỰC THI THÍ ĐIỂM STAGING CÓ KIỂM SOÁT (CONTROLLED T2 PILOT): GITHUB EDUCATION DOCUMENTATION CARD

**Mã hồ sơ:** `COUNCIL_REVIEW_PACK_EZ_H_CONTROLLED_T2_PILOT_20260831`  
**Phiên bản Staging SOT:** `v3.480.0-staging.ez`  
**Chỉ thị chỉ đạo:** JAYT-245 Mục EZ-H (Dòng 4101–4124)  
**Địa chỉ Staging hoạt động:** `http://127.0.0.1:4173/`  
**Endpoint Sức khỏe Hệ thống (Health Check):** `http://127.0.0.1:4173/health` (`HTTP 200 OK`, `status: "UP"`, `version: "v3.480.0-staging.ez"`, `parity: "PERFECT_MATCH_ZERO_DRIFT"`)  
**HTTP Status:** `200 OK` (Content-Type: `text/html; charset=utf-8`)  
**Thời gian lập hồ sơ:** 2026-08-31T13:10:00+07:00  
**Trạng thái Quản trị:** `CONTROLLED_T2_STAGING_PILOT_ACTIVE` (Production khóa `v3.419.0`, P0_EQ mở, T1/Voucher public = 0, Affiliate activation = 0, Public T2 Documentation = 1)

---

### I. ĐỐI TƯỢNG THÍ ĐIỂM T2 DUY NHẤT: FACT_EZ_G_01 (MANDATES EZ-H.1 & EZ-H.2)

Thực hiện chỉ thị EZ-H của CEO, Hội đồng đã triển khai đúng **1 card T2 documentation-only** trên môi trường Staging với các thông số nghiêm ngặt:

| Thuộc tính kiểm định | Giá trị thực tế trên Staging |
| :--- | :--- |
| **Tiêu đề trung tính** | **`GitHub Education — Thông tin đăng ký`** |
| **Nhãn phân tầng** | `🛡️ T2 • TÀI LIỆU CHƯƠNG TRÌNH CHÍNH THỨC` (documentation-only; không gắn nhãn verified offer hay voucher) |
| **Câu hiển thị khách hàng duy nhất** | **"Theo tài liệu chính thức của GitHub, người học hoặc giảng viên tại một cơ sở giáo dục được công nhận có thể nộp đơn đăng ký GitHub Education."** |
| **Caveat & Phạm vi bắt buộc** | **"Phạm vi: chương trình toàn cầu; điều kiện và quyền lợi áp dụng do GitHub quyết định. JayT không xác nhận voucher, giá hay ưu đãi tại Đà Nẵng."** |
| **Nút hành động duy nhất (CTA)** | `Mở tài liệu chính thức ↗` $\rightarrow$ `https://docs.github.com/en/education/about-github-education/github-education-for-students/about-github-education-for-students` (`rel="noopener noreferrer nofollow"`, `target="_blank"`) |
| **Minh chứng Bằng chứng Nội bộ** | `Artifact ID: FACT_EZ_G_01_GITHUB_DOCS_ELIGIBILITY` / `Raw SHA: f21354b988f6db93...` / `Đối soát: 30 ngày` |
| **Bản quyền biểu tượng** | `ASSET_GLYPH_SHIELD` (Unicode Plain Text Glyph / Public Domain) |
| **Cam kết cấm** | **0 logo GitHub, 0 CTA Apply/Mua, 0 điền sẵn tài khoản, 0 mã giảm giá/voucher, 0 tham số tiếp thị liên kết (affiliate/sub-id).** |

---

### II. CÔ LẬP NỘI BỘ FACT ĐÀ NẴNG (MANDATE EZ-H.3)

- `FACT_EZ_G_02_DANANG_CIVIC_PORTAL_IDENTITY` tiếp tục được giữ ở trạng thái **T4 Radar nội bộ (Internal Candidate Only)**.
- Tuyệt đối **không render** tiêu đề cổng thông tin thành thẻ tiện ích đã kiểm trên giao diện.

---

### III. QUẢN LÝ DỮ LIỆU & RUNTIME FAIL-CLOSED (MANDATE EZ-H.4)

- Cờ tính năng runtime: `T2_DOCUMENTATION_PILOT_ENABLED = true`, `ECONOMIC_CLAIMS_PUBLIC = false`, `AFFILIATE_ACTIVATION = false`.
- Nếu receipt lệch hoặc kiểm tra locator thất bại, card T2 tự động ẩn về trạng thái Zero-State ban đầu.

---

### IV. TỔNG HỢP KIỂM THỬ TOÀN DIỆN (82/82 TESTS PASS 100%)

| Bộ kiểm thử | Số bài test | Kết quả |
| :--- | :---: | :---: |
| **EZ-H T2 Pilot E2E Browser Suite (1440, 768, 390 viewports)** | 30 | **30/30 PASS** ✅ |
| **Review Pack QA Assertion Suite (Port 4173)** | 21 | **21/21 PASS** ✅ |
| **Grounded Utility Fact Ladder QA (EZ-G)** | 21 | **21/21 PASS** ✅ |
| **Calculator Unit Test Suite (Math & Edge Cases)** | 10 | **10/10 PASS** ✅ |
| **Tổng cộng** | **82** | **82/82 PASS (100%)** ✅ |

---

### V. BỘ ARTIFACTS CỦA EZ-H REVIEW PACK

- **Hồ sơ Hội đồng Liên bộ chính thức EZ-H:** [`COUNCIL_REVIEW_PACK_EZ_H_CONTROLLED_T2_PILOT_20260831.md`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/01_EXECUTIVE_COUNCIL/COUNCIL_REVIEW_PACK_EZ_H_CONTROLLED_T2_PILOT_20260831.md)
- **Manifest Đồng nhất Phiên bản Parity:** [`JAYT_VERSION_PARITY_MANIFEST_EZ_H.json`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/00_PROGRAM_BASELINE/JAYT_VERSION_PARITY_MANIFEST_EZ_H.json)
- **Biên nhận Phát hành Release Receipt EZ-H:** [`JAYT_RELEASE_RECEIPT_EZ_H.json`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/00_PROGRAM_BASELINE/JAYT_RELEASE_RECEIPT_EZ_H.json)
- **Sổ bộ Bản quyền Biểu tượng Asset Register:** [`JAYT_ASSET_REGISTER_EZ_G.json`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/04_DESIGN_SYSTEM/JAYT_ASSET_REGISTER_EZ_G.json)
- **Kho Lưu trữ Raw Binary & Transcript EZ-G (2 Facts):** Thư mục [`06_TRUST_AND_EVIDENCE/evidence_vault_ez_g/`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/06_TRUST_AND_EVIDENCE/evidence_vault_ez_g/)
- **Script Kiểm thử T2 Pilot E2E Browser Suite EZ-H:** [`test_ez_h_t2_pilot_e2e.js`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/test_ez_h_t2_pilot_e2e.js)
- **Script Kiểm thử Toàn diện Review Pack QA:** [`test_ez_review_pack_assertions.js`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/test_ez_review_pack_assertions.js)

---

### VI. LỆNH TÁI LẬP KIỂM ĐỊNH ĐỘC LẬP CHO CEO

Kính mời CEO thực thi độc lập các lệnh sau trên terminal để tái lập toàn bộ kiểm thử:

```powershell
# 1. Kiểm tra sức khỏe Staging Server & Parity Manifest
Invoke-RestMethod -Uri http://127.0.0.1:4173/health

# 2. Chạy kiểm thử EZ-H T2 Pilot E2E Browser Suite (30 tests)
node "07_QUALITY_ASSURANCE/test_ez_h_t2_pilot_e2e.js"

# 3. Chạy kiểm thử Grounded Fact Ladder QA EZ-G (21 tests)
node "07_QUALITY_ASSURANCE/test_grounded_utility_fact_ladder_ez_g.js"

# 4. Chạy kiểm thử Toàn diện Review Pack QA trên cổng 4173 (21 tests)
node "07_QUALITY_ASSURANCE/test_ez_review_pack_assertions.js"

# 5. Chạy kiểm thử đơn vị Bảng tính Local-First (10 tests)
node "07_QUALITY_ASSURANCE/test_calculator_unit_ez.js"

# 6. Mở trình duyệt kiểm tra trực tiếp card T2 Pilot trên Staging
Start-Process "http://127.0.0.1:4173/"
```

---

### VII. CAM KẾT VẬN HÀNH & KÍNH TRÌNH CEO

1. **Khóa Phát hành Production:** Production tiếp tục được khóa tại `v3.419.0`, `P0_EQ` tiếp tục ở trạng thái `OPEN`.
2. **Khóa Kích hoạt Affiliate & Voucher Public:** `T1 Voucher Verified = 0`, `Public Eligible T2 Docs = 1`, `Affiliate Activation = false`, không phát sinh link tiếp thị liên kết hay hành vi monetization.
3. **Kính trình CEO trực tiếp kiểm định độc lập Staging Pilot tại `http://127.0.0.1:4173/` trước khi quyết định mở rộng fact tiếp theo.**