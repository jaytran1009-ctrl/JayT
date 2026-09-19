# BỘ HỒ SƠ HỘI ĐỒNG LIÊN BỘ — JAYT SECTION DX
## THIẾT LẬP PHÂN VÙNG RỜI RẠC (DISJOINT PARTITIONING) & HỢP ĐỒNG SỐ LIỆU ĐỐI SOÁT CHUẨN XÁC 50 MỤC

**Mã hồ sơ:** `COUNCIL_DECISION_PACK_DX_DISJOINT_PARTITION_AND_UNIFIED_COUNT_CONTRACT_20260830`  
**Phiên bản Staging SOT:** `v3.452.0-staging.dx`  
**Chỉ thị chỉ đạo:** JAYT-245 Mục DX (Dòng 3038–3065)  
**Địa chỉ Staging hoạt động:** `http://127.0.0.1:4173/`  
**HTTP Status:** `200 OK` (Content-Type: `text/html; charset=utf-8`)  
**Thời gian lập hồ sơ:** 2026-08-30T15:36:00+07:00  
**Trạng thái Quản trị:** `PENDING_CEO_LIVE_REVIEW` (Tiếp tục nâng cấp, không Go-Live)

---

### I. BIÊN BẢN ĐÁNH GIÁ 7 PHÒNG BAN LIÊN BỘ (SECTION DX)

| Phòng ban | Báo cáo hành động thực tế | Trạng thái kỹ thuật |
| :--- | :--- | :---: |
| **1. Product** | **Xác lập Phân vùng Rời rạc (Disjoint Partitioning) Chuẩn Toán học:** Loại bỏ hoàn toàn lỗi cộng chồng taxonomy đa chiều (64). Mỗi mục trong 50 public items thuộc duy nhất 1 primary journey partition: **11 (Ẩm thực) + 14 (Đi chơi & Rạp) + 13 (Tiện ích đô thị) + 12 (Chính sách & Học đường) = đúng 50**. | **READY_FOR_CEO_REVIEW** |
| **2. Design** | Giữ vững surface F&B no-image Huỳnh Thúc Kháng với icon nhận diện `🍜`, bố cục tương phản cao, typography chuẩn mực; duy trì 3 visual card rights-pass có subject-matching chuẩn xác. | **READY_FOR_CEO_REVIEW** |
| **3. UX/CX** | **Minh bạch hóa Bằng chứng trong Detail Drawer:** Hiển thị khối `🔍 Bằng Chứng Nguồn Tin & Đối Soát Thực Tế (Section DX)` nêu rõ trường nào đã xác nhận từ nguồn chính thức và trường nào `⚠️ Chưa có dữ liệu điều kiện hiện hành` (khuyến nghị đối soát trực tiếp tại nguồn). | **READY_FOR_CEO_REVIEW** |
| **4. Growth** | **Duy trì Danh mục Affiliate Nghiên cứu Offline (Zero False Provenance):** 100% merchant giữ ở `RESEARCH_LEAD`, xóa bỏ toàn bộ các claim điều kiện/0 VND/giá chiết khấu chưa có byte-level locator. **Cam kết 0 affiliate deeplink, 0 cookie, 0 write API**. | **READY_FOR_CEO_REVIEW** |
| **5. Data & Trust** | **Khớp Nối 100% Toán học Giữa Ledger, Vault & Scorecard:** Xuất bản `00_PROGRAM_BASELINE/JAYT_PUBLIC_COUNT_LEDGER_DX.json`, chứng minh giao điểm pairwise giữa 4 tập hợp bằng 0 ($A \cap B = \emptyset$), hợp 4 tập hợp bằng đúng 50 items. 7 canonical sources trong vault khớp 7 trên scorecard. | **READY_FOR_CEO_REVIEW** |
| **6. Engineering** | Biên dịch và phân phối SOT `jayt_storefront_staging_dx.js`, tính toán động mọi nhãn đếm từ `primary_journey`, phục vụ ổn định trên máy chủ Staging `http://127.0.0.1:4173/` (`HTTP 200 OK`), **0 lỗi console error/warning**. | **READY_FOR_CEO_REVIEW** |
| **7. QA** | Quét toàn diện **100% phần tử focusable visible** (Desktop 48 items, Mobile 46 items) đều đạt $\ge 44\times 44\text{px}$ (**0 vi phạm**); kiểm thử 29/29 static contract & disjoint partition checks; sản xuất 16/16 capture proofs độc bản với 16 mã băm SHA-256 riêng biệt. | **READY_FOR_CEO_REVIEW** |

---

### II. HỢP ĐỒNG PHÂN VÙNG RỜI RẠC (DISJOINT PARTITION CONTRACT DX)

Theo [`00_PROGRAM_BASELINE/JAYT_PUBLIC_COUNT_LEDGER_DX.json`](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/00_PROGRAM_BASELINE/JAYT_PUBLIC_COUNT_LEDGER_DX.json) và [`07_QUALITY_ASSURANCE/staging_dx_unified_count_contract.json`](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/07_QUALITY_ASSURANCE/staging_dx_unified_count_contract.json):

