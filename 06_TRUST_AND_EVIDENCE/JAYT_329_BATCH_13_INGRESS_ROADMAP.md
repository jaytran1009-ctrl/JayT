# JAYT-329 BATCH 13: STORE LOCATOR MATRIX RUNNER & 10-BRAND INGRESS AUDIT (V3.5)

**Batch ID:** `BATCH_13`  
**Matrix Version:** `2.0` (Locator) & `4.0` (Policy Audit)  
**Runner Version:** `3.5` (Controlled Ingress for Jollibee 5 Combos Leaf Pages, QA Regression 36/36, Spans 21/21, Scope 3/3)  
**Execution Timestamp:** `2026-09-06T08:25:00.000Z`  
**Run Mode:** `OFFLINE_REPLAY & CONTROLLED_LEAF_INGRESS`  
**Run Reference Vault:** `06_TRUST_AND_EVIDENCE/batch_13_locator_vault/run_20260906_145026_da2e46/`  
**Jollibee Combos Vault:** `06_TRUST_AND_EVIDENCE/batch_13_policy_ingress_vault/run_jollibee_combos_20260906_082143_dc594d/`  
**Staging Receipt:** `staging_workspace_j328/STAGING_B13_LOCATOR_RECEIPT.json` (Status: `PASS`)  
**Resilience Test Suite:** `07_QUALITY_ASSURANCE/test_locator_runner_resilience.cjs` (36/36 PASS - 100%)  
**Span Verification Receipt:** `06_TRUST_AND_EVIDENCE/batch_13_locator_vault/SPAN_VERIFICATION_RECEIPT.json` (21/21 PASS - 100%)  
**Scope Verification Receipt:** `06_TRUST_AND_EVIDENCE/batch_13_locator_vault/SCOPE_VERIFICATION_RECEIPT.json` (3/3 PASS - 100%)  
**Jollibee Combos Capture Receipt:** `06_TRUST_AND_EVIDENCE/batch_13_policy_ingress_vault/run_jollibee_combos_20260906_082143_dc594d/JOLLIBEE_COMBOS_CAPTURE_RECEIPT.json` (5/5 PASS)  
**Jollibee Leaf Audit Receipt:** `06_TRUST_AND_EVIDENCE/batch_13_policy_ingress_vault/run_jollibee_combos_20260906_082143_dc594d/JOLLIBEE_LEAF_PAGE_AUDIT_RECEIPT.json`  
**Production Status:** STRICTLY FROZEN at `v3.422.0 / 24 cards` (Zero deployment to production)  
**Ledger Hash (PROJECT_MEMORY.md):** `3d1c185cdd785666c4b63e7eba618085ab72d595f12be7ecb94b02dc23991455` (Match 100%)  

---

## 1. TỔNG HỢP KẾT QUẢ ĐIỀU TRA 10 THƯƠNG HIỆU (OFFICIAL LOCATOR DISCOVERY)

Thực hiện chỉ thị Batch 13 về việc xử lý toàn bộ 10 thương hiệu theo URL chính thức tìm được từ website thương hiệu, tuân thủ nghiêm ngặt nguyên tắc **ZERO SYNTHETIC DATA** (không suy đoán, không tự điền, không tạo địa chỉ giả mạo để đạt chỉ tiêu 30–50):

| STT | Thương hiệu | Nguồn khám phá (Discovery Source) | URL chính thức / Leaf URLs | Trạng thái kỹ thuật lượt này | Trạng thái quan sát lịch sử & Bằng chứng | Số cơ sở xác minh |
|---|---|---|---|---|---|:---:|
| 1 | **Phúc Long Heritage** | Trang `find-store` (Next.js chunk `_app-183ba04e33350e0d.js`) | API WinMart CrownX (`pageNumber=1..2`, `pageSize=100`) | `COMPLETE_PAGINATION` | `OFFLINE_REPLAY_SUCCESS` (2/2 trang, 100 và 66 bản ghi) | **7** |
| 2 | **Jollibee Vietnam** | Menu trang chủ `jollibee.com.vn/cua-hang` | `https://jollibee.com.vn/cua-hang` (Inline JSON `window.storeIframes`) | `HARVESTED_SUCCESS` | `OFFLINE_REPLAY_SUCCESS` (Loại trừ cơ sở ngoại tỉnh, đối soát byte offset) | **9** |
| 3 | **Phi Long Technology** | Footer & Header `philong.com.vn` | `https://philong.com.vn` (Static DOM `li.s-item`) | `HARVESTED_SUCCESS` | `OFFLINE_REPLAY_SUCCESS` (Trích nguyên văn span, không gán mã/quận/tel) | **2** |
| 4 | **CGV Cinemas Vietnam** | Menu "RẠP CGV" $\rightarrow$ "Tất Cả Các Rạp" $\rightarrow$ Tab Đà Nẵng | 3 Leaf URLs: `cgv-vinh-trung-plaza`, `cgv-vincom-da-nang`, `cgv-mm-da-nang` | `HARVESTED_SUCCESS` | `OFFLINE_REPLAY_SUCCESS` (`COMPLETE_SCOPED_MULTI_LEAF`: 3 rạp Đà Nẵng) | **3** |
| 5 | **Galaxy Cinema** | Menu "Rạp / Giá Vé" $\rightarrow$ Rạp Đà Nẵng | `https://www.galaxycine.vn/rap-gia-ve/galaxy-da-nang/` | `HARVESTED_SUCCESS` | `OFFLINE_REPLAY_SUCCESS` (Leaf HTML, bóc tách comment SSR) | **1** |
| 6 | **Lotte Cinema** | Cây menu rạp khu vực Đà Nẵng (`cinemaID=8007`) | `https://www.lottecinemavn.com/...cinemaID=8007` | `REJECTED__NO_FACILITY_ADDRESS_IN_SOURCE` | Không có địa chỉ cơ sở trong nguồn | **0** |
| 7 | **Metiz Cinema** | Liên kết "Giới thiệu" & "Liên hệ" chân trang | `https://metiz.vn/about.html` | `REJECTED__NO_FACILITY_ADDRESS_IN_SOURCE` | Không có địa chỉ cơ sở trong nguồn | **0** |
| 8 | **Điện Máy Xanh (MWG)** | Anchor "Tìm siêu thị (2989 shop)" | `https://www.dienmayxanh.com/he-thong-sieu-thi-dien-may` | `NOT_CHECKED_THIS_RUN` | `HISTORICAL_PROBE__SERVER_ERROR_500` (Probe lịch sử; timestamp unverified) | **0** |
| 9 | **Highlands Coffee** | Anchor "Tìm kiếm cửa hàng" | `https://www.highlandscoffee.com.vn/vn/he-thong-cua-hang.html` | `NOT_CHECKED_THIS_RUN` | `HISTORICAL_PROBE__BLOCKED_403_WAF` (Probe lịch sử; timestamp unverified) | **0** |
| 10 | **Lotteria Vietnam** | Anchor "TÌM CỬA HÀNG GẦN BẠN" | `https://www.lotteria.vn/stores` | `REJECTED__NO_FACILITY_ADDRESS_IN_SOURCE` | DOM chỉ có trụ sở; API Firebase App Check 403 | **0** |
| **TỔNG CỘNG** | **10 THƯƠNG HIỆU** | | | | | **22 ĐỊA ĐIỂM** |

