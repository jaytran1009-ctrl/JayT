# BỘ HỒ SƠ HỘI ĐỒNG LIÊN BỘ — JAYT SECTION EM
## THIẾT LẬP SCHEMA ATTEMPT BẮT BUỘC 16 TRƯỜNG, HOÀN CHỈNH CLOSURE PROVENANCE & CHIẾN LƯỢC NGUỒN STATIC-FIRST

**Mã hồ sơ:** `COUNCIL_DECISION_PACK_EM_OBSERVABLE_ACQUISITION_20260830`  
**Phiên bản Staging SOT:** `v3.467.0-staging.em`  
**Chỉ thị chỉ đạo:** JAYT-245 Mục EM (Dòng 3495–3521)  
**Địa chỉ Staging hoạt động:** `http://127.0.0.1:4173/`  
**Endpoint Sức khỏe Hệ thống (Health Check):** `http://127.0.0.1:4173/health` (`HTTP 200 OK`, `status: "UP"`, `dossiers_evaluated_count: 8`, `attempts_recorded_count: 8`, `field_facts_verified_count: 0`)  
**HTTP Status:** `200 OK` (Content-Type: `text/html; charset=utf-8`)  
**Thời gian lập hồ sơ:** 2026-08-30T19:42:00+07:00  
**Trạng thái Quản trị:** `PENDING_CEO_LIVE_REVIEW` (Tiếp tục nâng cấp, không Go-Live)

---

### I. BIÊN BẢN ĐÁNH GIÁ 7 PHÒNG BAN LIÊN BỘ (SECTION EM)

| Phòng ban | Báo cáo hành động thực tế | Trạng thái kỹ thuật |
| :--- | :--- | :---: |
| **1. Product** | **Chuẩn Hóa 8 Hồ Sơ Static-First:** Tập trung 8 candidate có tiềm năng nguồn tĩnh cao (Công báo, điều khoản chính thức, biểu phí dịch vụ công, thông tin tuyến buýt, học bổng số). | **READY_FOR_CEO_REVIEW** |
| **2. Design** | **Giao Diện Trung Thực Tuyệt Đối:** Giữ nguyên không gian tĩnh lặng, không đưa bộ đếm dossier/attempt lên UI làm "deal theatre" hay thương hiệu. | **READY_FOR_CEO_REVIEW** |
| **3. UX/CX** | **Truy Vết Nguồn Đầy Đủ & Nhất Quán:** Toàn bộ 50 card duy trì nhãn minh bạch `dẫn tới cổng chính thức — điều kiện chưa đối soát` và cung cấp đường link trực tiếp tới cổng đơn vị vận hành. | **READY_FOR_CEO_REVIEW** |
| **4. Growth** | **Backlog Truy Vết Nguồn 100%:** Thiết lập liên kết một-một giữa Candidate $leftrightarrow$ Dossier $leftrightarrow$ Attempt $leftrightarrow$ Artifact, giải trình rõ ràng trạng thái đóng của từng nguồn. | **READY_FOR_CEO_REVIEW** |
| **5. Data & Trust** | **Schema Fail-Before-Write 16 Trường Bắt Buộc:** Ban hành `EVIDENCE_MANIFEST_EM.json` với 16 trường không null cho từng attempt (`attempt_id`, `dossier_id`, `candidate_id`, `inquiry_question`, `exact_requested_url`, `final_resolved_url`, `http_status_code`, `subject_match_verdict`, `raw_artifact_ref`, `raw_artifact_sha256`, `observed_at_utc`, `extraction_method`, `closure_status`, `closure_reason`, `retry_eligibility`, `reviewer_decision`). | **READY_FOR_CEO_REVIEW** |
| **6. Engineering** | Đóng gói SOT `jayt_storefront_staging_em.js`, nhúng dấu vân tay Ledger SHA-256 (`c693a785a8...`), duy trì máy chủ Staging `http://127.0.0.1:4173/` và endpoint `/health`, **0 lỗi console error, 0 cảnh báo console warning, 0 tệp JPEG, 0 chuỗi false provenance trong DOM**. | **READY_FOR_CEO_REVIEW** |
| **7. QA** | Kiểm thử **49/49 static contract, 16-field attempt schema & staging availability checks**; audit 16/16 capture proofs độc bản với 16 mã băm SHA-256 riêng biệt; xác nhận 100% focusables $\ge 44\times 44\text{px}$. | **READY_FOR_CEO_REVIEW** |

---

### II. BẢNG TỔNG HỢP 8 ATTEMPTS VỚI FULL 16-FIELD CLOSURE PROVENANCE (EVIDENCE MANIFEST EM)

