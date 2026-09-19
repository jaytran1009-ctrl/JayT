# HỘI ĐỒNG ĐIỀU HÀNH JAYT: NGHỊ QUYẾT TỔNG LỰC TRIỂN KHAI JAYT-245

**Thời gian:** 2026-08-28T23:15:00+07:00  
**Địa điểm:** Trực tuyến / Phòng Điều hành JayT  
**Chủ trì:** Hội đồng Điều hành 7 Phòng ban  
**Căn cứ chỉ thị:** [JAYT-245 — Tổng Chỉ Thị CEO Duy Nhất Về Vận Hành Và Go-Live JayT (Mục I & Mục K)](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/02_CEO_DIRECTIVES/JAYT-245_TONG_CHI_THI_CEO_DUY_NHAT_VAN_HANH_JAYT.md)  
**Trạng thái Quản trị:** `ĐANG LÀM — TỔNG LỰC, KHÔNG PHÁT HÀNH GO-LIVE ĐẦY ĐỦ`

---

## 1. Tiếp Nhận Quyết Nghị & Phân Công Nhiệm Vụ 7 Phòng Ban

| Phòng Ban | Trưởng Bộ Phận | Nhiệm Vụ Tổng Lực Thi Hành (Section K) |
|---|---|---|
| **Product** | Product Lead | - Quản trị cơ cấu danh mục mục tiêu 50 mục hữu ích/ngày: T1 (3–8), T2 (8–12), T3 (15–20), T4 (10–20).<br>- Giữ nghiêm kỷ luật danh xưng: Tuyệt đối không dùng từ "50 deal", chỉ T1 đủ bằng chứng mới gọi là "Deal xác minh". |
| **Design** | Design Authority | - Giám sát giao diện 4 hành trình: hiển thị minh bạch ranh giới từng tầng (T1/T2/T3/T4), lý do tin cậy, trạng thái recheck.<br>- Bảo đảm 100% chuẩn màu WCAG 2.1 AA (tỷ lệ tương phản >= 4.5:1). |
| **UX/CX** | UX Researcher | - Đo lường trải nghiệm 6 persona thực tế tại Đà Nẵng.<br>- Kiểm tra tương tác thuần bàn phím (Tab, Enter, phím Escape đóng modal) và bố cục phóng to 200% không tràn thanh cuộn ngang.<br>- Đảm bảo form báo tín hiệu cộng đồng hoạt động cục bộ, không gửi dữ liệu người dùng ra bên thứ ba. |
| **Data & Trust** | Chief Data Officer | - Triển khai luồng thu thập raw capture gốc theo chiều xuôi: chụp response body thật, HAR network trace kèm timestamp thật, URL/redirect chain, HTTP metadata và hash tính trước khi chuẩn hóa.<br>- Giữ cổng M2 bị chặn cho đến khi hoàn tất chứng từ thu thập độc lập. |
| **Growth & Partner** | Growth Lead | - Khảo sát nhu cầu cộng đồng tại 4 cụm địa bàn Đà Nẵng (Liên Chiểu, Ngũ Hành Sơn, Hải Châu/Thanh Khê/Sơn Trà, Nguồn toàn quốc).<br>- Giữ M3 ở trạng thái Kế hoạch Nghiên cứu (RESEARCH_PLAN_ONLY): 0 link affiliate, 0 chiến dịch, 0 CTA thương mại. |
| **Engineering** | Chief Architect | - Duy trì baseline an toàn v3.403.0 trên production.<br>- Quét đệ quy allowlist đồng bộ, chặn 100% route feed cũ và raw artefact cũ (HTTP 404).<br>- Bảo đảm version parity đồng bộ tuyệt đối trên toàn bộ entrypoint, Service Worker và live DOM. |
| **QA Directorate** | QA Director | - Xây dựng bộ test gate tự động kiểm tra đệ quy version parity, semantic binding và accessibility.<br>- Thực hiện kiểm tra ngẫu nhiên tối thiểu 20% ứng viên trước khi đề xuất công bố. |

---

## 2. Kế Hoạch Vận Hành Staging 50 Mục Hữu Ích/Ngày

- **Địa bàn 1 — Liên Chiểu / Hòa Khánh (14 mục):** Căn tin DUT, quán cơm sinh viên Tôn Đức Thắng, in ấn giáo trình, xe buýt trợ giá, cà phê học bài 24/7, nhà sách Fahasa, phụ kiện KTX.
- **Địa bàn 2 — Ngũ Hành Sơn / An Thượng (12 mục):** Chợ Bắc Mỹ An (ẩm thực DUE), căn tin DUE Nam Kỳ Khởi Nghĩa, The Coffee House Làng ĐH, phố đi bộ An Thượng, mì Quảng Bà Mua.
- **Địa bàn 3 — Hải Châu / Thanh Khê / Sơn Trà (14 mục):** Bữa trưa văn phòng, rạp chiếu phim (Metiz, CGV), bún bò Thanh Khê, cơm gà Hải Châu, thư viện công cộng Bạch Đằng, chợ đêm Helio, di chuyển TNGO / VNR.
- **Địa bàn 4 — Nguồn chính thức toàn quốc cho Đà Nẵng (10 mục):** GitHub Student Pack, Notion Plus, Spotify Student, Microsoft 365, Figma for Education, AWS Educate, AutoCAD sinh viên, Cổng dịch vụ công Đà Nẵng.

---

## 3. Cổng An Toàn & Cam Kết Quản Trị

1. **Không Tự Công Bố Go-Live:** Dự án giữ nguyên trạng thái `ĐANG TRIỂN KHAI — CHƯA ĐƯỢC CEO NGHIỆM THU GO-LIVE ĐẦY ĐỦ`.
2. **Không Tự Nâng Tier:** Thiếu bằng chứng thì ưu tiên xếp vào Tier 3 (Địa điểm) hoặc Tier 4 (Radar), không nâng lên Tier 1 để đạt chỉ tiêu số lượng.
3. **Kênh Báo Cáo Duy Nhất:** Hội đồng cam kết chỉ nộp một báo cáo tổng hợp tiếng Việt duy nhất mỗi ngày bám sát Tổng chỉ thị JAYT-245.

**Ký tên xác nhận bởi Hội đồng 7 Phòng ban:**  
*Product Directorate · Design System Authority · UX/CX Research Group · Growth & Partnerships · Data & Trust Security · Engineering Core · Quality Assurance Directorate*
