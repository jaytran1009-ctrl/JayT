# BÁO CÁO ĐỐI SOÁT MA TRẬN CHÍNH SÁCH THƯƠNG HIỆU (V4.0)
## BATCH 13 POLICY AUDIT MATRIX — THU NẠP ĐỘC LẬP N+1 & ĐỐI SOÁT ĐIỀU KHOẢN TỪ RAW CAPTURE

- **Phiên bản:** `4.0` (Hoàn tất thu nạp một lượt có kiểm soát theo lệnh Hội đồng N+1 cho đúng 3 URL ban đầu và 5 trang chi tiết sản phẩm Jollibee; lưu trữ tại thư mục vault mới; không ghi đè chứng cứ cũ; đối soát giá thực đơn vs giá khuyến mãi; kiểm toán ranh giới địa lý Đà Nẵng UNVERIFIED)
- **Thời điểm kiểm toán:** `2026-09-06T08:25:00.000Z`
- **Phạm vi áp dụng:** `STAGING_INTERNAL_AUDIT — BATCH_13_POLICY_EVALUATION`
- **Tệp ma trận máy đọc:** `04_DATA_PIPELINE/batch_matrix/BRAND_POLICY_AUDIT_MATRIX.json` (SHA-256: `e3c6fb81ac51a16d0e73feda36fe027b5970a43583303cc00749b79d2b6ea1db`)
- **Tệp phạm vi thu nạp 3 URL:** `04_DATA_PIPELINE/batch_matrix/BATCH_13_POLICY_INGRESS_SCOPE.json` (SHA-256: `cdb8ee7b90a4902860b6f57ff63c8bd29e5fbbb5f06d3ef124207f41524fc121`)
- **Tệp phạm vi thu nạp 5 Combo Jollibee:** `04_DATA_PIPELINE/batch_matrix/BATCH_13_JOLLIBEE_PRODUCTS_SCOPE.json` (SHA-256: `04bd5e74240dcd03204895a35219f7491029a2ee25cd40a5338895e4d18cdda5`)
- **Thư mục Vault Thu nạp 5 Combo:** `06_TRUST_AND_EVIDENCE/batch_13_policy_ingress_vault/run_jollibee_combos_20260906_082143_dc594d`
- **Biên bản Thu nạp 5 Combo Jollibee:** `06_TRUST_AND_EVIDENCE/batch_13_policy_ingress_vault/run_jollibee_combos_20260906_082143_dc594d/JOLLIBEE_COMBOS_CAPTURE_RECEIPT.json`
- **Biên bản Đối soát 5 Combo Jollibee Chi tiết:** `06_TRUST_AND_EVIDENCE/batch_13_policy_ingress_vault/run_jollibee_combos_20260906_082143_dc594d/JOLLIBEE_LEAF_PAGE_AUDIT_RECEIPT.json`
- **Biên bản kiểm thử tự động Phạm vi Scope:** `06_TRUST_AND_EVIDENCE/batch_13_locator_vault/SCOPE_VERIFICATION_RECEIPT.json` (Kết quả: `3/3 passed — 100% MATCH`)
- **Biên bản kiểm thử tự động toàn bộ Spans:** `06_TRUST_AND_EVIDENCE/batch_13_locator_vault/SPAN_VERIFICATION_RECEIPT.json` (Kết quả: `21/21 passed — 100% MATCH`)

---

## 1. NGUYÊN TẮC ĐỐI SOÁT CHÍNH SÁCH CỐT LÕI (AUDIT PRINCIPLES)

1. **Nguyên tắc chống suy diễn chính sách (Anti-Synthesis Rule):**
   Chính sách ưu đãi toàn chuỗi phải được đối soát trực tiếp từ phản hồi HTTP raw (status 200) có chữ ký SHA-256 xác thực. Tuyệt đối không suy diễn từ sự tồn tại của cơ sở vật lý để tự động gán quyền lợi ưu đãi cho chi nhánh.
2. **Nguyên tắc phân lập độc lập chính sách (Policy Independence):**
   Mỗi chương trình ưu đãi phải được định danh bằng một Policy ID độc lập (ví dụ: CGV Culture Day tách riêng biệt khỏi CGV U22). Tuyệt đối không gộp điều kiện, mức giá, độ tuổi hoặc ngoại lệ của hai chương trình khác nhau thành một kết luận chung.
3. **Thẩm định điều khoản cấp Text Span & Byte Offset (Span-Level Verification):**
   Mọi điều khoản chính sách (đối tượng, mức giá, thời hạn, kênh mua, loại ghế, ngoại lệ phòng chiếu/ngày lễ) phải có đường dẫn nguồn, hash tệp raw, chuỗi text-span trích dẫn nguyên văn và vị trí byte offset chính xác trong tệp raw (`offset_utf8 === rawBuf.indexOf(Buffer.from(span, 'utf8'))`). Trường thiếu bằng chứng bắt buộc phải gán `UNVERIFIED`; không lưu suy đoán như dữ kiện.
4. **Quy định đối soát giá thực đơn vs giá khuyến mãi (Menu Prices != Promo Discounts):**
   Theo lệnh Hội đồng, việc xuất hiện biểu giá niêm yết của các món ăn tiêu chuẩn trên thực đơn (menu list prices) **hoàn toàn không đồng nghĩa với chương trình giảm giá khuyến mãi/ưu đãi (promotional discounts)**. Nếu nguồn không có điều khoản giảm giá so với giá gốc, điều khoản ưu đãi giữ nguyên `UNVERIFIED`.
5. **Ranh giới bảo mật WAF và Redirect:**
   Khi phản hồi mạng là trang chặn thử thách bảo mật (F5 WAF JavaScript challenge) hoặc phản hồi chuyển hướng (HTTP 302 Found), hệ thống ghi nhận trung thực mã trạng thái, headers (kèm `Location`), lưu tệp raw vào vault và dừng kiểm toán; **tuyệt đối không retry ngầm, không dùng thủ thuật bypass WAF và không tự ý cào sang URL ngoài phạm vi**.
