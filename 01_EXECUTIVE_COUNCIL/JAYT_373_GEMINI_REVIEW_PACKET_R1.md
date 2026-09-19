# JAYT-373 R1 — HỒ SƠ NGHIỆM THU THỰC NGHIỆM CHO GEMINI (GEMINI REVIEW PACKET R1)

**Mã tài liệu:** `JAYT_373_GEMINI_REVIEW_PACKET_R1`  
**Căn cứ pháp lý & kỹ thuật:** 
- [Phán quyết CEO J373 R1](file:///D:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/01_EXECUTIVE_COUNCIL/JAYT_373_CEO_R1_STAGING_PARTIAL_ACCEPTANCE_AND_REMEDIATION_GATE.md)
- [Lệnh điều phối bổ chính J373 R1](file:///D:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/04_DATA_PIPELINE/dispatch/WORK_ORDER_J373_R1_ITEMIZED_QR_AND_FACTUAL_REMEDIATION.json)
- [Đặc tả giao diện J373](file:///D:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/01_EXECUTIVE_COUNCIL/JAYT_373_DESIGN_HANDOFF.md)  
**Đơn vị thực thi:** Antigravity  
**Môi trường thử nghiệm:** `http://127.0.0.1:4176` (`staging_workspace_j328`)  
**Phiên bản candidate:** `v3.437.0-j373-r1`  
**Thời điểm niêm phong:** 2026-09-10T09:06:30.409Z  
**Ranh giới thương mại:** `affiliate_enabled: false` tuyệt đối; 0 tracking, 0 tuyên bố hoa hồng/doanh thu.  
**Ranh giới phát hành:** `production_deployment_authorized: false`, `production_alias_mutation_authorized: false`.

---

## 1. Bảng đối soát tài nguyên phục vụ trên Staging `:4176`

Hệ thống đã đo kiểm và đối soát trực tiếp các tài nguyên trả về qua HTTP từ `http://127.0.0.1:4176`:

| Tài nguyên phục vụ | Dung lượng (Bytes) | SHA-256 Served Bytes | Trạng thái HTTP |
| :--- | :---: | :---: | :---: |
| `/` (HTML gốc) | 1.229 | `4a04e20ff24e7c83570a256a47a16b9b3924f7e27ec68b3f2ce54316d9b04f12` | **PASS (HTTP 200)** |
| `/styles.css` | 64.457 | `a7145e90db0d44aa527a206b0d97034c4491c7849dfb66d48d08cb7b827725ca` | **PASS (HTTP 200)** |
| `/jayt_apex_interface.js` | 470.899 | `354f11de35259360cda77608804982ab5908d12a34468b2e733eaa4484cf958d` | **PASS (HTTP 200)** |
| `/search.css` | 767 | `7ce6d73b800433f88d066cd9af14f71e56beca2ca876b1f34589c4f2ae78f100` | **PASS (HTTP 200)** |
| `/search.js` | 2.763 | `ac226ccb75a147e6d069e3a3cf0dec3a44da414c724e4965134d9e749f532bdc` | **PASS (HTTP 200)** |
| `/deals_feed.json` | 114.379 | `97d29399738c6781671ff4557506974334d31515f209256c383907177074cc60` | **PASS (HTTP 200)** |
| `/registry.json` | 48.314 | `52a8811109df36961edf9714a6e9ff09b3e4e944e3705b458dd189634e1140a3` | **PASS (HTTP 200)** |
| `/assets/vendor/qrcode.js` | 56.694 | `79ec86f82856005b1c887905cfccfcfbec3821ca61c7fd5a952faa5f778f791c` | **PASS (HTTP 200)** |

*Biên nhận kiểm thử chi tiết:* [`JAYT_373_R1_REMEDIATION_RECEIPT.json`](file:///D:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/runtime_evidence/JAYT_373_R1_REMEDIATION_RECEIPT.json).

---

## 2. Kết quả khắc phục toàn diện 3 điểm nghẽn CEO R1

### 🧾 A. Khắc phục SPLIT_R1: Sửa trực tiếp DOM, không ép giá ngầm & chặn thành viên chưa gán
1. **Giao diện chỉnh sửa trực quan (Direct DOM Controls):**
   - Loại bỏ hoàn toàn phương thức popup `prompt()` tạo món trước đây. Thay thế bằng các trường input trực tiếp trên giao diện: tên món, đơn giá (`input[data-item-field="price"]`), số lượng (`input[data-item-field="qty"]`), danh sách nút chọn người ăn (`[data-toggle-participant]`).
   - Hàng phí chung hiển thị rõ ràng: tên phụ phí, số tiền (`input[data-fee-field="amount"]`), nút thêm phí (`#btn-add-fee-inline`) và xóa phí (`[data-remove-fee]`).
2. **Từ chối ép giá tự động (Strict Validation Without Coercion):**
   - Nghiêm cấm `parseInt(str) || 50000`. Khi người dùng nhập ký tự không hợp lệ (`abc`, số âm `-50000`, số thập phân `50.5`, số 0):
     * Chuỗi nhập liệu gốc của người dùng được **giữ nguyên vẹn** trên input để người dùng thấy rõ lỗi gõ sai.
     * Khung input chuyển viền đỏ (`.is-invalid`), thông báo lỗi nội dòng hiển thị ngay bên dưới: `⚠️ Đơn giá phải là số nguyên dương (VNĐ)`.
     * Nút xác nhận tạo QR bị vô hiệu hóa (`disabled`), thanh toán bị chặn tuyệt đối cho tới khi người dùng chỉnh sửa hợp lệ.
3. **Chặn xóa thành viên khi có món chưa gán (Unassigned Item Settlement Blocking):**
   - Khi một thành viên bị xóa, các món ăn mà người đó được gán sẽ tự động hủy liên kết với người đó.
   - Nếu món ăn không còn ai chịu trách nhiệm (0 người ăn), hệ thống lập tức hiển thị cảnh báo: `⚠️ Cần xử lý: Có món ăn chưa gán người chia (hoặc người ăn vừa bị xóa). Vui lòng gán thành viên cho từng món trước khi xác nhận tạo QR.`. Nút xác nhận thanh toán bị khóa.
4. **Bảo toàn số nguyên VND chính xác từng đồng:**
   - Dữ liệu thực nghiệm phân bổ 3 người trong bài test QA tự động:
     * Bạn (Chủ bàn): 120.667₫
     * Thành viên 2: 117.667₫
     * Thành viên 3: 85.666₫
     * Tổng phân bổ: $120.667 + 117.667 + 85.666 = 324.000$₫ $equiv$ Tổng hóa đơn trên DOM: **324.000₫** (Bảo toàn 100%, sai số: 0₫).

---

### 💳 B. Khắc phục QR_R2: Khởi tạo người nhận rỗng, cổng xác nhận bắt buộc & cơ chế ẩn QR khi sửa
1. **Khởi tạo trống hoàn toàn trong luồng người dùng (Empty Start):**
   - Ngân hàng nhận (`#select-recipient-bank`), Số tài khoản (`#input-recipient-account`), và Tên người nhận (`#input-recipient-name`) khởi tạo hoàn toàn là chuỗi rỗng `""`.
   - Mã VietQR và chuỗi payload EMVCo **tuyệt đối không được kết xuất** khi người nhận chưa được xác nhận. Giao diện hiển thị trạng thái chờ: `🔒 Mã VietQR đang ẩn: Vui lòng điền ngân hàng, số tài khoản và bấm "Xác nhận thông tin & Tạo mã VietQR"`.
2. **Cổng xác nhận bắt buộc (Explicit Confirmation Gate):**
   - Người dùng bắt buộc phải điền đầy đủ ngân hàng hợp lệ, số tài khoản (bảo toàn nguyên vẹn số `0` ở đầu, ví dụ `0901234567`), tên người nhận và bấm nút `✓ Xác nhận thông tin & Tạo mã VietQR`.
   - Sau khi bấm, thẻ xác nhận (`.qr-confirmation-card`) hiển thị đầy đủ tóm tắt: Ngân hàng, Số tài khoản, Tên người nhận, Người thanh toán và Số tiền thực tế.
3. **Cơ chế ẩn QR tức thì khi có bất kỳ chỉnh sửa nào (Immediate Invalidation):**
   - Bất kỳ thao tác chỉnh sửa nào: bấm *"✏️ Sửa thông tin người nhận"*, hoặc sửa đơn giá/số lượng món ăn, hoặc thêm/xóa thành viên trên giao diện $ightarrow$ hệ thống lập tức hủy trạng thái xác nhận (`recipientConfirmed = false`), xóa sạch vùng hiển thị VietQR (`#onsite-vietqr-container`) và đưa về trạng thái chờ xác nhận lại.
4. **Minh bạch ranh giới kỹ thuật (STRUCTURE_VALIDATED vs NOT_TESTED):**
   - Cấu trúc mã hóa EMVCo TLV, trường định danh dịch vụ NAPAS 247 (`QRIBFTTA`), mã tiền tệ 704 (VND) và thuật toán kiểm tra CRC-16 CCITT đạt trạng thái: **`STRUCTURE_VALIDATED`**.
   - **Ranh giới thực nghiệm bắt buộc:** Nhận diện quang học vật lý trên ứng dụng ngân hàng thực tế trên điện thoại thông minh được công bố minh bạch và ghi nhận bảo thủ là **`NOT_TESTED`** (không tự ý tuyên bố PASS khi chưa có thiết bị di động vật lý độc lập kiểm nghiệm).

---

### 🏛️ C. Khắc phục FACT_R3: Chuỗi chứng cứ truy vết có nguồn cho từng tiện ích & ưu đãi
1. **Xử lý trung thực trạng thái thiếu bằng chứng lá (Strict Unknown Fallback):**
   - Tất cả các tiện ích chi nhánh (Wi-Fi, ổ cắm, máy lạnh, gửi xe máy, DanaBus) không có file capture lá trực tiếp từ cơ sở được chuyển đổi 100% về trạng thái **`UNKNOWN`** với thông điệp trung thực: `"Chưa có thông tin xác thực (Hỏi nhân viên tại quầy)"`.
   - Nghiêm cấm hiển thị mật khẩu Wi-Fi hoặc khẳng định có ổ cắm/máy lạnh khi không có bằng chứng văn bản/bảng hiệu cho phép công bố.
   - Tuyến xe buýt DanaBus không có feed GPS thời gian thực được dán nhãn rõ: `"DanaBus: Tham khảo lịch trình tại trạm dừng gần nhất"`, không giả lập vị trí xe buýt.
2. **Ưu đãi tại quầy không cộng dồn sai quy định:**
   - Ưu đãi ví điện tử (ZaloPay/VNPAY) chưa được kiểm chứng tại từng chi nhánh cụ thể được đưa về trạng thái tham khảo: `"Hỏi nhân viên về việc áp dụng voucher ví tại quầy ở thời điểm thanh toán"`. Tính toán giá rẻ nhất chỉ hiển thị giá niêm yết đã kiểm chứng độc lập.

---

## 3. Chỉ số đo kiểm kỹ thuật & Độ trễ (SLA Benchmark)

- **Benchmark 100 lần truy vấn tìm kiếm liên tục (Input-to-DOM latency):**
  * $p50 = 4.64	ext{ ms}$
  * $p95 = 6.28	ext{ ms}$ (SLA yêu cầu $< 50	ext{ ms} ightarrow$ **ĐẠT TIÊU CHUẨN XUẤT SẮC**)
  * $p99 = 10.66	ext{ ms}$
  * Maximum = $10.66	ext{ ms}$
- **Bố cục Responsive & Chống tràn màn hình:**
  * Mobile 390px: `scrollWidth (390px) === clientWidth (390px)`, hoàn toàn không phát sinh thanh cuộn ngang.
  * Touch target: Các nút bấm và trường nhập liệu đạt chiều cao `48px` ($ge 44	ext{px}$).
  * Phím `Escape`: Đóng ngay lập tức bảng thông tin quán và bảng chia tiền, phục hồi focus đúng chuẩn WCAG accessibility.
- **Kiểm toán an toàn dữ liệu & Quyền riêng tư:**
  * Toàn bộ dữ liệu số tài khoản, tên người nhận, thành viên và món ăn lưu trữ 100% trong bộ nhớ RAM tạm thời.
  * `localStorage.length === 0`, `sessionStorage.length === 0`.
  * Không phát sinh bất kỳ yêu cầu mạng (network request) nào chứa dữ liệu người dùng ra bên ngoài.
- **Độ ổn định trình duyệt:**
  * Console Errors: **0**
  * Page Exceptions: **0**

---

## 4. Thư viện ảnh chụp bằng chứng kiểm thử (Screenshots R1)

Các ảnh chụp màn hình thực tế từ Puppeteer Headless Chrome:
- **Desktop 1440px (Light):** [`j373_r1_desktop_1440_light.png`](file:///C:/Users/tritr/.gemini/antigravity/brain/0fd55bc2-4a92-47b9-9f66-c02b2cf9af3a/j373_r1_desktop_1440_light.png)
- **Desktop 1440px (Dark):** [`j373_r1_desktop_1440_dark.png`](file:///C:/Users/tritr/.gemini/antigravity/brain/0fd55bc2-4a92-47b9-9f66-c02b2cf9af3a/j373_r1_desktop_1440_dark.png)
- **Tablet 768px (Light):** [`j373_r1_tablet_768_light.png`](file:///C:/Users/tritr/.gemini/antigravity/brain/0fd55bc2-4a92-47b9-9f66-c02b2cf9af3a/j373_r1_tablet_768_light.png)
- **Tablet 768px (Dark):** [`j373_r1_tablet_768_dark.png`](file:///C:/Users/tritr/.gemini/antigravity/brain/0fd55bc2-4a92-47b9-9f66-c02b2cf9af3a/j373_r1_tablet_768_dark.png)
- **Mobile 390px (Light):** [`j373_r1_mobile_390_light.png`](file:///C:/Users/tritr/.gemini/antigravity/brain/0fd55bc2-4a92-47b9-9f66-c02b2cf9af3a/j373_r1_mobile_390_light.png)
- **Mobile 390px (Dark):** [`j373_r1_mobile_390_dark.png`](file:///C:/Users/tritr/.gemini/antigravity/brain/0fd55bc2-4a92-47b9-9f66-c02b2cf9af3a/j373_r1_mobile_390_dark.png)
- **Tiện ích có nguồn & UNKNOWN fallback:** [`j373_r1_sheet_utilities_1440.png`](file:///C:/Users/tritr/.gemini/antigravity/brain/0fd55bc2-4a92-47b9-9f66-c02b2cf9af3a/j373_r1_sheet_utilities_1440.png)
- **Lỗi nhập liệu hiển thị trực tiếp (Không ép số):** [`j373_r1_bill_invalid_price_error.png`](file:///C:/Users/tritr/.gemini/antigravity/brain/0fd55bc2-4a92-47b9-9f66-c02b2cf9af3a/j373_r1_bill_invalid_price_error.png)
- **Bảng chia tiền & Mã VietQR sau khi xác nhận:** [`j373_r1_bill_split_confirmed_1440.png`](file:///C:/Users/tritr/.gemini/antigravity/brain/0fd55bc2-4a92-47b9-9f66-c02b2cf9af3a/j373_r1_bill_split_confirmed_1440.png) & [`j373_r1_bill_split_confirmed_390.png`](file:///C:/Users/tritr/.gemini/antigravity/brain/0fd55bc2-4a92-47b9-9f66-c02b2cf9af3a/j373_r1_bill_split_confirmed_390.png)

---

## 5. Danh mục hồ sơ bàn giao & Trạng thái thẩm duyệt

1. **Biên nhận kiểm thử bổ chính R1:** [`07_QUALITY_ASSURANCE/runtime_evidence/JAYT_373_R1_REMEDIATION_RECEIPT.json`](file:///D:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án Giá Trị Cộng Đồng/07_QUALITY_ASSURANCE/runtime_evidence/JAYT_373_R1_REMEDIATION_RECEIPT.json)
2. **Kê khai Candidate niêm phong:** [`08_RELEASE_VAULT/candidates/j373-r1/candidate_manifest.json`](file:///D:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự Án Giá Trị Cộng Đồng/08_RELEASE_VAULT/candidates/j373-r1/candidate_manifest.json)
3. **Dữ liệu tiện ích vi mô R1:** [`06_TRUST_AND_EVIDENCE/j373/branch_micro_utilities_r1.json`](file:///D:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự Án Giá Trị Cộng Đồng/06_TRUST_AND_EVIDENCE/j373/branch_micro_utilities_r1.json)
4. **Quy tắc 3 bước tại quầy R1:** [`06_TRUST_AND_EVIDENCE/j373/counter_offer_rules_r1.json`](file:///D:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự Án Giá Trị Cộng Đồng/06_TRUST_AND_EVIDENCE/j373/counter_offer_rules_r1.json)
5. **Hồ sơ nghiệm thu Gemini R1:** [`01_EXECUTIVE_COUNCIL/JAYT_373_GEMINI_REVIEW_PACKET_R1.md`](file:///D:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự Án Giá Trị Cộng Đồng/01_EXECUTIVE_COUNCIL/JAYT_373_GEMINI_REVIEW_PACKET_R1.md)

### Trạng thái nghiệm thu kỹ thuật:
- Toàn bộ 3 điểm nghẽn của CEO R1 (sửa DOM/không ép giá, xác nhận người nhận VietQR, chuỗi chứng cứ sự thật) đã được khắc phục triệt để.
- **Ranh giới công bố:** Trạng thái nhận diện thực tế trên app ngân hàng được duy trì bảo thủ là **`NOT_TESTED`**. Không có tuyên bố PASS bao che khi chưa có thử nghiệm thiết bị thực.
- Bản candidate `v3.437.0-j373-r1` hiện đang chạy ổn định trên cổng Staging `http://127.0.0.1:4176` sẵn sàng để Gemini nghiệm thu thực nghiệm.
