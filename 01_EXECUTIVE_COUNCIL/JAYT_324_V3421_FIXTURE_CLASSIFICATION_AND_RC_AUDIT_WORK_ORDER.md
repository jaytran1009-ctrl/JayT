# JAYT-324 — v3.421 Fixture Classification and Release-Candidate Audit Work Order

## Objective

Prepare an audit-ready v3.421.0 candidate without changing Production. The current candidate remains 22 cards; B11_01 is excluded pending its separately governed future-release path.

## Fixture-debt treatment

Classify every occurrence of `v3.419.0` in QA before editing:

1. **Active gate** — an assertion describing the currently served Production baseline. Update only when its source of truth is v3.420.0, then rerun the owning suite.
2. **Historical fixture/evidence** — a preserved record of an earlier state. Retain it unchanged and annotate it as historical; do not rewrite evidence.
3. **Release-specific fixture** — parameterize the target version so a candidate audit declares the intended baseline explicitly.

Bulk search-and-replace is prohibited.

## Required v3.421 audit package

- reconcile the 22-card candidate list against the canonical Staging registry, explicitly excluding B11_01;
- verify provenance and non-commercial locks for every included card;
- run the applicable regression, parity, and DOM gates against the candidate artifact;
- verify deterministic rollback metadata to v3.420.0;
- record whether the external Production health probe can be independently obtained. A sandbox HTTP 000 result is a monitoring-path limitation, not deployment authority.

## Authority boundary

This work order can produce an audit receipt only. It does not change `is_approved`, `deployment_permitted`, the Vercel deployment, Production assets, deals feed, affiliate, voucher, or tracking state. A separately signed Chairman Production Release Decree remains mandatory.
