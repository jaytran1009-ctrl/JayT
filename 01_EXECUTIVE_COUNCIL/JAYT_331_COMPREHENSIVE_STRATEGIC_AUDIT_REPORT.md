# JAYT-331 — Báo cáo kiểm toán chiến lược toàn diện và tái định tuyến Go-Live thương mại

**Trình:** Cố vấn Chiến lược / Chủ tịch Hội đồng Điều hành  
**Đơn vị tổng hợp:** CEO, Product, Data & Trust, QA, Antigravity Engineering  
**Thời điểm chốt số liệu:** 2026-09-07T06:12:13.943Z  
**Chuẩn dữ liệu:** JAYT-245 Zero Synthetic Claim  
**Phạm vi quyết định:** Báo cáo và đề xuất; không cấp quyền deploy Production thương mại.

## Kết luận điều hành

Production phi thương mại `v3.422.0` đang khỏe và phải tiếp tục được bảo toàn. Commercial Staging đã đạt năng lực nạp lô 22 thẻ, nhưng chưa đủ điều kiện đưa nguyên gói lên Production: chỉ 1/22 thẻ có phạm vi Đà Nẵng được xác minh đầy đủ, 1/22 đủ điều kiện kèm ngoại lệ và 20/22 còn `UNVERIFIED`; ngoài ra bằng chứng Narrator cũ đã bị vô hiệu hóa pháp y. Chỉ đạo mới của Chủ tịch dừng kiểm thử Narrator được ghi nhận là **WAIVED/NOT PERFORMED**, tuyệt đối không chuyển thành PASS giả.

Khuyến nghị của CEO: không đặt ngưỡng Go-Live chỉ bằng số lượng. Mở một đợt **Commercial Pilot** khi có tối thiểu 12 thẻ thuộc ít nhất 4 thương hiệu, và từng thẻ đều vượt qua cổng địa phương, độ mới, provenance, nội dung, QA và rollback. Tiếp tục dùng Batch Catalog để đạt ngưỡng này theo lô.

## 1. Tổng kết tài sản dữ liệu đang vận hành

### 1.1 Production công cộng

| Chỉ số | Kết quả thực đo |
|---|---|
| URL | `https://jayt-production-v3420.vercel.app` |
| Baseline | `v3.422.0` |
| HTTP probe | `200 OK`, 318 ms tại 2026-09-07T06:10:17.096Z |
| Danh mục | 24 thẻ phi thương mại; 24/24 URL khớp registry |
| DOM | 24 thẻ trên 1440/768/390 px; 0 console error; 0 runtime error; 0 overflow |
| Khóa thương mại | 0 link affiliate/tracking; `05_DEAL_AND_AFFILIATE/deals_feed.json = []` |
| Giới hạn phát biểu | Đây là snapshot và chuỗi 14/14 probe HTTP 200 của baseline hiện hành, không phải cam kết SLA uptime 100% |

Biên nhận hiện hành: `07_QUALITY_ASSURANCE/runtime_evidence/LIVE_PRODUCTION_MONITOR_RECEIPT.json`  
SHA-256: `15a53113795058adea3d9ee1f013b0f62ae04d6c64cfd5a942e89d1e608a31fa`

### 1.2 Staging dịch vụ công `:4173`

- Danh mục chuẩn trên đĩa: 24 thực thể trong `00_PROGRAM_BASELINE/JAYT_CANONICAL_PUBLIC_APPROVED_REGISTRY.json`.
- Biên nhận hydrate gần nhất xác nhận 24 thẻ, 66/66 assertion PASS và `PERFECT_MATCH_ZERO_DRIFT`.
- **Trạng thái runtime tại thời điểm báo cáo:** `http://127.0.0.1:4173/health` không phản hồi (`fetch failed`). Vì vậy không được báo cáo là đang UP; số 24 là trạng thái đã chứng nhận gần nhất trên đĩa.
- Biên nhận: `07_QUALITY_ASSURANCE/runtime_evidence/STAGING_B11_02_HYDRATION_RECEIPT.json`  
  SHA-256: `cc7c521b8d2a4a15ba7e8ad93f413d789b3f646f6fd9e345ebd901cc2b41c06d`

