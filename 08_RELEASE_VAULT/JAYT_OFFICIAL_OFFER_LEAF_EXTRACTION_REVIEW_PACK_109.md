# BÁO CÁO TRÍCH XUẤT ƯU ĐÃI CẤP CON TỪ NGUỒN CHÍNH THỨC (109)
**Mã Báo Cáo**: `JAYT-109-OFFICIAL-OFFER-LEAF-EXTRACTION-REVIEW-PACK`  
**Chỉ thị điều phối**: `JAYT-109-OFFICIAL-OFFER-LEAF-EXTRACTION`  
**Trạng thái**: `IMPLEMENTED_PENDING_CEO_AUDIT`  
**Thời điểm hoàn tất**: `2026-08-25T18:31:00+07:00`  
**Phiên bản hệ thống**: `PROJECT_MEMORY.md v3.217.0` (SHA-256: `d1d21f4291d893c9cdad34ec3a9b9e4caec3210f0745777e1954c6406f66cf44`)

---

## 1. TỔNG QUAN QUY TRÌNH

| Bước | Mô tả | Kết quả |
|---|---|---|
| **Bước 1** | Trích xuất link promo/ưu đãi/tin tức cấp con từ HTML thực tế 26 nguồn đã capture 108R (tối đa 5 link/nguồn) | 84 candidate leaf URLs |
| **Bước 2** | Capture thực tế từng leaf page: URL cuối, HTML/text, screenshot, SHA-256, ngày quan sát | 84/84 leaf pages crawled |
| **Bước 3** | Đánh giá 4 tiêu chí nghiêm ngặt: ưu đãi cụ thể, điều kiện, hạn dùng, phạm vi Đà Nẵng | 19 đủ 4/4 · 65 thiếu ≥1 tiêu chí |
| **Bước 4** | Phân loại: `OFFER_CANDIDATE_FOR_CEO_REVIEW` / `INCOMPLETE_SOURCE_WATCHLIST` / `BLOCKED_BY_APP_OR_AUTH` | Xem bảng chi tiết bên dưới |

> [!IMPORTANT]
> **19 OFFER CANDIDATES không phải 19 deals của JayT**. Đây là 19 trang trên website gốc của thương hiệu mà hệ thống regex đánh giá sơ bộ khớp 4 tiêu chí. CEO cần thẩm định từng mục trước khi quyết định xây dựng deal thật.

---

## 2. NHÓM A: ĐỦ ĐIỀU KIỆN REVIEW (19 MỤC — `OFFER_CANDIDATE_FOR_CEO_REVIEW`)

Mỗi mục đều có capture thực tế (page.txt + screenshot + SHA-256) trên đĩa tại `05_DEAL_AND_AFFILIATE/batch_capture_109/captures_109/`.

### 🍗 F&B (4 mục)
| # | Brand | Leaf ID | URL | Anchor Text |
|---|---|---|---|---|
| 1 | Jollibee Vietnam | `TARGET_108_01_JOLLIBEE_LEAF_03` | jollibee.com.vn/tin-tuc | Tin Tức |
| 2 | Jollibee Vietnam | `TARGET_108_01_JOLLIBEE_LEAF_04` | jollibee.com.vn/blog/post/… | (blog entry) |
| 3 | Katinat Saigon Kafe | `TARGET_108_12_KATINAT_LEAF_02` | katinat.vn/tin-tuc-su-kien/ | Tin Tức & Sự Kiện |
| 4 | Katinat Saigon Kafe | `TARGET_108_12_KATINAT_LEAF_03` | katinat.vn/category/tin-tuc-su-kien/ | Tin Tức & Sự Kiện |

### 🎬 CINEMA (10 mục)
| # | Brand | Leaf ID | URL | Anchor Text |
|---|---|---|---|---|
| 5 | CGV Cinemas | `TARGET_108_14_CGV_LEAF_01` | cgv.vn/default/newsoffer/uu-dai-online/ | (ưu đãi online) |
| 6 | CGV Cinemas | `TARGET_108_14_CGV_LEAF_02` | cgv.vn/default/newsoffer/cgv-vnpay-vietin/ | (CGV VNPay VietinBank) |
| 7 | CGV Cinemas | `TARGET_108_14_CGV_LEAF_05` | cgv.vn/default/theaters/special/3d | Rạp 3D |
| 8 | Starlight Cinema | `TARGET_108_17_STARLIGHT_LEAF_01` | starlight.vn/uu-dai.html | Khuyến Mãi |
| 9 | Starlight Cinema | `TARGET_108_17_STARLIGHT_LEAF_02` | starlight.vn/tin-tuc.html | Điện Ảnh |
| 10 | Starlight Cinema | `TARGET_108_17_STARLIGHT_LEAF_03` | starlight.vn/uu-dai/…deal-10k… | (Hè rộn ràng deal 10K) |
| 11 | Starlight Cinema | `TARGET_108_17_STARLIGHT_LEAF_04` | starlight.vn/uu-dai/ct-u22-rap-starlight… | (CT U22 Starlight) |
| 12 | Starlight Cinema | `TARGET_108_17_STARLIGHT_LEAF_05` | starlight.vn/uu-dai/thu-3-phim-viet… | (Thứ 3 Phim Việt) |
| 13 | CGV Cinemas | `TARGET_108_18_CGV_U22_LEAF_01` | cgv.vn/default/newsoffer/uu-dai-online/ | (ưu đãi online) |
| 14 | CGV Cinemas | `TARGET_108_18_CGV_U22_LEAF_05` | cgv.vn/default/theaters/special/3d | Rạp 3D |

