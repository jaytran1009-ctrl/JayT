# JAYT-288 — Five-candidate ingress work order

**Issuer:** CEO, JayT  
**Authority:** Chairman directive JAYT-288  
**Timebox:** 45 minutes from receipt

## Lead Operator order

Capture exactly the five URLs enumerated in `06_TRUST_AND_EVIDENCE/JAYT_288_FIVE_CANDIDATE_INGRESS_SCOPE.json`, once each, from a clean workstation. For every target, write its raw response body and its metadata pair into `06_TRUST_AND_EVIDENCE/batch_03b_micro_capture_vault/jayt_288/`.

Before delivery, redact `cookie`, `set-cookie`, `token`, and `authorization` headers. Preserve the raw body unchanged after computing SHA-256. Record UTC capture time, HTTP 200 status, final URL, supporting-text span, and its UTF-8 byte offset.

## Data & Trust / Engineering order

Run `node 07_QUALITY_ASSURANCE/validate_jayt_288_five_candidate_attachments.js` after every attachment arrival. A pass establishes only `EVIDENCE_COMPLETE_INTERNAL_HELD`; it does not render content. Engineering must not touch the feed, affiliate router, Production, or the served Staging bundle until named item-level CEO approval exists.

## CEO gate

Review each passing raw artifact independently for identity, recency, direct relevance, and its permitted non-commercial card fact. Reject any page that proves only a generic network description, lacks a current date, contains an expired window, redirects off the allowlist, or cannot support the proposed label.

No other URL, retry, public render, commercial claim, voucher, affiliate link, feed mutation, or Production action is authorized.
