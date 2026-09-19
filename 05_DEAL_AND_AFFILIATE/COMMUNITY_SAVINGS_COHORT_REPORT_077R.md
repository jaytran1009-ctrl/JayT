# BÁO CÁO ĐÍNH CHÍNH COHORT RADAR 32 NGUỒN CÔNG KHAI (077R)

**Mã tài liệu**: `COMMUNITY-SAVINGS-COHORT-REPORT-077R`  
**Chỉ thị điều hành**: `JAYT-077R — COHORT TRUTH CORRECTION`  
**Thời điểm ban hành**: 2026-08-24T16:23:00+07:00  
**Phân loại dữ liệu**: `NETWORK_PROBE_METADATA_ONLY (KHÔNG PHẢI RAW EVIDENCE BUNDLE · KHÔNG THAY THẾ CATALOG)`

---

## 1. ĐÍNH CHÍNH QUẢN TRỊ & RANH GIỚI BẰNG CHỨNG (CORRECTION DISCLOSURE)

1. **Bản chất của 32 Nguồn Quét 077**: Toàn bộ dữ liệu 32 nguồn trong đợt quét 077 chỉ là **`NETWORK_PROBE_METADATA_ONLY`** (thông tin metadata phản hồi HTTP thô, không lưu file HTML/ảnh chụp đầy đủ trên đĩa cho toàn bộ các trang, không đủ điều kiện làm raw evidence bundle).
2. **Tách Biệt Bằng Chứng Độc Lập**:
   - **3 Deal Staging Đã Thẩm Định Trước Đó (Pre-existing Verified Staging References)**: Gồm Galaxy Happy Day (Thứ Ba), Metiz Super Monday (Thứ Hai), Metiz U22 (T2-T5) có đầy đủ ảnh chụp, HTML, receipt và locality trên đĩa từ các đợt 061F/069/070C.
   - **32 Nguồn Quét Mới**: Chỉ là **tín hiệu radar khám phá và trạng thái truy cập mạng**, không tự động biến thành deal công khai hay lịch ưu đãi.
3. **Loại Bỏ Hoàn Toàn Gán Nhãn Giả Định**: Xóa bỏ mọi logic gán nhãn cố định theo `source_id`. Trạng thái của từng nguồn phản ánh trung thực phản hồi kỹ thuật từ lần thăm dò mạng.

---

## 2. BẢNG PHÂN TẦNG THỰC TẾ 32 NGUỒN RADAR KHÁM PHÁ (HTTP PROBE REALITY)

