/**
 * JAYT STOREFRONT STAGING SOURCE OF TRUTH (SECTION EZ-V)
 * Version: v3.429.0 (Release Candidate)
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
    "id": "B14_METIZ_U22_2D",
    "brand": "Metiz Cinema Đà Nẵng",
    "title": "Khuyến Mãi Giá Vé U22 (2D chỉ 55.000đ)",
    "tier": "BRAND_PROGRAM",
    "price_vnd": 55000,
    "source_url": "https://metiz.vn/promotion/khuyen-mai-gia-ve-u22-21.html",
    "locality_basis": "Metiz Cinema, Tầng 1 Helio Center, Đường 2/9, Hải Châu, Đà Nẵng",
    "validity": "Chương trình định kỳ áp dụng Thứ Ba đến Thứ Năm hàng tuần",
    "conditions": "Áp dụng giá vé 2D chỉ 55.000đ cho thành viên Metiz từ 22 tuổi trở xuống. Áp dụng Thứ Ba đến Thứ Năm hàng tuần.",
    "budget_warning": "Chỉ áp dụng mua trực tiếp tại quầy; không áp dụng ngày Lễ/Tết hoặc suất chiếu sớm.",
    "has_code": false,
    "code": null,
    "claim_instruction": "Xuất trình CCCD và thẻ thành viên Metiz tại quầy bán vé để nhận giá ưu đãi.",
    "raw_sha256": "6735f1376d757eed814c7d402dc86e10998924a5d944060fbda73a561439aea8"
  },
  {
    "id": "J333_HOT_02_GALAXY_U22",
    "brand": "Galaxy Cinema",
    "title": "Vé U22 Galaxy Cinema — Từ 45.000đ",
    "tier": "BRAND_PROGRAM",
    "price_vnd": 45000,
    "source_url": "https://www.galaxycine.vn/khuyen-mai/u22-vui-ve--gia-ve-sieu-hat-de/",
    "locality_basis": "Galaxy Cinema Co.opmart Đà Nẵng, 478 Điện Biên Phủ, Thanh Khê, Đà Nẵng",
    "validity": "Chương trình quyền lợi thành viên U22 năm 2026",
    "conditions": "Giá vé ưu đãi cho học sinh, sinh viên và thành viên U22 tại Galaxy Co.opmart Đà Nẵng.",
    "budget_warning": "Yêu cầu xuất trình thẻ HSSV/CCCD chính chủ trước 17:00 từ Thứ 2 đến Thứ 6.",
    "has_code": false,
    "code": null,
    "claim_instruction": "Xuất trình thẻ HSSV hoặc CCCD tại quầy vé Galaxy Đà Nẵng.",
    "raw_sha256": "a851859ad667285cce2c1f9518478cd31cd7dcac01e8de45d94260a7a314dbdd"
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
  },
  {
    "id": "B18_PL_LOCO_VIBE",
    "batch18_id": "B18_PL_LOCO_VIBE",
    "brand": "Phúc Long Coffee & Tea",
    "title": "Combo Bật Chất Hè Loco Vibe",
    "tier": "COUNTER_DEAL",
    "price_vnd": 79000,
    "source_url": "https://phuclong.com.vn/khuyen-mai",
    "locality_basis": "Phúc Long Nguyễn Văn Linh, Bạch Đằng, Vincom Đà Nẵng (INHERITED_BRAND_PRESENCE)",
    "validity": "Chiến dịch ưu đãi BST Loco Vibe tháng 09/2026",
    "conditions": "Chiến dịch BST Lô Cồ Vibe kết hợp thức uống mùa hè và phụ kiện thời trang giới hạn.",
    "budget_warning": "Số lượng quà tặng phụ kiện có hạn theo từng chi nhánh.",
    "has_code": false,
    "code": null,
    "claim_instruction": "Mua trực tiếp tại quầy Phúc Long Đà Nẵng.",
    "raw_sha256": "e751290236a59bcf7730e2aa0bba3583561ec9082cb7945d8b87127d14fc7cf0"
  },
  {
    "id": "B16_PHUCLONG_HONEY_P1",
    "brand": "Phúc Long Coffee & Tea",
    "title": "Combo 1 bánh + 1 nước Hương Mật Ươm Sắc",
    "tier": "COUNTER_DEAL",
    "price_vnd": 65000,
    "source_url": "https://phuclong.com.vn/khuyen-mai",
    "locality_basis": "Phúc Long Nguyễn Văn Linh, Bạch Đằng, Vincom Đà Nẵng",
    "validity": "Chiến dịch ưu đãi combo bánh nước tháng 09/2026",
    "conditions": "Ưu đãi giá combo khi mua kèm bánh ngọt nướng trong BST Hương Mật Ươm Sắc.",
    "budget_warning": "Áp dụng theo danh mục bánh ngọt có sẵn tại quầy.",
    "has_code": false,
    "code": null,
    "claim_instruction": "Gọi combo trực tiếp tại quầy Phúc Long Đà Nẵng.",
    "raw_sha256": "cb02ea7c1664531ee389e6eb121cc26c4f02868ff16f9f38bc449339e083c27e"
  },
  {
    "id": "B16_PHUCLONG_LOCO_P1",
    "brand": "Phúc Long Coffee & Tea",
    "title": "Combo Lô Cồ Vibe túi lưới và nước size L",
    "tier": "COUNTER_DEAL",
    "price_vnd": 85000,
    "source_url": "https://phuclong.com.vn/khuyen-mai",
    "locality_basis": "Phúc Long Nguyễn Văn Linh, Bạch Đằng, Vincom Đà Nẵng",
    "validity": "Chiến dịch ưu đãi combo quà tặng túi lưới tháng 09/2026",
    "conditions": "Mua 01 nước size L bất kỳ trong BST Lô Cồ Vibe nhận ngay túi lưới thời trang tiện dụng.",
    "budget_warning": "Số lượng túi lưới có hạn theo ngày.",
    "has_code": false,
    "code": null,
    "claim_instruction": "Nhận quà tặng kèm khi thanh toán trực tiếp tại quầy Phúc Long Đà Nẵng.",
    "raw_sha256": "e751290236a59bcf7730e2aa0bba3583561ec9082cb7945d8b87127d14fc7cf0"
  },
  {
    "id": "B18_HL_SUA_LOC6",
    "batch18_id": "B18_HL_SUA_LOC6",
    "brand": "Highlands Coffee",
    "title": "Cà phê Sữa Đá Lon Highlands (Lốc 6 lon)",
    "tier": "COUNTER_DEAL",
    "price_vnd": 84000,
    "source_url": "https://shop.highlandscoffee.com.vn/collections",
    "locality_basis": "Cửa hàng Highlands Coffee Đà Nẵng: Indochina Riverside (74 Bạch Đằng), VTV8 (258 Bạch Đằng), Vĩnh Trung Plaza (255 Hùng Vương), Vincom Ngô Quyền",
    "validity": "Sản phẩm đóng gói niêm yết chính hãng tháng 09/2026",
    "conditions": "Lốc 6 lon Cà phê Sữa Đá Highlands (185ml/lon). Giá niêm yết chính hãng.",
    "budget_warning": "Sản phẩm bán lẻ tại quầy đóng gói; giá niêm yết chính thức.",
    "has_code": false,
    "code": null,
    "claim_instruction": "Mua tại quầy bán lẻ hoặc các cửa hàng Highlands Coffee Đà Nẵng.",
    "raw_sha256": "1cea6145740bb28e8a058a3252a9c3ee73c7a0716bef673f742ae77b0eee1de4"
  },
  {
    "id": "B18_HL_DEN_LOC6",
    "batch18_id": "B18_HL_DEN_LOC6",
    "brand": "Highlands Coffee",
    "title": "Cà phê Đen Đá Lon Highlands (Lốc 6 lon)",
    "tier": "COUNTER_DEAL",
    "price_vnd": 84000,
    "source_url": "https://shop.highlandscoffee.com.vn/collections",
    "locality_basis": "Cửa hàng Highlands Coffee Đà Nẵng: Indochina Riverside (74 Bạch Đằng), VTV8 (258 Bạch Đằng), Vĩnh Trung Plaza (255 Hùng Vương), Vincom Ngô Quyền",
    "validity": "Sản phẩm đóng gói niêm yết chính hãng tháng 09/2026",
    "conditions": "Lốc 6 lon Cà phê Đen Đá Highlands (185ml/lon). Giá niêm yết chính hãng.",
    "budget_warning": "Sản phẩm bán lẻ tại quầy đóng gói; giá niêm yết chính thức.",
    "has_code": false,
    "code": null,
    "claim_instruction": "Mua tại quầy bán lẻ hoặc các cửa hàng Highlands Coffee Đà Nẵng.",
    "raw_sha256": "1cea6145740bb28e8a058a3252a9c3ee73c7a0716bef673f742ae77b0eee1de4"
  },
  {
    "id": "B18_HL_PHIN_DI_SAN",
    "batch18_id": "B18_HL_PHIN_DI_SAN",
    "brand": "Highlands Coffee",
    "title": "Cà phê Phin Di Sản Highlands (Gói 200g)",
    "tier": "COUNTER_DEAL",
    "price_vnd": 65000,
    "source_url": "https://shop.highlandscoffee.com.vn/collections",
    "locality_basis": "Cửa hàng Highlands Coffee Đà Nẵng: Indochina Riverside (74 Bạch Đằng), VTV8 (258 Bạch Đằng), Vĩnh Trung Plaza (255 Hùng Vương), Vincom Ngô Quyền",
    "validity": "Sản phẩm cà phê bột rang xay niêm yết tháng 09/2026",
    "conditions": "Cà phê rang xay truyền thống Di Sản gói 200g. Thơm ngon đậm vị Việt.",
    "budget_warning": "Sản phẩm cà phê gói tự pha.",
    "has_code": false,
    "code": null,
    "claim_instruction": "Mua tại quầy bán lẻ hoặc các cửa hàng Highlands Coffee Đà Nẵng.",
    "raw_sha256": "1cea6145740bb28e8a058a3252a9c3ee73c7a0716bef673f742ae77b0eee1de4"
  },
  {
    "id": "B18_CGV_NGAY_DOI",
    "batch18_id": "B18_CGV_NGAY_DOI",
    "brand": "CGV Cinemas Đà Nẵng",
    "title": "CGV Ngày Đôi — Vé 2D Đồng Giá Ưu Đãi",
    "tier": "BRAND_PROGRAM",
    "price_vnd": 55000,
    "source_url": "https://www.cgv.vn/default/newsoffer/cgv-ngay-doi/",
    "locality_basis": "Cụm rạp CGV Vĩnh Trung Plaza & CGV Vincom Đà Nẵng",
    "validity": "Chương trình định kỳ Ngày Đôi tháng 09/2026",
    "conditions": "Chương trình Ngày Đôi tại cụm rạp CGV toàn quốc và Đà Nẵng. Vé xem phim 2D tiêu chuẩn cho thành viên CGV.",
    "budget_warning": "Chỉ áp dụng cho thành viên CGV; không áp dụng đồng thời ưu đãi khác.",
    "has_code": false,
    "code": null,
    "claim_instruction": "Đăng nhập tài khoản thành viên trên app CGV hoặc xuất trình thẻ tại quầy vé CGV Đà Nẵng.",
    "raw_sha256": "21a050f22a436fc08de30f6b75ae9a181be5681504859504ea57239f832d31f0"
  },
  {
    "id": "B18_CGV_BIRTHDAY_GIFT",
    "batch18_id": "B18_CGV_BIRTHDAY_GIFT",
    "brand": "CGV Cinemas Đà Nẵng",
    "title": "Quà Tặng Sinh Nhật Thành Viên CGV (Bắp Nước Miễn Phí)",
    "tier": "BRAND_PROGRAM",
    "price_vnd": 0,
    "source_url": "https://www.cgv.vn/default/newsoffer/birthday-promo/",
    "locality_basis": "Cụm rạp CGV Vĩnh Trung Plaza & CGV Vincom Đà Nẵng",
    "validity": "Hiệu lực từ 01.09.2026 đến 30.09.2026 cho thành viên sinh nhật tháng 9",
    "conditions": "MIỄN PHÍ 1 CGV Birthday Combo (1 Bắp ngọt + 2 Nước) cho tất cả thành viên có SINH NHẬT TRONG THÁNG 9/2026 tại quầy rạp CGV.",
    "budget_warning": "Yêu cầu có giao dịch phát sinh trong 24 tháng hoặc tạo giao dịch mới để nhận quà.",
    "has_code": false,
    "code": null,
    "claim_instruction": "Xuất trình CCCD/VNeID và thẻ/app CGV chính chủ tại quầy bắp nước CGV Đà Nẵng.",
    "raw_sha256": "b507208ba1d5315f1ee53e64611f370021171fcf1a145570f8e6e7f1fbe214c0"
  },
  {
    "id": "B14_PLONG_MEMBER_BENEFITS",
    "brand": "Phúc Long Coffee & Tea",
    "title": "Chương Trình Hội Viên Phúc Long: Tích Điểm & Đổi Quà",
    "tier": "BRAND_PROGRAM",
    "price_vnd": 0,
    "source_url": "https://phuclong.com.vn/tin-tuc/chuong-trinh-thanh-vien-phuc-long",
    "locality_basis": "Áp dụng toàn bộ cửa hàng Phúc Long Đà Nẵng",
    "validity": "Chương trình khách hàng thân thiết năm 2026",
    "conditions": "Đăng ký thành viên tích lũy điểm thưởng đổi voucher giảm giá trên hóa đơn đồ uống.",
    "budget_warning": "Quyền lợi thành viên dài hạn tích lũy theo điểm tiêu dùng.",
    "has_code": false,
    "code": null,
    "claim_instruction": "Đọc số điện thoại thành viên khi gọi món tại quầy Phúc Long.",
    "raw_sha256": "b0b2e8d47b561c21051515bf28c89bdf01a75094f92d4f826fae30a597a47b1c"
  },
  {
    "id": "P2O_GALAXY_MEMBER_2026",
    "brand": "Galaxy Cinema",
    "title": "Quyền Lợi Thành Viên Galaxy Cinema 2026",
    "tier": "BRAND_PROGRAM",
    "price_vnd": 0,
    "source_url": "https://www.galaxycine.vn/khuyen-mai/quyen-loi-thanh-vien-galaxy-cinema/",
    "locality_basis": "Galaxy Cinema Co.opmart Đà Nẵng",
    "validity": "Chương trình quyền lợi thành viên năm 2026",
    "conditions": "Chính sách tích điểm Stars đổi bắp nước và vé xem phim miễn phí trong năm 2026.",
    "budget_warning": "Điểm Stars có thời hạn sử dụng theo quy định của Galaxy Cinema.",
    "has_code": false,
    "code": null,
    "claim_instruction": "Đăng nhập app Galaxy Cinema hoặc đọc số điện thoại tại quầy vé.",
    "raw_sha256": "b0b2e8d47b561c21051515bf28c89bdf01a75094f92d4f826fae30a597a47b1c"
  },
  {
    "id": "P2O_GALAXY_SHOPEEPAY_SEP_2026",
    "brand": "Galaxy Cinema & ShopeePay",
    "title": "Voucher ShopeePay tại Galaxy Cinema — Tháng 09/2026",
    "tier": "APP_VOUCHER",
    "price_vnd": 10000,
    "source_url": "https://shopeepay.vn/khuyen-mai/galaxy-cinema-2026/",
    "locality_basis": "Galaxy Cinema Co.opmart Đà Nẵng",
    "validity": "Chiến dịch ví điện tử tháng 09/2026",
    "conditions": "Nhập mã khuyến mãi trên ví điện tử ShopeePay khi thanh toán vé xem phim tại quầy hoặc online.",
    "budget_warning": "Số lượng voucher ShopeePay có hạn trong tháng.",
    "has_code": false,
    "code": null,
    "claim_instruction": "Mở ứng dụng ShopeePay tại mục \"Mã Giảm giá\" để nhận voucher thanh toán vé xem phim tại Galaxy Cinema.",
    "raw_sha256": "b0b2e8d47b561c21051515bf28c89bdf01a75094f92d4f826fae30a597a47b1c"
  }
];

  const VALUE_RADAR_ITEMS = [
  {
    "sku_id": "B17_RADAR_PL_DTX64GB",
    "model": "DTX/64GB",
    "name": "HDD USB Kingston 64GB DataTraveler Exodia DTX/64GB (USB 3.2)",
    "category": "USB_STORAGE",
    "price_vnd": 290000,
    "captured_at": "2026-09-06T05:15:55.000Z",
    "stock_status": "Khảo sát giá niêm yết theo nguồn; vui lòng kiểm tra tình trạng hàng thực tế tại showroom trước khi mua",
    "terms": "Bảo hành 36 tháng chính hãng Kingston tại Phi Long Đà Nẵng",
    "source_url": "https://philong.com.vn/hdd-usb-kingston-64gb-datatraveler-exodia-dtx64gb-usb-3.2.html",
    "raw_sha256": "108a8554e25c93ac97ccb7da249a019da6069ce17df63626a72cd5843b9ed993"
  },
  {
    "sku_id": "B17_RADAR_PL_LJDS080064G",
    "model": "LJDS080064G-BNBNG",
    "name": "USB Lexar JumpDrive S80 64GB USB 3.2 Gen 1 150MB/s (LJDS080064G-BNBNG)",
    "category": "USB_STORAGE",
    "price_vnd": 275000,
    "captured_at": "2026-09-08T05:55:54.000Z",
    "stock_status": "Khảo sát giá niêm yết theo nguồn; vui lòng kiểm tra tình trạng hàng thực tế tại showroom trước khi mua",
    "terms": "Bảo hành chính hãng tại Phi Long Đà Nẵng",
    "source_url": "https://philong.com.vn/usb-lexar-jumpdrive-s80-64gb.html",
    "raw_sha256": "74f0610362e0170010a8f73e018f115934d6a714a53d3b4006d72271acd42f9a"
  },
  {
    "sku_id": "B17_RADAR_PL_LJDM400064G",
    "model": "LJDM400064G-BNBNG",
    "name": "USB Lexar JumpDrive M400 64GB USB 3.2 150MB/s (LJDM400064G-BNBNG)",
    "category": "USB_STORAGE",
    "price_vnd": 290000,
    "captured_at": "2026-09-08T05:55:54.000Z",
    "stock_status": "Khảo sát giá niêm yết theo nguồn; vui lòng kiểm tra tình trạng hàng thực tế tại showroom trước khi mua",
    "terms": "Bảo hành chính hãng tại Phi Long Đà Nẵng",
    "source_url": "https://philong.com.vn/usb-lexar-jumpdrive-m400-64gb-ljdm400064g-bnbng.html",
    "raw_sha256": "4ab247e3d2c8dad635e046e2e18781ea89c4528496b9f07a5e4e92201c3ba293"
  },
  {
    "sku_id": "B17_RADAR_PL_SDDDC6",
    "model": "SDDDC6-064G-G46",
    "name": "USB Sandisk 64GB Phone Drive USB 3.2 Type-C/A (SDDDC6-064G-G46)",
    "category": "USB_STORAGE",
    "price_vnd": 590000,
    "captured_at": "2026-09-08T05:55:54.000Z",
    "stock_status": "Khảo sát giá niêm yết theo nguồn; vui lòng kiểm tra tình trạng hàng thực tế tại showroom trước khi mua",
    "terms": "Bảo hành chính hãng tại Phi Long Đà Nẵng",
    "source_url": "https://philong.com.vn/usb-sandisk-64gb-phone-drive-sdddc6-064g-g46.html",
    "raw_sha256": "30a1b53e0570446d86c0f76d0a79e220bf7b6467ec6b4383035ff30cfc58de02"
  },
  {
    "sku_id": "B17_RADAR_PL_CZ600",
    "model": "CZ600-64GB",
    "name": "USB 64GB Sandisk Cruzer Glide CZ600 USB3.0",
    "category": "USB_STORAGE",
    "price_vnd": 450000,
    "captured_at": "2026-09-08T05:55:54.000Z",
    "stock_status": "Khảo sát giá niêm yết theo nguồn; vui lòng kiểm tra tình trạng hàng thực tế tại showroom trước khi mua",
    "terms": "Bảo hành chính hãng tại Phi Long Đà Nẵng",
    "source_url": "https://philong.com.vn/usb-64gb-sandisk-3.0-cz600.html",
    "raw_sha256": "dd3cc16905fe15296f3f0771126e3ff4acb99f39a5dc0a9905bc5fbd29752741"
  },
  {
    "sku_id": "B17_RADAR_PL_SDCZ74",
    "model": "SDCZ74-064G",
    "name": "HDD USB 64GB SANDISK ULTRA LUXE USB 3.1(SDCZ74-064G)",
    "category": "USB_STORAGE",
    "price_vnd": 590000,
    "captured_at": "2026-09-08T05:55:54.000Z",
    "stock_status": "Khảo sát giá niêm yết theo nguồn; vui lòng kiểm tra tình trạng hàng thực tế tại showroom trước khi mua",
    "terms": "Bảo hành chính hãng tại Phi Long Đà Nẵng",
    "source_url": "https://philong.com.vn/usb-64gb-sandisk-ultra-luxe-sdcz74-3.1.html",
    "raw_sha256": "3ddda327cc1e2598cf028ad5fdd33821b79e091dd6b53ed213ed7a8e41bf5490"
  },
  {
    "sku_id": "B17_RADAR_PL_DTXM128GB",
    "model": "DTXM/128GB",
    "name": "USB Kingston 128GB DataTraveler Exodia M DTXM/128GB (USB 3.2 Gen 1)",
    "category": "USB_STORAGE",
    "price_vnd": 350000,
    "captured_at": "2026-09-08T05:55:54.000Z",
    "stock_status": "Khảo sát giá niêm yết theo nguồn; vui lòng kiểm tra tình trạng hàng thực tế tại showroom trước khi mua",
    "terms": "Bảo hành chính hãng tại Phi Long Đà Nẵng",
    "source_url": "https://philong.com.vn/usb-kingston-datatraveler-exodia-m-dtxm-128gb.html",
    "raw_sha256": "c698b3596034686643ef8ceefd2f6ed85541f86ba3437d7cf79e1a81f446664a"
  },
  {
    "sku_id": "B17_RADAR_PL_DTX256GB",
    "model": "DTX/256GB",
    "name": "USB Kingston 256GB DataTraveler Exodia USB 3.2 (DTX/256GB)",
    "category": "USB_STORAGE",
    "price_vnd": 790000,
    "captured_at": "2026-09-08T05:55:54.000Z",
    "stock_status": "Khảo sát giá niêm yết theo nguồn; vui lòng kiểm tra tình trạng hàng thực tế tại showroom trước khi mua",
    "terms": "Bảo hành chính hãng tại Phi Long Đà Nẵng",
    "source_url": "https://philong.com.vn/usb-kingston-256gb-datatraveler-exodia-dtx-256gb.html",
    "raw_sha256": "f864411b251c7a7e39585cbb80a53cae8237ea21596a7053ba4eb875cd41490e"
  },
  {
    "sku_id": "B17_RADAR_PL_SXS1000",
    "model": "SXS1000/1000GA",
    "name": "Ổ Cứng Di Động SSD Kingston XS1000 1TB USB 3.2 Gen 2 Black (SXS1000/1000GA)",
    "category": "SSD_STORAGE",
    "price_vnd": 5290000,
    "captured_at": "2026-09-08T05:55:54.000Z",
    "stock_status": "Khảo sát giá niêm yết theo nguồn; vui lòng kiểm tra tình trạng hàng thực tế tại showroom trước khi mua",
    "terms": "Bảo hành chính hãng tại Phi Long Đà Nẵng",
    "source_url": "https://philong.com.vn/ssd-kingston-xs1000-1tb-black-sxs1000-1000ga.html",
    "raw_sha256": "b7c19c5800dfb3ba14f994d7cfd242bd19db1c4c45847c962c56ccb0efd93dc9"
  },
  {
    "sku_id": "B17_RADAR_PL_SA400_480G",
    "model": "SA400S37/480G",
    "name": "SSD 480GB KINGSTON A400 SATA 3 2.5 INCH (SA400S37/480G)",
    "category": "SSD_STORAGE",
    "price_vnd": 3490000,
    "captured_at": "2026-09-08T05:55:54.000Z",
    "stock_status": "Khảo sát giá niêm yết theo nguồn; vui lòng kiểm tra tình trạng hàng thực tế tại showroom trước khi mua",
    "terms": "Bảo hành chính hãng tại Phi Long Đà Nẵng",
    "source_url": "https://philong.com.vn/ssd-kingston-480gb-a400-sa400s37480g-sata-iii.html",
    "raw_sha256": "e244156c9ae73e5ff12bb310eed9efd11ea538fdb0393b5208ecfe77426b2375"
  },
  {
    "sku_id": "B17_RADAR_PL_SKC3000_1024G",
    "model": "SKC3000S/1024G",
    "name": "SSD Kingston KC3000 1024GB PCIe 4.0 NVMe M.2 (SKC3000S/1024G)",
    "category": "SSD_STORAGE",
    "price_vnd": 8990000,
    "captured_at": "2026-09-08T05:55:54.000Z",
    "stock_status": "Khảo sát giá niêm yết theo nguồn; vui lòng kiểm tra tình trạng hàng thực tế tại showroom trước khi mua",
    "terms": "Bảo hành chính hãng tại Phi Long Đà Nẵng",
    "source_url": "https://philong.com.vn/ssd-kingston-kc3000-1024gb-pcie-4.0-nvme-m.2-ssd.html",
    "raw_sha256": "d768e90be4071e7070373c7ec0ad83fa6660243d8fed2ad0ea4ba19e766a2638"
  },
  {
    "sku_id": "B17_RADAR_PL_SNV3S_1000G",
    "model": "SNV3S/1000G",
    "name": "Ổ cứng gắn trong SSD Kingston NV3 1TB M.2 2280 NVMe PCIe Gen4x4 (SNV3S/1000G)",
    "category": "SSD_STORAGE",
    "price_vnd": 4490000,
    "captured_at": "2026-09-08T05:55:54.000Z",
    "stock_status": "Khảo sát giá niêm yết theo nguồn; vui lòng kiểm tra tình trạng hàng thực tế tại showroom trước khi mua",
    "terms": "Bảo hành chính hãng tại Phi Long Đà Nẵng",
    "source_url": "https://philong.com.vn/o-cung-gan-trong-ssd-kingston-nv3-1tb.html",
    "raw_sha256": "f899114ba74611c7113c6c4ebfdf9f0f1e2951ef4d27f39c4cff159a1491ea7f"
  },
  {
    "sku_id": "B17_RADAR_PL_KVR56S46BS8",
    "model": "KVR56S46BS8-16WP",
    "name": "Ram Laptop DDR5 Kingston 16GB 5600MHz 1.1V (KVR56S46BS8-16WP)",
    "category": "RAM_MEMORY",
    "price_vnd": 7490000,
    "captured_at": "2026-09-08T05:55:54.000Z",
    "stock_status": "Khảo sát giá niêm yết theo nguồn; vui lòng kiểm tra tình trạng hàng thực tế tại showroom trước khi mua",
    "terms": "Bảo hành chính hãng tại Phi Long Đà Nẵng",
    "source_url": "https://philong.com.vn/ram-laptop-ddr5-kingston-16gb-5600mhz-kvr56s46bs8-16wp.html",
    "raw_sha256": "47bac45e7264c1fef586e6d110078520908b185ebb10ac72398a9af47e59d27e"
  },
  {
    "sku_id": "B17_RADAR_PL_LENOVO_STUDENT_2026",
    "model": "LENOVO-STUDENT-2026",
    "name": "Ưu đãi học sinh, sinh viên Lenovo 2026 tại Phi Long",
    "category": "EDUCATION_PROGRAM",
    "price_vnd": null,
    "captured_at": "2026-09-07T09:21:51.000Z",
    "stock_status": "Chương trình ưu đãi theo thể lệ hãng tại Phi Long Đà Nẵng; quà tặng có thể kết thúc khi hết số lượng",
    "terms": "Tặng kèm balo chính hãng + phiếu quà tặng khi xuất trình thẻ HSSV còn hiệu lực",
    "source_url": "https://philong.com.vn/lap-xin-qua-slay-cung-lenovo.html",
    "raw_sha256": "b4475c7d43592284e31ea2992bcb1ac50a45589704566bd7429981946adbf070"
  },
  {
    "sku_id": "B17_RADAR_PL_HP_BTS_2026",
    "model": "HP-BTS-2026",
    "name": "HP Back to School 2026 tại Phi Long (OmniBook & Victus)",
    "category": "EDUCATION_PROGRAM",
    "price_vnd": null,
    "captured_at": "2026-09-07T09:21:51.000Z",
    "stock_status": "Chương trình khuyến mãi giáo dục từ hãng tại showroom Phi Long Đà Nẵng; số lượng quà tặng có hạn",
    "terms": "Tặng tai nghe gaming & chuột không dây khi mua laptop HP Victus / OmniBook cho HSSV",
    "source_url": "https://philong.com.vn/uu-dai-hp-back-to-school-2026.html",
    "raw_sha256": "7e9a01faa73b42bd4012e939b315d037d74a4c9e45dd5c08c509d0a12ad81696"
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
    return `<section class="t2-pilot-card-section" style="margin:24px 0;background:var(--bg-card);border:2px solid #0369a1;border-radius:14px;padding:20px;box-shadow:0 4px 14px rgba(3,105,161,.08);" aria-label="Thông tin chuyến bay trên Danang Smart City 1022 đã được phê duyệt RC"><div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:12px;"><span style="background:rgba(3,105,161,.12);color:#0369a1;padding:4px 10px;border-radius:6px;font-size:.78rem;font-weight:800;">✈️ T2 • TIỆN ÍCH SỐ &amp; ĐIỀU HÀNH SÂN BAY</span><span style="font-size:.75rem;color:var(--text-secondary);">RC v3.429.0 • Ứng viên phát hành</span></div><h2 style="font-size:1.25rem;font-weight:800;color:var(--text-primary);margin:0 0 10px;">${item.exact_approved_title}</h2><p style="font-size:.95rem;color:var(--text-primary);line-height:1.55;margin-bottom:14px;font-weight:500;">${item.exact_approved_copy}</p><div style="background:var(--bg-card-subtle);border-left:4px solid #0369a1;padding:12px 14px;border-radius:6px;font-size:.85rem;color:var(--text-secondary);line-height:1.5;margin-bottom:16px;">${item.scope_caveat}</div><div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;"><a href="${item.safe_canonical_action.url}" target="_blank" rel="${item.safe_canonical_action.rel}" class="btn-rail-action btn-action-portal" aria-label="Mở thông tin chuyến bay 1022 chính thức" style="background:#0369a1;color:#fff;padding:12px 20px;min-height:44px;box-sizing:border-box;border-radius:8px;text-decoration:none;font-weight:700;font-size:.88rem;display:inline-flex;align-items:center;gap:6px;">${item.safe_canonical_action.label}</a><div style="font-size:.75rem;color:var(--text-secondary);font-family:monospace;">Evidence ID: ${item.card_id}</div></div></section>`;
  }

  function renderCivicChamDanceCard() {
    const item = APPROVED_PUBLIC_ENTRIES.find(entry => entry.card_id === 'B11_02_HOAT_DONG_VAN_HOA_BAO_TANG_CHAM_1022');
    if (!item || !item.public_eligible) return '';
    return `<section class="t2-pilot-card-section" style="margin:24px 0;background:var(--bg-card);border:2px solid #0369a1;border-radius:14px;padding:20px;box-shadow:0 4px 14px rgba(3,105,161,.08);" aria-label="Lịch biểu diễn vũ điệu Champa Bảo tàng Chăm Đà Nẵng 1022 đã được phê duyệt RC"><div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:12px;"><span style="background:rgba(3,105,161,.12);color:#0369a1;padding:4px 10px;border-radius:6px;font-size:.78rem;font-weight:800;">🏛️ T2 • VĂN HÓA &amp; DI SẢN CỘNG ĐỒNG</span><span style="font-size:.75rem;color:var(--text-secondary);">RC v3.429.0 • Ứng viên phát hành</span></div><h2 style="font-size:1.25rem;font-weight:800;color:var(--text-primary);margin:0 0 10px;">${item.exact_approved_title}</h2><p style="font-size:.95rem;color:var(--text-primary);line-height:1.55;margin-bottom:14px;font-weight:500;">${item.exact_approved_copy}</p><div style="background:var(--bg-card-subtle);border-left:4px solid #0369a1;padding:12px 14px;border-radius:6px;font-size:.85rem;color:var(--text-secondary);line-height:1.5;margin-bottom:16px;">${item.scope_caveat}</div><div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;"><a href="${item.safe_canonical_action.url}" target="_blank" rel="${item.safe_canonical_action.rel}" class="btn-rail-action btn-action-portal" aria-label="Mở thông báo lịch diễn 1022 chính thức" style="background:#0369a1;color:#fff;padding:12px 20px;min-height:44px;box-sizing:border-box;border-radius:8px;text-decoration:none;font-weight:700;font-size:.88rem;display:inline-flex;align-items:center;gap:6px;">${item.safe_canonical_action.label}</a><div style="font-size:.75rem;color:var(--text-secondary);font-family:monospace;">Evidence ID: ${item.card_id}</div></div></section>`;
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
  function renderDailyGuideHome() {
    setTimeout(attachHomeCalendarEvents, 0);

    return `
      <div class="cr-experience-container">
        <div class="bento-hero-grid" aria-label="Bảng Điều Khiển Khám Phá Hôm Nay">
          <section class="bento-tile-main-stage hero-landmark-cr vivid-dragon-hero-cf" aria-label="Bìa Khám Phá Tiện Ích">
            <img 
              src="assets/images/board_a_afterglow_hero.svg" 
              alt="Đồ họa minh họa JayT Platform" 
              class="bento-stage-bg-img hero-landmark-img vivid-hero-image" 
              id="hero-main-photo"
              loading="eager"
            />
            <div class="bento-stage-gradient hero-landmark-gradient"></div>

            <div class="hero-landmark-attribution" role="note" aria-label="Thông tin bản quyền đồ họa JayT">
              🎨 Đồ họa JayT
            </div>

            <div class="bento-stage-content hero-landmark-content">
              <span class="hero-moment-pill">✨ MINH BẠCH &bull; ĐỐI SOÁT NGUỒN GỐC</span>
              <h1 class="hero-headline-cr vivid-main-title">
                Hôm Nay Bạn Cần Tìm Gì?
              </h1>
              <p class="hero-subhead-cr vivid-subhead">
                Cổng tra cứu thông tin tiện ích công cộng, học đường và công cụ tự tính toán chi phí thực tế &mdash; phân loại minh bạch, đối soát nguồn gốc.
              </p>

              <div class="hero-shopping-actions-grid">
                <button class="btn-hero-primary-solid" data-nav="EXPLORE" aria-label="Khám phá danh mục tài liệu đã đối soát">
                  🛡️ Danh mục đã đối soát &rarr;
                </button>
                <button class="btn-hero-secondary-outline" data-nav="BUY_DECISION" aria-label="Mở Bảng tính thực trả Local-First">
                  🧮 Bảng tính thực trả &rarr;
                </button>
              </div>
            </div>
          </section>

          <div class="bento-side-column">
            <div class="bento-tile-moment">
              <div class="bento-moment-header">
                <span class="bento-moment-badge">🛡️ Trạng thái Staging</span>
              </div>
              <h2 style="font-size: 1.05rem; font-weight: 700; margin: 8px 0 4px 0;">Đối Soát Nguồn Gốc</h2>
              <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.45;">
                Toàn bộ nguồn đang được kiểm định độc lập theo Evidence Contract v3 trước khi công bố.
              </p>
            </div>

            <div class="bento-tile-dock">
              <span class="dock-badge">⚡ TRUY CẬP NHANH</span>
              <h2 style="font-size: 1.05rem; font-weight: 700; margin: 4px 0 8px 0;">Công Cụ Tiện Ích</h2>
              <div class="bento-dock-row">
                <button class="bento-dock-btn" data-nav="BUY_DECISION" aria-label="Mở Bảng tính thực trả">
                  <span class="bento-dock-icon">🧮</span>
                  <span>Bảng Tính</span>
                </button>
                <button class="bento-dock-btn" data-nav="EXPLORE" aria-label="Mở mục đối soát">
                  <span class="bento-dock-icon">🛡️</span>
                  <span>Đối Soát</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        ${renderHomeCalendarStrip()}

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
    } else if (item.tier === 'PRICE_OBSERVATION') {
      tierBadge = '<span class="vault-tier-badge badge-price-observation">📋 Giá quan sát niêm yết</span>';
    } else if (item.tier === 'COUNTER_DEAL') {
      tierBadge = '<span class="vault-tier-badge badge-counter-deal">🟢 Ưu đãi quầy</span>';
    } else if (item.tier === 'BRAND_PROGRAM') {
      tierBadge = '<span class="vault-tier-badge badge-brand-program">🔵 Ưu đãi thành viên</span>';
    } else {
      tierBadge = '<span class="vault-tier-badge badge-app-voucher">🟣 Claim qua App</span>';
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

        ${item.price_vnd ? `
          <div class="vault-card-price">
            <span>${formatVndPrice(item.price_vnd)}</span>
            <small style="font-size: 0.78rem; font-weight: 500; color: var(--text-muted);">
              ${item.tier === 'PRICE_OBSERVATION' ? '(Biểu giá quan sát niêm yết thường nhật, không phải voucher giảm giá)' : '(Ưu đãi tại quầy)'}
            </small>
          </div>
        ` : ''}

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
          <!-- CLAIM ACTION SECTION: STRICT COPY BUTTON GUARD (Only render when real published code exists AND item is active) -->
          <div class="vault-claim-instruction">
            ${(item.has_code && item.code && !isHeld) ? `
              <div style="display: flex; align-items: center; justify-content: space-between; width: 100%; gap: 10px; flex-wrap: wrap;">
                <span>Mã ưu đãi: <code>${item.code}</code></span>
                <button type="button" class="btn-copy-code" data-code="${item.code}" aria-label="Sao chép mã ${item.code}">
                  Sao chép mã
                </button>
              </div>
            ` : `
              <span>🏷️ <strong>Cách nhận:</strong> ${item.claim_instruction}</span>
            `}
          </div>
        `}

        <div class="vault-meta-row" style="font-size: 0.75rem; color: var(--text-muted); font-family: monospace;">
          Băm SHA-256 nguồn: ${item.raw_sha256.slice(0, 16)}...
        </div>

        <div class="vault-card-actions" style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 14px;">
          <a href="${item.source_url}" target="_blank" rel="noopener noreferrer nofollow" class="btn-rail-action" style="background: var(--bg-card-subtle); color: var(--text-primary); border: 1px solid var(--border-subtle); padding: 8px 14px; border-radius: 6px; text-decoration: none; font-size: 0.85rem; font-weight: 600; display: inline-flex; align-items: center; gap: 4px; min-height: 44px; min-width: 44px;" aria-label="Xem nguồn chính thức cho ${item.title} trong tab mới">
            ${isHeld ? 'Xem thông báo gốc ↗' : 'Xem nguồn chính thức ↗'}
          </a>
          ${(item.price_vnd && !isHeld) ? `
            <button type="button" class="btn-split-shortcut" data-split-amount="${item.price_vnd}" data-split-desc="${item.title}" aria-label="Mở trang Chia Bill Pro cho ${item.title}">
              🧮 Mở Chia Bill Pro
            </button>
          ` : ''}
        </div>

        ${(item.price_vnd && !isHeld) ? `
          <!-- EMBEDDED INLINE SPLIT BILL WIDGET (Mandate JAYT-356) -->
          <div class="card-inline-split-wrapper" style="width: 100%; margin-top: 12px;">
            <details class="card-inline-split-details" id="details-split-${item.id}" style="background: var(--bg-card-subtle); border: 1px solid var(--border-subtle); border-radius: 8px; padding: 10px 12px;">
              <summary class="btn-split-toggle" style="cursor: pointer; font-weight: 700; font-size: 0.85rem; color: #0284c7; list-style: none; display: flex; align-items: center; justify-content: space-between; min-height: 36px;" aria-label="Mở tính năng chia tiền nhóm trực tiếp cho ${item.title}">
                <span>🧮 Chia tiền nhanh trực tiếp (2 - 8 người)</span>
                <span style="font-size: 0.75rem; background: #e0f2fe; color: #0369a1; padding: 2px 8px; border-radius: 4px; font-weight: 700;">Split Bill Pro</span>
              </summary>
              <div class="inline-split-box" style="margin-top: 10px; border-top: 1px dashed var(--border-subtle); padding-top: 10px;">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; font-size: 0.85rem;">
                  <span>Hóa đơn: <strong>${formatVndPrice(item.price_vnd)}</strong></span>
                  <div style="display: flex; align-items: center; gap: 6px;">
                    <label for="split-select-${item.id}" style="font-size: 0.8rem; color: var(--text-muted);">Số người:</label>
                    <select id="split-select-${item.id}" class="inline-split-select" data-id="${item.id}" data-bill="${item.price_vnd}" data-desc="${item.title}" style="padding: 4px 8px; border-radius: 4px; border: 1px solid var(--border-subtle); background: var(--bg-card); color: var(--text-primary); font-size: 0.82rem; font-weight: 600;">
                      <option value="2">2 người</option>
                      <option value="3" selected>3 người</option>
                      <option value="4">4 người</option>
                      <option value="5">5 người</option>
                      <option value="6">6 người</option>
                      <option value="7">7 người</option>
                      <option value="8">8 người</option>
                    </select>
                  </div>
                </div>
                <div id="inline-calc-${item.id}" class="inline-split-calc-display" style="font-size: 0.85rem; background: var(--bg-card); padding: 8px 10px; border-radius: 6px; border: 1px solid var(--border-subtle); margin-bottom: 10px;">
                  <!-- dynamically updated -->
                </div>
                <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                  <button type="button" class="btn-inline-zalo-copy" data-id="${item.id}" data-bill="${item.price_vnd}" data-desc="${item.title}" style="flex: 1; background: #0068ff; color: #ffffff; border: none; padding: 8px 14px; border-radius: 6px; font-weight: 700; font-size: 0.82rem; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; gap: 6px; min-height: 40px;" aria-label="Sao chép lời rủ Zalo kèm link tính toán">
                    💬 Rủ bạn qua Zalo (1-chạm)
                  </button>
                  <button type="button" class="btn-split-shortcut" data-split-amount="${item.price_vnd}" data-split-desc="${item.title}" style="background: var(--bg-card); color: var(--text-primary); border: 1px solid var(--border-subtle); padding: 8px 12px; border-radius: 6px; font-weight: 600; font-size: 0.82rem; cursor: pointer; min-height: 40px;" aria-label="Mở trang đầy đủ Split-Bill Pro">
                    Chi tiết ↗
                  </button>
                </div>
              </div>
            </details>
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
      const desc = (descInput.value || 'Bữa ăn nhóm').trim();
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
    setTimeout(attachSmartValueRadarEvents, 0);

    const countAll = VALUE_RADAR_ITEMS.length;
    const countUsb = VALUE_RADAR_ITEMS.filter(i => i.category === 'USB_STORAGE').length;
    const countSsd = VALUE_RADAR_ITEMS.filter(i => i.category === 'SSD_STORAGE').length;
    const countRam = VALUE_RADAR_ITEMS.filter(i => i.category === 'RAM_MEMORY').length;
    const countEdu = VALUE_RADAR_ITEMS.filter(i => i.category === 'EDUCATION_PROGRAM').length;

    return `
      <div class="sprint-b-view-container">
        <header class="sprint-b-header">
          <h1 class="sprint-b-title">
            📡 Smart Value Radar — Thiết Bị KTX &amp; Học Tập
            <span class="nav-badge-pill">${countAll} mục quan sát</span>
          </h1>
          <p class="sprint-b-subtitle">
            Khảo sát giá quan sát thực tế và tình trạng hàng tại các showroom đối tác công nghệ Đà Nẵng (Phi Long Technology). Cam kết 100% đường dẫn sạch trực tiếp, <strong>không gắn affiliate</strong>, <strong>không gắn tracking tokens</strong>.
          </p>
        </header>

        <!-- RADAR FILTERS -->
        <div class="radar-filters-bar" role="group" aria-label="Lọc thiết bị theo danh mục">
          <button class="radar-filter-btn active" data-radar-filter="ALL" aria-pressed="true">
            Tất cả <span class="nav-badge-pill">${countAll}</span>
          </button>
          <button class="radar-filter-btn" data-radar-filter="USB_STORAGE" aria-pressed="false">
            💾 Lưu trữ USB <span class="nav-badge-pill">${countUsb}</span>
          </button>
          <button class="radar-filter-btn" data-radar-filter="SSD_STORAGE" aria-pressed="false">
            ⚡ Ổ cứng SSD <span class="nav-badge-pill">${countSsd}</span>
          </button>
          <button class="radar-filter-btn" data-radar-filter="RAM_MEMORY" aria-pressed="false">
            🧠 Bộ nhớ RAM <span class="nav-badge-pill">${countRam}</span>
          </button>
          <button class="radar-filter-btn" data-radar-filter="EDUCATION_PROGRAM" aria-pressed="false">
            🎓 Ưu đãi HSSV &amp; Laptop <span class="nav-badge-pill">${countEdu}</span>
          </button>
        </div>

        <p id="radar-filter-status" role="status" style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 20px;">
          Đang hiển thị toàn bộ ${countAll} sản phẩm công nghệ thiết yếu cho sinh viên và cư dân Đà Nẵng.
        </p>

        <!-- RADAR GRID -->
        <div class="radar-grid" id="radar-grid-container" role="feed" aria-label="Danh sách thiết bị công nghệ">
          ${VALUE_RADAR_ITEMS.map(renderRadarCard).join('')}
        </div>
      </div>
    `;
  }

  function renderRadarCard(item) {
    let categoryLabel = '';
    if (item.category === 'USB_STORAGE') categoryLabel = 'Lưu trữ USB 3.2';
    else if (item.category === 'SSD_STORAGE') categoryLabel = 'Ổ cứng SSD';
    else if (item.category === 'RAM_MEMORY') categoryLabel = 'RAM Laptop DDR5';
    else categoryLabel = 'Chương trình HSSV';

    return `
      <article class="radar-card" data-category="${item.category}" aria-label="${item.name}">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; gap: 6px;">
          <span style="font-size: 0.75rem; font-weight: 700; color: #0369a1; background: #e0f2fe; padding: 3px 8px; border-radius: 4px;">
            ${categoryLabel}
          </span>
          <span style="font-size: 0.75rem; color: var(--text-muted); font-family: monospace;">
            Model: ${item.model}
          </span>
        </div>

        <h2 style="font-size: 1.05rem; font-weight: 800; color: var(--text-primary); margin: 0 0 8px 0; line-height: 1.4;">
          ${item.name}
        </h2>

        ${item.price_vnd ? `
          <div style="font-size: 1.15rem; font-weight: 800; color: #e11d48; margin-bottom: 10px;">
            ${formatVndPrice(item.price_vnd)}
            <small style="font-size: 0.75rem; font-weight: 500; color: var(--text-muted); display: block;">Giá quan sát theo nguồn</small>
          </div>
        ` : `
          <div style="font-size: 0.95rem; font-weight: 700; color: #059669; margin-bottom: 10px;">
            Ưu đãi kèm quà tặng sinh viên
          </div>
        `}

        <div class="radar-stock-badge">
          ${item.stock_status}
        </div>

        ${item.terms ? `
        <div style="font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 6px;">
          <strong>📋 Điều kiện:</strong> ${item.terms}
        </div>
        ` : ''}

        <div style="font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 6px;">
          <strong>📍 Địa bàn đối tác:</strong> Showroom Phi Long Đà Nẵng (152 Hàm Nghi &amp; 52 Nguyễn Văn Linh). <em>(Địa chỉ showroom không bảo đảm sẵn hàng mọi thời điểm)</em>
        </div>

        <div style="font-size: 0.78rem; color: var(--text-muted); margin-bottom: 14px;">
          🕒 Ghi nhận theo HTTP Date: ${item.captured_at}
        </div>

        <div style="font-size: 0.75rem; color: var(--text-muted); font-family: monospace; margin-bottom: 14px;">
          SHA-256: ${item.raw_sha256.slice(0, 16)}...
        </div>

        <div style="margin-top: auto; display: flex; flex-direction: column; gap: 8px;">
          <a href="${item.source_url}" target="_blank" rel="noopener noreferrer nofollow" class="btn-rail-action" style="background: var(--bg-card-subtle); color: var(--text-primary); border: 1px solid var(--border-subtle); padding: 8px 14px; border-radius: 6px; text-decoration: none; font-size: 0.85rem; font-weight: 600; display: inline-flex; align-items: center; gap: 4px; min-height: 44px; width: 100%; box-sizing: border-box; justify-content: center;" aria-label="Mở trang sản phẩm ${item.name} trên website Phi Long">
            Xem sản phẩm tại nguồn ↗
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
