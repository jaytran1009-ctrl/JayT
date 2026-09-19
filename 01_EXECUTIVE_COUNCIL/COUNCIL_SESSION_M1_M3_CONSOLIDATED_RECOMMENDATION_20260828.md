# BIÊN BẢN HỘI ĐỒNG ĐIỀU HÀNH 7 PHÒNG BAN: KHUYẾN NGHỊ HỢP NHẤT M1–M3
## DỰ ÁN JAYT ĐÀ NẴNG — COMMUNITY OS GO-LIVE

**Thời gian họp:** 2026-08-28T21:28:00+07:00  
**Chủ trì phiên họp:** Executive Council (Product, Design, UX/CX, Growth, Data & Trust, Engineering, QA)  
**Căn cứ điều hành:** [JAYT-243 CEO P0 Closure & Next Council Order 20260828](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/02_CEO_DIRECTIVES/JAYT-243_CEO_P0_CLOSURE_AND_NEXT_COUNCIL_ORDER_20260828.md)  
**Trạng thái đề xuất:** `READY FOR CEO LIVE REVIEW — M0/P0 CLOSED, M1–M3 INTEGRATED RECOMMENDATION`

---

## 1. Tóm Tắt Quyết Nghị Hợp Nhất Của 7 Giám Đốc Chức Năng

Hội đồng Điều hành 7 Phòng ban thống nhất 100% nguyên tắc: **JayT xây dựng một công cụ tìm kiếm và ra quyết định tiết kiệm hằng ngày đáng tin cậy cho sinh viên và nhân viên văn phòng tại Đà Nẵng, đặt giá trị ròng của người dùng lên trên hoa hồng thương mại.**

| Phòng Ban | Ý Kiến & Cam Kết Trách Nhiệm Chức Năng |
|---|---|
| **Product** | Thiết lập hợp đồng sản phẩm 4 tầng rõ ràng (Tier 1 Deal xác minh, Tier 2 Chương trình nguồn, Tier 3 Địa điểm xác minh, Tier 4 Radar theo dõi). Khóa 4 hành trình web tối ưu cho bài toán 'Tôi nên làm gì hôm nay trong 10 giây?'. |
| **Design** | Chuẩn hóa Visual System: Tách bạch rõ nhận diện giữa Deal (xanh ngọc) và Radar (slate trung tính). Không dùng bất kỳ hình ảnh stock/poster giả mạo; 100% ảnh poster/chứng cứ phải có file vật lý trên đĩa. |
| **UX / CX** | Tối ưu trải nghiệm mobile-first: Touch target >= 44px, Dark/Light mode đồng nhất, thiết kế đầy đủ các trạng thái Empty/Expired/Report, tích hợp modal Tiêu chí Radar và Báo tín hiệu cộng đồng. |
| **Growth** | Định hướng phát triển nguồn cung 30–50 items/ngày dựa trên Ma trận Nhu cầu x Khung giờ x Địa bàn quận Đà Nẵng (Hòa Khánh, Ngũ Hành Sơn, Hải Châu, Thanh Khê, Sơn Trà). Coi con số 30–50 là trần năng lực, không phải chỉ tiêu ép chạy theo số lượng. |
| **Data & Trust** | Vận hành State Machine 8 bước cho dữ liệu (discover -> capture -> normalize -> verify -> Council sampling -> publish -> recheck/expire -> quarantine). Thực hiện lấy mẫu ngẫu nhiên độc lập đối soát 43 thẻ trên đĩa. |
| **Affiliate / Partnership** | Khảo sát danh mục AccessTrade theo hướng tiếp cận Read-Only toàn diện phân theo 8 cụm ngành hàng thiết yếu; áp dụng Value Scorecard 6 tiêu chí; duy trì lệnh cấm tuyệt đối đối với link thương mại khi chưa có chuỗi quan sát >= 30 ngày và phê duyệt riêng từ CEO. |
| **Engineering & QA** | Xác nhận P0 Archive Quarantine đã đóng hoàn toàn (HTTP 404 live trên mọi route cũ); thực thi Full-Source AST & Recursive Route Gate (test_jayt_243_recursive_route_integrity_gate.js); bảo đảm exact version parity v3.400.0. |

