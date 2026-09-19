# JAYT CORP — BÁO CÁO NGHIỆM THU KỸ THUẬT JAYT-103R1 (SPLIT-BILL SINGLE-ENTRY FIX)
> **Mã đợt nộp**: `JAYT-103R1-SPLIT-BILL-SINGLE-ENTRY-FIX`  
> **Thời điểm niêm phong**: `2026-08-25T16:56:00+07:00`  
> **Trạng thái đề xuất**: `103R1: STAGING INSTANCE VALIDATED — PRODUCTION LOCKED — ZERO CANDIDATES`  
> **Tài liệu bộ nhớ vận hành**: [`PROJECT_MEMORY.md`](../../PROJECT_MEMORY.md) (Phiên bản `v3.209.0`, SHA-256: `26931a28967fda7421488940c206a84f5c8e6e34d0d192e3fc5c016b5bb68a2d`)

---

## 1. Tóm Tắt Khắc Phục Dứt Điểm Lỗ Hổng 103R Theo Chỉ Thị CEO

| Hạng Mục CEO Chỉ Trích (103R) | Nguyên Nhân Kỹ Thuật Gốc | Biện Pháp Khắc Phục Triệt Để Trong 103R1 | Kết Quả Thực Tế & Đối Soát DOM |
| :--- | :--- | :--- | :--- |
| **Ảnh desktop/mobile vẫn hiển thị calculator phủ ở cuối trang** | Thiếu CSS cho `.apex-bottom-sheet-overlay` trong `03_SOURCE_OF_TRUTH/index.html`, khiến phần tử modal render tĩnh theo dòng tài liệu bình thường thay vì dạng overlay ẩn. | Bổ sung đầy đủ CSS chuẩn trong `index.html`: `position: fixed; z-index: 9999; display: none !important; opacity: 0; visibility: hidden;` khi ở trạng thái mặc định; chỉ mở `display: flex !important; opacity: 1; visibility: visible;` khi overlay có class `.active`. | Tại thời điểm load trang, modal hoàn toàn ẩn khỏi viewport và document flow; không còn bất kỳ calculator nào nằm ở cuối trang. |
| **Mã nguồn còn 3 CTA cho chia bill (`#btn-open-calc-sheet` x2, `#btn-open-calc-sheet-sidebar`)** | Tồn tại hàm `renderLayer5SupportiveUtilitiesSection()` không dùng nhưng vẫn có `#btn-open-calc-sheet`; Hero action bar có thêm `#btn-open-calc-sheet`; Bento card dùng `#btn-open-calc-sheet-sidebar`. | 1. Xóa bỏ hoàn toàn section `renderLayer5SupportiveUtilitiesSection()`.<br>2. Xóa button split bill trong Hero action bar (Hero chỉ giữ duy nhất CTA `[Khám phá địa điểm gần bạn ↓]`).<br>3. Giữ DUY NHẤT 1 nút có ID `#btn-open-calc-sheet` đặt trong Bento Column 3 Fintech Card. | `document.querySelectorAll('#btn-open-calc-sheet').length === 1`. Zero duplicate ID. Zero `#btn-open-calc-sheet-sidebar` / `hero`. |
| **Test 103R không kiểm tra hành vi DOM thực tế** | Bộ test 103R chỉ đếm số lượng container mà không xác thực tương tác mở/đóng hay tính ẩn/hiện lúc load. | Viết mới hoàn chỉnh `test_split_bill_single_entry_103r1.js` (18/18 PASS): kiểm tra số lượng selector, kiểm tra trạng thái ẩn tại load time, kiểm tra tương tác click mở, đóng bằng Escape, nút X (`#btn-close-calc-sheet`) và backdrop click tại 375px và 1440px. | Toàn bộ 18/18 bài kiểm tra DOM tương tác thực tế PASS 100% qua Puppeteer Real Browser. |

---

## 2. Bằng Chứng Đối Soát Trực Quan Mới (Visual Evidence Staging Instance 103R1)

Đã chụp lại bộ 3 ảnh toàn trang (Full Page Screenshots) từ môi trường thực tế `staging_instance` (`08_RELEASE_VAULT/deployments/staging_instance/03_SOURCE_OF_TRUTH/`):

