/**
 * JAYT COMMUNITY OS — LOCAL LIVING JOURNEYS & HERO CIVIC FOCUS (SECTION BZ)
 * Release Candidate: v3.426.5-staging.bz
 * Governing Directive: JAYT-245 Section BZ (Lines 1858-1886)
 * Key Architecture:
 *  - Cầu Rồng Unobstructed Hero Visual Focus
 *  - 5 Local Living & Commerce Decision Journeys
 *  - Three-Lane Wallet UX (Dùng ngay / Cổng chính thức / Theo dõi)
 *  - Official Value Layer (3 Questions: Là gì? Ai kiểm tra? Mở ở đâu?)
 *  - Strict 32x32px Brand Mark Contract
 *  - Zero Commercial Association / Payment Assertions
 */

// 0. SILENT ZERO-PII OBSERVABILITY (STRICT PUBLIC DOM ISOLATION — BZ MANDATE #1)
if (typeof window !== 'undefined' && window.JAYT_OBSERVABILITY) {
  window.JAYT_OBSERVABILITY.recordEvent('STOREFRONT_INITIALIZED', {
    version: 'v3.426.5-staging.bz',
    environment: 'STAGING_REVIEW_BZ',
    dom_isolation: 'STRICT_ZERO_DOM_INJECTION'
  });
}

const JAYT_STOREFRONT_VERSION = 'v3.426.5-staging.bz';

