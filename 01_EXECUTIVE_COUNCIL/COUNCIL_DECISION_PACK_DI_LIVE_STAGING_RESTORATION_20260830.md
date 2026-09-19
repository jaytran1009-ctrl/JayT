# BỘ HỒ SƠ HỘI ĐỒNG LIÊN BỘ — JAYT SECTION DI
## KHÔI PHỤC STAGING RUNTIME & XÁC THỰC BẰNG CHỨNG LIVE DOM (CHỜ CEO REVIEW)

**Mã hồ sơ:** `COUNCIL_DECISION_PACK_DI_LIVE_STAGING_RESTORATION_20260830`  
**Phiên bản Staging SOT:** `v3.437.0-staging.dh`  
**Chỉ thị chỉ đạo:** JAYT-245 Mục DI (Dòng 2669–2692)  
**Địa chỉ Staging hoạt động:** `http://127.0.0.1:4173/`  
**HTTP Status:** `200 OK` (Content-Type: `text/html; charset=utf-8`)  
**Thời gian lập hồ sơ:** 2026-08-30T12:10:00+07:00  
**Trạng thái Quản trị:** `PENDING_CEO_LIVE_REVIEW` (Tuyệt đối không tự nghiệm thu Go-Live)

---

### I. BIÊN BẢN ĐÁNH GIÁ 7 PHÒNG BAN LIÊN BỘ (SECTION DI)

| Phòng ban | Báo cáo hành động thực tế | Trạng thái kỹ thuật |
| :--- | :--- | :---: |
| **1. Product** | Giữ vững chuẩn Fail-Closed `0 T1 / 20 T2 / 18 T3 / 12 T4`. Bento Hero CTA dẫn lối trung thực: `🏛️ Xem ưu đãi & cổng đang kiểm →`, không có claim phóng đại. | **READY_FOR_CEO_REVIEW** |
| **2. Design** | Modern Bento Grid 12 cột, responsive 1440/768/390, no-image surfaces sạch sẽ, không rỗng; ảnh thực tế Đà Nẵng ghi đúng kích thước gốc (1200x800px / 1280x853px). | **READY_FOR_CEO_REVIEW** |
| **3. UX/CX** | Luồng thao tác một tay trên di động (Mobile 390px), tương tác 3 nút 44px, Ví Voucher 3 làn (13 chính sách) và Cổng kiểm tra trước khi mua hoạt động trơn tru. | **READY_FOR_CEO_REVIEW** |
| **4. Growth** | Pipeline candidate tiếp tục duy trì trong private queue, không công bố dữ liệu candidate ra UI public khi chưa có hồ sơ chứng thực. | **READY_FOR_CEO_REVIEW** |
| **5. Data & Trust** | Khóa hoàn toàn T1 = 0, loại bỏ toàn bộ raw fields; chỉ admit từng T1 khi có đầy đủ evidence contract cấp record (ID, capture hash, locator, reviewer, freshness). | **READY_FOR_CEO_REVIEW** |
| **6. Engineering** | Khởi chạy server local runtime tại `http://127.0.0.1:4173/` phục vụ trực tiếp từ thư mục `staging_deploy_dh`, xác thực `HTTP 200 OK`, 1 script duy nhất `jayt_storefront_staging_dh.js`. | **READY_FOR_CEO_REVIEW** |
| **7. QA** | Thực thi kiểm thử tự động Chrome CDP trực tiếp trên `http://127.0.0.1:4173/`: **16/16 capture có mã băm SHA-256 hoàn toàn riêng biệt**, **0 lỗi console error**, **0 warning**, trích xuất toàn bộ Raw DOM evidence. | **READY_FOR_CEO_REVIEW** |

---

### II. BẰNG CHỨNG LIVE RUNTIME & TRÍCH XUẤT RAW DOM

#### 1. Xác thực HTTP & Server Runtime
- **Endpoint:** `http://127.0.0.1:4173/`
- **HTTP Code:** `200 OK`
- **Headers:** `Content-Type: text/html; charset=utf-8`, `Cache-Control: no-store, no-cache`
- **Script Endpoint:** `http://127.0.0.1:4173/jayt_storefront_staging_dh.js` (`HTTP 200 OK`)

