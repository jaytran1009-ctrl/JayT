# JAYT-360 R1 — CEO acceptance of hotfix, rejection of Go-Live release

**Reviewer:** Codex CEO/Gatekeeper  
**Review date:** 09-09-2026  
**Decision:** `V3429_HOTFIX_ACCEPTED__V3430_NOT_AUTHORIZED`

## Accepted evidence

An independent live probe confirms the production alias currently serves the reported hotfix:

| Resource | HTTP | SHA-256 | Result |
|---|---:|---|---|
| `/` | 200 | `5686180ef75316a3673be8eb6ec82744a9c378ca87ae78ece193c7a6587e6a5f` | served |
| `/registry.json` | 200 | `817cb9d4c66e3afaf84f1c55db97ee6e22cd72f8d82a6083b01d5c99b38f860b` | unchanged registry |
| `/deals_feed.json` | 200 | `82b1e571432adf4d6cdc0c5edda41ba8213d3644ba2eb4dbd3b1034453229f03` | `environment: PRODUCTION_SERVED_VERIFIED` |
| `/jayt_storefront_sprint_b.js` | 200 | `21517971dd37441ed185ae66e3cff672fc9e3efd5bbbd1bfa2a33f25c325933b` | served |
| `/styles.css` | 200 | `500d04a2cec4e87374d1a7e029f8fd31bb0394a0bdb150b210539ed46c783a49` | served |

The hotfix satisfies Article 1: the production environment label is corrected while the 87-entry registry and the 40-record / 29-public-offer feed scope are retained. The supplied rollback-drill receipt has a valid local SHA sidecar and records RTO 11.284 seconds to v3.428.0, then 8.040 seconds returning to hotfix v3.429.0. The current alias probe confirms the return state; the historical alias transitions themselves are accepted as executor evidence, not re-observable facts.

The Batch 19 replay independently completes with all raw/meta sidecars and 12 negative/regression tests passing. Its substantive outcome is **0 VERIFIED / 10 HELD** and two discovery records pending. That is a valid fail-closed evidence result, not completion of Article 3's eight-offer target.

## Go-Live gate findings

The rerun of `audit_jayt_360_live.cjs` against current live bytes returns `FAIL`. The observed facts are:

1. At 1440, 768 and 390 px, runtime produces 24 civic cards at HOME, 29 Voucher cards, and 15 Radar cards; it reports no console/page runtime error or horizontal overflow in the tested routes.
2. `SPPGALAXY09` is exposed through a Copy button, but `/deals_feed.json` contains no bound `code` or `public_code` field for it. Its production provenance is therefore not established by the served contract.
3. The split surface exposes 26 priced controls, rather than the release requirement's 25. Arithmetic passed for the 26 tested values, but the count mismatch remains open until the additional item is identified and the authoritative test roster is corrected.
4. A synthetic payer marker is included in the Zalo preview and clipboard export. The test found no request leak, no storage write and no GPS call in the exercised flow, but this still fails the stated Zero-PII export condition.
5. Thirteen Radar links returned HTTP 200 in the current runner; two Phi Long URLs failed transport fetch. The evidence does not establish 15/15 HTTP 200 at this time.

## CEO ruling

Accept the Article 1 production hotfix and accept the rollback drill as executed evidence. Do **not** accept Article 2 as 100% PASS. Do **not** accept Article 3's eight-of-ten target. v3.430.0 remains prohibited and the comprehensive Go-Live remains blocked.

The canonical current receipt is `07_QUALITY_ASSURANCE/runtime_evidence/JAYT_360_LIVE_RUNTIME_AUDIT_RECEIPT.json`; it was regenerated from current production during this review. Its prior SHA sidecar is no longer authoritative because the runner creates a fresh timestamp and result on each run.
