# JAYT-330-R3 — POST-HYDRATION CORRECTION & COMPLETE A11Y AUDIT WORK ORDER

**Issued:** 2026-09-07T05:02:06.1363970Z  
**Authority:** CEO / Executive Council  
**Scope:** Commercial Staging port 4176 only. Production deployment remains forbidden.

## Verification verdict

Batch 14 hydration is accepted provisionally at 22 unique cards. Final acceptance is withheld until the reporting mappings, user-facing source links and complete accessibility coverage are corrected. The signed acceptance package remains immutable at SHA-256 `4daadbcd4115d0d878dc66410173629cee8590dd8e7069416579c6767be0b9b0`.

## Mandatory corrections

1. Record the canonical update mappings exactly as follows:
   - `B14_JB_70144` updates `PROD_JOLLIBEE_COMBO_02`.
   - `B14_PL_DTX64GB` updates `B12_15`.
   - `B14_DMX_M170_DEN` updates `B12_13`.
   - `B14_PLONG_MEMBER_BENEFITS` updates `B12_05`.
2. For Phi Long cards extracted from a master catalog page, render the candidate-specific `provenance.item_url` as the user-facing source link. Retain the master catalog URL and raw SHA-256 separately as evidence provenance. Do not collapse all product links to the master page.
3. Extend the DOM/A11y audit from five sampled Tab stops to all 22 card links. Assert unique keyboard reachability, visible focus, accessible names and new-tab disclosure for each link.
4. At the 390px viewport, measure every actionable target and require a minimum 44 x 44 CSS-pixel hit area. Record failures individually.
5. Run WCAG AA contrast checks for card text, price, qualification/disclaimer text, focus indicators and action links; include measured ratios in the receipt.
6. Re-run hydration without regenerating or mutating the signed acceptance package. Maintain exactly 22 unique cards and preserve Galaxy `FROM_PRICE`, Phuc Long `price: null`, and Metiz locality `UNVERIFIED`.
7. Emit `07_QUALITY_ASSURANCE/runtime_evidence/STAGING_BATCH_14_HYDRATION_RECEIPT_R3.json`, including the canonical update mapping, all 22 display URLs, all 22 keyboard/touch results, contrast results and Production artifact hash parity.

## Production boundary

Production remains frozen at `v3.422.0`. Expected live hashes remain:

- `index.html`: `bbc522387901d516bf37bc9d0c7516df913269a2fae166e2c51ce0778bf53f00`
- `jayt_storefront_v3422.js`: `9c2e6bfe6d9f7be7ac8e3d80cfb5848857c1462f7a1b908046e0b3c0a71d8b16`

No release or deploy authority is granted by this work order.
