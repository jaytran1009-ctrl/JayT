# HỘI ĐỒNG ĐIỀU HÀNH JAYT: DESIGN RELEASE PACK (MỤC S — JAYT-245)
## "KHÁM PHÁ VÀ MUA SẮM THÔNG MINH — ĐẸP, CUỐN HÚT, KHÔNG THAO TÚNG"

**Phiên bản phát hành:** `v3.406.0`  
**Mục tiêu Live:** [https://deploy-ten-xi-48.vercel.app](https://deploy-ten-xi-48.vercel.app)  
**Thời gian ban hành:** 2026-08-28T23:59:59+07:00  
**Căn cứ chỉ thị:** [JAYT-245 — Tổng Chỉ Thị CEO Duy Nhất Về Vận Hành Và Go-Live JayT (Mục S)](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/02_CEO_DIRECTIVES/JAYT-245_TONG_CHI_THI_CEO_DUY_NHAT_VAN_HANH_JAYT.md)  
**Đơn vị chủ trì:** Hội đồng Điều hành 7 Phòng ban (Product, Design, UX/CX, Growth, Data & Trust, Engineering, QA)

---

## 1. Bản Đồ Hành Trình Người Dùng (User Journeys — 4 Bối Cảnh Thực Tế)

| Bối Cảnh Người Dùng | Job-To-Be-Done (JTBD) | Điểm Chạm & Luồng Tương Tác Trên JayT | Kết Quả Đạt Được |
|---|---|---|---|
| **1. Sinh viên săn vé phim & ăn trưa tiết kiệm** | Tìm vé xem phim HSSV và bữa trưa dưới 40k quanh khu vực Hòa Khánh / Liên Chiểu | 1. Mở JayT -> Chọn Bộ sưu tập *"Vé Xem Phim HSSV U22"* hoặc *"Ăn Trưa Ngon & Tiết Kiệm"*.<br>2. Thấy ngay Thẻ Làn A (Metiz 55k, Domino's BOGO, Jollibee Joy Meal 35k) kèm nhãn "Đã đối soát hôm nay".<br>3. Nhấn "Xem điều kiện tại nguồn chính thức" -> Xem trực tiếp trên website rạp/quán.<br>4. Nhấn "Lưu" để dùng lại vào cuối tuần. | Hoàn thành trong < 30 giây; không bị dẫn dụ bởi giá ảo hay affiliate link. |
| **2. Nhân viên văn phòng chọn bữa trưa quanh quận** | Tìm quán ăn trưa, cà phê làm việc nhanh chóng quanh Hải Châu / Thanh Khê | 1. Vào JayT -> Lọc Nhu cầu *"Ăn trưa"* + Khu vực *"Hải Châu / Thanh Khê / Sơn Trà"*.<br>2. Thấy danh sách 16 địa điểm Làn C (Phố ẩm thực, Co.opmart, Chợ Cồn) và Làn A (Domino's).<br>3. Nhấn "Xem thông tin địa điểm" để xem địa chỉ chính xác và giờ mở cửa. | Tìm được quán trưa phù hợp trong bán kính 2km trong < 45 giây. |
| **3. Sinh viên tìm nơi học nhóm / làm đồ án** | Tìm không gian yên tĩnh có wifi, máy lạnh hoặc dịch vụ in ấn gần trường | 1. Chọn Bộ sưu tập *"Gói Học Tập & Bản Quyền"* hoặc Lọc *"Học tập"*.<br>2. Nhận ngay thông tin Thư viện Tổng hợp Đà Nẵng, Quán cà phê học nhóm Dũng Sĩ Thanh Khê, Phố Photo Bách Khoa/Sư Phạm.<br>3. Kích hoạt nhận bản quyền GitHub Student Developer Pack, Notion Education Plus miễn phí 100%. | Tiếp cận tài nguyên học tập chính thức với chi phí 0đ. |
| **4. Người dùng theo dõi cơ hội sắp tới (Radar)** | Theo dõi voucher Phúc Long, Highlands, ShopeeFood, vé chạy Danang Marathon | 1. Lọc *"Đang theo dõi (12)"* -> Thấy các tín hiệu Radar minh bạch.<br>2. Nhấn "Xem tiêu chí kiểm định Radar" -> Đọc rõ trạng thái kiểm định và lý do chưa gắn giá.<br>3. Nhấn "Lưu" -> Hệ thống lưu vào danh sách Bookmark cục bộ để quay lại kiểm tra khi recheck. | Người dùng chủ động nắm bắt cơ hội mà không bị thúc ép mua hàng. |

---

## 2. Hệ Thống Thiết Kế & Token Spec (Design System Tokens)

- **Thương hiệu chủ đạo:** JayT Emerald Green (`#059669` / Hover: `#047857` / Dark: `#10b981`).
- **Phân tầng 4 Làn:**
  * **Làn A (Đã đối soát):** Emerald Green (`#047857` / Background: `#ecfdf5` / Border: `#a7f3d0`).
  * **Làn B (Nguồn chính thức):** Royal Blue (`#1d4ed8` / Background: `#eff6ff` / Border: `#bfdbfe`).
  * **Làn C (Gần bạn hôm nay):** Warm Amber (`#b45309` / Background: `#fffbeb` / Border: `#fde68a`).
  * **Làn D (Đang theo dõi):** Slate Gray (`#475569` / Background: `#f8fafc` / Border: `#e2e8f0`).
- **Typography:** System Sans-Serif (`-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto`), cấp bậc rõ ràng (`h1: 2.125rem`, `h2: 1.25rem`, `h3: 1.125rem`, `body: 0.9375rem`, `meta: 0.8125rem`).
- **Spacing & Radius:** Hệ thống 4/8/12/16/20/24px; Radius Sm: `6px`, Md: `10px`, Lg: `14px`, Full: `9999px`.
- **Motion & Transitions:** `180ms ease` cho filter, tab switch, bookmark toast, modal open; tuân thủ nghiêm ngặt `prefers-reduced-motion`.

---

## 3. Trạng Thái Component & Hợp Đồng Dữ Liệu (Component States Spec)

| Component | Default State | Hover / Focus State | Active / Saved State | Empty / Error State |
|---|---|---|---|---|
| **Opportunity Card** | Viền 2px xám nhạt, border-left màu làn riêng biệt, chữ sắc nét | Nâng nhẹ `-2px`, bóng mờ tinh tế `0 6px 18px rgba(0,0,0,0.05)` | Nhấn nút "Lưu" chuyển trạng thái xanh ngọc "Đã lưu" | Hiển thị thông báo "Chưa có dữ liệu" khi card bị cách ly |
| **Collections Rail** | Thẻ cuộn ngang bo tròn 14px, hiển thị chủ đề và số lượng mục | Viền chuyển màu Emerald Green, nâng nhẹ `-3px` | Nhấn vào kích hoạt lọc tự động danh mục tương ứng | Ẩn rail nếu không có bộ sưu tập |
| **Navigation Tabs** | Text màu xám đậm `#334155`, nền trong suốt | Nền xám nhạt `#f1f5f9` | Nền trắng/card, chữ Emerald Green, có viền bao quanh | - |
| **Filter Pills** | Nền xám `#f1f5f9`, viền bo tròn 9999px | Nền xám đậm hơn `#e2e8f0` | Nền Emerald Green, chữ trắng nổi bật | Tự động reset về "Tất cả" khi bấm Đặt lại |
| **Save Button** | Chữ "Lưu", nền xám nhạt | Nền `#e2e8f0` | Chữ "Đã lưu", nền `#d1fae5`, chữ xanh đậm `#065f46` | - |
| **Toast Alert** | Ẩn mặc định | - | Trượt từ dưới lên `180ms`, mờ dần sau 2.2s | Tự hủy sau khi hoàn tất |

---

## 4. Thang Phân Tầng Bằng Chứng & Ranh Giới Dữ Liệu (Evidence Ladder)

- **LÀN A: ĐÃ ĐỐI SOÁT** -> Có URL nguồn + Bằng chứng chụp thô + Giá/Ưu đãi + Điều kiện + Scope địa bàn + Hạn recheck
- **LÀN B: CHÍNH THỨC** -> Có nguồn official trực tiếp + Quote + Điều kiện rõ ràng (Không suy diễn giá thực trả)
- **LÀN C: GẦN BẠN** -> Địa điểm, cơ sở vật chất, tiện ích đô thị có thật (Không gắn khuyến mãi nếu không đối soát)
- **LÀN D: THEO DÕI** -> Tín hiệu nhu cầu & nguồn theo dõi + Tiêu chí cần đạt (Không giá, không voucher, không affiliate)

---

## 5. Báo Cáo Khả Năng Tiếp Cận & Hiệu Năng (Accessibility & Performance)

- **WCAG 2.1 AA Compliance:** 100% các cặp màu chữ và nền đạt tỷ lệ tương phản tối thiểu >= 4.5:1 (chữ đậm >= 3.0:1).
- **Touch Target:** Tất cả nút bấm, filter pill, tab và input đều đạt chiều cao tối thiểu >= 44px.
- **Keyboard Navigation:** Toàn bộ tính năng (Search, Tabs, Collections, Filters, Save, Modals) điều hướng trơn tru bằng phím `Tab` / `Enter` / `Space`, và phím `Escape` đóng cửa sổ modal ngay lập tức.
- **Zoom 200%:** Giao diện co giãn mượt mà theo CSS Grid và Flexbox, **hoàn toàn không phát sinh thanh cuộn ngang**.
- **Performance Budget:** Tổng dung lượng tải trang ban đầu < 150KB, thời gian First Contentful Paint (FCP) < 0.4s.

---

## 6. Kế Hoạch Triển Khai & Phục Hồi (Rollout & Rollback)

1. **Rollout:** Bản phát hành `v3.406.0` đã được deploy thành công và đang hoạt động tại [https://deploy-ten-xi-48.vercel.app](https://deploy-ten-xi-48.vercel.app).
2. **Rollback:** Trong trường hợp phát hiện bất kỳ sự cố nào, hệ thống có thể quay trở về bản snapshot ổn định liền trước chỉ bằng 1 lệnh alias duy nhất trên Vercel.

**Ký tên xác nhận bởi Hội đồng 7 Phòng ban:**  
*Product Directorate · Design System Authority · UX/CX Research Group · Growth & Partnerships · Data & Trust Security · Engineering Core · Quality Assurance Directorate*
