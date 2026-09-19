# 🏛️ JAYT-311 — KẾ HOẠCH MỞ RỘNG NGUỒN CUNG ĐỢT 2 (BATCH 04 INGRESS ROADMAP)

**Người ban hành:** Tổng Giám Đốc (CEO), JayT Corp  
**Căn cứ thẩm quyền:** Chỉ thị JAYT-311 của Chủ Tịch Tập Đoàn  
**Ngày ban hành:** 04/09/2026 (Local: 2026-09-04T13:16:00+07:00)  
**Phạm vi:** Hoạch định nguồn cung công cộng, phi thương mại tại TP. Đà Nẵng  
**Ranh giới an toàn:** Production v3.420.0 duy trì trạng thái đóng băng bất biến; deals feed duy trì `[]`; affiliate/voucher = 0.

---

## I. MỤC TIÊU CHIẾN LƯỢC & NGUYÊN TẮC QUẢN TRỊ

Kế hoạch Mở rộng Nguồn cung Đợt 2 (Batch 04) được ban hành nhằm chuẩn bị dữ liệu xác thực cho giai đoạn mở rộng dung lượng nền tảng một cách có kiểm soát. Toàn bộ quy trình tuân thủ nghiêm ngặt **Evidence Contract v3**:

1. **100% Phi thương mại & Phục vụ Cộng đồng:** Ưu tiên các tiện ích công cộng phục vụ sinh viên, người lao động trẻ và nhân dân tại Đà Nẵng (Y tế, Giáo dục, Không gian xanh & Di chuyển bền vững).
2. **Không dữ liệu tổng hợp / giả định (Zero Synthetic Data):** Mọi thông tin hiển thị phải xuất phát từ trang lá thật (real leaf page), có địa chỉ URL xác thực trên các tên miền công lập hoặc đơn vị vận hành chính thức được kiểm duyệt (`.danang.gov.vn`, `.edu.vn`, `tngo.vn`).
3. **Tiêu chuẩn Verbatim Supporting Text Span:** Mọi thẻ thông tin bắt buộc phải đối soát khớp từng ký tự với một đoạn trích nguyên văn trong tệp raw capture tải về.
4. **Cơ chế Phê duyệt Từng mục (Item-Level CEO Approval Gate):** Không phê duyệt hàng loạt. Mỗi mục phải vượt qua bài kiểm tra validator độc lập trước khi CEO ký quyết định cấp phép hiển thị trên Staging.

---

## II. DANH MỤC 8 DỊCH VỤ CÔNG ĐỢT 2 TẠI ĐÀ NẴNG (BATCH 04 CANDIDATES)

| STT | Mã Định Danh (ID) | Tên Dịch Vụ Công | Nhóm Trụ Cột | Đơn Vị / Tên Miền Chính Thức | Chuẩn Đoạn Trích Bắt Buộc (Required Verbatim Span) | Trạng Thái Cấp Phép Ban Đầu |
|:---:|:---|:---|:---|:---|:---|:---:|
| 1 | `J311_DS_01_PORTAL_1022` | Cổng Phản Ánh Đô Thị & Dịch Vụ Công 1022 | Tiện ích số & Đô thị | Trung tâm TT Dịch vụ công Đà Nẵng (`1022.danang.gov.vn`) | *"Tổng đài 1022 Đà Nẵng tiếp nhận phản ánh, kiến nghị"* | `DISCOVERY_ONLY (Chưa cấp phép capture)` |
| 2 | `J311_HC_01_LIBRARY_GENERAL_DN` | Thư viện Khoa học Tổng hợp Đà Nẵng | Giáo dục & Văn hóa | Sở VHTT Đà Nẵng (`thuvien.danang.gov.vn`) | *"Thư viện Khoa học Tổng hợp Đà Nẵng phục vụ bạn đọc"* | `DISCOVERY_ONLY (Chưa cấp phép capture)` |
| 3 | `J311_HC_02_APEC_PARK` | Công viên Vườn tượng APEC Đà Nẵng | Không gian xanh công cộng | UBND TP. Đà Nẵng (`danang.gov.vn`) | *"Công viên APEC mở cửa tự do phục vụ người dân và du khách"* | `DISCOVERY_ONLY (Chưa cấp phép capture)` |
| 4 | `J311_HK_01_HEALTH_CENTER_LIENCHIEU` | Trung tâm Y tế Quận Liên Chiểu | Y tế công cộng & Cấp cứu | TTYT Liên Chiểu / SYT (`trungtamytequanglienchieu.danang.gov.vn`) | *"tiếp nhận khám bệnh, cấp cứu 24/24"* | `DISCOVERY_ONLY (Chưa cấp phép capture)` |
| 5 | `J311_AT_01_TNGO_PUBLIC_BICYCLE` | Trạm Xe Đạp Công Cộng TNGo Đà Nẵng | Tiện ích di chuyển xanh | Công ty CP Tập đoàn Trí Nam (`tngo.vn`) | *"Dịch vụ xe đạp công cộng tại thành phố Đà Nẵng"* | `DISCOVERY_ONLY (Chưa cấp phép capture)` |
| 6 | `J311_DS_02_CDC_DANANG` | Trung tâm Kiểm soát Bệnh tật TP. Đà Nẵng (CDC) | Y tế dự phòng & Tiêm chủng | CDC Đà Nẵng (`cdcdanang.vn` / `soyte.danang.gov.vn`) | *"Lịch tiêm chủng và tư vấn y tế dự phòng"* | `DISCOVERY_ONLY (Chưa cấp phép capture)` |
| 7 | `J311_HK_02_DUT_LEARNING_SPACE` | Trung tâm Học liệu & Thư viện ĐH Bách khoa | Giáo dục & Tự học | Đại học Bách khoa - ĐHĐN (`thuvien.dut.udn.vn`) | *"Trung tâm Học liệu phục vụ sinh viên và cán bộ giảng viên"* | `DISCOVERY_ONLY (Chưa cấp phép capture)` |
| 8 | `J311_DS_03_OPEN_DATA_DANANG` | Cổng Dữ liệu Mở Thành phố Đà Nẵng | Tiện ích số & Tra cứu | Sở TTTT Đà Nẵng (`opendata.danang.gov.vn`) | *"Cổng Dữ liệu mở thành phố Đà Nẵng cung cấp dữ liệu mở công khai"* | `DISCOVERY_ONLY (Chưa cấp phép capture)` |

