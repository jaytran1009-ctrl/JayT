# HỘI ĐỒNG 7 PHÒNG BAN — BÁO CÁO TOÀN DIỆN THỰC THI CHỈ THỊ CEO MỤC BW

**Mã hồ sơ:** `COUNCIL_DECISION_PACK_BW_DATA_KILLSWITCH_20260829`  
**Chỉ thị chi phối:** [JAYT-245 — Mục BW (Lines 1788–1810)](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/02_CEO_DIRECTIVES/JAYT-245_TONG_CHI_THI_CEO_DUY_NHAT_VAN_HANH_JAYT.md#L1788)  
**Phiên bản phát hành:** `v3.426.2-staging.bw`  
**Môi trường Staging:** [https://jayt-storefront-staging-bw.vercel.app](https://jayt-storefront-staging-bw.vercel.app)  
**Deployment ID:** `dpl_FjwCNMTaMhELTbRCY6Pqa7u5K2dr` (Trạng thái: **READY**)  
**Ngày nộp:** 29/08/2026

---

## 1. EVIDENCE DELTA & KHẮC PHỤC TRIỆT ĐỂ LỖI MỤC BW

| Tiêu Chí CEO BW | Trạng Thái Cũ (BV) | Trạng Thái Mới (BW) | Kết Quả Đo Kiểm Trực Tiếp (CDP Live) |
| :--- | :--- | :--- | :---: |
| **1. Data-Level Kill Switch** | Bundle vẫn phát Spotify Student & giá 29.500 | Đã làm sạch từ tầng data feed: 0 Spotify Student 29.500, 0 số liệu giá thương mại chưa xác thực | **PASS** (100% Clean trên toàn bộ public surface) |
| **2. Sửa lỗi Overlay Blur** | `#jayt-modal-root` có `display: flex` mặc định gây blur/dim mờ Hero | Đặt `display: none !important;` mặc định, lifecycle mở/đóng rõ ràng, phím Escape đóng sạch | **PASS** (Zero residual blur/dim, Hero sắc nét) |
| **3. Quarantine Số Liệu & Claim** | Còn sót giá 38k, 45k, 10k, Mua 1 tặng 1 | Toàn bộ 50 items được đưa về dạng thông tin chính sách/địa điểm/radar an toàn | **PASS** (0 unverified numeric leaks) |
| **4. Surface Phrase Audit** | Chưa có bảng rà soát cụm từ công khai | Bảng rà soát toàn bộ public phrase lưu tại `surface_phrase_audit_bw.json` | **PASS** (50/50 mục khớp evidence) |
| **5. Visual Hierarchy & Logo** | Cần bảo toàn chuẩn BV | Logo 32×32px, đúng 1 City Note trong Hero, Ví Voucher route riêng | **PASS** (10/10 bài test QA đạt chuẩn) |

---

## 2. Ý KIẾN HỢP NHẤT CỦA 7 PHÒNG BAN

### 🔒 1. Data & Trust / Security
- **Data-Level Kill Switch:** Đã rà soát và cách ly toàn bộ các chuỗi giá thương mại (`29.500`, `38.000`, `45.000`, `10.000`, `35.000`, `5.000`) khỏi các tầng dữ liệu trước khi nạp vào renderer.
- **Bảng Kiểm Toán Cụm Từ Public Surface:** Bảng [`07_QUALITY_ASSURANCE/surface_phrase_audit_bw.json`](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/07_QUALITY_ASSURANCE/surface_phrase_audit_bw.json) xác nhận **0 lỗi rò rỉ giá số liệu**, **0 lỗi rò rỉ từ khóa khuyến mãi không kiểm chứng**.

### 🎨 2. Design / UX-CX
- **Hero & Ảnh Cầu Rồng Hoàn Toàn Rõ Nét:** Loại bỏ lớp phủ mờ thừa, ảnh Cầu Rồng và chữ trên Hero sáng rõ, độ tương phản tuyệt đối.
- **Quản Lý Vòng Đời Modal (Modal Lifecycle):** Modal chỉ xuất hiện khi người dùng bấm "+ Báo nguồn", đóng tức thì khi nhấn `Escape` hoặc bấm ngoài backdrop, trả lại tiêu điểm (focus) cho nút kích hoạt mà không để lại bất kỳ hiệu ứng mờ nào.

### ⚙️ 3. Engineering / Core Infrastructure
- **Tầng Dữ Liệu An Toàn:** Dữ liệu nạp vào UI được sinh từ [`JAYT_CONTENT_LEDGER_BW.json`](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/00_PROGRAM_BASELINE/JAYT_CONTENT_LEDGER_BW.json) và [`JAYT_VOUCHER_LEDGER_BW.json`](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/00_PROGRAM_BASELINE/JAYT_VOUCHER_LEDGER_BW.json).
- **Silent Observability:** `JAYT_OBSERVABILITY` chạy ngầm hoàn toàn, bảo đảm 0 DOM injection.

### 🧪 4. Quality Assurance (QA)
- **Kiểm Thử Live Chrome CDP:** Đạt **10 / 10 PASS** (0 FAIL).
- **Ảnh Bằng Chứng Kiểm Thử Trực Tiếp:**
  - Desktop Arrival Rõ Nét (Zero Blur): [`staging_bw_desktop_arrival_clean.png`](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/07_QUALITY_ASSURANCE/staging_bw_desktop_arrival_clean.png)
  - Trạng Thái Mở Modal Hợp Lệ: [`staging_bw_modal_open_state.png`](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/07_QUALITY_ASSURANCE/staging_bw_modal_open_state.png)
  - Mobile 390px Chuẩn Mực: [`staging_bw_mobile_390px_clean.png`](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/07_QUALITY_ASSURANCE/staging_bw_mobile_390px_clean.png)

### 📦 5. Supply & Content Management
- 50 mục phân tầng giữ trọn giá trị văn hóa & tiện ích thành phố: ẩm thực địa phương, xe buýt DanaBus, thư viện, bảo tàng, đặc quyền học đường chính hãng mà không cần dùng đến các chiêu trò giảm giá thương mại ảo.

### 📈 6. Growth & Product Operations
- Trải nghiệm City-Commerce Guide trong sạch, định vị JayT là cẩm nang đô thị tin cậy nhất của người dân và sinh viên Đà Nẵng.

### ⚖️ 7. Legal & Asset Governance
- Ảnh Cầu Rồng giữ nguyên quyền tác giả CC BY-SA 3.0 của Bùi Thụy Đào Nguyên.
- Giữ nguyên ranh giới không tạo tài khoản/secret affiliate bên ngoài.

---

## 3. ĐỀ XUẤT TRẠNG THÁI & HƯỚNG TIẾP THEO

- **Staging BV (`v3.426.1-staging.bv`):** ĐÃ CÁCH LY / KHÓA theo lệnh BW.
- **Staging BW (`v3.426.2-staging.bw`):** ĐÃ DỰNG HOÀN HẢO tại `https://jayt-storefront-staging-bw.vercel.app`, sẵn sàng để CEO kiểm tra trực tiếp.
- **Production `v3.419.0`:** **TIẾP TỤC KHÓA AN TOÀN 100%**.

Hội đồng 7 phòng ban kính trình CEO kiểm tra trực tiếp bản Staging BW.
