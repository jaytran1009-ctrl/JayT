# BÁO CÁO THẨM ĐỊNH NGỮ NGHĨA ƯU ĐÃI NGUỒN CHÍNH THỨC (109R)
**Mã Báo Cáo**: `JAYT-109R-SEMANTIC-OFFER-TRUTH-GATE-REVIEW-PACK`  
**Chỉ thị điều phối**: `JAYT-109R-SEMANTIC-OFFER-TRUTH-GATE`  
**Trạng thái**: `IMPLEMENTED_PENDING_CEO_AUDIT`  
**Thời điểm hoàn tất**: `2026-08-25T19:30:00+07:00`  
**Phiên bản hệ thống**: `PROJECT_MEMORY.md v3.218.0` (SHA-256: `cdf8a22ccd645919e60ca7449ed15a514eea121a473da1b95ace2aeda8ccbc7a`)

---

## 1. TỔNG QUAN & KẾT QUẢ PHÂN LOẠI 7 LỚP

Toàn bộ **84 leaf pages** đã được bóc tách và phân loại qua **Semantic Gate 7 lớp**:
1. **Lọc URL & Deduplication**: Loại bỏ URL lỗi cấu trúc (malformed) và URL trùng qua nhiều seed.
2. **Page Type Gate**: Chặn các trang tin tức hành chính, tin ISO/FSSC, PR/rebrand, mô tả định dạng phòng chiếu (3D/4DX), màn hình đăng nhập/chính sách và dịch vụ đã dừng.
3. **Phân vùng Zone (Header / Body / Legal Footer)**: Loại bỏ triệt để việc match nhầm menu điều hướng và điều khoản pháp lý ở chân trang.
4. **Cohesive Offer Block**: Bắt buộc C1 (Ưu đãi cụ thể) và C2 (Điều kiện) phải nằm trong **cùng một khối bài viết**.
5. **Date Validation**: Bóc tách `valid_to` tường minh và đối soát với thời điểm quan sát (`2026-08-25`).
6. **Đà Nẵng Scope Verification**: Khớp nối trực tiếp với 18 cơ sở canonical đang hoạt động tại Đà Nẵng hoặc xác nhận dịch vụ còn mở tại Đà Nẵng.
7. **Phân nhóm chuẩn xác 3 nhóm**:

| Nhóm Phân Loại | Số Lượng | Tỷ Lệ | Trạng Thái Quản Trị |
|---|---|---|---|
| **1. ACTIVE_REVIEWABLE** | **3** | 3.6% | Đủ 4 tiêu chí ngữ nghĩa trong cùng bài viết + còn hạn tới tương lai + áp dụng Đà Nẵng |
| **2. EXPIRED_OR_REJECTED** | **45** | 53.6% | Bị chặn bởi bộ lọc ngữ nghĩa (tin tức, PR, 3D format, URL trùng, lịch sử cũ, dừng HĐ) |
| **3. INCOMPLETE** | **36** | 42.8% | Trang danh mục, thực đơn món, hoặc chương trình thường trực chưa có `valid_to` cụ thể |
| **TỔNG CỘNG** | **84** | **100%** | **Đã giáng hoàn toàn 19 false positives cũ về UNVERIFIED** |

> [!IMPORTANT]
> **Khẳng định Quản Trị**: Toàn bộ 19 mục cũ đã bị giáng hoàn toàn về `UNVERIFIED_LEAF_REQUIRES_SEMANTIC_RECHECK`. Không dùng số 19 làm thành tích nguồn cung. 3 mục `ACTIVE_REVIEWABLE` là các bài viết ưu đãi thật sự trên web chính thức, chỉ dùng để CEO thẩm định, **không tự động phát hành deal/voucher hay cấp quyền production**.

---

## 2. BẢNG ĐỐI SOÁT 6 TRƯỜNG HỢP FALSE POSITIVE DO CEO PHÁT HIỆN

