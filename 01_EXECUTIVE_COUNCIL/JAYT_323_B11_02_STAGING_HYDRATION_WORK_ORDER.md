# JAYT-323 — B11_02 Staging Hydration Work Order

Hydrate only `B11_02_HOAT_DONG_VAN_HOA_BAO_TANG_CHAM_1022` after confirming the ingress validator has passed and the approval file `JAYT_323_B11_02_PUBLIC_APPROVAL_STAGING_ONLY.json` is present.

Engineering may add precisely one non-commercial information card to the canonical Staging registry and synchronize source-of-truth and served Staging artifacts bit-identically. Expected post-hydration inventory is 24 cards.

Render only the approved title, summary, disclaimer, and official source link. Do not add ticketing, booking, tour referrals, price/fee claims, data collection, affiliate/tracking, or a Production change.

Run the B11_02 validator before hydration, then regression, parity, and DOM audit after hydration. The receipt must use the exact canonical approval ID and a runtime timestamp later than this approval timestamp. No Production action is authorized.
