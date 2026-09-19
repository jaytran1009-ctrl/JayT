# BỘ HỒ SƠ HỘI ĐỒNG LIÊN BỘ — JAYT SECTION ED
## KHÔI PHỤC TIMESTAMP NGUYÊN VĂN GỐC, LẬP SỔ ĐỊNH DANH 50 MỤC & KHÓA CHẶT PROVENANCE FAIL-CLOSED

**Mã hồ sơ:** `COUNCIL_DECISION_PACK_ED_EXACT_TIME_LINEAGE_AND_50_ITEM_ROSTER_20260830`  
**Phiên bản Staging SOT:** `v3.458.0-staging.ed`  
**Chỉ thị chỉ đạo:** JAYT-245 Mục ED (Dòng 3222–3248)  
**Địa chỉ Staging hoạt động:** `http://127.0.0.1:4173/`  
**HTTP Status:** `200 OK` (Content-Type: `text/html; charset=utf-8`)  
**Thời gian lập hồ sơ:** 2026-08-30T18:36:00+07:00  
**Trạng thái Quản trị:** `PENDING_CEO_LIVE_REVIEW` (Tiếp tục nâng cấp, không Go-Live)

---

### I. BIÊN BẢN ĐÁNH GIÁ 7 PHÒNG BAN LIÊN BỘ (SECTION ED)

| Phòng ban | Báo cáo hành động thực tế | Trạng thái kỹ thuật |
| :--- | :--- | :---: |
| **1. Product** | **Precision Provenance & Sổ Roster 50 Mục:** Thay thế toàn bộ số đếm tổng quát bằng bảng Roster 50 mục (`staging_ed_identity_roster.json`), phân định chính xác: 8 mục khớp Vault Artifact và 42 mục chờ đối soát. | **READY_FOR_CEO_REVIEW** |
| **2. Design** | **Bảo Toàn Chuẩn UI Gọn & Khả Năng Tiếp Cận:** Duy trì duy nhất 1 nút `Voucher (0)` trong navigation tree (`voucherButtonCount: 1`). Không gắn nhãn hay badge "đã kiểm chứng field" lên các card chỉ có portal identity. | **READY_FOR_CEO_REVIEW** |
| **3. UX/CX** | **Minh Bạch Hóa 100% Nguồn Cung:** Toàn bộ 50 mục hiển thị link cổng chính thức kèm câu khuyến cáo bảo vệ: `JayT chưa đối soát điều kiện chi tiết; vui lòng kiểm tra trực tiếp tại cổng chính thức của đơn vị vận hành.` | **READY_FOR_CEO_REVIEW** |
| **4. Growth** | **Kỷ Luật Đếm Metric Nguồn Cung Thực:** Đo lường chính xác theo số lượng unique `public_item_id` trong roster. Không claim 20 portal khi chưa có artifact đối chứng. Giữ AccessTrade `PORTAL_ACCESS_NOT_VERIFIED`. | **READY_FOR_CEO_REVIEW** |
| **5. Data & Trust** | **Khôi Phục Timestamp Nguyên Văn Gốc Có Milliseconds:** Phục hồi chính xác `original_fetched_at_utc` nguyên văn từ origin manifest (DanaBus = `2026-08-30T07:08:10.372Z` từ Vault DS, liên kết `origin_manifest_sha256`), loại bỏ hoàn toàn làm tròn/remap. | **READY_FOR_CEO_REVIEW** |
| **6. Engineering** | Đóng gói SOT `jayt_storefront_staging_ed.js`, nhúng dấu vân tay Ledger SHA-256 (`a03f7b9fbf...`), phục vụ ổn định trên máy chủ Staging `http://127.0.0.1:4173/` (`HTTP 200 OK`), **0 lỗi console error, 0 cảnh báo console warning**. | **READY_FOR_CEO_REVIEW** |
| **7. QA** | Kiểm thử **45/45 static contract, verbatim lineage & security checks**; thực hiện audit 16/16 capture proofs độc bản với 16 mã băm SHA-256 riêng biệt; xác nhận 100% focusables $\ge 44\times 44\text{px}$. | **READY_FOR_CEO_REVIEW** |