6. **Ranh giới sự kiện lịch sử (Historical Event Boundary):**
   Chương trình có mốc thời gian diễn ra trong quá khứ (ví dụ: Thứ Hai 24/08/2026, đã qua tại thời điểm kiểm toán) được phân loại là **tham chiếu lịch sử, chưa xác minh hiệu lực hiện hành (`HISTORICAL_REFERENCE__CURRENT_VALIDITY_UNVERIFIED`)**. Tuyệt đối không tự động gán quyền hưởng ưu đãi hiện hành cho người dùng.
7. **Bất biến môi trường Staging & Production:**
   Ma trận kiểm toán này chỉ phục vụ phân loại và làm sạch dữ liệu nội bộ. Giữ `public_approved: false`, `render_permitted: false`. Staging duy trì nghiêm ngặt đúng 3 thẻ thương mại đã qua thẩm định (`B12_13`, `B12_15`, `B12_05`). Khóa 100% affiliate links. Live Production đóng băng ở `v3.422.0 / 24 thẻ`.

---

## 2. MA TRẬN ĐỐI SOÁT CHI TIẾT 6 CHÍNH SÁCH THƯƠNG HIỆU

### 2.1. CGV Cinemas — Culture Day (`POLICY_CGV_CULTURE_DAY`)

- **Mã chính sách:** `POLICY_CGV_CULTURE_DAY`
- **Thương hiệu:** CGV Cinemas Vietnam (`cgv_cinemas`)
- **Tên chính sách:** Chương trình Ưu đãi CGV Culture Day 2026 (Tham chiếu lịch sử)
- **URL nguồn chính thức:** `https://www.cgv.vn/default/newsoffer/cgv-culture-day-2026/`
- **Hồ sơ chứng cứ trong Vault:**
  - Tệp raw snapshot: `05_DEAL_AND_AFFILIATE/candidates/evidence_snapshots/cgv_culture_day_official_promo_raw.html`
  - Dung lượng: `55,213 bytes`
  - SHA-256 raw: `f8f1fe1922c945bf9b84e0860fd498f68a37e33e9e86be5784234d498a75e3eb`
  - Biên bản thu nhận: `05_DEAL_AND_AFFILIATE/candidates/evidence_snapshots/capture_receipt_CGV_CULTURE_DAY.json` (Thời điểm bắt: `2026-08-22T07:25:39.476Z`)
- **Bảng đối soát từng điều khoản trích xuất trực tiếp từ Raw HTML (Đã đối soát 13/13 spans tự động):**

| Điều khoản | Chuỗi văn bản trích xuất nguyên văn (Text Span) | Byte Offset trong Raw | Trạng thái xác minh | Ghi chú kiểm toán & Ranh giới chứng cứ |
|---|---|:---:|:---:|---|
| **Tiêu đề chính sách** | `CGV CULTURE DAY - THỨ HAI CUỐI CÙNG CỦA THÁNG ĐÃ TRỞ LẠI !!!` | `263` | **VERIFIED** | Tiêu đề sự kiện chính thức trên thẻ title và đầu trang |
| **Mốc ngày áp dụng** | `Thứ Hai – 24/08/2026` | `42019` | **VERIFIED** | Nguồn chứng minh sự kiện diễn ra ngày Thứ Hai 24/08/2026. Tại thời điểm kiểm toán (tháng 9/2026), ngày này đã qua. **Ghi nhận là đợt áp dụng lịch sử, CHƯA XÁC MINH HIỆU LỰC HIỆN HÀNH**. |
| **Câu cảm thán quảng cáo** | `nha cả nhà ơiiiii` | `42098` | **VERIFIED** | Đây là lời kêu gọi quảng bá cảm thán (advertorial phrase), **KHÔNG CHỨNG MINH chính sách không giới hạn độ tuổi**. Không dùng để suy diễn đối tượng. |
| **Đối tượng thụ hưởng** | `null` | `null` | **UNVERIFIED** | Nguồn raw không chứa điều khoản minh thị quy định tiêu chuẩn độ tuổi hoặc điều kiện hội viên. Bắt buộc giữ **UNVERIFIED**. |
| **Giá vé tiêu chuẩn 2D** | `58.000đ` | `42527` | **VERIFIED** | Mức giá áp dụng cho nhóm rạp được chỉ định (bao gồm cụm rạp tại Đà Nẵng) |
| **Cơ sở Đà Nẵng trong nguồn** | `CGV Vĩnh Trung Plaza` | `43133` | **VERIFIED** | Cụm rạp duy nhất tại Đà Nẵng được liệt kê trong danh sách áp dụng giá 58.000đ của đợt 24/08/2026 |
| **Kênh mua vé** | `Áp dụng cho khách hàng đặt vé trực tuyến (online) hoặc tại quầy.` | `46259` | **VERIFIED** | Áp dụng online và tại quầy |
| **Loại ghế áp dụng** | `Áp dụng cho mọi loại ghế (bao gồm ghế Sweetbox).` | `46368` | **VERIFIED** | Đã bao gồm ghế đôi Sweetbox |
| **Ngoại lệ vé nhóm** | `Không áp dụng cho mua vé nhóm (Group Sales), Suất Chiếu Đặc Biệt.` | `46656` | **VERIFIED** | Đã đính chính offset từ 45999 sang đúng vị trí byte 46656 |
| **Ngoại lệ phòng đặc biệt** | `Không áp dụng cho phòng chiếu IMAX, SCREENX, 4DX, ULTRA 4DX.` | `46780` | **VERIFIED** | Loại trừ các định dạng công nghệ cao |
| **Không cộng dồn ưu đãi** | `Không áp dụng chung với chương trình khuyến mãi khác của CGV và đối tác.` | `46887` | **VERIFIED** | Điều khoản cấm kết hợp khuyến mãi |
| **Ngoại lệ ngày Lễ Tết** | `Không áp dụng cho các ngày Lễ, Tết.` | `47012` | **VERIFIED** | Loại trừ các dịp nghỉ lễ chính thức |
| **Ưu đãi combo bắp nước** | `CGV Combo (bao gồm 02 nước + 01 bắp)` | `45981` | **VERIFIED** | Chi tiết thành phần gói bắp nước đi kèm |

