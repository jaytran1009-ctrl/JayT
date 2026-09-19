# JAYT-118: REAL SUPPLY & HONEST VALIDATION — CEO REVIEW PACK
**Phiên bản**: `v3.235.0` | **Trạng thái**: `IMPLEMENTED — PENDING CEO AUDIT`  
**Môi trường Live**: [https://deploy-ten-xi-48.vercel.app](https://deploy-ten-xi-48.vercel.app)  
**Ngày thực hiện**: 25/08/2026 | **Độ khớp byte SOT/Live**: `100% SHA-256 MATCH` across 7 files

---

## I. TỔNG QUAN THỰC THI 7 CHỈ THỊ CỐT LÕI (JAYT-118)

| STT | Chỉ thị CEO 118 | Kết quả thực thi thực tế | Trạng thái |
|---|---|---|---|
| **1** | **Cô lập & Đính chính báo cáo usability 117** | Đổi nhãn toàn diện thành `SIMULATED_USABILITY_SCENARIOS — NOT REAL USER RESEARCH`, bổ sung cảnh báo disclaimer cấm dùng nghiệm thu/quảng bá, và ẩn danh hóa 100% nhân vật thành mã kiểm thử kỹ thuật (`P01`–`P08`) để loại bỏ hoàn toàn nguy cơ riêng tư. | ✅ HOÀN TẤT |
| **2** | **Giữ nguyên UI 117, không thêm widget** | Giữ nguyên luồng màn hình đầu tối đa 2–3 card hành động, cơ chế Progressive Disclosure mở rộng danh mục & 26 địa điểm khi bấm, ngôn ngữ Local-Only trung thực, không phát sinh widget thừa. | ✅ HOÀN TẤT |
| **3** | **Bổ sung nguồn cung thực tế cho các ô GAP cao** | Khai thác từ 84 capture trên đĩa, bổ sung: (1) **Metiz Cinema Đà Nẵng** (U22 & Super Monday giá ưu đãi định kỳ), (2) **DanaBus Đà Nẵng** (Vé trợ giá công cộng 6k/8k & vé tháng SV 60k cho slot sáng 07:30 & tan ca 17:30), (3) **GoGi House Đà Nẵng** (Menu combo bò & Buffet nướng niêm yết cho slot tối 20:00). | ✅ HOÀN TẤT |
| **4** | **Quy tắc nghiêm ngặt 5 thuộc tính đối soát** | 100% deal Tier 1 có đủ: Nguồn chính thức HTTPS, Điều kiện áp dụng, Hạn dùng xác định (`YYYY-MM-DD`), Phạm vi áp dụng tại Đà Nẵng, Bằng chứng vật lý & SHA-256 trên đĩa. Thiếu bất kỳ yếu tố nào chỉ được vào Tier 2 (Watchlist) hoặc Tier 3 (Menu/Utility). | ✅ HOÀN TẤT |
| **5** | **Bản đồ 'Hôm nay có gì mới' theo delta thật** | So sánh mốc `added_at` / `last_verified_at` với mốc thời gian lần ghé thăm trước (`localStorage.getItem('jayt_last_visit_timestamp')`), chỉ hiển thị badge `✨ Mới cập nhật` khi slot có dữ liệu mới thật sự. | ✅ HOÀN TẤT |
| **6** | **Quy chuẩn nghiên cứu người dùng thực địa chuẩn hóa** | Ban hành [`CANONICAL_USABILITY_TESTING_PROTOCOL_118.md`](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/08_RELEASE_VAULT/CANONICAL_USABILITY_TESTING_PROTOCOL_118.md) với mẫu Phiếu Chấp Thuận Tham Gia Tự Nguyện (Informed Consent), quy trình điều phối độc lập, ẩn danh Zero-PII, lưu trữ tối đa 30 ngày và ghi nhận đầy đủ phản hồi tiêu cực. | ✅ HOÀN TẤT |
| **7** | **Đóng băng cộng đồng & Khóa thương mại** | Duy trì 100% lưu trữ cục bộ trên thiết bị; đóng băng thương mại `deals_feed.json: []` và `is_approved: false`. | ✅ HOÀN TẤT |

---

## II. MA TRẬN SUPPLY GAP BOARD 118 (5×5 MA TRẬN — NÂNG ĐỘ PHỦ HÀNH ĐỘNG LÊN 36%)

| Khung giờ | Rạp phim (`CINEMA`) | Cà phê / Trà (`COFFEE`) | Cơm trưa / Fastfood (`LUNCH`) | Siêu thị / Tiện ích (`SHOPPING`) | Di chuyển / Xe (`MOBILITY`) |
|---|---|---|---|---|---|
| **07:30 (Sáng)** | ⚠️ *Gap TB* (Chưa mở suất) | ⚠️ Highlands JCB 30% + Phê La | ⚠️ *Gap TB* (Điểm tâm) | ⚠️ *Gap TB* (Tiện ích) | 🚌 **DanaBus trợ giá 6k/8k & SV 60k** |
| **11:15 (Trưa)** | ⚠️ *Gap TB* (Suất trưa) | 📋 Phúc Long Tea/Bakery | 📋 KFC 88k + Jollibee 73k (Menu) | ⚠️ *Gap TB* (Bữa trưa sơ chế) | 🚨 **GAP CAO** (Mã đi ăn trưa) |
| **14:15 (Chiều)**| ⚠️ *Gap TB* (Vé HSSV) | 📋 Gong Cha + Phê La + Phúc Long | ⚠️ *Gap TB* (Ăn xế) | ⚠️ *Gap TB* (Mỹ phẩm) | ⚠️ *Gap TB* (Học nhóm) |
| **17:30 (Tan ca)**| ⚠️ *Gap TB* (Tan sở) | ⚠️ *Gap TB* (Happy Hour) | 🚨 **GAP CAO** (Ăn tối gia đình) | ⚠️ WinMart WinLife -20% | 🚌 **DanaBus lộ trình tan sở 6k** |
| **20:00 (Tối)** | ⚡ **CGV Payday + Mua 1 Tặng 1 + Starlight + Metiz U22** | ⚠️ *Gap TB* (Cà phê đêm) | 🥩 **GoGi House Combo & Buffet 529k** | ⚠️ *Gap TB* (Sự kiện TTTM) | 🚨 **GAP CAO** (Mã đi xe về khuya) |

> **Chỉ số theo dõi nguồn cung 118**:
> - **Độ phủ hành động thực tế (Actionable Coverage)**: **9 / 25 ô (36.0%)** (Tăng từ 24% ở bản 117).
> - **Tổng số ưu đãi xác minh (Tier 1)**: **4 deals** (CGV Payday 30K, CGV Mua 1 Tặng 1, Starlight Combo 10K, Metiz U22/Super Monday).
> - **Tổng số tiện ích & menu niêm yết (Tier 3)**: **7 items** (KFC 88k, Jollibee 73k, Phê La, Gong Cha, Phúc Long, GoGi House Buffet, DanaBus trợ giá).
> - **4 khoảng trống lớn nhất cho đợt quét tiếp theo**: (1) Mã di chuyển ăn trưa 11:15, (2) Ưu đãi ăn tối gia đình 17:30, (3) Mã cuốc xe về khuya 20:00, (4) Voucher buffet lẩu nướng nhóm buổi tối.

---

## III. ĐỐI SOÁT SHA-256 BYTE PARITY 100% TRÊN LIVE PRODUCTION

| STT | Tệp dữ liệu / Giao diện | SHA-256 Source of Truth | SHA-256 Live Production | Trạng thái |
|---|---|---|---|---|
| 1 | `index.html` | `65fb1313779986fa...` | `65fb1313779986fa...` | ✅ 100% MATCH |
| 2 | `jayt_apex_interface.js` | `b4b26762e02d9c6a...` | `b4b26762e02d9c6a...` | ✅ 100% MATCH |
| 3 | `customer_journey_north_star.json` | `2ada173f7c97b33f...` | `2ada173f7c97b33f...` | ✅ 100% MATCH |
| 4 | `four_layer_dataset.json` | `05bf86e2f4ccbeed...` | `05bf86e2f4ccbeed...` | ✅ 100% MATCH |
| 5 | `radar_dataset_086u.json` | `7929fb67b6013875...` | `7929fb67b6013875...` | ✅ 100% MATCH |
| 6 | `brand_asset_registry.json` | `7ecf31f56a45665b...` | `7ecf31f56a45665b...` | ✅ 100% MATCH |
| 7 | `daily_supply_feed_118.json` | `078de21d1902402e...` | `078de21d1902402e...` | ✅ 100% MATCH |

---

## IV. BẢNG SO SÁNH TRƯỚC VÀ SAU RELEASE 118

| Tiêu chí | Bản 117 | Bản 118 (Hiện Tại) |
|---|---|---|
| **Trạng thái Báo cáo Usability 117** | Trình bày như kết quả nghiên cứu thực tế | **Cô lập & Đổi nhãn**: `SIMULATED_USABILITY_SCENARIOS — NOT REAL USER RESEARCH`, ẩn danh hóa 100% nhân vật (`P01`–`P08`), cấm dùng nghiệm thu/quảng bá |
| **Quy chuẩn nghiên cứu người dùng** | Chưa có văn bản quy định | **Ban hành Canonical Usability Testing Protocol 118** (Bắt buộc Informed Consent tự nguyện, Zero-PII, điều phối độc lập, ghi nhận phản hồi tiêu cực) |
| **Số lượng ưu đãi xác minh (Tier 1)** | 3 deals (CGV, Starlight) | **4 deals** (Bổ sung Metiz Cinema U22 & Super Monday giá định kỳ) |
| **Nguồn cung tiện ích & menu (Tier 3)**| 5 items (KFC, Jollibee, Phê La, Gong Cha, Phúc Long) | **7 items** (Bổ sung GoGi House Combo & Buffet nướng, DanaBus trợ giá công cộng 6k/8k & vé tháng SV 60k) |
| **Độ phủ hành động trên Gap Board** | 24.0% (6/25 ô) | **36.0% (9/25 ô)** |
| **Cơ chế 'Hôm nay có gì mới'** | Badge tĩnh hiển thị chung | **Delta Detection thật sự**: so sánh mốc thay đổi dữ liệu với timestamp lần ghé trước của người dùng |
| **Chất lượng kiểm thử QA** | 164 assertions pass | **184 assertions pass** (Bổ sung kiểm thử Metiz, GoGi, DanaBus, Protocol và Delta Detection) |

---

## V. ĐỊA CHỈ TRUY CẬP VÀ KIỂM THỬ TRỰC TIẾP
- **Production URL**: [https://deploy-ten-xi-48.vercel.app](https://deploy-ten-xi-48.vercel.app)
- **Deployment Receipt**: [`08_RELEASE_VAULT/DEPLOYMENT_RECEIPT_118.json`](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/08_RELEASE_VAULT/DEPLOYMENT_RECEIPT_118.json)
- **Protocol Nghiên cứu Thực địa**: [`08_RELEASE_VAULT/CANONICAL_USABILITY_TESTING_PROTOCOL_118.md`](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/08_RELEASE_VAULT/CANONICAL_USABILITY_TESTING_PROTOCOL_118.md)
- **Báo cáo Kịch bản Mô phỏng**: [`08_RELEASE_VAULT/USABILITY_TEST_REPORT_117_DANANG.md`](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/08_RELEASE_VAULT/USABILITY_TEST_REPORT_117_DANANG.md)
- **QA Test Suite**: `node 07_QUALITY_ASSURANCE/test_real_supply_and_validation_118.js` (184/184 PASS)
