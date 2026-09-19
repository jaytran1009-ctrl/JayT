# DISCLOSURE BATCH 206: SOURCE-FIRST CARD ENGINE & TRUTH CONTAINMENT

**Mã Batch:** `JAYT-206`  
**Ngày phát hành:** 27/08/2026  
**Mục tiêu:** Thực thi toàn diện Chỉ thị CEO Khẩn JAYT-206: (1) Containment và Quarantine toàn diện Batch 205 (các claim literal chưa ràng buộc artifact cấp record); (2) Xây dựng `Source-First Card Engine` trích xuất thẻ 100% từ artifact vật lý trên đĩa; (3) Công bố **25 cơ hội tiết kiệm có nguồn gốc xác thực** (vượt yêu cầu tối thiểu 10 card) trên Live Vercel Production.

---

## 1. KẾT QUẢ CONTAINMENT BATCH 205

- **Quyết định:** JAYT-205 bị `REJECTED`.
- **Hành động cách ly:** Toàn bộ generator, feed 205, test và disclosure của 205 đã được đưa vào nhật ký cách ly append-only tại `07_QUALITY_ASSURANCE/runtime_evidence/evidence_206_containment/QUARANTINE_LOG_205.json`.
- **Gỡ bỏ dữ liệu chưa ràng buộc:** Gỡ toàn bộ 43 card của batch 205 khỏi live feed.

---

## 2. NGUYÊN TẮC SOURCE-FIRST CARD ENGINE

1. **Cấm viết claim trực tiếp:** Generator không được chứa giá, %, voucher, điều kiện, địa chỉ hoặc thời hạn dưới dạng text tự viết.
2. **Cấu trúc Source Record bắt buộc:** Mọi card phải được tạo từ source record có:
   - URL nguồn (`source_url`);
   - Tệp artifact vật lý trên đĩa (`evidence_file`);
   - Mã băm toàn vẹn SHA-256 (`evidence_sha256`);
   - Thời điểm thu thập (`captured_at`);
   - Trích dẫn nguyên văn trực tiếp từ artifact (`offer_quote`);
   - Phân tầng (`tier`);
   - Vòng đời (`freshness_ttl_days`).
3. **Fail-Closed:** Nếu tệp artifact thiếu trên đĩa hoặc đoạn trích không tồn tại trong tệp, card sẽ bị loại bỏ và không được khởi tạo.

---

## 3. DANH SÁCH 25 CARD SOURCE-BOUND THỰC TẾ TRÊN LIVE PRODUCTION

### A. Tầng 🔵 — Ưu Đãi Chính Thức (10 Cards):
1. **Metiz Cinema Đà Nẵng** (`SRC_206_METIZ_MEMBERSHIP`) — Trích từ `raw_cohort100_L1_01.html` (SHA: `4cbe0234d9ec...`)
2. **Galaxy Cinema Đà Nẵng** (`SRC_206_GALAXY_DANANG_BRANCH`) — Trích từ `raw_actionable_HARVEST_201_GALAXY_DANANG_BRANCH.html` (SHA: `2dc6bb272f38...`)
3. **Galaxy Cinema** (`SRC_206_GALAXY_HAPPY_DAY`) — Trích từ `raw_actionable_HARVEST_201_GALAXY_HAPPY_DAY.html` (SHA: `fe1d6346a1d2...`)
4. **Starlight Cinema Đà Nẵng** (`SRC_206_STARLIGHT_PROMOS`) — Trích từ `raw_cohort100_L1_03.html` (SHA: `0f7c5f21431d...`)
5. **Dookki Vietnam** (`SRC_206_DOOKKI_VIETNAM`) — Trích từ `raw_actionable_HARVEST_201_DOOKKI_VIETNAM.html` (SHA: `834ea76bb3c7...`)
6. **KFC Vietnam** (`SRC_206_KFC_PROMOS`) — Trích từ `raw_cohort100_L2_03.html` (SHA: `290d2ac81dd8...`)
7. **Highlands Coffee** (`SRC_206_HIGHLANDS_PROMOS`) — Trích từ `raw_cohort100_L2_14.html` (SHA: `3622756dbb87...`)
8. **Kichi-Kichi** (`SRC_206_KICHI_KICHI`) — Trích từ `raw_cohort100_L2_22.html` (SHA: `84cd394335fe...`)
9. **Gogi House** (`SRC_206_GOGI_HOUSE`) — Trích từ `raw_cohort100_L2_23.html` (SHA: `a55c18e2bd2c...`)
10. **Da Nang Mikazuki** (`SRC_206_MIKAZUKI_RESORT`) — Trích từ `raw_cohort100_L1_10.html` (SHA: `44f9fc630df0...`)

