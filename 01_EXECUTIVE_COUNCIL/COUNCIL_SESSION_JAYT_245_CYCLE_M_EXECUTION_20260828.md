# HỘI ĐỒNG ĐIỀU HÀNH JAYT: NGHỊ QUYẾT TRIỂN KHAI THU THẬP CAPTURE GỐC CHIỀU XUÔI (MỤC M — JAYT-245)

**Thời gian:** 2026-08-28T23:55:00+07:00  
**Địa điểm:** Trực tuyến / Phòng Điều hành JayT  
**Chủ trì:** Hội đồng Điều hành 7 Phòng ban  
**Căn cứ chỉ thị:** [JAYT-245 — Tổng Chỉ Thị CEO Duy Nhất Về Vận Hành Và Go-Live JayT (Mục M)](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/02_CEO_DIRECTIVES/JAYT-245_TONG_CHI_THI_CEO_DUY_NHAT_VAN_HANH_JAYT.md)  
**Trạng thái Quản trị:** `ĐANG LÀM — THU THẬP CAPTURE GỐC CHIỀU XUÔI TRONG STAGING; M2 BỊ CHẶN; M3 NO-LINK; GO-LIVE ĐẦY ĐỦ CHƯA ĐƯỢC NGHIỆM THU`

---

## 1. Báo Cáo Triển Khai Nhiệm Vụ 7 Phòng Ban (Mục M)

| Phòng Ban | Trưởng Bộ Phận | Kết Quả Thực Thi Chu Kỳ Mục M |
|---|---|---|
| **Data & Trust** | Chief Data Officer | - Triển khai luồng thu thập **raw capture gốc theo chiều xuôi** tại `content_pipeline/staging_candidates/raw_captures_forward/`.<br>- Thu thập thành công 10/10 target ứng viên mẫu (tỷ lệ lấy mẫu 20% trên tổng 50 candidate).<br>- Lưu trữ đầy đủ: raw response body, HTTP status, headers, URL gốc, timestamp thực tế tại thời điểm tải và mã băm SHA-256 tính trước khi chuẩn hóa.<br>- Không tạo dữ liệu mô phỏng, không backfill timestamp. |
| **QA Directorate** | QA Director | - Thực hiện kiểm toán độc lập 10/10 tệp raw capture gốc trên đĩa qua `forward_raw_capture_pilot_qa_report.json`.<br>- Tính toán lại động 10/10 mã SHA-256 từ tệp vật lý: 100% khớp tuyệt đối với biên nhận metadata.<br>- Duy trì kiểm tra đệ quy: zero archive exposure, zero dormant affiliate surface. |
| **Product** | Product Lead | - Duy trì 50 candidate trong `staging_50_unassessed_target_inventory.json` ở trạng thái `UNASSESSED_CANDIDATE` / `PENDING_AUTHENTIC_RAW_CAPTURE`.<br>- Tuyệt đối không tự gán T1/T2/T3, không gán giá/ưu đãi khi chưa hoàn tất toàn bộ chuỗi chứng minh. |
| **Design & UX/CX** | Design Authority & UX Lead | - Duy trì giao diện 4 hành trình trên live `v3.404.0`: WCAG 2.1 AA (14/14 cặp màu >= 4.5:1), vết 18 bước bàn phím với phím Escape đóng modal, zoom 200% không tràn ngang.<br>- Sẵn sàng bằng chứng tương tác live phục vụ thẩm định của CEO. |
| **Engineering** | Chief Architect | - Duy trì bản deploy production `v3.404.0` sạch sẽ trên Vercel.<br>- Xác nhận 100% các route cách ly (staging inventories, raw captures, four_layer_dataset, archive cũ) trả HTTP 404 Deny. |
| **Growth & M3** | Growth Lead | - Duy trì M3 ở trạng thái Kế hoạch Nghiên cứu (RESEARCH_PLAN_ONLY); tuyệt đối 0 link affiliate, 0 chiến dịch, 0 CTA thương mại. |

---

## 2. Danh Mục 10 Mẫu Raw Capture Gốc Đã Được QA Thẩm Định

1. `TGT_C1_01` (Metiz Cinema Helio) — Status 200, 53,334 bytes, SHA-256: `43d6f27db16e7912...`
2. `TGT_C1_03` (DanaBus) — Status 301, 148 bytes, SHA-256: `b131a323dbff5194...`
3. `TGT_C1_04` (TNGO Da Nang) — Status 200, 52,968 bytes, SHA-256: `b34fdd823b465060...`
4. `TGT_C1_08` (Fahasa) — Status 301, 520 bytes, SHA-256: `c36afb0711d50c40...`
5. `TGT_C2_01` (Galaxy Cinema) — Status 302, 138 bytes, SHA-256: `753e0dd54f28c4f7...`
6. `TGT_C3_01` (Domino's Pizza) — Status 200, 51,512 bytes, SHA-256: `9f78d30d6740ee63...`
7. `TGT_C3_04` (CGV Cinemas) — Status 200, 5,366 bytes, SHA-256: `d76811f8eb7c72e2...`
8. `TGT_C3_05` (Duong Sat Viet Nam VNR) — Status 200, 27,076 bytes, SHA-256: `46c624a8bc49351d...`
9. `TGT_C4_01` (GitHub Education) — Status 302, 0 bytes, SHA-256: `e3b0c44298fc1c14...`
10. `TGT_C4_02` (Notion Education) — Status 301, 167 bytes, SHA-256: `446a6087825fa73e...`

---

## 3. Cổng An Toàn & Cam Kết Quản Trị

1. **M2 Tiếp Tục Bị Chặn:** Đợt thu thập 10 mẫu raw capture này mới chỉ là bước thí điểm thu thập kỹ thuật trong vùng staging; M2 vẫn bị chặn cho đến khi hoàn thành toàn bộ chuỗi chuẩn hóa bundle, đối chiếu semantic binding claim-to-quote và được CEO trực tiếp nghiệm thu.
2. **M3 Không Mở Rộng Thương Mại:** Tuyệt đối không tạo affiliate link hay CTA thương mại.
3. **Một Kênh Báo Cáo Duy Nhất:** Hội đồng nộp 1 báo cáo tổng hợp tiếng Việt duy nhất bám sát chỉ thị JAYT-245.

**Ký tên xác nhận bởi Hội đồng 7 Phòng ban:**  
*Product Directorate · Design System Authority · UX/CX Research Group · Growth & Partnerships · Data & Trust Security · Engineering Core · Quality Assurance Directorate*
