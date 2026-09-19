# JAYT-224: TOTAL PRODUCT EXPERIENCE TRANSFORMATION
**Hồ sơ công bố & Bàn giao chuyển đổi toàn diện trải nghiệm khám phá ưu đãi**

---

## 1. Thông Tin Phiên Bản & Mục Tiêu Chuyển Đổi
- **Mã chỉ thị:** `JAYT-224`
- **Tên chương trình:** `TOTAL PRODUCT EXPERIENCE TRANSFORMATION`
- **Mục tiêu tối thượng:** Chuyển đổi JayT từ một bảng dữ liệu kỹ thuật 35 thẻ thành một **Deal Discovery App premium** cho sinh viên và người trẻ Đà Nẵng. Phục vụ quyết định tiết kiệm trong 3 giây và 30 giây đầu tiên, đưa toàn bộ dữ liệu minh bạch và audit xuống Drawer chuyên biệt phía dưới.
- **Trạng thái phân loại:** `ADMITTED_AND_LIVE`
- **URL Live Production:** [`https://deploy-ten-xi-48.vercel.app/`](https://deploy-ten-xi-48.vercel.app/)
- **Phiên bản hệ thống:** `3.364.0` (`OS 3.362`)

---

## 2. Kiến Trúc Luồng Trải Nghiệm Mới (Single Experience Flow)

```mermaid
flowchart TD
    A[🌟 1. Hero Feature Spotlight: Poster 16:9 + Metiz 55K + CTA] --> B[🧭 2. Thanh Điều Hướng Ngữ Cảnh 7 Nút: Gần bạn | Ăn uống | Cà phê | Rạp phim | Đi lại | Sinh viên | Online]
    B --> C[⚡ 3. Rail 'Có thể dùng hôm nay' (Max 6 Deals có Poster & Validity)]
    B --> D[📅 4. Rail 'Lịch tiết kiệm tuần này' (Timeline 7 Ngày Thứ Hai - CN)]
    B --> E[📍 5. Rail 'Địa điểm nên biết' (18 Verified Venues - 0 Fake Discount)]
    B --> F[🌐 6. Rail 'Ưu đãi nguồn chính thức' (17 Official Student Programs)]
    F --> G[🛡️ 7. Drawer Minh Bạch & Kỷ Luật Dữ Liệu (KPIs, SHA-256, Audit Proof)]
```

### 1. Trải nghiệm 3 giây đầu:
- Người dùng nhìn thấy ngay **Hero Feature Spotlight**: Poster rạp phim Metiz chính thức khổ 16:9, logo nhận diện thương hiệu, thông tin giá vé rõ ràng `55.000đ/vé 2D`, thời gian áp dụng `Thứ 3 — Thứ 5`, và CTA nổi bật `Xem Cách Nhận Ưu Đãi`.

### 2. Trải nghiệm 30 giây tiếp theo:
- Người dùng chọn nhanh kèo mong muốn qua **Thanh Điều Hướng Ngữ Cảnh 7 nút** (`Gần bạn`, `Ăn uống`, `Cà phê`, `Rạp phim`, `Đi lại`, `Sinh viên`, `Săn online`) với tương tác lọc DOM tức thì (real-time filtering).

### 3. Phân tầng 4 Curated Rails:
- **Rail 1: "Có thể dùng hôm nay":** Giới hạn tối đa 6 thẻ có poster và điều kiện áp dụng hợp lệ ngay trong ngày.
- **Rail 2: "Lịch tiết kiệm tuần này":** Bảng timeline 7 ngày với lịch phim và ưu đãi cụ thể (T2: Super Monday 55K, Starlight 45K; T3–T5: Metiz 55K, Starlight 45K...).
- **Rail 3: "Địa điểm nên biết":** 18 địa điểm ăn uống, cà phê học bài, tiện ích công cộng xác thực tại Đà Nẵng, tuyệt đối không gán giảm giá ảo.
- **Rail 4: "Ưu đãi nguồn chính thức":** 17 chương trình bản quyền sinh viên, xe buýt trợ giá DanaBus, xe đạp TNGo... với nhãn rõ ràng `Kiểm tra điều kiện tại nguồn`.

### 4. Giải phóng hoàn toàn mặt tiền khỏi Dashboard kỹ thuật:
- Toàn bộ bảng thống kê KPI, mã băm SHA-256 đối soát 4 lớp được đưa xuống `#transparency-governance-drawer` dạng thu gọn ở chân trang.

---

## 3. Bằng Chứng Xác Thực Trực Tiếp (Live Evidence Artifacts)
- **Live Certification Report:** `07_QUALITY_ASSURANCE/runtime_evidence/evidence_224_certification/CERTIFICATION_224_LIVE_REPORT.json`
- **Ảnh Chụp Modal Detail (Poster + Quote + 10s Guide):** `screenshot_224_modal_detail_verified.png`
- **Ảnh Chụp Hero Feature Spotlight:** `screenshot_224_hero_spotlight_card.png`
- **Ảnh Chụp Desktop Light Viewport (1440x900):** `screenshot_224_desktop_light.png`
- **Ảnh Chụp Mobile Light Viewport (390x844):** `screenshot_224_mobile_light.png`
- **Ảnh Chụp Mobile Dark Viewport (390x844):** `screenshot_224_mobile_dark.png`
