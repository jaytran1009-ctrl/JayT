# BỘ HỒ SƠ HỘI ĐỒNG LIÊN BỘ — JAYT SECTION EG
## XÓA BỎ HOÀN TOÀN FALSE PROVENANCE KHỎI DOM, RÀNG BUỘC ASSET–ALT–CREDIT VỚI SOT NGUYÊN BẢN

**Mã hồ sơ:** `COUNCIL_DECISION_PACK_EG_PURGE_FALSE_PROVENANCE_AND_TRUTH_BOUND_SOT_20260830`  
**Phiên bản Staging SOT:** `v3.461.0-staging.eg`  
**Chỉ thị chỉ đạo:** JAYT-245 Mục EG (Dòng 3312–3339)  
**Địa chỉ Staging hoạt động:** `http://127.0.0.1:4173/`  
**HTTP Status:** `200 OK` (Content-Type: `text/html; charset=utf-8`)  
**Thời gian lập hồ sơ:** 2026-08-30T19:02:00+07:00  
**Trạng thái Quản trị:** `PENDING_CEO_LIVE_REVIEW` (Tiếp tục nâng cấp, không Go-Live)

---

### I. BIÊN BẢN ĐÁNH GIÁ 7 PHÒNG BAN LIÊN BỘ (SECTION EG)

| Phòng ban | Báo cáo hành động thực tế | Trạng thái kỹ thuật |
| :--- | :--- | :---: |
| **1. Product** | **Khôi Phục Trọn Vẹn Niềm Tin & Trung Thực Tuyệt Đối:** Loại bỏ 100% chú thích bản quyền CC, tên tác giả ảnh bên ngoài và câu chữ phóng đại điều kiện trực tiếp. 50 mục cẩm nang dẫn nguồn chính xác kèm khuyến cáo: `dẫn tới cổng chính thức — điều kiện chưa đối soát`. | **READY_FOR_CEO_REVIEW** |
| **2. Design** | **Đồ Họa Vector Được Gọi Đúng Tên:** Thiết lập bảng tra cứu `staging_eg_runtime_asset_table.json`. Mọi tệp SVG đều mang alt `Đồ họa minh họa JayT...` và credit `🎨 Đồ họa nguyên bản JayT &bull; Bản quyền nội bộ`. Tuyệt đối không dùng alt ảnh chụp hay credit giả mạo. | **READY_FOR_CEO_REVIEW** |
| **3. UX/CX** | **Xóa Bỏ Nhiễu Thông Tin & Đồng Nhất Trải Nghiệm:** Toàn bộ DOM không còn chứa bất kỳ token `CC BY-SA`, `4K` hay tên nhiếp ảnh gia cũ. Visual Slate được làm sạch hoàn toàn với các bảng đối soát minh bạch. | **READY_FOR_CEO_REVIEW** |
| **4. Growth** | **Tiếp Tục Nạp Nguồn Cung 4 Cohort Chuyên Biệt:** Giữ vững cấu trúc 12 candidate qua 4 cohort (Di chuyển công cộng, Rạp & Văn hóa, Chính sách học đường, Ẩm thực & Tiêu dùng). Nghiên cứu AccessTrade giữ `PORTAL_ACCESS_NOT_VERIFIED`, zero link affiliate. | **READY_FOR_CEO_REVIEW** |
| **5. Data & Trust** | **Kiểm Toán DOM Thực Tế (Live DOM Effective Audit):** Xác nhận 0 tệp JPEG, 0 credit CC/tác giả cũ, 0 câu chữ vượt quá bằng chứng field. Ràng buộc 1:1 giữa `src → asset_id → quyền sở hữu nội bộ → alt chân thực → credit chân thực`. | **READY_FOR_CEO_REVIEW** |
| **6. Engineering** | Đóng gói SOT `jayt_storefront_staging_eg.js`, nhúng dấu vân tay Ledger SHA-256 (`e1cc278715...`), phục vụ ổn định trên máy chủ Staging `http://127.0.0.1:4173/` (`HTTP 200 OK`), **0 lỗi console error, 0 cảnh báo console warning, 0 tệp JPEG, 0 chuỗi false provenance trong DOM**. | **READY_FOR_CEO_REVIEW** |
| **7. QA** | Kiểm thử **61/61 static contract, quarantine isolation, truth-bound provenance & security checks**; audit 16/16 capture proofs độc bản với 16 mã băm SHA-256 riêng biệt; xác nhận 100% focusables $\ge 44\times 44\text{px}$. | **READY_FOR_CEO_REVIEW** |

---

### II. BẢNG KIỂM TOÁN TÀI SẢN RUNTIME & BẢN QUYỀN TRUNG THỰC (RUNTIME ASSET TABLE EG)

Theo [`07_QUALITY_ASSURANCE/staging_eg_runtime_asset_table.json`](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/07_QUALITY_ASSURANCE/staging_eg_runtime_asset_table.json):