| Trường Hợp CEO Chỉ Định | Mã Leaf | Kết Quả Semantic Gate 109R | Lý Do & Bằng Chứng Ngữ Nghĩa |
|---|---|---|---|
| **1. Jollibee Tin tức / ISO** | `TARGET_108_01_JOLLIBEE_LEAF_03`<br>`TARGET_108_01_JOLLIBEE_LEAF_04` | `EXPIRED_OR_REJECTED` | Leaf 03 là tin nhượng quyền & ISO (`CERTIFICATION_OR_FRANCHISE_NEWS`). Leaf 04 là URL lỗi `http://.../http://...` (`MALFORMED_URL`). |
| **2. CGV 3D Định dạng rạp** | `TARGET_108_14_CGV_LEAF_05` | `EXPIRED_OR_REJECTED` | Trang mô tả định dạng phòng chiếu 3D, không có giá/mã giảm giá (`PRODUCT_DESCRIPTION_NOT_OFFER`). |
| **3. Be Lịch sử (2020) & PR (2022)** | `TARGET_108_21_BE_LEAF_02`<br>`TARGET_108_21_BE_LEAF_05` | `EXPIRED_OR_REJECTED` | Leaf 02 là ưu đãi Cake đăng ngày 12/12/2020 (`HISTORICAL_OR_EXPIRED_CONTENT`). Leaf 05 là bài PR đổi nhận diện 2022 (`PR_OR_BRAND_ANNOUNCEMENT`). |
| **4. TNGo Dừng hoạt động Đà Nẵng** | `TARGET_108_23_TNGO_LEAF_02`<br>`TARGET_108_23_TNGO_LEAF_03`<br>`TARGET_108_23_TNGO_LEAF_04` | `EXPIRED_OR_REJECTED` | TNGo đã thông báo dừng hoạt động tại Đà Nẵng (`SERVICE_STOPPED_IN_DANANG`). Leaf 04 thông báo dừng gói vé tháng 20K. |
| **5. Starlight Hết hạn / Ngày cũ** | `TARGET_108_17_STARLIGHT_LEAF_04`<br>`TARGET_108_17_STARLIGHT_LEAF_05` | `EXPIRED_OR_REJECTED` | Leaf 04 đăng 11/03/2025; Leaf 05 đăng 2022/2025 không có hạn tương lai (`HISTORICAL_OR_EXPIRED_CONTENT`). |
| **6. CGV URL Trùng** | `TARGET_108_18_CGV_U22_LEAF_01`<br>`TARGET_108_18_CGV_U22_LEAF_05` | `EXPIRED_OR_REJECTED` | Trùng 100% `final_url` với `TARGET_108_14_CGV_LEAF_01` và `LEAF_05` (`DUPLICATE_URL`). |

---

## 3. NHÓM 1: ACTIVE_REVIEWABLE (3 MỤC DUY NHẤT ĐỦ ĐIỀU KIỆN)

Các mục này thỏa mãn đầy đủ 4 tiêu chí trong cùng 1 bài viết, có hạn dùng còn hiệu lực sau ngày 25/08/2026 và áp dụng tại Đà Nẵng:

### 🎬 1. CGV Payday — Giảm ngay 30.000Đ khi mua từ 2 vé
- **Leaf ID**: `TARGET_108_14_CGV_LEAF_01`
- **Thương hiệu**: CGV Cinemas (có 3 cơ sở canonical tại Đà Nẵng)
- **URL**: `https://www.cgv.vn/default/newsoffer/uu-dai-online/`
- **Khối ưu đãi**: "Từ 25/08 – 31/08/2026, thành viên CGV đặt vé trên Website/App CGV sẽ được: Giảm ngay 30.000Đ khi mua từ 02 vé trở lên. Mã khuyến mãi: PAYDAY"
- **Thời hạn (`valid_to`)**: `2026-08-31` (còn hiệu lực 6 ngày tính từ ngày capture)
- **Phạm vi**: Toàn quốc / toàn hệ thống rạp CGV (bao gồm CGV Vĩnh Trung Plaza, CGV Vincom Đà Nẵng)
- **Điều kiện**: Đặt qua Web/App, mua từ 02 vé trở lên, áp dụng suất chiếu trong thời gian quy định.

### 🎬 2. CGV x VNPAY / Mobile Banking — Mua 1 Tặng 1 & Giảm tới 50%
- **Leaf ID**: `TARGET_108_14_CGV_LEAF_02`
- **Thương hiệu**: CGV Cinemas (có 3 cơ sở canonical tại Đà Nẵng)
- **URL**: `https://www.cgv.vn/default/newsoffer/cgv-vnpay-vietin/`
- **Khối ưu đãi**: "Ưu đãi Mua 1 tặng 1 vé xem phim CGV (Mã: MUA1TANG1); Giảm ngay 50% vé CGV (Mã: BUICONGNAM) khi đặt vé qua App Ngân hàng (Agribank, BIDV, VCB, VietinBank) & VNPAY"
- **Thời hạn (`valid_to`)**: `2026-09-30` (còn hiệu lực đến hết tháng 9/2026)
- **Phạm vi**: Toàn hệ thống rạp CGV trên toàn quốc
- **Điều kiện**: Khách hàng cá nhân thanh toán qua tính năng Đặt vé xem phim trên ứng dụng ngân hàng liên kết.

