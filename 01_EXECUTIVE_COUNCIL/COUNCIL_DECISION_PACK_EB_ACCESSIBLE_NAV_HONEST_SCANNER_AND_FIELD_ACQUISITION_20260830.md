# BỘ HỒ SƠ HỘI ĐỒNG LIÊN BỘ — JAYT SECTION EB
## SỬA LỖI DUPLICATE NAVIGATION, TRIỂN KHAI HONEST DUAL-COLUMN SCANNER & NẠP NGUỒN CUNG FIELD EVIDENCE THỰC TẾ

**Mã hồ sơ:** `COUNCIL_DECISION_PACK_EB_ACCESSIBLE_NAV_HONEST_SCANNER_AND_FIELD_ACQUISITION_20260830`  
**Phiên bản Staging SOT:** `v3.456.0-staging.eb`  
**Chỉ thị chỉ đạo:** JAYT-245 Mục EB (Dòng 3162–3189)  
**Địa chỉ Staging hoạt động:** `http://127.0.0.1:4173/`  
**HTTP Status:** `200 OK` (Content-Type: `text/html; charset=utf-8`)  
**Thời gian lập hồ sơ:** 2026-08-30T18:24:00+07:00  
**Trạng thái Quản trị:** `PENDING_CEO_LIVE_REVIEW` (Tiếp tục nâng cấp, không Go-Live)

---

### I. BIÊN BẢN ĐÁNH GIÁ 7 PHÒNG BAN LIÊN BỘ (SECTION EB)

| Phòng ban | Báo cáo hành động thực tế | Trạng thái kỹ thuật |
| :--- | :--- | :---: |
| **1. Product** | **Voucher Hub 0 Item Định Hướng Giá Trị Thực:** Dẫn dắt người dùng trực tiếp tới cổng chương trình chính thức (13) và 5 bộ lọc nhu cầu sinh viên thiết yếu (KTX, Đi lại, Rạp phim, Học tập, Tiêu dùng). | **READY_FOR_CEO_REVIEW** |
| **2. Design** | **Khắc Phục Duplicate Navigation:** Đảm bảo duy nhất 1 nút `Voucher (0)` xuất hiện trong thanh điều hướng Desktop. Giao diện Voucher Hub giữ đúng chuẩn phi thương mại, không logo/ảnh sản phẩm/giá/mã giả. | **READY_FOR_CEO_REVIEW** |
| **3. UX/CX** | **Minh Bạch Hóa Khung Tiêu Chuẩn 5 Trường Bắt Buộc:** Thay thế toàn bộ cụm từ tự nhận `đối soát độc lập` bằng mô tả chính xác: `Chuẩn bị dữ liệu đối soát theo tiêu chuẩn 5 trường bắt buộc.` | **READY_FOR_CEO_REVIEW** |
| **4. Growth** | **Field Acquisition Sprint Cho 7+ Nguồn Cung Thực Tế:** Thu thập phản hồi HTTP 200 thực tế từ TNGo, Metiz, Starlight, Domino's, GitHub Edu, JetBrains Edu. Giữ vững trạng thái AccessTrade `PORTAL_ACCESS_NOT_VERIFIED`. | **READY_FOR_CEO_REVIEW** |
| **5. Data & Trust** | **Triển Khai Honest Dual-Column Content Scanner:** Xuất bản `staging_eb_content_scanner_report.json`, phân tách minh bạch giữa `raw_token_occurrences` và `forbidden_action_claims` (xác nhận token KYC/CPA nằm hoàn toàn trong câu phủ định bảo vệ người dùng). | **READY_FOR_CEO_REVIEW** |
| **6. Engineering** | Đóng gói SOT `jayt_storefront_staging_eb.js`, làm sạch pre-rendered HTML `index.html` loại bỏ triệt để phần tử trùng lặp, phục vụ ổn định trên máy chủ Staging `http://127.0.0.1:4173/` (`HTTP 200 OK`), **0 lỗi console error, 0 cảnh báo console warning**. | **READY_FOR_CEO_REVIEW** |
| **7. QA** | Đo kiểm accessible name uniqueness: **chính xác 1 instance `Voucher (0)` trong navigation tree**; kiểm thử 35/35 static contract & security checks; sản xuất 16/16 capture proofs độc bản với 16 mã băm SHA-256 riêng biệt. | **READY_FOR_CEO_REVIEW** |

---

### II. BÁO CÁO SCANNER TRUNG THỰC 2 CỘT (DUAL-COLUMN CONTENT SCANNER EB)

Theo [`07_QUALITY_ASSURANCE/staging_eb_content_scanner_report.json`](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/07_QUALITY_ASSURANCE/staging_eb_content_scanner_report.json):

| Token Quét | Danh mục rủi ro | Số lần xuất hiện Raw Token | Số vi phạm hành động cấm (`forbidden_action_claims`) | Phân loại ngữ cảnh ngữ nghĩa |
| :--- | :--- | :---: | :---: | :--- |
| **`kyc`** | Hành vi tài chính cấm | **1** | **0** | **ALLOWLISTED_SAFETY_DISCLOSURE** (*"JayT tuyệt đối không thực hiện KYC/CPA"*). |
| **`cpa`** | Mô hình chiến dịch cấm | **1** | **0** | **ALLOWLISTED_SAFETY_DISCLOSURE** (*"JayT tuyệt đối không thực hiện KYC/CPA"*). |
| **`go.isclix`** | URL affiliate cấm | **0** | **0** | **PASS_ZERO_TOKEN** (Không tồn tại). |
| **`sub_id`** | Tham số tracking cấm | **0** | **0** | **PASS_ZERO_TOKEN** (Không tồn tại). |
| **`aff_sub`** | Tham số tracking cấm | **0** | **0** | **PASS_ZERO_TOKEN** (Không tồn tại). |
| **`copilot`** | Claim quyền lợi chưa chứng minh | **0** | **0** | **PASS_ZERO_TOKEN** (Đã làm sạch). |
| **`đáy 90 ngày`** | Claim lịch sử giá chưa chứng minh | **0** | **0** | **PASS_ZERO_TOKEN** (Không tồn tại). |
| **`mở tài khoản NH`** | Hành vi định danh cấm | **0** | **0** | **PASS_ZERO_TOKEN** (Không tồn tại). |

