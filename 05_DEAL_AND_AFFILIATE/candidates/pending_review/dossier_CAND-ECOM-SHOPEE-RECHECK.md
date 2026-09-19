# Hồ Sơ Bằng Chứng Bắt Buộc: `CAND-ECOM-SHOPEE-RECHECK`

> **Thương hiệu**: Shopee Vietnam (ONLINE_APP)  
> **Trạng thái thẩm định**: `NEEDS_RECHECK` (`LOCALLY_CAPTURED_SOURCE_LINKED`)  
> **Mức độ xác minh**: `NOT_INDEPENDENTLY_VERIFIED` (Thu thập từ URL chính thức, chưa qua xác minh độc lập)  
> **Work Order**: `JAYT-BATCH-REAL-CAPTURE-041`  
> **Thời điểm capture**: `2026-08-22T19:32:00+07:00`  
> **Công cụ capture**: `playwright_headless_chromium` (Google Chrome CDP Engine)  

---

## 1. Dữ Liệu Nguồn & Chứng Thư Thực Thi

- **URL yêu cầu**: `https://shopee.vn/`
- **Tệp ảnh chụp màn hình**: [`shopee_official_promo_capture.png`](artifacts/shopee_official_promo_capture.png)
  - **Mã băm SHA-256**: `9cff7c3f5679ab58fd23a6facb2f53a50cc4edf70f5945f77d55de7f4eb4b707`
- **Tệp HTML thô**: [`shopee_official_promo_raw.html`](artifacts/shopee_official_promo_raw.html)
  - **Mã băm SHA-256**: `574fc4f5b08b5e4e3b8cf67d94cd10bb641d98cf89f395a7a5b078cba86a9734`
- **Tệp văn bản trích xuất**: [`shopee_official_promo_text.txt`](artifacts/shopee_official_promo_text.txt)
  - **Mã băm SHA-256**: `b6e237ecfc5d0840082fd565de3ab91e7d9ba38198b5b44d0a69aca7fd48eb66`
- **Chứng thư thực thi**: [`capture_receipt_SHOPEE.json`](artifacts/capture_receipt_SHOPEE.json)
  - **Mã băm SHA-256**: `b1aa475a13eb08ad8ee78b19d6d059bea005afa7fd51830151bf162f2ba89871`

---

## 2. Kết Quả Quan Sát Thực Tế & Ghi Chú Audit

- **Đánh giá nội dung**: Trang shopee.vn trả về cơ chế xác thực anti-bot (Trang không khả dụng / Rất tiếc, đã có lỗi xảy ra). Gắn nhãn VOLATILE / NEEDS_RECHECK.
- **Trích đoạn văn bản quan sát**:
```text
bỏ qua nội dung chính
Bạn cần giúp đỡ?
Trang không khả dụng
Rất tiếc, đã có lỗi xảy ra. Bạn vui lòng đăng nhập lại hoặc trở về Trang chủ nhé!
Đăng nhậpTrở về trang chủ
ID: 810599b9c3b-2b15-470a-b118-c9bb9bf47407
```

---

## 3. Quyết Định & Rào Chắn Vận Hành (Fail-Closed)

- **Render Live**: `KHÓA (render_eligible: false)`
- **Commercial Price**: `null (Không tạo giá giả định)`
