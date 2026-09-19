# JAYT QUALITY ASSURANCE — BROWSER RUNNER CONTRACT

## Mục Đích
Bộ runner `browser_runner` thực thi kiểm thử giao diện đầu cuối (E2E) trên trình duyệt Google Chrome thông qua `playwright-core` trong môi trường QA giả lập.

## Quy Định Biến Môi Trường `JAYT_PYTHON` (QA Contract)
- `JAYT_PYTHON` là biến môi trường phục vụ **riêng cho môi trường QA hạn chế quyền truy cập** để chỉ định đường dẫn thực thi của Python runtime khi khởi động server sandbox.
- **NGHIÊM CẤM** đưa biến `JAYT_PYTHON` vào môi trường Production hoặc Runtime công khai.
- Trong môi trường QA cục bộ, thiết lập biến này trước khi chạy suite kiểm thử:

### Cách Thiết Lập Trên PowerShell:
```powershell
$env:JAYT_PYTHON = (py -3 -c "import sys; print(sys.executable)").Trim()
node 07_QUALITY_ASSURANCE/test_e2e_real_browser.js
```

## Cơ Chế Fail-Closed & Chống Stale Artifact
1. Khi bắt đầu chạy, runner ghi đè `browser_e2e_result.json` với trạng thái `RUNNING` và mã `run_id` duy nhất.
2. Nếu `JAYT_PYTHON` thiếu, không truy cập được hoặc bất kỳ bước nào thất bại, runner ngay lập tức ghi đè `browser_e2e_result.json` với `final_status: "FAIL"`, kèm chi tiết lỗi và thoát với `exit code 1`.
3. Chỉ khi toàn bộ 10/10 assertions đạt `PASS` và 3 ảnh chụp màn hình mới được tạo với mã băm SHA-256 đối soát, tệp `browser_e2e_result.json` mới được ghi nhận `final_status: "PASS"`.
