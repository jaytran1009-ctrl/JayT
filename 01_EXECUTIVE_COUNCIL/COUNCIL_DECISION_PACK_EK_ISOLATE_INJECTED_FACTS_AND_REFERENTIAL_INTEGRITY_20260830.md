# BỘ HỒ SƠ HỘI ĐỒNG LIÊN BỘ — JAYT SECTION EK
## CÔ LẬP TOÀN DIỆN 3 FIELD FACTS BƠM LEDGER & THIẾT LẬP HÀNG RÀO TOÀN VẸN THAM CHIẾU (REFERENTIAL INTEGRITY GATE)

**Mã hồ sơ:** `COUNCIL_DECISION_PACK_EK_ISOLATE_INJECTED_FACTS_AND_REFERENTIAL_INTEGRITY_20260830`  
**Phiên bản Staging SOT:** `v3.465.0-staging.ek`  
**Chỉ thị chỉ đạo:** JAYT-245 Mục EK (Dòng 3434–3461)  
**Địa chỉ Staging hoạt động:** `http://127.0.0.1:4173/`  
**Endpoint Sức khỏe Hệ thống (Health Check):** `http://127.0.0.1:4173/health` (`HTTP 200 OK`, `status: "UP"`, `field_facts_verified_count: 0`, `quarantined_injected_facts_count: 3`)  
**HTTP Status:** `200 OK` (Content-Type: `text/html; charset=utf-8`)  
**Thời gian lập hồ sơ:** 2026-08-30T19:31:00+07:00  
**Trạng thái Quản trị:** `PENDING_CEO_LIVE_REVIEW` (Tiếp tục nâng cấp, không Go-Live)

---

### I. BIÊN BẢN ĐÁNH GIÁ 7 PHÒNG BAN LIÊN BỘ (SECTION EK)

| Phòng ban | Báo cáo hành động thực tế | Trạng thái kỹ thuật |
| :--- | :--- | :---: |
| **1. Product** | **Gỡ Bỏ Toàn Bộ 3 Badge Xác Minh Bơm:** Loại bỏ hoàn toàn huy hiệu `ĐÃ XÁC MINH FIELD FACT`, quote giá vé DanaBus và điều kiện học đường GitHub/JetBrains khỏi toàn bộ UI/Drawer/JSON-LD. Toàn bộ 50 card quay về nhãn minh bạch `dẫn tới cổng chính thức — điều kiện chưa đối soát`. | **READY_FOR_CEO_REVIEW** |
| **2. Design** | **Loại Bỏ Hoàn Toàn Fact Drawer Trộn:** Xóa bỏ pattern Fact Drawer hiển thị dữ liệu chưa qua đối soát byte-level. Giao diện trung thực, rõ ràng và không ngụy tạo tính năng. | **READY_FOR_CEO_REVIEW** |
| **3. UX/CX** | **Đảm Bảo Thông Tin Minh Bạch & Đồng Nhất:** Khách hàng thấy rõ ràng trạng thái chưa đối soát của mọi dịch vụ và được cung cấp đường link dẫn thẳng tới cổng thông tin chính thức. Lối vào `Dùng hôm nay` lọc danh mục tiện ích công cộng trung thực. | **READY_FOR_CEO_REVIEW** |
| **4. Growth** | **Vận Hành Backlog Không Chạy Đua Số Lượng:** Ghi nhận chính xác 8 candidate attempt; cô lập 3 attempt bị coi là ledger injection do thiếu exact fare/eligibility table trong raw bytes; giữ nguyên chỉ số `0 verified field facts`. | **READY_FOR_CEO_REVIEW** |
| **5. Data & Trust** | **Hàng Rào Toàn Vẹn Tham Chiếu (Referential-Integrity Gate):** Ban hành `staging_ek_fact_ledger.json` với quy tắc bắt buộc: Một fact chỉ được công nhận khi raw locator replay khớp chính xác từng ký tự trong raw byte snapshot. | **READY_FOR_CEO_REVIEW** |
| **6. Engineering** | Đóng gói SOT `jayt_storefront_staging_ek.js`, nhúng dấu vân tay Ledger SHA-256 (`52bbcf93d4...`), duy trì máy chủ Staging `http://127.0.0.1:4173/` và endpoint `/health` trả `field_facts_verified_count: 0`, **0 lỗi console error, 0 cảnh báo console warning, 0 tệp JPEG, 0 chuỗi false provenance trong DOM**. | **READY_FOR_CEO_REVIEW** |
| **7. QA** | Kiểm thử **67/67 static contract, referential integrity & staging availability checks**; audit 16/16 capture proofs độc bản với 16 mã băm SHA-256 riêng biệt; xác nhận 100% focusables $\ge 44\times 44\text{px}$. | **READY_FOR_CEO_REVIEW** |

---

### II. BẢNG BIÊN BẢN CÔ LẬP 3 INJECTED FACTS (QUARANTINE LOG EK)

Theo [`07_QUALITY_ASSURANCE/staging_ek_fact_ledger.json`](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/07_QUALITY_ASSURANCE/staging_ek_fact_ledger.json):

