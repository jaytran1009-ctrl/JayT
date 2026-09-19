# JAYT-372 — Campus Dock, vé nhóm trên thẻ và danh mục KTX

Ban hành: 10/09/2026 14:00:36 giờ Việt Nam. Hạn Production: 11/09/2026 08:00:36 (18 giờ). Đặc tả dùng skill design-handoff và kế thừa hệ token J371. Quyền deploy đã có theo JAYT-372. Trạng thái hồ sơ: đã phát hành, chưa ghi nhận ACK của Antigravity.

## Bố cục và token

Hero → Campus Dock → kết quả cụm trường → công cụ so giá/chia tiền → danh mục KTX. Kết quả cụm trường nằm sát dock để người dùng thấy thay đổi ngay. Dock sticky dưới header sau khi đi qua hero; không che tiêu đề hay nút đang focus. Nhấp cụm khi ở cuối trang đưa vùng kết quả vào khung nhìn, tôn trọng reduced-motion.

| Token | Giá trị / kế thừa | Công dụng |
|---|---|---|
| space-2 / space-3 / space-4 / space-6 | 8 / 12 / 16 / 24px | Khoảng cách |
| radius-card / radius-chip | 24px / 999px | Thẻ và cụm trường |
| target-min | 44×44px | Nút chạm |
| motion-fast | 160ms ease-out | Đổi trạng thái |
| badge-amber-light | nền #FEF3C7, chữ #78350F | Đáy 90 ngày |
| badge-emerald-light | nền #D1FAE5, chữ #065F46 | Freeship |
| badge-amber-dark | nền #451A03, chữ #FDE68A | Dark |
| badge-emerald-dark | nền #064E3B, chữ #A7F3D0 | Dark |

Giữ nền, typography, focus và viền của J371; đo contrast AA thực tế. Badge có cả chữ và màu. Không thêm thuật ngữ vận hành vào UI.

## Campus Dock

Bốn nút: “🎓 Bách Khoa / Sư Phạm”, “🏖️ Kinh Tế DUE”, “🏢 Duy Tân / Hải Châu”, “🌊 Sơn Trà”. Desktop ≥1024px: bốn nút cùng hàng; tablet 768px: cùng hàng nếu đủ chỗ, nếu không dùng scroll nội bộ. Mobile 390px: dock cuộn ngang riêng, không gây overflow toàn trang; hiển thị một phần nút tiếp theo để gợi ý vuốt. Nút được chọn tự vào vùng nhìn thấy.

Mỗi nút là button với aria-pressed, có focus rõ; thứ tự Tab theo thứ tự hiển thị. Dùng trạng thái selected rõ cả hai theme. Không tự xin GPS; mặc định cho biết “Chọn khu vực của bạn”, có “Xem tất cả” ở vùng kết quả để bỏ lọc. Có thể nhớ lựa chọn trên máy nếu người dùng chọn; không gửi dữ liệu theo dõi.

Truyền cluster_id, branch_ids, offer_ids, địa chỉ và nguồn chứng minh phạm vi áp dụng. Không suy từ tên thương hiệu sang mọi cụm. Cập nhật số kết quả qua aria-live polite. Không có kết quả: “Chưa có ưu đãi phù hợp tại khu vực này” và nút xem tất cả; không sinh quán/giá thay thế. Khi đổi bộ lọc, các nút và thẻ không nhảy vị trí bất ngờ.

## Vé Zalo trên mỗi thẻ

Giữ CTA nhận ưu đãi và thêm hàng “Rủ bạn đi cùng”: hai nút “Kèo 2 người”, “Kèo 3 người” cho ưu đãi có giá rõ. Một chạm tạo và tải PNG theo nhóm đã chọn. Chú thích ngay cạnh giá cho biết “giá mỗi người” hoặc “tổng combo”; không chia một vé đơn thành phần ăn/giá vé giả định.

Thẻ thiếu giá có “Lập kèo” mở form gọn trong thẻ: tổng tiền dự kiến, số người 2/3 hoặc tùy chọn 1–50. Lỗi số âm, không nguyên, NaN hoặc vượt số nguyên an toàn có thông báo ngay cạnh field; không tạo PNG sai. Thuật toán q=floor(total/n), r=total%n: r người trả q+1, số còn lại trả q. PNG và tin nhắn phải thể hiện cùng phân bổ; tổng 100.000đ cho ba người là 33.334 + 33.333 + 33.333đ.

