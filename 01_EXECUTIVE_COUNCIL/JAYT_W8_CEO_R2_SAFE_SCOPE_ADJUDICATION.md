# JAYT W8 — CEO R2 Safe-Scope Adjudication

**Decision:** `SAFE_LINK_INSPECTOR_AND_USER_DRIVEN_STACK_ACCEPTED__COMMERCIAL_DISPATCH_HELD`

The current interface already contains the admissible W8 core: `parseShopeeLink()` extracts public identifiers embedded in an allowlisted user-supplied URL, `calculateDynamicStack()` computes only from user-entered values, and `dispatchSmartAffiliate()` remains a non-dispatching sandbox guard with no destination URL.

The following claims are not accepted as implemented: scraping hidden vouchers, querying private marketplace APIs, resolving short links through a proxy, publishing twenty preset floor-price products, or injecting live partner identifiers. No partner credential has been read from `.env`, copied to browser code, or used to emit tracking.

Canonical Production remains `v3.462.0-j411` with `affiliate_enabled: false`. The previously isolated W8 Preview remains historical evidence only and does not authorize a Production alias change.

Release of a real affiliate route requires a separately reviewed partner agreement, documented official API/deep-link contract, server-side secret handling, disclosure review, and a new explicit Production authorization.
