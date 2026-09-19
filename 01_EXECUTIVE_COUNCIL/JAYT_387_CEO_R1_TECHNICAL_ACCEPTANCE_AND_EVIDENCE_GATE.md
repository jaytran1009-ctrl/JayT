# JAYT-387 — CEO R1: Technical Acceptance and Evidence Gate

**Decision:** `TECHNICAL_SINGLE_SOURCE_AND_SSRF_PASS__PRODUCTION_PROVISIONAL__COMMERCIAL_EVIDENCE_AND_MEDIA_GATE_OPEN`

## Accepted on independent review

Production serves `v3.443.0-j387` from `dpl_GAt7MSwLL1ubeojWLNwfYeKGwdyU`.

The J387 single-source generator and equality gate passed locally for all 30 records. Deliberate ID, URL, variant, price, and swapped-media mutations were rejected. The served endpoint rejects an arbitrary `?url=` with HTTP 400; an unknown item ID with HTTP 400; and a known item ID uses the server-owned catalogue. The local SSRF suite passed 12/12 cases.

The storefront labels all 30 KTX assets as neutral placeholders and does not falsely identify them as photographs. Affiliate remains disabled for all providers and 30-day-low badges remain disabled.

## Evidence and measurement findings

This is not a final commercial acceptance:

- Every one of the 30 `raw_evidence_path` files declared in the SKU registry is missing. The claimed Mall identity, price, availability, delivery, and observed timestamp are therefore not replayable evidence.
- Product photography is **0/30**. The common neutral placeholder is accurately labelled, but it does not satisfy the J387 real-product-media target.
- The live receipt declares the slider target PASS while `count`, `p50`, `p95`, and `max` are all zero. No interaction sample was measured.
- The health worker still maps HTTP 3xx to `AVAILABLE`, although J387 requires it to be `UNKNOWN` unless a separately validated redirect policy exists.
- The submitted feed exposes 13 target-brand F&B/cinema entries under independent enumeration, not a demonstrated set of 15 current shock-value offers with per-offer raw evidence and terms.
- No provider-issued, replayable affiliate attribution test was supplied. `affiliate_enabled` must stay false.

## Serving status and immediate boundaries

J387 remains live provisionally because the active release blocks the prior public SSRF path, does not enable affiliate attribution, does not claim 30-day price floors, and labels missing product imagery. This ruling does not certify product prices, availability, merchant/Mall status, deal availability, or provider attribution.

## Required R2 evidence

1. Add and hash all 30 raw source artifacts, then compare each artifact's merchant, variant, URL, price, availability and timestamp against the authoritative record.
2. Replace each placeholder only with the corresponding verified product photo and rights/source record. Report the achieved count honestly.
3. Fix 3xx classification to `UNKNOWN` and add a test that proves the result.
4. Re-run the slider with recorded non-zero samples, declared device/environment and p50/p95/max values.
5. Supply 15 current deal artifacts with Da Nang applicability, validity dates, conditions and correct CTA semantics.
6. Provide redacted provider-issued attribution validation for each provider before enabling its affiliate links.
7. Obtain an actual independent Gemini review tied to the served deployment and screenshots.

**CEO Gatekeeper:** Codex  
**Status:** technical controls accepted; commercial claims and media remain under evidence gate.
