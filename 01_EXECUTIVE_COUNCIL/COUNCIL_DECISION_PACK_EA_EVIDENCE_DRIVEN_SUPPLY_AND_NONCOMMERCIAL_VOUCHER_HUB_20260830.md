# BỘ HỒ SƠ HỘI ĐỒNG LIÊN BỘ — JAYT SECTION EA
## NẠP NGUỒN CUNG CÓ CHỨNG CỨ, KHÓA TOÀN BỘ AFFILIATE/VOUCHER CHƯA CÓ BẰNG CHỨNG & XÂY DỰNG VOUCHER HUB PHI THƯƠNG MẠI

**Mã hồ sơ:** `COUNCIL_DECISION_PACK_EA_EVIDENCE_DRIVEN_SUPPLY_AND_NONCOMMERCIAL_VOUCHER_HUB_20260830`  
**Phiên bản Staging SOT:** `v3.455.0-staging.ea`  
**Chỉ thị chỉ đạo:** JAYT-245 Mục EA (Dòng 3128–3159)  
**Địa chỉ Staging hoạt động:** `http://127.0.0.1:4173/`  
**HTTP Status:** `200 OK` (Content-Type: `text/html; charset=utf-8`)  
**Thời gian lập hồ sơ:** 2026-08-30T18:16:00+07:00  
**Trạng thái Quản trị:** `PENDING_CEO_LIVE_REVIEW` (Tiếp tục nâng cấp, không Go-Live)

---

### I. BIÊN BẢN ĐÁNH GIÁ 7 PHÒNG BAN LIÊN BỘ (SECTION EA)

| Phòng ban | Báo cáo hành động thực tế | Trạng thái kỹ thuật |
| :--- | :--- | :---: |
| **1. Product** | **Bác Bỏ Toàn Bộ Đề Xuất Giá/Mã Bên Thứ Ba Chưa Có Authority:** Khóa cứng số lượng Tier 1 Deal ở mức `0`. Thiết lập Voucher Hub ở trạng thái non-commercial `CHƯA CÓ VOUCHER ĐỦ CHỨNG CỨ`, trang bị bộ lọc theo 5 nhu cầu sinh viên thiết yếu (KTX, Đi lại, Rạp phim, Học tập, Tiêu dùng). | **READY_FOR_CEO_REVIEW** |
| **2. Design** | **Thiết Kế Voucher Hub Phi Thương Mại:** Giao diện tối giản, trang nhã, không sử dụng logo thương hiệu/ảnh sản phẩm/giá/mã giả. Giữ vững diện mạo F&B no-image Huỳnh Thúc Kháng `🍜` và 3 visual cards thực địa Đà Nẵng đã được cấp phép. | **READY_FOR_CEO_REVIEW** |
| **3. UX/CX** | **Minh Bạch Hóa 5 Trường Bắt Buộc Của Tier 1:** Khuyến nghị người dùng: `Chỉ công bố mã giảm giá khi có đủ 5 trường: Mô tả ưu đãi, Điều khoản, Thời hạn, Phạm vi Đà Nẵng, Tổng chi phí thực tế.` Tuyệt đối không có nút `sao chép mã`, không yêu cầu đăng ký ngân hàng hay KYC/CPA. | **READY_FOR_CEO_REVIEW** |
| **4. Growth** | **Duy Trì Trạng Thái AccessTrade `PORTAL_ACCESS_NOT_VERIFIED`:** 100% merchant trong `JAYT_AFFILIATE_RESEARCH_PORTFOLIO_OFFLINE.json` giữ ở `RESEARCH_LEAD`. Cam kết **0 affiliate link, 0 Sub-ID, 0 cookie tracking, 0 conversion script**. | **READY_FOR_CEO_REVIEW** |
| **5. Data & Trust** | **Thiết Lập Khung Dữ Liệu Section EA:** Xuất bản `staging_ea_voucher_hub_state.json` và `staging_ea_no_write_attestation.json`. Nhúng dấu vân tay ledger SHA-256 `f528c91c579613bded003bd8f1ec24c461f6fcbab705a36ad213c089183c880a` vào runtime DOM. | **READY_FOR_CEO_REVIEW** |
| **6. Engineering** | Đóng gói SOT `jayt_storefront_staging_ea.js`, bổ sung view `VOUCHER_HUB` và nút điều hướng `Voucher (0)`, phục vụ ổn định trên máy chủ Staging `http://127.0.0.1:4173/` (`HTTP 200 OK`), **0 lỗi console error, 0 cảnh báo console warning**. | **READY_FOR_CEO_REVIEW** |
| **7. QA** | Quét sạch toàn bộ DOM/JS theo allowlist/denylist: **0 vi phạm thuật ngữ isclix/sub_id/CPA/KYC/copilot**; kiểm thử 32/32 static contract & security checks; sản xuất 16/16 capture proofs độc bản với 16 mã băm SHA-256 riêng biệt. | **READY_FOR_CEO_REVIEW** |

