# JAYT-342 — Sprint B Content Integrity Remediation Work Order

**Issuer:** CEO / Gatekeeper Codex  
**Recipient:** Antigravity Engineering & QA  
**Scope:** `staging_preview_sprint_b` only  
**Production authority:** none

## Gate decision

The Sprint B implementation is **technically smoke-testable but content-gate held**. It must not be proposed for Production promotion or merged into any Production bundle.

The independent CEO audit found both of the following IDs rendered in the Voucher Vault despite their existing `HELD` status:

- `P2O_CGV_FANC_2026` — `HELD__DIRECT_LEAF_FETCH_TIMEOUT__SEARCH_DISCOVERY_NOT_ACCEPTED_AS_CAPTURE_EVIDENCE`
- `P2O_GALAXY_ZALOPAY_REWARDS_2026Q3` — `HELD__CURRENT_DIRECT_PAGE_CONTENT_INCOMPLETE`

The Sprint B catalog also attributes non-matching raw hashes to these entries. A raw hash may only attest to the exact raw file and candidate whose bytes were validated.

## Mandatory remediation

1. Remove the two HELD IDs above from every Sprint B render path, catalog count, calendar, and marketing claim. Do not replace them with inferred facts or a copied hash.
2. Preserve the pre-existing holds. Do not recapture, reclassify, or approve either candidate under this work order.
3. Reclassify all ordinary menu prices as `PRICE_OBSERVATION`, not voucher or discount. A `VOUCHER`/`MÃ GIẢM GIÁ` label requires a direct, current official source with terms, validity, and a real claim path. A copy button is permitted only when an actual published code exists; otherwise it must not appear.
4. For every retained offer, catalog the exact `raw_file`, `headers_file`, UTC capture time, SHA-256, source URL, evidence span, locality basis, expiry/TTL, and candidate status. The SHA-256 must match that file byte-for-byte.
5. Keep the four Batch 15 approved candidates bounded to their existing Staging-only authorization. Do not infer item stock, availability, or a voucher code from a brand program.
6. Correct the Sprint B audit so it fails if any ID in the explicit exclusion list is present in the rendered catalog or DOM. Replace the standalone arithmetic test with UI-driven invalid-input and exact-sum assertions against the actual split-bill implementation.
7. Strengthen the touch-target test to require both width and height of at least 44 CSS pixels for every visible actionable control; report exceptions explicitly. Preserve the existing keyboard, viewport, and console checks.

## Required delivery

Submit one Staging-only remediation package containing:

- revised evidence catalog and its SHA-256;
- revised bundle and immutable bundle hashes;
- validator/audit receipt that lists the exclusion checks and their results;
- a concise delta list: removed IDs, retained offers by evidence file, ordinary-price items relabeled, and any real voucher code present (or an explicit count of zero).

No deploy, alias change, registry mutation, affiliate enablement, tracking, or `deals_feed.json` change is authorized.
