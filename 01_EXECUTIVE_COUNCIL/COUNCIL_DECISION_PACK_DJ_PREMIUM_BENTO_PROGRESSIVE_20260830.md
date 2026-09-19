# BỘ HỒ SƠ HỘI ĐỒNG LIÊN BỘ — JAYT SECTION DJ
## BENTO HIỆN ĐẠI, TIẾT LỘ NỘI DUNG LŨY TIẾN & VÍ VOUCHER FAIL-CLOSED

**Mã hồ sơ:** `COUNCIL_DECISION_PACK_DJ_PREMIUM_BENTO_PROGRESSIVE_20260830`  
**Phiên bản Staging SOT:** `v3.438.0-staging.dj`  
**Chỉ thị chỉ đạo:** JAYT-245 Mục DJ (Dòng 2695–2722)  
**Địa chỉ Staging hoạt động:** `http://127.0.0.1:4173/`  
**HTTP Status:** `200 OK` (Content-Type: `text/html; charset=utf-8`)  
**Thời gian lập hồ sơ:** 2026-08-30T12:20:00+07:00  
**Trạng thái Quản trị:** `PENDING_CEO_LIVE_REVIEW` (Tiếp tục nâng cấp, không Go-Live)

---

### I. BIÊN BẢN ĐÁNH GIÁ 7 PHÒNG BAN LIÊN BỘ (SECTION DJ)

| Phòng ban | Báo cáo hành động thực tế | Trạng thái kỹ thuật |
| :--- | :--- | :---: |
| **1. Product** | Cô lập hoàn toàn nhãn "Dùng ngay" / "Bằng chứng hợp lệ" trong Ví Voucher. Toàn bộ 13 entry phân bổ chuẩn: **10 Cổng chính thức, 3 Kênh theo dõi**. Giữ vững Fail-Closed T1 = 0. | **READY_FOR_CEO_REVIEW** |
| **2. Design** | Thiết lập phân cấp quyết định rõ ràng tại Hero: 1 CTA Primary nổi bật (Solid Blue 48px), 1 Secondary (Glass Outline 46px), 1 Tertiary (Ghost 44px). Card giảm tải chữ, chuyển chi tiết vào Drawer. | **READY_FOR_CEO_REVIEW** |
| **3. UX/CX** | Triển khai **Progressive Disclosure Drawer** (`#jayt-drawer-root`): Mặt thẻ tinh gọn, mở bảng chi tiết kèm căn cứ đối soát bằng nút "+ Chi tiết" hoặc bấm thẻ; hỗ trợ phím `Escape` và Focus trapping. | **READY_FOR_CEO_REVIEW** |
| **4. Growth** | Giữ vững candidate queue trong môi trường đối soát nội bộ; không phát tán dữ liệu candidate chưa có evidence contract cấp record. | **READY_FOR_CEO_REVIEW** |
| **5. Data & Trust** | Duy trì 100% nguyên tắc trung thực: 0 T1, 0 giá/giảm giá tự khai, 0 affiliate write, 0 asset mismatch (Bảo tàng Đà Nẵng `visual_asset_url: null`). | **READY_FOR_CEO_REVIEW** |
| **6. Engineering** | Đồng bộ SOT duy nhất `jayt_storefront_staging_dj.js`, phục vụ trực tiếp trên máy chủ Staging `http://127.0.0.1:4173/` (`HTTP 200 OK`), **0 lỗi console error/warning**. | **READY_FOR_CEO_REVIEW** |
| **7. QA** | Thực thi kiểm thử tự động Chrome CDP đo lường viewport thực (1440x900, 768x1024, 390x844), touch target $\ge 44\text{px}$, **16/16 capture có mã băm SHA-256 hoàn toàn riêng biệt**, trích xuất Raw DOM & Viewport evidence. | **READY_FOR_CEO_REVIEW** |

---

### II. BẰNG CHỨNG LIVE RUNTIME & KẾT QUẢ ĐO KIỂM THỰC TẾ

#### 1. Đo lường Phân cấp Nút Quyết định Hero (Hero Decision Hierarchy & Touch Targets)
Trích xuất trực tiếp từ `staging_dj_raw_dom_evidence.json`:
- **Primary CTA (Solid Blue):** `🏛️ Xem ưu đãi & cổng đang kiểm →` — Chiều cao: **48px** (vượt chuẩn $ge 44	ext{px}$).
- **Secondary CTA (Glass Outline):** `🎟️ Ví Voucher (13) →` — Chiều cao: **46px** (vượt chuẩn $ge 44	ext{px}$).
- **Tertiary CTA (Ghost Text):** `🛡️ Kiểm tra trước khi mua →` — Chiều cao: **44px** (chuẩn $ge 44	ext{px}$).
- **Mobile Bottom Nav Buttons:** Chiều cao: **59px** (chuẩn $ge 44	ext{px}$).

