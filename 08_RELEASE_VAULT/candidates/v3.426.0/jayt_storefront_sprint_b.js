/**
 * JAYT STOREFRONT STAGING SOURCE OF TRUTH (SECTION EZ-V)
 * Version: v3.424.0 (Release Candidate)
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
    "title": "Combo CÀNG CAY CÀNG MÊ",
    "brand": "Jollibee",
    "tier": "PRICE_OBSERVATION",
    "price_vnd": 157000,
    "source_url": "https://jollibee.com.vn/c-ng-cay-c-ng-me.html",
    "locality_basis": "Thương hiệu có 9 cửa hàng tại Đà Nẵng (INHERITED_BRAND_PRESENCE)",
    "validity": "Thực đơn thường nhật tại thời điểm quan sát",
    "conditions": "Áp dụng trực tiếp tại quầy hoặc đặt món trực tuyến; giá có thể thay đổi theo tùy chọn thức uống",
    "budget_warning": "Giá niêm yết có thể thay đổi mà không báo trước; không phải voucher giảm giá",
    "has_code": false,
    "code": null,
    "claim_instruction": "Gọi món trực tiếp tại quầy Jollibee hoặc đặt qua hotline/app Jollibee",
    "raw_sha256": "dc14e9de7763914eb95bb985c8e4c8d40b42fd2f5eb78cc2b83d34de34c5982e"
  },
  {
    "id": "B14_JB_70144",
    "title": "Combo MỘT MÌNH HÍT HÀ",
    "brand": "Jollibee",
    "tier": "PRICE_OBSERVATION",
    "price_vnd": 80000,
    "source_url": "https://jollibee.com.vn/m-t-minh-hit-ha.html",
    "locality_basis": "Thương hiệu có 9 cửa hàng tại Đà Nẵng",
    "validity": "Thực đơn thường nhật tại thời điểm quan sát",
    "conditions": "Áp dụng trực tiếp tại quầy hoặc ứng dụng Jollibee",
    "budget_warning": "Giá niêm yết có thể thay đổi mà không báo trước; không phải voucher giảm giá",
    "has_code": false,
    "code": null,
    "claim_instruction": "Gọi món trực tiếp tại quầy Jollibee Đà Nẵng",
    "raw_sha256": "6c9aff91c21ea0d0d4162562a87bb4429562052da1397298696e2bf67b4e2e92"
  },
  {
    "id": "B14_JB_2840004",
    "title": "Mì Ý Sốt Bò Bằm + 1 miếng gà rán + Nước ngọt",
    "brand": "Jollibee",
    "tier": "PRICE_OBSERVATION",
    "price_vnd": 73000,
    "source_url": "https://jollibee.com.vn/combo-2-ngu-i.html",
    "locality_basis": "Thương hiệu có 9 cửa hàng tại Đà Nẵng",
    "validity": "Thực đơn thường nhật tại thời điểm quan sát",
    "conditions": "Áp dụng tại quầy trên toàn hệ thống",
    "budget_warning": "Giá niêm yết tại thời điểm đối soát; không phải voucher giảm giá",
    "has_code": false,
    "code": null,
    "claim_instruction": "Gọi món trực tiếp tại quầy",
    "raw_sha256": "e21932b54d10f6ef1c8416bacdd9e4293f8bd96db3aa49ee5ff7f534d5633a5b"
  },
  {
    "id": "B14_JB_4000742",
    "title": "Combo Cặp Đôi Ăn Ý",
    "brand": "Jollibee",
    "tier": "PRICE_OBSERVATION",
    "price_vnd": 145000,
    "source_url": "https://jollibee.com.vn/c-p-doi-an-y.html",
    "locality_basis": "Thương hiệu có 9 cửa hàng tại Đà Nẵng",
    "validity": "Thực đơn thường nhật tại thời điểm quan sát",
    "conditions": "Combo 2 người",
    "budget_warning": "Giá niêm yết tại thời điểm đối soát; không phải voucher giảm giá",
    "has_code": false,
    "code": null,
    "claim_instruction": "Gọi món trực tiếp tại quầy",
    "raw_sha256": "ef2fa0bd8e8099856281741cdc613a4d5ea3508fd360b6df11a12862313c5587"
  },
  {
    "id": "B14_JB_4000935",
    "title": "COMBO 179",
    "brand": "Jollibee",
    "tier": "PRICE_OBSERVATION",
    "price_vnd": 185000,
    "source_url": "https://jollibee.com.vn/combo-4-ngu-i.html",
    "locality_basis": "Thương hiệu có 9 cửa hàng tại Đà Nẵng",
    "validity": "Thực đơn thường nhật tại thời điểm quan sát",
    "conditions": "Combo gia đình / nhóm 4 người",
    "budget_warning": "Giá niêm yết tại thời điểm đối soát; không phải voucher giảm giá",
    "has_code": false,
    "code": null,
    "claim_instruction": "Gọi món trực tiếp tại quầy",
    "raw_sha256": "7e8c29b870c485fd467e6dcdfbec22ee1c8b12bd223548327752253d78351dfb"
  },
  {
    "id": "J333_JOLLIBEE_SPICY_SPAGHETTI_40K",
    "title": "Mỳ Ý Sốt Cay Jollibee",
    "brand": "Jollibee",
    "tier": "PRICE_OBSERVATION",
    "price_vnd": 40000,
    "source_url": "https://jollibee.com.vn/blog/post/m%E1%BB%B3-y-s%E1%BB%91t-cay-m%E1%BB%9Bi-t%E1%BA%A1i-jollibee-b%E1%BA%A1n-da-th%E1%BB%AD-chua",
    "locality_basis": "Thương hiệu có 9 cửa hàng tại Đà Nẵng",
    "validity": "Theo bài công bố chính thức Jollibee",
    "conditions": "Giá 40.000đ khi gọi món tại quầy",
    "budget_warning": "Có thể kết thúc khi hết đợt; không phải voucher giảm giá",
    "has_code": false,
    "code": null,
    "claim_instruction": "Gọi món trực tiếp tại quầy",
    "raw_sha256": "653d84a0a2ab5c455478dae56ef7bc5a94a576bee981a0d9463f4a687576d14b"
  },
  {
    "id": "B14_GALAXY_DANANG_TARIFF",
    "title": "Biểu Giá Vé Galaxy Cinema Coop Đà Nẵng",
    "brand": "Galaxy Cinema",
    "tier": "PRICE_OBSERVATION",
    "price_vnd": 45000,
    "source_url": "https://www.galaxycine.vn/rap-gia-ve/galaxy-da-nang/",
    "locality_basis": "Tầng 3 Co.opmart, 478 Điện Biên Phủ, Thanh Khê, Đà Nẵng",
    "validity": "Theo biểu giá niêm yết của rạp năm 2026",
    "conditions": "Áp dụng cho các suất chiếu và đối tượng theo bảng giá rạp",
    "budget_warning": "Phụ thu ghế VIP / phim 3D theo quy định; biểu giá niêm yết, không phải mã giảm giá",
    "has_code": false,
    "code": null,
    "claim_instruction": "Mua tại quầy vé Galaxy Coopmart Đà Nẵng hoặc app Galaxy Cinema",
    "raw_sha256": "8de892a4834a403c8361b375133d2c5306a9bfeee5be9c5cb8db3495c6dd348c"
  },
  {
    "id": "B14_METIZ_U22_2D",
    "title": "Khuyến Mãi Giá Vé U22 (2D chỉ 55.000đ)",
    "brand": "Metiz Cinema Đà Nẵng",
    "tier": "COUNTER_DEAL",
    "price_vnd": 55000,
    "source_url": "https://metiz.vn/promotion/khuyen-mai-gia-ve-u22-21.html",
    "locality_basis": "Rạp Metiz Cinema tại Helio Center, Đường 2/9, Hải Châu, Đà Nẵng",
    "validity": "Áp dụng các ngày Thứ Ba đến Thứ Năm hàng tuần",
    "conditions": "Thành viên từ 22 tuổi trở xuống. Xuất trình thẻ thành viên & CCCD tại quầy trước khi mua vé.",
    "budget_warning": "Không áp dụng vào các ngày Lễ, Tết, suất chiếu sớm/đặc biệt",
    "has_code": false,
    "code": null,
    "claim_instruction": "Xuất trình CCCD & Thẻ thành viên Metiz tại quầy vé Helio Center",
    "raw_sha256": "0fbf20dc8f512fc1d9bd102b1a27c261cc9538510e0f5a6ddff9b881be1c06a2"
  },
  {
    "id": "J333_HOT_02_GALAXY_U22",
    "title": "Vé U22 Galaxy Cinema — Từ 45.000đ",
    "brand": "Galaxy Cinema",
    "tier": "COUNTER_DEAL",
    "price_vnd": 45000,
    "source_url": "https://www.galaxycine.vn/u22/",
    "locality_basis": "Galaxy Cinema Coopmart Đà Nẵng",
    "validity": "Chính sách U22 năm 2026 (ngày trong tuần)",
    "conditions": "Khách hàng thành viên từ 22 tuổi trở xuống; xuất trình CCCD tại quầy",
    "budget_warning": "Không áp dụng vào ngày Lễ/Tết và suất chiếu đặc biệt",
    "has_code": false,
    "code": null,
    "claim_instruction": "Xuất trình CCCD hoặc thẻ HSSV tại quầy vé",
    "raw_sha256": "12d36958c4db0addb42f5ed514f9038b44e310d9b1a743f3fb1cfea15b2fa7f9"
  },
  {
    "id": "B14_PLONG_MEMBER_BENEFITS",
    "title": "Chương Trình Hội Viên Phúc Long: Tích Điểm & Đổi Quà",
    "brand": "Phúc Long Coffee & Tea",
    "tier": "BRAND_PROGRAM",
    "price_vnd": null,
    "source_url": "https://phuclong.com.vn/hoi-vien/dieu-khoan-va-dieu-kien-chuong-trinh-hoi-vien",
    "locality_basis": "5 chi nhánh Phúc Long tại Đà Nẵng (Lotte Mart, Nguyễn Văn Linh, Trần Hưng Đạo, Xô Viết Nghệ Tĩnh, Mega Market)",
    "validity": "Chính sách hội viên năm 2026; điểm có hạn dùng 1 năm",
    "conditions": "10.000đ = 1 điểm tích lũy; 100 điểm khả dụng = đổi 1 ly nước size vừa (M). Ngoại trừ chi nhánh sân bay",
    "budget_warning": "Không áp dụng đồng thời với các voucher hoặc chương trình khuyến mãi khác; không phát hành mã voucher giả lập",
    "has_code": false,
    "code": null,
    "claim_instruction": "Đọc số điện thoại thành viên Phúc Long khi thanh toán tại quầy hoặc qua app Phúc Long",
    "raw_sha256": "9c4eadd1660bc043c3a6c685fd98589ead6bb4dbe5eb498ced669fbc46c938c4"
  },
  {
    "id": "P2O_GALAXY_MEMBER_2026",
    "title": "Quyền Lợi Thành Viên Galaxy Cinema 2026",
    "brand": "Galaxy Cinema",
    "tier": "BRAND_PROGRAM",
    "price_vnd": null,
    "source_url": "https://www.galaxycine.vn/khuyen-mai/uu-dai-thanh-vien-galaxy-cinema-2026/",
    "locality_basis": "Galaxy Cinema Coopmart Đà Nẵng",
    "validity": "Áp dụng xuyên suốt năm 2026",
    "conditions": "Tài khoản thành viên Star/G-star/X-star; tích lũy Star đổi vé và bắp nước; vé tặng sinh nhật",
    "budget_warning": "Điểm Star có hạn dùng trong năm 2026 theo quy chế thành viên; không phát hành mã voucher rời",
    "has_code": false,
    "code": null,
    "claim_instruction": "Đăng nhập tài khoản Galaxy Cinema trên ứng dụng hoặc quét mã thành viên tại quầy",
    "raw_sha256": "730168e05b69286624195aefae03d13383f1ab159767852a1f652312c99bff8b"
  },
  {
    "id": "P2O_GALAXY_SHOPEEPAY_SEP_2026",
    "title": "Voucher ShopeePay tại Galaxy Cinema — Tháng 09/2026",
    "brand": "Galaxy Cinema & ShopeePay",
    "tier": "APP_VOUCHER",
    "price_vnd": null,
    "source_url": "https://www.galaxycine.vn/khuyen-mai/voucher-giam-khung-danh-tang-cac-stars/",
    "locality_basis": "Galaxy Cinema Coopmart Đà Nẵng",
    "validity": "01/09/2026 – 30/09/2026 hoặc đến khi hết ngân sách",
    "conditions": "Mở ứng dụng ShopeePay, thu thập voucher chính thức tại mục Ưu đãi; thanh toán vé Galaxy qua ví",
    "budget_warning": "Ngân sách có hạn, chương trình có thể kết thúc sớm; mã thu thập trực tiếp trong app ShopeePay, JayT không phát hành mã ký tự copy",
    "has_code": false,
    "code": null,
    "claim_instruction": "Mở app ShopeePay > Mục Khuyến Mãi > Thu thập voucher Galaxy Cinema",
    "raw_sha256": "9037998cc5093d17bce4fa3b173b8f1129e9a72454185f99036b7413182b3966"
  },
  {
    "id": "B16_JOLLIBEE_2840004",
    "title": "Một Mình Ăn Ngon",
    "brand": "Jollibee",
    "tier": "PRICE_OBSERVATION",
    "price_vnd": 73000,
    "source_url": "https://jollibee.com.vn/mi-y-so-t-bo-ba-m-1-mie-ng-ga-ra-n-nuo-c-ngo-t.html",
    "locality_basis": "Thương hiệu có 9 cửa hàng tại Đà Nẵng (INHERITED_BRAND_PRESENCE)",
    "validity": "Thực đơn thường nhật tại thời điểm quan sát (NO_EXPIRY_PUBLISHED__RECHECK_AT_SOURCE)",
    "conditions": "1 Gà Giòn Vui Vẻ + 1 Mì Ý Jolly + 1 Nước ngọt + 1 Tương Chua Ngọt",
    "budget_warning": "Giá niêm yết có thể thay đổi mà không báo trước; không phải voucher giảm giá",
    "has_code": false,
    "code": null,
    "claim_instruction": "Gọi món trực tiếp tại quầy Jollibee hoặc đặt qua hotline/app Jollibee",
    "raw_sha256": "a247a0d9b6e66e2e4842624bbbd6eee17dc9ab437d053550fec4084729b390a4"
  },
  {
    "id": "B16_JOLLIBEE_4000935",
    "title": "Cả Nhà No Nê",
    "brand": "Jollibee",
    "tier": "PRICE_OBSERVATION",
    "price_vnd": 185000,
    "source_url": "https://jollibee.com.vn/combo-179.html",
    "locality_basis": "Thương hiệu có 9 cửa hàng tại Đà Nẵng (INHERITED_BRAND_PRESENCE)",
    "validity": "Thực đơn thường nhật tại thời điểm quan sát (NO_EXPIRY_PUBLISHED__RECHECK_AT_SOURCE)",
    "conditions": "3 Gà giòn vui vẻ + 2 Mì Ý Jolly vừa + 1 Khoai tây chiên vừa + 3 Nước ngọt vừa + 3 Tương Chua Ngọt + 1 Tương Cà",
    "budget_warning": "Giá niêm yết có thể thay đổi mà không báo trước; không phải voucher giảm giá",
    "has_code": false,
    "code": null,
    "claim_instruction": "Gọi món trực tiếp tại quầy Jollibee hoặc đặt qua hotline/app Jollibee",
    "raw_sha256": "a247a0d9b6e66e2e4842624bbbd6eee17dc9ab437d053550fec4084729b390a4"
  },
  {
    "id": "B16_JOLLIBEE_12008_1",
    "title": "Burger Gà Giòn",
    "brand": "Jollibee",
    "tier": "PRICE_OBSERVATION",
    "price_vnd": 35000,
    "source_url": "https://jollibee.com.vn/burger-com.html",
    "locality_basis": "Thương hiệu có 9 cửa hàng tại Đà Nẵng (INHERITED_BRAND_PRESENCE)",
    "validity": "Thực đơn thường nhật tại thời điểm quan sát (NO_EXPIRY_PUBLISHED__RECHECK_AT_SOURCE)",
    "conditions": "1 Burger Gà Giòn",
    "budget_warning": "Giá niêm yết có thể thay đổi mà không báo trước; không phải voucher giảm giá",
    "has_code": false,
    "code": null,
    "claim_instruction": "Gọi món trực tiếp tại quầy Jollibee hoặc đặt qua hotline/app Jollibee",
    "raw_sha256": "6d9c90e837ac90ec16d7726398c7a6338319f818e495436331788577e6fbe0e1"
  },
  {
    "id": "B16_JOLLIBEE_52013",
    "title": "Combo Burger Gà Giòn 2",
    "brand": "Jollibee",
    "tier": "PRICE_OBSERVATION",
    "price_vnd": 55000,
    "source_url": "https://jollibee.com.vn/sandwich-ga-gion-nu-c-ng-t-khoai-tay-6.html",
    "locality_basis": "Thương hiệu có 9 cửa hàng tại Đà Nẵng (INHERITED_BRAND_PRESENCE)",
    "validity": "Thực đơn thường nhật tại thời điểm quan sát (NO_EXPIRY_PUBLISHED__RECHECK_AT_SOURCE)",
    "conditions": "1 Burger Gà Giòn + 1 Pepsi vừa + 1 Khoai Tây Chiên vừa + 1 tương cà",
    "budget_warning": "Giá niêm yết có thể thay đổi mà không báo trước; không phải voucher giảm giá",
    "has_code": false,
    "code": null,
    "claim_instruction": "Gọi món trực tiếp tại quầy Jollibee hoặc đặt qua hotline/app Jollibee",
    "raw_sha256": "6d9c90e837ac90ec16d7726398c7a6338319f818e495436331788577e6fbe0e1"
  },
  {
    "id": "B16_JOLLIBEE_52012",
    "title": "Combo Burger Gà Giòn 1",
    "brand": "Jollibee",
    "tier": "PRICE_OBSERVATION",
    "price_vnd": 40000,
    "source_url": "https://jollibee.com.vn/sandwich-ga-gion-nu-c-ng-t-5.html",
    "locality_basis": "Thương hiệu có 9 cửa hàng tại Đà Nẵng (INHERITED_BRAND_PRESENCE)",
    "validity": "Thực đơn thường nhật tại thời điểm quan sát (NO_EXPIRY_PUBLISHED__RECHECK_AT_SOURCE)",
    "conditions": "1 Burger Gà Giòn + 1 Pepsi vừa",
    "budget_warning": "Giá niêm yết có thể thay đổi mà không báo trước; không phải voucher giảm giá",
    "has_code": false,
    "code": null,
    "claim_instruction": "Gọi món trực tiếp tại quầy Jollibee hoặc đặt qua hotline/app Jollibee",
    "raw_sha256": "6d9c90e837ac90ec16d7726398c7a6338319f818e495436331788577e6fbe0e1"
  },
  {
    "id": "B16_JOLLIBEE_2811107",
    "title": "1 Cơm gà mắm tỏi + 1 Nước ngọt",
    "brand": "Jollibee",
    "tier": "PRICE_OBSERVATION",
    "price_vnd": 45000,
    "source_url": "https://jollibee.com.vn/1-com-ga-m-m-t-i-1-pepsi-v-a.html",
    "locality_basis": "Thương hiệu có 9 cửa hàng tại Đà Nẵng (INHERITED_BRAND_PRESENCE)",
    "validity": "Thực đơn thường nhật tại thời điểm quan sát (NO_EXPIRY_PUBLISHED__RECHECK_AT_SOURCE)",
    "conditions": "1 Cơm gà mắm tỏi + 1 Nước ngọt",
    "budget_warning": "Giá niêm yết có thể thay đổi mà không báo trước; không phải voucher giảm giá",
    "has_code": false,
    "code": null,
    "claim_instruction": "Gọi món trực tiếp tại quầy Jollibee hoặc đặt qua hotline/app Jollibee",
    "raw_sha256": "6d9c90e837ac90ec16d7726398c7a6338319f818e495436331788577e6fbe0e1"
  },
  {
    "id": "B16_JOLLIBEE_1810060_1",
    "title": "Cơm Gà Mắm Tỏi",
    "brand": "Jollibee",
    "tier": "PRICE_OBSERVATION",
    "price_vnd": 35000,
    "source_url": "https://jollibee.com.vn/burger-com.html",
    "locality_basis": "Thương hiệu có 9 cửa hàng tại Đà Nẵng (INHERITED_BRAND_PRESENCE)",
    "validity": "Thực đơn thường nhật tại thời điểm quan sát (NO_EXPIRY_PUBLISHED__RECHECK_AT_SOURCE)",
    "conditions": "Cơm Gà Mắm Tỏi",
    "budget_warning": "Giá niêm yết có thể thay đổi mà không báo trước; không phải voucher giảm giá",
    "has_code": false,
    "code": null,
    "claim_instruction": "Gọi món trực tiếp tại quầy Jollibee hoặc đặt qua hotline/app Jollibee",
    "raw_sha256": "6d9c90e837ac90ec16d7726398c7a6338319f818e495436331788577e6fbe0e1"
  },
  {
    "id": "B16_JOLLIBEE_1820006_1",
    "title": "Burger Tôm",
    "brand": "Jollibee",
    "tier": "PRICE_OBSERVATION",
    "price_vnd": 40000,
    "source_url": "https://jollibee.com.vn/burger-com.html",
    "locality_basis": "Thương hiệu có 9 cửa hàng tại Đà Nẵng (INHERITED_BRAND_PRESENCE)",
    "validity": "Thực đơn thường nhật tại thời điểm quan sát (NO_EXPIRY_PUBLISHED__RECHECK_AT_SOURCE)",
    "conditions": "Burger Tôm",
    "budget_warning": "Giá niêm yết có thể thay đổi mà không báo trước; không phải voucher giảm giá",
    "has_code": false,
    "code": null,
    "claim_instruction": "Gọi món trực tiếp tại quầy Jollibee hoặc đặt qua hotline/app Jollibee",
    "raw_sha256": "6d9c90e837ac90ec16d7726398c7a6338319f818e495436331788577e6fbe0e1"
  },
  {
    "id": "B16_JOLLIBEE_2820011",
    "title": "1 Burger Tôm + 1 Khoai tây chiên vừa + 1 Nước ngọt",
    "brand": "Jollibee",
    "tier": "PRICE_OBSERVATION",
    "price_vnd": 65000,
    "source_url": "https://jollibee.com.vn/sandwich-ga-gion-nu-c-ng-t-khoai-tay-4.html",
    "locality_basis": "Thương hiệu có 9 cửa hàng tại Đà Nẵng (INHERITED_BRAND_PRESENCE)",
    "validity": "Thực đơn thường nhật tại thời điểm quan sát (NO_EXPIRY_PUBLISHED__RECHECK_AT_SOURCE)",
    "conditions": "1 Burger Tôm + 1 Khoai tây chiên vừa + 1 Nước ngọt + 1 Tương Cà",
    "budget_warning": "Giá niêm yết có thể thay đổi mà không báo trước; không phải voucher giảm giá",
    "has_code": false,
    "code": null,
    "claim_instruction": "Gọi món trực tiếp tại quầy Jollibee hoặc đặt qua hotline/app Jollibee",
    "raw_sha256": "6d9c90e837ac90ec16d7726398c7a6338319f818e495436331788577e6fbe0e1"
  },
  {
    "id": "B16_JOLLIBEE_2820010",
    "title": "1 Burger Tôm + 1 Nước ngọt",
    "brand": "Jollibee",
    "tier": "PRICE_OBSERVATION",
    "price_vnd": 50000,
    "source_url": "https://jollibee.com.vn/sandwich-ga-gion-nu-c-ng-t-4.html",
    "locality_basis": "Thương hiệu có 9 cửa hàng tại Đà Nẵng (INHERITED_BRAND_PRESENCE)",
    "validity": "Thực đơn thường nhật tại thời điểm quan sát (NO_EXPIRY_PUBLISHED__RECHECK_AT_SOURCE)",
    "conditions": "1 Burger Tôm + 1 Nước ngọt",
    "budget_warning": "Giá niêm yết có thể thay đổi mà không báo trước; không phải voucher giảm giá",
    "has_code": false,
    "code": null,
    "claim_instruction": "Gọi món trực tiếp tại quầy Jollibee hoặc đặt qua hotline/app Jollibee",
    "raw_sha256": "6d9c90e837ac90ec16d7726398c7a6338319f818e495436331788577e6fbe0e1"
  },
  {
    "id": "B16_JOLLIBEE_1830009_1",
    "title": "Jolly Hotdog",
    "brand": "Jollibee",
    "tier": "PRICE_OBSERVATION",
    "price_vnd": 25000,
    "source_url": "https://jollibee.com.vn/burger-com.html",
    "locality_basis": "Thương hiệu có 9 cửa hàng tại Đà Nẵng (INHERITED_BRAND_PRESENCE)",
    "validity": "Thực đơn thường nhật tại thời điểm quan sát (NO_EXPIRY_PUBLISHED__RECHECK_AT_SOURCE)",
    "conditions": "Jolly Hotdog + 1 Tương Cà",
    "budget_warning": "Giá niêm yết có thể thay đổi mà không báo trước; không phải voucher giảm giá",
    "has_code": false,
    "code": null,
    "claim_instruction": "Gọi món trực tiếp tại quầy Jollibee hoặc đặt qua hotline/app Jollibee",
    "raw_sha256": "6d9c90e837ac90ec16d7726398c7a6338319f818e495436331788577e6fbe0e1"
  },
  {
    "id": "B16_JOLLIBEE_2860012",
    "title": "1 Jolly Hotdog + 1 Khoai tây chiên vừa + 1 Nước ngọt",
    "brand": "Jollibee",
    "tier": "PRICE_OBSERVATION",
    "price_vnd": 50000,
    "source_url": "https://jollibee.com.vn/hotdogjolly-1.html",
    "locality_basis": "Thương hiệu có 9 cửa hàng tại Đà Nẵng (INHERITED_BRAND_PRESENCE)",
    "validity": "Thực đơn thường nhật tại thời điểm quan sát (NO_EXPIRY_PUBLISHED__RECHECK_AT_SOURCE)",
    "conditions": "1 Jolly Hotdog + 1 Khoai tây chiên vừa + 1 Nước ngọt + 1 Tương Cà",
    "budget_warning": "Giá niêm yết có thể thay đổi mà không báo trước; không phải voucher giảm giá",
    "has_code": false,
    "code": null,
    "claim_instruction": "Gọi món trực tiếp tại quầy Jollibee hoặc đặt qua hotline/app Jollibee",
    "raw_sha256": "6d9c90e837ac90ec16d7726398c7a6338319f818e495436331788577e6fbe0e1"
  },
  {
    "id": "B16_JOLLIBEE_2860011",
    "title": "1 Jolly Hotdog + 1 Nước ngọt",
    "brand": "Jollibee",
    "tier": "PRICE_OBSERVATION",
    "price_vnd": 35000,
    "source_url": "https://jollibee.com.vn/hotdogjolly.html",
    "locality_basis": "Thương hiệu có 9 cửa hàng tại Đà Nẵng (INHERITED_BRAND_PRESENCE)",
    "validity": "Thực đơn thường nhật tại thời điểm quan sát (NO_EXPIRY_PUBLISHED__RECHECK_AT_SOURCE)",
    "conditions": "1 Jolly Hotdog + 1 Nước ngọt + 1 Tương Cà",
    "budget_warning": "Giá niêm yết có thể thay đổi mà không báo trước; không phải voucher giảm giá",
    "has_code": false,
    "code": null,
    "claim_instruction": "Gọi món trực tiếp tại quầy Jollibee hoặc đặt qua hotline/app Jollibee",
    "raw_sha256": "6d9c90e837ac90ec16d7726398c7a6338319f818e495436331788577e6fbe0e1"
  },
  {
    "id": "B16_PHUCLONG_M01",
    "title": "Tặng 01 Trà Sữa size L",
    "brand": "Phúc Long Coffee & Tea",
    "tier": "BRAND_PROGRAM",
    "price_vnd": null,
    "source_url": "https://phuclong.com.vn/ve-chung-toi/bai-viet/uu-dai-dac-biet-danh-rieng-cho-hoi-vien-chon-loc-20251204042613",
    "locality_basis": "Thương hiệu có 7 cửa hàng tại Đà Nẵng (INHERITED_BRAND_PRESENCE)",
    "validity": "Áp dụng cho hội viên nhận tin nhắn Zalo Phúc Long; hạn dùng 14 ngày từ khi nhận",
    "conditions": "Tặng 01 Trà Sữa size L khi mua hóa đơn từ 69.000đ. Áp dụng cho các món: Hồng Trà Sữa, Trà Sữa Lài, Trà Sữa Ô Long. Chỉ dành cho khách hàng thực nhận voucher qua Zalo Phúc Long; không bảo đảm phân bổ.",
    "budget_warning": "Quyền lợi chỉ kích hoạt khi nhận được tin nhắn mã thành viên từ hệ thống Phúc Long",
    "has_code": false,
    "code": null,
    "claim_instruction": "Xuất trình tin nhắn voucher qua Zalo Phúc Long tại quầy cửa hàng",
    "raw_sha256": "3874c8fffb719747dfde86894a8c6041b7ac5494c710989caa10ec459cbaae9c"
  },
  {
    "id": "B16_PHUCLONG_M03",
    "title": "Tặng 01 Bánh Ngọt",
    "brand": "Phúc Long Coffee & Tea",
    "tier": "BRAND_PROGRAM",
    "price_vnd": null,
    "source_url": "https://phuclong.com.vn/ve-chung-toi/bai-viet/uu-dai-dac-biet-danh-rieng-cho-hoi-vien-chon-loc-20251204042613",
    "locality_basis": "Thương hiệu có 7 cửa hàng tại Đà Nẵng (INHERITED_BRAND_PRESENCE)",
    "validity": "Áp dụng cho hội viên nhận tin nhắn Zalo Phúc Long; hạn dùng 14 ngày từ khi nhận",
    "conditions": "Tặng 01 Bánh Ngọt khi mua hóa đơn từ 99.000đ. Áp dụng cho các món: Bánh Red Velvet, Bánh Tiramisu, Green Tea Choco. Chỉ dành cho khách hàng thực nhận voucher qua Zalo Phúc Long; không bảo đảm phân bổ.",
    "budget_warning": "Quyền lợi chỉ kích hoạt khi nhận được tin nhắn mã thành viên từ hệ thống Phúc Long",
    "has_code": false,
    "code": null,
    "claim_instruction": "Xuất trình tin nhắn voucher qua Zalo Phúc Long tại quầy cửa hàng",
    "raw_sha256": "3874c8fffb719747dfde86894a8c6041b7ac5494c710989caa10ec459cbaae9c"
  },
  {
    "id": "B16_PHUCLONG_M04",
    "title": "Ưu đãi 50% cho thức uống (L)",
    "brand": "Phúc Long Coffee & Tea",
    "tier": "BRAND_PROGRAM",
    "price_vnd": null,
    "source_url": "https://phuclong.com.vn/ve-chung-toi/bai-viet/uu-dai-dac-biet-danh-rieng-cho-hoi-vien-chon-loc-20251204042613",
    "locality_basis": "Thương hiệu có 7 cửa hàng tại Đà Nẵng (INHERITED_BRAND_PRESENCE)",
    "validity": "Áp dụng cho hội viên nhận tin nhắn Zalo Phúc Long; hạn dùng 14 ngày từ khi nhận",
    "conditions": "Ưu đãi 50% cho thức uống (L) khi mua hóa đơn từ 69.000đ. Áp dụng cho các món: Hồng Trà Sữa, Trà Sữa Lài, Trà Sữa Ô Long. Chỉ dành cho khách hàng thực nhận voucher qua Zalo Phúc Long; không bảo đảm phân bổ.",
    "budget_warning": "Quyền lợi chỉ kích hoạt khi nhận được tin nhắn mã thành viên từ hệ thống Phúc Long",
    "has_code": false,
    "code": null,
    "claim_instruction": "Xuất trình tin nhắn voucher qua Zalo Phúc Long tại quầy cửa hàng",
    "raw_sha256": "3874c8fffb719747dfde86894a8c6041b7ac5494c710989caa10ec459cbaae9c"
  },
  {
    "id": "B16_PHUCLONG_M05",
    "title": "Upsize cho trà trái cây",
    "brand": "Phúc Long Coffee & Tea",
    "tier": "BRAND_PROGRAM",
    "price_vnd": null,
    "source_url": "https://phuclong.com.vn/ve-chung-toi/bai-viet/uu-dai-dac-biet-danh-rieng-cho-hoi-vien-chon-loc-20251204042613",
    "locality_basis": "Thương hiệu có 7 cửa hàng tại Đà Nẵng (INHERITED_BRAND_PRESENCE)",
    "validity": "Áp dụng cho hội viên nhận tin nhắn Zalo Phúc Long; hạn dùng 14 ngày từ khi nhận",
    "conditions": "Upsize cho trà trái cây. Áp dụng cho các món: Món Áp dụng: Trà Lài Đác Thơm, Trà Nhãn Sen, Trà Đào. Chỉ dành cho khách hàng thực nhận voucher qua Zalo Phúc Long; không bảo đảm phân bổ.",
    "budget_warning": "Quyền lợi chỉ kích hoạt khi nhận được tin nhắn mã thành viên từ hệ thống Phúc Long",
    "has_code": false,
    "code": null,
    "claim_instruction": "Xuất trình tin nhắn voucher qua Zalo Phúc Long tại quầy cửa hàng",
    "raw_sha256": "3874c8fffb719747dfde86894a8c6041b7ac5494c710989caa10ec459cbaae9c"
  },
  {
    "id": "B16_PHUCLONG_M06",
    "title": "Giảm 5K cho ly nước size L",
    "brand": "Phúc Long Coffee & Tea",
    "tier": "BRAND_PROGRAM",
    "price_vnd": null,
    "source_url": "https://phuclong.com.vn/ve-chung-toi/bai-viet/uu-dai-dac-biet-danh-rieng-cho-hoi-vien-chon-loc-20251204042613",
    "locality_basis": "Thương hiệu có 7 cửa hàng tại Đà Nẵng (INHERITED_BRAND_PRESENCE)",
    "validity": "Áp dụng cho hội viên nhận tin nhắn Zalo Phúc Long; hạn dùng 14 ngày từ khi nhận",
    "conditions": "Giảm 5K cho ly nước size L. Áp dụng cho các món: Hồng Trà Sữa, Trà Sữa Lài, Trà Sữa Ô Long. Chỉ dành cho khách hàng thực nhận voucher qua Zalo Phúc Long; không bảo đảm phân bổ.",
    "budget_warning": "Quyền lợi chỉ kích hoạt khi nhận được tin nhắn mã thành viên từ hệ thống Phúc Long",
    "has_code": false,
    "code": null,
    "claim_instruction": "Xuất trình tin nhắn voucher qua Zalo Phúc Long tại quầy cửa hàng",
    "raw_sha256": "3874c8fffb719747dfde86894a8c6041b7ac5494c710989caa10ec459cbaae9c"
  },
  {
    "id": "B16_PHUCLONG_M07",
    "title": "Tặng 01 Trà Sữa size M",
    "brand": "Phúc Long Coffee & Tea",
    "tier": "BRAND_PROGRAM",
    "price_vnd": null,
    "source_url": "https://phuclong.com.vn/ve-chung-toi/bai-viet/uu-dai-dac-biet-danh-rieng-cho-hoi-vien-chon-loc-20251204042613",
    "locality_basis": "Thương hiệu có 7 cửa hàng tại Đà Nẵng (INHERITED_BRAND_PRESENCE)",
    "validity": "Áp dụng cho hội viên nhận tin nhắn Zalo Phúc Long; hạn dùng 14 ngày từ khi nhận",
    "conditions": "Tặng 01 Trà Sữa size M khi mua 1 bánh trung thu Đào Sấy Dẻo Kim Quất . Áp dụng cho các món: Hồng Trà Sữa, Trà Sữa Ô Long. Chỉ dành cho khách hàng thực nhận voucher qua Zalo Phúc Long; không bảo đảm phân bổ.",
    "budget_warning": "Quyền lợi chỉ kích hoạt khi nhận được tin nhắn mã thành viên từ hệ thống Phúc Long",
    "has_code": false,
    "code": null,
    "claim_instruction": "Xuất trình tin nhắn voucher qua Zalo Phúc Long tại quầy cửa hàng",
    "raw_sha256": "3874c8fffb719747dfde86894a8c6041b7ac5494c710989caa10ec459cbaae9c"
  },
  {
    "id": "B16_PHUCLONG_M09",
    "title": "Giảm 20% cho món Trà Sữa Ô Long Tứ Quý",
    "brand": "Phúc Long Coffee & Tea",
    "tier": "BRAND_PROGRAM",
    "price_vnd": null,
    "source_url": "https://phuclong.com.vn/ve-chung-toi/bai-viet/uu-dai-dac-biet-danh-rieng-cho-hoi-vien-chon-loc-20251204042613",
    "locality_basis": "Thương hiệu có 7 cửa hàng tại Đà Nẵng (INHERITED_BRAND_PRESENCE)",
    "validity": "Áp dụng cho hội viên nhận tin nhắn Zalo Phúc Long; hạn dùng 14 ngày từ khi nhận",
    "conditions": "Giảm 20% cho món Trà Sữa Ô Long Tứ Quý. Chỉ dành cho khách hàng thực nhận voucher qua Zalo Phúc Long; không bảo đảm phân bổ.",
    "budget_warning": "Quyền lợi chỉ kích hoạt khi nhận được tin nhắn mã thành viên từ hệ thống Phúc Long",
    "has_code": false,
    "code": null,
    "claim_instruction": "Xuất trình tin nhắn voucher qua Zalo Phúc Long tại quầy cửa hàng",
    "raw_sha256": "3874c8fffb719747dfde86894a8c6041b7ac5494c710989caa10ec459cbaae9c"
  },
  {
    "id": "B16_PHUCLONG_M10",
    "title": "Giảm 20% cho món Trà Ô Long Tứ Quý Nho Mẫu Đơn",
    "brand": "Phúc Long Coffee & Tea",
    "tier": "BRAND_PROGRAM",
    "price_vnd": null,
    "source_url": "https://phuclong.com.vn/ve-chung-toi/bai-viet/uu-dai-dac-biet-danh-rieng-cho-hoi-vien-chon-loc-20251204042613",
    "locality_basis": "Thương hiệu có 7 cửa hàng tại Đà Nẵng (INHERITED_BRAND_PRESENCE)",
    "validity": "Áp dụng cho hội viên nhận tin nhắn Zalo Phúc Long; hạn dùng 14 ngày từ khi nhận",
    "conditions": "Giảm 20% cho món Trà Ô Long Tứ Quý Nho Mẫu Đơn. Chỉ dành cho khách hàng thực nhận voucher qua Zalo Phúc Long; không bảo đảm phân bổ.",
    "budget_warning": "Quyền lợi chỉ kích hoạt khi nhận được tin nhắn mã thành viên từ hệ thống Phúc Long",
    "has_code": false,
    "code": null,
    "claim_instruction": "Xuất trình tin nhắn voucher qua Zalo Phúc Long tại quầy cửa hàng",
    "raw_sha256": "3874c8fffb719747dfde86894a8c6041b7ac5494c710989caa10ec459cbaae9c"
  },
  {
    "id": "B16_PHUCLONG_HONEY_P1",
    "title": "Combo 1 bánh + 1 nước Hương Mật Ươm Sắc",
    "brand": "Phúc Long Coffee & Tea",
    "tier": "COUNTER_DEAL",
    "price_vnd": 109000,
    "source_url": "https://phuclong.com.vn/khuyen-mai/bo-suu-tap-huong-mat-uom-sac-20260227022356",
    "locality_basis": "Thương hiệu có 7 cửa hàng tại Đà Nẵng (INHERITED_BRAND_PRESENCE)",
    "validity": "Chương trình theo mùa, áp dụng đến khi hết số lượng quà tặng/nguyên liệu",
    "conditions": "Áp dụng 3 món nước mới và 4 món bánh chọn lọc; không cộng dồn giảm giá thành viên hoặc khuyến mãi khác.",
    "budget_warning": "Số lượng quà tặng và combo có hạn tại từng cửa hàng; có thể kết thúc sớm",
    "has_code": false,
    "code": null,
    "claim_instruction": "Hỏi mua trực tiếp tại quầy các cửa hàng Phúc Long Đà Nẵng",
    "raw_sha256": "e14cdda0f49988d39f4d54134d94b4fe6e6e0ef41cc8751bbe17381bc527ff5e"
  },
  {
    "id": "B16_PHUCLONG_LOCO_P1",
    "title": "Combo Lô Cồ Vibe túi lưới và nước size L",
    "brand": "Phúc Long Coffee & Tea",
    "tier": "COUNTER_DEAL",
    "price_vnd": 99000,
    "source_url": "https://phuclong.com.vn/khuyen-mai/bat-chat-he-len-do-dung-dieu-lo-co-vibe-cung-phuc-long-20260713035100",
    "locality_basis": "Thương hiệu có 7 cửa hàng tại Đà Nẵng (INHERITED_BRAND_PRESENCE)",
    "validity": "Chương trình theo mùa, áp dụng đến khi hết số lượng quà tặng/nguyên liệu",
    "conditions": "Gồm 1 túi lưới kèm pin cài và 1 nước size L; số lượng có hạn.",
    "budget_warning": "Số lượng quà tặng và combo có hạn tại từng cửa hàng; có thể kết thúc sớm",
    "has_code": false,
    "code": null,
    "claim_instruction": "Hỏi mua trực tiếp tại quầy các cửa hàng Phúc Long Đà Nẵng",
    "raw_sha256": "2e59f7019c13886136784824a0ec091b098a9af88b233fda27cebd8920b594d7"
  },
  {
    "id": "B16_PHUCLONG_LOCO_P2",
    "title": "Combo Lô Cồ Vibe bình giữ nhiệt và nước size L",
    "brand": "Phúc Long Coffee & Tea",
    "tier": "COUNTER_DEAL",
    "price_vnd": 389000,
    "source_url": "https://phuclong.com.vn/khuyen-mai/bat-chat-he-len-do-dung-dieu-lo-co-vibe-cung-phuc-long-20260713035100",
    "locality_basis": "Thương hiệu có 7 cửa hàng tại Đà Nẵng (INHERITED_BRAND_PRESENCE)",
    "validity": "Chương trình theo mùa, áp dụng đến khi hết số lượng quà tặng/nguyên liệu",
    "conditions": "Gồm 1 bình giữ nhiệt 900ml và 1 nước size L; số lượng có hạn.",
    "budget_warning": "Số lượng quà tặng và combo có hạn tại từng cửa hàng; có thể kết thúc sớm",
    "has_code": false,
    "code": null,
    "claim_instruction": "Hỏi mua trực tiếp tại quầy các cửa hàng Phúc Long Đà Nẵng",
    "raw_sha256": "2e59f7019c13886136784824a0ec091b098a9af88b233fda27cebd8920b594d7"
  },
  {
    "id": "B16_PHUCLONG_LOCO_P3",
    "title": "Quà móc khóa Lô Cồ cho hóa đơn bánh nước",
    "brand": "Phúc Long Coffee & Tea",
    "tier": "COUNTER_DEAL",
    "price_vnd": null,
    "source_url": "https://phuclong.com.vn/khuyen-mai/bat-chat-he-len-do-dung-dieu-lo-co-vibe-cung-phuc-long-20260713035100",
    "locality_basis": "Thương hiệu có 7 cửa hàng tại Đà Nẵng (INHERITED_BRAND_PRESENCE)",
    "validity": "Chương trình theo mùa, áp dụng đến khi hết số lượng quà tặng/nguyên liệu",
    "conditions": "Tặng 1 móc khóa tại cửa hàng, không áp dụng kênh giao hàng; có thể hết sớm.",
    "budget_warning": "Số lượng quà tặng và combo có hạn tại từng cửa hàng; có thể kết thúc sớm",
    "has_code": false,
    "code": null,
    "claim_instruction": "Hỏi mua trực tiếp tại quầy các cửa hàng Phúc Long Đà Nẵng",
    "raw_sha256": "2e59f7019c13886136784824a0ec091b098a9af88b233fda27cebd8920b594d7"
  }
];

  // =========================================================================
  // JAYT-342 SPRINT B: SMART VALUE RADAR REGISTRY (15 TECH ITEMS)
  // =========================================================================
  const VALUE_RADAR_ITEMS = [
  {
    "sku_id": "B14_PL_DTX64GB",
    "model": "DTX/64GB",
    "name": "HDD USB Kingston 64GB DataTraveler Exodia DTX/64GB (USB 3.2)",
    "category": "USB_STORAGE",
    "price_vnd": 290000,
    "captured_at": "2026-09-06T05:15:55.000Z",
    "stock_status": "Theo nguồn: Còn hàng tại showroom Hàm Nghi / Nguyễn Văn Linh Đà Nẵng",
    "source_url": "https://philong.com.vn/hdd-usb-kingston-64gb-datatraveler-exodia-dtx64gb-usb-3.2.html",
    "raw_sha256": "108a8554e25c93ac97ccb7da249a019da6069ce17df63626a72cd5843b9ed993"
  },
  {
    "sku_id": "B14_PL_LJDS080064G-BNBNG",
    "model": "LJDS080064G-BNBNG",
    "name": "USB Lexar JumpDrive S80 64GB USB 3.2 Gen 1 150MB/s",
    "category": "USB_STORAGE",
    "price_vnd": 275000,
    "captured_at": "2026-09-06T05:15:55.000Z",
    "stock_status": "Theo nguồn: Còn hàng tại showroom Đà Nẵng",
    "source_url": "https://philong.com.vn/usb-lexar-jumpdrive-s80-64gb.html",
    "raw_sha256": "108a8554e25c93ac97ccb7da249a019da6069ce17df63626a72cd5843b9ed993"
  },
  {
    "sku_id": "B14_PL_LJDM400064G-BNBNG",
    "model": "LJDM400064G-BNBNG",
    "name": "USB Lexar JumpDrive M400 64GB USB 3.2 150MB/s",
    "category": "USB_STORAGE",
    "price_vnd": 290000,
    "captured_at": "2026-09-06T05:15:55.000Z",
    "stock_status": "Theo nguồn: Còn hàng tại showroom Đà Nẵng",
    "source_url": "https://philong.com.vn/usb-lexar-jumpdrive-m400-64gb-ljdm400064g-bnbng.html",
    "raw_sha256": "108a8554e25c93ac97ccb7da249a019da6069ce17df63626a72cd5843b9ed993"
  },
  {
    "sku_id": "B14_PL_SDDDC6-064G-G46",
    "model": "SDDDC6-064G-G46",
    "name": "USB Sandisk 64GB Phone Drive USB 3.2 Type-C/A",
    "category": "USB_STORAGE",
    "price_vnd": 590000,
    "captured_at": "2026-09-06T05:15:55.000Z",
    "stock_status": "Theo nguồn: Còn hàng tại showroom Đà Nẵng",
    "source_url": "https://philong.com.vn/usb-sandisk-64gb-phone-drive-sdddc6-064g-g46.html",
    "raw_sha256": "108a8554e25c93ac97ccb7da249a019da6069ce17df63626a72cd5843b9ed993"
  },
  {
    "sku_id": "B14_PL_ITEM_4",
    "model": "SDCZ600-064G",
    "name": "USB 64GB Sandisk Cruzer Glide CZ600 USB3.0",
    "category": "USB_STORAGE",
    "price_vnd": 450000,
    "captured_at": "2026-09-06T05:15:55.000Z",
    "stock_status": "Theo nguồn: Còn hàng tại showroom Đà Nẵng",
    "source_url": "https://philong.com.vn/usb-64gb-sandisk-3.0-cz600.html",
    "raw_sha256": "108a8554e25c93ac97ccb7da249a019da6069ce17df63626a72cd5843b9ed993"
  },
  {
    "sku_id": "B14_PL_SDCZ74-064G",
    "model": "SDCZ74-064G",
    "name": "HDD USB 64GB SANDISK ULTRA LUXE USB 3.1",
    "category": "USB_STORAGE",
    "price_vnd": 590000,
    "captured_at": "2026-09-06T05:15:55.000Z",
    "stock_status": "Theo nguồn: Còn hàng tại showroom Đà Nẵng",
    "source_url": "https://philong.com.vn/usb-64gb-sandisk-ultra-luxe-sdcz74-3.1.html",
    "raw_sha256": "108a8554e25c93ac97ccb7da249a019da6069ce17df63626a72cd5843b9ed993"
  },
  {
    "sku_id": "B14_PL_SXS1000_1000GA",
    "model": "SXS1000/1000GA",
    "name": "Ổ Cứng Di Động SSD Kingston XS1000 1TB USB 3.2 Gen 2 Black",
    "category": "SSD_STORAGE",
    "price_vnd": 5290000,
    "captured_at": "2026-09-06T05:15:55.000Z",
    "stock_status": "Theo nguồn: Còn hàng tại showroom Đà Nẵng",
    "source_url": "https://philong.com.vn/ssd-kingston-xs1000-1tb-black-sxs1000-1000ga.html",
    "raw_sha256": "108a8554e25c93ac97ccb7da249a019da6069ce17df63626a72cd5843b9ed993"
  },
  {
    "sku_id": "B14_PL_USB_3_2_Gen_1",
    "model": "DTXM/128GB",
    "name": "USB Kingston 128GB DataTraveler Exodia M DTXM/128GB (USB 3.2 Gen 1)",
    "category": "USB_STORAGE",
    "price_vnd": 350000,
    "captured_at": "2026-09-06T05:15:55.000Z",
    "stock_status": "Theo nguồn: Còn hàng tại showroom Đà Nẵng",
    "source_url": "https://philong.com.vn/usb-kingston-datatraveler-exodia-m-dtxm-128gb.html",
    "raw_sha256": "108a8554e25c93ac97ccb7da249a019da6069ce17df63626a72cd5843b9ed993"
  },
  {
    "sku_id": "B14_PL_DTX_256GB",
    "model": "DTX/256GB",
    "name": "USB Kingston 256GB DataTraveler Exodia USB 3.2 (DTX/256GB)",
    "category": "USB_STORAGE",
    "price_vnd": 790000,
    "captured_at": "2026-09-06T05:15:55.000Z",
    "stock_status": "Theo nguồn: Còn hàng tại showroom Đà Nẵng",
    "source_url": "https://philong.com.vn/usb-kingston-256gb-datatraveler-exodia-dtx-256gb.html",
    "raw_sha256": "108a8554e25c93ac97ccb7da249a019da6069ce17df63626a72cd5843b9ed993"
  },
  {
    "sku_id": "B14_PL_SA400S37_480G",
    "model": "SA400S37/480G",
    "name": "SSD 480GB KINGSTON A400 SATA 3 2.5 INCH (SA400S37/480G)",
    "category": "SSD_STORAGE",
    "price_vnd": 3490000,
    "captured_at": "2026-09-06T05:15:55.000Z",
    "stock_status": "Theo nguồn: Còn hàng tại showroom Đà Nẵng",
    "source_url": "https://philong.com.vn/ssd-kingston-480gb-a400-sa400s37480g-sata-iii.html",
    "raw_sha256": "108a8554e25c93ac97ccb7da249a019da6069ce17df63626a72cd5843b9ed993"
  },
  {
    "sku_id": "B14_PL_SKC3000S_1024G",
    "model": "SKC3000S/1024G",
    "name": "SSD Kingston KC3000 1024GB PCIe 4.0 NVMe M.2",
    "category": "SSD_STORAGE",
    "price_vnd": 8990000,
    "captured_at": "2026-09-06T05:15:55.000Z",
    "stock_status": "Theo nguồn: Còn hàng tại showroom Đà Nẵng",
    "source_url": "https://philong.com.vn/ssd-kingston-kc3000-1024gb-pcie-4.0-nvme-m.2-ssd.html",
    "raw_sha256": "108a8554e25c93ac97ccb7da249a019da6069ce17df63626a72cd5843b9ed993"
  },
  {
    "sku_id": "B14_PL_SNV3S_1000G",
    "model": "SNV3S/1000G",
    "name": "Ổ cứng gắn trong SSD Kingston NV3 1TB M.2 2280 NVMe PCIe Gen4x4",
    "category": "SSD_STORAGE",
    "price_vnd": 4490000,
    "captured_at": "2026-09-06T05:15:55.000Z",
    "stock_status": "Theo nguồn: Còn hàng tại showroom Đà Nẵng",
    "source_url": "https://philong.com.vn/o-cung-gan-trong-ssd-kingston-nv3-1tb.html",
    "raw_sha256": "108a8554e25c93ac97ccb7da249a019da6069ce17df63626a72cd5843b9ed993"
  },
  {
    "sku_id": "B14_PL_KVR56S46BS8-16WP",
    "model": "KVR56S46BS8-16WP",
    "name": "Ram Laptop DDR5 Kingston 16GB 5600MHz 1.1V",
    "category": "RAM_MEMORY",
    "price_vnd": 7490000,
    "captured_at": "2026-09-06T05:15:55.000Z",
    "stock_status": "Theo nguồn: Còn hàng tại showroom Đà Nẵng",
    "source_url": "https://philong.com.vn/ram-laptop-ddr5-kingston-16gb-5600mhz-kvr56s46bs8-16wp.html",
    "raw_sha256": "108a8554e25c93ac97ccb7da249a019da6069ce17df63626a72cd5843b9ed993"
  },
  {
    "sku_id": "P2O_PHILONG_LENOVO_STUDENT_2026",
    "model": "LENOVO-STUDENT-2026",
    "name": "Ưu đãi học sinh, sinh viên Lenovo 2026 tại Phi Long",
    "category": "EDUCATION_PROGRAM",
    "price_vnd": null,
    "captured_at": "2026-09-07T09:24:58.273Z",
    "stock_status": "Chương trình quà tặng theo đợt từ hãng tại showroom Phi Long Đà Nẵng; không theo dõi số lượng tồn kho theo SKU",
    "source_url": "https://philong.com.vn/lap-xin-qua-slay-cung-lenovo.html",
    "raw_sha256": "b4475c7d43592284e31ea2992bcb1ac50a45589704566bd7429981946adbf070"
  },
  {
    "sku_id": "P2O_PHILONG_HP_BTS_2026",
    "model": "HP-BTS-2026",
    "name": "HP Back to School 2026 tại Phi Long (OmniBook & Victus)",
    "category": "EDUCATION_PROGRAM",
    "price_vnd": null,
    "captured_at": "2026-09-07T09:24:58.273Z",
    "stock_status": "Chương trình khuyến mãi giáo dục từ hãng tại showroom Phi Long Đà Nẵng; không theo dõi số lượng tồn kho theo SKU",
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
    "has_deals": false,
    "items": [],
    "empty_state_note": "Thứ Hai đầu tuần: Chưa có chương trình ưu đãi định kỳ xác minh hợp lệ theo tuần. Khuyến nghị theo dõi biểu giá thường nhật hoặc tích điểm thành viên."
  },
  "tuesday": {
    "name_vi": "Thứ Ba",
    "has_deals": true,
    "items": [
      {
        "event_name": "Metiz Cinema U22 2D 55K",
        "brand": "Metiz Cinema Đà Nẵng (Helio)",
        "price_rule": "Vé 2D chỉ 55.000đ cho thành viên U22",
        "frequency": "Áp dụng từ Thứ Ba đến Thứ Năm hàng tuần",
        "exceptions": "Xuất trình CCCD & Thẻ thành viên tại quầy; trừ Lễ/Tết",
        "source_url": "https://metiz.vn/promotion/khuyen-mai-gia-ve-u22-21.html",
        "raw_file": "06_TRUST_AND_EVIDENCE/batch_12_ingress_vault/B12_03.raw.html",
        "headers_file": "06_TRUST_AND_EVIDENCE/batch_12_ingress_vault/B12_03.metadata.json",
        "raw_sha256": "0fbf20dc8f512fc1d9bd102b1a27c261cc9538510e0f5a6ddff9b881be1c06a2"
      }
    ]
  },
  "wednesday": {
    "name_vi": "Thứ Tư",
    "has_deals": true,
    "items": [
      {
        "event_name": "Metiz Cinema U22 2D 55K",
        "brand": "Metiz Cinema Đà Nẵng (Helio)",
        "price_rule": "Vé 2D chỉ 55.000đ cho thành viên U22",
        "frequency": "Áp dụng từ Thứ Ba đến Thứ Năm hàng tuần",
        "exceptions": "Xuất trình CCCD & Thẻ thành viên tại quầy; trừ Lễ/Tết",
        "source_url": "https://metiz.vn/promotion/khuyen-mai-gia-ve-u22-21.html",
        "raw_file": "06_TRUST_AND_EVIDENCE/batch_12_ingress_vault/B12_03.raw.html",
        "headers_file": "06_TRUST_AND_EVIDENCE/batch_12_ingress_vault/B12_03.metadata.json",
        "raw_sha256": "0fbf20dc8f512fc1d9bd102b1a27c261cc9538510e0f5a6ddff9b881be1c06a2"
      }
    ]
  },
  "thursday": {
    "name_vi": "Thứ Năm",
    "has_deals": true,
    "items": [
      {
        "event_name": "Metiz Cinema U22 2D 55K",
        "brand": "Metiz Cinema Đà Nẵng (Helio)",
        "price_rule": "Vé 2D chỉ 55.000đ cho thành viên U22",
        "frequency": "Áp dụng từ Thứ Ba đến Thứ Năm hàng tuần",
        "exceptions": "Xuất trình CCCD & Thẻ thành viên tại quầy; trừ Lễ/Tết",
        "source_url": "https://metiz.vn/promotion/khuyen-mai-gia-ve-u22-21.html",
        "raw_file": "06_TRUST_AND_EVIDENCE/batch_12_ingress_vault/B12_03.raw.html",
        "headers_file": "06_TRUST_AND_EVIDENCE/batch_12_ingress_vault/B12_03.metadata.json",
        "raw_sha256": "0fbf20dc8f512fc1d9bd102b1a27c261cc9538510e0f5a6ddff9b881be1c06a2"
      }
    ]
  },
  "friday": {
    "name_vi": "Thứ Sáu",
    "has_deals": true,
    "items": [
      {
        "event_name": "Galaxy Cinema U22 Ngày Thường",
        "brand": "Galaxy Cinema Đà Nẵng",
        "price_rule": "Vé U22 từ 45.000đ - 55.000đ",
        "frequency": "Các ngày trong tuần (Thứ 2 - Thứ 6)",
        "exceptions": "Xuất trình CCCD hoặc thẻ HSSV tại quầy; trừ Lễ/Tết",
        "source_url": "https://www.galaxycine.vn/u22/",
        "raw_file": "06_TRUST_AND_EVIDENCE/jayt_333_hot_campaign_vault/J333_HOT_02_GALAXY_U22.lead-operator.raw.html",
        "headers_file": "06_TRUST_AND_EVIDENCE/jayt_333_hot_campaign_vault/J333_HOT_02_GALAXY_U22.lead-operator.headers.json",
        "raw_sha256": "12d36958c4db0addb42f5ed514f9038b44e310d9b1a743f3fb1cfea15b2fa7f9"
      }
    ]
  },
  "saturday": {
    "name_vi": "Thứ Bảy",
    "has_deals": false,
    "items": [],
    "empty_state_note": "Thứ Bảy là ngày cuối tuần cao điểm. Các rạp phim áp dụng biểu giá vé tiêu chuẩn cuối tuần, không có chương trình đồng giá định kỳ. Người dùng nên tận dụng tích điểm thành viên (Phúc Long / Galaxy) hoặc voucher hoàn tiền trên ví điện tử."
  },
  "sunday": {
    "name_vi": "Chủ Nhật",
    "has_deals": false,
    "items": [],
    "empty_state_note": "Chủ Nhật áp dụng giá vé tiêu chuẩn cuối tuần. Chưa ghi nhận chương trình ưu đãi định kỳ theo tuần có bằng chứng hợp lệ. Khuyến nghị kiểm tra ưu đãi thẻ ngân hàng liên kết hoặc đặt combo trực tuyến."
  }
};

  // Compatibility array for legacy audit queries
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
    return `<section class="t2-pilot-card-section" style="margin:24px 0;background:var(--bg-card);border:2px solid #0369a1;border-radius:14px;padding:20px;box-shadow:0 4px 14px rgba(3,105,161,.08);" aria-label="Thông tin chuyến bay trên Danang Smart City 1022 đã được phê duyệt RC"><div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:12px;"><span style="background:rgba(3,105,161,.12);color:#0369a1;padding:4px 10px;border-radius:6px;font-size:.78rem;font-weight:800;">✈️ T2 • TIỆN ÍCH SỐ &amp; ĐIỀU HÀNH SÂN BAY</span><span style="font-size:.75rem;color:var(--text-secondary);">RC v3.424.0 • Ứng viên phát hành</span></div><h2 style="font-size:1.25rem;font-weight:800;color:var(--text-primary);margin:0 0 10px;">${item.exact_approved_title}</h2><p style="font-size:.95rem;color:var(--text-primary);line-height:1.55;margin-bottom:14px;font-weight:500;">${item.exact_approved_copy}</p><div style="background:var(--bg-card-subtle);border-left:4px solid #0369a1;padding:12px 14px;border-radius:6px;font-size:.85rem;color:var(--text-secondary);line-height:1.5;margin-bottom:16px;">${item.scope_caveat}</div><div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;"><a href="${item.safe_canonical_action.url}" target="_blank" rel="${item.safe_canonical_action.rel}" class="btn-rail-action btn-action-portal" aria-label="Mở thông tin chuyến bay 1022 chính thức" style="background:#0369a1;color:#fff;padding:12px 20px;min-height:44px;box-sizing:border-box;border-radius:8px;text-decoration:none;font-weight:700;font-size:.88rem;display:inline-flex;align-items:center;gap:6px;">${item.safe_canonical_action.label}</a><div style="font-size:.75rem;color:var(--text-secondary);font-family:monospace;">Evidence ID: ${item.card_id}</div></div></section>`;
  }

  function renderCivicChamDanceCard() {
    const item = APPROVED_PUBLIC_ENTRIES.find(entry => entry.card_id === 'B11_02_HOAT_DONG_VAN_HOA_BAO_TANG_CHAM_1022');
    if (!item || !item.public_eligible) return '';
    return `<section class="t2-pilot-card-section" style="margin:24px 0;background:var(--bg-card);border:2px solid #0369a1;border-radius:14px;padding:20px;box-shadow:0 4px 14px rgba(3,105,161,.08);" aria-label="Lịch biểu diễn vũ điệu Champa Bảo tàng Chăm Đà Nẵng 1022 đã được phê duyệt RC"><div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:12px;"><span style="background:rgba(3,105,161,.12);color:#0369a1;padding:4px 10px;border-radius:6px;font-size:.78rem;font-weight:800;">🏛️ T2 • VĂN HÓA &amp; DI SẢN CỘNG ĐỒNG</span><span style="font-size:.75rem;color:var(--text-secondary);">RC v3.424.0 • Ứng viên phát hành</span></div><h2 style="font-size:1.25rem;font-weight:800;color:var(--text-primary);margin:0 0 10px;">${item.exact_approved_title}</h2><p style="font-size:.95rem;color:var(--text-primary);line-height:1.55;margin-bottom:14px;font-weight:500;">${item.exact_approved_copy}</p><div style="background:var(--bg-card-subtle);border-left:4px solid #0369a1;padding:12px 14px;border-radius:6px;font-size:.85rem;color:var(--text-secondary);line-height:1.5;margin-bottom:16px;">${item.scope_caveat}</div><div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;"><a href="${item.safe_canonical_action.url}" target="_blank" rel="${item.safe_canonical_action.rel}" class="btn-rail-action btn-action-portal" aria-label="Mở thông báo lịch diễn 1022 chính thức" style="background:#0369a1;color:#fff;padding:12px 20px;min-height:44px;box-sizing:border-box;border-radius:8px;text-decoration:none;font-weight:700;font-size:.88rem;display:inline-flex;align-items:center;gap:6px;">${item.safe_canonical_action.label}</a><div style="font-size:.75rem;color:var(--text-secondary);font-family:monospace;">Evidence ID: ${item.card_id}</div></div></section>`;
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

  // 1. HOME VIEW
  function renderDailyGuideHome() {
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

    const countAll = VOUCHER_VAULT_ITEMS.length;
    const countPriceObs = VOUCHER_VAULT_ITEMS.filter(i => i.tier === 'PRICE_OBSERVATION').length;
    const countCounter = VOUCHER_VAULT_ITEMS.filter(i => i.tier === 'COUNTER_DEAL').length;
    const countBrand = VOUCHER_VAULT_ITEMS.filter(i => i.tier === 'BRAND_PROGRAM').length;
    const countApp = VOUCHER_VAULT_ITEMS.filter(i => i.tier === 'APP_VOUCHER').length;

    return `
      <div class="sprint-b-view-container">
        <header class="sprint-b-header">
          <h1 class="sprint-b-title">
            🎟️ Voucher Vault — Kho Ưu Đãi Đà Nẵng
            <span class="nav-badge-pill">${countAll} mục đối soát</span>
          </h1>
          <p class="sprint-b-subtitle">
            Phân định rõ ràng: <strong>Giá quan sát (thực đơn/rạp)</strong>, <strong>Ưu đãi quầy</strong>, <strong>Quyền lợi thương hiệu</strong> và <strong>Voucher app</strong>. Nguồn đối soát chính thức, xác minh địa bàn cơ sở tại Đà Nẵng, công khai điều kiện và cảnh báo ngân sách.
          </p>
        </header>

        <!-- 4-TIER FILTER BAR -->
        <div class="vault-tier-nav" role="group" aria-label="Bộ lọc phân tầng ưu đãi">
          <button class="vault-tier-btn active" data-vault-filter="ALL" aria-pressed="true">
            Tất cả <span class="nav-badge-pill">${countAll}</span>
          </button>
          <button class="vault-tier-btn" data-vault-filter="PRICE_OBSERVATION" aria-pressed="false">
            📋 Giá quan sát <span class="nav-badge-pill">${countPriceObs}</span>
          </button>
          <button class="vault-tier-btn" data-vault-filter="COUNTER_DEAL" aria-pressed="false">
            🟢 Deal quầy <span class="nav-badge-pill">${countCounter}</span>
          </button>
          <button class="vault-tier-btn" data-vault-filter="BRAND_PROGRAM" aria-pressed="false">
            🔵 Quyền lợi thương hiệu <span class="nav-badge-pill">${countBrand}</span>
          </button>
          <button class="vault-tier-btn" data-vault-filter="APP_VOUCHER" aria-pressed="false">
            🟣 Voucher app <span class="nav-badge-pill">${countApp}</span>
          </button>
        </div>

        <p id="vault-filter-status" role="status" style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 20px;">
          Đang hiển thị toàn bộ ${countAll} mục đã xác minh địa bàn Đà Nẵng.
        </p>

        <!-- VOUCHER GRID -->
        <div class="vault-grid" id="voucher-vault-grid" role="feed" aria-label="Danh sách thẻ ưu đãi">
          ${VOUCHER_VAULT_ITEMS.map(renderVoucherCard).join('')}
        </div>
      </div>
    `;
  }

  function renderVoucherCard(item) {
    let tierBadge = '';
    if (item.tier === 'PRICE_OBSERVATION') {
      tierBadge = '<span class="vault-tier-badge badge-price-observation">📋 Giá quan sát • Thực đơn</span>';
    } else if (item.tier === 'COUNTER_DEAL') {
      tierBadge = '<span class="vault-tier-badge badge-counter-deal">🟢 Deal quầy • Tại chỗ</span>';
    } else if (item.tier === 'BRAND_PROGRAM') {
      tierBadge = '<span class="vault-tier-badge badge-brand-program">🔵 Quyền lợi thương hiệu</span>';
    } else {
      tierBadge = '<span class="vault-tier-badge badge-app-voucher">🟣 Voucher app chính thức</span>';
    }

    return `
      <article class="vault-card" data-card-id="${item.id}" data-card-tier="${item.tier}" aria-label="${item.title}">
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
              ${item.tier === 'PRICE_OBSERVATION' ? '(Giá quan sát niêm yết)' : '(Ưu đãi vé tại quầy)'}
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

        <!-- CLAIM ACTION SECTION: COPY BUTTON GUARD (Only render when real published code exists) -->
        <div class="vault-claim-instruction">
          ${(item.has_code && item.code) ? `
            <div style="display: flex; align-items: center; justify-content: space-between; width: 100%; gap: 10px;">
              <span>Mã ưu đãi: <code>${item.code}</code></span>
              <button class="btn-copy-code" data-code="${item.code}" style="background: #0284c7; color: #ffffff; border: none; padding: 6px 14px; border-radius: 6px; font-weight: 700; font-size: 0.82rem; cursor: pointer; min-height: 44px; min-width: 44px;" aria-label="Sao chép mã ${item.code}">
                Sao chép mã
              </button>
            </div>
          ` : `
            <span>🏷️ <strong>Cách nhận:</strong> ${item.claim_instruction}</span>
          `}
        </div>

        <div class="vault-meta-row" style="font-size: 0.75rem; color: var(--text-muted); font-family: monospace;">
          Băm SHA-256 nguồn: ${item.raw_sha256.slice(0, 16)}...
        </div>

        <div class="vault-card-actions">
          <a href="${item.source_url}" target="_blank" rel="noopener noreferrer nofollow" class="btn-rail-action" style="background: var(--bg-card-subtle); color: var(--text-primary); border: 1px solid var(--border-subtle); padding: 8px 14px; border-radius: 6px; text-decoration: none; font-size: 0.85rem; font-weight: 600; display: inline-flex; align-items: center; gap: 4px; min-height: 44px; min-width: 44px;" aria-label="Xem nguồn chính thức cho ${item.title} trong tab mới">
            Xem nguồn chính thức ↗
          </a>
        </div>
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
          const show = (filter === 'ALL' || tier === filter);
          card.style.display = show ? 'flex' : 'none';
          if (show) visible++;
        });

        const statusEl = document.getElementById('vault-filter-status');
        if (statusEl) {
          statusEl.textContent = `Đang hiển thị ${visible} mục thuộc phân loại đã chọn.`;
        }
      });
    });

    // Copy code button listeners (only present if codes exist)
    document.querySelectorAll('.btn-copy-code').forEach(btn => {
      btn.addEventListener('click', () => {
        const code = btn.getAttribute('data-code');
        if (code) {
          copyTextToClipboard(code, `✓ Đã sao chép mã "${code}"!`);
        }
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
            <span class="nav-badge-pill">Local-First</span>
          </h1>
          <p class="sprint-b-subtitle">
            Chia tiền công bằng, tự động phân bổ số dư lẻ từng đồng VND (tổng các phần bằng 100% hóa đơn, sai số 0đ). Xử lý an toàn 100% in-browser, không lưu đám mây, không gửi dữ liệu qua mạng.
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
              <input type="number" id="split-bill-amount" class="split-input" placeholder="Ví dụ: 150000" min="1" step="1000" value="150000" aria-required="true">
              <div class="split-quick-buttons">
                <button type="button" class="split-quick-btn" data-add-bill="50000">+50.000đ</button>
                <button type="button" class="split-quick-btn" data-add-bill="100000">+100.000đ</button>
                <button type="button" class="split-quick-btn" data-add-bill="500000">+500.000đ</button>
              </div>
            </div>

            <div class="split-form-group">
              <label for="split-people-count" class="split-label">Số người tham gia chia tiền *</label>
              <input type="number" id="split-people-count" class="split-input" placeholder="Ví dụ: 3" min="1" max="100" value="3" aria-required="true">
              <div class="split-quick-buttons">
                <button type="button" class="split-quick-btn" data-set-count="2">2 người</button>
                <button type="button" class="split-quick-btn" data-set-count="3">3 người</button>
                <button type="button" class="split-quick-btn" data-set-count="4">4 người</button>
                <button type="button" class="split-quick-btn" data-set-count="5">5 người</button>
              </div>
            </div>

            <div class="split-form-group">
              <label for="split-bill-desc" class="split-label">Nội dung / Bữa ăn (Tùy chọn)</label>
              <input type="text" id="split-bill-desc" class="split-input" placeholder="Ví dụ: Bữa trưa Jollibee / Vé xem phim Galaxy" value="Bữa trưa nhóm bạn">
            </div>

            <div class="split-form-group">
              <label for="split-bill-payer" class="split-label">Thông tin nhận chuyển khoản (Tùy chọn)</label>
              <input type="text" id="split-bill-payer" class="split-input" placeholder="Ví dụ: Nguyen Van A - MBBank: 0987654321">
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

  function calculateIntegerSplit(totalBill, count) {
    if (isNaN(totalBill) || totalBill === null || totalBill <= 0) {
      return { valid: false, error: 'Tổng hóa đơn phải là số dương lớn hơn 0.' };
    }
    if (isNaN(count) || count === null || count <= 0) {
      return { valid: false, error: 'Số người tham gia phải lớn hơn 0.' };
    }
    if (!Number.isInteger(count)) {
      return { valid: false, error: 'Số người tham gia phải là số nguyên (ví dụ: 2, 3, 4).' };
    }
    if (count > 200) {
      return { valid: false, error: 'Số người tối đa cho phép là 200 người.' };
    }

    totalBill = Math.round(totalBill);
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
      const bill = parseFloat(amountInput.value);
      const count = parseInt(countInput.value, 10);
      const desc = (descInput.value || 'Bữa ăn nhóm').trim();
      const payer = (payerInput.value || '').trim();

      const result = calculateIntegerSplit(bill, count);
      const errorBox = document.getElementById('split-error-box');
      const resContainer = document.getElementById('split-result-container');

      if (!result.valid) {
        if (errorBox) {
          errorBox.style.display = 'block';
          errorBox.textContent = '⚠️ ' + result.error;
        }
        if (resContainer) {
          resContainer.innerHTML = '<p style="color: var(--text-muted); font-size: 0.9rem;">Vui lòng nhập thông tin hợp lệ để xem kết quả chia tiền.</p>';
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

      const zaloMessage = [
        `📢 [JAYT SPLIT-BILL] Chia tiền: ${desc}`,
        `💰 Tổng hóa đơn: ${formatVndPrice(result.totalBill)}`,
        `👥 Số người tham gia: ${result.count} người`,
        `----------------------------------`,
        breakdownText,
        `(Số dư lẻ: ${result.remainder}đ đã được tự động chia đều từng đồng)`,
        payer ? `💳 Chuyển khoản cho: ${payer}` : '',
        `----------------------------------`,
        `🔗 Tính toán minh bạch tại JayT: http://localhost:4176`
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
              <button type="button" id="btn-copy-zalo-msg" style="flex: 1; background: #065f46; color: #ffffff; border: none; padding: 12px 18px; border-radius: 8px; font-weight: 700; font-size: 0.9rem; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; gap: 6px; min-height: 44px;">
                📋 Sao chép tin nhắn Zalo
              </button>
              <button type="button" id="btn-open-zalo" style="background: #0068ff; color: #ffffff; border: none; padding: 12px 18px; border-radius: 8px; font-weight: 700; font-size: 0.9rem; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; gap: 6px; min-height: 44px;">
                💬 Mở Zalo
              </button>
            </div>
          </div>
        `;

        // Copy Zalo listener
        const copyBtn = document.getElementById('btn-copy-zalo-msg');
        copyBtn?.addEventListener('click', () => {
          copyTextToClipboard(zaloMessage, '✓ Đã sao chép tin nhắn chia bill! Bạn có thể dán ngay vào Zalo.');
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

    // Quick count buttons
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
                <small style="font-size: 0.75rem; opacity: 0.85;">${tab.key === 'saturday' || tab.key === 'sunday' ? 'Biểu giá chuẩn' : 'Có ưu đãi'}</small>
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
            ${dayData.name_vi} — Trạng Thái Cuối Tuần Tiêu Chuẩn
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
        const dayKey = tab.getAttribute('data-calendar-day');
        if (dayKey) selectDay(dayKey);
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

        <div style="font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 6px;">
          <strong>🏢 Showroom:</strong> 152 Hàm Nghi &amp; 52 Nguyễn Văn Linh, Đà Nẵng
        </div>

        <div style="font-size: 0.78rem; color: var(--text-muted); margin-bottom: 14px;">
          🕒 Ghi nhận theo HTTP Date: ${item.captured_at}
        </div>

        <div style="font-size: 0.75rem; color: var(--text-muted); font-family: monospace; margin-bottom: 14px;">
          SHA-256: ${item.raw_sha256.slice(0, 16)}...
        </div>

        <div style="margin-top: auto;">
          <a href="${item.source_url}" target="_blank" rel="noopener noreferrer nofollow" class="btn-rail-action" style="background: var(--bg-card-subtle); color: var(--text-primary); border: 1px solid var(--border-subtle); padding: 8px 14px; border-radius: 6px; text-decoration: none; font-size: 0.85rem; font-weight: 600; display: inline-flex; align-items: center; gap: 4px; min-height: 44px; width: 100%; box-sizing: border-box; justify-content: center;" aria-label="Mở trang sản phẩm ${item.name} trên website Phi Long">
            Xem sản phẩm tại nguồn ↗
          </a>
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

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initStorefront);
  } else {
    initStorefront();
  }

})(typeof window !== 'undefined' ? window : this);
