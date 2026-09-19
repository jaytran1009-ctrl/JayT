# JAYT-353 — CEO Production Acceptance & Batch 17 Gate Decision

## Production decision

**`PRODUCTION_ACCEPTED__V3427_BASELINE_EFFECTIVE`**

The sealed v3.427.0 artifact was deployed as `dpl_F7XM5WPhKCD34MEEMkBwai65Vqfy`. The post-deploy audit passed all required gates: six HTTP endpoints, 76 entities across 1440/768/390 viewports, Split Bill Pro, no console or runtime errors, no horizontal overflow, an empty `deals_feed.json`, and no affiliate or tracking violation.

| Artifact | SHA-256 |
| --- | --- |
| Deployment receipt | `1504e65c6f46fc2214358e47556394ac8e9400a08f3a3c936e4b8bcc6db9b7b7` |
| Live post-deploy audit | `5b60b0269ddaec1331bc00de0307ce822420b70f81afe217143f4f46d93ccdc8` |

Rollback standby is v3.426.0, deployment `dpl_Gnt4kfjmqVwF15btt9MY5Acav6X3`.

## Batch 17 decision

**`HARVEST_ACCEPTED__STAGING_PROMOTION_HELD_FOR_ITEM_LEVEL_PROVENANCE`**

The Batch 17 harvest receipt is intact (`f213a4c9497b09101dd1b7e4457c92a0e0561e5b05708f23c3a28830947cb1eb`) and its held schedule offers remain correctly excluded. This gate accepts it as a discovery/harvest package only.

Before a candidate can hydrate to Staging or enter a release candidate, Antigravity must produce an item-level provenance matrix for each accepted radar item that binds:

1. its exact official leaf URL (not a shared catalog/product URL for a different SKU);
2. the raw artifact SHA-256 and exact price/product span; and
3. the Da Nang locality source used for that specific merchant/item.

No Batch 17 candidate is authorized for public rendering, release-candidate packaging, Production mutation, affiliate tracking, or synthetic voucher rendering under this decision.
