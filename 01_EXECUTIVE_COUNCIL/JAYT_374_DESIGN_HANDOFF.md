# JAYT-374 — Đặc tả Visual-First và nhịp sống cả ngày

Ban hành 10/09/2026 16:31:51 Việt Nam. Hạn thi công và deploy: 11/09/2026 16:31:51. Design-handoff từ mô tả Chủ tịch; quyền Production theo J374 đã có.

## Bố cục
Header → tìm quán tại quầy → hero gọn và khối gợi ý theo giờ → Campus Dock → ưu đãi nổi bật → công cụ tại bàn/so giá → danh mục KTX. Trên mobile có lối tắt công cụ trước danh sách. Giữ trang ngắn bằng phân trang “Xem thêm”, không xóa ưu đãi khả dụng. Nút này báo số còn lại và đưa focus tới thẻ mới đầu tiên khi dùng bàn phím.

## Token và responsive
Kế thừa Porcelain Light/Obsidian Titanium, typography tiếng Việt J372/J373.
| Token | Giá trị | Công dụng |
|---|---|---|
| space-2/3/4/6 | 8/12/16/24px | Khoảng cách |
| radius-card | 24px | Thẻ ảnh |
| content-max | 1200px | Bề ngang nội dung |
| media-share | khoảng 60% | Diện tích ảnh mặt thẻ |
| touch-min | 44px | Input, CTA, nút đóng |
| title-card | 18px/1.35, 650 | Tên hai dòng |
| price-card | 28px/1.1, 750 | Giá, tabular numbers |
| motion-fast | 160ms ease-out | Hover/pressed/drawer |
| focus-ring | 2px, offset 3px | Kế thừa màu focus đạt AA |

Desktop >=1024: grid ba cột; tablet 768–1023: hai cột; mobile <768: một cột để ảnh và thao tác đủ lớn. Card khoảng 320×440px tại 390px, ảnh khoảng 264px cao; cho nội dung tăng chiều cao với zoom/font lớn, không khóa chiều cao gây cắt chữ. Image object-fit cover có focal point theo asset; poster contain khi crop làm mất nội dung chính.

## Thẻ và drawer
Mặt thẻ: ảnh, tên món/kèo tối đa hai dòng, giá đậm có đơn vị rõ, badge tiết kiệm khi có phép tính từ cùng đơn vị/đối tượng/điều kiện. Không có chứng cứ tiết kiệm thì bỏ badge; không sinh số giảm mẫu. Giá “từ” hoặc điều kiện hội viên thiết yếu nằm ngay cạnh giá. Hai CTA “Chi tiết” và “Rủ bạn kèo này” có diện tích chạm riêng, không lồng button vào link.

Drawer desktop rộng tối đa 560px bên phải; mobile bottom sheet tối đa 90dvh, nội dung cuộn riêng. Gồm ảnh, giá/cách tính, địa chỉ/chi nhánh, điều kiện/hiệu lực, nguồn chính hãng, nút nhận deal theo loại code/quầy/app và nút rủ bạn. Raw hash, tên file nội bộ và ngôn ngữ audit nằm trong vault, không đưa lên mặt tiền.

Mở drawer đặt focus vào tiêu đề/nút đóng; trap Tab, Escape/outside close, trả focus về thẻ ban đầu. Deep-link offer mở đúng drawer sau reload, Back đóng drawer trước khi rời trang.

## Nhịp thời gian và dữ liệu
Khung giờ dùng Asia/Ho_Chi_Minh theo dispatch; headline ngắn: “Cà phê sáng”, “Ăn trưa gần trường”, “Chiều học nhóm”, “Tối đi cùng bạn”, “Lên kèo ngày mai”. Cho chọn khung khác; không tự đổi khi đang đọc drawer. Không suy UNKNOWN ổ điện/máy lạnh thành Có. Khi thiếu cafe đủ dữ liệu, hiển thị danh sách cafe theo khu vực cùng “Hỏi quán về ổ cắm”. Không gắn “đang mở” chỉ vì thuộc khung giờ.

## Ảnh và trạng thái
Mỗi asset ghi entity_id, source URL, quyền sử dụng, hash, kích thước, alt và focal point. Ảnh đầu viewport ưu tiên tải; ảnh bên dưới lazy-load, có width/height để tránh nhảy bố cục. Loading: skeleton cùng kích thước. Lỗi ảnh: nền màu và minh họa vector trung tính, nhãn “Ảnh minh họa”; không thay bằng ảnh món/quán khác. Không cần thu thập evidence mới chỉ để giữ luồng giao diện hoạt động.

Default/hover/focus/pressed rõ ở cả hai theme; hover chỉ nâng nhẹ 2px. Reduced motion tắt chuyển động. Tiếng Việt và tên dài xuống dòng; tiền không cắt. Empty filter: “Chưa có kèo phù hợp”, nút đổi cụm/xóa lọc. Không ẩn toàn bộ công cụ vì thiếu dữ liệu deal.

## Rủ bạn và thanh toán
Rủ bạn mở sheet chọn 2/3/tùy chọn người và xác nhận tổng/cơ sở giá. Vé có tên, offer URL, tổng nhóm và phân bổ từng người, điều kiện ngắn. Một vé đơn không được tự đổi thành combo đủ ba người. Chia sẻ native nếu có; fallback copy text hoặc tải PNG; hủy share không báo lỗi. Clipboard lỗi cho vùng text chọn thủ công và nút thử lại. Không tự gửi Zalo.

Sau xác nhận người nhận, hiển thị ngân hàng, tài khoản nguyên chuỗi, tên người dùng nhập, số tiền/memo với nút sao chép từng trường và “Sao chép tất cả”. Dòng phụ “Không quét được? Sao chép thông tin chuyển khoản”. Chi tiết kỹ thuật NOT_TESTED ghi trong biên nhận; không hứa chuyển tiền thành công 100%. Mọi thay đổi người nhận/số tiền hủy xác nhận và ẩn QR theo J373.

## Nghiệm thu
Ảnh 1440/768/390 hai theme, thẻ/chi tiết/share/copy; tất cả khung giờ và các mốc ranh giới. Kiểm tra lần đầu người dùng nhìn thấy tên, giá, ảnh và CTA; không phải danh sách chữ kéo dài. Đếm đủ offer qua lọc/Xem thêm. Kiểm tra keyboard, zoom200%, AA contrast và không tràn ngang. Gemini đánh giá visual dựa trên screenshots/live bytes đã bind, báo rõ phạm vi thử nghiệm. Hai release receipts ghi deployment ID, alias, thời điểm, hash và rollback target.