> **Nguyên tắc tôn trọng sự thật dữ liệu (Ground Truth) & Phân định mạng:**  
> Toàn bộ 22 địa điểm trên đều có chứng từ truy nguyên chính xác 100% đến từng byte offset hoặc JSON pointer trong tệp raw gốc. Antigravity kiên quyết không tự động tạo thêm địa chỉ giả định cho Lotte Cinema, Metiz, Điện Máy Xanh, Highlands hay Lotteria để đạt mốc 30–50.  
> Trong chế độ offline replay, runner ghi nhận `checked_this_run: false` cho toàn bộ các thương hiệu. Phân lập tuyệt đối timestamp theo thương hiệu: thương hiệu nào có file headers thật thì trích xuất `server_date` của thương hiệu đó; thương hiệu không có file hoặc chưa probe thì ghi `observed_at: null` và `historical_observation_unverified: true`, triệt tiêu hoàn toàn việc lấy header của thương hiệu khác làm fallback.

---

## 2. BẢNG ĐỐI SOÁT 22 ĐỊA ĐIỂM TRUY NGUYÊN ĐƯỢC (TỰ ĐỘNG SINH TỪ JSON)

*(Tự động trích xuất trực tiếp từ `LOCATIONS_DA_NANG_VERIFIED.json` trong run `run_20260906_140316_0ca0c0`)*

