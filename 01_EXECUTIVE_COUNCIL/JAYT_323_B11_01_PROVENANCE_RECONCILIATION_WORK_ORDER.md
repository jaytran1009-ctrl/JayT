# JAYT-323 — B11_01 Provenance Reconciliation Work Order

## Trigger

The Staging hydration receipt is not temporally or referentially consistent with the canonical approval artifact. The receipt's `evaluated_at_utc` is earlier than the approval timestamp and it names an approval ID absent from the canonical evidence file.

## Required work

1. Preserve all existing raw evidence, approval, registry, source, and receipt artifacts byte-for-byte; do not backdate or edit them.
2. Produce a new append-only reconciliation attestation stating the accountable approver, actual action ordering, and the cause of the timestamp/reference discrepancy.
3. QA must compare the attestation with `JAYT_323_B11_01_PUBLIC_APPROVAL_STAGING_ONLY.json`, `STAGING_B11_01_HYDRATION_RECEIPT.json`, the ingress manifest, and the memory ledger.
4. Until the attestation passes independent review, B11_01 must be excluded from every Production release candidate and no registry or Production action is authorized.

## Scope boundary

This is forensic reconciliation only. It does not authorize recapture, rehydration, registry rewrite, rollout, deploy, commercial functionality, or a Production change.
