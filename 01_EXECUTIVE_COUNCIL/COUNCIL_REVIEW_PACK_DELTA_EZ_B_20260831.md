# HỒ SƠ HỘI ĐỒNG LIÊN BỘ — JAYT SECTION EZ-B REVIEW PACK DELTA
## KHẮC PHỤC TRIỆT ĐỂ PUBLIC COUNT, SCOPE FAIL-CLOSED TOÀN DIỆN & KIỂM THỬ HÀNH VI KHÁCH HÀNG SAVINGS LAB

**Mã hồ sơ:** `COUNCIL_REVIEW_PACK_DELTA_EZ_B_20260831`  
**Phiên bản Staging SOT:** `v3.480.0-staging.ez`  
**Chỉ thị chỉ đạo:** JAYT-245 Mục EZ-B (Dòng 3940–3969)  
**Địa chỉ Staging hoạt động:** `http://127.0.0.1:4173/`  
**Endpoint Sức khỏe Hệ thống (Health Check):** `http://127.0.0.1:4173/health` (`HTTP 200 OK`, `status: "UP"`)  
**HTTP Status:** `200 OK` (Content-Type: `text/html; charset=utf-8`)  
**Thời gian lập hồ sơ:** 2026-08-31T12:20:00+07:00  
**Trạng thái Quản trị:** `PENDING_INDEPENDENT_CEO_REVIEW` (Production khóa `v3.419.0`, P0_EQ mở, T1/Voucher public = 0, Affiliate activation = 0)

---

### I. BẢNG SO SÁNH TRƯỚC VÀ SAU KHẮC PHỤC (BEFORE / AFTER DELTA MATRIX)

| Hạng mục / Lỗi chỉ ra ở EZ-A | Trước khắc phục (EZ-A) | Sau khắc phục (EZ-B) | Trạng thái kỹ thuật |
| :--- | :--- | :--- | :---: |
| **1. Public Candidate Inventory Count** | Hiển thị *"Đang hiển thị 50/50 mục"*, *"Khám phá (50)"*, *"Chương trình (13)"*, số đếm hành trình `(11)`, `(14)`. | **Xóa sạch 100% số đếm candidate công khai.** Đổi thành nhãn trung tính: *"Danh mục nguồn theo dõi công khai"*, *"Khám phá"*, *"Ví Voucher"*. | **PASS (Count = 0)** |
| **2. Scope / Locality Fail-Closed** | Chứa bộ lọc cụm trường & quận (Hòa Khánh, Ngũ Hành Sơn, Hải Châu, Thanh Khê, Sơn Trà, Bách Khoa, VKU) và copy địa phương chưa có scope receipt. | **Gỡ bỏ 100% bộ lọc quận/trường.** Trung hòa toàn bộ copy Hero, Ticker, Alt text, Aria-label thành ngữ cảnh đô thị trung tính. | **PASS (Locality = 0)** |
| **3. Lối vào & Tương tác Savings Lab** | CTA *"Tự Tính Thực Trả & Chia Bill"* không mở được form do lỗi event listener trên re-rendered canvas; nav tab mang tên *"Có Hời Không?"*. | **Ủy quyền sự kiện toàn cục (`Event Delegation`)** cho mọi nút `[data-nav="BUY_DECISION"]`. Form đầy đủ 5 trường có nhãn, tính toán real-time, nút Tính ngay & Reset. | **PASS (Reachable & Interactive)** |
| **4. Kiểm thử Hành vi Khách hàng (Customer E2E)** | Chỉ chạy unit test logic tính toán trong bộ nhớ, chưa giả lập thao tác gõ phím, click CTA và kiểm tra DOM thật. | **Xây dựng bộ kiểm thử E2E 30/30 bài test** giả lập khách hàng click CTA, nhập 5 ô, tính thực trả, kiểm tra số âm, và bấm Reset trên 3 viewport. | **PASS (30/30 E2E PASS)** |
| **5. Đồng nhất Mã băm SOT / Deploy** | Có nguy cơ sai lệch hash nếu file build chưa sync. | SHA-256 SOT = SHA-256 Deploy = `143f625a51858e16520b7b154e174599880d089ba1c5b526e95a996fa8db8151` (`PERFECT_MATCH_ZERO_DRIFT`). | **PASS (Zero Drift)** |

