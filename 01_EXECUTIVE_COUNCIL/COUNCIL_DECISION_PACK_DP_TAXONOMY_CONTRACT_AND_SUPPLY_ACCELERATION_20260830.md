# BỘ HỒ SƠ HỘI ĐỒNG LIÊN BỘ — JAYT SECTION DP
## THIẾT LẬP TAXONOMY CONTRACT BẮT BUỘC, CÔ LẬP ASSET MISMATCH & TĂNG TỐC SUPPLY EVIDENCE THẬT

**Mã hồ sơ:** `COUNCIL_DECISION_PACK_DP_TAXONOMY_CONTRACT_AND_SUPPLY_ACCELERATION_20260830`  
**Phiên bản Staging SOT:** `v3.444.0-staging.dp`  
**Chỉ thị chỉ đạo:** JAYT-245 Mục DP (Dòng 2856–2874)  
**Địa chỉ Staging hoạt động:** `http://127.0.0.1:4173/`  
**HTTP Status:** `200 OK` (Content-Type: `text/html; charset=utf-8`)  
**Thời gian lập hồ sơ:** 2026-08-30T13:32:00+07:00  
**Trạng thái Quản trị:** `PENDING_CEO_LIVE_REVIEW` (Tiếp tục nâng cấp, không Go-Live)

---

### I. BIÊN BẢN ĐÁNH GIÁ 7 PHÒNG BAN LIÊN BỘ (SECTION DP)

| Phòng ban | Báo cáo hành động thực tế | Trạng thái kỹ thuật |
| :--- | :--- | :---: |
| **1. Product** | Chuẩn hóa Taxonomy phân tầng: Ẩm thực (F&B) tuyệt đối không được gắn nhãn Tiện ích công cộng; phân định rạch ròi giữa Điểm hẹn khám phá (Place), Tiện ích đô thị (Utility), Cổng chính sách (Programme) và Kênh theo dõi (Radar). | **READY_FOR_CEO_REVIEW** |
| **2. Design** | **Cô lập hoàn toàn Asset Mismatch trên Rail**: Rút ảnh món ăn chung khỏi card Phố Huỳnh Thúc Kháng, chuyển sang surface thiết kế chuẩn design system có biểu tượng nhận diện riêng (`🍜`); giữ ảnh địa phương rights-pass khớp chính xác đối tượng (Cầu Sông Hàn, Bảo tàng Chăm, Thư viện Bạch Đằng). | **READY_FOR_CEO_REVIEW** |
| **3. UX/CX** | Lộ trình khám phá bản địa không nhầm lẫn: CTA của từng thẻ khớp chính xác với bản chất của địa điểm (`📍 Xem vị trí & chỉ đường →` cho quán/phố ẩm thực; `🏛️ Mở cổng chính thức →` cho buýt & di sản; `📚 Xem nội quy & tiện ích →` cho thư viện). | **READY_FOR_CEO_REVIEW** |
| **4. Growth** | Mở Supply Candidate Track song song: Thiết lập sổ theo dõi ứng viên read-only (`JAYT_SUPPLY_CANDIDATE_COHORT_DP.json`) phục vụ nhu cầu cơm trưa, tự học, KTX, xe buýt ngoại thành mà không tạo tài khoản/affiliate write. | **READY_FOR_CEO_REVIEW** |
| **5. Data & Trust** | **Thiết lập Taxonomy & Asset Contract**: Đảm bảo 100% item tuân thủ `content_type`, `tier_level`, `gateway_group`, `subject_id`, `asset_subject_id`. Tuyệt đối 0 vi phạm F&B $\rightarrow$ Utility; 0 ảnh thiếu chứng minh subject-match. | **READY_FOR_CEO_REVIEW** |
| **6. Engineering** | Đóng gói SOT duy nhất `jayt_storefront_staging_dp.js`, phục vụ trực tiếp trên máy chủ Staging `http://127.0.0.1:4173/` (`HTTP 200 OK`), **0 lỗi console error/warning**. | **READY_FOR_CEO_REVIEW** |
| **7. QA** | Quét toàn diện **100% phần tử focusable visible** (Desktop 48 items, Mobile 46 items) đều đạt $\ge 44\times 44\text{px}$ (**0 vi phạm**); kiểm thử 30/30 điều kiện static & taxonomy contract; sản xuất 16/16 capture proofs độc bản với 16 mã băm SHA-256 riêng biệt. | **READY_FOR_CEO_REVIEW** |

---

### II. BẢNG MA TRẬN TAXONOMY & ASSET CONTRACT CHI TIẾT (DP MATRIX)

