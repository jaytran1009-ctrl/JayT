# JAYT-344 — Tờ trình M4 và lệnh thi công phát hành Sprint B

Người trình: Codex, CEO / Gatekeeper. Đơn vị thi công: Antigravity.
Trạng thái: SUBMITTED_FOR_CHAIRMAN_SIGNATURE.
Đích phát hành: https://jayt-production-v3420.vercel.app

## 1. Quyết định có hiệu lực ngay

Theo chỉ thị trực tiếp JAYT-344 của Chủ tịch, điều kiện transcript và kiểm thử thiết bị thật tại JAYT-342/JAYT-343 được thay thế bằng WAIVED_BY_CHAIRMAN. Kiểm tra thủ công chuyển sang giám sát trải nghiệm hậu phát hành, không chặn thụ lý hoặc phát hành. Waiver không được ghi thành kết quả manual PASS. Kiểm toán trợ năng và contrast tự động là căn cứ kiểm thử của phiên này.

CEO thụ lý gói Sprint B đã nghiệm thu, trình Chủ tịch ký phát hành ngay trên phạm vi và fingerprint bên dưới. Không yêu cầu bổ sung một vòng xin duyệt checklist thủ công.

## 2. Phạm vi trình ký

- Gói giao diện: staging_preview_sprint_b/.
- Registry nền: 51 mục (24 công ích + 27 thương mại).
- Vault: 12 mục, gồm 7 giá quan sát, 2 ưu đãi quầy, 2 quyền lợi hội viên, 1 voucher ứng dụng; 0 mã voucher công bố.
- Radar: 15 mục, gồm 13 sản phẩm và 2 chương trình; không gọi là 15 thiết bị độc lập.
- Split Bill và lịch tiết kiệm 7 ngày theo bản đã nghiệm thu.
- Không cộng các mục hiển thị lại qua module thành thẻ mới trong registry.
- Giữ loại trừ các ID HELD; deals_feed.json = []; affiliate và tracking không được bật.

## 3. Fingerprint đối chiếu trên đĩa

| Tệp trong staging_preview_sprint_b/ | SHA-256 |
|---|---|
| index.html | 397649d1817bef65ebe3087eb2299ec582155dcb08919ba2f991c8c7fa603484 |
| jayt_storefront_sprint_b.js | 872967c396b5d44df576c58ad74b8655b1054923a96036956aecd977ce36d5f3 |
| styles.css | fddcfbb55f78a89bca5986799e5a6ee2f3328cac6bc779fb56fbc879d79b69b6 |
| registry.json | bab51db53f5f34934c539968484a2f8055f3fa61786db608b91b9db9349b40c6 |
| deals_feed.json | 37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570 |

Biên nhận kiểm thử hiện có: 07_QUALITY_ASSURANCE/runtime_evidence/JAYT_342_SPRINT_B_REMEDIATION_AUDIT_RECEIPT.json; SHA-256: 6de09c2fe377ab6fcca7a1609490ca8efc5cd33cee5d3ce2e00ee7dfd4651217.
Không tự xác nhận con số 28/28: chỉ thị có nêu con số này, nhưng biên nhận được đối chiếu chưa cung cấp danh sách 28 assertion để kiểm chứng. Antigravity gắn biên nhận tương ứng vào cùng hồ sơ triển khai, không tạo thêm vòng thủ tục.

## 4. Lệnh giao Antigravity

Ngay bây giờ: chuẩn bị gói triển khai nguyên trạng theo fingerprint; liên kết biên nhận automated a11y/contrast với đúng bundle; đối chiếu tài nguyên phụ thuộc và cấu hình phục vụ. Kết quả tự động phải là kết quả đo thực, không suy ra từ waiver.

Khi Chủ tịch ký phần 5: deploy gói trên vào domain đã chỉ định; hậu kiểm HTTP 200 cho /, /registry.json và /deals_feed.json; đối chiếu registry 51 mục cùng từng module, luồng chia tiền, các ID loại trừ, console/runtime và overflow tại 1440/768/390. Không hot-edit bundle giữa kiểm thử và deploy.

Rollback đích: v3.423.0, 47 thẻ, deployment dpl_9Gug4BDaBDxzpUXXAv1HrGAcLZmA, artifact deploy_personal_v3423/. Kiểm tra target có thể phục hồi trước khi đổi alias; nếu hậu kiểm thất bại thì phục hồi alias về target này và kiểm tra lại. Trạng thái standby hiện được tham chiếu từ RELEASE_MANIFEST.json; đây không phải tuyên bố đã thử rollback trong phiên này.

Sau thực thi: nộp một deployment receipt gồm deployment ID, hashes, hậu kiểm, rollback nếu có; append giao dịch vào PROJECT_MEMORY.md. Bảo toàn biên nhận lịch sử, các lần chạy mới dùng đích ghi riêng.

## 5. Nội dung trình Chủ tịch ký

“Phê duyệt phát hành gói Sprint B theo phạm vi và fingerprint tại JAYT_344_M4_SPRINT_B_RELEASE_DECREE_FOR_SIGNATURE.md; cho phép Antigravity deploy lên jayt-production-v3420.vercel.app và rollback về v3.423.0 nếu hậu kiểm thất bại. Kiểm thử thiết bị thật được WAIVED_BY_CHAIRMAN và chuyển sang hậu phát hành.”

Chữ ký/phê chuẩn của Chủ tịch: CHỜ KÝ THEO ĐIỀU 2 JAYT-344.
CEO đã trình văn bản; chưa đại diện ký thay Chủ tịch.