- **Kế thừa chính sách trên 3 cơ sở CGV Đà Nẵng:**
  - `cgv_cgv_vinh_trung_plaza`: **`HISTORICAL_REFERENCE_ONLY`**
  - `cgv_cgv_vincom_da_nang`: **`UNVERIFIED`**
  - `cgv_cgv_mm_da_nang`: **`UNVERIFIED`**
- **Kết luận:** **`HISTORICAL_REFERENCE__CURRENT_VALIDITY_UNVERIFIED`**. Giữ 100% ranh giới lịch sử; **KHÔNG PHÁT HÀNH THẺ THƯƠNG MẠI**.

---

### 2.2. CGV Cinemas — Quyền lợi Thành viên & U22 (`POLICY_CGV_U22`)

- **Mã chính sách:** `POLICY_CGV_U22`
- **Thương hiệu:** CGV Cinemas Vietnam (`cgv_cinemas`)
- **Tên chính sách:** Chính sách Giá Vé Thành viên U22 (Học sinh - Sinh viên)
- **URL nguồn đã thu nạp:** `https://www.cgv.vn/default/cgv-membership`
- **Hồ sơ chứng cứ trong Vault Mới:**
  - Tệp raw snapshot: `06_TRUST_AND_EVIDENCE/batch_13_policy_ingress_vault/run_20260906_075712_2aaec7/cgv_cinemas.raw.html`
  - Dung lượng: `5,390 bytes`
  - SHA-256 raw: `5ef9bdd04da5fa7af28a119303ec38cf9ddfc5022973a6b76f2d1f1a239d77b6`
  - Tệp headers đã lọc: `06_TRUST_AND_EVIDENCE/batch_13_policy_ingress_vault/run_20260906_075712_2aaec7/cgv_cinemas.headers.json`
  - Tệp receipt mục tiêu: `06_TRUST_AND_EVIDENCE/batch_13_policy_ingress_vault/run_20260906_075712_2aaec7/cgv_cinemas.receipt.json`
  - Thời điểm thu nạp: `2026-09-06T07:57:12.584Z`
  - Mã trạng thái HTTP: **`200 OK` — F5 WAF JavaScript Anti-bot Challenge (`TS015ef8cd_id`)**
- **Kết quả Kiểm toán Nội dung (Audit Findings):**
  - Phản hồi thực tế là trang thử thách JavaScript của hệ thống bảo mật F5 BIG-IP / ASM (`<noscript>Please enable JavaScript to view the page content.</noscript>`).
  - Hoàn toàn **không chứa thân trang HTML rendered**, không có văn bản về quyền lợi thành viên, không có biểu giá U22, không có tiêu chuẩn tuổi học sinh/sinh viên.
  - Tuân thủ nghiêm ngặt chỉ thị của Hội đồng ("Gặp lỗi hoặc WAF thì ghi nhận và dừng mục đó, không retry ngầm"), hệ thống ghi nhận trung thực và không dùng thủ thuật bypass.
- **Bảng đối soát từng điều khoản:**

| Điều khoản | Text Span trong Raw | Byte Offset | Trạng thái xác minh | Ghi chú kiểm toán |
|---|:---:|:---:|:---:|---|
| **Độ tuổi / Đối tượng** | `null` | `null` | **UNVERIFIED** | Phản hồi mạng là F5 WAF Challenge; không có văn bản điều khoản độ tuổi trong raw |
| **Mức giá vé ưu đãi** | `null` | `null` | **UNVERIFIED** | Không có bảng giá vé trong phản hồi |
| **Thời hạn hiệu lực tài khoản** | `null` | `null` | **UNVERIFIED** | Không có chứng từ thời hạn trong phản hồi |
| **Kênh áp dụng & Thủ tục** | `null` | `null` | **UNVERIFIED** | Không có quy định xuất trình giấy tờ xác thực |
| **Ngoại lệ phòng chiếu** | `null` | `null` | **UNVERIFIED** | Không có quy định loại trừ phòng chiếu |
| **Phạm vi chi nhánh** | `null` | `null` | **UNVERIFIED** | Không có danh sách cụm rạp áp dụng |

- **Kế thừa chính sách trên 3 cơ sở CGV Đà Nẵng:**
  - `cgv_cgv_vinh_trung_plaza`: **`UNVERIFIED`**
  - `cgv_cgv_vincom_da_nang`: **`UNVERIFIED`**
  - `cgv_cgv_mm_da_nang`: **`UNVERIFIED`**
- **Kết luận chính sách CGV U22:** **`UNVERIFIED`**. Toàn bộ điều khoản giữ nguyên trạng thái UNVERIFIED; **TUYỆT ĐỐI KHÔNG PHÁT HÀNH THẺ THƯƠNG MẠI**.

---

### 2.3. Galaxy Cinema — Giá Vé U22 (`POLICY_B12_04_GALAXY_U22`)

- **Mã chính sách:** `POLICY_B12_04_GALAXY_U22`
- **Thương hiệu:** Galaxy Cinema (`galaxy_cinema`)
- **Tên chính sách:** Chính sách Giá Vé U22 Galaxy Cinema
- **URL nguồn đã thu nạp:** `https://www.galaxycine.vn/u22/`
- **Hồ sơ chứng cứ trong Vault Mới:**
  - Tệp raw snapshot: `06_TRUST_AND_EVIDENCE/batch_13_policy_ingress_vault/run_20260906_075712_2aaec7/galaxy_cinema.raw.html`
  - Dung lượng: `138 bytes`
  - SHA-256 raw: `753e0dd54f28c4f7009b9c0b18a68aed175416bd8b7d134858264586eaac56f0`
  - Tệp headers đã lọc: `06_TRUST_AND_EVIDENCE/batch_13_policy_ingress_vault/run_20260906_075712_2aaec7/galaxy_cinema.headers.json`
  - Tệp receipt mục tiêu: `06_TRUST_AND_EVIDENCE/batch_13_policy_ingress_vault/run_20260906_075712_2aaec7/galaxy_cinema.receipt.json`
  - Thời điểm thu nạp: `2026-09-06T07:57:12.913Z`
  - Mã trạng thái HTTP: **`302 Found` (Moved Temporarily)**
  - Tiêu đề Location quan sát: `location: "https://www.galaxycine.vn/u22/"`
