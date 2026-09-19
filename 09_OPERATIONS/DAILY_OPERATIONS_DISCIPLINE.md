# 🛡️ QUY CHUẨN KỶ LUẬT VẬN HÀNH HẰNG NGÀY — JAYT CORP
**Mã hiệu**: `JAYT-130-DAILY-MEMORY-AND-LESSONS-LOOP`  
**Phiên bản**: `1.0.0`  
**Mục tiêu**: Không lặp lại lỗi quản trị, claim vượt evidence, sửa trực tiếp SSOT, sai provenance, UI lệch trải nghiệm hoặc báo cáo “PASS/deployed” không có đối soát.

---

## 1. NGUYÊN TẮC CỐT LÕI
1. **Bộ nhớ không phải hình thức**: Đọc lại bộ nhớ không được biến thành việc tăng phiên bản tài liệu mỗi ngày cho có hình thức. `PROJECT_MEMORY.md` là SSOT quản trị; nhật ký vận hành hằng ngày phải append-only, trung thực và chỉ ghi điều đã thực sự xảy ra.
2. **Khách quan tuyệt đối**: Mọi tuyên bố (claim) phải bám chặt bằng chứng thực tế (`MODEL ≠ OBSERVED ≠ EVIDENCE`).
3. **Fail-Closed**: Khi thiếu dữ liệu, sai định dạng hoặc không đủ căn cứ, hệ thống và quy trình phải dừng lại ở trạng thái an toàn, không được tự ý suy diễn hoặc lấp chỗ trống.

---

## 2. QUY TRÌNH MỖI NGÀY — TRƯỚC KHI LÀM BẤT KỲ TASK NÀO
Mỗi ngày làm việc bắt đầu bằng việc đọc và lập **Daily Operating Brief**:
1. **Đọc toàn bộ `PROJECT_MEMORY.md`**: Nắm rõ hiện trạng hệ thống, các work order đang active và các ranh giới an toàn.
2. **Đọc `Lessons Learned Registry` & Hồ sơ kiểm định**:
   - `07_QUALITY_ASSURANCE/lessons_learned_registry.json`
   - Các disclosure/correction receipt mới nhất
   - Review pack và kết quả QA gần nhất
3. **Lập `Daily Operating Brief`** (Lưu tại `09_OPERATIONS/daily_briefs/DAILY_OPERATING_BRIEF_YYYY_MM_DD.md`):
   - **Trạng thái thực tế**: Production / Staging / Live URL / Version / SHA-256 byte parity.
   - **Work Order đang active**: Mã chỉ thị, mục tiêu người dùng, phạm vi tệp tin.
   - **Các bất biến không được vi phạm (Invariants)**: Danh sách các quy tắc cấm kỵ liên quan.
   - **Lỗi lịch sử liên quan**: Các bài học/sự cố trong quá khứ gắn với module sắp sửa đổi.
   - **Điều kiện nghiệm thu & Bằng chứng bắt buộc**: Yêu cầu test, tiêu chí PASS, phương thức đối soát live.
4. **Cổng khởi động (Gate to Execute)**: Chỉ bắt đầu triển khai khi Brief đã xác định rõ: phạm vi, nguồn dữ liệu, rủi ro claim, cách test và cách đối soát live.

---

## 3. QUY TRÌNH SAU MỖI BATCH CÔNG VIỆC
1. **Ghi nhật ký vận hành Append-Only** (`09_OPERATIONS/daily_logs/OPERATIONAL_LOG_YYYY_MM_DD.md`):
   - **Việc thực hiện thực tế**: Chi tiết từng thay đổi đã làm.
   - **Tệp thay đổi**: Danh sách file thêm mới, sửa đổi hoặc xóa bỏ.
   - **Kết quả test thực tế**: Mã lệnh đã chạy, số lượng assertion pass/fail, log bằng chứng.
   - **Những gì chưa kiểm chứng / chưa deploy / bị block**: Khai báo trung thực phần việc còn tồn đọng.
   - **Lỗi mới phát hiện & Biện pháp ngăn tái diễn**: Đúc kết kỹ thuật để tránh lặp lại.
2. **Cập nhật `Lessons Learned Registry`**: Nếu bài học có giá trị lâu dài, đưa quy tắc mới vào `07_QUALITY_ASSURANCE/lessons_learned_registry.json`.
3. **Cập nhật `PROJECT_MEMORY.md`**: Bắt buộc thực hiện thông qua script Memory Transaction (append-only transaction block); tuyệt đối không sửa trực tiếp nội dung trạng thái lịch sử.
4. **Kỷ luật ngôn từ thẩm quyền**: Tuyệt đối không tự ý ghi các cụm từ "CEO approved", "verified", "premium", "live", "deployed" nếu không có quyết định hoặc bằng chứng tương ứng.

---

## 4. CHECKLIST BẮT BUỘC TRƯỚC KHI BÁO CÁO
Trước khi gửi phản hồi hoặc báo cáo nghiệm thu cho CEO/CDO/CX Lead:
- [ ] **Data Truth**: Không có giá, voucher, deep-link, ảnh hoặc địa điểm giả lập trong production.
- [ ] **Provenance**: Nguồn gốc dữ liệu, mã băm SHA-256, thời điểm thu thập và phạm vi hiển thị rõ ràng.
- [ ] **UX Truth**: Card hiển thị đúng khung giờ và đúng nhu cầu thực tế của người dùng, không có nhãn placeholder ("Deal 1", "Deal 2", "Gợi ý").
- [ ] **Production Truth**: URL live và các tệp trong source / staging / deploy phải đối soát khớp 100% byte-for-byte.
- [ ] **Governance Truth**: Trạng thái báo cáo khớp chính xác với thẩm quyền thực tế (AI tự đánh giá là `IMPLEMENTED_PENDING_CEO_AUDIT` hoặc `PRODUCTION_VERIFIED_AND_DEPLOYED` dựa trên test, không tự nhận `CEO_ACCEPTED`).

---

## 5. CẤU TRÚC BÁO CÁO HẰNG NGÀY (CẤP BATCH)
Báo cáo nghiệm thu hằng ngày phải tập trung, súc tích và trả lời 5 câu hỏi:
1. **Hôm nay đã làm gì** (Các hạng mục đã hoàn tất).
2. **Điều gì thay đổi cho người dùng** (Trải nghiệm thực nhận khi mở web).
3. **Điều gì vẫn chưa giải quyết** (Các giới hạn, dữ liệu chờ cấp phép, phần việc tiếp theo).
4. **Lỗi nào đã được ngăn lặp lại** (Biện pháp kỹ thuật chống tái diễn).
5. **Bước tiếp theo có tác động lớn nhất** (Nhiệm vụ ưu tiên cao nhất cho batch tiếp theo).