| STT | Thương hiệu | Mã cơ sở | Tên cơ sở | Địa chỉ nguyên văn (Chứng cứ trích xuất) | Địa chỉ hiển thị chuẩn hóa | Tích điểm | Đổi quà | Trạng thái cơ sở |
|---|---|---|---|---|---|---|---|---|
| 1 | phuclong | 2005 | DNG-CH Lotte Số 6 Đại Nam P.HCB | Tầng 1, 1F-09 tại Lotte Mart Đà Nẵng, Số 06 đường Nại Nam   TP. Đà Nẵng | Tầng 1, 1F-09 tại Lotte Mart Đà Nẵng, Số 06 đường Nại Nam   TP. Đà Nẵng | ELIGIBLE | ELIGIBLE | ELIGIBLE |
| 2 | phuclong | 2006 | DNG-CH 59-61 Nguyen Van Linh P.PN | 59-61 Nguyễn Văn Linh   TP. Đà Nẵng | 59-61 Nguyễn Văn Linh   TP. Đà Nẵng | ELIGIBLE | ELIGIBLE | ELIGIBLE |
| 3 | phuclong | 2116 | DNG - 511 Trần Hưng Đạo | 511 Trần Hưng Đạo   TP. Đà Nẵng | 511 Trần Hưng Đạo   TP. Đà Nẵng | ELIGIBLE | ELIGIBLE | ELIGIBLE |
| 4 | phuclong | 2129 | DNG - Sân bay Đà Nẵng | DV-03 Cảng hàng không quốc tế Đà Nẵng   TP. Đà Nẵng | DV-03 Cảng hàng không quốc tế Đà Nẵng   TP. Đà Nẵng | EXCLUDED | UNVERIFIED | EXCLUDED |
| 5 | phuclong | 2176 | DNG - Xô Viết Nghệ Tĩnh | 114 - 116 Xô Viết Nghệ Tĩnh   TP. Đà Nẵng | 114 - 116 Xô Viết Nghệ Tĩnh   TP. Đà Nẵng | ELIGIBLE | ELIGIBLE | ELIGIBLE |
| 6 | phuclong | 2217 | DNG - Mega Market | 167 Nguyễn Sinh Sắc Phía Đông Nam ký túc xá sinh viên Phường Hòa Khánh TP. Đà Nẵng | 167 Nguyễn Sinh Sắc Phía Đông Nam ký túc xá sinh viên Phường Hòa Khánh TP. Đà Nẵng | ELIGIBLE | ELIGIBLE | ELIGIBLE |
| 7 | phuclong | 2237 | DNG - 111 Trần Hưng Đạo | Số 111 Trần Hưng Đạo Số 111 Trần Hưng Đạo Phường Hội An TP. Đà Nẵng | Số 111 Trần Hưng Đạo Số 111 Trần Hưng Đạo Phường Hội An TP. Đà Nẵng | ELIGIBLE | ELIGIBLE | ELIGIBLE |
| 8 | jollibee | 59 | Jollibee Vincom Đà Nẵng | Tầng 4 Vincom Đà Nẵng , 910A Ngô Quyền, Phường An Hải, Thành Phố Đà Nẵng | Tầng 4 Vincom Đà Nẵng , 910A Ngô Quyền, Phường An Hải, Thành Phố Đà Nẵng | UNVERIFIED | UNVERIFIED | UNVERIFIED |
| 9 | jollibee | 106 | Jollibee Tiểu La - Đà Nẵng | 32 Tiểu La, Phường Hòa Cường,Thành phố Đà Nẵng | 32 Tiểu La, Phường Hòa Cường,Thành phố Đà Nẵng | UNVERIFIED | UNVERIFIED | UNVERIFIED |
| 10 | jollibee | 121 | Jollibee Nguyễn Đức Trung - Đà Nẵng | 47 Nguyễn Đức Trung, Phường Thanh Khê, Thành phố Đà Nẵng | 47 Nguyễn Đức Trung, Phường Thanh Khê, Thành phố Đà Nẵng | UNVERIFIED | UNVERIFIED | UNVERIFIED |
| 11 | jollibee | 132 | Jollibee Phan Đăng Lưu - Đà Nẵng | 126 Phan Đăng Lưu, Phường Hòa Cường, Thành phố Đà Nẵng | 126 Phan Đăng Lưu, Phường Hòa Cường, Thành phố Đà Nẵng | UNVERIFIED | UNVERIFIED | UNVERIFIED |
| 12 | jollibee | 135 | Jollibee Phạm Như Xương - Đà Nẵng | 10 Phạm Như Xương, Phường Hòa Khánh, Thành phố Đà Nẵng | 10 Phạm Như Xương, Phường Hòa Khánh, Thành phố Đà Nẵng | UNVERIFIED | UNVERIFIED | UNVERIFIED |
| 13 | jollibee | 139 | Jollibee Lý Thái Tổ - Đà Nẵng | 99 Lý Thái Tổ, Phường Thanh Khê, Thành phố Đà Nẵng | 99 Lý Thái Tổ, Phường Thanh Khê, Thành phố Đà Nẵng | UNVERIFIED | UNVERIFIED | UNVERIFIED |
| 14 | jollibee | 156 | Jollibee Đống Đa - Đà Nẵng | 254 Đống Đa, Phường Hải Châu, Thành phố Đà Nẵng | 254 Đống Đa, Phường Hải Châu, Thành phố Đà Nẵng | UNVERIFIED | UNVERIFIED | UNVERIFIED |
| 15 | jollibee | 158 | Jollibee Ngô Văn Sở - Đà Nẵng | 02 Ngô Văn Sở, Phường Liên Chiểu, Thành phố Đà Nẵng | 02 Ngô Văn Sở, Phường Liên Chiểu, Thành phố Đà Nẵng | UNVERIFIED | UNVERIFIED | UNVERIFIED |
| 16 | jollibee | 252 | Jollibee MM Mega Market - Đà Nẵng | Lô L1-01, Tầng 1, TTTM MM Mega Market Đà Nẵng, Đường Nguyễn Sinh Sắc, Phường Hòa Khánh, Thành phố Đà Nẵng | Lô L1-01, Tầng 1, TTTM MM Mega Market Đà Nẵng, Đường Nguyễn Sinh Sắc, Phường Hòa Khánh, Thành phố Đà Nẵng | UNVERIFIED | UNVERIFIED | UNVERIFIED |
| 17 | phi_long | null | Phi Long 152-158 Hàm Nghi, Đà Nẵng | Phi Long 152-158 Hàm Nghi, Đà Nẵng | Phi Long 152-158 Hàm Nghi, Đà Nẵng | NOT_APPLICABLE | NOT_APPLICABLE | UNVERIFIED |
| 18 | phi_long | null | Phi Long 52 Nguyễn Văn Linh, Đà Nẵng | Phi Long 52 Nguyễn Văn Linh, Đà Nẵng | Phi Long 52 Nguyễn Văn Linh, Đà Nẵng | NOT_APPLICABLE | NOT_APPLICABLE | UNVERIFIED |
| 19 | cgv_cinemas | cgv_vinh_trung_plaza | CGV Vĩnh Trung Plaza | 255-257 đường Hùng Vương Quận Thanh Khê Tp. Đà Nẵng | 255-257 đường Hùng Vương Quận Thanh Khê Tp. Đà Nẵng | UNVERIFIED | UNVERIFIED | UNVERIFIED |
| 20 | cgv_cinemas | cgv_vincom_da_nang | CGV Vincom Đà Nẵng | Tầng 4, TTTM Vincom Đà Nẵng, đường Ngô Quyền, P.An Hải Bắc, Q.Sơn Trà, TP. Đà Nẵng | Tầng 4, TTTM Vincom Đà Nẵng, đường Ngô Quyền, P.An Hải Bắc, Q.Sơn Trà, TP. Đà Nẵng | UNVERIFIED | UNVERIFIED | UNVERIFIED |
| 21 | cgv_cinemas | cgv_mm_da_nang | CGV MM Supercenter Đà Nẵng | Tầng 3, Trung tâm thương mại MM Supercenter Đà Nẵng,Tầng 3, Trung Tâm Thương Mại MM Mega Market Đà Nẵng, 167 Đường Nguyễn Sinh Sắc, Phường Hòa Khánh, Thành phố Đà Nẵng | Tầng 3, TTTM MM Mega Market Đà Nẵng, 167 Đường Nguyễn Sinh Sắc, Phường Hòa Khánh, TP. Đà Nẵng | UNVERIFIED | UNVERIFIED | UNVERIFIED |
| 22 | galaxy_cinema | galaxy_coop_da_nang | Galaxy Cinema Coop Đà Nẵng | Tầng 3, TTTM Co.opmart Đà Nẵng - 478 Điện Biên Phủ, Phường Thanh Khê, TP. Đà Nẵng | Tầng 3, TTTM Co.opmart Đà Nẵng - 478 Điện Biên Phủ, Phường Thanh Khê, TP. Đà Nẵng | UNVERIFIED | UNVERIFIED | UNVERIFIED |

