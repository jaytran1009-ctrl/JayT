# BỘ HỒ SƠ HỘI ĐỒNG LIÊN BỘ — JAYT SECTION EP
## THỰC THI CITATION PACK GITHUB DOCS, BIÊN NHẬN HTTP CAPTURE BẤT BIẾN, HỒ SƠ 12 ĐIỂM CHỨNG MINH & LÀM SẠCH NARRATIVE ĐỘNG

**Mã hồ sơ:** `COUNCIL_DECISION_PACK_EP_CITATION_PACK_AND_PROPOSED_FACTS_20260830`  
**Phiên bản Staging SOT:** `v3.470.0-staging.ep`  
**Chỉ thị chỉ đạo:** JAYT-245 Mục EP (Dòng 3584–3612)  
**Địa chỉ Staging hoạt động:** `http://127.0.0.1:4173/`  
**Endpoint Sức khỏe Hệ thống (Health Check):** `http://127.0.0.1:4173/health` (`HTTP 200 OK`, `status: "UP"`, `discovery_dossiers_count: 6`, `captured_artifacts_with_receipt_count: 1`, `evaluated_citation_facts_count: 2`, `github_capture_receipt_valid: true`, `field_facts_verified_count: 0`)  
**HTTP Status:** `200 OK` (Content-Type: `text/html; charset=utf-8`)  
**Thời gian lập hồ sơ:** 2026-08-30T20:27:00+07:00  
**Trạng thái Quản trị:** `PENDING_CEO_LIVE_REVIEW` (Tiếp tục nâng cấp, không Go-Live)

---

### I. BIÊN BẢN ĐÁNH GIÁ 7 PHÒNG BAN LIÊN BỘ (SECTION EP)

| Phòng ban | Báo cáo hành động thực tế | Trạng thái kỹ thuật |
| :--- | :--- | :---: |
| **1. Product** | **Phân Biệt Rõ Phạm Vi Đối Tượng:** Định danh chính xác GitHub Education là chương trình toàn cầu dành cho học sinh, sinh viên hoặc giảng viên tại các cơ sở giáo dục được công nhận; quyền lợi Copilot chỉ dành cho sinh viên đã hoàn tất xác minh (verified students), không suy diễn cấp mặc định cho mọi sinh viên. | **READY_FOR_CEO_REVIEW** |
| **2. Design** | **Giữ Nguyên Giao Diện Trung Thực:** Không tạo banner hay badge "đã có ưu đãi" khi chưa có phê duyệt; toàn bộ card portal duy trì nhãn dẫn nguồn và tự kiểm tra điều kiện. | **READY_FOR_CEO_REVIEW** |
| **3. UX/CX** | **Truy Cập Nguồn Minh Bạch:** 50 card trên Storefront tiếp tục giữ nhãn `dẫn tới cổng chính thức — điều kiện chưa đối soát`; cung cấp đường dẫn trực tiếp tới cổng chính thức của đơn vị vận hành. | **READY_FOR_CEO_REVIEW** |
| **4. Growth** | **Làm Sạch Narrative Động:** Gỡ bỏ toàn bộ số tiền, mức giảm, quyền lợi chưa có chứng thư khỏi 5 hồ sơ dynamic; chuyển trạng thái sang `DYNAMIC_ONLY_QUEUE_STATIC_POLICY_DISCOVERY`. | **READY_FOR_CEO_REVIEW** |
| **5. Data & Trust** | **Biên Nhận Capture Bất Biến & Fact Record 12 Điểm:** Thu thập `artifact_cand_github_education_docs_v2.md` kèm `artifact_cand_github_education_docs_v2_receipt.json` (ghi rõ HTTP 200, response headers, SHA-256 `87231e...`, verbatim quote match 100%). Cấu trúc 2 Fact Record T2 với đầy đủ 12 trường chứng minh; duy trì `public_display_allowed: false` chờ CEO raw-review. | **READY_FOR_CEO_REVIEW** |
| **6. Engineering** | Đóng gói SOT `jayt_storefront_staging_ep.js`, nhúng dấu vân tay Ledger SHA-256 (`4d558b2e9a...`), duy trì máy chủ Staging `http://127.0.0.1:4173/` và endpoint `/health` trả về `evaluated_citation_facts_count: 2`, `field_facts_verified_count: 0`, **0 lỗi console error, 0 cảnh báo console warning, 0 tệp JPEG, 0 chuỗi false provenance trong DOM**. | **READY_FOR_CEO_REVIEW** |
| **7. QA** | Kiểm thử **60/60 static contract, citation pack, negative tests & staging availability checks** (bao gồm phát hiện hash sai lệch, quote giả mạo, redirect không hợp lệ); audit 16/16 capture proofs độc bản với 16 mã băm SHA-256 riêng biệt; xác nhận 100% focusables $\ge 44\times 44\text{px}$. | **READY_FOR_CEO_REVIEW** |

---

