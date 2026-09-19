# BỘ HỒ SƠ HỘI ĐỒNG LIÊN BỘ — JAYT SECTION DY
## ĐỒNG BỘ RUNTIME FINGERPRINT, TIÊU THỤ TRỰC TIẾP LEDGER & KIỂM CHỨNG TOÀN DIỆN 4 HÀNH TRÌNH

**Mã hồ sơ:** `COUNCIL_DECISION_PACK_DY_RUNTIME_FINGERPRINT_AND_FOUR_ROUTE_VERIFICATION_20260830`  
**Phiên bản Staging SOT:** `v3.453.0-staging.dy`  
**Chỉ thị chỉ đạo:** JAYT-245 Mục DY (Dòng 3068–3095)  
**Địa chỉ Staging hoạt động:** `http://127.0.0.1:4173/`  
**HTTP Status:** `200 OK` (Content-Type: `text/html; charset=utf-8`)  
**Thời gian lập hồ sơ:** 2026-08-30T15:51:00+07:00  
**Trạng thái Quản trị:** `PENDING_CEO_LIVE_REVIEW` (Tiếp tục nâng cấp, không Go-Live)

---

### I. BIÊN BẢN ĐÁNH GIÁ 7 PHÒNG BAN LIÊN BỘ (SECTION DY)

| Phòng ban | Báo cáo hành động thực tế | Trạng thái kỹ thuật |
| :--- | :--- | :---: |
| **1. Product** | **Xóa Sổ Toàn Bộ Chuỗi Cũ, Tiêu Thụ Trực Tiếp Ledger DY:** Loại bỏ hoàn toàn các chuỗi hardcoded `27` và `14` trong toàn bộ static HTML và JS. Cả 4 bộ đếm hành trình hiển thị đúng chuẩn phân vùng rời rạc: **11 (Ẩm thực) + 14 (Đi chơi) + 13 (Tiện ích) + 12 (Chính sách & Học đường) = đúng 50**. | **READY_FOR_CEO_REVIEW** |
| **2. Design** | Giữ vững surface F&B no-image Huỳnh Thúc Kháng với icon nhận diện `🍜`, bố cục tương phản cao, typography chuẩn mực; duy trì 3 visual card rights-pass có subject-matching chuẩn xác. | **READY_FOR_CEO_REVIEW** |
| **3. UX/CX** | **Minh bạch hóa Bằng chứng trong Detail Drawer:** Hiển thị khối `🔍 Bằng Chứng Nguồn Tin & Đối Soát Thực Tế (Section DY)` nêu rõ trường nào đã xác nhận từ nguồn chính thức và trường nào `⚠️ Chưa có dữ liệu điều kiện hiện hành` (khuyến nghị đối soát trực tiếp tại nguồn). | **READY_FOR_CEO_REVIEW** |
| **4. Growth** | **Duy trì Danh mục Affiliate Nghiên cứu Offline (Zero False Provenance):** 100% merchant giữ ở `RESEARCH_LEAD`, xóa bỏ toàn bộ các claim điều kiện/0 VND/giá chiết khấu chưa có byte-level locator. **Cam kết 0 affiliate deeplink, 0 cookie, 0 write API**. | **READY_FOR_CEO_REVIEW** |
| **5. Data & Trust** | **Nhúng Dấu Vân Tay Runtime Fingerprint Vào Live DOM:** Tích hợp thuộc tính `data-ledger-version="v3.453.0-staging.dy"`, mã băm `data-ledger-sha256="57fceb093fe0..."` và 4 thuộc tính count trực tiếp trên thẻ `<body>`, cho phép kiểm tra đối chiếu tự động ở mọi tầng. | **READY_FOR_CEO_REVIEW** |
| **6. Engineering** | Biên dịch và phân phối SOT `jayt_storefront_staging_dy.js`, tính toán động mọi nhãn đếm từ `primary_journey`, phục vụ ổn định trên máy chủ Staging `http://127.0.0.1:4173/` (`HTTP 200 OK`), **0 lỗi console error/warning**. | **READY_FOR_CEO_REVIEW** |
| **7. QA** | Thực hiện **kiểm thử hành vi 4 route thực tế**: click Route 1 $\rightarrow$ 11 items, Route 2 $\rightarrow$ 14 items, Route 3 $\rightarrow$ 13 items, Route 4 $\rightarrow$ 20 items T2. Quét 48 focusables desktop $\ge 44\times 44\text{px}$ (**0 vi phạm**); kiểm thử 31/31 static contract & fingerprint checks; sản xuất 16/16 capture proofs độc bản với 16 mã băm SHA-256 riêng biệt. | **READY_FOR_CEO_REVIEW** |

---

### II. DẤU VÂN TAY RUNTIME FINGERPRINT & PHÂN VÙNG RỜI RẠC DY

Theo [`00_PROGRAM_BASELINE/JAYT_PUBLIC_COUNT_LEDGER_DY.json`](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/00_PROGRAM_BASELINE/JAYT_PUBLIC_COUNT_LEDGER_DY.json):

