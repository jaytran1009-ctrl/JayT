# Hồ Sơ Bằng Chứng Bắt Buộc: `CAND-ECOM-SHOPEEFOOD-DNG`

> **Thương hiệu**: ShopeeFood Đà Nẵng (ONLINE_APP)  
> **Trạng thái thẩm định**: `NEEDS_RECHECK` (`LOCALLY_CAPTURED_SOURCE_LINKED`)  
> **Mức độ xác minh**: `NOT_INDEPENDENTLY_VERIFIED` (Thu thập từ URL chính thức, chưa qua xác minh độc lập)  
> **Work Order**: `JAYT-BATCH-REAL-CAPTURE-041`  
> **Thời điểm capture**: `2026-08-22T19:32:00+07:00`  
> **Công cụ capture**: `playwright_headless_chromium` (Google Chrome CDP Engine)  

---

## 1. Dữ Liệu Nguồn & Chứng Thư Thực Thi

- **URL yêu cầu**: `https://shopeefood.vn/`
- **Tệp ảnh chụp màn hình**: [`shopeefood_official_promo_capture.png`](artifacts/shopeefood_official_promo_capture.png)
  - **Mã băm SHA-256**: `8f0efbe8a56ec112ff044b43733c80512ddfb634acfd8386e87e3f7d94cfc9b2`
- **Tệp HTML thô**: [`shopeefood_official_promo_raw.html`](artifacts/shopeefood_official_promo_raw.html)
  - **Mã băm SHA-256**: `ae868650898476c0098b6a884f7868f2235d60cef3f19e3a074a78e9ab20a9e5`
- **Tệp văn bản trích xuất**: [`shopeefood_official_promo_text.txt`](artifacts/shopeefood_official_promo_text.txt)
  - **Mã băm SHA-256**: `b4404158a6ee7c2ae45b83d422093e9a4da3a687b51895d0bfe326c00d2b7660`
- **Chứng thư thực thi**: [`capture_receipt_SHOPEEFOOD.json`](artifacts/capture_receipt_SHOPEEFOOD.json)
  - **Mã băm SHA-256**: `ef633a763bc9677293a59b575755d156ae57f015c89d71b82151204bca6f89ff`

---

## 2. Kết Quả Quan Sát Thực Tế & Ghi Chú Audit

- **Đánh giá nội dung**: Trang shopeefood.vn đã capture thật (855KB PNG, 3.9KB text). Có text 'Mồi Ngon Cùng Bóng Đá Giảm 45.000Đ' nhưng áp dụng động theo từng quán. Gắn nhãn VOLATILE / NEEDS_RECHECK.
- **Trích đoạn văn bản quan sát**:
```text
TP. HCM
Đồ ănThực phẩmRượu biaHoaSiêu thịThuốcThú cưng
Đăng nhập
Đặt Đồ ăn, giao hàng từ 20'...
Có 110374 Địa Điểm Ở TP. HCM Từ 00:00 - 23:59
AllĐồ ănĐồ uốngĐồ chayBánh kemTráng miệngPizza/BurgerMón lẩuSushiMì phởCơm hộp
Sử dụng App ShopeeFood để có nhiều giảm giá
và trải nghiệm tốt hơn


Đồ ăn
Chọn địa chỉ giao hàng
Bộ sưu tập
Xem tất cả
Mồi Ngon Cùng Bóng Đá Giảm 45.000Đ
200 địa điểm
Quán Ngon Sài Gòn Giảm 40.000Đ
200 địa điểm
Quán Ngon Gần Nhà, Giảm Tới 35.000Đ
200 địa điểm
Quán Ruột Dân Sành Ăn - Giảm 30.000Đ
200 địa điểm
Chợ Sale Cuối Tuần Giảm Đến 105.000Đ
200 địa điểm
Năng Lượng Tới Trư
```

---

## 3. Quyết Định & Rào Chắn Vận Hành (Fail-Closed)

- **Render Live**: `KHÓA (render_eligible: false)`
- **Commercial Price**: `null (Không tạo giá giả định)`
