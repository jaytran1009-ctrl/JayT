# HỒ SƠ THẨM ĐỊNH TRẢI NGHIỆM JAYT-371: LUXURY REDESIGN & EDITORIAL BENTO GRID

**MÃ HỒ SƠ:** `JAYT_371_GEMINI_REVIEW_PACKET`  
**CĂN CỨ PHÁP LÝ:** [Phán quyết CEO J371 R2](file:///D:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/01_EXECUTIVE_COUNCIL/JAYT_371_CEO_R2_HERO_CORRECTION_ACCEPTANCE_AND_GEMINI_PACKET_READY.md)  
**ĐƠN VỊ THI HÀNH:** KHỐI KỸ THUẬT ANTIGRAVITY  
**NGÀY PHÁT HÀNH:** 10/09/2026  
**CANONICAL DOMAIN:** [https://jayt-production-v3420.vercel.app](https://jayt-production-v3420.vercel.app)  
**DEPLOYMENT ID:** `dpl_F1KHmdZpobwpFN7KxDX82twMPeb5`  
**PHIÊN BẢN HỆ THỐNG:** `v3.433.0-j371-r1` (Baseline nghiệm thu)  

---

## 1. MỤC TIÊU & BỐI CẢNH THẨM ĐỊNH

Hồ sơ này cung cấp toàn bộ dữ liệu đối soát thực tế, liên kết endpoint trực tiếp, và bằng chứng kiểm thử giao diện để **Gemini thẩm định độc lập** trải nghiệm người dùng trên hệ thống JayT Đà Nẵng sau đợt đại tu cấu trúc theo chuẩn Bento Grid đương đại (*Editorial Bento Grid*). 

> [!NOTE]
> Hồ sơ được trình bày khách quan, độc lập và **tuyệt đối không tiên đoán hoặc thay thế phán quyết thẩm định của Gemini**.

---

## 2. KIẾN TRÚC GIAO DIỆN & CÁC MODULE TIỆN ÍCH LIVE

### A. Bento Grid & Hai Chủ Đề Thẩm Mỹ (Dual Themes)
- **Porcelain Light (Mặc định):** Nền canvas `#F7F8FA`, bề mặt thẻ `#FFFFFF`, chữ `#17212B`, viền kính `#D5DCE3`.
- **Obsidian Titanium:** Nền canvas `#101419`, bề mặt thẻ `#1B222A`, chữ `#F3F6FA`, viền tối `#2F3944`.
- **Đổ bóng 3 lớp:** `0 1px 2px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.05), 0 24px 60px rgba(0,0,0,0.05)`.
- **Bo góc chuẩn:** Thẻ Bento 24px, vé voucher 20px với đường cắt vé (punch-holes) 20px.
- **Nút chuyển đổi giao diện:** Nút bấm trực tiếp tại Header chuyển đổi mượt mà giữa hai chủ đề.

### B. Hero Cầu Rồng Hoàng Hôn & Phun Lửa 16:9
- **Hình ảnh:** Tỷ lệ khung hình chuẩn 16:9 hiển thị hình ảnh Cầu Rồng Đà Nẵng lúc hoàng hôn với đầu rồng phun lửa rực rỡ (`assets/images/dragon_bridge_hero_sunset_fire.jpg`, kích thước tự nhiên $1376 \times 768$).
- **Khai báo nguồn gốc (ASSET_04 & CEO R2):** Tài sản được khai báo trung thực trong [asset_manifest.json](file:///D:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/06_TRUST_AND_EVIDENCE/j371/asset_manifest.json) là tác phẩm đồ họa kỹ thuật số độ trung thực cao (`GENERATED_EDITORIAL_DIGITAL_ARTWORK`), không phải ảnh chụp máy ảnh mộc.
- **Alt text chuẩn xác:** *"Cầu Rồng Đà Nẵng lung linh trong ánh hoàng hôn rực rỡ và khoảnh khắc đầu rồng phun lửa bên dòng sông Hàn"*.
- **Khẩu hiệu:** *"Đà Nẵng, mỗi ngày một chút hời."* (Phụ đề dưới 90 ký tự).
- **Huy hiệu khách hàng:** `✨ Gợi ý tiết kiệm mỗi ngày` (Loại bỏ 100% ngôn ngữ kiểm toán nội bộ).
- **3 nút kêu gọi hành động (CTA):** *So giá bữa trưa*, *Tìm ưu đãi*, *Chia tiền nhóm* hiện diện đầy đủ tại `scrollY = 0`.
- **Bố cục Mobile 390px:** Thứ tự hiển thị chuẩn — Tiêu đề và 3 CTA xuất hiện trước ảnh Cầu Rồng; không có lỗi tràn ngang (`scrollWidth = clientWidth = 390px`).

### C. Bốn Module Tiện Ích Trực Tiếp Trên Trang Chủ
1. **Module 1 — So kèo giá bữa trưa 3 ứng dụng:**
   - Slider đồng bộ với ô nhập số (20.000₫ – 200.000₫) và tùy chọn phụ phí qua cầu / giờ cao điểm.
   - So sánh đồng thời ShopeeFood vs GrabFood vs BeFood; ứng dụng có giá thấp nhất được viền ngọc lục bảo và gắn huy hiệu `✓ Thấp nhất`.
   - Độ trễ phản hồi từ thao tác đến cập nhật DOM: p50 = 0.20ms, p95 = 0.90ms (< 20ms).
   - Biểu ngữ ước tính: *"Ước tính từ thông tin bạn nhập. Giá cuối cùng phụ thuộc chương trình tại từng thời điểm của từng app."*
2. **Module 2 — Kho ưu đãi xác thực Đà Nẵng (81 offers):**
   - Giữ nguyên 81 ưu đãi ẩm thực, cà phê và rạp chiếu phim đã đối soát nguồn gốc.
   - Thẻ voucher tạo hình lỗ đục punch-holes; bộ lọc danh mục và nút sao chép mã kèm toast thông báo lịch sự.
3. **Module 3 — Chia tiền nhóm số nguyên chính xác:**
   - Bảo toàn 100% số nguyên VNĐ cho nhóm 1–50 người ($100.000₫ / 3 \text{ người} \to 1 \times 33.334₫ + 2 \times 33.333₫ = 100.000₫$).
   - Tạo thẻ Zalo Pass kích thước Canvas 1080×1440 (PNG), nút sao chép định dạng tin nhắn Zalo và Web Share API.
4. **Module 4 — Mua sắm KTX & Học tập thiết yếu (30 SKUs):**
   - 30 sản phẩm thiết yếu thuộc 6 nhóm; ảnh tỷ lệ 1:1, tiêu đề 2 dòng, ngày khảo sát rõ ràng (`10/09/2026`).
   - Chính sách trung thực quảng cáo: Không hiển thị tem "Đáy 90 ngày" do thiếu lịch sử giá; không nhận hoa hồng affiliate; hiển thị biểu ngữ: *"Giá khảo sát — Kiểm tra tồn kho tại sàn. Danh mục tham khảo cho đời sống sinh viên; liên kết dẫn thẳng đến gian hàng chính hãng đối soát."*

---

## 3. RÀNG BUỘC MẬT MÃ & ĐỐI SOÁT ENDPOINT PRODUCTION

Bảng mã băm SHA-256 đối soát trực tiếp giữa tệp nguồn triển khai và phản hồi live từ CDN Vercel:

| Endpoint Live | HTTP | Tệp Nguồn Cục Bộ | SHA-256 Phục Vụ Live (Khớp 100%) |
| :--- | :---: | :--- | :--- |
| `https://jayt-production-v3420.vercel.app/` | `200` | `deploy_personal_v3420/index.html` | `e605cf040146344c887ed82159a3c5aa799aed9f93b4820e3dc1a9cf5cf87cdb` |
| `https://jayt-production-v3420.vercel.app/styles.css` | `200` | `deploy_personal_v3420/styles.css` | `ac476e84324cbc416ca6ea0250ebf88e9373712e794a886c2b8a4946fb849600` |
| `https://jayt-production-v3420.vercel.app/jayt_apex_interface.js` | `200` | `deploy_personal_v3420/jayt_apex_interface.js` | `3f9516afbf4a0ff0b10173ac8d5ed5c847be0a5d52d144b9fbb0e72449f154b2` |
| `https://jayt-production-v3420.vercel.app/published_manifest.json` | `200` | `deploy_personal_v3420/published_manifest.json` | `250ccee1c63a14b00a225ff107d5aa9767cee981518d85fbc0b374317f9e3b59` |
| `https://jayt-production-v3420.vercel.app/deals_feed.json` | `200` | `deploy_personal_v3420/deals_feed.json` | `97d29399738cbe6f1aa933869926b0051e58ae9ea3fa2698942ea3dbad6e408c` |
| `https://jayt-production-v3420.vercel.app/registry.json` | `200` | `deploy_personal_v3420/registry.json` | `52a8811109dfb375b42d76f8273617e94e50eb97eebc5d6428c9462719bafeaa` |
| `https://jayt-production-v3420.vercel.app/assets/images/dragon_bridge_hero_sunset_fire.jpg` | `200` | `deploy_personal_v3420/assets/images/dragon_bridge_hero_sunset_fire.jpg` | `6e2707835bd518ca2ca4d044d69dbddefa6376c759663a12ce16321816851806` |

---

## 4. DANH MỤC BẰNG CHỨNG KIỂM THỬ THỊ GIÁC (RUNTIME SCREENSHOTS)

Các ảnh chụp màn hình được kiểm định trực tiếp bằng Puppeteer trên Production CDN:

- **Desktop 1440x900:**
  - Porcelain Light (`scrollY=0`): `07_QUALITY_ASSURANCE/runtime_evidence/j371_r1_prod_desktop_1440_light_scrollY0.png`
  - Obsidian Titanium (`scrollY=0`): `07_QUALITY_ASSURANCE/runtime_evidence/j371_r1_prod_desktop_1440_dark_scrollY0.png`
- **Tablet 768x1024:**
  - Porcelain Light: `07_QUALITY_ASSURANCE/runtime_evidence/j371_r1_prod_tablet_768_light_scrollY0.png`
  - Obsidian Titanium: `07_QUALITY_ASSURANCE/runtime_evidence/j371_r1_prod_tablet_768_dark_scrollY0.png`
- **Mobile 390x844:**
  - Porcelain Light: `07_QUALITY_ASSURANCE/runtime_evidence/j371_r1_prod_mobile_390_light_scrollY0.png`
  - Obsidian Titanium: `07_QUALITY_ASSURANCE/runtime_evidence/j371_r1_prod_mobile_390_dark_scrollY0.png`

---

## 5. TÀI LIỆU VÀ BIÊN NHẬN ĐÃ NIÊM PHONG

1. **Biên nhận QA Runtime trực tiếp:**  
   [JAYT_371_R1_HERO_CORRECTION_RECEIPT.json](file:///D:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/runtime_evidence/JAYT_371_R1_HERO_CORRECTION_RECEIPT.json)  
   SHA-256: `6ba87260001dbc34712bb8ff4bd8823ac1e7d1cb626d59dbfb9b32dd821cedc5`
2. **Biên nhận phát hành Production:**  
   [JAYT_371_R1_HERO_CORRECTION_RELEASE_RECEIPT.json](file:///D:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/08_RELEASE_VAULT/JAYT_371_R1_HERO_CORRECTION_RELEASE_RECEIPT.json)  
   SHA-256: `80e482e6a51d1c233e4dfb64ca3bcaeff3455f7c5afc1b848b99eaf585687a06`
3. **Lệnh thi công hoàn tất:**  
   [WORK_ORDER_J371_R1_HERO_AND_PUBLIC_COPY_CORRECTION.json](file:///D:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/04_DATA_PIPELINE/dispatch/WORK_ORDER_J371_R1_HERO_AND_PUBLIC_COPY_CORRECTION.json)  
   SHA-256: `a9ab683d36dcd95f8337b1f518ab9d58322d1a82ec0fe1a37fc6dccce50e214a`
4. **Asset Manifest J371 R1:**  
   [asset_manifest.json](file:///D:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/06_TRUST_AND_EVIDENCE/j371/asset_manifest.json)  
   SHA-256: `9f7531ee0245d2326bed348217c5a9be4a4dd68ca02a0ddb293d85a6e7b08a93`
