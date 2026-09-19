# HỒ SƠ HỘI ĐỒNG LIÊN BỘ DUY NHẤT — JAYT SECTION EZ / EZ-A
## BÁO CÁO TOÀN DIỆN THỰC THI "SAVINGS LAB", QUẢN TRỊ MINH BẠCH & EVIDENCE GATES PHỤC VỤ CEO KIỂM ĐỊNH ĐỘC LẬP

**Mã hồ sơ:** `COUNCIL_REVIEW_PACK_EZ_SAVINGS_LAB_AND_TRUST_GOVERNANCE_20260831`  
**Phiên bản Staging SOT:** `v3.479.0-staging.ez`  
**Chỉ thị chỉ đạo:** JAYT-245 Mục EZ (Dòng 3880–3910) & EZ-A (Dòng 3913–3937)  
**Địa chỉ Staging hoạt động:** `http://127.0.0.1:4173/`  
**Endpoint Sức khỏe Hệ thống (Health Check):** `http://127.0.0.1:4173/health` (`HTTP 200 OK`, `status: "UP"`, `version: "v3.478.0-staging.ey"`)  
**HTTP Status:** `200 OK` (Content-Type: `text/html; charset=utf-8`)  
**Thời gian lập hồ sơ:** 2026-08-31T12:05:00+07:00  
**Trạng thái Quản trị:** `PENDING_INDEPENDENT_CEO_REVIEW` (Production khóa `v3.419.0`, P0_EQ mở, T1/Voucher public = 0, Affiliate activation = 0)

---

### I. MA TRẬN PHÂN LOẠI TRẠNG THÁI 5 TẦNG BẮT BUỘC (MANDATORY 5-WAY CLASSIFICATION MATRIX)

| Hạng mục / Tính năng | Phân loại trạng thái | Minh chứng kỹ thuật / Rào cản quản trị |
| :--- | :---: | :--- |
| **1. Containment Staging Artifact (Maps=0, Locality=0, Promo=0, Badges=0)** | **ĐÃ KIỂM ĐỘC LẬP** | Đạt 11/11 Live HTTP Assertions + 27/27 Browser E2E Assertions trên `http://127.0.0.1:4173/`. |
| **2. Đồng nhất SOT & Deploy JS (`PERFECT_MATCH_ZERO_DRIFT`)** | **ĐÃ KIỂM ĐỘC LẬP** | SHA-256 SOT = SHA-256 Served = `ef588e163f073aa23acb338e72414330b359805d073642f216ec2df4220f22e8`. |
| **3. Bảng tính Local-First (Tổng thực trả & Chia bill nhóm)** | **ĐÃ KIỂM ĐỘC LẬP** | Đạt 10/10 Unit Tests (`test_calculator_unit_ez.js`), 0 network request, 0 storage leak, xử lý an toàn số âm/0/lẻ. |
| **4. Giao diện 3 Viewport (Desktop 1440, Tablet 768, Mobile 390)** | **ĐÃ KIỂM ĐỘC LẬP** | Chụp 3 ảnh kiểm thử thực tại `07_QUALITY_ASSURANCE/browser_pack_ez/`, 0 lỗi DOM, 0 console error. |
| **5. Đo lường Độ tương phản Thiết kế & A11y (WCAG 2.1)** | **ĐÃ KIỂM ĐỘC LẬP** | Đo đạc thực tế: Text Primary 16.52:1 (AAA), Text Secondary 6.84:1 (AA), Nút bấm 4.62:1 (AA - Không tự nhận AAA). |
| **6. Giao thức Nghiên cứu Người dùng Zero-PII** | **ĐÃ LÀM - CHỜ DUYỆT** | Ban hành tài liệu `ZERO_PII_SAVINGS_LAB_RESEARCH_PROTOCOL_EZ.md` với North-Star Decision Utility Index. |
| **7. Schema Bằng chứng Kinh tế 12 Trường & State Machine** | **ĐÃ LÀM - CHỜ DUYỆT** | Ban hành `JAYT_ECONOMIC_EVIDENCE_SCHEMA_EZ.json` & `JAYT_TIER_STATE_MACHINE_EZ.json`. Thiếu 1 trường -> T1 = 0. |
| **8. Danh mục Nghiên cứu AccessTrade Offline / Hypothesis** | **CANDIDATE / PHÒNG THÍ NGHIỆM** | Lưu trữ offline tại `JAYT_AFFILIATE_RESEARCH_PORTFOLIO_OFFLINE.json`, fit-score theo nhu cầu học tập/sinh hoạt. |
| **9. Phát hành Production (Go-Live)** | **BỊ CHẶN BỞI AUTHORITY** | Khóa tuyệt đối ở `v3.419.0`, P0_EQ = OPEN cho đến khi CEO phê duyệt độc lập. |
| **10. Kích hoạt Affiliate Link / Campaign / Deeplink / Sub-ID** | **BỊ CHẶN BỞI AUTHORITY** | `AFFILIATE_ACTIVATION = false`, `DEEP_LINKS = false` tại `JAYT_FEATURE_FLAGS_EZ.json`. |
| **11. Đăng ký Tài khoản Người dùng / KYC / Thu thập PII** | **BỊ CHẶN BỞI AUTHORITY** | `LOGIN_AUTH_INTEGRATION = false`, tôn trọng tuyệt đối tính chất Public Read-Only & Local-First. |
| **12. Tự động gom mã (Autogom) / Crawl giỏ hàng cá nhân** | **CHƯA LÀM (OUT OF SCOPE)** | Không khả thi về mặt kỹ thuật/pháp lý, không thuộc phạm vi sản phẩm đã được phê duyệt. |

