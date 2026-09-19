# JAYT-319 — Auto-Chaining & Pipeline Continuation Protocol

## Mandatory response format

Every CEO acceptance contains both:

1. **Acceptance:** pass/quarantine decision, evidence hash and invariant check.
2. **N+1 dispatch:** a bounded Work Order selected from the queue, with named owner, permitted action and prohibited action.

## Queue rules

- A completed or quarantined slot moves to a recorded terminal state; it is never silently reused.
- A consumed one-shot scope may not be rerun. Its N+1 action can only be documentary/leaf-page discovery unless a new named scope grants a new quota.
- Candidate capture requires a pre-declared URL, text span, recency basis, Data & Trust + QA pre-audit, and CEO target-specific authorization.
- No auto-chain may mutate feed, affiliate, Production, public registry or Staging without `PUBLIC_APPROVED_STAGING_ONLY`.
