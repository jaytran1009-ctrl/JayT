# BỘ HỒ SƠ HỘI ĐỒNG LIÊN BỘ — JAYT SECTION EC
## KHÔI PHỤC KỶ LUẬT LINEAGE KHO BẰNG CHỨNG, PHÂN ĐỊNH IDENTITY VS FIELD PROOF & KHÓA CHẶT PROVENANCE

**Mã hồ sơ:** `COUNCIL_DECISION_PACK_EC_VAULT_LINEAGE_AND_FIELD_PROOF_SCHEMA_20260830`  
**Phiên bản Staging SOT:** `v3.457.0-staging.ec`  
**Chỉ thị chỉ đạo:** JAYT-245 Mục EC (Dòng 3192–3219)  
**Địa chỉ Staging hoạt động:** `http://127.0.0.1:4173/`  
**HTTP Status:** `200 OK` (Content-Type: `text/html; charset=utf-8`)  
**Thời gian lập hồ sơ:** 2026-08-30T18:30:00+07:00  
**Trạng thái Quản trị:** `PENDING_CEO_LIVE_REVIEW` (Tiếp tục nâng cấp, không Go-Live)

---

### I. BIÊN BẢN ĐÁNH GIÁ 7 PHÒNG BAN LIÊN BỘ (SECTION EC)

| Phòng ban | Báo cáo hành động thực tế | Trạng thái kỹ thuật |
| :--- | :--- | :---: |
| **1. Product** | **Phân Định Portal Access vs Field Proof:** Portal dễ truy cập chỉ là định danh (`PORTAL_IDENTITY_ONLY`); không được dùng để nâng cấp nội dung hay tạo claim deal khi chưa có locator cụ thể. | **READY_FOR_CEO_REVIEW** |
| **2. Design** | **Bảo Toàn Chuẩn UI Gọn & Khả Năng Tiếp Cận:** Duy trì duy nhất 1 nút `Voucher (0)` trong navigation tree. Không gắn nhãn hay badge "đã kiểm chứng field" lên các card chỉ có portal identity. | **READY_FOR_CEO_REVIEW** |
| **3. UX/CX** | **Xóa Bỏ Toàn Bộ Claim Chưa Có Proof:** Toàn bộ 50 mục duy trì tiêu chuẩn minh bạch nguồn gốc: dẫn link trực tiếp tới cổng chính thức kèm câu khuyến cáo: `JayT chưa đối soát điều kiện chi tiết; vui lòng kiểm tra tại nguồn.` | **READY_FOR_CEO_REVIEW** |
| **4. Growth** | **Kỷ Luật Đếm Metric Nguồn Cung Thực:** Đo lường chính xác số exact fields hoàn chỉnh (`FIELD_TERMS_VERIFIED = 0`), không đếm số lượng portal repackage. Giữ AccessTrade `PORTAL_ACCESS_NOT_VERIFIED`. | **READY_FOR_CEO_REVIEW** |
| **5. Data & Trust** | **Khôi Phục Kỷ Luật Lineage Vault EC:** Sửa toàn bộ 12 artifact trong `evidence_vault_ec`, khôi phục `original_fetched_at` gốc (07:08Z / 08:14Z / 08:15Z), liên kết `origin_vault_ref`, xóa bỏ hoàn toàn hành vi restamp timestamp. | **READY_FOR_CEO_REVIEW** |
| **6. Engineering** | Đóng gói SOT `jayt_storefront_staging_ec.js`, nhúng dấu vân tay Ledger SHA-256 (`563ea550c3...`), phục vụ ổn định trên máy chủ Staging `http://127.0.0.1:4173/` (`HTTP 200 OK`), **0 lỗi console error, 0 cảnh báo console warning**. | **READY_FOR_CEO_REVIEW** |
| **7. QA** | Kiểm thử **40/40 static contract, lineage & security checks**; thực hiện audit 16/16 capture proofs độc bản với 16 mã băm SHA-256 riêng biệt; xác nhận 100% focusables $\ge 44\times 44\text{px}$. | **READY_FOR_CEO_REVIEW** |

---

### II. BẢNG PHÂN ĐỊNH ĐỊNH DANH CỔNG VS BẰNG CHỨNG THỰC ĐỊA (IDENTITY VS FIELD MATRIX EC)

Theo [`07_QUALITY_ASSURANCE/staging_ec_identity_vs_field_matrix.json`](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/07_QUALITY_ASSURANCE/staging_ec_identity_vs_field_matrix.json):

