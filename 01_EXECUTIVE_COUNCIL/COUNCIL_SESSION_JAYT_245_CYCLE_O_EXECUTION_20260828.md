# HỘI ĐỒNG ĐIỀU HÀNH JAYT: NGHỊ QUYẾT TRIỂN KHAI FAIL-CLOSED GATE VÀ SEMANTIC BINDING (MỤC O — JAYT-245)

**Thời gian:** 2026-08-28T23:59:59+07:00  
**Địa điểm:** Trực tuyến / Phòng Điều hành JayT  
**Chủ trì:** Hội đồng Điều hành 7 Phòng ban  
**Căn cứ chỉ thị:** [JAYT-245 — Tổng Chỉ Thị CEO Duy Nhất Về Vận Hành Và Go-Live JayT (Mục O)](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/02_CEO_DIRECTIVES/JAYT-245_TONG_CHI_THI_CEO_DUY_NHAT_VAN_HANH_JAYT.md)  
**Trạng thái Quản trị:** `COLLECTOR V2.1 ĐÃ ĐƯỢC KIỂM TRA HẸP; DỮ LIỆU CHỈ Ở STAGING — M2 BỊ CHẶN, M3 NO-LINK, GO-LIVE CHƯA NGHIỆM THU`

---

## 1. Báo Cáo Triển Khai Nhiệm Vụ 7 Phòng Ban (Mục O)

| Phòng Ban | Trưởng Bộ Phận | Kết Quả Thực Thi Chu Kỳ Mục O |
|---|---|---|
| **Data & Trust** | Chief Data Officer | - **Xử lý Anomaly DanaBus:** Đo lường chính xác server-date lệch +205s; ban hành `ANOMALY_RECEIPT_TGT_C1_03_DANABUS_CLOCK_SKEW.json`; loại khỏi nhóm Semantic Ready.<br>- **Đóng băng Target-URL Mapping:** Ban hành `staging_target_url_frozen_manifest.json` (SHA-256: `d99d76fd...`) bảo vệ tính bất biến của 50 liên kết mục tiêu.<br>- **Triển khai Semantic Binding 5 target sạch:** Trích xuất quote nguyên văn thực tế trong raw HTML kèm character start/end offsets chính xác, điều kiện, scope địa bàn và hạn recheck. |
| **QA Directorate** | QA Director | - **Xây dựng Gate Bền Vững trong Repo:** Thiết lập `07_QUALITY_ASSURANCE/test_fail_closed_raw_capture_and_clock_skew_gate.js`.<br>- Kiểm tra tự động tính toàn vẹn hash, chuỗi redirect, body khác rỗng, phát hiện lệch đồng hồ > 60s và chặn mục anomaly khỏi cổng semantic. |
| **Product** | Product Lead | - Duy trì 50 candidate trong `staging_50_unassessed_target_inventory.json` ở trạng thái `UNASSESSED_CANDIDATE`.<br>- Không tự gán tier T1/T2/T3 hay công bố claim khi chưa được CEO phê duyệt. |
| **Design & UX/CX** | Design Authority & UX Lead | - Duy trì baseline an toàn `v3.404.0` trên production: 4 hành trình, WCAG 2.1 AA (14/14 cặp màu >= 4.5:1), vết 18 bước bàn phím và zoom 200% không tràn ngang. |
| **Engineering** | Chief Architect | - Duy trì bản deploy production `v3.404.0` trên Vercel.<br>- Xác nhận 100% các route cách ly và tệp nhạy cảm trả HTTP 404 Deny. |
| **Growth & M3** | Growth Lead | - Duy trì M3 ở trạng thái Kế hoạch Nghiên cứu (RESEARCH_PLAN_ONLY); tuyệt đối 0 link affiliate, 0 chiến dịch, 0 CTA thương mại. |

---

## 2. Danh Mục 5 Hồ Sơ Semantic Binding Thí Điểm Trong Staging

1. `TGT_C1_01` (Metiz Cinema Helio) — Offsets: `[435, 477]`, Quote: `Metiz Cinema | Rạp chiếu phim Metiz...`
2. `TGT_C1_04` (TNGO Da Nang) — Offsets: `[138, 164]`, Quote: `TNGo - Xe đạp công nghệ số`
3. `TGT_C3_01` (Domino's Pizza) — Offsets: `[28088, 28148]`, Quote: `Domino's Pizza Việt Nam – Thương Hi...`
4. `TGT_C3_05` (Duong Sat Viet Nam VNR) — Offsets: `[1652, 1712]`, Quote: `Tập đoàn Đường sắt Quốc gia Việt Nam - Bán vé tàu trực tuyến`
5. `TGT_C4_01` (GitHub Education) — Offsets: `[153, 182]`, Quote: `GitHub Student Developer Pack`

---

## 3. Cổng An Toàn & Cam Kết Quản Trị

1. **M2 Tiếp Tục Bị Chặn:** Các hồ sơ semantic binding và raw capture mới chỉ được lưu giữ trong vùng staging/candidate; tuyệt đối không công bố lên production.
2. **M3 Giữ Nguyên No-Link / No-CTA:** Không triển khai bất kỳ liên kết affiliate hay khuyến nghị Mua/Chờ nào.
3. **Một Kênh Báo Cáo Duy Nhất:** Hội đồng nộp 1 báo cáo tổng hợp tiếng Việt duy nhất bám sát chỉ thị JAYT-245.

**Ký tên xác nhận bởi Hội đồng 7 Phòng ban:**  
*Product Directorate · Design System Authority · UX/CX Research Group · Growth & Partnerships · Data & Trust Security · Engineering Core · Quality Assurance Directorate*