- **Kết quả Kiểm toán Nội dung (Audit Findings):**
  - Phản hồi thực tế là HTTP 302 Found từ máy chủ nginx (vòng chuyển hướng 138 bytes).
  - Tuân thủ nghiêm ngặt chỉ đạo của Hội đồng ("Nếu gặp redirect, lưu phản hồi và Location; không tự mở rộng sang URL ngoài scope"), hệ thống ghi nhận đầy đủ headers và thân phản hồi, không tự ý cào sang URL khác.
  - Thân phản hồi chỉ có tiêu đề 302 của nginx, hoàn toàn không có thân trang bài viết hay điều khoản U22.
- **Bảng đối soát từng điều khoản:**

| Điều khoản | Text Span trong Raw | Byte Offset | Trạng thái xác minh | Ghi chú kiểm toán |
|---|:---:|:---:|:---:|---|
| **Độ tuổi / Đối tượng** | `null` | `null` | **UNVERIFIED** | Phản hồi chỉ là HTTP 302 chuyển hướng; hoàn toàn không có văn bản điều khoản độ tuổi |
| **Biểu giá vé U22** | `null` | `null` | **UNVERIFIED** | Không có bảng giá vé trong tệp raw |
| **Thời hạn áp dụng** | `null` | `null` | **UNVERIFIED** | Không có chứng từ thời hạn |
| **Kênh mua vé** | `null` | `null` | **UNVERIFIED** | Không có quy định kênh mua vé |
| **Áp dụng tại Đà Nẵng** | `null` | `null` | **UNVERIFIED** | Không có chứng từ áp dụng cho rạp Galaxy Co.opmart Đà Nẵng |

- **Kế thừa chính sách:** `galaxy_cinema_da_nang` giữ nguyên **`UNVERIFIED`**.
- **Kết luận:** **`UNVERIFIED`**. Toàn bộ điều khoản bị đình chỉ; **TUYỆT ĐỐI KHÔNG PHÁT HÀNH THẺ THƯƠNG MẠI**.

---

### 2.4. Jollibee Vietnam — Thực đơn & Combo Bán Chạy (`POLICY_B12_09_JOLLIBEE_COMBO`)

- **Mã chính sách:** `POLICY_B12_09_JOLLIBEE_COMBO`
- **Thương hiệu:** Jollibee Vietnam (`jollibee`)
- **Tên chính sách:** Chương trình Combo Tiết Kiệm / Thực đơn Jollibee
- **URL nguồn đã thu nạp:** `https://jollibee.com.vn/mon-moi-mon-ngon.html`
- **Hồ sơ chứng cứ trong Vault Mới:**
  - Tệp raw snapshot: `06_TRUST_AND_EVIDENCE/batch_13_policy_ingress_vault/run_20260906_075712_2aaec7/jollibee.raw.html`
  - Dung lượng: `264,495 bytes`
  - SHA-256 raw: `131ae8fcc4a8ed0c66470be43614c448c542ec7b047147a71598531e570b2a33`
  - Tệp headers đã lọc: `06_TRUST_AND_EVIDENCE/batch_13_policy_ingress_vault/run_20260906_075712_2aaec7/jollibee.headers.json`
  - Tệp receipt mục tiêu: `06_TRUST_AND_EVIDENCE/batch_13_policy_ingress_vault/run_20260906_075712_2aaec7/jollibee.receipt.json`
  - Thời điểm thu nạp: `2026-09-06T07:57:14.681Z`
  - Mã trạng thái HTTP: **`200 OK` — Tiêu đề: "Món mới món ngon"**
- **Kết quả Kiểm toán Nội dung (Audit Findings):**
  1. **Quan sát Biểu giá Thực đơn Tiêu chuẩn (Menu List Prices):**
     Trong khối dữ liệu giỏ hàng GA4 eCommerce và cấu hình Magento (`item_category: "Combo Bán Chạy"`), ghi nhận 5 sản phẩm combo tiêu chuẩn cùng giá niêm yết:
     - `CÀNG CAY CÀNG MÊ` (ID: 70145): **157.000 VND**
     - `MỘT MÌNH HÍT HÀ` (ID: 70144): **80.000 VND**
     - `Một Mình Ăn Ngon` (ID: 2840004): **73.000 VND**
     - `Cặp Đôi Ăn Ý` (ID: 4000742): **145.000 VND**
     - `Cả Nhà No Nê` (ID: 4000935): **185.000 VND**
  2. **CHỐT CHẶN HỘI ĐỒNG — GIÁ THỰC ĐƠN KHÔNG PHẢI GIÁ KHUYẾN MÃI:**
     Tuân thủ nghiêm ngặt chỉ đạo của Hội đồng: Mức giá trên là giá niêm yết tiêu chuẩn của các gói combo trong thực đơn, **hoàn toàn KHÔNG CHỨNG MINH chính sách giảm giá khuyến mãi hay ưu đãi đặc biệt** (không có so sánh giá gốc, không có tỷ lệ chiết khấu, không có điều khoản khuyến mãi).
  3. **Kiểm toán Ranh giới Địa lý & Đối tượng:**
     - Từ khóa "Đà Nẵng": xuất hiện **0 lần** trong toàn bộ tệp raw (264.495 bytes). Không có điều khoản quy định áp dụng riêng cho các cửa hàng tại Đà Nẵng $ightarrow$ Giữ **UNVERIFIED**.
     - Từ khóa "học sinh", "sinh viên", "độ tuổi": xuất hiện **0 lần** $ightarrow$ Giữ **UNVERIFIED**.
     - Thời hạn hiệu lực: không có ngày bắt đầu/kết thúc $ightarrow$ Giữ **UNVERIFIED**.
  4. **Kênh dịch vụ:** Ghi nhận hotline giao hàng `1900-1533` và banner `GIAO HÀNG TẬN NƠI MIỄN PHÍ`.
- **Bảng đối soát từng điều khoản:**