### 🚗 MOBILITY (5 mục)
| # | Brand | Leaf ID | URL | Anchor Text |
|---|---|---|---|---|
| 15 | Be Group | `TARGET_108_21_BE_LEAF_02` | be.com.vn/…uu-dai-cua-cake… | Ưu đãi của Cake dành cho khách hàng Be |
| 16 | Be Group | `TARGET_108_21_BE_LEAF_05` | be.com.vn/…thay-doi-nhan-dien… | Câu Chuyện của Be |
| 17 | TNGo Xe Đạp | `TARGET_108_23_TNGO_LEAF_02` | tngo.vn/vi/news/…thu-tuong… | (Thủ tướng đạp xe TNGo) |
| 18 | TNGo Xe Đạp | `TARGET_108_23_TNGO_LEAF_03` | tngo.vn/vi/news/unbox-ve-thang… | Ngập tràn tiện ích |
| 19 | TNGo Xe Đạp | `TARGET_108_23_TNGO_LEAF_04` | tngo.vn/vi/news/dung-ve-thang-20000vnd… | Dừng dịch vụ "Vé Tháng 20K" |

> [!WARNING]
> **Lưu ý quan trọng cho CEO khi thẩm định**:
> - Mục #1–4 (Jollibee, Katinat): Chủ yếu là trang tin tức tổng hợp, regex match rộng. CEO nên đọc capture text để xác nhận có ưu đãi cụ thể hay chỉ là feed tin.
> - Mục #5–14 (CGV, Starlight): Trang ưu đãi rạp, nhưng cần xác nhận áp dụng tại Đà Nẵng cụ thể, không chỉ "toàn hệ thống".
> - Mục #15–16 (Be Group): Nội dung dạng PR / rebrand, chưa chắc là ưu đãi thật cho end-user.
> - Mục #17–19 (TNGo): Liên quan vé tháng xe đạp đô thị, nhưng #19 là thông báo **dừng** dịch vụ.

---

## 3. NHÓM B: THIẾU ĐIỀU KIỆN (65 MỤC — `INCOMPLETE_SOURCE_WATCHLIST`)

Các mục này thiếu ≥1 trong 4 tiêu chí (ưu đãi, điều kiện, hạn dùng, phạm vi). Không hiển thị giá/mã/CTA deal cho nhóm này.

**Phân bổ theo thương hiệu**:

| Brand | Số mục | Lý do chính |
|---|---|---|
| KFC Vietnam | 5 | Trang menu/combo không có giá cụ thể/hạn dùng |
| Gogi House | 1 | Trang thực đơn, không chứa ưu đãi |
| Phê La | 3 | Trang danh mục + tin tức, không chứa deal |
| Gong Cha | 3 | Menu/thành viên/tin tức, thiếu ưu đãi cụ thể |
| Highlands Coffee | 1 | Trang tin tức, thiếu scope |
| Phúc Long | 5 | Trang menu sản phẩm, không nêu ưu đãi |
| Katinat | 2 | Menu/tuyển dụng |
| Galaxy Cinema | 5 | Trang ưu đãi rạp — thiếu scope Đà Nẵng |
| CGV | 3 | Trang sự kiện/tin tức, thiếu tiêu chí |
| Metiz Cinema | 3 | Ưu đãi rạp, thiếu scope/hạn dùng |
| Lotte Cinema | 5 | Ưu đãi rạp — thiếu scope Đà Nẵng chứng minh |
| Xanh SM | 3 | Trang tin tức/khuyến mãi chung |
| DanaBus | 5 | Tin tức xe buýt, không phải ưu đãi |
| TNGo | 1 | Tin tức, thiếu tiêu chí |
| WinMart+ | 2 | Trang ưu đãi hội viên/sản phẩm |
| Cổng TT Đà Nẵng (Chợ Cồn) | 5 | Tin tức hành chính |
| Cổng TT Đà Nẵng (Chợ Hàn) | 5 | Tin tức hành chính |
| Starlight Cinema | 0 | (tất cả 5 leaf đã đủ ĐK, thuộc Nhóm A) |
| Be Group | 3 | Tin tức/PR, thiếu ưu đãi cụ thể |

---

## 4. NHÓM C: CHẶN BỞI APP / AUTH (0 MỤC)

Không có leaf page nào bị chặn bởi yêu cầu đăng nhập hoặc tải app.

---

## 5. KHẲNG ĐỊNH QUẢN TRỊ BẮT BUỘC

- **Trạng thái**: `IMPLEMENTED_PENDING_CEO_AUDIT`
- **Sản xuất khóa**: `deals_feed.json: []`, `is_approved: false`
- **Không tự tạo**: candidate, affiliate link, staging deployment, production change.
- **Toàn bộ evidence**: `05_DEAL_AND_AFFILIATE/batch_capture_109/captures_109/` (84 thư mục con, mỗi thư mục chứa `page.txt`, `page.html`, `screenshot.png`, `metadata.json`).
- **Manifest chi tiết**: [`official_offer_leaf_manifest_109.json`](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/05_DEAL_AND_AFFILIATE/official_offer_leaf_manifest_109.json)

---

## 6. BÀN GIAO QUẢN TRỊ BẮT BUỘC (GOVERNANCE HANDOVER BLOCK)
1. **Phiên bản**: `PROJECT_MEMORY.md v3.217.0`
2. **SHA-256**: `d1d21f4291d893c9cdad34ec3a9b9e4caec3210f0745777e1954c6406f66cf44`
3. **Chỉ thị**: `JAYT-109-OFFICIAL-OFFER-LEAF-EXTRACTION` — `IMPLEMENTED_PENDING_CEO_AUDIT`
4. **Đường dẫn**:
```text
D:\Công Việc MMO\OPC JayT\JayT-Dự Án Giá Trị Cộng Đồng\PROJECT_MEMORY.md
```
