# HỒ SƠ THẨM ĐỊNH TRẢI NGHIỆM SẢN PHẨM JAYT-372 — RETENTION OVERHAUL

---

## 1. THÔNG TIN PHÁT HÀNH & BỐI CẢNH ĐIỀU HÀNH
- **Mã hiệu nhiệm vụ:** `JAYT-372 — RETENTION OVERHAUL: CAMPUS DOCK, PER-OFFER ZALO PASS & PRODUCT CARDS`
- **Căn cứ pháp lý & kỹ thuật:**
  - Lệnh thi công điều hành: `04_DATA_PIPELINE/dispatch/WORK_ORDER_J372_RETENTION_OVERHAUL.json`
  - Đặc tả thiết kế & tương tác: `01_EXECUTIVE_COUNCIL/JAYT_372_DESIGN_HANDOFF.md`
  - Bằng chứng ánh xạ cụm trường: `06_TRUST_AND_EVIDENCE/j372/campus_offer_mapping.json` (`91685b8b57714a2706a28d5d6429a2dd4a2a83a94e519ba750c143e76e8adcd4`)
  - Bằng chứng thumbnail & tem hàng: `06_TRUST_AND_EVIDENCE/j372/product_badge_and_link_evidence.json` (`7d441bd3a1369f1aee1d73c04f500409e74aeb9cc398a7212001b3ef42d4aa76`)