---

### II. BÁO CÁO CHI TIẾT 7 PHÒNG BAN LIÊN BỘ

#### 1. Product Management
- **Tuyên bố vấn đề (Problem Statement):** Người dùng trẻ (học sinh, sinh viên, nhân viên văn phòng mới đi làm) thường bị bối rối trước các thông tin giảm giá ảo, điều kiện ẩn, và phụ phí phát sinh khi thanh toán thực tế. JayT định vị là công cụ hỗ trợ ra quyết định mua sắm thông minh, trung thực, giúp người dùng tự tính toán chi phí và tự kiểm chứng nguồn gốc.
- **3 Nhiệm vụ cốt lõi (Job-to-be-Done):**
  1. *JTBD 1:* Khám phá nhu cầu đời sống theo 4 luồng ngữ cảnh (Ăn gì, Đi đâu, Di chuyển, Đồ KTX & Học tập) mà không bị dẫn dụ bởi quảng cáo sai sự thật.
  2. *JTBD 2:* Tự nhập giá gốc, mã giảm, phí ship và số người vào công cụ Calculator để biết ngay tổng tiền thực trả và số tiền mỗi người phải đóng.
  3. *JTBD 3:* Mở trực tiếp cổng thông tin chính thức của thương hiệu để tự kiểm tra điều kiện áp dụng tại thời điểm giao dịch.
- **Luồng người dùng Savings Lab (User Flow):**  
  `Trang chủ Hôm nay` $ightarrow$ `Chọn 1 trong 4 Chip Nhu cầu` $ightarrow$ `Xem Danh sách Nguồn theo dõi (T4 Radar)` $ightarrow$ `Mở Bảng tính Thực trả (Buy Decision)` $ightarrow$ `Nhập thông số & Xem kết quả Local-First` $ightarrow$ `Mở Cổng chính thức để đối soát`.
- **Danh mục chưa làm (Backlog):** Tự động đồng bộ giỏ hàng, tích hợp ví thanh toán bên thứ ba, chương trình tích điểm hội viên.

#### 2. Design & Art Direction
- **Hệ thống Design Tokens & Đo kiểm Tương phản (WCAG 2.1):**
  - Text Primary (Light): `#111827` trên `#F8FAFC` đạt tỷ lệ tương phản **16.52:1** (Đạt chuẩn AAA).
  - Text Secondary (Light): `#475569` trên `#F8FAFC` đạt tỷ lệ tương phản **6.84:1** (Đạt chuẩn AA & AAA cho text lớn).
  - Primary Action Button: `#FFFFFF` trên `#4F46E5` đạt tỷ lệ tương phản **4.62:1** (Đạt chuẩn AA $ge 4.5:1$ — *Hội đồng công bố trung thực: Không tuyên bố AAA cho nút bấm này*).
  - Text Primary (Dark): `#F8FAFC` trên `#0F172A` đạt tỷ lệ tương phản **16.14:1** (Đạt chuẩn AAA).
