# BỘ HỒ SƠ HỘI ĐỒNG LIÊN BỘ — JAYT SECTION DR
## THIẾT LẬP TIME INTEGRITY CONTRACT, RAW SOURCE CAPTURE LOG & CÔ LẬP BATCH CANONICAL QUARANTINE

**Mã hồ sơ:** `COUNCIL_DECISION_PACK_DR_TIME_INTEGRITY_AND_RAW_SOURCE_CAPTURES_20260830`  
**Phiên bản Staging SOT:** `v3.446.0-staging.dr`  
**Chỉ thị chỉ đạo:** JAYT-245 Mục DR (Dòng 2897–2914)  
**Địa chỉ Staging hoạt động:** `http://127.0.0.1:4173/`  
**HTTP Status:** `200 OK` (Content-Type: `text/html; charset=utf-8`)  
**Thời gian lập hồ sơ:** 2026-08-30T13:58:00+07:00  
**Trạng thái Quản trị:** `PENDING_CEO_LIVE_REVIEW` (Tiếp tục nâng cấp, không Go-Live)

---

### I. BIÊN BẢN ĐÁNH GIÁ 7 PHÒNG BAN LIÊN BỘ (SECTION DR)

| Phòng ban | Báo cáo hành động thực tế | Trạng thái kỹ thuật |
| :--- | :--- | :---: |
| **1. Product** | **Thiết lập Time-Integrity & Chronology Contract:** Chuẩn hóa quy tắc bất biến `checked_at <= artifact_generated_at <= signed_at`. Không cho phép bất kỳ timestamp tương lai nào tồn tại trong hệ thống. | **READY_FOR_CEO_REVIEW** |
| **2. Design** | Giữ vững surface F&B no-image Huỳnh Thúc Kháng với icon nhận diện `🍜`, bố cục tương phản cao, typography chuẩn mực; duy trì 3 visual card rights-pass có subject-matching chuẩn xác. | **READY_FOR_CEO_REVIEW** |
| **3. UX/CX** | Đảm bảo luồng khám phá trung thực, nhất quán: Mọi CTA khớp đúng bản chất của nguồn tin (`📍 Xem vị trí & chỉ đường →` cho quán/phố; `🏛️ Mở cổng chính thức →` cho buýt & di sản). | **READY_FOR_CEO_REVIEW** |
| **4. Growth** | **Sản xuất Bảng điểm Nguồn cung DR chuẩn mực:** Báo cáo chính xác số lượng item theo từng trạng thái pipeline: `DISCOVERY_LEAD: 1`, `CAPTURE_RETRY_REQUIRED: 4`, `CANONICAL_SOURCE_FOUND: 0` (đã cách ly), `PUBLIC_ACTIVE_ITEMS: 50`, `T1_DEAL_ELIGIBLE: 0`. | **READY_FOR_CEO_REVIEW** |
| **5. Data & Trust** | **Cô lập 4 ứng viên CANONICAL_SOURCE_FOUND cũ về CAPTURE_RETRY_REQUIRED:** Cơm Gà A Hải (Facebook social shell $\rightarrow$ `UNVERIFIED_BLOCKED_DYNAMIC_SHELL`), Thư viện DUT, Thư viện ĐHĐN, Buýt R16A đều chuyển về hàng đợi chờ kiểm định capture thực địa; Bún Chả Cá 109 giữ ở `DISCOVERY_LEAD`. | **READY_FOR_CEO_REVIEW** |
| **6. Engineering** | Biên dịch và phân phối SOT `jayt_storefront_staging_dr.js`, phục vụ ổn định trên máy chủ Staging `http://127.0.0.1:4173/` (`HTTP 200 OK`), **0 lỗi console error/warning**. | **READY_FOR_CEO_REVIEW** |
| **7. QA** | Quét toàn diện **100% phần tử focusable visible** (Desktop 48 items, Mobile 46 items) đều đạt $\ge 44\times 44\text{px}$ (**0 vi phạm**); kiểm thử 36/36 điều kiện static, chronology & candidate gate (bao gồm cả test case cố tình gán timestamp tương lai để chứng minh validator fail); sản xuất 16/16 capture proofs độc bản với 16 mã băm SHA-256 riêng biệt. | **READY_FOR_CEO_REVIEW** |