### 1.3 Staging thương mại `:4176`

| Chỉ số | Kết quả |
|---|---|
| Runtime | HTTP 200 tại `http://127.0.0.1:4176/commercial_test.html` |
| Danh mục | 22 thẻ, 22 ID duy nhất, 22/22 `PUBLIC_APPROVED_STAGING_ONLY` |
| Cơ cấu | Jollibee 5; Phi Long 13; Điện Máy XANH 1; Metiz 1; Galaxy 1; Phúc Long 1 |
| Nạp lô | 10/13 catalog được audit; 22 accepted; 18 mới; 4 cập nhật; 29 record loại; 0 duplicate |
| QA tự động | 22 thẻ mount; 22 link bàn phím truy cập được; 0 console/page error; 0 overflow ở 1440/768/390 px |
| Affiliate | 0 `affiliate_url`; 0 tracking marker; Production không bị sửa |
| Địa phương | 1 `VERIFIED`; 1 `ELIGIBLE_WITH_EXCEPTION`; 20 `UNVERIFIED` |

`PROD_JOLLIBEE_COMBO_02` đã được hợp nhất đúng thành `B14_JB_70144`, giá quan sát 80.000 VND, raw SHA-256 `6c9aff91c21ea0d0d4162562a87bb4429562052da1397298696e2bf67b4e2e92`; trạng thái Staging-only, phạm vi Đà Nẵng chưa xác minh.

Các điểm neo:

- Catalog 22 thẻ: `staging_workspace_j328/approved_commercial_cards.json` — SHA-256 `67d98cdf56380a8cdb1ade3a257cee41ee2c01d05f05e3358391b52ab2da8226`.
- Gói nghiệm thu: `06_TRUST_AND_EVIDENCE/batch_14_catalog_vault/BATCH_14_CATALOG_ACCEPTANCE_PACKAGE.json` — SHA-256 `4daadbcd4115d0d878dc66410173629cee8590dd8e7069416579c6767be0b9b0`.
- Biên nhận hydrate R3: `07_QUALITY_ASSURANCE/runtime_evidence/STAGING_BATCH_14_HYDRATION_RECEIPT_R3.json` — SHA-256 `4bbd21df9438e2b33dbadcc9dc4e3c3fdba0c44bf81d8cc9348d8f3e831de8f8`.
- Sổ cái `PROJECT_MEMORY.md` — SHA-256: `fc6572c43b09b60fd6ab52214100e794f6294684c89894d6cd6849a516625cf0`.

## 2. Kiểm toán điểm nghẽn và hồ sơ tạm giữ

### 2.1 Hồ sơ chính

| Hồ sơ | Trạng thái đúng | Điểm thiếu | Hành động |
|---|---|---|---|
| `B12_03` / `B14_METIZ_U22_2D` | Raw integrity PASS; điều khoản U22 xác minh; địa phương `UNVERIFIED` | Payload chưa có địa chỉ vật lý; headers gốc thiếu; chưa chứng minh hiệu lực tại quầy năm 2026 | Giữ Staging-only với cảnh báo; ghép bằng chứng locator Metiz và xác minh ngày hiệu lực trước pilot |
| `B12_16/18` | `PROPOSED_ONLY` | Chưa có raw provenance và giá/điều kiện hiện hành | Không đưa vào catalog; chỉ kích hoạt lại qua Batch Catalog có nguồn chính thức |
| Jollibee 5 thẻ | Nội dung và hash PASS; 5 probe nguồn bị HTTP 403 | Chưa xác minh áp dụng/phụ phí tại cửa hàng Đà Nẵng | Dùng locator Jollibee để chứng minh hiện diện; kiểm tra giá qua trình duyệt người thật hoặc nguồn API hợp lệ, không retry bot mù |
| Phi Long 13 thẻ | Giá quan sát và nguồn PASS | Chưa xác nhận tồn kho tại showroom Đà Nẵng | Giữ nhãn “giá quan sát”; không dùng claim “còn hàng/rẻ nhất”; bổ sung một snapshot tồn kho địa phương theo lô nếu muốn CTA mạnh hơn |
| R6 Narrator/TTL | `R6_CLOSEOUT_REJECTED__SYNTHETIC_HUMAN_AND_GOVERNANCE_EVIDENCE` | Transcript và chữ ký phòng ban từng được sinh bằng script | Giữ lịch sử nhưng cấm dùng làm chứng cứ. Narrator hiện `WAIVED_BY_CHAIRMAN__NOT_PERFORMED`, không phải PASS; TTL cần quyết định có thẩm quyền nếu dùng để auto-hide Production |

