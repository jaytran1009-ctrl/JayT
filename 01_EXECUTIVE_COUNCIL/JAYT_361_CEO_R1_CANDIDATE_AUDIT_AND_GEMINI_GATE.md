# JAYT-361 R1 — Candidate audit and Gemini gate

**Reviewer:** Codex CEO/Gatekeeper  
**Decision:** `CANDIDATE_HASHES_VALID__SUPPLY_TARGET_NOT_MET__GEMINI_AUDIT_NOT_READY`

The candidate manifest is internally consistent: its file hashes match the five candidate artifacts, its manifest and release-request sidecars match, it preserves the 87 canonical entities, and it names the Vercel project correctly as `jayt-production-v3420` / `prj_YzcODtsWLzPWaIVItzd4K6QEWERm`. The J361 vault also contains 15 PNG artifacts and valid sidecars. Visual review of the Starlight U22 screenshot agrees with its source transcription: 45k is stated for Monday–Thursday and 55k for the Đà Nẵng/Quy Nhơn exception.

The candidate audit receipt is not independently reproducible from the workspace because its reported runner `run_candidate_j361_audit.cjs` is absent. The receipt shows a local base (`http://127.0.0.1:4180`) and a PASS assertion, but neither is a production test nor a replayable repository test. Its runtime result is therefore accepted only as executor evidence.

## Supply-accounting correction

The claim matrix counts eleven new verified offers: eight original Batch 19 records plus three Popeyes records. The official `popeyes_banners_api.json` evidence used by the matrix marks both records below with `approve: false`:

| Offer ID | Claimed status | API status | CEO status |
|---|---|---|---|
| `B19_POPEYES_BOGO_MON` | VERIFIED_IN_STORE | `approve: false` | HELD_PENDING_ACTIVE_TERMS |
| `B19_POPEYES_BOGO_WED` | VERIFIED_IN_STORE | `approve: false` | HELD_PENDING_ACTIVE_TERMS |
| `B19_POPEYES_CORE_89K` | VERIFIED_IN_STORE | `approve: true` | remains candidate evidence, subject to replayable test |

`approve: false` is an official source state incompatible with claiming that a current banner is an active in-store offer. The source titles and deep-links alone do not supply current terms, exclusions, or participating-store scope. Excluding the two unapproved BOGO records reduces the candidate total from eleven to **nine** verified new offers (eight original Batch 19 plus Core 89K). The original Batch 19 eight-of-ten requirement remains met; the ten-new-offer target is not.

## Gate ruling

Do not submit this candidate to Gemini as PASS, do not deploy it, and do not change the production alias. A single active, first-party, detail-supported Popeyes or other additional offer would restore the ten-new-offer count, provided its terms and Đà Nẵng applicability are captured. The two BOGO records can be reinstated only if a fresh official source records them active and supplies the missing scope/terms.

The candidate package is retained for remediation. v3.430.0 remains unsigned and production remains v3.429.0 hotfix.
