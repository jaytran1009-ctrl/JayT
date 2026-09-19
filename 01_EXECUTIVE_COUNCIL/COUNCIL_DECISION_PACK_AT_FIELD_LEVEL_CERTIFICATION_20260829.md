# HỘI ĐỒNG ĐIỀU HÀNH JAYT: DECISION PACK TRÌNH DUYỆT CHỨNG NHẬN FIELD-LEVEL & REVISION AT (MỤC AT — JAYT-245)

**Thời gian lập:** 2026-08-29T01:59:00+07:00  
**Địa điểm:** Trực tuyến / Phòng Điều hành JayT  
**Chủ trì:** Hội đồng Điều hành 7 Phòng ban  
**Căn cứ chỉ thị:** [JAYT-245 — Tổng Chỉ Thị CEO Duy Nhất Về Vận Hành Và Go-Live JayT (Mục AT)](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/02_CEO_DIRECTIVES/JAYT-245_TONG_CHI_THI_CEO_DUY_NHAT_VAN_HANH_JAYT.md)  
**Địa chỉ Revision Staging AT Độc Lập:** [https://jayt-storefront-staging-at.vercel.app](https://jayt-storefront-staging-at.vercel.app) (`v3.420.3-staging.at`)  
**Địa chỉ Staging AS Cũ (Lưu So Sánh):** [https://jayt-storefront-staging-as.vercel.app](https://jayt-storefront-staging-as.vercel.app) (`v3.420.2-staging.as`)  
**Địa chỉ Staging AR Cũ (Lưu So Sánh):** [https://jayt-storefront-staging-ar.vercel.app](https://jayt-storefront-staging-ar.vercel.app) (`v3.420.1-staging.ar`)  
**Địa chỉ Staging AQ Cũ (Lưu So Sánh):** [https://jayt-storefront-staging.vercel.app](https://jayt-storefront-staging.vercel.app) (`v3.420.0-staging.ak`)  
**Địa chỉ Production Rollback Khóa:** [https://deploy-ten-xi-48.vercel.app](https://deploy-ten-xi-48.vercel.app) (`v3.419.0`)  
**Staging AT Release Receipt:** [staging_release_receipt_v34203_staging_at.json](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/07_QUALITY_ASSURANCE/staging_release_receipt_v34203_staging_at.json)  
**Tài Liệu Ràng Buộc Bất Biến:** [PUBLIC_CARD_EVIDENCE_BINDING_AT.json](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/06_TRUST_AND_EVIDENCE/PUBLIC_CARD_EVIDENCE_BINDING_AT.json)  
**Biên Bản Cô Lập Vi Phạm:** [CONTAINMENT_RECORD_CGV_ZALOPAY_AT.json](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/06_TRUST_AND_EVIDENCE/containment_records/CONTAINMENT_RECORD_CGV_ZALOPAY_AT.json)  
**Trạng thái Quản trị:** `AT FIELD-LEVEL CERTIFICATION & ISOLATION REVISION SUBMISSION — READY FOR DIRECT CEO EVALUATION`

---

## 1. Môi Trường Triển Khai & Bảng So Sánh 5 Baseline

| Thông Số | Môi Trường Revision AT (`v3.420.3-staging.at`) | Môi Trường Staging AS (`v3.420.2-staging.as`) | Môi Trường Staging AR (`v3.420.1-staging.ar`) | Môi Trường Staging AQ (`v3.420.0-staging.ak`) | Môi Trường Production Rollback (`v3.419.0`) |
|---|---|---|---|---|---|
| **URL Truy Cập** | [https://jayt-storefront-staging-at.vercel.app](https://jayt-storefront-staging-at.vercel.app) | [https://jayt-storefront-staging-as.vercel.app](https://jayt-storefront-staging-as.vercel.app) | [https://jayt-storefront-staging-ar.vercel.app](https://jayt-storefront-staging-ar.vercel.app) | [https://jayt-storefront-staging.vercel.app](https://jayt-storefront-staging.vercel.app) | [https://deploy-ten-xi-48.vercel.app](https://deploy-ten-xi-48.vercel.app) |
| **Mục Đích** | **Bản Revision Field-Level Certified & Cô Lập False Provenance** | Mốc review Supply Expansion | Mốc review UI Polish & Card System | Mốc review ban đầu | Chốt chặn an toàn Rollback Baseline |
| **Quy Mô Supply** | **Public Certified: 33 mục**<br>*(5 Deal + 9 Gói + 6 Điểm + 13 Radar)*<br>**Quarantine: 1 mục** | 34 mục (6 Deal + 9 Gói + 6 Điểm + 13 Radar) | 17 mục (0 Deal + 9 Gói + 0 Điểm + 8 Radar) | 17 mục (0 Deal + 9 Gói + 0 Điểm + 8 Radar) | 17 mục Dashboard kiểm chứng |
| **URL Primary Link** | **100% Exact Evidence URLs** (Không dùng URL trang chủ cho Deal) | Còn URL trang chủ ở Deal | URL trang chủ | URL trang chủ | URL dashboard |
| **Header Phân Định** | `X-JayT-Environment: STAGING_REVIEW_AT` | `X-JayT-Environment: STAGING_REVIEW_AS` | `X-JayT-Environment: STAGING_REVIEW_AR` | `X-JayT-Environment: STAGING_REVIEW` | `X-JayT-Environment: PRODUCTION` |
| **Trạng Thái** | **SẴN SÀNG CEO XEM TRỰC TIẾP** | **LƯU TRỮ ĐỐI CHIẾU** | **LƯU TRỮ ĐỐI CHIẾU** | **LƯU TRỮ ĐỐI CHIẾU** | **KHÓA AN TOÀN 100% (ROLLBACK BASELINE)** |

---

## 2. Báo Cáo Kế Toán Nguồn Cung Minh Bạch (AT Supply Accounting)

Thực hiện nghiêm chỉ thị AT.6: Báo cáo tách bạch 2 số lượng rõ ràng:

1. **Public Certified Now (Đã Được Chứng Thực Toàn Diện Từng Field): 33 mục**
   - **Tier 1 (Ưu Đãi / Deal Xác Minh): 5 mục** (Lotteria Happy Lunch 40k, Domino's BOGO T3/T5, Metiz U22 45k, Starlight Combo 10k, CGV VNPAY BOGO).
   - **Tier 2 (Chương Trình Chính Thức): 9 mục** (GitHub, Notion, Microsoft, Canva, Spotify, Apple Music, JetBrains, Figma, AWS Educate).
   - **Tier 3 (Địa Điểm & Tiện Ích Đô Thị): 6 mục** (Vé tháng DanaBus trợ giá 45k, Trạm xe đạp TNGO 5k/30p, Thư viện Tổng hợp Đà Nẵng, Cổng Dịch vụ công Đà Nẵng, Nhà sách Fahasa, Ga Đà Nẵng VNR).
   - **Tier 4 (Radar Theo Dõi Nguồn): 13 mục** (Galaxy Cinema, Lotte Cinema, KFC, Jollibee, Highlands, The Coffee House, Phúc Long, Vincom Plaza, Co.opmart, GO!, Long Châu, Pharmacity, WinMart).
2. **Candidate Awaiting Evidence / Quarantined: 1 mục**
   - `DEAL_120_CGV_ZALOPAY_12H`: Rút vĩnh viễn khỏi public storefront, đưa vào hồ sơ cô lập cách ly `CONTAINMENT_RECORD_CGV_ZALOPAY_AT.json` với lý do `NO_FIELD_LEVEL_EVIDENCE`.

---

## 3. Xử Lý Triệt Để 2 Card CGV Theo Chỉ Thị AT

| Thẻ Vi Phạm | Hành Động Xử Lý Mục AT | Trạng Thái Chứng Thực Mới |
|---|---|---|
| **CGV ZaloPay 50.000₫** (`DEAL_120_CGV_ZALOPAY_12H`) | **Rút hoàn toàn khỏi storefront công khai.** Chuyển vào hàng chờ cách ly, 0 xuất hiện dưới bất kỳ hình thức nào. | `QUARANTINED (NO_FIELD_LEVEL_EVIDENCE)` |
| **CGV VNPAY Mua 1 Tặng 1** (`DEAL_CGV_VNPAY_BOGO`) | **Rebuild 100% khớp từng byte raw capture:**<br>• Tiêu đề: *CGV Cinemas x VNPAY — Mua 1 Vé Tặng 1 Vé Xem Phim*<br>• URL: [https://www.cgv.vn/default/movies/offers/vnpay-bogo](https://www.cgv.vn/default/movies/offers/vnpay-bogo) (Exact page)<br>• Phạm vi: *Toàn quốc (Hệ thống rạp CGV gồm cả Đà Nẵng)*<br>• Thời hạn: *Từ nay đến 30/09/2026 (Số lượng phân bổ có hạn mỗi ngày)*<br>• Mã ưu đãi & Điều kiện: *Nhập mã MUA1TANG1 khi đặt vé CGV trên app ngân hàng / VNPAY* | `100% FIELD-LEVEL CERTIFIED` (Khớp capture `TARGET_108_14_CGV_LEAF_02`, SHA-256: `d6ffb923...`) |

---

## 4. Xóa Bỏ URL Trang Chủ Trên Toàn Bộ Tier 1 (Exact Link Contract)

Toàn bộ 5 Deal Tier 1 đã được xác minh liên kết trực tiếp tới trang chi tiết thể lệ/bảng giá chính thức:
1. **Lotteria Vietnam:** [https://www.lotteria.vn/menu/happy-lunch](https://www.lotteria.vn/menu/happy-lunch)
2. **Domino's Pizza:** [https://dominos.vn/khuyen-mai/mua-1-tang-1](https://dominos.vn/khuyen-mai/mua-1-tang-1)
3. **Metiz Cinema:** [https://metiz.vn/tin-tuc/khuyen-mai/gia-ve-u22-metiz/](https://metiz.vn/tin-tuc/khuyen-mai/gia-ve-u22-metiz/)
4. **Starlight Cinema:** [https://starlight.vn/khuyen-mai/combo-bap-nuoc-10k.html](https://starlight.vn/khuyen-mai/combo-bap-nuoc-10k.html)
5. **CGV Cinemas:** [https://www.cgv.vn/default/movies/offers/vnpay-bogo](https://www.cgv.vn/default/movies/offers/vnpay-bogo)

---

## 5. Bảng So Sánh Diff Giữa Revision AT (`v3.420.3-staging.at`) và Revision AS (`v3.420.2-staging.as`)

```diff
--- Revision AS (v3.420.2-staging.as)
+++ Revision AT (v3.420.3-staging.at)
@@ -1,18 +1,28 @@
- Nguồn cung công khai: 34 mục (6 Deal, 9 Gói, 6 Tiện ích, 13 Radar)
+ Nguồn cung công khai: 33 mục certified (5 Deal, 9 Gói, 6 Tiện ích, 13 Radar) + 1 Quarantined
- CGV ZaloPay 50.000₫: Xuất hiện trên trang chủ (False provenance - không có text trong raw capture)
+ CGV ZaloPay 50.000₫: ĐÃ RÚT HOÀN TOÀN KHỎI PUBLIC STOREFRONT & CÔ LẬP VÀO QUARANTINE
- CGV VNPAY BOGO: Ghi địa bàn Đà Nẵng, thiếu thời hạn, thiếu mã MUA1TANG1, CTA trỏ cgv.vn trang chủ
+ CGV VNPAY BOGO: Rebuild 100% khớp raw capture (Toàn quốc, hạn 30/09/2026, mã MUA1TANG1, CTA trỏ exact promo URL)
- URL Primary Link Deal: Dùng URL trang chủ cgv.vn & starlight.vn
+ URL Primary Link Deal: 100% Exact Evidence URLs chi tiết thể lệ/thực đơn
- Ràng buộc chứng thực: Báo cáo dashboard tổng thể
+ Ràng buộc chứng thực: Immutable PUBLIC_CARD_EVIDENCE_BINDING_AT.json kiểm tra từng field
```

---

## 6. Đề Xuất & Findings Của Hội Đồng Điều Hành 7 Phòng Ban (Tối Đa 10 Findings)

Hội đồng Điều hành 7 Phòng ban trân trọng nộp Decision Pack này lên CEO để CEO kiểm tra trực tiếp:

1. **Finding 1 (Cô lập false provenance):** Đã rút hoàn toàn `CGV ZaloPay 50.000₫` khỏi storefront công khai và lập hồ sơ cách ly `CONTAINMENT_RECORD_CGV_ZALOPAY_AT.json`.
2. **Finding 2 (Rebuild CGV VNPAY chuẩn xác):** Thẻ `CGV VNPAY BOGO` được tái thiết lập với 100% trường dữ liệu chuẩn từ raw capture (Mã `MUA1TANG1`, hạn `30/09/2026`, phạm vi Toàn quốc, số lượng có hạn mỗi ngày).
3. **Finding 3 (100% Exact URLs cho Deal):** Toàn bộ 5 Deal Tier 1 trỏ chính xác vào trang ưu đãi chi tiết, không còn bất kỳ link trang chủ chung chung nào.
4. **Finding 4 (Bảng ràng buộc bất biến):** Ban hành `PUBLIC_CARD_EVIDENCE_BINDING_AT.json` làm nguồn kiểm tra machine-checkable cho 33 mục public.
5. **Finding 5 (Kế toán nguồn cung trung thực):** Báo cáo tách bạch: `Public certified now: 33 mục` | `Candidate awaiting evidence: 1 mục`.
6. **Finding 6 (Mô tả riêng biệt):** Duy trì 100% tính riêng biệt cho cả 33 thẻ, hiển thị cụ thể Đối tượng, Thời gian, Điều kiện và Địa bàn.
7. **Finding 7 (Accessibility & UX):** Đạt chuẩn WCAG 2.1 AA, bẫy tiêu điểm modal hoàn chỉnh, chức năng bookmark phản hồi tức thời.
8. **Finding 8 (Độc lập hạ tầng):** Triển khai URL riêng `https://jayt-storefront-staging-at.vercel.app`, không đụng chạm đến bản AS, AR, AQ và khóa chặt Production rollback `v3.419.0`.
9. **Finding 9 (Affiliate Read-Only):** Giữ nghiêm trạng thái `PORTAL_ACCESS_NOT_VERIFIED`, không link tiếp thị, không CTA thương mại.
10. **Finding 10 (Đề xuất kế tiếp):** Kính mời CEO kiểm tra trực tiếp trên Staging URL AT để đưa ra phán quyết `REVISE`, `NO-SHIP` hoặc `SHIP` có điều kiện.

**Ký tên xác nhận bởi Hội đồng 7 Phòng ban:**  
*Product Directorate · Design System Authority · UX/CX Research Group · Growth & Partnerships · Data & Trust Security · Engineering Core · Quality Assurance Directorate*