Theo [`07_QUALITY_ASSURANCE/evidence_vault_em/EVIDENCE_MANIFEST_EM.json`](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/07_QUALITY_ASSURANCE/evidence_vault_em/EVIDENCE_MANIFEST_EM.json):

| Mã Attempt | Mã Dossier | Mã Candidate | Câu Hỏi Khảo Sát | Trạng Thái Đóng (Closure Status) | Lý Do Kỹ Thuật Chi Tiết (Closure Reason) | Tiêu Chuẩn Thử Lại (Retry Eligibility) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **ATTEMPT_EM_01** | DOSSIER_EM_01 | CAND_DANABUS_R16A | *Giá vé trợ giá lượt cho HSSV trên tuyến R16A tại Đà Nẵng?* | `CLOSED_DYNAMIC_SPA_NO_SSR_TERMS` | *Artifact raw byte snapshot chứa portal root danangbus.vn; biểu giá chi tiết 5.000đ chạy qua client-side JS.* | `ELIGIBLE_FOR_STATIC_PDF_OR_BULLETIN_DISCOVERY` |
| **ATTEMPT_EM_02** | DOSSIER_EM_02 | CAND_TNGO_DANANG | *Giá cước mở khóa & thuê xe đạp TNGo Đà Nẵng theo lượt 45 phút?* | `CLOSED_DYNAMIC_SPA_NO_SSR_TERMS` | *HTML chỉ chứa link app download; biểu giá không có trong static byte.* | `ELIGIBLE_FOR_STATIC_PDF_OR_BULLETIN_DISCOVERY` |
| **ATTEMPT_EM_03** | DOSSIER_EM_03 | CAND_DANANG_1022 | *Kênh tiếp nhận phản ánh & tra cứu DVC trực tuyến TP. Đà Nẵng?* | `CLOSED_DYNAMIC_SPA_NO_SSR_TERMS` | *Cổng DVC chính thức; duy trì định danh cổng điều hướng tin cậy.* | `ELIGIBLE_FOR_STATIC_PDF_OR_BULLETIN_DISCOVERY` |
| **ATTEMPT_EM_04** | DOSSIER_EM_04 | CAND_GITHUB_STUDENT_PACK | *Điều kiện xác thực SV & các gói công cụ trong GitHub Student Pack?* | `CLOSED_AUTH_WALL_OR_SESSION_REQUIRED` | *Trang React SPA yêu cầu phiên đăng nhập xác thực tài khoản sinh viên.* | `NON_RETRIABLE_WITHOUT_AUTHENTICATED_SESSION` |
| **ATTEMPT_EM_05** | DOSSIER_EM_05 | CAND_JETBRAINS_STUDENT_PACK | *Thời hạn & điều kiện gia hạn giấy phép JetBrains All Products Pack?* | `CLOSED_DYNAMIC_SPA_NO_SSR_TERMS` | *HTML chứa hub cộng đồng; điều khoản gia hạn nằm ở trang phụ.* | `ELIGIBLE_FOR_STATIC_PDF_OR_BULLETIN_DISCOVERY` |
| **ATTEMPT_EM_06** | DOSSIER_EM_06 | CAND_METIZ_CINEMA | *Khung giờ & điều kiện giá vé U22 thành viên tại Metiz Đà Nẵng?* | `CLOSED_DYNAMIC_SPA_NO_SSR_TERMS` | *Trang chủ không chứa biểu giá chi tiết U22 trong static HTML.* | `ELIGIBLE_FOR_STATIC_PDF_OR_BULLETIN_DISCOVERY` |
| **ATTEMPT_EM_07** | DOSSIER_EM_07 | CAND_STARLIGHT_CINEMA | *Chính sách giá vé HSSV tại Starlight Cinema Đà Nẵng?* | `CLOSED_DYNAMIC_IFRAME_CONTENT` | *Giá vé nhúng qua iframe động từ hệ thống quản lý rạp bên ngoài.* | `ELIGIBLE_FOR_DIRECT_IFRAME_ENDPOINT_DISCOVERY` |
| **ATTEMPT_EM_08** | DOSSIER_EM_08 | CAND_DOMINOS_PIZZA | *Chương trình Mua 1 Tặng 1 Domino's áp dụng vào các ngày nào?* | `CLOSED_DYNAMIC_SPA_NO_SSR_TERMS` | *Điều khoản khuyến mãi yêu cầu tương tác chọn món trong giỏ hàng.* | `ELIGIBLE_FOR_STATIC_PDF_OR_BULLETIN_DISCOVERY` |

