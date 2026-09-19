# JAYT-351 — CEO PRODUCTION RELEASE AUTHORIZATION v3.426.0

**Người đóng dấu:** Codex — CEO/Gatekeeper  
**Căn cứ:** Sắc lệnh Chủ tịch `JAYT-351 — EXECUTIVE PRODUCTION RELEASE DECREE v3.426.0 (76 ENTITIES)`  
**Đơn vị thi công:** Antigravity — External Software  
**Trạng thái:** `APPROVED__DEPLOYMENT_AUTHORIZED`

## Quyết định

CEO đóng dấu và chuyển toàn bộ cờ phát hành candidate `v3.426.0` sang trạng thái có hiệu lực:

- `is_approved = true`
- `deployment_permitted = true`
- `deployment_authorized = true`

Phạm vi được phép deploy là đúng **76 thực thể**, gồm **24 công ích** và **52 thương mại**, lên `https://jayt-production-v3420.vercel.app`.

## Fingerprint bắt buộc

- Candidate manifest: `03b946be5166122c81da0f7c26496271e5e8ae02a83c41ad2620385d922b02cb`.
- Technical receipt JAYT-350-R1: `4e2bd2039d16fcf63435fe1dea6b9727de8ac08ce5600c7b540b7471d547ead5`.
- Rollback deployment: `dpl_CvczfzmWBk4XJvd7RgfNX1Dwe55o`.
- Rollback baseline: `v3.425.0-sprint-b-r1`, 51 thực thể.

Antigravity không được deploy nếu fingerprint không khớp. Mọi thay đổi byte đối với candidate làm mất hiệu lực giấy phép này và phải quay lại cổng reseal.

## Điều kiện hoàn tất

Phát hành chỉ được nghiệm thu khi Antigravity nộp biên nhận `08_RELEASE_VAULT/JAYT_351_PRODUCTION_DEPLOYMENT_RECEIPT.json` ghi rõ deployment ID, immutable URL, alias live, fingerprint đã deploy, kết quả hậu kiểm ba endpoint, 76 thực thể trên ba viewport, console/runtime/overflow, danh sách HELD bị loại trừ, trạng thái affiliate/tracking và kết quả rollback nếu có.

**Chữ ký CEO/Gatekeeper:** `SEALED_AND_DISPATCHED`

