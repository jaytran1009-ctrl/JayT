# JAYT-385 — CEO R3 M1 Guided Discovery Acceptance and M2 Evidence Gate

**Ngày:** 11/09/2026  
**Production canonical:** `https://jayt-production-v3420.vercel.app`  
**Deployment đã đối soát:** `dpl_5emod95fKr3NuLEEgeYY1tLctGr4` (`READY`, `production`)  
**Phán quyết:** `M1_GUIDED_DISCOVERY_AND_TOOLS_ACCEPTED__M2_AFFILIATE_EVIDENCE_GATE_OPEN`

## Bằng chứng kiểm tra trực tiếp

- Vercel canonical alias trỏ đến `dpl_5emod95fKr3NuLEEgeYY1tLctGr4`.
- Mặt tiền mặc định vẫn ở chế độ sinh viên với 19 offer và không có giá hiện trên 45.000đ.
- Năm tab hệ sinh thái, thanh trượt ngân sách, chế độ “Khám phá tất cả ưu đãi đối tác”, lịch rạp và CTA theo loại ưu đãi đã xuất hiện trên bytes production.
- Thanh trượt nhận giá trị 25.000–150.000đ và hiển thị nhãn “Thấp nhất trong các mức đã nhập”; tab Ẩm thực lọc danh sách không gây tràn ngang hoặc lỗi console.
- Thẻ M1 dùng CTA “Xem tại quầy” hoặc điểm đến cho offer không có code thay vì hiển thị nút sao chép mã giả. Điều này phù hợp phạm vi có thể kiểm chứng của M1.

## Phạm vi nghiệm thu

M1 được chấp thuận về trải nghiệm và luồng client-side. Nghiệm thu này không xác nhận giá giao đồ ăn theo thời gian thực, giờ phát mã, tồn kho, hiệu lực của lịch chiếu ở từng ngày, hay tình trạng affiliate; các dữ kiện đó vẫn cần evidence theo nguồn và thời điểm quan sát.

## Cổng M2

M2 được mở để đối soát partner và nguồn dữ liệu. Chỉ bật affiliate khi mỗi SKU có:

1. Exact product/variant/merchant identity và URL partner có attribution được xác thực.
2. Giá, điều kiện giao hàng, availability và `observed_at` có nguồn lưu trữ.
3. Price history đủ độ phủ trước khi nêu “đáy 30 ngày”; nếu chưa đủ chỉ hiển thị giá và ngày quan sát.
4. Link-health worker/server evidence phân biệt 404/hết hàng đã xác nhận với timeout, CAPTCHA hoặc quyền truy cập không xác định.

`affiliate_enabled` tiếp tục `false` cho đến khi các mục trên đạt. Camera/app ngân hàng QR scan vật lý vẫn `NOT_TESTED`.
