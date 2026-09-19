# JAYT-363 — Bàn giao thiết kế Porcelain Clean

Căn cứ: CHAIRMAN-DIRECTIVE-2026-0909-DE-AI-OVERHAUL. CEO ban hành lúc 16:04 ngày 09/09/2026 (Asia/Ho_Chi_Minh). Owner thi công: Antigravity. Đây là đặc tả và lệnh triển khai, chưa phải kết quả nghiệm thu hay biên bản họp đã diễn ra.

## Hướng thiết kế

Mặt tiền dành cho sinh viên và người đi làm: chọn nhu cầu, xem lựa chọn, tự tính chi phí. Chọn Porcelain Clean làm mặc định. Loại bỏ neon, viền phát sáng, nền gradient tím/xanh và hiệu ứng specular-glass-panel. Giữ những cảnh báo giúp người dùng hiểu giá và điều kiện, viết bằng tiếng Việt thông thường.

| Token | Giá trị | Dùng cho |
| --- | --- | --- |
| background | #F7F6F2 | Nền trang |
| surface | #FFFFFF | Thẻ, hộp thoại |
| text | #202A28 | Nội dung chính |
| muted | #56615D | Mô tả |
| accent | #245C47 | Nút chính, lựa chọn |
| border | #DDE2DC | Phân cách nhẹ |
| warning-text / background | #754616 / #FFF4DE | Thông tin chưa xác minh |
| radius-card / control | 16px / 10px | Thẻ / điều khiển |
| spacing | 4, 8, 12, 16, 24, 32, 48px | Thang khoảng cách |

Dùng Be Vietnam Pro hoặc Inter có đủ dấu tiếng Việt, ưu tiên font tự host có giấy phép; fallback system-ui. Body 16px/1.6, label 14px/1.5, giá 24px/1.2, heading 32px desktop và 26px mobile. Kiểm tra tương phản thực tế sau khi render, không suy từ bảng token. Shadow nhẹ 0 4px 18px rgba(32,42,40,.06).

## Bố cục và nội dung

- Header: logo JayT, tìm kiếm có label, điều hướng ngắn. Khối đầu: “Hôm nay bạn muốn tiết kiệm gì?” và lối vào “Ưu đãi hôm nay”, “Bữa trưa tiết kiệm”, “Lịch xem phim tuần này”, “Đặc quyền sinh viên”. Không hiện hash, gate, receipt hay thông báo vận hành trên mặt tiền.
- Container tối đa 1200px, gutter 32px desktop, 24px tablet, 16px mobile. Grid 3 cột từ 1024px, 2 cột từ 768px, 1 cột dưới 768px. Card padding 24px desktop/20px mobile. Navigation mobile có label chữ, không che nội dung cuối trang hoặc bàn phím.
- Thẻ gồm ảnh 4:3 khi có ảnh phù hợp, tên, mô tả ngắn, giá/chi phí dự kiến và một CTA chính. Ảnh địa điểm/sản phẩm phải có nguồn và quyền sử dụng; ảnh minh họa chung phải ghi “Ảnh minh họa”. Không tạo ảnh giả làm bằng chứng quán hay sản phẩm. Thiếu ảnh dùng bố cục chữ đẹp, không ảnh vỡ.
- Giá niêm yết và mức thực trả chỉ đi đôi khi có dữ liệu tương ứng. Calculator ghi “Tạm tính theo thông tin bạn nhập”; ví dụ voucher ghi “Mã ví dụ — không dùng để thanh toán”; lịch phim ghi “Giá ví dụ để tính chi phí nhóm”; quán chưa kiểm tra ghi “Đang cập nhật thông tin”, không nút chỉ đường/hotline từ dữ liệu chưa xác minh.
- Thay “Bento Hub”, “Đối soát 4 lớp”, “Provenance Audit”, “Quarantine Manifest”, “Local-first”, “Dry-run” trên UI bằng ngôn ngữ người dùng. Giữ thuật ngữ kỹ thuật trong hồ sơ nội bộ. Không xóa nhãn ví dụ/chưa xác minh để tạo cảm giác ưu đãi thật.
- Tên thẻ cho phép 2–3 dòng; điều kiện, lỗi và số tiền phải hiển thị đầy đủ. Không ellipsis làm mất hạn dùng/điều kiện. Empty state có giải thích và nút quay lại hoặc đổi bộ lọc.

