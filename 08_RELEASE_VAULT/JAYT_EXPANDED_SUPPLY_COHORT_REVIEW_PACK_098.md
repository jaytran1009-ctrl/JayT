# GÓI HỒ SƠ ĐÁNH GIÁ NGUỒN CUNG 5 CỤM & TRIỂN KHAI STAGING INSTANCE: `JAYT-098-EXPANDED-SUPPLY-COHORT-AND-STAGING-INSTANCE-DEPLOYMENT`

> **Tuyên ngôn North Star**: JayT không phải sổ tay nhập chi tiêu. JayT là **Community Deal Discovery Engine** cho sinh viên và dân văn phòng Đà Nẵng:  
> *“Biết hôm nay đi đâu, ăn gì, mua gì đáng tiền; có thể kiểm tra nhanh và rủ nhóm ngay.”*

---

## 1. NÂNG CẤP ĐƯỜNG DẪN KIỂM THỬ TRIỂN KHAI THỰC TẾ (STAGING INSTANCE PATH)

Theo chỉ thị của CEO, toàn bộ luồng kiểm thử trình duyệt thực tế Puppeteer E2E của **Work Order 098** đã chuyển sang phục vụ trực tiếp từ thư mục triển khai Staging Instance:
- **Thư mục phục vụ máy chủ**: [`08_RELEASE_VAULT/deployments/staging_instance/03_SOURCE_OF_TRUTH/`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/08_RELEASE_VAULT/deployments/staging_instance/03_SOURCE_OF_TRUTH/)
- **Đồng bộ 3 lớp byte-for-byte**: Đối soát mã băm SHA-256 trùng khớp 100% giữa `03_SOURCE_OF_TRUTH/`, `deploy/public/` và `staging_instance/`.

---

