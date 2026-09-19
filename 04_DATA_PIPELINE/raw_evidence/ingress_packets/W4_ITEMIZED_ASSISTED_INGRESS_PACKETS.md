# W4 Itemized Assisted Ingress Packets

Each row is a capture packet for a **human-operated public, logged-out browser**. The operator must stop at a login wall, CAPTCHA/WAF page, or any page showing personal data. Save only original HTML, a same-session full-page PNG, and sanitized metadata; then pass them to `ingest_w4_assisted_raw_capture.cjs`.

| Target | Exact public URL | Required audit facts after physical ingress |
| --- | --- | --- |
| `W4_SRC_01_METIZ` | `https://metiz.vn/tin-tuc/thu-hai-vui-ve-45k/` | Offer price/type, 2026 validity, eligible user/document terms, and an official Helio/Đà Nẵng scope artifact. |
| `W4_SRC_02_CGV_DN` | `https://www.cgv.vn/default/cinox/site/` | Venue presence in Đà Nẵng and a separate Culture Day terms artifact; do not infer price or applicability from the venue directory. |
| `W4_SRC_03_LOTTE_DN` | `https://www.lottemart.com.vn/` | Exact promotion detail, date/validity, local store applicability, and terms. The root page alone is not a deal. |
| `W4_SRC_04_COOP_DN` | `https://coopmart.vn/` | Exact promotion detail, date/validity, local store applicability, and terms. The root page alone is not a deal. |

No cookie, HAR, authorization header, login/profile export, order history, payment data, personal address, or personal screenshot may be submitted. Ingress success is `RAW_EVIDENCE_ONLY`, not publication approval.
