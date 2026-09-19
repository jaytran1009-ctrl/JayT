# BỘ HỒ SƠ HỘI ĐỒNG LIÊN BỘ — JAYT SECTION DW
## CÔ LẬP CLAIM AFFILIATE, THỐNG NHẤT HỢP ĐỒNG SỐ LIỆU & BẢO VỆ PHÂN TẦNG MINH BẠCH

**Mã hồ sơ:** `COUNCIL_DECISION_PACK_DW_DATA_CONTRACT_AND_AFFILIATE_CLEANSING_20260830`  
**Phiên bản Staging SOT:** `v3.451.0-staging.dw`  
**Chỉ thị chỉ đạo:** JAYT-245 Mục DW (Dòng 3006–3035)  
**Địa chỉ Staging hoạt động:** `http://127.0.0.1:4173/`  
**HTTP Status:** `200 OK` (Content-Type: `text/html; charset=utf-8`)  
**Thời gian lập hồ sơ:** 2026-08-30T15:26:00+07:00  
**Trạng thái Quản trị:** `PENDING_CEO_LIVE_REVIEW` (Tiếp tục nâng cấp, không Go-Live)

---

### I. BIÊN BẢN ĐÁNH GIÁ 7 PHÒNG BAN LIÊN BỘ (SECTION DW)

| Phòng ban | Báo cáo hành động thực tế | Trạng thái kỹ thuật |
| :--- | :--- | :---: |
| **1. Product** | **Xác lập Hợp đồng Số liệu Công khai Thống nhất (Unified Count Contract):** Reconcile 100% giữa (a) 50 public items tiered, (b) Khám phá (50), (c) Chương Trình (13), (d) 4 journey counters (11+27+14+12=50), và (e) Scorecard stages. | **READY_FOR_CEO_REVIEW** |
| **2. Design** | Giữ vững surface F&B no-image Huỳnh Thúc Kháng với icon nhận diện `🍜`, bố cục tương phản cao, typography chuẩn mực; duy trì 3 visual card rights-pass có subject-matching chuẩn xác. | **READY_FOR_CEO_REVIEW** |
| **3. UX/CX** | **Minh bạch hóa Bằng chứng trong Detail Drawer:** Hiển thị khối `🔍 Bằng Chứng Nguồn Tin & Đối Soát Thực Tế (Section DW)` nêu rõ trường nào đã xác nhận từ nguồn chính thức và trường nào `⚠️ Chưa có dữ liệu điều kiện hiện hành` (khuyến nghị đối soát trực tiếp tại nguồn). | **READY_FOR_CEO_REVIEW** |
| **4. Growth** | **Làm Sạch Danh mục Affiliate Nghiên cứu Offline (Zero False Provenance):** Chuyển 100% merchant về `RESEARCH_LEAD`, xóa bỏ toàn bộ các claim điều kiện/0 VND/giá chiết khấu chưa có byte-level locator. **Cam kết 0 affiliate deeplink, 0 cookie, 0 write API**. | **READY_FOR_CEO_REVIEW** |
| **5. Data & Trust** | **Đồng Bộ Hoàn Toàn Giữa Kho Vật Chứng & Scorecard:** Khớp chuẩn xác **7 artifact `CANONICAL_SOURCE_FOUND`** trong kho `evidence_vault_dw/` với chỉ số `CANONICAL_SOURCE_FOUND: 7` trên bảng điểm `staging_dw_supply_scorecard.json`. | **READY_FOR_CEO_REVIEW** |
| **6. Engineering** | Biên dịch và phân phối SOT `jayt_storefront_staging_dw.js`, phục vụ ổn định trên máy chủ Staging `http://127.0.0.1:4173/` (`HTTP 200 OK`), **0 lỗi console error/warning**. | **READY_FOR_CEO_REVIEW** |
| **7. QA** | Quét toàn diện **100% phần tử focusable visible** (Desktop 48 items, Mobile 46 items) đều đạt $\ge 44\times 44\text{px}$ (**0 vi phạm**); kiểm thử 37/37 static contract & count reconciliation checks; sản xuất 16/16 capture proofs độc bản với 16 mã băm SHA-256 riêng biệt. | **READY_FOR_CEO_REVIEW** |

---

### II. HỢP ĐỒNG SỐ LIỆU CÔNG KHAI THỐNG NHẤT (UNIFIED COUNT CONTRACT DW)

Theo [`07_QUALITY_ASSURANCE/staging_dw_unified_count_contract.json`](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/07_QUALITY_ASSURANCE/staging_dw_unified_count_contract.json):

| Hạng mục Dữ liệu | Số lượng | Chi tiết Phân rã | Trạng thái Reconcile |
| :--- | :---: | :--- | :---: |
| **1. Public Tiered Items** | **50** | 0 Deal (T1) + 20 Chương trình (T2) + 14 Tiện ích (T3) + 16 Radar (T4) | **100% MATCH** |
| **2. Navigation Khám phá** | **50** | Nhãn giao diện: `Khám phá (50)` | **100% MATCH** |
| **3. Navigation Chương trình** | **13** | Nhãn giao diện: `Chương Trình (13)` (10 Cổng chính thức + 3 Radar) | **100% MATCH** |
| **4. Journey Category Counters** | **50** | 11 Ẩm thực + 27 Đi chơi + 14 Tiện ích + 12 Mua sắm/học tập | **100% MATCH** |
| **5. Canonical Sources (Vault vs Scorecard)** | **7** | 7 tệp artifact nguồn chính thức trong kho = 7 trên scorecard | **100% RECONCILED** |

