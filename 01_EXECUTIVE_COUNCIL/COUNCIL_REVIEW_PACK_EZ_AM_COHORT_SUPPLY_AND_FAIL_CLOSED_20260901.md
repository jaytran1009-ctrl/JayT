# HỒ SƠ HỘI ĐỒNG LIÊN BỘ — JAYT SECTION EZ-AM
## WORKSTREAM NGUỒN CUNG SONG SONG: COHORT 15 CANDIDATE CINEMA & TRANSIT RAW-FIRST

**Mã hồ sơ:** `COUNCIL_REVIEW_PACK_EZ_AM_COHORT_SUPPLY_AND_FAIL_CLOSED_20260901`
**Phiên bản Staging Authoritative:** `v3.482.0-staging.ez`
**Chỉ thị chỉ đạo:** JAYT-245 Mục EZ-AM (Dòng 4988–5015)
**Thời gian lập hồ sơ:** 2026-09-01T07:04:49.238Z

---

### I. PHÂN ĐỊNH 3 NHÓM TRẠNG THÁI NGUỒN CUNG (MANDATE EZ-AM.4)

| Nhóm | Số lượng | Danh mục chi tiết | Trạng thái kỹ thuật & pháp lý |
| :--- | :---: | :--- | :--- |
| **1. Raw Candidate** (Đang khảo sát) | **14** | 6 Cinema (CGV, Lotte, Galaxy, Mega GS, CineStar, DCINE) + 8 Transit (Da Nang Bus, Grab, Be, Xanh SM, DSVN, Vietnam Airlines, VietJet Air, TNGO) | Đã capture raw HTTP bằng clock runtime thực tế; lưu tại evidence vault; đang trong SLA 12 giờ (`OPEN_EVALUATING`). |
| **2. Held Internal** (Giữ nội bộ / Fail-Closed) | **15** | Toàn bộ 14 raw candidates (thiếu giá/voucher cụ thể trên portal) + 1 candidate lỗi kết nối (`COHORT_EZ_AM_04` BHD Star: ECONNREFUSED) | **Giữ nội bộ 100%**, xếp loại T4 hoặc HELD_FAIL_CLOSED. 0 quyền lợi kinh tế, 0 voucher, 0 deal. |
| **3. Public Eligible** (Đủ điều kiện công bố) | **0 mới / 1 toàn sàn** | 0 thẻ mới từ Cohort 15. Toàn sàn chỉ duy trì duy nhất 1 thẻ T2 GitHub Education Pilot đã duyệt từ EZ-H. | Feature flag `COHORT_PUBLIC_CARDS_ENABLED = false`. Tuyệt đối không mount lên public DOM. |

---

### II. BẢNG CHI TIẾT 15 COHORT CANDIDATES & RAW EVIDENCE

| Mã Ứng Viên | Nhóm | Tên Nguồn / Tổ Chức | Canonical URL | HTTP | Raw Size | SHA-256 (16 ký tự đầu) | Đánh Giá Tầng |
| :--- | :---: | :--- | :--- | :---: | :---: | :---: | :---: |
| `COHORT_EZ_AM_01` | Cinema | CGV Cinemas (CJ CGV VN) | https://www.cgv.vn/ | 200 | 5.364 B | `2c4e43d7fa7ed967` | **T4 Held Internal** |
| `COHORT_EZ_AM_02` | Cinema | Lotte Cinema (Lotte Cinema VN) | https://www.lottecinemavn.com/ | 200 | 491 B | `287a5065df97ddba` | **T4 Held Internal** |
| `COHORT_EZ_AM_03` | Cinema | Galaxy Cinema (Thien Ngan JSC) | https://www.galaxycine.vn/ | 200 | 250.208 B | `52f59f86a7335642` | **T4 Held Internal** |
| `COHORT_EZ_AM_04` | Cinema | BHD Star Cineplex (BHD JSC) | https://www.bhdstar.vn/ | 0 | 0 B | N/A (ECONNREFUSED) | **HELD Fail-Closed** |
| `COHORT_EZ_AM_05` | Cinema | Mega GS Cinemas (Mega GS Ltd) | https://www.megagscinemas.vn/ | 200 | 197.724 B | `11355514735af4f9` | **T4 Held Internal** |
| `COHORT_EZ_AM_06` | Cinema | CineStar Cinemas | https://cinestar.com.vn/ | 200 | 463.694 B | `8060e799a4f784e8` | **T4 Held Internal** |
| `COHORT_EZ_AM_07` | Cinema | DCINE Vietnam | https://dcine.vn/ | 200 | 155.723 B | `eae773389bcc4a56` | **T4 Held Internal** |
| `COHORT_EZ_AM_08` | Transit | Da Nang Bus (DATRAMAC) | https://danangbus.vn/ | 200 | 115.281 B | `c0b6dd4b9f575587` | **T4 Held Internal** |
| `COHORT_EZ_AM_09` | Transit | Grab Vietnam Co., Ltd. | https://www.grab.com/vn/ | 200 | 337.317 B | `803c0c0884368d78` | **T4 Held Internal** |
| `COHORT_EZ_AM_10` | Transit | Be Group JSC | https://be.com.vn/ | 200 | 73.804 B | `ec920921d1b4a438` | **T4 Held Internal** |
| `COHORT_EZ_AM_11` | Transit | Xanh SM (GSM JSC) | https://xanhsm.com/ | 200 | 227.587 B | `7d23015c96296934` | **T4 Held Internal** |
| `COHORT_EZ_AM_12` | Transit | Đường Sắt Việt Nam (VNR) | https://dsvn.vn/ | 200 | 27.076 B | `46c624a8bc49351d` | **T4 Held Internal** |
| `COHORT_EZ_AM_13` | Transit | Vietnam Airlines JSC | https://www.vietnamairlines.com/ | 200 | 4.279.949 B | `c73ff2f67419447b` | **T4 Held Internal** |
| `COHORT_EZ_AM_14` | Transit | VietJet Aviation JSC | https://www.vietjetair.com/ | 200 | 10.334 B | `216e5d91f77a2456` | **T4 Held Internal** |
| `COHORT_EZ_AM_15` | Transit | TNGO Xe Đạp (Tri Nam Group) | https://tngo.vn/ | 200 | 52.968 B | `b34fdd823b465060` | **T4 Held Internal** |

