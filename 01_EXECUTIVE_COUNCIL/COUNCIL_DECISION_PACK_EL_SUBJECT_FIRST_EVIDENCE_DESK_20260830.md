# BỘ HỒ SƠ HỘI ĐỒNG LIÊN BỘ — JAYT SECTION EL
## BÀN KHẢO SÁT CHỨNG CỨ THEO NHU CẦU NGƯỜI DÙNG (SUBJECT-FIRST EVIDENCE DESK) & KHẢO SÁT 10 DOSSIERS 4 INTENT LANES

**Mã hồ sơ:** `COUNCIL_DECISION_PACK_EL_SUBJECT_FIRST_EVIDENCE_DESK_20260830`  
**Phiên bản Staging SOT:** `v3.466.0-staging.el`  
**Chỉ thị chỉ đạo:** JAYT-245 Mục EL (Dòng 3464–3492)  
**Địa chỉ Staging hoạt động:** `http://127.0.0.1:4173/`  
**Endpoint Sức khỏe Hệ thống (Health Check):** `http://127.0.0.1:4173/health` (`HTTP 200 OK`, `status: "UP"`, `dossiers_evaluated_count: 10`, `field_facts_verified_count: 0`)  
**HTTP Status:** `200 OK` (Content-Type: `text/html; charset=utf-8`)  
**Thời gian lập hồ sơ:** 2026-08-30T19:37:00+07:00  
**Trạng thái Quản trị:** `PENDING_CEO_LIVE_REVIEW` (Tiếp tục nâng cấp, không Go-Live)

---

### I. BIÊN BẢN ĐÁNH GIÁ 7 PHÒNG BAN LIÊN BỘ (SECTION EL)

| Phòng ban | Báo cáo hành động thực tế | Trạng thái kỹ thuật |
| :--- | :--- | :---: |
| **1. Product** | **Xây Dựng 10 Hồ Sơ Khảo Sát Theo Nhu Cầu Thực:** Thiết lập 10 hồ sơ (Dossiers) chuẩn bị trước truy cập, đặt câu hỏi định lượng thực tế cho khách hàng (di chuyển, học tập, văn hóa, ẩm thực). Đóng minh bạch các nguồn chưa có SSR byte-level. | **READY_FOR_CEO_REVIEW** |
| **2. Design** | **Giao Diện Trung Thực Tuyệt Đối:** Giữ nguyên không gian tĩnh lặng, không tạo "deal theatre" hay badge giả. Toàn bộ 50 card hiển thị nhãn cổng chính thức rõ ràng. | **READY_FOR_CEO_REVIEW** |
| **3. UX/CX** | **Phân Biệt Rạch Ròi Cổng Nguồn vs Fact Đã Duyệt:** Khách hàng tiếp cận thông tin trung thực: xem link dẫn tới cổng đơn vị vận hành hoặc biết rõ JayT đang trong quá trình khảo sát đối soát. | **READY_FOR_CEO_REVIEW** |
| **4. Growth** | **Vận Hành Evidence Desk Theo 4 Ý Định:** Tách nhóm nguồn cung theo 4 intent người dùng (Di chuyển công cộng, Chính sách học đường, Văn hóa nghệ thuật, Tiêu dùng thường nhật). | **READY_FOR_CEO_REVIEW** |
| **5. Data & Trust** | **Bàn Khảo Sát Bằng Chứng (Subject-First Evidence Desk):** Ban hành `DOSSIER_REGISTRY_EL.json` và `staging_el_fact_ledger.json` ghi nhận chi tiết 10 dossier với các trường disqualifiers, expected page type, freshness threshold và kết quả đối soát. | **READY_FOR_CEO_REVIEW** |
| **6. Engineering** | Đóng gói SOT `jayt_storefront_staging_el.js`, nhúng dấu vân tay Ledger SHA-256 (`6dbc0c73bc...`), duy trì máy chủ Staging `http://127.0.0.1:4173/` và endpoint `/health`, **0 lỗi console error, 0 cảnh báo console warning, 0 tệp JPEG, 0 chuỗi false provenance trong DOM**. | **READY_FOR_CEO_REVIEW** |
| **7. QA** | Kiểm thử **68/68 static contract, subject-first dossier & staging availability checks**; audit 16/16 capture proofs độc bản với 16 mã băm SHA-256 riêng biệt; xác nhận 100% focusables $\ge 44\times 44\text{px}$. | **READY_FOR_CEO_REVIEW** |

