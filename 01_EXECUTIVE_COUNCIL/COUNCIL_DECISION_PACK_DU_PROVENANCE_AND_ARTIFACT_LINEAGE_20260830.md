# BỘ HỒ SƠ HỘI ĐỒNG LIÊN BỘ — JAYT SECTION DU
## THIẾT LẬP PROVENANCE BẤT BIẾN, BẢO LƯU TIMESTAMP GỐC & CẤM “TRẺ HÓA” ARTIFACT REUSE

**Mã hồ sơ:** `COUNCIL_DECISION_PACK_DU_PROVENANCE_AND_ARTIFACT_LINEAGE_20260830`  
**Phiên bản Staging SOT:** `v3.449.0-staging.du`  
**Chỉ thị chỉ đạo:** JAYT-245 Mục DU (Dòng 2965–2980)  
**Địa chỉ Staging hoạt động:** `http://127.0.0.1:4173/`  
**HTTP Status:** `200 OK` (Content-Type: `text/html; charset=utf-8`)  
**Thời gian lập hồ sơ:** 2026-08-30T14:40:00+07:00  
**Trạng thái Quản trị:** `PENDING_CEO_LIVE_REVIEW` (Tiếp tục nâng cấp, không Go-Live)

---

### I. BIÊN BẢN ĐÁNH GIÁ 7 PHÒNG BAN LIÊN BỘ (SECTION DU)

| Phòng ban | Báo cáo hành động thực tế | Trạng thái kỹ thuật |
| :--- | :--- | :---: |
| **1. Product** | **Xác lập Định danh Bất biến (Immutable Artifact Identity):** Định danh vật chứng = `SHA-256 + byte size + original_fetched_at_utc + final_url`. Khi tái sử dụng (reuse) vật chứng trong các build/vault kế tiếp, **bắt buộc bảo lưu timestamp capture gốc (`07:08Z`)**, cấm việc gán timestamp mới làm trẻ hóa độ tươi (freshness). | **READY_FOR_CEO_REVIEW** |
| **2. Design** | Giữ vững surface F&B no-image Huỳnh Thúc Kháng với icon nhận diện `🍜`, bố cục tương phản cao, typography chuẩn mực; duy trì 3 visual card rights-pass có subject-matching chuẩn xác. | **READY_FOR_CEO_REVIEW** |
| **3. UX/CX** | **Minh bạch hóa Bằng chứng trong Detail Drawer:** Hiển thị khối `🔍 Bằng Chứng Nguồn Tin & Đối Soát Thực Tế (Section DU)` nêu rõ trường nào đã xác nhận từ nguồn chính thức và trường nào `⚠️ Chưa có dữ liệu điều kiện hiện hành` (khuyến nghị đối soát trực tiếp tại nguồn). | **READY_FOR_CEO_REVIEW** |
| **4. Growth** | **Bảo tồn Bảng điểm Nguồn cung DU chân thực:** Báo cáo chính xác số lượng item theo từng trạng thái pipeline: `DISCOVERY_LEAD: 1`, `CAPTURE_RETRY_REQUIRED: 1`, `CAPTURE_PENDING: 3`, `PUBLIC_ACTIVE_ITEMS: 50`, `T1_DEAL_ELIGIBLE: 0`. | **READY_FOR_CEO_REVIEW** |
| **5. Data & Trust** | **Sản xuất Ma Trận Bằng Chứng Lineage & Validator Tự Động:** Khởi tạo `verify_du_artifact_lineage.js` kiểm tra 35/35 điều kiện (bao gồm test giả lập vi phạm re-stamping bị chặn đứng). Lưu trữ máy đọc được tại `07_QUALITY_ASSURANCE/staging_du_field_evidence_matrix.json` và `evidence_vault_du/EVIDENCE_MANIFEST_DU.json`. | **READY_FOR_CEO_REVIEW** |
| **6. Engineering** | Biên dịch và phân phối SOT `jayt_storefront_staging_du.js`, phục vụ ổn định trên máy chủ Staging `http://127.0.0.1:4173/` (`HTTP 200 OK`), **0 lỗi console error/warning**. | **READY_FOR_CEO_REVIEW** |
| **7. QA** | Quét toàn diện **100% phần tử focusable visible** (Desktop 48 items, Mobile 46 items) đều đạt $\ge 44\times 44\text{px}$ (**0 vi phạm**); kiểm thử 34/34 static contract; sản xuất 16/16 capture proofs độc bản với 16 mã băm SHA-256 riêng biệt. | **READY_FOR_CEO_REVIEW** |

