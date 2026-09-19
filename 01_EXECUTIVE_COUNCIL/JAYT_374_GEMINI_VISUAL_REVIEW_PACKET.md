# JAYT-374 — HỒ SƠ NGHIỆM THU THỊ GIÁC & PHÁT HÀNH SẢN XUẤT CHO GEMINI (GEMINI VISUAL REVIEW PACKET)

**Mã tài liệu:** `JAYT_374_GEMINI_VISUAL_REVIEW_PACKET`  
**Căn cứ điều phối & thẩm quyền:**
- [WORK_ORDER_J374_VISUAL_FIRST_RETENTION.json](file:///D:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/04_DATA_PIPELINE/dispatch/WORK_ORDER_J374_VISUAL_FIRST_RETENTION.json) (Sắc lệnh Chủ tịch / Chairman Decree: `production_deployment_authorized: true`, `production_alias_mutation_authorized: true`)
- [01_EXECUTIVE_COUNCIL/JAYT_374_DESIGN_HANDOFF.md](file:///D:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/01_EXECUTIVE_COUNCIL/JAYT_374_DESIGN_HANDOFF.md) (Đặc tả thiết kế Visual-First, Drawer & Nhịp sinh hoạt 5 khung giờ)
**Đơn vị thi công & phát hành:** Antigravity  
**Phiên bản ứng dụng:** `v3.438.0-j374` (Kế thừa nền tảng `v3.437.0-j373` đã phát hành thành công ở Milestone 1)  
**Địa chỉ Production chính thức:** `https://jayt-production-v3420.vercel.app`  
**Deployment ID hiện thời:** `dpl_8pSCfxWXzEMteFTV6E9YkVQARrA8` (Trạng thái: `READY`, Aliased)  
**Rollback Baseline ID:** `dpl_2RbJN7YfKv2hufy3Vb6jMW8RDtpT` (Bản phát hành M1 J373)  
**Thời điểm phát hành & niêm phong:** 2026-09-10T09:52:20Z (16:52:20 Giờ Việt Nam)  
**Ranh giới thương mại & dữ liệu:** 
- `affiliate_enabled: false` tuyệt đối (0 link affiliate, 0 tracking script, 0 phát ngôn hoa hồng/doanh thu).
- Quét quang học camera / app ngân hàng: Tiếp tục bảo lưu bảo thủ là **`NOT_TESTED`** (Được phép phát hành nhờ cơ chế sao chép đa trường fallback hoàn bị).
- Tuyệt đối không rò rỉ số tài khoản ngân hàng hoặc tọa độ GPS cá nhân trong URL chia sẻ nhóm.

---

## 1. Bảng Đối Soát Tài Nguyên Phục Vụ Trực Tiếp Trên Production Vercel

Hệ thống đã kiểm toán trực tiếp từng byte tài nguyên phục vụ từ `https://jayt-production-v3420.vercel.app`, đối soát 100% khớp với `candidate_manifest.json` (`08_RELEASE_VAULT/candidates/j374-visual-first/candidate_manifest.json`):

| Đường dẫn tài nguyên | Dung lượng (Bytes) | Mã băm SHA-256 Remote Served | Kiểm toán đối soát | Trạng thái HTTP |
| :--- | :---: | :---: | :---: | :---: |
| `/` (hoặc `/index.html`) | 1.232 | `cb394241641afc0c63fa964d843f17cf851d096e63ec5591402cbcaae853d719` | **KHỚP 100%** | **PASS (200 OK)** |
| `/styles.css` | 74.527 | `726a1096f0863824f842b4862a6dab2078307f358ebe39f434f80a664ce5b45a` | **KHỚP 100%** | **PASS (200 OK)** |
| `/jayt_apex_interface.js` | 500.019 | `8bc7b66162573dd3366a47f6ea95e26a4d0f8d7b25d4ecf70d465f0b716199e6` | **KHỚP 100%** | **PASS (200 OK)** |
| `/search.css` | 767 | `7ce6d73b800433f88d066cd9af14f71e56beca2ca876b1f34589c4f2ae78f100` | **KHỚP 100%** | **PASS (200 OK)** |
| `/search.js` | 2.763 | `ac226ccb75a147e6d069e3a3cf0dec3a44da414c724e4965134d9e749f532bdc` | **KHỚP 100%** | **PASS (200 OK)** |
| `/deals_feed.json` | 114.379 | `97d29399738c6781671ff4557506974334d31515f209256c383907177074cc60` | **KHỚP 100%** | **PASS (200 OK)** |
| `/registry.json` | 48.314 | `52a8811109df36961edf9714a6e9ff09b3e4e944e3705b458dd189634e1140a3` | **KHỚP 100%** | **PASS (200 OK)** |
| `/published_manifest.json` | 1.404 | `7a8d72217f8ec246d7dbbb62fb77dac6d7144c41152ffdab85808d9405eabc54` | **KHỚP 100%** | **PASS (200 OK)** |

- **Mã băm Manifest Candidate:** `c7c1e5844c91163809dac1e5777441431703510ad3a526533e29683821615265`
- **Mã băm Biên nhận Sản xuất (Release Receipt):** `156a0741643f94ff0a35ada2d1336483c4542dac3901e8a58ceedee78867bdb0`

---

## 2. Bằng Chứng Thực Nghiệm Trực Tiếp (Live Practical Verification)

Hệ thống đã thực hiện kiểm thử tự động toàn diện qua Puppeteer trên URL Production chính thức (`https://jayt-production-v3420.vercel.app`) với 8/8 bài đo đạt **`PASS`**:

### 🖼️ Bằng chứng 1 — Thẻ ưu đãi Visual-First (~60% Media Ratio, 3 Dữ kiện & 2 CTA Target >=44px)
- **Kích thước Mobile 390px:** Thẻ rộng 358px, cao 441px; cụm ảnh rộng 358px, cao **264px** -> **Tỷ lệ diện tích ảnh: 60%** (Đạt chuẩn chỉ thị).
- **Kích thước Desktop 1440px:** Thẻ rộng 379px, cao 417px; ảnh cao **240px** -> **Tỷ lệ diện tích ảnh: 58%** (Đạt chuẩn ~60%).
- **3 Dữ kiện trọng tâm tối đa:**
  1. *Tiêu đề ưu đãi:* Khống chế tối đa 2 dòng (`display: -webkit-box; -webkit-line-clamp: 2; overflow: hidden`), không để văn bản tràn lấn ảnh.
  2. *Giá bán rõ ràng:* Font số to 28px (`font-variant-numeric: tabular-nums; font-weight: 800`), ghi rõ căn cứ định lượng (ví dụ: `84.000₫ / Lốc 6 lon`).
  3. *Huy hiệu tiết kiệm có căn cứ:* Chỉ hiển thị khi có chứng cứ đối soát (ví dụ: `Tiết kiệm 20%`), loại bỏ hoàn toàn các khẩu hiệu tiếp thị rỗng.
- **2 Nút bấm hành động (Touch Target >= 44px):**
  - Nút *"Xem điều kiện & Chi nhánh"* (`.btn-card-detail`): Chiều cao đo kiểm thực tế **44px**.
  - Nút *"Rủ bạn kèo này"* (`.btn-card-invite`): Chiều cao đo kiểm thực tế **44px**.
- **Minh chứng hình ảnh:**
  - Desktop 1440px Dark Mode: [`j374_live_desktop_1440_dark.png`](file:///D:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/runtime_evidence/j374_live_desktop_1440_dark.png)
  - Desktop 1440px Light Mode: [`j374_live_desktop_1440_light.png`](file:///D:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/runtime_evidence/j374_live_desktop_1440_light.png)
  - Mobile 390px Viewport: [`j374_live_mobile_390_cards.png`](file:///D:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/runtime_evidence/j374_live_mobile_390_cards.png)

---

### ⏱️ Bằng chứng 2 — Khung nhịp sinh hoạt 5 khung giờ Đà Nẵng (Asia/Ho_Chi_Minh) & Tính trung thực dữ liệu
- **5 Khung giờ sinh hoạt chuẩn học sinh/sinh viên Đà Nẵng:**
  1. `07:00 – 10:30`: ☕ *Cà phê sáng*
  2. `10:30 – 14:00`: 🍱 *Ăn trưa gần trường*
  3. `14:00 – 17:30`: 📚 *Chiều học nhóm* (Đang kích hoạt tự động theo giờ thực tế chiều 16:51)
  4. `17:30 – 23:00`: 🌙 *Tối đi cùng bạn*
  5. `23:00 – 07:00`: 🔮 *Lên kèo ngày mai*
- **Cơ chế can thiệp thủ công & Khôi phục thời gian thực:**
  - Cho phép người dùng chọn bất kỳ khung giờ nào để xem trước ưu đãi.
  - Khi can thiệp thủ công, giao diện hiển thị badge `Đang chọn thủ công` kèm nút `🔄 Quay lại giờ thực tế` (`#btn-reset-schedule-time`).
  - Lắng nghe sự kiện `visibilitychange` để tự động tái tính toán khung giờ khi người dùng quay lại tab mà **không làm xáo trộn thẻ đang được focus**.
- **Kỷ luật trung thực:** Thuật toán nhịp giờ chỉ sắp xếp thứ tự ưu tiên hiển thị ưu đãi phù hợp, **tuyệt đối không khẳng định cửa hàng đang mở cửa** khi chưa có dữ liệu mở cửa chính xác.

---

### 🗂️ Bằng chứng 3 — Drawer chi tiết (Slide-out Desktop / Bottom Sheet Mobile & Deep Link)
- **Thiết kế Drawer chuyên biệt:**
  - *Desktop (1440px):* Drawer trượt từ cạnh phải rộng **560px** (`#offer-detail-drawer`).
  - *Mobile (390px):* Drawer biến thành **Bottom Sheet** chiếm **90dvh** có thanh vuốt trực quan.
- **Đưa toàn bộ điều kiện phức tạp vào Drawer:** Các điều kiện áp dụng, hạn dùng, danh sách chi nhánh kèm khoảng cách, trạng thái ổ cắm/Wi-Fi đều nằm gọn gàng trong Drawer, giúp thẻ bên ngoài luôn sạch thoáng.
- **Khả năng tiếp cận & Deep-linking:**
  - Hỗ trợ phím `Escape` đóng drawer tức thì; bẫy focus (Focus Trap) giữ con trỏ bàn phím trong drawer khi đang mở.
  - Tự động cập nhật URL Hash dạng `#offer-{id}` (ví dụ `#offer-B18_HL_SUA_LOC6`) để người dùng có thể lưu bookmark hoặc chia sẻ trực tiếp link chi tiết.
- **Minh chứng hình ảnh:**
  - Desktop Drawer Open: [`j374_live_drawer_open_1440.png`](file:///D:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/runtime_evidence/j374_live_drawer_open_1440.png)
  - Mobile Bottom Sheet: [`j374_live_mobile_390_drawer.png`](file:///D:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/runtime_evidence/j374_live_mobile_390_drawer.png)

---

### 📜 Bằng chứng 4 — Phân trang nối tiếp không phá hủy ("Xem thêm")
- **Số lượng thẻ nạp ban đầu:** 6 thẻ trên mobile, 9 thẻ trên tablet, 12 thẻ trên desktop.
- **Cơ chế nối tiếp (Non-destructive Append):** Bấm `"Xem thêm (còn X ưu đãi) ↓"` (`#btn-view-more-offers`) sẽ tải thêm từng trang vào DOM mà không làm giật trang hay mất dấu các thẻ đã xem trước đó.
- **Độ phủ ưu đãi:** Kiểm thử thực tế qua 10 lần bấm đạt tổng cộng **65/65 ưu đãi** trong feed (Độ phủ 100%).
- **Trải nghiệm tiếp cận (Accessibility):** Tự động chuyển tiêu điểm (focus) vào thẻ đầu tiên của trang mới được nạp.

---

### 👥 Bằng chứng 5 — Bộ công cụ "Rủ bạn kèo này" (Zalo Share Pass & Phân chia VND không dư)
- **Modal chia sẻ nhóm trực quan (`#zalo-pass-modal`):**
  - Nhập số tiền tổng hoặc lấy giá ưu đãi gốc (ví dụ: `84.000₫`).
  - Nhập số lượng bạn đi cùng (mặc định 2 người).
- **Thuật toán phân chia nguyên đồng tuyệt đối:**
  - Chia $84.000 / 2 = 42.000$ VNĐ/người (sai số 0 đồng).
  - Với các phép chia lẻ (thương số và số dư), hệ thống tự động phân bổ phần dư cho chủ bàn và ghi rõ: *"Bạn (Chủ bàn) chịu phần dư X đồng để các bạn chuyển đúng số tiền tròn"*.
- **Canvas Pass xuất hình ảnh chia sẻ:**
  - Tự động vẽ thẻ pass kích thước tỉ lệ Zalo (`canvas-zalo-offer-pass`) với thông tin ưu đãi, số tiền mỗi người cần đóng, hướng dẫn chuyển khoản rõ ràng.
- **An toàn bảo mật & Riêng tư:**
  - Đường dẫn sao chép chia sẻ là link sạch dạng deep-link (`https://jayt-production-v3420.vercel.app/#offer-...`).
  - **Tuyệt đối không mang theo số tài khoản ngân hàng cá nhân hoặc vị trí GPS của người chia sẻ vào URL.**
- **Minh chứng hình ảnh:**
  - Modal Rủ bạn & Thẻ pass Canvas: [`j374_live_zalo_pass_modal.png`](file:///D:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/runtime_evidence/j374_live_zalo_pass_modal.png)

---

### 💳 Bằng chứng 6 — Kế thừa trọn vẹn giải pháp Fallback sao chép thanh toán (Milestone 1)
- Dù đã nâng cấp toàn diện diện mạo Visual-First, hệ thống thanh toán và chia tiền tại bàn vẫn bảo toàn nguyên vẹn 100% tính năng Fallback của M1:
  - Giữ nguyên số 0 đầu tài khoản: `'0123456789'`.
  - 5 nút sao chép từng trường riêng biệt (`Ngân hàng`, `Số tài khoản`, `Tên người nhận`, `Số tiền chính xác`, `Nội dung`).
  - Nút *"Sao chép tất cả thông tin chuyển khoản"*.
  - Khung văn bản chọn tay dự phòng (`#transfer-fallback-selectable-container`) tự động mở ra nếu trình duyệt từ chối quyền Clipboard.
  - Mã QR tự động xóa sạch lập tức khi người dùng bấm sửa thông tin người nhận (`#btn-edit-recipient`).
- **Minh chứng hình ảnh:**
  - Bằng chứng thanh toán & fallback: [`j374_live_payment_fallback.png`](file:///D:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/runtime_evidence/j374_live_payment_fallback.png)

---

## 3. Danh Mục Tài Sản Thị Giác & Niêm Phong (Visual Asset Manifest)

Toàn bộ 27 tài sản hình ảnh thương hiệu (bao gồm 18 ảnh lá thực chứng từ Vault Batch 19 và 9 tệp vector curated SVG) đã được đóng gói và kiểm kê tại [`06_TRUST_AND_EVIDENCE/j374/visual_asset_manifest.json`](file:///D:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/06_TRUST_AND_EVIDENCE/j374/visual_asset_manifest.json) với mã băm SHA-256: `eb39e2e9e099beb5716f732723d17d7545a7300bdb23ba9f4b7f18e4d07e7563`.

---

## 4. Đề Xuất Phán Quyết Dành Cho Đơn Vị Giám Định Độc Lập Gemini

Kính chuyển toàn bộ hồ sơ này tới Đơn vị Giám định Độc lập Gemini để thực hiện audit độc lập trên Production URL `https://jayt-production-v3420.vercel.app` và ban hành văn bản chứng thực:
`01_EXECUTIVE_COUNCIL/JAYT_374_GEMINI_INDEPENDENT_VISUAL_ATTESTATION.md`.