#### 2. Ví Voucher Fail-Closed (13 Entries: 10 Cổng chính thức, 3 Radar, 0 Dùng ngay)
- Không còn bất kỳ thẻ nào mang nhãn "Dùng ngay (đã xác thực)" hay "Bằng chứng hợp lệ".
- Badge chuẩn hóa: `🏛️ CỔNG THÔNG TIN CHÍNH THỨC` và `📡 KÊNH GIÁM SÁT NGUỒN TIN`.
- Hành động: `🏛️ Mở cổng chính thức để kiểm tra điều kiện →` / `🏛️ Mở cổng chính thức →`.

#### 3. Bảng Chi tiết Lũy tiến (Progressive Disclosure Detail Drawer)
- Tên thành phần: `#jayt-drawer-root` (Hộp thoại trượt từ cạnh phải trên Desktop, trượt từ dưới lên trên Mobile).
- Thuộc tính trợ năng: `role="dialog"`, `aria-modal="true"`, `aria-labelledby="drawer-item-title"`.
- Nội dung hiển thị: Tóm tắt & Giới thiệu, Vị trí & Gợi ý di chuyển, Căn cứ đối soát & Domain chính thức, Nút điều hướng Maps và Hành động trực tiếp.

---

### III. BỘ 16 BẢN GHI CAPTURE PROOFS MỚI (BROWSER PACK DJ)

Toàn bộ 16 ảnh chụp kiểm thử tự động tại thời điểm live server hoạt động được lưu trữ tại `07_QUALITY_ASSURANCE/browser_pack_dj/`:

1. `00_desktop_1440_visual_slate_proof.png` (1.086.630 bytes, SHA-256: `067b5489b667e1a3...`)
2. `01_desktop_1440_landmark_hero.png` (526.970 bytes, SHA-256: `cc5773923dc73b66...`)
3. `02_desktop_1440_featured_deals.png` (191.938 bytes, SHA-256: `1ed87549093225bc...`)
4. `03_desktop_1440_culinary_story.png` (207.828 bytes, SHA-256: `84a9d61c5ed29f71...`)
5. `04_desktop_1440_transit_story.png` (533.083 bytes, SHA-256: `a99931d0ab62c4a2...`)
6. `05_desktop_1440_leisure_story.png` (506.510 bytes, SHA-256: `ea08fd1fbf38367e...`)
7. `06_desktop_1440_three_lane_wallet.png` (174.004 bytes, SHA-256: `a5a97fd129f9e8c2...`)
8. `07_desktop_1440_explore_directory.png` (81.385 bytes, SHA-256: `bc4e6731bc5b913b...`)
9. `08_desktop_1440_dark_mode.png` (523.804 bytes, SHA-256: `edf7d83d7d9b183f...`)
10. `09_desktop_1440_reduced_motion.png` (206.844 bytes, SHA-256: `ecd65b4e6b6851dc...`)
11. `10_tablet_768_modern_bento.png` (378.651 bytes, SHA-256: `2c8f61d251af2afd...`)
12. `11_mobile_390_fresh_load_first_fold.png` (183.625 bytes, SHA-256: `10a902ffaf869441...`)
13. `12_mobile_390_food_journey_route.png` (64.066 bytes, SHA-256: `5c33844014cdb772...`)
14. `13_mobile_390_three_lane_wallet.png` (75.797 bytes, SHA-256: `23df9c54e8a25229...`)
15. `14_progressive_disclosure_drawer_open.png` (263.634 bytes, SHA-256: `e03893c52db2ccb8...`)
16. `15_buy_decision_interactive.png` (72.662 bytes, SHA-256: `e1cd013970589462...`)

---

### IV. CAM KẾT VẬN HÀNH & HÀNG RÀO AN TOÀN

1. **Khóa phát hành Production:** Tiếp tục duy trì trên Staging local `http://127.0.0.1:4173/`, không phát tán ra production khi chưa có phê duyệt từ CEO.
2. **Không Affiliate write / Zero-PII:** Duy trì 100% không chèn mã affiliate, không thu thập cookie hay secret của người dùng.
3. **Kính trình CEO trực tiếp mở trình duyệt kiểm tra live tại `http://127.0.0.1:4173/`.**
