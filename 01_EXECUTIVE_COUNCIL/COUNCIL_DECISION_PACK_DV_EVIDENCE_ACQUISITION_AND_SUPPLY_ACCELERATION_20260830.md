# BỘ HỒ SƠ HỘI ĐỒNG LIÊN BỘ — JAYT SECTION DV
## THU CHỨNG CỨ TRỰC TIẾP, MỞ RỘNG COHORT 30 ỨNG VIÊN & XÂY DỰNG DANH MỤC AFFILIATE OFFLINE

**Mã hồ sơ:** `COUNCIL_DECISION_PACK_DV_EVIDENCE_ACQUISITION_AND_SUPPLY_ACCELERATION_20260830`  
**Phiên bản Staging SOT:** `v3.450.0-staging.dv`  
**Chỉ thị chỉ đạo:** JAYT-245 Mục DV (Dòng 2983–3003)  
**Địa chỉ Staging hoạt động:** `http://127.0.0.1:4173/`  
**HTTP Status:** `200 OK` (Content-Type: `text/html; charset=utf-8`)  
**Thời gian lập hồ sơ:** 2026-08-30T15:16:00+07:00  
**Trạng thái Quản trị:** `PENDING_CEO_LIVE_REVIEW` (Tiếp tục nâng cấp, không Go-Live)

---

### I. BIÊN BẢN ĐÁNH GIÁ 7 PHÒNG BAN LIÊN BỘ (SECTION DV)

