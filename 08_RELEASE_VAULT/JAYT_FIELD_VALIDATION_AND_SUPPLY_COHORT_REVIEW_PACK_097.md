# GÓI HỒ SƠ ĐÁNH GIÁ THỰC ĐỊA & NGUỒN CUNG: `JAYT-097-FIELD-VALIDATION-AND-SUPPLY-COHORT`

> **Tuyên ngôn North Star**: JayT không phải sổ tay nhập chi tiêu. JayT là **Community Deal Discovery Engine** cho sinh viên và dân văn phòng Đà Nẵng:  
> *“Biết hôm nay đi đâu, ăn gì, mua gì đáng tiền; có thể kiểm tra nhanh và rủ nhóm ngay.”*

---

## 1. KHẮC PHỤC QUẢN TRỊ & BIÊN LAI SỬA LỖI APPEND-ONLY (CORRECTION RECEIPT 097)

- **Biên lai sửa lỗi**: [`08_RELEASE_VAULT/CORRECTION_RECEIPT_097_TAXONOMY_AND_BROWSER_E2E_RIGOR.json`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/08_RELEASE_VAULT/CORRECTION_RECEIPT_097_TAXONOMY_AND_BROWSER_E2E_RIGOR.json)
- **Xử lý triệt để 2 lỗ hổng**:
  1. **Lỗ hổng Taxonomy**: Đã gỡ bỏ hoàn toàn `095` và `096` khỏi `HISTORICAL_CEO_APPROVED_WORK_ORDERS` trong [`07_QUALITY_ASSURANCE/memory_transaction_manager_057.js`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/memory_transaction_manager_057.js).
  2. **Negative Test Fail-Closed**: Đã bổ sung kiểm thử tiêu cực chặn fail-closed ngay lập tức mọi claim `ACCEPTED BY CEO` hoặc `CEO APPROVED` cho `094`, `094A`, `094B`, `095`, `096`, `097`.
  3. **Tái cấu trúc Browser E2E**: Loại bỏ toàn bộ `test_helper_097.js` và thay bằng kiểm thử trình duyệt thực tế Puppeteer trên máy chủ HTTP Staging cục bộ với việc đọc trực tiếp `localStorage` và chặn 100% request ra ngoài localhost.

---

## 2. MA TRẬN LUỒNG HÀNH TRÌNH KHÁCH HÀNG 5 KHUNG GIỜ (CUSTOMER-FLOW MATRIX)

Luồng tương tác đã được kiểm thử mô phỏng tự động bằng Puppeteer trên máy chủ HTTP Staging cục bộ:

```text
[ Người dùng truy cập Staging ]
        │
        ├──► 07:30 (Cà phê sáng & Đi lại) ──► Click Dock ──► Hero: "Cà Phê Sáng & Điểm Hẹn Tiện Đường..." ──► Card: Phê La Bạch Đằng, Gong Cha NVL
        │
        ├──► 11:15 (Cơm trưa & Fastfood)  ──► Click Dock ──► Hero: "Bữa Trưa Nhanh & Điểm Ăn Uống..."       ──► Card: Jollibee Vincom, Gong Cha NVL
        │
        ├──► 14:15 (Trà chiều & Cà phê)   ──► Click Dock ──► Hero: "Trà Chiều & Không Gian Cà Phê..."      ──► Card: Gong Cha NVL, Phê La Bạch Đằng
        │
        ├──► 17:30 (Kèo tối & Rạp phim)   ──► Click Dock ──► Hero: "Kèo Tối, Rạp Chiếu Phim & Tụ Tập..."   ──► Card: Metiz Cinema Helio, CGV Vincom
        │
        └──► 21:00 (Ăn đêm & Chia bill)   ──► Click Dock ──► Hero: "Ăn Đêm, Chia Tiền Bàn Ăn..."           ──► Mở Split Bill Modal ──► Escape Key Đóng Modal
```

