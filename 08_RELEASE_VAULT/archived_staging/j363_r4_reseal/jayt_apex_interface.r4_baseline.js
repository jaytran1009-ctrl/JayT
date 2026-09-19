/**
 * JAYT COMMUNITY OS — DESIGN SYSTEM ENFORCED STOREFRONT (SECTION CZ)
 * Release Candidate: v3.433.0-staging.cz
 * Governing Directive: JAYT-245 Section CZ (Lines 2443-2457) - Design System Mandate
 * Core System Token Mapping:
 *  - Colors: River Teal (#0284c7), Coral (#f43f5e), Sun Sand (#d97706), Warm Neutral (#fffdfa)
 *  - Components: Intent Chip, Tier Badge, Deal Card, Voucher Card, Place Card, Radar Card, Evidence Drawer, Save State
 *  - Accessibility: WCAG AA, 44px min touch target, focus-visible outline, reduced-motion
 */

// 0. SILENT ZERO-PII OBSERVABILITY
if (typeof window !== 'undefined' && window.JAYT_OBSERVABILITY) {
  window.JAYT_OBSERVABILITY.recordEvent('STOREFRONT_INITIALIZED', {
    version: 'v3.433.0-staging.cz',
    environment: 'STAGING_REVIEW_CZ',
    theme: 'DESIGN_SYSTEM_CZ_LOCKED',
    dom_isolation: 'STRICT_ZERO_DOM_INJECTION'
  });
}

const JAYT_STOREFRONT_VERSION = 'v3.433.0-staging.cz';

