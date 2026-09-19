# Hồ Sơ Bằng Chứng Bắt Buộc: `CAND-DNG-STARBUCKS-RECHECK`

> **Thương hiệu**: Starbucks Vietnam (FNB)  
> **Trạng thái thẩm định**: `NEEDS_RECHECK` (`LOCALLY_CAPTURED_SOURCE_LINKED`)  
> **Mức độ xác minh**: `NOT_INDEPENDENTLY_VERIFIED` (Thu thập từ URL chính thức, chưa qua xác minh độc lập)  
> **Work Order**: `JAYT-BATCH-REAL-CAPTURE-041`  
> **Thời điểm capture**: `2026-08-22T19:32:00+07:00`  
> **Công cụ capture**: `playwright_headless_chromium` (Google Chrome CDP Engine)  

---

## 1. Dữ Liệu Nguồn & Chứng Thư Thực Thi

- **URL yêu cầu**: `https://starbucks.vn/`
- **Tệp ảnh chụp màn hình**: [`starbucks_official_promo_capture.png`](artifacts/starbucks_official_promo_capture.png)
  - **Mã băm SHA-256**: `fe5d5fda3fb1d7d52ad0ecbadc3c9a412c70b7e6014f2c4ac5cd08ae2dd5bcdf`
- **Tệp HTML thô**: [`starbucks_official_promo_raw.html`](artifacts/starbucks_official_promo_raw.html)
  - **Mã băm SHA-256**: `0ce3215a55152cc823708125b58fab34eaa74a6629c6c12c354ed86311ea2770`
- **Tệp văn bản trích xuất**: [`starbucks_official_promo_text.txt`](artifacts/starbucks_official_promo_text.txt)
  - **Mã băm SHA-256**: `02279077e029fd45b0037f1698c954493e3d043e6f9c122dab087c885d3653f1`
- **Chứng thư thực thi**: [`capture_receipt_STARBUCKS.json`](artifacts/capture_receipt_STARBUCKS.json)
  - **Mã băm SHA-256**: `68fe11ddb0cf0bd0ec11217800031f354afa131a40d86759878b1f62b36758d7`

---

## 2. Kết Quả Quan Sát Thực Tế & Ghi Chú Audit

- **Đánh giá nội dung**: Trang chủ starbucks.vn đã capture thật (490KB PNG). Giới thiệu Espresso; không có voucher/deal công khai cụ thể.
- **Trích đoạn văn bản quan sát**:
```text
Qua việc dùng trang mạng của Starbucks , bạn đồng ý cho chúng tôi dùng các cookie.
Bạn muốn biết thêm Tôi đồng ý với cookie
Tìm Cửa hàng
CÀ PHÊ
THỰC ĐƠN
QUÁN CÀ PHÊ
TRÁCH NHIỆM
VỀ CHÚNG TÔI
THẺ
 
CÀ PHÊ ESPRESSO CỦA CHÚNG TÔI, LATTE CỦA BẠN

Cà phê espresso đậm vị và bốc hơi sữa - ngon tuyệt hảo khi thưởng thức riêng hay khi thêm đường.

Hãy thưởng thức ngay
 
CƠ HỘI

Không chỉ là nhân viên, mà còn là cộng sự.

Tham gia cùng chúng tôi
Facebook
Instagram
VỀ CHÚNG TÔI
Di sản
Công ty
Cơ hội nghề nghiệp
 
DỊCH VỤ KHÁCH HÀNG
Câu hỏi Thường Gặp
 
LIÊN KẾT NHANH
Bộ định vị Cửa hàng
Dành cho Đối tác
```

---

## 3. Quyết Định & Rào Chắn Vận Hành (Fail-Closed)

- **Render Live**: `KHÓA (render_eligible: false)`
- **Commercial Price**: `null (Không tạo giá giả định)`
