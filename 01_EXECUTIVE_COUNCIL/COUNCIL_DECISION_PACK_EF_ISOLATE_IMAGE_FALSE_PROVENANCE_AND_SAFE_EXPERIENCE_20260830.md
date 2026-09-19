# BỘ HỒ SƠ HỘI ĐỒNG LIÊN BỘ — JAYT SECTION EF
## CÔ LẬP FALSE PROVENANCE CỦA ẢNH, BẢO TOÀN TRẢI NGHIỆM HỮU ÍCH THỰC SỰ VÀ KHÓA RUNTIME CHẶT CHẼ

**Mã hồ sơ:** `COUNCIL_DECISION_PACK_EF_ISOLATE_IMAGE_FALSE_PROVENANCE_AND_SAFE_EXPERIENCE_20260830`  
**Phiên bản Staging SOT:** `v3.460.0-staging.ef`  
**Chỉ thị chỉ đạo:** JAYT-245 Mục EF (Dòng 3282–3309)  
**Địa chỉ Staging hoạt động:** `http://127.0.0.1:4173/`  
**HTTP Status:** `200 OK` (Content-Type: `text/html; charset=utf-8`)  
**Thời gian lập hồ sơ:** 2026-08-30T18:54:00+07:00  
**Trạng thái Quản trị:** `PENDING_CEO_LIVE_REVIEW` (Tiếp tục nâng cấp, không Go-Live)

---

### I. BIÊN BẢN ĐÁNH GIÁ 7 PHÒNG BAN LIÊN BỘ (SECTION EF)

| Phòng ban | Báo cáo hành động thực tế | Trạng thái kỹ thuật |
| :--- | :--- | :---: |
| **1. Product** | **Bảo Toàn Trải Nghiệm Khám Phá Không Đánh Đổi Bản Quyền:** Cô lập 100% 12 tệp JPEG chưa đủ chứng thư khỏi runtime. Trải nghiệm 50 mục cẩm nang và 3 lối vào thực dụng (`Dùng hôm nay`, `Chương trình chính thức`, `Kiểm tra trước khi mua`) hoạt động mượt mà bằng đồ họa vector bản địa. | **READY_FOR_CEO_REVIEW** |
| **2. Design** | **Cách Ly 12 JPEG & Chuyển 100% Sang Vector Nguyên Bản Được Xác Minh:** Thiết lập `staging_ef_quarantine_manifest.json` cách ly 12 JPEG. Runtime chuyển toàn bộ sang 20 tệp đồ họa vector SVG nguyên bản của OPC JayT, thiết kế gradient trung tính và typography hiện đại; không dùng ảnh AI giả mạo ảnh thực. | **READY_FOR_CEO_REVIEW** |
| **3. UX/CX** | **Loại Bỏ Hoàn Toàn Nhãn Không Được Chứng Minh:** Xóa bỏ toàn bộ từ ngữ "ảnh thực địa", "4K", "chụp thực tế". Toàn bộ card pending hiển thị rõ ràng: `dẫn tới cổng chính thức — điều kiện chưa đối soát`. Voucher Hub giữ nguyên trạng thái fail-closed tại $0$ voucher. | **READY_FOR_CEO_REVIEW** |
| **4. Growth** | **Tiếp Tục Nạp Nguồn Cung 4 Cohort Chuyên Biệt:** Giữ vững cấu trúc 12 candidate qua 4 cohort (Di chuyển công cộng, Rạp & Văn hóa, Chính sách học đường, Ẩm thực & Tiêu dùng). Nghiên cứu AccessTrade giữ `PORTAL_ACCESS_NOT_VERIFIED`, zero link affiliate. | **READY_FOR_CEO_REVIEW** |
| **5. Data & Trust** | **Kiểm Toán Chứng Thư & Chặn Đứng False Provenance Quyền Ảnh:** Toàn bộ 12 JPEG bị hạ cấp xuống `RIGHTS_UNVERIFIED_QUARANTINED` (`runtime_render_allowed: false`). Chỉ các tài sản vector nội bộ có chứng thư sở hữu xác minh mới được cấp phép render tại runtime. | **READY_FOR_CEO_REVIEW** |
| **6. Engineering** | Đóng gói SOT `jayt_storefront_staging_ef.js`, nhúng dấu vân tay Ledger SHA-256 (`3ff7cb8aad...`), phục vụ ổn định trên máy chủ Staging `http://127.0.0.1:4173/` (`HTTP 200 OK`), **0 lỗi console error, 0 cảnh báo console warning, 0 tệp JPEG trong runtime DOM**. | **READY_FOR_CEO_REVIEW** |
| **7. QA** | Kiểm thử **56/56 static contract, quarantine isolation & security checks**; audit 16/16 capture proofs độc bản với 16 mã băm SHA-256 riêng biệt; xác nhận 100% focusables $\ge 44\times 44\text{px}$. | **READY_FOR_CEO_REVIEW** |

