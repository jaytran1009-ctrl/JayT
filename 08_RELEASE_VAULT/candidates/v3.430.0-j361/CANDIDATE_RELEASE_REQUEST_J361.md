# Đề Xuất Phát Hành Candidate v3.430.0 — JAYT-361 R2 Derived Supply Accounting

**Mã đề xuất:** `JAYT_361_CANDIDATE_RELEASE_REQUEST`  
**Phiên bản đích:** `v3.430.0 (Smart Accelerator Release Candidate)`  
**Căn cứ pháp lý:**  
- Phán quyết CEO: [`01_EXECUTIVE_COUNCIL/JAYT_361_CEO_R2_REPRODUCIBILITY_AND_CANDIDATE_GATE.md`](file:///D:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/01_EXECUTIVE_COUNCIL/JAYT_361_CEO_R2_REPRODUCIBILITY_AND_CANDIDATE_GATE.md)  
- Lệnh thi công: [`04_DATA_PIPELINE/dispatch/WORK_ORDER_J361_R2_DERIVED_SUPPLY_ACCOUNTING.json`](file:///D:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/04_DATA_PIPELINE/dispatch/WORK_ORDER_J361_R2_DERIVED_SUPPLY_ACCOUNTING.json)  
**Thời điểm lập:** 2026-09-09T06:40:33.868Z  
**Người đệ trình:** Antigravity Autonomous Pair Programmer  

---

## 1. Kết Quả Kế Toán Cung Ứng Dẫn Xuất & Bằng Chứng (Derived Supply Accounting & Evidence)

Toàn bộ chỉ tiêu định danh và số lượng được dẫn xuất trực tiếp từ ma trận gốc [`06_TRUST_AND_EVIDENCE/batch_19_j361_visual_leaf_vault/CLAIM_PROVENANCE_MATRIX.json`](file:///D:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/06_TRUST_AND_EVIDENCE/batch_19_j361_visual_leaf_vault/CLAIM_PROVENANCE_MATRIX.json) và đối soát chéo 100% với tệp cấp phát ứng viên [`08_RELEASE_VAULT/candidates/v3.430.0-j361/deals_feed.json`](file:///D:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/08_RELEASE_VAULT/candidates/v3.430.0-j361/deals_feed.json) cùng mã nguồn hiển thị [`jayt_storefront_sprint_b.js`](file:///D:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/08_RELEASE_VAULT/candidates/v3.430.0-j361/jayt_storefront_sprint_b.js):

1. **8 Ưu đãi gốc Batch 19 xác minh (Canonical Original Batch 19 Verified):**
   Đạt đầy đủ 8/10 mục gốc với trạng thái `VERIFIED_IN_STORE` / `VERIFIED_CAMPAIGN`, thỏa mãn chỉ tiêu tối thiểu 8 của CEO:
   - `B19_STARLIGHT_U22_WEEKDAY`
   - `B19_STARLIGHT_U22_WEEKEND`
   - `B19_STARLIGHT_THU_3_PHIM_VIET`
   - `B19_TPC_COMBO_COT_MAM_KEO_479K`
   - `B19_TPC_COMBO_COT_MAI_MAN_599K`
   - `B19_TPC_BOGO_PEPSI_15L`
   - `B19_GONGCHA_MEMBER_POLICY`
   - `B19_KATINAT_APP_LOYALTY`

2. **3 Ưu đãi bổ sung Popeyes Active xác minh (Additional Verified Popeyes):**
   Đạt đầy đủ 3 mục Popeyes có `approve: true` trong API chính thức (`api.popeyes.vn`), trang chi tiết HTTP 200 và chi nhánh hoạt động tại Đà Nẵng (179 Núi Thành, Hải Châu):
   - `B19_POPEYES_CORE_89K`
   - `B19_POPEYES_BOGO_DELI_99K`
   - `B19_POPEYES_BO_DOI_145K`

3. **Tổng ưu đãi mới xác minh (Total New Verified Offers):**
   - 8 ưu đãi gốc + 3 ưu đãi Popeyes bổ sung = **11 ưu đãi mới xác minh** (Vượt chỉ tiêu tối thiểu 10). Không có shortfall.

4. **Hồ sơ Khám phá (Discovery Records - 2 mục):**
   - `B19_POPEYES_DISCOVERY_001`
   - `B19_TCH_DISCOVERY_001`

5. **Hồ sơ Tạm giữ Đối soát (Held Records - 4 mục Batch 19, tổng 15 mục):**
   - 2 mục Batch 19 gốc hết mùa / ngừng bán: `B19_TPC_COMBO_VU_LAN_315K`, `B19_TPC_BO_DOI_NHU_Y_169K`.
   - 2 mục Popeyes unapproved BOGO: `B19_POPEYES_BOGO_MON`, `B19_POPEYES_BOGO_WED` (trạng thái `HELD_PENDING_ACTIVE_TERMS` do API cấp một ghi `approve: false`; bảo lưu nguyên vẹn lineage, không đưa vào danh sách verified và không render ra thẻ hiển thị).
   - Tổng hồ sơ held trong `deals_feed.json`: 11 baseline + 4 Batch 19 = 15 mục (`is_public_card: false`).

6. **Định danh Thực thể Chuẩn hóa (Canonical Entities):**
   - Bảo toàn nguyên vẹn **87 thực thể chuẩn hóa** (24 công ích + 63 thương mại). Tuyệt đối không tự sinh thực thể trùng lặp.

---

## 2. Chuẩn Hóa Giao Diện & Trải Nghiệm Storefront

1. **Ba Loại CTA Chuẩn Hóa (Three Standard CTA Types):**
   - Mã thật có chứng cứ: "Sao chép mã" (0 mã copy ảo trên giao diện).
   - Ưu đãi tại quầy / Hội viên: "Xem điều kiện áp dụng ↗" kèm nhãn "Ưu đãi tại quầy" / "Hội viên".
   - Ứng dụng / Ví điện tử: "Mở ưu đãi trên App ↗" sử dụng liên kết chính thức đã chứng minh.
2. **15 Thẻ Radar trên Trang Chủ (HOME):**
   - Hiển thị đầy đủ 15 sản phẩm Smart Value Radar trên HOME với nhãn *"Kiểm tra tại website chính hãng ↗"* dẫn thẳng tới trang sản phẩm Phi Long Technology. 15/15 liên kết đã được thử nghiệm trực tiếp đạt HTTP 200 OK.
3. **Split Bill Chuẩn Ngữ Nghĩa & An Toàn Zero-PII:**
   - Danh mục chia bill gồm chính xác 34 món có giá thực trả (`price_vnd > 0`).
   - Thử nghiệm 238 hoán vị (nhóm 2 đến 8 người cho toàn bộ 34 món): **100% bảo toàn tổng số tiền, sai số 0đ**.
   - Bảo vệ Zero-PII: hoàn toàn lược bỏ trường người trả và tự động làm sạch (sanitizing) số điện thoại, email, CCCD trong mô tả tự do trước khi xuất tin nhắn Zalo.

---

## 3. Bảng Kê Khai Mã Băm Bất Biến Của Gói Candidate v3.430.0

Gói candidate tại thư mục `08_RELEASE_VAULT/candidates/v3.430.0-j361/`:

| Tệp tin | Kích thước (bytes) | Mã băm SHA-256 | Ghi chú trạng thái |
|---|---:|---|---|
| `index.html` | 12949 | `5686180ef75316a3673be8eb6ec82744a9c378ca87ae78ece193c7a6587e6a5f` | Giao diện chuẩn storefront v3.430.0 |
| `jayt_storefront_sprint_b.js` | 220999 | `dfd58c07320fcfb9716863ca6ab62eeba6b58c24d25be0130db8ff34b37a3718` | 3 CTA + 15 Radar on HOME + Zero-PII + 34 món Split Bill |
| `styles.css` | 69273 | `500d04a2cec4e87374d1a7e029f8fd31bb0394a0bdb150b210539ed46c783a49` | Khớp 100% baseline thiết kế |
| `registry.json` | 48314 | `52a8811109df36961edf9714a6e9ff09b3e4e944e3705b458dd189634e1140a3` | Khớp 100% 87 định danh thực thể chuẩn |
| `deals_feed.json` | 58810 | `facd8a4e9b2ff88d720e457e90023adcf431f2e2b14a0ce6395667e44ce42702` | 42 thẻ hoạt động (40 verified + 2 discovery) + 15 held |
| `candidate_manifest.json` | 3201 | `96e8e254c2e63b779688929ae47e3bab0035eb53c0c60ed1174be6b5a740d020` | Niêm phong đầy đủ metadata và rollback plan |

---

## 4. Metadata Vercel Đã Sửa Đổi Chính Xác

- **Tài khoản chủ dự án (Authorized Owner Session):** `kuntran777-6857`.
- **Vercel Project Name:** `jayt-production-v3420` *(Khớp chính xác metadata liên kết)*.
- **Vercel Project ID:** `prj_YzcODtsWLzPWaIVItzd4K6QEWERm`.
- **Vercel Org ID:** `team_rmzYxO79UeiK0VrsTx6xGNOi`.
- **Production Alias đích:** `https://jayt-production-v3420.vercel.app`.
- **Deployment hiện thời:** `dpl_3H3kpJdSN8FiYGDKVqSks2YHDhkJ` (v3.429.0 hotfix baseline).

---

## 5. Kế Hoạch Rollback Dự Phòng Đã Được Đo Lường

- **Standby cấp 1 (Tức thời):** Deployment `dpl_3H3kpJdSN8FiYGDKVqSks2YHDhkJ` (v3.429.0 hotfix baseline). RTO khôi phục: **8,040 ms**.
- **Standby cấp 2 (Dài hạn):** Deployment `dpl_5PUrAGqBthMJjrcHZSc3nCoUf1YL` (v3.428.0). RTO rollback: **11,284 ms**.
- **Lệnh rollback khẩn cấp (nếu cần):**
  ```bash
  npx vercel alias set dpl_3H3kpJdSN8FiYGDKVqSks2YHDhkJ jayt-production-v3420.vercel.app
  ```

---

## 6. Ranh Giới Phát Hành (Release Gate Boundaries)

- **Biên nhận kiểm toán QA:** [`07_QUALITY_ASSURANCE/runtime_evidence/JAYT_361_CANDIDATE_AUDIT_RECEIPT.json`](file:///D:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/runtime_evidence/JAYT_361_CANDIDATE_AUDIT_RECEIPT.json) đạt kết quả: **PASS** toàn diện về kế toán dẫn xuất, 15 Radar links, 238 phép tính Split Bill, và multi-viewport DOM.
- **Trạng thái Release Gate:** Candidate đã đóng gói và niêm phong hoàn chỉnh. **Production deployment v3.430.0 tiếp tục bị KHÓA** cho đến khi Gemini kiểm toán PASS và Chủ tịch Hội đồng ký sắc lệnh Go-Live theo đúng Điều 3 JAYT-361. Production tiếp tục neo an toàn tại v3.429.0 hotfix (`dpl_3H3kpJdSN8FiYGDKVqSks2YHDhkJ`).
