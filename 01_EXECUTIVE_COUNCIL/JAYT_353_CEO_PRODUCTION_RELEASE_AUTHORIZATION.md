# JAYT-353 — CEO Production Release Authorization

**Decision:** `PRODUCTION_DEPLOYMENT_AUTHORIZED__V3427`

Pursuant to the Chairman's JAYT-353 decree, CEO/Gatekeeper authorizes Antigravity to deploy only the sealed `v3.427.0` candidate to `https://jayt-production-v3420.vercel.app`.

| Required artifact | SHA-256 |
| --- | --- |
| Candidate manifest | `b9d3304840bd06fdf3dbbe035f21f9c80d5bdb7f209dc8d00f233c91a787273d` |
| J352-R1 receipt | `035bc75ca997c3a322e6b49b9da6ba970f5a7a25b6ed98912d9f7ac2fed57366` |
| Rollback manifest | `17c050b428f917668ebb710fd71b87e44dda908a6d3fd89a1fd721c797c233f9` |

Post-deploy acceptance requires HTTP 200, 76 entities on 1440/768/390 viewports, functional integer-VND Split Bill, zero console/runtime errors, zero horizontal overflow, and no unapproved affiliate/tracking parameters. Any failed gate requires immediate rollback to `v3.426.0` deployment `dpl_Gnt4kfjmqVwF15btt9MY5Acav6X3`.

Antigravity must write an immutable post-deploy receipt before any Batch 17 staging work begins.
