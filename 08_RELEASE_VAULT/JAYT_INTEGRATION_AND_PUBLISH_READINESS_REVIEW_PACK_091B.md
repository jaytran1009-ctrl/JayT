# JAYT INTEGRATION & PUBLISH READINESS REVIEW PACK (091B)
> **Chỉ thị**: `JAYT-091B-INTEGRATION-AND-PUBLISH-READINESS`  
> **Thời điểm đối soát**: `2026-08-25T14:05:00+07:00`  
> **Mục tiêu**: Khắc phục dứt điểm 3 lỗi chặn phát hành; Gắn event handler thật cho form cộng đồng (Click/Keydown + Redaction 0 PII); Kiểm thử E2E bằng Chrome Headless Browser thật tại 390px, 768px, 1440px; Chụp ảnh bằng chứng screenshot; Tách Release Candidate emitter độc lập fail-closed; Tạo Deployment Receipt; Bảo toàn khóa sản xuất `deals_feed.json: []`.  
> **Trạng thái**: `IMPLEMENTED — PENDING CEO AUDIT`  
> **Khóa sản xuất**: `deals_feed.json: []` (0 records, `is_approved: false`)  
> **Tệp Release Candidate**: [`08_RELEASE_VAULT/RELEASE_CANDIDATE_091B.json`](RELEASE_CANDIDATE_091B.json)  
> **Biên lai triển khai**: [`08_RELEASE_VAULT/DEPLOYMENT_RECEIPT_091B.json`](DEPLOYMENT_RECEIPT_091B.json)  
> **Ảnh bằng chứng UI**:  
> - Mobile 390px: [`07_QUALITY_ASSURANCE/runtime_evidence/screenshots_091b/mobile_390px.png`](../07_QUALITY_ASSURANCE/runtime_evidence/screenshots_091b/mobile_390px.png)  
> - Tablet 768px: [`07_QUALITY_ASSURANCE/runtime_evidence/screenshots_091b/tablet_768px.png`](../07_QUALITY_ASSURANCE/runtime_evidence/screenshots_091b/tablet_768px.png)  
> - Desktop 1440px: [`07_QUALITY_ASSURANCE/runtime_evidence/screenshots_091b/desktop_1440px.png`](../07_QUALITY_ASSURANCE/runtime_evidence/screenshots_091b/desktop_1440px.png)

---

## 1. BẢNG TỔNG HỢP KHẮC PHỤC 3 LỖI CHẶN & 8 MỤC TIÊU 091B

| Hạng mục | Chi tiết thực thi kỹ thuật | Bằng chứng kiểm thử Browser Thật |
|:---|:---|:---|
| **1. Handler Thật Form Cộng Đồng** | Gắn event listener thực tế cho `#btn-submit-community-signal` (click) và `#community-signal-input` (Enter); đọc input $\rightarrow$ sanitize $\rightarrow$ giới hạn 500 ký tự $\rightarrow$ lưu localStorage $\rightarrow$ re-render với nhãn `⚠️ CHƯA XÁC MINH`; Form trống không tạo tín hiệu mẫu. | **TEST 01 PASS** (Puppeteer gõ SĐT, email, tracking token và click nút $\rightarrow$ DOM render sạch 100% PII; Form trống không sinh card). |
| **2. Test Responsive Browser Thật** | Khởi chạy Chrome thật qua Puppeteer; đo `scrollWidth <= viewportWidth` tại 390px, 768px, 1440px; đo `getBoundingClientRect()` toàn bộ nút/dropdown $\ge 44\text{px}$; chụp ảnh screenshot full page. | **TEST 02 PASS** (`scrollWidth` 390px = 390; 0 violation touch target; 3 ảnh PNG lưu trên đĩa). |
| **3. Test Tương Tác Filter Thật** | Thao tác chọn Quận qua `#select-hub-district` (Hải Châu) $\rightarrow$ card Watchlist chuyển thành 4; Chọn Nhu cầu `#select-hub-need` (Cinema) $\rightarrow$ card chuyển thành 4 rạp; Reset $\rightarrow$ 9 địa điểm. | **TEST 03 PASS** (DOM thực tế lọc đúng danh sách quán/rạp theo state). |
| **4. Tách Emitter Khỏi Bộ Test** | Tạo `08_RELEASE_VAULT/emit_release_candidate_091b.js` riêng biệt; fail-closed khi file tồn tại mà không có `--force`; Test 091B hoàn toàn **READ-ONLY** (không `writeFileSync`). | **TEST 07 PASS** (Test chỉ đọc và đối chiếu mã băm). |
| **5. Quét Regex Nghiêm Ngặt** | Quét toàn diện Layers 2, 3, 4 bằng Regex để đảm bảo 0 giá, mã, countdown hay CTA mua hàng chưa xác minh. | **TEST 04 PASS** (0 vi phạm). |
| **6. 15 Nguồn Chính Thức** | 100% URL trỏ đúng domain thương hiệu (`metiz.vn`, `cgv.vn`, `galaxycine.vn`, `phela.vn`, `gongcha.com.vn`, `jollibee.com.vn`, `highlandscoffee.com.vn`, `dominos.vn`); 0 affiliate / tracking params. | **TEST 05 PASS** (15/15 URL hợp lệ). |
| **7. Layer 1 Honest Empty State** | Layer 1 hiển thị 0 deal công khai, dẫn hướng trung thực sang Watchlist. | **TEST 06 PASS**. |
| **8. Biên Lai Triển Khai & Khóa Sản Xuất** | Đóng gói `DEPLOYMENT_RECEIPT_091B.json`; `deals_feed.json: []` (0 records) và `is_approved: false`. | **TEST 08 PASS**. |