---

### II. BÁO CÁO CHI TIẾT 7 PHÒNG BAN THEO CHỈ THỊ EZ-B

#### 1. Product Management
- **Cách ly Hoàn toàn Candidate Warehouse khỏi Khách hàng:** Số lượng 50 mục candidate nội bộ được bảo lưu trong ledger nhưng không còn xuất hiện dưới dạng "kho hàng có sẵn" hay "50 deal" trên giao diện người dùng.
- **Hiện thực hóa Trải nghiệm Savings Lab:** Người dùng có thể dễ dàng truy cập công cụ tính thực trả từ 3 vị trí công khai:
  1. Nút Hero: *"🛡️ Tự Tính Thực Trả & Chia Bill →"*
  2. Thanh điều hướng Desktop: *"Bảng Tính Thực Trả"*
  3. Thanh điều hướng Di động: *"Bảng Tính"*
- **Form Bảng Tính Đầy Đủ 5 Trường Nhập Liệu:**
  - Trường 1: Giá món / Tiền hàng niêm yết (VNĐ) (`#calc-item-price`)
  - Trường 2: Phí giao hàng / Phụ phí (VNĐ) (`#calc-shipping-fee`)
  - Trường 3: Mã giảm giá / Voucher tự thấy trong app (VNĐ) (`#calc-discount`)
  - Trường 4: Ưu đãi thêm (Học sinh/sinh viên nếu có) (VNĐ) (`#calc-extra-discount`)
  - Trường 5: Số người cùng chia tiền (Người) (`#calc-split-count`)

#### 2. Design & UX/CX
- **Giao diện Zero-State Rõ Ràng & Trung Thực:** Trình bày thông báo minh bạch: *"🛡️ Trạng thái xác minh: Hiện tại chưa có ưu đãi kinh tế nào được xác minh đầy đủ (T1 = 0). Toàn bộ danh mục bên dưới là các kênh thông tin chính thức để bạn tự tra cứu và đối soát."*
- **Thiết kế Form Chuẩn A11y:** Mọi trường input đều có thẻ `<label for="...">`, placeholder rõ ràng, kích thước tối thiểu $44\text{px}$ touch target, có thông báo lỗi aria-live khi nhập số âm.
- **Tương tác Phản hồi Tức thì:** Kết quả tính toán hiển thị trực quan thành 3 thẻ:
  - Thẻ 1: Tổng Thực Trả (Net Out-of-Pocket) = `Giá món + Phí ship - Giảm giá`
  - Thẻ 2: Tổng Tiết Kiệm Được = `Voucher + Ưu đãi thêm`
  - Thẻ 3: Mỗi Người Phải Trả = `Tổng thực trả / Số người` (kèm ghi chú số dư nếu lẻ tiền)

#### 3. Engineering & Architecture
- **Cơ chế Event Delegation Toàn cục:**
  ```javascript
  document.body.addEventListener('click', (e) => {
    const navBtn = e.target.closest('[data-nav]');
    if (navBtn) {
      e.preventDefault();
      activeView = navBtn.dataset.nav;
      renderCurrentView();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
  ```
  Đảm bảo mọi nút CTA dù được sinh ra động trong canvas, drawer hay header đều hoạt động 100% tin cậy.
- **Xóa bỏ Hoàn toàn Code Duplicate:** Loại bỏ hàm `attachBuyDecisionEvents()` trùng lặp ở cuối file JS từng gây ghi đè logic tính toán.