---

### II. BẢNG BIÊN BẢN CÔ LẬP 12 ẢNH JPEG (QUARANTINE MANIFEST EF)

Theo [`07_QUALITY_ASSURANCE/staging_ef_quarantine_manifest.json`](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/07_QUALITY_ASSURANCE/staging_ef_quarantine_manifest.json):

| Tệp Hình Ảnh Bị Cô Lập | Dung lượng | Mã Băm SHA-256 | Trạng Thái Bản Quyền | Trạng Thái Runtime | Giải Pháp Thay Thế |
| :--- | :---: | :---: | :---: | :---: | :--- |
| `dragon_bridge_hero_001.jpg` | 241.650 | `cffc94e45d...` | RIGHTS_UNVERIFIED_QUARANTINED | **BỊ GỠ BỎ (KHÔNG RENDER)** | `board_a_afterglow_hero.svg` |
| `danang_real_photo_han_river_bridge.jpg` | 276.782 | `64468f946a...` | RIGHTS_UNVERIFIED_QUARANTINED | **BỊ GỠ BỎ (KHÔNG RENDER)** | `danabus_green_transit_003.svg` |
| `danang_real_photo_cham_museum.jpg` | 237.387 | `8eef8d52ec...` | RIGHTS_UNVERIFIED_QUARANTINED | **BỊ GỠ BỎ (KHÔNG RENDER)** | `cham_museum_heritage_005.svg` |
| `danang_real_photo_bach_dang.jpg` | 311.698 | `987dca1cf7...` | RIGHTS_UNVERIFIED_QUARANTINED | **BỊ GỠ BỎ (KHÔNG RENDER)** | `danang_library_art_004.svg` |
| `danang_real_photo_mi_quang.jpg` | 267.856 | `c98a39d8d6...` | RIGHTS_UNVERIFIED_QUARANTINED | **BỊ GỠ BỎ (KHÔNG RENDER)** | `danang_mi_quang_food_001.svg` |
| `danang_real_photo_my_khe_beach.jpg` | 475.435 | `340889210c...` | RIGHTS_UNVERIFIED_QUARANTINED | **BỊ GỠ BỎ (KHÔNG RENDER)** | `board_b_coastal_hero.svg` |
| `danang_4k_dragon_bridge_master.jpg` | 8.528.237 | `aa7bb25df9...` | RIGHTS_UNVERIFIED_QUARANTINED | **BỊ GỠ BỎ (KHÔNG RENDER)** | Đồ họa vector nội bộ |
| `danang_4k_golden_bridge_master.jpg` | 16.818.623 | `e76c12e8b0...` | RIGHTS_UNVERIFIED_QUARANTINED | **BỊ GỠ BỎ (KHÔNG RENDER)** | Đồ họa vector nội bộ |
| `danang_4k_han_river_bridge_master.jpg` | 5.770.647 | `4b13a778ef...` | RIGHTS_UNVERIFIED_QUARANTINED | **BỊ GỠ BỎ (KHÔNG RENDER)** | Đồ họa vector nội bộ |
| `danang_4k_my_khe_beach_master.jpg` | 23.172.248 | `ce0327f272...` | RIGHTS_UNVERIFIED_QUARANTINED | **BỊ GỠ BỎ (KHÔNG RENDER)** | Đồ họa vector nội bộ |
| `danang_4k_son_tra_master.jpg` | 4.112.922 | `6c8fe4391b...` | RIGHTS_UNVERIFIED_QUARANTINED | **BỊ GỠ BỎ (KHÔNG RENDER)** | Đồ họa vector nội bộ |
| `danang_real_mi_quang_master.jpg` | 3.287.808 | `dcaec46fec...` | RIGHTS_UNVERIFIED_QUARANTINED | **BỊ GỠ BỎ (KHÔNG RENDER)** | Đồ họa vector nội bộ |

