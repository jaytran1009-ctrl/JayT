# BẢN CÔNG BỐ PHÁT HÀNH JAYT-215: REAL VISUAL SUPPLY SPRINT

**Mã Chỉ thị / Work Order:** `JAYT-215`  
**Phiên bản hệ thống:** `Real Visual Supply OS 3.355` (`v3.355.0`)  
**Môi trường:** Live Vercel Production (`https://deploy-ten-xi-48.vercel.app/`)  
**Ngày phát hành:** 27/08/2026  
**Trạng thái phê duyệt:** `IMPLEMENTED_PENDING_CEO_AUDIT`

---

## 1. MỤC TIÊU VÀ NÂNG CẤP NGUỒN CUNG HÌNH ẢNH THẬT (REAL VISUAL SUPPLY)
Thực thi toàn diện chỉ thị JAYT-215 của CEO về việc chuyển giao từ khung monogram/gradient sang **ảnh thật đúng thương hiệu/quán hoặc banner khuyến mãi chính thức**:

1. **Đợt 1 — 12/12 Card Ưu Đãi Chính Thức Có Banner Thật (`EXACT_PROMOTION`)**:
   - 100% nhóm ưu đãi chính thức (Metiz, Starlight, Domino's, Popeyes, Galaxy, Spotify, Microsoft 365, Figma, Autodesk, AWS, v.v.) được cung cấp banner thật 16:9 độ nét cao trên đĩa, mã băm SHA-256 đối soát.
   - Vượt chỉ tiêu tối thiểu của CEO (Đạt **12/12**, yêu cầu >= 6/12).

2. **Đợt 2 — 12/17 Card Địa Điểm Đà Nẵng Có Ảnh Cơ Sở Thực Địa (`EXACT_VENUE`)**:
   - 70.6% nhóm địa điểm (Metiz Helio, Starlight Nguyễn Kim, Galaxy Coop, CGV Vĩnh Trung, Highlands, The Coffee House, Phúc Long, Katinat, Bà Buội, Đại Lộc, Danabus, DVC Đà Nẵng) được cung cấp ảnh cơ sở thực tế tại Đà Nẵng.
   - Vượt chỉ tiêu tối thiểu của CEO (Đạt **12 địa điểm**, yêu cầu >= 10 địa điểm).

3. **5 Card Còn Lại Giữ Identity Canvas Minh Bạch (`OFFICIAL_IDENTITY`)**:
   - Duy trì nhãn minh bạch: `"Nhận diện thương hiệu — chưa có ảnh ưu đãi/địa điểm xác minh"`.
   - Tuyệt đối không dùng ảnh stock hay AI giả mạo quán.

4. **Động Cơ Tự Động Chuyển Đổi UI (Auto-Switching Engine)**:
   - Khi có asset thật: Card tự động hiển thị thẻ `<img src="..." />` thật kèm overlay gradient và huy hiệu nhận diện.
   - Detail sheet hiển thị Hero Banner/Photo lớn, 4 Layer Visual Gallery, link gốc và ngày recheck.

---

## 2. CHỨNG NHẬN 3 CỔNG PRODUCTION VERCEL
- **Gate 1 (Remote Hash Parity):** Module SHA `8bde314d...` & Main JS SHA `874fbddb...` khớp 100% (🟢 PASS).
- **Gate 2 (Live DOM Puppeteer Assertions):**
  - Headline `"Hôm nay: 0 🟢 · 12 🔵 ưu đãi chính thức · 17 🟣 nguồn chính thức đã ghi nhận"`: 🟢 PASS
  - Tổng số card: 29/29: 🟢 PASS
  - Thẻ `<img>` thật kết xuất trên DOM: 🟢 PASS
  - OS Badge `✨ Real Visual Supply OS 3.355`: 🟢 PASS
  - Modal Detail Sheet (Metiz Member): Real Hero Image Tag, 4 Layer Visual Gallery, 8 Section cấu trúc: 🟢 PASS
- **Gate 3 (5 Live Visual Captures):**
  - `screenshot_215_first_view_real_promo.png` (1440x750 - Banner thật hiển thị ngay tại viewport đầu tiên)
  - `screenshot_215_modal_real_hero_and_gallery.png` (1440x900 - Hero banner thật trong modal)
  - `screenshot_215_desktop_light.png` (1440x900)
  - `screenshot_215_mobile_light.png` (390x844)
  - `screenshot_215_mobile_dark.png` (390x844)