> **Bảo toàn nguyên văn (Byte Fidelity):**  
> Cột `Địa chỉ nguyên văn (Chứng cứ trích xuất)` lưu giữ chính xác 100% từng ký tự trích từ nguồn, bao gồm cả đoạn lặp trong CMS chính thức của CGV MM Supercenter (`"Tầng 3, Trung tâm thương mại MM Supercenter Đà Nẵng,Tầng 3, Trung Tâm Thương Mại MM Mega Market Đà Nẵng, 167 Đường Nguyễn Sinh Sắc, Phường Hòa Khánh, Thành phố Đà Nẵng"`). Cột `Địa chỉ hiển thị chuẩn hóa` chỉ dùng phục vụ giao diện trình bày sạch, không thay thế chứng từ gốc.

---

## 3. BẢNG MA TRẬN 10 THƯƠNG HIỆU & TÌNH TRẠNG THU THẬP (COMPLETENESS MATRIX)

*(Được trích xuất từ `HARVEST_SUMMARY_REPORT.json` với việc phân lập hoàn toàn provenance thời gian)*

| Thương hiệu | Trạng thái lượt này | Kiểm tra lượt này | Trạng thái quan sát | Thời điểm quan sát (Observed At) | Mức độ đầy đủ | Số cơ sở xác minh |
|---|---|:---:|---|---|:---:|:---:|
| **phuclong** | `COMPLETE_PAGINATION` | `false` | `OFFLINE_REPLAY_SUCCESS` | `2026-09-06T05:52:52.000Z` (Date header) | `COMPLETE` | 7 |
| **jollibee** | `HARVESTED_SUCCESS` | `false` | `OFFLINE_REPLAY_SUCCESS` | `2026-09-06T05:52:53.000Z` (Date header) | `COMPLETE_SINGLE_SOURCE` | 9 |
| **phi_long** | `HARVESTED_SUCCESS` | `false` | `OFFLINE_REPLAY_SUCCESS` | `2026-09-06T05:52:53.000Z` (Date header) | `COMPLETE_SINGLE_SOURCE` | 2 |
| **cgv_cinemas** | `HARVESTED_SUCCESS` | `false` | `OFFLINE_REPLAY_SUCCESS` | `null` (Không mượn header hãng khác; raw mtime không thay thế captured_at) | `COMPLETE_SCOPED_MULTI_LEAF` | 3 |
| **galaxy_cinema** | `HARVESTED_SUCCESS` | `false` | `OFFLINE_REPLAY_SUCCESS` | `null` (Không có headers file; không gán mtime làm capture time) | `COMPLETE_SINGLE_SOURCE` | 1 |
| **lotte_cinema** | `REJECTED__NO_FACILITY_ADDRESS_IN_SOURCE` | `false` | `REJECTED__NO_FACILITY_ADDRESS_IN_SOURCE` | `2026-09-06T05:52:55.000Z` (Date header) | `REJECTED` | 0 |
| **metiz_cinema** | `REJECTED__NO_FACILITY_ADDRESS_IN_SOURCE` | `false` | `REJECTED__NO_FACILITY_ADDRESS_IN_SOURCE` | `2026-09-06T05:52:55.000Z` (Date header) | `REJECTED` | 0 |
| **dien_may_xanh** | `NOT_CHECKED_THIS_RUN` | `false` | `HISTORICAL_PROBE__SERVER_ERROR_500` | `null` (historical_observation_unverified) | `FAILED` | 0 |
| **highlands_coffee** | `NOT_CHECKED_THIS_RUN` | `false` | `HISTORICAL_PROBE__BLOCKED_403_WAF` | `null` (historical_observation_unverified) | `BLOCKED` | 0 |
| **lotteria** | `REJECTED__NO_FACILITY_ADDRESS_IN_SOURCE` | `false` | `REJECTED__NO_FACILITY_ADDRESS_IN_SOURCE` | `null` (Không có headers file; không gán mtime làm capture time) | `REJECTED` | 0 |

---

### 4. HỒ SƠ ĐỐI SOÁT HASH & PROVENANCE (RUN_ACCEPTANCE_RECEIPT)

Tệp receipt lưu trữ tại:  
`06_TRUST_AND_EVIDENCE/batch_13_locator_vault/run_20260906_145026_da2e46/RUN_ACCEPTANCE_RECEIPT.json`

