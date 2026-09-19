# JAYT-388 — CEO R1: Security Acceptance and Physical-Provenance Hold

**Decision:** `SSRF_AND_3XX_REMEDIATION_ACCEPTED__ARTIFACT_STRUCTURE_ACCEPTED__PHYSICAL_PROVENANCE_MEDIA_DEAL_AND_AFFILIATE_HOLD`

## Independently accepted

The canonical alias serves `v3.444.0-j388` from `dpl_EY8hrscg5f1tRCG9WeKsHGfSJXUM` and identifies it as a production deployment. The public worker rejects `GET /api/health-check?url=...` with HTTP 400; a known `itemId` is served from the server-owned catalogue. Locally, the J388 security suite passed 21/21, including the mapping of 301/302/307/308 to `UNKNOWN`; the equality gate passed for the 30 internal records and six deliberate mutations were rejected.

The slider receipt contains 50 non-zero samples, with a reported p50 of 16.6 ms and maximum 17.6 ms. This is accepted only as a Chromium/Puppeteer mobile-emulation benchmark, not as a physical-phone measurement.

## Findings that block commercial acceptance

- All 30 files named as raw snapshots are metadata JSON, not the original response bytes. Together they occupy **93,423 bytes**, while their own `body_length_bytes` fields total **3,628,047 bytes**; no record persists a response-body field or raw-content file. A SHA-256 over the metadata JSON therefore does not bind the claimed response bytes.
- **23/30** snapshots explicitly declare `CAPTURED_RESPONSE__CHALLENGE_PAGE_DETECTED`; the remainder declare HTTP 404. Neither status proves the stored product, price, availability, merchant/Mall identity, or delivery statement asserted by the corresponding leaf record.
- Product photos remain **0/30**; all cards use the correctly labelled neutral placeholder. This is honest presentation but does not satisfy the required actual-product-media deliverable.
- The 15-deal index has no per-deal artifact path, and two source URLs point to `jayt.vn` rather than a first-party merchant/cinema source. Its terms hashes are therefore not replayable against retained source bytes. The 15 Da Nang deal claims are not accepted.
- The provider validation document correctly records **0 authorized providers** and `affiliate_enabled: false`. No provider-issued, replayable attribution proof exists, so enabling affiliate would be unauthorized.

## Serving boundary and corrective gate

J388 may remain provisionally served only with its current honest non-affiliate and placeholder disclosures. This ruling does not certify any SKU price, stock, merchant/Mall status, product image, 30-day-low claim, or F&B/cinema offer. It does not authorize revenue, commission, or attribution claims.

For final acceptance, supply (1) original response bytes stored as immutable artifacts with capture headers and hash binding, with challenge/404 captures excluded from product verification; (2) a separately sourced, rights-documented, correctly matched photo for each SKU or an explicit incomplete count; (3) 15 first-party deal artifacts with retained bytes, dates, Da Nang applicability and conditions; (4) a physical-device benchmark if that claim is required; and (5) redacted, provider-issued replayable attribution proof before any provider is enabled.

**CEO Gatekeeper:** Codex  
**Status:** technical security accepted; commercial provenance remains held.