#### 2. Dữ liệu Raw DOM trích xuất tại Runtime (`staging_di_raw_dom_evidence.json`)
```json
{
  "home": {
    "title": "JayT Đà Nẵng — Đà Nẵng Để Sống Hay Hơn Hôm Nay (v3.437.0-staging.dh)",
    "brandTagline": "Sống Hay Hơn Mỗi Ngày • v3.437.0-staging.dh",
    "heroMoment": "✨ BUỔI TỐI • GIẢI TRÍ, VĂN HÓA & DẠO SÔNG HÀN",
    "heroTitle": "Đà Nẵng Để Sống Hay Hơn Hôm Nay",
    "heroCtaDeal": "🏛️ Xem ưu đãi & cổng đang kiểm →",
    "heroCtaVoucher": "🎟️ Voucher chính thức →",
    "heroCtaPrice": "🛡️ Kiểm tra trước khi mua →",
    "featuredDealsSectionTitle": "🏛️ Cổng Ưu Đãi & Chính Sách Chính Thức Đang Kiểm",
    "featuredCardsCount": 6,
    "firstCardBadge": "🏛️ CỔNG CHÍNH THỨC",
    "firstCardBrand": "CGV CINEMAS",
    "firstCardAction": "🏛️ Mở cổng chính thức →"
  },
  "wallet": {
    "title": "Tra Cứu Quyền Lợi Chính Thống Tại Đà Nẵng",
    "totalEntries": 13
  },
  "explore_t1_fail_closed": {
    "emptyStateText": "Đang đối soát dữ liệu deal giá thực",
    "cardsDisplayed": 0
  },
  "smart_buy": {
    "resultStatus": "⚠️ Trạng thái: Chưa đủ dữ liệu đối soát giá thực",
    "resultText": "• Món đồ/dịch vụ \"DanaBus\" hiện chưa có chứng thực giá niêm yết độc lập.\n• Khuyến nghị: Mở cổng chính thức của đơn vị cung cấp để kiểm tra điều kiện áp dụng và phụ phí trước khi thanh toán."
  }
}
```

---

### III. BỘ 16 BẢN GHI CAPTURE PROOFS MỚI (BROWSER PACK DI)

Toàn bộ 16 ảnh chụp kiểm thử tự động tại thời điểm live server hoạt động được lưu trữ tại `07_QUALITY_ASSURANCE/browser_pack_di/`:

1. `00_desktop_1440_visual_slate_proof.png` (1.086.630 bytes, SHA-256: `067b5489b667e1a3...`)
2. `01_desktop_1440_landmark_hero.png` (536.110 bytes, SHA-256: `d8013e8ae02c7b16...`)
3. `02_desktop_1440_featured_deals.png` (222.081 bytes, SHA-256: `287c3e9943886f20...`)
4. `03_desktop_1440_culinary_story.png` (207.576 bytes, SHA-256: `30aab59751e49040...`)
5. `04_desktop_1440_transit_story.png` (526.135 bytes, SHA-256: `34014faff3de86ac...`)
6. `05_desktop_1440_leisure_story.png` (501.689 bytes, SHA-256: `88d9c9dd50e41521...`)
7. `06_desktop_1440_three_lane_wallet.png` (171.324 bytes, SHA-256: `2721cb0c1e8b6d38...`)
8. `07_desktop_1440_explore_directory.png` (81.809 bytes, SHA-256: `7e32c00ba7df7154...`)
9. `08_desktop_1440_dark_mode.png` (532.611 bytes, SHA-256: `331ad110dc0b08fe...`)
10. `09_desktop_1440_reduced_motion.png` (238.807 bytes, SHA-256: `3b459906fe8a9b72...`)
11. `10_tablet_768_modern_bento.png` (305.431 bytes, SHA-256: `7c783ceb67797d54...`)
12. `11_mobile_390_fresh_load_first_fold.png` (161.050 bytes, SHA-256: `0cb8b4b5742edb28...`)
13. `12_mobile_390_food_journey_route.png` (64.007 bytes, SHA-256: `cbafd3e68328dc01...`)
14. `13_mobile_390_three_lane_wallet.png` (73.136 bytes, SHA-256: `d1e2a034b140318d...`)
15. `14_modal_zero_blur_open_close.png` (280.412 bytes, SHA-256: `00476f383f73ef40...`)
16. `15_buy_decision_interactive.png` (73.692 bytes, SHA-256: `29074c33c07d207f...`)

---

### IV. HÀNG RÀO AN TOÀN & ĐỀ NGHỊ REVIEW

1. **Khóa phát hành Production:** Tiếp tục duy trì trên Staging local `http://127.0.0.1:4173/`, tuyệt đối không phát tán hay mở production release khi chưa có phê duyệt từ CEO.
2. **Không Affiliate write / Zero-PII:** Duy trì 100% không ghi đè affiliate, không thu thập cookie hay secret của người dùng.
3. **Kính trình CEO trực tiếp mở trình duyệt kiểm tra tại `http://127.0.0.1:4173/`.**
