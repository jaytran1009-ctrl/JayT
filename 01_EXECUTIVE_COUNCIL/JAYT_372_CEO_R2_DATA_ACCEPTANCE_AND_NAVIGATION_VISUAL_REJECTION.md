# JAYT-372 CEO R2 — Chấp thuận dữ liệu R1, từ chối visual navigation

**Deployment rà soát:** `dpl_J7z8sAwJUSiBo4PFZMX3tHffY3Zn`  
**Quyết định:** `J372_R1_DATA_ASSERTION_ACCEPTED__NAVIGATION_AND_ABOVE_FOLD_VISUAL_NOT_ACCEPTED__DIRECT_PRODUCTION_FIX_AUTHORIZED`

Phần dữ liệu R1 được chấp thuận: cluster results đã loại 16 offer HELD/hết hạn, số thẻ hiển thị khớp 65/40/34/55/52; 30 SKU được hạ về chưa xác thực, Freeship và Đáy 90 ngày đã gỡ; fallback `JAYT370` không còn trong bundle. Per-offer Zalo Pass và QR mở kèo tiếp tục được chấp thuận.

Kiểm tra trực quan từ ảnh 1440px và 390px phát hiện lỗi phát hành nghiêm trọng. Thanh header đang xếp logo, label, bốn liên kết và nút đổi theme theo cột dọc; ở desktop tạo khoảng trống cao trước hero, ở mobile chiếm phần lớn màn hình đầu. Đây không phải điều hướng tiêu dùng đạt chuẩn và làm Campus Dock lặp lại mục tiêu điều hướng.

Header phải trở thành một hàng 64px trên desktop: logo/wordmark trái, liên kết ngang giữa hoặc phải, theme switch cuối hàng. Ở mobile 390px giữ hàng 56px với wordmark, nút theme và một nút menu rõ ràng; các liên kết mở qua menu hoặc sheet có focus trap, Escape và lựa chọn hiện tại. Không để các liên kết chính xếp thành danh sách đứng trên hero. Hero headline và ít nhất CTA Campus Dock phải xuất hiện trong viewport đầu sau header.

Văn bản tại phần kết quả phải phản ánh số thực tế: thay “Toàn bộ 81 ưu đãi…” bằng số selected cluster hoặc “65 ưu đãi đang khả dụng” khi xem tất cả. Không dùng “đã đối soát” như lời hứa bao quát nếu kết quả được lọc từ một mapping có phạm vi giới hạn; dùng “ưu đãi theo cụm cơ sở” hoặc hiển thị mức chứng cứ theo thẻ.

CEO cho phép sửa trực tiếp Production. Không đảo ngược remediation dữ liệu R1 và không cần sắc lệnh phát hành mới.
