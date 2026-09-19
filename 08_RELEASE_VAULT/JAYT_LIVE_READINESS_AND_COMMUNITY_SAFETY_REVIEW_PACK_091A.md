# JAYT LIVE READINESS & COMMUNITY SAFETY REVIEW PACK (091A)
> **Chỉ thị**: `JAYT-091A-LIVE-READINESS-AND-COMMUNITY-SAFETY`  
> **Thời điểm đối soát**: `2026-08-25T13:55:00+07:00`  
> **Mục tiêu**: Chuẩn bị phát hành Live HTTPS; Bảo vệ an toàn dữ liệu cộng đồng (0 PII); Quét Regex nghiêm ngặt trên Layers 2–4; Xác lập Release Candidate có hash; Đóng băng production deal feed `[]`.  
> **Trạng thái**: `IMPLEMENTED — PENDING CEO AUDIT`  
> **Khóa sản xuất**: `deals_feed.json: []` (0 records, `is_approved: false`)  
> **Tệp Release Candidate**: [`08_RELEASE_VAULT/RELEASE_CANDIDATE_091A.json`](RELEASE_CANDIDATE_091A.json)  
> **Đặc tả Visual Hybrid Hub**: [`03_SOURCE_OF_TRUTH/VISUAL_HYBRID_HUB_SPEC.md`](../03_SOURCE_OF_TRUTH/VISUAL_HYBRID_HUB_SPEC.md), [`03_SOURCE_OF_TRUTH/visual_hybrid_hub_contract.json`](../03_SOURCE_OF_TRUTH/visual_hybrid_hub_contract.json)  
> **Giao diện Khách hàng**: [`03_SOURCE_OF_TRUTH/jayt_apex_interface.js`](../03_SOURCE_OF_TRUTH/jayt_apex_interface.js), [`03_SOURCE_OF_TRUTH/index.html`](../03_SOURCE_OF_TRUTH/index.html)

---

## 1. BẢNG TỔNG HỢP KIỂM DUYỆT 8 MỤC TIÊU SẴN SÀNG LIVE (091A)

| Mục tiêu | Chi tiết thực thi kỹ thuật | Bằng chứng & Trạng thái |
|:---|:---|:---|
| **1. Cảnh báo bảo mật PII trong Form** | Đặt banner cảnh báo đỏ nổi bật ngay trong khung Radar cộng đồng: *"⚠️ CẢNH BÁO BẢO MẬT: Tuyệt đối KHÔNG nhập họ tên, số điện thoại, email, địa chỉ nhà hay bất kỳ thông tin định danh cá nhân nào..."* | Render trực tiếp trong DOM; đạt chuẩn không thu thập PII. |
| **2. Bộ lọc Redaction Client-side** | Tích hợp hàm `sanitizeCommunitySignalText()` xử lý 100% tại thiết bị: Tự động đổi SĐT thành `[SĐT ĐÃ XÓA]`, email thành `[EMAIL ĐÃ XÓA]`, bóc tách toàn bộ `token`, `auth`, `key`, `session`, `utm_` khỏi URL trước khi lưu local; 0 gửi ra ngoài. | Test đơn vị & tích hợp 100% PASS. |
| **3. Quét Regex nghiêm ngặt Layers 2–4** | Chuyển toàn bộ kiểm thử chuỗi tĩnh sang Regex quét giá (`\d+k`, `\d+\.\d+đ`), mã voucher (`mã:...`, `code:...`), countdowns (`\d+:\d+:\d+`, `còn \d+ ngày`), CTAs mua hàng (`mua ngay`, `đặt vé`, `lấy mã`). | 0 vi phạm trên toàn bộ Layers 2, 3, 4 (Ngoại lệ duy nhất: Trích dẫn chính sách tích điểm hội viên ở Layer 4 có evidence pointer). |
| **4. Kiểm thử Responsive đa Viewport** | Xác nhận không tràn ngang ở 390px, 768px và Desktop; Hàng chip nhu cầu cuộn ngang mượt mà (`scrollbar-width: none`); Touch target toàn bộ nút, input, select $\ge 44\text{px}$; Semantic DOM & Contrast AA. | Giao diện hiển thị tự nhiên, không che khuất nội dung. |
| **5. Tương tác lọc đa chiều thực chất** | Bộ lọc theo Quận (`Hải Châu`, `Thanh Khê`, `Sơn Trà`,...), Nhu cầu (`CINEMA`, `COFFEE_TEA`, `LUNCH`), và Persona (`STUDENT`, `OFFICE`, `FAMILY`) thực sự lọc danh sách 9 địa điểm Watchlist. | Hoạt động reactive theo state máy trạng thái. |
| **6. Đối soát 15 Nguồn chính thức** | 100% URL trỏ trực tiếp đến domain gốc (`metiz.vn`, `cgv.vn`, `galaxycine.vn`, `phela.vn`, `gongcha.com.vn`, `jollibee.com.vn`, `highlandscoffee.com.vn`, `dominos.vn`). | 0 affiliate link, 0 deep link, 0 tracking parameters. |
| **7. Tạo Release Candidate Manifest** | Đóng gói `RELEASE_CANDIDATE_091A.json` với đầy đủ mã băm SHA-256 đối soát cho `index.html`, `jayt_apex_interface.js`, `four_layer_dataset.json`, `visual_hybrid_hub_contract.json`. | 100% SHA-256 Parity SoT === Deploy === Staging. |
| **8. Bảo toàn Khóa Sản Xuất** | `deals_feed.json: []` (0 records, 0 bytes) và `is_approved: false`. | Bất biến sản xuất được khóa an toàn. |

