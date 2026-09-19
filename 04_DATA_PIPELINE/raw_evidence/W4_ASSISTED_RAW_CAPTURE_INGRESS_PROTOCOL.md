# W4 Assisted Raw Capture Ingress

This is a controlled import path for a human operator’s **public, logged-out** browser export. It is not a WAF/CAPTCHA bypass. The operator must stop if the page asks them to sign in, shows a bot challenge, or displays personal data.

## Inputs per submission

1. Original HTML saved from the final public page.
2. Full-page PNG captured in the same browser session.
3. Metadata based on `W4_ASSISTED_CAPTURE_METADATA_TEMPLATE.json`; only the allowed response headers may be retained.

Never export cookies, HAR files, authorization headers, tokens, credentials, browser profiles, order history, addresses, payment data, or a screenshot containing personal data.

## Ingest command

```powershell
node 04_DATA_PIPELINE/ingest_w4_assisted_raw_capture.cjs --target W4_KLOOK_DANANG --html <public.html> --png <full-page.png> --metadata <sanitized.json>
```

The ingress validates origin, HTTP 200, operator attestation, PNG signature, block markers, and SHA-256 disk replay. A pass is marked `RAW_EVIDENCE_ONLY`; it needs independent semantic audit before any price, voucher, locality, validity, or publication claim.