| Vị Trí DOM | Đường Dẫn Asset (SVG) | Loại Tệp | Quyền Sở Hữu / Chứng Thư | Alt Text Chân Thực | Credit Hiển Thị |
| :--- | :--- | :---: | :---: | :--- | :--- |
| `.landmark-hero-img` | `assets/images/board_a_afterglow_hero.svg` | SVG | OPC JayT Design Core (Nội bộ) | `Đồ họa minh họa JayT Đà Nẵng` | `🎨 Đồ họa nguyên bản JayT Đà Nẵng` |
| `#editorial-img-danabus` | `assets/images/danabus_green_transit_003.svg` | SVG | OPC JayT Design Core (Nội bộ) | `Đồ họa minh họa DanaBus Đà Nẵng` | `🎨 Đồ họa nguyên bản JayT &bull; Bản quyền nội bộ` |
| `#editorial-img-cham` | `assets/images/cham_museum_heritage_005.svg` | SVG | OPC JayT Design Core (Nội bộ) | `Đồ họa minh họa Bảo Tàng Chăm Đà Nẵng` | `🎨 Đồ họa nguyên bản JayT &bull; Bản quyền nội bộ` |
| `#editorial-img-library` | `assets/images/danang_library_art_004.svg` | SVG | OPC JayT Design Core (Nội bộ) | `Đồ họa minh họa Thư Viện Tổng Hợp Đà Nẵng` | `🎨 Đồ họa nguyên bản JayT &bull; Bản quyền nội bộ` |

---

### III. BẢNG QUÉT TOÀN BỘ CÁC CHUỖI PROVENANCE BỊ CÔ LẬP KHỎI DOM

| Chuỗi Bị Cấm | Trạng Thái Cũ Trong EE/EF | Trạng Thái Mới Trong EG | Kết Quả Quét DOM Thực Tế |
| :--- | :--- | :--- | :---: |
| `Bùi Thụy Đào Nguyên` | Xuất hiện ở Hero credit & Visual Slate | **ĐÃ XÓA 100% KHỎI DOM** | **0 occurrence** |
| `Christophe95` | Xuất hiện ở Cầu Sông Hàn attribution | **ĐÃ XÓA 100% KHỎI DOM** | **0 occurrence** |
| `CC BY-SA 3.0 / 4.0` | Xuất hiện ở Hero / Card / Visual Slate | **ĐÃ XÓA 100% KHỎI DOM** | **0 occurrence** |
| `CC BY 2.0` | Xuất hiện ở Thư Viện, Bảo Tàng Chăm | **ĐÃ XÓA 100% KHỎI DOM** | **0 occurrence** |
| `Toàn cảnh Cầu Rồng...` | Alt text ảnh chụp cũ | **ĐÃ XÓA 100% KHỎI DOM** | **0 occurrence** |
| `điều kiện trực tiếp...` | Subtitle phóng đại evidence | **ĐÃ THAY BẰNG "ĐIỀU KIỆN CHƯA ĐỐI SOÁT"** | **0 occurrence** |
| `4K` | Xuất hiện ở Visual Slate | **ĐÃ XÓA 100% KHỎI DOM** | **0 occurrence** |

---

### IV. BỘ 16 BẢN GHI CAPTURE PROOF MỚI (BROWSER PACK EG)

Toàn bộ 16 ảnh chụp kiểm thử tự động tại thời điểm live server hoạt động đạt **16/16 mã băm SHA-256 hoàn toàn riêng biệt**, được lưu trữ tại `07_QUALITY_ASSURANCE/browser_pack_eg/`:

1. `00_desktop_1440_visual_slate_proof.png` (176.748 bytes, SHA-256: `367e77c896f2f6da...`)
2. `01_desktop_1440_landmark_hero.png` (223.104 bytes, SHA-256: `95aa87b523cd0baf...` — **Vector Hero & Truth-Bound Credit**)
3. `02_desktop_1440_featured_deals.png` (233.954 bytes, SHA-256: `2ff446ffb98b5e6e...`)
4. `03_desktop_1440_culinary_story.png` (133.473 bytes, SHA-256: `994d5998f5f1858d...`)
5. `04_desktop_1440_transit_story.png` (175.777 bytes, SHA-256: `646182aea0005e46...`)
6. `05_desktop_1440_leisure_story.png` (146.747 bytes, SHA-256: `6f3910ee4183a8e4...`)
7. `06_desktop_1440_three_lane_wallet.png` (181.120 bytes, SHA-256: `f5b526b092042fbd...`)
8. `07_desktop_1440_explore_directory.png` (123.597 bytes, SHA-256: `7bab5372b5529bce...`)
9. `08_desktop_1440_dark_mode.png` (224.882 bytes, SHA-256: `d5aff37ad5eeebad...`)
10. `09_desktop_1440_reduced_motion.png` (217.679 bytes, SHA-256: `304eebd6924cf3f5...`)
11. `10_tablet_768_modern_bento.png` (163.301 bytes, SHA-256: `5680208eaf105998...`)
12. `11_mobile_390_fresh_load_first_fold.png` (112.610 bytes, SHA-256: `047abdec3170fcc0...`)
13. `12_mobile_390_food_journey_route.png` (50.843 bytes, SHA-256: `6ddd83eaf0385700...`)
14. `13_mobile_390_three_lane_wallet.png` (68.944 bytes, SHA-256: `51651a224db87018...`)
15. `14_progressive_disclosure_drawer_open.png` (278.911 bytes, SHA-256: `7dcd6e9d882bc696...`)
16. `15_buy_decision_interactive.png` (73.478 bytes, SHA-256: `01389425d364db86...`)

---

### V. CAM KẾT VẬN HÀNH & HÀNG RÀO AN TOÀN

1. **Khóa phát hành Production:** Tiếp tục duy trì trên Staging local `http://127.0.0.1:4173/`, không phát tán ra production khi chưa có phê duyệt từ CEO.
2. **Không Affiliate write / Zero-PII:** Duy trì 100% không chèn mã affiliate, không thu thập cookie hay secret của người dùng.
3. **Kính trình CEO trực tiếp mở trình duyệt kiểm tra live tại `http://127.0.0.1:4173/` và kiểm tra hồ sơ `staging_eg_runtime_asset_table.json` cùng bộ 50 mục cẩm nang không chứa bất kỳ credit/alt text sai lệch nào.**