| Phân vùng Hành trình (Primary Journey) | Số lượng Items | Namespace Dữ liệu | Điều kiện Giao nhau (Intersection) |
| :--- | :---: | :--- | :---: |
| **1. Ẩm Thực Đà Thành (`AN_GI`)** | **11** | `FEED_PRIMARY_JOURNEY_AN_GI` | $\text{AN\_GI} \cap \text{Khác} = \emptyset$ |
| **2. Đi Chơi & Rạp Chiếu (`DI_DAU`)** | **14** | `FEED_PRIMARY_JOURNEY_DI_DAU` | $\text{DI\_DAU} \cap \text{Khác} = \emptyset$ |
| **3. Tiện Ích Công Cộng & Đô Thị (`TIEN_ICH`)** | **13** | `FEED_PRIMARY_JOURNEY_TIEN_ICH` | $\text{TIEN\_ICH} \cap \text{Khác} = \emptyset$ |
| **4. Cổng Chính Sách & Học Đường (`MUA_SAM`)** | **12** | `FEED_PRIMARY_JOURNEY_MUA_SAM` | $\text{MUA\_SAM} \cap \text{Khác} = \emptyset$ |
| **TỔNG HỢP TOÀN BỘ 4 HÀNH TRÌNH** | **50** | $\mathbf{11 + 14 + 13 + 12 = 50}$ | **0 PHẦN TỬ TRÙNG LẶP** |

---

### III. BẢNG ĐIỂM NGUỒN CUNG TOÀN DIỆN (SUPPLY PIPELINE SCORECARD DX)

| Giai đoạn Pipeline | Số lượng Items | Định nghĩa & Trạng thái |
| :--- | :---: | :--- |
| **1. DISCOVERY_LEAD** | **1** | `CAND_BUN_CHA_CA_109` (cô lập khỏi domain chính quyền chung `danang.gov.vn`). |
| **2. CAPTURE_RETRY_REQUIRED** | **1** | `CAND_COM_GA_A_HAI` (Facebook login/script barrier $\rightarrow$ `UNVERIFIED_BLOCKED_DYNAMIC_SHELL`). |
| **3. CANONICAL_SOURCE_FOUND** | **7** | `TNGO`, `METIZ`, `STARLIGHT`, `DOMINOS`, `GITHUB_EDU`, `JETBRAINS_EDU`, `HIGHLANDS`. |
| **4. CAPTURE_PENDING** | **5** | Đang xếp hàng đối soát biểu giá/quy chế chi tiết (`BUS_R16A`, `DUT`, `DUND`, `LOTTERIA`, `NOTION`). |
| **5. EVIDENCE_COMPLETE** | **0** | Đầy đủ hợp đồng/chứng cứ giá thực. |
| **6. PUBLIC_TOTAL_ACTIVE** | **50** | **20 Cổng chính thức (T2) + 13 Tiện ích công cộng (T3) + 17 Radar theo dõi (T4)**. |
| **7. T1_DEAL_ELIGIBLE** | **0** | **Khóa Fail-closed (0 Deal thương mại khi chưa có hợp đồng kiểm định giá thực DH)**. |

---

### IV. BỘ 16 BẢN GHI CAPTURE PROOF MỚI (BROWSER PACK DX)

Toàn bộ 16 ảnh chụp kiểm thử tự động tại thời điểm live server hoạt động đạt **16/16 mã băm SHA-256 hoàn toàn riêng biệt**, được lưu trữ tại `07_QUALITY_ASSURANCE/browser_pack_dx/`:

1. `00_desktop_1440_visual_slate_proof.png` (1.086.630 bytes, SHA-256: `067b5489b667e1a3...`)
2. `01_desktop_1440_landmark_hero.png` (537.492 bytes, SHA-256: `cf7993ce6df7df43...`)
3. `02_desktop_1440_featured_deals.png` (193.850 bytes, SHA-256: `63d4e8c187be0896...`)
4. `03_desktop_1440_culinary_story.png` (205.811 bytes, SHA-256: `65074f9d2be2c10b...`)
5. `04_desktop_1440_transit_story.png` (523.518 bytes, SHA-256: `a16a8270ca88d0fe...`)
6. `05_desktop_1440_leisure_story.png` (506.772 bytes, SHA-256: `623b05423851b269...`)
7. `06_desktop_1440_three_lane_wallet.png` (173.288 bytes, SHA-256: `5d42a458707dbc71...`)
8. `07_desktop_1440_explore_directory.png` (81.839 bytes, SHA-256: `1f89e77dc2a4ac08...`)
9. `08_desktop_1440_dark_mode.png` (493.263 bytes, SHA-256: `8768a9fa37b63a57...`)
10. `09_desktop_1440_reduced_motion.png` (391.741 bytes, SHA-256: `3a1e34d409de4dff...`)
11. `10_tablet_768_modern_bento.png` (361.433 bytes, SHA-256: `e474b3d8450001f6...`)
12. `11_mobile_390_fresh_load_first_fold.png` (171.221 bytes, SHA-256: `3376967e5447f8e2...`)
13. `12_mobile_390_food_journey_route.png` (51.020 bytes, SHA-256: `c0ef60bbdc1b962b...`)
14. `13_mobile_390_three_lane_wallet.png` (71.716 bytes, SHA-256: `44ad8b4f0900c8e6...`)
15. `14_progressive_disclosure_drawer_open.png` (274.209 bytes, SHA-256: `5756c1fe869e1cc1...`)
16. `15_buy_decision_interactive.png` (72.699 bytes, SHA-256: `d09e9a395f947898...`)

---

### V. CAM KẾT VẬN HÀNH & HÀNG RÀO AN TOÀN

1. **Khóa phát hành Production:** Tiếp tục duy trì trên Staging local `http://127.0.0.1:4173/`, không phát tán ra production khi chưa có phê duyệt từ CEO.
2. **Không Affiliate write / Zero-PII:** Duy trì 100% không chèn mã affiliate, không thu thập cookie hay secret của người dùng.
3. **Kính trình CEO trực tiếp mở trình duyệt kiểm tra live tại `http://127.0.0.1:4173/` và kiểm tra phân vùng rời rạc tại `00_PROGRAM_BASELINE/JAYT_PUBLIC_COUNT_LEDGER_DX.json`.**
