# Wave 2 DanaBus — CEO R1 Evidence Acceptance and Fare Validity Hold

**Date:** 2026-09-11  
**Decision:** `DANABUS_PROCEDURE_AND_LOCALITY_ACCEPTED__FARE_CLAIM_HELD__STAGING_ONLY`

## Verified evidence

Independent disk replay passed every recorded SHA-256, byte length, and UTF-8 quote offset for the three submitted HTML/PNG pairs.

Accepted for a non-commercial, staging-only DanaBus utility:

- The official registration page describes monthly-ticket registration, student-priority documentation, and QR-code fulfillment.
- The official Danabus site identifies the Da Nang intelligent transport operations center.
- The official site identifies a subsidized bus system.

## Fare hold

The submitted `45.000đ/month` priority and `90.000đ/month` ordinary fare quote is byte-valid, but its source page is dated **04/04/2020**. The capture includes current 2026 page chrome, not a source-level 2026 validity statement for that fare.

Therefore no public current-price, student-savings, or fare-comparison claim is authorized from this capture. The fare must remain `HELD_STALE_SOURCE` until an official source explicitly establishes current applicability or a current effective period.

## Boundary

- Staging only; no Production or alias mutation.
- Affiliate remains disabled.
- The next capture may proceed to Spotify Student, while DanaBus price evidence is refreshed separately.

