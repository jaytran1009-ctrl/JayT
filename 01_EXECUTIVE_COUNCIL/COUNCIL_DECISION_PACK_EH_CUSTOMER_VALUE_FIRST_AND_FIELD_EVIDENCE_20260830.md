# BỘ HỒ SƠ HỘI ĐỒNG LIÊN BỘ — JAYT SECTION EH
## GIÁ TRỊ KHÁCH HÀNG TRƯỚC: FIELD EVIDENCE THẬT, 3 LỐI VÀO MINH BẠCH VÀ HỒ SƠ QUYỀN SVG NỘI BỘ

**Mã hồ sơ:** `COUNCIL_DECISION_PACK_EH_CUSTOMER_VALUE_FIRST_AND_FIELD_EVIDENCE_20260830`  
**Phiên bản Staging SOT:** `v3.462.0-staging.eh`  
**Chỉ thị chỉ đạo:** JAYT-245 Mục EH (Dòng 3342–3370)  
**Địa chỉ Staging hoạt động:** `http://127.0.0.1:4173/`  
**HTTP Status:** `200 OK` (Content-Type: `text/html; charset=utf-8`)  
**Thời gian lập hồ sơ:** 2026-08-30T19:12:00+07:00  
**Trạng thái Quản trị:** `PENDING_CEO_LIVE_REVIEW` (Tiếp tục nâng cấp, không Go-Live)

---

### I. BIÊN BẢN ĐÁNH GIÁ 7 PHÒNG BAN LIÊN BỘ (SECTION EH)

| Phòng ban | Báo cáo hành động thực tế | Trạng thái kỹ thuật |
| :--- | :--- | :---: |
| **1. Product** | **Tập Trung 100% Vào Giá Trị Khách Hàng:** Không thêm bề mặt quản trị thừa. Người dùng vào trang lập tức nắm bắt được 3 hành trình: khám phá hôm nay, tra cứu chính sách học đường và kiểm tra quyền lợi trước khi chi tiêu. | **READY_FOR_CEO_REVIEW** |
| **2. Design** | **Art-Direction Nhịp Đà Nẵng Bản Địa:** Thiết kế tinh gọn, typography rõ ràng, CTA duy nhất dẫn về cổng chính thức của đơn vị vận hành; các tệp vector nội bộ được quản lý minh bạch với nhãn `Đồ họa JayT`. | **READY_FOR_CEO_REVIEW** |
| **3. UX/CX** | **Giảm Tải Nhận Thức & Trải Nghiệm Mượt Mà:** Loại bỏ hoàn toàn disclaimer dài dòng gây rối; chuyển thành các badge trạng thái thực tế: `Dùng hôm nay`, `Đang kiểm điều kiện`, `Theo dõi`. Drawer mở mượt mà kèm keyboard navigation hoàn hảo. | **READY_FOR_CEO_REVIEW** |
| **4. Growth** | **Chuyển Fact Thành Nguồn Cung Thực Dụng:** Tối ưu 12 ứng viên qua 4 lane thực địa (Xe buýt/Xe đạp công cộng, Rạp chiếu & Không gian học thuật, Chính sách sinh viên quốc tế/nội địa, Chuỗi tiêu dùng). | **READY_FOR_CEO_REVIEW** |
| **5. Data & Trust** | **Hồ Sơ Quyền SVG Nội Bộ Chuẩn Xác:** Ban hành `staging_eh_asset_ownership_record.json` xác định 4 SVG runtime ở trạng thái `INTERNAL_STAGING_VECTOR_DRAFT` (OPC JayT Product & Design Core sáng tạo). Không gán nhãn bản quyền production khi chưa đủ thủ tục pháp lý. | **READY_FOR_CEO_REVIEW** |
| **6. Engineering** | Đóng gói SOT `jayt_storefront_staging_eh.js`, nhúng dấu vân tay Ledger SHA-256 (`41b9c68ea5...`), phục vụ ổn định trên máy chủ Staging `http://127.0.0.1:4173/` (`HTTP 200 OK`), **0 lỗi console error, 0 cảnh báo console warning, 0 tệp JPEG, 0 chuỗi false provenance trong DOM**. | **READY_FOR_CEO_REVIEW** |
| **7. QA** | Kiểm thử **61/61 static contract, asset ownership, customer value & security checks**; audit 16/16 capture proofs độc bản với 16 mã băm SHA-256 riêng biệt; xác nhận 100% focusables $\ge 44\times 44\text{px}$. | **READY_FOR_CEO_REVIEW** |

