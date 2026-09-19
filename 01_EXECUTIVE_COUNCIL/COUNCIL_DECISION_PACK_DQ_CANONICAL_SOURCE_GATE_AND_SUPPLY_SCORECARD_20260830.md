# BỘ HỒ SƠ HỘI ĐỒNG LIÊN BỘ — JAYT SECTION DQ
## THIẾT LẬP CANONICAL SOURCE GATE, CÔ LẬP CANDIDATE KHÔNG CHÍNH CHỦ & XUẤT BẢNG ĐIỂM NGUỒN CUNG MINH BẠCH

**Mã hồ sơ:** `COUNCIL_DECISION_PACK_DQ_CANONICAL_SOURCE_GATE_AND_SUPPLY_SCORECARD_20260830`  
**Phiên bản Staging SOT:** `v3.445.0-staging.dq`  
**Chỉ thị chỉ đạo:** JAYT-245 Mục DQ (Dòng 2877–2894)  
**Địa chỉ Staging hoạt động:** `http://127.0.0.1:4173/`  
**HTTP Status:** `200 OK` (Content-Type: `text/html; charset=utf-8`)  
**Thời gian lập hồ sơ:** 2026-08-30T13:50:00+07:00  
**Trạng thái Quản trị:** `PENDING_CEO_LIVE_REVIEW` (Tiếp tục nâng cấp, không Go-Live)

---

### I. BIÊN BẢN ĐÁNH GIÁ 7 PHÒNG BAN LIÊN BỘ (SECTION DQ)

| Phòng ban | Báo cáo hành động thực tế | Trạng thái kỹ thuật |
| :--- | :--- | :---: |
| **1. Product** | **Thiết lập Canonical Source Gate cho Candidate:** Phân tách rõ ràng giữa URL chính thức trực tiếp của cơ sở với cổng thông tin chung của thành phố (`danang.gov.vn`). Không cho phép suy diễn quyền công bố hay bảng giá từ cổng đô thị chung. | **READY_FOR_CEO_REVIEW** |
| **2. Design** | **Hoàn thiện Surface F&B bản địa chuẩn mực:** Giữ layout surface không ảnh cho Phố Huỳnh Thúc Kháng với icon nhận diện `🍜`, bố cục tương phản cao, typography vững chãi, không dùng minh họa giả lập ảnh thật. | **READY_FOR_CEO_REVIEW** |
| **3. UX/CX** | Luồng tương tác giữ vững độ tin cậy: Mọi hành động đều khớp bản chất của nguồn tin (`📍 Xem vị trí & chỉ đường →` cho điểm hẹn; `🏛️ Mở cổng chính thức →` cho buýt & di sản). | **READY_FOR_CEO_REVIEW** |
| **4. Growth** | **Sản xuất Bảng điểm Nguồn cung (Supply Scorecard) theo từng phân tầng:** Báo cáo chính xác số lượng item theo từng trạng thái pipeline (`DISCOVERY_LEAD`, `CANONICAL_SOURCE_FOUND`, `PUBLIC_T2_T3_T4`, `T1_ELIGIBLE`), không gộp chung vô căn cứ là "50 deal". | **READY_FOR_CEO_REVIEW** |
| **5. Data & Trust** | **Cô lập ứng viên Bún Chả Cá 109 về `DISCOVERY_LEAD`:** Xóa bỏ trạng thái `SOURCE_HOST_VERIFIED` vì `danang.gov.vn` chỉ là domain cổng thành phố, không phải canonical source của quán ăn. 100% item công khai có nguồn trực tiếp rõ ràng. | **READY_FOR_CEO_REVIEW** |
| **6. Engineering** | Biên dịch và phân phối SOT `jayt_storefront_staging_dq.js`, phục vụ ổn định trên máy chủ Staging `http://127.0.0.1:4173/` (`HTTP 200 OK`), **0 lỗi console error/warning**. | **READY_FOR_CEO_REVIEW** |
| **7. QA** | Quét toàn diện **100% phần tử focusable visible** (Desktop 48 items, Mobile 46 items) đều đạt $\ge 44\times 44\text{px}$ (**0 vi phạm**); kiểm thử 36/36 điều kiện static, taxonomy & candidate gate; sản xuất 16/16 capture proofs độc bản với 16 mã băm SHA-256 riêng biệt. | **READY_FOR_CEO_REVIEW** |

---

### II. BẢNG ĐIỂM NGUỒN CUNG THỰC TẾ (SUPPLY PIPELINE SCORECARD DQ)

Hội đồng đã phân tách rõ ràng từng giai đoạn của chuỗi cung ứng tại file machine-readable [`07_QUALITY_ASSURANCE/staging_dq_supply_scorecard.json`](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/07_QUALITY_ASSURANCE/staging_dq_supply_scorecard.json):

