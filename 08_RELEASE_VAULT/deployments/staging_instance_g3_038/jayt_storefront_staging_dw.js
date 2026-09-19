/**
 * JAYT COMMUNITY OS — CURATED LOCAL EDITORIAL DISCOVERY (SECTION DQ)
 * Release Candidate: v3.451.0-staging.dw
 * Governing Directive: JAYT-245 Section DW (Lines 2877-2894)
 */

(function() {
  'use strict';

  // 0. SILENT ZERO-PII OBSERVABILITY
  if (typeof window !== 'undefined' && window.JAYT_OBSERVABILITY) {
    window.JAYT_OBSERVABILITY.recordEvent('STOREFRONT_INITIALIZED', {
      version: 'v3.451.0-staging.dw',
      environment: 'STAGING_REVIEW_DW',
      theme: 'CURATED_EDITORIAL_DISCOVERY',
      dom_isolation: 'STRICT_ZERO_DOM_INJECTION'
    });
  }

  if (typeof window !== 'undefined') {
    window.JAYT_STOREFRONT_VERSION = 'v3.451.0-staging.dw';
  }

  // 1. DATA LEDGER (50 SANITIZED HONEST TIERED ITEMS: 0 T1, 20 T2, 14 T3, 16 T4)
  const JAYT_DISCOVERY_ITEMS = [
  {
    "item_id": "DEAL_CGV_CGV_thông tin đồng hành",
    "brand": "CGV Cinemas",
    "title": "CGV Cinemas: Cổng Thông Tin Cụm Rạp Đà Nẵng",
    "summary_text": "Tra cứu lịch chiếu phim và thông tin cụm rạp CGV tại Vincom và Vĩnh Trung Plaza Đà Nẵng.",
    "curation_story": "Tra cứu lịch chiếu phim và thông tin cụm rạp CGV tại Vincom và Vĩnh Trung Plaza Đà Nẵng.",
    "scope_text": "CGV Vĩnh Trung Plaza & Vincom Plaza Đà Nẵng",
    "official_source_url": "https://www.cgv.vn",
    "gateway_group": "DI_DAU",
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "SLOT_EVENING",
    "transit_hint": "🚌 Gần tuyến xe buýt DanaBus R16 & Trạm xe đạp TNGO Bạch Đằng",
    "map_query_url": "https://www.google.com/maps/search/?api=1&query=CGV%20Cinemas%3A%20C%E1%BB%95ng%20Th%C3%B4ng%20Tin%20C%E1%BB%A5m%20R%E1%BA%A1p%20%C4%90%C3%A0%20N%E1%BA%B5ng%20%C4%90%C3%A0%20N%E1%BA%B5ng",
    "leisure_category": "CINEMA",
    "meal_moments": null,
    "subject_id": "DEAL_CGV_CGV_thông tin đồng hành",
    "content_type": "EDUCATION_POLICY",
    "tier_level": "TIER_2_PROGRAMME",
    "tier_badge": "🏛️ CỔNG CHÍNH THỨC",
    "tier_badge_class": "tier-badge-programme",
    "specific_action_label": "🏛️ Mở cổng chính thức →",
    "evidence_status": "Nguồn chính thức: www.cgv.vn",
    "visual_asset_url": null,
    "asset_subject_id": null,
    "visual_attribution": null
  },
  {
    "item_id": "DEAL_DOMINOS_thông tin đồng hành",
    "brand": "Domino's Pizza",
    "title": "Domino's Pizza: Kênh Thông Tin Chi Nhánh Đà Nẵng",
    "summary_text": "Mạng lưới cơ sở và thông tin thực đơn tại các chi nhánh Domino's Pizza trên địa bàn Đà Nẵng.",
    "curation_story": "Mạng lưới cơ sở và thông tin thực đơn tại các chi nhánh Domino's Pizza trên địa bàn Đà Nẵng.",
    "scope_text": "Domino's Nguyễn Văn Linh & Pasteur Đà Nẵng",
    "official_source_url": "https://dominos.vn/khuyen-mai/mua-1-tang-1",
    "gateway_group": "AN_GI",
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "ALL_DAY",
    "transit_hint": "🚌 Gần tuyến xe buýt DanaBus R16 & Trạm xe đạp TNGO Bạch Đằng",
    "map_query_url": "https://www.google.com/maps/search/?api=1&query=Domino's%20Pizza%3A%20K%C3%AAnh%20Th%C3%B4ng%20Tin%20Chi%20Nh%C3%A1nh%20%C4%90%C3%A0%20N%E1%BA%B5ng%20%C4%90%C3%A0%20N%E1%BA%B5ng",
    "leisure_category": null,
    "meal_moments": [
      "TRUA",
      "TOI"
    ],
    "subject_id": "DEAL_DOMINOS_thông tin đồng hành",
    "content_type": "PLACE_CULINARY",
    "tier_level": "TIER_2_PROGRAMME",
    "tier_badge": "🏛️ CỔNG CHÍNH THỨC",
    "tier_badge_class": "tier-badge-programme",
    "specific_action_label": "🏛️ Mở cổng dominos.vn →",
    "evidence_status": "Nguồn chính thức: dominos.vn",
    "visual_asset_url": null,
    "asset_subject_id": null,
    "visual_attribution": null
  },
  {
    "item_id": "DEAL_LOTTERIA_HAPPY_LUNCH",
    "brand": "Lotteria Vietnam",
    "title": "Lotteria: Thực Đơn Trưa Happy Lunch",
    "summary_text": "Thông tin thực đơn trưa cơm gà, burger tại hệ thống chi nhánh Lotteria trên địa bàn Đà Nẵng.",
    "curation_story": "Thông tin thực đơn trưa cơm gà, burger tại hệ thống chi nhánh Lotteria trên địa bàn Đà Nẵng.",
    "scope_text": "Tất cả chi nhánh Lotteria TP. Đà Nẵng",
    "official_source_url": "https://www.lotteria.vn/menu/happy-lunch",
    "gateway_group": "AN_GI",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "SLOT_LUNCH",
    "transit_hint": "📍 Kết nối giao thông nội thành thuận tiện",
    "map_query_url": "https://www.google.com/maps/search/?api=1&query=Lotteria%3A%20Th%E1%BB%B1c%20%C4%90%C6%A1n%20Tr%C6%B0a%20Happy%20Lunch%20%C4%90%C3%A0%20N%E1%BA%B5ng",
    "leisure_category": null,
    "meal_moments": [
      "TRUA",
      "TOI"
    ],
    "subject_id": "DEAL_LOTTERIA_HAPPY_LUNCH",
    "content_type": "PLACE_CULINARY",
    "tier_level": "TIER_2_PROGRAMME",
    "tier_badge": "🏛️ CỔNG CHÍNH THỨC",
    "tier_badge_class": "tier-badge-programme",
    "specific_action_label": "🏛️ Mở cổng www.lotteria.vn →",
    "evidence_status": "Nguồn chính thức: www.lotteria.vn",
    "visual_asset_url": null,
    "asset_subject_id": null,
    "visual_attribution": null
  },
  {
    "item_id": "DEAL_METIZ_U22",
    "brand": "Metiz Cinema",
    "title": "Metiz Cinema: Chính Sách Khán Giả Trẻ U22",
    "summary_text": "Thông tin chính sách dành cho khán giả dưới 22 tuổi tại rạp Metiz Helio Center Đà Nẵng.",
    "curation_story": "Thông tin chính sách dành cho khán giả dưới 22 tuổi tại rạp Metiz Helio Center Đà Nẵng.",
    "scope_text": "Tầng 1 Helio Center, Đường 2 Tháng 9, Hải Châu, Đà Nẵng",
    "official_source_url": "https://metiz.vn/tin-tuc/khuyen-mai/gia-ve-u22-metiz/",
    "gateway_group": "DI_DAU",
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "SLOT_AFTERNOON",
    "transit_hint": "🚌 Gần tuyến xe buýt DanaBus R16 & Trạm xe đạp TNGO Bạch Đằng",
    "map_query_url": "https://www.google.com/maps/search/?api=1&query=Metiz%20Cinema%3A%20Ch%C3%ADnh%20S%C3%A1ch%20Kh%C3%A1n%20Gi%E1%BA%A3%20Tr%E1%BA%BB%20U22%20%C4%90%C3%A0%20N%E1%BA%B5ng",
    "leisure_category": "CINEMA",
    "meal_moments": null,
    "subject_id": "DEAL_METIZ_U22",
    "content_type": "EDUCATION_POLICY",
    "tier_level": "TIER_2_PROGRAMME",
    "tier_badge": "🏛️ CỔNG CHÍNH THỨC",
    "tier_badge_class": "tier-badge-programme",
    "specific_action_label": "🏛️ Mở cổng chính thức →",
    "evidence_status": "Nguồn chính thức: metiz.vn",
    "visual_asset_url": null,
    "asset_subject_id": null,
    "visual_attribution": null
  },
  {
    "item_id": "PROG_GITHUB_STUDENT",
    "brand": "GitHub Education",
    "title": "GitHub Student Developer Pack (Bộ Công Cụ Lập Trình)",
    "summary_text": "Gói công cụ lập trình, GitHub Copilot và tài nguyên kỹ thuật dành cho học sinh, sinh viên tại Đà Nẵng.",
    "curation_story": "Gói công cụ lập trình, GitHub Copilot và tài nguyên kỹ thuật dành cho học sinh, sinh viên tại Đà Nẵng.",
    "scope_text": "HSSV tại các trường ĐH, CĐ, THPT TP. Đà Nẵng",
    "official_source_url": "https://education.github.com/pack",
    "gateway_group": "MUA_SAM",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "ALL_DAY",
    "transit_hint": "📍 Kết nối giao thông nội thành thuận tiện",
    "map_query_url": null,
    "leisure_category": null,
    "meal_moments": null,
    "subject_id": "PROG_GITHUB_STUDENT",
    "content_type": "EDUCATION_POLICY",
    "tier_level": "TIER_2_PROGRAMME",
    "tier_badge": "🏛️ CỔNG CHÍNH THỨC",
    "tier_badge_class": "tier-badge-programme",
    "specific_action_label": "🏛️ Mở cổng chính thức →",
    "evidence_status": "Nguồn chính thức: education.github.com",
    "visual_asset_url": null,
    "asset_subject_id": null,
    "visual_attribution": null
  },
  {
    "item_id": "PROG_NOTION_EDU",
    "brand": "Notion",
    "title": "Notion Plus: Chương Trình Hỗ Trợ Học Đường",
    "summary_text": "Chính sách sử dụng Notion Plus phục vụ ghi chú và quản lý học tập dành cho học sinh, sinh viên.",
    "curation_story": "Chính sách sử dụng Notion Plus phục vụ ghi chú và quản lý học tập dành cho học sinh, sinh viên.",
    "scope_text": "Sinh viên & Giảng viên các trường tại Đà Nẵng",
    "official_source_url": "https://www.notion.so/product/notion-for-education",
    "gateway_group": "MUA_SAM",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "ALL_DAY",
    "transit_hint": "📍 Kết nối giao thông nội thành thuận tiện",
    "map_query_url": null,
    "leisure_category": null,
    "meal_moments": null,
    "subject_id": "PROG_NOTION_EDU",
    "content_type": "EDUCATION_POLICY",
    "tier_level": "TIER_2_PROGRAMME",
    "tier_badge": "🏛️ CỔNG CHÍNH THỨC",
    "tier_badge_class": "tier-badge-programme",
    "specific_action_label": "🏛️ Mở cổng chính thức →",
    "evidence_status": "Nguồn chính thức: www.notion.so",
    "visual_asset_url": null,
    "asset_subject_id": null,
    "visual_attribution": null
  },
  {
    "item_id": "PROG_CANVA_EDU",
    "brand": "Canva",
    "title": "Canva for Education: Nền Tảng Thiết Kế Học Đường",
    "summary_text": "Nền tảng thiết kế đồ họa, bài giảng và thuyết trình dành cho học sinh, sinh viên và giáo viên.",
    "curation_story": "Nền tảng thiết kế đồ họa, bài giảng và thuyết trình dành cho học sinh, sinh viên và giáo viên.",
    "scope_text": "Giáo viên và học sinh sinh viên tại Đà Nẵng",
    "official_source_url": "https://www.canva.com/education/",
    "gateway_group": "MUA_SAM",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "ALL_DAY",
    "transit_hint": "📍 Kết nối giao thông nội thành thuận tiện",
    "map_query_url": null,
    "leisure_category": null,
    "meal_moments": null,
    "subject_id": "PROG_CANVA_EDU",
    "content_type": "EDUCATION_POLICY",
    "tier_level": "TIER_2_PROGRAMME",
    "tier_badge": "🏛️ CỔNG CHÍNH THỨC",
    "tier_badge_class": "tier-badge-programme",
    "specific_action_label": "🏛️ Mở cổng chính thức →",
    "evidence_status": "Nguồn chính thức: www.canva.com",
    "visual_asset_url": null,
    "asset_subject_id": null,
    "visual_attribution": null
  },
  {
    "item_id": "PROG_JETBRAINS_STUDENT",
    "brand": "JetBrains",
    "title": "JetBrains Educational Pack: Bộ IDE Lập Trình",
    "summary_text": "Cấp bản quyền IntelliJ IDEA Ultimate, PyCharm Professional, WebStorm cho sinh viên công nghệ thông tin.",
    "curation_story": "Cấp bản quyền IntelliJ IDEA Ultimate, PyCharm Professional, WebStorm cho sinh viên công nghệ thông tin.",
    "scope_text": "Sinh viên CNTT các trường ĐH Bách Khoa, Sư Phạm KT, Duy Tân, FPT Đà Nẵng",
    "official_source_url": "https://www.jetbrains.com/community/education/",
    "gateway_group": "MUA_SAM",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "ALL_DAY",
    "transit_hint": "📍 Kết nối giao thông nội thành thuận tiện",
    "map_query_url": null,
    "leisure_category": null,
    "meal_moments": null,
    "subject_id": "PROG_JETBRAINS_STUDENT",
    "content_type": "EDUCATION_POLICY",
    "tier_level": "TIER_2_PROGRAMME",
    "tier_badge": "🏛️ CỔNG CHÍNH THỨC",
    "tier_badge_class": "tier-badge-programme",
    "specific_action_label": "🏛️ Mở cổng chính thức →",
    "evidence_status": "Nguồn chính thức: www.jetbrains.com",
    "visual_asset_url": null,
    "asset_subject_id": null,
    "visual_attribution": null
  },
  {
    "item_id": "PROG_SPOTIFY_STUDENT",
    "brand": "Spotify",
    "title": "Spotify: Chương Trình Dành Cho Sinh Viên",
    "summary_text": "Thông tin chính sách đăng ký gói âm nhạc bản quyền dành cho học sinh, sinh viên trên website chính thức.",
    "curation_story": "Thông tin chính sách đăng ký gói âm nhạc bản quyền dành cho học sinh, sinh viên trên website chính thức.",
    "scope_text": "Sinh viên các trường đại học tại Đà Nẵng",
    "official_source_url": "https://www.spotify.com/vn-vi/student/",
    "gateway_group": "DI_DAU",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "ALL_DAY",
    "transit_hint": "📍 Kết nối giao thông nội thành thuận tiện",
    "map_query_url": "https://www.google.com/maps/search/?api=1&query=Spotify%3A%20Ch%C6%B0%C6%A1ng%20Tr%C3%ACnh%20D%C3%A0nh%20Cho%20Sinh%20Vi%C3%AAn%20%C4%90%C3%A0%20N%E1%BA%B5ng",
    "leisure_category": "CITY_EXPLORE",
    "meal_moments": null,
    "subject_id": "PROG_SPOTIFY_STUDENT",
    "content_type": "EDUCATION_POLICY",
    "tier_level": "TIER_2_PROGRAMME",
    "tier_badge": "🏛️ CỔNG CHÍNH THỨC",
    "tier_badge_class": "tier-badge-programme",
    "specific_action_label": "🏛️ Mở cổng chính thức →",
    "evidence_status": "Nguồn chính thức: www.spotify.com",
    "visual_asset_url": null,
    "asset_subject_id": null,
    "visual_attribution": null
  },
  {
    "item_id": "PROG_APPLE_MUSIC_STUDENT",
    "brand": "Apple",
    "title": "Apple Music: Chương Trình Dành Cho Sinh Viên",
    "summary_text": "Thông tin dịch vụ nghe nhạc trực tuyến chất lượng cao với chính sách hỗ trợ học đường từ Apple.",
    "curation_story": "Thông tin dịch vụ nghe nhạc trực tuyến chất lượng cao với chính sách hỗ trợ học đường từ Apple.",
    "scope_text": "Sinh viên các trường ĐH tại Đà Nẵng",
    "official_source_url": "https://www.apple.com/vn/apple-music/",
    "gateway_group": "DI_DAU",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "ALL_DAY",
    "transit_hint": "📍 Kết nối giao thông nội thành thuận tiện",
    "map_query_url": "https://www.google.com/maps/search/?api=1&query=Apple%20Music%3A%20Ch%C6%B0%C6%A1ng%20Tr%C3%ACnh%20D%C3%A0nh%20Cho%20Sinh%20Vi%C3%AAn%20%C4%90%C3%A0%20N%E1%BA%B5ng",
    "leisure_category": "CITY_EXPLORE",
    "meal_moments": null,
    "subject_id": "PROG_APPLE_MUSIC_STUDENT",
    "content_type": "EDUCATION_POLICY",
    "tier_level": "TIER_2_PROGRAMME",
    "tier_badge": "🏛️ CỔNG CHÍNH THỨC",
    "tier_badge_class": "tier-badge-programme",
    "specific_action_label": "🏛️ Mở cổng chính thức →",
    "evidence_status": "Nguồn chính thức: www.apple.com",
    "visual_asset_url": null,
    "asset_subject_id": null,
    "visual_attribution": null
  },
  {
    "item_id": "PROG_STARLIGHT_COMBO_10K",
    "brand": "Starlight Cinema",
    "title": "Starlight Cinema: Chương Trình Thành Viên Rạp Phim",
    "summary_text": "Thông tin quyền lợi thẻ thành viên và lịch chiếu tại cụm rạp Starlight Đà Nẵng.",
    "curation_story": "Thông tin quyền lợi thẻ thành viên và lịch chiếu tại cụm rạp Starlight Đà Nẵng.",
    "scope_text": "Tầng 4 Tòa nhà Nguyễn Kim, Thanh Khê, Đà Nẵng",
    "official_source_url": "https://starlight.vn/khuyen-mai/combo-bap-nuoc-10k.html",
    "gateway_group": "DI_DAU",
    "locality_tag": "THANH_KHE",
    "time_slot_tag": "SLOT_EVENING",
    "transit_hint": "🚌 Gần tuyến xe buýt DanaBus R6A & Trạm TNGO Điện Biên Phủ",
    "map_query_url": "https://www.google.com/maps/search/?api=1&query=Starlight%20Cinema%3A%20Ch%C6%B0%C6%A1ng%20Tr%C3%ACnh%20Th%C3%A0nh%20Vi%C3%AAn%20R%E1%BA%A1p%20Phim%20%C4%90%C3%A0%20N%E1%BA%B5ng",
    "leisure_category": "CITY_EXPLORE",
    "meal_moments": null,
    "subject_id": "PROG_STARLIGHT_COMBO_10K",
    "content_type": "EDUCATION_POLICY",
    "tier_level": "TIER_2_PROGRAMME",
    "tier_badge": "🏛️ CỔNG CHÍNH THỨC",
    "tier_badge_class": "tier-badge-programme",
    "specific_action_label": "🏛️ Mở cổng chính thức →",
    "evidence_status": "Nguồn chính thức: starlight.vn",
    "visual_asset_url": null,
    "asset_subject_id": null,
    "visual_attribution": null
  },
  {
    "item_id": "PROG_GALAXY_CINEMA_HAPPY_DAY",
    "brand": "Galaxy Cinema",
    "title": "Galaxy Cinema Đà Nẵng: Chương Trình Ngày Thành Viên",
    "summary_text": "Thông tin lịch chiếu và chính sách dành cho khán giả tại Galaxy Cinema Đà Nẵng.",
    "curation_story": "Thông tin lịch chiếu và chính sách dành cho khán giả tại Galaxy Cinema Đà Nẵng.",
    "scope_text": "Coop Mart Điện Biên Phủ, Thanh Khê, Đà Nẵng",
    "official_source_url": "https://www.galaxycine.vn/khuyen-mai/happy-day/",
    "gateway_group": "DI_DAU",
    "locality_tag": "THANH_KHE",
    "time_slot_tag": "SLOT_EVENING",
    "transit_hint": "🚌 Gần tuyến xe buýt DanaBus R6A & Trạm TNGO Điện Biên Phủ",
    "map_query_url": "https://www.google.com/maps/search/?api=1&query=Galaxy%20Cinema%20%C4%90%C3%A0%20N%E1%BA%B5ng%3A%20Ch%C6%B0%C6%A1ng%20Tr%C3%ACnh%20Ng%C3%A0y%20Th%C3%A0nh%20Vi%C3%AAn%20%C4%90%C3%A0%20N%E1%BA%B5ng",
    "leisure_category": "CITY_EXPLORE",
    "meal_moments": null,
    "subject_id": "PROG_GALAXY_CINEMA_HAPPY_DAY",
    "content_type": "EDUCATION_POLICY",
    "tier_level": "TIER_2_PROGRAMME",
    "tier_badge": "🏛️ CỔNG CHÍNH THỨC",
    "tier_badge_class": "tier-badge-programme",
    "specific_action_label": "🏛️ Mở cổng chính thức →",
    "evidence_status": "Nguồn chính thức: www.galaxycine.vn",
    "visual_asset_url": null,
    "asset_subject_id": null,
    "visual_attribution": null
  },
  {
    "item_id": "PROG_COOPMART_STUDENT_CARD",
    "brand": "Co.opmart",
    "title": "Co.opmart Đà Nẵng: Kênh Thẻ Thành Viên",
    "summary_text": "Thông tin chính sách tích lũy điểm thưởng và quyền lợi thành viên Co.opmart Đà Nẵng.",
    "curation_story": "Thông tin chính sách tích lũy điểm thưởng và quyền lợi thành viên Co.opmart Đà Nẵng.",
    "scope_text": "Co.opmart Bình Thuận & Co.opmart Sơn Trà",
    "official_source_url": "https://coopmart.vn",
    "gateway_group": "MUA_SAM",
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "ALL_DAY",
    "transit_hint": "🚌 Gần tuyến xe buýt DanaBus R16 & Trạm xe đạp TNGO Bạch Đằng",
    "map_query_url": null,
    "leisure_category": null,
    "meal_moments": null,
    "subject_id": "PROG_COOPMART_STUDENT_CARD",
    "content_type": "EDUCATION_POLICY",
    "tier_level": "TIER_2_PROGRAMME",
    "tier_badge": "🏛️ CỔNG CHÍNH THỨC",
    "tier_badge_class": "tier-badge-programme",
    "specific_action_label": "🏛️ Mở cổng chính thức →",
    "evidence_status": "Nguồn chính thức: coopmart.vn",
    "visual_asset_url": null,
    "asset_subject_id": null,
    "visual_attribution": null
  },
  {
    "item_id": "PROG_SHOPEE_STUDENT_CLUB",
    "brand": "Shopee Vietnam",
    "title": "Shopee Student Club: Kênh Hỗ Trợ Sinh Viên",
    "summary_text": "Thông tin chương trình đồng hành cùng học sinh sinh viên mua sắm đồ dùng học tập trên Shopee.",
    "curation_story": "Thông tin chương trình đồng hành cùng học sinh sinh viên mua sắm đồ dùng học tập trên Shopee.",
    "scope_text": "Học sinh sinh viên tại TP. Đà Nẵng",
    "official_source_url": "https://shopee.vn/m/shopee-student-club",
    "gateway_group": "MUA_SAM",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "ALL_DAY",
    "transit_hint": "📍 Kết nối giao thông nội thành thuận tiện",
    "map_query_url": null,
    "leisure_category": null,
    "meal_moments": null,
    "subject_id": "PROG_SHOPEE_STUDENT_CLUB",
    "content_type": "EDUCATION_POLICY",
    "tier_level": "TIER_2_PROGRAMME",
    "tier_badge": "🏛️ CỔNG CHÍNH THỨC",
    "tier_badge_class": "tier-badge-programme",
    "specific_action_label": "🏛️ Mở cổng chính thức →",
    "evidence_status": "Nguồn chính thức: shopee.vn",
    "visual_asset_url": null,
    "asset_subject_id": null,
    "visual_attribution": null
  },
  {
    "item_id": "PROG_GRAB_STUDENT_UNLIMITED",
    "brand": "Grab Vietnam",
    "title": "Grab: Kênh Hội Viên GrabUnlimited Học Đường",
    "summary_text": "Thông tin chính sách di chuyển và giao nhận dành cho học sinh sinh viên trên ứng dụng Grab.",
    "curation_story": "Thông tin chính sách di chuyển và giao nhận dành cho học sinh sinh viên trên ứng dụng Grab.",
    "scope_text": "Toàn TP. Đà Nẵng",
    "official_source_url": "https://www.grab.com/vn/",
    "gateway_group": "DI_DAU",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "ALL_DAY",
    "transit_hint": "📍 Kết nối giao thông nội thành thuận tiện",
    "map_query_url": "https://www.google.com/maps/search/?api=1&query=Grab%3A%20K%C3%AAnh%20H%E1%BB%99i%20Vi%C3%AAn%20GrabUnlimited%20H%E1%BB%8Dc%20%C4%90%C6%B0%E1%BB%9Dng%20%C4%90%C3%A0%20N%E1%BA%B5ng",
    "leisure_category": "CITY_EXPLORE",
    "meal_moments": null,
    "subject_id": "PROG_GRAB_STUDENT_UNLIMITED",
    "content_type": "EDUCATION_POLICY",
    "tier_level": "TIER_2_PROGRAMME",
    "tier_badge": "🏛️ CỔNG CHÍNH THỨC",
    "tier_badge_class": "tier-badge-programme",
    "specific_action_label": "🏛️ Mở cổng chính thức →",
    "evidence_status": "Nguồn chính thức: www.grab.com",
    "visual_asset_url": null,
    "asset_subject_id": null,
    "visual_attribution": null
  },
  {
    "item_id": "PROG_BE_STUDENT_PACK",
    "brand": "Be Group",
    "title": "Be: Kênh Di Chuyển Đến Trường Cho Sinh Viên",
    "summary_text": "Thông tin các tuyến kết nối xe công nghệ từ ký túc xá đến các cổng trường đại học tại Đà Nẵng.",
    "curation_story": "Thông tin các tuyến kết nối xe công nghệ từ ký túc xá đến các cổng trường đại học tại Đà Nẵng.",
    "scope_text": "Toàn TP. Đà Nẵng",
    "official_source_url": "https://be.com.vn",
    "gateway_group": "DI_DAU",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "SLOT_MORNING",
    "transit_hint": "📍 Kết nối giao thông nội thành thuận tiện",
    "map_query_url": "https://www.google.com/maps/search/?api=1&query=Be%3A%20K%C3%AAnh%20Di%20Chuy%E1%BB%83n%20%C4%90%E1%BA%BFn%20Tr%C6%B0%E1%BB%9Dng%20Cho%20Sinh%20Vi%C3%AAn%20%C4%90%C3%A0%20N%E1%BA%B5ng",
    "leisure_category": "CITY_EXPLORE",
    "meal_moments": null,
    "subject_id": "PROG_BE_STUDENT_PACK",
    "content_type": "EDUCATION_POLICY",
    "tier_level": "TIER_2_PROGRAMME",
    "tier_badge": "🏛️ CỔNG CHÍNH THỨC",
    "tier_badge_class": "tier-badge-programme",
    "specific_action_label": "🏛️ Mở cổng chính thức →",
    "evidence_status": "Nguồn chính thức: be.com.vn",
    "visual_asset_url": null,
    "asset_subject_id": null,
    "visual_attribution": null
  },
  {
    "item_id": "PROG_FPT_PLAY_STUDENT",
    "brand": "FPT Play",
    "title": "FPT Play: Gói Giải Trí & Ngoại Hạng Anh Dành Cho Sinh Viên",
    "summary_text": "Xem phim điện ảnh, truyền hình bản quyền và các trận cầu thể thao trực tiếp.",
    "curation_story": "Xem phim điện ảnh, truyền hình bản quyền và các trận cầu thể thao trực tiếp.",
    "scope_text": "Toàn quốc & TP. Đà Nẵng",
    "official_source_url": "https://fptplay.vn",
    "gateway_group": "DI_DAU",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "ALL_DAY",
    "transit_hint": "📍 Kết nối giao thông nội thành thuận tiện",
    "map_query_url": "https://www.google.com/maps/search/?api=1&query=FPT%20Play%3A%20G%C3%B3i%20Gi%E1%BA%A3i%20Tr%C3%AD%20%26%20Ngo%E1%BA%A1i%20H%E1%BA%A1ng%20Anh%20D%C3%A0nh%20Cho%20Sinh%20Vi%C3%AAn%20%C4%90%C3%A0%20N%E1%BA%B5ng",
    "leisure_category": "CITY_EXPLORE",
    "meal_moments": null,
    "subject_id": "PROG_FPT_PLAY_STUDENT",
    "content_type": "EDUCATION_POLICY",
    "tier_level": "TIER_2_PROGRAMME",
    "tier_badge": "🏛️ CỔNG CHÍNH THỨC",
    "tier_badge_class": "tier-badge-programme",
    "specific_action_label": "🏛️ Mở cổng chính thức →",
    "evidence_status": "Nguồn chính thức: fptplay.vn",
    "visual_asset_url": null,
    "asset_subject_id": null,
    "visual_attribution": null
  },
  {
    "item_id": "PROG_CGV_CULTURE_DAY",
    "brand": "CGV Cinemas",
    "title": "CGV Cinemas: Ngày Hội Điện Ảnh Định Kỳ",
    "summary_text": "Chương trình xem phim định kỳ dành cho người yêu điện ảnh tại các cụm rạp CGV Đà Nẵng.",
    "curation_story": "Chương trình xem phim định kỳ dành cho người yêu điện ảnh tại các cụm rạp CGV Đà Nẵng.",
    "scope_text": "CGV Vĩnh Trung Plaza & CGV Vincom Đà Nẵng",
    "official_source_url": "https://www.cgv.vn/default/culture-day",
    "gateway_group": "DI_DAU",
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "SLOT_EVENING",
    "transit_hint": "🚌 Gần tuyến xe buýt DanaBus R16 & Trạm xe đạp TNGO Bạch Đằng",
    "map_query_url": "https://www.google.com/maps/search/?api=1&query=CGV%20Cinemas%3A%20Ng%C3%A0y%20H%E1%BB%99i%20%C4%90i%E1%BB%87n%20%E1%BA%A2nh%20%C4%90%E1%BB%8Bnh%20K%E1%BB%B3%20%C4%90%C3%A0%20N%E1%BA%B5ng",
    "leisure_category": "CINEMA",
    "meal_moments": null,
    "subject_id": "PROG_CGV_CULTURE_DAY",
    "content_type": "EDUCATION_POLICY",
    "tier_level": "TIER_2_PROGRAMME",
    "tier_badge": "🏛️ CỔNG CHÍNH THỨC",
    "tier_badge_class": "tier-badge-programme",
    "specific_action_label": "🏛️ Mở cổng chính thức →",
    "evidence_status": "Nguồn chính thức: www.cgv.vn",
    "visual_asset_url": null,
    "asset_subject_id": null,
    "visual_attribution": null
  },
  {
    "item_id": "FACILITY_DANABUS",
    "brand": "DanaBus — Xe Buýt Đà Nẵng",
    "title": "DanaBus: Mạng Lưới Xe Buýt Trợ Giá Đà Nẵng",
    "summary_text": "Mạng lưới xe buýt nội thành hiện đại kết nối các trường đại học, khu ký túc xá và trung tâm hành chính.",
    "curation_story": "Mạng lưới xe buýt xanh DanaBus kết nối từ Sân bay, Cầu Rồng đến Bến xe Trung tâm và Bãi biển Mỹ Khê với giá vé sinh viên ưu đãi.",
    "scope_text": "Toàn bộ mạng lưới nội thành TP. Đà Nẵng",
    "official_source_url": "https://danangbus.vn",
    "gateway_group": "DI_DAU",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "SLOT_MORNING",
    "transit_hint": "📍 Kết nối giao thông nội thành thuận tiện",
    "map_query_url": "https://www.google.com/maps/search/?api=1&query=DanaBus%3A%20M%E1%BA%A1ng%20L%C6%B0%E1%BB%9Bi%20Xe%20Bu%C3%BDt%20Tr%E1%BB%A3%20Gi%C3%A1%20%C4%90%C3%A0%20N%E1%BA%B5ng%20%C4%90%C3%A0%20N%E1%BA%B5ng",
    "leisure_category": "CITY_EXPLORE",
    "meal_moments": null,
    "subject_id": "FACILITY_DANABUS",
    "content_type": "PUBLIC_TRANSIT",
    "tier_level": "TIER_2_PROGRAMME",
    "tier_badge": "🏛️ CỔNG CHÍNH THỨC",
    "tier_badge_class": "tier-badge-programme",
    "specific_action_label": "🏛️ Mở cổng danangbus.vn →",
    "evidence_status": "Chương trình công cộng: danangbus.vn",
    "visual_asset_url": "assets/images/danang_real_photo_han_river_bridge.jpg",
    "asset_subject_id": "HAN_RIVER_BRIDGE_TRANSIT_CONTEXT",
    "visual_attribution": "🌉 Cầu Sông Hàn (1200x800px) &bull; 📷 Christophe95 (CC BY-SA 4.0)"
  },
  {
    "item_id": "FACILITY_TNGO_BIKE",
    "brand": "TNGO Xe Đạp Đô Thị",
    "title": "TNGO: Hệ Thống Xe Đạp Công Cộng TP. Đà Nẵng",
    "summary_text": "Mạng lưới hơn 60 trạm xe đạp thông minh khắp các trục đường ven sông Hàn, bờ biển Mỹ Khê và khu đại học.",
    "curation_story": "Mạng lưới hơn 60 trạm xe đạp thông minh khắp các trục đường ven sông Hàn, bờ biển Mỹ Khê và khu đại học.",
    "scope_text": "Hơn 60 trạm tại Hải Châu, Sơn Trà, Ngũ Hành Sơn",
    "official_source_url": "https://tngo.vn",
    "gateway_group": "DI_DAU",
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "SLOT_AFTERNOON",
    "transit_hint": "🚌 Gần tuyến xe buýt DanaBus R16 & Trạm xe đạp TNGO Bạch Đằng",
    "map_query_url": "https://www.google.com/maps/search/?api=1&query=TNGO%3A%20H%E1%BB%87%20Th%E1%BB%91ng%20Xe%20%C4%90%E1%BA%A1p%20C%C3%B4ng%20C%E1%BB%99ng%20TP.%20%C4%90%C3%A0%20N%E1%BA%B5ng%20%C4%90%C3%A0%20N%E1%BA%B5ng",
    "leisure_category": "CITY_EXPLORE",
    "meal_moments": null,
    "subject_id": "FACILITY_TNGO_BIKE",
    "content_type": "PUBLIC_TRANSIT",
    "tier_level": "TIER_2_PROGRAMME",
    "tier_badge": "🏛️ CỔNG CHÍNH THỨC",
    "tier_badge_class": "tier-badge-programme",
    "specific_action_label": "🏛️ Mở cổng tngo.vn →",
    "evidence_status": "Chương trình công cộng: tngo.vn",
    "visual_asset_url": null,
    "asset_subject_id": null,
    "visual_attribution": null
  },
  {
    "item_id": "FACILITY_THU_VIEN_TONG_HOP",
    "brand": "Thư Viện TP. Đà Nẵng",
    "title": "Thư Viện Khoa Học Tổng Hợp Đà Nẵng",
    "summary_text": "Không gian tự học yên tĩnh nhìn thẳng ra sông Hàn, trang bị máy lạnh, wifi tốc độ cao và hàng ngàn đầu sách.",
    "curation_story": "Không gian đọc sách và làm việc yên tĩnh ngay trung tâm quận Hải Châu, phục vụ miễn phí cho học sinh, sinh viên và người dân.",
    "scope_text": "46 Bạch Đằng, Q. Hải Châu, TP. Đà Nẵng",
    "official_source_url": "http://thuvien.danang.gov.vn",
    "gateway_group": "MUA_SAM",
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "SLOT_AFTERNOON",
    "transit_hint": "🚌 Gần tuyến xe buýt DanaBus R16 & Trạm xe đạp TNGO Bạch Đằng",
    "map_query_url": null,
    "leisure_category": null,
    "meal_moments": null,
    "subject_id": "FACILITY_THU_VIEN_TONG_HOP",
    "content_type": "CIVIC_UTILITY",
    "tier_level": "TIER_3_UTILITY",
    "tier_badge": "📍 TIỆN ÍCH CÔNG CỘNG",
    "tier_badge_class": "tier-badge-utility",
    "specific_action_label": "📍 Xem thông tin & Maps →",
    "evidence_status": "Tiện ích công cộng: TP. Đà Nẵng",
    "visual_asset_url": "assets/images/danang_real_photo_bach_dang.jpg",
    "asset_subject_id": "FACILITY_THU_VIEN_TONG_HOP",
    "visual_attribution": "📚 Thư Viện & Bạch Đằng Ven Sông (1280x853px) &bull; 📷 Joseph Hunkins (CC BY 2.0)"
  },
  {
    "item_id": "FACILITY_DVC_DANANG",
    "brand": "Trung Tâm Dịch Vụ Công 1022",
    "title": "Tổng Đài 1022 & Cổng Dịch Vụ Công Đà Nẵng",
    "summary_text": "Kênh tra cứu thông tin hành chính, phản ánh giao thông, xe buýt, học tập và an sinh xã hội chính thức của thành phố.",
    "curation_story": "Kênh tra cứu thông tin hành chính, phản ánh giao thông, xe buýt, học tập và an sinh xã hội chính thức của thành phố.",
    "scope_text": "Toàn bộ địa bàn TP. Đà Nẵng",
    "official_source_url": "https://1022.danang.gov.vn",
    "gateway_group": "MUA_SAM",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "ALL_DAY",
    "transit_hint": "📍 Kết nối giao thông nội thành thuận tiện",
    "map_query_url": null,
    "leisure_category": null,
    "meal_moments": null,
    "subject_id": "FACILITY_DVC_DANANG",
    "content_type": "CIVIC_UTILITY",
    "tier_level": "TIER_3_UTILITY",
    "tier_badge": "📍 TIỆN ÍCH CÔNG CỘNG",
    "tier_badge_class": "tier-badge-utility",
    "specific_action_label": "📍 Xem thông tin & Maps →",
    "evidence_status": "Tiện ích công cộng: TP. Đà Nẵng",
    "visual_asset_url": null,
    "asset_subject_id": null,
    "visual_attribution": null
  },
  {
    "item_id": "PLACE_CAU_RONG_FIRE_WATER",
    "brand": "TP. Đà Nẵng",
    "title": "Cầu Rồng Phun Lửa & Phun Nước (21:00 Cuối Tuần)",
    "summary_text": "Biểu tượng kiến trúc của Đà Nẵng, trình diễn phun lửa và phun nước bên bờ sông Hàn vào mỗi tối Thứ 7 và Chủ Nhật.",
    "curation_story": "Biểu tượng kiến trúc của Đà Nẵng, trình diễn phun lửa và phun nước bên bờ sông Hàn vào mỗi tối Thứ 7 và Chủ Nhật.",
    "scope_text": "Cầu Rồng bắc qua Sông Hàn, Hải Châu / Sơn Trà",
    "official_source_url": "https://danang.gov.vn",
    "gateway_group": "DI_DAU",
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "SLOT_EVENING",
    "transit_hint": "🚌 Gần tuyến xe buýt DanaBus R16 & Trạm xe đạp TNGO Bạch Đằng",
    "map_query_url": "https://www.google.com/maps/search/?api=1&query=C%E1%BA%A7u%20R%E1%BB%93ng%20Phun%20L%E1%BB%ADa%20%26%20Phun%20N%C6%B0%E1%BB%9Bc%20(21%3A00%20Cu%E1%BB%91i%20Tu%E1%BA%A7n)%20%C4%90%C3%A0%20N%E1%BA%B5ng",
    "leisure_category": "CITY_EXPLORE",
    "meal_moments": null,
    "subject_id": "PLACE_CAU_RONG_FIRE_WATER",
    "content_type": "CIVIC_UTILITY",
    "tier_level": "TIER_3_UTILITY",
    "tier_badge": "📍 TIỆN ÍCH CÔNG CỘNG",
    "tier_badge_class": "tier-badge-utility",
    "specific_action_label": "📍 Xem thông tin & Maps →",
    "evidence_status": "Tiện ích công cộng: TP. Đà Nẵng",
    "visual_asset_url": null,
    "asset_subject_id": null,
    "visual_attribution": null
  },
  {
    "item_id": "PLACE_CONG_VIEN_APEC",
    "brand": "Công Viên APEC Đà Nẵng",
    "title": "Công Viên APEC & Vòm Cánh Diều Ven Sông Hàn",
    "summary_text": "Quảng trường rộng lớn với kiến trúc mái vòm cánh diều bay cao, địa điểm giao lưu và ngắm cảnh sông Hàn lý tưởng.",
    "curation_story": "Quảng trường rộng lớn với kiến trúc mái vòm cánh diều bay cao, địa điểm giao lưu và ngắm cảnh sông Hàn lý tưởng.",
    "scope_text": "Đường 2 Tháng 9, P. Bình Hiên, Hải Châu, Đà Nẵng",
    "official_source_url": "https://danang.gov.vn",
    "gateway_group": "DI_DAU",
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "SLOT_AFTERNOON",
    "transit_hint": "🚌 Gần tuyến xe buýt DanaBus R16 & Trạm xe đạp TNGO Bạch Đằng",
    "map_query_url": "https://www.google.com/maps/search/?api=1&query=C%C3%B4ng%20Vi%C3%AAn%20APEC%20%26%20V%C3%B2m%20C%C3%A1nh%20Di%E1%BB%81u%20Ven%20S%C3%B4ng%20H%C3%A0n%20%C4%90%C3%A0%20N%E1%BA%B5ng",
    "leisure_category": "CITY_EXPLORE",
    "meal_moments": null,
    "subject_id": "PLACE_CONG_VIEN_APEC",
    "content_type": "CIVIC_UTILITY",
    "tier_level": "TIER_3_UTILITY",
    "tier_badge": "📍 TIỆN ÍCH CÔNG CỘNG",
    "tier_badge_class": "tier-badge-utility",
    "specific_action_label": "📍 Xem thông tin & Maps →",
    "evidence_status": "Tiện ích công cộng: TP. Đà Nẵng",
    "visual_asset_url": null,
    "asset_subject_id": null,
    "visual_attribution": null
  },
  {
    "item_id": "PLACE_PHO_DI_BO_BACH_DANG",
    "brand": "Phố Đi Bộ Đà Nẵng",
    "title": "Phố Đi Bộ Bạch Đằng (Bờ Tây Sông Hàn)",
    "summary_text": "Tuyến đường đi bộ ven sông thơ mộng với nhiều hoạt động âm nhạc đường phố, ẩm thực và làn gió mát sông Hàn.",
    "curation_story": "Tuyến đường đi bộ ven sông thơ mộng với nhiều hoạt động âm nhạc đường phố, ẩm thực và làn gió mát sông Hàn.",
    "scope_text": "Đường Bạch Đằng từ Cầu Rồng đến Cầu Trần Thị Lý",
    "official_source_url": "https://danang.gov.vn",
    "gateway_group": "DI_DAU",
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "SLOT_EVENING",
    "transit_hint": "🚌 Gần tuyến xe buýt DanaBus R16 & Trạm xe đạp TNGO Bạch Đằng",
    "map_query_url": "https://www.google.com/maps/search/?api=1&query=Ph%E1%BB%91%20%C4%90i%20B%E1%BB%99%20B%E1%BA%A1ch%20%C4%90%E1%BA%B1ng%20(B%E1%BB%9D%20T%C3%A2y%20S%C3%B4ng%20H%C3%A0n)%20%C4%90%C3%A0%20N%E1%BA%B5ng",
    "leisure_category": "CITY_EXPLORE",
    "meal_moments": null,
    "subject_id": "PLACE_PHO_DI_BO_BACH_DANG",
    "content_type": "CIVIC_UTILITY",
    "tier_level": "TIER_3_UTILITY",
    "tier_badge": "📍 TIỆN ÍCH CÔNG CỘNG",
    "tier_badge_class": "tier-badge-utility",
    "specific_action_label": "📍 Xem thông tin & Maps →",
    "evidence_status": "Tiện ích công cộng: TP. Đà Nẵng",
    "visual_asset_url": null,
    "asset_subject_id": null,
    "visual_attribution": null
  },
  {
    "item_id": "PLACE_BAO_TANG_CHAM",
    "brand": "Bảo Tàng Điêu Khắc Chăm",
    "title": "Bảo Tàng Điêu Khắc Chăm Đà Nẵng",
    "summary_text": "Nơi lưu giữ bộ sưu tập hiện vật điêu khắc Chăm Pa quy mô nhất thế giới trong không gian kiến trúc Pháp cổ kính.",
    "curation_story": "Tọa lạc ngay ngã tư đường 2 Tháng 9 và chân Cầu Rồng, bảo tàng trưng bày hơn 400 tác phẩm điêu khắc sa thạch nguyên bản từ thế kỷ 7 đến 15.",
    "scope_text": "Số 02 Đường 2 Tháng 9, Hải Châu, Đà Nẵng",
    "official_source_url": "http://chammuseum.danang.vn",
    "gateway_group": "DI_DAU",
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "SLOT_MORNING",
    "transit_hint": "🚌 Gần tuyến xe buýt DanaBus R16 & Trạm xe đạp TNGO Bạch Đằng",
    "map_query_url": "https://www.google.com/maps/search/?api=1&query=B%E1%BA%A3o%20T%C3%A0ng%20%C4%90i%C3%AAu%20Kh%E1%BA%AFc%20Ch%C4%83m%20%C4%90%C3%A0%20N%E1%BA%B5ng%20%C4%90%C3%A0%20N%E1%BA%B5ng",
    "leisure_category": "HERITAGE",
    "meal_moments": null,
    "subject_id": "PLACE_BAO_TANG_CHAM",
    "content_type": "CIVIC_UTILITY",
    "tier_level": "TIER_3_UTILITY",
    "tier_badge": "📍 TIỆN ÍCH CÔNG CỘNG",
    "tier_badge_class": "tier-badge-utility",
    "specific_action_label": "📍 Xem thông tin & Maps →",
    "evidence_status": "Tiện ích công cộng: TP. Đà Nẵng",
    "visual_asset_url": "assets/images/danang_real_photo_cham_museum.jpg",
    "asset_subject_id": "PLACE_BAO_TANG_CHAM",
    "visual_attribution": "🏛️ Bảo Tàng Điêu Khắc Chăm (1280x853px) &bull; 📷 CT Snow (CC BY 2.0)"
  },
  {
    "item_id": "PLACE_BAO_TANG_DA_NANG",
    "brand": "Bảo Tàng Đà Nẵng",
    "title": "Bảo Tàng Đà Nẵng (Di Tích Thành Điện Hải)",
    "summary_text": "Trưng bày tư liệu lịch sử phát triển đô thị Đà Nẵng từ thời tiền sử đến hiện đại.",
    "curation_story": "Trưng bày tư liệu lịch sử phát triển đô thị Đà Nẵng từ thời tiền sử đến hiện đại.",
    "scope_text": "24 Trần Phú, P. Thạch Thang, Hải Châu, Đà Nẵng",
    "official_source_url": "https://baotangdanang.vn",
    "gateway_group": "DI_DAU",
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "SLOT_MORNING",
    "transit_hint": "🚌 Gần tuyến xe buýt DanaBus R16 & Trạm xe đạp TNGO Bạch Đằng",
    "map_query_url": "https://www.google.com/maps/search/?api=1&query=B%E1%BA%A3o%20T%C3%A0ng%20%C4%90%C3%A0%20N%E1%BA%B5ng%20(Di%20T%C3%ADch%20Th%C3%A0nh%20%C4%90i%E1%BB%87n%20H%E1%BA%A3i)%20%C4%90%C3%A0%20N%E1%BA%B5ng",
    "leisure_category": "HERITAGE",
    "meal_moments": null,
    "subject_id": "PLACE_BAO_TANG_DA_NANG",
    "content_type": "CIVIC_UTILITY",
    "tier_level": "TIER_3_UTILITY",
    "tier_badge": "📍 TIỆN ÍCH CÔNG CỘNG",
    "tier_badge_class": "tier-badge-utility",
    "specific_action_label": "📍 Xem thông tin & Maps →",
    "evidence_status": "Tiện ích công cộng: TP. Đà Nẵng",
    "visual_asset_url": null,
    "asset_subject_id": null,
    "visual_attribution": null
  },
  {
    "item_id": "PLACE_BAI_BIEN_MY_KHE",
    "brand": "Bãi Biển Đà Nẵng",
    "title": "Bãi Biển Mỹ Khê & Bờ Đông Đà Nẵng",
    "summary_text": "Bãi biển quyến rũ với bờ cát trắng mịn, nước trong xanh và nhiều tiện ích công cộng phục vụ người dân, du khách.",
    "curation_story": "Bãi biển quyến rũ với bờ cát trắng mịn, nước trong xanh và nhiều tiện ích công cộng phục vụ người dân, du khách.",
    "scope_text": "Đường Võ Nguyên Giáp, Q. Sơn Trà / Ngũ Hành Sơn",
    "official_source_url": "https://danang.gov.vn",
    "gateway_group": "DI_DAU",
    "locality_tag": "SON_TRA",
    "time_slot_tag": "SLOT_MORNING",
    "transit_hint": "🚲 Gần trạm xe đạp TNGO Võ Nguyên Giáp & Cầu Rồng",
    "map_query_url": "https://www.google.com/maps/search/?api=1&query=B%C3%A3i%20Bi%E1%BB%83n%20M%E1%BB%B9%20Kh%C3%AA%20%26%20B%E1%BB%9D%20%C4%90%C3%B4ng%20%C4%90%C3%A0%20N%E1%BA%B5ng%20%C4%90%C3%A0%20N%E1%BA%B5ng",
    "leisure_category": "CITY_EXPLORE",
    "meal_moments": null,
    "subject_id": "PLACE_BAI_BIEN_MY_KHE",
    "content_type": "CIVIC_UTILITY",
    "tier_level": "TIER_3_UTILITY",
    "tier_badge": "📍 TIỆN ÍCH CÔNG CỘNG",
    "tier_badge_class": "tier-badge-utility",
    "specific_action_label": "📍 Xem thông tin & Maps →",
    "evidence_status": "Tiện ích công cộng: TP. Đà Nẵng",
    "visual_asset_url": "assets/images/danang_real_photo_my_khe_beach.jpg",
    "asset_subject_id": "PLACE_BAI_BIEN_MY_KHE",
    "visual_attribution": "🏖️ Biển Mỹ Khê (1280x853px) &bull; 📷 . Ray in Manila (CC BY 2.0)"
  },
  {
    "item_id": "PLACE_BAN_DAO_SON_TRA",
    "brand": "Bán Đảo Sơn Trà",
    "title": "Bán Đảo Sơn Trà & Chùa Linh Ứng",
    "summary_text": "Khu bảo tồn thiên nhiên với tầm nhìn bao quát toàn cảnh vịnh Đà Nẵng và quần thể voọc chà vá chân nâu quý hiếm.",
    "curation_story": "Khu bảo tồn thiên nhiên với tầm nhìn bao quát toàn cảnh vịnh Đà Nẵng và quần thể voọc chà vá chân nâu quý hiếm.",
    "scope_text": "Q. Sơn Trà, TP. Đà Nẵng",
    "official_source_url": "https://danang.gov.vn",
    "gateway_group": "DI_DAU",
    "locality_tag": "SON_TRA",
    "time_slot_tag": "SLOT_MORNING",
    "transit_hint": "🚲 Gần trạm xe đạp TNGO Võ Nguyên Giáp & Cầu Rồng",
    "map_query_url": "https://www.google.com/maps/search/?api=1&query=B%C3%A1n%20%C4%90%E1%BA%A3o%20S%C6%A1n%20Tr%C3%A0%20%26%20Ch%C3%B9a%20Linh%20%E1%BB%A8ng%20%C4%90%C3%A0%20N%E1%BA%B5ng",
    "leisure_category": "CITY_EXPLORE",
    "meal_moments": null,
    "subject_id": "PLACE_BAN_DAO_SON_TRA",
    "content_type": "CIVIC_UTILITY",
    "tier_level": "TIER_3_UTILITY",
    "tier_badge": "📍 TIỆN ÍCH CÔNG CỘNG",
    "tier_badge_class": "tier-badge-utility",
    "specific_action_label": "📍 Xem thông tin & Maps →",
    "evidence_status": "Tiện ích công cộng: TP. Đà Nẵng",
    "visual_asset_url": null,
    "asset_subject_id": null,
    "visual_attribution": null
  },
  {
    "item_id": "PLACE_CHO_HAN_DANANG",
    "brand": "Chợ Hàn Đà Nẵng",
    "title": "Chợ Hàn: Đặc Sản Miền Trung & Nông Sản Tươi Ngon",
    "summary_text": "Ngôi chợ truyền thống lâu đời ngay trung tâm thành phố với hàng trăm gian hàng đặc sản mắm, chả bò và quà lưu niệm.",
    "curation_story": "Ngôi chợ truyền thống lâu đời ngay trung tâm thành phố với hàng trăm gian hàng đặc sản mắm, chả bò và quà lưu niệm.",
    "scope_text": "119 Trần Phú, P. Hải Châu 1, Hải Châu, Đà Nẵng",
    "official_source_url": "https://danang.gov.vn",
    "gateway_group": "MUA_SAM",
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "SLOT_MORNING",
    "transit_hint": "🚌 Gần tuyến xe buýt DanaBus R16 & Trạm xe đạp TNGO Bạch Đằng",
    "map_query_url": null,
    "leisure_category": null,
    "meal_moments": null,
    "subject_id": "PLACE_CHO_HAN_DANANG",
    "content_type": "CIVIC_UTILITY",
    "tier_level": "TIER_3_UTILITY",
    "tier_badge": "📍 TIỆN ÍCH CÔNG CỘNG",
    "tier_badge_class": "tier-badge-utility",
    "specific_action_label": "📍 Xem thông tin & Maps →",
    "evidence_status": "Tiện ích công cộng: TP. Đà Nẵng",
    "visual_asset_url": null,
    "asset_subject_id": null,
    "visual_attribution": null
  },
  {
    "item_id": "PLACE_CHO_CON_AM_THUC",
    "brand": "Chợ Cồn Đà Nẵng",
    "title": "Chợ Cồn: Khu Ẩm Thực Đường Phố Ngon Rẻ Đà Nẵng",
    "summary_text": "Nơi hội tụ đầy đủ các món ngon Đà Nẵng: bánh bèo, nậm, lọc, ốc hút, phá lấu, kem bơ với mức giá cực kỳ phải chăng.",
    "curation_story": "Chợ Cồn quy tụ trọn vẹn ẩm thực đường phố Đà Thành: ốc hút, bánh tráng cuốn thịt heo, chè sầu riêng nức tiếng.",
    "scope_text": "Góc ngã tư Hùng Vương & Ông Ích Khiêm, Hải Châu, Đà Nẵng",
    "official_source_url": "https://danang.gov.vn",
    "gateway_group": "AN_GI",
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "SLOT_AFTERNOON",
    "transit_hint": "🚌 Gần tuyến xe buýt DanaBus R16 & Trạm xe đạp TNGO Bạch Đằng",
    "map_query_url": "https://www.google.com/maps/search/?api=1&query=Ch%E1%BB%A3%20C%E1%BB%93n%3A%20Khu%20%E1%BA%A8m%20Th%E1%BB%B1c%20%C4%90%C6%B0%E1%BB%9Dng%20Ph%E1%BB%91%20Ngon%20R%E1%BA%BB%20%C4%90%C3%A0%20N%E1%BA%B5ng%20%C4%90%C3%A0%20N%E1%BA%B5ng",
    "leisure_category": null,
    "meal_moments": [
      "SANG",
      "TRUA",
      "TOI"
    ],
    "subject_id": "PLACE_CHO_CON_AM_THUC",
    "content_type": "PLACE_CULINARY",
    "tier_level": "TIER_4_RADAR",
    "tier_badge": "📡 KHÁM PHÁ BẢN ĐỊA",
    "tier_badge_class": "tier-badge-radar",
    "specific_action_label": "📍 Xem vị trí & chỉ đường →",
    "evidence_status": "Kênh theo dõi ẩm thực: danang.gov.vn",
    "visual_asset_url": null,
    "asset_subject_id": null,
    "visual_attribution": null
  },
  {
    "item_id": "PLACE_PHO_AM_THUC_HUYNH_THUC_KHANG",
    "brand": "Phố Ẩm Thực Huỳnh Thúc Kháng",
    "title": "Phố Điểm Tâm & Ẩm Thực Huỳnh Thúc Kháng",
    "summary_text": "Tuyến phố chuyên doanh ăn sáng nức tiếng với mì Quảng, bún bò, bánh canh, xôi gà thơm ngon chuẩn vị xứ Quảng.",
    "curation_story": "Phố ẩm thực Huỳnh Thúc Kháng là điểm hẹn ăn sáng quen thuộc của người Đà Nẵng với đầy đủ mì Quảng, bún chả cá, bánh bèo, bánh nậm nóng hổi.",
    "scope_text": "Đường Huỳnh Thúc Kháng, Hải Châu, Đà Nẵng",
    "official_source_url": "https://danang.gov.vn",
    "gateway_group": "AN_GI",
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "SLOT_MORNING",
    "transit_hint": "🚌 Gần tuyến xe buýt DanaBus R16 & Trạm xe đạp TNGO Bạch Đằng",
    "map_query_url": "https://www.google.com/maps/search/?api=1&query=Ph%E1%BB%91%20%C4%90i%E1%BB%83m%20T%C3%A2m%20%26%20%E1%BA%A8m%20Th%E1%BB%B1c%20Hu%E1%BB%B3nh%20Th%C3%BAc%20Kh%C3%A1ng%20%C4%90%C3%A0%20N%E1%BA%B5ng",
    "leisure_category": null,
    "meal_moments": [
      "SANG",
      "TRUA",
      "TOI"
    ],
    "subject_id": "PLACE_PHO_AM_THUC_HUYNH_THUC_KHANG",
    "content_type": "PLACE_CULINARY",
    "tier_level": "TIER_4_RADAR",
    "tier_badge": "📡 KHÁM PHÁ BẢN ĐỊA",
    "tier_badge_class": "tier-badge-radar",
    "specific_action_label": "📍 Xem vị trí & chỉ đường →",
    "evidence_status": "Kênh theo dõi ẩm thực: danang.gov.vn",
    "visual_asset_url": null,
    "asset_subject_id": null,
    "visual_attribution": null
  },
  {
    "item_id": "PLACE_CUNG_THIEU_NHI_DANANG",
    "brand": "Cung Văn Hóa Thiếu Nhi",
    "title": "Cung Thiếu Nhi Đà Nẵng: Không Gian Check-in & Sinh Hoạt",
    "summary_text": "Công trình kiến trúc mô phỏng hình khối Tangram đầy màu sắc, nơi diễn ra các hoạt động văn hóa nghệ thuật của giới trẻ.",
    "curation_story": "Công trình kiến trúc mô phỏng hình khối Tangram đầy màu sắc, nơi diễn ra các hoạt động văn hóa nghệ thuật của giới trẻ.",
    "scope_text": "02 Phan Đăng Lưu, P. Hòa Cường Bắc, Hải Châu, Đà Nẵng",
    "official_source_url": "https://danang.gov.vn",
    "gateway_group": "DI_DAU",
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "SLOT_AFTERNOON",
    "transit_hint": "🚌 Gần tuyến xe buýt DanaBus R16 & Trạm xe đạp TNGO Bạch Đằng",
    "map_query_url": "https://www.google.com/maps/search/?api=1&query=Cung%20Thi%E1%BA%BFu%20Nhi%20%C4%90%C3%A0%20N%E1%BA%B5ng%3A%20Kh%C3%B4ng%20Gian%20Check-in%20%26%20Sinh%20Ho%E1%BA%A1t%20%C4%90%C3%A0%20N%E1%BA%B5ng",
    "leisure_category": "CITY_EXPLORE",
    "meal_moments": null,
    "subject_id": "PLACE_CUNG_THIEU_NHI_DANANG",
    "content_type": "CIVIC_UTILITY",
    "tier_level": "TIER_3_UTILITY",
    "tier_badge": "📍 TIỆN ÍCH CÔNG CỘNG",
    "tier_badge_class": "tier-badge-utility",
    "specific_action_label": "📍 Xem thông tin & Maps →",
    "evidence_status": "Tiện ích công cộng: TP. Đà Nẵng",
    "visual_asset_url": null,
    "asset_subject_id": null,
    "visual_attribution": null
  },
  {
    "item_id": "PLACE_NHA_THI_DAU_TIEN_SON",
    "brand": "Cung Thể Thao Tiên Sơn",
    "title": "Cung Thể Thao Tiên Sơn (Đĩa Bay Tiên Sơn)",
    "summary_text": "Nhà thi đấu hiện đại hình dáng đĩa bay, nơi diễn ra các giải thể thao sinh viên, hội thao và đại nhạc hội lớn.",
    "curation_story": "Nhà thi đấu hiện đại hình dáng đĩa bay, nơi diễn ra các giải thể thao sinh viên, hội thao và đại nhạc hội lớn.",
    "scope_text": "Phan Đăng Lưu, Hòa Cường Bắc, Hải Châu, Đà Nẵng",
    "official_source_url": "https://danang.gov.vn",
    "gateway_group": "DI_DAU",
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "SLOT_EVENING",
    "transit_hint": "🚌 Gần tuyến xe buýt DanaBus R16 & Trạm xe đạp TNGO Bạch Đằng",
    "map_query_url": "https://www.google.com/maps/search/?api=1&query=Cung%20Th%E1%BB%83%20Thao%20Ti%C3%AAn%20S%C6%A1n%20(%C4%90%C4%A9a%20Bay%20Ti%C3%AAn%20S%C6%A1n)%20%C4%90%C3%A0%20N%E1%BA%B5ng",
    "leisure_category": "CITY_EXPLORE",
    "meal_moments": null,
    "subject_id": "PLACE_NHA_THI_DAU_TIEN_SON",
    "content_type": "CIVIC_UTILITY",
    "tier_level": "TIER_3_UTILITY",
    "tier_badge": "📍 TIỆN ÍCH CÔNG CỘNG",
    "tier_badge_class": "tier-badge-utility",
    "specific_action_label": "📍 Xem thông tin & Maps →",
    "evidence_status": "Tiện ích công cộng: TP. Đà Nẵng",
    "visual_asset_url": null,
    "asset_subject_id": null,
    "visual_attribution": null
  },
  {
    "item_id": "PLACE_BEN_DU_THUYEN_SONG_HAN",
    "brand": "Du Thuyền Sông Hàn",
    "title": "Bến Du Thuyền Sông Hàn (Ngắm Cầu Đà Nẵng Về Đêm)",
    "summary_text": "Trải nghiệm du ngoạn sông Hàn về đêm ngắm nhìn các cây cầu lung linh ánh đèn và thưởng thức múa Chăm truyền thống.",
    "curation_story": "Trải nghiệm du ngoạn sông Hàn về đêm ngắm nhìn các cây cầu lung linh ánh đèn và thưởng thức múa Chăm truyền thống.",
    "scope_text": "Đối diện số 34 Bạch Đằng, Hải Châu, Đà Nẵng",
    "official_source_url": "https://danang.gov.vn",
    "gateway_group": "DI_DAU",
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "SLOT_EVENING",
    "transit_hint": "🚌 Gần tuyến xe buýt DanaBus R16 & Trạm xe đạp TNGO Bạch Đằng",
    "map_query_url": "https://www.google.com/maps/search/?api=1&query=B%E1%BA%BFn%20Du%20Thuy%E1%BB%81n%20S%C3%B4ng%20H%C3%A0n%20(Ng%E1%BA%AFm%20C%E1%BA%A7u%20%C4%90%C3%A0%20N%E1%BA%B5ng%20V%E1%BB%81%20%C4%90%C3%AAm)%20%C4%90%C3%A0%20N%E1%BA%B5ng",
    "leisure_category": "RIVERSIDE",
    "meal_moments": null,
    "subject_id": "PLACE_BEN_DU_THUYEN_SONG_HAN",
    "content_type": "CIVIC_UTILITY",
    "tier_level": "TIER_3_UTILITY",
    "tier_badge": "📍 TIỆN ÍCH CÔNG CỘNG",
    "tier_badge_class": "tier-badge-utility",
    "specific_action_label": "📍 Xem thông tin & Maps →",
    "evidence_status": "Tiện ích công cộng: TP. Đà Nẵng",
    "visual_asset_url": null,
    "asset_subject_id": null,
    "visual_attribution": null
  },
  {
    "item_id": "PLACE_TRUNG_TAM_VAN_HOA_DIEN_ANH",
    "brand": "Trung Tâm Văn Hóa TP",
    "title": "Trung Tâm Văn Hóa — Điện Ảnh TP. Đà Nẵng",
    "summary_text": "Tổ chức các buổi chiếu phim tài liệu, biểu diễn tuồng, hô hát bài chòi và các hoạt động văn hóa nghệ thuật.",
    "curation_story": "Tổ chức các buổi chiếu phim tài liệu, biểu diễn tuồng, hô hát bài chòi và các hoạt động văn hóa nghệ thuật.",
    "scope_text": "68 Trần Phú, Hải Châu, Đà Nẵng",
    "official_source_url": "https://danang.gov.vn",
    "gateway_group": "DI_DAU",
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "SLOT_EVENING",
    "transit_hint": "🚌 Gần tuyến xe buýt DanaBus R16 & Trạm xe đạp TNGO Bạch Đằng",
    "map_query_url": "https://www.google.com/maps/search/?api=1&query=Trung%20T%C3%A2m%20V%C4%83n%20H%C3%B3a%20%E2%80%94%20%C4%90i%E1%BB%87n%20%E1%BA%A2nh%20TP.%20%C4%90%C3%A0%20N%E1%BA%B5ng%20%C4%90%C3%A0%20N%E1%BA%B5ng",
    "leisure_category": "CITY_EXPLORE",
    "meal_moments": null,
    "subject_id": "PLACE_TRUNG_TAM_VAN_HOA_DIEN_ANH",
    "content_type": "CIVIC_UTILITY",
    "tier_level": "TIER_3_UTILITY",
    "tier_badge": "📍 TIỆN ÍCH CÔNG CỘNG",
    "tier_badge_class": "tier-badge-utility",
    "specific_action_label": "📍 Xem thông tin & Maps →",
    "evidence_status": "Tiện ích công cộng: TP. Đà Nẵng",
    "visual_asset_url": null,
    "asset_subject_id": null,
    "visual_attribution": null
  },
  {
    "item_id": "RADAR_HIGHLANDS_COFFEE",
    "brand": "Highlands Coffee",
    "title": "Highlands Coffee: Kênh Giám Sát Nguồn Tin",
    "summary_text": "Theo dõi các thông tin phát hành chính thức từ ứng dụng di động Highlands Coffee.",
    "curation_story": "Theo dõi các thông tin phát hành chính thức từ ứng dụng di động Highlands Coffee.",
    "scope_text": "Các chi nhánh Highlands Coffee Đà Nẵng",
    "official_source_url": "https://highlandscoffee.com.vn",
    "gateway_group": "AN_GI",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "ALL_DAY",
    "transit_hint": "📍 Kết nối giao thông nội thành thuận tiện",
    "map_query_url": "https://www.google.com/maps/search/?api=1&query=Highlands%20Coffee%3A%20K%C3%AAnh%20Gi%C3%A1m%20S%C3%A1t%20Ngu%E1%BB%93n%20Tin%20%C4%90%C3%A0%20N%E1%BA%B5ng",
    "leisure_category": null,
    "meal_moments": [
      "TRUA",
      "TOI"
    ],
    "subject_id": "RADAR_HIGHLANDS_COFFEE",
    "content_type": "PLACE_CULINARY",
    "tier_level": "TIER_4_RADAR",
    "tier_badge": "📡 KHÁM PHÁ BẢN ĐỊA",
    "tier_badge_class": "tier-badge-radar",
    "specific_action_label": "📍 Xem vị trí & chỉ đường →",
    "evidence_status": "Kênh theo dõi ẩm thực: highlandscoffee.com.vn",
    "visual_asset_url": null,
    "asset_subject_id": null,
    "visual_attribution": null
  },
  {
    "item_id": "RADAR_PHUC_LONG",
    "brand": "Phúc Long Tea",
    "title": "Phúc Long Coffee & Tea: Kênh Giám Sát Nguồn Tin",
    "summary_text": "Theo dõi chính sách thành viên và các thông báo mới từ thương hiệu Phúc Long.",
    "curation_story": "Theo dõi chính sách thành viên và các thông báo mới từ thương hiệu Phúc Long.",
    "scope_text": "Phúc Long Bạch Đằng & Nguyễn Văn Linh, Đà Nẵng",
    "official_source_url": "https://phuclong.com.vn",
    "gateway_group": "AN_GI",
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "ALL_DAY",
    "transit_hint": "🚌 Gần tuyến xe buýt DanaBus R16 & Trạm xe đạp TNGO Bạch Đằng",
    "map_query_url": "https://www.google.com/maps/search/?api=1&query=Ph%C3%BAc%20Long%20Coffee%20%26%20Tea%3A%20K%C3%AAnh%20Gi%C3%A1m%20S%C3%A1t%20Ngu%E1%BB%93n%20Tin%20%C4%90%C3%A0%20N%E1%BA%B5ng",
    "leisure_category": null,
    "meal_moments": [
      "TRUA",
      "TOI"
    ],
    "subject_id": "RADAR_PHUC_LONG",
    "content_type": "PLACE_CULINARY",
    "tier_level": "TIER_4_RADAR",
    "tier_badge": "📡 KHÁM PHÁ BẢN ĐỊA",
    "tier_badge_class": "tier-badge-radar",
    "specific_action_label": "📍 Xem vị trí & chỉ đường →",
    "evidence_status": "Kênh theo dõi ẩm thực: phuclong.com.vn",
    "visual_asset_url": null,
    "asset_subject_id": null,
    "visual_attribution": null
  },
  {
    "item_id": "RADAR_VINCOM_PLAZA",
    "brand": "Vincom Plaza",
    "title": "Vincom Plaza Ngô Quyền: Kênh Giám Sát Sự Kiện",
    "summary_text": "Theo dõi các sự kiện trải nghiệm mua sắm và hoạt động văn hóa tại TTTM Vincom Plaza Đà Nẵng.",
    "curation_story": "Theo dõi các sự kiện trải nghiệm mua sắm và hoạt động văn hóa tại TTTM Vincom Plaza Đà Nẵng.",
    "scope_text": "910A Ngô Quyền, Sơn Trà, Đà Nẵng",
    "official_source_url": "https://vincom.com.vn",
    "gateway_group": "MUA_SAM",
    "locality_tag": "SON_TRA",
    "time_slot_tag": "ALL_DAY",
    "transit_hint": "🚲 Gần trạm xe đạp TNGO Võ Nguyên Giáp & Cầu Rồng",
    "map_query_url": null,
    "leisure_category": null,
    "meal_moments": null,
    "subject_id": "RADAR_VINCOM_PLAZA",
    "content_type": "COMMERCIAL_RADAR",
    "tier_level": "TIER_4_RADAR",
    "tier_badge": "📡 THEO DÕI NGUỒN TIN",
    "tier_badge_class": "tier-badge-radar",
    "specific_action_label": "📡 Theo dõi kênh →",
    "evidence_status": "Kênh theo dõi: vincom.com.vn",
    "visual_asset_url": null,
    "asset_subject_id": null,
    "visual_attribution": null
  },
  {
    "item_id": "RADAR_LOTTE_MART",
    "brand": "Lotte Mart",
    "title": "Lotte Mart Đà Nẵng: Kênh Giám Sát Siêu Thị",
    "summary_text": "Theo dõi cẩm nang hàng hóa tiêu dùng và chính sách hội viên Lotte Mart.",
    "curation_story": "Theo dõi cẩm nang hàng hóa tiêu dùng và chính sách hội viên Lotte Mart.",
    "scope_text": "Đường 2 Tháng 9, Hòa Cường Bắc, Hải Châu, Đà Nẵng",
    "official_source_url": "https://www.lottemart.vn",
    "gateway_group": "MUA_SAM",
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "ALL_DAY",
    "transit_hint": "🚌 Gần tuyến xe buýt DanaBus R16 & Trạm xe đạp TNGO Bạch Đằng",
    "map_query_url": null,
    "leisure_category": null,
    "meal_moments": null,
    "subject_id": "RADAR_LOTTE_MART",
    "content_type": "COMMERCIAL_RADAR",
    "tier_level": "TIER_4_RADAR",
    "tier_badge": "📡 THEO DÕI NGUỒN TIN",
    "tier_badge_class": "tier-badge-radar",
    "specific_action_label": "📡 Theo dõi kênh →",
    "evidence_status": "Kênh theo dõi: www.lottemart.vn",
    "visual_asset_url": null,
    "asset_subject_id": null,
    "visual_attribution": null
  },
  {
    "item_id": "RADAR_BIGC_GO_DANANG",
    "brand": "GO! Đà Nẵng",
    "title": "GO! Đà Nẵng (Big C): Kênh Giám Sát Siêu Thị",
    "summary_text": "Theo dõi thông tin hàng hóa thiết yếu và cẩm nang mua sắm tại siêu thị GO! Đà Nẵng.",
    "curation_story": "Theo dõi thông tin hàng hóa thiết yếu và cẩm nang mua sắm tại siêu thị GO! Đà Nẵng.",
    "scope_text": "Vĩnh Trung Plaza, 255 Hùng Vương, Thanh Khê, Đà Nẵng",
    "official_source_url": "https://go-vietnam.vn",
    "gateway_group": "MUA_SAM",
    "locality_tag": "THANH_KHE",
    "time_slot_tag": "ALL_DAY",
    "transit_hint": "🚌 Gần tuyến xe buýt DanaBus R6A & Trạm TNGO Điện Biên Phủ",
    "map_query_url": null,
    "leisure_category": null,
    "meal_moments": null,
    "subject_id": "RADAR_BIGC_GO_DANANG",
    "content_type": "COMMERCIAL_RADAR",
    "tier_level": "TIER_4_RADAR",
    "tier_badge": "📡 THEO DÕI NGUỒN TIN",
    "tier_badge_class": "tier-badge-radar",
    "specific_action_label": "📡 Theo dõi kênh →",
    "evidence_status": "Kênh theo dõi: go-vietnam.vn",
    "visual_asset_url": null,
    "asset_subject_id": null,
    "visual_attribution": null
  },
  {
    "item_id": "RADAR_KICHI_KICHI",
    "brand": "Kichi-Kichi",
    "title": "Kichi-Kichi Lẩu Băng Chuyền: Kênh Giám Sát Ẩm Thực",
    "summary_text": "Theo dõi các thông báo thực đơn và sự kiện trải nghiệm lẩu băng chuyền tại Đà Nẵng.",
    "curation_story": "Theo dõi các thông báo thực đơn và sự kiện trải nghiệm lẩu băng chuyền tại Đà Nẵng.",
    "scope_text": "Vincom & Nguyễn Văn Linh, Đà Nẵng",
    "official_source_url": "https://kichi.com.vn",
    "gateway_group": "AN_GI",
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "SLOT_LUNCH",
    "transit_hint": "🚌 Gần tuyến xe buýt DanaBus R16 & Trạm xe đạp TNGO Bạch Đằng",
    "map_query_url": "https://www.google.com/maps/search/?api=1&query=Kichi-Kichi%20L%E1%BA%A9u%20B%C4%83ng%20Chuy%E1%BB%81n%3A%20K%C3%AAnh%20Gi%C3%A1m%20S%C3%A1t%20%E1%BA%A8m%20Th%E1%BB%B1c%20%C4%90%C3%A0%20N%E1%BA%B5ng",
    "leisure_category": null,
    "meal_moments": [
      "TRUA",
      "TOI"
    ],
    "subject_id": "RADAR_KICHI_KICHI",
    "content_type": "PLACE_CULINARY",
    "tier_level": "TIER_4_RADAR",
    "tier_badge": "📡 KHÁM PHÁ BẢN ĐỊA",
    "tier_badge_class": "tier-badge-radar",
    "specific_action_label": "📍 Xem vị trí & chỉ đường →",
    "evidence_status": "Kênh theo dõi ẩm thực: kichi.com.vn",
    "visual_asset_url": null,
    "asset_subject_id": null,
    "visual_attribution": null
  },
  {
    "item_id": "RADAR_GOGI_HOUSE",
    "brand": "Gogi House",
    "title": "Gogi House: Kênh Giám Sát Ẩm Thực Nướng",
    "summary_text": "Theo dõi các thông báo thực đơn thịt nướng chuẩn vị Hàn Quốc tại hệ thống Gogi House Đà Nẵng.",
    "curation_story": "Theo dõi các thông báo thực đơn thịt nướng chuẩn vị Hàn Quốc tại hệ thống Gogi House Đà Nẵng.",
    "scope_text": "Nguyễn Tri Phương & Lotte Mart, Đà Nẵng",
    "official_source_url": "https://gogi.com.vn",
    "gateway_group": "AN_GI",
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "SLOT_EVENING",
    "transit_hint": "🚌 Gần tuyến xe buýt DanaBus R16 & Trạm xe đạp TNGO Bạch Đằng",
    "map_query_url": "https://www.google.com/maps/search/?api=1&query=Gogi%20House%3A%20K%C3%AAnh%20Gi%C3%A1m%20S%C3%A1t%20%E1%BA%A8m%20Th%E1%BB%B1c%20N%C6%B0%E1%BB%9Bng%20%C4%90%C3%A0%20N%E1%BA%B5ng",
    "leisure_category": null,
    "meal_moments": [
      "TRUA",
      "TOI"
    ],
    "subject_id": "RADAR_GOGI_HOUSE",
    "content_type": "PLACE_CULINARY",
    "tier_level": "TIER_4_RADAR",
    "tier_badge": "📡 KHÁM PHÁ BẢN ĐỊA",
    "tier_badge_class": "tier-badge-radar",
    "specific_action_label": "📍 Xem vị trí & chỉ đường →",
    "evidence_status": "Kênh theo dõi ẩm thực: gogi.com.vn",
    "visual_asset_url": null,
    "asset_subject_id": null,
    "visual_attribution": null
  },
  {
    "item_id": "RADAR_THE_COFFEE_HOUSE",
    "brand": "The Coffee House",
    "title": "The Coffee House: Kênh Giám Sát Nguồn Tin",
    "summary_text": "Theo dõi các thông báo thực đơn và tính năng ứng dụng The Coffee House.",
    "curation_story": "Theo dõi các thông báo thực đơn và tính năng ứng dụng The Coffee House.",
    "scope_text": "Nguyễn Văn Linh, Trần Phú, Pasteur Đà Nẵng",
    "official_source_url": "https://thecoffeehouse.com",
    "gateway_group": "AN_GI",
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "SLOT_MORNING",
    "transit_hint": "🚌 Gần tuyến xe buýt DanaBus R16 & Trạm xe đạp TNGO Bạch Đằng",
    "map_query_url": "https://www.google.com/maps/search/?api=1&query=The%20Coffee%20House%3A%20K%C3%AAnh%20Gi%C3%A1m%20S%C3%A1t%20Ngu%E1%BB%93n%20Tin%20%C4%90%C3%A0%20N%E1%BA%B5ng",
    "leisure_category": null,
    "meal_moments": [
      "TRUA",
      "TOI"
    ],
    "subject_id": "RADAR_THE_COFFEE_HOUSE",
    "content_type": "PLACE_CULINARY",
    "tier_level": "TIER_4_RADAR",
    "tier_badge": "📡 KHÁM PHÁ BẢN ĐỊA",
    "tier_badge_class": "tier-badge-radar",
    "specific_action_label": "📍 Xem vị trí & chỉ đường →",
    "evidence_status": "Kênh theo dõi ẩm thực: thecoffeehouse.com",
    "visual_asset_url": null,
    "asset_subject_id": null,
    "visual_attribution": null
  },
  {
    "item_id": "RADAR_TRUNG_NGUYEN_LEGEND",
    "brand": "Trung Nguyên Legend",
    "title": "Trung Nguyên Legend: Kênh Giám Sát Không Gian",
    "summary_text": "Theo dõi các không gian cà phê và hoạt động văn hóa đọc bên bờ sông Hàn.",
    "curation_story": "Theo dõi các không gian cà phê và hoạt động văn hóa đọc bên bờ sông Hàn.",
    "scope_text": "Bạch Đằng, Nguyễn Thị Minh Khai, Đà Nẵng",
    "official_source_url": "https://trungnguyenlegend.com",
    "gateway_group": "AN_GI",
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "SLOT_MORNING",
    "transit_hint": "🚌 Gần tuyến xe buýt DanaBus R16 & Trạm xe đạp TNGO Bạch Đằng",
    "map_query_url": "https://www.google.com/maps/search/?api=1&query=Trung%20Nguy%C3%AAn%20Legend%3A%20K%C3%AAnh%20Gi%C3%A1m%20S%C3%A1t%20Kh%C3%B4ng%20Gian%20%C4%90%C3%A0%20N%E1%BA%B5ng",
    "leisure_category": null,
    "meal_moments": [
      "TRUA",
      "TOI"
    ],
    "subject_id": "RADAR_TRUNG_NGUYEN_LEGEND",
    "content_type": "PLACE_CULINARY",
    "tier_level": "TIER_4_RADAR",
    "tier_badge": "📡 KHÁM PHÁ BẢN ĐỊA",
    "tier_badge_class": "tier-badge-radar",
    "specific_action_label": "📍 Xem vị trí & chỉ đường →",
    "evidence_status": "Kênh theo dõi ẩm thực: trungnguyenlegend.com",
    "visual_asset_url": null,
    "asset_subject_id": null,
    "visual_attribution": null
  },
  {
    "item_id": "RADAR_MIXUE_DANANG",
    "brand": "Mixue Vietnam",
    "title": "Mixue Đà Nẵng: Kênh Giám Sát Đồ Uống",
    "summary_text": "Theo dõi các thông tin thực đơn và hoạt động tại các chi nhánh Mixue Đà Nẵng.",
    "curation_story": "Theo dõi các thông tin thực đơn và hoạt động tại các chi nhánh Mixue Đà Nẵng.",
    "scope_text": "Các cơ sở Mixue gần cổng trường học Đà Nẵng",
    "official_source_url": "https://mxbc.vn",
    "gateway_group": "AN_GI",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "SLOT_AFTERNOON",
    "transit_hint": "📍 Kết nối giao thông nội thành thuận tiện",
    "map_query_url": "https://www.google.com/maps/search/?api=1&query=Mixue%20%C4%90%C3%A0%20N%E1%BA%B5ng%3A%20K%C3%AAnh%20Gi%C3%A1m%20S%C3%A1t%20%C4%90%E1%BB%93%20U%E1%BB%91ng%20%C4%90%C3%A0%20N%E1%BA%B5ng",
    "leisure_category": null,
    "meal_moments": [
      "TRUA",
      "TOI"
    ],
    "subject_id": "RADAR_MIXUE_DANANG",
    "content_type": "PLACE_CULINARY",
    "tier_level": "TIER_4_RADAR",
    "tier_badge": "📡 KHÁM PHÁ BẢN ĐỊA",
    "tier_badge_class": "tier-badge-radar",
    "specific_action_label": "📍 Xem vị trí & chỉ đường →",
    "evidence_status": "Kênh theo dõi ẩm thực: mxbc.vn",
    "visual_asset_url": null,
    "asset_subject_id": null,
    "visual_attribution": null
  },
  {
    "item_id": "RADAR_CGV_VINCOM_SCHEDULE",
    "brand": "CGV Cinemas",
    "title": "CGV Vincom Đà Nẵng: Kênh Giám Sát Lịch Chiếu",
    "summary_text": "Theo dõi lịch phát hành phim và các suất chiếu sớm tại rạp CGV Vincom Đà Nẵng.",
    "curation_story": "Theo dõi lịch phát hành phim và các suất chiếu sớm tại rạp CGV Vincom Đà Nẵng.",
    "scope_text": "Tầng 4 Vincom Plaza, Ngô Quyền, Sơn Trà, Đà Nẵng",
    "official_source_url": "https://www.cgv.vn",
    "gateway_group": "DI_DAU",
    "locality_tag": "SON_TRA",
    "time_slot_tag": "SLOT_EVENING",
    "transit_hint": "🚲 Gần trạm xe đạp TNGO Võ Nguyên Giáp & Cầu Rồng",
    "map_query_url": "https://www.google.com/maps/search/?api=1&query=CGV%20Vincom%20%C4%90%C3%A0%20N%E1%BA%B5ng%3A%20K%C3%AAnh%20Gi%C3%A1m%20S%C3%A1t%20L%E1%BB%8Bch%20Chi%E1%BA%BFu%20%C4%90%C3%A0%20N%E1%BA%B5ng",
    "leisure_category": "CINEMA",
    "meal_moments": null,
    "subject_id": "RADAR_CGV_VINCOM_SCHEDULE",
    "content_type": "COMMERCIAL_RADAR",
    "tier_level": "TIER_4_RADAR",
    "tier_badge": "📡 THEO DÕI NGUỒN TIN",
    "tier_badge_class": "tier-badge-radar",
    "specific_action_label": "📡 Theo dõi kênh →",
    "evidence_status": "Kênh theo dõi: www.cgv.vn",
    "visual_asset_url": null,
    "asset_subject_id": null,
    "visual_attribution": null
  },
  {
    "item_id": "RADAR_GALAXY_DIEN_BIEN_PHU",
    "brand": "Galaxy Cinema",
    "title": "Galaxy Điện Biên Phủ: Kênh Giám Sát Lịch Chiếu",
    "summary_text": "Theo dõi thông tin lịch chiếu và trải nghiệm rạp phim tại Galaxy Điện Biên Phủ Đà Nẵng.",
    "curation_story": "Theo dõi thông tin lịch chiếu và trải nghiệm rạp phim tại Galaxy Điện Biên Phủ Đà Nẵng.",
    "scope_text": "478 Điện Biên Phủ, Thanh Khê, Đà Nẵng",
    "official_source_url": "https://www.galaxycine.vn",
    "gateway_group": "DI_DAU",
    "locality_tag": "THANH_KHE",
    "time_slot_tag": "SLOT_EVENING",
    "transit_hint": "🚌 Gần tuyến xe buýt DanaBus R6A & Trạm TNGO Điện Biên Phủ",
    "map_query_url": "https://www.google.com/maps/search/?api=1&query=Galaxy%20%C4%90i%E1%BB%87n%20Bi%C3%AAn%20Ph%E1%BB%A7%3A%20K%C3%AAnh%20Gi%C3%A1m%20S%C3%A1t%20L%E1%BB%8Bch%20Chi%E1%BA%BFu%20%C4%90%C3%A0%20N%E1%BA%B5ng",
    "leisure_category": "CITY_EXPLORE",
    "meal_moments": null,
    "subject_id": "RADAR_GALAXY_DIEN_BIEN_PHU",
    "content_type": "COMMERCIAL_RADAR",
    "tier_level": "TIER_4_RADAR",
    "tier_badge": "📡 THEO DÕI NGUỒN TIN",
    "tier_badge_class": "tier-badge-radar",
    "specific_action_label": "📡 Theo dõi kênh →",
    "evidence_status": "Kênh theo dõi: www.galaxycine.vn",
    "visual_asset_url": null,
    "asset_subject_id": null,
    "visual_attribution": null
  },
  {
    "item_id": "RADAR_CGV_VINH_TRUNG_PLAZA",
    "brand": "CGV Cinemas",
    "title": "CGV Vĩnh Trung Plaza: Kênh Giám Sát Lịch Chiếu",
    "summary_text": "Theo dõi các suất chiếu ngày trong tuần và sự kiện điện ảnh tại CGV Vĩnh Trung Đà Nẵng.",
    "curation_story": "Theo dõi các suất chiếu ngày trong tuần và sự kiện điện ảnh tại CGV Vĩnh Trung Đà Nẵng.",
    "scope_text": "255 Hùng Vương, Thanh Khê, Đà Nẵng",
    "official_source_url": "https://www.cgv.vn",
    "gateway_group": "DI_DAU",
    "locality_tag": "THANH_KHE",
    "time_slot_tag": "SLOT_AFTERNOON",
    "transit_hint": "🚌 Gần tuyến xe buýt DanaBus R6A & Trạm TNGO Điện Biên Phủ",
    "map_query_url": "https://www.google.com/maps/search/?api=1&query=CGV%20V%C4%A9nh%20Trung%20Plaza%3A%20K%C3%AAnh%20Gi%C3%A1m%20S%C3%A1t%20L%E1%BB%8Bch%20Chi%E1%BA%BFu%20%C4%90%C3%A0%20N%E1%BA%B5ng",
    "leisure_category": "CINEMA",
    "meal_moments": null,
    "subject_id": "RADAR_CGV_VINH_TRUNG_PLAZA",
    "content_type": "COMMERCIAL_RADAR",
    "tier_level": "TIER_4_RADAR",
    "tier_badge": "📡 THEO DÕI NGUỒN TIN",
    "tier_badge_class": "tier-badge-radar",
    "specific_action_label": "📡 Theo dõi kênh →",
    "evidence_status": "Kênh theo dõi: www.cgv.vn",
    "visual_asset_url": null,
    "asset_subject_id": null,
    "visual_attribution": null
  },
  {
    "item_id": "RADAR_HELIO_CENTER_WEEKEND",
    "brand": "Helio Center",
    "title": "Helio Center: Kênh Giám Sát Sự Kiện Đô Thị",
    "summary_text": "Theo dõi các đêm nhạc Acoustic, không gian ẩm thực đêm và tổ hợp vui chơi giải trí Helio Đà Nẵng.",
    "curation_story": "Theo dõi các đêm nhạc Acoustic, không gian ẩm thực đêm và tổ hợp vui chơi giải trí Helio Đà Nẵng.",
    "scope_text": "Đường 2 Tháng 9, Hòa Cường Nam, Hải Châu, Đà Nẵng",
    "official_source_url": "https://helio.vn",
    "gateway_group": "DI_DAU",
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "SLOT_EVENING",
    "transit_hint": "🚌 Gần tuyến xe buýt DanaBus R16 & Trạm xe đạp TNGO Bạch Đằng",
    "map_query_url": "https://www.google.com/maps/search/?api=1&query=Helio%20Center%3A%20K%C3%AAnh%20Gi%C3%A1m%20S%C3%A1t%20S%E1%BB%B1%20Ki%E1%BB%87n%20%C4%90%C3%B4%20Th%E1%BB%8B%20%C4%90%C3%A0%20N%E1%BA%B5ng",
    "leisure_category": "CITY_EXPLORE",
    "meal_moments": null,
    "subject_id": "RADAR_HELIO_CENTER_WEEKEND",
    "content_type": "COMMERCIAL_RADAR",
    "tier_level": "TIER_4_RADAR",
    "tier_badge": "📡 THEO DÕI NGUỒN TIN",
    "tier_badge_class": "tier-badge-radar",
    "specific_action_label": "📡 Theo dõi kênh →",
    "evidence_status": "Kênh theo dõi: helio.vn",
    "visual_asset_url": null,
    "asset_subject_id": null,
    "visual_attribution": null
  }
];

  // 2. WALLET LEDGER (13 FAIL-CLOSED ENTRIES: 10 CỔNG CHÍNH THỨC, 3 RADAR)
  const JAYT_WALLET_ENTRIES = [
  {
    "entry_id": "VAL_GITHUB_STUDENT",
    "lane": "LANE_CONG_CHINH_THUC",
    "lane_badge": "🏛️ CỔNG THÔNG TIN CHÍNH THỨC",
    "category": "STUDY_TOOLS",
    "merchant_name": "GitHub Education",
    "title": "GitHub Student Developer Pack",
    "service_description": "Bộ công cụ lập trình chuyên nghiệp, GitHub Copilot và tài nguyên kỹ thuật hỗ trợ học tập.",
    "target_audience": "Học sinh, sinh viên các trường đại học/cao đẳng có email trường học hoặc thẻ sinh viên.",
    "official_portal_guide": "Xác thực trực tiếp tại cổng GitHub Education bằng tài khoản học sinh sinh viên.",
    "official_source_url": "https://education.github.com/pack",
    "action_button_label": "🏛️ Mở cổng chính thức để kiểm tra điều kiện →",
    "evidence_status": "Chương trình chính thức — kiểm điều kiện tại nguồn: education.github.com"
  },
  {
    "entry_id": "VAL_NOTION_EDU",
    "lane": "LANE_CONG_CHINH_THUC",
    "lane_badge": "🏛️ CỔNG THÔNG TIN CHÍNH THỨC",
    "category": "STUDY_TOOLS",
    "merchant_name": "Notion",
    "title": "Notion Plus Education",
    "service_description": "Không gian làm việc số, ghi chú bài giảng và quản lý đề án học tập cho học sinh sinh viên.",
    "target_audience": "Học sinh, sinh viên và giảng viên có email tên miền giáo dục (.edu hoặc trường học).",
    "official_portal_guide": "Đăng ký tài khoản Notion bằng email học đường để nâng cấp gói Plus.",
    "official_source_url": "https://www.notion.so/product/notion-for-education",
    "action_button_label": "🏛️ Mở cổng chính thức để kiểm tra điều kiện →",
    "evidence_status": "Chương trình chính thức — kiểm điều kiện tại nguồn: www.notion.so"
  },
  {
    "entry_id": "VAL_CANVA_EDU",
    "lane": "LANE_CONG_CHINH_THUC",
    "lane_badge": "🏛️ CỔNG THÔNG TIN CHÍNH THỨC",
    "category": "STUDY_TOOLS",
    "merchant_name": "Canva Education",
    "title": "Canva for Education",
    "service_description": "Nền tảng thiết kế đồ họa, bài giảng và slide thuyết trình học đường.",
    "target_audience": "Giáo viên và học sinh sinh viên tại các cơ sở giáo dục đã được cấp phép.",
    "official_portal_guide": "Xác thực qua tài khoản Google Workspace for Education hoặc email trường.",
    "official_source_url": "https://www.canva.com/education/",
    "action_button_label": "🏛️ Mở cổng chính thức để kiểm tra điều kiện →",
    "evidence_status": "Chương trình chính thức — kiểm điều kiện tại nguồn: www.canva.com"
  },
  {
    "entry_id": "VAL_DANABUS_PASS",
    "lane": "LANE_CONG_CHINH_THUC",
    "lane_badge": "🏛️ CỔNG THÔNG TIN CHÍNH THỨC",
    "category": "TRANSPORT",
    "merchant_name": "DanaBus Đà Nẵng",
    "title": "DanaBus: Vé Tháng Xe Buýt Học Sinh Sinh Viên",
    "service_description": "Mạng lưới xe buýt công cộng nội thành có trợ giá cho học sinh sinh viên trên toàn địa bàn TP. Đà Nẵng.",
    "target_audience": "Học sinh các trường phổ thông, sinh viên các trường đại học, cao đẳng tại Đà Nẵng.",
    "official_portal_guide": "Làm thẻ vé tháng tại Trung tâm Điều hành Đèn tín hiệu giao thông & Vận tải công cộng hoặc các quầy vé xe buýt thành phố.",
    "official_source_url": "https://danangbus.vn",
    "action_button_label": "🏛️ Mở cổng chính thức để kiểm tra điều kiện →",
    "evidence_status": "Chương trình chính thức — kiểm điều kiện tại nguồn: danangbus.vn"
  },
  {
    "entry_id": "VAL_CGV_CINEMAS",
    "lane": "LANE_CONG_CHINH_THUC",
    "lane_badge": "🏛️ CỔNG THÔNG TIN CHÍNH THỨC",
    "category": "ENTERTAINMENT",
    "merchant_name": "CGV Cinemas Đà Nẵng",
    "title": "CGV Cinemas: Cụm Rạp Chiếu Phim Đà Nẵng",
    "service_description": "Tra cứu lịch chiếu, suất chiếu phim tiêu chuẩn tại các cụm rạp CGV trên địa bàn TP. Đà Nẵng.",
    "target_audience": "Khán giả xem phim tại CGV Vincom Ngô Quyền và CGV Vĩnh Trung Plaza.",
    "official_portal_guide": "Xem lịch chiếu trực tiếp tại website chính thức cgv.vn.",
    "official_source_url": "https://www.cgv.vn",
    "action_button_label": "🏛️ Mở cổng chính thức để kiểm tra điều kiện →",
    "evidence_status": "Chương trình chính thức — kiểm điều kiện tại nguồn: www.cgv.vn"
  },
  {
    "entry_id": "VAL_DOMINOS_PIZZA",
    "lane": "LANE_CONG_CHINH_THUC",
    "lane_badge": "🏛️ CỔNG THÔNG TIN CHÍNH THỨC",
    "category": "FOOD_BEVERAGE",
    "merchant_name": "Domino's Pizza Đà Nẵng",
    "title": "Domino's Pizza: Kênh Chi Nhánh Đà Nẵng",
    "service_description": "Thực đơn bánh pizza và thông tin cơ sở tại các chi nhánh Hải Châu, Thanh Khê, Sơn Trà.",
    "target_audience": "Khách hàng dùng bữa tại cửa hàng hoặc đặt giao hàng qua kênh chính thức.",
    "official_portal_guide": "Kiểm tra thực đơn và các đợt phát hành thông báo trên website dominos.vn.",
    "official_source_url": "https://dominos.vn",
    "action_button_label": "🏛️ Mở cổng chính thức để kiểm tra điều kiện →",
    "evidence_status": "Chương trình chính thức — kiểm điều kiện tại nguồn: dominos.vn"
  },
  {
    "entry_id": "VAL_LOTTERIA",
    "lane": "LANE_CONG_CHINH_THUC",
    "lane_badge": "🏛️ CỔNG THÔNG TIN CHÍNH THỨC",
    "category": "FOOD_BEVERAGE",
    "merchant_name": "Lotteria Đà Nẵng",
    "title": "Lotteria: Kênh Thực Đơn Trưa Happy Lunch",
    "service_description": "Thực đơn trưa cơm gà, burger tại hệ thống cửa hàng thức ăn nhanh Lotteria Đà Nẵng.",
    "target_audience": "Khách hàng ăn trưa tại chỗ trong khung giờ từ 10h00 đến 14h00 từ Thứ 2 đến Thứ 6.",
    "official_portal_guide": "Xem thực đơn niêm yết tại quầy gọi món ở các cửa hàng Lotteria.",
    "official_source_url": "https://www.lotteria.vn",
    "action_button_label": "🏛️ Mở cổng chính thức để kiểm tra điều kiện →",
    "evidence_status": "Chương trình chính thức — kiểm điều kiện tại nguồn: www.lotteria.vn"
  },
  {
    "entry_id": "VAL_METIZ_CINEMA",
    "lane": "LANE_CONG_CHINH_THUC",
    "lane_badge": "🏛️ CỔNG THÔNG TIN CHÍNH THỨC",
    "category": "ENTERTAINMENT",
    "merchant_name": "Metiz Cinema",
    "title": "Metiz Cinema: Chính Sách Khán Giả Trẻ U22",
    "service_description": "Chính sách vé xem phim dành cho khán giả trẻ tại rạp Metiz Cinema thuộc khu phức hợp Helio Center.",
    "target_audience": "Khán giả từ 22 tuổi trở xuống (xuất trình CCCD hoặc thẻ HSSV).",
    "official_portal_guide": "Mua vé trực tiếp tại quầy rạp Metiz Cinema Đà Nẵng.",
    "official_source_url": "https://metiz.vn",
    "action_button_label": "🏛️ Mở cổng chính thức để kiểm tra điều kiện →",
    "evidence_status": "Chương trình chính thức — kiểm điều kiện tại nguồn: metiz.vn"
  },
  {
    "entry_id": "VAL_STARLIGHT_CINEMA",
    "lane": "LANE_CONG_CHINH_THUC",
    "lane_badge": "🏛️ CỔNG THÔNG TIN CHÍNH THỨC",
    "category": "ENTERTAINMENT",
    "merchant_name": "Starlight Cinema Đà Nẵng",
    "title": "Starlight Cinema: Chương Trình Thành Viên Rạp Phim",
    "service_description": "Hệ thống chiếu phim giải trí và chính sách thành viên tại tòa nhà Nguyễn Kim Đà Nẵng.",
    "target_audience": "Thành viên đăng ký tài khoản tại cụm rạp Starlight.",
    "official_portal_guide": "Xem thông tin lịch chiếu và thể lệ thành viên tại website starlight.vn.",
    "official_source_url": "https://starlight.vn",
    "action_button_label": "🏛️ Mở cổng chính thức để kiểm tra điều kiện →",
    "evidence_status": "Chương trình chính thức — kiểm điều kiện tại nguồn: starlight.vn"
  },
  {
    "entry_id": "VAL_TNGO_BIKE",
    "lane": "LANE_CONG_CHINH_THUC",
    "lane_badge": "🏛️ CỔNG THÔNG TIN CHÍNH THỨC",
    "category": "TRANSPORT",
    "merchant_name": "TNGO Đà Nẵng",
    "title": "TNGO: Hệ Thống Xe Đạp Công Cộng TP. Đà Nẵng",
    "service_description": "Dịch vụ xe đạp đô thị thông minh kết nối các điểm du lịch, đại học và trục đường ven biển Đà Nẵng.",
    "target_audience": "Người dân và du khách sử dụng điện thoại thông minh kết nối ứng dụng TNGO.",
    "official_portal_guide": "Tải ứng dụng TNGO và quét mã QR tại hơn 60 trạm xe khắp thành phố.",
    "official_source_url": "https://tngo.vn",
    "action_button_label": "🏛️ Mở cổng chính thức để kiểm tra điều kiện →",
    "evidence_status": "Chương trình chính thức — kiểm điều kiện tại nguồn: tngo.vn"
  },
  {
    "entry_id": "VAL_HIGHLANDS_RADAR",
    "lane": "LANE_THEO_DOI",
    "lane_badge": "📡 KÊNH GIÁM SÁT NGUỒN TIN",
    "category": "FOOD_BEVERAGE",
    "merchant_name": "Highlands Coffee",
    "title": "Highlands Coffee: Kênh Giám Sát Nguồn Tin",
    "service_description": "Theo dõi thông tin thực đơn và các thông báo mới từ ứng dụng di động Highlands Coffee.",
    "target_audience": "Người dùng ứng dụng Highlands Coffee trên toàn quốc.",
    "official_portal_guide": "Kênh đang trong diện theo dõi tự động; chưa có hành động giao dịch trực tiếp.",
    "official_source_url": "https://highlandscoffee.com.vn",
    "action_button_label": "📡 Theo dõi kênh chính thức →",
    "evidence_status": "Kênh theo dõi thông tin: highlandscoffee.com.vn"
  },
  {
    "entry_id": "VAL_PHUCLONG_RADAR",
    "lane": "LANE_THEO_DOI",
    "lane_badge": "📡 KÊNH GIÁM SÁT NGUỒN TIN",
    "category": "FOOD_BEVERAGE",
    "merchant_name": "Phúc Long Coffee & Tea",
    "title": "Phúc Long: Kênh Giám Sát Thẻ Thành Viên",
    "service_description": "Theo dõi các cập nhật chính sách điểm thưởng và thông báo từ thương hiệu Phúc Long tại Đà Nẵng.",
    "target_audience": "Hội viên có thẻ tích điểm Phúc Long.",
    "official_portal_guide": "Kênh đang trong diện theo dõi định kỳ qua cổng thông tin chính thức.",
    "official_source_url": "https://phuclong.com.vn",
    "action_button_label": "📡 Theo dõi kênh chính thức →",
    "evidence_status": "Kênh theo dõi thông tin: phuclong.com.vn"
  },
  {
    "entry_id": "VAL_VINCOM_RADAR",
    "lane": "LANE_THEO_DOI",
    "lane_badge": "📡 KÊNH GIÁM SÁT NGUỒN TIN",
    "category": "SHOPPING",
    "merchant_name": "Vincom Plaza Ngô Quyền",
    "title": "Vincom Plaza Đà Nẵng: Kênh Giám Sát Sự Kiện",
    "service_description": "Theo dõi các sự kiện văn hóa, không gian ẩm thực và hoạt động mua sắm tại TTTM Vincom Ngô Quyền.",
    "target_audience": "Khách hàng tham quan và mua sắm tại TTTM Vincom Đà Nẵng.",
    "official_portal_guide": "Theo dõi bảng tin sự kiện tại sảnh TTTM hoặc website chính thức vincom.com.vn.",
    "official_source_url": "https://vincom.com.vn",
    "action_button_label": "📡 Theo dõi kênh chính thức →",
    "evidence_status": "Kênh theo dõi thông tin: vincom.com.vn"
  }
];

  // 3. SINGLE SOURCE OF COUNT INVARIANT
  function computeSingleSourceOfCount(items) {
    const anGi = items.filter(i => i.gateway_group === 'AN_GI');
    const diDau = items.filter(i => i.gateway_group === 'DI_DAU');
    const tienIch = items.filter(i => i.tier_level === 'TIER_3_UTILITY');
    const muaSam = items.filter(i => i.gateway_group === 'MUA_SAM');

    return {
      counts: {
        an_gi: anGi.length,
        di_dau: diDau.length,
        tien_ich: tienIch.length,
        mua_sam_hoc_tap: muaSam.length
      },
      labels: {
        an_gi: `${anGi.length} Địa điểm ẩm thực dẫn nguồn`,
        di_dau: `${diDau.length} Điểm tham quan & rạp chiếu`,
        tien_ich: `${tienIch.length} Tiện ích công cộng TP. Đà Nẵng`,
        mua_sam_hoc_tap: `${muaSam.length} Cổng chính sách & học đường`
      }
    };
  }

  function getJourneyStats(items) {
    return computeSingleSourceOfCount(items);
  }

  // 4. SPA STATE
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
  let activeDrawerItem = null;

  try {
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem('jayt_saved_items');
      if (saved) savedItemIds = new Set(JSON.parse(saved));
      const theme = localStorage.getItem('jayt_theme_mode');
      if (theme) currentTheme = theme;
    }
  } catch (e) {}

  if (typeof window !== 'undefined') {
    Object.defineProperty(window, 'activeView', {
      get: () => activeView,
      set: (v) => { activeView = v; }
    });
    Object.defineProperty(window, 'activeTier', {
      get: () => activeTier,
      set: (t) => { activeTier = t; }
    });
    Object.defineProperty(window, 'activeWalletLane', {
      get: () => activeWalletLane,
      set: (l) => { activeWalletLane = l; }
    });
  }

  // TIME-AWARE CONTEXT HELPER
  function getCurrentTimeSlotInfo() {
    const hour = (typeof window !== 'undefined' && window.JAYT_TEST_HOUR !== undefined) 
      ? window.JAYT_TEST_HOUR 
      : new Date().getHours();
    
    if (hour >= 5 && hour < 11) {
      return { slot: 'SLOT_MORNING', label: 'Sáng nay', momentTag: '🌅 BUỔI SÁNG &bull; ĐIỂM TÂM & CÀ PHÊ VEN SÔNG', momentDesc: 'Khung giờ điểm tâm Hải Châu, cà phê sáng và buýt DanaBus kết nối liên quận.' };
    } else if (hour >= 11 && hour < 14) {
      return { slot: 'SLOT_LUNCH', label: 'Trưa nay', momentTag: '🍜 BUỔI TRƯA &bull; ẨM THỰC TIẾP SỨC ĐÀ THÀNH', momentDesc: 'Thực đơn trưa văn phòng, đặc sản ẩm thực Hải Châu và các điểm dừng chân tiếp sức.' };
    } else if (hour >= 14 && hour < 18) {
      return { slot: 'SLOT_AFTERNOON', label: 'Chiều nay', momentTag: '☕ BUỔI CHIỀU &bull; KHÔNG GIAN TỰ HỌC & LÀM VIỆC VEN SÔNG', momentDesc: 'Không gian tự học Thư viện KHTH Bạch Đằng, các chương trình hỗ trợ học đường chính thức.' };
    } else {
      return { slot: 'SLOT_EVENING', label: 'Tối nay', momentTag: '✨ BUỔI TỐI &bull; GIẢI TRÍ, VĂN HÓA & DẠO SÔNG HÀN', momentDesc: 'Lịch chiếu rạp CGV, Metiz, dạo mát Cầu Rồng và tham quan Bảo tàng Điêu khắc Chăm.' };
    }
  }

  // RESOLVE HONEST ACTION CONTRACT
  function resolveActionContract(item) {
    let label = item.specific_action_label || 'Xem thông tin chi tiết →';
    let url = item.official_source_url;
    let btnClass = 'btn-action-place';

    if (item.tier_level === 'TIER_1_DEAL') {
      label = '🔥 Nhận ưu đãi / Xem biểu giá →';
      btnClass = 'btn-action-deal';
    } else if (item.tier_level === 'TIER_2_PROGRAMME') {
      label = item.specific_action_label || '🏛️ Mở cổng chính thức →';
      btnClass = 'btn-action-civic';
    } else if (item.tier_level === 'TIER_3_UTILITY') {
      label = item.specific_action_label || '📍 Xem thông tin & Maps →';
      btnClass = 'btn-action-place';
    } else if (item.tier_level === 'TIER_4_RADAR') {
      label = item.specific_action_label || '📡 Theo dõi kênh →';
      btnClass = 'btn-action-radar';
    }

    return { label, url, btnClass };
  }

  // RENDER CARD WITH PROGRESSIVE DISCLOSURE & UNIVERSAL FOCUSABLE TOUCH TARGET $ge 44$px
  function renderRailCard(item) {
    const isSaved = savedItemIds.has(item.item_id);
    const action = resolveActionContract(item);
    const hostname = new URL(item.official_source_url).hostname;

    return `
      <article class="rail-card-cn" data-item-id="${item.item_id}">
        <div class="rail-header-row">
          <span class="${item.tier_badge_class || 'tier-badge-programme'}">${item.tier_badge || item.badge_label}</span>
          <button class="btn-card-save ${isSaved ? 'saved' : ''}" data-save-id="${item.item_id}" aria-label="${isSaved ? 'Đã lưu' : 'Lưu lại ${item.title}'}">
            ${isSaved ? '❤️' : '🤍'}
          </button>
        </div>

        <div class="rail-body rail-card-interactive-body" data-open-drawer="${item.item_id}" role="button" tabindex="0" aria-label="Xem chi tiết ${item.title}">
          <span class="rail-brand">${item.brand}</span>
          <h4 class="rail-title">${item.title}</h4>
          <p class="rail-desc">${item.summary_text}</p>
          
          <div class="rail-meta-clean-row">
            <span class="rail-scope-badge">📍 ${item.scope_text}</span>
            <span class="rail-source-domain">${hostname}</span>
          </div>
        </div>

        <div class="rail-footer-actions-row">
          <a href="${action.url}" target="_blank" rel="noopener noreferrer" class="btn-rail-action ${action.btnClass}" aria-label="${action.label} - mở trong tab mới">
            ${action.label}
          </a>
          <button class="btn-rail-details" data-open-drawer="${item.item_id}" aria-label="Xem chi tiết và căn cứ của ${item.title}">
            ℹ️ Chi tiết
          </button>
          ${item.map_query_url ? `
            <a href="${item.map_query_url}" target="_blank" rel="noopener noreferrer" class="btn-rail-map" aria-label="Xem vị trí ${item.title} trên Google Maps" title="Xem vị trí Maps">
              📍 Maps
            </a>
          ` : ''}
        </div>
      </article>
    `;
  }

  // 1. CURATED LOCAL EDITORIAL SPOTLIGHT CARD (SECTION DQ)
  function renderCuratedSpotlightCard(item, reasonText, iconFallback = '🏛️') {
    const isSaved = savedItemIds.has(item.item_id);
    const action = resolveActionContract(item);

    return `
      <article class="editorial-curated-card" data-item-id="${item.item_id}">
        ${item.visual_asset_url ? `
          <div class="editorial-media-wrapper">
            <img src="${item.visual_asset_url}" alt="${item.title}" class="editorial-media-img" loading="eager" />
            <div class="editorial-media-attribution">${item.visual_attribution}</div>
          </div>
        ` : `
          <div class="editorial-media-wrapper" style="display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, rgba(2,132,199,0.08), rgba(13,148,136,0.12));">
            <span style="font-size: 2.5rem;">${iconFallback}</span>
          </div>
        `}

        <div class="editorial-card-body">
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <span class="editorial-reason-tag">🌟 ${reasonText}</span>
            <button class="btn-card-save ${isSaved ? 'saved' : ''}" data-save-id="${item.item_id}" aria-label="${isSaved ? 'Đã lưu' : 'Lưu lại ${item.title}'}">
              ${isSaved ? '❤️' : '🤍'}
            </button>
          </div>

          <span class="${item.tier_badge_class || 'tier-badge-programme'}" style="margin: 4px 0; align-self: flex-start;">${item.tier_badge}</span>
          <h3 class="editorial-card-title">${item.title}</h3>
          <p class="editorial-card-desc">${item.summary_text}</p>

          <div class="editorial-card-actions">
            <a href="${action.url}" target="_blank" rel="noopener noreferrer" class="btn-rail-action ${action.btnClass}" style="flex-grow: 1; text-align: center; justify-content: center;" aria-label="${action.label} - mở trong tab mới">
              ${action.label}
            </a>
            <button class="btn-rail-details" data-open-drawer="${item.item_id}" aria-label="Xem chi tiết ${item.title}">
              ℹ️ Chi tiết
            </button>
            ${item.map_query_url ? `
              <a href="${item.map_query_url}" target="_blank" rel="noopener noreferrer" class="btn-rail-map" aria-label="Xem vị trí ${item.title} trên Google Maps" title="Xem vị trí Maps">
                📍 Maps
              </a>
            ` : ''}
          </div>
        </div>
      </article>
    `;
  }

  // 2. DAILY DISCOVERY HOME VIEW (SECTION DQ)
  function renderDailyGuideHome() {
    const timeInfo = getCurrentTimeSlotInfo();
    const stats = getJourneyStats(JAYT_DISCOVERY_ITEMS);

    const curatedHighlights = [
      {
        item: JAYT_DISCOVERY_ITEMS.find(i => i.item_id === 'PLACE_PHO_AM_THUC_HUYNH_THUC_KHANG'),
        reason: 'Tuyến phố điểm tâm bản địa Hải Châu',
        iconFallback: '🍜'
      },
      {
        item: JAYT_DISCOVERY_ITEMS.find(i => i.item_id === 'FACILITY_DANABUS'),
        reason: 'Giao thông công cộng trợ giá đô thị',
        iconFallback: '🚌'
      },
      {
        item: JAYT_DISCOVERY_ITEMS.find(i => i.item_id === 'PLACE_BAO_TANG_CHAM'),
        reason: 'Di sản văn hóa cạnh Cầu Rồng',
        iconFallback: '🏛️'
      },
      {
        item: JAYT_DISCOVERY_ITEMS.find(i => i.item_id === 'FACILITY_THU_VIEN_TONG_HOP'),
        reason: 'Không gian tự học công cộng ven sông',
        iconFallback: '📚'
      }
    ].filter(entry => entry.item);

    return `
      <div class="cr-experience-container">
        <!-- MODERN BENTO HERO GRID (DAILY DISCOVERY FIRST FOLD) -->
        <div class="bento-hero-grid" aria-label="Bảng Điều Khiển Khám Phá Hôm Nay">
          <!-- BENTO TILE 1: MAIN STAGE (8 COLUMNS DESKTOP) -->
          <section class="bento-tile-main-stage hero-landmark-cr vivid-dragon-hero-cf" aria-label="Bìa Khám Phá Đà Nẵng">
            <img 
              src="assets/images/dragon_bridge_hero_001.jpg" 
              alt="Toàn cảnh Cầu Rồng và Sông Hàn ban ngày rực rỡ tại trung tâm TP. Đà Nẵng (1200x800px)" 
              class="bento-stage-bg-img hero-landmark-img vivid-hero-image" 
              id="hero-main-photo"
              loading="eager"
            />
            <div class="bento-stage-gradient hero-landmark-gradient"></div>

            <div class="hero-landmark-attribution" role="note" aria-label="Thông tin bản quyền ảnh Cầu Rồng">
              📍 Cầu Rồng (1200x800px) &bull; 📷 Bùi Thụy Đào Nguyên (CC BY-SA 3.0)
            </div>

            <div class="bento-stage-content hero-landmark-content">
              <span class="hero-moment-pill">${timeInfo.momentTag}</span>
              <h1 class="hero-headline-cr vivid-main-title">
                Hôm Nay Khám Phá Gì Ở Đà Nẵng?
              </h1>
              <p class="hero-subhead-cr vivid-subhead">
                Gợi ý điểm đến, tiện ích công cộng và các chương trình học đường chính thức tại Đà Nẵng &mdash; phân loại minh bạch, đối soát nguồn gốc.
              </p>

              <!-- HERO DECISION HIERARCHY (SECTION DQ: STATE-AWARE PRIMARY CTA) -->
              <div class="hero-shopping-actions-grid">
                <button class="btn-hero-primary-solid" data-nav="EXPLORE" data-tier-filter="TIER_2_PROGRAMME" aria-label="Khám phá chương trình và cổng chính thức đang kiểm">
                  🏛️ Khám phá chương trình đang kiểm &rarr;
                </button>
                <button class="btn-hero-secondary-outline" data-nav="WALLET" aria-label="Tra cứu 10 cổng chính thức và 3 kênh theo dõi">
                  🏛️ Tra cứu chương trình (10 Cổng, 3 Kênh) &rarr;
                </button>
                <button class="btn-hero-tertiary-ghost" data-nav="BUY_DECISION" aria-label="Tư vấn minh bạch trước khi mua">
                  🛡️ Tư vấn trước khi mua &rarr;
                </button>
              </div>
            </div>
          </section>

          <!-- BENTO SIDE COLUMN (4 COLUMNS DESKTOP) -->
          <div class="bento-side-column">
            <!-- BENTO TILE 2: MOMENT & TIME-AWARE SELECTOR -->
            <div class="bento-tile-moment">
              <div>
                <div class="bento-moment-header">
                  <span class="bento-moment-badge">⏱️ ${timeInfo.label}</span>
                  <span class="bento-moment-weather">🌤️ 28°C Ven Sông</span>
                </div>
                <h3 style="font-size: 1.05rem; font-weight: 700; margin-bottom: 4px;">Nhịp Sống Đà Thành</h3>
                <p style="font-size: 0.8rem; color: var(--text-secondary); line-height: 1.4;">
                  ${timeInfo.momentDesc}
                </p>
              </div>
              <div class="bento-moment-chips">
                <button class="bento-chip-btn ${activeMealMoment === 'ALL' ? 'active' : ''}" data-nav="FOOD_JOURNEY" data-meal-moment="ALL" aria-label="Tất cả bữa ăn">Tất cả</button>
                <button class="bento-chip-btn ${activeMealMoment === 'SANG' ? 'active' : ''}" data-nav="FOOD_JOURNEY" data-meal-moment="SANG" aria-label="Buổi sáng">🌅 Sáng</button>
                <button class="bento-chip-btn ${activeMealMoment === 'TRUA' ? 'active' : ''}" data-nav="FOOD_JOURNEY" data-meal-moment="TRUA" aria-label="Buổi trưa">🍜 Trưa</button>
                <button class="bento-chip-btn ${activeMealMoment === 'CHIEU' ? 'active' : ''}" data-nav="FOOD_JOURNEY" data-meal-moment="CHIEU" aria-label="Buổi chiều">☕ Chiều</button>
                <button class="bento-chip-btn ${activeMealMoment === 'TOI' ? 'active' : ''}" data-nav="LEISURE_JOURNEY" data-meal-moment="TOI" aria-label="Buổi tối">✨ Tối</button>
              </div>
            </div>

            <!-- BENTO TILE 3: QUICK DOCK -->
            <div class="bento-tile-dock">
              <div>
                <span class="dock-badge">⚡ TRUY CẬP NHANH</span>
                <h3 style="font-size: 1.05rem; font-weight: 700; margin: 4px 0;">Cổng Quyền Lợi & Danh Sách</h3>
              </div>
              <div class="bento-dock-row">
                <button class="bento-dock-btn" data-nav="WALLET" aria-label="Mở cổng chương trình chính thức 13 mục">
                  <span class="bento-dock-icon">🏛️</span>
                  <span>Chương Trình (13)</span>
                </button>
                <button class="bento-dock-btn" data-nav="SAVED" aria-label="Mở danh sách đã lưu">
                  <span class="bento-dock-icon">❤️</span>
                  <span>Đã lưu (<span class="saved-dock-count">${savedItemIds.size}</span>)</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- 2. QUICK DISCOVERY CATEGORIES STRIP (SECTION DQ: SINGLE SOURCE OF COUNT INVARIANT) -->
        <div class="journey-category-strip" role="region" aria-label="Lối Tắt Khám Phá Theo Nhu Cầu">
          <a href="#featured-deals-section" class="journey-cat-card" data-nav="FOOD_JOURNEY" aria-label="Khám phá Ẩm thực bản địa">
            <span class="journey-cat-icon">🍔</span>
            <div class="journey-cat-title">Ẩm Thực Bản Địa</div>
            <div class="journey-cat-count">${stats.labels.an_gi}</div>
          </a>
          <a href="#featured-deals-section" class="journey-cat-card" data-nav="LEISURE_JOURNEY" aria-label="Khám phá Đi chơi và Văn hóa">
            <span class="journey-cat-icon">🎬</span>
            <div class="journey-cat-title">Đi Chơi & Văn Hóa</div>
            <div class="journey-cat-count">${stats.labels.di_dau}</div>
          </a>
          <a href="#featured-deals-section" class="journey-cat-card" data-nav="EXPLORE" data-tier-filter="TIER_3_UTILITY" aria-label="Khám phá Tiện ích công cộng">
            <span class="journey-cat-icon">🚌</span>
            <div class="journey-cat-title">Tiện Ích & Buýt Đô Thị</div>
            <div class="journey-cat-count">${stats.labels.tien_ich}</div>
          </a>
          <a href="#featured-deals-section" class="journey-cat-card" data-nav="EXPLORE" data-tier-filter="TIER_2_PROGRAMME" aria-label="Khám phá Học tập và Chương trình chính thức">
            <span class="journey-cat-icon">🎓</span>
            <div class="journey-cat-title">Chính Sách & Học Đường</div>
            <div class="journey-cat-count">${stats.labels.mua_sam_hoc_tap}</div>
          </a>
        </div>

        <!-- 3. COMPACT CIVIC TICKER (NEUTRAL VERIFIED FALLBACK) -->
        <section class="civic-ticker-cr hero-civic-note-cf" role="region" aria-label="Thông Tin Đô Thị Hiện Hành">
          <span class="civic-ticker-icon">📍</span>
          <div class="civic-ticker-text">
            <strong>Cầu Rồng Sông Hàn:</strong> Xem thông tin điểm đến và thông báo hiện hành tại cổng chính thức danang.gov.vn.
          </div>
          <a href="https://danang.gov.vn" target="_blank" rel="noopener noreferrer" class="civic-ticker-link" aria-label="Xem cổng thông tin chính quyền Thành phố Đà Nẵng danang.gov.vn">
            danang.gov.vn &rarr;
          </a>
        </section>

        <!-- 4. RAIL 1: EDITORIAL CURATED SPOTLIGHTS (SECTION DQ: GENUINE EDITORIAL SELECTION) -->
        <section id="featured-deals-section" aria-label="Tuyển Chọn Nổi Bật Hôm Nay">
          <div class="section-flow-header">
            <div>
              <span class="discovery-section-kicker">TUYỂN CHỌN HÔM NAY</span>
              <h2 class="section-flow-title">🌟 Điểm Hẹn & Tiện Ích Bản Địa Nổi Bật</h2>
              <p class="section-flow-subtitle">4 không gian và tiện ích tiêu biểu của thành phố &mdash; dẫn nguồn và điều kiện trực tiếp từ đơn vị chủ quản.</p>
            </div>
            <button class="section-flow-viewall" data-nav="EXPLORE" aria-label="Xem toàn bộ 50 mục tiện ích">
              Xem toàn bộ 50 mục &rarr;
            </button>
          </div>

          <div class="editorial-curated-grid">
            ${curatedHighlights.map(c => renderCuratedSpotlightCard(c.item, c.reason, c.iconFallback)).join('')}
          </div>
        </section>

        <!-- 5. RAIL 2: CỔNG THÔNG TIN & CHƯƠNG TRÌNH HỌC ĐƯỜNG (SECTION DQ) -->
        <section aria-label="Chương Trình & Quyền Lợi Chính Thống">
          <div class="section-flow-header">
            <div>
              <span class="discovery-section-kicker">QUYỀN LỢI & CHÍNH SÁCH</span>
              <h2 class="section-flow-title">🏛️ Cổng Chương Trình & Quyền Lợi Chính Thống (13 Mục)</h2>
              <p class="section-flow-subtitle">10 Cổng thông tin chính thức của đơn vị phát hành và 3 Kênh theo dõi nguồn tin &mdash; đối soát minh bạch.</p>
            </div>
            <button class="section-flow-viewall" data-nav="WALLET" aria-label="Xem danh sách 13 cổng">
              Xem toàn bộ 13 cổng &rarr;
            </button>
          </div>

          <div class="cards-layout-grid">
            ${JAYT_WALLET_ENTRIES.slice(0, 3).map(e => renderOfficialValueCard(e)).join('')}
          </div>
        </section>

        <!-- 6. RAIL 3: UTILITY DOCK -->
        <section class="dock-tiles-grid-cr" aria-label="Cổng Tiện Ích">
          <div class="dock-tile-cr" data-nav="BUY_DECISION" role="button" tabindex="0" aria-label="Tra cứu Tư vấn trước khi mua">
            <span class="dock-badge">🛡️ TƯ VẤN TIÊU DÙNG MINH BẠCH</span>
            <h3 class="dock-title">Mua món này có hời không?</h3>
            <p class="dock-desc">Đối soát giá niêm yết chính hãng, điều kiện phụ phí ẩn và chính sách đổi trả trước khi thanh toán tại Đà Nẵng.</p>
            <span class="dock-action-link">Tra cứu đối soát giá thực &rarr;</span>
          </div>

          <div class="dock-tile-cr" data-nav="WALLET" role="button" tabindex="0" aria-label="Mở cổng chương trình chính thức">
            <span class="dock-badge">🏛️ CỔNG CHƯƠNG TRÌNH CHÍNH THỨC</span>
            <h3 class="dock-title">Cổng Quyền Lợi & Chính Sách Học Đường</h3>
            <p class="dock-desc">10 Cổng thông tin chính thức và 3 Kênh theo dõi nguồn tin. Kiểm tra điều kiện áp dụng tại đơn vị chủ quản.</p>
            <span class="dock-action-link">Mở cổng tra cứu chính thức &rarr;</span>
          </div>
        </section>
      </div>
    `;
  }

  // 3. CLOSED-LOOP JOURNEY 1: ĂN GÌ GẦN ĐÂY
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
          <button class="btn-story-secondary" data-nav="HOME" aria-label="Quay lại Trang Chủ">&larr; Quay lại Trang Chủ</button>
          <span class="story-kicker">🍜 HÀNH TRÌNH 1 &bull; ẨM THỰC BẢN ĐỊA (${foodItems.length} MỤC)</span>
        </div>

        <div style="background: var(--bg-card); padding: 20px; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
          <h1 style="font-size: 1.6rem; font-weight: 800; margin-bottom: 8px;">Ăn Gì Gần Bạn & Hương Vị Đà Thành</h1>
          <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 16px;">
            Hiển thị chính xác ${foodItems.length} địa điểm ẩm thực dẫn nguồn từ danh mục chính thức.
          </p>

          <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 12px;">
            <button class="nav-btn ${activeMealMoment === 'ALL' ? 'active' : ''}" data-meal-moment="ALL" aria-label="Tất cả bữa">Tất cả bữa</button>
            <button class="nav-btn ${activeMealMoment === 'SANG' ? 'active' : ''}" data-meal-moment="SANG" aria-label="Điểm tâm sáng">🌅 Điểm tâm sáng</button>
            <button class="nav-btn ${activeMealMoment === 'TRUA' ? 'active' : ''}" data-meal-moment="TRUA" aria-label="Bữa trưa">🍜 Bữa trưa</button>
            <button class="nav-btn ${activeMealMoment === 'CHIEU' ? 'active' : ''}" data-meal-moment="CHIEU" aria-label="Cà phê, trà">☕ Cà phê / Trà</button>
            <button class="nav-btn ${activeMealMoment === 'TOI' ? 'active' : ''}" data-meal-moment="TOI" aria-label="Bữa tối">🍲 Bữa tối / Ăn đêm</button>
          </div>

          <div style="display: flex; gap: 6px; flex-wrap: wrap;">
            <button class="nav-btn ${activeLocality === 'ALL' ? 'active' : ''}" data-food-loc="ALL" aria-label="Toàn thành phố">Toàn thành phố</button>
            <button class="nav-btn ${activeLocality === 'HAI_CHAU' ? 'active' : ''}" data-food-loc="HAI_CHAU" aria-label="Quận Hải Châu">Hải Châu</button>
            <button class="nav-btn ${activeLocality === 'SON_TRA' ? 'active' : ''}" data-food-loc="SON_TRA" aria-label="Quận Sơn Trà">Sơn Trà</button>
            <button class="nav-btn ${activeLocality === 'THANH_KHE' ? 'active' : ''}" data-food-loc="THANH_KHE" aria-label="Quận Thanh Khê">Thanh Khê</button>
            <button class="nav-btn ${activeLocality === 'NGU_HANH_SON' ? 'active' : ''}" data-food-loc="NGU_HANH_SON" aria-label="Quận Ngũ Hành Sơn">Ngũ Hành Sơn</button>
            <button class="nav-btn ${activeLocality === 'LIEN_CHIEU' ? 'active' : ''}" data-food-loc="LIEN_CHIEU" aria-label="Quận Liên Chiểu">Liên Chiểu</button>
          </div>
        </div>

        <div style="font-size: 0.85rem; color: var(--text-muted); margin: 8px 0;" aria-live="polite">
          Đang hiển thị <strong>${filtered.length}</strong> / ${foodItems.length} địa điểm ẩm thực
        </div>

        <div class="cards-layout-grid">
          ${filtered.map(item => renderRailCard(item)).join('')}
        </div>
      </div>
    `;
  }

  // 4. CLOSED-LOOP JOURNEY 2: ĐI ĐÂU TỐI NAY
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
          <button class="btn-story-secondary" data-nav="HOME" aria-label="Quay lại Trang Chủ">&larr; Quay lại Trang Chủ</button>
          <span class="story-kicker">✨ HÀNH TRÌNH 2 &bull; GIẢI TRÍ & VĂN HÓA (${leisureItems.length} MỤC)</span>
        </div>

        <div style="background: var(--bg-card); padding: 20px; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
          <h1 style="font-size: 1.6rem; font-weight: 800; margin-bottom: 8px;">Đi Đâu Tối Nay Tại Đà Nẵng?</h1>
          <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 16px;">
            Hiển thị chính xác ${leisureItems.length} điểm tham quan, văn hóa và rạp chiếu phim dẫn nguồn chính thức.
          </p>

          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <button class="nav-btn ${activeLeisureCategory === 'ALL' ? 'active' : ''}" data-leisure-cat="ALL" aria-label="Tất cả địa điểm">Tất cả</button>
            <button class="nav-btn ${activeLeisureCategory === 'CINEMA' ? 'active' : ''}" data-leisure-cat="CINEMA" aria-label="Rạp chiếu phim">🎬 Rạp chiếu phim</button>
            <button class="nav-btn ${activeLeisureCategory === 'HERITAGE' ? 'active' : ''}" data-leisure-cat="HERITAGE" aria-label="Văn hóa và Di sản">🏛️ Văn hóa & Di sản</button>
            <button class="nav-btn ${activeLeisureCategory === 'RIVERSIDE' ? 'active' : ''}" data-leisure-cat="RIVERSIDE" aria-label="Dạo Sông Hàn & Cầu Rồng">🌉 Dạo Sông Hàn & Cầu Rồng</button>
          </div>
        </div>

        <div style="font-size: 0.85rem; color: var(--text-muted); margin: 8px 0;" aria-live="polite">
          Đang hiển thị <strong>${filtered.length}</strong> / ${leisureItems.length} điểm giải trí
        </div>

        <div class="cards-layout-grid">
          ${filtered.map(item => renderRailCard(item)).join('')}
        </div>
      </div>
    `;
  }

  // 5. OFFICIAL PROGRAMMES & PORTALS VIEW (SECTION DQ)
  function renderOfficialValueCard(entry) {
    let laneBadgeClass = 'lane-badge-official';
    if (entry.lane === 'LANE_THEO_DOI') laneBadgeClass = 'lane-badge-radar';

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
            <span class="q-label">👥 Đối tượng:</span>
            <p class="q-answer">${entry.target_audience}</p>
          </div>
          <div class="value-question-row">
            <span class="q-label">🌐 Cổng thông tin:</span>
            <p class="q-answer">${entry.official_portal_guide}</p>
          </div>
        </div>

        <div class="value-card-footer">
          <a href="${entry.official_source_url}" target="_blank" rel="noopener noreferrer" class="btn-value-action btn-action-source" aria-label="${entry.action_button_label} - mở trong tab mới">
            ${entry.action_button_label}
          </a>
          <button class="btn-save-wallet" data-save-voucher="${entry.entry_id}" aria-label="Lưu ${entry.title} để tra cứu sau">
            🤍 Lưu
          </button>
        </div>

        <div class="value-card-attestation">
          <span>${entry.evidence_status}</span>
        </div>
      </article>
    `;
  }

  function renderThreeLaneWalletView() {
    const filteredEntries = JAYT_WALLET_ENTRIES.filter(e => {
      if (activeWalletLane !== 'ALL' && e.lane !== activeWalletLane) return false;
      return true;
    });

    const congChinhThucCount = JAYT_WALLET_ENTRIES.filter(e => e.lane === 'LANE_CONG_CHINH_THUC').length;
    const theoDoiCount = JAYT_WALLET_ENTRIES.filter(e => e.lane === 'LANE_THEO_DOI').length;

    return `
      <div class="cr-experience-container">
        <div class="civic-ticker-cr">
          <span class="story-kicker">🏛️ CỔNG CHƯƠNG TRÌNH & QUYỀN LỢI CHÍNH THỐNG</span>
        </div>

        <div style="background: var(--bg-card); padding: 20px; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
          <h1 style="font-size: 1.6rem; font-weight: 800; margin-bottom: 8px;">Tra Cứu Chương Trình Chính Thống Tại Đà Nẵng</h1>
          <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 16px;">
            13 chính sách học đường và đô thị đã phân loại: 10 Cổng thông tin chính thức và 3 Kênh theo dõi nguồn tin. Kiểm tra điều kiện áp dụng tại đơn vị cung cấp.
          </p>

          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <button class="nav-btn ${activeWalletLane === 'ALL' ? 'active' : ''}" data-lane-filter="ALL" aria-label="Tất cả 13 mục">Tất cả (13)</button>
            <button class="nav-btn ${activeWalletLane === 'LANE_CONG_CHINH_THUC' ? 'active' : ''}" data-lane-filter="LANE_CONG_CHINH_THUC" aria-label="Cổng chính thức">🏛️ Cổng chính thức (${congChinhThucCount})</button>
            <button class="nav-btn ${activeWalletLane === 'LANE_THEO_DOI' ? 'active' : ''}" data-lane-filter="LANE_THEO_DOI" aria-label="Kênh theo dõi">📡 Kênh theo dõi (${theoDoiCount})</button>
          </div>
        </div>

        <div class="cards-layout-grid">
          ${filteredEntries.map(e => renderOfficialValueCard(e)).join('')}
        </div>
      </div>
    `;
  }

  // 6. EXPLORE DIRECTORY VIEW
  function renderExploreDirectory() {
    const filtered = filterDirectoryItems();

    const tier1Count = JAYT_DISCOVERY_ITEMS.filter(i => i.tier_level === 'TIER_1_DEAL').length;
    const tier2Count = JAYT_DISCOVERY_ITEMS.filter(i => i.tier_level === 'TIER_2_PROGRAMME').length;
    const tier3Count = JAYT_DISCOVERY_ITEMS.filter(i => i.tier_level === 'TIER_3_UTILITY').length;
    const tier4Count = JAYT_DISCOVERY_ITEMS.filter(i => i.tier_level === 'TIER_4_RADAR').length;

    return `
      <div class="cr-experience-container">
        <div class="civic-ticker-cr">
          <span class="story-kicker">📚 THƯ MỤC KHÁM PHÁ TP. ĐÀ NẴNG (50 MỤC ĐÃ PHÂN TẦNG)</span>
        </div>

        <div style="background: var(--bg-card); padding: 20px; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
          <h1 style="font-size: 1.6rem; font-weight: 800; margin-bottom: 8px;">Khám Phá Toàn Diện (50 Mục Đã Phân Tầng)</h1>
          <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 16px;">
            Bộ sưu tập 50 tiện ích và cổng chính thức tại TP. Đà Nẵng. Toàn bộ chương trình được dẫn nguồn trực tiếp từ đơn vị chủ quản.
          </p>

          <!-- 4 TIERS FILTER -->
          <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 12px;">
            <button class="nav-btn ${activeTier === 'ALL' ? 'active' : ''}" data-exp-tier="ALL" aria-label="Tất cả 50 mục">Tất cả (50)</button>
            <button class="nav-btn ${activeTier === 'TIER_1_DEAL' ? 'active' : ''}" data-exp-tier="TIER_1_DEAL" aria-label="Deal xác minh">🔥 Deal xác minh (${tier1Count})</button>
            <button class="nav-btn ${activeTier === 'TIER_2_PROGRAMME' ? 'active' : ''}" data-exp-tier="TIER_2_PROGRAMME" aria-label="Cổng chính thức">🏛️ Cổng chính thức (${tier2Count})</button>
            <button class="nav-btn ${activeTier === 'TIER_3_UTILITY' ? 'active' : ''}" data-exp-tier="TIER_3_UTILITY" aria-label="Tiện ích công cộng">📍 Tiện ích công cộng (${tier3Count})</button>
            <button class="nav-btn ${activeTier === 'TIER_4_RADAR' ? 'active' : ''}" data-exp-tier="TIER_4_RADAR" aria-label="Radar theo dõi">📡 Radar (${tier4Count})</button>
          </div>

          <!-- GATEWAYS FILTER -->
          <div style="display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 12px;">
            <button class="nav-btn ${activeGateway === 'ALL' ? 'active' : ''}" data-exp-gw="ALL" aria-label="Tất cả ngành hàng">Tất cả ngành hàng</button>
            <button class="nav-btn ${activeGateway === 'AN_GI' ? 'active' : ''}" data-exp-gw="AN_GI" aria-label="Ngành Ăn gì">🍔 Ăn gì</button>
            <button class="nav-btn ${activeGateway === 'DI_DAU' ? 'active' : ''}" data-exp-gw="DI_DAU" aria-label="Ngành Đi đâu">🎬 Đi đâu</button>
            <button class="nav-btn ${activeGateway === 'MUA_SAM' ? 'active' : ''}" data-exp-gw="MUA_SAM" aria-label="Mua sắm và học tập">🛍️ Mua sắm & Học tập</button>
          </div>

          <!-- LOCALITY FILTER -->
          <div style="display: flex; gap: 6px; flex-wrap: wrap;">
            <button class="nav-btn ${activeLocality === 'ALL' ? 'active' : ''}" data-exp-loc="ALL" aria-label="Toàn thành phố">Toàn thành phố</button>
            <button class="nav-btn ${activeLocality === 'HAI_CHAU' ? 'active' : ''}" data-exp-loc="HAI_CHAU" aria-label="Hải Châu">Hải Châu</button>
            <button class="nav-btn ${activeLocality === 'SON_TRA' ? 'active' : ''}" data-exp-loc="SON_TRA" aria-label="Sơn Trà">Sơn Trà</button>
            <button class="nav-btn ${activeLocality === 'THANH_KHE' ? 'active' : ''}" data-exp-loc="THANH_KHE" aria-label="Thanh Khê">Thanh Khê</button>
            <button class="nav-btn ${activeLocality === 'NGU_HANH_SON' ? 'active' : ''}" data-exp-loc="NGU_HANH_SON" aria-label="Ngũ Hành Sơn">Ngũ Hành Sơn</button>
            <button class="nav-btn ${activeLocality === 'LIEN_CHIEU' ? 'active' : ''}" data-exp-loc="LIEN_CHIEU" aria-label="Liên Chiểu">Liên Chiểu</button>
          </div>
        </div>

        <div style="font-size: 0.85rem; color: var(--text-muted); margin: 8px 0;" aria-live="polite">
          Đang hiển thị <strong>${filtered.length}</strong> / 50 mục đã phân tầng
        </div>

        ${filtered.length > 0 
          ? `
            <div class="cards-layout-grid">
              ${filtered.map(item => renderRailCard(item)).join('')}
            </div>
          `
          : `
            <div style="text-align: center; padding: 48px 16px; background: var(--bg-card); border-radius: var(--radius-md); border: 1px solid var(--border-color);" role="status">
              <div style="font-size: 2rem; margin-bottom: 8px;">🛡️</div>
              <h3>Đang đối soát dữ liệu deal giá thực</h3>
              <p style="color: var(--text-muted); font-size: 0.9rem; margin-top: 4px;">
                Danh mục Deal T1 tuân thủ nghiêm ngặt chuẩn đối soát chứng thực giá thực và điều kiện niêm yết trước khi kích hoạt.
              </p>
            </div>
          `
        }
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

  // 7. BUY DECISION HUB VIEW
  function renderBuyDecisionHub() {
    return `
      <div class="cr-experience-container">
        <div class="civic-ticker-cr">
          <span class="story-kicker">🛡️ CỔNG TƯ VẤN TIÊU DÙNG MINH BẠCH</span>
        </div>

        <div style="background: var(--bg-card); padding: 20px; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
          <h1 style="font-size: 1.6rem; font-weight: 800; margin-bottom: 8px;">Mua Món Này Có Hời Không?</h1>
          <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 16px;">
            Tra cứu giá thực, điều kiện ẩn và quyền lợi trước khi thanh toán tại Đà Nẵng. Mặc định kết luận minh bạch theo dữ liệu đối soát.
          </p>

          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <input type="text" id="input-check-deal" placeholder="Nhập tên món hàng, đường link hoặc cửa hàng..." style="flex-grow: 1; min-height: 44px; padding: 10px 14px; border: 1px solid var(--border-color); border-radius: 8px; font-size: 0.9rem;" aria-label="Tên món hàng hoặc cửa hàng cần kiểm tra" />
            <button id="btn-submit-check" class="btn-modal-primary" style="min-height: 44px; padding: 10px 20px;">Kiểm Tra Ngay</button>
          </div>

          <div id="decision-result-container" style="display: none; margin-top: 16px; padding: 16px; background: var(--bg-card-subtle); border-radius: 8px;" role="status" aria-live="polite"></div>
        </div>
      </div>
    `;
  }

  // 8. SAVED VIEW
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
            <div style="text-align: center; padding: 48px 16px; background: var(--bg-card); border-radius: var(--radius-md); border: 1px solid var(--border-color);" role="status">
              <div style="font-size: 2rem; margin-bottom: 8px;">🤍</div>
              <h3>Bạn chưa lưu địa điểm nào</h3>
              <p style="color: var(--text-muted); font-size: 0.9rem; margin-top: 4px;">Bấm biểu tượng trái tim trên các thẻ tiện ích để lưu lại.</p>
            </div>
          `
        }
      </div>
    `;
  }

  // 9. PROGRESSIVE DISCLOSURE DETAIL DRAWER WITH FULL TAB-CYCLE FOCUS TRAP (SECTION DQ)
  function openItemDrawer(itemId, triggerEl) {
    const item = JAYT_DISCOVERY_ITEMS.find(i => i.item_id === itemId);
    if (!item) return;

    activeDrawerItem = item;
    modalTriggerElement = triggerEl || null;

    const drawerRoot = document.getElementById('jayt-drawer-root');
    if (!drawerRoot) return;

    const action = resolveActionContract(item);
    const hostname = new URL(item.official_source_url).hostname;

    drawerRoot.innerHTML = `
      <div class="jayt-drawer-backdrop" id="drawer-backdrop">
        <div class="jayt-drawer-box" role="dialog" aria-modal="true" aria-labelledby="drawer-item-title" aria-describedby="drawer-item-desc">
          <div class="drawer-header">
            <div>
              <span class="${item.tier_badge_class || 'tier-badge-programme'}">${item.tier_badge}</span>
              <h2 id="drawer-item-title" class="drawer-title">${item.title}</h2>
              <span style="font-size: 0.85rem; color: var(--text-secondary); font-weight: 600;">${item.brand}</span>
            </div>
            <button class="drawer-close-btn" id="btn-close-drawer" aria-label="Đóng bảng chi tiết ${item.title}">&times;</button>
          </div>

          <div class="drawer-body" id="drawer-item-desc">
            <div class="drawer-section-card">
              <div class="drawer-section-title">📖 Tóm Tắt & Giới Thiệu</div>
              <p style="font-size: 0.92rem; line-height: 1.5; color: var(--text-primary);">
                ${item.curation_story || item.summary_text}
              </p>
            </div>

            <div class="drawer-section-card">
              <div class="drawer-section-title">📍 Vị Trí & Phạm Vi Áp Dụng</div>
              <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.4;">
                • Khu vực: <strong>${item.scope_text}</strong><br>
                ${item.transit_hint ? `• Gợi ý di chuyển: <strong>${item.transit_hint}</strong>` : ''}
              </p>
            </div>

            <div class="drawer-section-card">
              <div class="drawer-section-title">🔍 Bằng Chứng Nguồn Tin & Đối Soát Thực Tế (Section DW)</div>
              <div style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.45;">
                <div style="margin-bottom: 6px;">
                  <span style="color: #059669; font-weight: 600;">✓ Đã xác nhận từ nguồn:</span> Cổng thông tin chính thức <a href="${item.official_source_url}" target="_blank" rel="noopener noreferrer" style="color: var(--teal-primary); font-weight: 600; word-break: break-all;" aria-label="Mở trang chính thức của ${hostname}">${hostname}</a> &bull; Phạm vi: <strong>${item.scope_text}</strong>
                </div>
                <div style="margin-bottom: 6px;">
                  <span style="color: #d97706; font-weight: 600;">⚠️ Chưa có dữ liệu điều kiện:</span> Biểu phí phụ thu, chính sách thẻ/vé cụ thể & ưu đãi theo ngày — vui lòng bấm nút mở cổng chính thức bên dưới để đối soát trực tiếp trước khi giao dịch.
                </div>
                <div style="font-size: 0.78rem; color: var(--text-muted);">
                  🛡️ Phân loại: ${item.evidence_status} &bull; Cam kết Zero-PII bảo vệ người dùng.
                </div>
              </div>
            </div>
          </div>

          <div class="drawer-footer">
            <a href="${action.url}" target="_blank" rel="noopener noreferrer" class="btn-rail-action ${action.btnClass}" style="flex-grow: 1; text-align: center; justify-content: center; min-height: 44px;" aria-label="${action.label} - mở trong tab mới">
              ${action.label}
            </a>
            ${item.map_query_url ? `
              <a href="${item.map_query_url}" target="_blank" rel="noopener noreferrer" class="btn-rail-map" style="min-height: 44px; display: inline-flex; align-items: center;" aria-label="Mở vị trí ${item.title} trên Google Maps" title="Xem vị trí Maps">
                📍 Maps
              </a>
            ` : ''}
          </div>
        </div>
      </div>
    `;

    drawerRoot.hidden = false;
    drawerRoot.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Lock body scroll

    const backdrop = document.getElementById('drawer-backdrop');
    if (backdrop) {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) closeDrawer();
      });
    }

    const closeBtn = document.getElementById('btn-close-drawer');
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

    // Full Tab-Cycle Focus Trap within Drawer
    drawerRoot.onkeydown = (e) => {
      if (e.key === 'Tab') {
        const focusableEls = Array.from(drawerRoot.querySelectorAll('button, a, input, [tabindex]:not([tabindex="-1"])'))
          .filter(el => el.offsetWidth > 0 && el.offsetHeight > 0);
        
        if (focusableEls.length === 0) return;
        const firstEl = focusableEls[0];
        const lastEl = focusableEls[focusableEls.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstEl || !drawerRoot.contains(document.activeElement)) {
            lastEl.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastEl || !drawerRoot.contains(document.activeElement)) {
            firstEl.focus();
            e.preventDefault();
          }
        }
      }
    };

    if (closeBtn) closeBtn.focus();
  }

  function closeDrawer() {
    const drawerRoot = document.getElementById('jayt-drawer-root');
    if (!drawerRoot) return;

    drawerRoot.hidden = true;
    drawerRoot.style.display = 'none';
    drawerRoot.innerHTML = '';
    document.body.style.overflow = ''; // Unlock scroll

    if (modalTriggerElement && typeof modalTriggerElement.focus === 'function') {
      modalTriggerElement.focus();
      modalTriggerElement = null;
    }
  }

  // 10. APP SHELL & NAVIGATION
  function renderAppShell() {
    if (typeof document === 'undefined') return;
    const root = document.getElementById('jayt-app-root');
    if (!root) return;

    root.innerHTML = `
      <div class="jayt-app-shell theme-${currentTheme}">
        <header class="jayt-header-sticky" role="banner">
          <div class="header-inner">
            <div class="brand-lockup" role="button" tabindex="0" data-nav="HOME" aria-label="Về trang chủ JayT Đà Nẵng">
              <svg width="28" height="28" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M19 6 V19 C19 24.5 15.5 28 10 28 C6.5 28 4.2 26 3.5 24 C5.2 24 7 22.8 7.5 20.8 C8 18.5 6.5 16.5 4.5 16.5 C3.8 16.5 3 16.8 2.5 17.2 C3.5 10.5 11 6 19 6 Z" fill="url(#jflow-logo-grad-dw)"/>
                <path d="M19 14 C23.5 14 27.5 17 29.5 21 C31 24 32.5 28 33.5 31 C29.5 29 25 27.5 19 27.5 V21.5 C22 21.5 24.5 23 26 24.5 C24.5 20 20.5 17.5 16 17 L19 14 Z" fill="url(#jflow-logo-grad-dw)" opacity="0.9"/>
                <circle cx="27" cy="8" r="3.5" fill="#f43f5e"/>
                <defs>
                  <linearGradient id="jflow-logo-grad-dw" x1="4" y1="4" x2="34" y2="34" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#0284c7"/>
                    <stop offset="0.6" stop-color="#06b6d4"/>
                    <stop offset="1" stop-color="#f43f5e"/>
                  </linearGradient>
                </defs>
              </svg>
              <div class="brand-text-group">
                <span class="brand-title">JayT Đà Nẵng</span>
                <span class="brand-tagline">Khám Phá Mỗi Ngày &bull; v3.451.0-staging.dw</span>
              </div>
            </div>

            <nav class="nav-links-desktop" role="navigation" aria-label="Điều hướng chính">
              <button class="nav-btn ${activeView === 'HOME' ? 'active' : ''}" data-nav="HOME" aria-label="Mở trang Hôm nay">Hôm nay</button>
              <button class="nav-btn ${activeView === 'EXPLORE' ? 'active' : ''}" data-nav="EXPLORE" aria-label="Khám phá 50 mục">Khám phá (50)</button>
              <button class="nav-btn ${activeView === 'WALLET' ? 'active' : ''}" data-nav="WALLET" aria-label="Mở tra cứu chương trình 13 mục">Chương Trình (13)</button>
              <button class="nav-btn ${activeView === 'BUY_DECISION' ? 'active' : ''}" data-nav="BUY_DECISION" aria-label="Kiểm tra Có hời không">Có Hời Không?</button>
              <button class="nav-btn ${activeView === 'SAVED' ? 'active' : ''}" data-nav="SAVED" aria-label="Xem danh sách đã lưu">
                Đã lưu <span class="nav-saved-count" id="saved-counter">${savedItemIds.size}</span>
              </button>
            </nav>

            <div class="nav-actions-desktop">
              <button id="btn-toggle-theme" class="btn-icon-theme" aria-label="Đổi giao diện Sáng/Tối" title="Đổi giao diện Sáng/Tối">
                ${currentTheme === 'dark' ? '☀️' : '🌙'}
              </button>
              <button id="btn-open-report" class="btn-report-source" aria-haspopup="dialog" aria-label="Đóng góp nguồn hoặc deal mới">+ Báo nguồn</button>
            </div>
          </div>
        </header>

        <main class="jayt-main-canvas" id="jayt-view-canvas" role="main">
          <!-- Views rendered here -->
        </main>

        <footer style="text-align: center; padding: 32px 16px; font-size: 0.8rem; color: var(--text-muted); border-top: 1px solid var(--border-color);" role="contentinfo">
          <div>JayT Đà Nẵng &bull; Chuẩn Tuyển Chọn Bản Địa DQ &bull; v3.451.0-staging.dw</div>
        </footer>

        <nav class="jayt-mobile-bottom-nav" role="navigation" aria-label="Điều hướng di động">
          <button class="mobile-nav-btn ${activeView === 'HOME' ? 'active' : ''}" data-nav="HOME" aria-label="Trang Hôm nay">
            <span class="nav-icon">🔥</span>
            <span class="nav-text">Hôm nay</span>
          </button>
          <button class="mobile-nav-btn ${activeView === 'EXPLORE' ? 'active' : ''}" data-nav="EXPLORE" aria-label="Trang Khám phá">
            <span class="nav-icon">📚</span>
            <span class="nav-text">Khám phá (50)</span>
          </button>
          <button class="mobile-nav-btn ${activeView === 'WALLET' ? 'active' : ''}" data-nav="WALLET" aria-label="Trang Chương trình">
            <span class="nav-icon">🏛️</span>
            <span class="nav-text">Chương Trình</span>
          </button>
          <button class="mobile-nav-btn ${activeView === 'BUY_DECISION' ? 'active' : ''}" data-nav="BUY_DECISION" aria-label="Trang Có Hời Không">
            <span class="nav-icon">🛡️</span>
            <span class="nav-text">Có Hời?</span>
          </button>
          <button class="mobile-nav-btn ${activeView === 'SAVED' ? 'active' : ''}" data-nav="SAVED" aria-label="Trang Đã lưu">
            <span class="nav-icon">❤️</span>
            <span class="nav-text">Đã lưu (<span id="saved-counter-mobile">${savedItemIds.size}</span>)</span>
          </button>
        </nav>

        <div id="jayt-toast" class="jayt-toast" role="alert" aria-live="polite" hidden>
          <span id="toast-message"></span>
        </div>
        <div id="jayt-modal-root" class="jayt-modal-backdrop" hidden style="display: none;"></div>
        <div id="jayt-drawer-root" hidden style="display: none;"></div>
      </div>
    `;

    attachGlobalEvents();
  }

  // 11. VIEW ROUTING DISPATCHER
  function renderCurrentView() {
    if (typeof document === 'undefined') return;
    const canvas = document.getElementById('jayt-view-canvas');
    if (!canvas) return;

    if (activeView === 'HOME') {
      canvas.innerHTML = renderDailyGuideHome();
      attachHomeEvents();
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
    const counterMobile = document.getElementById('saved-counter-mobile');
    if (counterMobile) counterMobile.innerText = savedItemIds.size;
    const counterDock = document.querySelector('.saved-dock-count');
    if (counterDock) counterDock.innerText = savedItemIds.size;
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

  function openModal(htmlContent, triggerEl) {
    const modalRoot = document.getElementById('jayt-modal-root');
    if (!modalRoot) return;
    modalTriggerElement = triggerEl || null;

    modalRoot.innerHTML = htmlContent;
    modalRoot.hidden = false;
    modalRoot.classList.add('is-open');
    modalRoot.style.display = 'flex';
    document.body.style.overflow = 'hidden';

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
    document.body.style.overflow = '';

    if (modalTriggerElement && typeof modalTriggerElement.focus === 'function') {
      modalTriggerElement.focus();
      modalTriggerElement = null;
    }
  }

  function attachGlobalEvents() {
    if (typeof document === 'undefined') return;

    document.querySelectorAll('[data-nav]').forEach(el => {
      const handler = (e) => {
        if (e) e.preventDefault();
        activeView = el.dataset.nav;
        window.activeView = el.dataset.nav;
        if (el.dataset.tierFilter) {
          activeTier = el.dataset.tierFilter;
          window.activeTier = el.dataset.tierFilter;
        }
        document.querySelectorAll('.nav-btn, .mobile-nav-btn').forEach(btn => {
          btn.classList.toggle('active', btn.dataset.nav === activeView);
        });
        renderCurrentView();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      };
      el.onclick = handler;
      el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { handler(e); }
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const drawerRoot = document.getElementById('jayt-drawer-root');
        if (drawerRoot && !drawerRoot.hidden) {
          closeDrawer();
          return;
        }
        const modalRoot = document.getElementById('jayt-modal-root');
        if (modalRoot && !modalRoot.hidden) {
          closeModal();
        }
      }
    });

    const themeBtn = document.getElementById('btn-toggle-theme');
    if (themeBtn) {
      themeBtn.onclick = () => {
        currentTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', currentTheme);
        try {
          if (typeof localStorage !== 'undefined') localStorage.setItem('jayt_theme_mode', currentTheme);
        } catch (e) {}
        renderAppShell();
        renderCurrentView();
        showToast(`Đã chuyển sang giao diện ${currentTheme === 'dark' ? 'Tối' : 'Sáng'}`);
      };
    }

    const reportBtn = document.getElementById('btn-open-report');
    if (reportBtn) {
      reportBtn.onclick = () => {
        const modalHtml = `
          <div class="jayt-modal-box" role="dialog" aria-modal="true" aria-labelledby="report-modal-title">
            <div class="modal-header">
              <div>
                <span class="modal-kicker kicker-fac">CỘNG ĐỒNG ĐÓNG GÓP TIỆN ÍCH</span>
                <h2 id="report-modal-title" class="modal-title">+ Báo Nguồn / Deal Mới</h2>
              </div>
              <button class="modal-close-btn" aria-label="Đóng hộp thoại đóng góp nguồn" id="btn-close-modal">&times;</button>
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
                style="width: 100%; min-height: 44px; padding: 10px; margin: 8px 0; border: 1px solid var(--border-color); border-radius: 8px; font-size: 0.9rem;" 
                aria-label="Tên đơn vị hoặc liên kết nguồn"
              />
              <div id="report-error-msg" style="display: none; color: #dc2626; font-size: 0.8rem; margin-bottom: 8px;" role="alert"></div>
              <button class="btn-modal-primary" id="btn-submit-report" style="width: 100%; min-height: 44px; margin-top: 4px;">Gửi Đóng Góp</button>
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
      };
    }
  }

  function attachHomeEvents() {
    document.querySelectorAll('[data-tier-filter]').forEach(btn => {
      btn.onclick = () => {
        activeView = 'EXPLORE';
        window.activeView = 'EXPLORE';
        activeTier = btn.dataset.tierFilter;
        window.activeTier = btn.dataset.tierFilter;
        document.querySelectorAll('.nav-btn, .mobile-nav-btn').forEach(b => {
          b.classList.toggle('active', b.dataset.nav === 'EXPLORE');
        });
        renderCurrentView();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      };
    });
  }

  function attachFoodJourneyEvents() {
    document.querySelectorAll('[data-meal-moment]').forEach(btn => {
      btn.onclick = () => {
        activeMealMoment = btn.dataset.mealMoment;
        renderCurrentView();
      };
    });

    document.querySelectorAll('[data-food-loc]').forEach(btn => {
      btn.onclick = () => {
        activeLocality = btn.dataset.foodLoc;
        renderCurrentView();
      };
    });
  }

  function attachLeisureJourneyEvents() {
    document.querySelectorAll('[data-leisure-cat]').forEach(btn => {
      btn.onclick = () => {
        activeLeisureCategory = btn.dataset.leisureCat;
        renderCurrentView();
      };
    });
  }

  function attachExploreEvents() {
    document.querySelectorAll('[data-exp-tier]').forEach(btn => {
      btn.onclick = () => {
        activeTier = btn.dataset.expTier;
        window.activeTier = btn.dataset.expTier;
        renderCurrentView();
      };
    });

    document.querySelectorAll('[data-exp-gw]').forEach(btn => {
      btn.onclick = () => {
        activeGateway = btn.dataset.expGw;
        renderCurrentView();
      };
    });

    document.querySelectorAll('[data-exp-loc]').forEach(btn => {
      btn.onclick = () => {
        activeLocality = btn.dataset.expLoc;
        renderCurrentView();
      };
    });
  }

  function attachThreeLaneWalletEvents() {
    document.querySelectorAll('.btn-save-wallet').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        showToast('✓ Đã lưu thông tin vào danh sách');
      };
    });

    document.querySelectorAll('.nav-btn[data-lane-filter]').forEach(btn => {
      btn.onclick = () => {
        activeWalletLane = btn.dataset.laneFilter;
        window.activeWalletLane = btn.dataset.laneFilter;
        renderCurrentView();
      };
    });
  }

  function attachBuyDecisionEvents() {
    const submitBtn = document.getElementById('btn-submit-check');
    const input = document.getElementById('input-check-deal');
    const resultBox = document.getElementById('decision-result-container');

    if (submitBtn && input && resultBox) {
      submitBtn.onclick = () => {
        const val = input.value.trim();
        if (!val) {
          showToast('Vui lòng nhập tên món đồ hoặc đường link để tra cứu.');
          return;
        }

        resultBox.style.display = 'block';
        resultBox.innerHTML = `
          <div style="font-size: 0.95rem; font-weight: 700; color: #d97706; margin-bottom: 8px;">
            ⚠️ Trạng thái: Chưa đủ dữ liệu đối soát giá thực
          </div>
          <div style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5;">
            • Món đồ/dịch vụ "<strong>${val}</strong>" hiện chưa có chứng thực giá niêm yết độc lập.<br>
            • Khuyến nghị: Mở cổng chính thức của đơn vị cung cấp để kiểm tra điều kiện áp dụng và phụ phí trước khi thanh toán.
          </div>
        `;
        showToast('✓ Đã kiểm tra trạng thái đối soát!');
      };
    }
  }

  function attachCardListeners() {
    document.querySelectorAll('[data-save-id]').forEach(btn => {
      btn.onclick = (e) => {
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
      };
    });

    document.querySelectorAll('[data-open-drawer]').forEach(el => {
      el.onclick = (e) => {
        if (e.target.closest('.btn-rail-action') || e.target.closest('.btn-rail-map') || e.target.closest('.btn-card-save')) {
          return;
        }
        const itemId = el.dataset.openDrawer;
        openItemDrawer(itemId, el);
      };
    });
  }

  // 12. INITIALIZATION & CLEAN HYDRATION
  function initJayTApp() {
    if (typeof document === 'undefined') return;
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    const existingHero = document.querySelector('.hero-shopping-actions-grid');
    if (!existingHero) {
      renderAppShell();
      renderCurrentView();
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

  // Expose methods for testing & navigation
  if (typeof window !== 'undefined') {
    window.renderCurrentView = renderCurrentView;
    window.renderAppShell = renderAppShell;
    window.filterDirectoryItems = filterDirectoryItems;
    window.openItemDrawer = openItemDrawer;
    window.closeDrawer = closeDrawer;
    window.computeSingleSourceOfCount = computeSingleSourceOfCount;
    window.getJourneyStats = getJourneyStats;
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      JAYT_STOREFRONT_VERSION: 'v3.451.0-staging.dw',
      JAYT_DISCOVERY_ITEMS,
      JAYT_WALLET_ENTRIES,
      computeSingleSourceOfCount,
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
})();
