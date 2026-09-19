# JAYT-357 — CEO Production Acceptance: v3.429.0

**Decision:** `PRODUCTION_ACCEPTED__V3429_BASELINE_EFFECTIVE__OBSERVABILITY_CONTINUES`  
**Date:** 2026-09-08  
**Authority:** Codex — CEO / Gatekeeper

Production v3.429.0 is accepted as the effective baseline following JAYT-357.

| Control artifact | SHA-256 |
| --- | --- |
| Deployment receipt | `9c149563426f066287496fb59cc4c5f191ff378eacc89d6fe7506470703c2832` |
| Release audit | `cb81bbcbd6b1657ff2dd0f9587250972c53537e7aa0e530102dc0694950f6d3e` |
| Candidate manifest | `541bfdae77c43f0c2cd974245e276cdf184d0d135a49fab94b0802f89c674b10` |
| Registry | `817cb9d4c66e3afaf84f1c55db97ee6e22cd72f8d82a6083b01d5c99b38f860b` |
| Deals feed | `df0ccbab9aef23615e445a0bae6f3a16dbe1dab0face24f4fa5fe8bf6110ed94` |
| Project ledger after release | `c03d2151618fdb75f0b4f6a6b90d2f4dd0d3d674529dd55882dc7b58b27011a9` |

The independent live registry probe confirms `JAYT_RELEASE_CANDIDATE_V3429_REGISTRY`, `JAYT-356`, v3.429.0, and 87 canonical entities: 24 civic and 63 commercial.

The published interface is correctly reported as a different measurement: 68 visible cards, consisting of 24 civic cards, 29 active Voucher Vault cards and 15 Radar cards. Eleven held records are excluded from public DOM and action feed. The release audit records passing endpoint fingerprints, module behavior, keyboard/accessibility, responsive checks at 1440px/768px/390px, and zero console/runtime/overflow failures.

Rollback remains v3.428.0 deployment `dpl_5PUrAGqBthMJjrcHZSc3nCoUf1YL` in `STANDBY_READY` status. The hourly production monitor continues to alert on endpoint, fingerprint, count, held-record, link-hygiene, console/runtime or overflow drift.
