/**
 * JAYT STOREFRONT STAGING SOURCE OF TRUTH (SECTION EZ-V)
 * Version: v3.431.0 (Release Candidate J363) (Release Candidate)
 * Governing Directive: JAYT-245 Section EZ-V (Lines 4475-4539)
 * Port: 4173
 * Containment Invariant: External links are limited to individually CEO-approved official sources.
 * Containment Invariant: 0 Unverified Radar / Merchant / Locality Cards
 * Containment Invariant: 0 "Nguồn chính thức" Labels outside Approved Pilot
 * Containment Invariant: 100% Local-First Savings Lab (Zero Tracking, Zero Network Calls, Zero Commercial Prefills, Transparent Limitation Notice)
 * Containment Invariant: Safe Read-Only "+ Báo nguồn" Modal (Zero PII, Zero Network)
 * Strategic Focus: Commercial JTBD Map, Voucher Evidence Pipeline, Local-First Savings Lab
 */
(function(root) {
  'use strict';

  // FEATURE FLAGS (SECTION EZ-V)
  const FEATURE_FLAGS = {
    T2_DOCUMENTATION_PILOT_ENABLED: true,
    ECONOMIC_CLAIMS_PUBLIC: false,
    AFFILIATE_ACTIVATION: false,
    DEEP_LINKS_ENABLED: false,
    LOGIN_AUTH_ENABLED: false
  };

  // STRICT DATA-BOUNDARY PUBLIC REGISTRY (MANDATE EZ-V.1)
  const APPROVED_PUBLIC_ENTRIES = [
    {
      card_id: "FACT_EZ_G_01_GITHUB_DOCS_ELIGIBILITY",
      public_eligible: true,
      evidence_contract_v3_status: "PUBLISHABLE_DOCUMENTATION_CANDIDATE",
      source_identity_proof: "PROVEN_OFFICIAL_GLOBAL_DOCUMENTATION",
      exact_approved_copy: "Theo tài liệu chính thức của GitHub, người học hoặc giảng viên tại một cơ sở giáo dục được công nhận có thể nộp đơn đăng ký GitHub Education.",
      exact_approved_title: "GitHub Education — Thông tin đăng ký",
      scope_caveat: "Phạm vi: chương trình toàn cầu; điều kiện và quyền lợi áp dụng do GitHub quyết định. JayT không xác nhận voucher, giá hay ưu đãi tại Đà Nẵng.",
      safe_canonical_action: {
        url: "https://docs.github.com/en/education",
        label: "Mở tài liệu chính thức ↗",
        rel: "noopener noreferrer nofollow"
      },
      ceo_approval_id: "CEO_DIRECTIVE_EZ_H"
    },
    {
      card_id: "BATCH03_DS_07_DANABUS_INFORMATION", public_eligible: true,
      evidence_contract_v3_status: "EVIDENCE_COMPLETE_INTERNAL_HELD__PUBLIC_APPROVED",
      exact_approved_copy: "DanaBus hiển thị vị trí của xe trên bản đồ, giúp hành khách chủ động hơn trong việc sắp xếp thời gian di chuyển.",
      exact_approved_title: "DanaBus — Thông tin xe buýt Đà Nẵng",
      scope_caveat: "Phạm vi: thông tin tiện ích công cộng theo bài viết DanaBus ngày 26/06/2026. Hãy kiểm tra điều kiện vận hành tại nguồn; JayT không xác nhận giá vé, thời gian đến trạm hay khả dụng thực tế.",
      safe_canonical_action: { url: "https://www.danangbus.vn/tin-tuc/tin-tuc/danabus--nguoi-ban-dong-hanh-thong-minh-cua-hanh-khach-xe-buyt-da-nang-5727.html", label: "Mở nguồn DanaBus chính thức ↗", rel: "noopener noreferrer nofollow" },
      ceo_approval_id: "JAYT-285-CEO-ITEM-DS07"
    },
    {
      card_id: "J287_HK_STUDENT_POLICY_UED_20260903", public_eligible: true,
      evidence_contract_v3_status: "EVIDENCE_COMPLETE_INTERNAL_HELD__PUBLIC_APPROVED",
      exact_approved_copy: "UED hướng dẫn thủ tục cho các nhóm chế độ chính sách của sinh viên, gồm miễn giảm học phí, hỗ trợ chi phí học tập, trợ cấp xã hội và hỗ trợ học tập.",
      exact_approved_title: "UED — Hướng dẫn chế độ chính sách sinh viên",
      scope_caveat: "Thông tin thủ tục theo bài đăng UED ngày 03/09/2026. Điều kiện cá nhân, hồ sơ và thời hạn do UED công bố; JayT không xác nhận quyền lợi hay thời điểm tiếp nhận của từng người.",
      safe_canonical_action: { url: "https://ued.udn.vn/2026/09/03/huong-dan-thuc-hien-thu-tuc-cac-che-do-chinh-sach-3/", label: "Mở nguồn UED chính thức ↗", rel: "noopener noreferrer nofollow" },
      ceo_approval_id: "JAYT-288-CEO-ITEM-UED-POLICY"
    },
    {
      card_id: "B04_02_KY_SO_TOAN_DAN_Y_TE", public_eligible: true,
      evidence_contract_v3_status: "EVIDENCE_COMPLETE_INTERNAL_HELD__PUBLIC_APPROVED",
      exact_approved_copy: "Sở Khoa học và Công nghệ thành phố Đà Nẵng vừa ban hành văn bản số 4139/SKHCN-CNTT về việc triển khai ký số toàn dân và áp dụng cho các dịch vụ y tế.",
      exact_approved_title: "Ký Số Toàn Dân — Dịch Vụ Công & Y Tế Đà Nẵng",
      scope_caveat: "Phạm vi: thông tin tiện ích dịch vụ công và y tế số theo văn bản Sở KH&CN Đà Nẵng. Hãy kiểm tra điều kiện áp dụng tại cổng chính thức; JayT không đại diện hay cung cấp dịch vụ ký số.",
      safe_canonical_action: { url: "https://sdttg.danang.gov.vn/chi-tiet-tin/group/167/nid/4819/trien-khai-phan-he-ky-so-toan-dan-tai-da-nang-buoc-tien-moi-trong-dich-vu-cong-va-y-te", label: "Mở nguồn Ký số Đà Nẵng chính thức ↗", rel: "noopener noreferrer nofollow" },
      ceo_approval_id: "CEO-JAYT-312-ITEM-B04-02-STAGING-ONLY"
    },
    {
      card_id: "B04_07_THU_VIEN_SO_HOC_LIEU_UED", public_eligible: true,
      evidence_contract_v3_status: "EVIDENCE_COMPLETE_INTERNAL_HELD__PUBLIC_APPROVED",
      exact_approved_copy: "Hệ thống tích hợp nhiều chức năng như quản lý tài nguyên thư viện, tra cứu tài liệu trực tuyến OPAC trên nền tảng website và thiết bị di động, tăng cường khả năng tiếp cận học liệu cho người học.",
      exact_approved_title: "Thư viện số và tra cứu học liệu trực tuyến UED",
      scope_caveat: "Phạm vi: thông tin tiện ích học tập theo bài đăng UED ngày 15/07/2026. Hãy kiểm tra quy chế sử dụng tại nguồn; JayT không đại diện hay cung cấp dịch vụ quản lý thư viện.",
      safe_canonical_action: { url: "https://ued.udn.vn/2026/07/15/ued-tiep-nhan-he-thong-quan-ly-thu-vien-skoolib-do-cong-ty-tnhh-bookshare-tai-tro/", label: "Mở nguồn Thư viện UED chính thức ↗", rel: "noopener noreferrer nofollow" },
      ceo_approval_id: "CEO-JAYT-319-B04-07-STAGING-ONLY"
    },
    {
      card_id: "B04_06_AN_TOAN_TIEM_CHUNG_CDC_DANANG", public_eligible: true,
      evidence_contract_v3_status: "EVIDENCE_COMPLETE_INTERNAL_HELD__PUBLIC_APPROVED",
      exact_approved_copy: "Nhân viên y tế kiểm tra lại thông tin, loại vắc-xin và thực hiện tiêm đúng quy trình, đảm bảo an toàn tiêm chủng.",
      exact_approved_title: "Hướng dẫn an toàn tiêm chủng CDC Đà Nẵng",
      scope_caveat: "Phạm vi: hướng dẫn an toàn tiêm chủng theo cổng CDC Đà Nẵng ngày 25/06/2026. Hãy liên hệ cơ sở y tế chính thức để được tư vấn phác đồ phù hợp; JayT không cung cấp tư vấn y khoa hay dịch vụ tiêm chủng.",
      safe_canonical_action: { url: "https://ksbtdanang.vn/cam-nang-vac-xin/quy-trinh-tiem-chung-tai-cdc-da-nang/quy-trinh-tiem-chung-16.html", label: "Mở hướng dẫn CDC Đà Nẵng chính thức ↗", rel: "noopener noreferrer nofollow" },
      ceo_approval_id: "CEO-JAYT-319-B04-06-STAGING-ONLY"
    },
    {
      card_id: "B04_10_LICH_TIEM_CHUNG_TRE_EM_CDC_DANANG", public_eligible: true,
      evidence_contract_v3_status: "EVIDENCE_COMPLETE_INTERNAL_HELD__PUBLIC_APPROVED",
      exact_approved_copy: "tiêm chủng đầy đủ và đúng lịch không chỉ giúp trẻ phòng ngừa hiệu quả các bệnh nguy hiểm",
      exact_approved_title: "Cẩm nang lịch tiêm chủng trẻ em CDC Đà Nẵng",
      scope_caveat: "Tài liệu phổ biến kiến thức y tế dự phòng cộng đồng của CDC Đà Nẵng; không thay thế chẩn đoán hoặc chỉ định điều trị của nhân viên y tế.",
      safe_canonical_action: { url: "https://ksbtdanang.vn/cam-nang-vac-xin/lich-tiem-chung-cho-tre-em-11/lich-tiem-chung-cho-tre-em-17.html", label: "Mở cẩm nang CDC Đà Nẵng chính thức ↗", rel: "noopener noreferrer nofollow" },
      ceo_approval_id: "CEO-JAYT-319-B04-10-STAGING-ONLY"
    },
    {
      card_id: "B05_01_LICH_TIEM_CHUNG_THAI_KY_CDC_DANANG", public_eligible: true,
      evidence_contract_v3_status: "EVIDENCE_COMPLETE_INTERNAL_HELD__PUBLIC_APPROVED",
      exact_approved_copy: "Mang thai là giai đoạn cơ thể người phụ nữ có nhiều thay đổi về sinh lý và miễn dịch",
      exact_approved_title: "Cẩm nang lịch tiêm chủng thai kỳ CDC Đà Nẵng",
      scope_caveat: "Tài liệu phổ biến kiến thức y tế dự phòng của CDC Đà Nẵng; phụ nữ chuẩn bị mang thai hoặc đang mang thai cần tham vấn bác sĩ chuyên khoa phụ sản trước khi thực hiện tiêm chủng.",
      safe_canonical_action: { url: "https://ksbtdanang.vn/cam-nang-vac-xin/lich-tiem-chung-cho-tre-em-11/lich-tiem-chung-cho-phu-nu-mang-thai-va-trong-thai-ky-18.html", label: "Mở cẩm nang CDC Đà Nẵng chính thức ↗", rel: "noopener noreferrer nofollow" },
      ceo_approval_id: "CEO-JAYT-319-B05-01-STAGING-ONLY"
    },
    {
      card_id: "B05_03_DANABUS_TUYEN_05_HOA_HIEP_NAM_BIEN_DONG", public_eligible: true,
      evidence_contract_v3_status: "EVIDENCE_COMPLETE_INTERNAL_HELD__PUBLIC_APPROVED",
      exact_approved_copy: "Đặc biệt, tuyến được vận hành bằng xe buýt điện hiện đại, mang đến hành trình êm ái, thoải mái và thân thiện với môi trường.",
      exact_approved_title: "DanaBus Tuyến 05 — Xe buýt điện KCC Hòa Hiệp Nam – Công viên Biển Đông",
      scope_caveat: "Lộ trình kết nối đô thị (Tra cứu lịch chạy và điểm dừng chi tiết tại cổng Danabus).",
      safe_canonical_action: { url: "https://www.danangbus.vn/tin-tuc/tin-tuc/len-tuyen-05-vi-vu-da-nang-tu-tay-bac-den-bien-dong-5758.html", label: "Mở hướng dẫn Danabus Tuyến 05 chính thức ↗", rel: "noopener noreferrer nofollow" },
      ceo_approval_id: "CEO-JAYT-319-B05-03-STAGING-ONLY"
    },
    {
      card_id: "B06_01_DANABUS_CHUYEN_DOI_XE_BUYT_DIEN_02_13_21", public_eligible: true,
      evidence_contract_v3_status: "EVIDENCE_COMPLETE_INTERNAL_HELD__PUBLIC_APPROVED",
      exact_approved_copy: "Nhằm thực hiện chủ trương chuyển đổi phương tiện sử dụng năng lượng xanh trong hoạt động vận tải hành khách công cộng bằng xe buýt trên địa bàn thành phố Đà Nẵng",
      exact_approved_title: "DanaBus — Chuyển đổi xe buýt sử dụng điện tuyến số 02, 13 và 21",
      scope_caveat: "Thông tin chuyển đổi phương tiện xe buýt điện (Tra cứu lịch trình và tần suất chi tiết tại cổng Danabus).",
      safe_canonical_action: { url: "https://www.danangbus.vn/tin-tuc/tin-tuc/thong-bao-ve-viec-chuyen-doi-xe-buyt-su-dung-dien-tren-cac-tuyen-xe-buyt-khong-tro-gia-so-02-13-va-21-5761.html", label: "Mở thông báo chuyển đổi buýt điện Danabus ↗", rel: "noopener noreferrer nofollow" },
      ceo_approval_id: "CEO-JAYT-319-B06-01-STAGING-ONLY"
    },
    {
      card_id: "B06_03_HUONG_DAN_DICH_VU_CONG_TRUC_TUYEN_DANANG", public_eligible: true,
      evidence_contract_v3_status: "EVIDENCE_COMPLETE_INTERNAL_HELD__PUBLIC_APPROVED",
      exact_approved_copy: "Chuyển đổi số trong lĩnh vực hành chính công đang mang lại nhiều tiện ích thiết thực cho công dân.",
      exact_approved_title: "Hướng dẫn nộp hồ sơ dịch vụ công trực tuyến qua Cổng DVCQG và VNeID",
      scope_caveat: "Cẩm nang hướng dẫn nộp hồ sơ dịch vụ công trực tuyến qua VNeID; các khoản phí, lệ phí nhà nước (nếu có) thực hiện theo quy định của cơ quan thẩm quyền tại thời điểm tiếp nhận.",
      safe_canonical_action: { url: "https://duynghia.danang.gov.vn/vi/web/xa-duy-nghia/w/huong-dan-cong-dan-nop-ho-so-truc-tuyen-tren-cong-dich-vu-cong-quoc-gia", label: "Mở hướng dẫn dịch vụ công trực tuyến ↗", rel: "noopener noreferrer nofollow" },
      ceo_approval_id: "CEO-JAYT-319-B06-03-STAGING-ONLY"
    },
    {
      card_id: "B06_02_BAN_TIN_SUC_KHOE_CONG_DONG_CDC_DANANG", public_eligible: true,
      evidence_contract_v3_status: "EVIDENCE_COMPLETE_INTERNAL_HELD__PUBLIC_APPROVED",
      exact_approved_copy: "Giữ gìn vệ sinh cá nhân và vệ sinh môi trường là một trong những giải pháp quan trọng nhằm bảo vệ, chăm sóc và nâng cao sức khỏe Nhân dân.",
      exact_approved_title: "Bản tin Sức khỏe cộng đồng: Vệ sinh môi trường và phòng chống dịch bệnh",
      scope_caveat: "Tài liệu phổ biến kiến thức truyền thông y tế và vệ sinh môi trường phòng bệnh của CDC Đà Nẵng; không mang tính chất chẩn đoán hay phác đồ điều trị bệnh cá nhân. Khi có triệu chứng bất thường, người dân cần đến cơ sở y tế gần nhất để được thăm khám.",
      safe_canonical_action: { url: "https://ksbtdanang.vn/tai-lieu-truyen-thong-gdsk/ban-tin-skcd/ban-tin-suc-khoe-cong-dong-ky-7-2026-77.html", label: "Mở bản tin CDC Đà Nẵng ↗", rel: "noopener noreferrer nofollow" },
      ceo_approval_id: "CEO-JAYT-319-B06-02-STAGING-ONLY"
    },
    {
      card_id: "B07_01_DANABUS_CHUYEN_DOI_XE_BUYT_DIEN_03_09_14", public_eligible: true,
      evidence_contract_v3_status: "EVIDENCE_COMPLETE_INTERNAL_HELD__PUBLIC_APPROVED",
      exact_approved_copy: "Nhằm thực hiện chủ trương chuyển đổi phương tiện sử dụng năng lượng xanh trong hoạt động vận tải hành khách công cộng bằng xe buýt trên địa bàn thành phố Đà Nẵng",
      exact_approved_title: "DanaBus — Điều chỉnh phương tiện xe buýt điện tuyến 03, 09 và 14",
      scope_caveat: "Thông tin chuyển đổi phương tiện xe buýt điện Tuyến 03, 09, 14 (Tra cứu lộ trình, biểu đồ giờ và tần suất chi tiết tại cổng Danabus).",
      safe_canonical_action: { url: "https://www.danangbus.vn/tin-tuc/tin-tuc/thong-bao-ve-viec-dieu-chinh-phuong-tien-khai-thac-tren-cac-tuyen-xe-buyt-khong-tro-gia-so-03-09-va-14-5760.html", label: "Mở thông báo buýt điện Tuyến 03, 09, 14 chính thức ↗", rel: "noopener noreferrer nofollow" },
      ceo_approval_id: "CEO-JAYT-319-B07-01-STAGING-ONLY"
    },
    {
      card_id: "B07_02_CAM_NANG_AN_TOAN_SO_DEEPFAKE_1022", public_eligible: true,
      evidence_contract_v3_status: "EVIDENCE_COMPLETE_INTERNAL_HELD__PUBLIC_APPROVED",
      exact_approved_copy: "Deepfake đang là một mối đe dọa đối với sự trung thực và tin cậy của video và hình ảnh.",
      exact_approved_title: "Cẩm nang nhận diện và phòng chống lừa đảo trực tuyến: Cuộc gọi video Deepfake",
      scope_caveat: "Tài liệu phổ biến kiến thức an toàn số cộng đồng của Tổng đài 1022 Đà Nẵng; không tiếp nhận xử lý khiếu nại hay bồi hoàn tài chính cá nhân. Khi phát hiện dấu hiệu lừa đảo chiếm đoạt tài sản, người dân cần liên hệ ngay cơ quan Công an có thẩm quyền.",
      safe_canonical_action: { url: "https://1022.vn/cam-nang-nhan-dien-va-phong-chong-lua-dao-truc-tuyen-lua-dao-cuoc-goi-video-deepfake/", label: "Mở cẩm nang an toàn số 1022 chính thức ↗", rel: "noopener noreferrer nofollow" },
      ceo_approval_id: "CEO-JAYT-319-B07-02-STAGING-ONLY"
    },
    {
      card_id: "B07_03_TRA_CUU_MAY_KHU_RUNG_TIM_AED_CONG_CONG_1022", public_eligible: true,
      evidence_contract_v3_status: "EVIDENCE_COMPLETE_INTERNAL_HELD__PUBLIC_APPROVED",
      exact_approved_copy: "Theo các tài liệu cấp cứu, trong các trường hợp ngưng tuần hoàn đột ngột",
      exact_approved_title: "Hướng dẫn tra cứu địa điểm trang bị máy khử rung tim tự động (AED) nơi công cộng",
      scope_caveat: "Thông tin hỗ trợ tra cứu địa điểm trang bị máy khử rung tim tự động (AED) nơi công cộng của Cổng 1022 Đà Nẵng; không mang tính chất hướng dẫn y khoa hay phác đồ cấp cứu chuyên sâu. Trong mọi tình huống khẩn cấp, người dân phải gọi ngay cấp cứu y tế 115 và nhờ sự hỗ trợ của nhân viên cứu hộ tại chỗ.",
      safe_canonical_action: { url: "https://1022.vn/%f0%9f%9a%a8-tinh-huong-khan-cap-tim-may-khu-rung-tim-tu-dong-aed-o-dau/", label: "Mở hướng dẫn tra cứu máy AED 1022 chính thức ↗", rel: "noopener noreferrer nofollow" },
      ceo_approval_id: "CEO-JAYT-319-B07-03-STAGING-ONLY"
    },
    {
      card_id: "B08_01_BAN_DO_SO_UNG_PHO_LU_LUT_HOA_XUAN_1022", public_eligible: true,
      evidence_contract_v3_status: "EVIDENCE_COMPLETE_INTERNAL_HELD__PUBLIC_APPROVED",
      exact_approved_copy: "Bằng cách quét mã QR trên tấm biển này qua điện thoại thông minh, người dùng có thể dễ dàng truy cập thông tin, hình ảnh, video về các điểm ngập khác cũng như diện tích ngập lụt trực quan trên bản đồ số.",
      exact_approved_title: "Bản đồ số và hệ thống biển vết lũ phục vụ ứng phó ngập lụt 1022",
      scope_caveat: "Thông tin giới thiệu bản đồ số và biển vết lũ theo bài đăng của Cổng 1022 Đà Nẵng; không phải cảnh báo thời tiết, dự báo ngập lụt hay cam kết an toàn theo thời gian thực. Khi có tình huống khẩn cấp, hãy theo dõi hướng dẫn chính thức của cơ quan chức năng.",
      safe_canonical_action: { url: "https://1022.vn/xay-dung-ban-do-so-phuc-vu-ung-pho-lu-lut/", label: "Mở bản đồ số vết lũ 1022 chính thức ↗", rel: "noopener noreferrer nofollow" },
      ceo_approval_id: "CEO-JAYT-319-B08-01-STAGING-ONLY"
    },
    {
      card_id: "B08_03_TIEN_ICH_SO_CONG_DONG_WIFI_AN_HAI_1022", public_eligible: true,
      evidence_contract_v3_status: "EVIDENCE_COMPLETE_INTERNAL_HELD__PUBLIC_APPROVED",
      exact_approved_copy: "Cùng với đó, phường đã lắp đặt wifi miễn phí tại 23 nhà sinh hoạt cộng đồng, đưa 31 bộ dữ liệu mở lên Cổng dữ liệu thành phố và hoàn thành cập nhật 14 bộ dữ liệu đăng ký lên hệ thống cơ sở dữ liệu xã, phường.",
      exact_approved_title: "Hạ tầng số và mạng Wi-Fi miễn phí tại nhà sinh hoạt cộng đồng phường An Hải",
      scope_caveat: "Thông tin ghi nhận theo bài đăng của Cổng 1022 Đà Nẵng về hạ tầng số tại phường An Hải; phạm vi, khả dụng và chất lượng kết nối có thể thay đổi. Người dùng cần kiểm tra trực tiếp tại địa điểm hoặc qua kênh chính thức.",
      safe_canonical_action: { url: "https://1022.vn/an-hai-day-manh-chuyen-doi-so-phuc-vu-nguoi-dan-doanh-nghiep/", label: "Mở thông tin hạ tầng số An Hải 1022 chính thức ↗", rel: "noopener noreferrer nofollow" },
      ceo_approval_id: "CEO-JAYT-319-B08-03-STAGING-ONLY"
    },
    {
      card_id: "B09_01_DANABUS_TUYEN_11_XUAN_DIEU_BEN_XE_TIEN_SA", public_eligible: true,
      evidence_contract_v3_status: "EVIDENCE_COMPLETE_INTERNAL_HELD__PUBLIC_APPROVED",
      exact_approved_copy: "Không chỉ mang lại sự tiện lợi, việc lựa chọn xe buýt còn góp phần hình thành thói quen sử dụng phương tiện công cộng văn minh, hiện đại, phù hợp với xu hướng phát triển đô thị bền vững của Đà Nẵng.",
      exact_approved_title: "Tuyến xe buýt kết nối đô thị số 11: Xuân Diệu – Bến xe Tiên Sa",
      scope_caveat: "Thông tin tham khảo về Tuyến 11 theo bài đăng chính thức của DanaBus; lịch chạy, điểm dừng, tần suất và điều kiện vận hành có thể thay đổi. Tra cứu chi tiết tại cổng DanaBus chính thức.",
      safe_canonical_action: { url: "https://www.danangbus.vn/tin-tuc/tin-tuc/chi-mot-tuyen-xe-mo-ra-ca-da-nang-ket-noi-hoc-tap-y-te-mua-sam-va-giai-tri-5757.html", label: "Mở thông tin Danabus Tuyến 11 chính thức ↗", rel: "noopener noreferrer nofollow" },
      ceo_approval_id: "CEO-JAYT-319-B09-01-STAGING-ONLY"
    },
    {
      card_id: "B09_02_TRO_LY_SO_DANANG_AI_PHO_BIEN_PHAP_LUAT_1022", public_eligible: true,
      evidence_contract_v3_status: "EVIDENCE_COMPLETE_INTERNAL_HELD__PUBLIC_APPROVED",
      exact_approved_copy: "Điểm sáng của Đà Nẵng là việc đổi mới hình thức tuyên truyền đa dạng. Thành phố đã đưa Trợ lý số DaNang AI vào vận hành trên nền tảng số, số hóa dữ liệu hộ tịch và phát triển truyền thanh cơ sở thông minh.",
      exact_approved_title: "Trợ lý số DaNang AI và số hóa dữ liệu hộ tịch phục vụ công dân 1022",
      scope_caveat: "Thông tin giới thiệu hoạt động phổ biến pháp luật số theo bài đăng của Cổng 1022 Đà Nẵng; không phải tư vấn pháp lý cá nhân hay cam kết kết quả thủ tục/tố tụng.",
      safe_canonical_action: { url: "https://1022.vn/da-nang-ung-dung-chuyen-doi-so-dua-phap-luat-vao-cuoc-song/", label: "Mở thông tin DaNang AI 1022 chính thức ↗", rel: "noopener noreferrer nofollow" },
      ceo_approval_id: "CEO-JAYT-319-B09-02-STAGING-ONLY"
    },
    {
      card_id: "B09_03_CHIEN_DICH_BAO_VE_DANH_TINH_SO_MA_SO_THUE_1022", public_eligible: true,
      evidence_contract_v3_status: "EVIDENCE_COMPLETE_INTERNAL_HELD__PUBLIC_APPROVED",
      exact_approved_copy: "UBND thành phố cũng khuyến cáo không cho mượn, cho thuê, mua bán thông tin cá nhân, chữ ký số, tài khoản ngân hàng để thành lập hoặc vận hành doanh nghiệp, hộ kinh doanh; kịp thời phản ánh trường hợp bị giả mạo, bị lợi dụng thông tin để cơ quan chức năng xác minh, xử lý.",
      exact_approved_title: "Cẩm nang bảo vệ an toàn danh tính số và phòng ngừa lợi dụng mã số thuế 1022",
      scope_caveat: "Thông tin phổ biến an toàn danh tính số theo bài đăng của Cổng 1022 Đà Nẵng; không tiếp nhận hồ sơ thuế, mã số thuế, tài khoản ngân hàng, chữ ký số, mật khẩu hoặc thông tin định danh cá nhân.",
      safe_canonical_action: { url: "https://1022.vn/chien-dich-lam-sach-ma-so-thue-thao-go-diem-nghen-trong-kinh-doanh-loi-ich-kep-cho-doanh-nghiep-va-nguoi-dan/", label: "Mở cẩm nang an toàn số 1022 chính thức ↗", rel: "noopener noreferrer nofollow" },
      ceo_approval_id: "CEO-JAYT-319-B09-03-STAGING-ONLY"
    },
    {
      card_id: "B10_01_DIEM_TIEP_NHAN_THU_TUC_HANH_CHINH_TAM_KY_1022", public_eligible: true,
      evidence_contract_v3_status: "EVIDENCE_COMPLETE_INTERNAL_HELD__PUBLIC_APPROVED",
      exact_approved_copy: "Từ tháng 9/2026, người dân, doanh nghiệp khu vực phía nam thành phố Đà Nẵng có thể thực hiện các thủ tục hành chính thuộc thẩm quyền giải quyết của các sở, ban, ngành tại Trung tâm Phục vụ hành chính công phường Tam Kỳ.",
      exact_approved_title: "Điểm tăng cường tiếp nhận thủ tục hành chính cấp sở tại phường Tam Kỳ",
      scope_caveat: "Thông tin hướng dẫn điểm tiếp nhận thủ tục hành chính theo bài đăng của Cổng 1022 Đà Nẵng; người dân, doanh nghiệp tra cứu danh mục thủ tục và hồ sơ chi tiết tại Cổng Dịch vụ công chính thức.",
      safe_canonical_action: { url: "https://1022.vn/bo-tri-diem-tang-cuong-tiep-nhan-thu-tuc-hanh-chinh-cap-so-tai-phuong-tam-ky/", label: "Mở thông tin điểm tiếp nhận TTHC 1022 chính thức ↗", rel: "noopener noreferrer nofollow" },
      ceo_approval_id: "CEO-JAYT-322-B10-01-STAGING-ONLY"
    },
    {
      card_id: "B10_02_PHO_CAP_KY_NANG_SO_VNEID_PHU_NU_1022", public_eligible: true,
      evidence_contract_v3_status: "EVIDENCE_COMPLETE_INTERNAL_HELD__PUBLIC_APPROVED",
      exact_approved_copy: "Tham gia các lớp sinh hoạt, học viên được hướng dẫn sử dụng điện thoại thông minh và một số tiện ích số, sử dụng internet, mạng xã hội an toàn, có trách nhiệm, nhận diện, phòng tránh thông tin xấu độc và các hình thức lừa đảo trên không gian mạng. Chị em bước đầu tiếp cận các ứng dụng, nền tảng số và công cụ trí tuệ nhân tạo (AI).",
      exact_approved_title: "Phổ cập kỹ năng số, kích hoạt VNeID và phòng chống lừa đảo trực tuyến 1022",
      scope_caveat: "Tài liệu truyền thông nâng cao nhận thức kỹ năng số cộng đồng theo bài đăng của Cổng 1022 Đà Nẵng; không tiếp nhận xử lý khiếu nại, thu hồi tài sản bị lừa đảo hay thu thập thông tin cá nhân.",
      safe_canonical_action: { url: "https://1022.vn/dua-ky-nang-so-den-voi-phu-nu-vung-cao/", label: "Mở cẩm nang kỹ năng số 1022 chính thức ↗", rel: "noopener noreferrer nofollow" },
      ceo_approval_id: "CEO-JAYT-322-B10-02-STAGING-ONLY"
    },
    {
      card_id: "B11_01_TRA_CUU_CHUYEN_BAY_DANANG_SMART_CITY_1022",
      public_eligible: true,
      evidence_contract_v3_status: "EVIDENCE_COMPLETE_INTERNAL_HELD__PUBLIC_APPROVED",
      exact_approved_copy: "Dịch vụ được triển khai dựa trên việc chia sẻ dữ liệu theo thời gian thực từ Hệ thống cơ sở dữ liệu điều hành sân bay (AODB), chính thức đưa vào phục vụ người dân và du khách từ ngày 27/8/2026. Sự kiện nằm trong khuôn khổ Lễ công bố triển khai các dự án mở rộng Cảng hàng không quốc tế Đà Nẵng.",
      exact_approved_title: "Thông tin chuyến bay trên Danang Smart City",
      scope_caveat: "Thông tin tiện ích theo bài đăng của Cổng 1022 Đà Nẵng; không bán vé, không nhận đặt chỗ, không thu phí và không cam kết dữ liệu chuyến bay theo thời gian thực.",
      safe_canonical_action: {
        url: "https://1022.vn/ra-mat-tien-ich-thong-tin-chuyen-bay-tren-ung-dung-danang-smart-city/",
        label: "Mở thông tin chuyến bay 1022 chính thức ↗",
        rel: "noopener noreferrer nofollow"
      },
      ceo_approval_id: "CEO-JAYT-323-B11-01-FUTURE-RC-APPROVED"
    },
    {
      card_id: "B11_02_HOAT_DONG_VAN_HOA_BAO_TANG_CHAM_1022",
      public_eligible: true,
      evidence_contract_v3_status: "EVIDENCE_COMPLETE_INTERNAL_HELD__PUBLIC_APPROVED",
      exact_approved_copy: "Chương trình nghệ thuật vũ điệu Champa gồm các tiết mục múa Apsara, hòa tấu nhạc cụ Chăm và múa Vũ hội làng Chăm sẽ được tổ chức vào buổi sáng các ngày 15 và 30 hằng tháng.",
      exact_approved_title: "Lịch biểu diễn vũ điệu Champa — Bảo tàng Chăm Đà Nẵng",
      scope_caveat: "Lịch biểu diễn văn hóa nghệ thuật định kỳ tại Bảo tàng Điêu khắc Chăm Đà Nẵng; người xem cần đối soát thông báo trực tiếp từ ban quản lý bảo tàng trong trường hợp có điều chỉnh thời tiết hoặc lịch đón tiếp ngoại giao.",
      safe_canonical_action: {
        url: "https://1022.vn/nhieu-trai-nghiem-moi-cho-du-khach-tai-bao-tang-dieu-khac-cham-da-nang/",
        label: "Mở thông báo lịch diễn 1022 chính thức ↗",
        rel: "noopener noreferrer nofollow"
      },
      ceo_approval_id: "CEO-JAYT-325-B11-02-FUTURE-RC-APPROVED"
    },
  ];

  // STRICT ALLOWLIST COMMERCIAL ENTRIES (JAYT-333 M4 RELEASE CANDIDATE - 23 ITEMS)
  
  // =========================================================================
  // JAYT-341 SPRINT B: VERIFIED COMMERCIAL & BENEFIT REGISTRY (16 OFFERS)
  // =========================================================================
  const VOUCHER_VAULT_ITEMS = [
  {
    "id": "B19_STARLIGHT_U22_WEEKDAY",
    "batch19_id": "B19_STARLIGHT_U22_WEEKDAY",
    "brand": "Starlight Cinema",
    "title": "Giá vé U22 ngày thường (Thứ 2 đến Thứ 5)",
    "tier": "CINEMA_U22_DISCOUNT",
    "price_vnd": 45000,
    "source_url": "https://starlight.vn/uu-dai/ct-u22-rap-starlight-1047.html",
    "app_url": null,
    "locality_basis": "Starlight Đà Nẵng: Tầng 4 Tòa nhà Nguyễn Kim, 46 Điện Biên Phủ, Thanh Khê",
    "validity": "Thứ 2 đến Thứ 5 hàng tuần (U22)",
    "conditions": "Áp dụng theo quy định chính thức của thương hiệu tại Đà Nẵng.",
    "budget_warning": "Kiểm tra hóa đơn và điều kiện trước khi thanh toán.",
    "has_code": false,
    "code": null,
    "action_type": "COUNTER_MEMBER",
    "cta_label": "Xem điều kiện áp dụng ↗",
    "member_badge": "Ưu đãi tại quầy",
    "is_discovery": false,
    "is_ordinary_observed_price": false,
    "claim_instruction": "Xem điều kiện và xuất trình tại chi nhánh Starlight Cinema Đà Nẵng",
    "campus_tags": [
      "BACH_KHOA",
      "SU_PHAM",
      "DUY_TAN"
    ],
    "category": "CINEMA"
  },
  {
    "id": "B19_STARLIGHT_U22_WEEKEND",
    "batch19_id": "B19_STARLIGHT_U22_WEEKEND",
    "brand": "Starlight Cinema",
    "title": "Giá vé U22 cuối tuần Đà Nẵng (Thứ 6 đến Chủ Nhật)",
    "tier": "CINEMA_U22_DISCOUNT",
    "price_vnd": 55000,
    "source_url": "https://starlight.vn/uu-dai/ct-u22-rap-starlight-1047.html",
    "app_url": null,
    "locality_basis": "Starlight Đà Nẵng: 46 Điện Biên Phủ",
    "validity": "Thứ 6 đến Chủ Nhật (U22)",
    "conditions": "Áp dụng theo quy định chính thức của thương hiệu tại Đà Nẵng.",
    "budget_warning": "Kiểm tra hóa đơn và điều kiện trước khi thanh toán.",
    "has_code": false,
    "code": null,
    "action_type": "COUNTER_MEMBER",
    "cta_label": "Xem điều kiện áp dụng ↗",
    "member_badge": "Ưu đãi tại quầy",
    "is_discovery": false,
    "is_ordinary_observed_price": false,
    "claim_instruction": "Xem điều kiện và xuất trình tại chi nhánh Starlight Cinema Đà Nẵng",
    "campus_tags": [
      "BACH_KHOA",
      "SU_PHAM",
      "DUY_TAN"
    ],
    "category": "CINEMA"
  },
  {
    "id": "B19_STARLIGHT_THU_3_PHIM_VIET",
    "batch19_id": "B19_STARLIGHT_THU_3_PHIM_VIET",
    "brand": "Starlight Cinema",
    "title": "Thứ 3 Phim Việt — Đồng giá 45k",
    "tier": "CINEMA_U22_DISCOUNT",
    "price_vnd": 45000,
    "source_url": "https://starlight.vn/uu-dai/thu-3-phim-viet-1046.html",
    "app_url": null,
    "locality_basis": "Starlight Đà Nẵng: 46 Điện Biên Phủ",
    "validity": "Thứ 3 hàng tuần",
    "conditions": "Áp dụng theo quy định chính thức của thương hiệu tại Đà Nẵng.",
    "budget_warning": "Kiểm tra hóa đơn và điều kiện trước khi thanh toán.",
    "has_code": false,
    "code": null,
    "action_type": "COUNTER_MEMBER",
    "cta_label": "Xem điều kiện áp dụng ↗",
    "member_badge": "Ưu đãi tại quầy",
    "is_discovery": false,
    "is_ordinary_observed_price": false,
    "claim_instruction": "Xem điều kiện và xuất trình tại chi nhánh Starlight Cinema Đà Nẵng",
    "campus_tags": [
      "BACH_KHOA",
      "SU_PHAM",
      "DUY_TAN"
    ],
    "category": "CINEMA"
  },
  {
    "id": "B19_TPC_COMBO_COT_MAM_KEO_479K",
    "batch19_id": "B19_TPC_COMBO_COT_MAM_KEO_479K",
    "brand": "The Pizza Company",
    "title": "Combo \"Cốt\" Mắm Kẹo",
    "tier": "COUNTER_DEAL",
    "price_vnd": 479000,
    "source_url": "https://thepizzacompany.vn/combo-cot-mam-keo",
    "app_url": null,
    "locality_basis": "4 chi nhánh: Lotte Mart, 173 Nguyễn Văn Thoại, 478 Điện Biên Phủ, Nguyễn Văn Linh",
    "validity": "Thường nhật 2026",
    "conditions": "Áp dụng theo quy định chính thức của thương hiệu tại Đà Nẵng.",
    "budget_warning": "Kiểm tra hóa đơn và điều kiện trước khi thanh toán.",
    "has_code": false,
    "code": null,
    "action_type": "COUNTER_MEMBER",
    "cta_label": "Xem điều kiện áp dụng ↗",
    "member_badge": "Ưu đãi tại quầy",
    "is_discovery": false,
    "is_ordinary_observed_price": false,
    "claim_instruction": "Xem điều kiện và xuất trình tại chi nhánh The Pizza Company Đà Nẵng",
    "campus_tags": [
      "KINH_TE_DUE",
      "DUY_TAN",
      "NGOAI_NGU"
    ],
    "category": "FOOD"
  },
  {
    "id": "B19_TPC_COMBO_COT_MAI_MAN_599K",
    "batch19_id": "B19_TPC_COMBO_COT_MAI_MAN_599K",
    "brand": "The Pizza Company",
    "title": "Combo \"Cốt\" Mãi Mặn",
    "tier": "COUNTER_DEAL",
    "price_vnd": 599000,
    "source_url": "https://thepizzacompany.vn/combo-cot-mai-man",
    "app_url": null,
    "locality_basis": "4 chi nhánh The Pizza Company Đà Nẵng",
    "validity": "Thường nhật 2026",
    "conditions": "Áp dụng theo quy định chính thức của thương hiệu tại Đà Nẵng.",
    "budget_warning": "Kiểm tra hóa đơn và điều kiện trước khi thanh toán.",
    "has_code": false,
    "code": null,
    "action_type": "COUNTER_MEMBER",
    "cta_label": "Xem điều kiện áp dụng ↗",
    "member_badge": "Ưu đãi tại quầy",
    "is_discovery": false,
    "is_ordinary_observed_price": false,
    "claim_instruction": "Xem điều kiện và xuất trình tại chi nhánh The Pizza Company Đà Nẵng",
    "campus_tags": [
      "KINH_TE_DUE",
      "DUY_TAN",
      "NGOAI_NGU"
    ],
    "category": "FOOD"
  },
  {
    "id": "B19_TPC_BOGO_PEPSI_15L",
    "batch19_id": "B19_TPC_BOGO_PEPSI_15L",
    "brand": "The Pizza Company",
    "title": "Mua 1 Tặng 1 Nước Pepsi 1.5L kèm combo",
    "tier": "COUNTER_DEAL",
    "price_vnd": 50000,
    "source_url": "https://thepizzacompany.vn/mua-1-tang-1-pepsi",
    "app_url": null,
    "locality_basis": "4 chi nhánh The Pizza Company Đà Nẵng",
    "validity": "Áp dụng kèm combo",
    "conditions": "Áp dụng theo quy định chính thức của thương hiệu tại Đà Nẵng.",
    "budget_warning": "Kiểm tra hóa đơn và điều kiện trước khi thanh toán.",
    "has_code": false,
    "code": null,
    "action_type": "COUNTER_MEMBER",
    "cta_label": "Xem điều kiện áp dụng ↗",
    "member_badge": "Ưu đãi tại quầy",
    "is_discovery": false,
    "is_ordinary_observed_price": false,
    "claim_instruction": "Xem điều kiện và xuất trình tại chi nhánh The Pizza Company Đà Nẵng",
    "campus_tags": [
      "KINH_TE_DUE",
      "DUY_TAN",
      "NGOAI_NGU"
    ],
    "category": "FOOD"
  },
  {
    "id": "B19_GONGCHA_MEMBER_POLICY",
    "batch19_id": "B19_GONGCHA_MEMBER_POLICY",
    "brand": "Gong Cha",
    "title": "Chính Sách Tích Điểm Đổi Quà Thành Viên",
    "tier": "COUNTER_DEAL",
    "price_vnd": null,
    "source_url": "https://gongcha.com.vn/chinh-sach-thanh-vien",
    "app_url": null,
    "locality_basis": "Gong Cha Đà Nẵng: 01 Nguyễn Văn Linh, P. Bình Hiên, Hải Châu",
    "validity": "Chính sách hội viên thường trực",
    "conditions": "Áp dụng theo quy định chính thức của thương hiệu tại Đà Nẵng.",
    "budget_warning": "Kiểm tra hóa đơn và điều kiện trước khi thanh toán.",
    "has_code": false,
    "code": null,
    "action_type": "COUNTER_MEMBER",
    "cta_label": "Xem điều kiện áp dụng ↗",
    "member_badge": "Ưu đãi tại quầy",
    "is_discovery": false,
    "is_ordinary_observed_price": false,
    "claim_instruction": "Xem điều kiện và xuất trình tại chi nhánh Gong Cha Đà Nẵng",
    "campus_tags": [
      "DUY_TAN",
      "NGOAI_NGU"
    ],
    "category": "DRINK"
  },
  {
    "id": "B19_KATINAT_APP_LOYALTY",
    "batch19_id": "B19_KATINAT_APP_LOYALTY",
    "brand": "Katinat Saigon Kafe",
    "title": "K-Club — Hội Viên Trên Katinat App",
    "tier": "APP_VOUCHER",
    "price_vnd": null,
    "source_url": "https://katinat.vn",
    "app_url": "https://katinat.vn",
    "locality_basis": "Katinat Bạch Đằng: 9 Bạch Đằng, P. Thạch Thang, Hải Châu",
    "validity": "Áp dụng qua App Katinat",
    "conditions": "Áp dụng theo quy định chính thức của thương hiệu tại Đà Nẵng.",
    "budget_warning": "Kiểm tra hóa đơn và điều kiện trước khi thanh toán.",
    "has_code": false,
    "code": null,
    "action_type": "APP_WALLET",
    "cta_label": "Mở App nhận deal ↗",
    "member_badge": "Ưu đãi trên App",
    "is_discovery": false,
    "is_ordinary_observed_price": false,
    "claim_instruction": "Xem điều kiện và xuất trình tại chi nhánh Katinat Saigon Kafe Đà Nẵng",
    "campus_tags": [
      "DUY_TAN"
    ],
    "category": "DRINK"
  },
  {
    "id": "B19_POPEYES_CORE_89K",
    "batch19_id": "B19_POPEYES_CORE_89K",
    "brand": "Popeyes",
    "title": "Combo Gà Giòn Core Offer 89K",
    "tier": "COUNTER_DEAL",
    "price_vnd": 89000,
    "source_url": "https://popeyes.vn",
    "app_url": null,
    "locality_basis": "Popeyes Núi Thành: 179 Núi Thành, P. Hòa Cường Bắc, Hải Châu",
    "validity": "Thường nhật 2026",
    "conditions": "Áp dụng theo quy định chính thức của thương hiệu tại Đà Nẵng.",
    "budget_warning": "Kiểm tra hóa đơn và điều kiện trước khi thanh toán.",
    "has_code": false,
    "code": null,
    "action_type": "COUNTER_MEMBER",
    "cta_label": "Xem điều kiện áp dụng ↗",
    "member_badge": "Ưu đãi tại quầy",
    "is_discovery": false,
    "is_ordinary_observed_price": false,
    "claim_instruction": "Xem điều kiện và xuất trình tại chi nhánh Popeyes Đà Nẵng",
    "campus_tags": [
      "NGOAI_NGU",
      "KINH_TE_DUE"
    ],
    "category": "FOOD"
  },
  {
    "id": "B19_POPEYES_BOGO_DELI_99K",
    "batch19_id": "B19_POPEYES_BOGO_DELI_99K",
    "brand": "Popeyes",
    "title": "Combo 99.000Đ \"Chill Tiệc\" Tại Gia",
    "tier": "COUNTER_DEAL",
    "price_vnd": 99000,
    "source_url": "https://popeyes.vn",
    "app_url": null,
    "locality_basis": "Popeyes Núi Thành: 179 Núi Thành, Hải Châu",
    "validity": "Giao hàng & mang đi",
    "conditions": "Áp dụng theo quy định chính thức của thương hiệu tại Đà Nẵng.",
    "budget_warning": "Kiểm tra hóa đơn và điều kiện trước khi thanh toán.",
    "has_code": false,
    "code": null,
    "action_type": "COUNTER_MEMBER",
    "cta_label": "Xem điều kiện áp dụng ↗",
    "member_badge": "Ưu đãi tại quầy",
    "is_discovery": false,
    "is_ordinary_observed_price": false,
    "claim_instruction": "Xem điều kiện và xuất trình tại chi nhánh Popeyes Đà Nẵng",
    "campus_tags": [
      "NGOAI_NGU",
      "KINH_TE_DUE"
    ],
    "category": "FOOD"
  },
  {
    "id": "B19_POPEYES_BO_DOI_145K",
    "batch19_id": "B19_POPEYES_BO_DOI_145K",
    "brand": "Popeyes",
    "title": "Bộ Đôi Đúng Ý Chỉ 145.000Đ (7 Món)",
    "tier": "COUNTER_DEAL",
    "price_vnd": 145000,
    "source_url": "https://popeyes.vn",
    "app_url": null,
    "locality_basis": "Popeyes Núi Thành: 179 Núi Thành, Hải Châu",
    "validity": "Thường nhật 2026",
    "conditions": "Áp dụng theo quy định chính thức của thương hiệu tại Đà Nẵng.",
    "budget_warning": "Kiểm tra hóa đơn và điều kiện trước khi thanh toán.",
    "has_code": false,
    "code": null,
    "action_type": "COUNTER_MEMBER",
    "cta_label": "Xem điều kiện áp dụng ↗",
    "member_badge": "Ưu đãi tại quầy",
    "is_discovery": false,
    "is_ordinary_observed_price": false,
    "claim_instruction": "Xem điều kiện và xuất trình tại chi nhánh Popeyes Đà Nẵng",
    "campus_tags": [
      "NGOAI_NGU",
      "KINH_TE_DUE"
    ],
    "category": "FOOD"
  },
  {
    "id": "B18_CGV_CULTURE_DAY",
    "batch19_id": "B18_CGV_CULTURE_DAY",
    "brand": "CGV Cinemas Đà Nẵng",
    "title": "CGV Culture Day — Vé 2D Đồng Giá 58.000đ",
    "tier": "CINEMA_U22_DISCOUNT",
    "price_vnd": 58000,
    "source_url": "https://www.cgv.vn/default/news-offer/cgv-culture-day/",
    "app_url": null,
    "locality_basis": "CGV Vĩnh Trung Plaza: 255-257 Hùng Vương, Thanh Khê, Đà Nẵng",
    "validity": "Thứ 2 cuối cùng của mỗi tháng",
    "conditions": "Áp dụng theo quy định chính thức của thương hiệu tại Đà Nẵng.",
    "budget_warning": "Kiểm tra hóa đơn và điều kiện trước khi thanh toán.",
    "has_code": false,
    "code": null,
    "action_type": "COUNTER_MEMBER",
    "cta_label": "Xem điều kiện áp dụng ↗",
    "member_badge": "Ưu đãi tại quầy",
    "is_discovery": false,
    "is_ordinary_observed_price": false,
    "claim_instruction": "Xem điều kiện và xuất trình tại chi nhánh CGV Cinemas Đà Nẵng Đà Nẵng",
    "campus_tags": [
      "DUY_TAN",
      "BACH_KHOA"
    ],
    "category": "CINEMA"
  },
  {
    "id": "B18_CGV_NGAY_DOI",
    "batch19_id": "B18_CGV_NGAY_DOI",
    "brand": "CGV Cinemas Đà Nẵng",
    "title": "CGV Ngày Đôi — Vé 2D Đồng Giá Ưu Đãi",
    "tier": "CINEMA_U22_DISCOUNT",
    "price_vnd": 69000,
    "source_url": "https://www.cgv.vn/default/news-offer/cgv-ngay-doi/",
    "app_url": null,
    "locality_basis": "CGV Vĩnh Trung Plaza & CGV Vincom Đà Nẵng",
    "validity": "Các ngày đôi hàng tháng (9/9, 10/10...)",
    "conditions": "Áp dụng theo quy định chính thức của thương hiệu tại Đà Nẵng.",
    "budget_warning": "Kiểm tra hóa đơn và điều kiện trước khi thanh toán.",
    "has_code": false,
    "code": null,
    "action_type": "COUNTER_MEMBER",
    "cta_label": "Xem điều kiện áp dụng ↗",
    "member_badge": "Ưu đãi tại quầy",
    "is_discovery": false,
    "is_ordinary_observed_price": false,
    "claim_instruction": "Xem điều kiện và xuất trình tại chi nhánh CGV Cinemas Đà Nẵng Đà Nẵng",
    "campus_tags": [
      "DUY_TAN",
      "KINH_TE_DUE"
    ],
    "category": "CINEMA"
  },
  {
    "id": "B18_CGV_BIRTHDAY_GIFT",
    "batch19_id": "B18_CGV_BIRTHDAY_GIFT",
    "brand": "CGV Cinemas Đà Nẵng",
    "title": "Quà Tặng Sinh Nhật Thành Viên CGV (Bắp Nước Miễn Phí)",
    "tier": "CINEMA_U22_DISCOUNT",
    "price_vnd": null,
    "source_url": "https://www.cgv.vn/default/news-offer/cgv-birthday-gift/",
    "app_url": null,
    "locality_basis": "CGV Vĩnh Trung Plaza & CGV Vincom Đà Nẵng",
    "validity": "Tháng sinh nhật thành viên",
    "conditions": "Áp dụng theo quy định chính thức của thương hiệu tại Đà Nẵng.",
    "budget_warning": "Kiểm tra hóa đơn và điều kiện trước khi thanh toán.",
    "has_code": false,
    "code": null,
    "action_type": "COUNTER_MEMBER",
    "cta_label": "Xem điều kiện áp dụng ↗",
    "member_badge": "Ưu đãi tại quầy",
    "is_discovery": false,
    "is_ordinary_observed_price": false,
    "claim_instruction": "Xem điều kiện và xuất trình tại chi nhánh CGV Cinemas Đà Nẵng Đà Nẵng",
    "campus_tags": [
      "DUY_TAN",
      "KINH_TE_DUE"
    ],
    "category": "CINEMA"
  },
  {
    "id": "B14_METIZ_U22_2D",
    "batch19_id": "B14_METIZ_U22_2D",
    "brand": "Metiz Cinema Đà Nẵng",
    "title": "Khuyến Mãi Giá Vé U22 (2D chỉ 55.000đ)",
    "tier": "CINEMA_U22_DISCOUNT",
    "price_vnd": 55000,
    "source_url": "https://metiz.vn/khuyen-mai/u22-gia-ve-sieu-uu-dai/",
    "app_url": null,
    "locality_basis": "Metiz Cinema: Tầng 1 Helio Center, Đường 2/9, Hải Châu, Đà Nẵng",
    "validity": "Tất cả các ngày trong tuần cho học sinh sinh viên U22",
    "conditions": "Áp dụng theo quy định chính thức của thương hiệu tại Đà Nẵng.",
    "budget_warning": "Kiểm tra hóa đơn và điều kiện trước khi thanh toán.",
    "has_code": false,
    "code": null,
    "action_type": "COUNTER_MEMBER",
    "cta_label": "Xem điều kiện áp dụng ↗",
    "member_badge": "Ưu đãi tại quầy",
    "is_discovery": false,
    "is_ordinary_observed_price": false,
    "claim_instruction": "Xem điều kiện và xuất trình tại chi nhánh Metiz Cinema Đà Nẵng Đà Nẵng",
    "campus_tags": [
      "NGOAI_NGU",
      "KINH_TE_DUE"
    ],
    "category": "CINEMA"
  },
  {
    "id": "B18_METIZ_HAPPY_WED",
    "batch19_id": "B18_METIZ_HAPPY_WED",
    "brand": "Metiz Cinema Đà Nẵng",
    "title": "Thứ 4 Vui Vẻ — Đồng Giá Vé 2D Chỉ 50.000đ",
    "tier": "CINEMA_U22_DISCOUNT",
    "price_vnd": 50000,
    "source_url": "https://metiz.vn/khuyen-mai/happy-wednesday/",
    "app_url": null,
    "locality_basis": "Metiz Cinema Helio Center Đà Nẵng",
    "validity": "Thứ 4 hàng tuần",
    "conditions": "Áp dụng theo quy định chính thức của thương hiệu tại Đà Nẵng.",
    "budget_warning": "Kiểm tra hóa đơn và điều kiện trước khi thanh toán.",
    "has_code": false,
    "code": null,
    "action_type": "COUNTER_MEMBER",
    "cta_label": "Xem điều kiện áp dụng ↗",
    "member_badge": "Ưu đãi tại quầy",
    "is_discovery": false,
    "is_ordinary_observed_price": false,
    "claim_instruction": "Xem điều kiện và xuất trình tại chi nhánh Metiz Cinema Đà Nẵng Đà Nẵng",
    "campus_tags": [
      "NGOAI_NGU",
      "KINH_TE_DUE"
    ],
    "category": "CINEMA"
  },
  {
    "id": "J333_HOT_02_GALAXY_U22",
    "batch19_id": "J333_HOT_02_GALAXY_U22",
    "brand": "Galaxy Cinema",
    "title": "Vé U22 Galaxy Cinema — Từ 45.000đ",
    "tier": "CINEMA_U22_DISCOUNT",
    "price_vnd": 45000,
    "source_url": "https://www.galaxycine.vn/khuyen-mai/u22-vui-ve--bap-nuoc-sieu-me/",
    "app_url": null,
    "locality_basis": "Galaxy Cinema Coop Mart: 478 Điện Biên Phủ, Thanh Khê, Đà Nẵng",
    "validity": "Áp dụng từ Thứ 2 đến Thứ 6 cho U22",
    "conditions": "Áp dụng theo quy định chính thức của thương hiệu tại Đà Nẵng.",
    "budget_warning": "Kiểm tra hóa đơn và điều kiện trước khi thanh toán.",
    "has_code": false,
    "code": null,
    "action_type": "COUNTER_MEMBER",
    "cta_label": "Xem điều kiện áp dụng ↗",
    "member_badge": "Ưu đãi tại quầy",
    "is_discovery": false,
    "is_ordinary_observed_price": false,
    "claim_instruction": "Xem điều kiện và xuất trình tại chi nhánh Galaxy Cinema Đà Nẵng",
    "campus_tags": [
      "BACH_KHOA",
      "SU_PHAM",
      "DUY_TAN"
    ],
    "category": "CINEMA"
  },
  {
    "id": "B18_GALAXY_HAPPY_DAY",
    "batch19_id": "B18_GALAXY_HAPPY_DAY",
    "brand": "Galaxy Cinema",
    "title": "Happy Day Thứ 3 — Đồng Giá Vé 50.000đ",
    "tier": "CINEMA_U22_DISCOUNT",
    "price_vnd": 50000,
    "source_url": "https://www.galaxycine.vn/khuyen-mai/ngay-tri-an-thanh-vien-thu-ba/",
    "app_url": null,
    "locality_basis": "Galaxy Cinema Coop Mart Đà Nẵng: 478 Điện Biên Phủ",
    "validity": "Thứ 3 hàng tuần",
    "conditions": "Áp dụng theo quy định chính thức của thương hiệu tại Đà Nẵng.",
    "budget_warning": "Kiểm tra hóa đơn và điều kiện trước khi thanh toán.",
    "has_code": false,
    "code": null,
    "action_type": "COUNTER_MEMBER",
    "cta_label": "Xem điều kiện áp dụng ↗",
    "member_badge": "Ưu đãi tại quầy",
    "is_discovery": false,
    "is_ordinary_observed_price": false,
    "claim_instruction": "Xem điều kiện và xuất trình tại chi nhánh Galaxy Cinema Đà Nẵng",
    "campus_tags": [
      "BACH_KHOA",
      "SU_PHAM",
      "DUY_TAN"
    ],
    "category": "CINEMA"
  },
  {
    "id": "P2O_GALAXY_MEMBER_2026",
    "batch19_id": "P2O_GALAXY_MEMBER_2026",
    "brand": "Galaxy Cinema",
    "title": "Quyền Lợi Thành Viên Galaxy Cinema 2026",
    "tier": "CINEMA_U22_DISCOUNT",
    "price_vnd": null,
    "source_url": "https://www.galaxycine.vn/quyen-loi-thanh-vien/",
    "app_url": null,
    "locality_basis": "Galaxy Cinema Coop Mart Đà Nẵng: 478 Điện Biên Phủ",
    "validity": "Quyền lợi thành viên cả năm 2026",
    "conditions": "Áp dụng theo quy định chính thức của thương hiệu tại Đà Nẵng.",
    "budget_warning": "Kiểm tra hóa đơn và điều kiện trước khi thanh toán.",
    "has_code": false,
    "code": null,
    "action_type": "COUNTER_MEMBER",
    "cta_label": "Xem điều kiện áp dụng ↗",
    "member_badge": "Ưu đãi tại quầy",
    "is_discovery": false,
    "is_ordinary_observed_price": false,
    "claim_instruction": "Xem điều kiện và xuất trình tại chi nhánh Galaxy Cinema Đà Nẵng",
    "campus_tags": [
      "BACH_KHOA",
      "SU_PHAM",
      "DUY_TAN"
    ],
    "category": "CINEMA"
  },
  {
    "id": "P2O_GALAXY_SHOPEEPAY_SEP_2026",
    "batch19_id": "P2O_GALAXY_SHOPEEPAY_SEP_2026",
    "brand": "Galaxy Cinema & ShopeePay",
    "title": "Voucher ShopeePay tại Galaxy Cinema — Tháng 09/2026",
    "tier": "CINEMA_U22_DISCOUNT",
    "price_vnd": null,
    "source_url": "https://www.galaxycine.vn/khuyen-mai/shopeepay-galaxy-cinema/",
    "app_url": "https://shopeepay.vn",
    "locality_basis": "Galaxy Cinema Coop Mart Đà Nẵng: 478 Điện Biên Phủ",
    "validity": "Áp dụng thanh toán ví ShopeePay",
    "conditions": "Áp dụng theo quy định chính thức của thương hiệu tại Đà Nẵng.",
    "budget_warning": "Kiểm tra hóa đơn và điều kiện trước khi thanh toán.",
    "has_code": false,
    "code": null,
    "action_type": "APP_WALLET",
    "cta_label": "Mở App nhận deal ↗",
    "member_badge": "Ưu đãi trên App",
    "is_discovery": false,
    "is_ordinary_observed_price": false,
    "claim_instruction": "Xem điều kiện và xuất trình tại chi nhánh Galaxy Cinema & ShopeePay Đà Nẵng",
    "campus_tags": [
      "BACH_KHOA",
      "SU_PHAM",
      "DUY_TAN"
    ],
    "category": "CINEMA"
  },
  {
    "id": "B18_STARLIGHT_MEMBER_DAY",
    "batch19_id": "B18_STARLIGHT_MEMBER_DAY",
    "brand": "Starlight Cinema",
    "title": "Thứ 5 Ngày Hội Thành Viên — Vé Đồng Giá 45.000đ",
    "tier": "CINEMA_U22_DISCOUNT",
    "price_vnd": 45000,
    "source_url": "https://starlight.vn/uu-dai/ngay-hoi-thanh-vien-1045.html",
    "app_url": null,
    "locality_basis": "Starlight Đà Nẵng: Tầng 4 Nguyễn Kim, 46 Điện Biên Phủ",
    "validity": "Thứ 5 hàng tuần cho thành viên",
    "conditions": "Áp dụng theo quy định chính thức của thương hiệu tại Đà Nẵng.",
    "budget_warning": "Kiểm tra hóa đơn và điều kiện trước khi thanh toán.",
    "has_code": false,
    "code": null,
    "action_type": "COUNTER_MEMBER",
    "cta_label": "Xem điều kiện áp dụng ↗",
    "member_badge": "Ưu đãi tại quầy",
    "is_discovery": false,
    "is_ordinary_observed_price": false,
    "claim_instruction": "Xem điều kiện và xuất trình tại chi nhánh Starlight Cinema Đà Nẵng",
    "campus_tags": [
      "BACH_KHOA",
      "SU_PHAM",
      "DUY_TAN"
    ],
    "category": "CINEMA"
  },
  {
    "id": "B18_PL_LOCO_VIBE",
    "batch19_id": "B18_PL_LOCO_VIBE",
    "brand": "Phúc Long Coffee & Tea",
    "title": "Combo Bật Chất Hè Loco Vibe",
    "tier": "COUNTER_DEAL",
    "price_vnd": 95000,
    "source_url": "https://phuclong.com.vn/combo-loco-vibe",
    "app_url": null,
    "locality_basis": "Hệ thống Phúc Long Đà Nẵng: Nguyễn Văn Linh, Vincom Ngô Quyền, Bạch Đằng",
    "validity": "Chương trình combo mùa hè 2026",
    "conditions": "Áp dụng theo quy định chính thức của thương hiệu tại Đà Nẵng.",
    "budget_warning": "Kiểm tra hóa đơn và điều kiện trước khi thanh toán.",
    "has_code": false,
    "code": null,
    "action_type": "COUNTER_MEMBER",
    "cta_label": "Xem điều kiện áp dụng ↗",
    "member_badge": "Ưu đãi tại quầy",
    "is_discovery": false,
    "is_ordinary_observed_price": false,
    "claim_instruction": "Xem điều kiện và xuất trình tại chi nhánh Phúc Long Coffee & Tea Đà Nẵng",
    "campus_tags": [
      "DUY_TAN",
      "KINH_TE_DUE"
    ],
    "category": "DRINK"
  },
  {
    "id": "B16_PHUCLONG_HONEY_P1",
    "batch19_id": "B16_PHUCLONG_HONEY_P1",
    "brand": "Phúc Long Coffee & Tea",
    "title": "Combo 1 bánh + 1 nước Hương Mật Ươm Sắc",
    "tier": "COUNTER_DEAL",
    "price_vnd": 85000,
    "source_url": "https://phuclong.com.vn/combo-huong-mat",
    "app_url": null,
    "locality_basis": "Phúc Long Đà Nẵng: 59 Nguyễn Văn Linh, Q. Hải Châu",
    "validity": "Áp dụng tại quầy Phúc Long",
    "conditions": "Áp dụng theo quy định chính thức của thương hiệu tại Đà Nẵng.",
    "budget_warning": "Kiểm tra hóa đơn và điều kiện trước khi thanh toán.",
    "has_code": false,
    "code": null,
    "action_type": "COUNTER_MEMBER",
    "cta_label": "Xem điều kiện áp dụng ↗",
    "member_badge": "Ưu đãi tại quầy",
    "is_discovery": false,
    "is_ordinary_observed_price": false,
    "claim_instruction": "Xem điều kiện và xuất trình tại chi nhánh Phúc Long Coffee & Tea Đà Nẵng",
    "campus_tags": [
      "DUY_TAN"
    ],
    "category": "DRINK"
  },
  {
    "id": "B16_PHUCLONG_LOCO_P1",
    "batch19_id": "B16_PHUCLONG_LOCO_P1",
    "brand": "Phúc Long Coffee & Tea",
    "title": "Combo Lô Cồ Vibe túi lưới và nước size L",
    "tier": "COUNTER_DEAL",
    "price_vnd": 115000,
    "source_url": "https://phuclong.com.vn/combo-loco-tui-luoi",
    "app_url": null,
    "locality_basis": "Phúc Long Đà Nẵng",
    "validity": "Áp dụng thường nhật",
    "conditions": "Áp dụng theo quy định chính thức của thương hiệu tại Đà Nẵng.",
    "budget_warning": "Kiểm tra hóa đơn và điều kiện trước khi thanh toán.",
    "has_code": false,
    "code": null,
    "action_type": "COUNTER_MEMBER",
    "cta_label": "Xem điều kiện áp dụng ↗",
    "member_badge": "Ưu đãi tại quầy",
    "is_discovery": false,
    "is_ordinary_observed_price": false,
    "claim_instruction": "Xem điều kiện và xuất trình tại chi nhánh Phúc Long Coffee & Tea Đà Nẵng",
    "campus_tags": [
      "DUY_TAN"
    ],
    "category": "DRINK"
  },
  {
    "id": "B14_PLONG_MEMBER_BENEFITS",
    "batch19_id": "B14_PLONG_MEMBER_BENEFITS",
    "brand": "Phúc Long Coffee & Tea",
    "title": "Chương Trình Hội Viên Phúc Long: Tích Điểm & Đổi Quà",
    "tier": "COUNTER_DEAL",
    "price_vnd": null,
    "source_url": "https://phuclong.com.vn/hoi-vien/dieu-khoan-va-dieu-kien-chuong-trinh-hoi-vien",
    "app_url": null,
    "locality_basis": "Các chi nhánh Phúc Long Đà Nẵng (trừ Sân Bay)",
    "validity": "Chính sách hội viên chính thức",
    "conditions": "Áp dụng theo quy định chính thức của thương hiệu tại Đà Nẵng.",
    "budget_warning": "Kiểm tra hóa đơn và điều kiện trước khi thanh toán.",
    "has_code": false,
    "code": null,
    "action_type": "COUNTER_MEMBER",
    "cta_label": "Xem điều kiện áp dụng ↗",
    "member_badge": "Ưu đãi tại quầy",
    "is_discovery": false,
    "is_ordinary_observed_price": false,
    "claim_instruction": "Xem điều kiện và xuất trình tại chi nhánh Phúc Long Coffee & Tea Đà Nẵng",
    "campus_tags": [
      "DUY_TAN",
      "KINH_TE_DUE"
    ],
    "category": "DRINK"
  },
  {
    "id": "B18_TPC_BOGO_TUE_WED",
    "batch19_id": "B18_TPC_BOGO_TUE_WED",
    "brand": "The Pizza Company",
    "title": "Mua 1 Tặng 1 Pizza Thứ 3 & Thứ 4 (BOGO)",
    "tier": "COUNTER_DEAL",
    "price_vnd": 169000,
    "source_url": "https://thepizzacompany.vn/khuyen-mai/bogo-tuesday-wednesday",
    "app_url": null,
    "locality_basis": "4 chi nhánh The Pizza Company Đà Nẵng",
    "validity": "Thứ 3 và Thứ 4 hàng tuần",
    "conditions": "Áp dụng theo quy định chính thức của thương hiệu tại Đà Nẵng.",
    "budget_warning": "Kiểm tra hóa đơn và điều kiện trước khi thanh toán.",
    "has_code": false,
    "code": null,
    "action_type": "COUNTER_MEMBER",
    "cta_label": "Xem điều kiện áp dụng ↗",
    "member_badge": "Ưu đãi tại quầy",
    "is_discovery": false,
    "is_ordinary_observed_price": false,
    "claim_instruction": "Xem điều kiện và xuất trình tại chi nhánh The Pizza Company Đà Nẵng",
    "campus_tags": [
      "KINH_TE_DUE",
      "DUY_TAN",
      "NGOAI_NGU"
    ],
    "category": "FOOD"
  },
  {
    "id": "B18_TPC_MY_BOX_LUNCH",
    "batch19_id": "B18_TPC_MY_BOX_LUNCH",
    "brand": "The Pizza Company",
    "title": "My Box Cơm Trưa & Pizza Cá Nhân Từ 79.000đ",
    "tier": "COUNTER_DEAL",
    "price_vnd": 79000,
    "source_url": "https://thepizzacompany.vn/my-box-combo",
    "app_url": null,
    "locality_basis": "4 chi nhánh The Pizza Company Đà Nẵng",
    "validity": "Khung giờ trưa 10:00 - 14:00 hàng ngày",
    "conditions": "Áp dụng theo quy định chính thức của thương hiệu tại Đà Nẵng.",
    "budget_warning": "Kiểm tra hóa đơn và điều kiện trước khi thanh toán.",
    "has_code": false,
    "code": null,
    "action_type": "COUNTER_MEMBER",
    "cta_label": "Xem điều kiện áp dụng ↗",
    "member_badge": "Ưu đãi tại quầy",
    "is_discovery": false,
    "is_ordinary_observed_price": false,
    "claim_instruction": "Xem điều kiện và xuất trình tại chi nhánh The Pizza Company Đà Nẵng",
    "campus_tags": [
      "KINH_TE_DUE",
      "DUY_TAN",
      "NGOAI_NGU"
    ],
    "category": "FOOD"
  },
  {
    "id": "B18_LOTTE_MEMBERDAY",
    "batch19_id": "B18_LOTTE_MEMBERDAY",
    "brand": "Lotteria",
    "title": "Lotteria Member Day Thứ 4 — Giảm Đến 20% Cho Thành Viên",
    "tier": "COUNTER_DEAL",
    "price_vnd": null,
    "source_url": "https://www.lotteria.vn/promotions",
    "app_url": null,
    "locality_basis": "Lotteria Đà Nẵng: Lotte Mart, 91 Ông Ích Khiêm, 321 Núi Thành",
    "validity": "Thứ 4 hàng tuần",
    "conditions": "Áp dụng theo quy định chính thức của thương hiệu tại Đà Nẵng.",
    "budget_warning": "Kiểm tra hóa đơn và điều kiện trước khi thanh toán.",
    "has_code": false,
    "code": null,
    "action_type": "COUNTER_MEMBER",
    "cta_label": "Xem điều kiện áp dụng ↗",
    "member_badge": "Ưu đãi tại quầy",
    "is_discovery": false,
    "is_ordinary_observed_price": false,
    "claim_instruction": "Xem điều kiện và xuất trình tại chi nhánh Lotteria Đà Nẵng",
    "campus_tags": [
      "NGOAI_NGU",
      "DUY_TAN"
    ],
    "category": "FOOD"
  },
  {
    "id": "B18_LOTTE_RIAS_LUNCH",
    "batch19_id": "B18_LOTTE_RIAS_LUNCH",
    "brand": "Lotteria",
    "title": "Combo Ria's Lunch Giờ Trưa Từ 45.000₫",
    "tier": "COUNTER_DEAL",
    "price_vnd": 45000,
    "source_url": "https://www.lotteria.vn/promotions/rias-lunch",
    "app_url": null,
    "locality_basis": "Hệ thống Lotteria Đà Nẵng",
    "validity": "10:00 - 14:00 Thứ 2 đến Thứ 6",
    "conditions": "Áp dụng theo quy định chính thức của thương hiệu tại Đà Nẵng.",
    "budget_warning": "Kiểm tra hóa đơn và điều kiện trước khi thanh toán.",
    "has_code": false,
    "code": null,
    "action_type": "COUNTER_MEMBER",
    "cta_label": "Xem điều kiện áp dụng ↗",
    "member_badge": "Ưu đãi tại quầy",
    "is_discovery": false,
    "is_ordinary_observed_price": false,
    "claim_instruction": "Xem điều kiện và xuất trình tại chi nhánh Lotteria Đà Nẵng",
    "campus_tags": [
      "NGOAI_NGU",
      "DUY_TAN"
    ],
    "category": "FOOD"
  },
  {
    "id": "B18_HIGHLANDS_APP_REWARDS",
    "batch19_id": "B18_HIGHLANDS_APP_REWARDS",
    "brand": "Highlands Coffee",
    "title": "Highlands App Rewards — Tích Điểm Tặng Thức Uống Miễn Phí",
    "tier": "APP_VOUCHER",
    "price_vnd": null,
    "source_url": "https://highlandscoffee.com.vn",
    "app_url": "https://highlandscoffee.com.vn",
    "locality_basis": "Tất cả các chi nhánh Highlands Coffee Đà Nẵng",
    "validity": "Áp dụng qua App Highlands",
    "conditions": "Áp dụng theo quy định chính thức của thương hiệu tại Đà Nẵng.",
    "budget_warning": "Kiểm tra hóa đơn và điều kiện trước khi thanh toán.",
    "has_code": false,
    "code": null,
    "action_type": "APP_WALLET",
    "cta_label": "Mở App nhận deal ↗",
    "member_badge": "Ưu đãi trên App",
    "is_discovery": false,
    "is_ordinary_observed_price": false,
    "claim_instruction": "Xem điều kiện và xuất trình tại chi nhánh Highlands Coffee Đà Nẵng",
    "campus_tags": [
      "BACH_KHOA",
      "SU_PHAM",
      "KINH_TE_DUE",
      "DUY_TAN",
      "NGOAI_NGU"
    ],
    "category": "DRINK"
  },
  {
    "id": "B19_POPEYES_PARTY_COMBO",
    "batch19_id": "B19_POPEYES_PARTY_COMBO",
    "brand": "Popeyes",
    "title": "Combo Tiệc Nhóm Gà Giòn 5 Miếng & Burger 199.000đ",
    "tier": "COUNTER_DEAL",
    "price_vnd": 199000,
    "source_url": "https://popeyes.vn",
    "app_url": null,
    "locality_basis": "Popeyes Núi Thành: 179 Núi Thành, Đà Nẵng",
    "validity": "Thường nhật 2026",
    "conditions": "Áp dụng theo quy định chính thức của thương hiệu tại Đà Nẵng.",
    "budget_warning": "Kiểm tra hóa đơn và điều kiện trước khi thanh toán.",
    "has_code": false,
    "code": null,
    "action_type": "COUNTER_MEMBER",
    "cta_label": "Xem điều kiện áp dụng ↗",
    "member_badge": "Ưu đãi tại quầy",
    "is_discovery": false,
    "is_ordinary_observed_price": false,
    "claim_instruction": "Xem điều kiện và xuất trình tại chi nhánh Popeyes Đà Nẵng",
    "campus_tags": [
      "NGOAI_NGU",
      "KINH_TE_DUE"
    ],
    "category": "FOOD"
  },
  {
    "id": "B18_KFC_TRUA_TIET_KIEM",
    "batch19_id": "B18_KFC_TRUA_TIET_KIEM",
    "brand": "KFC Vietnam",
    "title": "KFC Cơm Trưa Tiết Kiệm Từ 39.000đ (Thứ 2 - Thứ 6)",
    "tier": "COUNTER_DEAL",
    "price_vnd": 39000,
    "source_url": "https://kfcvietnam.com.vn/khuyen-mai/trua-tiet-kiem",
    "app_url": null,
    "locality_basis": "KFC Đà Nẵng: Nguyễn Văn Linh, Big C Vĩnh Trung, Lotte Mart",
    "validity": "10:00 - 14:00 Thứ 2 đến Thứ 6",
    "conditions": "Áp dụng theo quy định chính thức của thương hiệu tại Đà Nẵng.",
    "budget_warning": "Kiểm tra hóa đơn và điều kiện trước khi thanh toán.",
    "has_code": false,
    "code": null,
    "action_type": "COUNTER_MEMBER",
    "cta_label": "Xem điều kiện áp dụng ↗",
    "member_badge": "Ưu đãi tại quầy",
    "is_discovery": false,
    "is_ordinary_observed_price": false,
    "claim_instruction": "Xem điều kiện và xuất trình tại chi nhánh KFC Vietnam Đà Nẵng",
    "campus_tags": [
      "DUY_TAN",
      "NGOAI_NGU"
    ],
    "category": "FOOD"
  },
  {
    "id": "B18_PHUCLONG_APP_CODE_5K",
    "batch19_id": "B18_PHUCLONG_APP_CODE_5K",
    "brand": "Phúc Long Coffee & Tea",
    "title": "Mã Giảm 5K Khi Đặt Món Qua App Phúc Long",
    "tier": "VOUCHER_CODE",
    "price_vnd": null,
    "source_url": "https://phuclong.com.vn/tin-tuc/uu-dai-app",
    "app_url": null,
    "locality_basis": "Áp dụng đặt qua App tại các cửa hàng Phúc Long Đà Nẵng",
    "validity": "Áp dụng đến hết tháng 09/2026",
    "conditions": "Áp dụng theo quy định chính thức của thương hiệu tại Đà Nẵng.",
    "budget_warning": "Kiểm tra hóa đơn và điều kiện trước khi thanh toán.",
    "has_code": true,
    "code": "PL5KSEP",
    "action_type": "REAL_CODE",
    "cta_label": "Sao chép mã",
    "member_badge": "Mã ưu đãi độc quyền",
    "is_discovery": false,
    "is_ordinary_observed_price": false,
    "claim_instruction": "Sao chép mã PL5KSEP khi thanh toán",
    "campus_tags": [
      "DUY_TAN",
      "KINH_TE_DUE"
    ],
    "category": "DRINK"
  },
  {
    "id": "B18_TPC_CODE_ONLINE_20K",
    "batch19_id": "B18_TPC_CODE_ONLINE_20K",
    "brand": "The Pizza Company",
    "title": "Mã Giảm 20K Cho Đơn Hàng Đầu Tiên Đặt Trực Tuyến",
    "tier": "VOUCHER_CODE",
    "price_vnd": null,
    "source_url": "https://thepizzacompany.vn",
    "app_url": null,
    "locality_basis": "Áp dụng giao hàng tại 4 chi nhánh Đà Nẵng",
    "validity": "Áp dụng đơn hàng từ 150k",
    "conditions": "Áp dụng theo quy định chính thức của thương hiệu tại Đà Nẵng.",
    "budget_warning": "Kiểm tra hóa đơn và điều kiện trước khi thanh toán.",
    "has_code": true,
    "code": "TPCNEW20",
    "action_type": "REAL_CODE",
    "cta_label": "Sao chép mã",
    "member_badge": "Mã ưu đãi độc quyền",
    "is_discovery": false,
    "is_ordinary_observed_price": false,
    "claim_instruction": "Sao chép mã TPCNEW20 khi thanh toán",
    "campus_tags": [
      "KINH_TE_DUE",
      "DUY_TAN",
      "NGOAI_NGU"
    ],
    "category": "FOOD"
  },
  {
    "id": "B19_POPEYES_DISCOVERY_001",
    "batch19_id": "B19_POPEYES_DISCOVERY_001",
    "brand": "Popeyes",
    "title": "Cổng Khuyến Mãi Popeyes Vietnam (Showroom Đà Nẵng)",
    "tier": "DISCOVERY_RECORD",
    "price_vnd": 0,
    "source_url": "https://popeyes.vn/promotion",
    "app_url": null,
    "locality_basis": "179 Núi Thành, Phường Hòa Cường Bắc, Quận Hải Châu, Đà Nẵng",
    "validity": "Cổng thông tin chính thức 2026",
    "conditions": "Áp dụng theo quy định chính thức của thương hiệu.",
    "budget_warning": "Ưu đãi quyền lợi/chính sách, không phát sinh chi phí bắt buộc.",
    "has_code": false,
    "code": null,
    "action_type": "DISCOVERY",
    "cta_label": "Xem cổng khuyến mãi Popeyes ↗",
    "member_badge": null,
    "is_discovery": true,
    "claim_instruction": "Khám phá toàn bộ danh mục ưu đãi và combo gà giòn trên website Popeyes.",
    "raw_sha256": "908f9ebeba359474d132d7b1dff1c7dae7e3688506ed475c1dcf6c554224d9bd"
  },
  {
    "id": "B19_TCH_DISCOVERY_001",
    "batch19_id": "B19_TCH_DISCOVERY_001",
    "brand": "The Coffee House",
    "title": "The Coffee House Vietnam Portal (Khám phá)",
    "tier": "DISCOVERY_ONLY",
    "price_vnd": 0,
    "source_url": "https://thecoffeehouse.com/",
    "app_url": null,
    "locality_basis": "0 cửa hàng tại Đà Nẵng theo the_coffee_house_stores_api.json",
    "validity": "Cổng thông tin chuỗi toàn quốc (Chưa có cơ sở hoạt động tại Đà Nẵng)",
    "conditions": "Áp dụng theo quy định chính thức của thương hiệu.",
    "budget_warning": "Ưu đãi quyền lợi/chính sách, không phát sinh chi phí bắt buộc.",
    "has_code": false,
    "code": null,
    "action_type": "DISCOVERY",
    "cta_label": "Xem website The Coffee House ↗",
    "member_badge": null,
    "is_discovery": true,
    "claim_instruction": "Bản ghi khám phá chuỗi toàn quốc. Chưa có cơ sở hoạt động tại Đà Nẵng tại thời điểm đối soát.",
    "raw_sha256": "f0792e5ab6e1517ea5d289e36dbbccf0f3539b55c9fa9d76665c3f89e4535347"
  },
  {
    "id": "B14_JB_70145",
    "batch18_id": "B18_JB_CANG_CAY",
    "brand": "Jollibee",
    "title": "Combo CÀNG CAY CÀNG MÊ",
    "tier": "PRICE_OBSERVATION",
    "price_vnd": 157000,
    "source_url": "https://jollibee.com.vn/c-ng-cay-c-ng-me.html",
    "locality_basis": "Thương hiệu có 9 cửa hàng tại Đà Nẵng (INHERITED_BRAND_PRESENCE)",
    "validity": "Thực đơn thường nhật tại thời điểm quan sát tháng 09/2026",
    "conditions": "Áp dụng trực tiếp tại quầy hoặc đặt trực tuyến; giá niêm yết chính hãng.",
    "budget_warning": "Giá niêm yết chuẩn thực đơn, không phải voucher chiết khấu phần trăm.",
    "has_code": false,
    "code": null,
    "claim_instruction": "Gọi món trực tiếp tại quầy Jollibee Đà Nẵng hoặc đặt qua ứng dụng Jollibee.",
    "raw_sha256": "dc14e9de7763914eb95bb985c8e4c8d40b42fd2f5eb78cc2b83d34de34c5982e"
  },
  {
    "id": "B14_JB_70144",
    "batch18_id": "B18_JB_HIT_HA",
    "brand": "Jollibee",
    "title": "Combo MỘT MÌNH HÍT HÀ",
    "tier": "PRICE_OBSERVATION",
    "price_vnd": 80000,
    "source_url": "https://jollibee.com.vn/m-t-m-nh-h-t-h.html",
    "locality_basis": "Thương hiệu có 9 cửa hàng tại Đà Nẵng (INHERITED_BRAND_PRESENCE)",
    "validity": "Thực đơn thường nhật tại thời điểm quan sát tháng 09/2026",
    "conditions": "Áp dụng trực tiếp tại quầy hoặc đặt trực tuyến; giá niêm yết chính hãng.",
    "budget_warning": "Giá niêm yết chuẩn thực đơn; không phải voucher chiết khấu.",
    "has_code": false,
    "code": null,
    "claim_instruction": "Gọi món trực tiếp tại quầy Jollibee Đà Nẵng hoặc qua hotline 19001533.",
    "raw_sha256": "dc14e9de7763914eb95bb985c8e4c8d40b42fd2f5eb78cc2b83d34de34c5982e"
  },
  {
    "id": "B14_JB_2840004",
    "batch18_id": "B18_JB_MOT_MINH_AN_NGON",
    "brand": "Jollibee",
    "title": "Combo Một Mình Ăn Ngon (Mì Ý + Gà Rán + Nước)",
    "tier": "PRICE_OBSERVATION",
    "price_vnd": 73000,
    "source_url": "https://jollibee.com.vn/thuc-don/combo-1-nguoi",
    "locality_basis": "Thương hiệu có 9 cửa hàng tại Đà Nẵng (INHERITED_BRAND_PRESENCE)",
    "validity": "Thực đơn thường nhật tại thời điểm quan sát tháng 09/2026",
    "conditions": "1 Miếng Gà Giòn Vui Vẻ + 1 Mì Ý Sốt Bò Bằm + 1 Ly Pepsi Vừa.",
    "budget_warning": "Giá niêm yết chuẩn thực đơn; không phải voucher chiết khấu.",
    "has_code": false,
    "code": null,
    "claim_instruction": "Gọi món trực tiếp tại quầy Jollibee Đà Nẵng.",
    "raw_sha256": "dc14e9de7763914eb95bb985c8e4c8d40b42fd2f5eb78cc2b83d34de34c5982e"
  },
  {
    "id": "B14_JB_4000742",
    "batch18_id": "B18_JB_CAP_DOI",
    "brand": "Jollibee",
    "title": "Combo Cặp Đôi Ăn Ý",
    "tier": "PRICE_OBSERVATION",
    "price_vnd": 145000,
    "source_url": "https://jollibee.com.vn/thuc-don/combo-nhom",
    "locality_basis": "Thương hiệu có 9 cửa hàng tại Đà Nẵng (INHERITED_BRAND_PRESENCE)",
    "validity": "Thực đơn thường nhật tại thời điểm quan sát tháng 09/2026",
    "conditions": "2 Miếng Gà Giòn Vui Vẻ + 1 Mì Ý Jolly Sốt Bò Bằm + 2 Ly Pepsi Vừa + 1 Khoai tây chiên vừa.",
    "budget_warning": "Giá niêm yết chuẩn thực đơn; không phải voucher chiết khấu.",
    "has_code": false,
    "code": null,
    "claim_instruction": "Gọi món trực tiếp tại quầy Jollibee Đà Nẵng.",
    "raw_sha256": "dc14e9de7763914eb95bb985c8e4c8d40b42fd2f5eb78cc2b83d34de34c5982e"
  },
  {
    "id": "B14_JB_4000935",
    "brand": "Jollibee",
    "title": "COMBO 179 (Cả Nhà No Nê)",
    "tier": "PRICE_OBSERVATION",
    "price_vnd": 179000,
    "source_url": "https://jollibee.com.vn/thuc-don/combo-nhom",
    "locality_basis": "Thương hiệu có 9 cửa hàng tại Đà Nẵng (INHERITED_BRAND_PRESENCE)",
    "validity": "Thực đơn thường nhật tại thời điểm quan sát tháng 09/2026",
    "conditions": "3 Miếng Gà Giòn + 1 Mì Ý + 1 Khoai lắc + 2 Nước ngọt.",
    "budget_warning": "Giá niêm yết combo nhóm chuẩn thực đơn.",
    "has_code": false,
    "code": null,
    "claim_instruction": "Gọi món trực tiếp tại quầy Jollibee Đà Nẵng.",
    "raw_sha256": "dc14e9de7763914eb95bb985c8e4c8d40b42fd2f5eb78cc2b83d34de34c5982e"
  },
  {
    "id": "B18_JB_COM_GA_CAY",
    "batch18_id": "B18_JB_COM_GA_CAY",
    "brand": "Jollibee",
    "title": "Cơm Gà Giòn Cay",
    "tier": "PRICE_OBSERVATION",
    "price_vnd": 47000,
    "source_url": "https://jollibee.com.vn/thuc-don/com",
    "locality_basis": "Thương hiệu có 9 cửa hàng tại Đà Nẵng (INHERITED_BRAND_PRESENCE)",
    "validity": "Thực đơn thường nhật tại thời điểm quan sát tháng 09/2026",
    "conditions": "1 Miếng Gà Giòn Cay + Cơm trắng + Nước sốt gravy đặc trưng.",
    "budget_warning": "Giá niêm yết chuẩn thực đơn cơm trưa Jollibee.",
    "has_code": false,
    "code": null,
    "claim_instruction": "Gọi món trực tiếp tại quầy Jollibee Đà Nẵng.",
    "raw_sha256": "dc14e9de7763914eb95bb985c8e4c8d40b42fd2f5eb78cc2b83d34de34c5982e"
  },
  {
    "id": "B18_JB_MI_Y_BO_BAM",
    "batch18_id": "B18_JB_MI_Y_BO_BAM",
    "brand": "Jollibee",
    "title": "Mì Ý Jolly Sốt Bò Bằm",
    "tier": "PRICE_OBSERVATION",
    "price_vnd": 40000,
    "source_url": "https://jollibee.com.vn/thuc-don/mi-y-jolly",
    "locality_basis": "Thương hiệu có 9 cửa hàng tại Đà Nẵng (INHERITED_BRAND_PRESENCE)",
    "validity": "Thực đơn thường nhật tại thời điểm quan sát tháng 09/2026",
    "conditions": "Mì Ý sốt bò bằm đậm đà chuẩn vị Jollibee.",
    "budget_warning": "Giá niêm yết chuẩn thực đơn mì Ý.",
    "has_code": false,
    "code": null,
    "claim_instruction": "Gọi món trực tiếp tại quầy Jollibee Đà Nẵng.",
    "raw_sha256": "dc14e9de7763914eb95bb985c8e4c8d40b42fd2f5eb78cc2b83d34de34c5982e"
  },
  {
    "id": "B16_JOLLIBEE_12008_1",
    "brand": "Jollibee",
    "title": "Burger Gà Giòn",
    "tier": "PRICE_OBSERVATION",
    "price_vnd": 35000,
    "source_url": "https://jollibee.com.vn/thuc-don/burger-sandwich",
    "locality_basis": "Thương hiệu có 9 cửa hàng tại Đà Nẵng (INHERITED_BRAND_PRESENCE)",
    "validity": "Thực đơn thường nhật tại thời điểm quan sát tháng 09/2026",
    "conditions": "Burger nhân gà chiên giòn rụm kèm sốt mayonnaise tiêu chuẩn.",
    "budget_warning": "Giá niêm yết thực đơn đơn món.",
    "has_code": false,
    "code": null,
    "claim_instruction": "Gọi món trực tiếp tại quầy Jollibee Đà Nẵng.",
    "raw_sha256": "dc14e9de7763914eb95bb985c8e4c8d40b42fd2f5eb78cc2b83d34de34c5982e"
  },
  {
    "id": "B16_JOLLIBEE_52013",
    "brand": "Jollibee",
    "title": "Combo Burger Gà Giòn 2",
    "tier": "PRICE_OBSERVATION",
    "price_vnd": 60000,
    "source_url": "https://jollibee.com.vn/thuc-don/burger-sandwich",
    "locality_basis": "Thương hiệu có 9 cửa hàng tại Đà Nẵng (INHERITED_BRAND_PRESENCE)",
    "validity": "Thực đơn thường nhật tại thời điểm quan sát tháng 09/2026",
    "conditions": "1 Burger Gà Giòn + 1 Khoai tây chiên vừa + 1 Ly Pepsi vừa.",
    "budget_warning": "Giá niêm yết combo.",
    "has_code": false,
    "code": null,
    "claim_instruction": "Gọi món trực tiếp tại quầy Jollibee Đà Nẵng.",
    "raw_sha256": "dc14e9de7763914eb95bb985c8e4c8d40b42fd2f5eb78cc2b83d34de34c5982e"
  },
  {
    "id": "B16_JOLLIBEE_1810060_1",
    "brand": "Jollibee",
    "title": "Cơm Gà Mắm Tỏi",
    "tier": "PRICE_OBSERVATION",
    "price_vnd": 45000,
    "source_url": "https://jollibee.com.vn/thuc-don/com",
    "locality_basis": "Thương hiệu có 9 cửa hàng tại Đà Nẵng (INHERITED_BRAND_PRESENCE)",
    "validity": "Thực đơn thường nhật tại thời điểm quan sát tháng 09/2026",
    "conditions": "Cơm gà sốt mắm tỏi thơm ngon đậm đà, kèm đồ chua.",
    "budget_warning": "Giá niêm yết thực đơn cơm trưa.",
    "has_code": false,
    "code": null,
    "claim_instruction": "Gọi món trực tiếp tại quầy Jollibee Đà Nẵng.",
    "raw_sha256": "dc14e9de7763914eb95bb985c8e4c8d40b42fd2f5eb78cc2b83d34de34c5982e"
  },
  {
    "id": "B16_JOLLIBEE_1820006_1",
    "brand": "Jollibee",
    "title": "Burger Tôm",
    "tier": "PRICE_OBSERVATION",
    "price_vnd": 40000,
    "source_url": "https://jollibee.com.vn/thuc-don/burger-sandwich",
    "locality_basis": "Thương hiệu có 9 cửa hàng tại Đà Nẵng (INHERITED_BRAND_PRESENCE)",
    "validity": "Thực đơn thường nhật tại thời điểm quan sát tháng 09/2026",
    "conditions": "Burger nhân tôm tươi giòn, sốt tartar hấp dẫn.",
    "budget_warning": "Giá niêm yết đơn món.",
    "has_code": false,
    "code": null,
    "claim_instruction": "Gọi món trực tiếp tại quầy Jollibee Đà Nẵng.",
    "raw_sha256": "dc14e9de7763914eb95bb985c8e4c8d40b42fd2f5eb78cc2b83d34de34c5982e"
  },
  {
    "id": "B16_JOLLIBEE_1830009_1",
    "brand": "Jollibee",
    "title": "Jolly Hotdog",
    "tier": "PRICE_OBSERVATION",
    "price_vnd": 30000,
    "source_url": "https://jollibee.com.vn/thuc-don/burger-sandwich",
    "locality_basis": "Thương hiệu có 9 cửa hàng tại Đà Nẵng (INHERITED_BRAND_PRESENCE)",
    "validity": "Thực đơn thường nhật tại thời điểm quan sát tháng 09/2026",
    "conditions": "Xúc xích nướng kẹp bánh mì nóng giòn phủ sốt phô mai đặc biệt.",
    "budget_warning": "Giá niêm yết đơn món ăn nhẹ.",
    "has_code": false,
    "code": null,
    "claim_instruction": "Gọi món trực tiếp tại quầy Jollibee Đà Nẵng.",
    "raw_sha256": "dc14e9de7763914eb95bb985c8e4c8d40b42fd2f5eb78cc2b83d34de34c5982e"
  },
  {
    "id": "B14_GALAXY_DANANG_TARIFF",
    "brand": "Galaxy Cinema",
    "title": "Biểu Giá Vé Galaxy Cinema Coop Đà Nẵng",
    "tier": "PRICE_OBSERVATION",
    "price_vnd": 45000,
    "source_url": "https://www.galaxycine.vn/rap-gia-ve/galaxy-da-nang/",
    "locality_basis": "Galaxy Cinema Co.opmart Đà Nẵng, 478 Điện Biên Phủ, Thanh Khê, Đà Nẵng",
    "validity": "Biểu giá niêm yết thường nhật năm 2026",
    "conditions": "Bảng giá vé tiêu chuẩn ngày thường và cuối tuần tại Galaxy Cinema Co.opmart Đà Nẵng.",
    "budget_warning": "Biểu giá vé tiêu chuẩn; phụ thu ghế VIP và 3D theo quy định rạp.",
    "has_code": false,
    "code": null,
    "claim_instruction": "Mua vé trực tiếp tại quầy hoặc đặt trực tuyến qua app Galaxy Cinema.",
    "raw_sha256": "b0b2e8d47b561c21051515bf28c89bdf01a75094f92d4f826fae30a597a47b1c"
  },
  {
    "id": "B18_PL_HONEY_M",
    "batch18_id": "B18_PL_HONEY_M",
    "brand": "Phúc Long Coffee & Tea",
    "title": "Trà Ô Long Mật Ong (Size M)",
    "tier": "PRICE_OBSERVATION",
    "price_vnd": 55000,
    "source_url": "https://phuclong.com.vn/danh-muc/thuc-uong",
    "locality_basis": "Phúc Long Nguyễn Văn Linh, Bạch Đằng, Vincom Đà Nẵng (INHERITED_BRAND_PRESENCE)",
    "validity": "BST Hương Mật Ươm Sắc tháng 09/2026",
    "conditions": "Dòng sản phẩm trà mùa vụ Hương Mật Ươm Sắc, thơm ngọt dịu thanh.",
    "budget_warning": "Giá niêm yết đồ uống size M tại quầy.",
    "has_code": false,
    "code": null,
    "claim_instruction": "Gọi món tại quầy Phúc Long hoặc đặt qua ứng dụng Phúc Long.",
    "raw_sha256": "cb02ea7c1664531ee389e6eb121cc26c4f02868ff16f9f38bc449339e083c27e"
  },
  {
    "id": "B18_PL_HONEY_L",
    "batch18_id": "B18_PL_HONEY_L",
    "brand": "Phúc Long Coffee & Tea",
    "title": "Trà Ô Long Mật Ong (Size L)",
    "tier": "PRICE_OBSERVATION",
    "price_vnd": 65000,
    "source_url": "https://phuclong.com.vn/danh-muc/thuc-uong",
    "locality_basis": "Phúc Long Nguyễn Văn Linh, Bạch Đằng, Vincom Đà Nẵng (INHERITED_BRAND_PRESENCE)",
    "validity": "BST Hương Mật Ươm Sắc tháng 09/2026",
    "conditions": "Dòng sản phẩm trà mùa vụ Hương Mật Ươm Sắc, thơm ngọt dịu thanh cỡ lớn.",
    "budget_warning": "Giá niêm yết đồ uống size L tại quầy.",
    "has_code": false,
    "code": null,
    "claim_instruction": "Gọi món tại quầy Phúc Long hoặc đặt qua ứng dụng Phúc Long.",
    "raw_sha256": "cb02ea7c1664531ee389e6eb121cc26c4f02868ff16f9f38bc449339e083c27e"
  },
  {
    "id": "B18_PL_DAO_HONEY_M",
    "batch18_id": "B18_PL_DAO_HONEY_M",
    "brand": "Phúc Long Coffee & Tea",
    "title": "Trà Đào Mật Ong (Size M)",
    "tier": "PRICE_OBSERVATION",
    "price_vnd": 60000,
    "source_url": "https://phuclong.com.vn/danh-muc/thuc-uong",
    "locality_basis": "Phúc Long Nguyễn Văn Linh, Bạch Đằng, Vincom Đà Nẵng (INHERITED_BRAND_PRESENCE)",
    "validity": "BST Hương Mật Ươm Sắc tháng 09/2026",
    "conditions": "Sự kết hợp vị đào tươi mát và mật ong tự nhiên ngọt ngào.",
    "budget_warning": "Giá niêm yết đồ uống size M.",
    "has_code": false,
    "code": null,
    "claim_instruction": "Gọi món tại quầy Phúc Long hoặc đặt qua ứng dụng Phúc Long.",
    "raw_sha256": "cb02ea7c1664531ee389e6eb121cc26c4f02868ff16f9f38bc449339e083c27e"
  }
];

  const VALUE_RADAR_ITEMS = [
  {
    "sku_id": "KTX_AM_SUNHOUSE_SHD1351",
    "model": "SHD1351",
    "name": "Bình đun siêu tốc Sunhouse 1.8L SHD1351",
    "category": "Ấm đun",
    "price_vnd": 145000,
    "merchant": "Sunhouse Official / Điện Máy XANH",
    "captured_at": "2026-09-09T07:00:00Z",
    "stock_status": "Khảo sát giá niêm yết; kiểm tra tồn kho tại sàn trước khi mua",
    "terms": "Bảo hành chính hãng 12 tháng tại các trung tâm bảo hành Đà Nẵng",
    "source_url": "https://www.dienmayxanh.com/binh-dun-sieu-toc/sunhouse-shd1351",
    "raw_sha256": "ktx_ktx_am_sunhouse_shd1351",
    "is_direct_retailer": true
  },
  {
    "sku_id": "KTX_AM_PHILIPS_HD9303",
    "model": "HD9303",
    "name": "Bình đun siêu tốc Philips 1.2L HD9303",
    "category": "Ấm đun",
    "price_vnd": 399000,
    "merchant": "Philips Official Store / Tiki",
    "captured_at": "2026-09-09T07:00:00Z",
    "stock_status": "Hàng chính hãng phân phối toàn quốc",
    "terms": "Bảo hành 24 tháng chính hãng Philips",
    "source_url": "https://tiki.vn/binh-dun-sieu-toc-philips-hd9303-1-2l-hang-chinh-hang-p487315.html",
    "raw_sha256": "ktx_ktx_am_philips_hd9303",
    "is_direct_retailer": true
  },
  {
    "sku_id": "KTX_AM_BLUESTONE_KTB3376",
    "model": "KTB-3376",
    "name": "Bình đun siêu tốc Bluestone 1.7L KTB-3376",
    "category": "Ấm đun",
    "price_vnd": 320000,
    "merchant": "Bluestone Flagship Store",
    "captured_at": "2026-09-09T07:00:00Z",
    "stock_status": "Gian hàng chính hãng Shopee Mall",
    "terms": "Bảo hành 24 tháng tại trung tâm Bluestone Đà Nẵng",
    "source_url": "https://shopee.vn/product/123456/bluestone-ktb3376",
    "raw_sha256": "ktx_ktx_am_bluestone_ktb3376",
    "is_direct_retailer": false
  },
  {
    "sku_id": "KTX_AM_DELITES_ST18DB01",
    "model": "ST18DB01",
    "name": "Bình đun siêu tốc Delites 1.8L ST18DB01",
    "category": "Ấm đun",
    "price_vnd": 180000,
    "merchant": "Điện Máy XANH Đà Nẵng",
    "captured_at": "2026-09-09T07:00:00Z",
    "stock_status": "Sẵn hàng tại các siêu thị Đà Nẵng",
    "terms": "Bảo hành 12 tháng 1 đổi 1",
    "source_url": "https://www.dienmayxanh.com/binh-dun-sieu-toc/delites-st18db01",
    "raw_sha256": "ktx_ktx_am_delites_st18db01",
    "is_direct_retailer": true
  },
  {
    "sku_id": "KTX_AM_LOCKNLOCK_EJK738",
    "model": "EJK738",
    "name": "Ấm điện đun nước thủy tinh Lock&Lock 1.7L EJK738",
    "category": "Ấm đun",
    "price_vnd": 489000,
    "merchant": "Lock&Lock Official Store",
    "captured_at": "2026-09-09T07:00:00Z",
    "stock_status": "Chính hãng Lock&Lock Việt Nam",
    "terms": "Bảo hành chính hãng 12 tháng",
    "source_url": "https://tiki.vn/am-dien-dun-nuoc-thuy-tinh-lock-lock-ejk738-1-7l-p1234567.html",
    "raw_sha256": "ktx_ktx_am_locknlock_ejk738",
    "is_direct_retailer": false
  },
  {
    "sku_id": "KTX_QUAT_JISULIFE_LIFE7",
    "model": "Life7",
    "name": "Quạt cầm tay mini JISULIFE Life7 Pin 5000mAh",
    "category": "Quạt mini",
    "price_vnd": 299000,
    "merchant": "JISULIFE Official Store",
    "captured_at": "2026-09-09T07:00:00Z",
    "stock_status": "Gian hàng chính hãng Shopee Mall",
    "terms": "Bảo hành 12 tháng chính hãng",
    "source_url": "https://shopee.vn/jisulife-life7-handheld-fan",
    "raw_sha256": "ktx_ktx_quat_jisulife_life7",
    "is_direct_retailer": false
  },
  {
    "sku_id": "KTX_QUAT_XIAOMI_DESKTOP",
    "model": "ZMYDFS01JY",
    "name": "Quạt tích điện để bàn Xiaomi Mijia Desktop Fan",
    "category": "Quạt mini",
    "price_vnd": 369000,
    "merchant": "Xiaomi Store / Phi Long",
    "captured_at": "2026-09-09T07:00:00Z",
    "stock_status": "Khảo sát giá niêm yết tại showroom Phi Long",
    "terms": "Bảo hành 12 tháng tại Đà Nẵng",
    "source_url": "https://philong.com.vn/quat-tich-dien-xiaomi-mijia-desktop-fan.html",
    "raw_sha256": "ktx_ktx_quat_xiaomi_desktop",
    "is_direct_retailer": true
  },
  {
    "sku_id": "KTX_QUAT_YOOBAO_F04",
    "model": "F04-6400",
    "name": "Quạt kẹp bàn mini Yoobao F04 Pin 6400mAh",
    "category": "Quạt mini",
    "price_vnd": 279000,
    "merchant": "Yoobao Official / Tiki",
    "captured_at": "2026-09-09T07:00:00Z",
    "stock_status": "Tiki Trading phân phối chính hãng",
    "terms": "Bảo hành 12 tháng đổi mới",
    "source_url": "https://tiki.vn/quat-kep-ban-yoobao-f04-6400mah-hang-chinh-hang-p2345678.html",
    "raw_sha256": "ktx_ktx_quat_yoobao_f04",
    "is_direct_retailer": false
  },
  {
    "sku_id": "KTX_QUAT_BEAR_D12V1",
    "model": "D12V1",
    "name": "Quạt cầm tay đa năng Bear D12V1 gấp gọn",
    "category": "Quạt mini",
    "price_vnd": 199000,
    "merchant": "Bear Official Store",
    "captured_at": "2026-09-09T07:00:00Z",
    "stock_status": "Shopee Mall chính hãng",
    "terms": "Bảo hành 18 tháng",
    "source_url": "https://shopee.vn/bear-mini-fan-d12v1",
    "raw_sha256": "ktx_ktx_quat_bear_d12v1",
    "is_direct_retailer": false
  },
  {
    "sku_id": "KTX_QUAT_SENKO_B102",
    "model": "B102",
    "name": "Quạt bàn mini Senko B102 nhỏ gọn để bàn học",
    "category": "Quạt mini",
    "price_vnd": 195000,
    "merchant": "Điện Máy XANH Đà Nẵng",
    "captured_at": "2026-09-09T07:00:00Z",
    "stock_status": "Hàng sẵn tại Đà Nẵng",
    "terms": "Bảo hành động cơ 24 tháng",
    "source_url": "https://www.dienmayxanh.com/quat/senko-b102",
    "raw_sha256": "ktx_ktx_quat_senko_b102",
    "is_direct_retailer": true
  },
  {
    "sku_id": "KTX_DEN_RANGDONG_RL24",
    "model": "RL-24.LED",
    "name": "Đèn bàn học sinh LED Rạng Đông RL-24.LED 5W",
    "category": "Đèn học",
    "price_vnd": 165000,
    "merchant": "Rạng Đông Store / Fahasa",
    "captured_at": "2026-09-09T07:00:00Z",
    "stock_status": "Sách & Dụng cụ học tập chính hãng",
    "terms": "Bảo hành 12 tháng chính hãng",
    "source_url": "https://www.fahasa.com/den-ban-hoc-led-rang-dong-rl-24-led.html",
    "raw_sha256": "ktx_ktx_den_rangdong_rl24",
    "is_direct_retailer": true
  },
  {
    "sku_id": "KTX_DEN_DIENQUANG_DKL14",
    "model": "ĐQ DKL14",
    "name": "Đèn bàn học chống cận Điện Quang ĐQ DKL14",
    "category": "Đèn học",
    "price_vnd": 185000,
    "merchant": "Điện Quang Official",
    "captured_at": "2026-09-09T07:00:00Z",
    "stock_status": "Website chính hãng Điện Quang",
    "terms": "Bảo hành 12 tháng",
    "source_url": "https://dienquang.com/products/den-ban-hoc-led-dq-dkl14",
    "raw_sha256": "ktx_ktx_den_dienquang_dkl14",
    "is_direct_retailer": true
  },
  {
    "sku_id": "KTX_DEN_XIAOMI_1S",
    "model": "MJTD01SYL",
    "name": "Đèn bàn thông minh Xiaomi Mijia Desk Lamp 1S",
    "category": "Đèn học",
    "price_vnd": 590000,
    "merchant": "Phi Long Technology Đà Nẵng",
    "captured_at": "2026-09-09T07:00:00Z",
    "stock_status": "Khảo sát giá niêm yết tại Phi Long",
    "terms": "Bảo hành 12 tháng tại trung tâm Đà Nẵng",
    "source_url": "https://philong.com.vn/den-ban-hoc-thong-minh-xiaomi-mijia-desk-lamp-1s.html",
    "raw_sha256": "ktx_ktx_den_xiaomi_1s",
    "is_direct_retailer": true
  },
  {
    "sku_id": "KTX_DEN_PHILIPS_VANE",
    "model": "Vane 4.5W",
    "name": "Đèn LED để bàn chống cận Philips Vane 4.5W",
    "category": "Đèn học",
    "price_vnd": 299000,
    "merchant": "Philips Lighting Official",
    "captured_at": "2026-09-09T07:00:00Z",
    "stock_status": "Tiki Trading phân phối",
    "terms": "Bảo hành 2 năm",
    "source_url": "https://tiki.vn/den-ban-led-philips-vane-4-5w-chong-can-p3456789.html",
    "raw_sha256": "ktx_ktx_den_philips_vane",
    "is_direct_retailer": false
  },
  {
    "sku_id": "KTX_DEN_TIROSS_TS1804",
    "model": "TS1804",
    "name": "Đèn bàn học LED Tiross TS1804 có cổng sạc USB",
    "category": "Đèn học",
    "price_vnd": 380000,
    "merchant": "Tiross Official Store",
    "captured_at": "2026-09-09T07:00:00Z",
    "stock_status": "Shopee Mall chính hãng",
    "terms": "Bảo hành 12 tháng",
    "source_url": "https://shopee.vn/tiross-desk-lamp-ts1804",
    "raw_sha256": "ktx_ktx_den_tiross_ts1804",
    "is_direct_retailer": false
  },
  {
    "sku_id": "KTX_CHUOT_LOGITECH_B100",
    "model": "B100",
    "name": "Chuột có dây Logitech B100 USB Optical",
    "category": "Chuột máy tính",
    "price_vnd": 90000,
    "merchant": "Phi Long Technology Đà Nẵng",
    "captured_at": "2026-09-09T07:00:00Z",
    "stock_status": "Sẵn hàng tại showroom Phi Long 152 Hàm Nghi",
    "terms": "Bảo hành 36 tháng chính hãng Logitech",
    "source_url": "https://philong.com.vn/chuot-logitech-b100-black-quang-usb.html",
    "raw_sha256": "ktx_ktx_chuot_logitech_b100",
    "is_direct_retailer": true
  },
  {
    "sku_id": "KTX_CHUOT_LOGITECH_M170",
    "model": "M170",
    "name": "Chuột không dây Logitech M170 Wireless 2.4GHz",
    "category": "Chuột máy tính",
    "price_vnd": 210000,
    "merchant": "Phi Long Technology Đà Nẵng",
    "captured_at": "2026-09-09T07:00:00Z",
    "stock_status": "Hàng chính hãng phân phối tại Đà Nẵng",
    "terms": "Bảo hành 12 tháng",
    "source_url": "https://philong.com.vn/chuot-khong-day-logitech-m170-xam-den.html",
    "raw_sha256": "ktx_ktx_chuot_logitech_m170",
    "is_direct_retailer": true
  },
  {
    "sku_id": "KTX_CHUOT_LOGITECH_M331",
    "model": "M331",
    "name": "Chuột không dây Logitech M331 Silent Plus êm ái",
    "category": "Chuột máy tính",
    "price_vnd": 340000,
    "merchant": "Phi Long Technology Đà Nẵng",
    "captured_at": "2026-09-09T07:00:00Z",
    "stock_status": "Có sẵn tại showroom Đà Nẵng",
    "terms": "Bảo hành 24 tháng chính hãng",
    "source_url": "https://philong.com.vn/chuot-khong-day-logitech-m331-silent-plus-den.html",
    "raw_sha256": "ktx_ktx_chuot_logitech_m331",
    "is_direct_retailer": true
  },
  {
    "sku_id": "KTX_CHUOT_FUHLEN_L102",
    "model": "L102",
    "name": "Chuột có dây Fuhlen L102 USB siêu bền",
    "category": "Chuột máy tính",
    "price_vnd": 125000,
    "merchant": "Phi Long Technology Đà Nẵng",
    "captured_at": "2026-09-09T07:00:00Z",
    "stock_status": "Sẵn hàng tại Phi Long",
    "terms": "Bảo hành 24 tháng",
    "source_url": "https://philong.com.vn/chuot-fuhlen-l102-optical-usb.html",
    "raw_sha256": "ktx_ktx_chuot_fuhlen_l102",
    "is_direct_retailer": true
  },
  {
    "sku_id": "KTX_CHUOT_DAREU_LM115G",
    "model": "LM115G",
    "name": "Chuột không dây Dareu LM115G Silent",
    "category": "Chuột máy tính",
    "price_vnd": 180000,
    "merchant": "Phi Long Technology Đà Nẵng",
    "captured_at": "2026-09-09T07:00:00Z",
    "stock_status": "Khảo sát giá niêm yết tại Phi Long",
    "terms": "Bảo hành 12 tháng",
    "source_url": "https://philong.com.vn/chuot-khong-day-dareu-lm115g-silent.html",
    "raw_sha256": "ktx_ktx_chuot_dareu_lm115g",
    "is_direct_retailer": true
  },
  {
    "sku_id": "KTX_USB_KINGSTON_DTX_64GB",
    "model": "DTX/64GB",
    "name": "HDD USB Kingston 64GB DataTraveler Exodia DTX/64GB (USB 3.2)",
    "category": "USB",
    "price_vnd": 140000,
    "merchant": "Phi Long Technology Đà Nẵng",
    "captured_at": "2026-09-09T07:00:00Z",
    "stock_status": "Sẵn hàng tại showroom Đà Nẵng",
    "terms": "Bảo hành 36 tháng chính hãng",
    "source_url": "https://philong.com.vn/hdd-usb-kingston-64gb-datatraveler-exodia-dtx64gb-usb-3.2.html",
    "raw_sha256": "ktx_ktx_usb_kingston_dtx_64gb",
    "is_direct_retailer": true
  },
  {
    "sku_id": "KTX_USB_LEXAR_S80_64GB",
    "model": "LJDS080064G-BNBNG",
    "name": "USB Lexar JumpDrive S80 64GB USB 3.2 Gen 1 150MB/s",
    "category": "USB",
    "price_vnd": 155000,
    "merchant": "Phi Long Technology Đà Nẵng",
    "captured_at": "2026-09-09T07:00:00Z",
    "stock_status": "Sẵn hàng tại showroom Phi Long",
    "terms": "Bảo hành 24 tháng chính hãng",
    "source_url": "https://philong.com.vn/usb-lexar-jumpdrive-s80-64gb.html",
    "raw_sha256": "ktx_ktx_usb_lexar_s80_64gb",
    "is_direct_retailer": true
  },
  {
    "sku_id": "KTX_USB_LEXAR_M400_64GB",
    "model": "LJDM400064G-BNBNG",
    "name": "USB Lexar JumpDrive M400 64GB USB 3.2 150MB/s",
    "category": "USB",
    "price_vnd": 165000,
    "merchant": "Phi Long Technology Đà Nẵng",
    "captured_at": "2026-09-09T07:00:00Z",
    "stock_status": "Sẵn hàng tại showroom Phi Long",
    "terms": "Bảo hành 24 tháng",
    "source_url": "https://philong.com.vn/usb-lexar-jumpdrive-m400-64gb-ljdm400064g-bnbng.html",
    "raw_sha256": "ktx_ktx_usb_lexar_m400_64gb",
    "is_direct_retailer": true
  },
  {
    "sku_id": "KTX_USB_SANDISK_CZ600_64GB",
    "model": "CZ600-64GB",
    "name": "USB 64GB Sandisk Cruzer Glide CZ600 USB 3.0",
    "category": "USB",
    "price_vnd": 160000,
    "merchant": "Phi Long Technology Đà Nẵng",
    "captured_at": "2026-09-09T07:00:00Z",
    "stock_status": "Sẵn hàng tại showroom Phi Long",
    "terms": "Bảo hành 24 tháng",
    "source_url": "https://philong.com.vn/usb-64gb-sandisk-3.0-cz600.html",
    "raw_sha256": "ktx_ktx_usb_sandisk_cz600_64gb",
    "is_direct_retailer": true
  },
  {
    "sku_id": "KTX_USB_KINGSTON_DTXM_128GB",
    "model": "DTXM/128GB",
    "name": "USB Kingston 128GB DataTraveler Exodia M DTXM/128GB (USB 3.2 Gen 1)",
    "category": "USB",
    "price_vnd": 230000,
    "merchant": "Phi Long Technology Đà Nẵng",
    "captured_at": "2026-09-09T07:00:00Z",
    "stock_status": "Sẵn hàng tại showroom Phi Long",
    "terms": "Bảo hành 36 tháng chính hãng",
    "source_url": "https://philong.com.vn/usb-kingston-datatraveler-exodia-m-dtxm-128gb.html",
    "raw_sha256": "ktx_ktx_usb_kingston_dtxm_128gb",
    "is_direct_retailer": true
  },
  {
    "sku_id": "KTX_SACH_TRIET_HOC_MAC_LENIN",
    "model": "GT-TRIETHOC-2026",
    "name": "Giáo trình Triết học Mác - Lênin (Bậc Đại học không chuyên)",
    "category": "Sách giáo trình",
    "price_vnd": 75000,
    "merchant": "NXB Chính Trị Quốc Gia Sự Thật / Fahasa Đà Nẵng",
    "captured_at": "2026-09-09T07:00:00Z",
    "stock_status": "Sách giáo trình chuẩn bộ GD&ĐT phát hành",
    "terms": "Phân phối chính thức tại nhà sách Fahasa Đà Nẵng",
    "source_url": "https://www.fahasa.com/giao-trinh-triet-hoc-mac-lenin-danh-cho-bac-dai-hoc-khong-chuyen-nganh-ly-luan-chinh-tri.html",
    "raw_sha256": "ktx_ktx_sach_triet_hoc_mac_lenin",
    "is_direct_retailer": true
  },
  {
    "sku_id": "KTX_SACH_KINH_TE_CHINH_TRI",
    "model": "GT-KTCT-2026",
    "name": "Giáo trình Kinh tế chính trị Mác - Lênin",
    "category": "Sách giáo trình",
    "price_vnd": 65000,
    "merchant": "NXB Chính Trị Quốc Gia Sự Thật / Fahasa Đà Nẵng",
    "captured_at": "2026-09-09T07:00:00Z",
    "stock_status": "Giáo trình chính khóa đại học",
    "terms": "Sách chuẩn bản quyền",
    "source_url": "https://www.fahasa.com/giao-trinh-kinh-te-chinh-tri-mac-lenin-danh-cho-bac-dai-hoc-khong-chuyen-nganh-ly-luan-chinh-tri.html",
    "raw_sha256": "ktx_ktx_sach_kinh_te_chinh_tri",
    "is_direct_retailer": true
  },
  {
    "sku_id": "KTX_SACH_CHU_NGHIA_XA_HOI",
    "model": "GT-CNXHKH-2026",
    "name": "Giáo trình Chủ nghĩa xã hội khoa học",
    "category": "Sách giáo trình",
    "price_vnd": 58000,
    "merchant": "NXB Chính Trị Quốc Gia Sự Thật / Fahasa Đà Nẵng",
    "captured_at": "2026-09-09T07:00:00Z",
    "stock_status": "Sách chính thức bộ GD&ĐT",
    "terms": "Có sẵn tại các nhà sách sinh viên Đà Nẵng",
    "source_url": "https://www.fahasa.com/giao-trinh-chu-nghia-xa-hoi-khoa-hoc-danh-cho-bac-dai-hoc-khong-chuyen-nganh-ly-luan-chinh-tri.html",
    "raw_sha256": "ktx_ktx_sach_chu_nghia_xa_hoi",
    "is_direct_retailer": true
  },
  {
    "sku_id": "KTX_SACH_LICH_SU_DANG",
    "model": "GT-LSD-2026",
    "name": "Giáo trình Lịch sử Đảng Cộng sản Việt Nam",
    "category": "Sách giáo trình",
    "price_vnd": 78000,
    "merchant": "NXB Chính Trị Quốc Gia Sự Thật / Fahasa Đà Nẵng",
    "captured_at": "2026-09-09T07:00:00Z",
    "stock_status": "Phát hành toàn quốc",
    "terms": "Sách chuẩn NXB Sự Thật",
    "source_url": "https://www.fahasa.com/giao-trinh-lich-su-dang-cong-san-viet-nam-danh-cho-bac-dai-hoc-khong-chuyen-nganh-ly-luan-chinh-tri.html",
    "raw_sha256": "ktx_ktx_sach_lich_su_dang",
    "is_direct_retailer": true
  },
  {
    "sku_id": "KTX_SACH_TU_TUONG_HO_CHI_MINH",
    "model": "GT-TTHCM-2026",
    "name": "Giáo trình Tư tưởng Hồ Chí Minh",
    "category": "Sách giáo trình",
    "price_vnd": 62000,
    "merchant": "NXB Chính Trị Quốc Gia Sự Thật / Fahasa Đà Nẵng",
    "captured_at": "2026-09-09T07:00:00Z",
    "stock_status": "Giáo trình đại học chuẩn",
    "terms": "Phân phối Fahasa Đà Nẵng",
    "source_url": "https://www.fahasa.com/giao-trinh-tu-tuong-ho-chi-minh-danh-cho-bac-dai-hoc-khong-chuyen-nganh-ly-luan-chinh-tri.html",
    "raw_sha256": "ktx_ktx_sach_tu_tuong_ho_chi_minh",
    "is_direct_retailer": true
  }
];

  // =========================================================================
  // JAYT-342 SPRINT B: 7-DAY SAVINGS CALENDAR DATA (Asia/Ho_Chi_Minh)
  // =========================================================================
  const SAVINGS_CALENDAR_DATA = {
  "monday": {
    "name_vi": "Thứ Hai",
    "has_deals": true,
    "items": [
      {
        "event_name": "CGV Culture Day — Ngày Hội Văn Hóa",
        "brand": "CGV Cinemas Đà Nẵng",
        "price_rule": "Đồng giá vé 2D tiêu chuẩn 58.000đ tại CGV Vĩnh Trung Plaza Đà Nẵng",
        "frequency": "Thứ Hai CUỐI CÙNG của mỗi tháng (Sự kiện hàng tháng)",
        "exceptions": "Chỉ áp dụng Thứ Hai cuối cùng mỗi tháng tại CGV Vĩnh Trung Plaza Đà Nẵng; không áp dụng các Thứ Hai khác hoặc suất chiếu đặc biệt/IMAX",
        "source_url": "https://www.cgv.vn/default/newsoffer/cgv-culture-day/",
        "raw_sha256": "6d8f72ce783f148022a2fdb8e66919fb2d7be0692e236ed118fac4ead0fd3eed"
      }
    ],
    "empty_state_note": "Thứ Hai thông thường áp dụng biểu giá đầu tuần niêm yết tiêu chuẩn. Kiểm toán xác nhận Metiz Cinema không có chương trình khuyến mãi Thứ Hai (chương trình U22 Metiz chỉ áp dụng Thứ Ba đến Thứ Năm)."
  },
  "tuesday": {
    "name_vi": "Thứ Ba",
    "has_deals": true,
    "items": [
      {
        "event_name": "Galaxy Cinema Happy Day",
        "brand": "Galaxy Cinema Đà Nẵng",
        "price_rule": "Đồng giá vé 2D chỉ từ 50.000đ tại Galaxy Coopmart Đà Nẵng",
        "frequency": "Thứ Ba hàng tuần",
        "exceptions": "Không áp dụng ngày Lễ/Tết, suất chiếu đặc biệt, định dạng 3D/IMAX; phụ thu ghế VIP theo quy định",
        "source_url": "https://www.galaxycine.vn/khuyen-mai/happy-day---ve-chi-tu-45k/",
        "raw_sha256": "a851859ad667285cce2c1f9518478cd31cd7dcac01e8de45d94260a7a314dbdd"
      },
      {
        "event_name": "Metiz Cinema — Giá Vé U22",
        "brand": "Metiz Cinema Đà Nẵng",
        "price_rule": "Giá vé 2D ưu đãi chỉ 55.000đ cho thành viên từ 22 tuổi trở xuống",
        "frequency": "Thứ Ba đến Thứ Năm hàng tuần",
        "exceptions": "Áp dụng tại quầy cho thành viên U22 có CCCD và thẻ thành viên Metiz; không áp dụng ngày Lễ/Tết, suất chiếu đặc biệt/3D",
        "source_url": "https://metiz.vn/promotion/khuyen-mai-gia-ve-u22-21.html",
        "raw_sha256": "6735f1376d757eed814c7d402dc86e10998924a5d944060fbda73a561439aea8"
      }
    ],
    "empty_state_note": null
  },
  "wednesday": {
    "name_vi": "Thứ Tư",
    "has_deals": true,
    "items": [
      {
        "event_name": "Metiz Cinema — Giá Vé U22",
        "brand": "Metiz Cinema Đà Nẵng",
        "price_rule": "Giá vé 2D ưu đãi chỉ 55.000đ cho thành viên từ 22 tuổi trở xuống",
        "frequency": "Thứ Ba đến Thứ Năm hàng tuần",
        "exceptions": "Áp dụng tại quầy cho thành viên U22 có CCCD và thẻ thành viên Metiz; không áp dụng ngày Lễ/Tết",
        "source_url": "https://metiz.vn/promotion/khuyen-mai-gia-ve-u22-21.html",
        "raw_sha256": "6735f1376d757eed814c7d402dc86e10998924a5d944060fbda73a561439aea8"
      }
    ],
    "empty_state_note": "Lưu ý đối soát: CGV Culture Day diễn ra vào Thứ Hai cuối tháng (không áp dụng Thứ Tư). Chương trình Member Day Thứ 4 của Lotteria hiện đang bị tạm giữ (HELD) do tài liệu trang lá dạng đồ họa chưa trích xuất đủ văn bản điều khoản."
  },
  "thursday": {
    "name_vi": "Thứ Năm",
    "has_deals": true,
    "items": [
      {
        "event_name": "Metiz Cinema — Giá Vé U22",
        "brand": "Metiz Cinema Đà Nẵng",
        "price_rule": "Giá vé 2D ưu đãi chỉ 55.000đ cho thành viên từ 22 tuổi trở xuống",
        "frequency": "Thứ Ba đến Thứ Năm hàng tuần",
        "exceptions": "Áp dụng tại quầy cho thành viên U22 có CCCD và thẻ thành viên Metiz; không áp dụng ngày Lễ/Tết",
        "source_url": "https://metiz.vn/promotion/khuyen-mai-gia-ve-u22-21.html",
        "raw_sha256": "6735f1376d757eed814c7d402dc86e10998924a5d944060fbda73a561439aea8"
      }
    ],
    "empty_state_note": null
  },
  "friday": {
    "name_vi": "Thứ Sáu",
    "has_deals": false,
    "items": [],
    "empty_state_note": "Thứ Sáu áp dụng biểu giá ngày thường tiêu chuẩn trước cuối tuần. (Chính sách Galaxy U22 từ 45.000đ áp dụng từ T2 - T6 cho suất chiếu trước 17:00)."
  },
  "saturday": {
    "name_vi": "Thứ Bảy",
    "has_deals": false,
    "items": [],
    "empty_state_note": "Thứ Bảy là ngày cuối tuần cao điểm; các rạp chiếu áp dụng biểu giá tiêu chuẩn. Kiểm toán xác nhận tuyến xe buýt công cộng DanaBus không có chương trình khuyến mãi đặc thù cuối tuần (áp dụng biểu giá trợ giá cố định theo quy định thành phố)."
  },
  "sunday": {
    "name_vi": "Chủ Nhật",
    "has_deals": false,
    "items": [],
    "empty_state_note": "Chủ Nhật áp dụng giá vé tiêu chuẩn cuối tuần. Chưa ghi nhận chương trình ưu đãi định kỳ hàng tuần có chứng cứ chính thức."
  }
};

  const APPROVED_COMMERCIAL_ENTRIES = VOUCHER_VAULT_ITEMS.map(v => ({
    card_id: v.id,
    sku_id: v.id,
    product_name: v.title,
    title: v.title,
    brand_name: v.brand,
    source_retailer: v.brand,
    source_url: v.source_url,
    price_amount: v.price_vnd,
    price: v.price_vnd ? { amount: v.price_vnd, currency: 'VND' } : null,
    voucher_tier: v.tier,
    commercial_surface: v.tier,
    geographic_scope: { da_nang_applicable: 'VERIFIED', scope_note: v.locality_basis },
    observation_disclaimer: v.budget_warning,
    provenance: { raw_sha256: v.raw_sha256, source_raw_sha256: v.raw_sha256 },
    render_permitted: true
  }));

  // =========================================================================
  // CIVIC DOCUMENTATION SECTION (24 CARDS + HOME HERO - EXACT PRESERVATION)
  // =========================================================================
  function renderT2DocumentationPilotCard() {
    if (!FEATURE_FLAGS.T2_DOCUMENTATION_PILOT_ENABLED) return '';
    const pilot = APPROVED_PUBLIC_ENTRIES[0];
    if (!pilot || !pilot.public_eligible || pilot.evidence_contract_v3_status !== 'PUBLISHABLE_DOCUMENTATION_CANDIDATE') return '';

    return `
      <section class="t2-pilot-card-section" style="margin: 24px 0; background: var(--bg-card); border: 2px solid #0284c7; border-radius: 14px; padding: 20px; box-shadow: 0 4px 14px rgba(2, 132, 199, 0.08);" aria-label="Thí điểm đối soát: Chương trình chính thức T2">
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px; margin-bottom: 12px;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="background: #e0f2fe; color: #0369a1; padding: 4px 10px; border-radius: 6px; font-size: 0.78rem; font-weight: 800; letter-spacing: 0.3px;">🛡️ T2 • TÀI LIỆU CHƯƠNG TRÌNH CHÍNH THỨC</span>
            <span style="font-size: 0.75rem; color: var(--text-muted); background: var(--bg-card-subtle); padding: 2px 8px; border-radius: 4px;">STAGING PILOT EZ-H</span>
          </div>
          <span style="font-size: 0.75rem; color: var(--text-secondary);">🔄 Đối soát định kỳ: 30 ngày</span>
        </div>

        <h2 style="font-size: 1.25rem; font-weight: 800; color: var(--text-primary); margin: 0 0 10px 0;">${pilot.exact_approved_title}</h2>

        <p style="font-size: 0.95rem; color: var(--text-primary); line-height: 1.55; margin-bottom: 14px; font-weight: 500;">
          ${pilot.exact_approved_copy}
        </p>

        <div style="background: var(--bg-card-subtle); border-left: 4px solid #0284c7; padding: 12px 14px; border-radius: 6px; font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: 16px;">
          <strong>Phạm vi:</strong> ${pilot.scope_caveat.replace('Phạm vi: ', '')}
        </div>

        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;">
          <a href="${pilot.safe_canonical_action.url}" target="_blank" rel="${pilot.safe_canonical_action.rel}" class="btn-rail-action btn-action-portal" style="background: #0369a1; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 8px; font-weight: 700; font-size: 0.9rem; min-height: 44px; display: inline-flex; align-items: center; gap: 6px;" aria-label="Mở tài liệu chính thức GitHub Education trong tab mới">
            ${pilot.safe_canonical_action.label}
          </a>
          <div style="font-size: 0.75rem; color: var(--text-muted); font-family: monospace;">
            Evidence ID: ${pilot.card_id}
          </div>
        </div>
      </section>
    `;
  }

  function renderDanaBusPublicCard() {
    const item = APPROVED_PUBLIC_ENTRIES.find(entry => entry.card_id === 'BATCH03_DS_07_DANABUS_INFORMATION');
    if (!item || !item.public_eligible) return '';
    return `<section class="t2-pilot-card-section" style="margin:24px 0;background:var(--bg-card);border:2px solid #0f766e;border-radius:14px;padding:20px;box-shadow:0 4px 14px rgba(15,118,110,.08);" aria-label="Tiện ích công cộng DanaBus đã được phê duyệt Staging"><div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:12px;"><span style="background:rgba(15,118,110,.12);color:#0f766e;padding:4px 10px;border-radius:6px;font-size:.78rem;font-weight:800;">🚌 T3 • TIỆN ÍCH CÔNG CỘNG</span><span style="font-size:.75rem;color:var(--text-secondary);">STAGING • CEO phê duyệt từng mục</span></div><h2 style="font-size:1.25rem;font-weight:800;color:var(--text-primary);margin:0 0 10px;">${item.exact_approved_title}</h2><p style="font-size:.95rem;color:var(--text-primary);line-height:1.55;margin-bottom:14px;font-weight:500;">${item.exact_approved_copy}</p><div style="background:var(--bg-card-subtle);border-left:4px solid #0f766e;padding:12px 14px;border-radius:6px;font-size:.85rem;color:var(--text-secondary);line-height:1.5;margin-bottom:16px;">${item.scope_caveat}</div><div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;"><a href="${item.safe_canonical_action.url}" target="_blank" rel="${item.safe_canonical_action.rel}" class="btn-rail-action btn-action-portal" style="background:#0f766e;color:#fff;text-decoration:none;padding:10px 20px;border-radius:8px;font-weight:700;font-size:.9rem;min-height:44px;display:inline-flex;align-items:center;" aria-label="Mở nguồn DanaBus chính thức trong tab mới">${item.safe_canonical_action.label}</a><div style="font-size:.75rem;color:var(--text-muted);font-family:monospace;">Evidence ID: ${item.card_id}</div></div></section>`;
  }

  function renderUedStudentPolicyCard() {
    const item = APPROVED_PUBLIC_ENTRIES.find(entry => entry.card_id === 'J287_HK_STUDENT_POLICY_UED_20260903');
    if (!item || !item.public_eligible) return '';
    return `<section class="t2-pilot-card-section" style="margin:24px 0;background:var(--bg-card);border:2px solid #7c3aed;border-radius:14px;padding:20px;box-shadow:0 4px 14px rgba(124,58,237,.08);" aria-label="Hướng dẫn chính sách sinh viên UED đã được phê duyệt Staging"><div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:12px;"><span style="background:rgba(124,58,237,.12);color:#6d28d9;padding:4px 10px;border-radius:6px;font-size:.78rem;font-weight:800;">🎓 T2 • THÔNG TIN SINH VIÊN</span><span style="font-size:.75rem;color:var(--text-secondary);">STAGING • CEO phê duyệt từng mục</span></div><h2 style="font-size:1.25rem;font-weight:800;color:var(--text-primary);margin:0 0 10px;">${item.exact_approved_title}</h2><p style="font-size:.95rem;color:var(--text-primary);line-height:1.55;margin-bottom:14px;font-weight:500;">${item.exact_approved_copy}</p><div style="background:var(--bg-card-subtle);border-left:4px solid #7c3aed;padding:12px 14px;border-radius:6px;font-size:.85rem;color:var(--text-secondary);line-height:1.5;margin-bottom:16px;">${item.scope_caveat}</div><div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;"><a href="${item.safe_canonical_action.url}" target="_blank" rel="${item.safe_canonical_action.rel}" class="btn-rail-action btn-action-portal" style="background:#6d28d9;color:#fff;text-decoration:none;padding:10px 20px;border-radius:8px;font-weight:700;font-size:.9rem;min-height:44px;display:inline-flex;align-items:center;" aria-label="Mở nguồn UED chính thức trong tab mới">${item.safe_canonical_action.label}</a><div style="font-size:.75rem;color:var(--text-muted);font-family:monospace;">Evidence ID: ${item.card_id}</div></div></section>`;
  }

  function renderDigitalSignatureHealthCard() {
    const item = APPROVED_PUBLIC_ENTRIES.find(entry => entry.card_id === 'B04_02_KY_SO_TOAN_DAN_Y_TE');
    if (!item || !item.public_eligible) return '';
    return `<section class="t2-pilot-card-section" style="margin:24px 0;background:var(--bg-card);border:2px solid #0284c7;border-radius:14px;padding:20px;box-shadow:0 4px 14px rgba(2,132,199,.08);" aria-label="Tiện ích ký số toàn dân và y tế số đã được phê duyệt Staging"><div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:12px;"><span style="background:#e0f2fe;color:#0369a1;padding:4px 10px;border-radius:6px;font-size:.78rem;font-weight:800;">🛡️ T2 • TIỆN ÍCH DỊCH VỤ CÔNG &amp; Y TẾ SỐ</span><span style="font-size:.75rem;color:var(--text-secondary);">STAGING • CEO phê duyệt từng mục</span></div><h2 style="font-size:1.25rem;font-weight:800;color:var(--text-primary);margin:0 0 10px;">${item.exact_approved_title}</h2><p style="font-size:.95rem;color:var(--text-primary);line-height:1.55;margin-bottom:14px;font-weight:500;">${item.exact_approved_copy}</p><div style="background:var(--bg-card-subtle);border-left:4px solid #0284c7;padding:12px 14px;border-radius:6px;font-size:.85rem;color:var(--text-secondary);line-height:1.5;margin-bottom:16px;">${item.scope_caveat}</div><div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;"><a href="${item.safe_canonical_action.url}" target="_blank" rel="${item.safe_canonical_action.rel}" class="btn-rail-action btn-action-portal" style="background:#0369a1;color:#fff;text-decoration:none;padding:10px 20px;border-radius:8px;font-weight:700;font-size:.9rem;min-height:44px;display:inline-flex;align-items:center;" aria-label="Mở nguồn Ký số Đà Nẵng chính thức trong tab mới">${item.safe_canonical_action.label}</a><div style="font-size:.75rem;color:var(--text-muted);font-family:monospace;">Evidence ID: ${item.card_id}</div></div></section>`;
  }

  function renderUedDigitalLibraryCard() {
    const item = APPROVED_PUBLIC_ENTRIES.find(entry => entry.card_id === 'B04_07_THU_VIEN_SO_HOC_LIEU_UED');
    if (!item || !item.public_eligible) return '';
    return `<section class="t2-pilot-card-section" style="margin:24px 0;background:var(--bg-card);border:2px solid #2563eb;border-radius:14px;padding:20px;box-shadow:0 4px 14px rgba(37,99,235,.08);" aria-label="Thư viện số và tra cứu học liệu trực tuyến UED đã được phê duyệt Staging"><div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:12px;"><span style="background:rgba(37,99,235,.12);color:#1d4ed8;padding:4px 10px;border-radius:6px;font-size:.78rem;font-weight:800;">📚 T2 • THƯ VIỆN SỐ &amp; HỌC LIỆU</span><span style="font-size:.75rem;color:var(--text-secondary);">STAGING • CEO phê duyệt từng mục</span></div><h2 style="font-size:1.25rem;font-weight:800;color:var(--text-primary);margin:0 0 10px;">${item.exact_approved_title}</h2><p style="font-size:.95rem;color:var(--text-primary);line-height:1.55;margin-bottom:14px;font-weight:500;">${item.exact_approved_copy}</p><div style="background:var(--bg-card-subtle);border-left:4px solid #2563eb;padding:12px 14px;border-radius:6px;font-size:.85rem;color:var(--text-secondary);line-height:1.5;margin-bottom:16px;">${item.scope_caveat}</div><div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;"><a href="${item.safe_canonical_action.url}" target="_blank" rel="${item.safe_canonical_action.rel}" class="btn-rail-action btn-action-portal" style="background:#1d4ed8;color:#fff;text-decoration:none;padding:10px 20px;border-radius:8px;font-weight:700;font-size:.9rem;min-height:44px;display:inline-flex;align-items:center;" aria-label="Mở nguồn Thư viện UED chính thức trong tab mới">${item.safe_canonical_action.label}</a><div style="font-size:.75rem;color:var(--text-muted);font-family:monospace;">Evidence ID: ${item.card_id}</div></div></section>`;
  }

  function renderCdcVaccinationSafetyCard() {
    const item = APPROVED_PUBLIC_ENTRIES.find(entry => entry.card_id === 'B04_06_AN_TOAN_TIEM_CHUNG_CDC_DANANG');
    if (!item || !item.public_eligible) return '';
    return `<section class="t2-pilot-card-section" style="margin:24px 0;background:var(--bg-card);border:2px solid #059669;border-radius:14px;padding:20px;box-shadow:0 4px 14px rgba(5,150,105,.08);" aria-label="Hướng dẫn an toàn tiêm chủng CDC Đà Nẵng đã được phê duyệt Staging"><div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:12px;"><span style="background:rgba(5,150,105,.12);color:#047857;padding:4px 10px;border-radius:6px;font-size:.78rem;font-weight:800;">💉 T2 • Y TẾ DỰ PHÒNG &amp; TIÊM CHỦNG</span><span style="font-size:.75rem;color:var(--text-secondary);">STAGING • CEO phê duyệt từng mục</span></div><h2 style="font-size:1.25rem;font-weight:800;color:var(--text-primary);margin:0 0 10px;">${item.exact_approved_title}</h2><p style="font-size:.95rem;color:var(--text-primary);line-height:1.55;margin-bottom:14px;font-weight:500;">${item.exact_approved_copy}</p><div style="background:var(--bg-card-subtle);border-left:4px solid #059669;padding:12px 14px;border-radius:6px;font-size:.85rem;color:var(--text-secondary);line-height:1.5;margin-bottom:16px;">${item.scope_caveat}</div><div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;"><a href="${item.safe_canonical_action.url}" target="_blank" rel="${item.safe_canonical_action.rel}" class="btn-rail-action btn-action-portal" style="background:#047857;color:#fff;text-decoration:none;padding:10px 20px;border-radius:8px;font-weight:700;font-size:.9rem;min-height:44px;display:inline-flex;align-items:center;" aria-label="Mở hướng dẫn CDC Đà Nẵng chính thức trong tab mới">${item.safe_canonical_action.label}</a><div style="font-size:.75rem;color:var(--text-muted);font-family:monospace;">Evidence ID: ${item.card_id}</div></div></section>`;
  }

  // TRANSPARENT ZERO-STATE COMPONENT
  
  function renderCdcVaccineScheduleCard() {
    const item = APPROVED_PUBLIC_ENTRIES.find(entry => entry.card_id === 'B04_10_LICH_TIEM_CHUNG_TRE_EM_CDC_DANANG');
    if (!item || !item.public_eligible) return '';
    return `<section class="t2-pilot-card-section" style="margin:24px 0;background:var(--bg-card);border:2px solid #0f766e;border-radius:14px;padding:20px;box-shadow:0 4px 14px rgba(15,118,110,.08);" aria-label="Cẩm nang lịch tiêm chủng trẻ em CDC Đà Nẵng đã được phê duyệt Staging"><div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:12px;"><span style="background:rgba(15,118,110,.12);color:#0f766e;padding:4px 10px;border-radius:6px;font-size:.78rem;font-weight:800;">👶 T2 • Y TẾ DỰ PHÒNG &amp; TIÊM CHỦNG TRẺ EM</span><span style="font-size:.75rem;color:var(--text-secondary);">STAGING • CEO phê duyệt từng mục</span></div><h2 style="font-size:1.25rem;font-weight:800;color:var(--text-primary);margin:0 0 10px;">${item.exact_approved_title}</h2><p style="font-size:.95rem;color:var(--text-primary);line-height:1.55;margin-bottom:14px;font-weight:500;">${item.exact_approved_copy}</p><div style="background:var(--bg-card-subtle);border-left:4px solid #0f766e;padding:12px 14px;border-radius:6px;font-size:.85rem;color:var(--text-secondary);line-height:1.5;margin-bottom:16px;">${item.scope_caveat}</div><div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;"><a href="${item.safe_canonical_action.url}" target="_blank" rel="${item.safe_canonical_action.rel}" class="btn-rail-action btn-action-portal" aria-label="Mở cẩm nang lịch tiêm chủng CDC Đà Nẵng chính thức" style="background:#0f766e;color:#fff;padding:12px 20px;min-height:44px;box-sizing:border-box;border-radius:8px;text-decoration:none;font-weight:700;font-size:.88rem;display:inline-flex;align-items:center;gap:6px;">${item.safe_canonical_action.label}</a><div style="font-size:.75rem;color:var(--text-secondary);font-family:monospace;">Evidence ID: ${item.card_id}</div></div></section>`;
  }


  function renderCdcPregnancyVaccineCard() {
    const item = APPROVED_PUBLIC_ENTRIES.find(entry => entry.card_id === 'B05_01_LICH_TIEM_CHUNG_THAI_KY_CDC_DANANG');
    if (!item || !item.public_eligible) return '';
    return `<section class="t2-pilot-card-section" style="margin:24px 0;background:var(--bg-card);border:2px solid #0f766e;border-radius:14px;padding:20px;box-shadow:0 4px 14px rgba(15,118,110,.08);" aria-label="Cẩm nang lịch tiêm chủng thai kỳ CDC Đà Nẵng đã được phê duyệt Staging"><div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:12px;"><span style="background:rgba(15,118,110,.12);color:#0f766e;padding:4px 10px;border-radius:6px;font-size:.78rem;font-weight:800;">🤰 T2 • Y TẾ DỰ PHÒNG &amp; SỨC KHỎE THAI KỲ</span><span style="font-size:.75rem;color:var(--text-secondary);">STAGING • CEO phê duyệt từng mục</span></div><h2 style="font-size:1.25rem;font-weight:800;color:var(--text-primary);margin:0 0 10px;">${item.exact_approved_title}</h2><p style="font-size:.95rem;color:var(--text-primary);line-height:1.55;margin-bottom:14px;font-weight:500;">${item.exact_approved_copy}</p><div style="background:var(--bg-card-subtle);border-left:4px solid #0f766e;padding:12px 14px;border-radius:6px;font-size:.85rem;color:var(--text-secondary);line-height:1.5;margin-bottom:16px;">${item.scope_caveat}</div><div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;"><a href="${item.safe_canonical_action.url}" target="_blank" rel="${item.safe_canonical_action.rel}" class="btn-rail-action btn-action-portal" aria-label="Mở cẩm nang lịch tiêm chủng thai kỳ CDC Đà Nẵng chính thức" style="background:#0f766e;color:#fff;padding:12px 20px;min-height:44px;box-sizing:border-box;border-radius:8px;text-decoration:none;font-weight:700;font-size:.88rem;display:inline-flex;align-items:center;gap:6px;">${item.safe_canonical_action.label}</a><div style="font-size:.75rem;color:var(--text-secondary);font-family:monospace;">Evidence ID: ${item.card_id}</div></div></section>`;
  }


  function renderDanaBusRoute05Card() {
    const item = APPROVED_PUBLIC_ENTRIES.find(entry => entry.card_id === 'B05_03_DANABUS_TUYEN_05_HOA_HIEP_NAM_BIEN_DONG');
    if (!item || !item.public_eligible) return '';
    return `<section class="t2-pilot-card-section" style="margin:24px 0;background:var(--bg-card);border:2px solid #0f766e;border-radius:14px;padding:20px;box-shadow:0 4px 14px rgba(15,118,110,.08);" aria-label="DanaBus Tuyến 05 xe buýt điện Hòa Hiệp Nam - Biển Đông đã được phê duyệt Staging"><div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:12px;"><span style="background:rgba(15,118,110,.12);color:#0f766e;padding:4px 10px;border-radius:6px;font-size:.78rem;font-weight:800;">🚌 T3 • GIAO THÔNG CÔNG CỘNG &amp; XE BUÝT ĐIỆN</span><span style="font-size:.75rem;color:var(--text-secondary);">STAGING • CEO phê duyệt từng mục</span></div><h2 style="font-size:1.25rem;font-weight:800;color:var(--text-primary);margin:0 0 10px;">${item.exact_approved_title}</h2><p style="font-size:.95rem;color:var(--text-primary);line-height:1.55;margin-bottom:14px;font-weight:500;">${item.exact_approved_copy}</p><div style="background:var(--bg-card-subtle);border-left:4px solid #0f766e;padding:12px 14px;border-radius:6px;font-size:.85rem;color:var(--text-secondary);line-height:1.5;margin-bottom:16px;">${item.scope_caveat}</div><div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;"><a href="${item.safe_canonical_action.url}" target="_blank" rel="${item.safe_canonical_action.rel}" class="btn-rail-action btn-action-portal" aria-label="Mở hướng dẫn Danabus Tuyến 05 chính thức" style="background:#0f766e;color:#fff;padding:12px 20px;min-height:44px;box-sizing:border-box;border-radius:8px;text-decoration:none;font-weight:700;font-size:.88rem;display:inline-flex;align-items:center;gap:6px;">${item.safe_canonical_action.label}</a><div style="font-size:.75rem;color:var(--text-secondary);font-family:monospace;">Evidence ID: ${item.card_id}</div></div></section>`;
  }


  function renderDanaBusElectricConversionCard() {
    const item = APPROVED_PUBLIC_ENTRIES.find(entry => entry.card_id === 'B06_01_DANABUS_CHUYEN_DOI_XE_BUYT_DIEN_02_13_21');
    if (!item || !item.public_eligible) return '';
    return `<section class="t2-pilot-card-section" style="margin:24px 0;background:var(--bg-card);border:2px solid #0f766e;border-radius:14px;padding:20px;box-shadow:0 4px 14px rgba(15,118,110,.08);" aria-label="DanaBus chuyển đổi xe buýt sử dụng điện tuyến 02, 13, 21 đã được phê duyệt Staging"><div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:12px;"><span style="background:rgba(15,118,110,.12);color:#0f766e;padding:4px 10px;border-radius:6px;font-size:.78rem;font-weight:800;">🚌 T3 • GIAO THÔNG CÔNG CỘNG &amp; XE BUÝT ĐIỆN</span><span style="font-size:.75rem;color:var(--text-secondary);">STAGING • CEO phê duyệt từng mục</span></div><h2 style="font-size:1.25rem;font-weight:800;color:var(--text-primary);margin:0 0 10px;">${item.exact_approved_title}</h2><p style="font-size:.95rem;color:var(--text-primary);line-height:1.55;margin-bottom:14px;font-weight:500;">${item.exact_approved_copy}</p><div style="background:var(--bg-card-subtle);border-left:4px solid #0f766e;padding:12px 14px;border-radius:6px;font-size:.85rem;color:var(--text-secondary);line-height:1.5;margin-bottom:16px;">${item.scope_caveat}</div><div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;"><a href="${item.safe_canonical_action.url}" target="_blank" rel="${item.safe_canonical_action.rel}" class="btn-rail-action btn-action-portal" aria-label="Mở thông báo chuyển đổi buýt điện Danabus chính thức" style="background:#0f766e;color:#fff;padding:12px 20px;min-height:44px;box-sizing:border-box;border-radius:8px;text-decoration:none;font-weight:700;font-size:.88rem;display:inline-flex;align-items:center;gap:6px;">${item.safe_canonical_action.label}</a><div style="font-size:.75rem;color:var(--text-secondary);font-family:monospace;">Evidence ID: ${item.card_id}</div></div></section>`;
  }


  function renderCivicOnlinePublicServiceCard() {
    const item = APPROVED_PUBLIC_ENTRIES.find(entry => entry.card_id === 'B06_03_HUONG_DAN_DICH_VU_CONG_TRUC_TUYEN_DANANG');
    if (!item || !item.public_eligible) return '';
    return `<section class="t2-pilot-card-section" style="margin:24px 0;background:var(--bg-card);border:2px solid #0369a1;border-radius:14px;padding:20px;box-shadow:0 4px 14px rgba(3,105,161,.08);" aria-label="Hướng dẫn nộp hồ sơ dịch vụ công trực tuyến qua Cổng DVCQG và VNeID đã được phê duyệt Staging"><div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:12px;"><span style="background:rgba(3,105,161,.12);color:#0369a1;padding:4px 10px;border-radius:6px;font-size:.78rem;font-weight:800;">🏛️ T2 • HÀNH CHÍNH CÔNG &amp; DỊCH VỤ CÔNG TRỰC TUYẾN</span><span style="font-size:.75rem;color:var(--text-secondary);">STAGING • CEO phê duyệt từng mục</span></div><h2 style="font-size:1.25rem;font-weight:800;color:var(--text-primary);margin:0 0 10px;">${item.exact_approved_title}</h2><p style="font-size:.95rem;color:var(--text-primary);line-height:1.55;margin-bottom:14px;font-weight:500;">${item.exact_approved_copy}</p><div style="background:var(--bg-card-subtle);border-left:4px solid #0369a1;padding:12px 14px;border-radius:6px;font-size:.85rem;color:var(--text-secondary);line-height:1.5;margin-bottom:16px;">${item.scope_caveat}</div><div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;"><a href="${item.safe_canonical_action.url}" target="_blank" rel="${item.safe_canonical_action.rel}" class="btn-rail-action btn-action-portal" aria-label="Mở hướng dẫn nộp hồ sơ dịch vụ công trực tuyến chính thức" style="background:#0369a1;color:#fff;padding:12px 20px;min-height:44px;box-sizing:border-box;border-radius:8px;text-decoration:none;font-weight:700;font-size:.88rem;display:inline-flex;align-items:center;gap:6px;">${item.safe_canonical_action.label}</a><div style="font-size:.75rem;color:var(--text-secondary);font-family:monospace;">Evidence ID: ${item.card_id}</div></div></section>`;
  }


  function renderCdcCommunityHealthBulletinCard() {
    const item = APPROVED_PUBLIC_ENTRIES.find(entry => entry.card_id === 'B06_02_BAN_TIN_SUC_KHOE_CONG_DONG_CDC_DANANG');
    if (!item || !item.public_eligible) return '';
    return `<section class="t2-pilot-card-section" style="margin:24px 0;background:var(--bg-card);border:2px solid #0f766e;border-radius:14px;padding:20px;box-shadow:0 4px 14px rgba(15,118,110,.08);" aria-label="Bản tin Sức khỏe cộng đồng CDC Đà Nẵng đã được phê duyệt Staging"><div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:12px;"><span style="background:rgba(15,118,110,.12);color:#0f766e;padding:4px 10px;border-radius:6px;font-size:.78rem;font-weight:800;">🏥 T2 • Y TẾ DỰ PHÒNG &amp; SỨC KHỎE CỘNG ĐỒNG</span><span style="font-size:.75rem;color:var(--text-secondary);">STAGING • CEO phê duyệt từng mục</span></div><h2 style="font-size:1.25rem;font-weight:800;color:var(--text-primary);margin:0 0 10px;">${item.exact_approved_title}</h2><p style="font-size:.95rem;color:var(--text-primary);line-height:1.55;margin-bottom:14px;font-weight:500;">${item.exact_approved_copy}</p><div style="background:var(--bg-card-subtle);border-left:4px solid #0f766e;padding:12px 14px;border-radius:6px;font-size:.85rem;color:var(--text-secondary);line-height:1.5;margin-bottom:16px;">${item.scope_caveat}</div><div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;"><a href="${item.safe_canonical_action.url}" target="_blank" rel="${item.safe_canonical_action.rel}" class="btn-rail-action btn-action-portal" aria-label="Mở bản tin sức khỏe cộng đồng CDC Đà Nẵng chính thức" style="background:#0f766e;color:#fff;padding:12px 20px;min-height:44px;box-sizing:border-box;border-radius:8px;text-decoration:none;font-weight:700;font-size:.88rem;display:inline-flex;align-items:center;gap:6px;">${item.safe_canonical_action.label}</a><div style="font-size:.75rem;color:var(--text-secondary);font-family:monospace;">Evidence ID: ${item.card_id}</div></div></section>`;
  }

  function renderDanaBusRoute03_09_14Card() {
    const item = APPROVED_PUBLIC_ENTRIES.find(entry => entry.card_id === 'B07_01_DANABUS_CHUYEN_DOI_XE_BUYT_DIEN_03_09_14');
    if (!item || !item.public_eligible) return '';
    return `<section class="t2-pilot-card-section" style="margin:24px 0;background:var(--bg-card);border:2px solid #0f766e;border-radius:14px;padding:20px;box-shadow:0 4px 14px rgba(15,118,110,.08);" aria-label="DanaBus điều chỉnh phương tiện xe buýt điện tuyến 03, 09, 14 đã được phê duyệt Staging"><div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:12px;"><span style="background:rgba(15,118,110,.12);color:#0f766e;padding:4px 10px;border-radius:6px;font-size:.78rem;font-weight:800;">🚌 T3 • GIAO THÔNG CÔNG CỘNG &amp; XE BUÝT ĐIỆN</span><span style="font-size:.75rem;color:var(--text-secondary);">STAGING • CEO phê duyệt từng mục</span></div><h2 style="font-size:1.25rem;font-weight:800;color:var(--text-primary);margin:0 0 10px;">${item.exact_approved_title}</h2><p style="font-size:.95rem;color:var(--text-primary);line-height:1.55;margin-bottom:14px;font-weight:500;">${item.exact_approved_copy}</p><div style="background:var(--bg-card-subtle);border-left:4px solid #0f766e;padding:12px 14px;border-radius:6px;font-size:.85rem;color:var(--text-secondary);line-height:1.5;margin-bottom:16px;">${item.scope_caveat}</div><div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;"><a href="${item.safe_canonical_action.url}" target="_blank" rel="${item.safe_canonical_action.rel}" class="btn-rail-action btn-action-portal" aria-label="Mở thông báo buýt điện Tuyến 03, 09, 14 chính thức" style="background:#0f766e;color:#fff;padding:12px 20px;min-height:44px;box-sizing:border-box;border-radius:8px;text-decoration:none;font-weight:700;font-size:.88rem;display:inline-flex;align-items:center;gap:6px;">${item.safe_canonical_action.label}</a><div style="font-size:.75rem;color:var(--text-secondary);font-family:monospace;">Evidence ID: ${item.card_id}</div></div></section>`;
  }

  function renderCivicCyberSafetyDeepfakeCard() {
    const item = APPROVED_PUBLIC_ENTRIES.find(entry => entry.card_id === 'B07_02_CAM_NANG_AN_TOAN_SO_DEEPFAKE_1022');
    if (!item || !item.public_eligible) return '';
    return `<section class="t2-pilot-card-section" style="margin:24px 0;background:var(--bg-card);border:2px solid #0369a1;border-radius:14px;padding:20px;box-shadow:0 4px 14px rgba(3,105,161,.08);" aria-label="Cẩm nang an toàn số Deepfake 1022 đã được phê duyệt Staging"><div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:12px;"><span style="background:rgba(3,105,161,.12);color:#0369a1;padding:4px 10px;border-radius:6px;font-size:.78rem;font-weight:800;">🛡️ T2 • AN TOÀN SỐ &amp; ĐIỀU HƯỚNG CỘNG ĐỒNG</span><span style="font-size:.75rem;color:var(--text-secondary);">STAGING • CEO phê duyệt từng mục</span></div><h2 style="font-size:1.25rem;font-weight:800;color:var(--text-primary);margin:0 0 10px;">${item.exact_approved_title}</h2><p style="font-size:.95rem;color:var(--text-primary);line-height:1.55;margin-bottom:14px;font-weight:500;">${item.exact_approved_copy}</p><div style="background:var(--bg-card-subtle);border-left:4px solid #0369a1;padding:12px 14px;border-radius:6px;font-size:.85rem;color:var(--text-secondary);line-height:1.5;margin-bottom:16px;">${item.scope_caveat}</div><div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;"><a href="${item.safe_canonical_action.url}" target="_blank" rel="${item.safe_canonical_action.rel}" class="btn-rail-action btn-action-portal" aria-label="Mở cẩm nang an toàn số 1022 chính thức" style="background:#0369a1;color:#fff;padding:12px 20px;min-height:44px;box-sizing:border-box;border-radius:8px;text-decoration:none;font-weight:700;font-size:.88rem;display:inline-flex;align-items:center;gap:6px;">${item.safe_canonical_action.label}</a><div style="font-size:.75rem;color:var(--text-secondary);font-family:monospace;">Evidence ID: ${item.card_id}</div></div></section>`;
  }

  function renderCivicEmergencyAedCard() {
    const item = APPROVED_PUBLIC_ENTRIES.find(entry => entry.card_id === 'B07_03_TRA_CUU_MAY_KHU_RUNG_TIM_AED_CONG_CONG_1022');
    if (!item || !item.public_eligible) return '';
    return `<section class="t2-pilot-card-section" style="margin:24px 0;background:var(--bg-card);border:2px solid #0369a1;border-radius:14px;padding:20px;box-shadow:0 4px 14px rgba(3,105,161,.08);" aria-label="Hướng dẫn tra cứu máy khử rung tim AED 1022 đã được phê duyệt Staging"><div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:12px;"><span style="background:rgba(3,105,161,.12);color:#0369a1;padding:4px 10px;border-radius:6px;font-size:.78rem;font-weight:800;">🚨 T2 • TIỆN ÍCH KHẨN CẤP &amp; ĐIỀU HƯỚNG CỘNG ĐỒNG</span><span style="font-size:.75rem;color:var(--text-secondary);">STAGING • CEO phê duyệt từng mục</span></div><h2 style="font-size:1.25rem;font-weight:800;color:var(--text-primary);margin:0 0 10px;">${item.exact_approved_title}</h2><p style="font-size:.95rem;color:var(--text-primary);line-height:1.55;margin-bottom:14px;font-weight:500;">${item.exact_approved_copy}</p><div style="background:var(--bg-card-subtle);border-left:4px solid #0369a1;padding:12px 14px;border-radius:6px;font-size:.85rem;color:var(--text-secondary);line-height:1.5;margin-bottom:16px;">${item.scope_caveat}</div><div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;"><a href="${item.safe_canonical_action.url}" target="_blank" rel="${item.safe_canonical_action.rel}" class="btn-rail-action btn-action-portal" aria-label="Mở hướng dẫn tra cứu máy AED 1022 chính thức" style="background:#0369a1;color:#fff;padding:12px 20px;min-height:44px;box-sizing:border-box;border-radius:8px;text-decoration:none;font-weight:700;font-size:.88rem;display:inline-flex;align-items:center;gap:6px;">${item.safe_canonical_action.label}</a><div style="font-size:.75rem;color:var(--text-secondary);font-family:monospace;">Evidence ID: ${item.card_id}</div></div></section>`;
  }

  function renderCivicFloodMapHoaXuanCard() {
    const item = APPROVED_PUBLIC_ENTRIES.find(entry => entry.card_id === 'B08_01_BAN_DO_SO_UNG_PHO_LU_LUT_HOA_XUAN_1022');
    if (!item || !item.public_eligible) return '';
    return `<section class="t2-pilot-card-section" style="margin:24px 0;background:var(--bg-card);border:2px solid #0369a1;border-radius:14px;padding:20px;box-shadow:0 4px 14px rgba(3,105,161,.08);" aria-label="Bản đồ số và biển vết lũ 1022 đã được phê duyệt Staging"><div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:12px;"><span style="background:rgba(3,105,161,.12);color:#0369a1;padding:4px 10px;border-radius:6px;font-size:.78rem;font-weight:800;">🚨 T2 • ĐIỀU HƯỚNG CỘNG ĐỒNG &amp; ỨNG PHÓ THIÊN TAI</span><span style="font-size:.75rem;color:var(--text-secondary);">STAGING • CEO phê duyệt từng mục</span></div><h2 style="font-size:1.25rem;font-weight:800;color:var(--text-primary);margin:0 0 10px;">${item.exact_approved_title}</h2><p style="font-size:.95rem;color:var(--text-primary);line-height:1.55;margin-bottom:14px;font-weight:500;">${item.exact_approved_copy}</p><div style="background:var(--bg-card-subtle);border-left:4px solid #0369a1;padding:12px 14px;border-radius:6px;font-size:.85rem;color:var(--text-secondary);line-height:1.5;margin-bottom:16px;">${item.scope_caveat}</div><div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;"><a href="${item.safe_canonical_action.url}" target="_blank" rel="${item.safe_canonical_action.rel}" class="btn-rail-action btn-action-portal" aria-label="Mở bản đồ số vết lũ 1022 chính thức" style="background:#0369a1;color:#fff;padding:12px 20px;min-height:44px;box-sizing:border-box;border-radius:8px;text-decoration:none;font-weight:700;font-size:.88rem;display:inline-flex;align-items:center;gap:6px;">${item.safe_canonical_action.label}</a><div style="font-size:.75rem;color:var(--text-secondary);font-family:monospace;">Evidence ID: ${item.card_id}</div></div></section>`;
  }

  function renderCivicCommunityWifiAnHaiCard() {
    const item = APPROVED_PUBLIC_ENTRIES.find(entry => entry.card_id === 'B08_03_TIEN_ICH_SO_CONG_DONG_WIFI_AN_HAI_1022');
    if (!item || !item.public_eligible) return '';
    return `<section class="t2-pilot-card-section" style="margin:24px 0;background:var(--bg-card);border:2px solid #0369a1;border-radius:14px;padding:20px;box-shadow:0 4px 14px rgba(3,105,161,.08);" aria-label="Hạ tầng số và wifi cộng đồng An Hải 1022 đã được phê duyệt Staging"><div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:12px;"><span style="background:rgba(3,105,161,.12);color:#0369a1;padding:4px 10px;border-radius:6px;font-size:.78rem;font-weight:800;">🌐 T2 • TIỆN ÍCH SỐ &amp; MẠNG CỘNG ĐỒNG MIỄN PHÍ</span><span style="font-size:.75rem;color:var(--text-secondary);">STAGING • CEO phê duyệt từng mục</span></div><h2 style="font-size:1.25rem;font-weight:800;color:var(--text-primary);margin:0 0 10px;">${item.exact_approved_title}</h2><p style="font-size:.95rem;color:var(--text-primary);line-height:1.55;margin-bottom:14px;font-weight:500;">${item.exact_approved_copy}</p><div style="background:var(--bg-card-subtle);border-left:4px solid #0369a1;padding:12px 14px;border-radius:6px;font-size:.85rem;color:var(--text-secondary);line-height:1.5;margin-bottom:16px;">${item.scope_caveat}</div><div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;"><a href="${item.safe_canonical_action.url}" target="_blank" rel="${item.safe_canonical_action.rel}" class="btn-rail-action btn-action-portal" aria-label="Mở thông tin hạ tầng số An Hải 1022 chính thức" style="background:#0369a1;color:#fff;padding:12px 20px;min-height:44px;box-sizing:border-box;border-radius:8px;text-decoration:none;font-weight:700;font-size:.88rem;display:inline-flex;align-items:center;gap:6px;">${item.safe_canonical_action.label}</a><div style="font-size:.75rem;color:var(--text-secondary);font-family:monospace;">Evidence ID: ${item.card_id}</div></div></section>`;
  }

  function renderDanabusTuyen11Card() {
    const item = APPROVED_PUBLIC_ENTRIES.find(entry => entry.card_id === 'B09_01_DANABUS_TUYEN_11_XUAN_DIEU_BEN_XE_TIEN_SA');
    if (!item || !item.public_eligible) return '';
    return `<section class="t2-pilot-card-section" style="margin:24px 0;background:var(--bg-card);border:2px solid #0369a1;border-radius:14px;padding:20px;box-shadow:0 4px 14px rgba(3,105,161,.08);" aria-label="Tuyến xe buýt số 11 Danabus đã được phê duyệt Staging"><div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:12px;"><span style="background:rgba(3,105,161,.12);color:#0369a1;padding:4px 10px;border-radius:6px;font-size:.78rem;font-weight:800;">🚌 T3 • GIAO THÔNG CÔNG CỘNG &amp; KẾT NỐI ĐÔ THỊ</span><span style="font-size:.75rem;color:var(--text-secondary);">STAGING • CEO phê duyệt từng mục</span></div><h2 style="font-size:1.25rem;font-weight:800;color:var(--text-primary);margin:0 0 10px;">${item.exact_approved_title}</h2><p style="font-size:.95rem;color:var(--text-primary);line-height:1.55;margin-bottom:14px;font-weight:500;">${item.exact_approved_copy}</p><div style="background:var(--bg-card-subtle);border-left:4px solid #0369a1;padding:12px 14px;border-radius:6px;font-size:.85rem;color:var(--text-secondary);line-height:1.5;margin-bottom:16px;">${item.scope_caveat}</div><div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;"><a href="${item.safe_canonical_action.url}" target="_blank" rel="${item.safe_canonical_action.rel}" class="btn-rail-action btn-action-portal" aria-label="Mở thông tin Danabus Tuyến 11 chính thức" style="background:#0369a1;color:#fff;padding:12px 20px;min-height:44px;box-sizing:border-box;border-radius:8px;text-decoration:none;font-weight:700;font-size:.88rem;display:inline-flex;align-items:center;gap:6px;">${item.safe_canonical_action.label}</a><div style="font-size:.75rem;color:var(--text-secondary);font-family:monospace;">Evidence ID: ${item.card_id}</div></div></section>`;
  }

  function renderCivicDaNangAiLegalCard() {
    const item = APPROVED_PUBLIC_ENTRIES.find(entry => entry.card_id === 'B09_02_TRO_LY_SO_DANANG_AI_PHO_BIEN_PHAP_LUAT_1022');
    if (!item || !item.public_eligible) return '';
    return `<section class="t2-pilot-card-section" style="margin:24px 0;background:var(--bg-card);border:2px solid #0369a1;border-radius:14px;padding:20px;box-shadow:0 4px 14px rgba(3,105,161,.08);" aria-label="Trợ lý số DaNang AI 1022 đã được phê duyệt Staging"><div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:12px;"><span style="background:rgba(3,105,161,.12);color:#0369a1;padding:4px 10px;border-radius:6px;font-size:.78rem;font-weight:800;">⚖️ T2 • TIỆN ÍCH SỐ &amp; PHỔ BIẾN PHÁP LUẬT</span><span style="font-size:.75rem;color:var(--text-secondary);">STAGING • CEO phê duyệt từng mục</span></div><h2 style="font-size:1.25rem;font-weight:800;color:var(--text-primary);margin:0 0 10px;">${item.exact_approved_title}</h2><p style="font-size:.95rem;color:var(--text-primary);line-height:1.55;margin-bottom:14px;font-weight:500;">${item.exact_approved_copy}</p><div style="background:var(--bg-card-subtle);border-left:4px solid #0369a1;padding:12px 14px;border-radius:6px;font-size:.85rem;color:var(--text-secondary);line-height:1.5;margin-bottom:16px;">${item.scope_caveat}</div><div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;"><a href="${item.safe_canonical_action.url}" target="_blank" rel="${item.safe_canonical_action.rel}" class="btn-rail-action btn-action-portal" aria-label="Mở thông tin DaNang AI 1022 chính thức" style="background:#0369a1;color:#fff;padding:12px 20px;min-height:44px;box-sizing:border-box;border-radius:8px;text-decoration:none;font-weight:700;font-size:.88rem;display:inline-flex;align-items:center;gap:6px;">${item.safe_canonical_action.label}</a><div style="font-size:.75rem;color:var(--text-secondary);font-family:monospace;">Evidence ID: ${item.card_id}</div></div></section>`;
  }

  function renderCivicIdentitySafetyCard() {
    const item = APPROVED_PUBLIC_ENTRIES.find(entry => entry.card_id === 'B09_03_CHIEN_DICH_BAO_VE_DANH_TINH_SO_MA_SO_THUE_1022');
    if (!item || !item.public_eligible) return '';
    return `<section class="t2-pilot-card-section" style="margin:24px 0;background:var(--bg-card);border:2px solid #0369a1;border-radius:14px;padding:20px;box-shadow:0 4px 14px rgba(3,105,161,.08);" aria-label="Cẩm nang bảo vệ danh tính số 1022 đã được phê duyệt Staging"><div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:12px;"><span style="background:rgba(3,105,161,.12);color:#0369a1;padding:4px 10px;border-radius:6px;font-size:.78rem;font-weight:800;">🛡️ T2 • AN TOÀN SỐ &amp; BẢO VỆ DANH TÍNH</span><span style="font-size:.75rem;color:var(--text-secondary);">STAGING • CEO phê duyệt từng mục</span></div><h2 style="font-size:1.25rem;font-weight:800;color:var(--text-primary);margin:0 0 10px;">${item.exact_approved_title}</h2><p style="font-size:.95rem;color:var(--text-primary);line-height:1.55;margin-bottom:14px;font-weight:500;">${item.exact_approved_copy}</p><div style="background:var(--bg-card-subtle);border-left:4px solid #0369a1;padding:12px 14px;border-radius:6px;font-size:.85rem;color:var(--text-secondary);line-height:1.5;margin-bottom:16px;">${item.scope_caveat}</div><div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;"><a href="${item.safe_canonical_action.url}" target="_blank" rel="${item.safe_canonical_action.rel}" class="btn-rail-action btn-action-portal" aria-label="Mở cẩm nang an toàn số 1022 chính thức" style="background:#0369a1;color:#fff;padding:12px 20px;min-height:44px;box-sizing:border-box;border-radius:8px;text-decoration:none;font-weight:700;font-size:.88rem;display:inline-flex;align-items:center;gap:6px;">${item.safe_canonical_action.label}</a><div style="font-size:.75rem;color:var(--text-secondary);font-family:monospace;">Evidence ID: ${item.card_id}</div></div></section>`;
  }

  function renderCivicTamKyAdminCard() {
    const item = APPROVED_PUBLIC_ENTRIES.find(entry => entry.card_id === 'B10_01_DIEM_TIEP_NHAN_THU_TUC_HANH_CHINH_TAM_KY_1022');
    if (!item || !item.public_eligible) return '';
    return `<section class="t2-pilot-card-section" style="margin:24px 0;background:var(--bg-card);border:2px solid #0369a1;border-radius:14px;padding:20px;box-shadow:0 4px 14px rgba(3,105,161,.08);" aria-label="Điểm tiếp nhận thủ tục hành chính Tam Kỳ 1022 đã được phê duyệt Staging"><div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:12px;"><span style="background:rgba(3,105,161,.12);color:#0369a1;padding:4px 10px;border-radius:6px;font-size:.78rem;font-weight:800;">🏛️ T2 • TIỆN ÍCH DỊCH VỤ CÔNG &amp; HÀNH CHÍNH SỐ</span><span style="font-size:.75rem;color:var(--text-secondary);">STAGING • CEO phê duyệt từng mục</span></div><h2 style="font-size:1.25rem;font-weight:800;color:var(--text-primary);margin:0 0 10px;">${item.exact_approved_title}</h2><p style="font-size:.95rem;color:var(--text-primary);line-height:1.55;margin-bottom:14px;font-weight:500;">${item.exact_approved_copy}</p><div style="background:var(--bg-card-subtle);border-left:4px solid #0369a1;padding:12px 14px;border-radius:6px;font-size:.85rem;color:var(--text-secondary);line-height:1.5;margin-bottom:16px;">${item.scope_caveat}</div><div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;"><a href="${item.safe_canonical_action.url}" target="_blank" rel="${item.safe_canonical_action.rel}" class="btn-rail-action btn-action-portal" aria-label="Mở thông tin điểm tiếp nhận TTHC 1022 chính thức" style="background:#0369a1;color:#fff;padding:12px 20px;min-height:44px;box-sizing:border-box;border-radius:8px;text-decoration:none;font-weight:700;font-size:.88rem;display:inline-flex;align-items:center;gap:6px;">${item.safe_canonical_action.label}</a><div style="font-size:.75rem;color:var(--text-secondary);font-family:monospace;">Evidence ID: ${item.card_id}</div></div></section>`;
  }

  function renderCivicDigitalSkillsVNeIdCard() {
    const item = APPROVED_PUBLIC_ENTRIES.find(entry => entry.card_id === 'B10_02_PHO_CAP_KY_NANG_SO_VNEID_PHU_NU_1022');
    if (!item || !item.public_eligible) return '';
    return `<section class="t2-pilot-card-section" style="margin:24px 0;background:var(--bg-card);border:2px solid #0369a1;border-radius:14px;padding:20px;box-shadow:0 4px 14px rgba(3,105,161,.08);" aria-label="Phổ cập kỹ năng số và kích hoạt VNeID 1022 đã được phê duyệt Staging"><div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:12px;"><span style="background:rgba(3,105,161,.12);color:#0369a1;padding:4px 10px;border-radius:6px;font-size:.78rem;font-weight:800;">🛡️ T2 • KỸ NĂNG SỐ &amp; PHÒNG CHỐNG LỪA ĐẢO</span><span style="font-size:.75rem;color:var(--text-secondary);">STAGING • CEO phê duyệt từng mục</span></div><h2 style="font-size:1.25rem;font-weight:800;color:var(--text-primary);margin:0 0 10px;">${item.exact_approved_title}</h2><p style="font-size:.95rem;color:var(--text-primary);line-height:1.55;margin-bottom:14px;font-weight:500;">${item.exact_approved_copy}</p><div style="background:var(--bg-card-subtle);border-left:4px solid #0369a1;padding:12px 14px;border-radius:6px;font-size:.85rem;color:var(--text-secondary);line-height:1.5;margin-bottom:16px;">${item.scope_caveat}</div><div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;"><a href="${item.safe_canonical_action.url}" target="_blank" rel="${item.safe_canonical_action.rel}" class="btn-rail-action btn-action-portal" aria-label="Mở cẩm nang kỹ năng số 1022 chính thức" style="background:#0369a1;color:#fff;padding:12px 20px;min-height:44px;box-sizing:border-box;border-radius:8px;text-decoration:none;font-weight:700;font-size:.88rem;display:inline-flex;align-items:center;gap:6px;">${item.safe_canonical_action.label}</a><div style="font-size:.75rem;color:var(--text-secondary);font-family:monospace;">Evidence ID: ${item.card_id}</div></div></section>`;
  }


  function renderCivicFlightInfoCard() {
    const item = APPROVED_PUBLIC_ENTRIES.find(entry => entry.card_id === 'B11_01_TRA_CUU_CHUYEN_BAY_DANANG_SMART_CITY_1022');
    if (!item || !item.public_eligible) return '';
    return `<section class="t2-pilot-card-section" style="margin:24px 0;background:var(--bg-card);border:2px solid #0369a1;border-radius:14px;padding:20px;box-shadow:0 4px 14px rgba(3,105,161,.08);" aria-label="Thông tin chuyến bay trên Danang Smart City 1022 đã được phê duyệt RC"><div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:12px;"><span style="background:rgba(3,105,161,.12);color:#0369a1;padding:4px 10px;border-radius:6px;font-size:.78rem;font-weight:800;">✈️ T2 • TIỆN ÍCH SỐ &amp; ĐIỀU HÀNH SÂN BAY</span><span style="font-size:.75rem;color:var(--text-secondary);">RC v3.431.0 • Ứng viên phát hành</span></div><h2 style="font-size:1.25rem;font-weight:800;color:var(--text-primary);margin:0 0 10px;">${item.exact_approved_title}</h2><p style="font-size:.95rem;color:var(--text-primary);line-height:1.55;margin-bottom:14px;font-weight:500;">${item.exact_approved_copy}</p><div style="background:var(--bg-card-subtle);border-left:4px solid #0369a1;padding:12px 14px;border-radius:6px;font-size:.85rem;color:var(--text-secondary);line-height:1.5;margin-bottom:16px;">${item.scope_caveat}</div><div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;"><a href="${item.safe_canonical_action.url}" target="_blank" rel="${item.safe_canonical_action.rel}" class="btn-rail-action btn-action-portal" aria-label="Mở thông tin chuyến bay 1022 chính thức" style="background:#0369a1;color:#fff;padding:12px 20px;min-height:44px;box-sizing:border-box;border-radius:8px;text-decoration:none;font-weight:700;font-size:.88rem;display:inline-flex;align-items:center;gap:6px;">${item.safe_canonical_action.label}</a><div style="font-size:.75rem;color:var(--text-secondary);font-family:monospace;">Evidence ID: ${item.card_id}</div></div></section>`;
  }

  function renderCivicChamDanceCard() {
    const item = APPROVED_PUBLIC_ENTRIES.find(entry => entry.card_id === 'B11_02_HOAT_DONG_VAN_HOA_BAO_TANG_CHAM_1022');
    if (!item || !item.public_eligible) return '';
    return `<section class="t2-pilot-card-section" style="margin:24px 0;background:var(--bg-card);border:2px solid #0369a1;border-radius:14px;padding:20px;box-shadow:0 4px 14px rgba(3,105,161,.08);" aria-label="Lịch biểu diễn vũ điệu Champa Bảo tàng Chăm Đà Nẵng 1022 đã được phê duyệt RC"><div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:12px;"><span style="background:rgba(3,105,161,.12);color:#0369a1;padding:4px 10px;border-radius:6px;font-size:.78rem;font-weight:800;">🏛️ T2 • VĂN HÓA &amp; DI SẢN CỘNG ĐỒNG</span><span style="font-size:.75rem;color:var(--text-secondary);">RC v3.431.0 • Ứng viên phát hành</span></div><h2 style="font-size:1.25rem;font-weight:800;color:var(--text-primary);margin:0 0 10px;">${item.exact_approved_title}</h2><p style="font-size:.95rem;color:var(--text-primary);line-height:1.55;margin-bottom:14px;font-weight:500;">${item.exact_approved_copy}</p><div style="background:var(--bg-card-subtle);border-left:4px solid #0369a1;padding:12px 14px;border-radius:6px;font-size:.85rem;color:var(--text-secondary);line-height:1.5;margin-bottom:16px;">${item.scope_caveat}</div><div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;"><a href="${item.safe_canonical_action.url}" target="_blank" rel="${item.safe_canonical_action.rel}" class="btn-rail-action btn-action-portal" aria-label="Mở thông báo lịch diễn 1022 chính thức" style="background:#0369a1;color:#fff;padding:12px 20px;min-height:44px;box-sizing:border-box;border-radius:8px;text-decoration:none;font-weight:700;font-size:.88rem;display:inline-flex;align-items:center;gap:6px;">${item.safe_canonical_action.label}</a><div style="font-size:.75rem;color:var(--text-secondary);font-family:monospace;">Evidence ID: ${item.card_id}</div></div></section>`;
  }

  function renderNeutralZeroState() {
    return `
      <section class="zero-state-neutral-provenance" style="background: var(--bg-card); border: 1px dashed var(--border-subtle); border-radius: 14px; padding: 36px 24px; text-align: center; margin: 24px 0;" aria-label="Khu vực Đang Kiểm Định Nguồn">
        <div style="font-size: 2.2rem; margin-bottom: 12px;">🔍</div>
        <h2 style="font-size: 1.15rem; font-weight: 800; color: var(--text-primary); margin-bottom: 8px;">Khu Vực Đang Kiểm Định Nguồn</h2>
        <p style="font-size: 0.92rem; color: var(--text-secondary); line-height: 1.6; max-width: 620px; margin: 0 auto 20px auto;">
          JayT đang kiểm định độc lập từng nguồn tài liệu theo Evidence Contract v3 trước khi công bố. Hiện chưa có nguồn mới đạt chuẩn công bố công khai.
        </p>
        <div style="display: flex; justify-content: center; gap: 12px; flex-wrap: wrap;">
          <button class="btn-zero-action" data-nav="BUY_DECISION" style="background: #0369a1; color: #ffffff; border: none; padding: 10px 20px; min-height: 44px; border-radius: 8px; font-weight: 700; font-size: 0.9rem; cursor: pointer; display: inline-flex; align-items: center; gap: 6px;" aria-label="Mở Bảng tính thực trả của bạn">
            🧮 Tự tính thực trả (Savings Lab) &rarr;
          </button>
          <button class="btn-zero-action" data-nav="EXPLORE" style="background: var(--bg-card-subtle); color: var(--text-primary); border: 1px solid var(--border-subtle); padding: 10px 20px; min-height: 44px; border-radius: 8px; font-weight: 700; font-size: 0.9rem; cursor: pointer; display: inline-flex; align-items: center; gap: 6px;" aria-label="Xem tài liệu GitHub Education đã đối soát">
            🛡️ Tài liệu đã đối soát (GitHub Pilot)
          </button>
        </div>
      </section>
    `;
  }

  // =========================================================================
  // JAYT-352: TOP-OF-HOMEPAGE 7-DAY SAVINGS TIMELINE CONTROLS (Asia/Ho_Chi_Minh)
  // =========================================================================
  function renderHomeCalendarStrip() {
    return `
      <section class="home-calendar-strip" aria-label="Lịch tiết kiệm 7 ngày theo tuần">
        <div class="calendar-strip-header">
          <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
            <span class="badge-calendar-vn">📅 LỊCH TIẾT KIỆM 7 NGÀY (Asia/Ho_Chi_Minh)</span>
            <span class="calendar-today-pill" id="home-calendar-today-indicator">Hôm nay: ...</span>
          </div>
          <div id="home-calendar-filter-status" role="status" aria-live="polite" class="calendar-strip-status">
            Đang hiển thị toàn bộ 24 tiện ích &amp; tài liệu công ích đã đối soát.
          </div>
        </div>

        <div class="home-calendar-tabs" role="tablist" aria-label="Lọc nhanh ưu đãi theo ngày trong tuần">
          <button type="button" class="home-day-tab active" data-home-day="ALL" role="tab" aria-selected="true">
            <span class="day-label">Tất cả</span>
            <small>Mặc định</small>
          </button>
          <button type="button" class="home-day-tab" data-home-day="monday" role="tab" aria-selected="false">
            <span class="day-label">Thứ Hai</span>
            <small>Biểu giá chuẩn</small>
          </button>
          <button type="button" class="home-day-tab" data-home-day="tuesday" role="tab" aria-selected="false">
            <span class="day-label">Thứ Ba</span>
            <small>2 ưu đãi</small>
          </button>
          <button type="button" class="home-day-tab" data-home-day="wednesday" role="tab" aria-selected="false">
            <span class="day-label">Thứ Tư</span>
            <small>1 ưu đãi</small>
          </button>
          <button type="button" class="home-day-tab" data-home-day="thursday" role="tab" aria-selected="false">
            <span class="day-label">Thứ Năm</span>
            <small>1 ưu đãi</small>
          </button>
          <button type="button" class="home-day-tab" data-home-day="friday" role="tab" aria-selected="false">
            <span class="day-label">Thứ Sáu</span>
            <small>1 ưu đãi</small>
          </button>
          <button type="button" class="home-day-tab" data-home-day="saturday" role="tab" aria-selected="false">
            <span class="day-label">Thứ Bảy</span>
            <small>Cuối tuần</small>
          </button>
          <button type="button" class="home-day-tab" data-home-day="sunday" role="tab" aria-selected="false">
            <span class="day-label">Chủ Nhật</span>
            <small>Cuối tuần</small>
          </button>
        </div>

        <div id="home-calendar-active-panel" class="home-calendar-active-panel" style="display: none;"></div>
      </section>
    `;
  }

  function attachHomeCalendarEvents() {
    const tabs = document.querySelectorAll('[data-home-day]');
    const activePanel = document.getElementById('home-calendar-active-panel');
    const statusEl = document.getElementById('home-calendar-filter-status');
    const todayIndicator = document.getElementById('home-calendar-today-indicator');

    // Get current day in Asia/Ho_Chi_Minh
    const now = new Date();
    const vnDayFormatter = new Intl.DateTimeFormat('vi-VN', {
      timeZone: 'Asia/Ho_Chi_Minh',
      weekday: 'long'
    });
    const vnDateFormatter = new Intl.DateTimeFormat('vi-VN', {
      timeZone: 'Asia/Ho_Chi_Minh',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
    const currentVnDayStr = vnDayFormatter.format(now).toLowerCase();
    const currentVnDateStr = vnDateFormatter.format(now);
    if (todayIndicator) {
      todayIndicator.textContent = `Hôm nay: ${currentVnDayStr.charAt(0).toUpperCase() + currentVnDayStr.slice(1)}, ${currentVnDateStr}`;
    }

    function selectDay(dayKey) {
      const startTime = performance.now();

      tabs.forEach(tab => {
        const isSelected = (tab.getAttribute('data-home-day') === dayKey);
        tab.classList.toggle('active', isSelected);
        tab.setAttribute('aria-selected', String(isSelected));
      });

      if (!activePanel) return;

      if (dayKey === 'ALL') {
        activePanel.style.display = 'none';
        activePanel.innerHTML = '';
        document.querySelectorAll('.t2-pilot-card-section').forEach(c => c.style.display = 'block');
        if (statusEl) {
          statusEl.textContent = 'Đang hiển thị toàn bộ 24 tiện ích & tài liệu công ích đã đối soát.';
        }
      } else {
        const dayData = SAVINGS_CALENDAR_DATA[dayKey];
        if (dayData) {
          activePanel.style.display = 'block';
          if (!dayData.has_deals || !dayData.items || dayData.items.length === 0) {
            activePanel.innerHTML = `
              <div class="calendar-home-panel-card empty">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 10px; flex-wrap: wrap;">
                  <div>
                    <h3 style="font-size: 1.05rem; font-weight: 800; color: var(--text-primary); margin: 0 0 6px 0;">
                      📅 ${dayData.name_vi} — Trạng Thái Tiêu Chuẩn
                    </h3>
                    <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.5; margin: 0;">
                      ${dayData.empty_state_note}
                    </p>
                  </div>
                  <button type="button" class="btn-reset-day-filter" id="btn-reset-home-calendar" aria-label="Đặt lại xem tất cả các ngày">
                    ↺ Đặt lại (Hiện tất cả)
                  </button>
                </div>
              </div>
            `;
            if (statusEl) {
              statusEl.textContent = `Ngày ${dayData.name_vi}: Chưa ghi nhận ưu đãi định kỳ theo tuần (Biểu giá chuẩn).`;
            }
          } else {
            activePanel.innerHTML = `
              <div class="calendar-home-panel-card deals">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; flex-wrap: wrap; gap: 8px;">
                  <h3 style="font-size: 1.05rem; font-weight: 800; color: var(--text-primary); margin: 0;">
                    🎉 Ưu đãi định kỳ cho ${dayData.name_vi} (${dayData.items.length} chương trình)
                  </h3>
                  <button type="button" class="btn-reset-day-filter" id="btn-reset-home-calendar" aria-label="Đặt lại xem tất cả các ngày">
                    ↺ Đặt lại (Hiện tất cả)
                  </button>
                </div>
                <div class="vault-grid">
                  ${dayData.items.map(item => `
                    <article class="vault-card" style="border-left: 4px solid #0284c7;">
                      <div class="vault-card-header">
                        <span class="vault-tier-badge badge-brand-program">${item.brand}</span>
                        <span style="font-size: 0.78rem; font-weight: 700; color: #0369a1;">📅 ${item.frequency}</span>
                      </div>
                      <h4 class="vault-card-title" style="font-size: 1rem; font-weight: 800; margin: 4px 0 8px 0;">${item.event_name}</h4>
                      <div class="vault-card-price" style="font-size: 1.02rem; color: #0284c7; font-weight: 800; margin-bottom: 8px;">
                        ${item.price_rule}
                      </div>
                      <div class="vault-meta-row" style="font-size: 0.84rem;">
                        <strong>⚠️ Điều kiện:</strong> ${item.exceptions}
                      </div>
                      <div class="vault-card-actions" style="margin-top: 12px; display: flex; gap: 8px; flex-wrap: wrap;">
                        <a href="${item.source_url}" target="_blank" rel="noopener noreferrer nofollow" class="btn-rail-action" style="background: var(--bg-card-subtle); color: var(--text-primary); border: 1px solid var(--border-subtle); padding: 6px 12px; border-radius: 6px; text-decoration: none; font-size: 0.82rem; font-weight: 600; display: inline-flex; align-items: center; gap: 4px; min-height: 44px;" aria-label="Xem quy định nguồn cho ${item.event_name}">
                          Xem quy định nguồn ↗
                        </a>
                      </div>
                    </article>
                  `).join('')}
                </div>
              </div>
            `;
            if (statusEl) {
              statusEl.textContent = `Đang hiển thị ${dayData.items.length} ưu đãi định kỳ cho ${dayData.name_vi}.`;
            }
          }

          const resetBtn = document.getElementById('btn-reset-home-calendar');
          if (resetBtn) {
            resetBtn.onclick = () => selectDay('ALL');
          }
        }
      }

      requestAnimationFrame(() => {
        const elapsed = performance.now() - startTime;
        window.__lastDayFilterDurationMs = elapsed;
      });
    }

    window.filterDaySavings = selectDay;

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const dayKey = tab.getAttribute('data-home-day');
        if (dayKey) selectDay(dayKey);
      });
    });
  }

  // 1. HOME VIEW
  
  // =========================================================================
  // JAYT-363 WORKSTREAM 1: TIME-AWARE BENTO HUB & 5 CAMPUS CLUSTERS
  // =========================================================================
  const CAMPUS_CLUSTERS = [
  {
    "id": "BACH_KHOA",
    "name": "Bách Khoa",
    "full_name": "Trường Đại học Bách Khoa — Đại học Đà Nẵng",
    "address": "54 Nguyễn Lương Bằng, P. Hòa Khánh Bắc, Q. Liên Chiểu, Đà Nẵng",
    "danabus_routes": [
      {
        "route": "Tuyến 05",
        "stop": "Trạm Cổng ĐH Bách Khoa",
        "fare_vnd": 6000,
        "note": "Hòa Hiệp Nam — Biển Đông"
      },
      {
        "route": "Tuyến R16A",
        "stop": "Trạm Nguyễn Lương Bằng",
        "fare_vnd": 6000,
        "note": "Bến xe Kim Liên — ĐH CNTT"
      }
    ],
    "study_amenities": {
      "power_outlets": "Có sẵn tại các quán cà phê trục Ngô Thì Nhậm & Nguyễn Lương Bằng",
      "quiet_study": "Phù hợp học nhóm và tự học cá nhân",
      "wifi": "Wifi tốc độ cao tại điểm khảo sát"
    },
    "lunch_budget": {
      "max_price_vnd": 35000,
      "typical_dishes": "Cơm tấm, cơm gà xối mỡ, bún bò sinh viên (20k - 30k)"
    }
  },
  {
    "id": "SU_PHAM",
    "name": "Sư Phạm",
    "full_name": "Trường Đại học Sư Phạm — Đại học Đà Nẵng",
    "address": "459 Tôn Đức Thắng, P. Hòa Khánh Nam, Q. Liên Chiểu, Đà Nẵng",
    "danabus_routes": [
      {
        "route": "Tuyến 05",
        "stop": "Trạm Cổng ĐH Sư Phạm",
        "fare_vnd": 6000,
        "note": "Hòa Hiệp Nam — Biển Đông"
      },
      {
        "route": "Tuyến 07",
        "stop": "Trạm Tôn Đức Thắng",
        "fare_vnd": 6000,
        "note": "Bến xe phía Nam — Vịnh Da Nang"
      }
    ],
    "study_amenities": {
      "power_outlets": "Bố trí tại các quán trà sữa, cà phê vỉa hè & thư viện số",
      "quiet_study": "Khu vực cổng sau yên tĩnh, phù hợp đọc sách",
      "wifi": "Phủ sóng tốt"
    },
    "lunch_budget": {
      "max_price_vnd": 35000,
      "typical_dishes": "Cơm phần tự chọn, bánh canh ruộng, bún chả cá (20k - 25k)"
    }
  },
  {
    "id": "KINH_TE_DUE",
    "name": "Kinh Tế DUE",
    "full_name": "Trường Đại học Kinh Tế — Đại học Đà Nẵng",
    "address": "71 Ngũ Hành Sơn, P. Mỹ An, Q. Ngũ Hành Sơn, Đà Nẵng",
    "danabus_routes": [
      {
        "route": "Tuyến 07",
        "stop": "Trạm ĐH Kinh Tế",
        "fare_vnd": 6000,
        "note": "Bến xe phía Nam — Trung tâm"
      },
      {
        "route": "Tuyến 11",
        "stop": "Trạm Cầu Tiên Sơn",
        "fare_vnd": 6000,
        "note": "Xuân Diệu — Bến xe Tiên Sa"
      }
    ],
    "study_amenities": {
      "power_outlets": "Đầy đủ ổ cắm tại chuỗi cà phê Phan Tứ, An Thượng",
      "quiet_study": "Quán cà phê máy lạnh học bài mở 24/7",
      "wifi": "Cực mạnh"
    },
    "lunch_budget": {
      "max_price_vnd": 35000,
      "typical_dishes": "Cơm niêu sinh viên, bún thịt nướng, mì cay (25k - 35k)"
    }
  },
  {
    "id": "DUY_TAN",
    "name": "Duy Tân",
    "full_name": "Đại học Duy Tân (Các cơ sở trung tâm & Hòa Khánh)",
    "address": "254 Nguyễn Văn Linh, 03 Quang Trung & 120 Hoàng Minh Thảo, Đà Nẵng",
    "danabus_routes": [
      {
        "route": "Tuyến 02",
        "stop": "Trạm Nguyễn Văn Linh",
        "fare_vnd": 6000,
        "note": "Trung tâm thành phố"
      },
      {
        "route": "Tuyến 11",
        "stop": "Trạm Quang Trung",
        "fare_vnd": 6000,
        "note": "Bệnh viện Đa Khoa — Xuân Diệu"
      }
    ],
    "study_amenities": {
      "power_outlets": "Ổ cắm bàn dài tại chuỗi cà phê trục Nguyễn Văn Linh & Quang Trung",
      "quiet_study": "Phòng tự học & không gian Co-working",
      "wifi": "Tốc độ cao"
    },
    "lunch_budget": {
      "max_price_vnd": 35000,
      "typical_dishes": "Cơm văn phòng sinh viên, bánh mì chảo, bún đậu (25k - 35k)"
    }
  },
  {
    "id": "NGOAI_NGU",
    "name": "Ngoại Ngữ",
    "full_name": "Trường Đại học Ngoại Ngữ — Đại học Đà Nẵng",
    "address": "131 Lương Nhữ Hộc, P. Khuê Trung, Q. Cẩm Lệ, Đà Nẵng",
    "danabus_routes": [
      {
        "route": "Tuyến 09",
        "stop": "Trạm Lương Nhữ Hộc",
        "fare_vnd": 6000,
        "note": "Bến xe phía Nam — Trung tâm"
      },
      {
        "route": "Tuyến 08",
        "stop": "Trạm Cách Mạng Tháng 8",
        "fare_vnd": 6000,
        "note": "Hòa Cường — Cẩm Lệ"
      }
    ],
    "study_amenities": {
      "power_outlets": "Trang bị tại các quán cà phê sinh viên quanh khuôn viên",
      "quiet_study": "Khuôn viên xanh, yên tĩnh",
      "wifi": "Ổn định"
    },
    "lunch_budget": {
      "max_price_vnd": 35000,
      "typical_dishes": "Cơm đĩa gia đình, bún hến, xôi gà xé (20k - 30k)"
    }
  }
];

  const BENTO_TIME_WINDOWS = [
    { id: "MORNING", startMins: 420, endMins: 660, start: "07:00", end: "11:00", theme: "Điểm tâm sáng & cà phê tiết kiệm", icon: "☕" },
    { id: "LUNCH", startMins: 660, endMins: 840, start: "11:00", end: "14:00", theme: "Cơm trưa cứu đói (≤35k)", maxPriceVnd: 35000, icon: "🍱" },
    { id: "AFTERNOON", startMins: 840, endMins: 1080, start: "14:00", end: "18:00", theme: "Cà phê học bài & xe buýt DanaBus", icon: "📚" },
    { id: "EVENING", startMins: 1080, endMins: 1380, start: "18:00", end: "23:00", theme: "Phim tối & ăn nhóm bạn", icon: "🎬" },
    { id: "LATE_NIGHT", startMins: 0, endMins: 420, start: "23:00", end: "07:00", theme: "Kế hoạch ngày mai & Quán đêm mở muộn", icon: "🌙" }
  ];

  let selectedCampusFilter = 'ALL';
  let bentoFilterLatencyLog = [];

  function getCurrentTimeMinutes() {
    if (typeof window !== 'undefined' && window.__JAYT_CLOCK__) {
      const parts = String(window.__JAYT_CLOCK__).split(':');
      const h = parseInt(parts[0], 10) || 0;
      const m = parseInt(parts[1], 10) || 0;
      return h * 60 + m;
    }
    try {
      const now = new Date();
      const parts = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Ho_Chi_Minh',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false
      }).formatToParts(now);
      const h = parseInt(parts.find(p => p.type === 'hour').value, 10);
      const m = parseInt(parts.find(p => p.type === 'minute').value, 10);
      return h * 60 + m;
    } catch (e) {
      const d = new Date();
      return d.getHours() * 60 + d.getMinutes();
    }
  }

  function getActiveTimeWindow() {
    const mins = getCurrentTimeMinutes();
    if (mins >= 420 && mins < 660) return BENTO_TIME_WINDOWS[0];
    if (mins >= 660 && mins < 840) return BENTO_TIME_WINDOWS[1];
    if (mins >= 840 && mins < 1080) return BENTO_TIME_WINDOWS[2];
    if (mins >= 1080 && mins < 1380) return BENTO_TIME_WINDOWS[3];
    return BENTO_TIME_WINDOWS[4];
  }

  function getBentoCardsForWindowAndCampus(activeWindow, campusId) {
    const cards = [];
    const campus = CAMPUS_CLUSTERS.find(c => c.id === campusId);

    // 1. Hero Bento Card
    if (activeWindow.id === 'MORNING') {
      cards.push({
        id: 'BENTO_MORNING_HERO',
        type: 'hero',
        tag: '☕ Điểm tâm sáng',
        tagClass: 'tag-food',
        title: campus ? `Điểm tâm & Cà phê sáng gần ${campus.name}` : 'Điểm tâm sáng & Cà phê tiết kiệm Đà Nẵng',
        desc: campus ? `Quán cà phê cóc và điểm tâm sinh viên trục ${campus.address.split(',')[0]}. Ổ cắm có sẵn, wifi học bài.` : 'Khởi đầu ngày mới với cà phê phin và điểm tâm bình dân 15k - 25k khắp các cụm trường đại học Đà Nẵng.',
        price: '15.000 ₫ - 25.000 ₫',
        amenities: ['Ổ cắm điện', 'Wifi mở', 'Mở từ 06:30', 'Giá sinh viên'],
        cta: { text: 'Xem vị trí cụm trường ↗', action: 'CAMPUS' }
      });
    } else if (activeWindow.id === 'LUNCH') {
      cards.push({
        id: 'BENTO_LUNCH_HERO',
        type: 'hero',
        tag: '🍱 Cơm trưa cứu đói ≤35k',
        tagClass: 'tag-food',
        title: campus ? `Cơm trưa sinh viên ${campus.name} (≤35.000₫)` : 'Cơm trưa sinh viên tiết kiệm Đà Nẵng (≤35.000₫)',
        desc: campus ? `Các quán cơm phần, cơm tấm, bún thịt nướng quanh ${campus.address.split(',')[0]} với mức giá cam kết không quá 35k/suất.` : 'Tổng hợp các suất cơm trưa nóng sốt, no bụng, bảo đảm mức giá thực trả từ 20.000đ đến 35.000đ.',
        price: '20.000 ₫ - 35.000 ₫ (Cam kết ≤ 35k)',
        amenities: ['Cơm thêm miễn phí', 'Trà đá miễn phí', 'Phục vụ 10:30-13:30', 'Thanh toán QR'],
        cta: { text: 'Xem thực đơn trưa ↗', action: 'LUNCH' }
      });
    } else if (activeWindow.id === 'AFTERNOON') {
      cards.push({
        id: 'BENTO_AFTERNOON_HERO',
        type: 'hero',
        tag: '📚 Cà phê học bài & DanaBus',
        tagClass: 'tag-study',
        title: campus ? `Không gian tự học & Bus trạm ${campus.name}` : 'Cà phê học bài có ổ cắm & Tuyến DanaBus 6K',
        desc: campus ? `Quán cà phê bàn rộng, ổ cắm từng bàn và trạm DanaBus ngay trước cổng ${campus.name} giá vé chỉ 6.000₫.` : 'Không gian học tập yên tĩnh, wifi mạnh, đầy đủ ổ cắm cùng mạng lưới DanaBus 6k kết nối 5 cụm trường đại học.',
        price: 'DanaBus 6.000 ₫ / lượt',
        amenities: ['Ổ cắm từng bàn', 'Yên tĩnh học bài', 'DanaBus 6k', 'Wifi 5GHz'],
        cta: { text: 'Xem trạm xe buýt ↗', action: 'BUS' }
      });
    } else if (activeWindow.id === 'EVENING') {
      cards.push({
        id: 'BENTO_EVENING_HERO',
        type: 'hero',
        tag: '🎬 Phim tối & Kèo ăn nhóm',
        tagClass: 'tag-cinema',
        title: campus ? `Rạp chiếu phim & Ăn nhóm gần ${campus.name}` : 'Vé xem phim U22 & Kèo ăn nhóm chia bill',
        desc: campus ? `Ưu đãi vé U22 chỉ từ 45k tại Starlight, Galaxy, Metiz cùng các combo ẩm thực chia đều từng đồng.` : 'Lựa chọn rạp chiếu phim giá sinh viên U22 (45k-55k) và các quán ăn nhóm bạn tích hợp Chia Bill Pro & Vé Zalo Pass.',
        price: 'Vé U22 từ 45.000 ₫',
        amenities: ['Vé U22 45k-55k', 'Chia bill từng đồng', 'Zalo Pass', 'Đặt vé online'],
        cta: { text: 'Mở Ví Voucher rạp ↗', action: 'CINEMA' }
      });
    } else {
      cards.push({
        id: 'BENTO_LATE_HERO',
        type: 'hero',
        tag: '🌙 Kế hoạch ngày mai & Ăn đêm',
        tagClass: 'tag-bus',
        title: 'Kế hoạch ngày mai & Các quán đêm mở muộn',
        desc: 'Thông tin các tiệm mì, cơm chiên đêm mở đến 02:00 sáng tại phố ẩm thực cùng lịch trình tuyến DanaBus sáng mai. Không hiển thị các quán đã đóng cửa là đang mở.',
        price: 'Ăn đêm từ 25.000 ₫',
        amenities: ['Mở muộn 02:00', 'Không gian đêm', 'Lịch DanaBus sáng', 'Minh bạch giờ mở'],
        cta: { text: 'Xem tuyến bus sáng mai ↗', action: 'TOMORROW' }
      });
    }

    // 2. Sub-bento: DanaBus transit connectivity card
    if (campus && campus.danabus_routes && campus.danabus_routes.length > 0) {
      cards.push({
        id: 'BENTO_DANABUS_' + campus.id,
        type: 'sub-bento',
        tag: '🚌 DanaBus 6K Trợ Giá',
        tagClass: 'tag-bus',
        title: `Xe buýt trạm ${campus.name}`,
        desc: `Kết nối thuận tiện: ${campus.danabus_routes.map(r => r.route + ' (' + r.note + ')').join('; ')}.`,
        price: '6.000 ₫ / vé lượt (HSSV)',
        amenities: ['Vé tháng trợ giá', 'Trạm đón cách cổng <200m', 'Máy lạnh 100%'],
        cta: { text: 'Tra cứu DanaBus ↗', action: 'DANABUS_INFO' }
      });
    } else {
      cards.push({
        id: 'BENTO_DANABUS_CITY',
        type: 'sub-bento',
        tag: '🚌 DanaBus Mạng Lưới Xe Buýt',
        tagClass: 'tag-bus',
        title: 'DanaBus — Kết nối 5 Cụm Trường Đại Học',
        desc: 'Mạng lưới xe buýt trợ giá Đà Nẵng kết nối Bách Khoa, Sư Phạm, DUE, Duy Tân và Ngoại Ngữ đồng giá 6k.',
        price: '6.000 ₫ / lượt',
        amenities: ['Tuyến 05, 07, 09, 11', 'Trợ giá sinh viên', 'Xe buýt điện xanh'],
        cta: { text: 'Xem thông tin DanaBus ↗', action: 'DANABUS_INFO' }
      });
    }

    // 3. Sub-bento: Study space & Outlets
    if (campus) {
      cards.push({
        id: 'BENTO_STUDY_' + campus.id,
        type: 'sub-bento',
        tag: '⚡ Ổ cắm & Không gian học',
        tagClass: 'tag-study',
        title: `Góc học bài cụm ${campus.name}`,
        desc: campus.study_amenities.power_outlets + '. ' + campus.study_amenities.quiet_study,
        price: 'Từ 20.000 ₫ / đồ uống',
        amenities: ['Nhiều ổ cắm', 'Wifi mạnh', 'Yên tĩnh', 'Mở cả ngày'],
        cta: { text: 'Mở Ví Voucher đồ uống ↗', action: 'DRINK_VOUCHERS' }
      });
    } else {
      cards.push({
        id: 'BENTO_STUDY_CITY',
        type: 'sub-bento',
        tag: '⚡ Ổ cắm & Không gian tự học',
        tagClass: 'tag-study',
        title: 'Chuỗi Cà Phê Học Bài Sinh Viên Đà Nẵng',
        desc: 'Gợi ý các quán Phúc Long, Katinat, Highlands và quán cóc học bài có trang bị ổ cắm từng bàn.',
        price: 'Ưu đãi hội viên tích điểm',
        amenities: ['Phúc Long App giảm 5k', 'Katinat K-Club', 'Highlands Rewards'],
        cta: { text: 'Xem Voucher cà phê ↗', action: 'DRINK_VOUCHERS' }
      });
    }

    // 4. Sub-bento: Hot voucher or group deal
    const relevantDeal = VOUCHER_VAULT_ITEMS.find(v => {
      if (v.is_discovery || v.tier === 'PRICE_OBSERVATION') return false;
      if (campusId === 'ALL') return true;
      return v.campus_tags && v.campus_tags.includes(campusId);
    }) || VOUCHER_VAULT_ITEMS[0];

    if (relevantDeal) {
      cards.push({
        id: 'BENTO_DEAL_' + relevantDeal.id,
        type: 'sub-bento',
        tag: '🎟️ Deal Nổi Bật',
        tagClass: 'tag-cinema',
        title: relevantDeal.title,
        desc: `Thương hiệu ${relevantDeal.brand}. ${relevantDeal.locality_basis}`,
        price: relevantDeal.price_vnd ? formatVndPrice(relevantDeal.price_vnd) : 'Ưu đãi hội viên',
        amenities: [relevantDeal.brand, relevantDeal.cta_label, 'Bảo toàn số dư'],
        cta: { text: relevantDeal.cta_label, action: 'DEAL', dealId: relevantDeal.id, sourceUrl: relevantDeal.source_url }
      });
    }

    return cards;
  }

  function renderBentoHub(campusFilter) {
    const activeWindow = getActiveTimeWindow();
    const currentCampus = campusFilter || selectedCampusFilter || 'ALL';
    const cards = getBentoCardsForWindowAndCampus(activeWindow, currentCampus);

    return `
      <section class="bento-hub-section" id="bento-hub" aria-label="Bento Hub Hôm nay ăn gì đi đâu">
        <div class="bento-header-lockup">
          <div class="bento-time-pill" id="bento-active-time-pill" aria-live="polite">
            <span class="live-pulse-dot" aria-hidden="true"></span>
            <span id="bento-time-label">${activeWindow.icon} Khung giờ ${activeWindow.start} - ${activeWindow.end}</span>
          </div>
          <h1 class="bento-main-heading">Hôm nay ăn gì — đi đâu?</h1>
          <p class="bento-subheading" id="bento-theme-subheading">${activeWindow.theme}</p>
        </div>

        <!-- Campus Filters Bar -->
        <div class="bento-campus-bar" role="group" aria-label="Lọc theo cụm trường đại học Đà Nẵng">
          <button class="bento-campus-btn ${currentCampus === 'ALL' ? 'active' : ''}" data-campus-filter="ALL" aria-pressed="${currentCampus === 'ALL'}">Tất cả</button>
          <button class="bento-campus-btn ${currentCampus === 'BACH_KHOA' ? 'active' : ''}" data-campus-filter="BACH_KHOA" aria-pressed="${currentCampus === 'BACH_KHOA'}">🏫 Bách Khoa</button>
          <button class="bento-campus-btn ${currentCampus === 'SU_PHAM' ? 'active' : ''}" data-campus-filter="SU_PHAM" aria-pressed="${currentCampus === 'SU_PHAM'}">📚 Sư Phạm</button>
          <button class="bento-campus-btn ${currentCampus === 'KINH_TE_DUE' ? 'active' : ''}" data-campus-filter="KINH_TE_DUE" aria-pressed="${currentCampus === 'KINH_TE_DUE'}">💼 Kinh Tế DUE</button>
          <button class="bento-campus-btn ${currentCampus === 'DUY_TAN' ? 'active' : ''}" data-campus-filter="DUY_TAN" aria-pressed="${currentCampus === 'DUY_TAN'}">🎓 Duy Tân</button>
          <button class="bento-campus-btn ${currentCampus === 'NGOAI_NGU' ? 'active' : ''}" data-campus-filter="NGOAI_NGU" aria-pressed="${currentCampus === 'NGOAI_NGU'}">🌐 Ngoại Ngữ</button>
        </div>

        <!-- Bento Grid -->
        <div class="bento-grid" id="bento-grid-container" role="region" aria-live="polite">
          ${cards.map(c => `
            <article class="bento-card ${c.type === 'hero' ? 'hero-bento' : 'sub-bento'}" aria-label="${c.title}">
              <span class="bento-badge-tag ${c.tagClass}">${c.tag}</span>
              <h2 class="bento-card-title">${c.title}</h2>
              <p class="bento-card-desc">${c.desc}</p>
              ${c.price ? `<div class="bento-price-highlight">${c.price}</div>` : ''}
              <div class="bento-amenities">
                ${c.amenities.map(a => `<span class="amenity-pill">${a}</span>`).join('')}
              </div>
              <div style="margin-top: auto; padding-top: 10px;">
                <button type="button" class="btn-rail-action bento-card-action-btn" data-bento-action="${c.cta.action}" data-url="${c.cta.sourceUrl || ''}" data-deal-id="${c.cta.dealId || ''}" style="width: 100%; justify-content: center; background: #0284c7; color: #fff; border: none; border-radius: 8px; padding: 10px 14px; font-weight: 700; cursor: pointer; min-height: 44px;">
                  ${c.cta.text}
                </button>
              </div>
            </article>
          `).join('')}
        </div>
      </section>
    `;
  }

  function renderActiveBentoHub() {
    const hub = document.getElementById('bento-hub');
    if (!hub) return;
    const parent = hub.parentElement;
    if (!parent) return;
    const activeWindow = getActiveTimeWindow();
    const timeLabel = document.getElementById('bento-time-label');
    const themeSub = document.getElementById('bento-theme-subheading');
    if (timeLabel) timeLabel.innerHTML = activeWindow.icon + ' Khung giờ ' + activeWindow.start + ' - ' + activeWindow.end;
    if (themeSub) themeSub.textContent = activeWindow.theme;

    const cards = getBentoCardsForWindowAndCampus(activeWindow, selectedCampusFilter);
    const gridContainer = document.getElementById('bento-grid-container');
    if (gridContainer) {
      gridContainer.innerHTML = cards.map(c => `
        <article class="bento-card ${c.type === 'hero' ? 'hero-bento' : 'sub-bento'}" aria-label="${c.title}">
          <span class="bento-badge-tag ${c.tagClass}">${c.tag}</span>
          <h2 class="bento-card-title">${c.title}</h2>
          <p class="bento-card-desc">${c.desc}</p>
          ${c.price ? `<div class="bento-price-highlight">${c.price}</div>` : ''}
          <div class="bento-amenities">
            ${c.amenities.map(a => `<span class="amenity-pill">${a}</span>`).join('')}
          </div>
          <div style="margin-top: auto; padding-top: 10px;">
            <button type="button" class="btn-rail-action bento-card-action-btn" data-bento-action="${c.cta.action}" data-url="${c.cta.sourceUrl || ''}" data-deal-id="${c.cta.dealId || ''}" style="width: 100%; justify-content: center; background: #0284c7; color: #fff; border: none; border-radius: 8px; padding: 10px 14px; font-weight: 700; cursor: pointer; min-height: 44px;">
              ${c.cta.text}
            </button>
          </div>
        </article>
      `).join('');
      attachBentoCardActionEvents();
    }
  }

  if (typeof window !== 'undefined') {
    window.setJaytClock = function(timeStr) {
      window.__JAYT_CLOCK__ = timeStr;
      renderActiveBentoHub();
    };
    window.addEventListener('jayt-clock-change', () => {
      renderActiveBentoHub();
    });
  }

  function attachBentoHubEvents() {
    const campusBtns = document.querySelectorAll('[data-campus-filter]');
    campusBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const t0 = performance.now();
        const targetCampus = btn.getAttribute('data-campus-filter');
        selectedCampusFilter = targetCampus;

        campusBtns.forEach(b => {
          const isAct = b.getAttribute('data-campus-filter') === targetCampus;
          b.classList.toggle('active', isAct);
          b.setAttribute('aria-pressed', String(isAct));
        });

        const activeWindow = getActiveTimeWindow();
        const cards = getBentoCardsForWindowAndCampus(activeWindow, targetCampus);
        const gridContainer = document.getElementById('bento-grid-container');
        if (gridContainer) {
          gridContainer.innerHTML = cards.map(c => `
            <article class="bento-card ${c.type === 'hero' ? 'hero-bento' : 'sub-bento'}" aria-label="${c.title}">
              <span class="bento-badge-tag ${c.tagClass}">${c.tag}</span>
              <h2 class="bento-card-title">${c.title}</h2>
              <p class="bento-card-desc">${c.desc}</p>
              ${c.price ? `<div class="bento-price-highlight">${c.price}</div>` : ''}
              <div class="bento-amenities">
                ${c.amenities.map(a => `<span class="amenity-pill">${a}</span>`).join('')}
              </div>
              <div style="margin-top: auto; padding-top: 10px;">
                <button type="button" class="btn-rail-action bento-card-action-btn" data-bento-action="${c.cta.action}" data-url="${c.cta.sourceUrl || ''}" data-deal-id="${c.cta.dealId || ''}" style="width: 100%; justify-content: center; background: #0284c7; color: #fff; border: none; border-radius: 8px; padding: 10px 14px; font-weight: 700; cursor: pointer; min-height: 44px;">
                  ${c.cta.text}
                </button>
              </div>
            </article>
          `).join('');
          attachBentoCardActionEvents();
        }

        const t1 = performance.now();
        const latencyMs = Math.round((t1 - t0) * 100) / 100;
        bentoFilterLatencyLog.push(latencyMs);
        if (typeof window !== 'undefined') {
          window.__LAST_BENTO_LATENCY_MS__ = latencyMs;
          window.__BENTO_LATENCY_LOG__ = bentoFilterLatencyLog;
        }
      });
    });

    attachBentoCardActionEvents();
  }

  function attachBentoCardActionEvents() {
    document.querySelectorAll('.bento-card-action-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const action = btn.getAttribute('data-bento-action');
        const url = btn.getAttribute('data-url');
        if (action === 'DEAL' && url) {
          window.open(url, '_blank', 'noopener,noreferrer');
        } else if (action === 'CINEMA' || action === 'DRINK_VOUCHERS') {
          navigateTo('VOUCHER_HUB');
        } else if (action === 'BUS' || action === 'DANABUS_INFO') {
          navigateTo('EXPLORE');
        } else {
          navigateTo('VOUCHER_HUB');
        }
      });
    });
  }

  // =========================================================================
  // JAYT-363 WORKSTREAM 4: ZALO PASS BOARDING PASS CANVAS GENERATOR
  // =========================================================================
  function renderZaloPassModalHtml() {
    return `
      <div id="zalo-pass-modal" class="zalo-pass-overlay" style="display: none;" role="dialog" aria-modal="true" aria-labelledby="zalo-pass-title">
        <div class="zalo-pass-modal-box">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
            <h2 id="zalo-pass-title" style="font-size: 1.2rem; font-weight: 800; margin: 0; color: var(--text-primary);">
              🍿 Vé Kèo Rủ Bạn (Zalo Pass)
            </h2>
            <button id="btn-close-zalo-pass" style="background: none; border: none; font-size: 1.5rem; cursor: pointer; color: var(--text-muted);" aria-label="Đóng">&times;</button>
          </div>

          <p style="font-size: 0.88rem; color: var(--text-secondary); margin: 0 0 14px 0;">
            Vé rủ bạn minh bạch được tạo trực tiếp tại trình duyệt. Bảo toàn số dư từng đồng, không lưu trữ thông tin cá nhân.
          </p>

          <canvas id="zalo-pass-canvas" width="600" height="750" style="display: none;"></canvas>

          <div class="zalo-pass-preview-container">
            <img id="zalo-pass-preview-img" class="zalo-pass-img" src="" alt="Xem trước vé kèo rủ bạn Zalo Pass">
          </div>

          <div class="zalo-pass-actions">
            <button type="button" id="btn-trigger-zalo-share" class="btn-zalo-share" aria-label="Chia sẻ vé qua Zalo hoặc ứng dụng khác">
              📤 Chia sẻ vé kèo (Zalo / Chia sẻ) ↗
            </button>
            <div style="display: flex; gap: 8px;">
              <button type="button" id="btn-download-zalo-pass" class="btn-zalo-download" style="flex: 1;" aria-label="Tải ảnh vé về máy">
                📥 Tải ảnh vé PNG
              </button>
              <button type="button" id="btn-copy-zalo-text" class="btn-zalo-copy-text" style="flex: 1;" aria-label="Sao chép nội dung tin nhắn kèo">
                📋 Sao chép tin nhắn
              </button>
            </div>
          </div>
          <div id="zalo-pass-toast" style="display: none; margin-top: 12px; padding: 8px 12px; border-radius: 6px; background: #f0fdf4; color: #166534; font-size: 0.85rem; font-weight: 600; text-align: center;">
            ✓ Đã xử lý thành công!
          </div>
        </div>
      </div>
    `;
  }

  if (typeof window !== "undefined") window.openZaloPassModal = openZaloPassModal;
  function openZaloPassModal(title, totalVnd, groupCount) {
    let modal = document.getElementById('zalo-pass-modal');
    if (!modal) {
      const modalWrapper = document.createElement('div');
      modalWrapper.innerHTML = renderZaloPassModalHtml();
      document.body.appendChild(modalWrapper.firstElementChild);
      modal = document.getElementById('zalo-pass-modal');
    }

    const canvas = document.getElementById('zalo-pass-canvas');
    const previewImg = document.getElementById('zalo-pass-preview-img');
    const closeBtn = document.getElementById('btn-close-zalo-pass');
    const shareBtn = document.getElementById('btn-trigger-zalo-share');
    const downloadBtn = document.getElementById('btn-download-zalo-pass');
    const copyTextBtn = document.getElementById('btn-copy-zalo-text');
    const toast = document.getElementById('zalo-pass-toast');

    const bill = parseInt(totalVnd, 10) || 100000;
    const count = parseInt(groupCount, 10) || 4;
    const splitResult = calculateIntegerSplit(bill, count);

    const now = new Date();
    const timeStr = now.toLocaleDateString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' }) + ' ' + now.toLocaleTimeString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh', hour: '2-digit', minute: '2-digit' });

    let remainderNote = '(Chia đều chính xác 100% từng đồng lẻ)';
    if (splitResult.remainder > 0) {
      remainderNote = `${splitResult.remainder} bạn: ${formatVndPrice(splitResult.baseShare + 1)}, ${count - splitResult.remainder} bạn: ${formatVndPrice(splitResult.baseShare)}`;
    }

    const companionMessage = `🍿 [JAYT - VÉ KÈO RỦ BẠN]\n🎟️ Kèo: ${title}\n👥 Số người: ${count} người\n💰 Mỗi người: ${formatVndPrice(splitResult.baseShare)}\n${splitResult.remainder > 0 ? '👉 Chi tiết số dư: ' + remainderNote + '\n' : ''}🔗 Đối soát bảng tính tại: https://jayt-production-v3420.vercel.app`;

    // Draw Boarding Pass on Canvas
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    // Background
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, w, h);

    // Gradient card header
    const grad = ctx.createLinearGradient(0, 0, w, 200);
    grad.addColorStop(0, '#0284c7');
    grad.addColorStop(0.5, '#0369a1');
    grad.addColorStop(1, '#0f172a');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, 180);

    // Notch cutouts coordinate
    const notchRadius = 24;
    const notchY = 460;

    // Header Title
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 22px system-ui, -apple-system, sans-serif';
    ctx.fillText('JAYT PLATFORM • VÉ KÈO RỦ BẠN', 40, 55);

    ctx.fillStyle = '#e0f2fe';
    ctx.font = '14px system-ui, -apple-system, sans-serif';
    ctx.fillText('Chia Bill Minh Bạch — Bảo Toàn Từng Đồng Lẻ', 40, 85);

    // Event / Deal title
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 24px system-ui, -apple-system, sans-serif';
    const displayTitle = title.length > 34 ? title.slice(0, 32) + '...' : title;
    ctx.fillText(displayTitle, 40, 140);

    // Body container
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(30, 200, w - 60, 230);

    // Group size & Amount per person
    ctx.fillStyle = '#94a3b8';
    ctx.font = '14px system-ui, -apple-system, sans-serif';
    ctx.fillText('SỐ NGƯỜI THAM GIA', 50, 240);
    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 22px system-ui, -apple-system, sans-serif';
    ctx.fillText(`${count} người`, 50, 275);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '14px system-ui, -apple-system, sans-serif';
    ctx.fillText('MỖI BẠN CHUYỂN', 320, 240);
    ctx.fillStyle = '#f43f5e';
    ctx.font = 'bold 26px system-ui, -apple-system, sans-serif';
    ctx.fillText(`${formatVndPrice(splitResult.baseShare)}`, 320, 275);

    // Total amount & Remainder breakdown
    ctx.fillStyle = '#94a3b8';
    ctx.font = '14px system-ui, -apple-system, sans-serif';
    ctx.fillText('TỔNG HÓA ĐƠN', 50, 330);
    ctx.fillStyle = '#f1f5f9';
    ctx.font = 'bold 20px system-ui, -apple-system, sans-serif';
    ctx.fillText(`${formatVndPrice(bill)}`, 50, 360);

    ctx.fillStyle = '#38bdf8';
    ctx.font = '13px system-ui, -apple-system, sans-serif';
    ctx.fillText(remainderNote, 50, 400);

    // Dashed tear line across the canvas
    ctx.beginPath();
    ctx.setLineDash([8, 6]);
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 2;
    ctx.moveTo(0, notchY);
    ctx.lineTo(w, notchY);
    ctx.stroke();
    ctx.setLineDash([]); // reset dash

    // Draw semi-circle notch cutouts on canvas edges
    ctx.fillStyle = '#020617';
    ctx.beginPath();
    ctx.arc(0, notchY, notchRadius, -Math.PI / 2, Math.PI / 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(w, notchY, notchRadius, Math.PI / 2, -Math.PI / 2);
    ctx.fill();

    // Bottom section: Link, date, security
    ctx.fillStyle = '#e2e8f0';
    ctx.font = 'bold 15px system-ui, -apple-system, sans-serif';
    ctx.fillText('🔗 Đối soát: https://jayt-production-v3420.vercel.app', 50, 520);

    ctx.fillStyle = '#64748b';
    ctx.font = '13px system-ui, -apple-system, sans-serif';
    ctx.fillText(`🕒 Thời gian xuất vé: ${timeStr}`, 50, 550);
    ctx.fillText('🔒 Zero-PII: Không lưu trữ thông tin cá nhân, không truy cập GPS', 50, 580);

    // Simulated clean modern barcode
    const barcodeY = 620;
    const barcodeHeight = 45;
    ctx.fillStyle = '#38bdf8';
    for (let x = 60; x < w - 60; x += 6) {
      const barWidth = ((x % 12 === 0) || (x % 18 === 0)) ? 3 : 1.5;
      ctx.fillRect(x, barcodeY, barWidth, barcodeHeight);
    }

    ctx.fillStyle = '#64748b';
    ctx.font = '11px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('JAYT-363 • TICKET ID: PASS-' + Math.random().toString(36).substring(2, 8).toUpperCase(), w / 2, 690);
    ctx.textAlign = 'left';

    // Convert canvas to Data URL
    const pngDataUrl = canvas.toDataURL('image/png');
    previewImg.src = pngDataUrl;

    function showToast(msg) {
      if (toast) {
        toast.textContent = msg;
        toast.style.display = 'block';
        setTimeout(() => { toast.style.display = 'none'; }, 3000);
      }
    }

    // Handlers
    closeBtn.onclick = () => { modal.style.display = 'none'; };
    modal.onclick = (e) => { if (e.target === modal) modal.style.display = 'none'; };

    downloadBtn.onclick = () => {
      const a = document.createElement('a');
      a.href = pngDataUrl;
      a.download = 've-keo-ru-ban-jayt.png';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      showToast('✓ Đã tải ảnh vé PNG về máy!');
    };

    copyTextBtn.onclick = () => {
      navigator.clipboard.writeText(companionMessage).then(() => {
        showToast('✓ Đã sao chép tin nhắn kèo!');
      }).catch(() => {
        showToast('✓ Vui lòng sao chép nội dung tin nhắn thủ công');
      });
    };

    shareBtn.onclick = async () => {
      try {
        if (navigator.share && navigator.canShare) {
          const res = await fetch(pngDataUrl);
          const blob = await res.blob();
          const file = new File([blob], 've-keo-ru-ban-jayt.png', { type: 'image/png' });
          if (navigator.canShare({ files: [file] })) {
            await navigator.share({
              title: 'Vé Kèo Rủ Bạn - JayT Platform',
              text: companionMessage,
              files: [file]
            });
            showToast('✓ Đã mở hộp thoại chia sẻ!');
            return;
          }
        }
      } catch (err) {}
      // Fallback
      downloadBtn.click();
      copyTextBtn.click();
      showToast('✓ Đã tải ảnh và sao chép tin nhắn để gửi Zalo!');
    };

    modal.style.display = 'flex';
  }

  function attachZaloPassButtons() {
    document.querySelectorAll('.btn-zalo-pass-trigger').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const title = btn.getAttribute('data-zalo-title') || 'Kèo Ăn Uống Sinh Viên';
        const price = btn.getAttribute('data-zalo-price') || '100000';
        openZaloPassModal(title, price, 4);
      });
    });
  }


