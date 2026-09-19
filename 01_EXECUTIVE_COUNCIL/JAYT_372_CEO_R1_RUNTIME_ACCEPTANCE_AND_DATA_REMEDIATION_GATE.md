# JAYT-372 CEO R1 — Chấp thuận runtime một phần, yêu cầu hiệu chỉnh dữ liệu

**Deployment kiểm tra:** `dpl_FD5zGaNobEYSPBdRkNRxKYjE7ZHc`  
**Quyết định:** `RETENTION_UI_AND_ZALO_PASS_ACCEPTED__CAMPUS_AND_PRODUCT_ASSERTIONS_NOT_ACCEPTED__DIRECT_PRODUCTION_REMEDIATION_AUTHORIZED`

Production J372 đã phục vụ đúng bytes được ghi trong biên nhận: các endpoint chính, thư viện QR, ảnh hero và thumbnail mẫu đều HTTP 200. Campus Dock, lọc tại client, per-offer Zalo Pass, PNG Canvas và lưới 30 SKU được chấp thuận về mặt giao diện và chức năng. QR hiện là “QR mở kèo”, không phải QR thanh toán, phù hợp với quy định đã ban hành. Benchmark input-to-DOM p95 3.7ms đạt mục tiêu 20ms; frame p95 31.7ms phải được giữ như số đo thực tế, không diễn giải thành frame dưới 20ms.

Không chấp thuận các tuyên bố dữ liệu sau:

1. `campus_offer_mapping.json` đưa 8 mục trước đó HELD hoặc hết hạn vào các cluster. Ví dụ: `B19_TPC_COMBO_VU_LAN_315K`, `B19_TPC_BO_DOI_NHU_Y_169K`, `B19_POPEYES_BOGO_MON`, `B19_POPEYES_BOGO_WED`. Chúng không được hiện trong kết quả “áp dụng tại cụm trường” cho đến khi có capture điều khoản hiện hành.
2. Cả 30 SKU trong `product_badge_and_link_evidence.json` đều tự gắn `seller_verified: true` nhưng không có trường capture, snapshot hay nguồn kiểm chứng trong manifest. Nhãn Shopee Mall/Tiki Trading và giá cần chuyển thành trạng thái chưa xác thực cho tới khi có bằng chứng thật theo từng SKU.
3. Bundle có fallback code `JAYT370`. Dù chưa có thẻ nào dùng fallback ở deployment hiện tại, fallback phải bị loại bỏ: nếu thẻ code thiếu code thật, ẩn nút copy và dùng CTA điều kiện/nguồn phù hợp.

Các tem “Đáy 90 ngày” đang vắng mặt là đúng. “Freeship theo điều kiện” chỉ được giữ trên mỗi SKU khi kèm điều kiện/snapshot thực tế của SKU hoặc sàn; nếu chỉ là mô tả chung, bỏ tem và giữ giá quan sát có ngày.

Antigravity được quyền hiệu chỉnh trực tiếp Production dưới JAYT-372 R1. Phần UI, Campus Dock và Zalo Pass không cần chờ nguồn affiliate để tiếp tục hoạt động; chỉ phạm vi/nhãn dữ liệu cần được hạ đúng mức chứng cứ.