- **SHA-256 Runner Script (`04_DATA_PIPELINE/harvest_danang_locations.js`):**  
  `c5a3ab2189fd53a5357bf227e22a0b1856fd7fd7b50e1feb532b5379bfa4daa1`
- **SHA-256 Matrix (`04_DATA_PIPELINE/batch_matrix/LOCATOR_HARVEST_MATRIX.json`):**  
  `e39f3e76d9f49ee1e821e0d36ead45538decc38db970a3653a30d91901c5bf81`
- **SHA-256 Policy Matrix (`04_DATA_PIPELINE/batch_matrix/BRAND_POLICY_AUDIT_MATRIX.json` v2.1):**  
  `cd435ffaef93913ebc321323d9784b7a0150ce30312bbca432d47bbffaa78082`
- **SHA-256 Policy Ingress Scope (`BATCH_13_POLICY_INGRESS_SCOPE.json` v2.0):**  
  `c7c506d221397dbd5f63453ef5cc1abc4c4cfa67280e2d76e1a35a0839a0d32a`
- **SHA-256 Scope Verification Receipt (`SCOPE_VERIFICATION_RECEIPT.json`):**  
  `6b87f1f6bdca90487233d467bce4dedb4961927603395b736c9d26cb574c2dc4`
- **SHA-256 Span Verification Receipt (`SPAN_VERIFICATION_RECEIPT.json`):**  
  `9f387e95699acbf274e053f5244ca5e6a3b9c64315bc7c1e7cae867602d130e8`
- **Hash các nguồn Replay trong Baseline:**
  - `phuclong_page1.raw.json`: `1d04bf590d388e7ba967534a662a8ddb9b223257e02531da6eef4085c9723eea`
  - `phuclong_page2.raw.json`: `910a909dda93cdc43492f8f5e8e78b52290fdb3adfc0efcb74c79f76947f765a`
  - `jollibee.raw.html`: `c4700db7cab4efafa71db672a691bfb2b36290e809042f44e0a0004898813244`
  - `phi_long.raw.html`: `62284fd74922e459b48cb157a59de9d46cfc0d8c772db1b371aa3970da1edd75`
  - `cgv_vinh_trung_plaza.raw.html`: `715c517c08381d1f0aeeaaf929d624118c8ddedbabe5713c7cdea087b4e6fc2e`
  - `cgv_vincom_da_nang.raw.html`: `0c24777b63f29457d01f0d3084a21ac09e949a65656e81d023e69366b2d70a52`
  - `cgv_mm_da_nang.raw.html`: `f66ec56e2fc30dffe3c5e48d6fda7db58acca9a0bedce534ec2d079e90b11bb0`
  - `galaxy_da_nang.raw.html`: `8de892a4834a403c8361b375133d2c5306a9bfeee5be9c5cb8db3495c6dd348c`
  - `lotte_cinema.raw.html`: `7b4b8607412d9897ab90d07c04c4f8a7e6f1beb4e487b3fb0a129d73f37b0fe5`
  - `metiz_cinema.raw.html`: `db04e82f1ed8dce8db4204399529dc356c14f8139a6cdc1adadb7c6dd358d8ac`
  - `lotteria.raw.html`: `5e54724cb9e8bf13cb2ad1f004a935f582202481d7d2f58b60f0f1cccf9fad7b`

---

## 5. BẢO VỆ STAGING GATE & BẤT BIẾN PRODUCTION

- **Trạng thái Staging Gate:** Đã nghiệm thu tự động qua Real DOM Inspection.
- **Thẻ thương mại Staging được cấp phép:** Đúng 3 thẻ (`B12_13`, `B12_15`, `B12_05`).
  - Thẻ `B12_13`: Quan sát giá Điện Máy Xanh.
  - Thẻ `B12_15`: Quan sát giá Phi Long (Sản phẩm: USB Kingston DataTraveler Exodia 64GB, 290.000 VNĐ, không phải chuột).
  - Thẻ `B12_05`: Chính sách Hội viên Phúc Long (v2).
- **Thẻ bị chặn:** Toàn bộ các ưu đãi chưa thẩm định hoặc chưa cấp phép (Culture Day, CGV U22, Galaxy U22, Jollibee Combo) đều bị chặn 100%, không xuất hiện trên giao diện.
- **Production Status:** Đóng băng tuyệt đối ở phiên bản `v3.422.0 / 24 thẻ`, `deals_feed.json = []`.
- **Zero Affiliate Links:** Tuyệt đối không kích hoạt tiếp thị liên kết.

---

## 6. PHẠM VI THU NẠP ĐỀ XUẤT CÓ LINK PROVENANCE ĐỐI SOÁT TỪ RAW (PROPOSED POLICY INGRESS SCOPE)

Tuân thủ nghiêm ngặt chỉ đạo của Hội đồng: **Toàn bộ dữ liệu được sinh trực tiếp từ tệp raw trên đĩa; không nhập tay hash hay snippet; phân định rõ span_start, span_length, href_start; bỏ toàn bộ giá/tuổi/món định trước và thay thế bằng các câu hỏi kiểm toán khách quan**.

### 6.1. Bảng đối soát Link Provenance sinh trực tiếp từ Raw Files

