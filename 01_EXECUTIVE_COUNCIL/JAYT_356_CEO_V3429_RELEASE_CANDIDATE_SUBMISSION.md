# JAYT-356 — CEO Release Candidate Submission: v3.429.0

**CEO decision:** `TECHNICALLY_ACCEPTED__PENDING_CHAIRMAN_M4_RELEASE_DECREE`  
**Date:** 2026-09-08  
**Production deployment authority:** `false`

## Scope accepted for submission

Antigravity reconciled the candidate identity set to **87 approved entities**:

| Measure | Count |
| --- | ---: |
| v3.428.0 baseline | 76 |
| Net-new commercial identities | 11 |
| Removed identities | 0 |
| v3.429.0 candidate | 87 |
| Civic / commercial | 24 / 63 |
| Batch 18 verified / held | 15 / 2 |
| Previously held records reconciled | 9 |

Four Batch 18 Jollibee records update the lineage of existing cards; the other eleven are new canonical commercial identities. Eleven held records are excluded from the public DOM and public feed actions.

## Module and Staging findings

The sealed candidate includes 29 active Voucher Vault cards, 15 Smart Value Radar records, a seven-day timeline and Split Bill widgets on 25 priced cards. The submitted regression evidence reports clean keyboard, responsive and accessibility checks at 1440px, 768px and 390px, plus integer-VND Split Bill calculations and clipboard feedback only where a real public code exists.

Batch 18 records are represented as either verified September promotions or clearly labelled price observations. The two Lotteria records remain held. The candidate does not authorize their publication.

## Controlling artifacts

| Artifact | SHA-256 |
| --- | --- |
| J356-R1 reconciliation receipt | `fbf5fc1e75aeef2cda96c0dadec80f471954c8de43329d8ee897ed94493bf220` |
| Candidate manifest | `541bfdae77c43f0c2cd974245e276cdf184d0d135a49fab94b0802f89c674b10` |
| Rollback manifest | `ac07926cd7068d7765222953d813664e0b8f566939afee28e40b5addb8b75597` |
| Registry | `817cb9d4c66e3afaf84f1c55db97ee6e22cd72f8d82a6083b01d5c99b38f860b` |
| Deals feed | `df0ccbab9aef23615e445a0bae6f3a16dbe1dab0face24f4fa5fe8bf6110ed94` |
| Project ledger | `8af95b5a2627d455b2a2dc3cf7697c03a0d6db3a7fc14f31f8114994bad225eb` |

## Release recommendation

I submit candidate v3.429.0 for the Chairman's separate M4 Production Release Decree. The authorized rollback target is v3.428.0 deployment `dpl_5PUrAGqBthMJjrcHZSc3nCoUf1YL`. Any release decree should preserve the sealed hashes above, retain all eleven held records off public routes, and require post-deploy verification of the 87-entity registry, public card composition, module behavior, endpoint status, and link hygiene.
