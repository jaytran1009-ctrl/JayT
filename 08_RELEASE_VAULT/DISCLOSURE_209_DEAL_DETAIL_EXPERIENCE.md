# BẢN CÔNG BỐ PHÁT HÀNH JAYT-209: DEAL DETAIL EXPERIENCE & HOW-TO-GET GUIDE

**Mã Chỉ thị / Work Order:** `JAYT-209`  
**Phiên bản hệ thống:** `Real Savings OS 3.349` (`v3.349.0`)  
**Môi trường:** Live Vercel Production (`https://deploy-ten-xi-48.vercel.app/`)  
**Ngày phát hành:** 27/08/2026  
**Trạng thái phê duyệt:** `IMPLEMENTED_PENDING_CEO_AUDIT`

---

## 1. TỔNG QUAN NÂNG CẤP
Thực thi toàn diện chỉ thị của CEO về việc nâng cấp card ngoài trang chủ thành "mồi khám phá", kết nối trực tiếp với **Hồ sơ ưu đãi chi tiết & Hướng dẫn nhận trong 10 giây (Deal Detail Experience & How-To-Get Guide)**:
- Người dùng bấm vào bất kỳ card 🔵 hoặc nút "Chi Tiết & Cách Nhận ↗", một bottom-sheet / modal chuẩn responsive cao cấp xuất hiện tức thì.
- Cung cấp đầy đủ 5 khối thông tin cốt lõi mà không cần phải đoán mò hay suy diễn claim.

---

## 2. CẤU TRÚC 5 KHỐI THÔNG TIN HỒ SƠ CHI TIẾT
1. **Hero Thương Hiệu**:
   - Monogram / Logo Badge nhận diện thương hiệu độc quyền với nền gradient theo ngành.
   - Nút `Xem chương trình tại nguồn ↗` trỏ trực tiếp tới URL chính thức.
   - Badge phân tầng hiển thị rõ ràng: `🔵 Ưu Đãi Chính Thức · Cần Kiểm Tra Phạm Vi`.
2. **Trích Đoạn Ưu Đãi Nguyên Văn (Verbatim Quote)**:
   - Trích đúng nguyên văn câu quote từ artifact nguồn, không biên soạn hoặc phóng đại.
   - Metadata minh bạch: Ngày kiểm tra (`captured_at`), Ngày recheck tiếp theo (`captured_at + TTL`), Trạng thái hiệu lực (`🟢 Đang có hiệu lực`).
3. **Hướng Dẫn Cách Nhận Ưu Đãi (10 Giây)**:
   - 4 bước ngắn gọn, rõ ràng từ evidence (Điều kiện cần có, Kênh thực hiện tại Đà Nẵng, Thao tác xuất trình/nhập mã tại quầy/app, Xác nhận lại nguồn gốc).
4. **Phân Tích Kiểm Định JayT**:
   - Phạm vi áp dụng tại Đà Nẵng / trực tuyến.
   - Lưu ý chu kỳ kiểm tra recheck định kỳ của JayT.
   - Chuỗi băm SHA-256 ràng buộc trực tiếp tới tệp bằng chứng artifact lưu trên đĩa.
5. **Hành Động & Checklist Xác Minh**:
   - Checklist trước khi thanh toán: Hỏi nhân viên / kiểm tra màn hình thanh toán.
   - Nút CTA chính: `Mở Nguồn Gốc Ưu Đãi ↗`.
   - Nút tương tác cộng đồng: `🚩 Báo tin thay đổi` (ghi nhận phản hồi).

---

## 3. KỶ LUẬT HÌNH ẢNH & AN TOÀN NỘI DUNG
- Tuyệt đối không sử dụng ảnh AI, ảnh stock gán quán, screenshot crop hoặc ảnh không rõ quyền.
- Sử dụng Brand Monogram cao cấp với visual gradient verified.
- 100% câu từ đều liên kết chặt chẽ với [`CLAIM_LEDGER_208.json`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/runtime_evidence/CLAIM_LEDGER_208.json).
