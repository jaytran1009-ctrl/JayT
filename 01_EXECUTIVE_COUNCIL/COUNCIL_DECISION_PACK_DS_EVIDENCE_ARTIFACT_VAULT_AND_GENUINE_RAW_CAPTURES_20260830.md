# BỘ HỒ SƠ HỘI ĐỒNG LIÊN BỘ — JAYT SECTION DS
## THIẾT LẬP EVIDENCE ARTIFACT VAULT BẤT BIẾN, GENUINE RAW CAPTURES & CEO-REPRODUCIBLE HASH VERIFICATION

**Mã hồ sơ:** `COUNCIL_DECISION_PACK_DS_EVIDENCE_ARTIFACT_VAULT_AND_GENUINE_RAW_CAPTURES_20260830`  
**Phiên bản Staging SOT:** `v3.447.0-staging.ds`  
**Chỉ thị chỉ đạo:** JAYT-245 Mục DS (Dòng 2917–2932)  
**Địa chỉ Staging hoạt động:** `http://127.0.0.1:4173/`  
**HTTP Status:** `200 OK` (Content-Type: `text/html; charset=utf-8`)  
**Thời gian lập hồ sơ:** 2026-08-30T14:10:00+07:00  
**Trạng thái Quản trị:** `PENDING_CEO_LIVE_REVIEW` (Tiếp tục nâng cấp, không Go-Live)

---

### I. BIÊN BẢN ĐÁNH GIÁ 7 PHÒNG BAN LIÊN BỘ (SECTION DS)

| Phòng ban | Báo cáo hành động thực tế | Trạng thái kỹ thuật |
| :--- | :--- | :---: |
| **1. Product** | **Thiết lập Evidence Artifact Vault:** Bắt buộc mọi probe/capture phải lưu file artifact raw bất biến trên đĩa với dung lượng byte thực, MIME type, HTTP status, page title, source locator và hash SHA-256 đối soát. Không chấp nhận hash đơn độc không kèm payload. | **READY_FOR_CEO_REVIEW** |
| **2. Design** | Duy trì surface F&B no-image Huỳnh Thúc Kháng với icon nhận diện `🍜`, bố cục tương phản cao, typography chuẩn mực; giữ 3 visual card rights-pass có subject-matching chuẩn xác. | **READY_FOR_CEO_REVIEW** |
| **3. UX/CX** | Đảm bảo luồng khám phá trung thực, nhất quán: Mọi CTA khớp đúng bản chất của nguồn tin (`📍 Xem vị trí & chỉ đường →` cho quán/phố; `🏛️ Mở cổng chính thức →` cho buýt & di sản). | **READY_FOR_CEO_REVIEW** |
| **4. Growth** | **Sản xuất Bảng điểm Nguồn cung DS theo đúng thực tế artifact:** Báo cáo chính xác số lượng item theo từng trạng thái pipeline: `DISCOVERY_LEAD: 1`, `CAPTURE_RETRY_REQUIRED: 1`, `CAPTURE_PENDING: 3`, `PUBLIC_ACTIVE_ITEMS: 50`, `T1_DEAL_ELIGIBLE: 0`. | **READY_FOR_CEO_REVIEW** |
| **5. Data & Trust** | **Khởi tạo và đối soát 5 Raw Artifacts trong Vault:** Thực hiện probe HTTP/HTTPS thực tế, lưu toàn bộ payload HTML/headers vào `07_QUALITY_ASSURANCE/evidence_vault_ds/`, lập manifest và viết script verifier độc lập (`verify_ds_evidence_artifacts.js`). | **READY_FOR_CEO_REVIEW** |
| **6. Engineering** | Biên dịch và phân phối SOT `jayt_storefront_staging_ds.js`, phục vụ ổn định trên máy chủ Staging `http://127.0.0.1:4173/` (`HTTP 200 OK`), **0 lỗi console error/warning**. | **READY_FOR_CEO_REVIEW** |
| **7. QA** | Quét toàn diện **100% phần tử focusable visible** (Desktop 48 items, Mobile 46 items) đều đạt $\ge 44\times 44\text{px}$ (**0 vi phạm**); kiểm thử 28/28 điều kiện artifact vault và 34/34 điều kiện static contract; sản xuất 16/16 capture proofs độc bản với 16 mã băm SHA-256 riêng biệt. | **READY_FOR_CEO_REVIEW** |

