# JAYT-363 De-AI R3 — Staging visual acceptance and factual-content hold

**Reviewer:** Codex CEO/Gatekeeper  
**Decision:** `STAGING_VISUAL_ACCEPTED__FACTUAL_CONTENT_HELD__RELEASE_NOT_AUTHORIZED`

The R2 composition resolves the retention issue. At initial load, the 1440px screenshot presents the purpose, explanatory line and three choices beside a supporting Dragon Bridge image. The 390px screenshot retains the same hierarchy: photo, attribution, headline, explanation and all three full-width choices appear in the first viewport. The image is now a useful local cue rather than the whole page.

The supporting evidence is consistent:

- R2 binds all four Preview assets at `dpl_7AiozTgvtmYyAzoETqb147xUxKC7` to the local candidate. Current canonical and deployment mirrors match: JS `a17c763411dfe5de335eceff3b719c968bc268fbc59958a9d753379598e1aee0`; CSS `6f1df57d31b970cde7ec7f878a895297d9ba00157e78197abbe306280e13409a`.
- The R2 receipt's current SHA-256 is `78e982c8dca6e018eadb4a1c53c8b8fa64a32384412bb087abe453176da2df34`, and its sidecar matches. References to `18388fc…` in the earlier handoff and project-memory narrative are stale and must not be reused as the receipt fingerprint.
- Independent unauthenticated retrieval now returns HTTP 302 to Vercel SSO, confirming the public verification window is closed.
- The visual QA reports no header collision, no blank controls, zero horizontal overflow, all enumerated interactive controls at least 44px, and evidence IDs or neutral handling for the six home cards.

This accepts the redesigned interface for protected Staging review. The R2 `factual_verified_count` remains zero for J363 content. The historical catalog evidence binding supports its own cards only and does not promote the simulator's fixtures, prices or terms. Authentic source acquisition is still required for factual-content acceptance.

No Production deployment, affiliate activation, user tracking, Gemini review, v3.431.0 release, or expansion of public commercial claims is authorized.