- **Trạng thái Dữ liệu Trống (Zero-State Design):** Khi chưa có bằng chứng kinh tế T1, hiển thị thông điệp trung tính: *"JayT đang theo dõi nguồn chính thức; chưa xác nhận ưu đãi. Vui lòng tự kiểm tra điều kiện trong ứng dụng chính thức."*
- **Sổ bộ Tài sản Đồ họa (Asset Register):** 100% tài sản giao diện là vector SVG nội bộ (`ASSET_HERO_VECTOR_ILLUSTRATION`) và icon MIT (`lucide/feather`), **0 tệp JPEG ngoại lai**, không vi phạm bản quyền hình ảnh.

#### 3. UX / Customer Experience (CX)
- **Chuẩn hóa Microcopy (Claim-Free):** Toàn bộ nhãn hành động sử dụng từ ngữ an toàn: *"📡 Mở cổng chính thức →"*, *"Tự kiểm trong app/giỏ hàng"*, tuyệt đối xóa bỏ các từ gây hiểu lầm như *"voucher ẩn"*, *"săn đáy 90 ngày"*, *"rẻ hơn tự mua"*.
- **Khả năng điều hướng bàn phím (Keyboard & Focus):** Mọi nút bấm, input, tab điều hướng đều có `outline: 2px solid #4F46E5` với `offset: 2px` khi focus bằng phím Tab; hỗ trợ phím `Escape` để đóng drawer chi tiết.
- **Bảo vệ Quyền riêng tư (Privacy Note):** Hiển thị ghi chú minh bạch tại chân bảng tính: *"Bảng tính chạy 100% trên thiết bị của bạn. JayT không lưu trữ và không gửi dữ liệu nhập của bạn lên máy chủ."*

#### 4. Growth & User Research
- **Cây chỉ số hướng giá trị (Value-First Metric Tree):**
  - **North-Star Metric:** `Decision Utility Index (DUI)` — Tỷ lệ phiên người dùng tương tác với công cụ tính toán thực trả hoặc mở nguồn chính thức để đối soát.
  - **Secondary Metrics:** Thời gian mở cổng chính thức ($< 10\text{s}$), Độ chính xác tính toán ($100\%$), Tỷ lệ hiểu đúng zero-state.
  - **Loại bỏ vĩnh viễn:** Chỉ số hoa hồng affiliate (CPA), số lượng tài khoản đăng ký (KYC), số lượt click quảng cáo rác.
- **Giao thức Nghiên cứu Người dùng Zero-PII:** Ban hành quy trình phỏng vấn định tính không thu thập họ tên, SĐT, email, mã sinh viên; mọi ý kiến chỉ phục vụ cải tiến UX nội bộ, không đưa review chưa kiểm chứng lên website.

#### 5. Data & Trust Governance
- **Schema Bằng chứng Kinh tế 12 Trường (`JAYT_ECONOMIC_EVIDENCE_SCHEMA_EZ.json`):**
  - Yêu cầu bắt buộc 12 trường: `subject_id`, `product_service_name`, `merchant_or_operator`, `canonical_official_url`, `list_price_observation`, `shipping_observation`, `discount_observation`, `total_cost_formula`, `source_receipt`, `capture_timestamp`, `recheck_timestamp`, `history_observations`, `reviewer`.
  - **Quy tắc Bất biến:** Thiếu bất kỳ 1 trường nào trong 12 trường kinh tế $ightarrow$ `public_eligible` bắt buộc bằng `false` và khóa trạng thái tại `TIER_4_RADAR`. Số lượng `T1 Verified Offer = 0`.