Phán quyết R6: `01_EXECUTIVE_COUNCIL/JAYT_330_R6_FORENSIC_INVALIDATION.json` — SHA-256 `4dba71be262773e489d6e811ca2681ddc2ee7eb52c33a388121d7552b07a8eec`.

### 2.2 Nguyên nhân tốc độ chậm

1. Quy trình cũ gắn scope, capture và duyệt vào từng thẻ thay vì catalog/brand.
2. Nhiều trang sử dụng WAF/Cloudflare hoặc client-side API; bot probe không đại diện trải nghiệm trình duyệt thật.
3. Gộp “giá có trên website” với “áp dụng tại Đà Nẵng/còn hàng” làm tăng nợ xác minh địa phương.
4. Bằng chứng con người và chữ ký từng bị mô phỏng bằng script, buộc phải vô hiệu hóa và làm lại ranh giới quản trị.
5. KPI số lượng khiến catalog lệch mạnh về một thương hiệu (13/22 Phi Long) và chưa đủ độ đa dạng cho người dùng.

### 2.3 Giải pháp tháo gỡ theo JAYT-245

- Dùng **một raw catalog/master page + SHA-256** cho nhiều record, nhưng mỗi record vẫn phải có pointer/ID có thể tái lập.
- Tách ba trục độc lập: `source_content_verified`, `da_nang_applicability`, `local_stock_or_counter_validity`.
- WAF 403 là `PROBE_BLOCKED`, không phải nguồn chết và không phải PASS; chuyển sang bằng chứng browser/operator trong một phiên theo lô.
- Không yêu cầu Narrator như chốt phát hành theo chỉ đạo mới; giữ test keyboard, ARIA, contrast và mobile tự động. Không được tuyên bố đã kiểm thử screen reader.
- Chỉ cho CTA “Mở nguồn”; chưa bật mua hàng, affiliate hoặc cam kết tiết kiệm cho tới khi có chính sách riêng.

## 3. Chuyển đổi sang Mass Catalog Ingress

### 3.1 Năng lực đã hoàn thành

- `04_DATA_PIPELINE/run_batch_14_catalog.cjs`: nạp và chuẩn hóa catalog theo lô.
- `07_QUALITY_ASSURANCE/validate_batch_14_catalog_array.cjs`: kiểm tra array, ID, giá/loại giá, provenance, disclaimer, affiliate lock và dedup.
- `04_DATA_PIPELINE/hydrate_batch_14_staging.cjs`: hydrate catalog đã ký vào Staging thương mại.
- `04_DATA_PIPELINE/harvest_danang_locations.js`: runner locator dùng ma trận cấu hình.
- `npm run harvest:locators`: điểm vào chuẩn cho chu kỳ locator.
- `04_DATA_PIPELINE/batch_matrix/BATCH_14_CATALOG_MATRIX.json`: 13 catalog target; 10 đã audit, 3 bị loại có lý do.

### 3.2 Hàng đợi Store Locator/Menu tổng

Ma trận hiện có 10 thương hiệu `VERIFIED_READY`: Phúc Long, Jollibee, Phi Long, Lotte Cinema, Metiz, CGV, Galaxy Cinema, Điện Máy XANH, Highlands Coffee và Lotteria.  
Tệp: `04_DATA_PIPELINE/batch_matrix/LOCATOR_HARVEST_MATRIX.json` — SHA-256 `e39f3e76d9f49ee1e821e0d36ead45538decc38db970a3653a30d91901c5bf81`.

