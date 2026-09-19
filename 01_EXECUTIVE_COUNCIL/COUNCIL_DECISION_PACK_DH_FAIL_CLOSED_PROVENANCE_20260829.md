# BỘ HỒ SƠ HỘI ĐỒNG LIÊN BỘ — JAYT SECTION DH
## CÔ LẬP NGUỒN GỐC & THỰC THI FAIL-CLOSED TRUTH (ZERO UNVERIFIED CLAIMS)

**Mã hồ sơ:** `COUNCIL_DECISION_PACK_DH_FAIL_CLOSED_PROVENANCE_20260829`  
**Phiên bản Staging:** `v3.437.0-staging.dh`  
**Chỉ thị chỉ đạo:** JAYT-245 Mục DH (Dòng 2646–2666)  
**Địa chỉ Staging hoạt động:** `http://127.0.0.1:4173/`  
**Thời gian lập hồ sơ:** 2026-08-29T23:05:00+07:00  

---

### I. THỰC THI LỆNH DH: HẠ T1 VỀ FAIL-CLOSED & CÔ LẬP ASSET MISMATCH

Thực hiện nghiêm túc phán quyết của CEO tại Trust Gate:
1. **Toàn bộ 7 record T1 đã bị hạ xuống Fail-Closed:**
   - Xóa bỏ/ẩn toàn bộ các trường giá ưu đãi (`deal_price`), giá gốc (`original_price`), phần trăm giảm (`savings_percent`), tổng chi phí (`total_payable`), hạn dùng (`valid_until`), điều kiện (`deal_cond`), quote, timing window và nhãn "đối soát" khi chưa có evidence ID, capture hash, locator hay freshness cấp record.
   - **Số lượng Deal T1 công bố:** `0` (Fail-closed trung thực).
2. **Sửa dứt điểm Asset Mismatch Bảo tàng Đà Nẵng vs Bảo tàng Chăm:**
   - Cô lập hoàn toàn `PLACE_BAO_TANG_DA_NANG` (Thành Điện Hải) khỏi ảnh `danang_real_photo_cham_museum.jpg` và attribution của Bảo tàng Điêu khắc Chăm. Thiết lập `visual_asset_url: null` (bề mặt không ảnh với nhãn rõ ràng).
   - Chỉ duy nhất `PLACE_BAO_TANG_CHAM` được gán ảnh Bảo tàng Chăm với attribution `🏛️ Bảo Tàng Chăm (1280x853px) • 📷 CT Snow (CC BY 2.0)`.
3. **Data-State Bento Hero khi T1 = 0:**
   - Nút CTA chính tự động chuyển sang: `🏛️ Xem ưu đãi & cổng đang kiểm →` dẫn tới thư mục 50 cổng chính thức & tiện ích công cộng đang kiểm tra.
   - Không có ngõ cụt: Các luồng Hôm nay, Ăn gì (Huỳnh Thúc Kháng), Đi đâu (Metiz / CGV / Di sản), Ví Voucher 3 làn và Có Hời Không (Smart Buy) tiếp tục vận hành mượt mà với copy trung tính.

---

### II. BẢNG PHÂN BỔ 50 ITEM TRUNG THỰC (DATA LEDGER DH)

| Tầng dữ liệu | Số lượng | Badge hiển thị | Hành động (CTA) | Trạng thái chứng thực |
| :--- | :---: | :--- | :--- | :--- |
| **Tier 1 (Deal xác minh)** | **0** | `🔥 DEAL XÁC MINH` | *(Ẩn do T1 = 0, fail-closed)* | Đang trong candidate queue chờ evidence contract độc lập cấp record |
| **Tier 2 (Cổng chính thức)** | **20** | `🏛️ CỔNG CHÍNH THỨC` | `🏛️ Mở cổng chính thức →` | Dẫn nguồn chính thống từ domain chính thức của đơn vị |
| **Tier 3 (Tiện ích xác minh)** | **18** | `📍 TIỆN ÍCH XÁC MINH` | `📍 Xem tiện ích & Maps →` | Địa điểm công cộng, danh thắng được chính quyền Đà Nẵng công bố |
| **Tier 4 (Radar theo dõi)** | **12** | `📡 THEO DÕI` | `📡 Theo dõi kênh →` | Kênh giám sát tin tức thị trường & ưu đãi chuỗi |
| **Tổng cộng** | **50** | — | — | **100% Trung thực, 0 claim phóng đại** |

---

