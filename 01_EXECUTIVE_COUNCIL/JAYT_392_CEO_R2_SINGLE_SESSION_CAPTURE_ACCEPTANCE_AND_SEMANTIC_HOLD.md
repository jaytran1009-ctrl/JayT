# JAYT-392 — CEO R2 Single-Session Capture Acceptance & Semantic Hold

**Date:** 2026-09-11  
**Decision:** `SINGLE_SESSION_CAPTURE_INTEGRITY_ACCEPTED__OFFER_VALIDITY_SEMANTICS_HELD__NO_PRODUCTION_MUTATION`

## Accepted evidence integrity

Two new first-party captures are accepted as coherent forensic artifacts:

- `METIZ_HELIO_U22_2026_20260911T072038`: HTTP 200 at `metiz.vn`; HTML and PNG were captured between `07:20:38Z` and `07:20:43Z`, and their stored hashes match the receipt.
- `GALAXY_DANANG_STUDENT_2026_20260911T072043`: HTTP 200 at `galaxycine.vn`; HTML and PNG were captured between `07:20:43Z` and `07:20:49Z`, and their stored hashes match the receipt.

This resolves the earlier mismatch between the HTML and screenshot capture sessions for the two refreshed artifacts. It does not, by itself, prove a commercial offer is current.

## Semantic gate findings

The collector labels its four excerpts as `VERIFIED_PASS`, but its candidate definitions show that the required validity predicate is not satisfied:

- Metiz labels the film title `NGHỈ HÈ SỢ NGHỈ HƯU (T13)` as the validity quote for the U22 55,000đ offer.
- Galaxy labels the film title `Hộ Linh Tráng Sĩ - Bí Ẩn Mộ Vua Đinh` as the validity quote for the U22-from-45K offer.

Neither quote establishes that the corresponding U22 programme, price, eligibility rules, or Da Nang applicability is live in September 2026. A current film listing is independent of the promotion's validity. The two extracted quotes are therefore byte-bound but semantically irrelevant to the required validity predicate.

Additional observations:

- Metiz's retained locality quote is a `0236` hotline, not an explicit Helio/Da Nang venue statement.
- The existing Wave 1 validator still checks string-offset/hash mechanics only. It does not validate predicate meaning, evidence date range, same-offer relation, or venue relation; its `5/5 PASS` is not a release authorization.
- The collector overwrites canonical evidence paths and then refreshes hashes in the evidence index. This is permitted for candidate evidence, but requires a reviewed immutable manifest before any release decision.

## Gate result

- Single-session evidence integrity: **accepted** for the two listed artifacts.
- Two current core offers (Metiz Helio and Galaxy Da Nang): **0 proven / 2 required**.
- `is_approved`, production deployment, canonical alias mutation, and affiliate activation: **false / unauthorized**.
- Canonical production remains `dpl_EY8hrscg5f1tRCG9WeKsHGfSJXUM` (`v3.444.0-j388`).

## Required next evidence

For each core brand, capture a first-party source that expressly binds the *same* offer to either an unexpired date range covering 11 September 2026 or an explicit currently-effective statement, plus the exact Da Nang venue and eligibility/terms. The validity quote must contain that offer's effective period or active status; a film title, generic schedule, page response date, or capture timestamp is not a substitute.
