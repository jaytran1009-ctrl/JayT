# GÓI HỒ SƠ ĐÁNH GIÁ THỊ GIÁC & CHIẾN LƯỢC: `JAYT-096-CUSTOMER-JOURNEY-NORTH-STAR-AND-COMMUNITY-DISCOVERY`

> **Tuyên ngôn North Star**: JayT không phải sổ tay nhập chi tiêu. JayT là **Community Deal Discovery Engine** cho sinh viên và dân văn phòng Đà Nẵng:  
> *“Biết hôm nay đi đâu, ăn gì, mua gì đáng tiền; có thể kiểm tra nhanh và rủ nhóm ngay.”*

---

## 1. BATCH A — GHI NHỚ DỰ ÁN & KỶ LUẬT ĐIỀU HÀNH
- **Cập nhật Bộ Nhớ Dự Án**: `PROJECT_MEMORY.md` đã nâng lên phiên bản `v3.199.0` qua `memory_transaction_manager_057.js` (Mã băm SHA-256: `e4a47c6592318a1eea584832d23eac78f29e2244161aa150708a58fec8d712a3`).
- **Khế Ước North Star v2.0.0**: Ban hành [`03_SOURCE_OF_TRUTH/customer_journey_north_star.json`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/03_SOURCE_OF_TRUTH/customer_journey_north_star.json) định nghĩa 11 kịch bản khách hàng, 5 thời điểm trong ngày, mô hình 3 tầng dữ liệu và 5 cỗ máy khám phá.
- **Kỷ Luật Đóng Băng Candidate**:
  - Không tạo `RELEASE_CANDIDATE_096.json`.
  - Giữ nguyên các biên lai sự cố append-only `094`, `094A`, `094B` và biên lai sửa lỗi taxonomy `095`.

---

## 2. BATCH B — KIẾN TRÚC TRẢI NGHIỆM 5 THỜI ĐIỂM TRONG NGÀY (24H JOURNEY)

Giao diện trang chủ tích hợp thanh điều hướng **24h Time-of-Day Context Dock** dạng pill 44px hỗ trợ cuộn mượt và snap theo trục ngang:

| Thời Điểm | Biểu Tượng & Nhãn | Nhu Cầu Cốt Lõi | Hero Title & Subtitle | CTA Theo Ngữ Cảnh | Context Cards Stack (100% Provenance) |
|:---|:---:|:---|:---|:---|:---|
| **07:30** | `🌅 Cà phê & Đi lại` | Quán cà phê mở sớm, tiện đường đi làm / đi học | *Cà Phê Sáng & Điểm Hẹn Tiện Đường Đi Làm / Đi Học*<br>Khám phá quán cà phê mở sớm; ưu đãi online cần xác nhận tại nguồn. | `Xem 9 điểm hẹn xác minh ↓` | • [P] Phê La (36 Bạch Đằng)<br>• Gong Cha (01 Nguyễn Văn Linh) |
| **11:15** | `🍚 Cơm trưa & Fastfood` | Bữa trưa nhanh, bán kính gần, combo nhóm | *Bữa Trưa Nhanh & Điểm Ăn Uống Văn Phòng / Sinh Viên*<br>Danh sách điểm đến F&B đã đối soát thực tế tại Hải Châu, Sơn Trà, Thanh Khê. | `Xem danh sách quán ăn ↓` | • Jollibee Vincom (910A Ngô Quyền)<br>• Gong Cha (01 Nguyễn Văn Linh) |
| **14:15** | `🧋 Trà chiều & Cà phê` | Trà sữa, cà phê gặp gỡ đối tác hoặc giải lao | *Trà Chiều & Không Gian Cà Phê Làm Việc / Gặp Gỡ*<br>Không gian gặp gỡ trà sữa, cà phê trung tâm với đối soát thực tế. | `Xem quán trà & cà phê ↓` | • Gong Cha (01 Nguyễn Văn Linh)<br>• [P] Phê La (36 Bạch Đằng) |
| **17:30** | `🎬 Tan làm & Rạp phim` | Rạp chiếu phim, ăn tối nhóm, điểm hẹn tối | *Kèo Tối, Rạp Chiếu Phim & Điểm Hẹn Tụ Tập Nhóm*<br>Cụm rạp Metiz, CGV Vincom, Galaxy đã đối soát địa chỉ. | `Xem cụm rạp chiếu phim ↓` | • Metiz Cinema (Số 01 Đường 2/9)<br>• CGV Vincom (910A Ngô Quyền) |
| **21:00** | `🌙 Ăn đêm & Chia bill` | Chia tiền bàn ăn, đối soát thực trả, gửi tín hiệu | *Ăn Đêm, Chia Tiền Bàn Ăn & Báo Deal Cộng Đồng*<br>Tính toán thực trả nhóm nhanh chóng và chia sẻ tín hiệu ưu đãi. | `Xem 9 địa điểm xác minh ↓` / `Mở Smart Split Bill 🧮` | • Galaxy Cinema Co.opmart<br>• Metiz Cinema (Số 01 Đường 2/9) |