| Viewport | Tệp Ảnh Bằng Chứng | Dung Lượng | SHA-256 Checksum | Trạng Thái Trực Quan |
| :--- | :--- | :--- | :--- | :--- |
| **Desktop (1440x900)** | [`staging_ui_103r1_desktop_1440.png`](../07_QUALITY_ASSURANCE/runtime_evidence/screenshots_103r1/staging_ui_103r1_desktop_1440.png) | 320,736 B | `6d7d9e6e3f12587e914dcfa0da46a36c5dfd0c920f188040d7c35583b27b9c6f` | Giao diện gọn gàng, Single Dock 5 pill, 1 CTA Bento `[Chia bill / Copy 🧮]`, modal ẩn hoàn toàn. |
| **Tablet (768x1024)** | [`staging_ui_103r1_tablet_768.png`](../07_QUALITY_ASSURANCE/runtime_evidence/screenshots_103r1/staging_ui_103r1_tablet_768.png) | 330,930 B | `b7a5e15a9ca1a55928dcfbaef229eb9740ee3bfd4a796e6a127a5180f6ba2837` | Responsive bento mượt mà, không che khuất, không sticky bar. |
| **Mobile (375x812)** | [`staging_ui_103r1_mobile_375.png`](../07_QUALITY_ASSURANCE/runtime_evidence/screenshots_103r1/staging_ui_103r1_mobile_375.png) | 324,039 B | `dfc5f711016cc6d97c36eb9f315db811802d2870e28f32145b23d905aa430ee1` | Header -> Dock -> Hero -> 2 Cobalt -> Radar -> Watchlist rút gọn; 0 tràn ngang, modal ẩn sạch sẽ. |

---

## 3. Kết Quả Kiểm Thử Toàn Diện (10/10 QA Suites PASS 100%)

Toàn bộ 10 bộ kiểm thử chất lượng trong hệ thống đã chạy liên tiếp và đều trả về Exit Code `0`:

1. **`test_project_memory_consistency.js`**: **10/10 PASS** (Bảo vệ 7 nguyên tắc bất biến, kiểm tra version v3.209.0, lock production).
2. **`test_split_bill_single_entry_103r1.js`**: **18/18 PASS** (Đúng 1 CTA `#btn-open-calc-sheet`, modal ẩn mặc định, đóng mở Escape/X/backdrop, tính toán VND, 0 tràn ngang).
3. **`test_cobalt_canonicalization_and_ux_103.js`**: **20/20 PASS** (Đối soát byte-for-byte 14 chi nhánh Cobalt với `page.txt`, 0 deal giả).
4. **`test_locality_and_supply_resolution_102.js`**: **19/19 PASS** (21 nguồn live capture + 9 nguồn fail-closed).
5. **`test_controlled_live_provenance_101.js`**: **18/18 PASS** (Bằng chứng capture vật lý 5 nguồn chuẩn).
6. **`test_fail_closed_collector_100.js`**: **5/5 PASS** (Bộ thu thập fail-closed khi gặp 404, 500, DOM rỗng, timeout).
7. **`test_provenance_containment_099a.js`**: **17/17 PASS** (Cách ly synthetic fallback 099, bảo vệ 18 Cobalt lịch sử).
8. **`test_customer_journey_north_star_096.js`**: **12/12 PASS** (Customer journey contract & airgap).
9. **`test_network_airgap_and_strict_mem07_093b.js`**: **5/5 PASS** (0 external network requests, airgap tuyệt đối).
10. **`test_semantic_and_memory_correction_093a.js`**: **10/10 PASS** (E2E split bill và tính nhất quán).

---

## 4. Tuyên Bố Ranh Giới Dữ Liệu & Khóa An Toàn Tuyệt Đối (Data Boundaries & Strict Lock)

- **14 Chi Nhánh Cobalt**: Đóng vai trò là **địa điểm chính thức đã xác minh từ nguồn** (Artifact-Backed Sourced Locations), kèm nhãn trung thực:  
  *“Địa điểm chính thức — ưu đãi online chưa đủ dữ kiện; kiểm tra trực tiếp tại quán.”*
- **0 Deal / Voucher Phát Hành**: Không có bất kỳ voucher, mã giảm giá, giá thực trả hay deep link ảo nào được thêm vào hệ thống.
- **Production Lock**:
  - `05_DEAL_AND_AFFILIATE/deals_feed.json`: `[]` (Honest Empty State).
  - `08_RELEASE_VAULT/RELEASE_MANIFEST.json`: `is_approved: false`.
  - Không tạo tệp `RELEASE_CANDIDATE_103R1.json` (Candidate Freeze được thực thi 100%).