| STT | Ứng viên / Thương hiệu | Parent File & SHA-256 thực tế | Tọa độ Byte trong Raw (`span_start`, `span_length`, `href_start`) | Thẻ liên kết nguyên văn trích xuất từ Raw (`anchor_tag_raw`) | Target URL Đích đã phân giải | Câu hỏi kiểm toán phạm vi điều khoản (`policy_scope_required`) |
|:---:|---|---|---|---|---|---|
| 1 | **CGV Cinemas**<br>`CAND_POLICY_CGV_MEMBERSHIP` | `cgv_vinh_trung_plaza.raw.html`<br>SHA-256: `715c517c08381d1f0aeeaaf929d624118c8ddedbabe5713c7cdea087b4e6fc2e` | `span_start: 27364`<br>`span_length: 84`<br>`href_start: 27388`<br>*(attr start: `27382`)* | `<a class="level1" href="https://www.cgv.vn/default/cgv-membership">Quyền lợi</a>` | `https://www.cgv.vn/default/cgv-membership` | - Định nghĩa và điều kiện đối tượng hội viên / độ tuổi thực tế có trong nguồn (nếu có)<br>- Bảng giá vé 2D và phụ thu định dạng thực tế có trong nguồn (nếu có)<br>- Danh mục rạp áp dụng tại Đà Nẵng (Vĩnh Trung, Vincom, MM) thực tế có trong nguồn<br>- Thủ tục xác thực danh tính tại quầy/online<br>- Ngoại lệ ngày Lễ/Tết hoặc suất chiếu đặc biệt |
| 2 | **Galaxy Cinema**<br>`CAND_POLICY_GALAXY_U22` | `galaxy_da_nang.raw.html`<br>SHA-256: `8de892a4834a403c8361b375133d2c5306a9bfeee5be9c5cb8db3495c6dd348c` | `span_start: 39227`<br>`span_length: 158`<br>`href_start: 39371`<br>*(attr start: `39365`)* | `<a class="py-7 flex text-sm justify-between items-center md:pr-0 pr-5 group capitalize hover:text-orange-500 transition-all duration-300" href="/u22/">U22</a>` | `https://www.galaxycine.vn/u22/` | - Điều kiện đối tượng, độ tuổi hoặc tiêu chuẩn thẻ Stars thực tế có trong nguồn (nếu có)<br>- Biểu giá vé 2D theo ngày thực tế có trong nguồn (nếu có)<br>- Phạm vi rạp áp dụng (đặc biệt tại Galaxy Đà Nẵng)<br>- Thời hạn hiệu lực chương trình và ngoại lệ phòng chiếu/suất chiếu<br>- Chính sách bắp nước kèm theo (nếu có) |
| 3 | **Jollibee Vietnam**<br>`CAND_POLICY_JOLLIBEE_MENU` | `jollibee.raw.html`<br>SHA-256: `c4700db7cab4efafa71db672a691bfb2b36290e809042f44e0a0004898813244` | `span_start: 146396`<br>`span_length: 216`<br>`href_start: 146405`<br>*(attr start: `146399`)* | `<a href="https://jollibee.com.vn/mon-moi-mon-ngon.html"  class="level-top" ><img src='https://jollibee.com.vn//media/catalog/category/web-12_1_1.png' class='thumbnail' width='100px'><span>Combo Bán Chạy</span></a>` | `https://jollibee.com.vn/mon-moi-mon-ngon.html` | - Danh mục sản phẩm, thành phần món và mức giá niêm yết chính thức thực tế có trong nguồn<br>- Phạm vi cửa hàng áp dụng tại khu vực TP. Đà Nẵng (nếu có)<br>- Điều kiện phục vụ (dine-in, takeaway, delivery)<br>- Thời gian áp dụng và các giới hạn/ngoại lệ |

### 6.2. Bảng loại bỏ các URL tự suy đoán không có liên kết trong DOM (Rejected Synthesized URLs)

| Thương hiệu | URL tự đoán bị loại bỏ (Rejected URL) | Lý do loại bỏ (Rejection Audit) |
|---|---|---|
| **CGV Cinemas** | `https://www.cgv.vn/default/u22` | **SYNTHESIZED_GUESS:** Tự suy diễn từ tên chương trình U22; **0 lần xuất hiện** trong toàn bộ raw DOM CGV trên đĩa. |
| **CGV Cinemas** | `https://www.cgv.vn/default/cinox/site/cgv-vinh-trung-plaza/u22` | **SYNTHESIZED_GUESS:** Tự ghép slug rạp với mã chương trình; **0 lần xuất hiện** trong DOM. |
| **Galaxy Cinema** | `https://www.galaxycine.vn/khuyen-mai/gia-ve-u22/` | **SYNTHESIZED_GUESS:** Tự ghép từ khóa danh mục khuyến mãi; **0 lần xuất hiện** trong DOM. |
| **Galaxy Cinema** | `https://www.galaxycine.vn/u22-gia-ve/` | **SYNTHESIZED_GUESS:** Tự đoán định dạng slug; **0 lần xuất hiện** trong DOM. |
| **Jollibee Vietnam** | `https://jollibee.com.vn/thuc-don/combo-tiet-kiem` | **SYNTHESIZED_GUESS:** Tự đoán slug "combo-tiet-kiem"; **0 lần xuất hiện** trong DOM (link thật trên menu là `/mon-moi-mon-ngon.html`). |
| **Jollibee Vietnam** | `https://jollibee.com.vn/combo-khuyen-mai` | **SYNTHESIZED_GUESS:** Tự ghép đường dẫn khuyến mãi; **0 lần xuất hiện** trong DOM. |

### 6.3. Ba chốt kiểm soát QA Regression bổ sung (36/36 Tests Passing)

