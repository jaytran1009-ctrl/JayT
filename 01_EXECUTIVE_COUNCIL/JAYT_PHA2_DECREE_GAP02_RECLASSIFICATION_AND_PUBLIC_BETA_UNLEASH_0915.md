# JAYT PHA 2 — SẮC LỆNH TỐI CAO TÁI ĐỊNH VỊ GAP_02 & KÍCH HOẠT THƯƠNG MẠI PUBLIC BETA

- **Số hiệu văn bản**: `JAYT-DECREE-2026-0915-GAP02-RECLASSIFICATION-PUBLIC-BETA`
- **Căn cứ điều hành**: `MY_REQUEST_20260915_COMMERCIAL_UNLEASH_NO_MANUAL_PURCHASE`
- **Cơ quan ban hành**: Hội đồng Quản trị Tập đoàn JayT Corp (Chủ tịch HĐQT — Key 1)
- **Cơ quan kiểm toán kỹ trị**: Giám đốc Điều hành (CEO Codex — Key 2)
- **Cơ quan thực thi kỹ thuật**: Khối Vận hành & Kỹ thuật Độc lập Antigravity
- **Thời gian ban hành**: 2026-09-15T14:10:00+07:00 (2026-09-15T07:10:00Z)
- **Trạng thái phê chuẩn**: `GAP_02_RECLASSIFIED__PUBLIC_BETA_UNLEASH_STANDBY`

---

## I. NGUYÊN TẮC THƯƠNG MẠI THỰC TẾ & BẺ KHÓA THẾ KẸT CATCH-22

Hội đồng Quản trị JayT Corp chính thức ban hành phán quyết bẻ gãy thế bế tắc máy móc:

1. **Bác bỏ triệt để bước mua hàng mồi thủ công**:
   - Chủ tịch là nhà lãnh đạo chiến lược của công ty One-Person Corporation (OPC), tuyệt đối không làm kỹ thuật viên đi kiểm thử đơn hàng bằng tiền túi và tài khoản cá nhân.
   - Việc ép người vận hành phải tự mua đơn hàng mồi 20.000₫ là hệ quả của một cái bẫy tư duy máy móc quan liêu giữa hai hệ thống AI.
2. **Quy chuẩn vận hành thực tế của các sàn TMĐT (Shopee, Lazada, TikTok Shop)**:
   - Không có sàn TMĐT nào bắt buộc đối tác phải phát sinh đơn hàng trước thì mới được phép gắn link tiếp thị liên kết lên website.
   - Khi website đã có Partner ID chính thức (`17372870594`), có Feed sản phẩm hợp lệ được niêm phong mật mã 5/5, và các link rút gọn đã kiểm chứng HTTP 301 chuyển hướng chính xác, thì website hoàn toàn đủ điều kiện pháp lý và kỹ thuật để công khai link cho người dùng.
3. **Tái định vị GAP_02**:
   - Chuyển đổi `GAP_02` từ trạng thái **"Chốt chặn mở cổng trước Go-Live (Pre-launch Blocking Gate)"** sang **"Nhiệm vụ kiểm toán và đối soát định kỳ sau phát hành (Post-launch Periodic Reconciliation Audit)"**.
   - Khi trang web kích hoạt Public Beta, 320.000 sinh viên và dân công sở tại Đà Nẵng truy cập và bấm mua deal, đơn hàng tự nhiên sẽ phát sinh. Module `reconcile_w8_conversion_report.cjs` sẽ đóng vai trò engine kiểm toán định kỳ hàng tuần tự động đối soát tệp CSV xuất từ Portal mà không cần thao tác thủ công.

---

## II. KẾ HOẠCH HÀNH ĐỘNG DÀNH CHO KHỐI ANTIGRAVITY (EXECUTION LEAD)

Khối Kỹ thuật Antigravity chấp hành sắc lệnh tối cao, thiết lập quy trình đóng gói Release Candidate:

1. **Chuẩn bị Cờ Thương mại**:
   - Thiết lập cấu hình `affiliate_enabled: true` trong bộ định tuyến thương mại Public Beta.
   - Kích hoạt router Universal Deep Link bọc Partner IDs:
     * Shopee: `17372870594`
     * Lazada: `262501305`
     * TikTok Shop: `VNVNLCB6LYL3`
2. **Đóng gói Bản phát hành Release Candidate (RC)**:
   - Cập nhật `W8_COMMERCIAL_DUAL_KEY_RELEASE_MANIFEST.json` ghi nhận trạng thái:
     `PUBLIC_BETA_UNLEASH_AUTHORIZED__GAP_02_POST_LAUNCH_ACTIVE`.
   - Tính toán lại toàn bộ mã băm SHA-256, bảo đảm quá trình chuyển giao sang phiên bản mới không làm gãy đứt tính liên tục của hệ thống.
3. **Sẵn sàng Triển khai Vercel Production Canonical**:
   - Giữ vững trang web `https://jayt-production-v3420.vercel.app/` hoạt động ổn định với thời gian phản hồi Cashier HUD $\le 30\text{ms}$.

---

## III. QUY CHẾ PHỐI HỢP VỚI CEO CODEX (ZERO-CODE COMPLIANCE)

- CEO Codex tiếp nhận Sắc lệnh `MY_REQUEST_20260915_COMMERCIAL_UNLEASH_NO_MANUAL_PURCHASE` từ Chủ tịch.
- CEO Codex áp dụng quy chế Zero-Code: Không tự viết code, không sửa file, ghi nhận việc tái định vị GAP_02 sang kiểm toán định kỳ sau Go-Live và phát Lệnh Giao Việc hoàn tất cho Antigravity.
- Khi Antigravity hoàn tất đóng gói, CEO Codex chỉ chạy duy nhất 1 lệnh kiểm toán đĩa cứng để xác nhận hệ thống hoàn toàn đồng bộ và ổn định:
  ```powershell
  node scripts/verify_pipeline_seal.cjs && node scripts/verify_w8_feed_toolchain.cjs
  ```

---

*Sắc lệnh có hiệu lực thi hành ngay lập tức. Toàn bộ các quy định trái với sắc lệnh này đều bị bãi bỏ.*
