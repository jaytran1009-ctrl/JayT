# KẾ HOẠCH & GIAO THỨC BẢO VỆ QUYỀN RIÊNG TƯ & RÚT CONSENT HẬU PHỎNG VẤN
## DỰ ÁN: JAYT — BỘ NHỚ KHUYẾN MÃI ĐÀ NẴNG 43
**Mã chỉ thị điều hành:** `JAYT-USER-RESEARCH-003`  
**Trạng thái phê duyệt:** `GIAO THỨC RÚT CONSENT MẬT MÃ HỌC ĐÃ SẴN SÀNG — CHƯA CẤP PHÉP THỰC ĐỊA`  
**Cơ quan chủ quản:** Ban Điều Hành / Khối Sản Phẩm & Kỹ Thuật JayT Corp  

---

## 🏛️ 1. CƠ CHẾ RÚT ĐỒNG Ý HẬU PHỎNG VẤN BẰNG MÃ BĂM MẬT MÃ HỌC (POST-SESSION WITHDRAWAL)

> [!IMPORTANT]
> **GIẢI PHÁP RÚT CONSENT KHÔNG LƯU DANH TÍNH (ZERO-KNOWLEDGE CONSENT WITHDRAWAL)**:
> 
> 1. **Mã rút cầm tay ngẫu nhiên (Participant-Held Token)**:
>    - Khi bắt đầu, mỗi người tham gia được nhận 1 mã rút ngẫu nhiên cầm tay (ví dụ: `WITHDRAW-7A9F-B3C8-E2D1`).
>    - Người tham gia tự chụp lại hoặc giữ mã này.
>    - Hệ thống **TUYỆT ĐỐI KHÔNG** lưu mã thô này cùng tên, số điện thoại hay email của người tham gia.
> 
> 2. **Lưu trữ một chiều bằng mã băm SHA-256 (One-Way Hashed Storage)**:
>    - Trên phiếu ghi chép thực địa, hệ thống chỉ lưu chuỗi băm một chiều:
>      `withdrawal_token_hash = sha256(raw_token)`
>    - Không thể dịch ngược từ chuỗi băm ra mã gốc, và chuỗi băm hoàn toàn vô nghĩa với bên thứ ba.
> 
> 3. **Quy trình kích hoạt rút consent sau buổi nghiên cứu**:
>    - Người tham gia gửi mã `WITHDRAW-XXXX-XXXX` cho kênh hỗ trợ JayT.
>    - Điều phối viên chạy công cụ CLI: `python 06_USER_RESEARCH_PROTOCOL/scripts/withdraw_consent.py --token WITHDRAW-XXXX-XXXX`.
>    - Công cụ tự động tính SHA-256, quét tìm đúng phiếu quan sát thô có mã băm trùng khớp và **tiêu hủy vĩnh viễn khỏi đĩa lưu trữ Windows**.
>    - Ghi nhận sự kiện vào `WITHDRAWAL_AUDIT_LOG.jsonl` mà không lưu bất kỳ thông tin nhận dạng cá nhân nào.

---

## 📜 2. LỜI DẪN ĐỒNG Ý THAM GIA (CONSENT SCRIPT CÓ HƯỚNG DẪN MÃ RÚT)

*Điều phối viên đọc to cho người tham gia trước khi bắt đầu:*

> *"Chào bạn, cảm ơn bạn đã dành thời gian trải nghiệm giao diện thử nghiệm **JayT — Bộ Nhớ Khuyến Mãi Đà Nẵng**.  
> Đây là buổi kiểm thử tính dễ dùng của sản phẩm, chúng mình chỉ quan sát cách sắp xếp giao diện chứ không đánh giá bạn.  
> **Cam kết bảo vệ quyền riêng tư tuyệt đối**:  
> • Chúng mình **không hỏi và không lưu tên, số điện thoại, email hay nơi làm việc/học tập của bạn**.  
> • Dưới đây là một **Mã Rút Consent ngẫu nhiên** dành riêng cho bạn: `[ĐIỀU PHỐI VIÊN ĐƯA THẺ MÃ]`.  
> • Hệ thống chỉ lưu một chuỗi băm mật mã học của mã này chứ không hề biết mã này thuộc về ai.  
> • Nếu sau buổi hôm nay, bạn đổi ý và muốn xóa toàn bộ dữ liệu quan sát, bạn chỉ cần gửi lại mã này cho JayT. Hệ thống sẽ tự động tìm và xóa sạch toàn bộ bản ghi liên quan ngay lập tức.  
> Bạn có đồng ý tham gia buổi trải nghiệm này không?"*

---

## 💻 3. QUY TRÌNH TIÊU HỦY DỮ LIỆU WINDOWS-NATIVE

1. Khi nhận lệnh xóa (do hết hạn 14 ngày hoặc do người dùng rút consent), hệ thống thực thi xóa vĩnh viễn trên môi trường Windows thông qua PowerShell hoặc Python:
   ```powershell
   Remove-Item -Path "D:\Công Việc MMO\OPC JayT\JayT-Dự Án Giá Trị Cộng Đồng\06_USER_RESEARCH_PROTOCOL\raw_records\<record_file>.json" -Force
   ```
2. Xác nhận trực tiếp trên hệ thống tệp (File System Verification) rằng tệp đã không còn tồn tại trên đĩa.
3. Ghi nhận thời điểm và mã hash vào nhật ký kiểm toán `WITHDRAWAL_AUDIT_LOG.jsonl`.
