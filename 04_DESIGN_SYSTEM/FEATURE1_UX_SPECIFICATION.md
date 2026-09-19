# JAYT APEX DESIGN SYSTEM 2026 — FEATURE 1 UX SPECIFICATION

**Document ID:** `JAYT_DESIGN_SPEC_FEATURE1_V1`  
**Authority:** `CEO_DISPATCH_20260919_JAYT_465_UX_INTERNAL_BEHAVIOR_AND_DANANG_READINESS` (Section XXIX)  
**Target Audience:** Người tiêu dùng thông minh Đà Nẵng (Sinh viên, Dân văn phòng, Người mua sắm duy lý)  
**Core Directive:** Evidence-First, Zero Overclaim, 60fps Smooth Motion, Seamless Glass Treatment with Solid Fallback.

---

## 1. DESIGN SYSTEM TOKENS
Defined in `04_DESIGN_SYSTEM/tokens.json`:
- **Color Palette:** Obsidian Pine (`#061a14`), Surface Pine (`#0d2820`), Surface Elevated (`#11342a`), Champagne Gold Accent (`#d4af37`), Gold Light (`#f3e5ab`), Emerald (`#10b981`), Amber (`#f59e0b`), Blue (`#3b82f6`), Slate Muted (`#8fa298`).
- **Glass Treatment:** Surface `rgba(18, 28, 22, 0.75)`, Border `1px solid rgba(229, 195, 120, 0.22)`, Blur `16px`. Fallback `@supports not (backdrop-filter: blur(16px))` uses solid `#0E1611`.
- **Typography:** Primary `Outfit, sans-serif`, Monospace `'JetBrains Mono', monospace`. Fluid sizing from 10.5px (xs) to 22px (title).
- **Touch Targets:** Minimum 44x44px across mobile and desktop clickable elements.
- **Motion:** Cubic-bezier `(0.16, 1, 0.3, 1)`, hover `220ms`, full support for `prefers-reduced-motion: reduce`.

---

## 2. FEATURE 1 INFORMATION ARCHITECTURE
Mọi màn hình chi tiết sản phẩm / deal card phải tuân thủ thứ tự ưu tiên 6 khối thông tin bất biến:
1. **Khối 1 — Định danh Sản phẩm (Identity):** Tên chính xác, phân loại ngành hàng, ảnh đại diện đã kiểm chứng.
2. **Khối 2 — JayT Verdict (Phán quyết JayT):** 3 lớp (KẾT LUẬN / LÝ DO / BẰNG CHỨNG).
3. **Khối 3 — Bóc tách Tiết kiệm (Savings Breakdown):** 6 chỉ số giá và phân loại VERIFIED / ESTIMATED / CONDITIONAL.
4. **Khối 4 — Thư viện Bằng chứng (Evidence Gallery):** Ảnh unbox/camera thường (chỉ khi `asset_provenance_verified = true`) hoặc Ảnh sản phẩm từ nguồn, hình chụp voucher, trích xuất đánh giá thực.
5. **Khối 5 — So sánh Nền tảng (Platform Comparison):** Bảng so sánh giá niêm yết vs giá sàn khác vs giá JayT xác nhận.
6. **Khối 6 — Điều hướng An toàn (Route CTA):** Nút hành động trực tiếp với nhãn sàn minh bạch (Shopee, Lazada, TikTok Shop, v.v.).

---

## 3. BENTO LAYOUT SPECIFICATION
- **Lưới linh hoạt (Flexible Grid):**
  - Desktop (>= 1024px): 4 cột, gap 16px/20px.
  - Tablet (768px - 1023px): 2 cột, gap 16px.
  - Mobile (< 768px): 1 cột, gap 12px.
- **Phân bổ Spans:**
  - `Hero Deal Card`: 2 cột x 2 hàng (hoặc 2x1 trên tablet).
  - `Standard Deal Card`: 1 cột x 1 hàng.
  - `Evidence Focus Card`: 1 cột x 2 hàng (dành cho deal có chứng thực review/unbox sâu).
  - `Savings Highlight Card`: 2 cột x 1 hàng.

---

