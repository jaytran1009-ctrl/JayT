# HỒ SƠ KIỂM TOÁN NỘI BỘ GÓI ỨNG VIÊN PHÁT HÀNH v3.422.0 (RC 24 THẺ)
**Mã chỉ thị điều phối:** JAYT-326 (Auto-Chained N+1 Work Order)  
**Thời điểm lập hồ sơ:** 2026-09-05T07:45:00Z  
**Phân loại:** Internal Release Candidate Verification Dossier (Zero Production Mutation)

---

## 1. TỔNG QUAN VÀ MỤC TIÊU
Thực hiện chỉ thị Ban Điều Hành về việc chuẩn bị gói ứng viên phát hành nội bộ cho phiên bản **v3.422.0**:
- Tích hợp 24 thực thể không thương mại: **22 thực thể Production hiện hành v3.421.0** + **B11_01** (Thông tin chuyến bay Danang Smart City) + **B11_02** (Lịch biểu diễn văn hóa Bảo tàng Chăm).
- Kế thừa URL chính thức đã đối soát từ live v3.421.0 (`https://docs.github.com/en/education`), cách ly triệt để khỏi URL con chưa hiệu đính của Staging.
- Bổ sung nguyên văn 100% các điều khoản miễn trừ trách nhiệm pháp lý bắt buộc và quy tắc chu kỳ lịch trình cho B11_01 & B11_02.
- Thực hiện kiểm thử toàn diện DOM, WCAG 2.1 AA, khóa thương mại, touch targets, chống tràn giao diện ngang trên 3 viewports.
- Thiết lập Candidate Manifest có khóa phát hành nghiêm ngặt (`is_approved: false`, `deployment_permitted: false`) kèm phương án rollback xác định về v3.421.0 (22 thẻ).
- **Tuyệt đối không can thiệp, không deploy, không làm gián đoạn Production live.**

---

## 2. BẢNG ĐỐI CHIẾU THỰC THỂ REGISTRY ỨNG VIÊN v3.422.0 (24/24 ITEMS)