### III. KẾT QUẢ KIỂM THỬ BROWSER PACK DH (16 BẢN GHI ĐỘC LẬP)

Toàn bộ 16 ảnh chụp màn hình kiểm thử độc lập được lưu trữ tại `07_QUALITY_ASSURANCE/browser_pack_dh/`:

1. `00_desktop_1440_visual_slate_proof.png` (1.086.630 bytes, SHA-256: `067b5489b667e1a3...`) — Bảng tổng kiểm visual slate.
2. `01_desktop_1440_landmark_hero.png` (536.106 bytes, SHA-256: `a41597583391b8b6...`) — Bento Hero với CTA `🏛️ Xem ưu đãi & cổng đang kiểm →` & ảnh Cầu Rồng (1200x800px).
3. `02_desktop_1440_featured_deals.png` (222.081 bytes, SHA-256: `287c3e9943886f20...`) — Rail 1 hiển thị cổng chính thức và tiện ích đô thị.
4. `03_desktop_1440_culinary_story.png` (207.591 bytes, SHA-256: `f761054de9c7cc6d...`) — Điểm hẹn trưa Phố Huỳnh Thúc Kháng & ảnh Mì Quảng (1280x853px).
5. `04_desktop_1440_transit_story.png` (526.152 bytes, SHA-256: `c92fdd5406f73b84...`) — Điểm hẹn di chuyển Xe buýt DanaBus & ảnh Cầu Sông Hàn (1200x800px).
6. `05_desktop_1440_leisure_story.png` (501.689 bytes, SHA-256: `5357327935f7bab3...`) — Thư viện Bạch Đằng (1280x853px) & Bảo tàng Chăm (1280x853px).
7. `06_desktop_1440_three_lane_wallet.png` (171.347 bytes, SHA-256: `81366b3eccc52f35...`) — Ví Voucher 3 làn phân loại minh bạch 13 chính sách.
8. `07_desktop_1440_explore_directory.png` (81.791 bytes, SHA-256: `81245808fd88506a...`) — Thư mục 50 mục phân tầng với empty state trung thực "Đang đối soát dữ liệu deal giá thực".
9. `08_desktop_1440_dark_mode.png` (535.242 bytes, SHA-256: `4383396f4245e536...`) — Giao diện Dark Theme chuẩn WCAG AAA.
10. `09_desktop_1440_reduced_motion.png` (238.807 bytes, SHA-256: `3b459906fe8a9b72...`) — Giao diện hỗ trợ chuẩn giảm chuyển động Reduced Motion.
11. `10_tablet_768_modern_bento.png` (307.522 bytes, SHA-256: `b1ab6ae4a3e45804...`) — Bố cục đáp ứng chuẩn Tablet 768px.
12. `11_mobile_390_fresh_load_first_fold.png` (162.888 bytes, SHA-256: `7d5687e40c13ce7b...`) — Màn hình đầu tiên Mobile 390px (không tràn ngang, 3 nút CTA 44px).
13. `12_mobile_390_food_journey_route.png` (64.000 bytes, SHA-256: `fcd057d93efbb124...`) — Lộ trình ẩm thực trên thiết bị di động.
14. `13_mobile_390_three_lane_wallet.png` (73.125 bytes, SHA-256: `44405a50b68f73d2...`) — Ví Voucher 3 làn trên thiết bị di động.
15. `14_modal_zero_blur_open_close.png` (281.501 bytes, SHA-256: `fc2d2ff435b792ff...`) — Hộp thoại đóng góp nguồn cam kết Zero-PII bảo mật.
16. `15_buy_decision_interactive.png` (73.686 bytes, SHA-256: `707f5410481de7f7...`) — Cổng tra cứu trả về trạng thái trung thực "Chưa đủ dữ liệu đối soát giá thực".

---

### IV. CAM KẾT VẬN HÀNH & AN TOÀN HỆ THỐNG

1. **Khóa phát hành Production:** Tiếp tục duy trì trên Staging local `http://127.0.0.1:4173/`, không phát tán ra production khi chưa có phê duyệt từ CEO.
2. **Không hành vi bí mật / Affiliate write:** Tuyệt đối không chèn mã affiliate, không thu thập cookie hay secret của người dùng.
3. **Kế hoạch tiếp theo:** Tiếp tục duy trì giao diện Modern Bento hoàn thiện, trong khi bộ phận Data & Trust triển khai quy trình lập hồ sơ chứng cứ độc lập có mã bằng chứng, ảnh chụp và hash cho các candidate ưu đãi.