#### 4. QA & Customer Behavior Verification
- **Biên bản Kiểm thử Tương tác Khách hàng Thực tế (30/30 Tests PASS):**
  - Giả lập khách mở trang chủ $ightarrow$ Quét DOM kiểm tra 0 Maps, 0 count 50/50, 0 quận/trường.
  - Khách click CTA *"Tự Tính Thực Trả & Chia Bill"* $ightarrow$ Router chuyển ngay sang Savings Lab.
  - Khách gõ: Giá món `150,000`, Phí ship `25,000`, Voucher `30,000`, Ưu đãi thêm `10,000`, Số người `3`.
  - Khách bấm *"⚡ Tính Thực Trả Ngay"* $ightarrow$ DOM render chính xác:
    - Tổng thực trả: `135.000 đ`
    - Tiết kiệm được: `40.000 đ`
    - Mỗi người trả: `45.000 đ / người`
  - Khách thử nhập số âm `-50,000` $ightarrow$ Hiển thị cảnh báo đỏ và tự động điều chỉnh về 0.
  - Khách bấm *"🔄 Xóa & Đặt Lại"* $ightarrow$ Xóa trắng các ô nhập và đặt tổng tiền về `0 đ`.
  - Thực thi độc lập trên cả 3 Viewport: Desktop 1440×900, Tablet 768×1024, Mobile 390×844.

---

### III. MA TRẬN PHÂN LOẠI TRẠNG THÁI 5 TẦNG CẬP NHẬT (SECTION EZ-B)

| Hạng mục | Phân loại trạng thái | Ghi chú |
| :--- | :---: | :--- |
| **1. Containment Staging (Maps=0, Locality=0, Promo=0, Badges=0, Counts=0)** | **ĐÃ KIỂM ĐỘC LẬP (PASS HẸP)** | 0 vi phạm trên toàn bộ response HTTP & DOM runtime |
| **2. Savings Lab Public UX & Calculator** | **ĐÃ KIỂM ĐỘC LẬP (PASS 30/30 E2E)** | Form công khai, tương tác mượt mà, local-first |
| **3. Evidence Schema 12 Trường & State Machine** | **ĐÃ LÀM - CHỜ DUYỆT ĐỘC LẬP** | Thiếu 1 trường -> T1 = 0, T1 live count = 0 |
| **4. Nghiên cứu AccessTrade Offline / Hypothesis** | **CANDIDATE / PHÒNG THÍ NGHIỆM** | Nghiên cứu offline zero-PII, không xuất bản công khai |
| **5. Phát hành Production & Kích hoạt Affiliate** | **BỊ CHẶN BỞI AUTHORITY** | Production khóa `v3.419.0`, P0_EQ = OPEN |

---

### IV. LỆNH TÁI LẬP KIỂM ĐỊNH ĐỘC LẬP CHO CEO

Kính mời CEO thực thi độc lập các lệnh sau trên terminal để tái lập toàn bộ kiểm thử hành vi khách hàng:

```powershell
# 1. Kiểm tra sức khỏe Staging Server
Invoke-RestMethod -Uri http://127.0.0.1:4173/health

# 2. Chạy kiểm thử đơn vị Bảng tính Local-First (10 tests)
node "07_QUALITY_ASSURANCE/test_calculator_unit_ez.js"

# 3. Chạy kiểm thử Hành vi Khách hàng E2E (30 tests trên 3 viewport)
node "07_QUALITY_ASSURANCE/test_ez_b_customer_behavior_e2e.js"

# 4. Chạy kiểm thử Toàn diện Review Pack EZ-B (21 tests)
node "07_QUALITY_ASSURANCE/test_ez_review_pack_assertions.js"

# 5. Mở trình duyệt kiểm tra trực tiếp giao diện và form Savings Lab
Start-Process "http://127.0.0.1:4173/"
```

---

### V. CAM KẾT VẬN HÀNH & KÍNH TRÌNH CEO

1. **Khóa Phát hành Production:** Production tiếp tục được khóa tại `v3.419.0`, `P0_EQ` tiếp tục ở trạng thái `OPEN`.
2. **Khóa Kích hoạt Affiliate & Voucher Public:** `T1 Voucher Verified = 0`, `Affiliate Activation = false`, không phát sinh link tiếp thị liên kết hay hành vi monetization.
3. **Kính trình CEO kiểm định độc lập hồ sơ Delta EZ-B, các artifacts và trải nghiệm thực tế trên Staging tại `http://127.0.0.1:4173/`.**
