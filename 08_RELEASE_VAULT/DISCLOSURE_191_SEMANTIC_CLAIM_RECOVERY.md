# 🛡️ DISCLOSURE 191 — BÁO CÁO KIỂM TOÁN SEMANTIC & CƠ CHẾ NGUỒN CUNG TRUNG THỰC
## Batch 190 Semantic Re-Audit, Value Separation & Honest Opportunity Count (11 Real Deals)

**Ngày:** 2026-08-27T17:20:00+07:00  
**Chỉ thị điều hành:** `CHỈ THỊ CEO KHẨN — JAYT-191: SEMANTIC CLAIM RECOVERY & HONEST OPPORTUNITY COUNT`  
**Quyết định điều hành:** 🔴 `JAYT-190 KPI 17/30–50: REJECTED` | 🟢 `JAYT-191 HONEST COUNT: IMPLEMENTED` (Đang chờ CEO nghiệm thu)  
**Tệp Nguồn Giao Diện SOT:** [`03_SOURCE_OF_TRUTH/jayt_apex_interface.js`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/03_SOURCE_OF_TRUTH/jayt_apex_interface.js)  
**Generated Data Module:** [`03_SOURCE_OF_TRUTH/jayt_verified_deals_module.js`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/03_SOURCE_OF_TRUTH/jayt_verified_deals_module.js)  
**Supply Truth Ledger:** [`07_QUALITY_ASSURANCE/runtime_evidence/SUPPLY_TRUTH_LEDGER.json`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/runtime_evidence/SUPPLY_TRUTH_LEDGER.json)  
**Custody Event Log:** [`07_QUALITY_ASSURANCE/runtime_evidence/EVIDENCE_CUSTODY_EVENT_LOG.jsonl`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/runtime_evidence/EVIDENCE_CUSTODY_EVENT_LOG.jsonl)  
**Semantic Audit Report:** [`07_QUALITY_ASSURANCE/runtime_evidence/evidence_190_harvest/SEMANTIC_AUDIT_REPORT_191.json`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/runtime_evidence/evidence_190_harvest/SEMANTIC_AUDIT_REPORT_191.json)  
**Live Certification Report:** [`07_QUALITY_ASSURANCE/runtime_evidence/evidence_190_harvest/CERTIFICATION_191_LIVE_REPORT.json`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/runtime_evidence/evidence_190_harvest/CERTIFICATION_190_LIVE_REPORT.json)  

---

## I. NGUYÊN NHÂN SỰ CỐ & QUYẾT ĐỊNH ĐIỀU HÀNH JAYT-191

### 1. Bối cảnh & Vi phạm trong JAYT-190
- Trong đợt triển khai JAYT-190, hệ thống đã thu thập được 21 file raw capture thực tế, nhưng bộ lọc semantic trích xuất câu quá lỏng lẻo: chấp nhận các câu bản quyền/footer (`Copyright © 2023 KFC Vietnam`, `VIETNAM LOTTERIA CO.LTD`), tiêu đề danh mục (`TIN TỨC & SỰ KIỆN`), bài viết giới thiệu (`Food Tour Đà Nẵng bằng xe buýt`) hoặc chính sách chung làm ưu đãi Tier 2 (🔵).
- **CEO kết luận:** Bác bỏ KPI `17/30–50` của JAYT-190, yêu cầu thu hồi toàn bộ 14 card 🔵 và kiểm toán semantic lại từng capture trên đĩa theo chuẩn mới nghiêm ngặt.

### 2. Tiêu chuẩn Semantic Mới (3 Yếu tố - Tối thiểu 2/3)
Một record chỉ được xuất bản ở Tier 2 (🔵) khi trích dẫn nguyên văn trực tiếp thỏa mãn tối thiểu **2 trong 3 tiêu chí**:
1. **Lợi ích cụ thể:** Miễn phí, giảm giá, % giảm, giá ưu đãi (45k, 0đ...), quà tặng, quyền truy cập Pro/Premium.
2. **Đối tượng hoặc điều kiện:** Sinh viên, học sinh, thành viên, U22, ngày áp dụng (Thứ 3/Thứ 4 Happy Day), xác minh SheerID/email trường.
3. **Hành động / chương trình cụ thể:** Đăng ký, mua vé, nhận pack/bản quyền, dùng thử, đổi mã.

---

## II. BẢNG TỔNG KẾT KIỂM TOÁN SEMANTIC 21 RAW CAPTURES

