# JAYT Wave 2 — CEO adoption and scope boundary

**Decision:** `W2_STAGING_EXECUTION_AUTHORIZED__FIRST_PARTY_SHOPEEFOOD_CAPTURE_PENDING__PRODUCTION_AND_AFFILIATE_HELD`

The Chairman's supplemental mandate `CHAIRMAN-SUPREME-MANDATE-2026-0911-W2-EXECUTION` is adopted as an amendment to `WORK_ORDER_POST_WAVE1_EXPANSION_W2`.

## Authorized now

- Capture the official ShopeeFood Da Nang route (`https://shopeefood.vn/da-nang`) as a single first-party session: final URL, raw body, response headers, screenshot, byte counts and SHA-256. Any local eligibility, price or term claim requires an exact UTF-8 quote and offset from that same capture.
- Build the staging-only lunch comparator. It may calculate **only** values typed by the user: food price + user-entered delivery fee - user-entered voucher. Peak-time and bridge controls are reminders to inspect the provider app; they must not create a fee or claim a provider policy.
- Build the staging-only KTX stack simulator. All shop reduction, marketplace voucher, delivery fee and delivery credit values are user-entered and explicitly labelled as a simulation.
- Show the accepted Spotify Student Vietnam information on Staging with its eligibility, SheerID verification and maximum four-year condition.
- Review `dispatchSmartAffiliate()` locally with inert data and prepare disclosure copy.

## Held boundaries

- No claim of ShopeeFood availability, fee, free-shipping, discount, local coverage, ranking, or campaign status is permitted before evidence audit passes.
- No affiliate URL, tracking parameter, attribution, revenue claim or affiliate activation is permitted.
- No Production deployment or canonical-alias change is authorized. Production remains **v3.446.0-j392** / `dpl_6SZZk5KYChanKHjvVKZxXn5hpc78`.

## Acceptance prerequisites

The CEO will assess a ShopeeFood submission only when every persisted artifact is physically present and internally consistent, including headers from the capture session, screenshot, raw bytes, SHA-256, file size and directly quoted terms. WAF/login bypass, credentials, fabricated values and self-authored evidence are rejected.

## Local implementation result — 2026-09-11

- The staging calculator now contains no preloaded provider fees, vouchers, bridge surcharges, price ranking, or campaign claim. It calculates only **food price + user-entered delivery fee − user-entered voucher**.
- The KTX calculator likewise takes every reduction and delivery figure from the user and identifies itself as a simulation.
- Spotify Student presentation includes the accepted eligibility, SheerID, and four-year constraints.
- Local browser checks passed at 1440px, 768px, and 390px with no console/runtime error or horizontal overflow.
- **Affiliate redirect remediation completed:** every one of the 30 `J372_PRODUCTS` records now has `outbound_destination_url` equal to its direct product URL. A full synchronized-source scan returns zero `partner_id`, `s.shopee.vn`, `tiki.vn/affiliate`, or `c.lazada.vn` tokens. Affiliate activation nevertheless remains HOLD pending Wave 2 evidence and a separate authorization.
