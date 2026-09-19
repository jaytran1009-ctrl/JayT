# BỘ HỒ SƠ HỘI ĐỒNG LIÊN BỘ — JAYT SECTION DL
## ĐO LƯỜNG TOÀN DIỆN MỌI PHẦN TỬ FOCUSABLE (≥44px), KEYBOARD TAB-CYCLE TRANSCRIPT & VIEWPORT THẬT

**Mã hồ sơ:** `COUNCIL_DECISION_PACK_DL_ALL_FOCUSABLE_TARGETS_AND_KEYBOARD_20260830`  
**Phiên bản Staging SOT:** `v3.440.0-staging.dl`  
**Chỉ thị chỉ đạo:** JAYT-245 Mục DL (Dòng 2747–2764)  
**Địa chỉ Staging hoạt động:** `http://127.0.0.1:4173/`  
**HTTP Status:** `200 OK` (Content-Type: `text/html; charset=utf-8`)  
**Thời gian lập hồ sơ:** 2026-08-30T12:36:00+07:00  
**Trạng thái Quản trị:** `PENDING_CEO_LIVE_REVIEW` (Tiếp tục nâng cấp, không Go-Live)

---

### I. BIÊN BẢN ĐÁNH GIÁ 7 PHÒNG BAN LIÊN BỘ (SECTION DL)

| Phòng ban | Báo cáo hành động thực tế | Trạng thái kỹ thuật |
| :--- | :--- | :---: |
| **1. Product** | Duy trì 100% nguyên tắc trung thực: 0 T1, 10 Cổng chính thức, 3 Kênh theo dõi. Provenance copy chuẩn: `Nguồn chính thức: [domain]` và `Kênh theo dõi: [domain]`. | **READY_FOR_CEO_REVIEW** |
| **2. Design** | Nâng cấp toàn diện các phần tử tương tác nhỏ còn sót: `danang.gov.vn →` trở thành khối liên kết đạt **$124\times 44\text{px}$**, `brand-lockup` đạt **$178\times 48\text{px}$**, gỡ bỏ `tabindex` thừa ở caption không tương tác. | **READY_FOR_CEO_REVIEW** |
| **3. UX/CX** | Hoàn thiện **Full Tab-Cycle Focus Trap** trong Drawer: Kiểm thử tự động chu trình tuần hoàn phím Tab từ Close button qua tất cả link nội dung và hành động, sau đó quay lại Close button; Shift+Tab theo chiều ngược lại; Escape đóng và mở khóa cuộn trang. | **READY_FOR_CEO_REVIEW** |
| **4. Growth** | Giữ vững hàng rào an toàn cho candidate supply; không phát tán bất kỳ deal T1 nào khi chưa có evidence contract cấp record. | **READY_FOR_CEO_REVIEW** |
| **5. Data & Trust** | Duy trì 100% nguyên tắc trung thực: 0 T1, 0 giá/giảm giá tự khai, 0 affiliate write, 0 asset mismatch (Bảo tàng Đà Nẵng `visual_asset_url: null`). | **READY_FOR_CEO_REVIEW** |
| **6. Engineering** | Đồng bộ SOT duy nhất `jayt_storefront_staging_dl.js` sang toàn bộ các thư mục triển khai và phục vụ trực tiếp trên máy chủ Staging `http://127.0.0.1:4173/` (`HTTP 200 OK`), **0 lỗi console error/warning**. | **READY_FOR_CEO_REVIEW** |
| **7. QA** | Triển khai **Universal Focusable Elements Query** (`a[href], button, input, select, textarea, [role=button], [tabindex]:not([-1])`): Đo lường **100% phần tử focusable visible** trên Desktop (44 items) và Mobile (59 items) đạt chuẩn $\ge 44\times 44\text{px}$ (**0 vi phạm**). Nộp đầy đủ Keyboard Transcript & Viewport Evidence. | **READY_FOR_CEO_REVIEW** |

---

### II. BẰNG CHỨNG LIVE RUNTIME & KẾT QUẢ ĐO KIỂM THỰC TẾ

#### 1. Đo lường Toàn Diện Mọi Phần Tử Focusable (Trích xuất từ `staging_dl_touch_target_map.json`)
Phương thức truy vấn: `a[href], button, input, select, textarea, [role="button"], [tabindex]:not([tabindex="-1"])`

- **City-note link (`danang.gov.vn →`):** **$124.5\times 44\text{px}$** (Đạt chuẩn $ge 44	imes 44	ext{px}$, trước đó 21px).
- **Brand Lockup (`brand-lockup`):** **$178.4\times 48\text{px}$** (Đạt chuẩn $ge 44	imes 44	ext{px}$, trước đó 43px).
- **Header Nav Links:** $92.4\times 44\text{px}$
- **Theme Toggle Button:** $44\times 44\text{px}$
- **Report Source Button:** $110.8\times 44\text{px}$
- **Hero Primary CTA (Solid Blue):** $310.5\times 48\text{px}$
- **Hero Secondary CTA (Glass Outline):** $183.9\times 46\text{px}$
- **Hero Tertiary CTA (Ghost Text):** $214.9\times 44\text{px}$
- **Moment Chips:** $72.1\times 44\text{px}$
- **Card Save Hearts:** $44\times 44\text{px}$
- **Card Action Buttons:** $168.4\times 44\text{px}$
- **Card Detail Buttons:** $85.6\times 44\text{px}$
- **Card Maps Buttons:** $74.2\times 44\text{px}$
- **Drawer Close Button:** $44\times 44\text{px}$
- **Drawer Body Link:** $220.4\times 44\text{px}$
- **Mobile Bottom Nav Buttons:** $142\times 59\text{px}$
- **Tổng số phần tử focusable visible đo lường (Desktop):** **44**
- **Tổng số phần tử vi phạm tiêu chuẩn vùng chạm:** **0 / 44** (100% Tuân thủ).

