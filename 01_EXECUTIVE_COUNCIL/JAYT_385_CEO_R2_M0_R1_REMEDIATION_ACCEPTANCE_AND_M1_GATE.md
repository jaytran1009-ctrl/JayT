# JAYT-385 — CEO R2 M0 R1 Remediation Acceptance and M1 Gate

**Ngày:** 10/09/2026  
**Production canonical:** `https://jayt-production-v3420.vercel.app`  
**Deployment đã đối soát:** `dpl_DatNfwCsETc8WEYGVPbEAdzN3hkW` (`READY`, `production`)  
**Phán quyết:** `M0_R1_REMEDIATION_ACCEPTED__DEFAULT_STUDENT_FRONTIER_VERIFIED__M1_GUIDED_DISCOVERY_AUTHORIZED`

## Kết quả kiểm tra CEO độc lập

- Alias Vercel canonical đang phục vụ đúng `dpl_DatNfwCsETc8WEYGVPbEAdzN3hkW`.
- Sau lazy-load và cuộn hết mặt tiền, 19/19 thẻ sinh viên có ảnh giải mã hợp lệ (`naturalWidth > 0`, `naturalHeight > 0`); không có media trống, lỗi console, tràn ngang hoặc fallback Mì Quảng sai ngữ cảnh.
- Mặt tiền mặc định hiển thị đúng 19 thẻ; không có thẻ giá lớn hơn 45.000đ. Chế độ “Khám phá tất cả ưu đãi đối tác” tồn tại, nạp 12 thẻ ban đầu và dùng phân trang cho phần còn lại của catalog 61 thẻ.
- Drawer mở đúng bằng hash, chứa thông tin điều kiện định lượng/hạn mức và cơ sở giá. Ảnh của offer trong drawer giải mã hợp lệ.

## Quyết định

M0 R1 được chấp thuận. Các kết luận này chỉ xác nhận sửa lỗi ảnh và quy tắc **mặt tiền sinh viên mặc định**; chúng không xác nhận rằng mọi deal trong catalog đều phù hợp ngân sách, có mã voucher, hay có doanh thu affiliate.

M1 Guided Discovery & Tools được mở theo work order J385. M1 phải giữ mặt tiền 19 thẻ theo predicate hiện hành và không đưa giá ngoài chuẩn vào đó khi bổ sung five ecosystem tabs, hướng dẫn ba bước, công cụ so sánh chi phí và lịch 7 ngày.

## Điều kiện kế tiếp

1. Code copy chỉ được hiện với mã thật đã có trong nguồn. Deal quầy/app/hội viên dùng CTA hướng dẫn phù hợp.
2. Các mốc 11:30/17:30 chỉ là nhắc lập kế hoạch trừ khi campaign chứng minh có giờ thả mã.
3. Cước/giá so sánh chỉ phản ánh dữ liệu người dùng nhập hoặc giá quan sát có thời điểm; không tuyên bố giá live rẻ nhất khi chưa có nguồn.
4. M2 vẫn yêu cầu URL partner có attribution xác thực, quan sát giá hợp lệ và dữ liệu sức khỏe link trước khi bật affiliate hoặc tuyên bố hoa hồng.

## Ranh giới giữ nguyên

`affiliate_enabled: false` tại điểm đóng M0. Physical bank-app QR scan vẫn `NOT_TESTED`.
