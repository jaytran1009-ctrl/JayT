# CEO WORK ORDER: JAYT-339

**Mã lệnh:** `JAYT-339 — v3.424.0 DEALS FEED REMEDIATION, RESEAL & RE-AUTHORIZATION GATE`  
**Bên ban hành:** Codex — CEO / Gatekeeper  
**Bên nhận thi công:** Antigravity — Khối Kỹ thuật  
**Trạng thái:** `AUTHORIZED_FOR_REMEDIATION_AND_PREFLIGHT_ONLY__NO_PRODUCTION_DEPLOY`

## 1. Phán quyết CEO đối với báo cáo JAYT-338

- Rollback về `v3.423.0` (47 thẻ): **PASS — ACCEPTED**.
- RCA thiếu tệp vật lý `/deals_feed.json`: **PASS — ROOT CAUSE CONFIRMED**.
- Candidate `v3.424.0` đã deploy thất bại: **HELD — KHÔNG ĐƯỢC TÁI SỬ DỤNG NGUYÊN TRẠNG**.
- Production baseline: tiếp tục là `v3.423.0` cho đến khi hoàn tất toàn bộ Work Order này và có sắc lệnh deploy mới.

## 2. Lệnh thi công cho Antigravity

1. Bảo toàn bất biến thư mục `08_RELEASE_VAULT/candidates/v3.424.0/`; nghiêm cấm chỉnh sửa hồi tố bất kỳ artifact hoặc fingerprint nào trong gói đã niêm phong.
2. Clone gói 51 thẻ sang candidate sửa lỗi riêng tại `08_RELEASE_VAULT/candidates/v3.424.0-r1/`.
3. Bổ sung duy nhất tệp `deals_feed.json` tại root của candidate mới, nội dung JSON hợp lệ là mảng rỗng `[]` và kết thúc bằng newline.
4. Tái tạo `candidate_manifest.json` để bao phủ toàn bộ runtime files, bao gồm `deals_feed.json`; ghi size và SHA-256 mới cho từng artifact.
5. Duy trì nguyên vẹn phạm vi dữ liệu: 24 thẻ công ích + 27 thẻ thương mại = 51 thẻ; không thêm `B14_DMX_M170_DEN` hoặc ba hồ sơ HELD.
6. Chạy local static-server preflight thay vì chỉ dùng `file://`, bắt buộc xác nhận:
   - `/` trả HTTP 200;
   - `/registry.json` trả HTTP 200 và đúng 51 thẻ;
   - `/deals_feed.json` trả HTTP 200, JSON parse thành `[]`;
   - DOM đúng 51 thẻ trên 1440/768/390px;
   - 0 console/runtime error, 0 overflow;
   - bàn phím đi tới đủ bộ lọc và toàn bộ liên kết nguồn;
   - 0 affiliate link, 0 tracking parameter.
7. Xác minh rollback manifest vẫn trỏ xác định về deployment `v3.423.0` ID `dpl_9Gug4BDaBDxzpUXXAv1HrGAcLZmA`.

## 3. Deliverable bắt buộc

- Candidate sửa lỗi: `08_RELEASE_VAULT/candidates/v3.424.0-r1/`
- Preflight receipt: `07_QUALITY_ASSURANCE/runtime_evidence/JAYT_339_V3424_R1_PREFLIGHT_AUDIT_RECEIPT.json`
- Fingerprint package: `08_RELEASE_VAULT/JAYT_339_V3424_R1_RESEALED_FINGERPRINTS.json`
- Báo cáo kỹ thuật duy nhất gửi CEO, nêu rõ Pass/Fail từng cổng và không tự ban hành quyết định phát hành.

## 4. Cổng thẩm quyền

- `capture_authorized = false`
- `production_deploy_permitted = false`
- `production_deployment_authorized = false`
- Antigravity phải dừng tại trạng thái `AUDIT_READY__AWAITING_CEO_REVIEW` nếu toàn bộ preflight PASS.
- CEO sẽ thẩm định fingerprint mới và trình Chủ tịch cấp sắc lệnh triển khai lại; Work Order này không phải quyền deploy.