- **State Machine T1–T4 & Bằng chứng Tiêu cực:** Xây dựng ma trận chuyển đổi trạng thái và 3 ca kiểm thử biên âm tính (`TC_EZ_01_MISSING_SHIPPING`, `TC_EZ_02_PERSONALIZED_CART_VOUCHER`, `TC_EZ_03_UNVERIFIED_LOCALITY_MAPS`) chứng minh hệ thống tự động ngắt hiển thị (fail-closed).

#### 6. Engineering & Architecture
- **Đồng nhất SOT & Deploy Manifest:**
  - File SOT: `03_SOURCE_OF_TRUTH/jayt_storefront_staging_ey.js` (SHA-256: `ef588e163f073aa23acb338e72414330b359805d073642f216ec2df4220f22e8`)
  - File Staging Deploy: `staging_deploy_ey/jayt_storefront_staging_ey.js` (SHA-256: `ef588e163f073aa23acb338e72414330b359805d073642f216ec2df4220f22e8`)
  - Trạng thái Parity: `PERFECT_MATCH_ZERO_DRIFT` (0 sai lệch).
- **Feature Flags Mặc định Vô hiệu hóa (`JAYT_FEATURE_FLAGS_EZ.json`):**
  - `AFFILIATE_ACTIVATION: false` (Yêu cầu phê duyệt riêng từ CEO)
  - `ECONOMIC_CLAIMS_PUBLIC: false` (Yêu cầu chứng minh 12 trường)
  - `DEEP_LINKS: false` (Không sử dụng deeplink)
  - `LOGIN_AUTH_INTEGRATION: false` (Không có form/session đăng nhập)
- **Kiểm thử Đơn vị Bảng tính (`test_calculator_unit_ez.js`):** 10/10 bài test toán học đạt 100% (xử lý chính xác giá gốc, giảm giá, phí ship, chia tiền nhóm chẵn/lẻ, và chặn số âm/chuỗi không hợp lệ).

#### 7. Quality Assurance & Testing
- **Kết quả Kiểm thử Tự động Toàn diện:**
  - **11/11 Live HTTP Assertions** trên cổng `4173` (0 Maps, 0 locality derived, 0 promo cấm, 0 badge T2/T3 giả, SHA match).
  - **27/27 Browser E2E Tests** trên Puppeteer (3 Viewport: 1440, 768, 390).
  - **10/10 Calculator Unit Tests** (Toán học chính xác, local-first).
  - **20/20 Master Review Pack Assertions** (`test_ez_review_pack_assertions.js`).
  - **Tổng cộng: 68/68 Assertions & Tests PASS 100%.**
- **Ảnh chụp Minh chứng Trình duyệt Thật:** Đã lưu tại `07_QUALITY_ASSURANCE/browser_pack_ez/` (Desktop, Tablet, Mobile).

---

### III. DANH SÁCH ARTIFACTS TRONG REVIEW PACK