---

### II. BẢNG TIẾN ĐỘ 4 LANE FIELD EVIDENCE (EVIDENCE MANIFEST EH)

Theo [`07_QUALITY_ASSURANCE/evidence_vault_eh/EVIDENCE_MANIFEST_EH.json`](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/07_QUALITY_ASSURANCE/evidence_vault_eh/EVIDENCE_MANIFEST_EH.json):

| Lane Nguồn Cung | Ứng Viên Khảo Sát | Cổng Chính Thức | Tình Trạng Thu Thập | Tóm Tắt Fact Cho Khách Hàng |
| :--- | :--- | :--- | :---: | :--- |
| **Lane A: Giao Thông & Di Chuyển Đô Thị** | DanaBus Tuyến R16A | `https://danangbus.vn/` | CANONICAL_SOURCE_FOUND | Xe buýt trợ giá nội đô — tra cứu lộ trình qua cổng chính thức. |
| | TNGo (Xe đạp công cộng) | `https://tngo.vn/` | CANONICAL_SOURCE_FOUND | Xe đạp công cộng ven sông Hàn & trường học — thuê qua app chính thức. |
| **Lane B: Rạp Chiếu & Không Gian Học Thuật** | Metiz Cinema (Helio) | `https://metiz.vn/` | CANONICAL_SOURCE_FOUND | Cụm rạp tại Helio Center — có giá vé thành viên/U22 theo lịch tại rạp. |
| | Starlight Cinema | `https://starlight.vn/` | CANONICAL_SOURCE_FOUND | Cụm rạp Nguyễn Kim Điện Biên Phủ — lịch chiếu trên cổng chính thức. |
| | Thư Viện ĐH Bách Khoa | `http://lib.dut.udn.vn/` | CAPTURE_PENDING | Cổng tra cứu mục lục phục vụ sinh viên tra cứu tài liệu học tập. |
| | TT Học Liệu ĐH Đà Nẵng | `http://clc.udn.vn/` | CAPTURE_PENDING | Không gian tự học và trung tâm học liệu thuộc Đại Học Đà Nẵng. |
| **Lane C: Chính Sách Học Đường & Công Cụ Số** | GitHub Student Pack | `https://education.github.com/pack` | CANONICAL_SOURCE_FOUND | Gói công cụ lập trình miễn phí cho sinh viên chính quy. |
| | JetBrains Education | `https://www.jetbrains.com/community/education/#students` | CANONICAL_SOURCE_FOUND | Giấy phép miễn phí trọn bộ IDE JetBrains với email .edu trường học. |
| **Lane D: Ẩm Thực & Tiêu Dùng** | Domino's Pizza | `https://dominos.vn/` | CANONICAL_SOURCE_FOUND | Hệ thống chuỗi pizza — tra cứu chi nhánh Đà Nẵng qua dominos.vn. |
| | Highlands Coffee | `https://highlandscoffee.com.vn/` | CANONICAL_SOURCE_FOUND | Chuỗi cà phê với nhiều chi nhánh tại Đà Nẵng — tra cứu trên cổng chính thức. |
| | Bún Chả Cá 109 | `https://danang.gov.vn/` | DISCOVERY_LEAD | Cơ sở ẩm thực lâu năm theo tuyển chọn của Cổng thông tin TP Đà Nẵng. |
| | Cơm Gà A Hải | `https://www.facebook.com/comgaahaidanang/` | CAPTURE_RETRY_REQUIRED | Cơ sở ẩm thực địa phương (Facebook dynamic shell, chờ capture). |

---