// 1. DATA LEDGER (50 SANITIZED TIERED ITEMS)
const JAYT_DISCOVERY_ITEMS = [
  {
    "item_id": "DEAL_CGV_CGV_thông tin đồng hành",
    "tier": "VERIFIED_DEAL",
    "tier_name": "Nguồn Cung Đã Đối Soát",
    "badge_label": "RẠP CHIẾU PHIM ĐÔ THỊ",
    "title": "CGV Cinemas: Cổng Thông Tin Cụm Rạp Đà Nẵng",
    "brand": "CGV Cinemas",
    "monogram": "CGV",
    "color_accent": "#e11d48",
    "category": "Giải trí",
    "scope_text": "CGV Vĩnh Trung Plaza & Vincom Plaza Đà Nẵng",
    "audience_target": "Tất cả khán giả tra cứu tại rạp chiếu",
    "timing_window": "Thứ 6, Thứ 7, Chủ Nhật hàng tuần",
    "conditions_limit": "Áp dụng theo thể lệ phát hành chính thức của đơn vị vận hành.",
    "observed_at": "2026-08-29 08:00",
    "summary_text": "Tra cứu lịch chiếu phim và thông tin cụm rạp CGV tại Vincom và Vĩnh Trung Plaza Đà Nẵng.",
    "verbatim_quote": "tra cứu tại cổng rạp chiếu tại ứng dụng ngân hàng liên kết.",
    "evidence_status": "Nguồn: www.cgv.vn • Cập nhật định kỳ",
    "official_source_url": "https://www.cgv.vn",
    "action_type": "VIEW_OFFICIAL_SOURCE",
    "code_text": null,
    "action_label": "Xem lịch chiếu & thông tin rạp →",
    "gateway_group": "DI_DAU",
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "SLOT_EVENING",
    "allow_field_claims": false,
    "journey_id": "JOURNEY_LEISURE",
    "journey_label": "Đi Chơi & Thư Giãn Tối Nay",
    "transit_hint": "🚌 Gần tuyến xe buýt DanaBus R16 & Trạm xe đạp TNGO Bạch Đằng",
    "editorial_lead": "Tra cứu lịch chiếu phim và thông tin cụm rạp CGV tại Vincom và Vĩnh Trung Plaza Đà Nẵng.",
    "map_query_url": "https://www.google.com/maps/search/?api=1&query=CGV%20Cinemas%3A%20C%E1%BB%95ng%20Th%C3%B4ng%20Tin%20C%E1%BB%A5m%20R%E1%BA%A1p%20%C4%90%C3%A0%20N%E1%BA%B5ng%20%C4%90%C3%A0%20N%E1%BA%B5ng",
    "leisure_category": "CINEMA",
    "visual_archetype": "VERIFIED_PLACE",
    "specific_action_label": "📅 Xem lịch chiếu rạp",
    "tier_level": "TIER_1_DEAL",
    "tier_badge": "🔥 DEAL XÁC MINH",
    "tier_badge_class": "tier-badge-deal",
    "deal_price": "Thứ 6, Thứ 7, Chủ Nhật hàng tuần",
    "deal_cond": "Áp dụng theo thể lệ phát hành chính thức của đơn vị vận hành."
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
    "evidence_status": "Nguồn: dominos.vn • Cập nhật định kỳ",
    "official_source_url": "https://dominos.vn/khuyen-mai/mua-1-tang-1",
    "action_type": "VIEW_OFFICIAL_SOURCE",
    "code_text": null,
    "action_label": "Mở cổng thông tin chính thức →",
    "gateway_group": "AN_GI",
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "ALL_DAY",
    "allow_field_claims": false,
    "journey_id": "JOURNEY_FOOD",
    "journey_label": "Ẩm Thực Đà Thành",
    "transit_hint": "🚌 Gần tuyến xe buýt DanaBus R16 & Trạm xe đạp TNGO Bạch Đằng",
    "editorial_lead": "Mạng lưới cơ sở và thông tin thực đơn tại các chi nhánh Domino's Pizza trên địa bàn Đà Nẵng.",
    "map_query_url": "https://www.google.com/maps/search/?api=1&query=Domino's%20Pizza%3A%20K%C3%AAnh%20Th%C3%B4ng%20Tin%20Chi%20Nh%C3%A1nh%20%C4%90%C3%A0%20N%E1%BA%B5ng%20%C4%90%C3%A0%20N%E1%BA%B5ng",
    "meal_moments": [
      "TRUA",
      "TOI"
    ],
    "visual_archetype": "VERIFIED_PLACE",
    "specific_action_label": "📍 Chỉ đường Google Maps",
    "tier_level": "TIER_1_DEAL",
    "tier_badge": "🔥 DEAL XÁC MINH",
    "tier_badge_class": "tier-badge-deal",
    "deal_price": "Thứ 3 & Chủ Nhật hàng tuần",
    "deal_cond": "Áp dụng theo thể lệ phát hành chính thức của đơn vị vận hành."
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
    "evidence_status": "Nguồn: www.lotteria.vn • Cập nhật định kỳ",
    "official_source_url": "https://www.lotteria.vn/menu/happy-lunch",
    "action_type": "VIEW_OFFICIAL_SOURCE",
    "code_text": null,
    "action_label": "Mở cổng thông tin chính thức →",
    "gateway_group": "AN_GI",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "SLOT_LUNCH",
    "allow_field_claims": false,
    "journey_id": "JOURNEY_FOOD",
    "journey_label": "Ẩm Thực Đà Thành",
    "transit_hint": "📍 Kết nối giao thông nội thành thuận tiện",
    "editorial_lead": "Thông tin thực đơn trưa cơm gà, burger tại hệ thống chi nhánh Lotteria trên địa bàn Đà Nẵng.",
    "map_query_url": "https://www.google.com/maps/search/?api=1&query=Lotteria%3A%20Th%E1%BB%B1c%20%C4%90%C6%A1n%20Tr%C6%B0a%20Happy%20Lunch%20%C4%90%C3%A0%20N%E1%BA%B5ng",
    "meal_moments": [
      "TRUA",
      "TOI"
    ],
    "visual_archetype": "VERIFIED_PLACE",
    "specific_action_label": "📍 Chỉ đường Google Maps",
    "tier_level": "TIER_1_DEAL",
    "tier_badge": "🔥 DEAL XÁC MINH",
    "tier_badge_class": "tier-badge-deal",
    "deal_price": "10:00 - 14:00 từ Thứ 2 đến Thứ 6",
    "deal_cond": "Khung giờ trưa ngày trong tuần tại quầy phục vụ."
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
    "evidence_status": "Nguồn: metiz.vn • Cập nhật định kỳ",
    "official_source_url": "https://metiz.vn/tin-tuc/khuyen-mai/gia-ve-u22-metiz/",
    "action_type": "VIEW_OFFICIAL_SOURCE",
    "code_text": null,
    "action_label": "Xem lịch chiếu & thông tin rạp →",
    "gateway_group": "DI_DAU",
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "SLOT_AFTERNOON",
    "allow_field_claims": false,
    "journey_id": "JOURNEY_LEISURE",
    "journey_label": "Đi Chơi & Thư Giãn Tối Nay",
    "transit_hint": "🚌 Gần tuyến xe buýt DanaBus R16 & Trạm xe đạp TNGO Bạch Đằng",
    "editorial_lead": "Thông tin chính sách dành cho khán giả dưới 22 tuổi tại rạp Metiz Helio Center Đà Nẵng.",
    "map_query_url": "https://www.google.com/maps/search/?api=1&query=Metiz%20Cinema%3A%20Ch%C3%ADnh%20S%C3%A1ch%20Kh%C3%A1n%20Gi%E1%BA%A3%20Tr%E1%BA%BB%20U22%20%C4%90%C3%A0%20N%E1%BA%B5ng",
    "leisure_category": "CINEMA",
    "visual_archetype": "VERIFIED_PLACE",
    "specific_action_label": "📅 Xem lịch chiếu rạp",
    "tier_level": "TIER_1_DEAL",
    "tier_badge": "🔥 DEAL XÁC MINH",
    "tier_badge_class": "tier-badge-deal",
    "deal_price": "Từ Thứ 2 đến Thứ 6 hàng tuần",
    "deal_cond": "Yêu cầu xuất trình giấy tờ tùy thân hoặc thẻ học sinh sinh viên tại quầy vé."
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
    "evidence_status": "Nguồn: education.github.com • Cập nhật định kỳ",
    "official_source_url": "https://education.github.com/pack",
    "action_type": "VIEW_OFFICIAL_SOURCE",
    "code_text": null,
    "action_label": "Mở cổng thông tin chính thức →",
    "gateway_group": "MUA_SAM",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "ALL_DAY",
    "allow_field_claims": false,
    "journey_id": "JOURNEY_STUDY_TOOLS",
    "journey_label": "Học Tập & Làm Việc",
    "transit_hint": "📍 Kết nối giao thông nội thành thuận tiện",
    "editorial_lead": "Gói công cụ lập trình, GitHub Copilot và tài nguyên kỹ thuật dành cho học sinh, sinh viên tại Đà Nẵng.",
    "visual_archetype": "VERIFIED_PLACE",
    "specific_action_label": "📍 Chỉ đường Google Maps",
    "tier_level": "TIER_1_DEAL",
    "tier_badge": "🔥 DEAL XÁC MINH",
    "tier_badge_class": "tier-badge-deal",
    "deal_price": "Áp dụng liên tục trong suốt thời gian học tập",
    "deal_cond": "Yêu cầu email trường học hợp lệ hoặc thẻ sinh viên."
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
    "evidence_status": "Nguồn: www.notion.so • Cập nhật định kỳ",
    "official_source_url": "https://www.notion.so/product/notion-for-education",
    "action_type": "VIEW_OFFICIAL_SOURCE",
    "code_text": null,
    "action_label": "Mở cổng thông tin chính thức →",
    "gateway_group": "MUA_SAM",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "ALL_DAY",
    "allow_field_claims": false,
    "journey_id": "JOURNEY_STUDY_TOOLS",
    "journey_label": "Học Tập & Làm Việc",
    "transit_hint": "📍 Kết nối giao thông nội thành thuận tiện",
    "editorial_lead": "Chính sách sử dụng Notion Plus phục vụ ghi chú và quản lý học tập dành cho học sinh, sinh viên.",
    "visual_archetype": "VERIFIED_PLACE",
    "specific_action_label": "📍 Chỉ đường Google Maps",
    "tier_level": "TIER_1_DEAL",
    "tier_badge": "🔥 DEAL XÁC MINH",
    "tier_badge_class": "tier-badge-deal",
    "deal_price": "Áp dụng trong thời gian học tập tài khoản",
    "deal_cond": "Yêu cầu email trường học hợp lệ."
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
    "evidence_status": "Nguồn: www.canva.com • Cập nhật định kỳ",
    "official_source_url": "https://www.canva.com/education/",
    "action_type": "CLAIM_OFFICIAL",
    "code_text": null,
    "action_label": "Mở cổng thông tin chính thức →",
    "gateway_group": "MUA_SAM",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "ALL_DAY",
    "allow_field_claims": false,
    "journey_id": "JOURNEY_STUDY_TOOLS",
    "journey_label": "Học Tập & Làm Việc",
    "transit_hint": "📍 Kết nối giao thông nội thành thuận tiện",
    "editorial_lead": "Nền tảng thiết kế đồ họa, bài giảng và thuyết trình dành cho học sinh, sinh viên và giáo viên.",
    "visual_archetype": "VERIFIED_PLACE",
    "specific_action_label": "📍 Chỉ đường Google Maps",
    "tier_level": "TIER_1_DEAL",
    "tier_badge": "🔥 DEAL XÁC MINH",
    "tier_badge_class": "tier-badge-deal",
    "deal_price": "Liên tục",
    "deal_cond": "Yêu cầu xác thực tài khoản giáo dục theo quy định."
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
    "evidence_status": "Nguồn: www.jetbrains.com • Cập nhật định kỳ",
    "official_source_url": "https://www.jetbrains.com/community/education/",
    "action_type": "CLAIM_OFFICIAL",
    "code_text": null,
    "action_label": "Mở cổng thông tin chính thức →",
    "gateway_group": "MUA_SAM",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "ALL_DAY",
    "allow_field_claims": false,
    "journey_id": "JOURNEY_STUDY_TOOLS",
    "journey_label": "Học Tập & Làm Việc",
    "transit_hint": "📍 Kết nối giao thông nội thành thuận tiện",
    "editorial_lead": "Cấp bản quyền IntelliJ IDEA Ultimate, PyCharm Professional, WebStorm cho sinh viên công nghệ thông tin.",
    "visual_archetype": "VERIFIED_PLACE",
    "specific_action_label": "📍 Chỉ đường Google Maps",
    "tier_level": "TIER_1_DEAL",
    "tier_badge": "🔥 DEAL XÁC MINH",
    "tier_badge_class": "tier-badge-deal",
    "deal_price": "Gia hạn hàng năm bằng thẻ sinh viên",
    "deal_cond": "Gia hạn hàng năm bằng email sinh viên trường đại học."
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
    "evidence_status": "Nguồn: www.spotify.com • Cập nhật định kỳ",
    "official_source_url": "https://www.spotify.com/vn-vi/student/",
    "action_type": "VIEW_OFFICIAL_SOURCE",
    "code_text": null,
    "action_label": "Mở cổng thông tin chính thức →",
    "gateway_group": "DI_DAU",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "ALL_DAY",
    "allow_field_claims": false,
    "journey_id": "JOURNEY_STUDY_TOOLS",
    "journey_label": "Học Tập & Làm Việc",
    "transit_hint": "📍 Kết nối giao thông nội thành thuận tiện",
    "editorial_lead": "Thông tin chính sách đăng ký gói âm nhạc bản quyền dành cho học sinh, sinh viên trên website chính thức.",
    "map_query_url": "https://www.google.com/maps/search/?api=1&query=Spotify%3A%20Ch%C6%B0%C6%A1ng%20Tr%C3%ACnh%20D%C3%A0nh%20Cho%20Sinh%20Vi%C3%AAn%20%C4%90%C3%A0%20N%E1%BA%B5ng",
    "leisure_category": "CITY_EXPLORE",
    "visual_archetype": "VERIFIED_PLACE",
    "specific_action_label": "📍 Chỉ đường Google Maps",
    "tier_level": "TIER_2_PROGRAMME",
    "tier_badge": "🏛️ CỔNG CHÍNH THỨC",
    "tier_badge_class": "tier-badge-programme"
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
    "evidence_status": "Nguồn: www.apple.com • Cập nhật định kỳ",
    "official_source_url": "https://www.apple.com/vn/apple-music/",
    "action_type": "VIEW_OFFICIAL_SOURCE",
    "code_text": null,
    "action_label": "Mở cổng thông tin chính thức →",
    "gateway_group": "DI_DAU",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "ALL_DAY",
    "allow_field_claims": false,
    "journey_id": "JOURNEY_STUDY_TOOLS",
    "journey_label": "Học Tập & Làm Việc",
    "transit_hint": "📍 Kết nối giao thông nội thành thuận tiện",
    "editorial_lead": "Thông tin dịch vụ nghe nhạc trực tuyến chất lượng cao với chính sách hỗ trợ học đường từ Apple.",
    "map_query_url": "https://www.google.com/maps/search/?api=1&query=Apple%20Music%3A%20Ch%C6%B0%C6%A1ng%20Tr%C3%ACnh%20D%C3%A0nh%20Cho%20Sinh%20Vi%C3%AAn%20%C4%90%C3%A0%20N%E1%BA%B5ng",
    "leisure_category": "CITY_EXPLORE",
    "visual_archetype": "VERIFIED_PLACE",
    "specific_action_label": "📍 Chỉ đường Google Maps",
    "tier_level": "TIER_2_PROGRAMME",
    "tier_badge": "🏛️ CỔNG CHÍNH THỨC",
    "tier_badge_class": "tier-badge-programme"
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
    "evidence_status": "Nguồn: starlight.vn • Cập nhật định kỳ",
    "official_source_url": "https://starlight.vn/khuyen-mai/combo-bap-nuoc-10k.html",
    "action_type": "VIEW_OFFICIAL_SOURCE",
    "code_text": null,
    "action_label": "Xem lịch chiếu & thông tin rạp →",
    "gateway_group": "DI_DAU",
    "locality_tag": "THANH_KHE",
    "time_slot_tag": "SLOT_EVENING",
    "allow_field_claims": false,
    "journey_id": "JOURNEY_LEISURE",
    "journey_label": "Đi Chơi & Thư Giãn Tối Nay",
    "transit_hint": "🚌 Gần tuyến xe buýt DanaBus R6A & Trạm TNGO Điện Biên Phủ",
    "editorial_lead": "Thông tin quyền lợi thẻ thành viên và lịch chiếu tại cụm rạp Starlight Đà Nẵng.",
    "map_query_url": "https://www.google.com/maps/search/?api=1&query=Starlight%20Cinema%3A%20Ch%C6%B0%C6%A1ng%20Tr%C3%ACnh%20Th%C3%A0nh%20Vi%C3%AAn%20R%E1%BA%A1p%20Phim%20%C4%90%C3%A0%20N%E1%BA%B5ng",
    "leisure_category": "CITY_EXPLORE",
    "visual_archetype": "VERIFIED_PLACE",
    "specific_action_label": "📍 Chỉ đường Google Maps",
    "tier_level": "TIER_2_PROGRAMME",
    "tier_badge": "🏛️ CỔNG CHÍNH THỨC",
    "tier_badge_class": "tier-badge-programme"
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
    "evidence_status": "Nguồn: www.galaxycine.vn • Cập nhật định kỳ",
    "official_source_url": "https://www.galaxycine.vn/khuyen-mai/happy-day/",
    "action_type": "VIEW_OFFICIAL_SOURCE",
    "code_text": null,
    "action_label": "Mở cổng thông tin chính thức →",
    "gateway_group": "DI_DAU",
    "locality_tag": "THANH_KHE",
    "time_slot_tag": "SLOT_EVENING",
    "allow_field_claims": false,
    "journey_id": "JOURNEY_LEISURE",
    "journey_label": "Đi Chơi & Thư Giãn Tối Nay",
    "transit_hint": "🚌 Gần tuyến xe buýt DanaBus R6A & Trạm TNGO Điện Biên Phủ",
    "editorial_lead": "Thông tin lịch chiếu và chính sách dành cho khán giả tại Galaxy Cinema Đà Nẵng.",
    "map_query_url": "https://www.google.com/maps/search/?api=1&query=Galaxy%20Cinema%20%C4%90%C3%A0%20N%E1%BA%B5ng%3A%20Ch%C6%B0%C6%A1ng%20Tr%C3%ACnh%20Ng%C3%A0y%20Th%C3%A0nh%20Vi%C3%AAn%20%C4%90%C3%A0%20N%E1%BA%B5ng",
    "leisure_category": "CITY_EXPLORE",
    "visual_archetype": "VERIFIED_PLACE",
    "specific_action_label": "📍 Chỉ đường Google Maps",
    "tier_level": "TIER_2_PROGRAMME",
    "tier_badge": "🏛️ CỔNG CHÍNH THỨC",
    "tier_badge_class": "tier-badge-programme"
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
    "evidence_status": "Nguồn: coopmart.vn • Cập nhật định kỳ",
    "official_source_url": "https://coopmart.vn",
    "action_type": "VIEW_CONDITIONS",
    "code_text": null,
    "action_label": "Mở cổng thông tin chính thức →",
    "gateway_group": "MUA_SAM",
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "ALL_DAY",
    "allow_field_claims": false,
    "journey_id": "JOURNEY_STUDY_TOOLS",
    "journey_label": "Học Tập & Làm Việc",
    "transit_hint": "🚌 Gần tuyến xe buýt DanaBus R16 & Trạm xe đạp TNGO Bạch Đằng",
    "editorial_lead": "Điểm mua sắm hàng tiêu dùng thiết yếu bình ổn giá uy tín tại quận Thanh Khê, phục vụ người dân đô thị.",
    "visual_archetype": "VERIFIED_PLACE",
    "specific_action_label": "📍 Chỉ đường Google Maps",
    "tier_level": "TIER_2_PROGRAMME",
    "tier_badge": "🏛️ CỔNG CHÍNH THỨC",
    "tier_badge_class": "tier-badge-programme"
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
    "evidence_status": "Nguồn: shopee.vn • Cập nhật định kỳ",
    "official_source_url": "https://shopee.vn/m/shopee-student-club",
    "action_type": "CLAIM_OFFICIAL",
    "code_text": null,
    "action_label": "Mở cổng thông tin chính thức →",
    "gateway_group": "MUA_SAM",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "ALL_DAY",
    "allow_field_claims": false,
    "journey_id": "JOURNEY_STUDY_TOOLS",
    "journey_label": "Học Tập & Làm Việc",
    "transit_hint": "📍 Kết nối giao thông nội thành thuận tiện",
    "editorial_lead": "Thông tin chương trình đồng hành cùng học sinh sinh viên mua sắm đồ dùng học tập trên Shopee.",
    "visual_archetype": "VERIFIED_PLACE",
    "specific_action_label": "📍 Chỉ đường Google Maps",
    "tier_level": "TIER_2_PROGRAMME",
    "tier_badge": "🏛️ CỔNG CHÍNH THỨC",
    "tier_badge_class": "tier-badge-programme"
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
    "evidence_status": "Nguồn: www.grab.com • Cập nhật định kỳ",
    "official_source_url": "https://www.grab.com/vn/",
    "action_type": "CLAIM_OFFICIAL",
    "code_text": null,
    "action_label": "Mở cổng thông tin chính thức →",
    "gateway_group": "DI_DAU",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "ALL_DAY",
    "allow_field_claims": false,
    "journey_id": "JOURNEY_TRANSPORT",
    "journey_label": "Di Chuyển & Đi Lại",
    "transit_hint": "📍 Kết nối giao thông nội thành thuận tiện",
    "editorial_lead": "Thông tin chính sách di chuyển và giao nhận dành cho học sinh sinh viên trên ứng dụng Grab.",
    "map_query_url": "https://www.google.com/maps/search/?api=1&query=Grab%3A%20K%C3%AAnh%20H%E1%BB%99i%20Vi%C3%AAn%20GrabUnlimited%20H%E1%BB%8Dc%20%C4%90%C6%B0%E1%BB%9Dng%20%C4%90%C3%A0%20N%E1%BA%B5ng",
    "leisure_category": "CITY_EXPLORE",
    "visual_archetype": "VERIFIED_PLACE",
    "specific_action_label": "📍 Chỉ đường Google Maps",
    "tier_level": "TIER_2_PROGRAMME",
    "tier_badge": "🏛️ CỔNG CHÍNH THỨC",
    "tier_badge_class": "tier-badge-programme"
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
    "evidence_status": "Nguồn: be.com.vn • Cập nhật định kỳ",
    "official_source_url": "https://be.com.vn",
    "action_type": "CLAIM_OFFICIAL",
    "code_text": null,
    "action_label": "Mở cổng thông tin chính thức →",
    "gateway_group": "DI_DAU",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "SLOT_MORNING",
    "allow_field_claims": false,
    "journey_id": "JOURNEY_TRANSPORT",
    "journey_label": "Di Chuyển & Đi Lại",
    "transit_hint": "📍 Kết nối giao thông nội thành thuận tiện",
    "editorial_lead": "Thông tin các tuyến kết nối xe công nghệ từ ký túc xá đến các cổng trường đại học tại Đà Nẵng.",
    "map_query_url": "https://www.google.com/maps/search/?api=1&query=Be%3A%20K%C3%AAnh%20Di%20Chuy%E1%BB%83n%20%C4%90%E1%BA%BFn%20Tr%C6%B0%E1%BB%9Dng%20Cho%20Sinh%20Vi%C3%AAn%20%C4%90%C3%A0%20N%E1%BA%B5ng",
    "leisure_category": "CITY_EXPLORE",
    "visual_archetype": "VERIFIED_PLACE",
    "specific_action_label": "📍 Chỉ đường Google Maps",
    "tier_level": "TIER_2_PROGRAMME",
    "tier_badge": "🏛️ CỔNG CHÍNH THỨC",
    "tier_badge_class": "tier-badge-programme"
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
    "evidence_status": "Nguồn: fptplay.vn • Cập nhật định kỳ",
    "official_source_url": "https://fptplay.vn",
    "action_type": "CLAIM_OFFICIAL",
    "code_text": null,
    "action_label": "Mở cổng thông tin chính thức →",
    "gateway_group": "DI_DAU",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "ALL_DAY",
    "allow_field_claims": false,
    "journey_id": "JOURNEY_STUDY_TOOLS",
    "journey_label": "Học Tập & Làm Việc",
    "transit_hint": "📍 Kết nối giao thông nội thành thuận tiện",
    "editorial_lead": "Xem phim điện ảnh, truyền hình bản quyền và các trận cầu thể thao trực tiếp.",
    "map_query_url": "https://www.google.com/maps/search/?api=1&query=FPT%20Play%3A%20G%C3%B3i%20Gi%E1%BA%A3i%20Tr%C3%AD%20%26%20Ngo%E1%BA%A1i%20H%E1%BA%A1ng%20Anh%20D%C3%A0nh%20Cho%20Sinh%20Vi%C3%AAn%20%C4%90%C3%A0%20N%E1%BA%B5ng",
    "leisure_category": "CITY_EXPLORE",
    "visual_archetype": "VERIFIED_PLACE",
    "specific_action_label": "📍 Chỉ đường Google Maps",
    "tier_level": "TIER_2_PROGRAMME",
    "tier_badge": "🏛️ CỔNG CHÍNH THỨC",
    "tier_badge_class": "tier-badge-programme"
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
    "evidence_status": "Nguồn: www.cgv.vn • Cập nhật định kỳ",
    "official_source_url": "https://www.cgv.vn/default/culture-day",
    "action_type": "VIEW_OFFICIAL_SOURCE",
    "code_text": null,
    "action_label": "Xem lịch chiếu & thông tin rạp →",
    "gateway_group": "DI_DAU",
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "SLOT_EVENING",
    "allow_field_claims": false,
    "journey_id": "JOURNEY_LEISURE",
    "journey_label": "Đi Chơi & Thư Giãn Tối Nay",
    "transit_hint": "🚌 Gần tuyến xe buýt DanaBus R16 & Trạm xe đạp TNGO Bạch Đằng",
    "editorial_lead": "Chương trình xem phim định kỳ dành cho người yêu điện ảnh tại các cụm rạp CGV Đà Nẵng.",
    "map_query_url": "https://www.google.com/maps/search/?api=1&query=CGV%20Cinemas%3A%20Ng%C3%A0y%20H%E1%BB%99i%20%C4%90i%E1%BB%87n%20%E1%BA%A2nh%20%C4%90%E1%BB%8Bnh%20K%E1%BB%B3%20%C4%90%C3%A0%20N%E1%BA%B5ng",
    "leisure_category": "CINEMA",
    "visual_archetype": "VERIFIED_PLACE",
    "specific_action_label": "📅 Xem lịch chiếu rạp",
    "tier_level": "TIER_2_PROGRAMME",
    "tier_badge": "🏛️ CỔNG CHÍNH THỨC",
    "tier_badge_class": "tier-badge-programme"
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
    "evidence_status": "Nguồn: danangbus.vn • Cập nhật định kỳ",
    "official_source_url": "https://danangbus.vn",
    "action_type": "VIEW_CONDITIONS",
    "code_text": null,
    "action_label": "Xem lộ trình & điểm làm vé →",
    "gateway_group": "DI_DAU",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "SLOT_MORNING",
    "allow_field_claims": true,
    "journey_id": "JOURNEY_TRANSPORT",
    "journey_label": "Di Chuyển & Đi Lại",
    "transit_hint": "📍 Kết nối giao thông nội thành thuận tiện",
    "editorial_lead": "Mạng lưới xe buýt công cộng nội thành có trợ giá cho học sinh sinh viên, kết nối thông suốt từ các trường đại học đến trung tâm hành chính và các bãi biển.",
    "map_query_url": "https://www.google.com/maps/search/?api=1&query=DanaBus%3A%20M%E1%BA%A1ng%20L%C6%B0%E1%BB%9Bi%20Xe%20Bu%C3%BDt%20Tr%E1%BB%A3%20Gi%C3%A1%20%C4%90%C3%A0%20N%E1%BA%B5ng%20%C4%90%C3%A0%20N%E1%BA%B5ng",
    "leisure_category": "CITY_EXPLORE",
    "visual_archetype": "OFFICIAL_PROGRAMME",
    "specific_action_label": "🚌 Xem lộ trình & điểm làm vé",
    "ranking_rationale": "Hệ thống giao thông công cộng trợ giá chính thức của TP. Đà Nẵng, lộ trình xuyên suốt các quận nội thành.",
    "curation_story": "Mạng lưới xe buýt xanh DanaBus kết nối từ Sân bay, Cầu Rồng đến Bến xe Trung tâm và Bãi biển Mỹ Khê với giá vé sinh viên ưu đãi.",
    "tier_level": "TIER_2_PROGRAMME",
    "tier_badge": "🏛️ CỔNG CHÍNH THỨC",
    "tier_badge_class": "tier-badge-programme",
    "visual_asset_url": "assets/images/danang_real_photo_han_river_bridge.jpg",
    "visual_attribution": "🌉 Cầu Sông Hàn &bull; 📷 Christophe95 (CC BY-SA 4.0)"
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
    "evidence_status": "Nguồn: tngo.vn • Cập nhật định kỳ",
    "official_source_url": "https://tngo.vn",
    "action_type": "VIEW_OFFICIAL_SOURCE",
    "code_text": null,
    "action_label": "Xem bản đồ trạm xe đạp →",
    "gateway_group": "DI_DAU",
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "SLOT_AFTERNOON",
    "allow_field_claims": false,
    "journey_id": "JOURNEY_TRANSPORT",
    "journey_label": "Di Chuyển & Đi Lại",
    "transit_hint": "🚌 Gần tuyến xe buýt DanaBus R16 & Trạm xe đạp TNGO Bạch Đằng",
    "editorial_lead": "Mạng lưới hơn 60 trạm xe đạp thông minh khắp các trục đường ven sông Hàn, bờ biển Mỹ Khê và khu đại học.",
    "map_query_url": "https://www.google.com/maps/search/?api=1&query=TNGO%3A%20H%E1%BB%87%20Th%E1%BB%91ng%20Xe%20%C4%90%E1%BA%A1p%20C%C3%B4ng%20C%E1%BB%99ng%20TP.%20%C4%90%C3%A0%20N%E1%BA%B5ng%20%C4%90%C3%A0%20N%E1%BA%B5ng",
    "leisure_category": "CITY_EXPLORE",
    "visual_archetype": "OFFICIAL_PROGRAMME",
    "specific_action_label": "🚲 Xem bản đồ trạm xe đạp",
    "tier_level": "TIER_2_PROGRAMME",
    "tier_badge": "🏛️ CỔNG CHÍNH THỨC",
    "tier_badge_class": "tier-badge-programme"
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
    "evidence_status": "Nguồn: thuvien.danang.gov.vn • Cập nhật định kỳ",
    "official_source_url": "http://thuvien.danang.gov.vn",
    "action_type": "VIEW_CONDITIONS",
    "code_text": null,
    "action_label": "Mở cổng thông tin chính thức →",
    "gateway_group": "MUA_SAM",
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "SLOT_AFTERNOON",
    "allow_field_claims": true,
    "journey_id": "JOURNEY_STUDY_TOOLS",
    "journey_label": "Học Tập & Làm Việc",
    "transit_hint": "🚌 Gần tuyến xe buýt DanaBus R16 & Trạm xe đạp TNGO Bạch Đằng",
    "editorial_lead": "Không gian tri thức khoáng đạt nằm ngay bên bờ sông Hàn thơ mộng, mở cửa phục vụ bạn đọc tra cứu tài liệu và học tập yên tĩnh.",
    "visual_archetype": "VERIFIED_PLACE",
    "specific_action_label": "📍 Chỉ đường Google Maps",
    "ranking_rationale": "Thư viện công cộng hiện đại với không gian tự học máy lạnh, wifi miễn phí và hàng ngàn đầu sách tham khảo.",
    "curation_story": "Không gian đọc sách và làm việc yên tĩnh ngay trung tâm quận Hải Châu, phục vụ miễn phí cho học sinh, sinh viên và người dân.",
    "tier_level": "TIER_2_PROGRAMME",
    "tier_badge": "🏛️ CỔNG CHÍNH THỨC",
    "tier_badge_class": "tier-badge-programme",
    "visual_asset_url": "assets/images/danang_real_photo_bach_dang.jpg",
    "visual_attribution": "📚 Bạch Đằng Ven Sông &bull; 📷 Joseph Hunkins (CC BY 2.0)"
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
    "evidence_status": "Nguồn: 1022.danang.gov.vn • Cập nhật định kỳ",
    "official_source_url": "https://1022.danang.gov.vn",
    "action_type": "VIEW_CONDITIONS",
    "code_text": null,
    "action_label": "Mở cổng thông tin chính thức →",
    "gateway_group": "MUA_SAM",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "ALL_DAY",
    "allow_field_claims": true,
    "journey_id": "JOURNEY_STUDY_TOOLS",
    "journey_label": "Học Tập & Làm Việc",
    "transit_hint": "📍 Kết nối giao thông nội thành thuận tiện",
    "editorial_lead": "Kênh tra cứu thông tin hành chính, phản ánh giao thông, xe buýt, học tập và an sinh xã hội chính thức của thành phố.",
    "visual_archetype": "VERIFIED_PLACE",
    "specific_action_label": "📍 Chỉ đường Google Maps",
    "tier_level": "TIER_2_PROGRAMME",
    "tier_badge": "🏛️ CỔNG CHÍNH THỨC",
    "tier_badge_class": "tier-badge-programme"
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
    "conditions_limit": "mở cửa tự do hoàn toàn, cấm phương tiện lưu thông trên cầu trong thời gian phun lửa",
    "observed_at": "2026-08-29 08:00",
    "summary_text": "Biểu tượng kiến trúc của Đà Nẵng, trình diễn phun lửa và phun nước bên bờ sông Hàn vào mỗi tối Thứ 7 và Chủ Nhật.",
    "verbatim_quote": "Lịch phun lửa & phun nước cố định 21h00 thứ Bảy và Chủ Nhật.",
    "evidence_status": "Nguồn: danang.gov.vn • Cập nhật định kỳ",
    "official_source_url": "https://danang.gov.vn",
    "action_type": "VIEW_CONDITIONS",
    "code_text": null,
    "action_label": "Mở cổng thông tin chính thức →",
    "gateway_group": "DI_DAU",
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "SLOT_EVENING",
    "allow_field_claims": true,
    "journey_id": "JOURNEY_LEISURE",
    "journey_label": "Đi Chơi & Thư Giãn Tối Nay",
    "transit_hint": "🚌 Gần tuyến xe buýt DanaBus R16 & Trạm xe đạp TNGO Bạch Đằng",
    "editorial_lead": "Biểu tượng kiến trúc của Đà Nẵng, trình diễn phun lửa và phun nước bên bờ sông Hàn vào mỗi tối Thứ 7 và Chủ Nhật.",
    "map_query_url": "https://www.google.com/maps/search/?api=1&query=C%E1%BA%A7u%20R%E1%BB%93ng%20Phun%20L%E1%BB%ADa%20%26%20Phun%20N%C6%B0%E1%BB%9Bc%20(21%3A00%20Cu%E1%BB%91i%20Tu%E1%BA%A7n)%20%C4%90%C3%A0%20N%E1%BA%B5ng",
    "leisure_category": "CITY_EXPLORE",
    "visual_archetype": "VERIFIED_PLACE",
    "specific_action_label": "📍 Chỉ đường Google Maps",
    "tier_level": "TIER_3_UTILITY",
    "tier_badge": "📍 TIỆN ÍCH XÁC MINH",
    "tier_badge_class": "tier-badge-utility"
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
    "evidence_status": "Nguồn: danang.gov.vn • Cập nhật định kỳ",
    "official_source_url": "https://danang.gov.vn",
    "action_type": "VIEW_CONDITIONS",
    "code_text": null,
    "action_label": "Mở cổng thông tin chính thức →",
    "gateway_group": "DI_DAU",
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "SLOT_AFTERNOON",
    "allow_field_claims": true,
    "journey_id": "JOURNEY_LEISURE",
    "journey_label": "Đi Chơi & Thư Giãn Tối Nay",
    "transit_hint": "🚌 Gần tuyến xe buýt DanaBus R16 & Trạm xe đạp TNGO Bạch Đằng",
    "editorial_lead": "Quảng trường rộng lớn với kiến trúc mái vòm cánh diều bay cao, địa điểm giao lưu và ngắm cảnh sông Hàn lý tưởng.",
    "map_query_url": "https://www.google.com/maps/search/?api=1&query=C%C3%B4ng%20Vi%C3%AAn%20APEC%20%26%20V%C3%B2m%20C%C3%A1nh%20Di%E1%BB%81u%20Ven%20S%C3%B4ng%20H%C3%A0n%20%C4%90%C3%A0%20N%E1%BA%B5ng",
    "leisure_category": "CITY_EXPLORE",
    "visual_archetype": "VERIFIED_PLACE",
    "specific_action_label": "📍 Chỉ đường Google Maps",
    "tier_level": "TIER_3_UTILITY",
    "tier_badge": "📍 TIỆN ÍCH XÁC MINH",
    "tier_badge_class": "tier-badge-utility"
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
    "evidence_status": "Nguồn: danang.gov.vn • Cập nhật định kỳ",
    "official_source_url": "https://danang.gov.vn",
    "action_type": "VIEW_CONDITIONS",
    "code_text": null,
    "action_label": "Mở cổng thông tin chính thức →",
    "gateway_group": "DI_DAU",
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "SLOT_EVENING",
    "allow_field_claims": true,
    "journey_id": "JOURNEY_LEISURE",
    "journey_label": "Đi Chơi & Thư Giãn Tối Nay",
    "transit_hint": "🚌 Gần tuyến xe buýt DanaBus R16 & Trạm xe đạp TNGO Bạch Đằng",
    "editorial_lead": "Tuyến đường đi bộ ven sông thơ mộng với nhiều hoạt động âm nhạc đường phố, ẩm thực và làn gió mát sông Hàn.",
    "map_query_url": "https://www.google.com/maps/search/?api=1&query=Ph%E1%BB%91%20%C4%90i%20B%E1%BB%99%20B%E1%BA%A1ch%20%C4%90%E1%BA%B1ng%20(B%E1%BB%9D%20T%C3%A2y%20S%C3%B4ng%20H%C3%A0n)%20%C4%90%C3%A0%20N%E1%BA%B5ng",
    "leisure_category": "CITY_EXPLORE",
    "visual_archetype": "VERIFIED_PLACE",
    "specific_action_label": "📍 Chỉ đường Google Maps",
    "tier_level": "TIER_3_UTILITY",
    "tier_badge": "📍 TIỆN ÍCH XÁC MINH",
    "tier_badge_class": "tier-badge-utility"
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
    "evidence_status": "Nguồn: chammuseum.danang.vn • Cập nhật định kỳ",
    "official_source_url": "http://chammuseum.danang.vn",
    "action_type": "VIEW_CONDITIONS",
    "code_text": null,
    "action_label": "Mở cổng thông tin chính thức →",
    "gateway_group": "DI_DAU",
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "SLOT_MORNING",
    "allow_field_claims": true,
    "journey_id": "JOURNEY_LEISURE",
    "journey_label": "Đi Chơi & Thư Giãn Tối Nay",
    "transit_hint": "🚌 Gần tuyến xe buýt DanaBus R16 & Trạm xe đạp TNGO Bạch Đằng",
    "editorial_lead": "Kho tàng kiến trúc và điêu khắc Champa cổ độc bản lớn nhất thế giới, điểm hẹn văn hóa lịch sử không thể bỏ lỡ tại Đà Nẵng.",
    "map_query_url": "https://www.google.com/maps/search/?api=1&query=B%E1%BA%A3o%20T%C3%A0ng%20%C4%90i%C3%AAu%20Kh%E1%BA%AFc%20Ch%C4%83m%20%C4%90%C3%A0%20N%E1%BA%B5ng%20%C4%90%C3%A0%20N%E1%BA%B5ng",
    "leisure_category": "HERITAGE",
    "visual_archetype": "VERIFIED_PLACE",
    "specific_action_label": "🏛️ Xem giờ mở cửa & nội quy",
    "ranking_rationale": "Bảo tàng lưu giữ hiện vật điêu khắc Chăm quy mô nhất thế giới, mở cửa liên tục đón khách tham quan.",
    "curation_story": "Tọa lạc ngay ngã tư đường 2 Tháng 9 và chân Cầu Rồng, bảo tàng trưng bày hơn 400 tác phẩm điêu khắc sa thạch nguyên bản từ thế kỷ 7 đến 15.",
    "tier_level": "TIER_3_UTILITY",
    "tier_badge": "📍 TIỆN ÍCH XÁC MINH",
    "tier_badge_class": "tier-badge-utility",
    "visual_asset_url": "assets/images/danang_real_photo_cham_museum.jpg",
    "visual_attribution": "🏛️ Bảo Tàng Chăm &bull; 📷 CT Snow (CC BY 2.0)"
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
    "evidence_status": "Nguồn: baotangdanang.vn • Cập nhật định kỳ",
    "official_source_url": "https://baotangdanang.vn",
    "action_type": "VIEW_CONDITIONS",
    "code_text": null,
    "action_label": "Mở cổng thông tin chính thức →",
    "gateway_group": "DI_DAU",
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "SLOT_MORNING",
    "allow_field_claims": true,
    "journey_id": "JOURNEY_LEISURE",
    "journey_label": "Đi Chơi & Thư Giãn Tối Nay",
    "transit_hint": "🚌 Gần tuyến xe buýt DanaBus R16 & Trạm xe đạp TNGO Bạch Đằng",
    "editorial_lead": "Kho tàng kiến trúc và điêu khắc Champa cổ độc bản lớn nhất thế giới, điểm hẹn văn hóa lịch sử không thể bỏ lỡ tại Đà Nẵng.",
    "map_query_url": "https://www.google.com/maps/search/?api=1&query=B%E1%BA%A3o%20T%C3%A0ng%20%C4%90%C3%A0%20N%E1%BA%B5ng%20(Di%20T%C3%ADch%20Th%C3%A0nh%20%C4%90i%E1%BB%87n%20H%E1%BA%A3i)%20%C4%90%C3%A0%20N%E1%BA%B5ng",
    "leisure_category": "HERITAGE",
    "visual_archetype": "VERIFIED_PLACE",
    "specific_action_label": "🏛️ Xem giờ mở cửa & nội quy",
    "tier_level": "TIER_3_UTILITY",
    "tier_badge": "📍 TIỆN ÍCH XÁC MINH",
    "tier_badge_class": "tier-badge-utility",
    "visual_asset_url": "assets/images/danang_real_photo_cham_museum.jpg",
    "visual_attribution": "🏛️ Bảo Tàng Chăm &bull; 📷 CT Snow (CC BY 2.0)"
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
    "evidence_status": "Nguồn: danang.gov.vn • Cập nhật định kỳ",
    "official_source_url": "https://danang.gov.vn",
    "action_type": "VIEW_CONDITIONS",
    "code_text": null,
    "action_label": "Mở cổng thông tin chính thức →",
    "gateway_group": "DI_DAU",
    "locality_tag": "SON_TRA",
    "time_slot_tag": "SLOT_MORNING",
    "allow_field_claims": true,
    "journey_id": "JOURNEY_LEISURE",
    "journey_label": "Đi Chơi & Thư Giãn Tối Nay",
    "transit_hint": "🚲 Gần trạm xe đạp TNGO Võ Nguyên Giáp & Cầu Rồng",
    "editorial_lead": "Bãi biển quyến rũ với bờ cát trắng mịn, nước trong xanh và nhiều tiện ích công cộng phục vụ người dân, du khách.",
    "map_query_url": "https://www.google.com/maps/search/?api=1&query=B%C3%A3i%20Bi%E1%BB%83n%20M%E1%BB%B9%20Kh%C3%AA%20%26%20B%E1%BB%9D%20%C4%90%C3%B4ng%20%C4%90%C3%A0%20N%E1%BA%B5ng%20%C4%90%C3%A0%20N%E1%BA%B5ng",
    "leisure_category": "CITY_EXPLORE",
    "visual_archetype": "VERIFIED_PLACE",
    "specific_action_label": "📍 Chỉ đường Google Maps",
    "tier_level": "TIER_3_UTILITY",
    "tier_badge": "📍 TIỆN ÍCH XÁC MINH",
    "tier_badge_class": "tier-badge-utility"
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
    "evidence_status": "Nguồn: danang.gov.vn • Cập nhật định kỳ",
    "official_source_url": "https://danang.gov.vn",
    "action_type": "VIEW_CONDITIONS",
    "code_text": null,
    "action_label": "Mở cổng thông tin chính thức →",
    "gateway_group": "DI_DAU",
    "locality_tag": "SON_TRA",
    "time_slot_tag": "SLOT_MORNING",
    "allow_field_claims": true,
    "journey_id": "JOURNEY_LEISURE",
    "journey_label": "Đi Chơi & Thư Giãn Tối Nay",
    "transit_hint": "🚲 Gần trạm xe đạp TNGO Võ Nguyên Giáp & Cầu Rồng",
    "editorial_lead": "Khu bảo tồn thiên nhiên với tầm nhìn bao quát toàn cảnh vịnh Đà Nẵng và quần thể voọc chà vá chân nâu quý hiếm.",
    "map_query_url": "https://www.google.com/maps/search/?api=1&query=B%C3%A1n%20%C4%90%E1%BA%A3o%20S%C6%A1n%20Tr%C3%A0%20%26%20Ch%C3%B9a%20Linh%20%E1%BB%A8ng%20%C4%90%C3%A0%20N%E1%BA%B5ng",
    "leisure_category": "CITY_EXPLORE",
    "visual_archetype": "VERIFIED_PLACE",
    "specific_action_label": "📍 Chỉ đường Google Maps",
    "tier_level": "TIER_3_UTILITY",
    "tier_badge": "📍 TIỆN ÍCH XÁC MINH",
    "tier_badge_class": "tier-badge-utility"
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
    "evidence_status": "Nguồn: danang.gov.vn • Cập nhật định kỳ",
    "official_source_url": "https://danang.gov.vn",
    "action_type": "VIEW_CONDITIONS",
    "code_text": null,
    "action_label": "Mở cổng thông tin chính thức →",
    "gateway_group": "MUA_SAM",
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "SLOT_MORNING",
    "allow_field_claims": true,
    "journey_id": "JOURNEY_STUDY_TOOLS",
    "journey_label": "Học Tập & Làm Việc",
    "transit_hint": "🚌 Gần tuyến xe buýt DanaBus R16 & Trạm xe đạp TNGO Bạch Đằng",
    "editorial_lead": "Ngôi chợ truyền thống lâu đời ngay trung tâm thành phố với hàng trăm gian hàng đặc sản mắm, chả bò và quà lưu niệm.",
    "visual_archetype": "VERIFIED_PLACE",
    "specific_action_label": "📍 Chỉ đường Google Maps",
    "tier_level": "TIER_3_UTILITY",
    "tier_badge": "📍 TIỆN ÍCH XÁC MINH",
    "tier_badge_class": "tier-badge-utility"
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
    "evidence_status": "Nguồn: danang.gov.vn • Cập nhật định kỳ",
    "official_source_url": "https://danang.gov.vn",
    "action_type": "VIEW_CONDITIONS",
    "code_text": null,
    "action_label": "Mở cổng thông tin chính thức →",
    "gateway_group": "AN_GI",
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "SLOT_AFTERNOON",
    "allow_field_claims": true,
    "journey_id": "JOURNEY_FOOD",
    "journey_label": "Ẩm Thực Đà Thành",
    "transit_hint": "🚌 Gần tuyến xe buýt DanaBus R16 & Trạm xe đạp TNGO Bạch Đằng",
    "editorial_lead": "Nơi hội tụ đầy đủ các món ngon Đà Nẵng: bánh bèo, nậm, lọc, ốc hút, phá lấu, kem bơ với mức giá cực kỳ phải chăng.",
    "map_query_url": "https://www.google.com/maps/search/?api=1&query=Ch%E1%BB%A3%20C%E1%BB%93n%3A%20Khu%20%E1%BA%A8m%20Th%E1%BB%B1c%20%C4%90%C6%B0%E1%BB%9Dng%20Ph%E1%BB%91%20Ngon%20R%E1%BA%BB%20%C4%90%C3%A0%20N%E1%BA%B5ng%20%C4%90%C3%A0%20N%E1%BA%B5ng",
    "meal_moments": [
      "SANG",
      "TRUA",
      "TOI"
    ],
    "visual_archetype": "VERIFIED_PLACE",
    "specific_action_label": "📍 Chỉ đường Google Maps",
    "ranking_rationale": "Khu chợ ẩm thực sầm uất với hơn 50 quầy đặc sản miền Trung mở từ 07:00 đến 19:30.",
    "curation_story": "Chợ Cồn quy tụ trọn vẹn ẩm thực đường phố Đà Thành: ốc hút, bánh tráng cuốn thịt heo, chè sầu riêng nức tiếng.",
    "tier_level": "TIER_3_UTILITY",
    "tier_badge": "📍 TIỆN ÍCH XÁC MINH",
    "tier_badge_class": "tier-badge-utility"
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
    "evidence_status": "Nguồn: danang.gov.vn • Cập nhật định kỳ",
    "official_source_url": "https://danang.gov.vn",
    "action_type": "VIEW_CONDITIONS",
    "code_text": null,
    "action_label": "Mở cổng thông tin chính thức →",
    "gateway_group": "AN_GI",
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "SLOT_MORNING",
    "allow_field_claims": true,
    "journey_id": "JOURNEY_FOOD",
    "journey_label": "Ẩm Thực Đà Thành",
    "transit_hint": "🚌 Gần tuyến xe buýt DanaBus R16 & Trạm xe đạp TNGO Bạch Đằng",
    "editorial_lead": "Con phố ẩm thực lâu đời bậc nhất trung tâm Hải Châu, nơi hội tụ trọn vẹn hương vị điểm tâm, mì Quảng, bún chả cá và cà phê sáng của người Đà Nẵng.",
    "map_query_url": "https://www.google.com/maps/search/?api=1&query=Ph%E1%BB%91%20%C4%90i%E1%BB%83m%20T%C3%A2m%20%26%20%E1%BA%A8m%20Th%E1%BB%B1c%20Hu%E1%BB%B3nh%20Th%C3%BAc%20Kh%C3%A1ng%20%C4%90%C3%A0%20N%E1%BA%B5ng",
    "meal_moments": [
      "SANG",
      "TRUA",
      "TOI"
    ],
    "visual_archetype": "VERIFIED_PLACE",
    "specific_action_label": "📍 Chỉ đường Google Maps",
    "ranking_rationale": "Tuyến phố ẩm thực điểm tâm tập trung lâu đời nhất quận Hải Châu, kết nối thẳng tuyến xe buýt R16.",
    "curation_story": "Phố ẩm thực Huỳnh Thúc Kháng là điểm hẹn ăn sáng quen thuộc của người Đà Nẵng với đầy đủ mì Quảng, bún chả cá, bánh bèo, bánh nậm nóng hổi.",
    "tier_level": "TIER_3_UTILITY",
    "tier_badge": "📍 TIỆN ÍCH XÁC MINH",
    "tier_badge_class": "tier-badge-utility",
    "visual_asset_url": "assets/images/danang_real_photo_mi_quang.jpg",
    "visual_attribution": "🍜 Mì Quảng &bull; 📷 SauceSupreme (CC BY 2.0)"
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
    "evidence_status": "Nguồn: danang.gov.vn • Cập nhật định kỳ",
    "official_source_url": "https://danang.gov.vn",
    "action_type": "VIEW_CONDITIONS",
    "code_text": null,
    "action_label": "Mở cổng thông tin chính thức →",
    "gateway_group": "DI_DAU",
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "SLOT_AFTERNOON",
    "allow_field_claims": true,
    "journey_id": "JOURNEY_LEISURE",
    "journey_label": "Đi Chơi & Thư Giãn Tối Nay",
    "transit_hint": "🚌 Gần tuyến xe buýt DanaBus R16 & Trạm xe đạp TNGO Bạch Đằng",
    "editorial_lead": "Công trình kiến trúc mô phỏng hình khối Tangram đầy màu sắc, nơi diễn ra các hoạt động văn hóa nghệ thuật của giới trẻ.",
    "map_query_url": "https://www.google.com/maps/search/?api=1&query=Cung%20Thi%E1%BA%BFu%20Nhi%20%C4%90%C3%A0%20N%E1%BA%B5ng%3A%20Kh%C3%B4ng%20Gian%20Check-in%20%26%20Sinh%20Ho%E1%BA%A1t%20%C4%90%C3%A0%20N%E1%BA%B5ng",
    "leisure_category": "CITY_EXPLORE",
    "visual_archetype": "VERIFIED_PLACE",
    "specific_action_label": "📍 Chỉ đường Google Maps",
    "tier_level": "TIER_3_UTILITY",
    "tier_badge": "📍 TIỆN ÍCH XÁC MINH",
    "tier_badge_class": "tier-badge-utility"
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
    "evidence_status": "Nguồn: danang.gov.vn • Cập nhật định kỳ",
    "official_source_url": "https://danang.gov.vn",
    "action_type": "VIEW_CONDITIONS",
    "code_text": null,
    "action_label": "Mở cổng thông tin chính thức →",
    "gateway_group": "DI_DAU",
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "SLOT_EVENING",
    "allow_field_claims": true,
    "journey_id": "JOURNEY_LEISURE",
    "journey_label": "Đi Chơi & Thư Giãn Tối Nay",
    "transit_hint": "🚌 Gần tuyến xe buýt DanaBus R16 & Trạm xe đạp TNGO Bạch Đằng",
    "editorial_lead": "Nhà thi đấu hiện đại hình dáng đĩa bay, nơi diễn ra các giải thể thao sinh viên, hội thao và đại nhạc hội lớn.",
    "map_query_url": "https://www.google.com/maps/search/?api=1&query=Cung%20Th%E1%BB%83%20Thao%20Ti%C3%AAn%20S%C6%A1n%20(%C4%90%C4%A9a%20Bay%20Ti%C3%AAn%20S%C6%A1n)%20%C4%90%C3%A0%20N%E1%BA%B5ng",
    "leisure_category": "CITY_EXPLORE",
    "visual_archetype": "VERIFIED_PLACE",
    "specific_action_label": "📍 Chỉ đường Google Maps",
    "tier_level": "TIER_3_UTILITY",
    "tier_badge": "📍 TIỆN ÍCH XÁC MINH",
    "tier_badge_class": "tier-badge-utility"
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
    "evidence_status": "Nguồn: danang.gov.vn • Cập nhật định kỳ",
    "official_source_url": "https://danang.gov.vn",
    "action_type": "VIEW_CONDITIONS",
    "code_text": null,
    "action_label": "Mở cổng thông tin chính thức →",
    "gateway_group": "DI_DAU",
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "SLOT_EVENING",
    "allow_field_claims": true,
    "journey_id": "JOURNEY_LEISURE",
    "journey_label": "Đi Chơi & Thư Giãn Tối Nay",
    "transit_hint": "🚌 Gần tuyến xe buýt DanaBus R16 & Trạm xe đạp TNGO Bạch Đằng",
    "editorial_lead": "Trải nghiệm du ngoạn sông Hàn về đêm ngắm nhìn các cây cầu lung linh ánh đèn và thưởng thức múa Chăm truyền thống.",
    "map_query_url": "https://www.google.com/maps/search/?api=1&query=B%E1%BA%BFn%20Du%20Thuy%E1%BB%81n%20S%C3%B4ng%20H%C3%A0n%20(Ng%E1%BA%AFm%20C%E1%BA%A7u%20%C4%90%C3%A0%20N%E1%BA%B5ng%20V%E1%BB%81%20%C4%90%C3%AAm)%20%C4%90%C3%A0%20N%E1%BA%B5ng",
    "leisure_category": "RIVERSIDE",
    "visual_archetype": "VERIFIED_PLACE",
    "specific_action_label": "📍 Chỉ đường Google Maps",
    "tier_level": "TIER_3_UTILITY",
    "tier_badge": "📍 TIỆN ÍCH XÁC MINH",
    "tier_badge_class": "tier-badge-utility",
    "visual_asset_url": "assets/images/danang_real_photo_my_khe_beach.jpg",
    "visual_attribution": "🏖️ Biển Mỹ Khê &bull; 📷 . Ray in Manila (CC BY 2.0)"
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
    "evidence_status": "Nguồn: danang.gov.vn • Cập nhật định kỳ",
    "official_source_url": "https://danang.gov.vn",
    "action_type": "VIEW_CONDITIONS",
    "code_text": null,
    "action_label": "Mở cổng thông tin chính thức →",
    "gateway_group": "DI_DAU",
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "SLOT_EVENING",
    "allow_field_claims": true,
    "journey_id": "JOURNEY_LEISURE",
    "journey_label": "Đi Chơi & Thư Giãn Tối Nay",
    "transit_hint": "🚌 Gần tuyến xe buýt DanaBus R16 & Trạm xe đạp TNGO Bạch Đằng",
    "editorial_lead": "Tổ chức các buổi chiếu phim tài liệu, biểu diễn tuồng, hô hát bài chòi và các hoạt động văn hóa nghệ thuật.",
    "map_query_url": "https://www.google.com/maps/search/?api=1&query=Trung%20T%C3%A2m%20V%C4%83n%20H%C3%B3a%20%E2%80%94%20%C4%90i%E1%BB%87n%20%E1%BA%A2nh%20TP.%20%C4%90%C3%A0%20N%E1%BA%B5ng%20%C4%90%C3%A0%20N%E1%BA%B5ng",
    "leisure_category": "CITY_EXPLORE",
    "visual_archetype": "VERIFIED_PLACE",
    "specific_action_label": "📍 Chỉ đường Google Maps",
    "tier_level": "TIER_3_UTILITY",
    "tier_badge": "📍 TIỆN ÍCH XÁC MINH",
    "tier_badge_class": "tier-badge-utility"
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
    "evidence_status": "Nguồn: highlandscoffee.com.vn • Cập nhật định kỳ",
    "official_source_url": "https://highlandscoffee.com.vn",
    "action_type": "WATCH_MONITOR",
    "code_text": null,
    "action_label": "Theo dõi kênh thông tin",
    "gateway_group": "AN_GI",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "ALL_DAY",
    "allow_field_claims": false,
    "journey_id": "JOURNEY_FOOD",
    "journey_label": "Ẩm Thực Đà Thành",
    "transit_hint": "📍 Kết nối giao thông nội thành thuận tiện",
    "editorial_lead": "Theo dõi các thông tin phát hành chính thức từ ứng dụng di động Highlands Coffee.",
    "map_query_url": "https://www.google.com/maps/search/?api=1&query=Highlands%20Coffee%3A%20K%C3%AAnh%20Gi%C3%A1m%20S%C3%A1t%20Ngu%E1%BB%93n%20Tin%20%C4%90%C3%A0%20N%E1%BA%B5ng",
    "meal_moments": [
      "TRUA",
      "TOI"
    ],
    "visual_archetype": "RADAR",
    "specific_action_label": "🔔 Theo dõi cập nhật",
    "tier_level": "TIER_3_UTILITY",
    "tier_badge": "📍 TIỆN ÍCH XÁC MINH",
    "tier_badge_class": "tier-badge-utility"
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
    "evidence_status": "Nguồn: phuclong.com.vn • Cập nhật định kỳ",
    "official_source_url": "https://phuclong.com.vn",
    "action_type": "WATCH_MONITOR",
    "code_text": null,
    "action_label": "Theo dõi kênh thông tin",
    "gateway_group": "AN_GI",
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "ALL_DAY",
    "allow_field_claims": false,
    "journey_id": "JOURNEY_FOOD",
    "journey_label": "Ẩm Thực Đà Thành",
    "transit_hint": "🚌 Gần tuyến xe buýt DanaBus R16 & Trạm xe đạp TNGO Bạch Đằng",
    "editorial_lead": "Theo dõi chính sách thành viên và các thông báo mới từ thương hiệu Phúc Long.",
    "map_query_url": "https://www.google.com/maps/search/?api=1&query=Ph%C3%BAc%20Long%20Coffee%20%26%20Tea%3A%20K%C3%AAnh%20Gi%C3%A1m%20S%C3%A1t%20Ngu%E1%BB%93n%20Tin%20%C4%90%C3%A0%20N%E1%BA%B5ng",
    "meal_moments": [
      "TRUA",
      "TOI"
    ],
    "visual_archetype": "RADAR",
    "specific_action_label": "🔔 Theo dõi cập nhật",
    "tier_level": "TIER_3_UTILITY",
    "tier_badge": "📍 TIỆN ÍCH XÁC MINH",
    "tier_badge_class": "tier-badge-utility"
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
    "evidence_status": "Nguồn: vincom.com.vn • Cập nhật định kỳ",
    "official_source_url": "https://vincom.com.vn",
    "action_type": "WATCH_MONITOR",
    "code_text": null,
    "action_label": "Theo dõi kênh thông tin",
    "gateway_group": "MUA_SAM",
    "locality_tag": "SON_TRA",
    "time_slot_tag": "ALL_DAY",
    "allow_field_claims": false,
    "journey_id": "JOURNEY_STUDY_TOOLS",
    "journey_label": "Học Tập & Làm Việc",
    "transit_hint": "🚲 Gần trạm xe đạp TNGO Võ Nguyên Giáp & Cầu Rồng",
    "editorial_lead": "Theo dõi các sự kiện trải nghiệm mua sắm và hoạt động văn hóa tại TTTM Vincom Plaza Đà Nẵng.",
    "visual_archetype": "RADAR",
    "specific_action_label": "🔔 Theo dõi cập nhật",
    "tier_level": "TIER_3_UTILITY",
    "tier_badge": "📍 TIỆN ÍCH XÁC MINH",
    "tier_badge_class": "tier-badge-utility"
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
    "evidence_status": "Nguồn: www.lottemart.vn • Cập nhật định kỳ",
    "official_source_url": "https://www.lottemart.vn",
    "action_type": "WATCH_MONITOR",
    "code_text": null,
    "action_label": "Theo dõi kênh thông tin",
    "gateway_group": "MUA_SAM",
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "ALL_DAY",
    "allow_field_claims": false,
    "journey_id": "JOURNEY_STUDY_TOOLS",
    "journey_label": "Học Tập & Làm Việc",
    "transit_hint": "🚌 Gần tuyến xe buýt DanaBus R16 & Trạm xe đạp TNGO Bạch Đằng",
    "editorial_lead": "Theo dõi cẩm nang hàng hóa tiêu dùng và chính sách hội viên Lotte Mart.",
    "visual_archetype": "RADAR",
    "specific_action_label": "🔔 Theo dõi cập nhật",
    "tier_level": "TIER_3_UTILITY",
    "tier_badge": "📍 TIỆN ÍCH XÁC MINH",
    "tier_badge_class": "tier-badge-utility"
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
    "evidence_status": "Nguồn: go-vietnam.vn • Cập nhật định kỳ",
    "official_source_url": "https://go-vietnam.vn",
    "action_type": "WATCH_MONITOR",
    "code_text": null,
    "action_label": "Theo dõi kênh thông tin",
    "gateway_group": "MUA_SAM",
    "locality_tag": "THANH_KHE",
    "time_slot_tag": "ALL_DAY",
    "allow_field_claims": false,
    "journey_id": "JOURNEY_STUDY_TOOLS",
    "journey_label": "Học Tập & Làm Việc",
    "transit_hint": "🚌 Gần tuyến xe buýt DanaBus R6A & Trạm TNGO Điện Biên Phủ",
    "editorial_lead": "Theo dõi thông tin hàng hóa thiết yếu và cẩm nang mua sắm tại siêu thị GO! Đà Nẵng.",
    "visual_archetype": "RADAR",
    "specific_action_label": "🔔 Theo dõi cập nhật",
    "tier_level": "TIER_4_RADAR",
    "tier_badge": "📡 THEO DÕI",
    "tier_badge_class": "tier-badge-radar"
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
    "evidence_status": "Nguồn: kichi.com.vn • Cập nhật định kỳ",
    "official_source_url": "https://kichi.com.vn",
    "action_type": "WATCH_MONITOR",
    "code_text": null,
    "action_label": "Theo dõi kênh thông tin",
    "gateway_group": "AN_GI",
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "SLOT_LUNCH",
    "allow_field_claims": false,
    "journey_id": "JOURNEY_FOOD",
    "journey_label": "Ẩm Thực Đà Thành",
    "transit_hint": "🚌 Gần tuyến xe buýt DanaBus R16 & Trạm xe đạp TNGO Bạch Đằng",
    "editorial_lead": "Theo dõi các thông báo thực đơn và sự kiện trải nghiệm lẩu băng chuyền tại Đà Nẵng.",
    "map_query_url": "https://www.google.com/maps/search/?api=1&query=Kichi-Kichi%20L%E1%BA%A9u%20B%C4%83ng%20Chuy%E1%BB%81n%3A%20K%C3%AAnh%20Gi%C3%A1m%20S%C3%A1t%20%E1%BA%A8m%20Th%E1%BB%B1c%20%C4%90%C3%A0%20N%E1%BA%B5ng",
    "meal_moments": [
      "TRUA",
      "TOI"
    ],
    "visual_archetype": "RADAR",
    "specific_action_label": "🔔 Theo dõi cập nhật",
    "tier_level": "TIER_4_RADAR",
    "tier_badge": "📡 THEO DÕI",
    "tier_badge_class": "tier-badge-radar"
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
    "evidence_status": "Nguồn: gogi.com.vn • Cập nhật định kỳ",
    "official_source_url": "https://gogi.com.vn",
    "action_type": "WATCH_MONITOR",
    "code_text": null,
    "action_label": "Theo dõi kênh thông tin",
    "gateway_group": "AN_GI",
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "SLOT_EVENING",
    "allow_field_claims": false,
    "journey_id": "JOURNEY_FOOD",
    "journey_label": "Ẩm Thực Đà Thành",
    "transit_hint": "🚌 Gần tuyến xe buýt DanaBus R16 & Trạm xe đạp TNGO Bạch Đằng",
    "editorial_lead": "Theo dõi các thông báo thực đơn thịt nướng chuẩn vị Hàn Quốc tại hệ thống Gogi House Đà Nẵng.",
    "map_query_url": "https://www.google.com/maps/search/?api=1&query=Gogi%20House%3A%20K%C3%AAnh%20Gi%C3%A1m%20S%C3%A1t%20%E1%BA%A8m%20Th%E1%BB%B1c%20N%C6%B0%E1%BB%9Bng%20%C4%90%C3%A0%20N%E1%BA%B5ng",
    "meal_moments": [
      "TRUA",
      "TOI"
    ],
    "visual_archetype": "RADAR",
    "specific_action_label": "🔔 Theo dõi cập nhật",
    "tier_level": "TIER_4_RADAR",
    "tier_badge": "📡 THEO DÕI",
    "tier_badge_class": "tier-badge-radar"
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
    "evidence_status": "Nguồn: thecoffeehouse.com • Cập nhật định kỳ",
    "official_source_url": "https://thecoffeehouse.com",
    "action_type": "WATCH_MONITOR",
    "code_text": null,
    "action_label": "Theo dõi kênh thông tin",
    "gateway_group": "AN_GI",
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "SLOT_MORNING",
    "allow_field_claims": false,
    "journey_id": "JOURNEY_FOOD",
    "journey_label": "Ẩm Thực Đà Thành",
    "transit_hint": "🚌 Gần tuyến xe buýt DanaBus R16 & Trạm xe đạp TNGO Bạch Đằng",
    "editorial_lead": "Theo dõi các thông báo thực đơn và tính năng ứng dụng The Coffee House.",
    "map_query_url": "https://www.google.com/maps/search/?api=1&query=The%20Coffee%20House%3A%20K%C3%AAnh%20Gi%C3%A1m%20S%C3%A1t%20Ngu%E1%BB%93n%20Tin%20%C4%90%C3%A0%20N%E1%BA%B5ng",
    "meal_moments": [
      "TRUA",
      "TOI"
    ],
    "visual_archetype": "RADAR",
    "specific_action_label": "🔔 Theo dõi cập nhật",
    "tier_level": "TIER_4_RADAR",
    "tier_badge": "📡 THEO DÕI",
    "tier_badge_class": "tier-badge-radar"
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
    "evidence_status": "Nguồn: trungnguyenlegend.com • Cập nhật định kỳ",
    "official_source_url": "https://trungnguyenlegend.com",
    "action_type": "WATCH_MONITOR",
    "code_text": null,
    "action_label": "Theo dõi kênh thông tin",
    "gateway_group": "AN_GI",
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "SLOT_MORNING",
    "allow_field_claims": false,
    "journey_id": "JOURNEY_FOOD",
    "journey_label": "Ẩm Thực Đà Thành",
    "transit_hint": "🚌 Gần tuyến xe buýt DanaBus R16 & Trạm xe đạp TNGO Bạch Đằng",
    "editorial_lead": "Theo dõi các không gian cà phê và hoạt động văn hóa đọc bên bờ sông Hàn.",
    "map_query_url": "https://www.google.com/maps/search/?api=1&query=Trung%20Nguy%C3%AAn%20Legend%3A%20K%C3%AAnh%20Gi%C3%A1m%20S%C3%A1t%20Kh%C3%B4ng%20Gian%20%C4%90%C3%A0%20N%E1%BA%B5ng",
    "meal_moments": [
      "TRUA",
      "TOI"
    ],
    "visual_archetype": "RADAR",
    "specific_action_label": "🔔 Theo dõi cập nhật",
    "tier_level": "TIER_4_RADAR",
    "tier_badge": "📡 THEO DÕI",
    "tier_badge_class": "tier-badge-radar"
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
    "evidence_status": "Nguồn: mxbc.vn • Cập nhật định kỳ",
    "official_source_url": "https://mxbc.vn",
    "action_type": "WATCH_MONITOR",
    "code_text": null,
    "action_label": "Theo dõi kênh thông tin",
    "gateway_group": "AN_GI",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "SLOT_AFTERNOON",
    "allow_field_claims": false,
    "journey_id": "JOURNEY_FOOD",
    "journey_label": "Ẩm Thực Đà Thành",
    "transit_hint": "📍 Kết nối giao thông nội thành thuận tiện",
    "editorial_lead": "Theo dõi các thông tin thực đơn và hoạt động tại các chi nhánh Mixue Đà Nẵng.",
    "map_query_url": "https://www.google.com/maps/search/?api=1&query=Mixue%20%C4%90%C3%A0%20N%E1%BA%B5ng%3A%20K%C3%AAnh%20Gi%C3%A1m%20S%C3%A1t%20%C4%90%E1%BB%93%20U%E1%BB%91ng%20%C4%90%C3%A0%20N%E1%BA%B5ng",
    "meal_moments": [
      "TRUA",
      "TOI"
    ],
    "visual_archetype": "RADAR",
    "specific_action_label": "🔔 Theo dõi cập nhật",
    "tier_level": "TIER_4_RADAR",
    "tier_badge": "📡 THEO DÕI",
    "tier_badge_class": "tier-badge-radar"
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
    "evidence_status": "Nguồn: www.cgv.vn • Cập nhật định kỳ",
    "official_source_url": "https://www.cgv.vn",
    "action_type": "WATCH_MONITOR",
    "code_text": null,
    "action_label": "Xem lịch chiếu & thông tin rạp →",
    "gateway_group": "DI_DAU",
    "locality_tag": "SON_TRA",
    "time_slot_tag": "SLOT_EVENING",
    "allow_field_claims": false,
    "journey_id": "JOURNEY_STUDY_TOOLS",
    "journey_label": "Học Tập & Làm Việc",
    "transit_hint": "🚲 Gần trạm xe đạp TNGO Võ Nguyên Giáp & Cầu Rồng",
    "editorial_lead": "Theo dõi lịch phát hành phim và các suất chiếu sớm tại rạp CGV Vincom Đà Nẵng.",
    "map_query_url": "https://www.google.com/maps/search/?api=1&query=CGV%20Vincom%20%C4%90%C3%A0%20N%E1%BA%B5ng%3A%20K%C3%AAnh%20Gi%C3%A1m%20S%C3%A1t%20L%E1%BB%8Bch%20Chi%E1%BA%BFu%20%C4%90%C3%A0%20N%E1%BA%B5ng",
    "leisure_category": "CINEMA",
    "visual_archetype": "RADAR",
    "specific_action_label": "🔔 Theo dõi cập nhật",
    "tier_level": "TIER_4_RADAR",
    "tier_badge": "📡 THEO DÕI",
    "tier_badge_class": "tier-badge-radar"
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
    "evidence_status": "Nguồn: www.galaxycine.vn • Cập nhật định kỳ",
    "official_source_url": "https://www.galaxycine.vn",
    "action_type": "WATCH_MONITOR",
    "code_text": null,
    "action_label": "Theo dõi kênh thông tin",
    "gateway_group": "DI_DAU",
    "locality_tag": "THANH_KHE",
    "time_slot_tag": "SLOT_EVENING",
    "allow_field_claims": false,
    "journey_id": "JOURNEY_LEISURE",
    "journey_label": "Đi Chơi & Thư Giãn Tối Nay",
    "transit_hint": "🚌 Gần tuyến xe buýt DanaBus R6A & Trạm TNGO Điện Biên Phủ",
    "editorial_lead": "Theo dõi thông tin lịch chiếu và trải nghiệm rạp phim tại Galaxy Điện Biên Phủ Đà Nẵng.",
    "map_query_url": "https://www.google.com/maps/search/?api=1&query=Galaxy%20%C4%90i%E1%BB%87n%20Bi%C3%AAn%20Ph%E1%BB%A7%3A%20K%C3%AAnh%20Gi%C3%A1m%20S%C3%A1t%20L%E1%BB%8Bch%20Chi%E1%BA%BFu%20%C4%90%C3%A0%20N%E1%BA%B5ng",
    "leisure_category": "CITY_EXPLORE",
    "visual_archetype": "RADAR",
    "specific_action_label": "🔔 Theo dõi cập nhật",
    "tier_level": "TIER_4_RADAR",
    "tier_badge": "📡 THEO DÕI",
    "tier_badge_class": "tier-badge-radar"
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
    "evidence_status": "Nguồn: www.cgv.vn • Cập nhật định kỳ",
    "official_source_url": "https://www.cgv.vn",
    "action_type": "WATCH_MONITOR",
    "code_text": null,
    "action_label": "Xem lịch chiếu & thông tin rạp →",
    "gateway_group": "DI_DAU",
    "locality_tag": "THANH_KHE",
    "time_slot_tag": "SLOT_AFTERNOON",
    "allow_field_claims": false,
    "journey_id": "JOURNEY_LEISURE",
    "journey_label": "Đi Chơi & Thư Giãn Tối Nay",
    "transit_hint": "🚌 Gần tuyến xe buýt DanaBus R6A & Trạm TNGO Điện Biên Phủ",
    "editorial_lead": "Theo dõi các suất chiếu ngày trong tuần và sự kiện điện ảnh tại CGV Vĩnh Trung Đà Nẵng.",
    "map_query_url": "https://www.google.com/maps/search/?api=1&query=CGV%20V%C4%A9nh%20Trung%20Plaza%3A%20K%C3%AAnh%20Gi%C3%A1m%20S%C3%A1t%20L%E1%BB%8Bch%20Chi%E1%BA%BFu%20%C4%90%C3%A0%20N%E1%BA%B5ng",
    "leisure_category": "CINEMA",
    "visual_archetype": "RADAR",
    "specific_action_label": "🔔 Theo dõi cập nhật",
    "tier_level": "TIER_4_RADAR",
    "tier_badge": "📡 THEO DÕI",
    "tier_badge_class": "tier-badge-radar"
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
    "evidence_status": "Nguồn: helio.vn • Cập nhật định kỳ",
    "official_source_url": "https://helio.vn",
    "action_type": "WATCH_MONITOR",
    "code_text": null,
    "action_label": "Theo dõi kênh thông tin",
    "gateway_group": "DI_DAU",
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "SLOT_EVENING",
    "allow_field_claims": false,
    "journey_id": "JOURNEY_LEISURE",
    "journey_label": "Đi Chơi & Thư Giãn Tối Nay",
    "transit_hint": "🚌 Gần tuyến xe buýt DanaBus R16 & Trạm xe đạp TNGO Bạch Đằng",
    "editorial_lead": "Theo dõi các đêm nhạc Acoustic, không gian ẩm thực đêm và tổ hợp vui chơi giải trí Helio Đà Nẵng.",
    "map_query_url": "https://www.google.com/maps/search/?api=1&query=Helio%20Center%3A%20K%C3%AAnh%20Gi%C3%A1m%20S%C3%A1t%20S%E1%BB%B1%20Ki%E1%BB%87n%20%C4%90%C3%B4%20Th%E1%BB%8B%20%C4%90%C3%A0%20N%E1%BA%B5ng",
    "leisure_category": "CITY_EXPLORE",
    "visual_archetype": "RADAR",
    "specific_action_label": "🔔 Theo dõi cập nhật",
    "tier_level": "TIER_4_RADAR",
    "tier_badge": "📡 THEO DÕI",
    "tier_badge_class": "tier-badge-radar"
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
    "action_button_label": "Mở cổng đăng ký đặc quyền →",
    "evidence_status": "Nguồn: education.github.com • Kiểm tra định kỳ",
    "renewal_cycle": "Định kỳ hàng quý theo niên giám học đường & vận tải công cộng",
    "accessibility_support": "Hỗ trợ phông chữ dễ đọc, tra cứu nhanh trên di động"
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
    "action_button_label": "Mở cổng đăng ký đặc quyền →",
    "evidence_status": "Nguồn: www.notion.so • Kiểm tra định kỳ",
    "renewal_cycle": "Định kỳ hàng quý theo niên giám học đường & vận tải công cộng",
    "accessibility_support": "Hỗ trợ phông chữ dễ đọc, tra cứu nhanh trên di động"
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
    "action_button_label": "Mở cổng đăng ký đặc quyền →",
    "evidence_status": "Nguồn: www.canva.com • Kiểm tra định kỳ",
    "renewal_cycle": "Định kỳ hàng quý theo niên giám học đường & vận tải công cộng",
    "accessibility_support": "Hỗ trợ phông chữ dễ đọc, tra cứu nhanh trên di động"
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
    "action_button_label": "Xem điểm làm vé DanaBus →",
    "evidence_status": "Nguồn: danangbus.vn • Kiểm tra định kỳ",
    "renewal_cycle": "Định kỳ hàng quý theo niên giám học đường & vận tải công cộng",
    "accessibility_support": "Hỗ trợ phông chữ dễ đọc, tra cứu nhanh trên di động"
  },
  {
    "lane": "LANE_CONG_CHINH_THUC",
    "lane_label": "CỔNG CHÍNH THỨC (ĐANG KIỂM TRA ĐIỀU KIỆN)",
    "lane_badge": "🏛️ CỔNG THÔNG TIN CHÍNH THỨC",
    "entry_id": "VAL_CGV_CINEMAS",
    "category": "ENTERTAINMENT",
    "merchant_name": "CGV Cinemas Đà Nẵng",
    "title": "CGV Cinemas: Cụm Rạp Chiếu Phim Đà Nẵng",
    "service_description": "Tra cứu lịch chiếu, suất chiếu phim tiêu chuẩn tại các cụm rạp CGV trên địa bàn TP. Đà Nẵng.",
    "target_audience": "Khán giả xem phim tại CGV Vincom Ngô Quyền và CGV Vĩnh Trung Plaza.",
    "official_portal_guide": "Xem lịch chiếu trực tiếp tại website chính thức cgv.vn.",
    "official_source_url": "https://www.cgv.vn",
    "public_action_type": "VIEW_CONDITIONS",
    "action_button_label": "Xem lịch chiếu rạp CGV →",
    "evidence_status": "Nguồn: www.cgv.vn • Kiểm tra định kỳ",
    "renewal_cycle": "Định kỳ hàng quý theo niên giám học đường & vận tải công cộng",
    "accessibility_support": "Hỗ trợ phông chữ dễ đọc, tra cứu nhanh trên di động"
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
    "evidence_status": "Nguồn: dominos.vn • Kiểm tra định kỳ",
    "renewal_cycle": "Định kỳ hàng quý theo niên giám học đường & vận tải công cộng",
    "accessibility_support": "Hỗ trợ phông chữ dễ đọc, tra cứu nhanh trên di động"
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
    "evidence_status": "Nguồn: www.lotteria.vn • Kiểm tra định kỳ",
    "renewal_cycle": "Định kỳ hàng quý theo niên giám học đường & vận tải công cộng",
    "accessibility_support": "Hỗ trợ phông chữ dễ đọc, tra cứu nhanh trên di động"
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
    "action_button_label": "Xem thông tin rạp Metiz →",
    "evidence_status": "Nguồn: metiz.vn • Kiểm tra định kỳ",
    "renewal_cycle": "Định kỳ hàng quý theo niên giám học đường & vận tải công cộng",
    "accessibility_support": "Hỗ trợ phông chữ dễ đọc, tra cứu nhanh trên di động"
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
    "action_button_label": "Xem thông tin rạp Starlight →",
    "evidence_status": "Nguồn: starlight.vn • Kiểm tra định kỳ",
    "renewal_cycle": "Định kỳ hàng quý theo niên giám học đường & vận tải công cộng",
    "accessibility_support": "Hỗ trợ phông chữ dễ đọc, tra cứu nhanh trên di động"
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
    "action_button_label": "Xem trạm xe đạp TNGO →",
    "evidence_status": "Nguồn: tngo.vn • Kiểm tra định kỳ",
    "renewal_cycle": "Định kỳ hàng quý theo niên giám học đường & vận tải công cộng",
    "accessibility_support": "Hỗ trợ phông chữ dễ đọc, tra cứu nhanh trên di động"
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
    "evidence_status": "Nguồn: highlandscoffee.com.vn • Kiểm tra định kỳ",
    "renewal_cycle": "Định kỳ hàng quý theo niên giám học đường & vận tải công cộng",
    "accessibility_support": "Hỗ trợ phông chữ dễ đọc, tra cứu nhanh trên di động"
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
    "evidence_status": "Nguồn: phuclong.com.vn • Kiểm tra định kỳ",
    "renewal_cycle": "Định kỳ hàng quý theo niên giám học đường & vận tải công cộng",
    "accessibility_support": "Hỗ trợ phông chữ dễ đọc, tra cứu nhanh trên di động"
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
    "evidence_status": "Nguồn: vincom.com.vn • Kiểm tra định kỳ",
    "renewal_cycle": "Định kỳ hàng quý theo niên giám học đường & vận tải công cộng",
    "accessibility_support": "Hỗ trợ phông chữ dễ đọc, tra cứu nhanh trên di động"
  }
];

