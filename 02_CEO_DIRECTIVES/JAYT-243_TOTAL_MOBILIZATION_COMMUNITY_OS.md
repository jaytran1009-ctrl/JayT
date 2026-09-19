# JAYT-243 — Total Mobilization: JayT Community OS Go-Live

**CEO directive · Effective immediately · Status:** `ACTIVE — NO ACCEPTANCE UNTIL INDEPENDENT CEO LIVE REVIEW`  
**Mission:** xây JayT Đà Nẵng thành công cụ hằng ngày đáng tin cho sinh viên và nhân viên văn phòng: tìm ưu đãi, chương trình chính thức, địa điểm và quyết định mua thông minh, với dữ liệu thật hơn hoa hồng.

## 1. Mệnh lệnh điều hành hợp nhất

Antigravity triển khai **tổng lực theo một Master Release Train**, không làm các vá vụn rời rạc. Song song bốn workstream:

1. **Community web:** hoàn thiện UI, mobile, journeys, search/filter, states, accessibility, reporting và trải nghiệm trở lại hằng ngày.
2. **Trusted supply:** xây pipeline để đạt **30–50 nội dung hữu ích/ngày**; nội dung được phân tầng minh bạch, không gọi tất cả là “deal”.
3. **Value-first affiliate:** khảo sát toàn bộ catalog AccessTrade có quyền xem ở chế độ read-only; quyết định Buy/Wait chỉ khi có evidence thực đầy đủ.
4. **Trust, engineering & QA:** chặn public archive/legacy claim, enforce source/deploy parity, evidence lineage, monitoring và rollback.

Không có “done” vì dashboard xanh, test field-exists hay báo cáo của Antigravity. Chỉ có `Ready for CEO Live Review` khi evidence độc lập đủ; chỉ CEO được `ACCEPTED` sau kiểm tra trực tiếp production.

## 2. Điều kiện P0 không thể vượt qua

JAYT-242R đang bị từ chối vì public archive exposure. Trước mọi feature/deal growth release:

- Gỡ toàn bộ `historical_archive_containment` và legacy feeds khỏi `deploy/`, `deploy/public/` và mọi URL serve được; lưu ngoài deployment root với quarantine manifest bất biến.
- Gate enumerate recursive toàn bộ deploy/public routes; fail nếu có archive, legacy feed, commercial-price token, dormant affiliate renderer, tracking URL hoặc public asset không trong release allowlist.
- Bàn giao file inventory before/after, hash manifest, HTTP deny (404/410/equivalent) trên từng URL cũ và browser audit CEO.

**Không được để containment thay thế roadmap:** sau P0, bốn workstream tiếp tục theo kế hoạch dưới đây.

## 3. Council bắt buộc trước mỗi mốc lớn

Hội đồng gồm Product, Design, UX/CX, Growth, Data & Trust, Engineering, QA. Mỗi mốc M1–M5 phải có một biên bản hợp nhất gồm: quyết định, trade-off, rủi ro, owner, evidence cần nộp, no-ship register. Không có biên bản = không release.

| Phòng ban | Ý kiến/mandate thường trực |
|---|---|
| Product | Mỗi screen phải giúp khách trả lời nhanh “hôm nay tôi nên làm gì?”; tier là product contract, không phải decoration. |
| Design | Four-tier taxonomy luôn rõ; Radar trung tính, không treatment gây hiểu nhầm là deal; asset có nguồn hợp lệ. |
| UX/CX | 4 journeys: tiết kiệm hôm nay, gần bạn, radar theo dõi/mua thông minh, chương trình/coupon. Thiết kế empty/expired/report states; mobile first, touch >=44px, keyboard & screen-reader baseline. |
| Growth | Supply 30–50 item/ngày theo need × time × district; quality quota từng tier, không KPI số thẻ đơn thuần. |
| Data & Trust | Canonical evidence contract; evidence freshness, scope, terms, price/fee binding; fail-closed promotion; claim audit trail. |
| Engineering | Single source of truth, deploy allowlist, routing deny, version parity, cache invalidation, observability, rollback runbook. |
| QA | Test source + deploy/public recursively + live desktop/mobile; persona flows, accessibility, broken asset/link, provenance negative tests. QA không tự cấp CEO approval. |

## 4. Supply: mục tiêu 30–50 nội dung hữu ích/ngày

### Taxonomy công khai bắt buộc