## 2. MA TRẬN 5 KHUNG GIỜ & PHÂN BỔ NGUỒN CUNG 5 CỤM ĐÀ NẴNG

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ PHÂN BỔ NGUỒN CUNG 5 CỤM TRỌNG ĐIỂM ĐÀ NẴNG (100% PROVENANCE TRÊN ĐĨA)                 │
├──────────────────────┬────────────────────────┬───────────────────┬────────────────────┤
│ Cụm Khu Vực          │ Điểm Đến Xác Minh      │ Phân Loại Ngành   │ Trạng Thái Tầng    │
├──────────────────────┼────────────────────────┼───────────────────┼────────────────────┤
│ 📍 Hải Châu          │ • Metiz Cinema Helio   │ Rạp chiếu phim    │ Cobalt (Xác minh)  │
│                      │ • Phê La Bạch Đằng     │ Cà phê & Trà sữa  │ Cobalt (Xác minh)  │
│                      │ • Gong Cha NVL         │ Trà sữa & Cà phê  │ Cobalt (Xác minh)  │
│                      │ • Jollibee Tiểu La     │ Fastfood & Ăn trưa│ Cobalt (Xác minh)  │
├──────────────────────┼────────────────────────┼───────────────────┼────────────────────┤
│ 📍 Sơn Trà           │ • CGV Vincom Đà Nẵng   │ Rạp chiếu phim    │ Cobalt (Xác minh)  │
│                      │ • Jollibee Vincom      │ Fastfood & Ăn trưa│ Cobalt (Xác minh)  │
├──────────────────────┼────────────────────────┼───────────────────┼────────────────────┤
│ 📍 Thanh Khê         │ • CGV Vĩnh Trung Plaza │ Rạp chiếu phim    │ Cobalt (Xác minh)  │
│                      │ • Galaxy Cinema Coop   │ Rạp chiếu phim    │ Cobalt (Xác minh)  │
│                      │ • Jollibee Lý Thái Tổ  │ Fastfood & Ăn trưa│ Cobalt (Xác minh)  │
├──────────────────────┼────────────────────────┼───────────────────┼────────────────────┤
│ 📍 Hòa Khánh / LC    │ • Cụm SV Bách Khoa/SP  │ Watchlist ăn uống │ Cobalt/Amber       │
├──────────────────────┼────────────────────────┼───────────────────┼────────────────────┤
│ 📍 Ngũ Hành Sơn      │ • Cụm SV Kinh Tế / FPT │ Phố An Thượng     │ Cobalt/Amber       │
└──────────────────────┴────────────────────────┴───────────────────┴────────────────────┘
```

---

## 3. THỐNG KÊ CHI TIẾT BA TẦNG THÔNG TIN CÔNG KHAI

| Tầng Thông Tin | Số Lượng Hiện Có | Trạng Thái Hiển Thị | Ranh Giới Dữ Liệu Bắt Buộc |
|:---|:---:|:---:|:---|
| **🟢 Tầng Xanh (Emerald)**<br>Ưu đãi xác thực | **0 Live**<br>*(2 Chờ duyệt)* | **Rỗng Trung Thực**<br>`Chưa có ưu đãi thương mại live hôm nay` | Chỉ mở khi đủ capture vật lý hai lớp (chính sách + chi nhánh) và còn hạn. Tuyệt đối không bịa giá hoặc voucher. |
| **🔵 Tầng Xanh Dương (Cobalt)**<br>Địa điểm theo dõi | **9 Điểm Xác Minh**<br>*(4 Chính Sách Thành Viên)* | **Watchlist Địa Điểm**<br>`📍 ĐÃ XÁC MINH ĐỊA CHỈ` | Có capture địa chỉ thực tế từ store locator chính thức. Bắt buộc kèm disclaimer: *“Quán hoạt động; ưu đãi online chưa đủ dữ liệu.”* Cấm từ “đang giảm”, “rẻ hơn”. |
| **🟡 Tầng Hổ Phách (Amber)**<br>Tín hiệu cộng đồng | **Tín Hiệu Người Dùng**<br>*(2 Brand Watchlist)* | **Cảnh Báo Kiểm Tra**<br>`⚠️ CHƯA XÁC MINH` | Tiếp nhận link/mô tả từ người dùng; lọc PII 100% tại client; bắt buộc ghi rõ: *“Chưa xác minh — hãy hỏi quán / kiểm tra giỏ hàng trước khi mua.”* |

---

## 4. BẰNG CHỨNG RENDER TỪ MÁY CHỦ STAGING INSTANCE THỰC TẾ

| Viewport | Tệp Ảnh Chụp Đầy Đủ | Kích thước | SHA-256 Băm Vật Lý | Tràn Ngang |
|:---|:---|:---|:---|:---:|
| **Desktop 1440px** | [`desktop_1440px_expanded_supply_098.png`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/runtime_evidence/screenshots_098/desktop_1440px_expanded_supply_098.png) | 513,191 B | `35dd2ca321e2266a...` | **0 (PASS)** |
| **Tablet 768px** | [`tablet_768px_expanded_supply_098.png`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/runtime_evidence/screenshots_098/tablet_768px_expanded_supply_098.png) | 519,694 B | `32727fd56007dd91...` | **0 (PASS)** |
| **Mobile 390px** | [`mobile_390px_expanded_supply_098.png`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/runtime_evidence/screenshots_098/mobile_390px_expanded_supply_098.png) | 510,711 B | `6b77470d17861183...` | **0 (PASS)** |

---

## 5. KẾT QUẢ KIỂM THỬ HỆ THỐNG TOÀN DIỆN (52/52 PASS)

- [`test_expanded_supply_cohort_098.js`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/test_expanded_supply_cohort_098.js): **15/15 PASS** *(Phục vụ trực tiếp từ Staging Instance)*
- [`test_project_memory_consistency.js`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/test_project_memory_consistency.js): **10/10 PASS**
- [`test_customer_journey_north_star_096.js`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/test_customer_journey_north_star_096.js): **12/12 PASS**
- [`test_network_airgap_and_strict_mem07_093b.js`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/test_network_airgap_and_strict_mem07_093b.js): **5/5 PASS**
- [`test_semantic_and_memory_correction_093a.js`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/test_semantic_and_memory_correction_093a.js): **10/10 PASS**

---

## 6. KỶ LUẬT KHÓA SẢN XUẤT BẤT BIẾN
- **Không phát hành Release Candidate trong 098** (`RELEASE_CANDIDATE_098.json` không tồn tại).
- **Khóa sản xuất tuyệt đối**: `05_DEAL_AND_AFFILIATE/deals_feed.json: []` (0 bytes), `08_RELEASE_VAULT/RELEASE_MANIFEST.json` có `is_approved: false`.