| Item ID | Content Type | Gateway | Tier Phân Tầng | Asset URL & Subject Match | Action CTA Hợp Lệ |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `PLACE_PHO_AM_THUC_HUYNH_THUC_KHANG` | `PLACE_CULINARY` | `AN_GI` | `TIER_4_RADAR` (`📡 KHÁM PHÁ BẢN ĐỊA`) | `null` *(Quarantine: Không dùng ảnh Mì Quảng chung)* | `📍 Xem vị trí & chỉ đường →` |
| `FACILITY_DANABUS` | `PUBLIC_TRANSIT` | `DI_DAU` | `TIER_2_PROGRAMME` (`🏛️ CỔNG CHÍNH THỨC`) | `danang_real_photo_han_river_bridge.jpg` (Bối cảnh trạm trung chuyển Sông Hàn) | `🏛️ Mở cổng danangbus.vn →` |
| `PLACE_BAO_TANG_CHAM` | `CIVIC_UTILITY` | `DI_DAU` | `TIER_3_UTILITY` (`📍 TIỆN ÍCH CÔNG CỘNG`) | `danang_real_photo_cham_museum.jpg` (Khớp 100% chủ thể Bảo tàng Điêu khắc Chăm) | `🏛️ Mở cổng chammuseum.vn →` |
| `FACILITY_THU_VIEN_TONG_HOP` | `CIVIC_UTILITY` | `MUA_SAM` | `TIER_3_UTILITY` (`📍 TIỆN ÍCH CÔNG CỘNG`) | `danang_real_photo_bach_dang.jpg` (Khớp không gian Thư viện ven sông Bạch Đằng) | `📚 Xem nội quy & tiện ích →` |

---

### III. SỔ THEO DÕI NGUỒN CUNG ỨNG VIÊN (SUPPLY CANDIDATE COHORT)

Hệ thống đã khởi tạo sổ theo dõi read-only [`00_PROGRAM_BASELINE/JAYT_SUPPLY_CANDIDATE_COHORT_DP.json`](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/00_PROGRAM_BASELINE/JAYT_SUPPLY_CANDIDATE_COHORT_DP.json) để tăng tốc nguồn cung thực tế:

1. **Cohort 1 (Cơm trưa & Ẩm thực bình dân Hải Châu):** Cơm Gà A Hải, Bún Chả Cá 109 Nguyễn Chí Thanh $ightarrow$ Chờ chứng thực bảng giá niêm yết độc lập trước khi xem xét T1.
2. **Cohort 2 (Không gian tự học, KTX & Thư viện ĐH Đà Nẵng):** Thư viện ĐH Bách Khoa Đà Nẵng, Trung tâm Học liệu ĐHĐN $ightarrow$ Kiểm tra quy chế mở cửa cho sinh viên ngoài trường.
3. **Cohort 3 (Buýt kết nối ngoại thành & cuối tuần):** Tuyến Buýt R16A (Bến xe Trung Tâm - Kim Liên) $ightarrow$ Kiểm tra biểu đồ giờ chạy cập nhật.

---

### IV. BỘ 16 BẢN GHI CAPTURE PROOF MỚI (BROWSER PACK DP)

Toàn bộ 16 ảnh chụp kiểm thử tự động tại thời điểm live server hoạt động đạt **16/16 mã băm SHA-256 hoàn toàn riêng biệt**, được lưu trữ tại `07_QUALITY_ASSURANCE/browser_pack_dp/`:

1. `00_desktop_1440_visual_slate_proof.png` (1.086.630 bytes, SHA-256: `067b5489b667e1a3...`)
2. `01_desktop_1440_landmark_hero.png` (537.492 bytes, SHA-256: `cf7993ce6df7df43...`)
3. `02_desktop_1440_featured_deals.png` (193.850 bytes, SHA-256: `63d4e8c187be0896...`)
4. `03_desktop_1440_culinary_story.png` (205.811 bytes, SHA-256: `65074f9d2be2c10b...`)
5. `04_desktop_1440_transit_story.png` (523.518 bytes, SHA-256: `a16a8270ca88d0fe...`)
6. `05_desktop_1440_leisure_story.png` (506.772 bytes, SHA-256: `623b05423851b269...`)
7. `06_desktop_1440_three_lane_wallet.png` (173.268 bytes, SHA-256: `3d32875f20354d01...`)
8. `07_desktop_1440_explore_directory.png` (81.711 bytes, SHA-256: `8c3623846322759c...`)
9. `08_desktop_1440_dark_mode.png` (493.106 bytes, SHA-256: `a8735ac14642306d...`)
10. `09_desktop_1440_reduced_motion.png` (391.784 bytes, SHA-256: `55477c2a7b6a51ad...`)
11. `10_tablet_768_modern_bento.png` (360.470 bytes, SHA-256: `556ebb6abcc8f750...`)
12. `11_mobile_390_fresh_load_first_fold.png` (173.571 bytes, SHA-256: `d0a1fc68a87a0b94...`)
13. `12_mobile_390_food_journey_route.png` (51.078 bytes, SHA-256: `2cd51cc4d1663799...`)
14. `13_mobile_390_three_lane_wallet.png` (71.778 bytes, SHA-256: `70361afa170dc6ee...`)
15. `14_progressive_disclosure_drawer_open.png` (260.694 bytes, SHA-256: `1a4fc9b2f2e18aae...`)
16. `15_buy_decision_interactive.png` (72.208 bytes, SHA-256: `807ea5f813b1bf87...`)

---

### V. CAM KẾT VẬN HÀNH & HÀNG RÀO AN TOÀN

1. **Khóa phát hành Production:** Tiếp tục duy trì trên Staging local `http://127.0.0.1:4173/`, không phát tán ra production khi chưa có phê duyệt từ CEO.
2. **Không Affiliate write / Zero-PII:** Duy trì 100% không chèn mã affiliate, không thu thập cookie hay secret của người dùng.
3. **Kính trình CEO trực tiếp mở trình duyệt kiểm tra live tại `http://127.0.0.1:4173/`.**
