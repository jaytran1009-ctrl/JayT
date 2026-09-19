# Đặc Tả Thành Phần Giao Diện: JayT Apex 2026 (v1.1.0)

## 1. Nguyên Tắc Trải Nghiệm (Core Principles)
- **Tập trung người dân Đà Nẵng:** Tối ưu hóa cho các quyết định thường nhật tại địa phương (ăn gì, đi đâu, săn gì, vào lúc nào, ngân sách nào).
- **Một CTA chính mỗi khung nhìn:** Nút hành động chính luôn nổi bật với nền vàng Champagne Gold (#d4af37) và chữ đen đậm (#071913).
- **Chuẩn công thái học & Tiếp cận (A11y Touch Targets):**
  - Mọi control tương tác trên mobile (< 768px) và desktop **BẮT BUỘC đạt tối thiểu 44px × 44px** (`min-height: 44px; min-width: 44px;`).
  - Tuyệt đối không thu nhỏ nút dưới 44px khi không gian hẹp; sử dụng kỹ thuật wrap hàng, rút gọn nhãn hoặc dropdown menu.
  - Độ tương phản màu sắc tuân thủ nghiêm ngặt tiêu chuẩn WCAG AA (tối thiểu 4.5:1).
- **Hệ Thống Phông Chữ:** Sans-serif chính dùng `Outfit` (hỗ trợ tiếng Việt đầy đủ), Monospace dùng `JetBrains Mono`.
- **Hệ Thống Bóng Đổ:** Sử dụng bóng đổ ánh xanh thông Obsidian Pine (`rgba(3, 14, 10, ...)`), cấm drop-shadow đen thô `rgba(0,0,0,...)`.
- **Hệ 4 Khung Giờ Hoạt Động:** Sáng (07:00-11:00), Trưa (11:00-14:00), Chiều (14:00-17:30), Tối (17:30-24:00).
- **Chuyển Động & Giảm Chuyển Động:** Sử dụng easing `--ease-out-expo` (`cubic-bezier(0.16, 1, 0.3, 1)`); tự động vô hiệu hóa khi bật `@media (prefers-reduced-motion: reduce)`.

## 2. Quy Chuẩn Các Trạng Thái Giao Diện
- **Loading State:** Skeleton shimmering với tone màu xanh thông đậm.
- **Empty State:** Thông báo rõ ràng lý do chưa có kèo phù hợp kèm gợi ý mở rộng tiêu chí; không dùng dữ liệu giả.
- **Safe Mode (file://):** Hiển thị thẻ cảnh báo cách ly an toàn, yêu cầu khởi chạy qua server cục bộ.
- **Error State:** Thông báo lỗi Fail-Closed minh bạch, có nút tải lại.
- **Modal & Toast:** Bẫy focus bàn phím, đóng bằng phím Escape hoặc click overlay. Touch target nút modal tối thiểu 44px.
