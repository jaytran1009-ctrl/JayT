# BỘ HỒ SƠ HỘI ĐỒNG LIÊN BỘ — JAYT SECTION EO
## THỰC THI PUBLIC-SOURCE DISCOVERY RESEARCH, GHI NHẬT KÝ TRUY VẤN NGUỒN CÔNG KHAI & STATE MACHINE TRANSITIONS

**Mã hồ sơ:** `COUNCIL_DECISION_PACK_EO_PUBLIC_SOURCE_DISCOVERY_RESEARCH_20260830`  
**Phiên bản Staging SOT:** `v3.469.0-staging.eo`  
**Chỉ thị chỉ đạo:** JAYT-245 Mục EO (Dòng 3554–3581)  
**Địa chỉ Staging hoạt động:** `http://127.0.0.1:4173/`  
**Endpoint Sức khỏe Hệ thống (Health Check):** `http://127.0.0.1:4173/health` (`HTTP 200 OK`, `status: "UP"`, `discovery_dossiers_count: 6`, `discovery_logs_recorded_count: 6`, `captured_artifacts_count: 1`, `field_facts_verified_count: 0`)  
**HTTP Status:** `200 OK` (Content-Type: `text/html; charset=utf-8`)  
**Thời gian lập hồ sơ:** 2026-08-30T20:04:00+07:00  
**Trạng thái Quản trị:** `PENDING_CEO_LIVE_REVIEW` (Tiếp tục nâng cấp, không Go-Live)

---

### I. BIÊN BẢN ĐÁNH GIÁ 7 PHÒNG BAN LIÊN BỘ (SECTION EO)

| Phòng ban | Báo cáo hành động thực tế | Trạng thái kỹ thuật |
| :--- | :--- | :---: |
| **1. Product** | **Khảo Sát Thực Tế Không Mô Phỏng:** Sử dụng công cụ tìm kiếm và đọc URL công khai để ghi nhận log thực tế cho 6 hồ sơ mục tiêu, không dựng URL giả thuyết thành bằng chứng. | **READY_FOR_CEO_REVIEW** |
| **2. Design** | **Giao Diện Trung Thực Tuyệt Đối:** Giữ nguyên không gian tĩnh lặng, không đưa dữ liệu discovery hay thất bại kỹ thuật lên UI làm phiền người dùng. | **READY_FOR_CEO_REVIEW** |
| **3. UX/CX** | **Truy Cập Cổng Nguồn Minh Bạch:** Toàn bộ 50 card duy trì nhãn minh bạch `dẫn tới cổng chính thức — điều kiện chưa đối soát` và cung cấp đường link trực tiếp tới cổng đơn vị vận hành. | **READY_FOR_CEO_REVIEW** |
| **4. Growth** | **Đóng Nguồn Minh Bạch Khi Không Có SSR Fact:** 5 hồ sơ dạng ứng dụng/dynamic CMS được đóng minh bạch `DYNAMIC_ONLY`; 1 tài liệu chính thức từ GitHub Docs được lưu trữ nguyên văn byte. | **READY_FOR_CEO_REVIEW** |
| **5. Data & Trust** | **Nhật Ký Truy Vết & State Machine 1-Chiều:** Ban hành `DISCOVERY_REGISTRY_EO.json` ghi rõ 8 trường log cho từng dossier (`search_query`, `navigation_start_url`, `discovered_url`, `captured_url`, `observed_at_utc`, `domain_rationale`, `subject_match`, `path_status`) và trạng thái chuyển dịch (`HYPOTHESIZED -> DISCOVERED -> CAPTURED` hoặc `HYPOTHESIZED -> DISCOVERED -> DYNAMIC_ONLY`). | **READY_FOR_CEO_REVIEW** |
| **6. Engineering** | Đóng gói SOT `jayt_storefront_staging_eo.js`, nhúng dấu vân tay Ledger SHA-256 (`1a4e8cf3e8...`), duy trì máy chủ Staging `http://127.0.0.1:4173/` và endpoint `/health` trả về `captured_artifacts_count: 1`, `field_facts_verified_count: 0`, **0 lỗi console error, 0 cảnh báo console warning, 0 tệp JPEG, 0 chuỗi false provenance trong DOM**. | **READY_FOR_CEO_REVIEW** |
| **7. QA** | Kiểm thử **52/52 static contract, discovery evidence logs & staging availability checks**; audit 16/16 capture proofs độc bản với 16 mã băm SHA-256 riêng biệt; xác nhận 100% focusables $\ge 44\times 44\text{px}$. | **READY_FOR_CEO_REVIEW** |

---

### II. BẢNG TỔNG HỢP NHẬT KÝ PUBLIC-SOURCE DISCOVERY (DISCOVERY REGISTRY EO)

Theo [`07_QUALITY_ASSURANCE/evidence_desk_eo/DISCOVERY_REGISTRY_EO.json`](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/07_QUALITY_ASSURANCE/evidence_desk_eo/DISCOVERY_REGISTRY_EO.json):