---

### II. BẢNG ĐIỂM NGUỒN CUNG THỰC TẾ (SUPPLY PIPELINE SCORECARD DS)

Hội đồng đã cập nhật bảng điểm nguồn cung máy đọc được tại [`07_QUALITY_ASSURANCE/staging_ds_supply_scorecard.json`](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/07_QUALITY_ASSURANCE/staging_ds_supply_scorecard.json):

| Giai đoạn Pipeline | Số lượng Items | Định nghĩa & Trạng thái |
| :--- | :---: | :--- |
| **1. DISCOVERY_LEAD** | **1** | Mới phát hiện qua cổng chung (`CAND_BUN_CHA_CA_109` trỏ `danang.gov.vn`) $\rightarrow$ **Cô lập, không tính vào supply/public**. |
| **2. CAPTURE_RETRY_REQUIRED** | **1** | `CAND_COM_GA_A_HAI` (Facebook login/script wall $\rightarrow$ `UNVERIFIED_BLOCKED_DYNAMIC_SHELL`). |
| **3. CANONICAL_SOURCE_FOUND** | **0** | **Tạm thời bằng 0** (Đã chuyển sang CAPTURE_PENDING để đối soát biểu giá/quy chế). |
| **4. CAPTURE_PENDING** | **3** | Đã có raw artifact trong Vault: Thư viện ĐHBK (`lib.dut.udn.vn`), TT Học liệu ĐHĐN (`udn.vn`), Xe buýt Đà Nẵng (`danangbus.vn`). |
| **5. EVIDENCE_COMPLETE** | **0** | Đầy đủ hợp đồng/chứng cứ giá thực. |
| **6. PUBLIC_ACTIVE_ITEMS** | **50** | **20 Cổng chính thức (T2) + 14 Tiện ích công cộng (T3) + 16 Radar theo dõi (T4)**. |
| **7. T1_DEAL_ELIGIBLE** | **0** | **Khóa Fail-closed (0 Deal thương mại khi chưa có hợp đồng kiểm định giá thực DH)**. |

---

### III. BẢNG MANIFEST EVIDENCE ARTIFACTS TRONG VAULT (SECTION DS)

Toàn bộ 5 file raw payload được lưu tại [`07_QUALITY_ASSURANCE/evidence_vault_ds/`](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/07_QUALITY_ASSURANCE/evidence_vault_ds/) và quản lý bằng [`EVIDENCE_MANIFEST_DS.json`](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/07_QUALITY_ASSURANCE/evidence_vault_ds/EVIDENCE_MANIFEST_DS.json):

| Candidate ID | Artifact File | Byte Size | SHA-256 Checksum | HTTP Status & Title | Decision & Stage |
| :--- | :--- | :---: | :--- | :--- | :--- |
| `CAND_BUN_CHA_CA_109` | `artifact_cand_bun_cha_ca_109_city_portal_root.html` | 621.777 | `dd18d5d46d5fbe0a...` | HTTP 200 (Cổng Thông Tin TP Đà Nẵng) | `QUARANTINED_CITY_PORTAL_ROOT` (`DISCOVERY_LEAD`) |
| `CAND_COM_GA_A_HAI` | `artifact_cand_com_ga_a_hai_facebook_shell.html` | 1.542 | `d89fff9b319c7a71...` | HTTP 400 (Dynamic Script Barrier) | `UNVERIFIED_BLOCKED_DYNAMIC_SHELL` (`CAPTURE_RETRY_REQUIRED`) |
| `CAND_THU_VIEN_DUT` | `artifact_cand_thu_vien_dut_catalog.html` | 4.658 | `4cb75cbe95a5705f...` | HTTP 200 (Primo OPAC ĐH Bách Khoa) | `PORTAL_ACCESSIBLE` (`CAPTURE_PENDING`) |
| `CAND_THU_VIEN_DUND` | `artifact_cand_thu_vien_dund_portal.html` | 294.832 | `876f6967a9ac696c...` | HTTP 200 (Đại học Đà Nẵng) | `PORTAL_ACCESSIBLE` (`CAPTURE_PENDING`) |
| `CAND_BUS_R16A` | `artifact_cand_bus_r16a_transit_portal.html` | 115.281 | `db237f074590e2d8...` | HTTP 200 (Xe Buýt Đà Nẵng) | `TRANSIT_PORTAL_ACCESSIBLE` (`CAPTURE_PENDING`) |