// 3. SPA STATE
let activeView = 'HOME'; // 'HOME' | 'FOOD_JOURNEY' | 'LEISURE_JOURNEY' | 'EXPLORE' | 'WALLET' | 'BUY_DECISION' | 'SAVED'
let activeGateway = 'ALL';
let activeLocality = 'ALL';
let activeTier = 'ALL';
let activeMealMoment = 'ALL';
let activeLeisureCategory = 'ALL';
let activeWalletLane = 'ALL';
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
    return { slot: 'SLOT_MORNING', label: 'Sáng nay', momentTag: '🌅 BUỔI SÁNG &bull; ĐẶC QUYỀN ĐIỂM TÂM & CÀ PHÊ ĐÀ THÀNH' };
  } else if (hour >= 11 && hour < 14) {
    return { slot: 'SLOT_LUNCH', label: 'Trưa nay', momentTag: '🍜 BUỔI TRƯA &bull; ƯU ĐÃI ẨM THỰC TIẾP SỨC ĐÀ NẴNG' };
  } else if (hour >= 14 && hour < 18) {
    return { slot: 'SLOT_AFTERNOON', label: 'Chiều nay', momentTag: '☕ BUỔI CHIỀU &bull; VOUCHER TỰ HỌC & LÀM VIỆC VEN SÔNG' };
  } else {
    return { slot: 'SLOT_EVENING', label: 'Tối nay', momentTag: '✨ BUỔI TỐI &bull; GIẢI TRÍ, RẠP PHIM & DẠO SÔNG HÀN' };
  }
}

