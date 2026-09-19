# JAYT-394 — DUAL-KEY EXECUTION AUTHORIZED

## Quyết định CEO/Gatekeeper

`DUAL_KEY_FULLY_CERTIFIED__PRODUCTION_PROMOTION_AUTHORIZED`

Manifest: `08_RELEASE_VAULT/W2_STAGE_TO_PROD_RELEASE_MANIFEST.json`  
Manifest SHA-256: `0f8915bcef40321457d016100236220bf6b307c8a6e5e7237fd35d913c77345f`

Production deployment: `dpl_BZ9JwJczaLSY45JTQiSsncKJzhVh` (`READY`, target `production`).

## Hai khóa được ghi nhận

- **Key 1 — Chairman Sponsor:** `CERTIFIED_PASS`, ký lúc `2026-09-11T20:55:00+07:00`, digest `SIG_CHAIRMAN_W2_CANONICAL_EXECUTION_APPROVED_9A44F`.
- **Key 2 — Strategic Advisor:** `CERTIFIED_PASS`, digest `SIG_ADVISOR_W2_FULL_PARITY_VERIFIED_7A92E`.

## Ranh giới bắt buộc khi promote

- `is_approved=true` và `production_authorized=true` chỉ áp dụng cho candidate đã kiểm tra đúng hash.
- `affiliate_enabled=false` không được thay đổi trong lần phát hành này.
- ShopeeFood automated capture vẫn `DISABLED_BY_POLICY`; comparator vẫn user-driven.
- Phải tái kiểm tra seal 24/24, parity hai workspace và candidate payload ngay trước lệnh Vercel.

- Hậu kiểm live đã xác nhận root, `published_manifest.json`, `registry.json` và `deals_feed.json` phục vụ metadata `v3.447.0-w2`; 2 Wave 1 offers vẫn giữ nguyên.

Nếu candidate integrity không khớp, lệnh promote phải dừng và Production baseline `v3.446.0-j392` được giữ nguyên.
