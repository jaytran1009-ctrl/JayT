# JAYT-242 — Master Work Order: Full Go-Live Community OS

**Ban hành:** CEO JayT  
**Ngày:** 2026-08-28  
**Trạng thái:** `P0 — REMEDIATION + FORWARD DEVELOPMENT; NO CEO ACCEPTANCE`  
**Phạm vi:** JayT Đà Nẵng production, source of truth, QA, supply và affiliate.  
**Mục tiêu khách hàng:** Giúp sinh viên và nhân viên văn phòng tìm ưu đãi, voucher, địa điểm và ra quyết định mua hằng ngày — không làm họ tin vào dữ liệu chưa được chứng minh.

## 1. Phán quyết điều hành và sự thật kiểm toán

CEO đã kiểm tra trực tiếp production `https://deploy-ten-xi-48.vercel.app` vào 2026-08-28. Bản live hiện hiển thị trong rail “Cố vấn giá trị” ba khuyến nghị `NÊN MUA NGAY`, giá thực trả, “thấp nhất 30 ngày” và deep link AccessTrade/merchant cho Tiki, CellphoneS, Samsung.

Không có evidence độc lập, bất biến và đủ điều kiện để CEO xác nhận các claim đó. Local gate `test_jayt_241_full_community_discovery_gate.js` chỉ kiểm tra số lượng thẻ/sự hiện diện trường dữ liệu; không kiểm chứng raw payload, thời điểm quan sát, tổng chi phí, điều kiện hay lịch sử giá. Điều này mâu thuẫn với trạng thái containment được ghi tại JAYT-234S (`items: []`, `CONTAINMENT_ACTIVE_AWAITING_AUTHENTIC_FEED_AND_ASSETS`).

**Ruling:** JAYT-241 không được nghiệm thu. Toàn bộ affiliate quyết định mua/chờ, giá, lịch sử giá và deep link hiện tại là `UNPROVEN — DO NOT RELY ON`. Đây không phải là bằng chứng về chất lượng của báo cáo Antigravity.

## 2. Lệnh khẩn cấp: phạm vi cô lập bắt buộc

Trong release hotfix đầu tiên:

1. Gỡ khỏi public UI mọi `NÊN MUA`, `NÊN CHỜ`, giá niêm yết, giá thực trả, “thấp nhất 30 ngày”, phần trăm giảm, price history, affiliate/deep link và claim “đã xác minh” của Tier 4 khi chưa đủ evidence.
2. Tier 4 chỉ được tồn tại như **Radar**: tên nhu cầu, merchant/source, trạng thái `THEO DÕI`, ngày kiểm tra gần nhất hoặc `CHƯA CÓ DỮ LIỆU ĐỐI SOÁT`, và CTA phi thương mại “Xem tiêu chí theo dõi”. Không CTA dẫn sang merchant/affiliate.
3. Không xóa hoặc hạ cấp Tier 1/2/3 chỉ vì sự cố Tier 4. Tiếp tục phát triển discovery UI, intake supply và khảo sát catalog affiliate theo các gate dưới đây.
4. Không tạo link, không đăng ký campaign, không gửi dữ liệu, không dùng secret và không gọi API ghi dữ liệu. Chỉ được khảo sát portal AccessTrade đã đăng nhập theo chế độ read-only khi có phạm vi truy cập phù hợp.

## 3. Hội đồng điều hành bắt buộc — quyết nghị JAYT-242

| Thành viên | Quyết nghị bắt buộc trước khi release |
|---|---|
| Product | Khóa bốn tầng công khai: Deal xác minh; Chương trình/coupon chính thức; Địa điểm xác minh; Radar. Mỗi card phải trả lời được “mức bằng chứng là gì?” và không ép quyết định mua khi chưa đủ dữ liệu. |
| Design | Tier taxonomy luôn nhìn thấy; Radar không dùng xanh/emerald hoặc treatment ngụ ý ưu đãi; asset không được gán “official” nếu provenance chưa độc lập. |
| UX/CX | Giữ hành trình 10 giây và 4 intent, nhưng copy phải phân biệt `Dùng ngay` với `Cần kiểm tra`/`Theo dõi`. Modal giải thích lý do thiếu dữ liệu và cách báo tín hiệu. |
| Growth | Xây nguồn đủ cho 30–50 nội dung/ngày theo mix rõ nguồn: không lấy volume thay cho truth. Ưu tiên cụm Đà Nẵng và need-state thực. |
| Data & Trust | Xây canonical evidence contract, hash raw artifact, capture time, URL, quote/price/terms/scope binding, expiry/recheck và provenance verdict. Gate fail-closed. |
| Engineering | Tách source-of-truth khỏi presentation; áp hotfix Tier 4; feature flag affiliate-off mặc định; version/asset/deploy parity; không tự động promote. |
| QA | Bỏ QA kiểu “field exists”; chạy test bằng browser live + raw artifacts độc lập. Mọi claim live phải trace được đến đúng evidence; thiếu một mảnh là không ship. |

