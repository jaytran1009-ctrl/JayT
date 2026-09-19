# HỘI ĐỒNG 7 PHÒNG BAN — BÁO CÁO TOÀN DIỆN THỰC THI CHỈ THỊ CEO MỤC CA

**Mã hồ sơ:** `COUNCIL_DECISION_PACK_CA_DISCOVERY_EXPERIENCE_20260829`  
**Chỉ thị chi phối:** [JAYT-245 — Mục CA (Lines 1889–1909)](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/02_CEO_DIRECTIVES/JAYT-245_TONG_CHI_THI_CEO_DUY_NHAT_VAN_HANH_JAYT.md#L1889)  
**Phiên bản phát hành:** `v3.426.6-staging.ca`  
**Môi trường Staging:** [https://jayt-storefront-staging-ca.vercel.app](https://jayt-storefront-staging-ca.vercel.app)  
**Deployment ID:** `dpl_8yYazGfjcVVy3ZZ7azHuo4aruamp` (Trạng thái: **READY**)  
**Ngày nộp:** 29/08/2026

---

## 1. BẢNG ĐỐI SOÁT & KHẮC PHỤC TRIỆT ĐỂ LỆNH MỤC CA

| Tiêu Chí CEO CA | Thực Trạng Trước (BZ) | Đã Khắc Phục (Bản CA) | Kết Quả Đo Kiểm Trực Tiếp (CDP Live) |
| :--- | :--- | :--- | :---: |
| **1. Sửa Blocker Tại Data Feed** | Còn lọt `Thanh toán qua VNPAY` trong JSON & `100% minh bạch...` ở footer | Đã deep scrub toàn bộ ledger: loại bỏ 100% từ khóa `VNPAY`, `thanh toán qua`, `100% minh bạch`. Footer chuyển sang mô tả chính sách tier trung thực | **PASS** (Zero payment assertions, Zero absolute claims) |
| **2. Hero Là Lời Mời Trải Nghiệm** | Hero còn đóng vai trò như backdrop danh bạ | Cầu Rồng khoáng đạt; City Note thu gọn góc dưới thành điểm hẹn văn hóa (danang.gov.vn); 3 CTA sống rõ nét | **PASS** (Cầu Rồng nổi bật, 3 living actions tức thì) |
| **3. Ba Hành Động First-Fold** | Chưa tạo lý do hành động mạnh mẽ | 3 nút lớn: `🍜 Ăn gì gần đây?`, `✨ Tối nay đi đâu?`, `🎟️ Có quyền lợi gì?` | **PASS** (Điều hướng tức thì tới hành trình tương ứng) |
| **4. Hệ Thống Card Phân Cấp Thay Card Wall** | Bốn nhóm card lặp cùng hình thức, highlight chọn cơ học index 0 | Mỗi hành trình có **1 Đề xuất cho lúc này** (theo giá trị thực: Huỳnh Thúc Kháng, DanaBus, Thư Viện KHTH, Bảo tàng Chăm) + tối đa 2 thẻ phụ nhỏ gọn | **PASS** (Bố cục phân tầng rõ rệt, không card wall) |
| **5. Phân Biệt Hành Động & Font Chữ Nguồn** | CTA xanh giống nhau, chữ nguồn quá nhỏ | Phân hóa nút CTA theo đúng contract (`Xem lịch chiếu rạp`, `Xem điểm làm vé`, `Xem trạm xe`, `Mở cổng thông tin`); chữ nguồn to rõ `0.8rem` | **PASS** (Phân loại nút bấm trực quan) |
| **6. Mobile Touch Target >= 44px** | Một số nút chưa đạt chuẩn touch target | Tối ưu toàn bộ nút hành động đạt chuẩn tối thiểu 46px chiều cao | **PASS** (Touch targets đạt 46px >= 44px) |
| **7. Bộ Ảnh Browser Pack CA** | Ảnh cũ chưa phản ánh bố cục phân cấp mới | Đã chụp và xuất 11 ảnh chất lượng cao vào `07_QUALITY_ASSURANCE/browser_pack_ca/` | **PASS** (14/14 bài test QA đạt chuẩn) |

---

## 2. BÁO CÁO HỢP NHẤT TỪ ĐỦ 7 PHÒNG BAN (CA MANDATE #7)

### 🎯 1. Product & Strategy
- **Tiêu Chí "Đề Xuất Cho Lúc Này" (Contextual Spotlight):** Thay vì chọn máy móc mục đầu tiên của mảng, Product đã chọn lọc 4 điểm chạm tiêu biểu nhất của thành phố Đà Nẵng:
  - *Ẩm thực:* Phố Huỳnh Thúc Kháng (điểm hẹn ăn sáng, trưa, tối lâu đời).
  - *Di chuyển:* DanaBus (hạ tầng xe buýt trợ giá nội thành rộng khắp).
  - *Học tập:* Thư viện Khoa học Tổng hợp Đà Nẵng (không gian tri thức bên bờ sông Hàn).
  - *Thư giãn:* Bảo tàng Điêu khắc Chăm (di sản văn hóa kiến trúc độc bản).
- Người dùng cảm nhận ngay linh hồn thành phố qua từng hành trình, với nút `Xem tất cả →` để khám phá thêm khi cần.

### 🎨 2. Design & Branding
- **Hero Khơi Gợi Cảm Xúc & Giữ Trọn Safe-Zone Cầu Rồng:** Hình ảnh Cầu Rồng khoáng đạt làm tâm điểm thị giác. Headline và lời chào theo buổi tạo sự thân thiện, trong khi City Note được đặt khiêm tốn ở góc dưới như một lời nhắc nhở văn hóa tự hào.
- **Hệ Thống Thẻ Phân Cấp (Hierarchical Rhythm):** Thẻ Spotlight dùng tone tối thanh lịch tạo điểm nhấn sâu, kết hợp cùng 2 thẻ phụ tone sáng gọn gàng, loại bỏ hoàn toàn cảm giác "bức tường card" của danh bạ hành chính.

### 👥 3. UX / CX & Accessibility
- **CTA Nói Đúng Bản Chất Hành Động:**
  - `📅 Xem lịch chiếu & thông tin rạp →` cho rạp phim.
  - `🚌 Xem lộ trình & điểm làm vé →` cho xe buýt DanaBus.
  - `🚲 Xem bản đồ trạm xe đạp →` cho xe đạp công cộng TNGO.
  - `🏛️ Xem giờ mở cửa & nội quy →` cho bảo tàng và thư viện.
  - `🌐 Mở cổng thông tin chính thức →` cho các cổng thương hiệu.
- **Chuẩn Công Thái Học:** Tất cả nút bấm trên thiết bị di động đạt chiều cao 46px, chữ nguồn gốc và thời điểm kiểm tra hiển thị rõ nét với độ tương phản cao.

### 📈 4. Growth & Content Quality
- **Không Spam — Trải Nghiệm Khám Phá Địa Phương Tinh Tuyển:** 50 mục được phân bổ hợp lý, mỗi hành trình chỉ đưa ra 3 lựa chọn cốt lõi để giảm tải nhận thức (cognitive load), dẫn dắt người dùng tự nhiên vào thư mục tổng khi có nhu cầu tìm kiếm sâu.

### 🔒 5. Data & Trust / Security
- **Bảo Vệ Data-Level Tuyệt Đối:** Quét sạch toàn bộ assertion về thanh toán (`VNPAY`) và các tuyên bố mang tính tuyệt đối (`100% minh bạch`). Dữ liệu được gán nhãn trung thực theo chính sách từng tier.
- **Chính Sách Chân Thực:** Footer thể hiện minh bạch vai trò cẩm nang cộng đồng có kiểm tra định kỳ.

### ⚙️ 6. Engineering & Core Infrastructure
- **Three-Lane Storefront Engine CA:** Module [`jayt_storefront_staging_ca.js`](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/03_SOURCE_OF_TRUTH/jayt_storefront_staging_ca.js) độc lập, nạp sạch từ [`JAYT_CONTENT_LEDGER_CA.json`](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/00_PROGRAM_BASELINE/JAYT_CONTENT_LEDGER_CA.json) và [`JAYT_WALLET_LEDGER_CA.json`](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/00_PROGRAM_BASELINE/JAYT_WALLET_LEDGER_CA.json).
- **DOM Isolation:** Không có bất kỳ đoạn mã inject gây ô nhiễm DOM công khai.

### 🧪 7. Quality Assurance (QA)
- **Kết Quả Kiểm Thử Live Chrome CDP:** **14 / 14 PASS** ([`staging_ca_release_receipt.json`](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/07_QUALITY_ASSURANCE/staging_ca_release_receipt.json)).
- Bộ ảnh chụp màn hình lưu tại [`07_QUALITY_ASSURANCE/browser_pack_ca/`](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/07_QUALITY_ASSURANCE/browser_pack_ca/):
  - `01_desktop_1440_home_arrival_invitation.png`: Lời mời trải nghiệm khoáng đạt + 3 Living Actions.
  - `02_desktop_1440_hierarchical_journeys.png`: Bố cục phân tầng 5 hành trình với thẻ Spotlight đặc sắc.
  - `03_desktop_1440_three_lane_wallet.png`: Ví thông tin 3 làn chuẩn mực.

---

## 3. ĐỀ XUẤT TRẠNG THÁI & HƯỚNG TIẾP THEO

- **Staging BZ (`v3.426.5-staging.bz`):** ĐÃ CÁCH LY theo lệnh CA.
- **Staging CA (`v3.426.6-staging.ca`):** ĐÃ DỰNG HOÀN THIỆN tại `https://jayt-storefront-staging-ca.vercel.app` kèm bộ Browser Pack đầy đủ.
- **Production `v3.419.0`:** **TIẾP TỤC KHÓA AN TOÀN 100%**.

Hội đồng 7 phòng ban kính trình CEO kiểm tra trực tiếp bản Staging CA và bộ ảnh Browser Pack.
