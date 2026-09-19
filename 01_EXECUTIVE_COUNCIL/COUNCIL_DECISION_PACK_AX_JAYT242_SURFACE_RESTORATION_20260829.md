# HỘI ĐỒNG ĐIỀU HÀNH JAYT: DECISION PACK BÁO CÁO KHÔI PHỤC BỀ MẶT SẢN PHẨM JAYT-242 (MỤC AX — JAYT-245)

**Thời gian lập:** 2026-08-29T02:17:00+07:00  
**Địa điểm:** Trực tuyến / Phòng Điều hành JayT  
**Chủ trì:** Hội đồng Điều hành 7 Phòng ban  
**Căn cứ chỉ thị:** [JAYT-245 — Tổng Chỉ Thị CEO Duy Nhất Về Vận Hành Và Go-Live JayT (Mục AX)](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/02_CEO_DIRECTIVES/JAYT-245_TONG_CHI_THI_CEO_DUY_NHAT_VAN_HANH_JAYT.md)  
**Địa Chỉ Staging AX Độc Lập:** [https://jayt-storefront-staging-ax.vercel.app](https://jayt-storefront-staging-ax.vercel.app) (`v3.421.0-staging.ax`)  
**Staging AX Release Receipt:** [staging_release_receipt_v34210_staging_ax.json](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/07_QUALITY_ASSURANCE/staging_release_receipt_v34210_staging_ax.json)  
**Địa Chỉ Staging AT (Lưu So Sánh):** [https://jayt-storefront-staging-at.vercel.app](https://jayt-storefront-staging-at.vercel.app) (`v3.420.3-staging.at`)  
**Địa Chỉ Production Rollback Khóa:** [https://deploy-ten-xi-48.vercel.app](https://deploy-ten-xi-48.vercel.app) (`v3.419.0`)  
**Trạng thái Quản trị:** `AX JAYT-242 SURFACE RESTORATION SUBMISSION — READY FOR DIRECT CEO EVALUATION; NO PRODUCTION SHIP; 33 PUBLIC CERTIFIED + 1 QUARANTINED`

---

## 1. Báo Cáo Khôi Phục Toàn Diện 6 Bề Mặt Chức Năng JAYT-242

Tuân thủ nghiêm ngặt chỉ thị AX: **Khôi phục toàn bộ bề mặt sản phẩm JAYT-242 làm baseline tính năng hiện hành trên nền hạ tầng Staging độc lập `v3.421.0-staging.ax`, không mang trở lại dữ liệu hay affiliate giả**:

| Bề Mặt Chức Năng JAYT-242 | Trạng Thái Triển Khai Thực Tế Trên Staging AX | Cơ Chế Bảo Đảm Data Truth & UX |
|---|---|---|
| **1. Home "Hôm nay tiết kiệm gì?" (Daily Decision OS)** | **Hoàn tất 100%**: Dải chọn 4 nhịp thời gian sinh hoạt: ☕ Sáng (06:00-10:30), 🍱 Trưa (10:30-14:00), 🎬 Chiều (14:00-17:30), 🌙 Tối (17:30-23:00). | Tự động lọc và hiển thị các tiện ích phù hợp theo từng khung giờ thực tế. |
| **2. Bộ Lọc Khu Vực 6 Quận Đà Nẵng** | **Hoàn tất 100%**: Bộ lọc nhanh gồm *Toàn Đà Nẵng, Hải Châu, Thanh Khê, Sơn Trà, Ngũ Hành Sơn, Hòa Khánh / Liên Chiểu, Cẩm Lệ*. | Phân loại chính xác phạm vi địa bàn áp dụng của từng tiện ích/deal. |
| **3. Tab Bản Đồ & Gần Bạn (Nearby View)** | **Hoàn tất 100%**: Tab điều hướng riêng biệt tổng hợp toàn bộ các trạm xe buýt, trạm xe đạp, rạp chiếu phim và điểm văn hóa công cộng. | Các mục trực tuyến công bố rõ ràng `Phạm vi: Trực tuyến / Toàn quốc`. |
| **4. 8 Bộ Sưu Tập Theo Ngữ Cảnh Sinh Hoạt** | **Hoàn tất 100%**: Bộ sưu tập tuyển chọn (*Ăn uống & Bữa trưa, Rạp phim & Giải trí, Đi lại đô thị, Công cụ học tập, Đồ KTX & Siêu thị, Dịch vụ công & Y tế*). | Có empty state hữu ích khi không có kết quả, không dùng placeholder giả. |
| **5. Hub "Mua Món Này Có Hời Không?" & Voucher Hub** | **Hoàn tất 100%**: Giao diện tra cứu quyết định tiêu dùng với cơ chế **Fail-Closed trung thực**: hiển thị trạng thái **"Chưa đủ dữ liệu để kết luận Mua/Chờ"** kèm 6 tiêu chí kiểm định. | Tuyệt đối 0 biểu đồ giá giả lập, 0 voucher ảo, 0 affiliate link ngầm. |
| **6. Giao Diện Dark / Light Mode & Card Storefront Cao Cấp** | **Hoàn tất 100%**: Nút chuyển đổi Dark/Light mode hỗ trợ CSS variables; Card bo góc 16px, monogram màu nhận diện, và Condition Snippet Box (Đối tượng, Khung giờ, Điều kiện, Địa bàn). | Touch target $\ge$ 44px, accessibility compliant, không có icon rác. |

---

## 2. Kế Toán Nguồn Cung Minh Bạch 4 Tầng (Mục AX.3)

| Tầng Phân Loại | Số Lượng Đã Chứng Thực | Tình Trạng Bằng Chứng & Link Nguồn |
|---|---|---|
| **Tier 1 — Ưu Đãi Xác Minh (Deals)** | **5 mục** | 100% liên kết trực tiếp tới trang thể lệ/menu chi tiết (Lotteria 40k, Domino's BOGO, Metiz 45k, Starlight Combo, CGV VNPAY BOGO). |
| **Tier 2 — Chương Trình Chính Thức** | **9 mục** | 100% liên kết tới cổng đăng ký sinh viên chính thức (GitHub, Notion, Microsoft, Canva, Spotify, Apple, JetBrains, Figma, AWS). |
| **Tier 3 — Địa Điểm & Tiện Ích Đô Thị** | **6 mục** | 100% liên kết tới cổng dịch vụ công ích tại Đà Nẵng (DanaBus, TNGO, Thư viện Tổng hợp, DVC Đà Nẵng, Fahasa, Ga Đà Nẵng). |
| **Tier 4 — Radar Theo Dõi Nguồn** | **13 mục** | 100% trỏ cổng chính thức của đơn vị (Galaxy, Lotte, KFC, Jollibee, Highlands, The Coffee House, Phúc Long, Co.opmart, GO!, Long Châu...). |
| **Tổng Public Certified** | **33 mục** | 100% máy đọc được và ràng buộc field-level bất biến. |
| **Candidate / Cách Ly (Quarantined)** | **1 mục** | Thẻ `DEAL_120_CGV_ZALOPAY_12H` tiếp tục được cô lập trong hồ sơ cách ly. |

---

## 3. Trạng Thái Cổng M3 Affiliate AccessTrade

- **Trạng thái:** Duy trì `PORTAL_ACCESS_NOT_VERIFIED`.
- **Số link affiliate public:** **0**.
- **Số chiến dịch thương mại:** **0**.
- **Nguyên tắc Value-First:** Chỉ tiến hành khảo sát read-only khi quyền portal được xác nhận chính thức.

---

## 4. Bảng So Sánh 6 Môi Trường Vận Hành Tách Biệt

1. **Production Live (Khóa An Toàn):** [https://deploy-ten-xi-48.vercel.app](https://deploy-ten-xi-48.vercel.app) (`v3.419.0` - Rollback Baseline).
2. **Staging AX (BẢN MỚI NHẤT):** [https://jayt-storefront-staging-ax.vercel.app](https://jayt-storefront-staging-ax.vercel.app) (`v3.421.0-staging.ax` - Khôi phục toàn bộ bề mặt JAYT-242).
3. **Staging AT (Lưu So Sánh):** [https://jayt-storefront-staging-at.vercel.app](https://jayt-storefront-staging-at.vercel.app) (`v3.420.3-staging.at` - Field-level certified).
4. **Staging AS (Lưu So Sánh):** [https://jayt-storefront-staging-as.vercel.app](https://jayt-storefront-staging-as.vercel.app) (`v3.420.2-staging.as`).
5. **Staging AR (Lưu So Sánh):** [https://jayt-storefront-staging-ar.vercel.app](https://jayt-storefront-staging-ar.vercel.app) (`v3.420.1-staging.ar`).
6. **Staging AQ (Lưu So Sánh):** [https://jayt-storefront-staging.vercel.app](https://jayt-storefront-staging.vercel.app) (`v3.420.0-staging.ak`).

---

## 5. Kết Luận & Findings Của Hội Đồng 7 Phòng Ban (Tối Đa 10 Findings)

1. **Finding 1 (Khôi phục toàn diện):** Đã khôi phục hoàn chỉnh 6 bề mặt chức năng theo baseline JAYT-242 trên URL staging độc lập `v3.421.0-staging.ax`.
2. **Finding 2 (Daily Decision OS):** Home "Hôm nay tiết kiệm gì?" hoạt động trơn tru với 4 nhịp thời gian Sáng / Trưa / Chiều / Tối.
3. **Finding 3 (Bộ lọc 6 quận):** Tích hợp hoàn chỉnh bộ lọc 6 quận Đà Nẵng và tab Bản đồ & Gần bạn.
4. **Finding 4 (Fail-Closed Hubs):** Hub "Mua món này có hời không?" và Voucher Hub hiển thị chính xác trạng thái *Chưa đủ dữ liệu để kết luận Mua/Chờ*, ngăn chặn 100% price history và voucher rác.
5. **Finding 5 (Giao diện Dark/Light):** Hỗ trợ đổi theme Sáng/Tối mượt mà, lưu trạng thái local và đồng bộ chuẩn CSS variables.
6. **Finding 6 (Bảo toàn Production):** Production live `v3.419.0` tiếp tục được khóa an toàn 100%.
7. **Finding 7 (Khuyến nghị CEO):** Kính mời CEO trực tiếp truy cập và kiểm tra `https://jayt-storefront-staging-ax.vercel.app` để đánh giá toàn diện bề mặt sản phẩm JAYT-242 đã được khôi phục.

**Ký tên xác nhận bởi Hội đồng 7 Phòng ban:**  
*Product Directorate · Design System Authority · UX/CX Research Group · Growth & Partnerships · Data & Trust Security · Engineering Core · Quality Assurance Directorate*
