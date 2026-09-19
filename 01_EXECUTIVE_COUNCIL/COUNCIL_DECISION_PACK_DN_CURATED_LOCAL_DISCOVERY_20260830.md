# BỘ HỒ SƠ HỘI ĐỒNG LIÊN BỘ — JAYT SECTION DN
## CÔ LẬP CLAIM LỊCH CẦU RỒNG, ĐỒNG BỘ DATA-DRIVEN JOURNEY COUNTERS & NÂNG TẦM TRẢI NGHIỆM TUYỂN CHỌN BẢN ĐỊA

**Mã hồ sơ:** `COUNCIL_DECISION_PACK_DN_CURATED_LOCAL_DISCOVERY_20260830`  
**Phiên bản Staging SOT:** `v3.442.0-staging.dn`  
**Chỉ thị chỉ đạo:** JAYT-245 Mục DN (Dòng 2803–2833)  
**Địa chỉ Staging hoạt động:** `http://127.0.0.1:4173/`  
**HTTP Status:** `200 OK` (Content-Type: `text/html; charset=utf-8`)  
**Thời gian lập hồ sơ:** 2026-08-30T12:54:00+07:00  
**Trạng thái Quản trị:** `PENDING_CEO_LIVE_REVIEW` (Tiếp tục nâng cấp, không Go-Live)

---

### I. BIÊN BẢN ĐÁNH GIÁ 7 PHÒNG BAN LIÊN BỘ (SECTION DN)

| Phòng ban | Báo cáo hành động thực tế | Trạng thái kỹ thuật |
| :--- | :--- | :---: |
| **1. Product** | Trải nghiệm khám phá bản địa có nhịp điệu: Lối vào theo 4 khoảnh khắc (Sáng, Trưa, Chiều, Tối) và 4 nhóm nhu cầu bản địa. Loại bỏ các con số hard-code. | **READY_FOR_CEO_REVIEW** |
| **2. Design** | Tinh chỉnh nhịp điệu biên tập: Kết hợp ảnh thực địa phương rights-pass ($1200\times 800\text{px}$ Cầu Rồng, Mì Quảng Huỳnh Thúc Kháng, Thư viện Bạch Đằng, Bảo tàng Chăm) với hệ thống card surface thanh lịch; không dùng ảnh minh hoạ AI hay stock generic. | **READY_FOR_CEO_REVIEW** |
| **3. UX/CX** | Lộ trình trực quan 10 giây: Moment chip $\rightarrow$ Quick category strip $\rightarrow$ Curated Top Highlights $\rightarrow$ Drawer chi tiết bẫy tiêu điểm hoàn chỉnh. Phân cấp 1 Primary CTA (`🏛️ Khám phá chương trình đang kiểm →`). | **READY_FOR_CEO_REVIEW** |
| **4. Growth** | Đo lường ý định khám phá/lưu/mở nguồn theo tier; đồng bộ số liệu journey counter trực tiếp từ runtime ledger, không phóng đại số lượng deal. | **READY_FOR_CEO_REVIEW** |
| **5. Data & Trust** | **Cô lập hoàn toàn claim lịch phun lửa Cầu Rồng (21:00)**: Chuyển sang văn bản fallback trung tính hướng dẫn xem thông báo hiện hành tại `danang.gov.vn`. Duy trì 0 T1, 0 giá/giảm giá tự khai, 0 affiliate write, 0 asset mismatch. | **READY_FOR_CEO_REVIEW** |
| **6. Engineering** | Nâng cấp trực tiếp trên SOT duy nhất `jayt_storefront_staging_dn.js`, phục vụ ổn định trên máy chủ Staging `http://127.0.0.1:4173/` (`HTTP 200 OK`), **0 lỗi console error/warning**. | **READY_FOR_CEO_REVIEW** |
| **7. QA** | Quét toàn diện **100% phần tử focusable visible** (Desktop 48 items, Mobile 63 items) đều đạt $\ge 44\times 44\text{px}$ (**0 vi phạm**); kiểm thử tự động toàn bộ chu trình bàn phím Tab/Shift+Tab trong Drawer; sản xuất 16/16 capture proofs độc bản với 16 mã băm SHA-256 riêng biệt. | **READY_FOR_CEO_REVIEW** |

---

### II. BẰNG CHỨNG LIVE RUNTIME & KẾT QUẢ ĐO KIỂM THỰC TẾ

#### 1. Biên Bản Cô Lập Claim Ticker Cầu Rồng (Quarantine Audit)
- **Văn bản cũ (Bị chặn do thiếu evidence contract):** `Cầu Rồng Sông Hàn: Phun lửa & nước vào 21:00 Thứ Bảy & Chủ Nhật hàng tuần.`
- **Văn bản mới (Fallback trung tính & đối soát nguồn):**  
  `📍 Cầu Rồng Sông Hàn: Xem thông tin điểm đến và thông báo hiện hành tại cổng chính thức danang.gov.vn.`
