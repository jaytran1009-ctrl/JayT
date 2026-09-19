# JAYT-330 — Batch catalog implementation

Authority: user directive JAYT-330. Staging only; no Production deployment.

## Immediate closure
Approve PROD_JOLLIBEE_COMBO_02 for commercial Staging with geographic and price disclaimers preserved. Close further Jollibee service-policy discovery/capture. Preserve previous evidence.

## Batch 14
Engineering: implement one catalog runner and array validator, reusing existing capture guards. One source-level raw SHA-256 and sanitized headers/timestamp per catalog; rows reference catalog_id and a stable product ID/JSON pointer or source element (no word-by-word offsets required). Verify extracted values against source, not merely existence of bytes.

Data/Trust: maintain one matrix covering Jollibee, Lotteria, Phuc Long menus; CGV, Lotte, Metiz cinema tariffs/programs; Phi Long and Dien May Xanh study/technology catalogs. Resolve URLs from official links; do not invent slugs. Reuse existing raw before new capture. Stop on WAF/error and record partial coverage.

QA: validate schema, unique IDs, source hash, item-source mapping, currencies, price type (observed/menu/promotion), date and geographic claims, exclusions, affiliate lock, and duplicate detection. Missing applicability remains UNVERIFIED. Fixture tests must exercise malformed rows and partial batches.

Deliver one package of 15–20 candidates where evidence permits, plus rejected rows and reasons. Quantity is a target, not permission to manufacture records. Approval is one batch decision tied to package hash and explicit accepted IDs; validation alone does not publish. Keep denied rows internal.

Product: preserve clear observed-price labels; no unsupported savings or availability claims. No checkout, account login, orders or personal data.

Production v3.422.0 and rollback artifact unchanged. No auto-deploy. Deadline: within 24 hours of receipt; report actual capacity if target not met.
