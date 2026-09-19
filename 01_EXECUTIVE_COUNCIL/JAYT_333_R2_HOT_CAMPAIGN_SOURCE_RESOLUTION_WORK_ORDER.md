# JAYT-333-R2 — Hot Campaign Source Resolution Work Order

**Status:** ACTIVE — STAGING-ONLY / ZERO PRODUCTION AUTHORITY  
**Issued:** 2026-09-07T06:57:00Z

## Objective

Resolve the remaining official-source gaps without blind retry, synthetic voucher codes, inferred prices or duplicate cards.

## Dispatch

1. **Data & Trust — Jollibee replacement:** derive a current 2026 official promotion leaf from the retained official category raw. Submit only a leaf whose HTML contains an explicit offer/price, conditions and validity evidence. Image filenames alone are not price evidence.
2. **Lead Operator — Galaxy U22:** perform one human-browser attachment from `https://www.galaxycine.vn/u22/` because automated capture produced no bytes. Store the unmodified body and sanitized response headers; do not substitute search snippets or screenshots for raw HTML.
3. **Data & Trust — Metiz locality:** locate an official Metiz contact/venue leaf containing a verbatim physical Đà Nẵng address. The U22 offer remains an existing card and must not be duplicated. Until locality evidence passes, keep `B14_METIZ_U22_2D` excluded from the locality-qualified count.
4. **QA:** validate SHA-256, HTTP status, source/leaf identity, exact or entity-decoded visible spans, validity and duplicate identity. Entity decoding may establish visible text but must never change or regenerate raw bytes.

## Exit Criteria

- Each candidate receives an item-level PASS, HOLD, DEDUP or QUARANTINE verdict.
- No new card is rendered without a separate Staging-only approval.
- Affiliate links, tracking parameters and synthetic voucher codes remain zero.
- Production `v3.422.0` remains immutable; `v3.423.0` stays pending a separate M4 Commercial Decree.
