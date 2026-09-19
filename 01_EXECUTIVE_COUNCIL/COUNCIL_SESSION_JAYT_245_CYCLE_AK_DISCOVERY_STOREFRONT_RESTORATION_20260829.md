# HỘI ĐỒNG ĐIỀU HÀNH JAYT: BIÊN BẢN HỢP NHẤT KHÔI PHỤC STOREFRONT KHÁM PHÁ & BẢO TOÀN DỮ LIỆU MINH BẠCH (MỤC AK — JAYT-245)

**Thời gian:** 2026-08-29T01:03:00+07:00  
**Địa điểm:** Trực tuyến / Phòng Điều hành JayT  
**Chủ trì:** Hội đồng Điều hành 7 Phòng ban  
**Căn cứ chỉ thị:** [JAYT-245 — Tổng Chỉ Thị CEO Duy Nhất Về Vận Hành Và Go-Live JayT (Mục AK)](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/02_CEO_DIRECTIVES/JAYT-245_TONG_CHI_THI_CEO_DUY_NHAT_VAN_HANH_JAYT.md)  
**Mã nguồn Storefront Khôi Phục (Staging):** [jayt_storefront_staging.js](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/03_SOURCE_OF_TRUTH/jayt_storefront_staging.js)  
**Baseline Production Rollback Hiện Tại:** \`v3.419.0\` ([https://deploy-ten-xi-48.vercel.app](https://deploy-ten-xi-48.vercel.app))  
**Phiên Bản Storefront Khôi Phục Đang Chờ Duyệt:** \`v3.420.0-staging.ak\`  
**Trạng thái Quản trị:** \`AK DISCOVERY STOREFRONT RESTORATION — STAGING READY FOR CEO REVIEW; PRODUCTION v3.419.0 LOCKED AS ROLLBACK\`

---

## 1. Truy Vết Bản Storefront Đã Duyệt & Phân Tích So Với v3.419

Hội đồng đã tiến hành truy vết thiết kế storefront đã được CEO phê duyệt trước đây:
- **Thành phần bị thiếu/lệch ở v3.419:**
  1. Giao diện bị biến thành "bảng kiểm toán dữ liệu" với các khối copy audit lặp lại, đập thẳng vào mắt người dùng các thông số kỹ thuật khô khan.
  2. Các thẻ bài đồng dạng, thiếu phân cấp thị giác giữa nguồn chính thức (Tier 2) và kênh theo dõi (Tier 4).
  3. Thiếu cảm giác "Storefront Khám phá & Mua sắm" hướng dẫn người dùng "Hôm nay làm gì / đi đâu / tiết kiệm gì".
- **Thành phần được khôi phục tại bản Staging v3.420.0-staging.ak:**
  1. **Hero Banner theo thời điểm:** "Hôm nay ở Đà Nẵng có gì đáng khám phá?" tạo cảm hứng, dẫn dắt vào các bộ sưu tập thực tế.
  2. **Phân cấp thị giác 4 tầng rõ rệt:**
     - *Chương trình chính thức (Tier 2):* Card nổi bật, logo thương hiệu tinh tế, CTA "Mở website chính thức ↗", nút "🔍 Kiểm tra nguồn" mở modal chi tiết.
     - *Radar theo dõi (Tier 4):* Card nhẹ nhàng, outline tinh tế, không tranh chấp thị giác với nguồn sẵn dùng.
  3. **Rút gọn mặt trước thẻ:** Đưa toàn bộ các chi tiết kỹ thuật/hash/sha256/thông số capture vào **Modal Kiểm Tra Nguồn (Recheck Source Modal)**, giữ mặt trước thẻ thanh lịch và hữu ích.
  4. **Collections Rail theo ngữ cảnh:** Khám phá công cụ miễn phí, rạp chiếu phim, di chuyển đô thị.

---

## 2. Đề Xuất & Phản Biện Của 7 Phòng Ban (Mục AK)

| Phòng Ban | Lãnh Đạo Phụ Trách | Đề Xuất Của Bộ Phận | Phản Biện & Kiểm Soát Quản Trị |
|---|---|---|---|
| **Product Directorate** | Chief Product Officer | Khôi phục nhịp điệu Storefront giúp người dùng dễ dàng ra quyết định tiết kiệm/trải nghiệm. | **Tuyệt đối không mang claim giá/voucher cũ không có provenance trở lại.** Chỉ dùng 9 nguồn chính thức + 8 radar thật. |
| **Design System Authority** | Head of Design | Xây dựng card phân cấp 4 tầng với vector badges và typography chuẩn storefront hiện đại. | **Không dùng hình ảnh minh họa giả mạo.** Chỉ dùng vector trừu tượng / typography thương hiệu thật. |
| **UX/CX Research Group** | UX/CX Lead | Tối ưu 5 hành trình người dùng: Mở trang, Chọn nhu cầu, Tìm kiếm tức thì, Lưu bookmark, Kiểm tra nguồn gốc. | **Modal Recheck Source phải fail-closed**, có focus trap và đóng bằng phím Escape mượt mà. |
| **Growth & Partnerships** | Head of Growth | Đảm bảo tính hấp dẫn để thu hút sinh viên và người dân Đà Nẵng quay lại mỗi ngày. | **Đo lường bằng giá trị thực tế và độ tin cậy**, không tối ưu số lượng thẻ rỗng hay click mồi. |
| **Data & Trust Security** | Chief Data Officer | Giữ toàn bộ 100% dữ liệu binding và provenance manifest trong modal Recheck Source. | **Không có dữ liệu staging nào được lọt ra feed chính** nếu chưa có raw bytes và per-field contract. |
| **Engineering Core** | Chief Architect | Dựng bản Storefront khôi phục trên staging riêng (`jayt_storefront_staging.js`), giữ nguyên `v3.419.0` làm rollback. | **Không deploy production trước khi CEO kiểm tra và duyệt trực tiếp.** |
| **Quality Assurance** | QA Director | Xây dựng bộ test tự động kiểm tra đầy đủ 5 hành trình người dùng trên bản staging. | **Tất cả 5 user journeys phải đạt 100% PASS** trước khi trình CEO duyệt. |

---

## 3. Kết Quả Kiểm Thử 5 Hành Trình Người Dùng Trên Staging

1. **Hành trình 1 (Mở trang & Nhận diện phân cấp):** Hero banner và thẻ bài phân cấp 4 tầng hiển thị hoàn hảo $	o$ **PASS**.
2. **Hành trình 2 (Lọc theo nhu cầu & tầng):** Quick Filter Chips và Tier filter hoạt động tức thì $	o$ **PASS**.
3. **Hành trình 3 (Tìm kiếm theo từ khóa):** Thanh tìm kiếm phản hồi mượt mà, lọc chính xác theo từ khóa $	o$ **PASS**.
4. **Hành trình 4 (Lưu cục bộ & Quản lý bookmark):** LocalStorage và bộ đếm tab "Đã lưu" đồng bộ 100% $	o$ **PASS**.
5. **Hành trình 5 (Kiểm tra nguồn & Focus trap):** Modal "Hồ Sơ Chứng Nhận Nguồn Gốc" hiển thị minh bạch 100% thông tin đối soát, hỗ trợ phím Escape $	o$ **PASS**.

---

## 4. Cam Kết Quản Trị & Đề Xuất Trình CEO

1. **Khóa Production Baseline Rollback:** Giữ nguyên phiên bản `v3.419.0` đang chạy an toàn trên Vercel Production.
2. **Kính Trình CEO Kiểm Tra Bản Staging:** Kính mời CEO kiểm tra trực tiếp mã nguồn và thiết kế Storefront khôi phục (`jayt_storefront_staging.js`) trước khi thực hiện deploy chính thức.

**Ký tên xác nhận bởi Hội đồng 7 Phòng ban:**  
*Product Directorate · Design System Authority · UX/CX Research Group · Growth & Partnerships · Data & Trust Security · Engineering Core · Quality Assurance Directorate*
