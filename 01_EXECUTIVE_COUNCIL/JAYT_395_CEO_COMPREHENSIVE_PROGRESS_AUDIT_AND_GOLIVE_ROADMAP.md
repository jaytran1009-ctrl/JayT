# JAYT-395 — Báo cáo kiểm toán tiến độ & lộ trình Go-Live

**Thời điểm đối soát:** 2026-09-12  
**Kết luận điều hành:** `CURRENT_W3_PRODUCTION_VERIFIED__W4_EXPANSION_HELD__PIPELINE_SEAL_WS1_DRIFT_BLOCKS_NEW_PROMOTION`

## 1. Nguồn cung và sự thật catalog

- **Wave 1:** Hai record công khai là `B14_METIZ_U22_2D` và `B18_GALAXY_HAPPY_DAY`; `deals_feed.json` và `published_manifest.json` cho phép đúng hai ID này. Hash đĩa của HTML Galaxy là `544aeb4ae4002a12ec63922bd5b121783dea75a2e26f9cbeb71557d91ab678fd`; receipt relational Metiz là `35048eb45af76c1643f4794fce33bcc1eff2f51d6fa2c19496aa20759eb4167a`.
- **Lunch Comparator:** Biên nhận local W2 ghi nhận công thức chỉ dùng dữ liệu người dùng tự nhập (`food + delivery - voucher`), không có biểu phí/voucher mặc định hay xếp hạng nhà cung cấp; p95 mobile ghi nhận 0,7 ms. Đây là kết quả staging/local đã nghiệm thu, không phải báo giá live của sàn.
- **KTX/Spotify:** 30 record KTX giữ URL trực tiếp 1:1; kiểm tra static trước đó ghi nhận 0 `partner_id`, link rút gọn hay token affiliate. Card Spotify hiển thị điều kiện SheerID và tối đa bốn năm; đây là điều kiện chương trình, không phải ủy quyền affiliate.

## 2. Hạ tầng tự hành

Task Scheduler `\JayT_Autonomous_Catalog_Monitor_4H` đang `Ready`, chạy với tài khoản least-privilege `tritr`, chu kỳ bốn giờ. Lần chạy gần nhất được hệ điều hành ghi nhận trả `0` và runner là `scripts/j392_scheduler_runner.cjs`.

Log runtime vật lý đang append tại `07_QUALITY_ASSURANCE/runtime_evidence/j392_scheduler_run.log`. Lần đánh giá freshness ghi trong log gần nhất kiểm tra hai evidence Wave 1 dưới 24 giờ tại thời điểm chạy; cần chạy lại kiểm tra này sát thời điểm bất kỳ promotion nào.

## 3. Niêm phong và parity

- Triple Sync hiện hành: sáu copy `jayt_apex_interface.js` cùng hash `a3bb1b0b7c35ad0f31ae4ea00e625e7f1ce206bd30597837604c4b07b0265e63`. Đây là hash W3 hiện hành, **không phải** hash W2 lịch sử `2831c372…` trong JAYT-395.
- `PROJECT_MEMORY.md` khớp hai workspace: `e8bd2bb3da720a2dd39f354fefbbda5b6344c00c9706212e2e7ac131027256a5` tại thời điểm audit.
- WS1 seal là **23/24**, không phải 24/24: log runtime append-only đã tăng từ 3.160 lên 4.774 byte. WS2 vẫn có snapshot niêm phong 24/24. Không được âm thầm sửa manifest hoặc ghi đè log để che chênh lệch này.

## 4. Tường lửa và thương mại

Collector ShopeeFood W2 có hash `351a6587d5b29cfb94ca9e045e960de57fab142ce6324b23e90ea3279cf9426b` và bị khóa trước browser/network. `affiliate_enabled=false`; router là guard không dispatch. Không có tracking, sub-ID, attribution hoặc claim hoa hồng được phép ở bất kỳ môi trường nào khi chưa có ủy quyền nhà cung cấp bằng văn bản.

## 5. Khóa kép

`W2_STAGE_TO_PROD_RELEASE_MANIFEST.json` lưu cả Key 1 và Key 2 ở `CERTIFIED_PASS`; đó là hồ sơ lịch sử cho promotion W2 đã hoàn thành. Nó không cấp quyền ngược thời gian cho một promotion W4, cũng không khắc phục drift seal hiện tại.

## 6. Canonical Production và roadmap

HTTP read-only trên canonical domain trả 200 cho `/`, `published_manifest.json`, `deals_feed.json`, và `registry.json`. Manifest live xác nhận **W3 `v3.448.0-w3`**, deployment **`dpl_FVrUNSADMUQore2umH5VyywADiXS`**, `affiliate_enabled=false`; W3 đã là canonical production. Baseline `v3.446.0-j392` / `dpl_6SZZk5KYChanKHjvVKZxXn5hpc78` là mốc lịch sử, không phải deployment live.

### Điều kiện trước một alias mutation mới

1. Phê chuẩn riêng kiến trúc niêm phong log append-only và tái xác minh cả WS1/WS2; không re-seal ngầm.
2. Tạo candidate W4 có manifest/hash riêng và kiểm toán live/rollback tương ứng.
3. Với deal mới, nộp first-party artifact có đủ offer, điều khoản, hiệu lực và phạm vi địa phương. CGV hiện mới có venue scope nên vẫn hold.
4. Nếu phạm vi có affiliate, cần ủy quyền đối tác bằng văn bản; nếu không, cờ vẫn false.

**Quyết định:** Không có alias swap nào được thực hiện hay cấp quyền trong JAYT-395. Production W3 tiếp tục phục vụ ổn định.
