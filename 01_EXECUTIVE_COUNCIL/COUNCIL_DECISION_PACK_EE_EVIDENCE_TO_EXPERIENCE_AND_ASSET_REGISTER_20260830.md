# BỘ HỒ SƠ HỘI ĐỒNG LIÊN BỘ — JAYT SECTION EE
## EVIDENCE-TO-EXPERIENCE: NẠP BẰNG CHỨNG THEO 4 COHORT, THIẾT LẬP SỔ TÀI SẢN ẢNH CÓ QUYỀN & MỞ RỘNG 3 LỐI VÀO TRẢI NGHIỆM AN TOÀN

**Mã hồ sơ:** `COUNCIL_DECISION_PACK_EE_EVIDENCE_TO_EXPERIENCE_AND_ASSET_REGISTER_20260830`  
**Phiên bản Staging SOT:** `v3.459.0-staging.ee`  
**Chỉ thị chỉ đạo:** JAYT-245 Mục EE (Dòng 3251–3279)  
**Địa chỉ Staging hoạt động:** `http://127.0.0.1:4173/`  
**HTTP Status:** `200 OK` (Content-Type: `text/html; charset=utf-8`)  
**Thời gian lập hồ sơ:** 2026-08-30T18:46:00+07:00  
**Trạng thái Quản trị:** `PENDING_CEO_LIVE_REVIEW` (Tiếp tục nâng cấp, không Go-Live)

---

### I. BIÊN BẢN ĐÁNH GIÁ 7 PHÒNG BAN LIÊN BỘ (SECTION EE)

| Phòng ban | Báo cáo hành động thực tế | Trạng thái kỹ thuật |
| :--- | :--- | :---: |
| **1. Product** | **Evidence-to-Experience & 3 Lối Vào Thực Dụng:** Cấu trúc trải nghiệm cẩm nang quanh 3 lối vào hữu ích (`Dùng hôm nay`, `Chương trình chính thức`, `Kiểm tra trước khi mua`). Card pending nêu rõ nguồn và phạm vi, tuyệt đối không hứa hẹn deal/voucher giả. | **READY_FOR_CEO_REVIEW** |
| **2. Design** | **Sổ Đăng Ký Tài Sản Hình Ảnh Có Bản Quyền (Asset Register EE):** Thiết lập `staging_ee_asset_register.json` quản lý 32 tệp đồ họa/ảnh thực địa Đà Nẵng với đầy đủ tác giả, giấy phép (`VERIFIED_EDITORIAL_COMMUNITY_USE`), alt text và quy cách responsive; không sử dụng ảnh AI gắn mác ảnh thật. | **READY_FOR_CEO_REVIEW** |
| **3. UX/CX** | **Minh Bạch Thông Tin & Bảo Vệ Khách Hàng:** 100% card khám phá hiển thị nút dẫn về Cổng chính thức kèm câu khuyến cáo an toàn. Voucher Hub duy trì fail-closed tại $0$ voucher đến khi đủ 5 trường đối soát. | **READY_FOR_CEO_REVIEW** |
| **4. Growth** | **Nạp Nguồn Cung Theo 4 Cohort Chuyên Biệt:** Phân loại 12 candidate thành 4 cohort: (1) Di chuyển công cộng, (2) Rạp & Không gian văn hóa, (3) Chính sách học đường, (4) Ẩm thực & Tiêu dùng. Không tăng trưởng bằng duplicate entry. | **READY_FOR_CEO_REVIEW** |
| **5. Data & Trust** | **Giữ Vững Lineage & Roster 50 Mục Rời Rạc:** Toàn bộ 12 artifact duy trì timestamp gốc nguyên văn mili-giây và mã băm SHA-256 đối chiếu khớp 100% Vault DS/DV. Sổ Roster phân định 8 mục khớp Vault Artifact và 42 mục chờ đối soát. | **READY_FOR_CEO_REVIEW** |
| **6. Engineering** | Đóng gói SOT `jayt_storefront_staging_ee.js`, nhúng dấu vân tay Ledger SHA-256 (`ebb0ec4115...`), phục vụ ổn định trên máy chủ Staging `http://127.0.0.1:4173/` (`HTTP 200 OK`), **0 lỗi console error, 0 cảnh báo console warning**. | **READY_FOR_CEO_REVIEW** |
| **7. QA** | Kiểm thử **47/47 static contract, asset register & cohort security checks**; audit 16/16 capture proofs độc bản với 16 mã băm SHA-256 riêng biệt; xác nhận 100% focusables $\ge 44\times 44\text{px}$. | **READY_FOR_CEO_REVIEW** |

