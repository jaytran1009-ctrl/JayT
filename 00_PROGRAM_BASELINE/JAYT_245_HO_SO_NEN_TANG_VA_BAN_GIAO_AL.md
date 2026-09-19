# HỒ SƠ NỀN TẢNG VÀ BÀN GIAO TOÀN DIỆN JAYT (JAYT-245 MỤC AL)

**Tài liệu:** Bàn giao nền tảng & Điểm bắt đầu bắt buộc cho mọi phiên làm việc  
**Thời gian ban hành:** 2026-08-29T01:10:00+07:00  
**Căn cứ pháp lý & kỹ thuật duy nhất:** [JAYT-245 — Tổng Chỉ Thị CEO Duy Nhất Về Vận Hành Và Go-Live JayT (Mục AL)](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/02_CEO_DIRECTIVES/JAYT-245_TONG_CHI_THI_CEO_DUY_NHAT_VAN_HANH_JAYT.md)  
**Tài liệu đọc nhanh cho Chat mới:** [NEW_CHAT_OPERATING_BRIEF_AL.md](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/NEW_CHAT_OPERATING_BRIEF_AL.md)  
**Machine-Readable Registry:** [JAYT_245_PLATFORM_REGISTRY_AL.json](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/00_PROGRAM_BASELINE/JAYT_245_PLATFORM_REGISTRY_AL.json) (15.958 tài sản có mã băm SHA-256)  
**Biên bản Hội đồng 7 Phòng ban:** [COUNCIL_SESSION_JAYT_245_CYCLE_AL_PLATFORM_REGISTRY_AND_HANDOVER_DOSSIER_20260829.md](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/01_EXECUTIVE_COUNCIL/COUNCIL_SESSION_JAYT_245_CYCLE_AL_PLATFORM_REGISTRY_AND_HANDOVER_DOSSIER_20260829.md)  
**Trạng thái Quản trị:** `AL PLATFORM BASELINE & HANDOVER DOSSIER ESTABLISHED — UPGRADE-ONLY CONTRACT ACTIVATED`

---

## 1. Baseline Production Hiện Hành & Biên Nhận Triển Khai