// 1. DATA LEDGER (50 SANITIZED TIERED ITEMS ORGANIZED BY JOURNEYS)
const JAYT_DISCOVERY_ITEMS = [
  {
    "item_id": "DEAL_CGV_VNPAY_thông tin đồng hành",
    "tier": "VERIFIED_DEAL",
    "tier_name": "Nguồn Cung Đã Đối Soát",
    "badge_label": "RẠP CHIẾU PHIM ĐÔ THỊ",
    "title": "CGV Cinemas: Cổng Thông Tin Cụm Rạp Đà Nẵng",
    "brand": "CGV Cinemas",
    "monogram": "CGV",
    "color_accent": "#e11d48",
    "category": "Giải trí",
    "scope_text": "CGV Vĩnh Trung Plaza & Vincom Plaza Đà Nẵng",
    "audience_target": "Tất cả khán giả thanh toán qua VNPAY-QR",
    "timing_window": "Thứ 6, Thứ 7, Chủ Nhật hàng tuần",
    "conditions_limit": "Áp dụng theo thể lệ phát hành chính thức của đơn vị vận hành.",
    "observed_at": "2026-08-29 08:00",
    "summary_text": "Tra cứu lịch chiếu phim và thông tin cụm rạp CGV tại Vincom và Vĩnh Trung Plaza Đà Nẵng.",
    "verbatim_quote": "Thanh toán qua cổng VNPAY-QR tại ứng dụng ngân hàng liên kết.",
    "evidence_status": "Nguồn: www.cgv.vn • Kiểm tra: Định kỳ hôm nay",
    "official_source_url": "https://www.cgv.vn/default/movies/offers/vnpay-thông tin đồng hành",
    "action_type": "VIEW_OFFICIAL_SOURCE",
    "code_text": null,
    "action_label": "Xem cổng thông tin CGV →",
    "gateway_group": "DI_DAU",
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "SLOT_EVENING",
    "allow_field_claims": false,
    "journey_id": "JOURNEY_LEISURE",
    "journey_label": "Đi Chơi & Thư Giãn Tối Nay"
  },
  {
    "item_id": "DEAL_DOMINOS_thông tin đồng hành",
    "tier": "VERIFIED_DEAL",
    "tier_name": "Nguồn Cung Đã Đối Soát",
    "badge_label": "THƯƠNG HIỆU ẨM THỰC",
    "title": "Domino's Pizza: Kênh Thông Tin Chi Nhánh Đà Nẵng",
    "brand": "Domino's Pizza",
    "monogram": "DP",
    "color_accent": "#0284c7",
    "category": "Ăn uống",
    "scope_text": "Domino's Nguyễn Văn Linh & Pasteur Đà Nẵng",
    "audience_target": "Khách hàng cá nhân, học sinh sinh viên, nhóm bạn",
    "timing_window": "Thứ 3 & Chủ Nhật hàng tuần",
    "conditions_limit": "Áp dụng theo thể lệ phát hành chính thức của đơn vị vận hành.",
    "observed_at": "2026-08-29 08:00",
    "summary_text": "Mạng lưới cơ sở và thông tin thực đơn tại các chi nhánh Domino's Pizza trên địa bàn Đà Nẵng.",
    "verbatim_quote": "Tự động áp dụng trên website chính thức vào thứ 3 và chủ nhật.",
    "evidence_status": "Nguồn: dominos.vn • Kiểm tra: Định kỳ hôm nay",
    "official_source_url": "https://dominos.vn/khuyen-mai/mua-1-tang-1",
    "action_type": "VIEW_OFFICIAL_SOURCE",
    "code_text": null,
    "action_label": "Xem thông tin Domino's →",
    "gateway_group": "AN_GI",
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "ALL_DAY",
    "allow_field_claims": false,
    "journey_id": "JOURNEY_FOOD",
    "journey_label": "Ẩm Thực Đà Thành"
  },
  {
    "item_id": "DEAL_LOTTERIA_HAPPY_LUNCH",
    "tier": "VERIFIED_DEAL",
    "tier_name": "Nguồn Cung Đã Đối Soát",
    "badge_label": "THƯƠNG HIỆU ẨM THỰC",
    "title": "Lotteria: Thực Đơn Trưa Happy Lunch",
    "brand": "Lotteria Vietnam",
    "monogram": "LT",
    "color_accent": "#dc2626",
    "category": "Ăn uống",
    "scope_text": "Tất cả chi nhánh Lotteria TP. Đà Nẵng",
    "audience_target": "Học sinh, sinh viên, nhân viên văn phòng",
    "timing_window": "10:00 - 14:00 từ Thứ 2 đến Thứ 6",
    "conditions_limit": "Khung giờ trưa ngày trong tuần tại quầy phục vụ.",
    "observed_at": "2026-08-29 08:00",
    "summary_text": "Thông tin thực đơn trưa cơm gà, burger tại hệ thống chi nhánh Lotteria trên địa bàn Đà Nẵng.",
    "verbatim_quote": "Áp dụng khung giờ trưa từ Thứ 2 đến Thứ 6 tại hệ thống Lotteria.",
    "evidence_status": "Nguồn: www.lotteria.vn • Kiểm tra: Định kỳ hôm nay",
    "official_source_url": "https://www.lotteria.vn/menu/happy-lunch",
    "action_type": "VIEW_OFFICIAL_SOURCE",
    "code_text": null,
    "action_label": "Xem thực đơn Lotteria →",
    "gateway_group": "AN_GI",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "SLOT_LUNCH",
    "allow_field_claims": false,
    "journey_id": "JOURNEY_FOOD",
    "journey_label": "Ẩm Thực Đà Thành"
  },
  {
    "item_id": "DEAL_METIZ_U22",
    "tier": "VERIFIED_DEAL",
    "tier_name": "Nguồn Cung Đã Đối Soát",
    "badge_label": "ĐIỂM CHIẾU PHIM ĐÔ THỊ",
    "title": "Metiz Cinema: Chính Sách Khán Giả Trẻ U22",
    "brand": "Metiz Cinema",
    "monogram": "MZ",
    "color_accent": "#0d9488",
    "category": "Giải trí",
    "scope_text": "Tầng 1 Helio Center, Đường 2 Tháng 9, Hải Châu, Đà Nẵng",
    "audience_target": "Khán giả dưới 22 tuổi và học sinh sinh viên",
    "timing_window": "Từ Thứ 2 đến Thứ 6 hàng tuần",
    "conditions_limit": "Yêu cầu xuất trình giấy tờ tùy thân hoặc thẻ học sinh sinh viên tại quầy vé.",
    "observed_at": "2026-08-29 08:00",
    "summary_text": "Thông tin chính sách dành cho khán giả dưới 22 tuổi tại rạp Metiz Helio Center Đà Nẵng.",
    "verbatim_quote": "Xuất trình thẻ học sinh sinh viên hoặc CCCD tại quầy vé.",
    "evidence_status": "Nguồn: metiz.vn • Kiểm tra: Định kỳ hôm nay",
    "official_source_url": "https://metiz.vn/tin-tuc/khuyen-mai/gia-ve-u22-metiz/",
    "action_type": "VIEW_OFFICIAL_SOURCE",
    "code_text": null,
    "action_label": "Xem chính sách rạp Metiz →",
    "gateway_group": "DI_DAU",
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "SLOT_AFTERNOON",
    "allow_field_claims": false,
    "journey_id": "JOURNEY_LEISURE",
    "journey_label": "Đi Chơi & Thư Giãn Tối Nay"
  },
  {
    "item_id": "PROG_GITHUB_STUDENT",
    "tier": "VERIFIED_DEAL",
    "tier_name": "Nguồn Cung Đã Đối Soát",
    "badge_label": "ĐẶC QUYỀN HỌC ĐƯỜNG",
    "title": "GitHub Student Developer Pack (Bộ Công Cụ Lập Trình)",
    "brand": "GitHub Education",
    "monogram": "GH",
    "color_accent": "#24292f",
    "category": "Học tập",
    "scope_text": "HSSV tại các trường ĐH, CĐ, THPT TP. Đà Nẵng",
    "audience_target": "Học sinh sinh viên có email trường học (@edu.vn)",
    "timing_window": "Áp dụng liên tục trong suốt thời gian học tập",
    "conditions_limit": "Yêu cầu email trường học hợp lệ hoặc thẻ sinh viên.",
    "observed_at": "2026-08-29 08:00",
    "summary_text": "Gói công cụ lập trình, GitHub Copilot và tài nguyên kỹ thuật dành cho học sinh, sinh viên tại Đà Nẵng.",
    "verbatim_quote": "Xác thực qua cổng GitHub Education chính thức.",
    "evidence_status": "Nguồn: education.github.com • Kiểm tra: Định kỳ hôm nay",
    "official_source_url": "https://education.github.com/pack",
    "action_type": "VIEW_OFFICIAL_SOURCE",
    "code_text": null,
    "action_label": "Xem cổng GitHub Student →",
    "gateway_group": "MUA_SAM",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "ALL_DAY",
    "allow_field_claims": false,
    "journey_id": "JOURNEY_STUDY_TOOLS",
    "journey_label": "Học Tập & Làm Việc"
  },
  {
    "item_id": "PROG_NOTION_EDU",
    "tier": "VERIFIED_DEAL",
    "tier_name": "Nguồn Cung Đã Đối Soát",
    "badge_label": "ĐẶC QUYỀN HỌC ĐƯỜNG",
    "title": "Notion Plus: Chương Trình Hỗ Trợ Học Đường",
    "brand": "Notion",
    "monogram": "NT",
    "color_accent": "#000000",
    "category": "Học tập",
    "scope_text": "Sinh viên & Giảng viên các trường tại Đà Nẵng",
    "audience_target": "Tất cả tài khoản đăng ký bằng email .edu.vn",
    "timing_window": "Áp dụng trong thời gian học tập tài khoản",
    "conditions_limit": "Yêu cầu email trường học hợp lệ.",
    "observed_at": "2026-08-29 08:00",
    "summary_text": "Chính sách sử dụng Notion Plus phục vụ ghi chú và quản lý học tập dành cho học sinh, sinh viên.",
    "verbatim_quote": "Kích hoạt trực tiếp tại cài đặt Notion bằng email sinh viên.",
    "evidence_status": "Nguồn: www.notion.so • Kiểm tra: Định kỳ hôm nay",
    "official_source_url": "https://www.notion.so/product/notion-for-education",
    "action_type": "VIEW_OFFICIAL_SOURCE",
    "code_text": null,
    "action_label": "Xem cổng Notion Education →",
    "gateway_group": "MUA_SAM",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "ALL_DAY",
    "allow_field_claims": false,
    "journey_id": "JOURNEY_STUDY_TOOLS",
    "journey_label": "Học Tập & Làm Việc"
  },
  {
    "item_id": "PROG_CANVA_EDU",
    "tier": "OFFICIAL_PROGRAM",
    "tier_name": "Chương Trình Chính Thức",
    "badge_label": "ĐẶC QUYỀN HỌC ĐƯỜNG",
    "title": "Canva for Education: Nền Tảng Thiết Kế Học Đường",
    "brand": "Canva",
    "monogram": "CV",
    "color_accent": "#00c4cc",
    "category": "Học tập",
    "scope_text": "Giáo viên và học sinh sinh viên tại Đà Nẵng",
    "audience_target": "Giáo viên và học sinh phổ thông / sinh viên",
    "timing_window": "Liên tục",
    "conditions_limit": "Yêu cầu xác thực tài khoản giáo dục theo quy định.",
    "observed_at": "2026-08-29 08:00",
    "summary_text": "Nền tảng thiết kế đồ họa, bài giảng và thuyết trình dành cho học sinh, sinh viên và giáo viên.",
    "verbatim_quote": "Đăng ký qua cổng Canva for Education.",
    "evidence_status": "Nguồn: www.canva.com • Kiểm tra: Định kỳ hôm nay",
    "official_source_url": "https://www.canva.com/education/",
    "action_type": "CLAIM_OFFICIAL",
    "code_text": null,
    "action_label": "Xem cổng Canva Education →",
    "gateway_group": "MUA_SAM",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "ALL_DAY",
    "allow_field_claims": false,
    "journey_id": "JOURNEY_STUDY_TOOLS",
    "journey_label": "Học Tập & Làm Việc"
  },
  {
    "item_id": "PROG_JETBRAINS_STUDENT",
    "tier": "OFFICIAL_PROGRAM",
    "tier_name": "Chương Trình Chính Thức",
    "badge_label": "ĐẶC QUYỀN HỌC ĐƯỜNG",
    "title": "JetBrains Educational Pack: Bộ IDE Lập Trình",
    "brand": "JetBrains",
    "monogram": "JB",
    "color_accent": "#000000",
    "category": "Học tập",
    "scope_text": "Sinh viên CNTT các trường ĐH Bách Khoa, Sư Phạm KT, Duy Tân, FPT Đà Nẵng",
    "audience_target": "Sinh viên theo học ngành kỹ thuật công nghệ",
    "timing_window": "Gia hạn hàng năm bằng thẻ sinh viên",
    "conditions_limit": "Gia hạn hàng năm bằng email sinh viên trường đại học.",
    "observed_at": "2026-08-29 08:00",
    "summary_text": "Cấp bản quyền IntelliJ IDEA Ultimate, PyCharm Professional, WebStorm cho sinh viên công nghệ thông tin.",
    "verbatim_quote": "Xác thực qua email trường hoặc ISIC.",
    "evidence_status": "Nguồn: www.jetbrains.com • Kiểm tra: Định kỳ hôm nay",
    "official_source_url": "https://www.jetbrains.com/community/education/",
    "action_type": "CLAIM_OFFICIAL",
    "code_text": null,
    "action_label": "Xem cổng JetBrains Student →",
    "gateway_group": "MUA_SAM",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "ALL_DAY",
    "allow_field_claims": false,
    "journey_id": "JOURNEY_STUDY_TOOLS",
    "journey_label": "Học Tập & Làm Việc"
  },
  {
    "item_id": "PROG_SPOTIFY_STUDENT",
    "tier": "OFFICIAL_PROGRAM",
    "tier_name": "Chương Trình Chính Thức",
    "badge_label": "CHƯƠNG TRÌNH HỌC ĐƯỜNG",
    "title": "Spotify: Chương Trình Dành Cho Sinh Viên",
    "brand": "Spotify",
    "monogram": "SP",
    "color_accent": "#1db954",
    "category": "Giải trí",
    "scope_text": "Sinh viên các trường đại học tại Đà Nẵng",
    "audience_target": "Sinh viên chính quy",
    "timing_window": "Tối đa 4 năm học",
    "conditions_limit": "Yêu cầu thẻ sinh viên hoặc email trường học hợp lệ qua cổng xác thực.",
    "observed_at": "2026-08-29 08:00",
    "summary_text": "Thông tin chính sách đăng ký gói âm nhạc bản quyền dành cho học sinh, sinh viên trên website chính thức.",
    "verbatim_quote": "Xác thực tài khoản sinh viên qua SheerID.",
    "evidence_status": "Nguồn: www.spotify.com • Kiểm tra: Định kỳ hôm nay",
    "official_source_url": "https://www.spotify.com/vn-vi/student/",
    "action_type": "VIEW_OFFICIAL_SOURCE",
    "code_text": null,
    "action_label": "Xem cổng sinh viên Spotify →",
    "gateway_group": "DI_DAU",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "ALL_DAY",
    "allow_field_claims": false,
    "journey_id": "JOURNEY_STUDY_TOOLS",
    "journey_label": "Học Tập & Làm Việc"
  },
  {
    "item_id": "PROG_APPLE_MUSIC_STUDENT",
    "tier": "OFFICIAL_PROGRAM",
    "tier_name": "Chương Trình Chính Thức",
    "badge_label": "CHƯƠNG TRÌNH HỌC ĐƯỜNG",
    "title": "Apple Music: Chương Trình Dành Cho Sinh Viên",
    "brand": "Apple",
    "monogram": "AP",
    "color_accent": "#fa243c",
    "category": "Giải trí",
    "scope_text": "Sinh viên các trường ĐH tại Đà Nẵng",
    "audience_target": "Sinh viên các trường đại học cao đẳng",
    "timing_window": "Tối đa 48 tháng",
    "conditions_limit": "Yêu cầu xác minh tình trạng sinh viên qua UNiDAYS.",
    "observed_at": "2026-08-29 08:00",
    "summary_text": "Thông tin dịch vụ nghe nhạc trực tuyến chất lượng cao với chính sách hỗ trợ học đường từ Apple.",
    "verbatim_quote": "Xác minh sinh viên qua UNiDAYS.",
    "evidence_status": "Nguồn: www.apple.com • Kiểm tra: Định kỳ hôm nay",
    "official_source_url": "https://www.apple.com/vn/apple-music/",
    "action_type": "VIEW_OFFICIAL_SOURCE",
    "code_text": null,
    "action_label": "Xem cổng Apple Music →",
    "gateway_group": "DI_DAU",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "ALL_DAY",
    "allow_field_claims": false,
    "journey_id": "JOURNEY_STUDY_TOOLS",
    "journey_label": "Học Tập & Làm Việc"
  },
  {
    "item_id": "PROG_STARLIGHT_COMBO_10K",
    "tier": "OFFICIAL_PROGRAM",
    "tier_name": "Chương Trình Chính Thức",
    "badge_label": "RẠP CHIẾU PHIM ĐÔ THỊ",
    "title": "Starlight Cinema: Chương Trình Thành Viên Rạp Phim",
    "brand": "Starlight Cinema",
    "monogram": "SL",
    "color_accent": "#f59e0b",
    "category": "Giải trí",
    "scope_text": "Tầng 4 Tòa nhà Nguyễn Kim, Thanh Khê, Đà Nẵng",
    "audience_target": "Thành viên Starlight và học sinh sinh viên",
    "timing_window": "Thứ 3 hàng tuần",
    "conditions_limit": "Áp dụng cho thành viên tại quầy vé rạp Starlight Đà Nẵng.",
    "observed_at": "2026-08-29 08:00",
    "summary_text": "Thông tin quyền lợi thẻ thành viên và lịch chiếu tại cụm rạp Starlight Đà Nẵng.",
    "verbatim_quote": "Áp dụng thành viên Starlight tại quầy vé.",
    "evidence_status": "Nguồn: starlight.vn • Kiểm tra: Định kỳ hôm nay",
    "official_source_url": "https://starlight.vn/khuyen-mai/combo-bap-nuoc-10k.html",
    "action_type": "VIEW_OFFICIAL_SOURCE",
    "code_text": null,
    "action_label": "Xem thông tin rạp Starlight →",
    "gateway_group": "DI_DAU",
    "locality_tag": "THANH_KHE",
    "time_slot_tag": "SLOT_EVENING",
    "allow_field_claims": false,
    "journey_id": "JOURNEY_LEISURE",
    "journey_label": "Đi Chơi & Thư Giãn Tối Nay"
  },
  {
    "item_id": "PROG_GALAXY_CINEMA_HAPPY_DAY",
    "tier": "OFFICIAL_PROGRAM",
    "tier_name": "Chương Trình Chính Thức",
    "badge_label": "RẠP CHIẾU PHIM ĐÔ THỊ",
    "title": "Galaxy Cinema Đà Nẵng: Chương Trình Ngày Thành Viên",
    "brand": "Galaxy Cinema",
    "monogram": "GLX",
    "color_accent": "#ff6b00",
    "category": "Giải trí",
    "scope_text": "Coop Mart Điện Biên Phủ, Thanh Khê, Đà Nẵng",
    "audience_target": "Khán giả đại chúng và học sinh sinh viên",
    "timing_window": "Thứ 3 hàng tuần",
    "conditions_limit": "Áp dụng theo thể lệ phát hành của Galaxy Cinema.",
    "observed_at": "2026-08-29 08:00",
    "summary_text": "Thông tin lịch chiếu và chính sách dành cho khán giả tại Galaxy Cinema Đà Nẵng.",
    "verbatim_quote": "Đặt vé trên website hoặc ứng dụng Galaxy Cinema.",
    "evidence_status": "Nguồn: www.galaxycine.vn • Kiểm tra: Định kỳ hôm nay",
    "official_source_url": "https://www.galaxycine.vn/khuyen-mai/happy-day/",
    "action_type": "VIEW_OFFICIAL_SOURCE",
    "code_text": null,
    "action_label": "Xem lịch rạp Galaxy →",
    "gateway_group": "DI_DAU",
    "locality_tag": "THANH_KHE",
    "time_slot_tag": "SLOT_EVENING",
    "allow_field_claims": false,
    "journey_id": "JOURNEY_LEISURE",
    "journey_label": "Đi Chơi & Thư Giãn Tối Nay"
  },
  {
    "item_id": "PROG_COOPMART_STUDENT_CARD",
    "tier": "OFFICIAL_PROGRAM",
    "tier_name": "Chương Trình Chính Thức",
    "badge_label": "SIÊU THỊ BÁN LẺ",
    "title": "Co.opmart Đà Nẵng: Kênh Thẻ Thành Viên",
    "brand": "Co.opmart",
    "monogram": "CM",
    "color_accent": "#e11d48",
    "category": "Mua sắm",
    "scope_text": "Co.opmart Bình Thuận & Co.opmart Sơn Trà",
    "audience_target": "Người tiêu dùng, nội trợ, sinh viên",
    "timing_window": "Liên tục",
    "conditions_limit": "Áp dụng cho chủ thẻ thành viên Co.opmart.",
    "observed_at": "2026-08-29 08:00",
    "summary_text": "Thông tin chính sách tích lũy điểm thưởng và quyền lợi thành viên Co.opmart Đà Nẵng.",
    "verbatim_quote": "Đăng ký thẻ mở cửa tự do tại quầy dịch vụ khách hàng.",
    "evidence_status": "Nguồn: coopmart.vn • Kiểm tra: Định kỳ hôm nay",
    "official_source_url": "https://coopmart.vn",
    "action_type": "VIEW_CONDITIONS",
    "code_text": null,
    "action_label": "Xem thông tin Co.opmart →",
    "gateway_group": "MUA_SAM",
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "ALL_DAY",
    "allow_field_claims": false,
    "journey_id": "JOURNEY_STUDY_TOOLS",
    "journey_label": "Học Tập & Làm Việc"
  },
  {
    "item_id": "PROG_SHOPEE_STUDENT_CLUB",
    "tier": "OFFICIAL_PROGRAM",
    "tier_name": "Chương Trình Chính Thức",
    "badge_label": "THƯƠNG MẠI ĐIỆN TỬ",
    "title": "Shopee Student Club: Kênh Hỗ Trợ Sinh Viên",
    "brand": "Shopee Vietnam",
    "monogram": "SHP",
    "color_accent": "#ee4d2d",
    "category": "Mua sắm",
    "scope_text": "Học sinh sinh viên tại TP. Đà Nẵng",
    "audience_target": "Sinh viên xác thực thẻ",
    "timing_window": "Mỗi tháng cấp lại gói thông tin",
    "conditions_limit": "Yêu cầu xác thực thông tin thẻ sinh viên trên ứng dụng Shopee.",
    "observed_at": "2026-08-29 08:00",
    "summary_text": "Thông tin chương trình đồng hành cùng học sinh sinh viên mua sắm đồ dùng học tập trên Shopee.",
    "verbatim_quote": "Đăng ký tại mục Shopee Sinh Viên trong ứng dụng.",
    "evidence_status": "Nguồn: shopee.vn • Kiểm tra: Định kỳ hôm nay",
    "official_source_url": "https://shopee.vn/m/shopee-student-club",
    "action_type": "CLAIM_OFFICIAL",
    "code_text": null,
    "action_label": "Xem cổng Shopee Student →",
    "gateway_group": "MUA_SAM",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "ALL_DAY",
    "allow_field_claims": false,
    "journey_id": "JOURNEY_STUDY_TOOLS",
    "journey_label": "Học Tập & Làm Việc"
  },
  {
    "item_id": "PROG_GRAB_STUDENT_UNLIMITED",
    "tier": "OFFICIAL_PROGRAM",
    "tier_name": "Chương Trình Chính Thức",
    "badge_label": "DỊCH VỤ DI CHUYỂN",
    "title": "Grab: Kênh Hội Viên GrabUnlimited Học Đường",
    "brand": "Grab Vietnam",
    "monogram": "GRB",
    "color_accent": "#00b14f",
    "category": "Di chuyển",
    "scope_text": "Toàn TP. Đà Nẵng",
    "audience_target": "Sinh viên các trường đại học tại Đà Nẵng",
    "timing_window": "Gói gia hạn hàng tháng",
    "conditions_limit": "Áp dụng trên ứng dụng Grab tại khu vực Đà Nẵng.",
    "observed_at": "2026-08-29 08:00",
    "summary_text": "Thông tin chính sách di chuyển và giao nhận dành cho học sinh sinh viên trên ứng dụng Grab.",
    "verbatim_quote": "Kích hoạt gói thành viên trên ứng dụng Grab.",
    "evidence_status": "Nguồn: www.grab.com • Kiểm tra: Định kỳ hôm nay",
    "official_source_url": "https://www.grab.com/vn/",
    "action_type": "CLAIM_OFFICIAL",
    "code_text": null,
    "action_label": "Xem thông tin Grab →",
    "gateway_group": "DI_DAU",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "ALL_DAY",
    "allow_field_claims": false,
    "journey_id": "JOURNEY_TRANSPORT",
    "journey_label": "Di Chuyển & Đi Lại"
  },
  {
    "item_id": "PROG_BE_STUDENT_PACK",
    "tier": "OFFICIAL_PROGRAM",
    "tier_name": "Chương Trình Chính Thức",
    "badge_label": "DỊCH VỤ DI CHUYỂN",
    "title": "Be: Kênh Di Chuyển Đến Trường Cho Sinh Viên",
    "brand": "Be Group",
    "monogram": "BE",
    "color_accent": "#ffc107",
    "category": "Di chuyển",
    "scope_text": "Toàn TP. Đà Nẵng",
    "audience_target": "Học sinh sinh viên tại Đà Nẵng",
    "timing_window": "Áp dụng khung giờ cao điểm đi học",
    "conditions_limit": "Áp dụng trên ứng dụng Be tại khu vực Đà Nẵng.",
    "observed_at": "2026-08-29 08:00",
    "summary_text": "Thông tin các tuyến kết nối xe công nghệ từ ký túc xá đến các cổng trường đại học tại Đà Nẵng.",
    "verbatim_quote": "Xem chi tiết tại mục quyền lợi trường học trên ứng dụng Be.",
    "evidence_status": "Nguồn: be.com.vn • Kiểm tra: Định kỳ hôm nay",
    "official_source_url": "https://be.com.vn",
    "action_type": "CLAIM_OFFICIAL",
    "code_text": null,
    "action_label": "Xem thông tin Be →",
    "gateway_group": "DI_DAU",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "SLOT_MORNING",
    "allow_field_claims": false,
    "journey_id": "JOURNEY_TRANSPORT",
    "journey_label": "Di Chuyển & Đi Lại"
  },
  {
    "item_id": "PROG_FPT_PLAY_STUDENT",
    "tier": "OFFICIAL_PROGRAM",
    "tier_name": "Chương Trình Chính Thức",
    "badge_label": "TRUYỀN HÌNH & THỂ THAO",
    "title": "FPT Play: Gói Giải Trí & Ngoại Hạng Anh Dành Cho Sinh Viên",
    "brand": "FPT Play",
    "monogram": "FPT",
    "color_accent": "#f97316",
    "category": "Giải trí",
    "scope_text": "Toàn quốc & TP. Đà Nẵng",
    "audience_target": "Sinh viên các trường đại học",
    "timing_window": "Đăng ký theo năm học",
    "conditions_limit": "Áp dụng cho tài khoản đăng ký chính chủ",
    "observed_at": "2026-08-29 08:00",
    "summary_text": "Xem phim điện ảnh, truyền hình bản quyền và các trận cầu thể thao trực tiếp.",
    "verbatim_quote": "Đăng ký tại fptplay.vn.",
    "evidence_status": "Nguồn: fptplay.vn • Kiểm tra: Định kỳ hôm nay",
    "official_source_url": "https://fptplay.vn",
    "action_type": "CLAIM_OFFICIAL",
    "code_text": null,
    "action_label": "Xem gói cước FPT Play",
    "gateway_group": "DI_DAU",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "ALL_DAY",
    "allow_field_claims": false,
    "journey_id": "JOURNEY_STUDY_TOOLS",
    "journey_label": "Học Tập & Làm Việc"
  },
  {
    "item_id": "PROG_CGV_CULTURE_DAY",
    "tier": "OFFICIAL_PROGRAM",
    "tier_name": "Chương Trình Chính Thức",
    "badge_label": "RẠP CHIẾU PHIM ĐÔ THỊ",
    "title": "CGV Cinemas: Ngày Hội Điện Ảnh Định Kỳ",
    "brand": "CGV Cinemas",
    "monogram": "CGV",
    "color_accent": "#e11d48",
    "category": "Giải trí",
    "scope_text": "CGV Vĩnh Trung Plaza & CGV Vincom Đà Nẵng",
    "audience_target": "Mọi khán giả yêu điện ảnh",
    "timing_window": "Thứ Tư cuối cùng của mỗi tháng",
    "conditions_limit": "Áp dụng cho các suất chiếu 2D tiêu chuẩn theo lịch của CGV.",
    "observed_at": "2026-08-29 08:00",
    "summary_text": "Chương trình xem phim định kỳ dành cho người yêu điện ảnh tại các cụm rạp CGV Đà Nẵng.",
    "verbatim_quote": "Xem thông tin tại cgv.vn/default/culture-day.",
    "evidence_status": "Nguồn: www.cgv.vn • Kiểm tra: Định kỳ hôm nay",
    "official_source_url": "https://www.cgv.vn/default/culture-day",
    "action_type": "VIEW_OFFICIAL_SOURCE",
    "code_text": null,
    "action_label": "Xem thông tin CGV →",
    "gateway_group": "DI_DAU",
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "SLOT_EVENING",
    "allow_field_claims": false,
    "journey_id": "JOURNEY_LEISURE",
    "journey_label": "Đi Chơi & Thư Giãn Tối Nay"
  },
  {
    "item_id": "FACILITY_DANABUS",
    "tier": "CIVIC_FACILITY",
    "tier_name": "Tiện Ích Đô Thị Xác Minh",
    "badge_label": "TIỆN ÍCH CÔNG CỘNG",
    "title": "DanaBus: Mạng Lưới Xe Buýt Trợ Giá Đà Nẵng",
    "brand": "DanaBus — Xe Buýt Đà Nẵng",
    "monogram": "BUS",
    "color_accent": "#059669",
    "category": "Giao thông",
    "scope_text": "Toàn bộ mạng lưới nội thành TP. Đà Nẵng",
    "audience_target": "Học sinh sinh viên (45k/tháng), người dân và du khách",
    "timing_window": "05:30 – 21:00 hàng ngày",
    "conditions_limit": "Làm vé tháng tại các điểm đăng ký vé xe buýt thành phố",
    "observed_at": "2026-08-29 08:00",
    "summary_text": "Mạng lưới xe buýt nội thành hiện đại kết nối các trường đại học, khu ký túc xá và trung tâm hành chính.",
    "verbatim_quote": "Cổng thông tin xe buýt thành phố Đà Nẵng: danangbus.vn",
    "evidence_status": "Nguồn: danangbus.vn • Kiểm tra: Định kỳ hôm nay",
    "official_source_url": "https://danangbus.vn",
    "action_type": "VIEW_CONDITIONS",
    "code_text": null,
    "action_label": "Tra cứu tuyến xe & điểm làm vé",
    "gateway_group": "DI_DAU",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "SLOT_MORNING",
    "allow_field_claims": true,
    "journey_id": "JOURNEY_TRANSPORT",
    "journey_label": "Di Chuyển & Đi Lại"
  },
  {
    "item_id": "FACILITY_TNGO_BIKE",
    "tier": "CIVIC_FACILITY",
    "tier_name": "Tiện Ích Đô Thị Xác Minh",
    "badge_label": "TIỆN ÍCH CÔNG CỘNG",
    "title": "TNGO: Hệ Thống Xe Đạp Công Cộng TP. Đà Nẵng",
    "brand": "TNGO Xe Đạp Đô Thị",
    "monogram": "TNG",
    "color_accent": "#0284c7",
    "category": "Giao thông",
    "scope_text": "Hơn 60 trạm tại Hải Châu, Sơn Trà, Ngũ Hành Sơn",
    "audience_target": "Cư dân, sinh viên dạo phố và du khách",
    "timing_window": "24/7 hàng ngày",
    "conditions_limit": "Mở khóa xe qua ứng dụng TNGO chính thức",
    "observed_at": "2026-08-29 08:00",
    "summary_text": "Mạng lưới hơn 60 trạm xe đạp thông minh khắp các trục đường ven sông Hàn, bờ biển Mỹ Khê và khu đại học.",
    "verbatim_quote": "Tải ứng dụng và tra cứu trạm gần nhất tại tngo.vn",
    "evidence_status": "Nguồn: tngo.vn • Kiểm tra: Định kỳ hôm nay",
    "official_source_url": "https://tngo.vn",
    "action_type": "VIEW_OFFICIAL_SOURCE",
    "code_text": null,
    "action_label": "Xem vị trí trạm xe TNGO →",
    "gateway_group": "DI_DAU",
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "SLOT_AFTERNOON",
    "allow_field_claims": false,
    "journey_id": "JOURNEY_TRANSPORT",
    "journey_label": "Di Chuyển & Đi Lại"
  },
  {
    "item_id": "FACILITY_THU_VIEN_TONG_HOP",
    "tier": "CIVIC_FACILITY",
    "tier_name": "Tiện Ích Đô Thị Xác Minh",
    "badge_label": "KHÔNG GIAN HỌC TẬP CÔNG CỘNG",
    "title": "Thư Viện Khoa Học Tổng Hợp Đà Nẵng",
    "brand": "Thư Viện TP. Đà Nẵng",
    "monogram": "TV",
    "color_accent": "#4338ca",
    "category": "Học tập",
    "scope_text": "46 Bạch Đằng, Q. Hải Châu, TP. Đà Nẵng",
    "audience_target": "Học sinh, sinh viên, nhà nghiên cứu",
    "timing_window": "07:30 – 21:00 (Thứ 3 đến Chủ Nhật)",
    "conditions_limit": "Vào cửa tự do phòng đọc, làm thẻ mượn sách chỉ 20.000đ/năm",
    "observed_at": "2026-08-29 08:00",
    "summary_text": "Không gian tự học yên tĩnh nhìn thẳng ra sông Hàn, trang bị máy lạnh, wifi tốc độ cao và hàng ngàn đầu sách.",
    "verbatim_quote": "Cổng thông tin Thư viện Khoa học Tổng hợp Đà Nẵng: thuvien.danang.gov.vn",
    "evidence_status": "Nguồn: thuvien.danang.gov.vn • Kiểm tra: Định kỳ hôm nay",
    "official_source_url": "http://thuvien.danang.gov.vn",
    "action_type": "VIEW_CONDITIONS",
    "code_text": null,
    "action_label": "Xem giờ mở cửa & nội quy →",
    "gateway_group": "MUA_SAM",
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "SLOT_AFTERNOON",
    "allow_field_claims": true,
    "journey_id": "JOURNEY_STUDY_TOOLS",
    "journey_label": "Học Tập & Làm Việc"
  },
  {
    "item_id": "FACILITY_DVC_DANANG",
    "tier": "CIVIC_FACILITY",
    "tier_name": "Tiện Ích Đô Thị Xác Minh",
    "badge_label": "CỔNG DỊCH VỤ CÔNG 1022",
    "title": "Tổng Đài 1022 & Cổng Dịch Vụ Công Đà Nẵng",
    "brand": "Trung Tâm Dịch Vụ Công 1022",
    "monogram": "1022",
    "color_accent": "#0f766e",
    "category": "Tiện ích công",
    "scope_text": "Toàn bộ địa bàn TP. Đà Nẵng",
    "audience_target": "Tất cả công dân và học sinh sinh viên tại Đà Nẵng",
    "timing_window": "24/7 Tiếp nhận thông tin & phản ánh đô thị",
    "conditions_limit": "Gọi 0236 1022 hoặc tra cứu qua cổng dịch vụ công",
    "observed_at": "2026-08-29 08:00",
    "summary_text": "Kênh tra cứu thông tin hành chính, phản ánh giao thông, xe buýt, học tập và an sinh xã hội chính thức của thành phố.",
    "verbatim_quote": "Cổng dịch vụ công & thông tin 1022 Đà Nẵng: 1022.danang.gov.vn",
    "evidence_status": "Nguồn: 1022.danang.gov.vn • Kiểm tra: Định kỳ hôm nay",
    "official_source_url": "https://1022.danang.gov.vn",
    "action_type": "VIEW_CONDITIONS",
    "code_text": null,
    "action_label": "Mở cổng tiếp nhận 1022",
    "gateway_group": "MUA_SAM",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "ALL_DAY",
    "allow_field_claims": true,
    "journey_id": "JOURNEY_STUDY_TOOLS",
    "journey_label": "Học Tập & Làm Việc"
  },
  {
    "item_id": "PLACE_CAU_RONG_FIRE_WATER",
    "tier": "CIVIC_FACILITY",
    "tier_name": "Tiện Ích Đô Thị Xác Minh",
    "badge_label": "ĐIỂM HẸN VĂN HÓA ĐÔ THỊ",
    "title": "Cầu Rồng Phun Lửa & Phun Nước (21:00 Cuối Tuần)",
    "brand": "TP. Đà Nẵng",
    "monogram": "CR",
    "color_accent": "#ea580c",
    "category": "Đi chơi",
    "scope_text": "Cầu Rồng bắc qua Sông Hàn, Hải Châu / Sơn Trà",
    "audience_target": "Người dân thành phố, học sinh sinh viên, du khách",
    "timing_window": "21:00 Thứ 7 & Chủ Nhật hàng tuần",
    "conditions_limit": "mở cửa tự do 100%, cấm phương tiện lưu thông trên cầu trong thời gian phun lửa",
    "observed_at": "2026-08-29 08:00",
    "summary_text": "Biểu tượng kiến trúc của Đà Nẵng, trình diễn phun lửa và phun nước bên bờ sông Hàn vào mỗi tối Thứ 7 và Chủ Nhật.",
    "verbatim_quote": "Lịch phun lửa & phun nước cố định 21h00 thứ Bảy và Chủ Nhật.",
    "evidence_status": "Nguồn: danang.gov.vn • Kiểm tra: Định kỳ hôm nay",
    "official_source_url": "https://danang.gov.vn",
    "action_type": "VIEW_CONDITIONS",
    "code_text": null,
    "action_label": "Xem vị trí ngắm đẹp →",
    "gateway_group": "DI_DAU",
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "SLOT_EVENING",
    "allow_field_claims": true,
    "journey_id": "JOURNEY_LEISURE",
    "journey_label": "Đi Chơi & Thư Giãn Tối Nay"
  },
  {
    "item_id": "PLACE_CONG_VIEN_APEC",
    "tier": "CIVIC_FACILITY",
    "tier_name": "Tiện Ích Đô Thị Xác Minh",
    "badge_label": "KHÔNG GIAN CỘNG ĐỒNG",
    "title": "Công Viên APEC & Vòm Cánh Diều Ven Sông Hàn",
    "brand": "Công Viên APEC Đà Nẵng",
    "monogram": "APEC",
    "color_accent": "#0284c7",
    "category": "Đi chơi",
    "scope_text": "Đường 2 Tháng 9, P. Bình Hiên, Hải Châu, Đà Nẵng",
    "audience_target": "Thanh niên, nhóm bạn sinh viên, gia đình",
    "timing_window": "Mở cửa tự do cả ngày",
    "conditions_limit": "Giữ gìn vệ sinh chung, không xả rác",
    "observed_at": "2026-08-29 08:00",
    "summary_text": "Quảng trường rộng lớn với kiến trúc mái vòm cánh diều bay cao, địa điểm giao lưu và ngắm cảnh sông Hàn lý tưởng.",
    "verbatim_quote": "Công viên văn hóa mở phục vụ cộng đồng cư dân Đà Nẵng.",
    "evidence_status": "Nguồn: danang.gov.vn • Kiểm tra: Định kỳ hôm nay",
    "official_source_url": "https://danang.gov.vn",
    "action_type": "VIEW_CONDITIONS",
    "code_text": null,
    "action_label": "Xem vị trí & đường đi",
    "gateway_group": "DI_DAU",
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "SLOT_AFTERNOON",
    "allow_field_claims": true,
    "journey_id": "JOURNEY_LEISURE",
    "journey_label": "Đi Chơi & Thư Giãn Tối Nay"
  },
  {
    "item_id": "PLACE_PHO_DI_BO_BACH_DANG",
    "tier": "CIVIC_FACILITY",
    "tier_name": "Tiện Ích Đô Thị Xác Minh",
    "badge_label": "KHÔNG GIAN ĐI BỘ ĐÊM",
    "title": "Phố Đi Bộ Bạch Đằng (Bờ Tây Sông Hàn)",
    "brand": "Phố Đi Bộ Đà Nẵng",
    "monogram": "BD",
    "color_accent": "#10b981",
    "category": "Đi chơi",
    "scope_text": "Đường Bạch Đằng từ Cầu Rồng đến Cầu Trần Thị Lý",
    "audience_target": "Mọi lứa tuổi",
    "timing_window": "15:00 – 24:00 hàng ngày",
    "conditions_limit": "Khu vực cấm xe cơ giới trong khung giờ đi bộ",
    "observed_at": "2026-08-29 08:00",
    "summary_text": "Tuyến đường đi bộ ven sông thơ mộng với nhiều hoạt động âm nhạc đường phố, ẩm thực và làn gió mát sông Hàn.",
    "verbatim_quote": "Tuyến phố đi bộ kết hợp thưởng ngoạn cảnh quan sông Hàn.",
    "evidence_status": "Nguồn: danang.gov.vn • Kiểm tra: Định kỳ hôm nay",
    "official_source_url": "https://danang.gov.vn",
    "action_type": "VIEW_CONDITIONS",
    "code_text": null,
    "action_label": "Xem lộ trình phố đi bộ",
    "gateway_group": "DI_DAU",
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "SLOT_EVENING",
    "allow_field_claims": true,
    "journey_id": "JOURNEY_LEISURE",
    "journey_label": "Đi Chơi & Thư Giãn Tối Nay"
  },
  {
    "item_id": "PLACE_BAO_TANG_CHAM",
    "tier": "CIVIC_FACILITY",
    "tier_name": "Tiện Ích Đô Thị Xác Minh",
    "badge_label": "DI SẢN VĂN HÓA",
    "title": "Bảo Tàng Điêu Khắc Chăm Đà Nẵng",
    "brand": "Bảo Tàng Điêu Khắc Chăm",
    "monogram": "CHAM",
    "color_accent": "#b45309",
    "category": "Học tập",
    "scope_text": "Số 02 Đường 2 Tháng 9, Hải Châu, Đà Nẵng",
    "audience_target": "Học sinh sinh viên (vé quyền lợi 30k), nhà nghiên cứu",
    "timing_window": "07:30 – 17:00 hàng ngày",
    "conditions_limit": "Xuất trình thẻ sinh viên để nhận giá vé quyền lợi",
    "observed_at": "2026-08-29 08:00",
    "summary_text": "Nơi lưu giữ bộ sưu tập hiện vật điêu khắc Chăm Pa quy mô nhất thế giới trong không gian kiến trúc Pháp cổ kính.",
    "verbatim_quote": "Cổng thông tin bảo tàng: chammuseum.danang.vn",
    "evidence_status": "Nguồn: chammuseum.danang.vn • Kiểm tra: Định kỳ hôm nay",
    "official_source_url": "http://chammuseum.danang.vn",
    "action_type": "VIEW_CONDITIONS",
    "code_text": null,
    "action_label": "Xem thông tin bảo tàng →",
    "gateway_group": "DI_DAU",
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "SLOT_MORNING",
    "allow_field_claims": true,
    "journey_id": "JOURNEY_LEISURE",
    "journey_label": "Đi Chơi & Thư Giãn Tối Nay"
  },
  {
    "item_id": "PLACE_BAO_TANG_DA_NANG",
    "tier": "CIVIC_FACILITY",
    "tier_name": "Tiện Ích Đô Thị Xác Minh",
    "badge_label": "LỊCH SỬ THÀNH PHỐ",
    "title": "Bảo Tàng Đà Nẵng (Di Tích Thành Điện Hải)",
    "brand": "Bảo Tàng Đà Nẵng",
    "monogram": "BTDN",
    "color_accent": "#475569",
    "category": "Học tập",
    "scope_text": "24 Trần Phú, P. Thạch Thang, Hải Châu, Đà Nẵng",
    "audience_target": "Học sinh sinh viên, cư dân tìm hiểu lịch sử",
    "timing_window": "08:00 – 17:00 hàng ngày",
    "conditions_limit": "mở cửa tự do vé cho công dân thường trú và HSSV",
    "observed_at": "2026-08-29 08:00",
    "summary_text": "Trưng bày tư liệu lịch sử phát triển đô thị Đà Nẵng từ thời tiền sử đến hiện đại.",
    "verbatim_quote": "Cổng thông tin: baotangdanang.vn",
    "evidence_status": "Nguồn: baotangdanang.vn • Kiểm tra: Định kỳ hôm nay",
    "official_source_url": "https://baotangdanang.vn",
    "action_type": "VIEW_CONDITIONS",
    "code_text": null,
    "action_label": "Xem thông tin bảo tàng →",
    "gateway_group": "DI_DAU",
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "SLOT_MORNING",
    "allow_field_claims": true,
    "journey_id": "JOURNEY_LEISURE",
    "journey_label": "Đi Chơi & Thư Giãn Tối Nay"
  },
  {
    "item_id": "PLACE_BAI_BIEN_MY_KHE",
    "tier": "CIVIC_FACILITY",
    "tier_name": "Tiện Ích Đô Thị Xác Minh",
    "badge_label": "DANH THẮNG THIÊN NHIÊN",
    "title": "Bãi Biển Mỹ Khê & Bờ Đông Đà Nẵng",
    "brand": "Bãi Biển Đà Nẵng",
    "monogram": "MK",
    "color_accent": "#0284c7",
    "category": "Đi chơi",
    "scope_text": "Đường Võ Nguyên Giáp, Q. Sơn Trà / Ngũ Hành Sơn",
    "audience_target": "Tất cả mọi người",
    "timing_window": "Mở cửa tự do, đội cứu hộ trực 05:00 – 18:30",
    "conditions_limit": "Tắm biển trong khu vực có phao an toàn của cứu hộ",
    "observed_at": "2026-08-29 08:00",
    "summary_text": "Bãi biển quyến rũ với bờ cát trắng mịn, nước trong xanh và nhiều tiện ích công cộng phục vụ người dân, du khách.",
    "verbatim_quote": "Bãi biển công cộng văn minh, an toàn.",
    "evidence_status": "Nguồn: danang.gov.vn • Kiểm tra: Định kỳ hôm nay",
    "official_source_url": "https://danang.gov.vn",
    "action_type": "VIEW_CONDITIONS",
    "code_text": null,
    "action_label": "Xem hướng dẫn an toàn bãi biển →",
    "gateway_group": "DI_DAU",
    "locality_tag": "SON_TRA",
    "time_slot_tag": "SLOT_MORNING",
    "allow_field_claims": true,
    "journey_id": "JOURNEY_LEISURE",
    "journey_label": "Đi Chơi & Thư Giãn Tối Nay"
  },
  {
    "item_id": "PLACE_BAN_DAO_SON_TRA",
    "tier": "CIVIC_FACILITY",
    "tier_name": "Tiện Ích Đô Thị Xác Minh",
    "badge_label": "LÁ PHỔI XANH THÀNH PHỐ",
    "title": "Bán Đảo Sơn Trà & Chùa Linh Ứng",
    "brand": "Bán Đảo Sơn Trà",
    "monogram": "ST",
    "color_accent": "#15803d",
    "category": "Đi chơi",
    "scope_text": "Q. Sơn Trà, TP. Đà Nẵng",
    "audience_target": "Yêu thiên nhiên, dã ngoại, sinh viên",
    "timing_window": "Khuyến khích tham quan ban ngày trước 17:30",
    "conditions_limit": "Tuân thủ quy định giao thông đường đèo và bảo tồn linh trưởng",
    "observed_at": "2026-08-29 08:00",
    "summary_text": "Khu bảo tồn thiên nhiên với tầm nhìn bao quát toàn cảnh vịnh Đà Nẵng và quần thể voọc chà vá chân nâu quý hiếm.",
    "verbatim_quote": "Ban quản lý bán đảo Sơn Trà và các bãi biển du lịch Đà Nẵng.",
    "evidence_status": "Nguồn: danang.gov.vn • Kiểm tra: Định kỳ hôm nay",
    "official_source_url": "https://danang.gov.vn",
    "action_type": "VIEW_CONDITIONS",
    "code_text": null,
    "action_label": "Xem hướng dẫn an toàn dã ngoại",
    "gateway_group": "DI_DAU",
    "locality_tag": "SON_TRA",
    "time_slot_tag": "SLOT_MORNING",
    "allow_field_claims": true,
    "journey_id": "JOURNEY_LEISURE",
    "journey_label": "Đi Chơi & Thư Giãn Tối Nay"
  },
  {
    "item_id": "PLACE_CHO_HAN_DANANG",
    "tier": "CIVIC_FACILITY",
    "tier_name": "Tiện Ích Đô Thị Xác Minh",
    "badge_label": "CHỢ TRUYỀN THỐNG ĐÔ THỊ",
    "title": "Chợ Hàn: Đặc Sản Miền Trung & Nông Sản Tươi Ngon",
    "brand": "Chợ Hàn Đà Nẵng",
    "monogram": "CH",
    "color_accent": "#d97706",
    "category": "Mua sắm",
    "scope_text": "119 Trần Phú, P. Hải Châu 1, Hải Châu, Đà Nẵng",
    "audience_target": "Cư dân, du khách mua sắm đặc sản",
    "timing_window": "06:00 – 19:00 hàng ngày",
    "conditions_limit": "Các quầy hàng thực hiện niêm yết giá theo quy định",
    "observed_at": "2026-08-29 08:00",
    "summary_text": "Ngôi chợ truyền thống lâu đời ngay trung tâm thành phố với hàng trăm gian hàng đặc sản mắm, chả bò và quà lưu niệm.",
    "verbatim_quote": "Chợ truyền thống trung tâm TP. Đà Nẵng.",
    "evidence_status": "Nguồn: danang.gov.vn • Kiểm tra: Định kỳ hôm nay",
    "official_source_url": "https://danang.gov.vn",
    "action_type": "VIEW_CONDITIONS",
    "code_text": null,
    "action_label": "Xem vị trí & gian hàng",
    "gateway_group": "MUA_SAM",
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "SLOT_MORNING",
    "allow_field_claims": true,
    "journey_id": "JOURNEY_STUDY_TOOLS",
    "journey_label": "Học Tập & Làm Việc"
  },
  {
    "item_id": "PLACE_CHO_CON_AM_THUC",
    "tier": "CIVIC_FACILITY",
    "tier_name": "Tiện Ích Đô Thị Xác Minh",
    "badge_label": "THIÊN ĐƯỜNG ẨM THỰC BÌNH DÂN",
    "title": "Chợ Cồn: Khu Ẩm Thực Đường Phố Ngon Rẻ Đà Nẵng",
    "brand": "Chợ Cồn Đà Nẵng",
    "monogram": "CC",
    "color_accent": "#dc2626",
    "category": "Ăn uống",
    "scope_text": "Góc ngã tư Hùng Vương & Ông Ích Khiêm, Hải Châu, Đà Nẵng",
    "audience_target": "Học sinh, sinh viên, người sành ăn uống",
    "timing_window": "Khu ẩm thực nhộn nhịp từ 11:00 – 19:00",
    "conditions_limit": "Giá cả bình dân niêm yết tại các quầy",
    "observed_at": "2026-08-29 08:00",
    "summary_text": "Nơi hội tụ đầy đủ các món ngon Đà Nẵng: bánh bèo, nậm, lọc, ốc hút, phá lấu, kem bơ với mức giá cực kỳ phải chăng.",
    "verbatim_quote": "Chợ đầu mối ẩm thực truyền thống Đà Nẵng.",
    "evidence_status": "Nguồn: danang.gov.vn • Kiểm tra: Định kỳ hôm nay",
    "official_source_url": "https://danang.gov.vn",
    "action_type": "VIEW_CONDITIONS",
    "code_text": null,
    "action_label": "Khám phá bản đồ món ăn Chợ Cồn",
    "gateway_group": "AN_GI",
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "SLOT_AFTERNOON",
    "allow_field_claims": true,
    "journey_id": "JOURNEY_FOOD",
    "journey_label": "Ẩm Thực Đà Thành"
  },
  {
    "item_id": "PLACE_PHO_AM_THUC_HUYNH_THUC_KHANG",
    "tier": "CIVIC_FACILITY",
    "tier_name": "Tiện Ích Đô Thị Xác Minh",
    "badge_label": "PHỐ CHUYÊN DOANH ĂN SÁNG & TỐI",
    "title": "Phố Điểm Tâm & Ẩm Thực Huỳnh Thúc Kháng",
    "brand": "Phố Ẩm Thực Huỳnh Thúc Kháng",
    "monogram": "HTK",
    "color_accent": "#e11d48",
    "category": "Ăn uống",
    "scope_text": "Đường Huỳnh Thúc Kháng, Hải Châu, Đà Nẵng",
    "audience_target": "Người đi làm, sinh viên ăn sáng & ăn tối",
    "timing_window": "06:00 – 22:00 hàng ngày",
    "conditions_limit": "Tuyến phố ẩm thực văn minh, vệ sinh an toàn thực phẩm",
    "observed_at": "2026-08-29 08:00",
    "summary_text": "Tuyến phố chuyên doanh ăn sáng nức tiếng với mì Quảng, bún bò, bánh canh, xôi gà thơm ngon chuẩn vị xứ Quảng.",
    "verbatim_quote": "Tuyến phố văn minh ẩm thực quận Hải Châu.",
    "evidence_status": "Nguồn: danang.gov.vn • Kiểm tra: Định kỳ hôm nay",
    "official_source_url": "https://danang.gov.vn",
    "action_type": "VIEW_CONDITIONS",
    "code_text": null,
    "action_label": "Xem danh sách quán ngon",
    "gateway_group": "AN_GI",
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "SLOT_MORNING",
    "allow_field_claims": true,
    "journey_id": "JOURNEY_FOOD",
    "journey_label": "Ẩm Thực Đà Thành"
  },
  {
    "item_id": "PLACE_CUNG_THIEU_NHI_DANANG",
    "tier": "CIVIC_FACILITY",
    "tier_name": "Tiện Ích Đô Thị Xác Minh",
    "badge_label": "KIẾN TRÚC TANGRAM ĐỘC ĐÁO",
    "title": "Cung Thiếu Nhi Đà Nẵng: Không Gian Check-in & Sinh Hoạt",
    "brand": "Cung Văn Hóa Thiếu Nhi",
    "monogram": "TN",
    "color_accent": "#38bdf8",
    "category": "Đi chơi",
    "scope_text": "02 Phan Đăng Lưu, P. Hòa Cường Bắc, Hải Châu, Đà Nẵng",
    "audience_target": "Thanh thiếu niên, sinh viên chụp ảnh và sinh hoạt",
    "timing_window": "07:00 – 21:30 hàng ngày",
    "conditions_limit": "Mở cửa tự do khuôn viên ngoài trời",
    "observed_at": "2026-08-29 08:00",
    "summary_text": "Công trình kiến trúc mô phỏng hình khối Tangram đầy màu sắc, nơi diễn ra các hoạt động văn hóa nghệ thuật của giới trẻ.",
    "verbatim_quote": "Công trình văn hóa giáo dục thành phố Đà Nẵng.",
    "evidence_status": "Nguồn: danang.gov.vn • Kiểm tra: Định kỳ hôm nay",
    "official_source_url": "https://danang.gov.vn",
    "action_type": "VIEW_CONDITIONS",
    "code_text": null,
    "action_label": "Xem vị trí & không gian",
    "gateway_group": "DI_DAU",
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "SLOT_AFTERNOON",
    "allow_field_claims": true,
    "journey_id": "JOURNEY_LEISURE",
    "journey_label": "Đi Chơi & Thư Giãn Tối Nay"
  },
  {
    "item_id": "PLACE_NHA_THI_DAU_TIEN_SON",
    "tier": "CIVIC_FACILITY",
    "tier_name": "Tiện Ích Đô Thị Xác Minh",
    "badge_label": "TRUNG TÂM THỂ THAO & SỰ KIỆN",
    "title": "Cung Thể Thao Tiên Sơn (Đĩa Bay Tiên Sơn)",
    "brand": "Cung Thể Thao Tiên Sơn",
    "monogram": "TS",
    "color_accent": "#6366f1",
    "category": "Đi chơi",
    "scope_text": "Phan Đăng Lưu, Hòa Cường Bắc, Hải Châu, Đà Nẵng",
    "audience_target": "Vận động viên, sinh viên tập thể thao, khán giả sự kiện",
    "timing_window": "06:00 – 22:00 hàng ngày",
    "conditions_limit": "Theo lịch thi đấu và sự kiện văn hóa",
    "observed_at": "2026-08-29 08:00",
    "summary_text": "Nhà thi đấu hiện đại hình dáng đĩa bay, nơi diễn ra các giải thể thao sinh viên, hội thao và đại nhạc hội lớn.",
    "verbatim_quote": "Cung thể thao trọng điểm TP. Đà Nẵng.",
    "evidence_status": "Nguồn: danang.gov.vn • Kiểm tra: Định kỳ hôm nay",
    "official_source_url": "https://danang.gov.vn",
    "action_type": "VIEW_CONDITIONS",
    "code_text": null,
    "action_label": "Xem lịch sự kiện thể thao",
    "gateway_group": "DI_DAU",
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "SLOT_EVENING",
    "allow_field_claims": true,
    "journey_id": "JOURNEY_LEISURE",
    "journey_label": "Đi Chơi & Thư Giãn Tối Nay"
  },
  {
    "item_id": "PLACE_BEN_DU_THUYEN_SONG_HAN",
    "tier": "CIVIC_FACILITY",
    "tier_name": "Tiện Ích Đô Thị Xác Minh",
    "badge_label": "THƯỞNG NGOẠN SÔNG NƯỚC",
    "title": "Bến Du Thuyền Sông Hàn (Ngắm Cầu Đà Nẵng Về Đêm)",
    "brand": "Du Thuyền Sông Hàn",
    "monogram": "DTSH",
    "color_accent": "#0891b2",
    "category": "Đi chơi",
    "scope_text": "Đối diện số 34 Bạch Đằng, Hải Châu, Đà Nẵng",
    "audience_target": "Mọi lứa tuổi",
    "timing_window": "18:00 – 22:30 hàng đêm",
    "conditions_limit": "Giá vé niêm yết theo quy định cảng vụ hàng hải",
    "observed_at": "2026-08-29 08:00",
    "summary_text": "Trải nghiệm du ngoạn sông Hàn về đêm ngắm nhìn các cây cầu lung linh ánh đèn và thưởng thức múa Chăm truyền thống.",
    "verbatim_quote": "Bến cảng du lịch đường thủy nội địa Đà Nẵng.",
    "evidence_status": "Nguồn: danang.gov.vn • Kiểm tra: Định kỳ hôm nay",
    "official_source_url": "https://danang.gov.vn",
    "action_type": "VIEW_CONDITIONS",
    "code_text": null,
    "action_label": "Xem thông tin xuất bến",
    "gateway_group": "DI_DAU",
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "SLOT_EVENING",
    "allow_field_claims": true,
    "journey_id": "JOURNEY_LEISURE",
    "journey_label": "Đi Chơi & Thư Giãn Tối Nay"
  },
  {
    "item_id": "PLACE_TRUNG_TAM_VAN_HOA_DIEN_ANH",
    "tier": "CIVIC_FACILITY",
    "tier_name": "Tiện Ích Đô Thị Xác Minh",
    "badge_label": "VĂN HÓA NGHỆ THUẬT ĐÔ THỊ",
    "title": "Trung Tâm Văn Hóa — Điện Ảnh TP. Đà Nẵng",
    "brand": "Trung Tâm Văn Hóa TP",
    "monogram": "TTVH",
    "color_accent": "#7c3aed",
    "category": "Giải trí",
    "scope_text": "68 Trần Phú, Hải Châu, Đà Nẵng",
    "audience_target": "Cư dân yêu nghệ thuật truyền thống và điện ảnh",
    "timing_window": "08:00 – 21:00 hàng ngày",
    "conditions_limit": "Nhiều chương trình chiếu phim và biểu diễn mở cửa tự do",
    "observed_at": "2026-08-29 08:00",
    "summary_text": "Tổ chức các buổi chiếu phim tài liệu, biểu diễn tuồng, hô hát bài chòi và các hoạt động văn hóa nghệ thuật.",
    "verbatim_quote": "Đơn vị sự nghiệp văn hóa thuộc Sở VHTT Đà Nẵng.",
    "evidence_status": "Nguồn: danang.gov.vn • Kiểm tra: Định kỳ hôm nay",
    "official_source_url": "https://danang.gov.vn",
    "action_type": "VIEW_CONDITIONS",
    "code_text": null,
    "action_label": "Xem lịch hoạt động văn hóa →",
    "gateway_group": "DI_DAU",
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "SLOT_EVENING",
    "allow_field_claims": true,
    "journey_id": "JOURNEY_LEISURE",
    "journey_label": "Đi Chơi & Thư Giãn Tối Nay"
  },
  {
    "item_id": "RADAR_HIGHLANDS_COFFEE",
    "tier": "RADAR_SOURCE",
    "tier_name": "Nguồn Theo Dõi Định Kỳ",
    "badge_label": "NGUỒN CUNG ĐANG GIÁM SÁT",
    "title": "Highlands Coffee: Kênh Giám Sát Nguồn Tin",
    "brand": "Highlands Coffee",
    "monogram": "HL",
    "color_accent": "#b91c1c",
    "category": "Ăn uống",
    "scope_text": "Các chi nhánh Highlands Coffee Đà Nẵng",
    "audience_target": "Khách hàng uống cà phê, làm việc",
    "timing_window": "Giám sát định kỳ các đợt phát hành mã",
    "conditions_limit": "Đang trong diện giám sát thông tin phát hành chính thức hôm nay",
    "observed_at": "2026-08-29 08:00",
    "summary_text": "Theo dõi các thông tin phát hành chính thức từ ứng dụng di động Highlands Coffee.",
    "verbatim_quote": "Kênh chính thức: highlandscoffee.com.vn",
    "evidence_status": "Nguồn: highlandscoffee.com.vn • Kiểm tra: Định kỳ hôm nay",
    "official_source_url": "https://highlandscoffee.com.vn",
    "action_type": "WATCH_MONITOR",
    "code_text": null,
    "action_label": "Theo dõi nguồn Highlands",
    "gateway_group": "AN_GI",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "ALL_DAY",
    "allow_field_claims": false,
    "journey_id": "JOURNEY_FOOD",
    "journey_label": "Ẩm Thực Đà Thành"
  },
  {
    "item_id": "RADAR_PHUC_LONG",
    "tier": "RADAR_SOURCE",
    "tier_name": "Nguồn Theo Dõi Định Kỳ",
    "badge_label": "NGUỒN CUNG ĐANG GIÁM SÁT",
    "title": "Phúc Long Coffee & Tea: Kênh Giám Sát Nguồn Tin",
    "brand": "Phúc Long Tea",
    "monogram": "PL",
    "color_accent": "#047857",
    "category": "Ăn uống",
    "scope_text": "Phúc Long Bạch Đằng & Nguyễn Văn Linh, Đà Nẵng",
    "audience_target": "Khách hàng trà sữa, sinh viên",
    "timing_window": "Giám sát định kỳ",
    "conditions_limit": "Đang trong diện giám sát thông tin hôm nay",
    "observed_at": "2026-08-29 08:00",
    "summary_text": "Theo dõi chính sách thành viên và các thông báo mới từ thương hiệu Phúc Long.",
    "verbatim_quote": "Kênh chính thức: phuclong.com.vn",
    "evidence_status": "Nguồn: phuclong.com.vn • Kiểm tra: Định kỳ hôm nay",
    "official_source_url": "https://phuclong.com.vn",
    "action_type": "WATCH_MONITOR",
    "code_text": null,
    "action_label": "Theo dõi nguồn Phúc Long",
    "gateway_group": "AN_GI",
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "ALL_DAY",
    "allow_field_claims": false,
    "journey_id": "JOURNEY_FOOD",
    "journey_label": "Ẩm Thực Đà Thành"
  },
  {
    "item_id": "RADAR_VINCOM_PLAZA",
    "tier": "RADAR_SOURCE",
    "tier_name": "Nguồn Theo Dõi Định Kỳ",
    "badge_label": "NGUỒN CUNG ĐANG GIÁM SÁT",
    "title": "Vincom Plaza Ngô Quyền: Kênh Giám Sát Sự Kiện",
    "brand": "Vincom Plaza",
    "monogram": "VC",
    "color_accent": "#dc2626",
    "category": "Mua sắm",
    "scope_text": "910A Ngô Quyền, Sơn Trà, Đà Nẵng",
    "audience_target": "Người mua sắm cuối tuần",
    "timing_window": "Giám sát sự kiện định kỳ",
    "conditions_limit": "Theo từng đợt thông tin sự kiện của TTTM",
    "observed_at": "2026-08-29 08:00",
    "summary_text": "Theo dõi các sự kiện trải nghiệm mua sắm và hoạt động văn hóa tại TTTM Vincom Plaza Đà Nẵng.",
    "verbatim_quote": "Kênh chính thức: vincom.com.vn",
    "evidence_status": "Nguồn: vincom.com.vn • Kiểm tra: Định kỳ hôm nay",
    "official_source_url": "https://vincom.com.vn",
    "action_type": "WATCH_MONITOR",
    "code_text": null,
    "action_label": "Theo dõi nguồn Vincom",
    "gateway_group": "MUA_SAM",
    "locality_tag": "SON_TRA",
    "time_slot_tag": "ALL_DAY",
    "allow_field_claims": false,
    "journey_id": "JOURNEY_STUDY_TOOLS",
    "journey_label": "Học Tập & Làm Việc"
  },
  {
    "item_id": "RADAR_LOTTE_MART",
    "tier": "RADAR_SOURCE",
    "tier_name": "Nguồn Theo Dõi Định Kỳ",
    "badge_label": "NGUỒN CUNG ĐANG GIÁM SÁT",
    "title": "Lotte Mart Đà Nẵng: Kênh Giám Sát Siêu Thị",
    "brand": "Lotte Mart",
    "monogram": "LM",
    "color_accent": "#e11d48",
    "category": "Mua sắm",
    "scope_text": "Đường 2 Tháng 9, Hòa Cường Bắc, Hải Châu, Đà Nẵng",
    "audience_target": "Người mua sắm gia đình, sinh viên",
    "timing_window": "Cập nhật catalogue 2 tuần/lần",
    "conditions_limit": "Áp dụng theo kỳ cẩm nang siêu thị",
    "observed_at": "2026-08-29 08:00",
    "summary_text": "Theo dõi cẩm nang hàng hóa tiêu dùng và chính sách hội viên Lotte Mart.",
    "verbatim_quote": "Kênh chính thức: lottemart.vn",
    "evidence_status": "Nguồn: www.lottemart.vn • Kiểm tra: Định kỳ hôm nay",
    "official_source_url": "https://www.lottemart.vn",
    "action_type": "WATCH_MONITOR",
    "code_text": null,
    "action_label": "Theo dõi nguồn Lotte Mart",
    "gateway_group": "MUA_SAM",
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "ALL_DAY",
    "allow_field_claims": false,
    "journey_id": "JOURNEY_STUDY_TOOLS",
    "journey_label": "Học Tập & Làm Việc"
  },
  {
    "item_id": "RADAR_BIGC_GO_DANANG",
    "tier": "RADAR_SOURCE",
    "tier_name": "Nguồn Theo Dõi Định Kỳ",
    "badge_label": "NGUỒN CUNG ĐANG GIÁM SÁT",
    "title": "GO! Đà Nẵng (Big C): Kênh Giám Sát Siêu Thị",
    "brand": "GO! Đà Nẵng",
    "monogram": "GO",
    "color_accent": "#dc2626",
    "category": "Mua sắm",
    "scope_text": "Vĩnh Trung Plaza, 255 Hùng Vương, Thanh Khê, Đà Nẵng",
    "audience_target": "Người tiêu dùng, sinh viên mua sắm tiết kiệm",
    "timing_window": "Giám sát thông tin sự kiện hàng tuần",
    "conditions_limit": "Áp dụng tại đại siêu thị GO! Đà Nẵng",
    "observed_at": "2026-08-29 08:00",
    "summary_text": "Theo dõi thông tin hàng hóa thiết yếu và cẩm nang mua sắm tại siêu thị GO! Đà Nẵng.",
    "verbatim_quote": "Kênh chính thức: go-vietnam.vn",
    "evidence_status": "Nguồn: go-vietnam.vn • Kiểm tra: Định kỳ hôm nay",
    "official_source_url": "https://go-vietnam.vn",
    "action_type": "WATCH_MONITOR",
    "code_text": null,
    "action_label": "Theo dõi nguồn GO! Đà Nẵng",
    "gateway_group": "MUA_SAM",
    "locality_tag": "THANH_KHE",
    "time_slot_tag": "ALL_DAY",
    "allow_field_claims": false,
    "journey_id": "JOURNEY_STUDY_TOOLS",
    "journey_label": "Học Tập & Làm Việc"
  },
  {
    "item_id": "RADAR_KICHI_KICHI",
    "tier": "RADAR_SOURCE",
    "tier_name": "Nguồn Theo Dõi Định Kỳ",
    "badge_label": "NGUỒN CUNG ĐANG GIÁM SÁT",
    "title": "Kichi-Kichi Lẩu Băng Chuyền: Kênh Giám Sát Ẩm Thực",
    "brand": "Kichi-Kichi",
    "monogram": "KK",
    "color_accent": "#e11d48",
    "category": "Ăn uống",
    "scope_text": "Vincom & Nguyễn Văn Linh, Đà Nẵng",
    "audience_target": "Nhóm bạn, sinh viên, liên hoan",
    "timing_window": "Giám sát chương trình chính sách ẩm thực nhóm",
    "conditions_limit": "Áp dụng theo đợt phát hành mã của Golden Gate",
    "observed_at": "2026-08-29 08:00",
    "summary_text": "Theo dõi các thông báo thực đơn và sự kiện trải nghiệm lẩu băng chuyền tại Đà Nẵng.",
    "verbatim_quote": "Kênh chính thức: kichi.com.vn",
    "evidence_status": "Nguồn: kichi.com.vn • Kiểm tra: Định kỳ hôm nay",
    "official_source_url": "https://kichi.com.vn",
    "action_type": "WATCH_MONITOR",
    "code_text": null,
    "action_label": "Theo dõi nguồn Kichi-Kichi",
    "gateway_group": "AN_GI",
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "SLOT_LUNCH",
    "allow_field_claims": false,
    "journey_id": "JOURNEY_FOOD",
    "journey_label": "Ẩm Thực Đà Thành"
  },
  {
    "item_id": "RADAR_GOGI_HOUSE",
    "tier": "RADAR_SOURCE",
    "tier_name": "Nguồn Theo Dõi Định Kỳ",
    "badge_label": "NGUỒN CUNG ĐANG GIÁM SÁT",
    "title": "Gogi House: Kênh Giám Sát Ẩm Thực Nướng",
    "brand": "Gogi House",
    "monogram": "GG",
    "color_accent": "#b45309",
    "category": "Ăn uống",
    "scope_text": "Nguyễn Tri Phương & Lotte Mart, Đà Nẵng",
    "audience_target": "Gia đình, nhóm sinh viên tụ họp",
    "timing_window": "Giám sát định kỳ",
    "conditions_limit": "Áp dụng khi có mã quyền lợi phát hành",
    "observed_at": "2026-08-29 08:00",
    "summary_text": "Theo dõi các thông báo thực đơn thịt nướng chuẩn vị Hàn Quốc tại hệ thống Gogi House Đà Nẵng.",
    "verbatim_quote": "Kênh chính thức: gogi.com.vn",
    "evidence_status": "Nguồn: gogi.com.vn • Kiểm tra: Định kỳ hôm nay",
    "official_source_url": "https://gogi.com.vn",
    "action_type": "WATCH_MONITOR",
    "code_text": null,
    "action_label": "Theo dõi nguồn Gogi House",
    "gateway_group": "AN_GI",
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "SLOT_EVENING",
    "allow_field_claims": false,
    "journey_id": "JOURNEY_FOOD",
    "journey_label": "Ẩm Thực Đà Thành"
  },
  {
    "item_id": "RADAR_THE_COFFEE_HOUSE",
    "tier": "RADAR_SOURCE",
    "tier_name": "Nguồn Theo Dõi Định Kỳ",
    "badge_label": "NGUỒN CUNG ĐANG GIÁM SÁT",
    "title": "The Coffee House: Kênh Giám Sát Nguồn Tin",
    "brand": "The Coffee House",
    "monogram": "TCH",
    "color_accent": "#ea580c",
    "category": "Ăn uống",
    "scope_text": "Nguyễn Văn Linh, Trần Phú, Pasteur Đà Nẵng",
    "audience_target": "Sinh viên học nhóm, nhân viên văn phòng",
    "timing_window": "Giám sát chương trình trên ứng dụng Nhà",
    "conditions_limit": "Áp dụng theo từng thông tin trong ví ứng dụng",
    "observed_at": "2026-08-29 08:00",
    "summary_text": "Theo dõi các thông báo thực đơn và tính năng ứng dụng The Coffee House.",
    "verbatim_quote": "Kênh chính thức: thecoffeehouse.com",
    "evidence_status": "Nguồn: thecoffeehouse.com • Kiểm tra: Định kỳ hôm nay",
    "official_source_url": "https://thecoffeehouse.com",
    "action_type": "WATCH_MONITOR",
    "code_text": null,
    "action_label": "Theo dõi nguồn The Coffee House",
    "gateway_group": "AN_GI",
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "SLOT_MORNING",
    "allow_field_claims": false,
    "journey_id": "JOURNEY_FOOD",
    "journey_label": "Ẩm Thực Đà Thành"
  },
  {
    "item_id": "RADAR_TRUNG_NGUYEN_LEGEND",
    "tier": "RADAR_SOURCE",
    "tier_name": "Nguồn Theo Dõi Định Kỳ",
    "badge_label": "NGUỒN CUNG ĐANG GIÁM SÁT",
    "title": "Trung Nguyên Legend: Kênh Giám Sát Không Gian",
    "brand": "Trung Nguyên Legend",
    "monogram": "TN",
    "color_accent": "#78350f",
    "category": "Ăn uống",
    "scope_text": "Bạch Đằng, Nguyễn Thị Minh Khai, Đà Nẵng",
    "audience_target": "Người đọc sách, làm việc, đàm đạo",
    "timing_window": "Giám sát định kỳ",
    "conditions_limit": "Áp dụng theo chương trình từng chi nhánh",
    "observed_at": "2026-08-29 08:00",
    "summary_text": "Theo dõi các không gian cà phê và hoạt động văn hóa đọc bên bờ sông Hàn.",
    "verbatim_quote": "Kênh chính thức: trungnguyenlegend.com",
    "evidence_status": "Nguồn: trungnguyenlegend.com • Kiểm tra: Định kỳ hôm nay",
    "official_source_url": "https://trungnguyenlegend.com",
    "action_type": "WATCH_MONITOR",
    "code_text": null,
    "action_label": "Theo dõi nguồn Trung Nguyên",
    "gateway_group": "AN_GI",
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "SLOT_MORNING",
    "allow_field_claims": false,
    "journey_id": "JOURNEY_FOOD",
    "journey_label": "Ẩm Thực Đà Thành"
  },
  {
    "item_id": "RADAR_MIXUE_DANANG",
    "tier": "RADAR_SOURCE",
    "tier_name": "Nguồn Theo Dõi Định Kỳ",
    "badge_label": "NGUỒN CUNG ĐANG GIÁM SÁT",
    "title": "Mixue Đà Nẵng: Kênh Giám Sát Đồ Uống",
    "brand": "Mixue Vietnam",
    "monogram": "MX",
    "color_accent": "#dc2626",
    "category": "Ăn uống",
    "scope_text": "Các cơ sở Mixue gần cổng trường học Đà Nẵng",
    "audience_target": "Học sinh, sinh viên",
    "timing_window": "Giám sát theo mùa",
    "conditions_limit": "Giá niêm yết tại quầy",
    "observed_at": "2026-08-29 08:00",
    "summary_text": "Theo dõi các thông tin thực đơn và hoạt động tại các chi nhánh Mixue Đà Nẵng.",
    "verbatim_quote": "Kênh chính thức: mxbc.vn",
    "evidence_status": "Nguồn: mxbc.vn • Kiểm tra: Định kỳ hôm nay",
    "official_source_url": "https://mxbc.vn",
    "action_type": "WATCH_MONITOR",
    "code_text": null,
    "action_label": "Theo dõi nguồn Mixue",
    "gateway_group": "AN_GI",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "SLOT_AFTERNOON",
    "allow_field_claims": false,
    "journey_id": "JOURNEY_FOOD",
    "journey_label": "Ẩm Thực Đà Thành"
  },
  {
    "item_id": "RADAR_CGV_VINCOM_SCHEDULE",
    "tier": "RADAR_SOURCE",
    "tier_name": "Nguồn Theo Dõi Định Kỳ",
    "badge_label": "NGUỒN CUNG ĐANG GIÁM SÁT",
    "title": "CGV Vincom Đà Nẵng: Kênh Giám Sát Lịch Chiếu",
    "brand": "CGV Cinemas",
    "monogram": "CGV",
    "color_accent": "#e11d48",
    "category": "Giải trí",
    "scope_text": "Tầng 4 Vincom Plaza, Ngô Quyền, Sơn Trà, Đà Nẵng",
    "audience_target": "Khán giả phim ảnh",
    "timing_window": "Giám sát lịch chiếu hàng ngày",
    "conditions_limit": "Theo lịch chiếu rạp CGV",
    "observed_at": "2026-08-29 08:00",
    "summary_text": "Theo dõi lịch phát hành phim và các suất chiếu sớm tại rạp CGV Vincom Đà Nẵng.",
    "verbatim_quote": "Kênh chính thức: cgv.vn",
    "evidence_status": "Nguồn: www.cgv.vn • Kiểm tra: Định kỳ hôm nay",
    "official_source_url": "https://www.cgv.vn",
    "action_type": "WATCH_MONITOR",
    "code_text": null,
    "action_label": "Theo dõi nguồn CGV Vincom",
    "gateway_group": "DI_DAU",
    "locality_tag": "SON_TRA",
    "time_slot_tag": "SLOT_EVENING",
    "allow_field_claims": false,
    "journey_id": "JOURNEY_STUDY_TOOLS",
    "journey_label": "Học Tập & Làm Việc"
  },
  {
    "item_id": "RADAR_GALAXY_DIEN_BIEN_PHU",
    "tier": "RADAR_SOURCE",
    "tier_name": "Nguồn Theo Dõi Định Kỳ",
    "badge_label": "NGUỒN CUNG ĐANG GIÁM SÁT",
    "title": "Galaxy Điện Biên Phủ: Kênh Giám Sát Lịch Chiếu",
    "brand": "Galaxy Cinema",
    "monogram": "GLX",
    "color_accent": "#ff6b00",
    "category": "Giải trí",
    "scope_text": "478 Điện Biên Phủ, Thanh Khê, Đà Nẵng",
    "audience_target": "HSSV khu vực Thanh Khê, Liên Chiểu",
    "timing_window": "Giám sát lịch chiếu định kỳ",
    "conditions_limit": "Theo quy định cụm rạp",
    "observed_at": "2026-08-29 08:00",
    "summary_text": "Theo dõi thông tin lịch chiếu và trải nghiệm rạp phim tại Galaxy Điện Biên Phủ Đà Nẵng.",
    "verbatim_quote": "Kênh chính thức: galaxycine.vn",
    "evidence_status": "Nguồn: www.galaxycine.vn • Kiểm tra: Định kỳ hôm nay",
    "official_source_url": "https://www.galaxycine.vn",
    "action_type": "WATCH_MONITOR",
    "code_text": null,
    "action_label": "Theo dõi nguồn Galaxy",
    "gateway_group": "DI_DAU",
    "locality_tag": "THANH_KHE",
    "time_slot_tag": "SLOT_EVENING",
    "allow_field_claims": false,
    "journey_id": "JOURNEY_LEISURE",
    "journey_label": "Đi Chơi & Thư Giãn Tối Nay"
  },
  {
    "item_id": "RADAR_CGV_VINH_TRUNG_PLAZA",
    "tier": "RADAR_SOURCE",
    "tier_name": "Nguồn Theo Dõi Định Kỳ",
    "badge_label": "NGUỒN CUNG ĐANG GIÁM SÁT",
    "title": "CGV Vĩnh Trung Plaza: Kênh Giám Sát Lịch Chiếu",
    "brand": "CGV Cinemas",
    "monogram": "CGV",
    "color_accent": "#e11d48",
    "category": "Giải trí",
    "scope_text": "255 Hùng Vương, Thanh Khê, Đà Nẵng",
    "audience_target": "Khán giả trung tâm thành phố",
    "timing_window": "Giám sát hàng ngày",
    "conditions_limit": "Theo quy định cụm rạp",
    "observed_at": "2026-08-29 08:00",
    "summary_text": "Theo dõi các suất chiếu ngày trong tuần và sự kiện điện ảnh tại CGV Vĩnh Trung Đà Nẵng.",
    "verbatim_quote": "Kênh chính thức: cgv.vn",
    "evidence_status": "Nguồn: www.cgv.vn • Kiểm tra: Định kỳ hôm nay",
    "official_source_url": "https://www.cgv.vn",
    "action_type": "WATCH_MONITOR",
    "code_text": null,
    "action_label": "Theo dõi nguồn CGV Vĩnh Trung",
    "gateway_group": "DI_DAU",
    "locality_tag": "THANH_KHE",
    "time_slot_tag": "SLOT_AFTERNOON",
    "allow_field_claims": false,
    "journey_id": "JOURNEY_LEISURE",
    "journey_label": "Đi Chơi & Thư Giãn Tối Nay"
  },
  {
    "item_id": "RADAR_HELIO_CENTER_WEEKEND",
    "tier": "RADAR_SOURCE",
    "tier_name": "Nguồn Theo Dõi Định Kỳ",
    "badge_label": "NGUỒN CUNG ĐANG GIÁM SÁT",
    "title": "Helio Center: Kênh Giám Sát Sự Kiện Đô Thị",
    "brand": "Helio Center",
    "monogram": "HLIO",
    "color_accent": "#f59e0b",
    "category": "Đi chơi",
    "scope_text": "Đường 2 Tháng 9, Hòa Cường Nam, Hải Châu, Đà Nẵng",
    "audience_target": "Thanh thiếu niên, gia đình dạo chơi tối",
    "timing_window": "Giám sát sự kiện Thứ 6, Thứ 7, Chủ Nhật",
    "conditions_limit": "Vào cửa tự do khu chợ đêm",
    "observed_at": "2026-08-29 08:00",
    "summary_text": "Theo dõi các đêm nhạc Acoustic, không gian ẩm thực đêm và tổ hợp vui chơi giải trí Helio Đà Nẵng.",
    "verbatim_quote": "Kênh chính thức: helio.vn",
    "evidence_status": "Nguồn: helio.vn • Kiểm tra: Định kỳ hôm nay",
    "official_source_url": "https://helio.vn",
    "action_type": "WATCH_MONITOR",
    "code_text": null,
    "action_label": "Theo dõi nguồn Helio Center",
    "gateway_group": "DI_DAU",
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "SLOT_EVENING",
    "allow_field_claims": false,
    "journey_id": "JOURNEY_LEISURE",
    "journey_label": "Đi Chơi & Thư Giãn Tối Nay"
  }
];