---

### IV. BỘ 16 BẢN GHI CAPTURE PROOF MỚI (BROWSER PACK DS)

Toàn bộ 16 ảnh chụp kiểm thử tự động tại thời điểm live server hoạt động đạt **16/16 mã băm SHA-256 hoàn toàn riêng biệt**, được lưu trữ tại `07_QUALITY_ASSURANCE/browser_pack_ds/`:

1. `00_desktop_1440_visual_slate_proof.png` (1.086.630 bytes, SHA-256: `067b5489b667e1a3...`)
2. `01_desktop_1440_landmark_hero.png` (537.492 bytes, SHA-256: `cf7993ce6df7df43...`)
3. `02_desktop_1440_featured_deals.png` (193.850 bytes, SHA-256: `63d4e8c187be0896...`)
4. `03_desktop_1440_culinary_story.png` (205.811 bytes, SHA-256: `65074f9d2be2c10b...`)
5. `04_desktop_1440_transit_story.png` (523.518 bytes, SHA-256: `a16a8270ca88d0fe...`)
6. `05_desktop_1440_leisure_story.png` (506.772 bytes, SHA-256: `623b05423851b269...`)
7. `06_desktop_1440_three_lane_wallet.png` (173.277 bytes, SHA-256: `3b41266c052300aa...`)
8. `07_desktop_1440_explore_directory.png` (81.721 bytes, SHA-256: `b3ae8c31de8871e5...`)
9. `08_desktop_1440_dark_mode.png` (493.304 bytes, SHA-256: `aad2a488a0655049...`)
10. `09_desktop_1440_reduced_motion.png` (391.803 bytes, SHA-256: `9bae3f4b9d6f1475...`)
11. `10_tablet_768_modern_bento.png` (360.485 bytes, SHA-256: `722a578ff63e0050...`)
12. `11_mobile_390_fresh_load_first_fold.png` (173.418 bytes, SHA-256: `a1fe457b988f58b0...`)
13. `12_mobile_390_food_journey_route.png` (50.920 bytes, SHA-256: `592a34731f8222a7...`)
14. `13_mobile_390_three_lane_wallet.png` (71.611 bytes, SHA-256: `64aa8e09623e850b...`)
15. `14_progressive_disclosure_drawer_open.png` (260.694 bytes, SHA-256: `312015df3cb7a8e8...`)
16. `15_buy_decision_interactive.png` (72.635 bytes, SHA-256: `2e4ae3f972986470...`)

---

### V. CAM KẾT VẬN HÀNH & HÀNG RÀO AN TOÀN

1. **Khóa phát hành Production:** Tiếp tục duy trì trên Staging local `http://127.0.0.1:4173/`, không phát tán ra production khi chưa có phê duyệt từ CEO.
2. **Không Affiliate write / Zero-PII:** Duy trì 100% không chèn mã affiliate, không thu thập cookie hay secret của người dùng.
3. **Kính trình CEO trực tiếp mở trình duyệt kiểm tra live tại `http://127.0.0.1:4173/` và kiểm tra các artifact trong `07_QUALITY_ASSURANCE/evidence_vault_ds/`.**
