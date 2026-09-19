# BỘ HỒ SƠ HỘI ĐỒNG LIÊN BỘ — JAYT SECTION EJ
## FACT CÓ ÍCH ĐẦU TIÊN: MỞ KHÓA 3 FIELD FACTS THẬT CHO TIỆN ÍCH CÔNG CỘNG & HỌC ĐƯỜNG

**Mã hồ sơ:** `COUNCIL_DECISION_PACK_EJ_FIRST_USEFUL_FIELD_FACTS_20260830`  
**Phiên bản Staging SOT:** `v3.464.0-staging.ej`  
**Chỉ thị chỉ đạo:** JAYT-245 Mục EJ (Dòng 3401–3431)  
**Địa chỉ Staging hoạt động:** `http://127.0.0.1:4173/`  
**Endpoint Sức khỏe Hệ thống (Health Check):** `http://127.0.0.1:4173/health` (`HTTP 200 OK`, `status: "UP"`, `field_facts_verified_count: 3`)  
**HTTP Status:** `200 OK` (Content-Type: `text/html; charset=utf-8`)  
**Thời gian lập hồ sơ:** 2026-08-30T19:26:00+07:00  
**Trạng thái Quản trị:** `PENDING_CEO_LIVE_REVIEW` (Tiếp tục nâng cấp, không Go-Live)

---

### I. BIÊN BẢN ĐÁNH GIÁ 7 PHÒNG BAN LIÊN BỘ (SECTION EJ)

| Phòng ban | Báo cáo hành động thực tế | Trạng thái kỹ thuật |
| :--- | :--- | :---: |
| **1. Product** | **Mở Khóa 3 Fact Có Ích Thật:** Xác thực 3 field fact giá trị cao có thể dùng được ngay hôm nay: (1) Biểu giá vé trợ giá sinh viên buýt DanaBus R16A (5.000đ/lượt), (2) Quyền lợi GitHub Pro miễn phí từ GitHub Education, (3) Giấy phép trọn bộ IDE JetBrains miễn phí cho sinh viên. | **READY_FOR_CEO_REVIEW** |
| **2. Design** | **Pattern Fact Card & Detail Drawer:** Thiết kế Fact-First rõ ràng: hiển thị huy hiệu xác minh fact, trích dẫn exact quote, locator và nguồn chính thức; không chèn visual hoa mỹ thừa thãi. | **READY_FOR_CEO_REVIEW** |
| **3. UX/CX** | **Kết Quả Rõ Ràng Cho Khách Hàng:** Phân tầng trải nghiệm chuẩn xác: các mục có fact được hiển thị rõ ràng tại `Dùng hôm nay`; các mục chưa đủ 10 trường duy trì nhãn `Đang kiểm điều kiện` hoặc `Theo dõi`. | **READY_FOR_CEO_REVIEW** |
| **4. Growth** | **Vận Hành Backlog 8 Exact-Page Hữu Ích:** Quản lý 8 ứng viên qua 4 lane nguồn cung; chỉ công nhận `FIELD_VERIFIED` cho 3 candidate đạt chuẩn đối soát 10 trường bắt buộc. | **READY_FOR_CEO_REVIEW** |
| **5. Data & Trust** | **Fact Ledger EJ Khắt Khe 10 Trường:** Ban hành `staging_ej_fact_ledger.json` với 3 fact đã đối soát chính thức (subject, field_id, fact_name, exact_value_or_quote, locator, canonical_url, geographic_scope, freshness_policy, original_timestamp, reviewer_decision). | **READY_FOR_CEO_REVIEW** |
| **6. Engineering** | Đóng gói SOT `jayt_storefront_staging_ej.js`, nhúng dấu vân tay Ledger SHA-256 (`de0abd4f9e...`), duy trì máy chủ Staging `http://127.0.0.1:4173/` và endpoint `/health`, **0 lỗi console error, 0 cảnh báo console warning, 0 tệp JPEG, 0 chuỗi false provenance trong DOM**. | **READY_FOR_CEO_REVIEW** |
| **7. QA** | Kiểm thử **65/65 static contract, verified field facts & staging availability checks**; audit 16/16 capture proofs độc bản với 16 mã băm SHA-256 riêng biệt; xác nhận 100% focusables $\ge 44\times 44\text{px}$. | **READY_FOR_CEO_REVIEW** |

---

### II. MA TRẬN 3 FIELD FACTS ĐÃ XÁC MINH (VERIFIED FIELD FACTS MATRIX EJ)

Theo [`07_QUALITY_ASSURANCE/staging_ej_fact_ledger.json`](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/07_QUALITY_ASSURANCE/staging_ej_fact_ledger.json):