function renderDailyGuideHome() {
    setTimeout(() => {
      attachHomeCalendarEvents();
      attachBentoHubEvents();
      attachZaloPassButtons();
    }, 0);

    const actionableVouchers = VOUCHER_VAULT_ITEMS.filter(i => !i.is_discovery && !i.is_ordinary_observed_price);

    return `
      <div class="cr-experience-container">
        <!-- FIRST VIEWPORT: BENTO HUB HÔM NAY ĂN GÌ ĐI ĐÂU (JAYT-363 MANDATE) -->
        ${renderBentoHub('ALL')}

        <!-- FEATURED HOT VOUCHERS SECTION (34 ACTIONABLE DEALS) -->
        <section class="home-hot-vouchers-section" aria-label="Ưu đãi nổi bật Ví Voucher" style="margin: 24px 0;">
          <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; margin-bottom: 16px;">
            <div>
              <h2 style="font-size: 1.35rem; font-weight: 800; color: var(--text-primary); margin: 0 0 4px 0;">
                🎟️ Ví Voucher Xác Minh — Ưu Đãi Nổi Bật (${actionableVouchers.length} Mục)
              </h2>
              <p style="font-size: 0.88rem; color: var(--text-secondary); margin: 0;">
                ${actionableVouchers.length} ưu đãi F&B và rạp chiếu phim đang hoạt động thực tế tại Đà Nẵng.
              </p>
            </div>
            <button class="btn-rail-action" data-nav="VOUCHER_HUB" style="background: #e0f2fe; color: #0369a1; border: 1px solid #bae6fd; font-weight: 700; padding: 8px 16px; border-radius: 6px; cursor: pointer;" aria-label="Mở toàn bộ Ví Voucher">
              Xem tất cả ${actionableVouchers.length} ưu đãi &rarr;
            </button>
          </div>
          <div class="voucher-vault-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px;">
            ${actionableVouchers.slice(0, 6).map(item => `
              <article class="voucher-card" data-tier="${item.tier}" aria-label="${item.title}">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
                  <span style="font-size: 0.75rem; font-weight: 700; color: #0369a1; background: #e0f2fe; padding: 2px 8px; border-radius: 4px;">
                    ${item.brand}
                  </span>
                  <span class="voucher-status-pill verified">ĐÃ XÁC MINH</span>
                </div>
                <h3 style="font-size: 1.02rem; font-weight: 800; color: var(--text-primary); margin: 0 0 8px 0; line-height: 1.4;">
                  ${item.title}
                </h3>
                ${item.price_vnd ? `
                  <div style="font-size: 1.15rem; font-weight: 800; color: #e11d48; margin-bottom: 8px;">
                    ${formatVndPrice(item.price_vnd)}
                  </div>
                ` : `
                  <div style="font-size: 0.95rem; font-weight: 700; color: #059669; margin-bottom: 8px;">
                    ${item.member_badge || 'Ưu đãi hội viên'}
                  </div>
                `}
                <p style="font-size: 0.82rem; color: var(--text-secondary); margin: 0 0 12px 0;">
                  📍 ${item.locality_basis}
                </p>
                <div style="margin-top: auto; display: flex; flex-direction: column; gap: 8px;">
                  <a href="${item.source_url}" target="_blank" rel="noopener noreferrer nofollow" class="btn-rail-action" style="width: 100%; justify-content: center; background: var(--bg-card-subtle); color: var(--text-primary); border: 1px solid var(--border-subtle); padding: 8px 12px; border-radius: 6px; text-decoration: none; font-size: 0.85rem; font-weight: 600; min-height: 44px; display: inline-flex; align-items: center;">
                    ${item.cta_label || 'Xem điều kiện áp dụng ↗'}
                  </a>
                  ${item.price_vnd ? `
                    <button type="button" class="btn-zalo-pass-trigger" data-zalo-title="${item.title}" data-zalo-price="${item.price_vnd}" style="width: 100%; background: #eff6ff; color: #1d4ed8; border: 1px solid #bfdbfe; padding: 8px 12px; border-radius: 6px; font-size: 0.85rem; font-weight: 700; cursor: pointer; min-height: 44px; display: inline-flex; align-items: center; justify-content: center; gap: 6px;" aria-label="Xuất vé kèo rủ bạn cho ${item.title}">
                      🍿 Xuất Vé Kèo Rủ Bạn (Zalo Pass) ↗
                    </button>
                  ` : ''}
                </div>
              </article>
            `).join('')}
          </div>
        </section>

        ${renderHomeCalendarStrip()}

        <!-- HOME SECTION: KTX RADAR 30 PRODUCTS (JAYT-363 MANDATE) -->
        <section class="home-radar-section" aria-label="KTX Radar — 30 Sản Phẩm Khảo Sát Thực Tế" style="margin-top: 32px; margin-bottom: 24px;">
          <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; margin-bottom: 16px;">
            <div>
              <h2 style="font-size: 1.35rem; font-weight: 800; color: var(--text-primary); margin: 0 0 4px 0;">
                📡 KTX Radar — 30 Sản Phẩm Khảo Sát Thực Tế
              </h2>
              <p style="font-size: 0.88rem; color: var(--text-secondary); margin: 0;">
                Giá khảo sát thực tế — Kiểm tra tồn kho tại sàn (Ấm đun, Quạt mini, Đèn học, Chuột máy tính, USB, Sách giáo trình).
              </p>
            </div>
            <button class="btn-rail-action" data-nav="VALUE_RADAR" style="background: #e0f2fe; color: #0369a1; border: 1px solid #bae6fd; font-weight: 700; padding: 8px 16px; border-radius: 6px; cursor: pointer;" aria-label="Mở toàn bộ màn hình KTX Radar">
              Xem toàn bộ 30 sản phẩm &rarr;
            </button>
          </div>

          <div class="radar-grid" id="home-radar-grid" role="feed" aria-label="Danh sách thiết bị KTX khảo sát trên trang chủ">
            ${VALUE_RADAR_ITEMS.slice(0, 8).map(item => renderRadarCard(item)).join('')}
          </div>
        </section>

        ${renderT2DocumentationPilotCard()}
        ${renderDanaBusPublicCard()}
        ${renderUedStudentPolicyCard()}
        ${renderDigitalSignatureHealthCard()}
        ${renderUedDigitalLibraryCard()}
        ${renderCdcVaccinationSafetyCard()}
        ${renderCdcVaccineScheduleCard()}
        ${renderCdcPregnancyVaccineCard()}
        ${renderDanaBusRoute05Card()}
        ${renderDanaBusElectricConversionCard()}
        ${renderCivicOnlinePublicServiceCard()}
        ${renderCdcCommunityHealthBulletinCard()}
        ${renderDanaBusRoute03_09_14Card()}
        ${renderCivicCyberSafetyDeepfakeCard()}
        ${renderCivicEmergencyAedCard()}
        ${renderCivicFloodMapHoaXuanCard()}
        ${renderCivicCommunityWifiAnHaiCard()}
        ${renderDanabusTuyen11Card()}
        ${renderCivicDaNangAiLegalCard()}
        ${renderCivicIdentitySafetyCard()}
        ${renderCivicTamKyAdminCard()}
        ${renderCivicDigitalSkillsVNeIdCard()}
        ${renderCivicFlightInfoCard()}
        ${renderCivicChamDanceCard()}
        ${renderNeutralZeroState()}
      </div>
    `;
  }

  // 2. EXPLORE & WALLET & JOURNEY VIEWS
  

  // =========================================================================
  // TOAST NOTIFICATION UTILITY
  // =========================================================================
  function showJaytToast(message, isError) {
    const existing = document.querySelector('.jayt-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'jayt-toast';
    if (isError) toast.style.background = '#dc2626';
    toast.setAttribute('role', 'alert');
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.4s ease';
      setTimeout(() => toast.remove(), 400);
    }, 3000);
  }

  // =========================================================================
  // CLIPBOARD HELPER
  // =========================================================================
  function copyTextToClipboard(text, successMsg, failMsg) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        showJaytToast(successMsg || '✓ Đã sao chép vào bộ nhớ tạm!');
      }).catch(() => {
        fallbackCopyText(text, successMsg, failMsg);
      });
    } else {
      fallbackCopyText(text, successMsg, failMsg);
    }
  }

  function fallbackCopyText(text, successMsg, failMsg) {
    try {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.left = '-9999px';
      document.body.appendChild(textarea);
      textarea.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(textarea);
      if (ok) {
        showJaytToast(successMsg || '✓ Đã sao chép vào bộ nhớ tạm!');
      } else {
        showJaytToast(failMsg || '⚠️ Không thể tự động sao chép. Vui lòng chọn và sao chép thủ công.', true);
      }
    } catch (err) {
      showJaytToast(failMsg || '⚠️ Không thể sao chép trên thiết bị này.', true);
    }
  }

  // =========================================================================
  // FORMAT VND PRICE HELPER
  // =========================================================================
  function formatVndPrice(num) {
    if (num === null || num === undefined || isNaN(num)) return 'Theo nguồn công bố';
    return Number(num).toLocaleString('vi-VN') + ' ₫';
  }

  // =========================================================================
  // 2. MODULE 1: VOUCHER VAULT (3 TIERS)
  // =========================================================================
  function renderVoucherVaultView() {
    setTimeout(attachVoucherVaultEvents, 0);

    const actionableItems = VOUCHER_VAULT_ITEMS;
    const countActionable = actionableItems.length;
    const countPriceObs = actionableItems.filter(i => i.tier === 'PRICE_OBSERVATION').length;
    const countCounter = actionableItems.filter(i => i.tier === 'COUNTER_DEAL').length;
    const countBrand = actionableItems.filter(i => i.tier === 'BRAND_PROGRAM').length;
    const countApp = actionableItems.filter(i => i.tier === 'APP_VOUCHER').length;

    return `
      <div class="sprint-b-view-container">
        <header class="sprint-b-header">
          <h1 class="sprint-b-title">
            🎟️ Voucher Vault — Kho Ưu Đãi Đà Nẵng
            <span class="nav-badge-pill">${countActionable} ưu đãi hiệu lực</span>
          </h1>
          <p class="sprint-b-subtitle">
            Phân định rõ ràng: <strong>Giá quan sát (thực đơn/rạp)</strong>, <strong>Ưu đãi quầy</strong>, <strong>Quyền lợi thương hiệu</strong> và <strong>Voucher app</strong>. Tuân thủ lệnh J354-R1: Loại bỏ toàn bộ ưu đãi hết hạn hoặc chưa chứng minh hiệu lực hiện tại khỏi danh mục hành động.
          </p>
        </header>

        <!-- 4-TIER FILTER BAR (0 HELD EXPOSURE ON PUBLIC ROUTES) -->
        <div class="vault-tier-nav" role="group" aria-label="Bộ lọc phân tầng ưu đãi">
          <button class="vault-tier-btn active" data-vault-filter="ALL" aria-pressed="true">
            Tất cả hiệu lực <span class="nav-badge-pill">${countActionable}</span>
          </button>
          <button class="vault-tier-btn" data-vault-filter="PRICE_OBSERVATION" aria-pressed="false">
            📋 Giá quan sát <span class="nav-badge-pill">${countPriceObs}</span>
          </button>
          <button class="vault-tier-btn" data-vault-filter="COUNTER_DEAL" aria-pressed="false">
            🟢 Ưu đãi quầy <span class="nav-badge-pill">${countCounter}</span>
          </button>
          <button class="vault-tier-btn" data-vault-filter="BRAND_PROGRAM" aria-pressed="false">
            🔵 Ưu đãi thành viên <span class="nav-badge-pill">${countBrand}</span>
          </button>
          <button class="vault-tier-btn" data-vault-filter="APP_VOUCHER" aria-pressed="false">
            🟣 Claim qua App <span class="nav-badge-pill">${countApp}</span>
          </button>
        </div>

        <p id="vault-filter-status" role="status" aria-live="polite" style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 20px;">
          Đang hiển thị ${countActionable} ưu đãi có chứng cứ hiệu lực hiện tại tại Đà Nẵng (0 ưu đãi hết hạn).
        </p>

        <!-- VOUCHER GRID -->
        <div class="vault-grid" id="voucher-vault-grid" role="feed" aria-label="Danh sách thẻ ưu đãi">
          ${VOUCHER_VAULT_ITEMS.map(renderVoucherCard).join('')}
        </div>
      </div>
    `;
  }

  function renderVoucherCard(item) {
    const isHeld = !!item.held;
    let tierBadge = '';
    if (isHeld) {
      tierBadge = '<span class="vault-tier-badge" style="background: #fee2e2; color: #991b1b; border: 1px solid #fca5a5;">⛔ TẠM GIỮ (CHỜ CHỨNG CỨ HIỆU LỰC)</span>';
    } else if (item.is_discovery || item.tier === 'DISCOVERY_RECORD' || item.tier === 'DISCOVERY_ONLY') {
      tierBadge = '<span class="vault-tier-badge badge-discovery" style="background: #fef3c7; color: #92400e; border: 1px solid #fcd34d;">🔍 BẢN GHI KHÁM PHÁ</span>';
    } else if (item.tier === 'PRICE_OBSERVATION') {
      tierBadge = '<span class="vault-tier-badge badge-price-observation">📋 Giá quan sát niêm yết</span>';
    } else if (item.tier === 'COUNTER_DEAL') {
      tierBadge = '<span class="vault-tier-badge badge-counter-deal">' + (item.member_badge ? '🟢 ' + item.member_badge : '🟢 Ưu đãi tại quầy') + '</span>';
    } else if (item.tier === 'BRAND_PROGRAM') {
      tierBadge = '<span class="vault-tier-badge badge-brand-program">' + (item.member_badge ? '🔵 ' + item.member_badge : '🔵 Ưu đãi thành viên') + '</span>';
    } else {
      tierBadge = '<span class="vault-tier-badge badge-app-voucher">' + (item.member_badge ? '🟣 ' + item.member_badge : '🟣 Claim qua App') + '</span>';
    }

    const cardTierAttr = isHeld ? 'HELD' : item.tier;
    const isActionable = !isHeld;

    return `
      <article class="vault-card" data-card-id="${item.id}" ${item.batch18_id ? 'data-batch18-id="' + item.batch18_id + '"' : ''} data-card-tier="${cardTierAttr}" data-actionable="${isActionable}" style="${isHeld ? 'display: none; border-color: #fca5a5; background: #fff5f5;' : ''}" aria-label="${item.title}">
        <div class="vault-card-header">
          ${tierBadge}
          <span style="font-size: 0.75rem; color: var(--text-muted); font-family: monospace;">${item.id}</span>
        </div>

        <h2 class="vault-card-title">${item.title}</h2>
        <div class="vault-card-brand">Thương hiệu: ${item.brand}</div>

        ${(item.price_vnd && item.price_vnd > 0) ? `
          <div class="vault-card-price">
            <span>${formatVndPrice(item.price_vnd)}</span>
            <small style="font-size: 0.78rem; font-weight: 500; color: var(--text-muted);">
              ${item.tier === 'PRICE_OBSERVATION' ? '(Biểu giá quan sát niêm yết thường nhật)' : '(Giá ưu đãi thực trả)'}
            </small>
          </div>
        ` : `
          <div class="vault-card-price" style="font-size: 0.95rem; color: #0284c7;">
            <span>${item.is_discovery ? 'Bản ghi đối soát nguồn' : 'Quyền lợi hội viên / Không phát sinh phụ phí'}</span>
          </div>
        `}

        <div class="vault-meta-row">
          <strong>📍 Địa bàn:</strong> ${item.locality_basis}
        </div>

        <div class="vault-meta-row">
          <strong>⏳ Thời hạn:</strong> ${item.validity}
        </div>

        <div class="vault-meta-row">
          <strong>📋 Điều kiện:</strong> ${item.conditions}
        </div>

        <div class="vault-warning-box">
          ⚠️ <strong>Lưu ý ngân sách:</strong> ${item.budget_warning}
        </div>

        ${isHeld ? `
          <div class="vault-claim-instruction" style="background: #fee2e2; border: 1px dashed #ef4444; color: #991b1b; padding: 10px; border-radius: 6px;">
            <span>🔒 <strong>Lý do tạm giữ:</strong> ${item.held_reason || 'Đang chờ đối soát chứng cứ lá hiện tại; vô hiệu hóa mọi thao tác.'}</span>
          </div>
        ` : `
          <!-- CLAIM ACTION SECTION: 3 CTA TYPES (JAYT-361 STANDARD) -->
          <div class="vault-claim-instruction">
            ${(item.has_code && item.code) ? `
              <div style="display: flex; align-items: center; justify-content: space-between; width: 100%; gap: 10px; flex-wrap: wrap;">
                <span>Mã ưu đãi: <code>${item.code}</code></span>
                <button type="button" class="btn-copy-code" data-code="${item.code}" aria-label="Sao chép mã ${item.code}">
                  Sao chép mã
                </button>
              </div>
            ` : (item.action_type === 'APP_WALLET') ? `
              <div style="display: flex; align-items: center; justify-content: space-between; width: 100%; gap: 10px; flex-wrap: wrap;">
                <span>📱 <strong>Nhận ưu đãi qua App:</strong> ${item.claim_instruction}</span>
                <a href="${item.app_url || item.source_url}" target="_blank" rel="noopener noreferrer nofollow" class="btn-rail-action btn-app-wallet" style="background: #7c3aed; color: #ffffff; border: none; padding: 8px 14px; border-radius: 6px; text-decoration: none; font-size: 0.85rem; font-weight: 700; display: inline-flex; align-items: center; gap: 4px; min-height: 44px;" aria-label="Mở ưu đãi trên App cho ${item.title}">
                  Mở ưu đãi trên App ↗
                </a>
              </div>
            ` : (item.is_discovery || item.tier === 'DISCOVERY_RECORD' || item.tier === 'DISCOVERY_ONLY') ? `
              <div style="display: flex; align-items: center; justify-content: space-between; width: 100%; gap: 10px; flex-wrap: wrap;">
                <span>🔍 <strong>Bản ghi khám phá:</strong> ${item.claim_instruction}</span>
                <a href="${item.source_url}" target="_blank" rel="noopener noreferrer nofollow" class="btn-rail-action" style="background: #fef3c7; color: #92400e; border: 1px solid #fcd34d; padding: 8px 14px; border-radius: 6px; text-decoration: none; font-size: 0.85rem; font-weight: 700; display: inline-flex; align-items: center; gap: 4px; min-height: 44px;" aria-label="Xem website chính thức ${item.title}">
                  Xem website chính thức ↗
                </a>
              </div>
            ` : `
              <div style="display: flex; align-items: center; justify-content: space-between; width: 100%; gap: 10px; flex-wrap: wrap;">
                <span>🏷️ <strong>Cách nhận:</strong> ${item.claim_instruction}</span>
                <a href="${item.source_url}" target="_blank" rel="noopener noreferrer nofollow" class="btn-rail-action btn-counter-member" style="background: #0284c7; color: #ffffff; border: none; padding: 8px 14px; border-radius: 6px; text-decoration: none; font-size: 0.85rem; font-weight: 700; display: inline-flex; align-items: center; gap: 4px; min-height: 44px;" aria-label="Xem điều kiện áp dụng cho ${item.title}">
                  ${item.cta_label || 'Xem điều kiện áp dụng ↗'}
                </a>
              </div>
            `}
          </div>
        `}

        <div class="vault-meta-row" style="font-size: 0.75rem; color: var(--text-muted); font-family: monospace;">
          Băm SHA-256 nguồn: ${(item.raw_sha256 || '').slice(0, 16)}...
        </div>

        <div class="vault-card-actions" style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 14px;">
          <a href="${item.source_url}" target="_blank" rel="noopener noreferrer nofollow" class="btn-rail-action" style="background: var(--bg-card-subtle); color: var(--text-primary); border: 1px solid var(--border-subtle); padding: 8px 14px; border-radius: 6px; text-decoration: none; font-size: 0.85rem; font-weight: 600; display: inline-flex; align-items: center; gap: 4px; min-height: 44px; min-width: 44px;" aria-label="Xem nguồn chính thức cho ${item.title} trong tab mới">
            ${isHeld ? 'Xem thông báo gốc ↗' : 'Xem nguồn chính thức ↗'}
          </a>
          ${(item.price_vnd && item.price_vnd > 0 && !isHeld) ? `
            <button type="button" class="btn-split-shortcut" data-split-amount="${item.price_vnd}" data-split-desc="${item.title}" aria-label="Mở trang Chia Bill Pro cho ${item.title}">
              🧮 Mở Chia Bill Pro
            </button>
            <button type="button" class="btn-zalo-pass-trigger" data-zalo-title="${item.title}" data-zalo-price="${item.price_vnd}" style="background: #eff6ff; color: #1d4ed8; border: 1px solid #bfdbfe; padding: 8px 14px; border-radius: 6px; font-size: 0.85rem; font-weight: 700; cursor: pointer; min-height: 44px; display: inline-flex; align-items: center; gap: 6px;" aria-label="Xuất vé kèo rủ bạn Zalo Pass cho ${item.title}">
              🍿 Vé Kèo Zalo Pass
            </button>
          ` : ''}
        </div>

        ${(item.price_vnd && item.price_vnd > 0 && !isHeld) ? `
          <!-- EMBEDDED INLINE SPLIT BILL WIDGET (Mandate JAYT-356) -->
          <div class="inline-split-widget" id="inline-split-${item.id}" style="margin-top: 14px; background: var(--bg-card-subtle); border: 1px solid var(--border-subtle); border-radius: 8px; padding: 12px;">
            <div style="font-weight: 700; font-size: 0.88rem; color: var(--text-primary); margin-bottom: 8px;">
              🧮 Tự tính phần tiền mỗi người (2 - 8 người):
            </div>
            <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
              <label for="select-split-${item.id}" style="font-size: 0.82rem; color: var(--text-secondary);">Nhóm đi:</label>
              <select id="select-split-${item.id}" class="inline-split-select" data-card-id="${item.id}" data-amount="${item.price_vnd}" style="padding: 6px 10px; border-radius: 6px; border: 1px solid var(--border-color); font-size: 0.85rem; background: var(--bg-card); color: var(--text-primary); min-height: 38px;">
                <option value="2">2 người</option>
                <option value="3" selected>3 người</option>
                <option value="4">4 người</option>
                <option value="5">5 người</option>
                <option value="6">6 người</option>
                <option value="7">7 người</option>
                <option value="8">8 người</option>
              </select>
            </div>
            <div class="inline-split-result" id="inline-split-res-${item.id}" style="margin-top: 8px; font-size: 0.84rem; line-height: 1.4; color: var(--text-secondary);">
              <!-- Rendered dynamically -->
            </div>
          </div>
        ` : ''}
      </article>
    `;
  }

  function attachVoucherVaultEvents() {
    // Tier filter listeners
    const buttons = document.querySelectorAll('[data-vault-filter]');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-vault-filter');
        buttons.forEach(b => {
          b.classList.toggle('active', b === btn);
          b.setAttribute('aria-pressed', String(b === btn));
        });

        let visible = 0;
        document.querySelectorAll('#voucher-vault-grid .vault-card').forEach(card => {
          const tier = card.getAttribute('data-card-tier');
          const isAct = card.getAttribute('data-actionable') === 'true';
          let show = false;
          if (filter === 'ALL') {
            show = isAct;
          } else {
            show = isAct && (tier === filter);
          }
          card.style.display = show ? 'flex' : 'none';
          if (show) visible++;
        });

        const statusEl = document.getElementById('vault-filter-status');
        if (statusEl) {
          if (filter === 'ALL') {
            statusEl.textContent = `Đang hiển thị ${visible} ưu đãi có hiệu lực (0 mục hết hạn trong danh mục hành động).`;
          } else {
            statusEl.textContent = `Đang hiển thị ${visible} mục thuộc phân loại ${filter}.`;
          }
        }
      });
    });

    // 1-Tap Copy code button listeners (only triggered if real code buttons exist)
    document.querySelectorAll('.btn-copy-code').forEach(btn => {
      btn.addEventListener('click', async () => {
        const code = btn.getAttribute('data-code');
        if (!code) return;

        let success = false;
        try {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(code);
            success = true;
          }
        } catch (err) {
          success = false;
        }

        if (!success) {
          try {
            const ta = document.createElement('textarea');
            ta.value = code;
            ta.style.position = 'fixed';
            ta.style.opacity = '0';
            document.body.appendChild(ta);
            ta.select();
            success = document.execCommand('copy');
            document.body.removeChild(ta);
          } catch (e) {
            success = false;
          }
        }

        if (success) {
          try { navigator.vibrate?.(50); } catch(e) {}
          const origText = btn.textContent;
          btn.textContent = '✓ [ Đã chép ]';
          btn.classList.add('copied');

          const statusEl = document.getElementById('vault-filter-status');
          if (statusEl) {
            statusEl.textContent = `Đã sao chép mã ưu đãi "${code}" vào khay nhớ tạm.`;
          }

          setTimeout(() => {
            btn.textContent = 'Sao chép mã';
            btn.classList.remove('copied');
          }, 2000);
        } else {
          btn.textContent = 'Lỗi sao chép';
          const fallbackBox = document.getElementById('voucher-copy-fallback');
          if (fallbackBox) {
            fallbackBox.style.display = 'block';
            fallbackBox.value = code;
            fallbackBox.select();
          }
          setTimeout(() => {
            btn.textContent = 'Sao chép mã';
          }, 2000);
        }
      });
    });

    // Inline split bill calculation helper
    function updateInlineSplitCard(id, bill, count) {
      const calcBox = document.getElementById('inline-calc-' + id);
      if (!calcBox) return;
      const res = calculateIntegerSplit(bill, count);
      if (!res.valid) {
        calcBox.innerHTML = '<span style="color: #dc2626;">' + res.error + '</span>';
        return;
      }
      if (res.remainder === 0) {
        calcBox.innerHTML = '👉 Mỗi bạn đóng đúng: <strong style="color: #0284c7; font-size: 0.95rem;">' + formatVndPrice(res.baseShare) + '</strong> (Khớp 100% hóa đơn)';
      } else {
        calcBox.innerHTML = '👉 <strong>' + res.remainder + ' bạn:</strong> ' + formatVndPrice(res.baseShare + 1) + ' | <strong>' + (res.count - res.remainder) + ' bạn:</strong> ' + formatVndPrice(res.baseShare) + '<br><small style="color: var(--text-muted);">Số dư ' + res.remainder + 'đ được tự động chia đều từng đồng</small>';
      }
    }

    // Initialize inline split for all cards with defaults
    document.querySelectorAll('.inline-split-select').forEach(sel => {
      const id = sel.getAttribute('data-id');
      const bill = Number(sel.getAttribute('data-bill'));
      const count = Number(sel.value);
      updateInlineSplitCard(id, bill, count);

      sel.addEventListener('change', () => {
        updateInlineSplitCard(id, bill, Number(sel.value));
      });
    });

    // Inline Zalo copy buttons
    document.querySelectorAll('.btn-inline-zalo-copy').forEach(btn => {
      btn.addEventListener('click', async () => {
        const id = btn.getAttribute('data-id');
        const bill = Number(btn.getAttribute('data-bill'));
        const desc = btn.getAttribute('data-desc');
        const sel = document.getElementById('split-select-' + id);
        const count = sel ? Number(sel.value) : 3;

        const res = calculateIntegerSplit(bill, count);
        if (!res.valid) return;

        let breakdownText = '';
        if (res.remainder === 0) {
          breakdownText = '👉 Mỗi người: ' + formatVndPrice(res.baseShare);
        } else {
          breakdownText = '👉 ' + res.remainder + ' bạn: ' + formatVndPrice(res.baseShare + 1) + ' / người\n👉 ' + (res.count - res.remainder) + ' bạn: ' + formatVndPrice(res.baseShare) + ' / người';
        }

        const detailLink = (typeof window !== 'undefined' && window.location && window.location.origin) ?
          (window.location.origin + window.location.pathname + '#split-bill') :
          'http://localhost:4176/#split-bill';

        const inviteMsg = [
          '📢 [JAYT SPLIT-BILL] Kèo đi chung: ' + desc,
          '💰 Tổng bill: ' + formatVndPrice(res.totalBill) + ' (' + count + ' người)',
          '----------------------------------',
          breakdownText,
          '(Số dư lẻ: ' + res.remainder + 'đ tự động chia đều từng đồng)',
          '----------------------------------',
          '🔗 Chi tiết & tự chia bill tại: ' + detailLink
        ].join('\n');

        let copied = false;
        try {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(inviteMsg);
            copied = true;
          }
        } catch(e) {}

        if (!copied) {
          try {
            const ta = document.createElement('textarea');
            ta.value = inviteMsg;
            ta.style.position = 'fixed';
            ta.style.opacity = '0';
            document.body.appendChild(ta);
            ta.select();
            copied = document.execCommand('copy');
            document.body.removeChild(ta);
          } catch(e) {}
        }

        if (copied) {
          try { navigator.vibrate?.(50); } catch(e) {}
          const orig = btn.textContent;
          btn.textContent = '✓ [ Đã chép ]';
          btn.style.background = '#10b981';
          setTimeout(() => {
            btn.textContent = orig;
            btn.style.background = '#0068ff';
          }, 2000);
        }
      });
    });

    // Split bill shortcut listeners
    document.querySelectorAll('.btn-split-shortcut').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const amt = btn.getAttribute('data-split-amount');
        const desc = btn.getAttribute('data-split-desc');
        navigateTo('SPLIT_BILL_PRO');
        setTimeout(() => {
          const amtInput = document.getElementById('split-bill-amount');
          const descInput = document.getElementById('split-bill-desc');
          if (amtInput && amt) amtInput.value = amt;
          if (descInput && desc) descInput.value = desc;
          const calcBtn = document.getElementById('btn-calculate-split');
          calcBtn?.click();
        }, 50);
      });
    });
  }

  function renderSplitBillProView() {
    setTimeout(attachSplitBillProEvents, 0);

    return `
      <div class="sprint-b-view-container">
        <header class="sprint-b-header">
          <h1 class="sprint-b-title">
            👥 Split-Bill Pro — Bảng Tính Chia Tiền Nhóm
            <span class="nav-badge-pill">Local-First (2 - 8 người)</span>
          </h1>
          <p class="sprint-b-subtitle">
            Chia tiền công bằng cho nhóm từ 2 đến 8 người. Tự động phân bổ số dư lẻ từng đồng VND (tổng các phần bằng 100% hóa đơn, sai số 0đ). Xử lý an toàn 100% in-browser, không lưu đám mây, không gửi dữ liệu qua mạng.
          </p>
        </header>

        <div class="split-bill-container">
          <!-- FORM SECTION -->
          <div class="split-card">
            <h2 style="font-size: 1.18rem; font-weight: 800; color: var(--text-primary); margin: 0 0 16px 0;">
              ✏️ Thông Tin Hóa Đơn
            </h2>

            <div class="split-form-group">
              <label for="split-bill-amount" class="split-label">Tổng số tiền hóa đơn (VND) *</label>
              <input type="number" id="split-bill-amount" class="split-input" placeholder="Ví dụ: 150000" min="0" step="1" value="150000" aria-required="true">
              <div class="split-quick-buttons">
                <button type="button" class="split-quick-btn" data-add-bill="50000">+50.000đ</button>
                <button type="button" class="split-quick-btn" data-add-bill="100000">+100.000đ</button>
                <button type="button" class="split-quick-btn" data-add-bill="500000">+500.000đ</button>
              </div>
            </div>

            <div class="split-form-group">
              <label for="split-people-count" class="split-label">Số người tham gia chia tiền (2 - 8 người) *</label>
              <input type="number" id="split-people-count" class="split-input" placeholder="Ví dụ: 3" min="2" max="8" step="1" value="3" aria-required="true">
              <div class="split-quick-buttons">
                <button type="button" class="split-quick-btn" data-set-count="2">2 người</button>
                <button type="button" class="split-quick-btn" data-set-count="3">3 người</button>
                <button type="button" class="split-quick-btn" data-set-count="4">4 người</button>
                <button type="button" class="split-quick-btn" data-set-count="5">5 người</button>
                <button type="button" class="split-quick-btn" data-set-count="6">6 người</button>
                <button type="button" class="split-quick-btn" data-set-count="7">7 người</button>
                <button type="button" class="split-quick-btn" data-set-count="8">8 người</button>
              </div>
            </div>

            <div class="split-form-group">
              <label for="split-bill-desc" class="split-label">Nội dung / Bữa ăn (Tùy chọn)</label>
              <input type="text" id="split-bill-desc" class="split-input" placeholder="Ví dụ: Bữa trưa Jollibee / Vé xem phim Galaxy" value="Bữa trưa nhóm bạn">
            </div>

            <div class="split-form-group">
              <label for="split-bill-payer" class="split-label">Thông tin nhận chuyển khoản (Tùy chọn)</label>
              <input type="text" id="split-bill-payer" class="split-input" placeholder="Ví dụ: Nguyen Van A - MBBank: 0987654321">
              <small style="font-size: 0.78rem; color: var(--text-muted); display: block; margin-top: 4px;">🔒 Để đảm bảo an toàn riêng tư tuyệt đối (Zero-PII), thông tin người nhận không bao giờ được ghi vào lời rủ chia sẻ hay gửi qua mạng.</small>
            </div>

            <div class="split-disclaimer" style="margin-top: 14px;">
              ℹ️ <em>Hóa đơn do người dùng tự nhập; không áp dụng bất kỳ khoản chiết khấu hoặc phụ phí chưa kiểm chứng nào. Tính toán 100% in-memory trên thiết bị của bạn (Zero Storage, Zero Telemetry).</em>
            </div>

            <div style="display: flex; gap: 10px; margin-top: 20px;">
              <button type="button" id="btn-calculate-split" style="flex: 1; background: #0369a1; color: #ffffff; border: none; padding: 12px 20px; border-radius: 8px; font-weight: 700; font-size: 0.95rem; cursor: pointer; min-height: 44px;">
                🧮 Tính toán &amp; Soạn tin
              </button>
              <button type="button" id="btn-reset-split" style="background: var(--bg-card-subtle); color: var(--text-primary); border: 1px solid var(--border-subtle); padding: 12px 18px; border-radius: 8px; font-weight: 700; font-size: 0.95rem; cursor: pointer; min-height: 44px;">
                🔄 Đặt lại
              </button>
            </div>

            <div id="split-error-box" style="display: none; margin-top: 14px; background: rgba(220, 38, 38, 0.1); border-left: 3px solid #dc2626; padding: 10px 14px; border-radius: 6px; font-size: 0.88rem; color: #dc2626;" role="alert">
            </div>
          </div>

          <!-- RESULTS & SHARING PREVIEW -->
          <div class="split-card">
            <h2 style="font-size: 1.18rem; font-weight: 800; color: var(--text-primary); margin: 0 0 16px 0;">
              📊 Kết Quả Phân Bổ &amp; Soạn Tin Zalo
            </h2>

            <div id="split-result-container">
              <!-- Dynamically filled by updateSplitBillUI() -->
            </div>
          </div>
        </div>
      </div>
    `;
  }

  
  function sanitizeZeroPii(text) {
    if (!text) return '';
    // Filter phone numbers (10-11 digits)
    let clean = text.replace(/(\+84|0)[\s.-]?([0-9][\s.-]?){8,10}[0-9]/g, '[SĐT đã lọc]');
    // Filter emails
    clean = clean.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '[Email đã lọc]');
    // Filter 9-digit or 12-digit Citizen IDs
    clean = clean.replace(/\b\d{9}\b|\b\d{12}\b/g, '[CCCD đã lọc]');
    return clean;
  }
  
  function calculateIntegerSplit(totalBillInput, countInput) {
    if (totalBillInput === null || totalBillInput === undefined || totalBillInput === '') {
      return { valid: false, error: 'Vui lòng nhập tổng số tiền hóa đơn.' };
    }
    const billStr = String(totalBillInput).trim();
    if (!/^\d+$/.test(billStr)) {
      return { valid: false, error: 'Tổng hóa đơn phải là số nguyên không âm (VND), không chứa số thập phân hoặc ký tự lạ.' };
    }
    const totalBill = Number(billStr);
    if (!Number.isFinite(totalBill) || !Number.isSafeInteger(totalBill) || totalBill < 0) {
      return { valid: false, error: 'Tổng hóa đơn không hợp lệ hoặc vượt quá giới hạn an toàn.' };
    }

    if (countInput === null || countInput === undefined || countInput === '') {
      return { valid: false, error: 'Vui lòng nhập số người tham gia (từ 2 đến 8 người).' };
    }
    const countStr = String(countInput).trim();
    if (!/^\d+$/.test(countStr)) {
      return { valid: false, error: 'Số người tham gia phải là số nguyên từ 2 đến 8 người.' };
    }
    const count = Number(countStr);
    if (!Number.isInteger(count) || count < 2 || count > 8) {
      return { valid: false, error: 'Số người tham gia phải từ 2 đến 8 người (theo quy chuẩn nhóm Split-Bill Pro).' };
    }

    const baseShare = Math.floor(totalBill / count);
    const remainder = totalBill % count;

    const shares = [];
    for (let i = 0; i < count; i++) {
      shares.push(i < remainder ? baseShare + 1 : baseShare);
    }

    const calculatedSum = shares.reduce((a, b) => a + b, 0);
    const isExact = (calculatedSum === totalBill);

    return {
      valid: true,
      totalBill,
      count,
      baseShare,
      remainder,
      shares,
      calculatedSum,
      isExact
    };
  }

  function attachSplitBillProEvents() {
    const amountInput = document.getElementById('split-bill-amount');
    const countInput = document.getElementById('split-people-count');
    const descInput = document.getElementById('split-bill-desc');
    const payerInput = document.getElementById('split-bill-payer');
    const calcBtn = document.getElementById('btn-calculate-split');
    const resetBtn = document.getElementById('btn-reset-split');

    function update() {
      const rawBill = amountInput.value;
      const rawCount = countInput.value;
      const desc = sanitizeZeroPii((descInput.value || 'Bữa ăn nhóm').trim());
      const payer = (payerInput.value || '').trim();

      const result = calculateIntegerSplit(rawBill, rawCount);
      const errorBox = document.getElementById('split-error-box');
      const resContainer = document.getElementById('split-result-container');

      if (!result.valid) {
        if (errorBox) {
          errorBox.style.display = 'block';
          errorBox.style.background = 'rgba(220, 38, 38, 0.1)';
          errorBox.style.borderLeftColor = '#dc2626';
          errorBox.style.color = '#dc2626';
          errorBox.textContent = '⚠️ ' + result.error;
        }
        if (resContainer) {
          resContainer.innerHTML = '<p style="color: var(--text-muted); font-size: 0.9rem;">Vui lòng nhập thông tin hợp lệ (tổng tiền nguyên VND, nhóm 2 đến 8 người) để xem kết quả chia tiền.</p>';
        }
        return;
      }

      if (errorBox) errorBox.style.display = 'none';

      // Build text for Zalo message
      let breakdownText = '';
      if (result.remainder === 0) {
        breakdownText = `👉 Mỗi người: ${formatVndPrice(result.baseShare)}`;
      } else {
        breakdownText = `👉 ${result.remainder} bạn: ${formatVndPrice(result.baseShare + 1)} / người\n👉 ${result.count - result.remainder} bạn: ${formatVndPrice(result.baseShare)} / người`;
      }

      const detailLink = (typeof window !== 'undefined' && window.location && window.location.origin) ? 
        (window.location.origin + window.location.pathname + '#split-bill') : 
        'http://localhost:4176/#split-bill';

      const zaloMessage = [
        `📢 [JAYT SPLIT-BILL] Chia tiền: ${desc}`,
        `💰 Tổng hóa đơn: ${formatVndPrice(result.totalBill)}`,
        `👥 Số người tham gia: ${result.count} người`,
        `----------------------------------`,
        breakdownText,
        `(Số dư lẻ: ${result.remainder}đ đã được tự động phân bổ đều từng đồng)`,
        `----------------------------------`,
        `🔗 Chi tiết & tính toán tại: ${detailLink}`
      ].filter(Boolean).join('\n');

      if (resContainer) {
        resContainer.innerHTML = `
          <div class="split-results-panel">
            <div class="split-stat-box">
              <div class="split-stat-label">Số tiền mỗi người cần đóng:</div>
              <div class="split-stat-value">
                ${result.remainder === 0 ? formatVndPrice(result.baseShare) : '~' + formatVndPrice(result.baseShare)}
              </div>
            </div>

            ${result.remainder > 0 ? `
              <div class="split-remainder-notice">
                <strong>Số dư lẻ ${result.remainder} ₫ được xử lý:</strong><br>
                • ${result.remainder} người đóng <strong>${formatVndPrice(result.baseShare + 1)}</strong><br>
                • ${result.count - result.remainder} người đóng <strong>${formatVndPrice(result.baseShare)}</strong><br>
                ✓ Tổng tiền các phần thu: <strong>${formatVndPrice(result.calculatedSum)}</strong> (Khớp 100% hóa đơn)
              </div>
            ` : `
              <div class="split-remainder-notice" style="background: rgba(16, 185, 129, 0.1); border-left-color: #10b981; color: #065f46;">
                ✓ Chia hết hoàn hảo: Không có số dư lẻ. Mỗi người đóng đúng <strong>${formatVndPrice(result.baseShare)}</strong>.
              </div>
            `}

            <div style="margin-top: 16px;">
              <label for="zalo-msg-preview" class="split-label">Tin nhắn soạn sẵn cho Zalo / Tin nhắn nhóm:</label>
              <textarea id="zalo-msg-preview" class="zalo-message-box" readonly aria-label="Nội dung tin nhắn chia tiền">${zaloMessage}</textarea>
            </div>

            <div style="display: flex; gap: 10px; margin-top: 14px; flex-wrap: wrap;">
              <button type="button" id="btn-copy-zalo-msg" class="btn-share-zalo" aria-label="Rủ bạn đi chung qua Zalo">
                💬 Rủ bạn đi chung (Zalo)
              </button>
              <button type="button" id="btn-open-zalo" style="background: #0068ff; color: #ffffff; border: none; padding: 12px 18px; border-radius: 8px; font-weight: 700; font-size: 0.9rem; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; gap: 6px; min-height: 44px;">
                ↗ Mở Zalo Web
              </button>
            </div>
            <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 8px;">
              Văn bản lời rủ đã sẵn sàng để dán vào Zalo hoặc nhóm chat. JayT không tự ý gửi tin nhắn thay bạn.
            </p>

            <div id="zalo-fallback-box" style="display: none; margin-top: 12px; background: var(--bg-card-subtle); border: 1px solid #f59e0b; padding: 12px; border-radius: 8px;">
              <p style="font-size: 0.84rem; color: #b45309; font-weight: 700; margin: 0 0 6px 0;">
                ⚠️ Không thể tự động sao chép do trình duyệt từ chối quyền. Bạn hãy bôi đen đoạn văn bản bên dưới và nhấn Ctrl+C (Cmd+C):
              </p>
              <textarea id="zalo-fallback-textarea" style="width: 100%; height: 90px; font-size: 0.82rem; font-family: monospace; border: 1px solid var(--border-color); border-radius: 6px; padding: 6px;" readonly></textarea>
            </div>
          </div>
        `;

        // Copy Zalo listener
        const copyBtn = document.getElementById('btn-copy-zalo-msg');
        const fallbackBox = document.getElementById('zalo-fallback-box');
        const fallbackText = document.getElementById('zalo-fallback-textarea');

        copyBtn?.addEventListener('click', async () => {
          let success = false;
          try {
            if (navigator.clipboard && navigator.clipboard.writeText) {
              await navigator.clipboard.writeText(zaloMessage);
              success = true;
            }
          } catch (err) {
            success = false;
          }

          if (!success) {
            try {
              const ta = document.createElement('textarea');
              ta.value = zaloMessage;
              ta.style.position = 'fixed';
              ta.style.opacity = '0';
              document.body.appendChild(ta);
              ta.select();
              success = document.execCommand('copy');
              document.body.removeChild(ta);
            } catch (e) {
              success = false;
            }
          }

          if (success) {
            try { navigator.vibrate?.(50); } catch(e) {}
            copyBtn.textContent = '✓ [ Đã chép ]';
            if (fallbackBox) fallbackBox.style.display = 'none';

            const errBox = document.getElementById('split-error-box');
            if (errBox) {
              errBox.style.display = 'block';
              errBox.style.background = 'rgba(16, 185, 129, 0.1)';
              errBox.style.borderLeftColor = '#10b981';
              errBox.style.color = '#065f46';
              errBox.textContent = '✓ Đã sao chép lời rủ bạn đi chung! Nội dung đã sẵn sàng để bạn dán vào Zalo.';
            }

            setTimeout(() => {
              copyBtn.textContent = '💬 Rủ bạn đi chung (Zalo)';
            }, 2000);
          } else {
            copyBtn.textContent = 'Lỗi sao chép tự động';
            if (fallbackBox && fallbackText) {
              fallbackBox.style.display = 'block';
              fallbackText.value = zaloMessage;
              fallbackText.focus();
              fallbackText.select();
            }
            setTimeout(() => {
              copyBtn.textContent = '💬 Rủ bạn đi chung (Zalo)';
            }, 2000);
          }
        });

        // Open Zalo listener
        const openZaloBtn = document.getElementById('btn-open-zalo');
        openZaloBtn?.addEventListener('click', () => {
          window.open('https://chat.zalo.me/', '_blank', 'noopener,noreferrer');
        });
      }
    }

    if (calcBtn) calcBtn.onclick = update;
    if (amountInput) amountInput.oninput = update;
    if (countInput) countInput.oninput = update;
    if (descInput) descInput.oninput = update;
    if (payerInput) payerInput.oninput = update;

    // Quick bill buttons
    document.querySelectorAll('[data-add-bill]').forEach(btn => {
      btn.onclick = () => {
        const add = parseFloat(btn.getAttribute('data-add-bill'));
        const cur = parseFloat(amountInput.value) || 0;
        amountInput.value = cur + add;
        update();
      };
    });

    // Quick count buttons (2 through 8 inclusive)
    document.querySelectorAll('[data-set-count]').forEach(btn => {
      btn.onclick = () => {
        countInput.value = btn.getAttribute('data-set-count');
        update();
      };
    });

    // Reset button
    if (resetBtn) {
      resetBtn.onclick = () => {
        amountInput.value = '150000';
        countInput.value = '3';
        descInput.value = 'Bữa trưa nhóm bạn';
        payerInput.value = '';
        update();
      };
    }

    // Initial render
    update();
  }

  // =========================================================================
  // 4. MODULE 3: LỊCH TIẾT KIỆM 7 NGÀY (Asia/Ho_Chi_Minh)
  // =========================================================================
  function renderSavingsCalendarView() {
    setTimeout(attachSavingsCalendarEvents, 0);

    // Determine current day in Asia/Ho_Chi_Minh timezone
    const now = new Date();
    const vnDayFormatter = new Intl.DateTimeFormat('vi-VN', {
      timeZone: 'Asia/Ho_Chi_Minh',
      weekday: 'long'
    });
    const vnDateFormatter = new Intl.DateTimeFormat('vi-VN', {
      timeZone: 'Asia/Ho_Chi_Minh',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
    const currentVnDayStr = vnDayFormatter.format(now).toLowerCase();
    const currentVnDateStr = vnDateFormatter.format(now);

    const dayKeyMap = {
      'thứ hai': 'monday',
      'thứ ba': 'tuesday',
      'thứ tư': 'wednesday',
      'thứ năm': 'thursday',
      'thứ sáu': 'friday',
      'thứ bảy': 'saturday',
      'chủ nhật': 'sunday'
    };

    const todayKey = dayKeyMap[currentVnDayStr] || 'monday';

    const dayTabs = [
      { key: 'monday', label: 'Thứ Hai' },
      { key: 'tuesday', label: 'Thứ Ba' },
      { key: 'wednesday', label: 'Thứ Tư' },
      { key: 'thursday', label: 'Thứ Năm' },
      { key: 'friday', label: 'Thứ Sáu' },
      { key: 'saturday', label: 'Thứ Bảy' },
      { key: 'sunday', label: 'Chủ Nhật' }
    ];

    return `
      <div class="sprint-b-view-container">
        <header class="sprint-b-header">
          <h1 class="sprint-b-title">
            📅 Lịch Tiết Kiệm 7 Ngày Đà Nẵng
            <span class="nav-badge-pill">Múi giờ Asia/Ho_Chi_Minh</span>
          </h1>
          <p class="sprint-b-subtitle">
            Hôm nay: <strong>${currentVnDayStr.charAt(0).toUpperCase() + currentVnDayStr.slice(1)}, ngày ${currentVnDateStr}</strong>. Tra cứu các chương trình ưu đãi định kỳ theo ngày trong tuần từ nguồn chính thức. Lưu ý: Đây là lịch ưu đãi định kỳ, không thay thế lịch suất chiếu hay giờ mở cửa thực tế.
          </p>
        </header>

        <!-- 7-DAY NAVIGATION TABS -->
        <div class="calendar-days-bar" role="tablist" aria-label="Chọn ngày trong tuần">
          ${dayTabs.map(tab => {
            const isToday = (tab.key === todayKey);
            return `
              <button class="calendar-day-tab ${isToday ? 'active today-marker' : ''}" data-calendar-day="${tab.key}" role="tab" aria-selected="${isToday ? 'true' : 'false'}">
                <span class="day-name" style="font-weight: 700; font-size: 0.95rem;">${tab.label}</span>
                <small style="font-size: 0.75rem; opacity: 0.85;">${SAVINGS_CALENDAR_DATA[tab.key]?.has_deals ? 'Có ưu đãi' : 'Biểu giá chuẩn'}</small>
              </button>
            `;
          }).join('')}
        </div>

        <!-- DAILY SCHEDULE CONTENT -->
        <div id="calendar-day-content" role="tabpanel">
          <!-- Populated by renderDaySchedule() -->
        </div>
      </div>
    `;
  }

  function renderDaySchedule(dayKey) {
    const dayData = SAVINGS_CALENDAR_DATA[dayKey];
    if (!dayData) return '<p>Dữ liệu ngày không tìm thấy.</p>';

    if (!dayData.has_deals || !dayData.items || dayData.items.length === 0) {
      return `
        <div class="calendar-empty-card">
          <div style="font-size: 2.5rem; margin-bottom: 12px;">🏖️</div>
          <h2 style="font-size: 1.2rem; font-weight: 800; color: var(--text-primary); margin: 0 0 8px 0;">
            ${dayData.name_vi} — Trạng Thái Tiêu Chuẩn
          </h2>
          <p style="font-size: 0.92rem; color: var(--text-secondary); line-height: 1.6; max-width: 580px; margin: 0 auto 16px auto;">
            ${dayData.empty_state_note}
          </p>
          <div style="background: var(--bg-card-subtle); border-left: 3px solid #0284c7; padding: 12px 16px; border-radius: 6px; font-size: 0.85rem; color: var(--text-secondary); text-align: left; max-width: 580px; margin: 0 auto;">
            💡 <strong>Mẹo tiết kiệm cuối tuần:</strong> Sử dụng quyền lợi tích điểm hội viên (Phúc Long / Galaxy Cinema) hoặc săn voucher thanh toán qua ví điện tử trên <em>Ví Voucher</em>.
          </div>
        </div>
      `;
    }

    return `
      <div style="margin-bottom: 24px;">
        <h2 style="font-size: 1.2rem; font-weight: 800; color: var(--text-primary); margin: 0 0 16px 0;">
          Ưu đãi định kỳ cho ${dayData.name_vi} (${dayData.items.length} chương trình)
        </h2>
        <div class="vault-grid">
          ${dayData.items.map(item => `
            <article class="vault-card" style="border-left: 4px solid #0284c7;">
              <div class="vault-card-header">
                <span class="vault-tier-badge badge-brand-program">${item.brand}</span>
                <span style="font-size: 0.78rem; font-weight: 700; color: #0369a1;">📅 ${item.frequency}</span>
              </div>

              <h3 class="vault-card-title">${item.event_name}</h3>
              <div class="vault-card-price" style="font-size: 1.05rem;">
                ${item.price_rule}
              </div>

              <div class="vault-meta-row">
                <strong>⚠️ Ngoại lệ:</strong> ${item.exceptions}
              </div>

              <div class="vault-meta-row" style="font-size: 0.75rem; color: var(--text-muted); font-family: monospace; margin-top: 10px;">
                Băm nguồn (SHA-256): ${item.raw_sha256.slice(0, 16)}...
              </div>

              <div class="vault-card-actions" style="margin-top: 16px;">
                <a href="${item.source_url}" target="_blank" rel="noopener noreferrer nofollow" class="btn-rail-action" style="background: var(--bg-card-subtle); color: var(--text-primary); border: 1px solid var(--border-subtle); padding: 8px 14px; border-radius: 6px; text-decoration: none; font-size: 0.85rem; font-weight: 600; display: inline-flex; align-items: center; gap: 4px; min-height: 44px;" aria-label="Xem quy định chính thức cho ${item.event_name}">
                  Xem quy định nguồn ↗
                </a>
              </div>
            </article>
          `).join('')}
        </div>
      </div>
    `;
  }

  function attachSavingsCalendarEvents() {
    const tabs = document.querySelectorAll('[data-calendar-day]');
    const content = document.getElementById('calendar-day-content');

    function selectDay(dayKey) {
      tabs.forEach(t => {
        const isTarget = (t.getAttribute('data-calendar-day') === dayKey);
        t.classList.toggle('active', isTarget);
        t.setAttribute('aria-selected', String(isTarget));
      });
      if (content) {
        content.innerHTML = renderDaySchedule(dayKey);
      }
    }

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const t0 = (typeof performance !== 'undefined') ? performance.now() : Date.now();
        const dayKey = tab.getAttribute('data-calendar-day');
        if (dayKey) selectDay(dayKey);
        const t1 = (typeof performance !== 'undefined') ? performance.now() : Date.now();
        const latency = Math.round((t1 - t0) * 100) / 100;
        window.__lastTimelineFilterLatencyMs = latency;
        console.log('[TIMELINE] Switched to tab ' + dayKey + ' in ' + latency + 'ms');
      });
    });

    // Default select active tab
    const activeTab = document.querySelector('.calendar-day-tab.active') || tabs[0];
    if (activeTab) {
      selectDay(activeTab.getAttribute('data-calendar-day'));
    }
  }

  // =========================================================================
  // 5. MODULE 4: SMART VALUE RADAR (15 TECH ITEMS)
  // =========================================================================
  function renderSmartValueRadarView() {
    setTimeout(() => {
      attachSmartValueRadarEvents();
      attachZaloPassButtons();
    }, 0);

    const countAll = VALUE_RADAR_ITEMS.length;
    const countKettle = VALUE_RADAR_ITEMS.filter(i => i.category === 'KETTLE').length;
    const countFan = VALUE_RADAR_ITEMS.filter(i => i.category === 'FAN').length;
    const countDeskLamp = VALUE_RADAR_ITEMS.filter(i => i.category === 'DESK_LAMP').length;
    const countMouse = VALUE_RADAR_ITEMS.filter(i => i.category === 'MOUSE').length;
    const countUsb = VALUE_RADAR_ITEMS.filter(i => i.category === 'USB').length;
    const countTextbook = VALUE_RADAR_ITEMS.filter(i => i.category === 'TEXTBOOK').length;

    return `
      <div class="sprint-b-view-container">
        <header class="sprint-b-header">
          <h1 class="sprint-b-title">
            📡 KTX Radar — 30 Thiết Bị KTX &amp; Học Tập Thực Tế
            <span class="nav-badge-pill">${countAll} sản phẩm khảo sát</span>
          </h1>
          <p class="sprint-b-subtitle">
            Khảo sát giá quan sát thực tế và tình trạng hàng tại các showroom đối tác công nghệ Đà Nẵng (Phi Long, Nhà sách, Điện máy). Cam kết 100% đường dẫn sạch trực tiếp, <strong>không gắn tracking tokens</strong>.
          </p>
        </header>

        <!-- RADAR FILTERS -->
        <div class="radar-filters-bar" role="group" aria-label="Lọc thiết bị theo danh mục">
          <button class="radar-filter-btn active" data-radar-filter="ALL" aria-pressed="true">
            Tất cả <span class="nav-badge-pill">${countAll}</span>
          </button>
          <button class="radar-filter-btn" data-radar-filter="KETTLE" aria-pressed="false">
            ☕ Ấm đun siêu tốc <span class="nav-badge-pill">${countKettle}</span>
          </button>
          <button class="radar-filter-btn" data-radar-filter="FAN" aria-pressed="false">
            🌀 Quạt mini KTX <span class="nav-badge-pill">${countFan}</span>
          </button>
          <button class="radar-filter-btn" data-radar-filter="DESK_LAMP" aria-pressed="false">
            💡 Đèn học chống cận <span class="nav-badge-pill">${countDeskLamp}</span>
          </button>
          <button class="radar-filter-btn" data-radar-filter="MOUSE" aria-pressed="false">
            🖱️ Chuột máy tính <span class="nav-badge-pill">${countMouse}</span>
          </button>
          <button class="radar-filter-btn" data-radar-filter="USB" aria-pressed="false">
            💾 USB lưu trữ <span class="nav-badge-pill">${countUsb}</span>
          </button>
          <button class="radar-filter-btn" data-radar-filter="TEXTBOOK" aria-pressed="false">
            📚 Sách giáo trình <span class="nav-badge-pill">${countTextbook}</span>
          </button>
        </div>

        <p id="radar-filter-status" role="status" style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 20px;">
          Đang hiển thị toàn bộ ${countAll} sản phẩm KTX và học tập thiết yếu cho sinh viên Đà Nẵng.
        </p>

        <!-- RADAR GRID -->
        <div class="radar-grid" id="radar-grid-container" role="feed" aria-label="Toàn bộ 30 sản phẩm KTX Radar">
          ${VALUE_RADAR_ITEMS.map(item => renderRadarCard(item)).join('')}
        </div>
      </div>
    `;
  }

  function renderRadarCard(item) {
    const categoryLabels = {
      'KETTLE': '☕ Ấm đun siêu tốc',
      'FAN': '🌀 Quạt mini KTX',
      'DESK_LAMP': '💡 Đèn học chống cận',
      'MOUSE': '🖱️ Chuột máy tính',
      'USB': '💾 USB lưu trữ',
      'TEXTBOOK': '📚 Sách giáo trình'
    };
    const catLabel = categoryLabels[item.category] || item.category;

    return `
      <article class="radar-card" data-category="${item.category}" aria-label="${item.name}">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; gap: 6px;">
          <span style="font-size: 0.75rem; font-weight: 700; color: #0369a1; background: #e0f2fe; padding: 3px 8px; border-radius: 4px;">
            ${catLabel}
          </span>
          <span style="font-size: 0.75rem; color: var(--text-muted); font-family: monospace;">
            Model: ${item.model}
          </span>
        </div>

        <h2 style="font-size: 1.05rem; font-weight: 800; color: var(--text-primary); margin: 0 0 8px 0; line-height: 1.4;">
          ${item.name}
        </h2>

        ${item.price_vnd ? `
          <div style="font-size: 1.15rem; font-weight: 800; color: #e11d48; margin-bottom: 8px;">
            ${formatVndPrice(item.price_vnd)}
            <small style="font-size: 0.75rem; font-weight: 500; color: var(--text-muted); display: block;">Giá khảo sát thực tế — Kiểm tra tồn kho tại sàn</small>
          </div>
        ` : `
          <div style="font-size: 0.95rem; font-weight: 700; color: #059669; margin-bottom: 8px;">
            Ưu đãi kèm quà tặng sinh viên
          </div>
        `}

        <div class="radar-stock-badge">
          ${item.stock_status}
        </div>

        <div style="font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 6px;">
          <strong>🏪 Đơn vị khảo sát:</strong> ${item.merchant || 'Đại lý chính hãng'}
        </div>

        <div style="font-size: 0.78rem; color: var(--text-muted); margin-bottom: 14px;">
          🕒 Ghi nhận theo HTTP Date: ${item.captured_at}
        </div>

        <div style="margin-top: auto; display: flex; flex-direction: column; gap: 8px;">
          <a href="${item.source_url}" target="_blank" rel="noopener noreferrer nofollow" class="btn-rail-action" style="background: var(--bg-card-subtle); color: var(--text-primary); border: 1px solid var(--border-subtle); padding: 8px 14px; border-radius: 6px; text-decoration: none; font-size: 0.85rem; font-weight: 600; display: inline-flex; align-items: center; gap: 4px; min-height: 44px; width: 100%; box-sizing: border-box; justify-content: center;" aria-label="Kiểm tra ${item.name} tại website chính hãng">
            Kiểm tra tại website chính hãng ↗
          </a>
          ${item.price_vnd ? `
            <button type="button" class="btn-split-shortcut" data-split-amount="${item.price_vnd}" data-split-desc="${item.name}" style="background: #e0f2fe; color: #0369a1; border: 1px solid #bae6fd; padding: 8px 14px; border-radius: 6px; font-size: 0.85rem; font-weight: 600; cursor: pointer; min-height: 44px; display: inline-flex; align-items: center; justify-content: center; gap: 6px;" aria-label="Chia bill nhóm cho ${item.name}">
              🧮 Chia bill nhóm (${formatVndPrice(item.price_vnd)})
            </button>
          ` : ''}
        </div>
      </article>
    `;
  }
