# 🌟 CLAUDE.md — JAYT ĐÀ NẴNG: HƯỚNG DẪN DỰ ÁN DÀNH CHO CLAUDE & NHÀ PHÁT TRIỂN

> **Mục tiêu tệp:** Đây là cẩm nang kiến trúc và chỉ thị vận hành hoàn chỉnh dành cho **Claude (Anthropic Claude Code / Claude Desktop / Claude Projects)** nhằm nắm bắt 100% ngữ cảnh hệ thống JayT Đà Nẵng, duy trì kỷ luật kiến trúc và tiếp tục phát triển không gián đoạn.

---

## 🏛️ 1. TỔNG QUAN DỰ ÁN & SỨ MỆNH (MISSION & IDENTITY)

* **Tên dự án:** JayT Đà Nẵng — Nền Tảng Deal Xác Thực & Hỗ Trợ Đời Sống Sinh Viên Vùng 43.
* **Mục tiêu cốt lõi:** Cung cấp thông tin giá thực trả, lịch rạp chiếu phim, deal cứu đói $\le 25\text{K}$, quyền lợi giáo dục $0$đ và công cụ so sánh giá minh bạch cho học sinh, sinh viên và người trẻ tại TP. Đà Nẵng.
* **Môi trường Production trực tiếp:** `https://deploy-ten-xi-48.vercel.app/`
* **Triết lý sản phẩm:**
  * **0 Deal Ảo — 100% Đối Soát:** Mọi ưu đãi phải có 8 trường chứng cứ và điều kiện áp dụng rõ ràng.
  * **Thuần Vanilla & Siêu Tốc Độ:** Không dùng framework cồng kềnh (React/Vue/Angular), toàn bộ UI chạy trên nền tảng Vanilla JS 60FPS tối ưu vi mô.
  * **Offline-First & PWA:** Hoạt động ngay cả khi mất mạng nhờ Service Worker và bộ nhớ đệm cục bộ `localStorage`.
  * **Monetization Minh Bạch:** Đấu nối tiếp thị liên kết (Shopee Direct, Accesstrade CPA, Klook) gắn nhãn rõ `#JayTAffiliate`.

---

## 🏗️ 2. KIẾN TRÚC THƯ MỤC & NGUYÊN TẮC "SOURCE OF TRUTH" (SOT PARITY)

Hệ thống tuân thủ nghiêm ngặt mô hình **Tam giác đồng bộ (Triple Sync)**:

```text
d:\Công Việc MMO\OPC JayT\JayT-Dự Án Giá Trị Cộng Đồng\
├── 03_SOURCE_OF_TRUTH/        <── [GỐC DUY NHẤT] Mọi chỉnh sửa mã nguồn PHẢI viết vào đây trước
│   ├── index.html             <── Shell HTML, CSS tokens, WCAG AAA, Media styling
│   ├── jayt_apex_interface.js <── Toàn bộ Logic, State, Controller, DOM Renderer, Motion Engines
│   ├── sw.js                  <── PWA Service Worker (Network-First, Cache Purging)
│   ├── vercel.json            <── Cấu hình headers chống stale cache cho Vercel Edge
│   ├── customer_journey_north_star.json <── Hợp đồng dữ liệu hành trình người dùng
│   ├── four_layer_dataset.json          <── Dữ liệu 4 tầng đối soát & 26 địa điểm
│   ├── radar_dataset_086u.json          <── Tín hiệu cộng đồng & mật độ giao thông
│   ├── brand_asset_registry.json        <── Danh mục đối tác & thương hiệu chính thức
│   └── daily_supply_feed_126.json       <── Nguồn cấp deal có hạn & khuyến mãi hôm nay
│
├── deploy/                    <── Thư mục Vercel CLI thực thi deploy (npx vercel --prod --yes)
│   └── public/                <── [CỰC KỲ QUAN TRỌNG] Vercel build outputDirectory là "public"
│       └── (Đồng bộ 100% SHA-256 Parity với 03_SOURCE_OF_TRUTH/)
│
├── 07_QUALITY_ASSURANCE/      <── Bộ 15 Test Suites & Script Deploy Tự Động
│   ├── master_production_release_v9.js <── SCRIPT DEPLOY CHÍNH (Đồng bộ SOT -> deploy & public -> Vercel -> Puppeteer Audit)
│   ├── test_visual_media_pipeline_v1100.js
│   ├── test_smart_affiliate_router_v950.js
│   ├── test_maximum_pinnacle_v900.js
│   └── runtime_evidence/      <── Ảnh chụp kiểm định Puppeteer Desktop/Mobile
│
├── 08_RELEASE_VAULT/          <── Biên bản nghiệm thu, audit packs và báo cáo từng phiên bản
└── 09_OPERATIONS/             <── Kỷ luật vận hành, nhật ký hàng ngày (daily_logs/)
```

