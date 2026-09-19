# JAYT W3 — Production Go-Live & Track 1 Hold

**Directive:** `CHAIRMAN-SUPREME-MANDATE-2026-0911-W3-PROD-AND-AFFILIATE`  
**Decision:** `W3_PRODUCTION_LIVE__TRACK1_COMPLIANCE_PREPARED__AFFILIATE_HELD`

## Production decision

The sealed candidate `v3.448.0-w3` is live on the canonical Production alias.

- Canonical URL: <https://jayt-production-v3420.vercel.app>
- Production deployment: `dpl_FVrUNSADMUQore2umH5VyywADiXS` (`READY`).
- Live audit: 8/8 served static assets returned HTTP 200 and matched the candidate SHA-256 values.
- `published_manifest.json` serves `v3.448.0-w3`; both accepted Wave 1 cinema offers remain present.
- The active content includes the user-driven lunch comparison, KTX stack simulation, Spotify Student conditions, and DanaBus procedure with its fare-source hold.

The initial W3 deployment `dpl_71EgFU7n6mtPXDmrvJUtRR33GWPQ` was not accepted because its served root HTML retained a staging version marker. It was immediately superseded by the corrected deployment above. The final audit passed before this decision was recorded.

## Track 1 boundary

The Track 1 compliance pack and a field-test plan have been prepared. They do not activate a commercial program.

- `affiliate_enabled=false` in Production and every sandbox artifact.
- No affiliate URL, tracking parameter, sub-ID, redirect, commission claim, or revenue attribution exists.
- `dispatchSmartAffiliate()` remains a non-dispatching guard that returns pending-authentication state only.
- A written provider authorization, approved parameter schema, privacy/disclosure approval, replayable explicit-click test, and separate runtime approval remain mandatory before activation.

## Evidence

- `08_RELEASE_VAULT/W3_PRODUCTION_RELEASE_MANIFEST.json`
- `07_QUALITY_ASSURANCE/runtime_evidence/JAYT_W3_PRODUCTION_PREFLIGHT_RECEIPT.json`
- `08_RELEASE_VAULT/JAYT_W3_PRODUCTION_GO_LIVE_RECEIPT.json`
- `05_DEAL_AND_AFFILIATE/track1_compliance/TRACK1_SCOPED_ACTIVATION_PACK.json`
