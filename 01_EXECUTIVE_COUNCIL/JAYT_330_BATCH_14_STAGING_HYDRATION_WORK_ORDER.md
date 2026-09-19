# JAYT-330-R2 — BATCH 14 STAGING HYDRATION WORK ORDER

**Issued:** 2026-09-07T04:40:45.1204090Z  
**Authority:** CEO / Executive Council  
**Scope:** Staging-only commercial catalog hydration; Production deployment is forbidden.

## Authorized artifact

- Package: `06_TRUST_AND_EVIDENCE/batch_14_catalog_vault/BATCH_14_CATALOG_ACCEPTANCE_PACKAGE.json`
- Authorized SHA-256: `4daadbcd4115d0d878dc66410173629cee8590dd8e7069416579c6767be0b9b0`
- Approval: `06_TRUST_AND_EVIDENCE/batch_14_catalog_vault/BATCH_14_CATALOG_PUBLIC_APPROVAL_STAGING_ONLY.json`
- Authorized rows: 22 total, consisting of 18 `NEW` and 4 `UPDATE_EXISTING` rows.

## Antigravity execution order

1. Implement a repository-owned Batch 14 hydration runner. Do not use a scratch-directory script as the release runner.
2. Before mutation, recompute the package SHA-256 and fail closed unless it exactly equals the authorized hash above. Do not rerun the catalog-generation runner after this signature.
3. Apply the four `UPDATE_EXISTING` mappings in place and insert the eighteen `NEW` cards exactly once. The expected final commercial Staging catalog is 22 unique cards.
4. Preserve source URLs, raw-source hashes, observation disclaimers and geographic qualifications verbatim. Render Galaxy as a `FROM_PRICE`; render Phuc Long as a `MEMBER_POLICY` without a numeric price; keep Metiz locality `UNVERIFIED`.
5. Reject any affiliate URL, tracking parameter, duplicate ID, missing disclaimer, package drift or unexpected card count.
6. Serve and audit Staging on port 4176 at desktop, tablet and 390px mobile viewports. Verify HTTP 200, 22 unique cards, zero console/runtime errors, zero horizontal overflow and usable keyboard/touch interaction.
7. Emit `07_QUALITY_ASSURANCE/runtime_evidence/STAGING_BATCH_14_HYDRATION_RECEIPT.json` containing pre/post catalog hashes, the 22 rendered IDs, DOM results and explicit confirmation that Production was not modified.

## Immutable production boundary

Production remains frozen at `v3.422.0` with 24 public non-commercial cards. This work order provides no Production release or deployment authority.
