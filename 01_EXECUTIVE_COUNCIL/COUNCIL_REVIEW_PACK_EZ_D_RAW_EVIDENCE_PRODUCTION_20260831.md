# HỒ SƠ HỘI ĐỒNG LIÊN BỘ — JAYT SECTION EZ-D
## THIẾT LẬP REAL RAW EVIDENCE CAPTURE RUNNER, CÔ LẬP TOÀN DIỆN LAB TỔNG HỢP VÀ BẢO TOÀN GATE QUẢN TRỊ THƯƠNG MẠI

**Mã hồ sơ:** `COUNCIL_REVIEW_PACK_EZ_D_RAW_EVIDENCE_PRODUCTION_20260831`  
**Phiên bản Staging SOT:** `v3.480.0-staging.ez`  
**Chỉ thị chỉ đạo:** JAYT-245 Mục EZ-D (Dòng 4005–4033)  
**Địa chỉ Staging hoạt động:** `http://127.0.0.1:4173/`  
**Endpoint Sức khỏe Hệ thống (Health Check):** `http://127.0.0.1:4173/health` (`HTTP 200 OK`, `status: "UP"`, `version: "v3.480.0-staging.ez"`, `parity: "PERFECT_MATCH_ZERO_DRIFT"`)  
**HTTP Status:** `200 OK` (Content-Type: `text/html; charset=utf-8`)  
**Thời gian lập hồ sơ:** 2026-08-31T12:45:00+07:00  
**Trạng thái Quản trị:** `PENDING_INDEPENDENT_CEO_REVIEW` (Production khóa `v3.419.0`, P0_EQ mở, T1/Voucher public = 0, Affiliate activation = 0)

---

### I. CÔ LẬP LAB TỔNG HỢP & PHÂN ĐỊNH RÕ RÀNG (MANDATE EZ-D.1)

Thực hiện chỉ thị EZ-D.1, Hội đồng đã gắn nhãn và cách ly hoàn toàn 10 hồ sơ markdown tự biên soạn của EZ-C:
- **Trạng thái:** `EVIDENCE_SYNTHETIC_OR_UNPROVEN`
- **Lý do cô lập:** File Markdown tóm tắt và receipt JSON tự khai không phải là byte phản hồi mạng nguyên bản (raw response bytes).
- **Phạm vi quản trị:** Toàn bộ 10 hồ sơ được bảo lưu nguyên vẹn trong lịch sử append-only nhưng **nghiêm cấm sử dụng làm căn cứ nâng tầng T2/T3/T1**.

---

### II. BÁO CÁO 2 BẢN CHỤP NGUYÊN BẢN (REAL RAW CAPTURES) THẬT TỪ MẠNG (MANDATES EZ-D.2 & EZ-D.5)

Runner độc lập [`runner_real_raw_capture_ez_d.js`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/06_TRUST_AND_EVIDENCE/runner_real_raw_capture_ez_d.js) đã gửi yêu cầu HTTP/HTTPS GET thật và lưu trữ 100% byte phản hồi nhị phân không chỉnh sửa vào [`06_TRUST_AND_EVIDENCE/evidence_vault_ez_d/`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/06_TRUST_AND_EVIDENCE/evidence_vault_ez_d/):

| Thuộc tính kiểm định | Bản chụp 1: `RAW_EZ_D_01_GITHUB_EDUCATION` | Bản chụp 2: `RAW_EZ_D_02_DANABUS_PUBLIC` |
| :--- | :--- | :--- |
| **Tên đối tượng** | GitHub Student Developer Pack (Docs) | DanaBus — Cổng Thông Tin Tuyến Buýt |
| **URL Yêu cầu (Request URL)** | `https://docs.github.com/en/education/about-github-education/...` | `https://danabus.vn` |
| **URL Cuối cùng (Final URL)** | `https://docs.github.com/en/education/about-github-education/...` | `https://danabus.vn` |
| **Chuỗi chuyển hướng (Redirects)** | `[]` (0 redirect) | `[]` (0 redirect) |
| **HTTP Status Code** | `200 OK` (Thực tế nhận từ server) | `200 OK` (Thực tế nhận từ server) |
| **Content-Type** | `text/html; charset=utf-8` | `text/html` |
| **Kích thước byte thực tế** | **135,348 bytes** | **1,316 bytes** |
| **Mã băm SHA-256 Raw Bytes** | `f21354b988f6db93e5066929949bb2d2e1fe1a35ae7db1450a89d0b67fc19b94` | `9282040e863590076a086b4a2bf17a80b06b6eb7df12519bfb8e5c26b472e35f` |
| **File Raw Binary lưu trữ** | `raw_ez_d_01_github_education_raw_bytes.bin` | `raw_ez_d_02_danabus_public_raw_bytes.bin` |
| **File Transcript JSON** | `raw_ez_d_01_github_education_transcript.json` | `raw_ez_d_02_danabus_public_transcript.json` |
| **Header Server chọn lọc** | `github.com`, `strict-transport-security` | `Apache/Nginx`, `date` |
| **Phạm vi chứng minh (Scope Gate)** | Xác nhận cổng tài liệu chính thức trực tuyến. **Không chứng minh phạm vi/địa chỉ cục bộ.** | Xác nhận cổng thông tin tuyến buýt trực tuyến. **Không chứng minh voucher/vé giảm giá.** |
| **Phân tầng quản trị** | `T4_RADAR_ONLY_PENDING_INDEPENDENT_CEO_GATE` | `T4_RADAR_ONLY_PENDING_INDEPENDENT_CEO_GATE` |
| **Trạng thái Public** | `public_eligible: false` (Fail-closed) | `public_eligible: false` (Fail-closed) |

