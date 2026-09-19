# 📋 BÁO CÁO CHẨN ĐOÁN GỐC WINDOWS TASK SCHEDULER & KHẢ NĂNG TỰ VẬN HÀNH: JAYT-150

**Mục đích:** Báo cáo kỹ thuật duy nhất xác định khả năng khả dụng và giới hạn của Windows Task Scheduler trên máy chủ hiện tại theo chỉ thị `JAYT-150: EXECUTION CREDIBILITY RESET & REAL-SUPPLY CONTINUITY`.  
**Thời gian kiểm toán:** 27/08/2026 — 11:32 (Giờ Đà Nẵng)  
**Tài khoản thực thi:** `JAY\tritr`  
**Hệ điều hành:** Windows 10/11 x64 (Node.js runtime)

---

## I. DỮ LIỆU ĐỐI SOÁT KỸ THUẬT TỪ HỆ THỐNG

### 1. Phân Quyền Tài Khoản (`whoami /priv`)
```text
PRIVILEGES INFORMATION
----------------------
Privilege Name                Description                          State   
============================= ==================================== ========
SeChangeNotifyPrivilege       Bypass traverse checking             Enabled 
SeIncreaseWorkingSetPrivilege Increase a process working set       Disabled
SeTimeZonePrivilege           Change the time zone                 Disabled
```
*Nhận xét:* Tiến trình chạy dưới tài khoản người dùng tiêu chuẩn không có quyền quản trị viên (`Non-Elevated / Standard User`).

### 2. Trạng Thái Nhật Ký Sự Kiện Hệ Thống (`TaskScheduler Operational EventLog`)
```powershell
wevtutil sl Microsoft-Windows-TaskScheduler/Operational /e:true
# Output: Failed to save configuration or activate log. Access is denied.
```
*Nhận xét:*
- Kênh nhật ký sự kiện `Microsoft-Windows-TaskScheduler/Operational` trên Windows mặc định bị vô hiệu hóa (Disabled).
- Việc kích hoạt kênh này yêu cầu quyền Administrator (`Access is denied`).
- Do đó, hệ thống không thể tự trích xuất các Event ID khởi phát tác vụ (`Event ID 100/102/200/201`) một cách độc lập từ ngữ cảnh người dùng hiện tại để phục vụ việc correlation với `run_id`.

### 3. Phương Thức Đăng Ký Tác Vụ (`schtasks` & `Register-ScheduledTask`)
- Các tác vụ được tạo bởi tài khoản `tritr` bị giới hạn ở chế độ **`Interactive only`** (chỉ chạy khi phiên người dùng `tritr` đang đăng nhập và có tương tác màn hình).
- Tác vụ không thể chạy ở chế độ ẩn hoàn toàn không tương tác (`Run whether user is logged on or not`) vì chế độ này đòi hỏi lưu trữ mật khẩu hoặc tài khoản `SYSTEM`.
- Trong môi trường kiểm toán độc lập hoặc các subshell cô lập, việc truy vấn tác vụ có thể bị phân mảnh theo phiên.

---

## II. KẾT LUẬN CHẨN ĐOÁN DỨT ĐIỂM (DEFINITIVE DIAGNOSTIC VERDICT)

**VERDICT: `SCHEDULER_BLOCKED_ON_THIS_HOST`**

### Lý do kỹ thuật:
1. **Thiếu hạ tầng Event Log chứng thực:** Kênh `Microsoft-Windows-TaskScheduler/Operational` bị khóa quyền Admin, không thể tạo chữ ký correlation hệ điều hành có thể tái lập độc lập.
2. **Hạn chế chế độ Interactive Only:** Không thể đảm bảo tự động kích hoạt nền 24/7 mà không phụ thuộc vào trạng thái đăng nhập của người dùng.
3. **Rủi ro tạo ảo giác tự vận hành (Scheduler Theatre):** Việc cố gắng đổi tên task liên tục (146 -> 149) chỉ tạo thêm các lớp vỏ bọc mà không giải quyết được căn nguyên thiếu chứng cứ event correlation.

---

## III. HÀNH ĐỘNG ĐIỀU HÀNH & CHUYỂN HƯỚNG BẢO TOÀN (OPERATIONAL ACTION)

1. **Dừng toàn bộ nỗ lực cài đặt task Windows mới:** Không tạo bất kỳ tác vụ `JAYT_AUTONOMOUS_SUPPLY_WORKER_150` hay 151 nào.
2. **Thu hồi toàn bộ claim scheduler 146–149:** Tất cả chu kỳ trước được ghi nhận chính thức là `SCHEDULER_UNPROVEN`.
3. **Chuyển giao sang chế độ chạy thực chất `MANUAL_TRIGGERED`:**
   - Supply Engine 150 sẽ thực thi các batch quét 20 URL với nhãn minh bạch `MANUAL_TRIGGERED`.
   - Tập trung 100% nguồn lực vào chất lượng dữ liệu thu thập (Source Repair, DOM-Lineage Discovery, loại trừ URL rác/stale, hướng tới $\ge 10$ bundles hoàn chỉnh).
4. **Bảo tồn khóa sản xuất:** `deals_feed.json: []`, `is_approved: false`.