## 4. PRODUCT CARD SPECIFICATION
- **Tỉ lệ Media:** ~60% diện tích card dành cho hình ảnh và huy hiệu chứng thực (240px desktop, 260px mobile).
- **3 Dữ kiện Cốt lõi (Primary Facts):**
  1. Tên sản phẩm + nhãn gian hàng (Official / Mall / Thường).
  2. Giá thực trả sau ưu đãi + % tiết kiệm thực tế.
  3. Badge phán quyết JayT (NÊN MUA / NÊN CHỜ / CẦN KIỂM TRA ĐIỀU KIỆN).
- **2 Nút CTA chuyên biệt:**
  - CTA Chính: Xem bằng chứng & So sánh giá (mở Decision Modal).
  - CTA Phụ: Đến nơi bán (Route an toàn có cảnh báo điều kiện).

---

## 5. DECISION MODAL SPECIFICATION
- **Kích thước & Trải nghiệm:**
  - Desktop: Slide-out Drawer rộng 560px từ bên phải màn hình hoặc Modal trung tâm 640px.
  - Mobile: Bottom Sheet tràn 92dvh có tay nắm kéo (drag handle), cho phép cuộn nội dung tự nhiên.
- **Hành vi:**
  - Trap focus khi mở modal.
  - Phím Escape hoặc bấm overlay bên ngoài đóng modal ngay lập tức.
  - Trạng thái URL: Đồng bộ hash `#offer-{id}` và hỗ trợ nút Back trình duyệt mà không mất vị trí cuộn trang trước đó.

---

## 6. JAYT VERDICT SPECIFICATION (3 LỚP)
- **Lớp 1 — KẾT LUẬN (Conclusion):**
  - `NÊN MUA`: Giá đang ở vùng đáy lịch sử và/hoặc voucher độc quyền thực tế.
  - `NÊN CHỜ`: Dự báo có sale lớn sắp tới hoặc giá đang bị đội lên trước khuyến mãi.
  - `CẦN KIỂM TRA ĐIỀU KIỆN`: Giá tốt nhưng phụ thuộc vào hình thức thanh toán, min spend, hoặc khu vực giao hàng.
  - `TRUNG TÍNH`: Dữ liệu chưa đủ áp đảo hoặc mức giảm không đáng kể (< 5%).
- **Lớp 2 — LÝ DO (Rationale):**
  - Giải thích ngắn gọn trong 1-2 câu lý do đằng sau phán quyết (Ví dụ: "Giá hiện tại thấp hơn 18% so với trung bình 30 ngày qua trên cùng phân khúc Shopee Mall").
- **Lớp 3 — BẰNG CHỨNG (Evidence Anchor):**
  - Trích xuất điểm neo bằng chứng cụ thể: Ngày giờ kiểm tra gần nhất, link đối soát nguồn dữ liệu, mã voucher áp dụng thành công.

---

## 7. EVIDENCE GALLERY SPECIFICATION
- **Nguyên tắc Cốt lõi:** `REAL EVIDENCE > SLOT COUNT`. Không bao giờ tạo các slot rỗng hoặc placeholder giả tạo cảm giác nhiều bằng chứng.
- **Quy tắc Gán nhãn Hình ảnh (Strict Provenance Discipline):**
  - **CHỈ ĐƯỢC DÙNG** nhãn **"Ảnh unbox / camera thường"** khi và chỉ khi trường dữ liệu `asset_provenance_verified = true` (đã xác minh được nguồn ảnh người dùng thật/review thực).
  - **BẮT BUỘC DÙNG** nhãn trung tính **"Ảnh sản phẩm từ nguồn"** nếu chưa chứng minh được nguồn gốc hoặc lấy từ gian hàng của sàn.
- **Hành vi Lightbox:**
  - Nhấp vào ảnh mở zoom chi tiết không bị vỡ hạt.
  - Hiển thị metadata đi kèm: ngày chụp, ngữ cảnh kiểm thử.

---

