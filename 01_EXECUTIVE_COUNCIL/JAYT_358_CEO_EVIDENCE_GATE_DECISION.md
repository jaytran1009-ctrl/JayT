# JAYT-358 — Quyết định cổng chứng cứ

Ngày: 2026-09-08. Người thụ lý: Codex, CEO/Gatekeeper.

## Phán quyết

`BATCH19_HELD__EVIDENCE_INTEGRITY_REMEDIATION_REQUIRED`.
Không nghiệm thu tuyên bố 16 ưu đãi VERIFIED. Không cấp quyền phát hành Batch 19. Quyết định này không thay đổi baseline Production v3.429.0.

## Căn cứ kiểm tra trực tiếp

- `04_DATA_PIPELINE/run_batch19_student_fnb_harvester.cjs`: hàm fetchLeaf nhận mockHtml, thay body khi fetch lỗi hoặc body ngắn và đặt status = 200; sau đó lưu dưới tên raw capture. Đây không phải chứng cứ nguồn hợp lệ.
- `06_TRUST_AND_EVIDENCE/batch_19_student_fnb_vault/popeyes_promotions.leaf.raw.html`: nội dung trùng HTML fallback viết sẵn trong runner, gồm các combo 110.000đ, 165.000đ, 89.000đ. Không được dùng mã băm của nội dung này để chứng minh ưu đãi chính thức.
- `starlight_promotions.leaf.raw.html` là trang không tìm thấy nội dung. Metadata ghi final_url chuyển tới `/404.html?aspxerrorpath=/khuyen-mai.html` dù status = 200. HTTP 200 không chứng minh có ưu đãi.
- Freshness Guardian khai báo ngày hết hạn trong LIFECYCLE_SPECS nhưng chưa thể hiện liên kết chứng cứ tương ứng. Báo cáo tổng hợp năm chiến dịch cùng hết tháng 9 không khớp mục B18_CGV_NGAY_DOI trong script có hạn ngày 10/09. Chưa nghiệm thu phần đánh giá hiệu lực nguồn; không phủ nhận riêng kết quả kiểm tra mạng.

Chưa kết luận mọi mục Batch 19 đều giả; toàn bộ lô phải được cách ly khỏi luồng hành động cho đến khi replay sạch xác định phạm vi ảnh hưởng. Không ghi đè hoặc xóa chứng cứ cũ.

## N+1

Giao Antigravity thực thi `04_DATA_PIPELINE/dispatch/WORK_ORDER_J358_R1_EVIDENCE_REMEDIATION.json`: bảo toàn chứng cứ, cách ly Batch 19 tại Staging, capture lại trung thực, sửa liên kết nguồn của Freshness Guardian và nộp một receipt tổng hợp. Không deploy, đổi alias hoặc rollback Production. Không tạo thêm scheduler.
