# TẬP ĐOÀN JAYT CORP — VĂN PHÒNG CHỦ TỊCH

# SẮC LỆNH PHÁT HÀNH CHÍNH THỨC M4: JAYT-333

**Mã văn bản:** `JAYT-333 — EXECUTIVE PRODUCTION DEPLOYMENT DECREE v3.423.0`  
**Trạng thái:** `SIGNED__DEPLOYMENT_AUTHORIZED`  
**Ngày hiệu lực:** 07/09/2026  
**Production target:** `https://jayt-production-v3420.vercel.app`

Chủ tịch Tập đoàn chính thức phê chuẩn: **“Phê duyệt và deploy Production v3.423.0 theo Sắc lệnh M4 JAYT-333.”**

## Điều 1 — Phạm vi được cấp quyền

- `is_approved: true`
- `deployment_permitted: true`
- `deployment_authorized: true`
- Phạm vi: đúng 47 thẻ, gồm 24 thẻ công ích và 23 thẻ thương mại đã xác minh địa bàn.
- Loại trừ fail-closed: `B14_DMX_M170_DEN`.
- Không mã voucher tự sinh, không affiliate link, không tracking parameter; `deals_feed.json` tiếp tục là `[]`.

## Điều 2 — Gói niêm phong được phép triển khai

| Artifact | SHA-256 |
| --- | --- |
| `candidate_manifest.json` | `29129e135fdbd8d30d3b4f59a0f09e1aa76e190cb5bf7f6b3265047bd9172ae7` |
| `jayt_storefront_v3423.js` | `e696e873b533080d1e551c3bbdbb4c987dad7ee3d51dd75696ba57e4aa0ac48b` |
| `index.html` | `839c8b86fe69b83bb6329236efa23b472fc2d863a6d2192b146609bb7a4c64bf` |
| `styles.css` | `36d51c0963e7576968094548eb10e6bb10366fadd3a5e021528f768879de0f1e` |
| `registry.json` | `b0e3d9eab6ead07a1d6cfd890cf0c44c89709f62495c77519a315e53fd410bfa` |
| `board_a_afterglow_hero.svg` | `de9f194bd3c639d75af09f01f4684ad8fc63b2e52b1ebe89514b9b55331500d3` |
| `RC_V3423_CANDIDATE_AUDIT_RECEIPT.json` | `ccbcb648ab59f31078ae147e5909aa8315c1eff5301cd059754ba4431ba36054` |

Không được sửa nóng các artifact trong quá trình triển khai.

## Điều 3 — Hậu kiểm và rollback

Sau deploy phải xác minh HTTP 200, phiên bản `v3.423.0`, đúng 47 thẻ tại 1440/768/390 px, 0 lỗi console/runtime, 0 overflow, không có thẻ bị loại trừ, 0 affiliate/tracking và không có voucher giả.

Nếu một cổng không đạt, lập tức dừng nghiệm thu và đưa Production về baseline khỏe mạnh `v3.422.0`. Gói `v3.422.0` đã xác minh toàn vẹn; RTO chỉ được ghi nhận từ lần rollback thực tế nếu phát sinh.

**Approval ID:** `JAYT-333-CHAIRMAN-M4-COMMERCIAL-RELEASE-v3.423.0`