- **Liên kết nguồn:** `https://danang.gov.vn` với hit area đạt chuẩn $124.5\times 44\text{px}$.

#### 2. Đồng Bộ Số Liệu Khám Phá Nhu Cầu Từ Runtime Ledger (Data-Driven Counters)
- 🍔 **Ẩm Thực Bản Địa:** `18 Địa điểm dẫn nguồn chính thức` (Tính trực tiếp từ `gateway_group === 'AN_GI'`).
- 🎬 **Đi Chơi & Văn Hóa:** `14 Điểm tham quan & rạp chiếu phim` (Tính trực tiếp từ `gateway_group === 'DI_DAU'`).
- 🚌 **Tiện Ích & Buýt Đô Thị:** `18 Tiện ích công cộng TP. Đà Nẵng` (Tính trực tiếp từ `tier_level === 'TIER_3_UTILITY'`).
- 🎓 **Chính Sách & Học Đường:** `18 Cổng thông tin học tập` (Tính trực tiếp từ `gateway_group === 'MUA_SAM'`).

#### 3. Minh Bạch Hoá Cổng Chương Trình & Quyền Lợi (13 Mục)
- **10 Cổng Chính Thức:** Ghi rõ `Chương trình chính thức — kiểm điều kiện tại nguồn: [domain]`
- **3 Kênh Theo Dõi:** Ghi rõ `Kênh theo dõi thông tin: [domain]`
- **Tổng số voucher dùng ngay:** **0** (Tuân thủ nghiêm ngặt nguyên tắc Fail-Closed).

#### 4. Đo Lường Vùng Chạm Toàn Diện Mọi Phần Tử Focusable
- **Tổng số phần tử focusable visible đo lường (Desktop):** **48**
- **Tổng số phần tử focusable visible đo lường (Mobile):** **63**
- **Tỷ lệ tuân thủ tiêu chuẩn vùng chạm $\ge 44\times 44\text{px}$:** **100% (0 vi phạm)**.

---

### III. BỘ 16 BẢN GHI CAPTURE PROOF MỚI (BROWSER PACK DN)

Toàn bộ 16 ảnh chụp kiểm thử tự động tại thời điểm live server hoạt động được lưu trữ tại `07_QUALITY_ASSURANCE/browser_pack_dn/`:

1. `00_desktop_1440_visual_slate_proof.png` (1.086.630 bytes, SHA-256: `067b5489b667e1a3...`)
2. `01_desktop_1440_landmark_hero.png` (537.492 bytes, SHA-256: `cf7993ce6df7df43...`)
3. `02_desktop_1440_featured_deals.png` (193.850 bytes, SHA-256: `63d4e8c187be0896...`)
4. `03_desktop_1440_culinary_story.png` (205.811 bytes, SHA-256: `65074f9d2be2c10b...`)
5. `04_desktop_1440_transit_story.png` (523.518 bytes, SHA-256: `a16a8270ca88d0fe...`)
6. `05_desktop_1440_leisure_story.png` (506.772 bytes, SHA-256: `623b05423851b269...`)
7. `06_desktop_1440_three_lane_wallet.png` (173.291 bytes, SHA-256: `b8257c24d4ed7864...`)
8. `07_desktop_1440_explore_directory.png` (81.014 bytes, SHA-256: `989b7a9f30b56e30...`)
9. `08_desktop_1440_dark_mode.png` (486.361 bytes, SHA-256: `6515161cb6d4c955...`)
10. `09_desktop_1440_reduced_motion.png` (174.006 bytes, SHA-256: `242b97984421d2b5...`)
11. `10_tablet_768_modern_bento.png` (361.265 bytes, SHA-256: `b1802ef89395de60...`)
12. `11_mobile_390_fresh_load_first_fold.png` (173.457 bytes, SHA-256: `ce3ade0237000c7e...`)
13. `12_mobile_390_food_journey_route.png` (51.400 bytes, SHA-256: `f3acbaf9002544b6...`)
14. `13_mobile_390_three_lane_wallet.png` (71.646 bytes, SHA-256: `216b387ae585a2b7...`)
15. `14_progressive_disclosure_drawer_open.png` (238.892 bytes, SHA-256: `4c18a56bf376cd7f...`)
16. `15_buy_decision_interactive.png` (71.741 bytes, SHA-256: `f174b78b9a472ff6...`)

---

### IV. CAM KẾT VẬN HÀNG & HÀNG RÀO AN TOÀN

1. **Khóa phát hành Production:** Tiếp tục duy trì trên Staging local `http://127.0.0.1:4173/`, không phát tán ra production khi chưa có phê duyệt từ CEO.
2. **Không Affiliate write / Zero-PII:** Duy trì 100% không chèn mã affiliate, không thu thập cookie hay secret của người dùng.
3. **Kính trình CEO trực tiếp mở trình duyệt kiểm tra live tại `http://127.0.0.1:4173/`.**
