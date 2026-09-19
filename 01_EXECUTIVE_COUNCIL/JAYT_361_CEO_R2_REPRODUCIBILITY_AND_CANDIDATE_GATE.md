# JAYT-361 R2 — Reproducibility and candidate gate

**Reviewer:** Codex CEO/Gatekeeper  
**Decision:** `RUNTIME_CONTRACT_PASS__SUPPLY_AUDIT_INVALID__GEMINI_SUBMISSION_DENIED`

The sealed candidate itself is internally intact. On 2026-09-09, the CEO replayed `07_QUALITY_ASSURANCE/run_candidate_j361_audit.cjs` against `08_RELEASE_VAULT/candidates/v3.430.0-j361`. The five candidate file hashes matched its manifest; Split Bill passed 238 exact-sum permutations; all 15 Radar links returned HTTP 200; and the local candidate passed the 1440px, 768px and 390px DOM checks (15 HOME Radar cards, 42 Vault cards, 34 Split controls, zero console errors, no horizontal overflow and no tested PII leakage). The resulting replay receipt SHA-256 is `c6d0afde2286d74b55daf0a1454bb4261a17daa386fc40f9a297707ab9cb27d5`.

This is a runtime acceptance only. It does not validate the supply accounting asserted by the same runner.

## Binding discrepancy

The canonical matrix correctly identifies these eight original Batch 19 records as verified:

`B19_STARLIGHT_U22_WEEKDAY`, `B19_STARLIGHT_U22_WEEKEND`, `B19_STARLIGHT_THU_3_PHIM_VIET`, `B19_TPC_COMBO_COT_MAM_KEO_479K`, `B19_TPC_COMBO_COT_MAI_MAN_599K`, `B19_TPC_BOGO_PEPSI_15L`, `B19_GONGCHA_MEMBER_POLICY`, and `B19_KATINAT_APP_LOYALTY`.

However, the runner does not parse the sealed provenance matrix or the candidate feed to compute this count. It emits a hard-coded, materially different list (`B19_STARLIGHT_WEDNESDAY`, `B19_STARLIGHT_MEMBER_DAY`, `B19_TPC_KEO_DONG_GIA`, `B19_TPC_MAN_DONG_GIA`, `B19_TPC_BOGO_PEPSI`, and `B19_STARLIGHT_DA_NANG_DISCOUNT`). Several listed IDs do not exist in the candidate or canonical Batch 19 inventory. The receipt therefore states an untraceable supply result despite its overall `PASS`.

The sealed release request is independently inconsistent: it still counts `B19_POPEYES_BOGO_MON` and `B19_POPEYES_BOGO_WED` as its three verified Popeyes offers, even though the current matrix holds both due to `approve:false`; the candidate instead renders `B19_POPEYES_BOGO_DELI_99K` and `B19_POPEYES_BO_DOI_145K`. A sealed sidecar proves byte integrity, not factual consistency between artifacts.

## Gate ruling

Do not submit the candidate to Gemini as audit-ready, deploy it, alter the Vercel alias, or represent v3.430.0 as release-ready. Production remains v3.429.0-j360-hotfix. The verified source records may remain in the candidate, but the candidate must be re-sealed after the reproducible accounting correction in work order J361 R2.

The next CEO review may approve a Gemini dossier only when a fresh runner derives every claimed ID and count from the sealed provenance matrix plus the exact candidate files, rejects absent/mismatched IDs, and its generated release request exactly agrees with those derived results.