---

### II. DẤU VÂN TAY RUNTIME FINGERPRINT & TRẠNG THÁI VOUCHER HUB EA

Theo [`00_PROGRAM_BASELINE/JAYT_PUBLIC_COUNT_LEDGER_EA.json`](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/00_PROGRAM_BASELINE/JAYT_PUBLIC_COUNT_LEDGER_EA.json) và [`07_QUALITY_ASSURANCE/staging_ea_voucher_hub_state.json`](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/07_QUALITY_ASSURANCE/staging_ea_voucher_hub_state.json):

```html
<body class="app-root theme-light" 
      data-ledger-version="v3.455.0-staging.ea" 
      data-ledger-sha256="f528c91c579613bded003bd8f1ec24c461f6fcbab705a36ad213c089183c880a" 
      data-count-an-gi="11" 
      data-count-di-dau="14" 
      data-count-tien-ich="13" 
      data-count-mua-sam="12" 
      data-count-total="50"
      data-count-vouchers="0">
```

| Thành phần kiểm soát EA | Trạng thái kỹ thuật | Ý nghĩa & Hàng rào bảo vệ |
| :--- | :---: | :--- |
| **Voucher Hub State** | `CHƯA_CÓ_VOUCHER_ĐỦ_CHỨNG_CỨ` | Tuân thủ triệt để nguyên tắc Fail-Closed: Khóa toàn bộ deal/voucher khi chưa đủ chứng cứ. |
| **Số Lượng Voucher Public** | **0** | Không hiển thị bất kỳ mã giảm giá hay chương trình chiết khấu giả định nào. |
| **Số Lượng Tier 1 Deals** | **0** | Chưa mở deal thương mại khi chưa có hợp đồng kiểm định giá thực DH. |
| **Số Lượng Affiliate Links** | **0** | Quét toàn diện HTML/JS: Tuyệt đối không chứa `go.isclix`, deeplink, hay tracking parameter. |
| **Quyền AccessTrade Portal** | `PORTAL_ACCESS_NOT_VERIFIED` | Không tạo campaign, không đăng ký API, không dùng token/secret, không KYC khách hàng. |

---

### III. BẢNG ĐIỂM NGUỒN CUNG TOÀN DIỆN (SUPPLY PIPELINE SCORECARD EA)

