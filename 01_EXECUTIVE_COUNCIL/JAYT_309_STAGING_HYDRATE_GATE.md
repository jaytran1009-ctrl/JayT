# JAYT-309 — Staging hydrate gate

1. Lead Operator places real `<SLOT>.raw.html` and `<SLOT>.headers.json` pairs in the JAYT-302 vault.
2. Run `node 07_QUALITY_ASSURANCE/process_jayt_309_real_byte_intake.js`.
3. CEO independently audits each `REAL_BYTES_VERIFIED__AWAITING_CEO_AUDIT` row and writes an item-level public-approval verdict.
4. Engineering hydrates only the named approved rows into Source of Truth and the Staging parity copy; then QA runs the DOM audit.

No stage permits network retrieval, synthetic raw payloads, feed mutation, affiliate/tracking links, vouchers, or Production deployment.
