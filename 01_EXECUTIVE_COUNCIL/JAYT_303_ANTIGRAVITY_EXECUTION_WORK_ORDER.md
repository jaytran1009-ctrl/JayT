# JAYT-303 — Antigravity execution work order

**Issuer:** CEO, JayT  
**Timebox:** 45 minutes from receipt  
**Scope:** `06_TRUST_AND_EVIDENCE/JAYT_302_DIRECT_INGRESS_SCOPE.json`

## Direct assignment

**Lead Operator** performs exactly one operator-verified browser attachment attempt for each JAYT-302 slot (`SLOT_01_LIB` through `SLOT_06_DUT`). For each result, place the raw body, sanitized headers/metadata, UTC timestamp, SHA-256, and expected-span offset into `06_TRUST_AND_EVIDENCE/batch_03_full_ingress_vault/`.

**Antigravity Engineering** runs the JAYT-302 validator immediately after the six submissions. It must not alter raw bytes, fabricate metadata, retry an exhausted slot, mutate the deal feed, enable affiliate/tracking, or touch Production.

**Antigravity QA** supplies the validator log and a Staging DOM receipt only for items carrying named CEO approval. A failed or incomplete item is quarantined independently.

## CEO gate

On receipt of an evidence-complete validator record, the CEO will audit identity, direct text span, current scope, and non-commercial wording item-by-item within 15 minutes. Only a signed `PUBLIC_APPROVED_STAGING_ONLY` verdict can trigger Staging hydrate.

## Pipeline N+1

While JAYT-302 runs, Data & Trust prepares Cohorts 5–6 as a static discovery queue: one official URL, 2025–2026 date, direct span, and non-duplication check per proposed utility. No capture is authorized for that queue without its own CEO scope.

## Final go-live criteria

Production v3.420.0 remains a separate executive decision. The required dossier must show item-level provenance, no commercial/affiliate claims, Source-of-Truth parity, successful responsive/console QA, an explicit rollback path, and a signed Production release authorization.