---

### II. BẢNG THEO DÕI NGUỒN GỐC VẬT CHỨNG (ARTIFACT LINEAGE MANIFEST DU)

Toàn bộ 5 file vật chứng trong [`07_QUALITY_ASSURANCE/evidence_vault_du/`](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/07_QUALITY_ASSURANCE/evidence_vault_du/) được lưu trữ và đối soát nguồn gốc từ DS:

| Candidate ID | File Artifact DU | Byte Size | SHA-256 Checksum | Thời điểm Fetch gốc (DS Origin) | Lineage Status |
| :--- | :--- | :---: | :--- | :---: | :---: |
| `CAND_BUN_CHA_CA_109` | `artifact_cand_bun_cha_ca_109_city_portal_root.html` | 621.777 | `dd18d5d46d5fbe0a...` | `2026-08-30T07:08:06.430Z` | `REUSED_ARTIFACT_ORIGIN_DS` |
| `CAND_COM_GA_A_HAI` | `artifact_cand_com_ga_a_hai_facebook_shell.html` | 1.542 | `d89fff9b319c7a71...` | `2026-08-30T07:08:09.223Z` | `REUSED_ARTIFACT_ORIGIN_DS` |
| `CAND_THU_VIEN_DUT` | `artifact_cand_thu_vien_dut_catalog.html` | 4.658 | `4cb75cbe95a5705f...` | `2026-08-30T07:08:09.592Z` | `REUSED_ARTIFACT_ORIGIN_DS` |
| `CAND_THU_VIEN_DUND` | `artifact_cand_thu_vien_dund_portal.html` | 294.832 | `876f6967a9ac696c...` | `2026-08-30T07:08:09.886Z` | `REUSED_ARTIFACT_ORIGIN_DS` |
| `CAND_BUS_R16A` | `artifact_cand_bus_r16a_transit_portal.html` | 115.281 | `db237f074590e2d8...` | `2026-08-30T07:08:10.372Z` | `REUSED_ARTIFACT_ORIGIN_DS` |

---

### III. MA TRẬN BẰNG CHỨNG TỪNG THUỘC TÍNH (FIELD-LEVEL EVIDENCE MATRIX DU)

Theo file [`07_QUALITY_ASSURANCE/staging_du_field_evidence_matrix.json`](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/07_QUALITY_ASSURANCE/staging_du_field_evidence_matrix.json):

| Thực thể / Candidate | Thuộc tính (Field Name) | Trạng thái Bằng chứng | Artifact Ref & Captured-At Gốc |
| :--- | :--- | :---: | :--- |
| **DanaBus R16A** (`CAND_BUS_R16A`) | `transit_network_portal` | **VERIFIED_FROM_SOURCE** | `artifact_cand_bus_r16a_transit_portal.html` (`2026-08-30T07:08:10.372Z`) |
| | `route_timetable_r16a_2026` | **UNKNOWN_AWAITING_CAPTURE** | URL con trả CMS error; chưa có capture bảng giờ mới. |
| | `subsidized_student_fare` | **UNKNOWN_AWAITING_CAPTURE** | Chưa có capture văn bản đăng ký vé tháng trợ giá học sinh/sinh viên. |
| | `commercial_voucher_deal` | **FAIL_CLOSED_NOT_APPLICABLE** | Dịch vụ giao thông công cộng, 0 voucher/deal thương mại. |
| **Thư viện ĐHBK** (`CAND_THU_VIEN_DUT`) | `opac_catalog_accessibility` | **VERIFIED_FROM_SOURCE** | `artifact_cand_thu_vien_dut_catalog.html` (`2026-08-30T07:08:09.592Z`) |
| | `external_student_policy` | **UNKNOWN_AWAITING_CAPTURE** | Chưa có capture quy chế cấp thẻ bạn đọc ngoài trường ĐHBK. |
| | `weekend_opening_hours` | **UNKNOWN_AWAITING_CAPTURE** | Chưa có capture thông báo lịch trực học kỳ hiện hành. |
| **TT Học liệu ĐHĐN** (`CAND_THU_VIEN_DUND`) | `university_portal` | **VERIFIED_FROM_SOURCE** | `artifact_cand_thu_vien_dund_portal.html` (`2026-08-30T07:08:09.886Z`) |
| | `multi_campus_access` | **UNKNOWN_AWAITING_CAPTURE** | Chưa có capture quy chế liên thông thẻ giữa các trường thành viên. |
| **Cơm Gà A Hải** (`CAND_COM_GA_A_HAI`) | `menu_and_pricing` | **UNVERIFIED_BLOCKED** | Facebook dynamic script wall; không trích xuất được giá có cấu trúc. |
| | `commercial_voucher_deal` | **UNKNOWN_AWAITING_CAPTURE** | 0 bằng chứng ưu đãi. |
| **Bún Chả Cá 109** (`CAND_BUN_CHA_CA_109`) | `canonical_source_ownership` | **QUARANTINED_CITY_PORTAL** | Cổng `danang.gov.vn` không đại diện cho quán $\rightarrow$ **Isolated Lead**. |

