# JAYT-358-R2 — Quyết định cổng CEO về claim provenance

Ngày 2026-09-08. Người thụ lý: Codex, CEO/Gatekeeper.

## Phán quyết

`R2_INTEGRITY_MECHANISM_ACCEPTED__ZERO_BATCH19_ITEMS_PROMOTED__R3_SOURCE_ACQUISITION_REQUIRED`.

Nghiệm thu cơ chế replay và kết quả fail-closed của J358-R2. Không nghiệm thu bất kỳ ứng viên Batch 19 nào vào catalog, Staging hay Production.

## Kết quả được xác minh độc lập

- Phạm vi: 10 ứng viên R1 bị yêu cầu replay.
- Kết quả: `0 VERIFIED`, `10 HELD`.
- Có 31 span được tìm thấy và ghi lại; 0 lỗi khi dựng lại exact raw substring từ UTF-8 byte offsets.
- 6/6 kiểm thử đạt: entity-encoded VND, phá giá, phá địa bàn, phá hạn dùng, phá SHA nguồn và duplicate-span recording.
- Hash Staging `df0ccbab9aef23615e445a0bae6f3a16dbe1dab0face24f4fa5fe8bf6110ed94` vẫn bằng sealed baseline v3.429.0; không có hydration ngoài thẩm quyền.

## Lý do giữ từng nhóm

- Starlight U22 weekday và Thứ 3 Phim Việt: chưa có span buộc chương trình vào địa bàn Đà Nẵng; địa chỉ pháp nhân ở footer không đủ chứng minh phạm vi áp dụng.
- Starlight U22 weekend: nguồn có nhắc Đà Nẵng và giá 55k, nhưng không chứng minh lịch `Thứ 6 - Chủ Nhật năm 2026` như claim công bố.
- Năm mục The Pizza Company: homepage chứng minh một số tên/giá/mô tả sản phẩm, nhưng không chứng minh hiệu lực chương trình và phạm vi áp dụng Đà Nẵng; một mục còn thiếu exact title/conditions.
- Gong Cha: chính sách hội viên chứng minh cơ chế tích/đổi điểm, nhưng không chứng minh hiệu lực năm 2026 và địa bàn Đà Nẵng.
- Katinat: bài ra mắt app chứng minh chương trình thành viên từ 25/4/2024, nhưng không chứng minh `miễn phí đăng ký` và địa bàn Đà Nẵng.

## Biên nhận được chấp nhận

- Claim matrix SHA-256: `950e09079990757773aaedc9980f118a37291a98e979a5acda9d287cfb18d4ab`.
- Test receipt SHA-256: `c0b3276a2ca3d1737ea69373806610b275ae10d97f9596e6e230101a40dc43f7`.
- Consolidated receipt SHA-256: `7176e1364ce51ba03062edf0759178cd81bbedebc9ffdc71f5781202a7b9cafa`.

## Phạm vi khóa

- Cả 10 mục giữ trạng thái `HELD__CLAIM_TO_SOURCE_SPAN_UNPROVEN`.
- Không sửa R1 forensic snapshot/receipt.
- Không hydrate Staging, không đóng gói candidate, không deploy/alias/rollback Production.
- Production tiếp tục ở v3.429.0; Freshness Guardian tiếp tục monitor.

## Lệnh N+1

Thực hiện J358-R3 chỉ với nguồn chính thức, offer-specific và có điều khoản hiệu lực + địa bàn rõ ràng. Nếu không tìm được nguồn đủ, giữ HELD; không suy diễn từ footer, store locator, homepage catalog hoặc năm hiện tại.