| Khung Giờ | Tình Huống Khách Hàng | Tương Tác Kích Hoạt | Kết Quả DOM Xác Minh | Nút Kêu Gọi Hành Động (CTA) |
|:---:|:---|:---|:---|:---|
| **07:30** | Sinh viên / Dân văn phòng tìm quán cà phê tiện đường đi làm | Click pill `[data-time-slot="SLOT_0730"]` | Cập nhật Hero: *Cà Phê Sáng & Điểm Hẹn Tiện Đường Đi Làm / Đi Học*<br>Stack: Phê La Bạch Đằng, Gong Cha NVL | `Xem 9 điểm hẹn xác minh ↓` |
| **11:15** | Nhóm đồng nghiệp tìm quán ăn trưa bán kính gần, combo nhanh | Click pill `[data-time-slot="SLOT_1115"]` | Cập nhật Hero: *Bữa Trưa Nhanh & Điểm Ăn Uống Văn Phòng / Sinh Viên*<br>Stack: Jollibee Vincom, Gong Cha NVL | `Xem danh sách quán ăn ↓` |
| **14:15** | Cần không gian yên tĩnh làm việc hoặc trà chiều gặp gỡ | Click pill `[data-time-slot="SLOT_1415"]` | Cập nhật Hero: *Trà Chiều & Không Gian Cà Phê Làm Việc / Gặp Gỡ*<br>Stack: Gong Cha NVL, Phê La Bạch Đằng | `Xem quán trà & cà phê ↓` |
| **17:30** | Rủ bạn bè xem phim suất tối hoặc ăn tối sau giờ tan ca | Click pill `[data-time-slot="SLOT_1730"]` | Cập nhật Hero: *Kèo Tối, Rạp Chiếu Phim & Điểm Hẹn Tụ Tập Nhóm*<br>Stack: Metiz Cinema Helio, CGV Vincom | `Xem cụm rạp chiếu phim ↓` |
| **21:00** | Kèo tụ tập ăn đêm, chia hóa đơn bàn ăn, đối soát thực trả | Click pill `[data-time-slot="SLOT_2100"]` | Cập nhật Hero: *Ăn Đêm, Chia Tiền Bàn Ăn & Báo Deal Cộng Đồng*<br>Mở Smart Split Bill qua `#btn-open-calc-sheet-hero` | `Mở Smart Split Bill 🧮` |

---

## 3. PHÂN BỐ NGUỒN CUNG & ĐỘ PHỦ KHU VỰC ĐÀ NẴNG (DISTRICT COVERAGE)

Hệ thống quản lý nguồn cung theo danh mục có capture vật lý 100% trên đĩa tại [`03_SOURCE_OF_TRUTH/four_layer_dataset.json`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/03_SOURCE_OF_TRUTH/four_layer_dataset.json):

```text
┌───────────────────────────────────────────────────────────────────────────────────────┐
│ ĐỘ PHỦ 5 KHU VỰC TRỌNG ĐIỂM ĐÀ NẴNG                                                   │
├───────────────────┬───────────────────┬───────────────────┬───────────────────────────┤
│ Quận / Khu Vực    │ Số Điểm Xác Minh  │ Phân Loại Ngành   │ Thương Hiệu / Chi Nhánh   │
├───────────────────┼───────────────────┼───────────────────┼───────────────────────────┤
│ 📍 Hải Châu       │ 4 Điểm            │ Rạp / Cà phê / F&B│ Metiz Helio, Phê La,      │
│                   │                   │                   │ Gong Cha, Jollibee TL     │
├───────────────────┼───────────────────┼───────────────────┼───────────────────────────┤
│ 📍 Sơn Trà        │ 2 Điểm            │ Rạp / Fastfood    │ CGV Vincom, Jollibee VC   │
├───────────────────┼───────────────────┼───────────────────┼───────────────────────────┤
│ 📍 Thanh Khê      │ 3 Điểm            │ Rạp / Fastfood    │ CGV Vĩnh Trung, Galaxy,   │
│                   │                   │                   │ Jollibee Lý Thái Tổ       │
├───────────────────┼───────────────────┼───────────────────┼───────────────────────────┤
│ 📍 Hòa Khánh / LC │ Watchlist         │ ĐH Bách Khoa / SP │ Cụm ăn uống sinh viên     │
├───────────────────┼───────────────────┼───────────────────┼───────────────────────────┤
│ 📍 Ngũ Hành Sơn   │ Watchlist         │ ĐH Kinh Tế / FPT  │ Cụm phố An Thượng & KTX   │
└───────────────────┴───────────────────┴───────────────────┴───────────────────────────┘
```

---

## 4. THỐNG KÊ CHI TIẾT THEO BA TẦNG DỮ LIỆU TRUNG THỰC

| Tầng Dữ Liệu | Số Lượng Mục | Trạng Thái Hiển Thị | Quy Tắc Ngôn Ngữ & Điều Kiện Bắt Buộc |
|:---|:---:|:---:|:---|
| **🟢 Tầng Xanh (Emerald Tier)**<br>Ưu đãi đã xác minh | **0 Live**<br>*(2 Ứng viên chờ duyệt)* | **Rỗng Trung Thực**<br>`Chưa có ưu đãi thương mại live hôm nay` | Chỉ mở khi đủ capture vật lý hai lớp (chính sách + chi nhánh) và còn hạn. Tuyệt đối không bịa giá hoặc voucher. |
| **🔵 Tầng Xanh Dương (Cobalt Tier)**<br>Địa điểm theo dõi | **9 Điểm Xác Minh**<br>*(4 Chính Sách Thành Viên)* | **Watchlist Địa Điểm**<br>`📍 ĐÃ XÁC MINH ĐỊA CHỈ` | Có capture địa chỉ thực tế từ store locator chính thức. Bắt buộc kèm disclaimer: *“Quán hoạt động; ưu đãi online chưa đủ dữ liệu.”* Cấm từ “đang giảm”, “rẻ hơn”. |
| **🟡 Tầng Hổ Phách (Amber Tier)**<br>Tín hiệu cộng đồng | **Tín Hiệu Người Dùng**<br>*(2 Brand Watchlist)* | **Cảnh Báo Kiểm Tra**<br>`⚠️ CHƯA XÁC MINH` | Tiếp nhận link/mô tả từ người dùng; lọc PII 100% tại client; bắt buộc ghi rõ: *“Chưa xác minh — hãy hỏi quán / kiểm tra giỏ hàng trước khi mua.”* |

