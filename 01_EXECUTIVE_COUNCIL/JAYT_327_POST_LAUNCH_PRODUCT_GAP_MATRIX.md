# JAYT-327 — Post-launch product gap matrix

Ngày khảo sát: 06/09/2026. Trạng thái: AUDIT_DELIVERED__PENDING_STRATEGIC_SCOPE_APPROVAL.
Đây là tổng hợp kiểm tra kỹ thuật, không giả lập cuộc họp hay chữ ký của các phòng ban. Mã JAYT-327 được dùng theo chỉ thị mới; không ghi đè sắc lệnh phát hành cùng mã đã có.

## Baseline và phương pháp

- Production v3.422.0 / 24 thẻ; rollback v3.421.0 / 22 thẻ. Không deploy, không chỉnh bundle hoặc registry.
- Kiểm tra mã trong deploy_personal_v3422/index.html và jayt_storefront_v3422.js; kiểm tra cấu hình heartbeat đã tồn tại và receipt monitor.
- Lượt monitor đã thực đo ngày 06/09/2026 lúc 04:15:48 UTC: HTTP 200, 24/24 URL khớp, ba viewport 1440/768/390 không overflow, 0 console/runtime error, 0 external request và forbidden commercial link. Đây là snapshot, không phải SLA liên tục.
- Các kết luận chưa được kiểm thử tương tác được đánh dấu CHƯA KIỂM TRA, không coi là PASS.

## Ma trận sáu trục

| Trục | Trạng thái và căn cứ | Khoảng trống / mức ưu tiên | Đơn vị phụ trách đề xuất | Tiêu chí nghiệm thu sau khi duyệt scope |
|---|---|---|---|---|
| Tìm kiếm | THIẾU trong bundle khảo sát: không thấy input/handler tìm tên tiện ích trên tập 24 thẻ | P1: danh sách dài, khó tìm nhanh | Product + Engineering + QA | Tìm theo tên/từ khóa có dấu và không dấu, không phân biệt hoa thường; xóa truy vấn trả đủ 24; có trạng thái không kết quả; không đổi ID/URL hoặc ghi registry; dùng được bàn phím |
| Bộ lọc | THIẾU: chưa thấy filter danh mục cho tập thẻ công ích; nav Khám phá không tự chứng minh có bộ lọc | P1: chưa thu hẹp Y tế/Xe buýt/Giáo dục/Số hóa | Product + Data & Trust + Engineering | Taxonomy được duyệt riêng; tổ hợp search/filter trả đúng tập fixture; reset đầy đủ; trạng thái chọn có tên và aria-pressed; 0 thẻ nhân bản |
| Điều hướng mobile | ĐÃ CÓ layout không overflow ở 390px theo monitor; CHƯA KIỂM TRA độ mượt cuộn, toàn bộ tuyến điều hướng, máy thật | P1 kiểm thử hành trình; chưa kết luận có lỗi hiệu năng | Design + QA | Chạy đủ các nav, mở/đóng dialog, quay lại và cuộn trên máy thật; mọi control thuộc phạm vi >=44x44 CSS px theo yêu cầu sản phẩm; không che focus/nội dung; ghi thiết bị và kết quả |
| Freshness TTL | THIẾU cơ chế phát hiện nguồn đổi trong bundle khảo sát; ngày xuất bản/hash lưu trữ không phải detector thay đổi | P1: nguồn có thể hết hiệu lực mà thẻ vẫn hiển thị | Data & Trust + Engineering + QA | Chính sách TTL theo loại nguồn được duyệt; fixture unchanged/changed/timeout/expired có verdict riêng; timeout không bị gọi là nội dung sai; changed chuyển review, không tự sửa chứng cứ hay tự công bố; không capture mới khi chưa có scope |
| Community report | ĐÃ CÓ nút Báo nguồn và dialog; THIẾU kênh gửi thực tế. index.html ghi rõ chưa mở cổng gửi trực tuyến | P1: chưa báo link chết/sai thông tin theo thẻ | Product + Privacy/Data & Trust + Engineering | Chốt nơi nhận, lưu giữ và chống spam trước implementation; report gắn ID/URL, có xác nhận thành công/thất bại, không giả báo đã gửi; không bắt buộc PII và không tự thêm tracking |
| A11y/hiển thị | ĐÃ CÓ aria-label trên nav/dialog và một số card; monitor đo 25 cặp nút đạt 4.5:1. CHƯA KIỂM TRA đầy đủ bàn phím, NVDA, zoom200%, semantic headings và toàn bộ nhãn card | P1 audit còn thiếu; không tuyên bố chứng nhận WCAG toàn trang | Design + QA | Kiểm WCAG2.1 AA: 1.1.1,1.3.1,1.4.3,1.4.11,2.1.1,2.4.3,2.4.7,3.3.2,4.1.2; Tab/Shift-Tab/Enter/Space/Escape, focus dialog và trả focus; NVDA đọc tên/role; zoom200% không mất chức năng; lưu bằng chứng từng lỗi |