| Candidate ID | Thương Hiệu | Lane | Phân Loại Semantic | Trích Dẫn Nguyên Văn Đã Đối Soát | Lý Do / Kết Quả |
|---|---|---|:---:|---|---|
| `CAND_190_01` | GitHub Education | Lane 1: Digital | 🟢 `DEAL` | *"Free GitHub Pro account for verified learners · Access professional developer tools and partner offers at no cost."* | Đạt 2/3 (Miễn phí Pro + Verified learners) |
| `CAND_190_02` | Notion | Lane 1: Digital | 🟢 `DEAL` | *"Notion for Education: Free Plus plan for students and educators."* | Đạt 2/3 (Free Plus plan + Students/Educators) |
| `CAND_190_03` | Figma | Lane 1: Digital | 🟢 `DEAL` | *"Use Figma and FigJam to ideate, create, and share work—all free, as a student or teacher."* | Đạt 2/3 (All free + Student/Teacher) |
| `CAND_190_04` | Autodesk | Lane 1: Digital | 🟣 `OFFICIAL_PROGRAM` | *"Autodesk Educational Access to 3D Design & Engineering Software."* | Tiện ích sinh viên chính thức (Không tính vào deal) |
| `CAND_190_05` | Canva | Lane 1: Digital | 🟢 `DEAL` | *"The 100% free interactive learning platform built for every classroom, across the globe."* | Đạt 2/3 (100% free + Classroom/Education) |
| `CAND_190_06` | Microsoft Education | Lane 1: Digital | 🟢 `DEAL` | *"Nhận quyền truy nhập miễn phí vào Word, Excel và PowerPoint qua Microsoft 365 dành cho giáo dục."* | Đạt 2/3 (Miễn phí Word/Excel + Giáo dục/SV) |
| `CAND_190_07` | Apple | Lane 1: Digital | 🟢 `DEAL` | *"Sinh viên được nhận 1 tháng sử dụng Apple Music miễn phí, kèm theo quyền truy cập vào Apple TV+."* | Đạt 3/3 (1 tháng miễn phí + TV+ / Sinh viên / Đăng ký) |
| `CAND_190_08` | Adobe | Lane 1: Digital | 🟢 `DEAL` | *"Creative Cloud Pro for students and teachers · Special student discount."* | Đạt 2/3 (Special student discount + Pro student) |
| `CAND_190_09` | Galaxy Cinema | Lane 2: Cinema | 🟢 `DEAL` | *"Happy Day - Vé Chỉ Từ 45K · Ưu Đãi Thành Viên Galaxy Cinema 2026."* | Đạt 2/3 (Vé chỉ từ 45K + Happy Day / Thành viên) |
| `CAND_190_10` | Metiz Cinema Đà Nẵng | Lane 2: Cinema | ❌ `REJECTED` | None | HTTP 404 |
| `CAND_190_11` | Starlight Cinema Đà Nẵng | Lane 2: Cinema | ❌ `REJECTED` | None | Redirect 404 |
| `CAND_190_12` | Lotte Cinema | Lane 2: Cinema | ⚪ `SOURCE_ONLY` | None | Trang SPA không có trích dẫn ưu đãi đọc được |
| `CAND_190_13` | Bảo Tàng Điêu Khắc Chăm | Lane 2: Cinema | ⚪ `SOURCE_ONLY` | None | Bảng giá chung, không có mức giảm giá cụ thể |
| `CAND_190_14` | KFC Vietnam | Lane 3: F&B | ⚪ `SOURCE_ONLY` | None | Trang React rỗng không chứa text ưu đãi tĩnh |
| `CAND_190_15` | Lotteria Vietnam | Lane 3: F&B | ⚪ `SOURCE_ONLY` | None | Trang React rỗng không chứa text ưu đãi tĩnh |
| `CAND_190_16` | Jollibee Vietnam | Lane 3: F&B | ⚪ `SOURCE_ONLY` | None | Banner chung không nêu chiết khấu cụ thể |
| `CAND_190_17` | Highlands Coffee | Lane 3: F&B | ⚪ `SOURCE_ONLY` | None | Tin tức sự kiện chung, không có voucher |
| `CAND_190_18` | Phúc Long | Lane 3: F&B | ❌ `REJECTED` | None | HTTP 404 |
| `CAND_190_19` | DanaBus Đà Nẵng | Lane 4: Mobility | 🟣 `OFFICIAL_PROGRAM` | *"Cổng tra cứu tuyến & chính sách xe buýt trợ giá công cộng Đà Nẵng."* | Tiện ích giao thông chính thức (Không tính vào deal) |
| `CAND_190_20` | Đường Sắt Việt Nam (DSVN) | Lane 4: Mobility | 🟣 `OFFICIAL_PROGRAM` | *"Cổng bán vé điện tử & chính sách giá vé ngành đường sắt (Ga Đà Nẵng)."* | Tiện ích giao thông chính thức (Không tính vào deal) |
| `CAND_190_21` | TNGo Đà Nẵng | Lane 4: Mobility | ⚪ `SOURCE_ONLY` | None | Liệt kê HN/HCM/VT, chưa có claim ưu đãi tại Đà Nẵng |