---

### III. BẢO ĐẢM KHẢ NĂNG TRUY CẬP STAGING (HEALTH CHECK EM)

Theo [`07_QUALITY_ASSURANCE/staging_em_health_evidence.json`](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/07_QUALITY_ASSURANCE/staging_em_health_evidence.json):

```json
{
  "status": "UP",
  "version": "v3.467.0-staging.em",
  "ledger_sha256": "c693a785a82c9e9a41189eae6e7ecd3d3cbd27bd4f3877d52a10c470eab7eabe",
  "port": 4173,
  "static_dir": "staging_deploy_em",
  "uptime_seconds": 60,
  "dossiers_evaluated_count": 8,
  "attempts_recorded_count": 8,
  "field_facts_verified_count": 0,
  "four_intent_dossiers": {
    "INTENT_PUBLIC_TRANSIT": 3,
    "INTENT_EDUCATION_POLICY": 2,
    "INTENT_CULTURE_LEISURE": 2,
    "INTENT_CULINARY_RETAIL": 1
  },
  "tier_1_deals_count": 0,
  "vouchers_count": 0,
  "quarantined_jpegs_in_runtime": 0
}
```

---

### IV. BỘ 16 BẢN GHI CAPTURE PROOF MỚI (BROWSER PACK EM)

Toàn bộ 16 ảnh chụp kiểm thử tự động tại thời điểm live server hoạt động đạt **16/16 mã băm SHA-256 hoàn toàn riêng biệt**, được lưu trữ tại `07_QUALITY_ASSURANCE/browser_pack_em/`:

1. `00_desktop_1440_visual_slate_proof.png` (175.428 bytes, SHA-256: `2fa8698b0fb844b7...`)
2. `01_desktop_1440_landmark_hero.png` (221.665 bytes, SHA-256: `a1fcf4df68e23fbe...` — **Vector Hero & Đồ họa JayT**)
3. `02_desktop_1440_featured_deals.png` (229.353 bytes, SHA-256: `c96b6089bc6c20f5...`)
4. `03_desktop_1440_culinary_story.png` (133.673 bytes, SHA-256: `e4a781537cdc6d4e...`)
5. `04_desktop_1440_transit_story.png` (173.704 bytes, SHA-256: `6b590b02aed5fa48...`)
6. `05_desktop_1440_leisure_story.png` (146.975 bytes, SHA-256: `70fd6695da03b29c...`)
7. `06_desktop_1440_three_lane_wallet.png` (181.309 bytes, SHA-256: `a4a47df2ae29ee1e...`)
8. `07_desktop_1440_explore_directory.png` (123.805 bytes, SHA-256: `c6d90e0d6c321479...`)
9. `08_desktop_1440_dark_mode.png` (223.367 bytes, SHA-256: `d21f677e109a842a...`)
10. `09_desktop_1440_reduced_motion.png` (213.286 bytes, SHA-256: `1d36b67ee92c73fe...`)
11. `10_tablet_768_modern_bento.png` (161.860 bytes, SHA-256: `b71e261a91b41e8e...`)
12. `11_mobile_390_fresh_load_first_fold.png` (111.197 bytes, SHA-256: `a470231ea4ba4754...`)
13. `12_mobile_390_food_journey_route.png` (51.102 bytes, SHA-256: `e6d3bdc289dddfcb...`)
14. `13_mobile_390_three_lane_wallet.png` (69.212 bytes, SHA-256: `84b5eb62f156f5d4...`)
15. `14_progressive_disclosure_drawer_open.png` (278.908 bytes, SHA-256: `d7c66c9d54fc9a54...`)
16. `15_buy_decision_interactive.png` (73.875 bytes, SHA-256: `dce3095b567b87d1...`)

---

### V. CAM KẾT VẬN HÀNH & HÀNG RÀO AN TOÀN

1. **Khóa phát hành Production:** Tiếp tục duy trì trên Staging local `http://127.0.0.1:4173/`, không phát tán ra production khi chưa có phê duyệt từ CEO.
2. **Không Affiliate write / Zero-PII:** Duy trì 100% không chèn mã affiliate, không thu thập cookie hay secret của người dùng.
3. **Kính trình CEO trực tiếp mở trình duyệt kiểm tra live tại `http://127.0.0.1:4173/` và kiểm tra endpoint `http://127.0.0.1:4173/health` cùng manifest attempt có cấu trúc 16 trường đầy đủ tại `evidence_vault_em/EVIDENCE_MANIFEST_EM.json`.**
