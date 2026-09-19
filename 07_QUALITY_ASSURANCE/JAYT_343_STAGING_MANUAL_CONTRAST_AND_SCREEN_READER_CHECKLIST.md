# JAYT-343: Quy Trình & Checklist Kiểm Thử Thủ Công Contrast & Screen-Reader Trên Staging

- **Văn bản căn cứ:** Lệnh điều phối N+1 theo Quyết định [JAYT_342_CEO_STAGING_ACCEPTANCE_DECISION.md](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/01_EXECUTIVE_COUNCIL/JAYT_342_CEO_STAGING_ACCEPTANCE_DECISION.md) (SHA-256: `04e1cd8a95200ba7911e7bed9bc56c7566127acce660aa259babc57e1954d3ce`).
- **Phạm vi kiểm thử:** Môi trường Staging tách biệt `staging_preview_sprint_b/` (Port 4176, URL: `http://127.0.0.1:4176/`).
- **Quyền hạn Production:** `production_authorization: false`.
- **Đính chính bắt buộc về Baseline Production:** Production `v3.424.0-r1` có **51 thẻ tổng cộng: 24 công ích + 27 thương mại** (tuyệt đối không nhầm lẫn thành "51 thẻ công ích").
- **Mục đích:** Thiết lập bộ tiêu chuẩn và danh mục kiểm tra thủ công chuyên sâu về Độ tương phản màu sắc (Color Contrast - WCAG AA) và Trải nghiệm Trình đọc màn hình (Screen-Reader), làm điều kiện tiên quyết bắt buộc trước khi Hội đồng Kỹ thuật Antigravity được phép trình CEO Codex bất kỳ Tờ trình phát hành Production độc lập nào.

---

## 1. Nguyên Tắc & Phương Pháp Luận Kiểm Thử Thủ Công

Các công cụ kiểm tra tự động (như Lighthouse, Axe, Puppeteer) chỉ phát hiện được tối đa 30% - 40% lỗi trợ năng thực tế. Việc kiểm tra thủ công (Manual Testing) là bắt buộc nhằm bảo đảm:
1. **Độ tương phản quang học (Optical Contrast):** Đánh giá chính xác trên màn hình thực tế ở các trạng thái tương tác động (hover, active, focus, disabled, error).
2. **Ngữ nghĩa âm thanh (Auditory Semantics):** Kiểm chứng luồng đọc của các công nghệ trợ cảm (Assistive Technologies) khi người khiếm thị hoặc thị lực kém sử dụng nền tảng giá trị cộng đồng JayT.

---

## 2. Phần 1 — Checklist Kiểm Thử Độ Tương Phản Màu Sắc (Color Contrast - WCAG 2.1 AA)

### A. Tiêu chuẩn áp dụng (WCAG 2.1 Success Criteria 1.4.3 & 1.4.11)
- **Văn bản thông thường (Normal Text < 18pt hoặc < 14pt bold):** Tỷ lệ tương phản tối thiểu $\ge 4.5:1$ (Khuyến khích đạt AAA: $\ge 7:1$).
- **Văn bản lớn (Large Text $\ge 18pt$ hoặc $\ge 14pt$ bold):** Tỷ lệ tương phản tối thiểu $\ge 3.0:1$ (Khuyến khích đạt AAA: $\ge 4.5:1$).
- **Thành phần giao diện & Đồ họa (UI Components & Graphical Objects):** Viền ô nhập liệu, icon, nút bấm, vòng focus (`:focus-visible`), viền chip lọc tối thiểu $\ge 3.0:1$.

### B. Công cụ thực hiện
- **Colour Contrast Analyser (CCA)** của TPGi (đo mẫu điểm pixel trực tiếp trên màn hình).
- **Chrome DevTools Accessibility Inspector** (chế độ kiểm tra Contrast Ratio & APCA).

### C. Ma trận kiểm tra chi tiết theo từng View

#### 1. View Home (Trang Chủ - 24 Thẻ Công Ích)
- [ ] **CC-01:** Thanh tìm kiếm chính (`#search-input`):
  - Chữ người dùng gõ trên nền input $\ge 4.5:1$.
  - Placeholder text (`placeholder`) so với nền input $\ge 4.5:1$.
  - Viền ô tìm kiếm (`border` hoặc `:focus-visible`) so với nền trang $\ge 3.0:1$.