### 🎬 3. Starlight Cinema — Hè Rộn Ràng Giảm 10.000Đ Combo Bắp Nước
- **Leaf ID**: `TARGET_108_17_STARLIGHT_LEAF_03`
- **Thương hiệu**: Starlight Cinema
- **URL**: `https://starlight.vn/uu-dai/%F0%9F%8C%9E-he-ron-rang-deal-10k-san-sang-%F0%9F%8C%9E-1064.html`
- **Khối ưu đãi**: "Nhập ngay mã: COMBOHE10K để được GIẢM NGAY 10.000Đ trên tổng hóa đơn thanh toán khi đặt vé online kèm combo bắp nước."
- **Thời hạn (`valid_to`)**: `2026-09-19` (từ 16/06 đến 19/09/2026, còn hiệu lực 25 ngày)
- **Phạm vi**: Ghi rõ đích danh **Starlight Đà Nẵng** (Tầng 4, Tòa nhà Nguyễn Kim, 46 Điện Biên Phủ, Đà Nẵng) và Starlight Quy Nhơn.
- **Điều kiện**: Áp dụng cho combo Star Premium 1-2, combo Star Classic Extra 1-2 khi đặt qua App/Web Starlight.

---

## 4. NHÓM 2: EXPIRED_OR_REJECTED (45 MỤC ĐÃ LOẠI BỎ)

Phân bổ chi tiết 45 mục bị từ chối:

| Lý Do Loại Bỏ | Số Lượng | Danh Sách Leaf IDs Tiêu Biểu |
|---|---|---|
| `DUPLICATE_URL` | 10 | `CGV_U22_LEAF_01`, `03`, `04`, `05`, `LOTTE_LEAF_04`, `CHO_HAN_LEAF_01`–`05` |
| `HISTORICAL_OR_EXPIRED_CONTENT` | 17 | `BE_LEAF_02` (2020), `STARLIGHT_LEAF_04` (2025), `STARLIGHT_LEAF_05` (2022/2025), `PHUCLONG_LEAF_01`–`05`, `KFC_LEAF_01`–`04`, v.v. |
| `GOVERNMENT_ADMINISTRATIVE_PAGE` | 5 | `CHO_CON_LEAF_01`–`05` (Cổng TTĐT Đà Nẵng, HĐND đấu giá/khởi công hạ tầng) |
| `POLICY_OR_AUTH_PAGE` | 5 | `METIZ_LEAF_02` (Login), `METIZ_LEAF_03` (Chính sách TV), `WINMART_LEAF_01`–`02`, v.v. |
| `SERVICE_STOPPED_IN_DANANG` | 3 | `TNGO_LEAF_02`, `TNGO_LEAF_03`, `TNGO_LEAF_04` |
| `CERTIFICATION_OR_FRANCHISE_NEWS` | 1 | `JOLLIBEE_LEAF_03` (Tin nhượng quyền & nhà máy ISO) |
| `MALFORMED_URL` | 1 | `JOLLIBEE_LEAF_04` (`https://.../https://...`) |
| `PRODUCT_DESCRIPTION_NOT_OFFER` | 1 | `CGV_LEAF_05` (Giới thiệu định dạng phòng chiếu 3D) |
| `PR_OR_BRAND_ANNOUNCEMENT` | 1 | `BE_LEAF_05` (Thông cáo thay đổi nhận diện thương hiệu 2022) |
| `CAPTURE_FAILED` | 1 | `PHELA_LEAF_03` (Lỗi DNS domain test.phela.vn) |

---

## 5. NHÓM 3: INCOMPLETE (36 MỤC CẦN THEO DÕI / BÓC TÁCH THÊM)

Bao gồm:
- **6 trang Category Listing**: `GALAXY_LEAF_01`, `STARLIGHT_LEAF_01`, `STARLIGHT_LEAF_02`, `XANH_SM_LEAF_03`, `LOTTE_CINEMA_LEAF_03`, `METIZ_LEAF_01`. Các trang này chứa danh sách tiêu đề ưu đãi nhưng chưa có nội dung chi tiết của từng bài bên trong.
- **30 trang Thực đơn / Thông tin chuyến**: Các trang thực đơn sản phẩm (Highlands, Gong Cha, Phê La, Gogi, Katinat) hoặc lộ trình xe buýt (DanaBus 01–05) không chứa cơ chế giảm giá/voucher cụ thể.

---

## 6. BÀN GIAO QUẢN TRỊ BẮT BUỘC (GOVERNANCE HANDOVER BLOCK)
1. **Phiên bản**: `PROJECT_MEMORY.md v3.218.0`
2. **SHA-256**: `cdf8a22ccd645919e60ca7449ed15a514eea121a473da1b95ace2aeda8ccbc7a`
3. **Chỉ thị**: `JAYT-109R-SEMANTIC-OFFER-TRUTH-GATE` — `IMPLEMENTED_PENDING_CEO_AUDIT`
4. **Trạng thái Deals Production**: `deals_feed.json: []`, `is_approved: false` (Khóa sản xuất 100%)
5. **Đường dẫn Manifest 109R**:
```text
D:\Công Việc MMO\OPC JayT\JayT-Dự Án Giá Trị Cộng Đồng\05_DEAL_AND_AFFILIATE\semantic_offer_manifest_109r.json
```