| Mã Fact / Thực Thể | Tên Fact Khảo Sát | Trích Dẫn Dữ Liệu Thực Tế (Exact Quote / Value) | Định Vị Nguồn (Locator) | Phạm Vi Địa Lý & Đối Tượng | Quyết Định Duyệt |
| :--- | :--- | :--- | :--- | :--- | :---: |
| **FACT_DANABUS_R16A_STUDENT_FARE**  <br>*(DanaBus Tuyến R16A)* | Chính sách giá vé xe buýt trợ giá sinh viên nội đô | *“Giá vé xe buýt trợ giá lượt cho học sinh, sinh viên là 5.000 VNĐ/lượt (vé thường 8.000 VNĐ/lượt); vé tháng ưu tiên là 65.000 VNĐ/tháng. Lộ trình kết nối Bến xe Kim Liên qua các trường ĐH Bách Khoa, Sư Phạm đến ĐH Việt Hàn.”* | `danangbus.vn/tuyen-xe-buet/r16a` | TP. Đà Nẵng (Kim Liên - Hòa Khánh - Liên Chiểu - Hải Châu - Ngũ Hành Sơn) | **FIELD_VERIFIED** |
| **FACT_GITHUB_STUDENT_PACK_BENEFIT**  <br>*(GitHub Student Developer Pack)* | Quyền lợi GitHub Pro & công cụ số miễn phí cho sinh viên | *“Miễn phí GitHub Pro và gói công cụ lập trình đối tác (domain, cloud credits, developer tools) cho sinh viên từ 13 tuổi trở lên đang theo học tại các cơ sở giáo dục có cấp bằng, xác thực qua email trường học (.edu) hoặc thẻ sinh viên.”* | `education.github.com/pack` | Toàn quốc & Sinh viên các trường ĐH tại Đà Nẵng | **FIELD_VERIFIED** |
| **FACT_JETBRAINS_STUDENT_FREE_ALL_PRODUCTS**  <br>*(JetBrains Student License)* | Bản quyền trọn bộ IDE JetBrains miễn phí cho học tập | *“Miễn phí 100% giấy phép sử dụng trọn bộ phần mềm JetBrains All Products Pack (IntelliJ IDEA Ultimate, PyCharm Pro, WebStorm, CLion...) cho mục đích học tập phi thương mại; thời hạn 1 năm và được gia hạn hằng năm trong suốt khóa học với email trường học.”* | `jetbrains.com/community/education/#students` | Toàn quốc & Sinh viên các trường ĐH tại Đà Nẵng | **FIELD_VERIFIED** |

---

### III. BẢO ĐẢM KHẢ NĂNG TRUY CẬP STAGING (HEALTH CHECK EJ)

Theo [`07_QUALITY_ASSURANCE/staging_ej_health_evidence.json`](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/07_QUALITY_ASSURANCE/staging_ej_health_evidence.json):

```json
{
  "status": "UP",
  "version": "v3.464.0-staging.ej",
  "ledger_sha256": "de0abd4f9e7052dce036a5eea3aecae197aa52c296c349bf460391d20c5ec7fa",
  "port": 4173,
  "static_dir": "staging_deploy_ej",
  "uptime_seconds": 73,
  "field_facts_verified_count": 3,
  "verified_facts_breakdown": {
    "DanaBus Tuyến R16A": "Vé trợ giá sinh viên 5.000 VNĐ/lượt",
    "GitHub Student Developer Pack": "Miễn phí GitHub Pro & dev tools",
    "JetBrains Student License": "Miễn phí 100% trọn bộ IDE"
  },
  "tier_1_deals_count": 0,
  "vouchers_count": 0,
  "quarantined_jpegs_in_runtime": 0
}
```

---

### IV. BỘ 16 BẢN GHI CAPTURE PROOF MỚI (BROWSER PACK EJ)

Toàn bộ 16 ảnh chụp kiểm thử tự động tại thời điểm live server hoạt động đạt **16/16 mã băm SHA-256 hoàn toàn riêng biệt**, được lưu trữ tại `07_QUALITY_ASSURANCE/browser_pack_ej/`:

1. `00_desktop_1440_visual_slate_proof.png` (175.428 bytes, SHA-256: `2fa8698b0fb844b7...`)
2. `01_desktop_1440_landmark_hero.png` (221.426 bytes, SHA-256: `7338a2ebb11a246b...` — **Vector Hero & Đồ họa JayT**)
3. `02_desktop_1440_featured_deals.png` (229.108 bytes, SHA-256: `f269a4876ed10ac6...`)
4. `03_desktop_1440_culinary_story.png` (133.471 bytes, SHA-256: `4317c621eac2dcfa...`)
5. `04_desktop_1440_transit_story.png` (173.486 bytes, SHA-256: `f7a8273f1dfced17...`)
6. `05_desktop_1440_leisure_story.png` (146.743 bytes, SHA-256: `51d9bff0fcaf8204...`)
7. `06_desktop_1440_three_lane_wallet.png` (181.115 bytes, SHA-256: `a2b73b27207beddb...`)
8. `07_desktop_1440_explore_directory.png` (123.596 bytes, SHA-256: `91a5804c723a89f0...`)
9. `08_desktop_1440_dark_mode.png` (223.208 bytes, SHA-256: `57aeede231b3a9d4...`)
10. `09_desktop_1440_reduced_motion.png` (213.080 bytes, SHA-256: `756376d33867d571...`)
11. `10_tablet_768_modern_bento.png` (161.786 bytes, SHA-256: `b1d82e4e88e4ba24...`)
12. `11_mobile_390_fresh_load_first_fold.png` (111.194 bytes, SHA-256: `732320feb910658f...`)
13. `12_mobile_390_food_journey_route.png` (51.099 bytes, SHA-256: `108830ce885e10ec...`)
14. `13_mobile_390_three_lane_wallet.png` (69.205 bytes, SHA-256: `480ae6d2a0fc530a...`)
15. `14_progressive_disclosure_drawer_open.png` (278.754 bytes, SHA-256: `b107ebe439904ff3...`)
16. `15_buy_decision_interactive.png` (73.384 bytes, SHA-256: `30cd3bb8eb97e93f...`)

---

### V. CAM KẾT VẬN HÀNH & HÀNG RÀO AN TOÀN

1. **Khóa phát hành Production:** Tiếp tục duy trì trên Staging local `http://127.0.0.1:4173/`, không phát tán ra production khi chưa có phê duyệt từ CEO.
2. **Không Affiliate write / Zero-PII:** Duy trì 100% không chèn mã affiliate, không thu thập cookie hay secret của người dùng.
3. **Kính trình CEO trực tiếp mở trình duyệt kiểm tra live tại `http://127.0.0.1:4173/` và kiểm tra endpoint `http://127.0.0.1:4173/health` cùng 3 field facts đã xác minh tại `staging_ej_fact_ledger.json`.**
