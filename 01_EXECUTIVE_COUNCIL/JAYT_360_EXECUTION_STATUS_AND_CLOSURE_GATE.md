# JAYT-360 — Biên bản thực thi và điều kiện đóng blocker

Người thực thi kiểm tra: Codex CEO/Gatekeeper. Thời điểm thực tế được ghi bằng đồng hồ máy trong receipt; không dùng timestamp suy đoán từ hồ sơ cũ.

## Điều 1 — Hot-correction

Đã chuẩn bị gói `08_RELEASE_VAULT/candidates/v3.429.0-j360-hotfix/` từ candidate v3.429.0. Chỉ đổi `deals_feed.json.environment` sang `PRODUCTION_SERVED_VERIFIED`. Đã kiểm tra JSON sau khi chuẩn hóa trường environment bằng hệt bản gốc; registry, index, CSS và JavaScript giữ nguyên bytes. Candidate cũ và staging giữ nguyên để bảo toàn evidence.

Đã thực thi `npx vercel deploy --prod --yes` trong gói hotfix, đúng project `jayt-production-v3420`. Vercel CLI 59.13.1 trả exit 1, `deploy_failed: Not authorized`. Đây là lỗi quyền ở Vercel, không phải yêu cầu phê duyệt mới từ Chủ tịch. **Chưa có deployment thành công; Điều 1 chưa đóng.** Antigravity cần dùng tài khoản có quyền project đã liên kết để triển khai gói đã chuẩn bị. Không phát hành v3.430.0.

Sau deploy, phải đối soát live với gói: chỉ environment khác baseline; toàn bộ 87 định danh, 40 record feed / 29 public offers giữ nguyên. Candidate manifest cũ trong bản sao là hồ sơ lineage, không phải niêm phong mới: phải tạo receipt hotfix với hash mới và cập nhật fingerprint monitoring có kiểm soát trước khi tuyên bố hoàn tất.

## Điều 2 — Kiểm toán thực trên bytes live

Runner: `07_QUALITY_ASSURANCE/audit_jayt_360_live.cjs`.
Receipt: `07_QUALITY_ASSURANCE/runtime_evidence/JAYT_360_LIVE_RUNTIME_AUDIT_RECEIPT.json`.

Runner lấy hash HTTP của index, registry, feed, JS và CSS; chạy Chromium tại 1440/768/390 trên sáu route; đếm thẻ DOM có layout, kiểm tra overflow, console/pageerror, thực hiện phép tính trên giá lấy từ toàn bộ thẻ inline thật, đọc clipboard hệ thống của Chromium khi xuất Zalo Pass, ghi network trong thao tác export và số lần gọi GPS. Mọi giá trị thử người trả đều là marker giả lập, không dùng dữ liệu cá nhân thật và không gửi tin nhắn tới Zalo.

Kết quả lần chạy hoàn tất: mỗi viewport có 24 civic ở HOME, 29 Voucher ở VOUCHER_HUB, 15 Radar ở VALUE_RADAR: tổng 68 thẻ theo ba nhóm, không cộng lại 29 thẻ lặp ở EXPLORE. Không phát hiện console error, runtime exception hoặc overflow ngang ở sáu route đã thử. Cả 15 link Radar trả HTTP 200. Ba endpoint chính lần lượt 348/165/118 ms trong mẫu đo này.

Split Bill thực tế có **26** control giá, khác mốc **25** trong sắc lệnh/hồ sơ cũ. Cả 26 phép thử tổng tiền và phần chia ba hiển thị đúng theo oracle của runner ở mỗi viewport; thất bại `25 Split Bill amounts` là sai khác số lượng, không phải 26 phép tính sai. Cần đối soát ID tăng thêm và kiểm thử đầy đủ phân bổ số dư/boundary trước khi đóng gate. Các bài thử này chưa phải chứng nhận mọi tổ hợp đầu vào.

Phát hiện: production còn nhãn staging; Copy hiển thị `SPPGALAXY09` trong JS/DOM nhưng feed live không có trường code tương ứng để chứng minh nguồn; Split Bill đưa nguyên thông tin người trả vào Zalo Pass và clipboard. Vì vậy không thể chứng nhận Zero-PII tuyệt đối. Phép thử không thấy request xuất thông tin đó lên mạng, GPS hoặc browser storage trong hành trình thử không đồng nghĩa một chứng minh toàn bộ heap/server logs.

**Receipt có trạng thái FAIL khi còn bất kỳ phát hiện nào.** Không được đổi thành PASS bằng sửa kỳ vọng hoặc xóa kiểm thử. Với mã copy, cần evidence mã thật gắn đúng offer và validity; không được kết luận mã giả chỉ vì feed thiếu trường. Với privacy, cần sửa cơ chế xuất để đáp ứng đúng yêu cầu Chủ tịch hoặc trình Chủ tịch điều chỉnh phạm vi; bản hotfix một trường hiện tại không bao gồm sửa chức năng.

Đính chính JAYT-359: hồ sơ JAYT-357 có receipt lịch sử ghi 68 thẻ = 24 civic + 29 voucher + 15 Radar. 87 là định danh registry, không phải 87 thẻ. Kiểm toán mới dùng DOM hiện thời; route lặp không được cộng trùng khi tính tổng.

## Điều 3 — Batch 19

Đã lập `04_DATA_PIPELINE/dispatch/WORK_ORDER_J360_BATCH19_RECAPTURE.json`, sẵn sàng để Antigravity nhận thi công. Không có biên nhận bên ngoài xác nhận đã nhận dispatch trong phiên này.

Hồ sơ R4 mới hơn R3/R9 cũng báo 0 VERIFIED / 10 HELD. Dispatch yêu cầu detail-leaf text có span, offset và hash riêng cho từng điều khoản; giữ trust root và chống lấy nhầm giá/locality/validity. Đã cấp hai discovery ID cho The Coffee House và Popeyes, chưa coi là offer được chứng thực và không dùng để thay mẫu số 10 ban đầu. Mục tiêu tối thiểu 8/10 không cho phép tự sinh bằng chứng hoặc hạ điều kiện nghiệm thu.

## Điều 4 — Rollback và release

Rollback drill về deployment v3.428.0 `dpl_5PUrAGqBthMJjrcHZSc3nCoUf1YL` **chưa thực hiện**, do tài khoản Vercel không có quyền deploy; không có RTO thực đo. Antigravity phải xác minh target rollback, lưu target v3.429.0 hiện hành, chuyển alias, đo từ lúc bắt đầu đến lúc ba endpoint và hash rollback khớp, rồi khôi phục v3.429.0 đã sửa và xác minh lần nữa. Lưu timestamps/command outcomes/endpoints/hashes cho cả hai lần chuyển; không báo drill PASS bằng mô phỏng.

v3.430.0 tiếp tục chưa được phép phát hành. Điều kiện đóng: hotfix live verified, runtime receipt PASS, CEO nghiệm thu tối thiểu tám offer gốc, rollback drill có RTO, sau đó Chủ tịch cấp quyền release riêng.

## Việc cần bàn giao ngay

Antigravity: dùng tài khoản Vercel có quyền để deploy hotfix và chạy lại audit; xử lý hai phát hiện copy provenance/privacy theo scope đã duyệt; thực hiện dispatch recapture và trả receipt. Thời hạn hai giờ của Điều 1 chưa thể xác nhận đạt khi deploy bị từ chối. Codex không xác nhận thay một thao tác chưa thực hiện thành công.
