# 📋 DAILY OPERATING BRIEF — 2026-08-26 (HARDENED)
**Mã hiệu phiên**: `DOB-20260826-02`  
**Chỉ thị mục tiêu**: `JAYT-130-DAILY-MEMORY-AND-LESSONS-LOOP` & `JAYT-131-STUDENT-DAILY-DECISION-OS`  
**Thời điểm lập**: `2026-08-26T13:15:00+07:00`  
**Người thực hiện**: Antigravity Assistant

---

## 1. TRẠNG THÁI HỆ THỐNG THỰC TẾ (GROUND TRUTH REALITY)
- **Production Live URL**: [https://deploy-ten-xi-48.vercel.app](https://deploy-ten-xi-48.vercel.app)
- **Phiên bản hệ thống**: `v3.248.0` (Production Verified & Deployed)
- **Dữ liệu thật đang có (Real Data Inventory)**:
  - **15 Supply Records** (trong `EVIDENCE_LEDGER_BATCH_131.json` và `daily_supply_feed_126.json`): 5 deal có hạn (CGV Payday 30k, CGV VNPAY BOGO, CGV ZaloPay suất trưa, Metiz U22 45k, Starlight Combo 10k), 8 menu niêm yết (KFC 88k, KFC 189k, Jollibee 73k, Gong Cha 53k, Phúc Long 55k, Phê La 55k, GoGi 529k, WinMart), 1 chính sách recheck (Highlands JCB 20k), 1 dịch vụ công cộng (DanaBus 6k).
  - **26 Địa điểm Watchlist** đối soát thực địa tại 3 Hub sinh viên Đà Nẵng (Hòa Khánh, Ngũ Hành Sơn, Hải Châu).
  - **5 Cụm rạp chiếu phim** chính thức tại Đà Nẵng.
- **Đối soát SHA-256 Byte Parity**: 100% khớp tuyệt đối giữa `03_SOURCE_OF_TRUTH`, `deploy/public` và live response HTTP 200 trên toàn bộ 7 tệp core.

---

## 2. WORK ORDER ĐANG HOẠT ĐỘNG & VIỆC CÒN DỞ (ACTIVE WORK ORDERS & UNFINISHED)
- **Work Order Active**: `JAYT-130-DAILY-MEMORY-AND-LESSONS-LOOP` & `JAYT-131-STUDENT-DAILY-DECISION-OS`
- **Việc còn dở & Rủi ro**:
  1. *Track 1 Affiliate API*: Vẫn khóa fail-closed tại `UNSUPPORTED_PENDING_PROVIDER_DOCS` chờ phê duyệt tài liệu tích hợp chính thức.
  2. *Thỏa thuận hợp tác Merchant offline*: Vận hành trên menu niêm yết công khai đã đối soát, chưa ký kết thương mại độc quyền.
  3. *Biến động giá giỏ hàng*: Phí ship/phụ phí các app thay đổi theo thời tiết/giờ cao điểm -> Phải dùng Chế độ 2 máy tính cục bộ, cấm tự kết luận "app rẻ nhất".
  4. *Hết hạn voucher*: Các ưu đãi Track 2 phải tự động rời catalog khi hết TTL (`valid_to`).

---

## 3. CÁC BẤT BIẾN KHÔNG ĐƯỢC VI PHẠM (GOVERNANCE INVARIANTS)
1. **Tuyệt đối không lặp lại các lỗi đã từng bị loại**:
   - ❌ Không claim vượt bằng chứng (`MODEL ≠ OBSERVED ≠ EVIDENCE`).
   - ❌ Không giả provenance/CDP hoặc làm sai lệch timestamp.
   - ❌ Không tự gán trạng thái `CEO approved` / `Accepted` khi chưa có quyết định chính thức.
   - ❌ Không dùng nguồn ảnh không rõ quyền sở hữu; thiếu ảnh thật bắt buộc dùng Monogram Crest.
   - ❌ Không biến dữ liệu radar cộng đồng thành deal khuyến mãi khi chưa qua thẩm định.
2. **Không sửa trực tiếp `PROJECT_MEMORY.md`**: Bắt buộc cập nhật thông qua script transaction quản trị append-only.
3. **Phân định rõ 3 trạng thái**:
   - `🟢 ĐÃ XÁC THỰC` (Verified)
   - `⚠️ CHỜ ĐỐI SOÁT` (Recheck Pending / Watchlist)
   - `ℹ️ KHÔNG CÓ DỮ LIỆU` (No Data / Insufficient Data)

---

## 4. LỖI LỊCH SỬ ĐÃ TỪNG XẢY RA CẦN ĐẶC BIỆT CHÚ Ý (PAST INCIDENTS & LESSONS)
- **Lỗi 11:05 Context Mismatch (JAYT-128)**: Today Board lúc 11:05 từng hiển thị nhầm KFC ăn tối, CGV phim đêm và DanaBus vì thiếu bộ lọc khung giờ nghiêm ngặt (`valid_time_windows`).
- **Lỗi Placeholder Labels (JAYT-128)**: Các thẻ so sánh nhiều deal từng để nhãn thô "Deal 1", "Deal 2" do hàm render không đọc `benefit_short`.
- **Lỗi Homepage Clutter (JAYT-128)**: Bung tự động 5 card dài bên dưới Today Board làm mất sự tập trung ra quyết định trong 3 giây.
- **Lỗi Image Reuse (JAYT-128)**: Dùng ảnh rạp CGV cho nhiều card khác nhau khi chưa có quyền sở hữu.
- **Lỗi Claim Vượt Thẩm Quyền (JAYT-056B/061E)**: AI tự ghi "CEO approved" hoặc "premium verified" mà không kèm bằng chứng kiểm thử thực tế.

---

## 5. BỐN HÀNH TRÌNH CỐT LÕI (FOUR CORE JOURNEYS)
1. **Lịch rạp 7 ngày (Cinema Planning)**: Tra cứu theo ngày & cụm rạp, phân 3 cấp độ minh bạch, Watchlist tháng tới, 0 dự báo ảo.
2. **So sánh giá thực trả (Real-Pay Comparison)**: `Giá món + Ship − Voucher = Thực trả`, 3 chế độ minh bạch, CTA *"So sánh bằng giá bạn đang thấy"*.
3. **Deal gần theo thời điểm & khu vực (Nearby Savings)**: 3 Cụm sinh viên (Hòa Khánh, Ngũ Hành Sơn, Hải Châu), 0 GPS tracking, max 6 quán ban đầu.
4. **Kèo nhóm & Happy hour (Group & Habit)**: 5 Khung giờ (07:30, 11:05, 14:30, 17:30, 20:00), Kèo nhóm chia bill minh bạch theo đầu người, chặn xe buýt sau 21:00.

---

## 6. ĐIỀU KIỆN NGHIỆM THU VÀ BẰNG CHỨNG BẮT BUỘC (ACCEPTANCE CRITERIA & EVIDENCE)
- [x] **Task 1**: Hoàn tất `EVIDENCE_LEDGER_BATCH_131.json` niêm phong 15 supply records.
- [x] **Task 2**: Refactor Four Core Engines trong `jayt_apex_interface.js` đạt chuẩn Card Truth & Moment-Fit.
- [x] **Task 3**: Xây dựng test suite `test_student_decision_os_131.js` (35/35 PASS).
- [x] **Task 4**: Deploy Vercel Production và kiểm tra SHA-256 byte parity 100%.
- [x] **Task 5**: Chụp bộ ảnh Puppeteer Live (6 Viewports, 5 Slots, 4 Destinations).
- [x] **Task 6**: Ban hành quy chế `OPERATIONAL_CADENCE_AND_SUPPLY_TRACKS.md` và cập nhật nhật ký vận hành Append-Only.
- [x] **Task 7**: Niêm phong `JAYT_131_STUDENT_DECISION_OS_REVIEW_PACK.md` phục vụ CEO kiểm tra thực tế.