---

## III. BẢNG TỔNG HỢP NGUỒN CUNG THEO 4 LANE

| Lane | Raw capture | 🟢 | 🔵 | 🟣 | Bị loại | Lý do chính |
|---|---:|---:|---:|---:|---:|---|
| **Lane 1: Student digital benefits** | 8 | 3 | 7 | 1 | 0 | Đạt 7 deal 🔵 (GitHub, Notion, Figma, Canva, Microsoft, Apple, Adobe) + 1 Utility (Autodesk) + 3 🟢 có sẵn |
| **Lane 2: Cinema & local entertainment** | 5 | 0 | 1 | 0 | 4 | Galaxy (Vé 45K), Metiz/Starlight (404), Lotte/Chăm (Chưa có verbatim discount) |
| **Lane 3: F&B chains** | 5 | 0 | 0 | 0 | 5 | Phúc Long (404), KFC/Lotteria/Highlands/Jollibee (Chưa đủ điều kiện trích dẫn chuẩn) |
| **Lane 4: Public mobility & city services**| 3 | 0 | 0 | 2 | 1 | DanaBus & DSVN (Chuyển sang Official Program), TNGo (Non-local) |
| **TỔNG CỘNG** | **21** | **3** | **8** (mới) | **3** | **10** | **11 Cơ Hội Tiết Kiệm Thật (3 🟢 + 8 🔵) + 3 Cổng Tiện Ích Sinh Viên** |

---

## IV. BẰNG CHỨNG KIỂM THỬ LIVE VERCEL PRODUCTION (CERTIFIED)

- **Vercel Deployment URL:** `https://deploy-ten-xi-48.vercel.app/` (Version: `Daily Deal OS 3.332`)
- **Live Data Module SHA-256:** `209cafa29ddb2de9f9bc77876429b18c574a0bde93578f51f41a9d3702e4af28` (**100% Match Local SOT**)
- **Live Main JS SHA-256:** `31647568bab4336e1736f0d7543b1305e70237efcdc879e8cd015e56a4d9c134` (**100% Match Local SOT**)
- **Kết Quả Puppeteer Live Certification:**
  - ✅ `window.JAYT_VERIFIED_DEALS_FEED` nạp đúng **3 deal 🟢, 8 ưu đãi 🔵, 0 🟣, 0 ⚪** (Tổng: 11 deal thật).
  - ✅ Live DOM hiển thị đúng badge `Daily Deal OS 3.332`.
  - ✅ Live DOM hiển thị đúng tiến độ `🎯 KPI: 11/30–50 Cơ Hội Tiết Kiệm Thật (3 🟢 + 8 🔵)`.
  - ✅ Đã thanh trừng 100% anti-patterns (Copyright, footer, tin tức, bài food tour) khỏi promo cards.
  - ✅ 3 ảnh chụp màn hình live được lưu tại `07_QUALITY_ASSURANCE/runtime_evidence/evidence_190_harvest/` và thư mục artifacts.

---

## V. BẢNG MÃ BĂM TÍNH TOÀN VẸN RUNTIME (HASH TRUTH)

| Tệp Cốt Lõi | SHA-256 Checksum | Vai Trò Quản Trị | Trạng Thái |
|---|---|---|:---:|
| `generated_tiered_savings_feed_191.json` | `a45a46aa28fc8fdf7f618b42ac35e3fb99e79d0bbcfadf084f5d6d4af9e62412` | Feed gốc 11 deal thật đã qua semantic audit | 🟢 **100% DISK PARITY** |
| `jayt_apex_interface.js` (SOT) | `31647568bab4336e1736f0d7543b1305e70237efcdc879e8cd015e56a4d9c134` | Giao diện Apex OS 3.332 sạch | 🟢 **100% SOT PARITY** |
| `jayt_verified_deals_module.js` (SOT) | `209cafa29ddb2de9f9bc77876429b18c574a0bde93578f51f41a9d3702e4af28` | Module dữ liệu phân tầng sinh tự động | 🟢 **100% SOT PARITY** |
| `jayt_apex_interface.js` (Deploy) | `31647568bab4336e1736f0d7543b1305e70237efcdc879e8cd015e56a4d9c134` | Gói phát hành Vercel Production | 🟢 **100% DEPLOY PARITY** |
| `jayt_verified_deals_module.js` (Deploy)| `209cafa29ddb2de9f9bc77876429b18c574a0bde93578f51f41a9d3702e4af28` | Module phát hành Vercel Production | 🟢 **100% DEPLOY PARITY** |