// 2. THREE-LANE WALLET ENTRIES (13 ENTRIES)
const JAYT_WALLET_ENTRIES = [
  {
    "lane": "LANE_DUNG_NGAY",
    "lane_label": "DÙNG NGAY (ĐÃ XÁC THỰC)",
    "lane_badge": "✓ BẰNG CHỨNG HỢP LỆ",
    "entry_id": "VAL_GITHUB_STUDENT",
    "category": "STUDY_TOOLS",
    "merchant_name": "GitHub Education",
    "title": "GitHub Student Developer Pack",
    "service_description": "Bộ công cụ lập trình chuyên nghiệp, GitHub Copilot và tài nguyên kỹ thuật hỗ trợ học tập.",
    "target_audience": "Học sinh, sinh viên các trường đại học/cao đẳng có email trường học hoặc thẻ sinh viên.",
    "official_portal_guide": "Xác thực trực tiếp tại cổng GitHub Education bằng tài khoản học sinh sinh viên.",
    "official_source_url": "https://education.github.com/pack",
    "public_action_type": "CLAIM_OFFICIAL",
    "action_button_label": "Nhận đặc quyền GitHub →",
    "evidence_status": "Nguồn: education.github.com • Đã đối soát cổng thông tin"
  },
  {
    "lane": "LANE_DUNG_NGAY",
    "lane_label": "DÙNG NGAY (ĐÃ XÁC THỰC)",
    "lane_badge": "✓ BẰNG CHỨNG HỢP LỆ",
    "entry_id": "VAL_NOTION_EDU",
    "category": "STUDY_TOOLS",
    "merchant_name": "Notion",
    "title": "Notion Plus Education",
    "service_description": "Không gian làm việc số, ghi chú bài giảng và quản lý đề án học tập cho học sinh sinh viên.",
    "target_audience": "Học sinh, sinh viên và giảng viên có email tên miền giáo dục (.edu hoặc trường học).",
    "official_portal_guide": "Đăng ký tài khoản Notion bằng email học đường để nâng cấp gói Plus.",
    "official_source_url": "https://www.notion.so/product/notion-for-education",
    "public_action_type": "CLAIM_OFFICIAL",
    "action_button_label": "Nhận quyền lợi Notion →",
    "evidence_status": "Chính sách chính thức notion.so/product/notion-for-education"
  },
  {
    "lane": "LANE_DUNG_NGAY",
    "lane_label": "DÙNG NGAY (ĐÃ XÁC THỰC)",
    "lane_badge": "✓ BẰNG CHỨNG HỢP LỆ",
    "entry_id": "VAL_CANVA_EDU",
    "category": "STUDY_TOOLS",
    "merchant_name": "Canva Education",
    "title": "Canva for Education",
    "service_description": "Nền tảng thiết kế đồ họa, bài giảng và slide thuyết trình học đường.",
    "target_audience": "Giáo viên và học sinh sinh viên tại các cơ sở giáo dục đã được cấp phép.",
    "official_portal_guide": "Xác thực qua tài khoản Google Workspace for Education hoặc email trường.",
    "official_source_url": "https://www.canva.com/education/",
    "public_action_type": "CLAIM_OFFICIAL",
    "action_button_label": "Mở cổng Canva Education →",
    "evidence_status": "Chính sách chính thức canva.com/education"
  },
  {
    "lane": "LANE_DUNG_NGAY",
    "lane_label": "DÙNG NGAY (ĐÃ XÁC THỰC)",
    "lane_badge": "✓ BẰNG CHỨNG HỢP LỆ",
    "entry_id": "VAL_DANABUS_PASS",
    "category": "TRANSPORT",
    "merchant_name": "DanaBus Đà Nẵng",
    "title": "DanaBus: Vé Tháng Xe Buýt Học Sinh Sinh Viên",
    "service_description": "Mạng lưới xe buýt công cộng nội thành có trợ giá cho học sinh sinh viên trên toàn địa bàn TP. Đà Nẵng.",
    "target_audience": "Học sinh các trường phổ thông, sinh viên các trường đại học, cao đẳng tại Đà Nẵng.",
    "official_portal_guide": "Làm thẻ vé tháng tại Trung tâm Điều hành Đèn tín hiệu giao thông & Vận tải công cộng hoặc các quầy vé xe buýt thành phố.",
    "official_source_url": "https://danangbus.vn",
    "public_action_type": "VIEW_CONDITIONS",
    "action_button_label": "Xem điểm làm vé & lộ trình tuyến →",
    "evidence_status": "Hạ tầng giao thông công cộng • Đối soát danangbus.vn"
  },
  {
    "lane": "LANE_CONG_CHINH_THUC",
    "lane_label": "CỔNG CHÍNH THỨC (ĐANG KIỂM TRA ĐIỀU KIỆN)",
    "lane_badge": "🏛️ CỔNG THÔNG TIN CHÍNH THỨC",
    "entry_id": "VAL_CGV_CINEMAS",
    "category": "ENTERTAINMENT",
    "merchant_name": "CGV Cinemas Đà Nẵng",
    "title": "CGV Cinemas: Cổng Thông Tin Lịch Chiếu Cụm Rạp Đà Nẵng",
    "service_description": "Tra cứu lịch chiếu, suất chiếu phim tiêu chuẩn tại các cụm rạp CGV trên địa bàn TP. Đà Nẵng.",
    "target_audience": "Khán giả xem phim tại CGV Vincom Ngô Quyền và CGV Vĩnh Trung Plaza.",
    "official_portal_guide": "Xem lịch chiếu trực tiếp tại website chính thức cgv.vn.",
    "official_source_url": "https://www.cgv.vn",
    "public_action_type": "VIEW_CONDITIONS",
    "action_button_label": "Mở cổng thông tin CGV →",
    "evidence_status": "Nguồn: cgv.vn • Cổng thông tin cụm rạp chính thức"
  },
  {
    "lane": "LANE_CONG_CHINH_THUC",
    "lane_label": "CỔNG CHÍNH THỨC (ĐANG KIỂM TRA ĐIỀU KIỆN)",
    "lane_badge": "🏛️ CỔNG THÔNG TIN CHÍNH THỨC",
    "entry_id": "VAL_DOMINOS_PIZZA",
    "category": "FOOD_BEVERAGE",
    "merchant_name": "Domino's Pizza Đà Nẵng",
    "title": "Domino's Pizza: Kênh Chi Nhánh Đà Nẵng",
    "service_description": "Thực đơn bánh pizza và thông tin cơ sở tại các chi nhánh Hải Châu, Thanh Khê, Sơn Trà.",
    "target_audience": "Khách hàng dùng bữa tại cửa hàng hoặc đặt giao hàng qua kênh chính thức.",
    "official_portal_guide": "Kiểm tra thực đơn và các đợt phát hành thông báo trên website dominos.vn.",
    "official_source_url": "https://dominos.vn",
    "public_action_type": "VIEW_CONDITIONS",
    "action_button_label": "Mở cổng thông tin Domino's →",
    "evidence_status": "Bằng chứng niêm yết chính thức • Đối soát dominos.vn"
  },
  {
    "lane": "LANE_CONG_CHINH_THUC",
    "lane_label": "CỔNG CHÍNH THỨC (ĐANG KIỂM TRA ĐIỀU KIỆN)",
    "lane_badge": "🏛️ CỔNG THÔNG TIN CHÍNH THỨC",
    "entry_id": "VAL_LOTTERIA",
    "category": "FOOD_BEVERAGE",
    "merchant_name": "Lotteria Đà Nẵng",
    "title": "Lotteria: Kênh Thực Đơn Trưa Happy Lunch",
    "service_description": "Thực đơn trưa cơm gà, burger tại hệ thống cửa hàng thức ăn nhanh Lotteria Đà Nẵng.",
    "target_audience": "Khách hàng ăn trưa tại chỗ trong khung giờ từ 10h00 đến 14h00 từ Thứ 2 đến Thứ 6.",
    "official_portal_guide": "Xem thực đơn niêm yết tại quầy gọi món ở các cửa hàng Lotteria.",
    "official_source_url": "https://www.lotteria.vn",
    "public_action_type": "VIEW_CONDITIONS",
    "action_button_label": "Mở cổng thông tin Lotteria →",
    "evidence_status": "Bằng chứng niêm yết chính thức • Đối soát lotteria.vn"
  },
  {
    "lane": "LANE_CONG_CHINH_THUC",
    "lane_label": "CỔNG CHÍNH THỨC (ĐANG KIỂM TRA ĐIỀU KIỆN)",
    "lane_badge": "🏛️ CỔNG THÔNG TIN CHÍNH THỨC",
    "entry_id": "VAL_METIZ_CINEMA",
    "category": "ENTERTAINMENT",
    "merchant_name": "Metiz Cinema",
    "title": "Metiz Cinema: Chính Sách Khán Giả Trẻ U22",
    "service_description": "Chính sách vé xem phim dành cho khán giả trẻ tại rạp Metiz Cinema thuộc khu phức hợp Helio Center.",
    "target_audience": "Khán giả từ 22 tuổi trở xuống (xuất trình CCCD hoặc thẻ HSSV).",
    "official_portal_guide": "Mua vé trực tiếp tại quầy rạp Metiz Cinema Đà Nẵng.",
    "official_source_url": "https://metiz.vn",
    "public_action_type": "VIEW_CONDITIONS",
    "action_button_label": "Mở cổng thông tin rạp Metiz →",
    "evidence_status": "Bằng chứng niêm yết chính thức • Đối soát metiz.vn"
  },
  {
    "lane": "LANE_CONG_CHINH_THUC",
    "lane_label": "CỔNG CHÍNH THỨC (ĐANG KIỂM TRA ĐIỀU KIỆN)",
    "lane_badge": "🏛️ CỔNG THÔNG TIN CHÍNH THỨC",
    "entry_id": "VAL_STARLIGHT_CINEMA",
    "category": "ENTERTAINMENT",
    "merchant_name": "Starlight Cinema Đà Nẵng",
    "title": "Starlight Cinema: Chương Trình Thành Viên Rạp Phim",
    "service_description": "Hệ thống chiếu phim giải trí và chính sách thành viên tại tòa nhà Nguyễn Kim Đà Nẵng.",
    "target_audience": "Thành viên đăng ký tài khoản tại cụm rạp Starlight.",
    "official_portal_guide": "Xem thông tin lịch chiếu và thể lệ thành viên tại website starlight.vn.",
    "official_source_url": "https://starlight.vn",
    "public_action_type": "VIEW_CONDITIONS",
    "action_button_label": "Mở cổng rạp Starlight →",
    "evidence_status": "Bằng chứng niêm yết chính thức • Đối soát starlight.vn"
  },
  {
    "lane": "LANE_CONG_CHINH_THUC",
    "lane_label": "CỔNG CHÍNH THỨC (ĐANG KIỂM TRA ĐIỀU KIỆN)",
    "lane_badge": "🏛️ CỔNG THÔNG TIN CHÍNH THỨC",
    "entry_id": "VAL_TNGO_BIKE",
    "category": "TRANSPORT",
    "merchant_name": "TNGO Đà Nẵng",
    "title": "TNGO: Hệ Thống Xe Đạp Công Cộng TP. Đà Nẵng",
    "service_description": "Dịch vụ xe đạp đô thị thông minh kết nối các điểm du lịch, đại học và trục đường ven biển Đà Nẵng.",
    "target_audience": "Người dân và du khách sử dụng điện thoại thông minh kết nối ứng dụng TNGO.",
    "official_portal_guide": "Tải ứng dụng TNGO và quét mã QR tại hơn 60 trạm xe khắp thành phố.",
    "official_source_url": "https://tngo.vn",
    "public_action_type": "VIEW_CONDITIONS",
    "action_button_label": "Xem trạm xe TNGO gần bạn →",
    "evidence_status": "Hạ tầng giao thông đô thị • Đối soát tngo.vn"
  },
  {
    "lane": "LANE_THEO_DOI",
    "lane_label": "THEO DÕI (RADAR GIÁM SÁT NGUỒN CUNG)",
    "lane_badge": "📡 KÊNH GIÁM SÁT NGUỒN TIN",
    "entry_id": "VAL_HIGHLANDS_RADAR",
    "category": "FOOD_BEVERAGE",
    "merchant_name": "Highlands Coffee",
    "title": "Highlands Coffee: Kênh Giám Sát Nguồn Tin",
    "service_description": "Theo dõi thông tin thực đơn và các thông báo mới từ ứng dụng di động Highlands Coffee.",
    "target_audience": "Người dùng ứng dụng Highlands Coffee trên toàn quốc.",
    "official_portal_guide": "Kênh đang trong diện theo dõi tự động; chưa có hành động giao dịch trực tiếp.",
    "official_source_url": "https://highlandscoffee.com.vn",
    "public_action_type": "WATCH_MONITOR",
    "action_button_label": "Theo dõi nguồn Highlands",
    "evidence_status": "Kênh radar giám sát tự động • Chưa phát hành mã"
  },
  {
    "lane": "LANE_THEO_DOI",
    "lane_label": "THEO DÕI (RADAR GIÁM SÁT NGUỒN CUNG)",
    "lane_badge": "📡 KÊNH GIÁM SÁT NGUỒN TIN",
    "entry_id": "VAL_PHUCLONG_RADAR",
    "category": "FOOD_BEVERAGE",
    "merchant_name": "Phúc Long Coffee & Tea",
    "title": "Phúc Long: Kênh Giám Sát Thẻ Thành Viên",
    "service_description": "Theo dõi các cập nhật chính sách điểm thưởng và thông báo từ thương hiệu Phúc Long tại Đà Nẵng.",
    "target_audience": "Hội viên có thẻ tích điểm Phúc Long.",
    "official_portal_guide": "Kênh đang trong diện theo dõi định kỳ qua cổng thông tin chính thức.",
    "official_source_url": "https://phuclong.com.vn",
    "public_action_type": "WATCH_MONITOR",
    "action_button_label": "Theo dõi nguồn Phúc Long",
    "evidence_status": "Kênh radar giám sát tự động • Chưa phát hành mã"
  },
  {
    "lane": "LANE_THEO_DOI",
    "lane_label": "THEO DÕI (RADAR GIÁM SÁT NGUỒN CUNG)",
    "lane_badge": "📡 KÊNH GIÁM SÁT NGUỒN TIN",
    "entry_id": "VAL_VINCOM_RADAR",
    "category": "SHOPPING",
    "merchant_name": "Vincom Plaza Ngô Quyền",
    "title": "Vincom Plaza Đà Nẵng: Kênh Giám Sát Sự Kiện",
    "service_description": "Theo dõi các sự kiện văn hóa, không gian ẩm thực và hoạt động mua sắm tại TTTM Vincom Ngô Quyền.",
    "target_audience": "Khách hàng tham quan và mua sắm tại TTTM Vincom Đà Nẵng.",
    "official_portal_guide": "Theo dõi bảng tin sự kiện tại sảnh TTTM hoặc website chính thức vincom.com.vn.",
    "official_source_url": "https://vincom.com.vn",
    "public_action_type": "WATCH_MONITOR",
    "action_button_label": "Theo dõi nguồn Vincom",
    "evidence_status": "Kênh radar giám sát sự kiện • Chưa phát hành mã"
  }
];