### B. Tầng 🟣 — Điểm Hẹn Giá Tốt & Đặc Quyền Xác Minh (15 Cards):
11. **Spotify Vietnam** (`SRC_206_SPOTIFY_STUDENT`) — Trích từ `raw_cohort100_L4_07.html` (SHA: `d5068d811315...`)
12. **Notion for Education** (`SRC_206_NOTION_EDUCATION`) — Trích từ `raw_cohort100_L4_02.html` (SHA: `f62864287a60...`)
13. **Figma for Education** (`SRC_206_FIGMA_EDUCATION`) — Trích từ `raw_cohort100_L4_03.html` (SHA: `2eac7d59ec4f...`)
14. **Microsoft Education** (`SRC_206_MICROSOFT_365`) — Trích từ `raw_cohort100_L4_05.html` (SHA: `7c7d7632ca70...`)
15. **AWS Educate** (`SRC_206_AWS_EDUCATE`) — Trích từ `raw_cohort100_L4_12.html` (SHA: `1e5c8c9b0a46...`)
16. **Tableau for Students** (`SRC_206_TABLEAU_STUDENTS`) — Trích từ `raw_cohort100_L4_17.html` (SHA: `09fa92db9541...`)
17. **Autodesk Education** (`SRC_206_AUTODESK_EDUCATION`) — Trích từ `raw_cohort100_L4_11.html` (SHA: `04bef63cedb3...`)
18. **DanaBus Đà Nẵng** (`SRC_206_DANABUS_TRANSIT`) — Trích từ `raw_cohort100_L3_01.html` (SHA: `8b456af2b2ad...`)
19. **TNGo Đà Nẵng** (`SRC_206_TNGO_BIKES`) — Trích từ `raw_cohort100_L3_04.html` (SHA: `2bfec7d16ccb...`)
20. **Thư Viện KHTH Đà Nẵng** (`SRC_206_DANANG_LIBRARY`) — Trích từ `raw_cohort100_L3_07.html` (SHA: `b1edb6f577ca...`)
21. **Bảo Tàng Điêu Khắc Chăm** (`SRC_206_DANANG_CHAM_MUSEUM`) — Trích từ `raw_cohort100_L1_15.html` (SHA: `5db9a56ce960...`)
22. **Bảo Tàng Lịch Sử Đà Nẵng** (`SRC_206_DANANG_HISTORICAL_MUSEUM`) — Trích từ `raw_cohort100_L1_17.html` (SHA: `96f32247029a...`)
23. **Danh Thắng Ngũ Hành Sơn** (`SRC_206_DANANG_NGU_HANH_SON`) — Trích từ `raw_cohort100_L1_18.html` (SHA: `1b805c4ee278...`)
24. **Cung Thiếu Nhi Đà Nẵng** (`SRC_206_DANANG_CHILDREN_PALACE`) — Trích từ `raw_cohort100_L1_21.html` (SHA: `64baf2f8d233...`)
25. **Cổng Dịch Vụ Công Đà Nẵng** (`SRC_206_DANANG_PUBLIC_SERVICES`) — Trích từ `raw_cohort100_L3_10.html` (SHA: `4783b7b8d456...`)

---

## 4. KẾT QUẢ CHỨNG NHẬN PRODUCTION (3 CỔNG)

- **Gate 1 (Hash Parity):** Module SHA `d7b77411...` (🟢 Khớp 100%), Main JS SHA `0bf9aa43...` (🟢 Khớp 100%).
- **Gate 2 (Live DOM Puppeteer Assertions):**
  - Số card hiển thị trong DOM: `25` (🟢 Khớp 1-1 với 25 source-bound records).
  - Headline Live: `"Hôm nay: 0 🟢 đã xác nhận · 10 🔵 ưu đãi chính thức · 15 🟣 điểm hẹn đã xác minh"` (🟢 PASS).
  - Giao diện `Source-First OS 3.346` hiển thị chính xác (🟢 PASS).
- **Gate 3 (Visual Capture):** 3 ảnh chụp thực tế tại Production (`screenshot_206_desktop_light.png`, `screenshot_206_mobile_light.png`, `screenshot_206_mobile_dark.png`).

---
*Bản công bố được lưu trữ vĩnh viễn trong Release Vault JAYT.*
