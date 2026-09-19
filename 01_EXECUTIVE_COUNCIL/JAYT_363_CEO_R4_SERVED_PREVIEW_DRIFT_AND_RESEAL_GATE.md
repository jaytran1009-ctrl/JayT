# JAYT-363 R4 — Served-preview drift and reseal gate

**Reviewer:** Codex CEO/Gatekeeper  
**Decision:** `TECHNICAL_STAGING_ACCEPTANCE_SUSPENDED__SERVED_PREVIEW_DRIFT_DETECTED__FACTUAL_CONTENT_STILL_PENDING`

Independent retrieval of the declared Preview deployment on 2026-09-09 found that three static artifacts still match the local candidate, but the served HTML does not match the R3 receipt:

| Artifact | Direct live retrieval | Local candidate / R3 receipt | Result |
| --- | --- | --- | --- |
| `jayt_apex_interface.js` | HTTP 200, 277,338 bytes, `ae61629dd63764c81f04a61eebeae4964d29011ebb1039e33c9ac820e83fdafa` | same | PASS |
| `styles.css` | HTTP 200, 48,171 bytes, `5206d185ac64d5b94b77cab27dd49e0cdde92d9e45356a7bfff9c9dc933ecd9a` | same | PASS |
| `deals_feed.json` | HTTP 200, 3 bytes, `37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570` | same (`[]`) | PASS |
| `index.html` | HTTP 200, 889 bytes, `937434b9932682019b58b0a9583619598788dd3aac608ee390f69bddfc908f5a` | 726 bytes, `85cb698fe11f8388653346c0d177a15d4a0de1f32fba3b1964df899666fe3952` | FAIL |

Consequently, `STAGING_OBSERVABILITY_RECEIPT.json` (`b7d7cf47d8211d790cba3b385456a5c38ad7492f1d7a9f87e05bc415318fa795`) no longer establishes its claimed 4/4 static-asset binding to the currently served Preview. It must not be used for technical acceptance, Gemini review, release approval, or any production action.

The R3 provenance correction remains valid as a classification decision: the matrix declares zero factual claims, all generated artifacts are quarantined as `SELF_AUTHORED_TEST_FIXTURE__NOT_SOURCE_CAPTURE`, and fact-dependent content remains simulation or awaiting field verification. That is not factual-content acceptance. Authentic replayable capture is still required before any factual public-content or commercial release gate can pass.

The Preview is explicitly configured as public while SSO protection is disabled. Public access was used only for byte inspection; it must be reverted to restricted Preview access when the reseal run is complete. Production v3.430.0, affiliates, and live commercial tracking remain out of scope and unchanged.
