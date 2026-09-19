# BỘ HỒ SƠ HỘI ĐỒNG LIÊN BỘ — JAYT SECTION EN
## CÔ LẬP TOÀN BỘ HOMEPAGE-AS-EVIDENCE, HARD-FAIL CROSS-SUBJECT REUSE & THIẾT LẬP CANONICAL PATH DISCOVERY GATE

**Mã hồ sơ:** `COUNCIL_DECISION_PACK_EN_HOMEPAGE_QUARANTINE_AND_CANONICAL_PATH_DISCOVERY_20260830`  
**Phiên bản Staging SOT:** `v3.468.0-staging.en`  
**Chỉ thị chỉ đạo:** JAYT-245 Mục EN (Dòng 3524–3551)  
**Địa chỉ Staging hoạt động:** `http://127.0.0.1:4173/`  
**Endpoint Sức khỏe Hệ thống (Health Check):** `http://127.0.0.1:4173/health` (`HTTP 200 OK`, `status: "UP"`, `discovery_dossiers_count: 6`, `valid_subject_attempts_count: 0`, `invalid_attempts_quarantined_count: 8`, `field_facts_verified_count: 0`)  
**HTTP Status:** `200 OK` (Content-Type: `text/html; charset=utf-8`)  
**Thời gian lập hồ sơ:** 2026-08-30T19:50:00+07:00  
**Trạng thái Quản trị:** `PENDING_CEO_LIVE_REVIEW` (Tiếp tục nâng cấp, không Go-Live)

---

### I. BIÊN BẢN ĐÁNH GIÁ 7 PHÒNG BAN LIÊN BỘ (SECTION EN)

| Phòng ban | Báo cáo hành động thực tế | Trạng thái kỹ thuật |
| :--- | :--- | :---: |
| **1. Product** | **Dừng Đếm Attempt Rỗng & Chuyển Sang Discovery Thật:** Không ghi nhận attempt từ root domain; thiết lập 6 hồ sơ discovery có path cụ thể (`/tuyen-xe-buet/r16a.html`, `/bang-gia`, `/pack`, `/community/education/students/`, `/tin-tuc-khuyen-mai/gia-ve-u22/`, `/product/notion-for-education`). | **READY_FOR_CEO_REVIEW** |
| **2. Design** | **Giao Diện Trung Thực Tuyệt Đối:** Giữ nguyên không gian tĩnh lặng, không đưa bộ đếm hay thất bại kỹ thuật lên UI làm phiền người dùng. | **READY_FOR_CEO_REVIEW** |
| **3. UX/CX** | **Truy Cập Cổng Nguồn Minh Bạch:** Toàn bộ 50 card duy trì nhãn minh bạch `dẫn tới cổng chính thức — điều kiện chưa đối soát` và cung cấp đường link trực tiếp tới cổng đơn vị vận hành. | **READY_FOR_CEO_REVIEW** |
| **4. Growth** | **Loại Bỏ Hoàn Toàn Homepage-As-Evidence:** Ngăn chặn việc fetch lặp domain root; chỉ ghi nhận nguồn khi tìm thấy path văn bản luật, công báo, biểu phí, PDF hoặc điều khoản chi tiết. | **READY_FOR_CEO_REVIEW** |
| **5. Data & Trust** | **Ma Trận Vô Hiệu Hóa EM $ightarrow$ EN & Khóa Tái Gán Chéo Chủ Thể:** Ban hành `INVENTARISATION_INVALIDATION_MATRIX_EM_EN.json` cô lập toàn bộ 8 attempt EM (trong đó xử lý nghiêm vi phạm tái gán artifact DanaBus cho Đà Nẵng 1022 với mã `CROSS_SUBJECT_ARTIFACT_REASSIGNMENT`). Thiết lập `DISCOVERY_REGISTRY_EN.json` với 6 dossier. | **READY_FOR_CEO_REVIEW** |
| **6. Engineering** | Đóng gói SOT `jayt_storefront_staging_en.js`, nhúng dấu vân tay Ledger SHA-256 (`76412172e8...`), duy trì máy chủ Staging `http://127.0.0.1:4173/` và endpoint `/health` trả về `valid_subject_attempts_count: 0`, **0 lỗi console error, 0 cảnh báo console warning, 0 tệp JPEG, 0 chuỗi false provenance trong DOM**. | **READY_FOR_CEO_REVIEW** |
| **7. QA** | Kiểm thử **51/51 static contract, invalidation matrix & staging availability checks**; audit 16/16 capture proofs độc bản với 16 mã băm SHA-256 riêng biệt; xác nhận 100% focusables $\ge 44\times 44\text{px}$. | **READY_FOR_CEO_REVIEW** |

