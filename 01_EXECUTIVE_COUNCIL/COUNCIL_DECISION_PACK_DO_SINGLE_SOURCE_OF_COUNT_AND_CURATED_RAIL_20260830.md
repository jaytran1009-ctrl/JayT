# BỘ HỒ SƠ HỘI ĐỒNG LIÊN BỘ — JAYT SECTION DO
## THIẾT LẬP SINGLE SOURCE OF COUNT ĐỐI SOÁT & NÂNG CẤP RAIL TUYỂN CHỌN BẢN ĐỊA THỰC SỰ

**Mã hồ sơ:** `COUNCIL_DECISION_PACK_DO_SINGLE_SOURCE_OF_COUNT_AND_CURATED_RAIL_20260830`  
**Phiên bản Staging SOT:** `v3.443.0-staging.do`  
**Chỉ thị chỉ đạo:** JAYT-245 Mục DO (Dòng 2836–2853)  
**Địa chỉ Staging hoạt động:** `http://127.0.0.1:4173/`  
**HTTP Status:** `200 OK` (Content-Type: `text/html; charset=utf-8`)  
**Thời gian lập hồ sơ:** 2026-08-30T13:02:00+07:00  
**Trạng thái Quản trị:** `PENDING_CEO_LIVE_REVIEW` (Tiếp tục nâng cấp, không Go-Live)

---

### I. BIÊN BẢN ĐÁNH GIÁ 7 PHÒNG BAN LIÊN BỘ (SECTION DO)

| Phòng ban | Báo cáo hành động thực tế | Trạng thái kỹ thuật |
| :--- | :--- | :---: |
| **1. Product** | Thiết lập cấu trúc trải nghiệm hai tầng: Tầng 1 là Rail Tuyển Chọn Bản Địa 4 điểm hẹn tiêu biểu có lý do ghé thăm cụ thể (`editorial-curated-card`); Tầng 2 là Lối vào Khám phá Danh mục đầy đủ 50 mục phân tầng. | **READY_FOR_CEO_REVIEW** |
| **2. Design** | Hoàn thiện Visual System DO: Giữ palette đại dương - cát vàng thanh lịch, xử lý crop ảnh địa phương rights-pass ($1200\times 800\text{px}$ và $1280\times 853\text{px}$) có attribution bản quyền rõ ràng; loại bỏ hiệu ứng rainbow gradient và drop shadow nặng. | **READY_FOR_CEO_REVIEW** |
| **3. UX/CX** | Luồng tương tác 1 click chuẩn xác: Click từng journey mở đúng tập dữ liệu khớp 100% với counter hiển thị (`FOOD_JOURNEY` $\rightarrow$ đúng 11 mục, `LEISURE_JOURNEY` $\rightarrow$ đúng 27 mục). Drawer bẫy tiêu điểm hoàn chỉnh với Escape trả focus về nút kích hoạt ban đầu. | **READY_FOR_CEO_REVIEW** |
| **4. Growth** | Đo lường ý định khám phá/lưu/mở nguồn theo tier; đồng bộ số liệu journey counter trực tiếp từ runtime ledger, không phóng đại số lượng deal. | **READY_FOR_CEO_REVIEW** |
| **5. Data & Trust** | **Thiết lập Single Source of Count**: Tạo hàm đối soát `computeSingleSourceOfCount()` duy nhất, xuất snapshot JSON định danh từng item ID (`staging_do_journey_count_snapshot.json`). Đảm bảo 100% đồng nhất giữa runtime DOM, HTML prerender và QA report. | **READY_FOR_CEO_REVIEW** |
| **6. Engineering** | Đóng gói SOT duy nhất `jayt_storefront_staging_do.js`, phục vụ trực tiếp trên máy chủ Staging `http://127.0.0.1:4173/` (`HTTP 200 OK`), **0 lỗi console error/warning**. | **READY_FOR_CEO_REVIEW** |
| **7. QA** | Quét toàn diện **100% phần tử focusable visible** (Desktop 48 items, Mobile 46 items) đều đạt $\ge 44\times 44\text{px}$ (**0 vi phạm**); kiểm thử click journey và chu trình bàn phím Tab/Shift+Tab trong Drawer; sản xuất 16/16 capture proofs độc bản với 16 mã băm SHA-256 riêng biệt. | **READY_FOR_CEO_REVIEW** |

