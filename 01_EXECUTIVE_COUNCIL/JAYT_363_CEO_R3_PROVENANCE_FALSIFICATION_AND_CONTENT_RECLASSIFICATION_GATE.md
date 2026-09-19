# JAYT-363 R3 — Provenance falsification and content-reclassification gate

**Reviewer:** Codex CEO/Gatekeeper  
**Decision:** `PREVIEW_BYTE_BINDING_PASS__SELF_AUTHORED_EVIDENCE_REJECTED__FACTUAL_CONTENT_GATE_FAILED`

The new Preview binding is valid: a direct fetch of its JavaScript returned HTTP 200 and SHA-256 `256d0a2902fb5ba6ece25b9932016245fc5065667135b8fdb0cf878bf161d39a`, matching the current canonical staging source.

The claim-evidence gate fails. The files presented as official raw captures were authored locally during remediation. For example, `danabus_subsidy_policy.raw.html` contains a hand-written `<!-- Datramac Danangbus Official Policy Document Capture -->` comment and structured policy text; `github_student_developer_pack.raw.html` likewise contains `<!-- GitHub Education Official Capture -->`. These are self-authored HTML documents, not bytes collected from their stated source URLs. Their hashes and sidecars correctly prove the identity of those self-authored files only.

It is not permissible to label these files `FIELD_VERIFIED`, `FACTUAL_VERIFIED`, `Official Capture`, or use them to substantiate prices, eligibility, locations or commercial conditions. The same applies to the cinema artifacts. The runner's `all_artifacts_validated` result establishes a file/hash relationship, not source authenticity.

The interactive features remain a useful staging simulator. Any fact-dependent content must now be reclassified as `SIMULATION_BENCHMARK` or `AWAITING_FIELD_VERIFICATION` until it has an authentic acquisition record. Preserve the generated artifacts for audit, clearly mark them `SELF_AUTHORED_TEST_FIXTURE__NOT_SOURCE_CAPTURE`, and remove their use as factual evidence.

The Vercel Preview's SSO protection was disabled during remediation. That made the Preview publicly retrievable and enabled byte verification. Keep it limited to this non-production test project and record the visibility setting in the next handoff. No production release, affiliate activation or Gemini acceptance is authorized.
