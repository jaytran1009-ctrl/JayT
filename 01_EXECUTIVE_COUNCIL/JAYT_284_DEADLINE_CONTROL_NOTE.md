# JAYT-284 — Deadline Control Note

At 22:30, run:

`node 07_QUALITY_ASSURANCE/check_jayt_284_deadline_guard.js`

The guard verifies the required JAYT-279 attachment pairs (`.operator.raw.html` and `.operator.metadata.json`) for all three targets. Bare `.raw.html` files do not satisfy the evidence contract because header sanitization, timestamp, SHA-256 and span offset cannot be audited from a filename.

- If guard exits 0: run JAYT-279 validator, then CEO item-level approval, then Staging-only hydration and QA.
- If guard exits 1: record `EXECUTIVE_ESCALATION_REQUIRED__RAW_ATTACHMENT_INCOMPLETE`; do not synthesize evidence, mutate the feed, or render unapproved cards.

This note implements the data/DOM deadline check. It cannot impersonate or reassign a real person’s authority.
