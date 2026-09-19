/**
 * JAYT STOREFRONT STAGING SOURCE OF TRUTH (SECTION EZ-V)
 * Version: v3.422.0 (Release Candidate)
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

  // LEGACY RADAR DATASET QUARANTINED
  const JAYT_DISCOVERY_ITEMS = [];

  const RUNTIME_FINGERPRINT = {
    ledger_version: 'v3.422.0',
    ledger_sha256: '8286f539eb5f5e1432d516bcad92f3fdf4f8b71c2ac8bb3adcaa3b0050036475',
    counts: {
      an_gi: 0,
      di_dau: 0,
      tien_ich: 0,
      mua_sam_hoc_tap: 0,
      total_public: 1,
      vouchers: 0,
      approved_pilots: 6
    }
  };

  // CONTROLLED T2 PILOT CARD COMPONENT
  function renderT2DocumentationPilotCard() {
    if (!FEATURE_FLAGS.T2_DOCUMENTATION_PILOT_ENABLED) return '';
    const pilot = APPROVED_PUBLIC_ENTRIES[0];
    if (!pilot || !pilot.public_eligible || pilot.evidence_contract_v3_status !== 'PUBLISHABLE_DOCUMENTATION_CANDIDATE') return '';

    return `
      <section class="t2-pilot-card-section" style="margin: 24px 0; background: var(--bg-card); border: 2px solid #0284c7; border-radius: 14px; padding: 20px; box-shadow: 0 4px 14px rgba(2, 132, 199, 0.08);" aria-label="Thí điểm đối soát: Chương trình chính thức T2">
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px; margin-bottom: 12px;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="background: rgba(2, 132, 199, 0.12); color: #0284c7; padding: 4px 10px; border-radius: 6px; font-size: 0.78rem; font-weight: 800; letter-spacing: 0.3px;">🛡️ T2 • TÀI LIỆU CHƯƠNG TRÌNH CHÍNH THỨC</span>
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
    return `<section class="t2-pilot-card-section" style="margin:24px 0;background:var(--bg-card);border:2px solid #0284c7;border-radius:14px;padding:20px;box-shadow:0 4px 14px rgba(2,132,199,.08);" aria-label="Tiện ích ký số toàn dân và y tế số đã được phê duyệt Staging"><div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:12px;"><span style="background:rgba(2,132,199,.12);color:#0284c7;padding:4px 10px;border-radius:6px;font-size:.78rem;font-weight:800;">🛡️ T2 • TIỆN ÍCH DỊCH VỤ CÔNG &amp; Y TẾ SỐ</span><span style="font-size:.75rem;color:var(--text-secondary);">STAGING • CEO phê duyệt từng mục</span></div><h2 style="font-size:1.25rem;font-weight:800;color:var(--text-primary);margin:0 0 10px;">${item.exact_approved_title}</h2><p style="font-size:.95rem;color:var(--text-primary);line-height:1.55;margin-bottom:14px;font-weight:500;">${item.exact_approved_copy}</p><div style="background:var(--bg-card-subtle);border-left:4px solid #0284c7;padding:12px 14px;border-radius:6px;font-size:.85rem;color:var(--text-secondary);line-height:1.5;margin-bottom:16px;">${item.scope_caveat}</div><div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;"><a href="${item.safe_canonical_action.url}" target="_blank" rel="${item.safe_canonical_action.rel}" class="btn-rail-action btn-action-portal" style="background:#0369a1;color:#fff;text-decoration:none;padding:10px 20px;border-radius:8px;font-weight:700;font-size:.9rem;min-height:44px;display:inline-flex;align-items:center;" aria-label="Mở nguồn Ký số Đà Nẵng chính thức trong tab mới">${item.safe_canonical_action.label}</a><div style="font-size:.75rem;color:var(--text-muted);font-family:monospace;">Evidence ID: ${item.card_id}</div></div></section>`;
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
    return `<section class="t2-pilot-card-section" style="margin:24px 0;background:var(--bg-card);border:2px solid #0369a1;border-radius:14px;padding:20px;box-shadow:0 4px 14px rgba(3,105,161,.08);" aria-label="Thông tin chuyến bay trên Danang Smart City 1022 đã được phê duyệt RC"><div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:12px;"><span style="background:rgba(3,105,161,.12);color:#0369a1;padding:4px 10px;border-radius:6px;font-size:.78rem;font-weight:800;">✈️ T2 • TIỆN ÍCH SỐ &amp; ĐIỀU HÀNH SÂN BAY</span><span style="font-size:.75rem;color:var(--text-secondary);">RC v3.422.0 • Ứng viên phát hành</span></div><h2 style="font-size:1.25rem;font-weight:800;color:var(--text-primary);margin:0 0 10px;">${item.exact_approved_title}</h2><p style="font-size:.95rem;color:var(--text-primary);line-height:1.55;margin-bottom:14px;font-weight:500;">${item.exact_approved_copy}</p><div style="background:var(--bg-card-subtle);border-left:4px solid #0369a1;padding:12px 14px;border-radius:6px;font-size:.85rem;color:var(--text-secondary);line-height:1.5;margin-bottom:16px;">${item.scope_caveat}</div><div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;"><a href="${item.safe_canonical_action.url}" target="_blank" rel="${item.safe_canonical_action.rel}" class="btn-rail-action btn-action-portal" aria-label="Mở thông tin chuyến bay 1022 chính thức" style="background:#0369a1;color:#fff;padding:12px 20px;min-height:44px;box-sizing:border-box;border-radius:8px;text-decoration:none;font-weight:700;font-size:.88rem;display:inline-flex;align-items:center;gap:6px;">${item.safe_canonical_action.label}</a><div style="font-size:.75rem;color:var(--text-secondary);font-family:monospace;">Evidence ID: ${item.card_id}</div></div></section>`;
  }

  function renderCivicChamDanceCard() {
    const item = APPROVED_PUBLIC_ENTRIES.find(entry => entry.card_id === 'B11_02_HOAT_DONG_VAN_HOA_BAO_TANG_CHAM_1022');
    if (!item || !item.public_eligible) return '';
    return `<section class="t2-pilot-card-section" style="margin:24px 0;background:var(--bg-card);border:2px solid #0369a1;border-radius:14px;padding:20px;box-shadow:0 4px 14px rgba(3,105,161,.08);" aria-label="Lịch biểu diễn vũ điệu Champa Bảo tàng Chăm Đà Nẵng 1022 đã được phê duyệt RC"><div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:12px;"><span style="background:rgba(3,105,161,.12);color:#0369a1;padding:4px 10px;border-radius:6px;font-size:.78rem;font-weight:800;">🏛️ T2 • VĂN HÓA &amp; DI SẢN CỘNG ĐỒNG</span><span style="font-size:.75rem;color:var(--text-secondary);">RC v3.422.0 • Ứng viên phát hành</span></div><h2 style="font-size:1.25rem;font-weight:800;color:var(--text-primary);margin:0 0 10px;">${item.exact_approved_title}</h2><p style="font-size:.95rem;color:var(--text-primary);line-height:1.55;margin-bottom:14px;font-weight:500;">${item.exact_approved_copy}</p><div style="background:var(--bg-card-subtle);border-left:4px solid #0369a1;padding:12px 14px;border-radius:6px;font-size:.85rem;color:var(--text-secondary);line-height:1.5;margin-bottom:16px;">${item.scope_caveat}</div><div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;"><a href="${item.safe_canonical_action.url}" target="_blank" rel="${item.safe_canonical_action.rel}" class="btn-rail-action btn-action-portal" aria-label="Mở thông báo lịch diễn 1022 chính thức" style="background:#0369a1;color:#fff;padding:12px 20px;min-height:44px;box-sizing:border-box;border-radius:8px;text-decoration:none;font-weight:700;font-size:.88rem;display:inline-flex;align-items:center;gap:6px;">${item.safe_canonical_action.label}</a><div style="font-size:.75rem;color:var(--text-secondary);font-family:monospace;">Evidence ID: ${item.card_id}</div></div></section>`;
  }

  function renderNeutralZeroState() {
    return `
      <section class="zero-state-neutral-provenance" style="background: var(--bg-card); border: 1px dashed var(--border-subtle); border-radius: 14px; padding: 36px 24px; text-align: center; margin: 24px 0;" aria-label="Khu vực Đang Kiểm Định Nguồn">
        <div style="font-size: 2.2rem; margin-bottom: 12px;">🔍</div>
        <h3 style="font-size: 1.15rem; font-weight: 800; color: var(--text-primary); margin-bottom: 8px;">Khu Vực Đang Kiểm Định Nguồn</h3>
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
              <h3 style="font-size: 1.05rem; font-weight: 700; margin: 8px 0 4px 0;">Đối Soát Nguồn Gốc</h3>
              <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.45;">
                Toàn bộ nguồn đang được kiểm định độc lập theo Evidence Contract v3 trước khi công bố.
              </p>
            </div>

            <div class="bento-tile-dock">
              <span class="dock-badge">⚡ TRUY CẬP NHANH</span>
              <h3 style="font-size: 1.05rem; font-weight: 700; margin: 4px 0 8px 0;">Công Cụ Tiện Ích</h3>
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
  function renderExploreView() {
    return `
      <div class="cr-experience-container">
        <header style="margin: 20px 0 10px 0;">
          <h1 style="font-size: 1.5rem; font-weight: 800; color: var(--text-primary); margin-bottom: 6px;">
            🛡️ Danh Mục Tài Liệu &amp; Tiện Ích Đã Đối Soát
          </h1>
          <p style="font-size: 0.92rem; color: var(--text-secondary);">
            Chỉ hiển thị các tài liệu đã đạt chuẩn Evidence Contract v3 và được phê duyệt chính thức.
          </p>
        </header>

        ${renderT2DocumentationPilotCard()}
        ${renderDanaBusPublicCard()}
        ${renderUedStudentPolicyCard()}
        ${renderDigitalSignatureHealthCard()}
        ${renderNeutralZeroState()}
      </div>
    `;
  }

  function renderWalletView() {
    return renderExploreView();
  }

  function renderVoucherHub() {
    return `
      <div class="cr-experience-container">
        <header style="margin: 20px 0 10px 0;">
          <h1 style="font-size: 1.5rem; font-weight: 800; color: var(--text-primary); margin-bottom: 6px;">
            🎟️ Trung Tâm Tra Cứu Ưu Đãi &amp; Voucher (0 mục)
          </h1>
          <p style="font-size: 0.92rem; color: var(--text-secondary);">
            Hiện không có voucher thương mại nào được kích hoạt. Toàn bộ tính năng thương mại đang khóa an toàn.
          </p>
        </header>
        ${renderNeutralZeroState()}
      </div>
    `;
  }

  // 3. STREAM A: LOCAL-FIRST SAVINGS LAB V2 (SECTION EZ-AD ENHANCEMENTS)
  function renderSavingsLabView() {
    return `
      <div class="cr-experience-container">
        <header style="margin: 20px 0 16px 0;">
          <h1 style="font-size: 1.5rem; font-weight: 800; color: var(--text-primary); margin-bottom: 6px;">
            🧮 Bảng Tính Thực Trả &mdash; Savings Lab v2 (Local-First)
          </h1>
          <p style="font-size: 0.92rem; color: var(--text-secondary); line-height: 1.5;">
            Công cụ tự tính toán chi phí giỏ hàng, ưu đãi và chia tiền nhóm &mdash; 100% xử lý tại trình duyệt của bạn, không gửi dữ liệu qua mạng, không thu thập PII.
          </p>
        </header>

        <!-- Presets Selection (EZ-AD Empty Presets) -->
        <div style="display: flex; gap: 10px; margin-bottom: 16px; flex-wrap: wrap;" role="group" aria-label="Lựa chọn chế độ tính toán">
          <button id="preset-solo" class="btn-preset-mode active" style="padding: 8px 16px; border: 1px solid #0284c7; background: rgba(2, 132, 199, 0.08); color: #0284c7; border-radius: 8px; font-weight: 700; font-size: 0.88rem; cursor: pointer;" aria-pressed="true">
            👤 Mua Sắm Cá Nhân (Solo)
          </button>
          <button id="preset-group" class="btn-preset-mode" style="padding: 8px 16px; border: 1px solid var(--border-subtle); background: var(--bg-card-subtle); color: var(--text-secondary); border-radius: 8px; font-weight: 600; font-size: 0.88rem; cursor: pointer;" aria-pressed="false">
            👥 Mua Sắm / Đi Lại Nhóm (Group Split)
          </button>
        </div>

        <section class="calculator-card-section" style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: 14px; padding: 24px; box-shadow: 0 4px 14px rgba(0,0,0,0.04); margin-bottom: 24px;" aria-label="Bảng tính giỏ hàng thực tế v2">
          <form id="savings-calc-form" onsubmit="return false;" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; margin-bottom: 20px;">
            <div>
              <label for="calc-item-price" style="display: block; font-size: 0.85rem; font-weight: 700; margin-bottom: 6px; color: var(--text-primary);">
                Giá niêm yết sản phẩm (VNĐ)
              </label>
              <input type="number" id="calc-item-price" class="calc-input" placeholder="0" min="0" step="1000" style="width: 100%; padding: 10px 12px; border: 1px solid var(--border-subtle); border-radius: 8px; font-size: 0.95rem; background: var(--bg-card-subtle); color: var(--text-primary);" aria-describedby="desc-item-price" />
              <span id="desc-item-price" style="font-size: 0.75rem; color: var(--text-secondary);">Giá gốc trước mọi chiết khấu</span>
            </div>

            <div>
              <label for="calc-shipping-fee" style="display: block; font-size: 0.85rem; font-weight: 700; margin-bottom: 6px; color: var(--text-primary);">
                Phí vận chuyển / giao hàng (VNĐ)
              </label>
              <input type="number" id="calc-shipping-fee" class="calc-input" placeholder="0" min="0" step="1000" style="width: 100%; padding: 10px 12px; border: 1px solid var(--border-subtle); border-radius: 8px; font-size: 0.95rem; background: var(--bg-card-subtle); color: var(--text-primary);" aria-describedby="desc-shipping" />
              <span id="desc-shipping" style="font-size: 0.75rem; color: var(--text-secondary);">Phí ship nếu có</span>
            </div>

            <div>
              <label for="calc-student-discount" style="display: block; font-size: 0.85rem; font-weight: 700; margin-bottom: 6px; color: var(--text-primary);">
                Giảm giá trực tiếp (%)
              </label>
              <input type="number" id="calc-student-discount" class="calc-input" placeholder="0" min="0" max="100" step="1" style="width: 100%; padding: 10px 12px; border: 1px solid var(--border-subtle); border-radius: 8px; font-size: 0.95rem; background: var(--bg-card-subtle); color: var(--text-primary);" aria-describedby="desc-pct" />
              <span id="desc-pct" style="font-size: 0.75rem; color: var(--text-secondary);">Tỷ lệ chiết khấu trực tiếp (0-100%)</span>
            </div>

            <div>
              <label for="calc-voucher-discount" style="display: block; font-size: 0.85rem; font-weight: 700; margin-bottom: 6px; color: var(--text-primary);">
                Giảm từ voucher / mã (VNĐ)
              </label>
              <input type="number" id="calc-voucher-discount" class="calc-input" placeholder="0" min="0" step="1000" style="width: 100%; padding: 10px 12px; border: 1px solid var(--border-subtle); border-radius: 8px; font-size: 0.95rem; background: var(--bg-card-subtle); color: var(--text-primary);" aria-describedby="desc-voucher" />
              <span id="desc-voucher" style="font-size: 0.75rem; color: var(--text-secondary);">Mã giảm giá cố định</span>
            </div>

            <div id="split-people-container">
              <label for="calc-people-split" style="display: block; font-size: 0.85rem; font-weight: 700; margin-bottom: 6px; color: var(--text-primary);">
                Số người chia tiền (người)
              </label>
              <input type="number" id="calc-people-split" class="calc-input" value="1" min="1" max="50" step="1" style="width: 100%; padding: 10px 12px; border: 1px solid var(--border-subtle); border-radius: 8px; font-size: 0.95rem; background: var(--bg-card-subtle); color: var(--text-primary);" aria-describedby="desc-split" />
              <span id="desc-split" style="font-size: 0.75rem; color: var(--text-secondary);">Chia đều hóa đơn giỏ hàng</span>
            </div>
          </form>

          <div style="display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 20px;">
            <button id="btn-calc-reset" style="padding: 8px 16px; border: 1px solid var(--border-subtle); background: var(--bg-card-subtle); border-radius: 6px; font-weight: 600; font-size: 0.85rem; cursor: pointer; color: var(--text-secondary);" aria-label="Đặt lại tất cả giá trị về mặc định">
              🔄 Đặt lại giá trị
            </button>
          </div>

          <!-- Component-by-Component Formula Breakdown Display (EZ-AD) -->
          <div style="background: rgba(0,0,0,0.02); border: 1px dashed var(--border-subtle); border-radius: 8px; padding: 12px 16px; margin-bottom: 16px; font-family: monospace; font-size: 0.85rem; color: var(--text-secondary);">
            <strong>Công thức:</strong> [Giá niêm yết: <span id="formula-price">0</span>] + [Ship: <span id="formula-shipping">0</span>] &minus; [Giảm trực tiếp: <span id="formula-pct">0</span>] &minus; [Voucher: <span id="formula-voucher">0</span>] = <strong><span id="formula-total" style="color: #0284c7;">0 VNĐ</span></strong>
          </div>

          <div style="background: var(--bg-card-subtle); border-radius: 10px; padding: 20px; border: 1px solid var(--border-subtle);" aria-live="polite" id="calc-results-panel">
            <h3 style="font-size: 1.1rem; font-weight: 800; color: var(--text-primary); margin-bottom: 12px;">📊 Kết Quả Tính Toán Thực Trả</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px; margin-bottom: 16px;">
              <div>
                <span style="font-size: 0.8rem; color: var(--text-secondary);">Tổng số tiền tiết kiệm:</span>
                <div id="res-total-saved" style="font-size: 1.25rem; font-weight: 800; color: #16a34a;">0 VNĐ</div>
              </div>
              <div>
                <span style="font-size: 0.8rem; color: var(--text-secondary);">Tổng số tiền thực trả:</span>
                <div id="res-final-total" style="font-size: 1.25rem; font-weight: 800; color: #0284c7;">0 VNĐ</div>
              </div>
              <div>
                <span style="font-size: 0.8rem; color: var(--text-secondary);">Số tiền mỗi người trả:</span>
                <div id="res-per-person" style="font-size: 1.25rem; font-weight: 800; color: var(--text-primary);">0 VNĐ</div>
              </div>
            </div>

            <div style="background: rgba(2, 132, 199, 0.06); border-left: 4px solid #0284c7; padding: 12px 14px; border-radius: 6px; font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5;">
              <strong>Lưu ý:</strong> JayT không đọc giỏ hàng và không xác thực mã cá nhân của bạn. Vui lòng kiểm tra mã tại ứng dụng hoặc giỏ hàng chính thức của đơn vị bán.
            </div>
          </div>
        </section>

        <section class="calculator-card-section" style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: 14px; padding: 24px;" aria-label="So sánh giỏ hàng tự nhập liệu">
          <h2 style="font-size: 1.15rem; margin: 0 0 8px; color: var(--text-primary);">🍱 So sánh giỏ hàng 3 ứng dụng</h2>
          <p style="font-size: .88rem; line-height: 1.5; color: var(--text-secondary); margin: 0 0 16px;">Nhập số tiền bạn thấy trong từng ứng dụng. JayT chỉ thực hiện phép tính trên trình duyệt; không truy cập ứng dụng, không xác nhận giá và không gửi dữ liệu đi đâu.</p>
          <div id="food-comparator-inputs" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: 12px;">
            ${['ShopeeFood', 'GrabFood', 'BeFood'].map((name, index) => `
              <fieldset style="border: 1px solid var(--border-subtle); border-radius: 10px; padding: 12px; margin: 0;">
                <legend style="font-weight: 700; color: var(--text-primary); padding: 0 4px;">${name}</legend>
                <label style="display:block; font-size:.8rem; margin:8px 0 4px;">Món hàng (VNĐ)<input class="food-input" data-app="${index}" data-field="subtotal" type="number" min="0" step="1000" value="0" style="width:100%; min-height:44px; box-sizing:border-box; margin-top:4px;"></label>
                <label style="display:block; font-size:.8rem; margin:8px 0 4px;">Phí giao hàng (VNĐ)<input class="food-input" data-app="${index}" data-field="shipping" type="number" min="0" step="1000" value="0" style="width:100%; min-height:44px; box-sizing:border-box; margin-top:4px;"></label>
                <label style="display:block; font-size:.8rem; margin:8px 0 4px;">Giảm giá bạn tự nhập (VNĐ)<input class="food-input" data-app="${index}" data-field="discount" type="number" min="0" step="1000" value="0" style="width:100%; min-height:44px; box-sizing:border-box; margin-top:4px;"></label>
                <output id="food-total-${index}" style="display:block; margin-top:10px; font-weight:800; color:#0369a1;">Thực trả: 0 VNĐ</output>
              </fieldset>`).join('')}
          </div>
          <p id="food-comparator-summary" aria-live="polite" style="margin:16px 0 0; font-weight:700; color:var(--text-primary);">Nhập số liệu để so sánh.</p>
        </section>
      </div>
    `;
  }

  function calculateSavingsMath() {
    const rawPrice = parseFloat(document.getElementById('calc-item-price')?.value) || 0;
    const rawShipping = parseFloat(document.getElementById('calc-shipping-fee')?.value) || 0;
    const rawStudentPct = parseFloat(document.getElementById('calc-student-discount')?.value) || 0;
    const rawVoucher = parseFloat(document.getElementById('calc-voucher-discount')?.value) || 0;
    const rawPeople = parseInt(document.getElementById('calc-people-split')?.value, 10) || 1;

    const price = Math.max(0, rawPrice);
    const shipping = Math.max(0, rawShipping);
    const studentPct = Math.min(100, Math.max(0, rawStudentPct));
    const voucher = Math.max(0, rawVoucher);
    const people = Math.max(1, rawPeople);

    const directDiscountVal = (price * studentPct) / 100;
    const totalDiscount = Math.min(price, voucher + directDiscountVal);
    const finalTotal = Math.max(0, (price - totalDiscount) + shipping);
    const perPerson = Math.ceil(finalTotal / people);

    const elSaved = document.getElementById('res-total-saved');
    const elFinal = document.getElementById('res-final-total');
    const elPerPerson = document.getElementById('res-per-person');

    if (elSaved) elSaved.textContent = totalDiscount.toLocaleString('vi-VN') + ' VNĐ';
    if (elFinal) elFinal.textContent = finalTotal.toLocaleString('vi-VN') + ' VNĐ';
    if (elPerPerson) elPerPerson.textContent = perPerson.toLocaleString('vi-VN') + ' VNĐ';

    // Formula breakdown elements
    const fPrice = document.getElementById('formula-price');
    const fShipping = document.getElementById('formula-shipping');
    const fPct = document.getElementById('formula-pct');
    const fVoucher = document.getElementById('formula-voucher');
    const fTotal = document.getElementById('formula-total');

    if (fPrice) fPrice.textContent = price.toLocaleString('vi-VN');
    if (fShipping) fShipping.textContent = shipping.toLocaleString('vi-VN');
    if (fPct) fPct.textContent = directDiscountVal.toLocaleString('vi-VN');
    if (fVoucher) fVoucher.textContent = voucher.toLocaleString('vi-VN');
    if (fTotal) fTotal.textContent = finalTotal.toLocaleString('vi-VN') + ' VNĐ';
  }

  function attachCalculatorEvents() {
    const inputs = document.querySelectorAll('.calc-input');
    inputs.forEach(input => {
      input.addEventListener('input', calculateSavingsMath);
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          calculateSavingsMath();
        }
      });
    });

    // Preset buttons
    const btnSolo = document.getElementById('preset-solo');
    const btnGroup = document.getElementById('preset-group');
    const peopleInput = document.getElementById('calc-people-split');

    if (btnSolo && btnGroup && peopleInput) {
      btnSolo.addEventListener('click', () => {
        btnSolo.style.border = '1px solid #0284c7';
        btnSolo.style.background = 'rgba(2, 132, 199, 0.08)';
        btnSolo.style.color = '#0284c7';
        btnSolo.setAttribute('aria-pressed', 'true');

        btnGroup.style.border = '1px solid var(--border-subtle)';
        btnGroup.style.background = 'var(--bg-card-subtle)';
        btnGroup.style.color = 'var(--text-secondary)';
        btnGroup.setAttribute('aria-pressed', 'false');

        peopleInput.value = '1';
        calculateSavingsMath();
      });

      btnGroup.addEventListener('click', () => {
        btnGroup.style.border = '1px solid #0284c7';
        btnGroup.style.background = 'rgba(2, 132, 199, 0.08)';
        btnGroup.style.color = '#0284c7';
        btnGroup.setAttribute('aria-pressed', 'true');

        btnSolo.style.border = '1px solid var(--border-subtle)';
        btnSolo.style.background = 'var(--bg-card-subtle)';
        btnSolo.style.color = 'var(--text-secondary)';
        btnSolo.setAttribute('aria-pressed', 'false');

        if (parseInt(peopleInput.value, 10) <= 1) {
          peopleInput.value = '2';
        }
        peopleInput.focus();
        calculateSavingsMath();
      });
    }

    const resetBtn = document.getElementById('btn-calc-reset');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        const itemPrice = document.getElementById('calc-item-price');
        const shipFee = document.getElementById('calc-shipping-fee');
        const stuDisc = document.getElementById('calc-student-discount');
        const vouDisc = document.getElementById('calc-voucher-discount');
        const people = document.getElementById('calc-people-split');

        if (itemPrice) itemPrice.value = '';
        if (shipFee) shipFee.value = '';
        if (stuDisc) stuDisc.value = '';
        if (vouDisc) vouDisc.value = '';
        if (people) people.value = '1';

        calculateSavingsMath();
      });
    }

    document.querySelectorAll('.food-input').forEach(input => input.addEventListener('input', calculateFoodComparison));
  }

  function calculateFoodComparison() {
    const totals = [0, 1, 2].map(index => {
      const value = field => Math.max(0, parseFloat(document.querySelector(`.food-input[data-app="${index}"][data-field="${field}"]`)?.value) || 0);
      const total = Math.max(0, value('subtotal') + value('shipping') - value('discount'));
      const output = document.getElementById(`food-total-${index}`);
      if (output) output.textContent = `Thực trả: ${total.toLocaleString('vi-VN')} VNĐ`;
      return total;
    });
    const names = ['ShopeeFood', 'GrabFood', 'BeFood'];
    const lowest = Math.min(...totals);
    const winner = totals.indexOf(lowest);
    const summary = document.getElementById('food-comparator-summary');
    if (summary) summary.textContent = lowest === 0 && totals.every(total => total === 0) ? 'Nhập số liệu để so sánh.' : `Theo số liệu bạn nhập, ${names[winner]} có tổng thấp nhất: ${lowest.toLocaleString('vi-VN')} VNĐ.`;
  }

  // 4. NAVIGATION ROUTER
  let currentNav = 'HOME';

  function navigateTo(navKey) {
    currentNav = navKey;
    const canvas = document.getElementById('jayt-view-canvas');
    if (!canvas) return;

    // Update active nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-nav') === navKey);
    });

    if (navKey === 'BUY_DECISION') {
      canvas.innerHTML = renderSavingsLabView();
      attachCalculatorEvents();
    } else if (navKey === 'EXPLORE' || navKey === 'WALLET' || navKey === 'FOOD_JOURNEY' || navKey === 'LEISURE_JOURNEY') {
      canvas.innerHTML = renderExploreView();
    } else if (navKey === 'VOUCHER_HUB') {
      canvas.innerHTML = renderVoucherHub();
    } else {
      canvas.innerHTML = renderDailyGuideHome();
    }

    // Attach dynamic click listeners
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

  // 5. REPORT SOURCE MODAL
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

    modal?.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal && modal.style.display === 'flex') {
        closeModal();
      }
    });
  }

  // 6. THEME TOGGLE
  function initTheme() {
    const themeBtn = document.getElementById('btn-toggle-theme');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        const isDark = document.body.classList.contains('theme-dark');
        document.body.classList.toggle('theme-dark', !isDark);
        document.body.classList.toggle('theme-light', isDark);
      });
    }
  }

  // 7. INITIALIZATION
  function initStorefront() {
    initTheme();
    initReportSourceModal();
    attachNavigationListeners();
    navigateTo('HOME');
    console.log('🛡️ JayT Storefront initialized under Directive EZ-V.');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initStorefront);
  } else {
    initStorefront();
  }

  // Export to window for inspection
  root.__JAYT_STOREFRONT__ = {
    version: 'v3.422.0',
    featureFlags: FEATURE_FLAGS,
    approvedPublicEntries: APPROVED_PUBLIC_ENTRIES,
    discoveryItems: JAYT_DISCOVERY_ITEMS,
    runtimeFingerprint: RUNTIME_FINGERPRINT
  };

})(typeof window !== 'undefined' ? window : this);
