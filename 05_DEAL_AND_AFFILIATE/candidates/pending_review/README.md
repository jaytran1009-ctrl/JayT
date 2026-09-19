# HÀNG ĐỢI RÀ SOÁT DEAL NGUỒN CÔNG KHAI (PENDING REVIEW QUEUE)
**Thư mục:** `05_DEAL_AND_AFFILIATE/candidates/pending_review/`  
**Cấp độ an ninh:** `FAIL-CLOSED & ZERO AUTO-IMPORT ENFORCED`  
**Trạng thái toàn hàng đợi:** `100% NEEDS_RECHECK (ZERO CANDIDATE APPROVED)`

---

## 1. Nguyên Tắc Vận Hành Hàng Đợi (Queue Operating Discipline)

1. **Chỉ Chứa Bản Thảo Đang Chờ Kiểm Tra (Genuine Drafts Only)**:
   - Thư mục này chỉ lưu trữ các hồ sơ rà soát nguồn công khai thực tế đang chờ bổ sung bằng chứng thô hợp lệ.
   - Toàn bộ hồ sơ giả lập/vi phạm dùng cho kiểm thử tự động đã được chuyển sang `07_QUALITY_ASSURANCE/fixtures/catalog_candidates/`.
2. **Trạng Thái Hiện Tại Của 100% Hồ Sơ**:
   - Tất cả **9 hồ sơ** trong hàng đợi đang ở trạng thái **`NEEDS_RECHECK`**.
   - **Tuyệt đối không có hồ sơ nào được cấp trạng thái `PASS`** cho đến khi có tệp lưu vết thực tế (ảnh chụp màn hình trình duyệt / raw HTTPS response payload).
3. **Quy Trình Chụp Vết Nguồn Công Khai (Public-Source Capture Rules)**:
   - Tuyệt đối không vượt `robots.txt`, CAPTCHA, đăng nhập hoặc cơ chế chống bot.
   - Tuyệt đối không liên hệ merchant.
   - Không tạo claim nếu không lấy được tệp lưu vết nguyên bản từ URL công khai.
   - Tuyệt đối không tự động nạp (`auto-import`) vào `deals_feed.json` hoặc `evidence_store.json`.

---

## 2. Danh Sách 9 Hồ Sơ Rà Soát Đang Chờ Trong Hàng Đợi

| STT | Tệp Hồ Sơ | Mã Deal | Trạng Thái | Lý Do NEEDS_RECHECK | Bước Tiếp Theo Cần Bổ Sung |
|:---:|---|---|:---:|---|---|
| 1 | `candidate_01_lunch_student_bk.json` | `DNG-SPFOOD-COMGA-BK` | 🟡 `NEEDS_RECHECK` | URL trang chủ chung ShopeeFood, thiếu đường dẫn menu cụ thể của quán. | Chụp ảnh màn hình thực đơn quán trên app/web ShopeeFood có thể hiện rõ giá 28K. |
| 2 | `candidate_02_lunch_office_cbd.json` | `DNG-SPFOOD-COMNIEU-CBD` | 🟡 `NEEDS_RECHECK` | URL trang chủ chung ShopeeFood, thiếu link chiến dịch cụ thể. | Lưu raw HTML / screenshot trang giỏ hàng áp mã giảm 20K. |
| 3 | `candidate_03_coffee_work_tch.json` | `DNG-TCH-NVL-WORK` | 🟡 `NEEDS_RECHECK` | URL trang chủ chung The Coffee House, thiếu trang ưu đãi combo. | Chụp screenshot bài đăng ưu đãi combo 39K từ trang tin chính thức. |
| 4 | `candidate_04_entertainment_cgv_vincom.json` | `DNG-CGV-VINCOM-LATE` | 🟡 `NEEDS_RECHECK` | URL trang chủ chung CGV Cinemas, thiếu trang biểu phí suất đêm. | Lưu PDF / screenshot bảng giá vé suất đêm tại rạp CGV Vincom Đà Nẵng. |
| 5 | `candidate_05_online_shopee_tech.json` | `ONL-SHOPEE-TECH-50K` | 🟡 `NEEDS_RECHECK` | URL trang chủ Shopee, thiếu trang thể lệ voucher công nghệ 50K. | Chụp ảnh màn hình banner voucher công nghệ và thể lệ áp dụng. |
| 6 | `candidate_06_online_tiktok_central_food.json` | `ONL-TIKTOK-MIENTRUNG-30K` | 🟡 `NEEDS_RECHECK` | URL trang chủ TikTok, thiếu đường dẫn phiên livestream đặc sản. | Chụp screenshot thông tin phiên live và voucher 30K trên TikTok Shop. |
| 7 | `candidate_07_coffee_highlands_stale.json` | `DNG-HIGHLANDS-STALE-FREEZE` | 🟡 `NEEDS_RECHECK` | Bằng chứng cũ từ năm 2024 (>90 ngày), giá có thể đã thay đổi. | Rà soát lại biểu giá đồ uống mới nhất năm 2026 và lưu snapshot mới. |
| 8 | `candidate_13_metiz_student_exact_offer.json` | `DNG-METIZ-STUDENT-45K-OFFER` | 🟡 `NEEDS_RECHECK` | `metiz.vn` chặn robots tự động, thiếu tệp lưu vết độc lập. | Lưu browser snapshot / ảnh chụp trang khuyến mãi vé HSSV 45K từ trình duyệt. |
| 9 | `candidate_14_provenance_verified_deal.json` | `DNG-TCH-PROVENANCE-WORK` | 🟡 `NEEDS_RECHECK` | Tệp lưu vết `.txt` là bản tự tường thuật, chưa có raw HTML/ảnh chụp. | Lưu raw HTML hoặc browser fullpage screenshot trang ưu đãi The Coffee House. |

---

## 3. Tiêu Chuẩn Duyệt Thủ Công Dành Cho CEO (Manual CEO Approval Gate)

Chỉ một hồ sơ đáp ứng đủ **toàn bộ 5 điều kiện** sau mới được lập phiếu trình duyệt thủ công lên CEO:
1. Có tệp lưu vết thực tế định dạng `.png`, `.jpg`, `.pdf`, hoặc `.html`/`.json` thô lưu tại `evidence_snapshots/`.
2. Mã băm `evidence_content_hash` khớp 100% SHA-256 của tệp trên đĩa.
3. `artifact_source_url` khớp hoàn toàn với `source_url` của deal.
4. Nội dung tệp lưu vết thể hiện rõ ràng: mức giá chiết khấu, điều kiện áp dụng, và mốc thời hạn có hiệu lực.
5. Không vi phạm bất kỳ quy tắc an toàn tên miền, protocol HTTPS, hoặc phân định affiliate.