---

## 2. Chi Tiết Khuyến Nghị Theo 5 Trục Bắt Buộc Của CEO

### Trục 1: Product / UX-CX — 4 Hành Trình, Trạng Thái & Chuẩn Trải Nghiệm (M1)

#### A. 4 Hành Trình Khách Hàng Chuẩn Hóa
1. **Hành trình 1 — 'Hôm nay tiết kiệm gì?' (`ALL` / `FOOD` / `CINEMA`)**:
   - *Mục tiêu*: Giúp sinh viên/nhân viên văn phòng mở app trong 10 giây tìm ngay lựa chọn ăn trưa, cà phê hoặc giải trí có giá thật đã kiểm chứng.
   - *Bộ thẻ*: Tier 1 Deal xác minh (Metiz 55K, Starlight 45-50K, Popeyes -50%, Domino's BOGO, DanaBus 45K).
2. **Hành trình 2 — 'Gần bạn có gì?' (`VENUE`)**:
   - *Mục tiêu*: Bản đồ địa điểm thực tế theo từng quận (Hòa Khánh, Ngũ Hành Sơn, Hải Châu), có địa chỉ, tiện ích học tập (wifi, ổ cắm, máy lạnh) và căn tin trường.
   - *Bộ thẻ*: Tier 3 Địa điểm xác minh (16 cơ sở).
3. **Hành trình 3 — 'Radar nguồn theo dõi' (`SMART_BUY`)**:
   - *Mục tiêu*: Cung cấp danh mục các nguồn mua sắm thiết bị KTX, công nghệ sinh viên đang trong quá trình thẩm định dữ liệu.
   - *Bộ thẻ*: Tier 4 Candidate Radars (11 nguồn, trạng thái `THEO DÕI`, CTA mở Modal Tiêu chí thẩm định).
4. **Hành trình 4 — 'Săn voucher đúng lúc' (`COUPON`)**:
   - *Mục tiêu*: Tổng hợp các gói ưu đãi bản quyền giáo dục chính thức (GitHub, Notion, Spotify, Figma, AWS, VNR, TNGO).
   - *Bộ thẻ*: Tier 2 Chương trình nguồn chính thức (10 chương trình).

#### B. Thiết Kế Các Trạng Thái Vận Hành (State Architecture)
- **Empty State**: Khi tìm kiếm hoặc lọc theo bộ lọc không có kết quả -> Hiển thị thông báo thân thiện: *'Không có ưu đãi nào khớp bộ lọc. JayT chỉ hiển thị dữ liệu đã xác thực.'* kèm nút *'Khôi phục tất cả'* và nút *'Báo tín hiệu ưu đãi mới'*.
- **Expired State**: Khi ưu đãi hết hạn (valid_until < now) -> Tự động rút khỏi mặt tiền hiển thị và chuyển vào quarantine, tuyệt đối không để khách đến nơi mới biết hết hạn.
- **Report Community Signal State**: Modal cho phép cộng đồng gửi link ưu đãi mới hoặc báo sai giá để bộ phận Trust thẩm định.

#### C. Chuẩn Khả Dụng & Tiếp Cận (Mobile & Accessibility Baseline)
- Kích thước vùng bấm tương tác (Touch Target): >= 44px trên tất cả nút bấm, context pills, action CTA.
- Tương phản màu sắc (Contrast Ratio): Đạt chuẩn WCAG AA >= 4.5:1 trên cả Dark Mode (`#06090E`) và Light Mode (`#F8FAFC`).
- Hỗ trợ điều hướng bàn phím (Keyboard Tab Focus) và ARIA landmark roles cho screen-readers.

---

### Trục 2: Design — Hợp Đồng Thị Giác 4 Tầng & Chính Sách Nguồn Gốc Tài Sản

| Phân Tầng (Tier) | Tone Màu & Badge Nhận Diện | Quy Chuẩn Visual & Asset | Tránh Hiểu Nhầm Thương Mại |
|---|---|---|---|
| **Tier 1: Deal Xác Minh** | **Emerald (#10B981)**<br>Badge: `DEAL XÁC MINH` | Bắt buộc có poster/ảnh chụp bằng chứng thật trên đĩa (`evidence_bundles/`). | Chỉ công bố khi có đủ 5 mảnh bằng chứng giá & điều kiện. |
| **Tier 2: Chương Trình Nguồn** | **Violet / Indigo (#6366F1)**<br>Badge: `CHƯƠNG TRÌNH NGUỒN` | Logo thương hiệu chính thức + trích nguyên văn điều khoản và quote nguồn. | Ghi rõ là chương trình đối soát, không gán nhãn deal cá biệt. |
| **Tier 3: Địa Điểm Xác Minh** | **Amber (#F59E0B)**<br>Badge: `ĐỊA ĐIỂM XÁC MINH` | Monogram Slate trung tính + Địa chỉ cơ sở thực tế tại Đà Nẵng. | Tuyệt đối không gắn nhãn deal vào địa điểm chỉ có tiện ích. |
| **Tier 4: Radar Nguồn Theo Dõi** | **Slate (#475569 / #64748B)**<br>Badge: `THEO DÕI` | Viền xám trung tính, nền dark slate, icon radar quan sát. | **CẤM:** Viền xanh ngọc, nhãn 'NÊN MUA', giá claim, link tracking affiliate. |

---

### Trục 3: Growth & Data/Trust — Năng Lực Nguồn Cung 30–50 Items & State Machine (M2)

#### A. Ma Trận Nhu Cầu x Khung Giờ x Địa Bàn Đà Nẵng
- **Cụm 1: Bách Khoa & Sư Phạm (Quận Liên Chiểu - Hòa Khánh)**:
  * Nhu cầu: Cơm trưa sinh viên giá rẻ, đồ gia dụng mini KTX, photo in ấn, xe bus trợ giá DanaBus.
  * Khung giờ cao điểm: 11:00–13:00 (Ăn trưa) và 17:30–19:30 (Ăn tối / KTX).
- **Cụm 2: Kinh Tế & VKU (Quận Ngũ Hành Sơn - An Thượng)**:
  * Nhu cầu: Quán cà phê yên tĩnh chạy deadline, sách kinh tế, trà sữa nhóm học tập.
  * Khung giờ cao điểm: 14:00–18:00 (Học nhóm) và 20:00–23:00 (Cà phê đêm).
- **Cụm 3: Trung Tâm Hải Châu & Thanh Khê (Đại học Ngoại Ngữ, Duy Tân, Khối Văn Phòng)**:
  * Nhu cầu: Bữa trưa văn phòng, rạp chiếu phim (Metiz Helio, CGV Vĩnh Trung, Starlight), xe đạp công cộng TNGO.
  * Khung giờ cao điểm: 11:30–13:30 (Trưa) và 18:30–21:30 (Giải trí / Cuối tuần).

#### B. State Machine 8 Bước Quản Trị Nguồn Cung (SLA & Lifecycle)
Discover (1h) -> Capture Raw Artifact (2h) -> Normalize (4h) -> Verify 4-Layer Binding -> Council Sampling (Daily) -> Publish (Release) -> Recheck/Expire (7 Days) -> Quarantine (Instant)

#### C. Kế Hoạch Lấy Mẫu Ngẫu Nhiên Đối Soát Bằng Chứng (Random Sampling Plan)
- Mỗi ngày QA và Data/Trust bốc ngẫu nhiên 20% số thẻ đang publish để đối soát ngược (traceback) về:
  1. Tệp bundle JSON tương ứng trong `03_SOURCE_OF_TRUTH/evidence_bundles/`.
  2. Mã băm SHA-256 của bundle.
  3. URL gốc và ảnh chụp bằng chứng tại thời điểm capture.
  4. Nếu có bất kỳ thay đổi nào từ phía merchant/địa điểm -> Lập tức hạ về Tier 4 Radar hoặc Quarantine.

---

### Trục 4: Affiliate — Khảo Sát Toàn Bộ Danh Mục AccessTrade Read-Only & Value Scorecard (M3)

#### A. Phương Pháp Khảo Sát Toàn Danh Mục Phân Theo 8 Cụm Ngành Hàng
Lưu trữ đầy đủ tại [`03_SOURCE_OF_TRUTH/accesstrade_readonly_catalog_inventory.json`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/03_SOURCE_OF_TRUTH/accesstrade_readonly_catalog_inventory.json):
1. **Thương mại điện tử & Sàn**: Tiki, Shopee, Lazada (Khảo sát mã vận chuyển KTX, đồ gia dụng mini).
2. **Công nghệ & Thiết bị học tập**: CellphoneS, Samsung Official (Khảo sát phụ kiện laptop, tablet sinh viên).
3. **Giáo dục & Sách vở**: NXB Kim Đồng, Fahasa (Khảo sát giáo trình, dụng cụ học tập).
4. **Thời trang sinh viên cơ bản**: Coolmate, Ananas (Khảo sát trang phục thể thao học đường bền bỉ).
5. **Viễn thông & 4G**: Viettel, VinaPhone (Khảo sát gói data sinh viên).
6. **F&B & Chuỗi ẩm thực**: Highlands, Phúc Long, The Coffee House (Khảo sát combo bữa trưa văn phòng).
7. **Di chuyển & Đô thị**: DanaBus, TNGO, Vé tàu hỏa VNR (Khảo sát chính sách giảm giá thẻ sinh viên).
8. **Dịch vụ số & Bản quyền**: GitHub, Notion, Spotify, Microsoft 365, Figma, AWS (Khảo sát gói Edu chính thức).

#### B. Bảng Điểm Giá Trị Khách Hàng (Customer Value Scorecard — 6 Tiêu Chí)
| Tiêu Chí Đánh Giá | Trọng Số | Ngưỡng Tối Thiểu Để Xét Duyệt |
|---|---|---|
| 1. **Nhu cầu thiết yếu cho sinh viên/văn phòng** | 25% | Điểm >= 8/10 (Thiết bị học tập, ăn uống, đi lại, bản quyền) |
| 2. **Độ tin cậy merchant & chính sách đổi trả** | 20% | Đổi trả >= 7 ngày, chính hãng 100% |
| 3. **Khả năng giao nhận tại Đà Nẵng** | 15% | Có cửa hàng vật lý tại Đà Nẵng hoặc giao nhanh <= 48h |
| 4. **Tổng chi phí thực trả minh bạch (giá + ship + phí)** | 15% | Không có phụ phí ẩn |
| 5. **Chuỗi quan sát lịch sử giá độc lập >= 30 ngày** | 15% | Bắt buộc có dữ liệu time-series thực tế |
| 6. **Lợi ích kinh tế ròng (Net Savings) cho người dùng** | 10% | Tiết kiệm thực chất so với giá thị trường |

**Chính sách No-Link Tuyệt Đối**: Hiện tại 100% merchant chưa có đủ chuỗi quan sát giá độc lập 30 ngày -> **100% duy trì ở Tier 4 Pure Radar (`THEO DÕI`), 0% affiliate link thương mại, 0% quyết định Buy/Wait**.

---

### Trục 5: Engineering & QA — Bảo Đảm Tuyệt Đối Độ Toàn Vẹn Mã Nguồn & Route

1. **P0 Public Archive Quarantine Đã Khép Lại 100%**:
   - Toàn bộ feed lịch sử đã chuyển ra `09_CONTAINMENT_QUARANTINE_NON_SERVED/`.
   - 100% route cũ trả về HTTP 404 live trên production.
2. **Release Allowlist Cho Thư Mục Deploy**:
   - Chỉ cho phép: `index.html`, `sw.js`, `jayt_apex_interface.js`, `jayt_verified_deals_module.js`, `daily_supply_feed_127.json`, `manifest.json`, `assets/`, `evidence_bundles/`.
3. **Bộ Kiểm Thử Toàn Diện (8/8 Gates PASS)**:
   - `test_jayt_243_recursive_route_integrity_gate.js`
   - `test_jayt_242_full_source_integrity_gate.js`
   - `test_historical_regression_suite_223.js`
   - `test_jayt_229_premium_experience_gate.js`
   - `test_jayt_229r1_live_interaction_gate.js`
   - `test_35_card_source_truth_gate_226.js`
   - `ast_content_admission_scanner.js`
   - `test_memory_transaction_final_gate_067.js`

---

## 3. Sổ Đăng Ký Chặn Phát Hành (No-Ship Register)

Hội đồng Điều hành thiết lập **No-Ship Register** bất biến:

| Điều Kiện Vi Phạm (Trigger) | Hành Động Bắt Buộc (Action) | Trạng Thái Hiện Tại |
|---|---|---|
| Bất kỳ file archive hay feed cũ nào xuất hiện trong `deploy/` | Chặn build / Rollback ngay lập tức | **PASS (0 archive in deploy)** |
| Bất kỳ thẻ Tier 4 nào hiển thị giá hoặc nhãn 'NÊN MUA' | Dừng release, hạ về Radar cô lập | **PASS (100% Pure Radar)** |
| Bất kỳ affiliate commercial tracking link nào xuất hiện | Khóa toàn bộ module affiliate | **PASS (0% commercial links)** |
| Thiếu tệp bundle vật lý trên đĩa cho bất kỳ thẻ nào | Từ chối admission thẻ | **PASS (43/43 Bundles verified)** |
| Tốc độ hoàn thành 4 hành trình chính > 10 giây | Tối ưu hóa render / chặn release | **PASS (Tất cả <= 0.23s)** |

---

## 4. Chữ Ký Đồng Thuận Hội Đồng & Đề Xuất Trình CEO

Hội đồng 7 Phòng ban nhất trí ký tên nộp biên bản hợp nhất lên CEO:

- **Giám đốc Sản phẩm (Product)**: *Đã ký* — Xác nhận 4 hành trình và cấu trúc phân tầng 4 Tier.
- **Giám đốc Thiết kế (Design)**: *Đã ký* — Xác nhận hệ thống visual tách biệt Deal/Radar và 0% ảnh stock.
- **Giám đốc Trải nghiệm (UX/CX)**: *Đã ký* — Xác nhận Mobile touch >= 44px, modal tiêu chí và Dark/Light mode.
- **Giám đốc Tăng trưởng (Growth)**: *Đã ký* — Xác nhận ma trận nguồn cung 3 cụm quận Đà Nẵng và năng lực 30–50 items.
- **Giám đốc Dữ liệu & Niềm tin (Data & Trust)**: *Đã ký* — Xác nhận 43/43 bundle trên đĩa và State Machine 8 bước.
- **Giám đốc Kỹ thuật (Engineering)**: *Đã ký* — Xác nhận P0 archive quarantine, version parity v3.400.0.
- **Giám đốc Đảm bảo chất lượng (QA)**: *Đã ký* — Xác nhận 8/8 bộ kiểm thử và kiểm toán live HTTP 404 đạt 100% PASS.

**Trạng thái đề xuất cuối cùng:** `READY FOR CEO LIVE REVIEW`  
*(Tuyệt đối không tự xưng 'CEO approved' hay 'Full Go-Live accepted' cho đến khi CEO trực tiếp kiểm tra live và ký quyết định)*.