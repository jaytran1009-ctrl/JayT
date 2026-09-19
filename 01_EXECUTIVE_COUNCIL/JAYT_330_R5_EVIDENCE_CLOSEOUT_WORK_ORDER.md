# JAYT-330-R5 — EVIDENCE CLOSEOUT & CLAIM CORRECTION WORK ORDER

**Issued:** 2026-09-07T05:28:38.4625317Z  
**Scope:** Commercial Staging `:4176` only  
**Production authority:** NONE

## 1. QA / Accessibility

1. Replace the R4 screen-reader gate with two distinct results:
   - `DOM_SEMANTICS_AUTOMATED`: may be PASS based on Puppeteer evidence.
   - `REAL_ASSISTIVE_TECHNOLOGY`: must remain NOT_TESTED until a human operates NVDA, Narrator, VoiceOver, or equivalent and records actual announcements, reading order, link purpose, and unexpected verbosity.
2. Test actual browser zoom at 200%, not only a reduced viewport. Record zoom setting, viewport, screenshots or trace, text scaling, clipping, overlap, loss of content, and keyboard usability.
3. Preserve the valid 320 CSS-pixel reflow evidence as a separate WCAG 1.4.10 result.
4. Reissue the closeout receipt with no unsupported certification wording. A complete WCAG conformance claim is prohibited unless every applicable criterion has been evaluated.

## 2. Product / Data & Trust

1. Review the proposed TTL matrix item by item and record explicit approval, amendment, or rejection by both Product and Data & Trust.
2. Label current results accurately:
   - 22/22 `FRESH_BY_CAPTURE_AGE` under the proposed thresholds.
   - 17/22 source probes HTTP 200.
   - 5/22 Jollibee probes HTTP 403 and therefore `SOURCE_PROBE_BLOCKED`, not source-health PASS.
3. Update the read-only freshness runner so reachability and age are independent dimensions. HTTP 403 must not be silently collapsed into `ALL_FRESH`; it may require a browser/operator verification path without automatic recapture.
4. Keep automatic card mutation and automatic publication prohibited.

## 3. Engineering / Governance

1. Preserve the immutable Batch 14 package and 22-card catalog bytes.
2. Do not rewrite or delete the R4 receipt. Retain it as historical evidence and attach the executive correction document as its governing supersession.
3. Emit `STAGING_BATCH_14_R5_EVIDENCE_CLOSEOUT_RECEIPT.json` with distinct statuses PASS, FAIL, and NOT_TESTED.
4. Production `v3.422.0` remains frozen. No commercial Production promotion, affiliate activation, tracking, or deployment is authorized.

## Exit gate

R5 may close only after real assistive-technology testing is evidenced, actual 200% browser zoom is verified, the TTL matrix has explicit Product and Data & Trust sign-off, and freshness reporting distinguishes capture age from source reachability.
