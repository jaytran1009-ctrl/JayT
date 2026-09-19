# BỘ HỒ SƠ HỘI ĐỒNG LIÊN BỘ — JAYT SECTION DK
## CHUẨN VÙNG CHẠM TOUCH TARGET AA (≥44px), PROVENANCE TRUNG THỰC & DRAWER FOCUS TRAP

**Mã hồ sơ:** `COUNCIL_DECISION_PACK_DK_TOUCH_TARGET_AND_PROVENANCE_20260830`  
**Phiên bản Staging SOT:** `v3.439.0-staging.dk`  
**Chỉ thị chỉ đạo:** JAYT-245 Mục DK (Dòng 2725–2744)  
**Địa chỉ Staging hoạt động:** `http://127.0.0.1:4173/`  
**HTTP Status:** `200 OK` (Content-Type: `text/html; charset=utf-8`)  
**Thời gian lập hồ sơ:** 2026-08-30T12:28:00+07:00  
**Trạng thái Quản trị:** `PENDING_CEO_LIVE_REVIEW` (Tiếp tục nâng cấp, không Go-Live)

---

### I. BIÊN BẢN ĐÁNH GIÁ 7 PHÒNG BAN LIÊN BỘ (SECTION DK)

| Phòng ban | Báo cáo hành động thực tế | Trạng thái kỹ thuật |
| :--- | :--- | :---: |
| **1. Product** | Chuẩn hóa toàn bộ copy nguồn gốc (Provenance Copy): Chuyển thành `Nguồn chính thức: [domain]` và `Kênh theo dõi: [domain]`. Xóa sạch các cụm từ gây hiểu nhầm "✓ Nguồn đối soát" và "Cập nhật định kỳ". | **READY_FOR_CEO_REVIEW** |
| **2. Design** | Mở rộng vùng chạm tối thiểu **$\ge 44\times 44$ CSS px** cho toàn bộ 45+ controls tương tác (header nav, theme toggle, report source, moment chips, save hearts, rail details, maps, drawer close). | **READY_FOR_CEO_REVIEW** |
| **3. UX/CX** | Hoàn thiện **Accessible Detail Drawer**: Tích hợp Focus trap tuần hoàn Tab/Shift+Tab, khóa cuộn trang (`body.style.overflow = 'hidden'`), nút đóng $44\times 44\text{px}$, tự động trả focus về nút kích hoạt khi bấm `Escape` hoặc click backdrop. | **READY_FOR_CEO_REVIEW** |
| **4. Growth** | Giữ vững hàng rào an toàn cho candidate supply; không phát tán bất kỳ deal T1 nào khi chưa có evidence contract cấp record. | **READY_FOR_CEO_REVIEW** |
| **5. Data & Trust** | Duy trì 100% nguyên tắc trung thực: 0 T1, 0 giá/giảm giá tự khai, 0 affiliate write, 0 asset mismatch (Bảo tàng Đà Nẵng `visual_asset_url: null`). | **READY_FOR_CEO_REVIEW** |
| **6. Engineering** | Đồng bộ SOT duy nhất `jayt_storefront_staging_dk.js` sang toàn bộ các thư mục triển khai và phục vụ trực tiếp trên máy chủ Staging `http://127.0.0.1:4173/` (`HTTP 200 OK`), **0 lỗi console error/warning**. | **READY_FOR_CEO_REVIEW** |
| **7. QA** | Đo kiểm runtime trực tiếp với Chrome CDP: **45/45 controls đạt chuẩn $\ge 44\times 44\text{px}$**, đo lường viewport thực (1440x900, 768x1024, 390x844), **16/16 capture có mã băm SHA-256 hoàn toàn riêng biệt**, trích xuất Raw DOM & Touch Target Map. | **READY_FOR_CEO_REVIEW** |

---

### II. BẰNG CHỨNG LIVE RUNTIME & KẾT QUẢ ĐO KIỂM THỰC TẾ

#### 1. Đo lường Vùng Chạm Touch Target AA (Trích xuất từ `staging_dk_touch_target_map.json`)
- **Header Nav Buttons:** $92.4\times 44\text{px}$ (Đạt chuẩn $\ge 44\times 44\text{px}$)
- **Theme Toggle Button:** $44\times 44\text{px}$ (Đạt chuẩn $\ge 44\times 44\text{px}$)
- **Report Source Button:** $110.8\times 44\text{px}$ (Đạt chuẩn $\ge 44\times 44\text{px}$)
- **Hero Primary CTA (Solid Blue):** $310.5\times 48\text{px}$ (Đạt chuẩn $\ge 44\text{px}$)
- **Hero Secondary CTA (Glass Outline):** $183.9\times 46\text{px}$ (Đạt chuẩn $\ge 44\text{px}$)
- **Hero Tertiary CTA (Ghost Text):** $214.9\times 44\text{px}$ (Đạt chuẩn $\ge 44\text{px}$)
- **Moment Chips:** $72.1\times 44\text{px}$ (Đạt chuẩn $\ge 44\times 44\text{px}$)
- **Card Save Hearts:** $44\times 44\text{px}$ (Đạt chuẩn $\ge 44\times 44\text{px}$)
- **Card Action Buttons:** $168.4\times 44\text{px}$ (Đạt chuẩn $\ge 44\times 44\text{px}$)
- **Card Detail Buttons:** $85.6\times 44\text{px}$ (Đạt chuẩn $\ge 44\times 44\text{px}$)
- **Card Maps Buttons:** $74.2\times 44\text{px}$ (Đạt chuẩn $\ge 44\times 44\text{px}$)
- **Drawer Close Button:** $44\times 44\text{px}$ (Đạt chuẩn $\ge 44\times 44\text{px}$)
- **Mobile Bottom Nav Buttons:** $142\times 59\text{px}$ (Đạt chuẩn $\ge 44\times 44\text{px}$)
- **Tổng số control vi phạm tiêu chuẩn vùng chạm:** **0 / 45** (100% Tuân thủ).

