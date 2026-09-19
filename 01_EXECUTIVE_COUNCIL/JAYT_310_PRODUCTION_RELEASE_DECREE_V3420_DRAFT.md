# QUYẾT ĐỊNH BAN HÀNH PHÁT HÀNH CHÍNH THỨC (RELEASE DECREE)
**Số hiệu văn bản:** JAYT-310-CEO-RELEASE-DECREE-v3.420.0  
**Thẩm quyền ban hành:** Chủ tịch Hội Đồng Điều Hành / CEO JayT  
**Thời điểm lập dự thảo:** 2026-09-04T12:00:00+07:00  
**Căn cứ pháp lý:** 
- Đề xuất Go-Live v3.420.0 (`01_EXECUTIVE_COUNCIL/JAYT_310_GO_LIVE_V3420_PROPOSAL.md`)
- Biên nhận nghiệm thu Staging MVP (`07_QUALITY_ASSURANCE/runtime_evidence/STAGING_MVP_SIGN_OFF_RECEIPT.json`)
- Biên bản đóng Batch 03B (`06_TRUST_AND_EVIDENCE/JAYT_310_BATCH03B_CLOSURE.json`)
- Biên nhận đối soát Build Manifest (`06_TRUST_AND_EVIDENCE/JAYT_310_BUILD_MANIFEST_RECONCILIATION_RECEIPT.json`)

---

## ĐIỀU 1: PHÊ DUYỆT PHÁT HÀNH PRODUCTION v3.420.0
1. Phê duyệt việc nâng cấp môi trường Production từ phiên bản `v3.419.0` lên phiên bản `v3.420.0`.
2. Phiên bản này là **Bản Phát Hành Tối Thiểu (Staging MVP Go-Live)** phi thương mại, tập trung 100% vào giá trị tiện ích và thông tin xác thực cho cộng đồng Đà Nẵng.

---

## ĐIỀU 2: PHẠM VI NỘI DUNG ĐƯỢC CẤP PHÉP HIỂN THỊ (ITEM-BY-ITEM AUDIT)
Chỉ duy nhất **03 thẻ thông tin** sau đây được phép hiển thị trên giao diện công khai (Public Storefront):

1. **GITHUB_EDUCATION_PILOT_T2**
   - Tiêu đề: *GitHub Student Developer Pack*
   - Phân loại: T2 Public Documentation (Toàn cầu / Xác thực Đà Nẵng)
   - URL nguồn: `https://docs.github.com/en/education`
   - Quyết định: Phê duyệt thí điểm tài liệu chính thức.

2. **BATCH03_DS_07**
   - Tiêu đề: *DanaBus — Thông tin xe buýt Đà Nẵng*
   - Phân loại: T3 Public Utility (Đà Nẵng)
   - URL nguồn: `https://www.danangbus.vn/tin-tuc/tin-tuc/danabus--nguoi-ban-dong-hanh-thong-minh-cua-hanh-khach-xe-buyt-da-nang-5727.html`
   - Quyết định: Phê duyệt thông tin tiện ích công cộng phi thương mại.

3. **J287-HK-STUDENT-POLICY-UED-20260903**
   - Tiêu đề: *UED — Hướng dẫn chế độ chính sách sinh viên*
   - Phân loại: T2 Public Information (Hòa Khánh, Đà Nẵng)
   - URL nguồn: `https://ued.udn.vn/2026/09/03/huong-dan-thuc-hien-thu-tuc-cac-che-do-chinh-sach-3/`
   - Quyết định: Phê duyệt thông tin chính sách học đường phi thương mại.

*Ghi chú:* Toàn bộ 06 slot thuộc phạm vi JAYT-302 không được đưa vào bản phát hành này và được cách ly triệt để trong backlog theo `JAYT_310_BATCH03B_CLOSURE.json`.

---

## ĐIỀU 3: KHÓA BẢO VỆ AN TOÀN & BỀ MẶT THƯƠNG MẠI (STRICT INVARIANTS)
1. **Commercial Feed:** File `05_DEAL_AND_AFFILIATE/deals_feed.json` duy trì trạng thái mảng rỗng tuyệt đối `[]`.
2. **Voucher:** Đặt cố định `voucher_count = 0`; khóa toàn bộ chức năng nhận voucher thương mại.
3. **Affiliate & Tracking:** `FEATURE_FLAGS.AFFILIATE_ACTIVATION = false`; nghiêm cấm tuyệt đối mọi tham số `utm_`, `affiliate`, `ref=`.
4. **Savings Lab:** Duy trì mô hình Local-First 100% chạy trên trình duyệt người dùng; không lưu PII, không gửi network call.

---

## ĐIỀU 4: MÃ BĂM ĐỐI SOÁT & BẰNG CHỨNG KIỂM THỬ ĐẠT CHUẨN
Bản phát hành được bảo chứng bởi các chỉ số mã băm và biên nhận kiểm thử:
- **SOT / Deploy JS SHA-256:** `bbf2b82ee6942634bf6fb405bf2f31519bb28e39b51d9ceb3f6e972f70abaee4`
- **SOT / Deploy HTML SHA-256:** `9e6cedb6e8094ac397924335b5108425e7094d0adf95507240b87136d6f4b1b7`
- **Canonical Registry SHA-256:** `27082d1acb7923ac649a5465ae73615d68c759b8059b1b7a337f8f7b3b303df4`
- **Hệ thống kiểm thử QA:**
  - JAYT-267 Suite: 23/23 PASS
  - JAYT-268 Suite: 23/23 PASS
  - JAYT-282 Harness: 6/6 PASS
  - Tổng QA: 52/52 PASS
  - Section EZ-AO Manifest Parity: 20/20 PASS
  - DOM Audit: PASS (Zero console errors, zero overflow, WCAG AA certified)

---

## ĐIỀU 5: CỬA SỔ PHÁT HÀNH & KẾ HOẠCH ROLLBACK
1. **Nhân sự chịu trách nhiệm:** Lead Operator thực hiện bước deploy; QA Lead & Lead Auditor giám sát runtime; Antigravity hỗ trợ thẩm định mã băm.
2. **Kế hoạch Rollback tức thì:**
   - Nếu xảy ra bất kỳ lỗi runtime nào, console error trên Production, hoặc sai lệch mã băm: Ngay lập tức kích hoạt lệnh rollback, khôi phục Production về `v3.419.0`.
   - Giữ nguyên `deals_feed.json` rỗng `[]`, không tiến hành retry tự động.

---

## ĐIỀU 6: HIỆU LỰC THI HÀNH
Quyết định này có hiệu lực kể từ thời điểm CEO JayT ký phê chuẩn chính thức dưới đây.

**CHỦ TỊCH HỘI ĐỒNG ĐIỀU HÀNH / CEO JAYT**  
*(Chờ ký phát)*