---

### II. BẢNG TỔNG HỢP 10 DOSSIERS KHẢO SÁT CHỨNG CỨ (EVIDENCE DESK EL)

Theo [`07_QUALITY_ASSURANCE/evidence_desk_el/DOSSIER_REGISTRY_EL.json`](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/07_QUALITY_ASSURANCE/evidence_desk_el/DOSSIER_REGISTRY_EL.json):

| Mã Hồ Sơ | Ý Định Người Dùng | Câu Hỏi Khảo Sát Định Lượng (User Question) | URL Nguồn Chính Thức | Kết Quả Đánh Giá & Đóng Attempt |
| :--- | :--- | :--- | :--- | :--- |
| **DOSSIER_EL_01** | Di chuyển công cộng | *Giá vé trợ giá lượt cho HSSV trên tuyến xe buýt R16A tại Đà Nẵng là bao nhiêu?* | `https://danangbus.vn/` | `CLOSED_NO_RAW_SSR_FACT` (HTML trang chủ chỉ chứa link điều hướng; bảng giá chi tiết chạy qua script). |
| **DOSSIER_EL_02** | Di chuyển công cộng | *Giá cước mở khóa và thuê xe đạp công cộng TNGo Đà Nẵng theo lượt 45 phút là bao nhiêu?* | `https://tngo.vn/` | `CLOSED_NO_RAW_SSR_FACT` (HTML chỉ chứa link app download; biểu giá không có trong static byte). |
| **DOSSIER_EL_03** | Di chuyển công cộng | *Kênh tiếp nhận phản ánh và tra cứu tiện ích công dân trực tuyến TP. Đà Nẵng?* | `https://1022.danang.gov.vn/` | `CLOSED_NO_RAW_SSR_FACT` (Duy trì định danh cổng dịch vụ công chính thức). |
| **DOSSIER_EL_04** | Chính sách học đường | *Điều kiện xác thực sinh viên và các gói công cụ số trong GitHub Student Pack?* | `https://education.github.com/pack` | `CLOSED_NO_RAW_SSR_FACT` (Giao diện React SPA động; điều khoản chi tiết yêu cầu session xác thực). |
| **DOSSIER_EL_05** | Chính sách học đường | *Thời hạn và điều kiện gia hạn giấy phép JetBrains All Products Pack cho học tập?* | `https://www.jetbrains.com/community/education/#students` | `CLOSED_NO_RAW_SSR_FACT` (HTML chứa hub cộng đồng; điều khoản gia hạn nằm ở trang phụ). |
| **DOSSIER_EL_06** | Chính sách học đường | *Điều kiện nâng cấp gói Notion Plus miễn phí cho sinh viên qua email trường học?* | `https://www.notion.so/product/notion-for-education` | `CLOSED_NO_RAW_SSR_FACT` (Duy trì định danh cổng thông tin chính sách học đường Notion). |
| **DOSSIER_EL_07** | Văn hóa & Rạp chiếu | *Khung giờ và điều kiện giá vé U22 thành viên tại rạp Metiz Đà Nẵng?* | `https://metiz.vn/` | `CLOSED_NO_RAW_SSR_FACT` (Trang chủ không chứa biểu giá chi tiết U22 trong static HTML). |
| **DOSSIER_EL_08** | Văn hóa & Rạp chiếu | *Chính sách giá vé học sinh sinh viên tại Starlight Cinema Đà Nẵng?* | `https://starlight.vn/` | `CLOSED_NO_RAW_SSR_FACT` (Dữ liệu giá vé hiển thị qua iframe động). |
| **DOSSIER_EL_09** | Ẩm thực & Tiêu dùng | *Chương trình Mua 1 Tặng 1 Domino's Pizza áp dụng vào các ngày nào tại Đà Nẵng?* | `https://dominos.vn/` | `CLOSED_NO_RAW_SSR_FACT` (Điều khoản khuyến mãi yêu cầu tương tác chọn món trong giỏ hàng). |
| **DOSSIER_EL_10** | Ẩm thực & Tiêu dùng | *Mạng lưới cửa hàng và kênh hỗ trợ khách hàng Highlands Coffee tại Đà Nẵng?* | `https://highlandscoffee.com.vn/` | `CLOSED_NO_RAW_SSR_FACT` (Vị trí chi nhánh tải qua AJAX động). |

