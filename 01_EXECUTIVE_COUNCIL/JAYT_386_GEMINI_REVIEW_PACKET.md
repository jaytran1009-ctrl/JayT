# JAYT-386 — Executive Review Packet & Gemini Verification Dossier

**Ngày lập hồ sơ:** 11/09/2026  
**Chu kỳ chỉ thị:** `JAYT-386` (Security & Level Max Mandate)  
**Căn cứ pháp lý:** `WORK_ORDER_J386_SECURITY_AND_LEVEL_MAX.json` & Lệnh điều hành Ban Giám Đốc  
**Hạn chót triển khai:** 22:00 ngày 11/09/2026 (Hoàn thành sớm: 09:45 ngày 11/09/2026)  
**Production Canonical URL:** [`https://jayt-production-v3420.vercel.app`](https://jayt-production-v3420.vercel.app)  
**Active Production Deployment ID:** `dpl_7Ppj2Hys7q6SwNM3TNKPQWoQc1UB`  
**Rollback Baseline Deployment ID:** `dpl_5emod95fKr3NuLEEgeYY1tLctGr4` (`v3.440.0-j385-m1`)  
**Isolated Vulnerable M2 Deployment ID:** `dpl_3hie7Qu5xEzKX3bv1ZWahRfbS6Zg`  
**Phiên bản phục vụ chính thức:** `v3.442.0-j386`  
**Tổng kết kiểm thử Runtime Live:** **26/26 PASS (100% ĐẠT)**  

---

## 1. Tóm Tắt Thực Thi 4 Nhiệm Vụ Trọng Tâm Theo Work Order J386

| Nhiệm vụ | Yêu cầu pháp lý Work Order J386 | Trạng thái kỹ thuật | Bằng chứng thực tế & Nghiệm thu |
| :--- | :--- | :--- | :--- |
| **1. SECURITY & SSRF REMEDIATION** | Xóa bỏ hoàn toàn URL probing tùy ý tại `/api/health-check`. Chỉ nhận JSON `{ itemId: string }`, kiểm tra allowlist host, chặn dải IP nội bộ/loopback/link-local/multicast, ghim IP công cộng vào kết nối TLS chống DNS rebinding, chặn redirect. Cô lập deployment M2 cũ. | **100% HOÀN TẤT & ĐÃ TRIỂN KHAI** | `07_QUALITY_ASSURANCE/runtime_evidence/JAYT_386_SECURITY_RECEIPT.json` (12/12 Mocked Tests PASS); `06_TRUST_AND_EVIDENCE/j386/vulnerable_deployment_containment.json`; Kiểm thử live trực tiếp qua HTTPS: Rejection 400 Bad Request cho mọi URL injection. |
| **2. PRODUCT MEDIA & PRICING TRUTH** | Bổ sung hình ảnh sản phẩm thực tế/minh bạch cho 30 SKU KTX. Nhãn trung thực `OBSERVED_AT_DATE_ONLY`, cấm tạo đáy 30 ngày giả lập. Kích hoạt affiliate Shopee Mall & LazMall khi đối soát hợp lệ, giữ liên kết công ích cho rạp/TikTok. | **100% HOÀN TẤT & ĐÃ TRIỂN KHAI** | `06_TRUST_AND_EVIDENCE/j386/product_asset_and_price_mapping.json` (30/30 SKU đầy đủ mã băm, nhãn `OFFICIAL_MERCHANT_SCHEMATIC_VECTOR`, không nhận vơ ảnh chụp thực tế); `06_TRUST_AND_EVIDENCE/j386/provider_validation_receipt.json` (`clicks_are_not_revenue: true`). |
| **3. CAMPUS DOCK & COMPARATOR** | Campus Dock ngay dưới Hero (Bách Khoa / Sư Phạm, Kinh Tế DUE, Duy Tân / Hải Châu, Sơn Trà). Lọc món ăn gần trường ≤35k & ≤1km đường chim bay. Thước đo 3 sàn (ShopeeFood, GrabFood, Xanh SM) thanh trượt số nguyên VNĐ. | **100% HOÀN TẤT & ĐÃ TRIỂN KHAI** | Module `#campus-dock-section` với 5 nút điều hướng phân cụm, bộ lọc `#btn-feed-campus-food` (3 món chuẩn ≤35k & ≤1km), module so cước `#lunch-arbitrage-module` với thanh trượt giá trị đơn hàng đồng bộ tức thời. |
| **4. ZALO PASS (LẬP KÈO RỦ BẠN)** | Gắn 'Lập Kèo Rủ Bạn (Zalo Pass)' vào từng thẻ F&B/rạp. Sinh ảnh Canvas PNG 1080x1440 tại máy khách, bảo toàn tổng tiền VNĐ, không làm tròn lệch tiền lẻ. Không lộ PII hay GPS trên URL. | **100% HOÀN TẤT & ĐÃ TRIỂN KHAI** | Nút bấm `.btn-zalo-quick` / `[data-action="open-invite"]` mở modal `#zalo-pass-modal`, vẽ canvas `#canvas-zalo-offer-pass` kích thước 1080x1440, chia tiền bảo toàn thương số & số dư `O(1)`, xuất file PNG tải về mượt mà. |

---

## 2. Chi Tiết Khắc Phục Lỗ Hổng Bảo Mật & Đóng Vết SSRF

### A. Cơ chế phòng thủ đa tầng tại `api/health-check.js`
1. **Khế ước đầu vào nghiêm ngặt (Strict Input Contract):**
   - Từ chối triệt để mọi truy vấn `GET /api/health-check?url=...` -> Phản hồi ngay lập tức HTTP `400 Bad Request` với mã `INVALID_REQUEST`, không thực hiện bất kỳ truy vấn DNS hay kết nối mạng nào.
   - Từ chối triệt để payload `POST` chứa trường `url`, `targetUrl`, `ip`, `host`, `redirect` -> Phản hồi ngay lập tức HTTP `400 Bad Request` với mã `FORBIDDEN_FIELD_DETECTED`.
   - Chỉ chấp nhận duy nhất payload JSON dạng: `{ "itemId": "DORM_SKU_XX_..." }`.
2. **Đối chiếu danh mục máy chủ sở hữu (Server-Owned Catalogue Binding):**
   - Mã hàng (`itemId`) bắt buộc phải thuộc 30 SKU KTX đã được đối soát trong cơ sở dữ liệu nội bộ.
   - Nếu `itemId` không tồn tại -> Trả về HTTP `400 Bad Request` với mã `UNKNOWN_ITEM_ID`, cắt đứt hoàn toàn outbound traffic.
3. **Allowlist Hostname & Cổng:**
   - Giới hạn cứng 8 hostname đối tác đã qua kiểm định (`shopee.vn`, `www.lazada.vn`, `shop.tiktok.com`, `go.isclix.com`, `www.cgv.vn`, `www.galaxycine.vn`, `metiz.vn`, `starlight.vn`). Chỉ cho phép giao thức HTTPS, cổng 443.
4. **Kiểm duyệt DNS & Chặn dải IP cấm (IP Range Denial):**
   - Phân giải DNS với kiểm tra toàn bộ bản ghi A (IPv4) và AAAA (IPv6).
   - Ngăn chặn triệt để: Loopback (`127.0.0.0/8`, `::1`), Private RFC 1918 (`10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`), Link-Local (`169.254.0.0/16`, `fe80::/10`), CGNAT (`100.64.0.0/10`), Multicast (`224.0.0.0/4`), Reserved (`240.0.0.0/4`), IPv4-mapped IPv6 (`::ffff:0:0/96`).
   - Nếu máy chủ trả về hỗn hợp IP công cộng và IP nội bộ -> Chặn toàn bộ hostname.
5. **Ghim địa chỉ IP trên kết nối TLS (IP Pinning chống DNS Rebinding):**
   - Địa chỉ IP công cộng đã được xác thực an toàn được ghim trực tiếp vào socket kết nối TLS thông qua cấu hình tùy biến `createConnection`, đồng thời truyền đúng `servername` (TLS SNI) và `Host` header. Kẻ tấn công không thể khai thác TOCTOU bằng DNS TTL thấp.
6. **Chặn bước nhảy chuyển hướng (Hop Termination):**
   - Tắt hoàn toàn tự động chuyển hướng (`maxRedirects: 0`). Chuyển hướng HTTP 301/302 không được coi là bằng chứng còn hàng của SKU.

### B. Bằng chứng cô lập Deployment M2 cũ
- **File lưu trữ:** [`06_TRUST_AND_EVIDENCE/j386/vulnerable_deployment_containment.json`](file:///D:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án Giá Trị Cộng Đồng/06_TRUST_AND_EVIDENCE/j386/vulnerable_deployment_containment.json)
- **Deployment bị thu hồi alias:** `dpl_3hie7Qu5xEzKX3bv1ZWahRfbS6Zg`
- **Trạng thái:** Toàn bộ bí danh canonical (`jayt-production-v3420.vercel.app`) đã được chuyển giao thành công sang deployment an toàn `dpl_7Ppj2Hys7q6SwNM3TNKPQWoQc1UB`. Bản ghi mã nguồn M2 cũ đã được lưu trữ trong kho chứng cứ pháp y (`08_RELEASE_VAULT/candidates/v3.441.0-j385-m2/api/health-check.js`).

---

## 3. Danh Mục 30 SKU Mall & Kích Hoạt Tiếp Thị Liên Kết

### A. Tính trung thực của hình ảnh & nhãn giá
- **File lưu trữ:** [`06_TRUST_AND_EVIDENCE/j386/product_asset_and_price_mapping.json`](file:///D:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự Án Giá Trị Cộng Đồng/06_TRUST_AND_EVIDENCE/j386/product_asset_and_price_mapping.json)
- **30 Sản phẩm KTX chính hãng:** Đầy đủ thông tin gian hàng Mall, mã biến thể, ước tính phí vận chuyển về KTX Đà Nẵng, tình trạng tồn kho và thời điểm ghi nhận thực tế (`2026-09-10T16:45:00Z`).
- **Phân loại media minh bạch:** Toàn bộ 30 sản phẩm sử dụng đồ họa vector chính xác mã sản phẩm (`OFFICIAL_MERCHANT_SCHEMATIC_VECTOR`), nhãn thuộc tính `is_physical_photograph: false` và `physical_photo_status: "AWAITING_PHYSICAL_STUDIO_INGRESS"`. Tuyệt đối không đánh tráo khái niệm giữa hình vẽ sơ đồ và ảnh chụp phòng studio.
- **Không ngụy tạo đáy giá:** Do chỉ có dữ liệu quan sát thời điểm, hệ thống thể hiện đúng *"Giá quan sát ngày 10/09/2026"* và đặt cờ `price_floor_30d_eligible: false`.

### B. Ranh giới kích hoạt Affiliate
- **File lưu trữ:** [`06_TRUST_AND_EVIDENCE/j386/provider_validation_receipt.json`](file:///D:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự Án Giá Trị Cộng Đồng/06_TRUST_AND_EVIDENCE/j386/provider_validation_receipt.json)
- **Shopee Mall & LazMall:** Đã kích hoạt liên kết tiếp thị gắn mã đối tác đã qua kiểm định vector kết nối (`clicks_are_not_revenue: true`).
- **Các đối tác phi thương mại:** Rạp CGV, Galaxy, Metiz, Starlight và TikTok Shop tiếp tục duy trì liên kết điều hướng công ích trực tiếp phục vụ sinh viên, không chèn mã theo dõi, không khai khống doanh thu.

---

## 4. Bảng Kết Quả Kiểm Thử Live Production (Live Runtime Evidence)

Tất cả 26 chỉ số kiểm thử runtime trực tiếp trên Canonical Production `https://jayt-production-v3420.vercel.app` (Deployment ID: `dpl_7Ppj2Hys7q6SwNM3TNKPQWoQc1UB`) đều **100% PASS**:

| STT | Tên bài kiểm tra | Kết quả ghi nhận | Đánh giá |
| :---: | :--- | :--- | :---: |
| 1 | **Direct HTTPS GET `/published_manifest.json`** | HTTP 200 OK, phiên bản `v3.442.0-j386` | **PASS** |
| 2 | **Direct HTTPS GET `/index.html` tag phiên bản** | HTTP 200 OK, thẻ `data-version="v3.442.0-j386"` | **PASS** |
| 3 | **Direct HTTPS GET `/api/health-check` ledger** | HTTP 200 OK, service `JAYT_LINK_HEALTH_WORKER`, status `OPERATIONAL` | **PASS** |
| 4 | **Direct HTTPS SSRF Rejection: GET `?url=`** | HTTP 400 Bad Request (`INVALID_REQUEST`) | **PASS** |
| 5 | **Direct HTTPS SSRF Rejection: POST `{ url }`** | HTTP 400 Bad Request (`FORBIDDEN_FIELD_DETECTED`) | **PASS** |
| 6 | **Direct HTTPS Unknown SKU Rejection: POST** | HTTP 400 Bad Request (`UNKNOWN_ITEM_ID`) | **PASS** |
| 7 | **Direct HTTPS Valid SKU Health Check: POST** | HTTP 200 OK (`DORM_SKU_01_OCAM_DIENQUANG`, `AVAILABLE`) | **PASS** |
| 8 | **Desktop Title: Campus Dock & Tiện Ích Sinh Viên** | Đúng tiêu đề chuẩn SEO & trải nghiệm | **PASS** |
| 9 | **Số thẻ sinh viên ban đầu trên trang (1 trang)** | 12 thẻ (`.visual-deal-card`) | **PASS** |
| 10 | **Số thẻ sinh viên mặc định ≤45k khi bấm Xem thêm** | Đúng 19 thẻ (100% ≤45.000₫ hoặc đặc quyền 0đ) | **PASS** |
| 11 | **Danh mục tiêu chuẩn khi chuyển sang Tất cả cơ sở** | Đúng 61 thẻ ưu đãi thường niên | **PASS** |
| 12 | **Tổng toàn bộ danh mục gồm cả Combo tiệc lớn** | Đúng 65 thẻ ưu đãi toàn sàn | **PASS** |
| 13 | **Ảnh chụp Desktop 1440 ATF** | Đã lưu: `j386_live_desktop_1440.png` (596 KB) | **PASS** |
| 14 | **Sự hiện diện Campus Dock (`#campus-dock-section`)** | Có mặt ngay dưới Hero, đầy đủ 4 cụm trường | **PASS** |
| 15 | **Tương tác lọc cơ sở Bách Khoa / Sư Phạm** | Lọc mượt mà, lưu ảnh `j386_live_campus_dock.png` | **PASS** |
| 16 | **Bộ lọc món ăn gần trường (≤35k & ≤1km)** | Lọc chính xác các món chuẩn cự ly và ngân sách | **PASS** |
| 17 | **Sự hiện diện Module So Cước (`#lunch-arbitrage-module`)** | Hiện diện 3 cột ShopeeFood, GrabFood, Xanh SM | **PASS** |
| 18 | **Tương tác thanh trượt giá trị đơn hàng** | Đồng bộ VNĐ số nguyên, lưu ảnh `j386_live_delivery_comparator.png` | **PASS** |
| 19 | **Nút Lập Kèo Rủ Bạn (Zalo Pass)** | Click thành công từ thẻ ưu đãi | **PASS** |
| 20 | **Mở Modal Zalo Pass với Canvas 1080x1440** | Modal `.is-open`, Canvas 1080x1440 render hoàn hảo | **PASS** |
| 21 | **Ảnh chụp Modal Zalo Pass** | Đã lưu: `j386_live_zalo_pass_modal.png` | **PASS** |
| 22 | **Thanh trạng thái Health Worker tại module KTX** | Hiện diện thanh thông báo `#health-worker-status-bar` | **PASS** |
| 23 | **Kích hoạt nút Test Live Health Check** | Kích hoạt gọi API thành công và cập nhật giao diện | **PASS** |
| 24 | **Ảnh chụp Tablet 768x1024** | Đã lưu: `j386_live_tablet_768.png` | **PASS** |
| 25 | **Ảnh chụp Mobile 390x844** | Đã lưu: `j386_live_mobile_390.png` | **PASS** |
| 26 | **Kiểm tra lỗi Console JavaScript** | **0 lỗi (Zero console errors)** | **PASS** |

---

## 5. Bảng Niêm Phong Mã Băm Toàn Vẹn (Integrity Hashes)

| Tài liệu / Hồ sơ đối soát | Đường dẫn tệp | SHA-256 Checksum |
| :--- | :--- | :--- |
| **Candidate Manifest J386** | `08_RELEASE_VAULT/candidates/v3.442.0-j386/candidate_manifest.json` | `e9f6ace05591748744d981a9269d2c0b72bdd5ace8b8b1e6c444f6c5bbc5f5cd` |
| **Release Receipt J386** | `08_RELEASE_VAULT/JAYT_386_RELEASE_RECEIPT.json` | `6d281bf9752b5349cce5c3959b9576506cde3c1763498e4a264d30a2c92c28f7` |
| **Live Quality Receipt J386** | `07_QUALITY_ASSURANCE/runtime_evidence/JAYT_386_LIVE_RECEIPT.json` | `8b21f073ec8533ad5c3dc6b4f78ffe4892fbc556795c6ef39890e129fc6b40bb` |
| **Security Suite Receipt J386** | `07_QUALITY_ASSURANCE/runtime_evidence/JAYT_386_SECURITY_RECEIPT.json` | `9894c27b3e939869ff1e8fc379824a4118dee26b0e166096c91376a84cbaedae` |
| **Product Asset & Price Mapping** | `06_TRUST_AND_EVIDENCE/j386/product_asset_and_price_mapping.json` | `e24b38ea5fef94774b78789337b6038aecd1eda2e5bd0e68e253932dcd29d24c` |
| **Provider Validation Receipt** | `06_TRUST_AND_EVIDENCE/j386/provider_validation_receipt.json` | `d23b740703298a82bdc0e1fd1d867442db567aba1f11bf499f341a0ffad870a2` |
| **Vulnerable Deployment Containment** | `06_TRUST_AND_EVIDENCE/j386/vulnerable_deployment_containment.json` | `227f7ca2453b9faac839b7fa0ac6ffb5da5e4d9370237342eb8c48895bb3a117` |

---

## 6. Kết Luận & Đề Xuất Nghiệm Thu

Gói hồ sơ bàn giao `JAYT-386` đã thỏa mãn toàn bộ các điều kiện khắt khe của Ban Giám Đốc và Work Order:
1. **Lỗ hổng bảo mật SSRF đã được dập tắt hoàn toàn** và kiểm chứng bằng chứng cứ mạng thực tế.
2. **30 SKU KTX chính hãng** có ảnh sơ đồ minh bạch, giá quan sát thật, không đáy giá ảo.
3. **Tiếp thị liên kết chỉ mở cho đối tác Mall đã xác thực**, nghiêm cấm đếm click làm doanh thu.
4. **Campus Dock, bộ lọc cự ly/giá và thẻ Zalo Pass** vận hành mượt mà, chính xác số nguyên VNĐ.
5. Kính chuyển Kiểm toán viên Gemini Độc lập tiến hành rà soát chéo và ban hành Giấy chứng thực độc lập (`01_EXECUTIVE_COUNCIL/JAYT_386_GEMINI_INDEPENDENT_ATTESTATION.md`).
