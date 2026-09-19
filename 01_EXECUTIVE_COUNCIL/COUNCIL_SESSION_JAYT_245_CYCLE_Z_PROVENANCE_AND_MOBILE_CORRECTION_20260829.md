# HỘI ĐỒNG ĐIỀU HÀNH JAYT: BIÊN BẢN HỢP NHẤT HIỆU CHỈNH NHÃN BẰNG CHỨNG MOBILE & CÁCH LY LOCALITY CHƯA BINDING (MỤC Z — JAYT-245)

**Thời gian:** 2026-08-29T00:15:00+07:00  
**Địa điểm:** Trực tuyến / Phòng Điều hành JayT  
**Chủ trì:** Hội đồng Điều hành 7 Phòng ban  
**Căn cứ chỉ thị:** [JAYT-245 — Tổng Chỉ Thị CEO Duy Nhất Về Vận Hành Và Go-Live JayT (Mục Z)](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/02_CEO_DIRECTIVES/JAYT-245_TONG_CHI_THI_CEO_DUY_NHAT_VAN_HANH_JAYT.md)  
**Bảng Đối soát Per-Field Provenance:** [per_field_provenance_audit_ledger_20260829.json](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/04_DATA_PIPELINE/per_field_provenance_audit_ledger_20260829.json)  
**Sổ bộ Nguồn cung Phân tầng (v2):** [stratified_supply_ledger_20260829.json](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/04_DATA_PIPELINE/stratified_supply_ledger_20260829.json)  
**Biên nhận Release Parity:** [production_release_receipt_v3412.json](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/07_QUALITY_ASSURANCE/production_release_receipt_v3412.json)  
**Phiên bản Phát hành:** `v3.412.0`  
**Địa chỉ Live:** [https://deploy-ten-xi-48.vercel.app](https://deploy-ten-xi-48.vercel.app)  
**Trạng thái Quản trị:** `P0 EVIDENCE-LABEL/LOCALITY-PROVENANCE CORRECTION — MOBILE CHƯA NGHIỆM THU; M2 KHÔNG MỞ RỘNG PUBLIC; DISCOVERY UX VÀ SUPPLY STAGING TIẾP TỤC TỔNG LỰC`

---

## 1. Báo Cáo Triển Khai Lệnh P0 Của 7 Phòng Ban (Mục Z)

| Phòng Ban | Trưởng Bộ Phận | Kết Quả Thực Thi Chu Kỳ Mục Z |
|---|---|---|
| **QA Directorate** | QA Director | - **Hạ nhãn báo cáo kiểm định mobile:** Đã cập nhật `mobile_viewport_390px_evidence_report.json` thành `KIỂM TRA TĨNH SẴN SÀNG RESPONSIVE (STATIC CODE SCAN)` và đặt trạng thái `CHƯA NGHIỆM THU LIVE MOBILE`.<br>  * Không sử dụng báo cáo này làm căn cứ tuyên bố mobile PASS hay WCAG hoàn tất.<br>  * Ban hành Biên nhận Release Parity `production_release_receipt_v3412.json` xác nhận 10/10 endpoints trên production URL khớp 100% mã băm SHA-256. |
| **Data & Trust** | Chief Data Officer | - **Cách ly toàn bộ locality chưa có raw binding:**<br>  * Rà soát 9 mục Radar: Toàn bộ các địa bàn/quận/địa chỉ chưa có quote raw trong network payload (như Hải Châu, Thanh Khê, Helio,...) đều được hạ thành `Khu vực đang xác minh`.<br>  * Ban hành Bảng đối soát chi tiết từng trường (`per_field_provenance_audit_ledger_20260829.json`).<br>  * Duy trì nguyên tắc: Chỉ có mục `TGT_C4_01` (GitHub Pack) và `TGT_C4_02` (Notion Education) mang phạm vi `Toàn quốc` (chương trình trực tuyến). |
| **Product & UX/CX** | UX/CX Lead | - Cập nhật giao diện `v3.412.0`: Hiển thị đúng thông tin locality đã cách ly, tiếp tục tối ưu hóa Discovery Shell, collections rail, bookmark cục bộ và form Báo nguồn. |
| **Engineering & Architecture** | Chief Architect | - Đồng bộ mã nguồn `v3.412.0` qua SOT, deploy, deploy/public; deploy thành công lên Vercel Production. |
| **Growth & M3** | Growth Lead | - Duy trì M3 ở trạng thái Kế hoạch Nghiên cứu (RESEARCH_PLAN_ONLY); 0 link affiliate, 0 chiến dịch, 0 CTA thương mại. |

---

## 2. Bảng Đối Soát Chi Tiết Per-Field Provenance (10 Mục)

| Target ID | Thương Hiệu / Chương Trình | Danh Mục | Phạm Vi Khu Vực (Locality) | Trạng Thái Per-Field Provenance | Tầng Dữ Liệu (Layer) |
|---|---|---|---|---|:---:|
| **TGT_C4_01** | GitHub Education | Học tập | Toàn quốc | Đã đối soát 4 trường atomic nguyên văn | **Làn 2 (Chính thức)** |
| **TGT_C1_01** | Metiz Cinema | Phim | *Khu vực đang xác minh* | Title khớp quote raw; địa bàn cụ thể chưa bind | **Làn 4 (Radar)** |
| **TGT_C1_03** | DanaBus | Đi lại | *Khu vực đang xác minh* | Title khớp quote raw; phát hiện clock skew | **Làn 4 (Radar)** |
| **TGT_C1_04** | TNGO | Đi lại | *Khu vực đang xác minh* | Title khớp quote raw; danh sách trạm chưa bind | **Làn 4 (Radar)** |
| **TGT_C1_08** | Fahasa | Học tập | *Khu vực đang xác minh* | Title khớp quote raw; chi nhánh cụ thể chưa bind | **Làn 4 (Radar)** |
| **TGT_C2_01** | Galaxy Cinema | Phim | *Khu vực đang xác minh* | Title khớp quote raw; rạp cụ thể chưa bind | **Làn 4 (Radar)** |
| **TGT_C3_01** | Domino's Pizza | Ăn trưa | *Khu vực đang xác minh* | Title khớp quote raw; cửa hàng cụ thể chưa bind | **Làn 4 (Radar)** |
| **TGT_C3_04** | CGV Cinemas | Phim | *Khu vực đang xác minh* | Title khớp quote raw; rạp cụ thể chưa bind | **Làn 4 (Radar)** |
| **TGT_C3_05** | Đường Sắt Việt Nam (VNR) | Đi lại | *Khu vực đang xác minh* | Title khớp quote raw; ga cụ thể chưa bind | **Làn 4 (Radar)** |
| **TGT_C4_02** | Notion | Học tập | Toàn quốc | Title khớp quote raw; gói online toàn quốc | **Làn 4 (Radar)** |

---

## 3. Cổng An Toàn & Cam Kết Quản Trị

1. **Tuyệt Đối Không Gán Locality Suy Diễn:** Mọi địa bàn/quận/địa chỉ nếu không xuất hiện nguyên văn trong raw capture đều bị hạ thành "Khu vực đang xác minh".
2. **Không Tuyên Bố Bằng Chứng Mobile Khi Chưa Có Browser Live:** Phân định rõ giữa Static Code Scan và Live Device/Browser Run.

**Ký tên xác nhận bởi Hội đồng 7 Phòng ban:**  
*Product Directorate · Design System Authority · UX/CX Research Group · Growth & Partnerships · Data & Trust Security · Engineering Core · Quality Assurance Directorate*
