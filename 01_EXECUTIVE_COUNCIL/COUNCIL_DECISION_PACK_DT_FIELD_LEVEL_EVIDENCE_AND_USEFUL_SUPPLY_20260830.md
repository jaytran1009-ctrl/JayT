# BỘ HỒ SƠ HỘI ĐỒNG LIÊN BỘ — JAYT SECTION DT
## THIẾT LẬP FIELD-LEVEL EVIDENCE MATRIX, MINH BẠCH BẰNG CHỨNG TỪNG THUỘC TÍNH & SUPPLY HỮU ÍCH AN TOÀN

**Mã hồ sơ:** `COUNCIL_DECISION_PACK_DT_FIELD_LEVEL_EVIDENCE_AND_USEFUL_SUPPLY_20260830`  
**Phiên bản Staging SOT:** `v3.448.0-staging.dt`  
**Chỉ thị chỉ đạo:** JAYT-245 Mục DT (Dòng 2935–2962)  
**Địa chỉ Staging hoạt động:** `http://127.0.0.1:4173/`  
**HTTP Status:** `200 OK` (Content-Type: `text/html; charset=utf-8`)  
**Thời gian lập hồ sơ:** 2026-08-30T14:24:00+07:00  
**Trạng thái Quản trị:** `PENDING_CEO_LIVE_REVIEW` (Tiếp tục nâng cấp, không Go-Live)

---

### I. BIÊN BẢN ĐÁNH GIÁ 7 PHÒNG BAN LIÊN BỘ (SECTION DT)

| Phòng ban | Báo cáo hành động thực tế | Trạng thái kỹ thuật |
| :--- | :--- | :---: |
| **1. Product** | **Chuyển từ URL-Level sang Field-Level Evidence Matrix:** Phân rã từng thực thể thành các thuộc tính cụ thể (`transit_network_portal`, `route_timetable`, `subsidized_fare_policy`, `external_reader_policy`, `menu_pricing`, `voucher_deals`). Không nâng stage toàn diện chỉ dựa vào HTTP 200 cổng chung. | **READY_FOR_CEO_REVIEW** |
| **2. Design** | Giữ vững surface F&B no-image Huỳnh Thúc Kháng với icon nhận diện `🍜`, bố cục tương phản cao, typography chuẩn mực; duy trì 3 visual card rights-pass có subject-matching chuẩn xác. | **READY_FOR_CEO_REVIEW** |
| **3. UX/CX** | **Minh bạch hóa Bằng chứng trong Detail Drawer:** Bổ sung khối `🔍 Bằng Chứng Nguồn Tin & Đối Soát Thực Tế` nêu rõ trường nào đã xác nhận từ nguồn chính thức và trường nào `⚠️ Chưa có dữ liệu điều kiện hiện hành` (khuyến nghị đối soát trực tiếp tại nguồn). | **READY_FOR_CEO_REVIEW** |
| **4. Growth** | **Tập trung supply hữu ích có nguồn đọc được:** Ưu tiên kết nối các cổng tra cứu học tập, xe buýt trợ giá và chính sách công; cô lập social dynamic shell. Báo cáo bảng điểm: `DISCOVERY_LEAD: 1`, `CAPTURE_RETRY_REQUIRED: 1`, `CAPTURE_PENDING: 3`, `PUBLIC_ACTIVE_ITEMS: 50`, `T1_DEAL_ELIGIBLE: 0`. | **READY_FOR_CEO_REVIEW** |
| **5. Data & Trust** | **Sản xuất Ma Trận Bằng Chứng Từng Thuộc Tính (Field Evidence Matrix DT):** Lưu trữ máy đọc được tại `07_QUALITY_ASSURANCE/staging_dt_field_evidence_matrix.json`, liên kết trực tiếp với 5 artifact trong `evidence_vault_dt/` kèm locator trích dẫn và thời hạn freshness. | **READY_FOR_CEO_REVIEW** |
| **6. Engineering** | Biên dịch và phân phối SOT `jayt_storefront_staging_dt.js`, phục vụ ổn định trên máy chủ Staging `http://127.0.0.1:4173/` (`HTTP 200 OK`), **0 lỗi console error/warning**. | **READY_FOR_CEO_REVIEW** |
| **7. QA** | Quét toàn diện **100% phần tử focusable visible** (Desktop 48 items, Mobile 46 items) đều đạt $\ge 44\times 44\text{px}$ (**0 vi phạm**); kiểm thử 34/34 điều kiện static contract & field evidence; sản xuất 16/16 capture proofs độc bản với 16 mã băm SHA-256 riêng biệt. | **READY_FOR_CEO_REVIEW** |

