# JAYT-363 R4 — Báo Cáo Nghiệm Thu Khắc Phục Lệch Byte HTML, Tái Niêm Phong & Tái Lập Kiểm Soát Truy Cập
### Served Preview Drift Resolution, Exact 4/4 Byte Reseal, Provenance Integrity & Access Hardening

**Người nhận:** Codex CEO / Gatekeeper & Hội Đồng Điều Hành  
**Thực hiện:** Đội ngũ Kỹ thuật Antigravity  
**Căn cứ pháp lý:** `CHAIRMAN-SUPREME-MANDATE-2026-0909-GOLIVE-EXECUTION`  
**Lệnh thực thi:** [`04_DATA_PIPELINE/dispatch/WORK_ORDER_J363_R4_SERVED_PREVIEW_RESEAL_AND_ACCESS_HARDENING.json`](file:///D:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/04_DATA_PIPELINE/dispatch/WORK_ORDER_J363_R4_SERVED_PREVIEW_RESEAL_AND_ACCESS_HARDENING.json)  
**Phán quyết tiền đề:** [`01_EXECUTIVE_COUNCIL/JAYT_363_CEO_R4_SERVED_PREVIEW_DRIFT_AND_RESEAL_GATE.md`](file:///D:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/01_EXECUTIVE_COUNCIL/JAYT_363_CEO_R4_SERVED_PREVIEW_DRIFT_AND_RESEAL_GATE.md)  
**Biên nhận nghiệm thu máy R4 (Machine Receipt):** [`07_QUALITY_ASSURANCE/runtime_evidence/STAGING_OBSERVABILITY_RECEIPT.json`](file:///D:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/runtime_evidence/STAGING_OBSERVABILITY_RECEIPT.json)  
**Mã băm biên nhận (Receipt SHA-256):** `e7da6b406066febc349af6cae12dea056e1242b7f89bba9a019af493d25efc19`  
**Thời điểm hoàn tất (UTC):** `2026-09-09T08:53:37.817Z`  
**Phán quyết kép (Dual Verdict):**
- **Cổng Kỹ thuật Staging:** `TECHNICAL_STAGING_SUITE_PASSED` (4/4 tệp tĩnh khớp bit-for-bit, 100% Touch, 100% WCAG Contrast, CLS=0)
- **Cổng Xác thực Bằng chứng Thực địa:** `FACTUAL_CONTENT_GATE_PENDING__ZERO_FIXTURES_AS_FACTS` (Số claim xác thực factual = 0; toàn bộ fixture tự biên đã được cách ly kiểm toán)
- **Phán quyết tổng thể:** `TECHNICAL_STAGING_PASSED__FACTUAL_PROVENANCE_AWAITING_AUTHENTIC_CAPTURES`

---

## 1. Phân Tích Nguyên Nhân Gốc Sai Lệch `/index.html` & Biện Pháp Triệt Tiêu (Root Cause Analysis)

### A. Phát Hiện & Cơ Chế Sai Lệch (Divergence Mechanism)
Trong đợt kiểm toán R3, kết quả live retrieval cho thấy:
- `/index.html` phục vụ: `889 bytes`, SHA-256 `937434b9932682019b58b0a9583619598788dd3aac608ee390f69bddfc908f5a`
- Bản lưu cục bộ / Biên nhận R3: `726 bytes`, SHA-256 `85cb698fe11f8388653346c0d177a15d4a0de1f32fba3b1964df899666fe3952`

**Nguyên nhân xác định chính xác:** **Platform-Injected Content (Vercel Toolbar / Feedback)**  
Khi Vercel Preview kích hoạt tính năng Feedback/Toolbar (`enablePreviewFeedback: true`), Edge Proxy của Vercel tự động kiểm tra header yêu cầu:
- Khi request gửi kèm `Accept: text/html` hoặc `Accept: */*` (hành vi mặc định của curl và trình duyệt), proxy Vercel chặn luồng và bơm thêm đúng 163 bytes mã script vào cuối tệp HTML:
  `<script async data-explicit-opt-in="true" data-deployment-id="..." src="https://vercel.live/_next-live/feedback/feedback.js"></script>`
  làm tệp HTML phình từ 726 bytes lên 889 bytes (`Transfer-Encoding: chunked`).
- Ngược lại, khi Node `https.get` gửi request không có header `Accept`, Vercel Edge Proxy bỏ qua việc chèn script và phục vụ đúng 726 bytes thô.

### B. Biện Pháp Khắc Phục Triệt Để (Architectural Remediation)
1. **Vô hiệu hóa Vercel Toolbar ở cấp độ Project Settings qua REST API:**
   Gọi trực tiếp Vercel REST API (`PATCH /v9/projects/deploy`):
   ```json
   {
     "enablePreviewFeedback": false,
     "enableProductionFeedback": false
   }
   ```
   Thiết lập này triệt tiêu hoàn toàn cơ chế tự động bơm script `feedback.js` từ tầng Edge Proxy.
2. **Triển khai Bản Build Mới Đã Niêm Phong Hoàn Hảo (Fresh Sealed Deployment):**
   - **Preview URL:** [`https://deploy-jcwrz6whl-kuntran777-6857s-projects.vercel.app`](https://deploy-jcwrz6whl-kuntran777-6857s-projects.vercel.app)
   - **Deployment ID:** `dpl_FYTFCbwsL6RdjtpbzYBDtmsHutGq`
   - **Kết quả đối soát:** Cả curl (với `Accept: */*`), Node.js và trình duyệt headless Chromium đều nhận về đúng **726 bytes** với mã băm `85cb698fe11f8388653346c0d177a15d4a0de1f32fba3b1964df899666fe3952` mà **không cần bất kỳ quy tắc chuẩn hóa hay bỏ qua nào**.

---

## 2. Bảng Đối Soát 4/4 Tệp Tĩnh Phục Vụ Thực Tế (4/4 Byte Parity Scorecard)

Tải trực tiếp độc lập từ Vercel Preview CDN (`https://deploy-jcwrz6whl-kuntran777-6857s-projects.vercel.app`):

| Tệp tin | Trạng thái HTTP | Byte Length (Served / Local) | SHA-256 Checksum Phục vụ | SHA-256 Chuẩn Cục bộ | Kết quả đối soát |
|---|:---:|:---:|:---:|:---:|:---:|
| **`/index.html`** | **HTTP 200** | **726 / 726** | `85cb698fe11f8388653346c0d177a15d4a0de1f32fba3b1964df899666fe3952` | `85cb698fe11f8388...` | **100% KHỚP** |
| **`/jayt_apex_interface.js`** | **HTTP 200** | **277,338 / 277,338** | `ae61629dd63764c81f04a61eebeae4964d29011ebb1039e33c9ac820e83fdafa` | `ae61629dd637...` | **100% KHỚP** |
| **`/styles.css`** | **HTTP 200** | **48,171 / 48,171** | `5206d185ac64d5b94b77cab27dd49e0cdde92d9e45356a7bfff9c9dc933ecd9a` | `5206d185ac64...` | **100% KHỚP** |
| **`/deals_feed.json`** | **HTTP 200** | **3 / 3** | `37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570` | `37517e5f3dc6...` | **100% KHỚP (`[]`)** |

---

## 3. Duy Trì Nghiêm Ngặt Kỷ Luật Nguồn R3 (Provenance Contract)

Tuân thủ nghiêm ngặt điều khoản 31 trong Work Order J363 R4:
- **`factual_verified_count = 0`**: Tuyệt đối không thay đổi bất kỳ số liệu thương mại nào trong `J363_CLAIM_PROVENANCE_MATRIX.json`.
- **Cách ly 8 Fixtures tự biên:** Toàn bộ 8 file HTML trong thư mục `claim_artifacts/` duy trì nhãn bắt buộc `SELF_AUTHORED_TEST_FIXTURE__NOT_SOURCE_CAPTURE` và `factual_evidence_valid: false`.
- **9 mục cẩm nang & rạp phim:** Duy trì nhãn `SIMULATION_BENCHMARK`.
- **10 slot cơm sinh viên:** Duy trì nhãn `AWAITING_FIELD_VERIFICATION`.
- **Không tự cấp chứng chỉ factual:** Cổng Factual Content Acceptance vẫn tiếp tục **PENDING** cho đến khi có ảnh chụp/capture xác thực ngoài đời thực từ đối tác.

---

## 4. Tái Lập Kiểm Soát Truy Cập Preview (Restoration of Restricted Access)

Thực hiện đúng yêu cầu: *"Sau khi hoàn tất thu thập đối soát độc lập, khôi phục giới hạn truy cập Preview và ghi nhận chính sách tương ứng"*:
- Dự án Staging Preview được kích hoạt lại cơ chế **SSO Deployment Protection**:
  ```powershell
  npx vercel project protection enable deploy --sso
  ```
- Chính sách kiểm soát truy cập: **Chỉ cho phép tài khoản được ủy quyền trong team Vercel truy cập giao diện Preview**.
- Đảm bảo staging simulator không bị phơi nhiễm công khai vượt quá cửa sổ đo kiểm tối thiểu.

---

## 5. Bảng Tổng Hợp 8 Cổng Kỹ Thuật Đạt Chuẩn (R4 Acceptance Summary)

| STT | Cổng kỹ thuật | Tiêu chí | Kết quả kiểm toán R4 | Phán quyết |
|:---:|:---|:---|:---|:---:|
| **1** | **Served Preview Byte-Binding** | 4/4 tệp tĩnh khớp 100% bit-for-bit từ Preview CDN | Khớp tuyệt đối cả 4 tệp (HTML 726b, JS 277kb, CSS 48kb, Feed 3b) | **PASS** |
| **2** | **Claim Provenance & Quarantine** | Factual verified = 0, cách ly 8 fixtures tự biên | 0 factual verified; 8/8 fixtures cách ly; 19 claims trung thực | **PASS** |
| **3** | **Touch Targets &ge; 44x44px** | 100% controls đạt &ge;44x44px trên cả 3 viewports | 1440px: 50/50 (100%); 768px: 45/45 (100%); 390px: 45/45 (100%) | **PASS** |
| **4** | **WCAG 2.1 AA Contrast** | 100% text elements đạt tỷ lệ &ge; 4.5:1 (hoặc &ge; 3.0:1) | 1440px: 158/158 (100%); 768px: 162/162 (100%); 390px: 162/162 (100%) | **PASS** |
| **5** | **Full-States Accessibility** | Đo kiểm Hover, Focus-visible, Disabled, Modal box | Nút modal close/cancel &ge;44px, focus outline rõ, hover bền | **PASS** |
| **6** | **Ba Viewport Coverage** | 1440px, 768px, 390px không lỗi, không tràn ngang | 0 console errors, 0 page errors, 0 tràn ngang | **PASS** |
| **7** | **Performance Thực Nghiệm** | rAF deltas (p50, p95, max), CLS = 0, không 60 FPS marketing | p50 ~ 7.0ms, max ~ 27.8ms, 100% tương tác đạt CLS = 0 | **PASS** |
| **8** | **Triple Sync & Parity** | Thống nhất mã băm giữa 3 tệp nguồn và 2 Workspace | Apex JS, Stylesheet, Feed Staging đồng bộ tuyệt đối | **PASS** |

---

## 6. Trạng Thái An Toàn & Bảo Lưu Tuyệt Đối Môi Trường Production

- **Production URL:** [Web JayT Production](https://jayt-production-v3420-m2fxvae9d-kuntran777-6857s-projects.vercel.app)
- **Phiên bản Production:** `v3.430.0` (`dpl_72b2G579GhCPSS7A6AoLHrypQa91`)
- **Bảo lưu tuyệt đối:** Không kích hoạt cờ `--prod`, không chuyển đổi alias, không can thiệp mã production.
- **Tiếp thị Liên kết:** Giữ nguyên chế độ thử nghiệm `DRY_RUN_DISABLED_BY_DEFAULT`, doanh thu ghi nhận = 0.
- **Gemini Review & Release Mới:** Tiếp tục bị khóa nghiêm ngặt theo đúng Work Order J363 R4.

---

## 7. Lệnh Tái Hiện & Đối Soát Độc Lập

Codex CEO và Hội Đồng Điều Hành có thể kiểm tra trực tiếp mã băm của 4 tệp phục vụ từ Vercel Preview CDN:

```powershell
# 1. Kiểm tra HTML (726 bytes)
curl.exe -s https://deploy-jcwrz6whl-kuntran777-6857s-projects.vercel.app/index.html -o temp.html; node -e "const fs = require('fs'), c = require('crypto'), b = fs.readFileSync('temp.html'); console.log('HTML:', b.length, c.createHash('sha256').update(b).digest('hex')); fs.unlinkSync('temp.html');"

# 2. Kiểm tra JavaScript (277,338 bytes)
curl.exe -s https://deploy-jcwrz6whl-kuntran777-6857s-projects.vercel.app/jayt_apex_interface.js | node -e "const c = require('crypto'); let b = []; process.stdin.on('data', d => b.push(d)); process.stdin.on('end', () => console.log('JS:', c.createHash('sha256').update(Buffer.concat(b)).digest('hex')));"
```
*(Kết quả mong đợi: HTML: `85cb698fe11f8388...`, JS: `ae61629dd63764c8...`)*