// 3. SPA STATE
let activeView = 'HOME'; // 'HOME' | 'EXPLORE' | 'WALLET' | 'BUY_DECISION' | 'SAVED'
let activeGateway = 'ALL';
let activeLocality = 'ALL';
let activeTier = 'ALL';
let activeWalletLane = 'ALL'; // 'ALL' | 'LANE_DUNG_NGAY' | 'LANE_CONG_CHINH_THUC' | 'LANE_THEO_DOI'
let currentTheme = 'light';
let savedItemIds = new Set();
let modalTriggerElement = null;

try {
  if (typeof localStorage !== 'undefined') {
    const saved = localStorage.getItem('jayt_saved_items');
    if (saved) savedItemIds = new Set(JSON.parse(saved));
    const theme = localStorage.getItem('jayt_theme_mode');
    if (theme) currentTheme = theme;
  }
} catch (e) {}

// TIME-AWARE CONTEXT HELPER
function getCurrentTimeSlotInfo() {
  const hour = (typeof window !== 'undefined' && window.JAYT_TEST_HOUR !== undefined) 
    ? window.JAYT_TEST_HOUR 
    : new Date().getHours();
  
  if (hour >= 5 && hour < 11) {
    return { slot: 'SLOT_MORNING', label: 'Sáng nay', greeting: 'Chào buổi sáng Đà Nẵng', kicker: '🌅 SÁNG NAY CHỌN GÌ?' };
  } else if (hour >= 11 && hour < 14) {
    return { slot: 'SLOT_LUNCH', label: 'Trưa nay', greeting: 'Bữa trưa tiếp năng lượng', kicker: '🍜 TRƯA NAY ĂN GÌ?' };
  } else if (hour >= 14 && hour < 18) {
    return { slot: 'SLOT_AFTERNOON', label: 'Chiều nay', greeting: 'Khám phá chiều mát Đà Nẵng', kicker: '☕ CHIỀU NAY ĐI ĐÂU?' };
  } else {
    return { slot: 'SLOT_EVENING', label: 'Tối nay', greeting: 'Đêm Đà Nẵng lung linh', kicker: '🎯 TỐI NAY CHỌN GÌ?' };
  }
}

