# 🛡️ DISCLOSURE 194 — BÁO CÁO OFFER APPLICABILITY RESOLUTION
## Báo Cáo Phân Định Rõ Ràng Deal Xác Nhận Áp Dụng vs Chờ Xác Nhận Phạm Vi

**Ngày:** 2026-08-27T17:40:00+07:00  
**Chỉ thị điều hành:** `CHỈ THỊ CEO — JAYT-194: OFFER APPLICABILITY RESOLUTION`  
**Trạng thái thực thi:** `IMPLEMENTED_PENDING_CEO_AUDIT`  
**Tệp Nguồn Giao Diện SOT:** [`03_SOURCE_OF_TRUTH/jayt_apex_interface.js`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/03_SOURCE_OF_TRUTH/jayt_apex_interface.js)  
**Generated Data Module:** [`03_SOURCE_OF_TRUTH/jayt_verified_deals_module.js`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/03_SOURCE_OF_TRUTH/jayt_verified_deals_module.js)  
**Supply Truth Ledger:** [`07_QUALITY_ASSURANCE/runtime_evidence/SUPPLY_TRUTH_LEDGER.json`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án Giá Trị Cộng Đồng/07_QUALITY_ASSURANCE/runtime_evidence/SUPPLY_TRUTH_LEDGER.json)  
**Custody Event Log:** [`07_QUALITY_ASSURANCE/runtime_evidence/EVIDENCE_CUSTODY_EVENT_LOG.jsonl`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự Án Giá Trị Cộng Đồng/07_QUALITY_ASSURANCE/runtime_evidence/EVIDENCE_CUSTODY_EVENT_LOG.jsonl)  
**Live Certification Report:** [`07_QUALITY_ASSURANCE/runtime_evidence/evidence_194_harvest/CERTIFICATION_194_LIVE_REPORT.json`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự Án Giá Trị Cộng Đồng/07_QUALITY_ASSURANCE/runtime_evidence/evidence_194_harvest/CERTIFICATION_194_LIVE_REPORT.json)  

---

## I. BẢNG BÁO CÁO APPLICABILITY RESOLUTION BATCH 194

| Thương hiệu | Bằng chứng ưu đãi & Chi nhánh | Tình trạng áp dụng (Applicability) | Phân loại hiển thị & Nhãn UI |
|---|---|---|---|
| **Da Nang Mikazuki Japanese Resorts & Spa** | `raw_daily_CAND_192_04...` (SHA: `e959abe3...`) & `raw_locality_BRAND_MIKAZUKI...` (SHA: `adbec805...`) | Quote trực tiếp: *"Buffet tại Da Nang Mikazuki"* $\longrightarrow$ Áp dụng trực tiếp tại cơ sở Đà Nẵng (Khu du lịch Xuân Thiều, Liên Chiểu) | 🟢 **Áp dụng tại Đà Nẵng** (`LOCAL_CONFIRMED_ACTIONABLE_DEAL`) · *Tính vào KPI* |
| **Galaxy Cinema** | `raw_daily_CAND_192_01...` (SHA: `59336ab0...`) & `raw_locality_BRAND_GALAXY...` (SHA: `bc3f8f30...`) | Có ưu đãi Happy Day 45K + Có rạp tại Co.opmart 478 Điện Biên Phủ, nhưng điều khoản chưa ghi nhận rõ danh sách rạp áp dụng | 🔵 **Có cơ sở Đà Nẵng · Kiểm tra phạm vi** (`OFFER_WITH_DANANG_BRANCH_SCOPE_PENDING`) · *Không tính vào KPI* |
| **Domino's Pizza** | `raw_daily_CAND_192_02...` (SHA: `1517167e...`) & `raw_locality_BRAND_DOMINOS...` (SHA: `e0993c8f...`) | Có ưu đãi Thứ 5 Mua 1 Tặng 1 + Có chuỗi cửa hàng tại Đà Nẵng, nhưng chưa chứng minh phạm vi áp dụng tại từng cửa hàng | 🔵 **Có cơ sở Đà Nẵng · Kiểm tra phạm vi** (`OFFER_WITH_DANANG_BRANCH_SCOPE_PENDING`) · *Không tính vào KPI* |
| **The Pizza Company** | `raw_daily_CAND_192_03...` (SHA: `edf5aff8...`) & `raw_locality_BRAND_THE_PIZZA...` (SHA: `483f98b4...`) | Có ưu đãi Mua 1 Tặng 1 Nước + Có 4 chi nhánh tại Đà Nẵng, nhưng chưa chứng minh áp dụng tại chi nhánh cụ thể | 🔵 **Có cơ sở Đà Nẵng · Kiểm tra phạm vi** (`OFFER_WITH_DANANG_BRANCH_SCOPE_PENDING`) · *Không tính vào KPI* |
| **Apple Music** | `raw_daily_CAND_192_05...` (SHA: `2be1b4a4...`) | Gói sinh viên toàn quốc (UNiDAYS/SheerID) | 🎓 **Đặc quyền sinh viên dài hạn** (`STUDENT_LONG_TERM_PRIVILEGE`) · *10/10 Gói* |