| Điều khoản | Text Span trong Raw | Byte Offset | Trạng thái xác minh | Ghi chú kiểm toán |
|---|:---:|:---:|:---:|---|
| **Chính sách giảm giá khuyến mãi** | `null` | `null` | **UNVERIFIED** | Giá combo là giá thực đơn niêm yết; không cấu thành ưu đãi khuyến mãi có chiết khấu |
| **Đối tượng học sinh / sinh viên** | `null` | `null` | **UNVERIFIED** | 0 lần xuất hiện trong raw HTML; không có giới hạn đối tượng |
| **Thời hạn hiệu lực khuyến mãi** | `null` | `null` | **UNVERIFIED** | Không có mốc thời gian áp dụng khuyến mãi |
| **Áp dụng tại hệ thống Đà Nẵng** | `null` | `null` | **UNVERIFIED** | 0 lần xuất hiện từ khóa "Đà Nẵng" trong thân trang thực đơn |
| **Kênh giao hàng** | `null` | `null` | **UNVERIFIED** | Có banner giao hàng và hotline 1900-1533 nhưng không có điều khoản ưu đãi riêng |

- **Kế thừa chính sách trên 9 cơ sở Jollibee Đà Nẵng:**
  - Toàn bộ 9 cơ sở (`jollibee_59`, `106`, `121`, `132`, `135`, `139`, `156`, `158`, `252`): giữ nguyên **`UNVERIFIED`**.
- **Kết luận:** **`UNVERIFIED`**. Giá thực đơn không được gán quyền phát hành thẻ ưu đãi; **TUYỆT ĐỐI KHÔNG PHÁT HÀNH THẺ THƯƠNG MẠI**.

---

### 2.5. Phúc Long Heritage — Chính sách Thành viên (`POLICY_B12_05_PHUCLONG_MEMBER`)

- **Mã chính sách:** `POLICY_B12_05_PHUCLONG_MEMBER`
- **Thương hiệu:** Phúc Long Heritage (`phuclong`)
- **URL nguồn:** `https://phuclong.com.vn/hoi-vien/dieu-khoan-va-dieu-kien-chuong-trinh-hoi-vien`
- **Hồ sơ chứng cứ trong Vault:**
  - Raw snapshot: `06_TRUST_AND_EVIDENCE/batch_12_ingress_vault/B12_05.raw.html` (124,655 bytes, SHA-256: `9c4eadd1660bc043c3a6c685fd98589ead6bb4dbe5eb498ced669fbc46c938c4`)
  - Dossier đã thẩm định: `06_TRUST_AND_EVIDENCE/batch_12_ingress_vault/B12_05_PHUCLONG_MEMBER_BENEFIT_DOSSIER.json` (SHA-256: `791180d61b712eebf2d9bd4f75210c5745901895c0b14c216012b8950843d2cb`)
- **Bảng đối soát 6 điều khoản trích xuất trực tiếp từ Raw HTML (Đã đối soát 6/6 spans tự động):**

| Điều khoản | Text Span trích xuất nguyên văn | Byte Offset | Trạng thái | Ghi chú kiểm toán |
|---|---|:---:|:---:|---|
| **Tỷ lệ tích điểm** | `Tỷ lệ quy đổi điểm khả dụng (Điểm đổi quà) và điểm tích lũy: 10.000 đồng = 1 điểm` | `47548` | **VERIFIED** | Tỷ lệ tích điểm chuẩn hóa toàn hệ thống |
| **Thời hạn điểm** | `Điểm đổi quà có hạn sử dụng là 1 năm kể từ ngày tích điểm đó.` | `47961` | **VERIFIED** | Hạn sử dụng 1 năm kể từ ngày giao dịch |
| **Phạm vi tích điểm** | `Chỉ áp dụng tích lũy điểm khi khách hàng thực hiện giao dịch tại website Phúc Long và trực tiếp tại hệ thống cửa hàng Phúc Long trên toàn quốc (ngoại trừ cửa hàng tại Sân Bay, Winmart, Winmart+, WiN, Preminum)` | `48205` | **VERIFIED** | Minh thị loại trừ cửa hàng Sân Bay |
| **Ngoại lệ đổi quà** | `(ngoại trừ Phúc Long Sân Bay Tân Sơn Nhất, Winmart, Winmart+, WiN, Phúc Long Premium Xuân Thủy)` | `48944` | **VERIFIED** | Chỉ nêu Tân Sơn Nhất; Sân bay Đà Nẵng không nêu tên $\rightarrow$ Tách biệt: Tích điểm `EXCLUDED`, Đổi quà `UNVERIFIED` |
| **Quy tắc đổi nước** | `Mỗi 100 điểm khả dụng sẽ đổi được 1 ly nước miễn phí tùy chọn size vừa (M)` | `55875` | **VERIFIED** | Quy tắc đổi ly nước size M |
| **Không cộng dồn** | `Điểm khả dụng (Điểm đổi quà) hay Điểm tích lũy KHÔNG ĐƯỢC ÁP DỤNG chung với các hình thức phi tiền mặt như voucher, e-voucher, coupon, e-coupon, phiếu quà tặng… và các chương trình khuyến mãi khác.` | `49101` | **VERIFIED** | Điều khoản cấm cộng dồn khuyến mãi khác |

- **Kế thừa chính sách 7 cơ sở vật lý:**
  - 6 cơ sở thường (`phuclong_2005`, `2006`, `2116`, `2176`, `2217`, `2237`): Tích điểm `ELIGIBLE`, Đổi quà `ELIGIBLE` $\rightarrow$ Chung: `ELIGIBLE`
  - 1 cơ sở sân bay (`phuclong_2129`): Tích điểm `EXCLUDED`, Đổi quà `UNVERIFIED` $\rightarrow$ Chung: `EXCLUDED`
- **Kết luận:** **`AUDITED_STAGING_ONLY`**. Triển khai thẻ `B12_05 v2` tại khu thương mại riêng trên Staging; chưa phê duyệt Production.

---

### 2.6. Phi Long Technology — Khảo sát Giá Bán lẻ (`POLICY_B12_15_PHILONG_RETAIL`)