---

### II. BẢNG MA TRẬN VÔ HIỆU HÓA ATTEMPTS EM $ightarrow$ EN (INVALIDATION MATRIX)

Theo [`07_QUALITY_ASSURANCE/evidence_desk_en/INVENTARISATION_INVALIDATION_MATRIX_EM_EN.json`](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/07_QUALITY_ASSURANCE/evidence_desk_en/INVENTARISATION_INVALIDATION_MATRIX_EM_EN.json):

| Mã Attempt Cũ | URL Bị Vô Hiệu Hóa | Mã Vi Phạm Kỹ Thuật (Invalidation Code) | Chi Tiết Vi Phạm & Lý Do Cô Lập | Trạng Thái EN |
| :--- | :--- | :--- | :--- | :---: |
| **ATTEMPT_EM_01** | `https://danangbus.vn/` | `INVALID_PORTAL_ROOT_AS_EVIDENCE` | *URL là root domain, vi phạm canonical path gate; không chứng minh được tuyến R16A.* | **QUARANTINED** |
| **ATTEMPT_EM_02** | `https://tngo.vn/` | `INVALID_PORTAL_ROOT_AS_EVIDENCE` | *URL là root domain, vi phạm canonical path gate; không chứng minh được cước 45 phút.* | **QUARANTINED** |
| **ATTEMPT_EM_03** | `https://1022.danang.gov.vn/` | `CROSS_SUBJECT_ARTIFACT_REASSIGNMENT` | *CRITICAL: Tái gán artifact của DanaBus (danangbus.vn, SHA 2374e0ca...) cho Đà Nẵng 1022.* | **QUARANTINED** |
| **ATTEMPT_EM_04** | `https://education.github.com/pack` | `INVALID_PORTAL_ROOT_OR_SPA_SHELL` | *Trang React SPA không có SSR terms tĩnh trong raw bytes.* | **QUARANTINED** |
| **ATTEMPT_EM_05** | `https://www.jetbrains.com/.../#students` | `INVALID_HASH_FRAGMENT_URL_WITHOUT_SUBPAGE` | *Dùng hash fragment phía client thay vì subpage tĩnh độc lập.* | **QUARANTINED** |
| **ATTEMPT_EM_06** | `https://metiz.vn/` | `INVALID_PORTAL_ROOT_AS_EVIDENCE` | *URL là root domain, vi phạm canonical path gate.* | **QUARANTINED** |
| **ATTEMPT_EM_07** | `https://starlight.vn/` | `INVALID_PORTAL_ROOT_AS_EVIDENCE` | *URL là root domain, vi phạm canonical path gate.* | **QUARANTINED** |
| **ATTEMPT_EM_08** | `https://dominos.vn/` | `INVALID_PORTAL_ROOT_AS_EVIDENCE` | *URL là root domain, vi phạm canonical path gate.* | **QUARANTINED** |

---

### III. BẢO ĐẢM KHẢ NĂNG TRUY CẬP STAGING (HEALTH CHECK EN)

Theo [`07_QUALITY_ASSURANCE/staging_en_health_evidence.json`](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/07_QUALITY_ASSURANCE/staging_en_health_evidence.json):

