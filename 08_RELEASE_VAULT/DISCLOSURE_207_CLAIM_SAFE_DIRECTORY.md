# DISCLOSURE BATCH 207: CLAIM-SAFE SOURCE DIRECTORY

**Mã Batch:** `JAYT-207`  
**Ngày phát hành:** 27/08/2026  
**Mục tiêu:** Thực thi toàn diện Chỉ thị CEO JAYT-207: (1) Khắc phục triệt để tình trạng "source-bound nhưng chưa claim-safe", vô hiệu hóa toàn bộ claim tự biên soạn (giá, %, điều kiện, chi nhánh, trải nghiệm); (2) Thiết lập cấu trúc hiển thị thuần khiết 3 lớp (Tên nguồn chính thức, Trích đoạn nguyên văn artifact, Nút Mở nguồn gốc + timestamp + TTL); (3) Tái phân loại 25 card theo đúng nội dung quote thực tế (3 🔵 Ưu đãi chính thức + 22 🟣 Nguồn chính thức đã ghi nhận); (4) Thiết lập hệ thống kiểm soát Claim-Ledger 1-1 trên Live Production.

---

## 1. NGUYÊN TẮC CẤU TRÚC 3 LỚP DỮ LIỆU CLAIM-SAFE

Mỗi card trên giao diện chỉ hiển thị đúng 3 lớp dữ liệu nguyên bản:
1. **Tên nguồn / trang chính thức:** Trích xuất từ title trang hoặc tên thương hiệu trong artifact.
2. **Trích đoạn nguyên văn:** Hiển thị chính xác chuỗi ký tự capture từ artifact nguồn, cấm viết lại thành giá/điều kiện/địa điểm mới.
3. **Nút Mở nguồn gốc:** Liên kết trực tiếp tới `source_url`, kèm ngày capture và TTL.

---

## 2. PHÂN LOẠI 25 CARD THEO CLAIM-LEDGER THỰC TẾ

| Phân loại | Số lượng | Tiêu chí phân loại | Danh sách thực tế |
| :---: | :---: | :--- | :--- |
| 🟢 **Dùng ngay tại Đà Nẵng** | **0** | Đủ 5 mảnh chứng từ nguyên văn | Báo cáo trung thực 0 🟢 |
| 🔵 **Ưu đãi chính thức** | **3** | Quote trực tiếp chứa câu ưu đãi / khuyến mãi / miễn phí | 1. Metiz Cinema (`QUÀ MỪNG LÊN HẠNG - ƯU ĐÃI THÀNH VIÊN METIZ 2026`)<br>2. Starlight Cinema (`Các Ưu Đãi Khi Xem Phim Tại Rạp Phim Starlight`)<br>3. Microsoft Education (`Microsoft Office 365 miễn phí dành cho trường học`) |
| 🟣 **Nguồn chính thức đã ghi nhận** | **22** | Quote chứng minh trang thương hiệu, địa điểm hoặc cổng dịch vụ | 4. Galaxy Cinema Đà Nẵng<br>5. Galaxy Cinema Hệ Thống<br>6. Dookki Vietnam<br>7. KFC Vietnam<br>8. Highlands Coffee<br>9. Kichi-Kichi<br>10. Gogi House<br>11. Da Nang Mikazuki<br>12. Spotify Vietnam<br>13. Notion for Education<br>14. Figma for Education<br>15. AWS Educate<br>16. Tableau for Students<br>17. Autodesk Education<br>18. DanaBus Đà Nẵng<br>19. TNGo Đà Nẵng<br>20. Thư Viện KHTH Đà Nẵng<br>21. Bảo Tàng Điêu Khắc Chăm<br>22. Bảo Tàng Lịch Sử Đà Nẵng<br>23. Danh Thắng Ngũ Hành Sơn<br>24. Cung Thiếu Nhi Đà Nẵng<br>25. Cổng Dịch Vụ Công Đà Nẵng |
| 🎯 **TỔNG CỘNG** | **25** | **100% Claim-Safe, Zero Editorial Overclaim** | **Khớp 1-1 với `CLAIM_LEDGER_207.json`** |

---

## 3. KẾT QUẢ KIỂM THỬ ĐỐI KHÁNG VÀ CHỨNG NHẬN 3 CỔNG PRODUCTION

- **Kiểm thử đối kháng (`test_claim_safe_directory_207.js`):** `5/5 PASS` (1-to-1 Claim-Ledger audit, zero synthetic claim, 100% physical artifact quote grounding).
- **Chứng nhận 3 Cổng Vercel Production (`certify_claim_safe_207.js`):**
  - **Gate 1 (Hash Parity):** Module SHA `06c582a2...` (🟢 PASS), Main JS SHA `97f8234e...` (🟢 PASS).
  - **Gate 2 (Live DOM Puppeteer Assertions):** Headline `"Hôm nay: 0 🟢 · 3 🔵 ưu đãi chính thức · 22 🟣 nguồn chính thức đã ghi nhận"` (🟢 PASS), OS 3.347 rendered.
  - **Gate 3 (Visual Capture):** 3 ảnh chụp thực tế tại Production (`screenshot_207_desktop_light.png`, `screenshot_207_mobile_light.png`, `screenshot_207_mobile_dark.png`).

---
*Bản công bố được lưu trữ vĩnh viễn trong Release Vault JAYT.*