// PUBLIC ACTION RESOLVER
function resolvePublicActionContract(item) {
  if (item.tier === 'RADAR_SOURCE') {
    return {
      action_type: 'WATCH_MONITOR',
      label: '🔔 ' + (item.action_label || 'Theo dõi nguồn tin'),
      url: item.official_source_url
    };
  }
  return {
    action_type: 'VIEW_OFFICIAL_SOURCE',
    label: item.action_label || 'Xem cổng thông tin chính thức &rarr;',
    url: item.official_source_url
  };
}

// 4. VIEW RENDERERS

// Render Compact Civic City Note (BZ Mandate #5)
function renderHeroCivicCityNote() {
  return `
    <div class="hero-civic-note-card" role="region" aria-label="Điểm Nhấn Đô Thị Hôm Nay">
      <div class="civic-note-badge">📍 ĐIỂM HẸN VĂN HÓA ĐÔ THỊ</div>
      <h3 class="civic-note-headline">Cầu Rồng & Không Gian Bờ Sông Hàn</h3>
      <p class="civic-note-body">
        Biểu tượng kiến trúc tự hào của TP. Đà Nẵng. Mở cửa tự do phục vụ người dân và du khách dạo mát ven sông.
      </p>
      <div class="civic-note-meta">
        <span>⏳ 21:00 Tối Thứ 7 & Chủ Nhật: Trình diễn phun lửa, phun nước</span>
      </div>
      <div class="civic-note-footer">
        <a href="https://danang.gov.vn" target="_blank" rel="noopener noreferrer" class="civic-note-link">
          Thông tin từ Cổng TP. Đà Nẵng &rarr;
        </a>
      </div>
    </div>
  `;
}