- **Mã chính sách:** `POLICY_B12_15_PHILONG_RETAIL`
- **Thương hiệu:** Phi Long Technology (`phi_long`)
- **Tên quan sát:** Khảo sát Đơn lẻ Giá Bán lẻ Sản phẩm B12_15 (USB Kingston 64GB)
- **URL nguồn:** `https://philong.com.vn/hdd-usb-kingston-64gb-datatraveler-exodia-dtx64gb-usb-3.2.html`
- **Nguồn raw snapshot:** `06_TRUST_AND_EVIDENCE/radar_price_vault/B12_15_PRICE_v2.raw.html`
- **Dung lượng:** `329,524 bytes`
- **SHA-256 raw:** `108a8554e25c93ac97ccb7da249a019da6069ce17df63626a72cd5843b9ed993`
- **Bảng đối soát điều khoản quan sát (Đã đối soát 2/2 spans tự động):**

| Điều khoản | Text Span trích xuất nguyên văn | Byte Offset | Trạng thái | Ghi chú kiểm toán & Đính chính sản phẩm |
|---|---|:---:|:---:|---|
| **Tên sản phẩm quan sát** | `HDD USB Kingston 64GB DataTraveler Exodia DTX/64GB (USB 3.2)` | `213` | **VERIFIED** | **Sản phẩm khảo sát chính xác là USB Flash Drive Kingston Exodia 64GB (hoàn toàn KHÔNG PHẢI CHUỘT MÁY TÍNH)**. Bảo toàn nguyên văn dữ kiện phần cứng. |
| **Giá bán lẻ quan sát** | `290.000` | `243519` | **VERIFIED** | Mức giá bán lẻ quan sát 290.000 VNĐ tại thời điểm server Sun, 06 Sep 2026 05:15:55 GMT. |

- **Kế thừa chính sách trên 2 showroom Phi Long Đà Nẵng:**
  - `phi_long_ham_nghi` (152-158 Hàm Nghi): **`UNVERIFIED`**
  - `phi_long_nguyen_van_linh` (52 Nguyễn Văn Linh): **`UNVERIFIED`**
- **Kết luận:** **`NOT_APPLICABLE`**. Khảo sát giá bán lẻ đơn lẻ của sản phẩm USB Kingston Exodia 64GB không cấu thành chính sách ưu đãi thành viên toàn chuỗi. Hai showroom Phi Long giữ nguyên `UNVERIFIED`.
- **Trạng thái thẻ:** Thẻ thương mại `B12_15 v2` được gắn tại Staging dưới dạng khảo sát giá sản phẩm (Product Observation Only).

---

## 3. TỔNG HỢP VÀ BẢO TOÀN RANH GIỚI STAGING & PRODUCTION

### 3.1. Bảng tổng hợp trạng thái 6 chính sách và 22 cơ sở vật lý

| Mã chính sách | Thương hiệu | Số cơ sở vật lý | Trạng thái chính sách | Quyền phát hành thẻ | Ghi chú vận hành |
|---|---|:---:|---|:---:|---|
| `POLICY_CGV_CULTURE_DAY` | CGV Cinemas | 3 | `HISTORICAL_REFERENCE__CURRENT_VALIDITY_UNVERIFIED` | **KHÔNG** | 1 rạp HISTORICAL_REFERENCE_ONLY; 2 rạp UNVERIFIED; không phát hành thẻ |
| `POLICY_CGV_U22` | CGV Cinemas | 3 | **UNVERIFIED** | **KHÔNG** | Phản hồi mạng là F5 WAF Challenge (5.390b); 3 rạp UNVERIFIED |
| `POLICY_B12_04_GALAXY_U22` | Galaxy Cinema | 1 | **UNVERIFIED** | **KHÔNG** | Phản hồi mạng là HTTP 302 nginx (138b); 1 rạp UNVERIFIED |
| `POLICY_B12_09_JOLLIBEE_COMBO` | Jollibee Vietnam | 9 | **UNVERIFIED** | **KHÔNG** | Giá thực đơn tiêu chuẩn != giá khuyến mãi; 0 từ khóa Đà Nẵng; 9 cửa hàng UNVERIFIED |
| `POLICY_B12_05_PHUCLONG_MEMBER` | Phúc Long | 7 | `AUDITED_STAGING_ONLY` | **STAGING-ONLY** | Thẻ B12_05 v2 Staging (6 ELIGIBLE, 1 EXCLUDED) |
| `POLICY_B12_15_PHILONG_RETAIL` | Phi Long | 2 | `NOT_APPLICABLE` | **STAGING-ONLY** | Quan sát giá sản phẩm USB Kingston 64GB (290k); 2 showroom UNVERIFIED |
| **TỔNG CỘNG** | **6 THƯƠNG HIỆU** | **22** | **4 UNVERIFIED / 1 HISTORICAL / 1 AUDITED** | **2 thẻ Staging (1 deal, 1 price)** | **Bảo toàn 100% ranh giới Staging (3 thẻ) & Production (24 thẻ)** |

---

### 3.2. Bảng đối soát 3 Mục tiêu Thu nạp Mạng Độc lập (Capture Ingress Audit)

| STT | Ứng viên / Thương hiệu | Target URL | HTTP Status & Response Type | Dung lượng & SHA-256 | Phán quyết Kiểm toán Điều khoản (Policy Audit Verdict) |
|:---:|---|---|---|---|---|
| 1 | **CGV Cinemas**<br>`CAND_POLICY_CGV_MEMBERSHIP` | `https://www.cgv.vn/default/cgv-membership` | **200 OK**<br>F5 WAF JS Challenge (`TS015ef8cd_id`) | `5,390 bytes`<br>`5ef9bdd04da5fa7af28a119303ec38cf9ddfc5022973a6b76f2d1f1a239d77b6` | **UNVERIFIED (100%)**<br>Phản hồi là thử thách bot bảo mật F5 WAF; hoàn toàn không có thân HTML bài viết/điều khoản. Dừng kiểm toán, không retry/bypass. |
| 2 | **Galaxy Cinema**<br>`CAND_POLICY_GALAXY_U22` | `https://www.galaxycine.vn/u22/` | **302 Found**<br>nginx redirect (`location: /u22/`) | `138 bytes`<br>`753e0dd54f28c4f7009b9c0b18a68aed175416bd8b7d134858264586eaac56f0` | **UNVERIFIED (100%)**<br>Phản hồi là HTTP 302 Found (nginx loop). Ghi nhận Location header, dừng tại ranh giới scope; không tự cào sang URL khác. Không có điều khoản U22. |
| 3 | **Jollibee Vietnam**<br>`CAND_POLICY_JOLLIBEE_MENU` | `https://jollibee.com.vn/mon-moi-mon-ngon.html` | **200 OK**<br>Thực đơn / "Combo Bán Chạy" | `264,495 bytes`<br>`131ae8fcc4a8ed0c66470be43614c448c542ec7b047147a71598531e570b2a33` | **UNVERIFIED (100%)**<br>Ghi nhận 5 combo tiêu chuẩn (73k-185k) trong GA4 eCommerce. Tuân thủ chỉ đạo Hội đồng: Giá thực đơn niêm yết KHÔNG phải giá khuyến mãi/ưu đãi. 0 lần xuất hiện từ khóa "Đà Nẵng". Không có điều khoản học sinh/sinh viên hay thời hạn. |