1. **Chốt kiểm soát điều khoản VERIFIED (`Test 3.12`):**  
   Bất kỳ điều khoản nào mang `status: "VERIFIED"` nhưng thiếu `text_span` (chuỗi không rỗng), `byte_offset` (số nguyên $\ge 0$), hoặc `raw_sha256` (hash SHA-256 64 ký tự khớp raw buffer) **bắt buộc phải FAIL** (tăng `total_spans_failed` và gán `all_passed: false`), không được phép bỏ qua (`skip`).
2. **Chốt kiểm soát biên bản thu nhận Capture Receipt (`Test 3.13`):**  
   Hàm `validateCaptureReceipt` đối soát nghiêm ngặt 3 yếu tố: thương hiệu (`brand_id`), URL đích (`expectedUrl`), và hash raw (`raw_sha256`) trước khi trích xuất timestamp `captured_at`. Nếu sai lệch bất kỳ yếu tố nào, biên bản bị từ chối (`valid: false`) và timestamp giữ `null`.
3. **Chốt kiểm soát tệp Scope Thu nạp (`Test 3.14` & `verify_policy_ingress_scope.cjs`):**  
   Hàm `verifyPolicyIngressScope` thẩm định tự động toàn diện:
   - Hash tệp cha khớp 100% tệp đĩa (`parent_file_sha256_match`).
   - Lát cắt byte tại `[span_start .. span_start + span_length]` khớp chính xác từng ký tự với thẻ nguyên văn (`anchor_tag_raw`).
   - Lát cắt tại `href_start` khớp chính xác giá trị `href_value`.
   - URL đích bằng đúng URL phân giải từ `href_value` và `parent_url`.
   - Ba URL đích khớp chính xác danh mục mục tiêu đơn lẻ đã chốt.
   - Không chứa bất kỳ định trước nào về giá hoặc độ tuổi trong phạm vi kiểm toán.
   - Trạng thái bắt buộc `PROPOSAL_UNVERIFIED` và `capture_authorized: false`. Sai một điều kiện bắt buộc FAIL.

---

## 7. BÁO CÁO THU NẠP NỘI BỘ MỘT LƯỢT THEO PHÊ DUYỆT HỘI ĐỒNG (BATCH 13 CONTROLLED INGRESS EXECUTION)

Thực hiện nghiêm túc **Lệnh công tác tự động N+1 (Auto-Chained N+1 Work Order)** từ Hội đồng nghiệm thu độc lập:
- Phê chuẩn thu nạp một lượt cho đúng 3 URL đích có link provenance 100% khớp raw.
- Ghi nhận quyết định vào scope; khóa cứng `public_approved: false`, `render_permitted: false`.
- Thu raw response, headers đã khử nhạy cảm, mã HTTP status, timestamp thực tế, và SHA-256 vào thư mục run mới, bảo toàn tuyệt đối chứng cứ cũ.
- Áp dụng nghiêm ngặt ranh giới redirect và WAF: không tự ý mở rộng ra ngoài phạm vi, không bypass hay retry ngầm.

### 7.1. Định danh Thư mục Vault & Biên bản Thu nạp Tổng hợp

- **Thư mục Vault Thu nạp Mới:** `06_TRUST_AND_EVIDENCE/batch_13_policy_ingress_vault/run_20260906_075712_2aaec7/`
- **Biên bản Thu nạp Tổng hợp (Unified Ingress Receipt):**  
  `06_TRUST_AND_EVIDENCE/batch_13_policy_ingress_vault/run_20260906_075712_2aaec7/POLICY_INGRESS_CAPTURE_RECEIPT.json`  
  *(SHA-256: `81592e3fe022272f796531f5974335e1b16ca0deec2900c78a1e244b86dca190`)*
- **Runner thu nạp:** `04_DATA_PIPELINE/capture_policy_ingress_targets.cjs`  
  *(SHA-256: `1898d455ee383c3e04ea3a58eac13f60957dbd613bd182315e3ad266d051186e`)*
- **Tệp Scope máy đọc:** `04_DATA_PIPELINE/batch_matrix/BATCH_13_POLICY_INGRESS_SCOPE.json` (v3.0)  
  *(SHA-256: `cdb8ee7b90a4902860b6f57ff63c8bd29e5fbbb5f06d3ef124207f41524fc121`)*
- **Tệp Ma trận máy đọc:** `04_DATA_PIPELINE/batch_matrix/BRAND_POLICY_AUDIT_MATRIX.json` (v3.0)  
  *(SHA-256: `e3c6fb81ac51a16d0e73feda36fe027b5970a43583303cc00749b79d2b6ea1db`)*

---

### 7.2. Bảng Đối soát Chi tiết 3 Mục tiêu Thu nạp Mạng Độc lập

