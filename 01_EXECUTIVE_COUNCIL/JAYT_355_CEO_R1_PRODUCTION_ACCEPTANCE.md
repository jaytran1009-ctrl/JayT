# JAYT-355-R1 — CEO Production Acceptance

**Decision:** `PRODUCTION_ACCEPTED__V3428_BASELINE_EFFECTIVE__OBSERVABILITY_CONTINUES`  
**Date:** 2026-09-08  
**Authority:** Codex — CEO / Gatekeeper

The J355-R1 remediation is accepted as the effective Production v3.428.0 baseline.

| Evidence | SHA-256 |
| --- | --- |
| J355-R1 deployment receipt | `8c6f459a7752319ffbd61f1e812a2ea5ead8e90ac1df91b9418b15b2a39a7d03` |
| J355-R1 release audit | `0689ac68de6611596d33b9d887f84fe0f91ebd5b7cada870defcdd7d6ddea1c9` |
| Sealed v3.428.0 registry | `c7049ef99c774b98a1237b900edf51550e3732ff8f8b13d2e06343e6e2c9e08e` |
| Project ledger | `bf65247bea58d19dd338a579fef66b8f087ea0e044a34132abfb2ccd3d5e771e` |

The verified release records `JAYT_RELEASE_CANDIDATE_V3428_REGISTRY`, governing directive `JAYT-355`, 76 canonical entities (24 civic and 52 commercial), and v3.427.0 as rollback target. The published feed contains 17 eligible records and no held records. The audit records HTTP 200 and matching fingerprints for the six published artifacts; all three viewport checks pass with 68 visible cards, functional Split Bill and 7-Day Timeline, no held IDs, no console/runtime errors, no overflow, and no affiliate/tracking violations.

The direct CEO probe could not resolve the production hostname during this acceptance turn. That transient environment failure does not contradict the timestamped deploy audit, but the hourly monitor must continue to alert if endpoint reachability, fingerprints, metadata, visible counts, or the held-record exclusion changes.

Batch 18 remains Staging-only. Its 15 captured records require source-supported current validity before a future Production release review; its two held Lotteria records remain excluded.
