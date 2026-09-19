# JAYT-393 — CEO R1 Candidate Scope Rejection

**Date:** 2026-09-11  
**Decision:** `DUAL_KEY_SEAL_ACCEPTED__CANDIDATE_SCOPE_REJECTED__NO_PRODUCTION_MUTATION`

## Accepted preflight facts

- `PIPELINE_SEAL_MANIFEST.json` verifies **24/24** sealed components in both workspaces.
- The manifest records both JAYT-393 approval references and status `SEALED_DUAL_KEY_VERIFIED`.
- Candidate `08_RELEASE_VAULT/candidates/v3.446.0-j392/` exists in both workspaces and its `candidate_manifest.json` matches its SHA-256 sidecar: `3f99b1215172edfc2d7eca84170f273d548fdadb9f4b27e452b3103da4e0c6cf`.

## Rejection basis

JAYT-393 authorizes only the two accepted Wave 1 cinema offers (Galaxy Happy Day and Metiz Helio U22) plus a non-affiliate Candidate Radar boundary. Independent parsing of the candidate's own `deals_feed.json` found **81 offers**, including unrelated Jollibee, Phúc Long, Highlands, CGV, Starlight, Pizza Company, Gong Cha, Katinat, Popeyes, and duplicate/other cinema records.

The build is consequently not within the authorized release boundary. A valid seal proves file integrity, not that the sealed content matches the authorization scope.

## Gate result

No Vercel deployment or canonical alias mutation was performed. `affiliate_enabled` remains `false`.

Antigravity must build a new candidate with a deterministic release allowlist of exactly the two accepted offer IDs, prove the rendered and served feed has count `2`, and reseal the resulting artifacts before resubmission.

