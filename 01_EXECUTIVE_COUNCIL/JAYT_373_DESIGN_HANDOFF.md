# JAYT-373 — Đặc tả bàn giao bộ công cụ tại quán

Ban hành 10/09/2026 15:30:03 (Asia/Ho_Chi_Minh). Thi công Antigravity trên http://127.0.0.1:4176. Hạn bản chạy được: 11/09/2026 09:30:03. Đây là đặc tả từ yêu cầu Chủ tịch, chưa phải ảnh thiết kế đã được Gemini nghiệm thu.

## Bố cục và token

Giữ header J372; ngay dưới là ô “Bạn đang ở quán nào?”, sau đó hero và Campus Dock. Trên mobile, ô tìm kiếm một hàng và nút “Chia tiền tại bàn” 44px luôn dễ chạm. Tìm quán mở sheet ngay, không yêu cầu cuộn qua danh sách ưu đãi. Chi tiết quán chứa tiện ích và “Quanh đây 500m”; bảng chia tiền có thể mở từ quán hoặc điều hướng.

| Token | Giá trị | Dùng cho |
|---|---|---|
| space-2/3/4/6 | 8/12/16/24px | Kế thừa J372 |
| radius-card | 24px | Sheet, thẻ |
| target-min | 44px | Mọi nút và input |
| panel-max | 640px | Modal desktop |
| color-action | #007F62 | CTA light; kiểm tra AA |
| surface-light / text-light | #FFFFFF / #17212B | Light |
| surface-dark / text-dark | #18212A / #F4F7FA | Dark |
| focus-ring | 2px currentColor, offset 3px | Focus rõ ở cả hai theme |
| motion-fast | 160ms ease-out | Sheet, tôn trọng reduced-motion |
| font-body | font tiếng Việt hiện có, 16px/1.5 | Form và kết quả |

Desktop >=1024: bảng món và tổng kết hai cột (2:1). Tablet 768–1023: một cột, tổng kết ngay sau món. Mobile <768: mỗi món là thẻ có tên, số lượng, giá và chip người dùng; không dùng bảng tràn ngang. Sheet mobile rộng viewport trừ space-4 hai bên, max-height calc(100dvh - 32px), cuộn nội bộ; thanh hành động không che bàn phím hoặc phần tử focus.

## Thành phần và tương tác

| Thành phần | Props chính | Hành vi |
|---|---|---|
| CounterSearch | query, branches, selectedBranchId | combobox, tối đa 8 gợi ý + mở rộng |
| CounterSheet | branch, basket, eligibility, rules | 3 bước với điều kiện và nguồn |
| ItemizedBill | participants, items, sharedFees | cập nhật phân bổ ngay khi sửa |
| RecipientForm | bankBin, account, displayName | xác nhận người nhận trước QR |
| PaymentQR | participantId, amount, recipient | QR và chuỗi thông tin đọc được |
| BranchUtilities | values, evidence, timestamps | có/chưa rõ/hết hiệu lực tách biệt |
| NearbyList | origin, accuracy, radius, branches | origin thủ công hoặc GPS chủ động |

Search mặc định gợi ý từ dữ liệu có thật; ArrowUp/Down chọn, Enter mở, Escape đóng, dùng aria-controls/expanded/activedescendant và listbox. Sheet giữ focus, có nút đóng, Escape và trả focus đúng trigger. aria-live polite báo số kết quả và tổng tiền sau thao tác, tránh đọc liên tục mỗi phím số. Nhấn nền ngoài đóng nếu không mất dữ liệu form; xác nhận khi kết thúc phiên có bill đang nhập.

Nút có default/hover/focus/pressed/disabled; disabled kèm lý do. Loading dùng nhãn “Đang tải dữ liệu quán…”; lỗi tải có “Thử lại”. Empty: “Chưa có thông tin quán này” và giữ nút chia tiền. Mỗi bước tại quầy thiếu evidence vẫn hiện “Hỏi nhân viên về điều kiện”. Chỉ ghi “Rẻ nhất trong các phương án đã biết” khi bộ so sánh đủ input và điều kiện cộng dồn được xác nhận.

## Chia món và nhận tiền

Tên người tối đa 40 ký tự, món 100 ký tự, tên quán 120 ký tự. Cho tên trùng nhưng ID nội bộ duy nhất. Tên dài xuống dòng; không cắt ngân hàng, tài khoản hoặc số tiền. Hỗ trợ IME tiếng Việt, không lọc khi composition còn đang nhập.

Đơn giá × số lượng ra tổng dòng. Dòng nhiều người ăn dùng q=floor(total/n), r=total%n; r người đầu theo ID ổn định trả thêm 1đ. Phí chung phân bổ riêng cùng quy tắc. Tổng mọi người bằng tổng hóa đơn tuyệt đối. Xóa người phải xử lý gán món còn lại, không âm thầm làm mất món. Phần tổng luôn cho thấy món, phí chung và số tiền mỗi người.

QR dùng ngân hàng và số tài khoản người nhận nhập; giữ số 0 đầu. Tên hiển thị tự nhập ghi “Tên người nhận bạn nhập” nếu chưa có xác thực ngân hàng. Màn hình xác nhận có đủ ngân hàng, tài khoản, số tiền trước khi tạo từng QR. QR hiển thị tối thiểu 240px, nền trắng, quiet zone theo thư viện/spec; không chèn logo che mã. Có “Sửa người nhận”, “Sao chép thông tin” và “Kết thúc phiên”. Clipboard lỗi cho chọn text thủ công; tải PNG thất bại cho thử lại. Không tự đánh dấu đã trả.

## Tiện ích và quanh đây

Wi-Fi có nút hiện/sao chép chỉ khi được phép công bố, ghi ngày xác nhận. Ổ cắm, máy lạnh, gửi xe dùng trạng thái Có/Không/Chưa rõ; không suy từ chuỗi thương hiệu. Xe buýt cần trạm, tuyến, chiều và ngày áp dụng; lịch công bố phải ghi “Theo lịch”, không thể hiện như dữ liệu xe thời gian thực.

500m là bán kính địa lý; nhãn khoảng cách lấy từ tọa độ đã biết. Không đồng nhất với đi bộ ba phút. Chọn campus/quán làm tâm mặc định, GPS là lựa chọn có giải thích; quyền bị từ chối quay về chọn tâm. Nguồn không có tọa độ vẫn truy cập qua tìm kiếm nhưng không gắn số mét giả.

## Bàn giao và kiểm thử

Đủ screenshot 1440/768/390 hai theme, sheet mở/đóng, bill ba người, QR mẫu dùng dữ liệu thử và kết quả rỗng. Đo 100 thao tác thật input-to-DOM p95 <50ms và frame hiển thị riêng. Test tổng tiền, QR decode và thử nhận diện trong app ngân hàng, không chuyển tiền. Chưa thử app phải ghi NOT_TESTED.

Tất cả dữ liệu cá nhân/tài khoản/tọa độ giữ trong RAM. Không gửi vào QR image API hay URL/log/storage. Ghi nguồn chính thức của format VietQR và bank directory với ngày truy cập; triển khai encoding từ spec đã đọc, không tự đoán. Receipt bind code được :4176 phục vụ, ảnh, runner và trạng thái test. Gemini nhận ba kịch bản thực tế trong dispatch; chỉ ghi PASS sau đánh giá thực.