Canvas 1080×1440: tên quán tối đa ba dòng, tên ưu đãi, giá cơ sở, tổng nhóm, phân bổ, điều kiện ngắn, ngày tạo và link JayT. QR mở đúng offer qua URL có offer_id, không gắn dữ liệu cá nhân vào URL. Scan phải tới đúng thẻ/chi tiết sau reload. Chờ font và ảnh; tránh canvas taint bằng asset cùng origin hoặc CORS hợp lệ. Sau tải vẫn có lựa chọn “Chia sẻ” khi thiết bị hỗ trợ. Share hủy không báo lỗi; clipboard thất bại có văn bản chọn thủ công; download thất bại cho thử lại.

QR thanh toán chỉ dùng khi có người nhận cụ thể và dữ liệu xác nhận: hiển thị người nhận, số tài khoản, ngân hàng, số tiền và nội dung để người dùng kiểm tra trước xuất. Dữ liệu nhập giữ trong RAM và xóa khi đóng form; không ghi log. Không tự gán quán/JayT làm người nhận. Khi chưa có dữ liệu thanh toán, dùng nhãn rõ “QR mở kèo”, không ghi “QR thanh toán”. Không thu tiền hoặc thực hiện giao dịch qua tính năng xuất vé.

## Thumbnail và tem sản phẩm

Desktop bốn thẻ mỗi hàng, tablet ba, mobile hai với gap space-3. Thumbnail 1:1 object-fit contain, nền trung tính, width/height cố định, lazy-load ngoài viewport. Dùng đúng biến thể SKU và ghi nguồn/quyền sử dụng trong manifest; không dùng ảnh AI làm ảnh sản phẩm thật. Ảnh lỗi có nhãn “Chưa tải được ảnh”, không vẽ icon thay rồi báo đã hoàn tất.

Tên hai dòng, mở được tên đầy đủ; giá và thời điểm quan sát không cắt dòng đến mất chữ. CTA “Mở Shopee Mall ↗” / “Mở Tiki Trading ↗” chỉ khi đúng người bán đã xác nhận, có rel noopener và sponsored nếu là affiliate. Không xác nhận được gian hàng thì thu thập URL thay thế thật; không gọi mọi trang Shopee là Mall.

Badge ĐÁY 90 NGÀY cần lịch sử so sánh cùng SKU/biến thể/người bán, cùng cơ sở giá, đủ khoảng quan sát và công khai phạm vi lịch sử. Badge FREESHIP 0Đ cần điều kiện áp dụng còn hiệu lực về nơi giao, giá trị đơn, mã và đối tượng; bấm badge xem điều kiện. Nếu chưa biết điều kiện của người xem thì thể hiện “Freeship theo điều kiện” khi có nguồn, không cam kết 0đ. Không đủ dữ liệu thì không hiện tem; vẫn cho tra cứu sản phẩm. Hoa hồng chỉ có thể xác nhận từ mạng đối tác, không suy từ lượt click.

## Nghiệm thu có thể lặp lại

Đo ít nhất 100 thao tác chuyển cụm: input-to-DOM p50/p95, thời gian frame kế tiếp, browser và thiết bị. Mục tiêu p95 <20ms; phép lọc mảng riêng không đại diện toàn bộ tương tác. Kiểm tra qua click thực trên nút, thẻ và download; không chỉ gọi hàm toàn cục.

Kiểm tra cả hai theme tại 1440/768/390px, zoom 200%, bàn phím, 0 kết quả, nội dung dài, giá thiếu, clipboard/share lỗi. Lưu PNG thật của kèo 2/3 người; đọc được QR và đối chiếu số tiền. Ghi lỗi console/page và network phát sinh; không ghi dữ liệu thanh toán. Test product URL không mua hàng, không tạo hàng loạt click attribution.

Biên nhận ghi rõ số thẻ trong feed, số thẻ hiển thị, số thẻ truy cập được sau lọc/phân trang; không coi tồn tại trong JSON là xuất hiện trên UI. Hồ sơ Gemini có URL live, screenshot mobile, PNG mẫu, phép đo và các phần còn chờ dữ liệu. Không tuyên bố Gemini PASS khi chưa có đánh giá thật.
