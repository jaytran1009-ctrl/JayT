# Hồ Sơ Bằng Chứng Bắt Buộc: `CAND-ECOM-LAZADA-VOUCHER`

> **Thương hiệu**: Lazada Vietnam (ONLINE_APP)  
> **Trạng thái thẩm định**: `NEEDS_RECHECK` (`LOCALLY_CAPTURED_SOURCE_LINKED`)  
> **Mức độ xác minh**: `NOT_INDEPENDENTLY_VERIFIED` (Thu thập từ URL chính thức, chưa qua xác minh độc lập)  
> **Work Order**: `JAYT-BATCH-REAL-CAPTURE-041`  
> **Thời điểm capture**: `2026-08-22T19:32:00+07:00`  
> **Công cụ capture**: `playwright_headless_chromium` (Google Chrome CDP Engine)  

---

## 1. Dữ Liệu Nguồn & Chứng Thư Thực Thi

- **URL yêu cầu**: `https://lazada.vn/`
- **Tệp ảnh chụp màn hình**: [`lazada_official_promo_capture.png`](artifacts/lazada_official_promo_capture.png)
  - **Mã băm SHA-256**: `2470910482e8ab7fd41bb039c80dfd55357f4eb890850a0a4ca0d41eb9162a78`
- **Tệp HTML thô**: [`lazada_official_promo_raw.html`](artifacts/lazada_official_promo_raw.html)
  - **Mã băm SHA-256**: `b8f653286d135add395ac1f0de7c8e8ee6293293dfde95cd47568a37687ce8bc`
- **Tệp văn bản trích xuất**: [`lazada_official_promo_text.txt`](artifacts/lazada_official_promo_text.txt)
  - **Mã băm SHA-256**: `86d87d578281b2e1e3b2ea5f47cc3f30c71cb2d0f762f93397936e1309e2e593`
- **Chứng thư thực thi**: [`capture_receipt_LAZADA.json`](artifacts/capture_receipt_LAZADA.json)
  - **Mã băm SHA-256**: `9f5c815f658f367d468c7ebbb327041ed1c1cf30e3a6bf2c8d41b75271f094b9`

---

## 2. Kết Quả Quan Sát Thực Tế & Ghi Chú Audit

- **Đánh giá nội dung**: Trang lazada.vn đã capture thật (615KB PNG, 10KB text). Hiển thị banner Deal Chớp Nhoáng và Freeship. Voucher biến động theo tài khoản/giờ. Gắn nhãn VOLATILE / NEEDS_RECHECK.
- **Trích đoạn văn bản quan sát**:
```text
FEEDBACK SAVE MORE ON APP SELL ON LAZADA CUSTOMER CARE TRACK MY ORDER LOGIN SIGNUP THAY ĐỔI NGÔN NGỮ
 
SEARCH
 
TRẢI NGHIỆM LAZADA NGAY
Đánh giá 4.7 sao
Tải ngay App Lazada để tận hưởng
MIỄN PHÍ VẬN CHUYỂN
VOUCHER ĐỘC QUYỀN
Quét mã QR và tải App ngay

100% Hàng Chính Hãng

Nạp Card Điện Thoại/4G Giá Rẻ!

Deal Chớp Nhoáng

Đang bán
Kết thúc trong
28
:
27
:
42
MUA SẮM TOÀN BỘ SẢN PHẨM

[Buy 2 Boxes - Get 28% Off] Box of 24 Cups/ Set of 5 Cups of Thai Tomyum/ Kimchi/ Thai Shrimp/ Beef/ Chicken/ Vegetarian Flavor Noodles Vifon 60g

276.480
₫
331.776
₫
-17%

[Delivery Only Within 10Km] Box of 24 Bo
```

---

## 3. Quyết Định & Rào Chắn Vận Hành (Fail-Closed)

- **Render Live**: `KHÓA (render_eligible: false)`
- **Commercial Price**: `null (Không tạo giá giả định)`