### II. BẢNG TỔNG HỢP CITATION PACK & FACT RECORD 12 ĐIỂM ĐỀ XUẤT (PROPOSED FACTS EP)

Theo [`07_QUALITY_ASSURANCE/evidence_desk_ep/PROPOSED_FACTS_REGISTRY_EP.json`](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/07_QUALITY_ASSURANCE/evidence_desk_ep/PROPOSED_FACTS_REGISTRY_EP.json):

#### 1. Fact 1: Điều Kiện & Phạm Vi Nộp Đơn GitHub Education
- **Fact ID:** `FACT_EP_01_GITHUB_EDUCATION_APPLICATION`
- **Candidate / Public Item:** `CAND_GITHUB_STUDENT_PACK` / `PROG_GITHUB_STUDENT`
- **Tier:** `T2_PROGRAM_OFFICIAL`
- **Exact Final URL:** `https://docs.github.com/en/education/about-github-education/github-education-for-students/about-github-education-for-students`
- **Artifact ID & SHA-256:** `ARTIFACT_GITHUB_EDUCATION_DOCS_V2` / `87231e1139b8a4a5c8979ec0cfb44cd5566064f6c843b311857df51fadec5e26`
- **Field Name:** `GITHUB_EDUCATION_ELIGIBILITY_SCOPE`
- **Field Value:** "Học sinh, sinh viên hoặc giảng viên tại các cơ sở giáo dục được công nhận có thể nộp đơn đăng ký GitHub Education để tiếp cận các quyền lợi giáo dục tập trung."
- **Verbatim Quote:** *"As a student or faculty member at an accredited educational institution, you can apply for GitHub Education. GitHub Education is a portal that allows the GitHub Education Community to access their education benefits—all in one place!"*
- **Locator Replay:** Section 'About GitHub Education for students' -> Paragraph 2 (Lines 13-14)
- **Subject / Geography Scope:** Toàn cầu & Sinh viên tại các cơ sở giáo dục được công nhận tại Đà Nẵng
- **Eligibility / Conditions:** Phải là học sinh, sinh viên hoặc giảng viên tại cơ sở giáo dục được công nhận; phải hoàn tất quy trình xác minh học tập chính thức của GitHub; không cấp mặc nhiên.
- **Observed-at & Freshness:** 2026-08-30T20:00:04.000Z / QUARTERLY_OFFICIAL_DOCS_REPLAY
- **Reviewer Decision:** `PROPOSED_FOR_CEO_REVIEW_NOT_YET_PUBLIC_ON_STOREFRONT` (`public_display_allowed: false`)

#### 2. Fact 2: Quyền Lợi GitHub Copilot Dành Cho Sinh Viên Đã Xác Minh
- **Fact ID:** `FACT_EP_02_GITHUB_COPILOT_ACCESS`
- **Candidate / Public Item:** `CAND_GITHUB_STUDENT_PACK` / `PROG_GITHUB_STUDENT`
- **Tier:** `T2_PROGRAM_OFFICIAL`
- **Exact Final URL:** `https://docs.github.com/en/education/about-github-education/github-education-for-students/about-github-education-for-students`
- **Artifact ID & SHA-256:** `ARTIFACT_GITHUB_EDUCATION_DOCS_V2` / `87231e1139b8a4a5c8979ec0cfb44cd5566064f6c843b311857df51fadec5e26`
- **Field Name:** `GITHUB_COPILOT_VERIFIED_STUDENT_BENEFIT`
- **Field Value:** "Sinh viên GitHub Education đã được xác minh được cấp quyền truy cập miễn phí vào GitHub Copilot và các tính năng cao cấp của nó."
- **Verbatim Quote:** *"Verified students get free access to Copilot and its premium features."*
- **Locator Replay:** Section 'GitHub Education features for students' -> Bullet 1 under 'GitHub benefits' (Line 39)
- **Subject / Geography Scope:** Toàn cầu & Sinh viên Đà Nẵng đã hoàn tất xác minh GitHub Education
- **Eligibility / Conditions:** Chỉ áp dụng cho sinh viên đã được GitHub Education xác minh (verified students), không áp dụng mặc nhiên cho mọi sinh viên.
- **Observed-at & Freshness:** 2026-08-30T20:00:04.000Z / QUARTERLY_OFFICIAL_DOCS_REPLAY
- **Reviewer Decision:** `PROPOSED_FOR_CEO_REVIEW_NOT_YET_PUBLIC_ON_STOREFRONT` (`public_display_allowed: false`)

---

### III. KẾT QUẢ BÀI KIỂM THỬ TIÊU CỰC (NEGATIVE TESTS EP)

Theo [`07_QUALITY_ASSURANCE/test_section_ep_static_contract.js`](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/07_QUALITY_ASSURANCE/test_section_ep_static_contract.js):