| Phòng ban | Báo cáo hành động thực tế | Trạng thái kỹ thuật |
| :--- | :--- | :---: |
| **1. Product** | **Mở rộng Cohort 30 Ứng viên Theo 6 Nhu Cầu Cộng Đồng:** Xây dựng danh sách theo dõi 30 candidate trên 6 nhóm nhu cầu (Ăn trưa, Rạp chiếu/giải trí, Transit, KTX/tự học, Học tập/công cụ số, Tiện ích đô thị). Mọi candidate giữ nguyên pipeline stage từ lead đến verified. | **READY_FOR_CEO_REVIEW** |
| **2. Design** | Giữ vững surface F&B no-image Huỳnh Thúc Kháng với icon nhận diện `🍜`, bố cục tương phản cao, typography chuẩn mực; duy trì 3 visual card rights-pass có subject-matching chuẩn xác. | **READY_FOR_CEO_REVIEW** |
| **3. UX/CX** | **Minh bạch hóa Bằng chứng trong Detail Drawer:** Hiển thị khối `🔍 Bằng Chứng Nguồn Tin & Đối Soát Thực Tế (Section DV)` nêu rõ trường nào đã xác nhận từ nguồn chính thức và trường nào `⚠️ Chưa có dữ liệu điều kiện hiện hành` (khuyến nghị đối soát trực tiếp tại nguồn). | **READY_FOR_CEO_REVIEW** |
| **4. Growth** | **Thiết lập Danh mục Affiliate Nghiên cứu Offline (Read-Only):** Lưu tại `00_PROGRAM_BASELINE/JAYT_AFFILIATE_RESEARCH_PORTFOLIO_OFFLINE.json`, ánh xạ nhu cầu sinh viên, merchant chính thức, coupon-source field. **Cam kết 0 affiliate deeplink, 0 cookie, 0 write API**. | **READY_FOR_CEO_REVIEW** |
| **5. Data & Trust** | **Thực Hiện Sprint Thu Bằng Chứng Trực Tiếp (Live Direct Captures):** Thu thập trực tiếp **7 artifact mới** từ mạng live (TNGo, Metiz, Starlight, Domino's, GitHub Edu, JetBrains Edu, Highlands Coffee) kèm thời điểm fetch thực tế `15:15Z`, nâng tổng kho vật chứng lên **12 artifacts**. | **READY_FOR_CEO_REVIEW** |
| **6. Engineering** | Biên dịch và phân phối SOT `jayt_storefront_staging_dv.js`, phục vụ ổn định trên máy chủ Staging `http://127.0.0.1:4173/` (`HTTP 200 OK`), **0 lỗi console error/warning**. | **READY_FOR_CEO_REVIEW** |
| **7. QA** | Quét toàn diện **100% phần tử focusable visible** (Desktop 48 items, Mobile 46 items) đều đạt $\ge 44\times 44\text{px}$ (**0 vi phạm**); kiểm thử 39/39 static contract & cohort checks; sản xuất 16/16 capture proofs độc bản với 16 mã băm SHA-256 riêng biệt. | **READY_FOR_CEO_REVIEW** |

---

### II. BẢNG TỔNG KHO VẬT CHỨNG TRỰC TIẾP (EVIDENCE VAULT MANIFEST DV)

Toàn bộ 12 file vật chứng trong [`07_QUALITY_ASSURANCE/evidence_vault_dv/`](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/07_QUALITY_ASSURANCE/evidence_vault_dv/):

| Candidate ID | File Artifact DV | Byte Size | SHA-256 Checksum | Loại Thu Thập |
| :--- | :--- | :---: | :--- | :---: |
| `CAND_BUN_CHA_CA_109` | `artifact_cand_bun_cha_ca_109_city_portal_root.html` | 621.777 | `dd18d5d46d5fbe0a...` | Reused Base (DS Lineage) |
| `CAND_COM_GA_A_HAI` | `artifact_cand_com_ga_a_hai_facebook_shell.html` | 1.542 | `d89fff9b319c7a71...` | Reused Base (DS Lineage) |
| `CAND_THU_VIEN_DUT` | `artifact_cand_thu_vien_dut_catalog.html` | 4.658 | `4cb75cbe95a5705f...` | Reused Base (DS Lineage) |
| `CAND_THU_VIEN_DUND` | `artifact_cand_thu_vien_dund_portal.html` | 294.832 | `876f6967a9ac696c...` | Reused Base (DS Lineage) |
| `CAND_BUS_R16A` | `artifact_cand_bus_r16a_transit_portal.html` | 115.281 | `db237f074590e2d8...` | Reused Base (DS Lineage) |
| `CAND_TNGO_BIKE` | `artifact_cand_tngo_bike_portal.html` | 52.968 | `b34fdd823b465060...` | **Direct Live Capture (DV)** |
| `CAND_METIZ_CINEMA` | `artifact_cand_metiz_cinema_portal.html` | 53.334 | `4b539543df6256ea...` | **Direct Live Capture (DV)** |
| `CAND_STARLIGHT_CINEMA` | `artifact_cand_starlight_cinema_portal.html` | 101.350 | `becf409e3cc139f0...` | **Direct Live Capture (DV)** |
| `CAND_DOMINOS_PIZZA` | `artifact_cand_dominos_pizza_portal.html` | 51.512 | `9f78d30d6740ee63...` | **Direct Live Capture (DV)** |
| `CAND_GITHUB_STUDENT_PACK` | `artifact_cand_github_student_pack.html` | 271.480 | `1610df187f054b82...` | **Direct Live Capture (DV)** |
| `CAND_JETBRAINS_STUDENT_PACK` | `artifact_cand_jetbrains_student_pack.html` | 61.554 | `0c279ee631089fba...` | **Direct Live Capture (DV)** |
| `CAND_HIGHLANDS_COFFEE` | `artifact_cand_highlands_coffee_portal.html` | 29.929 | `03c0029c058ebe9b...` | **Direct Live Capture (DV)** |

---

### III. BẢNG ĐIỂM NGUỒN CUNG TOÀN DIỆN (SUPPLY PIPELINE SCORECARD DV)

| Giai đoạn Pipeline | Số lượng Items | Định nghĩa & Trạng thái |
| :--- | :---: | :--- |
| **1. DISCOVERY_LEAD** | **1** | `CAND_BUN_CHA_CA_109` (cô lập khỏi domain chính quyền chung `danang.gov.vn`). |
| **2. CAPTURE_RETRY_REQUIRED** | **1** | `CAND_COM_GA_A_HAI` (Facebook login/script barrier $\rightarrow$ `UNVERIFIED_BLOCKED_DYNAMIC_SHELL`). |
| **3. CANONICAL_SOURCE_FOUND** | **4** | `CAND_TNGO_BIKE`, `CAND_METIZ_CINEMA`, `CAND_STARLIGHT_CINEMA`, `CAND_GITHUB_STUDENT_PACK`. |
| **4. CAPTURE_PENDING** | **8** | Đang xếp hàng đối soát biểu giá/quy chế chi tiết. |
| **5. EVIDENCE_COMPLETE** | **0** | Đầy đủ hợp đồng/chứng cứ giá thực. |
| **6. PUBLIC_TOTAL_ACTIVE** | **50** | **20 Cổng chính thức (T2) + 14 Tiện ích công cộng (T3) + 16 Radar theo dõi (T4)**. |
| **7. T1_DEAL_ELIGIBLE** | **0** | **Khóa Fail-closed (0 Deal thương mại khi chưa có hợp đồng kiểm định giá thực DH)**. |

---

### IV. BỘ 16 BẢN GHI CAPTURE PROOF MỚI (BROWSER PACK DV)

Toàn bộ 16 ảnh chụp kiểm thử tự động tại thời điểm live server hoạt động đạt **16/16 mã băm SHA-256 hoàn toàn riêng biệt**, được lưu trữ tại `07_QUALITY_ASSURANCE/browser_pack_dv/`:

1. `00_desktop_1440_visual_slate_proof.png` (1.086.630 bytes, SHA-256: `067b5489b667e1a3...`)
2. `01_desktop_1440_landmark_hero.png` (537.492 bytes, SHA-256: `cf7993ce6df7df43...`)
3. `02_desktop_1440_featured_deals.png` (193.850 bytes, SHA-256: `63d4e8c187be0896...`)
4. `03_desktop_1440_culinary_story.png` (205.811 bytes, SHA-256: `65074f9d2be2c10b...`)
5. `04_desktop_1440_transit_story.png` (523.518 bytes, SHA-256: `a16a8270ca88d0fe...`)
6. `05_desktop_1440_leisure_story.png` (506.772 bytes, SHA-256: `623b05423851b269...`)
7. `06_desktop_1440_three_lane_wallet.png` (173.418 bytes, SHA-256: `b42745df80507754...`)
8. `07_desktop_1440_explore_directory.png` (81.456 bytes, SHA-256: `1a15a547b861d86f...`)
9. `08_desktop_1440_dark_mode.png` (493.292 bytes, SHA-256: `f59b8611b59544ec...`)
10. `09_desktop_1440_reduced_motion.png` (391.922 bytes, SHA-256: `84040bcc6e388eac...`)
11. `10_tablet_768_modern_bento.png` (361.392 bytes, SHA-256: `8845fc8f271d3576...`)
12. `11_mobile_390_fresh_load_first_fold.png` (171.098 bytes, SHA-256: `ad64347a436ee885...`)
13. `12_mobile_390_food_journey_route.png` (50.897 bytes, SHA-256: `4d5e7acac6bb57c6...`)
14. `13_mobile_390_three_lane_wallet.png` (71.588 bytes, SHA-256: `8070a3547d5d1169...`)
15. `14_progressive_disclosure_drawer_open.png` (286.593 bytes, SHA-256: `901c32cdddddfc2a...`)
16. `15_buy_decision_interactive.png` (72.275 bytes, SHA-256: `b339edbf018c2c85...`)

---

### V. CAM KẾT VẬN HÀNH & HÀNG RÀO AN TOÀN

1. **Khóa phát hành Production:** Tiếp tục duy trì trên Staging local `http://127.0.0.1:4173/`, không phát tán ra production khi chưa có phê duyệt từ CEO.
2. **Không Affiliate write / Zero-PII:** Duy trì 100% không chèn mã affiliate, không thu thập cookie hay secret của người dùng.
3. **Kính trình CEO trực tiếp mở trình duyệt kiểm tra live tại `http://127.0.0.1:4173/` và kiểm tra kho vật chứng tại `07_QUALITY_ASSURANCE/evidence_vault_dv/`.**