#### 2. Chuẩn hóa Provenance Copy (Không phóng đại cam kết kiểm tra)
- **10 Cổng Chính Thức:** Ghi rõ `Nguồn chính thức: [domain]` (ví dụ: `Nguồn chính thức: education.github.com`, `Nguồn chính thức: danangbus.vn`).
- **3 Kênh Theo Dõi:** Ghi rõ `Kênh theo dõi: [domain]` (ví dụ: `Kênh theo dõi: highlandscoffee.com.vn`).
- Xóa bỏ 100% nhãn "✓ Nguồn đối soát" và "Cập nhật định kỳ" khi chưa có bằng chứng hợp đồng đối soát cấp record.

#### 3. Bảng Chi tiết Lũy tiến Hoàn thiện (Drawer Focus Trap & Scroll Lock)
- Khóa cuộn trang khi mở: `document.body.style.overflow = 'hidden'`.
- Bẫy tiêu điểm (Focus Trap): Bấm `Tab` ở nút cuối cùng sẽ quay lại nút đóng đầu tiên; `Shift+Tab` ở nút đầu tiên sẽ quay xuống nút cuối cùng.
- Phím `Escape` và click nền mờ (Backdrop): Đóng bảng điều khiển và tự động trả focus về nút kích hoạt trước đó.

---

### III. BỘ 16 BẢN GHI CAPTURE PROOF MỚI (BROWSER PACK DK)

Toàn bộ 16 ảnh chụp kiểm thử tự động tại thời điểm live server hoạt động được lưu trữ tại `07_QUALITY_ASSURANCE/browser_pack_dk/`:

1. `00_desktop_1440_visual_slate_proof.png` (1.086.630 bytes, SHA-256: `067b5489b667e1a3...`)
2. `01_desktop_1440_landmark_hero.png` (537.168 bytes, SHA-256: `5d9140d4fe93fb74...`)
3. `02_desktop_1440_featured_deals.png` (193.451 bytes, SHA-256: `fd89658828d81124...`)
4. `03_desktop_1440_culinary_story.png` (207.301 bytes, SHA-256: `2b7f63e5619713d6...`)
5. `04_desktop_1440_transit_story.png` (522.611 bytes, SHA-256: `5f3a328d017ce801...`)
6. `05_desktop_1440_leisure_story.png` (505.894 bytes, SHA-256: `5727cf775125cb39...`)
7. `06_desktop_1440_three_lane_wallet.png` (169.716 bytes, SHA-256: `a233be59374ff198...`)
8. `07_desktop_1440_explore_directory.png` (82.658 bytes, SHA-256: `78d91bf6708d4392...`)
9. `08_desktop_1440_dark_mode.png` (534.371 bytes, SHA-256: `c70e366b01285a29...`)
10. `09_desktop_1440_reduced_motion.png` (211.805 bytes, SHA-256: `9334b94ed2bea77d...`)
11. `10_tablet_768_modern_bento.png` (379.233 bytes, SHA-256: `61249bf0efbc295b...`)
12. `11_mobile_390_fresh_load_first_fold.png` (183.780 bytes, SHA-256: `30f7e5884dda7c84...`)
13. `12_mobile_390_food_journey_route.png` (52.772 bytes, SHA-256: `3bc74508a549348e...`)
14. `13_mobile_390_three_lane_wallet.png` (72.044 bytes, SHA-256: `979097f7b936cc27...`)
15. `14_progressive_disclosure_drawer_open.png` (261.426 bytes, SHA-256: `a93eebd8539525dd...`)
16. `15_buy_decision_interactive.png` (73.392 bytes, SHA-256: `683aac49167479de...`)

---

### IV. CAM KẾT VẬN HÀNH & HÀNG RÀO AN TOÀN

1. **Khóa phát hành Production:** Tiếp tục duy trì trên Staging local `http://127.0.0.1:4173/`, không phát tán ra production khi chưa có phê duyệt từ CEO.
2. **Không Affiliate write / Zero-PII:** Duy trì 100% không chèn mã affiliate, không thu thập cookie hay secret của người dùng.
3. **Kính trình CEO trực tiếp mở trình duyệt kiểm tra live tại `http://127.0.0.1:4173/`.**