### III. HỒ SƠ QUYỀN SVG NỘI BỘ (ASSET OWNERSHIP RECORD EH)

Theo [`07_QUALITY_ASSURANCE/staging_eh_asset_ownership_record.json`](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/07_QUALITY_ASSURANCE/staging_eh_asset_ownership_record.json):

- **Đơn vị sáng tạo:** OPC JayT Product & Design Engineering Core.
- **Ngày tạo lập:** 2026-08-30.
- **Phạm vi cấp phép:** Internal Staging Vector Artwork for JayT Project (Staging Use Only).
- **Trạng thái sở hữu:** `INTERNAL_STAGING_VECTOR_DRAFT` (Chỉ định rõ là bản thảo thử nghiệm staging, không tuyên xưng bản quyền hoàn tất của production).
- **Nhãn hiển thị UI:** `🎨 Đồ họa JayT`.

---

### IV. BỘ 16 BẢN GHI CAPTURE PROOF MỚI (BROWSER PACK EH)

Toàn bộ 16 ảnh chụp kiểm thử tự động tại thời điểm live server hoạt động đạt **16/16 mã băm SHA-256 hoàn toàn riêng biệt**, được lưu trữ tại `07_QUALITY_ASSURANCE/browser_pack_eh/`:

1. `00_desktop_1440_visual_slate_proof.png` (175.428 bytes, SHA-256: `2fa8698b0fb844b7...`)
2. `01_desktop_1440_landmark_hero.png` (221.387 bytes, SHA-256: `0009349c249c92b5...` — **Vector Hero & Đồ họa JayT**)
3. `02_desktop_1440_featured_deals.png` (229.057 bytes, SHA-256: `73e031663d4bce9a...`)
4. `03_desktop_1440_culinary_story.png` (133.412 bytes, SHA-256: `7fd7b46b82981236...`)
5. `04_desktop_1440_transit_story.png` (173.425 bytes, SHA-256: `1635385fa0609bbc...`)
6. `05_desktop_1440_leisure_story.png` (146.684 bytes, SHA-256: `796be04fe94bbbba...`)
7. `06_desktop_1440_three_lane_wallet.png` (181.061 bytes, SHA-256: `e05b92d5ca5eab60...`)
8. `07_desktop_1440_explore_directory.png` (123.535 bytes, SHA-256: `b175f1f0006e712e...`)
9. `08_desktop_1440_dark_mode.png` (223.223 bytes, SHA-256: `8ba5a6401e2af243...`)
10. `09_desktop_1440_reduced_motion.png` (213.042 bytes, SHA-256: `6fe877842b944395...`)
11. `10_tablet_768_modern_bento.png` (161.598 bytes, SHA-256: `3c5c2757793c6ada...`)
12. `11_mobile_390_fresh_load_first_fold.png` (111.006 bytes, SHA-256: `5d93720517d7b8bc...`)
13. `12_mobile_390_food_journey_route.png` (50.905 bytes, SHA-256: `77c89b66e5ef4717...`)
14. `13_mobile_390_three_lane_wallet.png` (69.013 bytes, SHA-256: `7d34c4851b0e5e62...`)
15. `14_progressive_disclosure_drawer_open.png` (278.765 bytes, SHA-256: `140fd737f024dc62...`)
16. `15_buy_decision_interactive.png` (73.420 bytes, SHA-256: `bafed52b73fab0d1...`)

---

### V. CAM KẾT VẬN HÀNH & HÀNG RÀO AN TOÀN

1. **Khóa phát hành Production:** Tiếp tục duy trì trên Staging local `http://127.0.0.1:4173/`, không phát tán ra production khi chưa có phê duyệt từ CEO.
2. **Không Affiliate write / Zero-PII:** Duy trì 100% không chèn mã affiliate, không thu thập cookie hay secret của người dùng.
3. **Kính trình CEO trực tiếp mở trình duyệt kiểm tra live tại `http://127.0.0.1:4173/` và kiểm tra hồ sơ `staging_eh_asset_ownership_record.json` cùng ma trận 4 lane nguồn cung.**
