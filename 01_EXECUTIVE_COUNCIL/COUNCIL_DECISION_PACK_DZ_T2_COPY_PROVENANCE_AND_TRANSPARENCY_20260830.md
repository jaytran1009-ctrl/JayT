# BỘ HỒ SƠ HỘI ĐỒNG LIÊN BỘ — JAYT SECTION DZ
## LÀM SẠCH PROVENANCE COPY T2, CÔ LẬP CLAIM ĐIỀU KIỆN CHƯA CÓ LOCATOR & MINH BẠCH HÓA NGUỒN CHÍNH THỨC

**Mã hồ sơ:** `COUNCIL_DECISION_PACK_DZ_T2_COPY_PROVENANCE_AND_TRANSPARENCY_20260830`  
**Phiên bản Staging SOT:** `v3.454.0-staging.dz`  
**Chỉ thị chỉ đạo:** JAYT-245 Mục DZ (Dòng 3098–3125)  
**Địa chỉ Staging hoạt động:** `http://127.0.0.1:4173/`  
**HTTP Status:** `200 OK` (Content-Type: `text/html; charset=utf-8`)  
**Thời gian lập hồ sơ:** 2026-08-30T16:00:00+07:00  
**Trạng thái Quản trị:** `PENDING_CEO_LIVE_REVIEW` (Tiếp tục nâng cấp, không Go-Live)

---

### I. BIÊN BẢN ĐÁNH GIÁ 7 PHÒNG BAN LIÊN BỘ (SECTION DZ)

| Phòng ban | Báo cáo hành động thực tế | Trạng thái kỹ thuật |
| :--- | :--- | :---: |
| **1. Product** | **Loại Bỏ 100% Claim Quyền Lợi/Điều Kiện Chưa Có Locator Trong T2:** Thay thế toàn bộ các mô tả chi tiết gói/Copilot/IDE/quy chế bằng microcopy hướng dẫn mở cổng chính thức để kiểm tra điều kiện áp dụng tại nguồn. Giữ vững giá trị định hướng tra cứu trung thực. | **READY_FOR_CEO_REVIEW** |
| **2. Design** | Giữ vững surface F&B no-image Huỳnh Thúc Kháng với icon nhận diện `🍜`, bố cục tương phản cao, typography chuẩn mực; duy trì 3 visual card rights-pass có subject-matching chuẩn xác. | **READY_FOR_CEO_REVIEW** |
| **3. UX/CX** | **Minh bạch hóa Bằng chứng trong Detail Drawer & Card Copy:** Hiển thị rõ ràng khuyến nghị: `JayT chưa đối soát điều kiện chi tiết; vui lòng kiểm tra trực tiếp tại cổng chính thức của đơn vị vận hành.` Nút CTA chuẩn hóa thành `🏛️ Mở cổng chính thức để kiểm tra điều kiện →`. | **READY_FOR_CEO_REVIEW** |
| **4. Growth** | **Duy trì Danh mục Affiliate Nghiên cứu Offline (Zero False Provenance):** 100% merchant giữ ở `RESEARCH_LEAD`, xóa bỏ toàn bộ các claim điều kiện/0 VND/giá chiết khấu chưa có byte-level locator. **Cam kết 0 affiliate deeplink, 0 cookie, 0 write API**. | **READY_FOR_CEO_REVIEW** |
| **5. Data & Trust** | **Thiết Lập Ma Trận Copy Provenance DZ:** Xuất bản `07_QUALITY_ASSURANCE/staging_dz_copy_provenance_matrix.json`, phân loại 20 T2 thành `PORTAL_IDENTITY_VERIFIED` và 50 item thành `UNKNOWN_TERMS_DISCLAIMED`. Nhúng vân tay `data-ledger-sha256="772f6eea30ad..."` vào runtime DOM. | **READY_FOR_CEO_REVIEW** |
| **6. Engineering** | Biên dịch và phân phối SOT `jayt_storefront_staging_dz.js`, loại bỏ sạch mọi chuỗi unverified claim trong cả runtime JS và pre-rendered HTML, phục vụ ổn định trên máy chủ Staging `http://127.0.0.1:4173/` (`HTTP 200 OK`), **0 lỗi console error/warning**. | **READY_FOR_CEO_REVIEW** |
| **7. QA** | Thực hiện quét toàn bộ text rendered DOM, drawer, ví quyền lợi: **0 vi phạm thuật ngữ Copilot/IDE bundle/0 đồng**; kiểm thử 36/36 static contract & copy provenance checks; sản xuất 16/16 capture proofs độc bản với 16 mã băm SHA-256 riêng biệt. | **READY_FOR_CEO_REVIEW** |

---

### II. DẤU VÂN TAY RUNTIME FINGERPRINT & MA TRẬN PHÂN LOẠI COPY DZ

Theo [`00_PROGRAM_BASELINE/JAYT_PUBLIC_COUNT_LEDGER_DZ.json`](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/00_PROGRAM_BASELINE/JAYT_PUBLIC_COUNT_LEDGER_DZ.json) và [`07_QUALITY_ASSURANCE/staging_dz_copy_provenance_matrix.json`](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/07_QUALITY_ASSURANCE/staging_dz_copy_provenance_matrix.json):

