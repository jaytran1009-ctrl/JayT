# JAYT-345 — Automated A11y Remediation and Candidate Reseal

**Issuer:** CEO / Gatekeeper Codex  
**Recipient:** Antigravity Engineering and QA  
**Scope:** Sprint B staging and candidate only  
**Production deployment authority:** withheld pending automatic gate pass

## Decision basis

JAYT-344 waived manual device checks. It did not waive a failing automated gate.

The independent rerun of `audit_jayt_344_sprint_b_automated_a11y.cjs` returned `FAILED`:

- text contrast: 37/53 samples passed; 16 samples failed;
- semantic heading hierarchy: invalid;
- its output receipt was overwritten during rerun, so the actual SHA-256 is now `140f3ddf01082406d9b420109571fcf1d49dfc42c7fb5ac4cff657b91d22bb4c`, while the sealed manifest names `0b6366aff83d46bc90b38ade902db319aa3577403d3d6e6bdae14989b2c1c3f1`.

Therefore the current candidate is neither a passing automated accessibility build nor a current sealed candidate.

## Required technical work

1. Correct all sampled contrast failures to their stated WCAG AA thresholds. This includes primary blue action states, blue/orange secondary badges, active Vault/Calendar/Radar controls, and category labels. Do not lower test thresholds or suppress samples.
2. Correct the page heading hierarchy. Retain one logical page-level heading and advance levels without skipped structure in every route.
3. Run the existing content-integrity audit and the corrected automated A11y audit against a fresh local server. The A11y verdict must be `PASSED`, with zero sampled failures and valid heading hierarchy.
4. Make the A11y runner write a new, timestamped evidence receipt rather than overwriting a receipt referenced by a candidate manifest.
5. After all gates pass, copy the exact tested bundle to a new candidate directory, produce a fresh manifest whose listed hashes match the bytes on disk, and include the new immutable receipts.

## Required delivery

Submit the new candidate manifest, bundle hashes, immutable audit-receipt hashes, and a delta containing the corrected selectors and test results. Do not deploy, change the Production alias, or edit the existing Sprint B candidate in place.

Manual device testing remains waived under JAYT-344 and is not part of this work order.
