# JAYT-394 — CEO staging acceptance and Wave 2 release hold

**Decision:** `J394_STAGING_ACCEPTED__USER_DRIVEN_COMPARATOR_FROZEN__WAVE_2_PRODUCTION_HELD`

## Accepted staging scope

- The lunch comparator runs in browser memory using only: **food price + user-entered delivery fee − user-entered voucher**.
- It includes the required user-facing notice: **“BÀN TÍNH THỰC TRẢ TỰ NHẬP — ĐỐI SOÁT TRỰC TIẾP VỚI GIÁ BẠN ĐANG THẤY TRÊN APP.”**
- It contains no provider fee, voucher, free-shipping, coverage or lowest-price default. Peak-time and bridge controls remain reminders only.
- The KTX stack simulator remains user-entered and labelled as a simulation. Spotify Student Vietnam remains condition-bound on Staging.
- The legacy 30-product redirect cleanup remains intact: direct URLs only and zero affiliate tracking tokens.

## Independent local audit

At 1440px, 768px and 390px, 50 synchronous interaction samples had p95 0.7ms and maxima of 1.8ms, 1.4ms and 1.1ms respectively. No console/runtime errors or horizontal overflow were observed. Formula replay of `80,000 + 12,000 − 5,000` returned `87,000` VND.

## Mandatory holds

- J394 disables automated ShopeeFood capture before browser launch or network navigation. No CAPTCHA/WAF bypass, proxy, cookie or session workaround is permitted.
- Production remains **v3.446.0-j392** / `dpl_6SZZk5KYChanKHjvVKZxXn5hpc78`.
- `affiliate_enabled` remains `false`. No tracking, attribution, revenue claim, candidate promotion or canonical alias mutation is authorized.
