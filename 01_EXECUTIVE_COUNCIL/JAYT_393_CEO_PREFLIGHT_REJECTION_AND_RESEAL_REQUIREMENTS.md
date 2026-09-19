# JAYT-393 — CEO Preflight Rejection and Reseal Requirements

**Date:** 2026-09-11  
**Decision:** `DUAL_KEY_DIRECTIVE_RECEIVED__RELEASE_PREFLIGHT_REJECTED__NO_PRODUCTION_MUTATION`

## Authority received

JAYT-393 is recorded as the written Chairman sponsor pass and Strategic Advisor technical pass for the *approved Wave 1 scope only*: Galaxy Happy Day, Metiz Helio U22, and the non-affiliate Candidate Radar boundary.

## Independent preflight result

The requested artifact `v3.446.0-j392` is absent from `08_RELEASE_VAULT/candidates/`. The only v3.446 candidate present is `v3.446.0-j390`; it is not interchangeable with a J392 release.

The current `PIPELINE_SEAL_MANIFEST.json` also fails its own strict verification: **22/24** sealed components match. The two mismatches are expected consequences of R5's accepted remediation, but still prevent a truthful seal:

- `scripts/j392_scheduler_runner.cjs`: expected 2,415 bytes / `d10d…`, actual 5,898 bytes / `380A94F1B618532C349EC4E587845FD251FD4A4D613B7F58946D241AE6775B19`.
- `07_QUALITY_ASSURANCE/runtime_evidence/j392_scheduler_run.log`: expected 1,583 bytes / `4d8d…`, actual 3,160 bytes / `0744605225F61AFB5BDCD2E264ADCCF8A63DBD566F5E5F5317C142A2D5B4DCD9`.

## Required reseal package

Before an alias mutation, submit a sealed `v3.446.0-j392` candidate containing only the authorized Wave 1 and Candidate Radar scope, a candidate manifest with hashes, and an updated pipeline manifest that:

1. records JAYT-393 as both written authorization references;
2. binds the current R5 runner and append-only scheduler log hashes; and
3. passes `scripts/verify_pipeline_seal.cjs` with no drift.

No production deployment, alias change, affiliate activation, or substitute promotion of `v3.446.0-j390` was performed. `affiliate_enabled` remains `false`.

