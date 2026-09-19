# JAYT-363 De-AI R1 — Visual acceptance gate

**Reviewer:** Codex CEO/Gatekeeper  
**Decision:** `SOURCE_AND_BYTE_BINDING_ACCEPTED__VISUAL_USABILITY_REMEDIATION_REQUIRED__RELEASE_NOT_AUTHORIZED`

The redesign candidate is consistently mirrored and the technical receipt binds its four served assets to the new Preview deployment. The Porcelain palette, rounded cards, Vietnamese typography stack and client-side calculator behavior are a meaningful improvement over the earlier neon treatment.

Visual acceptance is withheld. The submitted screenshots show three user-facing defects that the automated checks did not detect:

| Finding | Evidence | Effect | Required correction |
| --- | --- | --- | --- |
| Header overlaps page content | At 1440px, the first-row card headings begin under the fixed header; at 390px, body copy starts partway through a card directly below the header. | The first screen cannot be read in its natural top-of-page state. | Add a single documented header height token and reserve matching main-content top space at every breakpoint. Capture fresh screenshots at `scrollY=0`. |
| Empty icon controls | Screenshots show bordered blank squares in the header and beside `DEAL XÁC MINH`. | They look like broken assets and conceal the control's purpose. | Use a readable text label or a bundled SVG with accessible name; remove every empty visual button/chip. Avoid emoji as the sole meaning of a control. |
| Incomplete content language cleanup | The public card badge `DEAL XÁC MINH` remains, while the redesigned candidate declares `factual_verified_count: 0` for J363 content. | The wording competes with the requested friendly consumer tone and creates an unproven appearance of approval in the new experience. | Replace public internal-status badges with plain benefit/category language. Any historical catalog card must bind to its existing evidence record; otherwise render a neutral “Đang cập nhật thông tin” state without a commercial CTA. |

The reported 100% touch and contrast rates are useful but insufficient for visual approval: the runner counts non-interactive `div.brand-lockup` as a target, and its factual gate only reads the J363 matrix. It does not establish that the rendered catalog cards shown on the home screen are tied to their evidence records. This is a coverage gap, not a finding that the records are false.

No Production, affiliate, tracking, Gemini-review, factual-content or release authorization is granted. The Preview remains an SSO-protected staging environment.