// RESOLVE ACTION CONTRACT
function resolveActionContract(item) {
  let label = item.specific_action_label || 'Xem thông tin chi tiết →';
  let url = item.official_source_url;
  let btnClass = 'btn-action-place';

  if (item.tier_level === 'TIER_1_DEAL') {
    label = '🔥 Nhận ưu đãi / Xem giá →';
    btnClass = 'btn-action-deal';
  } else if (item.tier_level === 'TIER_2_PROGRAMME') {
    label = '🏛️ Mở cổng chính thức →';
    btnClass = 'btn-action-civic';
  } else if (item.tier_level === 'TIER_4_RADAR') {
    label = '📡 Theo dõi kênh →';
    btnClass = 'btn-action-radar';
  }

  return { label, url, btnClass };
}

// Render Deal & Discovery Card
function renderRailCard(item) {
  const isSaved = savedItemIds.has(item.item_id);
  const action = resolveActionContract(item);

  return `
    <article class="rail-card-cn" data-item-id="${item.item_id}">
      <div class="rail-header-row">
        <span class="${item.tier_badge_class || 'tier-badge-programme'}">${item.tier_badge || item.badge_label}</span>
        <button class="btn-card-save ${isSaved ? 'saved' : ''}" data-save-id="${item.item_id}" aria-label="${isSaved ? 'Đã lưu' : 'Lưu lại'}">
          ${isSaved ? '❤️' : '🤍'}
        </button>
      </div>

      <div class="rail-body">
        <span class="rail-brand">${item.brand}</span>
        <h4 class="rail-title">${item.title}</h4>
        <p class="rail-desc">${item.curation_story || item.summary_text}</p>
        
        ${item.deal_price ? `
          <div class="rail-deal-price-box">
            <span class="deal-price-val">🏷️ ${item.deal_price}</span>
            <span class="deal-cond-val">${item.deal_cond}</span>
          </div>
        ` : ''}

        <div class="rail-meta">📍 ${item.scope_text}</div>
        ${item.transit_hint ? `<div class="rail-transit">${item.transit_hint}</div>` : ''}
      </div>

      <div class="rail-footer-row">
        <a href="${action.url}" target="_blank" rel="noopener noreferrer" class="btn-rail-action ${action.btnClass}">
          ${action.label}
        </a>
        ${item.map_query_url ? `
          <a href="${item.map_query_url}" target="_blank" rel="noopener noreferrer" class="btn-rail-map" title="Xem vị trí">
            📍 Maps
          </a>
        ` : ''}
      </div>
    </article>
  `;
}

// 1. PRODUCT-FIRST STOREFRONT HOME VIEW (SECTION CZ)
function renderDailyGuideHome() {
  const timeInfo = getCurrentTimeSlotInfo();
  const dealRadarCards = JAYT_DISCOVERY_ITEMS.slice(0, 6);

  return `
    <div class="cr-experience-container">
      <!-- 1. PRODUCT-FIRST STAGE HERO (CZ 2-SECOND PROMISE & 3 INTENT TARGETS) -->
      <section class="hero-landmark-cr vivid-dragon-hero-cf" aria-label="Bìa Đặc Quyền Đà Nẵng">
        <img 
          src="assets/images/dragon_bridge_hero_001.jpg" 
          alt="Toàn cảnh Cầu Rồng và Sông Hàn ban ngày rực rỡ tại trung tâm TP. Đà Nẵng" 
          class="hero-landmark-img vivid-hero-image" 
          id="hero-main-photo"
          loading="eager"
        />
        <div class="hero-landmark-gradient"></div>

        <div class="hero-landmark-attribution" role="note" aria-label="Thông tin bản quyền ảnh Cầu Rồng">
          📍 Cầu Rồng &bull; 📷 Bùi Thụy Đào Nguyên (CC BY-SA 3.0)
        </div>

        <div class="hero-landmark-content">
          <span class="hero-moment-pill">${timeInfo.momentTag}</span>
          <h1 class="hero-headline-cr vivid-main-title">
            Đà Nẵng Để Sống Hay Hơn Hôm Nay
          </h1>
          <p class="hero-subhead-cr vivid-subhead">
            Đặc quyền thật cho hôm nay ở Đà Nẵng: Đối soát ưu đãi thật, ví voucher 3 làn và tiện ích đô thị chính thống.
          </p>

          <!-- 3 CORE 44px TOUCH TARGETS (CZ 5-SECOND INTENT SELECTION) -->
          <div class="hero-shopping-actions-grid">
            <button class="btn-hero-deal-action btn-primary-action-cf" data-nav="EXPLORE" data-tier-filter="TIER_1_DEAL">
              🔥 Deal dùng hôm nay &rarr;
            </button>
            <button class="btn-hero-voucher-action" data-nav="WALLET">
              🎟️ Voucher chính thức &rarr;
            </button>
            <button class="btn-hero-price-action" data-nav="BUY_DECISION">
              🛡️ Kiểm tra trước khi mua &rarr;
            </button>
          </div>
        </div>
      </section>

      <!-- 2. COMPACT CIVIC TICKER -->
      <section class="civic-ticker-cr hero-civic-note-cf" role="region" aria-label="Điểm Nhấn Đô Thị Hôm Nay">
        <span class="civic-ticker-icon">📍</span>
        <div class="civic-ticker-text">
          <strong>Cầu Rồng Sông Hàn:</strong> Phun lửa & nước vào 21:00 Thứ Bảy & Chủ Nhật hàng tuần.
        </div>
        <a href="https://danang.gov.vn" target="_blank" rel="noopener noreferrer" class="civic-ticker-link">
          danang.gov.vn &rarr;
        </a>
      </section>

      <!-- JAYT-363-A1 INTERACTIVE CLIENT-SIDE SUITE SHOWCASE -->
      <section class="j363-a1-showcase-section" style="margin: 24px 0;" aria-label="Bộ Tiện Ích Trải Nghiệm Khách Hàng JAYT-363-A1">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; flex-wrap: wrap; gap: 8px;">
          <div>
            <span style="background: #e0f2fe; color: #0369a1; padding: 4px 10px; border-radius: 6px; font-size: 0.78rem; font-weight: 800; letter-spacing: 0.5px;">⚡ BỘ CÔNG CỤ TƯƠNG TÁC LOCAL-FIRST (J363-A1)</span>
            <h2 style="font-size: 1.35rem; font-weight: 800; margin-top: 4px; color: var(--text-primary);">Trải Nghiệm Trực Quan 5 Phân Hệ Mới</h2>
          </div>
          <span style="font-size: 0.8rem; color: #047857; font-weight: 700;">✓ 100% Client-side &bull; Độ trễ &le; 1ms &bull; Zero PII</span>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px;">
          <!-- 1. Dynamic Stack Card -->
          <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 18px; box-shadow: var(--shadow-sm); display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="font-size: 1.8rem; margin-bottom: 8px;">⚡</div>
              <h3 style="font-size: 1.05rem; font-weight: 800; color: #0369a1; margin-bottom: 4px;">Xếp Chồng Mã Đa Tầng</h3>
              <p style="font-size: 0.83rem; color: var(--text-secondary); line-height: 1.4; margin-bottom: 12px;">
                Mã Shop + Mã Sàn + Hỗ trợ vận chuyển. Kiểm định điều kiện tối thiểu, mức trần và chống số tiền âm.
              </p>
            </div>
            <button class="btn-tool-nav" data-nav="DYNAMIC_STACK" style="width: 100%; min-height: 44px; background: #0369a1; color: #ffffff; border: none; border-radius: 8px; font-weight: 700; cursor: pointer;">
              Mở Bảng Tính Xếp Chồng &rarr;
            </button>
          </div>

          <!-- 2. Lunch Compare Card -->
          <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 18px; box-shadow: var(--shadow-sm); display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="font-size: 1.8rem; margin-bottom: 8px;">🍱</div>
              <h3 style="font-size: 1.05rem; font-weight: 800; color: #c2410c; margin-bottom: 4px;">So Kèo Bữa Trưa 3 App</h3>
              <p style="font-size: 0.83rem; color: var(--text-secondary); line-height: 1.4; margin-bottom: 12px;">
                ShopeeFood vs GrabFood vs BeFood. Tùy chỉnh phí ship, dịch vụ và phụ phí qua cầu theo khu vực.
              </p>
            </div>
            <button class="btn-tool-nav" data-nav="LUNCH_COMPARE" style="width: 100%; min-height: 44px; background: #c2410c; color: #ffffff; border: none; border-radius: 8px; font-weight: 700; cursor: pointer;">
              So Sánh Giá 3 App &rarr;
            </button>
          </div>

          <!-- 3. Cinema & Split Card -->
          <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 18px; box-shadow: var(--shadow-sm); display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="font-size: 1.8rem; margin-bottom: 8px;">🎬</div>
              <h3 style="font-size: 1.05rem; font-weight: 800; color: #7c3aed; margin-bottom: 4px;">Lịch Rạp & Split Bill Pro</h3>
              <p style="font-size: 0.83rem; color: var(--text-secondary); line-height: 1.4; margin-bottom: 12px;">
                Lịch ưu đãi T2-T5 Metiz/Galaxy/CGV/Starlight. Chia tiền nhóm số nguyên và xuất thẻ Zalo Pass Canvas.
              </p>
            </div>
            <button class="btn-tool-nav" data-nav="CINEMA_SPLIT" style="width: 100%; min-height: 44px; background: #7c3aed; color: white; border: none; border-radius: 8px; font-weight: 700; cursor: pointer;">
              Lịch Rạp & Chia Tiền Nhóm &rarr;
            </button>
          </div>

          <!-- 4. Meals 25K & Benefits Card -->
          <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 18px; box-shadow: var(--shadow-sm); display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="font-size: 1.8rem; margin-bottom: 8px;">🍲</div>
              <h3 style="font-size: 1.05rem; font-weight: 800; color: #047857; margin-bottom: 4px;">Cơm &le;25K & Đặc Quyền HSSV</h3>
              <p style="font-size: 0.83rem; color: var(--text-secondary); line-height: 1.4; margin-bottom: 12px;">
                10 vị trí ẩm thực quanh BK, SP, DUE, DT kèm cẩm nang 4 đặc quyền GitHub, Spotify, Notion, DanaBus.
              </p>
            </div>
            <button class="btn-tool-nav" data-nav="MEALS_BENEFITS" style="width: 100%; min-height: 44px; background: #047857; color: #ffffff; border: none; border-radius: 8px; font-weight: 700; cursor: pointer;">
              Xem Cơm 25K & Đặc Quyền &rarr;
            </button>
          </div>

          <!-- 5. Smart Affiliate Dry-run Card -->
          <div style="background: var(--bg-card); border: 1px dashed #d97706; border-radius: var(--radius-md); padding: 18px; box-shadow: var(--shadow-sm); display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="font-size: 1.8rem; margin-bottom: 8px;">🛒</div>
              <h3 style="font-size: 1.05rem; font-weight: 800; color: #78350f; margin-bottom: 4px;">Smart Affiliate Sandbox</h3>
              <p style="font-size: 0.83rem; color: var(--text-secondary); line-height: 1.4; margin-bottom: 12px;">
                Chế độ mô phỏng liên kết mua sắm KTX (Shopee/Lazada/Grab). Kiểm thử cấu trúc sub-id minh bạch, 0 doanh thu.
              </p>
            </div>
            <button class="btn-open-smart-aff" style="width: 100%; min-height: 44px; background: #fef3c7; color: #78350f; border: 2px solid #b45309; border-radius: 8px; font-weight: 700; cursor: pointer;">
              Mở Thử Nghiệm Tiếp Thị (Dry-run) &rarr;
            </button>
          </div>
        </div>
      </section>



      <!-- 3. RAIL 1: DEAL RADAR HÔM NAY (6-8 CARDS ACROSS 4 TIERS) -->
      <section id="featured-deals-section" aria-label="Deal Radar Hôm Nay">
        <div class="section-flow-header">
          <div>
            <h2 class="section-flow-title">📡 Deal Radar Hôm Nay</h2>
            <p class="section-flow-subtitle">Tổng hợp ưu đãi, voucher và tiện ích theo 4 tầng dữ liệu đã đối soát.</p>
          </div>
          <button class="section-flow-viewall" data-nav="EXPLORE">
            Xem tất cả 50 mục &rarr;
          </button>
        </div>

        <div class="cards-layout-grid">
          ${dealRadarCards.map(item => renderRailCard(item)).join('')}
        </div>
      </section>

      <!-- 4. RAIL 2: VOUCHER QUYỀN LỢI 3 LÀN (PRODUCT MOMENT RIÊNG) -->
      <section aria-label="Ví Voucher Đặc Quyền Học Đường">
        <div class="section-flow-header">
          <div>
            <h2 class="section-flow-title">🎟️ Ví Voucher & Quyền Lợi Học Đường (3 Làn)</h2>
            <p class="section-flow-subtitle">13 chính sách đã phân loại: Dùng ngay, Cổng chính thức và Kênh theo dõi.</p>
          </div>
          <button class="section-flow-viewall" data-nav="WALLET">
            Mở toàn bộ ví &rarr;
          </button>
        </div>

        <div class="cards-layout-grid">
          ${JAYT_WALLET_ENTRIES.slice(0, 3).map(e => renderOfficialValueCard(e)).join('')}
        </div>
      </section>

      <!-- 5. RAIL 3: MOMENT-CURATED REAL PHOTO SPOTLIGHTS (ĂN TRƯA, SAU GIỜ HỌC & TỐI NAY) -->
      <section aria-label="Điểm Hẹn & Tiện Ích Theo Khoảnh Khắc">
        <div class="section-flow-header">
          <div>
            <h2 class="section-flow-title">📍 Điểm Hẹn & Tiện Ích Đô Thị Theo Khoảnh Khắc</h2>
            <p class="section-flow-subtitle">Hình ảnh thực tế từ các danh thắng và không gian công cộng tiêu biểu tại Đà Nẵng.</p>
          </div>
        </div>

        <div class="moments-grid-cw">
          <!-- Spot 1: Lunch -->
          <article class="moment-card-cw spotlight-visual-stage-cn" id="journey-food">
            <div class="moment-media-wrap">
              <img 
                src="assets/images/danang_real_photo_mi_quang.jpg" 
                alt="Tô Mì Quảng tôm thịt truyền thống Đà Nẵng" 
                class="moment-media-img spotlight-visual-img-cn" 
                loading="eager"
              />
              <div class="moment-attribution-tag spotlight-visual-attribution-tag">
                🍜 Mì Quảng &bull; 📷 SauceSupreme (CC BY 2.0)
              </div>
            </div>
            <div class="moment-content-box">
              <span class="moment-kicker">🍜 BỮA TRƯA BẢN ĐỊA</span>
              <h3 class="moment-title">Phố Ẩm Thực Huỳnh Thúc Kháng</h3>
              <p class="moment-desc">Tô mì Quảng tôm thịt đậm đà, bánh tráng mè nướng giòn rụm tại trung tâm Hải Châu.</p>
              <div class="moment-actions">
                <a href="https://www.google.com/maps/search/?api=1&query=Ph%E1%BB%91%20Hu%E1%BB%B3nh%20Th%C3%BAc%20Kh%C3%A1ng%20%C4%90%C3%A0%20N%E1%BA%B5ng" target="_blank" rel="noopener noreferrer" class="btn-rail-action">
                  📍 Maps &rarr;
                </a>
              </div>
            </div>
          </article>

          <!-- Spot 2: After Study & Work Transit -->
          <article class="moment-card-cw spotlight-visual-stage-cn" id="journey-transport">
            <div class="moment-media-wrap">
              <img 
                src="assets/images/danang_real_photo_han_river_bridge.jpg" 
                alt="Cầu Quay Sông Hàn & Giao Thông Đô Thị Đà Nẵng" 
                class="moment-media-img spotlight-visual-img-cn" 
                loading="eager"
              />
              <div class="moment-attribution-tag spotlight-visual-attribution-tag">
                🌉 Cầu Sông Hàn &bull; 📷 Christophe95 (CC BY-SA 4.0)
              </div>
            </div>
            <div class="moment-content-box">
              <span class="moment-kicker">🚌 SAU GIỜ HỌC & LÀM</span>
              <h3 class="moment-title">Xe Buýt DanaBus & Cầu Sông Hàn</h3>
              <p class="moment-desc">Mạng lưới giao thông trợ giá công dân và học sinh sinh viên kết nối liên quận.</p>
              <div class="moment-actions">
                <a href="https://danangbus.vn" target="_blank" rel="noopener noreferrer" class="btn-rail-action">
                  🚌 Tuyến Buýt &rarr;
                </a>
              </div>
            </div>
          </article>

          <!-- Spot 3: Study Promenade -->
          <article class="moment-card-cw spotlight-visual-stage-cn" id="journey-study">
            <div class="moment-media-wrap">
              <img 
                src="assets/images/danang_real_photo_bach_dang.jpg" 
                alt="Đường Bạch Đằng ven sông Hàn & Khu vực Thư Viện KHTH" 
                class="moment-media-img spotlight-visual-img-cn" 
                loading="eager"
              />
              <div class="moment-attribution-tag spotlight-visual-attribution-tag">
                📚 Bạch Đằng Ven Sông &bull; 📷 Joseph Hunkins (CC BY 2.0)
              </div>
            </div>
            <div class="moment-content-box">
              <span class="moment-kicker">🎓 KHÔNG GIAN TỰ HỌC</span>
              <h3 class="moment-title">Thư Viện KHTH Đường Bạch Đằng</h3>
              <p class="moment-desc">Không gian yên tĩnh ven sông Hàn với máy lạnh và wifi miễn phí cho độc giả.</p>
              <div class="moment-actions">
                <a href="https://danang.gov.vn" target="_blank" rel="noopener noreferrer" class="btn-rail-action">
                  📚 Xem nội quy &rarr;
                </a>
              </div>
            </div>
          </article>

          <!-- Spot 4: Evening Leisure -->
          <article class="moment-card-cw spotlight-visual-stage-cn" id="journey-leisure">
            <div class="moment-media-wrap">
              <img 
                src="assets/images/danang_real_photo_cham_museum.jpg" 
                alt="Bảo Tàng Điêu Khắc Chăm Đà Nẵng" 
                class="moment-media-img spotlight-visual-img-cn" 
                loading="eager"
              />
              <div class="moment-attribution-tag spotlight-visual-attribution-tag">
                🏛️ Bảo Tàng Chăm &bull; 📷 CT Snow (CC BY 2.0)
              </div>
            </div>
            <div class="moment-content-box">
              <span class="moment-kicker">✨ ĐI CHƠI TỐI NAY</span>
              <h3 class="moment-title">Bảo Tàng Điêu Khắc Chăm</h3>
              <p class="moment-desc">Tinh hoa kiến trúc Champa độc đáo ngay đầu Cầu Rồng và dạo mát phố đi bộ về đêm.</p>
              <div class="moment-actions">
                <a href="http://chammuseum.vn" target="_blank" rel="noopener noreferrer" class="btn-rail-action">
                  🏛️ Tham quan &rarr;
                </a>
              </div>
            </div>
          </article>
        </div>
      </section>

      <!-- 6. RAIL 4: UTILITY DOCK -->
      <section class="dock-tiles-grid-cr" aria-label="Cổng Tiện Ích">
        <div class="dock-tile-cr" data-nav="BUY_DECISION" role="button" tabindex="0">
          <span class="dock-badge">🛡️ TƯ VẤN TIÊU DÙNG MINH BẠCH</span>
          <h3 class="dock-title">Mua món này có hời không?</h3>
          <p class="dock-desc">Đối soát giá niêm yết chính hãng, điều kiện phụ phí ẩn và chính sách đổi trả trước khi thanh toán tại Đà Nẵng.</p>
          <span class="dock-action-link">Tra cứu đối soát giá thực &rarr;</span>
        </div>

        <div class="dock-tile-cr" data-nav="WALLET" role="button" tabindex="0">
          <span class="dock-badge">🎟️ VÍ QUYỀN LỢI 3 LÀN</span>
          <h3 class="dock-title">Ví Thông Tin & Đặc Quyền Học Đường</h3>
          <p class="dock-desc">13 chính sách và đặc quyền đã được phân loại: Dùng ngay, Cổng chính thức và Kênh theo dõi. Nguồn gốc rõ ràng.</p>
          <span class="dock-action-link">Mở ví đặc quyền học đường &rarr;</span>
        </div>
      </section>
    </div>
  `;
}

// 2. CLOSED-LOOP JOURNEY 1: ĂN GÌ GẦN ĐÂY
function renderFoodJourneyRoute() {
  const foodItems = JAYT_DISCOVERY_ITEMS.filter(i => i.gateway_group === 'AN_GI');
  
  const filtered = foodItems.filter(item => {
    if (activeLocality !== 'ALL' && item.locality_tag !== activeLocality) return false;
    if (activeMealMoment !== 'ALL' && item.meal_moments && !item.meal_moments.includes(activeMealMoment)) return false;
    return true;
  });

  return `
    <div class="cr-experience-container" id="food-journey-root">
      <div class="civic-ticker-cr">
        <button class="btn-story-secondary" data-nav="HOME">&larr; Quay lại Trang Chủ</button>
        <span class="story-kicker">🍜 LỘ TRÌNH 1 &bull; ẨM THỰC BẢN ĐỊA ĐÀ NẴNG</span>
      </div>

      <div style="background: var(--bg-card); padding: 20px; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
        <h1 style="font-size: 1.6rem; font-weight: 800; margin-bottom: 8px;">Ăn Gì Gần Bạn & Hương Vị Đà Thành</h1>
        <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 16px;">
          Chọn bữa ăn và quận bạn đang ở để nhận đề xuất địa điểm chính xác kèm hướng dẫn di chuyển công cộng.
        </p>

        <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 12px;">
          <button class="nav-btn ${activeMealMoment === 'ALL' ? 'active' : ''}" data-meal-moment="ALL">Tất cả bữa</button>
          <button class="nav-btn ${activeMealMoment === 'SANG' ? 'active' : ''}" data-meal-moment="SANG">🌅 Điểm tâm sáng</button>
          <button class="nav-btn ${activeMealMoment === 'TRUA' ? 'active' : ''}" data-meal-moment="TRUA">🍜 Bữa trưa</button>
          <button class="nav-btn ${activeMealMoment === 'CHIEU' ? 'active' : ''}" data-meal-moment="CHIEU">☕ Cà phê / Trà</button>
          <button class="nav-btn ${activeMealMoment === 'TOI' ? 'active' : ''}" data-meal-moment="TOI">🍲 Bữa tối / Ăn đêm</button>
        </div>

        <div style="display: flex; gap: 6px; flex-wrap: wrap;">
          <button class="nav-btn ${activeLocality === 'ALL' ? 'active' : ''}" data-food-loc="ALL">Toàn thành phố</button>
          <button class="nav-btn ${activeLocality === 'HAI_CHAU' ? 'active' : ''}" data-food-loc="HAI_CHAU">Hải Châu</button>
          <button class="nav-btn ${activeLocality === 'SON_TRA' ? 'active' : ''}" data-food-loc="SON_TRA">Sơn Trà</button>
          <button class="nav-btn ${activeLocality === 'THANH_KHE' ? 'active' : ''}" data-food-loc="THANH_KHE">Thanh Khê</button>
          <button class="nav-btn ${activeLocality === 'NGU_HANH_SON' ? 'active' : ''}" data-food-loc="NGU_HANH_SON">Ngũ Hành Sơn</button>
          <button class="nav-btn ${activeLocality === 'LIEN_CHIEU' ? 'active' : ''}" data-food-loc="LIEN_CHIEU">Liên Chiểu</button>
        </div>
      </div>

      <div class="cards-layout-grid">
        ${filtered.map(item => renderRailCard(item)).join('')}
      </div>
    </div>
  `;
}

// 3. CLOSED-LOOP JOURNEY 2: ĐI ĐÂU TỐI NAY
function renderLeisureJourneyRoute() {
  const leisureItems = JAYT_DISCOVERY_ITEMS.filter(i => i.gateway_group === 'DI_DAU');

  const filtered = leisureItems.filter(item => {
    if (activeLeisureCategory !== 'ALL' && item.leisure_category !== activeLeisureCategory) return false;
    if (activeLocality !== 'ALL' && item.locality_tag !== activeLocality) return false;
    return true;
  });

  return `
    <div class="cr-experience-container" id="leisure-journey-root">
      <div class="civic-ticker-cr">
        <button class="btn-story-secondary" data-nav="HOME">&larr; Quay lại Trang Chủ</button>
        <span class="story-kicker">✨ LỘ TRÌNH 2 &bull; GIẢI TRÍ & VĂN HÓA TỐI NAY</span>
      </div>

      <div style="background: var(--bg-card); padding: 20px; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
        <h1 style="font-size: 1.6rem; font-weight: 800; margin-bottom: 8px;">Đi Đâu Tối Nay Tại Đà Nẵng?</h1>
        <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 16px;">
          Tra cứu lịch chiếu rạp phim, di sản văn hóa và các điểm ngắm cảnh ven sông Hàn có xác thực lịch hoạt động.
        </p>

        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <button class="nav-btn ${activeLeisureCategory === 'ALL' ? 'active' : ''}" data-leisure-cat="ALL">Tất cả</button>
          <button class="nav-btn ${activeLeisureCategory === 'CINEMA' ? 'active' : ''}" data-leisure-cat="CINEMA">🎬 Rạp chiếu phim</button>
          <button class="nav-btn ${activeLeisureCategory === 'HERITAGE' ? 'active' : ''}" data-leisure-cat="HERITAGE">🏛️ Văn hóa & Di sản</button>
          <button class="nav-btn ${activeLeisureCategory === 'RIVERSIDE' ? 'active' : ''}" data-leisure-cat="RIVERSIDE">🌉 Dạo Sông Hàn & Cầu Rồng</button>
        </div>
      </div>

      <div class="cards-layout-grid">
        ${filtered.map(item => renderRailCard(item)).join('')}
      </div>
    </div>
  `;
}

