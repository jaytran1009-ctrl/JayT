# JAYT-322 — Batch 10 ingress & release-audit work order

## Authorized scope

Lead Operator is authorized for exactly one unauthenticated, browser-verified capture per target listed in `06_TRUST_AND_EVIDENCE/JAYT_322_BATCH_10_TARGETED_INGRESS_SCOPE.json`. Save the original response body and a redacted response-header record under `06_TRUST_AND_EVIDENCE/batch_10_ingress_vault/` as `<SLOT>.raw.html` and `<SLOT>.headers.json`.

## Antigravity dispatch

1. Do not alter raw bytes after capture; do not synthesize missing files or metadata.
2. Run `node 07_QUALITY_ASSURANCE/validate_jayt_322_batch_10_ingress.js` after each completed pair arrives.
3. Quarantine each incomplete, non-200, redirected, secret-bearing, hash-mismatched, or text-span-mismatched target independently. Never retry automatically.
4. Submit only `EVIDENCE_COMPLETE_INTERNAL_HELD` results to the CEO for item-by-item Staging-only approval.
5. Hydrate only individually approved entries, then run regression and DOM audit. This Work Order grants no Production deployment authority.

## Release candidate v3.421.0 audit checklist

- Current Staging registry and DOM parity.
- Provenance, recency and non-commercial review for every proposed promoted card.
- Regression suite and automated DOM audit pass.
- `deals_feed.json` remains `[]`; voucher, affiliate and tracking remain disabled.
- A separately signed Chairman Production decree remains mandatory before any deploy. Rollback target is v3.420.0.
