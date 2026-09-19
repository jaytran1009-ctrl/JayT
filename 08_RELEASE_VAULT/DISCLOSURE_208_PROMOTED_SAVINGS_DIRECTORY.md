# DISCLOSURE BATCH 208: PROMOTED REAL SAVINGS DIRECTORY

**Mã Batch:** `JAYT-208`  
**Ngày phát hành:** 27/08/2026  
**Mục tiêu:** Thực thi toàn diện Chỉ thị CEO JAYT-208: (1) Thăng hạng các nguồn an toàn của 207 thành các card tiết kiệm thật từ evidence gốc; (2) Đạt và vượt KPI thăng hạng tối thiểu 10 card 🔵 (thực tế đạt 12 🔵 Ưu đãi chính thức); (3) Tối ưu hóa trải nghiệm giao diện người dùng: ưu tiên 🔵/🟢 trên mặt tiền, chuyển 🟣 xuống "Khám phá nguồn chính thức đã ghi nhận"; (4) Thiết lập hệ thống kiểm soát Claim-Ledger 1-1 trên Live Production.

---

## 1. PHÂN BỔ NGUỒN VÀ TIÊU CHÍ THĂNG HẠNG (BATCH 208)

| Nhóm ngành | Mã Claim | Tên Nguồn / Thương Hiệu | Phân Tầng | Trích Đoạn Nguyên Văn Từ Artifact Nguồn | Tệp Artifact Trên Đĩa |
| :--- | :--- | :--- | :---: | :--- | :--- |
| **Rạp phim & Giải trí** | `CLM_208_01_METIZ_MEMBER` | **Metiz Cinema Đà Nẵng** | 🔵 | `"QUÀ MỪNG LÊN HẠNG - ƯU ĐÃI THÀNH VIÊN METIZ 2026"` | `raw_cohort100_L1_01.html` |
| **Rạp phim & Giải trí** | `CLM_208_02_METIZ_SUPER_MONDAY` | **Metiz Cinema Đà Nẵng** | 🔵 | `"SUPER MONDAY (THỨ HAI SIÊU HẠNG)"` | `raw_cohort100_L1_01.html` |
| **Rạp phim & Giải trí** | `CLM_208_03_STARLIGHT_PROMO` | **Starlight Cinema Đà Nẵng** | 🔵 | `"Các Ưu Đãi Khi Xem Phim Tại Rạp Phim Starlight"` | `raw_cohort100_L1_03.html` |
| **Rạp phim & Giải trí** | `CLM_208_04_STARLIGHT_TUE` | **Starlight Cinema Đà Nẵng** | 🔵 | `"THỨ 3 PHIM VIỆT"` | `raw_cohort100_L1_04.html` |
| **Ăn uống & Kèo nhóm** | `CLM_208_05_DOMINOS_DISCOUNT` | **Domino's Pizza** | 🔵 | `"giảm 70% cho Pizza thứ 2 cùng size có giá bằng hoặc thấp hơn Pizza thứ nhất"` | `raw_actionable_HARVEST_201_DOMINOS_GIAM_70_PIZZA_2.html` |
| **Ăn uống & Kèo nhóm** | `CLM_208_06_DOMINOS_DAILY` | **Domino's Pizza** | 🔵 | `"Khuyến Mãi Hấp Dẫn Mỗi Ngày \| Domino’s Pizza"` | `raw_leaf_LEAF_200_DOMINOS_PROMO.html` |
| **Học tập & Bản quyền** | `CLM_208_07_MICROSOFT_FREE` | **Microsoft Education** | 🔵 | `"Microsoft Office 365 miễn phí dành cho trường học \| Microsoft Education"` | `raw_cohort100_L4_05.html` |
| **Học tập & Bản quyền** | `CLM_208_08_SPOTIFY_STUDENT` | **Spotify Vietnam** | 🔵 | `"Premium dành cho Sinh viên - Spotify (VN)"` | `raw_cohort100_L4_07.html` |
| **Học tập & Bản quyền** | `CLM_208_09_FIGMA_FREE` | **Figma for Education** | 🔵 | `"Figma for Education \| Free Tools for the Classroom"` | `raw_cohort100_L4_03.html` |
| **Học tập & Bản quyền** | `CLM_208_10_AUTODESK_FREE` | **Autodesk Education** | 🔵 | `"Autodesk Student Access to Education Downloads"` | `raw_cohort100_L4_11.html` |
| **Học tập & Bản quyền** | `CLM_208_11_AWS_EDUCATE` | **AWS Educate** | 🔵 | `"AWS Educate - Kỹ năng đám mây dành cho giáo dục- AWS"` | `raw_cohort100_L4_12.html` |
| **Học tập & Bản quyền** | `CLM_208_12_TABLEAU_STUDENTS` | **Tableau for Students** | 🔵 | `"Tableau for Students \| Tableau"` | `raw_cohort100_L4_17.html` |
| **Nguồn ghi nhận** | `CLM_208_13` - `CLM_208_29` | **17 Nguồn Chính Thức** | 🟣 | Galaxy Cinema Đà Nẵng, Galaxy Cinema Hệ Thống, Dookki, KFC, Highlands, Kichi-Kichi, Gogi, Mikazuki, Notion, DanaBus, TNGo, Thư Viện KHTH, Bảo Tàng Chăm, Bảo Tàng Lịch Sử, Ngũ Hành Sơn, Cung Thiếu Nhi, Cổng Dịch Vụ Công | 17 Tệp Artifact tương ứng |

---

## 2. KẾT QUẢ KIỂM THỬ ĐỐI KHÁNG VÀ CHỨNG NHẬN 3 CỔNG PRODUCTION

- **Kiểm thử đối kháng (`test_promoted_sources_208.js`):** `5/5 PASS` (100% 29 card ràng buộc 1-1 với Claim Ledger 208, 100% quote trích nguyên văn từ file đĩa, 0 synthetic claim).
- **Chứng nhận 3 Cổng Vercel Production (`certify_promoted_sources_208.js`):**
  - **Gate 1 (Hash Parity):** Module SHA `8bde314d...` (🟢 PASS), Main JS SHA `b81a1e59...` (🟢 PASS).
  - **Gate 2 (Live DOM Puppeteer Assertions):** Headline `"Hôm nay: 0 🟢 · 12 🔵 ưu đãi chính thức · 17 🟣 nguồn chính thức đã ghi nhận"` (🟢 PASS), OS 3.348 rendered.
  - **Gate 3 (Visual Capture):** 3 ảnh chụp thực tế tại Production (`screenshot_208_desktop_light.png`, `screenshot_208_mobile_light.png`, `screenshot_208_mobile_dark.png`).

---
*Bản công bố được lưu trữ vĩnh viễn trong Release Vault JAYT.*
