# HỘI ĐỒNG ĐIỀU HÀNH JAYT: BIÊN BẢN HỢP NHẤT TỔNG LỆNH 72 GIỜ XÂY DỰNG 50 CƠ HỘI PHÂN TẦNG & TRẢI NGHIỆM KHÁM PHÁ (MỤC AA — JAYT-245)

**Thời gian:** 2026-08-29T00:17:00+07:00  
**Địa điểm:** Trực tuyến / Phòng Điều hành Hợp nhất JayT  
**Chủ trì:** Hội đồng Điều hành 7 Phòng ban  
**Căn cứ chỉ thị:** [JAYT-245 — Tổng Chỉ Thị CEO Duy Nhất Về Vận Hành Và Go-Live JayT (Mục AA)](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/02_CEO_DIRECTIVES/JAYT-245_TONG_CHI_THI_CEO_DUY_NHAT_VAN_HANH_JAYT.md)  
**Kế hoạch Hàng đợi 50 Candidate:** [staging_50_stratified_candidates_queue.json](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/04_DATA_PIPELINE/staging_50_stratified_candidates_queue.json)  
**Danh mục Affiliate JTBD Read-Only:** [affiliate_jtbd_catalog_mapping_readonly.json](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/04_DATA_PIPELINE/affiliate_jtbd_catalog_mapping_readonly.json)  
**Phiên bản Baseline Live:** `v3.412.0`  
**Địa chỉ Live:** [https://deploy-ten-xi-48.vercel.app](https://deploy-ten-xi-48.vercel.app)  
**Trạng thái Quản trị:** `V3.412 LOCALITY CORRECTION ĐẠT HẸP; TỔNG LỰC 72 GIỜ XÂY 50 CƠ HỘI PHÂN TẦNG/NGÀY, UX KHÁM PHÁ HỮU ÍCH, KHÔNG BỊA DEAL`

---

## 1. Báo Cáo Triển Khai Kế Hoạch 72 Giờ Của 7 Phòng Ban (Mục AA)

| Phòng Ban | Trưởng Bộ Phận | Kế Hoạch Triển Khai 72 Giờ & Trách Nhiệm Phối Hợp |
|---|---|---|
| **Data & Trust** | Chief Data Officer | - Thiết lập Hàng đợi 50 Mục Staging (`staging_50_stratified_candidates_queue.json`) phủ đủ Ma trận Nhu cầu (Ăn trưa, Học tập, Đi lại, Phim, Làm việc) × Khung giờ × Quận/Khu vực Đà Nẵng.<br>  - Thu thập raw network capture xuôi chiều và per-field binding từng mục. Nếu thiếu giá/điều kiện thì phân vào Làn B/C/D, tuyệt đối không bịa thông tin để ép thành Deal. |
| **Product & Growth** | Product & Growth Leads | - Giám sát cấu trúc 50 cơ hội phân tầng hàng ngày: Làn A (3–8 deal), Làn B (12–16 chương trình official), Làn C (14–18 địa điểm/tiện ích), Làn D (10–14 Radar theo dõi).<br>  - Tuyệt đối không quảng bá là "50 Deal", mà định vị đúng là **50 cơ hội/tiện ích phân tầng**. |
| **Design & UX/CX** | Design System & UX Leads | - Hoàn thiện trải nghiệm Discovery Shell: Các bộ sưu tập "Hôm nay ở Đà Nẵng", "Gần bạn", "Gói học tập & bản quyền", "Ăn trưa sinh viên", "Di chuyển đô thị"; tính năng Lưu (Saved) cục bộ, bộ lọc tức thì, trạng thái rỗng hữu ích, và nút CTA an toàn. |
| **Engineering & Architecture** | Chief Architect | - Xây dựng generic candidate-to-public pipeline; đảm bảo mọi trường dữ liệu chưa bind đều hiển thị disclosure rõ ràng; duy trì Strict Public Allowlist và Release Parity. |
| **QA Directorate** | QA Director | - Thực hiện kiểm tra độc lập mẫu tối thiểu 20% trên raw artifacts, crawl 34 routes deny, kiểm thử regression modal và browser desktop/mobile thật. |
| **Affiliate Value-First** | Growth & M3 Lead | - Lập Danh mục AccessTrade Catalog theo Job-to-be-done (`affiliate_jtbd_catalog_mapping_readonly.json`) ở chế độ **Read-Only** (0 tracking link, 0 campaign, 0 CTA thương mại). |

---

## 2. Phân Bổ 50 Cơ Hội Phân Tầng Trong Kế Hoạch 72 Giờ

| Làn Phân Tầng | Chỉ Tiêu Phân Bổ | Trạng Thái Hiện Tại | Yêu Cầu Chứng Từ Bắt Buộc Trước Khi Promotion |
|---|:---:|:---:|---|
| **Làn A — Deal xác minh** | **3 – 8** | 5 candidates (Staging) | Bắt buộc đủ 4 trường: Giá niêm yết/thực trả, Điều kiện áp dụng, Scope cơ sở, Hạn kiểm tra. Thiếu 1 trường $ightarrow$ Chuyển về Làn D. |
| **Làn B — Chương trình chính thức** | **12 – 16** | 15 candidates (1 Live + 14 Staging) | Landing page official, 4 atomic claims nguyên văn, minh bạch phạm vi (Toàn quốc/Sinh viên), không suy diễn giá thực trả. |
| **Làn C — Địa điểm / Tiện ích xác minh** | **14 – 18** | 16 candidates (Staging) | Địa điểm thực tế tại Đà Nẵng, cơ sở vật chất, địa chỉ có thật; tuyệt đối không gắn khuyến mãi/voucher ảo. |
| **Làn D — Radar đáng theo dõi** | **10 – 14** | 14 candidates (9 Live + 5 Staging) | Nhu cầu và nguồn theo dõi; dùng copy "đang theo dõi", tuyệt đối 0 giá/voucher/CTA thương mại; locality chưa bind là "Khu vực đang xác minh". |

---

## 3. Cổng An Toàn & Cam Kết Quản Trị

1. **Cam Kết Tuyệt Đối Về Provenance:** Không để áp lực mở rộng 50 mục làm suy giảm tiêu chuẩn trung thực; từng mục chỉ được thăng hạng khi có đầy đủ chứng từ raw capture tương ứng.
2. **Cam Kết Trải Nghiệm Khám Phá Địa Phương:** JayT mang lại giá trị thật mỗi ngày cho người dân và sinh viên Đà Nẵng với trải nghiệm mượt mà, minh bạch, và an toàn.

**Ký tên xác nhận bởi Hội đồng 7 Phòng ban:**  
*Product Directorate · Design System Authority · UX/CX Research Group · Growth & Partnerships · Data & Trust Security · Engineering Core · Quality Assurance Directorate*
