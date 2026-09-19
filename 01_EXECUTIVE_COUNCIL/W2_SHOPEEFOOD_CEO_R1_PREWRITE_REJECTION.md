# Wave 2 — ShopeeFood Da Nang pre-write rejection

**Decision:** `CAPTURE_REJECTED__PREWRITE_CAPTCHA__NO_ARTIFACTS_WRITTEN__W2_RELEASE_HELD`

## Attempt under review

- Target: `https://shopeefood.vn/da-nang`
- Collector: `04_DATA_PIPELINE/capture_shopeefood_danang_w2.cjs`
- Collector SHA-256: `caf8bcf8cc4d7f56f8834b31670031793a39113cbe59316b90b5d26dbb93bb07`
- Capture model: public single-session Puppeteer navigation; no credentials, proxy, WAF bypass, CAPTCHA bypass, or login bypass.

## Result

The pre-write inspection found the rendered marker `captcha`. The collector terminated with `CAPTURE_REJECTED:PREWRITE_WAF_OR_LOGIN_MARKER:captcha` before semantic extraction and before its first evidence write.

The expected evidence directory `06_TRUST_AND_EVIDENCE/w2/shopeefood/` does not exist after the attempt. Consequently, no raw HTML, container extraction, screenshot, response-header record, SHA-256 receipt, or quote offsets were created or accepted.

## Gate decision

- `SHOPEEFOOD_DANANG`: **PENDING — no acceptable first-party evidence**.
- Wave 2: **not approved for candidate promotion or Production deployment**.
- `affiliate_enabled`: **false**; no attribution or commercial activation is authorized.

Any future evidence attempt must remain a normal public access capture. The current CAPTCHA must not be bypassed or treated as proof of a working ShopeeFood Da Nang service.