---

### III. BẢO ĐẢM KHẢ NĂNG TRUY CẬP STAGING (HEALTH CHECK EL)

Theo [`07_QUALITY_ASSURANCE/staging_el_health_evidence.json`](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/07_QUALITY_ASSURANCE/staging_el_health_evidence.json):

```json
{
  "status": "UP",
  "version": "v3.466.0-staging.el",
  "ledger_sha256": "6dbc0c73bc5926070c52d277c3bb59612b9962b4b0c63e5737b803eb51c9a725",
  "port": 4173,
  "static_dir": "staging_deploy_el",
  "uptime_seconds": 47,
  "dossiers_evaluated_count": 10,
  "field_facts_verified_count": 0,
  "four_intent_dossiers": {
    "INTENT_PUBLIC_TRANSIT": 3,
    "INTENT_EDUCATION_POLICY": 3,
    "INTENT_CULTURE_LEISURE": 2,
    "INTENT_CULINARY_RETAIL": 2
  },
  "tier_1_deals_count": 0,
  "vouchers_count": 0,
  "quarantined_jpegs_in_runtime": 0
}
```

---

### IV. BỘ 16 BẢN GHI CAPTURE PROOF MỚI (BROWSER PACK EL)

Toàn bộ 16 ảnh chụp kiểm thử tự động tại thời điểm live server hoạt động đạt **16/16 mã băm SHA-256 hoàn toàn riêng biệt**, được lưu trữ tại `07_QUALITY_ASSURANCE/browser_pack_el/`:

1. `00_desktop_1440_visual_slate_proof.png` (175.428 bytes, SHA-256: `2fa8698b0fb844b7...`)
2. `01_desktop_1440_landmark_hero.png` (221.670 bytes, SHA-256: `9cddc3f3336d27ff...` — **Vector Hero & Đồ họa JayT**)
3. `02_desktop_1440_featured_deals.png` (229.349 bytes, SHA-256: `862170d19f66f606...`)
4. `03_desktop_1440_culinary_story.png` (133.685 bytes, SHA-256: `325c592c0dfcf425...`)
5. `04_desktop_1440_transit_story.png` (173.709 bytes, SHA-256: `63a77365e16d45d0...`)
6. `05_desktop_1440_leisure_story.png` (146.984 bytes, SHA-256: `47e8d6b5593344d4...`)
7. `06_desktop_1440_three_lane_wallet.png` (181.318 bytes, SHA-256: `98d5b1255390f4fb...`)
8. `07_desktop_1440_explore_directory.png` (123.813 bytes, SHA-256: `23094f33f025f277...`)
9. `08_desktop_1440_dark_mode.png` (223.473 bytes, SHA-256: `d1bc9270dae6b743...`)
10. `09_desktop_1440_reduced_motion.png` (213.280 bytes, SHA-256: `31d2498da04fad15...`)
11. `10_tablet_768_modern_bento.png` (161.571 bytes, SHA-256: `f7e4ab1cbfbfda4d...`)
12. `11_mobile_390_fresh_load_first_fold.png` (110.902 bytes, SHA-256: `3b212e07c999565a...`)
13. `12_mobile_390_food_journey_route.png` (50.806 bytes, SHA-256: `f451259cf0255afe...`)
14. `13_mobile_390_three_lane_wallet.png` (68.908 bytes, SHA-256: `cde7319371916fc0...`)
15. `14_progressive_disclosure_drawer_open.png` (278.807 bytes, SHA-256: `d9e6c3ac1df15057...`)
16. `15_buy_decision_interactive.png` (74.306 bytes, SHA-256: `a403f8b9bc76ead1...`)

---

### V. CAM KẾT VẬN HÀNH & HÀNG RÀO AN TOÀN

1. **Khóa phát hành Production:** Tiếp tục duy trì trên Staging local `http://127.0.0.1:4173/`, không phát tán ra production khi chưa có phê duyệt từ CEO.
2. **Không Affiliate write / Zero-PII:** Duy trì 100% không chèn mã affiliate, không thu thập cookie hay secret của người dùng.
3. **Kính trình CEO trực tiếp mở trình duyệt kiểm tra live tại `http://127.0.0.1:4173/` và kiểm tra endpoint `http://127.0.0.1:4173/health` cùng hồ sơ 10 dossiers tại `evidence_desk_el/DOSSIER_REGISTRY_EL.json`.**
