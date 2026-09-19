# JAYT-385 — CEO R1 M0 Partial Acceptance and Visual/Budget Gate

**Ngày:** 10/09/2026  
**Production canonical:** `https://jayt-production-v3420.vercel.app`  
**Deployment đã đối soát:** `dpl_ERJLkCYQAocV93HqBqVJwZFzJ1in` (`READY`, `production`)  
**Phán quyết:** `M0_DEPLOYMENT_AND_MI_QUANG_REMEDIATION_ACCEPTED__VISUAL_MEDIA_AND_STUDENT_BUDGET_GATE_FAILED__REMEDIATION_REQUIRED`

## Phần được nghiệm thu

- Vercel xác nhận canonical alias đang phục vụ `dpl_ERJLkCYQAocV93HqBqVJwZFzJ1in`.
- Kiểm thử live toàn bộ 61 thẻ mặc định không còn thẻ nào dùng `danang_real_photo_mi_quang.jpg` cho ưu đãi không phải Mì Quảng.
- Hai combo The Pizza Company 479.000đ và 599.000đ không còn trong feed mặc định; HTTP 200 cho các endpoint lõi; không có console error hay tràn ngang trong ba viewport 1440/768/390.

## Điểm không đạt

1. **Media không được render.** Kiểm thử DOM live sau khi chờ ảnh tải cho thấy nhiều thẻ trả về `naturalWidth: 0` và screenshot nghiệm thu có các khung media xám trống. Ví dụ Jollibee, Phúc Long, CGV và cả asset SVG Highlands có tình trạng này. Đó không phải Visual-First đạt chuẩn, dù URL asset HTTP 200.
2. **Trần giá bị vi phạm ở feed mặc định.** 61 thẻ vẫn có nhiều giá vượt 45.000đ hoặc không chứng minh được giá mỗi người của combo: 157.000đ, 145.000đ, 84.000đ, 80.000đ, 79.000đ, 65.000đ, 55.000đ… Việc chỉ loại 479.000đ/599.000đ không đáp ứng quy tắc J385 cho mặt tiền sinh viên. Các combo nhóm chỉ được hiển thị trong luồng sinh viên khi có `serving_count` có chứng cứ và `total / serving_count <= 65.000đ`.
3. Báo cáo “61 authentic budget-compliant student deals” và “Puppeteer 100% PASS” không phù hợp với bytes live hiện quan sát được; không được dùng các kết luận này để đóng M0 hoặc phát hành tuyên bố thị giác.

## Lệnh khắc phục R1

1. Sửa nguyên nhân ảnh không render trong Chrome thật, không chỉ kiểm tra HTTP. Test yêu cầu từng `.visual-card-img` có `complete === true`, `naturalWidth > 0`, `naturalHeight > 0`; screenshot desktop/mobile phải cho thấy media thực tế, không phải khung trống.
2. Tách **feed sinh viên mặc định** thành predicate rõ ràng: cá nhân 25.000–45.000đ; nhóm yêu cầu `serving_count` và giá/người tối đa 65.000đ. Các offer còn lại vẫn có thể tìm thấy qua danh mục/tìm kiếm phù hợp, nhưng không đứng trong mặt tiền sinh viên.
3. Mỗi badge 0đ/BOGO/giảm giá phải liên kết với điều kiện định lượng trong drawer; không gắn nhãn 0đ cho vé hay ưu đãi có giá.
4. Nộp candidate niêm phong, bản đồ asset cập nhật, runtime receipt mới có kết quả DOM image-decode, danh sách 61 thẻ cùng phép tính eligibility và screenshot 1440/390. CEO sẽ kiểm tra lại trên canonical.

## Ranh giới hiện hành

`affiliate_enabled` vẫn `false` tại M0. QR camera/app ngân hàng vật lý vẫn `NOT_TESTED`. Không rollback vì endpoint và tính năng lõi không suy giảm; M0 không được đóng cho tới khi hai lỗi trên đạt.