| Tên Đơn vị / Đối tác | Domain Chính Thức | Xác thực Định Danh Cổng (`portal_identity`) | Xác thực Biểu phí / Điều kiện (`field_terms`) | Tiêu chuẩn Copy Công Khai Hiển Thị |
| :--- | :--- | :---: | :---: | :--- |
| **GitHub Education** | `education.github.com` | **VERIFIED_CANONICAL_PORTAL** | **UNKNOWN_AWAITING_LOCATOR** | Cổng tiếp nhận hồ sơ học đường chính thức. JayT chưa đối soát điều kiện; kiểm tra tại nguồn. |
| **Notion** | `notion.so` | **VERIFIED_CANONICAL_PORTAL** | **UNKNOWN_AWAITING_LOCATOR** | Cổng hỗ trợ học đường chính thức. JayT chưa đối soát điều kiện; kiểm tra tại nguồn. |
| **Canva** | `canva.com` | **VERIFIED_CANONICAL_PORTAL** | **UNKNOWN_AWAITING_LOCATOR** | Cổng thông tin học đường chính thức. JayT chưa đối soát phương thức xác thực; kiểm tra tại nguồn. |
| **DanaBus (R16A)** | `danangbus.vn` | **VERIFIED_CANONICAL_PORTAL** | **UNKNOWN_AWAITING_LOCATOR** | Mạng lưới xe buýt trợ giá nội thành Đà Nẵng. JayT chưa đối soát biểu giá vé; kiểm tra tại nguồn. |
| **TNGo Bike** | `tngo.vn` | **VERIFIED_CANONICAL_PORTAL** | **UNKNOWN_AWAITING_LOCATOR** | Mạng lưới xe đạp đô thị TP. Đà Nẵng. JayT chưa đối soát biểu giá cước thuê; kiểm tra tại nguồn. |
| **Metiz Cinema** | `metiz.vn` | **VERIFIED_CANONICAL_PORTAL** | **UNKNOWN_AWAITING_LOCATOR** | Cổng thông tin cụm rạp Helio Center Đà Nẵng. JayT chưa đối soát biểu giá vé; kiểm tra tại nguồn. |
| **Starlight Cinema** | `starlight.vn` | **VERIFIED_CANONICAL_PORTAL** | **UNKNOWN_AWAITING_LOCATOR** | Cổng thông tin rạp Nguyễn Kim Đà Nẵng. JayT chưa đối soát ưu đãi HSSV; kiểm tra tại nguồn. |
| **Domino's Pizza** | `dominos.vn` | **VERIFIED_CANONICAL_PORTAL** | **UNKNOWN_AWAITING_LOCATOR** | Cổng thông tin chuỗi cửa hàng tại Việt Nam. JayT chưa đối soát voucher; kiểm tra tại nguồn. |

---

### III. BẢNG TRUY NGUYÊN NGUỒN GỐC KHO BẰNG CHỨNG (VAULT LINEAGE MATRIX EC)

Theo [`07_QUALITY_ASSURANCE/evidence_vault_ec/EVIDENCE_MANIFEST_EC.json`](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/07_QUALITY_ASSURANCE/evidence_vault_ec/EVIDENCE_MANIFEST_EC.json):

| Tệp Bằng Chứng (`artifact_filename`) | Dung lượng (bytes) | Mã băm SHA-256 | Kho Lưu Gốc (`origin_vault_ref`) | Thời điểm Thu Thập Gốc (`original_fetched_at`) | Trạng thái Lineage | Cấp độ Xác thực (`verification_level`) |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| `artifact_cand_bun_cha_ca_109_city_portal_root.html` | 621.777 | `dd18d5d46d...` | `evidence_vault_dv/` | 2026-08-30T07:08:00Z | REUSED_ORIGINAL_SNAPSHOT | PORTAL_IDENTITY_ONLY |
| `artifact_cand_com_ga_a_hai_facebook_shell.html` | 1.542 | `d89fff9b31...` | `evidence_vault_dv/` | 2026-08-30T07:08:00Z | REUSED_ORIGINAL_SNAPSHOT | PORTAL_IDENTITY_ONLY |
| `artifact_cand_thu_vien_dut_catalog.html` | 4.658 | `4cb75cbe95...` | `evidence_vault_dv/` | 2026-08-30T07:08:00Z | REUSED_ORIGINAL_SNAPSHOT | PORTAL_IDENTITY_ONLY |
| `artifact_cand_thu_vien_dund_portal.html` | 294.832 | `876f6967a9...` | `evidence_vault_dv/` | 2026-08-30T07:08:00Z | REUSED_ORIGINAL_SNAPSHOT | PORTAL_IDENTITY_ONLY |
| `artifact_cand_bus_r16a_transit_portal.html` | 115.281 | `db237f0745...` | `evidence_vault_dw/` | 2026-08-30T08:14:00Z | REUSED_ORIGINAL_SNAPSHOT | PORTAL_IDENTITY_ONLY |
| `artifact_cand_tngo_bike_portal.html` | 52.968 | `b34fdd823b...` | `evidence_vault_dw/` | 2026-08-30T08:14:00Z | REUSED_ORIGINAL_SNAPSHOT | PORTAL_IDENTITY_ONLY |
| `artifact_cand_metiz_cinema_portal.html` | 53.334 | `4b539543df...` | `evidence_vault_dw/` | 2026-08-30T08:14:00Z | REUSED_ORIGINAL_SNAPSHOT | PORTAL_IDENTITY_ONLY |
| `artifact_cand_starlight_cinema_portal.html` | 101.350 | `becf409e3c...` | `evidence_vault_dw/` | 2026-08-30T08:14:00Z | REUSED_ORIGINAL_SNAPSHOT | PORTAL_IDENTITY_ONLY |
| `artifact_cand_dominos_pizza_portal.html` | 51.512 | `9f78d30d67...` | `evidence_vault_dw/` | 2026-08-30T08:14:00Z | REUSED_ORIGINAL_SNAPSHOT | PORTAL_IDENTITY_ONLY |
| `artifact_cand_github_student_pack.html` | 271.480 | `1610df187f...` | `evidence_vault_dw/` | 2026-08-30T08:15:00Z | REUSED_ORIGINAL_SNAPSHOT | PORTAL_IDENTITY_ONLY |
| `artifact_cand_jetbrains_student_pack.html` | 61.554 | `0c279ee631...` | `evidence_vault_dw/` | 2026-08-30T08:15:00Z | REUSED_ORIGINAL_SNAPSHOT | PORTAL_IDENTITY_ONLY |
| `artifact_cand_highlands_coffee_portal.html` | 29.929 | `03c0029c05...` | `evidence_vault_dw/` | 2026-08-30T08:15:00Z | REUSED_ORIGINAL_SNAPSHOT | PORTAL_IDENTITY_ONLY |

