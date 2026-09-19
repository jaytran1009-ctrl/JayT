# BẢN CÔNG BỐ PHÁT HÀNH JAYT-212: 100% VISUAL CARD & PROMOTION DETAIL MANDATE

**Mã Chỉ thị / Work Order:** `JAYT-212`  
**Phiên bản hệ thống:** `100% Visual OS 3.352` (`v3.352.0`)  
**Môi trường:** Live Vercel Production (`https://deploy-ten-xi-48.vercel.app/`)  
**Ngày phát hành:** 27/08/2026  
**Trạng thái phê duyệt:** `IMPLEMENTED_PENDING_CEO_AUDIT`

---

## 1. TỔNG QUAN NÂNG CẤP VÀ CHUẨN THỰC THI 100% VISUAL
Thực thi toàn diện chỉ thị của CEO về **Chuẩn hình ảnh 100% Visual Card & Promotion Detail Mandate**:
- **100% Card có Visual**: Loại bỏ hoàn toàn card chữ trần. Mọi card (🟢, 🔵, 🟣, 🟠, ⚪) đều có khung visual tỉ lệ 16:9 sắc nét, sang trọng, mang gradient nhận diện thương hiệu và monogram dập nổi.
- **100% Detail Sheet có Visual**: Mọi lần bấm vào card đều mở ra hồ sơ ưu đãi trực quan gồm **Hero Visual 16:9 lớn** và **Visual Gallery 1–5 mục** (Nhận diện brand, Claim đối soát, Khóa bằng chứng SHA-256, Phạm vi áp dụng).
- **8 Khối cấu trúc bắt buộc của Detail Sheet**:
  1. Hero visual 16:9 nhận diện thương hiệu.
  2. Visual gallery 1–5 mục trực quan.
  3. Khối "Ưu đãi này là gì?" (Trích nguyên văn nguồn & phân tích ngữ nghĩa trung thực).
  4. Khối "Cách nhận & kiểm tra tại nguồn" (Hướng dẫn 4 bước 10 giây).
  5. Điều kiện, thời điểm kiểm tra và phạm vi áp dụng.
  6. Nút mở nguồn chính thức (`Mở Nguồn Gốc Ưu Đãi ↗`).
  7. Khối "Nguồn hình ảnh & dữ liệu" (URL nguồn, thời gian, trạng thái quyền, nút báo thay đổi).
  8. Khối Kỷ luật minh bạch (Trung thực, không bịa đặt banner deal ảo).

---

## 2. BẢNG PHÂN LOẠI 3 LOẠI VISUAL ĐƯỢC PHÉP (TAXONOMY & LADDER)
| Loại Visual | Tiêu Chí Bắt Buộc | Trường Hợp Sử Dụng | Nhãn Hiển Thị / Provenance |
| :--- | :--- | :--- | :--- |
| **`EXACT_PROMOTION_VISUAL`** | Banner/poster chính thức đúng chương trình, có source URL, SHA-256, căn cứ quyền. | Deal 🟢 đã đối soát | `Ảnh khuyến mãi từ nguồn chính thức` |
| **`EXACT_VENUE_VISUAL`** | Ảnh đúng thương hiệu, đúng chi nhánh tại Đà Nẵng, có chứng minh quan hệ cơ sở. | Địa điểm 🟢 đã xác minh | `Ảnh cơ sở chính xác tại Đà Nẵng` |
| **`OFFICIAL_IDENTITY_VISUAL`** | Logo, monogram, canvas nhận diện thương hiệu cao cấp kèm nút mở nguồn. | Ưu đãi 🔵, Nguồn 🟣, Radar ⚪ | `Nhận diện thương hiệu — chưa có ảnh ưu đãi được cấp quyền` |