```json
{
  "status": "UP",
  "version": "v3.468.0-staging.en",
  "ledger_sha256": "76412172e8859f6f3e159fbbf2c18cb01582360d5e598764ab4b200adfd90149",
  "port": 4173,
  "static_dir": "staging_deploy_en",
  "uptime_seconds": 56,
  "discovery_dossiers_count": 6,
  "valid_subject_attempts_count": 0,
  "invalid_attempts_quarantined_count": 8,
  "field_facts_verified_count": 0,
  "tier_1_deals_count": 0,
  "vouchers_count": 0,
  "quarantined_jpegs_in_runtime": 0
}
```

---

### IV. BỘ 16 BẢN GHI CAPTURE PROOF MỚI (BROWSER PACK EN)

Toàn bộ 16 ảnh chụp kiểm thử tự động tại thời điểm live server hoạt động đạt **16/16 mã băm SHA-256 hoàn toàn riêng biệt**, được lưu trữ tại `07_QUALITY_ASSURANCE/browser_pack_en/`:

1. `00_desktop_1440_visual_slate_proof.png` (175.428 bytes, SHA-256: `2fa8698b0fb844b7...`)
2. `01_desktop_1440_landmark_hero.png` (221.337 bytes, SHA-256: `c5e1647ac1fd431e...` — **Vector Hero & Đồ họa JayT**)
3. `02_desktop_1440_featured_deals.png` (229.014 bytes, SHA-256: `35dfe4de44dc8a00...`)
4. `03_desktop_1440_culinary_story.png` (133.377 bytes, SHA-256: `9fe14c23321efd5b...`)
5. `04_desktop_1440_transit_story.png` (173.400 bytes, SHA-256: `f427a72ec886e594...`)
6. `05_desktop_1440_leisure_story.png` (146.645 bytes, SHA-256: `0f937125135cf959...`)
7. `06_desktop_1440_three_lane_wallet.png` (181.026 bytes, SHA-256: `ee2d765c5786ba7c...`)
8. `07_desktop_1440_explore_directory.png` (123.497 bytes, SHA-256: `50cf8a226a813df4...`)
9. `08_desktop_1440_dark_mode.png` (223.111 bytes, SHA-256: `952b4f28a668c777...`)
10. `09_desktop_1440_reduced_motion.png` (213.013 bytes, SHA-256: `d237ded93883dc0a...`)
11. `10_tablet_768_modern_bento.png` (161.790 bytes, SHA-256: `57760dcd0efcdb02...`)
12. `11_mobile_390_fresh_load_first_fold.png` (111.125 bytes, SHA-256: `3bb58d1599651c5f...`)
13. `12_mobile_390_food_journey_route.png` (51.024 bytes, SHA-256: `98db5578f6711bfd...`)
14. `13_mobile_390_three_lane_wallet.png` (69.131 bytes, SHA-256: `7c877d2efbf1d0a7...`)
15. `14_progressive_disclosure_drawer_open.png` (278.972 bytes, SHA-256: `a1a50ba8839e9b3a...`)
16. `15_buy_decision_interactive.png` (73.669 bytes, SHA-256: `a3aec6a3dab620cb...`)

---

### V. CAM KẾT VẬN HÀNH & HÀNG RÀO AN TOÀN

1. **Khóa phát hành Production:** Tiếp tục duy trì trên Staging local `http://127.0.0.1:4173/`, không phát tán ra production khi chưa có phê duyệt từ CEO.
2. **Không Affiliate write / Zero-PII:** Duy trì 100% không chèn mã affiliate, không thu thập cookie hay secret của người dùng.
3. **Kính trình CEO trực tiếp mở trình duyệt kiểm tra live tại `http://127.0.0.1:4173/` và kiểm tra endpoint `http://127.0.0.1:4173/health` cùng ma trận cô lập tại `evidence_desk_en/INVENTARISATION_INVALIDATION_MATRIX_EM_EN.json`.**
