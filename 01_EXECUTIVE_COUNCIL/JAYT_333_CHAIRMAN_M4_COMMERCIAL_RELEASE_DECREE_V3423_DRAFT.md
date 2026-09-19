# TẬP ĐOÀN JAYT CORP — VĂN PHÒNG CHỦ TỊCH

# DỰ THẢO SẮC LỆNH M4 COMMERCIAL RELEASE v3.423.0

**Mã văn bản:** `JAYT-333 — M4 COMMERCIAL RELEASE DECREE v3.423.0`  
**Trạng thái:** `DRAFT__NOT_SIGNED__NO_DEPLOY_AUTHORITY`  
**Ngày lập dự thảo:** 07/09/2026  
**Môi trường mục tiêu:** `https://jayt-production-v3420.vercel.app`

## Điều 1 — Phạm vi trình phê duyệt

Dự thảo trình Chủ tịch xem xét phát hành Production `v3.423.0` với đúng **47 thẻ**:

- 24 thẻ công ích thuộc baseline Production `v3.422.0`;
- 23 thẻ thương mại đã vượt cổng địa bàn và nằm trong allowlist M4;
- loại trừ tuyệt đối `B14_DMX_M170_DEN` do chứng cứ locator trả HTTP 500, không đủ điều kiện công bố.

Không có mã voucher tự sinh, không có link affiliate và không có tham số tracking. Giá và điều kiện hiển thị phải giữ nguyên cảnh báo kiểm tra lại nguồn, thời điểm quan sát, khả năng thay đổi và tình trạng tồn kho.

## Điều 2 — Fingerprint bắt buộc của gói phát hành

Chỉ được triển khai nếu toàn bộ fingerprint sau khớp bit-for-bit:

| Artifact | SHA-256 |
| --- | --- |
| `candidate_manifest.json` | `29129e135fdbd8d30d3b4f59a0f09e1aa76e190cb5bf7f6b3265047bd9172ae7` |
| `jayt_storefront_v3423.js` | `e696e873b533080d1e551c3bbdbb4c987dad7ee3d51dd75696ba57e4aa0ac48b` |
| `index.html` | `839c8b86fe69b83bb6329236efa23b472fc2d863a6d2192b146609bb7a4c64bf` |
| `styles.css` | `36d51c0963e7576968094548eb10e6bb10366fadd3a5e021528f768879de0f1e` |
| `registry.json` | `b0e3d9eab6ead07a1d6cfd890cf0c44c89709f62495c77519a315e53fd410bfa` |
| `board_a_afterglow_hero.svg` | `de9f194bd3c639d75af09f01f4684ad8fc63b2e52b1ebe89514b9b55331500d3` |
| `RC_V3423_CANDIDATE_AUDIT_RECEIPT.json` | `ccbcb648ab59f31078ae147e5909aa8315c1eff5301cd059754ba4431ba36054` |
| Commercial pilot catalog | `89bb412725adf12921b4a36b90e5e7d0aabdfcf36d391a3797b9a1737c945894` |

## Điều 3 — Trình tự thi hành sau khi ký

1. Xác minh lại fingerprint và trạng thái `deployment_authorized` theo quyết định đã ký.
2. Triển khai nguyên gói candidate đã niêm phong; không chỉnh sửa nóng trong lúc deploy.
3. Hậu kiểm Production bắt buộc: HTTP 200, nhãn `v3.423.0`, đúng 47 thẻ (24 công ích + 23 thương mại), không có `B14_DMX_M170_DEN`, 0 lỗi console/runtime, 0 overflow tại 1440/768/390 px, 0 affiliate/tracking.
4. Nếu bất kỳ cổng nào không đạt, dừng phát hành và hoàn nguyên alias về baseline khỏe mạnh `v3.422.0`.

## Điều 4 — Ranh giới rollback

Gói standby `v3.422.0` đã được xác minh toàn vẹn artifact. Việc đổi alias/pointer rollback chưa được thực diễn trong đợt audit candidate và **chưa có số đo RTO thực tế**; biên nhận sau deploy phải ghi rõ thời gian nếu rollback được kích hoạt.

## Điều 5 — Hiệu lực

Dự thảo này không phải lệnh triển khai. Cho đến khi Chủ tịch ký duyệt rõ ràng và trạng thái phát hành được chuyển bằng chứng từ riêng:

- `is_approved: false`;
- `deployment_permitted: false`;
- Production `v3.422.0` tiếp tục bất biến.

**Quyết định của Chủ tịch:** `PENDING`  
**Chữ ký/Approval ID:** `PENDING`
