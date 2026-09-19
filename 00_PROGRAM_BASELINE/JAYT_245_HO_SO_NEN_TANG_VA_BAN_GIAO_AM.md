# HỒ SƠ NỀN TẢNG VÀ BÀN GIAO TOÀN DIỆN JAYT (JAYT-245 MỤC AM)

**Tài liệu:** Bàn giao nền tảng & Điểm bắt đầu bắt buộc cho mọi phiên làm việc  
**Thời gian ban hành:** 2026-08-29T01:14:00+07:00  
**Căn cứ pháp lý & kỹ thuật duy nhất:** [JAYT-245 — Tổng Chỉ Thị CEO Duy Nhất Về Vận Hành Và Go-Live JayT (Mục AM)](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/02_CEO_DIRECTIVES/JAYT-245_TONG_CHI_THI_CEO_DUY_NHAT_VAN_HANH_JAYT.md)  
**Tài liệu đọc nhanh cho Chat mới:** [NEW_CHAT_OPERATING_BRIEF_AM.md](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/NEW_CHAT_OPERATING_BRIEF_AM.md)  
**Core Baseline Manifest:** [CORE_BASELINE_MANIFEST_AM.json](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/00_PROGRAM_BASELINE/CORE_BASELINE_MANIFEST_AM.json)  
**Machine-Readable Registry:** [JAYT_245_PLATFORM_REGISTRY_AM.json](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/00_PROGRAM_BASELINE/JAYT_245_PLATFORM_REGISTRY_AM.json)  
**Platform Verifier Engine:** [platform_verifier_engine.js](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/07_QUALITY_ASSURANCE/platform_verifier_engine.js)  
**Biên bản Hội đồng 7 Phòng ban:** [COUNCIL_SESSION_JAYT_245_CYCLE_AM_ATOMIC_REGISTRY_RECONCILIATION_20260829.md](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/01_EXECUTIVE_COUNCIL/COUNCIL_SESSION_JAYT_245_CYCLE_AM_ATOMIC_REGISTRY_RECONCILIATION_20260829.md)  
**Trạng thái Quản trị:** `AM ATOMIC REGISTRY RECONCILIATION & DUAL-TIER MANIFEST — VERIFIED 100%`

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

## 3. Kiến Trúc Hai Cấp: Core Manifest & Full Registry

- **Cấp 1 — Core Baseline Manifest AM (`CORE_BASELINE_MANIFEST_AM.json`):**
  * Danh mục gọn nhẹ chứa toàn bộ các tài sản quyết định (production, staging, UI tokens, 4-tier pipeline, vault manifests, verifier gates, operating briefs).
  * Điểm bắt đầu đọc cho mọi chat mới.
- **Cấp 2 — Full Platform Registry AM (`JAYT_245_PLATFORM_REGISTRY_AM.json`):**
  * Tra cứu đầy đủ các tài sản phụ trợ và phân định 9 nhóm vòng đời (`production`, `staging`, `source-of-truth`, `evidence-vault`, `data-pipeline`, `quarantine`, `archive`, `tooling`, `governance`, `directive`).

---

## 4. Mutable Memory Snapshot Protocol

- `PROJECT_MEMORY.md` là nhật ký append-only, có `snapshot_hash` được ghi nhận rõ ràng trong Registry AM.
- Mọi cập nhật memory đều thực hiện qua giao dịch append-only có idempotency và cập nhật snapshot hash tương ứng.

---

## 5. Quy Trình Release, Rollback & Bộ Lệnh QA

- **Lệnh Kiểm Thử Toàn Diện Hệ Thống:**
  ```bash
  # 1. Chạy Verifier Engine AM & Real Mutation Suite
  node 07_QUALITY_ASSURANCE/test_platform_verifier_and_mutation_suite_am.js

  # 2. Kiểm tra Real Mutation Suite & All-Rendered-Fields Semantic Contract
  node 07_QUALITY_ASSURANCE/test_real_mutation_and_validator_suite.js

  # 3. Kiểm tra Modal Fail-Closed & Focus Trap
  node 07_QUALITY_ASSURANCE/test_browser_modal_flows_and_fail_closed.js

  # 4. Quét sạch bề mặt Affiliate & Legacy Provenance
  node 07_QUALITY_ASSURANCE/test_dormant_affiliate_and_provenance_scanner.js

  # 5. Kiểm tra 5 Hành Trình Người Dùng Trên Storefront Staging
  node 07_QUALITY_ASSURANCE/test_storefront_5_journeys_ak.js
  ```