| STT | Candidate ID | Phân Tầng | URL Chính Thức | Trạng Thái Đối Soát |
|:---:|:---|:---:|:---|:---:|
| 1 | `GITHUB_EDUCATION_PILOT_T2` | T2 Doc | `https://docs.github.com/en/education` | Khớp chính xác (===) |
| 2 | `BATCH03_DS_07` | T2 Bus | `https://www.danangbus.vn/tin-tuc/tin-tuc/danabus--nguoi-ban-dong-hanh-thong-minh-cua-hanh-khach-xe-buyt-da-nang-5727.html` | Khớp chính xác (===) |
| 3 | `J287-HK-STUDENT-POLICY-UED-20260903` | T2 Policy | `https://ued.udn.vn/2026/09/03/huong-dan-thuc-hien-thu-tuc-cac-che-do-chinh-sach-3/` | Khớp chính xác (===) |
| 4 | `B04_02_KY_SO_TOAN_DAN_Y_TE` | T2 Public | `https://sdttg.danang.gov.vn/chi-tiet-tin/group/167/nid/4819/trien-khai-phan-he-ky-so-toan-dan-tai-da-nang-buoc-tien-moi-trong-dich-vu-cong-va-y-te` | Khớp chính xác (===) |
| 5 | `B04_07_THU_VIEN_SO_HOC_LIEU_UED` | T2 Edu | `https://ued.udn.vn/2026/07/15/ued-tiep-nhan-he-thong-quan-ly-thu-vien-skoolib-do-cong-ty-tnhh-bookshare-tai-tro/` | Khớp chính xác (===) |
| 6 | `B04_06_AN_TOAN_TIEM_CHUNG_CDC_DANANG` | T2 Health | `https://ksbtdanang.vn/cam-nang-vac-xin/quy-trinh-tiem-chung-tai-cdc-da-nang/quy-trinh-tiem-chung-16.html` | Khớp chính xác (===) |
| 7 | `B04_10_LICH_TIEM_CHUNG_TRE_EM_CDC_DANANG` | T2 Health | `https://ksbtdanang.vn/cam-nang-vac-xin/lich-tiem-chung-cho-tre-em-11/lich-tiem-chung-cho-tre-em-17.html` | Khớp chính xác (===) |
| 8 | `B05_01_LICH_TIEM_CHUNG_THAI_KY_CDC_DANANG` | T2 Health | `https://ksbtdanang.vn/cam-nang-vac-xin/lich-tiem-chung-cho-tre-em-11/lich-tiem-chung-cho-phu-nu-mang-thai-va-trong-thai-ky-18.html` | Khớp chính xác (===) |
| 9 | `B05_03_DANABUS_TUYEN_05_HOA_HIEP_NAM_BIEN_DONG` | T2 Bus | `https://www.danangbus.vn/tin-tuc/tin-tuc/len-tuyen-05-vi-vu-da-nang-tu-tay-bac-den-bien-dong-5758.html` | Khớp chính xác (===) |
| 10 | `B06_01_DANABUS_CHUYEN_DOI_XE_BUYT_DIEN_02_13_21` | T2 Bus | `https://www.danangbus.vn/tin-tuc/tin-tuc/thong-bao-ve-viec-chuyen-doi-xe-buyt-su-dung-dien-tren-cac-tuyen-xe-buyt-khong-tro-gia-so-02-13-va-21-5761.html` | Khớp chính xác (===) |
| 11 | `B06_03_HUONG_DAN_DICH_VU_CONG_TRUC_TUYEN_DANANG` | T2 Civic | `https://duynghia.danang.gov.vn/vi/web/xa-duy-nghia/w/huong-dan-cong-dan-nop-ho-so-truc-tuyen-tren-cong-dich-vu-cong-quoc-gia` | Khớp chính xác (===) |
| 12 | `B06_02_BAN_TIN_SUC_KHOE_CONG_DONG_CDC_DANANG` | T2 Health | `https://ksbtdanang.vn/tai-lieu-truyen-thong-gdsk/ban-tin-skcd/ban-tin-suc-khoe-cong-dong-ky-7-2026-77.html` | Khớp chính xác (===) |
| 13 | `B07_01_DANABUS_CHUYEN_DOI_XE_BUYT_DIEN_03_09_14` | T2 Bus | `https://www.danangbus.vn/tin-tuc/tin-tuc/thong-bao-ve-viec-dieu-chinh-phuong-tien-khai-thac-tren-cac-tuyen-xe-buyt-khong-tro-gia-so-03-09-va-14-5760.html` | Khớp chính xác (===) |
| 14 | `B07_02_CAM_NANG_AN_TOAN_SO_DEEPFAKE_1022` | T2 Safety | `https://1022.vn/cam-nang-nhan-dien-va-phong-chong-lua-dao-truc-tuyen-lua-dao-cuoc-goi-video-deepfake/` | Khớp chính xác (===) |
| 15 | `B07_03_TRA_CUU_MAY_KHU_RUNG_TIM_AED_CONG_CONG_1022` | T2 Medical | `https://1022.vn/%f0%9f%9a%a8-tinh-huong-khan-cap-tim-may-khu-rung-tim-tu-dong-aed-o-dau/` | Khớp chính xác (===) |
| 16 | `B08_01_BAN_DO_SO_UNG_PHO_LU_LUT_HOA_XUAN_1022` | T2 Map | `https://1022.vn/xay-dung-ban-do-so-phuc-vu-ung-pho-lu-lut/` | Khớp chính xác (===) |
| 17 | `B08_03_TIEN_ICH_SO_CONG_DONG_WIFI_AN_HAI_1022` | T2 Civic | `https://1022.vn/an-hai-day-manh-chuyen-doi-so-phuc-vu-nguoi-dan-doanh-nghiep/` | Khớp chính xác (===) |
| 18 | `B09_01_DANABUS_TUYEN_11_XUAN_DIEU_BEN_XE_TIEN_SA` | T2 Bus | `https://www.danangbus.vn/tin-tuc/tin-tuc/chi-mot-tuyen-xe-mo-ra-ca-da-nang-ket-noi-hoc-tap-y-te-mua-sam-va-giai-tri-5757.html` | Khớp chính xác (===) |
| 19 | `B09_02_TRO_LY_SO_DANANG_AI_PHO_BIEN_PHAP_LUAT_1022` | T2 AI | `https://1022.vn/da-nang-ung-dung-chuyen-doi-so-dua-phap-luat-vao-cuoc-song/` | Khớp chính xác (===) |
| 20 | `B09_03_CHIEN_DICH_BAO_VE_DANH_TINH_SO_MA_SO_THUE_1022` | T2 Safety | `https://1022.vn/chien-dich-lam-sach-ma-so-thue-thao-go-diem-nghen-trong-kinh-doanh-loi-ich-kep-cho-doanh-nghiep-va-nguoi-dan/` | Khớp chính xác (===) |
| 21 | `B10_01_DIEM_TIEP_NHAN_THU_TUC_HANH_CHINH_TAM_KY_1022` | T2 Admin | `https://1022.vn/bo-tri-diem-tang-cuong-tiep-nhan-thu-tuc-hanh-chinh-cap-so-tai-phuong-tam-ky/` | Khớp chính xác (===) |
| 22 | `B10_02_PHO_CAP_KY_NANG_SO_VNEID_PHU_NU_1022` | T2 Safety | `https://1022.vn/dua-ky-nang-so-den-voi-phu-nu-vung-cao/` | Khớp chính xác (===) |
| 23 | `B11_01_TRA_CUU_CHUYEN_BAY_DANANG_SMART_CITY_1022` | T2 Nav | `https://1022.vn/ra-mat-tien-ich-thong-tin-chuyen-bay-tren-ung-dung-danang-smart-city/` | Khớp chính xác (===) |
| 24 | `B11_02_HOAT_DONG_VAN_HOA_BAO_TANG_CHAM_1022` | T2 Culture | `https://1022.vn/nhieu-trai-nghiem-moi-cho-du-khach-tai-bao-tang-dieu-khac-cham-da-nang/` | Khớp chính xác (===) |