- [ ] **CC-02:** Chip bộ lọc nhanh (`.filter-chip`, `.quick-chip`):
  - Trạng thái mặc định: chữ/icon so với nền chip $\ge 4.5:1$.
  - Trạng thái Active/Selected: chữ so với nền active $\ge 4.5:1$.
  - Viền chip so với nền chung $\ge 3.0:1$.
- [ ] **CC-03:** Thẻ công ích (`.t2-pilot-card-section`):
  - Tiêu đề dịch vụ công ích (`h3`) so với nền card $\ge 4.5:1$.
  - Nội dung mô tả chính sách/địa chỉ/hotline so với nền card $\ge 4.5:1$.
  - Nhãn danh mục (Badge cấp thiết/hỗ trợ) chữ so với nền badge $\ge 4.5:1$.
  - Nút liên kết cổng dịch vụ công (`.external-link`): chữ nút so với nền nút $\ge 4.5:1$.

#### 2. View Voucher Vault (Ví Ưu Đãi 3 Tầng - 12 Mục Đối Soát)
- [ ] **CC-04:** Huy hiệu phân loại mục (Category Badges):
  - `.vault-badge-obs` (Giá quan sát • Thực đơn thường nhật): Chữ xám đậm/xanh đậm trên nền màu trung tính $\ge 4.5:1$.
  - `.vault-badge-counter` (Ưu đãi tại quầy): Chữ trên nền $\ge 4.5:1$.
  - `.vault-badge-brand` (Quyền lợi thành viên): Chữ trên nền $\ge 4.5:1$.
  - `.vault-badge-app` (Voucher ứng dụng): Chữ trên nền $\ge 4.5:1$.
- [ ] **CC-05:** Hộp cảnh báo ngân sách & Hộp hướng dẫn nhận quyền lợi:
  - `.vault-warning-box` (Cảnh báo ngân sách/điều kiện): Chữ cảnh báo trên nền hộp vàng nhạt $\ge 4.5:1$.
  - `.vault-claim-guide` (Hướng dẫn xuất trình tại quầy): Chữ trên nền hộp hướng dẫn $\ge 4.5:1$.
- [ ] **CC-06:** Thông tin định danh & Provenance:
  - Thời hạn áp dụng, căn cứ địa bàn Đà Nẵng $\ge 4.5:1$.
  - Chuỗi băm đối soát SHA-256 rút gọn (`.vault-hash-meta`) so với nền $\ge 4.5:1$ (không để màu chữ quá nhạt).
  - Nút xem nguồn chính thức (`.vault-source-link`): Chữ liên kết so với nền card $\ge 4.5:1$.

#### 3. View Split-Bill Pro (Bảng Tính Chia Tiền Nhóm)
- [ ] **CC-07:** Ô nhập dữ liệu (`.split-input`):
  - Nhãn ô nhập (`label`): Chữ tiêu đề so với nền trang $\ge 4.5:1$.
  - Giá trị nhập vào (Số tiền VND, Số người): Chữ số hiển thị $\ge 4.5:1$.
  - Đường viền ô nhập ở trạng thái focus (`:focus` / `:focus-visible`) so với nền $\ge 3.0:1$.
- [ ] **CC-08:** Khối kết quả chia tiền (`.split-result-box`):
  - Số tiền mỗi người hiển thị cỡ chữ lớn ($\ge 18pt$): Tỷ lệ tương phản $\ge 3.0:1$ (khuyến nghị $\ge 4.5:1$).
  - Bảng kê chi tiết từng người (người trả thêm 1đ do số dư lẻ): Chữ danh sách so với nền $\ge 4.5:1$.
  - Dòng khẳng định "Tổng phân bổ = Hóa đơn (Chênh lệch 0 ₫)" $\ge 4.5:1$.
- [ ] **CC-09:** Trạng thái lỗi (`.split-error`):
  - Chữ thông báo lỗi (đỏ/cam đậm) so với nền hộp thông báo lỗi $\ge 4.5:1$.
  - Viền hộp lỗi $\ge 3.0:1$.
- [ ] **CC-10:** Nút hành động chính (`.split-calc-btn`, `.split-zalo-copy-btn`):
  - Chữ trắng/đậm trên nền nút màu $\ge 4.5:1$.
  - Toast thông báo "Đã sao chép tin nhắn Zalo" $\ge 4.5:1$.

#### 4. View Lịch Tiết Kiệm 7 Ngày
- [ ] **CC-11:** Thanh tab 7 ngày (`.day-tab`):
  - Tab ngày chưa chọn: Tên thứ (T2, T3...) so với nền tab $\ge 4.5:1$.
  - Tab ngày đang chọn (`.day-tab.active`): Chữ trên nền active $\ge 4.5:1$.
  - Huy hiệu "Hôm nay" (`.today-pill`): Chữ trên nền pill $\ge 4.5:1$.
