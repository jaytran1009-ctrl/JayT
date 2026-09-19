# HỘI ĐỒNG ĐIỀU HÀNH JAYT: BIÊN BẢN HỢP NHẤT FIELD-LEVEL MANIFEST & CỔNG KIỂM ĐỊNH ĐỘT BIẾN MUTATION TESTING (MỤC AC — JAYT-245)

**Thời gian:** 2026-08-29T00:24:00+07:00  
**Địa điểm:** Trực tuyến / Phòng Điều hành JayT  
**Chủ trì:** Hội đồng Điều hành 7 Phòng ban  
**Căn cứ chỉ thị:** [JAYT-245 — Tổng Chỉ Thị CEO Duy Nhất Về Vận Hành Và Go-Live JayT (Mục AC)](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/02_CEO_DIRECTIVES/JAYT-245_TONG_CHI_THI_CEO_DUY_NHAT_VAN_HANH_JAYT.md)  
**Field-Level Provenance Manifest:** [public_items_field_provenance_manifest.json](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/04_DATA_PIPELINE/public_items_field_provenance_manifest.json)  
**Hàng Đợi 50 Target Allowlist:** [staging_50_target_research_queue_neutral.json](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/04_DATA_PIPELINE/staging_50_target_research_queue_neutral.json)  
**Thư Mục Raw Evidence Captures:** [raw_evidence_captures](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/04_DATA_PIPELINE/raw_evidence_captures)  
**QA Mutation Testing Gate:** [test_field_level_provenance_and_mutation_gate.js](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/07_QUALITY_ASSURANCE/test_field_level_provenance_and_mutation_gate.js)  
**Phiên bản Baseline Live:** `v3.412.0`  
**Địa chỉ Live:** [https://deploy-ten-xi-48.vercel.app](https://deploy-ten-xi-48.vercel.app)  
**Trạng thái Quản trị:** `AC FIELD-LEVEL PROVENANCE & MUTATION GATE PASSED — BẮT ĐẦU ACQUISITION RAW VÀ FIELD MANIFEST THẬT`

---

## 1. Báo Cáo Triển Khai Lệnh AC Của 7 Phòng Ban (Mục AC)

| Phòng Ban | Trưởng Bộ Phận | Kết Quả Thực Thi Chu Kỳ Mục AC |
|---|---|---|
| **QA Directorate** | QA Director | - **Xây dựng Cổng Kiểm Định Mutation Testing & Field-Level Audit (`test_field_level_provenance_and_mutation_gate.js`):**<br>  * **Loại bỏ hoàn toàn cơ chế blacklist từ khóa đơn giản; thay thế bằng Schema Allowlist + AST Validator**.<br>  * Kiểm toán 4 pha: (1) Schema Allowlist 8-key trên 50 target, (2) Đối soát 60+ individual fields trong Manifest với Raw file và SHA-256 hash, (3) Thử thách 4 bài test đột biến đối kháng (Mutation testing: chèn giá ảo, gán locality bừa bãi, chèn key lạ, xóa hash) $\rightarrow$ **100% bắt được và fail-closed**, (4) Build Graph Isolation không rò rỉ staging. |
| **Data & Trust** | Chief Data Officer | - **Ban hành Field-Level Provenance Manifest (`public_items_field_provenance_manifest.json`):** Khai báo chi tiết per-field cho toàn bộ 10 mục public, gắn liền với tệp raw payload trong `04_DATA_PIPELINE/raw_evidence_captures/`, mã băm SHA-256, URL canonical, timestamp capture và offset nguyên văn.<br>  - **Chuẩn hóa Hàng đợi 50 Target:** Sử dụng ngôn ngữ kiểm tra trung tính ("Xác minh liệu có...", "Thu thập nguồn chính thức về..."); bổ sung `source_discovery_task` cho 16 target Làn C và các target chưa có URL. |
| **Product & UX/CX** | UX/CX Lead | - Đảm bảo nguyên tắc: Mọi dữ liệu hiển thị trên giao diện công khai đều được kiểm soát bởi Manifest và có đối soát chứng từ gốc. Không render bất kỳ trường dữ liệu nào thiếu binding. |
| **Engineering & Architecture** | Chief Architect | - Đảm bảo sự phân lập tuyệt đối giữa môi trường nghiên cứu (staging/discovery) và môi trường phân phối công khai (public production). Duy trì baseline `v3.412.0`. |
| **Affiliate & Growth** | Growth Lead | - Tiếp tục duy trì công bố minh bạch `PORTAL_ACCESS_NOT_VERIFIED` cho đến khi có phiên truy cập portal hợp lệ được ủy quyền độc lập; 0 link affiliate, 0 campaign. |

---

## 2. Kết Quả Kiểm Thử Bộ Đột Biến Đối Kháng (Mutation Testing Suite)

| Mã Đột Biến | Loại Tấn Công / Sai Lệch Thử Nghiệm | Kỳ Vọng Kiểm Thử | Kết Quả Thực Tế | Trạng Thái Cổng |
|---|---|---|---|:---:|
| **MUT_01** | Chèn giá tiền giả định vào Radar item | Bắt buộc Fail-Closed | Đã phát hiện và chặn đứng | **PASS (Fail-Closed)** |
| **MUT_02** | Gán locality "Hải Châu" vào Radar chưa có quote | Bắt buộc Fail-Closed | Đã phát hiện và chặn đứng | **PASS (Fail-Closed)** |
| **MUT_03** | Chèn key ngoài schema vào Target Queue | Bắt buộc Fail-Closed | Đã phát hiện và chặn đứng | **PASS (Fail-Closed)** |
| **MUT_04** | Xóa hoặc làm sai lệch mã băm SHA-256 trong Manifest | Bắt buộc Fail-Closed | Đã phát hiện và chặn đứng | **PASS (Fail-Closed)** |

---

## 3. Cổng An Toàn & Cam Kết Quản Trị

1. **Cam Kết Kiểm Định Theo Từng Trường (Field-Level Provenance):** Mọi trường dữ liệu đưa lên UI đều phải được ghi nhận trong Manifest kèm mã băm SHA-256 của file raw capture gốc.
2. **Cam Kết Thu Thập Raw Capture Thật:** Bắt đầu quy trình thu thập raw capture cho 15 mục Làn B và 16 mục Làn C theo đúng lộ trình 72 giờ đã phê duyệt.

**Ký tên xác nhận bởi Hội đồng 7 Phòng ban:**  
*Product Directorate · Design System Authority · UX/CX Research Group · Growth & Partnerships · Data & Trust Security · Engineering Core · Quality Assurance Directorate*
