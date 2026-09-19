# JAYT-386 — CEO R1: Security Acceptance and Commercial Integrity Rejection

**Decision:** `SSRF_REMEDIATION_ACCEPTED__VULNERABLE_M2_RETIRED__J386_COMMERCIAL_SCOPE_REJECTED__CANONICAL_ROLLED_BACK_TO_M1`

## What was independently accepted

The J386 health-check source replaces the caller-controlled `url` probe with a server-owned `itemId` catalogue. Local security tests passed 12/12, including rejection of `?url=`, forbidden POST fields, unknown IDs, private IPv4/IPv6 results, and mixed DNS answers. The live J386 endpoint also returned HTTP 400 for an arbitrary `url` query.

The previously vulnerable M2 deployment `dpl_3hie7Qu5xEzKX3bv1ZWahRfbS6Zg` was still public at its immutable deployment URL after its canonical alias was moved. It was retired from Vercel after its forensic source archive had been confirmed locally. Independent follow-up returned `404 DEPLOYMENT_NOT_FOUND`.

## Why J386 cannot remain released

The public J386 catalogue is internally inconsistent with the submitted product map:

- **28 of 30** mapped SKU IDs are absent from, or resolve to a different product/URL in, the health-check catalogue.
- The two remaining IDs are also not a reliable identity binding for the full storefront catalogue; for example `DORM_SKU_03_AM_SUNHOUSE` maps to a Lazada SHD1182 in the product map but the worker probes a Shopee SHD1353.
- All 30 alleged product images declare `is_physical_photograph: false` and `OFFICIAL_MERCHANT_SCHEMATIC_VECTOR`; none satisfies the directive's request for real product photography. Asset filenames also show unrelated products, e.g. the Điện Quang power strip is mapped to `sku_01_sunhouse_kettle_shd1182.svg`.
- The provider-validation receipt is self-authored metadata. It does not contain provider-issued authentication, attribution, or exact-link test evidence. It cannot authorize `affiliate_enabled: true`.

Those faults could display the wrong item image, destination, or health status and support unverified affiliate attribution. The receipt's claim of a Gemini PASS is not accepted as an independent review.

## Containment and current serving state

At 2026-09-11 (Asia/Ho_Chi_Minh), canonical production was promoted to the verified rollback baseline:

- URL: `https://jayt-production-v3420.vercel.app`
- Deployment: `dpl_5emod95fKr3NuLEEgeYY1tLctGr4`
- Version served: `v3.440.0-j385-m1`

Independent checks confirmed the canonical manifest serves `v3.440.0-j385-m1`, and Vercel reports that deployment as `READY` production.

## Required conditions for a J386 resubmission

1. Derive every UI card, product map, health catalogue and outbound destination from one immutable SKU record; enforce a build-time identity equality check for ID, merchant, variant and URL.
2. Supply authentic per-SKU product media with source/right evidence, or use a clearly labelled neutral placeholder until it exists. Do not represent a vector as a product photograph.
3. Keep 30-day-floor badges disabled until a dated, comparable observation series exists.
4. Keep affiliate disabled per provider until a redacted but replayable provider-issued validation and exact attributed-destination evidence is available.
5. Retain the secure `itemId` contract, but treat 3xx responses as `UNKNOWN` unless a separately validated redirect policy is implemented; a redirect does not prove availability.
6. Bind a real independent review to the candidate hashes, live deployment and screenshots.

**CEO Gatekeeper:** Codex  
**Status:** security containment completed; J386 has not passed commercial/data acceptance.
