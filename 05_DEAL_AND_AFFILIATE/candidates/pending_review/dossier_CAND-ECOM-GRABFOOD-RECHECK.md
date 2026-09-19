# Hồ Sơ Bằng Chứng Bắt Buộc: `CAND-ECOM-GRABFOOD-RECHECK`

> **Thương hiệu**: GrabFood Vietnam (ONLINE_APP)  
> **Trạng thái thẩm định**: `NEEDS_RECHECK` (`LOCALLY_CAPTURED_SOURCE_LINKED`)  
> **Mức độ xác minh**: `NOT_INDEPENDENTLY_VERIFIED` (Thu thập từ URL chính thức, chưa qua xác minh độc lập)  
> **Work Order**: `JAYT-BATCH-REAL-CAPTURE-041`  
> **Thời điểm capture**: `2026-08-22T19:32:00+07:00`  
> **Công cụ capture**: `playwright_headless_chromium` (Google Chrome CDP Engine)  

---

## 1. Dữ Liệu Nguồn & Chứng Thư Thực Thi

- **URL yêu cầu**: `https://grab.com/vn/food/`
- **Tệp ảnh chụp màn hình**: [`grabfood_official_promo_capture.png`](artifacts/grabfood_official_promo_capture.png)
  - **Mã băm SHA-256**: `2a37c47e3644c0dba484613ef39a7d4bfad3c35625ce908ab256596e40299203`
- **Tệp HTML thô**: [`grabfood_official_promo_raw.html`](artifacts/grabfood_official_promo_raw.html)
  - **Mã băm SHA-256**: `f6e34b0fd014b769ed7ae60d3d44a7fde6490028c8ef0554bc5fc8ca2e7158ed`
- **Tệp văn bản trích xuất**: [`grabfood_official_promo_text.txt`](artifacts/grabfood_official_promo_text.txt)
  - **Mã băm SHA-256**: `88d31fe1f4f389852307f39832f501964b01506b4f85d9f92d29573b1511c2b0`
- **Chứng thư thực thi**: [`capture_receipt_GRABFOOD.json`](artifacts/capture_receipt_GRABFOOD.json)
  - **Mã băm SHA-256**: `268a001fa995966a608176dbdd91af7305a4601a9b7fe36972a37fbfcecb860f`

---

## 2. Kết Quả Quan Sát Thực Tế & Ghi Chú Audit

- **Đánh giá nội dung**: Trang grab.com/vn/food/ đã capture thật (1MB PNG, 3.3KB text). Giới thiệu dịch vụ giao món; không có voucher/giá cố định trên trang web công khai. Gắn nhãn VOLATILE / NEEDS_RECHECK.
- **Trích đoạn văn bản quan sát**:
```text
Menu
Grab Singapore
Trở thành Đối tác của Grab 
Trung tâm Hỗ trợ
Tiếng Việt
GrabFood

Thèm món gì - Đặt ngay món đó!

Đặt hàng ngay

Trở thành Đối tác Nhà hàng của GrabFood ngay!Ấn vào đây.

Mang đến cho bạn món ăn ưa thích, nóng hổi và ngon lành

Đặt đồ ăn giao hàng tận nhà nhanh chóng lấp đầy chiếc bụng đói của bạn với những món ngon yêu thích và dịch vụ giao hàng “thần tốc”. GrabFood hiện đang có mặt tại nhiều tỉnh thành ở Việt Nam: Thành phố Hồ Chí Minh, Hà Nội, Đà Nẵng, Vũng Tàu, Bình Dương, Đồng Nai, Cần Thơ, Đà Lạt,…. Chúng tôi đang dần mở rộng thêm nhiều khu vực trong thời gian tới!

Đ
```

---

## 3. Quyết Định & Rào Chắn Vận Hành (Fail-Closed)

- **Render Live**: `KHÓA (render_eligible: false)`
- **Commercial Price**: `null (Không tạo giá giả định)`
