# JAYT-371 — Đặc tả thiết kế và bàn giao Antigravity

Ban hành 10/09/2026 13:29:46 (Việt Nam). Hạn hoàn tất Production: 11/09/2026 13:29:46. Quyền triển khai đến từ JAYT-371. Đây là đặc tả thi công từ mô tả Chủ tịch, chưa phải bản giao diện đã triển khai hay được Gemini nghiệm thu.

## Bố cục và mục đích

Trang chủ giúp chọn một hành động tiết kiệm ngay trong màn hình đầu. Header có logo JayT, điều hướng đến bốn module và nút đổi sáng/tối. Hero nói “Đà Nẵng, mỗi ngày một chút hời.”, mô tả tối đa 90 ký tự; ba CTA “So giá bữa trưa”, “Tìm ưu đãi”, “Chia tiền nhóm” cuộn đến công cụ đang hoạt động. Dưới hero là grid công cụ, tiếp đến ưu đãi và danh mục mua sắm. Không dùng thuật ngữ kiểm toán trong giao diện khách hàng.

| Token | Giá trị | Sử dụng |
|---|---|---|
| space-1 / 2 / 3 / 4 / 6 / 8 | 4 / 8 / 12 / 16 / 24 / 32px | Khoảng cách |
| radius-card / radius-ticket | 24 / 20px | Card và vé |
| content-max | 1200px | Chiều rộng trang |
| light-bg / surface / text / muted | #F7F8FA / #FFFFFF / #17212B / #526171 | Porcelain |
| dark-bg / surface / text / muted | #101419 / #1B222A / #F3F6FA / #B7C2CE | Obsidian Titanium |
| accent-light / accent-dark | #047857 / #6EE7B7 | CTA và trạng thái rẻ nhất |
| border-light / border-dark | #D5DCE3 / #43505E | Biên tĩnh và control |
| font-ui | Inter hoặc Be Vietnam Pro, system sans fallback | Font tiếng Việt tự host nếu có quyền |
| font-body / label / h1 | 16/24, 14/20, desktop 48/54 mobile 30/36px | Phân cấp đọc |
| shadow-card | 0 1px 2px #00000008, 0 8px 24px #0000000A, 0 24px 60px #0000000A | Ba lớp nhẹ |
| motion-fast | 160ms cubic-bezier(.2,.8,.2,1) | Hover, focus, đổi trạng thái |

Glass chỉ áp dụng tại header hoặc vùng nổi nhỏ, blur tối đa 12px và nền đủ đục để chữ dễ đọc; có fallback nền đặc. Không đặt blur lên toàn bộ grid. Vé ưu đãi có đường viền accent mảnh và lỗ đục bằng CSS; không phát sáng chữ thân bài. Token là điểm khởi đầu, kiểm tra contrast thực tế cả hai theme trước bàn giao.

## Responsive và hình ảnh

- Từ 1024px: grid 12 cột, gutter space-6, hero ảnh 7 cột / nội dung 5 cột; calculator và split bill mỗi khối 6 cột; danh mục mua sắm 4 cột thẻ.
- 768–1023px: grid 6 cột, gutter space-4; ảnh và nội dung hero theo chiều dọc hoặc 3/3 nếu không ép chữ; danh mục 3 cột thẻ.
- Dưới 768px: lề space-4, một cột công cụ; danh mục 2 cột thẻ. Header 56px; CTA và nội dung dẫn xuất hiện trước ảnh hero để có hành động tại scrollY=0. Nội dung không tràn tại 390px và khi zoom 200%.
- Hero giữ tỷ lệ 16:9 ở mọi kích thước, dùng nguồn ảnh có bố cục đầy đủ cầu; tuyệt đối không kéo dãn. Nếu nguồn bị cắt biểu tượng, đổi asset hoặc fit contain với nền phù hợp. Overlay gradient chỉ sau chữ khi cần.
- Sơn Trà, Cầu Sông Hàn, Mỹ Khê là ảnh danh mục, alt tiếng Việt đúng hình. Mì Quảng, bún chả cá, cơm gà dùng ảnh có quyền sử dụng, không giả làm ảnh của một quán cụ thể. Ảnh minh họa dựng bằng AI phải ghi nhận trong asset manifest, không được dùng làm chứng cứ giá hay ưu đãi.
- Asset manifest lưu nguồn, tác giả/giấy phép hoặc nguồn tạo, kích thước, SHA-256 và alt. Có WebP/AVIF, srcset, width/height; hero tải ưu tiên, ảnh dưới fold lazy-load. Tránh font/ảnh bên thứ ba chặn trang.

