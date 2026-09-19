# JAYT VISUAL HYBRID HUB REVIEW PACK (091)
> **Chỉ thị**: `JAYT-091-DISCOVERY-FIRST-UX-AND-TRUTHFUL-DATA-REBUILD`  
> **Thời điểm đối soát**: `2026-08-25T13:45:00+07:00`  
> **Triết lý 3 Giây Đầu Tiên**: Người dùng Đà Nẵng mở ra hiểu ngay: (1) Hôm nay có gì đã xác minh; (2) Nếu chưa có, gần đây nên theo dõi nơi nào; và (3) JayT đang nói thật đến đâu.  
> **Trạng thái**: `IMPLEMENTED — PENDING CEO AUDIT`  
> **Khóa sản xuất**: `deals_feed.json: []` (0 records, `is_approved: false`)  
> **Đặc tả Visual Hybrid Hub**: [`03_SOURCE_OF_TRUTH/VISUAL_HYBRID_HUB_SPEC.md`](../03_SOURCE_OF_TRUTH/VISUAL_HYBRID_HUB_SPEC.md), [`03_SOURCE_OF_TRUTH/visual_hybrid_hub_contract.json`](../03_SOURCE_OF_TRUTH/visual_hybrid_hub_contract.json)  
> **Tài liệu SSOT 11 Scenarios**: [`03_SOURCE_OF_TRUTH/CUSTOMER_JOURNEY_NORTH_STAR.md`](../03_SOURCE_OF_TRUTH/CUSTOMER_JOURNEY_NORTH_STAR.md)  
> **Dataset 4 Lớp Trung Thực**: [`03_SOURCE_OF_TRUTH/four_layer_dataset.json`](../03_SOURCE_OF_TRUTH/four_layer_dataset.json)  
> **Giao diện Khách hàng**: [`03_SOURCE_OF_TRUTH/jayt_apex_interface.js`](../03_SOURCE_OF_TRUTH/jayt_apex_interface.js), [`03_SOURCE_OF_TRUTH/index.html`](../03_SOURCE_OF_TRUTH/index.html)

---

## 1. BẢNG TỔNG HỢP KIẾN TRÚC GIAO DIỆN "VISUAL HYBRID HUB"

```text
[ 📍 Khu vực ▼ ]    [ 👥 Sinh viên / Văn phòng ▼ ]    [ 🏷️ Nhu cầu ▼ ]
────────────────────────────────────────────────────────────────────────────────────
📍 Hôm nay ở Hải Châu · 11:15  [ 🍱 Ăn trưa ] [ ☕ Cà phê ] [ 🎬 Xem phim ] [ 🛵 Đi lại ] [ 🍕 Kèo nhóm ] [ 🛍️ Mua sắm ]

1. 🛡️ ƯU ĐÃI ĐÃ XÁC MINH HÔM NAY (ĐÀ NẴNG)
   └─ Honest Empty State: "Hôm nay chưa có ưu đãi thương mại nào được phê duyệt mở bán công khai"
      (Dẫn tự nhiên xuống danh sách địa điểm đã xác nhận hoạt động bên dưới, 0 bắt khách nhập voucher).

2. 📍 ĐỊA ĐIỂM NÊN THEO DÕI GẦN BẠN
   ├─ Tầng 1 (9 Verified Locations): Metiz Helio, CGV Vincom, CGV Vĩnh Trung, Galaxy Coop, Phê La Bạch Đằng, Gong Cha Nguyễn Văn Linh, Jollibee (Vincom, Tiểu La, Lý Thái Tổ).
   │  └─ Card dùng icon/thương hiệu trung tính, địa chỉ thật, nút "Nguồn chính thức ↗", disclaimer chuẩn (0 giá ảo, 0 nút Lấy mã).
   └─ Tầng 2 (2 Brand Signals): Highlands Coffee, Domino's Pizza ("Thương hiệu đang theo dõi — Chưa có dữ liệu địa chỉ chi nhánh cụ thể trên đĩa").

3. 📡 CỘNG ĐỒNG BÁO VỀ (CHƯA XÁC MINH)
   └─ Honest Empty State + Form "Báo deal vừa thấy 🚀" (Tuyệt đối 0 thu thập PII họ tên/SĐT/email).

4. 👑 CHÍNH SÁCH THÀNH VIÊN & TÍCH ĐIỂM
   └─ Bảng quy tắc hội viên có trích dẫn đối soát 100% (Galaxy Star, CGV VIP, Metiz Member, Gong Cha).

5. 🧮 CÔNG CỤ PHỤ TRỢ (Cuối trang)
   └─ Máy tính chia tiền bàn ăn (Splitwise-style, 100% tính cục bộ) + Lối tắt vào "Ví Voucher Của Tôi".
```