---

### II. BẢNG TỔNG KẾT 4 COHORT BẰNG CHỨNG (EVIDENCE VAULT EE)

Theo [`07_QUALITY_ASSURANCE/evidence_vault_ee/EVIDENCE_MANIFEST_EE.json`](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/07_QUALITY_ASSURANCE/evidence_vault_ee/EVIDENCE_MANIFEST_EE.json):

| Nhóm Cohort | Mã Candidate | Tên Đơn vị & Địa chỉ | Tệp Artifact | Timestamp Gốc Nguyên Văn | Cấp độ Xác thực |
| :--- | :--- | :--- | :--- | :---: | :---: |
| **Cohort 1: Di Chuyển Công Cộng** | `CAND_BUS_R16A` | DanaBus Tuyến R16A | `artifact_cand_bus_r16a_transit_portal.html` | `2026-08-30T07:08:10.372Z` | PORTAL_IDENTITY_ONLY |
| | `CAND_TNGO_BIKE` | TNGo Xe Đạp Công Cộng | `artifact_cand_tngo_bike_portal.html` | `2026-08-30T08:14:56.678Z` | PORTAL_IDENTITY_ONLY |
| **Cohort 2: Rạp & Văn Hóa** | `CAND_METIZ_CINEMA` | Metiz Cinema (Helio Center) | `artifact_cand_metiz_cinema_portal.html` | `2026-08-30T08:14:56.975Z` | PORTAL_IDENTITY_ONLY |
| | `CAND_STARLIGHT_CINEMA` | Starlight Cinema (Nguyễn Kim) | `artifact_cand_starlight_cinema_portal.html` | `2026-08-30T08:14:57.204Z` | PORTAL_IDENTITY_ONLY |
| | `CAND_THU_VIEN_DUT` | Thư Viện ĐH Bách Khoa | `artifact_cand_thu_vien_dut_catalog.html` | `2026-08-30T07:08:09.592Z` | PORTAL_IDENTITY_ONLY |
| | `CAND_THU_VIEN_DUND` | Trung Tâm Học Liệu ĐHĐN | `artifact_cand_thu_vien_dund_portal.html` | `2026-08-30T07:08:09.886Z` | PORTAL_IDENTITY_ONLY |
| **Cohort 3: Học Đường & Công Cụ Số** | `CAND_GITHUB_STUDENT_PACK` | GitHub Student Pack | `artifact_cand_github_student_pack.html` | `2026-08-30T08:15:01.730Z` | PORTAL_IDENTITY_ONLY |
| | `CAND_JETBRAINS_STUDENT_PACK` | JetBrains Student License | `artifact_cand_jetbrains_student_pack.html` | `2026-08-30T08:15:02.124Z` | PORTAL_IDENTITY_ONLY |
| **Cohort 4: Ẩm Thực & Tiêu Dùng** | `CAND_DOMINOS_PIZZA` | Domino's Pizza Đà Nẵng | `artifact_cand_dominos_pizza_portal.html` | `2026-08-30T08:14:57.673Z` | PORTAL_IDENTITY_ONLY |
| | `CAND_HIGHLANDS_COFFEE` | Highlands Coffee Đà Nẵng | `artifact_cand_highlands_coffee_portal.html` | `2026-08-30T08:15:02.480Z` | PORTAL_IDENTITY_ONLY |
| | `CAND_BUN_CHA_CA_109` | Bún Chả Cá 109 Nguyễn Chí Thanh | `artifact_cand_bun_cha_ca_109_city_portal_root.html` | `2026-08-30T07:08:06.430Z` | PORTAL_IDENTITY_ONLY |
| | `CAND_COM_GA_A_HAI` | Cơm Gà A Hải | `artifact_cand_com_ga_a_hai_facebook_shell.html` | `2026-08-30T07:08:09.223Z` | PORTAL_IDENTITY_ONLY |

---

### III. SỔ ĐĂNG KÝ TÀI SẢN HÌNH ẢNH (ASSET REGISTER EE)

Theo [`07_QUALITY_ASSURANCE/staging_ee_asset_register.json`](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/07_QUALITY_ASSURANCE/staging_ee_asset_register.json):

