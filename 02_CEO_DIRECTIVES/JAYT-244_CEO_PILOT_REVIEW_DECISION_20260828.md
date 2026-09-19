# JAYT-244 — CEO Pilot Review Decision

**Decision:** `M1 UX OBSERVED — NOT ACCEPTED; M2 REJECTED FOR FALSE PROVENANCE; M3 PENDING EVIDENCE`  
**Date:** 2026-08-28  
**Applies to:** JAYT-244 pilot packet v3.401.0.

## Independent findings

### M1 — Community web

The live M1 surface has observable progress: keyword search appears, no-result state exposes reset/report actions, resetting restores results, Radar isolates its content and opens a dialog, and the focused button has a visible 3px outline.

This is **not M1 acceptance**. The CEO has not received independent contrast measurements, full keyboard-only journey traces, 200% zoom verification, screen-reader validation, or proof of expired-state quarantine. Continue M1 remediation and evidence collection.

### M2 — Trusted supply pilot: rejected

`supply_pilot_stratified_sampling_report.json` is not a valid traceback report:

- 8 of its 10 cited bundle IDs do not exist under canonical `03_SOURCE_OF_TRUTH/evidence_bundles/`.
- The 2 cited Radar bundles that do exist have recomputed SHA-256 values different from the report.
- The report supplies source/capture facts for sampled items where the canonical feed does not provide matching values.

The statements “100% khớp” and “SHA-256 tính toán lại tại runtime” are therefore false. No M2 sample, Tier 1–3 claim, daily-supply capacity claim or 43-card evidence claim is accepted from this packet.

### M3 — Affiliate research: pending, not catalog coverage

`accesstrade_readonly_catalog_coverage_method.json` is a policy/method outline. It contains no authenticated scope, page/pagination evidence, catalog enumeration, survey receipt, raw read-only artifact or completeness proof. It must be called a **research plan**, not a catalog-wide survey. The no-link/Radar constraint remains in force.

## Immediate containment and forward-development order

1. Quarantine the invalid M2 sampling report and any derivative metrics/claims. Do not silently edit it or use it as evidence.
2. Create an append-only incident disclosure naming the mismatched/missing IDs and both expected/recomputed hashes.
3. Rebuild M2 traceback from the canonical feed actually rendered in production. Sampling must be reproducible: record random seed/selection method; card ID; existing bundle path; recomputed bundle hash; raw artifact path/hash; source URL; capture time; bound claim; scope; expiry/recheck; reviewer verdict. Missing one component = fail/contain, not substitute data.
4. Implement M3 only as a read-only coverage process. Preserve network/account boundaries; collect receipts without secrets; prove scope/pagination/completeness before saying “toàn catalog”.
5. Continue M1 UI work in parallel, but submit measured WCAG 2.1 AA and keyboard/modal/zoom evidence before seeking M1 acceptance.

## Governance status

`ACTIVE — M0 CLOSED; M1 REMEDIATION/EVIDENCE PENDING; M2 REJECTED_AND_REBUILD_REQUIRED; M3 RESEARCH_PLAN_ONLY`.

No update to PROJECT_MEMORY may say CEO acceptance, M2 pass, catalog-wide coverage, or Full Go-Live. The next Council meeting must submit one incident-aware recovery plan covering M1, M2 and M3 together.