---

### II. BẢNG TRUY NGUYÊN NGUỒN GỐC TIMESTAMP NGUYÊN VĂN GỐC (EXACT-TIME LINEAGE MATRIX ED)

Theo [`07_QUALITY_ASSURANCE/evidence_vault_ed/EVIDENCE_MANIFEST_ED.json`](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/07_QUALITY_ASSURANCE/evidence_vault_ed/EVIDENCE_MANIFEST_ED.json):

| Tệp Bằng Chứng (`artifact_filename`) | Dung lượng (bytes) | Mã băm SHA-256 | Kho Gốc (`origin_vault`) | Timestamp Gốc Nguyên Văn (`original_fetched_at_utc`) | Mã Băm Manifest Gốc (`origin_manifest_sha256`) | Cấp độ Xác thực |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| `artifact_cand_bun_cha_ca_109_city_portal_root.html` | 621.777 | `dd18d5d46d...` | **DS** | `2026-08-30T07:08:06.430Z` | `2374e0ca33dea396...` | PORTAL_IDENTITY_ONLY |
| `artifact_cand_com_ga_a_hai_facebook_shell.html` | 1.542 | `d89fff9b31...` | **DS** | `2026-08-30T07:08:09.223Z` | `2374e0ca33dea396...` | PORTAL_IDENTITY_ONLY |
| `artifact_cand_thu_vien_dut_catalog.html` | 4.658 | `4cb75cbe95...` | **DS** | `2026-08-30T07:08:09.592Z` | `2374e0ca33dea396...` | PORTAL_IDENTITY_ONLY |
| `artifact_cand_thu_vien_dund_portal.html` | 294.832 | `876f6967a9...` | **DS** | `2026-08-30T07:08:09.886Z` | `2374e0ca33dea396...` | PORTAL_IDENTITY_ONLY |
| `artifact_cand_bus_r16a_transit_portal.html` | 115.281 | `db237f0745...` | **DS** | `2026-08-30T07:08:10.372Z` | `2374e0ca33dea396...` | PORTAL_IDENTITY_ONLY |
| `artifact_cand_tngo_bike_portal.html` | 52.968 | `b34fdd823b...` | **DV** | `2026-08-30T08:14:56.678Z` | `bbdb8bbefbc1d060...` | PORTAL_IDENTITY_ONLY |
| `artifact_cand_metiz_cinema_portal.html` | 53.334 | `4b539543df...` | **DV** | `2026-08-30T08:14:56.975Z` | `bbdb8bbefbc1d060...` | PORTAL_IDENTITY_ONLY |
| `artifact_cand_starlight_cinema_portal.html` | 101.350 | `becf409e3c...` | **DV** | `2026-08-30T08:14:57.204Z` | `bbdb8bbefbc1d060...` | PORTAL_IDENTITY_ONLY |
| `artifact_cand_dominos_pizza_portal.html` | 51.512 | `9f78d30d67...` | **DV** | `2026-08-30T08:14:57.673Z` | `bbdb8bbefbc1d060...` | PORTAL_IDENTITY_ONLY |
| `artifact_cand_github_student_pack.html` | 271.480 | `1610df187f...` | **DV** | `2026-08-30T08:15:01.730Z` | `bbdb8bbefbc1d060...` | PORTAL_IDENTITY_ONLY |
| `artifact_cand_jetbrains_student_pack.html` | 61.554 | `0c279ee631...` | **DV** | `2026-08-30T08:15:02.124Z` | `bbdb8bbefbc1d060...` | PORTAL_IDENTITY_ONLY |
| `artifact_cand_highlands_coffee_portal.html` | 29.929 | `03c0029c05...` | **DV** | `2026-08-30T08:15:02.480Z` | `bbdb8bbefbc1d060...` | PORTAL_IDENTITY_ONLY |

---

### III. SỔ ĐỊNH DANH NGUỒN CUNG 50 MỤC (IDENTITY ROSTER SUMMARY ED)

