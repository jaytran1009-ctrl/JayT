# JAYT-319 — B04_06 Pre-Audit Work Order

**Queue position:** N+1 after B04_04 recency remediation.  
**Mode:** Documentary discovery only; no capture quota, rendering, feed mutation or Production deployment.

## Objective

Identify one official, dated 2025–2026 **leaf page** for a non-commercial Da Nang public-health utility. The source must contain a verbatim span directly describing the utility and its current applicability.

## Owners and gates

| Owner | Required output | Blocker |
| --- | --- | --- |
| Data & Trust | Candidate URL, publisher, publication/effective date, exact proposed span and a direct-utility rationale. | Homepage, undated page, archive or generic campaign page. |
| QA | Pre-audit record for URL, dated evidence and literal span. | Any unverified field means `capture_authorized: false`. |
| Engineering | Preserve the four-card Staging baseline and existing evidence vault. | No runner execution or hydrate. |

## Decision gate

Only a Data & Trust + QA pass may be presented to the CEO for an individual one-shot capture scope. Until then: `public_approved: false`, `render_permitted: false`.
