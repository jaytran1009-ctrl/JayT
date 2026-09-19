# JAYT-373 — HỒ SƠ NGHIỆM THU THỰC NGHIỆM CHO GEMINI (GEMINI REVIEW PACKET)

**Mã tài liệu:** `JAYT_373_GEMINI_REVIEW_PACKET`  
**Căn cứ chỉ đạo:** [Lệnh điều phối J373](file:///D:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/04_DATA_PIPELINE/dispatch/WORK_ORDER_J373_ONSITE_COPILOT.json) & [Đặc tả giao diện J373](file:///D:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/01_EXECUTIVE_COUNCIL/JAYT_373_DESIGN_HANDOFF.md)  
**Đơn vị thực thi:** Antigravity  
**Môi trường thử nghiệm:** `http://127.0.0.1:4176` (`staging_workspace_j328`)  
**Phiên bản candidate:** `v3.437.0-j373`  
**Thời điểm niêm phong:** 2026-09-10T08:48:32.881Z  
**Ranh giới thương mại:** `affiliate_enabled: false` tuyệt đối; 0 tracking, 0 tuyên bố hoa hồng/doanh thu.  

---

## 1. Bảng đối soát tài nguyên phục vụ trên Staging `:4176`

Hệ thống đã đo kiểm và đối soát trực tiếp các tài nguyên trả về qua HTTP từ `http://127.0.0.1:4176`:

| Tài nguyên phục vụ | Dung lượng (Bytes) | SHA-256 Served Bytes | Trạng thái |
| :--- | :---: | :---: | :---: |
| `/` (HTML gốc) | 1.226 | `f91d711882b4f3623f042855cadaaec50b46a0925b6c9f94b16dce7a7e7b15da` | **PASS (HTTP 200)** |
| `/styles.css` | 61.316 | `f92d90aacce1d1f7df95c70537917087e74b9d6fa7b4a6ae2e9b4f2101f7b1e0` | **PASS (HTTP 200)** |
| `/jayt_apex_interface.js` | 462.382 | `12dfe3e1620f523965328431a9b3fc463890a41d65171d09e2e8d56a23750a64` | **PASS (HTTP 200)** |
| `/deals_feed.json` | 114.379 | `97d29399738c6781671ff4557506974334d31515f209256c383907177074cc60` | **PASS (HTTP 200)** |
| `/registry.json` | 48.314 | `52a8811109df36961edf9714a6e9ff09b3e4e944e3705b458dd189634e1140a3` | **PASS (HTTP 200)** |
| `/assets/vendor/qrcode.js` | 56.694 | `79ec86f82856005b1c887905cfccfcfbec3821ca61c7fd5a952faa5f778f791c` | **PASS (HTTP 200)** |

*Biên nhận chi tiết:* [`JAYT_373_STAGING_ONSITE_RECEIPT.json`](file:///D:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/runtime_evidence/JAYT_373_STAGING_ONSITE_RECEIPT.json).

---

## 2. Kết quả thực nghiệm 3 kịch bản theo yêu cầu của Gemini

### ☕ Kịch bản 1: Tại quán Cafe / Đồ uống (At Cafe: Choose branch, read applicable payment options & guest utilities)
- **Quy trình kiểm thử:**
  1. Người dùng mở trang, thấy ngay thanh tìm kiếm *"Bạn đang ở quán nào?"* đặt dưới Header và trước Hero.
  2. Gõ *"Phúc Long"* hoặc *"Mega Market"*: Hệ thống tìm kiếm không phân biệt dấu tiếng Việt (accent-insensitive), hiển thị gợi ý *"Phúc Long MM Mega Market Hòa Khánh"*.
  3. Bấm chọn hoặc nhấn phím `Enter`: Mở ngay **Compact Sheet** (3 bước thanh toán & tiện ích).
- **Kết quả nghiệm thu:**
  - **3 Bước thanh toán:**
    * *Bước 1 (Đối tượng):* Thẻ sinh viên chính quy $ightarrow$ Giảm giá theo quy định sinh viên.
    * *Bước 2 (Ví thanh toán):* ZaloPay QR giảm 10.000₫ cho đơn từ 50.000₫.
    * *Bước 3 (Món):* Trà Đào Hồng Đài (L) giá niêm yết 60.000₫ $ightarrow$ Giá thực trả rẻ nhất đã biết: **44.000₫**. Có hiển thị liên kết bằng chứng và điều kiện. Không cộng dồn sai quy định.
  - **Tiện ích quán:**
    * *Wi-Fi:* Tên mạng `PhucLong_MegaMarket_Guest`, có căn cứ bảng hiệu khách hàng công cộng, ngày kiểm chứng 10/09/2026.
    * *Ổ cắm:* Có tại dãy bàn trung tâm. *Máy lạnh:* Hoạt động liên tục. *Gửi xe:* Miễn phí.
    * *Xe buýt DanaBus:* Trạm MM Mega Market (Tuyến R16A, R4A về trung tâm) kèm nhãn rõ ràng *"Theo lịch công bố DanaBus (không phải vị trí xe thời gian thực)"*.

---

### 🍕 Kịch bản 2: Tại nhà hàng / quán ăn — Chia tiền theo món & Tạo VietQR (At restaurant: 3 people share one item, two individual items & odd fee)
- **Dữ liệu thực nghiệm mẫu:**
  - Nhóm 3 người: **Bạn (Chủ bàn - p1)**, **Thành viên 2 (p2)**, **Thành viên 3 (p3)**.
  - 1 Món ăn chung: Gà Giòn Cay Lẩu **125.000₫** (chia cho cả 3 người).
  - 2 Món riêng: Trà Đào của Bạn **35.000₫**, Trà Sữa của TV2 **32.000₫**.
  - 1 Khoản phụ phí chung lẻ: Khăn lạnh & phụ phí **7.000₫** (chia đều cả 3 người).
- **Quy trình phân bổ số dư (Quotient & Remainder):**
  - Món chung 125.000₫ / 3: $q = 41.666$, $r = 2$. Hai người đầu (`p1`, `p2`) chịu thêm 1₫ $ightarrow$ `p1`: 41.667₫, `p2`: 41.667₫, `p3`: 41.666₫.
  - Phụ phí lẻ 7.000₫ / 3: $q = 2.333$, $r = 1$. Người đầu (`p1`) chịu thêm 1₫ $ightarrow$ `p1`: 2.334₫, `p2`: 2.333₫, `p3`: 2.333₫.
- **Bảng tổng kết thực trả từng người:**
  * **Bạn (p1):** $41.667 + 35.000 + 2.334 =$ **79.001₫**
  * **Thành viên 2 (p2):** $41.667 + 32.000 + 2.333 =$ **76.000₫**
  * **Thành viên 3 (p3):** $41.666 + 0 + 2.333 =$ **43.999₫**
  * **Tổng cộng 3 người:** $79.001 + 76.000 + 43.999 =$ **199.000₫** (Khớp chính xác 100% với $125.000 + 35.000 + 32.000 + 7.000 = 199.000$₫, không lệch 1 đồng).
- **Nghiệm thu VietQR Offline:**
  - Tạo trực tiếp mã VietQR EMVCo chuẩn NAPAS 247 cho từng người với số tiền tương ứng.
  - Số tài khoản giữ nguyên số 0 ở đầu (`0123456789`). Tên người nhận ghi chú rõ *"Tên người nhận bạn tự nhập (chưa qua xác thực ngân hàng)"*.
  - Render ảnh QR $ge 240$px nền trắng có quiet zone. Nút sao chép thông tin và tải ảnh QR hoạt động hoàn hảo.
  - **100% xử lý trong RAM máy:** Không lưu vào localStorage/sessionStorage, không truyền qua URL, không gọi API ngoài. Nút *"Kết thúc phiên / Xóa RAM"* xóa sạch toàn bộ dữ liệu.

---

### 📍 Kịch bản 3: Chọn tâm trường học & Tra cứu bán kính 500m (Campus origin & Nearby 500m)
- **Quy trình kiểm thử:**
  1. Người dùng chọn tâm cơ sở: **Đại học Sư Phạm Đà Nẵng (UED)** (Tôn Đức Thắng).
  2. Bán kính tính toán trắc địa (Haversine Formula) tìm thấy cơ sở trong vòng 500m:
     * **Jollibee Ngô Văn Sở:** Cách **109m** $ightarrow$ Hiển thị nhãn *"Trong bán kính 500m (109m)"*.
     * **Jollibee MM Mega Market:** Cách **740m** $ightarrow$ Nằm ngoài 500m, tự động loại trừ khỏi danh sách bán kính gần.
  3. **Xử lý ngoại lệ GPS:**
     * Khi người dùng không bật GPS hoặc từ chối cấp quyền, hệ thống tự động quay về tâm cơ sở gần nhất và hiển thị thông báo lịch sự, không phát sinh lỗi ứng dụng.
     * Cơ sở không có tọa độ địa lý không bao giờ bị gán khoảng cách mét giả định.

---

## 3. Chỉ số đo kiểm kỹ thuật & Độ trễ (SLA Benchmark)

- **Đo kiểm 100 lần truy vấn tìm kiếm liên tục (Input-to-DOM latency):**
  * $p50 = 4.22\text{ ms}$
  * $p95 = 6.23\text{ ms}$ (SLA yêu cầu $< 50\text{ ms} \rightarrow$ **ĐẠT XUẤT SẮC**)
  * $p99 = 10.27\text{ ms}$
  * Maximum = $10.27\text{ ms}$
- **Độ nhạy và trợ năng:**
  * Mobile 390px: `scrollWidth === clientWidth === 390px`, hoàn toàn không tràn ngang.
  * Touch target: Chiều cao nút và input $ge 48\text{px} > 44\text{px}$ chuẩn mực.
  * Điều hướng bàn phím: Phím `ArrowDown`/`ArrowUp` chọn gợi ý, `Enter` mở sheet, `Escape` đóng sheet và trả lại focus.
  * Trạng thái rỗng: Nhập chuỗi ngẫu nhiên không có trong cơ sở dữ liệu hiển thị rõ *"Chưa có thông tin quán này"*, giữ nguyên nút chia tiền.
- **Lỗi hệ thống:**
  * Console errors: **0**
  * Page errors: **0**
  * Rò rỉ PII/tài khoản: **0**

---

## 4. Thư viện ảnh chụp bằng chứng (Screenshots)

Các ảnh chụp màn hình thực tế từ trình duyệt Headless Chrome đã được lưu tại:
- Desktop 1440px (Light): [`j373_desktop_1440_light.png`](file:///C:/Users/tritr/.gemini/antigravity/brain/0fd55bc2-4a92-47b9-9f66-c02b2cf9af3a/j373_desktop_1440_light.png)
- Desktop 1440px (Dark): [`j373_desktop_1440_dark.png`](file:///C:/Users/tritr/.gemini/antigravity/brain/0fd55bc2-4a92-47b9-9f66-c02b2cf9af3a/j373_desktop_1440_dark.png)
- Tablet 768px (Light): [`j373_tablet_768_light.png`](file:///C:/Users/tritr/.gemini/antigravity/brain/0fd55bc2-4a92-47b9-9f66-c02b2cf9af3a/j373_tablet_768_light.png)
- Mobile 390px (Light): [`j373_mobile_390_light.png`](file:///C:/Users/tritr/.gemini/antigravity/brain/0fd55bc2-4a92-47b9-9f66-c02b2cf9af3a/j373_mobile_390_light.png)
- Sheet 3 Bước tại quầy: [`j373_sheet_open_desktop_1440.png`](file:///C:/Users/tritr/.gemini/antigravity/brain/0fd55bc2-4a92-47b9-9f66-c02b2cf9af3a/j373_sheet_open_desktop_1440.png) & [`j373_sheet_open_mobile_390.png`](file:///C:/Users/tritr/.gemini/antigravity/brain/0fd55bc2-4a92-47b9-9f66-c02b2cf9af3a/j373_sheet_open_mobile_390.png)
- Tiện ích & Quanh đây 500m: [`j373_sheet_utilities_tab_1440.png`](file:///C:/Users/tritr/.gemini/antigravity/brain/0fd55bc2-4a92-47b9-9f66-c02b2cf9af3a/j373_sheet_utilities_tab_1440.png)
- Bảng chia tiền & Mã VietQR: [`j373_bill_split_desktop_1440.png`](file:///C:/Users/tritr/.gemini/antigravity/brain/0fd55bc2-4a92-47b9-9f66-c02b2cf9af3a/j373_bill_split_desktop_1440.png) & [`j373_bill_split_mobile_390.png`](file:///C:/Users/tritr/.gemini/antigravity/brain/0fd55bc2-4a92-47b9-9f66-c02b2cf9af3a/j373_bill_split_mobile_390.png)
- Kết quả tìm kiếm rỗng: [`j373_search_empty_state.png`](file:///C:/Users/tritr/.gemini/antigravity/brain/0fd55bc2-4a92-47b9-9f66-c02b2cf9af3a/j373_search_empty_state.png)

---

## 5. Danh mục hồ sơ niêm phong sẵn sàng bàn giao

1. **Đặc tả thiết kế:** [`01_EXECUTIVE_COUNCIL/JAYT_373_DESIGN_HANDOFF.md`](file:///D:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/01_EXECUTIVE_COUNCIL/JAYT_373_DESIGN_HANDOFF.md)
2. **Tiện ích cơ sở có nguồn:** [`06_TRUST_AND_EVIDENCE/j373/branch_micro_utilities.json`](file:///D:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/06_TRUST_AND_EVIDENCE/j373/branch_micro_utilities.json)
3. **Quy tắc 3 bước tại quầy:** [`06_TRUST_AND_EVIDENCE/j373/counter_offer_rules.json`](file:///D:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/06_TRUST_AND_EVIDENCE/j373/counter_offer_rules.json)
4. **Đặc tả kỹ thuật VietQR EMVCo:** [`06_TRUST_AND_EVIDENCE/j373/vietqr_spec_reference.json`](file:///D:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/06_TRUST_AND_EVIDENCE/j373/vietqr_spec_reference.json)
5. **Biên nhận đo kiểm Staging :4176:** [`07_QUALITY_ASSURANCE/runtime_evidence/JAYT_373_STAGING_ONSITE_RECEIPT.json`](file:///D:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/runtime_evidence/JAYT_373_STAGING_ONSITE_RECEIPT.json)
6. **Bảng kê khai candidate:** [`08_RELEASE_VAULT/candidates/j373/candidate_manifest.json`](file:///D:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/08_RELEASE_VAULT/candidates/j373/candidate_manifest.json)
7. **Hồ sơ đệ trình Gemini:** [`01_EXECUTIVE_COUNCIL/JAYT_373_GEMINI_REVIEW_PACKET.md`](file:///D:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/01_EXECUTIVE_COUNCIL/JAYT_373_GEMINI_REVIEW_PACKET.md)

Hồ sơ đã sẵn sàng cho Hội đồng Điều hành và Gemini tiến hành nghiệm thu thực nghiệm độc lập trên cổng Staging `http://127.0.0.1:4176`.