---

### II. BẢNG ĐIỂM NGUỒN CUNG THỰC TẾ (SUPPLY PIPELINE SCORECARD DR)

Hội đồng đã cập nhật bảng điểm nguồn cung máy đọc được tại [`07_QUALITY_ASSURANCE/staging_dr_supply_scorecard.json`](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/07_QUALITY_ASSURANCE/staging_dr_supply_scorecard.json):

| Giai đoạn Pipeline | Số lượng Items | Định nghĩa & Trạng thái |
| :--- | :---: | :--- |
| **1. DISCOVERY_LEAD** | **1** | Mới phát hiện qua cổng chung (`CAND_BUN_CHA_CA_109` trỏ `danang.gov.vn`) $\rightarrow$ **Cô lập, không tính vào supply/public**. |
| **2. CAPTURE_RETRY_REQUIRED** | **4** | Toàn bộ 4 candidate cũ bị cô lập do invalid chronology/unverified social shell (Cơm gà A Hải, Thư viện DUT, Thư viện ĐHĐN, Tuyến buýt R16A). |
| **3. CANONICAL_SOURCE_FOUND** | **0** | **Tạm thời bằng 0** (Đã chuyển về hàng đợi kiểm tra lại capture có time integrity). |
| **4. CAPTURE_PENDING** | **4** | Đang chờ đối soát snapshot màn hình và chính sách thực tế. |
| **5. EVIDENCE_COMPLETE** | **0** | Đầy đủ hợp đồng/chứng cứ giá thực. |
| **6. PUBLIC_ACTIVE_ITEMS** | **50** | **20 Cổng chính thức (T2) + 14 Tiện ích công cộng (T3) + 16 Radar theo dõi (T4)**. |
| **7. T1_DEAL_ELIGIBLE** | **0** | **Khóa Fail-closed (0 Deal thương mại khi chưa có hợp đồng kiểm định giá thực DH)**. |

---

### III. SỔ THEO DÕI CANDIDATE CÔ LẬP CHI TIẾT (SECTION DR)

Theo file [`00_PROGRAM_BASELINE/JAYT_SUPPLY_CANDIDATE_COHORT_DR.json`](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/00_PROGRAM_BASELINE/JAYT_SUPPLY_CANDIDATE_COHORT_DR.json) và nhật ký capture [`07_QUALITY_ASSURANCE/staging_dr_raw_source_capture_log.json`](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/07_QUALITY_ASSURANCE/staging_dr_raw_source_capture_log.json):

1. `CAND_BUN_CHA_CA_109` (Bún Chả Cá 109 Nguyễn Chí Thanh):  
   - *Probe Type:* `CITY_PORTAL_ROOT` (`https://danang.gov.vn`)  
   - *Pipeline Stage:* `DISCOVERY_LEAD`  
   - *Decision:* `QUARANTINED_CITY_PORTAL_ROOT` (Không suy diễn nguồn từ domain chính quyền chung).
2. `CAND_COM_GA_A_HAI` (Cơm Gà A Hải Hải Châu):  
   - *Probe Type:* `SOCIAL_PROFILE_SHELL` (`https://www.facebook.com/comgaahaidanang/`)  
   - *Pipeline Stage:* `CAPTURE_RETRY_REQUIRED`  
   - *Decision:* `UNVERIFIED_BLOCKED_DYNAMIC_SHELL` (Facebook login/script wall, không thể trích xuất giá/menu không có hợp đồng).
3. `CAND_THU_VIEN_DUT` (TT Học Liệu ĐH Bách Khoa ĐN):  
   - *Probe Type:* `CAMPUS_PORTAL` (`http://lib.dut.udn.vn/`)  
   - *Pipeline Stage:* `CAPTURE_RETRY_REQUIRED`  
   - *Decision:* `PORTAL_REACHABLE_AWAITING_OPEN_POLICY_VERIFICATION`.