## Bốn module và trạng thái

| Module | Đầu vào / props | Tương tác và kết quả |
|---|---|---|
| So giá bữa trưa | Giá món 20–200K, phí giao, phụ phí và giảm giá từng app | Range + ô số đồng bộ; 3 cột ShopeeFood, GrabFood, BeFood; giá thấp nhất có viền emerald và chữ “Thấp nhất”; hòa giá đánh dấu tất cả bên hòa |
| Kho ưu đãi | Offer ID, loại CTA, code, giá, điều kiện, URL, thời hạn | Vé hiển thị điều kiện ngắn; sao chép đúng code và báo “Đã sao chép”; không có code vẫn có CTA quầy/app; không thay bằng mã tự tạo |
| Chia tiền nhóm | Tổng integer VND, số người nguyên 1–50, tên kèo tùy chọn | Chia chính xác: r người trả q+1, còn lại trả q; xuất PNG Canvas có tổng, số người, phân bổ và URL JayT; tải ảnh hoặc Web Share khi hỗ trợ |
| Mua sắm KTX | 30 SKU thật, biến thể, cửa hàng, URL, giá và thời điểm | Ảnh 1:1, tên tối đa 2 dòng, giá rõ, liên kết sản phẩm cụ thể; tem “Đáy 90 ngày” chỉ xuất hiện khi lịch sử đủ căn cứ; trạng thái affiliate theo provider |

So giá phải ghi rõ “Ước tính từ thông tin bạn nhập” khi chưa có báo giá trực tiếp. Phụ phí qua cầu/giờ cao điểm là dữ liệu người dùng hoặc nguồn đã xác nhận, không tự dựng phí của app. Tính phía client, không request mạng khi kéo. Đo input-handler, DOM update và frame kế tiếp riêng; mục tiêu input-to-DOM p95 <20ms qua ít nhất 100 tương tác, ghi thiết bị/browser. Không dùng tốc độ phép cộng làm tốc độ UX.

PNG dùng canvas kích thước logic khoảng 1080×1440, chờ font, có fallback khi canvas/share lỗi. Không tự gửi tin Zalo hay đọc danh bạ; cho tải ảnh và sao chép tin nhắn. Kiểm tra thực sự nội dung PNG và tổng tiền qua ví dụ 100.000đ/3 người.

Default, hover, focus, pressed đều có tín hiệu rõ. Copy thành công có aria-live polite; lỗi clipboard cung cấp chọn văn bản. Loading dùng skeleton cùng kích thước để tránh layout shift. Empty state có lời giải thích và nút xóa bộ lọc. Lỗi ảnh dùng fallback trung tính; lỗi dữ liệu có nút thử lại, không bỏ trang trắng. Tên dài wrap, không cắt giá, điều kiện và CTA; dữ liệu thiếu không tự điền giá. Motion tắt với prefers-reduced-motion, không parallax tự chạy.

## Kiểm tra bàn giao

Tab đi từ header → theme → CTA hero → từng module theo thứ tự DOM. Control có label, touch target ít nhất 44×44px, focus 2px với offset; modal có Escape, focus trap và trả focus về nút mở. Không truyền đạt bên rẻ nhất bằng màu đơn thuần. Mục tiêu WCAG AA: chữ thường 4.5:1, control/focus 3:1; kiểm tra thực tế, không tự ghi PASS.

Lưu screenshot toàn trang và scrollY=0 tại 1440/768/390px, cả hai theme; ghi console/runtime errors, overflow, CLS và các tương tác thực. Kiểm tra selector hành động bằng bấm UI, không chỉ gọi hàm global. Test link không mua hàng, không tự tạo click hoa hồng hàng loạt. Giá, cửa hàng chính hãng và attribution cần chứng cứ riêng cho từng SKU.

Hậu deploy đo ba endpoint, hash payload, thử lại bốn module trên domain canonical, rồi lập packet Gemini có screenshot mobile, URL, giới hạn còn lại và danh sách hành động cần trải nghiệm. Ghi nhận kết quả Gemini khi thực sự nhận được. Production được phép triển khai theo JAYT-371; nhãn doanh thu và “Đáy 90 ngày” phụ thuộc dữ liệu thực tế, không phụ thuộc việc hoàn tất thiết kế.
