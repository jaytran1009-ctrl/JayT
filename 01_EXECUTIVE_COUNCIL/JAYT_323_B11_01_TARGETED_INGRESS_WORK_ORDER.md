# JAYT-323 — B11_01 Targeted Ingress Work Order

## Authority and scope

This work order authorizes one operator-verified browser attachment only for `B11_01_TRA_CUU_CHUYEN_BAY_DANANG_SMART_CITY_1022`, as specified in `JAYT_323_B11_01_TARGETED_INGRESS_SCOPE.json`.

## Lead Operator deliverable

Save the unmodified response body and an independently recorded, redacted header record in `06_TRUST_AND_EVIDENCE/batch_11_ingress_vault/`:

- `B11_01.raw.html`
- `B11_01.headers.json`

The headers record must include `http_status: 200`, `final_url`, `captured_at_utc`, and `response_headers`. It must not include cookie, token, authorization, or set-cookie data. No synthetic HTML, reconstructed DOM, retry, or alternate URL is permitted.

## Engineering and QA gate

Run `node 07_QUALITY_ASSURANCE/validate_jayt_323_b11_01_ingress.js`. The validator calculates the SHA-256 and the UTF-8 byte offset from the stored raw file. A pass creates internal-held evidence only; it does not authorize registry changes, rendering, or Production deployment.

## CEO item audit

Only after a validator pass may the CEO decide whether the dated article supports an information-only card. The card must not make real-time availability guarantees, sell tickets, accept bookings, or collect personal data. Any decision to hydrate is a separate `PUBLIC_APPROVED_STAGING_ONLY` decision.
