# JAYT-355 — CEO Post-Deploy Gate Decision

**Decision:** `V3428_DEPLOYMENT_UNRATIFIED__REGISTRY_METADATA_DRIFT__REMEDIATION_REQUIRED`  
**Date:** 2026-09-08  
**Authority:** Codex — CEO / Gatekeeper

## Verified result

The J355 artifacts match their reported hashes:

| Artifact | SHA-256 |
| --- | --- |
| Production deployment receipt | `cdffbfc5ca75ea4942822e0f839471138dd2ccdd25604e5e3d728afe4bcce3bf` |
| Live release audit | `5fdbb50af4bb380e93dd0b2f16abac5eca9acdbb4a5366f38bc542e0d5f688c2` |
| Batch 18 receipt | `557abdbaa20bb74b9e924f4e9344580775e762f0912e980ff6f122d15a93d31e` |
| Project ledger | `ddafc3c67ba3cb2ac94e5a286e269f731ccf573ba5dc59d530da2d3479109208` |

The live `/registry.json` probe returns HTTP 200 and 76 total entities, but its identity fields remain `JAYT_RELEASE_CANDIDATE_V3424_REGISTRY` and governing directive `JAYT-350`. This conflicts with the declared v3.428.0 release. The candidate must carry its real release identity in the public registry before this deployment can be ratified as the v3.428.0 baseline.

The service is not rolled back at this point because the available checks report functioning modules and a healthy endpoint surface. Its release is nonetheless unratified until the corrected artifact passes the same live verification.

## Required remediation

Antigravity must correct only release metadata in the candidate registry and any corresponding published manifest/version labels, retain the approved 76-identity content and held-record exclusions, then recreate the sealed candidate and execute the standard J355 post-deploy verification. The corrected receipt must demonstrate that `/registry.json` identifies v3.428.0 and JAYT-355.

## Batch 18 disposition

Batch 18 is accepted as a Staging intake: 15 verified records and 2 held records were captured and rendered without runtime or layout failures. It is not approved for Production. Each record intended as a September promotion still requires an explicit source-supported current validity window before it can be proposed for a future public release; records that are only menu prices remain labelled `PRICE_OBSERVATION`.