Ba catalog Batch 14 chưa được nhận:

- CGV: WAF/bot challenge.
- Lotte: payload server không có bảng giá cần thiết.
- Lotteria: Firebase/client-only trả 403.

Phương án: không cào lặp; mở một phiên browser capture theo thương hiệu, lưu response/raw thực và chạy lại parser catalog. Locator và policy được kế thừa theo brand, nhưng giá/ưu đãi vẫn phải có nguồn catalog hiện hành.

## 4. Lộ trình đưa web JayT về đích Go-Live

### 4.1 Ngưỡng đề xuất cho Commercial Pilot

Không dùng ngưỡng “20+ thẻ” đơn độc. Gói pilot chỉ được trình phát hành khi đồng thời đạt:

1. Tối thiểu **12 thẻ**, ít nhất **4 thương hiệu**, không thương hiệu nào chiếm quá 50%.
2. 12/12 có raw provenance/hash và pointer tái lập; 12/12 nguồn chính thức.
3. 12/12 có trạng thái Đà Nẵng `VERIFIED` hoặc `ELIGIBLE_WITH_EXPLICIT_EXCEPTION`; không có `UNVERIFIED` trong gói phát hành.
4. Giá/menu được capture không quá 7 ngày; sản phẩm bán lẻ không quá 14 ngày; chính sách hội viên không quá 30 ngày, hoặc có ngày hết hạn rõ ràng.
5. 0 affiliate/tracking ở pilot đầu; `deals_feed.json` tiếp tục `[]` cho tới sắc lệnh thương mại riêng.
6. QA: 100% array validator, DOM, keyboard, mobile 390 px, console/runtime, duplicate, broken-link và rollback rehearsal PASS.

### 4.2 Phương án tích hợp

- Giữ Production `v3.422.0` nguyên trạng.
- Khôi phục `:4173` và dùng nó làm integration staging cho luồng công ích + module “Giá/Quyền lợi quan sát”.
- Không trộn trực tiếp 22 thẻ thương mại vào registry 24 thẻ. Tạo registry release riêng chỉ chứa subset đã vượt cổng địa phương.
- Module thương mại phải luôn hiển thị thời điểm quan sát, phạm vi áp dụng, cảnh báo giá/tồn kho và nút nguồn; không có CTA mua hàng trong pilot.
- Chuẩn bị release candidate kế tiếp, deploy preview, audit ba viewport, rồi mới trình Chủ tịch một Sắc lệnh Production riêng có rollback về `v3.422.0`.

### 4.3 Work Order N+1 giao Antigravity

**WO-JAYT-331-N1 — Locality Reconciliation & Commercial Pilot Candidate Builder**

1. Product/Data & Trust chốt schema ba trục và điều kiện TTL; không tạo danh tính/chữ ký giả.
2. Engineering chạy `npm run harvest:locators`, xuất danh sách cơ sở Đà Nẵng theo brand và ghép `policy_id` kế thừa.
3. QA xây validator `commercial_pilot_eligibility`: loại tự động record `UNVERIFIED`, quá TTL, thiếu hash/pointer, thiếu disclaimer hoặc có affiliate/tracking.
4. Lead Operator chỉ xử lý một phiên browser batch cho ba nguồn bị WAF/client-only (CGV, Lotte, Lotteria), không capture từng món lẻ.
5. Engineering khôi phục server `:4173`, tạo integration preview read-only; không deploy Production.
6. Đầu ra bắt buộc: `COMMERCIAL_PILOT_ELIGIBLE_SUBSET.json`, `LOCALITY_RECONCILIATION_REPORT.json`, `COMMERCIAL_PILOT_QA_RECEIPT.json` và dự thảo rollback manifest.

## Phán quyết đề nghị Cố vấn Chiến lược

**GO có điều kiện** cho WO-JAYT-331-N1 và việc tiếp tục Mass Catalog Ingress.  
**NO-GO** cho việc đưa nguyên gói 22 thẻ thương mại hiện tại lên Production.  
**Production `v3.422.0` tiếp tục khóa**, không deploy và không bật affiliate/deals feed trong giai đoạn này.
