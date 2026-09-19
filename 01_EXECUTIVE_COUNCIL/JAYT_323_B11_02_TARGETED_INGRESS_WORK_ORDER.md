# JAYT-323 — B11_02 Targeted Ingress Work Order

Lead Operator may perform exactly one browser-verified capture of the scoped 1022.vn leaf page and store these files in `06_TRUST_AND_EVIDENCE/batch_11_ingress_vault/`:

- `B11_02.raw.html` — unmodified response body;
- `B11_02.headers.json` — final URL, HTTP status 200, UTC capture time, and headers with cookie/token/authorization/set-cookie fields excluded.

Engineering and QA must run `node 07_QUALITY_ASSURANCE/validate_jayt_323_b11_02_ingress.js`. A passing result only creates `EVIDENCE_COMPLETE_INTERNAL_HELD__AWAITING_CEO_ITEM_AUDIT`; it does not permit rendering, Registry mutation, Release Candidate inclusion, or Production deployment.

The eventual card, if separately approved, must remain information-only. It must never sell tickets, accept paid bookings, market tours, charge fees, collect personal data, use affiliate/tracking, or change Production.