- [ ] **CC-12:** Thẻ trạng thái rỗng (`.calendar-empty-card`):
  - Tiêu đề thông báo rỗng (Thứ 2, Thứ 7, Chủ Nhật) $\ge 4.5:1$.
  - Lời giải thích lý do biểu giá thường và giải pháp tiết kiệm thay thế $\ge 4.5:1$.

#### 5. View Smart Value Radar (Radar Giá Trị 15 Thiết Bị)
- [ ] **CC-13:** Thẻ thiết bị & phần cứng:
  - Tên model thiết bị (`h4` / `h3`) $\ge 4.5:1$.
  - Giá quan sát bằng số tiền VND màu xanh/đậm $\ge 4.5:1$.
  - Nhãn tình trạng showroom (Còn hàng/Tồn kho Đà Nẵng) $\ge 4.5:1$.
  - Thời điểm ghi nhận HTTP Date $\ge 4.5:1$.
  - Nút xem nguồn trực tiếp Phi Long $\ge 4.5:1$.

---

## 3. Phần 2 — Checklist Kiểm Thử Trình Đọc Màn Hình (Screen-Reader Experience)

### A. Ma trận môi trường kiểm thử trợ năng thực tế
1. **Windows Desktop (Môi trường chuẩn doanh nghiệp):**
   - Trình đọc: **NVDA (NonVisual Desktop Access)** phiên bản mới nhất.
   - Trình duyệt: Google Chrome & Mozilla Firefox.
2. **Windows Desktop (Môi trường phụ):**
   - Trình đọc: **Windows Narrator**.
   - Trình duyệt: Microsoft Edge.
3. **Mobile Smartphone (Môi trường di động thực tế):**
   - **iOS:** VoiceOver trên Apple Safari (iPhone viewport 390px).
   - **Android:** TalkBack trên Google Chrome (Android viewport 393px-412px).

### B. Danh mục tiêu chí kiểm tra tương tác âm thanh

#### 1. Cấu trúc ngữ nghĩa & Điều hướng tổng thể (Semantics & Landmarks)
- [ ] **SR-01:** Khung sườn Landmark hợp lệ:
  - Trình đọc nhận diện được `<header role="banner">`, `<nav role="navigation">`, `<main role="main">`, `<footer role="contentinfo">`.
  - Phím tắt nhảy Landmark (phím `D` trên NVDA) hoạt động trơn tru, không bỏ sót vùng nội dung.
- [ ] **SR-02:** Cây Heading phân cấp logic:
  - Chỉ có duy nhất 1 thẻ `<h1>` đại diện cho tiêu đề ứng dụng/view hiện hành.
  - Các mục lớn là `<h2>`, các thẻ thẻ con là `<h3>`, không nhảy cấp (ví dụ không nhảy từ `<h2>` xuống thẳng `<h4>`).
- [ ] **SR-03:** Bộ chuyển đổi View chính (Tabs: Trang Chủ, Ví Voucher, Bảng Tính, Lịch 7 Ngày, Radar Giá Trị):
  - Bộ nút điều hướng sử dụng đúng ngữ nghĩa `role="tablist"` và `role="tab"`.
  - Khi chọn một tab, trình đọc thông báo rõ ràng: `"Đã chọn [Tên Tab], tab, 1 trên 5"` (`aria-selected="true"`).

#### 2. Tương tác với Voucher Vault (12 Thẻ Khắc Phục)
- [ ] **SR-04:** Đọc đúng bản chất giá quan sát (`PRICE_OBSERVATION`):
  - Khi focus vào 7 thẻ thực đơn thường nhật (Jollibee combos, Biểu giá Galaxy), trình đọc phải phát âm rõ cụm từ: *"Giá quan sát, thực đơn thường nhật"* trước khi đọc tên món và giá tiền.
  - Tuyệt đối không để trình đọc phát âm từ "voucher", "mã giảm giá" hay "khuyến mại".
- [ ] **SR-05:** Hướng dẫn nhận ưu đãi quầy & thành viên:
  - Khối hướng dẫn `.vault-claim-guide` có `aria-label="Hướng dẫn áp dụng"` để người dùng hiểu cách xuất trình giấy tờ/quét app.