---

## 2. BẢNG MÃ BĂM RELEASE CANDIDATE 091B (DEPLOYABLE BUNDLE)

```json
{
  "release_candidate_id": "JAYT_RELEASE_CANDIDATE_091B",
  "version": "2.1.0",
  "created_at": "2026-08-25T14:02:00.000Z",
  "directive": "JAYT-091B-INTEGRATION-AND-PUBLISH-READINESS",
  "bundle_type": "VISUAL_HYBRID_HUB_V2",
  "status": "EMITTED_PENDING_CEO_REVIEW",
  "artifacts": {
    "index.html": {
      "sha256": "4b6ec6cefa771a3e6398f805a8f4cffad9cae564d60322b64d121c27806f4773",
      "size_bytes": 10565
    },
    "jayt_apex_interface.js": {
      "sha256": "d4df96a7aaefb457e5d8ff681938507da6bcba5ea83cba427181c03c51806e30",
      "size_bytes": 158784
    },
    "four_layer_dataset.json": {
      "sha256": "e305e54d7ffab0604b901cbceca4b1c8f495bf41c0e3526ae7eb0567fbf97dd0",
      "size_bytes": 14197
    },
    "visual_hybrid_hub_contract.json": {
      "sha256": "4ad60773d70eb0e28e18dbcf2f84c8a2efda16ff634f18d781b2bb5e69bf8f88",
      "size_bytes": 2840
    },
    "customer_journey_north_star.json": {
      "sha256": "cbf7fe8f075d9e5f5f4b52cbe99c7553b47f4803db129e9253457e9309bcf72c",
      "size_bytes": 3520
    }
  },
  "invariants": {
    "production_feed_empty": true,
    "ceo_approval_locked": false,
    "zero_pii_storage": true
  }
}
```

---

## 3. KẾT QUẢ KIỂM THỬ BROWSER THỰC TẾ 091B (8/8 PASS)

```text
======================================================
🧪 [JAYT-091B-TEST] Khởi chạy bộ kiểm thử Integration & Publish Readiness 091B...

  [TEST_01_REAL_BROWSER_COMMUNITY_FORM_INTEGRATION_AND_PII_REDACTION]: [PASS] (Click/Enter, Redact SĐT, Email, Token URL tại DOM, Form trống 0 tạo card)
  [TEST_02_REAL_BROWSER_VIEWPORT_AND_TOUCH_TARGETS_390_768_1440]: [PASS] (scrollWidth 390=390, 768=768, 1440=1440; Touch target >= 44px; Đã lưu 3 screenshot PNG)
  [TEST_03_REAL_BROWSER_MULTI_DIMENSIONAL_FILTER_INTERACTION]: [PASS] (Lọc Quận Hải Châu -> 4 quán/rạp; Lọc Nhu cầu Cinema -> 4 rạp; Reset -> 9 địa điểm)
  [TEST_04_RIGOROUS_REGEX_SCAN_FORBIDS_UNVERIFIED_CLAIMS_IN_LAYERS_2_4]: [PASS] (0 giá, mã, countdowns qua Regex trên Layer 2-4)
  [TEST_05_OFFICIAL_SOURCE_URL_DOMAIN_AND_ZERO_AFFILIATE_VERIFICATION]: [PASS] (15/15 URL trỏ đúng domain thương hiệu, 0 tracking/affiliate)
  [TEST_06_LAYER_1_HONEST_EMPTY_STATE_AND_ISOLATION_OF_PENDING_CANDIDATES]: [PASS] (Layer 1 Honest Empty State, 0 public pending candidates)
  [TEST_07_READ_ONLY_VERIFICATION_OF_RELEASE_CANDIDATE_091B_AND_BYTE_PARITY]: [PASS] (Test read-only, đối soát 100% hash parity)
  [TEST_08_PRODUCTION_INVARIANTS_LOCKED]: [PASS] (deals_feed.json: [], is_approved: false)

🟢 [INTEGRATION-091B-SUMMARY] Kết quả kiểm thử: 8/8 PASS!
======================================================
```