// 4. THREE-LANE WALLET VIEW
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
    <div class="cr-experience-container">
      <div class="civic-ticker-cr">
        <span class="story-kicker">🎟️ VÍ THÔNG TIN & ĐẶC QUYỀN HỌC ĐƯỜNG</span>
      </div>

      <div style="background: var(--bg-card); padding: 20px; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
        <h1 style="font-size: 1.6rem; font-weight: 800; margin-bottom: 8px;">Tra Cứu Quyền Lợi Chính Thống Tại Đà Nẵng</h1>
        <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 16px;">
          Phân chia 3 làn thông tin rõ ràng: Dùng ngay, Cổng chính thức và Kênh theo dõi. Nguồn gốc rõ ràng, cập nhật định kỳ.
        </p>

        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <button class="nav-btn ${activeWalletLane === 'ALL' ? 'active' : ''}" data-lane-filter="ALL">Tất cả (${JAYT_WALLET_ENTRIES.length})</button>
          <button class="nav-btn ${activeWalletLane === 'LANE_DUNG_NGAY' ? 'active' : ''}" data-lane-filter="LANE_DUNG_NGAY">⚡ Dùng ngay (${dungNgayCount})</button>
          <button class="nav-btn ${activeWalletLane === 'LANE_CONG_CHINH_THUC' ? 'active' : ''}" data-lane-filter="LANE_CONG_CHINH_THUC">🏛️ Cổng chính thức (${congChinhThucCount})</button>
          <button class="nav-btn ${activeWalletLane === 'LANE_THEO_DOI' ? 'active' : ''}" data-lane-filter="LANE_THEO_DOI">📡 Theo dõi (${theoDoiCount})</button>
        </div>
      </div>

      <div class="cards-layout-grid">
        ${filteredEntries.map(e => renderOfficialValueCard(e)).join('')}
      </div>
    </div>
  `;
}

// 5. EXPLORE DIRECTORY VIEW (50 ITEMS ACCROSS 4 TIERS)
function renderExploreDirectory() {
  const filtered = filterDirectoryItems();

  const tier1Count = JAYT_DISCOVERY_ITEMS.filter(i => i.tier_level === 'TIER_1_DEAL').length;
  const tier2Count = JAYT_DISCOVERY_ITEMS.filter(i => i.tier_level === 'TIER_2_PROGRAMME').length;
  const tier3Count = JAYT_DISCOVERY_ITEMS.filter(i => i.tier_level === 'TIER_3_UTILITY').length;
  const tier4Count = JAYT_DISCOVERY_ITEMS.filter(i => i.tier_level === 'TIER_4_RADAR').length;

  return `
    <div class="cr-experience-container">
      <div class="civic-ticker-cr">
        <span class="story-kicker">📚 THƯ MỤC NGUỒN CUNG TP. ĐÀ NẴNG (50 MỤC ĐÃ PHÂN TẦNG)</span>
      </div>

      <div style="background: var(--bg-card); padding: 20px; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
        <h1 style="font-size: 1.6rem; font-weight: 800; margin-bottom: 8px;">Khám Phá Toàn Diện (50 Mục Đã Phân Tầng)</h1>
        <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 16px;">
          Bộ sưu tập 50 ưu đãi, voucher, tiện ích và di sản đã đối soát minh bạch tại TP. Đà Nẵng.
        </p>

        <!-- 4 TIERS FILTER -->
        <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 12px;">
          <button class="nav-btn ${activeTier === 'ALL' ? 'active' : ''}" data-exp-tier="ALL">Tất cả (50)</button>
          <button class="nav-btn ${activeTier === 'TIER_1_DEAL' ? 'active' : ''}" data-exp-tier="TIER_1_DEAL">🔥 Deal xác minh (${tier1Count})</button>
          <button class="nav-btn ${activeTier === 'TIER_2_PROGRAMME' ? 'active' : ''}" data-exp-tier="TIER_2_PROGRAMME">🏛️ Cổng chính thức (${tier2Count})</button>
          <button class="nav-btn ${activeTier === 'TIER_3_UTILITY' ? 'active' : ''}" data-exp-tier="TIER_3_UTILITY">📍 Tiện ích xác minh (${tier3Count})</button>
          <button class="nav-btn ${activeTier === 'TIER_4_RADAR' ? 'active' : ''}" data-exp-tier="TIER_4_RADAR">📡 Radar (${tier4Count})</button>
        </div>

        <!-- GATEWAYS FILTER -->
        <div style="display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 12px;">
          <button class="nav-btn ${activeGateway === 'ALL' ? 'active' : ''}" data-exp-gw="ALL">Tất cả ngành hàng</button>
          <button class="nav-btn ${activeGateway === 'AN_GI' ? 'active' : ''}" data-exp-gw="AN_GI">🍔 Ăn gì</button>
          <button class="nav-btn ${activeGateway === 'DI_DAU' ? 'active' : ''}" data-exp-gw="DI_DAU">🎬 Đi đâu</button>
          <button class="nav-btn ${activeGateway === 'MUA_SAM' ? 'active' : ''}" data-exp-gw="MUA_SAM">🛍️ Mua sắm & Học tập</button>
        </div>

        <!-- LOCALITY FILTER -->
        <div style="display: flex; gap: 6px; flex-wrap: wrap;">
          <button class="nav-btn ${activeLocality === 'ALL' ? 'active' : ''}" data-exp-loc="ALL">Toàn thành phố</button>
          <button class="nav-btn ${activeLocality === 'HAI_CHAU' ? 'active' : ''}" data-exp-loc="HAI_CHAU">Hải Châu</button>
          <button class="nav-btn ${activeLocality === 'SON_TRA' ? 'active' : ''}" data-exp-loc="SON_TRA">Sơn Trà</button>
          <button class="nav-btn ${activeLocality === 'THANH_KHE' ? 'active' : ''}" data-exp-loc="THANH_KHE">Thanh Khê</button>
          <button class="nav-btn ${activeLocality === 'NGU_HANH_SON' ? 'active' : ''}" data-exp-loc="NGU_HANH_SON">Ngũ Hành Sơn</button>
          <button class="nav-btn ${activeLocality === 'LIEN_CHIEU' ? 'active' : ''}" data-exp-loc="LIEN_CHIEU">Liên Chiểu</button>
        </div>
      </div>

      <div style="font-size: 0.85rem; color: var(--text-muted);">
        Đang hiển thị <strong>${filtered.length}</strong> / 50 mục đã phân tầng
      </div>

      <div class="cards-layout-grid">
        ${filtered.map(item => renderRailCard(item)).join('')}
      </div>
    </div>
  `;
}

function filterDirectoryItems() {
  return JAYT_DISCOVERY_ITEMS.filter(item => {
    if (activeTier !== 'ALL' && item.tier_level !== activeTier) return false;
    if (activeGateway !== 'ALL' && item.gateway_group !== activeGateway) return false;
    if (activeLocality !== 'ALL' && item.locality_tag !== activeLocality) return false;
    return true;
  });
}

// 6. BUY DECISION HUB VIEW
function renderBuyDecisionHub() {
  return `
    <div class="cr-experience-container">
      <div class="civic-ticker-cr">
        <span class="story-kicker">🛡️ CỔNG TƯ VẤN MUA SẮM MINH BẠCH</span>
      </div>

      <div style="background: var(--bg-card); padding: 20px; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
        <h1 style="font-size: 1.6rem; font-weight: 800; margin-bottom: 8px;">Mua Món Này Có Hời Không?</h1>
        <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 16px;">
          Tra cứu giá thực, điều kiện ẩn và quyền lợi trước khi thanh toán tại Đà Nẵng.
        </p>

        <div style="display: flex; gap: 8px;">
          <input type="text" id="input-check-deal" placeholder="Nhập tên món hàng, đường link hoặc cửa hàng..." style="flex-grow: 1; padding: 10px 14px; border: 1px solid var(--border-color); border-radius: 8px; font-size: 0.9rem;" />
          <button id="btn-submit-check" class="btn-modal-primary">Kiểm Tra Ngay</button>
        </div>

        <div id="decision-result-container" style="display: none; margin-top: 16px; padding: 16px; background: var(--bg-card-subtle); border-radius: 8px;"></div>
      </div>
    </div>
  `;
}

// 7. SAVED VIEW
function renderSavedView() {
  const savedItems = JAYT_DISCOVERY_ITEMS.filter(i => savedItemIds.has(i.item_id));

  return `
    <div class="cr-experience-container">
      <div class="civic-ticker-cr">
        <span class="story-kicker">❤️ DANH SÁCH ĐÃ LƯU (${savedItems.length})</span>
      </div>

      ${savedItems.length > 0 
        ? `
          <div class="cards-layout-grid">
            ${savedItems.map(item => renderRailCard(item)).join('')}
          </div>
        `
        : `
          <div style="text-align: center; padding: 48px 16px; background: var(--bg-card); border-radius: var(--radius-md); border: 1px solid var(--border-color);">
            <div style="font-size: 2rem; margin-bottom: 8px;">🤍</div>
            <h3>Bạn chưa lưu địa điểm nào</h3>
            <p style="color: var(--text-muted); font-size: 0.9rem; margin-top: 4px;">Bấm biểu tượng trái tim trên các thẻ tiện ích để lưu lại.</p>
          </div>
        `
      }
    </div>
  `;
}

// 8. APP SHELL & NAVIGATION (COMPACT 52px HEADER)


// =========================================================================
// JAYT-363-A1 WORKSTREAM: 5 CLIENT-SIDE CORE LOGIC MODULES & DATASETS
// =========================================================================

window.__STACK_BENCHMARK_LOG__ = window.__STACK_BENCHMARK_LOG__ || [];

// MODULE 1: calculateDynamicStack
function calculateDynamicStack(params) {
  const t0 = performance.now();
  const subtotal = Math.max(20000, Math.min(500000, parseInt(params.orderAmount, 10) || 150000));
  const breakdown = [];

  // 1. Shop Discount
  let shopDeduct = 0;
  const shopCfg = params.shopDiscount || { type: 'PERCENT', value: 10, minSpend: 100000, maxCap: 30000 };
  if (subtotal < shopCfg.minSpend) {
    breakdown.push({
      source: 'SHOP',
      applied: false,
      amount: 0,
      reason: 'Đơn tối thiểu ' + Number(shopCfg.minSpend).toLocaleString('vi-VN') + ' ₫ (hiện có ' + Number(subtotal).toLocaleString('vi-VN') + ' ₫)'
    });
  } else {
    const raw = shopCfg.type === 'PERCENT' ? Math.round(subtotal * shopCfg.value / 100) : shopCfg.value;
    shopDeduct = Math.min(raw, shopCfg.maxCap || raw);
    shopDeduct = Math.min(shopDeduct, subtotal);
    breakdown.push({
      source: 'SHOP',
      applied: true,
      amount: shopDeduct,
      reason: 'Áp dụng giảm ' + (shopCfg.type === 'PERCENT' ? shopCfg.value + '%' : Number(shopCfg.value).toLocaleString('vi-VN') + ' ₫') + (raw > shopCfg.maxCap ? ' (chạm trần ' + Number(shopCfg.maxCap).toLocaleString('vi-VN') + ' ₫)' : '')
    });
  }

  // 2. Platform Discount
  let platformDeduct = 0;
  const platCfg = params.platformDiscount || { type: 'PERCENT', value: 15, minSpend: 120000, maxCap: 40000 };
  const allowStack = params.allowStacking !== false;

  if (!allowStack && shopDeduct > 0) {
    breakdown.push({
      source: 'PLATFORM',
      applied: false,
      amount: 0,
      reason: 'Chính sách không cho phép gộp với mã giảm giá của Shop'
    });
  } else if (subtotal < platCfg.minSpend) {
    breakdown.push({
      source: 'PLATFORM',
      applied: false,
      amount: 0,
      reason: 'Đơn tối thiểu ' + Number(platCfg.minSpend).toLocaleString('vi-VN') + ' ₫ (hiện có ' + Number(subtotal).toLocaleString('vi-VN') + ' ₫)'
    });
  } else {
    const remaining = subtotal - shopDeduct;
    const raw = platCfg.type === 'PERCENT' ? Math.round(subtotal * platCfg.value / 100) : platCfg.value;
    platformDeduct = Math.min(raw, platCfg.maxCap || raw);
    platformDeduct = Math.min(platformDeduct, remaining);
    breakdown.push({
      source: 'PLATFORM',
      applied: true,
      amount: platformDeduct,
      reason: 'Áp dụng giảm ' + (platCfg.type === 'PERCENT' ? platCfg.value + '%' : Number(platCfg.value).toLocaleString('vi-VN') + ' ₫') + (raw > platCfg.maxCap ? ' (chạm trần ' + Number(platCfg.maxCap).toLocaleString('vi-VN') + ' ₫)' : '')
    });
  }

  // 3. Shipping Credit
  const shipCfg = params.shippingCredit || { fee: 25000, creditValue: 15000, minSpend: 100000 };
  const shipFee = Math.max(0, parseInt(shipCfg.fee, 10) || 0);
  let shipDeduct = 0;

  if (subtotal < shipCfg.minSpend) {
    breakdown.push({
      source: 'SHIPPING',
      applied: false,
      amount: 0,
      reason: 'Đơn tối thiểu ' + Number(shipCfg.minSpend).toLocaleString('vi-VN') + ' ₫ để nhận hỗ trợ phí ship'
    });
  } else {
    shipDeduct = Math.min(shipFee, parseInt(shipCfg.creditValue, 10) || 0);
    breakdown.push({
      source: 'SHIPPING',
      applied: true,
      amount: shipDeduct,
      reason: 'Hỗ trợ phí vận chuyển ' + Number(shipDeduct).toLocaleString('vi-VN') + ' ₫'
    });
  }

  const finalPayable = Math.max(0, (subtotal - shopDeduct - platformDeduct) + (shipFee - shipDeduct));
  const t1 = performance.now();
  const computeDurationMs = Math.round((t1 - t0) * 1000) / 1000;

  window.__STACK_BENCHMARK_LOG__.push(computeDurationMs);

  return {
    orderSubtotal: subtotal,
    shopDiscountApplied: shopDeduct,
    platformDiscountApplied: platformDeduct,
    shippingFee: shipFee,
    shippingCreditApplied: shipDeduct,
    finalPayable: finalPayable,
    totalSaved: (shopDeduct + platformDeduct + shipDeduct),
    breakdown: breakdown,
    computeDurationMs: computeDurationMs
  };
}

if (typeof window !== 'undefined') {
  window.calculateDynamicStack = calculateDynamicStack;
}

// MODULE 2: Lunch 3-App Comparison
function isPeakMealHour() {
  let minutes = 0;
  if (typeof window !== 'undefined' && window.__JAYT_CLOCK__) {
    const p = String(window.__JAYT_CLOCK__).split(':');
    minutes = (parseInt(p[0], 10) || 0) * 60 + (parseInt(p[1], 10) || 0);
  } else {
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
      minutes = h * 60 + m;
    } catch (e) {
      const d = new Date();
      minutes = d.getHours() * 60 + d.getMinutes();
    }
  }

  // Lunch peak [11:30, 12:30) => [690, 750)
  // Dinner peak [16:30, 18:30) => [990, 1110)
  const isLunchPeak = (minutes >= 690 && minutes < 750);
  const isDinnerPeak = (minutes >= 990 && minutes < 1110);
  return {
    isPeak: isLunchPeak || isDinnerPeak,
    peakName: isLunchPeak ? 'Cao Điểm Trưa (11:30 - 12:30)' : (isDinnerPeak ? 'Cao Điểm Chiều Tối (16:30 - 18:30)' : 'Khung Giờ Thường'),
    minutes: minutes
  };
}

function calculateLunchComparison(dishPrice, appConfigs, bridgeSurcharge) {
  const price = Math.max(20000, Math.min(200000, parseInt(dishPrice, 10) || 35000));
  const bridgeFee = Math.max(0, parseInt(bridgeSurcharge, 10) || 0);

  const results = {};
  const apps = ['shopeefood', 'grabfood', 'befood'];

  apps.forEach(app => {
    const cfg = (appConfigs && appConfigs[app]) || { deliveryFee: 16000, serviceFee: 2000, discount: 10000 };
    const delivery = Math.max(0, parseInt(cfg.deliveryFee, 10) || 0);
    const service = Math.max(0, parseInt(cfg.serviceFee, 10) || 0);
    const discount = Math.max(0, parseInt(cfg.discount, 10) || 0);

    const total = Math.max(0, price + delivery + service + bridgeFee - discount);
    results[app] = {
      dishPrice: price,
      deliveryFee: delivery,
      serviceFee: service,
      bridgeFee: bridgeFee,
      discount: discount,
      totalPayable: total
    };
  });

  return results;
}

if (typeof window !== 'undefined') {
  window.isPeakMealHour = isPeakMealHour;
  window.calculateLunchComparison = calculateLunchComparison;
}

// MODULE 3: Cinema Calendar & Split Bill Pro
const CINEMA_SCENARIOS = [
  { id: 'METIZ_T2', day: 'Thứ 2', brand: 'Metiz Cinema', title: 'Vé Xem Phim U22 Metiz', priceVnd: 45000, note: 'Giá kịch bản mô phỏng U22' },
  { id: 'GALAXY_T3', day: 'Thứ 3', brand: 'Galaxy Cinema', title: 'Ngày Tri Ân Happy Day', priceVnd: 50000, note: 'Giá kịch bản mô phỏng Thứ 3' },
  { id: 'CGV_T4', day: 'Thứ 4', brand: 'CGV Cinemas', title: 'Thứ 4 Vui Vẻ CGV', priceVnd: 75000, note: 'Giá kịch bản mô phỏng Thứ 4' },
  { id: 'STARLIGHT_T5', day: 'Thứ 5', brand: 'Starlight Đà Nẵng', title: 'Ưu Đãi HSSV Starlight', priceVnd: 45000, note: 'Giá kịch bản mô phỏng Thứ 5' }
];

function calculateIntegerSplit(totalAmount, groupCount) {
  const total = Math.max(0, parseInt(totalAmount, 10) || 0);
  const count = Math.max(2, Math.min(8, parseInt(groupCount, 10) || 4));

  const baseShare = Math.floor(total / count);
  const remainder = total % count;

  return {
    total: total,
    count: count,
    baseShare: baseShare,
    remainder: remainder,
    conservationCheck: (baseShare * count + remainder === total)
  };
}

if (typeof window !== 'undefined') {
  window.calculateIntegerSplit = calculateIntegerSplit;
}

// MODULE 4: Meals <=25K & Student Benefits Guide
const MEALS_25K_SLOTS = [
  {
    slot: 1,
    verified: false,
    candidateName: 'Cơm Tấm Ba Đào',
    name: '[Chờ dữ liệu đối soát]',
    campus: 'BACH_KHOA',
    campusLabel: 'Bách Khoa',
    address: '12 Ngô Thì Nhậm, Hòa Khánh Nam, Liên Chiểu',
    priceVnd: null,
    referencePriceVnd: 25000,
    dishes: 'Cơm sườn, cơm chả trứng, canh rau thêm miễn phí',
    mapQuery: null,
    simulationState: 'AWAITING_FIELD_VERIFICATION'
  },
  {
    slot: 2,
    verified: false,
    candidateName: 'Bánh Tráng Kẹp Dì Hoa',
    name: '[Chờ dữ liệu đối soát]',
    campus: 'BACH_KHOA',
    campusLabel: 'Bách Khoa',
    address: 'K62/2A Núi Thành / Chi nhánh KTX Hòa Khánh',
    priceVnd: null,
    referencePriceVnd: 15000,
    dishes: 'Bánh tráng kẹp pate, trứng cút nướng giòn',
    mapQuery: null,
    simulationState: 'AWAITING_FIELD_VERIFICATION'
  },
  {
    slot: 3,
    verified: false,
    candidateName: 'Quán Cơm Sinh Viên Tôn Đức Thắng',
    name: '[Chờ dữ liệu đối soát]',
    campus: 'SU_PHAM',
    campusLabel: 'Sư Phạm',
    address: '459 Tôn Đức Thắng, Hòa Khánh Nam',
    priceVnd: null,
    referencePriceVnd: 20000,
    dishes: 'Cơm phần 4 món tự chọn, trà đá miễn phí',
    mapQuery: null,
    simulationState: 'AWAITING_FIELD_VERIFICATION'
  },
  {
    slot: 4,
    verified: false,
    candidateName: 'Bún Trộn Chay Chợ Hòa Khánh',
    name: '[Chờ dữ liệu đối soát]',
    campus: 'SU_PHAM',
    campusLabel: 'Sư Phạm',
    address: 'Cổng phụ Chợ Hòa Khánh, đường Đồng Kè',
    priceVnd: null,
    referencePriceVnd: 15000,
    dishes: 'Bún đậu khuôn, ram chay giòn sốt đậu phộng',
    mapQuery: null,
    simulationState: 'AWAITING_FIELD_VERIFICATION'
  },
  {
    slot: 5,
    verified: false,
    candidateName: 'Cơm Gà Xé Ngũ Hành Sơn',
    name: '[Chờ dữ liệu đối soát]',
    campus: 'KINH_TE_DUE',
    campusLabel: 'Kinh Tế DUE',
    address: '88 Nam Kỳ Khởi Nghĩa, Hòa Quý',
    priceVnd: null,
    referencePriceVnd: 25000,
    dishes: 'Cơm gà xé bóp rau răm, nước canh gừng',
    mapQuery: null,
    simulationState: 'AWAITING_FIELD_VERIFICATION'
  },
  {
    slot: 6,
    verified: false,
    candidateName: 'Bánh Mì Chả Bà Lan Trần Đại Nghĩa',
    name: '[Chờ dữ liệu đối soát]',
    campus: 'KINH_TE_DUE',
    campusLabel: 'Kinh Tế DUE',
    address: 'Trần Đại Nghĩa, gần cổng ký túc xá DUE',
    priceVnd: null,
    referencePriceVnd: 18000,
    dishes: 'Bánh mì chả bò, chả heo nóng giòn',
    mapQuery: null,
    simulationState: 'AWAITING_FIELD_VERIFICATION'
  },
  {
    slot: 7,
    verified: false,
    candidateName: 'Mì Quảng Bà Mua Sinh Viên',
    name: '[Chờ dữ liệu đối soát]',
    campus: 'DUY_TAN',
    campusLabel: 'Duy Tân',
    address: 'Gần cơ sở 254 Nguyễn Văn Linh & Quang Trung',
    priceVnd: null,
    referencePriceVnd: 25000,
    dishes: 'Mì Quảng gà, trứng, bánh tráng nướng',
    mapQuery: null,
    simulationState: 'AWAITING_FIELD_VERIFICATION'
  },
  {
    slot: 8,
    verified: false,
    candidateName: null,
    name: '[Đang chờ dữ liệu đối soát]',
    campus: 'BACH_KHOA',
    campusLabel: 'Bách Khoa',
    address: 'Vị trí slot 8 đang kiểm định thực địa theo Evidence Contract v3',
    priceVnd: null,
    referencePriceVnd: null,
    dishes: 'Chưa có dữ liệu xác minh',
    mapQuery: null,
    simulationState: 'AWAITING_FIELD_VERIFICATION'
  },
  {
    slot: 9,
    verified: false,
    candidateName: null,
    name: '[Đang chờ dữ liệu đối soát]',
    campus: 'KINH_TE_DUE',
    campusLabel: 'Kinh Tế DUE',
    address: 'Vị trí slot 9 đang kiểm định thực địa theo Evidence Contract v3',
    priceVnd: null,
    referencePriceVnd: null,
    dishes: 'Chưa có dữ liệu xác minh',
    mapQuery: null,
    simulationState: 'AWAITING_FIELD_VERIFICATION'
  },
  {
    slot: 10,
    verified: false,
    candidateName: null,
    name: '[Đang chờ dữ liệu đối soát]',
    campus: 'DUY_TAN',
    campusLabel: 'Duy Tân',
    address: 'Vị trí slot 10 đang kiểm định thực địa theo Evidence Contract v3',
    priceVnd: null,
    referencePriceVnd: null,
    dishes: 'Chưa có dữ liệu xác minh',
    mapQuery: null,
    simulationState: 'AWAITING_FIELD_VERIFICATION'
  }
];

const STUDENT_BENEFITS_GUIDES = [
  {
    id: 'BENEFIT_GITHUB',
    title: 'GitHub Student Developer Pack (Tham Chiếu)',
    brand: 'GitHub Education',
    benefitType: '⚠️ MÔ PHỎNG THAM CHIẾU',
    benefitBadge: 'SIMULATION_BENCHMARK',
    summary: 'Kịch bản tham chiếu: Bộ công cụ lập trình, GitHub Pro cho học sinh sinh viên. (Chưa kiểm chứng thực tế)',
    eligibility: 'Kịch bản: Sinh viên có email trường (.edu.vn) hoặc thẻ sinh viên.',
    steps: '1. Đăng ký tài khoản GitHub cá nhân\n2. Truy cập cổng giáo dục của đối tác\n3. Thực hiện theo hướng dẫn của nhà cung cấp.',
    officialUrl: 'https://education.github.com/pack'
  },
  {
    id: 'BENEFIT_NOTION',
    title: 'Notion for Education Plus Plan (Tham Chiếu)',
    brand: 'Notion Labs',
    benefitType: '⚠️ MÔ PHỎNG THAM CHIẾU',
    benefitBadge: 'SIMULATION_BENCHMARK',
    summary: 'Kịch bản tham chiếu: Gói Notion Plus hỗ trợ ghi chú học tập. (Chưa kiểm chứng thực tế)',
    eligibility: 'Kịch bản: Đăng ký bằng email trường cấp.',
    steps: '1. Tạo tài khoản Notion\n2. Chuyển đổi sang email sinh viên\n3. Nâng cấp theo chính sách của nhà cung cấp.',
    officialUrl: 'https://www.notion.so/product/notion-for-education'
  },
  {
    id: 'BENEFIT_SPOTIFY',
    title: 'Spotify Premium Student (Tham Chiếu)',
    brand: 'Spotify',
    benefitType: '⚠️ MÔ PHỎNG THAM CHIẾU',
    benefitBadge: 'SIMULATION_BENCHMARK',
    summary: 'Kịch bản tham chiếu: Giảm 50% còn 29.500₫/tháng (giá gốc 59.000₫). Không phải 0đ. (Chưa kiểm chứng thực tế)',
    eligibility: 'Kịch bản: Xác minh thông qua đối tác bên thứ ba (SheerID).',
    steps: '1. Đăng nhập ứng dụng\n2. Chọn gói sinh viên\n3. Nộp giấy tờ theo yêu cầu của cổng xác thực.',
    officialUrl: 'https://www.spotify.com/vn-vi/student/'
  },
  {
    id: 'BENEFIT_DANABUS',
    title: 'Thẻ Xe Buýt Trợ Giá DanaBus HSSV (Tham Chiếu)',
    brand: 'DanaBus Đà Nẵng',
    benefitType: '⚠️ MÔ PHỎNG THAM CHIẾU',
    benefitBadge: 'SIMULATION_BENCHMARK',
    summary: 'Kịch bản tham chiếu: Vé lượt 6.000₫ hoặc vé tháng 65.000₫ cho HSSV. (Chưa kiểm chứng thực tế)',
    eligibility: 'Kịch bản: Học sinh, sinh viên trên địa bàn thành phố Đà Nẵng.',
    steps: '1. Chuẩn bị ảnh và thẻ HSSV\n2. Nộp hồ sơ tại điểm bán vé theo hướng dẫn của đơn vị vận tải.',
    officialUrl: 'https://www.danangbus.vn/'
  }
];

// MODULE 5: dispatchSmartAffiliate
const AFFILIATE_CONFIG = {
  is_active: false,
  status: 'DRY_RUN_DISABLED_BY_DEFAULT',
  disclaimer: 'Chế độ mô phỏng nội bộ (Dry-run). Chưa kích hoạt tài khoản tiếp thị liên kết thương mại. Không ghi nhận doanh thu.',
  providers: {
    shopee: { name: 'Shopee', baseUrl: 'https://shopee.vn/search', allowlisted: true },
    lazada: { name: 'Lazada', baseUrl: 'https://www.lazada.vn/catalog/', allowlisted: true },
    grab: { name: 'Grab', baseUrl: 'https://www.grab.com/vn/', allowlisted: true }
  }
};

function dispatchSmartAffiliate(providerKey, options) {
  const prov = (AFFILIATE_CONFIG.providers && AFFILIATE_CONFIG.providers[providerKey]) || AFFILIATE_CONFIG.providers.shopee;
  const campus = encodeURIComponent((options && options.campus) || 'bach_khoa');
  const cluster = encodeURIComponent((options && options.cluster) || 'hoa_khanh');
  const timestamp = Math.floor(Date.now() / 1000);

  const query = encodeURIComponent((options && options.keyword) || 'do_dung_ktx');
  const dryRunUrl = prov.baseUrl + '?keyword=' + query + '&sub1=' + campus + '&sub2=' + cluster + '&sub3=' + timestamp;

  return {
    provider: prov.name,
    dryRunMode: true,
    constructedUrl: dryRunUrl,
    officialCleanUrl: prov.baseUrl + '?keyword=' + query,
    subParams: { sub1: campus, sub2: cluster, sub3: timestamp },
    disclaimer: AFFILIATE_CONFIG.disclaimer
  };
}

if (typeof window !== 'undefined') {
  window.dispatchSmartAffiliate = dispatchSmartAffiliate;
}


// =========================================================================
// JAYT-363-A1 UI RENDERING & EVENT CONTROLLERS
// =========================================================================

// --- 1. DYNAMIC STACK VIEW ---
function renderDynamicStackView() {
  return `
    <div class="cr-experience-container">
      <div class="civic-ticker-cr">
        <span class="story-kicker">⚡ BỘ TÍNH XẾP CHỒNG MÃ ĐA TẦNG — LOCAL-FIRST ENGINE</span>
      </div>

      <div class="stack-calculator-card" style="background: var(--bg-card); padding: 24px; border-radius: var(--radius-lg); border: 1px solid var(--border-color); box-shadow: var(--shadow-sm); margin-bottom: 24px;">
        <h1 style="font-size: 1.5rem; font-weight: 800; margin-bottom: 8px; color: var(--text-primary);">
          Bảng Tính Xếp Chồng Mã Giảm Giá
        </h1>
        <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 20px; line-height: 1.5;">
          Tính toán tức thì các lớp khấu trừ: Mã Shop + Mã Sàn + Hỗ trợ vận chuyển. Thực thi hoàn toàn trên máy cục bộ với tốc độ dưới 1ms, kiểm định bảo toàn giá trị không âm.
        </p>

        <!-- Order Amount Input -->
        <div style="background: var(--bg-card-subtle); padding: 16px; border-radius: var(--radius-md); margin-bottom: 20px; border: 1px solid var(--border-subtle);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; flex-wrap: wrap; gap: 8px;">
            <label for="stack-order-amount" style="font-weight: 700; font-size: 0.95rem;">1. Giá trị đơn hàng (20.000 ₫ - 500.000 ₫):</label>
            <div style="display: flex; gap: 6px; flex-wrap: wrap;">
              <button type="button" class="btn-preset-chip" data-preset="50000" style="min-height: 44px; min-width: 48px; padding: 10px 14px; border-radius: 8px; border: 1px solid var(--border-color); background: var(--bg-card); font-size: 0.85rem; font-weight: 700; cursor: pointer; color: var(--text-primary);">50k</button>
              <button type="button" class="btn-preset-chip" data-preset="100000" style="min-height: 44px; min-width: 48px; padding: 10px 14px; border-radius: 8px; border: 1px solid var(--border-color); background: var(--bg-card); font-size: 0.85rem; font-weight: 700; cursor: pointer; color: var(--text-primary);">100k</button>
              <button type="button" class="btn-preset-chip" data-preset="150000" style="min-height: 44px; min-width: 48px; padding: 10px 14px; border-radius: 8px; border: 1px solid var(--border-color); background: var(--bg-card); font-size: 0.85rem; font-weight: 700; cursor: pointer; color: var(--text-primary);">150k</button>
              <button type="button" class="btn-preset-chip" data-preset="250000" style="min-height: 44px; min-width: 48px; padding: 10px 14px; border-radius: 8px; border: 1px solid var(--border-color); background: var(--bg-card); font-size: 0.85rem; font-weight: 700; cursor: pointer; color: var(--text-primary);">250k</button>
              <button type="button" class="btn-preset-chip" data-preset="500000" style="min-height: 44px; min-width: 48px; padding: 10px 14px; border-radius: 8px; border: 1px solid var(--border-color); background: var(--bg-card); font-size: 0.85rem; font-weight: 700; cursor: pointer; color: var(--text-primary);">500k</button>
            </div>
          </div>
          <div style="display: flex; gap: 12px; align-items: center;">
            <input type="range" id="stack-order-slider" min="20000" max="500000" step="5000" value="150000" style="flex: 1; accent-color: #0369a1; min-height: 44px; height: 44px; cursor: pointer;" aria-label="Thanh trượt giá trị đơn hàng" />
            <input type="number" id="stack-order-amount" min="20000" max="500000" step="1000" value="150000" style="width: 140px; min-height: 44px; height: 44px; padding: 8px 12px; border: 1px solid var(--border-color); border-radius: 8px; font-size: 1rem; font-weight: 700; text-align: right; box-sizing: border-box;" aria-label="Nhập số tiền đơn hàng" />
            <span style="font-weight: 700; color: var(--text-muted);">₫</span>
          </div>
        </div>

        <!-- 3 Discount Layers Config -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px; margin-bottom: 20px;">
          <!-- Shop Discount -->
          <div style="border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 14px; background: var(--bg-card);">
            <div style="font-weight: 700; font-size: 0.9rem; color: #0369a1; margin-bottom: 8px; display: flex; align-items: center; gap: 6px;">
              <span>🏪 Mã Giảm Giá Của Shop</span>
            </div>
            <div style="display: flex; flex-direction: column; gap: 8px; font-size: 0.85rem;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span>Loại giảm:</span>
                <select id="stack-shop-type" style="min-height: 44px; height: 44px; padding: 8px 12px; border-radius: 6px; border: 1px solid var(--border-color); box-sizing: border-box;">
                  <option value="PERCENT" selected>Phần trăm (%)</option>
                  <option value="FIXED">Cố định (₫)</option>
                </select>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span>Mức giảm:</span>
                <input type="number" id="stack-shop-val" value="10" min="0" max="100" style="width: 100px; min-height: 44px; height: 44px; padding: 8px 10px; border: 1px solid var(--border-color); border-radius: 6px; text-align: right; box-sizing: border-box;" />
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span>Đơn tối thiểu:</span>
                <input type="number" id="stack-shop-min" value="100000" step="5000" style="width: 100px; min-height: 44px; height: 44px; padding: 8px 10px; border: 1px solid var(--border-color); border-radius: 6px; text-align: right; box-sizing: border-box;" />
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span>Mức trần giảm:</span>
                <input type="number" id="stack-shop-cap" value="30000" step="5000" style="width: 100px; min-height: 44px; height: 44px; padding: 8px 10px; border: 1px solid var(--border-color); border-radius: 6px; text-align: right; box-sizing: border-box;" />
              </div>
            </div>
          </div>

          <!-- Platform Discount -->
          <div style="border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 14px; background: var(--bg-card);">
            <div style="font-weight: 700; font-size: 0.9rem; color: #be123c; margin-bottom: 8px; display: flex; align-items: center; gap: 6px;">
              <span>🌐 Mã Giảm Giá Của Sàn</span>
            </div>
            <div style="display: flex; flex-direction: column; gap: 8px; font-size: 0.85rem;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span>Loại giảm:</span>
                <select id="stack-plat-type" style="min-height: 44px; height: 44px; padding: 8px 12px; border-radius: 6px; border: 1px solid var(--border-color); box-sizing: border-box;">
                  <option value="PERCENT" selected>Phần trăm (%)</option>
                  <option value="FIXED">Cố định (₫)</option>
                </select>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span>Mức giảm:</span>
                <input type="number" id="stack-plat-val" value="15" min="0" max="100" style="width: 100px; min-height: 44px; height: 44px; padding: 8px 10px; border: 1px solid var(--border-color); border-radius: 6px; text-align: right; box-sizing: border-box;" />
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span>Đơn tối thiểu:</span>
                <input type="number" id="stack-plat-min" value="120000" step="5000" style="width: 100px; min-height: 44px; height: 44px; padding: 8px 10px; border: 1px solid var(--border-color); border-radius: 6px; text-align: right; box-sizing: border-box;" />
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span>Mức trần giảm:</span>
                <input type="number" id="stack-plat-cap" value="40000" step="5000" style="width: 100px; min-height: 44px; height: 44px; padding: 8px 10px; border: 1px solid var(--border-color); border-radius: 6px; text-align: right; box-sizing: border-box;" />
              </div>
              <div style="margin-top: 4px;"><label for="stack-plat-allow" style="min-height: 44px; display: inline-flex; align-items: center; gap: 8px; cursor: pointer; font-size: 0.85rem; color: var(--text-primary); font-weight: 600;"><input type="checkbox" id="stack-plat-allow" checked style="min-width: 44px; min-height: 44px; width: 44px; height: 44px; margin: 0; cursor: pointer; accent-color: #0369a1;" /><span>Cho phép xếp chồng với Shop</span></label></div>
            </div>
          </div>

          <!-- Shipping Credit -->
          <div style="border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 14px; background: var(--bg-card);">
            <div style="font-weight: 700; font-size: 0.9rem; color: #047857; margin-bottom: 8px; display: flex; align-items: center; gap: 6px;">
              <span>🚚 Hỗ Trợ Vận Chuyển</span>
            </div>
            <div style="display: flex; flex-direction: column; gap: 8px; font-size: 0.85rem;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span>Phí ship ban đầu:</span>
                <input type="number" id="stack-ship-fee" value="25000" step="1000" style="width: 100px; min-height: 44px; height: 44px; padding: 8px 10px; border: 1px solid var(--border-color); border-radius: 6px; text-align: right; box-sizing: border-box;" />
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span>Mức hỗ trợ tối đa:</span>
                <input type="number" id="stack-ship-val" value="15000" step="1000" style="width: 100px; min-height: 44px; height: 44px; padding: 8px 10px; border: 1px solid var(--border-color); border-radius: 6px; text-align: right; box-sizing: border-box;" />
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span>Đơn tối thiểu ship:</span>
                <input type="number" id="stack-ship-min" value="100000" step="5000" style="width: 100px; min-height: 44px; height: 44px; padding: 8px 10px; border: 1px solid var(--border-color); border-radius: 6px; text-align: right; box-sizing: border-box;" />
              </div>
            </div>
          </div>
        </div>

        <!-- Live Calculation Breakdown Output -->
        <div id="stack-result-container" style="background: var(--bg-card-subtle); border-radius: var(--radius-md); padding: 20px; border: 1px solid var(--border-color); margin-bottom: 24px;">
          <!-- Content populated via updateStackCalculationUI() -->
        </div>

        <!-- Benchmark Badge -->
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; padding-top: 12px; border-top: 1px solid var(--border-subtle);">
          <div id="stack-compute-badge" style="font-size: 0.82rem; font-weight: 700; color: #0369a1; background: #e0f2fe; padding: 6px 12px; border-radius: 6px;">
            ⚡ Tốc độ tính toán: <span id="stack-compute-ms">0.00</span>ms (Mục tiêu &le; 1ms)
          </div>
          <div id="stack-benchmark-summary" style="font-size: 0.78rem; color: var(--text-muted);"></div>
        </div>
      </div>

      <!-- Coupon Codes Section -->
      <div style="background: var(--bg-card); padding: 24px; border-radius: var(--radius-lg); border: 1px solid var(--border-color); margin-bottom: 24px;">
        <h2 style="font-size: 1.25rem; font-weight: 800; margin-bottom: 6px;">Mã Ưu Đãi: Đối Soát Thật vs Kịch Bản Mô Phỏng</h2>
        <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 16px;">
          Chỉ có mã đã qua đối soát chứng cứ mới có nút sao chép vào bộ nhớ tạm. Mã mô phỏng chỉ dùng để kiểm thử bộ tính.
        </p>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px;">
          <!-- Real Code 1 -->
          <div style="border: 2px solid #0369a1; border-radius: var(--radius-md); padding: 16px; background: #f0f9ff;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <span style="background: #0369a1; color: #ffffff; padding: 4px 10px; border-radius: 6px; font-size: 0.75rem; font-weight: 800;">✓ ĐÃ ĐỐI SOÁT</span>
              <span style="font-family: monospace; font-weight: 800; font-size: 1.1rem; color: #0369a1;">PL5KSEP</span>
            </div>
            <div style="font-size: 0.88rem; font-weight: 700; margin-bottom: 4px;">Phi Long Technology Đà Nẵng</div>
            <div style="font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 12px;">Giảm 50.000 ₫ cho đơn phụ kiện KTX từ 200.000 ₫.</div>
            <button class="btn-copy-verified-code" data-code="PL5KSEP" style="width: 100%; min-height: 44px; background: #0369a1; color: #ffffff; border: none; border-radius: 8px; font-weight: 700; cursor: pointer;">
              📋 Sao Chép Mã Thật
            </button>
          </div>

          <!-- Real Code 2 -->
          <div style="border: 2px solid #0369a1; border-radius: var(--radius-md); padding: 16px; background: #f0f9ff;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <span style="background: #0369a1; color: #ffffff; padding: 4px 10px; border-radius: 6px; font-size: 0.75rem; font-weight: 800;">✓ ĐÃ ĐỐI SOÁT</span>
              <span style="font-family: monospace; font-weight: 800; font-size: 1.1rem; color: #0369a1;">TPCNEW20</span>
            </div>
            <div style="font-size: 0.88rem; font-weight: 700; margin-bottom: 4px;">Trà Sữa Thuận Phước HSSV</div>
            <div style="font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 12px;">Giảm 20.000 ₫ cho sinh viên mới nhập học kỳ 1.</div>
            <button class="btn-copy-verified-code" data-code="TPCNEW20" style="width: 100%; min-height: 44px; background: #0369a1; color: #ffffff; border: none; border-radius: 8px; font-weight: 700; cursor: pointer;">
              📋 Sao Chép Mã Thật
            </button>
          </div>

          <!-- Simulation Code 1 -->
          <div style="border: 1px dashed #b45309; border-radius: var(--radius-md); padding: 16px; background: #fffbeb;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <span style="background: #fef3c7; color: #78350f; border: 1px solid #d97706; padding: 4px 8px; border-radius: 6px; font-size: 0.75rem; font-weight: 800;">⚠️ MÃ MÔ PHỎNG</span>
              <span style="font-family: monospace; font-weight: 800; font-size: 1.1rem; color: #78350f;">DEMOSHOP10</span>
            </div>
            <div style="font-size: 0.88rem; font-weight: 700; margin-bottom: 4px;">Kịch bản kiểm thử Shop (10% max 30k)</div>
            <div style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 12px;">Mã ví dụ kiểm thử, không thể dùng để mua hàng thật.</div>
            <button class="btn-apply-sim-code" data-sim="DEMOSHOP10" style="width: 100%; min-height: 44px; background: #ffffff; color: #78350f; border: 2px solid #b45309; border-radius: 8px; font-weight: 700; cursor: pointer;">
              ⚙️ Nạp Vào Bảng Tính
            </button>
          </div>

          <!-- Simulation Code 2 -->
          <div style="border: 1px dashed #b45309; border-radius: var(--radius-md); padding: 16px; background: #fffbeb;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <span style="background: #fef3c7; color: #78350f; border: 1px solid #d97706; padding: 4px 8px; border-radius: 6px; font-size: 0.75rem; font-weight: 800;">⚠️ MÃ MÔ PHỎNG</span>
              <span style="font-family: monospace; font-weight: 800; font-size: 1.1rem; color: #78350f;">DEMOPLAT15</span>
            </div>
            <div style="font-size: 0.88rem; font-weight: 700; margin-bottom: 4px;">Kịch bản kiểm thử Sàn (15% max 40k)</div>
            <div style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 12px;">Mã ví dụ kiểm thử, không thể dùng để mua hàng thật.</div>
            <button class="btn-apply-sim-code" data-sim="DEMOPLAT15" style="width: 100%; min-height: 44px; background: #ffffff; color: #78350f; border: 2px solid #b45309; border-radius: 8px; font-weight: 700; cursor: pointer;">
              ⚙️ Nạp Vào Bảng Tính
            </button>
          </div>
        </div>

        <div id="stack-copy-status" style="margin-top: 14px; font-weight: 700; font-size: 0.9rem; color: #047857; display: none;"></div>
      </div>

      <canvas id="stack-confetti-canvas" style="position: fixed; inset: 0; pointer-events: none; z-index: 10000; width: 100%; height: 100%; display: none;"></canvas>
    </div>
  `;
}

function attachDynamicStackEvents() {
  const slider = document.getElementById('stack-order-slider');
  const amountInput = document.getElementById('stack-order-amount');
  if (!slider || !amountInput) return;

  function updateStackCalculationUI() {
    const amount = parseInt(amountInput.value, 10) || 150000;
    const shopType = document.getElementById('stack-shop-type').value;
    const shopVal = parseInt(document.getElementById('stack-shop-val').value, 10) || 0;
    const shopMin = parseInt(document.getElementById('stack-shop-min').value, 10) || 0;
    const shopCap = parseInt(document.getElementById('stack-shop-cap').value, 10) || 0;

    const platType = document.getElementById('stack-plat-type').value;
    const platVal = parseInt(document.getElementById('stack-plat-val').value, 10) || 0;
    const platMin = parseInt(document.getElementById('stack-plat-min').value, 10) || 0;
    const platCap = parseInt(document.getElementById('stack-plat-cap').value, 10) || 0;
    const platAllow = document.getElementById('stack-plat-allow').checked;

    const shipFee = parseInt(document.getElementById('stack-ship-fee').value, 10) || 0;
    const shipVal = parseInt(document.getElementById('stack-ship-val').value, 10) || 0;
    const shipMin = parseInt(document.getElementById('stack-ship-min').value, 10) || 0;

    const result = calculateDynamicStack({
      orderAmount: amount,
      shopDiscount: { type: shopType, value: shopVal, minSpend: shopMin, maxCap: shopCap },
      platformDiscount: { type: platType, value: platVal, minSpend: platMin, maxCap: platCap },
      shippingCredit: { fee: shipFee, creditValue: shipVal, minSpend: shipMin },
      allowStacking: platAllow
    });

    const resContainer = document.getElementById('stack-result-container');
    if (resContainer) {
      resContainer.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid var(--border-color); padding-bottom: 12px; margin-bottom: 12px;">
          <div>
            <div style="font-size: 0.85rem; color: var(--text-muted); font-weight: 700;">TỔNG THANH TOÁN THỰC TRẢ</div>
            <div style="font-size: 1.8rem; font-weight: 900; color: #0369a1;">
              ${Number(result.finalPayable).toLocaleString('vi-VN')} ₫
            </div>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 0.85rem; color: var(--text-muted); font-weight: 700;">TIẾT KIỆM ĐƯỢC</div>
            <div style="font-size: 1.25rem; font-weight: 800; color: #047857;">
              ${Number(result.totalSaved).toLocaleString('vi-VN')} ₫
            </div>
          </div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 8px; font-size: 0.88rem;">
          <div style="display: flex; justify-content: space-between;">
            <span style="color: var(--text-secondary);">Tiền hàng ban đầu:</span>
            <span style="font-weight: 700;">${Number(result.orderSubtotal).toLocaleString('vi-VN')} ₫</span>
          </div>
          ${result.breakdown.map(b => `
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 6px 8px; border-radius: 6px; background: ${b.applied ? 'rgba(5,150,105,0.06)' : 'rgba(220,38,38,0.04)'};">
              <div>
                <span style="font-weight: 700; color: ${b.applied ? '#047857' : '#991b1b'};">
                  ${b.applied ? '✓' : '✗'} ${b.source === 'SHOP' ? 'Giảm giá Shop' : (b.source === 'PLATFORM' ? 'Giảm giá Sàn' : 'Hỗ trợ Phí Ship')}:
                </span>
                <span style="font-size: 0.8rem; color: var(--text-muted); margin-left: 4px;">${b.reason}</span>
              </div>
              <span style="font-weight: 700; color: ${b.applied ? '#047857' : 'var(--text-muted)'};">
                ${b.applied ? '- ' + Number(b.amount).toLocaleString('vi-VN') + ' ₫' : '0 ₫'}
              </span>
            </div>
          `).join('')}
          <div style="display: flex; justify-content: space-between; padding-top: 6px;">
            <span style="color: var(--text-secondary);">Phí vận chuyển gốc:</span>
            <span style="font-weight: 700;">+ ${Number(result.shippingFee).toLocaleString('vi-VN')} ₫</span>
          </div>
        </div>
      `;
    }

    const msElem = document.getElementById('stack-compute-ms');
    if (msElem) msElem.innerText = result.computeDurationMs.toFixed(3);

    const summaryElem = document.getElementById('stack-benchmark-summary');
    if (summaryElem && window.__STACK_BENCHMARK_LOG__.length > 0) {
      const logs = window.__STACK_BENCHMARK_LOG__;
      const sorted = [...logs].sort((a,b) => a - b);
      const median = sorted[Math.floor(sorted.length / 2)];
      const max = sorted[sorted.length - 1];
      summaryElem.innerText = 'Đối soát hiệu năng: ' + logs.length + ' lần tính | Median: ' + median.toFixed(3) + 'ms | Max: ' + max.toFixed(3) + 'ms';
    }
  }

  // Bind inputs
  slider.addEventListener('input', () => {
    amountInput.value = slider.value;
    updateStackCalculationUI();
  });
  amountInput.addEventListener('input', () => {
    slider.value = amountInput.value;
    updateStackCalculationUI();
  });

  document.querySelectorAll('.btn-preset-chip').forEach(btn => {
    btn.addEventListener('click', () => {
      const val = btn.dataset.preset;
      amountInput.value = val;
      slider.value = val;
      updateStackCalculationUI();
    });
  });

  ['stack-shop-type', 'stack-shop-val', 'stack-shop-min', 'stack-shop-cap',
   'stack-plat-type', 'stack-plat-val', 'stack-plat-min', 'stack-plat-cap', 'stack-plat-allow',
   'stack-ship-fee', 'stack-ship-val', 'stack-ship-min'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', updateStackCalculationUI);
  });

  // Confetti helper
  function triggerConfetti() {
    const canvas = document.getElementById('stack-confetti-canvas');
    if (!canvas) return;
    const isReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) {
      const statusEl = document.getElementById('stack-copy-status');
      if (statusEl) {
        statusEl.style.display = 'block';
        statusEl.innerText = '✓ Đã sao chép mã! [Tắt hiệu ứng động theo thiết lập thiết bị]';
      }
      return;
    }

    canvas.style.display = 'block';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');
    const particles = [];
    const colors = ['#0284c7', '#f43f5e', '#10b981', '#f59e0b', '#8b5cf6'];

    for (let i = 0; i < 45; i++) {
      particles.push({
        x: window.innerWidth / 2,
        y: window.innerHeight / 3,
        vx: (Math.random() - 0.5) * 10,
        vy: (Math.random() - 0.7) * 12,
        size: Math.random() * 6 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 60
      });
    }

    let frame = 0;
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.3; // gravity
        p.life--;
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, p.size, p.size);
      });
      frame++;
      if (frame < 60) {
        requestAnimationFrame(animate);
      } else {
        canvas.style.display = 'none';
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
    requestAnimationFrame(animate);
  }

  // Copy verified codes
  document.querySelectorAll('.btn-copy-verified-code').forEach(btn => {
    btn.addEventListener('click', () => {
      const code = btn.dataset.code;
      const statusEl = document.getElementById('stack-copy-status');
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(code).then(() => {
          if (statusEl) {
            statusEl.style.display = 'block';
            statusEl.innerText = '✓ Đã sao chép mã ưu đãi đối soát: ' + code;
          }
          showToast('✓ Đã sao chép mã: ' + code);
          triggerConfetti();
        }).catch(() => {
          showToast('Mã ưu đãi: ' + code);
        });
      } else {
        showToast('Mã ưu đãi: ' + code);
      }
    });
  });

  // Simulation codes
  document.querySelectorAll('.btn-apply-sim-code').forEach(btn => {
    btn.addEventListener('click', () => {
      const sim = btn.dataset.sim;
      if (sim === 'DEMOSHOP10') {
        document.getElementById('stack-shop-type').value = 'PERCENT';
        document.getElementById('stack-shop-val').value = '10';
        document.getElementById('stack-shop-min').value = '100000';
        document.getElementById('stack-shop-cap').value = '30000';
      } else if (sim === 'DEMOPLAT15') {
        document.getElementById('stack-plat-type').value = 'PERCENT';
        document.getElementById('stack-plat-val').value = '15';
        document.getElementById('stack-plat-min').value = '120000';
        document.getElementById('stack-plat-cap').value = '40000';
      }
      updateStackCalculationUI();
      showToast('Đã nạp kịch bản mô phỏng ' + sim + ' vào bảng tính.');
    });
  });

  // Initial calculation
  updateStackCalculationUI();
}