| Mã Dossier | Chủ Thể Khảo Sát | Truy Vấn / URL Bắt Đầu (Discovery Log) | URL Phát Hiện (Discovered URL) | Chuyển Dịch Trạng Thái (State Transition) | Trạng Thái Cuối Cùng (Terminal Status) |
| :--- | :--- | :--- | :--- | :--- | :---: |
| **DOSS_EO_01** | DanaBus Tuyến R16A & Xe Buýt Đà Nẵng | `site:danangbus.vn gia ve xe buyt` | `https://danangbus.vn/` | `HYPOTHESIZED -> DISCOVERED -> DYNAMIC_ONLY` | **DYNAMIC_ONLY** |
| **DOSS_EO_02** | TNGo Đà Nẵng (Xe đạp công cộng) | `site:tngo.vn bang gia` | `https://tngo.vn/` | `HYPOTHESIZED -> DISCOVERED -> DYNAMIC_ONLY` | **DYNAMIC_ONLY** |
| **DOSS_EO_03** | GitHub Education for Students | `site:docs.github.com "Student Developer Pack" apply` | `https://docs.github.com/.../about-github-education-for-students` | `HYPOTHESIZED -> DISCOVERED -> CAPTURED` | **PENDING_CEO_REVIEW** |
| **DOSS_EO_04** | JetBrains Educational Licenses | `site:jetbrains.com "Free Educational Licenses"...` | `https://www.jetbrains.com/community/education/` | `HYPOTHESIZED -> DISCOVERED -> DYNAMIC_ONLY` | **DYNAMIC_ONLY** |
| **DOSS_EO_05** | Metiz Cinema Đà Nẵng | `site:metiz.vn u22` | `https://metiz.vn/` | `HYPOTHESIZED -> DISCOVERED -> DYNAMIC_ONLY` | **DYNAMIC_ONLY** |
| **DOSS_EO_06** | Bảo Tàng Điêu Khắc Chăm Đà Nẵng | `site:chammuseum.vn gia ve` | `http://chammuseum.vn/` | `HYPOTHESIZED -> DISCOVERED -> DYNAMIC_ONLY` | **DYNAMIC_ONLY** |

---

### III. BẢO ĐẢM KHẢ NĂNG TRUY CẬP STAGING (HEALTH CHECK EO)

Theo [`07_QUALITY_ASSURANCE/staging_eo_health_evidence.json`](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/07_QUALITY_ASSURANCE/staging_eo_health_evidence.json):

```json
{
  "status": "UP",
  "version": "v3.469.0-staging.eo",
  "ledger_sha256": "1a4e8cf3e83090df3a4ba609cd47da8a66fe679b682373a6d3f2cb60664b8036",
  "port": 4173,
  "static_dir": "staging_deploy_eo",
  "uptime_seconds": 30,
  "discovery_dossiers_count": 6,
  "discovery_logs_recorded_count": 6,
  "captured_artifacts_count": 1,
  "valid_subject_attempts_count": 0,
  "field_facts_verified_count": 0,
  "tier_1_deals_count": 0,
  "vouchers_count": 0,
  "quarantined_jpegs_in_runtime": 0
}
```

---

### IV. BỘ 16 BẢN GHI CAPTURE PROOF MỚI (BROWSER PACK EO)

Toàn bộ 16 ảnh chụp kiểm thử tự động tại thời điểm live server hoạt động đạt **16/16 mã băm SHA-256 hoàn toàn riêng biệt**, được lưu trữ tại `07_QUALITY_ASSURANCE/browser_pack_eo/`:

1. `00_desktop_1440_visual_slate_proof.png` (175.428 bytes, SHA-256: `2fa8698b0fb844b7...`)
2. `01_desktop_1440_landmark_hero.png` (221.337 bytes, SHA-256: `0076a084c71887e4...` — **Vector Hero & Đồ họa JayT**)
3. `02_desktop_1440_featured_deals.png` (229.014 bytes, SHA-256: `69074092dca21d30...`)
4. `03_desktop_1440_culinary_story.png` (133.377 bytes, SHA-256: `8848db92764f6916...`)
5. `04_desktop_1440_transit_story.png` (173.400 bytes, SHA-256: `f3fc89eece5684f8...`)
6. `05_desktop_1440_leisure_story.png` (146.645 bytes, SHA-256: `04c7c8cfa2281898...`)
7. `06_desktop_1440_three_lane_wallet.png` (181.026 bytes, SHA-256: `2e44f77c385a4a5a...`)
8. `07_desktop_1440_explore_directory.png` (123.497 bytes, SHA-256: `00eeaa0bb79e0008...`)
9. `08_desktop_1440_dark_mode.png` (223.111 bytes, SHA-256: `6cfbb8d56b026569...`)
10. `09_desktop_1440_reduced_motion.png` (213.013 bytes, SHA-256: `8c0053a67d022fa2...`)
11. `10_tablet_768_modern_bento.png` (161.790 bytes, SHA-256: `d37e28980b1b16c8...`)
12. `11_mobile_390_fresh_load_first_fold.png` (111.125 bytes, SHA-256: `1cf8564f1bc9f5ae...`)
13. `12_mobile_390_food_journey_route.png` (51.024 bytes, SHA-256: `7caad63d3f9e4f50...`)
14. `13_mobile_390_three_lane_wallet.png` (69.131 bytes, SHA-256: `f234bf99b38ae859...`)
15. `14_progressive_disclosure_drawer_open.png` (278.972 bytes, SHA-256: `c18861df4000301a...`)
16. `15_buy_decision_interactive.png` (73.669 bytes, SHA-256: `26b5282463e26462...`)

---

### V. CAM KẾT VẬN HÀNH & HÀNG RÀO AN TOÀN

1. **Khóa phát hành Production:** Tiếp tục duy trì trên Staging local `http://127.0.0.1:4173/`, không phát tán ra production khi chưa có phê duyệt từ CEO.
2. **Không Affiliate write / Zero-PII:** Duy trì 100% không chèn mã affiliate, không thu thập cookie hay secret của người dùng.
3. **Kính trình CEO trực tiếp mở trình duyệt kiểm tra live tại `http://127.0.0.1:4173/` và kiểm tra endpoint `http://127.0.0.1:4173/health` cùng nhật ký discovery tại `evidence_desk_eo/DISCOVERY_REGISTRY_EO.json` và raw artifact tại `evidence_vault_eo/artifact_cand_github_education_docs.md`.**