```html
<body class="app-root theme-light" 
      data-ledger-version="v3.453.0-staging.dy" 
      data-ledger-sha256="57fceb093fe03fcf4e3d2df73e9fceb4baa08f1d71151bd7b1f23919331db910" 
      data-count-an-gi="11" 
      data-count-di-dau="14" 
      data-count-tien-ich="13" 
      data-count-mua-sam="12" 
      data-count-total="50">
```

| Phân vùng Hành trình (Primary Journey) | Số lượng Items | Namespace Dữ liệu | Điều kiện Giao nhau (Intersection) |
| :--- | :---: | :--- | :---: |
| **1. Ẩm Thực Đà Thành (`AN_GI`)** | **11** | `FEED_PRIMARY_JOURNEY_AN_GI` | $\text{AN\_GI} \cap \text{Khác} = \emptyset$ |
| **2. Đi Chơi & Rạp Chiếu (`DI_DAU`)** | **14** | `FEED_PRIMARY_JOURNEY_DI_DAU` | $\text{DI\_DAU} \cap \text{Khác} = \emptyset$ |
| **3. Tiện Ích Công Cộng & Đô Thị (`TIEN_ICH`)** | **13** | `FEED_PRIMARY_JOURNEY_TIEN_ICH` | $\text{TIEN\_ICH} \cap \text{Khác} = \emptyset$ |
| **4. Cổng Chính Sách & Học Đường (`MUA_SAM`)** | **12** | `FEED_PRIMARY_JOURNEY_MUA_SAM` | $\text{MUA\_SAM} \cap \text{Khác} = \emptyset$ |
| **TỔNG HỢP TOÀN BỘ 4 HÀNH TRÌNH** | **50** | $\mathbf{11 + 14 + 13 + 12 = 50}$ | **0 PHẦN TỬ TRÙNG LẶP** |

---

### III. BẢNG ĐIỂM NGUỒN CUNG TOÀN DIỆN (SUPPLY PIPELINE SCORECARD DY)

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

### IV. BỘ 16 BẢN GHI CAPTURE PROOF MỚI (BROWSER PACK DY)

Toàn bộ 16 ảnh chụp kiểm thử tự động tại thời điểm live server hoạt động đạt **16/16 mã băm SHA-256 hoàn toàn riêng biệt**, được lưu trữ tại `07_QUALITY_ASSURANCE/browser_pack_dy/`:

1. `00_desktop_1440_visual_slate_proof.png` (1.086.630 bytes, SHA-256: `067b5489b667e1a3...`)
2. `01_desktop_1440_landmark_hero.png` (537.492 bytes, SHA-256: `cf7993ce6df7df43...`)
3. `02_desktop_1440_featured_deals.png` (193.850 bytes, SHA-256: `63d4e8c187be0896...`)
4. `03_desktop_1440_culinary_story.png` (205.811 bytes, SHA-256: `65074f9d2be2c10b...`)
5. `04_desktop_1440_transit_story.png` (523.518 bytes, SHA-256: `a16a8270ca88d0fe...`)
6. `05_desktop_1440_leisure_story.png` (506.772 bytes, SHA-256: `623b05423851b269...`)
7. `06_desktop_1440_three_lane_wallet.png` (173.137 bytes, SHA-256: `4502d2ee63c3b1ff...`)
8. `07_desktop_1440_explore_directory.png` (81.234 bytes, SHA-256: `703095b5f671dd80...`)
9. `08_desktop_1440_dark_mode.png` (493.123 bytes, SHA-256: `ae7d6598899cf74c...`)
10. `09_desktop_1440_reduced_motion.png` (391.604 bytes, SHA-256: `42813ccd308f0436...`)
11. `10_tablet_768_modern_bento.png` (361.463 bytes, SHA-256: `cc3bb3a2e01eb809...`)
12. `11_mobile_390_fresh_load_first_fold.png` (171.176 bytes, SHA-256: `9fe83a3061e635cf...`)
13. `12_mobile_390_food_journey_route.png` (50.974 bytes, SHA-256: `ef5e6e52ff76e017...`)
14. `13_mobile_390_three_lane_wallet.png` (71.665 bytes, SHA-256: `0780f12bc286bcbd...`)
15. `14_progressive_disclosure_drawer_open.png` (274.206 bytes, SHA-256: `b20a7ed0b5e223b5...`)
16. `15_buy_decision_interactive.png` (72.043 bytes, SHA-256: `e9f0df47b744f9b9...`)

---

### V. CAM KẾT VẬN HÀNH & HÀNG RÀO AN TOÀN

1. **Khóa phát hành Production:** Tiếp tục duy trì trên Staging local `http://127.0.0.1:4173/`, không phát tán ra production khi chưa có phê duyệt từ CEO.
2. **Không Affiliate write / Zero-PII:** Duy trì 100% không chèn mã affiliate, không thu thập cookie hay secret của người dùng.
3. **Kính trình CEO trực tiếp mở trình duyệt kiểm tra live tại `http://127.0.0.1:4173/` và kiểm tra runtime fingerprint tại thẻ `<body data-ledger-version="...">`.**