---

## II. BẢNG TỔNG HỢP 4 KPI ĐỘC LẬP THEO CHỈ THỊ CEO JAYT-194

| Nhóm Nguồn Cung | Đang Có | Mục Tiêu | Trạng Thái & Ghi Chú |
|---|---:|---:|---|
| **1. Deal hành động đã xác nhận tại Đà Nẵng (`LOCAL_CONFIRMED_ACTIONABLE_DEALS`)** | **1** | **30–50** | **Khoảng cách: 29–49 deal** (Da Nang Mikazuki Resort — Buffet Ăn Trưa Đi 4 Tính 3). So sánh trực tiếp với mục tiêu 30–50 deal/ngày. |
| **2. Ưu đãi có cơ sở tại Đà Nẵng · Chờ phạm vi (`OFFER_WITH_DANANG_BRANCH_SCOPE_PENDING`)** | **3** | Mở rộng theo evidence | Galaxy Cinema, Domino's Pizza, The Pizza Company. Hiển thị thông báo kiểm tra điều khoản trước khi đi. |
| **3. Ưu đãi chính thức toàn quốc (`NATIONAL_OFFICIAL_PROMOTIONS`)** | **0** | Đang rà soát | Không có deal mồ côi ngoài luồng. |
| **4. Đặc quyền sinh viên dài hạn (`STUDENT_LONG_TERM_PRIVILEGES`)** | **10** | Mở rộng theo evidence | 10 gói bản quyền & học tập chính thức (gồm Apple Music, GitHub, Notion, Figma, Canva, Microsoft, Adobe, Spotify, JetBrains, YouTube). |
| **5. Cổng thông tin & tiện ích chính thức (`OFFICIAL_PROGRAMS`)** | **3** | Cố định | Autodesk Education, DanaBus Đà Nẵng, Ga Đà Nẵng DSVN. |
| **6. Tín hiệu cộng đồng (`COMMUNITY_SIGNALS`)** | **0** | Theo submission thật | Đang chờ người dùng gửi bằng chứng thực tế. |

---

## III. BẰNG CHỨNG KIỂM THỬ LIVE VERCEL PRODUCTION (CERTIFIED)

- **Vercel Production URL:** `https://deploy-ten-xi-48.vercel.app/`
- **Phiên bản hệ điều hành:** `Daily Deal OS 3.335`
- **Live Module SHA-256:** `2ee0912cee204e443b82466ca14164c3d4b0245157f514ff5fc860cdab9437b6` (**100% Khớp Local SOT**)
- **Live Main JS SHA-256:** `989ba097b97a947732f6f6139f9bf4a9c73ce06b0c0669129973b812eb3beb46` (**100% Khớp Local SOT**)
- **Kết Quả Puppeteer Live Certification:**
  - ✅ `window.JAYT_TIERED_SAVINGS_FEED` tải đúng **1 deal đã xác nhận áp dụng tại Đà Nẵng**, **3 deal có cơ sở chờ xác nhận phạm vi**, và **10 đặc quyền sinh viên dài hạn**.
  - ✅ Card Mikazuki hiển thị badge `🟢 ÁP DỤNG TẠI ĐÀ NẴNG` kèm địa chỉ cơ sở tại Liên Chiểu.
  - ✅ 3 card chuỗi (Galaxy, Domino's, The Pizza Company) hiển thị badge `🔵 CÓ CƠ SỞ ĐÀ NẴNG · KIỂM TRA PHẠM VI` kèm lưu ý kiểm tra điều khoản áp dụng.
  - ✅ KPI hiển thị nghiêm ngặt: `🎯 KPI: 1/30–50 Deal Hành Động Xác Nhận Tại Đà Nẵng`.
  - ✅ 3 ảnh chụp màn hình live đã lưu tại `evidence_194_harvest/` và thư mục artifacts.