## 4. Milestones và điều kiện hoàn thành

### M0 — P0 hotfix và disclosure (trong 4 giờ làm việc)

- **Deliverable:** Tier 4 thành Radar thuần; disclosure incident công khai, gọn và không nhận lỗi mơ hồ; manifest của các claim bị rút.
- **Pass:** CEO quan sát live không còn giá/price history/buy-wait/deep link; không phát sinh broken CTA hoặc ngụ ý deal.
- **Evidence bắt buộc:** URL production, desktop + mobile screenshot có timestamp, DOM claim scan, deployment commit/hash, danh sách chính xác field/CTA đã rút.

### M1 — Supply operating system (trong 3 ngày làm việc)

- **Deliverable:** Backlog theo nhu cầu và taxonomy cho ít nhất 30–50 nội dung/ngày, phân bổ target theo bốn tier; intake queue; SLA refresh/expiry và owner từng nguồn.
- **Pass:** Mỗi candidate có state machine (`captured → verified → publishable → expired/recheck/quarantined`) và không candidate nào tự lên public vì chỉ đủ số lượng.
- **Evidence bắt buộc:** canonical registry, raw artifacts/hash/timestamp, dashboard coverage by tier/need/district, sample 10 record được QA truy ngược độc lập.

### M2 — UX community daily loop (trong 5 ngày làm việc, song song M1)

- **Deliverable:** bốn journeys rõ tầng chứng cứ, trạng thái empty/radar/expired, flow báo tín hiệu cộng đồng, và microcopy nói thật về tính mới/độ tin cậy.
- **Pass:** 6 persona tasks (sinh viên DUT/DUE; nhân viên Hải Châu/Sơn Trà; người cần deal; người chỉ muốn khám phá địa điểm) hoàn tất không hiểu nhầm Radar là ưu đãi; mobile touch target >=44px; keyboard/screen-reader baseline không regress.
- **Evidence bắt buộc:** test script, video/screenshot hoặc trace browser, kết quả task, accessibility findings và bản sửa.

### M3 — Affiliate catalog evaluation, value-first (trong 7 ngày làm việc; read-only)

- **Deliverable:** đánh giá **toàn catalog AccessTrade có quyền xem**, không chỉ vài brand: mapping merchant → customer need → eligibility → fulfillment/fee/return risk → availability of live price/terms data → commission (secondary).
- **Gate cho một affiliate card có Buy/Wait:** có 1) product/offer URL trực tiếp hợp lệ; 2) giá quan sát thật có timestamp; 3) total payable gồm ship/phí/điều kiện; 4) terms/scope/expiry; 5) history quan sát thật (hoặc hiển thị trung thực “chưa đủ lịch sử”, không có verdict); 6) provenance & disclosure; 7) QA re-fetch/triangulation độc lập.
- **Pass:** Không có card Buy/Wait khi thiếu bất kỳ điều kiện nào. Link chỉ được tạo/kích hoạt sau phê duyệt riêng của CEO; commission không được là rule xếp hạng chính.
- **Evidence bắt buộc:** read-only catalog inventory, scorecard không chứa secret, sample provenance packs, explicit negative list/no-ship list.

### M4 — Go-live candidate review (sau M0–M3)

- **Deliverable:** một Master Executive Release Pack, không phải chuỗi báo cáo rời: Council minutes, delta manifest, raw evidence index, QA live report, known-risk/no-ship register, rollback plan.
- **Pass:** Product, Design, UX/CX, Growth, Data & Trust, Engineering, QA ký quyết nghị riêng; CEO kiểm tra trực tiếp bản live ở desktop và mobile; chỉ CEO mới đưa quyết định `ACCEPTED`.

## 5. Chuẩn evidence và NO-SHIP tuyệt đối

Không ship nếu có bất kỳ điều nào sau đây: dữ liệu tự sinh/placeholder trình bày như fact; asset AI gọi là official; giá không timestamp; price history không phải chuỗi quan sát; điều kiện/địa bàn/hạn dùng không bind vào claim; địa chỉ/số điện thoại/ảnh không có nguồn; affiliate URL được tạo hay dùng khi chưa được phép; “CEO approval”/QA pass tự tuyên bố; evidence chỉ là report của Antigravity.

Mọi evidence pack phải bao gồm raw artifact bất biến, SHA-256 tính lại, URL nguồn, capture time, parser/transform version, quote/claim offsets, reviewer và verdict. Hash/field presence đơn thuần không đủ chứng minh ngữ nghĩa hoặc tính hiện hành.

## 6. Chuẩn bàn giao cho CEO

Antigravity chỉ được báo `READY FOR CEO LIVE REVIEW` khi bàn giao đủ M0–M4 evidence. Không dùng từ `approved`, `verified`, `live-ready`, `100% pass` hoặc `CEO sign-off` để thay cho quyết định của CEO. CEO sẽ kiểm tra trực tiếp production trước nghiệm thu.