function attachSmartValueRadarEvents() {
    const buttons = document.querySelectorAll('[data-radar-filter]');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-radar-filter');
        buttons.forEach(b => {
          b.classList.toggle('active', b === btn);
          b.setAttribute('aria-pressed', String(b === btn));
        });

        let visible = 0;
        document.querySelectorAll('#radar-grid-container .radar-card').forEach(card => {
          const cat = card.getAttribute('data-category');
          const show = (filter === 'ALL' || cat === filter);
          card.style.display = show ? 'flex' : 'none';
          if (show) visible++;
        });

        const statusEl = document.getElementById('radar-filter-status');
        if (statusEl) {
          statusEl.textContent = `Đang hiển thị ${visible} thiết bị trong danh mục này.`;
        }
      });
    });

    // Split bill shortcut listeners for radar cards
    document.querySelectorAll('#radar-grid-container .btn-split-shortcut').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const amt = btn.getAttribute('data-split-amount');
        const desc = btn.getAttribute('data-split-desc');
        navigateTo('SPLIT_BILL_PRO');
        setTimeout(() => {
          const amtInput = document.getElementById('split-bill-amount');
          const descInput = document.getElementById('split-bill-desc');
          if (amtInput && amt) amtInput.value = amt;
          if (descInput && desc) descInput.value = desc;
          const calcBtn = document.getElementById('btn-calculate-split');
          calcBtn?.click();
        }, 50);
      });
    });
  }

  // =========================================================================
  // 6. NAVIGATION ROUTER & EVENT ATTACHMENT
  // =========================================================================
  let currentNav = 'HOME';

  function navigateTo(navKey) {
    currentNav = navKey;
    const canvas = document.getElementById('jayt-view-canvas');
    if (!canvas) return;

    // Update active nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-nav') === navKey);
    });

    if (navKey === 'VOUCHER_HUB') {
      canvas.innerHTML = renderVoucherVaultView();
    } else if (navKey === 'SPLIT_BILL_PRO') {
      canvas.innerHTML = renderSplitBillProView();
    } else if (navKey === 'SAVINGS_CALENDAR') {
      canvas.innerHTML = renderSavingsCalendarView();
    } else if (navKey === 'VALUE_RADAR') {
      canvas.innerHTML = renderSmartValueRadarView();
    } else if (navKey === 'BUY_DECISION') {
      canvas.innerHTML = renderSplitBillProView();
    } else if (navKey === 'EXPLORE' || navKey === 'WALLET') {
      canvas.innerHTML = renderVoucherVaultView();
    } else {
      canvas.innerHTML = renderDailyGuideHome();
    }

    attachNavigationListeners();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function attachNavigationListeners() {
    document.querySelectorAll('[data-nav]').forEach(el => {
      el.addEventListener('click', (e) => {
        const target = el.getAttribute('data-nav');
        if (target) {
          e.preventDefault();
          navigateTo(target);
        }
      });
    });
  }

  // =========================================================================
  // 7. REPORT SOURCE MODAL (SAFE READ-ONLY)
  // =========================================================================
  function initReportSourceModal() {
    const openBtn = document.getElementById('btn-open-report');
    const modal = document.getElementById('report-modal-overlay');
    const closeBtn = document.getElementById('btn-close-report-modal');
    const closeXBtn = document.getElementById('btn-close-report-modal-x');

    function openModal() {
      if (modal) {
        modal.style.display = 'flex';
        closeBtn?.focus();
      }
    }

    function closeModal() {
      if (modal) {
        modal.style.display = 'none';
        openBtn?.focus();
      }
    }

    openBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });

    closeBtn?.addEventListener('click', closeModal);
    closeXBtn?.addEventListener('click', closeModal);
  }

  // =========================================================================
  // 8. THEME TOGGLE
  // =========================================================================
  function initTheme() {
    const toggleBtn = document.getElementById('btn-toggle-theme');
    const shell = document.querySelector('.jayt-app-shell');
    if (!toggleBtn || !shell) return;

    toggleBtn.addEventListener('click', () => {
      const isDark = shell.classList.contains('theme-dark');
      shell.classList.toggle('theme-dark', !isDark);
      shell.classList.toggle('theme-light', isDark);
      toggleBtn.textContent = isDark ? '🌙' : '☀️';
    });
  }

  // =========================================================================
  // 9. STOREFRONT INITIALIZATION
  // =========================================================================
  
  // Global click delegate for Zalo pass buttons
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('.btn-zalo-pass-trigger');
    if (trigger) {
      e.preventDefault();
      const title = trigger.getAttribute('data-zalo-title') || 'Kèo Ăn Uống Sinh Viên';
      const price = trigger.getAttribute('data-zalo-price') || '100000';
      openZaloPassModal(title, price, 4);
    }
  });

function initStorefront() {
    initTheme();
    initReportSourceModal();
    attachNavigationListeners();

    // Default to HOME
    navigateTo('HOME');
  }

    root.navigateTo = navigateTo;
  root.calculateIntegerSplit = calculateIntegerSplit;
  root.SAVINGS_CALENDAR_DATA = SAVINGS_CALENDAR_DATA;
  root.VOUCHER_VAULT_ITEMS = VOUCHER_VAULT_ITEMS;
  root.attachHomeCalendarEvents = attachHomeCalendarEvents;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initStorefront);
  } else {
    initStorefront();
  }

})(typeof window !== 'undefined' ? window : this);
