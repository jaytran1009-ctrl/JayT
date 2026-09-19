# W4 Field Test Protocol — 12 consented, anonymous sessions

## Status and scope

This is an execution-ready protocol, not evidence that any field session has happened. It plans six student sessions (Bách Khoa/DUE) and six office-worker sessions (Nguyễn Văn Linh), with one facilitator and one note-taker where possible. Recruitment, invitations, participant contact, and incentives require separate operational authorization.

## Purpose

Test whether participants can correctly use the client-side lunch calculator and KTX voucher-stack simulator, and understand the stated Spotify Student and DanaBus procedures without interpreting JayT as a live-pricing, delivery, or affiliate service.

## Consent script

“Bạn đang thử một công cụ tính toán và thông tin hướng dẫn. Tham gia là tự nguyện; bạn có thể dừng bất cứ lúc nào. JayT không ghi họ tên, số điện thoại, email, tài khoản ngân hàng, vị trí GPS, lịch sử mua hàng, hay ảnh chụp ứng dụng cá nhân. Chúng tôi chỉ ghi kết quả tác vụ ẩn danh và phản hồi tự nguyện. Bạn có đồng ý tiếp tục không?”

Record only `consent: yes/no`. End the session immediately when the answer is not yes.

## Session flow (20–25 minutes)

1. Assign a random session code such as `W4-S-01` or `W4-O-01`; do not link it to an identity.
2. Ask the participant to enter their own hypothetical or currently visible values into the lunch calculator. Do not view or record their delivery-app screen.
3. Ask them to explain the displayed total and the “user-entered values” notice.
4. Ask them to try a hypothetical order in the KTX voucher-stack simulator and explain why it is not a redeemable marketplace offer.
5. Ask them to find the Spotify Student eligibility/SheerID note and the DanaBus procedure/fare limitation.
6. Capture task completion, observed confusion category, and optional anonymized free text. Do not ask for a purchase, signup, click-out, or social share.

## Measures

| Area | Pass signal | Escalation trigger |
| --- | --- | --- |
| Lunch calculator | Participant identifies that all input values are theirs and can explain the formula. | Believes JayT shows live provider prices or a guaranteed cheapest app. |
| KTX stack | Participant calls it a simulation and can alter inputs. | Believes a displayed amount is a redeemable voucher. |
| Spotify / DanaBus | Participant locates eligibility/procedure and the fare caveat. | Misunderstands eligibility or treats held fare information as current. |
| Privacy | Participant sees no request for personal or financial data. | Any personal data is entered, observed, or retained. Stop and report. |

## Recording and retention

Use only the anonymous template in `W4_FIELD_TEST_ANONYMOUS_OBSERVATION_TEMPLATE.json`. Store no recordings, photographs, raw device screens, contact details, or precise location. Aggregate only after all consented sessions finish; do not manufacture missing sessions or satisfaction figures.

## Release boundary

Results may guide copy and usability work. They do not authorize affiliate links, tracking/sub-IDs, external redirects, or a Production deployment.
