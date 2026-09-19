# JAYT-392 — CEO R3 Wave 1 Evidence Acceptance & System Release Hold

**Date:** 2026-09-11  
**Decision:** `WAVE1_FACTUAL_EVIDENCE_ACCEPTED__SYSTEM_RELEASE_AND_AFFILIATE_HELD`

## Accepted Wave 1 evidence

The R3 candidate bundle now meets the narrow factual-evidence gate for two distinct cinema offers.

- **Galaxy Happy Day**: its 11 September first-party capture, scoped to `div.content__data__full`, binds non-overlapping UTF-8 byte excerpts for the recurring Tuesday rule, price from 45K, `Galaxy Đà Nẵng`, and customer terms. Each excerpt is inside the recorded container span `[112535, 117849)` and the HTML/PNG post-write hashes match its receipt.
- **Metiz U22**: the first-party relational bundle binds (A) the 55,000đ U22 offer and eligibility terms, (B) the exact linked U22 catalogue card with the date range `01/01/2026 - 31/12/2026`, and (C) first-party Metiz venue notices that bind Metiz to Helio Center/Đường 2/9 and the explicit Da Nang address. The catalogue card's direct promotion link binds the current validity statement to the offer artifact; the two venue notices provide the required official relational scope.

The pair establishes **2/2** required current, distinct core cinema offers for the limited Wave 1 factual gate.

## Security correction recorded

The original R3 receipts captured response `set-cookie` values, including session/token-like material. Those fields were redacted from R3 receipts in both workspaces; raw evidence HTML/PNG scans show no matching credential or session material. The R3 collector is updated to persist only an allowlist of non-sensitive response headers: `content-type`, `date`, `server`, `etag`, `last-modified`, and `cache-control`.

## Remaining system release blockers

This is not a production-release authorization. The following J392 conditions remain open:

1. KTX price, seller identity, availability, and outbound SKU remain unbound to physical merchant responses; affiliate remains disabled.
2. The registered scheduler still lacks an observed scheduled (not manually initiated) execution that verifies evidence age and deterministic failure handling.
3. The dual-key pipeline seal remains pending its required written approvals.

## Gate result

- Wave 1 cinema factual evidence: **accepted**.
- `is_approved`: **false**.
- `production_deployment_authorized`: **false**.
- `production_alias_mutation_authorized`: **false**.
- `affiliate_enabled`: **false**.
- Canonical production remains `dpl_EY8hrscg5f1tRCG9WeKsHGfSJXUM` (`v3.444.0-j388`).

No deployment, promotion, affiliate activation, or destructive action is authorized by this ruling.