| Giai đoạn Pipeline | Số lượng Items | Định nghĩa & Trạng thái |
| :--- | :---: | :--- |
| **1. DISCOVERY_LEAD** | **1** | `CAND_BUN_CHA_CA_109` (cô lập khỏi domain chính quyền chung `danang.gov.vn`). |
| **2. CAPTURE_RETRY_REQUIRED** | **1** | `CAND_COM_GA_A_HAI` (Facebook login/script barrier $\rightarrow$ `UNVERIFIED_BLOCKED_DYNAMIC_SHELL`). |
| **3. CANONICAL_SOURCE_FOUND** | **7** | `TNGO`, `METIZ`, `STARLIGHT`, `DOMINOS`, `GITHUB_EDU`, `JETBRAINS_EDU`, `HIGHLANDS`. |
| **4. CAPTURE_PENDING** | **5** | Đang xếp hàng đối soát biểu giá/quy chế chi tiết (`BUS_R16A`, `DUT`, `DUND`, `LOTTERIA`, `NOTION`). |
| **5. EVIDENCE_COMPLETE** | **0** | Đầy đủ hợp đồng/chứng cứ giá thực. |
| **6. PUBLIC_TOTAL_ACTIVE** | **50** | **20 Cổng chính thức (T2) + 13 Tiện ích công cộng (T3) + 17 Radar theo dõi (T4)**. |
| **7. T1_DEAL_ELIGIBLE** | **0** | **Khóa Fail-closed (0 Deal thương mại khi chưa đủ 5 trường đối soát bắt buộc)**. |
| **8. VOUCHERS_ELIGIBLE** | **0** | **Khóa Fail-closed (0 Voucher khi chưa có chứng cứ)**. |

---

### IV. BỘ 16 BẢN GHI CAPTURE PROOF MỚI (BROWSER PACK EA)

Toàn bộ 16 ảnh chụp kiểm thử tự động tại thời điểm live server hoạt động đạt **16/16 mã băm SHA-256 hoàn toàn riêng biệt**, được lưu trữ tại `07_QUALITY_ASSURANCE/browser_pack_ea/`:

1. `00_desktop_1440_visual_slate_proof.png` (1.086.630 bytes, SHA-256: `067b5489b667e1a3...`)
2. `01_desktop_1440_landmark_hero.png` (496.224 bytes, SHA-256: `4257ffdc5957daca...`)
3. `02_desktop_1440_featured_deals.png` (403.122 bytes, SHA-256: `e6bba70d7b1cef28...`)
4. `03_desktop_1440_culinary_story.png` (134.133 bytes, SHA-256: `2aea1495852b2b3a...`)
5. `04_desktop_1440_transit_story.png` (240.982 bytes, SHA-256: `526a9c8286c71ecc...`)
6. `05_desktop_1440_leisure_story.png` (147.449 bytes, SHA-256: `9f542ec458056f7c...`)
7. `06_desktop_1440_three_lane_wallet.png` (181.740 bytes, SHA-256: `469e98411302aa47...`)
8. `07_desktop_1440_explore_directory.png` (124.255 bytes, SHA-256: `8fbe2cfc9a8bac21...`)
9. `08_desktop_1440_dark_mode.png` (495.990 bytes, SHA-256: `4f234cf4b81acb31...`)
10. `09_desktop_1440_reduced_motion.png` (395.744 bytes, SHA-256: `1c9e23471b5c737b...`)
11. `10_tablet_768_modern_bento.png` (362.207 bytes, SHA-256: `3b6b27d55bd9be9d...`)
12. `11_mobile_390_fresh_load_first_fold.png` (174.720 bytes, SHA-256: `a3402ed5159ce525...`)
13. `12_mobile_390_food_journey_route.png` (51.152 bytes, SHA-256: `91d6fe18342b1ae1...`)
14. `13_mobile_390_three_lane_wallet.png` (69.253 bytes, SHA-256: `db72f36ee8a1e97e...`)
15. `14_progressive_disclosure_drawer_open.png` (279.055 bytes, SHA-256: `dbb6e89dde9d4be3...`)
16. `15_buy_decision_interactive.png` (74.061 bytes, SHA-256: `9a6ff703821bfb82...`)

---

### V. CAM KẾT VẬN HÀNH & HÀNG RÀO AN TOÀN

1. **Khóa phát hành Production:** Tiếp tục duy trì trên Staging local `http://127.0.0.1:4173/`, không phát tán ra production khi chưa có phê duyệt từ CEO.
2. **Không Affiliate write / Zero-PII:** Duy trì 100% không chèn mã affiliate, không thu thập cookie hay secret của người dùng.
3. **Kính trình CEO trực tiếp mở trình duyệt kiểm tra live tại `http://127.0.0.1:4173/` và kiểm tra giao diện Voucher Hub phi thương mại.**
