# JAYT-334 — STEADY-STATE OBSERVABILITY & PHASE 2 WORK ORDER

**Status:** `ACTIVE__NO_PRODUCTION_DEPLOY_AUTHORITY`  
**Production baseline:** `v3.423.0` — 47 cards  
**Rollback standby:** `v3.422.0` — 24 cards  
**Issued:** 07/09/2026

## Track A — Silent Production observability

Antigravity maintains the active hourly heartbeat against `https://jayt-production-v3420.vercel.app` using the `v3.423.0` 47-card baseline. Healthy runs remain silent. Any of the following is a P0 notification condition:

- HTTP status other than 200;
- total runtime composition other than 24 civic plus 23 commercial cards;
- `B14_DMX_M170_DEN` present in registry or DOM;
- affiliate/tracking token or synthetic voucher code detected;
- `deals_feed.json` differs from `[]` when the local fixture is available;
- console/runtime error or horizontal overflow at 1440, 768 or 390 px.

The rolling runner may update only `JAYT_333_V3423_ROLLING_MONITOR_RECEIPT.json`. It must never overwrite the immutable M4 post-deploy receipt.

## Track B — Phase 2 supply preparation

Data & Trust and Product execute the backlog in `06_TRUST_AND_EVIDENCE/JAYT_334_PHASE_2_STRATEGIC_BACKLOG.json` under discovery/pre-audit authority only.

### Deliverables

1. Reconcile the existing 10-brand locator matrix against current parser readiness and known network failures.
2. Build a deduplicated locality evidence index by brand; inherited locality may establish that a brand operates in Đà Nẵng but may not establish price, stock or offer applicability at every branch.
3. Propose official dated leaf pages for student/community offers with verbatim eligibility, validity/expiry and redemption conditions.
4. Keep every new candidate out of public registry and Production until it receives item/batch-level evidence validation, Strategic Advisor review and a separate Chairman release decree.

## Exit criteria

Phase 2 is ready for a targeted ingress decision only when each proposed offer has an official leaf URL, captured source fingerprint, direct text evidence, observed/expiry timestamps where applicable, locality classification, disclosure copy and a zero-synthetic validation result.

## Hard boundaries

- No Production deploy in this work order.
- No mutation of the 47-card baseline.
- No blind retry for blocked sources.
- No affiliate activation, tracking parameter or invented voucher code.