- **Môi trường Production Canonical:**
  - URL công khai: [https://jayt-production-v3420.vercel.app](https://jayt-production-v3420.vercel.app)
  - Deployment ID: `dpl_FD5zGaNobEYSPBdRkNRxKYjE7ZHc`
  - Phiên bản triển khai: `v3.434.0-j372`
  - Thời điểm hoàn tất: 14:24:39 10/9/2026 (Hạn: 08:00:36 11/09/2026 — Hoàn thành trước hạn)

---

## 2. KẾT QUẢ NGHIỆM THU 3 TRỤ CỘT RETENTION

### Trụ Cột 1: Campus Dock (Sticky Horizontal 4-Cluster Dock)
- **Vị trí & Bố cục:** Đặt ngay dưới Hero section, sticky dưới header khi cuộn trang; kết quả lọc cụm trường hiển thị ngay sát bên dưới dock giúp người dùng nhận biết ngay lập tức.
- **Bốn cụm trường chính & số ưu đãi đối soát thực tế:**
  1. `🎓 Bách Khoa / Sư Phạm` (Liên Chiểu / Hòa Khánh / Tôn Đức Thắng): **44 ưu đãi**, 6 chi nhánh đối soát gần cổng trường.
  2. `🏖️ Kinh Tế DUE` (Ngũ Hành Sơn / Bắc Mỹ An / Nam Việt Á): **43 ưu đãi**, 5 chi nhánh đối soát gần cổng trường.
  3. `🏢 Duy Tân / Hải Châu` (Hải Châu / Trung tâm / Nguyễn Văn Linh): **70 ưu đãi**, 9 chi nhánh đối soát gần trường.
  4. `🌊 Sơn Trà` (Sơn Trà / Cầu Rồng / Vincom Plaza): **63 ưu đãi**, 7 chi nhánh đối soát.
  5. `✨ Tất cả cơ sở`: **81 ưu đãi** toàn thành phố.
- **Trải nghiệm Mobile 390px:** Cuộn ngang riêng biệt (`scroll-snap-type: x mandatory`), không gây overflow ngang toàn trang, có khoảng đệm gợi ý vuốt xem nút tiếp theo.
- **Kết quả đo kiểm 100 lần chuyển cụm trên Production (Mandate p95 < 20ms):**
  - Số lần chuyển đo kiểm: **100 lần**
  - Thời gian trung bình (Avg): **1.65 ms**
  - Phân vị p50: **1.50 ms**
  - Phân vị p90: **2.20 ms**
  - Phân vị **p95**: **3.70 ms** (Vượt xa mục tiêu < 20ms)
  - Phân vị p99: **4.80 ms**

### Trụ Cột 2: Vé Zalo Trên Mỗi Thẻ (Per-Offer Zalo Pass)
- **Thiết kế thẻ:** Giữ nguyên nút CTA mã / điều kiện quầy và bổ sung hàng nút rủ bạn: `Kèo 2 người`, `Kèo 3 người`, và `Lập kèo tùy chỉnh`.
- **Toán học phân bổ số nguyên 100%:**
  - Thuật toán: $q = \lfloor T/N \rfloor, r = T \pmod N$. $r$ người trả $q+1$, $N-r$ người trả $q$.
  - Bảo toàn tuyệt đối: Không chênh lệch dù chỉ 1 đồng lẻ (Ví dụ: Combo 157.000₫ cho 3 người $\rightarrow$ 1 bạn chuyển 52.334₫, 2 bạn chuyển 52.333₫, tổng đúng 157.000₫).
- **Thẻ Canvas 1080×1440 PNG:**
  - Tạo trực tiếp trong RAM trình duyệt, không gây taint canvas.
  - Tên quán/thương hiệu, tên ưu đãi, cơ sở giá, tổng nhóm, phân bổ từng người và liên kết JayT.
  - Mã QR: Gắn nhãn chuẩn xác **"QR MỞ KÈO"** dẫn thẳng tới `https://jayt-production-v3420.vercel.app/#offer-<id>`.
  - Quét QR: Tự động cuộn đến thẻ và kích hoạt hiệu ứng viền sáng nhận diện.
  - An toàn tài khoản: Không tự gán hoặc bịa đặt số tài khoản JayT. Dữ liệu tài khoản nếu người dùng nhập chỉ giữ trong RAM và xóa ngay khi đóng modal.

### Trụ Cột 3: Danh Mục Vật Dụng KTX & 30 Thẻ Sản Phẩm (Dorm Shopping)
- **Lưới hiển thị đa thiết bị:**
  - Desktop (≥1024px): **4 cột**
  - Tablet (768px): **3 cột**
  - Mobile (390px): **2 cột** với khoảng cách chuẩn **12px** (`--space-3`).
- **Hình ảnh 1:1 Vector SVG chuẩn xác:**
  - 30 file SVG độc lập tại `/assets/images/products/sku_XX_...svg` thể hiện đúng từng biến thể sản phẩm (ấm siêu tốc, đèn bàn, quạt kẹp, chuột, giáo trình, cáp sạc).
  - Không sử dụng ảnh giả lập AI mạo danh ảnh chụp camera thật; có tuyên bố minh bạch định dạng vector trong manifest.
  - Nền trung tính (`#F8FAFC` / `#1B222A`), tỉ lệ khung hình 1:1 contain.
- **Tuân thủ luật quảng cáo & Phán quyết Hội Đồng:**
  - Tem Amber **"ĐÁY 90 NGÀY"**: **Hoàn toàn vắng mặt** (0/30) do chưa đủ chuỗi quan sát liên tục 90 ngày. Thể hiện ngày quan sát thực tế: **10/09/2026**.
  - Tem Emerald **"FREESHIP 0Đ"**: Thể hiện minh bạch dạng có điều kiện **"Freeship theo điều kiện ℹ️"**, nhấn vào xem chi tiết điều kiện sàn (Shopee Freeship Xtra / TikiNOW).
  - Liên kết ngoài: Trỏ thẳng gian hàng chính hãng đã đối soát (Shopee Mall / Tiki Trading) với `rel="noopener noreferrer sponsored"`.
  - Không tuyên bố hoa hồng hay attribution khi chưa có API chứng thực từ nhà mạng tiếp thị liên kết.

---

## 3. TẬP HỢP BẰNG CHỨNG THẨM ĐỊNH (OBSERVABILITY EVIDENCE)
- Biên nhận kiểm toán trực tiếp: `07_QUALITY_ASSURANCE/runtime_evidence/JAYT_372_LIVE_RETENTION_RECEIPT.json`
- Biên nhận phát hành Production: `08_RELEASE_VAULT/JAYT_372_PRODUCTION_RELEASE_RECEIPT.json`
- Ảnh chụp màn hình giao diện:
  - Desktop 1440 Light & Dark: `j372_prod_desktop_1440_light.png`, `j372_prod_desktop_1440_dark.png`
  - Tablet 768 Light: `j372_prod_tablet_768_light.png`
  - Mobile 390 Light & Dark: `j372_prod_mobile_390_light.png`, `j372_prod_mobile_390_dark.png`
- Ảnh mẫu Thẻ Zalo Pass 1080×1440 PNG:
  - Kèo 2 người: `j372_sample_zalo_pass_2p.png`
  - Kèo 3 người: `j372_sample_zalo_pass_3p.png`

---

## 4. KẾT LUẬN & TRẠNG THÁI CHỜ GEMINI
- Toàn bộ các yêu cầu của Work Order JAYT-372 và Handoff Specification đã được triển khai, kiểm thử tự động và bàn giao trên môi trường Production trực tiếp.
- Hồ sơ được chuyển giao tới Gemini Hội đồng Quản trị để tiến hành thẩm định trải nghiệm người dùng thực tế (UX/UI review).
