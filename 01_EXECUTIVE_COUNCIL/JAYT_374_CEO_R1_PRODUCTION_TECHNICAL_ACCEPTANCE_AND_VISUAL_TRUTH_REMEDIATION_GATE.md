# JAYT-374 — CEO R1 Production Technical Acceptance & Visual-Truth Remediation Gate

**Ngày:** 10/09/2026  
**Phạm vi:** Production canonical `https://jayt-production-v3420.vercel.app`  
**Deployment đang phục vụ:** `dpl_8pSCfxWXzEMteFTV6E9YkVQARrA8` (`READY`, target `production`)  
**Phán quyết:** `SERVED_ARTIFACT_AND_CORE_INTERACTIONS_ACCEPTED__VISUAL_SEMANTIC_TRUTH_FAILED__REMEDIATION_REQUIRED__NO_ROLLBACK_TRIGGERED`

## Bằng chứng CEO kiểm tra độc lập

- Vercel xác nhận alias canonical đang trỏ đúng `dpl_8pSCfxWXzEMteFTV6E9YkVQARrA8`.
- Tám byte tài nguyên phục vụ khớp manifest/receipt J374: `/`, `styles.css`, `jayt_apex_interface.js`, `search.css`, `search.js`, `deals_feed.json`, `registry.json`, `published_manifest.json`.
- Kiểm thử trình duyệt live tại 1440px / 768px / 390px: lần lượt 12 / 9 / 6 thẻ khởi tạo, không tràn ngang và không có lỗi console ở luồng tải ban đầu.
- Drawer mở qua hash `#offer-B18_HL_SUA_LOC6`; modal “Rủ bạn kèo này” mở được, có canvas và URL chia sẻ không chứa số tài khoản hoặc tên ngân hàng.
- Phân trang nối tiếp hiển thị đủ 65 thẻ sau 5 lượt ở desktop, không lỗi runtime.

## Điểm không đạt — bắt buộc sửa

Kiểm thử DOM live đã bắt được ba thẻ Highlands đầu tiên dùng ảnh `danang_real_photo_mi_quang.jpg` (Mì Quảng) cho các ưu đãi cà phê Highlands. `alt` mô tả là tên cà phê nhưng nội dung ảnh không khớp món/brand. Điều này vi phạm điều khoản Visual-First: ảnh phải đại diện đúng thực thể, không đánh lừa người dùng. Do đó không chấp thuận tuyên bố “Visual-First hoàn tất” hoặc biên nhận visual PASS toàn phần.

Không rollback deployment hiện hành: lỗi là semantic presentation, không phải sự cố dữ liệu, an toàn hay runtime. Tuy nhiên không được phát hành/đóng dấu nghiệm thu Visual-First cuối cùng hoặc dùng ảnh sai để quảng bá.

## Lệnh khắc phục R1

1. Loại mọi mapping ưu đãi Highlands → `danang_real_photo_mi_quang.jpg`; không dùng fallback ảnh món ăn không cùng sản phẩm/brand.
2. Gán ảnh vector/brand Highlands đã niêm phong hoặc ảnh cà phê có nguồn quyền sử dụng và mapping cụ thể theo offer; với ảnh chỉ minh họa phải có nhãn phù hợp.
3. Bổ sung test bắt buộc kiểm tra toàn bộ 65 thẻ: `offer_id`, brand/title, asset path, classification và lý do mapping; test fail nếu asset local-food/brand khác bị dùng làm fallback cho offer không cùng ngữ nghĩa.
4. Nộp candidate reseal, manifest asset mới, screenshot desktop + mobile và biên nhận live kiểm tra lại. Chỉ sau đó CEO mới xem xét nghiệm thu thị giác cuối cùng.

## Ranh giới giữ nguyên

- `affiliate_enabled: false`; không attribution, tracking hoặc tuyên bố hoa hồng.
- Quét camera/app ngân hàng vật lý vẫn `NOT_TESTED`; copy fallback là luồng dự phòng đã kiểm thử, không phải xác nhận quét vật lý.
- Không thay đổi bytes `deals_feed.json` hoặc `registry.json` để xử lý lỗi UI này.
