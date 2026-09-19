# JAYT-330-R6 — HUMAN ACCESSIBILITY & GOVERNANCE SIGN-OFF WORK ORDER

**Issued:** 2026-09-07T05:35:13.7507482Z  
**Scope:** Commercial Staging `http://127.0.0.1:4176/` only  
**Production authority:** NONE

## Lead Operator — real assistive technology

1. Use Windows NVDA or Narrator with Chrome/Edge in a visible, interactive session.
2. Record the actual screen-reader name/version, browser/version, operator identity, UTC start/end time, and Speech Viewer transcript or equivalent evidence.
3. Verify page title, landmarks, H1/H2/H3/H4 navigation, all 22 card announcements, all 22 links, new-tab disclosure, reading order, duplicate announcements, and keyboard activation.
4. Record each result as PASS, FAIL, or NOT_TESTED. Expected speech written in advance is not observed evidence.

## Lead Operator — real browser zoom

1. In visible Chrome/Edge, reset zoom to 100%, then use the browser zoom control or `Ctrl` + `+` until the browser UI reports 200%.
2. Record a screenshot containing the browser zoom indicator/menu and page content.
3. At 200%, verify text scaling, 22-card content retention, clipping, overlap, horizontal scrolling, focus visibility, and keyboard activation.
4. Keep the existing 320 CSS-pixel reflow test as separate evidence; do not substitute CDP page scaling for browser zoom.

## Product and Data & Trust — attributable TTL approval

1. Each department must provide a separate approval artifact or signed approval event with an attributable approver, role, timestamp, decision, and policy hash.
2. The two approvals must be created independently of the QA runner and then referenced by the consolidated record.
3. Until both are present, the TTL matrix remains `PROPOSED_NOT_ENFORCEABLE` and may be used only for observation.

## Engineering / QA

1. Keep capture age and source reachability as separate dimensions.
2. Record reachability as `17_PASS / 5_SOURCE_PROBE_BLOCKED`; do not count the aggregate gate as PASS.
3. Preserve R4 and R5 receipts unchanged as historical evidence. Link this executive correction as the governing verdict.
4. Emit `STAGING_BATCH_14_R6_HUMAN_CLOSEOUT_RECEIPT.json` only after the operator and departmental artifacts physically exist.

## Exit gate

R6 closes only when real screen-reader evidence, real browser-zoom evidence, and independently attributable Product and Data & Trust approvals all exist. Production `v3.422.0` and the 22-card commercial Staging catalog remain frozen; no deployment, affiliate, tracking, or automatic publication is authorized.
