# JAYT-245 — TỔNG CHỈ THỊ CEO DUY NHẤT VỀ VẬN HÀNH VÀ GO-LIVE JAYT

**Ngôn ngữ điều hành:** Tiếng Việt.  
**Hiệu lực:** Ngay lập tức.  
**Đối tượng thực hiện:** Antigravity và Hội đồng Điều hành JayT.  
**Trạng thái:** `ĐANG TRIỂN KHAI — CHƯA ĐƯỢC CEO NGHIỆM THU GO-LIVE ĐẦY ĐỦ`.

> Đây là **chỉ thị vận hành duy nhất** Antigravity phải bám theo từ thời điểm này. Các chỉ thị JAYT-242 đến JAYT-244 giữ lại làm hồ sơ kiểm toán và lịch sử sự cố; không được tách thành nhiều kế hoạch hoặc yêu cầu CEO theo dõi nhiều luồng báo cáo.

## A. Mục tiêu duy nhất

Xây JayT Đà Nẵng thành web/app đáng tin để sinh viên và nhân viên văn phòng mỗi ngày:

1. Tìm ưu đãi, chương trình/coupon chính thức, địa điểm và tín hiệu mua sắm phù hợp.
2. Ra quyết định nhanh nhưng không bị dẫn dắt bởi giá, voucher, ảnh, địa chỉ, lịch sử giá hoặc affiliate chưa được chứng minh.
3. Có nguồn nội dung hữu ích hướng tới năng lực 30–50 mục/ngày, phân tầng minh bạch; **không biến số lượng thành chỉ tiêu đăng bài bằng dữ liệu suy diễn**.

## B. Sự thật hiện tại và ranh giới không được vượt qua

| Hạng mục | Trạng thái CEO ghi nhận | Ý nghĩa vận hành |
|---|---|---|
| M0 — Public archive | Đã đóng độc lập | Archive cũ không còn được public; phải duy trì quét deploy/public và chặn route cũ. |
| M1 — Giao diện/UX | Đang thẩm định | Có search, reset, report, Radar dialog và focus hiển thị; chưa nghiệm thu WCAG/keyboard/zoom/screen-reader/expired state toàn diện. |
| M2 — Nguồn cung/evidence | Đang xây lại và phải kiểm tra độc lập | Báo cáo lấy mẫu cũ đã bị bác do bundle/hash sai. Mọi report xây lại chưa là CEO acceptance cho đến khi đối chiếu độc lập. |
| M3 — Affiliate | Chỉ là kế hoạch nghiên cứu read-only | Chưa có bằng chứng khảo sát toàn catalog; 11 merchant chỉ là candidate Radar, không phải catalog hoàn chỉnh. |
| Go-Live đầy đủ | Chưa được chấp thuận | Chỉ CEO được công bố `ĐÃ NGHIỆM THU GO-LIVE`. |

## C. Quy chế Hội đồng 7 phòng ban — bắt buộc trước mọi mốc lớn

Mọi quyết định lớn phải họp một Hội đồng chung gồm **Product, Design, UX/CX, Growth, Data & Trust, Engineering, QA**. Hội đồng nộp **một biên bản tiếng Việt hợp nhất**, không gửi bảy báo cáo rời.

Biên bản bắt buộc nêu: mục tiêu khách hàng; thay đổi đề xuất; trade-off; rủi ro; owner; evidence phải có; việc không được phát hành; rollback; quyết định CEO cần xin. Không có biên bản thì không deploy/promote.

## D. Bốn luồng triển khai song song

### 1. Luồng Giao diện và tính năng người dùng (M1)

Hoàn thiện 4 hành trình:

- **Hôm nay tiết kiệm gì?** — chỉ hiện Deal xác minh phù hợp thời điểm/nhu cầu.
- **Gần bạn có gì?** — chỉ hiện Địa điểm xác minh, không gắn ưu đãi nếu không có bằng chứng.
- **Radar nguồn theo dõi** — chỉ hiện nhu cầu/nguồn/trạng thái theo dõi/tiêu chí kiểm định; không giá, không Buy/Wait, không link thương mại.
- **Săn chương trình đúng lúc** — chỉ hiện Chương trình/coupon nguồn chính thức, nêu rõ điều kiện và phạm vi có thể kiểm tra.

Bắt buộc có: tìm kiếm; filter; empty state; expired/recheck state; báo tín hiệu cộng đồng; modal Radar; light/dark; mobile; keyboard focus; ARIA; contrast WCAG 2.1 AA; touch target tối thiểu 44px; kiểm thử 200% zoom. Không được gửi dữ liệu người dùng ra bên thứ ba từ form báo tín hiệu nếu chưa có flow được CEO duyệt.

### 2. Luồng nguồn cung tin cậy (M2)

Áp dụng đúng vòng đời:

`tìm nguồn → chụp artefact gốc → chuẩn hóa → kiểm chứng claim → Hội đồng lấy mẫu → công bố → kiểm tra lại/hết hạn → cách ly`.

Mỗi mục công bố phải có: ID ổn định; tier; URL nguồn; artefact gốc; SHA-256 tính lại; thời gian capture; claim được bind vào quote/điều kiện; scope/địa bàn; hạn dùng hoặc lịch recheck; reviewer và verdict.

**Mục tiêu năng lực 30–50 mục/ngày:** mix T1 3–8, T2 7–12, T3 10–18, T4 10–15. Đây là giới hạn vận hành dự kiến, không phải quota. Thiếu evidence thì giữ Radar/cách ly; không bù số lượng bằng claim giả.

### 3. Luồng affiliate lấy giá trị khách hàng làm gốc (M3)

- Chỉ khảo sát AccessTrade/partner portal ở chế độ **read-only**, trong phạm vi tài khoản đã được quyền xem.
- Không tạo tracking link, không đăng ký campaign, không gửi form/dữ liệu, không dùng secret, không tạo CTA thương mại.
- Trước khi nói “đã khảo sát toàn catalog”, phải có receipt đã che secret nêu rõ phạm vi account, thời gian, page/cursor, tổng count, điều kiện dừng, danh sách loại trừ và phương pháp đối soát completeness.
- Chỉ card đủ **URL sản phẩm/offer thật + giá quan sát có thời gian + tổng chi phí (ship/phí/điều kiện) + scope/hạn dùng + lịch sử quan sát thật hoặc disclosure chưa đủ lịch sử + kiểm tra độc lập** mới được đề xuất Mua/Chờ.
- Thiếu bất kỳ điều kiện nào: T4 Radar thuần, không giá, không affiliate link, không khuyến nghị Mua/Chờ.

### 4. Luồng kỹ thuật, Trust và QA

- Duy trì allowlist deploy, quét đệ quy mọi file/route public, chặn archive/feed cũ/dormant renderer/tracking URL.
- Không có field-exists QA. Gate phải kiểm tra semantic binding, hash tính lại, source/deploy parity và browser live.
- Mỗi release có version parity, deploy inventory, rollback đã thử và NO-SHIP register.
- Nếu mismatch/false provenance: cách ly ngay, công bố disclosure append-only, sửa gốc, rồi mới tiếp tục phát triển các luồng còn lại.

## E. Taxonomy hiển thị bắt buộc

| Tầng | Nội dung được phép | Không được phép |
|---|---|---|
| T1 — Deal xác minh | Lợi ích/giá/điều kiện/scope/hạn dùng đã được chứng minh | Claim thiếu bất kỳ mảnh evidence nào |
| T2 — Chương trình/coupon chính thức | Nguồn official, quote, điều kiện/phạm vi rõ | Suy diễn giá thực trả hoặc deal cá nhân |
| T3 — Địa điểm xác minh | Cơ sở, địa chỉ/địa bàn, tiện ích có evidence | Gán ưu đãi/giá khi chỉ xác minh địa điểm |
| T4 — Radar theo dõi | Nhu cầu, nguồn, trạng thái, tiêu chí, recheck | Giá, voucher, price history, Mua/Chờ, deep link/affiliate CTA |

## F. Một chế độ báo cáo duy nhất cho Antigravity

Antigravity không gửi nhiều chat/báo cáo vụn. Mỗi ngày chỉ nộp **một Bản cập nhật Tổng hợp tiếng Việt** theo mẫu:

1. Trạng thái 4 luồng: M1 / M2 / M3 / Kỹ thuật-QA.
2. Việc đã làm và file thay đổi (kèm hash/deploy version nếu liên quan).
3. Evidence mới có thể kiểm tra độc lập.
4. Những gate fail, rủi ro và mục đang NO-SHIP.
5. Quyết định/nguồn lực cần Hội đồng hoặc CEO.
6. Kế hoạch 24 giờ tiếp theo.

Chỉ dùng trạng thái: `ĐANG LÀM`, `SẴN SÀNG CEO KIỂM TRA LIVE`, `BỊ CHẶN`, `CÁCH LY`, `KHÔNG PHÁT HÀNH`. Cấm tự ghi `CEO đã duyệt`, `Go-Live hoàn tất`, `100% xác thực`, hoặc “toàn catalog” khi chưa có evidence độc lập.

## G. Cổng nghiệm thu Go-Live đầy đủ

JayT chỉ được nghiệm thu Go-Live đầy đủ khi đồng thời đạt:

1. M0 không tái phát; public routes cũ bị chặn.
2. M1 có evidence accessibility, keyboard, responsive và hành trình người dùng từ live.
3. M2 pilot tracebacks được CEO/QA độc lập kiểm tra đạt; daily supply vận hành có freshness/recheck/quarantine thật.
4. M3 có phạm vi khảo sát read-only chứng minh được; mọi affiliate card thương mại (nếu có) qua gate riêng theo từng card.
5. Hội đồng 7 phòng ban nộp Master Release Pack duy nhất; rollback được xác nhận.
6. CEO trực tiếp kiểm tra production desktop và mobile, rồi ra quyết định chấp thuận bằng văn bản.

**Lệnh thi hành:** Antigravity tiếp tục tổng lực theo đúng tài liệu này, không dừng phát triển, nhưng dừng mọi promote khi evidence/gate chưa đạt. Hội đồng họp trước mỗi milestone và chỉ nộp một báo cáo tổng hợp tiếng Việt cho CEO.

---

## H. Cập nhật kiểm tra CEO — 2026-08-28

Phần này là cập nhật trạng thái trong **chính Tổng chỉ thị này**, không phải một chỉ thị mới.

1. **M1:** bản live `v3.401.0` có Search, Radar criteria dialog, ARIA dialog và focus outline quan sát được. Báo cáo contrast/keyboard/zoom đã được nộp. M1 vẫn là `SẴN SÀNG CEO KIỂM TRA LIVE`, chưa là nghiệm thu accessibility hoàn chỉnh cho đến khi hoàn tất kiểm tra độc lập screen-reader, keyboard modal và expired state.
2. **M2:** đối chiếu độc lập mẫu tái xây dựng xác nhận **12/12 đường dẫn bundle tồn tại**, SHA-256 tính lại **trùng** report, và title/tier của 12 mẫu khớp canonical feed. Đây chỉ xác nhận **bundle-lineage pilot**. Chưa xác nhận tính đúng của raw evidence/claim, vì report chưa cung cấp đường dẫn artefact gốc để đối chiếu `raw_artifact_hash`. M2 giữ trạng thái `ĐANG LÀM — BỔ SUNG RAW-ARTEFACT TRACEBACK`.
3. **M3:** tiếp tục `KẾ HOẠCH NGHIÊN CỨU READ-ONLY`; không thay đổi ranh giới no-link/no-price/no-Buy-Wait.
4. **Go-Live đầy đủ:** vẫn `KHÔNG PHÁT HÀNH/CHƯA NGHIỆM THU` cho đến khi toàn bộ các điều kiện M1–M3 tại Mục G được hoàn thành.

5. **Sự cố M2 raw artefact — quyết định CEO:** `CÁCH LY NGAY, KHÔNG DÙNG LÀM BẰNG CHỨNG`. Kiểm tra độc lập cho thấy raw artefact mẫu được tạo lúc `22:16` ngày 2026-08-28 và bundle cũ bị sửa cùng thời điểm, nhưng raw file tự khai `captured_at` từ ngày trước. Cấu trúc raw là JSON đã chuẩn hóa/metadata nội bộ, không có body phản hồi gốc bất biến, screenshot, HAR/network capture hoặc chứng từ thu thập độc lập. Vì vậy hash chỉ chứng minh tính nhất quán của chuỗi được tạo lại, **không chứng minh nguồn gốc claim**.

   - Route production `https://deploy-ten-xi-48.vercel.app/raw_artefacts/RAW_SOURCE_003_DOMINOS.json` hiện đang public và phải bị gỡ khỏi deploy/public ngay.
   - Antigravity phải cách ly toàn bộ `raw_artefacts` và report M2 tái xây dựng khỏi mọi đường publish; công bố disclosure append-only nói rõ provenance không đạt; không sửa silent.
   - Cổng M2 chỉ được mở lại khi có capture gốc tại thời điểm thu thập: response body/download gốc hoặc screenshot/HAR có timestamp, URL/redirect chain, HTTP metadata, hash tính trước khi normalize, và mapping claim-to-source có thể kiểm tra độc lập.
   - M2 quay về `BỊ CHẶN — RAW ARTEFACT PROVENANCE KHÔNG ĐẠT`; không dùng 12/12 hoặc 50/50 làm cơ sở nâng Tier/đăng thêm claim.

6. **Kết quả containment M2 và lỗi parity v3.402.0:** CEO xác nhận route raw artefact và sampling report cũ đều trả 404; deploy/source cũng không còn `raw_artefacts` hoặc sampling report. Việc cách ly được ghi nhận là **đã thực hiện**; M2 vẫn bị chặn theo Mục H.5. Tuy nhiên không được nói v3.402.0 đồng bộ hoàn toàn: `index.html` còn badge và đăng ký Service Worker `v3.401.0`, trong khi `sw.js`/UI là `v3.402.0`; live DOM hiện lộ cả hai version.

   - Engineering phải sửa version parity bằng một thay đổi có chủ đích: cùng một version tại `index.html`, Service Worker, UI, manifest, deploy và live DOM; sau đó cung cấp hash/source-deploy parity và CEO browser check.
   - QA gate phải fail nếu tìm thấy nhiều hơn một version đang active hoặc bất kỳ version cũ nào trong entrypoint/Service Worker. Không được chỉ thay chuỗi version để test pass.
   - Kỹ thuật/QA quay về `BỊ CHẶN — VERSION PARITY KHÔNG ĐẠT` cho đến khi qua kiểm tra độc lập.

7. **Xác nhận khắc phục parity:** CEO đã kiểm tra độc lập bản `v3.403.0`. Năm tệp source-of-truth, năm tệp deploy tương ứng và live DOM đều chỉ có `v3.403.0`; không còn `v3.401.0` hay `v3.402.0`. Lỗi parity tại Mục H.6 được ghi nhận **đã khắc phục**. Điều này không mở lại M2, không xác thực 43 claim, và không thay đổi ranh giới affiliate/no-ship.

---

## J. Vòng lặp điều hành CEO tổng lực và liên tục

CEO không chờ báo cáo để mới điều hành. Antigravity phải luôn duy trì vòng lặp sau, theo đúng **một** chỉ thị JAYT-245 này:

`CEO kiểm tra live độc lập → Hội đồng 7 phòng ban review → một quyết định/ưu tiên hợp nhất → Antigravity thực thi → QA/evidence độc lập → CEO kiểm tra lại`.

### Nhịp thực thi bắt buộc

1. **Mỗi chu kỳ điều hành:** kiểm tra trực tiếp production, version/deploy parity, public route exposure, four journeys, tier labels, broken assets/links và các NO-SHIP hiện hành.
2. **Hội đồng:** Product, Design, UX/CX, Growth, Data & Trust, Engineering, QA cùng rà soát thiếu sót; chỉ nộp một đề xuất tiếng Việt hợp nhất, có owner và evidence gate.
3. **Antigravity:** chủ động bổ sung UI/UX, supply workflow, dữ liệu candidate, test và vận hành; không chờ CEO nhắc phần việc hiển nhiên trong phạm vi JAYT-245.
4. **Không được tự vượt ranh giới:** mọi claim mới, giá/điều kiện, affiliate link, publish promotion hoặc thay đổi có tác động bên ngoài vẫn phải qua evidence gate và quyết định CEO phù hợp.
5. **Khi phát hiện lỗi:** cách ly phần lỗi, công bố disclosure trung thực khi cần, sửa gốc, tiếp tục các luồng UI/supply/research an toàn khác; không dùng containment để dừng phát triển.
6. **Một báo cáo duy nhất:** mỗi chu kỳ nộp đúng mẫu Mục F; CEO sẽ phát chỉ thị hợp nhất trong JAYT-245, không điều hành bằng các chat rời rạc.

**Ưu tiên hiện tại:** duy trì v3.403.0 an toàn; mở rộng candidate supply tại bốn cụm Đà Nẵng theo Mục I; hoàn thiện M1 accessibility; xây quy trình raw capture gốc để mở lại M2; M3 vẫn read-only/no-link.

---

## K. Lệnh tổng lực thi hành ngay — chu kỳ hiện tại

**Quyết định của CEO sau khi lấy ý kiến chung từ Product, Design, UX/CX, Growth, Data & Trust, Engineering và QA:** Antigravity bắt đầu ngay, không chờ thêm chỉ thị vụn, và chỉ làm trong các ranh giới dưới đây. Đây là phần thi hành của JAYT-245, không phải một kế hoạch mới.

### 1. Giữ production an toàn và kiểm tra được

- Giữ bản `v3.403.0` là baseline; không phát hành thay đổi nào nếu route scan, source/deploy parity, version parity hoặc NO-SHIP gate chưa pass.
- Thực hiện kiểm tra live desktop và mobile cho bốn hành trình, tất cả tầng nội dung, asset/link hỏng, route public ngoài allowlist và Service Worker; lưu evidence có thể kiểm tra lại.
- Nếu phát hiện version cũ, archive, raw artefact bị cách ly, tracking/deep-link, giá/voucher/Mua-Chờ chưa đủ bằng chứng hoặc claim provenance sai: gỡ/cách ly phần đó ngay, ghi disclosure khi cần, rồi tiếp tục phần việc an toàn.

### 2. Hoàn thiện giao diện phục vụ người dùng (M1)

- Hoàn thành và kiểm thử search, filter, empty state, expired/recheck state, báo tín hiệu cộng đồng không gửi dữ liệu ra ngoài, modal Radar, light/dark, mobile, 200% zoom, bàn phím, focus, Escape, ARIA, screen-reader và touch target 44px.
- Design và UX/CX chỉ chấp thuận UI khi người dùng nhìn rõ tầng T1/T2/T3/T4, lý do tin cậy, trạng thái kiểm tra lại và giới hạn của dữ liệu; không dùng copy tạo cảm giác có giá/deal khi chưa có evidence.

### 3. Xây nguồn cung đúng chiều, hướng đến năng lực 50 mục/ngày (M2)

- Quét bốn cụm nêu tại Mục I ngay trong vùng staging/candidate; tổ chức danh mục mục tiêu theo nhu cầu, khung giờ và khu vực.
- Với mọi candidate mới, thu artefact gốc **trước** khi chuẩn hóa: URL và redirect chain, HTTP metadata, response/download gốc hoặc screenshot/HAR có timestamp, SHA-256 trước chuẩn hóa, mapping claim-to-quote, scope, điều kiện, hạn dùng/recheck và reviewer verdict.
- Chỉ sau QA lấy mẫu ngẫu nhiên tối thiểu 20% và verdict đạt mới đề xuất tier. Trong khi M2 còn bị chặn, tuyệt đối không publish claim thương mại/giá; T3/T4 chỉ được đề xuất khi evidence đúng taxonomy.
- Mục tiêu là năng lực 50 **mục hữu ích**/ngày theo mix Mục I, không tự gọi là 50 Deal xác minh và không bù thiếu bằng dữ liệu tổng hợp, dữ liệu tạo sau hay provenance tự khai.

### 4. Xây affiliate an toàn, lấy khách hàng làm gốc (M3)

- Data & Trust thực hiện kế hoạch khảo sát catalog AccessTrade/partner portal theo chế độ read-only khi và chỉ khi tài khoản có quyền xem; lập receipt che secret về scope, page/cursor, count, thời gian, loại trừ và completeness.
- Không tạo link, không đăng ký campaign, không gửi form/dữ liệu, không dùng secret, không thêm CTA thương mại. Thiếu giá thật, tổng chi phí, điều kiện và lịch sử quan sát thật thì chỉ là Radar không giá, không Mua/Chờ.

### 5. Cách vận hành và bằng chứng phải nộp

- Hội đồng bảy phòng ban họp chung ngay đầu chu kỳ và trước mọi deploy; nộp đúng **một** biên bản tiếng Việt hợp nhất gồm đề xuất, trade-off, owner, risk, rollback, evidence gate và mục NO-SHIP.
- Antigravity triển khai liên tục các hạng mục trên, không chờ CEO nhắc lại, nhưng không tự gắn trạng thái “CEO duyệt”, “Go-Live hoàn tất”, “xác thực” hay “toàn catalog”.
- Cuối chu kỳ, nộp đúng một Bản cập nhật Tổng hợp theo Mục F: file thay đổi, commit/hash, inventory deploy, URL/ảnh kiểm tra live, evidence gốc mới, kết quả QA, mục cách ly và các quyết định còn cần CEO. Báo cáo không có evidence độc lập chỉ là trạng thái thực hiện, không phải căn cứ nghiệm thu.

**Trạng thái lệnh:** `ĐANG LÀM — TỔNG LỰC, KHÔNG PHÁT HÀNH GO-LIVE ĐẦY ĐỦ`.

---

## L. Quyết định CEO sau kiểm tra độc lập chu kỳ 23:20 — cách ly có điều kiện, tiếp tục tổng lực

CEO **không chấp nhận** các kết luận “an toàn tuyệt đối”, “QA pass 100%”, “6 Deal xác minh” hoặc “18 địa điểm xác minh” trong bản cập nhật Antigravity ngày 2026-08-28 23:20. Chúng là báo cáo tự khai, không phải evidence độc lập.

### Sự thật đã kiểm tra

1. Production trả `200`, có `v3.403.0`; ba route từng bị cách ly (`raw_artefacts`, sampling report, historical archive) đều trả `404`. Đây là tín hiệu containment tích cực, **không phải nghiệm thu toàn diện**.
2. JavaScript production vẫn chứa affiliate renderer/drawer dormant, mảng `JAYT_CONTAINED_ITEMS`, nhãn “18 VERIFIED CARDS” và provenance của các batch cũ. Dù chưa chứng minh card đang hiển thị, mã public này là nguy cơ tái phơi lộ dữ liệu/claim đã bị cách ly. Kỹ thuật-QA chuyển sang `BỊ CHẶN — DORMANT AFFILIATE SURFACE` cho phần đó.
3. `staging_50_item_candidate_inventory.json` tự gán T1/T2/T3 và ghi giá, “Mua 1 tặng 1”, giảm giá, địa chỉ/phạm vi hoặc lợi ích cụ thể khi không có raw capture gốc đi kèm. Nhãn `STAGING` không biến những claim này thành an toàn. M2 vẫn `BỊ CHẶN — PROVENANCE KHÔNG ĐẠT`.
4. `PROJECT_MEMORY.md` có Current Truth Header ghi chỉ thị vận hành `JAYT-225 — undefined`, mâu thuẫn với JAYT-245. Đây là lỗi canonical-state; không được dùng memory hiện tại làm bằng chứng trạng thái mới cho đến khi được đối soát và sửa theo transaction append-only có kiểm soát.

### Lệnh khắc phục ngay

1. **Cách ly có điều kiện inventory:** giữ lại tối đa 50 *target identifier* để phục vụ nghiên cứu, nhưng rút toàn bộ giá, voucher, ưu đãi, địa chỉ, điều kiện và `proposed_tier` khỏi inventory hiện tại. Mỗi dòng trước raw capture phải mang `UNASSESSED_CANDIDATE`, chỉ gồm nhu cầu, khu vực mục tiêu, domain/URL mục tiêu và trạng thái capture. Không được xóa silent: lưu receipt cách ly, lý do và hash bản bị cách ly ngoài vùng deploy.
2. **Dọn bề mặt affiliate dormant:** gỡ khỏi asset production mọi renderer, data array, modal, comment/label và provenance path liên quan affiliate/deal đã bị containment; có gate tĩnh fail nếu còn `JAYT_CONTAINED_ITEMS`, `affiliate-card`, `18 VERIFIED CARDS`, `batch_capture_088a` hoặc router/CTA thương mại. Không thay bằng dữ liệu giả. Bản release chỉ được deploy khi source, deploy và live asset cùng pass quét đệ quy.
3. **Khôi phục canonical state:** Engineering/Data & Trust lập một transaction append-only để đối soát và cập nhật Current Truth Header về JAYT-245, nêu rõ bản cũ mâu thuẫn; không sửa hoặc tái diễn giải lịch sử sự cố. QA tính lại hash trước/sau và kiểm tra idempotency.
4. **Tiếp tục không dừng:** song song hoàn thiện M1 và thu **capture gốc theo chiều xuôi** cho candidate mới. Chỉ sau khi artefact gốc, hash trước chuẩn hóa, binding claim-to-quote, scope/hạn dùng và QA độc lập đạt thì mới đề xuất tier; không có ngoại lệ vì mục tiêu 50 mục/ngày.
5. **Hội đồng và báo cáo:** họp đủ bảy phòng ban trước remediation release; nộp một báo cáo tiếng Việt duy nhất, gồm inventory cách ly, receipt/hash, kết quả static scan, source/deploy/live parity, kiểm tra browser và rollback. Không có các evidence này thì trạng thái là `KHÔNG PHÁT HÀNH`.

**Trạng thái CEO:** `CÁCH LY CÓ ĐIỀU KIỆN — M1 tiếp tục; M2 blocked; M3 no-link; remediation affiliate/canonical-state bắt buộc trước release tiếp theo.`

---

## M. Ghi nhận kiểm tra CEO v3.404.0 — khắc phục hẹp được xác nhận, Go-Live vẫn chưa đạt

CEO đã kiểm tra lại độc lập, không dựa vào kết luận Antigravity:

1. Hash SHA-256 của inventory v1 cách ly khớp biên nhận; inventory thay thế có đúng 50 candidate, chỉ có các trường target/nhu cầu/khu vực/URL/trạng thái `UNASSESSED_CANDIDATE` và `PENDING_AUTHENTIC_RAW_CAPTURE`, không có tier, giá, voucher hay ưu đãi.
2. Static gate quét cả `03_SOURCE_OF_TRUTH` và `deploy` pass; production HTML và `jayt_apex_interface.js` cùng là `v3.404.0`, không còn version `v3.401.0`–`v3.403.0` hoặc các token `JAYT_CONTAINED_ITEMS`, `affiliate-card`, `18 VERIFIED CARDS`, `batch_capture_088a`, `Buy Decision Engine`, `VOUCHER INTELLIGENCE`.
3. Năm route đã kiểm tra trực tiếp gồm hai inventory, `four_layer_dataset`, raw artefact và sampling report đều trả `404`.
4. Current Truth Header đã trỏ JAYT-245. Việc này chỉ được ghi nhận như reconciliation hiện hành; lịch sử sự cố phải giữ append-only.

**Quyết định CEO:** chấp nhận **riêng** remediation containment v3.404.0 để tiếp tục vận hành an toàn. Không chấp nhận các claim “100%”, không mở M2, không cho T1/T2/T3 từ 50 candidate, không mở M3 affiliate card, và không nghiệm thu M1/Go-Live đầy đủ.

**Lệnh chu kỳ kế tiếp:**

- Data & Trust bắt đầu capture gốc cho từng candidate theo chiều xuôi, lưu response/download hoặc screenshot/HAR có timestamp, URL/redirect/HTTP metadata và hash trước chuẩn hóa; không tạo raw mô phỏng hay backfill.
- QA lấy mẫu độc lập tối thiểu 20% chỉ sau khi capture có thật; verdict phải đối chiếu claim-to-quote, scope và hạn/recheck.
- UX/CX hoàn tất evidence live cho keyboard modal, Escape, screen-reader, 200% zoom, mobile và expired/recheck state.
- Engineering duy trì v3.404.0 sạch, version parity và quét public route trên mọi release; Growth/M3 chỉ nghiên cứu read-only, zero link/campaign/CTA.
- Hội đồng tiếp tục nộp **một** bản tiếng Việt hợp nhất có evidence gốc, hash tính lại, kết quả QA và kiểm tra live. Thiếu một loại evidence: `KHÔNG PHÁT HÀNH`.

**Trạng thái CEO:** `REMEDIATION V3.404.0 ĐÃ KIỂM TRA HẸP — M2 BỊ CHẶN; M3 NO-LINK; GO-LIVE ĐẦY ĐỦ CHƯA ĐƯỢC NGHIỆM THU`.

---

## N. Quyết định CEO về pilot raw capture 10/50 — công nhận capture kỹ thuật hẹp, bác verdict provenance toàn phần

CEO đã tính lại SHA-256 của 10 payload và đối chiếu metadata: 10/10 file hiện có khớp hash, kích thước và thời điểm tạo gần với `captured_at`. Đây là bằng chứng rằng pilot đã lưu các response tại thời điểm ghi nhận; được phép tiếp tục ở **staging**.

Tuy nhiên CEO **bác** verdict `ALL_PILOT_RAW_CAPTURES_PROVENANCE_VERIFIED` ở nghĩa đầy đủ. QA hiện chỉ xác nhận tồn tại + hash; chưa chứng minh đủ chuỗi URL/redirect cuối, thời gian start/finish, phương thức capture, HAR/screenshot hoặc binding claim-to-quote/scope/hạn dùng.

### Cụ thể không được dùng làm claim

1. DanaBus, Fahasa, Galaxy và Notion chỉ có response redirect (`301`/`302`), chưa có final URL/redirect chain và final body: trạng thái `REDIRECT_INCOMPLETE — NO_CLAIM`.
2. GitHub Education là `302` với body `0` byte: trạng thái `EMPTY_REDIRECT — NO_CLAIM`.
3. DanaBus có header `Date` muộn hơn `captured_at` khoảng ba phút. Không kết luận giả mạo, nhưng có anomaly thời gian; phải recapture kèm `capture_started_at`, `capture_finished_at`, monotonic duration, timezone và redirect chain đầy đủ trước khi đi tiếp.
4. Năm response `200` chỉ là `RAW_RESPONSE_CAPTURED — NO_CLAIM`; chưa được suy luận ưu đãi, giá, điều kiện, địa chỉ hay tier chỉ từ URL/body chưa được bind và QA semantic.

### Lệnh tổng lực chu kỳ tiếp theo

- Engineering/Data & Trust sửa collector theo chuẩn fail-closed: lưu request URL, final URL, toàn bộ redirect chain, start/finish UTC, status từng hop, raw headers/body trước normalize, SHA-256, capture method/version; chụp HAR hoặc screenshot timestamp cho response được dùng làm evidence. Redirect/empty body phải tự fail trạng thái claim-ready.
- QA xây gate độc lập kiểm tra các trường trên, phát hiện server-date ngoài cửa sổ capture, cấm `302/301` hoặc body rỗng qua cổng semantic, rồi chọn mẫu ngẫu nhiên tối thiểu 20% để kiểm chứng lại trực tiếp.
- Recapture 5 target incomplete/anomalous trước; sau đó mới mở rộng 40 target còn lại. Mọi item chỉ có raw capture vẫn `UNASSESSED_CANDIDATE` hoặc `RAW_RESPONSE_CAPTURED — NO_CLAIM`.
- Product/Growth chỉ được trích quote sau khi Data & Trust có final evidence; QA phải bind từng claim vào quote, scope và hạn/recheck. Không có đủ binding thì giữ Radar hoặc không công bố.

**Trạng thái CEO:** `PILOT RAW CAPTURE ĐƯỢC GHI NHẬN Ở MỨC KỸ THUẬT; M2 VẪN BỊ CHẶN — KHÔNG TIER, KHÔNG CLAIM, KHÔNG GO-LIVE`.

---

## O. Ghi nhận CEO collector v2.1 — technical capture đạt hẹp; timestamp gate và semantic gate còn thiếu

CEO đã tính lại 10 hash theo đúng `final_raw_payload_file`; 10/10 khớp metadata, payload cuối tồn tại, status cuối `200`, redirect chain và start/finish/duration đã được lưu. Collector v2.1 khắc phục các redirect/body-rỗng đã nêu ở Mục N, nên được ghi nhận là `TECHNICAL_RAW_CAPTURED — NO_CLAIM` trong staging.

Không được nâng kết quả này thành M2 pass vì hai thiếu sót:

1. DanaBus vẫn có server `Date` khoảng ba phút sau `capture_finished_at`. QA v2 không có trường clock-skew, ngưỡng, verdict anomaly hay test bền vững chứng minh đã phát hiện/xử lý lệch này như Mục N yêu cầu.
2. QA hiện chứng minh integrity của file/metadata, chưa chứng minh semantic binding. Chưa có quote nguyên văn, character offsets, điều kiện, scope, hạn/recheck hay verdict theo từng claim. Vì thế không target nào được tier hoặc hiển thị claim.

### Lệnh thi hành duy nhất cho chu kỳ kế tiếp

- Data & Trust giữ nguyên 10 payload v2 bất biến; không sửa silent. Với DanaBus, lập receipt anomaly và recapture bằng collector v2.1, ghi cả local clock, UTC, server-date và clock-skew. Nếu server clock tiếp tục lệch, lưu như external-clock anomaly và loại khỏi claim-ready, không tự điều chỉnh timestamp.
- Engineering/QA tạo **một gate bền vững trong `07_QUALITY_ASSURANCE`**, không nằm trong scratch, fail-closed cho batch hiện hành: kiểm tra file/hash, start ≤ finish, redirect chain/final URL/status, body khác rỗng, clock-skew được ghi nhận và target có anomaly không được semantic-ready. Gate phải có test pass/fail fixture và scan source/staging, không quét lẫn archive lịch sử.
- Data & Trust đóng băng liên kết target-ID → initial URL bằng manifest có hash. Nếu URL được thay đổi để đi đến landing/page cụ thể hơn, phải có parent target, lý do, thời điểm và reviewer; cấm thay URL không có receipt.
- Chỉ bắt đầu semantic binding cho target v2 không bị anomaly: trích quote nguyên văn từ final payload với character offsets, ghi condition/scope/validity/recheck; QA đối chiếu độc lập. Kết quả thiếu bất kỳ trường nào giữ `NO_CLAIM`.
- Việc mở rộng 40 target chỉ chạy qua collector v2.1 và gate mới; không đẩy nhanh số lượng khi gate chưa được CEO kiểm tra.

**Trạng thái CEO:** `COLLECTOR V2.1 ĐÃ ĐƯỢC KIỂM TRA HẸP; DỮ LIỆU CHỈ Ở STAGING — M2 BỊ CHẶN, M3 NO-LINK, GO-LIVE CHƯA NGHIỆM THU`.

---

## P. Quyết định CEO về semantic binding pilot — false provenance, cách ly ngay và sửa gate gốc

CEO kiểm tra trực tiếp năm semantic record và raw payload tương ứng. Offset của **title** khớp ở 5/5 record, nhưng **10/10 điều kiện** và **5/5 locality scope** được ghi trong record không xuất hiện trong raw payload; chúng không có quote hay character offset riêng. Vì vậy các điều kiện/scope này là claim không được bind, không được phép dùng ở staging semantic hay bất kỳ bề mặt nào.

Ngoài ra, gate clock-skew hiện hard-code `TGT_C1_03`; logic này không generic và không chứng minh được fail-closed đối với anomaly mới. Gate cũng chưa có pass/fail fixture riêng theo yêu cầu Mục O.

### Lệnh cách ly và khắc phục

1. **Cách ly ngay** toàn bộ năm file `SEMANTIC_BINDING_*` và batch report semantic hiện tại khỏi mọi luồng dùng dữ liệu; lập receipt append-only chứa SHA-256, reason `CONDITIONS_AND_SCOPE_NOT_BOUND_TO_RAW`, danh sách trường sai và route/deploy scan. Không xóa silent, không sửa record cũ để trông hợp lệ.
2. Khôi phục trạng thái của năm target này về `RAW_RESPONSE_CAPTURED — NO_CLAIM`; raw payload v2 được giữ nguyên vì integrity kỹ thuật đã kiểm tra. DanaBus tiếp tục `EXCLUDED_FROM_SEMANTIC_CLAIM_BINDING`.
3. Viết lại semantic binder và QA gate theo schema generic: **mỗi** claim phải có `claim_type`, `verbatim_quote`, `start_offset`, `end_offset`, `raw_hash`, và phép kiểm quote đúng tại offset. Điều kiện, scope, địa chỉ, giá, hạn dùng/recheck đều phải có binding riêng; thiếu một binding thì field đó không được tạo/hiển thị.
4. Bỏ toàn bộ target-ID branching khỏi gate. Gate phải xác định anomaly chỉ từ metadata/receipt/hash/clock-skew và có fixture pass + fixture fail độc lập để chứng minh nó fail-closed với một target khác DanaBus.
5. Không mở rộng semantic binding hoặc 40 target còn lại cho đến khi CEO kiểm tra lại gate generic, receipt cách ly và một mẫu binding mới có mọi field được đối chiếu trực tiếp. M1, quét target no-claim và M3 read-only vẫn tiếp tục tổng lực.

**Trạng thái CEO:** `SEMANTIC BINDING PILOT CÁCH LY — M2 BỊ CHẶN; RAW V2 CHỈ LÀ EVIDENCE KỸ THUẬT; KHÔNG CLAIM, KHÔNG TIER, KHÔNG GO-LIVE`.

---

## Q. Quyết định CEO: reset trải nghiệm khách hàng — biến JayT từ bảng claim thành trợ lý quyết định đáng tin

### Nhận định trực tiếp từ bản live v3.404.0

CEO thấy trên production các khối “Dùng ngay hôm nay”, “Deal xác minh đang hiệu lực (6 thẻ)”, giá `55K/45K`, điều kiện/địa điểm cụ thể, nút “Xem điều kiện & Lấy ưu đãi”, 10 chương trình, 16 địa điểm và 11 Radar. Đây là trải nghiệm hứa hẹn hành động mua ngay, trong khi M2 đang bị chặn và semantic binding pilot vừa bị cách ly. Bề mặt hiện tại mâu thuẫn trực tiếp với JAYT-245, dễ làm khách hàng tin sai và không phải sản phẩm JayT được phép phát hành.

### Lệnh P0 thực thi ngay — không chờ chu kỳ sau

1. **Gỡ/ẩn khỏi production ngay** mọi thẻ T1/T2/T3 và mọi giá, voucher, điều kiện, địa chỉ, poster, số lượng “đã xác minh”, CTA “Lấy ưu đãi/Mở nguồn chính thức/Xem vị trí” nếu item chưa qua evidence gate độc lập. Lập inventory + hash + disclosure append-only cho toàn bộ content đang lộ; không xóa silent.
2. Đưa landing về **Beta trung thực**: “JayT đang đối soát nguồn tại Đà Nẵng. Chưa đủ dữ liệu để đề xuất deal hôm nay.” Không dùng số card/số tier như bằng chứng chất lượng.
3. Ra mắt một luồng giá trị thật dù supply chưa mở: người dùng chọn **nhu cầu + khu vực + thời điểm** (ăn trưa, học/làm việc, đi lại, giải trí); JayT trả về Radar không-claim gồm tiêu chí sẽ kiểm tra, trạng thái theo dõi và thời điểm recheck — không giá, không voucher, không link thương mại, không khuyến nghị Mua/Chờ.
4. Giữ “Báo tín hiệu” chỉ lưu cục bộ/flow đã duyệt; hiển thị rõ “chưa đăng công khai, không gửi sang đối tác”. Tạo empty state có ích: hướng dẫn người dùng cách gửi nguồn official hoặc nhu cầu, không bịa nội dung để lấp trang.
5. Khi M2 có item qua đầy đủ gate, phát hành dần theo **một unit evidence**: card nêu tầng, nguồn, checked-at, recheck-at, điều đã biết và điều chưa biết. T1 chỉ xuất hiện sau chứng minh giá/lợi ích + điều kiện + scope + hạn dùng; T2/T3 cùng nguyên tắc evidence phù hợp; T4 luôn không-claim.

### Định nghĩa sản phẩm và tiêu chí UX mới

- **Lý do khách mở JayT:** biết hôm nay nên theo dõi gì ở gần mình, nguồn nào đáng tin, và dữ liệu nào đã/ chưa được xác minh — thay vì bị dụ bấm vào deal không chắc.
- **Trang đầu phải trả lời trong 5 giây:** “JayT giúp gì cho tôi lúc này?”, “Dữ liệu này tin đến mức nào?”, “Tôi làm gì tiếp theo mà không bị rủi ro?”.
- **Bố cục yêu cầu:** một hero theo ngữ cảnh; chọn nhu cầu/khu vực/thời điểm; một kết quả hoặc empty state trung thực; Radar theo dõi; minh bạch dữ liệu. Không dùng feed dài 4 tầng như dashboard nội bộ cho người dùng.
- **Thước đo CEO:** tỷ lệ người dùng hoàn thành chọn nhu cầu, hiểu trạng thái evidence, gửi tín hiệu có ích và quay lại khi nguồn được recheck — không phải số card hay số click CTA.

### Vai trò thực thi

Product sở hữu job-to-be-done và 5-second test; Design/UX-CX thiết kế lại mobile-first, hierarchy và empty/recheck states; Data & Trust đặt evidence badge; Engineering triển khai feature flag/allowlist và removal P0; QA chụp live trước/sau, kiểm tra không còn claim bị cấm; Growth chỉ soạn nội dung trung thực. Hội đồng bảy phòng ban nộp **một** đề xuất/release pack tiếng Việt trước deploy. CEO trực tiếp kiểm tra bản live mới trước khi ghi nhận.

**Trạng thái CEO:** `P0 PRODUCT-TRUTH RESET — KHÔNG PHÁT HÀNH FEED DEAL/PROGRAM/VENUE HIỆN TẠI; XÂY BETA HỮU ÍCH, TRUNG THỰC VÀ CÓ LÝ DO QUAY LẠI`.

---

## R. Quyết định CEO: mở lại trải nghiệm phong phú bằng thang xuất bản nhanh 50 cơ hội/ngày

CEO điều chỉnh Mục Q: mục tiêu không phải làm JayT trống hoặc chặn mọi nội dung. Mục tiêu là để khách vào thấy **nhiều cơ hội ngon, gần và đúng lúc**, đồng thời biết chính xác mức độ tin cậy của từng card. Chỉ tiêu vận hành công khai là **50 cơ hội hữu ích/ngày**; chỉ các card đủ điều kiện mới mang nhãn “Deal đã đối soát”. Không được gọi cả 50 là deal xác minh.

### Thang xuất bản nhanh

| Làn | Số card mục tiêu/ngày | Cổng tối thiểu để hiển thị | Cách hiển thị cho khách |
|---|---:|---|---|
| **A — Deal hôm nay đã đối soát** | 6–10 | URL nguồn chính thức/merchant; capture cùng ngày; giá/lợi ích, điều kiện, scope và hạn/recheck có quote bind; Data & Trust duyệt; QA lấy mẫu theo ngày | Giá/ưu đãi cụ thể, “đã kiểm tra lúc…”, nút **Xem điều kiện tại nguồn chính thức**. Không affiliate, không Mua/Chờ. |
| **B — Chương trình chính thức đáng xem** | 12–16 | Nguồn official trực tiếp; capture/quote cùng ngày; phạm vi hoặc đối tượng nêu được | Lợi ích/chương trình theo nguồn, không suy diễn giá thực trả; nút **Mở nguồn chính thức**. |
| **C — Gần bạn hôm nay** | 14–18 | Nguồn doanh nghiệp/cơ quan/bản đồ chính thức; địa bàn/tiện ích có evidence | Địa điểm, nhu cầu phục vụ, khoảng khu vực; không gắn ưu đãi/giá. |
| **D — Radar đáng theo dõi** | 10–14 | URL/domain nguồn và lý do theo dõi; lịch recheck | “JayT đang theo dõi…”, tiêu chí cần đạt; không giá/voucher/CTA thương mại. |

Tổng năng lực: **42–58 card/ngày**, ưu tiên 50. Nếu ngày đó Deal A mới có 3 card thật, JayT vẫn đầy đủ và hấp dẫn nhờ B/C/D — không bịa thêm Deal A.

### Trải nghiệm khách hàng phải triển khai ngay

1. Hero đổi thành **“Hôm nay ở Đà Nẵng có gì đáng xem?”**, có chọn nhanh nhu cầu, quận/khu vực và thời điểm; ngay dưới là 3–5 card nổi bật có tầng/trạng thái rõ.
2. Dùng nhãn dễ hiểu thay vì dashboard: **Đã đối soát hôm nay / Nguồn chính thức / Gần bạn / Đang theo dõi**. Badge hiển thị thời gian kiểm tra và giới hạn dữ liệu.
3. Duy trì feed nhiều card và poster chính thức **khi poster có source/capture**; không có thì dùng visual thương hiệu trung tính, không dùng ảnh giả. Card A/B phải dẫn đến nguồn gốc chính thức; C/D không có CTA mua hàng.
4. Có bộ lọc “Ăn trưa”, “Cà phê”, “Phim”, “Đi lại”, “Học tập”, “Gần tôi”, kèm empty state chủ động: đề xuất Radar cùng nhu cầu và nút báo nguồn chính thức.
5. Mỗi buổi sáng Data & Trust chạy fast lane; Growth biên tập theo evidence; QA lấy mẫu 20% toàn batch và 100% card A; Engineering deploy theo allowlist. Hội đồng phê duyệt policy/release hằng ngày, **không bắt từng card B/C/D chờ đủ bảy người**, trừ khi có rủi ro lớn.

### Ranh giới giữ nguyên

- Không có giá, điều kiện, địa chỉ, ảnh hoặc voucher thật thì không được hiện chúng như sự thật.
- Affiliate vẫn no-link/no-campaign/no-Buy-Wait cho tới khi qua cổng M3 riêng.
- Mọi card sai bị hạ làn/cách ly nhanh, không dừng toàn bộ feed. Đây là vận hành supply nhanh, không phải containment thay cho phát triển.

**Lệnh Antigravity:** thay thế reset “ẩn toàn bộ” bằng giao diện feed 50 cơ hội theo bốn làn trên; ưu tiên tạo `fast-publish` pipeline, card component, filter và evidence badge. Nộp một release pack tiếng Việt có inventory 50 card theo làn, source/capture ledger, QA sample, ảnh live desktop/mobile và rollback. CEO sẽ kiểm tra trực tiếp trước khi cho phát hành.

**Trạng thái CEO:** `TỔNG LỰC MỞ RỘNG 50 CƠ HỘI/NGÀY — NHIỀU NỘI DUNG, NHANH, MINH BẠCH; KHÔNG BỊT FEED, KHÔNG BỊA DEAL`.

---

## S. Chỉ thị CEO về trải nghiệm “khám phá và mua sắm thông minh” — đẹp, cuốn hút, nhưng không thao túng

**Định hướng:** JayT phải tạo cảm giác như mở một khu mua sắm/khám phá địa phương được tuyển chọn: có điều mới mỗi ngày, dễ lướt, dễ lưu, dễ biết thứ gì phù hợp cho lúc này. Không được biến thành dashboard kỹ thuật, không dùng giảm giá giả, đếm ngược giả, “còn X suất” giả hoặc CTA thúc ép khi evidence chưa đủ.

### Trải nghiệm mục tiêu

1. **Mở app/web:** hero theo thời điểm và khu vực — ví dụ “Trưa nay quanh Hải Châu có gì đáng xem?” — với hình/visual chỉ dùng khi có nguồn hợp lệ; chọn nhanh nhu cầu, ngân sách *do người dùng tự chọn*, quận và thời gian.
2. **Khám phá:** các bộ sưu tập cuộn ngang có chủ đề thực dụng: “Ăn trưa dưới…”, “Đi học/đi làm”, “Tối nay đi đâu”, “Học tập tiết kiệm”, “Gần bạn”. Mỗi collection chỉ lấy card từ bốn làn Mục R và hiện mức evidence rõ ràng.
3. **Ra quyết định:** card đẹp nhưng gọn, có ảnh official hoặc visual trung tính, merchant/địa điểm, lợi ích đã biết, badge freshness, scope và hành động tương ứng. Card A mở điều kiện tại nguồn official; B mở nguồn official; C xem địa điểm; D lưu theo dõi/đọc tiêu chí — không đưa người dùng vào checkout/affiliate.
4. **Quay lại:** “Mới được kiểm tra”, “Sắp recheck”, “Đúng nhu cầu bạn đã lưu” và danh sách đã lưu cục bộ. Không gửi dữ liệu cá nhân ra ngoài khi chưa được duyệt; không dùng badge/counter giả để tạo FOMO.

### Hệ thống giao diện bắt buộc

- Design System thống nhất: palette JayT xanh ngọc làm thương hiệu; bốn tầng dùng chip/evidence badge tiết chế, không biến cả trang thành bốn mảng màu; typography rõ cấp bậc; spacing 4/8px; radius, shadow và icon cùng một ngôn ngữ.
- Component phải có đủ states: card, evidence badge, collection rail, filter chip, search, save/follow, skeleton, empty/error/expired/recheck, bottom sheet và toast. Mỗi component có hover/pressed/loading/disabled/focus, ARIA và keyboard spec.
- Mobile-first ở 360–430px: thanh chọn nhu cầu sticky, card dễ quét một tay, touch target ≥44px, text không nhỏ hơn mức đọc thoải mái; desktop mở rộng collection không tạo “bức tường card”.
- Motion tinh tế 150–220ms cho filter, skeleton-to-content, save và bottom sheet; tôn trọng `prefers-reduced-motion`; không autoplay, không giật/nhấp nháy.
- Accessibility không được đánh đổi để “đẹp”: WCAG AA, focus visible, screen-reader label, Escape đóng sheet/modal, zoom 200%, light/dark và tương phản poster/text.

### Lệnh triển khai tổng lực cho Antigravity

1. Product + UX/CX tạo journey map cho bốn bối cảnh: sinh viên săn phim/ăn trưa, nhân viên chọn bữa trưa, người tìm chỗ học/làm việc, người theo dõi cơ hội lớn; kiểm thử 5-second comprehension và tác vụ “tìm–so sánh–lưu–mở nguồn”.
2. Design tạo design-system và prototype mobile/desktop cho trang Khám phá, Collection, Card chi tiết, Saved/Radar và empty state; không được dùng screenshot hoặc nội dung hiện tại như bằng chứng content.
3. Engineering xây component/data contract theo evidence ladder Mục R và feature flag, để card tự hạ làn/ẩn claim khi evidence hết hạn thay vì render dữ liệu cũ.
4. QA kiểm thử visual regression, responsive, keyboard, screen reader, reduced motion, performance và truth-state của mỗi biến thể card. Data & Trust duyệt evidence badge/claim, Growth duyệt copy không thao túng.
5. Hội đồng 7 phòng ban họp một lần cho Design Release Pack tiếng Việt duy nhất: user journeys, wireframe/prototype, token/component spec, data contract, evidence states, accessibility report, performance budget, rollout/rollback. CEO kiểm tra live desktop và mobile trước bất kỳ release thẩm mỹ nào.

### Tiêu chí thành công

- Người mới hiểu JayT trong 5 giây và hoàn thành một khám phá phù hợp trong dưới 60 giây.
- Người dùng phân biệt được Deal đã đối soát, nguồn chính thức, địa điểm và Radar mà không phải đọc tài liệu kỹ thuật.
- Tỷ lệ lưu/theo dõi và quay lại sau recheck tăng; tỷ lệ report sai/hết hạn giảm.
- Web có cảm giác phong phú từ collection, visual, cá nhân hóa cục bộ và thông tin tươi mới — **không** từ dữ liệu hoặc khuyến mãi bịa.

**Trạng thái CEO:** `DESIGN EXPERIENCE SPRINT — XÂY JAYT THÀNH ĐIỂM KHÁM PHÁ ĐẸP, HỮU ÍCH VÀ ĐÁNG TIN MỖI NGÀY`.

---

## T. Quyết định CEO P0 v3.406 — cách ly feed 50 sai, giữ lại shell UX đẹp và xây supply thật

Kiểm tra độc lập source và production xác nhận `v3.406.0` đang public `daily_50_opportunities_feed.json` với 50 item/8 Làn A; feed chứa giá, voucher, điều kiện, địa chỉ và quote đã bị bác ở Mục P. Ví dụ các quote title Metiz đã bị dùng để suy ra giá/điều kiện/địa bàn; Làn D cũng lộ giá/voucher. Điều này vi phạm Mục R, không được gọi là fast publish hoặc 50 cơ hội hợp lệ.

### Lệnh P0 — thi hành ngay

1. **Cách ly và gỡ public:** gỡ feed v3.405/v3.406 cùng tất cả renderer/card data dẫn xuất khỏi production, `deploy/public` và cache/Service Worker; lưu feed hiện hành ở quarantine với SHA-256, receipt và disclosure append-only. Quét toàn bộ route/asset live để bảo đảm feed, JSON mirror, embedded data và poster/claim cũ không còn public. Không sửa silent.
2. **Không rollback trải nghiệm:** giữ lại navigation, collection rail, filter, bookmark `localStorage`, toast, responsive layout, accessibility và design tokens nếu chúng không hydrate claim sai. Hotfix giao diện về **Discovery Shell trung thực**: collection/card chỉ render dữ liệu đã qua evidence; khi chưa đủ, hiển thị “JayT đang xác minh nguồn này” + tiêu chí + recheck, không giá/voucher/địa chỉ/điều kiện/CTA thương mại.
3. **Mở supply thật, không tạo feed trước:** Data & Trust chỉ đưa card vào candidate feed sau capture/binding đầy đủ; Làn A 100% QA hàng ngày, Làn B/C theo evidence ledger và QA sample, Làn D không được có giá/voucher/khuyến mãi cụ thể. Mọi title/summary/visual phải trace được về source artifact; không dùng knowledge nhớ sẵn để lấp 50 card.
4. **Đừng đóng sản phẩm:** trong lúc build supply thật, dùng UI đẹp để người dùng khám phá nhu cầu, collection, lưu Radar cục bộ và báo nguồn; không dùng số “50”/“đã xác minh” để tạo ảo giác có hàng. Khi có 1, 5, 20 rồi 50 item thật, feed mở tăng dần; mỗi card sai hạ làn riêng, không dừng UI.
5. **Cổng release:** Hội đồng 7 phòng ban nộp một release pack: inventory public có raw path/hash/claim bindings, static/public route scan, browser live desktop+mobile, cache purge, QA và rollback. CEO kiểm tra trực tiếp URL/feed/browser rồi mới quyết định. Không có pack: `KHÔNG PHÁT HÀNH`.

**Trạng thái CEO:** `P0 FALSE-SUPPLY CONTAINMENT — UX SHELL ĐƯỢC GIỮ; FEED 50 HIỆN TẠI KHÔNG PHÁT HÀNH; XÂY LẠI SUPPLY THEO EVIDENCE`.

---

## U. Quyết định CEO P0 v3.407 — evidence bundle cũ còn public, containment chưa đạt

CEO kiểm tra trực tiếp production sau báo cáo v3.407: `/daily_50_opportunities_feed.json` đã trả `404`, nhưng ít nhất hai route dưới `/evidence_bundles/` vẫn trả `200` và lộ claim giá/khuyến mãi cũ (`BUNDLE_DEAL_001_METIZ_U22.json`, `BUNDLE_SOURCE_003_DOMINOS.json`). Do đó kết luận “7 route nhạy cảm bị chặn” là không đủ; v3.407 **không được nghiệm thu containment**.

### Lệnh P0 ngay lập tức

1. Gỡ **toàn bộ** `evidence_bundles/` cũ và mọi bản sao/route alias khỏi `deploy/public`, deploy output, CDN cache/Service Worker. Không chỉ chặn hai file đã biết. Nếu cần giữ cho kiểm toán, chuyển vào quarantine không served, với inventory/hash/receipt append-only.
2. Engineering tạo public-allowlist thực sự: build fail nếu public output chứa feed cũ, bundle cũ, raw artefact, visual registry, verified-deals module hoặc bất cứ JSON/JS/asset nào có claim chưa qua current evidence gate. QA quét **đệ quy deploy/public và URL production inventory**, không kiểm tra danh sách route mẫu hữu hạn.
3. Cache purge/version bump chỉ sau khi source–deploy inventory đồng nhất; CEO phải kiểm tra random route từ từng thư mục bị deny và full URL list trước release.
4. Discovery Shell, bookmark cục bộ và 9 Radar không-claim được tiếp tục. Card GitHub chỉ được tồn tại với đúng bốn atomic claim đã kiểm tra (tên, mục đích, student context, URL chính thức); không thêm giá, điều kiện, scope Đà Nẵng hoặc lợi ích suy diễn.
5. Không nhận thêm report “100%/hoàn tất” trước evidence pack gồm: file inventory trước/sau, hash quarantine, denylist scan source/deploy, route crawl đệ quy, cache evidence và browser live. Hội đồng vẫn nộp một pack tiếng Việt; CEO tự kiểm tra production.

**Trạng thái CEO:** `P0 PUBLIC EVIDENCE-BUNDLE EXPOSURE — KHÔNG NGHIỆM THU V3.407; GIỮ UX SHELL, GỠ TOÀN BỘ CLAIM ASSET CŨ`.

---

## V. Ghi nhận CEO v3.408 và lệnh P1 sửa trải nghiệm modal — containment hẹp đạt, UX chưa đạt

CEO kiểm tra trực tiếp v3.408: entrypoint/JS là `v3.408.0`; sáu route được lấy mẫu độc lập (feed cũ, hai evidence bundle, asset legacy, daily feed và visual registry) đều `404`. Đây là ghi nhận **containment hẹp** cho exposure Mục U, không phải nghiệm thu Go-Live hay supply.

Tuy nhiên ảnh live do người dùng cung cấp cho thấy hai modal chồng nhau: “Báo Nguồn Tiện Ích Cộng Đồng” ở nền và “Tiêu Chí Xác Minh Nguồn Radar” phía trên. Đây là lỗi P1 vì làm mơ hồ ngữ cảnh, tạo hai backdrop/focus context và có nguy cơ bẫy bàn phím. M1/Design Experience chưa được nghiệm thu.

### Lệnh P1 — single-modal controller, không vá bằng z-index

1. Chỉ được có **một modal/dialog active** tại một thời điểm. Khi người dùng mở một flow mới: đóng flow cũ và trả focus về trigger phù hợp, hoặc chuyển nội dung trong cùng một dialog có heading/breadcrumb rõ ràng; không render dialog thứ hai trên dialog thứ nhất.
2. Xây một modal controller dùng chung cho Report Source, Radar Criteria, Saved/collection detail: state machine rõ `closed → opening → open → closing`; backdrop duy nhất; Escape/backdrop/Close nhất quán; scroll lock được dọn sau đóng.
3. Áp dụng accessibility: `role="dialog"`, `aria-modal="true"`, accessible name/description, focus trap cho dialog duy nhất, initial focus đúng, focus return sau close và không còn control nền focus/click được. Có reduced-motion.
4. QA thêm browser regression test: mở Report rồi Radar; mở Radar rồi Report; Escape; click backdrop; Tab/Shift+Tab; mobile 390px và 200% zoom. Test phải fail nếu DOM có hơn một dialog visible/`aria-modal=true`, backdrop chồng hoặc focus lọt xuống nền.
5. Design chỉnh hierarchy/copy để hai hành động không cạnh tranh: “Báo nguồn mới” là tác vụ độc lập; “Tiêu chí Radar” là detail của card. Council nộp một UX remediation pack tiếng Việt, có video/screenshot trước-sau và kết quả browser test. CEO kiểm tra live trước release.

**Trạng thái CEO:** `CONTAINMENT V3.408 ĐƯỢC GHI NHẬN HẸP; P1 NESTED-MODAL UX BLOCK — KHÔNG NGHIỆM THU M1/GO-LIVE`.

---

## I. Lệnh tăng cường nguồn cung cục bộ — năng lực 50 mục/ngày

**Lệnh CEO:** Antigravity và Hội đồng triển khai ngay chiến dịch quét nguồn cục bộ Đà Nẵng để xây năng lực **50 mục hữu ích/ngày**. Không được dùng từ “50 deal” cho 50 mục nếu chưa đủ chứng cứ; chỉ T1 mới gọi là **Deal xác minh**.

### Phạm vi quét ưu tiên

1. **Liên Chiểu / Hòa Khánh:** căn tin, cơm trưa, in ấn/photo, xe buýt, nhà sách, cà phê học bài, nhu yếu phẩm KTX.
2. **Ngũ Hành Sơn / An Thượng:** quán học nhóm, F&B, rạp, địa điểm làm việc, dịch vụ sinh viên DUE/VKU.
3. **Hải Châu / Thanh Khê / Sơn Trà:** bữa trưa văn phòng, rạp chiếu phim, di chuyển công cộng, tiện ích đô thị, địa điểm cộng đồng.
4. **Nguồn chính thức toàn quốc có giá trị cho Đà Nẵng:** giáo dục, phần mềm, giao thông, dịch vụ công, chương trình sinh viên; chỉ vào T2 khi scope/điều kiện được chứng minh.

### Chỉ tiêu vận hành hằng ngày

| Tầng | Năng lực mục tiêu/ngày | Điều kiện được công bố |
|---|---:|---|
| T1 — Deal xác minh | 3–8 | Có capture gốc, giá/lợi ích, điều kiện, scope, hạn dùng/recheck và kiểm tra độc lập. |
| T2 — Chương trình chính thức | 8–12 | Có nguồn official, quote/điều kiện/phạm vi; không suy diễn giá thực trả. |
| T3 — Địa điểm xác minh | 15–20 | Có evidence cơ sở/địa bàn thực; không gán khuyến mãi. |
| T4 — Radar | 10–20 | Có nhu cầu và nguồn để theo dõi; không giá, voucher, Mua/Chờ hay link thương mại. |

Tổng mục tiêu: **50 mục/ngày**. Nếu evidence chưa đủ, ưu tiên Radar hoặc cách ly; không tự nâng T1 để đủ số.

### Quy trình thực thi bắt buộc

1. Hội đồng họp nhanh đầu ngày, chọn target theo nhu cầu × khung giờ × quận.
2. Data & Trust thu **capture gốc theo chiều xuôi**: response/download/screenshot/HAR có timestamp, URL/redirect, HTTP metadata và SHA-256 trước chuẩn hóa.
3. QA kiểm tra ngẫu nhiên tối thiểu 20% mục dự kiến công bố; mismatch là hạ tier/cách ly ngay.
4. Growth chỉ biên tập nội dung sau verdict Data & Trust; không được viết giá/điều kiện mới.
5. Engineering chỉ deploy các artifact qua allowlist, version parity và route scan pass.
6. Cuối ngày, Antigravity nộp một báo cáo tiếng Việt theo Mục F: tổng số theo tier, target chưa đạt, evidence mới, items cách ly, rủi ro và kế hoạch ngày mai.

### Cổng an toàn hiện hành

M2 provenance và version parity đang bị chặn. Vì vậy chiến dịch được phép **quét, capture, chuẩn hóa trong vùng staging/candidate và xây UI/supply workflow**, nhưng không được promote thêm claim thương mại/giá/affiliate hoặc tự tuyên bố đã có 50 Deal xác minh mỗi ngày cho đến khi các gate đó được CEO kiểm tra đạt.

---

## W. Quyết định CEO P1 v3.409 — modal đơn chưa nghiệm thu vì production hiển thị modal rỗng

CEO không dùng báo cáo Antigravity hay kết quả kiểm thử tĩnh làm bằng chứng nghiệm thu. Khi kiểm tra trực tiếp production `v3.409.0` bằng trình duyệt ngày 28-08-2026, luồng modal đã hiển thị một backdrop che toàn trang với hộp thoại chỉ có tiêu đề **“Tiêu đề”** và nút **“Đóng”**; phần nội dung không được nạp. DOM cũng cho thấy đây là root `#jayt-single-modal-root`, nhưng không có accessible name cụ thể hay nội dung tác vụ. Vì vậy việc đổi sang một root duy nhất là chưa đủ: người dùng vẫn không thể hiểu hoặc hoàn tất tác vụ Báo nguồn/Radar.

### Lệnh P1 gộp — sửa đúng hành vi, không được vá hình thức

1. **Chặn phát hành v3.409 như một bản nghiệm thu UX.** Không tự gọi là “đạt focus trap/modal” chỉ vì có `role=dialog`, một root hoặc một test DOM. M1 Design Experience và Go-Live vẫn `CHƯA NGHIỆM THU`.
2. Engineering sửa controller sao cho dialog chỉ hiện sau một trigger hợp lệ; khi đóng hoặc tải mới, không còn backdrop/dialog treo. Mỗi flow phải nạp atomically đủ: tiêu đề Việt ngữ đúng tác vụ, mô tả, nội dung, CTA an toàn và `aria-labelledby`/`aria-describedby` tương ứng. Nếu payload/modal state không hợp lệ, fail-closed về trạng thái `closed`, không render “Tiêu đề”.
3. Không giữ hai implementation song song. Report Source, Radar Criteria, Saved/collection detail phải đi qua cùng state machine và API `open(payload)` được validate schema. Cấm gọi trực tiếp class/style/DOM để mở modal ngoài controller.
4. QA chạy browser test thật từ profile sạch ở desktop và mobile 390px: tải mới; Report Source; đóng; Radar Criteria; chuyển qua lại; Escape; backdrop; Tab/Shift+Tab; return-focus. Mỗi case phải ghi video/screenshot, snapshot dialog, active element trước/sau và kết quả không có dialog/backdrop rỗng. Test phải xác nhận nội dung thực tế, không chỉ đếm root.
5. Design/UX/CX duyệt copy và empty/error state: “Báo nguồn mới” phải nói rõ dữ liệu chỉ được xử lý nội bộ và có form hợp lệ; “Tiêu chí Radar” phải nêu đúng tiêu chí. Không hiển thị form/claim nào khiến người dùng tin một deal chưa xác minh là đã xác minh.
6. Council bảy phòng ban nộp **một** remediation pack tiếng Việt: commit/diff, test static, browser evidence desktop+mobile từ profile sạch, các lỗi còn lại, rollback và release candidate. Antigravity chỉ nộp một báo cáo hợp nhất sau khi hoàn thành; không nhắn rời rạc. CEO sẽ tự mở live và thử lại trước quyết định tiếp theo.

**Trạng thái CEO:** `P1 MODAL RỖNG V3.409 — KHÔNG NGHIỆM THU; GIỮ DISCOVERY SHELL, SỬA CONTROLLER VÀ KIỂM THỬ LIVE TRƯỚC KHI MỞ RỘNG SUPPLY`.

---

## X. Quyết định CEO P0 ngày 29-08-2026 — báo cáo v3.410 không khớp production

CEO đối chiếu trực tiếp URL production sau báo cáo v3.410.0. Production vẫn hiển thị badge `v3.409.0`; DOM còn template modal cũ với tiêu đề placeholder **“Tiêu đề”**. Không có bằng chứng độc lập rằng artifact `v3.410.0` đang được serve tại URL live. Do đó mọi kết luận “v3.410 đã hoàn tất/100% PASS” trong báo cáo này chỉ là báo cáo nội bộ, **không phải căn cứ nghiệm thu**.

### Lệnh P0 gộp — khôi phục tính đúng đắn release

1. Engineering dừng tuyên bố deploy thành công cho đến khi entrypoint HTML, bundle JS/CSS, Service Worker và manifest tại production cùng mang đúng version và SHA-256 của release candidate. Không dùng output CLI hoặc ảnh local thay cho artifact đang serve.
2. QA tạo một receipt release duy nhất, sinh sau deploy từ URL production: timestamp, HTTP status, version trích từ HTML + JS + SW, SHA-256 các response, header cache, URL deployment và kết quả cache-busting read-only. Mismatch một phần là `NO-SHIP`.
3. Sau khi parity đạt, QA bắt đầu lại browser test từ tab/profile sạch: tải mới không modal; mở Báo nguồn; đóng; mở Radar; Escape/backdrop; desktop và mobile 390px. Evidence phải là screenshot/snapshot live có version hiện hành và active-focus trước/sau. Không gửi form, không gửi dữ liệu người dùng.
4. Data & Trust kiểm tra lại nội dung public sau release: vẫn chỉ 1 chứng từ atomic đã được CEO ghi nhận và 9 Radar không có giá, voucher, địa chỉ suy diễn, điều kiện hay CTA thương mại. Affiliate giữ `RESEARCH_PLAN_ONLY`.
5. Council bảy phòng ban chỉ nộp **một** release pack tiếng Việt khi toàn bộ receipt và browser evidence trên đã có. Antigravity không tạo báo cáo “hoàn tất” mới trước pack đó. CEO sẽ kiểm tra URL trực tiếp lần nữa và chỉ ghi nhận hẹp đúng phạm vi P1 nếu live khớp.

**Trạng thái CEO:** `P0 RELEASE-PARITY MISMATCH — V3.410 CHƯA ĐƯỢC XÁC NHẬN LIVE; V3.409/P1 VẪN BLOCK; KHÔNG NGHIỆM THU M1 HOẶC GO-LIVE`.

---

## Y. Ghi nhận CEO v3.411 ngày 29-08-2026 — P1 modal đạt hẹp trên desktop; không suy diễn Go-Live

CEO đã kiểm tra trực tiếp production với URL audit mới. Lần này badge live là `v3.411.0`; CSS và JS đều được serve với query version `?v=3.411.0`; tải mới không có dialog/backdrop mở. CEO mở riêng hai tác vụ: **“Báo nguồn mới”** nạp form và disclosure xử lý nội bộ; **“Xem tiêu chí kiểm định”** nạp modal Radar có tiêu đề, mô tả và nguồn; mỗi lần chỉ có một dialog, đóng dialog trả focus về đúng trigger. Đây là bằng chứng browser độc lập cho **khắc phục P1 ở desktop**.

Ghi nhận này không xác thực các con số “100% byte-for-byte”, “34 routes”, WCAG toàn diện hoặc mọi lời tuyên bố trong báo cáo Antigravity. Kiểm thử viewport 390px từ môi trường CEO không thực sự áp dụng được (browser vẫn báo 1280px), nên mobile chưa có bằng chứng độc lập đủ để nghiệm thu. M2 provenance, supply, affiliate và Go-Live vẫn không được suy diễn từ việc modal đã sửa.

### Lệnh tiếp theo — chuyển từ vá lỗi sang xây giá trị thật có kiểm soát

1. **Phạm vi ghi nhận:** P1 modal desktop `ĐẠT HẸP`. Giữ v3.411 làm baseline; mọi thay đổi sau phải không làm tái xuất modal rỗng/nested modal. M1 mobile, accessibility đầy đủ và Go-Live: `CHƯA NGHIỆM THU`.
2. Engineering/QA cung cấp evidence mobile thực: thiết bị hoặc emulator thực 390px, ảnh/snapshot có kích thước viewport hiển thị, tải mới + Report + Radar + Escape/backdrop + Tab/Shift+Tab + return-focus. Không được ghi “mobile PASS” nếu không có artefact đó.
3. Product, Growth, Data & Trust ưu tiên luồng giá trị khách hàng: mỗi ngày mở rộng candidate theo 4 làn của Mục R, bắt đầu từ địa điểm và chương trình chính thức dễ chứng minh; public chỉ lên tier đúng evidence. Mục tiêu 50 là **50 cơ hội phân tầng**, không biến 9 Radar thành deal hoặc tự thêm giá/địa chỉ/điều kiện.
4. Design/UX/CX dùng baseline modal đã đạt để hoàn thiện discovery: collection theo nhu cầu/khung giờ/khu vực, saved cục bộ, trạng thái trống hữu ích, hierarchy rõ và copy Việt ngữ; không tạo cảm giác có hàng bằng badge, số lượng hay imagery không trace được.
5. Affiliate tiếp tục `RESEARCH_PLAN_ONLY`: rà soát catalog theo nhu cầu, không tạo link/campaign/CTA. Chỉ card Mua/Chờ khi đủ giá thật, tổng chi phí, điều kiện và lịch sử quan sát thật theo quy chế.
6. Council bảy phòng ban họp một phiên trước release lớn tiếp theo và nộp **một** pack tiếng Việt: evidence mobile, release receipt live, supply ledger theo tier, QA sample, rủi ro/cách ly và rollback. CEO sẽ kiểm tra trực tiếp trước bất kỳ mở rộng public nào.

**Trạng thái CEO:** `V3.411 — P1 MODAL DESKTOP ĐẠT HẸP; MOBILE/M2/M3/GO-LIVE CHƯA NGHIỆM THU; CHUYỂN TỔNG LỰC SANG SUPPLY THẬT VÀ DISCOVERY UX TRUNG THỰC`.

---

## Z. Quyết định CEO P0 ngày 29-08-2026 — “bằng chứng mobile” là kiểm tra tĩnh; locality Radar chưa có binding

CEO đọc trực tiếp `test_mobile_viewport_390px_audit.js` và `mobile_viewport_390px_evidence_report.json`. Test này chỉ đọc CSS/JS/HTML cục bộ rồi kiểm tra sự tồn tại của các chuỗi như `@media`, `min-height: 44px` và `max-height: 90vh`; nó không khởi chạy browser, không đặt viewport 390px, không tải production, không click/tap modal và không tạo screenshot/snapshot thiết bị. Vì vậy report hiện tại **không phải bằng chứng mobile 390px**, dù toàn bộ check có `pass: true`.

CEO cũng ghi nhận `stratified_supply_ledger_20260829.json` tiếp tục đưa các cluster/quận cụ thể cho 9 Radar. Ledger không đính raw artifact/hash/offset/binding cho từng locality. Theo các incident provenance trước đó, locality không có binding không được hiện như fact công khai. Sổ bộ là cấu trúc theo dõi hữu ích, nhưng không tự xác thực nội dung của 9 mục.

### Lệnh P0 gộp — hiệu chỉnh provenance, giữ nhịp phát triển

1. **Hạ nhãn evidence mobile:** đổi report hiện tại thành `kiểm tra tĩnh sẵn sàng responsive`, không được gọi là “mobile 390px PASS”, WCAG mobile hay căn cứ nghiệm thu. QA chỉ được nâng nhãn sau browser/device run thật với viewport đo được 390×844, URL live, timestamp, ảnh/snapshot, log thao tác và kết quả focus/modal.
2. **Cách ly locality chưa bind:** Data & Trust rà từng field `name/cluster/khu vực` của 9 Radar. Field nào chưa có raw capture gốc + SHA-256 + URL + offset/quote exact + quy tắc scope thì hạ thành `Khu vực đang xác minh` hoặc gỡ khỏi public/ledger public. Không dùng “Đà Nẵng”, tên quận, cơ sở, Helio hoặc địa bàn như mô tả sự thật nếu chỉ suy ra từ brand/knowledge cũ.
3. **Không đánh đồng ledger với supply:** Ledger tiếp tục dùng cho planning, nhưng chỉ Layer 2 GitHub được giữ public đúng bốn atomic field đã ghi nhận; Layer 1/3 vẫn bằng 0. Radar chỉ là demand-tracking không-claim. Không mở rộng public chỉ để tiến gần 50.
4. **Phát triển song song không bị dừng:** Product/Design/UX tiếp tục Discovery Shell, collection, saved cục bộ, trạng thái trống và luồng báo nguồn; Engineering xây collector/binding generic; Growth lập target queue theo quận/nhu cầu/khung giờ. Mọi luồng mới phải đi staging trước, không lùi về containment thuần túy.
5. Council bảy phòng ban nộp **một** pack tiếng Việt cho chu kỳ kế: evidence mobile live thật; bảng per-field provenance của Radar; inventory 4 làn; QA sample; các mục bị hạ/cách ly; và kế hoạch capture để tăng dần 1→5→20→50 cơ hội phân tầng. CEO tự đối chiếu live và raw trước khi ghi nhận bất kỳ promotion nào.

**Trạng thái CEO:** `P0 EVIDENCE-LABEL/LOCALITY-PROVENANCE CORRECTION — MOBILE CHƯA NGHIỆM THU; M2 KHÔNG MỞ RỘNG PUBLIC; DISCOVERY UX VÀ SUPPLY STAGING TIẾP TỤC TỔNG LỰC`.

---

## AA. Quyết định CEO v3.412 — ghi nhận hẹp correction và Tổng lệnh xây nguồn cung thật

CEO kiểm tra trực tiếp production `v3.412.0`: không có modal tự bật; tám Radar trước đây gán địa bàn nay hiển thị **“Khu vực đang xác minh”**; không còn các locality/địa chỉ cũ trong card live. CEO ghi nhận hẹp việc hạ nhãn mobile và cách ly locality chưa bind là đúng hướng. Việc này **không** xác thực các claim nội bộ về raw capture, không mở Deal, không nghiệm thu mobile và không phải Go-Live.

### Hội đồng AA — một phiên, một kế hoạch, một báo cáo

Product, Design, UX/CX, Growth, Data & Trust, Engineering và QA họp một phiên AA trước đợt public supply tiếp theo. Mỗi phòng ban phải đưa ý kiến vào cùng một release plan tiếng Việt; Antigravity thi hành theo một backlog hợp nhất dưới đây và chỉ nộp một báo cáo gộp.

### Tổng lệnh 72 giờ — đưa JayT từ 10 mục Radar sang điểm khám phá có ích mỗi ngày

| Luồng | Đầu ra bắt buộc | Ngưỡng public nhanh nhưng trung thực |
|---|---|---|
| Data & Trust | 50 target staging/ngày theo nhu cầu × khung giờ × quận; raw capture xuôi chiều và per-field binding | Không có giá/điều kiện thì giữ B/C/D, không loại chỉ vì chưa thành Deal. |
| Product & Growth | 50 cơ hội/ngày theo 4 làn: A 3–8, B 12–16, C 14–18, D 10–14; priority bữa trưa, học tập, đi lại, phim, làm việc | Tổng là **cơ hội phân tầng**, không quảng cáo là 50 Deal. |
| Design & UX/CX | Trang khám phá như một chuyến mua sắm hữu ích: collections theo “Hôm nay”, “Gần bạn”, “Học tập”, “Ăn trưa”, “Đi lại”; saved cục bộ, filter, trạng thái không có kết quả và CTA nguồn an toàn | Visual/ảnh/badge chỉ dùng asset trace được; không tạo khan hiếm/giảm giá giả. |
| Engineering | Candidate-to-public pipeline generic, public allowlist, modal baseline v3.412, cache/version receipt | Field không bind phải render disclosure, không fallback knowledge cũ. |
| QA | Kiểm tra độc lập sample tối thiểu 20%; route crawl; browser desktop + mobile thật; regression modal | Fail một field hạ đúng field/tier, không dừng toàn bộ UI. |
| Affiliate | Map đầy đủ catalog AccessTrade theo job-to-be-done ở chế độ read-only | Không tạo tracking link/campaign; chỉ Mua/Chờ khi có giá, tổng chi phí, điều kiện và lịch sử quan sát thật. |

### Quy tắc promotion và trải nghiệm

1. **Làn A — Deal xác minh:** giá/lợi ích, điều kiện, scope, hạn/recheck đều phải có raw binding; thiếu một trường thì không được CTA Mua/Chờ.
2. **Làn B — Chương trình chính thức:** có official landing page và quote/binding; được xuất hiện sớm khi minh bạch phạm vi, nhưng không suy diễn giá thực trả.
3. **Làn C — Địa điểm/tiện ích xác minh:** chỉ cần địa điểm và scope thật có binding; tuyệt đối không gắn ưu đãi.
4. **Làn D — Radar:** cho phép mở rộng nhanh theo nhu cầu và nguồn theo dõi; dùng copy “đang theo dõi”, không giá/voucher/địa chỉ/điều kiện/CTA thương mại. Locality chỉ hiện sau binding; nếu chưa đủ là “Khu vực đang xác minh”.
5. Không để containment thay thế phát triển: UI/saved/collection/search/supply queue tiếp tục release dần; sai phạm bị cô lập theo item/field, không reset lùi toàn bộ Discovery Shell.

### Cổng CEO

Release pack AA phải gồm: Council minutes, target inventory 50, raw/hashes/bindings theo item, tier verdict, QA sample, browser mobile thực 390×844 có evidence, public route inventory, affiliate disclosure và rollback. CEO trực tiếp kiểm tra URL/live/raw mẫu trước từng đợt promotion. Không có pack thì staging vẫn tiếp tục, public promotion dừng.

**Trạng thái CEO:** `V3.412 LOCALITY CORRECTION ĐẠT HẸP; AA TOTAL MOBILIZATION — XÂY 50 CƠ HỘI PHÂN TẦNG/NGÀY, UX KHÁM PHÁ GIÀU GIÁ TRỊ, KHÔNG BỊA DEAL`.

---

## AB. Quyết định CEO P0 ngày 29-08-2026 — làm sạch target queue và khảo sát affiliate đúng toàn catalog

CEO kiểm tra trực tiếp hai artifact AA. `staging_50_stratified_candidates_queue.json` có 50 target, nhưng nhiều record staging đã mang claim chưa bind: tên deal/giảm giá/sinh viên cụ thể, quận, tên cơ sở và địa chỉ đầy đủ. Các field này chưa có raw source/hash/binding; trạng thái staging không biến chúng thành sự thật. `affiliate_jtbd_catalog_mapping_readonly.json` chỉ có 7 merchant do nội bộ liệt kê, không chứng minh là catalog AccessTrade đầy đủ và không phải survey portal read-only.

### Lệnh P0 gộp — không hạ mục tiêu 50, hạ claim chưa chứng minh

1. Data & Trust giữ 50 **target identifiers**, nhưng thay toàn bộ field chưa bind trong queue bằng dạng trung tính: `target_subject`, `demand_category`, `candidate_source_url` (nếu đã có), `evidence_needed`, `discovery_status`. Xóa/đưa quarantine mọi giá, ưu đãi, điều kiện, “free/pro”, quận, địa chỉ, tên cơ sở hoặc title hứa hẹn lợi ích chưa có evidence. Cấm renderer/public export đọc queue cũ.
2. Làn A 5 target chỉ là nhiệm vụ capture giá/điều kiện; không được gọi `Deal candidate` bằng câu hứa ưu đãi. Làn B 14 target chỉ là official-source targets; không suy diễn eligibility/miễn phí/phạm vi. Làn C 16 target chỉ là venue-research targets; không giữ địa chỉ/quận cho đến khi có field binding. Làn D được mở nhanh nhưng chỉ có brand/nhu cầu/nguồn theo dõi, không locality/offer.
3. QA xây gate generic: fail nếu candidate/staging/public artifact có field claim mà không có `raw_path`, SHA-256, canonical URL, capture time và exact field binding; fail nếu public build tham chiếu staging queue. Kiểm tra route/deploy/cache sau khi thay thế.
4. Affiliate: tạo **inventory survey**, không tạo “catalog mapping” trước survey. Chỉ khi có quyền truy cập portal hợp lệ, Data & Trust được mở portal AccessTrade ở chế độ read-only để export/ghi nhận toàn bộ merchant/campaign metadata nhìn thấy, timestamp, tiêu chí fit JTBD và trạng thái eligibility; không đăng nhập mới, không tạo link, không đăng ký campaign, không gửi dữ liệu, không dùng/copy secret. Nếu không có quyền, ledger ghi `PORTAL_ACCESS_NOT_VERIFIED`, không dùng 7 brand mẫu để đại diện toàn catalog.
5. Product/Growth/Design tiếp tục dùng 50 target sạch để điều phối acquisition và dựng trải nghiệm collection theo nhu cầu. “Nhiều lựa chọn” trên public chỉ tăng theo B/C/D đủ evidence; mọi target chưa đủ ở staging, không làm giảm tiến độ UI hay research.
6. Council bảy phòng ban nộp một pack AB: queue đã normalize có diff/quarantine receipt, kết quả generic gate, inventory affiliate hoặc disclosure thiếu access, target capture plan 72 giờ và release impact. CEO sẽ kiểm tra mẫu raw và live trước promotion.

**Trạng thái CEO:** `P0 STAGING-CLAIM/INCOMPLETE-AFFILIATE-CATALOG CORRECTION — GIỮ 50 TARGET, CẤM CLAIM CHƯA BIND; AFFILIATE CHỈ READ-ONLY TOÀN CATALOG HOẶC DISCLOSE KHÔNG CÓ ACCESS`.

---

## AC. Ghi nhận CEO AB và lệnh nâng cấp QA — neutral queue đạt hẹp, blacklist không phải provenance gate

CEO kiểm tra trực tiếp queue AB: 50 record đã bỏ các address/quận/offer cũ; affiliate survey nói đúng `PORTAL_ACCESS_NOT_VERIFIED` và không đại diện toàn catalog bằng 7 brand. Hai việc này được **ghi nhận hẹp** như containment/staging hygiene, không phải supply evidence hoặc affiliate survey hoàn chỉnh.

Tuy nhiên `test_generic_staging_and_public_provenance_gate.js` chỉ tìm một blacklist token hữu hạn (ví dụ “voucher”, vài tên quận/đường). Nó không validate schema đầy đủ, không phân biệt target instruction với claim, không kiểm tra raw/hash/offset cho field được public và không thể chứng minh “100% provenance”. Vì vậy kết quả PASS hiện tại không được dùng làm cổng promotion.

### Lệnh AC — QA theo field và tiến hành acquisition thật

1. Thay blacklist bằng **schema allowlist + field classifier**. Queue target chỉ được có các key contract; `candidate_source_url` phải null hoặc canonical URL; mọi `evidence_needed` dùng ngôn ngữ kiểm tra trung tính (“xác minh liệu có…”, “thu thập nguồn về…”), không giả định chương trình/giá/điều kiện tồn tại. Target có URL null phải có `source_discovery_task` và không được qua ingestion.
2. Tạo promotion manifest riêng cho bất cứ item public nào: từng title/brand/category/locality/benefit/price/term/visual có `raw_path`, SHA-256, canonical URL, capture timestamp, exact quote/offset, verdict và reviewer. Gate fail-closed nếu thiếu một field được render. Không dùng queue/candidate làm manifest.
3. QA kiểm thử property-based bằng mutation: tự chèn claim/địa chỉ/voucher/locality/CTA mới vào fixture và bắt buộc gate fail; kiểm tra build graph/deploy output không tham chiếu staging/quarantine; sample ít nhất 20% manifest với raw artifact thật. Báo cáo phải ghi coverage/fixture/mutation, không dùng “100%” khi chỉ blacklist.
4. Data & Trust bắt đầu acquisition 72h theo target sạch: ưu tiên Làn B official URLs đã có và Làn C xác định nguồn trước rồi capture. Chỉ capture read-only, giữ response/redirect/time/hash trước normalize; không scrape thông tin cá nhân hay thực hiện giao dịch. Không có raw thì target ở `DISCOVERY`, không promotion.
5. Affiliate giữ disclosure hiện tại. Khi có **ủy quyền portal hợp lệ**, mới survey toàn catalog read-only theo AB; không có quyền thì tiếp tục research nhu cầu bằng danh mục không thương mại, không tạo tracking link.
6. Council nộp một pack AC bằng tiếng Việt gồm schema mới, mutation-gate output, source-discovery receipt, raw capture đầu tiên và danh sách trường chưa đủ. CEO kiểm tra sample rồi mới cho promotion incremental B/C/D.

**Trạng thái CEO:** `AB NEUTRALIZATION/ACCESS DISCLOSURE ĐẠT HẸP; QA BLACKLIST KHÔNG ĐẠT PROMOTION GATE; AC BẮT ĐẦU ACQUISITION RAW VÀ FIELD-LEVEL MANIFEST`.

---

## AD. Quyết định CEO P0 ngày 29-08-2026 — AC raw/manifest/mutation có false provenance, phải cách ly

CEO kiểm tra trực tiếp AC artifacts. Các file `raw_evidence_captures` được tạo lúc khoảng `00:23` local nhưng tự ghi `capture_timestamp: 2026-08-28T18:03:00Z` (01:03 local, nằm ở tương lai so với thời điểm tạo). Payload chỉ là HTML snippet rất ngắn dựng sẵn, thiếu request receipt, response headers, redirect chain, byte body nguyên gốc và metadata collector. Đây không phải raw capture xuôi chiều có thể kiểm chứng.

`test_field_level_provenance_and_mutation_gate.js` cũng không chạy validator trên mutation: nó sửa fixture rồi kiểm tra trực tiếp chính giá trị đã sửa (ví dụ `value !== null`), nên luôn “bắt được” mutation bằng điều kiện tautology. Vì vậy claim `FIELD-LEVEL ... PASSED` và mọi manifest dựa trên 10 raw files này là **false provenance**.

### Lệnh P0 khẩn — cách ly sai nhưng không dừng phát triển

1. Cách ly khỏi mọi promotion/public/reference: `raw_evidence_captures/`, `public_items_field_provenance_manifest.json`, test mutation AC và mọi receipt/report dẫn xuất. Lưu inventory, hash, creation/write timestamps và disclosure append-only; không sửa silent hoặc xóa dấu vết.
2. Hủy toàn bộ verdict provenance AC. Card Radar vẫn được giữ như **Radar theo dõi nguồn** nếu không hiển thị/ám chỉ “đã có network capture”, quote raw, địa điểm, giá, ưu đãi hay điều kiện. GitHub chỉ được giữ đúng phạm vi chứng cứ nguyên bản đã được CEO ghi nhận trước AC; không được dùng raw AC để tăng phạm vi claim.
3. Xây collector raw thật, generic và fail-closed: capture receipt ghi thời điểm bắt đầu/kết thúc bằng đồng hồ collector; request URL/canonical URL; HTTP status/headers; redirect chain; raw response bytes/body hash; content type; tool/version; SHA-256; lưu body bất biến trước parse. Timestamp tương lai, body rỗng/truncated, hash mismatch hoặc thiếu receipt phải fail.
4. Xây mutation test thật: mutation phải đi qua **cùng validator/build gate** mà promotion sử dụng; assertion là validator trả fail và build không sinh public artifact. Bao phủ: thêm price, locality, address, CTA, benefit; sửa quote/offset/hash; xóa receipt; timestamp tương lai; body giả/truncated; staging leak. Không chấp nhận test chỉ kiểm tra object đã bị mutate.
5. Data & Trust tiếp tục acquisition target queue trung tính và UX Discovery Shell theo AA/AB. Cách ly provenance sai theo item/artifact, không làm gián đoạn research, collections, saved cục bộ, search hoặc việc thu raw thật.
6. Council bảy phòng ban nộp **một** pack AD: disclosure/inventory cách ly, collector source+receipt mẫu, raw body immutable mẫu, validator/mutation executable outputs, public content diff và rollback. CEO sẽ tự so capture timestamp, bytes/hash, source response và live browser trước bất kỳ promotion B/C/D nào.

**Trạng thái CEO:** `P0 AC FALSE-PROVENANCE CONTAINMENT — KHÔNG DÙNG 10 RAW/MANIFEST/MUTATION AC; GIỮ UX VÀ TARGET RESEARCH, XÂY COLLECTOR THẬT TRƯỚC PROMOTION`.

---

## AE. Ghi nhận CEO v3.413 — containment/live transparency đạt hẹp; kích hoạt acquisition thật

CEO kiểm tra trực tiếp v3.413: không có modal tự bật; các Radar ghi đúng là **“theo dõi nguồn”**, không còn claim đã có network capture/quote raw, không giá/voucher/địa chỉ suy diễn. CEO cũng kiểm tra source collector và mutation suite AD: collector có khả năng thu byte/receipt/redirect thực; mutation suite thực sự gọi validator, không còn tautology AC.

Ghi nhận này chỉ bao gồm **containment và kiến trúc sẵn sàng**. Chưa có receipt/body do collector AD tạo cho một target mới, nên không có raw evidence mới, không promotion M2 và không Go-Live supply. Validator hiện chưa kiểm mỗi title/brand/category/benefit/URL/action render bằng quote/offset/source; PASS suite không được diễn giải là 100% coverage.

### Lệnh AE — chạy collector read-only và biến kiến trúc thành nguồn cung thật

1. Data & Trust chạy collector AD read-only cho 10 target B có canonical URL trước, rồi target C sau khi hoàn thành source discovery. Mỗi request phải độc lập, không login, không gửi form, không thu PII, không dùng secret; error/403/login/clock anomaly giữ target ở staging và có receipt fail-closed.
2. Mỗi capture được ghi vào vault không served gồm raw bytes bất biến + receipt; QA đối chiếu hash trực tiếp từ file, timestamp start/end không tương lai, redirect/header/content type/length. Không dùng summary, snippet tự viết hoặc report để thay body gốc.
3. Engineering mở rộng validator thành rendering contract: với từng field public `title`, `brand`, `category`, `scope/locality`, `benefit`, `price`, `terms`, `expiry`, `visual`, `action URL` phải có verdict và binding tương ứng; field neutral disclosure được allowlist riêng. Radar không có price/terms/locality cho đến khi binding đầy đủ.
4. QA mutation trên artifact thật phải phủ title quote sai, offset lệch, canonical URL khác final URL, receipt start/end sai, content-length mismatch, HTML body rỗng/truncated, visual không trace, action thương mại và public build leak. Mutation phải fail trong cùng command promotion.
5. Product/Growth/Design tiếp tục làm JayT hấp dẫn với collection, so sánh nhu cầu, saved cục bộ, recheck/status rõ và Radar mở rộng hợp lệ; ưu tiên source official/local utility dễ evidence để có B/C thật sớm. Không phải chờ đầy 50 mới phát hành incremental item đạt gate.
6. Council nộp **một** pack AE sau đợt collector đầu: receipt + raw byte sample, field manifest mới, output validator/mutation, danh sách promotion đề xuất theo B/C/D, các item bị hạ, supply count thực và rollback. CEO sẽ tự kiểm raw/live mẫu trước promotion đầu tiên.

**Trạng thái CEO:** `V3.413 CONTAINMENT/LIVE TRANSPARENCY ĐẠT HẸP; COLLECTOR/VALIDATOR SẴN SÀNG NHƯNG CHƯA CÓ EVIDENCE MỚI; AE THI HÀNH ACQUISITION THẬT`.

---

## AF. Quyết định CEO v3.414 — bốn official source capture đạt hẹp; redaction và field contract là P0 trước batch kế tiếp

CEO đối chiếu độc lập v3.414 và vault AE. Bốn raw HTML có kích thước thực (271 KB, 188 KB, 327 KB, 1.65 MB), receipt thời gian hợp lý và bốn SHA-256 khớp trực tiếp file vault. Production hiện có 4 card nguồn/chương trình chính thức và 8 Radar, không modal tự bật. Đây là **promotion hẹp đầu tiên có raw bytes đối chiếu được**.

Không suy diễn phạm vi rộng hơn: các card không phải Deal xác minh, không được thêm giá/eligibility/benefit thương mại. Validator AE mới đối chiếu title/brand/quote/action, chưa bắt buộc binding cho toàn bộ `summary_text`, category và scope. Ngoài ra receipt GitHub đã lưu header `set-cookie`; collector không được lưu hoặc lan truyền header mang cookie/authorization/token dù là session không đăng nhập.

### Lệnh AF — phát hành có ích nhưng tuyệt đối không rò dữ liệu/hợp thức hóa field suy diễn

1. Ghi nhận 4 card ở **Làn B — Chương trình/Nguồn chính thức**, không phải Deal. Giữ link official trực tiếp, badge tầng và disclosure không suy diễn giá/điều kiện. 8 Radar tiếp tục không claim capture/quote/địa bàn/ưu đãi.
2. P0 data minimization: collector phải redact trước khi ghi receipt các header `set-cookie`, `cookie`, `authorization`, `proxy-authorization`, token/API-key và query parameters nhạy cảm; không log body chứa PII. Cách ly 4 receipt hiện có chứa header nhạy cảm vào vault non-served, tạo receipt public/audit đã redacted kèm hash body bất biến và disclosure. Không copy/cố dùng cookie đó cho request khác.
3. Hoàn thiện rendering contract bắt buộc cho mọi field public: `title`, `brand`, `summary`, `category`, `scope`, `visual`, `action`, `price`, `terms`, `expiry`. Field không phải quote literal phải khai báo loại biến đổi (`neutral taxonomy`, `faithful translation`, `editorial summary`) + source span/quote + reviewer; field không chứng minh được không render. Scope `Toàn quốc` chỉ là scope số/toàn cầu khi nguồn cho phép, không đồng nghĩa eligibility tại Việt Nam.
4. Validator/mutation phải dùng receipt redacted và test thêm: secret-header injection, URL query secret, summary không span, category/scope derived không declared, visual không hash/source, action redirect mismatch, source body có PII marker. Cùng gate này là bắt buộc trong promotion command và deploy receipt.
5. Batch supply tiếp tục không gián đoạn: collector chỉ read-only cho Microsoft/Spotify/Apple/Autodesk/AWS/JetBrains; song song mở source discovery cho Làn C. Mỗi item đạt AF contract được promotion B/C/D độc lập; không đợi batch 50 và không hạ tier để chạy số.
6. Council nộp một pack AF: receipt redaction evidence, manifest field-complete, validator/mutation output, browser/live inspection, item promotion/demotion và tác động privacy. CEO kiểm tra mẫu raw/redacted/live trước batch tiếp theo.

**Trạng thái CEO:** `V3.414 — 4 LÀN B OFFICIAL SOURCE ĐẠT HẸP; P0 RECEIPT-SECRET REDACTION + FIELD-COMPLETE CONTRACT; MỞ ACQUISITION INCREMENTAL, KHÔNG GO-LIVE ĐẦY ĐỦ`.

---

## AG. Quyết định CEO P0 ngày 29-08-2026 — AF receipt redaction đạt hẹp, nhưng derivation contract chưa validate source span

CEO đọc trực tiếp receipt AF: giá trị cookie đã được redact và raw hash vẫn đối chiếu được; đây là cải thiện privacy hợp lệ. Tuy nhiên validator AF chỉ bắt buộc `supporting_source_span` *có mặt trong manifest*, không hề kiểm span đó xuất hiện trong raw bytes; cũng không kiểm type taxonomy/scope có được phép hay content-length với manifest. Do vậy declaration “editorial summary/neutral taxonomy/global scope” hiện có thể hợp thức hóa copy suy diễn. Claim “field-complete/100% PASS” không đạt.

### Lệnh P0 — giữ nguồn official, hạ copy chưa bind và sửa validator

1. Dừng mọi promotion mới từ batch AF. Chín item có raw receipt/hash hợp lệ chỉ được giữ trên public ở mức **Nguồn chính thức đã thu thập**, với title/brand/link canonical có quote/raw được kiểm tra. Không được gọi là benefit, ưu đãi hay eligibility.
2. Với mọi `summary_text`, category, scope/`Toàn quốc`, verbatim label, visual và CTA copy: hoặc validator xác nhận source span exact tồn tại trong raw bytes và reviewer/derivation hợp lệ, hoặc thay bằng disclosure tối thiểu “Nguồn chính thức đã thu thập; xem điều kiện trên trang nguồn”. Không nêu “dành cho sinh viên”, “miễn phí”, “gói”, “chính sách”, “cộng tác”, “hỗ trợ” nếu span không chứng minh đúng nghĩa đó.
3. Validator phải bắt buộc: `supporting_source_span` exact tồn tại trong raw; quote/offset byte range; field value/translation mapping; content length và SHA receipt = manifest = raw; canonical/final URL; derivation type thuộc allowlist theo tier. Scope digital phải có câu nguồn hỗ trợ và render “Phạm vi theo trang nguồn”, không mặc định `Toàn quốc` hay eligibility Việt Nam.
4. Mutation engine phải test span không tồn tại, span có nhưng không hỗ trợ nghĩa, offset sai, summary/visual/CTA added without binding, scope `Toàn quốc` derived, content-length mismatch và header name/value lộ. Mutation chạy cùng promotion command trên từng item, không chỉ fixture GitHub.
5. Privacy: receipts redacted chỉ lưu metadata cần thiết; header name/value nhạy cảm bị loại hoàn toàn khỏi bản audit shareable (không chỉ thay giá trị bằng marker). Original receipt nếu cần forensic phải ở vault restricted, không served, access log/retention rõ; không dùng cookie/token hay repeat request mang credential.
6. Data & Trust tiếp tục thu raw batch mới và source discovery Làn C; Design/UX giữ Discovery Shell, saved/search/collection. Item có contract đạt sau AG được phát hành incremental; lỗi copy hạ field/tier, không xóa raw hay dừng research.
7. Council nộp một pack AG: redaction receipt inventory, per-field raw span/offset map, validator/mutation executable output trên cả 9 item, public copy diff, privacy retention/access policy và release rollback. CEO kiểm tra sample raw/live trước batch 10+.

**Trạng thái CEO:** `AF RAW/REDACTION ĐẠT HẸP; P0 DERIVATION-SPAN VALIDATION FAIL — GIỮ 9 OFFICIAL SOURCE LINKS, HẠ COPY CHƯA BIND, DỪNG PROMOTION ĐẾN KHI AG GATE ĐẠT`.

---

## AH. Quyết định CEO P0 ngày 29-08-2026 — AG span/offset đạt hẹp, nhưng title-value mapping vẫn chưa được chứng minh

CEO kiểm tra live v3.416: minimal disclosure, privacy-pruned receipts và span/offset existence là tiến bộ đúng. Tuy nhiên manifest vẫn gán title render dài cho quote ngắn không cùng nghĩa: ví dụ live `Spotify Premium Sinh Viên` chỉ có `exact_quote: Spotify`; `Apple Music Gói Sinh Viên` chỉ cần quote `Apple Music`; `Microsoft 365 Giáo Dục` chỉ cần `Microsoft Education`. Validator kiểm quote **có xuất hiện** nhưng không kiểm `field.value` là quote nguyên văn hoặc translation/normalization trung thành của chính quote đó. Vì vậy title có thể lén thêm benefit/eligibility mà vẫn PASS.

### Lệnh P0 — title là field claim, phải có mapping đúng nghĩa

1. Dừng promotion batch mới. Giữ v3.416 chỉ ở phạm vi `Nguồn chính thức đã thu thập`; tất cả title có thêm Student/Sinh viên, Premium, Gói, 365, Giáo dục, Free, Pro, benefit hoặc eligibility mà chưa có span đúng nghĩa phải hạ ngay về brand/source-label trung tính hoặc không render title mở rộng.
2. Mỗi title/brand/category/scope/summary/action label render phải có một trong hai dạng: (a) `literal` với raw exact quote và byte offset/length; hoặc (b) `faithful_translation`/`normalized_label` với source span đầy đủ, locale, transformation rule, reviewer và semantic-equivalence verdict. Không được dùng substring thương hiệu làm nguồn cho title giàu nghĩa.
3. Validator bắt buộc semantic mapping contract: literal value = exact quote (hoặc encoding-normalized equivalent); transformed value phải có approved transform và source span phải đủ chứa mọi semantic token của title. Cấm identity-less mapping từ `Spotify` → `Spotify Premium Sinh Viên`, từ `Apple Music` → `Apple Music Gói Sinh Viên`, v.v.
4. QA chạy mutation theo toàn bộ 9 title: remove “Student”, change benefit/eligibility/free/price terms, thay source span bằng brand-only substring, đổi locale, dịch sai nghĩa. Gate phải fail cùng promotion/deploy command. Offset cần chỉ rõ **byte offset hoặc Unicode code-point offset**, một quy ước duy nhất; hiện dùng string index không được gọi mơ hồ là byte offset.
5. Design/UX giữ discovery feel bằng layout, collection, save/search, transparent source state và nguồn mới có bằng chứng — không dựa vào title marketing. Radar/affiliate/price rules giữ nguyên.
6. Council nộp một pack AH: title mapping matrix 9 items, raw span/offset convention, semantic reviewer verdict, mutation output từng item, public-copy diff và receipt production. CEO kiểm tra live/raw mẫu trước khi gỡ P0 title gate.

**Trạng thái CEO:** `AG PRIVACY/SPAN-EXISTENCE ĐẠT HẸP; P0 TITLE-SEMANTIC-MAPPING FAIL — HẠ TITLE CHƯA BIND, GIỮ 9 SOURCE LINKS, KHÔNG PROMOTION MỚI`.

---

## AI. Quyết định CEO sau kiểm tra độc lập v3.417 — title literal đạt hẹp; provenance của mọi field render chưa đạt

Hội đồng bảy phòng ban được triệu tập trên cùng một quyết định này. CEO đã tự kiểm tra raw vault, manifest, validator, mutation suite và production `v3.417.0`, không dùng báo cáo triển khai làm bằng chứng. Kết quả độc lập: 9/9 title official (`GitHub Student Developer Pack`, `Notion for Education`, `Microsoft Education`, `Canva`, `Spotify`, `Apple Music`, `Free JetBrains Student Pack`, `Figma for Education`, `AWS Educate`) tồn tại nguyên văn trong raw và hiển thị đúng trên live. Live có 17 thẻ (9 nguồn chính thức, 8 Radar), không có modal tự bật. Title gate AH vì vậy **đạt hẹp**, không phải nghiệm thu M2 hay Go-Live.

Tuy nhiên CEO phát hiện live vẫn render các field chưa được validator chứng minh đúng nghĩa: ví dụ card `AWS Educate` hiển thị brand `Amazon Web Services` nhưng raw binding chỉ là `AWS`; validator chỉ kiểm `exact_quote` có mặt, không kiểm `brand.value` bằng quote hoặc transform được duyệt. Các brand, category `Học tập`, scope, summary, trạng thái và label CTA cũng chưa có rendering contract semantic đầy đủ. Ngoài ra code dùng `String.indexOf`, tức chỉ số **UTF-16 code unit**, không phải Unicode code-point như tên field; 9 title ASCII hiện vô tình cho cùng kết quả, nhưng quy ước sai sẽ làm sai dữ liệu tiếng Việt/emoji. Vì thế không được dùng kết quả `10/10 PASS` để nói “100% provenance”.

### Lệnh tổng lực AI — sửa field contract, phát triển nguồn thật và nâng trải nghiệm mà không thêm claim

1. Engineering và Data & Trust trong một thay đổi nguyên tử phải áp dụng contract cho **mọi field public render**: `title`, `brand`, `category`, `scope`, `summary`, `status`, `CTA label`, `action URL`, visual, price, benefit, terms, locality. Mỗi field hoặc là literal `value === exact_quote`, hoặc là transform trung thành có span đủ nghĩa, locale, rule, reviewer và verdict. Nếu chưa đạt, hạ về disclosure allowlist trung tính hoặc không render. Hạ ngay `Amazon Web Services` thành `AWS` (hoặc bổ sung mapping đúng nghĩa đã duyệt); không suy diễn từ acronym.
2. QA thay validator hiện tại bằng gate field-complete thực sự: kiểm **value**, span, UTF-16/code-point offset theo tên quy ước chính xác, length/range, hash/raw/receipt/canonical URL và mapping manifest → dữ liệu build → DOM production. Thêm mutation trên từng loại field: acronym expansion, đổi category, thêm địa bàn/benefit/price/CTA, transform thiếu reviewer, Unicode trước span, và build DOM khác manifest. Một mutation lọt qua phải fail release; không chỉ chạy fixture Spotify.
3. Không có promotion mới cho đến khi CEO kiểm tra trực tiếp patch này trên raw, validator output và live. Chín source links đã xác minh title được giữ ở tier **Nguồn chính thức đã thu thập**; 8 Radar tiếp tục là theo dõi nguồn, tuyệt đối không đổi thành deal/voucher/địa điểm xác minh.
4. Data & Trust tiếp tục Làn C read-only song song, không chờ QA: ưu tiên các tiện ích công cộng Đà Nẵng có cổng chính thức. Mỗi target chỉ bắt đầu là identifier trung tính; chỉ tăng công khai khi có raw bytes, receipt sạch, field contract và reviewer. Mục tiêu 50/ngày là **50 tín hiệu/target có trạng thái minh bạch**, còn số deal xác minh chỉ bằng số đạt bằng chứng — không hạ chuẩn hay bịa dữ liệu để đủ số.
5. Product, Design, UX/CX và Growth tiếp tục làm Discovery Shell có cảm giác khám phá/mua sắm bằng collection theo nhu cầu, tìm kiếm, lưu cục bộ, bộ lọc tier, card trạng thái dễ hiểu và recheck source; mọi hình/giá/ưu đãi/CTA thương mại chỉ mở khi đúng contract. Trải nghiệm đẹp không được biến Radar hay source link thành lời hứa mua hàng.
6. Affiliate duy trì `PORTAL_ACCESS_NOT_VERIFIED`. Chỉ khi có xác nhận quyền portal, survey toàn catalog AccessTrade ở chế độ read-only; không tạo link, campaign hoặc dùng secret. Không dùng 9 source trên làm catalog affiliate.
7. Council nộp **một pack AI tiếng Việt**: biên bản bảy phòng ban, matrix mọi field render của 9 item, diff hạ field không bind, output gate/mutation trên toàn bộ item, parity manifest-build-DOM, raw/receipt mẫu Làn C, trạng thái 50 target và disclosure AccessTrade. CEO sẽ tự kiểm raw + live trước khi gỡ P0 và trước mọi release lớn.

**Trạng thái CEO:** `V3.417 TITLE LITERAL ĐẠT HẸP; P0 ALL-RENDERED-FIELD SEMANTIC/BUILD-TO-DOM CONTRACT FAIL — GIỮ 9 OFFICIAL SOURCE + 8 RADAR TRUNG THỰC, HẠ FIELD CHƯA BIND, TIẾP TỤC ACQUISITION/UX, CHƯA GO-LIVE ĐẦY ĐỦ`.

---

## AJ. Tổng chỉ thị CEO duy nhất — tăng trưởng Community OS từ v3.418, nguồn thật 50 mục/ngày, UX khám phá và affiliate value-first

### Chương trình họp Hội đồng bảy phòng ban bắt buộc

CEO đã kiểm tra trực tiếp baseline production `v3.418.0`: 17 thẻ (9 nguồn chính thức có manifest-to-build parity và 8 Radar), không có modal tự bật, không có affiliate link. Đây là đầu vào cho Hội đồng Product, Design, UX/CX, Growth, Data & Trust, Engineering và QA; Antigravity phải lập biên bản tiếng Việt ghi rõ đề xuất, phản biện và người chịu trách nhiệm của từng phòng ban trước release lớn. Không làm lại AI, không hạ tier, không coi 17 thẻ là Go-Live hoàn chỉnh.

- **Product:** biến JayT thành nơi khách vào để quyết định “hôm nay tiết kiệm/đi đâu/làm gì”, theo nhu cầu và thời điểm, thay vì bảng dữ liệu kỹ thuật.
- **Design:** tạo Discovery Shell giàu cảm hứng nhưng nguồn, tier và trạng thái luôn dễ nhận biết; không dùng ảnh/giá/ưu đãi minh họa giả.
- **UX/CX:** ưu tiên mobile, tìm kiếm, bộ lọc nhu cầu/tier/khu vực, lưu cục bộ, collections và đường quay lại nguồn chính thức; kiểm thử người dùng/keyboard/zoom trước release lớn.
- **Growth:** xây mạng lưới nguồn chính thức Đà Nẵng và toàn quốc theo nhu cầu sinh viên/nhân viên văn phòng; đo giá trị quay lại, không tối ưu số thẻ rỗng hay click thương mại.
- **Data & Trust:** mở rộng acquisition read-only, raw-first và field contract; phân tầng chính xác Deal xác minh / Chương trình chính thức / Địa điểm xác minh / Radar.
- **Engineering:** xây luồng ingestion, search, saved và Discovery UI dựa trên dữ liệu typed; không để staging/quarantine đi ra public.
- **QA:** gate release theo raw → manifest → build → DOM, kiểm mobile thật, a11y, privacy và regression; CEO tự xem live trước nghiệm thu.

### Mệnh lệnh tổng lực cho Antigravity

1. **Nguồn cung 50 mục hữu ích/ngày:** xây một daily supply board gồm tối đa 50 mục public *phân tầng minh bạch*, không gọi tất cả là deal. Tỷ lệ thực tế thay đổi theo evidence: Deal xác minh chỉ khi có giá/tổng chi phí/điều kiện/thời hạn bind; Chương trình chính thức khi có raw official; Địa điểm xác minh khi tên/địa chỉ/giờ hoạt động đã bind; còn lại là Radar nêu rõ “đang theo dõi nguồn”. Không đủ deal thật thì giữ Radar/target ở trạng thái đúng, không tạo giá, voucher, address, ảnh hay lịch sử giá giả.
2. **Mở rộng acquisition:** hoàn tất 8 target Làn C đang staging, sau đó mở 42 target sạch bổ sung theo các cụm: ăn uống bình dân, cà phê/học tập, rạp/phim, đi lại, thể thao-văn hóa, dịch vụ công, công cụ số và mua sắm thiết yếu. Mọi request read-only, lưu raw bytes/receipt/hash trước parse; 403/login/lỗi giữ ở staging. Không public item chỉ vì đủ quota.
3. **Giao diện và tính năng khách hàng:** phát hành dần các luồng `Hôm nay tiết kiệm gì?`, `Gần bạn có gì?`, `Săn voucher đúng lúc`, collection theo nhu cầu, search, filter tier/khu vực, saved cục bộ, trang chi tiết nguồn và “kiểm tra lại nguồn”. Thiết kế phải tạo cảm giác khám phá/mua sắm vui, nhưng card luôn nói rõ khách đang xem Deal, Chương trình, Địa điểm hay Radar và vì sao JayT chưa thể khuyến nghị Mua/Chờ.
4. **Affiliate value-first:** duy trì `PORTAL_ACCESS_NOT_VERIFIED`. Khi và chỉ khi có quyền AccessTrade hợp lệ, khảo sát **toàn bộ catalog nhìn thấy** ở chế độ read-only, lập inventory merchant/campaign/điều kiện/timestamp/JTBD; không tạo tracking link, campaign, đăng ký hay dùng/copy secret. Card affiliate chỉ xuất hiện khi có giá thật, tổng chi phí, điều kiện, lịch sử quan sát thật và lựa chọn Mua/Chờ phục vụ khách trước hoa hồng.
5. **Cơ chế điều hành liên tục:** trước mỗi release lớn, Council gửi một pack tiếng Việt chung gồm đề xuất/ý kiến bất đồng của cả bảy phòng ban, UX/mobile/a11y evidence, supply board, provenance/affiliate/privacy QA và rollback. Antigravity triển khai các workstream song song nhưng chỉ phát hành khi tất cả gate tương ứng đạt; không chia thành nhiều chỉ thị rời rạc hoặc tự nghiệm thu bằng báo cáo.
6. **Nghiệm thu CEO:** mỗi mốc supply/UX/affiliate phải có raw local evidence và bản live. CEO sẽ kiểm trực tiếp trên production; báo cáo Antigravity chỉ là đầu vào, không thay bằng chứng. Cycle tiếp theo chỉ được đề xuất sau khi có Council pack hợp nhất và live/evidence mới.

**Mốc thành công hiện tại:** tăng từ 17 lên bảng 50 mục/ngày có tier và trạng thái trung thực; tăng số Deal/Địa điểm/Chương trình xác minh theo evidence thực; hoàn thiện Discovery trải nghiệm tốt trên mobile/desktop; affiliate chỉ mở đúng quyền. **Go-Live đầy đủ chưa được tuyên bố** cho đến khi các gate trên đạt và CEO nghiệm thu trực tiếp.

---

## AK. Lệnh CEO khôi phục trải nghiệm Discovery Storefront đã được duyệt — giữ sự thật dữ liệu, bỏ giao diện “bảng kiểm toán”

CEO kiểm tra trực tiếp v3.419.0 và kết luận UX **không đạt định hướng khách hàng**: chức năng filter/collection có tồn tại nhưng phần lớn màn hình là card đồng dạng, copy audit lặp lại và trạng thái kỹ thuật; khách không cảm thấy có gì đáng khám phá hay quyết định ngay. Đây là lệch định hướng sản phẩm, không phải lý do để đưa dữ liệu/visual cũ thiếu provenance trở lại public.

### Hội đồng bắt buộc và lệnh triển khai duy nhất

1. Product, Design, UX/CX, Growth, Data & Trust, Engineering và QA họp một phiên AK trước release. Biên bản phải truy vết **bản storefront được CEO/user duyệt gần nhất** (screenshot, release asset hoặc spec), nêu rõ thành phần nào bị bỏ ở v3.419, thành phần nào được khôi phục, và ý kiến phản biện của từng phòng ban. Không được gọi asset/feed cũ là approved chỉ vì nó nằm trong archive/quarantine.
2. Khôi phục **kiến trúc trải nghiệm**, không khôi phục claim cũ: header gọn có khu vực; hero theo thời điểm; rail chips cuộn ngang; bộ sưu tập có ngữ cảnh; thứ tự nội dung theo “Dùng hôm nay / Chương trình đáng xem / Gần bạn / Radar”, CTA rõ và chuyển động vi mô tinh tế. Bộ lọc nâng cao và số liệu provenance rút vào chế độ chi tiết/“kiểm tra nguồn”, không chiếm màn hình đầu.
3. Thiết kế card phân biệt thật sự bốn tầng bằng hierarchy và nhịp nội dung, không chỉ đổi badge. Deal đã xác minh mới có vị trí hero, visual official và CTA điều kiện; khi chưa có deal thật, rail hero phải nói đúng “đang đối soát ưu đãi hôm nay” và dẫn sang collection hữu ích, không dựng deal trống. Chương trình official dùng card gọn; Địa điểm ưu tiên ảnh/địa chỉ chỉ khi bind; Radar hiển thị nhẹ hơn, không cạnh tranh thị giác với nội dung sẵn dùng.
4. Visual chỉ được dùng khi là (a) asset giao diện trừu tượng không ám chỉ sản phẩm/ưu đãi, hoặc (b) visual chính thức có URL nguồn, hash, field contract, quyền/phạm vi và đúng item. Các poster/ảnh từng nằm trong quarantine hay archive chỉ được phục hồi sau đối soát lại từ nguồn hiện tại; cấm tái dùng để làm web đẹp giả.
5. Engineering thực hiện trên một branch/staging riêng, giữ nguyên v3.419 làm rollback. Design/UX phải nộp desktop + mobile walkthrough của năm hành trình: mở trang, chọn nhu cầu, tìm/lọc, lưu, kiểm tra nguồn. QA kiểm responsive, keyboard/Escape, 200% zoom, contrast và không regression provenance/affiliate. CEO xem trực tiếp staging trước deploy; không tự deploy rồi mới xin duyệt.
6. Data & Trust tiếp tục acquisition 50 mục song song, nhưng UI được dựng bằng data tier hiện có và empty-state hữu ích. Không được trì hoãn UX vì thiếu deal, cũng không được dùng UX làm lý do đưa staging/quarantine lên public.

**Trạng thái CEO:** `V3.419 FUNCTIONAL NHƯNG UX DISCOVERY STORE FRONT FAIL — KHÓA PRODUCTION LÀM ROLLBACK; KHÔI PHỤC BỐ CỤC/NIỀM VUI KHÁM PHÁ TRÊN DỮ LIỆU TRUNG THỰC; CEO DUYỆT STAGING TRƯỚC RELEASE`.

---

## AL. Lệnh CEO bắt buộc — hợp nhất nền tảng, dữ liệu cũ và hồ sơ bàn giao để chỉ nâng cấp, không xây lại

Vấn đề đã xảy ra: trạng thái bị phân tán trong `PROJECT_MEMORY.md`, report, source, archive, release vault và quarantine; header cũ cũng có thể không phản ánh release mới. Từ nay **không một chat/agent nào được coi report hay memory cũ là nguồn sự thật tự đủ**, và không được xây lại JayT từ đầu chỉ vì không tìm thấy bối cảnh.

### Hội đồng hạ tầng và dữ liệu — đầu ra bắt buộc

Product, Design, UX/CX, Growth, Data & Trust, Engineering và QA phải lập một biên bản AL duy nhất bằng tiếng Việt: phạm vi tài sản, chủ sở hữu, rủi ro, các ý kiến không đồng thuận và khuyến nghị migration. Không tuyên bố “đã duyệt” thay CEO.

### Một baseline nền tảng duy nhất phải được tạo và duy trì

1. Tạo `00_PROGRAM_BASELINE/JAYT_245_PLATFORM_REGISTRY_AL.json` (máy đọc) và `00_PROGRAM_BASELINE/JAYT_245_HO_SO_NEN_TANG_VA_BAN_GIAO_AL.md` (người đọc). Hai file là điểm bắt đầu bắt buộc của mọi chat mới; có schema/version, generation time, SHA-256 của chính registry và con trỏ tới directive hiện hành.
2. Registry phải kiểm kê từng tài sản **đang có**, không dựa vào report: relative path, SHA-256, loại tài sản, owner, version/schema, lifecycle (`production`, `staging`, `source-of-truth`, `evidence-vault`, `research`, `archive`, `quarantine`, `tooling`), được public hay không, dependency, last verified time và điều kiện promotion/rollback. Chỉ inventory/hash; không di chuyển, không xóa và không “hợp thức hóa” asset cũ.
3. Hồ sơ bàn giao phải ghi rõ ít nhất: 
   - baseline production hiện hành và deployment receipt/hash; 
   - storefront staging đang chờ CEO duyệt và quy tắc rollback; 
   - source UI, design system/component tokens, hành trình khách, feature flags/local storage; 
   - data pipeline, 4 tier, persistent IDs, raw vault/receipt/manifest/validator; 
   - daily supply board 50 và sự khác nhau giữa public/staging/research; 
   - affiliate permission state, inventory scope và cấm link/campaign/secret; 
   - release pipeline, QA commands/gates, accessibility/mobile evidence; 
   - archive/quarantine registry với lý do cách ly và **cấm public restore**; 
   - lịch sử quyết định CEO còn hiệu lực, việc đang mở, owner và bằng chứng CEO cần kiểm.
4. Chuẩn hóa `PROJECT_MEMORY.md`: không viết lại hoặc xóa lịch sử. Thêm một transaction append-only chỉ chứa pointer/hashes tới baseline AL và cập nhật `CURRENT TRUTH HEADER` qua một transaction có idempotency; header phải phân biệt rõ `production`, `staging chờ duyệt`, `CEO verdict`, `open work` và `quarantine`. Nếu header/memory mâu thuẫn registry hoặc live, registry ghi mâu thuẫn và fail-closed thay vì chọn im lặng.
5. Thiết lập **Upgrade-Only Contract**: mọi thay đổi phải bắt đầu từ registry AL, giữ persistent ID/data contract, khai báo migration input/output/diff, tương thích ngược hoặc migration được phê duyệt, QA regression và rollback target. Cấm replace/overwrite source, design, data model, deploy hoặc memory bằng script “build lại” nếu chưa có inventory/diff/migration receipt. Bất cứ asset cũ nào muốn dùng lại phải đi từ archive/quarantine qua acquisition/evidence gate hiện hành như tài sản mới.
6. Tạo `NEW_CHAT_OPERATING_BRIEF_AL.md` ngắn, tiếng Việt, được link từ đầu registry: thứ tự đọc bắt buộc là brief → registry → directive → current receipt/live → artifact liên quan; nêu rõ không tự deploy, không tin report Antigravity là evidence, không tạo dữ liệu/visual/affiliate claim, và CEO phải kiểm trực tiếp live trước nghiệm thu.
7. QA xây `baseline-integrity` gate chạy trước mọi release: kiểm registry/hash tồn tại, public build chỉ phụ thuộc asset public-allowed, staging không ghi đè production, asset quarantine không bị import, manifest/data IDs không mất không có migration, và release receipt/map đến registry version. Test phải có mutation: xóa registry entry, thay hash, import quarantine, overwrite source, mismatch staging/production.
8. CEO chỉ kiểm trực tiếp registry/hồ sơ, diff inventory, header transaction, integrity output và live/staging rồi mới cho phép công việc AK storefront tiếp tục tới release. Trong thời gian AL, acquisition 50 mục được tiếp tục read-only nhưng không promotion; v3.419 giữ rollback và `v3.420.0-staging.ak` không được deploy tự động.

**Tiêu chuẩn hoàn thành:** chat mới đọc một hồ sơ duy nhất là biết chính xác JayT đang chạy gì, cái gì chỉ staging, dữ liệu nào có chứng cứ, hạ tầng nào được phép dùng và lần nâng cấp tiếp theo phải sửa ở đâu; không có việc “xóa/hợp nhất lại từ đầu” và không có legacy/quarantine lọt public.

---

## AM. Quyết định CEO P0 — baseline AL có inventory nhưng integrity gate chưa chứng minh; sửa atomic trước mọi nâng cấp

CEO kiểm tra trực tiếp AL. Registry và hồ sơ đã tồn tại; hash của các artefact lõi lấy mẫu (`jayt_apex_interface.js`, staging storefront, manifest AI, receipt production) khớp. Nhưng AL **chưa đủ điều kiện hoàn tất**: hash `PROJECT_MEMORY.md` trong registry đã lệch file hiện tại sau transaction AL; `NEW_CHAT_OPERATING_BRIEF_AL.md` không nằm trong registry; gate không xác minh self-hash/actual hash của registry khi chạy; các “mutation” chính là điều kiện tự kiểm object đã bị sửa hoặc string tổng hợp, không gọi một verifier chung trên fixture/copy. Vì vậy PASS AL không được dùng để khẳng định 15.958 tài sản còn nguyên vẹn hoặc Upgrade-Only đã được bảo đảm.

### Lệnh sửa atomic

1. Giữ nguyên production `v3.419.0`, staging `v3.420.0-staging.ak`, raw vault và quarantine; **dừng mọi promotion/deploy** cho đến khi AM đạt. Không xóa, không ghi đè im lặng và không tạo lại platform.
2. Tạo verifier dùng chung duy nhất, độc lập với test, kiểm: schema; self-hash theo thuật toán được ghi rõ (canonical serialization + loại trừ trường self-hash); hash/size/tồn tại của từng entry; registry phải có entry của brief, dossier, directive, memory transaction và core release/source; lifecycle/public flag; production–staging separation; dependency/import quarantine. Verifier trả non-zero khi bất kỳ điều kiện nào sai và sinh receipt nêu file lỗi, không in bí mật.
3. Lập registry lại **sau** khi mọi artefact AL cuối cùng và memory transaction đã ổn định: dùng write-to-new → verify full → atomic rename; trong registry ghi `generated_from_snapshot`, algorithm/version, self-hash method, total/verified/failed count và hash của core manifest. Không để registry tự tham chiếu mơ hồ. Nếu `PROJECT_MEMORY.md` dự kiến append liên tục, đưa nó vào lớp mutable có `snapshot_hash` và mỗi transaction phải cập nhật snapshot qua protocol rõ; không giả vờ nó immutable.
4. Tách hai cấp: `CORE_BASELINE_MANIFEST_AM.json` tối đa các asset quyết định (production, staging, UI, design tokens, 4-tier pipeline, vault manifests, affiliate state, QA/release, directive, brief, memory snapshot, quarantine policy) để chat mới đọc trước; registry đầy đủ chỉ dùng tra cứu theo path/lifecycle. Brief không được bắt chat mới đọc 15.958 entry; phải đọc brief → core manifest → dossier → directive mới nhất → receipt/live, rồi tra registry khi cần.
5. QA thay gate AL bằng test thật: tạo bản copy temp của registry/file/import graph, chạy **cùng verifier**, assert fail; bao phủ registry self-hash sai, core hash sai, memory snapshot stale, brief missing, quarantine import thật, staging overwrite production, entry mất/mismatch lifecycle. Test current baseline trước khi mutation phải PASS; không chấp nhận assertion tautology hay synthetic string không đi qua verifier.
6. Council bảy phòng ban nộp một biên bản AM có owner cho data lifecycle, source/design migration, release/rollback, privacy/quarantine và chat handover. CEO sẽ đối chiếu core hash, receipt full-run, sample path theo lifecycle và live/staging trước khi gỡ P0.

**Trạng thái CEO:** `AL INVENTORY/HANDOVER CÓ TIẾN BỘ NHƯNG INTEGRITY CHƯA ĐƯỢC CHỨNG MINH — P0 AM ATOMIC REGISTRY RECONCILIATION; CẤM PROMOTION, GIỮ BASELINE VÀ CHỈ NÂNG CẤP SAU FULL VERIFY`.

---

## AN. Quyết định CEO P0 — AM dùng hash rút gọn cho file lớn, không phải SHA-256 toàn file

CEO chạy kiểm tra độc lập AM. Verifier đã cải thiện có ý nghĩa so với AL, nhưng `sha256FileFast` chỉ đọc 1 MB đầu cộng kích thước với file lớn hơn 10 MB. Hai asset lớn được lấy mẫu đều có registry hash khác SHA-256 của toàn byte file. Do đó các tuyên bố “15.968 SHA-256 toàn bộ” và `100% integrity` của AM là sai về thuật ngữ/bằng chứng; core manifest cũng có self-hash nhưng không theo canonical method verifier. Đây là lỗi hạ tầng gate, không phải bằng chứng rằng nội dung public bị sai, nhưng đủ để **không gỡ P0**.

1. Không sửa hoặc thay registry AM im lặng. Lưu AM như snapshot historical có disclosure `NON_FULL_FILE_HASH_FOR_LARGE_ASSETS`; dựng registry/core/brief phiên bản AN mới qua atomic write → **full-byte streaming SHA-256** → full verify → atomic rename. Field algorithm phải ghi `sha256_full_file_streaming`; cấm hash prefix, hash mẫu, size-derived hash hoặc gọi chúng là SHA-256 file.
2. Dùng canonical serialization duy nhất có version cho registry **và** core manifest; self-hash exclude field self-hash theo cùng serializer, verifier kiểm cả hai. Bất kỳ file/memory snapshot mutable nào phải có snapshot protocol và disclosure thời điểm snapshot.
3. Verifier AN phải stream toàn bộ byte cho từng entry, kiểm hash + size + tồn tại + core/brief/dossier/directive/memory pointers; report tổng số full-byte verified, failed và tổng byte đọc. Có thể dùng cache theo hash chỉ khi cache entry cũng được full-file verified trong cùng snapshot; không giảm bước xác minh vì kích thước file.
4. Mutation suite phải chạy qua verifier chung trên bản copy temp: thay một byte sau offset 1 MB nhưng giữ nguyên kích thước, đổi core self-hash, đổi registry self-hash, stale memory snapshot, missing brief/core entry, quarantine import và staging overwrite. Baseline thực phải pass trước mutation và từng mutation phải fail; không dùng assertion object/string độc lập.
5. Council ghi rõ ảnh hưởng và data owner; CEO kiểm trực tiếp sample file lớn bằng full hash, core/registry self-hash, full verifier receipt và live/staging trước khi công nhận hạ tầng bàn giao. Giữ production `v3.419.0`/staging `v3.420.0-staging.ak`; cấm promotion/deploy cho đến khi AN đạt.

**Trạng thái CEO:** `AM VERIFIER/GOVERNANCE ĐẠT TIẾN BỘ HẸP; P0 AN FULL-BYTE HASH CORRECTION — KHÔNG CÓ FULL-INTEGRITY ACCEPTANCE, GIỮ ROLLBACK VÀ CẤM PROMOTION`.

---

## AO. Ghi nhận CEO AN — full-byte registry đạt; sửa hai mutation release guard trước khi gỡ P0 hạ tầng

CEO chạy AN độc lập: verifier stream full byte cho 15.973 entry (1.897,66 MB); hai file lớn trước đây lỗi hash nay khớp SHA-256 toàn file; self-hash registry và core manifest khớp. **Phần full-byte registry/core/handover đạt hẹp** và thay thế AM làm baseline tham chiếu cho chat mới.

Tuy nhiên mutation 6 chỉ kiểm một string giả chứa đường dẫn quarantine, mutation 7 chỉ so sánh production/staging hiện tại. Cả hai không sửa fixture/copy rồi chạy `verifyPlatformRegistry`, nên chưa chứng minh release guard fail-closed. Không được diễn giải 7/7 là acceptance toàn phần.

1. Giữ registry AN, core manifest AN và full-byte verifier; không tái lập inventory/hash. Chỉ sửa verifier/test release guard theo một patch AO có diff/migration receipt.
2. Verifier phải nhận `deployPath`/`stagingPath` fixture rõ ràng và kiểm dependency graph/import resolution, không chỉ substring của một file. Một import trực tiếp hoặc gián tiếp vào bất kỳ lifecycle `quarantine`/non-served path phải fail. Production-to-staging guard phải kiểm promotion manifest/version/approved CEO receipt, không coi “khác nội dung” là đủ.
3. Mutation tạo workspace copy tạm, chèn import quarantine thật vào build fixture và thay production fixture bằng staging fixture hoặc promotion manifest không có CEO approval; sau đó gọi **cùng verifier** và assert fail. Cleanup phải an toàn, có receipt; baseline thật chạy verifier trước/sau mutation phải pass.
4. QA bổ sung mutation cho production build dependency gián tiếp, public asset lifecycle không cho phép, staging version leak và rollback pointer mất. Council nộp pack AO ngắn nêu scope correction, không lặp báo cáo/registry.
5. CEO kiểm executable output AO và sample live/staging rồi mới gỡ P0 hạ tầng. Không deploy storefront hoặc promotion content trong lúc AO chưa đạt.

**Trạng thái CEO:** `AN FULL-BYTE BASELINE/HANDOVER ĐẠT HẸP; P0 AO RELEASE-GUARD MUTATION CHƯA ĐƯỢC CHỨNG MINH — GIỮ v3.419 ROLLBACK VÀ STAGING, KHÔNG PROMOTION`.

---

## AP. Ghi nhận CEO AO — baseline bàn giao và release guard đạt hẹp

CEO chạy độc lập verifier AO: full-byte verification, registry/core self-hash, memory snapshot và 9 mutation đã đi qua verifier. Import quarantine fixture, staging overwrite fixture, missing rollback receipt và staging-version leak đều fail-closed; baseline thật pass sau cleanup. Vì vậy **P0 hạ tầng bàn giao/upgrade-only được gỡ ở phạm vi hẹp**: chat mới dùng brief AN → core manifest AN → dossier AN → JAYT-245 → receipt/live, rồi tra registry AN theo path.

Ghi nhận này chỉ áp dụng cho hạ tầng và rollback guard. Không phải CEO duyệt `v3.420.0-staging.ak`, không phải release production mới, không xác nhận 50 deal, không mở affiliate và không thay cho kiểm tra live của CEO. `v3.419.0` vẫn là baseline rollback; storefront staging chỉ được trình CEO sau Council/UX evidence theo AK.

**Trạng thái CEO:** `AO BASELINE/HANDOVER + RELEASE-GUARD ĐẠT HẸP; HẠ TẦNG UPGRADE-ONLY HOẠT ĐỘNG — STAGING STOREFRONT, SUPPLY VÀ AFFILIATE VẪN THEO GATE RIÊNG, CHƯA GO-LIVE ĐẦY ĐỦ`.

---

## AQ. Quyết định CEO tiếp theo — đưa Storefront Staging vào review độc lập, chuẩn bị nghiệm thu UX; production vẫn khóa

Hạ tầng upgrade-only đã đạt hẹp. Nút thắt hiện tại không phải thêm report mà là CEO chưa có môi trường độc lập để xem `v3.420.0-staging.ak`. Vì vậy CEO ra lệnh triển khai review stage, không phải production release.

1. Engineering tạo một deployment **staging/review-only riêng** từ `jayt_storefront_staging.js`, có URL, version `v3.420.0-staging.ak`, commit/source hash, thời gian deploy và rollback target `v3.419.0`. Tuyệt đối không ghi đè production URL, production bundle, service worker cache hoặc receipt `v3.419.0`; staging không chứa secret, PII, affiliate link hay dữ liệu ngoài contract.
2. Design + UX/CX chuẩn bị một review pack ngắn bằng tiếng Việt trên chính staging URL: desktop và mobile, năm hành trình (mở trang, chọn nhu cầu, tìm/lọc, lưu, kiểm tra nguồn), hierarchy bốn tier, empty state khi không có deal, keyboard/Escape, 200% zoom và contrast. Mọi visual phải qua AK visual rule; không dùng archive/quarantine để làm đẹp.
3. Product + Growth đánh giá staging theo câu hỏi khách hàng: trong 10 giây có hiểu “hôm nay xem gì/tiết kiệm gì”, chọn được một hướng khám phá, phân biệt item dùng được với Radar, và biết khi nào cần kiểm tra nguồn. Nộp tối đa 10 lỗi/đề xuất ưu tiên, không viết report chung chung.
4. Data & Trust + QA đối chiếu staging data với manifest AI/current supply board; chạy full verifier AO trước/sau deploy, smoke test route/cache/modal và xác nhận staging không public-promote. Bất kỳ mismatch/claim/visual không bind phải fail stage và rollback staging, không ảnh hưởng production.
5. Council bảy phòng ban họp một phiên AQ, nộp **một** decision pack gồm URL, hashes, visual QA, UX findings, supply/affiliate status, diff staging–production và đề xuất `SHIP` hoặc `NO-SHIP`. Không dùng chữ “CEO approved” trong pack.
6. CEO sẽ kiểm trực tiếp staging URL và quyết định rõ `SHIP`, `REVISE` hoặc `NO-SHIP`. Chỉ quyết định `SHIP` mới mở lệnh upgrade production theo migration/rollback contract. Trong lúc đó Data & Trust tiếp tục Làn C read-only; affiliate giữ `PORTAL_ACCESS_NOT_VERIFIED`.

**Trạng thái CEO:** `AQ STAGING REVIEW EXECUTION — TẠO URL REVIEW ĐỘC LẬP VÀ COUNCIL PACK; v3.419 PRODUCTION KHÓA, KHÔNG DEPLOY/GO-LIVE CHO ĐẾN KHI CEO XEM TRỰC TIẾP`.

---

## AR. Phán quyết CEO trực tiếp trên staging v3.420.0 — REVISE, không SHIP

CEO đã xem trực tiếp `https://jayt-storefront-staging.vercel.app` trên desktop. Staging đã tách môi trường đúng và headline/rail/filter rõ hơn v3.419, nhưng **không đạt chuẩn storefront**: phần item chính hiển thị như ba cột văn bản thay vì card có hierarchy; spacing/CTA/border thô và không nhất quán; ký tự `JT` thừa cạnh brand; collections rail phẳng; Radar và source cards thiếu nhịp thị giác. Đây chưa phải trải nghiệm “đi khám phá và mua sắm”.

Ngoài ra copy collection `Gói Học Tập & Thiết Kế Miễn Phí` là claim benefit chưa được field contract chứng minh cho cả collection. Không được giữ nó chỉ vì đang ở staging.

1. **Không SHIP, không deploy production.** Giữ v3.419 rollback và staging URL hiện tại chỉ để so sánh. Dựng revision `v3.420.1-staging.ar` trên review URL/version riêng, không ghi đè bản CEO vừa đánh giá.
2. Design/Engineering khôi phục card system thực: mỗi source/programme card có surface, viền, padding, thumbnail/monogram hoặc pattern trừu tượng được phép, title hierarchy, metadata gọn, CTA primary rõ; Radar dùng surface nhẹ hơn nhưng vẫn là card hoàn chỉnh. Mục tiêu: lướt 3 card đầu có thể hiểu item, tier, hành động mà không đọc audit text. Không dùng poster/ảnh legacy/quarantine; visual claim phải có contract, còn pattern UI trừu tượng phải được gắn là non-evidence decoration.
3. Sửa toàn bộ visual polish: bỏ `JT` thừa; hệ typography, radius, shadow, spacing, button states và card grid theo một design token system; collections rail có thumbnail/pattern/icon hợp lệ, hover/focus rõ, mobile cuộn ngang có affordance. Không biến app thành bảng text hay form quản trị.
4. Data & Trust rà lại toàn bộ collection/hero/filter/metadata copy như field public: bỏ “Miễn phí”, “tiết kiệm”, “toàn quốc”, “gần bạn” hoặc promise tương đương nếu chưa bind. Dùng copy trung tính: `Công cụ học tập & thiết kế`, `Khám phá theo nhu cầu`, `Phạm vi theo trang nguồn`. Không suy diễn benefit để làm UX hấp dẫn.
5. Product/UX/CX chạy đánh giá 10 giây với tiêu chí đo được: khách nhận ra giá trị JayT, thấy một hướng khám phá, phân biệt card source với Radar, biết CTA kế tiếp. QA nộp screenshot desktop + mobile, 5 journey thật, a11y/200% zoom, visual contract scan và diff AR–AQ. Council nộp một pack AR tối đa 10 finding ưu tiên, không kèm phê duyệt CEO giả.
6. CEO sẽ xem revision AR trực tiếp trước phán quyết tiếp theo. Data acquisition Làn C tiếp tục read-only; affiliate vẫn `PORTAL_ACCESS_NOT_VERIFIED`.

**Trạng thái CEO:** `AQ STAGING ENVIRONMENT ĐẠT; v3.420.0 UX REJECTED — AR REVISE STOREFRONT VISUAL HIERARCHY/COPY, KHÔNG SHIP, PRODUCTION v3.419 KHÓA`.

---

## AS. Phán quyết CEO trực tiếp trên staging AR — giao diện đạt ngưỡng sửa lỗi; supply chưa đạt, không SHIP

CEO đã kiểm tra trực tiếp `https://jayt-storefront-staging-ar.vercel.app` (`v3.420.1-staging.ar`) trên desktop và mobile. Các lỗi AR chính đã được sửa thật: card source có surface/hierarchy/CTA; copy collection đã trung tính; tier Radar được nhận diện riêng; mobile không có horizontal page overflow; thao tác **Lưu** đổi trạng thái hiển thị từ 0 sang 1. Vì vậy **chỉ M1 storefront revision AR được ghi nhận đạt ngưỡng review hẹp**.

Tuy nhiên staging hiện chỉ hiển thị **17 mục (9 nguồn chính thức, 8 Radar)** và **0 Deal xác minh**. Đây là một danh mục nguồn hữu ích khởi đầu, chưa phải bề mặt JayT đủ "deal ngon mỗi ngày" hay trải nghiệm mua sắm để ship production. Claim trong báo cáo về bảng 50 mục không thay thế inventory public đang nhìn thấy. Các card còn có copy lặp, phần lớn là công cụ số phổ quát; thiếu chương trình/địa điểm Đà Nẵng có điều kiện sử dụng rõ để khách ra quyết định ngay. Vì vậy **không SHIP; không deploy production; không gọi Go-Live đầy đủ**.

### Ý kiến Hội đồng trước chỉ thị AS

- **Product:** chuyển trọng tâm từ “catalog nguồn” sang chuỗi quyết định hôm nay: khám phá → hiểu điều kiện → mở nguồn chính thức/lưu → quay lại theo nhu cầu.
- **Design:** duy trì card system AR, nhưng thêm các module discovery theo thời điểm/ngữ cảnh chỉ khi có data contract; không dùng visual giả làm deal.
- **UX/CX:** một khách mới phải thấy rõ item nào dùng ngay, item nào chỉ là Radar, và một CTA kế tiếp trong 10 giây; copy trùng lặp cần được thay bằng thông tin điều kiện thực.
- **Growth:** 50 mục/ngày là mục tiêu supply có phân tầng, không phải 50 "deal"; ưu tiên nguồn Đà Nẵng, sinh viên, nhân viên văn phòng và các nhu cầu lặp hằng ngày.
- **Data & Trust:** hạ ngưỡng *thu thập vào hàng chờ*, không hạ ngưỡng *gắn nhãn Deal xác minh*. Mỗi tier vẫn phải có URL, thời điểm quan sát, phạm vi, field contract và provenance; thiếu field thì hạ tier hoặc không public.
- **Engineering:** tạo revision staging mới từ AR theo Upgrade-Only Contract; không overwrite AR/AQ/production, không tự promotion, không dùng ảnh legacy/quarantine.
- **QA:** kiểm evidence card-by-card, freshness, dedupe, tier labeling, mobile/200% zoom và hành trình lọc/lưu/nguồn trước khi đưa CEO xem.

### Lệnh tổng lực hợp nhất AS

1. **Khóa release:** giữ production `v3.419.0`; giữ AQ và AR làm mốc review; tạo review URL/version riêng `v3.420.2-staging.as`, kèm source hash, deploy receipt, diff AR→AS và rollback pointer. Không có cụm từ hoặc artefact nào được diễn giải là CEO đã duyệt production.
2. **M2 — tạo supply thực theo hai tốc độ:** Data & Trust/Growth quét read-only các nhà cung cấp và kênh chính thức thuộc 6 nhu cầu: ăn uống, rạp/giải trí, đi lại, học tập/công cụ, sức khỏe/đời sống, mua sắm thiết yếu. Ưu tiên đơn vị có trang chính thức tại Đà Nẵng và chương trình sinh viên/nhân viên văn phòng. Hàng chờ được phép rộng; public chỉ sau evidence gate. Mỗi ngày nộp bảng gồm: nguồn URL, thời điểm quan sát, địa bàn, loại, điều kiện, hiệu lực nếu có, tier đề xuất, lý do loại trừ/dedupe và raw evidence pointer. Không tạo giá, voucher, địa chỉ, số điện thoại, ảnh hoặc điều kiện còn thiếu.
3. **Mục tiêu public đầu tiên:** không pad số. Chỉ khi có evidence độc lập, xây inventory **tối đa 50 mục minh bạch** với baseline mục tiêu: `Deal xác minh` chỉ từ deal có giá trị + điều kiện + hiệu lực quan sát được; `Chương trình/coupon chính thức` từ trang chính thức; `Địa điểm xác minh` từ địa chỉ/phạm vi có nguồn; còn lại `Radar`. Bất kỳ thiếu bằng chứng nào phải là Radar hoặc không xuất hiện. Báo cáo phải nêu rõ số thực từng tier, không dùng tổng 50 để che số Deal bằng 0.
4. **M1 — chuyển catalog thành discovery có giá trị:** giữ nguyên hệ card AR; bổ sung cho từng card public các trường đã chứng minh: “dùng cho ai”, “khi nào dùng”, “điều kiện/giới hạn”, “địa bàn/phạm vi”, “quan sát lần cuối” và CTA theo tier. Không được lặp một đoạn mô tả chung cho mọi card. Chỉ mở module “Hôm nay đáng xem”, “Gần bạn”, countdown, savings, best price hoặc price history khi contract tương ứng có dữ liệu thật; nếu chưa có, dùng discovery trung tính theo nhu cầu/thời điểm.
5. **M3 — affiliate:** lập ma trận toàn catalog AccessTrade theo nhu cầu khách hàng, nhưng trạng thái vẫn `PORTAL_ACCESS_NOT_VERIFIED`. Chỉ khảo sát read-only khi có portal đăng nhập hợp lệ được xác nhận; không đăng ký campaign, tạo link, gửi form, dùng secret hay render CTA affiliate. Khi có permission, mỗi candidate phải chứng minh total cost, điều kiện và lịch sử quan sát thật trước khi mới được đưa quyết định Mua/Chờ.
6. **QA/Council/CEO:** QA tạo evidence ledger cho toàn bộ item AS và nộp mobile + desktop, 5 journeys, visual/copy scan, freshness/dedupe/tier report. Council nộp **một** pack AS tối đa 10 finding, gồm rõ số thực từng tier và các claim bị loại. CEO sẽ trực tiếp kiểm tra `v3.420.2-staging.as` rồi mới chọn `REVISE`, `NO-SHIP` hoặc `SHIP` có điều kiện. Không tự nghiệm thu bằng test, report hoặc nhãn PASS.

**Trạng thái CEO:** `AR UI REVIEW HẸP ĐẠT; M2 SUPPLY PUBLIC 17/50, DEAL XÁC MINH 0 — AS TỔNG LỰC DATA TRUTH + DISCOVERY UX + AFFILIATE READ-ONLY, KHÔNG SHIP, PRODUCTION v3.419 KHÓA`.

---

## AT. Phán quyết CEO trực tiếp AS — false provenance ở Tier Deal; cô lập theo item, không dừng phát triển

CEO đã kiểm tra trực tiếp `https://jayt-storefront-staging-as.vercel.app` và đối chiếu hai card CGV với raw capture thật trong `EVIDENCE_LEDGER_BATCH_132.json`.

- `DEAL_120_CGV_MUA1TANG1`: raw capture có hash khớp ledger và xác nhận một chương trình VNPAY/app ngân hàng, nhưng ghi **áp dụng toàn quốc, đến 30/09/2026, số lượng giới hạn và phải nhập mã**. Card AS lại công bố phạm vi Đà Nẵng, thứ 6–chủ nhật hằng tuần, không ghi thời hạn/mã/giới hạn, đồng thời CTA lại trỏ trang chủ `https://www.cgv.vn` thay vì exact evidence URL. Các field public không còn provenance tương ứng.
- `DEAL_120_CGV_ZALOPAY_12H`: raw capture có hash khớp ledger nhưng chỉ là trang **danh sách** ưu đãi CGV; không có text/chứng cứ cho ZaloPay, mức `50.000₫`, khung `12:00–13:30` hay điều kiện được public. Card AS và CTA trang chủ là **false provenance**.

Giao diện AS vẫn là tiến bộ UX; 34 card không được mặc định sai. Nhưng hai chứng cứ trên đủ bác bỏ claim “6 Deal xác minh/100% điều kiện riêng biệt” như một kết luận tổng quát. Đây là lỗi data contract/provenance, không được che bằng dashboard, hash ledger hay kết quả test.

### Ý kiến Hội đồng trước chỉ thị AT

- **Product/UX/CX:** giá trị khách hàng chỉ xuất hiện khi điều kiện card đúng bằng điều kiện nguồn; một card deal sai làm mất niềm tin cho cả storefront.
- **Data & Trust:** demote/cô lập theo item và field; không đóng toàn bộ acquisition, nhưng không suy diễn địa bàn, hiệu lực hoặc lợi ích từ brand/page tổng.
- **Design/Growth:** giữ layout AS, hiển thị freshness và phạm vi thật; không dùng badge đỏ/CTA mạnh để bù dữ liệu thiếu.
- **Engineering/QA:** evidence binding phải là machine-checkable giữa public card, exact URL, capture hash và field extracts; một URL home/list page không đủ cho Deal.

### Lệnh tổng lực AT

1. **Không SHIP.** Production `v3.419.0` tiếp tục khóa. Không ghi đè AS/AR/AQ. Dựng `v3.420.3-staging.at` riêng với diff/migration receipt/rollback pointer; CEO chỉ xem URL AT sau khi có certification thực.
2. **Cô lập đúng hai card ngay trong revision AT:** `CGV ZaloPay 50.000₫` rút khỏi public supply và đưa vào quarantine/candidate với reason `NO_FIELD_LEVEL_EVIDENCE`; không giữ dưới Radar nếu title/price/condition chưa chứng minh. `CGV VNPAY Mua 1 Tặng 1` chỉ được giữ nếu rebuild từ exact capture: URL chi tiết, toàn quốc nếu đó là phạm vi nguồn, thời hạn, mã, quota và giới hạn đồng thời; nếu không thể render đúng thì demote/remove. Không gán quyết định này cho tất cả 4 Deal còn lại.
3. **Certification 34 item theo field, không theo report:** Data & Trust lập một immutable `PUBLIC_CARD_EVIDENCE_BINDING_AT` cho mỗi item/card gồm persistent ID, tier, từng field public (title/price/voucher/condition/time/scope/address), exact official URL, captured-at, capture hash/path, TTL/freshness, extractor/reviewer, và lý do tier. Script QA phải fail khi một field public thiếu binding, URL khác evidence URL, capture hash sai, TTL hết hạn, duplicate, hoặc card dùng giá/địa chỉ/điều kiện không có source. Cấm ghi “100%” trước khi output verifier độc lập pass.
4. **Recapture read-only trước promotion:** những Deal có `captured_at` cũ hoặc expiry/field không rõ phải được mở lại từ exact URL ở chế độ read-only, lưu raw bytes+header/timestamp+hash. Redirect, 404, list page, login wall hoặc nội dung thay đổi là fail/degrade chứ không được thay bằng trang chủ/quote cũ. Không tạo hay gửi bất cứ form, voucher, affiliate link hoặc campaign nào.
5. **Sửa UX để honesty tạo ra trải nghiệm tốt hơn:** card Deal hiển thị “Đã kiểm tra lúc…”, hiệu lực, scope, giới hạn và link nguồn chính xác; Radar không có giá/ưu đãi suy diễn. Khi customer mở CTA, đây là outbound official link, không phải link affiliate. Chỉ sau verified contract mới xuất hiện price/savings/“dùng ngay”; không thêm decorative poster là evidence.
6. **Supply không dừng:** Growth/Data tiếp tục Làn C và hàng chờ read-only để tiến tới 50 mục phân tầng. Bảng supply phải báo hai số riêng: `public certified now` và `candidate awaiting evidence`, không nâng số public bằng candidate. Affiliate giữ `PORTAL_ACCESS_NOT_VERIFIED`.
7. **QA/Council/CEO:** Council nộp một pack AT tối đa 10 finding, kèm verifier receipt, danh sách item/field bị demote, link exact source và screenshots desktop/mobile. Không có Council/Antigravity report nào là CEO approval. CEO sẽ kiểm trực tiếp staging AT rồi mới ra verdict tiếp theo.

**Trạng thái CEO:** `AS UX TIẾN BỘ; TIER DEAL AS FAIL PROVENANCE (CGV VNPAY FIELD MISMATCH, CGV ZALOPAY UNPROVEN) — AT CÔ LẬP 2 ITEM + FIELD-LEVEL CERTIFICATION, SUPPLY READ-ONLY TIẾP TỤC, KHÔNG SHIP, PRODUCTION v3.419 KHÓA`.

---

## AU. Phán quyết CEO trực tiếp AT — containment đúng, nhưng “field certification” chưa có cấu trúc chứng minh

CEO đã xem trực tiếp `https://jayt-storefront-staging-at.vercel.app` và đọc `PUBLIC_CARD_EVIDENCE_BINDING_AT.json`. Hai kết quả cần phân biệt:

1. **Đạt hẹp:** `CGV ZaloPay 50.000₫` không còn public; `CGV VNPAY Mua 1 Tặng 1` đã được dựng lại đúng raw capture đã kiểm (exact URL, phạm vi toàn quốc, hạn 30/09/2026, mã `MUA1TANG1`, quota). Đây là containment/correction hợp lệ.
2. **Không đạt certification:** file được gọi là `PUBLIC_CARD_EVIDENCE_BINDING_AT` thực chất chủ yếu lặp lại object card (title, scope, time, condition, URL, free-text status). Nó **không** có binding kiểm được cho từng field tới `capture_path`, `capture_sha256`, timestamp capture, exact quote/span hoặc reviewer. Vì thế test “PASS 33 mục” chứng minh các object tự nhất quán, không chứng minh 33 field contract với raw evidence. Nhãn live `33 MỤC CHỨNG THỰC` và câu “100% có điều kiện rõ ràng” không được dùng làm kết luận CEO.

Ngoài ra các card Radar vẫn public địa chỉ, giờ hoạt động và điều kiện chi tiết trong khi chính `evidence_status` thừa nhận chưa có capture cục bộ/giá/theo điểm bán. Radar được phép có brand + mục đích theo dõi + URL nguồn, không được mượn nhãn Radar để công bố field địa phương chưa chứng minh.

### Ý kiến Hội đồng trước chỉ thị AU

- **Data & Trust/QA:** record data không phải evidence binding. Bằng chứng phải trace ngược được từ **mọi field public** đến raw bytes/source cụ thể và fail-closed khi mất trace.
- **Product/UX/CX:** transparency tốt phải làm khách hiểu mức chắc chắn, không tạo cảm giác tin sai qua badge/count/hộp điều kiện đầy đủ.
- **Growth/Design:** giữ phong cách storefront AT; thay “được chứng thực” bằng thông điệp trung thực theo tier cho tới khi data contract hoàn tất.
- **Engineering:** chỉ nâng cấp AT qua migration/diff, không build lại hay xóa lịch sử/staging.

### Lệnh tổng lực AU

1. **Không SHIP.** Giữ production `v3.419.0` và AT nguyên trạng làm audit snapshot. Dựng `v3.420.4-staging.au` riêng, không ghi đè các stage trước.
2. **Xây evidence binding thật, không tự tham chiếu:** mỗi public field phải có một record máy đọc được gồm `item_id`, `tier`, `public_field`, `public_value_hash`, `exact_source_url`, `capture_path`, `capture_sha256`, `captured_at`, `quote_or_byte_span`, `fresh_until`, `reviewer`, `reviewed_at`, `status`. Field không có raw source phải absent khỏi UI hoặc tier-appropriate pending state; không ghi hash/status bằng text diễn giải. QA chạy parser so sánh source data → binding → rendered staging và mutation ít nhất: đổi một field UI, đổi URL, mất capture, đổi capture sau quote/span, TTL hết hạn. Tất cả phải fail.
3. **Tách Radar đúng nghĩa:** với 13 Radar, chỉ giữ field tối thiểu đã chứng minh: brand/name nguồn, category, URL chính thức, mục đích theo dõi, last observed (nếu có). Gỡ hoặc đánh dấu `chưa xác minh` cho địa chỉ, giờ hoạt động, chi nhánh, khuyến mại, điều kiện, giá và số lượng khi chưa có binding riêng. Không dùng card Radar để tạo cảm giác item dùng ngay.
4. **Nhãn public trung thực:** trước khi AU verifier pass, không dùng `chứng thực`, `100%`, `verified/certified now` như claim toàn bộ. Đếm hiển thị phải tách: `đã kiểm theo field`, `nguồn chính thức`, `Radar đang theo dõi`, `candidate đang rà soát`. Không hạ ngưỡng Deal; thay vào đó hạ ma sát vào hàng chờ và tăng tốc recapture read-only.
5. **Phát triển song song không bị dừng:** giữ UI/card/collection AS–AT làm nền; Data/Growth tiếp tục quét read-only 6 nhu cầu và lập candidates để tiến tới 50 mục. Không public promotion chỉ để đạt KPI; daily board báo số certified, pending, rejected và reason code. Affiliate vẫn `PORTAL_ACCESS_NOT_VERIFIED`, cấm CTA/link/campaign.
6. **Council/CEO:** Council nộp một pack AU ngắn gồm schema, migration diff, output verifier/mutation, list field bị gỡ/demote, screenshots desktop/mobile và số thật từng tier. CEO sẽ tự kiểm staging AU; report/test không được tự gán CEO approval.

**Trạng thái CEO:** `AT CONTAINMENT CGV ĐẠT HẸP; AT FIELD-CERTIFICATION FAIL (SELF-REFERENTIAL BINDING + RADAR LOCAL FIELD UNBOUND) — AU XÂY TRACEABLE FIELD EVIDENCE, GIỮ SUPPLY/UI UPGRADE-ONLY, KHÔNG SHIP, PRODUCTION v3.419 KHÓA`.

---

## AV. Yêu cầu CEO khôi phục v3.397.0 — forensic retrieval trước, staging recovery sau, không rollback mù quáng

CEO đã kiểm local workspace/release vault: hiện **không có** bundle, deployment receipt hoặc source snapshot có thể kiểm hash cho live `v3.397.0`; chỉ còn một QA test lịch sử nhắc tới version này. Test đó không phải artifact deploy và spec của nó còn yêu cầu các field affiliate/price-history/advisor verdict vốn không được public theo quy chế hiện tại khi chưa có dữ liệu thật. Vì vậy không được coi v3.397.0 là một rollback target sẵn sàng và không được copy/restore từ memory, screenshot, report hoặc file test.

### Lệnh phục dựng có kiểm soát

1. Engineering/Data & Trust truy xuất **read-only** lịch sử Vercel/project deployment để xác định deployment ID, URL, thời điểm, commit/source artifact và hash của đúng `v3.397.0`. Không promote, alias production, sửa project setting, xóa deployment hoặc dùng secret mới. Nếu không còn artifact nguyên vẹn thì ghi nhận `NOT_RECOVERABLE_FROM_DEPLOY_HISTORY`, không tái tạo theo trí nhớ.
2. Nếu artifact tồn tại và hash xác minh được, dựng **một staging forensic riêng** `v3.397.0-forensic` với URL riêng, chỉ để CEO so sánh trực tiếp. Không ghi đè `v3.419.0`, AQ–AT/AU hay deploy hiện hành. Kèm receipt: deployment ID gốc, hash bundle gốc, hash clone, diff với production và danh sách external links/service worker/cache.
3. QA/Data & Trust kiểm v3.397.0-forensic bằng quy chế hiện tại: quét false provenance, fake price/voucher/price history, affiliate link/CTA, visual legacy/quarantine, address/phone/source mismatch, consent/PII và release guard. Mọi item/hành vi vi phạm được cô lập khỏi bản recovery; không gọi forensic clone là “live” hoặc “đã duyệt”.
4. Design/Product lập diff “những gì cần lấy lại” theo component/interaction (layout, discovery flow, card rhythm, navigation) tách hẳn khỏi data/claim/affiliate legacy. Chỉ các component không mang evidence claim mới có thể được migrate upgrade-only vào storefront hiện tại sau Council và CEO review; không rollback cả platform chỉ để lấy UI.
5. Council nộp một pack AV bằng tiếng Việt gồm evidence recoverability, screenshots 397 forensic nếu có, compliance diff, rollback/migration plan và verdict đề xuất. CEO sẽ xem trực tiếp trước khi quyết định một trong ba phương án: `KHÔNG KHÔI PHỤC`, `MIGRATE CHỌN LỌC UI`, hoặc `ROLLBACK CÓ ĐIỀU KIỆN`. Không có phán quyết đó thì production vẫn `v3.419.0` khóa.

**Trạng thái CEO:** `v3.397.0 CHƯA CÓ ARTEFACT/RECEIPT CÓ THỂ XÁC MINH TẠI LOCAL — AV FORENSIC RETRIEVAL/STAGING-ONLY ĐƯỢC ỦY QUYỀN; CẤM RESTORE THEO MEMORY VÀ CẤM PRODUCTION ROLLBACK CHO TỚI KHI CEO KIỂM TRỰC TIẾP`.

---

## AW. Phán quyết CEO về v3.397.0 — không thể rollback chính xác với bằng chứng hiện có; bảo toàn hướng khôi phục UI có kiểm soát

CEO xác nhận độc lập local release vault/workspace không có bundle source hoặc deployment receipt hash-verified cho `v3.397.0`. Lệnh đọc deployment history hiện cũng không trả được artifact có thể xác minh trong phiên kiểm trực tiếp. Vì vậy trạng thái chính xác là **`EXACT_ROLLBACK_BLOCKED_BY_MISSING_VERIFIABLE_ARTIFACT`**, không phải “đã phục dựng” hay “không bao giờ tồn tại”. Không thể đưa lại đúng v3.397.0 lên live một cách trung thực tại thời điểm này.

1. **Không rollback production và không tái tạo v3.397.0 từ test, memory, báo cáo hoặc mô tả.** Test lịch sử chỉ là manh mối kỹ thuật; không phải source/deployment và có invariant legacy không phù hợp quy chế hiện tại.
2. **Không dừng phát triển.** Tiếp tục AU trên nền giao diện/card system hiện tại và lệnh supply/trust đang mở. Không xóa AT/AU hay bất kỳ stage cũ nào.
3. Engineering thực hiện một truy xuất cuối cùng, read-only và có receipt: Vercel deployment list/API nếu session cho phép, domain alias history, release vault deployment IDs và source-control refs. Output phải nêu command/status/deployment IDs/hash; `no output`, redirect hoặc thiếu quyền là `INCONCLUSIVE`, không được đổi thành “đã quét hết”. Không tạo project/deployment, không alias production.
4. Nếu không tìm được artifact gốc sau truy xuất có receipt, kết thúc nhánh exact rollback bằng record `NOT_RECOVERABLE_WITH_CURRENT_EVIDENCE`. Chỉ được **migrate UI chọn lọc** khi có một reference được xác định rõ (bundle hash, commit, export hoặc screenshot do chủ dự án cung cấp). Migrate theo component/interaction, vào staging mới, không mang data/affiliate/price-history legacy và không gọi phiên bản mới là v3.397.0.
5. Council nộp một pack AW ngắn: kết quả retrieval có thể tái lập, danh sách reference hợp lệ, component được phép migrate, component bị cấm, diff/rollback plan. CEO xem trực tiếp staging kế tiếp trước bất kỳ quyết định release nào.

**Trạng thái CEO:** `v3.397.0 EXACT ROLLBACK BLOCKED — CHƯA CÓ BẰNG CHỨNG ARTIFACT GỐC; HOÀN TẤT RETRIEVAL CÓ RECEIPT HOẶC MIGRATE UI CHỌN LỌC TỪ REFERENCE HỢP LỆ, KHÔNG SHIP/ROLLBACK PRODUCTION`.

---

## AX. Quyết định CEO — khôi phục bề mặt sản phẩm và workstreams JAYT-242 theo reference chủ dự án xác nhận

Chủ dự án đã xác nhận lại nguyên văn **JAYT-242 — Full Go-Live Community OS** là reference sản phẩm cần khôi phục. Vì vậy JAYT-242 không chỉ là tài liệu lịch sử/containment: nó là **baseline chức năng và trải nghiệm** cho giai đoạn nâng cấp tiếp theo. Đây là lệnh khôi phục bề mặt sản phẩm theo reference người dùng, không phải tuyên bố đã tìm lại binary `v3.397.0`.

**Điểm cần nói rõ:** không có source bundle v3.397.0 để làm bản copy pixel-identical. Nhưng các mục trong JAYT-242 đã được chủ dự án chỉ định là yêu cầu có thẩm quyền để Engineering dựng lại trên nền hiện hành. Không được gắn version mới là `v3.397.0`, không đem lại data/affiliate/price history legacy, và không được lấy Workstream 0 làm lý do thu hẹp JayT thành một dashboard audit.

### Quyết nghị Hội đồng AX

- **Product:** khôi phục Daily Decision OS: khách vào thấy “hôm nay làm gì có lợi”, chọn bối cảnh, khu vực và hành động kế tiếp; phân tầng evidence hiển thị rõ nhưng nằm dưới giá trị khách hàng.
- **Design:** dựng premium discovery storefront, dark/light mode đồng nhất, card có hình/logo chỉ khi provenance; thiếu asset dùng neutral pattern/monogram rõ là UI decoration.
- **UX/CX:** mobile-first, 10-second comprehension, empty/radar/expired state tử tế; modal chi tiết giải thích điều kiện, hạn, cách nhận và vì sao cần kiểm tra.
- **Growth:** vận hành daily loop sáng–trưa–chiều–tối, cohort quanh campus/văn phòng và 6 khu vực Đà Nẵng; 30–50 là mix nội dung, không phải 30–50 Deal.
- **Data & Trust:** Workstream 0 là gate cho claim, không là gate cho navigation/discovery. Mỗi surface dùng tier/field truth đúng; map/gần bạn/chỗ cụ thể chỉ xuất hiện khi có place evidence.
- **Engineering:** cải tạo upgrade-only từ AU/AT, giữ persistent IDs, evidence binding/migration receipt, performance/accessibility; feature flags cho module chưa đủ data.
- **QA:** kiểm live desktop/mobile theo journey thật, semantic claim scan, links/modal/map/filter/theme/keyboard/200% zoom; report không thay CEO review.

### Lệnh tổng lực khôi phục JAYT-242

1. **Dựng staging riêng `v3.421.0-staging.ax`**, bắt đầu từ source/staging AU sau khi giữ các guard đã có; không overwrite production/AT/AU/AQ/AR/AS. Nộp migration manifest theo component, data contract và visual diff. Không deploy production.
2. **Khôi phục đúng các bề mặt chức năng JAYT-242:**
   - Home `Hôm nay tiết kiệm gì?` theo nhịp sáng/trưa/chiều/tối, với content chỉ hiện khi tier/field tương ứng đủ evidence; lúc thiếu dữ liệu dùng discovery trung tính/radar, không bịa deal.
   - Rail/bộ lọc khu vực **Hòa Khánh, Ngũ Hành Sơn, Hải Châu, Thanh Khê, Sơn Trà**; mặc định `Toàn Đà Nẵng`. “Gần bạn”/map chỉ dùng địa điểm có lat/lng hoặc address/source contract thật; còn lại hiển thị `chưa xác minh vị trí`.
   - Collections cho lịch phim/kèo nhóm/cafe học bài/ăn trưa/đi lại/đồ KTX và trải nghiệm cuối tuần; mỗi collection phải có empty state hữu ích, không placeholder giả.
   - Hub **`Mua món này có hời không?`** và hub voucher được dựng đầy đủ UI/state. Chỉ bật verdict `Nên mua / Nên chờ` khi thỏa toàn bộ gate JAYT-242 M3: URL, giá quan sát, tổng thực trả, terms/scope/expiry, lịch sử quan sát thật, disclosure/provenance và QA re-fetch. Nếu thiếu bất kỳ field nào, hub phải hiển thị `Chưa đủ dữ liệu để kết luận`, không price history/coupon/deep link giả.
   - Modal chi tiết tier-aware: nguồn chính xác, thời điểm kiểm, điều kiện, hạn, cách nhận/cách kiểm tra và CTA theo tier. Ảnh/logo chỉ dùng khi contract evidence cho phép; CTA affiliate mặc định off.
   - Theme dark/light và mobile-first hoàn chỉnh; card không còn là text khô nhưng visual decoration không được hàm ý brand/deal/xác minh.
3. **M2 supply theo mix JAYT-242 tiếp tục song song:** mục tiêu vận hành hằng ngày là Deal xác minh 5–10, Chương trình/coupon chính thức 10–15, Địa điểm/tiện ích xác minh 15–20, Radar 10–15. Bảng public phải báo **số thật** theo tier; candidate không được trộn với content certified. Không dừng cohort scan lớn: rạp, F&B chuỗi, campus/cafe học–làm, giao thông, sách/học tập, đồ KTX, cuối tuần, tiện ích công.
4. **M3 affiliate đúng cốt lõi:** khi và chỉ khi portal scope đã được xác nhận, khảo sát read-only toàn catalog AccessTrade, lập portfolio Top 30 theo customer need/eligibility/fulfillment/return/terms/live-data rồi commission mới là secondary. `PORTAL_ACCESS_NOT_VERIFIED` hiện vẫn giữ nguyên; cấm tạo campaign/deeplink/coupon/CTA affiliate hoặc gửi dữ liệu.
5. **Giữ và hoàn thành AU evidence remediation trong chính AX:** mọi claim public ở mọi module phải trace field-level. Không có chứng minh thì hạ tầng/radar/empty state được ship, claim commercial không được ship. Cô lập false provenance theo item, không dùng containment để chặn toàn bộ supply/UX.
6. Council nộp **một** pack AX: screenshots desktop/mobile của 6 surface, journey map, component/migration diff, supply ledger thật, affiliate state, QA/a11y/freshness output và danh sách no-ship. CEO sẽ trực tiếp xem `v3.421.0-staging.ax` trước khi quyết định release. Không report/test nào tự nhận CEO approved.

**Trạng thái CEO:** `JAYT-242 PRODUCT SURFACE RESTORATION ĐƯỢC TÁI ỦY QUYỀN THEO REFERENCE CHỦ DỰ ÁN — AX KHÔI PHỤC DAILY DISCOVERY/KHU VỰC/NEARBY/VOUCHER/BUY-DECISION UI TRÊN NỀN UPGRADE-ONLY; WORKSTREAM 0 VẪN BẮT BUỘC, KHÔNG SHIP PRODUCTION`.

---

## AY. Phán quyết CEO sau design critique AX — thiết kế lại toàn bộ storefront, không vá dashboard hiện tại

CEO đã xem trực tiếp `v3.421.0-staging.ax`. AX có đủ chức năng JAYT-242 ở mức sơ đồ, nhưng **thiết kế không đạt**: navigation quá nhiều mục ngang; hero lớn nhưng chung chung; chip/filter dày đặc; collections và content cards đồng dạng, text-first; emoji/monogram/chip tạo cảm giác dashboard nội bộ thay vì trải nghiệm khám phá–mua sắm. Khách không có một điểm khởi đầu đủ hấp dẫn hay một tuyến hành trình thị giác rõ. Không được tiếp tục “thêm feature vào AX” theo kiểu vá.

### Quyết nghị Hội đồng AY

- **Product:** trang chủ phải giải quyết một quyết định ngay, rồi mở ra khám phá; không đổ tất cả hub/filter lên fold đầu.
- **Design:** một art direction thống nhất “JayT Daily Guide”: ấm, có tính địa phương, editorial/storefront, có nhịp và khoảng thở — không phải card-grid SaaS.
- **UX/CX:** 2 giây hiểu JayT cho ai; 10 giây chọn được `Ăn gì`, `Đi đâu`, `Cần mua gì` hoặc `Gần bạn`; detail là lớp thứ hai, không nhồi mọi metadata vào card.
- **Growth:** tạo lý do quay lại bằng daily moments/curated routes, không bằng badge/count/claim tiết kiệm.
- **Data & Trust:** trust chỉ xuất hiện đúng điểm quyết định qua tier/source/freshness; evidence chi tiết vào modal, không biến home thành audit log.
- **Engineering/QA:** redesign từ token/component contract, mobile-first và test visual regression/a11y; không đổi data identity/evidence gate để làm UI đẹp.

### Lệnh tổng lực redesign AY

1. **Dựng `v3.422.0-staging.ay` riêng**, upgrade-only từ AX/AU, không overwrite stage nào và không deploy production. Đây là redesign toàn trang, không phải CSS polish.
2. **Information architecture mới:** navigation desktop chỉ giữ tối đa `Hôm nay`, `Khám phá`, `Đã lưu`, profile/menu; `Voucher`, `Mua hời không?`, `Gần bạn` trở thành destination/section có CTA ngữ cảnh thay vì năm tab cùng cấp. Mobile dùng bottom navigation 3–4 mục, không dùng thanh tab chữ dài.
3. **Home như một daily guide:**
   - Hero ngắn, có một câu hứa giá trị rõ và một primary action; nền/pattern địa phương trừu tượng được phép nhưng không phải evidence.
   - Ba cửa vào nổi bật: **Ăn gì hôm nay / Đi đâu sau giờ học-làm / Cần mua gì**; nhịp sáng–trưa–chiều–tối là secondary contextual switch.
   - Một rail `Dùng hôm nay` chỉ hiển thị Deal/Programme đủ field; tiếp theo là `Gần bạn` (nếu place data thật) và `Ý tưởng cho ngày của bạn` từ collections. Empty state phải chuyển khách sang Radar/collection phù hợp.
4. **Hệ card có mục đích, không đồng dạng:** Deal card ưu tiên value + thời hạn/CTA; programme card ưu tiên eligibility; place card ưu tiên địa bàn/hoạt động; Radar dùng treatment nhẹ và không có CTA thương mại. Card list chỉ lộ 2–3 metadata quyết định; detail/evidence mở qua modal/drawer. Không dùng poster/logo/ảnh merchant nếu chưa có asset contract; dùng illustration/pattern/monogram non-evidence và label rõ.
5. **Design system thực sự:** xây tokens typography, spacing 4/8pt, radius, elevation, light/dark surfaces, semantic colors theo tier (không dùng màu đơn thuần để ngụ ý verified), icon system không emoji lẫn lộn, focus/hover/pressed/loading/empty states. Layout desktop ưu tiên editorial rails và hero hierarchy; mobile có thumb-zone CTA, touch target ≥44px, text readable tại 200% và không horizontal overflow.
6. **Luồng 6 mặt JAYT-242 được thiết kế lại đồng bộ:** search/filter là progressive disclosure; district/nearby map chỉ vào khi cần; voucher hub và `Mua món này có hời không?` là landing/decision flow đẹp có state `Chưa đủ dữ liệu`; modal detail có CTA/source/freshness/tier rõ. Không thêm price history, verdict, coupon, address, image hoặc affiliate link nếu contract không có.
7. **Quality bar trước CEO review:** Design nộp token sheet, desktop/mobile screenshots của Home, collection, filtered state, card detail, Radar, nearby/map fallback, voucher, buy-decision và dark mode; UX/CX nộp 5 task test; QA nộp a11y/visual regression/claim scan. Council chỉ nộp một pack AY tối đa 10 finding, không tự gọi đẹp/approved. CEO xem trực tiếp staging AY trước verdict.

**Trạng thái CEO:** `AX FUNCTIONAL SURFACE ĐÃ CÓ NHƯNG VISUAL/IA REJECTED — AY FULL-STOREFRONT REDESIGN (DAILY GUIDE, PREMIUM EDITORIAL, MOBILE-FIRST, TRUST BY DESIGN), KHÔNG SHIP PRODUCTION`.

---

## AZ. Chỉ thị bắt buộc CEO — hợp nhất hồ sơ/hạ tầng toàn chương trình, chat mới chỉ nâng cấp, không xây lại từ đầu

Chủ dự án yêu cầu toàn bộ dữ liệu cũ, hạng mục và hạ tầng được hợp nhất rõ ràng để chat mới không lặp lại việc bỏ quên/ghi đè/làm lại. CEO kiểm tra thấy **baseline AN là immutable foundation có giá trị**, nhưng brief/manifest AN đang neo ở `v3.420.0-staging.ak` trong khi AQ–AY đã phát sinh. Nếu chỉ đọc AN, chat mới có thể nhầm current state. Đây là lỗ hổng handover cần sửa bằng lớp **current-state/version lineage**, không bằng xóa hay viết lại AN.

### Quyết nghị Hội đồng AZ

- **Product/Design/UX/CX/Growth:** mọi quyết định, feature, design system, journey và backlog JAYT-242/245 phải có owner, state, dependency, version áp dụng và tiêu chí Done trong catalog chung.
- **Data & Trust:** toàn bộ data cũ phải được inventory và phân lifecycle `public-certified`, `candidate`, `expired/recheck`, `historical`, `quarantine`; hợp nhất metadata/pointer, **không** hợp nhất claim cũ vào public truth.
- **Engineering/QA:** mỗi thay đổi là migration trên baseline xác định, có diff/hash/rollback/verification; chat mới không được gọi build script tạo source replacement là “upgrade”.

### Lệnh tổng lực AZ — một hệ hồ sơ duy nhất

1. **Giữ nguyên, không overwrite:** `CORE_BASELINE_MANIFEST_AN`, registry AN, dossier AN, PROJECT_MEMORY append-only, các source/staging/release receipt lịch sử và quarantine. Không rename/xóa/replace chúng. Các asset historical/false provenance không được phục hồi public; chỉ được catalog bằng pointer, lifecycle và reason.
2. Tạo `00_PROGRAM_BASELINE/START_HERE_AZ.md` làm entrypoint duy nhất cho chat mới, tiếng Việt, tối đa hai trang. Thứ tự bắt buộc: `START_HERE_AZ` → `JAYT_CURRENT_STATE_AZ.json` → `JAYT_RELEASE_LINEAGE_AZ.json` → `JAYT_PLATFORM_CATALOG_AZ.json` → JAYT-245 mục mới nhất → live/staging receipt → artifact cần sửa. Cấm bắt đầu từ report Antigravity, script build hoặc một staging URL riêng lẻ.
3. Tạo **immutable current-state epoch** `JAYT_CURRENT_STATE_AZ_<timestamp>.json` và pointer nhỏ `JAYT_CURRENT_STATE_AZ.json`. Epoch phải nêu: production URL/version/hash/CEO verdict; mọi staging AQ–AY/URL/source hash/status; current design candidate; data counts theo lifecycle (certified/candidate/quarantine/expired); affiliate permission state; active directives/open risks; asset/quarantine boundaries; updated_at, self-hash và source-of-truth pointers. Pointer chỉ được đổi sau validator pass, phải lưu previous pointer/receipt; không được sửa epoch cũ.
4. Tạo `JAYT_RELEASE_LINEAGE_AZ.json`: một dòng cho **mọi** production/staging/history known release, gồm version, URL/deployment ID nếu có, source/bundle hash nếu có, parent/base version, current lifecycle (`live`, `review`, `superseded`, `forensic-unrecoverable`, `quarantine`), CEO verdict, rollback eligibility và evidence receipt. Thiếu hash/deployment thì ghi rõ `UNVERIFIABLE`, không bịa hoặc suy diễn lineage.
5. Tạo `JAYT_PLATFORM_CATALOG_AZ.json` là inventory hợp nhất của toàn hạ tầng và hạng mục: source/UI/design tokens/components, pipeline/collectors, evidence ledgers/raw vault, supply data, affiliate research state, QA gates, deploy/staging environments, Council/directive records, automations và quarantine. Mỗi entry có persistent ID, owner, path/URL, lifecycle, dependency, hash/snapshot pointer, public eligibility, last verified, change policy. Không copy/merge raw content hoặc secrets vào catalog.
6. Tạo `JAYT_UPGRADE_ONLY_CONTRACT_AZ.md` và validator executable: trước mọi thay đổi phải khai báo base epoch, purpose, affected persistent IDs, input/output schema, migration/diff, compatibility, evidence impact, design impact, tests, staging target, rollback target. Validator fail nếu source bị replace không migration, persistent ID mất, import quarantine, epoch/pointer mismatch, staging ghi đè production, receipt thiếu hoặc public claim mất binding. Mutation suite phải thử các lỗi này trên fixture copy thật.
7. **Reconciliation toàn bộ dữ liệu cũ:** dùng registry AN làm danh sách nguồn, quét full-byte lại theo snapshot AZ. Cập nhật catalog metadata cho toàn bộ asset; review các asset ngoài registry hoặc changed-since-AN, phân loại owner/lifecycle. Mục tiêu là coverage 100% của inventory, không phải public 100% dữ liệu. Báo riêng count/path của `unknown`, `changed`, `missing`, `quarantine`; bất cứ cái nào không giải thích được đều fail-closed khỏi public/promotion.
8. **Tiếp tục xây JayT, không chờ hồ sơ:** AY redesign, AU evidence remediation, supply cohort 30–50 tiered items và affiliate read-only được làm song song, nhưng mọi patch mới phải mở migration record AZ và không được deploy production. Không làm một frontend từ đầu khác; tiếp tục trên source candidate đã ghi trong current-state epoch.
9. Council nộp **một** pack AZ gồm architecture map, counts lifecycle, source/staging lineage, pointer/epoch hashes, upgrade-contract/mutation output và danh sách công việc đang mở; không tạo “CEO approved”. CEO kiểm trực tiếp START_HERE, current state, sample path old/current/quarantine, validator và staging AY trước khi ghi nhận. Mỗi chat mới bắt buộc cập nhật CURRENT STATE theo protocol, không viết lại lịch sử.

**Trạng thái CEO:** `AZ PROGRAM CONSOLIDATION & UPGRADE-ONLY CONTRACT BẮT BUỘC — GIỮ AN IMMUTABLE, TẠO CURRENT-STATE/LINEAGE/CATALOG/VALIDATOR, MỌI CHAT SAU CHỈ NÂNG CẤP CÓ MIGRATION; AY/SUPPLY/AFFILIATE READ-ONLY TIẾP TỤC, KHÔNG SHIP PRODUCTION`.

---

## BA. Ghi nhận CEO AZ — hạ tầng handover đạt hẹp; sửa state truth, inventory coverage và upgrade guard còn thiếu

CEO đã chạy trực tiếp validator AZ. Các phần **đạt hẹp**: `START_HERE_AZ` có thứ tự đọc; pointer hash khớp epoch; lineage phân biệt v3.397 là `UNVERIFIABLE`; production/candidate tách rõ; mutation pointer/quarantine/staging leak/base epoch fail-closed. Đây là nền tốt để chat mới không bắt đầu mù.

Nhưng không chấp nhận các lời khẳng định “hoàn tất 100%/đã triệt tiêu rủi ro”:

1. `START_HERE_AZ`/current-state vẫn nói **33 mục public certified / field-level certified**, trái phán quyết AU: binding AT hiện là self-referential và chưa trace từng field đến raw path/hash/quote/span. Current state phải phản ánh **CEO verdict hiện hành**, không phản ánh label report.
2. Catalog hiện là danh mục phân hệ hữu ích, chưa là chứng minh reconciliation 15.973 assets: thiếu output coverage `tracked/unknown/changed/missing/quarantine`, snapshot root hash và ownership/lifecycle cho mọi asset ngoài core. Không được gọi “toàn bộ dữ liệu cũ đã hợp nhất” chỉ vì có 8 category.
3. Validator AZ chưa mutation-test những guard đã được AZ yêu cầu: source replacement/clean-slate không migration, persistent ID mất, release receipt thiếu, catalog/source hash mismatch và epoch ngoài pointer. PASS hiện tại chỉ là pass phạm vi hẹp.

### Lệnh hoàn thiện BA

1. Giữ nguyên tất cả AZ artifact/epoch làm historical snapshot; không sửa im lặng. Dựng epoch successor `BA` qua write-new → full verify → pointer update có previous receipt. `START_HERE_AZ` chỉ được bổ sung pointer tới brief/current state mới, không rewrite lịch sử.
2. Sửa state truth: mọi field/card chưa có traceable binding phải được report `PENDING_FIELD_CERTIFICATION`, không `certified`; tách rõ `public displayable by tier`, `field-certified`, `candidate`, `quarantine`, `expired/recheck`. AU chưa được đóng cho đến khi field binding thực pass. Không cần gỡ toàn bộ UI/supply chỉ vì trạng thái certification bị sửa.
3. Tạo reconciliation receipt full workspace từ registry AN + delta since AN: tổng asset, tracked, changed, unknown, missing, quarantined, excluded-generated; full-byte root/snapshot hashes và list path/reason/owner cho từng ngoại lệ. `0 unknown/missing` chỉ được viết khi output chứng minh; nếu không, fail-closed public/promotion cho ngoại lệ.
4. Mở rộng validator/mutation fixture dùng cùng executable path: (a) thay source candidate nhưng không migration; (b) xóa persistent ID trong data/source; (c) xóa/mismatch staging receipt; (d) thay catalog hash/path; (e) epoch không được pointer tham chiếu. Baseline thực phải pass trước/sau test, từng mutation phải reject. Không dùng assertion string độc lập.
5. Release lineage/catalog bổ sung source hash hoặc `UNVERIFIABLE` per release/asset, active source parent/migration ID, CEO verdict exact; cấm ghi `CEO approved`, `100% immutable` hay “all history complete” vượt output validator.
6. AY redesign/supply read-only/affiliate read-only tiếp tục theo Upgrade-Only; current candidate không được promote. Council nộp một pack BA gồm state diff, reconciliation receipt, mutation output, unresolved list và open work; CEO kiểm trực tiếp trước khi ghi nhận BA.

**Trạng thái CEO:** `AZ HANDOVER/POINTER/LINEAGE ĐẠT HẸP; BA CÒN MỞ — STATE TRUTH 33 CERTIFIED SAI PHẠM VI, FULL INVENTORY & UPGRADE GUARDS CHƯA ĐỦ. KHÔNG SHIP; AY/SUPPLY/READ-ONLY TIẾP TỤC`.

---

## BB. Phán quyết CEO trực tiếp BA/AY — thiết kế có tiến bộ, nhưng staging đang claim vượt bằng chứng; sửa trust-layer và biên nhận trước vòng UX tiếp theo

CEO đã tự chạy `test_jayt_upgrade_only_validator_ba.js`, universal full-byte verifier và mở trực tiếp `https://jayt-storefront-staging-ay.vercel.app` trên desktop lẫn viewport 390px. Kết quả phải được tách bạch:

- **Đạt hẹp:** pointer BA khớp epoch; production vẫn là `v3.419.0` khóa; 9 mutation của BA reject trên fixture; staging AY không tràn ngang ở mobile và cấu trúc “Ăn gì / Đi đâu / Cần mua gì” dễ hiểu hơn AX.
- **Không đạt / không được tự nhận hoàn tất:** output BA ghi `15973 / undefined assets`; `JAYT_WORKSPACE_RECONCILIATION_RECEIPT_BA.json` neo các hash registry/core/memory khác với hash mà universal verifier vừa xác nhận. Do đó receipt BA chưa là chứng minh self-consistent cho trạng thái hiện hành. PASS của test không chữa được mâu thuẫn schema/hash này.
- **Lỗi public nghiêm trọng:** State Truth BA nói rõ chỉ **1 field-certified, 32 pending**; nhưng AY đang ghi hero “Tất cả ... đã đối soát độc lập”, section “Đã đối soát chứng cứ” và 5 thẻ `ƯU ĐÃI XÁC MINH`, đồng thời công bố giá, địa chỉ, giờ và điều kiện của những item pending. Đây là false provenance trên staging; không được coi là lỗi mỹ thuật nhỏ và không được promote.

### Ý kiến Hội đồng trước chỉ thị BB

- **Product:** 3 cửa vào AY là nền discovery đúng, nhưng lời hứa giá trị phải dẫn đến quyết định có mức chắc chắn rõ, không hứa mọi nội dung đã kiểm.
- **Design:** giữ art direction Daily Guide; trust treatment phải phân cấp bằng copy/structure, không chỉ đổi màu badge.
- **UX/CX:** card pending vẫn hữu ích nếu nói đúng “nguồn chính thức đang rà soát theo field” và chỉ mời người dùng xem nguồn, không giả định có thể dùng ngay.
- **Growth:** tăng 50 nội dung bằng mix tier/candidate pipeline, không bằng cách nâng nhãn pending thành deal xác minh.
- **Data & Trust:** một claim public chỉ được xuất hiện khi có trace field-level; 32 pending phải gỡ hoặc hạ mọi field chưa trace.
- **Engineering:** sửa bằng migration từ AY, giữ IDs/route/UI tốt; biên nhận next epoch phải tính từ snapshot hiện hành và self-verify độc lập.
- **QA:** test phải kiểm rendered DOM/copy và receipt schema/hash, không chỉ assertion nội bộ.

### Lệnh tổng lực BB

1. **Cô lập claim sai trên AY ngay tại staging successor mới `v3.422.1-staging.bb`**; không overwrite AY/AT/AX hay production. Cho đến khi successor pass, AY là `FALSE-PROVENANCE / NO-SHIP`, chỉ dùng audit. Không deploy production.
2. **Trust-layer theo State Truth:** rail “Dùng hôm nay / Ưu đãi xác minh” chỉ được hiển thị item có full field certification — hiện tối đa CGV VNPAY nếu renderer/binding thực sự trace đủ. 32 item pending phải dùng label trung thực như `Nguồn chính thức — đang rà soát theo field`; mọi giá, %, coupon, thời hạn, địa chỉ, giờ, chi nhánh, điều kiện và CTA thương mại không có binding phải bị ẩn, thay bằng CTA `Mở nguồn chính thức` cùng disclosure. Radar chỉ có brand/source/category/mục đích theo dõi/last observed hợp lệ. Hero không được nói “tất cả đã đối soát độc lập”.
3. **Không biến JayT thành trang trống:** giữ 3 cửa vào, daily moments, tìm kiếm, collection, save, dark/light, mobile bottom nav và empty state đẹp. Với mỗi cửa vào phải có một mix hiển thị minh bạch: verified-now, official-programme-pending, verified-place hoặc radar; count UI phải lấy từ state truth, không hard-code `5 ưu đãi`.
4. **Sửa BA receipt bằng epoch successor BB, không sửa im lặng BA:** xây `JAYT_WORKSPACE_RECONCILIATION_RECEIPT_BB.json` có schema version và denominator bắt buộc; hash registry/core/memory phải trùng kết quả verifier của cùng một snapshot hoặc nêu rõ base snapshot + current delta. Lưu `verified_at`, registry path/hash, snapshot root/hash, all counts (`tracked`, `changed`, `unknown`, `missing`, `quarantine`, `excluded-generated`) và path/reason/owner của mọi ngoại lệ. Validator phải fail nếu denominator thiếu, hash không khớp, hoặc receipt không neo đúng epoch.
5. **QA thực chứng:** chạy parser từ data/binding → rendered DOM trên BB; mutation tối thiểu: đổi label verified cho item pending, đưa giá/địa chỉ/giờ/điều kiện không bind vào DOM, hero claim bao quát, count hard-code sai State Truth, receipt denominator missing, receipt hash stale. Mỗi mutation phải fail-closed. Nộp screenshot desktop/mobile cùng output machine-readable, không nộp chỉ log PASS.
6. **Supply và affiliate vẫn chạy song song:** tiếp tục quét read-only cohort lớn để xây hàng chờ 50 mục/ngày theo tầng; không hạ chuẩn `Deal xác minh`. Affiliate giữ `PORTAL_ACCESS_NOT_VERIFIED`, không tạo link/campaign/coupon/CTA và không gửi dữ liệu.
7. **Council/CEO gate:** Council nộp duy nhất pack BB bằng tiếng Việt gồm migration diff, bảng field removed/demoted, state counts thực, receipt/hash self-check, mutation output, screenshots 2 viewport và danh sách no-ship. CEO sẽ tự mở BB trước bất kỳ phán quyết release nào. Báo cáo Antigravity không được viết “CEO approved/hoàn tất 100%”.

**Trạng thái CEO:** `BA POINTER/GUARDS ĐẠT HẸP NHƯNG RECEIPT HASH/SCHEMA MÂU THUẪN; AY VISUAL CÓ TIẾN BỘ NHƯNG FALSE-PROVENANCE TRÊN STAGING — BB SỬA TRUST-LAYER + RECEIPT, GIỮ UX/SUPPLY UPGRADE-ONLY, KHÔNG SHIP, PRODUCTION v3.419.0 KHÓA`.

---

## BC. Phán quyết CEO trực tiếp BB — đổi badge không đủ; claim chưa bind vẫn được render trong title, summary và gateway

CEO đã tự mở `https://jayt-storefront-staging-bb.vercel.app` và chạy lại validator BB/universal verifier. BB có một tiến bộ thật: rail verified đã còn 1 item và hero tổng quát đã bớt claim. Tuy nhiên **không đạt gate BB** vì rendered DOM vẫn public claim thuộc các field pending:

1. Card mang nhãn `Nguồn chính thức — đang rà soát theo field` vẫn hiện title/summary như `40.000₫–45.000₫`, `Mua 1 Tặng 1`, `45.000₫/vé`, `10.000₫`, `29.500₫/tháng`, điều kiện và phạm vi dưới dạng mô tả. Đổi CTA thành “Mở nguồn chính thức” không làm các claim này trở thành hợp lệ.
2. Ba gateway trên fold đầu vẫn quảng bá `bữa trưa từ 40k`, `combo nhóm Domino's/KFC/Jollibee`, các merchant/mục đích có tính deal và các count `7/12/14` không được dựng từ state truth/binding của collection. Đây là claim surface mới chưa bị DOM validator bắt.
3. State truth/report tự mâu thuẫn: receipt nói 32 pending, validator BB nói `19 pending + 13 Radar + 1 verified = 33`, còn báo cáo mô tả `15 pending + 13 Radar + 1 verified`. Không có một danh sách canonical 33 item phân lifecycle mà UI, counter và receipt cùng dùng.
4. Receipt BB vẫn chứa registry/core/memory hash tại snapshot cũ (`ba442…`, `609ad…`, `146b…`), trong khi universal verifier trực tiếp ở snapshot hiện hành trả hash khác. Vì vậy “đồng bộ 100% hash” là sai phạm vi. Không được thay file registry/manifest historical để làm test pass; immutable baseline phải được giữ, còn successor phải ghi base snapshot và delta có thể tái lập.

### Ý kiến Hội đồng trước chỉ thị BC

- **Product/Design/UX-CX:** không giấu sự hữu ích; card pending dùng title danh mục trung tính + mô tả mục đích + nguồn, còn value proposition có điều kiện chỉ xuất hiện sau certification. Ba gateway vẫn có thể đẹp và hữu dụng bằng need-based route, không dùng giá/deal chưa chứng minh.
- **Growth:** KPI 50 là hỗn hợp tiered content/candidates; không dùng copy giá/ưu đãi để làm storefront có vẻ dày hơn thực tế.
- **Data & Trust/Engineering/QA:** renderer phải nhận field allow-list từ canonical lifecycle ledger; mọi string/hard-code/collection copy cũng là public field và phải qua parser. Receipt/validator phải anchor immutable base rồi kiểm delta, không tự ghi lại baseline.

### Lệnh tổng lực BC

1. **Dựng successor riêng `v3.422.2-staging.bc` từ BB**, không overwrite BB/AY hoặc production. BB chuyển `PARTIAL_TRUST_FIX / NO-SHIP`; không gọi “zero false provenance”.
2. **Field-level render gate thật:** tạo canonical `PUBLIC_RENDER_FIELD_LEDGER_BC` immutable, một dòng cho mọi string public gồm `item_id|surface|field|value_hash|lifecycle|binding_id|allow_render`. Renderer must use it for **title, subtitle, summary, hero, gateway, section count, chip, modal, CTA**. Field pending/unbound bị thay bằng copy trung tính, ví dụ: `Ưu đãi từ nguồn chính thức — đang rà soát điều kiện` / `Mở nguồn chính thức để tự kiểm tra`; không nêu giá, % giảm, mua tặng, quota, giờ, địa chỉ, chi nhánh, thời hạn hay lời hứa tiết kiệm.
3. **Giữ storefront hấp dẫn mà trung thực:** ba cửa vào dùng nhu cầu rõ (`Ăn gì`, `Đi đâu`, `Học tập & mua sắm`) + loại nguồn/collection, không có giá/merchant/deal unbound. Nếu count chưa có collection ledger/binding thì dùng “Khám phá nguồn phù hợp”, không con số. Giữ thiết kế Daily Guide, dark/light, search, save và mobile bottom nav.
4. **Canonical accounting:** phát hành một ledger 33 item duy nhất, machine-readable, có persistent ID/tier/lifecycle/render eligibility/reason; summary, UI counters, verifier và receipt phải derive từ file này. Nếu thực tế chỉ có 19 pending thì state truth phải sửa thành `1 + 19 + 13 = 33`; nếu có 32 pending thì không thể đồng thời báo 33 public trừ khi taxonomy khác được giải thích bằng ID. Không được dùng count mơ hồ.
5. **Repair receipt theo chain, không viết lại AN/BA/BB:** giữ nguyên mọi receipt historical; tạo receipt BC gồm immutable base registry/core/memory hash, exact current hashes, delta manifest từ base, timestamp/snapshot ID và self-check. Validator phải reject current hash mismatch, delta missing, baseline rewrite, ledger-count mismatch, hoặc string pending xuất hiện trong rendered DOM. Mutation test phải dùng actual source/DOM, không test fixture detached.
6. **Council/CEO:** Council nộp một pack BC tiếng Việt gồm ledger 33 item, exact field-removal diff, direct DOM scan (desktop/mobile), migration/receipt chain, mutation output và screenshot. CEO sẽ mở BC độc lập; không có CEO phán quyết thì `v3.419.0` khóa, affiliate tiếp tục `PORTAL_ACCESS_NOT_VERIFIED`, supply read-only vẫn mở.

**Trạng thái CEO:** `BB ĐẠT HẸP VỀ IA/BADGE NHƯNG FAIL CLAIM-RENDERING + COUNT/RECEIPT CONSISTENCY — BC ÁP FIELD-LEVEL RENDER GATE, CANONICAL LEDGER VÀ DELTA RECEIPT; KHÔNG SHIP PRODUCTION`.

---

## BD. Phán quyết CEO + Design Review trực tiếp BC — staging body trắng, không có UX để nghiệm thu; sửa runtime trước mọi đánh giá thẩm mỹ

CEO dùng review thiết kế và mở trực tiếp `https://jayt-storefront-staging-bc.vercel.app`. Kết quả thực tế khác report: tab có title `JayT Đà Nẵng — Cẩm Nang Tiện Ích & Quyền Lợi Cộng Đồng (Staging BC)` nhưng viewport hoàn toàn trắng, `body.innerText` và DOM snapshot rỗng sau khi tải. Không có giao diện để khách khám phá, không thể kiểm hero/card/CTA/mobile và không thể nghiệm thu UX/UI. Đây là **P0 runtime availability failure**, không phải lỗi visual nhỏ.

### Design critique BC (theo bằng chứng live)

- **Ấn tượng 2 giây:** trang trắng; khách không biết JayT là gì, không có điểm bắt đầu hay hành động.
- **Usability — P0:** không có navigation, search, gateway, content card hay fallback; nhiệm vụ cốt lõi không thể hoàn thành.
- **Hierarchy/Consistency/Accessibility:** không có surface được render nên không thể kết luận pass về hierarchy, token, contrast, touch target, keyboard hay responsive. Mọi screenshot/source/test khác không thay thế được state live này.
- **Điểm tích cực duy nhất:** BC có ý định thiết kế đúng hướng (Daily Guide, gateway theo nhu cầu, trust tier), nhưng ý định/mã chưa phải trải nghiệm người dùng.

### Ý kiến Hội đồng trước chỉ thị BD

- **Product/UX-CX/Growth:** availability là gate số 0; không thể đo hiểu 10 giây, retention hay collection khi người dùng chỉ thấy trang trắng.
- **Design:** chỉ review visual sau khi có rendered desktop/mobile snapshot có thể tái lập; không được chấm đẹp qua source code.
- **Engineering/QA/Data & Trust:** test phải xác minh deployed URL render non-empty DOM/content markers, chứ không chỉ import source hoặc parse fixture. Field gate/ledger không có giá trị public nếu storefront không boot.

### Lệnh tổng lực BD

1. **BC lập tức `RUNTIME_FAIL / NO-SHIP`; không promotion, không gọi 100% render gate pass.** Giữ artifact BC để forensic; không overwrite. Production `v3.419.0` vẫn khóa.
2. **Dựng `v3.422.3-staging.bd` riêng từ BC qua migration có receipt.** Engineering tái hiện lỗi bằng browser/runtime thật, cung cấp root cause (HTML/script/module/load order/CSP/runtime exception hoặc origin mismatch), patch tối thiểu và diff. Không viết storefront mới, không thay persistent IDs/ledger hoặc thay dữ liệu để che lỗi.
3. **Availability gate bắt buộc tại deployed URL:** sau deploy, QA dùng browser thực chạy `document.body.innerText`, DOM snapshot và visual screenshot ở desktop + 390px. Pass chỉ khi: HTTP 200, body non-empty, có logo/nav, hero, 3 gateway, 1 verified rail, pending rail, radar rail và safe empty states; không horizontal overflow; không error/warn runtime không được triage. Gắn output/timestamp/version/URL vào release receipt. Test import module hoặc static string scan không đủ.
4. **Chỉ sau availability pass mới xét BC trust design:** deployed DOM parser phải tiếp tục chặn pending string về giá/giảm/mua-tặng/thời hạn/địa chỉ/giờ/điều kiện; scan thêm copy hub Voucher và Buy-decision để không hứa “mã đã đối soát/100% thể lệ” hoặc verdict/price history khi không có ledger/binding. `CANONICAL_PUBLIC_ITEM_LEDGER_BC` phải nâng thành true field ledger hoặc đổi tên trung thực; mỗi public string có surface/field/value hash/binding/render permission.
5. **Council pack BD duy nhất:** root-cause, migration diff, live URL receipt, raw desktop/mobile evidence, availability output, DOM claim scan, ledger delta, a11y smoke (focus/keyboard/contrast/touch target) và unresolved risks. CEO sẽ trực tiếp xem BD rồi mới có Design critique đầy đủ và verdict tiếp theo.

**Trạng thái CEO:** `BC CODE/LEDGER KHÔNG THAY THẾ LIVE UX — STAGING BC BODY TRẮNG, P0 RUNTIME FAIL. BD KHẮC PHỤC AVAILABILITY + LIVE QA TRƯỚC TRUST/DESIGN REVIEW; KHÔNG SHIP`.

---

## BE. Phán quyết CEO trực tiếp BD sau ảnh khách hàng + Design critique — CSS tải nhưng không khớp DOM; storefront rơi về HTML thô

Ảnh khách hàng và kiểm tra CEO tại `https://jayt-storefront-staging-bd.vercel.app` đều xác nhận BD **có content nhưng không có giao diện**: toàn bộ trang là văn bản/card native button dồn thành một cột, không còn hierarchy, spacing, grid, rail hay mobile storefront. Đây là P0 visual-runtime fail, không được thay bằng screenshot Chrome CDP trong report.

Kiểm tra trực tiếp cho thấy stylesheet `/styles.css?v=3.422.3-staging.bd` đã tải và có 167 rules, nhưng source mismatch: CSS định nghĩa `.jayt-hero`, `.jayt-header`, `.jayt-nav-tab`; DOM BD render `.guide-hero-section`, `.hero-main-title` và các class mới. Vì selector không khớp, hầu hết design system không được áp dụng. CSS thực tế là artifact của surface khác, không phải stylesheet contract cho DOM BD.

### Design critique BD

- **Ấn tượng 2 giây — Critical:** khách thấy một trang dữ liệu nội bộ chưa format, không phải JayT; giá trị “khám phá ưu đãi/địa điểm” biến mất.
- **Usability — Critical:** rất dài, không có grouping thị giác, CTA native lẫn với text; không thể quét 33 mục, hiểu tier hay chọn luồng hành động.
- **Hierarchy/consistency — Critical:** class/token không cùng component contract; title/rail/card/footer không có nhịp, layout desktop/mobile cùng rơi về document flow.
- **Accessibility — Fail pending:** CSS không áp dụng khiến touch target, focus, contrast state, thumb-zone và responsive contract không thể chứng minh. Không được coi native default là a11y pass.

### Lệnh tổng lực BE

1. **BD chuyển `CSS_CONTRACT_MISMATCH / NO-SHIP`;** không promotion, không dùng báo cáo “10.739 ký tự/33 card” làm acceptance. Production khóa.
2. **Dựng `v3.422.4-staging.be` từ BD qua migration tối thiểu.** Một source component phải có đúng stylesheet bundle/version/hash tương ứng; chọn một trong hai hợp lệ: (a) viết stylesheet BE theo class DOM BD, hoặc (b) migrate DOM về class contract stylesheet hiện hành. Cấm trộn source mới với `styles.css` cũ, cấm “fix” bằng inline style rải rác hoặc viết lại storefront.
3. **CSS contract manifest bắt buộc:** ghi `source_js_path/hash`, `stylesheet_path/hash`, `component-class inventory`, entry HTML/link URL/hash, deployment bundle hash và base release. Build/QA fail nếu 1 selector semantic chính không có rules hoặc stylesheet không cùng manifest. Không được tái dùng tên `styles.css` mơ hồ; version/path rõ ràng.
4. **Visual acceptance thực tế:** trước CEO review, QA phải mở URL deployed bằng browser độc lập và nộp screenshots **do browser đó chụp**, desktop 1280 và mobile 390, cả top/mid/footer. Automated assertions: header/grid/card computed styles khác default; layout max-width/gap/padding đúng tokens; no overflow; keyboard focus visible; tap target ≥44px; text 200% không che CTA. Cấm dùng screenshot từ build machine khác làm bằng chứng duy nhất.
5. **Giữ trust/supply:** field-render gate, canonical ledger, pending-neutral copy, quarantine và affiliate read-only tiếp tục; không được nhân danh sửa CSS để reintroduce claim/price/voucher/affiliate. Council nộp một pack BE duy nhất gồm CSS manifest, migration diff, live visual/a11y output và DOM claim scan. CEO sẽ review trực tiếp BE.

**Trạng thái CEO:** `BD AVAILABILITY KHÔI PHỤC NHƯNG VISUAL RUNTIME FAIL — STYLESHEET ĐÃ LOAD, SELECTOR KHÔNG KHỚP DOM. BE BẮT BUỘC CSS COMPONENT CONTRACT + LIVE VISUAL QA; KHÔNG SHIP`.

---

## BF. Phán quyết CEO + Design critique trực tiếp BE — visual shell đạt hẹp, tiếp tục hoàn thiện journey chứ chưa release

CEO đã mở trực tiếp `https://jayt-storefront-staging-be.vercel.app` ở desktop và viewport 390px. Khác BD, stylesheet BE áp dụng thật: hero/card/grid/spacing render đúng, viewport mobile không tràn ngang và 3 gateway có hierarchy dễ hiểu. Đây là tiến bộ UX/UI có thể xác nhận trực tiếp, không chỉ là report.

### Design critique BE

| Hạng mục | Kết luận | Việc cần làm |
|---|---|---|
| Ấn tượng 2 giây | Đạt hẹp: người dùng nhận ra đây là cẩm nang Đà Nẵng và có 3 lối vào nhu cầu. | Làm promise ngắn hơn, ưu tiên một hành động ngày hôm nay thay vì câu mô tả dài. |
| Hierarchy | Đạt: hero → 3 gateway → nhịp sinh hoạt rõ, card có khoảng thở. | Khi cuộn sâu phải giữ nhịp rail/section tương tự; không quay về card-wall. |
| Mobile | Đạt hẹp: card một cột, text đọc được, bottom nav hiện diện, touch target kiểm mẫu ≥44px. | Kiểm toàn journey đến detail/modal/source, keyboard và dark mode; top navigation không được biến mất chức năng. |
| Navigation desktop | Chưa đạt chỉ thị AY: `Hôm nay`, `Khám phá`, `Mua có hời không?`, `Voucher Hub`, `Đã lưu` cùng cấp là quá nhiều destination. | Chỉ giữ Hôm nay/Khám phá/Đã lưu; Mua hời/Voucher là CTA ngữ cảnh từ gateway, rail hoặc menu. |
| Trust/copy | Chưa đủ release: visual đẹp không chứng minh 19 pending, radar, voucher và buy-decision được render đúng ở mọi route/detail. | Tiếp tục field gate; no-data state phải là trải nghiệm hữu ích, không lời hứa voucher/price verdict. |

### Ý kiến Hội đồng trước chỉ thị BF

- **Product/Growth:** BE có nền “daily guide” đáng giữ. Điểm tăng trưởng tiếp theo là curated journeys theo bối cảnh, không thêm tab.
- **Design/UX-CX:** dùng card system BE làm nguồn duy nhất; mở 3 journeys từ gateway tới kết quả/lưu/nguồn thay vì tiếp tục sửa trang home rời rạc.
- **Data & Trust/Engineering/QA:** visual pass không hạ data gate. Phải kiểm live mỗi destination, modal/source, theme, responsive và zero claim lẫn tier.

### Lệnh tổng lực BF

1. **Ghi nhận BE `VISUAL-SHELL NARROW PASS / NO-SHIP`;** bảo toàn CSS contract BE, không quay lại CSS/DOM lẫn lộn. Production vẫn khóa.
2. **Dựng `v3.422.5-staging.bf` upgrade-only từ BE:** giảm desktop nav về tối đa 3 destination; chuyển Voucher và Mua hời thành context CTA/destination. Không bỏ các tính năng JAYT-242, chỉ đổi IA/progressive disclosure.
3. **Hoàn thiện ba customer journeys:** `Ăn gì` → collection tier-aware → detail/source; `Đi đâu` → place/radar fallback → source; `Học tập & mua sắm` → programme/source → saved. Mỗi journey có loading, empty, pending, verified, radar, offline/error state; no-data không được biến thành deal/coupon/price history.
4. **Visual/A11y QA live cho BF:** CEO cần các screenshots browser độc lập cho home, mỗi collection, detail/modal, source disclosure, saved, voucher no-data, buy-decision no-data, dark mode; desktop/mobile. Test focus order/visible focus, Escape modal, 200% zoom, contrast AA, touch target, no overflow. Không dùng ảnh build machine hoặc test source thay bằng evidence live.
5. **Council pack BF duy nhất:** IA diff, component map BE→BF, 3 journey task results, rendered-DOM claim scan theo ledger, a11y output, supply state và no-ship list. CEO sẽ review trực tiếp BF; affiliate vẫn `PORTAL_ACCESS_NOT_VERIFIED` và workstream supply read-only tiếp tục.

**Trạng thái CEO:** `BE CSS/DESIGN SHELL ĐẠT HẸP SAU KIỂM LIVE DESKTOP+MOBILE; NAVIGATION/JOURNEY/TRUST ROUTE CHƯA ĐỦ CHO RELEASE. BF TINH GỌN IA VÀ HOÀN THIỆN JOURNEY, KHÔNG SHIP`.

---

## BG. Chỉ thị CEO theo Design Council — biến JayT thành trải nghiệm khám phá có hình ảnh và bản sắc Đà Nẵng, không dùng visual giả làm bằng chứng

CEO đồng ý với phản hồi chủ dự án: BE/BF sạch và dễ dùng hơn, nhưng còn thiếu hình ảnh, nhịp cảm xúc và dấu ấn riêng; monogram/card trắng đơn lẻ vẫn tạo cảm giác catalogue. Mục tiêu BG là làm JayT giống một **daily discovery guide để đi chơi, ăn uống và mua sắm thông minh**, không phải bảng dữ liệu. Quy tắc Trust không đổi: ảnh merchant/deal/địa điểm chỉ dùng khi có quyền và provenance; illustration/AI art không được giả làm ảnh thật, poster thật hay bằng chứng ưu đãi.

### Ý kiến Design Council

- **Product:** khách cần hình dung hành trình trước khi đọc metadata: hôm nay ăn gì, đi đâu, mua gì; visual phải dẫn vào quyết định, không trang trí vô nghĩa.
- **Design:** xây art direction `JayT Daily Guide — Đà Nẵng rực sáng`: màu biển xanh ngọc, hoàng hôn cam, đèn thành phố tím; typography/editorial rail giữ premium nhưng giàu hình ảnh hơn.
- **UX/CX:** hình ảnh phải giúp quét nhanh, không che CTA/tier/freshness; motion nhẹ, tôn trọng reduced-motion và hiệu năng mobile.
- **Growth:** mỗi daily collection là một lý do quay lại; hình hero theo nhịp sáng/trưa/chiều/tối để tạo cảm giác mới mỗi ngày.
- **Data & Trust:** tách asset `DECORATIVE` khỏi `EVIDENCE/BRAND/PLACE`; asset thiếu quyền/provenance không public.
- **Engineering/QA:** asset manifest, alt text, responsive format, lazy loading, LCP budget và visual regression là gate release.

### Lệnh tổng lực BG

1. **Dựng `v3.422.6-staging.bg` từ BF, không rewrite và không deploy production.** Giữ 3 destination, 3 journeys, CSS contract và render gate. Không dùng ảnh cũ bị quarantine.
2. **Tạo Visual Asset System JayT:**
   - Hero illustration theo 4 thời điểm: sáng đi học/đi làm, trưa ăn uống, chiều khám phá, tối kèo nhóm; phong cách editorial illustration/texture trừu tượng, không mô phỏng ảnh địa điểm hay logo merchant.
   - Ba gateway có cover illustration riêng: bữa ăn & gặp gỡ; đi lại & giải trí; học tập & mua sắm.
   - Collection rails có scene card/rhythm card (bờ sông, nhịp phố, bàn học, rạp chiếu, transit) mang tính khái niệm Đà Nẵng, không ghi/ám chỉ một địa chỉ/brand/deal cụ thể.
   - Deal/place chỉ được có logo/ảnh thật khi asset manifest ghi `rights_source`, `asset_sha256`, `source_url`, `captured_at`, `usage_scope`, `alt_text`, `item_id`; nếu thiếu dùng illustration neutral với nhãn `Minh họa`.
3. **Tạo cảm giác khám phá:** dùng visual storytelling, image crop/card size có chủ đích, layer gradient, subtle parallax/micro-motion tùy reduced-motion, saved state có phản hồi ấm; không biến toàn trang thành gallery nặng hoặc carousel tự chạy.
4. **Asset governance:** dựng `JAYT_VISUAL_ASSET_MANIFEST_BG.json` tách `DECORATIVE_GENERATED`, `LICENSED_ORIGINAL`, `OFFICIAL_BRAND`, `EVIDENCE_ONLY`, `QUARANTINE`. Mỗi asset public phải có persistent ID, owner, rights/provenance, placement, alt text, hash và lifecycle. Cấm fake logo, fake poster, ảnh AI gắn tên merchant/địa chỉ/deal, người thật mang tính chứng thực, hoặc ảnh có text giá/voucher.
5. **UI/UX quality bar:** desktop/mobile screenshot của hero theo 4 nhịp, 3 gateway, collection rail, detail verified, detail pending, radar, dark mode; test image load failure fallback, no layout shift, LCP/lazy load, contrast overlay, alt text, keyboard/reduced-motion. Không làm visual khiến tier/CTA khó đọc.
6. **Council/CEO:** Council nộp một BG pack tiếng Việt gồm moodboard/tokens, asset manifest và rights matrix, component diff, mobile performance/accessibility output, screenshots browser độc lập và mapping content→visual. CEO xem trực tiếp BG trước verdict; supply/read-only affiliate tiếp tục song song.

**Trạng thái CEO:** `BF IA/JOURNEY TIẾP TỤC LÀ NỀN; BG ĐƯỢC ỦY QUYỀN BỔ SUNG VISUAL STORYTELLING + ASSET GOVERNANCE ĐỂ JAYT CÓ BẢN SẮC, KHÔNG DÙNG ẢNH/BRAND/DEAL GIẢ. KHÔNG SHIP PRODUCTION`.

---

## BH. Chỉ thị CEO theo Brand Council — xây logo và hệ nhận diện JayT thực thụ, không còn wordmark kỹ thuật chung chung

CEO ghi nhận phản hồi chủ dự án: website không thể thật sự đẹp hoặc đáng nhớ nếu logo hiện tại chỉ là chữ `JayT` ghép với tagline. BG được tiếp tục, nhưng mọi visual mới phải lấy **hệ nhận diện JayT** làm trung tâm. Logo mới không được là logo merchant, bản sao biểu tượng Đà Nẵng/đơn vị công, hay dùng hình ảnh giả để tạo cảm giác chứng thực.

### Hướng thương hiệu CEO chọn: `J-Flow — JayT Daily Guide`

Biểu tượng là một chữ **J** vẽ liền nét, phần chân chuyển thành dòng chảy/nhịp đường cong hướng lên và một điểm nhỏ biểu thị discovery. Nó gợi Đà Nẵng ven sông, hành trình mỗi ngày và hành động tìm lựa chọn tốt hơn, nhưng không sao chép cầu Rồng, logo thành phố hoặc bất kỳ thương hiệu nào. Wordmark `JayT` được chỉnh kerning/đầu nét riêng để đi cùng icon, đủ tinh giản cho app và đủ premium cho hero.

### Ý kiến Brand Council

- **Product/Growth:** logo phải khiến khách nhớ JayT là cẩm nang quyết định hằng ngày, không phải app coupon hay website du lịch.
- **Design:** một mark đơn giản, có thể nhận ra ở 16px; màu chính xanh deep-teal, accent coral/sunrise; bản mono cho dark mode/in-app favicon.
- **UX/CX:** icon không thay nội dung hoặc tier; khi nhỏ vẫn có accessible name `JayT Đà Nẵng`.
- **Data & Trust/Legal:** chỉ artwork nguyên gốc có source vector và ownership rõ; không logo AI mơ hồ/copy style trade dress/ảnh merchant.
- **Engineering/QA:** một token system duy nhất cho header, favicon, loading, empty state, saved state, social preview và PWA; không copy SVG rải rác.

### Lệnh tổng lực BH

1. **Dựng `v3.422.7-staging.bh` từ BG/BF, không production.** Brand work là upgrade UI; không thay supply ledger, tier, source link hay data claim.
2. **Thiết kế và trình bày 3 phương án brand board**, trong đó `J-Flow` là phương án triển khai mặc định; hai phương án còn lại chỉ để Council/CEO so sánh. Mỗi board có: icon 1:1, wordmark ngang, lockup `JayT Đà Nẵng`, favicon 16/32, app icon 1024, light/dark/mono, palette, typography, do/don’t và rationale 1 câu. Không tự gọi phương án nào “CEO approved”.
3. **Triển khai J-Flow bằng vector gốc:** nộp SVG editable, source grid/clearspace/min-size, color tokens, accessible title/description, SHA-256, author/creation date/licensing. Cấm raster mờ, ký tự Unicode thay logo, logo từ công cụ AI không có rights record, hoặc mô phỏng logo đối tác/địa danh thật.
4. **Gắn brand system vào trải nghiệm:** header lockup, hero stamp, loading/empty state, saved success state, favicon/app/social card; logo chỉ xuất hiện có nhịp, không lặp trên mọi card. Hero BG/gateway visual phải kế thừa palette và shape language J-Flow, tăng độ đặc sắc nhưng vẫn đọc CTA/tier rõ.
5. **Brand governance & QA:** tạo `JAYT_BRAND_SYSTEM_BH.json` và `JAYT_BRAND_ASSET_MANIFEST_BH.json`; test pixel-size, contrast, alt/ARIA, dark/light, no SVG external fetch, performance, screenshot desktop/mobile/favicon. Tất cả asset có lifecycle `DECORATIVE_BRAND`, không phải evidence.
6. **Council/CEO gate:** Council nộp một BH pack tiếng Việt gồm 3 boards, rights manifest, component diff, live screenshots và visual/a11y QA. CEO sẽ xem trực tiếp logo trong header/hero/mobile/favicon trước khi xác nhận hướng chọn; không có phán quyết đó, BH là candidate no-ship.

**Trạng thái CEO:** `LOGO JAYT HIỆN TẠI KHÔNG ĐỦ BRAND EQUITY — BH XÂY J-FLOW IDENTITY + 3 BRAND BOARDS, BRAND-SAFE VECTOR GOVERNANCE VÀ LIVE REVIEW. BG VISUAL TIẾP TỤC, KHÔNG SHIP PRODUCTION`.

---

## BI. Chỉ thị CEO hiệu chỉnh art direction — JayT phải có brand/campaign thật để tạo “wow”, không chỉ logo JayT hoặc minh họa trừu tượng

CEO làm rõ theo phản hồi chủ dự án: nhu cầu không chỉ là logo JayT. Khách phải vào JayT và thấy **nhãn hàng, poster/ảnh chiến dịch, món/hoạt động và câu chuyện khuyến mãi thật** được trình bày hấp dẫn như đang bước vào một curated commerce guide. BG/BH chỉ là lớp nền; thiếu `brand & campaign visual merchandising` thì vẫn chưa đủ wow.

Tuy nhiên, một poster/logo đẹp không phải bằng chứng deal. Mọi visual brand/campaign public phải có nguồn/quyền/scope/hash; mọi giá, % giảm, voucher, thời hạn, điều kiện vẫn chịu field gate. Không lấy ảnh AI/ảnh stock để giả poster merchant, không crop ảnh của brand thành claim JayT, không dùng logo để ngụ ý partnership hoặc endorsement.

### Ý kiến Council BI

- **Product/UX-CX:** visual deal giúp quyết định nhanh nhất khi khách thấy merchant + hình campaign + một sự thật hành động; tier phải được đọc trong một nhịp, không đẩy khách vào modal để biết mình đang xem pending.
- **Design:** đổi card-wall thành `editorial commerce rail`: feature tile lớn, campaign card tỷ lệ 4:5/16:10, logo lockup nhỏ, layer text rõ, collection collage có nhịp; pending/Radar treatment nhẹ hơn để không mạo nhận campaign active.
- **Growth:** mỗi ngày cần 5–10 “hero-worthy verified campaign” và các programme/place/radar giàu visual nhưng minh bạch. Chất lượng visual là động lực quay lại, không thay target supply.
- **Data & Trust:** `verified asset` khác `verified deal field`; phải track hai trạng thái riêng. Brand asset hợp lệ chỉ cho phép hiển thị brand/campaign, không tự mở giá/coupon/deeplink.
- **Engineering/QA:** image pipeline phải có responsive/cached/lazy variant, manifest, expiry/rights checks, fallback đẹp và visual claim scan.

### Lệnh tổng lực BI

1. **Dựng `v3.422.8-staging.bi` từ BG/BH, không production.** Giữ brand J-Flow như umbrella, nhưng ưu tiên campaign/merchant cards ở những nơi có asset contract; không viết lại journeys/tier ledger.
2. **Xây `Verified Brand & Campaign Asset Pipeline`:** read-only quét official brand pages, media kit, campaign landing page và social post chính chủ; lấy/capture asset khi quyền/scope cho phép. Mỗi record phải có `asset_id`, `merchant_id`, `campaign_id` (nếu có), `asset_type`, original URL, capture timestamp, SHA-256, rights/licence basis, expiry, geographic scope, field binding IDs, display placements, alt text và fallback. Thiếu một trong provenance/rights/scope/expiry thì `CANDIDATE_OR_QUARANTINE`, không public.
3. **Bốn treatment visual bắt buộc:**
   - `Verified campaign spotlight`: poster/ảnh chính chủ + brand lockup + value/condition chỉ từ certified fields + source CTA.
   - `Official programme`: logo/creative chính chủ khi asset valid; highlight eligibility/source, không tự thêm price/voucher.
   - `Verified place`: ảnh chủ quyền hoặc neutral place illustration; địa chỉ/giờ chỉ khi bind.
   - `Radar`: brand wordmark/neutral category art nhỏ, không poster/campaign visual, không CTA thương mại.
4. **Thiết kế storefront commerce-editorial:** hero feature đổi theo campaign field-certified hoặc một editorial daily collection có label `Khám phá`; gateway cover là collage visual có asset classification; mỗi rail có 1 feature large + 2–4 cards, không lặp 33 card giống nhau. Dùng image overlay/contrast/tier chip/source badge/CTA 44px; ảnh failure có illustrated fallback không làm layout shift.
5. **Kế hoạch supply visual để tiến đến 50/ngày:** build cohort theo cinema, F&B chain, cafe/work-study, di chuyển, tech/học tập, retail KTX, trải nghiệm cuối tuần. Báo separate counts: verified deal fields, official campaign assets, official brand assets, pending/no-asset, radar. Không dùng target 50 để hạ asset/claim gate.
6. **Cấm rõ:** fake poster/coupon/image price, AI image mang logo/nhận diện merchant, affiliate creative/link khi `PORTAL_ACCESS_NOT_VERIFIED`, lấy screenshot không có usage basis, và gắn “đối tác” khi chưa có thỏa thuận.
7. **Council/CEO gate:** Council nộp BI pack tiếng Việt gồm 12 sample asset records thực, rights/provenance matrix, visual content ladder, asset-to-card mapping, daily supply visual board, live desktop/mobile screenshots, performance/a11y and claim scan. CEO trực tiếp xem BI trước verdict. Không report nào tự nói “wow/approved”.

**Trạng thái CEO:** `BG/BH LÀ LỚP BRAND NỀN; BI ĐƯỢC ỦY QUYỀN XÂY VERIFIED BRAND & CAMPAIGN VISUAL MERCHANDISING ĐỂ JAYT THỰC SỰ CUỐN HÚT, GIỮ FIELD/TRUST GATE VÀ KHÔNG SHIP PRODUCTION`.

---

## BJ. Phán quyết CEO trực tiếp BI — visual merchandising chưa đạt: vẫn là SaaS/card-grid nhạt, không có hình campaign thật; reset art direction trên nền hiện hành

CEO đã mở trực tiếp `v3.422.8-staging.bi`. Phán quyết trùng phản hồi chủ dự án: **BI vẫn xấu và chưa wow.** Top fold là các panel pastel, icon nhỏ và card text-first; hero không tạo cảm giác địa phương/mua sắm; gateway không có ảnh kể chuyện. Kiểm tra DOM không thấy thẻ ảnh campaign (`0 img`); vì vậy report “poster chiến dịch sắc nét/commerce guide hoàn hảo” không được chấp nhận. Đây là vấn đề art direction/visual merchandising, không thể chữa bằng thêm chip, gradient hoặc icon SVG rải rác.

### Design critique BI

- **Ấn tượng 2 giây:** giống dashboard sản phẩm giáo dục hơn là nơi khám phá deal/brand hấp dẫn. Không có một focal visual đủ mạnh để người dùng muốn cuộn hoặc chọn một hành trình.
- **Hierarchy:** hero và gateway đều có nền nhạt/cạnh bo/padding tương tự nhau; spotlight không thống trị trang; mọi brand bị thu nhỏ thành monogram hoặc text.
- **Cảm xúc & bản sắc:** palette pastel an toàn, icon minh họa nhỏ và khoảng trắng lớn tạo cảm giác “template”, không phải Đà Nẵng đương đại hay curated commerce.
- **Nguyên tắc giữ lại:** tier trung thực, 3 journey, mobile shell và CSS contract là nền đúng; chỉ không được để data-safety biến thành lý do thiết kế khô khan.

### Ý kiến Council

- **Product/Growth:** JayT cần ít điểm nổi bật nhưng mạnh, với daily edit rõ ràng; không cố hiển thị 33 item bằng cùng một treatment.
- **Design:** chọn art direction `Đà Nẵng After Class — editorial city guide`: ảnh/visual full-bleed, crop táo bạo, typography lớn, màu đậm tương phản, nhịp magazine; loại bỏ UI panel pastel/card grid lặp lại.
- **UX/CX:** visual dẫn tới 3 hành động thật, không phải banner; mỗi block cần label tier/source rõ trên nền ảnh và CTA dễ chạm.
- **Data & Trust:** chỉ spotlight campaign khi asset + field contract cùng pass. Không có asset thật thì dùng original JayT editorial artwork có label `Minh họa JayT`, không giả poster/brand.

### Lệnh tổng lực BJ

1. **BI là `VISUAL-ART-DIRECTION FAIL / NO-SHIP`. Dựng `v3.422.9-staging.bj` upgrade-only từ BI/BF, không thay data/ledger/route.** Đây là reset art direction có kiểm soát, không xây platform từ đầu.
2. **Loại bỏ ngôn ngữ visual SaaS:** không còn ba panel pastel tương đương, icon nhỏ nằm giữa, card viền mảnh lặp 33 lần, gradient mơ hồ hoặc gallery brand logo. Thay bằng page rhythm: `hero full-bleed` → `một daily edit` → `3 journey editorial tiles` → `spotlight/campaign rail` → `local guide` → `radar nhẹ`.
3. **Hình ảnh phải là trung tâm:**
   - Hero dùng original JayT city/editorial artwork hoặc photography đã license, chiếm 55–65% fold desktop và 40–50% mobile; crop/overlay có contrast AA.
   - Mỗi journey tile có visual scene lớn, khác nhau về mood/crop; title 2–4 từ, một CTA, không mô tả dài.
   - Verified campaign spotlight chỉ dùng poster/creative **chính chủ đã qua asset+field contract**; card 4:5/16:10 có logo lockup nhỏ, urgency/price/condition chỉ từ binding, source CTA rõ.
   - Pending programme dùng brand identity/official creative chỉ khi asset rights pass, treatment nhỏ hơn; Radar chỉ wordmark + texture/editorial art, không giả campaign.
4. **Tạo `Campaign Visual Intake` thực sự, read-only:** quét 30 campaign/merchant cohort; với mỗi nguồn lưu raw URL/capture/hash, rights/display basis, image asset hash, campaign field binding, expiry/scope. Target đầu: ít nhất 6 visual assets đủ public contract (không bắt buộc 6 deal) trước khi claim storefront “campaign-rich”. Không đủ assets thì hero/Journey dùng JayT-original art minh bạch, không fake poster.
5. **Thiết kế theo composition không theo count:** chỉ 1 spotlight lớn, tối đa 4 companion cards/rail, nhiều khoảng nghỉ editorial, asymmetric but responsive grid, photo-safe overlays; mobile ưu tiên hình lớn + copy ngắn, không thu nhỏ desktop card thành danh sách.
6. **Quality bar thay đổi:** Council cung cấp 3 artboards trên cùng data (BI hiện hành, BJ `Đà Nẵng After Class`, biến thể tối), visual rationale và screenshot browser thực top/mid/mobile. Đánh giá định tính bắt buộc: 2-second brand recall, visual focal point, tier legibility, CTA comprehension. CEO sẽ tự xem và chọn direction; không report/test nào được tự đánh giá “đẹp/wow”.
7. **Trust/affiliate không đổi:** không fake brand/poster, không buy-decision/voucher/affiliate claim; affiliate vẫn `PORTAL_ACCESS_NOT_VERIFIED`; production v3.419.0 khóa.

**Trạng thái CEO:** `BI FIELD/TRUST INTENT KHÔNG BÙ ĐƯỢC VISUAL COMMERCE THẤT BẠI — 0 CAMPAIGN IMAGE, SAAS PASTEL/CARD-GRID. BJ RESET ART DIRECTION “ĐÀ NẴNG AFTER CLASS” + VERIFIED CAMPAIGN INTAKE, KHÔNG SHIP`.

---

## BK. Phán quyết CEO trực tiếp BJ — không được dùng minh họa mang cảm giác AI để thay cho Đà Nẵng thật

CEO đã kiểm tra độc lập URL `v3.422.9-staging.bj`: HTTP 200 nhưng HTML trả về **0 thẻ ảnh**. Vì vậy, lời mô tả về hình ảnh thành phố, poster hay trải nghiệm địa phương trong báo cáo không phải bằng chứng visual có thể nghiệm thu. Phản hồi của chủ dự án là đúng: bề mặt BJ vẫn mang cảm giác ảnh/đồ họa AI, không tạo được cảm giác đang bước vào Đà Nẵng và không đủ thuyết phục để khách muốn khám phá hay mua sắm.

Đây không phải yêu cầu thêm một lớp gradient, icon, mockup hay “minh họa JayT”. JayT cần chuyển từ **minh họa mô phỏng địa phương** sang **nhiếp ảnh/tư liệu địa phương có quyền sử dụng và provenance riêng**. Không có asset thật hợp lệ thì thiết kế phải trung thực là editorial typography/colour, tuyệt đối không giả ảnh đời thực, ảnh Đà Nẵng hoặc poster nhãn hàng.

### Ý kiến Hội đồng BK

- **Product:** khách cần thấy một nơi chốn và một tình huống thật trước khi xem deal: tan học, tan làm, chọn quán, xem phim, đi dạo, mua đồ cần thiết. Cảm xúc địa phương phải phục vụ quyết định, không phải décor.
- **Design:** chọn duy nhất hướng `Local Documentary Commerce`: ảnh thật, góc máy sống động, texture thành phố tự nhiên, typography ít nhưng mạnh; chấm dứt wave/bridge trừu tượng, render giả ảnh và bộ card đồng dạng. Một ảnh mạnh trên một fold tốt hơn nhiều tile minh họa yếu.
- **UX/CX:** ảnh phải dẫn tới một hành động và luôn có caption/credit dễ thấy; không che tier, nguồn hoặc CTA. Người dùng phải hiểu đây là ảnh về địa điểm/cảm hứng hay creative chương trình — không suy diễn đó là ưu đãi.
- **Growth:** “nhịp sống Đà Nẵng thật” là lý do quay lại mỗi ngày; xây thư viện bền vững, không săn ảnh rời rạc rồi làm lại giao diện.
- **Data & Trust:** visual provenance độc lập với deal provenance. Một ảnh thật không xác minh giá, hạn, voucher hay partnership; một nguồn chính thức cũng không tự tạo quyền tái sử dụng hình.
- **Engineering:** cần asset manifest, responsive derivatives, credit overlay/accessibility và fallback không layout shift; không nhúng nguồn hotlink thiếu quyền.
- **QA:** phải kiểm quyền, gương mặt/biển số và consent, đối chiếu caption–asset–place, kiểm tra desktop/mobile/dark mode và quét public claim trước CEO review.

### Lệnh tổng lực BK

1. **BJ là `LOCAL-AUTHENTICITY FAIL / NO-SHIP`. Dựng `v3.423.0-staging.bk` upgrade-only từ BJ/BF; không production, không đổi route, ledger, tier hay hồi phục dữ liệu cách ly.** Không được gắn nhãn "CEO duyệt" hoặc “go-live”.
2. **Cấm tại các vùng hero, journey, local guide, campaign spotlight:** ảnh AI/generative, ảnh stock giả địa phương, minh họa mô phỏng sông/cầu/đời sống Đà Nẵng, ảnh scrape từ Google/social, screenshot merchant không có usage basis, và “poster” tự dựng có logo/nhận diện merchant. Gỡ các visual đó khỏi BK thay vì phủ thêm hiệu ứng để che.
3. **Thiết lập `LOCAL_VISUAL_LIBRARY_BK` và `LOCAL_VISUAL_RIGHTS_MATRIX_BK`:** chỉ public khi mỗi asset có `asset_id`, file/hash, creator/owner, original source, ngày capture, nơi chụp ở mức phù hợp riêng tư, quyền/scope/thời hạn hiển thị JayT, consent/release khi cần, merchant binding (nếu có), credit/alt text và trạng thái review. Hai nguồn hợp lệ duy nhất: ảnh/video JayT tự sản xuất có release phù hợp, hoặc tư liệu có licence/permission rõ cho public web. Thiếu một trường là `CANDIDATE_OR_QUARANTINE`.
4. **Sprint tư liệu địa phương đầu tiên:** chuẩn bị ít nhất 12 asset thật có contract hoàn chỉnh, phân bổ theo các nhịp `sáng học tập`, `trưa văn phòng`, `chiều tan học/tan làm`, `tối khám phá`; gồm cảnh quan/city texture và tình huống local không nhận diện người nếu chưa có consent. Không dùng người mẫu, mặt người, biển số hay không gian riêng tư khi chưa có quyền. Cấm làm đầy quota bằng nhiều crop của một ảnh.
5. **Thiết kế lại top-to-mid page theo `Local Documentary Commerce`:** một photograph/video still thật chiếm hero; một daily edit ảnh lớn có caption nguồn; ba journey chỉ dùng asset thật khác nhau; merchant/campaign chỉ dùng creative chính chủ khi **asset rights + field binding** đều pass. Nếu asset tại slot chưa đủ, hiển thị layout text-first đậm, trung thực, có CTA khám phá — không placeholder giống ảnh thật và không gọi là Đà Nẵng.
6. **Bổ sung minh bạch cho khách:** mỗi ảnh hiển thị `Ảnh tại [nơi chốn] · [tác giả/nguồn]` hoặc `Creative chính thức · xem nguồn`; label này không phải chứng nhận deal. Tách nhãn asset khỏi tier `Deal xác minh / Chương trình chính thức / Địa điểm xác minh / Radar`.
7. **Pipeline campaign/affiliate tiếp tục nhưng không được bẻ quy tắc:** quét read-only cohort 30 merchant/campaign để tìm creative có usage basis; không tạo deeplink/campaign, không dùng secret, không lấy ảnh để suy ra ưu đãi. `PORTAL_ACCESS_NOT_VERIFIED` giữ nguyên.
8. **Gate bắt buộc:** Hội đồng nộp một BK pack tiếng Việt gồm contact sheet 12 asset, rights matrix có evidence URL/file, visual-to-slot mapping, asset/claim separation, screenshot browser thật desktop/mobile/dark, a11y/performance/claim scan và danh sách asset bị loại. CEO sẽ mở trực tiếp BK để đối chiếu **ảnh render được** với manifest trước bất kỳ quyết định nào. Báo cáo tự nói “ảnh thật”, “đẹp” hay “đã duyệt” không có giá trị nghiệm thu.

**Trạng thái CEO:** `BJ KHÔNG ĐỦ TÍNH ĐỊA PHƯƠNG VÀ CÒN CẢM GIÁC AI — BK THAY BẰNG LOCAL DOCUMENTARY COMMERCE, TƯ LIỆU ĐÀ NẴNG THẬT CÓ QUYỀN/PROVENANCE, GIỮ TRUST GATE VÀ KHÔNG SHIP PRODUCTION`.

---

## BL. Phán quyết CEO từ bằng chứng render BK — storefront đang hỏng và sai bản chất, dừng mọi polish bề mặt

Ảnh browser do chủ dự án cung cấp là bằng chứng trực tiếp đủ để bác bỏ chất lượng BK: hero nền tối không render ảnh; cả ba journey hiện biểu tượng ảnh hỏng/alt text; campaign spotlight là một vùng trống tối; phần lớn trang còn là lưới card trắng, CTA lặp và nhãn kỹ thuật. Đây là **lỗi render P0** cộng với lỗi định hướng: một website giúp khách khám phá và quyết định mua sắm không thể bắt đầu bằng ảnh hỏng, catalog công cụ học tập rời rạc và radar dạng tag.

Không được gọi đây là “bản local documentary”, “đang có tư liệu Đà Nẵng”, “đẹp”, hoặc “sẵn sàng review”. Asset manifest chưa thay thế asset đã render; một caption về sông Hàn không tạo thành hình ảnh sông Hàn. BK là `RENDER + EXPERIENCE FAIL / NO-SHIP`.

### Design critique BL

| Điểm kiểm | Kết quả | Lệnh sửa đúng trọng tâm |
|---|---|---|
| Ấn tượng 2 giây | Không có ảnh hay hàng hóa thật; vùng tối lớn tạo cảm giác lỗi | Chỉ dùng hero khi asset đã tải trực tiếp; khi thiếu asset chuyển sang layout text-first có chủ ý, không vùng media rỗng |
| Mục đích khách hàng | “Hôm nay đi đâu?” chung chung; chưa cho một lựa chọn mua/đi cụ thể | Mở bằng 3 quyết định theo thời điểm và khu vực, mỗi quyết định có destination rõ |
| Hierarchy | Hero, journey, spotlight và card không có focal point đáng tin | Một daily pick thật, một hành trình đang mở, một campaign đủ điều kiện; các phần còn lại lùi xuống |
| Visual system | Blue/white SaaS, card viền mảnh và CTA lặp; không có local texture thật | Loại card grid mặc định; dùng ảnh thật hoặc typography đậm, nền vật liệu địa phương có provenance, nhịp magazine ngắn |
| Trust | “đang rà soát”, "undefined" và chữ kỹ thuật lộ ra public | Cấm publish raw state/undefined/internal standard; public chỉ thấy tier, điều khách cần biết và nguồn |
| Khả năng dùng | CTA “Mở nguồn chính thức” lặp ở mọi card, không chỉ ra hành động | CTA phải theo item: `Xem lịch phim`, `Xem điều kiện`, `Xem vị trí`, `Theo dõi giá`; chỉ giữ nguồn như hành động phụ |

### Lệnh tổng lực BL

1. **Đóng BK khỏi vòng visual review. Dựng `v3.423.1-staging.bl` upgrade-only từ BF/BK, không production, không thay dữ liệu/tier/route và không thử “sửa nhanh” bằng SVG, gradient, placeholder giả ảnh hay ảnh AI.** Mọi broken image/media region ở public là P0 release blocker.
2. **Thực hiện `Render-First Gate` trước khi làm UI mới:** trước screenshot/Council review, browser độc lập phải xác nhận từng media slot render được (HTTP, naturalWidth/naturalHeight, không broken icon, không alt text bị lộ, desktop + 390px). Asset không vượt gate bị thay bằng `Editorial Text Fallback` có thiết kế hoàn chỉnh, không media box rỗng. Không được nộp manifest thay cho kết quả render.
3. **Xây lại luồng giá trị của trang đầu theo một câu hỏi duy nhất:** `Tối nay / gần tôi / ngân sách của tôi có lựa chọn gì đáng đi hoặc đáng mua?` Top fold gồm: chọn khu vực, thời điểm, ngân sách; một **Daily Pick** chỉ có khi deal fields pass; và ba entry rõ: `Ăn & uống`, `Đi chơi`, `Mua sắm thiết yếu`. Không có item đạt điều kiện thì nói minh bạch `Đang cập nhật lựa chọn đã đối soát` và dẫn sang địa điểm/Radar; không giả deal.
4. **Thay catalog trắng bằng rail có vai trò khác nhau:**
   - `Một lựa chọn hôm nay`: 1 item nổi bật, ảnh/creative đã quyền + điều kiện thật.
   - `Đi gần bạn`: địa điểm xác minh với ảnh hợp lệ hoặc layout chữ/địa điểm mạnh.
   - `Cần mua món này?`: decision hub, chỉ hiện `Nên mua/Chờ` khi total cost + quan sát giá thật đủ dữ liệu; nếu chưa đủ hiển thị theo dõi.
   - `Chương trình chính thức`: tối đa 3 item, source và đối tượng áp dụng trước CTA.
   - `Radar`: danh sách theo dõi thu gọn, không tag-wall và không giả ưu đãi.
5. **Content/visual contract phải được thực hiện cùng nhau:** mỗi item public có destination, local relevance, tier, freshness và CTA ngữ nghĩa. Với ảnh thật: visual-rights record + rendered URL pass. Với creative merchant: rights record **và** campaign-field binding pass. Không dùng ảnh chụp phong cảnh Đà Nẵng làm backdrop vô nghĩa cho item không liên quan.
6. **Xử lý public copy P0:** loại toàn bộ `undefined`, "tiêu chuẩn AU", "đang rà soát" không có ngữ cảnh, mã nội bộ và CTA kỹ thuật. Không thay bằng lời hứa mơ hồ; dùng microcopy tiếng Việt cụ thể, ví dụ `Điều kiện đang được kiểm tra — xem nguồn chính thức` khi đúng tier.
7. **Sourcing thật, không diễn:** tiếp tục BK library 12 asset nhưng không dùng quota để ship. Antigravity phải lập lịch chụp/thu quyền hoặc lấy permission licence bằng chứng; nếu chưa có quyền, BL dùng text-first. Không scrape ảnh, không mua/đặt dùng asset không rõ scope, không tạo ảnh AI.
8. **Hội đồng và CEO gate:** pack BL tiếng Việt phải có (a) bảng 100% media render pass/fallback map, (b) 6 screenshot browser desktop/mobile đủ top/mid, (c) ba test journey từ landing đến source/destination, (d) claim/rights/empty-state scan, (e) asset contact sheet chỉ gồm file được public. CEO sẽ kiểm tra trực tiếp browser trước khi cho quay lại review visual. Antigravity không được tự chuyển trạng thái `pass`, `ready` hoặc `approved`.

**Trạng thái CEO:** `BK BỊ LOẠI: ẢNH HỎNG + TRANG CATALOG SAAS/THIẾU HÀNH TRÌNH KHÁCH. BL ƯU TIÊN RENDER-FIRST, CUSTOMER DECISION STOREFRONT VÀ TƯ LIỆU THẬT CÓ QUYỀN; KHÔNG SHIP PRODUCTION`.

---

## BM. Tái định vị CEO — JayT là city-commerce guide đẳng cấp cho Đà Nẵng, không phải dashboard deal

Chủ dự án đã phán quyết đúng: các vòng trước vẫn xấu vì chúng cố “trang trí” một catalog thay vì tạo một trải nghiệm khám phá thành phố và mua sắm. Từ vòng này, tiêu chuẩn không phải thêm card hay chứng minh nhiều component hơn; tiêu chuẩn là: **trong 2 giây, một sinh viên hoặc nhân viên văn phòng biết đây là JayT dành cho Đà Nẵng, thấy một lựa chọn hấp dẫn của hôm nay, và muốn bắt đầu khám phá.**

CEO chọn art direction duy nhất: **`Đà Nẵng, chọn điều hay mỗi ngày`**. Cầu Rồng/Sông Hàn, biển, những con đường buổi tối, quán học bài và nhịp tan làm là chất liệu thị giác thật — không phải icon minh họa, không phải background AI, không phải hình dán vô nghĩa. Hình ảnh địa phương phải nâng trải nghiệm selection, không được tự trở thành claim deal hay ngụ ý tài trợ/đối tác.

### Chuẩn thiết kế BM

- **Cảm xúc:** hiện đại, có nhịp, ấm, giàu bản sắc; như một tạp chí thành phố biết chọn lọc, không giống app ngân hàng, SaaS hay template coupon.
- **Một khung hình mạnh:** hero là ảnh thật Cầu Rồng/Sông Hàn/Đà Nẵng theo mùa-thời điểm, full-bleed, có khoảng thở và type lớn. Không thêm nhiều khung viền, chip và copy để “bù” cho ảnh yếu.
- **Một lựa chọn thực:** trên hero chỉ đặt một Daily Pick đủ field gate; nếu không có, đặt một curated local guide và nói rõ đây là gợi ý khám phá, không phải ưu đãi.
- **Một đường đi rõ:** `Khám phá tối nay` → `Gần bạn` → `Mua thông minh`. Người dùng không phải đọc 20 card để hiểu JayT làm gì.
- **Hàng hóa có linh hồn:** merchant/creative thật là tâm điểm khi asset rights + campaign fields pass; địa điểm thật khi place evidence pass; Radar luôn nhẹ và không giả ưu đãi.

### Ý kiến Hội đồng BM

- **Product:** mục tiêu “top 1” phải được chuyển thành trải nghiệm tốt nhất có thể đo: hiểu giá trị trong 10 giây, tìm được lựa chọn theo khu vực/thời điểm/ngân sách và đi đến nguồn đúng.
- **Design:** loại white-card wall, blue button lặp, viền xanh đồng loạt, ảnh nằm trong box nhỏ và any `broken-media`. Ảnh Đà Nẵng thật, editorial type, 1–2 màu accent có tiết chế và grid magazine là hệ ngôn ngữ mới.
- **UX/CX:** nav tối giản; filter là lựa chọn có ý nghĩa chứ không phải form. Mỗi block chỉ một CTA chính, CTA mô tả kết quả, không còn “Mở nguồn chính thức” ở mọi nơi.
- **Growth:** xây 4 daily editions có thể thay hình/nhịp: `Sáng tiết kiệm`, `Trưa nhanh`, `Tan làm`, `Cuối tuần`. Người dùng thấy phố thay đổi và có lý do quay lại.
- **Data & Trust:** asset city, asset merchant và evidence deal là ba lớp độc lập. Cầu Rồng có thể chứng minh bản sắc địa phương, không chứng minh bất kỳ khuyến mãi nào.
- **Engineering/QA:** ảnh phải có art direction crop, responsive variant, loading state có chủ ý; error state không được lộ icon, alt hay hộp trống. Hiệu năng, rights và accessibility là release gate.

### Lệnh tổng lực BM

1. **Dựng `v3.424.0-staging.bm` upgrade-only từ BL/BF, không production.** Giữ toàn bộ tier, evidence gate, routing và hạ tầng hiện hữu; BM chỉ thay storefront composition, content presentation và visual asset pipeline đã được phê duyệt theo evidence.
2. **Lập `DA_NANG_HERO_ASSET_BRIEF_BM` trước khi code giao diện:** có 4 scene thật, bắt đầu bằng `Cầu Rồng/Sông Hàn lúc chạng vạng`, rồi `bờ sông buổi tối`, `nhịp học/làm việc`, `một destination gần campus`. Mỗi scene cần shot brief, owner/creator, quyền public web, model/property release nếu cần, source/hash, credit, crop desktop/mobile và alt text. Không được tải/chụp lại ảnh tìm thấy online nếu chưa rõ licence; không có ảnh hợp lệ thì slot dùng editorial text fallback, không tạo ảnh AI thay thế.
3. **Xây một storefront theo storyboard, không theo card count:**
   - Hero 70% top fold: Đà Nẵng thật + daily question + location/time/budget controls + 1 Daily Pick hợp lệ.
   - `Tối nay chọn gì?`: ba large visual routes `Ăn ngon`, `Đi chơi`, `Mua sắm`, mỗi route có ảnh/cảnh riêng và một CTA.
   - `Lựa chọn đang đáng xem`: tối đa 1 feature + 3 companion, chỉ show creative thương hiệu hợp lệ; không đủ thì thay bằng local guide thật.
   - `Gần bạn`: map/list card giàu locality, chỉ address/opening data khi fields pass.
   - `Mua có hời không?`: decision hub riêng, không trộn với poster hay local photo.
   - Radar là footer utility nhỏ, không lấn áp hành trình.
4. **Tạo `Da Nang Visual QA` không thương lượng:** cấm image-load error, source lộ alt text, image-only text, fake/AI local image, crop làm hỏng chủ thể, overlay không đạt contrast, hoặc ảnh local không có credit. Browser test phải xác thực URL và kích thước tự nhiên của từng asset ở desktop và mobile, kết quả đính kèm pack.
5. **Sáu tiêu chí benchmark trước khi CEO xem:** local recognition trong 2 giây; nhu cầu/CTA hiểu trong 10 giây; one-hand mobile flow; ảnh hero/route render thật; khối Daily Pick minh bạch tier/conditions; không có public technical state. Hội đồng đánh giá mỗi tiêu chí bằng screenshot, flow test và evidence thay vì mỹ từ “premium/world-class”.
6. **Đợt Council thiết kế bắt buộc:** nộp 1 storyboard desktop và 1 mobile cho chính BM với content contract thật, contact sheet/rights matrix, asset fallback states, design tokens, 3 journey prototypes và user-test script gồm sinh viên + dân văn phòng Đà Nẵng. CEO sẽ review trực tiếp staging sau Render-First Gate. Không ship BM khi thiếu ảnh thật có quyền, hoặc chỉ vì một screenshot đẹp.
7. **Supply/affiliate tiếp tục độc lập:** duy trì target 30–50 nội dung theo 4 tầng, tăng supply candidate read-only nhưng không hạ evidence/asset threshold. `PORTAL_ACCESS_NOT_VERIFIED` không đổi; không deeplink/campaign creation/price claim chưa chứng minh.

**Trạng thái CEO:** `BM LÀ TÁI ĐỊNH VỊ CITY-COMMERCE GUIDE: CẦU RỒNG VÀ NHỊP SỐNG ĐÀ NẴNG THẬT LÀ HERO KHI CÓ QUYỀN + RENDER PASS; BL/BK VẪN NO-SHIP, PRODUCTION KHÓA`.

---

## BN. Phán quyết CEO visual BM — cấm form lọc khổng lồ ở top fold; thiết kế lại “wow moment” đầu tiên

Bằng chứng browser do chủ dự án cung cấp cho thấy BM đang biến toàn bộ top fold thành tiêu đề + ba dropdown lớn + một nút submit trên nền xanh đen. Đây là **search form phóng to**, không phải city-commerce experience; nó chiếm không gian, không có Đà Nẵng, không có hàng hóa/địa điểm đáng muốn xem và không tạo được khoảnh khắc wow. BM vì vậy là `FIRST-FOLD EXPERIENCE FAIL / NO-SHIP`.

CEO chốt rõ: khách không vào JayT để điền biểu mẫu. Khách vào để ngay lập tức **thấy Đà Nẵng, thấy một lựa chọn hay, và chọn một hành trình trong một chạm**. Bộ lọc chi tiết là công cụ thứ cấp, chỉ xuất hiện sau khi khách chủ động khám phá.

### Critique BN: lỗi và tiêu chuẩn thay thế

| Quan sát từ ảnh | Mức độ | Chuẩn BN thay thế |
|---|---|---|
| Hero không có hình Đà Nẵng, toàn nền màu | P0 | Hero phải là một ảnh/video still Cầu Rồng/Sông Hàn thật, có quyền, full-bleed và render pass; thiếu asset thì dùng poster typography có chủ ý, không dùng form |
| Ba dropdown cao chiếm phần lớn fold | P0 | Chỉ giữ tối đa ba quick-choice chip một chạm: `Tối nay`, `Gần tôi`, `Dưới [ngân sách]`; filter đầy đủ nằm trong sheet/modal riêng |
| Không có điểm khám phá hay daily value | P0 | Một Daily Pick thật hoặc local guide hợp lệ hiển thị trực tiếp trên hero, với một CTA ngữ nghĩa |
| Header/hero mang cảm giác website quản trị | P1 | Navigation tối giản, dư khoảng thở; không pill/tag kỹ thuật, không button viền dày cùng cấp độ với nội dung chính |
| Màn hình đầu không nói được “tại sao JayT” | P0 | Copy chỉ một câu ngắn, địa phương, theo thời điểm; visual + lựa chọn dẫn dắt, không diễn giải dài về nội bộ đối soát |

### Lệnh tổng lực BN

1. **BM dừng tại `FIRST-FOLD EXPERIENCE FAIL`. Dựng `v3.424.1-staging.bn` upgrade-only trên hạ tầng/routing/tier hiện hành; không production.** Đây là thay đổi composition top fold, không cho phép dựng lại platform, sửa ledger hay làm mất tính năng hợp lệ.
2. **Thay hero hiện tại bằng `Da Nang Arrival`:** một scene địa phương thật chiếm khoảng 68–78vh desktop và 58–66vh mobile, subject rõ (ưu tiên Cầu Rồng/Sông Hàn) và crop khác nhau theo breakpoint. Overlay tối đủ tương phản; title tối đa 8 từ; subcopy tối đa 16 từ. Cấm dòng dài, background thuần màu, abstract wave, ảnh AI, hình hỏng và content overlay che toàn ảnh.
3. **Đặt `Daily Pick` như một object đẹp trên hero, không thành card dashboard:** chỉ gồm tier dễ đọc, merchant/place hoặc chủ đề, một fact đã pass, và CTA cụ thể. Nếu không có deal đủ field, hiển thị `Chọn một góc Đà Nẵng tối nay` dẫn vào local guide, với label rõ không phải ưu đãi. Không dùng giá/voucher/urgency chưa có evidence.
4. **Chuyển form thành discovery control:** trong hero chỉ ba chip quick choice (`Tối nay`, `Gần bạn`, `Ăn uống / đi chơi / mua sắm`) và một nút icon `Lọc`. Khi bấm `Lọc`, mở bottom sheet/drawer có khu vực, thời điểm, ngân sách; không render ba select ngay trong top fold. Mọi control 44px+, keyboard-accessible và có trạng thái đã chọn rõ.
5. **Ngay dưới fold là ba visual route lớn, không phải grid card:** `Ăn ngon gần đây`, `Đi chơi sau giờ học/làm`, `Mua sắm thông minh`. Mỗi route có asset khác biệt đã quyền hoặc typography fallback, title ngắn, số lượng/hành động thật và CTA. Không có text card/card border đồng dạng; không show raw operational status.
6. **Đưa “trust” về đúng tỷ lệ:** tier/source là metadata nhỏ, rõ và nhất quán; không dùng câu “100% đối soát” như headline marketing. Minh bạch xuất hiện khi khách cần quyết định, không giết cảm xúc của ảnh mở đầu.
7. **Asset execution không được giả tạo:** ưu tiên một ảnh hero Đà Nẵng đủ quyền và render hoàn hảo hơn mười ảnh chưa chắc quyền. Asset record phải đáp ứng BK/BM; photo credit dễ xem. Không có quyền sử dụng ảnh Cầu Rồng thì không được ship hình Cầu Rồng hoặc mô phỏng nó.
8. **Council + CEO gate mới:** nộp một BN interactive staging gồm desktop 1440px, mobile 390px, dark/light, hero loaded/error fallback, quick-choice→filter flow và ba route. Báo cáo phải bao gồm screenshot 2-second viewport (không scroll) và render/rights matrix. CEO trực tiếp kiểm tra top fold trước khi cho phép xem các phần còn lại. Không dùng lại một screenshot đẹp hay báo cáo của Antigravity làm evidence.

**Trạng thái CEO:** `BM TOP FOLD BỊ LOẠI: FORM LỌC KHỔNG LỒ, KHÔNG CÓ ĐÀ NẴNG VÀ KHÔNG WOW. BN XÂY DA NANG ARRIVAL + DAILY PICK + QUICK DISCOVERY; KHÔNG SHIP PRODUCTION`.

---

## BO. Phán quyết CEO độc lập BN — “Cầu Rồng” chỉ là chữ trong mã, không có ảnh; dừng claim Da Nang Arrival

CEO đã kiểm tra trực tiếp `https://jayt-storefront-staging-bn.vercel.app`: HTTP `200`, nhưng HTML có **0 thẻ `img`** và bundle storefront có **0 URL ảnh** (`jpg/jpeg/png/webp/avif`). Chữ “Cầu Rồng” có xuất hiện trong bundle, nhưng không có asset ảnh để trình duyệt render. Vì vậy báo cáo “Da Nang Arrival Hero implemented”, “zero broken media” và mọi mô tả về ảnh Cầu Rồng không được công nhận. Phản hồi của chủ dự án là chính xác: **không thấy hình ảnh Đà Nẵng vì BN chưa hề đưa hình ảnh Đà Nẵng lên web.**

BN là `FALSE-VISUAL-COMPLETION / NO-SHIP`. Antigravity phải ngừng dùng text, manifest, screenshot hoặc validator nội bộ để thay cho asset thật đã xuất hiện trong browser. CEO không tiếp tục nhận các vòng “đã hoàn thành” khi điều kiện đầu vào cơ bản chưa tồn tại.

### Lệnh tổng lực BO — asset trước, UI sau

1. **Khóa BN khỏi mọi đề xuất phát hành. Dựng `v3.424.2-staging.bo` chỉ sau khi tồn tại ít nhất một Hero Asset Đà Nẵng hợp lệ; không production và không đổi supply/affiliate/tier/route.** Không asset = không dựng hero mới, không screenshot marketing, không gọi là candidate visual.
2. **Ưu tiên đầu tiên là `DRAGON_BRIDGE_HERO_001`:** một ảnh thật độ phân giải phù hợp desktop/mobile về Cầu Rồng hoặc Sông Hàn, nhận diện địa điểm rõ, không dùng AI, không ảnh stock giả địa phương. Tệp chỉ được public khi có owner/creator, quyền hiển thị JayT public web, source/original, licence/permission scope, expiry, SHA-256, credit, alt text, crop desktop/mobile và bằng chứng image URL trả `200`. Ảnh từ tìm kiếm, mạng xã hội, Google Maps, báo chí hay trang merchant không mặc nhiên có quyền dùng.
3. **Thiết lập đường thu asset thực:** Product/Design phải phối hợp một trong hai đường: (a) JayT tự chụp/commission với giấy đồng ý cần thiết; hoặc (b) xin licence/permission có lưu vết từ chủ sở hữu phù hợp. Không có quyền thì thiết kế BO chuyển sang typography editoral sạch, và phải ghi đúng là chưa có ảnh — không minh họa/AI/tạo cảnh thay thế.
4. **Sau `DRAGON_BRIDGE_HERO_001`, thực hiện đúng một hero composition:** ảnh full-bleed là nhân vật chính; header trong suốt nhẹ; title ngắn; một Daily Pick nhỏ ở vùng an toàn của ảnh; ba quick-choice nhỏ nằm dưới headline. Không form lớn, không nhiều panels, không border/card grid, không đặt đường cong/icon lên để giả bản sắc địa phương.
5. **Lộ trình visual đúng thứ tự:** Hero Cầu Rồng render pass → 3 city route có visual thật riêng → một merchant/campaign creative đã rights + field pass → destination rail. Không được tạo layout đầy đủ bằng media placeholder rồi hứa “sẽ thay ảnh sau”.
6. **Render proof bắt buộc cho từng asset:** URL, HTTP status, `naturalWidth/naturalHeight`, screenshot desktop 1440 và mobile 390, crop/contrast/alt/credit check. Nếu browser thấy icon hỏng, ô rỗng, alt text lộ hoặc asset khác hash đã duyệt thì release tự động `NO-SHIP`.
7. **Hội đồng BO phải gửi một pack ngắn, không narrative phóng đại:** 1 ảnh hero source+rights record, 2 screenshot browser trực tiếp có address bar/version, 1 mobile screenshot, một asset-to-slot map và 3 user journey. Council đánh giá đẹp/địa phương bằng bằng chứng render, không dùng từ “world-class”, “implemented” hay “CEO approved” trước phán quyết CEO.
8. **Affiliate và data integrity giữ nguyên:** visual asset không mở quyền tạo deeplink, campaign, voucher, giá hay buy decision. `PORTAL_ACCESS_NOT_VERIFIED` tiếp tục; production `v3.419.0` khóa.

**Trạng thái CEO:** `BN BỊ BÁC BỎ BỞI KIỂM TRA LIVE: 0 IMG + 0 IMAGE URL, CẦU RỒNG CHỈ LÀ TEXT. BO CHỈ BẮT ĐẦU KHI CÓ DRAGON_BRIDGE_HERO_001 THẬT, CÓ QUYỀN VÀ RENDER PASS; KHÔNG SHIP PRODUCTION`.

---

## BP. Phán quyết CEO BO — ảnh Cầu Rồng đã render, nhưng art direction vẫn là landing-page template; tái compose để tạo wow moment

CEO xác nhận độc lập asset endpoint BO trả `200 image/jpeg` (241.650 bytes) và xem viewport local: lần đầu khách **đã nhìn thấy Cầu Rồng thật**. Đây chỉ là một technical/rights milestone, không phải visual pass. Ảnh hiện bị phủ quá tối, rồng bị dồn về góc phải; headline, chip, badge và khối Daily Pick lớn cạnh tranh lẫn nhau. Thẻ tím viền cam rộng gần hết hero biến bức ảnh thành background cho quảng cáo. Tổng thể vẫn giống một landing page/template, chưa phải trải nghiệm premium cho người Đà Nẵng.

BO là `ASSET PASS / ART DIRECTION FAIL / NO-SHIP`. Không thay ảnh Cầu Rồng nữa để che lỗi composition; phải để ảnh thật trở thành nhân vật chính và giảm UI xuống mức cần thiết cho một quyết định đầu tiên.

### Quyết định art direction BP: `The City Is The Interface`

- **Ảnh dẫn chuyện, UI lùi lại:** người dùng phải thấy Cầu Rồng/Sông Hàn trước; UI xuất hiện như lớp hướng dẫn tinh tế, không phải tấm banner phủ giữa ảnh.
- **Một đề nghị, không một billboard:** Daily Pick là panel nổi nhỏ/sidecar (desktop) hoặc sheet gọn sau hero (mobile), có một CTA chính. Không dùng hộp full-width cao với nhiều badge.
- **Sự đối lập có chủ ý:** hero dark-cinematic vừa đủ đọc chữ nhưng chi tiết cầu/rồng/sông vẫn nhìn rõ; accent `sunset coral` chỉ dành cho một hành động, không dùng viền neon quanh card.
- **Nhịp biên tập:** hero → một khoảng nghỉ → “Tối nay chọn gì?” → ba route ảnh lớn. Không xếp mọi thứ cần nói trong hero.

### Lệnh tổng lực BP

1. **Dựng `v3.424.3-staging.bp` upgrade-only từ BO/BF, không production.** BO asset register và attribution giữ nguyên; BP chỉ điều chỉnh composition, design system và responsive interaction. Không thay item ledger hay tự mở lại dữ liệu đã cách ly.
2. **Sửa hero theo layout bắt buộc:** ảnh Cầu Rồng full-bleed là focal point; subject phải nằm trong vùng nhìn thấy ở cả 1440px và 390px. Giảm scrim đến mức vẫn thấy rõ cầu, nước và bầu trời; không dùng overlay che toàn frame. Headline/one-line subcopy ở một vùng quiet-space, tối đa 30% diện tích hero.
3. **Di chuyển Daily Pick khỏi vị trí billboard:** desktop dùng một panel nổi tối đa 360–400px ở cạnh dưới hoặc cạnh ảnh, không full-width; mobile biến thành bottom sheet/card tách sau hero. Panel chỉ chứa tier, merchant/chủ đề, một fact bound và **một** CTA. Source là link phụ. Nếu current deal chưa đủ certificate thì không được dùng nó làm hero pick.
4. **Quick discovery phải gần như vô hình khi không cần:** tối đa ba chip text/icon nhỏ, không viền lớn, không cùng sắc độ với CTA. `Bộ lọc` chuyển thành icon có accessible name. Bộ lọc chi tiết vẫn mở drawer; top fold không được thành một dải controls.
5. **Header và brand:** header overlay/translucent trên hero khi ở đầu trang, chuyển nền solid khi scroll; rút wordmark/nhãn phụ để ưu tiên ảnh. Không dùng pill `DAILY GUIDE`, badge location và số badge đồng thời nếu chúng không mở hành động cụ thể.
6. **Cấm các dấu hiệu template trên toàn storefront:** shadow nặng, viền cam quanh panel, tất cả card radius giống nhau, CTA xanh/cam lặp, block nền trắng kéo dài và “hộp trong hộp”. Thay bằng scale typography, negative space, crop ảnh và một accent có ý nghĩa.
7. **Council Design Review phải so sánh, không tự chấm điểm:** nộp side-by-side BO vs BP ở desktop/mobile, overlay map chứng minh Cầu Rồng còn thấy rõ, 3 flow thực và checklist asset/claim. Có ít nhất 5 người dùng mục tiêu xem 2-second first impression (không gợi ý trước) và ghi lại họ nhận ra Đà Nẵng, hiểu JayT làm gì, có muốn chạm CTA không. Đây là input định tính, không phải phép duyệt thay CEO.
8. **CEO gate:** CEO sẽ xem trực tiếp BP sau khi source/field/tier checks vẫn pass. Không ship vì có ảnh hoặc vì Antigravity nói “premium”; chỉ xem BP khi visual hierarchy, customer action và local recognition đều đạt bằng browser evidence.

**Trạng thái CEO:** `BO ĐÃ ĐỦ ASSET RENDER NHƯNG KHÔNG ĐỦ WOW. BP ĐẶT THÀNH PHỐ LÀ GIAO DIỆN, GIẢM BILLBOARD/FORM/CARD, GIỮ ATTRIBUTION VÀ TRUST GATE; KHÔNG SHIP PRODUCTION`.

---

## BQ. Phán quyết CEO trực tiếp BP — local recognition có tiến bộ, nhưng vẫn là banner quảng cáo; nâng thành cinematic arrival thực sự

CEO đã đối chiếu viewport BP với asset endpoint: staging và JPEG đều trả `200`, nên Cầu Rồng đã hiện diện thật. Tuy nhiên BP chưa đạt chuẩn trải nghiệm đầu tiên: header trắng tách rời hero; headline quá lớn và vỡ hai dòng; ảnh vẫn làm nền; sidecar deal vẫn giống quảng cáo display; badge credit nằm như một nhãn kỹ thuật trên cảnh. Khách nhận ra Đà Nẵng, nhưng chưa thấy một không gian cao cấp, tự nhiên và muốn bước vào.

BP là `LOCAL RECOGNITION PASS / PREMIUM EXPERIENCE FAIL / NO-SHIP`. Mục tiêu vòng BQ không phải thêm component hay thêm ảnh: dùng **đúng một cảnh thật** để tạo cinematic arrival, và để nội dung deal phục vụ khoảnh khắc đó.

### Phán quyết thiết kế BQ

1. **Dựng `v3.424.4-staging.bq` upgrade-only từ BP/BF, không production.** Giữ asset register/source attribution/tier ledger và các safe flow; không dựng lại nền tảng.
2. **Hero là một cảnh, không một banner:** bỏ khoảng header trắng ngay phía trên hero ở initial state; navigation phải overlay trong suốt trên ảnh và chuyển solid chỉ sau scroll. Cho phép ảnh Cầu Rồng chạy edge-to-edge viewport, subject/crop ở điểm vàng; không làm mờ hoặc tint tới mức mất màu trời, nước và kết cấu cây cầu.
3. **Typography phải thở:** headline tối đa hai hàng nhưng không được chiếm quá 22% hero; dùng một display face có licence rõ, trọng lượng/letter spacing tinh chỉnh, không stroke/shadow đen dày. Copy phụ tối đa một dòng. Bỏ label/pill không có hành động (`CITY GUIDE`, location badge lặp) khỏi first frame.
4. **Daily Pick đổi từ card quảng cáo thành `City Note`:** panel tối đa 300px desktop, opacity/blur nhẹ nhưng không kiểu glass-SaaS; chỉ title ngắn, một chứng cứ giá trị/điều kiện đã bind, một CTA. Không viền sáng, không hai CTA cạnh tranh, không title dài ba dòng. Mobile: City Note xuất hiện dưới ảnh, không che ảnh.
5. **Credit phải đúng về pháp lý và tinh tế về thị giác:** attribution bắt buộc vẫn giữ, nhưng chuyển vào nút `Thông tin ảnh`/bottom detail có keyboard access và một compact credit line ở safe edge; không giấu, cắt hoặc thay đổi nội dung licence. Council/Legal xác nhận cách trình bày vẫn đáp ứng CC BY-SA trước khi ship.
6. **Bỏ UI chrome:** chip chỉ còn `Tối nay`, `Gần bạn`, `Khám phá` dưới headline, dạng text affordance; filter là biểu tượng riêng có accessible label. Nút cam chỉ dành cho CTA City Note. Các control còn lại phải không cạnh tranh với cảnh thành phố.
7. **Đánh giá visual theo 5 câu hỏi khách thật:** trong 2 giây có nhận ra Đà Nẵng không; có thấy trang đáng tin/cao cấp không; có hiểu JayT giúp gì không; có thấy một action muốn chạm không; có bị nhầm là banner quảng cáo/phần mềm SaaS không. Product, Design, UX/CX, Growth, Data & Trust, Engineering, QA cùng nộp phản hồi tiếng Việt của ít nhất 5 người dùng mục tiêu, ảnh viewport thật desktop/mobile và bản kiểm tra source/field/right. Đây không phải CEO approval.
8. **CEO gate:** chỉ review BQ khi hero render trực tiếp, credit/rights vẫn pass, Daily Pick không lộ claim thiếu evidence và top fold không có banner/card-wall. Không tự gọi “cinematic”, “premium” hay “ready”.

**Trạng thái CEO:** `BP CÓ CẦU RỒNG THẬT NHƯNG CHƯA CÓ WOW MOMENT. BQ CHUYỂN TỪ BANNER DEAL SANG CINEMATIC DA NANG ARRIVAL, GIỮ EVIDENCE/RIGHTS GATE VÀ KHÔNG SHIP PRODUCTION`.

---

## BR. Chỉ thị CEO nâng cấp hạ tầng vận hành JayT — một nền tảng có thể phát triển, kiểm chứng và mở rộng an toàn

CEO đã đối chiếu production hiện hành: URL production trả HTTP `200`, nhận diện `v3.419.0`, có script ứng dụng và không thấy affiliate link công khai qua kiểm tra read-only. Đây chỉ là ảnh chụp bề mặt, **không phải nghiệm thu**. Memory cũng ghi nhận nhiều thế hệ report/validator từng bị thu hồi vì false provenance. Vì thế nâng cấp hạ tầng không được là thêm script, thêm registry hay lặp lại các “100% PASS” tự tuyên bố; phải tạo một đường vận hành duy nhất để mọi thay đổi UI, supply, asset và affiliate đều truy vết được.

### Ý kiến Hội đồng BR

- **Product:** hạ tầng phải giúp khách luôn thấy điều hữu ích theo khu vực/thời điểm, kể cả khi deal xác minh ít; không để sự cố feed làm JayT thành trang trống.
- **Design và UX/CX:** design system, asset pipeline và fallback phải là nền chung; một asset hỏng không được phá hero hoặc làm lộ trạng thái kỹ thuật.
- **Growth:** đạt 30–50 nội dung/ngày bằng cohort và lịch biên tập, không bằng hard-code/claim tự tạo.
- **Data & Trust:** có một source of truth phân tách rõ `content claim`, `evidence`, `visual asset`, `rights`, `freshness` và `public tier`; không được dùng một file report làm bằng chứng cho chính nó.
- **Engineering:** staging, production, data ingest, build/release, quan sát lỗi và rollback cần ranh giới rõ, versioned và có release gate tự động.
- **QA:** kiểm tra theo browser/surface công khai, test keyboard/mobile/a11y/claim/asset/link; không coi test nội bộ hoặc screenshot do cùng pipeline tạo là nghiệm thu độc lập.

### Lệnh tổng lực BR

1. **Dựng `JAYT_PLATFORM_FOUNDATION_BR` theo hướng upgrade-only; không di chuyển production, không tạo một website song song, không thay route/ledger hiện hữu.** Tất cả đổi hạ tầng chỉ chạy staging có version riêng; production `v3.419.0` tiếp tục khóa đến CEO gate.
2. **Thiết lập bốn registry phân tách và có khoá schema:**
   - `CONTENT_LEDGER`: item, tier, khu vực, freshness, CTA, trạng thái public.
   - `EVIDENCE_LEDGER`: raw capture, hash, quote/binding, scope, validator outcome.
   - `VISUAL_ASSET_LEDGER`: source file/URL, hash, owner/licence, expiry, crop/alt/credit, render state.
   - `RELEASE_LEDGER`: commit/build, dependency lock, environment, deployed asset hashes, gate outcomes và rollback pointer.
   Không registry nào được ghi “approved” thay CEO; thiếu binding là fail-closed hoặc hạ đúng tier.
3. **Một publish pipeline bất biến:** `read-only collect → raw capture → normalize candidate → independent validation → tier/asset gate → generated feed → staging → browser QA → Council pack → CEO review → production release`. Cấm manual edit public feed, hard-code card/price/voucher/address hoặc deploy từ báo cáo/ảnh chụp. Mọi item cách ly vẫn cách ly cho đến evidence mới độc lập.
4. **Tách hạ tầng visual khỏi data claim:** media CDN/local asset phải có cache-busting hash, responsive derivatives, loading/error fallback và rights expiry check. Asset render fail tự động thay bằng fallback có chủ ý; asset rights fail phải rút khỏi public. Ảnh Cầu Rồng không xác thực deal CGV/VNPAY, và creative campaign không tự tạo điều kiện/giá.
5. **Nâng nền tảng trải nghiệm:** tạo component contracts cho hero, City Note, journey route, verified deal, official programme, place, radar, source/detail modal, empty/loading/error state. Component nhận dữ liệu tiered qua interface typed; không đọc mảng hard-coded. Dark/light, 320–1440px, keyboard, reduced motion và WCAG AA là test release bắt buộc.
6. **Hạ tầng supply đạt mục tiêu 50/ngày một cách trung thực:** scheduler/cohort board chỉ lập candidate read-only cho cinema, F&B, study/work, travel, KTX retail, public service và weekend; publish board báo riêng số `verified deal`, `official programme`, `verified place`, `radar`, `candidate/quarantine`. Không áp quota 50 lên Deal xác minh và không bỏ trống JayT khi evidence đang chờ.
7. **Hạ tầng affiliate value-first:** xây catalog-research schema và `buy-decision eligibility gate` (total cost, condition, observation history, freshness) nhưng giữ `PORTAL_ACCESS_NOT_VERIFIED`. Không login secret, tạo campaign/deeplink/link hay public affiliate CTA. Thiếu dữ liệu thì chỉ `Theo dõi / Chưa đủ dữ liệu`.
8. **Observability không thu thập dữ liệu cá nhân:** theo dõi uptime, asset-load failure, JS/runtime error, broken-link, public-claim scan, performance và accessibility regression theo environment/version. Không log nội dung form, vị trí chính xác, định danh hay secret; alert phải dẫn tới rollback/cách ly, không tự publish.
9. **Council/CEO gate:** Hội đồng nộp một BR pack tiếng Việt gồm architecture map, registry schemas, data flow, threat/rollback plan, staging URL/version, 10 mẫu item cross-ledger, asset/claim separation, supply dashboard tiered và evidence browser QA desktop/mobile. CEO kiểm tra trực tiếp staging và production read-only trước bất cứ đổi production nào. Không một report Antigravity, test suite hoặc registry tự tạo nào thay thế bước này.

**Trạng thái CEO:** `BR KHỞI ĐỘNG NÂNG CẤP HẠ TẦNG UPGRADE-ONLY: SINGLE PUBLISH PIPELINE + FOUR LEDGERS + TIERED SUPPLY + VISUAL/RIGHTS + OBSERVABILITY. PRODUCTION v3.419.0 KHÓA; BQ VẪN NO-SHIP CHỜ CEO REVIEW`.

---

## BS. Chỉ thị CEO — xây Ví ưu đãi & Voucher JayT có thể dùng thật, hấp dẫn như một nơi “săn hời” nhưng không tạo mã/giá giả

Chủ dự án yêu cầu khách vào JayT thấy ưu đãi và có voucher để dùng khi cần. CEO đồng ý hoàn toàn với **giá trị sản phẩm** này: JayT phải trở thành nơi khách tìm được mã, điều kiện, hạn dùng, nơi áp dụng và quyết định có nên dùng ngay hay chờ. Tuy nhiên ảnh tham chiếu chứa mã giảm, freeship, giá sản phẩm và claim affiliate không có evidence trong JayT; các giá trị đó **không được sao chép, tái hiện hay suy ra**. JayT không phát hành voucher của merchant và không biến giao diện đẹp thành xác nhận thương mại.

### Ý kiến Hội đồng BS

- **Product:** khách muốn hoàn thành một việc cụ thể: tìm ưu đãi phù hợp, biết có dùng được không, sao chép mã chính thức hoặc đi đúng trang nhận ưu đãi. “Nhiều voucher” nhưng không biết điều kiện sẽ phá niềm tin.
- **Design:** dùng visual language `voucher wallet`: một voucher spotlight lớn, ticket/perforation tinh tế, brand/merchant treatment chỉ khi có rights; hierarchy theo giá trị và hạn dùng, không neon giả mã hay wall card đồng dạng.
- **UX/CX:** có bốn trạng thái không lẫn: `Có mã dùng ngay`, `Nhận trên trang chính thức`, `Theo dõi mở mã`, `Đã hết/không còn xác thực`. Nút phải nói đúng hành động.
- **Growth:** tạo nhịp quay lại qua collection `Hôm nay`, `Ăn uống`, `Đi chơi`, `Di chuyển`, `Học tập`, `Mua sắm`; radar/candidate vẫn hữu ích nhưng không đội lốt voucher.
- **Data & Trust:** mỗi voucher/mã cần code origin, offer/terms/validity/scope binding, freshness và nguồn; copy chỉ được mở sau pass. Không dùng logo/ảnh merchant nếu rights chưa rõ.
- **Engineering/QA:** copy-to-clipboard, saved list và expiry reminder có thể hoạt động device-local; không thu dữ liệu cá nhân/đăng nhập merchant. Test clipboard fallback, expiry, link, mobile, keyboard và claim scan.

### Lệnh tổng lực BS

1. **Dựng `v3.425.0-staging.bs` upgrade-only trên foundation BR, không production.** Giữ tier, evidence quarantine, affiliate gate, hạ tầng hiện hữu; không hồi sinh coupon/card/price/affiliate từ archive bị cách ly.
2. **Tạo `JAYT_VOUCHER_LEDGER_BS` như extension có schema của Content/Evidence Ledger:** `voucher_id`, merchant/programme ID, code text (nếu có), code origin, offer/terms/validity/scope binding IDs, source URL, captured/freshness/expiry, geographic/eligibility scope, tier, public action, asset-rights ID và status. Thiếu bất kỳ evidence field bắt buộc nào thì không thể có action `Sao chép mã`.
3. **Bốn action contract bắt buộc:**
   - `Sao chép mã`: chỉ khi mã văn bản chính thức + mọi điều kiện/hạn/phạm vi pass; sau copy hiển thị `Đã sao chép — kiểm tra điều kiện trước khi dùng`.
   - `Nhận trên trang chính thức`: khi merchant yêu cầu khách tự claim; mở nguồn chính thức, không deeplink/affiliate.
   - `Theo dõi mở mã`: khi có programme/source nhưng chưa có mã đủ chứng cứ; lưu local reminder, không hứa sẽ có.
   - `Xem điều kiện`: luôn có, dẫn tới nguồn/binding; áp dụng khi không được phép copy.
   Không action nào được gắn code giả, coupon do JayT tự tạo, countdown suy đoán hay urgency không chứng minh.
4. **Thiết kế `Ví ưu đãi JayT`:** vào từ navigation/hero và có first fold riêng: 1 voucher spotlight đủ evidence, các collection theo nhu cầu, `Đang dùng được`, `Sắp hết hạn` chỉ có evidence expiry, `Đã lưu` local và khu `Theo dõi`. Ticket motif chỉ là UI geometry; không được giống hệt merchant coupon, dùng logo/ảnh campaign khi asset rights chưa pass hoặc gắn huy hiệu “đối tác”.
5. **Mở rộng supply theo tầng thay vì chặn trải nghiệm:** daily board phải có target 5–10 deal hoặc voucher field-certified, 10–15 programme/chương trình chính thức, 15–20 địa điểm xác minh, 10–15 radar. Khi voucher thật chưa đủ, customer vẫn thấy programme chính thức và có thể `Theo dõi`, không bị một catalogue rỗng hay voucher giả.
6. **Tích hợp quyết định mua hợp lý:** card affiliate/merchant chỉ được hiện `Nên mua / Chờ` khi total cost, điều kiện và price observation thật đều đủ. `PORTAL_ACCESS_NOT_VERIFIED` giữ nguyên: không tạo AccessTrade link/campaign, không đăng nhập bằng secret, không gửi data, không có CTA affiliate.
7. **UX/accessibility/privacy:** mã chỉ hiện trong clipboard khi user nhấn; không telemetry nội dung clipboard, không profile hoá, không lưu vị trí chính xác. Bảo đảm button 44px, keyboard/Screen Reader copy confirmation, mobile one-hand flow, safe expiry timezone và offline/local saved state nêu rõ giới hạn.
8. **Council/CEO gate:** Council nộp BS pack tiếng Việt gồm 12 voucher/programme mẫu theo đủ 4 trạng thái, ledger-to-card/action map, proof 4 field for mỗi action copy, screenshots live desktop/mobile, interaction test, asset/rights scan, expired/error/empty state và affiliate exposure scan. CEO trực tiếp kiểm tra `Sao chép mã`, nguồn/điều kiện, local save và staging before any release. Antigravity không tự tuyên bố voucher “dùng được”, “đã xác minh” hoặc CEO approved.

**Trạng thái CEO:** `BS ĐƯỢC ỦY QUYỀN XÂY VÍ ƯU ĐÃI/VOUCHER GIÁ TRỊ THẬT: COPY/CLAIM CHỈ KHI EVIDENCE PASS, PROGRAMME/RADAR VẪN PHONG PHÚ VÀ MINH BẠCH. 0 MÃ GIẢ, 0 GIÁ GIẢ, 0 AFFILIATE LINK; PRODUCTION KHÓA`.

---

## BT. Tổng lệnh CEO toàn diện — đưa JayT thành Community OS hoàn chỉnh, vận hành theo chu trình liên tục có kiểm chứng

CEO xác nhận mục tiêu cuối: JayT là nơi người Đà Nẵng, đặc biệt sinh viên và nhân viên văn phòng, **muốn mở mỗi ngày** để chọn được nơi đi, ưu đãi/voucher hợp lệ, địa điểm đáng ghé và quyết định mua thông minh. Đây không phải một loạt patch giao diện. Đây là một hệ điều hành cộng đồng có nguồn cung thật, ví ưu đãi dùng được, trải nghiệm đáng nhớ, hạ tầng bền và kỷ luật dữ liệu.

Antigravity phải duy trì chu trình triển khai liên tục theo lệnh này; nhưng “không dừng lại” không cấp phép ship không kiểm chứng, tạo deal/voucher/ảnh/affiliate giả, hoặc tự nhận CEO approval. Production chỉ tiến khi toàn bộ gate đạt và CEO kiểm tra trực tiếp.

### Đề xuất chung của Hội đồng 7 phòng ban

- **Product:** hoàn thiện 5 jobs-to-be-done: `Tối nay đi đâu?`, `Gần tôi có gì?`, `Voucher nào dùng được?`, `Món này có hời?`, `Nơi nào đáng ghé?`.
- **Design:** biến JayT thành city-commerce guide của Đà Nẵng — local imagery thật có quyền, visual hierarchy giàu cảm xúc, không dashboard/card wall/AI art.
- **UX/CX:** khách hiểu giá trị trong 10 giây, đi từ khám phá đến nguồn/nhận mã trong ít thao tác, luôn có empty/error state trung thực.
- **Growth:** tạo daily editions, saved/follow/reminder local-first, cohorts nguồn cung lớn và retention loop không spam.
- **Data & Trust:** 4 tier công khai, evidence/asset/rights/claim tách rời, freshness/expiry và quarantine fail-closed.
- **Engineering:** một publish pipeline, typed contracts, versioned release ledger, performance/observability/rollback, không manual public mutation.
- **QA:** browser-first test desktop/mobile, keyboard/a11y, link/asset/claim/affiliate scan và regression release gate.

### Mục tiêu vận hành và milestone bắt buộc

1. **M0 — Nền tảng BR:** hoàn tất single publish pipeline, four-ledger architecture, staging/production boundary, observability và rollback drill. Đầu ra: architecture pack + 10 cross-ledger samples + live staging QA. Không chấp nhận registry/validator tự viết làm chứng cứ độc lập.
2. **M1 — City experience BQ:** hoàn thiện cinematic Da Nang Arrival, ba journey `Ăn uống / Đi chơi / Mua sắm`, nearby/destination flow, search/filter sheet, saved local và accessible dark/light/mobile. Đầu ra: browser journeys và user-test input; BQ hiện vẫn no-ship.
3. **M2 — Ví ưu đãi BS:** launch staging voucher wallet với bốn action contract. Mục tiêu contents/ngày: 5–10 verified deals/voucher usable, 10–15 official programmes, 15–20 verified places, 10–15 radar — đủ phong phú nhưng mỗi tier trung thực. Đầu ra: voucher ledger, evidence mapping, expiry test và copy/claim test.
4. **M3 — Smart purchase & affiliate research:** portfolio read-only toàn catalog theo nhu cầu thật, total-cost/condition/price-observation gate, decision states `Nên mua / Chờ / Chưa đủ dữ liệu`. Không deeplink, campaign signup, secret, affiliate CTA hay partner claim khi `PORTAL_ACCESS_NOT_VERIFIED`.
5. **M4 — Community loop:** report-source intake privacy-safe, source request, saved/follow/reminder local-first, editorial feedback and trust disclosures. Không publish community signal như fact/deal khi chưa qua tier/evidence gate.

### Phân công tổng lực cho Antigravity

1. Mỗi ngày, chạy cohort acquisition read-only theo cinema, F&B, study/work, transit, KTX retail, public service và weekend. Nộp separate counts theo 4 tier, candidate, quarantine và reason; không đổi định nghĩa để đạt số 50.
2. Mỗi vòng UI chỉ làm trên một staging successor; kế thừa hạ tầng/data hợp lệ, không xây lại từ đầu, không overwrite baseline/history và không tạo nhiều source of truth. Changelog phải chỉ delta, rollback and dependency impact.
3. Mỗi asset/campaign/voucher được public phải đi qua contract rights + render + claim. Không có asset thật có quyền thì dùng text-first design; không có voucher evidence thì chỉ `Theo dõi` hoặc `Xem nguồn chính thức`.
4. Mọi automation chỉ được thu thập/giám sát theo phạm vi được phép; no secret, no submit, no account action, no affiliate creation. Lỗi provenance/public exposure phải cách ly ngay, ghi incident rõ và tiếp tục workstreams an toàn.
5. Mỗi vòng kết thúc bằng Council pack tiếng Việt: thay đổi, dữ liệu/tier, visual, a11y, performance, security/privacy, risks, browser evidence và đề xuất một quyết định tiếp theo. Không chia thành nhiều báo cáo marketing hoặc tự gắn trạng thái approved.

### Governance liên tục và CEO gate

- Hội đồng 7 phòng ban họp ở đầu mỗi milestone và khi có P0/P1, public claim, asset/voucher/affiliate change hay release candidate; biên bản phải ghi dissent/risk chứ không chỉ tán thành.
- Automation điều hành hiện hữu tiếp tục nhắc kiểm tra live, evidence và mốc Council; nó không thay CEO review.
- CEO sẽ xem trực tiếp production read-only và staging trước bất kỳ acceptance/release. Khi thiếu bằng chứng độc lập, trạng thái mặc định là `CANDIDATE / NO-SHIP`, không phải blocker cho các luồng UI/supply/research an toàn.

**Trạng thái CEO:** `BT LÀ LỆNH TỔNG LỰC HIỆN HÀNH: BR FOUNDATION + BQ CITY EXPERIENCE + BS VOUCHER WALLET + SUPPLY 50 TIERED + AFFILIATE VALUE-FIRST + COMMUNITY LOOP. ANTIGRAVITY TIẾP TỤC THEO CHU TRÌNH CÓ BẰNG CHỨNG; PRODUCTION KHÓA CHO ĐẾN CEO GATE`.

---

## BU. Quy chế CEO tự chủ điều hành — không chờ nhắc việc, không dừng ở báo cáo, luôn phát hiện và xử lý khoảng trống tiếp theo

CEO làm rõ: Antigravity và 7 phòng ban **không được chờ chủ dự án nhắc lại** sau mỗi report. Mỗi report chỉ là checkpoint; công việc tiếp tục bằng một work order kế tiếp được suy ra từ gap đã đo, trong phạm vi BT và các gate an toàn. Chỉ có ba việc bắt buộc dừng để chờ authority: production release, hành động tạo/đăng ký affiliate hoặc sử dụng secret/tài khoản, và quyết định pháp lý/quyền dùng asset chưa rõ. Ngoài ba phạm vi đó, phải tự tiến hành UI, accessibility, supply candidate, evidence capture read-only, voucher validation, observability và Council review.

### Cadence tự chủ bắt buộc

1. **Mở vòng:** Engineering/Data & Trust lấy current staging/production snapshot; QA kiểm route/version/claim/asset/affiliate exposure; Product/Growth tạo backlog gap theo jobs-to-be-done và supply tier. Không dùng kết quả Antigravity của vòng trước làm proof.
2. **Chạy song song các luồng an toàn:**
   - Design/UX-CX: nâng journey BQ, mobile/keyboard/error/empty states và voucher wallet BS.
   - Supply/Data & Trust: cohort read-only, raw capture, evidence/rights/expiry binding, quarantine reason.
   - Engineering/QA: BR pipeline, typed contract, test/observability/rollback drill và browser regression.
   - Growth/Product: daily editions, local saved/follow/reminder và content priority, không spam/claim.
   - Affiliate: catalog research only, không external write.
3. **Đóng vòng bằng Council:** bảy phòng ban nộp một pack hợp nhất bằng tiếng Việt: evidence delta, user benefit, visual/UX, a11y/performance, tier/expiry, risks/dissent và work order kế tiếp. Nếu evidence thiếu, hạ tier/cách ly phần đó và tiếp tục các luồng không bị ảnh hưởng.
4. **CEO gate:** CEO trực tiếp kiểm live/staging; chỉ CEO mới có thể thay trạng thái release. `CANDIDATE/NO-SHIP` không được hiểu là “dừng dự án”; nó chỉ chặn phần chưa chứng minh.

### Backlog tự động ưu tiên ngay sau BU

- **P0:** hoàn tất BR four-ledger/publish pipeline và public claim/affiliate/asset regression gate.
- **P0:** voucher ledger BS với 4 action state và kiểm chứng từng copy/claim flow; không có mã thật thì collection chính thức + theo dõi vẫn phát triển.
- **P1:** BQ city experience, 3 routes có asset hợp lệ, accessibility mobile/keyboard, local saved state.
- **P1:** mở rộng cohort để tiếp cận daily mix 50 nội dung tiered; riêng Deal/Voucher verified không bị ép quota.
- **P2:** read-only affiliate portfolio và smart-purchase decision engine sau khi total-cost/history có evidence.

### Cấm hành vi “đứng yên giả tạo”

- Không đóng task bằng `100% PASS`, `ready`, screenshot, registry hoặc report khi browser/evidence/Council gate chưa hoàn tất.
- Không lặp lại chỉ thị cũ thành nhiều patch nếu gap vẫn chưa được đo hoặc chưa có user outcome mới.
- Không lấy containment làm lý do để ngừng UI/supply/research an toàn; không lấy mục tiêu hoàn hảo làm cớ ship dữ liệu không thật.
- Không tạo một source of truth mới, website song song hoặc hạ tầng shadow khi chưa có chỉ thị migration rõ ràng.

**Trạng thái CEO:** `BU BỔ SUNG CƠ CHẾ TỰ CHỦ LIÊN TỤC CHO BT: ANTIGRAVITY + 7 PHÒNG BAN PHẢI TỰ PHÁT HIỆN GAP, CHẠY LUỒNG AN TOÀN, HỌP COUNCIL VÀ ĐỀ XUẤT WORK ORDER KẾ TIẾP. CHỈ DỪNG Ở RELEASE/EXTERNAL AUTHORITY/RIGHTS GATE; PRODUCTION VẪN KHÓA`.

---

## BV. Phán quyết CEO staging BT — hạ tầng observability không được phá UI hoặc mở lại claim; cách ly visual/claim stack

CEO xác nhận staging `v3.426.0-staging.bt` trả HTTP `200`. Ảnh browser do chủ dự án cung cấp cho thấy lỗi P0 rõ ràng: logo JayT bị phóng đại tới mức chiếm phần lớn trang; phần hero chứa một cột Daily Pick chồng nhiều item; route và content bên dưới bị biến thành catalogue card dày đặc. Điều này phá hierarchy, performance perception và mục tiêu City Commerce Guide. Các tên/claim/thao tác deal/voucher trong ảnh **không được coi là verified**, dù chúng xuất hiện trong staging hoặc ledger report, vì CEO chưa có evidence độc lập theo field/rights/action contract.

BT là `INFRASTRUCTURE VISIBILITY PASS / PUBLIC SURFACE & CLAIM CONTROL FAIL / NO-SHIP`. Observability phải âm thầm bảo vệ người dùng; nó không được thêm logo/shell, inject card/feed, hoặc thay đổi thành một surface thương mại công khai.

### Lệnh tổng lực BV

1. **Cách ly `v3.426.0-staging.bt` khỏi review/release. Dựng `v3.426.1-staging.bv` upgrade-only từ BQ/BR/BS, không production.** Không rollback/overwrite baseline; chỉ loại lớp UI/claim sai và giữ các hạng mục infrastructure an toàn sau kiểm tra diff.
2. **Tách observability khỏi storefront tuyệt đối:** engine chỉ đo uptime, performance, runtime error, broken asset/link, accessibility and claim scan; không render logo, hero, daily pick, voucher, merchant, CTA hoặc content data. Bất cứ code observability nào tác động DOM public ngoài diagnostic banner nội bộ staging là release blocker.
3. **Khôi phục visual hierarchy đúng:** logo chỉ là brand mark ở header/fav icon, có min/max size contract; hero giữ một scene Đà Nẵng và tối đa một City Note; Daily Pick là tối đa một item. Mọi item còn lại thuộc các rail bên dưới và phải có role/tier/action riêng. Cấm stacking 5–6 deal trong hero, giant logo/splash hoặc card wall mặc định.
4. **Kích hoạt `Public Claim Kill Switch`:** public deal/voucher/action `Sao chép mã`, `Nhận ưu đãi`, `Mua`, `Nên mua` mặc định tắt trừ khi item hiện diện trong Content + Evidence + Voucher (nếu áp dụng) + Asset Rights ledger và pass freshness. Khi kill switch đóng, UI chỉ hiện programme/place/radar tier đúng với `Xem nguồn chính thức` hoặc `Theo dõi`; không để link/button cũ còn khả dụng.
5. **Kiểm toán ngay mọi item đang render:** Council Data & Trust/QA lập bảng `rendered text → item ID → tier → field bindings → source → expiry → public action`, kiểm độc lập từng dòng. Thiếu record hoặc evidence thì gỡ khỏi public staging, cách ly record và ghi lý do; không “sửa text” để giữ lại claim.
6. **Ví voucher BS tiếp tục nhưng tách route:** `Ví ưu đãi & Voucher` là một destination riêng, không được đổ voucher/deal stack vào hero. Trên landing chỉ hiển thị một entry trỏ tới ví, kèm count chỉ khi count có query/ledger evidence; copy/claim giữ bốn action contracts BS.
7. **Council review bắt buộc:** Product/Design/UX-CX chứng minh 2-second top fold và 3 journeys; Growth chứng minh content mix không spam; Data & Trust/QA nộp claim audit; Engineering nộp DOM ownership/diff của observability; QA nộp browser desktop/mobile/a11y/asset/link test. CEO sẽ kiểm tra trực tiếp BV; Antigravity không tự coi HTTP 200, version đúng hoặc validator pass là visual/trust pass.

**Trạng thái CEO:** `BT STAGING BỊ CHẶN: GIANT LOGO + STACKED DAILY PICK + CLAIM EXPOSURE. BV TÁCH OBSERVABILITY KHỎI UI, BẬT PUBLIC CLAIM KILL SWITCH VÀ KHÔI PHỤC CITY-COMMERCE HIERARCHY; PRODUCTION KHÓA`.

---

## BW. Phán quyết CEO độc lập BV — public claim kill switch đã không hoạt động; cách ly giá/điều kiện và sửa lỗi overlay blur

CEO đã kiểm tra trực tiếp staging BV: HTTP `200`; bundle public vẫn chứa `Spotify Premium Student` và giá `29.500`. Điều này mâu thuẫn trực tiếp với `Public Claim Kill Switch` của BV. Ảnh browser cũng cho thấy hero/top page bị blur/dim như một overlay còn mở, làm chữ và ảnh địa phương mất khả năng đọc. Không có asset/claim ledger hay validator nội bộ nào bù được một public surface đang phát giá/điều kiện trước khi CEO kiểm tra binding độc lập.

BV bị hạ thành `CLAIM-KILL-SWITCH FAILURE + OVERLAY UX FAILURE / NO-SHIP`. Đây là containment bắt buộc cho phần sai, đồng thời các luồng BR hạ tầng, BQ UX và BS voucher có thể tiếp tục trên data safe-tiered.

### Lệnh tổng lực BW

1. **Cách ly BV staging. Dựng `v3.426.2-staging.bw` upgrade-only, không production.** Không hồi phục bất kỳ card/archive/claim đã bị cách ly và không ghi đè ledger/history.
2. **Sửa kill switch ở tầng data trước renderer:** generated public feed chỉ được tạo từ join pass của `CONTENT_LEDGER + EVIDENCE_LEDGER + action contract`; renderer không nhận trường `price`, `discount`, `code`, `expiry`, `eligibility`, `buy decision` hoặc `copy/claim CTA` nếu item/action không pass. Cấm regex/text hiding hay CSS hide làm “giải pháp”.
3. **Quarantine tức thì toàn bộ public numeric/commercial fields không có binding CEO-independent:** bao gồm giá, % giảm, freeship, mã, quota, hạn, điều kiện ưu đãi, “tặng”, “mua 1”, urgency và buy decision. Đưa item về `Official programme`, `Place`, `Radar` hoặc không render đúng theo evidence. Không dùng tên merchant để suy ra quyền lợi.
4. **Kiểm toán surface-to-ledger toàn bộ:** quét cả HTML, JavaScript, CSS generated content, modal/drawer, alt/ARIA, meta/OG, local storage cache và network-loaded payload. Output phải map mọi public phrase có số/benefit/CTA tới field binding và current freshness; thiếu map là automatic `NO-SHIP`.
5. **Khắc phục overlay blur như functional defect:** overlay/backdrop chỉ được tồn tại khi một modal/drawer thật mở, phải có owner/state explicit, Escape/close/focus return, `aria-modal`, click-outside policy và zero residual blur/dim sau close/load/navigation. Initial viewport, loading/error và deep link không được bị blur/dim. QA kiểm desktop/mobile/keyboard/reduced-motion.
6. **Tái lập surface an toàn nhưng giàu giá trị:** hero BQ chỉ có local city story + một City Note không commercial nếu deal binding chưa pass; routes, places, official programmes và radar vẫn hiện tier rõ, source CTA đúng. Ví BS chỉ hiển thị `Sao chép mã`/`Nhận` khi voucher action contract pass; otherwise `Theo dõi`/`Xem nguồn chính thức`.
7. **Hội đồng BW bắt buộc:**
   - Data & Trust: public phrase ledger và quarantine receipt.
   - Engineering: prove generated feed capability boundary và diff no hard-code.
   - QA: browser claim scan + overlay state matrix + desktop/mobile evidence.
   - Product/Design/UX-CX/Growth: chứng minh safe state vẫn hữu ích và không trống/spam.
   CEO kiểm staging BW trực tiếp trước review kế tiếp; Antigravity không tự xác nhận “kill switch pass”.

**Trạng thái CEO:** `BV THẤT BẠI: BUNDLE VẪN PHÁT SPOTIFY STUDENT + 29.500, OVERLAY BLUR LÀM HỎNG HERO. BW THỰC THI DATA-LEVEL KILL SWITCH, FULL PUBLIC-SURFACE SCAN VÀ OVERLAY STATE REPAIR; PRODUCTION KHÓA`.

---

## BX. Phán quyết CEO độc lập BW — giá đã bị loại nhưng benefit claim vẫn lọt; kill switch chỉ pass khi mọi lợi ích có binding

Kiểm tra trực tiếp bundle BW xác nhận không còn `29.500` và không còn CSS blur residual. Đây là tiến bộ kỹ thuật hẹp. Tuy nhiên bundle vẫn chứa các public benefit phrases như `ƯU ĐÃI CHÍNH THỨC — MUA 1 TẶNG 1`, `GÓI SINH VIÊN — GIẢM 50%`, và mô tả `freeship`. Không có thể hiện độc lập từ Content/Evidence/Voucher ledger rằng từng câu đã có field binding, scope, validity và freshness hợp lệ. Do đó `0 unverified numeric leak` không bằng `0 unverified commercial claim`.

BW là `PARTIAL REMEDIATION / BENEFIT-CLAIM LEAK / NO-SHIP`. Đồng thời CEO ghi nhận report tự thuật có direct write vào `PROJECT_MEMORY.md`; Governance phải audit tính toàn vẹn transaction riêng, không được để receipt/báo cáo tự hợp thức hóa cách ghi này.

### Lệnh tổng lực BX

1. **Cách ly BW khỏi release review. Dựng `v3.426.3-staging.bx` upgrade-only, không production.** Giữ phần sửa blur/asset-safe đã được xác nhận, nhưng không inherit public promotional phrases chưa kiểm evidence.
2. **Mở rộng claim kill switch:** protected field không chỉ là số/mã/CTA mà gồm mọi benefit semantic: `giảm`, `%`, `mua/tặng`, `miễn phí`, `freeship`, `ưu đãi`, `voucher`, `khuyến mãi`, quota, urgency, eligibility và comparative/buy advice. Public renderer chỉ nhận `approved_claim_segments[]` có binding ID; cấm badge/summary/title hard-code.
3. **Phân tách “tên chương trình” và “lời hứa lợi ích”:** một official programme có thể hiển thị tên merchant/chương trình, source và `Đang kiểm điều kiện`; bất kỳ benefit phrase nào chỉ hiện khi 4 field evidence + freshness pass. Không đổi câu “Mua 1 tặng 1” thành euphemism để né scan.
4. **Quarantine cụm claim đã thấy:** các item/fields phát `Mua 1 Tặng 1`, `Giảm 50%`, freeship hoặc tương đương phải rút khỏi public benefit surface ngay tại generated feed. Chúng có thể ở `CANDIDATE/Official programme` không benefit hoặc `QUARANTINE` tùy evidence audit; không giả rằng việc rút copy là xác nhận dữ liệu đúng.
5. **Nâng `surface-to-ledger audit` thành semantic scanner:** quét renderer bundle, generated JSON, CSS content, modal/route/meta/ARIA/local cache. Mỗi phrase thương mại phải xuất `phrase → item ID → segment ID → raw evidence offset/hash → validator time → expiry/scope → public action`. Thiếu một link là build fail, không phải warning.
6. **Governance integrity audit:** Data & Trust/Engineering kiểm mọi thay đổi `PROJECT_MEMORY.md` kể từ BW theo transaction manager, pre/final hash và receipt. Nếu có ghi trực tiếp/không idempotent, cách ly receipt/state claim liên quan, khôi phục qua transaction hợp lệ và công bố incident trong Council pack. Không sửa history để che dấu.
7. **Council/CEO gate:** QA nộp browser text extraction and semantic scan results, Design/UX-CX xác nhận safe official-programme treatment vẫn rõ/hữu ích, Product/Growth nộp tier mix, Engineering nộp generated-contract diff. CEO sẽ xem trực tiếp BX; không test nào dùng từ “100% sạch” trước CEO verdict.

**Trạng thái CEO:** `BW CHỈ SỬA GIÁ/BLUR, NHƯNG CLAIM “MUA 1 TẶNG 1/GIẢM 50%/FREESHIP” CÒN LỌT. BX MỞ RỘNG KILL SWITCH SANG MỌI BENEFIT SEMANTIC + AUDIT GOVERNANCE TRANSACTION; PRODUCTION KHÓA`.

---

## BY. Phán quyết CEO BX — claim leak có dấu hiệu được rút nhưng trải nghiệm voucher không được rỗng; xây Official Value Layer song song evidence acquisition

Kiểm tra bundle BX trực tiếp cho thấy không còn các giá đã quét trước đó, không thấy affiliate link hoặc CSS blur. Đây là **tín hiệu remediation**, không phải nghiệm thu: bundle còn nhiều `voucher_id` nội bộ, và không có bộ screenshot BX tại đường dẫn QA được tìm thấy để CEO kiểm visual/browser độc lập. Hơn nữa, gỡ toàn bộ benefit phrase mà không thay bằng hành trình rõ ràng sẽ biến “Ví ưu đãi” thành một danh sách tên merchant trống giá trị.

BX giữ trạng thái `CANDIDATE / NO-SHIP`. CEO cho phép hai luồng tiến song song: giữ public surface honest và xây Official Value Layer hữu ích; đồng thời thu evidence read-only để mở dần copy/claim thật. Không được trả lại benefit claim chỉ để làm UI hấp dẫn.

### Lệnh tổng lực BY

1. **Dựng `v3.426.4-staging.by` upgrade-only, không production.** Kế thừa data-level claim boundary BX nếu diff/browser proof cho thấy pass; không kế thừa self-declared governance “PASS” hay direct-memory write như bằng chứng.
2. **Tạo `Official Value Layer`:** với mỗi programme/merchant chưa đủ voucher evidence, public card phải trả lời ba câu hữu ích: `Đây là dịch vụ/chương trình gì?`, `Ai có thể kiểm tra?`, `Mở cổng chính thức ở đâu?`. Label rõ `Thông tin chính thức — điều kiện đang được kiểm tra`; không dùng benefit copy, badge voucher, expiry hay CTA copy.
3. **Ví ưu đãi BS có three-lane information architecture:**
   - `Dùng ngay`: chỉ record có code/action evidence hoàn chỉnh; được copy/claim.
   - `Cổng chính thức`: programme chính thức, không hứa lợi ích; CTA đi nguồn.
   - `Theo dõi`: Radar/candidate, lý do theo dõi và không action thương mại.
   Không dùng `voucher_id` hay internal state làm nội dung/badge public.
4. **Thiết kế không rỗng:** mỗi lane có visual hierarchy, empty state và next action khác nhau; official programme dùng merchant identity/creative chỉ khi rights pass, không có thì typography/place context; radar nhẹ. Không đổ 50 card giống nhau, không thêm discount-like geometry/neon để tạo cảm giác có mã.
5. **Evidence acquisition cho voucher thật:** thiết lập cohort read-only nguồn official campaign/merchant pages, raw capture/hash, validity/scope/terms/code binding và rights. Mục tiêu là mở dần lane `Dùng ngay` theo quality, không nêu số quota làm cớ giả voucher. Affiliate remains `PORTAL_ACCESS_NOT_VERIFIED`.
6. **Visual/UX QA yêu cầu bằng chứng thực:** tạo browser screenshots bằng CEO-checkable path (desktop 1440, mobile 390, dark/light, lane empty/ready/error), thao tác keyboard/copy/save/source and overlay flows. Không có screenshot/browser path thì staging không được gọi ready.
7. **Governance recovery:** mọi memory update phải chỉ qua transaction manager idempotent, có pre/final hash và receipt. Council phải nêu rõ phát hiện direct-write của các report BW/BX, trạng thái forensic và khắc phục; không tự “reconcile” để xóa vấn đề.
8. **CEO gate:** CEO review BY chỉ sau independent semantic scan, sample evidence capture và browser pack. Lúc đó CEO có thể cho phép official layer tiếp tục staging; `Dùng ngay` từng voucher vẫn chịu action-level gate riêng.

**Trạng thái CEO:** `BX CÓ TÍN HIỆU GỠ CLAIM NHƯNG CHƯA CÓ BROWSER EVIDENCE VÀ CÓ NGUY CƠ VÍ VOUCHER RỖNG. BY XÂY OFFICIAL VALUE LAYER + THREE-LANE VOUCHER UX SONG SONG THU EVIDENCE THẬT; PRODUCTION KHÓA`.

---

## BZ. Phán quyết CEO độc lập BY — bề mặt đã sạch hơn nhưng đang đánh đồng nguồn chính thức với quan hệ thương mại; sửa City Note và chuyển catalogue thành hành trình địa phương

CEO đã kiểm tra trực tiếp staging `v3.426.4-staging.by`: HTTP `200`; bundle public chứa các cụm `KÊNH LIÊN KẾT`, `Thanh toán qua VNPAY`, `Bằng chứng văn bản chính thức` và `CGV Cinemas`. Ảnh browser do chủ dự án cung cấp xác nhận các cụm này đang ở hero. Đây là bằng chứng bề mặt đủ để chặn release, không phụ thuộc báo cáo Antigravity.

BY đã tiến bộ về cảnh Cầu Rồng và độ sạch của copy so với các bản trước, nhưng chưa đạt trải nghiệm thương mại địa phương cao cấp: City Note che mất chủ thể hình ảnh; nhãn `Kênh liên kết` có thể khiến khách hiểu JayT có quan hệ/affiliate với merchant; câu về thanh toán VNPAY-QR là assertion payment/channel; còn lưới card dịch vụ dày đặc khiến trang giống danh bạ cơ quan hơn một cẩm nang “đi đâu, dùng gì, nhận gì hôm nay”. Một nguồn chính thức không tự động chứng minh partnership, payment flow, benefit, hay quyền dùng thương hiệu/ảnh.

BY là `ASSOCIATION/PAYMENT CLAIM RISK + CITY-COMMERCE HIERARCHY FAILURE / NO-SHIP`. Công việc evidence, supply và three-lane voucher tiếp tục; chỉ public wording/surface sai bị cô lập.

### Lệnh tổng lực BZ

1. **Cách ly BY khỏi release. Dựng `v3.426.5-staging.bz` theo nguyên tắc upgrade-only, không production.** Giữ scene Đà Nẵng, ba lane và data boundary an toàn đã có; không rollback/overwrite ledger hay tái đưa benefit claim cũ.
2. **Cấm suy diễn quan hệ thương mại:** không render `Kênh liên kết`, `đối tác`, `affiliate`, `liên kết`, `thanh toán qua`, `được xác minh/đối soát` hoặc biểu tượng tương đương, trừ khi có record evidence riêng về đúng loại quan hệ, phạm vi, thời điểm, quyền công bố và expiry. Không có record thì đổi sang mô tả trung tính `Thông tin từ nguồn chính thức`, kèm CTA nguồn — không phải lời xác nhận của JayT.
3. **Cách ly assertion payment và ưu đãi:** mọi câu về VNPAY-QR, phương thức thanh toán, giá, suất chiếu, voucher, điều kiện hoặc lợi ích được xem là protected commercial field. Chỉ Action Contract/Evidence đầy đủ mới được phát public; nếu chưa đủ, card chỉ nói dịch vụ/chương trình là gì và dẫn đến nguồn chính thức. Không che text bằng CSS hoặc viết uyển ngữ để lách scanner.
4. **Thay copy “bằng chứng” bằng provenance có thể kiểm:** drawer/card source phải nêu `nguồn`, `thời điểm kiểm tra`, `tier` và CTA mở nguồn. Cấm dùng “Bằng chứng văn bản chính thức” như một badge marketing. Data & Trust phải map `public phrase → item/segment → evidence offset/hash → freshness → quyền hiển thị`; thiếu một liên kết thì build fail.
5. **Sửa hero theo City Note hữu ích:** giữ ảnh Cầu Rồng là chủ thể, không đặt panel mờ che rồng/cầu hoặc chiếm quá một phần tư khung. Hero chỉ có headline, một dòng định hướng theo thời điểm/khu vực, và một City Note ngắn không thương mại khi chưa pass claim. Từ hero, ba CTA rõ: `Ăn gần đây`, `Đi chơi tối nay`, `Ví ưu đãi`; không nhồi địa chỉ, payment flow, merchant details hoặc nhiều card.
6. **Chuyển danh bạ thành journey commerce:** Product/Design/UX-CX nhóm feed theo các quyết định thật (ăn trưa, đi lại, học/làm, cuối tuần, mua đồ thiết yếu). Mỗi nhóm ưu tiên một feature item rồi compact rail/list; địa chỉ/giờ/điều kiện chỉ hiện khi từng field có source/freshness. Không dùng card đồng dạng dày đặc làm layout mặc định và không biến dịch vụ công thành “deal”.
7. **Voucher/affiliate tiếp tục đúng ba lane:** `Dùng ngay` chỉ có action evidence; `Cổng chính thức` chỉ source/info; `Theo dõi` chỉ candidate. AccessTrade vẫn `PORTAL_ACCESS_NOT_VERIFIED`; cấm deeplink, tạo campaign, copy mã hay affiliate disclosure ám chỉ có quan hệ trước khi xác minh phù hợp.
8. **Hội đồng BZ bắt buộc trước CEO review:**
   - Product: chứng minh ba journey hoàn thành trong 10 giây, không cần hiểu tier nội bộ.
   - Design: hero safe-zone cho Cầu Rồng, brand/asset rights, hierarchy không phải catalogue.
   - UX/CX: test comprehension `nguồn chính thức` khác với `đối tác/thanh toán`; keyboard, close/focus, mobile.
   - Growth: mix 50 nội dung không spam và retention theo nhịp ngày.
   - Data & Trust: association/payment semantic scan + ledger proof.
   - Engineering: generated-feed boundary, no hard-code, visual diff và public cache/meta/ARIA scan.
   - QA: browser pack CEO-checkable desktop 1440/mobile 390/light-dark/empty-ready-error, link/asset/a11y và extracted public text.
9. **CEO gate:** Antigravity chỉ được nộp `staging.bz` cùng evidence độc lập nói trên. CEO sẽ tự mở và kiểm hero, ba journey, voucher lanes, claims, desktop/mobile trước khi quyết định bước sau; không tự nghiệm thu hoặc mở production.

**Trạng thái CEO:** `BY KHÔNG SHIP: HERO DÙ SẠCH HƠN NHƯNG PUBLIC COPY ĐANG HÀM Ý LIÊN KẾT/THANH TOÁN VÀ CARD GRID CHƯA LÀ TRẢI NGHIỆM JAYT. BZ GIỮ LẠI NỀN TẢNG AN TOÀN, CÁCH LY CLAIM QUAN HỆ VÀ NÂNG TRANG THÀNH HÀNH TRÌNH SỐNG/MUA SẮM ĐÀ NẴNG; PRODUCTION KHÓA`.

---

## CA. Phán quyết CEO độc lập BZ — bố cục có tiến bộ, nhưng Trust gate vẫn thất bại và trải nghiệm còn là catalogue thay vì một điểm đến Đà Nẵng

CEO đã kiểm tra trực tiếp `v3.426.5-staging.bz`: HTTP `200`, version đúng, nhưng bundle public vẫn có `Thanh toán qua VNPAY` và footer phát câu tuyệt đối `100% minh bạch nguồn gốc, đối soát chính thống`. Cả hai đều chưa được chứng minh bằng record độc lập về payment relationship/coverage. Do vậy BZ không thực hiện đầy đủ lệnh BZ, không được đưa vào release review.

Đánh giá thiết kế trên browser screenshot: scene Cầu Rồng, ba CTA theo nhu cầu và cấu trúc hành trình là bước đi đúng. Tuy nhiên ấn tượng trong hai giây vẫn là một danh bạ dài: hero chưa tạo một lý do rõ ràng để khám phá ngay; phần City Note còn đè lên ảnh; bốn nhóm card lặp cùng một hình thức, copy dày và chữ nguồn quá nhỏ; card xanh nổi bật bị chọn theo thứ tự dữ liệu chứ chưa theo giá trị quyết định; CTA xanh giống nhau nên khách không biết đó là mở nguồn, xem lịch, tìm đường hay dùng ưu đãi. Đây chưa phải trải nghiệm mua sắm/khám phá “wow” mà JayT cần.

CA là `BZ ORDER NON-COMPLIANCE + ABSOLUTE/PAYMENT CLAIM LEAK + DIRECTORY-STYLE UX / NO-SHIP`.

### Lệnh tổng lực CA

1. **Cách ly BZ. Dựng `v3.426.6-staging.ca` upgrade-only, tuyệt đối không production.** Không ghi đè ledger, không reintroduce deal/voucher copy, price, code, benefit hay affiliate action.
2. **Sửa blocker ở generated public feed, không sửa bề mặt:** loại `Thanh toán qua VNPAY` và mọi assertion payment/channel khi chưa có relationship/payment evidence; thay footer absolute `100% minh bạch...` bằng mô tả giới hạn, ví dụ nêu rõ các tier và CTA chính sách dữ liệu. Semantic scanner phải fail build với `100%`, `đối soát`, `xác minh`, payment/partner/affiliate khi thiếu segment binding; scan cả HTML, JS, route, modal, meta, ARIA và cache.
3. **Hero là lời mời trải nghiệm, không phải backdrop của directory:** Cầu Rồng luôn thấy rõ; City Note tối đa title + một dòng + CTA nguồn an toàn, không che điểm nhận diện và không chứa commercial/payment detail. First fold phải trả lời bằng hành động: “Tối nay đi đâu?”, “Ăn gì gần đây?”, “Có ưu đãi nào dùng được?” — chỉ lane đủ evidence mới dùng từ `ưu đãi`.
4. **Xây một hệ hình card phân cấp thay vì card wall:** mỗi journey có một “đề xuất cho lúc này” dựa trên context thật, tối đa hai compact secondary items và CTA `Xem tất cả`. Primary không được tự động là record đầu tiên. Thẻ place/programme/radar phải khác nhau rõ qua role, tier và action; không dùng màu xanh đậm như dấu hiệu “deal tốt”.
5. **Tăng tính địa phương có quyền sử dụng:** dùng ảnh/creative Đà Nẵng có asset-rights record cho hero và journey, hoặc typography/place-context khi chưa có quyền. Merchant logo/ảnh khuyến mãi chỉ khi rights pass. Không tạo ảnh AI giả địa điểm/khuyến mãi và không dùng ảnh để che thiếu evidence.
6. **Thiết kế hành động phân biệt:** CTA phải nói đúng contract (`Mở nguồn chính thức`, `Xem lịch`, `Tìm đường`, `Theo dõi`, `Sao chép mã` khi pass); icon/state/focus/disabled khác nhau. Nguồn, ngày kiểm tra và tier phải đọc được, không nằm ở cỡ chữ chỉ để hợp thức hóa data; mobile target tối thiểu 44px.
7. **Council CA trước CEO:** Product/Growth chọn tiêu chí “đề xuất cho lúc này” và mix 50 nội dung; Design/UX-CX nộp prototype desktop/mobile + comprehension test; Data & Trust nộp payment/absolute-claim scan và evidence map; Engineering chứng minh generated feed boundary; QA nộp browser screenshots 1440/390, extracted text, contrast/touch/link/keyboard tests. Antigravity không tự chấm pass.
8. **CEO gate:** Chỉ khi hai blocker trên không còn trong independent browser/bundle scan và Council pack đầy đủ, CEO mới xem trực tiếp CA. Production tiếp tục khóa.

**Trạng thái CEO:** `BZ KHÔNG SHIP: CÒN PAYMENT ASSERTION VÀ ABSOLUTE TRANSPARENCY CLAIM; UX ĐÃ CÓ HƯỚNG NHƯNG CHƯA ĐỦ ĐẶC SẮC. CA SỬA DATA-LEVEL TRUST BOUNDARY VÀ BIẾN HÀNH TRÌNH THÀNH TRẢI NGHIỆM KHÁM PHÁ ĐÀ NẴNG; PRODUCTION KHÓA`.

---

## CB. Quy chế CEO — vận hành liên tục theo gap, report là checkpoint chứ không phải lệnh dừng

Kể từ chỉ thị này, Antigravity và toàn bộ bảy phòng ban **không được chờ chủ dự án nhắc lại sau mỗi report**. Mỗi report, scan, QA run hoặc Council pack chỉ là một checkpoint: các gap đo được phải tự động trở thành work order kế tiếp trong phạm vi JAYT-245, BT và các gate an toàn. Việc “đã báo cáo” không phải là hoàn thành, và containment một surface sai không được thay thế roadmap UI, supply, voucher, affiliate research, accessibility hay observability.

### Chu kỳ tự điều hành bắt buộc

1. **Đo và phân loại gap:** nhận diện issue theo UI/UX, trust/provenance, supply, voucher, accessibility, performance, affiliate research hoặc infrastructure; ghi owner, phạm vi và evidence hiện có/thiếu.
2. **Tự tạo work order kế tiếp:** ưu tiên theo `P0 public harm/trust → P1 journey/conversion → P2 breadth/polish`; nêu rõ data boundary, acceptance criteria, Council evidence và staging target. Không tạo lại platform, không mở nguồn dữ liệu thứ hai, chỉ nâng cấp hạ tầng/ledger hiện hữu.
3. **Chạy song song các luồng được phép:**
   - Product/Design/UX-CX: journey, responsive UI, accessibility, copy/action contract, prototype/test;
   - Growth: supply cohort, mix 30–50 nội dung có tier, retention experiment không deceptive;
   - Data & Trust: candidate intake, evidence capture read-only, field binding/freshness/quarantine;
   - Engineering/QA: generated-feed boundary, observability, semantic scan, browser/a11y/link/asset/performance tests;
   - Affiliate: khảo sát catalog/merchant read-only, portfolio suitability và total-cost framework, không tạo action thương mại.
4. **Hội đồng là vòng lặp, không phải buổi họp đóng:** bảy phòng ban review mọi milestone/gap đáng kể, đề xuất bước tiếp và chuyển đồng thời các phần an toàn. Nếu một claim/asset/action bị chặn, chỉ cô lập đúng phần đó; các journey, place, official-information, radar, supply candidate và quality work còn an toàn tiếp tục.
5. **CEO gate:** mỗi staging lớn phải có Council pack và evidence browser/local độc lập để CEO kiểm trực tiếp. Antigravity không tự nghiệm thu và không gọi HTTP/version/report là Go-Live pass.

### Chỉ ba phạm vi buộc phải chờ thẩm quyền

1. **Production release** hoặc mọi thay đổi làm public production thay đổi trạng thái.
2. **Affiliate/account/secret action:** tạo hoặc đăng ký campaign/deeplink, gửi dữ liệu, dùng secret/token/tài khoản, hoặc bất kỳ hành động nào tạo quan hệ/giao dịch với AccessTrade hay merchant.
3. **Quyết định pháp lý/quyền dùng chưa rõ:** license/rights của ảnh, logo, creative, tên thương hiệu, điều khoản hoặc claim pháp lý khi evidence chưa đủ.

Ngoài ba phạm vi trên, mặc định là **tiếp tục thực hiện** với phương án an toàn nhất và ghi rõ evidence status; không đứng chờ xác nhận lặp lại. Nếu cần dừng một workstream, Council phải nêu chính xác nó thuộc một trong ba phạm vi trên và workstream an toàn nào vẫn đang chạy.

**Trạng thái CEO:** `CB CÓ HIỆU LỰC NGAY: REPORT = CHECKPOINT → GAP = WORK ORDER KẾ TIẾP. BẢY PHÒNG BAN VẬN HÀNH LIÊN TỤC TRONG RANH GIỚI AN TOÀN; CHỈ PRODUCTION, AFFILIATE/SECRET VÀ LEGAL-ASSET UNCLEAR ĐƯỢC CHỜ THẨM QUYỀN`.

---

## CC. Định hướng CEO — biến JayT thành “local editorial commerce” giàu hình ảnh, không sao chép reference và không giả khuyến mãi

CEO ghi nhận reference hình ảnh mới: nó tạo cảm giác premium nhờ ảnh lớn có chủ đích, palette giới hạn, khoảng thở rộng, typography editorial và product storytelling thay cho một danh sách card đồng dạng. Đây là hướng cảm xúc đúng cho JayT, nhưng **không phải template để sao chép**: JayT không phải shop mỹ phẩm, không dùng xanh lá/packshot/ảnh người của reference, không sao chép layout, logo, asset hoặc copy. Bản sắc JayT phải là nhịp sống Đà Nẵng — sông Hàn, biển, cầu, nắng chiều, khu học/làm/đi chơi — gắn với những quyết định hàng ngày có evidence.

### Ý kiến Hội đồng trước khi ra lệnh

- **Product:** trang chủ phải giúp chọn một việc cụ thể ngay, rồi mới truyền cảm hứng khám phá; không đổi thành portfolio ảnh.
- **Design:** lấy tinh thần editorial, không lấy ngôn ngữ mỹ phẩm; tạo visual system riêng cho Đà Nẵng và content tiers.
- **UX/CX:** ảnh đẹp phải dẫn được tới `mở nguồn`, `tìm đường`, `xem lịch` hay `dùng ngay` đúng contract; không che hành động hoặc làm chữ không đọc được.
- **Growth:** các moment sáng/trưa/tối, cuối tuần và campus tạo lý do quay lại tốt hơn card spam; visual cần có mô-đun thay phiên theo thời điểm.
- **Data & Trust:** ảnh, logo merchant và creative promotion chỉ hiện khi có asset-rights/evidence; aesthetic không được hợp thức hóa claim.
- **Engineering:** xây token/component/asset pipeline để nâng cấp, không làm lại storefront hoặc hard-code collage theo data không kiểm soát.
- **QA:** kiểm desktop/mobile/light-dark/reduced-motion, contrast, performance và fallback khi asset chưa có quyền.

### Lệnh tổng lực CC

1. **Dựng `v3.426.7-staging.cc` upgrade-only từ CA, không production.** CA trust fixes là điều kiện đầu vào; nếu scan payment/absolute claim chưa pass thì cách ly đúng field và vẫn phát triển visual từ safe-tier data.
2. **Thiết lập “Đà Nẵng Living Palette” riêng:** nền cát ấm, xanh sông/biển sâu, xanh ngọc chỉ dùng làm accent, cam nắng chiều cho trạng thái/CTA giới hạn và ink navy cho chữ. Council Design phải định nghĩa token semantic (`surface`, `ink`, `accent`, `tier`, `focus`, `danger`) cùng contrast AA; cấm lấy palette hoặc token của reference và cấm rainbow card màu ngẫu nhiên.
3. **Thiết kế first fold như một bìa tạp chí sống:** một ảnh Đà Nẵng có asset-rights record, headline ngắn theo moment, subline hữu ích và ba decision chips. Text đặt trong safe zone có contrast, không che landmark; City Note chỉ là một card nhẹ hoặc rail cạnh ảnh, không phải khối tối nặng. Không dùng “deal tốt nhất”, giá, voucher hay payment statement khi evidence chưa pass.
4. **Tạo ba module visual có ích, không phải card wall:**
   - `Nhịp hôm nay`: 3–5 choice chips theo thời điểm/khu vực;
   - `Góc địa phương`: một feature editorial có ảnh hợp quyền và source/tier rõ;
   - `Điểm đến hành động`: compact rails riêng cho ăn uống, đi lại, học/làm, tối nay, mua thiết yếu.
   Mỗi rail chỉ một primary story + tối đa hai secondary cards trước CTA `Xem tất cả`; primary được chọn bởi context/evidence, không theo thứ tự record.
5. **Quy tắc imagery/brand:** ưu tiên ảnh Đà Nẵng có license/attribution, ảnh tự sở hữu hoặc creative merchant có quyền rõ. Chưa có quyền thì dùng type-led composition, map abstract hoặc local color field; không bịa brand logo, packshot, ảnh ưu đãi, ảnh AI “như thật”, hay crop asset reference. Asset ledger phải quyết định render/fallback.
6. **Làm UI cảm giác mua sắm nhưng honest:** motion vi mô nhẹ, save/follow state, rail browsing, skeleton/error/empty state và CTA theo action contract. `Dùng ngay` chỉ khác biệt rõ khi voucher action pass; `Cổng chính thức` và `Theo dõi` phải đẹp nhưng không mô phỏng coupon/deal. Không dùng neon, fake countdown, strike-through price, “hot”, “đã đối soát” hoặc icon chứng nhận để tạo hứng thú giả.
7. **Typography và density:** tạo scale rõ headline/display, journey title, card title, metadata/source; không nhồi address/giờ/terms vào card primary. Chi tiết đi vào drawer/page có source và freshness. Chữ metadata phải đọc được trên mobile; action tap target tối thiểu 44px; tôn trọng reduced-motion/dark mode.
8. **Evidence và Council pack CC:** Design/UX-CX nộp moodboard JayT gốc, token sheet, responsive prototype và 5-second comprehension test; Data & Trust nộp asset-rights/fallback matrix; Product/Growth nộp journey/mix; Engineering nộp component/asset-pipeline diff; QA nộp browser pack desktop 1440/mobile 390/light-dark/slow-network and a11y. CEO sẽ so reference với staging CC bằng trực quan, không nhận mockup/report thay thế.

**Trạng thái CEO:** `CC KHỞI ĐỘNG NÂNG CẤP THỊ GIÁC JAYT THEO HƯỚNG LOCAL EDITORIAL COMMERCE: GIÀU ẢNH, CÓ CẢM XÚC, CÓ HÀNH ĐỘNG VÀ CÓ BẰNG CHỨNG. KHÔNG SAO CHÉP REFERENCE, KHÔNG GIẢ KHUYẾN MÃI, PRODUCTION VẪN KHÓA`.

---

## CD. Phán quyết CEO độc lập CC — editorial desktop có hướng, nhưng mobile first-fold bị cắt và bị CTA/City Note lấn át

CEO đã kiểm staging CC trực tiếp: HTTP `200`, version `v3.426.7-staging.cc`, bundle không còn hai cụm blocker `VNPAY` và `100% minh bạch` từng thấy ở BZ. CEO cũng kiểm local browser pack CC. Desktop bắt đầu có bìa editorial, palette và nhịp thời điểm tốt hơn catalogue cũ. Đây là remediation hữu ích, nhưng chưa phải visual acceptance.

Ảnh `07_QUALITY_ASSURANCE/browser_pack_cc/07_mobile_390_magazine_cover_home.png` cho thấy lỗi P0 mobile: title/đầu hero bị cắt phía trên khung; ba CTA lớn xếp dọc, chiếm phần lớn viewport; City Note trở thành một panel cao che cảnh Cầu Rồng; thanh điều hướng đáy cùng các block lớn làm khách phải cuộn trước khi hiểu trang đang giúp họ chọn gì. Dù nguyên nhân là safe-area, scroll capture hoặc layout, kết quả public này không chấp nhận được. Screenshot đặt tên “magazine cover” không thay thế QA initial-load thật.

CC là `VISUAL DIRECTION PROGRESS / MOBILE FIRST-FOLD P0 FAILURE / NO-SHIP`.

### Lệnh tổng lực CD

1. **Cách ly CC khỏi release. Dựng `v3.426.8-staging.cd` upgrade-only, không production.** Giữ trust remediation CA và visual system hợp lệ CC; không rollback data/ledger hoặc đưa lại claim đã cách ly.
2. **Khóa mobile first-fold contract ở 390×844:** từ fresh navigation, không scroll, không cache, headline đầy đủ, subline tối đa hai dòng, primary action và ít nhất một phần landmark phải cùng hiện trong viewport. Không có `overflow`, sticky header, safe-area inset, transform, focus restore hoặc animation nào được cắt title/attribution/CTA.
3. **Thu gọn decision actions:** mobile chỉ có một primary CTA theo context và tối đa hai compact chips ngang/scrollable; cấm ba nút khối lớn xếp dọc trong hero. CTA thứ ba chuyển xuống rail `Nhịp sống theo thời điểm`. Nhãn action tiếp tục theo contract, không dùng benefit copy nếu chưa pass.
4. **Thu City Note về đúng vai trò:** trên mobile, tối đa eyebrow + title + một dòng + CTA nguồn; không viết lịch/điều kiện dài trong hero. Detail mở ở drawer/page, với source/freshness; City Note không được che landmark hoặc chiếm hơn khoảng một phần ba hero. Trên desktop, luôn tôn trọng safe-zone của ảnh thay vì panel rộng phủ đáy.
5. **Sửa density và hierarchy mobile:** hero → một câu hỏi/CTA → moment rail phải tạo reading flow rõ; bottom navigation không được che nội dung/focus. Cards, attribution, metadata và source phải có cỡ chữ đọc được, touch target >=44px, contrast AA, keyboard/reduced-motion; không đánh đổi để có “cinematic” capture.
6. **Council CD:** Design nộp token/safe-zone spec; UX/CX chạy first-impression và task test mobile (khách nói được “trang này giúp gì” và hoàn thành một journey); Engineering nộp root-cause layout/scroll-state; QA nộp fresh-load video + screenshot thực của 390×844/360×800/1440, light/dark, portrait/landscape, keyboard/focus and no-overlay; Data & Trust kiểm title, schedule, attribution/source bindings vẫn đúng. Product/Growth xác nhận thay CTA không làm journey/voucher lane mơ hồ.
7. **CEO gate:** CEO chỉ review CD sau browser pack có fresh-load proof và visual diff CC→CD. Không dùng ảnh đã cuộn, capture thủ công hoặc report tự thuật để tự chấm mobile pass. Production tiếp tục khóa.

**Trạng thái CEO:** `CC KHÔNG SHIP: ĐÃ CÓ HƯỚNG EDITORIAL NHƯNG MOBILE FIRST FOLD CẮT NỘI DUNG VÀ LẤN ÁT HÀNH TRÌNH. CD SỬA MOBILE COMPOSITION TRƯỚC, GIỮ TRUST BOUNDARY VÀ NỀN TẢNG LOCAL-EDITORIAL; PRODUCTION KHÓA`.

---

## CE. Phán quyết CEO độc lập CD — mobile composition đã phục hồi; chuyển trọng tâm sang chứng minh hành trình hữu ích sau CTA

CEO đã kiểm tra trực tiếp staging CD: HTTP `200`, version `v3.426.8-staging.cd`, bundle không còn hai cụm `VNPAY` và `100% minh bạch` đã bị chặn trước đó. CEO cũng xem local fresh-load pack 390×844 và desktop 1440: headline đã nằm trọn trong hero, CTA không còn xếp thành ba khối dọc và Cầu Rồng còn nhận diện được. Đây là **pass hẹp cho lỗi composition CD**, không phải nghiệm thu release hay Go-Live.

Gap kế tiếp đã rõ: bìa giờ đẹp và rõ hơn, nhưng JayT chỉ tạo giá trị khi CTA dẫn khách đến quyết định hoàn thành. Không được tiếp tục chỉ thay hero/palette trong khi `Ăn gì gần đây`, `Đi đâu` và `Ví quyền lợi` chưa được chứng minh qua browser journey với data tiered thật. Một trang “cover đẹp” nhưng CTA dẫn vào card list đồng dạng, nguồn khó hiểu hoặc voucher rỗng vẫn thất bại về sản phẩm.

### Lệnh tổng lực CE

1. **Dựng `v3.426.9-staging.ce` upgrade-only, không production.** Giữ layout mobile CD, semantic boundary CA và visual system CC; không viết lại storefront hay thay nguồn dữ liệu.
2. **Hoàn thành ba closed-loop journeys, không mô phỏng:**
   - `Ăn gì gần đây` → context khu vực/thời điểm → place/programme tier đúng → source hoặc tìm đường → lưu/theo dõi;
   - `Đi đâu tối nay` → lịch/địa điểm chính thức khi evidence pass, còn không là radar có lý do theo dõi → source;
   - `Ví quyền lợi` → `Dùng ngay` chỉ action contract pass, `Cổng chính thức` chỉ thông tin/source, `Theo dõi` chỉ candidate.
   Mỗi route phải có ready/empty/error state và không được rơi lại trang card wall.
3. **Context phải có tác dụng thực:** selection thời điểm/khu vực/chip chỉ đổi feed theo filter binding có thể audit; nếu chưa có data phù hợp, nói rõ phạm vi và đề xuất next action. Cấm button animation, count, “personalized” copy hoặc item reorder giả để tạo cảm giác hoạt động.
4. **Nâng content presentation sau hero:** một primary decision card có value proposition/source/freshness/action; secondary items compact; detail chỉ mở khi cần. Asset/merchant image vẫn theo rights ledger, fallback type-led vẫn phải giàu cảm xúc. Không tự biến place/programme/radar thành deal bằng visual treatment.
5. **Council CE chạy song song:** Product xác nhận completion metric cho ba journey; Design/UX-CX chạy 5-second first-choice và task test trên 390/desktop; Growth kiểm mix không spam; Data & Trust map từng field/action; Engineering chứng minh route/filter/feed binding; QA record browser flow từ fresh load đến source/save/copy-disabled/empty/error, link/a11y/performance. Affiliate research vẫn read-only.
6. **CEO gate:** CEO sẽ kiểm trực tiếp CE theo ba journey và mobile/desktop trước bước release. Pass composition CD không mở production và không được diễn đạt thành “đã hoàn hảo”.

**Trạng thái CEO:** `CD PASS HẸP VỀ MOBILE COMPOSITION; CE CHUYỂN SANG PROOF OF USEFUL JOURNEYS SAU CTA. KHÔNG CÓ CLOSED-LOOP EVIDENCE THÌ JAYT CHỈ LÀ COVER ĐẸP; PRODUCTION KHÓA`.

---

## CF. Phán quyết CEO CE — cấu trúc journey đã rõ hơn, nhưng JayT vẫn là “thẻ chữ có tổ chức”, chưa là trải nghiệm khám phá Đà Nẵng giàu cảm xúc

CEO đã kiểm ảnh staging CE do chủ dự án cung cấp. Tiến bộ đáng ghi nhận: route theo hành trình rõ hơn, label source/action ít gây hiểu sai deal hơn, và bố cục có cấu trúc hơn. Nhưng cảm nhận trong hai giây vẫn chưa đạt yêu cầu: hero phủ gradient tối làm cảnh Cầu Rồng chỉ còn nền mờ; các journey lặp một mẫu card, với một thẻ navy dày chữ cạnh các thẻ trắng nhiều khoảng trống; toàn bộ thân trang thiếu hình ảnh/nhịp điệu thị giác nên giống catalogue thông tin được sắp đẹp hơn, không giống một nơi để khách muốn đi khám phá và mua sắm thông minh.

Các CTA `Mở cổng thông tin chính thức` xuất hiện lặp lại trên nhiều loại nội dung cũng làm hành động bị phẳng; card primary hiện đang mang quá nhiều metadata, còn secondary card không mang đủ lý do để chọn. Không được giải quyết bằng ảnh trang trí, fake merchant creative hoặc biến source/programme/place thành deal.

CE là `JOURNEY STRUCTURE PROGRESS / EDITORIAL DEPTH & ACTION DIFFERENTIATION GAP / NO-SHIP`.

### Lệnh tổng lực CF

1. **Dựng `v3.427.0-staging.cf` upgrade-only, không production.** Bảo toàn trust boundary, ba lane voucher, route/filter binding và mobile repairs; không làm lại feed/platform, không quay về card grid cũ.
2. **Thay “card wall” bằng narrative modules:** mỗi journey chỉ có một editorial feature rõ (ảnh local/merchant có quyền hoặc type-led art có provenance), một decision card và một compact list/rail. Không lặp bốn card cùng chiều cao/cùng amount copy ở mỗi section. Khoảng trắng phải phục vụ hierarchy, không phải kết quả thiếu content.
3. **Hero trả lại vai chính cho Đà Nẵng:** gradient chỉ đủ contrast cho text, không làm landmark thành silhouette; composition phải để cầu/rồng/sông đọc được ngay. City Note là contextual prompt nhỏ; không chiếm role của ảnh, không chứa lịch/claim dài khi chưa đầy evidence.
4. **Tạo visual archetype theo tier/journey, không theo màu tuỳ ý:**
   - verified place: local scene + route/source;
   - official programme: identity/typography + source/conditions state;
   - radar: lightweight follow state;
   - voucher ready: ticket/action treatment chỉ khi action contract pass.
   Navy không tự nghĩa là “nổi bật/đáng mua”; emphasis dựa trên decision context, freshness và user intent.
5. **Phân biệt CTA theo outcome:** `Tìm đường`, `Xem lịch`, `Mở nguồn chính thức`, `Theo dõi`, `Lưu`, `Sao chép mã` (chỉ khi pass) phải có wording/icon/state khác nhau. Không đặt “Mở cổng...” như fallback cho tất cả; nếu field chưa đủ, dùng safe next step đúng tier hoặc không render action.
6. **Tăng richness bằng dữ liệu an toàn:** Growth/Data & Trust bổ sung cohort local candidate và official source read-only cho ăn uống, di chuyển, học/làm, tối nay, mua thiết yếu. Chỉ đưa imagery/logo vào khi asset rights pass; nếu không, build editorial typography/map/context. Tuyệt đối không dùng ảnh AI mô phỏng deal/merchant/place thật.
7. **Council CF & evidence:** Design nộp visual-archetype sheet và content density spec; UX/CX test người dùng phân biệt bốn tier/action; Product/Growth chứng minh feature selection và 50-item mix; Data & Trust nộp asset/claim ledger; Engineering nộp component data contracts; QA nộp desktop/mobile visual comparison CE→CF, screenshot browser + source/route/action tests, contrast/performance/a11y. CEO kiểm trực tiếp trước bước kế tiếp.

**Trạng thái CEO:** `CE KHÔNG SHIP: HÀNH TRÌNH ĐÃ RÕ NHƯNG THÂN TRANG VẪN LÀ CARD CATALOGUE VÀ HERO CHƯA TÔN ĐÀ NẴNG. CF TẠO LOCAL EDITORIAL DEPTH, ACTION KHÁC BIỆT VÀ RICHNESS CÓ QUYỀN/PROVENANCE; PRODUCTION KHÓA`.

---

## CG. Phán quyết CEO độc lập CF — hướng local editorial có tiến bộ, nhưng QA pack không chứng minh đúng module và nội dung sau hero còn thiên về text/card

CEO kiểm trực tiếp `v3.427.0-staging.cf`: HTTP `200`, version đúng, bundle không còn `VNPAY` hay `100% minh bạch`. Ảnh hero hiện tôn Cầu Rồng tốt hơn và navigation/journey có ý nghĩa hơn. Local mobile route cũng cho thấy filter theo bữa/quận và một đề xuất có cấu trúc — đây là tiến bộ staging, không phải acceptance.

Tuy nhiên evidence integrity không đạt: `browser_pack_cf/01_desktop_1440_vivid_dragon_hero.png` và `02_desktop_1440_food_narrative_module.png` có cùng SHA-256 `8B713D9D…F857D39D`, dù tên file khẳng định hai surface khác nhau. Không kết luận động cơ; nhưng pack không thể chứng minh Food Narrative Module đã được review. Trong ảnh transit, primary panel vẫn có một mảng trống lớn, secondary cards vẫn chủ yếu là chữ; journey food mobile dày filter/text và “Đề xuất hàng đầu cho bạn” cần có rank rationale, nếu không dễ trở thành personalisation/ưu tiên giả. CF chưa hoàn thành yêu cầu richness có ích.

CF là `LOCAL EDITORIAL PROGRESS / QA EVIDENCE-INTEGRITY FAILURE + STORYTELLING DEPTH GAP / NO-SHIP`.

### Lệnh tổng lực CG

1. **Cách ly CF khỏi release review. Dựng `v3.427.1-staging.cg` upgrade-only, không production.** Giữ các cải thiện visual/claim boundary đã kiểm; không ghi đè history/ledger, không tạo claim thương mại mới.
2. **Sửa QA evidence integrity trước khi gọi bất kỳ module là pass:** mỗi capture có manifest bất biến gồm URL, route/query, viewport, scroll position, fresh-load flag, action trace, timestamp, SHA-256 và screenshot hash; CI fail nếu filename/expected route/scroll không khớp hoặc screenshot trùng không có reason. Thay toàn bộ evidence module bị duplicate bằng capture browser mới; report/receipt không bù cho missing capture.
3. **Biến primary surface thành storytelling hữu ích:** nếu không có ảnh/map/creative có quyền dùng, không để khối trống. Dùng type-led editorial composition, route-preview có data thật hoặc visual local-context có provenance; chỉ dùng local/merchant image khi rights pass. Mỗi primary trả lời một quyết định cụ thể trước metadata.
4. **Giảm filter và copy mobile:** filter theo bữa/quận phải progressive disclosure, giữ trạng thái rõ và không đẩy đề xuất ra quá xa. `Đề xuất hàng đầu` chỉ render khi ranking có rule audit được (context, freshness, tier, lý do); nếu không đổi thành mô tả trung tính như `Gợi ý trong khu vực` và tuyệt đối không ám chỉ dùng dữ liệu cá nhân.
5. **Tạo depth theo từng journey:** food có mood/địa bàn/bữa ăn; transit có tuyến/trạm/route outcome; học/làm có không gian/quyền lợi official; tối nay có lịch/địa điểm hoặc radar. Mỗi journey khác nhau về layout/story/action nhưng cùng token/accessibility system; không dùng ảnh trang trí hay fake merchant visual để tạo khác biệt.
6. **Council CG & CEO gate:**
   - QA/Engineering nộp manifest-verified browser pack cho hero, food, transit, study, leisure, wallet trên 1440 và 390;
   - Product/UX-CX chứng minh filter→result→source/save journey và rank rationale;
   - Design nộp narrative surface spec/fallback states;
   - Data & Trust kiểm asset rights, source/freshness và forbidden personalisation/claim copy;
   - Growth kiểm mix và usefulness.
   CEO sẽ hash-sample, mở route thực và xem desktop/mobile trước chỉ thị tiếp theo. Không có evidence pack hợp lệ thì không dùng từ “đã kiểm thử/đã duyệt”.

**Trạng thái CEO:** `CF KHÔNG SHIP: VISUAL CÓ TIẾN BỘ NHƯNG QA PACK KHÔNG CHỨNG MINH MODULE VÀ THÂN TRANG CHƯA CÓ STORYTELLING DEPTH. CG KHÔI PHỤC EVIDENCE INTEGRITY, RANK HONESTY VÀ LOCAL NARRATIVE SURFACES; PRODUCTION KHÓA`.

---

## CH. Phán quyết CEO độc lập CG — evidence pack đã có integrity, nhưng visual supply chưa đủ để JayT thoát khỏi trải nghiệm text-led

CEO kiểm trực tiếp staging CG: HTTP `200`, `v3.427.1-staging.cg`, không thấy lại hai claim bị chặn. CEO kiểm manifest `BROWSER_CAPTURE_MANIFEST_CG.json`: 13 captures, hash manifest khớp các file local và không có duplicate group. Đây là **pass hẹp về integrity của pack CG**, khắc phục vấn đề CF; vẫn không là production/release pass.

Review Food Narrative Module cho thấy hierarchy và action đã sạch hơn, nhưng hầu hết bề mặt vẫn là card trắng/nền trống + text + badge. Primary Food chiếm không gian lớn nhưng không có visual story tương xứng; secondary modules có cùng chất liệu text. Điều đó làm JayT có vẻ chính xác nhưng chưa cuốn hút. Khoảng trống không được phép trở thành “thiết kế premium” thay cho visual/local context.

### Lệnh tổng lực CH

1. **Dựng `v3.427.2-staging.ch` upgrade-only, không production.** Kế thừa integrity manifest CG, không làm lại UI/data foundation và không thay thế tier/action contracts.
2. **Mở Visual Supply Sprint read-only:** Data & Trust + Design lập asset ledger cho tối thiểu 12 visual candidates theo journey (ẩm thực, đi lại, học/làm, tối nay, mua thiết yếu), gồm URL nguồn, author/license/attribution, quyền crop/derivative/commercial use, expiry/review date, asset hash và fallback. Chỉ asset có quyền rõ mới render; asset rights chưa rõ thuộc phạm vi dừng riêng, còn những candidate đủ quyền vẫn tiếp tục.
3. **Đặt visual vào quyết định, không vào trang trí:** mỗi journey primary có một local visual/route/map/art direction có provenance, ratio và safe-crop rõ; visual phải giúp hiểu nơi/chủ đề/moment. Nếu không có asset pass, dùng type-led scene có tên khu vực/moment, không để blank panel. Cấm AI giả địa điểm/merchant/promotion, stock photo vô danh hoặc creative của merchant không quyền.
4. **Tái cân bằng module:** primary giảm metadata mặc định, đặt một reason-to-go + một action; details vào drawer/source. Secondary cần visual cue hoặc compact factual layout, không 2–3 card văn bản đồng dạng. Attribution hiển thị hợp lệ nhưng không cạnh tranh headline; source/freshness luôn truy xuất được.
5. **Bảo vệ trust khi giàu ảnh:** visual không được nâng tier, gợi discount, xác nhận chất lượng hoặc dùng brand mark như endorsement. `Đề xuất` chỉ có ranking rationale; place/programme/radar/voucher ready giữ visual archetype và CTA riêng. Không có asset thì UX vẫn hoàn thành journey.
6. **Council CH:** Product chọn 5 decision moments; Design nộp art direction/crop/token + fallback; UX/CX test recognition/action; Growth đề xuất mix local không spam; Data & Trust nộp rights ledger; Engineering nộp asset pipeline/cache/performance; QA nộp manifest-hashed desktop/mobile/light-dark/slow-network, attribution/link/a11y checks. CEO tự xem CH và sample quyền asset trước mốc tiếp theo.

**Trạng thái CEO:** `CG PASS HẸP VỀ EVIDENCE INTEGRITY; CH TIẾP TỤC NÂNG JAYT TỪ TEXT-LED DIRECTORY THÀNH LOCAL EDITORIAL COMMERCE CÓ VISUAL SUPPLY HỢP QUYỀN. KHÔNG CÓ QUYỀN ASSET THÌ DÙNG FALLBACK THẬT, KHÔNG GIẢ HÌNH/DEAL; PRODUCTION KHÓA`.

---

## CJ. CEO Design Reset — dồn ưu tiên vào một trải nghiệm JayT Đà Nẵng thực sự đẹp, sống động và đáng khám phá

CEO chấp nhận đánh giá của chủ dự án đối với staging CH: bề mặt hiện tại **không đạt chuẩn thẩm mỹ**. Ảnh cho thấy các vùng visual trong journey rơi thành ô navy tối/rỗng, typography và metadata bị nén nhỏ/dày, layout hai cột lặp lại từ đầu đến cuối, còn hero chưa tạo được khoảnh khắc “Đà Nẵng” đủ mạnh. Đây là dashboard thông tin được trang trí, không phải trải nghiệm local commerce mà khách muốn ở lại. Những bản trước chỉ sửa hierarchy từng phần; tiếp tục vá card là sai hướng.

Từ CJ, ưu tiên điều hành chuyển sang **Design Reset toàn diện** trong phạm vi an toàn: xây lại presentation layer trên cùng data/ledger/routes hiện hữu, giữ data trust và không bịa bất kỳ ưu đãi/ảnh/brand/quan hệ thương mại nào. Mục tiêu là chuẩn trải nghiệm tham vọng nhất cho JayT và chỉ kết thúc vòng thiết kế khi chủ dự án xác nhận bề mặt đủ đẹp; không tự tuyên bố “đẹp nhất Việt Nam” hoặc tự nghiệm thu thay người dùng.

### Ý kiến Hội đồng CJ

- **Product:** JayT phải trả lời “tôi đi đâu/làm gì/mở gì ngay bây giờ?” bằng một trải nghiệm giàu cảm xúc, không bằng spreadsheet card.
- **Design:** chọn một art direction thống nhất `Đà Nẵng: Biển – Sông – Thành Phố Sau Giờ Học/Làm`; ưu tiên ảnh thật hợp quyền, bố cục magazine và nhịp bất đối xứng có kiểm soát.
- **UX/CX:** visual không được làm mờ mục tiêu; một user mới phải hiểu value trong 5 giây và hoàn thành action trong 2 chạm ở mobile.
- **Growth:** dùng moment sáng/trưa/tối/cuối tuần, collection theo khu vực và save/follow để tạo lý do quay lại, không dùng urgency/deal giả.
- **Data & Trust:** asset/brand/claim giữ ledger gate; dark/broken placeholder là failure state, không phải creative.
- **Engineering:** Design Reset là theme/component composition layer có token, responsive rules, asset fallback và performance budget; không tạo app/feed thứ hai.
- **QA:** visual regression phải so bề mặt thật trên 390/768/1440, light/dark/slow-network; không nhận screenshot trống/duplicate hoặc mockup thay staging.

### Lệnh tổng lực CJ

1. **Đóng băng hướng visual CH tại staging, không ship. Dựng `v3.427.3-staging.cj` là Design Reset upgrade-only, không production.** Giữ nguyên data model, evidence gates, routes, voucher three-lane và integrity manifest; chỉ tái thiết presentation/component system.
2. **Quy tắc “không ô rỗng”:** mọi image surface phải render đúng asset rights-passed, skeleton có nhãn loading thật, hoặc fallback composition hoàn chỉnh; cấm rectangle navy/đen, broken image, gradient mơ hồ hay empty media frame. CI visual scan kiểm asset load/alt/fallback ở mỗi viewport.
3. **Art direction bắt buộc:** `Da Nang After Hours` — xanh biển/sông giàu chiều sâu, trắng cát ấm, vàng nắng/đèn thành phố và coral làm accent hạn chế. Cầu Rồng, sông Hàn, biển, đường phố, campus và food culture là chất liệu; không sao chép reference, không green-beauty template, không neon/cyber, không ảnh AI giả danh địa điểm/merchant.
4. **Tái cấu trúc trang chủ thành experience, không grid:**
   - **Arrival:** hero ảnh thật/chất liệu Đà Nẵng toàn màn hình vừa đủ, headline lớn, một current moment, một CTA chính và hai action phụ;
   - **Today’s edit:** 3–5 discovery tiles có ảnh/context thật, thay phiên theo thời điểm/khu vực;
   - **Collections:** mỗi journey có hero visual/story card khác nhau, một decision action và rail compact — không lặp 2-column card template;
   - **Wallet/decision:** destination riêng, giàu interaction nhưng không giả coupon/price/deal.
   Nội dung chi tiết, source, giờ, điều kiện đi vào detail/drawer rõ ràng, không phủ kín landing.
5. **Typography, scale, motion:** headline/section/card có scale phân biệt mạnh; tăng kích thước đọc desktop/mobile, giảm metadata mặc định. Motion nhẹ chỉ phản hồi hành động (hover/save/rail), reduced-motion đầy đủ. Không animation trang trí đánh lạc hướng hay countdown/flash-sale giả.
6. **Visual Supply được tăng tốc nhưng không vượt quyền:** Council thu asset candidates read-only và chỉ ship asset có license/attribution/crop rights rõ. Thiếu asset phải dùng fallback type-led mang cảm xúc Đà Nẵng, không đưa placeholder tối. Mọi logo/creative merchant vẫn subject to rights ledger.
7. **Hai vòng review bắt buộc, không chờ nhắc:**
   - *Vòng 1 — Direction:* 3 board nội bộ khác nhau nhưng cùng brand JayT, token + first fold desktop/mobile + asset-rights matrix; Design/UX/Product/CX chọn hướng mạnh nhất theo rubric.
   - *Vòng 2 — Staging CJ:* triển khai một hướng đã chọn, nộp browser manifest hashed cho hero, today edit, 4 collection, wallet, empty/error/slow network và action states. Mỗi vòng tự tạo work order từ gap theo CB.
8. **Acceptance bar:** CEO review trực tiếp bề mặt staging; chủ dự án là người xác nhận aesthetic cuối. Không bản nào được mô tả `done`, `best`, `wow`, `top` hoặc chuyển production khi chưa có xác nhận đó. Trong lúc Design Reset chạy, supply/evidence/a11y/affiliate read-only vẫn tiếp tục theo safe lane.

**Trạng thái CEO:** `CH KHÔNG SHIP: BỀ MẶT XẤU DO Ô VISUAL RỖNG + CARD DENSE/REPETITIVE. CJ KÍCH HOẠT DESIGN RESET TOÀN DIỆN — LINH HỒN ĐÀ NẴNG, VISUAL THẬT CÓ QUYỀN, LOCAL-COMMERCE PREMIUM — VÀ LẶP CẢI TIẾN ĐẾN KHI CHỦ DỰ ÁN CHẤP NHẬN; PRODUCTION KHÓA`.

---

## CK. CEO Design Escalation — CJ không phải reset; dừng đổi màu/card cục bộ và trình ba hướng visual có chất lượng quyết định

CEO đã kiểm trực tiếp `v3.427.3-staging.cj`: HTTP `200`, version đúng, không thấy các claim trước bị chặn. Nhưng đánh giá thẩm mỹ của chủ dự án là chính xác: bề mặt không đủ đạt. Hero gần như giữ nguyên composition cũ; “Today’s edit” chỉ là bốn ô pastel chứa chữ. Đây là cosmetic styling, không phải Design Reset, không truyền tải được linh hồn Đà Nẵng và không đạt bar local-commerce premium.

CJ bị hạ thành `DESIGN RESET NON-COMPLIANCE / COSMETIC CARD VARIATION / NO-SHIP`. Không tiếp tục dùng bản CJ làm baseline thẩm mỹ hoặc lấy thêm card/màu/emoji để gọi là cải tiến.

### Lệnh tổng lực CK

1. **Cách ly CJ khỏi mọi release review. Dựng `v3.427.4-staging.ck` như Design Escalation, không production.** Preserve routes, data, trust/asset ledger and accessibility foundation; không phá hạ tầng hay dựng nguồn dữ liệu thứ hai.
2. **Dừng incremental styling:** cấm thêm/chỉnh card, border, gradient, màu accent hoặc emoji vào CJ như một cách chứng minh reset. Một thay đổi được coi là Design Reset chỉ khi thay đổi rõ first impression, spatial composition, image story, typography hierarchy và interaction rhythm.
3. **Trình ba art-direction board độc lập, không phải ba palette:**
   - **A — Sông Hàn Afterglow:** cinematic river/bridge photography, deep blue–amber, editorial headline, nightlife/after-class discovery;
   - **B — Đà Nẵng Mở Cửa:** warm sand–coral–sea, airy market/travel commerce, modular collections có visual local;
   - **C — Thành Phố Trong Một Ngày:** bold urban guide, map/route-inspired composition, sáng/trưa/tối như một hành trình liên tục.
   Mỗi board phải có desktop/mobile first fold, one food module, one transit/leisure module, wallet entry, type scale, interaction states, asset-rights matrix và fallback không ảnh. Không sao chép reference/merchant/creative; không dùng AI giả địa điểm hoặc khuyến mãi.
4. **Đưa ảnh và local culture lên lớp nội dung chính:** mỗi board cần ít nhất một photo-led scene có attribution/rights pass và một fallback type-led scene có cảm xúc. Không có ảnh pass thì không được render khung tối rỗng. Cầu Rồng là một option, không được lặp thành background mặc định cho mọi moment.
5. **Tái định nghĩa layout:** landing không được là hero + 4 tiles + card section lặp. Phải có contrast giữa large editorial moment, small discovery cards, horizontal rail/collection và detail destination. Metadata/source tách lớp; card không được là paragraph có button.
6. **Council thiết kế làm việc như studio:** Design dẫn art direction; Product xác nhận decision job; UX/CX test 5-second comprehension và mobile thumb reach; Growth chọn return moments; Data & Trust duyệt asset/claim boundary; Engineering đánh giá component/performance; QA kiểm responsive/a11y/load fallback. Council tự chọn một board mạnh nhất để dựng staging CK, nhưng giữ lại ba board cùng screenshots/evidence để CEO và chủ dự án review.
7. **User aesthetic gate:** CEO sẽ trình visual evidence của cả ba hướng và staging CK; chỉ chủ dự án xác nhận một hướng là “đủ đẹp” mới được mở rộng nó. Không tự chọn thay chủ dự án, không tự gọi `wow`, `best`, `final`, hoặc tiến gần production.

**Trạng thái CEO:** `CJ KHÔNG SHIP: THAY ĐỔI CHỈ LÀ TILE/PALETTE, KHÔNG PHẢI DESIGN RESET. CK YÊU CẦU BA HƯỚNG VISUAL THỰC SỰ KHÁC NHAU, ĐẬM LINH HỒN ĐÀ NẴNG VÀ CÓ USER AESTHETIC GATE; PRODUCTION KHÓA`.

---

## CL. Lệnh Tổng lực CEO — dừng storefront giả board, dựng Design Lab thật và chỉ đưa visual hoàn chỉnh trở lại JayT

CEO chấp nhận toàn bộ phản hồi của chủ dự án. Screenshot CK là thất bại rõ ràng: thanh `CEO Design Escalation • 3 Hướng Art Direction` và selector `Board A/B/C` bị render trong storefront; Board A vẫn là hero/card cũ; phần media biến thành các frame vàng/trống; không có một visual direction hoàn chỉnh nào được trình. Đây không phải “ba art-direction board”, không phải local commerce premium và không được phép tiếp tục biến người dùng thành người xem công cụ nội bộ.

CK bị cách ly với trạng thái `P0 DESIGN GOVERNANCE FAILURE + EMPTY MEDIA SURFACE / NO-SHIP`. “Tổng lực” có nghĩa toàn bộ các vai trò ưu tiên giải quyết design outcome trong phạm vi an toàn, **không** có nghĩa tạo thêm mockup giả, thay production, dùng asset không rõ quyền, hoặc phát claim không evidence.

### Quyết định thiết kế không thể thương lượng

1. **Tách Design Lab khỏi storefront tuyệt đối.** Board selector, rubric, comparison notes, debug labels, version experiment, internal audit/QA controls chỉ tồn tại ở private/staging review route; chúng không được render trên home, mobile navigation, meta/OG hay bất kỳ bề mặt công khai nào.
2. **Zero Empty Media Rule:** khung media chỉ được xuất hiện khi asset đã load và rights pass. Không có asset thì dùng visual fallback đã thiết kế hoàn chỉnh (typography, texture/map abstract có provenance, color composition); cấm frame đen/navy/vàng rỗng, broken alt, shimmer vô hạn hoặc fake thumbnail.
3. **Không dùng homepage hiện tại làm board.** Ba board phải là ba composition khác nhau nhìn thấy ngay từ 2 giây đầu, không phải cùng layout đổi palette/text. Storefront không nhận bất kỳ board nào cho đến khi Design Lab pass review.

### Lệnh Tổng lực CL

1. **Cách ly CK. Dựng `v3.427.5-staging.cl` upgrade-only, không production.** Tạm dừng mọi cosmetic patch trên home CK; giữ nguyên data/evidence, voucher three-lane, accessibility và supply safe lanes để không mất nền tảng.
2. **Thiết lập private Design Lab với ba board hoàn chỉnh:** mỗi board có 1440 và 390, gồm arrival, one discovery collection, one local food/travel module, wallet entry, empty/error/slow-network fallback. Mỗi board phải có screenshot/browser manifest riêng, asset ledger và không chứa selector trong storefront.
   - **Sông Hàn Afterglow:** cinematic photo-led, river light, dark-blue/amber, nhịp sau giờ học/làm;
   - **Đà Nẵng Mở Cửa:** warm editorial, cát–san hô–biển, city guide giàu ảnh và lựa chọn gần gũi;
   - **Một Ngày Trong Thành Phố:** graphic urban journey, sáng–trưa–chiều–tối, spatial layout và local route cue.
3. **Mỗi board phải vượt `Visual Reality Gate`:** ít nhất 3 scene/asset local đã rights-pass; mọi scene có source/attribution; fallback không rỗng; không AI giả địa điểm/merchant/promo; không reuse một background cho mọi journey; không text-card grid để lấp thiếu visual.
4. **Board selection không phải lựa chọn tuỳ tiện:** Council Design/UX/CX/Product đánh giá bằng rubric 2-second emotion, local recognisability, decision clarity, mobile thumb reach, visual density và accessibility. Growth/Data & Trust/Engineering/QA xác nhận viability/rights/performance. Council đề xuất 1 board nhưng **không có quyền thay chủ dự án duyệt aesthetics**.
5. **Sau Design Lab, chỉ dựng một storefront candidate:** chuyển đúng board được đề xuất thành `staging.cl`, với hero/collections/detail actions được tái compose từ gốc. Cấm copy-paste UI CK, cấm 4 pastel tiles hoặc 2-column repetitive cards; source/metadata đi vào detail drawer, không chiếm landing.
6. **Bằng chứng bắt buộc:** QA nộp browser-captured desktop/mobile first fold, full scroll của từng board, asset load/error screenshot, file hash/manifest, Lighthouse/performance/accessibility summary. Engineering phải cho CEO chứng minh board-control đã bị loại khỏi storefront build. Nếu image fail, build fail; không fallback về blank frame.
7. **CEO/user gate:** CEO review toàn bộ Lab trước, rồi trình staging visual evidence cho chủ dự án. Không gọi một board là “đạt” khi chủ dự án chưa trực tiếp chấp nhận. Chu kỳ Design Lab → Council → staging → CEO/user review lặp liên tục theo CB đến khi đạt tiêu chuẩn thẩm mỹ của chủ dự án.

**Trạng thái CEO:** `CK KHÔNG SHIP: INTERNAL BOARD UI LỌT VÀO STOREFRONT + EMPTY MEDIA LÀ P0. CL DỒN TOÀN BỘ NĂNG LỰC THIẾT KẾ VÀO BA VISUAL BOARD THẬT, ASSET HỢP QUYỀN VÀ MỘT STOREFRONT CANDIDATE TÁI COMPOSE TỪ GỐC; KHÔNG TỰ DỪNG TRƯỚC KHI CHỦ DỰ ÁN CHẤP NHẬN`.

---

## CM. Quyết định CEO — không bắt chủ dự án chọn từ board trống; chốt hướng nền “Đà Nẵng Mở Cửa” và buộc Design Lab trình visual thật

CEO đã xem screenshot Design Lab CL. Kết luận: không thể và không nên yêu cầu chủ dự án chọn. Cả ba preview đều broken/empty media; tên, hex code và nút `Đề xuất` không phải một art direction có thể đánh giá. CL vi phạm ngay `Visual Reality Gate` của chính nó.

### Quyết định sáng tạo của CEO

**Chọn Board B — `Đà Nẵng Mở Cửa` làm hướng nền duy nhất.** Lý do: palette cát ấm–san hô–xanh biển, ánh sáng thành phố ban ngày và chất liệu ẩm thực/biển/đường phố có độ bao phủ tốt nhất cho sinh viên và dân văn phòng trong cả ngày; nó có chất local commerce thân thiện mà không bị tối/nặng như Board A hoặc biến thành app route chức năng như Board C.

- Board A `Sông Hàn Afterglow` chỉ được dùng như theme cho collection buổi tối/cuối tuần.
- Board C `Một Ngày Trong Thành Phố` chỉ được dùng như ngôn ngữ route/time selector.
- Không có Board A/B/C selector, CTA `Đề xuất board`, hex sheet hay Design Lab text xuất hiện trong storefront hoặc bắt chủ dự án lựa chọn nữa.

### Lệnh tổng lực CM

1. **Cách ly Design Lab CL hiện tại. Dựng `v3.427.6-staging.cm` từ hướng Board B đã chốt, không production.** Không thiết kế lại từ hạ tầng; giữ route/data/evidence/voucher safety contracts.
2. **Xử lý P0 broken preview trước mọi việc khác:** kiểm URL/asset pipeline/CSP/cache/ratio/fallback; mọi preview phải có image thật rights-pass hoặc fallback hoàn chỉnh. Nếu một image lỗi, Design Lab/staging fail và không được thay bằng khung xám/trắng/trống.
3. **Trình một visual prototype hoàn chỉnh, không còn board mô tả:** desktop 1440 và mobile 390 gồm hero `Đà Nẵng Mở Cửa`, food discovery, transit/city collection, after-hours collection, wallet entry và empty/error states. Chỉ một hướng để đánh giá; phần Board A/C dùng nội bộ làm theme tokens, không là product surface.
4. **Composition cụ thể:** hero sáng, giàu ảnh local, có khoảng thở; headline lớn và một CTA chính. Below-fold là editorial discovery cards có ảnh/context thật, các collection bất đối xứng có nhịp lớn–nhỏ–rail, không 2-column text cards. Warm sand background, coral action accent, ocean blue navigation/context; contrast/tokens AA là bắt buộc.
5. **Asset/claim boundary:** visual chỉ dùng asset pass rights/attribution; thiếu ảnh dùng type-led local composition, không AI giả city/merchant/deal. Không dùng visual để ám chỉ voucher, partnership, quality, price hoặc approval. Supply/evidence read-only tiếp tục song song.
6. **Council execution ngay:** Design/UX-CX chịu trách nhiệm prototype/task test; Product/Growth chọn local moments; Data & Trust duyệt asset ledger; Engineering đảm bảo asset fail gate và responsive build; QA nộp fresh browser capture + hash manifest + visual diff. Họ không chờ thêm prompt; nếu CM không đạt, tự tạo work order kế tiếp theo CB.
7. **Gate cuối:** CEO kiểm visual CM trước; sau đó trình cho chủ dự án xem đúng storefront candidate. Chủ dự án chỉ cần đánh giá một thiết kế hoàn chỉnh, không bị yêu cầu chọn từ placeholder. Aesthetic acceptance vẫn thuộc chủ dự án; production khóa.

**Trạng thái CEO:** `CL DESIGN LAB KHÔNG ĐỦ ĐIỀU KIỆN REVIEW VÌ BA PREVIEW RỖNG. CEO CHỐT BOARD B “ĐÀ NẴNG MỞ CỬA”; CM PHẢI TRÌNH MỘT STOREFRONT VISUAL THẬT, KHÔNG SELECTOR/PLACEHOLDER, TRƯỚC KHI YÊU CẦU BẤT KỲ ĐÁNH GIÁ NÀO`.

---

## CN. CEO Visual Asset Intervention — CM tiếp tục dùng placeholder; khóa mọi “design pass” cho đến khi visual thật load được

CEO kiểm screenshot `v3.427.6-staging.cm`. CM không đạt lệnh CM: hero là minh hoạ phẳng chưa có chiều sâu photo/editorial, và các surface Food/Transit/Study/Leisure tiếp tục hiển thị media placeholder vàng. Layout hai cột cũ gần như giữ nguyên. Đây chứng minh root cause không phải chọn Board A/B/C mà là pipeline asset/render không được giải quyết trước khi ghép layout.

CM là `P0 ASSET-REALITY FAILURE + DESIGN DIRECTION NON-COMPLIANCE / NO-SHIP`. Không thêm version, đổi màu, đổi headline hoặc thêm card cho tới khi visual assets render thật và fallback hoạt động.

### Lệnh tổng lực CN

1. **Cách ly CM. Dựng `v3.427.7-staging.cn` theo quy trình Asset-First, không production.** Giữ Board B là hướng nền, nhưng cấm bắt đầu storefront composition trước Asset Admission Gate.
2. **Asset Admission Gate bắt buộc trước layout:** Data & Trust/Design/Engineering chuẩn bị một `Visual Slate` tối thiểu 6 asset cho Board B (hero Đà Nẵng, food culture, street/city, transit, study/work, evening). Mỗi asset phải có local copy or stable URL, SHA-256, author, license/rights, required attribution, crop focal point, alt text, responsive variants và asset-load test. Chỉ asset `PASS` mới vào build; asset unclear bị cách ly, không block những asset pass.
3. **Không có asset pass thì không có media container:** fallback phải là full editorial composition được thiết kế trước (color/typography/vector/map texture tự tạo có provenance), không placeholder vàng/đen/xám, broken image icon, fake photo hoặc một block trống kèm alt text. Browser test offline/slow/error phải chứng minh fallback vẫn đẹp.
4. **Recompose Board B từ visual thật:** một hero photo-led về Đà Nẵng có safe crop; một food story có visual local thật; một city/transit visual; one after-hours visual. Chỉ 3–5 scene chất lượng cao, không phủ ảnh lên mọi card. Nội dung safe-tiered/CTA đúng action contract; source/metadata đặt ở detail layer, không chiếm bìa.
5. **Xóa template cũ, không phủ skin:** không tái dùng two-column primary + two stacked text cards làm skeleton. Mỗi collection dùng large image-led story + compact decision rail; bố cục có nhịp mosaic/editorial rõ ràng, khoảng thở chủ động và mobile composition riêng. Không biến Board B thành template travel generic.
6. **Cổng kiểm trước khi CEO xem:**
   - Engineering/QA: mỗi asset trả HTTP/load/decode pass ở 390/768/1440, no broken-media DOM, hash manifest và visual diff;
   - Design/UX-CX: 2-second visual/emotion test và action clarity;
   - Product/Growth: moment mix không spam;
   - Data & Trust: rights/attribution/claim audit.
   Một asset failure làm block đúng visual đó, không fallback lặng lẽ về placeholder và vẫn gọi board “đủ đẹp”.
7. **CEO/user review:** CEO chỉ review CN sau khi Visual Slate và Asset Admission Gate pass độc lập. Chủ dự án được xem một storefront có media thật, không review placeholder một lần nữa. Chu kỳ tự tiếp tục theo CB cho đến acceptance thẩm mỹ; production tiếp tục khóa.

**Trạng thái CEO:** `CM KHÔNG SHIP: VẪN PLACEHOLDER VÀ LAYOUT CŨ. CN ĐẢO NGƯỢC TRÌNH TỰ — ASSET THẬT/HỢP QUYỀN VÀ LOAD GATE TRƯỚC, COMPOSITION SAU — ĐỂ CHẤM DỨT VÒNG LẶP “ĐỔI MÀU NHƯNG VẪN XẤU”`.

---

## CO. CEO Root-Cause Stop — CN vi phạm Asset-First Gate; dừng composition cho đến khi ảnh thật render được trên browser

CEO kiểm trực tiếp `v3.427.7-staging.cn`: HTTP `200`, version đúng và bundle không phát lại các claim đã chặn. Nhưng browser capture Food Narrative vẫn có vùng media navy với broken-image icon. Vì vậy CN không hề vượt Asset Admission Gate: visual supply có thể đã được khai báo, nhưng không được phân phối/render thành public surface. Đây là nguyên nhân gốc khiến các “thiết kế đẹp” liên tục thành placeholder.

CN là `ASSET PIPELINE ROOT-CAUSE UNRESOLVED / P0 DESIGN BLOCKER / NO-SHIP`. Kể từ lệnh này, cấm mọi workstream tiếp tục đổi layout, palette, headline, card, board hoặc mockup storefront cho tới khi asset-load proof pass. Data/supply/evidence/a11y safe lanes vẫn chạy theo CB.

### Lệnh tổng lực CO

1. **Cách ly CN. Dựng `v3.427.8-staging.co` chỉ cho Asset Pipeline Recovery, không production và không redesign surface.** Không lấy screenshot/layout mới làm “tiến bộ” trong khi media còn lỗi.
2. **Chẩn đoán trực tiếp root cause, không đoán:** Engineering/QA phải đối chiếu DOM `img/picture/source`, resolved URL, HTTP status, MIME, CORS/CSP, cache, decode/naturalWidth, responsive source selection và error handler trên staging 1440/390. Nộp raw browser network/console evidence của từng asset failed, không chỉ report tóm tắt.
3. **Thiết lập asset delivery đáng tin:** asset rights-pass phải được fingerprinted và phục vụ từ static asset pipeline/domain cho phép, có integrity hash và responsive variants. Không phụ thuộc URL tạm, remote hotlink hoặc asset registry chỉ có metadata. Dùng remote asset chỉ khi full fetch/CORS/cache test pass; nếu không, quarantine và dùng fallback thiết kế hoàn chỉnh.
4. **Asset Gate là executable, không phải tài liệu:** build/staging fail nếu bất kỳ visual slot đã khai báo có `error`, `naturalWidth=0`, failed decode, empty source hoặc fallback không phải design state. Cấm CSS che broken image bằng block tối. Test phải cover hero + food + transit + study + leisure + wallet trên 390/768/1440 và slow/offline fallback.
5. **Visual Slate proof trước storefront:** CEO yêu cầu một route staging nội bộ tối giản chỉ hiển thị 6 assets/fallbacks rights-passed cùng attribution, responsive crop và status render. Sau khi tất cả pass bằng browser capture + manifest/hash, mới được gỡ stop và dựng lại Board B. Route này không phải public product và không thay thế review thẩm mỹ.
6. **Council CO:** Engineering sở hữu root-cause/fix; QA độc lập thử lỗi network; Data & Trust kiểm asset identity/rights; Design duyệt fallback không-placeholder; UX/CX kiểm alt/contrast/reduced data; Product/Growth giữ local moments/supply; CEO kiểm visual slate trực tiếp. Không nhóm nào có quyền tự bỏ gate vì deadline.
7. **Exit criteria duy nhất:** sáu asset/fallbacks render thật, no broken-media DOM, hashes/attributions khớp, responsive screenshots độc lập pass. Chỉ khi đó Council tự mở work order `composition Board B` tiếp theo; chủ dự án không bị gửi thêm một storefront placeholder.

**Trạng thái CEO:** `CN KHÔNG SHIP: ASSET LOAD VẪN HỎNG. CO DỪNG MỌI LÀM ĐẸP GIẢ, SỬA PIPELINE ASSET Ở GỐC VÀ CHỈ CHO PHÉP DESIGN COMPOSITION SAU KHI BROWSER CHỨNG MINH ẢNH THẬT ĐÃ RENDER`.

---

## CP. Chuẩn CEO không hạ cấp — JayT theo đuổi đẳng cấp giao diện hàng đầu Việt Nam, không chỉ hoàn thành chức năng

Mục tiêu thiết kế chính thức của JayT là trở thành một trải nghiệm local commerce có chất lượng giao diện và trải nghiệm thuộc nhóm dẫn đầu Việt Nam. Đây là **tiêu chuẩn định hướng và acceptance bar**, không phải một claim tự phong khi chưa có đánh giá độc lập của người dùng/thị trường. Không phòng ban nào được đánh đổi chuẩn đó để lấy một bản “có đủ nội dung”, một dashboard dễ dựng, card grid lặp, placeholder, visual AI giả hoặc UI có vẻ hoàn thành.

### Tiêu chuẩn bắt buộc cho mọi visual release

1. **Khoảnh khắc đầu:** nhận ra Đà Nẵng, hiểu JayT giúp gì và có một hành động hấp dẫn trong 2–5 giây.
2. **Chất lượng hình ảnh:** media thật có quyền dùng và tải ổn định; không placeholder/broken asset; attribution đúng nhưng tinh tế.
3. **Bản sắc:** không template marketplace hoặc travel generic; biển, sông, thành phố, ẩm thực và nhịp sống Đà Nẵng được chuyển thành art direction nhất quán.
4. **Trải nghiệm:** mobile-first, nhanh, rõ, giàu tương tác vừa đủ; mỗi CTA có outcome đúng, không deceptive urgency/discount.
5. **Độ tinh xảo:** typography, spacing, color, motion, states và empty/error/loading đều được thiết kế; không có “mặt sau” thô sau hero đẹp.
6. **Niềm tin:** mọi ưu đãi, merchant, asset, nguồn và affiliate tuân evidence/rights/action contracts; vẻ đẹp không được che thiếu dữ liệu.
7. **Người quyết định cuối:** CEO kiểm trực tiếp staging; chủ dự án xác nhận aesthetic. Không bản nào tự dùng các từ `top 1`, `đẹp nhất`, `hoàn hảo` hay `final` trước gate đó.

**Trạng thái CEO:** `CP CÓ HIỆU LỰC NGAY: MỌI WORK ORDER THIẾT KẾ PHẢI ĐẠT CHUẨN GIAO DIỆN HÀNG ĐẦU, VỪA ĐẸP VỪA THẬT VỪA HỮU ÍCH; CHU KỲ CẢI TIẾN KHÔNG DỪNG Ở MỨC “CHẠY ĐƯỢC”`.

---

## CQ. Phán quyết CEO CO — Asset Gate có tín hiệu pass; chuyển sang Signature Composition để đạt chuẩn CP

CEO đã kiểm staging CO: HTTP `200`, `v3.427.8-staging.co`, không thấy các claim bị chặn. Visual Slate hiện render ảnh Cầu Rồng; Food Narrative đã render illustration hoàn chỉnh thay cho placeholder/broken image. Đây là tín hiệu pass hẹp cho asset recovery, cho phép quay lại composition. Tuy nhiên surface vẫn thiên về primary card lớn + cột card text, metadata/badge dày và hero quen thuộc — chưa đạt chuẩn visual hàng đầu CP.

### Lệnh tổng lực CQ

1. **Dựng `v3.427.9-staging.cq` upgrade-only, không production.** Asset Gate CO tiếp tục chạy trong CI; bất kỳ visual failure nào vẫn block build.
2. **Tạo Signature Composition Board B:** một visual language thống nhất giữa hero, food, transit, study và evening — photo-led Đà Nẵng khi rights pass, illustration JayT chỉ làm accent có chủ đích. Không đặt illustration lớn trong card directory rồi gọi đó là editorial.
3. **Tái bố cục từ flow, không card:** home dùng một arrival scene, một editorial “hôm nay”, một collection rail có hình, và các destination cards compact. Những detail (địa chỉ/giờ/source/badge) chỉ mở theo nhu cầu; landing giảm text density tối thiểu một nửa.
4. **Hero mới phải có signature:** Cầu Rồng/Đà Nẵng hiện diện rõ, không phải chỉ ảnh nền tối; headline ngắn, quyết định theo moment, one primary CTA. Không sao chép hero cũ hoặc đặt toàn bộ chips/metadata thành overlay.
5. **Nhịp visual:** dùng contrast giữa full-bleed visual, warm editorial surface, compact rail và calm utility; không lặp primary-left/secondary-right qua mọi journey. Mobile có composition riêng, không co desktop xuống.
6. **Council CQ:** Design/UX-CX nộp visual comparison `CO → CQ` với 2-second test; Product/Growth xác nhận journey/value; Data & Trust kiểm rights/claim; Engineering/QA kiểm asset pipeline, a11y/performance, browser full-scroll 1440/390. CEO và chủ dự án review CQ trực tiếp; production khóa.

**Trạng thái CEO:** `CO CÓ TÍN HIỆU PASS VỀ ASSET RECOVERY, KHÔNG PHẢI AESTHETIC PASS. CQ ĐƯỢC PHÉP TÁI COMPOSE BOARD B THÀNH SIGNATURE EXPERIENCE ĐÀ NẴNG, KHÔNG QUAY LẠI CARD DIRECTORY`.

---

## CR. Phán quyết CEO CQ — Signature Composition đã hiện diện; tinh giản mobile và hợp nhất ngôn ngữ hình ảnh trước aesthetic review

CEO kiểm trực tiếp `v3.427.9-staging.cq`: HTTP `200`, version đúng, 5 image tags public và browser captures desktop/mobile có hero Cầu Rồng cùng Food visual render thật. Đây là bản đầu tiên sau Design Reset có signature composition nhìn thấy được; không còn blank-media/card directory thuần túy. Tuy vậy CQ mới là `CANDIDATE`, chưa là visual acceptance.

Gap còn lại: mobile hero xếp attribution, moment pill, headline hai dòng, subline, CTA và City Note trong cùng một khung nên quá tải; header chiếm nhiều chiều cao nhưng ít giá trị; visual city photography và food illustration chưa có art-direction bridge nên cảm giác ghép hai phong cách; CTA/source detail còn nặng trong first fold. Chuẩn CP yêu cầu tinh xảo và nhất quán, không chỉ “đã có ảnh”.

### Lệnh tổng lực CR

1. **Dựng `v3.428.0-staging.cr` upgrade-only, không production.** Giữ asset pipeline pass, safe data/tier/action contracts và CQ composition; không quay về placeholder/card grid.
2. **Mobile editorial restraint:** header giảm về compact brand/navigation; hero chỉ giữ attribution tinh tế, one moment label, headline, one primary CTA. City Note chuyển thành compact teaser hoặc điểm đầu của next section; source/details mở theo action. Fresh 390 first fold phải có clear landmark, no clipping và một quyết định rõ mà không biến thành poster chữ.
3. **Hợp nhất art direction:** chọn một visual grammar cho Board B: photography/local imagery là chủ đạo; self-created editorial illustration chỉ dùng như accent và phải dùng palette/light/shadow/crop rules tương thích. Không đặt cartoon illustration khổng lồ cạnh cinematic city photo nếu không có bridge. Asset rights tiếp tục gate.
4. **Refine typography/spacing:** giảm badges/outline, tăng khoảng thở có chủ đích, tạo scale title/body/meta rõ và không shadow-heavy. CTA được một visual focus duy nhất mỗi moment; secondary action không cạnh tranh.
5. **Council CR:** Design/UX-CX nộp style bridge + 5-second mobile test; Product/Growth kiểm primary choice; Data & Trust kiểm attribution/source; Engineering/QA nộp browser 1440/390 fresh-load/full-scroll/light-dark/reduced-motion, asset/no-broken-media and accessibility tests. CEO review CR trước khi trình chủ dự án; aesthetic acceptance vẫn thuộc chủ dự án.

**Trạng thái CEO:** `CQ LÀ CANDIDATE VISUAL ĐẦU TIÊN, KHÔNG PHẢI FINAL. CR TINH GIẢN MOBILE VÀ HỢP NHẤT VISUAL GRAMMAR ĐỂ BOARD B ĐẠT CHUẨN PREMIUM NHẤT QUÁN; PRODUCTION KHÓA`.

---

## CS. Phán quyết CEO — loại bỏ minh hoạ giả; JayT phải dùng ảnh Đà Nẵng thật, đẹp và có quyền sử dụng rõ

CEO chấp nhận đánh giá của chủ dự án: visual hiện tại không đạt chuẩn Đà Nẵng. Minh hoạ Mì Quảng mang tính generic/cartoony, không phải ảnh thật và làm suy yếu cảm giác local premium. Việc đưa nó làm feature visual là quyết định sai. Từ đây, JayT không dùng illustration như một vật thay thế cho ảnh địa phương thật ở hero hoặc collection chủ đạo.

CR bị giới hạn lại thành `PHOTOGRAPHY-FIRST RESET / NO-SHIP`. Board B chỉ tiếp tục khi có visual thật, đúng Đà Nẵng và có quyền sử dụng; không dùng AI để giả danh cảnh, món ăn, quán, merchant hay ưu đãi.

### Lệnh tổng lực CS

1. **Cách ly visual illustration CQ/CR khỏi feature surface. Dựng `v3.428.1-staging.cs` upgrade-only, không production.** Không rollback data/trust/accessibility; chỉ thay visual language và asset pipeline theo ảnh thật.
2. **Lập “Thư viện Ảnh Thật Đà Nẵng” read-only:** tối thiểu 12 candidate ảnh độ phân giải cao, gồm Cầu Rồng/Sông Hàn, Mỹ Khê/biển, Sơn Trà, phố/đời sống, ẩm thực Đà Nẵng thật, campus/cafe học/làm, city night và di chuyển. Mỗi ảnh phải có photographer/origin, license/permission, attribution, crop/derivative/commercial-right status, hash, source URL, date và visual quality score. Không được coi ảnh từ Google/social/merchant page là có quyền chỉ vì xem được.
3. **Asset rights trước aesthetic:** Data & Trust chỉ đưa `PASS` vào staging; uncertain/legal status chờ authority riêng. Antigravity tiếp tục tự khảo sát nguồn open-license/official permitted read-only; không cần chờ nhắc, nhưng không được tải/copy/publish asset chưa pass.
4. **Photo-first art direction:**
   - hero là một ảnh Đà Nẵng thật, crop có chủ đích, ít overlay;
   - collections chủ đạo có ảnh thật theo moment/khu vực;
   - food phải là ảnh món/không gian thật hoặc, nếu chưa có quyền, typography editorial sạch chứ không minh hoạ thay thế;
   - ảnh không dùng để xác nhận deal, giá, thương hiệu hay quan hệ affiliate.
5. **Chất lượng hình ảnh:** cấm ảnh pixelated, low-resolution, watermarked không quyền, stock photo generic, same Dragon Bridge lặp ở mọi section, excessive dark gradient và ảnh AI. Mỗi route phải có focal point/crop mobile riêng, alt text, lazy/eager strategy và fallback đẹp không rỗng.
6. **Council CS:** Design/UX-CX chấm authenticity/local recognition; Product/Growth chọn story moments; Data & Trust/legal-rights audit asset ledger; Engineering đảm bảo responsive image delivery; QA kiểm load/attribution/contrast/a11y và browser visual screenshots 1440/390. CEO tự kiểm sample ảnh/source trước khi cho build photo-first tiếp tục.
7. **User gate:** chỉ khi staging CS có ảnh thật render đẹp, đúng Đà Nẵng và không claim giả, CEO mới trình lại cho chủ dự án. Không gọi minh hoạ generic là “linh hồn Đà Nẵng”; aesthetic acceptance vẫn do chủ dự án quyết định.

**Trạng thái CEO:** `CR KHÔNG SHIP THEO HƯỚNG MINH HOẠ. CS CHUYỂN JAYT SANG ẢNH ĐÀ NẴNG THẬT/HỢP QUYỀN, PHOTO-FIRST PREMIUM VÀ LOCAL AUTHENTICITY; PRODUCTION KHÓA`.

---

## CT. Tiếp tục CS — khôi phục staging photo-first và dùng Visual Library read-only thay cho minh hoạ giả

Kiểm tra độc lập hiện tại: URL `staging.cs` vẫn trả `404`, vì vậy chưa có bề mặt photo-first để review/đánh giá. Đây không được che bằng report. Song song, CEO đã khảo sát read-only ba kho nguồn candidate thực: [Dragon Bridge (Danang) trên Wikimedia Commons](https://commons.wikimedia.org/wiki/Category:Dragon_Bridge_(Danang)), [Mỹ Khê trên Wikimedia Commons](https://commons.wikimedia.org/wiki/Category:My_Khe_Beach) và [Danh mục Đà Nẵng trên Wikimedia Commons](https://commons.wikimedia.org/wiki/Category:Da_Nang). Đây chỉ là **nguồn khảo sát**; không category/file nào được coi là đã được cấp quyền dùng cho JayT khi chưa kiểm riêng từng file/license/attribution.

### Lệnh tiếp tục CT

1. **Khôi phục staging CS đúng URL/version trước khi nộp bất kỳ visual review nào.** 404 là P0 availability blocker; không tăng version/screenshot mockup để né lỗi.
2. **Data & Trust/Design duyệt từng ảnh candidate, không duyệt theo category:** file URL, tác giả, license, commercial/derivative/share-alike requirement, attribution, crop permission, hash và render test. Chỉ record `PASS` mới được vào Visual Slate.
3. **Tạo photo shortlist Board B:** tối thiểu 1 Cầu Rồng/Sông Hàn, 1 biển/Mỹ Khê, 1 phố/đời sống, 1 food thật và 1 night/city scene; ưu tiên ảnh giàu bố cục, độ phân giải/crop mobile tốt, có dấu ấn Đà Nẵng rõ. Không lặp Cầu Rồng cho mọi module.
4. **Nếu ảnh food/local life không có quyền rõ, giữ feature type-led tinh tế hoặc giữ module không media; cấm quay lại illustration/AI/placeholder.** Những asset pháp lý chưa rõ chờ authority riêng, còn pipeline/read-only candidate khác tiếp tục theo CB.
5. **QA/Engineering nộp browser proof khi staging trở lại:** fresh 1440/390, HTTP/decode/CORS, attribution visible-on-demand, no broken-media DOM; CEO kiểm trực tiếp trước khi có lệnh composition kế tiếp.

**Trạng thái CEO:** `CS CHƯA REVIEW ĐƯỢC VÌ STAGING 404. CT DUY TRÌ PHOTO-FIRST BẰNG VISUAL LIBRARY THẬT/READ-ONLY VÀ CHỈ NHẬP TỪNG ASSET SAU LICENSE + BROWSER GATE; PRODUCTION KHÓA`.

---

## CU. Chuẩn CEO 4K & Community Beauty Proof — ảnh cực nét, tối ưu thật và đánh giá cộng đồng trung thực

CEO chấp thuận yêu cầu chuẩn hình ảnh cực cao: JayT phải dùng ảnh thật Đà Nẵng có **master tối thiểu 4K** cho visual chủ đạo khi nguồn/rights cho phép. Tuy nhiên không được upscale ảnh nhỏ, tạo ảnh AI giả cảnh thật, hoặc tải file 4K nguyên bản cho mọi thiết bị rồi gọi đó là chất lượng. Chất lượng cao phải đi cùng render sắc nét, crop tốt, tải nhanh và attribution đúng.

Về “cộng đồng đánh giá cực đẹp”: JayT không được hiển thị sao, quote, NPS, “được yêu thích” hoặc bất kỳ social proof nào nếu chưa có phản hồi thật. Chúng ta có thể xây research plan ngay; việc tuyển người thật/công bố dữ liệu/phản hồi ra public chỉ thực hiện sau consent, privacy và authority phù hợp.

### Lệnh tổng lực CU

1. **Nâng Visual Library thành chuẩn 4K:** hero/feature photography master tối thiểu `3840×2160` hoặc cạnh dài tương đương, nguồn gốc rõ và không upscale. Mỗi asset có original dimensions, checksum, focal point, crop desktop/mobile, license/attribution và rights status.
2. **Responsive delivery không đánh đổi performance:** tạo derivative có chất lượng kiểm soát (mobile/tablet/desktop, AVIF/WebP phù hợp), `srcset/sizes`, LCP hero preload có giới hạn, lazy-load ảnh below fold, decode/error test. QA đo sharpness/crop/LCP/bytes trên 390, 768, 1440 và mạng chậm; 4K master không là lý do làm site chậm.
3. **Photo Quality Gate:** cấm pixelation, compression artefact, wrong crop, watermark chưa có quyền, dark overlay che ảnh, duplicate city scene, stock generic và fake scene. Không pass một tiêu chí thì asset không render, dùng fallback complete theo CT.
4. **Community Beauty Research plan (chưa public claim):** UX/CX chuẩn bị usability/visual test với sinh viên và dân văn phòng Đà Nẵng: 5–8 test định tính để tìm vì sao đẹp/chưa đẹp, sau đó survey 100+ khi có authority để định lượng. Các câu hỏi phải đo local recognition, first impression, trust, desirability, clarity và so sánh trước/sau; không hỏi dẫn dắt để lấy “đẹp”.
5. **Quyền riêng tư & công bố:** Product/Data & Trust chuẩn bị consent, tối thiểu hóa dữ liệu, retention và public-copy policy. Không thu danh tính, không gửi survey, không tuyển hay công bố score/testimonial trước khi owner phê duyệt cơ sở pháp lý/quyền riêng tư. Không có phản hồi thật thì UI chỉ nói về sản phẩm, không social proof.
6. **Council CU:** Design/Engineering/QA kiểm 4K render/performance; UX/CX/Growth lập study; Product thiết kế success metrics; Data & Trust duyệt rights/privacy. CEO kiểm browser visual 4K-derived và research protocol trước khi mở vòng feedback cộng đồng. Production khóa.

**Trạng thái CEO:** `CU CÓ HIỆU LỰC: JAYT THEO ĐUỔI ẢNH ĐÀ NẴNG THẬT 4K, RENDER/HIỆU NĂNG CAO VÀ ĐÁNH GIÁ CỘNG ĐỒNG CÓ BẰNG CHỨNG. KHÔNG UPSCALE/AI GIẢ, KHÔNG REVIEW/SOCIAL PROOF GIẢ`.

---

## CV. Phán quyết CEO sau kiểm trực tiếp CU — dừng claim 4K sai; chuyển storefront về Deal/Voucher Discovery

CEO đã kiểm trực tiếp local staging `v3.428.2-staging.cu` tại `/` và `/visual-slate`, không dựa vào report. Kết quả: route trả về và sáu ảnh đều decode được, không có console error tại thời điểm kiểm. Tuy nhiên `naturalWidth` của toàn bộ ảnh storefront/Visual Slate là **1280px**. Điều này trái với claim “100% ảnh master 4K đang phân phối”; riêng Visual Slate còn tự ghi Mì Quảng là `3072×2304`, dưới ngưỡng CU. Vì vậy không được gọi bản CU là 4K PASS, không dùng receipt 13/13 làm evidence thay thế, và không được trình nó như chuẩn ảnh đã đạt.

Về trải nghiệm, hero Cầu Rồng là ảnh thật có attribution hiển thị; điều này là tiến bộ so với illustration/placeholder. Nhưng bề mặt hiện tại vẫn là local editorial guide: chỉ có bốn feature địa điểm và hai lối vào tiện ích, trong khi điều hướng hiển thị `Khám phá (50)`. Nó chưa cho khách một hành động mua sắm/săn voucher rõ ràng trong first fold, chưa chứng minh 50 nội dung tiered, và chưa đáp ứng yêu cầu cốt lõi deal/voucher của JayT.

### Lệnh tổng lực CV

1. **NO-SHIP cho claim 4K của CU.** Giữ mọi ảnh 1280 đang hoạt động nếu quyền đã pass, nhưng đổi trạng thái ledger/Visual Slate thành `DERIVATIVE 1280 — MASTER CHƯA KIỂM CHỨNG` cho tới khi có file-master độc lập, checksum, kích thước gốc, source file/license và chain derivative. Không suy diễn master từ mô tả; Mì Quảng dưới 4K không được gắn nhãn 4K. Không upscale.
2. **Tách hai đường deliverable:** (a) Visual Library 4K thật, rights-pass, chỉ nhập qua per-file gate; (b) responsive derivative có `srcset/sizes` với file gốc đã đối chiếu. QA phải xuất bảng đối chiếu URL phân phối, kích thước decode, master ID, hash, license/attribution và crop. Nếu master chưa có, UI dùng nhãn nội bộ chính xác hoặc không đưa vào slate 4K.
3. **Đảo first fold về nhu cầu khách:** ảnh Đà Nẵng thật vẫn là emotional stage, nhưng hero phải dẫn đến một trong ba thao tác ngay: `Ưu đãi dùng hôm nay`, `Lấy voucher chính thức`, `Mua món này có hời?`. Một featured card chỉ được là Deal xác minh khi có giá thực, tổng chi phí, điều kiện, hạn và evidence; thiếu bất kỳ phần nào phải là `Chương trình chính thức` hoặc `Radar`, không giả voucher/deal.
4. **Xây `Khám phá (50)` thành dữ liệu thật, không badge đếm:** trang/section có filter theo thời điểm, nhu cầu, khu vực và 4 tier. Mỗi card có merchant/place, loại tier dễ nhận, freshness, source, CTA phù hợp. Mục tiêu daily mix vẫn: 5–10 deal xác minh, 10–15 chương trình/coupon chính thức, 15–20 địa điểm/tiện ích xác minh, 10–15 radar. Thiếu deal thật vẫn lấp bằng các tier còn lại minh bạch; không hạ chuẩn evidence để đủ số.
5. **Voucher wallet ba làn:** hiển thị coupon/code chỉ khi code, điều kiện, hiệu lực, nguồn và thời điểm kiểm đã có bằng chứng. Với nguồn chính thức chưa có code: CTA `Mở cổng chính thức`; với radar: `Theo dõi`. Không tạo/sao chép code, không deeplink/affiliate hoặc claim “giảm” chưa kiểm chứng.
6. **Art direction product-first:** giữ photo-first Đà Nẵng nhưng bỏ bố cục “một ảnh + mô tả” lặp lại toàn trang. Hành trình phải có nhịp shopping: city hero gọn, rail deal/voucher có visual source-permitted, collection theo moment, save/compare rõ, card featured có thông tin quyết định. Ưu tiên photography/brand creative có quyền; không dùng ảnh để khẳng định giá/deal nếu asset không phải evidence. Không đặt badge/fake social proof để tạo cảm giác đông vui.
7. **Council CV bắt buộc trước staging kế:** Product định nghĩa customer promise/IA; Design làm product visual system và first-fold prototype; UX/CX làm 5-second task test plan; Growth thiết kế retention theo moment không dark pattern; Data & Trust kiểm tier/evidence/asset ledger; Engineering thực hiện feed + responsive media + observability; QA kiểm browser fresh 1440/768/390, route, action, image decode/actual dimensions, accessibility và NO-SHIP assertions. CEO sẽ tự kiểm staging tiếp theo; chủ dự án giữ quyền chấp nhận thẩm mỹ cuối.

**Trạng thái CEO:** `CU CÓ ẢNH THẬT TẢI ĐƯỢC NHƯNG KHÔNG ĐẠT CLAIM 4K. CV CHUYỂN JAYT TỪ LOCAL EDITORIAL GUIDE SANG TRẢI NGHIỆM KHÁM PHÁ DEAL/VOUCHER CÓ TIER VÀ EVIDENCE; PRODUCTION VẪN KHÓA`.

---

## CW. Design Direction CEO — “Đà Nẵng để sống hay hơn hôm nay”, không phải gallery địa điểm

Đánh giá thiết kế độc lập đối với CU: visual photography, headline và attribution đã tạo một first impression địa phương thật hơn các vòng trước. Nhưng hierarchy hiện tại khiến khách hiểu đây là cẩm nang du lịch/địa điểm, không phải một nơi giúp họ tiết kiệm, lấy voucher hay quyết định mua. Bốn block lớn theo cùng mẫu “ảnh bên trái + chữ bên phải” tạo nhịp đều và dài, không có khoảnh khắc deal nào để khám phá. Đây là lỗi product visual direction, không thể sửa chỉ bằng thay palette hay thêm ảnh.

### Bản thiết kế bắt buộc cho staging kế tiếp

1. **Mệnh đề giá trị trong 2 giây:** sau ảnh Cầu Rồng thật và lời chào theo thời điểm, hiển thị rõ: `Đặc quyền thật cho hôm nay ở Đà Nẵng`. Ngay dưới là ba entry action cỡ chạm tốt: `Deal dùng hôm nay`, `Voucher chính thức`, `Kiểm tra trước khi mua`. Không banner slogan hoặc badge chen lên chúng.
2. **Hero là stage, không phải content block:** desktop tối đa khoảng 520px; mobile một viewport có đủ ảnh landmark, message và một CTA chính. Attribution mở nhẹ/hiển thị có kiểm soát, không phủ lên thông điệp. Một ảnh chủ đạo/crop theo viewport, không dark overlay dày, không lặp Cầu Rồng ở phần dưới.
3. **Sau hero là “Deal radar” có lý do để vào:** rail ngang 6–10 thẻ **từ data thật**, mỗi thẻ phân biệt màu/nhãn theo 4 tier, hiện merchant, lợi ích đã chứng minh hoặc trạng thái `đang theo dõi`, điều kiện quan trọng, freshness và CTA đúng tier. Không đủ evidence thì không được đặt giá/percent/coupon code.
4. **Ví voucher là một product moment riêng:** coupon card có hình thức vé nhưng dễ đọc, một hành động `Sao chép mã` chỉ khi code thật; nếu không là `Mở nguồn chính thức`/`Theo dõi`. Điều kiện, hạn và tier luôn cùng thẻ. Không dùng neon, ticket decoration hoặc countdown giả để kích thích.
5. **Điểm đến trở thành trợ lực quyết định:** chuyển các địa điểm/tiện ích có thật thành collection nhỏ, đan xen sau deal/voucher theo moment `Ăn trưa`, `Sau giờ học & làm`, `Tối nay`. Dùng ảnh địa phương real/licensed làm nhịp cảm xúc, không để chúng thay toàn bộ giá trị deal.
6. **Ngôn ngữ hình ảnh:** nền sáng ấm trung tính, blue-teal sông/biển là màu tin cậy, coral chỉ dành primary action; một kiểu bo góc, một shadow nhẹ, không gradient/outline/badge dày. Ảnh hero giàu chiều sâu; thẻ deal ưu tiên sản phẩm/brand creative có quyền hoặc typography nếu asset chưa pass. Không tổng hợp AI, không photo generic.
7. **Acceptance design gate:** Design nộp 1440/390 clickable/staging proof theo flow `vào → chọn nhu cầu → đọc điều kiện → mở nguồn/lưu`; UX/CX dùng test 5 giây xác nhận người dùng nói được JayT làm gì và CTA đầu tiên; QA kiểm contrast, focus, 44px touch target, crop/alt/loading. Council đủ 7 phòng ban review một lần thống nhất; CEO tự kiểm trực tiếp trước khi trình chủ dự án.

**Trạng thái CEO:** `CW LÀ DESIGN DIRECTION PRODUCT-FIRST: ẢNH ĐÀ NẴNG TẠO CẢM XÚC, DEAL/VOUCHER MINH BẠCH TẠO LÝ DO QUAY LẠI. CHƯA CÓ CHẤP NHẬN THẨM MỸ HOẶC GO-LIVE`.

---

## CX. Gate thiết kế trước khi trình lại chủ dự án — chỉ nhận storefront có thể dùng

Không nộp thêm board, palette hoặc screenshot tĩnh như một vòng “đẹp hơn”. Mỗi lần trình phải là staging chạy được, và phải qua đồng thời các kiểm định dưới đây:

| Khoảnh khắc khách | Điều phải thấy/làm được | Tiêu chí loại ngay |
| --- | --- | --- |
| 2 giây đầu | Biết JayT tìm deal, voucher và quyết định mua tại Đà Nẵng | Chỉ thấy slogan/cảnh thành phố/địa điểm |
| 5 giây đầu | Chọn được một trong ba ý định: deal, voucher, mua thông minh | Nhiều CTA ngang nhau hoặc menu là điểm nổi bật nhất |
| Card đầu tiên | Phân biệt deal xác minh, chương trình chính thức, địa điểm, radar | Gắn giá/giảm/code khi evidence thiếu; tier mơ hồ |
| Lấy ưu đãi | Đọc điều kiện/hạn/nguồn rồi mở đúng destination | Sao chép voucher giả, countdown giả, deeplink/affiliate không phép |
| Cuộn tiếp | Nhịp visual thay đổi có chủ ý: rail, voucher, collection, guide | Hàng loạt block ảnh-trái/chữ-phải hoặc card dày chữ giống nhau |
| Mobile | 44px touch, text đọc được, hero không che CTA/attribution, không crop lỗi | Desktop thu nhỏ, phải zoom/scroll mới hiểu sản phẩm |

**Lệnh thực thi:** Design tạo một product system duy nhất gồm hero, intent selector, tier badge, deal card, voucher card, place card, radar card, source/evidence drawer và save state; không sinh component mới ngoài hệ đó. UX/CX viết task script 5 giây và task completion; Engineering nộp staging responsive; QA dùng chính bảng trên để PASS/FAIL. Data & Trust có quyền veto bất kỳ card claim nào thiếu evidence. Council họp một review hợp nhất; CEO chỉ xem bản đã qua gate, không đánh giá report text.

**Trạng thái CEO:** `CX KHÓA VÒNG LẶP THAY ÁO GIAO DIỆN. CHỈ STORE-FRONT CÓ CUSTOMER JOB RÕ, DEAL/VOUCHER THẬT VÀ BROWSER EVIDENCE MỚI ĐƯỢC TRÌNH LẠI`.

---

## CY. Kết luận Hội đồng 7 phòng ban — brief storefront hợp nhất duy nhất

| Phòng ban | Kết luận và ràng buộc |
| --- | --- |
| Product | JayT không bán “cảnh đẹp”; lời hứa là giúp chọn điều hay, tiết kiệm và đi đúng nơi hôm nay. Mọi section phải phục vụ một job-to-be-done. |
| Design | Photo-first Đà Nẵng là cảm xúc thương hiệu; hệ component product-first là trải nghiệm. Một art direction, không gallery, không card dump, không AI giả cảnh. |
| UX/CX | First fold có một lựa chọn rõ; tier và condition xuất hiện trước CTA. Không bắt khách đọc dài để biết có dùng được hay không. |
| Growth | Quyền quay lại đến từ moment hằng ngày, saved items và nguồn mới; không dùng urgency giả, social proof giả hay dark pattern. |
| Data & Trust | `Khám phá (50)` chỉ hiển thị khi danh sách/filter đếm từ record thật; every claim có source/freshness/tier. Voucher không có evidence phải về official/radar. |
| Engineering | Một feed/source-of-truth cấp dữ liệu cho rail, cards, wallet và filter; image master/derivative map rõ; không fork UI/data hoặc hard-code claim. |
| QA | Không “pass theo ảnh chụp”. Kiểm fresh browser desktop/tablet/mobile, action/link, layout, actual image decode/dimension, keyboard/a11y, dark/light và NO-SHIP public claims. |

### Lệnh thực thi hợp nhất

Antigravity chỉ được dựng **một** staging upgrade tiếp theo theo CX/CY, theo thứ tự: `data/tier evidence → customer flow → component system → photo/asset gate → responsive QA → Council review → CEO browser review`. Không đưa các board song song, không reset giao diện hay thay content provenance. Nếu gap xuất hiện, xử lý trong nhánh work order kế tiếp cùng chuỗi này; không coi report là đích đến. Production, affiliate write action, secret/account action và quyết định rights/legal vẫn chờ authority riêng.

**Trạng thái CEO:** `CY LÀ BRIEF HỢP NHẤT HIỆN HÀNH. MỌI NÂNG CẤP WEB JAYT PHẢI TĂNG KHẢ NĂNG KHÁCH KHÁM PHÁ DEAL/VOUCHER THẬT VÀ TĂNG LOCAL DELIGHT, KHÔNG TẠO THÊM BỀ MẶT RỜI RẠC`.

---

## CZ. Design System JayT — một ngôn ngữ cao cấp, dễ dùng và không giả tạo

Antigravity lập và dùng một token/component system duy nhất, **nâng cấp trên nền hiện hữu**, không tạo theme/site thứ hai:

- **Màu:** `River Teal` cho trust/navigation; `Coral` chỉ cho primary CTA/lợi ích cần hành động; `Sun Sand` làm accent theo thời điểm; neutral ấm cho nền/đọc lâu. Không dùng cả ba màu mạnh trong cùng một card, không gradient để che thiếu hierarchy.
- **Chữ & khoảng thở:** một type scale cho eyebrow, title, body, meta; title mạnh nhưng không all-caps; body tối thiểu đọc tốt trên mobile; spacing 4/8pt scale, section có nhịp khác nhau thay vì mọi block cùng cao.
- **Component duy nhất:** `Intent chip`, `Tier badge`, `Deal card`, `Voucher card`, `Place card`, `Radar card`, `Evidence drawer`, `Source link`, `Save control`, `CTA`. Mỗi component phải có default/hover/focus/disabled/loading/error và mobile variant; không hard-code style khác nhau theo mỗi section.
- **Thông tin trước trang trí:** tier, lợi ích/condition, freshness và source gần CTA; visual chỉ giúp scan. Deal card không giống place card; voucher card không giống radar card; sự khác biệt phải nhìn ra trong một nhịp quét.
- **A11y:** focus visible, contrast AA, 44px target, trạng thái không chỉ phân biệt bằng màu, alt/caption có nguồn, keyboard xử lý Drawer/Save/Copy. `Copy` chỉ xuất hiện khi voucher thật.
- **Motion:** nhẹ, phục vụ định hướng/feedback; reduced-motion đầy đủ. Cấm autoplay, bounce/countdown tạo áp lực giả.

**Definition of done:** Design nộp token inventory và component matrix có trạng thái; Engineering nộp mapping token/semantic (không style rải); QA kiểm không regression desktop/mobile/dark-light/a11y. Component hay token chưa có chứng từ hệ thống thì chưa được dùng ở staging review.

**Trạng thái CEO:** `CZ KHÓA MỘT HỆ THIẾT KẾ CÓ BẢN SẮC ĐÀ NẴNG VÀ KỶ LUẬT PRODUCT. ĐẸP PHẢI ĐI CÙNG ĐỌC DỄ, TIN ĐƯỢC VÀ HÀNH ĐỘNG ĐƯỢC`.

---

## DA. Quyết định CEO sau browser review CZ — trải nghiệm đã đúng hướng, nhưng cách ly 6 deal claim sai

CEO đã kiểm trực tiếp `v3.433.0-staging.cz`. HTTP trả nội dung mới; hero có ba lối vào; ba hành động đều đưa đến bề mặt Explore/Wallet/Buy Decision thực, không chỉ là CTA tĩnh. Đây là tiến bộ UX có thể quan sát. Tuy nhiên console phát hai lỗi khai báo trùng `JAYT_STOREFRONT_VERSION`, và sáu thẻ trong Deal Radar đều gắn `DEAL XÁC MINH`/CTA `Nhận ưu đãi / Xem giá` nhưng browser DOM không có giá thực, tổng chi phí hay evidence cụ thể. Những record này là kênh/cổng thông tin, không đủ điều kiện Deal xác minh.

### Council DA và lệnh tổng lực

1. **Data & Trust (veto):** cách ly ngay sáu card CGV, Domino’s, Lotteria, Metiz, GitHub Education và Notion khỏi `TIER_1_DEAL` cho tới khi record có price, total payable, conditions, validity, evidence URL/time và reviewer. Re-tier đúng thành `Cổng chính thức` hoặc `Radar` theo record hiện có. Cập nhật count/filter từ dữ liệu thật; không giữ số 8 deal để làm đẹp.
2. **Product/UX-CX:** CTA của record không-Deal đổi theo tier: `Mở nguồn chính thức`, `Xem điều kiện`, hoặc `Theo dõi`; chỉ “Nhận ưu đãi/Xem giá” khi evidence decision-ready tồn tại. Trước link ngoài, source/condition/freshness phải scan được trong thẻ/drawer.
3. **Design:** giữ hero/3 intent vì hierarchy đã đúng hướng; thêm visual distinction rõ giữa Deal, Official, Place, Radar mà không tăng badge noise. Deal empty/fewer-state phải vẫn hấp dẫn: giới thiệu các quyền lợi/cổng chính thức hoặc radar, tuyệt đối không tô màu một link thành deal.
4. **Engineering:** loại bỏ khai báo JS trùng, nộp browser console sạch trên fresh load; giữ pre-render nhưng bảo đảm runtime enhancement không làm fail action/state. Không tạo bản fork hay reset system CZ.
5. **QA:** chạy lại fresh 1440/768/390 cho Explore/Wallet/Buy Decision, filter count, 3 CTA, external link destination, save state, keyboard/focus và console. Báo cáo pass chỉ kèm DOM/browser evidence; không tự release production.
6. **CEO gate:** staging DA chỉ được trình lại sau Council 7 phòng ban xác nhận tier/action/console; CEO sẽ kiểm trực tiếp. Production tiếp tục khóa; asset 4K/affiliate authority vẫn không liên quan và không được suy diễn là pass.

**Trạng thái CEO:** `CZ ĐẠT TIẾN BỘ FLOW, KHÔNG ĐẠT TRUST/CONSOLE GATE. DA CÁCH LY CLAIM DEAL SAI NHƯNG TIẾP TỤC PHÁT TRIỂN CÁC LUỒNG OFFICIAL/VOUCHER/PLACE/RADAR AN TOÀN`.

---

## DB. Modern Bento Commerce — chỉ thị thiết kế hợp nhất theo ảnh tham chiếu, không sao chép dữ liệu/claim

CEO đã phân tích bảy ảnh tham chiếu. Hướng được chọn là **Modern Bento Local Commerce**: cảm giác cao cấp, nhanh và sống động như một bảng điều khiển cho nhịp sống Đà Nẵng; không sao chép bố cục/asset của ảnh, không nhập các số giá, mã voucher, thương hiệu, address, review, affiliate disclosure, “đã đối soát” hay alert từ ảnh tham chiếu vào JayT.

### Kết luận Hội đồng DB

| Phòng ban | Đề xuất được thông qua |
| --- | --- |
| Product | Hero không là billboard: nó phải giúp chọn “hôm nay tiết kiệm gì” theo thời điểm, khu vực, ngân sách và nhu cầu. |
| Design | Dùng bento grid linh hoạt, cinematic photography có quyền, surface glass mờ tiết chế, depth/shadow nhẹ; mỗi cell có một job rõ, không biến web thành dashboard dày đặc. |
| UX/CX | Hiển thị context selector và moment chip; một primary action; progressive disclosure cho condition/source. Không bắt user học công cụ mới hay đọc bảng số phức tạp. |
| Growth | Saved plan và calendar chỉ khi có data thật; radar follow tạo lý do quay lại, không notification/urgency giả. |
| Data & Trust | Số tiền, comparison, badge “verified”, coupon code, countdown và claim affiliate chỉ render từ evidence contract; nếu thiếu là official/radar/empty state trung thực. |
| Engineering | CSS grid/container query, responsive image delivery, view-transition/motion nhẹ và performance budget; enhancement phải hoạt động khi JS lỗi hoặc bị tắt. |
| QA | Test visual/hành vi fresh 1440/768/390, keyboard/touch/reduced-motion/dark-light; verify tất cả micro-interaction không tạo claim hoặc leak state. |

### Work order DB duy nhất cho Antigravity

1. **Không reset hoặc fork storefront.** Nâng trên component system CZ + DA tier contract, release staging mới duy nhất `v3.435.0-staging.db` (không production).
2. **Bento hero sống động:** top bar slim gồm khu vực *chỉ khi có location context thật* và moment selector; hero grid gồm `moment/time` (không realtime giả), `deal of the moment` chỉ từ T1 evidence, và `plan/save` chỉ từ state người dùng. Khi T1 = 0, cell chính chuyển thành “Cổng ưu đãi chính thức”/“Radar gần đây”, không giả deal.
3. **Local discovery grid:** tối đa 3–6 cells ưu tiên theo moment, gồm location/utility, programme/voucher official, radar, buy decision. Cấu trúc thẻ phân biệt bằng thông tin và action, không chỉ đổi màu; địa điểm dùng ảnh Đà Nẵng rights-pass/attribution, còn merchant/product media chỉ khi quyền pass.
4. **Voucher wallet & smart-buy drawer:** render theo 3 lanes thực; state thiếu evidence phải nói `Chưa có mã có thể dùng ngay` và dẫn cổng chính thức/theo dõi. Comparison/tổng thực trả chỉ mở khi có các giá/phí/điều kiện/hạn của cùng thời điểm evidence; không mô phỏng bảng giá từ reference.
5. **Motion công nghệ cao nhưng có mục đích:** glass/parallax chỉ ở decorative layer; hover/focus reveal, smooth section change và save feedback tối đa 200ms; `prefers-reduced-motion` tắt toàn bộ motion không thiết yếu. Cấm canvas/WebGL, autoplay video, particle/bounce, blur/filter nặng, fetch blocker hoặc bất kỳ hiệu ứng nào làm tăng LCP/che nội dung.
6. **Visual system:** dark “after-hours” và warm daylight là hai mode cùng tokens CZ; coral/emerald chỉ semantic action/trust, không neon overload. Typography tập trung decision numbers khi evidence có; khi không có evidence, typography dẫn bằng nhu cầu/hành trình chứ không số giả.
7. **Gates trước CEO review:** Design nộp overlay mapping ảnh tham chiếu → component JayT (chỉ principle), Product/Trust ký tier map, UX 5-second task test plan, Engineering performance/a11y budgets, QA browser pack. CEO tự kiểm staging; chủ dự án vẫn là người duy nhất chấp nhận mức độ đẹp. Mọi production/affiliate write/secret/rights issue chờ authority.

**Trạng thái CEO:** `DB BẮT ĐẦU HƯỚNG MODERN BENTO COMMERCE: WOW NHỜ CẤU TRÚC, ẢNH THẬT, MOTION NHẸ VÀ QUYẾT ĐỊNH MUA MINH BẠCH; KHÔNG WOW BẰNG DATA/ƯU ĐÃI/ĐÁNH GIÁ GIẢ. PRODUCTION KHÓA`.

---

## DC. Không hồi sinh Bento candidate cũ — chỉ kế thừa nguyên tắc, không kế thừa claim/bề mặt

CEO đã kiểm một bento candidate lịch sử trong kho QA (`094B`). Nó có vài nguyên tắc hữu ích như hierarchy theo moment, grid linh hoạt và utility drawer, nhưng không phải source-of-truth hiện hành và có các bề mặt không còn phù hợp: dữ liệu địa điểm/ưu đãi lịch sử, form chia tiền/giá nhập, claim trạng thái và component chưa theo DA/CZ. Nó không được restore, copy-paste, merge hoặc dùng làm bằng chứng hoàn thành DB.

Antigravity chỉ được lấy **principle** đã nêu trong DB (bento hierarchy, context, progressive disclosure, motion restraint), xây trên SOT/CZ/DA hiện hành; mọi record/card/CTA/tier/evidence phải lấy lại từ data contract hiện hành. QA thêm static guard chống import/reference `093/094/094A/094B` vào staging DB. Nếu muốn tái dùng bất kỳ asset/component cũ nào, phải có migration note, owner, data-trust review và browser evidence trước.

**Trạng thái CEO:** `DC NGĂN CANDIDATE CŨ LÀM NHIỄM DB. MODERN BENTO ĐƯỢC XÂY NÂNG CẤP TRÊN SOT HIỆN HÀNH, KHÔNG KHÔI PHỤC MỘT UI LỊCH SỬ`.

---

## DD. Handoff triển khai Modern Bento — một storefront, một flow, đầy đủ trạng thái

### Mục tiêu màn hình

Storefront trả lời ba việc trong một nhịp: **có gì đáng dùng hôm nay, voucher/cổng nào phù hợp, và mua món này có hời không**. Ảnh Đà Nẵng tạo cảm xúc; dữ liệu phân tầng tạo quyết định. Không có T1 evidence thì UI vẫn hoàn chỉnh bằng official/radar/place, nhưng không hiển thị giá/mã/discount hoặc “deal of the moment”.

### Layout và component bắt buộc

| Khu vực | Component system CZ | Hành vi |
| --- | --- | --- |
| Header | `ContextBar` + `IntentNav` | Khu vực/moment chỉ là filter khi state thực có; nav Hôm nay, Khám phá, Ví, Có hời, Đã lưu. Không fake realtime count. |
| Hero bento | `MomentTile`, `PrimaryOpportunity`, `PlanTile` | 3 vùng: context/moment, T1 opportunity **hoặc** official fallback, save/plan. Một CTA primary duy nhất; source/condition mở drawer. |
| Discovery | `TierRail` + `OpportunityCard` | 3–6 thẻ theo moment, mỗi thẻ tier, merchant/place, benefit hoặc status, condition/freshness/source và CTA phù hợp. |
| Ví | `VoucherLane` | Dùng ngay/Cổng chính thức/Theo dõi. Copy button chỉ có code có evidence; empty state vẫn có cổng chính thức/follow. |
| Smart buy | `DecisionDrawer` | Nhập/so sánh chỉ local UI state; kết luận `Chưa đủ dữ liệu` mặc định, chỉ `Nên mua/Chờ` từ lịch sử quan sát thật. |
| Local layer | `PlaceSpotlight` | Ảnh rights-pass, attribution on-demand, moment map/route; không xác nhận price/deal bằng ảnh. |

### Token và responsive contract

| Token CZ | Dùng cho |
| --- | --- |
| `surface-day`, `surface-night`, `surface-glass` | nền ấm/dark after-hours và lớp kính; surface glass không được che text/contrast |
| `accent-coral`, `trust-teal`, `status-emerald`, `status-amber` | CTA primary, navigation/trust, tier status; không dùng làm trang trí ngẫu nhiên |
| `space-1…space-8`, `radius-card`, `elevation-1…3` | nhịp bento và chiều sâu đồng nhất |
| `type-display`, `type-title`, `type-body`, `type-meta` | headline/decision/đọc dài/freshness-source rõ ràng |

- `≥1280`: bento hero 12 cột, grid discovery 3 cột; không chứa quá 6 card trong first screen.
- `768–1279`: hero 8 cột, primary opportunity 2 hàng; discovery 2 cột.
- `<768`: one-column reading order: context → primary → action → rail; CTA tối thiểu 44px; hero không vượt một viewport; không horizontal overflow ngoại trừ rail có label/gesture rõ.

### Interaction, motion và trạng thái

| Thành phần | Default / interaction | Empty / loading / error |
| --- | --- | --- |
| Intent chip | selected state có text + icon; tap lọc/scroll có chủ đích | khi không data, show explanation + official/radar route, không blank |
| Opportunity card | hover/focus elevation nhỏ, reveal source/condition; tap mở drawer/nguồn | skeleton theo layout thực, error inline có retry không tạo record giả |
| Save/plan | optimistic **local** state, announce kết quả; không sync/PII mặc định | disabled có lý do, save failure không mất thẻ |
| Voucher | copy confirmation 2 giây chỉ cho code thật; source opens external official page | no verified code = `Chưa có mã dùng ngay`; không copy placeholder |
| Motion | transform/opacity only, 120–200ms, no layout-jank | full reduced-motion fallback; không autoplay/particle/heavy blur |

### Accessibility và performance non-negotiable

Focus order Header → Context → Hero CTA → cards → drawer. Drawer dùng dialog role, focus trap và Escape; saved state/filtered count dùng polite live region; mọi icon button có accessible name. Contrast AA, không truyền thông tin chỉ bằng màu. Hero image preload có giới hạn; below-fold lazy; responsive derivative bằng `srcset/sizes`; không canvas/WebGL/video autoplay; đo LCP, CLS, INP trên 390/768/1440 trước Council.

### Definition of done DB/DD

Design nộp prototype/staging có đủ desktop–tablet–mobile và light–dark–reduced-motion; Engineering nộp mapping component→SOT record/tier; Data & Trust nộp record matrix; QA nộp browser proof của mọi state trên. Không có bất kỳ item nào thì staging là **chưa sẵn sàng CEO review**. Không ship production cho tới khi CEO kiểm trực tiếp và chủ dự án chấp nhận thẩm mỹ.

**Trạng thái CEO:** `DD LÀ HANDOFF DUY NHẤT ĐỂ ANTIGRAVITY DỰNG DB. HIỆU ỨNG/TECH CHỈ ĐƯỢC GIỮ KHI LÀM TĂNG CẢM GIÁC CAO CẤP MÀ KHÔNG GIẢM TIN CẬY, HIỆU NĂNG HOẶC KHẢ NĂNG TIẾP CẬN`.

---

## DE. Lệnh khởi động thực thi duy nhất cho Antigravity — Modern Bento DB

**CEO xác nhận: không cần chờ thêm dữ liệu hay lựa chọn từ chủ dự án để bắt đầu.** Antigravity bắt đầu ngay trên staging, theo DB/DD/DC/DA; không viết lại từ đầu, không mở nhiều nhánh/bảng thiết kế, không dừng tại report.

### Phạm vi phải hoàn thành liên tục

1. Nâng SOT hiện hành `DA` thành **một** `v3.435.0-staging.db`: hero bento, discovery grid, voucher wallet, smart-buy drawer, local photo layer; dùng component/tokens CZ và data/tier contract DA.
2. Giữ truth fail-closed: T1 chỉ từ evidence đầy đủ; hết T1 phải render official/radar attractive state. Không tạo/copy coupon, giá, %, total cost, review, countdown, realtime, location, affiliate/deeplink hoặc image claim từ ảnh tham chiếu.
3. Hoàn thiện states: desktop/tablet/mobile, light/dark/reduced-motion, loading/empty/error/long text, focus/keyboard/dialog/aria, save local-only. Effects chỉ transform/opacity có ngân sách performance; không heavy blur/WebGL/video/particle/autoplay.
4. Làm asset pipeline rights-pass + responsive delivery; không restore candidate 093/094 và không dùng asset cũ nếu thiếu migration note/Data & Trust pass.
5. Gỡ tất cả console error; không duplicate script/declaration; giữ prerender accessible khi runtime enhancement lỗi.
6. Chạy Council pack một lần thống nhất: Product, Design, UX/CX, Growth, Data & Trust, Engineering, QA. Nộp: SOT diff, component/tier matrix, browser fresh evidence 1440/768/390, visual light/dark/reduced-motion, console, interaction flow, a11y/performance, asset evidence. Report không là evidence và không phải điểm dừng.
7. **CEO gate bắt buộc:** chỉ sau các bước trên mới trình URL local staging. CEO tự kiểm browser trước; production release, affiliate/account/secret action, asset-rights/legal decision vẫn chờ authority riêng.

### Lệnh vận hành

Sau mỗi gap phát hiện, Antigravity tự tạo work order kế tiếp trong cùng chuỗi DB, thực hiện ngay mọi việc an toàn nêu trên. Chỉ dừng để chờ authority đối với production release, affiliate write/account/secret, hoặc legal/rights chưa rõ. Không được chờ chủ dự án nhắc lại.

**Trạng thái CEO:** `DE ĐÃ KHỞI ĐỘNG THỰC THI STAGING MODERN BENTO. ĐẦU RA DUY NHẤT ĐƯỢC CHẤP NHẬN LÀ BUILD CHẠY ĐƯỢC + BROWSER EVIDENCE, KHÔNG PHẢI BÁO CÁO`.

---

## DF. Council checkpoint độc lập DB — sửa khoảng trống Deal trước, rồi hoàn thiện trải nghiệm

### Kết quả CEO tự kiểm ngày 29-08-2026

CEO đã mở trực tiếp `http://127.0.0.1:4173/` tại `v3.435.0-staging.db`, không dùng báo cáo Antigravity làm bằng chứng. Kết quả: ba lối vào **Deal dùng hôm nay / Voucher chính thức / Kiểm tra trước khi mua** đều render đúng bề mặt; desktop không tràn ngang; console không có error/warn tại lượt kiểm này. Tuy nhiên, lối vào Deal đưa tới empty state “đang đối soát dữ liệu deal giá thực”: source hiện có **0 record `TIER_1_DEAL`**. Đây là trạng thái an toàn đúng, nhưng chưa đáp ứng trải nghiệm “hôm nay vào là có deal ngon”. Asset ảnh thực tải được, song kích thước thực đo được là 1280px; không được mô tả là ảnh 4K.

### Ý kiến Hội đồng 7 phòng ban

| Phòng ban | Kết luận / chỉ thị |
| --- | --- |
| Product | Chuyển mục tiêu từ “50 thẻ” sang nhật ký supply hằng ngày có outcome; homepage phải cho người dùng biết ngay đâu là deal có thể dùng, đâu là cổng chính thức và đâu là radar. |
| Design | Bento DB là tiến bộ về hierarchy, nhưng không được coi là bản cuối. Giảm cạnh tranh giữa ba CTA hero thành một CTA theo trạng thái (Deal khi có T1, Official fallback khi T1=0); giữ ảnh địa phương thật, không phóng đại độ phân giải. |
| UX/CX | Empty Deal không được là ngõ cụt: hiện rõ lý do, thời điểm kiểm gần nhất, CTA sang official phù hợp và theo dõi nhu cầu; test task từ hero tới nguồn/copy mã hợp lệ trên desktop, tablet, mobile. |
| Growth | Tăng supply bằng cohort nguồn/campaign phù hợp và lịch nội dung theo moment; không biến số lượng 50 thành 50 deal giả. Đo click nguồn, save local, return intent theo tier. |
| Data & Trust | T1 giữ fail-closed tuyệt đối. Mỗi candidate phải đi qua evidence matrix giá thực, tổng trả, điều kiện, hạn, URL/ảnh quyền dùng và thời điểm kiểm. Không đủ thì T2/T3/T4; không “nới duyệt” bằng cách đổi nhãn. |
| Engineering | Làm supply pipeline/idempotent ledger, freshness job và media derivative `srcset`; tiếp tục QA 390/768/1440, light/dark/reduced-motion, không phát sinh console error. |
| QA | Không nghiệm thu theo self-report. Nộp record-level browser evidence cho T1 đầu tiên, test trạng thái T1=0 và T1>0, voucher code copy, source outbound, keyboard/focus, mobile overflow và screenshot không che attribution. |

### Lệnh tổng lực kế tiếp cho Antigravity

1. **Không thay bề mặt DB bằng một thiết kế mới.** Nâng đúng SOT `v3.435.0-staging.db` thành phiên bản kế tiếp, có migration note/diff và giữ 1 storefront/1 data contract/1 design-system.
2. **Đóng khoảng trống supply trước:** quét read-only cohort lớn theo nhu cầu sinh viên–văn phòng (rạp/F&B chuỗi, di chuyển, học tập, KTX, tiện ích địa phương, trải nghiệm cuối tuần và catalog affiliate chỉ khi portal đã được cấp quyền read-only). Đưa candidate vào ledger; không public như deal cho tới khi qua evidence matrix. Khi chưa có T1, homepage phải cho thấy T2/T3/T4 hữu ích và CTA official, không hứa có deal ngay.
3. **Tạo T1 thật theo từng record, không hạ chuẩn:** mỗi record cần giá hiện tại, tổng thực trả, điều kiện, hạn, URL nguồn, capture/timestamp, quyền ảnh/logo, reviewer và freshness. Chỉ khi đủ tất cả mới render giá/mã/CTA “nhận ưu đãi”. Nếu chưa có record đủ chuẩn, duy trì T1=0 và ghi rõ trạng thái — cấm bịa để đạt 50.
4. **Làm hero có một quyết định chính theo data state:** T1>0 thì primary là deal cụ thể có evidence; T1=0 thì primary là “Xem ưu đãi/cổng chính thức đang kiểm” và giải thích ngắn. Voucher chỉ có nút copy khi mã thật còn hiệu lực; Smart Buy mặc định “Chưa đủ dữ liệu”.
5. **Nâng chất lượng hình ảnh đúng sự thật:** dùng ảnh Đà Nẵng rights-pass, thiết lập master gốc/responsive derivatives/attribution; nếu master chưa đạt 4K thì ghi đúng kích thước, không upscale/AI/claim 4K. Không dùng ảnh tham chiếu làm asset, không dùng logo merchant ngoài quyền cho phép.
6. **Hoàn thiện UI theo DB/DD:** giữ bento gọn, typography dễ đọc, action rõ, card không trở thành bảng chữ. Kiểm desktop 1440, tablet 768, mobile 390; light/dark/reduced motion; keyboard, focus, dialog, contrast, touch target 44px và hiệu năng.
7. **Nộp đúng evidence để Council và CEO tự kiểm:** SOT diff, supply ledger có tier/evidence status, asset manifest, fresh browser screenshots/video 1440/768/390, interaction transcript, console output, a11y/performance results. Báo cáo không thay evidence. Không production release, không affiliate write/account/secret, không quyết định asset-rights khi chưa có authority.

Sau mỗi gap, Antigravity tự lập và thực hiện work order kế tiếp trong cùng chuỗi DF; chỉ dừng vì production release, affiliate/account/secret, hoặc pháp lý/quyền asset. Chủ dự án là người quyết định web có đủ đẹp; CEO chỉ mở gate khi evidence độc lập đủ.

**Trạng thái CEO:** `DF ĐANG THỰC THI. DB CÓ TIẾN BỘ VỀ BỀ MẶT VÀ LUỒNG, NHƯNG CHƯA ĐẠT GO-LIVE VÌ T1=0 VÀ CHƯA CÓ BẰNG CHỨNG RESPONSIVE/A11Y/PERFORMANCE ĐẦY ĐỦ.`

---

## DG. Lệnh cô lập provenance DB — giữ phát triển UI, chặn claim chưa chứng minh

### Phát hiện CEO trực tiếp từ SOT DB

Đây là phát hiện từ source `jayt_storefront_staging_db.js`, không phải report Antigravity. Nhiều record hiển thị T2 nhưng đồng thời còn raw fields `tier: VERIFIED_DEAL`, `tier_name: Nguồn Cung Đã Đối Soát`, `verbatim_quote`, `timing_window`, `conditions_limit`, `observed_at: 2026-08-29 08:00` và URL gốc không kèm capture/evidence ID riêng từng record. Ví dụ có claim giờ/ngày tại CGV, Domino's, Lotteria, Metiz và các programme khác. Không được suy diễn rằng URL tổng quát chứng minh toàn bộ quote, giá trị, điều kiện, lịch áp dụng hoặc freshness. Đồng thời record `PLACE_BAO_TANG_DA_NANG` đang dùng `danang_real_photo_cham_museum.jpg` cùng attribution Bảo tàng Chăm: sai mapping asset/provenance, phải cô lập.

### Lệnh hành động không được trì hoãn

1. **Cô lập ngay trên staging:** loại/tắt mọi raw label `VERIFIED_DEAL`/“đối soát” và mọi quote, giờ, điều kiện, vị trí, giá trị hay timestamp nếu không có evidence ID + capture + URL cụ thể + ngày giờ kiểm + owner. Không để raw field rò vào UI, metadata, search, share card hay analytics.
2. **Không làm rỗng trải nghiệm:** record đã có official landing page nhưng thiếu evidence granular phải là `TIER_2_PROGRAMME` với copy trung tính “Mở cổng chính thức để kiểm tra điều kiện hiện hành”; local place thiếu evidence granular là `TIER_3` hoặc `TIER_4` phù hợp. Không dùng “verified” làm tên nội bộ để rồi có thể hiển thị sai.
3. **Asset quarantine:** bỏ mapping ảnh/attribution sai; card không có asset rights-pass dùng surface không ảnh có label rõ, không tái sử dụng ảnh của một địa điểm cho địa điểm khác. Bổ sung `asset_id`, license/source, subject/place match, crop derivative và reviewer trong manifest.
4. **Evidence matrix bắt buộc:** tách `source_url`, `capture_url`, `captured_at`, `evidence_id`, `claim_scope`, `reviewer`, `freshness_until`, `asset_evidence_id`; field không đủ dữ liệu phải `null`/không render. Không có giá/tổng trả/hạn/coupon thật thì không T1, không badge deal, không CTA nhận ưu đãi/copy code.
5. **Kiểm tra hồi quy:** static guard cấm `tier: VERIFIED_DEAL` cho record không có matrix đủ; cấm `verbatim_quote` không có quote locator; cấm asset subject mismatch. QA browser kiểm storefront/explore/wallet/smart-buy/share metadata ở 1440/768/390 để bảo đảm claim đã cô lập mà flow bento vẫn hoạt động.
6. **Luồng phát triển song song:** Design/Engineering tiếp tục hoàn thiện Modern Bento, responsive/a11y/motion và supply candidate; Growth/Data & Trust tiếp tục capture read-only và ledger. Containment không được thay roadmap.

Council phải nộp danh sách record bị cô lập, diff SOT, matrix evidence, manifest asset và browser proof. Không release production cho tới khi CEO kiểm trực tiếp. Các hành động affiliate write/account/secret và asset-rights chưa rõ vẫn dừng chờ authority.

**Trạng thái CEO:** `DG CÔ LẬP CLAIM/ASSET SAI PROVENANCE TRONG DB. STAGING CHƯA ĐẠT TRUST GATE; UI VÀ SUPPLY AN TOÀN VẪN PHẢI TIẾP TỤC.`

---

## DH. Quyết định CEO sau kiểm trực tiếp DF — không chấp nhận 7 T1 tự khai

### Evidence CEO kiểm, không dựa vào Council/QA report

CEO đã mở trực tiếp local staging `v3.436.0-staging.df`. UI thật sự đang hiển thị 7 card “DEAL XÁC MINH”, gồm giá, giá gốc, % giảm, total payable, điều kiện và CTA “Nhận ưu đãi”. Console desktop tại lượt kiểm không có error/warn, ảnh tải được. Nhưng inspection source cho thấy cả 7 record chỉ chứa `evidence_url`, `evidence_time` và chuỗi `reviewer`; **không có** `evidence_id`, capture path/URL, hash, locator, claim scope, owner độc lập hay `freshness_until`. Vì vậy các dữ liệu giá/hạn/điều kiện/% vẫn là claim chưa được chứng minh cấp record, không thể phát hành với tier T1. Đồng thời mapping `PLACE_BAO_TANG_DA_NANG` → `danang_real_photo_cham_museum.jpg` và attribution Bảo tàng Chăm vẫn còn, trái lệnh DG.

Report “7 T1”, “16/16”, “Council approved” và hash screenshot chỉ chứng minh một bề mặt đã render, **không chứng minh tính đúng của claim thương mại**. CEO từ chối Trust Gate DF; đây không phải nghiệm thu hay production authorization.

### Lệnh xử lý ngay cho Antigravity

1. **Fail closed tại runtime:** hạ cả 7 record DF từ T1 xuống T2/3 theo loại nguồn, hoặc ẩn toàn bộ price/original/percent/total/validity/“đã đối soát”/“nhận ưu đãi” cho tới khi contract đầy đủ. Hero/count/rail/explore/wallet/smart-buy/share metadata phải cùng data state — không thể T1 ở rail nhưng T2 ở drawer.
2. **Không nhận reviewer text là evidence:** bổ sung record-level immutable evidence contract gồm tối thiểu `evidence_id`, canonical capture URL/path, SHA-256 capture, exact source locator/quote, capture timestamp timezone, field-to-evidence mapping, reviewer identity/decision, expiry/freshness, source status và `evidence_status` machine-readable. Thiếu trường nào = field không render/T1 không hợp lệ.
3. **Khôi phục an toàn supply:** Candidate price/voucher từ DanaBus, CGV, Metiz, Bảo tàng, GitHub, Notion chỉ ở private candidate/evidence queue cho đến khi đủ contract. T2 official/T3 utility/T4 radar vẫn được hiển thị hữu ích và đẹp, nhưng copy trung tính; không chặn toàn bộ trải nghiệm.
4. **Cô lập asset mismatch trước mọi visual polish:** bỏ asset/attribution Bảo tàng Chăm khỏi Bảo tàng Đà Nẵng; xóa editorial text không đúng subject. Chỉ render local photo khi `asset_subject_id` khớp item và manifest có license/source/author/dimensions/derivative/reviewer; còn lại dùng no-image surface.
5. **QA lại từ đầu trên exact build mới:** static contract validator phải fail khi T1 thiếu field; browser verification 1440/768/390 phải đọc visible copy và meta; console + keyboard/focus + source action + all data states; evidence pack ghi rõ test run không phải approval. Nộp CEO raw contract records, file hashes và browser URL — không chỉ bản báo cáo diễn giải.
6. **Vẫn tiếp tục Modern Bento:** Design/UX/Engineering hoàn thiện hierarchy, data-state CTA, responsive, a11y, reduced-motion và performance trên cùng SOT. Growth/Data & Trust tiếp tục capture read-only cohort; không được dừng dự án vì quarantine.

Chỉ sau khi CEO tự mở captures và xác nhận mỗi T1 mới được nạp lại một cách có chọn lọc. Production, affiliate write/account/secret và asset/legal authority tiếp tục khóa.

**Trạng thái CEO:** `DH: DF UI ĐƯỢC GHI NHẬN LÀ TIẾN BỘ, NHƯNG 7 T1 BỊ TỪ CHỐI TẠI TRUST GATE. HỆ THỐNG QUAY VỀ FAIL-CLOSED, VẪN TIẾP TỤC UI/SUPPLY.`

---

## DI. Council checkpoint DH — sửa source đạt fail-closed, staging chưa có bằng chứng live

### Kết quả kiểm độc lập source-of-truth

CEO kiểm trực tiếp `jayt_storefront_staging_dh.js`: có đúng 50 record phân tầng `0 T1 / 20 T2 / 18 T3 / 12 T4`; không còn trường public giá/giá gốc/tổng trả/%/hạn dùng của DF, và `PLACE_BAO_TANG_DA_NANG` không còn sử dụng asset Bảo tàng Chăm. Đây là **tiến bộ source fail-closed** theo DH, không phải chứng nhận live.

CEO thử mở `http://127.0.0.1:4173/` sau build DH nhưng nhận `ERR_CONNECTION_REFUSED`. Không có server runtime thì không thể xác minh version/route/render/console, responsive 1440/768/390, keyboard, focus, modal, reduced-motion hay ảnh thực tế. Receipt và screenshot tự tạo không thay thế CEO browser review.

### Kết luận 7 phòng ban và lệnh tiếp theo duy nhất

| Phòng ban | Lệnh tiếp tục |
| --- | --- |
| Product | Giữ fail-closed T1=0; hero/discovery phải dẫn người dùng đến official/utility/radar hữu ích, không hứa deal đang có. |
| Design | Giữ Modern Bento, không quay lại UI cũ; no-image surfaces phải vẫn premium, sạch và không tạo cảm giác nội dung rỗng. |
| UX/CX | Render và test state T1=0 rõ ràng, CTA official, empty/loading/error, mobile first-fold và navigation một tay. |
| Growth | Tiếp tục pipeline candidate/cohort theo ledger, không công bố data candidate như supply thật. |
| Data & Trust | Capture read-only để xây contract record-level; chỉ nạp lại từng T1 khi DH contract đầy đủ và CEO kiểm. |
| Engineering | Khởi chạy lại staging từ **một** SOT DH, chứng minh HTTP 200/version DH và không làm fork/sync chồng source. |
| QA | Bỏ nhãn approved khỏi report; chạy fresh browser pack exact build và nộp command/result/raw DOM, không chỉ screenshot/hash. |

Antigravity phải khôi phục local staging chạy được rồi nộp URL/version/HTTP response và evidence browser mới. Sau đó CEO sẽ tự mở và kiểm những state nêu trên. Production, affiliate write/account/secret và asset/legal chưa rõ tiếp tục khóa. Không có thêm thay đổi data claim cho tới khi evidence matrix thật tồn tại.

**Trạng thái CEO:** `DI: DH ĐẠT STATIC FAIL-CLOSED, NHƯNG CHƯA QUA LIVE GATE DO STAGING OFFLINE. MODERN BENTO VÀ SUPPLY CANDIDATE TIẾP TỤC.`

---

## DJ. CEO live review DH — giữ Bento, cô lập “Dùng ngay”, nâng nhịp trải nghiệm premium

### Điều CEO đã kiểm trực tiếp trên staging `v3.437.0-staging.dh`

Runtime đã mở được. Version DH, T1=0, hero fallback sang “Xem ưu đãi & cổng đang kiểm”, không có price/deal T1 visible, desktop không tràn ngang và không có console error/warn ở lượt kiểm. Ba lối vào Explore/Voucher/Smart Buy render. Đây là tiến bộ thực: source fail-closed đã hiện diện ở runtime.

Tuy nhiên, Wallet vẫn public `DÙNG NGAY (ĐÃ XÁC THỰC)`/`BẰNG CHỨNG HỢP LỆ` cho GitHub, Notion, Canva và DanaBus trong khi record chỉ có official URL/copy mô tả, không có evidence contract/mã dùng/điều kiện-hạn capture cấp record. Nhãn này phải được cô lập. Kiểm viewport công cụ CEO chưa tạo viewport thật 1440/768/390 (runtime vẫn trả client width 1265), nên responsive trong report Antigravity **chưa được CEO xác nhận độc lập**.

### Nhận định Design/UX từ bề mặt live

- Bento hero, ảnh Cầu Rồng có attribution và module moment tạo first impression tốt hơn các candidate trước; thẻ no-image giữ bố cục sạch.
- Nhưng hero đang có ba CTA tương đương màu/kích thước; người mới không thấy một quyết định ưu tiên rõ. Khi T1=0, CTA chính official là đúng nhưng hai CTA còn lại phải hạ hierarchy thành secondary/tertiary.
- Rail card vẫn giàu chữ/meta, làm cảm giác nghiêng về directory hơn “curated commerce experience”. Cần progressive disclosure: headline, lý do phù hợp, one action; source/freshness/details vào drawer/bottom-sheet.
- Ảnh hiện có cảm giác bản địa, song tất cả phải tiếp tục use asset manifest rights-pass; 1280px là đúng nhưng không được gọi 4K/hero master.

### Lệnh tổng hợp cho Antigravity

1. **Wallet fail-closed:** chuyển toàn bộ 4 entry `LANE_DUNG_NGAY` sang `LANE_CONG_CHINH_THUC` (hoặc state `Đang kiểm điều kiện`) ngay khi không có evidence contract/mã/hạn thật. Cấm cụm “Dùng ngay”, “đã xác thực”, “bằng chứng hợp lệ”, “đăng ký đặc quyền” cho đến khi điều kiện DJ/DH đầy đủ. Không có mã có thể copy; CTA chỉ “Mở cổng chính thức để kiểm tra điều kiện”.
2. **Hero decision hierarchy:** state T1=0 = một CTA primary official; Voucher là secondary outline; Smart Buy là text/tertiary. Khi có T1 hợp lệ, CTA primary là record T1 duy nhất có evidence; không biến màu/animation thành noise.
3. **Card progressive disclosure:** giới hạn first-card summary/title/location+source/action; chuyển transit hint, audience, điều kiện dài, freshness và provenance vào detail drawer accessible. Giữ giá trị local curation nhưng giảm visual density.
4. **Responsive evidence thật:** dùng browser/device renderer có viewport thực, nộp DOM dimensions/screenshot được sinh tại 1440, 768, 390; test tap targets nav/header và CTA primary ≥44px; CEO sẽ kiểm lại bằng surface độc lập khi capability khả dụng. Không dùng ảnh resize hoặc report để thay thế viewport evidence.
5. **Accessibility/performance:** contrast của body/meta, focus visible, tab order, Escape/focus trap drawer, alt/attribution, reduced-motion; đo LCP/CLS/INP có raw output. Không thêm heavy blur/canvas/video/particle để cố “wow”.
6. **Supply/Evidence:** tiếp tục candidate capture read-only và contract DH. Bất kỳ T1/voucher ready nào chỉ được bật từng record sau CEO browser review; không batch-approve theo 7/13 entries.

Hội đồng Product, Design, UX/CX, Growth, Data & Trust, Engineering, QA phải nộp một pack DJ duy nhất: SOT diff, wallet matrix, UI state screenshots thực, responsive raw dimensions, a11y/performance, asset manifest và evidence record-level. Không release production, affiliate write/account/secret, hoặc asset/legal decision.

**Trạng thái CEO:** `DJ: DH ĐÃ QUA LIVE SMOKE CƠ BẢN NHƯNG CHƯA QUA WALLET TRUST, RESPONSIVE/A11Y/PERFORMANCE GATE VÀ OWNER AESTHETIC ACCEPTANCE. TIẾP TỤC NÂNG CẤP, KHÔNG GO-LIVE.`

---

## DK. CEO accessibility & provenance review DJ — giữ Drawer tốt, sửa target và wording còn lại

### Bằng chứng CEO kiểm trực tiếp `v3.438.0-staging.dj`

DJ đã sửa đúng Wallet core: source không còn `LANE_DUNG_NGAY`, `BẰNG CHỨNG HỢP LỆ` hay T1; runtime hiển thị 10 Cổng chính thức/3 Radar, hero primary 48px, secondary 46px, tertiary 44px. Explore → card detail mở dialog thật (`role=dialog`, `aria-modal=true`), focus sang close button, Escape đóng và trả focus về trigger. Có header/nav/main/footer landmarks, alt text ảnh không rỗng và console không có error/warn ở lượt kiểm.

Nhưng audit trực tiếp thấy nhiều control còn 26px/36px/38px: header nav, theme, report source, intent chip, save, “Chi tiết”, “Xem toàn bộ”. Đây chưa đạt touch-target 44px nếu xuất hiện/tappable ở mobile. Đồng thời Wallet vẫn ghi “✓ Nguồn đối soát … • Cập nhật định kỳ” cho entry chỉ có official URL; wording này vượt quá evidence contract. Không có CEO xác nhận responsive thật ở 1440/768/390 từ browser surface hiện tại, nên screenshot/report không đủ cho gate.

### Lệnh DK duy nhất

1. **Touch target AA:** mọi control interactive đang visible/tappable ở breakpoint tương ứng đạt vùng chạm **ít nhất 44×44 CSS px** — header nav/icon/report, intent chip, save, details, view-all, filter và drawer close. Có thể giữ visual 26–38px nhưng phải mở hit area semantic/padding mà không chồng control/kéo layout; không đếm mobile nav `display:none` desktop.
2. **Provenance copy fail-closed:** với T2/T3/T4 thiếu evidence contract, thay “Nguồn đối soát”, checkmark và “Cập nhật định kỳ” bằng “Nguồn chính thức: domain” hoặc “Kênh theo dõi: domain”. Chỉ dùng “đã đối soát/cập nhật lúc…” khi field-to-evidence contract DH tồn tại và freshness còn hạn.
3. **Drawer:** giữ behavior đang đúng; bổ sung/kiểm dialog name, focus trap tuần hoàn Tab/Shift+Tab, backdrop/close 44px, lock scroll, `aria-live` cho save/filter state; link source external có accessible name mô tả đích đến.
4. **Responsive evidence:** chạy renderer có viewport thực rồi nộp DOM metrics/generation metadata cho 1440×900, 768×1024, 390×844; test zoom 200%, overflow, all touch targets, tab order và drawer. Report/screenshot không thay browser behavior proof.
5. **Visual refinement không làm nghèo content:** sau khi sửa accessibility, tiếp tục progressive disclosure và hierarchy DJ; giữ local photography rights-pass, surface bento premium, motion restraint. Không thêm fake social proof, price/voucher/review hoặc asset không rõ quyền để làm web “wow”.

Hội đồng nộp một DK evidence pack gồm SOT diff, touch-target map computed runtime, provenance copy matrix, keyboard transcript và browser proof. CEO tự kiểm lần nữa; production/affiliate write/account/secret/asset legal tiếp tục khóa.

**Trạng thái CEO:** `DK: DJ ĐÃ CẢI THIỆN RÕ UI VÀ WALLET FAIL-CLOSED, NHƯNG CHƯA QUA ACCESSIBILITY TOUCH/RESPONSIVE GATE VÀ CHƯA CÓ OWNER AESTHETIC ACCEPTANCE.`

---

## DL. CEO recheck DK — không chấp nhận 100% touch target khi còn link/control nhỏ

### Kết quả CEO kiểm trực tiếp `v3.439.0-staging.dk`

DK đã sửa phần lớn vấn đề: runtime đúng version, không còn legacy provenance copy/T1/ready lane; hero, button, chip, save và detail phần lớn đã 44px; drawer mở đúng `role=dialog`, `aria-modal=true`, body scroll lock, Escape đóng và trả focus trigger. Console không có error/warn ở lượt kiểm.

Tuy vậy kiểm computed runtime vẫn phát hiện hai interactive surface visible không đạt mục tiêu DK 44px: link city-note `danang.gov.vn →` cao 21px, và `brand-lockup` có `role=button`/tabindex=0 cao 43px. Chúng không được loại khỏi target map chỉ vì không phải `button`. Browser surface CEO chưa tạo viewport thật 1440/768/390 (client width vẫn 1265 sau override), nên vẫn không thể tự xác nhận responsive device behavior chỉ từ report.

### Lệnh DL

1. Nâng mọi `a`, `button`, `[role=button]`, icon, chip và link inline có thể nhận focus/click lên hit area ≥44×44 tại breakpoint visible; riêng city-note URL có thể biến thành button/link block 44px có label rõ, brand-lockup ≥44px. Không được phủ hit area chồng link/card khác.
2. Static/DOM touch validator phải lấy toàn bộ focusable visible (`a[href], button, input, select, textarea, [role=button], [tabindex]:not([-1])`), loại hidden thật, ghi selector/text/rect; fail nếu còn 1 item dưới 44px. Không chỉ đo danh sách tự chọn 45 control.
3. Nộp keyboard transcript thực cho drawer: Tab và Shift+Tab phải đi hết các link/action/close trong dialog, không mắc kẹt close button; Escape/backdrop/close trả focus trigger, scroll unlock. CEO browser test hiện xác nhận open/Escape/restore, còn full tab-cycle chưa được pass bởi report.
4. Nộp browser/device evidence từ runner viewport thật có raw `innerWidth/clientWidth/scrollWidth`, user agent/device scale và thao tác navigation/drawer cho 1440/768/390. CEO sẽ recheck trên capability thích hợp; screenshot không thay functional proof.
5. Sau fix trên, tiếp tục visual polish DJ không làm đổi truth contract: clarity một CTA, card progressive disclosure, asset rights-pass. Chủ dự án vẫn là người duy nhất chấp nhận thẩm mỹ; production/affiliate/secret/legal asset tiếp tục khóa.

**Trạng thái CEO:** `DL: DK CÓ TIẾN BỘ THẬT NHƯNG CHƯA QUA AA GATE VÌ CÒN FOCUSABLE TARGET NHỎ VÀ CHƯA CÓ RESPONSIVE/KBD EVIDENCE ĐỘC LẬP ĐỦ.`

---

## DM. Hội đồng CEO — chuyển từ “danh mục nguồn” thành trải nghiệm khám phá ưu đãi có sức hút

### Kết quả CEO kiểm trực tiếp staging `v3.440.0-staging.dl`

CEO xác nhận trực tiếp trên desktop: version DL đang render; không còn legacy provenance/T1/ready-lane; toàn bộ focusable visible do validator quét không có target dưới 44px; không tràn ngang; console không có error/warn. Drawer mở là `role=dialog` + `aria-modal=true`, khóa scroll, Escape đóng và trả focus về trigger. Đây là **tiến bộ kỹ thuật desktop**, không phải nghiệm thu responsive, thẩm mỹ hay Go-Live.

Đánh giá thiết kế trực tiếp lại cho thấy khoảng trống quan trọng hơn: hero có bản sắc Cầu Rồng nhưng caption ghi rõ asset chỉ `1200×800px`; do đó không được gọi là 4K master. Bề mặt cũng đang thiên về một directory sạch với lưới “Cổng chính thức”: người mới thấy nhiều nguồn, nhưng chưa thấy nhịp săn ưu đãi/voucher, lợi ích theo lúc trong ngày hay một lý do đủ mạnh để quay lại. Đây là nguyên nhân trải nghiệm chưa đạt tiêu chuẩn thẩm mỹ và thương mại mà chủ dự án yêu cầu — không được giải quyết bằng số deal, voucher, review, logo hoặc ảnh giả.

### Ý kiến Hội đồng 7 phòng ban và quyết định CEO hợp nhất

| Phòng ban | Đề xuất đã được CEO chọn |
| --- | --- |
| Product | Giữ một storefront nhưng chuyển câu hỏi đầu tiên thành “Hôm nay có gì đáng dùng cho tôi?”; chọn theo khoảnh khắc, nhu cầu, khu vực và ngân sách, rồi mới tới danh mục nguồn. |
| Design | Dùng một art direction Đà Nẵng nhất quán: ảnh địa phương rights-pass, typography biên tập, màu nước biển–đêm–cát có tiết chế; bỏ cảm giác “mỗi card là một bảng thông tin”. |
| UX/CX | Lộ trình 10 giây: chọn moment → thấy các khả năng đúng tier → mở chi tiết/cổng chính thức. Một CTA chính theo state, không dẫn người mới vào 50 card đồng hạng. |
| Growth | Tạo daily editorial rhythm và supply queue theo nhu cầu thực; đo ý định khám phá/lưu/mở nguồn theo tier, không đo bằng lượt bấm outbound hay lời hứa giảm giá. |
| Data & Trust | T1 vẫn bằng 0 cho tới khi có evidence contract DH. Voucher không có mã/điều kiện/hạn thật chỉ là “chương trình cần kiểm tại cổng chính thức”, không phải ví dùng ngay. |
| Engineering | Nâng **trên SOT DL duy nhất**, component hóa các state/asset manifest, responsive media derivative và event instrumentation không PII; không tạo storefront hay data contract thứ hai. |
| QA | Kiểm visual regression, asset dimensions/rights, 1440/768/390 thật, keyboard, reduced-motion, performance và text truth state; report chỉ là đầu vào để CEO kiểm, không là approval. |

### Một work order DM duy nhất cho Antigravity

1. **Không release và không dựng lại.** Nâng đúng SOT `v3.440.0-staging.dl` lên một staging DM duy nhất; ghi migration/diff rõ ràng. Giữ toàn bộ fix DL desktop, fail-closed T1=0, ledger/tier/asset contract hiện có. Cấm fork, sync chồng, thay route hay đưa production.
2. **Thiết kế lại first-fold theo “daily discovery”, không theo danh bạ.** Giữ ảnh Cầu Rồng/Đà Nẵng có attribution nhưng dùng một headline ngắn, value proposition đúng dữ liệu, moment chips và **một** primary CTA state-aware. T1=0: CTA phải dẫn tới “Khám phá chương trình/cổng chính thức đang kiểm”, không nói “ưu đãi dùng ngay”. Voucher và Smart Buy là secondary/tertiary. Không mở màn bằng 50 thẻ cùng cấp.
3. **Tạo lớp nội dung có sức hút nhưng trung thực:** thêm rail “Đang đáng xem hôm nay” chỉ gồm T2/T3/T4 và label tier dễ hiểu; route theo Ăn uống, Đi lại, Học tập, Tối nay/Gần bạn. Mỗi tile chỉ có ảnh hoặc surface rights-pass, một lý do phù hợp và một action. Giá, % giảm, mã, “còn X”, tổng trả, voucher copy, đánh giá sao/quote cộng đồng chỉ render khi record có evidence contract tương ứng.
4. **Biến “Ví Voucher (13)” thành trạng thái đúng:** từng entry thiếu code + hạn + điều kiện + capture phải hiện “Chương trình chính thức — kiểm điều kiện tại nguồn”, không phải “voucher” hay “đặc quyền”. Chỉ một voucher thật đã qua DH mới được copy code/nhận ưu đãi. Count hiển thị phải nêu rõ số lượng theo tier/state, không gợi nhầm là 13 mã có thể dùng.
5. **Art direction và media gate:** chỉ đưa ảnh Đà Nẵng/merchant khi manifest rights-pass có author/source/license/subject-match/dimensions/derivative. Asset `1200×800` hiện tại có thể làm ảnh web bình thường với caption đúng, nhưng **không được** gọi 4K, upscale/AI hoặc che attribution. Nếu có master 4K hợp lệ, nộp original dimension + manifest rồi dùng responsive derivatives (`srcset`/crop) không làm xấu LCP. Không copy 7 ảnh tham chiếu, không dùng logo thương hiệu ngoài quyền sử dụng.
6. **Nâng chất lượng visual có kỷ luật:** dùng một grid rộng, khoảng trắng có chủ đích, typography 3 cấp, card disclosure giảm meta ở mặt trước; detail drawer chứa điều kiện/nguồn/freshness. Tối đa một accent/section, không gradient/blur/animation chỉ để “wow”; reduced-motion phải không làm mất thông tin. Không được đổi sang phong cách minh họa AI/generic hoặc gallery ảnh khổng lồ chiếm first-fold.
7. **Bằng chứng và gate:** nộp SOT diff, data-state copy matrix, asset manifest/dimensions, visual-regression screenshots và raw runtime dimensions tại 1440×900/768×1024/390×844 từ viewport thật, focusable target report, full drawer Tab/Shift+Tab transcript, console, LCP/CLS/INP và a11y output. CEO chỉ kiểm trực tiếp sau khi staging chạy; report, screenshot hoặc Council “approved” không thay thế review độc lập. Chỉ chủ dự án mới mở aesthetic acceptance; production, affiliate write/account/secret và asset/legal authority tiếp tục khóa.

Antigravity và 7 phòng ban tự tiếp tục work order kế tiếp từ gap đo được trong phạm vi DM; chỉ dừng khi cần production release, affiliate/account/secret, hoặc quyền pháp lý/asset chưa rõ.

**Trạng thái CEO:** `DM KHỞI ĐỘNG: DL ĐẠT SMOKE DESKTOP NHƯNG STORE FRONT CHƯA ĐỦ SỨC HÚT KHÁM PHÁ, CHƯA CÓ 4K RIGHTS-PASS, CHƯA CÓ RESPONSIVE/KBD/PERFORMANCE EVIDENCE ĐỘC LẬP VÀ CHƯA CÓ OWNER AESTHETIC ACCEPTANCE.`

---

## DN. CEO live review DM — giữ tiến bộ Daily Discovery, cô lập claim Cầu Rồng và nâng chất trải nghiệm biên tập

### Bằng chứng CEO kiểm trực tiếp `v3.441.0-staging.dm`

Staging DM thật sự đang render `v3.441.0-staging.dm`; không có T1/“Dùng ngay”/“Bằng chứng hợp lệ” public. Tại desktop CEO kiểm 65 focusable visible và không còn item nào nhỏ hơn 44×44px; không tràn ngang. Đây là tiến bộ thật so với DL. First-fold cũng đã có hierarchy rõ hơn: headline daily discovery, một CTA primary, nhịp thời điểm và 4 lối vào.

Tuy nhiên, CEO phát hiện trực tiếp trong SOT/runtime rằng ticker public ghi **“Cầu Rồng Sông Hàn: Phun lửa & nước vào 21:00 Thứ Bảy & Chủ Nhật hàng tuần”** nhưng link nguồn chỉ là `https://danang.gov.vn/` ở cấp trang chủ, không có evidence ID, capture, locator hay freshness cấp claim. Đây là claim lịch hoạt động công khai chưa đủ provenance; không được dùng tính hấp dẫn thị giác để vượt Trust Gate. Ngoài ra, daily discovery hiện vẫn có nhiều tile/card trắng cùng cấu trúc directory; trải nghiệm đã sạch hơn nhưng chưa đủ cảm giác tuyển chọn bản địa cao cấp mà chủ dự án yêu cầu.

### Kết luận Hội đồng và lệnh DN hợp nhất

| Phòng ban | Việc bắt buộc tiếp theo |
| --- | --- |
| Product | Lấy một “khoảnh khắc hôm nay” có nguồn hợp lệ làm entry point, không lấy số lượng/card grid làm lời hứa. |
| Design | Tạo nhịp biên tập rõ giữa hero, moment strip và 3–5 editorial tiles; giảm card trắng lặp lại, tăng ảnh/texture địa phương chỉ khi rights-pass. |
| UX/CX | Cho mỗi journey một hành động/phần thưởng thông tin cụ thể; giải thích tier bằng ngôn ngữ dễ hiểu, không làm người dùng đọc metadata để hiểu. |
| Growth | Duy trì 50 mục theo tier nhưng ưu tiên lựa chọn phù hợp theo moment, save intent và mở nguồn; không biến counter thành tín hiệu khuyến mãi. |
| Data & Trust | Cô lập ngay lịch/giờ Cầu Rồng và mọi claim thời điểm tương tự không có evidence cấp claim; source homepage không chứng minh lịch cụ thể. |
| Engineering | Dùng một SOT DM, data-driven journey counters, provenance fields và responsive asset pipeline; không hard-code count/claim khác với runtime. |
| QA | Test truth-state của ticker, journey count, all breakpoint behavior và visual regression; report không phải approval. |

### Lệnh DN cho Antigravity

1. **Cô lập claim ticker trước:** gỡ giờ/ngày phun lửa Cầu Rồng khỏi mọi route, metadata và share surface ngay trên staging DN, trừ khi record có evidence contract DH đầy đủ (canonical capture, locator, timestamp, freshness và field mapping). Fallback trung tính: “Cầu Rồng Sông Hàn — xem thông tin hiện hành tại cổng chính thức”; link phải trỏ đúng page chứng minh claim khi claim được bật lại, không trỏ trang chủ chung chung.
2. **Sửa data-state, không chỉ sửa chữ:** journey counts phải được tính từ cùng ledger runtime và mô tả rõ phạm vi/tier. Cấm hard-code counter khác nguồn; không dùng “xác thực/đối soát” nếu record chỉ có source official. Một số item được xuất hiện ở nhiều journey phải không làm người dùng hiểu nhầm đó là tổng 50 deal độc lập.
3. **Nâng Daily Discovery thành editorial commerce an toàn:** giữ hero DM và 4 journey, nhưng thêm một rail tuyển chọn 3–5 mục theo moment với reason-to-go ngắn, tier label, source action. Chỉ dùng photo card khi asset rights-pass/subject-match; chưa có ảnh thì dùng texture/surface design-system có chủ ý, không lấp bằng AI hoặc ảnh generic. Grid directory chi tiết chuyển xuống sau rail/disclosure.
4. **Tăng cảm xúc mà không giả dữ liệu:** hero/rail phải ưu tiên cảnh Đà Nẵng thật, cây chữ biên tập và một đường dẫn rõ ràng; không thêm % giảm, giá, voucher, countdown, sao/quote cộng đồng, merchant logo hay social proof khi chưa có contract/quyền dùng. `Chương Trình (13)` vẫn là 10 cổng chính thức + 3 kênh theo dõi, không phải 13 voucher.
5. **Giữ những gate đã pass desktop:** không làm hồi quy T1=0 fail-closed, target 44px, dialog/Escape/restore, source copy và console sạch. Kiểm lại 1440/768/390 với viewport thật, 200% zoom, Tab/Shift+Tab và reduced-motion. Nộp raw DOM dimensions/counter calculation, ticker evidence matrix và screenshot visual regression; CEO kiểm lại trực tiếp.
6. **Không release/không vượt authority:** production vẫn khóa; không affiliate write/account/secret, không asset/legal assumption. Chủ dự án là người duy nhất đánh giá “đẹp”; Antigravity tiếp tục từ gap DN mà không chờ nhắc lại.

**Trạng thái CEO:** `DN ĐANG THỰC THI: DM ĐẠT TIẾN BỘ VỀ HIERARCHY VÀ DESKTOP ACCESSIBILITY, NHƯNG BỊ CHẶN TRUST GATE Ở CLAIM LỊCH CẦU RỒNG VÀ CHƯA ĐẠT OWNER AESTHETIC ACCEPTANCE/RESPONSIVE-PERFORMANCE GATE.`

---

## DO. CEO recheck DN — source-of-count duy nhất, rail tuyển chọn thật, không nhận report mâu thuẫn runtime

### Evidence CEO vừa kiểm trực tiếp `v3.442.0-staging.dn`

DN đã cô lập đúng claim lịch Cầu Rồng: runtime chỉ còn copy trung tính “xem thông tin điểm đến và thông báo hiện hành tại cổng chính thức”; không còn giờ/ngày phun lửa, T1, “Dùng ngay” hoặc “Bằng chứng hợp lệ”. Desktop có 65 focusable visible, không có item dưới 44×44px và không tràn ngang. Đây là phần pass trực tiếp.

Tuy nhiên, báo cáo DN tự khai journey count `18/14/18/18`, trong khi bề mặt runtime CEO vừa thấy lại là `11/27/18/12`. Dù cách nào đúng, hai con số mâu thuẫn chứng minh report không thể là evidence. Đồng thời first-fold đã sạch và có bản sắc, nhưng rail “Tiêu điểm hôm nay” vẫn là lưới cổng thông tin đồng hạng; chưa thực sự là tuyển chọn biên tập khiến người dùng muốn khám phá.

### Lệnh DO duy nhất

1. **Thiết lập một source-of-count có thể kiểm:** tạo một hàm/contract duy nhất sinh journey label, count, route result và analytics key từ ledger hiện hành. Runtime, HTML prerender, screenshot test, Council pack và report phải đọc cùng output đó. Khi category chồng lấp, copy phải nêu “mục có thể xuất hiện ở nhiều hành trình”, hoặc bỏ count; tuyệt đối không cộng để giả thành tổng deal. Nộp raw JSON snapshot có ID từng item để CEO đối chiếu.
2. **Đừng gọi một grid là editorial rail:** trước danh mục chi tiết, dựng 3–5 tiles tuyển chọn có chủ ý theo moment, mỗi tile gồm ảnh/surface rights-pass, local reason ngắn, tier dễ hiểu và đúng một action. Các card cổng chính thức đầy đủ chuyển thành lớp thứ hai sau “Xem tất cả”. Khi T1=0, không dùng headline/badge/copy ám chỉ deal đang diễn ra.
3. **Visual system DO:** giữ hero Cầu Rồng/attribution và palette hiện tại; làm khác biệt tile tuyển chọn bằng crop ảnh, hierarchy và khoảng trắng, không bằng rainbow card, shadow nặng, blur hay badge dày. Mỗi hành trình phải có identity riêng nhưng cùng type scale, spacing, component state và action pattern.
4. **QA/Council:** kiểm click từng journey trả đúng filtered set/count, state empty, URL/scroll target, save, drawer, keyboard và 1440/768/390 thực. Visual regression phải chỉ ra rail mới trước/sau, không chỉ hash. Council ghi “quan sát” tách khỏi “đã chứng minh”; mọi mâu thuẫn runtime/report là fail QA.
5. **Giữ khóa:** không regression các fix DN/DL; production, affiliate write/account/secret, asset-rights mơ hồ đều khóa. Antigravity tự tiếp tục các luồng supply candidate/read-only, a11y và visual refinement sau DO; CEO sẽ chỉ đánh giá live build tiếp theo, không tự nghiệm thu Go-Live.

**Trạng thái CEO:** `DO ĐANG THỰC THI: DN ĐÃ PASS CÔ LẬP CLAIM VÀ DESKTOP SMOKE, NHƯNG COUNT PROVENANCE/QA REPORT ĐANG MÂU THUẪN RUNTIME VÀ DAILY DISCOVERY CHƯA ĐẠT CHUẨN TUYỂN CHỌN THẨM MỸ.`

---

## DP. CEO live review DO — chấp nhận cấu trúc rail, từ chối taxonomy/asset mapping sai và mở supply thật

### Điều CEO kiểm trực tiếp `v3.443.0-staging.do`

DO đã thực sự sửa một phần quan trọng: title/version đúng, không có T1 hoặc claim bị cô lập, journey counts runtime là `11 / 27 / 18 / 12`, target visible không có item dưới 44px. Rail bốn item với ảnh địa phương làm trang có nhịp khám phá tốt hơn directory trước đó. Đây là tiến bộ trải nghiệm được ghi nhận, nhưng **không là aesthetic acceptance hay Go-Live**.

CEO đồng thời phát hiện lỗi trust/design cụ thể trong rail: card “Phố Điểm Tâm & Ẩm Thực Huỳnh Thúc Kháng” dùng ảnh Mì Quảng của tác giả khác, nhưng ảnh đó không chứng minh đây là chính địa điểm/tuyến Huỳnh Thúc Kháng; card lại mang label `TIỆN ÍCH CÔNG CỘNG` và CTA “Xem tiện ích & Maps”. Đây vừa là subject/place mismatch vừa là taxonomy sai (ẩm thực không được giả thành tiện ích công cộng). Việc một ảnh có license không tự chứng minh mapping với địa điểm hay quyền mô tả thương mại.

### Lệnh DP hợp nhất

1. **Asset/taxonomy quarantine ngay:** rút card ẩm thực Huỳnh Thúc Kháng khỏi rail hoặc thay bằng surface không ảnh cho tới khi có manifest subject-match đúng địa điểm/tuyến. Nếu ảnh chỉ minh họa món Mì Quảng, không được dùng nó làm visual evidence cho quán/phố cụ thể; chỉ dùng với label “ảnh minh họa món ăn”, không gắn CTA/địa chỉ của một venue. Bỏ label `TIỆN ÍCH CÔNG CỘNG` và CTA tiện ích khỏi mọi F&B item.
2. **Taxonomy contract bắt buộc:** mỗi item public phải có `content_type`, `tier`, `gateway_group`, `subject_id`, `asset_subject_id`, `source_url`, `claim_scope` và allowed CTA. Quy tắc tối thiểu: F&B = place/radar tùy evidence; DanaBus = utility/official programme tùy claim; bảo tàng/thư viện = place/utility khi chứng minh được; T1 chỉ cho deal có contract DH. Validator phải fail khi `content_type`–tier–CTA–asset subject mâu thuẫn.
3. **Rail chỉ xuất hiện khi từng tile qua contract:** bốn tile cần source matrix riêng; card không đủ subject/claim/asset phải chuyển về candidate/private hoặc một no-image editorial surface trung tính. Không được thay tile lỗi bằng ảnh AI/stock/logo merchant không quyền.
4. **Supply track song song, không chờ UI:** Growth + Data & Trust quét read-only cohort lớn theo các nhu cầu ăn trưa, rạp, di chuyển, KTX, học tập, cuối tuần, merchant phù hợp; đưa toàn bộ vào candidate ledger. Mục tiêu bề mặt 50 mục/ngày tiếp tục bằng T2/T3/T4 hữu ích; T1/voucher copy chỉ nạp từng record khi contract DH có giá/tổng trả/điều kiện/hạn/capture/freshness thật. Affiliate vẫn catalog research read-only, value-first, không tạo link/campaign/account.
5. **Hội đồng/QA:** Product, Design, UX/CX, Growth, Data & Trust, Engineering, QA nộp một DP matrix có ID rail item, tier, taxonomy, asset source/license/subject match, claim scope, CTA và test result. CEO sẽ kiểm trực tiếp storefront/explore/detail trước khi cho rail pass. Không gọi card là “đã xác thực/đối soát” nếu matrix chưa đủ.
6. **Giữ hướng visual DO:** không quay lại directory cũ; dùng rail tuyển chọn + disclosure nhưng tiếp tục nâng hình ảnh đúng nguồn, spacing, typography và responsive. Production, affiliate write/account/secret và quyền asset chưa rõ vẫn khóa.

**Trạng thái CEO:** `DP ĐANG THỰC THI: DO CÓ TIẾN BỘ THẬT VỀ DAILY DISCOVERY, NHƯNG RAIL BỊ CHẶN VÌ ASSET SUBJECT MISMATCH/TAXONOMY SAI; SUPPLY EVIDENCE PHẢI ĐƯỢC TĂNG TỐC SONG SONG.`

---

## DQ. CEO live review DP — rail đã sạch taxonomy; candidate không có canonical source không được tính là supply

### Evidence CEO kiểm trực tiếp

`v3.444.0-staging.dp` đã render đúng: rail F&B Huỳnh Thúc Kháng là surface không ảnh, tier `KHÁM PHÁ BẢN ĐỊA`, CTA vị trí; không còn bị gọi là tiện ích công cộng. Ba tile còn lại hiển thị taxonomy/asset phù hợp bề mặt. T1 vẫn bằng 0, không có claim đã cô lập và target desktop tiếp tục đạt. Đây là pass giới hạn cho **sửa mapping rail**.

CEO đọc trực tiếp `JAYT_SUPPLY_CANDIDATE_COHORT_DP.json` và thấy candidate `CAND_BUN_CHA_CA_109` dùng `https://danang.gov.vn` trang chủ cho một địa điểm F&B, nhưng lại mang `SOURCE_HOST_VERIFIED`. Một domain hợp lệ không phải canonical source của item; candidate này chưa chứng minh tên, địa điểm, menu/giá hay quyền công bố. Candidate ledger là tiến độ pipeline, **không phải supply verified hoặc evidence thật**.

### Lệnh DQ duy nhất

1. **Canonical-source gate cho candidate:** mỗi candidate public-facing hoặc được tính vào quota phải có source URL trực tiếp, được resolve read-only, chủ thể/địa điểm khớp ID, ngày kiểm và claim scope. Root domain, search result, social profile chung hoặc “host verified” chỉ được ghi `DISCOVERY_LEAD`, không được là `OFFICIAL_SOURCE_VERIFIED`/T2/T3/T4 public.
2. **Cô lập candidate Bún Chả Cá 109 và mọi tương tự:** giữ ở private discovery queue, xóa mọi trạng thái suy diễn về nguồn từ city portal root. Không render, không count, không đưa lên rail/map/deal/voucher cho đến khi canonical source hợp lệ và contract phù hợp tồn tại.
3. **Supply scorecard thật:** Council phải tách rõ `lead → canonical source found → capture pending → evidence complete → public T2/T3/T4 → T1 eligible`; báo số item ở từng trạng thái, không báo “đủ 50 deal”. T1 cần đầy đủ DH; voucher code có copy cần thêm code/hạn/điều kiện/tổng trả thực. Affiliate vẫn chỉ research catalog read-only, không tạo deeplink/campaign/account.
4. **Refine surface F&B an toàn:** giữ no-image tile hiện tại nhưng làm surface có cảm xúc địa phương qua typography/pattern/icon system được tạo nội bộ, không minh họa như ảnh thật và không gợi đây là ảnh venue. Chỉ thay bằng ảnh khi asset subject-match, rights-pass và provenance có trong manifest.
5. **QA/CEO gate:** nộp candidate ledger machine-readable, canonical URL validation log, status-transition audit và list public item IDs. Kiểm exact URL/visible copy tại 1440/768/390, không dùng report/hash thay cho URL/resolution/evidence. Production vẫn khóa; CEO không nghiệm thu Go-Live.

**Trạng thái CEO:** `DQ ĐANG THỰC THI: DP PASS SỬA RAIL TAXONOMY CỤC BỘ, NHƯNG SUPPLY TRACK CHƯA CÓ BẰNG CHỨNG CANONICAL ĐỦ ĐỂ TÍNH LÀ NỘI DUNG CÔNG KHAI HOẶC DEAL.`

---

## DR. CEO provenance stop — future timestamp làm vô hiệu batch canonical candidate DQ

### Phát hiện CEO trực tiếp từ ledger DQ

Runtime `v3.445.0-staging.dq` không rò candidate Bún Chả Cá 109, không có T1/claim bị cấm và rail giữ trạng thái DP. Tuy nhiên, trong chính `JAYT_SUPPLY_CANDIDATE_COHORT_DQ.json`, file ghi `generated_at: 2026-08-30T06:47:18Z`, trong khi bốn candidate `CANONICAL_SOURCE_FOUND` đều ghi `checked_at: 2026-08-30T13:45:00Z`. Thời điểm kiểm nằm **sau** thời điểm batch được sinh hơn bảy giờ. Đây là impossible chronology; field `subject_match_verified: true`, canonical status và notes của batch không thể dùng làm evidence, dù URL nhìn có vẻ hợp lý.

### Lệnh DR duy nhất

1. **Quarantine toàn bộ bốn `CANONICAL_SOURCE_FOUND` DQ:** chuyển về `DISCOVERY_LEAD` hoặc `CAPTURE_RETRY_REQUIRED`, không đếm như canonical/capture/evidence/public supply và không suy diễn họ đã được kiểm. Bún Chả Cá tiếp tục private lead.
2. **Thiết lập time-integrity contract:** `checked_at <= artifact_generated_at <= signed_at`; dùng UTC, offset, monotonic run ID, tool/run identity và SHA-256 raw capture. Validator phải fail nếu bất kỳ timestamp tương lai, thiếu timezone, sửa ngược thời gian hoặc raw capture không khớp URL. Không được khắc phục bằng đơn thuần đổi text timestamp.
3. **Capture lại read-only từng source:** sau khi timestamp hợp lệ, lưu canonical URL resolved, title/HTTP status, capture URL/path, SHA-256, capture timestamp, locator, subject match decision, reviewer/decision và expiry. Với Facebook/portal/login block, ghi `UNVERIFIED_BLOCKED`, không dùng trang shell/profile chung để xác nhận menu/giá/giờ/địa điểm.
4. **Supply scorecard phải phản ánh thực tế:** tại thời điểm này `EVIDENCE_COMPLETE=0`, `T1=0`; bốn URL chỉ được tiến lên sau capture có time-integrity. 50 T2/T3/T4 public hiện hữu chỉ giữ nếu từng record có canonical source trước đó, không được “hợp thức hóa” bằng scorecard candidate.
5. **Council/QA:** Data & Trust sở hữu validator; Engineering chạy nó trong build; QA nộp raw failed-case (timestamp tương lai) và fresh pass-case; Product/Design/Growth tiếp tục rail, accessibility và candidate discovery nhưng không claim supply đã xác minh. CEO kiểm trực tiếp raw artifacts trước khi mở lại gate.

Production, affiliate write/account/secret và asset/legal authority vẫn khóa. Không có Go-Live, không có T1/voucher/price history từ batch DR cho tới khi chronology và evidence contract pass.

**Trạng thái CEO:** `DR ĐANG THỰC THI: DQ CÓ CÔ LẬP RUNTIME ĐÚNG, NHƯNG BATCH CANONICAL CANDIDATE BỊ VÔ HIỆU DO FUTURE TIMESTAMP/PROVENANCE FAIL.`

---

## DS. CEO evidence-artifact gate — chronology pass không biến hash không payload thành capture

### Kết quả CEO kiểm raw log DR

`staging_dr_raw_source_capture_log.json` đã có chronology hợp lý: `checked_at ≤ artifact_generated_at ≤ signed_at`; cả bốn candidate vẫn là `CAPTURE_RETRY_REQUIRED`, T1=0. Đây là đúng về **quarantine state**. Nhưng từng “capture” chỉ cung cấp `target_url`, decision và `raw_payload_sha256`; không có canonical local/immutable capture path, response HTTP, page title, source locator, raw payload hoặc manifest path để hash có thể được đối chiếu. Một SHA-256 đứng một mình không chứng minh payload đã tồn tại hoặc nội dung source.

### Lệnh DS duy nhất

1. **Evidence artifact là bắt buộc:** mỗi probe/capture muốn đổi pipeline stage phải có `capture_artifact_path` bất biến nằm trong evidence vault, hash của đúng file, byte size, MIME, fetch/response time, final resolved URL, HTTP status, title, locator/quote và timestamp UTC. Thiếu một trong các trường này: status chỉ là `DISCOVERY_LEAD`/`CAPTURE_RETRY_REQUIRED`, không canonical/evidence/public.
2. **Không dùng capture tự sinh/synthetic:** artifact phải là output read-only trực tiếp từ URL (hoặc ghi rõ request bị blocked). Nếu không thể fetch/render vì dynamic shell, login, robots hoặc quyền truy cập, lưu error/status artifact với timestamp và giữ blocked; không suy diễn nội dung trang.
3. **Hash verification CEO-reproducible:** QA cung cấp manifest JSON gồm đường dẫn tương đối, SHA-256, size, MIME, run ID và mapping candidate→artifact; script verifier chỉ đọc file phải fail khi artifact thiếu/khác hash. CEO sẽ tự mở ít nhất một artifact bất kỳ từ mỗi loại source trước khi nâng trạng thái.
4. **Stage transition lockdown:** chỉ `CANONICAL_SOURCE_FOUND` sau khi canonical artifact + subject match; chỉ `CAPTURE_PENDING` khi explicit claim/field còn thiếu; `EVIDENCE_COMPLETE`/T1 theo DH. Dừng claim “100% timestamp hợp lệ” như một bằng chứng nguồn; chronology chỉ là điều kiện cần.
5. **Tiếp tục song song:** UI DP/DQ giữ fail-closed và visual rail; Design/UX tiếp tục polish no-image state. Growth/Data & Trust tạo artifact read-only thật; Engineering/QA đóng validator. Không production, affiliate write/account/secret hoặc asset/legal decision.

**Trạng thái CEO:** `DS ĐANG THỰC THI: DR PASS CHRONOLOGY QUARANTINE, NHƯNG RAW SOURCE EVIDENCE CHƯA TỒN TẠI Ở DẠNG CEO-REPRODUCIBLE ARTIFACT.`

---

## DT. Council work order — từ artifact truy cập sang thông tin hữu ích có field-level evidence

### Xác nhận CEO độc lập về DS

CEO đã đọc trực tiếp manifest DS và tự tính lại SHA-256/byte size của cả 5 artifact trong evidence vault: các giá trị khớp. Cổng thành phố được giữ `DISCOVERY_LEAD`, Facebook `CAPTURE_RETRY_REQUIRED`, còn DUT/ĐHĐN/DanaBus là `CAPTURE_PENDING`; đây là trạng thái fail-closed đúng. Tuy nhiên, artifact hiện chỉ chứng minh khả năng truy cập portal: chưa có policy mở cửa/thẻ sinh viên, timetable R16A, giá/tổng trả hay điều kiện voucher. Không record nào đủ T1/voucher copy.

### Quyết định Hội đồng 7 phòng ban

| Phòng ban | Workstream DT |
| --- | --- |
| Product | Biến evidence hợp lệ thành utility cụ thể (giờ mở cửa, phạm vi phục vụ, route) trước khi nghĩ tới deal. |
| Design | Giữ rail DP; hiển thị trạng thái “đang kiểm điều kiện” hữu ích, không biến missing data thành thẻ trống. |
| UX/CX | Detail drawer nói rõ điều gì đã biết/chưa biết, ngày kiểm và cổng chính thức; không tạo friction hoặc copy gây tin là đã dùng được. |
| Growth | Mở cohort theo nhu cầu lặp lại; ưu tiên nguồn có canonical page đọc được thay vì social shell. |
| Data & Trust | Mỗi field public phải map tới artifact+locator+freshness; không nâng stage theo domain/HTTP 200. |
| Engineering | Xây field-level evidence matrix và freshness job trên cùng SOT/evidence vault; không tạo database hay dashboard thứ hai. |
| QA | Tái băm artifact, kiểm field mapping/source action/status expiry và regression UI 1440/768/390. |

### Lệnh DT duy nhất cho Antigravity

1. **Tạo evidence matrix theo field, không theo URL:** dùng các artifact DS làm baseline. Với DUT/ĐHĐN, tìm/capture read-only trang quy chế mở cửa, đối tượng dùng, phí/thẻ nếu có; với R16A, canonical page riêng chứa route/timetable còn hiệu lực. Mỗi field render phải liên kết artifact, locator, captured-at/freshness và claim scope. Không tìm thấy = `unknown`, không render như fact.
2. **Tập trung supply có khả năng phục vụ người dùng ngay:** ưu tiên tiện ích học tập, giao thông, chính sách học đường, rạp/F&B có page chính chủ đọc được. Facebook/social dynamic shell vẫn blocked, không cố vượt barrier, không dùng title/menu/search result thay capture. Candidate F&B không canonical giữ private lead.
3. **T1/voucher lane hoàn toàn tách:** chỉ candidate có official offer page + giá hiện tại + tổng trả + điều kiện + hạn + capture contract DH mới vào queue xét T1. Code voucher chỉ khi code thật đang hiệu lực. Khảo sát AccessTrade chỉ read-only khi có portal quyền phù hợp; không đăng nhập nếu không được cấp, không deeplink/campaign/account/secret.
4. **Surface UX:** bổ sung detail state rõ “Đã xác nhận từ nguồn: [field]” / “Chưa có dữ liệu điều kiện hiện hành”; rail/card chỉ nêu field đủ evidence. Giữ typography/local visual DP, no-image safety, 44px control, focus/drawer behavior; không biến evidence dashboard thành bề mặt khách hàng.
5. **CEO gate:** nộp one-pack DT gồm matrix record-field, raw artifact paths/hashes, freshness decisions, candidate state transitions, public diff và browser proof. Không Council/Antigravity approval nào thay CEO artifact+live review. Production tiếp tục khóa.

**Trạng thái CEO:** `DT ĐANG THỰC THI: DS ĐẠT ARTIFACT-INTEGRITY BASELINE, NHƯNG CHƯA CÓ FIELD-LEVEL EVIDENCE ĐỦ ĐỂ TẠO DEAL/VOUCHER; UI VÀ SUPPLY HỢP LỆ TIẾP TỤC SONG SONG.`

---

## DU. CEO provenance correction — cấm “trẻ hóa” artifact bằng vault copy và timestamp mới

### Phát hiện CEO trực tiếp từ DS/DT vault

Matrix DT có field-state fail-closed hợp lý. Nhưng CEO đối chiếu từng file DS và DT: cả 5 artifact DT có **cùng byte size và SHA-256** với artifact DS; đó là reuse/copy, không phải fetch mới. DT lại gán toàn bộ `captured_at_utc: 07:22:25Z`, trong khi artifact gốc DS được ghi `fetched_at_utc` khoảng `07:08Z`. Reuse content-addressed artifact được phép, nhưng timestamp capture bất biến phải đi cùng bytes gốc. Đổi timestamp làm freshness trẻ hơn thực tế và phá evidence chronology.

### Lệnh DU duy nhất

1. **Immutable artifact identity:** ID artifact = SHA-256 + byte size + original `fetched_at_utc` + final URL. Artifact được reuse phải reference `artifact_id`/path vault gốc và giữ nguyên observed/captured time; build/matrix time chỉ được ghi `referenced_at` hoặc `matrix_generated_at`.
2. **Xóa freshness giả:** toàn bộ DT field/capture timestamp lấy lại thời điểm DS gốc, hoặc đánh dấu `REUSED_ARTIFACT_ORIGIN_DS`; freshness tính từ original fetch, không từ lúc copy. Không được sửa file metadata để pass freshness.
3. **Artifact lineage validator:** fail nếu cùng hash/size xuất hiện trong vault mới với capture time khác nhưng không có explicit reuse lineage; fail nếu `captured_at` > file/run origin time; manifest phải lưu `parent_artifact_id`, `reuse_reason`, `original_vault`, `original_hash`.
4. **Field matrix tiếp tục fail-closed:** các field portal/OPAC hiện chỉ được hiển thị trong phạm vi artifact chứng minh; timetable R16A, giờ mở cửa, policy ngoại trường, giá/menu/voucher vẫn unknown. Không nâng candidate/public tier/T1 chỉ vì matrix đẹp hơn.
5. **Hội đồng/QA:** nộp DS→DT lineage diff và raw verifier output; QA thêm test attempt restamp phải fail. Design/UX giữ drawer minh bạch, Engineering/Data & Trust sửa provenance; Growth tiếp tục capture read-only mới chỉ khi thực sự fetch. Không production/affiliate write/account/secret/legal asset.

**Trạng thái CEO:** `DU ĐANG THỰC THI: DT CÓ FIELD MATRIX ĐÚNG HƯỚNG, NHƯNG BỊ CHẶN PROVENANCE VÌ VẬT CHỨNG DS BỊ SAO CHÉP VÀ GẮN TIMESTAMP CAPTURE MỚI.`

---

## DV. Council evidence-acquisition sprint — tăng nội dung hữu ích bằng nguồn trực tiếp, không tăng report

### Quyết định CEO sau kiểm lineage DU

CEO xác nhận manifest DU đã giữ `original_fetched_at_utc`, origin vault/ref, reuse reason và hash DS tương ứng. DU pass phần lineage; field matrix vẫn phải tính freshness từ fetch gốc. Không có field mới về giá, giờ, điều kiện hay voucher, nên T1/voucher copy vẫn bằng 0 và chưa có lý do phát hành.

### Lệnh DV duy nhất

1. **Ba capture nhiệm vụ ưu tiên:** chỉ read-only, từng task hoặc tìm được canonical page trực tiếp có field/locator/artifact mới, hoặc kết thúc `BLOCKED/NOT_FOUND` có artifact lỗi:
   - DanaBus R16A: route/timetable hiện hành và điều kiện áp dụng nếu có.
   - DUT/ĐHĐN: giờ phục vụ, đối tượng sử dụng, thẻ/phí/quy chế liên trường nếu có.
   - Cohort F&B: chỉ merchant có website/official post canonical đọc được; social shell/login block không được vượt hay suy diễn.
2. **Mở rộng cohort bằng chất lượng, không bịa số:** tạo tối đa 30 candidate read-only theo 6 nhu cầu (ăn trưa, rạp/cuối tuần, transit, KTX, học tập, tiện ích đô thị). Mỗi candidate ban đầu chỉ là lead; chỉ đi lên khi direct canonical artifact, subject match và chronology pass. 50 nội dung public hiện hữu giữ theo tier, không đổi thành 50 deal.
3. **Affiliate đúng cốt lõi:** chỉ lập portfolio research offline/read-only từ catalog được phép truy cập; ánh xạ nhu cầu khách, merchant, coupon-source field, tổng trả/điều kiện/history availability. Không đăng nhập nếu chưa được cấp, không tạo deeplink/campaign/account, không render affiliate buy-card khi thiếu price contract.
4. **Product/Design/UX:** khi có field evidence mới, thêm vào drawer theo progressive disclosure, ghi nguồn và freshness; homepage chỉ nhấc lên rail khi field mang giá trị quyết định thực. Không thay surface lành mạnh DP bằng bảng audit hoặc badge “verified” chung.
5. **Council/QA gate:** mỗi vòng nộp artifact mới (không copy vault cũ), lineage, field matrix delta, freshness, public diff và test browser. Nếu không có artifact trực tiếp, báo đúng `0 field mới`; không bao giờ thay bằng wording/screenshot/report. CEO kiểm artifact và staging trước bất kỳ thay đổi tier/CTA.

Production vẫn khóa; không affiliate write/account/secret, không legal/asset decision. Antigravity tự tiếp tục vòng DV và các Council review từ gap đo được.

**Trạng thái CEO:** `DV ĐANG THỰC THI: DU PASS LINEAGE, NHƯNG MỤC TIÊU KẾ TIẾP LÀ FIELD EVIDENCE MỚI VÀ SUPPLY CANDIDATE CHẤT LƯỢNG; KHÔNG CÓ DEAL/VOUCHER NÀO ĐƯỢC MỞ KHÓA.`

---

## DW. Quyết định CEO sau kiểm tra độc lập DV — cô lập claim affiliate, thống nhất số liệu và tiếp tục thu nguồn trực tiếp

### Biên bản Hội đồng 7 phòng ban

**Product:** người dùng cần biết rõ đây là cổng chương trình, tiện ích hay deal; các số đếm không khớp phá hỏng lời hứa “khám phá 50”.  
**Design:** giữ bề mặt địa phương và hero Cầu Rồng có attribution; không đưa các badge hay thẻ mua sắm mới lên trang chủ từ dữ liệu còn chờ.  
**UX/CX:** “Chương Trình (13)”, “Khám phá (50)” và các tổng journey phải giải thích được bằng một contract duy nhất; drawer phải nói “chưa đủ dữ liệu” thay vì ám chỉ ưu đãi.  
**Growth:** tiếp tục cohort 30 để làm giàu radar/T2/T3, nhưng không chuyển mục tiêu 50 nội dung thành 50 deal thương mại.  
**Data & Trust:** manifest DV có 12 tệp, và kiểm tra độc lập hash/byte cho thấy 12/12 tệp tồn tại, khớp manifest. Tuy nhiên kho có **7** record `CANONICAL_SOURCE_FOUND`, scorecard lại ghi **4**; đây là mâu thuẫn số liệu phải fail-closed.  
**Engineering:** tạo một nguồn tính số liệu runtime duy nhất, có test đối chiếu feed → rail → nhãn điều hướng → scorecard.  
**QA:** 48 target đang hiển thị ở staging desktop đều đạt tối thiểu 44px và console không có lỗi/cảnh báo trong phiên CEO; responsive 1440/768/390 vẫn chưa được CEO đo độc lập tại viewport tương ứng nên không được claim là CEO-pass.

### Kết luận CEO

Staging `v3.450.0-staging.dv` đang chạy, không public T1, không lộ candidate state, không có mã voucher/giá giảm giả trong bề mặt đã kiểm. Kho DV có raw artifact trực tiếp và lineage tốt hơn DU, nhưng **chưa đủ** để chứng minh điều kiện/coupon/tổng trả cho affiliate card.

CEO đối chiếu raw artifact với `JAYT_AFFILIATE_RESEARCH_PORTFOLIO_OFFLINE.json`: các điều kiện cụ thể của Metiz, Starlight, GitHub và JetBrains không có locator/raw field tương ứng trong vault DV; Domino's chỉ có tín hiệu `70%/BOGO`, chưa chứng minh được điều kiện “thứ Ba, toàn quốc, bao gồm Đà Nẵng”. Những câu này bị coi là **false provenance**, không được render, không được dùng làm research “verified”, và không được nâng thành voucher/deal/card mua.

### Lệnh DW duy nhất

1. **Cô lập ngay portfolio sai chứng cứ:** giữ merchant và nhu cầu khách ở mức `RESEARCH_LEAD`; xóa/quarantine mọi `coupon_source_field`, điều kiện, “0 VND”, eligibility, lịch gia hạn, thời điểm áp dụng và total-cost khi chưa có `artifact_ref + locator + captured_at + subject/market match`. Không được biến “portal chính thức truy cập được” thành “chương trình/ưu đãi đã xác minh”. Không deeplink, campaign, đăng nhập, cookie/token, secret hay affiliate write.
2. **Evidence card cho từng claim:** với mỗi claim giá/coupon/chương trình, bắt buộc có raw response độc lập, URL canonical, thời gian thu thật, SHA-256, locator trích được trong file, phạm vi thị trường/Đà Nẵng và freshness. Thiếu bất kỳ trường nào: trạng thái `UNKNOWN_AWAITING_CAPTURE`, CTA chỉ “Mở nguồn chính thức”, không copy voucher và không quyết định Mua/Chờ.
3. **Một contract số liệu công khai:** trước build sau, reconcile và test fail nếu khác nhau giữa (a) 50 public item tiered, (b) `Khám phá (50)`, (c) `Chương Trình (13)`, (d) tổng theo journey 11+27+14+12, và (e) scorecard T2/T3/T4. Mỗi số phải nêu namespace/range rõ; không cộng chồng taxonomy với public feed rồi gọi là tổng nội dung. Nếu không giải thích được, ẩn số đếm sai thay vì hiển thị.
4. **Mở supply đúng chỗ:** tiếp tục read-only capture canonical page cụ thể cho giá/lịch/điều kiện của 7 nguồn hiện có và cohort 30. Ưu tiên source page có thể chứng minh fact quan trọng; social-login shell và root domain không phải bằng chứng subject-specific. Mỗi capture mới phải là bytes mới hoặc explicit reuse lineage; không restamp.
5. **Giao diện và QA:** giữ first-fold/rail hiện hữu, chỉ thay đổi copy và state theo evidence; không đưa bảng audit lên homepage. QA nộp một gói duy nhất gồm public count contract, raw artifact verifier, matrix delta, screenshot desktop thực tế, log console, keyboard drawer và kiểm thử viewport 1440/768/390 có thiết lập viewport có thể tái lập. Hội đồng 7 phòng ban review một lần trên đúng gói đó trước CEO browser review.

Production tiếp tục khóa `v3.419.0`. Không nghiệm thu Go-Live, không mở T1/voucher/affiliate buy-card cho đến khi DW pass bằng chứng độc lập và chủ dự án chấp nhận thẩm mỹ.

**Trạng thái CEO:** `DW ĐANG THỰC THI: DV CÓ 12 ARTIFACT HASH-KHỚP, NHƯNG CLAIM AFFILIATE VÀ SỐ LIỆU PUBLIC BỊ CÔ LẬP; CHỈ TIẾP TỤC CAPTURE/UX AN TOÀN.`

---

## DX. Quyết định CEO sau kiểm tra độc lập DW — loại bỏ “reconcile” sai chiều dữ liệu

### Biên bản Hội đồng 7 phòng ban

**Product:** con số trên navigation và hành trình phải trả lời cùng một câu hỏi hoặc được đặt tên khác nhau; người dùng không được tự giải thích vì sao 50 biến thành 64.  
**Design:** không được dùng số lớn để làm giao diện có vẻ phong phú; nếu range/count chưa rõ, dùng label mô tả trung tính.  
**UX/CX:** label journey phải nói rõ là số mục **không trùng lặp** trong feed, hoặc là số link/entry riêng; không được để một item đếm ở nhiều journey mà vẫn gọi “tổng”.  
**Growth:** giữ nhịp khám phá 50 mục phân tầng, ưu tiên việc khách tìm được nội dung hữu ích hơn KPI đếm card.  
**Data & Trust:** contract DW ghi 50 public item nhưng các count hiển thị 11+27+14+12 = **64**. `sum_tiers_equals_total_public` pass không chứng minh journey counter khớp public feed. Đây là lỗi dimensional reconciliation.  
**Engineering:** đưa `item_id` set và `journey_assignment` vào contract, kiểm cả cardinality và intersection, không chỉ ghi hard-code true.  
**QA:** staging desktop `v3.451.0-staging.dw` đúng version, không có T1/claim giá trong text, 48 focusable hiển thị không có target nhỏ và console sạch; nhưng chỉ là viewport CEO 1280px. Không tái sử dụng lời claim 1440/768/390 nếu chưa cung cấp run độc lập tái lập được.

### Kết luận CEO

DW pass hai hạng mục hẹp: portfolio affiliate đã về `RESEARCH_LEAD` và count canonical vault/scorecard cùng là 7. CEO **từ chối** trạng thái “100% reconcile” của journey: contract hiện không có phép kiểm `sum journey unique item IDs = public total`, trong khi số hiển thị cộng ra 64.

### Lệnh DX duy nhất

1. **Định nghĩa namespace và phép đếm:** mỗi counter phải khai báo `entity_type`, tập `item_id`, trạng thái public/tier và quy tắc dedupe. Một `public_item_id` chỉ được thuộc tối đa một journey nếu journey được quảng bá là partition. Nếu item được phép thuộc nhiều journey, nhãn phải đổi thành “lượt xuất hiện theo hành trình”, tuyệt đối không so với tổng 50.
2. **Tạo count ledger kiểm được:** xuất một ledger gồm 50 dòng public, `item_id`, tier, journey primary, optional secondary journey, source ref. Contract tự tính các nhãn từ ledger; cấm hard-code count. Test bắt buộc fail cho: tổng public khác 50; tier sum sai; item không thuộc journey; item primary bị trùng; count UI khác ledger; hoặc câu “journey total = 50” khi là multi-membership.
3. **Sửa surface nhỏ nhất:** trước khi có ledger pass, bỏ 4 con số journey sai hoặc thay bằng nhãn không số. Giữ `Khám phá (50)` chỉ khi ledger 50 item tiered thực sự pass. `Chương Trình (13)` phải nói rõ là 13 entry ví/lanes, không được trình bày như toàn bộ T2=20.
4. **Giữ containment và tiến công an toàn:** portfolio affiliate vẫn toàn bộ `RESEARCH_LEAD`; chỉ capture canonical page/field mới, không khôi phục bất kỳ điều kiện, code, giá, lịch sử giá hay CTA mua nào. Tiếp tục cohort 30, accessibility và visual polish trên data contract đúng.
5. **Gói Council/QA kế tiếp:** Product/Data & Trust cùng ký namespace glossary và ledger diff; Engineering nộp runtime derivation; QA kiểm DOM text, ledger, keyboard, 1440/768/390 bằng cấu hình viewport có thể lặp; Design/UX xác nhận copy không gây hiểu nhầm. CEO chỉ review một gói thống nhất sau khi các test này pass.

Production tiếp tục khóa `v3.419.0`; không Go-Live, không T1/voucher/affiliate buy-card. Antigravity phải tự chạy DX và vòng evidence tiếp theo, nhưng không được coi report hoặc ảnh là bằng chứng thay cho raw ledger/artifact/browser review.

**Trạng thái CEO:** `DX ĐANG THỰC THI: DW PASS CÔ LẬP AFFILIATE VÀ 7/7 CANONICAL COUNT, NHƯNG BỊ CHẶN BỞI JOURNEY COUNT 64 ≠ PUBLIC 50.`

---

## DY. Quyết định CEO sau kiểm tra độc lập DX — ledger đúng nhưng runtime staging chưa tiêu thụ ledger

### Biên bản Hội đồng 7 phòng ban

**Product:** kết quả khách nhìn thấy là nguồn chân lý sản phẩm; không được coi ledger đúng là hoàn thành khi journey UI còn hiển thị số cũ.  
**Design:** giữ layout, chỉ sửa số/nhãn từ một runtime source; không dùng version badge như bằng chứng nội dung đã đồng bộ.  
**UX/CX:** nhãn 27/14 đang gây hiểu sai trực tiếp. Nếu route chưa sẵn sàng, ẩn count cho đến khi render từ ledger.  
**Growth:** không truyền thông “50 mục đối soát” cho đến khi page, route và filter cùng trả tập 50 rời nhau.  
**Data & Trust:** kiểm file `JAYT_PUBLIC_COUNT_LEDGER_DX.json` độc lập cho thấy 50 `item_id` unique, primary journey 11/14/13/12, không trùng. Nhưng staging title `v3.452.0-staging.dx` lại render **27** “Đi chơi” và **14** “Tiện ích”; do đó SOT/runtime contract đang tách rời.  
**Engineering:** loại hard-coded `27/14`, map card/filter/render route trực tiếp từ ledger generated runtime module; thêm checksum/version ledger vào HTML để truy vết bản thật đang chạy.  
**QA:** desktop CEO 1280 có 48 focusable hợp lệ, console sạch, không T1/price claim. Đây không bù được lỗi semantic runtime.  

### Kết luận CEO

DX pass **ledger data** nhưng fail **runtime consumption**. Không được tái báo `29/29 PASS` như evidence release khi chính UI còn mâu thuẫn với contract. Tất cả count journey public của DX bị chặn cho đến khi browser direct xác nhận đúng 11/14/13/12 và click route tương ứng.

### Lệnh DY duy nhất

1. **Một pipeline thật:** generated ledger DX là input duy nhất cho home category, navigation, filter, route renderer và count contract. Cấm giữ biến/string count cũ ở bất kỳ static HTML/JS/cache payload nào.
2. **Runtime fingerprint:** render `data-ledger-version`, SHA-256 ledger và bốn count derived vào DOM/diagnostics nội bộ; QA fetch HTML/JS đang served và đối chiếu fingerprint với file ledger. Version build không được thay fingerprint.
3. **Fail-closed UI:** trước khi pipeline pass, bỏ các counter journey hoặc hiển thị “Đang đồng bộ danh sách”; tuyệt đối không hiển thị 27/14 và không ghi “100% reconcile”. Không thay đổi tier, merchant, CTA, price hay voucher nhằm che lỗi này.
4. **Kiểm thử hành vi bắt buộc:** browser test sau deploy phải đọc UI counts = 11/14/13/12, click từng journey render đúng số card unique, hợp 4 route = 50 unique, không card nằm ở hai route primary. Nộp raw DOM snapshot và script output; screenshot/report không đủ.
5. **Council một gói:** Engineering/Data & Trust chịu trách nhiệm pipeline/fingerprint; Product/UX xác nhận copy; Design xác nhận không làm xấu surface; Growth tiếp tục supply capture an toàn; QA chạy desktop và viewport 1440/768/390 tái lập. Chỉ khi Council pack tập trung pass và CEO browser review đúng runtime mới được coi DX closure.

Production vẫn khóa `v3.419.0`; no Go-Live/T1/voucher/affiliate buy-card. Antigravity tiếp tục DY tự động, đồng thời tiếp tục capture source field an toàn theo DV/DW.

**Trạng thái CEO:** `DY ĐANG THỰC THI: LEDGER DX 50 UNIQUE PASS, NHƯNG STAGING DX RUNTIME FAIL VÌ RENDER 27/14 CŨ THAY VÌ 14/13.`

---

## DZ. Quyết định CEO sau kiểm tra độc lập DY — runtime count pass, nhưng copy điều kiện chương trình lại vượt bằng chứng

### Biên bản Hội đồng 7 phòng ban

**Product:** giá trị của hub quyền lợi là giúp sinh viên đi đúng cổng và biết rõ điều gì đã/chưa được kiểm; không phải nhồi mô tả quyền lợi để card hấp dẫn hơn.  
**Design:** giữ card T2 gọn, ưu tiên hierarchy “cổng chính thức / kiểm điều kiện tại nguồn”; không dùng copy benefit, logo hoặc badge để tạo cảm giác đã được cấp quyền lợi.  
**UX/CX:** người dùng phải đọc được “điều kiện chưa được JayT đối soát” trước CTA; CTA được phép là “mở cổng để tự kiểm tra”, không phải “nhận quyền lợi”.  
**Growth:** nội dung chính thức vẫn có giá trị T2, nhưng retention phải dựa vào cập nhật có nguồn, không dựa vào claim eligibility.  
**Data & Trust:** CEO browser review DY xác nhận fingerprint `57fceb…db910`, label 11/14/13/12, không còn 27/14 cũ, không public T1/price. Nhưng DOM vẫn nêu các fact điều kiện/quyền lợi không có locator field trong vault: GitHub Copilot/tài nguyên cụ thể và eligibility; Notion Plus/email học đường; Canva Google Workspace/email trường. Đây là false provenance ở copy public.  
**Engineering:** tách `portal_identity` khỏi `programme_terms`; UI chỉ bind field có `artifact_ref + locator + captured_at + freshness + market scope`.  
**QA:** test content policy phải quét tất cả rendered text/drawer theo term claim, không giới hạn file affiliate portfolio; console và target 44px pass không thay thế claim audit.

### Kết luận CEO

DY **pass hẹp** runtime fingerprint/count tại desktop CEO: body mang `v3.453.0-staging.dy`, SHA ledger, 11/14/13/12/50; title/DOM khớp và không có T1/price claim. Nhưng DY **không đủ closure toàn release** vì khu vực T2 đang trình bày điều kiện/quyền lợi chưa chứng minh. Các copy này bị cô lập ngay, không được dùng làm chương trình xác minh hay affiliate research.

### Lệnh DZ duy nhất

1. **Cô lập toàn bộ copy T2 vượt field evidence:** với GitHub, Notion, Canva, JetBrains và mọi merchant/programme, xóa/ẩn câu về gói cụ thể, Copilot/domain/credit, free/0 đồng, eligibility, email/thẻ, gia hạn, nâng cấp, giờ áp dụng hoặc điều kiện nếu thiếu locator trên canonical raw artifact. Search toàn SOT/rendered DOM, không chỉ card đang thấy.
2. **Schema copy fail-closed:** mỗi fragment public thuộc một trong ba lớp: `PORTAL_IDENTITY_VERIFIED`, `PROGRAMME_TERMS_VERIFIED`, `UNKNOWN`. Lớp portal chỉ được nói tên cổng/đơn vị và CTA mở nguồn. Lớp terms bắt buộc artifact/locator/time/freshness/scope. `UNKNOWN` hiển thị đúng “JayT chưa đối soát điều kiện; kiểm tra tại nguồn”.
3. **Không làm nghèo UI:** thay copy bị loại bằng microcopy hữu ích: mục đích cổng ở mức tổng quát không-claim, checklist người dùng cần tự kiểm, thời điểm kiểm gần nhất và button “Mở nguồn chính thức”. Không bịa review, voucher, price history hay hình ảnh brand.
4. **Thu field evidence read-only:** ưu tiên exact terms/country/eligibility pages cho các 13 entry ví và 20 T2; mỗi field capture riêng, raw response immutable, canonical subject/market match. Không login/create account/deeplink/campaign/cookie-token/secret. Claim nào không tìm được giữ `UNKNOWN`, không bị block UI ngoài việc hạ wording.
5. **Council/QA một gói:** Data & Trust nộp manifest field và copy allowlist; Engineering nộp renderer mapping; Product/UX/Design review clarity; Growth nộp candidate queue không claim; QA trả DOM text scan, drawer scan, fingerprint check và desktop + 1440/768/390 reproducible run. CEO review browser trước mọi tier/CTA release.

Production tiếp tục khóa `v3.419.0`; không Go-Live, không T1/voucher/affiliate buy-card. Antigravity tiếp tục DZ và acquisition sprint tự động trong phạm vi read-only an toàn.

**Trạng thái CEO:** `DZ ĐANG THỰC THI: DY PASS RUNTIME LEDGER 50, NHƯNG T2 PUBLIC COPY BỊ CÔ LẬP VÌ CLAIM ĐIỀU KIỆN/QUYỀN LỢI CHƯA CÓ LOCATOR.`

---

## EA. Tổng chỉ thị CEO — nạp nguồn cung có chứng cứ, không kích hoạt affiliate/voucher giả

### Cơ sở quyết định

CEO đã đọc hai đề xuất về deal/AccessTrade. Hướng đi “tăng nguồn cung thật” là đúng. Nhưng **tất cả con số, mã, URL affiliate, deep-link, Sub-ID, campaign status, CPA/KYC, giá sản phẩm, lịch sử giá, voucher ẩn và điều kiện merchant trong đề xuất đều là dữ liệu bên thứ ba chưa được CEO kiểm chứng và không phải lệnh cho phép thực thi**.

CEO kiểm staging hiện hành trực tiếp: `v3.454.0-staging.dz` đang có, chưa phát hiện URL affiliate/mã voucher bịa trên bề mặt kiểm; trạng thái đó phải được giữ. Không có xác nhận portal AccessTrade, không có campaign được phép dùng, không có permission tracking hay affiliate action.

### Hội đồng 7 phòng ban

**Product:** ưu tiên 5–7 cơ hội tiết kiệm thật đầu tiên, không chạy KPI “18 sản phẩm/12 voucher” chưa chứng minh.  
**Design:** thiết kế Voucher Hub chỉ ở trạng thái chờ dữ liệu: đẹp, rõ, hữu ích bằng checklist và saved searches; không mô phỏng vé giảm giá hay merchant asset/ảnh sản phẩm khi chưa có quyền và provenance.  
**UX/CX:** CTA an toàn duy nhất là “Mở nguồn chính thức để kiểm tra” hoặc “Theo dõi khi có dữ liệu”; không copy code, không “thu thập mã”, không mở app hay thực hiện định danh/KYC.  
**Growth:** cohort phải phủ các nhu cầu sinh viên/văn phòng, nhưng success metric là artifact field hoàn chỉnh và nội dung tiered hữu ích, không phải commission hay click-out.  
**Data & Trust:** T1 chỉ khi một record có offer, terms, validity, scope Đà Nẵng/market, raw artifact, locator, capture time, hash và freshness; bất kỳ field nào thiếu giữ T2/T3/T4 hoặc candidate.  
**Engineering:** xây intake/read-only evidence pipeline và UI state, không AccessTrade integration, no API key, campaign registration, deeplink, Sub-ID, cookie, token hay service-worker cache giá/voucher.  
**QA:** quét toàn DOM/JS/feed để cấm `go.isclix`, scheme app, mã voucher, giá, % giảm, CPA/KYC, “đáy 90 ngày” và claim campaign khi thiếu evidence allowlist; kiểm live trước mọi tier change.

### Lệnh EA duy nhất

1. **Săn nguồn T1 bằng văn bản xác định, read-only:** chọn tối đa 7 candidate từ rạp, giao thông và F&B có page canonical cụ thể. Với mỗi candidate thu đúng raw response + headers, final URL, SHA-256/byte, timestamp thực, locator quote và market/scope. Không dùng root domain, ảnh banner, social shell hay search snippet. Kết quả hợp lệ có thể là `NO_EVIDENCE`/`BLOCKED`; không bù bằng suy diễn.
2. **Gate mở T1:** chỉ record đủ 5 field `offer + terms + validity + scope + total cost` mới được review T1. Giá phải là tổng thực trả tại phạm vi đã nêu; `Nên mua/Chờ` yêu cầu lịch sử JayT quan sát thật. Chưa đủ thì render T2 “cổng chương trình”, T3 tiện ích hoặc T4 radar, không ghi deal/voucher.
3. **Voucher Hub staging không thương mại:** dựng state `CHƯA CÓ VOUCHER ĐỦ CHỨNG CỨ` với saved search theo nhu cầu (KTX, đi lại, rạp, học tập), disclosure framework trống và source/freshness viewer. Không dùng logo/ảnh/giá/mã của Shopee, TikTok, Lazada, Cake, ngân hàng, Klook hay merchant nào; không links/outbound tracking/copy code.
4. **Affiliate research đúng authority:** chỉ lập bảng nghiên cứu offline với need → merchant candidate → canonical public source → trạng thái evidence. `PORTAL_ACCESS_NOT_VERIFIED` giữ nguyên cho AccessTrade. Nếu sau này chủ dự án cấp quyền khảo sát portal, chỉ read-only và CEO phải ra lệnh riêng; tuyệt đối không tạo campaign/link/Sub-ID, không dùng secret/cookie/token, không thực hiện KYC hay mở tài khoản cho khách.
5. **Mở rộng T3/T4 hữu ích:** cohort 30 tiếp tục được làm giàu bằng địa điểm/tiện ích public source có provenance đúng. Gắn feature như Wi‑Fi, ổ cắm, mở khuya, địa chỉ, chỉ đường chỉ khi field proof riêng; otherwise keep generic radar without invented details.
6. **PWA chỉ sau data-contract:** không cài cache-first cho feed có thể stale. Khi có requirement riêng, chỉ cache shell/offline notice và ledger snapshot có version/expiry; UI offline phải hiển thị thời điểm snapshot và không hiện price/voucher expired.
7. **Gói Council EA:** Product/Design/UX nộp prototype empty/loading/verified states; Data & Trust nộp evidence ledger; Engineering nộp no-write attestation; Growth nộp cohort; QA nộp allowlist/denylist DOM scan và browser review. CEO kiểm raw artifacts, staging và visual trước bất kỳ đề nghị T1/affiliate/production release.

Production tiếp tục khóa `v3.419.0`. Không Go-Live, không affiliate activation, không voucher code/deep-link/KYC/CPA. Antigravity phải thực hiện EA liên tục trong phạm vi source capture, UI state, accessibility và Council review an toàn.

**Trạng thái CEO:** `EA ĐANG THỰC THI: TĂNG NGUỒN CUNG CÓ CHỨNG CỨ; TOÀN BỘ ĐỀ XUẤT GIÁ/MÃ/LINK AFFILIATE/CPA CHƯA CÓ AUTHORITY HOẶC PROOF ĐỀU BỊ TỪ CHỐI.`

---

## EB. Quyết định CEO sau kiểm tra độc lập EA — Voucher Hub fail-closed pass hẹp, sửa duplicate/QA và chuyển sang field acquisition thật

### Biên bản Hội đồng 7 phòng ban

**Product:** Voucher Hub 0 item có thể tồn tại như một lời hứa minh bạch, nhưng không được trở thành điểm đến chết; phải dẫn người dùng về cổng chương trình/nguồn chính thức có giá trị ngay.  
**Design:** một nav entry duy nhất cho Voucher; empty state giữ gọn, không tạo cảm giác thương mại hoặc giả deal.  
**UX/CX:** disclosure “không KYC/CPA” là cảnh báo bảo vệ được phép, nhưng scanner phải hiểu ngữ cảnh; tuyệt đối không để câu này xuất hiện như cơ chế hành động.  
**Growth:** ưu tiên capture field cho 5–7 nguồn có khả năng thành nội dung hữu ích, không tiếp tục làm thêm dashboard/empty state.  
**Data & Trust:** CEO browser review EA xác nhận Hub hiển thị `CHƯA CÓ VOUCHER ĐỦ CHỨNG CỨ`, không có external affiliate URL/sàn, console sạch. Tuy nhiên `Voucher (0)` xuất hiện hai lần và report “denylist 0” mâu thuẫn với DOM có token `KYC/CPA` trong câu phủ định.  
**Engineering:** tách semantic content scanner (`forbidden_action_claim`) khỏi raw token scanner (`token_present`), ghi rõ allowlisted negative-disclosure context.  
**QA:** false pass của denylist phải fail report contract; kiểm duplicate navigation visible và accessible name uniqueness.

### Kết luận CEO

EA được chấp nhận hẹp cho **UI Voucher Hub fail-closed**, không phải cho affiliate/voucher activation. Không có T1 mới, không có voucher mới. Cặp lỗi UI/QA trên phải sửa trong batch kế tiếp; sau đó năng lực đội ngũ dồn sang raw field acquisition, không thêm ornament.

### Lệnh EB duy nhất

1. **Sửa navigation và empty state:** render đúng một `Voucher (0)` cho mỗi breakpoint/state. Nếu desktop/mobile nav cùng trong DOM, nav không-active phải `hidden/inert` và không xuất hiện trong accessibility tree. Test visible+focusable count và accessible-name duplicate.
2. **Scanner trung thực:** report phải có hai cột: `token_occurrences` và `forbidden_action_claims`. `KYC/CPA` chỉ pass nếu nằm trong một negative-disclosure allowlist có exact text/context; không được gọi là “0 token”. Mọi URL tracking, app scheme, mã voucher, %/giá, CPA/KYC action, campaign ID vẫn phải hard fail.
3. **Voucher Hub value khi 0:** CTA duy nhất: cổng chương trình chính thức, quay về cẩm nang, hoặc theo dõi nhu cầu cục bộ (không thu PII, không gửi form). Không logo/merchant asset/mã/giá/link. Copy phải nói snapshot/freshness và tiêu chuẩn 5 field, không tự nhận “đối soát độc lập” nếu chưa có record.
4. **Field acquisition sprint:** thay vì thêm UI, thực hiện read-only capture exact-page cho tối đa 7 candidate: route/timetable hoặc policy công cộng, cinema program terms, và education program eligibility. Mỗi attempt chỉ trả `FIELD_VERIFIED` với raw artifact, locator, scope và timestamp; nếu không có, ghi `UNKNOWN/BLOCKED`. Không scrape dynamic login, không bypass, không account/action.
5. **Council/QA report một lần:** nộp nav accessibility diff, scanner semantic output, raw evidence ledger delta, DOM external-link scan, console và viewport runs tái lập. Product/Design/UX xác nhận Hub không làm suy giảm hero; Data & Trust là owner proof; Engineering no-write; Growth candidate coverage; QA test. CEO review staging và evidence trước bất kỳ đề xuất T1/T2 wording change.

Production tiếp tục khóa `v3.419.0`; no Go-Live, no affiliate activation, no voucher code/deep-link/KYC/CPA. Antigravity tự tiếp tục EB và field acquisition safe.

**Trạng thái CEO:** `EB ĐANG THỰC THI: EA VOUCHER HUB FAIL-CLOSED PASS HẸP; SỬA DUPLICATE/SCANNER VÀ CHUYỂN SANG FIELD EVIDENCE THẬT.`

---

## EC. Quyết định CEO sau kiểm tra độc lập EB — cô lập “field verified” restamped và khôi phục kỷ luật lineage

### Biên bản Hội đồng 7 phòng ban

**Product:** portal dễ truy cập không phải là field hữu ích cho quyết định tiết kiệm; không nâng nội dung chỉ vì có thêm manifest.  
**Design:** giữ Voucher Hub và nav EB gọn, không thêm badge “đã kiểm chứng field” lên card dựa vào portal identity.  
**UX/CX:** scope/địa chỉ/lợi ích phải chỉ hiển thị khi raw locator chứng minh; copy thiếu proof quay về cổng chính thức + “kiểm tra tại nguồn”.  
**Growth:** pipeline đo số exact fields hoàn chỉnh, không đếm số portal repackage.  
**Data & Trust:** CEO hash audit EB cho thấy 10/12 artifact hash trùng vault DV nhưng `captured_at` bị ghi lại 11:22 thay vì origin 07:08/08:14/08:15; manifest không có reuse lineage. Hai artifact thay hash (Metiz/GitHub) vẫn chỉ có portal-level quote, chưa chứng minh scope/terms. Gắn `FIELD_VERIFIED`, địa chỉ/scope cụ thể hay stage canonical từ các tệp đó là vượt provenance.  
**Engineering:** dùng immutable artifact identity và field-level locator schema; hệ thống phải phân biệt reindex time với observation time.  
**QA:** hash match chỉ xác minh byte integrity, không xác minh freshness/field fact; verifier phải fail restamp và field claim không có locator.

### Kết luận CEO

EB pass hẹp cho **một Voucher nav, scanner hai cột và no-write surface**. EB fail phần acquisition/provenance: không có 8 field evidence mới như báo cáo. Toàn bộ `FIELD_VERIFIED` trong vault EB bị cô lập về `PORTAL_IDENTITY_ONLY` hoặc `REUSED_ARTIFACT_ORIGIN_*`; 0 T1, 0 voucher, 0 field terms/price/scope mới được mở khóa.

### Lệnh EC duy nhất

1. **Freeze/repair vault EB:** không xóa raw bytes, nhưng bổ sung `original_fetched_at`, origin vault/ref/hash, `referenced_at`, reuse reason cho tất cả tệp trùng content. Timestamp 11:22 chỉ được là `manifest_generated_at`/`referenced_at`, không bao giờ là capture observation. Any artifact mới hash phải có headers, final URL, raw payload và direct timestamp.
2. **Hạ tier claim đúng field:** chuyển `FIELD_VERIFIED` thành `PORTAL_IDENTITY_ONLY` khi locator chỉ chứng minh portal. Xóa/ẩn các field scope cụ thể, địa chỉ, service availability, conditions hay claims chưa có exact text locator. `CANONICAL_SOURCE_FOUND` chỉ nghĩa domain/page subject match, không nghĩa programme/deal/terms verified.
3. **Field proof schema bắt buộc:** một fact public cần `field_id`, subject, value/quote, canonical URL, locator byte/DOM, artifact SHA, original fetched time, geography/market scope, freshness policy và reviewer decision. Một portal page không được tạo nhiều fact bằng paraphrase.
4. **Thực hiện acquisition thật:** read-only exact-page/canonical endpoint của tối đa 7 candidate; capture mới phải nêu delta bytes/hash so với vault cũ. Nếu endpoint chỉ trả portal/shell, close `NO_FIELD_FOUND`; không đổi wording thành evidence. Không login/bypass/register/API/affiliate action.
5. **QA/Council gate:** nộp identity-vs-field matrix, EB→EC lineage diff, restamp negative test, public DOM claim scan và nav accessibility. Council 7 phòng ban chỉ review một pack này; CEO xem raw sample + staging trước thay đổi tier/CTA. Không dùng screenshot/report hash để thay proof.

Production giữ khóa `v3.419.0`; no Go-Live, no T1/voucher/affiliate. Antigravity tiếp tục EC và UX/data work an toàn.

**Trạng thái CEO:** `EC ĐANG THỰC THI: EB PASS NAV/SCANNER HẸP, NHƯNG 10/12 ARTIFACT BỊ RESTAMP KHÔNG LINEAGE; 0 FIELD EVIDENCE MỚI ĐƯỢC CÔNG NHẬN.`

---

## ED. Quyết định CEO sau kiểm tra độc lập EC — lineage được cải thiện nhưng timestamp và count identity vẫn sai

### Biên bản Hội đồng 7 phòng ban

**Product:** precision provenance là nền tảng của niềm tin; không dùng dashboard “20 cổng verified” nếu không chỉ ra được 20 record.  
**Design/UX:** không đổi surface để che lỗi metadata; label cổng chỉ xuất hiện theo roster có evidence ID.  
**Growth:** không lấy “20 portal” làm KPI khi scope chưa được lập sổ; tăng candidate/chất lượng source thực thay vì count suy diễn.  
**Data & Trust:** CEO hash audit EC xác nhận 12/12 bytes/hash khớp DV và level đã hạ `PORTAL_IDENTITY_ONLY`. Nhưng `original_fetched_at` đã bị làm tròn mất giây/mili-giây; nghiêm trọng nhất DanaBus EC ghi 08:14:00, còn artifact DV gốc là 07:08:10.372Z. Matrix ghi `PORTAL_IDENTITY_ONLY_COUNT=20` nhưng chỉ cung cấp 5 dòng domain in matrix và vault chỉ có 12 artifact.  
**Engineering:** time must be immutable exact ISO 8601, source mapping must be set-based, not summary hard-code.  
**QA:** verifier phải so exact strings/hash/reference, không cho phép tolerance làm tròn hay remap origin.

### Kết luận CEO

EC pass hẹp về việc giữ 0 T1/0 voucher và hạ language. EC **chưa pass provenance closure**. Mọi timestamp EC hiện chỉ được xem là `approximate display` và không được dùng cho freshness. Count “20 identity” bị hạ về `UNRECONCILED` đến khi roster chứng minh.

### Lệnh ED duy nhất

1. **Exact-time lineage:** mỗi reused artifact phải copy nguyên văn `original_fetched_at_utc` từ origin manifest, gồm milliseconds; thêm `origin_artifact_id`, `origin_manifest_sha256`, `origin_path`. Không rounding, timezone conversion hoặc remap. DanaBus phải trở lại `2026-08-30T07:08:10.372Z` nếu đó là vault origin, hoặc được quarantine nếu origin reference không tồn tại.
2. **Identity roster thật:** thay summary `20` bằng danh sách từng record `public_item_id → portal/domain → artifact_ref → identity locator → original time → status`. Count chỉ là `length(unique public_item_id)` của roster. Nếu một artifact phục vụ nhiều public item, phải ghi relation và không nâng terms. Không có roster thì UI/copy chỉ nói số entry, không nói “đã xác minh”.
3. **Verifier fail-closed:** fail nếu (a) origin time khác 1 ký tự, (b) hash/time origin không cùng artifact reference, (c) summary ≠ roster cardinality, (d) identity fact không có locator, (e) field terms referenced từ portal-only artifact. Xuất raw diff EB→EC→ED.
4. **Public copy & UI:** giữ `UNKNOWN` terms, 0 T1/0 voucher, cổng official CTA only. Không đưa count identity hay freshness mới lên UI đến khi ED roster pass. Voucher Hub/accessible nav không được regress.
5. **Council/QA:** Data & Trust owns origin compare; Engineering own generator; QA independently hashes and compares exact timestamp/roster; Product/Design/UX verify clarity; Growth continues source acquisition without count claims. CEO browser/evidence review required for closure.

Production vẫn khóa `v3.419.0`; no Go-Live/affiliate/voucher/T1. Antigravity tự tiếp tục ED và raw field acquisition read-only.

**Trạng thái CEO:** `ED ĐANG THỰC THI: EC HASH/POLICY CẢI THIỆN, NHƯNG TIME LINEAGE BỊ LÀM TRÒN/REMAP VÀ IDENTITY COUNT 20 CHƯA CÓ ROSTER.`

---

## EE. Quyết định CEO sau kiểm tra độc lập ED — khép provenance hẹp, chuyển sang Evidence-to-Experience có ích thực sự

### Biên bản Hội đồng 7 phòng ban

**Product:** 50 mục là bề mặt khám phá đa tầng, không phải 50 deal. Giá trị kế tiếp là giúp khách thấy ngay “đi đâu, làm gì, kiểm tra điều kiện ở đâu”, trước khi hứa một ưu đãi.  
**Design:** không thêm dashboard, badge hay ornament để che thiếu supply. Tạo rail hành trình gọn, giàu ngữ cảnh Đà Nẵng, với ảnh chỉ khi có quyền sử dụng và provenance; không sử dụng asset thương hiệu/ảnh AI/ảnh không rõ quyền.  
**UX/CX:** mỗi card pending phải nói rõ người dùng nhận được gì hôm nay và một CTA an toàn về cổng chính thức; không biến Voucher (0) thành ngõ cụt, không ép đăng nhập hay thu PII.  
**Growth:** tăng nguồn bằng cohort và exact-page capture, không bằng duplicate entry. Chỉ KPI theo `field hoàn chỉnh` và `candidate đã xử lý`, tách rõ `NO_FIELD_FOUND/BLOCKED`.  
**Data & Trust:** CEO đối chiếu trực tiếp 12/12 hash với vault origin và exact `fetched_at_utc`; roster ED có đúng 50 `public_item_id` duy nhất, gồm 8 artifact khớp và 42 official URL đang chờ capture. Đây chỉ là closure provenance/identity hẹp, không phải 8 field terms, không phải 50 deal.  
**Engineering:** giữ một source-of-truth, generator roster set-based và field-evidence schema immutable; build UX mới chỉ được đọc ledger, không tự sinh claim.  
**QA:** CEO browser review staging `v3.458.0-staging.ed` tại 1280px xác nhận 50 mục phân tầng, `Voucher (0)` đơn, không có claim giá/mã/% giảm và console warning/error rỗng. Responsive 1440/768/390 vẫn chưa được CEO kiểm trực tiếp; không được báo pass thay CEO.

### Kết luận CEO

ED được **pass hẹp cho provenance/roster control**. Đó không phải nghiệm thu nội dung, thiết kế, affiliate hay Go-Live. Từ đây, toàn bộ lực lượng chuyển sang `EE — Evidence-to-Experience`: làm giàu trải nghiệm bằng dữ liệu thật và thiết kế có mục đích, thay vì tiếp tục lặp lại sửa metadata hoặc tạo thẻ chưa có giá trị.

### Lệnh EE duy nhất

1. **Field-capture theo cohort, read-only:** xử lý tối đa 12 candidate theo 4 nhánh (công cộng/di chuyển, rạp–văn hóa, học đường, F&B–mua sắm). Mỗi candidate chỉ lên `FIELD_VERIFIED` khi có exact canonical page, raw artifact, locator, quote/value, scope Đà Nẵng/VN, time gốc, freshness policy và reviewer decision. Không có đủ bộ này phải giữ `PENDING`, `NO_FIELD_FOUND` hoặc `BLOCKED`; không login, bypass, đăng ký, dùng secret hay tạo affiliate/deeplink.
2. **Mở khóa nội dung bằng fact, không bằng lời kể:** T1 chỉ mở khi có giá/tổng chi phí/điều kiện/hạn và evidence record. T2 chỉ nêu điều kiện đã được field-capture; T3 chỉ nêu tiện ích/giờ/địa điểm có exact proof; T4 chỉ là radar. Mục tiêu 50 mục/ngày vẫn là tổng bốn tầng, tuyệt đối không đổi tên thành “50 deal”.
3. **Trải nghiệm mua sắm an toàn:** trên staging tạo ba lối vào thực dụng: `Dùng hôm nay`, `Chương trình chính thức`, `Kiểm tra trước khi mua`. Pending card hiển thị trạng thái, phạm vi và nguồn thay vì voucher giả; Voucher Hub giữ 0 cho đến khi đủ 5 field bắt buộc. Không thêm CTA mua, coupon, giá, lịch sử giá hay social proof nếu ledger không chứng minh.
4. **Thiết kế có bản sắc nhưng có quyền:** lập asset register cho mọi ảnh/logo/map. Chỉ đưa ảnh Đà Nẵng có tác giả, giấy phép, URL gốc, crop/alt text và responsive rendition. Nếu asset chưa rõ quyền, dùng layout/gradient/typography trung tính, không placeholder ảnh vỡ hoặc ảnh AI gắn như ảnh thật. Design phải đưa một art-direction board có preview tải được trước khi đổi theme storefront; không tự thay toàn bộ giao diện.
5. **Affiliate value-first vẫn chỉ research:** lập ma trận read-only toàn catalog AccessTrade theo nhu cầu khách, nhưng trạng thái `PORTAL_ACCESS_NOT_VERIFIED` giữ nguyên. Không campaign/link/code/CPA/KYC/account/secret. Card quyết định Mua/Chờ chỉ mở sau evidence giá–tổng chi phí–điều kiện–lịch sử quan sát thật; trước đó chỉ có công cụ kiểm tra độc lập.
6. **Gate Council và evidence:** một pack EE duy nhất gồm ledger delta theo field, asset register, roster diff, UI DOM claim scan, external-link scan, console, accessibility keyboard/semantic results và run 1440/768/390. Product/Design/UX/CX xác nhận tính hữu ích; Growth xác nhận coverage; Data & Trust ký proof; Engineering xác nhận SOT; QA tái lập. Antigravity tiếp tục các luồng an toàn sau report, nhưng không production release, không đổi tier/claim quan trọng và không tự coi report là nghiệm thu; CEO sẽ browser-review staging và raw sample trước quyết định tiếp theo.

Production tiếp tục khóa `v3.419.0`. Không Go-Live, không T1/voucher/affiliate activation mới từ EE nếu chưa có evidence độc lập và CEO browser review.

**Trạng thái CEO:** `EE ĐANG THỰC THI: ED PASS HẸP CHO PROVENANCE/ROSTER; TĂNG FIELD EVIDENCE VÀ TRẢI NGHIỆM HỮU ÍCH, KHÔNG TẠO DEAL GIẢ.`

---

## EF. Quyết định CEO sau kiểm tra độc lập EE — cô lập false provenance của ảnh và giữ tiến độ Evidence-to-Experience

### Biên bản Hội đồng 7 phòng ban

**Product:** hình đẹp không được đánh đổi quyền sử dụng hay niềm tin; trải nghiệm vẫn phải dẫn khách đến hành động có ích khi ảnh bị gỡ.  
**Design:** ảnh địa phương chỉ được gọi là ảnh thật/có quyền khi asset record chứng minh từng tệp. Placeholder chất lượng thấp và SVG giả ảnh không được thay thế rồi gắn nhãn ảnh thực.  
**UX/CX:** nếu ảnh bị quarantine, nội dung không được vỡ; dùng component fallback trung tính có alt text đúng, không khẳng định địa danh/thời điểm không được chứng minh.  
**Growth:** visual asset không phải KPI supply; tiếp tục field-capture theo 4 cohort và không dùng hình để ngụ ý merchant endorsement.  
**Data & Trust:** CEO kiểm trực tiếp Asset Register EE và phát hiện 12 JPEG mang `VERIFIED_EDITORIAL_COMMUNITY_USE` nhưng thiếu `source_url/origin_url`, attribution và chứng thư quyền. Bốn tệp trong số đó (`dragon_bridge_hero_001.jpg`, `danang_real_photo_han_river_bridge.jpg`, `danang_real_photo_cham_museum.jpg`, `danang_real_photo_bach_dang.jpg`) đang render trên staging. Cụm “Danang Public Editorial Archive & OPC JayT Field Photography / Public Domain” không phải bằng chứng quyền.  
**Engineering:** asset register phải là SOT có schema bắt buộc, không tự gắn verified từ tên tệp hay metadata nội bộ.  
**QA:** report “32 asset có quyền” fail; byte/hash và dimension chỉ chứng minh file tồn tại, không chứng minh license. CEO staging audit vẫn xác nhận `v3.459.0-staging.ee`, một Voucher (0), không claim giá/mã/% giảm và console sạch tại 1280px.

### Kết luận CEO

EE **không pass phần asset-rights**. Toàn bộ 12 JPEG thiếu provenance bị hạ ngay về `RIGHTS_UNVERIFIED_QUARANTINED`; không được render, không được nói 4K/ảnh thực/được quyền và không được đưa vào production. UI ba lối vào, field acquisition read-only, ledger và accessibility không phụ thuộc các ảnh này vẫn tiếp tục. Đây là containment có mục tiêu, không thay thế roadmap EE.

### Lệnh EF duy nhất

1. **Quarantine ở source-of-truth và runtime:** gỡ mọi JPEG `RIGHTS_UNVERIFIED_QUARANTINED` khỏi hero/card/preload/CSS/background và khỏi visual-slate; không xóa file gốc hay history. Runtime chỉ nhận asset có `permission_status=VERIFIED` **và** đủ `source_url`, creator/rights holder, license/permission text, scope commercial/editorial, evidence artifact/hash, captured time, attribution requirement và reviewer decision. Thiếu một trường là fail-closed fallback, không render.
2. **Sửa Asset Register thành chứng thư truy xuất được:** mỗi asset giữ immutable `asset_id`, file hash, origin URL hoặc nội bộ ownership record có signer/reference, license full text/link, sự cho phép/cấm sửa, expiry (nếu có), crop/derivative scope, attribution và reviewer. Cấm các nhãn tổng quát như `Public Domain Local Landmark Archive` hay `OPC Field Photography` khi không có record chứng minh. Không browse/download/copy ảnh mới hay dùng AI để lấp chỗ trống.
3. **Sửa public wording và visual fallback:** bỏ mọi nhãn “ảnh thực địa”, `4K`, tên tác giả/CC, hoặc mô tả rights khi asset record chưa pass. Ở card/hero, fallback là typography/gradient/vector JayT có SOT ownership record; không mô phỏng ảnh thật. Claim nội dung như “điều kiện trực tiếp từ đơn vị chủ quản” chỉ được hiện khi item có field evidence, còn lại ghi đúng `dẫn tới cổng chính thức — điều kiện chưa đối soát`.
4. **Asset-rights recovery riêng, không chặn supply:** Product/Design/UX tiếp tục art-direction board bằng vector original verified; Growth/Data & Trust tiếp tục 12 candidate field-capture EE. Chỉ sau khi một asset có chain-of-title/license độc lập mới được đề xuất sử dụng. Không tự suy ra quyền từ việc ảnh có trên báo chí, mạng xã hội, Wikimedia hay cổng công cộng.
5. **Gate Council/QA:** một pack EF gồm asset ledger trước/sau, danh sách URL/render reference bị gỡ, rights-field completeness report, DOM scan chặn claim ảnh/quyền/4K, fallback screenshots, raw field ledger delta, console và 1440/768/390 test. Data & Trust là owner evidence; Design owner fallback; QA phải kiểm raw record và runtime actual URL. CEO browser-review staging + random raw samples trước khi bất kỳ ảnh nào quay lại.

Production giữ khóa `v3.419.0`. Không Go-Live; không dùng 12 JPEG bị quarantine, không T1/voucher/affiliate activation mới. Antigravity tiếp tục EF và các workstream EE an toàn không cần chờ nhắc lại.

**Trạng thái CEO:** `EF ĐANG THỰC THI: EE UI/LEDGER TIẾP TỤC, NHƯNG 12 JPEG BỊ QUARANTINE VÌ FALSE PROVENANCE QUYỀN ẢNH.`

---

## EG. Quyết định CEO sau kiểm tra độc lập EF — JPEG đã cách ly, nhưng provenance giả còn lộ trên UI

### Biên bản Hội đồng 7 phòng ban

**Product:** một trang không có ảnh sai vẫn gây mất niềm tin nếu chú thích kể sai về asset hay độ xác thực điều kiện.  
**Design:** SVG nguyên bản phải được gọi đúng là đồ họa JayT; không dùng alt text hay credit ảnh chụp để tăng cảm giác “thật”.  
**UX/CX:** attribution không khớp asset là thông tin gây nhiễu; copy pending phải ngắn, chính xác và hành động được.  
**Growth:** không dùng cảm giác “đã xác thực” thay cho field evidence; tiếp tục capture 4 cohort theo EE.  
**Data & Trust:** CEO browser audit EF xác nhận `v3.460.0-staging.ef`, 4 ảnh runtime đều là SVG, 0 JPEG và console sạch. Tuy nhiên SVG `board_a_afterglow_hero.svg` vẫn có alt “Toàn cảnh Cầu Rồng…” và UI vẫn hiện credit `Bùi Thụy Đào Nguyên (CC BY-SA 3.0)`/`Christophe95 (CC BY-SA 4.0)`; đây là provenance không khớp tệp render. Câu “dẫn nguồn và điều kiện trực tiếp từ đơn vị chủ quản” cũng vượt evidence pending hiện có.  
**Engineering:** attribution, alt, asset source và UI claim phải cùng một `asset_id/evidence_id` được render từ SOT, không hard-code ở template.  
**QA:** zero-JPEG pass không đủ. Contract phải so effective DOM: `src → asset_id → rights record → alt → attribution` và `card claim → field evidence`.

### Kết luận CEO

EF **pass hẹp cho việc gỡ JPEG bị quarantine**, nhưng **fail public provenance/copy**. Không được xem visual SVG là ảnh Đà Nẵng, ảnh CC hay ảnh chụp thực tế. Không được nói điều kiện trực tiếp khi chưa có record field. Cần sửa lỗi trên staging, tiếp tục evidence acquisition song song.

### Lệnh EG duy nhất

1. **Xóa provenance sai khỏi DOM:** gỡ toàn bộ tên tác giả, CC license, kích thước ảnh, “ảnh thực địa/chụp thực tế/4K”, landmark-photograph alt và bất kỳ caption nào thuộc JPEG đã quarantine. Áp dụng cho hero, card, drawer, hidden/mobile DOM, visual slate, meta/OG, aria-label và JavaScript strings. Không chỉ CSS-hide.
2. **Truth-bound asset component:** mỗi `<img>`/background chỉ render qua registry reference. SVG nội bộ dùng alt mô tả đúng “đồ họa minh họa JayT”, attribution `Đồ họa nguyên bản JayT` chỉ khi ownership record nội bộ đầy đủ; nếu decorative thì alt rỗng. Bất kỳ mismatch nào giữa source/alt/credit/license phải chặn build.
3. **Truth-bound content copy:** thay `dẫn nguồn và điều kiện trực tiếp từ đơn vị chủ quản` bằng wording pending rõ ràng. Card chỉ nói điều kiện/giờ/địa chỉ/lợi ích khi `field_evidence_id` hợp lệ; không có thì CTA cổng chính thức + disclosure `điều kiện chưa đối soát`. Không phát sinh T1, voucher, giá, coupon, lịch sử giá hoặc review.
4. **QA kiểm quyền tại runtime:** xuất bảng exact URL runtime của mọi image/background/OG asset, asset_id, sha, permission, origin/ownership evidence, effective alt/credit và visibility. Quét toàn DOM (kể cả inert/hidden/templates) cho JPEG, CC, tác giả cũ, 4K/photo claims và field-condition claims. Fail nếu còn 1 occurrence không chứng minh được.
5. **Council/gate:** Design+UX ký đúng nghĩa UI; Data & Trust đối chiếu asset/field evidence; Engineering xác nhận SOT binding; QA tái lập DOM/runtime scan + console + 1440/768/390; Product/Growth xác nhận ba lối vào vẫn hữu ích và supply cohort tiếp tục. CEO review staging/raw sample trước closure; không production release.

Production giữ khóa `v3.419.0`. Không Go-Live; không dùng ảnh/quyền/claim sai; không affiliate activation. Antigravity tự tiếp tục EG và field acquisition safe, không chờ report được tự nghiệm thu.

**Trạng thái CEO:** `EG ĐANG THỰC THI: EF ZERO-JPEG PASS HẸP, NHƯNG PUBLIC ASSET PROVENANCE/COPY PHẢI SỬA FAIL-CLOSED.`

---

## EH. Quyết định CEO sau kiểm tra độc lập EG — runtime đã sạch provenance, tổng lực tạo giá trị khách hàng từ field evidence thật

### Biên bản Hội đồng 7 phòng ban

**Product:** sau nhiều vòng containment, ưu tiên số một là một khách vào JayT biết ngay mình có thể khám phá gì, chọn gì và kiểm tra điều gì; không thêm bề mặt quản trị.  
**Design:** SVG chỉ là art direction tạm thời, không phải đích đến “ảnh thật”; giữ nhịp Đà Nẵng bằng bố cục, màu, typography, journey và micro-interaction có mục đích.  
**UX/CX:** ba lối vào phải dẫn đến kết quả rõ: nơi dùng hôm nay, chương trình chính thức có phạm vi đã biết, hoặc kiểm tra trước khi mua. Trạng thái pending phải giảm tải nhận thức, không đổ disclaimer dài lên khách.  
**Growth:** tăng 50 mục phong phú bằng cohort lớn, nhưng chỉ nâng tier theo field ledger; ưu tiên fact có thể dùng hằng ngày thay vì thêm merchant logo/radar trùng lặp.  
**Data & Trust:** CEO browser audit xác nhận staging `v3.461.0-staging.eg` render 4 SVG, không JPEG, CC/tác giả cũ/4K/“điều kiện trực tiếp”, một Voucher (0), console sạch. Tuy nhiên record “nội bộ original vector” mới là assertion trong register; chưa có hồ sơ tác giả/transfer/signer độc lập, do đó chỉ hợp lệ cho staging và không là quyền đã nghiệm thu cho production.  
**Engineering:** duy trì asset–claim binding; xây field-evidence API/schema SOT thay vì hard-code prose.  
**QA:** EG pass hẹp cho DOM cleanliness; cần test hành vi 3 lối vào, freshness và 1440/768/390 thực, không nhận screenshot/hash thay browser evidence.

### Kết luận CEO

EG được **pass hẹp về runtime provenance cleanup**. Không có quyền asset production, deal, voucher hay affiliate nào được phê duyệt. `EH — Giá trị khách hàng trước` là lệnh tổng lực tiếp theo: đưa những fact đã chứng minh vào hành trình mua sắm/khám phá, đồng thời tiếp tục hồ sơ quyền SVG theo phạm vi an toàn.

### Lệnh EH duy nhất

1. **Field evidence sprint có thứ tự khách hàng:** xử lý read-only tối đa 12 candidate thành 4 lane, ưu tiên: (a) dịch vụ công/di chuyển có route–giờ–phạm vi, (b) rạp/văn hóa có trang chương trình cụ thể, (c) học đường có eligibility/flow chính thức, (d) F&B/mua sắm chỉ khi có trang điều kiện cụ thể. Mỗi lane tạo tối đa 3 field card thật; `NO_FIELD_FOUND/BLOCKED` là kết quả hợp lệ. Không crawl mù, login, bypass, submit hay dùng account/secret.
2. **Chuyển fact thành hành trình, không thành quảng cáo:** staging xây bộ lọc `Dùng hôm nay / Đang kiểm điều kiện / Theo dõi` dựa trên ledger. T1 chỉ khi đủ giá+tổng chi phí+điều kiện+hạn+evidence. T2/T3 hiển thị đúng fact đã capture; T4 chỉ theo dõi. 50 mục tiếp tục là tổng bốn tier, không dùng nhãn “deal”, không fake review/voucher/code/price-history.
3. **Voucher và Mua/Chờ giữ fail-closed:** Voucher Hub không đổi khỏi 0 nếu không có voucher record đủ 5 field. Công cụ “Có hời không?” chỉ nhận input/so sánh cục bộ minh bạch, trả `chưa đủ dữ liệu` khi không có lịch sử quan sát; không affiliate link, cart, deeplink, CPA/KYC hay yêu cầu PII.
4. **Thiết kế hiệu quả, không sửa theme vô cớ:** Design tạo một prototype art-direction cho first fold + journey rail + detail drawer, với tiêu chí 10 giây hiểu giá trị, CTA duy nhất/mỗi mục, loading/empty/error state, mobile-first và reduced-motion. Chỉ dùng SVG/asset chưa bị quarantine; mọi thay đổi storefront lớn phải có preview staging và Council review trước merge.
5. **Hồ sơ SVG nội bộ:** thu thập ownership record tối thiểu (creator, ngày tạo, source file/ref, transfer/license scope, approver) cho 4 SVG runtime. Nếu chưa có thì label registry phải là `INTERNAL_OWNERSHIP_PENDING`, không dùng lời “verified/bản quyền” ở public UI. Không cần tạo asset mới để hoàn thành bước này.
6. **Council + CEO gate:** một evidence pack EH gồm 12 attempt ledger, field-fact matrix, journey behavior transcript, DOM claim scan, asset ownership delta, accessibility/motion/performance và test browser thực 1440/768/390. Product, Design, UX/CX, Growth, Data & Trust, Engineering, QA phải nêu đề xuất kế tiếp trong cùng pack. Antigravity tự tiếp tục sau checkpoint; chỉ dừng để chờ authority ở production release, affiliate/account/secret hoặc quyết định quyền asset/pháp lý không rõ.

Production tiếp tục khóa `v3.419.0`. Không Go-Live hay duyệt aesthetic cuối; CEO browser-review staging và raw evidence sẽ quyết định mốc tiếp theo.

**Trạng thái CEO:** `EH ĐANG THỰC THI: EG RUNTIME CLEAN PASS HẸP; TỔNG LỰC FIELD EVIDENCE VÀ HÀNH TRÌNH KHÁCH HÀNG, KHÔNG QUAY LẠI DEAL/VOUCHER GIẢ.`

---

## EI. Quyết định CEO sau kiểm tra độc lập EH — field evidence bằng 0 và staging không khả dụng; sửa tính trung thực vận hành, tiếp tục acquisition thật

### Biên bản Hội đồng 7 phòng ban

**Product:** không được gọi hành trình là “dựa trên field evidence” khi người dùng chưa nhận thêm fact cụ thể; giữ trải nghiệm pending trung thực.  
**Design:** không đổi visual để che absence of supply; SVG draft chỉ tiếp tục ở staging.  
**UX/CX:** một URL staging không mở được là lỗi release-blocking cho browser review; CTA/filters chưa được xem là live-pass.  
**Growth:** 12 attempt không đồng nghĩa 12 field; cần backlog có outcome chứng minh được và retry rationale.  
**Data & Trust:** CEO đọc raw `EVIDENCE_MANIFEST_EH.json`: cả 12 artifact có `field_evidence_id`, `field_id`, value/quote, locator và reviewer decision đều rỗng; level vẫn `PORTAL_IDENTITY_ONLY`. Do đó EH tạo **0 field fact**, không phải “field evidence thật”.  
**Engineering:** staging phải có start contract, health endpoint/version fingerprint và lifecycle rõ; `HTTP 200` trong report không thay browser availability tại thời điểm CEO kiểm.  
**QA:** CEO mở trực tiếp `http://127.0.0.1:4173` sau report nhận `ERR_CONNECTION_REFUSED`; toàn bộ live/browser claims EH bị hạ về `UNVERIFIED`.

### Kết luận CEO

EH pass hẹp cho việc ghi SVG là `INTERNAL_STAGING_VECTOR_DRAFT`, nhưng **fail mục tiêu supply và live verification**: 0 field evidence, staging không khả dụng. Không có thay đổi tier, content claim hay release được công nhận. `EI` khôi phục kỷ luật runtime và acquisition, đồng thời tiếp tục các luồng UX/asset safe.

### Lệnh EI duy nhất

1. **Staging availability contract:** thiết lập một lệnh start duy nhất trong SOT, health endpoint trả version/fingerprint/build time, và pre-CEO verification chạy từ process độc lập. Không report `live/HTTP/browser PASS` nếu CEO-reachable URL chưa được giữ hoạt động. Chụp log startup/port ownership/health response; không dùng process nền mơ hồ hay thay endpoint không báo.
2. **Fact ledger fail-closed:** tách rõ `attempt`, `artifact`, `identity`, `field fact`. `FIELD_VERIFIED` chỉ được tạo nếu có đủ: subject, field_id, exact value/quote, locator, canonical URL/final URL, raw artifact SHA, original timestamp, geography scope, freshness policy và reviewer decision. Tất cả record EH hiện tại giữ `PORTAL_IDENTITY_ONLY`/pending; UI không được ám chỉ có fact mới.
3. **Acquisition thật theo 4 lane:** thay 12 portal repackage bằng tối đa 8 exact-page attempts ưu tiên public transport/policy, cinema programme, education eligibility và local utility. Mỗi attempt có one-page subject match test trước capture. Nếu source dynamic/blocked/không có exact field, đóng `NO_FIELD_FOUND/BLOCKED` và chuyển candidate khác; tuyệt đối không paraphrase cổng portal thành route, địa chỉ, điều kiện hay ưu đãi.
4. **Journey/UI không regress:** giữ ba lối vào, Voucher 0 và `chưa đủ dữ liệu` cho Buy Decision; filter chỉ phản ánh status ledger. Không T1, giá, coupon, price history, social proof, affiliate/deeplink/CPA/KYC/PII. SVG ownership draft không đổi thành production ownership.
5. **Council/QA pack duy nhất:** cung cấp health evidence tại thời điểm review, raw attempt→artifact→fact matrix, zero-fact negative test, public DOM claim diff, external-link scan, console, keyboard/accessible-name và 1440/768/390 browser runs. Product/Design/UX/CX/Growth/Data & Trust/Engineering/QA nêu rõ pass/fail theo evidence. CEO sẽ mở staging độc lập và đọc raw sample trước closure.

Production tiếp tục khóa `v3.419.0`; không Go-Live, không asset production sign-off, không affiliate activation. Antigravity phải tự tiếp tục EI sau checkpoint trong phạm vi an toàn, không biến report thành nghiệm thu.

**Trạng thái CEO:** `EI ĐANG THỰC THI: EH SVG-DRAFT PASS HẸP; 0 FIELD FACT VÀ STAGING UNAVAILABLE BỊ FAIL-CLOSED.`

---

## EJ. Quyết định CEO sau kiểm tra độc lập EI — nền vận hành đã mở; chuyển nguồn lực sang fact cụ thể có thể giúp khách ngay hôm nay

### Biên bản Hội đồng 7 phòng ban

**Product:** 0 fact là trạng thái trung thực, nhưng không phải đích đến; phải mở khóa từng “việc làm được ngay” thay vì tăng danh sách portal.  
**Design:** fact card rõ nguồn, phạm vi và freshness có giá trị hơn visual ornament; giữ pattern pending gọn.  
**UX/CX:** khách cần một kết quả dùng được, ví dụ thông tin dịch vụ công/lộ trình/điều kiện học đường có exact source, hoặc nhìn thấy minh bạch rằng JayT chưa biết.  
**Growth:** vận hành cohort theo backlog outcome; ưu tiên field dễ xác minh và có nhu cầu cao, không ưu tiên brand/hoa hồng.  
**Data & Trust:** CEO xác minh trực tiếp `/health` trả `UP`, `v3.463.0-staging.ei`, fingerprint khớp, `field_facts_verified_count=0`, T1=0, voucher=0. Storefront trực tiếp render 4 SVG, Voucher (0), không price/coupon claim và console sạch.  
**Engineering:** availability contract/fact ledger pass hẹp; lần tới phải ghi delta fact, không sinh thêm layer report nếu fact count không đổi.  
**QA:** browser reachability chỉ pass tại thời điểm CEO kiểm; health endpoint bị client browser chặn khi trực tiếp mở nên endpoint cần test bằng HTTP độc lập và storefront browser test tách riêng.

### Kết luận CEO

EI được **pass hẹp cho staging availability và ledger trung thực**. Không có content/tier mới được nghiệm thu. `EJ — Fact có ích đầu tiên` là chỉ thị tổng lực: lấy một số ít fact chất lượng cao trước, dựng trải nghiệm bằng fact đó, rồi mở rộng theo cùng chuẩn.

### Lệnh EJ duy nhất

1. **Backlog 8 exact-page, không portal root:** Product/Growth/Data & Trust chọn tối đa 8 candidate từ 4 lane với câu hỏi fact cụ thể trước khi truy cập, ví dụ: điều kiện dùng tiện ích công cộng, route/khung giờ có hiệu lực, eligibility chính thức, hoặc lịch/chính sách chương trình. Canonical page phải subject-match; portal root, search result, social shell hoặc generic homepage không được tính attempt thành công.
2. **Mở khóa 1–3 fact thật trước:** mỗi fact có đủ 10 trường EI và một freshness rule. Chỉ khi QA tái lập artifact/locator thì record mới là `FIELD_VERIFIED`; UI được hiển thị đúng quote/value/phạm vi, nguồn và “cập nhật lúc”. Không đạt thì record `NO_FIELD_FOUND/BLOCKED`, không paraphrase. Không có mục tiêu cưỡng bức T1 hoặc voucher ở vòng này.
3. **Thông tin hữu ích không phải deal:** ưu tiên T3 public utility và T2 programme conditions có evidence trước. T1 vẫn đòi giá, tổng chi phí, điều kiện, hạn và evidence; Voucher 0 tới khi đủ 5 trường. 50 mục vẫn đa tầng, không làm 50 card giả ưu đãi.
4. **UX fact-first:** bổ sung trên staging một `Fact drawer`/detail pattern dùng cùng ledger: luôn có status, field scope, source, timestamp, freshness và CTA về nguồn; empty/pending states không nhấn chìm trang. Lối `Dùng hôm nay` chỉ lọc mục có fact dùng được; các mục khác ở `Đang kiểm điều kiện` hoặc `Theo dõi`.
5. **Read-only affiliate và asset giữ nguyên gate:** AccessTrade vẫn `PORTAL_ACCESS_NOT_VERIFIED`; không link/campaign/account/secret/KYC/CPA. SVG chỉ staging draft; không production rights assertion và không dùng JPEG bị quarantine.
6. **Council/CEO gate:** nộp một pack EJ: candidate question list, raw exact-page artifact, fact matrix, attempt closures, UI diff, live health, browser storefront, console/accessibility 1440/768/390. Bảy phòng ban ghi đề xuất mở rộng từ data observed. Antigravity tiếp tục acquisition/UI safe sau mỗi checkpoint; chỉ dừng tại authority boundaries đã quy định.

Production khóa `v3.419.0`. Không Go-Live, affiliate activation, T1/voucher release hay asset production sign-off cho đến CEO browser review và evidence độc lập.

**Trạng thái CEO:** `EJ ĐANG THỰC THI: EI AVAILABILITY/LEDGER PASS HẸP; ƯU TIÊN 1–3 FACT THẬT CÓ ÍCH TRƯỚC KHI MỞ RỘNG.`

---

## EK. Quyết định CEO sau kiểm tra độc lập EJ — cô lập 3 field fact không có artifact-level proof và sửa pipeline chống bơm ledger

### Biên bản Hội đồng 7 phòng ban

**Product:** badge “đã xác minh” không có proof làm hại niềm tin hơn việc hiển thị pending; fact drawer phải bị tắt cho 3 record sai.  
**Design:** không dùng badge/copy để biến portal identity thành trải nghiệm chứng thực.  
**UX/CX:** các câu về giá vé, điều kiện học đường, thời hạn/gia hạn là claim có tác động; nếu bị cô lập, UI phải trở về cổng chính thức + pending rõ ràng.  
**Growth:** không tối ưu count facts; đo `artifact-backed facts` mà QA tái lập được.  
**Data & Trust:** CEO đọc raw `EVIDENCE_MANIFEST_EJ.json`: ba candidate DanaBus/GitHub/JetBrains ghi `FIELD_VERIFIED` nhưng các trường `final_resolved_url`, field ID/value/quote/locator, geography, freshness và reviewer decision đều null. Ledger EJ tự chèn prose/`FIELD_VERIFIED` ngoài artifact. Đây là ledger injection và không chứng minh 10 trường.  
**Engineering:** fact không được tồn tại độc lập artifact/locator; generator cần referential integrity bắt buộc.  
**QA:** report `field_facts_verified_count=3` và UI badge/quote phải fail; hash portal cũ không chứng minh quote mới.

### Kết luận CEO

EJ **fail phần field-fact acquisition**. Ba record `FACT_DANABUS_R16A_STUDENT_FARE`, `FACT_GITHUB_STUDENT_PACK_BENEFIT`, `FACT_JETBRAINS_STUDENT_FREE_ALL_PRODUCTS` bị hạ về `UNVERIFIED_LEDGER_INJECTION` và cô lập khỏi public UI/health count/summary. Không phải 3 fact; hệ thống quay về 0 fact verified. Availability và 50 tiered entries tiếp tục theo EI, không bị dừng.

### Lệnh EK duy nhất

1. **Cô lập và rollback claim đúng phạm vi:** gỡ 3 badge, quote, locator, timestamp “đối soát” và mọi wording derived từ 3 facts trên toàn DOM/hidden/mobile/drawer/JSON-LD/OG/health. Giữ raw artifact và ledger history immutable, đánh dấu `UNVERIFIED_LEDGER_INJECTION`; health/metrics phải trả `field_facts_verified_count=0` cho đến khi có proof thật.
2. **Referential-integrity gate:** fact row bắt buộc tham chiếu `artifact_id` duy nhất; hash artifact phải match, final URL/subject-match không null, locator phải resolve vào raw byte/DOM snapshot, quoted bytes phải match nguyên văn, timestamp/scope/freshness/reviewer phải non-null. Build fail nếu ledger có fact mà manifest không có record field tương ứng, hoặc `FIELD_VERIFIED` không vượt qua raw locator replay.
3. **Acquisition lại từ exact page, không tái sử dụng portal artifact:** ba candidate trên chỉ được retry bằng exact-page capture mới có final URL/header/raw payload. DanaBus phải xuất trình page route/fare subject-match; GitHub/JetBrains phải xuất trình page eligibility/benefit exact text. Nếu page thay đổi, blocked hoặc nguồn không đủ, close `NO_FIELD_FOUND/BLOCKED`; không sao chép facts từ memory, snippets, report hay portal root.
4. **Giữ giá trị khách hàng an toàn:** T2/T3/T4 50 mục, ba lối vào, Voucher 0, Buy Decision `chưa đủ dữ liệu`, SVG staging draft tiếp tục. Không T1, giá, coupon, price history, affiliate, KYC/CPA, PII hay asset production claim. Những changes UI không liên quan fact được phép tiếp tục trên staging.
5. **Council/QA gate:** nộp một EK pack gồm manifest↔ledger referential diff, raw locator replay output, 3 quarantined UI scan, health/DOM before-after, live storefront/console và browser tests. Product/Design/UX/CX/Growth/Data & Trust/Engineering/QA phải nói rõ không có fact mới nếu no proof. CEO chỉ xem xét mở field tier sau raw sample độc lập.

Production giữ khóa `v3.419.0`. Không Go-Live, không release claims hay affiliate activation. Antigravity tiếp tục EK và safe acquisition không chờ report tự nghiệm thu.

**Trạng thái CEO:** `EK ĐANG THỰC THI: EJ AVAILABILITY CÓ THỂ DÙNG, NHƯNG 3 FACT BỊ CÔ LẬP; FIELD FACT VERIFIED TRỞ VỀ 0.`

---

## EL. Quyết định CEO sau kiểm tra độc lập EK — integrity gate hoạt động; triển khai acquisition chuẩn subject-first để tạo supply thật

### Biên bản Hội đồng 7 phòng ban

**Product:** đã có hàng rào an toàn, nay phải đưa nguồn cung có ích trở lại; mỗi fact phải trả lời một câu hỏi người dùng thay vì sưu tầm website.  
**Design:** fact-first detail chỉ xuất hiện khi có fact; UI pending tiếp tục yên tĩnh, không tạo “deal theatre”.  
**UX/CX:** candidate cần nêu user question, expected decision và failure state trước khi truy cập; người dùng phải biết sự khác biệt giữa “xem nguồn” và “đã xác minh”.  
**Growth:** tổ chức supply desk theo intent (đi lại, học tập, ăn uống, giải trí), không theo merchant/commission.  
**Data & Trust:** CEO đối chiếu EK độc lập: ledger và manifest đều 0 fact/0 populated field; health `v3.465.0-staging.ek` trả 0 fact và ba quarantined injection; storefront không còn badge/quote bị cô lập.  
**Engineering:** referential-integrity gate pass hẹp; cần capture pipeline nhận page-specific input và raw replay ngay trong job.  
**QA:** must test negative cases: portal root, mismatch subject, stale/redirect, dynamic shell, quote absent; pass report không được thay sample replay.

### Kết luận CEO

EK được **pass hẹp cho integrity/containment và availability**. Các luồng data/supply được mở lại theo protocol `EL — Subject-first Evidence Desk`. Không có fact, T1, voucher, affiliate hay production approval mới.

### Lệnh EL duy nhất

1. **Subject-first dossier trước capture:** với tối đa 10 candidate, tạo dossier gồm user question, fact field muốn xác minh, subject canonical (không chỉ domain), expected page type, geography, freshness threshold, disqualifiers và fallback. Candidate chỉ được fetch khi exact URL/path đã xác định bằng discovery read-only; không coi homepage, search listing, footer hoặc marketing shell là canonical fact page.
2. **Capture/replay nguyên tử:** mỗi attempt phải lưu final resolved URL, request/response metadata, raw bytes, artifact SHA, observation time và subject-match result. Trong cùng job, locator phải replay được vào raw bytes trước khi fact record được tạo. Quote không phải paraphrase; source evidence không được tái sử dụng snapshot portal cũ. Blocked/mismatch/stale phải đóng với lý do và không retriable theo vòng lặp mù.
3. **Pilot chính xác thay vì số lượng:** chỉ chọn tối đa bốn question high-value (một utility/di chuyển, một học đường, một văn hóa, một F&B/mua sắm) và đưa tối đa một fact từ mỗi question nếu full evidence. Không có quota ép buộc; 0 fact vẫn là pass an toàn nếu source không đáp ứng.
4. **Gating UI:** fact card/drawer chỉ đọc record đã qua `artifact_locator_replay=true`; health, count, filters và public text lấy từ cùng fact table. Pending items vẫn CTA về cổng chính thức. Không T1 trừ đủ toàn bộ economic evidence; Voucher 0; Buy Decision `chưa đủ dữ liệu`; AccessTrade vẫn read-only `PORTAL_ACCESS_NOT_VERIFIED`.
5. **Nâng UX trong phạm vi proof:** hoàn thiện search/filter theo intent và progressive disclosure trạng thái/freshness, loading/error/empty, keyboard/focus/motion mà không đụng claim. Không thay theme lớn hay dùng asset chưa có rights.
6. **Council/CEO gate:** một pack EL gồm 10 dossier, attempt closure, raw sample/replay, fact table delta, UI trace, health/storefront evidence, console, 1440/768/390. Cả 7 phòng ban nêu kế hoạch kế tiếp dựa trên outcome thực. Antigravity tự tiếp tục safe work sau checkpoint; authority blocks vẫn là production, affiliate/account/secret và quyền/pháp lý asset chưa rõ.

Production vẫn khóa `v3.419.0`. Không Go-Live, không affiliate activation, không production asset approval.

**Trạng thái CEO:** `EL ĐANG THỰC THI: EK INTEGRITY PASS HẸP; CHẠY SUBJECT-FIRST EVIDENCE DESK ĐỂ XÂY SUPPLY THẬT.`

---

## EM. Quyết định CEO sau kiểm tra độc lập EL — dossier tồn tại nhưng closure artifacts không tái lập được; chuẩn hóa attempt provenance và mở nguồn static-first

### Biên bản Hội đồng 7 phòng ban

**Product:** khách không thấy dossier, nhưng sản phẩm không thể phát triển đáng tin khi đội ngũ không biết chính xác nguồn nào đã thất bại và vì sao.  
**Design/UX:** giữ surface pending sạch; không thêm UI cho “10 hồ sơ” hay chuyển thất bại kỹ thuật thành câu chuyện thương hiệu.  
**Growth:** một backlog chỉ hữu ích khi candidate→outcome truy vết được; chuyển hướng đến nguồn chính thức có HTML/PDF tĩnh, bulletin, terms hoặc API công khai không cần account.  
**Data & Trust:** CEO audit EL thấy registry có 10 dossier và health báo 0 facts, nhưng `EVIDENCE_MANIFEST_EL` có 10 artifact không có candidate ID, pipeline stage, final URL, locator, closure status/reason. Không thể chứng minh `CLOSED_NO_RAW_SSR_FACT` hay subject-first outcome.  
**Engineering:** manifest schema silently drops required fields; validator phải reject write thay vì serialise null.  
**QA:** `10 dossier evaluated` chỉ là counter, không phải evidence. Require required-field completeness and exact dossier/artifact join.

### Kết luận CEO

EL pass hẹp cho dossier planning và 0-fact fail-closed, nhưng **fail closure provenance**. Không có source result nào được coi là completed/blocked until it has a replayable attempt record. `EM — Observable Acquisition` tiếp tục supply work bằng schema đúng và nguồn public static-first; không quay lại tạo claim.

### Lệnh EM duy nhất

1. **Attempt schema bắt buộc, fail before write:** mỗi artifact/closure phải có `attempt_id`, `dossier_id`, candidate_id, inquiry, exact requested URL, final resolved URL, HTTP/status or block mechanism, subject-match, raw artifact ref+SHA, observed-at, extraction method, closure status/reason, retry eligibility và reviewer decision. Null/missing bất kỳ required field phải reject build/manifest, không được serialize placeholder.
2. **Integrity joins:** verifier cần chứng minh one-to-one dossier→attempt và attempt→artifact/closure; count chỉ từ records complete. Static replay bắt buộc kiểm SHA, URL, locator. `NO_FIELD_FOUND` chỉ hợp lệ nếu exact page đã fetch và subject-match; `BLOCKED` cần evidence of mechanism; `MISMATCH` cần source/subject proof.
3. **Static-first source strategy:** với tối đa 8 dossier mới, discovery read-only vào trang luật/chính sách, official help/terms, timetable bulletin, PDF/download/static HTML hoặc endpoint công khai có subject match. Không require login, bypass JS barrier, headless evasion, form submit, API key, account hoặc secret. Nguồn SPA chỉ là lead, không phải attempt đã đóng.
4. **Fact conversion and UI:** chỉ fact artifact-backed mới vào ledger/health/filter/detail. 50 tiered entries, Voucher 0, Buy Decision no-data, no affiliate và asset staging draft tiếp tục. Không công bố count dossier/attempt như customer value.
5. **Council/QA gate:** một EM pack phải có schema contract, completeness/error report, registry joins, raw sample for every terminal status, retry queue, fact delta, UI/health DOM scan and independent browser availability. Bảy phòng ban đề xuất next cohort from observed yield; CEO raw-review before any fact is public.

Production tiếp tục khóa `v3.419.0`; không Go-Live/T1/voucher/affiliate/asset production approval. Antigravity tự chạy EM và safe UI/accessibility/supply work sau checkpoint.

**Trạng thái CEO:** `EM ĐANG THỰC THI: EL DOSSIER PLAN PASS HẸP; ATTEMPT CLOSURE KHÔNG TÁI LẬP ĐƯỢC, CHUYỂN STATIC-FIRST OBSERVABLE ACQUISITION.`

---

## EN. Quyết định CEO sau kiểm tra độc lập EM — schema đầy đủ nhưng source bị gán sai; cấm homepage-as-evidence và reuse chéo chủ thể

### Biên bản Hội đồng 7 phòng ban

**Product:** một pipeline ghi chép đẹp nhưng khảo sát homepage không tạo giá trị khách; dừng đếm attempt và chuyển sang discovery thật.  
**Design/UX:** không đổi customer surface; các failure trạng thái nội bộ không được lộ thành fact hay “đã quét”.  
**Growth:** static-first không có nghĩa fetch lặp domain root; tìm publication/terms/bulletin/PDF/page path subject-specific bằng discovery read-only.  
**Data & Trust:** CEO đọc raw EM: mọi `exact_requested_url`/`final_resolved_url` đều là root domain, trái lệnh no-portal-root. Nghiêm trọng: attempt Đà Nẵng 1022 mang cùng SHA `db237…` và timestamp `07:08:10.372Z` với DanaBus, nhưng closure mô tả 1022 — đây là cross-subject artifact reassignment.  
**Engineering:** schema completeness không thay semantic integrity; cần validate URL path/subject, artifact origin subject và cross-subject reuse relation.  
**QA:** pass 16 fields is false-positive nếu field values describe the wrong source; test must include same-hash/different-subject negative case.

### Kết luận CEO

EM **fail acquisition semantics**. Tám attempt bị hạ thành `INVALID_PORTAL_ROOT_OR_CROSS_SUBJECT_REUSE`; không được xem là `CLOSED_DYNAMIC_*`, không được dùng để quyết định retry hay coverage. Không mất raw bytes/history, nhưng mọi derived count/closure narrative phải bị cô lập. Nền availability/integrity vẫn tiếp tục.

### Lệnh EN duy nhất

1. **Quarantine semantic-invalid attempts:** đánh dấu toàn bộ 8 EM attempt invalid do root URL; riêng `ATTEMPT_EM_03_DANANG_1022` gắn `CROSS_SUBJECT_ARTIFACT_REASSIGNMENT` và reference tới origin DanaBus. Gỡ các summary/health/QA claim “8 static-first closures”; count chỉ còn `invalid_attempts=8`, `valid_subject_attempts=0`.
2. **Canonical path gate trước fetch:** `exact_requested_url` phải có path/query/filename khác root và subject signal phù hợp dossier; final URL phải subject-match. Root domain chỉ hợp lệ cho identity discovery nhưng không được tạo attempt artifact. Nếu URL không được xác định qua discovery, dossier còn `DISCOVERY_PENDING`, không được fabricate URL/closure.
3. **Artifact identity lock:** one artifact hash có thể được referenced nhiều lần chỉ khi `origin_candidate_id`, relation type và same-subject justification được ghi immutable; khác subject mặc định hard fail. Verifier phải compare page title/body subject/URL/time against dossier; fail nếu narrative mentions subject absent from raw artifact.
4. **Static discovery đúng nghĩa:** sử dụng read-only search/site navigation để tìm official static page/PDF/notice/help/terms có title/path subject-specific. Tối đa 6 dossier retry, mỗi dossier chỉ một discovery outcome trước khi fetch. Không scripted login, CAPTCHA/bypass, API secret, user account, third-party upload, affiliate action. Không tìm được thì `DISCOVERY_NO_CANONICAL_PATH` với evidence query/navigation log và không có fact.
5. **UI/safety:** tiếp tục 50 item tiers, Voucher 0, Buy Decision no-data, SVG staging draft/JPEG quarantine. Không thêm badge, price/discount/voucher, review, affiliate/deeplink/CPA/KYC/PII. Không đưa counters acquisition lên UI.
6. **Council/CEO gate:** pack EN phải có invalidation matrix EM→EN, root/path validation output, cross-subject hash graph, discovery registry, raw sample each valid attempt, DOM/health diff and independent browser/console/accessibility. Bảy phòng ban đề xuất cohort kế tiếp theo yield thật. CEO raw-review trước bất cứ fact/tier nào.

Production vẫn khóa `v3.419.0`; không Go-Live, affiliate activation hay asset production approval. Antigravity tự tiếp tục EN safe work sau checkpoint.

**Trạng thái CEO:** `EN ĐANG THỰC THI: EM SCHEMA PASS HẸP NHƯNG 8 ATTEMPT INVALID; CẤM HOMEPAGE-AS-EVIDENCE VÀ CROSS-SUBJECT REUSE.`

---

## EO. Quyết định CEO sau kiểm tra độc lập EN — discovery path vẫn là giả thuyết; mở public-source research read-only có log để tìm canonical page thật

### Biên bản Hội đồng 7 phòng ban

**Product:** không được để candidate registry mô phỏng tiến độ; cần tìm nguồn công khai đáp ứng câu hỏi thực tế hoặc đóng dứt khoát.  
**Design/UX:** không thay đổi customer surface vì một URL dự kiến; giữ thông tin pending đúng mức.  
**Growth:** mở rộng discovery ngoài một homepage bằng truy vấn nguồn công khai/official domains, ưu tiên tài liệu cơ quan–merchant có terms rõ, nhưng không chạy theo deal giả.  
**Data & Trust:** CEO đọc registry EN: sáu `target_canonical_url` chỉ là planned paths, đều trạng thái `DISCOVERY_NO_STATIC_SSR_PATH`/auth, không có navigation/search evidence hay raw fetch.  
**Engineering:** discovery registry phải phân biệt `hypothesized_path`, `discovered_url` và `captured_url`; không được promote planned path.  
**QA:** no discovery proof equals no attempt. Health `v3.468.0` đúng 0 valid attempt/0 fact; đây là baseline, không phải coverage.

### Kết luận CEO

EN pass hẹp cho quarantine/canonical gate. `EO — Public-source Discovery Research` được mở: Antigravity được phép khảo sát công khai, read-only để **tìm** trang canonical thật; không được thực hiện bất kỳ hành động account/affiliate/secret hay né cơ chế truy cập. Không tìm được là outcome hữu ích và phải được ghi rõ.

### Lệnh EO duy nhất

1. **Discovery evidence log:** với tối đa 6 dossier EN, thực hiện 1–3 truy vấn/read-only navigation có mục tiêu trên official domains hoặc nguồn cơ quan có thẩm quyền. Ghi exact query/navigation start URL, result URL, title, timestamp, domain rationale, subject match, redirect outcome và path status. `hypothesized_path` không được copy thành `discovered_url` nếu chưa quan sát thực tế.
2. **Static artifact only after discovery:** chỉ khi discovery trả candidate URL subject-specific mới được fetch đọc raw public page/PDF. Lưu final URL, response metadata/raw bytes/hash/time và locator replay. Không login, register, form submit, CAPTCHA, paywall/bypass, browser extension, user account, API key, secret, affiliate link/campaign/deeplink/CPA/KYC. Nếu source dynamic hoặc login-gated, close bằng evidence navigation — không fabricate claim.
3. **Ưu tiên yield thực tế:** chọn tối đa một public civic/service source, hai education policy sources và hai lifestyle/culture sources; F&B/price promotion chỉ là lane sau và không được nâng deal nếu thiếu economic fields. Có thể thay candidate nếu discovery chứng minh path/source không phù hợp.
4. **Schema state machine:** `HYPOTHESIZED → DISCOVERED → CAPTURED → REPLAYED → FIELD_VERIFIED` chỉ tiến một chiều với record proof. `NO_CANONICAL_RESULT`, `DYNAMIC_ONLY`, `AUTH_REQUIRED`, `SUBJECT_MISMATCH` là terminal/queue statuses; no field, no UI fact, no count inflation.
5. **UI/affiliate/asset guard:** giữ 50 multi-tier entries, Voucher 0, Buy Decision no-data, SVG staging draft/JPEG quarantine. Không hình/claim giả, giá/giảm/mã/review/price history, affiliate activation hoặc PII. Các cải tiến search/a11y/performance không liên quan claim được tiếp tục.
6. **Council/CEO gate:** một pack EO gồm discovery log raw, URL state transitions, captured artifact samples, terminal outcomes, fact delta, public DOM scan, health/storefront browser, console và 1440/768/390. Bảy phòng ban đưa đề xuất cohort tiếp theo dựa trên yield, không theo report PASS. CEO trực tiếp review raw sample trước mỗi lần mở fact public.

Production tiếp tục khóa `v3.419.0`; không Go-Live, T1/voucher/affiliate activation hay asset production approval. Antigravity tự tiếp tục public-source research safe sau checkpoint.

**Trạng thái CEO:** `EO ĐANG THỰC THI: EN QUARANTINE PASS HẸP; DISCOVER PATH THẬT BẰNG READ-ONLY PUBLIC RESEARCH, KHÔNG DỰNG URL GIẢ THUYẾT THÀNH EVIDENCE.`

---

## EP. Quyết định CEO sau kiểm tra độc lập EO — một nguồn GitHub có nội dung thật nhưng thiếu biên nhận thu thập; tạo “citation pack” trước khi cho phép một fact T2

### Biên bản Hội đồng 7 phòng ban

**Product:** GitHub Education là nhu cầu thật của sinh viên, nhưng lợi ích chỉ hữu ích khi người dùng biết đó là chương trình toàn cầu, phải được GitHub xác minh và tự kiểm điều kiện tại nguồn.  
**Design:** không biến một nguồn mới thành banner hay badge “đã có ưu đãi”; chỉ mở detail fact khi đủ citation pack, còn card portal hiện hữu giữ trạng thái kiểm điều kiện tại nguồn.  
**UX/CX:** copy phải phân biệt rõ `có thể đăng ký`, `sinh viên đã xác minh` và `được hưởng`; không suy diễn sinh viên Đà Nẵng mặc nhiên đủ điều kiện.  
**Growth:** ưu tiên một fact có thể tái kiểm hơn tăng counter; với năm nguồn dynamic còn lại, outcome `DYNAMIC_ONLY` là kết quả hợp lệ, không phải lý do ghi điều khoản/giá vào narrative.  
**Data & Trust:** CEO đã đọc raw `artifact_cand_github_education_docs.md`; SHA-256 thực tế khớp manifest (`87231e…c5e26`) và nội dung khớp trang GitHub Docs. Tuy nhiên vault EO chỉ có Markdown + manifest, không có response receipt (HTTP status, headers, final URL, fetched-at) độc lập. Đồng thời các rationale DanaBus/JetBrains đang chứa số tiền/quyền lợi chưa có artifact — các đoạn đó không được là evidence.  
**Engineering:** capture envelope phải bất biến và được hash riêng; extraction phải chọn từng field cùng quote/locator thay vì gom “Copilot, Codespaces, Pack” thành một claim lớn.  
**QA:** CEO kiểm trực tiếp `/health` và storefront `v3.469.0-staging.eo`: 0 fact verified, Voucher 0, không có claim `180 core hours`, console không lỗi; đây là baseline pass an toàn, không phải approval fact.

### Kết luận CEO

EO **pass hẹp cho discovery/capture GitHub duy nhất**, không pass field verification. CEO đối chiếu trực tiếp trang GitHub Docs hiện hành đã thấy canonical redirect và các statement về GitHub Education, Student Developer Pack, Copilot cho verified students và Codespaces tối đa 180 core hours/tháng. Điều này xác nhận hướng discovery, **không thay thế citation pack nằm trong hạ tầng JayT**. Mọi field fact vẫn là 0; không có T1, voucher hay quyết định mua mới.

### Lệnh EP duy nhất

1. **Bổ sung biên nhận capture cho GitHub, không ghi đè artifact EO:** thực hiện lại một fetch read-only đúng canonical page GitHub Docs, lưu artifact mới kèm `capture_receipt` bất biến: requested URL, final resolved URL, HTTP status, content-type, response headers được phép lưu, observed-at UTC, raw-byte SHA-256, title, redirect chain và fetch method. Tách raw Markdown/HTML, receipt và manifest entry; verifier phải đối chiếu hash, URL và title. Không dùng login, token, API secret hoặc account.
2. **Tách tối đa hai fact T2, từng fact một:** sau khi receipt pass, có thể đề xuất (không tự public) tối đa: (a) sinh viên/faculty tại cơ sở giáo dục được công nhận có thể nộp đơn GitHub Education; (b) sinh viên GitHub Education đã được xác minh có access Copilot miễn phí/premium features. `180 core hours` phải là field riêng, chỉ tạo nếu quote và condition/reviewer/freshness đều replay được; không gộp với claim Copilot, không diễn giải thành quyền lợi của mọi sinh viên Đà Nẵng. Student Developer Pack chỉ mô tả là nơi khám phá/claim offers, không liệt kê merchant hay voucher khi không có terms riêng.
3. **Fact record bắt buộc 12 điểm chứng minh:** `fact_id`, candidate/subject, tier `T2_PROGRAM_OFFICIAL`, exact final URL, artifact ID+SHA, field/value, verbatim quote, raw locator replay, subject/geography scope, eligibility/conditions, observed-at+freshness, reviewer decision. Bất kỳ trường nào null/mismatch thì giữ `CAPTURED/REPLAYED`, count = 0 và UI không có fact drawer/badge/copy mới.
4. **Làm sạch discovery narrative động:** gỡ/đánh dấu `UNBACKED_DISCOVERY_NOTE` mọi số tiền, mức giảm, miễn phí AI, thời hạn hay quyền lợi trong `domain_rationale`, closure reason, health/QA summary nếu không có artifact-level proof. Không đưa các note này ra public DOM, JSON-LD, telemetry count hoặc roadmap yield. Dossiers dynamic tiếp tục queue static-policy/bulletin discovery, một outcome có receipt cho mỗi lần retry.
5. **Giữ storefront có ích nhưng không bịa:** giữ 50 nội dung đa tầng, portal/địa điểm/radar được phân tầng rõ; Voucher 0, Buy Decision `chưa đủ dữ liệu`, T1 = 0, affiliate `PORTAL_ACCESS_NOT_VERIFIED`. Tiếp tục UI/a11y/performance và supply discovery an toàn; không chuyển các portal identity sẵn có thành deal, voucher, giá, review, asset licensed hay affiliate CTA.
6. **Council/CEO gate:** nộp một EP pack gồm raw+receipt+hash replay GitHub, fact-table delta (có thể bằng 0), negative test broken receipt/quote/redirect, scan toàn DOM/hidden/mobile/JSON-LD, health, storefront browser+console và 1440/768/390. Hội đồng phải nêu rõ fact nào không được public. CEO sẽ đọc raw receipt và browser review trước khi bất kỳ T2 fact nào hiển thị; owner acceptance vẫn là gate thẩm mỹ/release.

Production tiếp tục khóa `v3.419.0`. Không Go-Live, T1/voucher/affiliate activation, deeplink, account/secret action hoặc asset production approval. Antigravity tiếp tục EP và các luồng safe không cần chờ checkpoint.

**Trạng thái CEO:** `EP ĐANG THỰC THI: EO GITHUB CAPTURE PASS HẸP; 0 FIELD FACT PUBLIC CHO ĐẾN KHI CÓ RECEIPT + LOCATOR + REVIEWER.`

---

## EQ. GO-LIVE GAP AUDIT — quyết định CEO sau kiểm tra trực tiếp staging và production

### Biên bản Hội đồng 7 phòng ban

**Product:** staging đã có bề mặt khám phá 50 mục, nhưng đó mới là lượng item hiển thị; chưa chứng minh một lịch vận hành có 50 nội dung *hữu ích và làm mới mỗi ngày*. Đặc biệt, production 17 mục không còn đáng tin để làm baseline khách hàng.  
**Design:** staging dùng đồ họa SVG có alt, chưa phải acceptance hình ảnh/brand/asset-rights cho production. Không có quyền dùng asset được chứng minh thì không được gọi là hoàn thành visual Go-Live.  
**UX/CX:** staging có các điểm vào khám phá/chương trình/voucher/mua sắm, nhưng Voucher vẫn 0 và Buy Decision chưa có dữ liệu quan sát. Responsive 390px chưa được CEO tái lập thực tế, do browser audit bị cố định viewport 1280px.  
**Growth:** 50 content records không phải supply engine; cần freshness, yield, lịch quét và outcome theo ngày. Không tăng claim để làm đẹp counter.  
**Data & Trust:** CEO kiểm trực tiếp production `https://deploy-ten-xi-48.vercel.app/`, version `v3.419.0`: có 17 mục, trong đó **9** lần public text `Đã đối soát raw capture`/`Nguồn chính thức đã thu thập`. Đây mâu thuẫn với việc raw provenance cũ đã bị cô lập; không có hồ sơ fact hiện hành nào cho 9 claim đó. Staging `v3.470.0-staging.ep` trả 0 fact verified, T1=0, Voucher=0; đây là trạng thái fail-closed đúng.  
**Engineering:** staging `/health` UP và HTML root trả 200; source-of-truth/release-vault hiện có dấu hiệu nhiều lịch sử build, cần release manifest chuẩn duy nhất nối SOT → staging → production trước Go-Live.  
**QA:** CEO browser audit staging không thấy console errors, ảnh thiếu alt hay public phrase `Đã đối soát raw capture`; production browser audit cũng không có console error nhưng console sạch không bù được 9 claim provenance. Chưa có independent performance budget, 390/768 proof, keyboard journey replay và production claim scan đủ điều kiện release.

### Kết luận CEO

**Không đạt Go-Live.** Đây không phải chỉ vì thiếu deal: P0 là production đang công khai provenance không có evidence hiện hành. Staging có nền an toàn hẹp và một GitHub citation pack đang chờ review, nhưng chưa có fact public. Không được thay production bằng staging, xóa production, hay release bất cứ build nào nếu chưa có authority phát hành và CEO browser review.

### Backlog Go-Live theo thứ tự bắt buộc

| Ưu tiên | Hạng mục / trạng thái | Dependency và evidence cần nộp | Definition of Done |
|---|---|---|---|
| **P0** | **Production exposure containment plan — CHƯA LÀM** | Bản đồ 9 public claim, DOM/hidden/mobile/JSON-LD/OG scan, route/version mapping, rollback-or-replacement plan, approval request riêng cho production | Không còn claim provenance không có fact hiện hành; browser audit production sau release và CEO approval. Không tự deploy. |
| **P0** | **Release lineage một chiều — CHƯA ĐỦ EVIDENCE** | Manifest ký nối SOT→build hash→staging hash→production hash; diff public claims; changelog; rollback evidence | Có thể tái lập đúng artifact đang public; production không thể nhận build ngoài manifest được duyệt. |
| **P0** | **T1 deal/voucher economics — CHƯA LÀM** | Với từng item: giá/tổng chi phí, điều kiện, hạn, scope/location, source receipt, raw locator, freshness/reviewer | T1 hiện vẫn 0 cho đến khi toàn bộ evidence pass. Voucher 0 không phải lỗi, nhưng voucher public chỉ mở khi mã/hạn/điều kiện được chứng minh. |
| **P1** | **Citation-first T2 supply — ĐÃ LÀM NHƯNG CHƯA ĐỦ EVIDENCE PUBLIC** | GitHub receipt/raw/hash/locator, exact fact records, reviewer decision; static discoveries cho các cohort còn lại | Từng T2 fact được public riêng, không suy diễn eligibility; không dùng portal identity thay fact. |
| **P1** | **50 nội dung hữu ích/ngày theo tầng — CHƯA LÀM** | Daily supply board: target/actual fresh count theo T1/T2/T3/T4, source/result/freshness/terminal status, duplicate & staleness checks | 50 là tổng multi-tier đúng nhãn; không phải 50 deals. Không content nào nâng tier thiếu evidence. |
| **P1** | **T3/T4 quality + link safety — ĐÃ LÀM MỘT PHẦN** | Mỗi item có canonical link/subject/scope/freshness; external-link scan, redirect test, map-link policy | Staging đang hiển thị 50 item và không có affiliate text public; cần replay link và freshness trước khi coi là operating supply. |
| **P1** | **UX/a11y/responsive/performance — ĐÃ LÀM MỘT PHẦN** | Independent 1440/768/390 captures, keyboard + Escape/focus restore, screen-reader semantics, contrast audit mới, Web Vitals/performance budget | Không horizontal overflow, mọi task chính dùng được keyboard/touch, metrics đạt budget được Hội đồng chấp thuận. |
| **P2** | **Buy Decision + price history — CHƯA LÀM** | Quan sát giá thật theo thời gian, total-cost/conditions evidence, history integrity, no-data state | Chỉ ra Mua/Chờ khi đủ dữ liệu; mặc định còn `chưa đủ dữ liệu`. |
| **P2** | **Affiliate value-first — CHƯA LÀM / READ-ONLY** | Catalog evaluation evidence, customer-fit scoring, disclosure/legal review, authority riêng cho account/campaign/link | Hiện giữ `PORTAL_ACCESS_NOT_VERIFIED`; không deeplink, campaign, commission CTA hay account/secret action. |
| **P2** | **Asset rights & cộng đồng — CHƯA LÀM** | License/rights receipt cho asset production; protocol khảo sát cộng đồng zero-PII, kết quả thật | Không dùng ảnh/đánh giá giả hoặc AI giả ảnh thật; owner aesthetic acceptance là gate riêng. |

### Lệnh EQ duy nhất

1. **Khóa sự khác biệt production/staging thành P0 release map:** lập inventory toàn bộ claim public production `v3.419.0`, trước hết 9 `Đã đối soát raw capture`; đối chiếu từng claim với fact/artifact hiện hành. Bất kỳ claim nào không có artifact-level proof phải gắn `PUBLIC_EXPOSURE_UNVERIFIED`, bị loại khỏi candidate release. Chuẩn bị containment patch và rollback plan **trên staging**, nhưng không deploy production khi chưa có phê duyệt release riêng.
2. **Dựng Go-Live evidence board là source vận hành duy nhất:** lưu P0/P1/P2 trên dưới dạng record có owner, dependency, evidence path, freshness, state, date và DoD; cấm dùng report counter hoặc build version làm completion. EP GitHub chỉ ở `PROPOSED_NOT_PUBLIC`; 50 staging items chỉ ở `RENDERED_NOT_DAILY_SUPPLY_PROVEN` cho đến khi board chứng minh vận hành.
3. **Thực hiện theo chuỗi:** (a) P0 production mapping + lineage; (b) P0 economic/voucher evidence; (c) P1 daily supply/T2–T4 link and freshness; (d) P1 responsive/a11y/performance; (e) P2 decision/affiliate/assets. Mỗi checkpoint phải tự sinh next work order theo gap thực, không chờ chủ dự án nhắc lại.
4. **QA/CEO gates:** nộp EQ pack gồm production/staging DOM claim diff, 9-claim evidence matrix, SOT-build-release lineage, 50-item tier/freshness board, 1440/768/390/browser console/a11y/performance results, external-link scan, T1/voucher/affiliate zero-state tests. Chỉ CEO được kết luận readiness sau browser review; owner phải chấp nhận thẩm mỹ; production, affiliate/account/secret và quyền asset/pháp lý tiếp tục là authority blocks.

Production vẫn khóa `v3.419.0`, trạng thái **NOT GO-LIVE**. Antigravity được tiếp tục P0 mapping và tất cả P1/P2 safe work trên staging; không tự phát hành, không tự tạo deal/voucher/affiliate claim.

**Trạng thái CEO:** `EQ AUDIT HOÀN TẤT: STAGING AN TOÀN HẸP; PRODUCTION CÓ P0 PUBLIC-EXPOSURE; GO-LIVE = NOT READY.`

---

## ER. Chỉ thị CEO — JayT Deal Discovery Engine, Ví Voucher 3 làn và AccessTrade Value-First Revenue Readiness

### Biên bản Hội đồng 7 phòng ban

**Product:** ưu tiên bốn thời điểm chi tiêu thật: ăn gần trường/công sở, đi chơi–rạp, di chuyển, và mua đồ KTX/học tập. Khách phải thấy “việc cần làm lúc này” trước catalog; không hứa giá thấp hay deal tồn tại nếu chưa chứng minh.  
**Design:** tạo trải nghiệm săn lợi ích bằng timeline Sáng/Trưa/Chiều/Tối, campus-zone chips và progressive disclosure; tier/độ mới/điều kiện là thành phần thị giác bắt buộc, không phải chữ chú thích nhỏ.  
**UX/CX:** “voucher ẩn” phải được gọi chính xác là **ưu đãi cá nhân hóa/giỏ hàng**. JayT chỉ hướng dẫn người dùng mở app hoặc kiểm tra checkout; không hiển thị mã, số tiền, “đã áp dụng”, countdown hay nút copy khi voucher phụ thuộc tài khoản.  
**Growth:** retention phải dựa trên daily intent và người dùng quay lại xem nguồn mới; đo saved intent, source-open, evidence freshness và report signal, không đo click thương mại trước.  
**Data & Trust:** CEO kiểm trực tiếp staging `v3.471.0-staging.eq`: T1=0, Voucher=0, 50 mục đang render và không public affiliate text. Đồng thời kho legacy vẫn có record voucher/deeplink/campaign AccessTrade cũ; các record đó không được coi là evidence hay nguồn runtime.  
**Engineering:** cần một voucher state machine và one-way fact model; wallet không được import raw legacy. AccessTrade hiện là `RESEARCH_PLAN_ONLY`, catalog candidate 11 brand chỉ là radar, chưa có authenticated coverage proof.  
**QA:** mọi CTA phải scan được để phân biệt external official link, direct merchant link, affiliate link và user-local action. Test account-dependent voucher, expired/missing evidence, mobile/keyboard/no-data là mandatory.

### Kết luận CEO

Mở workstream **ER — Deal Discovery Engine** trên staging. Mục tiêu là làm JayT hữu ích và hấp dẫn hơn ngay cả khi T1/voucher chưa đủ evidence: khách chọn nhu cầu, khu vực và thời điểm để khám phá nguồn đúng tầng; khi có voucher thật thì Wallet mở đúng lane. Doanh thu affiliate là giai đoạn sau của giá trị khách hàng, không phải lý do công bố voucher/deal hoặc tạo link sớm.

### Lệnh ER duy nhất

1. **Xây trải nghiệm theo bốn tình huống, không hardcode deal:** tạo bốn route/filter có thể truy cập từ homepage: `Ăn gần đây`, `Đi chơi tối nay`, `Di chuyển tiết kiệm`, `Đồ KTX & học tập`. Mỗi route phải có time context, campus/area filter (Hòa Khánh, Ngũ Hành Sơn, Hải Châu, Thanh Khê, Sơn Trà), tier/freshness, empty/loading/error và CTA phù hợp. Nếu không có evidence deal, hiển thị T3/T4 hoặc nguồn chính thức; không thay bằng giá, phần trăm giảm, lịch khuyến mãi, happy-hour hay “freeship” tự suy ra.
2. **Ví Voucher 3 làn:** (A) `Dùng ngay — public verified`: chỉ code/giá trị/hạn/điều kiện/scope đầy đủ evidence; (B) `Kiểm tra trong app/giỏ hàng`: dành cho voucher cá nhân hóa, chỉ nêu merchant/loại ưu đãi nếu có nguồn official, không code/giá trị/claim availability; (C) `Radar theo dõi`: nguồn cần scan lại. Card phải nêu reason của lane, observed-at/freshness, source và action an toàn. Voucher state: `DISCOVERED → CAPTURED → FIELD_VERIFIED → EXPIRED/REVOKED`; account-dependent không được vượt `ACCOUNT_DEPENDENT`.
3. **Công cụ quyết định có ích ngay:** triển khai staging UX cho (a) so sánh **do người dùng tự nhập** giá món/phí ship/mã giảm đã thấy trong app để tính tổng thực trả; (b) chia bill nhóm; (c) lưu radar theo thời điểm/khu vực. Mọi calculation local-first, không thu PII mặc định và không tự fetch/khẳng định giá các app. `Mua/Chờ` chỉ xuất hiện khi có observation evidence thật theo protocol P2; còn lại ghi `chưa đủ dữ liệu`.
4. **Supply sprint đúng tầng:** chạy public read-only discovery theo cohort lớn cho rạp, F&B chuỗi, giao thông, sách/học tập, KTX, cafe làm việc và trải nghiệm cuối tuần. Mỗi item phải vào daily board cùng tier, source URL cuối, subject, freshness, evidence state và outcome. Mục tiêu vận hành là **50 nội dung tổng theo tầng/ngày**, không phải 50 deal; quota T1/voucher = 0 nếu evidence chưa đạt. Cấm dùng copy/mã/deeplink legacy làm input.
5. **AccessTrade research-to-revenue, chưa activation:** cách ly/deny-list toàn bộ legacy `admitted_affiliate_cards`, campaign registry, voucher amounts và `go.isclix` deeplink khỏi runtime/ingestion cho đến khi provenance review hoàn tất. Thực hiện catalog survey read-only chỉ khi đã có authority/account scope phù hợp; chấm toàn catalog theo customer-fit, điều kiện commission, brand safety, return/cancellation, price-evidence feasibility và merchant terms. Không tạo link, đăng ký campaign, gọi API authenticated, dùng secret hoặc đưa CTA hoa hồng. Chỉ sau coverage proof + Council + CEO review mới được đề xuất một pilot affiliate riêng.
6. **Council/QA/CEO gate:** nộp ER pack gồm journey map, design states, voucher state machine, source/fact schema, legacy deny-list scan, 50-item daily board, external/affiliate-link classifier, privacy note, 1440/768/390, keyboard/touch/console/a11y/performance test. Hội đồng đề xuất next cohort từ yield thật. CEO browser-review trước bất kỳ fact/voucher public; production release, affiliate activation/account/secret và asset rights vẫn cần authority riêng.

Production tiếp tục khóa `v3.419.0`, đồng thời P0 EQ production-exposure mapping không được bị trì hoãn. Không Go-Live, không T1/voucher/deeplink/affiliate activation hay claim giá chưa được chứng minh. Antigravity tự tiếp tục ER trên staging và các luồng safe sau checkpoint.

**Trạng thái CEO:** `ER ĐANG THỰC THI: XÂY DEAL DISCOVERY + VOUCHER WALLET TRUNG THỰC; ACCESS TRADE = RESEARCH-TO-REVENUE, CHƯA KÍCH HOẠT.`

---

## ES. Quyết định CEO sau kiểm tra độc lập ER — ledger/rebrand không phải tính năng; hoàn thiện hành vi UX thật và cô lập survey narrative không có evidence

### Biên bản Hội đồng 7 phòng ban

**Product:** người dùng không thể dùng “4 route” nếu chúng không xuất hiện và không bấm được. Một Wallet 3 làn phải cho người dùng biết lane nào, hành động gì và vì sao, chứ không chỉ tồn tại trong JSON.  
**Design:** route chips, lane cards và calculator cần hiện diện trong UI có phân cấp; trạng thái 0 phải dẫn hành động, không trở thành một màn hình khóa kín kéo dài.  
**UX/CX:** CEO bấm trực tiếp `Voucher (0)` trên staging ER: vẫn là page fail-closed cũ; không có Làn A/B/C. DOM không có `Ăn gần đây`, `Đi chơi tối nay`, `Di chuyển tiết kiệm`, `Đồ KTX & học tập`, tổng thực trả hoặc chia bill.  
**Growth:** thiếu interaction nghĩa là chưa có loop retention; không được ghi “hoàn thành” vì ledger có count 10/3.  
**Data & Trust:** source JS ER và EQ đều 201,388 byte, chỉ khác 176 vị trí rebrand; wallet ledger tự ghi 10/3 không có UI/data provenance. Survey AccessTrade offline có assertion không được chứng minh (ví dụ giá vé DanaBus `5.000đ` và những đánh giá popularity/feasibility), không được dùng làm fact hoặc market truth.  
**Engineering:** denied legacy affiliate/deeplink đang đúng hướng, nhưng deny-list JSON không chứng minh runtime behavior; cần scanner và interaction tests trên artifact served.  
**QA:** staging `v3.472.0-staging.er` HTTP 200, console sạch, không affiliate public; đây là pass hẹp về containment. Test `66/66` chỉ kiểm contract nội bộ, không chứng minh user flow.

### Kết luận CEO

ER **pass hẹp duy nhất cho fail-closed affiliate containment**; **fail phần implementation UX**. Không có tính năng 4 route, Wallet 3 làn hoặc calculator được nghiệm thu. Các record completion/counter ER phải bị hạ thành `REBRANDED_OR_UNRENDERED_NOT_COMPLETE`; không xóa lịch sử, không dùng chúng tính milestone.

### Lệnh ES duy nhất

1. **Cô lập completion sai, giữ deny-list:** đánh dấu các claim “ER đã hoàn thành 4 route/3 lane/calculator” là `UNRENDERED_FEATURE_CLAIM`; không dùng count lane 10/3 như dữ liệu khách hàng. Giữ deny-list AccessTrade và cấm legacy deeplink/card khỏi served artifact; bổ sung static+runtime scanner chứng minh 0 `go.isclix`, tracking/ref/affiliate parameter, commission copy và voucher code legacy trên staging.
2. **Triển khai một Deal Discovery Surface thật trong SOT hiện hữu:** trên homepage tạo bốn action chips đúng tên `Ăn gần đây`, `Đi chơi tối nay`, `Di chuyển tiết kiệm`, `Đồ KTX & học tập`; mỗi chip phải lọc visible list theo item metadata và cho phép kết hợp Sáng/Trưa/Chiều/Tối cùng khu vực. Kết quả phải có heading, count, clear-filter, zero result và link source-tier. Không dựng route giả hoặc hardcode deal/giá/giảm/free ship.
3. **Triển khai Wallet 3 làn thật:** thay page Voucher hiện hữu bằng Làn A/B/C. Làn A giữ `0` cùng tiêu chí 5 trường. Làn B và C chỉ render record có `merchant/subject`, canonical source/action, lane reason, observed-at/freshness và `ACCOUNT_DEPENDENT`/`RADAR`; không mã, giá trị, countdown, “còn lượt”, copy hoặc affiliate CTA. Nếu không có record đủ trường, hiển thị zero-state riêng từng lane, không bịa 10/3.
4. **Triển khai calculator local-first thật:** một form không cần đăng nhập gồm giá món, phí giao, giảm giá người dùng tự nhập và số người chia; kết quả formula minh bạch, validation số âm/rỗng/chia 0, reset, keyboard/mobile support. Gắn copy rõ đây là số do người dùng nhập, không phải giá JayT quan sát; không lưu hoặc gửi dữ liệu mặc định, không trả `Mua/Chờ`.
5. **Sửa AccessTrade survey thành giả thuyết nghiên cứu:** mọi điểm customer-fit/brand safety/price feasibility giữ `HYPOTHESIS_OFFLINE`, không dùng exact price, availability, popularity, merchant term hoặc locality assertion nếu thiếu artifact. DanaBus `5.000đ` và các claim tương tự phải bị gỡ/cô lập khỏi survey outcome. Chỉ portal survey read-only có receipt sau authority phù hợp mới chuyển hypothesis thành evidence; pilot doanh thu vẫn HOLD.
6. **QA/CEO gate:** nộp ES pack có DOM before/after, video hoặc browser interaction replay cho 4 chips, tổ hợp filter, 3 lane states, calculator edge cases, scan denied strings/links, 1440/768/390, keyboard/focus/console/a11y/performance và raw metadata mỗi B/C record. Không build/rebrand/version bump trước khi flows pass. CEO browser-review trực tiếp trước khi hạ `UNRENDERED_FEATURE_CLAIM`.

Production vẫn khóa `v3.419.0`; P0 EQ không bị trì hoãn. Không Go-Live, T1/voucher public/deeplink/affiliate activation hoặc authority-sensitive action. Antigravity tiếp tục ES trên staging mà không chờ checkpoint.

**Trạng thái CEO:** `ES ĐANG THỰC THI: ER CONTAINMENT PASS HẸP; UX PROMISE FAIL — CHỈ ACCEPT HÀNH VI RENDERED, BẤM ĐƯỢC, QA ĐƯỢC.`

---

## ET. Quyết định CEO sau kiểm tra trực tiếp ES — interaction pass hẹp, nhưng Làn B lại công khai claim voucher/ưu đãi chưa có evidence

### Biên bản Hội đồng 7 phòng ban

**Product:** Deal Discovery và calculator tạo giá trị tức thì, nhưng các merchant cards không được quay lại hứa ưu đãi để tạo cảm giác phong phú.  
**Design:** giữ Wallet 3 làn, nhưng Làn B phải là “cách tự kiểm” gọn và trung thực; không dùng copy khuyến mãi như nội dung trang trí.  
**UX/CX:** CEO test trực tiếp: 4 chip lọc thật, clear-filter và calculator local-first hoạt động; phép tính `100.000 + 15.000 − 20.000`, chia 2 trả `95.000` và `47.500/người`. Tuy vậy cards Làn B thiếu observed-at/freshness và làm người dùng hiểu có ưu đãi đang tồn tại.  
**Growth:** trust/return rate giảm nếu “tự kiểm trong app” chứa lời hứa không kiểm chứng; retention phải dựa vào saved intent/radar, không phải pseudo-deal.  
**Data & Trust:** CEO thấy trực tiếp Làn B render các claim chưa có receipt như Domino's “Mua 1 Tặng 1”, Lotteria “Happy Lunch”, CGV U22/mã quà tặng, Galaxy Ngày Tri Ân, Highlands voucher đổi thưởng, Fahasa/Tiki mã giảm. Không có evidence field, locator hay freshness; đây là **staging public exposure**.  
**Engineering:** renderer phải bóc `merchant identity/source action` ra khỏi `promotion claim`; data contract thiếu `observed_at`, `source state`, `claim-free instruction`.  
**QA:** console sạch, 0 affiliate/deeplink legacy và calculator pass không bù được copy violation; test cần quét body rendered theo claim lexicon, không chỉ scan code legacy.

### Kết luận CEO

ES **pass hẹp cho interactive 4-need filters, Wallet shell, calculator và affiliate containment**. ES **fail Làn B/C content governance**. Toàn bộ copy promotion/chính sách/giá/loại ưu đãi chưa có evidence phải bị cô lập khỏi public staging ngay; không được đưa build này vào production hay gọi là voucher availability.

### Lệnh ET duy nhất

1. **Contain Làn B/C phạm vi đúng:** gỡ khỏi DOM/hidden/mobile/JSON-LD các claim `Mua 1 Tặng 1`, Happy Lunch, U22, Ngày Tri Ân, điểm thưởng/voucher, mã giảm, giá vé, giá sách, ưu đãi hội viên và mọi biến thể derived từ 10 record. Không xóa record lịch sử; đánh dấu `UNBACKED_ACCOUNT_DEPENDENT_COPY` kèm origin và reason. Làn A tiếp tục 0.
2. **Hợp đồng record claim-free:** Làn B chỉ được render khi có `merchant_subject`, `canonical_action_url`, `action_type=CHECK_IN_OFFICIAL_APP_OR_CHECKOUT`, `account_dependent=true`, `source_identity_observed_at`, `identity_freshness`, `evidence_state=PORTAL_IDENTITY_ONLY`. Làn C chỉ render `source_to_follow`, `last_observed_at`, `next_review_due`, `RADAR_NO_OFFER_CLAIM`. Thiếu bất cứ trường nào thì zero-state lane, không dùng count 10/3.
3. **Copy duy nhất được phép:** Làn B: “Ưu đãi, nếu có, do tài khoản và giỏ hàng quyết định. Mở kênh chính thức để tự kiểm tra trước khi thanh toán.” Làn C: “JayT đang theo dõi nguồn chính thức; chưa xác nhận ưu đãi.” Không nêu loại ưu đãi, value, time/day, eligibility, location-specific availability hay merchant policy nếu chưa có fact record.
4. **Giữ phần thật, tăng test:** giữ 4 chip/filter và calculator local-first; thêm unit/browser tests cho calculator negative/reset, combined filters và zero result. Thêm runtime claim scanner cho DOM/hidden/mobile/JSON-LD, bắt claim lexicon và external tracking parameters; phải fail build khi Làn B/C có term kinh tế/promo ngoài allowed copy.
5. **Evidence-first promotion:** muốn đưa một merchant từ identity instruction thành actual T2/T1/voucher, dùng EP state machine: discovery → raw receipt → locator replay → field record → reviewer → CEO browser review. Không coi app/cart personalization là evidence, không scrape/login, không tạo affiliate link/campaign/account/secret action.
6. **Council/CEO gate:** nộp ET diff trước/sau, quarantine matrix 10 record, required-field validator output, negative scanner proof, 1440/768/390 browser replay, accessibility/console and link scan. Bảy phòng ban phải xác nhận “0 voucher/0 offer claim” sau containment. CEO chỉ review reopened lane khi raw sample đủ.

Production tiếp tục khóa `v3.419.0`; P0 EQ không bị trì hoãn. Không Go-Live, voucher public, T1, affiliate activation/deeplink hay claim chưa có evidence. Antigravity tiếp tục ET trên staging không chờ checkpoint.

**Trạng thái CEO:** `ET ĐANG THỰC THI: ES INTERACTION PASS HẸP; LÀN B/C CLAIM CONTAMINATION PHẢI CÔ LẬP, VOUCHER VERIFIED VẪN = 0.`

---

## EU. Quyết định CEO sau kiểm tra độc lập ET — claim promotion sạch nhưng timestamp “đối soát danh tính” không có raw receipt

### Biên bản Hội đồng 7 phòng ban

**Product:** user flow Wallet/Calculator đã có giá trị, nhưng một nhãn “đối soát” không có evidence sẽ làm hỏng lời hứa minh bạch của toàn sản phẩm.  
**Design:** thay nhãn xác nhận bằng trạng thái trung tính `Cổng chính thức để tự kiểm`; chỉ dùng timestamp quan sát khi có biên nhận.  
**UX/CX:** Lane B copy chuẩn và Lane C radar giúp khách không hiểu nhầm voucher; không cần timestamp giả để UX “trông tin cậy”.  
**Growth:** không đo “10 kênh đối soát” như coverage; metric đúng là source identities có receipt tái lập.  
**Data & Trust:** CEO đọc `JAYT_WALLET_LEDGER_ET.json`: cả 10 record cùng `2026-08-30T14:00:00Z` và `VERIFIED_ACTIVE_MERCHANT_IDENTITY`, nhưng không có `artifact_id`, SHA, final URL response metadata hay artifact vault ET. Đây là self-authored provenance metadata, không phải proof. Lane C cũng có dates tự ghi; GitHub chỉ có receipt EP cho Docs page, không phải identity receipt cho `education.github.com/pack`.  
**Engineering:** `PORTAL_IDENTITY_ONLY` phải là state chưa chứng minh, không được kết hợp “VERIFIED” hay timestamp UI nếu artifact join thiếu.  
**QA:** CEO browser thấy no promo lexicon, no affiliate tracking, 4 chips và calculator chạy; đây là pass hẹp thực. Scanner hiện không kiểm absence of orphan timestamps/verified labels.

### Kết luận CEO

ET **pass hẹp** cho removal claim promo, 4-need interaction, calculator và zero tracking scan. ET **fail metadata provenance**. Không có 10 source identities “verified”; Wallet không được public `Đối soát danh tính`, `VERIFIED_ACTIVE_MERCHANT_IDENTITY`, observed/review date hay counter “kênh đối soát” cho đến khi có raw receipt join.

### Lệnh EU duy nhất

1. **Cô lập metadata chưa chứng minh:** gỡ mọi `Đối soát danh tính`, `VERIFIED_ACTIVE_MERCHANT_IDENTITY`, tự gán date và terminology xác minh từ Làn B/C public DOM/hidden/mobile/JSON-LD/health. Giữ records là `PORTAL_IDENTITY_UNVERIFIED`; update wallet count label thành `Kênh để tự kiểm` — không phải “kênh đối soát”.
2. **Receipt-backed identity model:** mỗi public Lane B/C source nếu muốn hiển thị observed-at phải có `identity_artifact_id`, raw SHA, requested/final URL, HTTP/status/response metadata, title/subject locator, capture time, reviewer và artifact-to-record join. Root portal identity chỉ dùng được sau read-only capture thực; source URL không chứng minh scope Đà Nẵng. Không có receipt thì được phép hiển thị tên nguồn + link chính thức + copy claim-free, không local scope/time/verification.
3. **Scope gate:** địa điểm/campus/city như “Đà Nẵng”, “Vincom”, “Helio”, “Coopmart” chỉ render nếu có locality evidence riêng. Nếu không, đổi thành global/unknown scope và không đưa vào near-you filter như một fact. GitHub pack EP không được tái dùng cho `education.github.com/pack` hoặc any unrelated field.
4. **Validator đúng nghĩa:** build fail nếu UI prints `verified`, `đối soát`, date/freshness, locality hoặc source category mà record không joins an immutable receipt/locator. Tăng runtime scanner với orphan receipt, self-authored timestamp và cross-URL/source reuse negative tests. Không rebrand build để thay cho remediation.
5. **Giữ flow có giá trị:** 4 need filters và calculator local-first vẫn chạy; Wallet A=0, B/C generic identity instruction/radar. Tiếp tục discovery read-only theo EP để capture receipt hợp lệ, nhưng không login, form submit, app/cart/session, affiliate/account/secret action.
6. **Council/CEO gate:** nộp EU pack gồm all record→artifact join graph, raw receipt samples, scope matrix, UI before/after, null/no-receipt states, scanner tests, browser 1440/768/390/console/a11y. CEO raw-review và browser-review trước khi mở bất kỳ freshness/identity assertion nào.

Production tiếp tục khóa `v3.419.0`; P0 EQ không bị trì hoãn. Không Go-Live, T1/voucher public/affiliate activation/deeplink hoặc provenance label thiếu artifact. Antigravity tiếp tục EU trên staging không chờ checkpoint.

**Trạng thái CEO:** `EU ĐANG THỰC THI: ET UX PASS HẸP; WALLET METADATA QUAY VỀ UNVERIFIED CHO ĐẾN KHI CÓ RECEIPT JOIN.`

---

## EV. Chỉ thị CEO tổng lực tiếp theo — chuyển từ containment sang tạo nguồn thật, không lặp vòng đổi giao diện

### Biên bản Hội đồng 7 phòng ban

**Product:** sau EU, Wallet đã có cách dùng an toàn nhưng giá trị khách hàng chỉ tăng khi danh mục có nguồn, phạm vi và hành động thực; ưu tiên các quyết định hằng ngày thay vì thêm tab/trang mới.  
**Design:** đóng băng thay đổi art-direction/rebrand không gắn với dữ liệu thực. Chỉ nâng card, ảnh và CTA khi từng asset và từng fact có nguồn/quyền dùng rõ; không dùng placeholder, ảnh AI hoặc “ảnh 4K” không có license/provenance.  
**UX/CX:** giữ 4 nhu cầu và calculator local-first; cho người dùng thấy rõ “dùng ngay”, “mở nguồn chính thức”, “đang theo dõi”, không biến link ngoài thành lời hứa ưu đãi.  
**Growth:** chỉ số tăng trưởng tiếp theo là số record nguồn thật có thể replay, số lượt mở nguồn và tỷ lệ quay lại theo hành trình; không tối ưu count bằng card hoặc voucher giả.  
**Data & Trust:** nguồn phải đi qua discovery → raw receipt → locator replay → field record → reviewer. Một URL, timestamp tự ghi, screenshot hoặc metadata tự tạo không phải bằng chứng.  
**Engineering:** dựng pipeline receipt/record/asset join có validator và dữ liệu mẫu nhỏ nhưng truy vết được; không sinh phiên bản mới nếu không có thay đổi chức năng hoặc evidence thực.  
**QA:** kiểm gate runtime cho DOM, mobile, JSON-LD, API/feed; kiểm 1440/768/390, keyboard, contrast, console, broken link và external tracking. Production P0 từ EQ chạy song song, không chờ supply.

### Kết luận CEO

Kiểm tra trực tiếp staging EU cho thấy Wallet đã trở về copy trung tính: không còn lexicon promo/giá/mã/điều kiện, không affiliate/tracking URL, console sạch và các tương tác 4 nhu cầu/calculator vẫn chạy. Đây chỉ là **EU pass hẹp cho containment**, không chứng minh offer, voucher, freshness, identity hay Go-Live.

Từ mốc này, Antigravity chấm dứt chu kỳ “đổi màu/đổi hero/đổi version” để tạo cảm giác tiến độ. Lực lượng chuyển sang **nguồn cung có bằng chứng** và remediation production P0. Không được tự gọi build, report hay Council note là bằng chứng hoặc nghiệm thu.

### Lệnh EV duy nhất

1. **Workstream Supply thật (ưu tiên cao nhất):** lập cohort read-only công khai theo 5 hành trình: ăn uống quanh campus/khu văn phòng; đi lại và tiện ích công; học tập–công cụ; văn hóa/giải trí; mua sắm thiết yếu. Với mỗi nguồn, nộp raw HTTP receipt bất biến gồm requested/final URL, HTTP/status, thời điểm capture, SHA, title/subject locator, trường được trích, scope, quyền dùng asset và reviewer. Chỉ dùng nguồn công khai; không đăng nhập, submit form, dùng app/cart/session hay secret.
2. **Phân tầng thay vì chặn nguồn:** thiếu giá/điều kiện/hạn/tổng chi phí thì tuyệt đối không T1 và không nói voucher. Một fact chương trình công khai có receipt, scope và điều kiện rõ có thể vào T2 sau reviewer; địa điểm/tiện ích có evidence riêng vào T3; nguồn chỉ mới biết để theo dõi vào T4. Lane A Voucher verified tiếp tục bằng 0 cho đến khi có economic evidence đầy đủ. Không đưa “50 deal”; mục tiêu là tiến dần tới 30–50 **nội dung hữu ích/ngày theo T1–T4**.
3. **Kho dữ liệu và UI có trách nhiệm:** tạo candidate ledger và evidence vault append-only; record phải có claim-type, tier-candidate, receipt join, source scope, expiry/freshness nếu thật sự có, asset-right state, reviewer state và public eligibility. UI chỉ render field đủ gate; thiếu field phải rơi về T4/zero-state, không copy generic để lấp khoảng trống. Thiết kế card/hero chỉ dùng asset có nguồn/quyền dùng và alt text; không được “nâng cấp hình ảnh” bằng asset không rõ quyền.
4. **Vận hành affiliate đúng cốt lõi:** giữ AccessTrade ở trạng thái nghiên cứu read-only. Đánh giá toàn catalog theo nhu cầu khách và model tổng thực trả, nhưng không hiển thị campaign/voucher/hoa hồng hay tạo deeplink. Mọi “voucher ẩn/cá nhân hóa” chỉ là hướng dẫn tự kiểm trong kênh chính thức, không phải inventory JayT. Chỉ đề xuất activation khi có authority riêng, campaign terms, giá/tổng chi phí/điều kiện/lịch sử quan sát và disclosure.
5. **Production P0 song song:** hoàn tất backlog EQ cho production v3.419.0: map 17 item/9 raw-capture claims tới evidence hoặc quarantine, quét toàn bộ public routes/metadata/feed và loại bỏ exposure sai. Không để workstream supply làm trì hoãn P0, và không phát hành production.
6. **Gate chất lượng bắt buộc:** nộp EV pack: cohort matrix; receipt-to-record join graph; 5 receipt mẫu replay được; tier decision log; scope/asset-right matrix; no-receipt zero-state; claim/tracking/orphan-date scan; 1440/768/390 browser replay, keyboard/a11y/console/link scan; metric definition. QA phải chứng minh các test chạy trên artifact/build thực, không chỉ nêu PASS trong báo cáo.
7. **Nhịp tự vận hành:** sau mỗi checkpoint, 7 phòng ban tự tạo work order kế tiếp từ gap đo được trong phạm vi an toàn. Chỉ dừng chờ authority khi production release, affiliate/account/secret action hoặc quyết định pháp lý/quyền asset chưa rõ. Mọi change lớn tiếp theo phải có Council note hợp nhất và CEO review source + browser trước nghiệm thu.

Production vẫn khóa `v3.419.0`. Không Go-Live, không T1/public voucher/affiliate activation/deeplink, không price/history/review/ảnh/địa chỉ/claim chưa có evidence. Antigravity tiếp tục EV trên staging và evidence vault, không chờ lời nhắc.

**Trạng thái CEO:** `EV ĐANG THỰC THI: EU CONTAINMENT PASS HẸP; ƯU TIÊN SUPPLY RECEIPT-BASED + PRODUCTION P0, DỪNG VÒNG LẶP REBRAND.`

---

## EX. Quyết định CEO sau kiểm tra độc lập EV — 50 mục public không có receipt-to-record join tương xứng

### Biên bản Hội đồng 7 phòng ban

**Product:** khách không phân biệt được “cổng nguồn” với một chương trình/địa điểm đã xác minh khi 13 mục được đặt dưới nhãn Chương Trình và 50 mục được gắn hành trình/khu vực.  
**Design:** badge và vị trí địa phương đang tạo tín hiệu tin cậy vượt bằng chứng; phải thiết kế lại zero-state/label để trung tính, không cố làm dashboard “đầy”.  
**UX/CX:** flow 4 nhu cầu và calculator có thể giữ; card source chưa có scope không được đi vào filter “gần bạn”, giờ, khu vực hay Maps như fact.  
**Growth:** count 50 không là north-star khi nguồn không replay được. Chỉ tính nội dung đủ public-eligibility; tăng trưởng không được dùng số card tự khai.  
**Data & Trust:** CEO đọc ledger EV và thấy nhiều T2/T3 mang PORTAL_IDENTITY_ONLY, OFFICIAL_URL_DECLARED_PENDING_VAULT_CAPTURE hoặc has_verified_field_fact=false, nhưng lại receipt_join=RECEIPT_EV_VERIFIED, T2 và local scope. Sáu receipt vault không đủ chứng minh toàn bộ 50 record; đây là false join.  
**Engineering:** validator đã không chặn derived locality, address, time slot, transit hint, Maps query, badge hoặc T2/T3 từ record thiếu artifact join.  
**QA:** CEO browser review v3.476.0-staging.ev thấy Khám phá (50), Chương Trình (13), card CGV/Domino's/Lotteria/Metiz/GitHub/Notion/Canva... với scope Đà Nẵng; report static/E2E PASS không kiểm factual join. Đây là fail runtime governance.

### Kết luận CEO

EV **fail Supply Public Eligibility và P0 evidence assertion**. Việc report nói “8 T2, 12 T3, 30 T4 có receipt” không được chấp nhận. Không có 50 nội dung public hợp lệ, không có 13 chương trình được xác minh, và không có P0 production remediation được CEO xác nhận chỉ vì file JSON tự ghi.

### Lệnh EX duy nhất

1. **Fail-closed ngay trên staging:** gỡ khỏi public DOM, hidden/mobile/JSON-LD/feed các T2/T3 và toàn bộ derived locality, địa chỉ, giờ, transit hint, Maps query, “gần bạn”, category/program label nếu record chưa có subject-specific immutable artifact join và scope fact riêng. Không “hạ nhãn” nhưng vẫn giữ data đó trong card. Render zero-state hoặc T4 claim-free: tên nguồn, canonical official link, “Phạm vi chưa xác minh bởi JayT”, “JayT đang theo dõi nguồn chính thức; chưa xác nhận ưu đãi.”
2. **Chống false join:** cấm RECEIPT_EV_VERIFIED như giá trị mặc định. Mỗi record public phải có unique artifact_id, SHA của raw payload, requested/final URL, HTTP metadata, capture time, locator, extracted field list, reviewer, scope evidence id và deterministic validation. Artifact một nguồn không được dùng để chứng minh record/cơ sở/URL khác; source root không chứng minh chi nhánh Đà Nẵng.  
3. **Quarantine ledger:** giữ toàn bộ 50 record trong candidate ledger append-only, nhưng phân tách rõ candidate khỏi public_eligible. Xuất quarantine matrix theo từng item nêu missing field, origin, derived facts cần xóa và đường nâng cấp hợp lệ. T1=0; T2/T3 public chỉ đếm record có full join; T4 không có local fact khi thiếu evidence.
4. **P0 production trở về OPEN:** biên bản production_p0_remediation_receipt_ev.json chỉ là self-authored plan, không phải closure. Reopen P0_EQ; CEO sẽ tự kiểm lại production live trước khi bất cứ trạng thái nào được đổi khỏi OPEN. Không thay production, không deploy.
5. **Sửa validator và test:** fail build khi count/category/tier/scope/Maps/asset attribution visible không chứng minh được bằng evidence graph. Bắt buộc test negative với CGV root→CGV Đà Nẵng, GitHub docs→GitHub pack, portal→chi nhánh, và receipt reuse. Browser test phải đếm public eligible bằng graph query, không bằng array length.
6. **Chỉ tiếp tục supply đúng cách:** capture read-only từng source công khai, raw/replay được, tối đa một fact nhỏ mỗi subject; không login, app/cart/session/form, affiliate/action hoặc asset download. Ưu tiên T3 tiện ích công có authority source rõ trước; T2 chỉ sau terms/program evidence.
7. **Council/CEO gate:** nộp EX pack gồm public-vs-candidate diff, 50-row quarantine matrix, validator output, 5 raw receipt replay thật, UI 1440/768/390 và console/a11y/link scan. Council phải ghi rõ counts candidate, public eligible, unverified; CEO review artifact và browser trước khi bất kỳ count/badge/tier/scope nào quay lại.

Production vẫn khóa `v3.419.0`, P0_EQ = OPEN. Không Go-Live, không T1/voucher public/affiliate activation, không 50-content claim, không status “remediated” khi CEO chưa có evidence độc lập. Antigravity tự thi hành EX không chờ checkpoint.

**Trạng thái CEO:** `EX ĐANG THỰC THI: EV SUPPLY PUBLIC-ELIGIBILITY FAIL; STAGING PHẢI FAIL-CLOSED, PRODUCTION P0 MỞ LẠI.`

---

## EY. Chỉ thị khẩn CEO — EX chưa được thực thi trên staging; chuyển sang gate đo được và chống báo cáo sai

### Biên bản Hội đồng 7 phòng ban

**Product:** không có giá trị nào từ số “50” nếu customer vẫn thấy 13 chương trình và địa điểm local chưa được chứng minh.  
**Design:** cần một trạng thái nguồn theo dõi thật sự gọn, rõ; không badge “cổng chính thức” hoặc layout giàu thông tin khiến người dùng suy ra JayT đã xác minh nội dung.  
**UX/CX:** phải trả về hành động an toàn một bước “mở nguồn chính thức”; không Maps, địa chỉ, near-you, giờ, tuyến, campus hoặc copy “Đà Nẵng” derived khi scope evidence không có.  
**Growth:** báo cáo completion không phải metric; metric là assertion thực tế browser trả về 0 cho public exposure bị cấm.  
**Data & Trust:** CEO trực tiếp vào v3.477.0-staging.ex thấy Khám phá (50), Chương Trình (13), địa chỉ/địa danh như Nguyễn Văn Linh, Helio Center, Hải Châu, Tầng 4; không có copy fail-closed yêu cầu.  
**Engineering:** DOM vẫn có 38 href Google Maps. Build đã không dùng data gate để render; release receipt không phản ánh artifact đang serve.  
**QA:** 16 ảnh/E2E và 10 test “PASS” không đo assertion EX. Đây là false completion report, không được dùng làm evidence.

### Kết luận CEO

EX **fail thực thi runtime**. Antigravity không được nói “đã gỡ sạch”, “đã nghiệm thu” hay “đã đồng bộ hoàn tất” cho đến khi CEO browser check độc lập qua các assertion định lượng dưới đây. Không được tạo section/version/rebrand mới để thay việc khắc phục.

### Lệnh EY duy nhất

1. **Containment bắt buộc trên artifact đang serve:** sửa đúng SOT và staging server để public browser trả về: 0 Maps href; 0 địa chỉ/giờ/khu vực/transit/campus/city scope derived; 0 badge/tên nhóm T2/T3/Chương Trình cho record unverified; 0 count “Khám phá (50)” khi 50 chỉ là candidates. Không được che bằng CSS, viewport hay route khác; quét DOM, hidden, mobile, JSON-LD và feed.
2. **Renderer fail-closed:** chỉ một model render được phép: record thiếu full evidence graph → radar trung tính với canonical source URL và hai câu copy EX; không locality/card detail/filter match. Khi public eligible = 0, UI phải thể hiện zero-state rõ ràng và vẫn giữ calculator/4 chips ở mức tìm nhu cầu, không cho chúng lọc ra facts local bịa.
3. **Chứng minh bằng lệnh tái lập:** nộp script read-only chạy trên HTTP response của staging (không phải source file) và xuất raw output: version, text assertions, total/external href, Maps count, forbidden lexicon count, visible count by public tier, hash. Test phải fail nếu bất kỳ assertion EY sai. QA phải chạy chính script tại 1440/768/390 và nộp output nguyên gốc.
4. **Đồng nhất SOT/deploy:** cung cấp manifest gồm SOT source hash, server-loaded path/hash, served HTML hash và build timestamp. Nếu các hash/paths lệch, trạng thái là DEPLOY_DRIFT và không gọi release completed. Không copy/sync tự động ghi đè lịch sử hoặc production.
5. **Quarantine vẫn giữ:** ledger 50 candidate được giữ append-only, không public theo count/tier/scope. Không xoá bằng chứng/history; chỉ tách customer feed fail-closed khỏi candidate warehouse. Tiếp tục raw capture read-only riêng từng subject theo EX.
6. **Council/CEO gate:** trước report tiếp theo, mỗi phòng ban xác nhận assertion EY bằng output chứ không bằng narrative; Data & Trust ký matrix public eligibility, Engineering ký served-artifact hash, QA ký browser assertion. CEO sẽ kiểm browser lại; không có CEO pass thì EY vẫn OPEN.

Production v3.419.0 vẫn khóa, P0_EQ vẫn OPEN. Không Go-Live, voucher public, T1, affiliate activation hoặc claim completion. Antigravity tự khắc phục EY ngay trên staging, không chờ checkpoint.

**Trạng thái CEO:** `EY ĐANG THỰC THI: EX RUNTIME FAIL; CONTAINMENT CHỈ ĐƯỢC TÍNH KHI BROWSER ASSERTION = 0.`

---

## EZ. Quyết định CEO về đề xuất “Siêu Giá Trị Tiết Kiệm” — phê duyệt mục tiêu, không phê duyệt cơ chế chưa có authority/evidence

### Phán quyết đối với đề xuất

JayT phải trở thành công cụ giúp sinh viên và dân văn phòng **ra quyết định mua rẻ hơn và tốt hơn**, không phải một cẩm nang thụ động. Mục tiêu đó được phê duyệt. Tuy nhiên, đề xuất không được triển khai nguyên văn: các số lượng dân số, giá, mã, tỷ lệ giảm, hoa hồng, điều kiện ngân hàng, “voucher ẩn”, giá đáy 90 ngày, 1-click app routing, Sub-ID và citation dạng placeholder đều chưa có evidence/authority phù hợp.

Không được coi việc người dùng bấm “lưu mã” là quyền cho JayT thu thập, gắn link hoặc hứa sẵn voucher. Không có tự động gom voucher, campaign registry, deeplink/universal router, affiliate sub-id, account opening/KYC funnel hoặc launch tuần tới.

### Biên bản Hội đồng 7 phòng ban

**Product:** phê duyệt ba job-to-be-done: tìm ưu đãi hợp lệ, tính tổng thực trả bằng dữ liệu người dùng tự nhập, và mở nguồn chính thức để tự kiểm.  
**Design:** có thể xây trải nghiệm “Savings Lab” đẹp, dễ hiểu, nhưng trạng thái dữ liệu trống/chưa xác minh phải là thiết kế hạng nhất; palette chỉ áp dụng sau token/a11y review, không được tuyên bố AAA trước đo kiểm.  
**UX/CX:** nhãn đúng là “Tự kiểm trong app/giỏ hàng chính thức”, không “voucher ẩn”, “săn đáy” hay “rẻ hơn tự mua” khi chưa có basket evidence.  
**Growth:** xác nhận nhu cầu qua research zero-PII và hành vi mở nguồn, không dùng CPA, KYC hoặc commission làm north-star.  
**Data & Trust:** mọi economic claim cần price, phí, discount, condition, expiry, final total và observation history có provenance; personalized/cart-dependent không được inventory hóa.  
**Engineering:** chuẩn bị data contracts, calculator local-first và feature flags disabled; không gọi API/portal đăng nhập, không tạo link/campaign/sub-id.  
**QA:** kiểm disclosure state, negative claims, accessibility, external link safety và rendering no-data; không đánh dấu affiliate readiness chỉ bởi mock.

### Lệnh EZ duy nhất

1. **Xây Savings Lab an toàn trên staging:** một hub gồm ba luồng: “Nhập chi phí để tự tính thực trả”, “Mở nguồn chính thức để tự kiểm ưu đãi”, “Theo dõi nguồn”. Calculator chỉ dùng input do người dùng điền trong máy; công thức và disclaimer phải nêu rõ JayT không biết giá/ship/mã trong giỏ nếu không có receipt được chứng minh.
2. **Dữ liệu dùng cho T1/Voucher:** tạo schema không chứa claim: product/service subject, list price observation, shipping observation, discount code/value, eligibility, expiry, total-cost formula, source receipt, capture/recheck timestamp, history observations, reviewer. Thiếu một trường kinh tế bắt buộc thì T1/Voucher = 0. “Account/cart dependent” chỉ là instruction to check, không có value/code/availability.
3. **Nghiên cứu nguồn và catalog:** thực hiện discovery read-only các merchant/campaign public và AccessTrade ở trạng thái hypothesis/offline. Lập fit-score theo nhu cầu sinh viên/dân văn phòng, không theo hoa hồng; không login, tạo campaign, tạo link, đăng ký, gửi data hay dùng secret. Không đưa campaign result ra public.
4. **Thiết kế và research:** làm 2 prototype nội bộ cho Savings Lab và voucher zero-state, đo keyboard/mobile/a11y, sau đó nghiên cứu zero-PII với câu hỏi về hành trình mua và khó khăn thực tế. Không hiển thị review/rating/quote cộng đồng cho đến khi có consent, provenance và moderation.
5. **Gate authority riêng:** mọi tạo/đăng ký affiliate, deeplink, sub-id, tracking, app route, KYC/fintech content, production release hoặc asset license cần yêu cầu authority cụ thể trước hành động. Disclosure chỉ xuất hiện khi affiliate thực sự được phép hoạt động.
6. **Thước đo và gate:** Council nộp EZ pack gồm evidence schema, calculator tests, no-data UX, user-research protocol, affiliate boundary map, feature-flag proof và 1440/768/390/a11y/performance evidence. CEO review SOT và browser trước khi cho phép bất kỳ economic fact nào lên public.

EY containment vẫn là điều kiện trước. Production v3.419.0 vẫn khóa; P0_EQ mở; T1/voucher public/affiliate activation/deeplink/sub-id = 0. Antigravity tự tiến hành phần prototype, schema, research và discovery read-only không cần chờ checkpoint.

**Trạng thái CEO:** `EZ ĐANG THỰC THI: MỤC TIÊU VALUE ENGINE ĐƯỢC PHÊ DUYỆT; MONETIZATION/AFFILIATE VẪN AUTHORITY-GATED.`

---

## EZ-A. Xác nhận Chủ tịch và lệnh hoàn thiện EZ Review Pack

**Quyết định:** Chủ tịch đã chấp thuận toàn văn EZ. Hội đồng 7 phòng ban và Antigravity lập tức hoàn thiện một **EZ Review Pack duy nhất**, phục vụ CEO kiểm định độc lập. Đây là mốc staging/review, không phải quyền phát hành production hay kích hoạt affiliate.

### Thành phần bắt buộc của Review Pack

1. **Product:** problem statement, 3 job-to-be-done, user-flow Savings Lab, acceptance criteria và danh sách rõ phần chưa làm.  
2. **Design:** prototype desktop/mobile, design token/a11y contrast measurement, no-data/zero-state, asset register và quyền dùng asset.  
3. **UX/CX:** microcopy claim-free, keyboard/focus/error-state, local-first/privacy note, test plan cho người dùng không tiết lộ PII.  
4. **Growth:** metric tree không dùng commission/KYC; research protocol zero-PII, recruitment/consent/moderation boundaries.  
5. **Data & Trust:** evidence schema, state machine T1–T4, field-gate matrix, sample no-claim records, provenance/expiry/history contract và negative cases.  
6. **Engineering:** SOT path/hash, served-artifact manifest, feature flags mặc định disabled cho affiliate/economic claims, calculator tests và read-only discovery boundary.  
7. **QA:** raw output assertion EY, 1440/768/390 browser replay, console/link/JSON-LD scan, a11y/performance/motion findings, known gaps và exact reproduction commands.

### Điều kiện nộp và kiểm định

- Mỗi kết luận phải liên kết tới artifact thực, raw output hoặc browser observation; report narrative/screenshot/hash đơn lẻ không đủ.  
- Pack phải phân biệt đã kiểm độc lập, đã làm nhưng chưa kiểm, candidate, blocked by authority và chưa làm; không dùng từ “nghiệm thu”, “Go-Live”, “verified offer” hay “affiliate-ready” khi chưa qua CEO gate.  
- QA bắt buộc chứng minh staging đang chạy build đúng SOT; Council không được tự chấm pass cho phần mình.  
- Antigravity tiếp tục prototype, schema, accessibility, research protocol và discovery read-only; không có production deploy, affiliate link/campaign/deeplink/sub-id, login/secret/KYC action hay economic claim.

CEO sẽ kiểm trực tiếp SOT, artifact và browser khi Pack nộp đủ; chỉ khi đó mới ra lệnh tiếp theo. Production v3.419.0 vẫn khóa; P0_EQ mở; T1/voucher public/affiliate activation = 0.

**Trạng thái CEO:** `EZ-A ĐANG THỰC THI: CHỦ TỊCH ĐÃ CHẤP THUẬN EZ; ĐANG CHỜ REVIEW PACK CÓ EVIDENCE ĐỘC LẬP.`

---

## EZ-B. Quyết định CEO sau kiểm tra EZ Review Pack — containment hẹp pass, Savings Lab/public-count fail

### Quan sát trực tiếp của CEO

Trên staging v3.478.0-staging.ey: Maps href = 0, affiliate/tracking = 0, 50 cards đã mang copy Radar trung tính và “Phạm vi chưa xác minh bởi JayT”. Feature flags đọc được cũng giữ affiliate/economic claim/deep-link/login/autogom disabled; schema kinh tế đặt đủ trường gate đúng hướng.

Tuy nhiên, browser vẫn hiển thị “Đang hiển thị 50 / 50 mục”, 4 chip mang số lượng/mô tả địa phương, bộ lọc khu vực có Hòa Khánh/Ngũ Hành Sơn/Hải Châu/Thanh Khê/Sơn Trà và hero vẫn tạo ngữ cảnh địa phương không có scope receipt. Lối vào “Tự Tính Thực Trả & Chia Bill” không đưa người dùng đến form input nào trong giao diện công khai. Vì vậy, 68/68 assertion của report không đại diện đầy đủ cho hành vi khách hàng.

### Biên bản Hội đồng 7 phòng ban

**Product:** public candidate count phải bị tách hoàn toàn khỏi user-visible inventory; Savings Lab phải là chức năng tìm thấy và dùng được, không phải test unit ẩn.  
**Design:** zero-state cần làm rõ “chưa có ưu đãi xác minh” thay vì giữ density 50 card; local imagery/copy chỉ sau scope/asset proof.  
**UX/CX:** một CTA phải dẫn được đến form calculator có label, validation và reset; không dùng filter địa phương cho tập dữ liệu unknown-scope.  
**Growth:** không đo discovery bằng 50 candidate hiện công khai; đo mở nguồn chính thức và usage calculator sau khi có event model privacy-safe.  
**Data & Trust:** community/city facts ở hero/chip/filter là assertion và chịu cùng evidence gate với card.  
**Engineering:** unit test không thay thế route/DOM interaction test; feature must be mounted, reachable and exercised in served artifact.  
**QA:** đổi assertion để bắt public count, filter option, hero copy và route reachability; không tự gọi Review Pack “hoàn tất”.

### Lệnh EZ-B duy nhất

1. **Bỏ public inventory giả:** ẩn “Đang hiển thị 50/50”, mọi count theo hành trình, “Khám phá (50)” và danh sách candidate khỏi khách. Nếu không có public-eligible records thì render zero-state rõ và vẫn cho mở nguồn theo dõi.
2. **Scope fail-closed toàn trang:** gỡ/disable các filter, hero/story, time/place suggestions và card labels có khu vực/campus/city/địa chỉ/route chưa có receipt riêng. Không được chỉ quét card mà bỏ header, mobile nav, aria-label, JSON-LD hoặc JS state.
3. **Làm Savings Lab thực sự truy cập được:** thêm một route hoặc modal có thể được mở bằng CTA “Tự tính thực trả”, với các input có label cho giá, phí, giảm giá và số người; kết quả local-only, validation số âm/chia 0/reset và disclaimer no-data. Không prefill giá/mã/merchant claim; không network storage, tracking hay affiliate.
4. **Cập nhật test theo user-visible artifact:** browser E2E phải click CTA, fill form, kiểm kết quả/reset/negative case và kiểm 3 viewport. HTTP/DOM scan phải đo candidate count, public eligible count, filter values và locality lexicon trên toàn response/runtime—not only JS source token.
5. **Review Pack delta:** nộp chỉ delta EZ-B: before/after DOM output, route map, no-data screenshots, calculator interaction transcript, console/link/a11y results, SOT/served hash and known gaps. Cập nhật matrix trạng thái: containment = pass hẹp; Savings Lab public UX = open; production/affiliate authority = blocked.

Không được thêm economic claim, voucher, price history, affiliate link/deeplink/sub-id hoặc production release. CEO chỉ review lại khi EZ-B browser evidence được nộp; P0_EQ vẫn OPEN.

**Trạng thái CEO:** `EZ-B ĐANG THỰC THI: EY CONTAINMENT PASS HẸP; EZ-A REVIEW PACK KHÔNG PASS VÌ PUBLIC COUNT/SCOPE VÀ SAVINGS LAB UX CHƯA ĐẠT.`

---

## EZ-C. Quyết định CEO sau browser review EZ-B — mở Evidence Production Lab, giữ toàn bộ gate thương mại

### Kết quả kiểm trực tiếp

CEO browser review xác nhận: public DOM không còn Maps/tracking/count candidate/quận-trường từ kiểm tra hiện tại; 50 record hiển thị Radar/no-scope; CTA Savings Lab mở form 5 input có label; phép tính 150.000 + 25.000 − 30.000 − 10.000, chia 3, trả 135.000 / 40.000 / 45.000 và Reset về 0; console không có warning/error.

Đây là **pass hẹp cho EY containment và EZ-B calculator interaction**. Không phải Review Pack/release pass: staging browser hiện là v3.480.0-staging.ez trong khi report/delta ghi v3.478.0-staging.ey; parity/version evidence phải cập nhật trước mọi kết luận release.

### Biên bản Hội đồng 7 phòng ban

**Product:** Savings Lab đã có vòng giá trị đầu tiên; bước tiếp theo là tạo evidence pipeline, không thêm danh mục giả.  
**Design:** giữ zero-state chất lượng cao, ưu tiên readability/mobile; chỉ đưa hình/card richness khi asset and fact proof đầy đủ.  
**UX/CX:** tiếp tục test task completion với input do người dùng tự chọn; không dẫn khách đến lời hứa voucher.  
**Growth:** khởi động research zero-PII theo protocol; đo ý định/tác vụ, không commission hay conversion affiliate.  
**Data & Trust:** tạo “Evidence Production Lab” nội bộ: mỗi fact phải được capture, replay và review riêng; không biến candidate thành public.  
**Engineering:** đóng DEPLOY_DRIFT bằng version manifest chạy từ served artifact và route-level contract.  
**QA:** duy trì customer E2E và thêm version mismatch fail test; không cho một report cũ pass build mới.

### Lệnh EZ-C duy nhất

1. **Version/parity closure:** cập nhật SOT, staging health, served HTML/JS hash, release receipt và test expectation theo build thực v3.480 hoặc rollback staging về version đã chứng minh. Bất kỳ mismatch nào đặt trạng thái DEPLOY_DRIFT và chặn review/release.
2. **Evidence Production Lab nội bộ:** cho mỗi source public, capture read-only raw receipt + final URL + SHA + locator + scope + extraction + reviewer; chạy deterministic replay. Không public count, card detail, tier T1/T2/T3 hoặc economic fact từ lab cho đến khi full gate pass.
3. **Supply theo cohort, không bịa đề xuất:** ưu tiên 5 cohort EZ (học tập, tiện ích công, ăn uống, giải trí, thiết yếu), mỗi cohort bắt đầu bằng tối đa 2 subjects. T4 chỉ là canonical source link và no-scope copy; T2/T3 chỉ sau artifact subject-specific; T1/Voucher vẫn 0.
4. **Research và UX:** thực thi protocol zero-PII sau checklist consent/moderation; ghi aggregate findings không định danh. Dùng insight chỉ để ưu tiên problems/prototype, không tạo social proof hay claim nhu cầu.  
5. **Review pack C:** nộp version-parity manifest, 10 candidate/receipt entries (nếu capture hợp lệ), state transition log, zero-state browser evidence 1440/768/390, Savings Lab regression, a11y/performance/console/link scan và full list blocked actions. Council ghi rõ scope evidence thực tế, không dùng coverage count.
6. **Ranh giới không đổi:** không production release, affiliate/campaign/deeplink/sub-id/tracking, login/KYC/PII, price/voucher/history/review claim hoặc asset không rõ quyền. Authority riêng vẫn bắt buộc. 

P0_EQ vẫn OPEN; production v3.419.0 khóa. CEO sẽ kiểm evidence graph và browser artifact của EZ-C trước bất kỳ mở tầng public nào.

**Trạng thái CEO:** `EZ-C ĐANG THỰC THI: EY + EZ-B UX PASS HẸP; VERSION PARITY OPEN, EVIDENCE PRODUCTION BẮT ĐẦU, COMMERCIAL GATES GIỮ KHÓA.`

---

## EZ-D. Quyết định CEO sau kiểm tra Evidence Production Lab — parity pass; raw-evidence production fail

### Kết quả kiểm độc lập

Health staging trả v3.480.0-staging.ez, UP và các SHA served/SOT JS/HTML trùng nhau; version parity **pass hẹp**. Tuy nhiên, kiểm artifact DanaBus trong Evidence Lab cho thấy payload là file Markdown tự biên soạn (“EVIDENCE RAW CAPTURE”), còn receipt JSON tự ghi HTTP 200, timestamp, quote và reviewer. Đây không phải raw HTTP response bất biến, không chứa response body/header thực hay bằng chứng replay từ canonical URL.

Vì vậy, 10 subjects là candidate nội bộ đúng trạng thái public_eligible=false, nhưng 43/43 “replay” chỉ kiểm consistency của dữ liệu tự tạo. Không có fact nào được nâng T2/T3/T1, không có raw evidence production complete.

### Biên bản Hội đồng 7 phòng ban

**Product:** Lab có ích như backlog source, nhưng không được mô tả là catalog thông tin đã xác thực.  
**Design:** giữ customer surface zero-state; không thêm rich card cho lab candidate.  
**UX/CX:** không để receipt language/quote nội bộ xuất hiện như signal tin cậy trước khách.  
**Growth:** discovery pipeline không tạo nội dung tăng trưởng cho tới khi receipt thật đủ.  
**Data & Trust:** raw artifact phải là body bytes nhận trực tiếp từ URL công khai, có request/final URL, redirect chain, status, selected response headers, capture clock, SHA bytes và locator; Markdown summary là derived note, không thể làm evidence.  
**Engineering:** xây capture runner read-only reproducible, vault write-once và replay fetch/compare; cấm generator tạo raw payload/receipt từ template.  
**QA:** test phải phát hiện body tự biên soạn, status/timestamp tự khai, artifact thiếu request transcript, redirect chain hoặc content-type; mọi test hiện tại phải chuyển status lab-contract only.

### Lệnh EZ-D duy nhất

1. **Quarantine Evidence Lab hiện tại:** giữ 10 entries append-only nhưng gắn EVIDENCE_SYNTHETIC_OR_UNPROVEN; đổi test/pack wording từ “raw/replay verified” thành “registry contract check”. Không xóa lịch sử và không public hóa.  
2. **Raw capture contract mới:** mỗi capture read-only phải lưu raw response bytes nguyên vẹn, request URL, final URL, redirect chain, status, content-type, selected headers, capture timestamp từ runner, SHA-256 bytes, canonical subject locator và separate reviewer decision. Không được tự tạo response body, tự gán HTTP 200/timestamp/quote hoặc dùng Markdown làm raw.  
3. **Replay độc lập:** runner phải fetch lại canonical URL public theo lịch định nghĩa, đối chiếu final URL/status/content-type/byte hash hoặc ghi rõ drift; capture failure không được bù bằng template/placeholder. Không login, cookies/session persistence, form submit, app/cart hoặc bypass.  
4. **Fact gate:** chỉ sau raw artifact thật + replay + subject/scope locator + reviewer mới có thể đề nghị T3/T2. Một web root/portal không chứng minh địa điểm, giá, ưu đãi hay city scope; T1/Voucher vẫn 0 cho đến 12-field economic evidence.  
5. **Pack D:** nộp 2 captures thật tối đa, không cần đủ 10; kèm raw bytes, transcript, SHA/replay output, difference log, source-right/scope matrix, validator negative cases và explicit list entries còn quarantined. Nếu không capture được, báo failure đúng nghĩa và tiếp tục T4 no-scope.  
6. **Không đổi gate:** production v3.419.0 khóa, P0_EQ open; không affiliate/campaign/deeplink/sub-id/tracking/login/KYC/PII hoặc price/voucher/review claim. CEO kiểm raw bytes cùng browser artifact trước bất kỳ chuyển tier/public count nào.

**Trạng thái CEO:** `EZ-D ĐANG THỰC THI: VERSION PARITY PASS HẸP; EVIDENCE LAB RAW-PRODUCTION FAIL, 10 SUBJECTS VẪN QUARANTINED.`

---

## EZ-E. Quyết định CEO sau xác minh raw bytes EZ-D — runner pass hẹp, report-integrity và fact eligibility vẫn fail

### Kết quả kiểm độc lập

Hai file raw binary EZ-D tồn tại với byte length/hash khớp transcript local; đây là bước tiến thực từ lab Markdown cũ. Nguồn GitHub Docs hiện công khai xác nhận GitHub Education dành cho sinh viên/cơ sở giáo dục được công nhận, nhưng không chứng minh quyền lợi địa phương, giá hay voucher. DanaBus hiện trả một trang rất nhỏ chủ yếu chứa iframe, không phải evidence về tuyến, giá hay ưu đãi. [GitHub Docs](https://docs.github.com/en/education/about-github-education/github-education-for-students/about-github-education-for-students) [DanaBus](https://danabus.vn/)

Tuy nhiên, SHA được nêu trong report EZ-D không khớp SHA trong transcript và file vault thực. Bất kỳ report hash không khớp artifact là integrity failure. Runner/capture có thể được ghi nhận **pass hẹp cho hạ tầng raw capture**, nhưng 0 subject public eligible, 0 T2/T3/T1/Voucher.

### Lệnh EZ-E duy nhất

1. **Sửa integrity chain:** release/report/registry phải lấy SHA, length, content-type và capture metadata trực tiếp từ vault manifest generated by runner; không được gõ lại/hash hard-code. Build fail khi bất cứ summary/report/transcript/raw file nào lệch nhau.
2. **Phân loại capture chính xác:** GitHub = global official documentation candidate, no-local/no-economic; DanaBus root = portal-shell candidate, insufficient field fact. Không dùng hai capture làm “2 source verified”, không gắn scope địa phương hoặc public card.
3. **Capture có giá trị thông tin:** với mỗi cohort, chỉ chọn một URL public có subject-specific substantive content; browser/HTTP raw capture phải có locator trích đúng claim được đề xuất. Khi source chỉ là iframe/redirect shell, follow final public canonical URL chỉ nếu read-only, ghi đầy redirect chain và không suy luận fact.
4. **Evidence graph v2:** bắt buộc separate node cho source identity, subject fact, local scope, economic fact và asset right; validator cấm node identity chứng minh node khác. T4 source identity có thể nội bộ theo dõi; T2/T3 cần subject/scope fact; T1 cần full economic schema.
5. **Review Pack E:** nộp tối đa 2 captures substantive kèm manifest tự sinh, raw bytes, replay/difference output và negative test report-hash mismatch. Council báo rõ runner pass, candidate status và public eligibility 0; không dùng “hoàn tất” hoặc “verified” cho fact chưa đủ.

Production v3.419.0 khóa, P0_EQ open, T1/Voucher/affiliate activation/deeplink/sub-id = 0. Antigravity tiếp tục EZ-E read-only, không chờ checkpoint.

**Trạng thái CEO:** `EZ-E ĐANG THỰC THI: RAW CAPTURE RUNNER PASS HẸP; REPORT-INTEGRITY FAIL, 0 PUBLIC ELIGIBLE.`

---

## EZ-F. Quyết định CEO sau xác minh EZ-E — First Verified Utility Ladder

### Kết quả CEO

EZ-E đạt **pass hẹp cho integrity chain**: raw binary Dana Nang civic portal có SHA khớp transcript/registry và redirect 301→200 được ghi rõ; GitHub raw capture cũng còn ở trạng thái global/no-economic. Hai capture này chỉ chứng minh identity/document existence. Chúng không mở T1/T2/T3, voucher, scope địa phương chi tiết, count hay affiliate.

### Lệnh EZ-F duy nhất

1. **Chuyển mục tiêu từ “nguồn” sang “fact hữu ích”:** mỗi cohort chỉ chọn 1 subject có nội dung cụ thể, công khai và bền vững. Ưu tiên: hướng dẫn/thủ tục tiện ích công, lịch/điều kiện công khai, hỗ trợ học tập chính thức. Không ưu tiên merchant promotion, cart/app personalization hay pages cần đăng nhập.
2. **Utility fact card contract:** một đề xuất T3/T2 phải có raw bytes + integrity chain, locator trích đúng fact, subject identity, scope trực tiếp được source nêu, action URL, freshness/recheck policy, asset-right/no-asset decision và reviewer. Không có full contract thì vẫn internal candidate/T4 no-scope.
3. **Hai capture hiện có:** GitHub và Da Nang civic chỉ được dùng làm benchmark graph và canonical-source candidates; không render source identity, timestamp hay trích dẫn lên public cho đến khi CEO duyệt public-surface contract. Dana Nang civic portal không được suy diễn bất cứ cơ quan/dịch vụ/địa chỉ nào từ trang giới thiệu.
4. **Public surface chuẩn bị nhưng chưa mở:** thiết kế một card “Tiện ích đã kiểm” và một zero-state, cùng tier label/accessibility/expiry display; data fixture phải synthetic rõ ràng và không được xuất hiện public. Chỉ UI pattern được test, không content claim.
5. **Research/growth:** triển khai zero-PII protocol cho 3 task: tìm tiện ích công, hiểu điều kiện một chương trình, tự tính tổng thực trả. Báo cáo aggregate/consented only; không testimonial/rating hoặc PII.
6. **Review Pack F:** tối đa 3 proposed utility facts, mỗi fact kèm raw/replay/locator/scope/field-gate matrix; browser prototype 1440/768/390, a11y, link safety; Council phân loại rõ ready-for-CEO-review vs insufficient. Không count coverage/claim “đầy dữ liệu”.

Không production release, affiliate action/deeplink/tracking, login/KYC/PII, price/voucher/history/review claim. T1=0, Voucher=0, P0_EQ open. CEO chỉ có thể phê duyệt từng fact sau review độc lập.

**Trạng thái CEO:** `EZ-F ĐANG THỰC THI: EZ-E INTEGRITY PASS HẸP; XÂY UTILITY FACT LADDER, KHÔNG MỞ COMMERCIAL CONTENT.`

---

## EZ-G. Quyết định CEO sau review 3 Utility Facts — raw pipeline pass, wording/scope facts chưa được duyệt

### Kết luận CEO

EZ-F có raw-byte contract và public fail-closed đúng hướng. Tuy nhiên, không fact nào được phê duyệt public. Đặc biệt, wording GitHub “email hoặc thẻ sinh viên hợp lệ” không được raw locator/nguồn chính thức trong pack chứng minh; tài liệu GitHub Docs chỉ xác nhận người học hoặc giảng viên của cơ sở giáo dục được công nhận có thể apply, kèm điều kiện/phúc lợi ở các trang tiếp theo. Không được rút gọn thành eligibility rule mới. [GitHub Docs](https://docs.github.com/en/education/about-github-education/github-education-for-students/about-github-education-for-students)

Fact Da Nang civic cũng mới chứng minh một trang giới thiệu cổng chính quyền; không tự chứng minh danh mục thủ tục, dịch vụ hay hành động công cụ thể. “100% SVG mã nguồn mở” là asset-right claim chưa có license register/locator nên không được dùng.

### Lệnh EZ-G duy nhất

1. **Quarantine wording:** gỡ “email hoặc thẻ sinh viên hợp lệ”, “gói miễn phí”, “tin tức chỉ đạo/hướng dẫn thủ tục” và asset-right 100% SVG khỏi fact registry/prototype/review copy nếu không có locator đúng câu và license evidence. Giữ raw capture, không xóa.
2. **Fact statement rule:** mỗi proposed fact phải có một câu customer-facing duy nhất, trích/paraphrase sát locator, kèm caveat và scope. Reviewer không được bổ sung điều kiện, benefit, locality hoặc CTA chưa có trong raw response.
3. **Subject/scope split:** GitHub Docs chỉ được đề xuất là T2 global documentation sau khi locator eligibility/application được replay; GitHub Pack là subject riêng. Da Nang portal chỉ là T4 source identity cho đến khi có trang dịch vụ/thủ tục cụ thể và scope/action được source nêu.
4. **Asset rights:** prototype dùng icon nội bộ tự vẽ hoặc plain text cho đến khi asset register chứa author, license, URL, license locator và review. “Public page” hoặc SVG không đồng nghĩa open-source/quyền tái sử dụng.
5. **Review Pack G:** nộp lại tối đa 2 fact, mỗi fact có raw bytes, sentence-to-locator mapping, exact/faithful paraphrase check, scope/exclusion, canonical action, freshness policy, asset-right decision và negative rewrite test. Council ghi “proposed, not public” cho đến CEO approval.

T1/Voucher/public economic claims/affiliate và production tiếp tục khóa; P0_EQ open. Không có public tier/count mới theo EZ-G.

**Trạng thái CEO:** `EZ-G ĐANG THỰC THI: RAW PIPELINE PASS HẸP; 3 UTILITY FACTS CHƯA ĐƯỢC DUYỆT VÌ WORDING/SCOPE/ASSET GAPS.`

---

## EZ-H. Chỉ thị CEO — Controlled T2 Staging Pilot: GitHub Education documentation

### Quyết định Hội đồng

**Product:** một fact học tập chính thức, không kinh tế, có hành động rõ tạo giá trị thật hơn 50 radar.  
**Design:** pilot một card nhỏ, plain-text icon/CSS nội bộ, không logo GitHub, không badge “verified offer”.  
**UX/CX:** dùng đúng một câu grounded, mở canonical Docs trong tab mới, có caveat scope toàn cầu và không hứa quyền lợi.  
**Growth:** đo nội bộ click-intent tổng hợp sau consent/protocol, không affiliate conversion.  
**Data & Trust:** FACT_EZ_G_01 đủ cho pilot T2 documentation-only: raw bytes, exact locator, source identity, global scope, exclusions, canonical action và recheck policy. Không đủ cho benefit/price/voucher/local eligibility.  
**Engineering:** feature flag riêng, staging-only, render từ fact contract—not hard-coded copy; no tracking/deeplink.  
**QA:** regression scan phải chặn mọi wording ngoài approved sentence, tracking, economic lexicon, locality and external asset.

### Lệnh EZ-H duy nhất

1. **Pilot staging một card T2 documentation-only:** render duy nhất FACT_EZ_G_01 với title trung tính “GitHub Education — Thông tin đăng ký”, câu: “Theo tài liệu chính thức của GitHub, người học hoặc giảng viên tại một cơ sở giáo dục được công nhận có thể nộp đơn đăng ký GitHub Education.” Câu này phải link locator/raw artifact ID trong evidence drawer nội bộ, không public raw bytes.
2. **Caveat bắt buộc:** hiển thị “Phạm vi: chương trình toàn cầu; điều kiện và quyền lợi áp dụng do GitHub quyết định. JayT không xác nhận voucher, giá hay ưu đãi tại Đà Nẵng.” CTA duy nhất: “Mở tài liệu chính thức”. Không CTA apply, no account prefill, no merch/logo.
3. **Không pilot Fact Đà Nẵng:** FACT_EZ_G_02 giữ T4/internal only cho đến khi có source-specific utility/service action fact. Không đưa title page thành “tiện ích đã kiểm”.
4. **Gate data/runtime:** pilot only có public_eligible_t2_documentation=true, economic_claim=false, local_scope=false, affiliate=false; missing/expired/drift receipt => card biến mất về zero-state. Capture/recheck 30 ngày, scan raw locator before render.
5. **QA/CEO gate:** nộp served DOM/HTML/JSON-LD scan, browser 1440/768/390, keyboard/a11y, link rel safety/console, feature flag output and before/after count. CEO kiểm trực tiếp staging pilot rồi mới quyết định mở fact thứ hai; production remains locked.

T1/Voucher/price history/affiliate/deeplink/tracking/KYC and production = 0/locked; P0_EQ open.

**Trạng thái CEO:** `EZ-H ĐANG THỰC THI: MỘT T2 DOCUMENTATION PILOT STAGING ĐƯỢC PHÉP; KHÔNG COMMERCIAL/LOCAL/PRODUCTION.`

---

## EZ-I. Lệnh CEO hợp nhất — Raw-First Scale, Savings Lab ổn định, AccessTrade JTBD định tính

### Biên bản Hội đồng 7 phòng ban

**Product:** nhân bản từng card có kiểm soát, không dùng danh sách merchant để tạo cảm giác đủ dữ liệu.  
**Design/UX-CX:** giữ mẫu GitHub EZ-H, caveat rõ, plain-text/CSS nội bộ, local-first calculator không prefill.  
**Growth:** nhu cầu theo địa bàn/trường là giả thuyết research zero-PII, không phải segmentation fact hay social proof.  
**Data & Trust:** raw-first, locator-first, no claim extrapolation; card chỉ vào staging sau CEO review từng fact.  
**Engineering/QA:** no-network calculator, evidence graph/feature flag, runtime scan 1440/768/390 and link/a11y/console proof.

### Lệnh EZ-I duy nhất

1. **Hai candidate Raw-First:** chỉ khảo sát read-only Notion for Education và Canva for Education. Mỗi candidate phải có raw bytes, request/final URL/redirect/status/headers, SHA, 4 locator, grounded sentence, explicit scope/exclusion, canonical link, asset-right decision, freshness policy và reviewer state. Không render card/staging cho đến CEO review độc lập.
2. **Savings Lab:** giữ 5 input do người dùng tự nhập, kết quả local-first, reset/negative validation và disclaimer không truy cập giỏ hàng/không xác thực voucher cá nhân. Cấm mẫu giá, voucher, merchant, network call, storage/tracking hoặc PII.
3. **AccessTrade:** chuyển research portfolio thành JTBD định tính: nêu problem, desired outcome, safety/fit question, evidence needed và authority required. Xóa/không nhập giá, rating, sales, kho, thời gian giao, hoa hồng, campaign, mã hoặc product recommendation chưa chứng minh. Cụm trường/quận chỉ là hypothesis cần research, không phải fact.
4. **Review Pack I:** nộp một pack gồm 2 raw candidate contracts, Savings Lab regression, JTBD ledger, feature flags, evidence graph and quarantine diff. Council phân loại proposed/blocked/verified-independent; CEO browser + raw review trước bất kỳ card mới nào.

Production, T1/voucher/economic claims/affiliate campaign-link-deeplink-sub-id-tracking/login-KYC-PII vẫn 0/locked; P0_EQ open. Antigravity tự thực thi EZ-I trong phạm vi read-only không chờ checkpoint.

**Trạng thái CEO:** `EZ-I ĐANG THỰC THI: SCALE THEO TỪNG RAW FACT; SAVINGS LAB LOCAL-FIRST; AFFILIATE JTBD ONLY.`

---

## EZ-J. Quyết định CEO — Cô lập hai candidate EZ-I vì locator/provenance không đạt

### Kết luận kiểm định độc lập

CEO đã đối chiếu trực tiếp raw bytes với registry EZ-I, không dựa vào bảng tóm tắt hay kết quả test của Antigravity. SHA-256 và byte length của hai tệp có khớp registry, nhưng bằng chứng semantic **không khớp** hợp đồng candidate:

- `CANDIDATE_EZ_I_01_NOTION_EDUCATION`: locator tiêu đề `<title>Notion for Education</title>` không xuất hiện trong raw bytes. Transcript còn đưa request tracking/notification ngoài document navigation vào redirect chain.
- `CANDIDATE_EZ_I_02_CANVA_EDUCATION`: locator tiêu đề, eligibility `teachers, students` và scope `K–12 & Higher Ed` đều không xuất hiện trong raw bytes. Redirect chain đã lẫn các tracking/pixel bên thứ ba, nên không thể dùng làm provenance của document.

Vì vậy hai câu grounded, scope và action mapping của EZ-I hiện là **unproven**. Không có việc hash khớp nào thay thế được locator khớp raw. Cả hai candidate vẫn `public_eligible: false`; không card, không CTA mới, không copy, không count và không mở rộng thành “2 mục T2”.

### Ý kiến Hội đồng và lệnh EZ-J duy nhất

**Product:** chất lượng dữ kiện quan trọng hơn số lượng card; giữ một GitHub documentation pilot đã duyệt, không thêm candidate.  
**Design/UX-CX:** không có thay đổi UI/public surface; nếu candidate bị cô lập thì không để placeholder tạo kỳ vọng ưu đãi.  
**Growth:** không dùng Notion/Canva để tạo social proof, local audience hay funnel.  
**Data & Trust:** chỉ document-navigation mới được ghi chuỗi redirect; subresource, pixel, notification và analytics phải tách `observed_non_evidence` và không làm locator.  
**Engineering:** capture runner phải trả về riêng `document_request`, `document_final_url`, redirect chain tối đa theo navigation thực, response headers và bytes của đúng `document_final_url`; cấm nhập request log của browser như redirect chain.  
**QA:** assertion đọc raw bytes độc lập phải buộc `title`, eligibility, scope, action locator đều `true`; một locator false, redirect contaminant hoặc semantic translation vượt raw thì candidate fail-closed và test phải fail.

1. **Cô lập:** gắn `QUARANTINED_EZ_J_LOCATOR_AND_REDIRECT_CONTAMINATION` cho Notion và Canva; xóa mọi đề xuất render/grounded sentence khỏi future public contract. Không xóa raw bytes hay lịch sử audit.
2. **Sửa pipeline, không sửa dữ kiện bằng tay:** làm một runner document-only mới, lưu raw response của main document trước, rồi mới trích locator bằng exact byte-to-text decoding đã khai báo. Bản ghi phải có decoding, byte offsets hoặc line/column và excerpt đủ ngữ cảnh cho từng locator. Không dùng `innerText`, DOM sau hydration hay title từ browser để chứng minh raw locator.
3. **Tái khảo sát hẹp:** tối đa hai candidate này sau khi pipeline pass. Candidate chỉ trở lại trạng thái `PROPOSED_INTERNAL` khi tất cả locator literal/exact mapping, final canonical URL, scope/exclusion và faithful Vietnamese rendering được Council Data & Trust rà; vẫn phải chờ CEO raw review trước staging.
4. **Bảo toàn luồng an toàn:** Savings Lab và AccessTrade JTBD định tính tiếp tục, nhưng regression phải chứng minh local-first và không có commercial fields. Không phát sinh AccessTrade login, campaign, deeplink, voucher, price, commission hay production action.
5. **Review Pack J:** nộp raw-only runner contract, negative test tái hiện hai lỗi trên, quarantine diff, hai capture receipt mới (nếu có), DOM scan xác nhận candidates không render, cùng browser regression 1440/768/390 cho GitHub pilot/Savings Lab. Council chỉ được kết luận `pass pipeline` hoặc `held`; CEO tự kiểm raw và browser trước mọi quyết định mới.

Production vẫn khóa tại `v3.419.0`; T1/voucher/economic claims/affiliate activation = 0; P0_EQ open.

**Trạng thái CEO:** `EZ-J ĐANG THỰC THI: HAI CANDIDATE EZ-I CÔ LẬP; SỬA DOCUMENT-ONLY PROVENANCE PIPELINE; KHÔNG CÓ CARD MỚI.`

---

## EZ-K. Quyết định CEO — Hash đúng chưa đủ: hai resurvey EZ-J tiếp tục held vì semantic locator yếu

### Kết quả CEO audit

CEO xác nhận trực tiếp raw EZ-J có SHA-256/byte length khớp registry và staging `http://127.0.0.1:4173` đang served `v3.480.0-staging.ez`, không chứa Notion/Canva hay candidate EZ-I/EZ-J. Đây là containment đúng. Tuy nhiên, không có basis để nâng hai resurvey thành fact contract:

- Notion dùng các từ rời `schoolwork` và `classroom` để suy ra “học sinh và nhà trường … hỗ trợ học tập và quản lý dự án”, đồng thời ghi scope “toàn cầu / học sinh, sinh viên và nhà trường”. Các mệnh đề này không có sentence-level locator tương ứng trong raw contract.
- Canva dùng các token quá rộng `Canva`, `Education`, `learning` để suy ra đối tượng “cơ sở giáo dục và người học”, rồi thêm scope “toàn cầu”. Token match không phải entitlement/eligibility/scope evidence.

Hash xác thực *tệp nào được lưu*, không xác thực *diễn giải nào được phép công bố*. Cả `CANDIDATE_EZ_J_01` và `CANDIDATE_EZ_J_02` là `HELD_INTERNAL_SEMANTIC_LOCATOR_INSUFFICIENT`; không chuyển `PROPOSED`, không CTA/card/count, không dùng ở staging hay production.

### Biên bản Hội đồng và lệnh EZ-K duy nhất

**Product/Growth:** không đổi surface hoặc đặt mục tiêu số card bằng fact kém; chỉ một pilot GitHub hiện hữu tiếp tục.  
**Design/UX-CX:** không render loading/empty marketing cho hai candidate held; người dùng không được thấy “sắp có ưu đãi”.  
**Data & Trust:** evidence contract bắt buộc phân biệt `identity`, `descriptive`, `eligibility`, `scope`, `economic`, `local`; token chung không được đóng vai eligibility/scope.  
**Engineering:** thêm entailment gate: customer-facing sentence phải có ít nhất một raw excerpt đầy đủ và mapping từng clause; provenance `global` chỉ hợp lệ khi raw nói rõ global/worldwide hoặc canonical policy xác nhận.  
**QA:** test phải cố ý dùng `Education`/`learning`/`schoolwork` để suy diễn đối tượng hay phạm vi và bắt buộc fail; test không được chỉ kiểm `found=true` của chuỗi ngắn.

1. Giữ immutable vault EZ-I/EZ-J và toàn bộ quarantine history; không sửa transcript để làm đẹp evidence.
2. Thiết kế **Evidence Contract v3** trước bất kỳ capture mới nào: exact excerpt, byte start/end, decoding, source-language claim, faithful Vietnamese translation từng clause, claim-class, allowed/disallowed copy, source scope vs JayT local scope, and reviewer decision. Không có contract v3 thì không capture lại.
3. Sau contract v3, Antigravity chỉ có thể thử lại tối đa **một** candidate với một câu mô tả thật sự nằm trong raw. Nếu không đủ, kết quả hợp lệ là `no_publishable_fact`—không suy diễn bằng tên trang, title hoặc marketing metadata.
4. Savings Lab regression và AccessTrade JTBD định tính được tiếp tục; staging must remain no-network/no-storage/no-commercial. Không affiliate login, affiliate link, campaign, voucher, price, commission, product recommendation hoặc production release.
5. Review Pack K phải gồm: semantic failure matrix cho 2 candidate, v3 schema, negative fixtures, served-DOM scan, health/version proof, and browser 1440/768/390 regression. CEO kiểm raw+browser trước khi mở một candidate.

Production remains locked at `v3.419.0`; T1/voucher/economic claim/affiliate activation = 0; P0_EQ open.

**Trạng thái CEO:** `EZ-K ĐANG THỰC THI: EZ-J CAPTURE INTEGRITY PASS HẸP, SEMANTIC PUBLISH GATE FAIL-CLOSED; KHÔNG CARD MỚI.`

---

## EZ-L. Quyết định CEO — Đóng cohort Education thử nghiệm; chuyển sang Source Intake an toàn và UX hữu dụng

### Kết luận kiểm định độc lập

CEO đã xác nhận byte offset `302–355` trong raw Notion đúng chứa câu “The all-in-one workspace for students and educators.” Contract v3 đã map faithful translation và tự kết luận `DESCRIPTIVE_ONLY / NO_PUBLISHABLE_FACT`. Staging `v3.480.0-staging.ez` không render Notion/Canva; parity currently matches served payload. Đây là một **pipeline-control pass**, không phải public-content pass và không thay đổi Go-Live status.

### Ý kiến Hội đồng

**Product:** dừng khai thác lặp Notion/Canva; giá trị ngắn hạn đến từ tra cứu có thể hiểu và công cụ tự tính, không từ thêm card yếu.  
**Design:** làm rõ kiến trúc “Tra cứu chính thức / Công cụ của bạn / Đang nghiên cứu”, tránh visual promise về voucher.  
**UX/CX:** chuẩn hóa zero-state, nguồn/caveat drawer và luồng keyboard/mobile của Savings Lab/GitHub pilot.  
**Growth:** xây intake queue theo cohort nhu cầu, không fake inventory, local coverage, review hay social proof.  
**Data & Trust:** source identity không đồng nghĩa utility/deal fact; V3 là single gate.  
**Engineering:** tạo registry internal-only, immutable receipt and deterministic status flags; no public auto-publish.  
**QA:** kiểm regression UI/a11y/performance và public DOM; no candidate leakage.

### Lệnh EZ-L duy nhất

1. **Đóng cohort này:** Notion/Canva không được recapture hay rewrite lần thứ ba trong 30 ngày, trừ khi canonical policy/document page mới được Data & Trust nêu rõ bằng raw document receipt. Giữ các kết quả là `held`, không dùng như failed marketing lead.
2. **Source Intake Queue nội bộ:** lập tối đa 12 source identity candidates theo các JTBD: đi lại công cộng, không gian công cộng/học tập, lịch văn hóa–phim, tiêu dùng thiết yếu, và công cụ học tập. Mỗi item chỉ được ghi source owner, canonical URL, need cohort và trạng thái `UNFETCHED`; tuyệt đối không title/cơ sở/địa chỉ/giờ mở cửa/giá/voucher/brand claim cho tới khi capture V3 pass.
3. **Raw-first execution:** chọn tối đa 2 item từ queue mỗi vòng. Một item chỉ có thể thành `DESCRIPTIVE_INTERNAL`, `PUBLISHABLE_DOCUMENTATION_CANDIDATE`, hoặc `NO_PUBLISHABLE_FACT`; không có auto-promotion, không giả định rằng source chính thức luôn có public card.
4. **UX hữu dụng nhưng trung tính:** hoàn thiện user journey 3 đích: GitHub documentation pilot, Savings Lab local-first, và source-research zero-state. Dùng copy không hứa ưu đãi; hỗ trợ keyboard/focus/contrast/touch target, responsive 1440/768/390, prefers-reduced-motion. Không đổi logo/ảnh/merchant card hoặc thêm content claim trong scope này.
5. **Review Pack L:** Council nộp intake queue, raw receipt cho tối đa hai item (nếu có), V3 contract outcomes, no-leak DOM scan, a11y/keyboard/browser evidence, network/storage proof for Savings Lab, performance budget result và quarantine ledger. CEO chỉ review raw+browser; không production release.

Production `v3.419.0` remains locked. T1/voucher/price/affiliate activation/deeplink/campaign/login-KYC-PII = 0. P0_EQ open.

**Trạng thái CEO:** `EZ-L ĐANG THỰC THI: EDUCATION COHORT ĐÓNG 30 NGÀY; SOURCE INTAKE INTERNAL-ONLY + UX NEUTRAL TIẾP TỤC; KHÔNG CARD MỚI.`

---

## EZ-M. Quyết định CEO — Intake metadata không phải source identity fact

### Kết luận kiểm định độc lập

CEO đã kiểm raw vault EZ-L: hash/byte length của hai tệp khớp registry. `Thư viện Đà Nẵng` xuất hiện trong title raw; cổng còn lại chỉ có title raw “Cổng Dịch vụ công”. Vì vậy, raw hiện tại **không chứng minh** cụm “Cổng Dịch vụ công Trực tuyến TP Đà Nẵng”, source owner của candidate, hay rằng từng URL queue là canonical/official. Đây không là lỗi public exposure vì toàn bộ item vẫn internal/no-render, nhưng là lỗi taxonomy cần sửa trước vòng intake tiếp theo.

### Biên bản Hội đồng

**Product/Growth:** queue là backlog nghiên cứu, không phải catalog đối tác/đơn vị đã xác thực.  
**Design/UX-CX:** không hiển thị queue hoặc headline owner/location từ metadata; giữ UI public hiện hữu không đổi.  
**Data & Trust:** tách rõ `claimed_source_owner`, `candidate_url`, `identity_evidence_state`; chỉ raw mapping mới có thể nâng identity.  
**Engineering:** required fields của queue đổi sang candidate-safe taxonomy, migration append-only.  
**QA:** forbidden scan phải bắt “official/chính thức/owner/Đà Nẵng” nếu field chưa có evidence node/locator đúng mệnh đề.

### Lệnh EZ-M duy nhất

1. **Sửa queue taxonomy:** đổi `source_owner` thành `claimed_source_owner_unverified`; `canonical_url` thành `candidate_url_unverified` cho toàn bộ 10 item. Không tự suy ra chủ thể từ domain. JTBD cohort là planning hypothesis—not user fact.
2. **Sửa hai contracts EZ-L:** Library chỉ giữ `identity_title_observed` đúng text raw; DVC giữ `generic_title_observed` và `identity_location_unproven`. Xóa/đánh dấu invalid mọi allowed-customer-facing sentence có “chính thức”, “TP Đà Nẵng”, “cơ quan nhà nước” hoặc tên đầy đủ nếu raw V3 chưa có clause mapping chứng minh.
3. **Identity proof là bước riêng:** một source chỉ được gắn `source_identity_proven` khi có document-level sentence/header/footer về cơ quan vận hành hoặc official/canonical authority, exact excerpt, byte range, source-language and faithful mapping. Không có nó thì status là `URL_REACHABLE_IDENTITY_UNPROVEN`.
4. **Vòng intake tiếp theo:** tối đa hai candidate; ưu tiên document có chính sách/tài liệu có thể xác minh, không homepage generic. Chỉ sau identity proof mới xét descriptive fact. Không được biến title trang chủ thành utility card.
5. **UX/a11y evidence:** yêu cầu browser evidence độc lập cho 1440/768/390, tab sequence/focus-visible, semantic heading/landmark, contrast measurement, touch target và reduced motion. Test tự báo PASS không thay thế capture/browser output; no public UI change in this order.
6. **Pack M:** taxonomy migration diff, invalidated-field ledger, exact identity-proof contract (nếu có), DOM no-leak scan, Savings Lab no-network/no-storage regression và Council classification. CEO review before any publishable candidate decision.

Production `v3.419.0` locked; public T2 remains exactly one GitHub documentation pilot. T1/voucher/price/affiliate activation/deeplink/campaign/login-KYC-PII = 0; P0_EQ open.

**Trạng thái CEO:** `EZ-M ĐANG THỰC THI: INTAKE METADATA HELD/UNVERIFIED; IDENTITY PROOF TÁCH RIÊNG; KHÔNG CARD MỚI.`

---

## EZ-N. P0 CEO Containment — Staging đang public false provenance qua Radar cards

### Bằng chứng CEO kiểm trực tiếp

Khác với báo cáo EZ-M, CEO browser audit trên staging `v3.480.0-staging.ez` xác nhận surface đang có **52 external links**, **100 nhãn/CTA chứa “nguồn chính thức” hoặc “Mở cổng chính thức”**, cùng hàng loạt tên thương hiệu, địa điểm và mô tả local. Các entry không có Evidence Contract V3 identity proof và không nằm trong single approved GitHub pilot. Đây là public exposure sai provenance; “chưa xác nhận ưu đãi” không chữa được lời khẳng định “nguồn chính thức” hay external CTA.

### Hội đồng khẩn cấp

**Product:** danh sách dài but ungrounded không phải supply; dừng mọi claim discovery.  
**Design/UX-CX:** zero-state minh bạch tốt hơn grid card làm người dùng tin sai; không hiển thị merchant/locality placeholders.  
**Growth:** không dùng card/CTA chưa proof làm funnel hay engagement measurement.  
**Data & Trust:** public entitlement từ nguồn = identity proof + canonical relation + raw mapping, không phải domain string.  
**Engineering:** feature flag fail-closed tại data boundary và render boundary; default data source rỗng.  
**QA:** browser DOM assertions, not static-script keyword checks, là gate release.

### Lệnh EZ-N duy nhất

1. **Cô lập ngay trên staging:** tắt/hide toàn bộ Radar / Explore / merchant / locality cards và tất cả external CTA liên quan, trừ duy nhất `FACT_EZ_G_01_GITHUB_DOCS_ELIGIBILITY` đã được CEO phê duyệt theo EZ-H. Không dùng count giả thay cho cards bị gỡ.
2. **Zero-state thay thế:** render một khu vực trung tính: “JayT đang kiểm định từng nguồn trước khi hiển thị. Hiện chưa có nguồn mới đạt chuẩn công bố.” Không logo/brand, không địa danh, không link ngoài, không form thu PII. Savings Lab remains accessible.
3. **Data-boundary fix:** mọi public entry cần explicit `public_eligible === true`, `evidence_contract_v3_status === PUBLISHABLE_DOCUMENTATION_CANDIDATE`, source identity proof, exact approved copy, safe canonical action and CEO approval ID. Thiếu một field => không render. Domain/title/card seed/legacy array never bypasses this gate.
4. **Đóng toàn bộ legacy radar dataset:** archive/quarantine immutable, remove it from served JS/HTML/JSON and all nav counters. Không xóa audit files; không rewrite facts. Cấm tự gọi merchant/place/URL là “official” chỉ vì domain hoặc knowledge.
5. **QA Evidence Pack N:** fresh browser DOM at 1440/768/390 proving `external_links = 1` (GitHub pilot only), `official/source labels = 0` outside pilot, no radar/merchant/locality text, no candidate leak, safe link rel, console clean, Savings Lab regression and served/SOT parity. CEO must personally recheck before any staging unfreeze.
6. **No diversion:** source intake stays internal-only and V3-first; no new capture/render until N containment passes. Production remains untouched and locked.

Production `v3.419.0` locked; P0_EQ escalated with `P0_FALSE_PROVENANCE_STAGING_RADAR`; T1/voucher/price/affiliate activation/deeplink/campaign/login-KYC-PII = 0.

**Trạng thái CEO:** `EZ-N KHẨN CẤP: STAGING RADAR FALSE-PROVENANCE QUARANTINE; CHỈ GITHUB PILOT + SAVINGS LAB ĐƯỢC PHÉP HIỂN THỊ.`

---

## EZ-O. Quyết định CEO — Đóng containment staging; mở lại intake hẹp có kiểm soát

### CEO live review

CEO đã kiểm trực tiếp staging sau EZ-N: title vẫn `v3.480.0-staging.ez`; có đúng một external link đến GitHub Docs pilot, zero-state xuất hiện, các text/card Radar legacy không còn, console sạch. `P0_FALSE_PROVENANCE_STAGING_RADAR` được **đóng ở phạm vi containment staging**. Đây không phải nghiệm thu content, release hay Go-Live; `P0_EQ` vẫn open, production `v3.419.0` vẫn locked.

### Ý kiến Hội đồng

**Product:** từ zero-state, xây dần utility có chứng cứ thay vì hồi phục catalog cũ.  
**Design/UX-CX:** zero-state phải dẫn được người dùng tới Savings Lab/GitHub pilot, không tạo cảm giác site hỏng; visual chỉ CSS/system asset đến khi rights register pass.  
**Growth:** intake theo need hypotheses, không count/merchant/social proof.  
**Data & Trust:** evidence state là source of truth của render; no public auto-promotion.  
**Engineering/QA:** giữ hard render gate, browser DOM is release evidence and regression fixture.

### Lệnh EZ-O duy nhất

1. **Giữ điều kiện P0:** test EZ-N browser DOM được đưa vào required pre-merge/release gate; bất kỳ external link/card/official label mới nào ngoài approved registry phải fail build và zero-state fallback.
2. **Mở lại intake hẹp:** tối đa hai candidate/round từ EZ-M queue, nhưng phải là document/page có khả năng nêu rõ subject/operating body hoặc policy clause. Homepage generic không được chọn lại chỉ để có “identity title”. Đầu ra hợp lệ vẫn có thể là `NO_PUBLISHABLE_FACT`.
3. **Mở rộng UI không-claim:** cải thiện điều hướng zero-state tới “Tự tính thực trả” và GitHub documentation pilot; clear information hierarchy, focus-visible, keyboard, responsive 1440/768/390, reduced motion. No images/logo/brand/place/price/voucher/CTA external mới trong workstream này.
4. **Evidence contract enforcement:** generated public manifest must be the only render input. Legacy arrays/quarantine/candidate metadata cannot be imported by any served bundle. Asset/image use requires separate rights node, not source page presence.
5. **Council Pack O:** two candidate selection rationales, raw receipts/contracts (if capture occurs), render-manifest diff, DOM external link/claim counts, a11y+performance browser evidence, zero-state usability notes and full P0 regression. CEO browser+raw review is mandatory prior to approving a second public documentation card.

T1/voucher/price history/affiliate activation/deeplink/campaign/login-KYC-PII remain 0/locked. No production release authorization is granted.

**Trạng thái CEO:** `EZ-O ĐANG THỰC THI: P0 FALSE-PROVENANCE STAGING CONTAINMENT CLOSED; P0_EQ/PRODUCTION LOCKED; INTAKE V3 HẸP + UX KHÔNG-CLAIM TIẾP TỤC.`

---

## EZ-P. Lệnh CEO — Chuyển từ “card count” sang Evidence-First Supply Operations

### CEO browser review

CEO đã kiểm trực tiếp zero-state mới: còn duy nhất link ngoài GitHub Docs, và hai điều hướng hoạt động. Nút “Tài liệu đã đối soát” đi tới danh mục GitHub pilot đã duyệt, không phát sinh link/card ngoài registry. Hai intake Đường sắt/VNPost là `IDENTITY_ONLY / HELD_INTERNAL`; không phải nội dung công bố.

### Ý kiến Hội đồng

**Product:** vấn đề lớn nhất hiện là supply pipeline, không phải thêm UI/card giả.  
**Design/UX-CX:** zero-state phải trả lời “tôi làm gì được ngay?”: tính thực trả, xem một tài liệu đã kiểm, hoặc báo nguồn có điều kiện minh bạch.  
**Growth:** đo năng lực đội ngũ bằng intake-to-evidence funnel nội bộ, không bằng public count.  
**Data & Trust:** mỗi fact có state machine và no-publish default.  
**Engineering/QA:** separation absolute between internal board and public bundle; browser flow is regression gate.

### Lệnh EZ-P duy nhất

1. **Supply Board nội bộ:** dựng board state-only cho các stage `UNFETCHED → URL_REACHABLE → IDENTITY_PROVEN → FACT_CONTRACTED → CEO_REVIEW → PUBLIC_APPROVED / HELD / QUARANTINED`. Counts chỉ dùng nội bộ và phải trace được candidate ID/receipt; không đưa board, count hay named queue lên storefront.
2. **Chọn candidate theo proofability:** tối đa hai item/round, ưu tiên canonical policy/announcement/document có subject + operating body + action/scope rõ ở raw, không chọn generic homepage. Một vòng không có fact công bố là outcome hợp lệ.
3. **Luồng “Báo nguồn” an toàn:** audit control hiện hữu. Nếu chưa có backend/consent/protocol được CEO duyệt, nó chỉ được phép mở hướng dẫn không nhập liệu: nêu rõ JayT không nhận thông tin cá nhân, chỉ accept URL công khai và trạng thái “chưa gửi”. Cấm fake success, storage/tracking, email/phone/location/review collection.
4. **UX readiness:** finalize keyboard-first flow từ zero-state tới Savings Lab và GitHub pilot; empty-state copy phải nói rõ “chưa có nguồn mới đạt chuẩn công bố”, không dùng wording deal/voucher/hời/official-source ngoài pilot. Kiểm 1440/768/390, screen-reader names, focus order, reduced motion and touch targets.
5. **Pack P:** Supply Board snapshot internal, selection rationale, V3 results (if any), report-source control audit, public DOM/served-bundle scan, links counts, console/a11y browser evidence and release-gate execution. CEO review before second public card; no production release.

T1/voucher/price/review/affiliate activation/deeplink/campaign/login-KYC-PII remain 0/locked. `P0_EQ` open; staging containment remains a mandatory gate.

**Trạng thái CEO:** `EZ-P ĐANG THỰC THI: EVIDENCE-FIRST SUPPLY OPS + UX READINESS; KHÔNG PUBLIC AUTO-PUBLISH, KHÔNG PRODUCTION.`

---

## EZ-Q. Lệnh CEO — Kiểm định hành trình người dùng và chất lượng chọn nguồn trước khi mở rộng capture

### CEO live review

CEO đã kiểm trực tiếp control “Báo nguồn”: hộp thoại nêu rõ chưa mở nhận trực tuyến, có 0 input/textarea/select, 0 submit control và không thêm link ngoài. Supply Board không rò vào public DOM. Đây là audit pass phạm vi control; không phải evidence rằng có đóng góp cộng đồng thật.

### Ý kiến Hội đồng

**Product:** trước khi tăng supply, phải chứng minh người dùng hiểu thứ gì là verified, thứ gì là tool tự nhập và hệ thống chưa có gì mới.  
**Design/UX-CX:** đánh giá flow qua task rõ thay vì ý kiến “đẹp/xấu” trừu tượng; không tạo feedback/social proof giả.  
**Growth:** không khảo sát/thu PII khi chưa authority; chuẩn bị research protocol, không bịa kết quả.  
**Data & Trust:** candidate selection phải có document-quality rubric, tránh lãng phí capture homepage.  
**Engineering/QA:** instrument-free UX test, browser reproducibility and fail-closed public boundary.

### Lệnh EZ-Q duy nhất

1. **Research protocol nội bộ, zero-PII:** soạn kịch bản kiểm định 5 task: (a) nhận diện GitHub pilot là documentation—not voucher; (b) mở official document; (c) tự tính thực trả và reset; (d) hiểu zero-state; (e) mở/đóng “Báo nguồn” và nhận biết chưa thể gửi. Không thu câu trả lời thật, rating, NPS hay quote trước khi CEO cấp authority/recruitment protocol.
2. **UX acceptance rubric:** xây criteria pass/fail cho comprehension, keyboard order, labels, focus, error/reset recovery, 1440/768/390, contrast/touch/reduced-motion. Browser recording/screenshot is evidence; “test pass” không thay owner aesthetic acceptance.
3. **Source selection rubric internal-only:** từng queue item phải chấm theo document-level likelihood (operating-body statement, policy/action clause, date/freshness, canonical relation, raw accessibility). Chỉ item đạt ngưỡng rubric mới được chọn 2 capture tiếp theo; rubric không được biến thành fact hoặc public score.
4. **Freeze generic capture:** không capture thêm homepage generic từ queue cho đến khi rubric quyết định một document path cụ thể; result `no eligible document` is valid. Existing identity-only items stay held.
5. **Pack Q:** protocol không PII, empty research ledger, UX task evidence across 3 viewports, source rubric and selection outcome, public DOM scan, report-source audit regression and release-gate result. Hội đồng nêu gaps/proposals; CEO tự xem live trước mọi public surface change.

No authority is granted for participant recruitment, PII collection, tracking, affiliate, voucher, price or production release. Production `v3.419.0` locked; P0_EQ open.

**Trạng thái CEO:** `EZ-Q ĐANG THỰC THI: UX RESEARCH PROTOCOL ZERO-PII + SOURCE-RUBRIC INTERNAL; KHÔNG RECRUIT, KHÔNG GENERIC CAPTURE, KHÔNG CARD MỚI.`

---

## EZ-R. P1 CEO Correction — Cấm mẫu commercial và synthetic UX/source scores trong protocol nội bộ

### Kết luận audit

CEO kiểm file EZ-Q xác nhận protocol không có participant data, nhưng lại chứa sample `120.000`, `20.000`, `10% sinh viên`, ship và “voucher”; điều này vi phạm local-first no-prefill/no-sample-commercial rule. Rubric cũng gán điểm 50–60 cho 10 source khi không có evidence pointers/locators cho từng dimension. Bảng “Kết quả thực tế: PASS” không được gọi là user outcome khi không có người dùng tham gia.

### Quyết định Hội đồng

**Product/UX-CX:** automated affordance verification ≠ comprehension validation.  
**Growth:** no recruitment means no user evidence/no conversion/no satisfaction claims.  
**Data & Trust:** arbitrary granular score behaves as synthetic metadata; replace it with evidence-linked eligibility states.  
**Engineering/QA:** calculator test fixtures may exist only in test code, not user research protocol/UI/report; fixtures must be clearly non-public/non-commercial.

### Lệnh EZ-R duy nhất

1. **Sửa protocol Q append-only:** thay tất cả giá, % giảm, voucher, ship và “sinh viên” sample bằng placeholders trung tính `[số do người kiểm thử tự chọn]`. Research protocol không nêu expected currency result. Giữ test calculation fixtures tách riêng ở QA, không xuất hiện trong copy/JSON user research/served bundle.
2. **Đổi “PASS user” thành đúng phạm vi:** task ledger chỉ được ghi `AUTOMATED_AFFORDANCE_VERIFIED`, `NOT_CONDUCTED_WITH_USERS` hoặc `PENDING_AUTHORIZED_RESEARCH`. Cấm “người dùng hiểu”, NPS, quote, rating, satisfaction, completion rate hay user-result claim cho đến khi có authority/recruitment/consent.
3. **Thay rubric số bằng proof gate:** mỗi source dùng binary/evidence-linked fields `document_path_known`, `operating_body_clause_observed`, `policy_or_action_clause_observed`, `freshness_clause_observed`, `canonical_relation_observed`, `raw_accessible`, với receipt/locator hoặc `UNOBSERVED`. Không tổng điểm, threshold, ranking hay score; selection chỉ dựa vào có document path và ít nhất một clause testable.
4. **Cô lập EZ-Q scoring artifact:** archive immutable bản cũ kèm reason `SYNTHETIC_INTERNAL_SCORING_AND_SAMPLE_COMMERCIAL_FIXTURE`; không tải vào public/runtime, không xóa lịch sử. Derived selection outcomes phải recompute from proof gate.
5. **Pack R:** migration diff, token scan proving 0 sample price/voucher/discount/ship in research/UI artifacts, proof-gate ledger, corrected task-status ledger, served DOM scan and regression of one-link containment/Báo nguồn/Savings Lab. CEO review before any candidate capture resumes.

No participant research, tracking, storage/PII, affiliate, voucher, commercial claim or production release is authorized. P0_EQ remains open.

**Trạng thái CEO:** `EZ-R ĐANG THỰC THI: RESEARCH PROTOCOL & SOURCE SELECTION DE-SYNTHETICIZED; CAPTURE PAUSED; KHÔNG CARD MỚI.`

---

## EZ-S. P1 CEO Correction — Proof Gate không được dùng receipt identity-title thay cho operating-body clause

### Kết luận audit

EZ-R đã bỏ fixture price/discount/voucher sample và numerical scoring. Việc giữ từ “voucher/giá” trong caveat loại trừ của protocol là hợp lệ, không phải commercial sample. Nhưng ledger EZ-R vẫn đánh dấu `operating_body_clause_observed` cho Library, DVC, Museum, National Library, Railway và VNPost bằng receipt từ các vòng đã bị kết luận `identity/location/owner unproven`. Đây là conflict trực tiếp với EZ-M.

### Lệnh EZ-S duy nhất

1. Với sáu item trên, set `operating_body_clause_observed = UNOBSERVED`; không reference receipt chỉ có page title/generic identity như operating-body evidence.
2. Proof field dạng `OBSERVED_WITH_LOCATOR` phải chứa object bắt buộc: raw receipt ID, exact source excerpt, byte start/end, claim class, faithful mapping, và reviewer status. Thiếu một field => `UNOBSERVED`.
3. Tách `identity_title_observed` khỏi `operating_body_clause_observed`; title có thể là raw observation nhưng không cấp authority/canonical/locality/owner proof.
4. Capture stay paused until a candidate has `document_path_known=true` plus at least one valid proof object. Không sửa điểm bằng text, không chọn lại homepage.
5. Pack S: corrected ledger diff, invalid-proof references ledger, schema validation test, public DOM containment regression. CEO review before reopening capture.

No public change, participant research, affiliate, voucher, economic claim or production release. `P0_EQ` open.

**Trạng thái CEO:** `EZ-S ĐANG THỰC THI: PROOF-GATE REFERENCE CLEANUP; CAPTURE PAUSED; KHÔNG CARD MỚI.`

---

## EZ-T. Lệnh CEO — Document-path discovery read-only, không recapture homepage

### CEO audit

CEO xác nhận ledger EZ-S đã sạch: không item nào có operating-body clause proof; title observations có receipt/offset riêng và tất cả remain held. Đây là baseline đúng để tiếp tục, không phải lý do dừng supply operations.

### Hội đồng và lệnh EZ-T duy nhất

**Product/Growth:** cần tìm đường dẫn tài liệu có thể chứng minh, không tăng capture homepage.  
**Design/UX-CX:** không đổi public surface trong discovery.  
**Data & Trust/Engineering/QA:** candidate URL được phát hiện không là canonical/official fact; navigation log phải tách discovery khỏi evidence.

1. Chọn tối đa **hai** item held từ queue, không chọn candidate có generic homepage chưa reachable. Trên chính website candidate, thực hiện read-only visible navigation tối đa 3 link nội bộ có semantic label như chính sách, hướng dẫn, điều khoản, thông báo hoặc dịch vụ; không login, search bulk, form, API/private endpoint, secret hay download.
2. Lập `DOCUMENT_PATH_DISCOVERY_LEDGER` internal-only: candidate seed URL, observed link text/href, parent page receipt, timestamp, navigation mode, and state `DISCOVERED_UNVERIFIED`. Không gọi link là official/canonical, không suy diễn owner/location/benefit/local scope.
3. Chỉ khi một discovered path có nội dung document-level rõ ràng, capture raw **một** final document theo V3. Nếu không có path hợp lệ, mark `NO_DOCUMENT_PATH_FOUND`; kết quả này là progress hợp lệ.
4. Không thay đổi served HTML/JS, link count, public card, zero-state, report-source control hay Savings Lab trong round này. Any drift => fail-closed.
5. Pack T: navigation ledger, source parent receipts, selected-document rationale, V3 contract or no-path outcome, DOM/parity regression and Council classification. CEO raw/browser review required before any documentation-card proposal.

Production remains locked; T1/voucher/price/affiliate/reviews/PII/tracking/deeplink/campaign = 0. `P0_EQ` open.

**Trạng thái CEO:** `EZ-T ĐANG THỰC THI: READ-ONLY DOCUMENT-PATH DISCOVERY; KHÔNG HOMEPAGE RECAPTURE, KHÔNG PUBLIC CHANGE.`

---

## EZ-U. CEO Correction — Không suy diễn quan hệ cơ quan từ header rời; candidate Thư viện tiếp tục held

### Kết quả kiểm raw độc lập

CEO xác nhận byte length/SHA của document `ReadNews/1408`, title “Thủ tục cấp thẻ”, raw encoded string về Sở Văn hóa & Thể thao TP. Đà Nẵng, “THƯ VIỆN KHOA HỌC TỔNG HỢP”, và date 11/03/2016. Nhưng raw hiện không có một mệnh đề nêu rõ “Thư viện Khoa học Tổng hợp Đà Nẵng thuộc Sở …”; đó là suy diễn từ các header/layout rời. Date 2016 không chứng minh policy hiện hành.

### Lệnh EZ-U duy nhất

1. Candidate `EZ_T_01` giữ `HELD_INTERNAL_HISTORICAL_RELATIONSHIP_UNPROVEN`; `operating_body_proven=false`, no local/current-policy/card/CTA/count. Không sửa raw hay archive history.
2. Contract V3 phải tách `header_identity_observed`, `relationship_clause_observed`, `policy_clause_observed`, `freshness_current_observed`. Các header có thể chứng minh exact header text thôi; không chứng minh relationship.
3. Nếu tiếp tục với Thư viện, chỉ tìm tối đa một document/announcement mới hơn có explicit relation/current effective date; nếu không tìm được, mark `HISTORICAL_DOCUMENT_NO_CURRENT_FACT` và dừng cohort 30 ngày.
4. Regression must verify public DOM unchanged: one GitHub link/pilot only, no library text/card/link, zero-state and Savings Lab intact. CEO raw+browser review before any proposal.

Production, voucher, price, affiliate, PII/tracking and new public content remain locked; `P0_EQ` open.

**Trạng thái CEO:** `EZ-U ĐANG THỰC THI: EZ-T LIBRARY DOCUMENT HELD DO HISTORICAL/RELATIONSHIP GAP; KHÔNG CARD MỚI.`
---

## EZ-V. Quyết định CEO — Chuyển trọng tâm thương mại có kiểm soát: Savings Lab, Voucher Evidence Pipeline và AccessTrade JTBD

**Trạng thái:** Có hiệu lực ngay trên staging và kho nội bộ. Không phải phê duyệt Go-Live, không thay đổi khóa production `v3.419.0`, không mở khóa `P0_EQ`.

### 1. Quyết định điều hành

JayT phải giải quyết bài toán cốt lõi: giúp sinh viên và nhân viên văn phòng Đà Nẵng biết **hôm nay nên chi gì, nhận ưu đãi ở đâu và tổng thực trả là bao nhiêu**. Vì vậy, kể từ EZ-V, dừng đầu tư mở rộng nhánh kiểm chứng địa điểm lịch sử `EZ_T_01`; lưu toàn bộ raw/evidence hiện có để truy xuất nhưng **không tạo card công khai, không suy diễn cơ quan quản lý, địa chỉ, điều kiện hiện hành hay quyền lợi** từ nhánh này.

Nguồn lực phát triển an toàn chuyển sang ba luồng sau. Đây là chuyển trọng tâm sản phẩm, **không** là cho phép công bố deal/voucher/affiliate chưa được chứng minh.

### 2. Luồng A — Savings Lab là công cụ mua sắm trung tính, local-first

Engineering và UX/CX tiếp tục hoàn thiện Savings Lab trên staging với công thức do người dùng tự nhập: giá niêm yết + phí giao hàng - giảm trực tiếp - giảm voucher.

- Giữ `zero-network`, `zero-PII`, không đọc giỏ hàng, không tự chèn giá, phí, mã hay sản phẩm mẫu.
- Hiển thị rõ tổng thực trả, phần tiết kiệm do người dùng nhập và chia nhóm khi người dùng chọn; không kết luận “hời”, “rẻ nhất”, “nên mua” khi chưa có lịch sử quan sát thật.
- Bổ sung trạng thái trống, kiểm tra dữ liệu nhập, reset, thao tác bàn phím, aria-label, mobile 390px và thông báo giới hạn: JayT không xác thực mã cá nhân hoặc giỏ hàng.
- Design tạo trải nghiệm mua sắm tinh tế bằng hệ thống màu, hierarchy, motion nhẹ và nội dung hướng dẫn; không dùng ảnh merchant, sản phẩm, logo hoặc social proof nếu chưa có quyền dùng/evidence.

### 3. Luồng B — Voucher Evidence Pipeline: chuẩn bị kho voucher, không tạo “voucher ẩn” giả

Data & Trust và Engineering dựng pipeline nội bộ cho **ứng viên voucher/chương trình chính thức**, theo nguyên tắc raw-first. Mỗi ứng viên chỉ được chuyển tầng khi có một receipt raw bất biến, URL canonical, locator trích dẫn, thời điểm capture, phạm vi, điều kiện, hiệu lực và người vận hành được chứng minh từ cùng nguồn hoặc nguồn liên kết rõ ràng.

- Khi thiếu bất kỳ trường nào: `HELD_INTERNAL` hoặc `T4_SOURCE_TO_WATCH`; tuyệt đối không hiển thị như mã dùng được, giảm giá, freeship, ưu đãi sinh viên, “voucher ẩn” hay deal ngon.
- “Voucher cá nhân hóa/ẩn” chỉ được mô tả trong UX bằng ngôn ngữ trung tính: **“Kiểm tra tại ứng dụng hoặc giỏ hàng chính thức của đơn vị bán.”** Không sao chép, hứa có, hay thu thập dữ liệu đăng nhập/giỏ hàng.
- Mặc định `T1_DEAL = 0` và `public_eligible_voucher = 0` cho đến khi evidence contract đạt đủ. Không đặt quota để hạ chuẩn.
- Các tên sàn, merchant, rạp, F&B hay dịch vụ chỉ có thể nằm trong backlog nội bộ với nhãn `commercial_source_hypothesis`; không được suy ra giá 45K/50K, cước 5K, miễn phí, điều kiện U22, mã giảm, thời hạn, địa chỉ hoặc bất cứ ưu đãi cụ thể nào.

### 4. Luồng C — AccessTrade: bản đồ cơ hội định tính, read-only, value-first

Product, Growth và Data & Trust lập **Commercial Opportunity Map** nội bộ theo Jobs-To-Be-Done: ăn trưa, di chuyển, học tập/làm việc, đồ KTX, sức khỏe, giải trí cuối tuần và mua sắm thiết yếu. Mỗi dòng chỉ gồm:

1. nhu cầu khách hàng;
2. vấn đề cần giải quyết;
3. loại merchant/campaign có thể phù hợp;
4. giả thuyết giá trị cho khách;
5. evidence cần có để trở thành T1/T2;
6. authority thương mại còn thiếu.

Không được nhập hoặc công bố danh mục campaign, mức hoa hồng, số lượt bán, giá sản phẩm, rating, coupon, deeplink, thông tin đăng nhập hay thông tin từ portal không có quyền. Nếu có portal đã đăng nhập sẵn, chỉ được khảo sát read-only trong phạm vi hiển thị hợp lệ; không tạo link, đăng ký campaign, gửi dữ liệu, dùng secret hoặc phát sinh tracking.

Affiliate chỉ có thể tiến tới bước kích hoạt sau khi có **ủy quyền riêng bằng văn bản** cho tài khoản/campaign/link, kiểm tra pháp lý-disclosure và CEO browser review. Trước thời điểm đó, không có CTA mua affiliate, không có attribution hay claim doanh thu.

### 5. Ý kiến Hội đồng 7 phòng ban và lệnh thực thi

| Phòng ban | Ý kiến và việc bắt buộc |
|---|---|
| Product | Ưu tiên quyết định chi tiêu hàng ngày; không thay số lượng content cho giá trị thực. |
| Design | Xây cảm giác mua sắm cao cấp bằng layout, typography, motion và component; asset thương mại chỉ sau khi rõ quyền dùng. |
| UX/CX | Đảm bảo người dùng hiểu khác biệt giữa tự tính, voucher chính thức và nguồn đang theo dõi; không tạo kỳ vọng sai về “voucher ẩn”. |
| Growth | Xây vòng quay nhu cầu/ngày và nghiên cứu định tính, không dùng claim giảm giá hoặc đánh giá giả để tăng chuyển đổi. |
| Data & Trust | Thiết kế evidence contract, fail-closed tiering và ledger; giữ `T1=0` khi chưa đủ chứng cứ. |
| Engineering | Hoàn thiện Savings Lab, voucher pipeline, logging tối thiểu không PII và test responsive/a11y; không deploy production. |
| QA | Kiểm desktop 1440px, tablet 768px, mobile 390px, keyboard, screen reader labels, console, link safety, NO-SHIP và parity SOT/staging. |

Antigravity phải thực hiện theo một gói hợp nhất, không chờ nhắc lại giữa các checkpoint:

`Commercial JTBD map → raw-first voucher candidate intake → evidence contract/fail-closed tiering → Savings Lab UX/a11y → QA staging độc lập → Council review → CEO browser review → chỉ khi có authority mới xem xét release/affiliate.`

### 6. Deliverable kế tiếp và cổng dừng

Nộp một **EZ-V Review Pack** gồm: (a) sơ đồ dữ liệu Voucher Evidence Pipeline không chứa claim mẫu; (b) Commercial Opportunity Map định tính; (c) kiểm thử Savings Lab desktop/tablet/mobile/a11y; (d) danh sách candidate nội bộ với trạng thái evidence, không có số liệu/sales claim; (e) NO-SHIP scan và parity SOT/staging.

Không gọi bất kỳ báo cáo, ảnh chụp, hash hay “PASS” nội bộ nào là nghiệm thu. CEO sẽ tự kiểm tra trên browser và raw evidence. Dừng và chờ authority ở đúng ba điểm: release production; tạo/đăng ký/kích hoạt affiliate hoặc dùng tài khoản/secret; và quyền pháp lý/asset chưa rõ. Ngoài ba điểm này, các luồng UI, accessibility, pipeline dữ liệu an toàn và nghiên cứu định tính phải tiếp tục.
---

## EZ-W. CEO P0 Artifact Quarantine — EZ-V Review Pack không đạt; staging hiện không phơi lộ

### Kết quả kiểm tra độc lập

CEO đã kiểm HTTP trực tiếp staging ngày 2026-08-31. Health trả về `v3.480.0-staging.ez` với SOT/served parity; HTML phục vụ **không** chứa các claim kiểm tra như “dưới 50K”, “18–30”, U22, trợ giá, 0đ, Shopee, TikTok, DanaBus, Metiz, Galaxy, CGV, Lotte, WinMart hoặc Bách Hóa. Link nghiệp vụ ngoài duy nhất còn lại là GitHub Docs pilot. Điều này **không** phải Go-Live hay nghiệm thu toàn bộ; chỉ xác nhận phạm vi public đã kiểm không lộ các claim nêu trên.

Ngược lại, CEO bác bỏ EZ-V Review Pack ở mức artifact. Các tệp `COMMERCIAL_OPPORTUNITY_MAP_QUALITATIVE_EZ_V.json` và `INTERNAL_VOUCHER_CANDIDATE_REGISTRY_EZ_V.json` vi phạm EZ-V khi đưa vào các tiền đề chưa chứng minh: trợ giá/vé tháng sinh viên, công cụ 0đ, ngân sách dưới 50K, freeship, danh mục 18–30 sản phẩm, rạp/ưu đãi U22, tên merchant/campaign cụ thể và “chính hãng”. Các chi tiết này không trở nên hợp lệ chỉ vì đặt nhãn nội bộ hoặc `T4`.

### Lệnh cách ly và sửa chữa

1. Đánh dấu hai artifact trên và mọi QA/Review Pack suy ra từ chúng là `QUARANTINED_UNVERIFIED_COMMERCIAL_PREMISES`; không dùng làm căn cứ release, Council pass, sourcing hoặc roadmap số lượng.
2. Không thay đổi staging/public DOM trong đợt sửa artifact này. Nếu phát hiện bất cứ premise bị cách ly nào trên SOT/served DOM thì fail-closed ngay, quay về zero-state và báo CEO.
3. Thay bằng `COMMERCIAL_OPPORTUNITY_MAP_QUALITATIVE_EZ_W.json` và registry tương ứng, chỉ cho phép các trường: `jtbd_need`, `customer_problem`, `merchant_category_hypothesis`, `value_hypothesis`, `evidence_required`, `authority_required`, `public_status=false`. Không có brand, sàn, campaign, giá, ngưỡng ngân sách, số lượng sản phẩm, freeship, điều kiện sinh viên, “0đ”, U22, rating, claim sản phẩm hay quy chế giao thông.
4. Tách GitHub pilot đã phê duyệt khỏi registry thương mại: đây là một `T2_OFFICIAL_PROGRAM_DOCUMENTATION_PILOT`, không phải voucher, deal, affiliate lead hay bằng chứng quyền lợi miễn phí.
5. QA phải có rule quét literal và semantic ban-list đối với artifact nội bộ lẫn public payload; không chỉ kiểm UI. Báo cáo phải ghi rõ “artifact quarantine” thay vì tổng PASS chung.

### Hội đồng và mốc tiếp theo

Data & Trust chịu trách nhiệm schema và fail-closed. Product/Growth viết lại JTBD không chứa promise thương mại. Design/UX tiếp tục Savings Lab local-first; Engineering/QA giữ parity và kiểm desktop/tablet/mobile/a11y. Council chỉ được review lại khi pack thay thế qua NO-SHIP scan và CEO kiểm raw artifact.

Production tiếp tục khóa; `P0_EQ` tiếp tục mở; `T1=0`; `public_eligible_voucher=0`; affiliate activation vẫn `false`. Không được dùng kết quả “204/204 PASS” của pack lỗi như bằng chứng nghiệm thu.
---

## EZ-X. Chuẩn một nguồn điều hành và nghiệm thu duy nhất

### 1. Phân định hai file, không còn hai “nguồn sự thật” cạnh tranh

| File | Vai trò từ nay | Không được dùng để |
|---|---|---|
| `02_CEO_DIRECTIVES/JAYT-245_TONG_CHI_THI_CEO_DUY_NHAT_VAN_HANH_JAYT.md` | **Nguồn điều hành và quyết định CEO duy nhất.** Chứa mandate hiện hành, scope, cổng an toàn, backlog, quyết định Council/CEO và trạng thái nghiệm thu. | Sản xuất hay thay thế raw evidence. |
| `PROJECT_MEMORY.md` | **Sổ ký ức/lịch sử kiểm toán.** Bắt buộc đọc trước khi hành động để không lặp lỗi cũ; lưu incident, quyết định quá khứ và con trỏ về chỉ thị hiện hành. | Ra chỉ thị mới, thay đổi scope, xác nhận trạng thái live, hay nghiệm thu bất kỳ release nào. |

Phần “Current Truth Header” trong `PROJECT_MEMORY.md` là snapshot lịch sử, có thể lạc hậu; không phải nguồn quyết định. Nếu mâu thuẫn, **JAYT-245 thắng tuyệt đối**. Không xóa hoặc chép đè lịch sử trong Memory; chỉ được cập nhật con trỏ/trạng thái ledger theo cơ chế append-only đã kiểm soát.

### 2. Một quy trình nghiệm thu, một nơi ra quyết định

Từ nay mọi mốc staging/release/Go-Live dùng duy nhất checklist quyết định trong **JAYT-245**, theo mẫu:

1. Mã mốc và version/route được kiểm;
2. trạng thái từng gate: Product, Design, UX/CX, Growth, Data & Trust, Engineering, QA;
3. ID evidence độc lập, vị trí raw artifact, SHA-256 tính lại và kết quả browser trực tiếp;
4. NO-SHIP/P0 còn mở, rollback và dependency;
5. verdict duy nhất của CEO: `HOLD`, `STAGING_ACCEPTED`, hoặc `GO_LIVE_ACCEPTED`.

Evidence vẫn phải sống ở các kho raw/QA/release riêng để có thể kiểm lại độc lập, nhưng **chỉ JAYT-245 mới được phép ghi verdict**. Vì vậy không có “hai file nghiệm thu”; có một file quyết định và các tệp evidence làm chứng cứ.

### 3. Lệnh cho Antigravity và Hội đồng

- Mọi report mới phải trích đúng section JAYT-245 đang hiệu lực, không viện dẫn Memory như approval.
- Không tự ghi “đã hoàn tất”, “release receipt” hoặc “PASS tổng” thành nghiệm thu. Chỉ được đề xuất verdict và nộp evidence.
- Trước mốc lớn, Hội đồng nộp một biên bản hợp nhất; CEO kiểm live/raw độc lập; sau đó CEO append quyết định vào JAYT-245.
- `PROJECT_MEMORY.md` chỉ được thêm một transaction lịch sử ngắn: mã quyết định JAYT-245 mới nhất và liên kết tới section; không sao chép toàn bộ directive, không tạo plan song song.

Hiện tại verdict giữ nguyên: `HOLD`; production bị khóa, `P0_EQ` mở, không có Go-Live được nghiệm thu.
---

## EZ-Y. CEO Decision — Chấp nhận có điều kiện EZ-W và mở Voucher Evidence Pilot Zero

### Verdict CEO

**`STAGING_ACCEPTED — PHẠM VI HẸP EZ-W`**: CEO đã đọc trực tiếp artifact EZ-W và payload staging. Map EZ-W dùng đúng bảy trường được phép; registry chỉ có bốn hypothesis generic, đều `T4_SOURCE_TO_WATCH`, `public_eligible=false`, `T1=0`; GitHub documentation pilot được tách khỏi voucher registry. HTML staging được kiểm lại không có các token commercial bị cách ly và vẫn chỉ giữ GitHub Docs external link.

Verdict này chỉ chấp nhận **việc cách ly và sửa artifact**, không xác nhận nhu cầu, merchant, voucher, affiliate, UX toàn diện hay readiness thương mại. `GO_LIVE_ACCEPTED` không được cấp; production vẫn khóa và `P0_EQ` vẫn mở.

### Lệnh tiếp theo: Voucher Evidence Pilot Zero

Data & Trust, Engineering và QA mở một pilot nội bộ cho **một** trang chương trình/voucher công khai do chính đơn vị vận hành, được tìm thấy qua discovery thủ công không đăng nhập. Mục tiêu chỉ là chứng minh dây chuyền evidence, không phải sản xuất deal.

1. Chụp một raw response đầy đủ cùng URL yêu cầu/final, chuỗi redirect, HTTP status, content type, thời gian UTC, độ dài byte và SHA-256 tính lại.
2. Tạo locator chính xác cho từng statement có thể trích; không suy diễn từ tiêu đề, navigation, metadata, ảnh, URL hay các đoạn rời.
3. Evidence contract phải ghi riêng: operator proven/unproven, offer proven/unproven, giá, mã, điều kiện, hạn, scope và total cost. Trường thiếu ghi `UNOBSERVED`.
4. Kết quả mặc định là `HELD_INTERNAL` và **không tạo card, CTA, link, logo, ảnh merchant hay counter công khai**. Chỉ Data & Trust mới có thể đề xuất chuyển tầng sau khi đủ contract và CEO kiểm raw.
5. Không dùng AccessTrade portal, không đăng nhập, không tạo deeplink/campaign, không gọi API thương mại, không tải catalog, không dùng secret.

### Deliverable và Council

Nộp một EZ-Y Review Pack hợp nhất gồm raw receipt, manifest hash tính lại, evidence contract từng claim, semantic-entailment review, NO-SHIP scan, và biên bản Hội đồng 7 phòng ban nêu rõ: **no public content proposed**. QA phải kiểm evidence artifact và served DOM tách biệt. Mọi kết quả `PASS` là dữ liệu đầu vào, không thay CEO verdict.
---

## EZ-Z. CEO Correction — Pilot Zero raw hợp lệ, nhưng contract suy diễn title thành operator

### Phán quyết độc lập

CEO tính lại trực tiếp raw file `candidate_ez_y_01_github_pack_raw_bytes.bin`: độ dài `271492` byte và SHA-256 `aacaf55b9a77dea9f5fa9321c8b59104184f045b24fca47d98bdcb79bca322be` khớp ledger. Raw có title chính xác:

`<title>GitHub Student Developer Pack - GitHub Education</title>`

Tuy nhiên, title chỉ chứng minh **chuỗi chữ trong title**. Nó không tự chứng minh quan hệ “GitHub Education là đơn vị vận hành”, không chứng minh điều khoản ưu đãi, chi phí, voucher, điều kiện hay phạm vi. Do đó các mapping “do GitHub Education cung cấp”, “đơn vị vận hành là GitHub Education”, `operator_proven=true` và `offer_proven=true` trong EZ-Y là suy diễn provenance.

### Lệnh khắc phục

1. Cách ly `EVIDENCE_CONTRACT_V3_VOUCHER_PILOT_ZERO.json` và `VOUCHER_EVIDENCE_PILOT_ZERO_LEDGER_EZ_Y.json` với trạng thái `QUARANTINED_TITLE_TO_OPERATOR_INFERENCE`. Raw capture vẫn được giữ nguyên, hash không thay đổi.
2. Thay bằng contract/ledger sửa: `title_observed=true`, `operator_proven=false`, `program_name_observed=true`, `offer_proven=false`, và mọi trường mã/điều kiện/hạn/scope/tổng chi phí là `UNOBSERVED`. Classification là `HELD_INTERNAL_DOCUMENT_IDENTITY_ONLY`, không gọi đây là voucher pilot thành công.
3. QA bổ sung rule: một excerpt title, header, navigation, footer, URL hoặc metadata không được dùng để prove operating-body relationship hay offer terms, trừ khi raw source phát biểu rõ quan hệ đó trong cùng mệnh đề.
4. Public DOM không thay đổi; staging giữ 1 GitHub documentation card đã được phê duyệt riêng ở EZ-H, không lấy EZ-Y làm evidence mở rộng nội dung của card.

### Bước tiếp theo

Sau khi contract được sửa và CEO kiểm lại, chỉ được chọn **một trang khác**, không trùng GitHub pilot, từ operator tự công bố. Discovery/capture vẫn zero-login/read-only; đợt tiếp theo phải chứng minh trước hết identity relation bằng mệnh đề rõ ràng, rồi mới xét bất kỳ trường voucher nào. Không có public card hay affiliate action trong toàn bộ giai đoạn.
---

## EZ-AA. CEO Decision — Chấp nhận sửa EZ-Z; mở Evidence Pilot 1 theo cặp quan hệ rõ ràng

### Verdict CEO

**STAGING_ACCEPTED — PHẠM VI HẸP EZ-Z**. CEO đã tính lại SHA-256 raw, đọc contract và ledger điều chỉnh: raw không đổi; operator_proven=false, offer_proven=false; classification là HELD_INTERNAL_DOCUMENT_IDENTITY_ONLY. Đây chỉ là chấp nhận sửa taxonomy/evidence, không phải xác nhận chương trình hay voucher.

### Council đề xuất

Product cần pipeline tạo được dữ liệu thật thay vì title-only. Data & Trust yêu cầu proof relation rõ. UX/CX và Design yêu cầu không thay public UI trước khi có value thật. Growth không dùng pilot làm claim. Engineering/QA yêu cầu raw chain từng document, canonical relationship và regression NO-SHIP. CEO chấp thuận mở một pilot rất hẹp dưới đây.

### Evidence Pilot 1 — Cặp tài liệu cùng miền, relation-first

Antigravity được phép discovery read-only, zero-login để chọn **một** cặp tài liệu công khai cùng một miền:

1. tài liệu A phải có mệnh đề rõ ràng liên hệ trang/chương trình với tổ chức vận hành hoặc đơn vị phát hành; và
2. tài liệu B phải có mệnh đề rõ ràng về chương trình/chính sách đang được khảo sát.

Cả hai phải được raw-capture riêng, mỗi tệp có request/final URL, redirect chain, status, content type, thời gian UTC, byte length, SHA-256 tính lại và locator. Một title/URL/logo/navigation không được dùng thay mệnh đề relation. Cross-document entailment chỉ được dùng nếu raw A hoặc raw B có link canonical/statement trực tiếp nối hai tài liệu; nếu không, relation_proven=false.

Mọi trường về mã, giá, giảm giá, điều kiện, hạn, phạm vi địa phương, tổng chi phí, affiliate hoặc quyền dùng asset giữ UNOBSERVED trừ khi chính mệnh đề raw chứng minh. Kết quả mặc định HELD_INTERNAL; không thay public DOM, không thêm CTA/card/link/counter, không dùng AccessTrade/portal/API/secret/deeplink.

### Deliverable

EZ-AA Review Pack phải có evidence graph A↔B, locator quote chính xác, ma trận entailment từng claim, decision log và NO-SHIP scan. Council nộp một biên bản chung; CEO tự kiểm raw trước khi quyết định. Production và affiliate activation tiếp tục khóa.
---

## EZ-AB. CEO Supply Fast Lane — Nhanh theo tầng, không hạ chuẩn sự thật

### Quyết định chiến lược

CEO xác nhận nguy cơ “supply paralysis” là có thật nếu đội ngũ dành thời gian vô hạn cho tài liệu lịch sử hoặc áp cùng một mức kiểm toán cho mọi tầng. Nhánh địa điểm lịch sử đã đóng. Từ đây, JayT dùng **time-box 24 giờ cho mỗi candidate**, dồn năng lực vào giá trị tiết kiệm, voucher chính thức, quyết định mua và Savings Lab.

Điều chỉnh này không phê duyệt các con số, mức giá, vé sinh viên, địa chỉ, Google Maps, mã voucher, sản phẩm dưới một ngưỡng ngân sách, API AccessTrade, deeplink hay merchant nêu trong đề xuất bên ngoài. Chúng đều chưa có evidence/authority phù hợp.

### Tiêu chuẩn nhanh theo tier

| Tầng | Bằng chứng tối thiểu để công bố | Không cần làm | Nếu hết 24 giờ chưa đủ |
|---|---|---|---|
| T1 Deal | Một hoặc nhiều nguồn official liên kết chặt chẽ chứng minh lợi ích, giá/tổng chi phí, điều kiện, hạn, scope và URL; mỗi claim có locator raw. | Không cần bốn quote độc lập nếu một nguồn official đã chứng minh đủ các trường. | Held nội bộ hoặc T4, không giá/CTA. |
| T2 Chương trình/voucher | Nguồn official, statement về chương trình, điều kiện/phạm vi/hạn khi có và link canonical. | Không yêu cầu quan hệ pháp lý lịch sử không liên quan. | Held/T4; không gọi là voucher dùng được. |
| T3 Địa điểm/tiện ích | Một trang của operator hoặc dataset công khai có thẩm quyền chứng minh tên, địa chỉ/địa bàn và tiện ích nêu trên card. | Không điều tra quyết định thành lập, cơ cấu hay tài liệu lịch sử. | Không được lên T3; có thể giữ candidate nội bộ/T4 theo nguồn. |
| T4 Radar | Nguồn/nhu cầu/trạng thái theo dõi và thời điểm recheck; không có claim offer. | Không biến thành deal vì cần đủ số lượng. | Giữ T4 hoặc đóng candidate. |

Google Maps hoặc kết quả tìm kiếm có thể là **manh mối discovery**, không tự là chứng minh operator, địa chỉ hiện hành, quyền dùng asset hay ưu đãi.

### Vận hành 24 giờ, một lần quyết định

1. Mỗi candidate mở một clock 24 giờ, owner và hypothesis không public.
2. Trong clock chỉ được capture/read-only theo scope; ưu tiên trang điều khoản, promotion, hoặc operator page có statement trực tiếp.
3. Hết clock, Data & Trust ghi một verdict duy nhất: T1/T2/T3 đủ evidence, T4, HELD, hoặc CLOSED. Không mở chuỗi tranh luận mới cho cùng candidate, trừ khi có URL raw mới materially khác.
4. QA kiểm claim binding và public boundary; Council review theo batch; CEO chỉ kiểm mẫu/rủi ro cao, không lặp lại điều tra lịch sử.

### Affiliate và nguồn sản phẩm: sẵn sàng kỹ thuật, chưa kích hoạt thương mại

Engineering được xây adapter contract, schema, feature flag, disclosure component, refresh/expiry model và test không dữ liệu mẫu cho feed thương mại. Product/Growth được lập queue nhu cầu KTX, ăn uống, đi lại, học tập và giải trí theo JTBD.

Chưa được gọi API/feed, đăng nhập portal, dùng credentials, tạo link, import SKU, hiển thị giá tham chiếu, nhãn “approved”, universal deeplink, commission hoặc attribution trước khi có authority bằng văn bản. Khi authority được cấp, feed phải đi qua raw capture, total-cost contract và time-box trên trước khi có bất kỳ card thương mại nào.

### Savings Lab là giá trị đưa ra ngay

Design, UX/CX và Engineering ưu tiên hoàn thiện Savings Lab local-first: nhập giá/phí/giảm do người dùng tự cung cấp, tính thực trả/chia nhóm, trạng thái trống, validation, reset, keyboard, screen-reader, 390px/768px/1440px và disclosure zero-PII. Không prefill giá/mã/sản phẩm, không kết luận Mua/Chờ.

### Ý kiến Hội đồng và mốc

Product/Growth đồng ý dồn vào nhu cầu mua thật thay vì archive; Data & Trust giữ core fields theo tier; Design/UX/CX biến Savings Lab thành trải nghiệm hữu ích ngay; Engineering dựng adapter bị khóa; QA làm regression public/no-ship. Nộp một **EZ-AB Fast Lane Pack**: SLA ledger, verdict theo tier, raw receipts của candidate xử lý trong hạn, UI/a11y evidence Savings Lab, feature-flag audit và Council minute hợp nhất. Production tiếp tục HOLD; affiliate activation=false.
---

## EZ-AC. CEO P0 Evidence Correction — Cặp Spotify chưa chứng minh relation; chuyển sang linked-terms capture

### Kết quả kiểm raw độc lập

CEO tính lại hash hai raw file EZ-AA và kiểm byte locator:

- Doc A thực sự chứa câu “Các Điều khoản này là điều khoản giữa bạn và Spotify AB …”; câu này chỉ chứng minh **bên tham gia của điều khoản trong Doc A**, không tự chứng minh Spotify AB vận hành/trách nhiệm cho Student page.
- Doc B thực sự chứa câu về 2 tháng Premium giá 33.000₫ và câu eligibility sinh viên. Đây là các **mệnh đề quan sát tại thời điểm capture**, không phải giá tổng thực trả, không xác nhận phạm vi Đà Nẵng, không phải voucher code và chưa được nối với Doc A.
- Locator được báo là canonical link Doc B→Doc A lại là footer link tới `/vn-vi/legal/`, không trỏ tới `/vn-vi/legal/end-user-agreement/`. Nó không đạt điều kiện relation-first của EZ-AA. Raw Doc B có link riêng tới `/legal/premium-promotional-offer-terms`, nhưng tài liệu đó chưa được capture.

Do đó `cross_document_relationship_proven=true` và `HELD_INTERNAL_DOCUMENT_PAIR_RELATION_PROVEN` là sai.

### Cách ly, giữ lại quan sát đúng

1. Cách ly `EVIDENCE_CONTRACT_V3_DOCUMENT_PAIR_PILOT_ONE_EZ_AA.json` và `DOCUMENT_PAIR_PILOT_ONE_LEDGER_EZ_AA.json` là `QUARANTINED_INDIRECT_FOOTER_LINK_NOT_DOCUMENT_RELATION`. Hai raw files vẫn giữ nguyên, hash không đổi.
2. Tạo ledger quan sát thuần raw, không relation inference: Doc A = `LEGAL_PARTY_STATEMENT_OBSERVED_FOR_DOC_A_ONLY`; Doc B = `LISTED_PRICE_AND_ELIGIBILITY_OBSERVED_FOR_DOC_B_ONLY`. Mọi giá trị phải ghi capture time và không được dùng cho public.
3. T1/T2/public eligibility giữ false. Không tạo card, CTA, counter, logo/asset, affiliate/disclosure hay link mới trên staging.

### Linked-terms capture duy nhất được phép tiếp theo

Để hoàn thành Pilot 1 đúng cách, Antigravity được capture read-only, zero-login **một** document được Doc B liên kết trực tiếp: `https://www.spotify.com/legal/premium-promotional-offer-terms`.

Yêu cầu:

- raw response, redirect chain, status, byte length, SHA-256 và locator không suy diễn;
- kiểm tra xem document mới có mệnh đề trực tiếp nối chương trình với pháp nhân/party hoặc link canonical tới một tài liệu đã capture; nếu không, relation_proven vẫn false;
- tách listed price, eligibility, promotion terms, effective period, territory, total cost và eligibility verification thành các field độc lập; thiếu gì ghi UNOBSERVED;
- không follow thêm link, không mở clock/candidate thứ hai, không dùng portal/API/affiliate.

Council nộp một biên bản gộp, QA kiểm graph URL chính xác (target URL phải bằng captured URL, không chấp nhận footer root). CEO sẽ kiểm raw trước verdict kế tiếp. Production giữ HOLD.
---

## EZ-AD. CEO Decision — Đóng Pilot Spotify ở trạng thái held; mở Batch Fast Lane đa nguồn

### Verdict CEO

**STAGING_ACCEPTED — PHẠM VI HẸP EZ-AC**. CEO đã kiểm lại hash, direct target URL và byte locator. Doc B liên kết trực tiếp tới Doc C; các câu về giá niêm yết/eligibility/điều khoản chỉ được lưu đúng là quan sát tại capture; không có relation legal entity, voucher code, scope Đà Nẵng hay total cost. Classification HELD_INTERNAL_LINKED_PROMOTIONAL_TERMS_EVALUATED là phù hợp.

Chuỗi Spotify đóng tại đây, không capture thêm link hay tranh luận thêm. Không có card public mới và không dùng tập raw này làm căn cứ thương mại.

### Batch Fast Lane 5 candidate, 24 giờ/candidate

Data & Trust mở đồng thời tối đa năm candidate từ năm nhóm khác nhau: chương trình chính thức; voucher/promotion official; địa điểm/tiện ích; dịch vụ di chuyển; nhu cầu mua sắm thiết yếu. Candidate chỉ được chọn từ trang công khai do operator hoặc dataset có thẩm quyền phát hành; record nội bộ phải khởi đầu với hypothesis không mang tên deal/giá/benefit.

Mỗi candidate có owner, thời điểm mở/đóng SLA, một raw capture chính và verdict sau tối đa 24 giờ:

- đủ core fields theo tier thì đề xuất T1/T2/T3;
- thiếu field thì T4 hoặc HELD;
- provenance/asset/URL sai thì CLOSED + quarantine.

Không mở candidate thứ sáu trước khi năm verdict được ghi. Không chuyển T4/HELD thành public deal để đạt quota. Không dùng Google Maps/search result, portal đăng nhập, API, feed, credential, affiliate link hay asset merchant làm evidence.

### Tăng giá trị người dùng song song

Design, UX/CX và Engineering hoàn thiện **Savings Lab v2 trên staging**: nhập liệu có nhãn rõ, preset trống theo nhu cầu (mua một mình/mua nhóm), hiển thị phép tính từng thành phần, validation ngăn giá trị âm vô lý, reset, hỗ trợ bàn phím/screen reader và responsive 390/768/1440. Tất cả giá/phí/giảm vẫn do người dùng tự nhập; không có price seed, coupon mẫu, tracking hay khuyến nghị Mua/Chờ.

### Council/QA

Hội đồng nộp một batch review duy nhất với SLA ledger, raw/evidence graph, verdict tier và UI/a11y evidence. QA quét source artifact, SOT/served payload và public external links. CEO chỉ xem xét promotion sau khi có batch verdict; production vẫn HOLD, T1 commercial vẫn 0 cho đến khi một candidate đạt đủ fields.
---

## EZ-AE. CEO P0 Correction — Batch EZ-AD không phải Fast Lane mới; Savings Lab v2 chờ browser acceptance

### Phát hiện độc lập

CEO kiểm sổ `BATCH_FAST_LANE_5_CANDIDATES_SLA_LEDGER_EZ_AD.json` thấy cả năm candidate tái sử dụng raw vault/chains cũ; đồng thời `sla_close_utc` là 2026-09-01T07:00:00Z nhưng verdict đã được ghi ngày 2026-08-31. Đây không phải năm candidate mới được xử lý trong 24 giờ, mà là backfill trạng thái cũ. Batch không đạt EZ-AD.

CEO cũng xác nhận SOT và served JavaScript cùng hash mới, có code Savings Lab v2. Tuy vậy health/version staging vẫn là `v3.480.0-staging.ez`; không có browser interaction review độc lập trong checkpoint này. Vì vậy v2 chỉ là **served-code verified, UX acceptance pending**, không được gọi là staging acceptance.

### Cách ly và sửa

1. Cách ly `BATCH_FAST_LANE_5_CANDIDATES_SLA_LEDGER_EZ_AD.json` và mọi summary “5/5 evaluated” là `QUARANTINED_REUSED_RAW_AND_PREMATURE_SLA_VERDICTS`. Các raw cũ vẫn là lịch sử riêng, không được tái gắn timestamp để làm batch mới.
2. Các candidate Spotify/Notion/library/railway/post đã đóng/held giữ nguyên trạng thái cũ; không được gọi lại là Fast Lane, không đưa vào public.
3. Version staging kế tiếp phải có identifier mới gắn với đúng served JS/HTML hash và changelog; không dùng version cũ để mô tả UI khác.

### Fast Lane rerun đúng nghĩa

Mở lại tối đa **hai** candidate mới trong một batch để chứng minh quy trình trước khi scale:

- raw capture phải được tạo sau `sla_open_utc`, path/hash mới, URL không trùng candidate/chains đã closed;
- candidate chỉ có `OPEN` trước deadline; verdict sớm chỉ khi đạt đủ core fields hoặc phát hiện P0/provenance failure; nếu không, verdict chỉ ghi tại/sau close time;
- ledger bắt buộc có capture timestamp, raw creation timestamp, SLA open/close và điều kiện verdict sớm;
- không dùng archive cũ, homepage chung, title-only hay status cũ thay capture mới.

### Savings Lab v2

Engineering giữ code v2 trên staging, nhưng không deploy production. QA phải nộp browser evidence trực tiếp cho solo/group, component formula, non-negative validation, reset, keyboard, aria-live và responsive 390/768/1440 dưới version mới. Council review rồi CEO browser review mới được ghi `STAGING_ACCEPTED` cho UX này.

Tất cả commercial/affiliate/public-content gates giữ nguyên: T1=0, public voucher=0, affiliate activation=false, production HOLD.
---

## EZ-AF. CEO Commercial Velocity Pivot — SLA 12 giờ, acquisition liên tục, doanh thu chỉ sau authority

### Quyết định CEO

JayT không được vận hành như phòng kiểm toán tách rời khách hàng. Kể từ EZ-AF, thước đo chính là lượng **giá trị hành động được và trung thực**: nội dung đúng tier, công cụ giúp người dùng tính thực trả, candidate được xử lý nhanh, và sau khi có authority là chuyển đổi affiliate minh bạch.

CEO bác bỏ việc tự công bố cohort 15 deal, các mức giá/tên merchant cụ thể, 18–30 SKU, sản phẩm dưới ngưỡng giá, link mở app hoặc commission/disclosure affiliate trong khi chưa có raw evidence và ủy quyền. Không báo cáo “test pass” thay cho giá trị khách hàng.

### Hai pipeline không được chờ nhau

**A. Acquisition Pipeline** — Content/Growth/Data & Trust liên tục tìm và ghi candidate nội bộ read-only theo bảy JTBD. Mục tiêu vận hành là có candidate mới đủ đa dạng để xử lý hằng ngày; candidate không đồng nghĩa deal, không public, không dùng asset/brand claim chưa chứng minh.

**B. Verification & Publication Pipeline** — mỗi candidate bắt đầu SLA **12 giờ**:

- raw-first, locator cho claim, tier decision, expiry/recheck;
- một nguồn official hiện hành có thể đủ nếu chứa đầy đủ core fields cần cho tier; không đòi bốn quote;
- T3 chỉ cần nguồn operator/dataset có thẩm quyền cho tên + vị trí + tiện ích hiện hành; tuyệt đối không điều tra hồ sơ lịch sử; Maps/search chỉ là discovery;
- sau 12 giờ phải có verdict T1/T2/T3, T4, HELD hoặc CLOSED. Không kéo dài candidate cũ hoặc làm backfill timestamp.

### Commercial and affiliate runway

Engineering tiếp tục xây ingestion interface, price-observation data contract, expiry/recheck worker specification, disclosure component và feature flag **không có dữ liệu thật**. Product/Growth lập commercial readiness checklist.

Khi và chỉ khi có authority bằng văn bản cho tài khoản/campaign/feed/link, JayT mới được khảo sát catalog AccessTrade read-only trong phạm vi account được quyền xem. Chỉ dữ liệu quan sát có source, timestamp, SKU/URL, giá, phí/tổng thực trả, điều kiện và expiry mới đủ đi đến card; không authority thì không API, không import SKU, không deep link, không tracking, không doanh thu attribution.

### KPI CEO và Council

Dashboard tuần phải tách: candidate mới; candidate có verdict đúng hạn; T1/T2/T3/T4 công khai có evidence; content hết hạn/recheck; Savings Lab completion không định danh; lỗi provenance; authority status; và, khi được phép, conversion/revenue affiliate có disclosure. Không tính raw candidate, test pass, click giả, review giả hay giá chưa chứng minh vào KPI thành công.

Council 7 phòng ban review một lần/tuần trên dashboard này; CEO quyết định public/release theo JAYT-245. Savings Lab v2 và Fast Lane rerun EZ-AE tiếp tục là priority. Production vẫn HOLD, T1=0 và affiliate activation=false cho đến evidence/authority phù hợp.
---

## EZ-AG. CEO Checkpoint — Fast Lane rerun hợp lệ đang mở; v3.481 served-code verified, UX chưa nghiệm thu

### Ghi nhận độc lập

CEO xác nhận trực tiếp:

- staging health là `v3.481.0-staging.ez`, SOT/served JS và HTML có parity;
- hai raw file JetBrains/Figma có hash và byte length khớp ledger, last-write/capture sau SLA open 2026-08-31T08:28:00Z;
- cả hai ledger record là `OPEN_EVALUATING`, không có early verdict hoặc public action;
- served JavaScript có Savings Lab v2 controls và aria-live.

Do đó Fast Lane rerun **được phép tiếp tục cho đến SLA close**, khác với batch backfill EZ-AD. Không candidate nào được kết luận trước hạn trừ đủ core fields hoặc có P0 proven. Không mở candidate thứ ba.

### Ranh giới acceptance

Version/parity/served-code chỉ được ghi `TECHNICAL_SERVE_VERIFIED`. Tương tác Solo/Group, formula, clamping, reset, keyboard, screen reader và responsive vẫn là `UX_ACCEPTANCE_PENDING_CEO_BROWSER_REVIEW`. Báo cáo Puppeteer/QA không thay thế browser review CEO.

Engineering không thay đổi logic Savings Lab trong lúc QA/browser review, trừ sửa P0. QA chuẩn bị test evidence theo 390/768/1440 và không gắn nhãn “CEO accepted”. Design/UX có thể chuẩn bị copy/help states không chứa giá, voucher, merchant hay promise thương mại.

Production vẫn HOLD; không có release/affiliate/public card mới theo checkpoint này.
---

## EZ-AH. Thực thi JAYT-254 — Browser Review Savings Lab, đóng SLA và cohort cinema/transit raw-first

### Tiếp nhận chỉ thị Chủ tịch

CEO tiếp nhận JAYT-254. Production vẫn HOLD. Hội đồng 7 phòng ban triển khai một work order thống nhất dưới đây; không dùng report hay media do Antigravity tự tạo làm CEO acceptance.

### 1. Browser Review Savings Lab v2

Engineering/QA chuẩn bị staging `v3.481.0-staging.ez` cho CEO kiểm trực tiếp ở desktop 1440px và mobile 390px. Bộ evidence phải tách:

- video/ảnh thao tác tái lập được cho Solo, Group, formula, validation số âm, reset, keyboard và screen reader label;
- network log chỉ chứng minh trong ca test đó không có request phát sinh từ Savings Lab sau tải trang; không suy diễn “zero network” từ ảnh;
- bản ghi disclaimer và danh sách field không PII.

CEO tự browser review và chỉ CEO append verdict `UX_ACCEPTED` hoặc `UX_HOLD`. Không gọi QA/Puppeteer là nghiệm thu trực quan.

### 2. Đóng hai candidate khi hết SLA

Hai candidate JetBrains/Figma giữ OPEN đến `sla_close_utc`. Tại hoặc sau thời điểm đó, Data & Trust ghi một verdict cuối: T1/T2/T3 chỉ khi core fields của tier được raw-bind; nếu thiếu thì T4, HELD hoặc CLOSED. Không dùng yêu cầu “bốn quote” như quota: một nguồn official hiện hành đủ các trường cần thiết là đủ; bốn quote không đủ field vẫn không qua. Không capture thêm link hay kéo SLA trừ P0 proven.

### 3. Cohort cinema & transit: 15 candidate, không phải 15 deal

Acquisition Pipeline mở cohort nội bộ tối đa 15 candidate từ nhóm rạp/di chuyển công cộng và đô thị, gồm các nguồn mà Chủ tịch nêu như hypothesis discovery. Không ghi hay hiển thị mức giá, 5K/45K/50K/75K, U22, đồng giá, mã, lịch hay địa điểm cho đến khi source hiện hành chứng minh từng claim.

Mỗi candidate theo 3 bước: raw HTTP response → locator cho core fields → content manifest verdict. Mỗi candidate có SLA 12 giờ theo EZ-AF; thiếu field chuyển T4/HELD/CLOSED, không bù quota bằng claim cũ. Không dùng Google Maps như evidence offer, không tạo link thương mại.

### 4. AccessTrade

Product/Growth/Data & Trust giữ nghiên cứu JTBD offline cho vật dụng KTX ngân sách thấp; dùng nhu cầu/khó khăn/evidence cần có/authority cần có, không product list, giá, merchant claim, campaign rate hay link. Authority Gate affiliate giữ khóa tuyệt đối.

### Council và deliverable

Product: hành trình tiết kiệm; Design/UX: clarity và a11y Savings Lab; Growth: acquisition queue; Data & Trust: field binding; Engineering: staging/feature flags; QA: browser-test pack và NO-SHIP. Nộp một JAYT-254/EZ-AH Council Pack gồm Browser Review evidence, hai SLA verdict, ledger cohort 15 candidate và AccessTrade JTBD map. Không production release hoặc affiliate activation.
---

## EZ-AI. CEO Browser Verdict — Savings Lab UX accepted hẹp; version drift và SLA verdict sớm bị cách ly

### 1. CEO browser review độc lập

CEO đã kiểm trực tiếp staging Savings Lab v2 ở desktop 1440px và mobile 390px:

- Solo/Group hoạt động; Group tự đặt 2 người.
- Với dữ liệu do CEO nhập: giá 100.000, ship 20.000, giảm trực tiếp 10%, voucher 5.000, kết quả là thực trả 105.000 và chia hai là 52.500.
- Reset đưa các giá trị về rỗng/0 và số người về 1.
- Disclaimer local-first/không đọc giỏ hàng hiển thị; console không có warning/error trong ca kiểm.
- Mobile 390 hiển thị controls có thể thao tác, không có tràn ngang quan sát được tại fold đã kiểm.

**Verdict:** `UX_ACCEPTED_SAVINGS_LAB_V2_BEHAVIOR_ONLY`. Chấp nhận này chỉ cho các hành vi nêu trên và không khẳng định zero network tuyệt đối, performance, toàn bộ WCAG, production readiness hay độ đúng của version/release.

### 2. P0 version identity drift

Health tuyên bố `v3.481.0-staging.ez`, nhưng SOT, served JS, title, header và footer browser đều hiển thị `v3.480.0-staging.ez`. Đây là `P0_VERSION_IDENTITY_DRIFT`; không được dùng health parity một mình để gọi version/deploy accepted.

Engineering phải tạo một version identity duy nhất từ build manifest, inject cùng giá trị vào health, HTML, JS, title/header/footer và release receipt; QA phải đối chiếu browser-visible version với health/version manifest. Không sửa hành vi Savings Lab trong bản identity-only fix. Production tuyệt đối không được phát hành trước khi CEO kiểm lại.

### 3. SLA verdict sớm không hợp lệ

Ledger JetBrains/Figma ghi verdict lúc 2026-08-31T08:54Z trong khi SLA close là 2026-09-01T08:28Z. Quy tắc chỉ cho phép early verdict khi đủ core fields để qua tier hoặc có P0 provenance failure. Cả hai verdict là HELD vì thiếu field, nên lý do `CORE_FIELDS_COMPLETE` tự mâu thuẫn và không hợp lệ.

1. Cách ly các record verdict sớm là `QUARANTINED_PREMATURE_EARLY_VERDICT_CORE_FIELDS_CONTRADICTION`.
2. Khôi phục hai candidate về `OPEN_EVALUATING` đến SLA close; không capture mới, không thêm link, không public action.
3. Tại/sau close, verdict phải dựa trên evidence đã capture: T2 chỉ nếu đủ field T2; thiếu thì T4/HELD/CLOSED. Ghi lý do theo field thiếu, không dùng nhãn “core complete”.

### 4. Council follow-up

Product/UX giữ Savings Lab behavior đã được CEO chấp nhận. Engineering xử P0 version identity. Data & Trust sửa SLA ledger. QA kiểm browser version + health + manifest, và re-run NO-SHIP. Growth không dùng UX acceptance hay candidate hiện tại để claim deal/conversion. Council nộp một EZ-AI correction pack; CEO quyết định technical staging acceptance sau browser recheck version.

Production HOLD, T1=0, public voucher=0, affiliate activation=false giữ nguyên.

---

## EZ-AJ. CEO Recheck — chấp nhận hẹp staging v3.482; bác bỏ regression nới gate phiên bản

### 1. Kết quả CEO kiểm trực tiếp, không dựa vào report

CEO vừa mở trực tiếp `http://127.0.0.1:4173/` và xác nhận trong browser:

- title, header và footer cùng hiển thị `v3.482.0-staging.ez`; health, SOT và served payload phải tiếp tục khớp đúng cùng version này;
- Savings Lab v2 mở được, hiển thị đủ field, công thức và disclaimer Local-First;
- phép thử CEO nhập: `100.000 + 20.000 − 10% (10.000) − 5.000 = 105.000 VNĐ` cho kết quả đúng 105.000 VNĐ.

**Verdict hẹp:** `STAGING_ACCEPTED_VERSION_IDENTITY_AND_SAVINGS_LAB_V2_BEHAVIOR`. Verdict này chỉ chấp nhận identity và hành vi đã kiểm trên staging; không là Go-Live, không xác nhận performance/WCAG toàn diện, không mở content thương mại hay production.

### 2. P1 — gói “274/274 PASS” không được dùng làm evidence release

CEO phát hiện hai suite `EZ-AG` và `EZ-AE` đã đổi assertion version từ kiểm chính xác sang `startsWith('v3.48')`. Cách này có thể PASS cả `v3.480.0` hoặc `v3.481.0`, tức là tái cho phép chính lỗi P0 version drift vừa sửa.

Do đó mọi kết luận “20 suites / 274 PASS” có chứa hai assertion nới này là `QA_VERSION_GATE_INVALIDATED_BY_PREFIX_ASSERTION`, không được đưa vào release receipt, KPI hay Council acceptance.

Engineering và QA phải khôi phục gate quyết định như sau, không hard-code mơ hồ và không dùng prefix:

1. Một build manifest duy nhất cung cấp `expectedVersion`.
2. Assert **bằng tuyệt đối**: `health.version = manifest.expectedVersion`; version SOT/served JS; title/header/footer; `data-ledger-version`; và release receipt đều bằng manifest đó.
3. Thêm negative fixture: một giá trị version lệch một ký tự phải làm suite FAIL, để chứng minh gate thực sự bắt được drift.
4. Nộp diff, output test mới và browser-visible evidence. Không đổi logic Savings Lab hay tự đổi version chỉ để làm test xanh.

### 3. SLA JetBrains/Figma vẫn đang mở

Theo ledger hiện hành, SLA close là `2026-09-01T08:28:00Z`. Trước mốc này, cả JetBrains/Figma vẫn là `OPEN_EVALUATING`; nghiêm cấm ghi verdict cuối, public card, voucher, giá, affiliate hay capture/link mới. Đến mốc close, Data & Trust chỉ ra verdict fail-closed dựa trên raw evidence đã có và field thiếu; Council sau đó mới review.

### 4. Council và rào an toàn không đổi

Product/Design/UX-CX giữ scope Savings Lab rõ ràng; Growth không claim conversion/doanh thu; Data & Trust kiểm SLA; Engineering sửa QA gate; QA kiểm 1440/768/390, a11y/NO-SHIP và exact-version gate. Council nộp **một** EZ-AJ Correction Pack. CEO sẽ chỉ xem xét release sau Council pack độc lập, browser review và owner aesthetic acceptance.

Production vẫn HOLD; T1=0; public voucher=0; affiliate activation=false.

---

## JAYT-256-ADDENDUM. Phụ lục kỹ thuật — Schema dữ liệu 2 trục và hợp đồng admission

**Hiệu lực:** Phụ lục kỹ thuật chính thức của JAYT-245. JAYT-245 vẫn là chỉ thị vận hành canonical; phụ lục này chỉ bổ sung schema và cổng nhận nội dung, không thay thế lịch sử hay mở quyền phát hành.

### 1. Quyết định CEO và ranh giới bất biến

Từ nay mọi mục nội dung phải tách hai thuộc tính độc lập:

- `contentTier`: `T1_DEAL`, `T2_PROGRAM`, `T3_PLACE`, `T4_RADAR`.
- `admissionState`: `OPEN_EVALUATING`, `EVIDENCE_COMPLETE_INTERNAL_HELD`, `HELD_NEW_COHORT_REQUIRED`, `CLOSED`, `PUBLIC_APPROVED`.

`contentTier` trả lời loại nội dung; `admissionState` trả lời có được phát hành hay chưa. Không được suy diễn một tier đủ điều kiện là được tự công bố. `PUBLIC_APPROVED` chỉ được tạo từ quyết định CEO bằng văn bản, sau Council review; không có auto-publish từ migration, raw capture, test pass, hay báo cáo Antigravity.

### 2. Migration chỉ-nâng-cấp, tương thích ngược

Antigravity phải thực hiện migration additive/backward-compatible: bổ sung trường mới và mapping có thể truy vết, không xóa/ghi đè evidence bundle, raw payload, locator, hash, manifest hay receipt lịch sử. Không đổi SOT hay served code ngoài phạm vi migration đã được kiểm.

- GitHub Education Pilot đang hiển thị chỉ được chuẩn hóa thành `T2_PROGRAM + PUBLIC_APPROVED` sau khi QA chứng minh được liên kết với quyết định CEO phát hành và evidence bundle hiện hữu. Nếu không truy được hai liên kết này, giữ mục ở `EVIDENCE_COMPLETE_INTERNAL_HELD` và báo cáo CEO; tuyệt đối không tự giữ public chỉ vì đang render.
- Tất cả dữ liệu cũ chưa map được phải giữ nguyên provenance và đặt migration result là `OPEN_EVALUATING`/`HELD_NEW_COHORT_REQUIRED` theo hồ sơ, không được bịa tier hoặc admission state.
- Mọi thay đổi tạo build staging mới phải có version mới, manifest exact-version/hash bốn chiều; giữ nguyên manifest lịch sử.

### 3. Contract T4_RADAR độc lập

Một T4 hợp lệ tối thiểu có `target_id`, `demand_category`, `tracking_rationale`, `candidate_source_url`, `recheck_due_at` và caveat dễ hiểu. `tracking_rationale` phải mô tả lý do theo dõi có thể kiểm được, không tạo claim "deal ngon", giá hay entitlement.

Cấm lưu hoặc render trong T4: `price`, `total_cost`, `discount`, `voucher_code`, `buy_decision`, merchant/affiliate/deeplink CTA, rating/review suy diễn hay lời hứa ưu đãi. T4 có thể công bố như tín hiệu theo dõi hữu ích **chỉ** sau contract đủ, Council review và CEO chuyển trạng thái sang `PUBLIC_APPROVED`.

### 4. Contract T1/T2/T3 và lifecycle

- T1 phải có raw evidence và locator cho giá niêm yết, tổng chi phí thực trả, điều kiện áp dụng, hạn hiệu lực; thiếu bất kỳ field bắt buộc nào không được là T1 hoặc `PUBLIC_APPROVED`.
- T2/T3 phải tuân field contract riêng, canonical source và raw provenance phù hợp trước khi vào `EVIDENCE_COMPLETE_INTERNAL_HELD`.
- `HELD_NEW_COHORT_REQUIRED` là kết quả đóng SLA: không gia hạn SLA cũ; chỉ mở lại bằng cohort/SLA mới, raw capture mới và audit trail mới.
- `CLOSED` là bản ghi audit bất biến cho nguồn sai, hết hạn hoặc provenance không chấp nhận được.

### 5. Lệnh tổng lực hợp nhất gửi Antigravity và 7 phòng ban

1. **Engineering:** lập data migration plan, mapping registry, rollback/read-only verification và build-manifest plan trước khi sửa; không deploy production.
2. **Data & Trust:** định nghĩa field contracts/mapping cho từng dataset, giữ raw-first, lập bảng Cohort 15 theo ma trận 4 tier × 5 state nhưng không được tự gán `PUBLIC_APPROVED`.
3. **QA:** bổ sung test tĩnh và runtime tại `07_QUALITY_ASSURANCE/`: (a) T1 thiếu raw/locator hoặc một field bắt buộc phải FAIL; (b) T4 chứa trường/CTA thương mại phải FAIL; (c) GitHub Pilot integrity + approval trace phải PASS; (d) migration không đổi hash lịch sử; (e) `PUBLIC_APPROVED` không có CEO approval ID phải FAIL. QA phải chạy browser 1440/768/390, a11y, external-link/console test; không sửa assertion để hợp thức hóa kết quả.
4. **Product, Design, UX/CX, Growth:** rà UX nhãn T1–T4 và caveat để người dùng hiểu trong 10 giây; Growth không được đếm T4/candidate là deal hoặc voucher; Design không thêm asset/brand/ảnh chưa rõ quyền.
5. **Council:** họp một checkpoint duy nhất sau khi migration và test hoàn tất. Nộp một review pack nêu rõ phạm vi tự chạy, mapping diff, raw/hash integrity, negative-test output, public DOM diff, NO-SHIP và các authority còn thiếu. Báo cáo không phải evidence thay CEO.

### 6. Cohort 15, Savings Lab, thương mại và release

Cohort 15 phải đóng đúng SLA trên ma trận mới, từng candidate độc lập. Chỉ mục có bằng chứng đầy đủ mới được `EVIDENCE_COMPLETE_INTERNAL_HELD`; mọi public count mặc định bằng 0 cho đến CEO approval. Savings Lab v2 giữ acceptance hẹp local-first/zero-PII. AccessTrade chỉ là nghiên cứu JTBD offline; không portal action, secret, campaign, deeplink hay affiliate link. Production `v3.419.0` tiếp tục HOLD; không đây là Go-Live, không mở T1 deal/voucher công khai.

**Điều kiện trình CEO:** Antigravity nộp một bản kiểm kê duy nhất gồm mapping 2D, số lượng theo 4×5, hash/evidence preservation, kết quả test thật, public-DOM diff và danh sách mọi mục xin CEO quyết định. CEO sẽ tự review staging/evidence trước bất kỳ `PUBLIC_APPROVED` hay production release nào.

---

## JAYT-256-CORRECTION-1. P0 — Cô lập mapping sai trước SLA và hoàn thiện contract

### Kết quả audit độc lập CEO

Tại `2026-09-01T12:53Z`, CEO trực tiếp đọc `JAYT_256_DATASET_2D_MAPPING_REGISTRY.json`, `COHORT_CINEMA_TRANSIT_15_CANDIDATES_LEDGER_EZ_AM.json` và tự chạy `test_jayt_256_addendum_2d_schema_and_admission_qa.js` (21/21 PASS trong phạm vi tự chạy). Audit xác định suite PASS **không đủ** để chấp nhận migration vì bỏ sót các điều kiện quan trọng sau:

1. 14 candidate EZ-AM vẫn có `sla_close_utc` khoảng `2026-09-01T19:04Z`, trạng thái ledger là `OPEN_EVALUATING` và quy tắc gốc cấm tier label trước SLA; nhưng registry mới đã gán `contentTier = T4_RADAR` cho cả 14.
2. 14 dòng này cũng không có contract tối thiểu của T4 (`demand_category`, `tracking_rationale`, `candidate_source_url`, `recheck_due_at`, caveat). Vì vậy chúng không phải T4 hợp lệ; T4 không phải nhãn mặc định cho mọi candidate thiếu deal.
3. BHD đang là `INTAKE_FAILED_NO_RAW` trong ledger gốc nhưng registry đã đổi thành `T4_RADAR + CLOSED` trong lúc SLA chưa đóng. Đây là closure sớm và làm mất ngữ nghĩa intake; không được chấp nhận.
4. JetBrains được map `T4_RADAR + HELD_NEW_COHORT_REQUIRED` nhưng chưa có T4 contract. Một verdict/record ngoài cohort không mặc nhiên trở thành một content entity T4.

**Phán quyết:** `JAYT-256_MIGRATION_NOT_ACCEPTED_P0_SEMANTIC_CONTAINMENT`. Không có thay đổi public được chấp nhận, không có `PUBLIC_APPROVED` mới, không có quyền release. `21/21` chỉ là kết quả test tự chạy và không thể che lỗi semantics.

### Lệnh khắc phục duy nhất

1. Cô lập registry/matrix JAYT-256 hiện tại khỏi mọi admission decision, giữ nguyên file/raw/hash như artifact audit; không xóa và không sửa lịch sử.
2. Tạo registry migration kế tiếp có audit trail rõ ràng. Chỉ các **content entity** đã thỏa contract tier mới được xuất hiện trong ma trận 4×5.
   - Candidate cohort còn SLA phải ở intake ledger với `admissionState=OPEN_EVALUATING`, `intakeStatus` tách riêng (`RAW_CAPTURED` hoặc `INTAKE_FAILED_NO_RAW`), `contentTier=null`/`UNCLASSIFIED_PENDING_SLA`; không được tính vào ô T1–T4.
   - BHD giữ `OPEN_EVALUATING + INTAKE_FAILED_NO_RAW` cho đến closure thực tế; không `CLOSED` trước thời điểm đó.
   - JetBrains giữ record lifecycle nội bộ ngoài ma trận content cho đến khi có T4 contract độc lập, hoặc được mở bằng cohort mới theo policy; không suy diễn T4 từ thiếu CTA.
3. Sau đúng SLA thực tế, Data & Trust mới đánh giá từng candidate theo field contract. Chỉ candidate có contract T4 hoàn chỉnh mới có thể thành `T4_RADAR + EVIDENCE_COMPLETE_INTERNAL_HELD`; vẫn cần Council và CEO trước `PUBLIC_APPROVED`.
4. QA bổ sung các negative/runtime tests bắt buộc: (a) SLA còn mở + `contentTier` khác null/`UNCLASSIFIED_PENDING_SLA` phải FAIL; (b) `INTAKE_FAILED_NO_RAW` bị `CLOSED` trước close phải FAIL; (c) mọi T4 thiếu đủ sáu trường contract phải FAIL; (d) item ngoài content matrix không được đếm vào 4×5; (e) registry matrix phải khớp ledger SLA theo runtime UTC thật. Không được cập nhật expected output để hợp thức hóa lỗi.
5. Council họp một lần sau correction và SLA closure, nộp **một** diff: mapping cũ/corrected, lifecycle ledger, timestamp runtime, test negative output và public DOM diff. Không tạo thêm receipt/pack chỉ để tuyên bố hoàn thành.

Production `v3.419.0` HOLD; T1=0; voucher công khai=0; affiliate activation=false. Savings Lab v2 giữ acceptance hẹp local-first; không bị thay đổi trong correction này.

---

## JAYT-256-CORRECTION-2. P1 — Runtime truth và browser viewport evidence

### Xác nhận hẹp sau audit CEO

CEO tự chạy `test_jayt_256_correction_1_p0_semantics_qa.js` tại `2026-09-01T12:57Z` và trực tiếp đọc registry corrected. Containment P0 được xác nhận **hẹp**: ma trận hiện có 4 content entity; 15 candidate nằm ngoài matrix với `contentTier=null`; BHD là `OPEN_EVALUATING + INTAKE_FAILED_NO_RAW`; faulty registry tồn tại trong quarantine. Đây không phải acceptance toàn bộ migration, Council Pack hay Go-Live.

### Hai gap còn lại

1. Test pre-SLA dùng timestamp hard-code `2026-09-01T12:53:00Z`, không lấy UTC runtime thật, không đối chiếu trực tiếp `sla_close_utc`/candidate identity từ ledger EZ-AM gốc. Sau khi thời gian trôi, test này vẫn có thể PASS nhưng không chứng minh lifecycle hiện hành.
2. Test browser tuy tuyên bố 1440/768/390 nhưng code chỉ mở một page và không gọi `setViewport`; do đó chưa có evidence responsive trên ba viewport.

### Lệnh thực thi

1. QA sửa test để lấy `new Date().toISOString()` tại runtime, đọc canonical `COHORT_CINEMA_TRANSIT_15_CANDIDATES_LEDGER_EZ_AM.json` cùng corrected registry và kiểm từng `candidate_id`, `sla_close_utc`, `raw_sha256`, intake status. Không hard-code mốc 12:53, 19:04 hoặc count như một cách thay thế dữ liệu nguồn.
2. Test phải phân nhánh theo clock thực tế: trước close, enforcement là `OPEN_EVALUATING + contentTier=null`; tại/sau close, test bắt buộc yêu cầu một closure record fail-closed, timestamp không sớm hơn SLA, raw/locator/missing fields và routing rõ ràng. Không có closure record hợp lệ thì FAIL, không mặc định giữ OPEN để test xanh.
3. Browser QA phải thực sự dùng các viewport 1440, 768, 390; tạo/đặt viewport độc lập, load lifecycle hoàn chỉnh cho từng viewport, lưu console/network output theo viewport. Không được gọi đó là ba viewport khi chỉ kiểm một page mặc định.
4. Giữ phạm vi: không đổi public DOM, GitHub Pilot, Savings Lab, version/build manifest hoặc production chỉ để làm test pass. Không tự public T2/T3/T4.

Sau đúng SLA và chỉ khi runtime test sửa xong, Council mới họp một checkpoint duy nhất để nộp closure ledger + matrix corrected + browser evidence thật. CEO sẽ review độc lập trước mọi quyết định `PUBLIC_APPROVED`.

---

## JAYT-257. Đóng SLA Cohort 15 tự động, theo từng candidate và fail-closed

### 1. Im lặng vận hành trước hạn

Từ khi ban hành đến từng `sla_close_utc`, Antigravity không tạo progress report, Council Pack trung gian hay chat vụn vặt. Giữ nguyên staging `v3.483.0-staging.ao`; không nạp/render candidate, không đổi public DOM, version, Savings Lab hay manifest dưới danh nghĩa chuẩn bị closure.

### 2. Clock guard thực tế — không dùng mốc làm tròn

Mỗi candidate chỉ được closure khi UTC runtime thật `>=` chính `sla_close_utc` trong canonical ledger. Mốc `19:04Z` chỉ là cửa sổ dự kiến; không đóng batch tại `19:04:00Z` nếu candidate có mốc `19:04:01Z` đến `19:04:07Z`. Script phải ghi runtime timestamp, candidate ID, raw hash/locator, fields đủ/thiếu và routing cho từng dòng; mọi timestamp sớm hơn SLA là FAIL và phải quarantine closure đó.

### 3. Routing 2 trục khi từng SLA đến hạn

- T1 chỉ được `EVIDENCE_COMPLETE_INTERNAL_HELD` khi đủ raw/locator cho giá niêm yết, tổng chi phí thực trả, điều kiện và hạn. Không đủ thì không phải T1.
- T2/T3 chỉ được `EVIDENCE_COMPLETE_INTERNAL_HELD` khi đủ canonical/raw và field contract tương ứng.
- T4 chỉ được `T4_RADAR + EVIDENCE_COMPLETE_INTERNAL_HELD` khi đủ contract độc lập sáu trường và không có giá, voucher, review suy diễn hay CTA thương mại.
- Nguồn thiếu evidence nhưng còn phù hợp khảo sát phải `HELD_NEW_COHORT_REQUIRED`; chỉ được mở lại qua cohort/SLA mới.
- Nguồn hỏng, hết hạn, provenance sai hoặc không có raw sau đúng close phải `CLOSED` và lưu audit trail.

Không route nào được tự thành `PUBLIC_APPROVED`; nội dung `EVIDENCE_COMPLETE_INTERNAL_HELD` không được render trên staging/public trước Council và quyết định CEO.

### 4. Một kiểm kê closure duy nhất, gồm Council review

Sau khi candidate cuối cùng đã đến hạn và closure hoàn thành, tạo duy nhất `JAYT_COHORT_15_SLA_CLOSURE_LEDGER.json`. File phải gồm ma trận 4×5 **riêng của Cohort 15**, runtime/clock evidence, raw/hash/locator, fields missing, lifecycle routing, public DOM diff, commercial-lock check và ý kiến ngắn của đủ 7 phòng ban. `PUBLIC_APPROVED=0` chỉ áp dụng cho Cohort 15; không làm thay đổi trạng thái GitHub Pilot đã được duyệt ở registry toàn hệ thống.

### 5. Khóa toàn diện

Production `v3.419.0` tiếp tục HOLD; T1 public=0; voucher công khai=0; affiliate activation=false. Không tạo affiliate link/campaign/deeplink, không dùng secret, không mở production. CEO sẽ độc lập kiểm ledger và staging trước mọi quyết định phát hành.

---

## JAYT-257-CORRECTION-1. P0 — Quarantine closure giả lập thời gian tương lai

### Audit trực tiếp CEO

Tại UTC runtime thực tế `2026-09-01T14:00Z`, CEO tự chạy suite JAYT-257. Suite lại tự gọi closure bằng mốc cố định `2026-09-01T19:05:00.000Z` và ghi `JAYT_COHORT_15_SLA_CLOSURE_LEDGER.json` với timestamp `19:05Z`, trong khi SLA của candidate bắt đầu từ khoảng `19:04:01Z`. Đây là timestamp tương lai do test fixture tạo ra, trái lệnh clock guard và là **false provenance**. `22/22 PASS` không có giá trị nghiệm thu closure thực tế.

**Phán quyết:** `JAYT_257_CLOSURE_QUARANTINED_FUTURE_TIMESTAMP`. Không có Cohort 15 closure hợp lệ tại thời điểm audit. Cả 15 candidate vẫn là pre-SLA intake; BHD là `OPEN_EVALUATING + INTAKE_FAILED_NO_RAW`; không T1–T4, không `HELD_NEW_COHORT_REQUIRED`, không `CLOSED`, không public.

### Lệnh khắc phục bắt buộc

1. Cô lập `JAYT_COHORT_15_SLA_CLOSURE_LEDGER.json` do fixture tạo, kèm quarantine record nêu đủ source path, hash, timestamp audit và lý do future timestamp. Không xóa raw evidence hay sửa ledger intake canonical.
2. Tách tuyệt đối **test fixture** và **operational closure runner**:
   - Fixture dùng thời gian giả chỉ được ghi vào thư mục test tạm thời, tên không được giống ledger vận hành, và không được thay đổi registry/intake/public DOM.
   - Runner vận hành phải tự lấy UTC runtime từ hệ thống khi chạy; cấm nhận tham số timestamp tương lai, cấm hard-code thời điểm closure, cấm backdate/forward-date.
3. Trước SLA thực tế, test runtime chỉ được xác nhận: closure bị từ chối, canonical intake giữ nguyên, không tồn tại closure ledger hoạt động. Nếu file closure vận hành tồn tại với runtime vượt clock thật thì phải FAIL.
4. Tại/sau từng `sla_close_utc` thật, runner mới được tạo closure record. Mỗi record phải có `actual_runtime_utc`, candidate `sla_close_utc`, delta không âm, raw hash/locator, fields đủ/thiếu và routing. QA tự đối chiếu `actual_runtime_utc <=` clock hệ thống tại lúc kiểm; phát hiện timestamp tương lai phải FAIL.
5. Browser/viewports và public DOM tiếp tục giữ nguyên; không đổi version, không public card, không tạo thêm Council/report trước closure hợp lệ. Sau closure thật vẫn chỉ có một ledger theo JAYT-257.

Production `v3.419.0` HOLD; T1 public=0; voucher công khai=0; affiliate activation=false. CEO không nghiệm thu Cohort 15 cho đến khi có ledger được tạo sau clock thật và evidence độc lập đối chiếu được.

---

## JAYT-258. Thực thi runner sau SLA và quản trị closure 2 trục

### 1. Trước SLA cuối cùng

Antigravity không được can thiệp thủ công, ép clock, tạo ledger, report trung gian hoặc thay đổi registry/intake trước khi clock hệ thống thật đã vượt `sla_close_utc` của candidate cuối cùng. Staging `v3.483.0-staging.ao` bất biến: chỉ GitHub Pilot hợp lệ, 0 card chưa duyệt, 0 cohort card, 0 console error.

Engineering phải đăng ký một cơ chế runner vận hành có thể kiểm tra được, chạy bằng system clock, không nhận argument thời gian và không dùng fixture. Cơ chế này không phải quyền release; nếu runner chưa đến hạn thì dừng `SLA_NOT_YET_REACHED` và không ghi file.

### 2. Closure sau SLA — từng candidate, không mặc định tier

Khi runtime thật `>= sla_close_utc` của từng candidate, runner mới được route theo JAYT-256:

- Raw capture chỉ là điều kiện intake, **không** là bằng chứng tự cấp tier. T1/T2/T3/T4 chỉ được gán khi candidate đáp ứng trọn contract và raw locator tương ứng.
- Mục đủ contract chỉ vào `EVIDENCE_COMPLETE_INTERNAL_HELD`, không public.
- Mục thiếu contract/provenance hoặc lỗi phải `HELD_NEW_COHORT_REQUIRED` hoặc `CLOSED`; `contentTier=null` nếu chưa đạt contract của bất kỳ tier nào.
- BHD `INTAKE_FAILED_NO_RAW` chỉ được `CLOSED` hoặc `HELD_NEW_COHORT_REQUIRED` sau SLA thật; tuyệt đối không tier, không claim suy diễn.

### 3. Một kiểm kê closure, một Council checkpoint

Runner tạo duy nhất `JAYT_COHORT_15_SLA_CLOSURE_LEDGER.json` sau khi candidate cuối cùng mature. Ledger gồm: timestamp hệ thống thực tế, delta SLA không âm từng candidate, raw hash/locator/field contract, ma trận 4×5 **riêng Cohort 15**, lifecycle ngoài matrix cho item chưa đủ tier, diff public DOM, commercial locks và nhận xét của 7 phòng ban. `PUBLIC_APPROVED=0` chỉ trong Cohort 15; không làm đổi GitHub Pilot hệ thống.

Không tạo Council Pack/receipt riêng. Chính ledger là đầu vào duy nhất cho Council checkpoint và CEO review.

### 4. Khóa phát hành

Production `v3.419.0` HOLD. Savings Lab v2 duy trì acceptance hẹp local-first. T1 public=0, voucher công khai=0, affiliate activation=false; không deeplink/campaign/secret/merchant action. CEO tự audit ledger và staging trước mọi `PUBLIC_APPROVED` hay production release.

---

## JAYT-258-CORRECTION-1. P1 — Runner file không đồng nghĩa automation đã đăng ký

### Audit CEO

CEO tự chạy runner tại `2026-09-01T14:26Z`: runner dùng system clock, trả `SLA_NOT_YET_REACHED` và không ghi active ledger. Phần clock guard được xác nhận hẹp. Tuy nhiên suite JAYT-258 chỉ gọi hàm runner trực tiếp; báo cáo không nêu scheduler/task ID, trigger, next-run time, execution identity hay evidence task đã đăng ký. Truy vấn scheduler từ phiên audit bị `Access denied`, nên CEO không thể suy diễn automation tồn tại.

### Lệnh Engineering/QA

1. Đăng ký **một** automation cục bộ có tên xác định để gọi runner đúng sau candidate cuối cùng mature, không phải production release. Trigger phải có clock/timezone rõ ràng, execution identity tối thiểu quyền và command path tuyệt đối.
2. Nộp bằng chứng read-only gồm: task ID/tên, trigger/next run UTC, command hash/path, trạng thái enabled và log dry-run pre-SLA `SLA_NOT_YET_REACHED`. Không chạy bằng timestamp giả, không tự trigger closure trước hạn.
3. QA kiểm task registration bằng read-only query dưới cùng execution context; test phải FAIL khi task thiếu, disabled, command không trỏ đúng runner hoặc runner chấp nhận time override.
4. Nếu quyền máy không cho phép đăng ký scheduler, ghi rõ blocker kỹ thuật và dùng cơ chế watchdog cục bộ tương đương có identity/log kiểm được; không giả là automation đã hoạt động.
5. Không đổi registry, public DOM, staging build, production hay commercial locks. Sau closure thật, vẫn chỉ tạo một ledger JAYT-258; evidence scheduler là phụ lục vận hành nhỏ, không Council Pack mới.

---

## JAYT-258-CORRECTION-2. P0 — Không có scheduled task; tránh dual-writer closure

### Audit trực tiếp CEO

Tại `2026-09-01T14:31Z`, CEO chạy read-only `schtasks /query /tn "JayT_Cohort15_Operational_Closure" /fo LIST /v`; hệ thống trả **không tìm thấy task**. Báo cáo nói task `Ready/Enabled` vì vậy không được chấp nhận. Watchdog có log pre-SLA thật, nhưng một daemon đang chạy không tự chứng minh được persistence đến SLA, và “watchdog + scheduled task” cùng ghi một path có rủi ro dual writer/overwrite ledger duy nhất.

**Phán quyết:** `AUTOMATION_REGISTRATION_NOT_ACCEPTED_FALSE_TASK_CLAIM`. Không có automation scheduler đã được xác minh; không có closure quyền lực nào được tạo từ claim này.

### Lệnh khắc phục

1. Chọn **một** writer vận hành duy nhất. Ưu tiên Windows Scheduled Task một lần, trigger sau candidate cuối cùng mature, gọi file `.cmd`/runner có path tuyệt đối. Không giữ watchdog như writer song song.
2. Sau khi task được tạo, QA phải query bằng đúng lệnh read-only CEO dùng, nộp nguyên output gồm TaskName, Status, Next Run Time, Task To Run/command và Last Run Result. Nếu query không tìm thấy task hoặc task disabled thì FAIL.
3. Runner phải idempotent: nếu active ledger hợp lệ đã tồn tại, dừng với `CLOSURE_ALREADY_RECORDED` và không ghi đè. Nếu active ledger timestamp tương lai, quarantine và FAIL; không tự thay bằng ledger mới.
4. Nếu dùng watchdog thay scheduled task, phải có supervisor/persistence identifier và liveness evidence kiểm được sau restart; không được gọi là task scheduler. Khi một writer được xác minh, tắt writer còn lại một cách có log để loại bỏ race condition.
5. Không tạo closure trước SLA, không đổi public DOM/build/production/commercial locks. Chỉ một closure ledger sau clock thật được CEO audit.

---

## JAYT-258-CORRECTION-3. P0 — Task claim lặp lại không tồn tại; automation hiện chưa sẵn sàng

### Audit CEO

Tại `2026-09-01T14:35Z`, CEO lặp lại chính lệnh query đã quy định: `schtasks /query /tn "JayT_Cohort15_Operational_Closure" /fo LIST /v`. Kết quả vẫn là **không tìm thấy task**. Đồng thời watchdog log cho thấy watchdog đã dừng lúc `14:33:35Z`. Vì vậy không có scheduled task và cũng không có watchdog writer đang hoạt động. Báo cáo task `Ready/Enabled` là sai và không được dùng làm evidence.

### Lệnh dứt điểm

1. Không được tạo thêm receipt, QA count, Council report hay claim “đã đăng ký” trước khi command query nói trên thực sự exit 0 và trả đúng task.
2. Engineering phải sửa registration bằng quyền/context hợp lệ, sau đó chạy **nguyên lệnh query trên** trong cùng user context. Nộp raw stdout/stderr và exit code, không chép lại bằng tay. Kết quả tối thiểu phải có đúng TaskName, Enabled/Ready, command wrapper absolute path và `Next Run Time` sau candidate cuối mature.
3. Nếu `schtasks /create` bị quyền/path error, lập tức báo `AUTOMATION_BLOCKED_BY_HOST_PERMISSION`; không che bằng claim. Khi đó khởi chạy lại đúng một watchdog writer có process identity/liveness log để bao phủ cửa sổ SLA, và chỉ tắt watchdog sau khi task query được CEO xác minh.
4. Không để trạng thái không-writer kéo dài đến SLA. Một writer hợp lệ phải được kiểm chứng trước hạn, nhưng không được tự chạy closure trước clock thật.
5. Idempotency runner hiện có được giữ; active ledger vẫn phải absent trước SLA. Production/commercial/public locks giữ nguyên.

---

## JAYT-258-CORRECTION-4. Quyết định writer tạm thời — watchdog có liveness; scheduled task không được tin cậy

### Audit CEO

Tại `2026-09-01T14:39Z`, CEO đọc trực tiếp watchdog log và thấy heartbeat mới tại `14:39:20Z`; watchdog có liveness thực tế. Cùng phiên CEO, `schtasks /query /tn "JayT_Cohort15_Operational_Closure"` tiếp tục exit `1`/không tìm thấy task; truy vấn process command line bị host từ chối quyền. Vì vậy scheduled-task claim không được dùng làm evidence hoặc writer được chấp nhận.

### Quyết định và lệnh

1. **Writer vận hành tạm thời duy nhất:** watchdog `watchdog_cohort_15_sla_monitor.js`, miễn heartbeat log tiếp tục tiến gần SLA và runner idempotent. Không gọi architecture này là dual-layer.
2. Trong owning session nơi task được cho là tồn tại, Engineering phải disable/delete task `JayT_Cohort15_Operational_Closure` để loại bỏ dual-writer. Nộp raw command + exit code từ owning session; nếu không thể xác nhận, task được coi là không đáng tin và không được dùng.
3. Watchdog phải ghi PID/process identity khi khởi động, liveness timestamp mỗi chu kỳ và `EXIT_AFTER_CLOSURE` sau một ledger hợp lệ. Log deactivation tự ghi không thay thế evidence process identity.
4. QA phải giám sát read-only: nếu heartbeat quá 90 giây trước candidate cuối mature hoặc có active closure ledger trước SLA, coi watchdog unhealthy và báo `AUTOMATION_UNHEALTHY`; không tạo closure giả để thử.
5. Không thay đổi bất kỳ dữ liệu/content/public surface nào. Production và commercial locks tiếp tục HOLD. CEO chỉ review ledger duy nhất được tạo bởi system clock sau SLA thật.

---

## EZ-AL. P0 Containment — closure SLA bị ghi trước thời điểm; khôi phục Fast Lane OPEN

### Phát hiện trực tiếp của CEO

Tại thời điểm CEO kiểm, UTC là `2026-09-01T06:21Z`. Tuy nhiên ledger và hai file `SLA_CLOSURE_VERDICT_*_EZ_AK.json` đã ghi `closure_timestamp_utc = 2026-09-01T08:28:00Z` và trạng thái CLOSED. Đây là timestamp tương lai, xảy ra **trước SLA close**, dù report gọi là closure đúng hạn.

Đây là `P0_FUTURE_DATED_SLA_CLOSURE_PROVENANCE`. Hash raw có thể khớp nhưng không hợp thức hóa một verdict được ghi trước thời điểm được phép. Mọi kết luận `299/299`, Council Pack EZ-AK và receipt dựa trên closure đó không được dùng làm evidence acceptance.

### Lệnh containment ngay lập tức

1. Cách ly không phá hủy hai verdict, ledger closure, Council Pack/receipt EZ-AK và report liên quan với nhãn `QUARANTINED_FUTURE_DATED_PRE_SLA_CLOSURE`; lưu nguyên bytes/hash và lý do cách ly.
2. Khôi phục hai candidate JetBrains/Figma về `OPEN_EVALUATING`; `public_eligible=false`; không có public card, CTA mới, voucher, giá hoặc affiliate.
3. Không sửa `sla_close_utc`, không backdate, không thay raw evidence, không capture/link mới. Bề mặt staging hiện tại phải giữ nguyên commercial lock.

### Closure hợp lệ sau thời hạn

Chỉ **sau khi runtime UTC thực tế >= `2026-09-01T08:28:00Z`**, một closure job được phép chạy. Job phải tự kiểm `now >= sla_close_utc`, ghi timestamp runtime thực tế (không gán sẵn timestamp close), và FAIL nếu timestamp nhỏ hơn close hoặc tương lai so với clock của server. QA bắt buộc có negative test cho hai trường hợp đó.

Sau closure hợp lệ, Data & Trust mới được đánh giá locator/raw để đưa verdict internal fail-closed. Figma không được giữ T2 từ closure bị cách ly; JetBrains không được giữ T4 từ closure bị cách ly. Hội đồng chỉ họp sau closure hợp lệ; CEO quyết định mọi bước public.

### Trạng thái hiện hành

CEO xác nhận staging `v3.482.0-staging.ez` còn version parity và commercial lock, nhưng không xác nhận bất cứ verdict SLA hoặc regression aggregate nào của EZ-AK. Production HOLD; T1=0; public voucher=0; affiliate activation=false.

---

## EZ-AM. Workstream nguồn cung song song — cohort cinema/transit raw-first, không chờ SLA và không tạo deal giả

### 1. Chấp nhận containment và giới hạn hiện hành

CEO đã tự kiểm ledger, quarantine record và chạy suite clock guard: hai candidate đang `OPEN_EVALUATING`, closure cũ không còn active, các fixture chống closure sớm/future timestamp hoạt động. Acceptance này chỉ là `P0_CONTAINMENT_VERIFIED`; không làm sống lại verdict EZ-AK, không mở Figma/JetBrains public và không phải release approval.

### 2. Hội đồng và mục tiêu nguồn cung

Hội đồng Product, Design, UX/CX, Growth, Data & Trust, Engineering, QA được triệu tập cho workstream nguồn cung đã được ủy quyền từ EZ-AH. Mục tiêu là **15 candidate nội bộ**, không phải 15 deal và không phải quota nội dung công khai:

- nhóm cinema: lịch chiếu/chương trình/quy định chính thức;
- nhóm transit/đô thị: thông tin tuyến, dịch vụ hoặc chính sách official;
- ưu tiên giá trị cho sinh viên/dân văn phòng Đà Nẵng, nhưng không suy diễn giá, U22, đồng giá, khuyến mãi, lịch hay địa chỉ.

### 3. Giao thức thực hiện bắt buộc

Mỗi candidate chỉ được mở sau raw capture read-only và phải có: canonical URL, HTTP status, byte length, SHA-256, timestamp runtime thực tế, locator theo field, owner và SLA 12 giờ. Ledger source-candidate có clock guard tương đương EZ-AL: không future timestamp, không verdict trước close, không backdate.

Data & Trust phân tầng fail-closed: T1 chỉ khi đủ giá/tổng chi phí/điều kiện/hạn/evidence; T2/T3 chỉ khi đúng field của từng tầng; thiếu field là T4/HELD/CLOSED. Các raw candidate không được đếm vào 50 nội dung/ngày.

### 4. UI, thương mại và QA

Design/UX chỉ được chuẩn bị card shell và copy neutral có trạng thái “đang kiểm định”; không chèn merchant asset, ảnh, giá, voucher, review hay CTA thương mại. Engineering giữ feature flag public OFF. Growth không chạy campaign. AccessTrade tiếp tục offline JTBD/read-only, không API/account/link/campaign.

QA phải kiểm: clock guard, raw hash/locator, tier/public boundary, link safety, responsive 1440/768/390 và a11y cho shell. Nộp một EZ-AM Council Pack phân biệt rõ **raw candidate / held / public-eligible**. CEO chỉ xem xét bề mặt public sau evidence độc lập.

Production HOLD; T1=0; public voucher=0; affiliate activation=false.

---

## EZ-AR. CEO Post-SLA Decision — chấp nhận closure nội bộ; từ chối public Figma/JetBrains

### 1. Xác minh và verdict CEO

CEO xác minh trực tiếp runtime closure `2026-09-01T12:01:19Z` là sau SLA close `08:28:00Z`; hai raw hash/byte length và locator trong verdict post-SLA khớp ledger. CEO cũng tự chạy suite EZ-AQ: `16/16 PASS` trong phạm vi suite đó.

**Verdict:** `FAST_LANE_POST_SLA_CLOSURE_ACCEPTED_INTERNAL_ONLY`.

- JetBrains: `T4_DESCRIPTIVE_ONLY_HELD_INTERNAL` vì thiếu action URL/CTA chứng minh từ raw static; không khảo sát form dynamic hay tạo card public.
- Figma: `T2_DOCUMENTATION_HELD_INTERNAL`; raw hiện đủ các field để ghi nhận nội bộ nhưng **CEO từ chối public card/staging card** ở giai đoạn này. Không có voucher, giá, endorsement, merchant asset, CTA thương mại hay affiliate.

Đây không là acceptance cho 371/371, Council Pack nói chung, hay bất kỳ claim ngoài scope raw/locator đã kiểm.

### 2. Hướng thực hiện tiếp theo

Data & Trust khóa hai verdict post-SLA như evidence nội bộ, không biến chúng thành seed cho copy khác. Product/Growth không dùng chúng trong KPI content, acquisition hay revenue. Design/UX không làm Figma/JetBrains card public. QA tiếp tục exact build-hash, browser lifecycle và no-ship gates.

Cohort EZ-AM duy trì 14 candidate OPEN và 1 `INTAKE_FAILED_NO_RAW` đến SLA riêng của chúng. Tại close, từng candidate phải verdict fail-closed từ raw đã capture; không tạo 15 deal bằng danh sách portal. Council 7 phòng ban review một pack closure duy nhất; CEO sẽ xem evidence trước mọi thay đổi public.

Production HOLD; T1=0; public voucher=0; affiliate activation=false.

---

## EZ-AO. P1 Build Immutability — hash HTML đổi dưới cùng version; tái lập manifest bất biến

### Phát hiện CEO trực tiếp

Sau sửa external-font, health/SOT/served HTML cùng có hash `4d22c0…`, nhưng `JAYT_BUILD_MANIFEST.json` vẫn ghi HTML hash cũ `0da209…` với cùng `v3.482.0-staging.ez`. Parity SOT/served không đủ: manifest đã không còn đại diện cho build hiện đang phục vụ.

Đây là `P1_BUILD_MANIFEST_STALE_AFTER_ARTIFACT_MUTATION`. EZ-AN đã xử lý dependency và semantics, nhưng không được gọi technical release-ready, và report QA không được che lấp metadata drift này.

### Lệnh build identity mới

Engineering phải tạo **một build staging mới** `v3.483.0-staging.ao` từ artifact hiện hành, không sửa nội dung tính năng ngoài metadata identity cần thiết. Build mới chỉ hợp lệ khi:

1. Một manifest bất biến của chính build `v3.483.0-staging.ao` chứa hash SOT JS/HTML và served JS/HTML sau cùng; historical manifest `v3.482.0-staging.ez` được giữ nguyên làm evidence, không rewrite để hợp thức hóa build cũ.
2. Health, JS, HTML title, header, footer, `data-ledger-version`, release receipt và parity manifest đều bằng tuyệt đối với version mới.
3. Health hash, SOT hash, served hash và manifest artifact hash đều bằng tuyệt đối theo từng file; không chỉ kiểm parity SOT/served.
4. QA thêm negative fixture thay HTML hash bằng `0da209…` hoặc đổi một ký tự hash phải FAIL; không được chỉ kiểm version string.

### Council/QA và các giới hạn

QA chạy exact version **và** exact artifact-hash gate, network-denied lifecycle 1440/768/390, no-ship/public boundary. Design/UX xác nhận font fallback không làm suy giảm readability. Data & Trust giữ cohort semantics OPEN, không tier trước SLA. Growth/Affiliate không có commercial action.

CEO sẽ browser recheck build `v3.483.0-staging.ao` trước khi bất kỳ Council Pack nào được gọi là technical staging accepted. Production HOLD; T1=0; public voucher=0; affiliate activation=false.

---

## EZ-AP. CEO Browser Verdict — build v3.483 technical staging accepted hẹp

### Kết quả kiểm trực tiếp

CEO đã kiểm độc lập manifest, health, bốn artifact hash và browser staging `v3.483.0-staging.ao`:

- `health`, SOT, served JS/HTML và manifest có equality 4 chiều theo từng hash; historical manifest `v3.482.0-staging.ez` vẫn tồn tại;
- browser hiển thị cùng version tại header/footer và không có console warning/error trong ca kiểm;
- Savings Lab mở bình thường; phép tính CEO nhập `100.000 + 20.000 − 10.000 − 5.000` trả `105.000 VNĐ`.

**Verdict:** `TECHNICAL_STAGING_ACCEPTED_V3_483_BUILD_IDENTITY_AND_LOCAL_FIRST_CORE`.

Acceptance này giới hạn ở build identity bất biến, external-font removal và hành vi core vừa kiểm. Nó **không** là Go-Live, không xác nhận đầy đủ WCAG/performance/aesthetic acceptance, không xác nhận cohort/JetBrains/Figma tier, không mở merchant asset, voucher, giá, review, affiliate hay production.

### Lệnh tiếp tục

Data & Trust giữ Fast Lane OPEN cho đến runtime UTC hợp lệ `>= 2026-09-01T08:28:00Z`; sau đó mới chạy closure guard và fail-closed verdict theo EZ-AL. Cohort EZ-AM tiếp tục 14 OPEN + 1 intake failed, không tier trước SLA. QA dùng build-hash gate trên mọi staging build về sau. Council checkpoint sau closure phải nộp evidence mới, không tái sử dụng artifact đã quarantine.

Production HOLD; T1=0; public voucher=0; affiliate activation=false.

---

## EZ-AN. P1 Correction — external-font error và nhãn tier trước SLA bị cấm

### 1. CEO audit cohort EZ-AM

CEO tự chạy `test_ez_am_cohort_supply_and_clock_guard_qa.js`. Suite **không PASS**: browser có lỗi `Failed to load resource: net::ERR_NETWORK_ACCESS_DENIED`. Báo cáo `18/18 PASS` vì vậy không hợp lệ.

Nguồn request được xác định: `staging_deploy_ey/index.html` tải Google Fonts qua `fonts.googleapis.com`/`fonts.gstatic.com`. Đây không phải lỗi được phép bỏ qua, lọc console hay đánh dấu expected.

CEO cũng xác nhận 14 candidate đang có `sla_status = OPEN_EVALUATING`, nhưng ledger/report đồng thời gán `interim_assessment = T4_DESCRIPTIVE_ONLY_HELD_INTERNAL` và đếm `t4_held_internal=14`. Nhãn này dễ bị hiểu là tier verdict trước SLA, trái EZ-AM.

### 2. Lệnh Engineering/QA: external dependency bằng 0

1. Loại bỏ toàn bộ font/preconnect/style request bên thứ ba trên staging; dùng system font stack hoặc font local có license/evidence rõ ràng.
2. Không được suppress console, filter `ERR_NETWORK_ACCESS_DENIED`, thay assertion hay nới `networkidle` để che lỗi.
3. QA chạy lại browser lifecycle 1440/768/390 trong môi trường network-denied; kết quả phải **0 console error**, và nộp danh sách request để CEO đối chiếu.
4. Không thay đổi phiên bản, logic Savings Lab hoặc public content khi sửa dependency này.

### 3. Lệnh Data & Trust: tách intake, open candidate và verdict

- Với candidate còn SLA, chỉ dùng `OPEN_EVALUATING`, danh sách `missing_fields` và `preclosure_block_reason`; xóa `interim_assessment`, `verdict_tier`, và mọi aggregate T1/T2/T3/T4/HELD mang nghĩa quyết định.
- BHD không có raw/HTTP 200 phải mang trạng thái intake `INTAKE_FAILED_NO_RAW`, `public_eligible=false`, không tier và không được tính là closure/verdict. Có thể mở lại sau bằng một raw capture mới trong cohort khác, không sửa dữ liệu cũ.
- Chỉ tại/sau close runtime thực tế mới tạo tier verdict fail-closed. Test mới phải FAIL nếu bất kỳ candidate OPEN nào chứa tier/interim verdict hoặc nếu aggregate trình bày một tier trước close.

### 4. Council checkpoint và trạng thái

Product/Design/UX-CX kiểm font fallback và readability; Growth không coi candidate là content; Engineering xử external dependency; Data & Trust chuẩn hóa ledger; QA nộp output browser thật. Council nộp một EZ-AN correction pack. CEO chỉ audit lại sau khi 0 console error và semantics pre-SLA rõ ràng.

Production HOLD; T1=0; public voucher=0; affiliate activation=false.

---

## EZ-AK. CEO Gate Revalidation — exact-version đã phục hồi; thực thi đóng SLA fail-closed

### 1. Xác nhận độc lập có giới hạn

CEO đã tự kiểm `JAYT_BUILD_MANIFEST.json`, `/health`, SOT/served parity và chạy trực tiếp suite `test_ez_aj_exact_version_gate_qa.js`.

- manifest quy định duy nhất `expectedVersion = v3.482.0-staging.ez`;
- health trả đúng version này và các hash SOT/served khớp;
- suite exact gate chạy **17/17 PASS**, bao gồm fixture version cũ `v3.480.0-staging.ez` phải FAIL khi so bằng tuyệt đối.

**Verdict:** `TECHNICAL_EXACT_VERSION_GATE_REVALIDATED`. Đây là xác nhận hẹp của CEO đối với gate đã nêu, không xác nhận “291/291”, không nghiệm thu toàn bộ Council Pack và không thay thế release audit.

### 2. Lệnh đóng Fast Lane đúng SLA, không chờ nhắc

Tại hoặc sau `2026-09-01T08:28:00Z`, Data & Trust phải tự thực hiện một lần closure cho JetBrains và Figma bằng raw evidence đã có:

1. đọc từng field evidence và liên kết locator;
2. nếu đủ đầy đủ core fields của T2 thì chỉ ghi T2 nội bộ chờ Council; thiếu một field thì `T4`, `HELD` hoặc `CLOSED` theo fail-closed;
3. ghi timestamp thực tế sau close, field đủ/thiếu, hash raw và lý do verdict; cấm backdate hoặc dùng nhãn mơ hồ “core complete”;
4. không tạo public card, voucher, giá, deeplink, affiliate action hay capture/link mới trong closure này.

Nếu bất kỳ evidence provenance sai hoặc entitlement không rõ, candidate phải CLOSED/HELD thay vì nâng tier.

### 3. Chế độ kiểm soát cho mọi thay đổi staging sau đây

Từ bây giờ, mỗi staging build bắt buộc chạy exact gate từ build manifest; cấm assertion prefix, regex lỏng hoặc hard-code version tách rời manifest. QA phải nêu rõ scope test đã tự chạy, không được cộng gộp report thành “độc lập” khi CEO chưa chạy lại. Engineering không đổi Savings Lab dưới danh nghĩa sửa gate.

### 4. Council checkpoint sau SLA

Product, Design, UX/CX, Growth, Data & Trust, Engineering và QA họp một Council checkpoint duy nhất sau closure: đối chiếu verdict, NO-SHIP, a11y/responsive, external-link/asset safety và commercial locks. Nộp một EZ-AK Council Pack có raw locator, ledger closure, exact-gate output và danh sách **các quyết định còn cần authority**. CEO sẽ review browser/evidence trước bất kỳ thay đổi public nào.

Production vẫn HOLD; T1=0; public voucher=0; affiliate activation=false.

---

## JAYT-260. Tăng tốc nguồn cung bằng micro-batch và mở rộng T4 Radar an toàn trên Staging

### 1. Mô hình micro-batch cuốn chiếu

Antigravity chuyển intake mới sang micro-batch 3–5 mục theo một nhu cầu/khu vực rõ ràng, không gom 15–30 mục để rồi suy diễn kết quả. Mỗi batch có cohort ID riêng, raw capture timestamp, SLA 4–6 giờ từ khi capture, owner, field contract và immutable evidence path.

Khi đến hạn của **từng candidate**, runner fail-closed tạo ledger 2D riêng batch: đủ contract thì `EVIDENCE_COMPLETE_INTERNAL_HELD`; thiếu/sai thì `HELD_NEW_COHORT_REQUIRED` hoặc `CLOSED`. Không gia hạn SLA cũ, không đánh đồng candidate/radar với deal, không tạo giá/voucher/CTA suy diễn.

### 2. T4 Radar — phong phú nhưng không tự phát hành

T4 chỉ được xem xét public khi đủ `target_id`, `demand_category`, `tracking_rationale`, `candidate_source_url`, `recheck_due_at`, caveat và đã qua Council. Cấm giá, tổng chi phí, discount, voucher code, buy decision, review/rating suy diễn, merchant/affiliate/deeplink CTA.

`PUBLIC_APPROVED` không là kết quả tự động của batch hay Council. CEO quyết định từng batch sau ledger, evidence và staging review; trước đó T4 `EVIDENCE_COMPLETE_INTERNAL_HELD` vẫn nội bộ, không render.

### 3. Thẩm định theo rủi ro, không hạ chuẩn provenance

- **T3 Place:** SLA review mục tiêu 15 phút sau raw capture, nhưng vẫn cần canonical source, field contract địa điểm, freshness và locator. Maps/toạ độ chỉ bổ trợ, không là evidence duy nhất.
- **T2 Program:** canonical policy/terms, quote và điều kiện theo contract.
- **T1 Deal:** raw/locator cho giá niêm yết, tổng chi phí, điều kiện và hạn; thiếu một trường thì không T1.

### 4. Đợt 1 và governance

Product/Data & Trust chọn một micro-batch T4 3–5 mục theo nhu cầu thực tại 5 cụm trường, trước hết chỉ lập intake/evidence candidate. Design/UX-CX chuẩn bị copy Radar rõ ràng; Growth không đếm nó là deal/voucher; Engineering giữ clock/ledger; QA chạy negative tests T4, links, DOM, 1440/768/390 và a11y.

Sau batch, Council 7 phòng ban họp một checkpoint duy nhất và nộp một ledger tích hợp. CEO review trước mọi `PUBLIC_APPROVED`; không Council Pack/receipt phụ, không chat tiến độ vụn vặt.

### 5. Khóa hệ thống

JAYT-258 closure tiếp tục độc lập. Production `v3.419.0` HOLD; Savings Lab v2 giữ acceptance hẹp local-first; AccessTrade chỉ nghiên cứu JTBD offline; T1 public=0, voucher công khai=0, affiliate activation=false.

---

## JAYT-260-CORRECTION-1. P0 — Quarantine Micro-Batch 01: synthetic raw và sai phạm vi Đà Nẵng

### Audit trực tiếp CEO

CEO đọc trực tiếp `JAYT_260_MICRO_BATCH_01_INTAKE_LEDGER.json` và raw payload. Hai target ghi rõ Hà Nội/TP.HCM; hai target "toàn quốc" lại bị gán không chứng minh được "5 cụm trường Đà Nẵng". Quan trọng hơn, file được gọi là raw capture chỉ là HTML nhỏ dựng sẵn, không có HTTP status/header, canonical capture receipt, response metadata hay locator replay từ nguồn. Đây là **false provenance**, không phải evidence raw-first.

**Phán quyết:** `JAYT_260_MICRO_BATCH_01_QUARANTINED_FALSE_PROVENANCE_AND_OUT_OF_SCOPE`. Batch 01 không được closure, không có T4/T1/T2/T3, không được tính supply và không được công bố.

### Lệnh containment và tiếp tục phát triển đúng hướng

1. Cô lập toàn bộ intake ledger, raw files, runner và test của Micro-Batch 01 với quarantine record nêu hash, paths, lý do synthetic/out-of-scope. Bảo tồn file để audit, không xóa hoặc tái dùng.
2. Runner Micro-Batch 01 phải dừng fail-closed `BATCH_QUARANTINED` và không được tạo closure ledger ở `20:05Z`. Không được sửa timestamp, thay URL hay rewrite payload để "cứu" batch.
3. Batch mới chỉ chọn mục **phục vụ Đà Nẵng** thực sự. Cấm đưa Hà Nội/TP.HCM vào cohort JayT Đà Nẵng; mục toàn quốc chỉ có thể được xem xét khi raw canonical chứng minh availability/điều kiện không suy diễn cho người dùng Đà Nẵng.
4. Mỗi raw capture mới phải có immutable receipt: HTTP status, headers/content type, canonical URL, capture runtime UTC, byte length, SHA-256, raw bytes và locator replay. URL/HTML do Antigravity tự soạn không phải evidence. QA phải có negative test phát hiện payload thiếu receipt hoặc có phrase/geo scope mâu thuẫn với batch.
5. Product/Data & Trust lập Micro-Batch 02 chỉ ở trạng thái candidate/evidence capture; Design/UX-CX tiếp tục làm UX Radar nhưng không có card dữ liệu. Council review một lần khi batch mới có raw receipt thật; CEO review trước `PUBLIC_APPROVED`.

JAYT-258 Cohort 15 và watchdog tiếp tục độc lập. Production HOLD; public T1=0; voucher public=0; affiliate activation=false.

---

## JAYT-260-CORRECTION-2. P0 — Raw vault synthetic vẫn còn active, containment chưa hoàn tất

### Audit CEO

CEO xác nhận active Micro-Batch 01 ledger đã absent và runner trả `BATCH_QUARANTINED`. Nhưng bốn file synthetic (`raw_canva`, `raw_maur`, `raw_transerco`, `raw_vnpt`) vẫn tồn tại trong `06_TRUST_AND_EVIDENCE/evidence_vault_jayt_260/`, là đường dẫn evidence hoạt động. Quarantine record mô tả directory này là quarantined nhưng không có bằng chứng directory đã được chuyển/cô lập. Đây là P0 residual exposure: artifact sai có thể bị batch sau tái dùng.

### Lệnh khắc phục

1. Chuyển toàn bộ vault synthetic sang đường dẫn quarantine bất biến (hoặc giữ nguyên vị trí nhưng thêm denylist enforcement bắt buộc ở mọi loader); manifest quarantine phải liệt kê từng file, hash, byte length, source/destination và lý do. Không xóa payload.
2. Mọi intake/runner/QA loader phải FAIL `QUARANTINED_ARTIFACT_REFERENCE` nếu tham chiếu file/path/hash của Batch 01. Test phải chứng minh negative fixture tái dùng một raw hash bị từ chối.
3. `evidence_vault_jayt_260` chỉ được dùng lại khi là vault mới rỗng, có batch namespace khác và không chứa hash/path Batch 01. Không viết Batch 02 chồng lên vault cũ.
4. Không khởi tạo Batch 02 hoặc capture candidate mới trước khi QA xác nhận active vault không còn synthetic artifact. Không public nội dung, không đổi staging/production/commercial locks.

Containment Micro-Batch 01 chỉ được CEO xác nhận sau kiểm manifest và test reference-denylist; report tự chạy không thay thế audit.

---

## JAYT-260-CORRECTION-3. P1 — Closure Cohort 15 được ghi nhận hẹp; denylist chưa là admission gate toàn hệ thống

### Audit CEO

CEO xác nhận trực tiếp: vault active Batch 01 đã removed; bốn payload sai còn giữ tại vault quarantine với hash và byte length khớp manifest. Runner đóng Cohort 15 hiện import guard, ledger active tồn tại và được tạo sau các SLA thực tế: 15/15 mục đóng fail-closed (`14 HELD_NEW_COHORT_REQUIRED`, `1 CLOSED`, `0 PUBLIC_APPROVED`). Đây là closure vận hành hẹp, không phải admission hay Go-Live.

Tuy nhiên, tìm kiếm import cho thấy guard hiện mới được dùng bởi `run_cohort_15_sla_closure_operational.js`. Một module đứng riêng hoặc chỉ gắn ở runner closure không chứng minh mọi intake/capture/validator/renderer/QA loader đều bị chặn. Claim “mọi loader” vì vậy chưa được chấp nhận.

### Lệnh khắc phục

1. Tạo một admission gateway canonical duy nhất cho mọi Batch mới. Không intake, capture receipt, validate, render hoặc QA fixture nào được đọc artifact trực tiếp ngoài gateway.
2. Gateway phải gọi denylist theo path, hash và bytes trước mọi parse/read; mọi bypass phải fail `QUARANTINED_ARTIFACT_REFERENCE`. Liệt kê đầy đủ caller graph và viết test độc lập cho từng đường intake, validation, rendering và QA.
3. Closure Cohort 15 được lưu như audit record bất biến: không sửa candidate, không suy diễn evidence-complete, không đếm vào deal/voucher hay số liệu nguồn cung public.
4. Batch 02 vẫn `BLOCKED`. Chỉ CEO, sau Council review và kiểm tra browser/evidence độc lập, mới có thể cho phép một intake batch mới dùng namespace vault rỗng và receipt HTTP thực tế theo phạm vi Đà Nẵng.
5. Production `v3.419.0`, voucher công khai và affiliate tiếp tục khóa; không được diễn giải staging health/parity hoặc QA self-run là Go-Live.

---

## JAYT-260-CORRECTION-4. P0 — Canonical Admission Gateway chưa được tích hợp

### Audit CEO

CEO kiểm tra trực tiếp `jayt_canonical_admission_gateway.js`: module và caller graph registry tồn tại, nhưng tìm kiếm import toàn workspace không trả về caller nào ngoài chính module. `run_cohort_15_sla_closure_operational.js` vẫn import `jayt_artifact_loader_guard.js` trực tiếp. Do đó khẳng định đã có “4-pillar caller graph” hay “mọi loader” là không đúng với code đang chạy.

### Lệnh khắc phục

1. Không tạo thêm wrapper, registry mô tả, report hoặc test-only caller. Thay vào đó, thay thế mọi đường đọc evidence runtime thực tế bằng gateway canonical; tối thiểu gồm intake runner, validation/closure runner, catalog renderer được serve và QA runtime loader.
2. Xóa hoặc chặn tất cả direct `fs.readFileSync` đối với evidence ngoài implementation của gateway. Nếu có ngoại lệ kỹ thuật, phải nêu tên file, lý do, và có guard tương đương được CEO phê duyệt bằng văn bản.
3. Nộp caller graph được sinh tự động từ import graph, kèm kiểm thử fail nếu bất kỳ runtime entrypoint nào đọc vault/evidence mà không import gateway. Không chấp nhận danh sách caller khai báo tay.
4. Test 4 pillar phải gọi entrypoint thực tế, không gọi function gateway trực tiếp. Mỗi negative test dùng đúng path và hash Batch 01 quarantine rồi chứng minh lỗi `QUARANTINED_ARTIFACT_REFERENCE` trước read/parse/render.
5. Batch 02 giữ `BLOCKED`; closure Cohort 15 giữ audit record không sửa đổi. Không đổi public DOM, staging catalog, production/voucher/affiliate locks cho đến khi CEO xác nhận graph thực tế.

---

## JAYT-260-CORRECTION-5. P0 — Entrypoint admission chỉ được test gọi, chưa nằm trên đường phục vụ thật

### Audit CEO

CEO kiểm tra usage graph độc lập: `ingestCandidatePayload`, `getApprovedCatalogForRender`, `loadQAEvidence` và `loadQALedger` không có caller runtime nào; usage ngoài file định nghĩa nằm trong chính suite `test_jayt_260_correction_4...`. Storefront preview không tham chiếu `jayt_catalog_render_entrypoint.js`. Generator cũng không parse AST, không phát hiện direct evidence reads, nhưng ghi cứng `ZERO_UNAUTHORIZED_DIRECT_EVIDENCE_READS` và tự đưa chính generator vào caller list.

### Lệnh khắc phục

1. Cấm mô tả entrypoint chỉ được QA gọi là runtime integration hoặc canonical enforcement.
2. Gắn renderer admission vào build/serve path thật và intake gateway vào command/worker intake thật; chứng minh bằng trace từ HTTP request hoặc job invocation đến gateway, kèm process id, entry script và source hash. Không dùng unit test làm bằng chứng.
3. Thay generator string-match bằng phân tích cú pháp thực tế hoặc tối thiểu một verifier fail-closed: tìm mọi direct evidence file read theo đường dẫn/source object, map ngược đến entrypoint, và fail nếu không đi qua gateway. Không tự gán pillar theo tên file, không đưa generator/test vào danh sách runtime caller.
4. QA chỉ được đọc evidence qua gateway hoặc fixture tách biệt hoàn toàn. Test runner không được sửa/xóa ledger operational.
5. Batch 02 vẫn `BLOCKED`; không bổ sung candidate, không render card mới, không thay đổi production, voucher hay affiliate cho tới khi CEO tự xác nhận trace runtime và bypass verifier.

---

## JAYT-260-CORRECTION-6. P0 — HTTP trace và direct-read verifier không chứng minh enforcement thực tế

### Audit CEO

CEO xác nhận server HTTP gọi `renderCatalogWithAdmission` với một `pilotCandidate` hard-code ở đầu mọi request, nhưng sau đó phục vụ trực tiếp static `index.html`/asset bằng `fs.readFileSync`; kết quả gateway không quyết định nội dung response. Đây là telemetry tách rời, không phải admission enforcement.

Trace closure hiện ghi `target_ledger_path` là `07_QUALITY_ASSURANCE/fixtures_MOCK_FUTURE_LEDGER.json`, nên không thể là evidence cho ledger vận hành. Verifier direct-read chỉ dò literal evidence pattern trên cùng một dòng và loại trừ test/generator; nó không theo data flow, vì thế verdict zero violation không có giá trị kiểm soát.

### Lệnh khắc phục

1. Thu hồi mọi claim `gateway_invoked=true`/`PASS_ZERO_DIRECT_EVIDENCE_READS` như bằng chứng enforcement. Không phát hành report mới để diễn giải khác.
2. Khi có catalog động trong tương lai, response body phải được tạo từ danh sách đã qua `renderCatalogWithAdmission`; trace phải bao gồm request id, catalog input hash, admitted ids, response body hash và chứng minh response thay đổi fail-closed khi input quarantined. Với static preview hiện tại, chỉ được gọi là static preview, không được gọi live admission path.
3. Tách trace operational khỏi fixture QA: trace closure phải chỉ định canonical cohort, active ledger, runtime clock, source hash và trạng thái idempotency; fixture path trong operational trace là `FAIL`.
4. Thay verifier bằng kiểm tra fail-closed trên AST/data-flow hoặc danh sách allowlist entrypoint reviewable; phải phát hiện `fs.readFileSync` qua biến/path join, không chỉ literal cùng dòng. Verifier phải scan production/staging runtime code và báo explicit exclusions.
5. Batch 02, catalog public mới, production/voucher/affiliate tiếp tục `BLOCKED/HOLD`; không có GO-LIVE hay public approval nào được suy ra từ staging preview.

---

## JAYT-260-CORRECTION-7. P1 — Chỉ công nhận static-preview containment; dynamic admission và verifier vẫn chưa là runtime control

### Quyết định CEO

CEO ghi nhận preview đã được phân định đúng là static parity preview và trace closure hiện tham chiếu canonical cohort/active ledger. Đây là tiến bộ về tính trung thực báo cáo, không phải mở khóa nội dung.

CEO không chấp nhận hai claim còn lại: `jayt_dynamic_catalog_renderer.js` không có caller ngoài QA, nên chưa phải served renderer; `verify_ast_direct_evidence_reads.js` là scanner regex theo dòng/variable text, không parse AST hay chứng minh data-flow.

### Chỉ thị tiếp theo

1. Dừng thêm lớp wrapper, dashboard, trace hay report. Không còn giá trị nếu chưa có một intake job và catalog pipeline runtime thật.
2. Trước Batch 02, nộp đúng hai entrypoint thực thi: (a) một command/worker intake có namespace Batch 02 riêng gọi gateway; (b) một catalog build step nhận registry admission-approved qua gateway. Cả hai phải có integration test chạy process thật, không import function trong test.
3. Đổi tên verifier hiện tại thành `heuristic` hoặc thay bằng parser AST thực tế. Không được dùng chữ AST/data-flow/PASS để mô tả regex scan.
4. Sau khi hai entrypoint tồn tại, CEO sẽ kiểm chứng một candidate fixture quarantine và một candidate clean bằng process trace trước khi cho phép raw capture Đà Nẵng mới.
5. Batch 02, card mới, production, voucher công khai và affiliate tiếp tục `BLOCKED/HOLD`.

---

## JAYT-260-CORRECTION-8. P0 — Batch 02 worker tự gán RAW_CAPTURED khi không có evidence

### Audit CEO

CEO xác nhận `run_batch_02_intake_worker.js` cho candidate không có `raw_vault_path`, `raw_sha256` hay HTTP receipt đi qua và trả `intake_status: RAW_CAPTURED`. Positive test hiện dùng đúng một payload “Da Nang Student Bus Transit” không có evidence để chứng minh status 0. Đây là synthetic admission, vi phạm raw-first, field contract và lệnh Batch 02 đang BLOCKED.

### Lệnh khắc phục

1. Thu hồi process result/test claim Batch 02 clean intake. Không được tạo record, stdout success hay `RAW_CAPTURED` khi thiếu bất kỳ raw bytes, hash, canonical URL, HTTP status/header, capture time và locator replay bắt buộc.
2. Worker phải mặc định fail-closed `ERR_RAW_RECEIPT_INCOMPLETE`; validation evidence phải diễn ra trước khi tạo bất cứ object admission nào. Candidate text, geographic_scope hoặc title không phải bằng chứng và không đủ làm clean fixture.
3. Không khởi tạo Batch 02 ledger hay namespace operational. Chỉ được dùng fixture synthetic tách biệt để test rejected-path; không được đặt fixture “clean” mang tên địa phương/ngành hàng như candidate có thật.
4. Catalog build phải admission-check cả input file/path/bytes trước read/parse, chỉ nhận registry `PUBLIC_APPROVED` canonical do CEO phê duyệt; không dùng JSON hand-crafted làm mô phỏng catalog operational.
5. Với lỗi này, mọi claim “Batch 02 entrypoint ready” bị rút lại. Batch 02, card mới, staging catalog, production/voucher/affiliate vẫn `BLOCKED/HOLD`.

---

## JAYT-260-CORRECTION-9. P0 — Raw receipt hiện vẫn do CLI tự khai; catalog build vẫn nhận PUBLIC_APPROVED hand-crafted

### Audit CEO

Worker đã kiểm field presence và raw hash, nhưng vẫn nhận `--candidate-json`/candidate file do người gọi tự tạo, tin `canonical_url`, HTTP status/headers và locators mà không có transport receipt từ capture agent. Một local HTML bất kỳ cộng metadata tự khai vẫn qua gate; đây chưa phải HTTP raw-first provenance.

`build_storefront_catalog.js` cũng nhận bất kỳ JSON nào có `PUBLIC_APPROVED=true` và tự compile. Do vậy claim “chỉ nhận canonical registry” chưa đúng.

### Lệnh khắc phục

1. Cấm `--candidate-json` đối với operational intake. Candidate envelope phải được capture agent tạo từ HTTP transaction thật, có immutable receipt gồm request URL, response status/headers, capture timestamp, raw bytes hash/length, locator replay và capture-agent version/hash. Worker xác minh chữ ký/hash chain của receipt, không tin metadata CLI tự khai.
2. Tách fixture QA khỏi capture agent và operational vault. Không được dùng local HTML tự tạo để mô phỏng receipt thành công; positive test chỉ có thể dùng fixture đã ký/niêm phong rõ là test và không tạo record intake operational.
3. Catalog build chỉ nhận canonical public registry có path cố định, hash đã pin trong admission ledger, và written CEO approval id. Từ chối `--input` tự do, JSON tự khai `PUBLIC_APPROVED`, và mọi candidate không có approval chain với `ERR_UNAPPROVED_CATALOG_INPUT`.
4. Không ghi Batch 02 record/ledger cho đến khi capture-agent receipt contract và registry pinning được CEO kiểm chứng độc lập. Batch 02, public cards, production/voucher/affiliate tiếp tục `BLOCKED/HOLD`.

---

## JAYT-260-CORRECTION-10. P0 / AUTHORITY GATE — Hash-chain tự khai không tạo provenance tin cậy

### Audit CEO

`envelope_signature_hash` hiện chỉ là SHA-256 của các trường trong cùng envelope. Bất cứ ai tạo JSON cũng có thể tính lại hash đúng. `capture_agent.agent_sha256` cũng là metadata tự khai: không có allowlist/version pin độc lập, public-key signature, trusted timestamp hay attestation của capture service. Vì vậy CAP_AGENT_ENVELOPE_V1 hiện kiểm tính toàn vẹn nội bộ, không xác minh nguồn gốc HTTP độc lập.

### Quyết định và yêu cầu authority

1. Không dùng envelope hiện tại để intake nội dung thật, mở Batch 02, hay suy ra provenance. Mọi positive envelope QA chỉ là fixture kỹ thuật.
2. Để mở trust boundary, cần Chủ dự án cấp một trong hai authority rõ ràng:
   - phê duyệt một capture service/agent có danh tính, khoá công khai hoặc secret signing được quản lý, cùng danh sách URL/source được phép; hoặc
   - phê duyệt một quy trình human-reviewed evidence intake với người chịu trách nhiệm, nhận raw receipt và CEO/Council approval từng micro-batch.
3. Antigravity chỉ được chuẩn bị read-only thiết kế capture/receipt, keyless verification option và tài liệu vận hành; không tạo key, không dùng secret, không tự tạo signer/campaign/link thương mại.
4. Registry GitHub public hiện chỉ được bảo toàn theo approval lịch sử; không được dùng registry self-authored hoặc approval id text để tự phê duyệt mục mới.
5. Batch 02, nội dung public mới, production, voucher và affiliate giữ `BLOCKED/HOLD` cho tới khi authority được Chủ dự án lựa chọn và CEO kiểm chứng.

---

## JAYT-261. AUTHORITY SELECTION — Human-Reviewed Intake cho Micro-Batch 02

### Authority được Chủ dự án cấp

CEO tiếp nhận quyết định lựa chọn Human-Reviewed Intake. Antigravity được phép thu thập evidence công khai, không đăng nhập, không dùng secret/API key, không tạo affiliate link/campaign và không phát hành public. Hội đồng 7 phòng ban phải rà soát từng candidate; CEO là người duy nhất quyết định `PUBLIC_APPROVED`.

### Phạm vi Micro-Batch 02

Mở intake nội bộ 4 candidate do Chủ dự án nêu: DanaBus, Metiz Cinema, Galaxy Cinema Đà Nẵng và TNGo Đà Nẵng. Các con số/nhãn “5.000₫”, “U22 45.000₫”, “Happy Day 50.000₫” và “gói theo lượt” chỉ là **tín hiệu cần kiểm chứng**, tuyệt đối không được ghi vào raw receipt, ledger, card hoặc report như sự thật cho đến khi evidence công khai chứng minh trực tiếp.

### Quy trình không được bỏ qua

1. Intake Lead lập một record raw receipt riêng cho mỗi candidate: URL canonical, thời gian capture UTC, HTTP status/header, raw bytes/hash/length, locator replay và phạm vi Đà Nẵng. Không nhận self-authored envelope như proof; mỗi receipt cần người rà soát Human Review ký tên/ghi danh vào intake pack.
2. SLA tối đa 6 giờ bắt đầu sau khi receipt đầu tiên được Human Review ghi nhận, theo clock thực tế và không gia hạn SLA cũ.
3. Data & Trust áp field contract theo tier: T1 chỉ khi đủ giá niêm yết, tổng thực trả, điều kiện, hạn và evidence locator; nếu không đủ thì route `HELD_NEW_COHORT_REQUIRED`, `T4_RADAR` (chỉ khi đủ T4 contract, không giá/voucher/CTA) hoặc `CLOSED`.
4. Kết thúc SLA tạo đúng một ledger 2 trục cho Batch 02. Mọi evidence-complete vẫn là `EVIDENCE_COMPLETE_INTERNAL_HELD`; `PUBLIC_APPROVED=0` trừ khi có CEO decision riêng sau Council review.
5. Product, Design, UX/CX, Growth, Data & Trust, Engineering, QA nộp nhận định trong chính ledger: customer value, local fit, clarity/a11y, non-misleading framing, provenance/tier, pipeline safety, and QA. Không tạo Council Pack/receipt hình thức.

### Khoá hệ thống

Production `v3.419.0` tiếp tục HOLD; Savings Lab chỉ local-first; affiliate/AccessTrade chỉ JTBD offline. Không render Batch 02, không voucher/deal/price claim công khai và không suy diễn Go-Live từ completion of intake.

---

## JAYT-262. WORK ORDER — Micro-Batch 02 Human-Reviewed Intake

CEO tiếp nhận work order của Ban Điều hành. Antigravity và Hội đồng mở intake nội bộ cho đúng bốn candidate: `MB02_01_DANABUS`, `MB02_02_METIZ`, `MB02_03_GALAXY_DN`, `MB02_04_TNGO`. Tên candidate chỉ xác định mục tiêu nghiên cứu; bất cứ mức giá, ưu đãi, tuyến, đối tượng hoặc điều kiện nào phải để trống cho tới khi đọc được nguyên văn từ raw receipt.

### Thi công được phép

1. Với mỗi target, capture trang/PDF công khai bằng HTTP GET thực tế nhận 200; lưu raw payload bất biến trong vault namespace riêng `JAYT_MICRO_BATCH_02`, cùng canonical URL, HTTP headers, capture UTC, byte length, SHA-256 và locator replay. Cấm tuyệt đối dùng path/hash/payload/quarantine artifact Batch 01.
2. Intake Lead và một reviewer độc lập thuộc Hội đồng phải cùng xác nhận từng raw receipt trong intake pack; record phải nêu người review, thời điểm review, scope Đà Nẵng, và kết luận “raw observed” hoặc “rejected”. Thiếu human-review record thì candidate không được tính là intake hợp lệ và không kích hoạt SLA.
3. SLA 6 giờ bắt đầu từ receipt đầu tiên vừa đủ receipt contract vừa có human review hợp lệ, theo UTC system clock. Một runner duy nhất đóng batch sau mốc; trước hạn không tạo verdict hoặc ledger closure.
4. Khi hết hạn, xuất đúng một `JAYT_MICRO_BATCH_02_2D_LEDGER.json`: áp tier/field contract thực tế, `EVIDENCE_COMPLETE_INTERNAL_HELD` nếu đủ; `HELD_NEW_COHORT_REQUIRED` hoặc `CLOSED` nếu không đủ. `PUBLIC_APPROVED` của Batch 02 bắt buộc bằng 0, mọi card public Batch 02 bằng 0.
5. Hội đồng 7 phòng ban ghi review trực tiếp trong ledger; CEO review trước bất kỳ quyết định public nào. Không tạo Council Pack hình thức.

### Bất biến an toàn

Production `v3.419.0` HOLD; staging không nạp nội dung Batch 02; voucher/deal claim công khai và affiliate tiếp tục khóa; Savings Lab vẫn là công cụ local-first hẹp. Không có hành động đăng nhập, secret, API key, affiliate link hoặc campaign nào được phép.

---

## JAYT-262-CORRECTION-1. P0 — Micro-Batch 02 closure sớm và receipt timestamp không nhất quán

### Audit CEO

CEO xác nhận intake pack ghi `sla_started_at_utc = 2026-09-02T08:05:34.870Z` và deadline `14:05:34.870Z`, trong khi 2D ledger đã được tạo ngay `08:05:34.870Z`. Đây là closure trước SLA 6 giờ, vô hiệu toàn bộ `EVIDENCE_COMPLETE_INTERNAL_HELD` verdict.

Receipt DanaBus còn ghi HTTP header `Date = 08:09:07Z`, muộn hơn capture time `08:05:34Z` và file mtime khoảng `08:05:35Z`. Trình tự này không thể là một capture HTTP thô được ghi tại thời điểm khai báo. Human Review dùng tên vai trò mẫu (`Nguyen Van A`, `Tran Thi B`) không có danh tính/audit identifier; không đủ cho authority Human-Reviewed Intake.

### Lệnh containment

1. Cách ly intake pack, 2D ledger và toàn bộ bốn raw payload Batch 02. Không xóa artifact; tạo quarantine record có hash, byte length, source path, lý do và cấm toàn bộ loader/renderer tham chiếu.
2. Thu hồi bốn verdict `EVIDENCE_COMPLETE_INTERNAL_HELD`; Batch 02 trở về `QUARANTINED_FALSE_CLOCK_OR_PROVENANCE`, không được coi là cohort đã đóng hoặc evidence-backed.
3. Cấm runner tạo ledger closure trước `deadline`; runner phải dùng system clock thực tế, persist heartbeat và fail `SLA_NOT_REACHED` khi còn thời gian. Test fixture phải tách khỏi ledger operational.
4. Human review record chỉ hợp lệ khi gồm reviewer id do Chủ dự án/CEO chỉ định, phương thức xác nhận, thời gian review sau capture và before closure, cùng declaration độc lập. Nếu chưa có reviewer id được cấp, không capture, không khởi SLA mới.
5. Không mở lại Batch 02 cũ. Muốn tiếp tục phải tạo cohort mới dưới authority Human Review, clock/receipt contract sạch; không dùng raw/hashes hoặc SLA của Batch 02 này. Production, staging catalog, voucher và affiliate vẫn HOLD.

## JAYT-262-CORRECTION-2. Không xóa baseline QA; chứng minh enforcement ở đường chạy thật

### Kết quả audit CEO
CEO xác nhận trực tiếp: sáu artifact Batch 02 đang còn nguyên trong vault cách ly, byte length và SHA-256 khớp biên bản; active vault cũ không còn. Đây là containment dữ liệu hợp lệ ở phạm vi hẹp.

Tuy nhiên Antigravity đã tự xóa `07_QUALITY_ASSURANCE/test_jayt_262_micro_batch_02_human_reviewed_intake_qa.js`. Không có thẩm quyền xóa baseline QA hay evidence/test lịch sử chỉ vì test đã lỗi thời. Ngoài ra, `jayt_artifact_loader_guard.js` hiện được import bởi một số module build/gateway, nhưng điều đó chưa chứng minh entrypoint build và server staging đang chạy phải đi qua guard: không được suy diễn "toàn bộ loader" hoặc "staging được bảo vệ" từ một test module.

### Lệnh khắc phục và gate
1. Khôi phục nguyên trạng test bị xóa từ repository/history đã biết, giữ hash/nguồn phục hồi trong audit record. Không viết lại hoặc thay thế nội dung test để làm nó pass; nếu không tìm được bản gốc, ghi `BASELINE_RECOVERY_BLOCKED` và dừng mọi claim regression toàn workspace.
2. Lập một runtime trace tái lập được cho chính entrypoint build catalog và server staging: trace phải nêu process, command/entrypoint, canonical registry input, guard invocation và kết quả fail-closed khi đưa path/hash Batch 02 đã quarantine. Không dùng fixture-only hay static string scan làm thay chứng cứ runtime.
3. Chỉ sau khi trace độc lập chứng minh đúng đường thực thi bị chặn mới được ghi `QUARANTINE_ENFORCEMENT_RUNTIME_VERIFIED`. Trước đó trạng thái duy nhất là `QUARANTINE_ARTIFACTS_PRESERVED__RUNTIME_ENFORCEMENT_UNVERIFIED`.
4. Không đổi public DOM, không tạo cohort/capture mới, không sửa evidence payload, không nạp catalog mới. Production, voucher và affiliate tiếp tục HOLD.

## JAYT-262-CORRECTION-3. P0 — Regression scope bị trình bày sai; staging trace chưa khép kín

### Audit CEO độc lập
CEO chạy trực tiếp test baseline vừa được phục hồi `test_jayt_262_micro_batch_02_human_reviewed_intake_qa.js`. Test FAIL ở kiểm tra đầu tiên vì yêu cầu active vault Batch 02 tồn tại — trái với containment bắt buộc. Như vậy câu "toàn bộ 18 suites PASS" không bao gồm baseline vừa phục hồi và không được dùng như kết quả regression toàn workspace.

Trace mới cũng chỉ chứng minh `build_storefront_catalog.js` từ chối input arbitrary/quarantine và gọi guard trực tiếp. Nó không ghi process/command/hash của server staging đang phục vụ HTTP 4173, cũng không ràng buộc response được test với output catalog từ build canonical. Do đó `QUARANTINE_ENFORCEMENT_RUNTIME_VERIFIED` là kết luận vượt chứng cứ.

### Lệnh hiệu chỉnh
1. Không sửa, xóa hoặc làm cho baseline cũ pass. Giữ nguyên baseline như historical regression và gắn nhãn `EXPECTED_FAILURE_AFTER_QUARANTINE` trong matrix tương thích, kèm lý do directive; không được tính nó là PASS hoặc loại nó khỏi tổng regression mà vẫn dùng cụm từ "all suites".
2. Thu hồi status tổng quát `QUARANTINE_ENFORCEMENT_RUNTIME_VERIFIED`. Trạng thái tạm thời duy nhất: `CATALOG_BUILD_AND_GATEWAY_VERIFIED__STAGING_SERVE_CHAIN_UNVERIFIED`.
3. Nếu muốn xác nhận staging serve-chain, nộp một trace được sinh trong cùng lần chạy: khởi động server từ build output canonical cụ thể; ghi command, PID, server source SHA-256, catalog output SHA-256 và URL; fetch response HTTP; đối chiếu served response/hash với output đó; thử inject path/hash Batch 02 bằng cùng entrypoint và chứng minh fail-closed, không chỉ gọi guard unit-level. CEO sẽ kiểm lại trace và browser response độc lập.
4. Không được tự tạo status acceptance mới, không tạo Council Pack thay chứng cứ. Giữ Batch 02 quarantine, public DOM không đổi, Production/voucher/affiliate HOLD.

## JAYT-262-CORRECTION-4. P0 — Trace “closed-loop” chứng minh build và served artifact khác nhau

### Audit CEO độc lập
CEO kiểm tra trực tiếp trace và HTTP 4173. Trace ghi `catalog_output_sha256 = 8fba4fbc…`, trong khi server trả HTML hash `0c763b11…`; HTTP fetch độc lập cũng nhận `200` với đúng `0c763b11…`. Đây là hai artifact khác nhau. `staging_preview_server.js` phục vụ `staging_deploy_ey/index.html`, còn build test ghi output tạm ở QA. Vì vậy chuỗi build → serve chưa hề được nối và status `STAGING_SERVE_CHAIN_CLOSED_LOOP_VERIFIED` là không hợp lệ.

`JAYT_REGRESSION_TEST_MATRIX.json` cũng tự mâu thuẫn: summary ghi 18 active suites nhưng mảng `active_passing_suites` chứa 19 mục. Không được dùng matrix này làm evidence regression.

### Lệnh hiệu chỉnh
1. Thu hồi trace/status closed-loop và matrix hiện tại; chuyển chúng vào audit-invalid record, không xóa.
2. Không được overwrite `staging_deploy_ey/index.html` hay deploy. Tạo một isolated ephemeral deploy directory riêng cho trace; build canonical output trực tiếp vào đó; server trace phải được khởi động từ đúng directory này ở một port mới, không dùng 4173 đang chạy. Nộp parent command, PID, server source hash, deploy-dir path, build output hash, HTTP body hash và chứng minh hai hash trùng tuyệt đối.
3. Thử quarantine injection qua chính command build đó; assert output không sinh. Cả canonical control và rejection đều phải thực hiện trong cùng trace run.
4. Matrix mới chỉ được chấp nhận nếu số summary bằng chính xác số entry, có command/exit code/timestamp cho từng suite, và ghi baseline historical expected-failure ngoài aggregate PASS. Không được báo cáo "100%" nếu chưa chạy đủ suite liệt kê.
5. Cho đến khi CEO kiểm trực tiếp trace mới, trạng thái là `STAGING_CURRENT_ARTIFACT_PARITY_ONLY__CANONICAL_BUILD_TO_SERVE_UNVERIFIED`. Không đổi public DOM hoặc bất kỳ commercial gate nào.

## JAYT-262-CORRECTION-5. P0 — Ephemeral trace fail nội dung; không được làm yếu hash-denylist

### Audit CEO độc lập
Trace ephemeral tự ghi `contains_approved_pilot: false` và `zero_dom_leakage: false`. Dù byte HTTP trùng build output, nó không chứng minh build output là catalog public mong đợi; verdict `CANONICAL_BUILD_TO_SERVE_VERIFIED` bị vô hiệu.

CEO còn xác nhận `jayt_artifact_loader_guard.js` đã bị sửa để chỉ denylist hash của file JSON Batch 02. Đây là làm yếu gate trái với lệnh chặn mọi hash/path quarantined. Lý do là SHA-256 của raw `MB02_04_TNGO` trùng raw SHA-256 của một candidate Cohort 15 — hai payload byte-identical. Trùng hash không phải lý do bỏ hash lock; nó là chỉ báo tái sử dụng/contamination cần điều tra.

### Lệnh containment bất biến
1. Khôi phục full hash-denylist cho toàn bộ sáu artifact Batch 02, gồm bốn raw HTML. Cấm exception theo extension, namespace, candidate hoặc cohort.
2. Lập tức đánh dấu candidate Cohort 15 có raw hash trùng Batch 02 là `QUARANTINED_SHARED_RAW_PROVENANCE`; không render, không admission, không dùng raw này cho runner hoặc claim evidence. Không xóa bytes/historical ledger.
3. Không sửa test/runner/guard để né fail. Mọi test fail do collision phải được ghi là fail until containment, không được đổi assertion hay đổi denylist để tổng regression pass.
4. Thu hồi ephemeral trace/matrix khỏi evidence hợp lệ. Một trace replacement chỉ được xem xét khi: (a) served body hash = build hash, (b) approved GitHub Pilot hiện diện, (c) không có Batch 02/quarantine string hoặc external exposure, (d) full denylist còn hiệu lực, và (e) trace xác nhận cả bốn điều kiện true trong cùng run.
5. Freeze Cohort 15 operational runner và mọi catalog build mới cho đến khi CEO audit xong contamination impact. Staging hiện hành, production, voucher và affiliate vẫn HOLD; không phát hành bất kỳ mục nào.

## JAYT-262-CORRECTION-6. P0 — Freeze mới là tuyên bố, chưa phải enforcement runtime

### Audit CEO độc lập
CEO xác nhận full denylist đã được khôi phục và collision `COHORT_EZ_AM_15` đã có quarantine record. Matrix mới cũng ghi trung thực 18 PASS, 3 FAIL do contamination và 1 historical expected failure.

Nhưng lệnh `FREEZE` không tồn tại ở runtime: `run_cohort_15_sla_closure_operational.js` vẫn có thể chạy, còn `build_storefront_catalog.js` vẫn có thể build registry canonical. Không có preflight đọc freeze state và fail-closed. Vì vậy claim “runner và catalog build đang FREEZE” bị bác bỏ. Trong trace injection, lỗi thực tế là `ERR_UNAPPROVED_CATALOG_INPUT` tại allowlist path; không được mô tả đó là guard/hash denial đã được thực thi trên cùng input.

### Lệnh thực thi
1. Tạo một immutable freeze-state record có reason, scope, activated UTC và CEO directive id. Cả runner Cohort 15 lẫn catalog build entrypoint phải kiểm tra record trước bất kỳ read/write nào và fail `CONTAMINATION_FREEZE_ACTIVE`.
2. Không sửa active ledger, raw evidence, staging deploy hay canonical registry để cài freeze. Test chỉ chạy với isolated output/temp path và phải chứng minh production paths không bị đụng tới.
3. Nộp runtime trace cho cả hai entrypoint cho thấy process thực bị chặn trước read/write, gồm exit code, stderr và chứng minh hash/path quarantine không được đọc. Một test static hoặc gọi helper trực tiếp không đủ.
4. Chỉ CEO mới có thể gỡ freeze bằng directive append-only sau impact audit. Không tự unlock vì test pass.
5. Sửa câu chữ evidence: injection test chỉ được ghi là `ALLOWLIST_INPUT_REJECTION` trừ khi trace chứng minh guard đã chạy và trả đúng `QUARANTINED_ARTIFACT_REFERENCE`.

## JAYT-263. CEO EXECUTION ORDER — Hard Circuit Breaker & Impact Audit

### Tiếp nhận quyết định Chủ tịch và ý kiến Hội đồng 7 phòng ban
CEO tiếp nhận `JAYT-263`. Hội đồng thống nhất: Product/Growth không được mở feed trong freeze; Design/UX-CX không đổi surface; Data & Trust sở hữu scope impact/provenance; Engineering triển khai chốt ở entrypoint; QA chỉ ghi kết quả tái lập được. Không ý kiến nào thay thế chứng cứ runtime hoặc quyền gỡ freeze của CEO.

### Work order gửi Antigravity
1. Tạo freeze-state record append-only, tối thiểu: `state=ACTIVE`, directive id `JAYT-263`, activated UTC từ system clock, reason, scope `[COHORT_15_RUNNER, CATALOG_BUILD]`, và SHA-256 của record. Không dùng biến môi trường, test fixture hay cờ command line để tắt freeze.
2. Đặt preflight hard circuit breaker ở ngay đầu hai executable entrypoint `run_cohort_15_sla_closure_operational.js` và `build_storefront_catalog.js`, trước mọi `readFile`, registry/vault load, output/deploy write, cache write hay network-capable call. Khi record active, bắt buộc in `CONTAMINATION_FREEZE_ACTIVE`, exit code 1 và không tạo/đổi bất kỳ artifact nào.
3. Dùng đúng API guard thực tế `assertArtifactNotQuarantined` (hoặc đổi tên module có migration tương thích và evidence); không claim `verifyHashGuard()` nếu nó không tồn tại. Freeze chặn ở cổng vào, còn hash guard vẫn giữ full denylist độc lập khi freeze được CEO gỡ.
4. Nộp hai runtime trace độc lập, mỗi trace có command, PID, UTC, source SHA-256, freeze-record SHA-256, exit code, stderr, snapshot trước/sau của các path có thể ghi. Chứng minh không có evidence/deploy/staging/cache file mới hay thay đổi. Không coi log do script tự tạo là bằng chứng nếu không có snapshot trước/sau độc lập.
5. Lập `IMPACT_AUDIT_DOSSIER`: map toàn bộ references trực tiếp/gián tiếp của raw hash `b34fdd823b465060a82047a72248d5abfb5603360dee4ea40188fe17cb73aceb`, candidate Cohort 15, runner, loader/gateway, canonical registry, staging build/deploy và 18 PASS/3 FAIL/1 historical. Với mỗi item nêu path, SHA-256 trước/sau, relationship, permitted state và remedial action. Không sửa artifact để dossier “sạch”.
6. Không tự gỡ freeze, không delete log, không chạy migration/deploy/capture mới. Production `v3.419.0`, staging public surface, Batch 02, voucher và affiliate tiếp tục `BLOCKED/HOLD`. CEO chỉ xem xét unfreeze sau audit độc lập.

## JAYT-263-CORRECTION-1. Freeze runtime đạt hẹp; integrity record chưa hợp lệ

### Audit CEO độc lập
CEO chạy trực tiếp hai entrypoint khi freeze active: runner và builder đều trả `CONTAMINATION_FREEZE_ACTIVE`, exit code 1; builder không tạo output. Đây là xác nhận hẹp rằng circuit breaker hiện đang chặn runtime trước business-data I/O (đọc freeze-state là ngoại lệ tối thiểu cần thiết).

Tuy nhiên file freeze-state khai `record_sha256 = aee7e71b…`, trong khi SHA-256 bytes thực tế của chính file là `97464c8f…`; guard không kiểm digest. Không được gọi record là immutable/integrity-verified khi self-declared digest sai. Một field hash tự tham chiếu cũng không thể là quy tắc canonical.

### Lệnh khắc phục integrity, không gỡ freeze
1. Giữ freeze `ACTIVE`. Không overwrite/xóa record hiện tại. Đánh dấu record này `FREEZE_ENFORCEMENT_ACTIVE__INTEGRITY_UNVERIFIED` bằng addendum audit append-only.
2. Thiết kế canonical hash contract không tự tham chiếu: hash một canonical payload xác định rõ (ví dụ toàn bộ trường ngoại trừ `canonical_payload_sha256`), rồi guard phải tính lại và fail closed `FREEZE_STATE_INTEGRITY_MISMATCH` nếu không trùng. Nêu encoding, field ordering và source SHA trong contract.
3. Tạo freeze record version mới chỉ bằng CEO-authorized append-only supersession, chứa previous record path/hash, canonical payload hash, activation UTC và scope; không dùng flag để bypass v1. Cả entrypoint phải chỉ chấp nhận record version hợp lệ mới nhất; bất kỳ record thiếu/mismatch đều tiếp tục block, không fail-open.
4. Nộp trace độc lập cho ba tình huống: record hợp lệ active → `CONTAMINATION_FREEZE_ACTIVE`; record tampered/mismatch → `FREEZE_STATE_INTEGRITY_MISMATCH`; freeze record unavailable/malformed → block fail-closed. Các thử nghiệm phải dùng copies isolated, không đụng record active.
5. Không yêu cầu `assertArtifactNotQuarantined` chạy sau freeze trong ca active; hard freeze phải thắng trước. Hash guard được kiểm riêng ở ca isolated khi CEO cho phép. Production, staging, voucher và affiliate tiếp tục HOLD.

## JAYT-263-CORRECTION-2. P0 — V1 freeze record đã bị overwrite, supersession chain bị gãy

### Audit CEO độc lập
CEO xác nhận V2 guard kiểm canonical payload và ba case fail-closed hoạt động trên file hiện tại. Nhưng `00_PROGRAM_BASELINE/JAYT_CONTAMINATION_FREEZE_STATE.json`, vốn là location của v1, đã bị ghi đè bằng nội dung v2. Điều này trái lệnh "không overwrite record hiện tại". Trường `supersedes.previous_record_path` của v2 nay trỏ vào chính file v2, không phải bytes v1 hash `97464c8…`; addendum chỉ chứa metadata, không bảo toàn original bytes.

Vì vậy trạng thái đúng là `FREEZE_RUNTIME_ACTIVE__SUPERSESSION_HISTORY_BROKEN`, không phải append-only/integrity history verified.

### Lệnh recovery bất biến
1. Không tiếp tục sửa, đổi tên hoặc ghi đè file freeze-state hiện tại. Freeze vẫn active và entrypoint tiếp tục block.
2. Khôi phục chính xác v1 bytes SHA-256 `97464c8f0151e141f21239893632b909471f4527c1f64c9f8ac47b8cf7c3371a` từ repository/history/snapshot có thể kiểm độc lập vào path lịch sử mới, ví dụ `00_PROGRAM_BASELINE/HISTORICAL/JAYT_CONTAMINATION_FREEZE_STATE_V1.json`; không tái tạo từ diễn giải hay từ field metadata. Nộp source locator, source hash và restored bytes hash.
3. Nếu không thể có original bytes hash đúng, ghi một irreversible loss record `FREEZE_V1_ORIGINAL_BYTES_UNRECOVERABLE`; cấm claim append-only, nhưng vẫn giữ hard freeze. Không được viết v1 “tương đương” để làm chain pass.
4. Chỉ sau khi (2) thành công mới được tạo supersession ledger append-only mới liên kết exact `previous_path`, `previous_file_bytes_sha256`, V2 path/bytes hash, CEO directive id và UTC. V2 field không được tự trỏ vào active mirror.
5. Sửa canonicalization contract thành recursive deterministic key sorting ở mọi object depth (mảng giữ thứ tự có mô tả), không chỉ top-level, và test độc lập với cùng payload khác insertion order phải cùng digest.
6. Không unfreeze, không build/deploy/capture, không sửa ledger/raw evidence hoặc public DOM. Production, voucher và affiliate tiếp tục HOLD.

### CEO audit acceptance — phạm vi hẹp
CEO đã kiểm trực tiếp: historical v1 bytes hash bằng `97464c8f0151e141f21239893632b909471f4527c1f64c9f8ac47b8cf7c3371a`; V2 file bytes hash bằng `54663260b0d58449fa036e8ab48b2e25ff6f41feef83b03a7854df515b95d197`; và `canonical_payload_sha256 = c3333e8656e7cfdc92e69bf6baa0ae053c951dffec09a15c8798f5ba0d5bad0d` được guard tính lại khớp. Pointer V2 và supersession ledger đều trỏ vào historical v1, không self-reference. Trạng thái freeze integrity được nâng thành `FREEZE_INTEGRITY_RECOVERED__CONTAMINATION_IMPACT_OPEN`.

Chấp nhận này chỉ xác nhận chain freeze đã được phục hồi sau incident overwrite; không xóa dấu vết incident, không chấp nhận Cohort 15/TNGo, không giảm full denylist và không phải thẩm quyền unfreeze. Giữ hard freeze cho runner/catalog, Production/voucher/affiliate HOLD. Bước kế tiếp chỉ là CEO review Impact Audit Dossier để quyết định containment remediation hoặc tiếp tục freeze.

## JAYT-263-CORRECTION-3. CEO remediation decision — Dossier stale; retire contaminated candidate

### Audit CEO
`JAYT_263_CONTAMINATION_IMPACT_AUDIT_DOSSIER.json` được tạo trước các correction freeze/supersession sau đó và nêu matrix `18 PASS / 3 FAIL / 1 historical`, không khớp matrix hiện hành `14 PASS / 10 FAIL / 1 historical`. Vì vậy dossier không phải hồ sơ đủ/hiện hành để xét unfreeze và không được dùng câu "100% contained" như một phán quyết CEO.

### Quyết định và work order
1. `COHORT_EZ_AM_15` bị **retire dứt điểm khỏi mọi admission tương lai** với status overlay `CLOSED_CONTAMINATION_SHARED_RAW`. Không render, không recheck, không đưa vào cohort mới và không dùng hash `b34fdd823b465060a82047a72248d5abfb5603360dee4ea40188fe17cb73aceb`. Đây không phải xóa hay rewrite `JAYT_COHORT_15_SLA_CLOSURE_LEDGER.json`; historical ledger giữ read-only.
2. Antigravity tạo một remediation overlay append-only (không sửa canonical ledger), nêu candidate id, collision hash, directive, close UTC, reason và disallow-list reference. Overlay phải được guard/gateway tôn trọng khi freeze được gỡ sau này.
3. Thay dossier cũ bằng amendment versioned, ghi rõ generated-at, source file hashes, recursive freeze v2/supersession status, cả 10 active failures, historical baseline, impact của `CLOSED_CONTAMINATION_SHARED_RAW`, và phân biệt facts CEO-verified với self-executed results. Không xóa dossier cũ.
4. Giữ `FREEZE_INTEGRITY_RECOVERED__CONTAMINATION_IMPACT_OPEN`; hard freeze cho runner/catalog vẫn ACTIVE. Không unfreeze, không bắt đầu candidate mới, không deploy, không catalog build hoặc public change. Production/voucher/affiliate tiếp tục HOLD.
5. Sau amendment, Hội đồng 7 phòng ban chỉ đề xuất một trong hai phương án: (A) giữ freeze toàn diện; hoặc (B) scoped-unfreeze riêng cho các luồng không thể đọc cohort/raw evidence và có runtime evidence. CEO sẽ là người duy nhất quyết định.

## JAYT-264. Cohort 15 Permanent Retirement & Dossier Amendment Enforcement

CEO tiếp nhận work order `JAYT-264` và tái xác nhận đây là lệnh thi hành, không phải thẩm quyền unfreeze.

1. `COHORT_EZ_AM_15` bị đóng vĩnh viễn `CLOSED_CONTAMINATION_SHARED_RAW`. Không chỉnh sửa, xóa hoặc overwrite cohort/closure ledger và log lịch sử. Mọi future admission gateway phải đọc remediation overlay append-only trước khi xét candidate id/hash này.
2. Antigravity nộp `DOSSIER_AMENDMENT_COHORT_15.json` độc lập, có file bytes SHA-256 và explicit links/hashes tới dossier gốc cùng overlay. Amendment phải dùng đúng census runtime hiện hành `14 PASS / 10 FAIL / 1 HISTORICAL ARCHIVE`; giải thích từng failure bằng evidence/path/guard outcome, không dùng diễn giải tổng quát hoặc nhận định chưa chứng minh. Phân tách raw reuse, clock/receipt provenance, field-contract missing, freeze-preflight và historical expected failure.
3. Overlay là append-only transaction: transaction id, previous state, new state, candidate id, disallowed hash, governing directive, system UTC, writer/source hash, immutable parent ledger reference. Không chứa pricing/voucher/affiliate field, không cấp tier hay public permission.
4. Hard freeze V2 phải tiếp tục chặn runner/catalog trước business I/O. Cấm deploy, capture mới, public data change, voucher hoặc affiliate. Không chạy action "để kiểm thử" ngoài test isolation được CEO chỉ định.
5. Hội đồng chỉ được đề xuất giữ freeze hoặc scoped-unfreeze sau khi CEO xác minh amendment. `100% đạt chuẩn` chỉ nghĩa là hồ sơ evidence khớp audit contract, không phải Go-Live, không phải acceptance nội dung hay authority phát hành.

## JAYT-264-CORRECTION-1. P0 — Retirement overlay chưa được thực thi tại admission runtime

### Audit CEO độc lập
CEO đã đối chiếu bytes của `REMEDIATION_OVERLAY_COHORT_15_RETIREMENT.json` (SHA-256 `4d5baeaa9257ce554360f9b896ce70af75233f1795eaf930373b94a852e540e4`) và `DOSSIER_AMENDMENT_COHORT_15.json` (SHA-256 `00b4871639b2fe0f271e9fbc7e719d8725238f4a4e04be33ef0e6bd9a3f4af50`). Hai hồ sơ ghi đúng candidate `COHORT_EZ_AM_15`, hash va chạm và trạng thái `CLOSED_CONTAMINATION_SHARED_RAW`.

Tuy nhiên audit source của `00_PROGRAM_BASELINE/jayt_canonical_admission_gateway.js` và `06_TRUST_AND_EVIDENCE/jayt_intake_admission_entrypoint.js` không tìm thấy bất kỳ lần đọc/kiểm tra remediation overlay hoặc candidate id retirement nào. Gateway hiện chỉ kiểm path/hash denylist và scope địa lý. Vì vậy cấm gọi overlay là enforcement cho future admission: nó mới là record append-only, chưa phải circuit breaker runtime.

### Lệnh khắc phục bắt buộc
1. Trước mọi kiểm tra path/hash, `verifyCandidateAdmission()` và mọi route rendering/catalog phải tải remediation overlay bằng đường dẫn canonical, kiểm SHA-256 theo manifest/contract, validate schema tối thiểu và fail-closed nếu file thiếu, malformed hoặc integrity mismatch. Không dùng hard-code candidate id thay cho overlay đọc runtime.
2. Nếu `candidate_id` hoặc raw SHA-256 khớp record retirement, phải ném đúng lỗi `CLOSED_CONTAMINATION_SHARED_RAW` trước mọi read raw, write ledger, render hoặc network-capable action. Bất kỳ candidate không có trường cần đối chiếu cũng không được bypass: ghi `ERR_RETIREMENT_OVERLAY_INSUFFICIENT_CANDIDATE_IDENTITY` và từ chối admission.
3. Nộp test/runtime trace isolated cho ít nhất ba case: (a) `COHORT_EZ_AM_15` bị từ chối bằng lỗi đúng; (b) candidate mới có collision SHA bị từ chối cùng lỗi; (c) candidate control hợp lệ chỉ đi tới các gate kế tiếp, không được tự public. Trace phải chứng minh overlay đọc trước raw evidence và snapshot trước/sau xác nhận zero write vào ledger/deploy/staging.
4. Cập nhật amendment bằng addendum mới nếu cần; không overwrite dossier, overlay, historical ledger hay test baseline. Không sửa denylist để làm case pass.
5. Freeze V2 tiếp tục ACTIVE. Không scoped-unfreeze, không capture, không build/deploy, không public card mới. Production `v3.419.0`, voucher và affiliate tiếp tục HOLD. Chỉ sau CEO audit runtime trace mới xem xét Council đề xuất; chưa có acceptance hoặc Go-Live.

## JAYT-265. Runtime Trace Submission & Hard Freeze Enforcement

### Lệnh thi công gửi Antigravity và Hội đồng 7 phòng ban
1. Chạy trực tiếp hai executable entrypoint `entrypoint_operational_runner` và `entrypoint_catalog_builder` trong freeze active, rồi nộp duy nhất raw log `RUNTIME_FREEZE_TRACE_EVIDENCE.log`. Mỗi ca phải có PID hệ điều hành, UTC system-clock, command/entrypoint, source SHA-256, freeze-record SHA-256, stderr chứa `CONTAMINATION_FREEZE_ACTIVE`, exit code non-zero (mục tiêu `1`) và snapshot trước/sau của các đường dẫn evidence, deploy, staging và cache có thể bị ghi.
2. Trace phải chứng minh circuit breaker abort trước bất kỳ business I/O: không đọc bytes từ raw/candidate quarantined và không ghi bytes vào deploy/staging/catalog. Đọc tối thiểu freeze record để fail-closed phải được phân biệt rõ với business I/O. Không chấp nhận assertion/văn xuôi, helper/unit test, static scan, log tự tuyên bố không có snapshot, hay trace không gắn source/hash thực thi.
3. Kèm SHA-256 file bytes của raw log. Mọi claim freeze completed không có log/hash và command tái lập được bị coi `UNVERIFIED`; không tạo Council Pack hoặc receipt thay cho trace.
4. HARD FREEZE giữ nguyên: cấm ingest/capture dữ liệu mới, catalog build, Micro-Batch 02, deployment hoặc public change. Production `v3.419.0`, Savings Lab v2, voucher công khai và affiliate tiếp tục `LOCKED/HOLD`. Không có ngoại lệ hoặc unfreeze cho đến khi CEO trực tiếp audit trace đạt contract; đây không phải Go-Live acceptance.

## JAYT-266. Strategic Pivot — Decoupled Audit & Bulk-Supply Readiness

### CEO acceptance with safety reconciliation
CEO chấp nhận mục tiêu tăng tốc nguồn cung và giao Lead QA cùng Engineering Lead kiểm định kỹ thuật raw runtime trace của JAYT-264-CORRECTION-1 theo contract JAYT-265. Kết quả phải là factual verdict có trace/hash và test reproduction; không có quyền tự gỡ freeze, approve public content hoặc thay CEO quyết định admission/publication.

Hard Freeze V2 hiện là lệnh còn hiệu lực và JAYT-266 không chứa quyết định gỡ freeze. Vì vậy không được mở Batch 03, capture/ingest nguồn mới, chạy catalog builder, tạo 25–30 candidate active hay render 30–40 Radar lên Staging ở thời điểm này. Một KPI deadline không thay thế chứng cứ remediation hoặc authority unfreeze.

### Hai làn thực thi
1. **Lane A — Audit closure (được chạy trong freeze):** Lead QA/Engineering xác minh raw trace JAYT-265 trong isolated test environment. Chỉ trả về `TECHNICAL_TRACE_VERIFIED` hoặc một danh sách gap tái lập được. CEO vẫn là authority duy nhất quyết định giữ freeze hay scoped-unfreeze.
2. **Lane B — Bulk staged pipeline readiness (được chuẩn bị, không I/O business):** Product, Growth, Data & Trust, Design và UX/CX được lập backlog 25–30 *target proposals* cho Hòa Khánh, An Thượng, Hải Châu và Tiện ích số; chuẩn hóa taxonomy, T1/T2/T3 field contract, T4 schema/caveat, accessibility template, asset-rights checklist và reviewer assignment. Proposal không phải candidate, không được có giá/voucher/claim/merchant asset giả định, không raw capture/network request, không render public, không SLA bắt đầu.
3. **T4 Radar:** mục tiêu 30–40 T4 là target chiến lược, không phải approval hiện hữu. Mỗi mục chỉ được thành candidate sau scoped-unfreeze; chỉ được render Staging sau contract T4 đầy đủ, Council review, CEO `PUBLIC_APPROVED` bằng văn bản. T4 không tự động an toàn chỉ vì không có giá: provenance, hữu ích, source URL, caveat, recheck date và asset rights vẫn là gate bắt buộc.
4. **KPI quản trị:** đến `2026-09-10`, Council nộp một readiness ledger phân tách: proposals prepared, schema-ready, evidence-captured (nếu và chỉ nếu scoped-unfreeze đã được CEO ban hành), evidence-complete-internal-held, public-approved và blocked. Không được báo "35 nội dung hiển thị" nếu chưa có `PUBLIC_APPROVED` thực tế. Mục tiêu 25 Radar / 8 nguồn chính thức-địa điểm / 2 T1 deal là ambition hậu-unfreeze, không phải authorization hay claim completion trước evidence.
5. Production `v3.419.0`, voucher, affiliate, Savings Lab boundary và public DOM tiếp tục HOLD. Không Go-Live hoặc commercial activation theo JAYT-266.

## JAYT-267. Dual-Lane Deliverables Enforcement & Pre-Unfreeze Prerequisites

### Work order
1. **Lane A — raw forensic runtime trace.** Chạy isolated two-entrypoint test với `entrypoint_operational_runner` và `entrypoint_catalog_builder` khi Hard Freeze active. Nộp `RUNTIME_FREEZE_TRACE_EVIDENCE.log` nguyên bytes kèm SHA-256. Mỗi entrypoint phải chứng minh PID/UTC/command/source hash, `CONTAMINATION_FREEZE_ACTIVE`, exit code `1` và snapshot I/O trước/sau.
2. “Zero I/O” ở đây nghĩa là **zero business I/O**: zero read raw/candidate/quarantine/catalog/registry business data, zero write deploy/staging/catalog/ledger/cache và zero network-capable action. Một read tối thiểu freeze-record chỉ để fail-closed được phép và phải xuất hiện rõ trong trace; không được gọi nó là evidence intake hay dùng nó để che business I/O.
3. **Lane B — Batch 03 readiness ledger.** Nộp `JAYT_BATCH_03_READINESS_LEDGER.json` gồm đúng 28 target proposals: Hòa Khánh 7, An Thượng 7, Hải Châu 7 và Tiện ích số 7. Mỗi proposal chỉ chứa target id, cluster, nhu cầu, rationale, candidate source class/URL placeholder hợp pháp, evidence field contract, recheck criteria, accessibility/asset-rights notes và Council reviewer assignment. Cấm raw capture, ingest, SLA clock, evidence hash giả, admission state, render/public flag, price, discount, voucher, merchant asset hay CTA thương mại.
4. Readiness ledger là backlog tĩnh, không phải candidate hay content supply. Không được dùng nó để claim 28 nội dung, đủ 35 content, T4 approved hoặc fulfillment KPI. Nếu thiếu target lành mạnh, để slot `UNFILLED_PROPOSAL_SLOT` thay vì bịa thông tin.
5. Freeze flag, staging deployment và public DOM không được đổi. Production `v3.419.0`, voucher và affiliate tiếp tục `HOLD/LOCKED`. Chỉ sau khi CEO audit độc lập đạt **cả** raw trace Lane A và readiness ledger Lane B, Hội đồng 7 phòng ban mới được họp để đề xuất giữ freeze hoặc scoped-unfreeze; cuộc họp không phải approval và không tự mở bất cứ pipeline nào.

## JAYT-268. Active Timebox & Batch 03 Pre-Review

### CEO execution order
1. JAYT-267 Lane A có timebox **4 giờ** kể từ thời điểm Antigravity nhận chỉ thị này. Nộp đúng raw `RUNTIME_FREEZE_TRACE_EVIDENCE.log`, SHA-256 và command tái lập được theo contract JAYT-267. Lead QA và Engineering Lead thực hiện technical verification độc lập, ghi verdict factual và gaps; họ không có quyền gỡ freeze, approve content hay thay CEO quyết định public.
2. Hết timebox mà thiếu artifact hoặc trace không đạt contract: ghi `P0_TECHNICAL_SLA_BREACH__HARD_FREEZE_REMAINS_ACTIVE`; không tự kill process, xóa quyền hay restore branch. Các hành động đó cần CEO audit xác định chính xác PID, service owner, baseline commit/path và blast radius để tránh phá bằng chứng hay workspace. Circuit breaker hiện có tiếp tục là chốt chặn duy nhất.
3. Trong freeze, Council phải pre-review `JAYT_BATCH_03_READINESS_LEDGER.json` theo JAYT-267: xác minh đủ 28 proposal slots, phân bổ 7/7/7/7, zero-claim, schema, ownership, contract, provenance plan, accessibility và asset-rights notes. Kết quả chỉ là `READINESS_PRE_REVIEWED` hoặc gap list; không được capture, ingest, render, khai SLA hoặc tạo candidate commercial.
4. CEO chuẩn bị dự thảo scoped-unfreeze có điều kiện, nhưng không ký/hiệu lực trước khi có (a) Lane A runtime evidence được CEO audit, (b) Lane B pre-review complete, (c) Council risk recommendation và (d) scope/path/rollback/observability rõ ràng. Dự thảo không phải authority mở Batch 03.
5. Automation điều hành được điều chỉnh kiểm tra mỗi hai giờ trong thời hạn này và chỉ thông báo khi có evidence pass/fail, breach hoặc quyết định cần CEO; không coi heartbeat là báo cáo tiến độ hoặc thay evidence. Production `v3.419.0`, public DOM, voucher và affiliate vẫn HOLD.

## JAYT-268-CORRECTION-1. Lane A đạt hẹp; Lane B chưa đạt schema zero-claim

### Audit CEO độc lập
CEO chạy trực tiếp hai entrypoint từ source-of-truth khi Freeze V2 active: runner trả `CONTAMINATION_FREEZE_ACTIVE`, exit `1`; catalog builder trả cùng lỗi, exit `1`. Kết quả khớp raw trace bytes SHA-256 `3d9daa923752f41efbcaa2449773a58d8e4b645c5650144d2ad781a5a792c54b`. Đây là acceptance hẹp cho **Lane A hard-freeze runtime behavior**, không phải unfreeze, Go-Live hay approval Batch 03.

`JAYT_BATCH_03_READINESS_LEDGER.json` có 28 proposal, phân bổ 7/7/7/7, nhưng chưa đạt JAYT-267: từng proposal vẫn lưu các field thương mại bị cấm (`pricing_field`, `discount_field`, `voucher_field`, `commercial_cta`) dù đặt `null`; nhiều rationale/recheck còn mang factual assertions/chỉ số cụ thể khi chưa có evidence. Ledger vì vậy không phải zero-claim readiness artifact hợp lệ.

### Lệnh xử lý
1. Giữ raw ledger hiện tại immutable để audit; không overwrite. Tạo `JAYT_BATCH_03_READINESS_LEDGER_V2.json` append-only/reference rõ hash bản cũ.
2. V2 phải xóa hoàn toàn — không null, không alias — mọi commercial/admission/render/SLA/raw/evidence-hash field. Chỉ để proposal schema của JAYT-267. Thay mọi fact/chỉ số/khẳng định hiện trạng bằng hypothesis trung tính và `requires_evidence_before_candidate=true`.
3. Nộp schema validation deterministic: đúng 28 slot và 7/7/7/7, không duplicated target ID, không banned keys/values, không candidate/public eligibility. Validation pass không phải evidence capture hay approval content.
4. Freeze V2 không đổi. Chưa có scoped-unfreeze vì Lane B chưa đạt; cấm capture/ingest/build/deploy/render/public change. Production/voucher/affiliate HOLD.

## DA. Quyết định CEO — Scoped evidence-capture exception và Staging-only controls

**CEO authorization:** `CHAIRMAN-AUTHORIZATION-2026-0903-CANON-DA`, được CEO tiếp nhận và ban hành ngày 2026-09-03.

Production `v3.419.0` vẫn khóa tuyệt đối. Quyết định này **không** là public approval, commercial activation, catalog build, deploy, affiliate activation, hay quyền render Batch 03. Nó chỉ cấp hai hoạt động có giới hạn dưới đây.

### DA.1 Cổng 1 — offline scope, rollback và observability

1. Phạm vi chỉ là Staging nội bộ; không có production deploy hoặc thay đổi public DOM.
2. Rollback duy nhất là `node 07_QUALITY_ASSURANCE/scoped_unfreeze_staging_rollback.js --execute`. Script này chỉ có thể đặt feed về `[]`, hoàn trả các cờ HK/DS về backlog tĩnh, và ghi receipt; nó không có network, subprocess hay Vercel capability.
3. QA được phép sinh receipt offline cho console, viewport 390px, touch target và contrast. Không đưa ra claim thời gian phản hồi bằng 0ms.

### DA.2 Cổng 2 — single-shot raw evidence capture

Antigravity được phép thực hiện đúng một lần GET không xác thực, không cookie/token/secret, không submit form và không affiliate instrumentation, tới đúng tám URL sau. Mỗi response phải lưu raw body, headers, UTC, HTTP status và SHA-256 tại `07_QUALITY_ASSURANCE/runtime_evidence/raw_captures/`; lỗi 4xx/5xx hoặc mismatch phải được gắn `QUARANTINE_NO_CLAIM`.

| ID | URL |
|---|---|
| SEED_01_CGV | https://www.cgv.vn/default/culture-day |
| SEED_02_METIZ | https://metiz.vn/tin-tuc/thu-hai-vui-ve-45k/ |
| SEED_03_GALAXY | https://www.galaxycine.vn/khuyen-mai/happy-day |
| SEED_04_GITHUB | https://education.github.com/pack |
| SEED_05_SPOTIFY | https://www.spotify.com/vn-vi/student/ |
| SEED_06_DANABUS | https://danangbus.vn/ |
| SEED_07_SHOPEEFOOD | https://shopeefood.vn/da-nang |
| SEED_08_GRABFOOD | https://food.grab.com/vn/vi/ |

### DA.3 Sau capture

CEO phải đối soát độc lập bytes/hash, điều kiện chương trình và dữ liệu được trích xuất trước bất kỳ candidate, render, feed, deep-link hoặc unfreeze nào. `deals_feed.json` giữ `[]`; tất cả Batch 03 giữ `render_eligible_flag: false` và `public_approved_flag: false` cho đến một quyết định CEO append-only riêng.

## DA-Retry-02. Quyết định CEO — Scoped Retry #2 evidence capture

**Authorization:** `CHAIRMAN-DIRECTIVE-2026-0903-RETRY02-CANON`. Attempt 01 được niêm phong tại `07_QUALITY_ASSURANCE/runtime_evidence/quarantine_attempt_01_manifest.json`. Retry này có execution id `EXECUTION_RETRY_02_20260903`, chỉ được bắt đầu sau `NETWORK_PROBE_PASS` từ `network_readiness_probe.js` và dùng cùng whitelist DA.2.

1. Rollback duy nhất là `scoped_unfreeze_staging_rollback.js`; cấm `master_production_release_v9.js` và mọi production deploy.
2. Capture chỉ dùng unauthenticated GET, không cookie/token/secret/form/affiliate, đúng một request cho từng URL DA.2.
3. Mọi response nằm độc lập trong `07_QUALITY_ASSURANCE/runtime_evidence/raw_captures_retry02/`, gồm raw bytes, headers, UTC, HTTP status và SHA-256. Lỗi hoặc response không dùng được là `QUARANTINE_NO_CLAIM`.
4. Retry #2 không cấp public approval, candidate admission, feed mutation, render Batch 03, voucher hoặc affiliate activation. Các quyết định đó cần audit CEO append-only riêng sau đối soát evidence.

## DA-AUDIT-VAULT. Quyết định CEO — Ghi nhận provenance audit và duy trì khóa

CEO ghi nhận `07_QUALITY_ASSURANCE/runtime_evidence/raw_captures_vault/VAULT_PROVENANCE_AUDIT_REPORT.json` với phạm vi giới hạn: `SEED_03_GALAXY`, `SEED_04_GITHUB`, `SEED_05_SPOTIFY`, `SEED_06_DANABUS` và `SEED_08_GRABFOOD` chỉ đạt `SOURCE_PAGE_IDENTITY_VERIFIED__NO_COMMERCIAL_CLAIM_APPROVED`; `SEED_07_SHOPEEFOOD` là `SOURCE_BYTE_VALID__CONTENT_INSUFFICIENT_SPA_SHELL`; `SEED_01_CGV` và `SEED_02_METIZ` tiếp tục `QUARANTINE_URL_MAPPING_PENDING_CEO_APPROVAL`.

Quyết định này không tạo `PUBLIC_APPROVED`, candidate admission, feed mutation, Batch 03 render, voucher, affiliate, deep-link, deploy hoặc unfreeze. `deals_feed.json` giữ `[]`; Batch 03 giữ static backlog; registry public chỉ giữ GitHub Education Pilot; Production `v3.419.0` và toàn bộ commercial gates tiếp tục `HOLD/LOCKED`.