## 8. SAVINGS COMPONENT SPECIFICATION (6 CHỈ SỐ)
Hiển thị minh bạch cấu trúc giá thực tế:
1. `original_price`: Giá niêm yết từ nguồn.
2. `current_price`: Giá bán hiện thời trên sàn.
3. `voucher_discount`: Mức giảm từ voucher/mã khuyến mãi.
4. `fee`: Phí vận chuyển ước tính (hoặc 0đ nếu Freeship).
5. `effective_price`: Giá thực trả dự kiến người mua phải thanh toán.
6. `savings_amount`: Số tiền tiết kiệm thực tế (VND) và tỷ lệ %.
- **Phân loại Trạng thái Tiết kiệm:**
  - `VERIFIED`: Đã áp thử mã thành công vào giỏ hàng thật.
  - `ESTIMATED`: Ước tính dựa trên điều kiện niêm yết của shop/sàn.
  - `CONDITIONAL`: Cần thỏa mãn điều kiện bổ sung (ví dụ: Ví ShopeePay, thẻ tín dụng đối tác).

---

## 9. ROUTE CTA SPECIFICATION
- **Minh bạch Điểm đến:** Nút ghi rõ nền tảng đích (Ví dụ: "Mở trên Shopee", "Mở trên Lazada").
- **Bảo toàn Chế độ Kỹ thuật:** Trong thời gian `CONFIG.affiliate_enabled = false`, toàn bộ route CTA chuyển hướng trực tiếp đến link sản phẩm gốc an toàn, không gắn tham số tiếp thị liên kết ngoài thẩm quyền.
- **Cảnh báo Điều kiện:** Nếu deal thuộc diện `CONDITIONAL`, hiển thị tooltip/cảnh báo trước khi điều hướng.

---

## 10. RESPONSIVE SPECIFICATION
- Hỗ trợ tối ưu trên 4 môi trường chính:
  1. Desktop Chromium (Chrome, Edge, Brave, Cốc Cốc trên Windows/macOS).
  2. Mobile Chrome (Android).
  3. Desktop WebKit (Safari trên macOS).
  4. Mobile Safari (iOS).
- Không để xảy ra horizontal overflow trên màn hình 320px - 390px.

---

## 11. MOTION SPECIFICATION (60 FPS)
- Sử dụng CSS transitions tối ưu phần cứng (`transform`, `opacity`).
- Tránh animate các thuộc tính gây reflow (`height`, `width`, `top`, `margin`).
- **Media Query Giảm chuyển động:**
  ```css
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
  ```

---

## 12. ACCESSIBILITY SPECIFICATION (A11Y)
- Phân cấp thẻ tiêu đề ngữ nghĩa chuẩn (`h1`, `h2`, `h3`).
- Trạng thái `:focus-visible` rõ ràng với viền vàng Gold Accent (`#f3e5ab`).
- Độ tương phản văn bản đạt tối thiểu 4.5:1 (WCAG AA).
- Vùng chạm tối thiểu 44px x 44px trên tất cả các phần tử tương tác.

---

## 13. PERFORMANCE BUDGET
- **Frame time:** <= 16.6ms (duy trì 60 FPS trong các thao tác cuộn và mở menu).
- **Thời gian mở Decision Modal:** <= 100ms.
- **Phản hồi khi nhấn CTA:** <= 50ms.
- **Zero layout shift:** Đặt kích thước cố định cho hình ảnh trước khi tải.

---

## 14. EMPTY, ERROR, LOADING STATES
- **Loading State:** Skeleton shimmer với tone màu pine tối (`#0d2820` chuyển sang `#11342a`).
- **Empty State:** Thông điệp trung thực "Không tìm thấy ưu đãi phù hợp với tiêu chí lọc" kèm gợi ý mở rộng khoảng giá.
- **Error State:** Nút thử lại nhẹ nhàng, không để người dùng rơi vào ngõ cụt.

---

## 15. UX ACCEPTANCE CRITERIA
1. 100% deal card hiển thị đúng cấu trúc Bento Grid.
2. 100% deal hiển thị đầy đủ 3 lớp của JayT Verdict.
3. 100% hình ảnh tuân thủ quy tắc gán nhãn Provenance (chỉ "Ảnh unbox/camera thường" khi `asset_provenance_verified = true`).
4. 0 sự cố vỡ giao diện trên mobile Safari & Chrome Android.
5. 0 trường hợp mất dấu vị trí cuộn khi đóng modal.