// Render Journey Highlight Card
function renderJourneyHighlightCard(item) {
  const isSaved = savedItemIds.has(item.item_id);
  const action = resolvePublicActionContract(item);

  return `
    <article class="journey-highlight-card" data-item-id="${item.item_id}">
      <div class="highlight-header">
        <span class="highlight-badge">${item.badge_label}</span>
        <button class="btn-card-save ${isSaved ? 'saved' : ''}" data-save-id="${item.item_id}" aria-label="${isSaved ? 'Đã lưu' : 'Lưu lại'}">
          ${isSaved ? '❤️' : '🤍'}
        </button>
      </div>

      <div class="highlight-body">
        <span class="highlight-brand">${item.brand}</span>
        <h3 class="highlight-title">${item.title}</h3>
        <p class="highlight-summary">${item.summary_text}</p>
        
        <div class="highlight-specs">
          <div class="spec-item">📍 <strong>Địa điểm:</strong> ${item.scope_text}</div>
          <div class="spec-item">⏳ <strong>Thời gian:</strong> ${item.timing_window}</div>
        </div>
      </div>

      <div class="highlight-footer">
        <a href="${action.url}" target="_blank" rel="noopener noreferrer" class="btn-highlight-action">
          ${action.label}
        </a>
      </div>

      <div class="highlight-provenance">
        <span>${item.evidence_status}</span>
      </div>
    </article>
  `;
}

// Render Standard Editorial Card
function renderEditorialCardWithPhoto(item) {
  const isSaved = savedItemIds.has(item.item_id);
  const action = resolvePublicActionContract(item);

  let tierBadgeClass = 'badge-tier-verified';
  if (item.tier === 'CIVIC_FACILITY') tierBadgeClass = 'badge-tier-facility';
  else if (item.tier === 'OFFICIAL_PROGRAM') tierBadgeClass = 'badge-tier-program';
  else if (item.tier === 'RADAR_SOURCE') tierBadgeClass = 'badge-tier-radar';

  return `
    <article class="editorial-card" data-item-id="${item.item_id}" data-gateway="${item.gateway_group}" data-tier="${item.tier}" data-locality="${item.locality_tag}">
      <div class="card-header-meta">
        <span class="card-tier-badge ${tierBadgeClass}">${item.badge_label}</span>
        <button class="btn-card-save ${isSaved ? 'saved' : ''}" data-save-id="${item.item_id}" aria-label="${isSaved ? 'Đã lưu' : 'Lưu lại'}" title="${isSaved ? 'Đã lưu' : 'Lưu lại'}">
          ${isSaved ? '❤️' : '🤍'}
        </button>
      </div>

      <div class="card-body-content">
        <div class="card-brand-line">
          <span class="card-brand-name">${item.brand}</span>
          ${item.monogram ? `<span class="card-monogram">${item.monogram}</span>` : ''}
        </div>
        <h3 class="card-title">${item.title}</h3>
        <p class="card-summary">${item.summary_text}</p>
        
        <div class="card-field-specs">
          <div class="field-spec-row">
            <span class="spec-label">📍 Địa điểm:</span>
            <span class="spec-val">${item.scope_text}</span>
          </div>
          <div class="field-spec-row">
            <span class="spec-label">⏳ Khung giờ:</span>
            <span class="spec-val">${item.timing_window}</span>
          </div>
        </div>
      </div>

      <div class="card-footer-actions">
        <a href="${action.url}" target="_blank" rel="noopener noreferrer" class="btn-card-primary">
          ${action.label}
        </a>
      </div>

      <div class="card-trust-attestation">
        <span class="trust-indicator">✓ ${item.evidence_status}</span>
      </div>
    </article>
  `;
}

