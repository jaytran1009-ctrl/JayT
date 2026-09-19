# JAYT-319 — Batch 08 Targeted One-shot Ingress Work Order

**Authorized scope:** `JAYT-319-BATCH-08-TARGETED-ONE-SHOT-INGRESS-20260904`.

Lead Operator may collect exactly one unauthenticated, read-only raw HTML body and sanitized response headers for `B08_01` and `B08_03` only. Store immutable files in the Batch 08 ingress vault, calculate SHA-256 at write time, and verify that each specified text span occurs in the raw body at its recorded UTF-8 offset.

Reject and quarantine independently on a non-200 response, redirect, missing span, missing date, sensitive header leakage, or hash/offset mismatch. Do not retry either target under this scope. Do not capture B08_02.

This order grants no public approval, no render authority, no registry mutation, no feed mutation, and no Production deployment. After validation, submit evidence to the CEO item-level review gate with the required disclaimer and prohibitions unchanged.