Không phát hiện P0 từ phạm vi kiểm tra này; không đồng nghĩa đã chứng minh không có P0. Nâng P0 nếu phát hiện mất chức năng thiết yếu hoặc rò rỉ dữ liệu. Mốc 44px là yêu cầu sản phẩm; WCAG2.1 2.5.5 thuộc AAA, không dùng riêng tiêu chí đó để tuyên bố AA.

## Probe và chuẩn bị staging

- Heartbeat jayt-production-v3-420-monitoring đã ACTIVE, FREQ=HOURLY; URL mục tiêu đúng. Tên cũ không phải baseline; script hiện assert v3.422.0/24.
- Probe chạy ngoài sandbox đã có; lịch vẫn phụ thuộc host/app. Receipt là snapshot và lịch sử mẫu, không chứng minh không gián đoạn giữa các lần đo. Không tạo automation thứ hai trùng chức năng.
- Khoảng trống P1 vận hành: cần Cố vấn chốt external always-on probe/provider, ngân sách và nơi nhận cảnh báo. Trước khi có quyền dịch vụ ngoài, không đăng ký tài khoản hoặc thay đổi hạ tầng. Tiêu chí: UTC/status/latency/error category, phát hiện thiếu mẫu, log lịch sử bảo toàn, cảnh báo outage/recovery; thống kê success theo mẫu, không ghi 100% uptime không căn cứ.
- git branch/status tại project trả not a git repository: chưa tạo Git branch, không tự git init/move dự án. Preview RC :4175 đã có là môi trường tham chiếu, chưa phải nhánh phát triển module.
- Chuẩn bị module chỉ ở mức kế hoạch: sau khi chỉ định Git checkout hợp lệ và duyệt scope, tạo nhánh staging riêng, dùng registry read-only, cấm sửa deploy_personal_v3422 và không auto-promote.

## N+1 trình Cố vấn

1. Product chốt ưu tiên search/filter trên registry read-only (P1); không tăng số thẻ để thay thế cải tiến khả năng tìm kiếm.
2. Design/QA hoàn tất kiểm thử bàn phím/NVDA/zoom và mobile thực tế, ghi lỗi trước khi giao code.
3. Data & Trust trình chính sách TTL và quyền kiểm tra nguồn; Product trình cơ chế báo sai và riêng tư.
4. Cố vấn duyệt scope, tiêu chí và nơi staging hợp lệ; CEO mới phát work order implementation. Chưa có quyền code module, recapture nguồn hoặc phát hành mới từ tài liệu này.

Hạn giao ma trận: đã giao trong phiên này, trước thời hạn 24 giờ. Những kiểm thử ghi CHƯA KIỂM TRA chưa được nghiệm thu và không được dùng để cam kết hoàn thành website.