- [ ] **SR-06:** Khẳng định 0 nút sao chép mã (Zero copy button announcement):
  - Khi duyệt toàn bộ danh sách thẻ bằng phím Tab hoặc mũi tên, trình đọc tuyệt đối không phát hiện bất kỳ nút "Sao chép mã" nào (đúng với quy chuẩn `real_voucher_code_count: 0`).
- [ ] **SR-07:** Liên kết nguồn đối soát ngoài (`.vault-source-link`):
  - Có `aria-label` đầy đủ thông tin: e.g. `"Xem bằng chứng tại nguồn chính thức của Jollibee (mở trong tab mới)"`.
  - Không đọc liên kết trần dưới dạng URL vô nghĩa.

#### 3. Tương tác với Split-Bill Pro (Tính Toán In-Memory)
- [ ] **SR-08:** Khả năng tiếp cận của Form nhập liệu:
  - Mỗi ô input (`#bill-amount`, `#member-count`, `#bill-desc`, `#bill-payee`) đều có `<label for="...">` liên kết chặt chẽ.
  - Ô số tiền có thuộc tính `inputmode="numeric"` và gợi ý đơn vị VND rõ ràng.
- [ ] **SR-09:** Thông báo kết quả tính toán tức thì (`aria-live="polite"`):
  - Khi người dùng nhấn nút "Tính chia tiền", khối kết quả `#split-result` có `aria-live="polite"` tự động đọc tóm tắt kết quả: *"Đã tính toán: Mỗi người đóng [X] đồng, tổng phân bổ [Y] đồng, chênh lệch 0 đồng"*.
  - Người khiếm thị không phải dò lại toàn bộ trang để tìm kết quả.
- [ ] **SR-10:** Cảnh báo lỗi nhập liệu (`role="alert"` / `aria-live="assertive"`):
  - Khi nhập số tiền âm, 0đ, hoặc số người bằng 0: Hộp lỗi xuất hiện và trình đọc lập tức ngắt quãng để đọc cảnh báo: *"Lỗi: Số người tham gia phải lớn hơn 0"*.
  - Ô nhập bị lỗi được gán `aria-invalid="true"` và `aria-describedby` trỏ tới ID của thông báo lỗi.
- [ ] **SR-11:** Phản hồi sao chép tin nhắn Zalo:
  - Khi nhấn nút "Sao chép tin nhắn Zalo", toast thông báo kích hoạt vùng `aria-live="polite"` đọc: *"Đã sao chép nội dung chia tiền Zalo vào bộ nhớ tạm"*.

#### 4. Tương tác với Lịch Tiết Kiệm 7 Ngày
- [ ] **SR-12:** Chuyển đổi ngày trong tuần:
  - Khi chuyển giữa các tab Thứ Hai $\rightarrow$ Chủ Nhật, trình đọc đọc rõ: Thứ được chọn, ngày hiện tại (nếu là Hôm nay), và số lượng ưu đãi định kỳ tìm thấy.
- [ ] **SR-13:** Đọc thẻ thông báo trạng thái rỗng (Thứ Hai, Thứ Bảy, Chủ Nhật):
  - Trình đọc thông báo rõ: *"Không có ưu đãi định kỳ xác minh cho ngày này. Khuyến nghị: Áp dụng giá vé tiêu chuẩn hoặc sử dụng voucher ứng dụng"*.

#### 5. Tương tác với Smart Value Radar
- [ ] **SR-14:** Đọc danh sách thiết bị phần cứng & kiểm chứng nhãn truy cập được (Accessible Name & Label Verification):
  - Không bắt buộc phát âm đúng một câu tiếng Việt cố định (do ngữ điệu và phát âm phụ thuộc vào công cụ, ngôn ngữ hệ điều hành, giọng đọc TTS và thiết bị).
  - **Yêu cầu biên bản:** Lead Operator phải ghi lại chuỗi phát âm/transcript thực tế được trình đọc màn hình xuất ra (Speech Viewer log).
  - **Tiêu chuẩn nghiệm thu:** Xác nhận tên model thiết bị, thông số kỹ thuật, mức giá quan sát và trạng thái tồn kho showroom Đà Nẵng đều có nhãn truy cập được (accessible label), phát âm mạch lạc, không bị nuốt chữ và hoàn toàn không mơ hồ.
- [ ] **SR-15:** Lọc theo danh mục:
  - Các chip lọc (Tất cả, USB, SSD, RAM, HSSV) có thuộc tính thông báo trạng thái chọn (`aria-pressed="true"` hoặc `aria-selected="true"`).