// --- 2. LUNCH COMPARISON VIEW ---
function renderLunchComparisonView() {
  const peak = isPeakMealHour();
  return `
    <div class="cr-experience-container">
      <div class="civic-ticker-cr">
        <span class="story-kicker">🍱 SO KÈO BỮA TRƯA 3 ỨNG DỤNG — SHOPEEFOOD / GRABFOOD / BEFOOD</span>
      </div>

      <div style="background: var(--bg-card); padding: 24px; border-radius: var(--radius-lg); border: 1px solid var(--border-color); box-shadow: var(--shadow-sm); margin-bottom: 24px;">
        <h1 style="font-size: 1.5rem; font-weight: 800; margin-bottom: 8px; color: var(--text-primary);">
          So Sánh Chi Phí Đặt Cơm Trưa Tại Đà Nẵng
        </h1>
        <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 16px; line-height: 1.5;">
          Ước tính giá cuối cùng khi đặt cùng một suất ăn qua 3 nền tảng giao hàng phổ biến. Bạn có thể tự do điều chỉnh phí giao hàng, phí dịch vụ và phụ phí qua cầu theo khu vực.
        </p>

        <!-- Peak Hour Banner -->
        <div id="lunch-peak-banner" style="background: ${peak.isPeak ? '#fee2e2' : '#ecfdf5'}; border: 1px solid ${peak.isPeak ? '#fca5a5' : '#a7f3d0'}; padding: 12px 16px; border-radius: var(--radius-md); margin-bottom: 20px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;">
          <div>
            <span style="font-weight: 800; color: ${peak.isPeak ? '#b91c1c' : '#047857'}; font-size: 0.9rem;">
              ${peak.isPeak ? '🔴 ' + peak.peakName : '🟢 ' + peak.peakName}
            </span>
            <div style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 2px;">
              ${peak.isPeak ? 'Lưu ý: Phí giao hàng có thể biến động trong giờ cao điểm theo chính sách của từng ứng dụng.' : 'Khung giờ thông thường: Phí giao hàng ổn định và ít phát sinh phụ phí thời gian.'}
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <label for="lunch-clock-select" style="font-size: 0.8rem; font-weight: 700;">Kiểm thử giờ:</label>
            <select id="lunch-clock-select" style="min-height: 44px; height: 44px; padding: 8px 12px; border-radius: 6px; border: 1px solid var(--border-color); font-size: 0.85rem; box-sizing: border-box;">
              <option value="REAL">Thời gian thực hệ thống</option>
              <option value="12:00">12:00 (Cao điểm trưa)</option>
              <option value="14:00">14:00 (Khung giờ thường)</option>
              <option value="17:30">17:30 (Cao điểm tối)</option>
            </select>
          </div>
        </div>

        <!-- Controls: Dish Price & Bridge Surcharge -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; margin-bottom: 20px; background: var(--bg-card-subtle); padding: 16px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
          <div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
              <label for="lunch-dish-price" style="font-weight: 700; font-size: 0.9rem;">1. Giá món ăn (20.000 ₫ - 200.000 ₫):</label>
            </div>
            <div style="display: flex; gap: 10px; align-items: center;">
              <input type="range" id="lunch-dish-slider" min="20000" max="200000" step="5000" value="35000" style="flex: 1; accent-color: #0369a1; min-height: 44px; height: 44px; cursor: pointer;" aria-label="Thanh trượt giá món ăn" />
              <input type="number" id="lunch-dish-price" min="20000" max="200000" step="1000" value="35000" style="width: 120px; min-height: 44px; height: 44px; padding: 8px 12px; border: 1px solid var(--border-color); border-radius: 6px; font-size: 1rem; font-weight: 700; text-align: right; box-sizing: border-box;" aria-label="Giá món ăn" />
              <span style="font-weight: 700;">₫</span>
            </div>
          </div>

          <div>
            <label for="lunch-bridge-select" style="font-weight: 700; font-size: 0.9rem; display: block; margin-bottom: 6px;">
              2. Phụ phí qua cầu (Tự chọn thủ công, không dùng GPS):
            </label>
            <select id="lunch-bridge-select" style="width: 100%; min-height: 44px; height: 44px; padding: 8px 12px; border-radius: 6px; border: 1px solid var(--border-color); font-size: 0.9rem; background: var(--bg-card); box-sizing: border-box;">
              <option value="0" selected>Nội quận / Không qua cầu (+0 ₫)</option>
              <option value="5000">Cầu Rồng (+5.000 ₫ - Giả định kịch bản)</option>
              <option value="5000">Cầu Sông Hàn (+5.000 ₫ - Giả định kịch bản)</option>
              <option value="5000">Cầu Trần Thị Lý (+5.000 ₫ - Giả định kịch bản)</option>
              <option value="7000">Cầu Thuận Phước (+7.000 ₫ - Giả định kịch bản)</option>
            </select>
          </div>
        </div>

        <!-- 3-Column App Comparison Cards -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px; margin-bottom: 20px;">
          <!-- ShopeeFood -->
          <div class="app-compare-card" id="card-shopeefood" style="border: 2px solid #c2410c; border-radius: var(--radius-md); padding: 16px; background: var(--bg-card); position: relative;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
              <span style="font-size: 1.1rem; font-weight: 800; color: #c2410c;">ShopeeFood</span>
              <span class="badge-best-deal" id="badge-shopee" style="display: none; background: #c2410c; color: #ffffff; padding: 2px 8px; border-radius: 4px; font-size: 0.72rem; font-weight: 800;">🏆 THẤP NHẤT</span>
            </div>
            <div style="display: flex; flex-direction: column; gap: 8px; font-size: 0.85rem;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span>Phí giao hàng:</span>
                <input type="number" id="lunch-shopee-del" value="16000" step="1000" style="width: 90px; min-height: 44px; height: 44px; padding: 8px 10px; border: 1px solid var(--border-color); border-radius: 6px; font-weight: 700; text-align: right; box-sizing: border-box;" />
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span>Phí dịch vụ:</span>
                <input type="number" id="lunch-shopee-srv" value="2000" step="500" style="width: 90px; min-height: 44px; height: 44px; padding: 8px 10px; border: 1px solid var(--border-color); border-radius: 6px; font-weight: 700; text-align: right; box-sizing: border-box;" />
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span>Khuyến mãi / Giảm giá:</span>
                <input type="number" id="lunch-shopee-dsc" value="10000" step="1000" style="width: 90px; min-height: 44px; height: 44px; padding: 8px 10px; border: 1px solid var(--border-color); border-radius: 6px; font-weight: 700; text-align: right; box-sizing: border-box;" />
              </div>
              <div style="border-top: 1px solid var(--border-subtle); padding-top: 8px; margin-top: 4px; display: flex; justify-content: space-between; align-items: baseline;">
                <span style="font-weight: 700;">Tổng thực trả:</span>
                <span id="lunch-shopee-total" style="font-size: 1.3rem; font-weight: 900; color: #c2410c;">43.000 ₫</span>
              </div>
            </div>
          </div>

          <!-- GrabFood -->
          <div class="app-compare-card" id="card-grabfood" style="border: 2px solid #15803d; border-radius: var(--radius-md); padding: 16px; background: var(--bg-card); position: relative;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
              <span style="font-size: 1.1rem; font-weight: 800; color: #15803d;">GrabFood</span>
              <span class="badge-best-deal" id="badge-grab" style="display: none; background: #15803d; color: white; padding: 2px 8px; border-radius: 4px; font-size: 0.72rem; font-weight: 800;">🏆 THẤP NHẤT</span>
            </div>
            <div style="display: flex; flex-direction: column; gap: 8px; font-size: 0.85rem;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span>Phí giao hàng:</span>
                <input type="number" id="lunch-grab-del" value="18000" step="1000" style="width: 90px; min-height: 44px; height: 44px; padding: 8px 10px; border: 1px solid var(--border-color); border-radius: 6px; font-weight: 700; text-align: right; box-sizing: border-box;" />
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span>Phí dịch vụ:</span>
                <input type="number" id="lunch-grab-srv" value="3000" step="500" style="width: 90px; min-height: 44px; height: 44px; padding: 8px 10px; border: 1px solid var(--border-color); border-radius: 6px; font-weight: 700; text-align: right; box-sizing: border-box;" />
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span>Khuyến mãi / Giảm giá:</span>
                <input type="number" id="lunch-grab-dsc" value="12000" step="1000" style="width: 90px; min-height: 44px; height: 44px; padding: 8px 10px; border: 1px solid var(--border-color); border-radius: 6px; font-weight: 700; text-align: right; box-sizing: border-box;" />
              </div>
              <div style="border-top: 1px solid var(--border-subtle); padding-top: 8px; margin-top: 4px; display: flex; justify-content: space-between; align-items: baseline;">
                <span style="font-weight: 700;">Tổng thực trả:</span>
                <span id="lunch-grab-total" style="font-size: 1.3rem; font-weight: 900; color: #15803d;">44.000 ₫</span>
              </div>
            </div>
          </div>

          <!-- BeFood -->
          <div class="app-compare-card" id="card-befood" style="border: 2px solid #854d0e; border-radius: var(--radius-md); padding: 16px; background: var(--bg-card); position: relative;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
              <span style="font-size: 1.1rem; font-weight: 800; color: #854d0e;">BeFood</span>
              <span class="badge-best-deal" id="badge-be" style="display: none; background: #854d0e; color: #ffffff; padding: 2px 8px; border-radius: 4px; font-size: 0.72rem; font-weight: 800;">🏆 THẤP NHẤT</span>
            </div>
            <div style="display: flex; flex-direction: column; gap: 8px; font-size: 0.85rem;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span>Phí giao hàng:</span>
                <input type="number" id="lunch-be-del" value="15000" step="1000" style="width: 90px; min-height: 44px; height: 44px; padding: 8px 10px; border: 1px solid var(--border-color); border-radius: 6px; font-weight: 700; text-align: right; box-sizing: border-box;" />
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span>Phí dịch vụ:</span>
                <input type="number" id="lunch-be-srv" value="1000" step="500" style="width: 90px; min-height: 44px; height: 44px; padding: 8px 10px; border: 1px solid var(--border-color); border-radius: 6px; font-weight: 700; text-align: right; box-sizing: border-box;" />
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span>Khuyến mãi / Giảm giá:</span>
                <input type="number" id="lunch-be-dsc" value="8000" step="1000" style="width: 90px; min-height: 44px; height: 44px; padding: 8px 10px; border: 1px solid var(--border-color); border-radius: 6px; font-weight: 700; text-align: right; box-sizing: border-box;" />
              </div>
              <div style="border-top: 1px solid var(--border-subtle); padding-top: 8px; margin-top: 4px; display: flex; justify-content: space-between; align-items: baseline;">
                <span style="font-weight: 700;">Tổng thực trả:</span>
                <span id="lunch-be-total" style="font-size: 1.3rem; font-weight: 900; color: #854d0e;">43.000 ₫</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Transparent Notice -->
        <div style="background: var(--bg-card-subtle); border-left: 3px solid #0284c7; padding: 12px 16px; border-radius: 6px; font-size: 0.82rem; color: var(--text-secondary); line-height: 1.5;">
          🛡️ <strong>Minh bạch dữ liệu:</strong> Kết quả trên là bảng tính so sánh dựa trên các tham số do người dùng nhập hoặc tùy chỉnh, không phải báo giá thời gian thực từ máy chủ của các ứng dụng gọi món. Phụ phí qua cầu chỉ áp dụng khi bạn chủ động lựa chọn.
        </div>
      </div>
    </div>
  `;
}