| # | Thương Hiệu / Nguồn | Danh Mục | Trạng Thái HTTP Ghi Nhận | Phân Loại Chuẩn Quản Trị | Ghi Chú Hiện Trạng |
|---|---|:---:|:---:|:---:|---|
| 1 | CGV Cinemas Đà Nẵng | Rạp chiếu phim | HTTP 200 (OK) | `DISCOVERY_SIGNAL_ONLY` | Trang web hoạt động; Culture Day là chính sách lặp lại cần xác nhận chu kỳ tháng trước khi hiển thị. |
| 2 | Galaxy Cinema Đà Nẵng | Rạp chiếu phim | HTTP 302 (Redirect) | `DISCOVERY_SIGNAL_ONLY` *(Probe)*<br>*(Deal Happy Day tham chiếu dựa trên bằng chứng 061F)* | Endpoint quét bị redirect; deal Happy Day được đối soát độc lập qua snapshot lịch sử `galaxy_happy_day_official_promo_raw.html`. |
| 3 | Metiz Cinema Đà Nẵng | Rạp chiếu phim | HTTP 404 (Not Found) | `DISCOVERY_SIGNAL_ONLY` *(Probe)*<br>*(2 Deal Metiz tham chiếu dựa trên bằng chứng 069)* | URL quét trả về 404; 2 deal Metiz được đối soát độc lập qua snapshot `capture_receipt_METIZ_SUPER_MONDAY.json` và `capture_receipt_METIZ_U22.json`. |
| 4 | Lotte Cinema Đà Nẵng | Rạp chiếu phim | HTTP 200 (OK) | `DISCOVERY_SIGNAL_ONLY` | Trang sự kiện hoạt động; chưa có bằng chứng snapshot chi tiết giá vé tại Đà Nẵng. |
| 5 | Starlight Cinema Đà Nẵng | Rạp chiếu phim | HTTP 302 (Redirect) | `DISCOVERY_SIGNAL_ONLY` | Đang bị cách ly trong quarantine vault do biến động giá trên website. |
| 6 | Jollibee Việt Nam | F&B Ăn nhanh | HTTP 200 (OK) | `DISCOVERY_SIGNAL_ONLY` | Trang web hoạt động; banner chung chưa có hạn và giá combo cụ thể cho Đà Nẵng. |
| 7 | Lotteria Việt Nam | F&B Ăn nhanh | HTTP 200 (OK) | `DISCOVERY_SIGNAL_ONLY` | Trang web hoạt động; chương trình Crazy Day cần đối soát bảng giá vật lý. |
| 8 | KFC Việt Nam | F&B Ăn nhanh | HTTP 200 (OK) | `DISCOVERY_SIGNAL_ONLY` | Trang web hoạt động; ưu đãi Thứ Ba/combo cần ảnh chụp điều khoản gốc. |
| 9 | Domino's Pizza VN | F&B Ăn nhanh | HTTP 308 (Redirect) | `DISCOVERY_SIGNAL_ONLY` | Redirect về trang chủ; chưa có deal độc lập trên đĩa. |
| 10 | Pizza Hut VN | F&B Ăn nhanh | HTTP 404 (Not Found) | `DISCOVERY_SIGNAL_ONLY` | URL không tồn tại; cần cập nhật link chiến dịch mới. |
| 11 | Highlands Coffee | Cà phê & Trà | HTTP 403 (Forbidden) | `UNAVAILABLE_OR_BLOCKED` | Chặn quét tự động. Tuân thủ nguyên tắc không bypass CAPTCHA. |
| 12 | Phê La | Cà phê & Trà | HTTP 200 (OK) | `DISCOVERY_SIGNAL_ONLY` | Giá niêm yết cố định; chưa có chương trình ưu đãi định kỳ công khai. |
| 13 | Katinat Saigon Kafe | Cà phê & Trà | HTTP 200 (OK) | `DISCOVERY_SIGNAL_ONLY` | Giá niêm yết cố định; chưa có ưu đãi công khai. |
| 14 | The Coffee House | Cà phê & Trà | HTTP 302 (Redirect) | `DISCOVERY_SIGNAL_ONLY` | Redirect sang app promotion. |
| 15 | Gong Cha Việt Nam | Cà phê & Trà | HTTP 404 (Not Found) | `DISCOVERY_SIGNAL_ONLY` | URL khuyến mãi 404; cần cập nhật link mới. |
| 16 | Phúc Long Coffee & Tea | Cà phê & Trà | HTTP 200 (OK) | `DISCOVERY_SIGNAL_ONLY` | Trang khuyến mãi hoạt động; chưa có chi tiết áp dụng cho cụm Đà Nẵng. |
| 17 | Starbucks Vietnam | Cà phê & Trà | HTTP 200 (OK) | `DISCOVERY_SIGNAL_ONLY` | Chương trình Rewards qua app. |
| 18 | Xanh SM | Di chuyển | HTTP 301 (Redirect) | `ACCOUNT_OR_CART_DEPENDENT` *(Radar)* | Khả năng ưu đãi chuyến xe phụ thuộc app/lộ trình; người dùng tự kiểm tra trong App. |
| 19 | Grab Promotions | Di chuyển | HTTP 200 (OK) | `ACCOUNT_OR_CART_DEPENDENT` *(Radar)* | Mã di chuyển phụ thuộc tài khoản và giờ cao điểm. |
| 20 | Be Group Khuyến Mại | Di chuyển | HTTP 404 (Not Found) | `ACCOUNT_OR_CART_DEPENDENT` *(Radar)* | URL web 404; ưu đãi quản lý qua app cá nhân. |
| 21 | Klook Việt Nam | Trải nghiệm | HTTP 301 (Redirect) | `DISCOVERY_SIGNAL_ONLY` | Trang campaign tổng quan. |
| 22 | Traveloka VN | Trải nghiệm | HTTP 200 (OK) | `DISCOVERY_SIGNAL_ONLY` | Trang ưu đãi du lịch tổng quan. |
| 23 | Shopee Mã Giảm Giá | Sàn TMĐT | HTTP 200 (OK) | `ACCOUNT_OR_CART_DEPENDENT` *(Radar)* | Voucher phụ thuộc ngân sách realtime và giỏ hàng; người dùng áp mã trong App. |
| 24 | Lazada Khuyến Mãi | Sàn TMĐT | HTTP 200 (OK) | `ACCOUNT_OR_CART_DEPENDENT` *(Radar)* | Voucher phụ thuộc tài khoản/giỏ hàng. |
| 25 | TikTok Shop VN | Sàn TMĐT | HTTP 200 (OK) | `ACCOUNT_OR_CART_DEPENDENT` *(Radar)* | Voucher livestream/video phụ thuộc phiên live. |
| 26 | Tiki Khuyến Mãi | Sàn TMĐT | HTTP 404 (Not Found) | `ACCOUNT_OR_CART_DEPENDENT` *(Radar)* | URL khuyến mãi cũ không tồn tại. |
| 27 | ShopeeFood Đà Nẵng | Giao đồ ăn | HTTP 200 (OK) | `ACCOUNT_OR_CART_DEPENDENT` *(Radar)* | Giảm ship và combo thay đổi theo định vị quán ăn và tài khoản. |
| 28 | GrabFood Đà Nẵng | Giao đồ ăn | HTTP 200 (OK) | `ACCOUNT_OR_CART_DEPENDENT` *(Radar)* | Voucher giao hàng theo khu vực. |
| 29 | BeFood Đà Nẵng | Giao đồ ăn | HTTP 404 (Not Found) | `ACCOUNT_OR_CART_DEPENDENT` *(Radar)* | URL web 404; ưu đãi trực tiếp trong app. |
| 30 | Shopee Partner Center | Cổng đối tác | HTTP 200 (OK) | `DISCOVERY_SIGNAL_ONLY` | Đã nộp đơn xin Open API; `AppID` và `API Key` đang chờ Shopee cấp quyền. |
| 31 | Lazada Partner Center | Cổng đối tác | HTTP 301 (Redirect) | `DISCOVERY_SIGNAL_ONLY` | Yêu cầu tài khoản đối tác được xác thực. |
| 32 | TikTok Creator Market | Cổng đối tác | HTTP 0 (Failed/Blocked) | `DISCOVERY_SIGNAL_ONLY` | Kết nối không thành công trong lần quét tự động. |

