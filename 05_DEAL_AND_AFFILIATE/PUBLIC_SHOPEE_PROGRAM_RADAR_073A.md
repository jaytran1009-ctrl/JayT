# PUBLIC SHOPEE PROGRAM RADAR (073A) — DISCOVERY SIGNALS ONLY

**Mã tài liệu**: `PUBLIC-SHOPEE-PROGRAM-RADAR-073A`  
**Chỉ thị điều hành**: `JAYT-073A — SHOPEE RADAR RECLASSIFICATION`  
**Thời điểm ban hành**: 2026-08-24T15:30:00+07:00  
**Phân loại dữ liệu**: `DISCOVERY_SIGNALS_ONLY (KHÔNG PHẢI PROVIDER CONTRACT · KHÔNG PHẢI PROVIDER FEED)`

---

## 1. ĐÍNH CHÍNH QUẢN TRỊ & RANH GIỚI BẰNG CHỨNG (CORRECTION DISCLOSURE)

1. **Bản chất của 11 URLs**: Toàn bộ 11 URL quét được chỉ là **các trang đích công khai (Public Web Landing Pages)** của chương trình Shopee Affiliate. Chúng hoàn toàn **không chứng minh quyền truy cập hay phân quyền cụ thể của tài khoản `tritran1009`**.
2. **Đính chính nội dung văn bản**: Đính chính và thu hồi toàn bộ các nhận định suy diễn trước đây về mức hoa hồng cụ thể (như *"2%–15%+"*) và tư cách *"đối tác chính ngạch"*. Dữ liệu văn bản thực tế trong raw capture chủ yếu là giao diện điều hướng (navigation bar) và tường chắn ứng dụng di động (app-wall).
3. **Không Tạo Candidate / Không Mở Gate**: Tuyệt đối **không tạo candidate**, không tạo deep link, không cập nhật staging hay production từ các URL này.

---

## 2. MA TRẬN PHÂN LOẠI 11 TÍN HIỆU RADAR CÔNG KHAI

| # | Target ID | Tên Đường Link Công Khai | Phân Loại Chuẩn | Nội Dung Văn Bản Bắt Được | Bằng Chứng Trên Đĩa (Run 1787559283848) |
|---|---|---|:---:|---|---|
| 1 | `SHOPEE_AFF_01_FB_PARTNER` | Đối tác liên kết Facebook | `DISCOVERY_SIGNAL` | Giao diện điều hướng / Navigation bar | `receipt_shopee_aff_01_fb_partner.json` (SHA: `0c44463544...`) |
| 2 | `SHOPEE_AFF_02_VIDEO_RACE` | Đường đua Shopee Video | `DISCOVERY_SIGNAL` | Giao diện điều hướng / Navigation bar | `receipt_shopee_aff_02_video_race.json` (SHA: `b70a73236d...`) |
| 3 | `SHOPEE_AFF_03_REFERRAL_MISSION` | Nhiệm vụ giới thiệu Affiliate | `DISCOVERY_SIGNAL` | Trang trắng / Blank response (0 B text) | `receipt_shopee_aff_03_referral_mission.json` (SHA: `9fe689d582...`) |
| 4 | `SHOPEE_AFF_04_KOC_RACE` | Đua Top KOC | `DISCOVERY_SIGNAL` | Tường chắn app di động (Mobile App Wall) | `receipt_shopee_aff_04_koc_race.json` (SHA: `2579ec7cbf...`) |
| 5 | `SHOPEE_AFF_05_LIVE_RACE` | Đường đua Shopee Live | `DISCOVERY_SIGNAL` | Giao diện điều hướng / Navigation bar | `receipt_shopee_aff_05_live_race.json` (SHA: `3c55134aca...`) |
| 6 | `SHOPEE_AFF_06_WELCOME_MISSION` | Nhiệm vụ chào mừng Affiliate | `DISCOVERY_SIGNAL` | Giao diện điều hướng / Navigation bar | `receipt_shopee_aff_06_welcome_mission.json` (SHA: `c06c0248de...`) |
| 7 | `SHOPEE_AFF_07_LEARNING_HUB` | Học viện Shopee Affiliate | `DISCOVERY_SIGNAL` | Trang trắng / Blank response (0 B text) | `receipt_shopee_aff_07_learning_hub.json` (SHA: `cab0ec8b3b...`) |
| 8 | `SHOPEE_AFF_08_TIKTOK_ACQUISITION` | Shopee x TikTok Acquisition | `DISCOVERY_SIGNAL` | Giao diện điều hướng / Navigation bar | `receipt_shopee_aff_08_tiktok_acquisition.json` (SHA: `bd854dc5a9...`) |
| 9 | `SHOPEE_AFF_09_CPA_POLICY` | Chính sách hoa hồng CPA | `DISCOVERY_SIGNAL` | Giao diện điều hướng / Navigation bar | `receipt_shopee_aff_09_cpa_policy.json` (SHA: `2f7a86a9de...`) |
| 10 | `SHOPEE_AFF_10_NEWIN_TNC` | Điều khoản Affiliate New-In | `DISCOVERY_SIGNAL` | Giao diện điều hướng / Navigation bar | `receipt_shopee_aff_10_newin_tnc.json` (SHA: `683b231f63...`) |
| 11 | `SHOPEE_AFF_11_SOCIAL_POLICY` | Chính sách Tiếp thị Mạng xã hội | `DISCOVERY_SIGNAL` | Giao diện điều hướng / Navigation bar | `receipt_shopee_aff_11_social_policy.json` (SHA: `d4d3e16239...`) |

---

## 3. ĐIỀU KIỆN ĐẦU VÀO ĐỂ MỞ CỔNG G0

Hệ thống giữ nguyên trạng thái **`G0: BLOCKED`**. Cổng G0 chỉ được mở khi nhận được một trong 3 loại tài liệu thực tế:
1. **Tài liệu API/Affiliate chính thức** xuất từ Partner Center của tài khoản thật.
2. **File xuất Campaign / Product Feed (.CSV / .XLSX)** từ Dashboard Affiliate còn nguyên metadata.
3. **Response sandbox / identity chính thức** do nhà cung cấp cấp quyền (đã che secret).

*(Mọi link rút gọn `s.shopee.vn` hoặc link sản phẩm riêng lẻ chỉ được phân loại là `LEAD_INPUT`, không đủ điều kiện tạo candidate khi thiếu 5 mảnh chứng cứ gốc).*