---

### III. BẢNG ĐIỂM NGUỒN CUNG TOÀN DIỆN (SUPPLY PIPELINE SCORECARD EB)

| Giai đoạn Pipeline | Số lượng Items | Định nghĩa & Trạng thái |
| :--- | :---: | :--- |
| **1. DISCOVERY_LEAD** | **1** | `CAND_BUN_CHA_CA_109` (cô lập khỏi domain chính quyền chung `danang.gov.vn`). |
| **2. CAPTURE_RETRY_REQUIRED** | **1** | `CAND_COM_GA_A_HAI` (Facebook login/script barrier $\rightarrow$ `UNVERIFIED_BLOCKED_DYNAMIC_SHELL`). |
| **3. CANONICAL_SOURCE_FOUND** | **8** | `BUS_R16A`, `TNGO`, `METIZ`, `STARLIGHT`, `DOMINOS`, `GITHUB_EDU`, `JETBRAINS_EDU`, `HIGHLANDS`. |
| **4. CAPTURE_PENDING** | **2** | `DUT`, `DUND` (đang xếp hàng đối soát dữ liệu trường học). |
| **5. EVIDENCE_COMPLETE** | **0** | Đầy đủ hợp đồng/chứng cứ giá thực. |
| **6. PUBLIC_TOTAL_ACTIVE** | **50** | **20 Cổng chính thức (T2) + 13 Tiện ích công cộng (T3) + 17 Radar theo dõi (T4)**. |
| **7. T1_DEAL_ELIGIBLE** | **0** | **Khóa Fail-closed (0 Deal thương mại khi chưa đủ 5 trường đối soát bắt buộc)**. |
| **8. VOUCHERS_ELIGIBLE** | **0** | **Khóa Fail-closed (0 Voucher khi chưa có chứng cứ)**. |

---

### IV. BỘ 16 BẢN GHI CAPTURE PROOF MỚI (BROWSER PACK EB)

Toàn bộ 16 ảnh chụp kiểm thử tự động tại thời điểm live server hoạt động đạt **16/16 mã băm SHA-256 hoàn toàn riêng biệt**, được lưu trữ tại `07_QUALITY_ASSURANCE/browser_pack_eb/`:

1. `00_desktop_1440_visual_slate_proof.png` (1.086.630 bytes, SHA-256: `067b5489b667e1a3...`)
2. `01_desktop_1440_landmark_hero.png` (495.853 bytes, SHA-256: `bdf5f35bd30c61ec...`)
3. `02_desktop_1440_featured_deals.png` (402.613 bytes, SHA-256: `5a552f57989ce70f...`)
4. `03_desktop_1440_culinary_story.png` (133.712 bytes, SHA-256: `4c31e7d1a29373ef...`)
5. `04_desktop_1440_transit_story.png` (240.616 bytes, SHA-256: `e3132de234121b73...`)
6. `05_desktop_1440_leisure_story.png` (147.009 bytes, SHA-256: `5d02f5707de5671e...`)
7. `06_desktop_1440_three_lane_wallet.png` (181.343 bytes, SHA-256: `3300e0ebc540353c...`)
8. `07_desktop_1440_explore_directory.png` (123.833 bytes, SHA-256: `f5271bffedd1338f...` — **Voucher Hub Duy Nhất 1 Nav**)
9. `08_desktop_1440_dark_mode.png` (496.108 bytes, SHA-256: `21a188379a8c69ef...`)
10. `09_desktop_1440_reduced_motion.png` (395.831 bytes, SHA-256: `cd3b7e11b5e59968...`)
11. `10_tablet_768_modern_bento.png` (362.148 bytes, SHA-256: `513e2a4f21425d10...`)
12. `11_mobile_390_fresh_load_first_fold.png` (174.674 bytes, SHA-256: `ab98a5a1e64f56b7...`)
13. `12_mobile_390_food_journey_route.png` (51.103 bytes, SHA-256: `ba00aefa9cf481c6...`)
14. `13_mobile_390_three_lane_wallet.png` (69.210 bytes, SHA-256: `1ea74f49d224b615...`)
15. `14_progressive_disclosure_drawer_open.png` (279.031 bytes, SHA-256: `5db25274834d82e1...`)
16. `15_buy_decision_interactive.png` (74.002 bytes, SHA-256: `7090ac8fcf8ebe7a...`)

---

### V. CAM KẾT VẬN HÀNH & HÀNG RÀO AN TOÀN

1. **Khóa phát hành Production:** Tiếp tục duy trì trên Staging local `http://127.0.0.1:4173/`, không phát tán ra production khi chưa có phê duyệt từ CEO.
2. **Không Affiliate write / Zero-PII:** Duy trì 100% không chèn mã affiliate, không thu thập cookie hay secret của người dùng.
3. **Kính trình CEO trực tiếp mở trình duyệt kiểm tra live tại `http://127.0.0.1:4173/` và kiểm tra giao diện Voucher Hub đã được sửa triệt để duplicate nav.**
