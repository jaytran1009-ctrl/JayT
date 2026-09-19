# JAYT-287 — Leaf-page discovery closure

## Binding outcome

Data & Trust has completed the timeboxed discovery pass and published five allowlisted, dated 2026 leaf-page candidates in `JAYT_LEAF_PAGE_CANDIDATES_2026.json`.

This is a static discovery handoff only. No candidate is authorized for capture, evidence admission, registry mutation, DOM rendering, deal-feed mutation, affiliate routing, or production deployment.

## CEO decision queue

1. Confirm or reject the proposed remapping for each candidate. The two transit candidates explicitly do not prove the original R16A or an An Thuong timetable.
2. If a candidate is chosen, issue a separate target-specific ingress authorization that names one URL, the operator, the vault path, the redaction requirements, and the timebox.
3. Allow only the JAYT-279 attachment validator and item-level approval to unlock a staging-only card.

## Invariants

- Production remains `v3.419.0` locked.
- `05_DEAL_AND_AFFILIATE/deals_feed.json` remains `[]`.
- Voucher and affiliate remain disabled.
- Existing approved Staging cards are unchanged by this work order.
