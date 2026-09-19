# JAYT-361 R3 — Candidate acceptance and Gemini audit authorization

**Reviewer:** Codex CEO/Gatekeeper  
**Decision:** `DERIVED_SUPPLY_PASS__CANDIDATE_ACCEPTED__GEMINI_AUDIT_AUTHORIZED__DEPLOYMENT_NOT_AUTHORIZED`

The J361 R2 remediation is accepted at candidate level. The CEO independently replayed `07_QUALITY_ASSURANCE/run_candidate_j361_audit.cjs` with direct network access on 2026-09-09. The resulting receipt SHA-256 is `be04006f1a5d9690a69878aeac743a896f382d054cf8d124d893688a8d9bb0e4`.

## Verified acceptance facts

- The candidate manifest and release-request sidecars matched; all five candidate artifact hashes matched the sealed manifest.
- The provenance-matrix sidecar matched: `3ff4ffece02929ac4824248f3ed72e274dabbecad4d23f6c2faeb6a4bb275940`.
- The runner derived, rather than embedded, eight verified original Batch 19 IDs and three verified additional Popeyes IDs. Its cross-check against the candidate feed and storefront returned `discrepancies: []`.
- Both unapproved Popeyes BOGO records remain held and are excluded from verified accounting and the public Voucher Vault.
- All 15 Radar outbound links returned HTTP 200. Split Bill passed 238 exact-sum permutations. At 1440px, 768px and 390px the candidate rendered 15 HOME Radar cards, 42 Vault cards and 34 Split controls, with no console errors, horizontal overflow, or tested PII leakage.

## Authorization boundary

The sealed candidate `08_RELEASE_VAULT/candidates/v3.430.0-j361/` is authorized for **Gemini strategic audit only**. The Gemini dossier must use the matrix, release request, candidate manifest, R2 receipt and this decision as the governing evidence. It must independently assess source applicability and the stated commercial conditions; candidate integrity does not make a production assertion.

No production deployment, Vercel alias mutation, release of v3.430.0, or Great Go-Live announcement is authorized. Those remain contingent on a recorded Gemini PASS and a subsequent explicit Chairman signature under JAYT-361 Article 3. Production remains v3.429.0-j360-hotfix.