---

### III. MA TRẬN NGUYÊN TẮC BẰNG CHỨNG & RÀO CẢN FACT GATE (MANDATE EZ-D.4)

1. **Nguyên tắc Web Root / Portal:** Việc sở hữu raw bytes của một trang web/cổng thông tin (ví dụ `danabus.vn` hay `docs.github.com`) **chỉ chứng minh sự tồn tại của kênh trực tuyến chính thức**, không thể suy diễn thành: địa chỉ thực tế, giờ mở cửa, giá niêm yết, chính sách giảm giá hay voucher cụ thể.
2. **T1 Voucher Verified = 0:** Không có mã giảm giá nào được công bố khi thiếu đủ 12 trường kinh tế có bằng chứng hóa đơn/chính sách chi tiết.
3. **T2/T3 Public Display = false:** 2 bản chụp thật được lưu trữ fail-closed trong Lab, không xuất bản công khai hay hiển thị badge khi chưa có lệnh riêng từ CEO.

---

### IV. TỔNG HỢP KIỂM THỬ TOÀN DIỆN (84/84 TESTS PASS 100%)

| Bộ kiểm thử | Số bài test | Kết quả |
| :--- | :---: | :---: |
| **Real Raw Evidence Replay & Negative QA (EZ-D)** | 23 | **23/23 PASS** ✅ |
| **Customer Behavior E2E Suite (1440, 768, 390 viewports)** | 30 | **30/30 PASS** ✅ |
| **Review Pack QA Assertion Suite (Port 4173)** | 21 | **21/21 PASS** ✅ |
| **Calculator Unit Test Suite (Math & Edge Cases)** | 10 | **10/10 PASS** ✅ |
| **Tổng cộng** | **84** | **84/84 PASS (100%)** ✅ |

---

### V. BỘ ARTIFACTS CỦA EZ-D REVIEW PACK

- **Hồ sơ Hội đồng Liên bộ chính thức EZ-D:** [`COUNCIL_REVIEW_PACK_EZ_D_RAW_EVIDENCE_PRODUCTION_20260831.md`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/01_EXECUTIVE_COUNCIL/COUNCIL_REVIEW_PACK_EZ_D_RAW_EVIDENCE_PRODUCTION_20260831.md)
- **Manifest Đồng nhất Phiên bản Parity:** [`JAYT_VERSION_PARITY_MANIFEST_EZ_D.json`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/00_PROGRAM_BASELINE/JAYT_VERSION_PARITY_MANIFEST_EZ_D.json)
- **Biên nhận Phát hành Release Receipt EZ-D:** [`JAYT_RELEASE_RECEIPT_EZ_D.json`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/00_PROGRAM_BASELINE/JAYT_RELEASE_RECEIPT_EZ_D.json)
- **Sổ bộ Bằng chứng Mạng Nguyên bản:** [`REAL_RAW_EVIDENCE_REGISTRY_EZ_D.json`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/06_TRUST_AND_EVIDENCE/evidence_desk_ez_d/REAL_RAW_EVIDENCE_REGISTRY_EZ_D.json)
- **Kho Lưu trữ Raw Binary & Transcript (2 Subjects):** Thư mục [`06_TRUST_AND_EVIDENCE/evidence_vault_ez_d/`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/06_TRUST_AND_EVIDENCE/evidence_vault_ez_d/)
- **Script Runner Chụp Mạng Nguyên bản:** [`runner_real_raw_capture_ez_d.js`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/06_TRUST_AND_EVIDENCE/runner_real_raw_capture_ez_d.js)
- **Script Kiểm thử Replay & Negative QA EZ-D:** [`test_real_raw_capture_replay_ez_d.js`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/test_real_raw_capture_replay_ez_d.js)
- **Script Kiểm thử Hành vi Khách hàng E2E:** [`test_ez_b_customer_behavior_e2e.js`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/test_ez_b_customer_behavior_e2e.js)
- **Script Kiểm thử Toàn diện Review Pack QA:** [`test_ez_review_pack_assertions.js`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/test_ez_review_pack_assertions.js)

---

### VI. LỆNH TÁI LẬP KIỂM ĐỊNH ĐỘC LẬP CHO CEO

Kính mời CEO thực thi độc lập các lệnh sau trên terminal để tái lập toàn bộ kiểm thử:

```powershell
# 1. Kiểm tra sức khỏe Staging Server & Parity Manifest
Invoke-RestMethod -Uri http://127.0.0.1:4173/health

# 2. Chạy kiểm thử Real Raw Evidence Replay & Negative QA EZ-D (23 tests)
node "07_QUALITY_ASSURANCE/test_real_raw_capture_replay_ez_d.js"

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
2. **Khóa Kích hoạt Affiliate & Voucher Public:** `T1 Voucher Verified = 0`, `Affiliate Activation = false`, không phát sinh link tiếp thị liên kết hay hành vi monetization.
3. **Kính trình CEO kiểm định độc lập toàn bộ hồ sơ EZ-D, các raw artifacts và trải nghiệm thực tế trên Staging tại `http://127.0.0.1:4173/`.**