> [!IMPORTANT]
> **Cam kết & Bất biến Vận hành:**
> 1. Toàn bộ 3 mục tiêu thu nạp mạng đợt này **ĐỀU GIỮ NGUYÊN TRẠNG THÁI UNVERIFIED**, không có bất kỳ điều khoản ưu đãi nào đủ điều kiện cấp phép phát hành thẻ mới.
> 2. Giữ nguyên `public_approved: false` và `render_permitted: false`.
> 3. Không thu lại locator; không thêm thẻ tự động; không bật affiliate; Production đóng băng tuyệt đối tại `v3.422.0 / 24 thẻ`.

---

## 4. MA TRẬN ĐỐI SOÁT 5 SẢN PHẨM THỰC ĐƠN JOLLIBEE (LEAF PAGE INGRESS AUDIT)

Thực hiện lệnh Hội đồng N+1 (Work Order Phần 2), Antigravity đã hoàn thành việc thu nạp nội bộ một lượt và kiểm toán đối soát chi tiết 5 trang sản phẩm thực đơn combo của Jollibee từ các URL trích xuất trực tiếp từ thẻ raw:

- **Mã phạm vi:** `BATCH_13_JOLLIBEE_PRODUCTS_SCOPE.json` (v1.0, 5 ứng viên)
- **Thư mục Vault thu nạp:** `06_TRUST_AND_EVIDENCE/batch_13_policy_ingress_vault/run_jollibee_combos_20260906_082143_dc594d`
- **Biên bản thu nạp tổng hợp:** `JOLLIBEE_COMBOS_CAPTURE_RECEIPT.json` (5/5 HTTP 200 OK, không có redirect hay challenge)
- **Biên bản đối soát chi tiết:** `JOLLIBEE_LEAF_PAGE_AUDIT_RECEIPT.json` (Trỏ bởi `LATEST_JOLLIBEE_LEAF_PAGE_AUDIT_RECEIPT.json`)
- **Chốt chặn an toàn (Three-State Guards):**
  - `response_saved: true` (Đã thu nạp và lưu 5/5 tệp raw vào vault an toàn)
  - `leaf_content_reconciled: true` (Đã đối soát 100% ID, SKU, giá cơ sở, cấu hình bundle, món mặc định)
  - `da_nang_scope_verified: false` (**`UNVERIFIED`** — Không có chứng cứ cửa hàng Đà Nẵng trong HTML)
  - `publication_approved: false` (Chưa phê duyệt phát hành; quyền thuộc Hội đồng)

### 4.1. Bảng đối soát chi tiết 5 sản phẩm thực đơn chi tiết (Leaf Pages)

| STT | Mã ứng viên | Tên Catalog & Tiêu đề Leaf | Product ID & SKU | URL mục tiêu | Dung lượng & SHA-256 raw | Biểu giá đối soát | Món mặc định & Cấu hình Bundle | Phán quyết Phạm vi Đà Nẵng |
|:---:|---|---|:---:|---|---|---|---|:---:|
| 1 | `PROD_JOLLIBEE_COMBO_01` | **CÀNG CAY CÀNG MÊ**<br>(Khớp 100% tên) | ID: `680`<br>SKU: `70145` | `https://jollibee.com.vn/cang-cay-cang-m.html` | `223,906 bytes`<br>`dc14e9de...c5982e` | Giá cơ sở: **157.000 ₫**<br>GA4 catalog: 157.000 ₫<br>DOM: 157k - 225k<br>(`isFixedPrice: true`) | **Mặc định:** 2 Mì ý sốt cay vừa + 1 Gà Sốt cay + 1 Gà Giòn Vui Vẻ + 2 Nước ngọt + 1 Khoai tây chiên vừa<br>**Bundle:** 8 options (7 mặc định + 1 sốt tùy chọn) | **UNVERIFIED**<br>(0 lần xuất hiện "Đà Nẵng") |
| 2 | `PROD_JOLLIBEE_COMBO_02` | **MỘT MÌNH HÍT HÀ**<br>(Khớp 100% tên) | ID: `679`<br>SKU: `70144` | `https://jollibee.com.vn/m-t-minh-hit-ha.html` | `189,048 bytes`<br>`6c9aff91...4e2e92` | Giá cơ sở: **80.000 ₫**<br>GA4 catalog: 80.000 ₫<br>DOM: 80k - 106k<br>(`isFixedPrice: true`) | **Mặc định:** 1 Mì ý sốt cay vừa + 1 Gà Sốt cay + 1 Nước ngọt<br>**Bundle:** 4 options (3 mặc định + 1 sốt tùy chọn) | **UNVERIFIED**<br>(0 lần xuất hiện "Đà Nẵng") |
| 3 | `PROD_JOLLIBEE_COMBO_03` | Catalog: **Một Mình Ăn Ngon**<br>Leaf Title: **Mì Ý Sốt Bò Bằm + 1 miếng gà rán + Nước ngọt**<br>(*Phân kỳ tên gọi*) | ID: `36`<br>SKU: `2840004` | `https://jollibee.com.vn/mi-y-so-t-bo-ba-m-1-mie-ng-ga-ra-n-nuo-c-ngo-t.html` | `219,833 bytes`<br>`e21932b5...633a5b` | Giá cơ sở: **73.000 ₫**<br>GA4 catalog: 73.000 ₫<br>DOM: 73k - 135k<br>(`isFixedPrice: true`) | **Mặc định:** 1 Gà Giòn Vui Vẻ + 1 Mì Ý Jolly + 1 Nước ngọt + 1 Tương Chua Ngọt<br>**Bundle:** 4 options (3 mặc định + 1 thêm món 16 lựa chọn) | **UNVERIFIED**<br>(0 lần xuất hiện "Đà Nẵng") |
| 4 | `PROD_JOLLIBEE_COMBO_04` | **Cặp Đôi Ăn Ý**<br>(Khớp 100% tên trong trang; slug có `cho-khu-v-c-mi-n-b-c-1`) | ID: `158`<br>SKU: `4000742` | `https://jollibee.com.vn/combo-an-ngon-th-ga-cho-khu-v-c-mi-n-b-c-1.html` | `233,865 bytes`<br>`ef2fa0bd...3c5587` | Giá cơ sở: **145.000 ₫**<br>GA4 catalog: 145.000 ₫<br>DOM: 145k - 225k<br>(`isFixedPrice: true`) | **Mặc định:** 2 Gà Giòn Vui Vẻ + 2 Mì Ý Jolly vừa + 1 Khoai tây chiên vừa + 2 Nước ngọt vừa + 2 Tương Chua Ngọt + 1 Tương Cà<br>**Bundle:** 8 options (7 mặc định + 1 thêm món) | **UNVERIFIED**<br>(0 lần xuất hiện "Đà Nẵng"; không có văn bản Miền Bắc trong thân) |
| 5 | `PROD_JOLLIBEE_COMBO_05` | Catalog: **Cả Nhà No Nê**<br>Leaf Title: **COMBO 179**<br>(*Phân kỳ tên gọi & số tiền*) | ID: `143`<br>SKU: `4000935` | `https://jollibee.com.vn/combo-179.html` | `256,614 bytes`<br>`7e8c29b8...351dfb` | Giá cơ sở: **185.000 ₫**<br>(*Lệch với số 179 trong tên*)<br>GA4 catalog: 185.000 ₫<br>DOM: 185k - 282k<br>(`isFixedPrice: true`) | **Mặc định:** 3 Gà giòn vui vẻ + 2 Mì Ý Jolly vừa + 1 Khoai tây chiên vừa + 3 Nước ngọt vừa + 3 Tương Chua Ngọt + 1 Tương Cà<br>**Bundle:** 10 options (9 mặc định + 1 thêm món) | **UNVERIFIED**<br>(0 lần xuất hiện "Đà Nẵng") |