---

### III. BẢNG ĐIỂM NGUỒN CUNG TOÀN DIỆN (SUPPLY PIPELINE SCORECARD DW)

| Giai đoạn Pipeline | Số lượng Items | Định nghĩa & Trạng thái |
| :--- | :---: | :--- |
| **1. DISCOVERY_LEAD** | **1** | `CAND_BUN_CHA_CA_109` (cô lập khỏi domain chính quyền chung `danang.gov.vn`). |
| **2. CAPTURE_RETRY_REQUIRED** | **1** | `CAND_COM_GA_A_HAI` (Facebook login/script barrier $\rightarrow$ `UNVERIFIED_BLOCKED_DYNAMIC_SHELL`). |
| **3. CANONICAL_SOURCE_FOUND** | **7** | `TNGO`, `METIZ`, `STARLIGHT`, `DOMINOS`, `GITHUB_EDU`, `JETBRAINS_EDU`, `HIGHLANDS`. |
| **4. CAPTURE_PENDING** | **5** | Đang xếp hàng đối soát biểu giá/quy chế chi tiết. |
| **5. EVIDENCE_COMPLETE** | **0** | Đầy đủ hợp đồng/chứng cứ giá thực. |
| **6. PUBLIC_TOTAL_ACTIVE** | **50** | **20 Cổng chính thức (T2) + 14 Tiện ích công cộng (T3) + 16 Radar theo dõi (T4)**. |
| **7. T1_DEAL_ELIGIBLE** | **0** | **Khóa Fail-closed (0 Deal thương mại khi chưa có hợp đồng kiểm định giá thực DH)**. |

---

### IV. BỘ 16 BẢN GHI CAPTURE PROOF MỚI (BROWSER PACK DW)

Toàn bộ 16 ảnh chụp kiểm thử tự động tại thời điểm live server hoạt động đạt **16/16 mã băm SHA-256 hoàn toàn riêng biệt**, được lưu trữ tại `07_QUALITY_ASSURANCE/browser_pack_dw/`:

1. `00_desktop_1440_visual_slate_proof.png` (1.086.630 bytes, SHA-256: `067b5489b667e1a3...`)
2. `01_desktop_1440_landmark_hero.png` (537.492 bytes, SHA-256: `cf7993ce6df7df43...`)
3. `02_desktop_1440_featured_deals.png` (193.850 bytes, SHA-256: `63d4e8c187be0896...`)
4. `03_desktop_1440_culinary_story.png` (205.811 bytes, SHA-256: `65074f9d2be2c10b...`)
5. `04_desktop_1440_transit_story.png` (523.518 bytes, SHA-256: `a16a8270ca88d0fe...`)
6. `05_desktop_1440_leisure_story.png` (506.772 bytes, SHA-256: `623b05423851b269...`)
7. `06_desktop_1440_three_lane_wallet.png` (173.296 bytes, SHA-256: `345e5fd2c4ff05f4...`)
8. `07_desktop_1440_explore_directory.png` (81.645 bytes, SHA-256: `d62edd93abb33c71...`)
9. `08_desktop_1440_dark_mode.png` (493.316 bytes, SHA-256: `0a5042271affbdb5...`)
10. `09_desktop_1440_reduced_motion.png` (391.803 bytes, SHA-256: `2e5a0b7af38f49f6...`)
11. `10_tablet_768_modern_bento.png` (361.477 bytes, SHA-256: `f32c25818d6048c0...`)
12. `11_mobile_390_fresh_load_first_fold.png` (171.182 bytes, SHA-256: `22bd1cb1a69af9d7...`)
13. `12_mobile_390_food_journey_route.png` (50.982 bytes, SHA-256: `fec647617fc57259...`)
14. `13_mobile_390_three_lane_wallet.png` (71.679 bytes, SHA-256: `65dee707024343f6...`)
15. `14_progressive_disclosure_drawer_open.png` (286.703 bytes, SHA-256: `302c52d2173e05ac...`)
16. `15_buy_decision_interactive.png` (72.512 bytes, SHA-256: `95d82e650457f1a3...`)

---

### V. CAM KẾT VẬN HÀNG & HÀNG RÀO AN TOÀN

1. **Khóa phát hành Production:** Tiếp tục duy trì trên Staging local `http://127.0.0.1:4173/`, không phát tán ra production khi chưa có phê duyệt từ CEO.
2. **Không Affiliate write / Zero-PII:** Duy trì 100% không chèn mã affiliate, không thu thập cookie hay secret của người dùng.
3. **Kính trình CEO trực tiếp mở trình duyệt kiểm tra live tại `http://127.0.0.1:4173/` và kiểm tra hợp đồng số liệu tại `07_QUALITY_ASSURANCE/staging_dw_unified_count_contract.json`.**