---

## 3. NGUYÊN VĂN MIỄN TRỪ PHÁP LÝ & QUY TẮC LỊCH TRÌNH B11
1. **B11_01 Disclaimer:**
   > *"Thông tin tiện ích theo bài đăng của Cổng 1022 Đà Nẵng; không bán vé, không nhận đặt chỗ, không thu phí và không cam kết dữ liệu chuyến bay theo thời gian thực."*
2. **B11_02 Disclaimer:**
   > *"Lịch biểu diễn văn hóa nghệ thuật định kỳ tại Bảo tàng Điêu khắc Chăm Đà Nẵng; người xem cần đối soát thông báo trực tiếp từ ban quản lý bảo tàng trong trường hợp có điều chỉnh thời tiết hoặc lịch đón tiếp ngoại giao."*
3. **B11_02 Quy tắc chu kỳ:**
   > *"buổi sáng các ngày 15 và 30 hằng tháng"*

---

## 4. KẾT QUẢ KIỂM TOÁN TỰ ĐỘNG & BẰNG CHỨNG THỰC THI (QA & DOM AUDIT)
- **QA Test Suite (`RC_V3422_QA_RECEIPT.json`):** 29/29 tests PASS tuyệt đối.
  - Parity: 24/24 cards rendered trên cả Desktop 1440, Tablet 768 và Mobile 390.
  - So khớp URL: 24/24 URL khớp chính xác từng ký tự (`===`).
  - Miễn trừ B11: Xác nhận nguyên văn có mặt trong DOM.
  - Loại trừ: 0 thẻ B11_03, 0 thẻ B10_03, 0 quảng cáo thương mại (Metiz, Galaxy, TNGo).
  - Console: 0 lỗi runtime, 0 lỗi cảnh báo trên toàn bộ vòng đời.
  - Network: 100% tài nguyên nội bộ, 0 lệnh gọi bên thứ 3.
- **DOM Audit (`RC_V3422_DOM_AUDIT_RECEIPT.json`):**
  - Tràn giao diện ngang (`horizontalOverflow`): Desktop = `false`, Mobile = `false`.
  - Nút bấm nhỏ hơn 44px (`undersizedCount`): 0 vi phạm trên cả hai viewports.
  - Độ tương phản WCAG 2.1 AA: **50/50 cặp màu đạt chuẩn** (tỷ lệ tương phản >= 4.5:1).
  - `contrastCertified: true`, `release_gate.pass: true`, `blockers: []`.

---

## 5. CƠ CHẾ KHÓA PHÁT HÀNH & KẾ HOẠCH ROLLBACK XÁC ĐỊNH
- **Trạng thái phê duyệt:** `is_approved: false`, `deployment_permitted: false`. Gói ứng viên chỉ được lưu trữ và kiểm thử nội bộ trên cổng preview độc lập `:4175`.
- **Kế hoạch Rollback Standby:**
  - Mục tiêu dự phòng: **v3.421.0** (22 thẻ).
  - Vercel Deployment ID: `dpl_5bzFrqKUzAyrzN5pgP8o4f5VFPgQ`.
  - Bundle Root: `deploy_personal_v3421/`.
  - JS SHA-256: `61ebf288537aa77d52b7fdb8763dd57b16beea039b7005ba7d9f13fdb9bb4319`.
  - Production Live: `https://jayt-production-v3420.vercel.app` (giữ nguyên không đổi).