#### 6. Điều hướng bàn phím & Focus Trap (Keyboard Usability)
- [ ] **SR-16:** Trình tự Focus logic (Top-to-Bottom, Left-to-Right):
  - Phím `Tab` di chuyển tuần tự, hợp lý qua từng phần tử tương tác; phím `Shift + Tab` quay lui chính xác.
- [ ] **SR-17:** Không bị bẫy bàn phím (No Keyboard Trap):
  - Người dùng có thể tự do ra vào mọi vùng điều khiển, modal hoặc danh sách thả xuống mà không bị kẹt focus.
- [ ] **SR-18:** Vòng hiển thị Focus rõ ràng:
  - Mọi phần tử nhận focus đều có vòng viền `:focus-visible` với độ tương phản $\ge 3.0:1$ so với nền xung quanh, không bao giờ bị ẩn bởi `outline: none` thiếu bù trừ.

---

## 4. Biểu Mẫu Ghi Nhận Kết Quả Kiểm Thử (Audit Log Template)

| Mã tiêu chí | Hạng mục kiểm tra | Công cụ / Thiết bị | Kết quả thực tế | Tỷ lệ tương phản / Chuỗi âm thanh | Trạng thái (PASS/FAIL) | Ghi chú & Khắc phục |
|---|---|---|---|---|---|---|
| `CC-01` | Contrast: Ô tìm kiếm trang chủ | CCA / Chrome | Chờ đo thủ công | | PENDING | |
| `CC-04` | Contrast: Badge Giá quan sát | CCA | Chờ đo thủ công | | PENDING | |
| `CC-05` | Contrast: Hộp cảnh báo ngân sách | CCA | Chờ đo thủ công | | PENDING | |
| `CC-08` | Contrast: Kết quả chia tiền Split-Bill | CCA | Chờ đo thủ công | | PENDING | |
| `SR-01` | Semantics: Landmarks phân vùng | NVDA + Chrome | Chờ kiểm tra âm thanh | | PENDING | |
| `SR-04` | Screen-Reader: Đọc nhãn Giá quan sát | NVDA + Chrome | Chờ kiểm tra âm thanh | | PENDING | |
| `SR-06` | Screen-Reader: Khẳng định 0 nút copy | NVDA + Chrome | Chờ kiểm tra âm thanh | | PENDING | |
| `SR-09` | Screen-Reader: Live region Split-Bill | NVDA / VoiceOver | Chờ kiểm tra âm thanh | | PENDING | |
| `SR-10` | Screen-Reader: Thông báo lỗi Split-Bill | NVDA / TalkBack | Chờ kiểm tra âm thanh | | PENDING | |

---

## 5. Tiêu Chuẩn Phê Chuẩn & Điều Kiện Trình CEO Codex

> [!IMPORTANT]
> **Quy tắc cổng chất lượng phát hành (Gate Exit Rule):**
> 1. **Zero Blocker / Zero Major:** Không được phép tồn tại bất kỳ lỗi tương phản nào $< 4.5:1$ đối với chữ thường, hoặc lỗi làm gián đoạn/sai lệch ngữ nghĩa khi sử dụng trình đọc màn hình.
> 2. **Quy chế hiệu lực:** Checklist JAYT-343 là văn bản **quy chuẩn quy trình**, tuyệt đối **chưa phải là kết quả kiểm thử thủ công PASS**.
> 3. **Kiểm thử trên thiết bị vật lý thật bởi Lead Operator:** Toàn bộ quá trình kiểm thử độ tương phản và trình đọc màn hình phải do đích thân **Lead Operator** thực hiện trên thiết bị vật lý thật (PC chạy NVDA, điện thoại chạy VoiceOver/TalkBack), thu thập đầy đủ transcript (nhật ký âm thanh) và screenshot bằng chứng thực tế trước khi xem xét bất kỳ đề xuất phát hành nào.
> 4. **Điều kiện tiên quyết trình CEO Codex:** Chỉ sau khi Lead Operator hoàn tất kiểm thử, ghi nhận kết quả thực tế đạt chuẩn và lập biên bản đầy đủ thì CEO Codex mới xem xét một Tờ trình phát hành độc lập.
> 5. **Trạng thái hiện hành:** Giữ nguyên nghiêm ngặt `ACCEPTED__STAGING_ONLY`, khóa chặt Production `v3.424.0-r1` (**51 thẻ tổng cộng: 24 công ích + 27 thương mại**).