---

## 3. LỊCH TIẾT KIỆM THỰC TẾ CHỈ DÙNG DEAL ĐÃ XÁC THỰC (STRICT EVIDENCE-BOUND)

Tuyệt đối không đưa các tín hiệu `PENDING_RECHECK`, `DISCOVERY_SIGNAL_ONLY` hoặc `ACCOUNT_OR_CART_DEPENDENT` vào Lịch Tiết Kiệm Chính Thức. Lịch hiển thị thực tế chỉ gồm **3 deal Staging đã có bằng chứng trọn vẹn**:

- **Thứ Hai**: 🎬 **Metiz Super Monday** (Đồng giá **45.000 đ/vé 2D** tại Quầy Helio Center, hạn đến 31/12/2026).
- **Thứ Ba**: 🎬 **Galaxy Happy Day** (Đồng giá **50.000 đ/vé 2D** tại Galaxy Đà Nẵng) + 🎬 **Metiz U22** (**45.000 đ** kèm CCCD/Thẻ HSSV).
- **Thứ Tư**: 🎬 **Metiz U22** (**45.000 đ** tại Quầy Helio Center).
- **Thứ Năm**: 🎬 **Metiz U22** (**45.000 đ** tại Quầy Helio Center).
- **Thứ Sáu, Thứ Bảy & Chủ Nhật**: ⏳ *Chưa có deal xác thực đạt chuẩn 5 chiều bằng chứng gốc $\rightarrow$ Giữ trạng thái Honest Empty State / Đang theo dõi nguồn.*

---

## 4. QUY CHUẨN ĐƯA DEAL MỚI VÀO LỊCH & STAGING

Mỗi deal mới từ các thương hiệu rạp phim hay F&B chỉ được chuyển từ Radar sang Lịch Tiết Kiệm khi:
1. Có file snapshot HTML / ảnh chụp bảng giá quầy vật lý lưu trực tiếp trên đĩa;
2. Có giá bán, điều kiện áp dụng, thời hạn `valid_to` cụ thể;
3. Có phạm vi địa phương tại Đà Nẵng rõ ràng;
4. Có Receipt liên kết mã băm SHA-256 đối soát.