### 4.2. Đánh giá So sánh & Đề xuất Ứng viên cho Hội đồng Xem xét Staging

1. **Về phân loại sản phẩm:** Toàn bộ 5 sản phẩm được xác định là **"Sản phẩm Thực đơn / Giá niêm yết quan sát" (Menu Product / Observed Price)**, hoàn toàn **KHÔNG PHẢI CHƯƠNG TRÌNH KHUYẾN MẠI GIẢM GIÁ CHO HỌC SINH - SINH VIÊN**.
2. **Về phạm vi địa lý Đà Nẵng:** Toàn bộ 5 trang HTML chi tiết **hoàn toàn không có quy định hay danh sách cửa hàng áp dụng tại Đà Nẵng** (`da_nang_explicit_mentions_in_html: 0`). Tuân thủ lệnh Hội đồng, điều kiện áp dụng tại Đà Nẵng **BẮT BUỘC GIỮ NHÃN UNVERIFIED**.
3. **Phân tích phân kỳ (Divergence Analysis):**
   - `PROD_JOLLIBEE_COMBO_05`: Phân kỳ tên và giá (tiêu đề trang là `COMBO 179` nhưng giá cơ sở niêm yết thực tế là `185.000 ₫`, cấu hình 10 options quá phức tạp).
   - `PROD_JOLLIBEE_COMBO_03`: Phân kỳ tiêu đề (catalog ghi "Một Mình Ăn Ngon", leaf title là chuỗi miêu tả nguyên liệu "Mì Ý Sốt Bò Bằm + 1 miếng gà rán + Nước ngọt").
   - `PROD_JOLLIBEE_COMBO_04`: Tiềm ẩn rủi ro tranh cãi phạm vi do slug `cho-khu-v-c-mi-n-b-c-1`, dù thân trang không ghi giới hạn.
   - `PROD_JOLLIBEE_COMBO_01` và `PROD_JOLLIBEE_COMBO_02`: Đồng nhất 100% giữa tiêu đề trang và tên catalog, Product ID và SKU trùng khớp hoàn toàn.
4. **ĐỀ XUẤT DUY NHẤT CHO HỘI ĐỒNG (RECOMMENDED CANDIDATE):**
   - Đề xuất: **`PROD_JOLLIBEE_COMBO_02` — MỘT MÌNH HÍT HÀ** (ID: `679`, SKU: `70144`, Giá cơ sở: `80.000 ₫`).
   - Lý do:
     - Khớp 100% tiêu đề giữa catalog và leaf page (`MỘT MÌNH HÍT HÀ`).
     - Product ID (`679`) và SKU (`70144`) khớp chuẩn hệ thống Magento.
     - Cấu trúc bundle tinh gọn nhất (4 options: Mì, Gà sốt cay, Thức uống, Thêm sốt), độ biến thiên giá thấp nhất (80.000 ₫ — 106.000 ₫), tỷ lệ chọn mặc định minh bạch.
     - Mức giá cơ sở 80.000 ₫ phù hợp quy mô khẩu phần đơn lẻ.
   - Ranh giới bắt buộc:
     - Nếu Hội đồng phê chuẩn đưa vào Staging, thẻ chỉ được phát hành dưới danh nghĩa **"Thực đơn quan sát" (Menu Product)**, tuyệt đối không gắn nhãn ưu đãi HSSV.
     - Phạm vi cơ sở Đà Nẵng phải giữ nhãn **`UNVERIFIED`** trên giao diện thẻ.
     - Production tiếp tục **ĐÓNG BĂNG HOÀN TOÀN** (`v3.422.0 / 24 thẻ`).