---

### III. SỔ ĐĂNG KÝ TÀI SẢN HÌNH ẢNH ĐƯỢC KIỂM TOÁN LẠI (AUDITED ASSET REGISTER EF)

Theo [`07_QUALITY_ASSURANCE/staging_ef_asset_register.json`](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/07_QUALITY_ASSURANCE/staging_ef_asset_register.json):

- **Tổng số tài sản:** **32 tệp**.
- **Số tệp JPEG bị cô lập (`runtime_render_allowed: false`):** **12 tệp**.
- **Số tệp Vector SVG được phép render (`runtime_render_allowed: true`):** **20 tệp** (100% do OPC JayT sáng tác, quyền sở hữu nội bộ đã xác minh).

---

### IV. BỘ 16 BẢN GHI CAPTURE PROOF MỚI (BROWSER PACK EF)

Toàn bộ 16 ảnh chụp kiểm thử tự động tại thời điểm live server hoạt động đạt **16/16 mã băm SHA-256 hoàn toàn riêng biệt**, được lưu trữ tại `07_QUALITY_ASSURANCE/browser_pack_ef/`:

1. `00_desktop_1440_visual_slate_proof.png` (181.213 bytes, SHA-256: `bc5e9c35518daa43...`)
2. `01_desktop_1440_landmark_hero.png` (227.210 bytes, SHA-256: `a53c07138b0e3b8a...` — **Vector Hero Nguyên Bản**)
3. `02_desktop_1440_featured_deals.png` (235.237 bytes, SHA-256: `3c15b31af493e0f1...`)
4. `03_desktop_1440_culinary_story.png` (133.488 bytes, SHA-256: `516dba941b2adb48...`)
5. `04_desktop_1440_transit_story.png` (178.427 bytes, SHA-256: `98480cdb0bba776f...`)
6. `05_desktop_1440_leisure_story.png` (146.774 bytes, SHA-256: `fe9b1dad41eee777...`)
7. `06_desktop_1440_three_lane_wallet.png` (181.133 bytes, SHA-256: `221ebb5642bc9a7e...`)
8. `07_desktop_1440_explore_directory.png` (123.617 bytes, SHA-256: `7a5526fbe80f31b2...`)
9. `08_desktop_1440_dark_mode.png` (229.224 bytes, SHA-256: `23bfac8b24c22ebe...`)
10. `09_desktop_1440_reduced_motion.png` (219.389 bytes, SHA-256: `ac8eedcb785ac62c...`)
11. `10_tablet_768_modern_bento.png` (166.995 bytes, SHA-256: `7b6f00fab07b82ff...`)
12. `11_mobile_390_fresh_load_first_fold.png` (114.043 bytes, SHA-256: `085073074856d154...`)
13. `12_mobile_390_food_journey_route.png` (51.071 bytes, SHA-256: `5074da3a0ccdd492...`)
14. `13_mobile_390_three_lane_wallet.png` (69.177 bytes, SHA-256: `188d241b9024892f...`)
15. `14_progressive_disclosure_drawer_open.png` (278.945 bytes, SHA-256: `91e8cbf81d708908...`)
16. `15_buy_decision_interactive.png` (73.737 bytes, SHA-256: `2f775b5a6d0500b6...`)

---

### V. CAM KẾT VẬN HÀNH & HÀNG RÀO AN TOÀN

1. **Khóa phát hành Production:** Tiếp tục duy trì trên Staging local `http://127.0.0.1:4173/`, không phát tán ra production khi chưa có phê duyệt từ CEO.
2. **Không Affiliate write / Zero-PII:** Duy trì 100% không chèn mã affiliate, không thu thập cookie hay secret của người dùng.
3. **Kính trình CEO trực tiếp mở trình duyệt kiểm tra live tại `http://127.0.0.1:4173/` và kiểm tra hồ sơ cô lập `staging_ef_quarantine_manifest.json` cùng bộ 50 mục cẩm nang không chứa tệp JPEG.**
