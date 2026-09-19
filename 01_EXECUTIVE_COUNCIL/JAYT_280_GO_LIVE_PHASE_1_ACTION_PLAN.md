# JAYT-280 — Kế hoạch hành động Go-Live Pha 1

**Thời điểm lập:** 03/09/2026  
**Mục tiêu:** Đưa tối thiểu 3 thẻ Batch 03B được xác minh đầy đủ lên Staging; xây dựng pipeline an toàn để đạt 15–20 thẻ tiện ích sạch trước 15/09/2026.  
**Bất biến:** Production `v3.419.0` khóa; `deals_feed.json = []`; voucher = 0; affiliate = false; không có CTA mua hàng.

## 1. Chốt kỹ thuật hiện tại

- JAYT-276 đã tiêu thụ quota máy cho 3 URL nhưng lỗi mạng; không chạy lại script đó.
- JAYT-278 đã xác minh qua browser rằng 3 trang lá hiển thị đúng identity và supporting span.
- JAYT-279 đã có contract/validator. Thiếu duy nhất raw HTTP attachment do Operator thu từ máy trạm có mạng.
- 3 thẻ chưa phải `PUBLIC_APPROVED`; Public Staging vẫn chỉ có GitHub Pilot.

## 2. Làn hành động A — 3 thẻ Go-Live Pha 1

| Owner | Hạn | Deliverable / Definition of Done |
|---|---:|---|
| Lead Operator | T+2h | Dùng browser máy trạm sạch, lưu nguyên bản response body HTML/PDF của UED, Cầu Rồng và DanaBus; xuất headers đã redact, timestamp UTC và SHA-256. Đặt từng cặp vào vault theo JAYT-279. |
| Data & Trust | T+2h15 | Chạy `validate_jayt_279_operator_raw_attachments.js`; xác nhận HTTP 200, full-byte hash và UTF-8 span offset khớp. Lập Provenance Seal cho từng mục pass. |
| CEO | T+2h30 | Thẩm định item-by-item: nguồn là leaf page, thông tin trực tiếp đúng thẻ, thời hiệu phù hợp, không có claim giá/voucher/affiliate. Chỉ mục pass mới được ký `PUBLIC_APPROVED`. |
| Engineering | T+3h30 | Cập nhật registry/source-of-truth và Staging-only DOM với 3 thẻ đã ký; mỗi thẻ chỉ có tên, trích đoạn căn cứ, ngày nguồn và nút “Mở nguồn chính thức”. |
| QA | T+4h | Kiểm tra 390px/768px/1440px, console, contrast, link safety, số thẻ = 4 (GitHub + 3), không feed mutation/affiliate. Xuất receipt. |

**Điều kiện dừng:** thiếu bất kỳ attachment hoặc validator fail thì mục đó không render; các mục pass vẫn có thể phát hành độc lập trên Staging.

## 3. Làn hành động B — 25 mục còn lại, không bỏ quên

| Cohort | Số mục | Owner | Thời hạn đề xuất leaf page | Tiêu chuẩn đầu ra |
|---|---:|---|---:|---|
| Hòa Khánh | 3 | Growth + Data & Trust | 05/09 | URL official leaf page năm 2025–2026, title/date/span khớp mục tiêu |
| An Thượng | 6 | Growth + UX/CX | 06/09 | Dossier địa bàn và URL leaf page, loại trừ homepage/archived page |
| Hải Châu | 6 | Product + Data & Trust | 07/09 | Dossier dịch vụ công/địa điểm, nguồn chính thức và span định danh |
| Tiện ích số | 5 | Engineering + Data & Trust | 08/09 | Leaf page hoặc documentation hiện hành; không dùng SPA shell |
| Đề xuất 03B đã lỗi intake | 3 | Lead Operator | 04/09 | Hoàn tất raw attachment JAYT-279 hoặc đề xuất source replacement, không retry script cũ |
| Kiểm soát danh mục | 2 | QA + CEO | Mỗi ngày 17:00 | Dedup, stale-date check, source-domain check và quyết định cohort kế tiếp |

Mỗi cohort nộp `STATIC_LEAF_PAGE_PROPOSALS` trước. Chỉ khi CEO ban hành scope capture riêng cho cohort đó, Operator mới được thu raw bytes.

## 4. Mốc 15–20 thẻ sạch trước 15/09/2026

- **04/09:** 3 thẻ Pha 1 đạt receipt/được ký hoặc có source replacement rõ ràng.
- **05–08/09:** 20 URL leaf page hợp lệ được đề xuất tĩnh và kiểm tra niên hạn/identity.
- **09–11/09:** Các đợt operator intake nhỏ (tối đa 5 URL/lệnh), hash/span/provenance seal.
- **12–14/09:** CEO ký theo item; Engineering chỉ release các mục pass; QA chạy regression sau từng cohort.
- **15/09:** Mục tiêu 15–20 thẻ Staging đã `PUBLIC_APPROVED`; nếu một cohort không pass, thay bằng mục pass từ cohort khác, không hạ chuẩn evidence.

## 5. Báo cáo bắt buộc mỗi 24 giờ

1. **Fail-closed audit:** số URL được phép, số raw attachment đủ 5 điều kiện, số quarantine và lý do.
2. **Giải pháp hành động:** owner đang làm gì tiếp theo cho từng blocker, với đường dẫn artifact dự kiến.
3. **Timebox:** mốc kế tiếp trong 24 giờ, owner và tiêu chí pass/fail.