1. **Negative Test A (Tampered Receipt Hash Detection):** Giả lập biên nhận có mã băm SHA-256 bị thay đổi $ightarrow$ **Hệ thống phát hiện sai lệch hash và từ chối thẩm tra thành công (PASS)**.
2. **Negative Test B (Fabricated Quote Detection):** Giả lập trích dẫn bịa đặt không có trong raw markdown $ightarrow$ **Hệ thống phát hiện quote không khớp và từ chối thẩm tra thành công (PASS)**.
3. **Negative Test C (Broken/Non-Canonical Redirect Detection):** Giả lập chuỗi chuyển hướng sang domain lạ/phishing $ightarrow$ **Hệ thống phát hiện vi phạm domain chính thức và từ chối thẩm tra thành công (PASS)**.

---

### IV. BẢO ĐẢM KHẢ NĂNG TRUY CẬP STAGING (HEALTH CHECK EP)

Theo [`07_QUALITY_ASSURANCE/staging_ep_health_evidence.json`](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/07_QUALITY_ASSURANCE/staging_ep_health_evidence.json):

```json
{
  "status": "UP",
  "version": "v3.470.0-staging.ep",
  "ledger_sha256": "4d558b2e9a7615df99246bdf628d5f7718a47df484b142c6421386497652bcb6",
  "port": 4173,
  "static_dir": "staging_deploy_ep",
  "uptime_seconds": 78,
  "discovery_dossiers_count": 6,
  "captured_artifacts_with_receipt_count": 1,
  "evaluated_citation_facts_count": 2,
  "github_capture_receipt_valid": true,
  "valid_subject_attempts_count": 0,
  "field_facts_verified_count": 0,
  "tier_1_deals_count": 0,
  "vouchers_count": 0,
  "quarantined_jpegs_in_runtime": 0
}
```

---

### V. BỘ 16 BẢN GHI CAPTURE PROOF MỚI (BROWSER PACK EP)

Toàn bộ 16 ảnh chụp kiểm thử tự động tại thời điểm live server hoạt động đạt **16/16 mã băm SHA-256 hoàn toàn riêng biệt**, được lưu trữ tại `07_QUALITY_ASSURANCE/browser_pack_ep/`:

1. `00_desktop_1440_visual_slate_proof.png` (175.428 bytes, SHA-256: `2fa8698b0fb844b7...`)
2. `01_desktop_1440_landmark_hero.png` (221.682 bytes, SHA-256: `b77d8c84c3a60fc1...` — **Vector Hero & Đồ họa JayT**)
3. `02_desktop_1440_featured_deals.png` (229.381 bytes, SHA-256: `d25fd5bd52d7b8a1...`)
4. `03_desktop_1440_culinary_story.png` (133.702 bytes, SHA-256: `c847e5c7ad1f90fc...`)
5. `04_desktop_1440_transit_story.png` (173.714 bytes, SHA-256: `67ad346839113a1e...`)
6. `05_desktop_1440_leisure_story.png` (146.998 bytes, SHA-256: `c2c7ac2acda02775...`)
7. `06_desktop_1440_three_lane_wallet.png` (181.334 bytes, SHA-256: `21665102fecc0d9f...`)
8. `07_desktop_1440_explore_directory.png` (123.820 bytes, SHA-256: `e0fffe2e9d251359...`)
9. `08_desktop_1440_dark_mode.png` (223.420 bytes, SHA-256: `5f0128cd14cdb71c...`)
10. `09_desktop_1440_reduced_motion.png` (213.306 bytes, SHA-256: `472443282689ebcf...`)
11. `10_tablet_768_modern_bento.png` (161.721 bytes, SHA-256: `5b0faaeb1c7489eb...`)
12. `11_mobile_390_fresh_load_first_fold.png` (111.074 bytes, SHA-256: `1f6210dd69952824...`)
13. `12_mobile_390_food_journey_route.png` (50.976 bytes, SHA-256: `a09f45190d62be22...`)
14. `13_mobile_390_three_lane_wallet.png` (69.085 bytes, SHA-256: `e7a06f9708304feb...`)
15. `14_progressive_disclosure_drawer_open.png` (279.051 bytes, SHA-256: `568ba806bb42eadf...`)
16. `15_buy_decision_interactive.png` (74.033 bytes, SHA-256: `fd551fd1f21c6113...`)

---

### VI. CAM KẾT VẬN HÀNH & HÀNG RÀO AN TOÀN

1. **Khóa phát hành Production:** Tiếp tục duy trì trên Staging local `http://127.0.0.1:4173/`, không phát tán ra production khi chưa có phê duyệt từ CEO.
2. **Không Affiliate write / Zero-PII:** Duy trì 100% không chèn mã affiliate, không thu thập cookie hay secret của người dùng.
3. **Kính trình CEO trực tiếp mở trình duyệt kiểm tra live tại `http://127.0.0.1:4173/` và kiểm tra endpoint `http://127.0.0.1:4173/health` cùng biên nhận HTTP response tại `evidence_vault_ep/artifact_cand_github_education_docs_v2_receipt.json` và 2 fact record 12 điểm tại `evidence_desk_ep/PROPOSED_FACTS_REGISTRY_EP.json`.**
