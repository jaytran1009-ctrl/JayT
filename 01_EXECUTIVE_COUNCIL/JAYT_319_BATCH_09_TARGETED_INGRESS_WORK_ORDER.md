# JAYT-319 — Batch 09 Targeted One-shot Ingress Work Order

The sole capture authority is `JAYT-319-BATCH-09-TARGETED-ONE-SHOT-INGRESS-20260904`. Lead Operator may obtain one unauthenticated, read-only raw body and sanitized headers for B09_01, B09_02, and B09_03 only. Record HTTP status, capture time, final URL, SHA-256, source date, and unique UTF-8 byte offset for the exact scoped span.

Fail closed and quarantine any target that redirects, is non-200, lacks the date/span, exposes sensitive headers, or has a hash/offset mismatch. Do not retry under this scope.

No public approval, registry mutation, hydration, feed mutation, affiliate/tracking, or Production deployment is authorized. Any later card must carry the per-target disclaimer and prohibitions unchanged through CEO item-level review.
