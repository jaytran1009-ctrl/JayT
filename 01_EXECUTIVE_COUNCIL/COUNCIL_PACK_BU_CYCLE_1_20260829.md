# HỘI ĐỒNG 7 PHÒNG BAN — BIÊN BẢN ĐÓNG VÒNG BU CYCLE 1

**Mã hồ sơ:** `COUNCIL_PACK_BU_CYCLE_1_20260829`  
**Chỉ thị chi phối:** [JAYT-245 — Mục BU (Lines 1733–1765)](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/02_CEO_DIRECTIVES/JAYT-245_TONG_CHI_THI_CEO_DUY_NHAT_VAN_HANH_JAYT.md#L1733)  
**Cadence:** Vòng tự chủ đầu tiên theo Quy chế CEO tự chủ điều hành  
**Ngày:** 29/08/2026  
**Staging URL:** [https://jayt-storefront-staging-bt.vercel.app](https://jayt-storefront-staging-bt.vercel.app)

---

## 1. EVIDENCE DELTA — Gap đo thực tế (không dùng kết quả vòng trước làm proof)

Hội đồng đã chạy kiểm thử Live Chrome CDP trên staging BT live, đo 4 luồng song song:

| Luồng | Kết Quả | Evidence File |
| :--- | :---: | :--- |
| Engineering/QA — Browser Regression & Route Integrity | **45 / 45 PASS** | [bu_cycle_1_gap_report.json](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/07_QUALITY_ASSURANCE/bu_cycle_1_gap_report.json) |
| Design/UX — Accessibility & Mobile | **PASS** (2 P2 tìm thấy & đã sửa) | CSS patch deployed |
| Data & Trust — Evidence Binding & Supply Integrity | **PASS** (0 P0/P1 gaps) | Đo trực tiếp runtime JS |
| Growth/Product — Theme & Local Saved State | **PASS** | Đo trực tiếp runtime JS |

**Tổng:** 0 P0, 0 P1, 2 P2 (đã sửa & redeploy).

---

## 2. USER BENEFIT — Lợi ích người dùng đo được

- **50 nội dung phân tầng** hiển thị đúng, lọc theo danh mục/quận hoạt động.
- **12 voucher với 4 hành động** (`Sao chép`, `Nhận tại trang gốc`, `Xem điều kiện`, `Theo dõi`) — tất cả render đúng.
- **Spotlight VNPAYCGV** sao chép thành công, toast xác nhận hiển thị.
- **Empty state** khi chưa lưu gì hiển thị đúng hướng dẫn.
- **Mobile 390px** không bị tràn ngang, bottom nav hoạt động.

---

## 3. VISUAL/UX — Trạng thái thiết kế

- Hero Cầu Rồng load thành công, credit CC BY-SA 3.0 hiển thị đúng.
- 3 Lộ trình đô thị render đầy đủ.
- Buy Decision Hub có input + truth card fail-closed.
- **Đã sửa:** Touch targets trên mobile nâng lên ≥44×44px cho tất cả nút bấm (via `@media (pointer: coarse)`).

---

## 4. A11Y/PERFORMANCE — Trạng thái tiếp cận

- **Landmarks:** banner ✓, main ✓, contentinfo ✓, navigation ✓
- **<h1> duy nhất:** ✓
- **Alt text:** 100% images có alt
- **Focusable labels:** 0 thiếu label
- **Heading hierarchy:** Có skip level (h1→h3 trong card context) — đây là pattern đã biết khi section header cung cấp h2 context. Không ảnh hưởng screen reader nghiêm trọng.

---

## 5. TIER/EXPIRY — Trạng thái kiểm soát nguồn cung

| Tier | Số Lượng | Trạng Thái |
| :--- | :---: | :--- |
| VERIFIED_DEAL | 6 | ✅ Đúng schema, đúng runtime |
| OFFICIAL_PROGRAM | 12 | ✅ Đúng schema, đúng runtime |
| CIVIC_FACILITY | 18 | ✅ Đúng schema, đúng runtime |
| RADAR_SOURCE | 14 | ✅ Đúng schema, đúng runtime |
| QUARANTINE | 1 | ✅ Cách ly fail-closed, không leak |

- 0 voucher có COPY_CODE nhưng thiếu code_text.
- 0 items có URL invalid.
- 0 missing required fields.

---

## 6. RISKS/DISSENT

> [!WARNING]
> **Risk 1 — Ảnh Cầu Rồng:** `dragon_bridge_hero_001.jpg` load thành công trên staging nhưng source là Wikimedia CC BY-SA 3.0. Credit đã hiển thị đúng. Nếu CEO muốn ảnh 100% proprietary, cần field photography riêng — đây là **quyết định pháp lý/quyền dùng asset** nên **dừng chờ authority** theo BU.

> [!NOTE]  
> **Risk 2 — Voucher Expiry Monitoring:** 12 voucher có `expiry_bound` nhưng chưa có cron job tự động hạ tier khi hết hạn. Hiện tại kiểm soát thủ công. Đề xuất xây automated expiry checker ở Cycle 2.

---

## 7. WORK ORDER KẾ TIẾP — BU CYCLE 2

Suy ra từ gap đã đo và backlog ưu tiên BU (Lines 1749–1755):

### WO-BU-C2-001 (P0): Voucher Expiry Auto-Checker
- **Phòng ban chủ trì:** Engineering/QA + Data & Trust
- **Nội dung:** Xây script tự động kiểm tra `expiry_bound` của 12 vouchers. Nếu voucher hết hạn → tự động hạ tier xuống `EXPIRED_ARCHIVED` và không hiển thị trên Voucher Wallet.
- **Loại luồng:** An toàn (read-only từ ledger, write chỉ vào staging)

### WO-BU-C2-002 (P1): Keyboard Navigation Regression Test
- **Phòng ban chủ trì:** Design/UX-CX + QA
- **Nội dung:** Tab-order test toàn bộ 5 views (HOME → EXPLORE → VOUCHERS → BUY_DECISION → SAVED), kiểm tra focus trap trong modal, Escape key đóng modal, Enter/Space kích hoạt button.
- **Loại luồng:** An toàn (test-only, không thay đổi production)

### WO-BU-C2-003 (P1): Evidence Capture Read-Only cho 6 Verified Deals
- **Phòng ban chủ trì:** Supply/Data & Trust
- **Nội dung:** Duyệt 6 `official_source_url` của VERIFIED_DEAL tier, chụp screenshot read-only trang nguồn, lưu bằng chứng niêm yết mới nhất vào `04_DATA_TRUST/evidence_snapshots/`. Không tạo tài khoản, không đăng ký, không write.
- **Loại luồng:** An toàn (read-only observation)

### WO-BU-C2-004 (P2): Daily Edition Content Priority Logic
- **Phòng ban chủ trì:** Growth/Product
- **Nội dung:** Nghiên cứu logic sắp xếp nội dung theo thời gian trong ngày (SLOT_MORNING/LUNCH/AFTERNOON/EVENING) — khi user mở app lúc 20h, ưu tiên hiển thị nội dung tối. Hiện tại chưa có time-aware rendering.
- **Loại luồng:** An toàn (UI logic, không thay đổi supply data)

---

**Kết luận Hội đồng:** Vòng BU Cycle 1 đóng thành công. 0 P0/P1 gap còn tồn đọng. 2 P2 đã sửa và redeploy. Work Order BU Cycle 2 đã được đề xuất — Hội đồng tự tiến hành ngay mà không chờ CEO nhắc, theo đúng Quy chế BU.

**Production `v3.419.0` — TIẾP TỤC KHÓA AN TOÀN 100%.**