```html
<body class="app-root theme-light" 
      data-ledger-version="v3.454.0-staging.dz" 
      data-ledger-sha256="772f6eea30ad8c90c6fc21dc6ddc580f5c966e9de5ba6d94f2e37af2fa5081b2" 
      data-count-an-gi="11" 
      data-count-di-dau="14" 
      data-count-tien-ich="13" 
      data-count-mua-sam="12" 
      data-count-total="50">
```

| Lớp Phân Loại Copy | Số Lượng Items | Mô Tả Quy Chuẩn | Ví Dụ Đã Áp Dụng |
| :--- | :---: | :--- | :--- |
| **1. `PORTAL_IDENTITY_VERIFIED`** | **20** | Đã xác thực định danh cổng và URL chính thức từ canonical source artifact. Chỉ nêu tên cổng và link chính thức. | `GitHub Education: Cổng Chương Trình Học Đường`, `Notion: Cổng Chương Trình Học Đường`. |
| **2. `PROGRAMME_TERMS_VERIFIED`** | **0** | Đã có locator byte-level chứng thực điều kiện/biểu phí trong vault. (Hiện tại 0 mục đạt chuẩn này). | *Chưa có mục nào được công bố là đã chứng thực điều kiện.* |
| **3. `UNKNOWN_TERMS_DISCLAIMED`** | **50** | Hiển thị thông báo minh bạch: "JayT chưa đối soát điều kiện chi tiết; kiểm tra tại nguồn". | Toàn bộ 50 thẻ cẩm nang và 13 thẻ ví quyền lợi đều hiển thị disclaimer minh bạch. |

---

### III. BẢNG ĐIỂM NGUỒN CUNG TOÀN DIỆN (SUPPLY PIPELINE SCORECARD DZ)

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

### IV. BỘ 16 BẢN GHI CAPTURE PROOF MỚI (BROWSER PACK DZ)

Toàn bộ 16 ảnh chụp kiểm thử tự động tại thời điểm live server hoạt động đạt **16/16 mã băm SHA-256 hoàn toàn riêng biệt**, được lưu trữ tại `07_QUALITY_ASSURANCE/browser_pack_dz/`:

1. `00_desktop_1440_visual_slate_proof.png` (1.086.630 bytes, SHA-256: `067b5489b667e1a3...`)
2. `01_desktop_1440_landmark_hero.png` (537.492 bytes, SHA-256: `cf7993ce6df7df43...`)
3. `02_desktop_1440_featured_deals.png` (193.850 bytes, SHA-256: `63d4e8c187be0896...`)
4. `03_desktop_1440_culinary_story.png` (205.811 bytes, SHA-256: `65074f9d2be2c10b...`)
5. `04_desktop_1440_transit_story.png` (523.518 bytes, SHA-256: `a16a8270ca88d0fe...`)
6. `05_desktop_1440_leisure_story.png` (506.772 bytes, SHA-256: `623b05423851b269...`)
7. `06_desktop_1440_three_lane_wallet.png` (179.657 bytes, SHA-256: `393acaf3d51c793b...`)
8. `07_desktop_1440_explore_directory.png` (81.419 bytes, SHA-256: `622cb51ca9b7a902...`)
9. `08_desktop_1440_dark_mode.png` (493.166 bytes, SHA-256: `cf092cea9d8ef03e...`)
10. `09_desktop_1440_reduced_motion.png` (394.522 bytes, SHA-256: `0073999576b11512...`)
11. `10_tablet_768_modern_bento.png` (361.361 bytes, SHA-256: `1cac7dc66cb719b3...`)
12. `11_mobile_390_fresh_load_first_fold.png` (171.170 bytes, SHA-256: `8c4b803d746780c7...`)
13. `12_mobile_390_food_journey_route.png` (50.967 bytes, SHA-256: `1f30b9d9ce5efca9...`)
14. `13_mobile_390_three_lane_wallet.png` (69.069 bytes, SHA-256: `b01e65ee043c6d0d...`)
15. `14_progressive_disclosure_drawer_open.png` (278.807 bytes, SHA-256: `b5ab619503292ba6...`)
16. `15_buy_decision_interactive.png` (72.288 bytes, SHA-256: `1f68ffb76cd949ea...`)

---

### V. CAM KẾT VẬN HÀNH & HÀNG RÀO AN TOÀN

1. **Khóa phát hành Production:** Tiếp tục duy trì trên Staging local `http://127.0.0.1:4173/`, không phát tán ra production khi chưa có phê duyệt từ CEO.
2. **Không Affiliate write / Zero-PII:** Duy trì 100% không chèn mã affiliate, không thu thập cookie hay secret của người dùng.
3. **Kính trình CEO trực tiếp mở trình duyệt kiểm tra live tại `http://127.0.0.1:4173/` và kiểm tra các thẻ T2 đã được làm sạch provenance copy.**
