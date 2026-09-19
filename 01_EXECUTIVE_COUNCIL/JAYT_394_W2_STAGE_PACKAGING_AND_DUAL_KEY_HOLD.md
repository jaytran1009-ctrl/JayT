# JAYT-394 — W2 STAGE PACKAGING & DUAL-KEY HOLD

## Quyết định CEO/Gatekeeper

`W2_STAGE_PACKAGED__KEY1_PENDING__NO_PRODUCTION_MUTATION`

Manifest đóng gói: `08_RELEASE_VAULT/W2_STAGE_TO_PROD_RELEASE_MANIFEST.json`.

## Căn cứ đã kiểm tra tại workspace

- Wave 1 có đủ hai receipt vật lý: Metiz Helio U22 và Galaxy Happy Day.
- Biên nhận JAYT-394 xác nhận comparator bữa trưa user-driven, không có phí/voucher mặc định hoặc xếp hạng nhà cung cấp.
- Collector ShopeeFood bị vô hiệu hóa trước browser/network theo chính sách JAYT-394; không có artifact capture mới.
- Triple-sync source/deploy đạt SHA-256 `2831c37250237e12d8bc306db5a26c80cbfa60ac43b4e10530edc5e6a4e8d696`.
- Affiliate router tiếp tục `affiliate_enabled: false`.

## Ranh giới phát hành bất biến

- `is_approved: false`.
- `production_alias_mutation_authorized: false`.
- Production vẫn giữ `v3.446.0-j392` / `dpl_6SZZk5KYChanKHjvVKZxXn5hpc78`.
- Key 1 (Chairman Sponsor) còn `PENDING_EXECUTION_SIGNATURE`; chưa được suy diễn thành quyền deploy.
- Key 2 được ghi nhận ở phạm vi staging/safety, nhưng không tự cấp quyền thay đổi Production.

Chỉ sau khi hai khóa được ký và bind độc lập, CEO mới được xem xét promote; trước thời điểm đó mọi thay đổi alias, deploy Production và kích hoạt affiliate đều bị từ chối.
