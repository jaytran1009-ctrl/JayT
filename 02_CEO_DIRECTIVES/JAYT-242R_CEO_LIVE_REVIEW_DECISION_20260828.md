# JAYT-242R — CEO Live Review Decision

**Ngày kiểm tra:** 2026-08-28  
**Quyết định:** `REJECTED — P0 PUBLIC ARCHIVE EXPOSURE`  
**Áp dụng cho:** báo cáo/walkthrough JAYT-242R v3.399.0 do Antigravity bàn giao.

## Những gì được xác nhận độc lập

Trang chủ production v3.399.0 hiện hiển thị Tier 4 như Radar và không lộ Buy/Wait, giá, AccessTrade hoặc commercial tracking link trong DOM kiểm tra. Đây là **surface containment ở trang chủ**, không phải nghiệm thu release.

## Lý do từ chối

1. Antigravity báo archive cũ “không bị copy sang deploy”, nhưng kiểm tra local cho thấy các archive có mặt trong `deploy/` và `deploy/public/`.
2. CEO truy cập trực tiếp production và xác nhận URL sau đang public:

   `https://deploy-ten-xi-48.vercel.app/historical_archive_containment/daily_supply_feed_116.json`

   File đó chứa claim ưu đãi/coupon/giá cũ, gồm ví dụ `PAYDAY`, “Giảm 30.000₫”, điều kiện, hạn dùng và scope. Đây là dữ liệu legacy mà JAYT-242R cam kết đã được cô lập khỏi production.
3. Gate `test_jayt_242_full_source_integrity_gate.js` không quét recursive toàn bộ active/deploy/public; nó chỉ duyệt một danh sách file hard-code. Vì vậy pass của gate không phủ public archive.
4. Báo cáo nói 11 bundles Tier 4 chỉ giữ exact whitelist đã công bố. Kiểm tra độc lập thấy mỗi bundle vẫn có các key ngoài whitelist đó (`brand_name`, `raw_quote_exact`, `terms`, `validity`, `scope`). Những key này không tự động là claim thương mại, nhưng báo cáo whitelist là không chính xác và gate không validate bundle keys.

## Lệnh P0 bắt buộc

1. **Loại bỏ khỏi artefact deploy và public serving** toàn bộ `historical_archive_containment/` và mọi legacy feed/asset tương tự. Không chấp nhận “ẩn khỏi menu”, đổi tên, hoặc đặt trong public directory. Lưu archive ngoài deployment root hoặc storage không public với manifest quarantine bất biến.
2. Đưa recursive deploy/public scan vào gate. Gate phải enumerate mọi file được serve, fail với legacy source/feed, forbidden commercial-price tokens, hoặc `historical_archive_containment` trong deploy/public.
3. Gate Tier 4 phải validate cả card **và evidence bundle** theo schema công bố; nếu bundle cần schema evidence riêng, công bố schema đó trước và không mô tả là card whitelist.
4. Nộp evidence mới: file inventory deploy trước/sau, SHA-256 quarantine manifest, HTTP 404/410 (hoặc equivalent deny) từ production cho từng legacy path đã biết, recursive public-route scan, và CEO browser audit sau deploy.

## Ranh giới quyết định

Không có CEO acceptance cho M0, JAYT-242R, 43 claims Tier 1–3, hay bất kỳ performance/QA claim nào. Không được sửa `PROJECT_MEMORY.md` để ghi CEO approval. Chỉ khi public archive exposure đã được loại bỏ và chứng minh độc lập, release mới được quay lại trạng thái `Ready for CEO Live Review`.