---

### IV. BỘ 16 BẢN GHI CAPTURE PROOF MỚI (BROWSER PACK EC)

Toàn bộ 16 ảnh chụp kiểm thử tự động tại thời điểm live server hoạt động đạt **16/16 mã băm SHA-256 hoàn toàn riêng biệt**, được lưu trữ tại `07_QUALITY_ASSURANCE/browser_pack_ec/`:

1. `00_desktop_1440_visual_slate_proof.png` (1.086.630 bytes, SHA-256: `067b5489b667e1a3...`)
2. `01_desktop_1440_landmark_hero.png` (495.856 bytes, SHA-256: `bf6e1a579687b136...`)
3. `02_desktop_1440_featured_deals.png` (402.614 bytes, SHA-256: `032784aa8556fd98...`)
4. `03_desktop_1440_culinary_story.png` (133.719 bytes, SHA-256: `592ec2f2fdd668c9...`)
5. `04_desktop_1440_transit_story.png` (240.602 bytes, SHA-256: `a57dd49312efd2b4...`)
6. `05_desktop_1440_leisure_story.png` (147.020 bytes, SHA-256: `4517f79f1b81ef23...`)
7. `06_desktop_1440_three_lane_wallet.png` (181.356 bytes, SHA-256: `884283ffa8c4df66...`)
8. `07_desktop_1440_explore_directory.png` (123.848 bytes, SHA-256: `3e107e3cb9c08f1b...`)
9. `08_desktop_1440_dark_mode.png` (496.053 bytes, SHA-256: `ff69626c04044d1c...`)
10. `09_desktop_1440_reduced_motion.png` (395.835 bytes, SHA-256: `4aa0105c45eee785...`)
11. `10_tablet_768_modern_bento.png` (362.008 bytes, SHA-256: `1138e36d3b3ca7b2...`)
12. `11_mobile_390_fresh_load_first_fold.png` (174.564 bytes, SHA-256: `982aaa49caad4726...`)
13. `12_mobile_390_food_journey_route.png` (50.984 bytes, SHA-256: `b76b771dffcdb419...`)
14. `13_mobile_390_three_lane_wallet.png` (69.088 bytes, SHA-256: `179d3b3c18db5c67...`)
15. `14_progressive_disclosure_drawer_open.png` (278.964 bytes, SHA-256: `eeaa46769911c66d...`)
16. `15_buy_decision_interactive.png` (74.238 bytes, SHA-256: `5159384f3ae07839...`)

---

### V. CAM KẾT VẬN HÀNH & HÀNG RÀO AN TOÀN

1. **Khóa phát hành Production:** Tiếp tục duy trì trên Staging local `http://127.0.0.1:4173/`, không phát tán ra production khi chưa có phê duyệt từ CEO.
2. **Không Affiliate write / Zero-PII:** Duy trì 100% không chèn mã affiliate, không thu thập cookie hay secret của người dùng.
3. **Kính trình CEO trực tiếp mở trình duyệt kiểm tra live tại `http://127.0.0.1:4173/` và kiểm tra kho bằng chứng `evidence_vault_ec` đã được phục hồi đầy đủ lineage gốc.**