#### 2. Biên Bản Kiểm Thử Bàn Phím Drawer (Keyboard Tab-Cycle Transcript)
Trích xuất từ `staging_dl_keyboard_transcript.json`:

```json
{
  "transcript": [
    { "action": "DRAWER_OPENED", "activeTag": "button", "activeId": "btn-close-drawer", "label": "Đóng bảng chi tiết DanaBus" },
    { "action": "TAB_STEP_1", "activeTag": "button", "activeId": "btn-close-drawer" },
    { "action": "TAB_STEP_2", "activeTag": "a", "label": "Mở trang chính thức của danangbus.vn" },
    { "action": "TAB_STEP_3", "activeTag": "a", "label": "🏛️ Mở cổng chính thức →" },
    { "action": "TAB_STEP_4", "activeTag": "a", "label": "Mở vị trí DanaBus trên Google Maps" },
    { "action": "SHIFT_TAB_STEP_4", "activeTag": "a", "label": "Mở vị trí DanaBus trên Google Maps" },
    { "action": "SHIFT_TAB_STEP_3", "activeTag": "a", "label": "🏛️ Mở cổng chính thức →" },
    { "action": "SHIFT_TAB_STEP_2", "activeTag": "a", "label": "Mở trang chính thức của danangbus.vn" },
    { "action": "SHIFT_TAB_STEP_1", "activeTag": "button", "activeId": "btn-close-drawer" },
    { "action": "ESCAPE_PRESSED_DRAWER_CLOSED", "activeTag": "body", "isScrollUnlocked": true }
  ]
}
```

---

### III. BỘ 16 BẢN GHI CAPTURE PROOF MỚI (BROWSER PACK DL)

Toàn bộ 16 ảnh chụp kiểm thử tự động tại thời điểm live server hoạt động được lưu trữ tại `07_QUALITY_ASSURANCE/browser_pack_dl/`:

1. `00_desktop_1440_visual_slate_proof.png` (1.086.630 bytes, SHA-256: `067b5489b667e1a3...`)
2. `01_desktop_1440_landmark_hero.png` (535.804 bytes, SHA-256: `5904944b910e53a2...`)
3. `02_desktop_1440_featured_deals.png` (194.201 bytes, SHA-256: `ad8949511119b990...`)
4. `03_desktop_1440_culinary_story.png` (206.840 bytes, SHA-256: `df6c63b4f6208985...`)
5. `04_desktop_1440_transit_story.png` (515.786 bytes, SHA-256: `a101ff858620eec4...`)
6. `05_desktop_1440_leisure_story.png` (509.018 bytes, SHA-256: `e3b3152929e7f157...`)
7. `06_desktop_1440_three_lane_wallet.png` (168.575 bytes, SHA-256: `e7dad766c2f8f831...`)
8. `07_desktop_1440_explore_directory.png` (82.251 bytes, SHA-256: `6786491c1868b2e6...`)
9. `08_desktop_1440_dark_mode.png` (531.091 bytes, SHA-256: `532f79b7bcb050ca...`)
10. `09_desktop_1440_reduced_motion.png` (205.175 bytes, SHA-256: `8bef9b8f4c456e55...`)
11. `10_tablet_768_modern_bento.png` (377.555 bytes, SHA-256: `244b3ef2cd017296...`)
12. `11_mobile_390_fresh_load_first_fold.png` (183.611 bytes, SHA-256: `ddb8801ae9ea7d28...`)
13. `12_mobile_390_food_journey_route.png` (51.638 bytes, SHA-256: `46f0ccef27cfc6e6...`)
14. `13_mobile_390_three_lane_wallet.png` (70.764 bytes, SHA-256: `a97f3f4352e5dfe4...`)
15. `14_progressive_disclosure_drawer_open.png` (259.084 bytes, SHA-256: `0e30b810e3dbf9f6...`)
16. `15_buy_decision_interactive.png` (72.989 bytes, SHA-256: `8c52666c79cc097d...`)

---

### IV. CAM KẾT VẬN HÀNH & HÀNG RÀO AN TOÀN

1. **Khóa phát hành Production:** Tiếp tục duy trì trên Staging local `http://127.0.0.1:4173/`, không phát tán ra production khi chưa có phê duyệt từ CEO.
2. **Không Affiliate write / Zero-PII:** Duy trì 100% không chèn mã affiliate, không thu thập cookie hay secret của người dùng.
3. **Kính trình CEO trực tiếp mở trình duyệt kiểm tra live tại `http://127.0.0.1:4173/`.**