| Tier | Được công bố khi | CTA hợp lệ |
|---|---|---|
| T1 — Deal xác minh | Giá/lợi ích, điều kiện, scope, hạn dùng và evidence có timestamp đều đủ | Xem điều kiện / nguồn gốc |
| T2 — Chương trình/coupon chính thức | Nguồn official và quote/scope rõ; thiếu giá thực thì nói rõ cần kiểm tra | Mở nguồn chính thức |
| T3 — Địa điểm xác minh | Cơ sở/location có evidence; tuyệt đối không gán deal | Xem vị trí/cơ sở |
| T4 — Radar | Có nhu cầu và nguồn đáng theo dõi nhưng chưa đủ evidence để claim | Xem tiêu chí theo dõi / báo tín hiệu |

**Daily target bắt đầu sau P0:** 30–50 items/ngày là tổng mix đã qua state machine, ví dụ T1 3–8, T2 7–12, T3 10–18, T4 10–15. Mọi khoảng là ceiling vận hành, không quota buộc phải bù bằng dữ liệu suy diễn.

### Supply operating loop

`discover → capture raw artifact → normalize → verify claim binding → Council sampling → publish → recheck/expire → quarantine`.

Mỗi item có owner, source URL, raw artifact + SHA-256, capture time, evidence version, locality/scope, expiry/recheck time, status và audit verdict. Phát hiện mismatch phải hạ về Radar/quarantine, không sửa silent.

## 5. Affiliate: catalog-wide, customer value first

1. Antigravity lập inventory **toàn bộ catalog AccessTrade có quyền đọc**, phân nhóm merchant theo customer need; không chọn brand vì commission cao.
2. Scorecard: need fit, merchant reliability, stock/fulfillment, total cost & return risk, availability of real price/terms/history data, customer value; commission là secondary.
3. Không tạo tracking link, đăng ký campaign, submit form, gửi data hoặc dùng secret. Chỉ khảo sát read-only khi portal/account đã được cấp quyền phù hợp.
4. Affiliate card chỉ được quyết định `MUA`/`CHỜ` nếu có product/offer URL thực; observed price timestamp; total payable (ship/phí/điều kiện); scope/expiry; observed-history thật hoặc “chưa đủ lịch sử”; disclosure; independent QA re-fetch/triangulation.
5. Nếu thiếu một yếu tố: chỉ là T4 Radar, không giá, không Buy/Wait, không affiliate CTA.

## 6. Release milestones, deliverables và Council gates

| Mốc | Owner chính | Deliverable | Gate CEO |
|---|---|---|---|
| M0 P0 recovery | Engineering + QA + Trust | Public archive removed/denied; recursive route scanner; rollback proof | CEO browser checks formerly-public URLs |
| M1 Community UX foundation | Product + Design + UX/CX | 4 journeys, tier states, search/filter, report-signal flow, responsive/a11y baseline | CEO desktop/mobile walkthrough |
| M2 Supply engine | Growth + Data & Trust | Daily queue, state machine, evidence packs, freshness dashboard, 30–50 mix pilot | Random sample trace-back by CEO |
| M3 Affiliate discovery | Growth + Data & Trust + Product | Read-only catalog inventory and value scorecard; no-link Radar experience | CEO reviews no-ship and eligibility decisions |
| M4 Integrated candidate | All seven functions | Master Executive Release Pack, route inventory, SOT/deploy parity, QA and rollback | CEO live audit across 4 journeys |
| M5 Go-live operations | All seven functions | Daily cadence, incident protocol, weekly Council review, release calendar | CEO explicit acceptance only |

## 7. Antigravity operating rules

- Làm việc liên tục theo release train cho đến M5, nhưng **dừng promotion** ngay khi gate fail hoặc evidence thiếu; báo blocker với one consolidated remediation plan, không bịa completion.
- Trước mỗi M0–M5 review, triệu tập Council và nộp một recommendation hợp nhất, không gửi 7 báo cáo tách rời.
- Không tự thay đổi `PROJECT_MEMORY.md` để ghi CEO approval; mọi transaction phải truthfully record state và cơ chế hiện có.
- Mỗi ngày bàn giao: change manifest, deploy inventory, source/deploy scan, evidence delta, failed checks, no-ship list và next Council agenda.
- CEO yêu cầu phát triển đồng thời: an toàn evidence không được làm UI/supply/affiliate research dừng lại; growth không được làm trust gate nới lỏng.

## 8. Definition of “fully live”

JayT chỉ được gọi `FULL GO-LIVE` khi P0 đóng độc lập; Council ký M4; daily supply loop vận hành với evidence/freshness; UI usable desktop/mobile; affiliate vẫn value-first và 0 commercial claim chưa chứng minh; QA live pass; rollback verified; CEO trực tiếp kiểm tra và ghi quyết định `ACCEPTED`.