| Mã Fact Đã Từng Bơm | Thực Thể Liên Quan | Lý Do Kỹ Thuật Bị Cô Lập | Quyết Định Lệnh EK | Trạng Thái Hệ Thống Hiện Tại |
| :--- | :--- | :--- | :---: | :---: |
| **FACT_DANABUS_R16A_STUDENT_FARE** | DanaBus Tuyến R16A | *Raw HTML artifact chỉ chứa trang chủ danangbus.vn, chưa chứa bảng biểu giá vé trợ giá 5.000đ và locator route R16A.* | **QUARANTINED** | `PORTAL_IDENTITY_ONLY` (0 Fact) |
| **FACT_GITHUB_STUDENT_PACK_BENEFIT** | GitHub Student Developer Pack | *Raw HTML artifact chỉ chứa landing page education.github.com/pack, chưa chứa điều khoản benefit chi tiết.* | **QUARANTINED** | `PORTAL_IDENTITY_ONLY` (0 Fact) |
| **FACT_JETBRAINS_STUDENT_FREE_ALL_PRODUCTS** | JetBrains Student License | *Raw HTML artifact chỉ chứa landing page cộng đồng education, chưa chứa exact license clause.* | **QUARANTINED** | `PORTAL_IDENTITY_ONLY` (0 Fact) |

---

### III. BẢO ĐẢM KHẢ NĂNG TRUY CẬP STAGING (HEALTH CHECK EK)

Theo [`07_QUALITY_ASSURANCE/staging_ek_health_evidence.json`](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/07_QUALITY_ASSURANCE/staging_ek_health_evidence.json):

```json
{
  "status": "UP",
  "version": "v3.465.0-staging.ek",
  "ledger_sha256": "52bbcf93d4d5387b945e8f6f01b063fe72c80ff2f497029b0c0feba4dfcd951b",
  "port": 4173,
  "static_dir": "staging_deploy_ek",
  "uptime_seconds": 60,
  "field_facts_verified_count": 0,
  "quarantined_injected_facts_count": 3,
  "quarantined_facts_list": [
    "FACT_DANABUS_R16A_STUDENT_FARE (Missing exact fare table locator)",
    "FACT_GITHUB_STUDENT_PACK_BENEFIT (Missing exact eligibility clause locator)",
    "FACT_JETBRAINS_STUDENT_FREE_ALL_PRODUCTS (Missing exact license clause locator)"
  ],
  "tier_1_deals_count": 0,
  "vouchers_count": 0,
  "quarantined_jpegs_in_runtime": 0
}
```

---

### IV. BỘ 16 BẢN GHI CAPTURE PROOF MỚI (BROWSER PACK EK)

Toàn bộ 16 ảnh chụp kiểm thử tự động tại thời điểm live server hoạt động đạt **16/16 mã băm SHA-256 hoàn toàn riêng biệt**, được lưu trữ tại `07_QUALITY_ASSURANCE/browser_pack_ek/`:

1. `00_desktop_1440_visual_slate_proof.png` (175.428 bytes, SHA-256: `2fa8698b0fb844b7...`)
2. `01_desktop_1440_landmark_hero.png` (221.660 bytes, SHA-256: `78c7bcb9a921c279...` — **Vector Hero & Đồ họa JayT**)
3. `02_desktop_1440_featured_deals.png` (229.345 bytes, SHA-256: `15208b09bba5d98a...`)
4. `03_desktop_1440_culinary_story.png` (133.678 bytes, SHA-256: `157615603b6082b4...`)
5. `04_desktop_1440_transit_story.png` (173.686 bytes, SHA-256: `9ed7917c0cfa0f3d...`)
6. `05_desktop_1440_leisure_story.png` (146.976 bytes, SHA-256: `e39bc4bedad725ae...`)
7. `06_desktop_1440_three_lane_wallet.png` (181.313 bytes, SHA-256: `c785631e75e297b6...`)
8. `07_desktop_1440_explore_directory.png` (123.792 bytes, SHA-256: `8da58bfb5d0f439a...`)
9. `08_desktop_1440_dark_mode.png` (223.492 bytes, SHA-256: `89dccbc9969e1296...`)
10. `09_desktop_1440_reduced_motion.png` (213.284 bytes, SHA-256: `ecd7f0bff0dcb351...`)
11. `10_tablet_768_modern_bento.png` (161.706 bytes, SHA-256: `9fcb151692bc6589...`)
12. `11_mobile_390_fresh_load_first_fold.png` (111.043 bytes, SHA-256: `de51a213ac4de624...`)
13. `12_mobile_390_food_journey_route.png` (50.936 bytes, SHA-256: `8a20a34d5d78f4e7...`)
14. `13_mobile_390_three_lane_wallet.png` (69.043 bytes, SHA-256: `04fb9bd9786e34e3...`)
15. `14_progressive_disclosure_drawer_open.png` (279.068 bytes, SHA-256: `bfb8710011c5e078...` — **Detail Drawer Sạch Badge Giả, Giữ Nguyên Cổng Nguồn**)
16. `15_buy_decision_interactive.png` (74.138 bytes, SHA-256: `7fb606ac131a73a4...`)

---

### V. CAM KẾT VẬN HÀNG RÀO AN TOÀN

1. **Khóa phát hành Production:** Tiếp tục duy trì trên Staging local `http://127.0.0.1:4173/`, không phát tán ra production khi chưa có phê duyệt từ CEO.
2. **Không Affiliate write / Zero-PII:** Duy trì 100% không chèn mã affiliate, không thu thập cookie hay secret của người dùng.
3. **Kính trình CEO trực tiếp mở trình duyệt kiểm tra live tại `http://127.0.0.1:4173/` và kiểm tra endpoint `http://127.0.0.1:4173/health` cùng sổ đăng ký fact sạch tại `staging_ek_fact_ledger.json`.**