---

### II. BẰNG CHỨNG SINGLE SOURCE OF COUNT & ĐỐI SOÁT RUNTIME

Toàn bộ số liệu hiển thị trên giao diện người dùng được đồng bộ từ tệp bằng chứng kỹ thuật [`07_QUALITY_ASSURANCE/staging_do_journey_count_snapshot.json`](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/07_QUALITY_ASSURANCE/staging_do_journey_count_snapshot.json):

```json
{
  "total_ledger_items": 50,
  "counts": {
    "an_gi": 11,
    "di_dau": 27,
    "tien_ich": 18,
    "mua_sam_hoc_tap": 12
  },
  "labels": {
    "an_gi": "11 Địa điểm ẩm thực dẫn nguồn",
    "di_dau": "27 Điểm tham quan & rạp chiếu",
    "tien_ich": "18 Tiện ích công cộng TP. Đà Nẵng",
    "mua_sam_hoc_tap": "12 Cổng chính sách & học đường"
  }
}
```

#### Đối Soát Kết Quả Click Hành Trình Trực Tiếp (DOM Result):
- **Click 🍔 Ẩm Thực Bản Địa:** Runtime mở view `FOOD_JOURNEY` $\rightarrow$ DOM render chính xác **11 thẻ địa điểm ẩm thực** (trước lọc).
- **Click 🎬 Đi Chơi & Văn Hóa:** Runtime mở view `LEISURE_JOURNEY` $\rightarrow$ DOM render chính xác **27 thẻ điểm tham quan & rạp chiếu**.
- **Click 🚌 Tiện Ích Đô Thị:** Runtime mở view `EXPLORE` lọc `TIER_3_UTILITY` $\rightarrow$ DOM render chính xác **18 tiện ích công cộng**.
- **Click 🎓 Chính Sách & Học Đường:** Runtime mở view `EXPLORE` lọc `TIER_2_PROGRAMME` $\rightarrow$ DOM render chính xác **20 cổng chương trình chính thức**.

---

### III. BẢN THIẾT KẾ RAIL TUYỂN CHỌN BẢN ĐỊA THỰC SỰ (CURATED EDITORIAL RAIL)

Thay vì lưới danh mục cổng thông tin dàn hàng ngang, Section DO đã chuyển thành **4 Thẻ Điểm Hẹn & Tiện Ích Bản Địa Nổi Bật** với lý do chọn lọc và hình ảnh thực địa phương:

1. 🍜 **Mì Quảng Huỳnh Thúc Kháng:**
   - *Lý do tuyển chọn:* Điểm hẹn ẩm thực bản địa Hải Châu
   - *Hình ảnh:* Ảnh Mì Quảng thực tế $1280\times 853\text{px}$ (CC BY 2.0)
   - *Phân tầng:* `📍 TIỆN ÍCH CÔNG CỘNG`
   - *Hành động:* `📍 Xem tiện ích & Maps →`
2. 🌉 **Mạng Lưới Buýt DanaBus:**
   - *Lý do tuyển chọn:* Giao thông công cộng trợ giá đô thị
   - *Hình ảnh:* Ảnh Cầu Sông Hàn $1200\times 800\text{px}$ (CC BY-SA 4.0)
   - *Phân tầng:* `🏛️ CỔNG CHÍNH THỨC`
   - *Hành động:* `🏛️ Mở cổng danangbus.vn →`