Theo [`07_QUALITY_ASSURANCE/staging_ed_identity_roster.json`](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/07_QUALITY_ASSURANCE/staging_ed_identity_roster.json):

- **Tổng số mục công khai trong cẩm nang:** **50 mục**.
- **Số mục khớp Vault Artifact đối chứng (`VAULT_ARTIFACT_MATCHED`):** **8 mục** (DanaBus, TNGo, Metiz, Starlight, Domino's, GitHub, JetBrains, Highlands).
- **Số mục khai báo link cổng chính thức chờ đối soát (`OFFICIAL_URL_DECLARED_PENDING_VAULT_CAPTURE`):** **42 mục**.
- **Số điều kiện/biểu phí thực địa đã xác minh (`FIELD_TERMS_VERIFIED`):** **0 mục** (Khóa Fail-closed).
- **Số deal thương mại T1:** **0 mục**.
- **Số voucher hiển thị:** **0 mục**.

---

### IV. BỘ 16 BẢN GHI CAPTURE PROOF MỚI (BROWSER PACK ED)

Toàn bộ 16 ảnh chụp kiểm thử tự động tại thời điểm live server hoạt động đạt **16/16 mã băm SHA-256 hoàn toàn riêng biệt**, được lưu trữ tại `07_QUALITY_ASSURANCE/browser_pack_ed/`:

1. `00_desktop_1440_visual_slate_proof.png` (1.086.630 bytes, SHA-256: `067b5489b667e1a3...`)
2. `01_desktop_1440_landmark_hero.png` (495.707 bytes, SHA-256: `39b30ece8e1044fe...`)
3. `02_desktop_1440_featured_deals.png` (402.453 bytes, SHA-256: `f31dccdeda394a18...`)
4. `03_desktop_1440_culinary_story.png` (133.564 bytes, SHA-256: `ec03bb545f414fd9...`)
5. `04_desktop_1440_transit_story.png` (240.490 bytes, SHA-256: `04d9ebaa309bf7cd...`)
6. `05_desktop_1440_leisure_story.png` (146.859 bytes, SHA-256: `a1a3ddac2a292acf...`)
7. `06_desktop_1440_three_lane_wallet.png` (181.208 bytes, SHA-256: `7dc11d777f86b545...`)
8. `07_desktop_1440_explore_directory.png` (123.687 bytes, SHA-256: `15293dbb3b9a52f5...` — **Voucher Hub Duy Nhất 1 Nav**)
9. `08_desktop_1440_dark_mode.png` (496.007 bytes, SHA-256: `8fd830ec09abce10...`)
10. `09_desktop_1440_reduced_motion.png` (395.738 bytes, SHA-256: `962954e943f861c2...`)
11. `10_tablet_768_modern_bento.png` (362.002 bytes, SHA-256: `22857d36736fb1c0...`)
12. `11_mobile_390_fresh_load_first_fold.png` (174.555 bytes, SHA-256: `70dac81c2c3fa34c...`)
13. `12_mobile_390_food_journey_route.png` (50.973 bytes, SHA-256: `2f886c92f16642b0...`)
14. `13_mobile_390_three_lane_wallet.png` (69.071 bytes, SHA-256: `ab7eeee54c0ccef0...`)
15. `14_progressive_disclosure_drawer_open.png` (279.050 bytes, SHA-256: `08ce13d46e0b6218...`)
16. `15_buy_decision_interactive.png` (74.163 bytes, SHA-256: `a7a739e639effbf0...`)

---

### V. CAM KẾT VẬN HÀNH & HÀNG RÀO AN TOÀN

1. **Khóa phát hành Production:** Tiếp tục duy trì trên Staging local `http://127.0.0.1:4173/`, không phát tán ra production khi chưa có phê duyệt từ CEO.
2. **Không Affiliate write / Zero-PII:** Duy trì 100% không chèn mã affiliate, không thu thập cookie hay secret của người dùng.
3. **Kính trình CEO trực tiếp mở trình duyệt kiểm tra live tại `http://127.0.0.1:4173/` và kiểm tra sổ định danh `staging_ed_identity_roster.json` cùng bằng chứng timestamp nguyên văn gốc.**
