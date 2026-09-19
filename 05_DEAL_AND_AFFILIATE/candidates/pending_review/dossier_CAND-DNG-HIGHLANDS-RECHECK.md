# Hồ Sơ Bằng Chứng Bắt Buộc: `CAND-DNG-HIGHLANDS-RECHECK`

> **Thương hiệu**: Highlands Coffee (FNB)  
> **Trạng thái thẩm định**: `NEEDS_RECHECK` (`LOCALLY_CAPTURED_SOURCE_LINKED`)  
> **Mức độ xác minh**: `NOT_INDEPENDENTLY_VERIFIED` (Thu thập từ URL chính thức, chưa qua xác minh độc lập)  
> **Work Order**: `JAYT-BATCH-REAL-CAPTURE-041`  
> **Thời điểm capture**: `2026-08-22T19:32:00+07:00`  
> **Công cụ capture**: `playwright_headless_chromium` (Google Chrome CDP Engine)  

---

## 1. Dữ Liệu Nguồn & Chứng Thư Thực Thi

- **URL yêu cầu**: `https://highlandscoffee.com.vn/vn/tin-tuc-khuyen-mai.html`
- **Tệp ảnh chụp màn hình**: [`highlands_official_promo_capture.png`](artifacts/highlands_official_promo_capture.png)
  - **Mã băm SHA-256**: `d5359b16a594ac94652a93326aa6d5a5c3c3ea943a034d86351689c9e44c2581`
- **Tệp HTML thô**: [`highlands_official_promo_raw.html`](artifacts/highlands_official_promo_raw.html)
  - **Mã băm SHA-256**: `a55e4bf42146b9c3bf95dd1319a126c4127b5c9b8ab6e0928ba2824b318c07e3`
- **Tệp văn bản trích xuất**: [`highlands_official_promo_text.txt`](artifacts/highlands_official_promo_text.txt)
  - **Mã băm SHA-256**: `1a988b51546c8c3a6f67e67b38d1b14a126710b47fef2d2688e18b76c1da72e5`
- **Chứng thư thực thi**: [`capture_receipt_HIGHLANDS.json`](artifacts/capture_receipt_HIGHLANDS.json)
  - **Mã băm SHA-256**: `212d5d6118eb1307b36733065f74b958285dbc37de3d537628d0bee8f460c299`

---

## 2. Kết Quả Quan Sát Thực Tế & Ghi Chú Audit

- **Đánh giá nội dung**: Trang highlandscoffee.com.vn trả về Cloudflare Security Challenge (Attention Required! | Cloudflare). Chưa có nội dung ưu đãi công khai trực tiếp.
- **Trích đoạn văn bản quan sát**:
```text
Sorry, you have been blocked
You are unable to access highlandscoffee.com.vn
Why have I been blocked?

This website is using a security service to protect itself from online attacks. The action you just performed triggered the security solution. There are several actions that could trigger this block including submitting a certain word or phrase, a SQL command or malformed data.

What can I do to resolve this?

You can email the site owner to let them know you were blocked. Please include what you were doing when this page came up and the Cloudflare Ray ID found at the bottom of this page.

Cl
```

---

## 3. Quyết Định & Rào Chắn Vận Hành (Fail-Closed)

- **Render Live**: `KHÓA (render_eligible: false)`
- **Commercial Price**: `null (Không tạo giá giả định)`