---

## 3. BATCH C — MÔ HÌNH BA TẦNG THÔNG TIN TRỰC QUAN & TRUNG THỰC

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│ 🟢 TẦNG XANH (Emerald Tier — Ưu Đãi Đã Xác Thực)                             │
│   • Tiêu chí: Đủ evidence vật lý trên đĩa, còn hạn, đúng chi nhánh Đà Nẵng. │
│   • Hiện trạng: Chưa có ưu đãi thương mại live hôm nay (Honest Empty State)  │
├─────────────────────────────────────────────────────────────────────────────┤
│ 🔵 TẦNG XANH DƯƠNG (Cobalt Tier — Địa Điểm Nên Theo Dõi / Watchlist)         │
│   • Tiêu chí: Đã xác minh địa chỉ & hoạt động thực tế tại Đà Nẵng.           │
│   • Nhãn: 📍 ĐÃ XÁC MINH ĐỊA CHỈ                                            │
│   • Disclaimer bắt buộc: "Quán hoạt động; ưu đãi online chưa đủ dữ liệu."    │
│   • Cấm tuyệt đối: "đang giảm", "có voucher", "rẻ hơn", "deal hot"          │
├─────────────────────────────────────────────────────────────────────────────┤
│ 🟡 TẦNG HỔ PHÁCH (Amber Tier — Tín Hiệu Cộng Đồng / Cần Kiểm Tra Tại Nguồn)  │
│   • Tiêu chí: Tín hiệu từ cộng đồng hoặc ưu đãi người dùng cần tự kiểm tra.  │
│   • Nhãn: ⚠️ CHƯA XÁC MINH                                                  │
│   • Disclaimer bắt buộc: "Chưa xác minh — hãy hỏi quán / kiểm tra giỏ hàng" │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 4. BATCH D — NĂM CỖ MÁY THEO HÀNH TRÌNH KHÁCH HÀNG

1. **Cinema Radar & Lịch Tuần / Tháng**:
   - Theo dõi 4 cụm rạp lớn tại Đà Nẵng: `Metiz Cinema Helio`, `CGV Vincom Đà Nẵng`, `CGV Vĩnh Trung Plaza`, `Galaxy Cinema Co.opmart`.
   - Minh bạch chính sách thành viên (Metiz Member 2026, CGV FanC, Galaxy Star) với capture vật lý.
2. **Local Habit Engine (5 Cụm Khu Vực Đà Nẵng)**:
   - `📍 Hải Châu` (Trung tâm, Bạch Đằng, Nguyễn Văn Linh)
   - `📍 Sơn Trà` (Vincom, Ngô Quyền)
   - `📍 Thanh Khê` (Co.opmart, Điện Biên Phủ, Lý Thái Tổ)
   - `📍 Hòa Khánh / Liên Chiểu` (Cụm sinh viên Bách Khoa / Sư Phạm)
   - `📍 Ngũ Hành Sơn` (Cụm sinh viên Kinh Tế / FPT).
3. **Cross-App Comparator (So Sánh Thực Trả)**:
   - Máy tính đối soát chi phí khi người dùng tự nhập mã / phí ship; mặc định trả `SIGNAL_ONLY`, tuyệt đối không tự bịa app nào rẻ nhất.
