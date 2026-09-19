# JAYT FEATURE 1 — ACCESSIBILITY (A11Y) & PERFORMANCE CHECKLIST

**Standard:** WCAG 2.1 Level AA Compliance  
**Mandate:** `CEO_DISPATCH_20260919_JAYT_465_UX_INTERNAL_BEHAVIOR_AND_DANANG_READINESS`  
**Target Environments:** Desktop Chromium, Mobile Chrome (Android), Desktop WebKit (Safari), Mobile Safari (iOS).

---

## I. PERCEPTION (DỄ CẢM NHẬN)
- [x] **1.1 Text Alternatives (Nội dung thay thế):**
  - Mọi thẻ `<img>` đều có thuộc tính `alt` mô tả chính xác nội dung sản phẩm.
  - Hình ảnh trang trí thuần túy hoặc background có `aria-hidden="true"` hoặc `alt=""`.
- [x] **1.2 Contrast Ratio (Tỷ lệ tương phản):**
  - Văn bản thông thường đạt tỷ lệ tương phản tối thiểu **4.5:1** so với màu nền.
  - Văn bản kích thước lớn (>= 18pt hoặc >= 14pt bold) đạt tỷ lệ tương phản tối thiểu **3:1**.
  - Các thành phần UI thiết yếu (borders, badges, input controls) có tỷ lệ tương phản >= **3:1**.
- [x] **1.3 Resize Text & Layout (Khả năng co giãn):**
  - Giao diện có thể zoom đến 200% mà không bị mất nội dung hoặc vỡ layout.
  - Không xuất hiện thanh cuộn ngang ngoài ý muốn trên màn hình di động (320px - 390px).

---

## II. OPERABLE (DỄ VẬN HÀNH)
- [x] **2.1 Keyboard Accessible (Điều hướng bằng bàn phím):**
  - 100% các nút CTA, tab, input link và thẻ deal có thể tiếp cận bằng phím `Tab`.
  - Phím `Enter` và `Space` kích hoạt được các phần tử tương tác tương đương click chuột.
  - Khi mở modal/drawer, con trỏ phím được giữ bên trong (`focus trap`), và phím `Escape` đóng modal ngay lập tức.
- [x] **2.2 Target Size (Kích thước vùng chạm):**
  - Vùng chạm của tất cả các nút bấm trên màn hình cảm ứng đạt tối thiểu **44px x 44px**.
  - Khoảng cách giữa các phần tử tương tác liền kề tối thiểu 8px để tránh bấm nhầm.
- [x] **2.3 Motion & Transitions (Chuyển động & Hiệu ứng):**
  - Hỗ trợ đầy đủ media query `@media (prefers-reduced-motion: reduce)`.
  - Khi người dùng kích hoạt giảm chuyển động, toàn bộ animation và transition được hạ về `0.01ms`.

---

## III. UNDERSTANDABLE (DỄ HIỂU)
- [x] **3.1 Predictable UI (Giao diện nhất quán):**
  - Thứ tự 6 khối thông tin bất biến: Định danh -> Verdict -> Tiết kiệm -> Bằng chứng -> So sánh -> CTA.
  - Phân loại rõ ràng trạng thái tiết kiệm: `VERIFIED`, `ESTIMATED`, `CONDITIONAL`.
- [x] **3.2 Error Identification (Thông báo lỗi rõ ràng):**
  - Khi dán liên kết không hợp lệ, hiển thị thông báo lỗi cụ thể kèm gợi ý mẫu thật.
  - Trạng thái rỗng (empty state) hiển thị thông điệp trung thực và hướng xử lý.

---

## IV. ROBUST (BỀN VỮNG & TƯƠNG THÍCH)
- [x] **4.1 Parsing & Valid HTML:**
  - Cấu trúc DOM hợp lệ, không có ID trùng lặp trên cùng một trang.
  - Các thuộc tính ARIA (`aria-label`, `role`, `aria-hidden`) tuân thủ đúng quy chuẩn W3C.
- [x] **4.2 Performance Budgets:**
  - Frame time duy trì <= 16.6ms (đạt chuẩn 60 FPS mượt mà).
  - Thời gian mở modal <= 100ms.
  - Phản hồi khi nhấn nút CTA <= 50ms.