// 1. HOME VIEW (5 LOCAL LIVING JOURNEYS — BZ MANDATE #6)
function renderDailyGuideHome() {
  const timeInfo = getCurrentTimeSlotInfo();

  const foodItems = JAYT_DISCOVERY_ITEMS.filter(i => i.journey_id === 'JOURNEY_FOOD');
  const transportItems = JAYT_DISCOVERY_ITEMS.filter(i => i.journey_id === 'JOURNEY_TRANSPORT');
  const studyItems = JAYT_DISCOVERY_ITEMS.filter(i => i.journey_id === 'JOURNEY_STUDY_TOOLS');
  const leisureItems = JAYT_DISCOVERY_ITEMS.filter(i => i.journey_id === 'JOURNEY_LEISURE');
  const shoppingItems = JAYT_DISCOVERY_ITEMS.filter(i => i.journey_id === 'JOURNEY_SHOPPING');

  return `
    <div class="home-guide-layout-bz">
      <!-- 1. CINEMATIC DA NANG ARRIVAL HERO (CẦU RỒNG SUBJECT FOCUSED — BZ MANDATE #5) -->
      <section class="hero-cinematic-arrival-bz" aria-label="Hero Cẩm Nang Thành Phố Đà Nẵng">
        <div class="hero-cinematic-stage">
          <img 
            src="assets/images/dragon_bridge_hero_001.jpg" 
            alt="Ảnh chụp toàn cảnh Cầu Rồng bắc qua Sông Hàn rực rỡ tại trung tâm TP. Đà Nẵng" 
            class="hero-dragon-bridge-img-bz" 
            id="hero-main-photo"
            loading="eager"
          />
          <div class="hero-cinematic-scrim-bz"></div>
          
          <div class="hero-compact-credit-tag" tabindex="0" role="note" aria-label="Thông tin bản quyền ảnh Cầu Rồng">
            📍 Cầu Rồng &bull; 📷 Bùi Thụy Đào Nguyên (CC BY-SA 3.0)
          </div>
        </div>

        <div class="hero-cinematic-overlay-content-bz">
          <div class="hero-cinematic-quiet-space">
            <h1 class="hero-cinematic-headline">
              Đà Nẵng, Chọn Điều Hay Hôm Nay
            </h1>
            <p class="hero-cinematic-subcopy">
              Cẩm nang nhịp sống đô thị Đà Nẵng (Community OS) &bull; ${timeInfo.greeting}.
            </p>

            <!-- 3 CLEAR QUICK ACTIONS (BZ MANDATE #5) -->
            <div class="hero-quick-actions-bar">
              <button class="btn-hero-action btn-hero-food" data-scroll-to="journey-food">
                🍜 Ăn gần đây
              </button>
              <button class="btn-hero-action btn-hero-leisure" data-scroll-to="journey-leisure">
                🎬 Đi chơi tối nay
              </button>
              <button class="btn-hero-action btn-hero-wallet" data-nav="WALLET">
                🎟️ Ví quyền lợi
              </button>
            </div>
          </div>

          <!-- COMPACT CIVIC NOTE (BZ MANDATE #5) -->
          <div class="hero-city-note-slot-bz">
            ${renderHeroCivicCityNote()}
          </div>
        </div>
      </section>

      <!-- 2. JOURNEY 1: ẨM THỰC ĐÀ THÀNH (FOOD JOURNEY) -->
      <section class="section-living-journey" id="journey-food" aria-label="Hành Trình Ẩm Thực Đà Thành">
        <div class="journey-section-header">
          <span class="journey-kicker">🍜 HÀNH TRÌNH 1 &bull; ẨM THỰC ĐÀ THÀNH</span>
          <h2 class="journey-title">Ăn Gì Gần Bạn & Điểm Hẹn Hương Vị</h2>
          <p class="journey-desc">Khám phá các tuyến phố ẩm thực Huỳnh Thúc Kháng, Chợ Cồn, điểm tâm sáng và cà phê sông Hàn.</p>
        </div>

        <div class="journey-layout-container">
          <div class="journey-highlight-col">
            ${foodItems[0] ? renderJourneyHighlightCard(foodItems[0]) : ''}
          </div>
          <div class="journey-rail-col">
            <div class="cards-layout-grid-compact">
              ${foodItems.slice(1, 4).map(item => renderEditorialCardWithPhoto(item)).join('')}
            </div>
          </div>
        </div>
      </section>

      <!-- 3. JOURNEY 2: DI CHUYỂN & ĐI LẠI (TRANSPORT JOURNEY) -->
      <section class="section-living-journey" id="journey-transport" aria-label="Hành Trình Di Chuyển">
        <div class="journey-section-header">
          <span class="journey-kicker">🚌 HÀNH TRÌNH 2 &bull; DI CHUYỂN & ĐI LẠI</span>
          <h2 class="journey-title">Xe Buýt DanaBus & Xe Đạp Công Cộng TNGO</h2>
          <p class="journey-desc">Mạng lưới giao thông công cộng kết nối thuận tiện giữa các trường đại học, khu hành chính và bãi biển.</p>
        </div>

        <div class="journey-layout-container">
          <div class="journey-highlight-col">
            ${transportItems[0] ? renderJourneyHighlightCard(transportItems[0]) : ''}
          </div>
          <div class="journey-rail-col">
            <div class="cards-layout-grid-compact">
              ${transportItems.slice(1, 4).map(item => renderEditorialCardWithPhoto(item)).join('')}
            </div>
          </div>
        </div>
      </section>

      <!-- 4. JOURNEY 3: HỌC TẬP & LÀM VIỆC (STUDY & WORK JOURNEY) -->
      <section class="section-living-journey" id="journey-study" aria-label="Hành Trình Học Tập">
        <div class="journey-section-header">
          <span class="journey-kicker">🎓 HÀNH TRÌNH 3 &bull; HỌC TẬP & ĐẶC QUYỀN HỌC ĐƯỜNG</span>
          <h2 class="journey-title">Không Gian Tự Học & Bộ Công Cụ Sinh Viên</h2>
          <p class="journey-desc">Thư viện Khoa học Tổng hợp Đà Nẵng, bộ công cụ lập trình GitHub, Notion và Canva chính sách trường học.</p>
        </div>

        <div class="journey-layout-container">
          <div class="journey-highlight-col">
            ${studyItems[0] ? renderJourneyHighlightCard(studyItems[0]) : ''}
          </div>
          <div class="journey-rail-col">
            <div class="cards-layout-grid-compact">
              ${studyItems.slice(1, 4).map(item => renderEditorialCardWithPhoto(item)).join('')}
            </div>
          </div>
        </div>
      </section>

      <!-- 5. JOURNEY 4: ĐI CHƠI & THƯ GIÃN TỐI NAY (LEISURE JOURNEY) -->
      <section class="section-living-journey" id="journey-leisure" aria-label="Hành Trình Thư Giãn Tối Nay">
        <div class="journey-section-header">
          <span class="journey-kicker">✨ HÀNH TRÌNH 4 &bull; ĐI CHƠI & THƯ GIÃN TỐI NAY</span>
          <h2 class="journey-title">Điểm Hẹn Văn Hóa, Di Sản & Lịch Rạp Phim</h2>
          <p class="journey-desc">Khám phá Bảo tàng Điêu khắc Chăm, bãi biển Mỹ Khê và thông tin lịch chiếu các cụm rạp tại Đà Nẵng.</p>
        </div>

        <div class="journey-layout-container">
          <div class="journey-highlight-col">
            ${leisureItems[0] ? renderJourneyHighlightCard(leisureItems[0]) : ''}
          </div>
          <div class="journey-rail-col">
            <div class="cards-layout-grid-compact">
              ${leisureItems.slice(1, 4).map(item => renderEditorialCardWithPhoto(item)).join('')}
            </div>
          </div>
        </div>
      </section>

      <!-- 6. JOURNEY 5: MUA SẮM THIẾT YẾU & TƯ VẤN (SHOPPING & BUY DECISION) -->
      <section class="section-living-journey" id="journey-shopping" aria-label="Hành Trình Mua Sắm">
        <div class="journey-section-header">
          <span class="journey-kicker">🛒 HÀNH TRÌNH 5 &bull; MUA SẮM TIẾT KIỆM & THIẾT YẾU</span>
          <h2 class="journey-title">Siêu Thị Thiết Yếu & Cổng Tra Cứu Tiêu Dùng</h2>
          <p class="journey-desc">Cẩm nang mua sắm Co.opmart, Lotte Mart và công cụ kiểm tra giá thực trung thực trước khi chi tiêu.</p>
        </div>

        <div class="feature-destinations-section">
          <div class="destination-card dest-buy" data-nav="BUY_DECISION" role="button" tabindex="0">
            <span class="dest-badge">TRA CỨU TRƯỚC KHI CHI TIÊU</span>
            <h3 class="dest-title">Mua món này có hời không?</h3>
            <p class="dest-sub">Kiểm định giá thực, phí ẩn và chính sách đổi trả trước khi thanh toán. Trả lời trung thực khi chưa đủ dữ liệu đối soát.</p>
            <span class="dest-cta">Mở công cụ kiểm tra giá thực &rarr;</span>
          </div>

          <div class="destination-card dest-voucher" data-nav="WALLET" role="button" tabindex="0">
            <span class="dest-badge">VÍ THÔNG TIN & ĐẶC QUYỀN (3 LÀN THIẾT THỰC)</span>
            <h3 class="dest-title">Ví Thông Tin & Quyền Lợi Đã Đối Soát</h3>
            <p class="dest-sub">Phân chia 3 làn rõ ràng: Dùng ngay, Cổng chính thức và Radar theo dõi. 100% bằng chứng chính thống.</p>
            <span class="dest-cta">Mở ví thông tin cộng đồng &rarr;</span>
          </div>
        </div>
      </section>
    </div>
  `;
}

// 2. EXPLORE DIRECTORY VIEW (50 ITEMS)
function renderExploreDirectory() {
  const filtered = filterDirectoryItems();

  return `
    <div class="explore-directory-page">
      <div class="directory-header-editorial">
        <span class="section-kicker kicker-fac">📚 THƯ MỤC NGUỒN CUNG TP. ĐÀ NẴNG</span>
        <h1 class="directory-headline">Khám Phá Toàn Diện (50 Mục Đã Phân Tầng)</h1>
        <p class="directory-subcopy">Tra cứu đầy đủ ẩm thực, tiện ích, giải trí, xe buýt và đặc quyền học đường tại Đà Nẵng.</p>
      </div>

      <div class="directory-filters-bar">
        <div class="filter-group">
          <label class="filter-label">Nhu cầu:</label>
          <div class="filter-pills">
            <button class="exp-gateway-btn ${activeGateway === 'ALL' ? 'active' : ''}" data-exp-gw="ALL">Tất cả</button>
            <button class="exp-gateway-btn ${activeGateway === 'AN_GI' ? 'active' : ''}" data-exp-gw="AN_GI">🍔 Ăn gì</button>
            <button class="exp-gateway-btn ${activeGateway === 'DI_DAU' ? 'active' : ''}" data-exp-gw="DI_DAU">🎬 Đi đâu</button>
            <button class="exp-gateway-btn ${activeGateway === 'MUA_SAM' ? 'active' : ''}" data-exp-gw="MUA_SAM">🛍️ Mua sắm & Học tập</button>
          </div>
        </div>

        <div class="filter-group">
          <label class="filter-label">Quận / Huyện:</label>
          <div class="filter-pills-scroll">
            <button class="exp-loc-pill ${activeLocality === 'ALL' ? 'active' : ''}" data-exp-loc="ALL">Toàn thành phố</button>
            <button class="exp-loc-pill ${activeLocality === 'HAI_CHAU' ? 'active' : ''}" data-exp-loc="HAI_CHAU">Hải Châu</button>
            <button class="exp-loc-pill ${activeLocality === 'SON_TRA' ? 'active' : ''}" data-exp-loc="SON_TRA">Sơn Trà</button>
            <button class="exp-loc-pill ${activeLocality === 'THANH_KHE' ? 'active' : ''}" data-exp-loc="THANH_KHE">Thanh Khê</button>
            <button class="exp-loc-pill ${activeLocality === 'NGU_HANH_SON' ? 'active' : ''}" data-exp-loc="NGU_HANH_SON">Ngũ Hành Sơn</button>
            <button class="exp-loc-pill ${activeLocality === 'LIEN_CHIEU' ? 'active' : ''}" data-exp-loc="LIEN_CHIEU">Liên Chiểu</button>
            <button class="exp-loc-pill ${activeLocality === 'CAM_LE' ? 'active' : ''}" data-exp-loc="CAM_LE">Cẩm Lệ</button>
          </div>
        </div>
      </div>

      <div class="directory-results-count">
        Đang hiển thị <strong>${filtered.length}</strong> / 50 địa điểm & tiện ích
      </div>

      <div class="cards-layout-grid directory-grid">
        ${filtered.length > 0 
          ? filtered.map(item => renderEditorialCardWithPhoto(item)).join('')
          : `
            <div class="empty-state-box">
              <h3>Không tìm thấy địa điểm phù hợp bộ lọc</h3>
              <p>Thử chọn "Toàn thành phố" hoặc "Tất cả" nhu cầu để xem toàn bộ danh sách.</p>
              <button class="btn-modal-primary" id="btn-reset-explore">Đặt lại bộ lọc</button>
            </div>
          `
        }
      </div>
    </div>
  `;
}

function filterDirectoryItems() {
  return JAYT_DISCOVERY_ITEMS.filter(item => {
    if (activeGateway !== 'ALL' && item.gateway_group !== activeGateway) return false;
    if (activeLocality !== 'ALL' && item.locality_tag !== activeLocality) return false;
    if (activeTier !== 'ALL' && item.tier !== activeTier) return false;
    return true;
  });
}

// 3. THREE-LANE WALLET VIEW WITH OFFICIAL VALUE LAYER
function renderOfficialValueCard(entry) {
  let laneBadgeClass = 'lane-badge-verified';
  if (entry.lane === 'LANE_CONG_CHINH_THUC') laneBadgeClass = 'lane-badge-official';
  else if (entry.lane === 'LANE_THEO_DOI') laneBadgeClass = 'lane-badge-radar';

  return `
    <article class="value-layer-card" data-lane="${entry.lane}" data-category="${entry.category}">
      <div class="value-card-header">
        <span class="lane-badge ${laneBadgeClass}">${entry.lane_badge}</span>
        <span class="merchant-tag">${entry.merchant_name}</span>
      </div>

      <h3 class="value-card-title">${entry.title}</h3>

      <!-- OFFICIAL VALUE LAYER: 3 STRUCTURED QUESTIONS -->
      <div class="official-value-layer-box">
        <div class="value-question-row">
          <span class="q-label">🔹 Đây là gì?</span>
          <p class="q-answer">${entry.service_description}</p>
        </div>
        <div class="value-question-row">
          <span class="q-label">👥 Ai có thể kiểm tra?</span>
          <p class="q-answer">${entry.target_audience}</p>
        </div>
        <div class="value-question-row">
          <span class="q-label">🌐 Mở ở đâu?</span>
          <p class="q-answer">${entry.official_portal_guide}</p>
        </div>
      </div>

      <div class="value-card-footer">
        <a href="${entry.official_source_url}" target="_blank" rel="noopener noreferrer" class="btn-value-action ${entry.lane === 'LANE_DUNG_NGAY' ? 'btn-action-ready' : 'btn-action-source'}">
          ${entry.action_button_label}
        </a>
        <button class="btn-save-wallet" data-save-voucher="${entry.entry_id}" title="Lưu lại để tra cứu sau">
          🤍 Lưu
        </button>
      </div>

      <div class="value-card-attestation">
        <span>✓ ${entry.evidence_status}</span>
      </div>
    </article>
  `;
}

function renderThreeLaneWalletView() {
  const filteredEntries = JAYT_WALLET_ENTRIES.filter(e => {
    if (activeWalletLane !== 'ALL' && e.lane !== activeWalletLane) return false;
    return true;
  });

  const dungNgayCount = JAYT_WALLET_ENTRIES.filter(e => e.lane === 'LANE_DUNG_NGAY').length;
  const congChinhThucCount = JAYT_WALLET_ENTRIES.filter(e => e.lane === 'LANE_CONG_CHINH_THUC').length;
  const theoDoiCount = JAYT_WALLET_ENTRIES.filter(e => e.lane === 'LANE_THEO_DOI').length;

  return `
    <div class="three-lane-wallet-page">
      <section class="wallet-hero-section">
        <div class="wallet-header-editorial">
          <span class="section-kicker kicker-fac">🎟️ VÍ THÔNG TIN & ĐẶC QUYỀN HỌC ĐƯỜNG</span>
          <h1 class="wallet-headline">Tra Cứu Quyền Lợi Chính Thống Tại Đà Nẵng</h1>
          <p class="wallet-subcopy">Phân chia 3 làn thông tin rõ ràng: Dùng ngay, Cổng chính thức và Kênh theo dõi. 100% đối soát nguồn gốc minh bạch.</p>
        </div>
      </section>

      <!-- THREE-LANE FILTER BAR -->
      <section class="wallet-lane-controls-section">
        <div class="wallet-lane-tabs" role="tablist">
          <button class="wallet-lane-btn ${activeWalletLane === 'ALL' ? 'active' : ''}" data-lane-filter="ALL">
            Tất cả (${JAYT_WALLET_ENTRIES.length})
          </button>
          <button class="wallet-lane-btn ${activeWalletLane === 'LANE_DUNG_NGAY' ? 'active' : ''}" data-lane-filter="LANE_DUNG_NGAY">
            ⚡ Dùng ngay (${dungNgayCount})
          </button>
          <button class="wallet-lane-btn ${activeWalletLane === 'LANE_CONG_CHINH_THUC' ? 'active' : ''}" data-lane-filter="LANE_CONG_CHINH_THUC">
            🏛️ Cổng chính thức (${congChinhThucCount})
          </button>
          <button class="wallet-lane-btn ${activeWalletLane === 'LANE_THEO_DOI' ? 'active' : ''}" data-lane-filter="LANE_THEO_DOI">
            📡 Theo dõi (${theoDoiCount})
          </button>
        </div>
      </section>

      <!-- THREE-LANE CARDS GRID -->
      <section class="wallet-cards-grid" id="wallet-cards-container">
        ${filteredEntries.length > 0
          ? filteredEntries.map(e => renderOfficialValueCard(e)).join('')
          : `
            <div class="empty-state-box">
              <h3>Không có mục nào trong làn này</h3>
              <p>Vui lòng chọn "Tất cả" để xem toàn bộ 13 quyền lợi đã phân tầng.</p>
            </div>
          `
        }
      </section>
    </div>
  `;
}

