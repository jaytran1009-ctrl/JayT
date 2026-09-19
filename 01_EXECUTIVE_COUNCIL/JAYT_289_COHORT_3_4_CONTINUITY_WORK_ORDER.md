# JAYT-289 — Cohort 3 & 4 continuity work order

**Issuer:** CEO, JayT  
**Authority:** Chairman directive JAYT-289  
**Operating rule:** discovery and verification run continuously; a raw capture is enabled only for a row that passes the leaf-page gate.

## URL matrix and operating assignment

| Slot | Target | Official URL under review | Purpose | Gate state | Assigned action |
|---|---|---|---|---|---|
| 1 | `BATCH03_HC_07` | `https://www.danang.gov.vn/vi/web/dng/w/to-chuc-phun-nuoc-phun-lua-cau-rong-va-quay-nhip-cau-song-han-phuc-vu-tet-nguyen-dan-binh-ngo-2026` | Dragon Bridge water/fire information | `REJECTED__TET_2026_EVENT_EXPIRED` | Data & Trust find a current recurring-weekend leaf page; no capture of this expired source. |
| 2 | `BATCH03_HC_01` | `https://thuvien.danang.gov.vn/dich-vu-the-sinh-vien` | Da Nang General Science Library student service | `PENDING_LEAF_PAGE_AND_RECENCY_VERIFICATION` | Verify final URL, source date, and direct service span before requesting ingress. |
| 3 | `BATCH03_DS_01` | `https://smartcity.danang.gov.vn/huong-dan-1022` | 1022 public-service guidance | `PENDING_LEAF_PAGE_AND_RECENCY_VERIFICATION` | Verify final URL, source date, and direct service span before requesting ingress. |
| 4 | `BATCH03_DS_02` | `https://opendata.danang.gov.vn/tai-nguyen-sinh-vien` | Open-data resource discovery | `PENDING_LEAF_PAGE_AND_RECENCY_VERIFICATION` | Verify that the leaf page is live, dated, and identifies a public resource; do not treat a landing page as evidence. |
| 5 | `BATCH03_DS_05` | `https://yteda-nang.gov.vn/danh-ba-nha-thuoc-24-7` | Emergency/24-hour pharmacy directory | `PENDING_LEAF_PAGE_AND_RECENCY_VERIFICATION` | Verify the directory is an official current leaf page and identifies a real operating directory; no claim of current stock, price, or availability. |

## Phased execution

1. **Data & Trust — T+30:** classify every row as `LEAF_PAGE_CONFIRMED` or `REJECTED/HELD`, with source date and a verbatim supporting span. No social or secondary source is permitted.
2. **CEO — immediate after a row passes:** issue a row-specific, append-only operator-ingress addendum naming that URL, its span, the 45-minute timebox, and the evidence vault.
3. **Lead Operator:** perform exactly one unauthenticated read-only capture for each subsequently authorized row; record raw bytes, UTC timestamp, sanitized headers, SHA-256, and UTF-8 offset.
4. **Data & Trust/QA:** validate raw evidence; every failed row quarantines independently and does not delay a valid row.
5. **CEO/Engineering:** only `EVIDENCE_COMPLETE_INTERNAL_HELD` plus named CEO `PUBLIC_APPROVED_STAGING_ONLY` can render, as non-commercial information, on Staging.

## Absolute constraints

- The expired Tết 2026 Dragon Bridge article is permanently excluded from a current-weekend card.
- No generic portal, search result, homepage, stale archive, or error-style 200 response is capture-eligible.
- `deals_feed.json` remains `[]`; vouchers, affiliate/tracking links, and Production `v3.419.0` remain locked.