---

### II. MA TRẬN BẰNG CHỨNG TỪNG THUỘC TÍNH (FIELD-LEVEL EVIDENCE MATRIX DT)

Theo file [`07_QUALITY_ASSURANCE/staging_dt_field_evidence_matrix.json`](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/07_QUALITY_ASSURANCE/staging_dt_field_evidence_matrix.json):

| Thực thể / Candidate | Thuộc tính (Field Name) | Trạng thái Bằng chứng | Artifact Ref & Locator Trích Dẫn |
| :--- | :--- | :---: | :--- |
| **DanaBus R16A** (`CAND_BUS_R16A`) | `transit_network_portal` | **VERIFIED_FROM_SOURCE** | `artifact_cand_bus_r16a_transit_portal.html` (`<title>Xe Buýt Đà Nẵng...</title>`) |
| | `route_timetable_r16a_2026` | **UNKNOWN_AWAITING_CAPTURE** | URL con `lo-trinh-tuyen-r16a.html` trả template lỗi CMS; chưa có capture bảng giờ mới. |
| | `subsidized_student_fare` | **UNKNOWN_AWAITING_CAPTURE** | Chưa có capture văn bản đăng ký vé tháng trợ giá học sinh/sinh viên. |
| | `commercial_voucher_deal` | **FAIL_CLOSED_NOT_APPLICABLE** | Dịch vụ giao thông công cộng, 0 voucher/deal thương mại. |
| **Thư viện ĐHBK** (`CAND_THU_VIEN_DUT`) | `opac_catalog_accessibility` | **VERIFIED_FROM_SOURCE** | `artifact_cand_thu_vien_dut_catalog.html` (`primo-explore/search?vid=dut`) |
| | `external_student_policy` | **UNKNOWN_AWAITING_CAPTURE** | Chưa có capture quy chế cấp thẻ bạn đọc ngoài trường ĐHBK. |
| | `weekend_opening_hours` | **UNKNOWN_AWAITING_CAPTURE** | Chưa có capture thông báo lịch trực học kỳ hiện hành. |
| **TT Học liệu ĐHĐN** (`CAND_THU_VIEN_DUND`) | `university_portal` | **VERIFIED_FROM_SOURCE** | `artifact_cand_thu_vien_dund_portal.html` (`<title>Đại học Đà Nẵng</title>`) |
| | `multi_campus_access` | **UNKNOWN_AWAITING_CAPTURE** | Chưa có capture quy chế liên thông thẻ giữa các trường thành viên. |
| **Cơm Gà A Hải** (`CAND_COM_GA_A_HAI`) | `menu_and_pricing` | **UNVERIFIED_BLOCKED** | Facebook dynamic script wall; không trích xuất được giá có cấu trúc. |
| | `commercial_voucher_deal` | **UNKNOWN_AWAITING_CAPTURE** | 0 bằng chứng ưu đãi. |
| **Bún Chả Cá 109** (`CAND_BUN_CHA_CA_109`) | `canonical_source_ownership` | **QUARANTINED_CITY_PORTAL** | Cổng `danang.gov.vn` không đại diện cho quán $\rightarrow$ **Isolated Lead**. |

---

### III. BẢNG ĐIỂM NGUỒN CUNG THỰC TẾ (SUPPLY PIPELINE SCORECARD DT)