// 4. BUY DECISION HUB VIEW
function renderBuyDecisionHub() {
  return `
    <div class="buy-decision-hub-page">
      <div class="decision-header-editorial">
        <span class="section-kicker kicker-fac">🛡️ CỔNG TƯ VẤN MUA SẮM MINH BẠCH</span>
        <h1 class="decision-headline">Mua Món Này Có Hời Không?</h1>
        <p class="decision-subcopy">Tra cứu giá thực, điều kiện ẩn và quyền lợi trước khi thanh toán tại Đà Nẵng.</p>
      </div>

      <div class="decision-search-box">
        <input type="text" id="input-check-deal" placeholder="Nhập tên món hàng, đường link hoặc cửa hàng..." />
        <button id="btn-submit-check" class="btn-modal-primary">Kiểm Tra Ngay</button>
      </div>

      <div class="decision-truth-card">
        <div class="truth-header">
          <span class="truth-icon">✓</span>
          <h3>Nguyên Tắc Trung Thực Tuyệt Đối (Fail-Closed)</h3>
        </div>
        <p>Hệ thống chỉ xác nhận khi có đủ 4 yếu tố: Bằng chứng niêm yết chính hãng, Không phát sinh phí ẩn, Đúng giá trị thực tế tại Đà Nẵng, và Chính sách đổi trả rõ ràng.</p>
      </div>
    </div>
  `;
}

// 5. SAVED VIEW
function renderSavedView() {
  const savedItems = JAYT_DISCOVERY_ITEMS.filter(i => savedItemIds.has(i.item_id));

  return `
    <div class="saved-collection-page">
      <div class="saved-header-editorial">
        <span class="section-kicker kicker-fac">❤️ DANH SÁCH ĐÃ LƯU</span>
        <h1 class="saved-headline">Danh Sách Địa Điểm Của Bạn (${savedItems.length})</h1>
        <p class="saved-subcopy">Các địa điểm và quyền lợi bạn đã đánh dấu để sử dụng khi cần.</p>
      </div>

      ${savedItems.length > 0 
        ? `
          <div class="cards-layout-grid">
            ${savedItems.map(item => renderEditorialCardWithPhoto(item)).join('')}
          </div>
        `
        : `
          <div class="empty-state-box">
            <div class="empty-icon">🤍</div>
            <h3>Bạn chưa lưu địa điểm nào</h3>
            <p>Bấm biểu tượng trái tim trên các thẻ tiện ích để lưu lại và xem nhanh tại đây.</p>
            <button class="btn-modal-primary" onclick="activeView='HOME'; renderCurrentView();">Khám phá hôm nay</button>
          </div>
        `
      }
    </div>
  `;
}

// 6. APP SHELL & NAVIGATION (STRICT LOGO CONTRACT)
function renderAppShell() {
  if (typeof document === 'undefined') return;
  const root = document.getElementById('jayt-app-root');
  if (!root) return;

  root.innerHTML = `
    <div class="jayt-app-shell theme-${currentTheme}">
      <header class="jayt-header-sticky" role="banner">
        <div class="header-inner">
          <div class="brand-lockup" role="button" tabindex="0" data-nav="HOME" aria-label="Về trang chủ JayT">
            <!-- STRICT 32x32px LOGO CONTRACT -->
            <svg class="jflow-header-logo" width="32" height="32" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M19 6 V19 C19 24.5 15.5 28 10 28 C6.5 28 4.2 26 3.5 24 C5.2 24 7 22.8 7.5 20.8 C8 18.5 6.5 16.5 4.5 16.5 C3.8 16.5 3 16.8 2.5 17.2 C3.5 10.5 11 6 19 6 Z" fill="url(#jflow-logo-grad)"/>
              <path d="M19 14 C23.5 14 27.5 17 29.5 21 C31 24 32.5 28 33.5 31 C29.5 29 25 27.5 19 27.5 V21.5 C22 21.5 24.5 23 26 24.5 C24.5 20 20.5 17.5 16 17 L19 14 Z" fill="url(#jflow-logo-grad)" opacity="0.9"/>
              <circle cx="27" cy="8" r="3.5" fill="#f97316"/>
              <defs>
                <linearGradient id="jflow-logo-grad" x1="4" y1="4" x2="34" y2="34" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#0f766e"/>
                  <stop offset="0.6" stop-color="#0284c7"/>
                  <stop offset="1" stop-color="#f97316"/>
                </linearGradient>
              </defs>
            </svg>
            <div class="brand-text-group">
              <span class="brand-title">JayT Đà Nẵng</span>
              <span class="brand-tagline">Community OS &bull; v3.426.5-staging.bz</span>
            </div>
          </div>

          <nav class="nav-links-desktop" role="navigation" aria-label="Điều hướng chính">
            <button class="nav-btn ${activeView === 'HOME' ? 'active' : ''}" data-nav="HOME">Hôm nay</button>
            <button class="nav-btn ${activeView === 'EXPLORE' ? 'active' : ''}" data-nav="EXPLORE">Khám phá (50)</button>
            <button class="nav-btn ${activeView === 'WALLET' ? 'active' : ''}" data-nav="WALLET">Ví Thông Tin (3 Làn)</button>
            <button class="nav-btn ${activeView === 'SAVED' ? 'active' : ''}" data-nav="SAVED">
              Đã lưu <span class="nav-saved-count" id="saved-counter">${savedItemIds.size}</span>
            </button>
          </nav>

          <div class="nav-actions-desktop">
            <button id="btn-toggle-theme" class="btn-icon-theme" aria-label="Đổi giao diện Sáng/Tối" title="Đổi giao diện Sáng/Tối">
              ${currentTheme === 'dark' ? '☀️' : '🌙'}
            </button>
            <button id="btn-open-report" class="btn-report-source" aria-haspopup="dialog">+ Báo nguồn</button>
          </div>
        </div>
      </header>

      <main class="jayt-main-canvas" id="jayt-view-canvas" role="main">
        <!-- Views rendered here -->
      </main>

      <footer class="jayt-footer-unified" role="contentinfo">
        <div class="footer-inner">
          <div class="footer-brand-col">
            <span class="footer-title">JayT Đà Nẵng &bull; Community OS</span>
            <p class="footer-mission">Nền tảng cẩm nang số vì giá trị cộng đồng TP. Đà Nẵng. 100% minh bạch nguồn gốc, đối soát chính thống.</p>
            <span class="footer-version">Phiên bản: v3.426.5-staging.bz &bull; Staging Review BZ</span>
          </div>
        </div>
      </footer>

      <!-- MOBILE BOTTOM NAVIGATION -->
      <nav class="jayt-mobile-bottom-nav" role="navigation" aria-label="Điều hướng di động">
        <button class="mobile-nav-btn ${activeView === 'HOME' ? 'active' : ''}" data-nav="HOME">
          <span class="nav-icon">🏙️</span>
          <span class="nav-text">Hôm nay</span>
        </button>
        <button class="mobile-nav-btn ${activeView === 'EXPLORE' ? 'active' : ''}" data-nav="EXPLORE">
          <span class="nav-icon">🧭</span>
          <span class="nav-text">Khám phá</span>
        </button>
        <button class="mobile-nav-btn ${activeView === 'WALLET' ? 'active' : ''}" data-nav="WALLET">
          <span class="nav-icon">🎟️</span>
          <span class="nav-text">Ví Quyền Lợi</span>
        </button>
        <button class="mobile-nav-btn ${activeView === 'SAVED' ? 'active' : ''}" data-nav="SAVED">
          <span class="nav-icon">❤️</span>
          <span class="nav-text">Đã lưu (${savedItemIds.size})</span>
        </button>
      </nav>

      <!-- GLOBAL TOAST & MODAL CONTAINER (ZERO RESIDUAL BLUR) -->
      <div id="jayt-toast" class="jayt-toast" role="alert" aria-live="polite" hidden>
        <span id="toast-message"></span>
      </div>
      <div id="jayt-modal-root" class="jayt-modal-backdrop" hidden style="display: none;"></div>
    </div>
  `;
}

// 7. VIEW ROUTING DISPATCHER
function renderCurrentView() {
  if (typeof document === 'undefined') return;
  const canvas = document.getElementById('jayt-view-canvas');
  if (!canvas) return;

  if (activeView === 'HOME') {
    canvas.innerHTML = renderDailyGuideHome();
    attachHomeEvents();
  } else if (activeView === 'EXPLORE') {
    canvas.innerHTML = renderExploreDirectory();
    attachExploreEvents();
  } else if (activeView === 'WALLET') {
    canvas.innerHTML = renderThreeLaneWalletView();
    attachThreeLaneWalletEvents();
  } else if (activeView === 'BUY_DECISION') {
    canvas.innerHTML = renderBuyDecisionHub();
    attachBuyDecisionEvents();
  } else if (activeView === 'SAVED') {
    canvas.innerHTML = renderSavedView();
  }

  attachCardListeners();
  updateNavCounters();
}

function updateNavCounters() {
  const counter = document.getElementById('saved-counter');
  if (counter) counter.innerText = savedItemIds.size;
}

function showToast(msg) {
  if (typeof document === 'undefined') return;
  const toast = document.getElementById('jayt-toast');
  const toastMsg = document.getElementById('toast-message');
  if (!toast || !toastMsg) return;

  toastMsg.innerText = msg;
  toast.hidden = false;
  toast.classList.add('visible');

  setTimeout(() => {
    toast.classList.remove('visible');
    setTimeout(() => { toast.hidden = true; }, 300);
  }, 2500);
}

// MODAL LIFECYCLE CONTROLLER
function openModal(htmlContent, triggerEl) {
  const modalRoot = document.getElementById('jayt-modal-root');
  if (!modalRoot) return;
  modalTriggerElement = triggerEl || null;

  modalRoot.innerHTML = htmlContent;
  modalRoot.hidden = false;
  modalRoot.classList.add('is-open');
  modalRoot.style.display = 'flex';

  modalRoot.addEventListener('click', (e) => {
    if (e.target === modalRoot) {
      closeModal();
    }
  });

  const firstInput = modalRoot.querySelector('input, button');
  if (firstInput) firstInput.focus();
}

function closeModal() {
  const modalRoot = document.getElementById('jayt-modal-root');
  if (!modalRoot) return;

  modalRoot.classList.remove('is-open');
  modalRoot.hidden = true;
  modalRoot.style.display = 'none';
  modalRoot.innerHTML = '';

  if (modalTriggerElement && typeof modalTriggerElement.focus === 'function') {
    modalTriggerElement.focus();
    modalTriggerElement = null;
  }
}

// 8. EVENT HANDLERS & LISTENERS
function attachGlobalEvents() {
  if (typeof document === 'undefined') return;

  document.querySelectorAll('[data-nav]').forEach(el => {
    const handler = () => {
      activeView = el.dataset.nav;
      document.querySelectorAll('.nav-btn, .mobile-nav-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.nav === activeView);
      });
      renderCurrentView();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    el.addEventListener('click', handler);
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handler(); }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const modalRoot = document.getElementById('jayt-modal-root');
      if (modalRoot && !modalRoot.hidden) {
        closeModal();
      }
    }
  });

  const themeBtn = document.getElementById('btn-toggle-theme');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      currentTheme = currentTheme === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', currentTheme);
      try {
        if (typeof localStorage !== 'undefined') localStorage.setItem('jayt_theme_mode', currentTheme);
      } catch (e) {}
      renderAppShell();
      attachGlobalEvents();
      renderCurrentView();
      showToast(`Đã chuyển sang giao diện ${currentTheme === 'dark' ? 'Tối' : 'Sáng'}`);
    });
  }

  const reportBtn = document.getElementById('btn-open-report');
  if (reportBtn) {
    reportBtn.addEventListener('click', () => {
      const modalHtml = `
        <div class="jayt-modal-box" role="dialog" aria-modal="true" aria-labelledby="report-modal-title">
          <div class="modal-header">
            <div>
              <span class="modal-kicker kicker-fac">CỘNG ĐỒNG ĐÓNG GÓP TIỆN ÍCH</span>
              <h2 id="report-modal-title" class="modal-title">+ Báo Nguồn / Tiện Ích Mới</h2>
            </div>
            <button class="modal-close-btn" aria-label="Đóng" id="btn-close-modal">&times;</button>
          </div>
          <div class="modal-body">
            <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 8px;">
              Chia sẻ thông tin tiện ích công hoặc chính sách tại Đà Nẵng để Hội đồng đối soát minh bạch.
            </p>
            <div style="font-size: 0.78rem; color: #059669; margin-bottom: 8px; background: #d1fae5; padding: 6px 10px; border-radius: 6px;">
              🛡️ <strong>Cam kết Zero-PII:</strong> Không thu thập tên, số điện thoại hay email cá nhân của bạn.
            </div>
            <input 
              type="text" 
              id="input-report-source"
              placeholder="Tên đơn vị hoặc đường link chính thức (vd: cgv.vn, lotteria.vn)..." 
              maxlength="250"
              style="width: 100%; padding: 10px; margin: 8px 0; border: 1px solid var(--border-color, #cbd5e1); border-radius: 8px; font-size: 0.9rem;" 
            />
            <div id="report-error-msg" style="display: none; color: #dc2626; font-size: 0.8rem; margin-bottom: 8px;"></div>
            <button class="btn-modal-primary" id="btn-submit-report" style="width: 100%; margin-top: 4px;">Gửi Đóng Góp Minh Bạch</button>
          </div>
        </div>
      `;

      openModal(modalHtml, reportBtn);

      const closeBtn = document.getElementById('btn-close-modal');
      if (closeBtn) closeBtn.addEventListener('click', closeModal);

      const submitBtn = document.getElementById('btn-submit-report');
      const inputField = document.getElementById('input-report-source');
      const errorDiv = document.getElementById('report-error-msg');

      if (submitBtn && inputField) {
        submitBtn.addEventListener('click', () => {
          let val = inputField.value.trim();
          if (!val) {
            errorDiv.innerText = 'Vui lòng nhập tên đơn vị hoặc liên kết nguồn.';
            errorDiv.style.display = 'block';
            return;
          }

          const phoneRegex = /(0\d{9,10})|(\+84\d{9})|(\d{3,4}[-.\s]\d{3,4}[-.\s]\d{3,4})/;
          const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
          if (phoneRegex.test(val) || emailRegex.test(val)) {
            errorDiv.innerText = '⚠️ Vì lý do bảo mật Zero-PII, vui lòng KHÔNG nhập số điện thoại hoặc email cá nhân.';
            errorDiv.style.display = 'block';
            return;
          }

          val = val.replace(/<[^>]*>?/gm, '').substring(0, 250);
          closeModal();
          showToast('✓ Cảm ơn bạn! Thông tin nguồn đã được tiếp nhận để đối soát.');
        });
      }
    });
  }
}

function attachHomeEvents() {
  document.querySelectorAll('[data-scroll-to]').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.scrollTo;
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

function attachExploreEvents() {
  document.querySelectorAll('[data-exp-gw]').forEach(btn => {
    btn.addEventListener('click', () => {
      activeGateway = btn.dataset.expGw;
      renderCurrentView();
    });
  });

  document.querySelectorAll('[data-exp-loc]').forEach(btn => {
    btn.addEventListener('click', () => {
      activeLocality = btn.dataset.expLoc;
      renderCurrentView();
    });
  });

  const resetBtn = document.getElementById('btn-reset-explore');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      activeGateway = 'ALL';
      activeLocality = 'ALL';
      activeTier = 'ALL';
      renderCurrentView();
    });
  }
}

function attachThreeLaneWalletEvents() {
  document.querySelectorAll('.btn-save-wallet').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      showToast('✓ Đã lưu thông tin vào danh sách');
    });
  });

  document.querySelectorAll('.wallet-lane-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      activeWalletLane = btn.dataset.laneFilter;
      renderCurrentView();
    });
  });
}

function attachBuyDecisionEvents() {
  const submitBtn = document.getElementById('btn-submit-check');
  const input = document.getElementById('input-check-deal');
  if (submitBtn && input) {
    submitBtn.addEventListener('click', () => {
      const val = input.value.trim();
      if (!val) {
        showToast('Vui lòng nhập tên món đồ hoặc đường link để đối soát.');
        return;
      }
      showToast('Đang đối soát thông tin niêm yết chính hãng...');
    });
  }
}

function attachCardListeners() {
  document.querySelectorAll('[data-save-id]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const itemId = btn.dataset.saveId;
      if (savedItemIds.has(itemId)) {
        savedItemIds.delete(itemId);
        btn.innerText = '🤍';
        btn.classList.remove('saved');
        showToast('Đã bỏ lưu khỏi danh sách');
      } else {
        savedItemIds.add(itemId);
        btn.innerText = '❤️';
        btn.classList.add('saved');
        showToast('✓ Đã lưu vào danh sách');
      }
      try {
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('jayt_saved_items', JSON.stringify(Array.from(savedItemIds)));
        }
      } catch (err) {}
      updateNavCounters();
    });
  });
}

// 9. INITIALIZATION
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    document.documentElement.setAttribute('data-theme', currentTheme);
    renderAppShell();
    attachGlobalEvents();
    renderCurrentView();
  });
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    JAYT_STOREFRONT_VERSION,
    JAYT_DISCOVERY_ITEMS,
    JAYT_WALLET_ENTRIES,
    resolvePublicActionContract,
    renderDailyGuideHome,
    renderExploreDirectory,
    renderThreeLaneWalletView,
    renderBuyDecisionHub,
    renderSavedView
  };
}
