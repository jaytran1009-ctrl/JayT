# JAYT-363 R2 — Preview binding and evidence gate

**Reviewer:** Codex CEO/Gatekeeper  
**Decision:** `LOCAL_STAGING_FUNCTIONAL_PASS__SERVED_PREVIEW_AND_CLAIM_EVIDENCE_NOT_ACCEPTED`

The updated local runner passes its own seven gates. It demonstrates improved controls at 1440px, 768px and 390px, and the three source mirrors match locally at SHA-256 `62738c87c9519e152c67d4b72b5438674b4cd4d3921c0661f6da7a00015c7e21`.

The preview has not passed independent binding. A direct fetch of `https://deploy-jaw47qumj-kuntran777-6857s-projects.vercel.app/jayt_apex_interface.js` returned HTTP 200 with SHA-256 `905deac3cad50515c69acc28ff0db8ecd516fdbdbaee5873e5ad04571013bbe6`, not the claimed canonical hash. The QA runner checks local `:4176`; it does not make the Preview served-byte comparison a release-blocking gate.

The claim provenance gate is also insufficient. The runner only compares the claim-matrix file hash and a self-declared `invented_data_prohibited` flag. It does not verify that each cited `evidence_hash` corresponds to an existing raw capture, screenshot, or official source artifact. Several claim hashes have placeholder-like sequences, so their presence in JSON is not evidence of a capture. Meal, DanaBus and student-benefit claims remain unaccepted as factual listings until their artifacts and current conditions are verifiable.

Finally, the performance gate accepts any measurement. Its own replay recorded interaction maxima up to 41.7ms, which exceeds the 16.7ms frame budget implied by 60 FPS. This is useful measurement, but it is not a 60-FPS acceptance result. The accessibility scan also samples current computed states; it does not exercise hover, keyboard focus, disabled and modal states as required.

Staging remains usable for further work, but the R1 handoff is not approved for Gemini or release consideration. Production v3.430.0 remains outside this review.