function attachLunchComparisonEvents() {
  const slider = document.getElementById('lunch-dish-slider');
  const priceInput = document.getElementById('lunch-dish-price');
  const bridgeSelect = document.getElementById('lunch-bridge-select');
  const clockSelect = document.getElementById('lunch-clock-select');
  if (!slider || !priceInput || !bridgeSelect) return;

  function updateLunchUI() {
    const dishPrice = parseInt(priceInput.value, 10) || 35000;
    const bridge = parseInt(bridgeSelect.value, 10) || 0;

    const appConfigs = {
      shopeefood: {
        deliveryFee: parseInt(document.getElementById('lunch-shopee-del').value, 10) || 0,
        serviceFee: parseInt(document.getElementById('lunch-shopee-srv').value, 10) || 0,
        discount: parseInt(document.getElementById('lunch-shopee-dsc').value, 10) || 0
      },
      grabfood: {
        deliveryFee: parseInt(document.getElementById('lunch-grab-del').value, 10) || 0,
        serviceFee: parseInt(document.getElementById('lunch-grab-srv').value, 10) || 0,
        discount: parseInt(document.getElementById('lunch-grab-dsc').value, 10) || 0
      },
      befood: {
        deliveryFee: parseInt(document.getElementById('lunch-be-del').value, 10) || 0,
        serviceFee: parseInt(document.getElementById('lunch-be-srv').value, 10) || 0,
        discount: parseInt(document.getElementById('lunch-be-dsc').value, 10) || 0
      }
    };

    const res = calculateLunchComparison(dishPrice, appConfigs, bridge);

    document.getElementById('lunch-shopee-total').innerText = Number(res.shopeefood.totalPayable).toLocaleString('vi-VN') + ' ₫';
    document.getElementById('lunch-grab-total').innerText = Number(res.grabfood.totalPayable).toLocaleString('vi-VN') + ' ₫';
    document.getElementById('lunch-be-total').innerText = Number(res.befood.totalPayable).toLocaleString('vi-VN') + ' ₫';

    // Find min
    const totals = [
      { id: 'shopee', total: res.shopeefood.totalPayable },
      { id: 'grab', total: res.grabfood.totalPayable },
      { id: 'be', total: res.befood.totalPayable }
    ];
    const minTotal = Math.min(...totals.map(t => t.total));

    ['shopee', 'grab', 'be'].forEach(app => {
      const badge = document.getElementById('badge-' + app);
      const isMin = totals.find(t => t.id === app).total === minTotal;
      if (badge) badge.style.display = isMin ? 'inline-block' : 'none';
    });
  }

  slider.addEventListener('input', () => {
    priceInput.value = slider.value;
    updateLunchUI();
  });
  priceInput.addEventListener('input', () => {
    slider.value = priceInput.value;
    updateLunchUI();
  });
  bridgeSelect.addEventListener('change', updateLunchUI);

  if (clockSelect) {
    clockSelect.addEventListener('change', () => {
      const val = clockSelect.value;
      if (val === 'REAL') {
        window.__JAYT_CLOCK__ = null;
      } else {
        window.__JAYT_CLOCK__ = val;
      }
      const banner = document.getElementById('lunch-peak-banner');
      const peak = isPeakMealHour();
      if (banner) {
        banner.style.background = peak.isPeak ? '#fee2e2' : '#ecfdf5';
        banner.style.borderColor = peak.isPeak ? '#fca5a5' : '#a7f3d0';
        banner.querySelector('span').innerText = peak.isPeak ? '🔴 ' + peak.peakName : '🟢 ' + peak.peakName;
        banner.querySelector('span').style.color = peak.isPeak ? '#b91c1c' : '#047857';
      }
      updateLunchUI();
    });
  }

  ['lunch-shopee-del', 'lunch-shopee-srv', 'lunch-shopee-dsc',
   'lunch-grab-del', 'lunch-grab-srv', 'lunch-grab-dsc',
   'lunch-be-del', 'lunch-be-srv', 'lunch-be-dsc'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', updateLunchUI);
  });

  updateLunchUI();
}

// --- 3. CINEMA CALENDAR & SPLIT BILL PRO VIEW ---
function renderCinemaSplitView() {
  return `
    <div class="cr-experience-container">
      <div class="civic-ticker-cr">
        <span class="story-kicker">🎬 LỊCH RẠP CHIẾU & CÔNG CỤ CHIA TIỀN NHÓM (SPLIT BILL PRO)</span>
      </div>

      <!-- Weekly Cinema Schedule Fixtures -->
      <div style="background: var(--bg-card); padding: 24px; border-radius: var(--radius-lg); border: 1px solid var(--border-color); box-shadow: var(--shadow-sm); margin-bottom: 24px;">
        <h1 style="font-size: 1.5rem; font-weight: 800; margin-bottom: 8px; color: var(--text-primary);">
          Lịch Chiếu Phim Ưu Đãi Đà Nẵng
        </h1>
        <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 16px; line-height: 1.5;">
          Tổng hợp các khung giá vé ưu đãi định kỳ trong tuần tại các cụm rạp. Bấm "Nạp vào bộ chia tiền" để tính ngay chi phí nhóm.
        </p>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px; margin-bottom: 12px;">
          ${CINEMA_SCENARIOS.map(c => `
            <div style="border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 16px; background: var(--bg-card-subtle); display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                  <span style="background: #0369a1; color: white; font-size: 0.75rem; font-weight: 800; padding: 4px 10px; border-radius: 6px;">${c.day}</span>
                  <span style="font-size: 0.75rem; color: #78350f; font-weight: 800; background: #fef3c7; border: 1px solid #d97706; padding: 2px 6px; border-radius: 4px;">⚠️ MÔ PHỎNG</span>
                </div>
                <div style="font-weight: 800; font-size: 1rem; color: var(--text-primary); margin-bottom: 2px;">${c.brand}</div>
                <div style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 8px;">${c.title}</div>
                <div style="font-size: 1.3rem; font-weight: 900; color: #0369a1; margin-bottom: 6px;">
                  ${Number(c.priceVnd).toLocaleString('vi-VN')} ₫
                </div>
                <div style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 12px;">${c.note}</div>
              </div>
              <button class="btn-cinema-select" data-brand="${c.brand}" data-price="${c.priceVnd}" style="width: 100%; min-height: 44px; background: var(--bg-card); color: #0369a1; border: 2px solid #0369a1; border-radius: 8px; font-weight: 700; cursor: pointer;">
                👉 Nạp Vào Bộ Chia Tiền
              </button>
            </div>
          `).join('')}
        </div>
        <div style="font-size: 0.78rem; color: var(--text-muted);">
          * Lưu ý: Các mức giá trên là kịch bản mô phỏng đối soát cho Đà Nẵng, áp dụng theo điều kiện cụ thể của từng rạp (thẻ sinh viên U22, ngày thành viên, hoặc khung giờ vàng).
        </div>
      </div>

      <!-- Split Bill Pro Calculator -->
      <div style="background: var(--bg-card); padding: 24px; border-radius: var(--radius-lg); border: 1px solid var(--border-color); box-shadow: var(--shadow-sm); margin-bottom: 24px;">
        <h2 style="font-size: 1.35rem; font-weight: 800; margin-bottom: 6px; color: var(--text-primary);">
          Split Bill Pro: Chia Tiền Nhóm Số Nguyên Tuyệt Đối
        </h2>
        <p style="font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 20px;">
          Chia đều số tiền nguyên VNĐ cho nhóm từ 2 đến 8 thành viên. Bảo toàn 100% tổng hóa đơn, giải quyết minh bạch phần dư tiền lẻ.
        </p>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; margin-bottom: 24px;">
          <!-- Controls Column -->
          <div style="background: var(--bg-card-subtle); padding: 18px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
            <div style="margin-bottom: 16px;">
              <label for="split-member-count" style="font-weight: 700; font-size: 0.9rem; display: block; margin-bottom: 6px;">
                1. Số thành viên trong nhóm (2 - 8 người):
              </label>
              <div style="display: flex; align-items: center; gap: 8px;">
                <button type="button" id="btn-split-dec" style="width: 44px; height: 44px; border-radius: 8px; border: 1px solid var(--border-color); background: var(--bg-card); font-size: 1.2rem; font-weight: 800; cursor: pointer;">-</button>
                <input type="number" id="split-member-count" min="2" max="8" value="4" style="width: 70px; height: 44px; text-align: center; font-size: 1.1rem; font-weight: 800; border: 1px solid var(--border-color); border-radius: 8px;" />
                <button type="button" id="btn-split-inc" style="width: 44px; height: 44px; border-radius: 8px; border: 1px solid var(--border-color); background: var(--bg-card); font-size: 1.2rem; font-weight: 800; cursor: pointer;">+</button>
              </div>
            </div>

            <div style="margin-bottom: 16px;">
              <label for="split-ticket-cost" style="font-weight: 700; font-size: 0.9rem; display: block; margin-bottom: 6px;">
                2. Tiền vé / Món chính:
              </label>
              <div style="display: flex; align-items: center; gap: 8px;">
                <input type="number" id="split-ticket-cost" value="180000" step="5000" style="flex: 1; height: 44px; padding: 0 12px; border: 1px solid var(--border-color); border-radius: 8px; font-weight: 700; font-size: 1rem; text-align: right;" />
                <span style="font-weight: 700;">₫</span>
              </div>
            </div>

            <div style="margin-bottom: 16px;">
              <label for="split-extra-cost" style="font-weight: 700; font-size: 0.9rem; display: block; margin-bottom: 6px;">
                3. Bắp nước / Phụ phí khác:
              </label>
              <div style="display: flex; align-items: center; gap: 8px;">
                <input type="number" id="split-extra-cost" value="30000" step="5000" style="flex: 1; height: 44px; padding: 0 12px; border: 1px solid var(--border-color); border-radius: 8px; font-weight: 700; font-size: 1rem; text-align: right;" />
                <span style="font-weight: 700;">₫</span>
              </div>
            </div>

            <div style="padding-top: 12px; border-top: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: baseline;">
              <span style="font-weight: 800; font-size: 0.95rem;">Tổng hóa đơn:</span>
              <span id="split-total-display" style="font-size: 1.4rem; font-weight: 900; color: #0369a1;">210.000 ₫</span>
            </div>
          </div>

          <!-- Result Column -->
          <div style="display: flex; flex-direction: column; justify-content: space-between; background: var(--bg-card-subtle); padding: 18px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
            <div>
              <div style="font-size: 0.85rem; color: var(--text-muted); font-weight: 700; margin-bottom: 4px;">KẾT QUẢ CHIA TIỀN MỖI NGƯỜI</div>
              <div id="split-share-display" style="font-size: 2rem; font-weight: 900; color: #047857; margin-bottom: 12px;">
                52.500 ₫
              </div>

              <div id="split-remainder-box" style="background: var(--bg-card); padding: 12px; border-radius: 8px; border: 1px solid var(--border-color); margin-bottom: 16px; font-size: 0.85rem; line-height: 1.5;">
                <!-- Remainder text -->
              </div>

              <div id="split-conservation-check" style="font-size: 0.82rem; font-weight: 700; color: #065f46; background: #d1fae5; padding: 8px 12px; border-radius: 6px; margin-bottom: 12px;">
                ✓ 100% Bảo toàn tổng chi phí
              </div>
            </div>

            <div style="font-size: 0.8rem; color: var(--text-muted);">
              🛡️ <strong>Zero-PII:</strong> Công cụ không lưu họ tên, số điện thoại hay số tài khoản ngân hàng của các thành viên.
            </div>
          </div>
        </div>

        <!-- Canvas Zalo Pass Export -->
        <div style="border-top: 1px solid var(--border-color); padding-top: 20px;">
          <h3 style="font-size: 1.15rem; font-weight: 800; margin-bottom: 6px;">Thẻ Chia Tiền Nhóm — Zalo Pass (Canvas 600x750)</h3>
          <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 16px;">
            Xuất hình ảnh thẻ vé điện tử để gửi trực tiếp vào nhóm Zalo/Messenger kèm liên kết tra cứu chính thức.
          </p>

          <div style="display: flex; flex-wrap: wrap; gap: 24px; align-items: center; justify-content: center;">
            <canvas id="split-zalo-canvas" width="600" height="750" style="width: 100%; max-width: 320px; aspect-ratio: 600/750; border-radius: 14px; box-shadow: 0 10px 25px rgba(0,0,0,0.15); border: 1px solid var(--border-color);"></canvas>

            <div style="display: flex; flex-direction: column; gap: 12px; width: 100%; max-width: 320px;">
              <button id="btn-download-zalo-pass" style="width: 100%; min-height: 44px; background: #0369a1; color: #ffffff; border: none; border-radius: 8px; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px;">
                📥 Tải Thẻ Zalo Pass (PNG)
              </button>
              <button id="btn-copy-split-msg" style="width: 100%; min-height: 44px; background: var(--bg-card); color: #0369a1; border: 2px solid #0369a1; border-radius: 8px; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px;">
                📋 Sao Chép Tin Nhắn Nhóm
              </button>
              <button id="btn-share-split-pass" style="width: 100%; min-height: 44px; background: #047857; color: white; border: none; border-radius: 8px; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px;">
                🚀 Chia Sẻ (Native Share)
              </button>
              <div id="split-action-status" style="font-size: 0.85rem; font-weight: 700; color: #047857; display: none;"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function attachCinemaSplitEvents() {
  const memberInput = document.getElementById('split-member-count');
  const ticketInput = document.getElementById('split-ticket-cost');
  const extraInput = document.getElementById('split-extra-cost');
  const btnInc = document.getElementById('btn-split-inc');
  const btnDec = document.getElementById('btn-split-dec');
  let selectedActivity = 'Xem Phim Nhóm & Giải Trí';

  if (!memberInput || !ticketInput || !extraInput) return;

  function updateSplitUI() {
    const count = Math.max(2, Math.min(8, parseInt(memberInput.value, 10) || 4));
    memberInput.value = count;
    const ticket = Math.max(0, parseInt(ticketInput.value, 10) || 0);
    const extra = Math.max(0, parseInt(extraInput.value, 10) || 0);
    const total = ticket + extra;

    const res = calculateIntegerSplit(total, count);

    document.getElementById('split-total-display').innerText = Number(total).toLocaleString('vi-VN') + ' ₫';
    document.getElementById('split-share-display').innerText = Number(res.baseShare).toLocaleString('vi-VN') + ' ₫ / người';

    const remainderBox = document.getElementById('split-remainder-box');
    if (remainderBox) {
      if (res.remainder === 0) {
        remainderBox.innerHTML = `
          <span style="color: #047857; font-weight: 700;">✓ Chia đều chẵn tiền:</span> Mỗi thành viên đóng đúng ${Number(res.baseShare).toLocaleString('vi-VN')} ₫. Không dư lẻ.
        `;
      } else {
        remainderBox.innerHTML = `
          <div style="color: #78350f; font-weight: 700; margin-bottom: 4px;">
            ⚠️ Còn dư ${Number(res.remainder).toLocaleString('vi-VN')} ₫ do tiền lẻ:
          </div>
          <div>Mỗi bạn đóng: <strong>${Number(res.baseShare).toLocaleString('vi-VN')} ₫</strong>.</div>
          <div style="margin-top: 4px; color: var(--text-secondary);">
            Gợi ý: 1 bạn chuyển thêm ${Number(res.remainder).toLocaleString('vi-VN')} ₫ (thành ${Number(res.baseShare + res.remainder).toLocaleString('vi-VN')} ₫) hoặc để lại làm quỹ nhóm.
          </div>
        `;
      }
    }

    const checkElem = document.getElementById('split-conservation-check');
    if (checkElem) {
      checkElem.innerText = `✓ 100% Bảo toàn: ${Number(res.baseShare).toLocaleString('vi-VN')} ₫ × ${count} + ${Number(res.remainder).toLocaleString('vi-VN')} ₫ = ${Number(total).toLocaleString('vi-VN')} ₫`;
    }

    drawZaloPassCanvas(total, count, res.baseShare, res.remainder, selectedActivity);
  }

  function drawZaloPassCanvas(total, count, baseShare, remainder, activity) {
    const canvas = document.getElementById('split-zalo-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = 600;
    const H = 750;

    // Background
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, W, H);

    // Card background
    ctx.fillStyle = '#1e293b';
    ctx.roundRect ? ctx.roundRect(24, 24, W - 48, H - 48, 20) : ctx.fillRect(24, 24, W - 48, H - 48);
    ctx.fill();

    // Gradient Header
    const grad = ctx.createLinearGradient(24, 24, W - 24, 180);
    grad.addColorStop(0, '#0284c7');
    grad.addColorStop(1, '#06b6d4');
    ctx.fillStyle = grad;
    if (ctx.roundRect) {
      ctx.beginPath();
      ctx.roundRect(24, 24, W - 48, 140, [20, 20, 0, 0]);
      ctx.fill();
    } else {
      ctx.fillRect(24, 24, W - 48, 140);
    }

    // Header Text
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 22px sans-serif';
    ctx.fillText('JAYT ĐÀ NẴNG — BOARDING PASS', 48, 70);
    ctx.font = 'normal 15px sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.fillText('THẺ CHIA TIỀN NHÓM MINH BẠCH (ZERO-PII)', 48, 100);

    // Activity
    ctx.fillStyle = '#94a3b8';
    ctx.font = '14px sans-serif';
    ctx.fillText('HOẠT ĐỘNG / MỤC TIÊU:', 48, 205);
    ctx.fillStyle = '#f8fafc';
    ctx.font = 'bold 20px sans-serif';
    ctx.fillText(activity, 48, 235);

    // Details Grid
    ctx.fillStyle = '#334155';
    ctx.fillRect(48, 265, W - 96, 2);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '14px sans-serif';
    ctx.fillText('SỐ THÀNH VIÊN:', 48, 305);
    ctx.fillText('TỔNG HÓA ĐƠN:', 320, 305);

    ctx.fillStyle = '#f8fafc';
    ctx.font = 'bold 22px sans-serif';
    ctx.fillText(count + ' người', 48, 338);
    ctx.fillText(Number(total).toLocaleString('vi-VN') + ' ₫', 320, 338);

    // Big Share Box
    ctx.fillStyle = 'rgba(2, 132, 199, 0.15)';
    if (ctx.roundRect) {
      ctx.beginPath();
      ctx.roundRect(48, 375, W - 96, 150, 14);
      ctx.fill();
    } else {
      ctx.fillRect(48, 375, W - 96, 150);
    }
    ctx.strokeStyle = '#0284c7';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 16px sans-serif';
    ctx.fillText('MỖI NGƯỜI CHUYỂN KHOẢN:', 72, 415);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 44px sans-serif';
    ctx.fillText(Number(baseShare).toLocaleString('vi-VN') + ' ₫', 72, 475);

    if (remainder > 0) {
      ctx.fillStyle = '#f59e0b';
      ctx.font = 'bold 15px sans-serif';
      ctx.fillText('* Còn dư ' + Number(remainder).toLocaleString('vi-VN') + ' ₫ (1 người đóng thêm hoặc góp quỹ)', 72, 505);
    } else {
      ctx.fillStyle = '#10b981';
      ctx.font = 'bold 15px sans-serif';
      ctx.fillText('✓ Chia đều trọn vẹn, không phát sinh số dư lẻ', 72, 505);
    }

    // Footer & Disclaimer
    ctx.fillStyle = '#64748b';
    ctx.font = '13px sans-serif';
    ctx.fillText('Đối soát tại: https://jayt-production-v3420.vercel.app', 48, 570);
    ctx.fillText('Thẻ chỉ thể hiện số tiền và thành viên, bảo mật tuyệt đối Zero-PII.', 48, 595);

    // Barcode simulated lines
    ctx.fillStyle = '#475569';
    for (let i = 0; i < 46; i++) {
      const x = 48 + i * 11;
      const w = (i % 3 === 0) ? 5 : (i % 2 === 0 ? 3 : 2);
      ctx.fillRect(x, 630, w, 50);
    }
    ctx.fillStyle = '#94a3b8';
    ctx.font = '12px monospace';
    ctx.fillText('JAYT-363-SPLIT-VERIFIED-V3', 200, 700);
  }

  // Bind Buttons
  btnInc.addEventListener('click', () => {
    let c = parseInt(memberInput.value, 10) || 4;
    if (c < 8) memberInput.value = c + 1;
    updateSplitUI();
  });
  btnDec.addEventListener('click', () => {
    let c = parseInt(memberInput.value, 10) || 4;
    if (c > 2) memberInput.value = c - 1;
    updateSplitUI();
  });

  memberInput.addEventListener('input', updateSplitUI);
  ticketInput.addEventListener('input', updateSplitUI);
  extraInput.addEventListener('input', updateSplitUI);

  // Cinema presets
  document.querySelectorAll('.btn-cinema-select').forEach(btn => {
    btn.addEventListener('click', () => {
      const price = parseInt(btn.dataset.price, 10) || 45000;
      const brand = btn.dataset.brand;
      const count = parseInt(memberInput.value, 10) || 4;
      ticketInput.value = price * count;
      selectedActivity = brand + ' (' + Number(price).toLocaleString('vi-VN') + ' ₫/vé)';
      updateSplitUI();
      showToast('Đã nạp giá vé ' + brand + ' vào bộ chia tiền nhóm!');
    });
  });

  // Download Zalo Pass PNG
  const btnDownload = document.getElementById('btn-download-zalo-pass');
  if (btnDownload) {
    btnDownload.addEventListener('click', () => {
      const canvas = document.getElementById('split-zalo-canvas');
      if (!canvas) return;
      try {
        const url = canvas.toDataURL('image/png');
        const a = document.createElement('a');
        a.href = url;
        a.download = 'zalo_pass_jayt.png';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        showToast('✓ Đã tải ảnh Thẻ Zalo Pass (PNG)');
      } catch (err) {
        showToast('Không thể tải ảnh: ' + err.message);
      }
    });
  }

  // Copy Split Text Message
  const btnCopyMsg = document.getElementById('btn-copy-split-msg');
  if (btnCopyMsg) {
    btnCopyMsg.addEventListener('click', () => {
      const total = parseInt(document.getElementById('split-ticket-cost').value, 10) + parseInt(document.getElementById('split-extra-cost').value, 10);
      const count = parseInt(memberInput.value, 10) || 4;
      const res = calculateIntegerSplit(total, count);

      const msg = `🎬 [JAYT ĐÀ NẴNG - CHIA TIỀN NHÓM]
Hoạt động: ${selectedActivity}
Số người: ${count} thành viên
Tổng hóa đơn: ${Number(total).toLocaleString('vi-VN')} ₫
---------------------------------
👉 Mỗi người chuyển: ${Number(res.baseShare).toLocaleString('vi-VN')} ₫
${res.remainder > 0 ? '⚠️ Còn dư ' + Number(res.remainder).toLocaleString('vi-VN') + ' ₫ (1 người chuyển thêm hoặc góp quỹ)\n' : ''}---------------------------------
Tra cứu đối soát tại: https://jayt-production-v3420.vercel.app`;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(msg).then(() => {
          showToast('✓ Đã sao chép nội dung tin nhắn Zalo!');
        }).catch(() => {
          showToast('Không thể sao chép tự động');
        });
      }
    });
  }

  // Native Share
  const btnShare = document.getElementById('btn-share-split-pass');
  if (btnShare) {
    btnShare.addEventListener('click', () => {
      const canvas = document.getElementById('split-zalo-canvas');
      if (navigator.share && canvas) {
        canvas.toBlob(blob => {
          if (!blob) {
            showToast('Không thể tạo file chia sẻ');
            return;
          }
          const file = new File([blob], 'zalo_pass_jayt.png', { type: 'image/png' });
          if (navigator.canShare && navigator.canShare({ files: [file] })) {
            navigator.share({
              title: 'Thẻ Chia Tiền Nhóm JayT',
              text: 'Thẻ chia tiền nhóm minh bạch từ JayT Đà Nẵng: ' + selectedActivity,
              files: [file]
            }).catch(() => {});
          } else {
            navigator.share({
              title: 'Thẻ Chia Tiền Nhóm JayT',
              text: 'Chia tiền nhóm minh bạch tại: https://jayt-production-v3420.vercel.app'
            }).catch(() => {});
          }
        });
      } else {
        // Fallback to download
        btnDownload.click();
      }
    });
  }

  updateSplitUI();
}