---

## 5. XÁC MINH THỰC TẾ COMPARATOR, PRICE X-RAY VÀ LỌC BẢO VỆ PII

1. **Cross-App Comparator & Price X-Ray**:
   - Khi không có dữ liệu nhập từ người dùng (`item_price = 0`): Trả về `SIGNAL_ONLY` / Giá trị `0đ`, **tuyệt đối không tự kết luận app nào rẻ nhất** hoặc tự gắn nhãn "đáy 90 ngày".
   - Khi người dùng nhập giá gốc, voucher và số người chia trong form thật: Tính toán chính xác trên DOM theo công thức clamp $\ge 0$, khấu trừ voucher theo điều kiện đơn tối thiểu.
2. **Kiểm thử PII với dữ liệu thật trong Browser Puppeteer**:
   - **Input thật vào form**: `"Quán A giảm 20% liên hệ số 0905123456 hoặc email deal.hot@gmail.com, CCCD 048192001234"`
   - **Xác thực đọc từ `localStorage` thực**:
     - `0905123456` $\rightarrow$ **ĐÃ BỊ CHẶN KHỎI LOCALSTORAGE (PASS)**
     - `deal.hot@gmail.com` $\rightarrow$ **ĐÃ BỊ CHẶN KHỎI LOCALSTORAGE (PASS)**
     - `048192001234` $\rightarrow$ **ĐÃ BỊ CHẶN KHỎI LOCALSTORAGE (PASS)**
     - `[SĐT ĐÃ XÓA]`, `[EMAIL ĐÃ XÓA]`, `[ĐỊNH DANH ĐÃ XÓA]` $\rightarrow$ **ĐÃ GHI NHẬN HỢP LỆ (PASS)**.
   - **Network Airgap**: 0 request gửi ra ngoài localhost trong toàn bộ quá trình tương tác.

---

## 6. BẰNG CHỨNG RENDER HTTP STAGING VẬT LÝ

| Viewport | Tệp Ảnh Chụp Đầy Đủ | Kích thước | SHA-256 Băm Vật Lý | Tràn Ngang |
|:---|:---|:---|:---|:---:|
| **Desktop 1440px** | [`desktop_1440px_field_validation_097.png`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/runtime_evidence/screenshots_097/desktop_1440px_field_validation_097.png) | 514,620 B | `b381ffb1007d8914...` | **0 (PASS)** |
| **Tablet 768px** | [`tablet_768px_field_validation_097.png`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/runtime_evidence/screenshots_097/tablet_768px_field_validation_097.png) | 520,679 B | `d6720ea69cca03f5...` | **0 (PASS)** |
| **Mobile 390px** | [`mobile_390px_field_validation_097.png`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/runtime_evidence/screenshots_097/mobile_390px_field_validation_097.png) | 511,683 B | `5d52256fc7dbcc13...` | **0 (PASS)** |

---

## 7. KẾT QUẢ KIỂM THỬ HỆ THỐNG TOÀN DIỆN (51/51 PASS)

- [`test_field_validation_and_supply_cohort_097.js`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/test_field_validation_and_supply_cohort_097.js): **14/14 PASS**
- [`test_project_memory_consistency.js`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/test_project_memory_consistency.js): **10/10 PASS**
- [`test_customer_journey_north_star_096.js`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/test_customer_journey_north_star_096.js): **12/12 PASS**
- [`test_network_airgap_and_strict_mem07_093b.js`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/test_network_airgap_and_strict_mem07_093b.js): **5/5 PASS**
- [`test_semantic_and_memory_correction_093a.js`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/test_semantic_and_memory_correction_093a.js): **10/10 PASS**

---

## 8. KỶ LUẬT KHÓA SẢN XUẤT BẤT BIẾN
- **Không phát hành Release Candidate trong 097** (`RELEASE_CANDIDATE_097.json` không tồn tại).
- **Khóa sản xuất tuyệt đối**: `05_DEAL_AND_AFFILIATE/deals_feed.json: []` (0 bytes), `08_RELEASE_VAULT/RELEASE_MANIFEST.json` có `is_approved: false`.