- **Phiên bản Production Live:** `v3.419.0`
- **Địa chỉ Production:** [https://deploy-ten-xi-48.vercel.app](https://deploy-ten-xi-48.vercel.app)
- **Biên nhận Release Parity:** [production_release_receipt_v3419.json](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/07_QUALITY_ASSURANCE/production_release_receipt_v3419.json)
- **Cấu trúc dữ liệu Live (17 mục):**
  * **9 Nguồn chính thức đã thu thập (Tier 2):** GitHub Student Developer Pack, Notion for Education, Microsoft Education, Canva, Spotify, Apple Music, Free JetBrains Student Pack, Figma for Education, AWS Educate (100% đối soát raw HTML, 100% brand/title literal quote, UTF-16 code unit offset chuẩn).
  * **8 Radar theo dõi nguồn (Tier 4):** Metiz Cinema, DanaBus, TNGO, Fahasa, Galaxy Cinema, Domino's Pizza, CGV Cinemas, Đường Sắt VN (VNR) (100% trung thực, 0 giá suy diễn, 0 voucher giả).
- **Trạng thái Khóa Rollback:** Phiên bản `v3.419.0` được khóa làm baseline an toàn; bất kỳ sự cố nào xảy ra trong quá trình phát triển staging đều rollback về `v3.419.0`.

---

## 2. Storefront Staging Đang Chờ CEO Duyệt & Quy Tắc Rollback

- **Phiên bản Staging:** `v3.420.0-staging.ak`
- **Mã nguồn Giao diện Staging:** [jayt_storefront_staging.js](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/03_SOURCE_OF_TRUTH/jayt_storefront_staging.js)
- **Mục tiêu Trải nghiệm Khôi Phục (Section AK):**
  * Khôi phục cảm giác Discovery Storefront ("Hôm nay ở Đà Nẵng có gì đáng khám phá?").
  * Loại bỏ hoàn toàn phong cách "bảng kiểm toán kỹ thuật" khô khan trên mặt trước thẻ.
  * Tách biệt rõ ràng: Mặt trước thẻ thanh lịch, trực quan; Toàn bộ chi tiết kỹ thuật/hash/sha256/bytes được đưa vào **Modal Hồ Sơ Chứng Nhận Nguồn Gốc (Recheck Source Modal)**.
  * Phân cấp thị giác 4 tầng rõ rệt (Tier 2 nổi bật, Tier 4 subtle outline).
- **Quy tắc Quản trị Bắt buộc:** Cấm tự ý deploy `v3.420.0-staging.ak` lên Production trước khi CEO kiểm tra và duyệt trực tiếp trên Staging.

---

## 3. Kiến Trúc Giao Diện, Design System & Hành Trình Người Dùng

- **Cấu trúc Thành phần (Component Tokens):**
  * `jayt-header`: Sticky bar gồm Brand Lockup, Location Tag ("Đà Nẵng"), Nav Tabs, Action "+ Báo nguồn mới".
  * `jayt-hero`: Contextual Header định hướng ngày mới ("Hôm nay ở Đà Nẵng có gì đáng khám phá?").
  * `jayt-collections-rail`: Thanh trượt cuộn ngang gợi ý theo chủ đề ("Gói học tập miễn phí", "Lịch chiếu phim", "Di chuyển đô thị", "Ẩm thực").
  * `jayt-control-bar`: Bộ lọc Quick Category Chips (`Tất cả`, `Học tập`, `Phim`, `Đi lại`, `Ăn trưa`) và Bộ lọc Tầng (`Nguồn chính thức`, `Radar theo dõi`).
  * `jayt-cards-grid`: Lưới thẻ responsive tự động co giãn theo viewport (mobile 1 cột, desktop 3 cột).
  * `jayt-single-modal-root`: Modal Controller đơn nhất, fail-closed, atomic innerHTML wipe, ARIA focus trap.
- **5 Hành Trình Người Dùng Được Kiểm Định:**
  1. *Khám phá trang chủ & nhận diện tầng xác thực.*
  2. *Lọc nhanh theo danh mục nhu cầu & tầng.*
  3. *Tìm kiếm tức thì theo từ khóa.*
  4. *Lưu trữ cục bộ (LocalStorage Bookmark) & xem tab "Đã lưu".*
  5. *Mở Modal "Kiểm tra nguồn" xem chứng từ đối soát độc lập.*

---

## 4. Data Pipeline 4 Tầng & Quy Chuẩn Bằng Chứng

- **Phân Tầng Dữ Liệu Minh Bạch:**
  * **Tầng 1 (`VERIFIED_DEAL`):** Chỉ xuất hiện khi có đầy đủ giá thật, tổng chi phí, điều kiện và thời hạn bind 100%. (Hiện tại: 0 mục — không bịa để đủ số).
  * **Tầng 2 (`VERIFIED_OFFICIAL_PROGRAM`):** Chương trình chính thức có raw bytes HTML, receipt sạch, SHA-256 khớp và per-field binding (Hiện tại: 9 mục).
  * **Tầng 3 (`VERIFIED_PUBLIC_LOCATION`):** Tiện ích địa phương có tên, địa chỉ, giờ hoạt động bind (Hiện tại: Đang thu thập Làn C Đà Nẵng).
  * **Tầng 4 (`RADAR_TRACKING`):** Kênh theo dõi nguồn chính thức, nói rõ "đang theo dõi nguồn", 0 giá suy diễn, 0 voucher giả (Hiện tại: 8 mục).
- **Kho Bằng Chứng Vault Thật (`04_DATA_PIPELINE/real_raw_evidence_vault/`):**
  * 10 file raw HTML nguyên bản bất biến.
  * 10 Capture Receipts đã được xóa sạch (pruned) 100% key và value của header nhạy cảm (`set-cookie`, `authorization`, `token`).
- **Quy Ước Kỹ Thuật Bắt Buộc:** Mọi offset chuỗi phải tuân thủ chuẩn `utf16_code_unit_offset` (`String.indexOf`).

---

## 5. Bảng Cung Ứng 50 Mục Minh Bạch (Daily Supply Board)

- **File Quản Trị:** [daily_50_opportunities_supply_board_aj.json](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/04_DATA_PIPELINE/daily_50_opportunities_supply_board_aj.json)
- **Phân Bổ Hiện Tại (50 Mục):**
  * **Public Live (17 mục):** 9 Chương trình chính thức + 8 Radar theo dõi nguồn.
  * **Staging Queued (33 mục nghiên cứu):** Các cổng dịch vụ công, thư viện, bảo tàng, bệnh viện tại Đà Nẵng và các điểm thiết yếu đời sống đang ở chế độ read-only.
- **Nguyên Tắc Bất Di Bất Dịch:** Không gọi 50 mục là 50 deal. Tỷ lệ deal thật chỉ tăng khi có bằng chứng giá thật.

---

## 6. Trạng Thái Quản Trị Affiliate & Value-First

- **Trạng Thái Pháp Lý:** `PORTAL_ACCESS_NOT_VERIFIED`
- **Quy Tắc Quản Trị Bắt Buộc:**
  * Không dùng thương hiệu mẫu để đại diện cho toàn bộ catalog AccessTrade.
  * Chỉ khi có xác nhận ủy quyền hợp lệ từ CEO mới tiến hành khảo sát toàn bộ catalog ở chế độ read-only.
  * Cấm 100% việc tạo tracking link, đăng ký campaign, dùng API secret hoặc chèn link tiếp thị vào các nguồn công ích/học tập.
  * 0 link affiliate, 0 chiến dịch, 0 CTA thương mại trên toàn bộ hệ thống JayT.

---

## 7. Quy Trình Release, Rollback & Bộ Lệnh QA

- **Lệnh Kiểm Thử Toàn Diện Hệ Thống:**
  ```bash
  # 1. Kiểm tra tính toàn vẹn Platform Registry & cấm import Quarantine
  node 07_QUALITY_ASSURANCE/test_baseline_integrity_gate_al.js

  # 2. Kiểm tra Real Mutation Suite & All-Rendered-Fields Semantic Contract
  node 07_QUALITY_ASSURANCE/test_real_mutation_and_validator_suite.js

  # 3. Kiểm tra Modal Fail-Closed & Focus Trap
  node 07_QUALITY_ASSURANCE/test_browser_modal_flows_and_fail_closed.js

  # 4. Quét sạch bề mặt Affiliate & Legacy Provenance
  node 07_QUALITY_ASSURANCE/test_dormant_affiliate_and_provenance_scanner.js

  # 5. Kiểm tra 5 Hành Trình Người Dùng Trên Storefront Staging
  node scratch/test_storefront_5_journeys_ak.js
  ```
- **Quy Trình Triển Khai (Upgrade-Only):**
  1. Kiểm tra toàn bộ 5 QA Gates $	o$ Phải đạt 100% PASS.
  2. Nộp Biên bản Hội đồng 7 Phòng ban & Handover Dossier cho CEO.
  3. Chờ CEO kiểm toán độc lập trên local và live staging.
  4. Chỉ deploy production khi có phê duyệt rõ ràng từ CEO.

---

## 8. Danh Mục Tài Sản Cách Ly (Quarantine) & Cấm Khôi Phục

- **Thư Mục Cách Ly:** `09_CONTAINMENT_QUARANTINE_NON_SERVED/` và các artifact AC cũ (`04_DATA_PIPELINE/raw_capture_20260829_002300/`).
- **Lý Do Cách Ly:** Lỗi timestamp tương lai (01:03), thiếu receipt HTTP gốc, payload snippet giả lập không có raw bytes.
- **Quy Định Nghiêm Ngặt:** **Tuyệt đối cấm import, phục hồi hoặc đưa bất kỳ tài sản nào trong vùng cách ly ra public build.**

---

## 9. Lịch Sử Quyết Định CEO Còn Hiệu Lực & Danh Mục Việc Mở

| Hạng Mục | Lãnh Đạo Chịu Trách Nhiệm | Tình Trạng Hiện Tại | Bằng Chứng Cần CEO Kiểm Tra |
|---|---|---|---|
| **Platform Baseline AL** | Chief Architect | **Hoàn thành** | `JAYT_245_PLATFORM_REGISTRY_AL.json` & `JAYT_245_HO_SO_NEN_TANG_VA_BAN_GIAO_AL.md` |
| **Storefront Staging AK** | UX/CX Lead & Head of Design | **Sẵn sàng chờ duyệt** | `jayt_storefront_staging.js` & Kết quả 5 user journeys |
| **Acquisition Làn C** | Chief Data Officer | **Đang thu thập read-only** | 10 raw HTML files trong Vault (Cổng thông tin ĐN 621.6 KB) |
| **Affiliate M3** | Growth Lead | **Giữ nguyên Read-Only Plan** | Công bố `PORTAL_ACCESS_NOT_VERIFIED` |