---

### III. BÁO CÁO 7 PHÒNG BAN LIÊN BỘ (MANDATE EZ-AM.2 & EZ-AM.4)

1. **Product:** Hoàn tất cấu trúc hóa 15 đối tượng nguồn cung thành 2 nhóm JTBD: Giải trí Chiếu phim (7) và Di chuyển / Đô thị (8). Đặt mục tiêu hỗ trợ sinh viên/nhân viên văn phòng nhưng kiên quyết không tạo quota ép buộc hay suy diễn deal.
2. **Design:** Thiết kế đặc tả card shell trung lập [`04_DESIGN_SYSTEM/COHORT_UNDER_EVALUATION_CARD_SHELL_SPEC_EZ_AM.json`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/04_DESIGN_SYSTEM/COHORT_UNDER_EVALUATION_CARD_SHELL_SPEC_EZ_AM.json) và bản mẫu HTML [`04_DESIGN_SYSTEM/COHORT_CARD_SHELL_PROTOTYPE_EZ_AM.html`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/04_DESIGN_SYSTEM/COHORT_CARD_SHELL_PROTOTYPE_EZ_AM.html). 100% không asset đối tác, không ảnh, không CTA thương mại.
3. **UX/CX:** Soạn thảo neutral copy: *"Tài liệu cổng thông tin đang trong quy trình đối soát raw HTTP và liên kết locator theo SLA 12 giờ. Không có giá, không có voucher, không có liên kết thương mại."* Đảm bảo a11y AAA contrast và responsive 1440/768/390.
4. **Growth:** Tiếp tục phong tỏa chiến dịch thương mại; AccessTrade duy trì chế độ offline JTBD read-only tuyệt đối; 0 API, 0 account, 0 link tracking, 0 conversion claim.
5. **Data & Trust:** Thực hiện raw HTTP capture thật tại runtime đồng hồ; trích xuất byte offsets; kích hoạt SLA 12h với Clock Guard; áp dụng fail-closed xuống T4 / HELD cho toàn bộ 15 đối tượng vì thiếu bằng chứng giá/voucher cụ thể.
6. **Engineering:** Lưu trữ an toàn 14 raw binary tại `06_TRUST_AND_EVIDENCE/evidence_vault_ez_am/`; duy trì feature flag công khai ở mức `OFF`; bảo toàn parity staging `v3.482.0-staging.ez` (`PERFECT_MATCH_ZERO_DRIFT`).
7. **QA:** Xây dựng suite `test_ez_am_cohort_supply_and_clock_guard_qa.js` kiểm tra 5 khối: clock guard, hash raw, phân định tier/public, shell neutrality, và live DOM boundary.

---

### IV. BẢO TOÀN TRẠNG THÁI FAST LANE VÀ NỀN TẢNG

- **Fast Lane (JetBrains & Figma):** Tiếp tục duy trì **`OPEN_EVALUATING`** theo chỉ thị EZ-AL. Tuyệt đối không closure sớm, không future timestamp. Closure chỉ chạy sau khi runtime UTC thực tế `>= 2026-09-01T08:28:00Z`.
- **Production Status:** **LOCKED `v3.419.0` (`P0_EQ = OPEN`)**.
- **Staging Server:** `http://127.0.0.1:4173/` (`v3.482.0-staging.ez`).
- **T1 Verified Deals:** **0**.
- **Public Vouchers:** **0**.
- **Affiliate Links:** **0 (KHÓA)**.