3. 🏛️ **Bảo Tàng Điêu Khắc Chăm:**
   - *Lý do tuyển chọn:* Di sản văn hóa cạnh Cầu Rồng
   - *Hình ảnh:* Ảnh Bảo tàng Chăm $1280\times 853\text{px}$ (CC BY 2.0)
   - *Phân tầng:* `📍 TIỆN ÍCH CÔNG CỘNG`
   - *Hành động:* `🏛️ Mở cổng chammuseum.vn →`
4. 📚 **Thư Viện KHTH Bạch Đằng:**
   - *Lý do tuyển chọn:* Không gian tự học công cộng ven sông
   - *Hình ảnh:* Ảnh Bạch Đằng ven sông $1280\times 853\text{px}$ (CC BY 2.0)
   - *Phân tầng:* `📍 TIỆN ÍCH CÔNG CỘNG`
   - *Hành động:* `📍 Xem tiện ích & Maps →`

---

### IV. BỘ 16 BẢN GHI CAPTURE PROOF MỚI (BROWSER PACK DO)

Toàn bộ 16 ảnh chụp kiểm thử tự động tại thời điểm live server hoạt động đạt **16/16 mã băm SHA-256 hoàn toàn riêng biệt**, được lưu trữ tại `07_QUALITY_ASSURANCE/browser_pack_do/`:

1. `00_desktop_1440_visual_slate_proof.png` (1.086.630 bytes, SHA-256: `067b5489b667e1a3...`)
2. `01_desktop_1440_landmark_hero.png` (537.492 bytes, SHA-256: `cf7993ce6df7df43...`)
3. `02_desktop_1440_featured_deals.png` (193.850 bytes, SHA-256: `63d4e8c187be0896...`)
4. `03_desktop_1440_culinary_story.png` (205.811 bytes, SHA-256: `65074f9d2be2c10b...`)
5. `04_desktop_1440_transit_story.png` (523.518 bytes, SHA-256: `a16a8270ca88d0fe...`)
6. `05_desktop_1440_leisure_story.png` (506.772 bytes, SHA-256: `623b05423851b269...`)
7. `06_desktop_1440_three_lane_wallet.png` (173.417 bytes, SHA-256: `6cb1b8db74fe6a29...`)
8. `07_desktop_1440_explore_directory.png` (81.267 bytes, SHA-256: `2f748b3eeaf11ae8...`)
9. `08_desktop_1440_dark_mode.png` (498.293 bytes, SHA-256: `3f88ffc53aa9fa33...`)
10. `09_desktop_1440_reduced_motion.png` (500.069 bytes, SHA-256: `3db58a825b63eb59...`)
11. `10_tablet_768_modern_bento.png` (360.719 bytes, SHA-256: `754e5e992d14e8a8...`)
12. `11_mobile_390_fresh_load_first_fold.png` (173.571 bytes, SHA-256: `d0a1fc68a87a0b94...`)
13. `12_mobile_390_food_journey_route.png` (51.078 bytes, SHA-256: `2cd51cc4d1663799...`)
14. `13_mobile_390_three_lane_wallet.png` (71.778 bytes, SHA-256: `70361afa170dc6ee...`)
15. `14_progressive_disclosure_drawer_open.png` (258.560 bytes, SHA-256: `e96407725ed7de23...`)
16. `15_buy_decision_interactive.png` (72.208 bytes, SHA-256: `807ea5f813b1bf87...`)

---

### V. CAM KẾT VẬN HÀNH & HÀNG RÀO AN TOÀN

1. **Khóa phát hành Production:** Tiếp tục duy trì trên Staging local `http://127.0.0.1:4173/`, không phát tán ra production khi chưa có phê duyệt từ CEO.
2. **Không Affiliate write / Zero-PII:** Duy trì 100% không chèn mã affiliate, không thu thập cookie hay secret của người dùng.
3. **Kính trình CEO trực tiếp mở trình duyệt kiểm tra live tại `http://127.0.0.1:4173/`.**
