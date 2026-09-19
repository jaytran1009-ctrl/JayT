# HỘI ĐỒNG ĐIỀU HÀNH JAYT: BIÊN BẢN HỢP NHẤT P0 CÁCH LY EVIDENCE BUNDLE & QUÉT ALLOWLIST ĐỆ QUY (MỤC U — JAYT-245)

**Thời gian:** 2026-08-28T23:59:59+07:00  
**Địa điểm:** Trực tuyến / Phòng Điều hành JayT  
**Chủ trì:** Hội đồng Điều hành 7 Phòng ban  
**Căn cứ chỉ thị:** [JAYT-245 — Tổng Chỉ Thị CEO Duy Nhất Về Vận Hành Và Go-Live JayT (Mục U)](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/02_CEO_DIRECTIVES/JAYT-245_TONG_CHI_THI_CEO_DUY_NHAT_VAN_HANH_JAYT.md)  
**Biên nhận Cách ly Bundle Legacy:** [quarantined_evidence_bundles_legacy_receipt.json](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/09_CONTAINMENT_QUARANTINE_NON_SERVED/quarantined_evidence_bundles_legacy_receipt.json)  
**Phiên bản Phát hành:** `v3.408.0`  
**Địa chỉ Live:** [https://deploy-ten-xi-48.vercel.app](https://deploy-ten-xi-48.vercel.app)  
**Trạng thái Quản trị:** `P0 PUBLIC EVIDENCE-BUNDLE EXPOSURE — KHÔNG NGHIỆM THU V3.407; GIỮ UX SHELL, GỠ TOÀN BỘ CLAIM ASSET CŨ`

---

## 1. Báo Cáo Triển Khai Lệnh P0 Của 7 Phòng Ban (Mục U)

| Phòng Ban | Trưởng Bộ Phận | Kết Quả Thực Thi Chu Kỳ Mục U |
|---|---|---|
| **Data & Trust** | Chief Data Officer | - Cách ly toàn bộ 138 tệp thuộc `evidence_bundles/` và `assets/` cũ sang `09_CONTAINMENT_QUARANTINE_NON_SERVED/quarantined_evidence_bundles_legacy_20260828/` và `quarantined_sot_legacy_evidence_20260828/`.<br>- Ban hành biên nhận cách ly `quarantined_evidence_bundles_legacy_receipt.json` với lý do `LEGACY_EVIDENCE_BUNDLES_EXPOSED` và xóa sạch các bundle khỏi `03_SOURCE_OF_TRUTH/`, `deploy/` và `deploy/public/`. |
| **Engineering** | Chief Architect | - Thiết lập cơ chế **Strict Public Allowlist**: Cây thư mục `deploy/` và `deploy/public/` CHỈ ĐƯỢC CHỨA DUY NHẤT 6 tệp được cấp phép (`index.html`, `jayt_apex_interface.js`, `styles.css`, `sw.js`, `published_manifest.json`, `vercel.json`). Mọi thư mục con hoặc tệp khác đều bị chặn và xóa đệ quy.<br>- Nâng cấp hệ thống lên phiên bản `v3.408.0` và deploy lên Vercel Production. |
| **Product & UX/CX** | Product & UX Leads | - Bảo toàn 100% Discovery Shell: Navigation 3 tab, Collections horizontal rail, Local bookmark `localStorage`, Toast notification, Dark/Light mode, WCAG 2.1 AA.<br>- Card GitHub Student Developer Pack giữ đúng 4 atomic field bindings đã kiểm tra đạt (tên, mục đích, student context, URL chính thức), tuyệt đối không thêm giá/điều kiện/scope suy diễn. |
| **QA Directorate** | QA Director | - Xây dựng và thực thi QA Gate `test_recursive_public_allowlist_and_route_crawler.js`:<br>  * Quét đệ quy cây thư mục deploy đạt 100% Allowlist.<br>  * Crawl toàn diện 34 routes bị deny trên live production: 100% trả **HTTP 404 Deny** (gồm `/evidence_bundles/*`, `/assets/*`, `/daily_50_opportunities_feed.json`, v.v.). |
| **Growth & M3** | Growth Lead | - Duy trì M3 ở trạng thái Kế hoạch Nghiên cứu (RESEARCH_PLAN_ONLY); 0 link affiliate, 0 chiến dịch, 0 CTA thương mại. |

---

## 2. Thống Kê Inventory Quản Trị & Bằng Chứng Cách Ly

- **Tổng số bundles & assets legacy đã cách ly:** 138 tệp.
- **Thư mục cách ly:** `09_CONTAINMENT_QUARANTINE_NON_SERVED/quarantined_evidence_bundles_legacy_20260828/` và `quarantined_sot_legacy_evidence_20260828/`.
- **Danh sách tệp duy nhất được phép public trên deploy:**
  1. `index.html`
  2. `jayt_apex_interface.js`
  3. `styles.css`
  4. `sw.js`
  5. `published_manifest.json`
  6. `vercel.json`

---

## 3. Cổng An Toàn & Cam Kết Quản Trị

1. **Cấm Leak Route Dưới Mọi Hình Thức:** Bất kỳ tệp JSON hoặc bundle nào không nằm trong allowlist được định nghĩa sẽ làm fail ngay quy trình build và deploy.
2. **Cơ Chế Crawl Đệ Quy:** QA Gate sẽ tự động crawl toàn bộ danh sách routes bị deny trên môi trường live production trước khi báo cáo hoàn thành.

**Ký tên xác nhận bởi Hội đồng 7 Phòng ban:**  
*Product Directorate · Design System Authority · UX/CX Research Group · Growth & Partnerships · Data & Trust Security · Engineering Core · Quality Assurance Directorate*