> [!IMPORTANT]
> **QUY TẮC BẤT BIẾN CHO CLAUDE:**
> 1. Khi sửa code, luôn sửa trong `03_SOURCE_OF_TRUTH/`.
> 2. Sau khi sửa, chạy script `node 07_QUALITY_ASSURANCE/master_production_release_v9.js` để đồng bộ sang cả `deploy/` và `deploy/public/`, rồi đẩy lên Vercel.
> 3. Tuyệt đối không được cài đặt thêm Webpack/Vite hay chuyển đổi sang framework khác vì sẽ phá vỡ tính nguyên bản và tốc độ phản hồi vi mô $\le 0\text{ms}$.

---

## 💎 3. NĂM TẦNG GIAO DIỆN CHÍNH (5-TIER VISUAL CANVAS)

1. **Tầng 1: Hero & Nhịp Sinh Học Theo Giờ (`apex-tier-1-hero`)**:
   - Header kính mờ với nhãn `[ 🟢 LIVE SYNC: HH:MM:SS ]` đập nhịp từng giây.
   - Nhận diện tự động khung giờ: Sáng (07-11h), Trưa (11:30-13:30), Chiều (14-16h), Tan tầm (16:30-18:30), Tối (19-22h), Cú đêm (22-03h).
   - Card Bento điện ảnh hiển thị deal nổi bật hôm nay (VD: Thứ Tư CGV Culture Day 75K).

2. **Tầng 2: Trọng Tài Giỏ Hàng 3 App & Địa Điểm Thực Tế (`apex-tier-2-hotnow`)**:
   - Thẻ quán ăn thực tế có ảnh thumbnail $80\times80\text{px}$ chuẩn Retina (Phê La Bạch Đằng, Cơm Gà A Hải Thái Phiên).
   - Widget so sánh giá thực trả 3 App (ShopeeFood / GrabFood / BeFood) nhảy số theo thời gian thực khi kéo thanh trượt $20\text{K} - 200\text{K}$.
   - Banner cảnh báo giờ cao điểm 16:30 - 18:30 tự động xuất hiện cảnh báo tắc đường Cầu Rồng / Cầu Sông Hàn.

3. **Tầng 3: Lên Kế Hoạch Tuần Này & Kèo Rạp 7 Ngày (`apex-tier-3-planahead`)**:
   - Lịch chiếu 5 cụm rạp: T2 Metiz 45K, T3 Galaxy 50K, T4 CGV 75K, T5 Starlight 45K, T6 Lotte Cinema, T7 Lẩu nướng, CN Cà phê deadline.
   - Vòng quay cứu đói Kinetic Roulette 60FPS.
   - Trình chia tiền nhóm Split-Bill Pro xuất Boarding Pass 1-chạm gửi qua Zalo.
   - Thẻ vé du lịch cuối tuần Klook Affiliate (Bà Nà Hills, Công viên nước Mikazuki, Núi Thần Tài).

4. **Tầng 4: JayT Student Hub Master 3-in-1 (`student-hub-master`)**:
   - **Tab 1: Deal Cứu Đói $\le 25\text{K}$**: Danh mục 10 quán quanh 4 cụm trường (Bách Khoa/Sư Phạm, Kinh Tế DUE, Duy Tân, Ngoại Ngữ/SPKT) có ảnh món ăn thực tế, định vị Google Maps 1-chạm, hotline gọi điện thoại và nhãn `🌙 Cú Đêm 22h+`.
   - **Tab 2: Đặc Quyền Email .edu.vn (0đ)**: Spotify Student, YouTube Premium HSSV, GitHub Student Pack, Notion Plus, Apple UNiDAYS, JetBrains + Banner mở tài khoản ngân hàng số Cake/MBBank 0đ nhận 50.000₫ (Accesstrade CPA).
   - **Tab 3: Săn Đáy Đồ KTX $\le 49\text{K}$**: Trình mô phỏng xếp chồng 3 tầng mã (Mã Shop 10% + Voucher Sàn 15K + Freeship 0đ) nhập giá tùy ý + 6 món đồ KTX thực tế có ảnh tách nền và nút điều hướng Shopee Affiliate.

5. **Tầng 5: Kho Voucher Toàn Sàn (`apex-tier-4-5-vault`)**:
   - 8 mã voucher thực chiến (ShopeeFood, GrabFood, BeBike, Xanh SM, Shopee KTX, TikTok Shop, Metiz, CGV).
   - Thanh tìm kiếm voucher tức thì $\le 1\text{ms}$.
   - Hiệu ứng bắn hạt sáng Micro-Confetti (24 hạt đa sắc) + âm thanh click cơ học WebAudio (~1200Hz) khi sao chép mã.