| STT | Ứng viên / Thương hiệu | Target URL | HTTP Status & Response Header | Dung lượng & SHA-256 | Phán quyết Thẩm định Điều khoản (Data & Trust Policy Audit) |
|:---:|---|---|---|---|---|
| 1 | **CGV Cinemas**<br>`CAND_POLICY_CGV_MEMBERSHIP` | `https://www.cgv.vn/default/cgv-membership` | **200 OK**<br>F5 BIG-IP / ASM JavaScript Challenge (`TS015ef8cd_id`) | `5,390 bytes`<br>`5ef9bdd04da5fa7af28a119303ec38cf9ddfc5022973a6b76f2d1f1a239d77b6` | **UNVERIFIED (100%)**<br>- Phản hồi là trang thử thách JavaScript chống bot của hệ thống bảo mật F5 WAF.<br>- Không chứa thân trang HTML rendered hay điều khoản thành viên/U22.<br>- Tuân thủ chỉ đạo Hội đồng: dừng kiểm toán, **không retry ngầm, không bypass**.<br>- Toàn bộ điều khoản U22 giữ `UNVERIFIED`. Không phát hành thẻ. |
| 2 | **Galaxy Cinema**<br>`CAND_POLICY_GALAXY_U22` | `https://www.galaxycine.vn/u22/` | **302 Found**<br>nginx redirect<br>`location: https://www.galaxycine.vn/u22/` | `138 bytes`<br>`753e0dd54f28c4f7009b9c0b18a68aed175416bd8b7d134858264586eaac56f0` | **UNVERIFIED (100%)**<br>- Phản hồi là HTTP 302 Found từ máy chủ nginx.<br>- Tuân thủ chỉ đạo Hội đồng: ghi nhận mã 302 và header `Location`, dừng tại ranh giới scope; **không tự ý mở rộng hay cào sang URL khác**.<br>- Thân phản hồi chỉ có 138 bytes tiêu đề 302 của nginx, không có nội dung điều khoản U22.<br>- Toàn bộ điều khoản giữ `UNVERIFIED`. Không phát hành thẻ. |
| 3 | **Jollibee Vietnam**<br>`CAND_POLICY_JOLLIBEE_MENU` | `https://jollibee.com.vn/mon-moi-mon-ngon.html` | **200 OK**<br>Thực đơn / "Combo Bán Chạy" | `264,495 bytes`<br>`131ae8fcc4a8ed0c66470be43614c448c542ec7b047147a71598531e570b2a33` | **UNVERIFIED (100%)**<br>- Ghi nhận biểu giá 5 combo tiêu chuẩn (73k-185k) trong dữ liệu GA4 eCommerce Magento.<br>- **CHỐT CHẶN HỘI ĐỒNG: Giá thực đơn niêm yết KHÔNG mặc định là giá khuyến mãi/ưu đãi**; không có điều khoản giảm giá so với giá gốc.<br>- Từ khóa "Đà Nẵng" xuất hiện **0 lần** $\rightarrow$ Phạm vi áp dụng tại cửa hàng Đà Nẵng: `UNVERIFIED`.<br>- Đối tượng học sinh/sinh viên: 0 lần $\rightarrow$ `UNVERIFIED`.<br>- Thời hạn hiệu lực: 0 lần $\rightarrow$ `UNVERIFIED`. Không phát hành thẻ. |

---

### 7.3. Cam kết & Bất biến Vận hành Tuyệt đối

1. **Không phát hành thẻ mới:** Cả 3 mục tiêu thu nạp đều có phán quyết `UNVERIFIED`; giữ nghiêm ngặt `public_approved: false`, `render_permitted: false`.
2. **Không thu lại locator:** 22 cơ sở vật lý tại Đà Nẵng từ lượt chạy offline replay được bảo toàn nguyên vẹn 100%.
3. **Staging thương mại:** Duy trì đúng **3 thẻ thương mại** đã thẩm định (`B12_13`, `B12_15`, `B12_05`), đã đối soát Real DOM Staging Guard `PASS`.
4. **Không kích hoạt affiliate links:** 100% affiliate bị khóa cứng.
5. **Live Production đóng băng:** Đóng băng tuyệt đối ở phiên bản `v3.422.0 / 24 thẻ`, `deals_feed.json = []`.
6. **Bất biến Sổ cái Dự án:** Hash SHA-256 của `PROJECT_MEMORY.md` được bảo toàn nguyên vẹn:
   ```text
   3d1c185cdd785666c4b63e7eba618085ab72d595f12be7ecb94b02dc23991455
   ```

---

## 8. BÁO CÁO THU NẠP & ĐỐI SOÁT 5 SẢN PHẨM THỰC ĐƠN JOLLIBEE (JOLLIBEE LEAF INGRESS AUDIT)

Thực hiện Lệnh công tác N+1 Phần 2 của Hội đồng phê chuẩn cho 5 `target_url` có link provenance đã thẩm định:

1. **Thu nạp một lượt an toàn:** Runner `04_DATA_PIPELINE/capture_jollibee_combos.cjs` thực thi độc lập, lưu 5 tệp raw HTML vào `06_TRUST_AND_EVIDENCE/batch_13_policy_ingress_vault/run_jollibee_combos_20260906_082143_dc594d/`.
2. **Kết quả 5/5 HTTP 200 OK:** Không gặp challenge, không gặp redirect; kích thước và SHA-256 được lập biên bản trong `JOLLIBEE_COMBOS_CAPTURE_RECEIPT.json`.
3. **Đối soát chi tiết trang sản phẩm (Leaf Page Audit):**
   - Cấu trúc Magento bundle `isFixedPrice: true`, giá cơ sở khớp 100% giá GA4 eCommerce từ danh mục.
   - 0/5 trang có đề cập đến chi nhánh Đà Nẵng $\rightarrow$ Phạm vi Đà Nẵng giữ nguyên trạng thái **`UNVERIFIED`**.
   - Phân loại chuẩn xác là **"Thực đơn quan sát" (Observed Menu Product)**, không phải ưu đãi khuyến mãi HSSV.
   - Đề xuất Hội đồng xem xét đưa vào Staging duy nhất 1 ứng viên: **`PROD_JOLLIBEE_COMBO_02` — MỘT MÌNH HÍT HÀ** (ID: 679, SKU: 70144, Giá cơ sở: 80.000 ₫).
4. **Bảo toàn bất biến:** Production tiếp tục đóng băng tuyệt đối tại `v3.422.0 / 24 thẻ`. Staging giữ đúng 3 thẻ thương mại (`B12_13`, `B12_15`, `B12_05`).