---

## III. QUY TRÌNH KIỂM SOÁT 6 GIAI ĐOẠN (6-STAGE CONTROLLED PIPELINE)

```
[Giai đoạn 1: Static Discovery] ➔ [Giai đoạn 2: Scoped Work Order] ➔ [Giai đoạn 3: Operator Raw Ingress]
                                                                                │
[Giai đoạn 6: Production v3.421.0] 🠔 [Giai đoạn 5: Staging QA 52/52] 🠔 [Giai đoạn 4: CEO Approval Gate]
```

1. **Giai đoạn 1 (Static Discovery):** Đội ngũ Data & Trust kiểm tra sự tồn tại và tính hợp lệ của trang lá URL từ trạm làm việc sạch, xác thực năm ban hành (2025–2026), không gửi payload tự động.
2. **Giai đoạn 2 (Scoped Work Order):** Sau khi danh mục được sàng lọc, CEO ban hành Lệnh bắt giữ phạm vi hẹp (Ingress Scope), xác định rõ từng URL được phép.
3. **Giai đoạn 3 (Operator Raw Ingress):** Lead Operator thực hiện 1 lượt tải tĩnh duy nhất (read-only single fetch), lưu cặp `.raw.html` và `.headers.json` vào kho vault kèm mã băm SHA-256 thực.
4. **Giai đoạn 4 (CEO Approval Gate):** Bộ công cụ validator độc lập (kế thừa từ JAYT-279/309) đối soát 100% khớp văn bản; CEO ra quyết định phê duyệt từng mục (`PUBLIC_APPROVED_STAGING_ONLY`).
5. **Giai đoạn 5 (Staging QA 52/52):** Tích hợp vào Staging môi trường cô lập, chạy toàn bộ bộ kiểm thử hồi quy 52/52 assertions, DOM audit zero console error và WCAG AA.
6. **Giai đoạn 6 (Production Go-Live Decree):** Chỉ khi toàn bộ các bước 1-5 đạt 100% PASS và có Nghị quyết phê duyệt từ Chủ Tịch / CEO, phiên bản v3.421.0 mới được đóng gói và phát hành.

---

## IV. ĐIỀU KHOẢN HIỆU LỰC & PHÂN CÔNG THỰC HIỆN

- **Khối Kỹ Thuật Antigravity:** Duy trì hệ thống giám sát sống 24/7 (`jayt_311_live_production_monitor.js`), bảo toàn Uptime và trạng thái khóa của Production v3.420.0.
- **Khối Nghiệp Vụ Data & Trust:** Khởi động Giai đoạn 1 (Static Discovery) đối với 8 ứng viên trong Ma trận `JAYT_311_BATCH04_CANDIDATE_DISCOVERY_MATRIX.json`.
- **Hội đồng QA:** Chuẩn bị bộ harness kiểm định tương thích cho Batch 04.

*Văn bản có hiệu lực thi hành kể từ thời điểm ký.*

**TỔNG GIÁM ĐỐC TẬP ĐOÀN JAYT CORP**  
*(Đã ký)*  
**JayT**