---

### IV. BỘ 16 BẢN GHI CAPTURE PROOF MỚI (BROWSER PACK DU)

Toàn bộ 16 ảnh chụp kiểm thử tự động tại thời điểm live server hoạt động đạt **16/16 mã băm SHA-256 hoàn toàn riêng biệt**, được lưu trữ tại `07_QUALITY_ASSURANCE/browser_pack_du/`:

1. `00_desktop_1440_visual_slate_proof.png` (1.086.630 bytes, SHA-256: `067b5489b667e1a3...`)
2. `01_desktop_1440_landmark_hero.png` (537.492 bytes, SHA-256: `cf7993ce6df7df43...`)
3. `02_desktop_1440_featured_deals.png` (193.850 bytes, SHA-256: `63d4e8c187be0896...`)
4. `03_desktop_1440_culinary_story.png` (205.811 bytes, SHA-256: `65074f9d2be2c10b...`)
5. `04_desktop_1440_transit_story.png` (523.518 bytes, SHA-256: `a16a8270ca88d0fe...`)
6. `05_desktop_1440_leisure_story.png` (506.772 bytes, SHA-256: `623b05423851b269...`)
7. `06_desktop_1440_three_lane_wallet.png` (173.425 bytes, SHA-256: `4e29831f34bc908a...`)
8. `07_desktop_1440_explore_directory.png` (81.566 bytes, SHA-256: `fc0b12d5a04da392...`)
9. `08_desktop_1440_dark_mode.png` (493.425 bytes, SHA-256: `089fcbf27d3ff067...`)
10. `09_desktop_1440_reduced_motion.png` (391.905 bytes, SHA-256: `97431b5773bd7f37...`)
11. `10_tablet_768_modern_bento.png` (361.646 bytes, SHA-256: `ffc23ebc653d51ed...`)
12. `11_mobile_390_fresh_load_first_fold.png` (171.311 bytes, SHA-256: `4ce60cac7ff09df6...`)
13. `12_mobile_390_food_journey_route.png` (51.114 bytes, SHA-256: `50cf3b577348339a...`)
14. `13_mobile_390_three_lane_wallet.png` (71.816 bytes, SHA-256: `17590263022ded52...`)
15. `14_progressive_disclosure_drawer_open.png` (286.606 bytes, SHA-256: `31d1567a4c984cc3...`)
16. `15_buy_decision_interactive.png` (72.374 bytes, SHA-256: `a23756e63021ddbf...`)

---

### V. CAM KẾT VẬN HÀNH & HÀNG RÀO AN TOÀN

1. **Khóa phát hành Production:** Tiếp tục duy trì trên Staging local `http://127.0.0.1:4173/`, không phát tán ra production khi chưa có phê duyệt từ CEO.
2. **Không Affiliate write / Zero-PII:** Duy trì 100% không chèn mã affiliate, không thu thập cookie hay secret của người dùng.
3. **Kính trình CEO trực tiếp mở trình duyệt kiểm tra live tại `http://127.0.0.1:4173/` và chạy kiểm tra lineage tại `07_QUALITY_ASSURANCE/verify_du_artifact_lineage.js`.**