| Giai đoạn Pipeline | Số lượng Items | Định nghĩa & Trạng thái |
| :--- | :---: | :--- |
| **1. DISCOVERY_LEAD** | **1** | Mới phát hiện qua tìm kiếm/cổng chung (`CAND_BUN_CHA_CA_109` trỏ `danang.gov.vn`) $\rightarrow$ **Cô lập, không tính vào supply/public**. |
| **2. CANONICAL_SOURCE_FOUND** | **4** | Đã tìm thấy trang web/fanpage chính chủ trực tiếp (Cơm gà A Hải, Thư viện DUT, Thư viện ĐHĐN, Tuyến buýt R16A) $\rightarrow$ Đang chờ bảng giá & capture. |
| **3. CAPTURE_PENDING** | **0** | Đang chờ đối soát snapshot màn hình giá niêm yết. |
| **4. EVIDENCE_COMPLETE** | **0** | Đầy đủ hợp đồng/chứng cứ giá thực. |
| **5. PUBLIC_ACTIVE_ITEMS** | **50** | **20 Cổng chính thức (T2) + 14 Tiện ích công cộng (T3) + 16 Radar theo dõi (T4)**. |
| **6. T1_DEAL_ELIGIBLE** | **0** | **Khóa Fail-closed (0 Deal thương mại khi chưa có hợp đồng kiểm định giá thực DH)**. |

---

### III. SỔ THEO DÕI CANDIDATE CÔ LẬP CHI TIẾT (SECTION DQ)

Theo file [`00_PROGRAM_BASELINE/JAYT_SUPPLY_CANDIDATE_COHORT_DQ.json`](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/00_PROGRAM_BASELINE/JAYT_SUPPLY_CANDIDATE_COHORT_DQ.json):

1. `CAND_BUN_CHA_CA_109` (Bún Chả Cá 109 Nguyễn Chí Thanh):  
   - *Discovery Lead URL:* `https://danang.gov.vn` (Cổng TP)  
   - *Canonical Source URL:* `null`  
   - *Pipeline Stage:* `DISCOVERY_LEAD` *(Đã cô lập)*  
   - *Ghi chú:* Không suy diễn nguồn từ domain chính quyền chung. Lưu tại hàng đợi private.
2. `CAND_COM_GA_A_HAI` (Cơm Gà A Hải Hải Châu):  
   - *Canonical Source URL:* `https://www.facebook.com/comgaahaidanang/` (Fanpage chính thức)  
   - *Pipeline Stage:* `CANONICAL_SOURCE_FOUND`  
   - *Ghi chú:* Đang chờ capture bảng giá niêm yết thực tế.

---

### IV. BỘ 16 BẢN GHI CAPTURE PROOF MỚI (BROWSER PACK DQ)

Toàn bộ 16 ảnh chụp kiểm thử tự động tại thời điểm live server hoạt động đạt **16/16 mã băm SHA-256 hoàn toàn riêng biệt**, được lưu trữ tại `07_QUALITY_ASSURANCE/browser_pack_dq/`:

1. `00_desktop_1440_visual_slate_proof.png` (1.086.630 bytes, SHA-256: `067b5489b667e1a3...`)
2. `01_desktop_1440_landmark_hero.png` (537.492 bytes, SHA-256: `cf7993ce6df7df43...`)
3. `02_desktop_1440_featured_deals.png` (193.850 bytes, SHA-256: `63d4e8c187be0896...`)
4. `03_desktop_1440_culinary_story.png` (205.811 bytes, SHA-256: `65074f9d2be2c10b...`)
5. `04_desktop_1440_transit_story.png` (523.518 bytes, SHA-256: `a16a8270ca88d0fe...`)
6. `05_desktop_1440_leisure_story.png` (506.772 bytes, SHA-256: `623b05423851b269...`)
7. `06_desktop_1440_three_lane_wallet.png` (173.398 bytes, SHA-256: `b1a4c5d1f5c44706...`)
8. `07_desktop_1440_explore_directory.png` (81.906 bytes, SHA-256: `e55ac91589a09f9e...`)
9. `08_desktop_1440_dark_mode.png` (493.297 bytes, SHA-256: `c6b2f82b2c09f553...`)
10. `09_desktop_1440_reduced_motion.png` (391.877 bytes, SHA-256: `13f3b61644177cb5...`)
11. `10_tablet_768_modern_bento.png` (360.597 bytes, SHA-256: `d027ef3d6f8d9258...`)
12. `11_mobile_390_fresh_load_first_fold.png` (173.532 bytes, SHA-256: `3b24a8db9e58797f...`)
13. `12_mobile_390_food_journey_route.png` (51.035 bytes, SHA-256: `76afff8ba07ad6c2...`)
14. `13_mobile_390_three_lane_wallet.png` (71.733 bytes, SHA-256: `9c69594cf2b84ebb...`)
15. `14_progressive_disclosure_drawer_open.png` (260.647 bytes, SHA-256: `d61a55000ad6f0ec...`)
16. `15_buy_decision_interactive.png` (72.809 bytes, SHA-256: `77462f19bebc0db8...`)

---

### V. CAM KẾT VẬN HÀNH & HÀNG RÀO AN TOÀN

1. **Khóa phát hành Production:** Tiếp tục duy trì trên Staging local `http://127.0.0.1:4173/`, không phát tán ra production khi chưa có phê duyệt từ CEO.
2. **Không Affiliate write / Zero-PII:** Duy trì 100% không chèn mã affiliate, không thu thập cookie hay secret của người dùng.
3. **Kính trình CEO trực tiếp mở trình duyệt kiểm tra live tại `http://127.0.0.1:4173/`.**
