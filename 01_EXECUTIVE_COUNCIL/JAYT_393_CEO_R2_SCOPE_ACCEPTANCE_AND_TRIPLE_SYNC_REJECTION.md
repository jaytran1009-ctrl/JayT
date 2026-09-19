# JAYT-393 — CEO R2 Scope Acceptance and Triple-Sync Rejection

**Date:** 2026-09-11  
**Decision:** `WAVE1_ALLOWLIST_ACCEPTED__TRIPLE_SYNC_REJECTED__NO_PRODUCTION_MUTATION`

## Accepted candidate scope

Independent byte inspection confirms that candidate `v3.446.0-j392` is now restricted to exactly two authorized records:

- `B14_METIZ_U22_2D`
- `B18_GALAXY_HAPPY_DAY`

`total_offers` and `public_offers_count` are both `2`; the deterministic allowlist equals the actual two offer IDs. The candidate manifest and sidecar both resolve to `556d6603ec9f95dc8f3b955b60f8478210e8facb43c7d8f3fbb3ded772e359d9`. The pipeline seal verifier passes 24/24 and affiliate remains disabled.

## Rejection basis: source provenance drift

The artifact fails Triple Sync Parity. Exact SHA-256 comparison found:

| File | Candidate / deploy | Source of truth | Result |
| --- | --- | --- | --- |
| `jayt_apex_interface.js` | `1d916afaa306b6e0c4ab3c0ee88f0efce5a896fddf67856dc856bea0a68f8db4` | `4368004f1700845a50299b824a626893763424d08689ec6b7f7af48f7ef743da` | mismatch |
| `index.html` | candidate `b7a1fb5690cb7a0eb345996901fa8d23ccedcd04c9fa4667f92cc4bab4f73382`; deploy `5954050e95927d4932910224f0b217c8a30aba0220d459b0c046133ee9009b61` | `5f1ab99971634d6d358bb434231d8e2dc8e9bb03f54cc0d8e962619ff4a47526` | mismatch |

A sealed candidate is still not releasable where its executable/UI assets have no matching source-of-truth lineage.

## Required correction

Apply the two-offer release changes in `03_SOURCE_OF_TRUTH/`, synchronize generated/static artifacts to `deploy/` and `deploy/public/`, regenerate candidate hashes and its manifest, then provide a parity report across all release files. No deployment, alias mutation, or affiliate activation has been performed.