---

## 2. BẢNG MÃ BĂM RELEASE CANDIDATE 091A (DEPLOYABLE BUNDLE)

```json
{
  "release_candidate_id": "JAYT_RELEASE_CANDIDATE_091A",
  "created_at": "2026-08-25T13:55:00+07:00",
  "directive": "JAYT-091A-LIVE-READINESS-AND-COMMUNITY-SAFETY",
  "artifacts": {
    "index.html": {
      "sha256": "4b6ec6cefa771a3e6398f805a8f4cffad9cae564d60322b64d121c27806f4773"
    },
    "jayt_apex_interface.js": {
      "sha256": "b4da523c92db26df3253b879c5c1cbcf3ea671e626e2e50529b47e584f23bc11"
    },
    "four_layer_dataset.json": {
      "sha256": "e305e54d7ffab0604b901cbceca4b1c8f495bf41c0e3526ae7eb0567fbf97dd0"
    },
    "visual_hybrid_hub_contract.json": {
      "sha256": "4ad60773d70eb0e28e18dbcf2f84c8a2efda16ff634f18d781b2bb5e69bf8f88"
    }
  },
  "verification_status": "100% HASH PARITY CONFIRMED ACROSS SOT, DEPLOY, STAGING"
}
```

---

## 3. KẾT QUẢ BỘ KIỂM THỬ 091A (8/8 PASS)

```text
======================================================
🧪 [JAYT-091A-TEST] Khởi chạy bộ kiểm thử Live Readiness & Community Safety 091A...

  [TEST_01_COMMUNITY_FORM_SECURITY_WARNING_AND_CLIENT_SIDE_PII_REDACTION]: [PASS] (Cảnh báo PII + Redaction SĐT, Email, Token URL tại client)
  [TEST_02_REGOROUS_REGEX_SCAN_FORBIDS_PRICES_CODES_COUNTDOWNS_IN_LAYERS_2_3_4]: [PASS] (0 giá, mã, countdowns qua Regex trên Layer 2-4)
  [TEST_03_RESPONSIVE_UI_VIEWPORT_DOM_AND_TOUCH_TARGET_COMPLIANCE]: [PASS] (390px/768px/Desktop 0 tràn ngang, Touch target >= 44px)
  [TEST_04_MULTI_DIMENSIONAL_FILTERING_FUNCTIONAL_VERIFICATION]: [PASS] (Lọc theo Quận, Nhu cầu, Persona thay đổi Watchlist thực chất)
  [TEST_05_OFFICIAL_SOURCE_URL_DOMAIN_AND_ZERO_AFFILIATE_VERIFICATION]: [PASS] (15/15 URL trỏ đúng domain thương hiệu, 0 tracking/affiliate)
  [TEST_06_LAYER_1_HONEST_EMPTY_STATE_AND_NO_PREMATURE_CANDIDATE_PUBLISHING]: [PASS] (Layer 1 Honest Empty State, 0 public pending candidates)
  [TEST_07_RELEASE_CANDIDATE_091A_MANIFEST_AND_100_PERCENT_BYTE_PARITY]: [PASS] (Đóng gói Release Candidate 091A & 100% Hash Parity)
  [TEST_08_PRODUCTION_INVARIANTS_LOCKED]: [PASS] (deals_feed.json: [], is_approved: false)

🟢 [LIVE-READINESS-091A-SUMMARY] Kết quả kiểm thử: 8/8 PASS!
======================================================
```