4. **E-commerce Price X-Ray**:
   - Công cụ kiểm tra minh bạch lịch sử giá khi có dữ liệu thật từ người dùng, không gán "đáy 90 ngày" từ dữ liệu thiếu.
5. **Group Split & Community Pipeline**:
   - Fintech Split Bill chia bill tại chỗ (100% client-side), form báo deal Zero-PII, mọi tín hiệu mới mặc định `CHƯA XÁC MINH`.

---

## 5. BATCH E — MỞ RỘNG NGUỒN CUNG THEO COHORT

| Cohort Nhu Cầu | Thương Hiệu / Điểm Đến | Trạng Thái Dữ Liệu | Nguồn / Provenance Capture Trên Đĩa |
|:---|:---|:---:|:---|
| **Rạp Chiếu Phim** | Metiz Cinema Helio (Số 01 Đường 2/9, Hải Châu) | `VERIFIED_LOCATION_ONLY` | `four_layer_dataset.json` (`LOC_001_METIZ`) |
| **Rạp Chiếu Phim** | CGV Vincom Đà Nẵng (910A Ngô Quyền, Sơn Trà) | `VERIFIED_LOCATION_ONLY` | `four_layer_dataset.json` (`LOC_002_CGV_VINCOM`) |
| **Rạp Chiếu Phim** | Galaxy Cinema (478 Điện Biên Phủ, Thanh Khê) | `VERIFIED_LOCATION_ONLY` | `four_layer_dataset.json` (`LOC_003_GALAXY_COOP`) |
| **Cà Phê & Trà Sữa**| [P] Phê La (36-38 Bạch Đằng, Hải Châu) | `VERIFIED_LOCATION_ONLY` | `TARGET_088D_177` (36 Bạch Đằng) |
| **Cà Phê & Trà Sữa**| Gong Cha (01 Nguyễn Văn Linh, Hải Châu) | `VERIFIED_LOCATION_ONLY` | `TARGET_088A_BR_149` (01 Nguyễn Văn Linh) |
| **Ăn Trưa & Fastfood**| Jollibee Vincom (910A Ngô Quyền, Sơn Trà) | `VERIFIED_LOCATION_ONLY` | `four_layer_dataset.json` (`LOC_004_JOLLIBEE_VINCOM`) |
| **Ăn Trưa & Fastfood**| Jollibee Lý Thái Tổ (99 Lý Thái Tổ, Thanh Khê) | `VERIFIED_LOCATION_ONLY` | `four_layer_dataset.json` (`LOC_005_JOLLIBEE_LTT`) |

---

## 6. BATCH F — BẰNG CHỨNG RENDER HTTP STAGING VẬT LÝ

| Viewport | Tệp Ảnh Chụp Đầy Đủ | Kích thước | SHA-256 Băm Vật Lý | Tràn Ngang |
|:---|:---|:---|:---|:---:|
| **Desktop 1440px** | [`desktop_1440px_north_star_review_096.png`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/runtime_evidence/screenshots_096/desktop_1440px_north_star_review_096.png) | 513,191 B | `35dd2ca321e2266a...` | **0 (PASS)** |
| **Tablet 768px** | [`tablet_768px_north_star_review_096.png`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/runtime_evidence/screenshots_096/tablet_768px_north_star_review_096.png) | 519,694 B | `32727fd56007dd91...` | **0 (PASS)** |
| **Mobile 390px** | [`mobile_390px_north_star_review_096.png`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/runtime_evidence/screenshots_096/mobile_390px_north_star_review_096.png) | 510,711 B | `6b77470d17861183...` | **0 (PASS)** |

---

## 7. KẾT QUẢ KIỂM THỬ TOÀN BỘ HỆ THỐNG (37/37 PASS)

- [`test_customer_journey_north_star_096.js`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/test_customer_journey_north_star_096.js): **12/12 PASS**
- [`test_project_memory_consistency.js`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/test_project_memory_consistency.js): **10/10 PASS**
- [`test_network_airgap_and_strict_mem07_093b.js`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/test_network_airgap_and_strict_mem07_093b.js): **5/5 PASS**
- [`test_semantic_and_memory_correction_093a.js`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/test_semantic_and_memory_correction_093a.js): **10/10 PASS**