| Giai đoạn Pipeline | Số lượng Items | Định nghĩa & Trạng thái |
| :--- | :---: | :--- |
| **1. DISCOVERY_LEAD** | **1** | Mới phát hiện qua cổng chung (`CAND_BUN_CHA_CA_109` trỏ `danang.gov.vn`) $\rightarrow$ **Cô lập**. |
| **2. CAPTURE_RETRY_REQUIRED** | **1** | `CAND_COM_GA_A_HAI` (Facebook login/script barrier $\rightarrow$ `UNVERIFIED_BLOCKED_DYNAMIC_SHELL`). |
| **3. CANONICAL_SOURCE_FOUND** | **0** | **0** (Chuyển sang `CAPTURE_PENDING` để chờ đối soát biểu phí/quy chế chi tiết). |
| **4. CAPTURE_PENDING** | **3** | Đã có portal artifact: Thư viện ĐHBK, TT Học liệu ĐHĐN, Xe buýt Đà Nẵng. |
| **5. EVIDENCE_COMPLETE** | **0** | Đầy đủ hợp đồng/chứng cứ giá thực. |
| **6. PUBLIC_ACTIVE_ITEMS** | **50** | **20 Cổng chính thức (T2) + 14 Tiện ích công cộng (T3) + 16 Radar theo dõi (T4)**. |
| **7. T1_DEAL_ELIGIBLE** | **0** | **Khóa Fail-closed (0 Deal thương mại khi chưa có hợp đồng kiểm định giá thực DH)**. |

---

### IV. BỘ 16 BẢN GHI CAPTURE PROOF MỚI (BROWSER PACK DT)

Toàn bộ 16 ảnh chụp kiểm thử tự động tại thời điểm live server hoạt động đạt **16/16 mã băm SHA-256 hoàn toàn riêng biệt**, được lưu trữ tại `07_QUALITY_ASSURANCE/browser_pack_dt/`:

1. `00_desktop_1440_visual_slate_proof.png` (1.086.630 bytes, SHA-256: `067b5489b667e1a3...`)
2. `01_desktop_1440_landmark_hero.png` (537.492 bytes, SHA-256: `cf7993ce6df7df43...`)
3. `02_desktop_1440_featured_deals.png` (193.850 bytes, SHA-256: `63d4e8c187be0896...`)
4. `03_desktop_1440_culinary_story.png` (205.811 bytes, SHA-256: `65074f9d2be2c10b...`)
5. `04_desktop_1440_transit_story.png` (523.518 bytes, SHA-256: `a16a8270ca88d0fe...`)
6. `05_desktop_1440_leisure_story.png` (506.772 bytes, SHA-256: `623b05423851b269...`)
7. `06_desktop_1440_three_lane_wallet.png` (173.277 bytes, SHA-256: `629baad57cf24f5a...`)
8. `07_desktop_1440_explore_directory.png` (81.721 bytes, SHA-256: `fba67bfd9a4897f2...`)
9. `08_desktop_1440_dark_mode.png` (493.304 bytes, SHA-256: `5a0e980313f8c857...`)
10. `09_desktop_1440_reduced_motion.png` (391.803 bytes, SHA-256: `5e1e4a1a017e852b...`)
11. `10_tablet_768_modern_bento.png` (361.417 bytes, SHA-256: `41656e187bfb3cb0...`)
12. `11_mobile_390_fresh_load_first_fold.png` (171.135 bytes, SHA-256: `5e54c868eb2a6a1a...`)
13. `12_mobile_390_food_journey_route.png` (50.931 bytes, SHA-256: `e523fbb546bf203d...`)
14. `13_mobile_390_three_lane_wallet.png` (71.621 bytes, SHA-256: `00ee9478f72a44bb...`)
15. `14_progressive_disclosure_drawer_open.png` (260.610 bytes, SHA-256: `7fffc5ff07dd64ee...`)
16. `15_buy_decision_interactive.png` (72.556 bytes, SHA-256: `fe935e4070a7b458...`)

---

### V. CAM KẾT VẬN HÀNH & HÀNG RÀO AN TOÀN

1. **Khóa phát hành Production:** Tiếp tục duy trì trên Staging local `http://127.0.0.1:4173/`, không phát tán ra production khi chưa có phê duyệt từ CEO.
2. **Không Affiliate write / Zero-PII:** Duy trì 100% không chèn mã affiliate, không thu thập cookie hay secret của người dùng.
3. **Kính trình CEO trực tiếp mở trình duyệt kiểm tra live tại `http://127.0.0.1:4173/` và kiểm tra ma trận bằng chứng tại `07_QUALITY_ASSURANCE/staging_dt_field_evidence_matrix.json`.**