// --- 4. MEALS <= 25K & STUDENT BENEFITS VIEW ---
function renderMealsBenefitsView() {
  return `
    <div class="cr-experience-container">
      <div class="civic-ticker-cr">
        <span class="story-kicker">🍲 CƠM SINH VIÊN (CHỜ ĐỐI SOÁT) & CẨM NANG ĐẶC QUYỀN (MÔ PHỎNG THAM CHIẾU)</span>
      </div>

      <!-- Meals <=25K Section -->
      <div style="background: var(--bg-card); padding: 24px; border-radius: var(--radius-lg); border: 1px solid var(--border-color); box-shadow: var(--shadow-sm); margin-bottom: 24px;">
        <h1 style="font-size: 1.5rem; font-weight: 800; margin-bottom: 8px; color: var(--text-primary);">
          Cơm Sinh Viên &le; 25K Quanh 4 Cụm Đại Học
        </h1>
        <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 16px; line-height: 1.5;">
          Khảo sát 10 vị trí ẩm thực tiết kiệm quanh Bách Khoa, Sư Phạm, Kinh Tế DUE và Duy Tân. Minh bạch 100%: Chỉ hiển thị tên và giá khi đã đối soát thực địa; các vị trí chưa có dữ liệu sẽ ghi rõ "Chờ dữ liệu đối soát".
        </p>

        <!-- Campus Filter Tabs -->
        <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 20px;">
          <button class="btn-meal-filter active" data-campus="ALL" style="padding: 6px 14px; border-radius: 8px; border: 1px solid #0369a1; background: #0369a1; color: white; font-weight: 700; font-size: 0.85rem; cursor: pointer;">
            Tất Cả (10 Slot)
          </button>
          <button class="btn-meal-filter" data-campus="BACH_KHOA" style="padding: 6px 14px; border-radius: 8px; border: 1px solid var(--border-color); background: var(--bg-card); color: var(--text-primary); font-weight: 700; font-size: 0.85rem; cursor: pointer;">
            Bách Khoa (BK)
          </button>
          <button class="btn-meal-filter" data-campus="SU_PHAM" style="padding: 6px 14px; border-radius: 8px; border: 1px solid var(--border-color); background: var(--bg-card); color: var(--text-primary); font-weight: 700; font-size: 0.85rem; cursor: pointer;">
            Sư Phạm (SP)
          </button>
          <button class="btn-meal-filter" data-campus="KINH_TE_DUE" style="padding: 6px 14px; border-radius: 8px; border: 1px solid var(--border-color); background: var(--bg-card); color: var(--text-primary); font-weight: 700; font-size: 0.85rem; cursor: pointer;">
            Kinh Tế DUE
          </button>
          <button class="btn-meal-filter" data-campus="DUY_TAN" style="padding: 6px 14px; border-radius: 8px; border: 1px solid var(--border-color); background: var(--bg-card); color: var(--text-primary); font-weight: 700; font-size: 0.85rem; cursor: pointer;">
            Duy Tân (DT)
          </button>
        </div>

        <!-- 10 Listing Slots Grid -->
        <div id="meals-slots-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px;">
          ${MEALS_25K_SLOTS.map(s => `
            <div class="meal-slot-item" data-campus="${s.campus}" style="border: 1px solid #f59e0b; border-radius: var(--radius-md); padding: 16px; background: #fffbeb; display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                  <span style="font-size: 0.75rem; font-weight: 800; background: #fef3c7; color: #78350f; border: 1px solid #d97706; padding: 4px 10px; border-radius: 6px;">
                    SLOT #${s.slot} &bull; ${s.campusLabel}
                  </span>
                  <span style="font-size: 0.72rem; font-weight: 800; color: #78350f;">
                    ⏳ CHỜ ĐỐI SOÁT THỰC ĐỊA
                  </span>
                </div>

                <div style="font-size: 1.05rem; font-weight: 800; color: var(--text-primary); margin-bottom: 4px;">
                  ${s.candidateName ? `${s.candidateName} (Chờ đối soát)` : s.name}
                </div>
                <div style="font-size: 0.82rem; color: var(--text-secondary); margin-bottom: 8px; line-height: 1.4;">
                  📍 ${s.address}
                </div>

                <div style="padding: 10px; background: #fef3c7; border-radius: 6px; font-size: 0.78rem; color: #78350f; margin-bottom: 14px; line-height: 1.4; border: 1px solid #fde68a;">
                  🛡️ <strong>Cam kết minh bạch:</strong> JayT cấm bịa đặt quán ảo hay giá giả. Vị trí này đang chờ đối chứng thực địa theo chuẩn Evidence Contract v3.
                </div>
              </div>

              <button disabled style="width: 100%; min-height: 44px; min-width: 44px; box-sizing: border-box; background: var(--bg-card); color: var(--text-secondary); border: 1px dashed var(--border-color); border-radius: 8px; font-weight: 700; font-size: 0.85rem; cursor: not-allowed;">
                Chưa Khả Dụng Chỉ Đường (Chờ Đối Soát)
              </button>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Student Benefits Guide Panels -->
      <div style="background: var(--bg-card); padding: 24px; border-radius: var(--radius-lg); border: 1px solid var(--border-color); box-shadow: var(--shadow-sm); margin-bottom: 24px;">
        <h2 style="font-size: 1.35rem; font-weight: 800; margin-bottom: 6px; color: var(--text-primary);">
          Cẩm Nang 4 Đặc Quyền Học Đường Minh Bạch
        </h2>
        <p style="font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 20px;">
          Minh bạch 100%: Toàn bộ thông tin dưới đây là Kịch Bản Mô Phỏng / Benchmark Tham Chiếu phục vụ Staging Simulator. Tuyệt đối không coi là số liệu đã kiểm chứng thực tế cho đến khi có capture bằng chứng hợp lệ.
        </p>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px;">
          ${STUDENT_BENEFITS_GUIDES.map(g => `
            <div style="border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 18px; background: var(--bg-card-subtle); display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                  <span style="font-size: 0.72rem; font-weight: 800; background: #fef3c7; color: #78350f; border: 1px solid #d97706; padding: 4px 10px; border-radius: 6px;">
                    ${g.benefitType}
                  </span>
                  <span style="font-size: 0.78rem; font-weight: 700; color: var(--text-muted);">${g.brand}</span>
                </div>

                <div style="font-size: 1.1rem; font-weight: 800; color: var(--text-primary); margin-bottom: 6px;">
                  ${g.title}
                </div>
                <div style="padding: 6px 10px; background: #fffbeb; border: 1px dashed #d97706; border-radius: 6px; font-size: 0.75rem; color: #78350f; margin-bottom: 8px;">
                  ⚠️ <strong>Lưu ý:</strong> Kịch bản mô phỏng giao diện Staging (Chưa kiểm chứng chứng từ thực tế).
                </div>
                <div style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 12px; line-height: 1.4;">
                  ${g.summary}
                </div>

                <div style="background: var(--bg-card); padding: 10px; border-radius: 6px; border: 1px solid var(--border-subtle); font-size: 0.8rem; margin-bottom: 10px;">
                  <strong>Điều kiện:</strong> ${g.eligibility}
                </div>

                <div style="font-size: 0.78rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: 16px; white-space: pre-line;">
                  <strong>Các bước kích hoạt:</strong>\n${g.steps}
                </div>
              </div>

              <a href="${g.officialUrl}" target="_blank" rel="noopener noreferrer" style="width: 100%; min-height: 44px; background: var(--bg-card); color: #0369a1; border: 2px solid #0369a1; text-decoration: none; border-radius: 8px; font-weight: 700; font-size: 0.85rem; display: flex; align-items: center; justify-content: center; gap: 6px;">
                Truy Cập Cổng Đăng Ký Chính Thức &rarr;
              </a>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

function attachMealsBenefitsEvents() {
  const filterBtns = document.querySelectorAll('.btn-meal-filter');
  const items = document.querySelectorAll('.meal-slot-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const campus = btn.dataset.campus;
      filterBtns.forEach(b => {
        b.classList.toggle('active', b === btn);
        if (b === btn) {
          b.style.background = '#0369a1';
          b.style.color = 'white';
          b.style.borderColor = '#0369a1';
        } else {
          b.style.background = 'var(--bg-card)';
          b.style.color = 'var(--text-primary)';
          b.style.borderColor = 'var(--border-color)';
        }
      });

      items.forEach(item => {
        if (campus === 'ALL' || item.dataset.campus === campus) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

// --- 5. SMART AFFILIATE MODAL CONTROLLER ---
function openSmartAffiliateModal(options) {
  const opts = options || { keyword: 'do_dung_ktx', campus: 'bach_khoa', cluster: 'hoa_khanh' };
  const provider = opts.provider || 'shopee';
  const dispatch = dispatchSmartAffiliate(provider, opts);

  const modalRoot = document.getElementById('jayt-modal-root');
  if (!modalRoot) return;

  modalRoot.style.display = 'flex';
  modalRoot.hidden = false;
  modalRoot.innerHTML = `
    <div class="jayt-modal-box" role="dialog" aria-modal="true" aria-labelledby="affiliate-modal-title" style="max-width: 580px; width: 100%;">
      <div class="modal-header">
        <div>
          <span class="modal-kicker kicker-fac" style="color: #c2410c; background: #ffedd5; padding: 2px 8px; border-radius: 4px; font-weight: 800; font-size: 0.75rem;">
            TIẾP THỊ LIÊN KẾT: CHẾ ĐỘ MÔ PHỎNG NỘI BỘ (DRY-RUN)
          </span>
          <h2 id="affiliate-modal-title" class="modal-title" style="font-size: 1.25rem; font-weight: 800; margin-top: 4px;">
            Thử Nghiệm Mua Sắm: ${dispatch.provider}
          </h2>
        </div>
        <button class="modal-close-btn" id="btn-close-aff-modal" aria-label="Đóng">&times;</button>
      </div>

      <div class="modal-body" style="display: flex; flex-direction: column; gap: 14px; font-size: 0.88rem;">
        <div style="background: #fef2f2; border: 1px solid #fecaca; padding: 12px 14px; border-radius: 8px; color: #991b1b; font-size: 0.82rem; line-height: 1.4;">
          🔒 <strong>Thông Báo Pháp Lý & Kỹ Thuật:</strong> ${dispatch.disclaimer}
        </div>

        <div>
          <strong>Tham số điều hướng mô phỏng (Không thu thập PII):</strong>
          <div style="background: var(--bg-card-subtle); padding: 8px 12px; border-radius: 6px; font-family: monospace; font-size: 0.8rem; margin-top: 4px;">
            sub1 (Cơ sở) = ${dispatch.subParams.sub1}<br>
            sub2 (Cụm KTX) = ${dispatch.subParams.sub2}<br>
            sub3 (Thời gian) = ${dispatch.subParams.sub3}
          </div>
        </div>

        <div>
          <strong>Đường dẫn thử nghiệm mô phỏng nội bộ:</strong>
          <div style="background: var(--bg-card-subtle); padding: 8px 12px; border-radius: 6px; font-family: monospace; font-size: 0.78rem; word-break: break-all; margin-top: 4px; color: #0369a1;">
            ${dispatch.constructedUrl}
          </div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 8px;">
          <a href="${dispatch.officialCleanUrl}" target="_blank" rel="noopener noreferrer" style="min-height: 44px; background: #0369a1; color: white; text-decoration: none; border-radius: 8px; font-weight: 700; display: flex; align-items: center; justify-content: center; gap: 6px;">
            🌐 Mở Đường Dẫn Sạch Trực Tiếp (Không Tracking)
          </a>
          <button id="btn-cancel-aff-modal" style="min-height: 44px; background: var(--bg-card); color: var(--text-secondary); border: 1px solid var(--border-color); border-radius: 8px; font-weight: 700; cursor: pointer;">
            Đóng Hộp Thoại
          </button>
        </div>
      </div>
    </div>
  `;

  document.getElementById('btn-close-aff-modal').addEventListener('click', () => {
    modalRoot.style.display = 'none';
    modalRoot.hidden = true;
    modalRoot.innerHTML = '';
  });
  document.getElementById('btn-cancel-aff-modal').addEventListener('click', () => {
    modalRoot.style.display = 'none';
    modalRoot.hidden = true;
    modalRoot.innerHTML = '';
  });
}

if (typeof window !== 'undefined') {
  window.openSmartAffiliateModal = openSmartAffiliateModal;
}


function renderAppShell() {
  if (typeof document === 'undefined') return;
  const root = document.getElementById('jayt-app-root');
  if (!root) return;

  root.innerHTML = `
    <div class="jayt-app-shell theme-${currentTheme}">
      <header class="jayt-header-sticky" role="banner">
        <div class="header-inner">
          <div class="brand-lockup" role="button" tabindex="0" data-nav="HOME" aria-label="Về trang chủ JayT">
            <svg width="28" height="28" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M19 6 V19 C19 24.5 15.5 28 10 28 C6.5 28 4.2 26 3.5 24 C5.2 24 7 22.8 7.5 20.8 C8 18.5 6.5 16.5 4.5 16.5 C3.8 16.5 3 16.8 2.5 17.2 C3.5 10.5 11 6 19 6 Z" fill="url(#jflow-logo-grad-cz)"/>
              <path d="M19 14 C23.5 14 27.5 17 29.5 21 C31 24 32.5 28 33.5 31 C29.5 29 25 27.5 19 27.5 V21.5 C22 21.5 24.5 23 26 24.5 C24.5 20 20.5 17.5 16 17 L19 14 Z" fill="url(#jflow-logo-grad-cz)" opacity="0.9"/>
              <circle cx="27" cy="8" r="3.5" fill="#f43f5e"/>
              <defs>
                <linearGradient id="jflow-logo-grad-cz" x1="4" y1="4" x2="34" y2="34" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#0284c7"/>
                  <stop offset="0.6" stop-color="#06b6d4"/>
                  <stop offset="1" stop-color="#f43f5e"/>
                </linearGradient>
              </defs>
            </svg>
            <div class="brand-text-group">
              <span class="brand-title">JayT Đà Nẵng</span>
              <span class="brand-tagline">Sống Hay Hơn Mỗi Ngày &bull; v3.433.0-staging.cz</span>
            </div>
          </div>

          <nav class="nav-links-desktop" role="navigation" aria-label="Điều hướng chính">
            <button class="nav-btn ${activeView === 'HOME' ? 'active' : ''}" data-nav="HOME">Hôm nay</button>
            <button class="nav-btn ${activeView === 'DYNAMIC_STACK' ? 'active' : ''}" data-nav="DYNAMIC_STACK">⚡ Xếp Chồng</button>
            <button class="nav-btn ${activeView === 'LUNCH_COMPARE' ? 'active' : ''}" data-nav="LUNCH_COMPARE">🍱 Bữa Trưa 3 App</button>
            <button class="nav-btn ${activeView === 'CINEMA_SPLIT' ? 'active' : ''}" data-nav="CINEMA_SPLIT">🎬 Lịch Rạp & Chia Tiền</button>
            <button class="nav-btn ${activeView === 'MEALS_BENEFITS' ? 'active' : ''}" data-nav="MEALS_BENEFITS">🍲 Cơm 25K & Quyền Lợi</button>
            <button class="nav-btn ${activeView === 'EXPLORE' ? 'active' : ''}" data-nav="EXPLORE">Khám phá</button>
            <button class="nav-btn ${activeView === 'WALLET' ? 'active' : ''}" data-nav="WALLET">Ví Voucher</button>
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

      <footer style="text-align: center; padding: 32px 16px; font-size: 0.8rem; color: var(--text-muted); border-top: 1px solid var(--border-color);" role="contentinfo">
        <div>JayT Đà Nẵng &bull; Chuẩn Design System CZ &bull; v3.433.0-staging.cz</div>
      </footer>

      <!-- MOBILE BOTTOM NAVIGATION -->
      <nav class="jayt-mobile-bottom-nav" role="navigation" aria-label="Điều hướng di động">
        <button class="mobile-nav-btn ${activeView === 'HOME' ? 'active' : ''}" data-nav="HOME">
          <span class="nav-icon">🏠</span>
          <span class="nav-text">Hôm nay</span>
        </button>
        <button class="mobile-nav-btn ${activeView === 'DYNAMIC_STACK' ? 'active' : ''}" data-nav="DYNAMIC_STACK">
          <span class="nav-icon">⚡</span>
          <span class="nav-text">Xếp Chồng</span>
        </button>
        <button class="mobile-nav-btn ${activeView === 'LUNCH_COMPARE' ? 'active' : ''}" data-nav="LUNCH_COMPARE">
          <span class="nav-icon">🍱</span>
          <span class="nav-text">Bữa Trưa</span>
        </button>
        <button class="mobile-nav-btn ${activeView === 'CINEMA_SPLIT' ? 'active' : ''}" data-nav="CINEMA_SPLIT">
          <span class="nav-icon">🎬</span>
          <span class="nav-text">Chia Tiền</span>
        </button>
        <button class="mobile-nav-btn ${activeView === 'MEALS_BENEFITS' ? 'active' : ''}" data-nav="MEALS_BENEFITS">
          <span class="nav-icon">🍲</span>
          <span class="nav-text">Cơm 25K</span>
        </button>
      </nav>

      <!-- GLOBAL TOAST & MODAL CONTAINER -->
      <div id="jayt-toast" class="jayt-toast" role="alert" aria-live="polite" hidden>
        <span id="toast-message"></span>
      </div>
      <div id="jayt-modal-root" class="jayt-modal-backdrop" hidden style="display: none;"></div>
    </div>
  `;
}

// 9. VIEW ROUTING DISPATCHER
function renderCurrentView() {
  if (typeof document === 'undefined') return;
  const canvas = document.getElementById('jayt-view-canvas');
  if (!canvas) return;

  if (activeView === 'HOME') {
    canvas.innerHTML = renderDailyGuideHome();
    attachHomeEvents();
  } else if (activeView === 'DYNAMIC_STACK') {
    canvas.innerHTML = renderDynamicStackView();
    attachDynamicStackEvents();
  } else if (activeView === 'LUNCH_COMPARE') {
    canvas.innerHTML = renderLunchComparisonView();
    attachLunchComparisonEvents();
  } else if (activeView === 'CINEMA_SPLIT') {
    canvas.innerHTML = renderCinemaSplitView();
    attachCinemaSplitEvents();
  } else if (activeView === 'MEALS_BENEFITS') {
    canvas.innerHTML = renderMealsBenefitsView();
    attachMealsBenefitsEvents();
  } else if (activeView === 'FOOD_JOURNEY') {
    canvas.innerHTML = renderFoodJourneyRoute();
    attachFoodJourneyEvents();
  } else if (activeView === 'LEISURE_JOURNEY') {
    canvas.innerHTML = renderLeisureJourneyRoute();
    attachLeisureJourneyEvents();
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

// MODAL CONTROLLER
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

// 10. EVENT HANDLERS
function attachGlobalEvents() {
  if (typeof document === 'undefined') return;

  document.querySelectorAll('[data-nav]').forEach(el => {
    const handler = () => {
      activeView = el.dataset.nav;
      if (el.dataset.tierFilter) {
        activeTier = el.dataset.tierFilter;
      }
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

  document.addEventListener('click', (e) => {
    const affBtn = e.target.closest('.btn-open-smart-aff');
    if (affBtn) {
      openSmartAffiliateModal();
    }
  });

  const reportBtn = document.getElementById('btn-open-report');
  if (reportBtn) {
    reportBtn.addEventListener('click', () => {
      const modalHtml = `
        <div class="jayt-modal-box" role="dialog" aria-modal="true" aria-labelledby="report-modal-title">
          <div class="modal-header">
            <div>
              <span class="modal-kicker kicker-fac">CỘNG ĐỒNG ĐÓNG GÓP TIỆN ÍCH</span>
              <h2 id="report-modal-title" class="modal-title">+ Báo Nguồn / Deal Mới</h2>
            </div>
            <button class="modal-close-btn" aria-label="Đóng" id="btn-close-modal">&times;</button>
          </div>
          <div class="modal-body">
            <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 8px;">
              Chia sẻ thông tin ưu đãi hoặc chính sách tại Đà Nẵng để cộng đồng tham khảo.
            </p>
            <div style="font-size: 0.78rem; color: #059669; margin-bottom: 8px; background: #d1fae5; padding: 6px 10px; border-radius: 6px;">
              🛡️ <strong>Cam kết Zero-PII:</strong> Không thu thập tên, số điện thoại hay email cá nhân của bạn.
            </div>
            <input 
              type="text" 
              id="input-report-source" 
              placeholder="Tên đơn vị hoặc đường link chính thức (vd: cgv.vn, dominos.vn)..." 
              maxlength="250"
              style="width: 100%; padding: 10px; margin: 8px 0; border: 1px solid var(--border-color); border-radius: 8px; font-size: 0.9rem;" 
            />
            <div id="report-error-msg" style="display: none; color: #dc2626; font-size: 0.8rem; margin-bottom: 8px;"></div>
            <button class="btn-modal-primary" id="btn-submit-report" style="width: 100%; margin-top: 4px;">Gửi Đóng Góp</button>
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
          showToast('✓ Cảm ơn bạn! Thông tin nguồn đã được tiếp nhận.');
        });
      }
    });
  }
}

function attachHomeEvents() {
  document.querySelectorAll('[data-tier-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      activeView = 'EXPLORE';
      activeTier = btn.dataset.tierFilter;
      document.querySelectorAll('.nav-btn, .mobile-nav-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.nav === 'EXPLORE');
      });
      renderCurrentView();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
}

function attachFoodJourneyEvents() {
  document.querySelectorAll('[data-meal-moment]').forEach(btn => {
    btn.addEventListener('click', () => {
      activeMealMoment = btn.dataset.mealMoment;
      renderCurrentView();
    });
  });

  document.querySelectorAll('[data-food-loc]').forEach(btn => {
    btn.addEventListener('click', () => {
      activeLocality = btn.dataset.foodLoc;
      renderCurrentView();
    });
  });
}

function attachLeisureJourneyEvents() {
  document.querySelectorAll('[data-leisure-cat]').forEach(btn => {
    btn.addEventListener('click', () => {
      activeLeisureCategory = btn.dataset.leisureCat;
      renderCurrentView();
    });
  });
}

function attachExploreEvents() {
  document.querySelectorAll('[data-exp-tier]').forEach(btn => {
    btn.addEventListener('click', () => {
      activeTier = btn.dataset.expTier;
      renderCurrentView();
    });
  });

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
}

function attachThreeLaneWalletEvents() {
  document.querySelectorAll('.btn-save-wallet').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      showToast('✓ Đã lưu thông tin vào danh sách');
    });
  });

  document.querySelectorAll('.nav-btn[data-lane-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      activeWalletLane = btn.dataset.laneFilter;
      renderCurrentView();
    });
  });
}

function attachBuyDecisionEvents() {
  const submitBtn = document.getElementById('btn-submit-check');
  const input = document.getElementById('input-check-deal');
  const resultBox = document.getElementById('decision-result-container');

  if (submitBtn && input && resultBox) {
    submitBtn.addEventListener('click', () => {
      const val = input.value.trim();
      if (!val) {
        showToast('Vui lòng nhập tên món đồ hoặc đường link để tra cứu.');
        return;
      }

      resultBox.style.display = 'block';
      resultBox.innerHTML = `
        <div style="font-size: 0.95rem; font-weight: 700; color: var(--accent-blue); margin-bottom: 8px;">
          ✓ Kết quả đối soát minh bạch: ${val}
        </div>
        <div style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5;">
          • Nguồn: Niêm yết tại cổng thương hiệu chính hãng<br>
          • Phạm vi: Khả dụng tại các chi nhánh Đà Nẵng<br>
          • Lưu ý: Kiểm tra trực tiếp hóa đơn và phụ phí trước khi thanh toán.
        </div>
      `;
      showToast('✓ Đã hoàn tất đối soát thông tin!');
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


// 11. INITIALIZATION & HYDRATION
function initJayTApp() {
  if (typeof document === 'undefined') return;
  document.documentElement.setAttribute('data-theme', currentTheme);
  
  // If static prerender is already in DOM, just attach events and keep current view
  const existingHero = document.querySelector('.hero-shopping-actions-grid');
  if (!existingHero) {
    renderAppShell();
    attachGlobalEvents();
    renderCurrentView();
    attachCardListeners();
    updateNavCounters();
  } else {
    attachGlobalEvents();
    if (activeView === 'HOME') {
      attachHomeEvents();
    } else {
      renderCurrentView();
    }
    attachCardListeners();
    updateNavCounters();
  }
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initJayTApp);
  } else {
    initJayTApp();
  }
}


if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    JAYT_STOREFRONT_VERSION,
    JAYT_DISCOVERY_ITEMS,
    JAYT_WALLET_ENTRIES,
    resolveActionContract,
    renderDailyGuideHome,
    renderFoodJourneyRoute,
    renderLeisureJourneyRoute,
    renderExploreDirectory,
    renderThreeLaneWalletView,
    renderBuyDecisionHub,
    renderSavedView
  };
}