- **Tổng số tài sản hình ảnh đăng ký:** **32 tệp** (gồm cả ảnh chụp thực địa địa danh Đà Nẵng và đồ họa định danh SVG).
- **Phân loại tác giả & nguồn gốc:**
  - *Ảnh thực địa 4K & Landmark Đà Nẵng:* Nguồn từ kho lưu trữ báo chí/cộng đồng và nhóm hình ảnh OPC JayT (Cầu Rồng, Cầu Sông Hàn, Bãi Biển Mỹ Khê, Bán Đảo Sơn Trà, Bảo Tàng Chăm, Mì Quảng Đà Nẵng).
  - *Đồ họa nhận diện bản địa:* Tác phẩm thiết kế vector nguyên bản của OPC JayT.
- **Tiêu chuẩn bản quyền:** Toàn bộ đạt trạng thái `VERIFIED_EDITORIAL_COMMUNITY_USE`, có alt text tiếp cận đầy đủ, **nghiêm cấm tuyệt đối ảnh AI tạo hình giả mạo ảnh thực địa**.

---

### IV. BỘ 16 BẢN GHI CAPTURE PROOF MỚI (BROWSER PACK EE)

Toàn bộ 16 ảnh chụp kiểm thử tự động tại thời điểm live server hoạt động đạt **16/16 mã băm SHA-256 hoàn toàn riêng biệt**, được lưu trữ tại `07_QUALITY_ASSURANCE/browser_pack_ee/`:

1. `00_desktop_1440_visual_slate_proof.png` (1.086.630 bytes, SHA-256: `067b5489b667e1a3...`)
2. `01_desktop_1440_landmark_hero.png` (495.966 bytes, SHA-256: `1dd9a661adeb51a8...`)
3. `02_desktop_1440_featured_deals.png` (402.753 bytes, SHA-256: `3746b624be0d1608...`)
4. `03_desktop_1440_culinary_story.png` (133.828 bytes, SHA-256: `a4a7de5fdfb9c66e...`)
5. `04_desktop_1440_transit_story.png` (240.715 bytes, SHA-256: `60e519b25e12430e...`)
6. `05_desktop_1440_leisure_story.png` (147.130 bytes, SHA-256: `9fd2e2815b0cb27e...`)
7. `06_desktop_1440_three_lane_wallet.png` (181.456 bytes, SHA-256: `9a393024e4fc73d7...`)
8. `07_desktop_1440_explore_directory.png` (123.942 bytes, SHA-256: `847f86296810c409...`)
9. `08_desktop_1440_dark_mode.png` (496.210 bytes, SHA-256: `200284d0ca454d87...`)
10. `09_desktop_1440_reduced_motion.png` (395.921 bytes, SHA-256: `00f5b67324a89aad...`)
11. `10_tablet_768_modern_bento.png` (362.033 bytes, SHA-256: `75a2c74c7b0b5266...`)
12. `11_mobile_390_fresh_load_first_fold.png` (174.582 bytes, SHA-256: `343d206717f5aa67...`)
13. `12_mobile_390_food_journey_route.png` (51.003 bytes, SHA-256: `8f3b41eb1ac50968...`)
14. `13_mobile_390_three_lane_wallet.png` (69.106 bytes, SHA-256: `50a6c530e4b9beb5...`)
15. `14_progressive_disclosure_drawer_open.png` (278.856 bytes, SHA-256: `b2cdb3077434233e...`)
16. `15_buy_decision_interactive.png` (74.233 bytes, SHA-256: `d3d25a26a9ac576c...`)

---

### V. CAM KẾT VẬN HÀNH & HÀNG RÀO AN TOÀN

1. **Khóa phát hành Production:** Tiếp tục duy trì trên Staging local `http://127.0.0.1:4173/`, không phát tán ra production khi chưa có phê duyệt từ CEO.
2. **Không Affiliate write / Zero-PII:** Nghiên cứu AccessTrade hoàn toàn read-only, trạng thái `PORTAL_ACCESS_NOT_VERIFIED`, không chèn mã affiliate, không thu thập cookie hay secret của người dùng.
3. **Kính trình CEO trực tiếp mở trình duyệt kiểm tra live tại `http://127.0.0.1:4173/` và kiểm tra bộ tài sản `staging_ee_asset_register.json` cùng bằng chứng 4 cohort.**