4. `CAND_THU_VIEN_DUND` (TT Học Liệu Đại Học Đà Nẵng):  
   - *Probe Type:* `CAMPUS_PORTAL` (`https://clc.udn.vn/`)  
   - *Pipeline Stage:* `CAPTURE_RETRY_REQUIRED`  
   - *Decision:* `PORTAL_REACHABLE_AWAITING_STUDENT_TERMS_VERIFICATION`.
5. `CAND_BUS_R16A` (Tuyến Buýt Trợ Giá R16A):  
   - *Probe Type:* `TRANSIT_PORTAL` (`https://danangbus.vn/lo-trinh-tuyen-r16a.html`)  
   - *Pipeline Stage:* `CAPTURE_RETRY_REQUIRED`  
   - *Decision:* `ROUTE_PAGE_REACHABLE_AWAITING_TIMETABLE_CAPTURE`.

---

### IV. BỘ 16 BẢN GHI CAPTURE PROOF MỚI (BROWSER PACK DR)

Toàn bộ 16 ảnh chụp kiểm thử tự động tại thời điểm live server hoạt động đạt **16/16 mã băm SHA-256 hoàn toàn riêng biệt**, được lưu trữ tại `07_QUALITY_ASSURANCE/browser_pack_dr/`:

1. `00_desktop_1440_visual_slate_proof.png` (1.086.630 bytes, SHA-256: `067b5489b667e1a3...`)
2. `01_desktop_1440_landmark_hero.png` (537.492 bytes, SHA-256: `cf7993ce6df7df43...`)
3. `02_desktop_1440_featured_deals.png` (193.850 bytes, SHA-256: `63d4e8c187be0896...`)
4. `03_desktop_1440_culinary_story.png` (205.811 bytes, SHA-256: `65074f9d2be2c10b...`)
5. `04_desktop_1440_transit_story.png` (523.518 bytes, SHA-256: `a16a8270ca88d0fe...`)
6. `05_desktop_1440_leisure_story.png` (506.772 bytes, SHA-256: `623b05423851b269...`)
7. `06_desktop_1440_three_lane_wallet.png` (173.550 bytes, SHA-256: `92908c51df5e41dd...`)
8. `07_desktop_1440_explore_directory.png` (81.433 bytes, SHA-256: `9f1edcbc323db08d...`)
9. `08_desktop_1440_dark_mode.png` (493.467 bytes, SHA-256: `85d0a0dcf290fc6f...`)
10. `09_desktop_1440_reduced_motion.png` (392.024 bytes, SHA-256: `ec21b2ca2af6d285...`)
11. `10_tablet_768_modern_bento.png` (360.650 bytes, SHA-256: `71a8bf037be1b6a9...`)
12. `11_mobile_390_fresh_load_first_fold.png` (173.580 bytes, SHA-256: `e3d33a54a39015b3...`)
13. `12_mobile_390_food_journey_route.png` (51.087 bytes, SHA-256: `af44864426d1b8c4...`)
14. `13_mobile_390_three_lane_wallet.png` (71.786 bytes, SHA-256: `9dd1a72eb3bcf176...`)
15. `14_progressive_disclosure_drawer_open.png` (260.694 bytes, SHA-256: `a300549c2d925080...`)
16. `15_buy_decision_interactive.png` (72.277 bytes, SHA-256: `fc88a879b39aaa59...`)

---

### V. CAM KẾT VẬN HÀNG & HÀNG RÀO AN TOÀN

1. **Khóa phát hành Production:** Tiếp tục duy trì trên Staging local `http://127.0.0.1:4173/`, không phát tán ra production khi chưa có phê duyệt từ CEO.
2. **Không Affiliate write / Zero-PII:** Duy trì 100% không chèn mã affiliate, không thu thập cookie hay secret của người dùng.
3. **Kính trình CEO trực tiếp mở trình duyệt kiểm tra live tại `http://127.0.0.1:4173/`.**