---

## ⚡ 4. CÁC CỖ MÁY LÕI TRONG JAVASCRIPT (`jayt_apex_interface.js`)

Khi phát triển thêm tính năng, Claude cần nắm rõ các hàm toàn cục sau:

| Tên Hàm Lõi | Mô Tả & Nhiệm Vụ Kỹ Thuật |
|---|---|
| `startJaytRealtimeHeartbeatEngine()` | Cỗ máy nhịp đập thời gian thực chạy `setInterval` mỗi $1000\text{ms}$, tự động đếm lùi deal và đổi khung giờ. |
| `dispatchSmartAffiliate(platform, campaignId, fallbackUrl, categoryTag)` | Điều hướng Affiliate thông minh: tự động gọi app scheme (`shopeevn://`, `snssdk1180://`), gán `utm_source` và `sub1=campus, sub2=platform, sub3=timestamp`, fallback sang web sau $1.2\text{s}$. |
| `calculateDynamicStack(customPrice)` | Trình tính toán giảm giá 3 tầng KTX theo thời gian thực $\le 1\text{ms}$. |
| `triggerMicroConfetti(event)` | Bung tỏa 24 hạt confetti đa sắc từ tọa độ con trỏ chuột kèm rung nhẹ Haptic. |
| `playHapticTick()` | Phát âm thanh phản hồi vi mô WebAudio 1200Hz và kích hoạt `navigator.vibrate(12)`. |
| `switchHubSection(tabId, btn)` | Chuyển đổi mượt mà 3 tab trong JayT Student Hub (`FOOD_25K`, `EDU_FREE`, `KTX_STACK`). |
| `renderCampusDealsV9(campusKey, chip)` | Render danh sách quán ăn cứu đói theo 4 cụm trường kèm ảnh, map và hotline. |
| `liveSearchVoucher(query)` | Bộ lọc tìm kiếm voucher siêu tốc $\le 1\text{ms}$. |

---

## 🛠️ 5. HƯỚNG DẪN THAO TÁC & LỆNH CLI DÀNH CHO CLAUDE

### Lệnh 1: Kiểm Tra Cú Pháp JavaScript
```powershell
node --check "03_SOURCE_OF_TRUTH/jayt_apex_interface.js"
```

### Lệnh 2: Chạy Bộ Kiểm Định Tự Động Toàn Diện (QA Suites)
```powershell
node "07_QUALITY_ASSURANCE/test_visual_media_pipeline_v1100.js"
node "07_QUALITY_ASSURANCE/test_smart_affiliate_router_v950.js"
node "07_QUALITY_ASSURANCE/test_maximum_pinnacle_v900.js"
```

### Lệnh 3: Đồng Bộ Parity & Phát Hành Lên Vercel Production
```powershell
node "07_QUALITY_ASSURANCE/master_production_release_v9.js"
```
*(Script này tự động copy các tệp từ `03_SOURCE_OF_TRUTH/` sang `deploy/` và `deploy/public/`, đối soát SHA-256, chạy `npx vercel --prod --yes` và khởi chạy Puppeteer để kiểm tra live DOM, chụp ảnh desktop/mobile).*

---

## 🎯 6. KỶ LUẬT CHẤT LƯỢNG (CONSTITUTIONAL GUARDRAILS)

Claude khi tiếp nhận dự án này **BẮT BUỘC** phải tuân thủ:
1. **Zero Console Errors:** Tuyệt đối không để xảy ra bất kỳ lỗi runtime nào trong Console (`ReferenceError`, `TypeError`, `SyntaxError`).
2. **Zero Layout Shift (CLS = 0):** Mọi thẻ `<img>` phải có thuộc tính `width`, `height`, `loading="lazy"`, `decoding="async"`.
3. **WCAG AAA Contrast:** Độ tương phản chữ tối thiểu $7:1$ trên nền tối và $4.5:1$ trên nền sáng.
4. **Không Sửa Đổi Trực Tiếp Thư Mục `deploy/`:** Luôn chỉnh sửa tại `03_SOURCE_OF_TRUTH/` rồi dùng script đồng bộ để tránh tình trạng lệch mã nguồn giữa local và production.
5. **Ghi Nhận Nhật Ký Đầy Đủ:** Mọi quyết định thay đổi phải được cập nhật vào `PROJECT_MEMORY.md` và `09_OPERATIONS/daily_logs/`.

---

*Tài liệu này được biên soạn bởi Hội đồng Kỹ thuật Antigravity — Sẵn sàng cho mọi tác vụ phát triển của Claude.*