## Tương tác

Giữ calculateDynamicStack: nhập 20.000–500.000đ, hiển thị từng tầng giảm, phí giao và tổng trả; lý do chưa đủ điều kiện phải đọc được. Có input số và slider, hỗ trợ bàn phím. Copy chỉ báo thành công khi clipboard thành công; khi bị từ chối cho chọn văn bản để tự chép. Confetti nhỏ, ngắn, tùy chọn và tôn trọng reduced-motion.

So sánh ShopeeFood/GrabFood/BeFood: slider 20.000–200.000đ, sửa được phí và giảm giá, cùng cơ sở so sánh. Phụ phí qua cầu là thông số người dùng nhập; khung giờ cao điểm dùng múi giờ Đà Nẵng và không tự khẳng định app thu phí. Mobile xếp ba kết quả theo chiều dọc, giữ tên app và tổng tiền rõ.

Lịch phim giữ ví dụ Metiz 45K, Galaxy 50K, CGV 75K, Starlight 45K với nhãn ví dụ ngay cạnh giá. Split Bill phân bổ tiền lẻ đúng tổng, xuất PNG và tin nhắn có ngữ cảnh giá ví dụ nếu dùng fixture. 10 slot quán ăn lọc theo Bách Khoa, DUE, Sư Phạm, Duy Tân; số slot không được quảng cáo thành số quán đã xác minh.

Button cao tối thiểu 44px; hover tối màu nhẹ, active có phản hồi, focus-visible viền 2px đủ tương phản; disabled có lý do khi cần. Transition 120–180ms, tắt khi reduced-motion. Modal đóng bằng Escape, giữ focus bên trong, trả focus về nút mở. Thứ tự Tab theo bố cục; label cho slider/input; aria-live polite cho tổng tiền và copy status. Loading chỉ dùng khi có tải thật; lỗi nhập sai giữ giá trị để sửa, không sinh NaN hoặc số âm.

## Chuẩn bị bằng chứng và affiliate

Schema snapshot nội bộ gồm ID ổn định, provider, requested/final URL, thời gian UTC, phương thức thu thập, HTTP status, raw artifact hoặc screenshot nguyên gốc, SHA-256, quote/span điều kiện, địa bàn, hạn hiệu lực/recheck, reviewer và verdict. Snapshot rỗng là cấu trúc chờ thu thập, không phải capture thành công. Với affiliate cần thêm publisher/program, tài liệu tracking và trạng thái xét duyệt; không ghi token vào snapshot. Shopee, Lazada, Klook, Grab chỉ ở hàng đợi chuẩn bị. Không tự chuyển is_approved thành true.

## Bàn giao và nghiệm thu

Chụp trước/sau ở 1440, 768, 390px; kiểm tra 200% zoom, bàn phím, đọc tiếng Việt, missing-image, empty/error/modal và reduced-motion. Chạy lại các calculator sau thay đổi, kiểm tra biên số, bảo toàn tổng chia tiền, copy thất bại, xuất vé và fallback share. Đo overflow, console/page errors, contrast và thời gian tương tác; ghi rõ thiết bị và phạm vi đã đo. Không quy đổi vài kiểm thử thành chứng nhận WCAG đầy đủ hay cam kết 60FPS tuyệt đối.

Preview mới dùng project deploy, giữ SSO. QA dùng quyền truy cập hợp lệ và ghi URL cuối cùng/MIME/hash để không nhầm trang đăng nhập với artifact. Lưu biên nhận mới riêng, bảo tồn R5. Màn hình 390px giả lập phải ghi là giả lập; nghiệm thu trên điện thoại thật chỉ được công bố khi có phiên kiểm tra thực tế.

Product/Design/UX chịu trách nhiệm bố cục, ngôn ngữ, đường đi; Engineering triển khai/mirror; QA kiểm tra; Data & Trust giữ phân loại; Growth đánh giá CTA mà không tự bật tracking. Nộp một hồ sơ tổng hợp trước 20:00, CEO kiểm tra trước 21:00 khi nhận được build và quyền truy cập. Các mốc là hạn giao việc; tình trạng thực hiện phải ghi theo quan sát.