---

## 2. BẢNG PHÂN TẦNG ĐỘ TIN CẬY & QUY TẮC HIỂN THỊ

| Lớp hiển thị | Nguồn cảm hứng | Yêu cầu dữ liệu | Quy tắc hiển thị & Rào chắn giao diện |
|:---|:---|:---|:---|
| **Discovery Header & Context** | Local F&B Rhythm | Thời gian thực + Bộ lọc 3 tiêu chí | Dropdown chọn nhanh [Khu vực] [Đối tượng] [Nhu cầu]; Hàng chip nhu cầu cuộn ngang 1 dòng mượt mà trên mobile 390px; Touch target tối thiểu 44px. |
| **1. Ưu đãi đã xác minh hôm nay** | CamelCamelCamel (Price Truth) | 8/8 trường chứng cứ độc lập trên đĩa | Nếu `deals_feed.json: []`, hiển thị **Honest Empty State** hữu ích dẫn sang Watchlist; Tuyệt đối không có deal tự chế hoặc CTA mua khi chưa có bằng chứng. |
| **2. Địa điểm nên theo dõi** | Local Store Locators | Trích dẫn địa chỉ nguyên văn + artifact + SHA-256 | Dùng icon/thương hiệu trung tính; Disclaimer chuẩn: *"JayT đã xác nhận địa điểm hoạt động tại Đà Nẵng; ưu đãi online chưa đủ dữ liệu để xác nhận."*; **0 dùng ảnh sale đỏ, 0 dùng nút Lấy mã**. |
| **3. Cộng đồng báo về** | HotUKDeals (Trust Stratification) | Người dùng gửi trực tiếp (0 PII) | Mặc định **Honest Empty State**; Tín hiệu gửi về gắn nhãn `⚠️ CHƯA XÁC MINH`; Không tự nâng thành deal, không có giá/mã. |
| **4. Chính sách thành viên** | Official Loyalty Programs | 100% trích dẫn gốc có hash | Trích dẫn điều khoản chính thức; 0 CTA mua hàng. |
| **5. Công cụ phụ trợ** | Splitwise (Minimalist Utility) | Dữ liệu người dùng nhập tại chỗ | Đặt ở cuối hành trình khám phá; 100% tính toán cục bộ; máy tính chia đều bàn ăn sau voucher và phụ phí. |

---

## 3. KẾT QUẢ KIỂM THỬ GIAO DIỆN VÀ RÀO CHẮN (8/8 PASS)

```text
======================================================
🧪 [JAYT-091-TEST] Khởi chạy bộ kiểm thử Visual Hybrid Hub 091...

  [TEST_01_VISUAL_HYBRID_DISCOVERY_HEADER_AND_DYNAMIC_CONTEXT]: [PASS] (3 dropdowns + Context prompt + Scroll pills row >= 44px)
  [TEST_02_LAYER_1_VERIFIED_TODAY_HONEST_EMPTY_STATE]: [PASS] (Honest Empty State chuẩn mực dẫn sang Watchlist)
  [TEST_03_LAYER_2_WATCHLIST_NEUTRAL_BRANDING_AND_MANDATORY_DISCLAIMER]: [PASS] (9 Verified Locations + Disclaimer + 0 red sale / 0 Lấy mã)
  [TEST_04_LAYER_3_COMMUNITY_RADAR_HONEST_EMPTY_AND_ZERO_PII]: [PASS] (Honest Empty State + Form 0 PII + CTA Báo deal vừa thấy)
  [TEST_05_LAYER_4_AND_LAYER_5_SUPPORTIVE_UTILITIES_LAYOUT]: [PASS] (Layer 4 Loyalty quotes + Layer 5 Splitwise calculator ở cuối trang)
  [TEST_06_DOM_NEGATIVE_SCAN_FORBIDS_PRICE_CODE_COUNTDOWN_IN_LAYERS_2_3_4]: [PASS] (0 giá, mã, countdowns, hot deals trong Lớp 2-4)
  [TEST_07_ASSET_AND_DATASET_100_PERCENT_BYTE_PARITY]: [PASS] (100% Parity SoT === Deploy === Staging)
  [TEST_08_PRODUCTION_INVARIANTS_LOCKED]: [PASS] (deals_feed.json: [], is_approved: false)

🟢 [VISUAL-HYBRID-HUB-091-SUMMARY] Kết quả kiểm thử: 8/8 PASS!
======================================================
```