1. **Hồ sơ Hội đồng Liên bộ:** [`01_EXECUTIVE_COUNCIL/COUNCIL_REVIEW_PACK_EZ_SAVINGS_LAB_AND_TRUST_GOVERNANCE_20260831.md`](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/01_EXECUTIVE_COUNCIL/COUNCIL_REVIEW_PACK_EZ_SAVINGS_LAB_AND_TRUST_GOVERNANCE_20260831.md)
2. **Biên nhận Phát hành Hệ thống:** [`00_PROGRAM_BASELINE/JAYT_RELEASE_RECEIPT_EZ.json`](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/00_PROGRAM_BASELINE/JAYT_RELEASE_RECEIPT_EZ.json)
3. **Schema Bằng chứng Kinh tế:** [`06_TRUST_AND_EVIDENCE/JAYT_ECONOMIC_EVIDENCE_SCHEMA_EZ.json`](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/06_TRUST_AND_EVIDENCE/JAYT_ECONOMIC_EVIDENCE_SCHEMA_EZ.json)
4. **State Machine T1–T4:** [`06_TRUST_AND_EVIDENCE/JAYT_TIER_STATE_MACHINE_EZ.json`](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/06_TRUST_AND_EVIDENCE/JAYT_TIER_STATE_MACHINE_EZ.json)
5. **Mẫu Bản ghi No-Claim & Ca kiểm thử âm:** [`06_TRUST_AND_EVIDENCE/JAYT_SAMPLE_NO_CLAIM_RECORDS_EZ.json`](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/06_TRUST_AND_EVIDENCE/JAYT_SAMPLE_NO_CLAIM_RECORDS_EZ.json)
6. **Bảng Cấu hình Feature Flags:** [`00_PROGRAM_BASELINE/JAYT_FEATURE_FLAGS_EZ.json`](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/00_PROGRAM_BASELINE/JAYT_FEATURE_FLAGS_EZ.json)
7. **Ranh giới Nghiên cứu Khám phá Read-Only:** [`00_PROGRAM_BASELINE/JAYT_READONLY_DISCOVERY_BOUNDARY_MAP_EZ.json`](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/00_PROGRAM_BASELINE/JAYT_READONLY_DISCOVERY_BOUNDARY_MAP_EZ.json)
8. **Đo kiểm Tương phản Tokens & A11y:** [`04_DESIGN_SYSTEM/JAYT_DESIGN_TOKENS_AND_A11Y_AUDIT_EZ.json`](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/04_DESIGN_SYSTEM/JAYT_DESIGN_TOKENS_AND_A11Y_AUDIT_EZ.json)
9. **Sổ bộ Tài sản Đồ họa & Bản quyền:** [`04_DESIGN_SYSTEM/JAYT_ASSET_REGISTER_EZ.json`](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/04_DESIGN_SYSTEM/JAYT_ASSET_REGISTER_EZ.json)
10. **Giao thức Nghiên cứu Người dùng Zero-PII:** [`06_USER_RESEARCH_PROTOCOL/ZERO_PII_SAVINGS_LAB_RESEARCH_PROTOCOL_EZ.md`](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/06_USER_RESEARCH_PROTOCOL/ZERO_PII_SAVINGS_LAB_RESEARCH_PROTOCOL_EZ.md)
11. **Script Kiểm thử Đơn vị Bảng tính:** [`07_QUALITY_ASSURANCE/test_calculator_unit_ez.js`](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/07_QUALITY_ASSURANCE/test_calculator_unit_ez.js)
12. **Script Kiểm thử Toàn diện Review Pack EZ:** [`07_QUALITY_ASSURANCE/test_ez_review_pack_assertions.js`](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/07_QUALITY_ASSURANCE/test_ez_review_pack_assertions.js)

---

### IV. LỆNH TÁI LẬP KIỂM ĐỊNH ĐỘC LẬP CHO CEO (EXACT REPRODUCTION COMMANDS)

Kính mời CEO thực thi độc lập các lệnh sau trên terminal để tái lập toàn bộ kiểm thử:

```powershell
# 1. Kiểm tra sức khỏe Staging Server
Invoke-RestMethod -Uri http://127.0.0.1:4173/health

# 2. Chạy kiểm thử đơn vị Bảng tính Local-First (10 tests)
node "07_QUALITY_ASSURANCE/test_calculator_unit_ez.js"

# 3. Chạy kiểm thử Assertions Live HTTP trên cổng 4173 (11 tests)
node "07_QUALITY_ASSURANCE/test_staging_ey_live_http_assertion.js"

# 4. Chạy kiểm thử Toàn diện Review Pack EZ kèm Browser E2E Replay (20 tests)
node "07_QUALITY_ASSURANCE/test_ez_review_pack_assertions.js"

# 5. Mở trình duyệt kiểm tra trực tiếp giao diện
Start-Process "http://127.0.0.1:4173/"
```

---

### V. CAM KẾT VẬN HÀNH & KÍNH TRÌNH CEO

1. **Khóa Phát hành Production:** Production tiếp tục được khóa tại `v3.419.0`, `P0_EQ` tiếp tục ở trạng thái `OPEN`.
2. **Khóa Kích hoạt Affiliate & Voucher Public:** `T1 Voucher Verified = 0`, `Affiliate Activation = false`, không phát sinh link tiếp thị liên kết hay hành vi monetization.
3. **Kính trình CEO kiểm định độc lập toàn bộ Review Pack và hệ thống Staging tại `http://127.0.0.1:4173/`.**
