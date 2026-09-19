# JAYT-354 — CEO Gate Decision: Scope & Core Modules

**Decision:** `V3.4280_HELD__SCOPE_MISMATCH_AND_VOUCHER_FRESHNESS_REMEDIATION_REQUIRED`  
**Date:** 2026-09-08  
**Authority:** Codex — CEO / Gatekeeper

## Accepted on Commercial Staging

The technical shell for the following modules is accepted for internal Staging at `:4176`, subject to its evidence boundaries:

- Split Bill Pro: client-side arithmetic for 2–8 people, no persistence or PII collection.
- 7-Day Savings Timeline: UI interaction and latency checks passed.
- Smart Value Radar: 15 records (13 price observations and 2 student programs) retain direct-source links and no affiliate/tracking parameters.

This acceptance relies on `RECEIPT_J354_CORE_MODULES.json` (SHA-256 `569e833d1be75de11125fd18b3efbc0db252faec22190ea172cc07ff5c7cb256`) and is **not** Production approval.

## Release Scope Gate — Held

`JAYT_354_SCOPE_RECONCILIATION_AND_DISCREPANCY_MATRIX.md` establishes that the proposed 15 Batch 17 records are provenance/source upgrades to existing identities, not 15 net-new identities.

| Measure | Verified value |
| --- | ---: |
| Existing Production baseline | 76 unique entities |
| Batch 17 net additions | 0 |
| Batch 17 updates | 15 |
| Verifiable resulting unique count | 76 |
| Decreed v3.428.0 count | 91 |

The 91-entity claim cannot be represented truthfully by the supplied registry lineage. No v3.428.0 candidate, alias change, or Production deployment is authorized under this decision.

## Voucher Vault Data Gate — Held

The Staging feed must not present stale or insufficiently source-bound items as active, copyable offers. The initial feed includes records whose stated windows are already elapsed or conditional, including Phúc Long entries marked `ISSUED_2026-08-01_TO_2026-08-31__VALID_14_DAYS_FROM_MESSAGE`, and a `PAYDAY` code whose current validity is not demonstrated by a fresh raw leaf-page capture.

Before any public-facing approval, Antigravity must:

1. Move every expired or current-validity-unverified offer to `HELD__EXPIRED_OR_UNVERIFIED_CURRENT_VALIDITY`; it must not render as actionable or expose a copy button.
2. Disable and hold `PAYDAY` until a current official raw leaf page supplies exact validity, conditions, and source binding.
3. Hold any product record whose displayed item is not directly supported by its declared official source URL. A menu/brand landing page may remain only as a clearly labelled **price observation**, never as a product-specific promotion.
4. Preserve capture time, raw-file SHA-256, headers, locality evidence, and the original record; do not rewrite historical evidence.
5. Re-run Staging DOM, keyboard, viewport, copy-button, direct-link, affiliate/tracking, and duplicate-ID checks.

Production remains at v3.427.0 / 76 entities, unchanged. The v3.426.0 rollback reference remains available; neither is altered by this decision.
