# JAYT-223: SINGLE CONTENT ADMISSION SYSTEM & SYSTEMIC ANTI-RECURRENCE CONTROL
**Hồ sơ công bố & Bản ghi kiến trúc hệ thống khóa tái phạm cấp cốt lõi**

---

## 1. Thông Tin Phiên Bản & Mục Tiêu Kiến Trúc
- **Mã chỉ thị:** `JAYT-223`
- **Tên hệ thống:** `SINGLE CONTENT ADMISSION SYSTEM` (Cổng Nhập Liệu Nội Dung Duy Nhất)
- **Mục tiêu tối thượng:** Xóa bỏ hoàn toàn khả năng AI tự tạo claim/deal trong generator rồi tự dùng test/registry do chính nó tạo để chứng minh. Thiết lập một cổng dữ liệu duy nhất kiểm tra bằng chứng vật lý thực tế trên đĩa trước khi bất kỳ card nào được đưa vào `Published Content Manifest`.
- **Trạng thái phân loại:** `ADMITTED_AND_LIVE` (Hệ thống thực tế đã qua cổng và đang chạy trực tiếp)
- **URL Live Production:** `https://deploy-ten-xi-48.vercel.app/`
- **Phiên bản hệ thống:** `3.362.0`

---

## 2. Bốn Trụ Cột Kiến Trúc Single Admission

### 1. Một đường vào duy nhất (`Published Content Manifest`)
- Toàn bộ giao diện UI và các module hiển thị (`jayt_apex_interface.js`, `jayt_verified_deals_module.js`) chỉ render từ `Published Content Manifest`.
- Mỗi card xuất hiện trên UI bắt buộc có `card_id` trỏ đến `Evidence Bundle ID` và `Visual Asset ID`.
- Bất kỳ card nào không có bundle hợp lệ trong manifest bị cấm triệt để.

### 2. Evidence Bundle Contract (Bộ Bằng Chứng Đối Soát Vật Lý)
Một thẻ chỉ được admission khi có đủ 10 trường dữ liệu vật lý:
1. `bundle_id`: Mã định danh bundle duy nhất (`BUNDLE_DEAL_*`, `BUNDLE_SOURCE_*`, `BUNDLE_VENUE_*`).
2. `card_id`: Mã định danh thẻ trên UI (`CARD_217_*`).
3. `source_url`: Deep URL dẫn thẳng đến trang chứa thông tin.
4. `raw_capture_artifact_path`: Đường dẫn tệp capture văn bản gốc trên đĩa.
5. `raw_capture_sha256`: Mã băm SHA-256 đối soát toàn vẹn tệp capture.
6. `raw_quote_exact`: Câu trích dẫn nguyên văn từ trang chính thức (đối soát substring 100% với tệp vật lý).
7. `terms`: Điều kiện áp dụng nguyên văn.
8. `validity`: Thời hạn và ngày áp dụng rõ ràng.
9. `scope`: Phạm vi áp dụng tại Đà Nẵng / Online.
10. `exact_media_relation`: Quan hệ media rõ ràng (Poster gốc khớp SHA-256 hoặc Text Identifier / Brand Identity).

### 3. Build & Release Gates (Cổng Tự Động Hóa 5 Cấp Độ)
- **Cổng 1: AST Scanner:** Quét toàn bộ mã nguồn UI/generator, chặn đứng mọi mảng promo hardcode hoặc generator tự chế.
- **Cổng 2: Historical Regression Memory Suite:** Khóa 8 bài test hồi quy lịch sử vĩnh viễn (`REG_01` -> `REG_08`).
- **Cổng 3: JayT Admission Engine:** Kiểm tra 35 physical bundle trên đĩa, verify SHA-256 và chuỗi substring quote.
- **Cổng 4: Memory Transaction Final Gate 067:** Vượt qua 17/17 cổng quản trị hệ thống.
- **Cổng 5: Remote Hash Parity & Puppeteer Replay:** Triển khai Vercel Production, kiểm tra mã băm từ xa và chạy kịch bản Puppeteer kiểm tra DOM & modal replay trực tiếp.

### 4. Bảng Tổng Hợp 35 Card Đã Admission (Admitted Breakdown)
- **3 Deals Thực Tế Có Poster Gốc (Exact 4-Layer Binding):**
  1. `BUNDLE_DEAL_001_METIZ_U22` -> `CARD_217_01_METIZ_MEMBER` (Metiz Cinema — Đồng Giá 55K Từ T3 Đến T5)
  2. `BUNDLE_DEAL_002_METIZ_SUPER_MONDAY` -> `CARD_217_02_METIZ_SUPER_MONDAY` (Metiz Cinema — Thứ Hai Siêu Hạng 55K)
  3. `BUNDLE_DEAL_003_STARLIGHT_U22` -> `CARD_217_03_STARLIGHT_PROMO` (Starlight Cinema — Đồng Giá Vé 45K T2-T5)
- **14 Nguồn Chính Thức Theo Dõi Chương Trình (Official Sources):**
  Galaxy Cinema, CGV Cinemas, Domino's Pizza, Popeyes, Spotify Student, Microsoft 365, Figma, AWS Educate, Autodesk Education, GitHub Student Pack, Notion Education, Xe Buýt DanaBus, Tổng Công Ty Đường Sắt VN, Xe Đạp Công Cộng TNGo.
- **18 Địa Điểm Xác Minh & Tiện Ích Cộng Đồng (Verified Venues & Community Utilities):**
  Highlands Coffee, The Coffee House, Phúc Long, Katinat, Chè Liên, Zone Six Coffee 24/7, Cơm Gà Bà Buội, Bánh Tráng Đại Lộc, Mì Quảng Bà Mua, Cơm Tấm Bà Lang, Bún Bò Bà Diệu, Cổng Dịch Vụ Công ĐN, Thư Viện Tổng Hợp ĐN, Trung Tâm Hành Chính ĐN, Kho Bạc Nhà Nước ĐN, Bảo Tàng Chăm, Cung Thiếu Nhi, Bến Xe Trung Tâm.

---

## 3. Bằng Chứng Xác Thực Trực Tiếp (Live Evidence Artifacts)
- **Live Report JSON:** `07_QUALITY_ASSURANCE/runtime_evidence/evidence_223_certification/CERTIFICATION_223_LIVE_REPORT.json`
- **Ảnh Chụp Modal Detail (Poster + Quote):** `screenshot_223_modal_detail_verified.png`
- **Ảnh Chụp Hero Spotlight Card:** `screenshot_223_hero_spotlight_card.png`
- **Ảnh Chụp Desktop Light 35 Cards:** `screenshot_223_desktop_light.png`
- **Ảnh Chụp Mobile Light (390x844):** `screenshot_223_mobile_light.png`
- **Ảnh Chụp Mobile Dark (390x844):** `screenshot_223_mobile_dark.png`
