/**
 * JAYT STOREFRONT STAGING SOURCE OF TRUTH (SECTION EA)
 * Version: v3.476.0-staging.ev
 * Governing Directive: JAYT-245 Section EV (Lines 3783-3814)
 * Port: 4173
 * Invariant: 100% Disjoint Primary Journey Partition (11 + 14 + 13 + 12 = 50, Intersection = 0)
 * Invariant: 100% Cleansed T2 Copy & Non-Commercial Voucher Hub State (Zero Fake Vouchers, Zero Affiliate Deeplinks)
 * Runtime Ledger Fingerprint: f528c91c579613bded003bd8f1ec24c461f6fcbab705a36ad213c089183c880a
 */
(function(root) {
  'use strict';

  // RUNTIME FINGERPRINT METADATA
  const RUNTIME_FINGERPRINT = {
    ledger_version: 'v3.476.0-staging.ev',
    ledger_sha256: '471d7be127ea7c681fe742e2330ea3e2558ffb1ef2ce5b471d37013ac8602bdc',
    counts: {
      an_gi: 11,
      di_dau: 14,
      tien_ich: 13,
      mua_sam_hoc_tap: 12,
      total_public: 50,
      vouchers: 0
    }
  };

  // 1. PUBLIC STOREFRONT FEED (50 ITEMS LEDGER EA)
  const JAYT_DISCOVERY_ITEMS = [
  {
    "item_id": "DEAL_CGV_CGV_thông tin đồng hành",
    "brand": "CGV Cinemas",
    "title": "CGV Cinemas: Cổng Thông Tin Cụm Rạp Đà Nẵng",
    "summary_text": "Tra cứu thông tin cụm rạp CGV tại Vincom và Vĩnh Trung Plaza Đà Nẵng. JayT chưa đối soát giá vé niêm yết; vui lòng kiểm tra tại nguồn.",
    "curation_story": "Tra cứu thông tin cụm rạp CGV tại Vincom và Vĩnh Trung Plaza Đà Nẵng. JayT chưa đối soát giá vé niêm yết; vui lòng kiểm tra tại nguồn.",
    "scope_text": "CGV Vĩnh Trung Plaza & Vincom Plaza Đà Nẵng",
    "official_source_url": "https://www.cgv.vn",
    "source_domain": "www.cgv.vn",
    "gateway_group": "DI_DAU",
    "primary_journey": "DI_DAU",
    "primary_journey_label": "Đi Chơi & Rạp Chiếu",
    "content_type": "EDUCATION_POLICY",
    "tier_level": "TIER_2_PROGRAMME",
    "tier_badge": "🏛️ CỔNG CHÍNH THỨC",
    "tier_badge_class": "tier-badge-programme",
    "copy_schema_level": "PORTAL_IDENTITY_VERIFIED",
    "terms_status": "UNKNOWN_AWAITING_TERMS_CAPTURE",
    "disclaimer_text": "dẫn tới cổng chính thức — điều kiện chưa đối soát",
    "specific_action_label": "🏛️ Mở cổng www.cgv.vn →",
    "evidence_status": "Nguồn chính thức: www.cgv.vn",
    "visual_asset_url": "assets/images/board_a_afterglow_hero.svg",
    "asset_subject_id": null,
    "visual_attribution": null,
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "SLOT_EVENING",
    "transit_hint": "🚌 Gần tuyến xe buýt DanaBus R16 & Trạm xe đạp TNGO Bạch Đằng",
    "map_query_url": "https://www.google.com/maps/search/?api=1&query=CGV%20Cinemas%3A%20C%E1%BB%95ng%20Th%C3%B4ng%20Tin%20C%E1%BB%A5m%20R%E1%BA%A1p%20%C4%90%C3%A0%20N%E1%BA%B5ng%20%C4%90%C3%A0%20N%E1%BA%B5ng",
    "leisure_category": "CINEMA",
    "meal_moments": null,
    "subject_id": "DEAL_CGV_CGV_thông tin đồng hành",
    "version": "v3.476.0-staging.ev",
    "verification_level": "PORTAL_IDENTITY_ONLY",
    "roster_status": "OFFICIAL_URL_DECLARED_PENDING_VAULT_CAPTURE",
    "cohort_classification": "COHORT_2_CINEMA_CULTURE",
    "customer_fact_summary": "Dẫn tới cổng thông tin chính thức của đơn vị vận hành.",
    "has_verified_field_fact": false,
    "verified_field_fact": null
  },
  {
    "item_id": "DEAL_DOMINOS_thông tin đồng hành",
    "brand": "Domino's Pizza",
    "title": "Domino's Pizza: Cổng Thông Tin Chi Nhánh Đà Nẵng",
    "summary_text": "Thông tin mạng lưới chi nhánh Domino's Pizza tại Đà Nẵng. JayT chưa đối soát thực đơn; vui lòng kiểm tra tại nguồn.",
    "curation_story": "Thông tin mạng lưới chi nhánh Domino's Pizza tại Đà Nẵng. JayT chưa đối soát thực đơn; vui lòng kiểm tra tại nguồn.",
    "scope_text": "Domino's Nguyễn Văn Linh & Pasteur Đà Nẵng",
    "official_source_url": "https://dominos.vn/khuyen-mai/mua-1-tang-1",
    "source_domain": "dominos.vn",
    "gateway_group": "AN_GI",
    "primary_journey": "AN_GI",
    "primary_journey_label": "Ẩm Thực Đà Thành",
    "content_type": "PLACE_CULINARY",
    "tier_level": "TIER_2_PROGRAMME",
    "tier_badge": "🏛️ CỔNG CHÍNH THỨC",
    "tier_badge_class": "tier-badge-programme",
    "copy_schema_level": "PORTAL_IDENTITY_VERIFIED",
    "terms_status": "UNKNOWN_AWAITING_TERMS_CAPTURE",
    "disclaimer_text": "dẫn tới cổng chính thức — điều kiện chưa đối soát",
    "specific_action_label": "🏛️ Mở cổng dominos.vn →",
    "evidence_status": "Nguồn chính thức: dominos.vn",
    "visual_asset_url": "assets/images/board_a_afterglow_hero.svg",
    "asset_subject_id": null,
    "visual_attribution": null,
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
    "version": "v3.476.0-staging.ev",
    "verification_level": "PORTAL_IDENTITY_ONLY",
    "roster_status": "VAULT_ARTIFACT_MATCHED",
    "cohort_classification": "COHORT_4_CULINARY_RETAIL",
    "customer_fact_summary": "Hệ thống chuỗi pizza — tra cứu chi nhánh Đà Nẵng và thực đơn chính thức qua dominos.vn.",
    "has_verified_field_fact": false,
    "verified_field_fact": null
  },
  {
    "item_id": "DEAL_LOTTERIA_HAPPY_LUNCH",
    "brand": "Lotteria Vietnam",
    "title": "Lotteria: Cổng Thông Tin Chi Nhánh Đà Nẵng",
    "summary_text": "Thông tin mạng lưới chi nhánh Lotteria tại Đà Nẵng. JayT chưa đối soát thực đơn và phụ phí; vui lòng kiểm tra tại nguồn.",
    "curation_story": "Thông tin mạng lưới chi nhánh Lotteria tại Đà Nẵng. JayT chưa đối soát thực đơn và phụ phí; vui lòng kiểm tra tại nguồn.",
    "scope_text": "Tất cả chi nhánh Lotteria TP. Đà Nẵng",
    "official_source_url": "https://www.lotteria.vn/menu/happy-lunch",
    "source_domain": "www.lotteria.vn",
    "gateway_group": "AN_GI",
    "primary_journey": "AN_GI",
    "primary_journey_label": "Ẩm Thực Đà Thành",
    "content_type": "PLACE_CULINARY",
    "tier_level": "TIER_2_PROGRAMME",
    "tier_badge": "🏛️ CỔNG CHÍNH THỨC",
    "tier_badge_class": "tier-badge-programme",
    "copy_schema_level": "PORTAL_IDENTITY_VERIFIED",
    "terms_status": "UNKNOWN_AWAITING_TERMS_CAPTURE",
    "disclaimer_text": "dẫn tới cổng chính thức — điều kiện chưa đối soát",
    "specific_action_label": "🏛️ Mở cổng www.lotteria.vn →",
    "evidence_status": "Nguồn chính thức: www.lotteria.vn",
    "visual_asset_url": "assets/images/board_a_afterglow_hero.svg",
    "asset_subject_id": null,
    "visual_attribution": null,
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
    "version": "v3.476.0-staging.ev",
    "verification_level": "PORTAL_IDENTITY_ONLY",
    "roster_status": "OFFICIAL_URL_DECLARED_PENDING_VAULT_CAPTURE",
    "cohort_classification": "COHORT_4_CULINARY_RETAIL",
    "customer_fact_summary": "Dẫn tới cổng thông tin chính thức của đơn vị vận hành.",
    "has_verified_field_fact": false,
    "verified_field_fact": null
  },
  {
    "item_id": "DEAL_METIZ_U22",
    "brand": "Metiz Cinema",
    "title": "Metiz Cinema: Cổng Thông Tin Rạp Helio Đà Nẵng",
    "summary_text": "Tra cứu thông tin rạp chiếu Metiz tại Helio Center Đà Nẵng. JayT chưa đối soát quy chế độ tuổi và giá vé; vui lòng kiểm tra tại nguồn.",
    "curation_story": "Tra cứu thông tin rạp chiếu Metiz tại Helio Center Đà Nẵng. JayT chưa đối soát quy chế độ tuổi và giá vé; vui lòng kiểm tra tại nguồn.",
    "scope_text": "Tầng 1 Helio Center, Đường 2 Tháng 9, Hải Châu, Đà Nẵng",
    "official_source_url": "https://metiz.vn/tin-tuc/khuyen-mai/gia-ve-u22-metiz/",
    "source_domain": "metiz.vn",
    "gateway_group": "DI_DAU",
    "primary_journey": "DI_DAU",
    "primary_journey_label": "Đi Chơi & Rạp Chiếu",
    "content_type": "EDUCATION_POLICY",
    "tier_level": "TIER_2_PROGRAMME",
    "tier_badge": "🏛️ CỔNG CHÍNH THỨC",
    "tier_badge_class": "tier-badge-programme",
    "copy_schema_level": "PORTAL_IDENTITY_VERIFIED",
    "terms_status": "UNKNOWN_AWAITING_TERMS_CAPTURE",
    "disclaimer_text": "dẫn tới cổng chính thức — điều kiện chưa đối soát",
    "specific_action_label": "🏛️ Mở cổng metiz.vn →",
    "evidence_status": "Nguồn chính thức: metiz.vn",
    "visual_asset_url": "assets/images/board_a_afterglow_hero.svg",
    "asset_subject_id": null,
    "visual_attribution": null,
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "SLOT_AFTERNOON",
    "transit_hint": "🚌 Gần tuyến xe buýt DanaBus R16 & Trạm xe đạp TNGO Bạch Đằng",
    "map_query_url": "https://www.google.com/maps/search/?api=1&query=Metiz%20Cinema%3A%20Ch%C3%ADnh%20S%C3%A1ch%20Kh%C3%A1n%20Gi%E1%BA%A3%20Tr%E1%BA%BB%20U22%20%C4%90%C3%A0%20N%E1%BA%B5ng",
    "leisure_category": "CINEMA",
    "meal_moments": null,
    "subject_id": "DEAL_METIZ_U22",
    "version": "v3.476.0-staging.ev",
    "verification_level": "PORTAL_IDENTITY_ONLY",
    "roster_status": "VAULT_ARTIFACT_MATCHED",
    "cohort_classification": "COHORT_2_CINEMA_CULTURE",
    "customer_fact_summary": "Cụm rạp chiếu phim tại Helio Center — có chương trình giá vé thành viên/U22 theo lịch công bố tại rạp.",
    "has_verified_field_fact": false,
    "verified_field_fact": null
  },
  {
    "item_id": "PROG_GITHUB_STUDENT",
    "brand": "GitHub Education",
    "title": "GitHub Education: Cổng Chương Trình Học Đường",
    "summary_text": "Cổng tiếp nhận hồ sơ chương trình học đường chính thức của GitHub. JayT chưa đối soát danh mục gói và điều kiện chi tiết; vui lòng kiểm tra tại nguồn.",
    "curation_story": "Cổng tiếp nhận hồ sơ chương trình học đường chính thức của GitHub. JayT chưa đối soát danh mục gói và điều kiện chi tiết; vui lòng kiểm tra tại nguồn.",
    "scope_text": "HSSV tại các trường ĐH, CĐ, THPT TP. Đà Nẵng",
    "official_source_url": "https://education.github.com/pack",
    "source_domain": "education.github.com",
    "gateway_group": "MUA_SAM",
    "primary_journey": "MUA_SAM",
    "primary_journey_label": "Cổng Chính Sách & Học Đường",
    "content_type": "EDUCATION_POLICY",
    "tier_level": "TIER_2_PROGRAMME",
    "tier_badge": "🏛️ CỔNG CHÍNH THỨC",
    "tier_badge_class": "tier-badge-programme",
    "copy_schema_level": "PORTAL_IDENTITY_VERIFIED",
    "terms_status": "UNKNOWN_AWAITING_TERMS_CAPTURE",
    "disclaimer_text": "dẫn tới cổng chính thức — điều kiện chưa đối soát",
    "specific_action_label": "🏛️ Mở cổng education.github.com →",
    "evidence_status": "Nguồn chính thức: education.github.com",
    "visual_asset_url": "assets/images/board_a_afterglow_hero.svg",
    "asset_subject_id": null,
    "visual_attribution": null,
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "ALL_DAY",
    "transit_hint": "📍 Kết nối giao thông nội thành thuận tiện",
    "map_query_url": null,
    "leisure_category": null,
    "meal_moments": null,
    "subject_id": "PROG_GITHUB_STUDENT",
    "version": "v3.476.0-staging.ev",
    "verification_level": "PORTAL_IDENTITY_ONLY",
    "roster_status": "VAULT_ARTIFACT_MATCHED",
    "cohort_classification": "COHORT_3_EDUCATION_POLICY",
    "customer_fact_summary": "Gói công cụ lập trình cho sinh viên chính quy — nộp minh chứng học tập qua cổng GitHub Education.",
    "has_verified_field_fact": false,
    "verified_field_fact": null
  },
  {
    "item_id": "PROG_NOTION_EDU",
    "brand": "Notion",
    "title": "Notion: Cổng Chương Trình Học Đường",
    "summary_text": "Cổng hỗ trợ học đường chính thức từ Notion. JayT chưa đối soát điều kiện nâng cấp tài khoản; vui lòng kiểm tra quy chế tại nguồn.",
    "curation_story": "Cổng hỗ trợ học đường chính thức từ Notion. JayT chưa đối soát điều kiện nâng cấp tài khoản; vui lòng kiểm tra quy chế tại nguồn.",
    "scope_text": "Sinh viên & Giảng viên các trường tại Đà Nẵng",
    "official_source_url": "https://www.notion.so/product/notion-for-education",
    "source_domain": "www.notion.so",
    "gateway_group": "MUA_SAM",
    "primary_journey": "MUA_SAM",
    "primary_journey_label": "Cổng Chính Sách & Học Đường",
    "content_type": "EDUCATION_POLICY",
    "tier_level": "TIER_2_PROGRAMME",
    "tier_badge": "🏛️ CỔNG CHÍNH THỨC",
    "tier_badge_class": "tier-badge-programme",
    "copy_schema_level": "PORTAL_IDENTITY_VERIFIED",
    "terms_status": "UNKNOWN_AWAITING_TERMS_CAPTURE",
    "disclaimer_text": "dẫn tới cổng chính thức — điều kiện chưa đối soát",
    "specific_action_label": "🏛️ Mở cổng www.notion.so →",
    "evidence_status": "Nguồn chính thức: www.notion.so",
    "visual_asset_url": "assets/images/board_a_afterglow_hero.svg",
    "asset_subject_id": null,
    "visual_attribution": null,
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "ALL_DAY",
    "transit_hint": "📍 Kết nối giao thông nội thành thuận tiện",
    "map_query_url": null,
    "leisure_category": null,
    "meal_moments": null,
    "subject_id": "PROG_NOTION_EDU",
    "version": "v3.476.0-staging.ev",
    "verification_level": "PORTAL_IDENTITY_ONLY",
    "roster_status": "OFFICIAL_URL_DECLARED_PENDING_VAULT_CAPTURE",
    "cohort_classification": "COHORT_3_EDUCATION_POLICY",
    "customer_fact_summary": "Dẫn tới cổng thông tin chính thức của đơn vị vận hành.",
    "has_verified_field_fact": false,
    "verified_field_fact": null
  },
  {
    "item_id": "PROG_CANVA_EDU",
    "brand": "Canva",
    "title": "Canva: Cổng Chương Trình Giáo Dục",
    "summary_text": "Cổng thông tin học đường chính thức từ Canva. JayT chưa đối soát điều kiện xác thực trường; vui lòng kiểm tra tại nguồn.",
    "curation_story": "Cổng thông tin học đường chính thức từ Canva. JayT chưa đối soát điều kiện xác thực trường; vui lòng kiểm tra tại nguồn.",
    "scope_text": "Giáo viên và học sinh sinh viên tại Đà Nẵng",
    "official_source_url": "https://www.canva.com/education/",
    "source_domain": "www.canva.com",
    "gateway_group": "MUA_SAM",
    "primary_journey": "MUA_SAM",
    "primary_journey_label": "Cổng Chính Sách & Học Đường",
    "content_type": "EDUCATION_POLICY",
    "tier_level": "TIER_2_PROGRAMME",
    "tier_badge": "🏛️ CỔNG CHÍNH THỨC",
    "tier_badge_class": "tier-badge-programme",
    "copy_schema_level": "PORTAL_IDENTITY_VERIFIED",
    "terms_status": "UNKNOWN_AWAITING_TERMS_CAPTURE",
    "disclaimer_text": "dẫn tới cổng chính thức — điều kiện chưa đối soát",
    "specific_action_label": "🏛️ Mở cổng www.canva.com →",
    "evidence_status": "Nguồn chính thức: www.canva.com",
    "visual_asset_url": "assets/images/board_a_afterglow_hero.svg",
    "asset_subject_id": null,
    "visual_attribution": null,
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "ALL_DAY",
    "transit_hint": "📍 Kết nối giao thông nội thành thuận tiện",
    "map_query_url": null,
    "leisure_category": null,
    "meal_moments": null,
    "subject_id": "PROG_CANVA_EDU",
    "version": "v3.476.0-staging.ev",
    "verification_level": "PORTAL_IDENTITY_ONLY",
    "roster_status": "OFFICIAL_URL_DECLARED_PENDING_VAULT_CAPTURE",
    "cohort_classification": "COHORT_3_EDUCATION_POLICY",
    "customer_fact_summary": "Dẫn tới cổng thông tin chính thức của đơn vị vận hành.",
    "has_verified_field_fact": false,
    "verified_field_fact": null
  },
  {
    "item_id": "PROG_JETBRAINS_STUDENT",
    "brand": "JetBrains",
    "title": "JetBrains: Cổng Hỗ Trợ Sinh Viên",
    "summary_text": "Cổng tiếp nhận xác thực hồ sơ học tập chính thức từ JetBrains. JayT chưa đối soát danh mục IDE và thời hạn; vui lòng kiểm tra tại nguồn.",
    "curation_story": "Cổng tiếp nhận xác thực hồ sơ học tập chính thức từ JetBrains. JayT chưa đối soát danh mục IDE và thời hạn; vui lòng kiểm tra tại nguồn.",
    "scope_text": "Sinh viên CNTT các trường ĐH Bách Khoa, Sư Phạm KT, Duy Tân, FPT Đà Nẵng",
    "official_source_url": "https://www.jetbrains.com/community/education/",
    "source_domain": "www.jetbrains.com",
    "gateway_group": "MUA_SAM",
    "primary_journey": "MUA_SAM",
    "primary_journey_label": "Cổng Chính Sách & Học Đường",
    "content_type": "EDUCATION_POLICY",
    "tier_level": "TIER_2_PROGRAMME",
    "tier_badge": "🏛️ CỔNG CHÍNH THỨC",
    "tier_badge_class": "tier-badge-programme",
    "copy_schema_level": "PORTAL_IDENTITY_VERIFIED",
    "terms_status": "UNKNOWN_AWAITING_TERMS_CAPTURE",
    "disclaimer_text": "dẫn tới cổng chính thức — điều kiện chưa đối soát",
    "specific_action_label": "🏛️ Mở cổng www.jetbrains.com →",
    "evidence_status": "Nguồn chính thức: www.jetbrains.com",
    "visual_asset_url": "assets/images/board_a_afterglow_hero.svg",
    "asset_subject_id": null,
    "visual_attribution": null,
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "ALL_DAY",
    "transit_hint": "📍 Kết nối giao thông nội thành thuận tiện",
    "map_query_url": null,
    "leisure_category": null,
    "meal_moments": null,
    "subject_id": "PROG_JETBRAINS_STUDENT",
    "version": "v3.476.0-staging.ev",
    "verification_level": "PORTAL_IDENTITY_ONLY",
    "roster_status": "VAULT_ARTIFACT_MATCHED",
    "cohort_classification": "COHORT_3_EDUCATION_POLICY",
    "customer_fact_summary": "Giấy phép miễn phí trọn bộ IDE JetBrains cho sinh viên sử dụng email trường học (.edu).",
    "has_verified_field_fact": false,
    "verified_field_fact": null
  },
  {
    "item_id": "PROG_SPOTIFY_STUDENT",
    "brand": "Spotify",
    "title": "Spotify: Cổng Thông Tin Gói Học Đường",
    "summary_text": "Cổng thông tin chính thức dành cho sinh viên từ Spotify. JayT chưa đối soát điều kiện đăng ký; vui lòng kiểm tra tại nguồn.",
    "curation_story": "Cổng thông tin chính thức dành cho sinh viên từ Spotify. JayT chưa đối soát điều kiện đăng ký; vui lòng kiểm tra tại nguồn.",
    "scope_text": "Sinh viên các trường đại học tại Đà Nẵng",
    "official_source_url": "https://www.spotify.com/vn-vi/student/",
    "source_domain": "www.spotify.com",
    "gateway_group": "DI_DAU",
    "primary_journey": "DI_DAU",
    "primary_journey_label": "Đi Chơi & Rạp Chiếu",
    "content_type": "EDUCATION_POLICY",
    "tier_level": "TIER_2_PROGRAMME",
    "tier_badge": "🏛️ CỔNG CHÍNH THỨC",
    "tier_badge_class": "tier-badge-programme",
    "copy_schema_level": "PORTAL_IDENTITY_VERIFIED",
    "terms_status": "UNKNOWN_AWAITING_TERMS_CAPTURE",
    "disclaimer_text": "dẫn tới cổng chính thức — điều kiện chưa đối soát",
    "specific_action_label": "🏛️ Mở cổng www.spotify.com →",
    "evidence_status": "Nguồn chính thức: www.spotify.com",
    "visual_asset_url": "assets/images/board_a_afterglow_hero.svg",
    "asset_subject_id": null,
    "visual_attribution": null,
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "ALL_DAY",
    "transit_hint": "📍 Kết nối giao thông nội thành thuận tiện",
    "map_query_url": "https://www.google.com/maps/search/?api=1&query=Spotify%3A%20Ch%C6%B0%C6%A1ng%20Tr%C3%ACnh%20D%C3%A0nh%20Cho%20Sinh%20Vi%C3%AAn%20%C4%90%C3%A0%20N%E1%BA%B5ng",
    "leisure_category": "CITY_EXPLORE",
    "meal_moments": null,
    "subject_id": "PROG_SPOTIFY_STUDENT",
    "version": "v3.476.0-staging.ev",
    "verification_level": "PORTAL_IDENTITY_ONLY",
    "roster_status": "OFFICIAL_URL_DECLARED_PENDING_VAULT_CAPTURE",
    "cohort_classification": "COHORT_2_CINEMA_CULTURE",
    "customer_fact_summary": "Dẫn tới cổng thông tin chính thức của đơn vị vận hành.",
    "has_verified_field_fact": false,
    "verified_field_fact": null
  },
  {
    "item_id": "PROG_APPLE_MUSIC_STUDENT",
    "brand": "Apple",
    "title": "Apple Music: Cổng Thông Tin Hỗ Trợ Học Đường",
    "summary_text": "Cổng thông tin dịch vụ chính thức từ Apple. JayT chưa đối soát điều kiện học sinh sinh viên; vui lòng kiểm tra tại nguồn.",
    "curation_story": "Cổng thông tin dịch vụ chính thức từ Apple. JayT chưa đối soát điều kiện học sinh sinh viên; vui lòng kiểm tra tại nguồn.",
    "scope_text": "Sinh viên các trường ĐH tại Đà Nẵng",
    "official_source_url": "https://www.apple.com/vn/apple-music/",
    "source_domain": "www.apple.com",
    "gateway_group": "DI_DAU",
    "primary_journey": "DI_DAU",
    "primary_journey_label": "Đi Chơi & Rạp Chiếu",
    "content_type": "EDUCATION_POLICY",
    "tier_level": "TIER_2_PROGRAMME",
    "tier_badge": "🏛️ CỔNG CHÍNH THỨC",
    "tier_badge_class": "tier-badge-programme",
    "copy_schema_level": "PORTAL_IDENTITY_VERIFIED",
    "terms_status": "UNKNOWN_AWAITING_TERMS_CAPTURE",
    "disclaimer_text": "dẫn tới cổng chính thức — điều kiện chưa đối soát",
    "specific_action_label": "🏛️ Mở cổng www.apple.com →",
    "evidence_status": "Nguồn chính thức: www.apple.com",
    "visual_asset_url": "assets/images/board_a_afterglow_hero.svg",
    "asset_subject_id": null,
    "visual_attribution": null,
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "ALL_DAY",
    "transit_hint": "📍 Kết nối giao thông nội thành thuận tiện",
    "map_query_url": "https://www.google.com/maps/search/?api=1&query=Apple%20Music%3A%20Ch%C6%B0%C6%A1ng%20Tr%C3%ACnh%20D%C3%A0nh%20Cho%20Sinh%20Vi%C3%AAn%20%C4%90%C3%A0%20N%E1%BA%B5ng",
    "leisure_category": "CITY_EXPLORE",
    "meal_moments": null,
    "subject_id": "PROG_APPLE_MUSIC_STUDENT",
    "version": "v3.476.0-staging.ev",
    "verification_level": "PORTAL_IDENTITY_ONLY",
    "roster_status": "OFFICIAL_URL_DECLARED_PENDING_VAULT_CAPTURE",
    "cohort_classification": "COHORT_2_CINEMA_CULTURE",
    "customer_fact_summary": "Dẫn tới cổng thông tin chính thức của đơn vị vận hành.",
    "has_verified_field_fact": false,
    "verified_field_fact": null
  },
  {
    "item_id": "PROG_STARLIGHT_COMBO_10K",
    "brand": "Starlight Cinema",
    "title": "Starlight Cinema: Cổng Thông Tin Cụm Rạp Đà Nẵng",
    "summary_text": "Tra cứu thông tin cụm rạp Starlight Đà Nẵng. JayT chưa đối soát biểu giá và chính sách thành viên; vui lòng kiểm tra tại nguồn.",
    "curation_story": "Tra cứu thông tin cụm rạp Starlight Đà Nẵng. JayT chưa đối soát biểu giá và chính sách thành viên; vui lòng kiểm tra tại nguồn.",
    "scope_text": "Tầng 4 Tòa nhà Nguyễn Kim, Thanh Khê, Đà Nẵng",
    "official_source_url": "https://starlight.vn/khuyen-mai/combo-bap-nuoc-10k.html",
    "source_domain": "starlight.vn",
    "gateway_group": "DI_DAU",
    "primary_journey": "DI_DAU",
    "primary_journey_label": "Đi Chơi & Rạp Chiếu",
    "content_type": "EDUCATION_POLICY",
    "tier_level": "TIER_2_PROGRAMME",
    "tier_badge": "🏛️ CỔNG CHÍNH THỨC",
    "tier_badge_class": "tier-badge-programme",
    "copy_schema_level": "PORTAL_IDENTITY_VERIFIED",
    "terms_status": "UNKNOWN_AWAITING_TERMS_CAPTURE",
    "disclaimer_text": "dẫn tới cổng chính thức — điều kiện chưa đối soát",
    "specific_action_label": "🏛️ Mở cổng starlight.vn →",
    "evidence_status": "Nguồn chính thức: starlight.vn",
    "visual_asset_url": "assets/images/board_a_afterglow_hero.svg",
    "asset_subject_id": null,
    "visual_attribution": null,
    "locality_tag": "THANH_KHE",
    "time_slot_tag": "SLOT_EVENING",
    "transit_hint": "🚌 Gần tuyến xe buýt DanaBus R6A & Trạm TNGO Điện Biên Phủ",
    "map_query_url": "https://www.google.com/maps/search/?api=1&query=Starlight%20Cinema%3A%20Ch%C6%B0%C6%A1ng%20Tr%C3%ACnh%20Th%C3%A0nh%20Vi%C3%AAn%20R%E1%BA%A1p%20Phim%20%C4%90%C3%A0%20N%E1%BA%B5ng",
    "leisure_category": "CITY_EXPLORE",
    "meal_moments": null,
    "subject_id": "PROG_STARLIGHT_COMBO_10K",
    "version": "v3.476.0-staging.ev",
    "verification_level": "PORTAL_IDENTITY_ONLY",
    "roster_status": "VAULT_ARTIFACT_MATCHED",
    "cohort_classification": "COHORT_2_CINEMA_CULTURE",
    "customer_fact_summary": "Cụm rạp Starlight Cinema tại 46 Điện Biên Phủ — lịch chiếu và ưu đãi công bố trên cổng chính thức.",
    "has_verified_field_fact": false,
    "verified_field_fact": null
  },
  {
    "item_id": "PROG_GALAXY_CINEMA_HAPPY_DAY",
    "brand": "Galaxy Cinema",
    "title": "Galaxy Cinema: Cổng Thông Tin Rạp Đà Nẵng",
    "summary_text": "Tra cứu thông tin cụm rạp Galaxy Cinema Đà Nẵng. JayT chưa đối soát lịch chiếu và điều kiện áp dụng; vui lòng kiểm tra tại nguồn.",
    "curation_story": "Tra cứu thông tin cụm rạp Galaxy Cinema Đà Nẵng. JayT chưa đối soát lịch chiếu và điều kiện áp dụng; vui lòng kiểm tra tại nguồn.",
    "scope_text": "Coop Mart Điện Biên Phủ, Thanh Khê, Đà Nẵng",
    "official_source_url": "https://www.galaxycine.vn/khuyen-mai/happy-day/",
    "source_domain": "www.galaxycine.vn",
    "gateway_group": "DI_DAU",
    "primary_journey": "DI_DAU",
    "primary_journey_label": "Đi Chơi & Rạp Chiếu",
    "content_type": "EDUCATION_POLICY",
    "tier_level": "TIER_2_PROGRAMME",
    "tier_badge": "🏛️ CỔNG CHÍNH THỨC",
    "tier_badge_class": "tier-badge-programme",
    "copy_schema_level": "PORTAL_IDENTITY_VERIFIED",
    "terms_status": "UNKNOWN_AWAITING_TERMS_CAPTURE",
    "disclaimer_text": "dẫn tới cổng chính thức — điều kiện chưa đối soát",
    "specific_action_label": "🏛️ Mở cổng www.galaxycine.vn →",
    "evidence_status": "Nguồn chính thức: www.galaxycine.vn",
    "visual_asset_url": "assets/images/board_a_afterglow_hero.svg",
    "asset_subject_id": null,
    "visual_attribution": null,
    "locality_tag": "THANH_KHE",
    "time_slot_tag": "SLOT_EVENING",
    "transit_hint": "🚌 Gần tuyến xe buýt DanaBus R6A & Trạm TNGO Điện Biên Phủ",
    "map_query_url": "https://www.google.com/maps/search/?api=1&query=Galaxy%20Cinema%20%C4%90%C3%A0%20N%E1%BA%B5ng%3A%20Ch%C6%B0%C6%A1ng%20Tr%C3%ACnh%20Ng%C3%A0y%20Th%C3%A0nh%20Vi%C3%AAn%20%C4%90%C3%A0%20N%E1%BA%B5ng",
    "leisure_category": "CITY_EXPLORE",
    "meal_moments": null,
    "subject_id": "PROG_GALAXY_CINEMA_HAPPY_DAY",
    "version": "v3.476.0-staging.ev",
    "verification_level": "PORTAL_IDENTITY_ONLY",
    "roster_status": "OFFICIAL_URL_DECLARED_PENDING_VAULT_CAPTURE",
    "cohort_classification": "COHORT_2_CINEMA_CULTURE",
    "customer_fact_summary": "Dẫn tới cổng thông tin chính thức của đơn vị vận hành.",
    "has_verified_field_fact": false,
    "verified_field_fact": null
  },
  {
    "item_id": "PROG_COOPMART_STUDENT_CARD",
    "brand": "Co.opmart",
    "title": "Co.opmart Đà Nẵng: Cổng Thông Tin Khách Hàng",
    "summary_text": "Cổng thông tin hệ thống Co.opmart tại Đà Nẵng. JayT chưa đối soát quy chế tích điểm và điều kiện thẻ; vui lòng kiểm tra tại nguồn.",
    "curation_story": "Cổng thông tin hệ thống Co.opmart tại Đà Nẵng. JayT chưa đối soát quy chế tích điểm và điều kiện thẻ; vui lòng kiểm tra tại nguồn.",
    "scope_text": "Co.opmart Bình Thuận & Co.opmart Sơn Trà",
    "official_source_url": "https://coopmart.vn",
    "source_domain": "coopmart.vn",
    "gateway_group": "MUA_SAM",
    "primary_journey": "MUA_SAM",
    "primary_journey_label": "Cổng Chính Sách & Học Đường",
    "content_type": "EDUCATION_POLICY",
    "tier_level": "TIER_2_PROGRAMME",
    "tier_badge": "🏛️ CỔNG CHÍNH THỨC",
    "tier_badge_class": "tier-badge-programme",
    "copy_schema_level": "PORTAL_IDENTITY_VERIFIED",
    "terms_status": "UNKNOWN_AWAITING_TERMS_CAPTURE",
    "disclaimer_text": "dẫn tới cổng chính thức — điều kiện chưa đối soát",
    "specific_action_label": "🏛️ Mở cổng coopmart.vn →",
    "evidence_status": "Nguồn chính thức: coopmart.vn",
    "visual_asset_url": "assets/images/board_a_afterglow_hero.svg",
    "asset_subject_id": null,
    "visual_attribution": null,
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "ALL_DAY",
    "transit_hint": "🚌 Gần tuyến xe buýt DanaBus R16 & Trạm xe đạp TNGO Bạch Đằng",
    "map_query_url": null,
    "leisure_category": null,
    "meal_moments": null,
    "subject_id": "PROG_COOPMART_STUDENT_CARD",
    "version": "v3.476.0-staging.ev",
    "verification_level": "PORTAL_IDENTITY_ONLY",
    "roster_status": "OFFICIAL_URL_DECLARED_PENDING_VAULT_CAPTURE",
    "cohort_classification": "COHORT_3_EDUCATION_POLICY",
    "customer_fact_summary": "Dẫn tới cổng thông tin chính thức của đơn vị vận hành.",
    "has_verified_field_fact": false,
    "verified_field_fact": null
  },
  {
    "item_id": "PROG_SHOPEE_STUDENT_CLUB",
    "brand": "Shopee Vietnam",
    "title": "Shopee: Kênh Thông Tin Học Sinh Sinh Viên",
    "summary_text": "Kênh thông tin cộng đồng sinh viên trên nền tảng Shopee. JayT chưa đối soát quyền lợi và thể lệ; vui lòng kiểm tra tại nguồn.",
    "curation_story": "Kênh thông tin cộng đồng sinh viên trên nền tảng Shopee. JayT chưa đối soát quyền lợi và thể lệ; vui lòng kiểm tra tại nguồn.",
    "scope_text": "Học sinh sinh viên tại TP. Đà Nẵng",
    "official_source_url": "https://shopee.vn/m/shopee-student-club",
    "source_domain": "shopee.vn",
    "gateway_group": "MUA_SAM",
    "primary_journey": "MUA_SAM",
    "primary_journey_label": "Cổng Chính Sách & Học Đường",
    "content_type": "EDUCATION_POLICY",
    "tier_level": "TIER_2_PROGRAMME",
    "tier_badge": "🏛️ CỔNG CHÍNH THỨC",
    "tier_badge_class": "tier-badge-programme",
    "copy_schema_level": "PORTAL_IDENTITY_VERIFIED",
    "terms_status": "UNKNOWN_AWAITING_TERMS_CAPTURE",
    "disclaimer_text": "dẫn tới cổng chính thức — điều kiện chưa đối soát",
    "specific_action_label": "🏛️ Mở cổng shopee.vn →",
    "evidence_status": "Nguồn chính thức: shopee.vn",
    "visual_asset_url": "assets/images/board_a_afterglow_hero.svg",
    "asset_subject_id": null,
    "visual_attribution": null,
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "ALL_DAY",
    "transit_hint": "📍 Kết nối giao thông nội thành thuận tiện",
    "map_query_url": null,
    "leisure_category": null,
    "meal_moments": null,
    "subject_id": "PROG_SHOPEE_STUDENT_CLUB",
    "version": "v3.476.0-staging.ev",
    "verification_level": "PORTAL_IDENTITY_ONLY",
    "roster_status": "OFFICIAL_URL_DECLARED_PENDING_VAULT_CAPTURE",
    "cohort_classification": "COHORT_3_EDUCATION_POLICY",
    "customer_fact_summary": "Dẫn tới cổng thông tin chính thức của đơn vị vận hành.",
    "has_verified_field_fact": false,
    "verified_field_fact": null
  },
  {
    "item_id": "PROG_GRAB_STUDENT_UNLIMITED",
    "brand": "Grab Vietnam",
    "title": "Grab: Cổng Thông Tin Dịch Vụ",
    "summary_text": "Cổng thông tin dịch vụ di chuyển và giao nhận Grab. JayT chưa đối soát biểu phí và chính sách sinh viên; vui lòng kiểm tra tại nguồn.",
    "curation_story": "Cổng thông tin dịch vụ di chuyển và giao nhận Grab. JayT chưa đối soát biểu phí và chính sách sinh viên; vui lòng kiểm tra tại nguồn.",
    "scope_text": "Toàn TP. Đà Nẵng",
    "official_source_url": "https://www.grab.com/vn/",
    "source_domain": "www.grab.com",
    "gateway_group": "DI_DAU",
    "primary_journey": "DI_DAU",
    "primary_journey_label": "Đi Chơi & Rạp Chiếu",
    "content_type": "EDUCATION_POLICY",
    "tier_level": "TIER_2_PROGRAMME",
    "tier_badge": "🏛️ CỔNG CHÍNH THỨC",
    "tier_badge_class": "tier-badge-programme",
    "copy_schema_level": "PORTAL_IDENTITY_VERIFIED",
    "terms_status": "UNKNOWN_AWAITING_TERMS_CAPTURE",
    "disclaimer_text": "dẫn tới cổng chính thức — điều kiện chưa đối soát",
    "specific_action_label": "🏛️ Mở cổng www.grab.com →",
    "evidence_status": "Nguồn chính thức: www.grab.com",
    "visual_asset_url": "assets/images/board_a_afterglow_hero.svg",
    "asset_subject_id": null,
    "visual_attribution": null,
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "ALL_DAY",
    "transit_hint": "📍 Kết nối giao thông nội thành thuận tiện",
    "map_query_url": "https://www.google.com/maps/search/?api=1&query=Grab%3A%20K%C3%AAnh%20H%E1%BB%99i%20Vi%C3%AAn%20GrabUnlimited%20H%E1%BB%8Dc%20%C4%90%C6%B0%E1%BB%9Dng%20%C4%90%C3%A0%20N%E1%BA%B5ng",
    "leisure_category": "CITY_EXPLORE",
    "meal_moments": null,
    "subject_id": "PROG_GRAB_STUDENT_UNLIMITED",
    "version": "v3.476.0-staging.ev",
    "verification_level": "PORTAL_IDENTITY_ONLY",
    "roster_status": "OFFICIAL_URL_DECLARED_PENDING_VAULT_CAPTURE",
    "cohort_classification": "COHORT_2_CINEMA_CULTURE",
    "customer_fact_summary": "Dẫn tới cổng thông tin chính thức của đơn vị vận hành.",
    "has_verified_field_fact": false,
    "verified_field_fact": null
  },
  {
    "item_id": "PROG_BE_STUDENT_PACK",
    "brand": "Be Group",
    "title": "Be: Cổng Thông Tin Dịch Vụ Di Chuyển",
    "summary_text": "Cổng thông tin dịch vụ gọi xe công nghệ Be. JayT chưa đối soát biểu giá và tuyến hỗ trợ; vui lòng kiểm tra tại nguồn.",
    "curation_story": "Cổng thông tin dịch vụ gọi xe công nghệ Be. JayT chưa đối soát biểu giá và tuyến hỗ trợ; vui lòng kiểm tra tại nguồn.",
    "scope_text": "Toàn TP. Đà Nẵng",
    "official_source_url": "https://be.com.vn",
    "source_domain": "be.com.vn",
    "gateway_group": "DI_DAU",
    "primary_journey": "DI_DAU",
    "primary_journey_label": "Đi Chơi & Rạp Chiếu",
    "content_type": "EDUCATION_POLICY",
    "tier_level": "TIER_2_PROGRAMME",
    "tier_badge": "🏛️ CỔNG CHÍNH THỨC",
    "tier_badge_class": "tier-badge-programme",
    "copy_schema_level": "PORTAL_IDENTITY_VERIFIED",
    "terms_status": "UNKNOWN_AWAITING_TERMS_CAPTURE",
    "disclaimer_text": "dẫn tới cổng chính thức — điều kiện chưa đối soát",
    "specific_action_label": "🏛️ Mở cổng be.com.vn →",
    "evidence_status": "Nguồn chính thức: be.com.vn",
    "visual_asset_url": "assets/images/board_a_afterglow_hero.svg",
    "asset_subject_id": null,
    "visual_attribution": null,
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "SLOT_MORNING",
    "transit_hint": "📍 Kết nối giao thông nội thành thuận tiện",
    "map_query_url": "https://www.google.com/maps/search/?api=1&query=Be%3A%20K%C3%AAnh%20Di%20Chuy%E1%BB%83n%20%C4%90%E1%BA%BFn%20Tr%C6%B0%E1%BB%9Dng%20Cho%20Sinh%20Vi%C3%AAn%20%C4%90%C3%A0%20N%E1%BA%B5ng",
    "leisure_category": "CITY_EXPLORE",
    "meal_moments": null,
    "subject_id": "PROG_BE_STUDENT_PACK",
    "version": "v3.476.0-staging.ev",
    "verification_level": "PORTAL_IDENTITY_ONLY",
    "roster_status": "OFFICIAL_URL_DECLARED_PENDING_VAULT_CAPTURE",
    "cohort_classification": "COHORT_2_CINEMA_CULTURE",
    "customer_fact_summary": "Dẫn tới cổng thông tin chính thức của đơn vị vận hành.",
    "has_verified_field_fact": false,
    "verified_field_fact": null
  },
  {
    "item_id": "PROG_FPT_PLAY_STUDENT",
    "brand": "FPT Play",
    "title": "FPT Play: Cổng Thông Tin Dịch Vụ Truyền Hình",
    "summary_text": "Cổng thông tin dịch vụ truyền hình và giải trí FPT Play. JayT chưa đối soát danh mục nội dung và gói cước; vui lòng kiểm tra tại nguồn.",
    "curation_story": "Cổng thông tin dịch vụ truyền hình và giải trí FPT Play. JayT chưa đối soát danh mục nội dung và gói cước; vui lòng kiểm tra tại nguồn.",
    "scope_text": "Toàn quốc & TP. Đà Nẵng",
    "official_source_url": "https://fptplay.vn",
    "source_domain": "fptplay.vn",
    "gateway_group": "DI_DAU",
    "primary_journey": "DI_DAU",
    "primary_journey_label": "Đi Chơi & Rạp Chiếu",
    "content_type": "EDUCATION_POLICY",
    "tier_level": "TIER_2_PROGRAMME",
    "tier_badge": "🏛️ CỔNG CHÍNH THỨC",
    "tier_badge_class": "tier-badge-programme",
    "copy_schema_level": "PORTAL_IDENTITY_VERIFIED",
    "terms_status": "UNKNOWN_AWAITING_TERMS_CAPTURE",
    "disclaimer_text": "dẫn tới cổng chính thức — điều kiện chưa đối soát",
    "specific_action_label": "🏛️ Mở cổng fptplay.vn →",
    "evidence_status": "Nguồn chính thức: fptplay.vn",
    "visual_asset_url": "assets/images/board_a_afterglow_hero.svg",
    "asset_subject_id": null,
    "visual_attribution": null,
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "ALL_DAY",
    "transit_hint": "📍 Kết nối giao thông nội thành thuận tiện",
    "map_query_url": "https://www.google.com/maps/search/?api=1&query=FPT%20Play%3A%20G%C3%B3i%20Gi%E1%BA%A3i%20Tr%C3%AD%20%26%20Ngo%E1%BA%A1i%20H%E1%BA%A1ng%20Anh%20D%C3%A0nh%20Cho%20Sinh%20Vi%C3%AAn%20%C4%90%C3%A0%20N%E1%BA%B5ng",
    "leisure_category": "CITY_EXPLORE",
    "meal_moments": null,
    "subject_id": "PROG_FPT_PLAY_STUDENT",
    "version": "v3.476.0-staging.ev",
    "verification_level": "PORTAL_IDENTITY_ONLY",
    "roster_status": "OFFICIAL_URL_DECLARED_PENDING_VAULT_CAPTURE",
    "cohort_classification": "COHORT_2_CINEMA_CULTURE",
    "customer_fact_summary": "Dẫn tới cổng thông tin chính thức của đơn vị vận hành.",
    "has_verified_field_fact": false,
    "verified_field_fact": null
  },
  {
    "item_id": "PROG_CGV_CULTURE_DAY",
    "brand": "CGV Cinemas",
    "title": "CGV Cinemas: Cổng Thông Tin Sự Kiện Điện Ảnh",
    "summary_text": "Tra cứu lịch sự kiện điện ảnh tại hệ thống CGV Đà Nẵng. JayT chưa đối soát thể lệ ngày hội; vui lòng kiểm tra tại nguồn.",
    "curation_story": "Tra cứu lịch sự kiện điện ảnh tại hệ thống CGV Đà Nẵng. JayT chưa đối soát thể lệ ngày hội; vui lòng kiểm tra tại nguồn.",
    "scope_text": "CGV Vĩnh Trung Plaza & CGV Vincom Đà Nẵng",
    "official_source_url": "https://www.cgv.vn/default/culture-day",
    "source_domain": "www.cgv.vn",
    "gateway_group": "DI_DAU",
    "primary_journey": "DI_DAU",
    "primary_journey_label": "Đi Chơi & Rạp Chiếu",
    "content_type": "EDUCATION_POLICY",
    "tier_level": "TIER_2_PROGRAMME",
    "tier_badge": "🏛️ CỔNG CHÍNH THỨC",
    "tier_badge_class": "tier-badge-programme",
    "copy_schema_level": "PORTAL_IDENTITY_VERIFIED",
    "terms_status": "UNKNOWN_AWAITING_TERMS_CAPTURE",
    "disclaimer_text": "dẫn tới cổng chính thức — điều kiện chưa đối soát",
    "specific_action_label": "🏛️ Mở cổng www.cgv.vn →",
    "evidence_status": "Nguồn chính thức: www.cgv.vn",
    "visual_asset_url": "assets/images/board_a_afterglow_hero.svg",
    "asset_subject_id": null,
    "visual_attribution": null,
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "SLOT_EVENING",
    "transit_hint": "🚌 Gần tuyến xe buýt DanaBus R16 & Trạm xe đạp TNGO Bạch Đằng",
    "map_query_url": "https://www.google.com/maps/search/?api=1&query=CGV%20Cinemas%3A%20Ng%C3%A0y%20H%E1%BB%99i%20%C4%90i%E1%BB%87n%20%E1%BA%A2nh%20%C4%90%E1%BB%8Bnh%20K%E1%BB%B3%20%C4%90%C3%A0%20N%E1%BA%B5ng",
    "leisure_category": "CINEMA",
    "meal_moments": null,
    "subject_id": "PROG_CGV_CULTURE_DAY",
    "version": "v3.476.0-staging.ev",
    "verification_level": "PORTAL_IDENTITY_ONLY",
    "roster_status": "OFFICIAL_URL_DECLARED_PENDING_VAULT_CAPTURE",
    "cohort_classification": "COHORT_2_CINEMA_CULTURE",
    "customer_fact_summary": "Dẫn tới cổng thông tin chính thức của đơn vị vận hành.",
    "has_verified_field_fact": false,
    "verified_field_fact": null
  },
  {
    "item_id": "FACILITY_DANABUS",
    "brand": "DanaBus — Xe Buýt Đà Nẵng",
    "title": "DanaBus: Mạng Lưới Xe Buýt Trợ Giá Đà Nẵng",
    "summary_text": "Mạng lưới xe buýt nội thành kết nối các trường đại học và trục đô thị. JayT chưa đối soát biểu giá vé tháng; vui lòng kiểm tra tại nguồn.",
    "curation_story": "Mạng lưới xe buýt nội thành kết nối các trường đại học và trục đô thị. JayT chưa đối soát biểu giá vé tháng; vui lòng kiểm tra tại nguồn.",
    "scope_text": "Toàn bộ mạng lưới nội thành TP. Đà Nẵng",
    "official_source_url": "https://danangbus.vn",
    "source_domain": "danangbus.vn",
    "gateway_group": "DI_DAU",
    "primary_journey": "TIEN_ICH",
    "primary_journey_label": "Tiện Ích Công Cộng & Đô Thị",
    "content_type": "PUBLIC_TRANSIT",
    "tier_level": "TIER_2_PROGRAMME",
    "tier_badge": "🏛️ CỔNG CHÍNH THỨC",
    "tier_badge_class": "tier-badge-programme",
    "copy_schema_level": "PORTAL_IDENTITY_VERIFIED",
    "terms_status": "UNKNOWN_AWAITING_TERMS_CAPTURE",
    "disclaimer_text": "dẫn tới cổng chính thức — điều kiện chưa đối soát",
    "specific_action_label": "🏛️ Mở cổng danangbus.vn →",
    "evidence_status": "Nguồn chính thức: danangbus.vn",
    "visual_asset_url": "assets/images/danabus_green_transit_003.svg",
    "asset_subject_id": "HAN_RIVER_BRIDGE_TRANSIT_CONTEXT",
    "visual_attribution": "🎨 Đồ họa JayT",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "SLOT_MORNING",
    "transit_hint": "📍 Kết nối giao thông nội thành thuận tiện",
    "map_query_url": "https://www.google.com/maps/search/?api=1&query=DanaBus%3A%20M%E1%BA%A1ng%20L%C6%B0%E1%BB%9Bi%20Xe%20Bu%C3%BDt%20Tr%E1%BB%A3%20Gi%C3%A1%20%C4%90%C3%A0%20N%E1%BA%B5ng%20%C4%90%C3%A0%20N%E1%BA%B5ng",
    "leisure_category": "CITY_EXPLORE",
    "meal_moments": null,
    "subject_id": "FACILITY_DANABUS",
    "version": "v3.476.0-staging.ev",
    "verification_level": "PORTAL_IDENTITY_ONLY",
    "roster_status": "VAULT_ARTIFACT_MATCHED",
    "cohort_classification": "COHORT_1_PUBLIC_TRANSIT",
    "customer_fact_summary": "Xe buýt công cộng trợ giá nội đô Đà Nẵng (Tuyến R16A & các tuyến trợ giá) — tra cứu lộ trình qua cổng chính thức.",
    "has_verified_field_fact": false,
    "verified_field_fact": null
  },
  {
    "item_id": "FACILITY_TNGO_BIKE",
    "brand": "TNGO Xe Đạp Đô Thị",
    "title": "TNGO: Hệ Thống Xe Đạp Công Cộng TP. Đà Nẵng",
    "summary_text": "Mạng lưới trạm xe đạp công cộng khắp các trục đường Đà Nẵng. JayT chưa đối soát bảng giá cước thuê; vui lòng kiểm tra tại nguồn.",
    "curation_story": "Mạng lưới trạm xe đạp công cộng khắp các trục đường Đà Nẵng. JayT chưa đối soát bảng giá cước thuê; vui lòng kiểm tra tại nguồn.",
    "scope_text": "Hơn 60 trạm tại Hải Châu, Sơn Trà, Ngũ Hành Sơn",
    "official_source_url": "https://tngo.vn",
    "source_domain": "tngo.vn",
    "gateway_group": "DI_DAU",
    "primary_journey": "TIEN_ICH",
    "primary_journey_label": "Tiện Ích Công Cộng & Đô Thị",
    "content_type": "PUBLIC_TRANSIT",
    "tier_level": "TIER_2_PROGRAMME",
    "tier_badge": "🏛️ CỔNG CHÍNH THỨC",
    "tier_badge_class": "tier-badge-programme",
    "copy_schema_level": "PORTAL_IDENTITY_VERIFIED",
    "terms_status": "UNKNOWN_AWAITING_TERMS_CAPTURE",
    "disclaimer_text": "dẫn tới cổng chính thức — điều kiện chưa đối soát",
    "specific_action_label": "🏛️ Mở cổng tngo.vn →",
    "evidence_status": "Nguồn chính thức: tngo.vn",
    "visual_asset_url": "assets/images/board_a_afterglow_hero.svg",
    "asset_subject_id": null,
    "visual_attribution": null,
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "SLOT_AFTERNOON",
    "transit_hint": "🚌 Gần tuyến xe buýt DanaBus R16 & Trạm xe đạp TNGO Bạch Đằng",
    "map_query_url": "https://www.google.com/maps/search/?api=1&query=TNGO%3A%20H%E1%BB%87%20Th%E1%BB%91ng%20Xe%20%C4%90%E1%BA%A1p%20C%C3%B4ng%20C%E1%BB%99ng%20TP.%20%C4%90%C3%A0%20N%E1%BA%B5ng%20%C4%90%C3%A0%20N%E1%BA%B5ng",
    "leisure_category": "CITY_EXPLORE",
    "meal_moments": null,
    "subject_id": "FACILITY_TNGO_BIKE",
    "version": "v3.476.0-staging.ev",
    "verification_level": "PORTAL_IDENTITY_ONLY",
    "roster_status": "VAULT_ARTIFACT_MATCHED",
    "cohort_classification": "COHORT_1_PUBLIC_TRANSIT",
    "customer_fact_summary": "Dịch vụ xe đạp đô thị công cộng bố trí tại các trạm dọc sông Hàn và trường học — thuê qua ứng dụng chính thức.",
    "has_verified_field_fact": false,
    "verified_field_fact": null
  },
  {
    "item_id": "FACILITY_THU_VIEN_TONG_HOP",
    "brand": "Thư Viện TP. Đà Nẵng",
    "title": "Thư Viện Khoa Học Tổng Hợp Đà Nẵng",
    "summary_text": "Không gian tự học yên tĩnh nhìn thẳng ra sông Hàn, trang bị máy lạnh, wifi tốc độ cao và hàng ngàn đầu sách.",
    "curation_story": "Không gian tự học yên tĩnh nhìn thẳng ra sông Hàn, trang bị máy lạnh, wifi tốc độ cao và hàng ngàn đầu sách.",
    "scope_text": "46 Bạch Đằng, Q. Hải Châu, TP. Đà Nẵng",
    "official_source_url": "http://thuvien.danang.gov.vn",
    "source_domain": "thuvien.danang.gov.vn",
    "gateway_group": "MUA_SAM",
    "primary_journey": "MUA_SAM",
    "primary_journey_label": "Cổng Chính Sách & Học Đường",
    "content_type": "CIVIC_UTILITY",
    "tier_level": "TIER_3_UTILITY",
    "tier_badge": "📍 TIỆN ÍCH CÔNG CỘNG",
    "tier_badge_class": "tier-badge-utility",
    "copy_schema_level": "RADAR_OBSERVED",
    "terms_status": "UNKNOWN_AWAITING_TERMS_CAPTURE",
    "disclaimer_text": "dẫn tới cổng chính thức — điều kiện chưa đối soát",
    "specific_action_label": "📍 Xem thông tin & Maps →",
    "evidence_status": "Tiện ích công cộng: TP. Đà Nẵng",
    "visual_asset_url": "assets/images/danang_library_art_004.svg",
    "asset_subject_id": "FACILITY_THU_VIEN_TONG_HOP",
    "visual_attribution": "🎨 Đồ họa JayT",
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "SLOT_AFTERNOON",
    "transit_hint": "🚌 Gần tuyến xe buýt DanaBus R16 & Trạm xe đạp TNGO Bạch Đằng",
    "map_query_url": null,
    "leisure_category": null,
    "meal_moments": null,
    "subject_id": "FACILITY_THU_VIEN_TONG_HOP",
    "version": "v3.476.0-staging.ev",
    "verification_level": "PORTAL_IDENTITY_ONLY",
    "roster_status": "OFFICIAL_URL_DECLARED_PENDING_VAULT_CAPTURE",
    "cohort_classification": "COHORT_3_EDUCATION_POLICY",
    "customer_fact_summary": "Dẫn tới cổng thông tin chính thức của đơn vị vận hành.",
    "has_verified_field_fact": false,
    "verified_field_fact": null
  },
  {
    "item_id": "FACILITY_DVC_DANANG",
    "brand": "Trung Tâm Dịch Vụ Công 1022",
    "title": "Tổng Đài 1022 & Cổng Dịch Vụ Công Đà Nẵng",
    "summary_text": "Kênh tra cứu thông tin hành chính, phản ánh giao thông, xe buýt, học tập và an sinh xã hội chính thức của thành phố.",
    "curation_story": "Kênh tra cứu thông tin hành chính, phản ánh giao thông, xe buýt, học tập và an sinh xã hội chính thức của thành phố.",
    "scope_text": "Toàn bộ địa bàn TP. Đà Nẵng",
    "official_source_url": "https://1022.danang.gov.vn",
    "source_domain": "1022.danang.gov.vn",
    "gateway_group": "MUA_SAM",
    "primary_journey": "MUA_SAM",
    "primary_journey_label": "Cổng Chính Sách & Học Đường",
    "content_type": "CIVIC_UTILITY",
    "tier_level": "TIER_3_UTILITY",
    "tier_badge": "📍 TIỆN ÍCH CÔNG CỘNG",
    "tier_badge_class": "tier-badge-utility",
    "copy_schema_level": "RADAR_OBSERVED",
    "terms_status": "UNKNOWN_AWAITING_TERMS_CAPTURE",
    "disclaimer_text": "dẫn tới cổng chính thức — điều kiện chưa đối soát",
    "specific_action_label": "📍 Xem thông tin & Maps →",
    "evidence_status": "Tiện ích công cộng: TP. Đà Nẵng",
    "visual_asset_url": "assets/images/board_a_afterglow_hero.svg",
    "asset_subject_id": null,
    "visual_attribution": null,
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "ALL_DAY",
    "transit_hint": "📍 Kết nối giao thông nội thành thuận tiện",
    "map_query_url": null,
    "leisure_category": null,
    "meal_moments": null,
    "subject_id": "FACILITY_DVC_DANANG",
    "version": "v3.476.0-staging.ev",
    "verification_level": "PORTAL_IDENTITY_ONLY",
    "roster_status": "OFFICIAL_URL_DECLARED_PENDING_VAULT_CAPTURE",
    "cohort_classification": "COHORT_3_EDUCATION_POLICY",
    "customer_fact_summary": "Dẫn tới cổng thông tin chính thức của đơn vị vận hành.",
    "has_verified_field_fact": false,
    "verified_field_fact": null
  },
  {
    "item_id": "PLACE_CAU_RONG_FIRE_WATER",
    "brand": "TP. Đà Nẵng",
    "title": "Cầu Rồng Phun Lửa & Phun Nước (21:00 Cuối Tuần)",
    "summary_text": "Biểu tượng kiến trúc của Đà Nẵng, trình diễn phun lửa và phun nước bên bờ sông Hàn vào mỗi tối Thứ 7 và Chủ Nhật.",
    "curation_story": "Biểu tượng kiến trúc của Đà Nẵng, trình diễn phun lửa và phun nước bên bờ sông Hàn vào mỗi tối Thứ 7 và Chủ Nhật.",
    "scope_text": "Cầu Rồng bắc qua Sông Hàn, Hải Châu / Sơn Trà",
    "official_source_url": "https://danang.gov.vn",
    "source_domain": "danang.gov.vn",
    "gateway_group": "DI_DAU",
    "primary_journey": "TIEN_ICH",
    "primary_journey_label": "Tiện Ích Công Cộng & Đô Thị",
    "content_type": "CIVIC_UTILITY",
    "tier_level": "TIER_3_UTILITY",
    "tier_badge": "📍 TIỆN ÍCH CÔNG CỘNG",
    "tier_badge_class": "tier-badge-utility",
    "copy_schema_level": "RADAR_OBSERVED",
    "terms_status": "UNKNOWN_AWAITING_TERMS_CAPTURE",
    "disclaimer_text": "dẫn tới cổng chính thức — điều kiện chưa đối soát",
    "specific_action_label": "📍 Xem thông tin & Maps →",
    "evidence_status": "Tiện ích công cộng: TP. Đà Nẵng",
    "visual_asset_url": "assets/images/board_a_afterglow_hero.svg",
    "asset_subject_id": null,
    "visual_attribution": null,
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "SLOT_EVENING",
    "transit_hint": "🚌 Gần tuyến xe buýt DanaBus R16 & Trạm xe đạp TNGO Bạch Đằng",
    "map_query_url": "https://www.google.com/maps/search/?api=1&query=C%E1%BA%A7u%20R%E1%BB%93ng%20Phun%20L%E1%BB%ADa%20%26%20Phun%20N%C6%B0%E1%BB%9Bc%20(21%3A00%20Cu%E1%BB%91i%20Tu%E1%BA%A7n)%20%C4%90%C3%A0%20N%E1%BA%B5ng",
    "leisure_category": "CITY_EXPLORE",
    "meal_moments": null,
    "subject_id": "PLACE_CAU_RONG_FIRE_WATER",
    "version": "v3.476.0-staging.ev",
    "verification_level": "PORTAL_IDENTITY_ONLY",
    "roster_status": "OFFICIAL_URL_DECLARED_PENDING_VAULT_CAPTURE",
    "cohort_classification": "COHORT_1_PUBLIC_TRANSIT",
    "customer_fact_summary": "Dẫn tới cổng thông tin chính thức của đơn vị vận hành.",
    "has_verified_field_fact": false,
    "verified_field_fact": null
  },
  {
    "item_id": "PLACE_CONG_VIEN_APEC",
    "brand": "Công Viên APEC Đà Nẵng",
    "title": "Công Viên APEC & Vòm Cánh Diều Ven Sông Hàn",
    "summary_text": "Quảng trường rộng lớn với kiến trúc mái vòm cánh diều bay cao, địa điểm giao lưu và ngắm cảnh sông Hàn lý tưởng.",
    "curation_story": "Quảng trường rộng lớn với kiến trúc mái vòm cánh diều bay cao, địa điểm giao lưu và ngắm cảnh sông Hàn lý tưởng.",
    "scope_text": "Đường 2 Tháng 9, P. Bình Hiên, Hải Châu, Đà Nẵng",
    "official_source_url": "https://danang.gov.vn",
    "source_domain": "danang.gov.vn",
    "gateway_group": "DI_DAU",
    "primary_journey": "TIEN_ICH",
    "primary_journey_label": "Tiện Ích Công Cộng & Đô Thị",
    "content_type": "CIVIC_UTILITY",
    "tier_level": "TIER_3_UTILITY",
    "tier_badge": "📍 TIỆN ÍCH CÔNG CỘNG",
    "tier_badge_class": "tier-badge-utility",
    "copy_schema_level": "RADAR_OBSERVED",
    "terms_status": "UNKNOWN_AWAITING_TERMS_CAPTURE",
    "disclaimer_text": "dẫn tới cổng chính thức — điều kiện chưa đối soát",
    "specific_action_label": "📍 Xem thông tin & Maps →",
    "evidence_status": "Tiện ích công cộng: TP. Đà Nẵng",
    "visual_asset_url": "assets/images/board_a_afterglow_hero.svg",
    "asset_subject_id": null,
    "visual_attribution": null,
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "SLOT_AFTERNOON",
    "transit_hint": "🚌 Gần tuyến xe buýt DanaBus R16 & Trạm xe đạp TNGO Bạch Đằng",
    "map_query_url": "https://www.google.com/maps/search/?api=1&query=C%C3%B4ng%20Vi%C3%AAn%20APEC%20%26%20V%C3%B2m%20C%C3%A1nh%20Di%E1%BB%81u%20Ven%20S%C3%B4ng%20H%C3%A0n%20%C4%90%C3%A0%20N%E1%BA%B5ng",
    "leisure_category": "CITY_EXPLORE",
    "meal_moments": null,
    "subject_id": "PLACE_CONG_VIEN_APEC",
    "version": "v3.476.0-staging.ev",
    "verification_level": "PORTAL_IDENTITY_ONLY",
    "roster_status": "OFFICIAL_URL_DECLARED_PENDING_VAULT_CAPTURE",
    "cohort_classification": "COHORT_1_PUBLIC_TRANSIT",
    "customer_fact_summary": "Dẫn tới cổng thông tin chính thức của đơn vị vận hành.",
    "has_verified_field_fact": false,
    "verified_field_fact": null
  },
  {
    "item_id": "PLACE_PHO_DI_BO_BACH_DANG",
    "brand": "Phố Đi Bộ Đà Nẵng",
    "title": "Phố Đi Bộ Bạch Đằng (Bờ Tây Sông Hàn)",
    "summary_text": "Tuyến đường đi bộ ven sông thơ mộng với nhiều hoạt động âm nhạc đường phố, ẩm thực và làn gió mát sông Hàn.",
    "curation_story": "Tuyến đường đi bộ ven sông thơ mộng với nhiều hoạt động âm nhạc đường phố, ẩm thực và làn gió mát sông Hàn.",
    "scope_text": "Đường Bạch Đằng từ Cầu Rồng đến Cầu Trần Thị Lý",
    "official_source_url": "https://danang.gov.vn",
    "source_domain": "danang.gov.vn",
    "gateway_group": "DI_DAU",
    "primary_journey": "TIEN_ICH",
    "primary_journey_label": "Tiện Ích Công Cộng & Đô Thị",
    "content_type": "CIVIC_UTILITY",
    "tier_level": "TIER_3_UTILITY",
    "tier_badge": "📍 TIỆN ÍCH CÔNG CỘNG",
    "tier_badge_class": "tier-badge-utility",
    "copy_schema_level": "RADAR_OBSERVED",
    "terms_status": "UNKNOWN_AWAITING_TERMS_CAPTURE",
    "disclaimer_text": "dẫn tới cổng chính thức — điều kiện chưa đối soát",
    "specific_action_label": "📍 Xem thông tin & Maps →",
    "evidence_status": "Tiện ích công cộng: TP. Đà Nẵng",
    "visual_asset_url": "assets/images/board_a_afterglow_hero.svg",
    "asset_subject_id": null,
    "visual_attribution": null,
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "SLOT_EVENING",
    "transit_hint": "🚌 Gần tuyến xe buýt DanaBus R16 & Trạm xe đạp TNGO Bạch Đằng",
    "map_query_url": "https://www.google.com/maps/search/?api=1&query=Ph%E1%BB%91%20%C4%90i%20B%E1%BB%99%20B%E1%BA%A1ch%20%C4%90%E1%BA%B1ng%20(B%E1%BB%9D%20T%C3%A2y%20S%C3%B4ng%20H%C3%A0n)%20%C4%90%C3%A0%20N%E1%BA%B5ng",
    "leisure_category": "CITY_EXPLORE",
    "meal_moments": null,
    "subject_id": "PLACE_PHO_DI_BO_BACH_DANG",
    "version": "v3.476.0-staging.ev",
    "verification_level": "PORTAL_IDENTITY_ONLY",
    "roster_status": "OFFICIAL_URL_DECLARED_PENDING_VAULT_CAPTURE",
    "cohort_classification": "COHORT_1_PUBLIC_TRANSIT",
    "customer_fact_summary": "Dẫn tới cổng thông tin chính thức của đơn vị vận hành.",
    "has_verified_field_fact": false,
    "verified_field_fact": null
  },
  {
    "item_id": "PLACE_BAO_TANG_CHAM",
    "brand": "Bảo Tàng Điêu Khắc Chăm",
    "title": "Bảo Tàng Điêu Khắc Chăm Đà Nẵng",
    "summary_text": "Nơi lưu giữ bộ sưu tập hiện vật điêu khắc Chăm Pa quy mô nhất thế giới trong không gian kiến trúc Pháp cổ kính.",
    "curation_story": "Nơi lưu giữ bộ sưu tập hiện vật điêu khắc Chăm Pa quy mô nhất thế giới trong không gian kiến trúc Pháp cổ kính.",
    "scope_text": "Số 02 Đường 2 Tháng 9, Hải Châu, Đà Nẵng",
    "official_source_url": "http://chammuseum.danang.vn",
    "source_domain": "chammuseum.danang.vn",
    "gateway_group": "DI_DAU",
    "primary_journey": "TIEN_ICH",
    "primary_journey_label": "Tiện Ích Công Cộng & Đô Thị",
    "content_type": "CIVIC_UTILITY",
    "tier_level": "TIER_3_UTILITY",
    "tier_badge": "📍 TIỆN ÍCH CÔNG CỘNG",
    "tier_badge_class": "tier-badge-utility",
    "copy_schema_level": "RADAR_OBSERVED",
    "terms_status": "UNKNOWN_AWAITING_TERMS_CAPTURE",
    "disclaimer_text": "dẫn tới cổng chính thức — điều kiện chưa đối soát",
    "specific_action_label": "📍 Xem thông tin & Maps →",
    "evidence_status": "Tiện ích công cộng: TP. Đà Nẵng",
    "visual_asset_url": "assets/images/cham_museum_heritage_005.svg",
    "asset_subject_id": "PLACE_BAO_TANG_CHAM",
    "visual_attribution": "🎨 Đồ họa JayT",
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "SLOT_MORNING",
    "transit_hint": "🚌 Gần tuyến xe buýt DanaBus R16 & Trạm xe đạp TNGO Bạch Đằng",
    "map_query_url": "https://www.google.com/maps/search/?api=1&query=B%E1%BA%A3o%20T%C3%A0ng%20%C4%90i%C3%AAu%20Kh%E1%BA%AFc%20Ch%C4%83m%20%C4%90%C3%A0%20N%E1%BA%B5ng%20%C4%90%C3%A0%20N%E1%BA%B5ng",
    "leisure_category": "HERITAGE",
    "meal_moments": null,
    "subject_id": "PLACE_BAO_TANG_CHAM",
    "version": "v3.476.0-staging.ev",
    "verification_level": "PORTAL_IDENTITY_ONLY",
    "roster_status": "OFFICIAL_URL_DECLARED_PENDING_VAULT_CAPTURE",
    "cohort_classification": "COHORT_1_PUBLIC_TRANSIT",
    "customer_fact_summary": "Dẫn tới cổng thông tin chính thức của đơn vị vận hành.",
    "has_verified_field_fact": false,
    "verified_field_fact": null
  },
  {
    "item_id": "PLACE_BAO_TANG_DA_NANG",
    "brand": "Bảo Tàng Đà Nẵng",
    "title": "Bảo Tàng Đà Nẵng (Di Tích Thành Điện Hải)",
    "summary_text": "Trưng bày tư liệu lịch sử phát triển đô thị Đà Nẵng từ thời tiền sử đến hiện đại.",
    "curation_story": "Trưng bày tư liệu lịch sử phát triển đô thị Đà Nẵng từ thời tiền sử đến hiện đại.",
    "scope_text": "24 Trần Phú, P. Thạch Thang, Hải Châu, Đà Nẵng",
    "official_source_url": "https://baotangdanang.vn",
    "source_domain": "baotangdanang.vn",
    "gateway_group": "DI_DAU",
    "primary_journey": "TIEN_ICH",
    "primary_journey_label": "Tiện Ích Công Cộng & Đô Thị",
    "content_type": "CIVIC_UTILITY",
    "tier_level": "TIER_3_UTILITY",
    "tier_badge": "📍 TIỆN ÍCH CÔNG CỘNG",
    "tier_badge_class": "tier-badge-utility",
    "copy_schema_level": "RADAR_OBSERVED",
    "terms_status": "UNKNOWN_AWAITING_TERMS_CAPTURE",
    "disclaimer_text": "dẫn tới cổng chính thức — điều kiện chưa đối soát",
    "specific_action_label": "📍 Xem thông tin & Maps →",
    "evidence_status": "Tiện ích công cộng: TP. Đà Nẵng",
    "visual_asset_url": "assets/images/board_a_afterglow_hero.svg",
    "asset_subject_id": null,
    "visual_attribution": null,
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "SLOT_MORNING",
    "transit_hint": "🚌 Gần tuyến xe buýt DanaBus R16 & Trạm xe đạp TNGO Bạch Đằng",
    "map_query_url": "https://www.google.com/maps/search/?api=1&query=B%E1%BA%A3o%20T%C3%A0ng%20%C4%90%C3%A0%20N%E1%BA%B5ng%20(Di%20T%C3%ADch%20Th%C3%A0nh%20%C4%90i%E1%BB%87n%20H%E1%BA%A3i)%20%C4%90%C3%A0%20N%E1%BA%B5ng",
    "leisure_category": "HERITAGE",
    "meal_moments": null,
    "subject_id": "PLACE_BAO_TANG_DA_NANG",
    "version": "v3.476.0-staging.ev",
    "verification_level": "PORTAL_IDENTITY_ONLY",
    "roster_status": "OFFICIAL_URL_DECLARED_PENDING_VAULT_CAPTURE",
    "cohort_classification": "COHORT_1_PUBLIC_TRANSIT",
    "customer_fact_summary": "Dẫn tới cổng thông tin chính thức của đơn vị vận hành.",
    "has_verified_field_fact": false,
    "verified_field_fact": null
  },
  {
    "item_id": "PLACE_BAI_BIEN_MY_KHE",
    "brand": "Bãi Biển Đà Nẵng",
    "title": "Bãi Biển Mỹ Khê & Bờ Đông Đà Nẵng",
    "summary_text": "Bãi biển quyến rũ với bờ cát trắng mịn, nước trong xanh và nhiều tiện ích công cộng phục vụ người dân, du khách.",
    "curation_story": "Bãi biển quyến rũ với bờ cát trắng mịn, nước trong xanh và nhiều tiện ích công cộng phục vụ người dân, du khách.",
    "scope_text": "Đường Võ Nguyên Giáp, Q. Sơn Trà / Ngũ Hành Sơn",
    "official_source_url": "https://danang.gov.vn",
    "source_domain": "danang.gov.vn",
    "gateway_group": "DI_DAU",
    "primary_journey": "TIEN_ICH",
    "primary_journey_label": "Tiện Ích Công Cộng & Đô Thị",
    "content_type": "CIVIC_UTILITY",
    "tier_level": "TIER_3_UTILITY",
    "tier_badge": "📍 TIỆN ÍCH CÔNG CỘNG",
    "tier_badge_class": "tier-badge-utility",
    "copy_schema_level": "RADAR_OBSERVED",
    "terms_status": "UNKNOWN_AWAITING_TERMS_CAPTURE",
    "disclaimer_text": "dẫn tới cổng chính thức — điều kiện chưa đối soát",
    "specific_action_label": "📍 Xem thông tin & Maps →",
    "evidence_status": "Tiện ích công cộng: TP. Đà Nẵng",
    "visual_asset_url": "assets/images/board_b_coastal_hero.svg",
    "asset_subject_id": "PLACE_BAI_BIEN_MY_KHE",
    "visual_attribution": "🎨 Đồ họa JayT",
    "locality_tag": "SON_TRA",
    "time_slot_tag": "SLOT_MORNING",
    "transit_hint": "🚲 Gần trạm xe đạp TNGO Võ Nguyên Giáp & Cầu Rồng",
    "map_query_url": "https://www.google.com/maps/search/?api=1&query=B%C3%A3i%20Bi%E1%BB%83n%20M%E1%BB%B9%20Kh%C3%AA%20%26%20B%E1%BB%9D%20%C4%90%C3%B4ng%20%C4%90%C3%A0%20N%E1%BA%B5ng%20%C4%90%C3%A0%20N%E1%BA%B5ng",
    "leisure_category": "CITY_EXPLORE",
    "meal_moments": null,
    "subject_id": "PLACE_BAI_BIEN_MY_KHE",
    "version": "v3.476.0-staging.ev",
    "verification_level": "PORTAL_IDENTITY_ONLY",
    "roster_status": "OFFICIAL_URL_DECLARED_PENDING_VAULT_CAPTURE",
    "cohort_classification": "COHORT_1_PUBLIC_TRANSIT",
    "customer_fact_summary": "Dẫn tới cổng thông tin chính thức của đơn vị vận hành.",
    "has_verified_field_fact": false,
    "verified_field_fact": null
  },
  {
    "item_id": "PLACE_BAN_DAO_SON_TRA",
    "brand": "Bán Đảo Sơn Trà",
    "title": "Bán Đảo Sơn Trà & Chùa Linh Ứng",
    "summary_text": "Khu bảo tồn thiên nhiên với tầm nhìn bao quát toàn cảnh vịnh Đà Nẵng và quần thể voọc chà vá chân nâu quý hiếm.",
    "curation_story": "Khu bảo tồn thiên nhiên với tầm nhìn bao quát toàn cảnh vịnh Đà Nẵng và quần thể voọc chà vá chân nâu quý hiếm.",
    "scope_text": "Q. Sơn Trà, TP. Đà Nẵng",
    "official_source_url": "https://danang.gov.vn",
    "source_domain": "danang.gov.vn",
    "gateway_group": "DI_DAU",
    "primary_journey": "TIEN_ICH",
    "primary_journey_label": "Tiện Ích Công Cộng & Đô Thị",
    "content_type": "CIVIC_UTILITY",
    "tier_level": "TIER_3_UTILITY",
    "tier_badge": "📍 TIỆN ÍCH CÔNG CỘNG",
    "tier_badge_class": "tier-badge-utility",
    "copy_schema_level": "RADAR_OBSERVED",
    "terms_status": "UNKNOWN_AWAITING_TERMS_CAPTURE",
    "disclaimer_text": "dẫn tới cổng chính thức — điều kiện chưa đối soát",
    "specific_action_label": "📍 Xem thông tin & Maps →",
    "evidence_status": "Tiện ích công cộng: TP. Đà Nẵng",
    "visual_asset_url": "assets/images/board_a_afterglow_hero.svg",
    "asset_subject_id": null,
    "visual_attribution": null,
    "locality_tag": "SON_TRA",
    "time_slot_tag": "SLOT_MORNING",
    "transit_hint": "🚲 Gần trạm xe đạp TNGO Võ Nguyên Giáp & Cầu Rồng",
    "map_query_url": "https://www.google.com/maps/search/?api=1&query=B%C3%A1n%20%C4%90%E1%BA%A3o%20S%C6%A1n%20Tr%C3%A0%20%26%20Ch%C3%B9a%20Linh%20%E1%BB%A8ng%20%C4%90%C3%A0%20N%E1%BA%B5ng",
    "leisure_category": "CITY_EXPLORE",
    "meal_moments": null,
    "subject_id": "PLACE_BAN_DAO_SON_TRA",
    "version": "v3.476.0-staging.ev",
    "verification_level": "PORTAL_IDENTITY_ONLY",
    "roster_status": "OFFICIAL_URL_DECLARED_PENDING_VAULT_CAPTURE",
    "cohort_classification": "COHORT_1_PUBLIC_TRANSIT",
    "customer_fact_summary": "Dẫn tới cổng thông tin chính thức của đơn vị vận hành.",
    "has_verified_field_fact": false,
    "verified_field_fact": null
  },
  {
    "item_id": "PLACE_CHO_HAN_DANANG",
    "brand": "Chợ Hàn Đà Nẵng",
    "title": "Chợ Hàn: Đặc Sản Miền Trung & Nông Sản Tươi Ngon",
    "summary_text": "Ngôi chợ truyền thống lâu đời ngay trung tâm thành phố với hàng trăm gian hàng đặc sản mắm, chả bò và quà lưu niệm.",
    "curation_story": "Ngôi chợ truyền thống lâu đời ngay trung tâm thành phố với hàng trăm gian hàng đặc sản mắm, chả bò và quà lưu niệm.",
    "scope_text": "119 Trần Phú, P. Hải Châu 1, Hải Châu, Đà Nẵng",
    "official_source_url": "https://danang.gov.vn",
    "source_domain": "danang.gov.vn",
    "gateway_group": "MUA_SAM",
    "primary_journey": "MUA_SAM",
    "primary_journey_label": "Cổng Chính Sách & Học Đường",
    "content_type": "CIVIC_UTILITY",
    "tier_level": "TIER_3_UTILITY",
    "tier_badge": "📍 TIỆN ÍCH CÔNG CỘNG",
    "tier_badge_class": "tier-badge-utility",
    "copy_schema_level": "RADAR_OBSERVED",
    "terms_status": "UNKNOWN_AWAITING_TERMS_CAPTURE",
    "disclaimer_text": "dẫn tới cổng chính thức — điều kiện chưa đối soát",
    "specific_action_label": "📍 Xem thông tin & Maps →",
    "evidence_status": "Tiện ích công cộng: TP. Đà Nẵng",
    "visual_asset_url": "assets/images/board_a_afterglow_hero.svg",
    "asset_subject_id": null,
    "visual_attribution": null,
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "SLOT_MORNING",
    "transit_hint": "🚌 Gần tuyến xe buýt DanaBus R16 & Trạm xe đạp TNGO Bạch Đằng",
    "map_query_url": null,
    "leisure_category": null,
    "meal_moments": null,
    "subject_id": "PLACE_CHO_HAN_DANANG",
    "version": "v3.476.0-staging.ev",
    "verification_level": "PORTAL_IDENTITY_ONLY",
    "roster_status": "OFFICIAL_URL_DECLARED_PENDING_VAULT_CAPTURE",
    "cohort_classification": "COHORT_3_EDUCATION_POLICY",
    "customer_fact_summary": "Dẫn tới cổng thông tin chính thức của đơn vị vận hành.",
    "has_verified_field_fact": false,
    "verified_field_fact": null
  },
  {
    "item_id": "PLACE_CHO_CON_AM_THUC",
    "brand": "Chợ Cồn Đà Nẵng",
    "title": "Chợ Cồn: Khu Ẩm Thực Đường Phố Ngon Rẻ Đà Nẵng",
    "summary_text": "Nơi hội tụ đầy đủ các món ngon Đà Nẵng: bánh bèo, nậm, lọc, ốc hút, phá lấu, kem bơ với mức giá cực kỳ phải chăng.",
    "curation_story": "Nơi hội tụ đầy đủ các món ngon Đà Nẵng: bánh bèo, nậm, lọc, ốc hút, phá lấu, kem bơ với mức giá cực kỳ phải chăng.",
    "scope_text": "Góc ngã tư Hùng Vương & Ông Ích Khiêm, Hải Châu, Đà Nẵng",
    "official_source_url": "https://danang.gov.vn",
    "source_domain": "danang.gov.vn",
    "gateway_group": "AN_GI",
    "primary_journey": "AN_GI",
    "primary_journey_label": "Ẩm Thực Đà Thành",
    "content_type": "PLACE_CULINARY",
    "tier_level": "TIER_4_RADAR",
    "tier_badge": "📡 KHÁM PHÁ BẢN ĐỊA",
    "tier_badge_class": "tier-badge-radar",
    "copy_schema_level": "RADAR_OBSERVED",
    "terms_status": "UNKNOWN_AWAITING_TERMS_CAPTURE",
    "disclaimer_text": "dẫn tới cổng chính thức — điều kiện chưa đối soát",
    "specific_action_label": "📍 Xem vị trí & chỉ đường →",
    "evidence_status": "Kênh theo dõi: danang.gov.vn",
    "visual_asset_url": "assets/images/board_a_afterglow_hero.svg",
    "asset_subject_id": null,
    "visual_attribution": null,
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
    "version": "v3.476.0-staging.ev",
    "verification_level": "PORTAL_IDENTITY_ONLY",
    "roster_status": "OFFICIAL_URL_DECLARED_PENDING_VAULT_CAPTURE",
    "cohort_classification": "COHORT_4_CULINARY_RETAIL",
    "customer_fact_summary": "Dẫn tới cổng thông tin chính thức của đơn vị vận hành.",
    "has_verified_field_fact": false,
    "verified_field_fact": null
  },
  {
    "item_id": "PLACE_PHO_AM_THUC_HUYNH_THUC_KHANG",
    "brand": "Phố Ẩm Thực Huỳnh Thúc Kháng",
    "title": "Phố Điểm Tâm & Ẩm Thực Huỳnh Thúc Kháng",
    "summary_text": "Tuyến phố chuyên doanh ăn sáng nức tiếng với mì Quảng, bún bò, bánh canh, xôi gà thơm ngon chuẩn vị xứ Quảng.",
    "curation_story": "Tuyến phố chuyên doanh ăn sáng nức tiếng với mì Quảng, bún bò, bánh canh, xôi gà thơm ngon chuẩn vị xứ Quảng.",
    "scope_text": "Đường Huỳnh Thúc Kháng, Hải Châu, Đà Nẵng",
    "official_source_url": "https://danang.gov.vn",
    "source_domain": "danang.gov.vn",
    "gateway_group": "AN_GI",
    "primary_journey": "AN_GI",
    "primary_journey_label": "Ẩm Thực Đà Thành",
    "content_type": "PLACE_CULINARY",
    "tier_level": "TIER_4_RADAR",
    "tier_badge": "📡 KHÁM PHÁ BẢN ĐỊA",
    "tier_badge_class": "tier-badge-radar",
    "copy_schema_level": "RADAR_OBSERVED",
    "terms_status": "UNKNOWN_AWAITING_TERMS_CAPTURE",
    "disclaimer_text": "dẫn tới cổng chính thức — điều kiện chưa đối soát",
    "specific_action_label": "📍 Xem vị trí & chỉ đường →",
    "evidence_status": "Kênh theo dõi: danang.gov.vn",
    "visual_asset_url": "assets/images/board_a_afterglow_hero.svg",
    "asset_subject_id": null,
    "visual_attribution": null,
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
    "version": "v3.476.0-staging.ev",
    "verification_level": "PORTAL_IDENTITY_ONLY",
    "roster_status": "OFFICIAL_URL_DECLARED_PENDING_VAULT_CAPTURE",
    "cohort_classification": "COHORT_4_CULINARY_RETAIL",
    "customer_fact_summary": "Dẫn tới cổng thông tin chính thức của đơn vị vận hành.",
    "has_verified_field_fact": false,
    "verified_field_fact": null
  },
  {
    "item_id": "PLACE_CUNG_THIEU_NHI_DANANG",
    "brand": "Cung Văn Hóa Thiếu Nhi",
    "title": "Cung Thiếu Nhi Đà Nẵng: Không Gian Check-in & Sinh Hoạt",
    "summary_text": "Công trình kiến trúc mô phỏng hình khối Tangram đầy màu sắc, nơi diễn ra các hoạt động văn hóa nghệ thuật của giới trẻ.",
    "curation_story": "Công trình kiến trúc mô phỏng hình khối Tangram đầy màu sắc, nơi diễn ra các hoạt động văn hóa nghệ thuật của giới trẻ.",
    "scope_text": "02 Phan Đăng Lưu, P. Hòa Cường Bắc, Hải Châu, Đà Nẵng",
    "official_source_url": "https://danang.gov.vn",
    "source_domain": "danang.gov.vn",
    "gateway_group": "DI_DAU",
    "primary_journey": "TIEN_ICH",
    "primary_journey_label": "Tiện Ích Công Cộng & Đô Thị",
    "content_type": "CIVIC_UTILITY",
    "tier_level": "TIER_3_UTILITY",
    "tier_badge": "📍 TIỆN ÍCH CÔNG CỘNG",
    "tier_badge_class": "tier-badge-utility",
    "copy_schema_level": "RADAR_OBSERVED",
    "terms_status": "UNKNOWN_AWAITING_TERMS_CAPTURE",
    "disclaimer_text": "dẫn tới cổng chính thức — điều kiện chưa đối soát",
    "specific_action_label": "📍 Xem thông tin & Maps →",
    "evidence_status": "Tiện ích công cộng: TP. Đà Nẵng",
    "visual_asset_url": "assets/images/board_a_afterglow_hero.svg",
    "asset_subject_id": null,
    "visual_attribution": null,
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "SLOT_AFTERNOON",
    "transit_hint": "🚌 Gần tuyến xe buýt DanaBus R16 & Trạm xe đạp TNGO Bạch Đằng",
    "map_query_url": "https://www.google.com/maps/search/?api=1&query=Cung%20Thi%E1%BA%BFu%20Nhi%20%C4%90%C3%A0%20N%E1%BA%B5ng%3A%20Kh%C3%B4ng%20Gian%20Check-in%20%26%20Sinh%20Ho%E1%BA%A1t%20%C4%90%C3%A0%20N%E1%BA%B5ng",
    "leisure_category": "CITY_EXPLORE",
    "meal_moments": null,
    "subject_id": "PLACE_CUNG_THIEU_NHI_DANANG",
    "version": "v3.476.0-staging.ev",
    "verification_level": "PORTAL_IDENTITY_ONLY",
    "roster_status": "OFFICIAL_URL_DECLARED_PENDING_VAULT_CAPTURE",
    "cohort_classification": "COHORT_1_PUBLIC_TRANSIT",
    "customer_fact_summary": "Dẫn tới cổng thông tin chính thức của đơn vị vận hành.",
    "has_verified_field_fact": false,
    "verified_field_fact": null
  },
  {
    "item_id": "PLACE_NHA_THI_DAU_TIEN_SON",
    "brand": "Cung Thể Thao Tiên Sơn",
    "title": "Cung Thể Thao Tiên Sơn (Đĩa Bay Tiên Sơn)",
    "summary_text": "Nhà thi đấu hiện đại hình dáng đĩa bay, nơi diễn ra các giải thể thao sinh viên, hội thao và đại nhạc hội lớn.",
    "curation_story": "Nhà thi đấu hiện đại hình dáng đĩa bay, nơi diễn ra các giải thể thao sinh viên, hội thao và đại nhạc hội lớn.",
    "scope_text": "Phan Đăng Lưu, Hòa Cường Bắc, Hải Châu, Đà Nẵng",
    "official_source_url": "https://danang.gov.vn",
    "source_domain": "danang.gov.vn",
    "gateway_group": "DI_DAU",
    "primary_journey": "TIEN_ICH",
    "primary_journey_label": "Tiện Ích Công Cộng & Đô Thị",
    "content_type": "CIVIC_UTILITY",
    "tier_level": "TIER_3_UTILITY",
    "tier_badge": "📍 TIỆN ÍCH CÔNG CỘNG",
    "tier_badge_class": "tier-badge-utility",
    "copy_schema_level": "RADAR_OBSERVED",
    "terms_status": "UNKNOWN_AWAITING_TERMS_CAPTURE",
    "disclaimer_text": "dẫn tới cổng chính thức — điều kiện chưa đối soát",
    "specific_action_label": "📍 Xem thông tin & Maps →",
    "evidence_status": "Tiện ích công cộng: TP. Đà Nẵng",
    "visual_asset_url": "assets/images/board_a_afterglow_hero.svg",
    "asset_subject_id": null,
    "visual_attribution": null,
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "SLOT_EVENING",
    "transit_hint": "🚌 Gần tuyến xe buýt DanaBus R16 & Trạm xe đạp TNGO Bạch Đằng",
    "map_query_url": "https://www.google.com/maps/search/?api=1&query=Cung%20Th%E1%BB%83%20Thao%20Ti%C3%AAn%20S%C6%A1n%20(%C4%90%C4%A9a%20Bay%20Ti%C3%AAn%20S%C6%A1n)%20%C4%90%C3%A0%20N%E1%BA%B5ng",
    "leisure_category": "CITY_EXPLORE",
    "meal_moments": null,
    "subject_id": "PLACE_NHA_THI_DAU_TIEN_SON",
    "version": "v3.476.0-staging.ev",
    "verification_level": "PORTAL_IDENTITY_ONLY",
    "roster_status": "OFFICIAL_URL_DECLARED_PENDING_VAULT_CAPTURE",
    "cohort_classification": "COHORT_1_PUBLIC_TRANSIT",
    "customer_fact_summary": "Dẫn tới cổng thông tin chính thức của đơn vị vận hành.",
    "has_verified_field_fact": false,
    "verified_field_fact": null
  },
  {
    "item_id": "PLACE_BEN_DU_THUYEN_SONG_HAN",
    "brand": "Du Thuyền Sông Hàn",
    "title": "Bến Du Thuyền Sông Hàn (Ngắm Cầu Đà Nẵng Về Đêm)",
    "summary_text": "Trải nghiệm du ngoạn sông Hàn về đêm ngắm nhìn các cây cầu lung linh ánh đèn và thưởng thức múa Chăm truyền thống.",
    "curation_story": "Trải nghiệm du ngoạn sông Hàn về đêm ngắm nhìn các cây cầu lung linh ánh đèn và thưởng thức múa Chăm truyền thống.",
    "scope_text": "Đối diện số 34 Bạch Đằng, Hải Châu, Đà Nẵng",
    "official_source_url": "https://danang.gov.vn",
    "source_domain": "danang.gov.vn",
    "gateway_group": "DI_DAU",
    "primary_journey": "TIEN_ICH",
    "primary_journey_label": "Tiện Ích Công Cộng & Đô Thị",
    "content_type": "CIVIC_UTILITY",
    "tier_level": "TIER_3_UTILITY",
    "tier_badge": "📍 TIỆN ÍCH CÔNG CỘNG",
    "tier_badge_class": "tier-badge-utility",
    "copy_schema_level": "RADAR_OBSERVED",
    "terms_status": "UNKNOWN_AWAITING_TERMS_CAPTURE",
    "disclaimer_text": "dẫn tới cổng chính thức — điều kiện chưa đối soát",
    "specific_action_label": "📍 Xem thông tin & Maps →",
    "evidence_status": "Tiện ích công cộng: TP. Đà Nẵng",
    "visual_asset_url": "assets/images/board_a_afterglow_hero.svg",
    "asset_subject_id": null,
    "visual_attribution": null,
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "SLOT_EVENING",
    "transit_hint": "🚌 Gần tuyến xe buýt DanaBus R16 & Trạm xe đạp TNGO Bạch Đằng",
    "map_query_url": "https://www.google.com/maps/search/?api=1&query=B%E1%BA%BFn%20Du%20Thuy%E1%BB%81n%20S%C3%B4ng%20H%C3%A0n%20(Ng%E1%BA%AFm%20C%E1%BA%A7u%20%C4%90%C3%A0%20N%E1%BA%B5ng%20V%E1%BB%81%20%C4%90%C3%AAm)%20%C4%90%C3%A0%20N%E1%BA%B5ng",
    "leisure_category": "RIVERSIDE",
    "meal_moments": null,
    "subject_id": "PLACE_BEN_DU_THUYEN_SONG_HAN",
    "version": "v3.476.0-staging.ev",
    "verification_level": "PORTAL_IDENTITY_ONLY",
    "roster_status": "OFFICIAL_URL_DECLARED_PENDING_VAULT_CAPTURE",
    "cohort_classification": "COHORT_1_PUBLIC_TRANSIT",
    "customer_fact_summary": "Dẫn tới cổng thông tin chính thức của đơn vị vận hành.",
    "has_verified_field_fact": false,
    "verified_field_fact": null
  },
  {
    "item_id": "PLACE_TRUNG_TAM_VAN_HOA_DIEN_ANH",
    "brand": "Trung Tâm Văn Hóa TP",
    "title": "Trung Tâm Văn Hóa — Điện Ảnh TP. Đà Nẵng",
    "summary_text": "Tổ chức các buổi chiếu phim tài liệu, biểu diễn tuồng, hô hát bài chòi và các hoạt động văn hóa nghệ thuật.",
    "curation_story": "Tổ chức các buổi chiếu phim tài liệu, biểu diễn tuồng, hô hát bài chòi và các hoạt động văn hóa nghệ thuật.",
    "scope_text": "68 Trần Phú, Hải Châu, Đà Nẵng",
    "official_source_url": "https://danang.gov.vn",
    "source_domain": "danang.gov.vn",
    "gateway_group": "DI_DAU",
    "primary_journey": "TIEN_ICH",
    "primary_journey_label": "Tiện Ích Công Cộng & Đô Thị",
    "content_type": "CIVIC_UTILITY",
    "tier_level": "TIER_3_UTILITY",
    "tier_badge": "📍 TIỆN ÍCH CÔNG CỘNG",
    "tier_badge_class": "tier-badge-utility",
    "copy_schema_level": "RADAR_OBSERVED",
    "terms_status": "UNKNOWN_AWAITING_TERMS_CAPTURE",
    "disclaimer_text": "dẫn tới cổng chính thức — điều kiện chưa đối soát",
    "specific_action_label": "📍 Xem thông tin & Maps →",
    "evidence_status": "Tiện ích công cộng: TP. Đà Nẵng",
    "visual_asset_url": "assets/images/board_a_afterglow_hero.svg",
    "asset_subject_id": null,
    "visual_attribution": null,
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "SLOT_EVENING",
    "transit_hint": "🚌 Gần tuyến xe buýt DanaBus R16 & Trạm xe đạp TNGO Bạch Đằng",
    "map_query_url": "https://www.google.com/maps/search/?api=1&query=Trung%20T%C3%A2m%20V%C4%83n%20H%C3%B3a%20%E2%80%94%20%C4%90i%E1%BB%87n%20%E1%BA%A2nh%20TP.%20%C4%90%C3%A0%20N%E1%BA%B5ng%20%C4%90%C3%A0%20N%E1%BA%B5ng",
    "leisure_category": "CITY_EXPLORE",
    "meal_moments": null,
    "subject_id": "PLACE_TRUNG_TAM_VAN_HOA_DIEN_ANH",
    "version": "v3.476.0-staging.ev",
    "verification_level": "PORTAL_IDENTITY_ONLY",
    "roster_status": "OFFICIAL_URL_DECLARED_PENDING_VAULT_CAPTURE",
    "cohort_classification": "COHORT_1_PUBLIC_TRANSIT",
    "customer_fact_summary": "Dẫn tới cổng thông tin chính thức của đơn vị vận hành.",
    "has_verified_field_fact": false,
    "verified_field_fact": null
  },
  {
    "item_id": "RADAR_HIGHLANDS_COFFEE",
    "brand": "Highlands Coffee",
    "title": "Highlands Coffee: Kênh Giám Sát Nguồn Tin",
    "summary_text": "Theo dõi các thông tin phát hành chính thức từ ứng dụng di động Highlands Coffee.",
    "curation_story": "Theo dõi các thông tin phát hành chính thức từ ứng dụng di động Highlands Coffee.",
    "scope_text": "Các chi nhánh Highlands Coffee Đà Nẵng",
    "official_source_url": "https://highlandscoffee.com.vn",
    "source_domain": "highlandscoffee.com.vn",
    "gateway_group": "AN_GI",
    "primary_journey": "AN_GI",
    "primary_journey_label": "Ẩm Thực Đà Thành",
    "content_type": "PLACE_CULINARY",
    "tier_level": "TIER_4_RADAR",
    "tier_badge": "📡 KHÁM PHÁ BẢN ĐỊA",
    "tier_badge_class": "tier-badge-radar",
    "copy_schema_level": "RADAR_OBSERVED",
    "terms_status": "UNKNOWN_AWAITING_TERMS_CAPTURE",
    "disclaimer_text": "dẫn tới cổng chính thức — điều kiện chưa đối soát",
    "specific_action_label": "📍 Xem vị trí & chỉ đường →",
    "evidence_status": "Kênh theo dõi: highlandscoffee.com.vn",
    "visual_asset_url": "assets/images/board_a_afterglow_hero.svg",
    "asset_subject_id": null,
    "visual_attribution": null,
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
    "version": "v3.476.0-staging.ev",
    "verification_level": "PORTAL_IDENTITY_ONLY",
    "roster_status": "VAULT_ARTIFACT_MATCHED",
    "cohort_classification": "COHORT_4_CULINARY_RETAIL",
    "customer_fact_summary": "Chuỗi cà phê với nhiều chi nhánh tại Đà Nẵng — tra cứu địa chỉ và thực đơn trên cổng chính thức.",
    "has_verified_field_fact": false,
    "verified_field_fact": null
  },
  {
    "item_id": "RADAR_PHUC_LONG",
    "brand": "Phúc Long Tea",
    "title": "Phúc Long Coffee & Tea: Kênh Giám Sát Nguồn Tin",
    "summary_text": "Theo dõi chính sách thành viên và các thông báo mới từ thương hiệu Phúc Long.",
    "curation_story": "Theo dõi chính sách thành viên và các thông báo mới từ thương hiệu Phúc Long.",
    "scope_text": "Phúc Long Bạch Đằng & Nguyễn Văn Linh, Đà Nẵng",
    "official_source_url": "https://phuclong.com.vn",
    "source_domain": "phuclong.com.vn",
    "gateway_group": "AN_GI",
    "primary_journey": "AN_GI",
    "primary_journey_label": "Ẩm Thực Đà Thành",
    "content_type": "PLACE_CULINARY",
    "tier_level": "TIER_4_RADAR",
    "tier_badge": "📡 KHÁM PHÁ BẢN ĐỊA",
    "tier_badge_class": "tier-badge-radar",
    "copy_schema_level": "RADAR_OBSERVED",
    "terms_status": "UNKNOWN_AWAITING_TERMS_CAPTURE",
    "disclaimer_text": "dẫn tới cổng chính thức — điều kiện chưa đối soát",
    "specific_action_label": "📍 Xem vị trí & chỉ đường →",
    "evidence_status": "Kênh theo dõi: phuclong.com.vn",
    "visual_asset_url": "assets/images/board_a_afterglow_hero.svg",
    "asset_subject_id": null,
    "visual_attribution": null,
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
    "version": "v3.476.0-staging.ev",
    "verification_level": "PORTAL_IDENTITY_ONLY",
    "roster_status": "OFFICIAL_URL_DECLARED_PENDING_VAULT_CAPTURE",
    "cohort_classification": "COHORT_4_CULINARY_RETAIL",
    "customer_fact_summary": "Dẫn tới cổng thông tin chính thức của đơn vị vận hành.",
    "has_verified_field_fact": false,
    "verified_field_fact": null
  },
  {
    "item_id": "RADAR_VINCOM_PLAZA",
    "brand": "Vincom Plaza",
    "title": "Vincom Plaza Ngô Quyền: Kênh Giám Sát Sự Kiện",
    "summary_text": "Theo dõi các sự kiện trải nghiệm mua sắm và hoạt động văn hóa tại TTTM Vincom Plaza Đà Nẵng.",
    "curation_story": "Theo dõi các sự kiện trải nghiệm mua sắm và hoạt động văn hóa tại TTTM Vincom Plaza Đà Nẵng.",
    "scope_text": "910A Ngô Quyền, Sơn Trà, Đà Nẵng",
    "official_source_url": "https://vincom.com.vn",
    "source_domain": "vincom.com.vn",
    "gateway_group": "MUA_SAM",
    "primary_journey": "MUA_SAM",
    "primary_journey_label": "Cổng Chính Sách & Học Đường",
    "content_type": "COMMERCIAL_RADAR",
    "tier_level": "TIER_4_RADAR",
    "tier_badge": "📡 THEO DÕI NGUỒN TIN",
    "tier_badge_class": "tier-badge-radar",
    "copy_schema_level": "RADAR_OBSERVED",
    "terms_status": "UNKNOWN_AWAITING_TERMS_CAPTURE",
    "disclaimer_text": "dẫn tới cổng chính thức — điều kiện chưa đối soát",
    "specific_action_label": "📡 Theo dõi kênh →",
    "evidence_status": "Kênh theo dõi: vincom.com.vn",
    "visual_asset_url": "assets/images/board_a_afterglow_hero.svg",
    "asset_subject_id": null,
    "visual_attribution": null,
    "locality_tag": "SON_TRA",
    "time_slot_tag": "ALL_DAY",
    "transit_hint": "🚲 Gần trạm xe đạp TNGO Võ Nguyên Giáp & Cầu Rồng",
    "map_query_url": null,
    "leisure_category": null,
    "meal_moments": null,
    "subject_id": "RADAR_VINCOM_PLAZA",
    "version": "v3.476.0-staging.ev",
    "verification_level": "PORTAL_IDENTITY_ONLY",
    "roster_status": "OFFICIAL_URL_DECLARED_PENDING_VAULT_CAPTURE",
    "cohort_classification": "COHORT_3_EDUCATION_POLICY",
    "customer_fact_summary": "Dẫn tới cổng thông tin chính thức của đơn vị vận hành.",
    "has_verified_field_fact": false,
    "verified_field_fact": null
  },
  {
    "item_id": "RADAR_LOTTE_MART",
    "brand": "Lotte Mart",
    "title": "Lotte Mart Đà Nẵng: Kênh Giám Sát Siêu Thị",
    "summary_text": "Theo dõi cẩm nang hàng hóa tiêu dùng và chính sách hội viên Lotte Mart.",
    "curation_story": "Theo dõi cẩm nang hàng hóa tiêu dùng và chính sách hội viên Lotte Mart.",
    "scope_text": "Đường 2 Tháng 9, Hòa Cường Bắc, Hải Châu, Đà Nẵng",
    "official_source_url": "https://www.lottemart.vn",
    "source_domain": "www.lottemart.vn",
    "gateway_group": "MUA_SAM",
    "primary_journey": "MUA_SAM",
    "primary_journey_label": "Cổng Chính Sách & Học Đường",
    "content_type": "COMMERCIAL_RADAR",
    "tier_level": "TIER_4_RADAR",
    "tier_badge": "📡 THEO DÕI NGUỒN TIN",
    "tier_badge_class": "tier-badge-radar",
    "copy_schema_level": "RADAR_OBSERVED",
    "terms_status": "UNKNOWN_AWAITING_TERMS_CAPTURE",
    "disclaimer_text": "dẫn tới cổng chính thức — điều kiện chưa đối soát",
    "specific_action_label": "📡 Theo dõi kênh →",
    "evidence_status": "Kênh theo dõi: www.lottemart.vn",
    "visual_asset_url": "assets/images/board_a_afterglow_hero.svg",
    "asset_subject_id": null,
    "visual_attribution": null,
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "ALL_DAY",
    "transit_hint": "🚌 Gần tuyến xe buýt DanaBus R16 & Trạm xe đạp TNGO Bạch Đằng",
    "map_query_url": null,
    "leisure_category": null,
    "meal_moments": null,
    "subject_id": "RADAR_LOTTE_MART",
    "version": "v3.476.0-staging.ev",
    "verification_level": "PORTAL_IDENTITY_ONLY",
    "roster_status": "OFFICIAL_URL_DECLARED_PENDING_VAULT_CAPTURE",
    "cohort_classification": "COHORT_3_EDUCATION_POLICY",
    "customer_fact_summary": "Dẫn tới cổng thông tin chính thức của đơn vị vận hành.",
    "has_verified_field_fact": false,
    "verified_field_fact": null
  },
  {
    "item_id": "RADAR_BIGC_GO_DANANG",
    "brand": "GO! Đà Nẵng",
    "title": "GO! Đà Nẵng (Big C): Kênh Giám Sát Siêu Thị",
    "summary_text": "Theo dõi thông tin hàng hóa thiết yếu và cẩm nang mua sắm tại siêu thị GO! Đà Nẵng.",
    "curation_story": "Theo dõi thông tin hàng hóa thiết yếu và cẩm nang mua sắm tại siêu thị GO! Đà Nẵng.",
    "scope_text": "Vĩnh Trung Plaza, 255 Hùng Vương, Thanh Khê, Đà Nẵng",
    "official_source_url": "https://go-vietnam.vn",
    "source_domain": "go-vietnam.vn",
    "gateway_group": "MUA_SAM",
    "primary_journey": "MUA_SAM",
    "primary_journey_label": "Cổng Chính Sách & Học Đường",
    "content_type": "COMMERCIAL_RADAR",
    "tier_level": "TIER_4_RADAR",
    "tier_badge": "📡 THEO DÕI NGUỒN TIN",
    "tier_badge_class": "tier-badge-radar",
    "copy_schema_level": "RADAR_OBSERVED",
    "terms_status": "UNKNOWN_AWAITING_TERMS_CAPTURE",
    "disclaimer_text": "dẫn tới cổng chính thức — điều kiện chưa đối soát",
    "specific_action_label": "📡 Theo dõi kênh →",
    "evidence_status": "Kênh theo dõi: go-vietnam.vn",
    "visual_asset_url": "assets/images/board_a_afterglow_hero.svg",
    "asset_subject_id": null,
    "visual_attribution": null,
    "locality_tag": "THANH_KHE",
    "time_slot_tag": "ALL_DAY",
    "transit_hint": "🚌 Gần tuyến xe buýt DanaBus R6A & Trạm TNGO Điện Biên Phủ",
    "map_query_url": null,
    "leisure_category": null,
    "meal_moments": null,
    "subject_id": "RADAR_BIGC_GO_DANANG",
    "version": "v3.476.0-staging.ev",
    "verification_level": "PORTAL_IDENTITY_ONLY",
    "roster_status": "OFFICIAL_URL_DECLARED_PENDING_VAULT_CAPTURE",
    "cohort_classification": "COHORT_3_EDUCATION_POLICY",
    "customer_fact_summary": "Dẫn tới cổng thông tin chính thức của đơn vị vận hành.",
    "has_verified_field_fact": false,
    "verified_field_fact": null
  },
  {
    "item_id": "RADAR_KICHI_KICHI",
    "brand": "Kichi-Kichi",
    "title": "Kichi-Kichi Lẩu Băng Chuyền: Kênh Giám Sát Ẩm Thực",
    "summary_text": "Theo dõi các thông báo thực đơn và sự kiện trải nghiệm lẩu băng chuyền tại Đà Nẵng.",
    "curation_story": "Theo dõi các thông báo thực đơn và sự kiện trải nghiệm lẩu băng chuyền tại Đà Nẵng.",
    "scope_text": "Vincom & Nguyễn Văn Linh, Đà Nẵng",
    "official_source_url": "https://kichi.com.vn",
    "source_domain": "kichi.com.vn",
    "gateway_group": "AN_GI",
    "primary_journey": "AN_GI",
    "primary_journey_label": "Ẩm Thực Đà Thành",
    "content_type": "PLACE_CULINARY",
    "tier_level": "TIER_4_RADAR",
    "tier_badge": "📡 KHÁM PHÁ BẢN ĐỊA",
    "tier_badge_class": "tier-badge-radar",
    "copy_schema_level": "RADAR_OBSERVED",
    "terms_status": "UNKNOWN_AWAITING_TERMS_CAPTURE",
    "disclaimer_text": "dẫn tới cổng chính thức — điều kiện chưa đối soát",
    "specific_action_label": "📍 Xem vị trí & chỉ đường →",
    "evidence_status": "Kênh theo dõi: kichi.com.vn",
    "visual_asset_url": "assets/images/board_a_afterglow_hero.svg",
    "asset_subject_id": null,
    "visual_attribution": null,
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
    "version": "v3.476.0-staging.ev",
    "verification_level": "PORTAL_IDENTITY_ONLY",
    "roster_status": "OFFICIAL_URL_DECLARED_PENDING_VAULT_CAPTURE",
    "cohort_classification": "COHORT_4_CULINARY_RETAIL",
    "customer_fact_summary": "Dẫn tới cổng thông tin chính thức của đơn vị vận hành.",
    "has_verified_field_fact": false,
    "verified_field_fact": null
  },
  {
    "item_id": "RADAR_GOGI_HOUSE",
    "brand": "Gogi House",
    "title": "Gogi House: Kênh Giám Sát Ẩm Thực Nướng",
    "summary_text": "Theo dõi các thông báo thực đơn thịt nướng chuẩn vị Hàn Quốc tại hệ thống Gogi House Đà Nẵng.",
    "curation_story": "Theo dõi các thông báo thực đơn thịt nướng chuẩn vị Hàn Quốc tại hệ thống Gogi House Đà Nẵng.",
    "scope_text": "Nguyễn Tri Phương & Lotte Mart, Đà Nẵng",
    "official_source_url": "https://gogi.com.vn",
    "source_domain": "gogi.com.vn",
    "gateway_group": "AN_GI",
    "primary_journey": "AN_GI",
    "primary_journey_label": "Ẩm Thực Đà Thành",
    "content_type": "PLACE_CULINARY",
    "tier_level": "TIER_4_RADAR",
    "tier_badge": "📡 KHÁM PHÁ BẢN ĐỊA",
    "tier_badge_class": "tier-badge-radar",
    "copy_schema_level": "RADAR_OBSERVED",
    "terms_status": "UNKNOWN_AWAITING_TERMS_CAPTURE",
    "disclaimer_text": "dẫn tới cổng chính thức — điều kiện chưa đối soát",
    "specific_action_label": "📍 Xem vị trí & chỉ đường →",
    "evidence_status": "Kênh theo dõi: gogi.com.vn",
    "visual_asset_url": "assets/images/board_a_afterglow_hero.svg",
    "asset_subject_id": null,
    "visual_attribution": null,
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
    "version": "v3.476.0-staging.ev",
    "verification_level": "PORTAL_IDENTITY_ONLY",
    "roster_status": "OFFICIAL_URL_DECLARED_PENDING_VAULT_CAPTURE",
    "cohort_classification": "COHORT_4_CULINARY_RETAIL",
    "customer_fact_summary": "Dẫn tới cổng thông tin chính thức của đơn vị vận hành.",
    "has_verified_field_fact": false,
    "verified_field_fact": null
  },
  {
    "item_id": "RADAR_THE_COFFEE_HOUSE",
    "brand": "The Coffee House",
    "title": "The Coffee House: Kênh Giám Sát Nguồn Tin",
    "summary_text": "Theo dõi các thông báo thực đơn và tính năng ứng dụng The Coffee House.",
    "curation_story": "Theo dõi các thông báo thực đơn và tính năng ứng dụng The Coffee House.",
    "scope_text": "Nguyễn Văn Linh, Trần Phú, Pasteur Đà Nẵng",
    "official_source_url": "https://thecoffeehouse.com",
    "source_domain": "thecoffeehouse.com",
    "gateway_group": "AN_GI",
    "primary_journey": "AN_GI",
    "primary_journey_label": "Ẩm Thực Đà Thành",
    "content_type": "PLACE_CULINARY",
    "tier_level": "TIER_4_RADAR",
    "tier_badge": "📡 KHÁM PHÁ BẢN ĐỊA",
    "tier_badge_class": "tier-badge-radar",
    "copy_schema_level": "RADAR_OBSERVED",
    "terms_status": "UNKNOWN_AWAITING_TERMS_CAPTURE",
    "disclaimer_text": "dẫn tới cổng chính thức — điều kiện chưa đối soát",
    "specific_action_label": "📍 Xem vị trí & chỉ đường →",
    "evidence_status": "Kênh theo dõi: thecoffeehouse.com",
    "visual_asset_url": "assets/images/board_a_afterglow_hero.svg",
    "asset_subject_id": null,
    "visual_attribution": null,
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
    "version": "v3.476.0-staging.ev",
    "verification_level": "PORTAL_IDENTITY_ONLY",
    "roster_status": "OFFICIAL_URL_DECLARED_PENDING_VAULT_CAPTURE",
    "cohort_classification": "COHORT_4_CULINARY_RETAIL",
    "customer_fact_summary": "Dẫn tới cổng thông tin chính thức của đơn vị vận hành.",
    "has_verified_field_fact": false,
    "verified_field_fact": null
  },
  {
    "item_id": "RADAR_TRUNG_NGUYEN_LEGEND",
    "brand": "Trung Nguyên Legend",
    "title": "Trung Nguyên Legend: Kênh Giám Sát Không Gian",
    "summary_text": "Theo dõi các không gian cà phê và hoạt động văn hóa đọc bên bờ sông Hàn.",
    "curation_story": "Theo dõi các không gian cà phê và hoạt động văn hóa đọc bên bờ sông Hàn.",
    "scope_text": "Bạch Đằng, Nguyễn Thị Minh Khai, Đà Nẵng",
    "official_source_url": "https://trungnguyenlegend.com",
    "source_domain": "trungnguyenlegend.com",
    "gateway_group": "AN_GI",
    "primary_journey": "AN_GI",
    "primary_journey_label": "Ẩm Thực Đà Thành",
    "content_type": "PLACE_CULINARY",
    "tier_level": "TIER_4_RADAR",
    "tier_badge": "📡 KHÁM PHÁ BẢN ĐỊA",
    "tier_badge_class": "tier-badge-radar",
    "copy_schema_level": "RADAR_OBSERVED",
    "terms_status": "UNKNOWN_AWAITING_TERMS_CAPTURE",
    "disclaimer_text": "dẫn tới cổng chính thức — điều kiện chưa đối soát",
    "specific_action_label": "📍 Xem vị trí & chỉ đường →",
    "evidence_status": "Kênh theo dõi: trungnguyenlegend.com",
    "visual_asset_url": "assets/images/board_a_afterglow_hero.svg",
    "asset_subject_id": null,
    "visual_attribution": null,
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
    "version": "v3.476.0-staging.ev",
    "verification_level": "PORTAL_IDENTITY_ONLY",
    "roster_status": "OFFICIAL_URL_DECLARED_PENDING_VAULT_CAPTURE",
    "cohort_classification": "COHORT_4_CULINARY_RETAIL",
    "customer_fact_summary": "Dẫn tới cổng thông tin chính thức của đơn vị vận hành.",
    "has_verified_field_fact": false,
    "verified_field_fact": null
  },
  {
    "item_id": "RADAR_MIXUE_DANANG",
    "brand": "Mixue Vietnam",
    "title": "Mixue Đà Nẵng: Kênh Giám Sát Đồ Uống",
    "summary_text": "Theo dõi các thông tin thực đơn và hoạt động tại các chi nhánh Mixue Đà Nẵng.",
    "curation_story": "Theo dõi các thông tin thực đơn và hoạt động tại các chi nhánh Mixue Đà Nẵng.",
    "scope_text": "Các cơ sở Mixue gần cổng trường học Đà Nẵng",
    "official_source_url": "https://mxbc.vn",
    "source_domain": "mxbc.vn",
    "gateway_group": "AN_GI",
    "primary_journey": "AN_GI",
    "primary_journey_label": "Ẩm Thực Đà Thành",
    "content_type": "PLACE_CULINARY",
    "tier_level": "TIER_4_RADAR",
    "tier_badge": "📡 KHÁM PHÁ BẢN ĐỊA",
    "tier_badge_class": "tier-badge-radar",
    "copy_schema_level": "RADAR_OBSERVED",
    "terms_status": "UNKNOWN_AWAITING_TERMS_CAPTURE",
    "disclaimer_text": "dẫn tới cổng chính thức — điều kiện chưa đối soát",
    "specific_action_label": "📍 Xem vị trí & chỉ đường →",
    "evidence_status": "Kênh theo dõi: mxbc.vn",
    "visual_asset_url": "assets/images/board_a_afterglow_hero.svg",
    "asset_subject_id": null,
    "visual_attribution": null,
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
    "version": "v3.476.0-staging.ev",
    "verification_level": "PORTAL_IDENTITY_ONLY",
    "roster_status": "OFFICIAL_URL_DECLARED_PENDING_VAULT_CAPTURE",
    "cohort_classification": "COHORT_4_CULINARY_RETAIL",
    "customer_fact_summary": "Dẫn tới cổng thông tin chính thức của đơn vị vận hành.",
    "has_verified_field_fact": false,
    "verified_field_fact": null
  },
  {
    "item_id": "RADAR_CGV_VINCOM_SCHEDULE",
    "brand": "CGV Cinemas",
    "title": "CGV Vincom Đà Nẵng: Kênh Giám Sát Lịch Chiếu",
    "summary_text": "Theo dõi lịch phát hành phim và các suất chiếu sớm tại rạp CGV Vincom Đà Nẵng.",
    "curation_story": "Theo dõi lịch phát hành phim và các suất chiếu sớm tại rạp CGV Vincom Đà Nẵng.",
    "scope_text": "Tầng 4 Vincom Plaza, Ngô Quyền, Sơn Trà, Đà Nẵng",
    "official_source_url": "https://www.cgv.vn",
    "source_domain": "www.cgv.vn",
    "gateway_group": "DI_DAU",
    "primary_journey": "DI_DAU",
    "primary_journey_label": "Đi Chơi & Rạp Chiếu",
    "content_type": "COMMERCIAL_RADAR",
    "tier_level": "TIER_4_RADAR",
    "tier_badge": "📡 THEO DÕI NGUỒN TIN",
    "tier_badge_class": "tier-badge-radar",
    "copy_schema_level": "RADAR_OBSERVED",
    "terms_status": "UNKNOWN_AWAITING_TERMS_CAPTURE",
    "disclaimer_text": "dẫn tới cổng chính thức — điều kiện chưa đối soát",
    "specific_action_label": "📡 Theo dõi kênh →",
    "evidence_status": "Kênh theo dõi: www.cgv.vn",
    "visual_asset_url": "assets/images/board_a_afterglow_hero.svg",
    "asset_subject_id": null,
    "visual_attribution": null,
    "locality_tag": "SON_TRA",
    "time_slot_tag": "SLOT_EVENING",
    "transit_hint": "🚲 Gần trạm xe đạp TNGO Võ Nguyên Giáp & Cầu Rồng",
    "map_query_url": "https://www.google.com/maps/search/?api=1&query=CGV%20Vincom%20%C4%90%C3%A0%20N%E1%BA%B5ng%3A%20K%C3%AAnh%20Gi%C3%A1m%20S%C3%A1t%20L%E1%BB%8Bch%20Chi%E1%BA%BFu%20%C4%90%C3%A0%20N%E1%BA%B5ng",
    "leisure_category": "CINEMA",
    "meal_moments": null,
    "subject_id": "RADAR_CGV_VINCOM_SCHEDULE",
    "version": "v3.476.0-staging.ev",
    "verification_level": "PORTAL_IDENTITY_ONLY",
    "roster_status": "OFFICIAL_URL_DECLARED_PENDING_VAULT_CAPTURE",
    "cohort_classification": "COHORT_2_CINEMA_CULTURE",
    "customer_fact_summary": "Dẫn tới cổng thông tin chính thức của đơn vị vận hành.",
    "has_verified_field_fact": false,
    "verified_field_fact": null
  },
  {
    "item_id": "RADAR_GALAXY_DIEN_BIEN_PHU",
    "brand": "Galaxy Cinema",
    "title": "Galaxy Điện Biên Phủ: Kênh Giám Sát Lịch Chiếu",
    "summary_text": "Theo dõi thông tin lịch chiếu và trải nghiệm rạp phim tại Galaxy Điện Biên Phủ Đà Nẵng.",
    "curation_story": "Theo dõi thông tin lịch chiếu và trải nghiệm rạp phim tại Galaxy Điện Biên Phủ Đà Nẵng.",
    "scope_text": "478 Điện Biên Phủ, Thanh Khê, Đà Nẵng",
    "official_source_url": "https://www.galaxycine.vn",
    "source_domain": "www.galaxycine.vn",
    "gateway_group": "DI_DAU",
    "primary_journey": "DI_DAU",
    "primary_journey_label": "Đi Chơi & Rạp Chiếu",
    "content_type": "COMMERCIAL_RADAR",
    "tier_level": "TIER_4_RADAR",
    "tier_badge": "📡 THEO DÕI NGUỒN TIN",
    "tier_badge_class": "tier-badge-radar",
    "copy_schema_level": "RADAR_OBSERVED",
    "terms_status": "UNKNOWN_AWAITING_TERMS_CAPTURE",
    "disclaimer_text": "dẫn tới cổng chính thức — điều kiện chưa đối soát",
    "specific_action_label": "📡 Theo dõi kênh →",
    "evidence_status": "Kênh theo dõi: www.galaxycine.vn",
    "visual_asset_url": "assets/images/board_a_afterglow_hero.svg",
    "asset_subject_id": null,
    "visual_attribution": null,
    "locality_tag": "THANH_KHE",
    "time_slot_tag": "SLOT_EVENING",
    "transit_hint": "🚌 Gần tuyến xe buýt DanaBus R6A & Trạm TNGO Điện Biên Phủ",
    "map_query_url": "https://www.google.com/maps/search/?api=1&query=Galaxy%20%C4%90i%E1%BB%87n%20Bi%C3%AAn%20Ph%E1%BB%A7%3A%20K%C3%AAnh%20Gi%C3%A1m%20S%C3%A1t%20L%E1%BB%8Bch%20Chi%E1%BA%BFu%20%C4%90%C3%A0%20N%E1%BA%B5ng",
    "leisure_category": "CITY_EXPLORE",
    "meal_moments": null,
    "subject_id": "RADAR_GALAXY_DIEN_BIEN_PHU",
    "version": "v3.476.0-staging.ev",
    "verification_level": "PORTAL_IDENTITY_ONLY",
    "roster_status": "OFFICIAL_URL_DECLARED_PENDING_VAULT_CAPTURE",
    "cohort_classification": "COHORT_2_CINEMA_CULTURE",
    "customer_fact_summary": "Dẫn tới cổng thông tin chính thức của đơn vị vận hành.",
    "has_verified_field_fact": false,
    "verified_field_fact": null
  },
  {
    "item_id": "RADAR_CGV_VINH_TRUNG_PLAZA",
    "brand": "CGV Cinemas",
    "title": "CGV Vĩnh Trung Plaza: Kênh Giám Sát Lịch Chiếu",
    "summary_text": "Theo dõi các suất chiếu ngày trong tuần và sự kiện điện ảnh tại CGV Vĩnh Trung Đà Nẵng.",
    "curation_story": "Theo dõi các suất chiếu ngày trong tuần và sự kiện điện ảnh tại CGV Vĩnh Trung Đà Nẵng.",
    "scope_text": "255 Hùng Vương, Thanh Khê, Đà Nẵng",
    "official_source_url": "https://www.cgv.vn",
    "source_domain": "www.cgv.vn",
    "gateway_group": "DI_DAU",
    "primary_journey": "DI_DAU",
    "primary_journey_label": "Đi Chơi & Rạp Chiếu",
    "content_type": "COMMERCIAL_RADAR",
    "tier_level": "TIER_4_RADAR",
    "tier_badge": "📡 THEO DÕI NGUỒN TIN",
    "tier_badge_class": "tier-badge-radar",
    "copy_schema_level": "RADAR_OBSERVED",
    "terms_status": "UNKNOWN_AWAITING_TERMS_CAPTURE",
    "disclaimer_text": "dẫn tới cổng chính thức — điều kiện chưa đối soát",
    "specific_action_label": "📡 Theo dõi kênh →",
    "evidence_status": "Kênh theo dõi: www.cgv.vn",
    "visual_asset_url": "assets/images/board_a_afterglow_hero.svg",
    "asset_subject_id": null,
    "visual_attribution": null,
    "locality_tag": "THANH_KHE",
    "time_slot_tag": "SLOT_AFTERNOON",
    "transit_hint": "🚌 Gần tuyến xe buýt DanaBus R6A & Trạm TNGO Điện Biên Phủ",
    "map_query_url": "https://www.google.com/maps/search/?api=1&query=CGV%20V%C4%A9nh%20Trung%20Plaza%3A%20K%C3%AAnh%20Gi%C3%A1m%20S%C3%A1t%20L%E1%BB%8Bch%20Chi%E1%BA%BFu%20%C4%90%C3%A0%20N%E1%BA%B5ng",
    "leisure_category": "CINEMA",
    "meal_moments": null,
    "subject_id": "RADAR_CGV_VINH_TRUNG_PLAZA",
    "version": "v3.476.0-staging.ev",
    "verification_level": "PORTAL_IDENTITY_ONLY",
    "roster_status": "OFFICIAL_URL_DECLARED_PENDING_VAULT_CAPTURE",
    "cohort_classification": "COHORT_2_CINEMA_CULTURE",
    "customer_fact_summary": "Dẫn tới cổng thông tin chính thức của đơn vị vận hành.",
    "has_verified_field_fact": false,
    "verified_field_fact": null
  },
  {
    "item_id": "RADAR_HELIO_CENTER_WEEKEND",
    "brand": "Helio Center",
    "title": "Helio Center: Kênh Giám Sát Sự Kiện Đô Thị",
    "summary_text": "Theo dõi các đêm nhạc Acoustic, không gian ẩm thực đêm và tổ hợp vui chơi giải trí Helio Đà Nẵng.",
    "curation_story": "Theo dõi các đêm nhạc Acoustic, không gian ẩm thực đêm và tổ hợp vui chơi giải trí Helio Đà Nẵng.",
    "scope_text": "Đường 2 Tháng 9, Hòa Cường Nam, Hải Châu, Đà Nẵng",
    "official_source_url": "https://helio.vn",
    "source_domain": "helio.vn",
    "gateway_group": "DI_DAU",
    "primary_journey": "DI_DAU",
    "primary_journey_label": "Đi Chơi & Rạp Chiếu",
    "content_type": "COMMERCIAL_RADAR",
    "tier_level": "TIER_4_RADAR",
    "tier_badge": "📡 THEO DÕI NGUỒN TIN",
    "tier_badge_class": "tier-badge-radar",
    "copy_schema_level": "RADAR_OBSERVED",
    "terms_status": "UNKNOWN_AWAITING_TERMS_CAPTURE",
    "disclaimer_text": "dẫn tới cổng chính thức — điều kiện chưa đối soát",
    "specific_action_label": "📡 Theo dõi kênh →",
    "evidence_status": "Kênh theo dõi: helio.vn",
    "visual_asset_url": "assets/images/board_a_afterglow_hero.svg",
    "asset_subject_id": null,
    "visual_attribution": null,
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "SLOT_EVENING",
    "transit_hint": "🚌 Gần tuyến xe buýt DanaBus R16 & Trạm xe đạp TNGO Bạch Đằng",
    "map_query_url": "https://www.google.com/maps/search/?api=1&query=Helio%20Center%3A%20K%C3%AAnh%20Gi%C3%A1m%20S%C3%A1t%20S%E1%BB%B1%20Ki%E1%BB%87n%20%C4%90%C3%B4%20Th%E1%BB%8B%20%C4%90%C3%A0%20N%E1%BA%B5ng",
    "leisure_category": "CITY_EXPLORE",
    "meal_moments": null,
    "subject_id": "RADAR_HELIO_CENTER_WEEKEND",
    "version": "v3.476.0-staging.ev",
    "verification_level": "PORTAL_IDENTITY_ONLY",
    "roster_status": "OFFICIAL_URL_DECLARED_PENDING_VAULT_CAPTURE",
    "cohort_classification": "COHORT_2_CINEMA_CULTURE",
    "customer_fact_summary": "Dẫn tới cổng thông tin chính thức của đơn vị vận hành.",
    "has_verified_field_fact": false,
    "verified_field_fact": null
  }
];

  // 2. VALUE LAYER LEDGER (13 FAIL-CLOSED ENTRIES EA)
  const JAYT_WALLET_ENTRIES = [
  {
    "entry_id": "VAL_GITHUB_STUDENT",
    "lane": "LANE_CONG_CHINH_THUC",
    "lane_badge": "🏛️ CỔNG THÔNG TIN CHÍNH THỨC",
    "category": "STUDY_TOOLS",
    "merchant_name": "GitHub Education",
    "title": "GitHub Education: Cổng Chương Trình Học Đường",
    "service_description": "Cổng tiếp nhận hồ sơ học đường chính thức của GitHub. JayT chưa đối soát danh mục gói và điều kiện chi tiết.",
    "target_audience": "Học sinh, sinh viên các trường đại học/cao đẳng có email trường học hoặc thẻ sinh viên.",
    "official_portal_guide": "Mở cổng chính thức education.github.com để tự kiểm tra điều kiện áp dụng trước khi đăng ký.",
    "official_source_url": "https://education.github.com/pack",
    "action_button_label": "🏛️ Mở cổng chính thức để kiểm tra điều kiện →",
    "evidence_status": "Chương trình chính thức — kiểm điều kiện tại nguồn: education.github.com",
    "disclaimer": "dẫn tới cổng chính thức — điều kiện chưa đối soát",
    "verification_level": "PORTAL_IDENTITY_ONLY"
  },
  {
    "entry_id": "VAL_NOTION_EDU",
    "lane": "LANE_CONG_CHINH_THUC",
    "lane_badge": "🏛️ CỔNG THÔNG TIN CHÍNH THỨC",
    "category": "STUDY_TOOLS",
    "merchant_name": "Notion",
    "title": "Notion: Cổng Chương Trình Học Đường",
    "service_description": "Cổng hỗ trợ học đường chính thức từ Notion. JayT chưa đối soát điều kiện nâng cấp tài khoản.",
    "target_audience": "Học sinh, sinh viên và giảng viên có email tên miền giáo dục (.edu hoặc trường học).",
    "official_portal_guide": "Mở cổng chính thức notion.so để tự kiểm tra quy chế học đường trước khi đăng ký.",
    "official_source_url": "https://www.notion.so/product/notion-for-education",
    "action_button_label": "🏛️ Mở cổng chính thức để kiểm tra điều kiện →",
    "evidence_status": "Chương trình chính thức — kiểm điều kiện tại nguồn: www.notion.so",
    "disclaimer": "dẫn tới cổng chính thức — điều kiện chưa đối soát",
    "verification_level": "PORTAL_IDENTITY_ONLY"
  },
  {
    "entry_id": "VAL_CANVA_EDU",
    "lane": "LANE_CONG_CHINH_THUC",
    "lane_badge": "🏛️ CỔNG THÔNG TIN CHÍNH THỨC",
    "category": "STUDY_TOOLS",
    "merchant_name": "Canva Education",
    "title": "Canva: Cổng Chương Trình Giáo Dục",
    "service_description": "Cổng thông tin học đường chính thức từ Canva. JayT chưa đối soát phương thức xác thực trường.",
    "target_audience": "Giáo viên và học sinh sinh viên tại các cơ sở giáo dục đã được cấp phép.",
    "official_portal_guide": "Mở cổng chính thức canva.com để tự kiểm tra quy chế áp dụng trước khi đăng ký.",
    "official_source_url": "https://www.canva.com/education/",
    "action_button_label": "🏛️ Mở cổng chính thức để kiểm tra điều kiện →",
    "evidence_status": "Chương trình chính thức — kiểm điều kiện tại nguồn: www.canva.com",
    "disclaimer": "dẫn tới cổng chính thức — điều kiện chưa đối soát",
    "verification_level": "PORTAL_IDENTITY_ONLY"
  },
  {
    "entry_id": "VAL_DANABUS_PASS",
    "lane": "LANE_CONG_CHINH_THUC",
    "lane_badge": "🏛️ CỔNG THÔNG TIN CHÍNH THỨC",
    "category": "TRANSPORT",
    "merchant_name": "DanaBus Đà Nẵng",
    "title": "DanaBus: Mạng Lưới Xe Buýt Trợ Giá Đà Nẵng",
    "service_description": "Mạng lưới xe buýt trợ giá nội thành Đà Nẵng. JayT chưa đối soát biểu giá vé tháng cụ thể.",
    "target_audience": "Học sinh các trường phổ thông, sinh viên các trường đại học, cao đẳng tại Đà Nẵng.",
    "official_portal_guide": "Mở cổng danangbus.vn hoặc liên hệ điểm bán vé để kiểm tra biểu giá và thủ tục làm thẻ.",
    "official_source_url": "https://danangbus.vn",
    "action_button_label": "🏛️ Mở cổng chính thức để kiểm tra điều kiện →",
    "evidence_status": "Chương trình chính thức — kiểm điều kiện tại nguồn: danangbus.vn",
    "disclaimer": "dẫn tới cổng chính thức — điều kiện chưa đối soát",
    "verification_level": "PORTAL_IDENTITY_ONLY"
  },
  {
    "entry_id": "VAL_CGV_CINEMAS",
    "lane": "LANE_CONG_CHINH_THUC",
    "lane_badge": "🏛️ CỔNG THÔNG TIN CHÍNH THỨC",
    "category": "ENTERTAINMENT",
    "merchant_name": "CGV Cinemas Đà Nẵng",
    "title": "CGV Cinemas: Cụm Rạp Chiếu Phim Đà Nẵng",
    "service_description": "Tra cứu lịch chiếu tại các cụm rạp CGV Đà Nẵng. JayT chưa đối soát giá vé niêm yết.",
    "target_audience": "Khán giả xem phim tại CGV Vincom Ngô Quyền và CGV Vĩnh Trung Plaza.",
    "official_portal_guide": "Mở website chính thức cgv.vn để tự kiểm tra giá vé và suất chiếu tiêu chuẩn.",
    "official_source_url": "https://www.cgv.vn",
    "action_button_label": "🏛️ Mở cổng chính thức để kiểm tra điều kiện →",
    "evidence_status": "Chương trình chính thức — kiểm điều kiện tại nguồn: www.cgv.vn",
    "disclaimer": "dẫn tới cổng chính thức — điều kiện chưa đối soát",
    "verification_level": "PORTAL_IDENTITY_ONLY"
  },
  {
    "entry_id": "VAL_DOMINOS_PIZZA",
    "lane": "LANE_CONG_CHINH_THUC",
    "lane_badge": "🏛️ CỔNG THÔNG TIN CHÍNH THỨC",
    "category": "FOOD_BEVERAGE",
    "merchant_name": "Domino's Pizza Đà Nẵng",
    "title": "Domino's Pizza: Cổng Thông Tin Chi Nhánh Đà Nẵng",
    "service_description": "Mạng lưới chi nhánh Domino's Pizza tại Đà Nẵng. JayT chưa đối soát bảng giá thực đơn.",
    "target_audience": "Khách hàng dùng bữa tại cửa hàng hoặc đặt giao hàng qua kênh chính thức.",
    "official_portal_guide": "Mở website dominos.vn để kiểm tra danh mục món và bảng giá hiện hành.",
    "official_source_url": "https://dominos.vn",
    "action_button_label": "🏛️ Mở cổng chính thức để kiểm tra điều kiện →",
    "evidence_status": "Chương trình chính thức — kiểm điều kiện tại nguồn: dominos.vn",
    "disclaimer": "dẫn tới cổng chính thức — điều kiện chưa đối soát",
    "verification_level": "PORTAL_IDENTITY_ONLY"
  },
  {
    "entry_id": "VAL_LOTTERIA",
    "lane": "LANE_CONG_CHINH_THUC",
    "lane_badge": "🏛️ CỔNG THÔNG TIN CHÍNH THỨC",
    "category": "FOOD_BEVERAGE",
    "merchant_name": "Lotteria Đà Nẵng",
    "title": "Lotteria: Cổng Thông Tin Chi Nhánh Đà Nẵng",
    "service_description": "Hệ thống chi nhánh Lotteria tại Đà Nẵng. JayT chưa đối soát bảng giá thực đơn và phụ phí.",
    "target_audience": "Khách hàng ăn trưa tại chỗ trong khung giờ từ 10h00 đến 14h00 từ Thứ 2 đến Thứ 6.",
    "official_portal_guide": "Kiểm tra thực đơn niêm yết tại quầy gọi món ở các cửa hàng Lotteria.",
    "official_source_url": "https://www.lotteria.vn",
    "action_button_label": "🏛️ Mở cổng chính thức để kiểm tra điều kiện →",
    "evidence_status": "Chương trình chính thức — kiểm điều kiện tại nguồn: www.lotteria.vn",
    "disclaimer": "dẫn tới cổng chính thức — điều kiện chưa đối soát",
    "verification_level": "PORTAL_IDENTITY_ONLY"
  },
  {
    "entry_id": "VAL_METIZ_CINEMA",
    "lane": "LANE_CONG_CHINH_THUC",
    "lane_badge": "🏛️ CỔNG THÔNG TIN CHÍNH THỨC",
    "category": "ENTERTAINMENT",
    "merchant_name": "Metiz Cinema",
    "title": "Metiz Cinema: Cổng Thông Tin Rạp Helio Đà Nẵng",
    "service_description": "Rạp chiếu phim Metiz Cinema tại Helio Center Đà Nẵng. JayT chưa đối soát quy chế độ tuổi và vé.",
    "target_audience": "Khán giả từ 22 tuổi trở xuống (xuất trình CCCD hoặc thẻ HSSV).",
    "official_portal_guide": "Mở website metiz.vn hoặc mua vé trực tiếp tại quầy rạp Metiz Cinema Đà Nẵng.",
    "official_source_url": "https://metiz.vn",
    "action_button_label": "🏛️ Mở cổng chính thức để kiểm tra điều kiện →",
    "evidence_status": "Chương trình chính thức — kiểm điều kiện tại nguồn: metiz.vn",
    "disclaimer": "dẫn tới cổng chính thức — điều kiện chưa đối soát",
    "verification_level": "PORTAL_IDENTITY_ONLY"
  },
  {
    "entry_id": "VAL_STARLIGHT_CINEMA",
    "lane": "LANE_CONG_CHINH_THUC",
    "lane_badge": "🏛️ CỔNG THÔNG TIN CHÍNH THỨC",
    "category": "ENTERTAINMENT",
    "merchant_name": "Starlight Cinema Đà Nẵng",
    "title": "Starlight Cinema: Cổng Thông Tin Cụm Rạp Đà Nẵng",
    "service_description": "Cụm rạp Starlight tại tòa nhà Nguyễn Kim Đà Nẵng. JayT chưa đối soát chính sách thành viên.",
    "target_audience": "Thành viên đăng ký tài khoản tại cụm rạp Starlight.",
    "official_portal_guide": "Mở website starlight.vn để kiểm tra lịch chiếu và quy chế thành viên.",
    "official_source_url": "https://starlight.vn",
    "action_button_label": "🏛️ Mở cổng chính thức để kiểm tra điều kiện →",
    "evidence_status": "Chương trình chính thức — kiểm điều kiện tại nguồn: starlight.vn",
    "disclaimer": "dẫn tới cổng chính thức — điều kiện chưa đối soát",
    "verification_level": "PORTAL_IDENTITY_ONLY"
  },
  {
    "entry_id": "VAL_TNGO_BIKE",
    "lane": "LANE_CONG_CHINH_THUC",
    "lane_badge": "🏛️ CỔNG THÔNG TIN CHÍNH THỨC",
    "category": "TRANSPORT",
    "merchant_name": "TNGO Đà Nẵng",
    "title": "TNGO: Hệ Thống Xe Đạp Công Cộng TP. Đà Nẵng",
    "service_description": "Mạng lưới xe đạp đô thị tại TP. Đà Nẵng. JayT chưa đối soát biểu giá cước thuê xe.",
    "target_audience": "Người dân và du khách sử dụng điện thoại thông minh kết nối ứng dụng TNGO.",
    "official_portal_guide": "Mở ứng dụng hoặc website tngo.vn để kiểm tra biểu phí và quy chế thuê xe đạp.",
    "official_source_url": "https://tngo.vn",
    "action_button_label": "🏛️ Mở cổng chính thức để kiểm tra điều kiện →",
    "evidence_status": "Chương trình chính thức — kiểm điều kiện tại nguồn: tngo.vn",
    "disclaimer": "dẫn tới cổng chính thức — điều kiện chưa đối soát",
    "verification_level": "PORTAL_IDENTITY_ONLY"
  },
  {
    "entry_id": "VAL_HIGHLANDS_RADAR",
    "lane": "LANE_THEO_DOI",
    "lane_badge": "📡 KÊNH GIÁM SÁT NGUỒN TIN",
    "category": "FOOD_BEVERAGE",
    "merchant_name": "Highlands Coffee",
    "title": "Highlands Coffee: Kênh Giám Sát Nguồn Tin",
    "service_description": "Kênh theo dõi bảng tin từ Highlands Coffee. Kênh đang trong diện theo dõi nguồn tin.",
    "target_audience": "Người dùng ứng dụng Highlands Coffee trên toàn quốc.",
    "official_portal_guide": "Mở ứng dụng hoặc website highlandscoffee.com.vn để theo dõi thông báo mới.",
    "official_source_url": "https://highlandscoffee.com.vn",
    "action_button_label": "📡 Theo dõi kênh chính thức →",
    "evidence_status": "Kênh theo dõi thông tin: highlandscoffee.com.vn",
    "disclaimer": "dẫn tới cổng chính thức — điều kiện chưa đối soát",
    "verification_level": "PORTAL_IDENTITY_ONLY"
  },
  {
    "entry_id": "VAL_PHUCLONG_RADAR",
    "lane": "LANE_THEO_DOI",
    "lane_badge": "📡 KÊNH GIÁM SÁT NGUỒN TIN",
    "category": "FOOD_BEVERAGE",
    "merchant_name": "Phúc Long Coffee & Tea",
    "title": "Phúc Long: Kênh Giám Sát Nguồn Tin",
    "service_description": "Kênh theo dõi bảng tin từ Phúc Long Đà Nẵng. Kênh đang trong diện theo dõi nguồn tin.",
    "target_audience": "Hội viên có thẻ tích điểm Phúc Long.",
    "official_portal_guide": "Mở website phuclong.com.vn để theo dõi các cập nhật thông tin chính thức.",
    "official_source_url": "https://phuclong.com.vn",
    "action_button_label": "📡 Theo dõi kênh chính thức →",
    "evidence_status": "Kênh theo dõi thông tin: phuclong.com.vn",
    "disclaimer": "dẫn tới cổng chính thức — điều kiện chưa đối soát",
    "verification_level": "PORTAL_IDENTITY_ONLY"
  },
  {
    "entry_id": "VAL_VINCOM_RADAR",
    "lane": "LANE_THEO_DOI",
    "lane_badge": "📡 KÊNH GIÁM SÁT NGUỒN TIN",
    "category": "SHOPPING",
    "merchant_name": "Vincom Plaza Ngô Quyền",
    "title": "Vincom Plaza Đà Nẵng: Kênh Giám Sát Sự Kiện",
    "service_description": "Kênh theo dõi thông tin tại TTTM Vincom Plaza Ngô Quyền Đà Nẵng.",
    "target_audience": "Khách hàng tham quan và mua sắm tại TTTM Vincom Đà Nẵng.",
    "official_portal_guide": "Mở website vincom.com.vn để theo dõi lịch sự kiện và hoạt động tại trung tâm.",
    "official_source_url": "https://vincom.com.vn",
    "action_button_label": "📡 Theo dõi kênh chính thức →",
    "evidence_status": "Kênh theo dõi thông tin: vincom.com.vn",
    "disclaimer": "dẫn tới cổng chính thức — điều kiện chưa đối soát",
    "verification_level": "PORTAL_IDENTITY_ONLY"
  }
];
// 3. SINGLE SOURCE OF COUNT INVARIANT
  function computeSingleSourceOfCount(items) {
    const anGi = items.filter(i => i.primary_journey === 'AN_GI');
    const diDau = items.filter(i => i.primary_journey === 'DI_DAU');
    const tienIch = items.filter(i => i.primary_journey === 'TIEN_ICH');
    const muaSam = items.filter(i => i.primary_journey === 'MUA_SAM');

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

  // SECTION EV: SITUATIONAL ROUTE & CAMPUS ZONE STATE
  let activeSituationalRoute = 'ALL'; // 'ALL' | 'AN_GI_GAN_DAY' | 'DI_CHOI_TOI_NAY' | 'DI_CHUYEN_TIET_KIEM' | 'DO_KTX_HOC_TAP'
  let activeTimeSlot = 'ALL'; // 'ALL' | 'SANG' | 'TRUA' | 'CHIEU' | 'TOI'
  let activeCampusZone = 'ALL'; // 'ALL' | 'HOA_KHANH' | 'NGU_HANH_SON' | 'HAI_CHAU' | 'THANH_KHE' | 'SON_TRA'
  let activeVoucherLane = 'ALL'; // 'ALL' | 'LANE_A' | 'LANE_B' | 'LANE_C'


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
  
  // 2. DAILY DISCOVERY HOME VIEW (SECTION EV: DEAL DISCOVERY ENGINE & 4 SITUATIONAL ROUTES)
  function renderDailyGuideHome() {
    const timeInfo = getCurrentTimeSlotInfo();
    const stats = getJourneyStats(JAYT_DISCOVERY_ITEMS);

    // Filter items according to ES Situational Discovery Engine
    const discoveryFiltered = JAYT_DISCOVERY_ITEMS.filter(item => {
      // 1. Situational Route Filter
      if (activeSituationalRoute === 'AN_GI_GAN_DAY' && item.primary_journey !== 'AN_GI') return false;
      if (activeSituationalRoute === 'DI_CHOI_TOI_NAY' && item.primary_journey !== 'DI_DAU') return false;
      if (activeSituationalRoute === 'DI_CHUYEN_TIET_KIEM' && item.primary_journey !== 'TIEN_ICH') return false;
      if (activeSituationalRoute === 'DO_KTX_HOC_TAP' && item.primary_journey !== 'MUA_SAM') return false;

      // 2. Time Slot Filter
      if (activeTimeSlot !== 'ALL') {
        if (item.meal_moments && Array.isArray(item.meal_moments)) {
          if (!item.meal_moments.includes(activeTimeSlot)) return false;
        } else if (item.time_slot_tag) {
          if (activeTimeSlot === 'SANG' && !['ALL_DAY', 'SLOT_MORNING', 'SLOT_BREAKFAST'].includes(item.time_slot_tag)) return false;
          if (activeTimeSlot === 'TRUA' && !['ALL_DAY', 'SLOT_LUNCH', 'SLOT_MIDDAY'].includes(item.time_slot_tag)) return false;
          if (activeTimeSlot === 'CHIEU' && !['ALL_DAY', 'SLOT_AFTERNOON'].includes(item.time_slot_tag)) return false;
          if (activeTimeSlot === 'TOI' && !['ALL_DAY', 'SLOT_EVENING', 'SLOT_NIGHT'].includes(item.time_slot_tag)) return false;
        }
      }

      // 3. Campus Zone Filter
      if (activeCampusZone !== 'ALL') {
        if (item.locality_tag !== 'TOAN_DANANG') {
          if (activeCampusZone === 'HOA_KHANH' && item.locality_tag !== 'LIEN_CHIEU') return false;
          if (activeCampusZone === 'NGU_HANH_SON' && item.locality_tag !== 'NGU_HANH_SON') return false;
          if (activeCampusZone === 'HAI_CHAU' && item.locality_tag !== 'HAI_CHAU') return false;
          if (activeCampusZone === 'THANH_KHE' && item.locality_tag !== 'THANH_KHE') return false;
          if (activeCampusZone === 'SON_TRA' && item.locality_tag !== 'SON_TRA') return false;
        }
      }

      return true;
    });

    const routeTitles = {
      'ALL': 'Tất Cả Mục Khám Phá',
      'AN_GI_GAN_DAY': '🍔 Ăn Gì Gần Bạn',
      'DI_CHOI_TOI_NAY': '🎬 Đi Chơi Tối Nay & Giải Trí',
      'DI_CHUYEN_TIET_KIEM': '🚌 Di Chuyển Tiết Kiệm & Buýt Đô Thị',
      'DO_KTX_HOC_TAP': '🎓 Đồ Ký Túc Xá & Học Đường'
    };

    return `
      <div class="cr-experience-container">
        <!-- MODERN BENTO HERO GRID -->
        <div class="bento-hero-grid" aria-label="Bảng Điều Khiển Khám Phá Hôm Nay">
          <section class="bento-tile-main-stage hero-landmark-cr vivid-dragon-hero-cf" aria-label="Bìa Khám Phá Đà Nẵng">
            <img 
              src="assets/images/board_a_afterglow_hero.svg" 
              alt="Đồ họa minh họa JayT Đà Nẵng" 
              class="bento-stage-bg-img hero-landmark-img vivid-hero-image" 
              id="hero-main-photo"
              loading="eager"
            />
            <div class="bento-stage-gradient hero-landmark-gradient"></div>

            <div class="hero-landmark-attribution" role="note" aria-label="Thông tin bản quyền ảnh Cầu Rồng">
              🎨 Đồ họa JayT
            </div>

            <div class="bento-stage-content hero-landmark-content">
              <span class="hero-moment-pill">${timeInfo.momentTag}</span>
              <h1 class="hero-headline-cr vivid-main-title">
                Hôm Nay Khám Phá Gì Ở Đà Nẵng?
              </h1>
              <p class="hero-subhead-cr vivid-subhead">
                Gợi ý điểm đến, tiện ích công cộng và các chương trình học đường chính thức tại Đà Nẵng &mdash; phân loại minh bạch, đối soát nguồn gốc.
              </p>

              <div class="hero-shopping-actions-grid">
                <button class="btn-hero-primary-solid" data-nav="EXPLORE" data-tier-filter="TIER_2_PROGRAMME" aria-label="Khám phá chương trình và cổng chính thức">
                  🏛️ Khám phá chương trình &rarr;
                </button>
                <button class="btn-hero-secondary-outline" data-nav="VOUCHER_HUB" aria-label="Mở Ví Voucher 3 làn">
                  🏷️ Ví Voucher 3 Làn &rarr;
                </button>
                <button class="btn-hero-tertiary-ghost" data-nav="BUY_DECISION" aria-label="Công cụ tự tính thực trả và chia bill">
                  🛡️ Tự Tính Thực Trả & Chia Bill &rarr;
                </button>
              </div>
            </div>
          </section>

          <!-- BENTO SIDE COLUMN -->
          <div class="bento-side-column">
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
                <button class="bento-chip-btn ${activeTimeSlot === 'ALL' ? 'active' : ''}" data-time-filter="ALL" aria-label="Tất cả thời điểm">Tất cả</button>
                <button class="bento-chip-btn ${activeTimeSlot === 'SANG' ? 'active' : ''}" data-time-filter="SANG" aria-label="Buổi sáng">🌅 Sáng</button>
                <button class="bento-chip-btn ${activeTimeSlot === 'TRUA' ? 'active' : ''}" data-time-filter="TRUA" aria-label="Buổi trưa">🍜 Trưa</button>
                <button class="bento-chip-btn ${activeTimeSlot === 'CHIEU' ? 'active' : ''}" data-time-filter="CHIEU" aria-label="Buổi chiều">☕ Chiều</button>
                <button class="bento-chip-btn ${activeTimeSlot === 'TOI' ? 'active' : ''}" data-time-filter="TOI" aria-label="Buổi tối">✨ Tối</button>
              </div>
            </div>

            <div class="bento-tile-dock">
              <div>
                <span class="dock-badge">⚡ TRUY CẬP NHANH</span>
                <h3 style="font-size: 1.05rem; font-weight: 700; margin: 4px 0;">Ví Voucher & Danh Sách</h3>
              </div>
              <div class="bento-dock-row">
                <button class="bento-dock-btn" data-nav="VOUCHER_HUB" aria-label="Mở Ví Voucher 3 làn">
                  <span class="bento-dock-icon">🏷️</span>
                  <span>Ví Voucher (3 Làn)</span>
                </button>
                <button class="bento-dock-btn" data-nav="SAVED" aria-label="Mở danh sách đã lưu">
                  <span class="bento-dock-icon">❤️</span>
                  <span>Đã lưu (<span class="saved-dock-count">${savedItemIds.size}</span>)</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- SECTION EV: DEAL DISCOVERY ENGINE SURFACE -->
        <section class="deal-discovery-engine-box" style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 16px; padding: 24px; margin: 24px 0;" aria-label="Bộ Công Cụ Tìm Kiếm Theo 4 Nhu Cầu">
          <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; margin-bottom: 16px;">
            <div>
              <span style="font-size: 0.78rem; font-weight: 700; color: #0284c7; text-transform: uppercase; letter-spacing: 0.5px;">🔍 DEAL DISCOVERY ENGINE &bull; 4 NHU CẦU THỰC TẾ</span>
              <h2 style="font-size: 1.4rem; font-weight: 800; color: var(--text-primary); margin: 4px 0 0 0;">Bạn Đang Cần Tìm Gì Lúc Này?</h2>
            </div>
            ${(activeSituationalRoute !== 'ALL' || activeTimeSlot !== 'ALL' || activeCampusZone !== 'ALL') ? `
              <button id="btn-clear-discovery-filters" class="btn-clear-filters" style="padding: 6px 14px; font-size: 0.82rem; font-weight: 600; background: var(--bg-card-subtle); border: 1px solid var(--border-color); border-radius: 20px; cursor: pointer; color: #dc2626;" aria-label="Xóa toàn bộ bộ lọc">
                ✕ Xóa bộ lọc
              </button>
            ` : ''}
          </div>

          <!-- 4 SITUATIONAL ACTION CHIPS -->
          <div class="situational-chips-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px; margin-bottom: 16px;">
            <button class="situational-chip-btn ${activeSituationalRoute === 'AN_GI_GAN_DAY' ? 'active' : ''}" data-situational-route="AN_GI_GAN_DAY" style="padding: 12px 16px; border-radius: 12px; border: 2px solid ${activeSituationalRoute === 'AN_GI_GAN_DAY' ? '#0284c7' : 'var(--border-color)'}; background: ${activeSituationalRoute === 'AN_GI_GAN_DAY' ? 'var(--teal-subtle)' : 'var(--bg-card-subtle)'}; text-align: left; cursor: pointer; min-height: 48px;" aria-label="Lọc nhu cầu Ăn gần đây">
              <div style="font-size: 1.1rem; font-weight: 700; color: var(--text-primary);">🍔 Ăn gần đây</div>
              <div style="font-size: 0.78rem; color: var(--text-secondary); margin-top: 2px;">${stats.counts.an_gi} địa điểm ẩm thực</div>
            </button>

            <button class="situational-chip-btn ${activeSituationalRoute === 'DI_CHOI_TOI_NAY' ? 'active' : ''}" data-situational-route="DI_CHOI_TOI_NAY" style="padding: 12px 16px; border-radius: 12px; border: 2px solid ${activeSituationalRoute === 'DI_CHOI_TOI_NAY' ? '#0284c7' : 'var(--border-color)'}; background: ${activeSituationalRoute === 'DI_CHOI_TOI_NAY' ? 'var(--teal-subtle)' : 'var(--bg-card-subtle)'}; text-align: left; cursor: pointer; min-height: 48px;" aria-label="Lọc nhu cầu Đi chơi tối nay">
              <div style="font-size: 1.1rem; font-weight: 700; color: var(--text-primary);">🎬 Đi chơi tối nay</div>
              <div style="font-size: 0.78rem; color: var(--text-secondary); margin-top: 2px;">${stats.counts.di_dau} điểm vui chơi & rạp</div>
            </button>

            <button class="situational-chip-btn ${activeSituationalRoute === 'DI_CHUYEN_TIET_KIEM' ? 'active' : ''}" data-situational-route="DI_CHUYEN_TIET_KIEM" style="padding: 12px 16px; border-radius: 12px; border: 2px solid ${activeSituationalRoute === 'DI_CHUYEN_TIET_KIEM' ? '#0284c7' : 'var(--border-color)'}; background: ${activeSituationalRoute === 'DI_CHUYEN_TIET_KIEM' ? 'var(--teal-subtle)' : 'var(--bg-card-subtle)'}; text-align: left; cursor: pointer; min-height: 48px;" aria-label="Lọc nhu cầu Di chuyển tiết kiệm">
              <div style="font-size: 1.1rem; font-weight: 700; color: var(--text-primary);">🚌 Di chuyển tiết kiệm</div>
              <div style="font-size: 0.78rem; color: var(--text-secondary); margin-top: 2px;">${stats.counts.tien_ich} tiện ích buýt & xe công cộng</div>
            </button>

            <button class="situational-chip-btn ${activeSituationalRoute === 'DO_KTX_HOC_TAP' ? 'active' : ''}" data-situational-route="DO_KTX_HOC_TAP" style="padding: 12px 16px; border-radius: 12px; border: 2px solid ${activeSituationalRoute === 'DO_KTX_HOC_TAP' ? '#0284c7' : 'var(--border-color)'}; background: ${activeSituationalRoute === 'DO_KTX_HOC_TAP' ? 'var(--teal-subtle)' : 'var(--bg-card-subtle)'}; text-align: left; cursor: pointer; min-height: 48px;" aria-label="Lọc nhu cầu Đồ KTX và học tập">
              <div style="font-size: 1.1rem; font-weight: 700; color: var(--text-primary);">🎓 Đồ KTX & học tập</div>
              <div style="font-size: 0.78rem; color: var(--text-secondary); margin-top: 2px;">${stats.counts.mua_sam_hoc_tap} cổng học đường & đồ dùng</div>
            </button>
          </div>

          <!-- TIME & CAMPUS COMBINED FILTERS -->
          <div style="background: var(--bg-card-subtle); border-radius: 12px; padding: 14px; margin-top: 10px;">
            <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-bottom: 10px;">
              <span style="font-size: 0.82rem; font-weight: 700; color: var(--text-secondary); min-width: 90px;">⏰ Khung giờ:</span>
              <div style="display: flex; gap: 6px; flex-wrap: wrap;">
                <button class="filter-tag-chip ${activeTimeSlot === 'ALL' ? 'active' : ''}" data-time-filter="ALL" aria-label="Tất cả thời điểm">Tất cả</button>
                <button class="filter-tag-chip ${activeTimeSlot === 'SANG' ? 'active' : ''}" data-time-filter="SANG" aria-label="Khung giờ Sáng">🌅 Sáng (06:00 - 11:00)</button>
                <button class="filter-tag-chip ${activeTimeSlot === 'TRUA' ? 'active' : ''}" data-time-filter="TRUA" aria-label="Khung giờ Trưa">🍜 Trưa (11:00 - 14:00)</button>
                <button class="filter-tag-chip ${activeTimeSlot === 'CHIEU' ? 'active' : ''}" data-time-filter="CHIEU" aria-label="Khung giờ Chiều">☕ Chiều (14:00 - 18:00)</button>
                <button class="filter-tag-chip ${activeTimeSlot === 'TOI' ? 'active' : ''}" data-time-filter="TOI" aria-label="Khung giờ Tối">✨ Tối (18:00 - 23:00)</button>
              </div>
            </div>

            <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
              <span style="font-size: 0.82rem; font-weight: 700; color: var(--text-secondary); min-width: 90px;">🏫 Cụm trường / Khu vực:</span>
              <div style="display: flex; gap: 6px; flex-wrap: wrap;">
                <button class="filter-tag-chip ${activeCampusZone === 'ALL' ? 'active' : ''}" data-campus-filter="ALL" aria-label="Toàn thành phố">Toàn thành phố</button>
                <button class="filter-tag-chip ${activeCampusZone === 'HOA_KHANH' ? 'active' : ''}" data-campus-filter="HOA_KHANH" aria-label="Cụm Hòa Khánh - Liên Chiểu">🏫 Hòa Khánh (ĐH Bách Khoa, Sư Phạm)</button>
                <button class="filter-tag-chip ${activeCampusZone === 'NGU_HANH_SON' ? 'active' : ''}" data-campus-filter="NGU_HANH_SON" aria-label="Cụm Ngũ Hành Sơn">🏫 Ngũ Hành Sơn (ĐH Kinh Tế, VKU)</button>
                <button class="filter-tag-chip ${activeCampusZone === 'HAI_CHAU' ? 'active' : ''}" data-campus-filter="HAI_CHAU" aria-label="Quận Hải Châu">🏢 Hải Châu (Trung tâm)</button>
                <button class="filter-tag-chip ${activeCampusZone === 'THANH_KHE' ? 'active' : ''}" data-campus-filter="THANH_KHE" aria-label="Quận Thanh Khê">🏢 Thanh Khê</button>
                <button class="filter-tag-chip ${activeCampusZone === 'SON_TRA' ? 'active' : ''}" data-campus-filter="SON_TRA" aria-label="Quận Sơn Trà">🌊 Sơn Trà</button>
              </div>
            </div>
          </div>

          <!-- RESULTS FEED HEADER -->
          <div style="display: flex; align-items: center; justify-content: space-between; margin: 20px 0 12px 0;">
            <div style="font-size: 1.05rem; font-weight: 700; color: var(--text-primary);">
              ${routeTitles[activeSituationalRoute]}
            </div>
            <div style="font-size: 0.85rem; color: var(--text-secondary);" aria-live="polite">
              Đang hiển thị <strong>${discoveryFiltered.length}</strong> / 50 mục
            </div>
          </div>

          <!-- RESULTS CARDS GRID -->
          ${discoveryFiltered.length > 0 ? `
            <div class="cards-layout-grid">
              ${discoveryFiltered.map(item => renderRailCard(item)).join('')}
            </div>
          ` : `
            <div style="text-align: center; padding: 40px 16px; background: var(--bg-card-subtle); border-radius: 12px; border: 1px dashed var(--border-color);" role="status">
              <div style="font-size: 2.2rem; margin-bottom: 8px;">🔍</div>
              <h3 style="font-size: 1.1rem; font-weight: 700; color: var(--text-primary); margin-bottom: 4px;">Không tìm thấy mục nào phù hợp bộ lọc</h3>
              <p style="font-size: 0.88rem; color: var(--text-secondary); max-width: 460px; margin: 0 auto 16px auto;">
                Chưa có mục nào khớp đồng thời khung giờ và khu vực bạn chọn. Vui lòng bấm "Xóa bộ lọc" để xem toàn bộ 50 mục.
              </p>
              <button id="btn-reset-empty-filters" style="padding: 8px 18px; border-radius: 8px; background: #0284c7; color: #fff; border: none; font-weight: 600; cursor: pointer; min-height: 44px;">
                Xem toàn bộ 50 mục
              </button>
            </div>
          `}
        </section>

        <!-- CIVIC TICKER -->
        <section class="civic-ticker-cr hero-civic-note-cf" role="region" aria-label="Thông Tin Đô Thị Hiện Hành">
          <span class="civic-ticker-icon">📍</span>
          <div class="civic-ticker-text">
            <strong>Cầu Rồng Sông Hàn:</strong> Xem thông tin điểm đến và thông báo hiện hành tại cổng chính thức danang.gov.vn.
          </div>
          <a href="https://danang.gov.vn" target="_blank" rel="noopener noreferrer" class="civic-ticker-link" aria-label="Xem cổng thông tin chính quyền Thành phố Đà Nẵng danang.gov.vn">
            danang.gov.vn &rarr;
          </a>
        </section>
      </div>
    `;
  }


  // 3. CLOSED-LOOP JOURNEY 1: ĂN GÌ GẦN ĐÂY
  function renderFoodJourneyRoute() {
    const foodItems = JAYT_DISCOVERY_ITEMS.filter(i => i.primary_journey === 'AN_GI');
    
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
    const leisureItems = JAYT_DISCOVERY_ITEMS.filter(i => i.primary_journey === 'DI_DAU');

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
  
  // 7. BUY DECISION HUB & LOCAL-FIRST CALCULATOR (SECTION EV)
  function renderBuyDecisionHub() {
    return `
      <div class="cr-experience-container" style="max-width: 900px; margin: 0 auto; padding: 24px 16px;">
        <div class="civic-ticker-cr" style="margin-bottom: 16px;">
          <span class="story-kicker">🛡️ CÔNG CỤ TIÊU DÙNG MINH BẠCH &bull; LOCAL-FIRST ZERO-PII</span>
        </div>

        <div style="background: var(--bg-card); padding: 28px; border-radius: var(--radius-md); border: 1px solid var(--border-color); box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
          <h1 style="font-size: 1.6rem; font-weight: 800; margin-bottom: 6px;">Tự Tính Tổng Thực Trả & Chia Tiền Nhóm</h1>
          <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 20px; line-height: 1.5;">
            Nhập số tiền thực tế bạn nhìn thấy trong ứng dụng đặt đồ ăn hoặc giỏ hàng để tính tổng chi phí phải trả và chia đều cho nhóm. Toàn bộ tính toán diễn ra ngay trên máy của bạn (Local-First), hoàn toàn không thu thập thông tin cá nhân.
          </p>

          <div style="background: #fffbeb; border-left: 4px solid #f59e0b; padding: 12px 16px; border-radius: 8px; font-size: 0.85rem; color: #92400e; margin-bottom: 24px;">
            ⚠️ <strong>Lưu ý minh bạch:</strong> Đây là công cụ tính toán do bạn tự nhập số liệu. JayT không tự khẳng định hay cam kết giá từ bất kỳ ứng dụng nào.
          </div>

          <!-- CALCULATOR FORM -->
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px; margin-bottom: 20px;">
            <div>
              <label for="calc-item-price" style="display: block; font-size: 0.88rem; font-weight: 700; color: var(--text-primary); margin-bottom: 6px;">
                1. Giá món / Tiền hàng (VNĐ):
              </label>
              <input 
                type="number" 
                id="calc-item-price" 
                placeholder="Ví dụ: 100000" 
                min="0"
                style="width: 100%; min-height: 44px; padding: 10px 14px; border: 1px solid var(--border-color); border-radius: 8px; font-size: 0.95rem; font-weight: 600;" 
                aria-label="Nhập giá món hoặc tiền hàng"
              />
            </div>

            <div>
              <label for="calc-shipping-fee" style="display: block; font-size: 0.88rem; font-weight: 700; color: var(--text-primary); margin-bottom: 6px;">
                2. Phí giao hàng / Phụ phí (VNĐ):
              </label>
              <input 
                type="number" 
                id="calc-shipping-fee" 
                placeholder="Ví dụ: 20000" 
                min="0"
                style="width: 100%; min-height: 44px; padding: 10px 14px; border: 1px solid var(--border-color); border-radius: 8px; font-size: 0.95rem; font-weight: 600;" 
                aria-label="Nhập phí giao hàng hoặc phụ phí"
              />
            </div>

            <div>
              <label for="calc-discount" style="display: block; font-size: 0.88rem; font-weight: 700; color: var(--text-primary); margin-bottom: 6px;">
                3. Giảm giá tự thấy trong app (VNĐ):
              </label>
              <input 
                type="number" 
                id="calc-discount" 
                placeholder="Ví dụ: 30000" 
                min="0"
                style="width: 100%; min-height: 44px; padding: 10px 14px; border: 1px solid var(--border-color); border-radius: 8px; font-size: 0.95rem; font-weight: 600;" 
                aria-label="Nhập số tiền giảm giá bạn tự thấy"
              />
            </div>

            <div>
              <label for="calc-split-count" style="display: block; font-size: 0.88rem; font-weight: 700; color: var(--text-primary); margin-bottom: 6px;">
                4. Số người cùng chia bill (Người):
              </label>
              <input 
                type="number" 
                id="calc-split-count" 
                value="1" 
                min="1"
                style="width: 100%; min-height: 44px; padding: 10px 14px; border: 1px solid var(--border-color); border-radius: 8px; font-size: 0.95rem; font-weight: 600;" 
                aria-label="Nhập số người cùng chia tiền"
              />
            </div>
          </div>

          <div style="display: flex; gap: 10px; margin-bottom: 24px;">
            <button id="btn-calc-reset" style="padding: 10px 20px; border-radius: 8px; border: 1px solid var(--border-color); background: var(--bg-card-subtle); color: var(--text-secondary); font-weight: 600; cursor: pointer; min-height: 44px;">
              Đặt lại (Reset)
            </button>
          </div>

          <!-- CALCULATION OUTPUT RESULT BOX -->
          <div id="calc-output-box" style="background: var(--bg-card-subtle); border: 2px solid var(--border-color); border-radius: 12px; padding: 20px;" role="region" aria-live="polite">
            <div style="font-size: 0.82rem; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 8px;">📊 KẾT QUẢ TÍNH TOÁN MINH BẠCH:</div>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-top: 12px;">
              <div style="background: var(--bg-card); padding: 16px; border-radius: 8px; border: 1px solid var(--border-color);">
                <div style="font-size: 0.82rem; color: var(--text-secondary);">Tổng Thực Trả (Net Out-of-Pocket):</div>
                <div id="res-total-amount" style="font-size: 1.6rem; font-weight: 800; color: #0284c7; margin-top: 4px;">0 đ</div>
                <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 2px;">Công thức: Giá món + Phí ship - Giảm giá</div>
              </div>

              <div style="background: var(--bg-card); padding: 16px; border-radius: 8px; border: 1px solid var(--border-color);">
                <div style="font-size: 0.82rem; color: var(--text-secondary);">Mỗi Người Trả (Split Amount):</div>
                <div id="res-split-amount" style="font-size: 1.6rem; font-weight: 800; color: #10b981; margin-top: 4px;">0 đ / người</div>
                <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 2px;">Chia đều cho <span id="res-people-count">1</span> người</div>
              </div>
            </div>

            <div id="calc-validation-error" style="display: none; margin-top: 12px; color: #dc2626; font-size: 0.85rem; font-weight: 600;" role="alert"></div>
          </div>
        </div>
      </div>
    `;
  }


  // 8. SAVED VIEW
  
  // 7.5. NON-COMMERCIAL VOUCHER HUB VIEW (SECTION EA)
  
  // 7.5. TRUE THREE-LANE VOUCHER WALLET (SECTION EV)
  
  // 7.5. TRUE THREE-LANE VOUCHER WALLET & CLAIM-FREE INSTRUCTIONS (SECTION EV)
  
  // 7.5. TRUE THREE-LANE VOUCHER WALLET & NEUTRAL PORTAL IDENTITY (SECTION EV)
  function renderVoucherHubView() {
    const laneBRecords = [
      {
            "merchant_subject": "ShopeeFood",
            "category": "Ứng dụng đặt món & giao hàng",
            "canonical_action_url": "https://shopeefood.vn",
            "scope_statement": "Kênh trực tuyến / Ứng dụng chính thức",
            "action_type": "CHECK_IN_OFFICIAL_APP_OR_CHECKOUT",
            "account_dependent": true,
            "evidence_state": "PORTAL_IDENTITY_UNVERIFIED",
            "instruction_copy": "Ưu đãi, nếu có, do tài khoản và giỏ hàng quyết định. Mở kênh chính thức để tự kiểm tra trước khi thanh toán."
      },
      {
            "merchant_subject": "GrabFood",
            "category": "Ứng dụng đặt món & giao hàng",
            "canonical_action_url": "https://food.grab.com",
            "scope_statement": "Kênh trực tuyến / Ứng dụng chính thức",
            "action_type": "CHECK_IN_OFFICIAL_APP_OR_CHECKOUT",
            "account_dependent": true,
            "evidence_state": "PORTAL_IDENTITY_UNVERIFIED",
            "instruction_copy": "Ưu đãi, nếu có, do tài khoản và giỏ hàng quyết định. Mở kênh chính thức để tự kiểm tra trước khi thanh toán."
      },
      {
            "merchant_subject": "Domino's Pizza",
            "category": "Website đặt hàng chính thức",
            "canonical_action_url": "https://dominos.vn",
            "scope_statement": "Kênh trực tuyến / Ứng dụng chính thức",
            "action_type": "CHECK_IN_OFFICIAL_APP_OR_CHECKOUT",
            "account_dependent": true,
            "evidence_state": "PORTAL_IDENTITY_UNVERIFIED",
            "instruction_copy": "Ưu đãi, nếu có, do tài khoản và giỏ hàng quyết định. Mở kênh chính thức để tự kiểm tra trước khi thanh toán."
      },
      {
            "merchant_subject": "Lotteria Vietnam",
            "category": "Website đặt hàng chính thức",
            "canonical_action_url": "https://www.lotteria.vn",
            "scope_statement": "Kênh trực tuyến / Ứng dụng chính thức",
            "action_type": "CHECK_IN_OFFICIAL_APP_OR_CHECKOUT",
            "account_dependent": true,
            "evidence_state": "PORTAL_IDENTITY_UNVERIFIED",
            "instruction_copy": "Ưu đãi, nếu có, do tài khoản và giỏ hàng quyết định. Mở kênh chính thức để tự kiểm tra trước khi thanh toán."
      },
      {
            "merchant_subject": "CGV Cinemas",
            "category": "Cổng thông tin & đặt vé rạp chiếu",
            "canonical_action_url": "https://www.cgv.vn",
            "scope_statement": "Kênh trực tuyến / Ứng dụng chính thức",
            "action_type": "CHECK_IN_OFFICIAL_APP_OR_CHECKOUT",
            "account_dependent": true,
            "evidence_state": "PORTAL_IDENTITY_UNVERIFIED",
            "instruction_copy": "Ưu đãi, nếu có, do tài khoản và giỏ hàng quyết định. Mở kênh chính thức để tự kiểm tra trước khi thanh toán."
      },
      {
            "merchant_subject": "Galaxy Cinema",
            "category": "Cổng thông tin & đặt vé rạp chiếu",
            "canonical_action_url": "https://www.galaxycine.vn",
            "scope_statement": "Kênh trực tuyến / Ứng dụng chính thức",
            "action_type": "CHECK_IN_OFFICIAL_APP_OR_CHECKOUT",
            "account_dependent": true,
            "evidence_state": "PORTAL_IDENTITY_UNVERIFIED",
            "instruction_copy": "Ưu đãi, nếu có, do tài khoản và giỏ hàng quyết định. Mở kênh chính thức để tự kiểm tra trước khi thanh toán."
      },
      {
            "merchant_subject": "Metiz Cinema",
            "category": "Cổng thông tin rạp chiếu",
            "canonical_action_url": "https://metiz.vn",
            "scope_statement": "Kênh trực tuyến / Ứng dụng chính thức",
            "action_type": "CHECK_IN_OFFICIAL_APP_OR_CHECKOUT",
            "account_dependent": true,
            "evidence_state": "PORTAL_IDENTITY_UNVERIFIED",
            "instruction_copy": "Ưu đãi, nếu có, do tài khoản và giỏ hàng quyết định. Mở kênh chính thức để tự kiểm tra trước khi thanh toán."
      },
      {
            "merchant_subject": "Highlands Coffee",
            "category": "Ứng dụng & Cổng thông tin chính thức",
            "canonical_action_url": "https://www.highlandscoffee.com.vn",
            "scope_statement": "Kênh trực tuyến / Ứng dụng chính thức",
            "action_type": "CHECK_IN_OFFICIAL_APP_OR_CHECKOUT",
            "account_dependent": true,
            "evidence_state": "PORTAL_IDENTITY_UNVERIFIED",
            "instruction_copy": "Ưu đãi, nếu có, do tài khoản và giỏ hàng quyết định. Mở kênh chính thức để tự kiểm tra trước khi thanh toán."
      },
      {
            "merchant_subject": "Fahasa",
            "category": "Nhà sách trực tuyến",
            "canonical_action_url": "https://www.fahasa.com",
            "scope_statement": "Kênh trực tuyến / Ứng dụng chính thức",
            "action_type": "CHECK_IN_OFFICIAL_APP_OR_CHECKOUT",
            "account_dependent": true,
            "evidence_state": "PORTAL_IDENTITY_UNVERIFIED",
            "instruction_copy": "Ưu đãi, nếu có, do tài khoản và giỏ hàng quyết định. Mở kênh chính thức để tự kiểm tra trước khi thanh toán."
      },
      {
            "merchant_subject": "Tiki Books",
            "category": "Gian hàng sách & đồ dùng học tập",
            "canonical_action_url": "https://tiki.vn",
            "scope_statement": "Kênh trực tuyến / Ứng dụng chính thức",
            "action_type": "CHECK_IN_OFFICIAL_APP_OR_CHECKOUT",
            "account_dependent": true,
            "evidence_state": "PORTAL_IDENTITY_UNVERIFIED",
            "instruction_copy": "Ưu đãi, nếu có, do tài khoản và giỏ hàng quyết định. Mở kênh chính thức để tự kiểm tra trước khi thanh toán."
      }
];
    const laneCRecords = [
      {
            "source_to_follow": "DanaBus",
            "category": "Mạng lưới xe buýt công cộng",
            "canonical_action_url": "https://danangbus.vn",
            "scope_statement": "Cổng thông tin xe buýt chính thức",
            "radar_state": "RADAR_UNVERIFIED",
            "evidence_state": "PUBLIC_PORTAL_UNVERIFIED",
            "instruction_copy": "JayT đang theo dõi nguồn chính thức; chưa xác nhận ưu đãi."
      },
      {
            "source_to_follow": "TNGo",
            "category": "Hệ thống xe đạp công cộng",
            "canonical_action_url": "https://tngo.vn",
            "scope_statement": "Cổng thông tin xe đạp công cộng",
            "radar_state": "RADAR_UNVERIFIED",
            "evidence_state": "PUBLIC_PORTAL_UNVERIFIED",
            "instruction_copy": "JayT đang theo dõi nguồn chính thức; chưa xác nhận ưu đãi."
      },
      {
            "source_to_follow": "GitHub Education",
            "category": "Cổng chương trình học đường",
            "canonical_action_url": "https://education.github.com/pack",
            "scope_statement": "Cổng thông tin học đường quốc tế",
            "radar_state": "RADAR_UNVERIFIED",
            "evidence_state": "PUBLIC_PORTAL_UNVERIFIED",
            "instruction_copy": "JayT đang theo dõi nguồn chính thức; chưa xác nhận ưu đãi."
      }
];

    return `
      <div class="cr-experience-container" style="max-width: 1080px; margin: 0 auto; padding: 24px 16px;">
        <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 16px; padding: 28px; margin-bottom: 24px; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
          <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
            <span style="font-size: 2.2rem;">🏷️</span>
            <div>
              <h1 style="font-size: 1.6rem; font-weight: 800; color: var(--text-primary); margin: 0;">Ví Voucher 3 Làn & Tra Cứu Ưu Đãi Minh Bạch</h1>
              <p style="font-size: 0.9rem; color: var(--text-secondary); margin: 4px 0 0 0;">Phân loại chính xác theo mức độ chứng minh thực tế &bull; Cam kết Zero-PII, 0 mã voucher giả, 0 nhãn xác minh tự tạo.</p>
            </div>
          </div>

          <!-- LANE FILTER BUTTONS -->
          <div style="display: flex; gap: 8px; flex-wrap: wrap; margin: 20px 0;">
            <button class="nav-btn ${activeVoucherLane === 'ALL' ? 'active' : ''}" data-voucher-lane="ALL" aria-label="Tất cả 3 làn">Tất cả 3 làn (13)</button>
            <button class="nav-btn ${activeVoucherLane === 'LANE_A' ? 'active' : ''}" data-voucher-lane="LANE_A" aria-label="Làn A: Dùng ngay xác minh">🟢 Làn A: Dùng ngay (0)</button>
            <button class="nav-btn ${activeVoucherLane === 'LANE_B' ? 'active' : ''}" data-voucher-lane="LANE_B" aria-label="Làn B: Tự kiểm trong app">🟡 Làn B: Tự kiểm trong app (10)</button>
            <button class="nav-btn ${activeVoucherLane === 'LANE_C' ? 'active' : ''}" data-voucher-lane="LANE_C" aria-label="Làn C: Radar theo dõi">📡 Làn C: Radar theo dõi (3)</button>
          </div>

          <!-- ==================== LANE A: PUBLIC VERIFIED ==================== -->
          ${(activeVoucherLane === 'ALL' || activeVoucherLane === 'LANE_A') ? `
            <section class="wallet-lane-section" style="margin-bottom: 32px; border: 1px solid var(--border-color); border-radius: 12px; padding: 20px; background: var(--bg-card-subtle);" aria-label="Làn A: Voucher công khai đã xác minh">
              <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px; margin-bottom: 12px;">
                <div style="display: flex; align-items: center; gap: 8px;">
                  <span style="background: #10b981; color: #fff; padding: 4px 10px; border-radius: 6px; font-size: 0.78rem; font-weight: 700;">LÀN A • PUBLIC VERIFIED</span>
                  <h2 style="font-size: 1.2rem; font-weight: 800; color: var(--text-primary); margin: 0;">Voucher Dùng Ngay — Đã Đối Soát Đầy Đủ</h2>
                </div>
                <span style="font-size: 0.85rem; font-weight: 700; color: #059669;">0 Voucher khả dụng</span>
              </div>

              <div style="background: var(--bg-card); border-left: 4px solid #10b981; padding: 14px 16px; border-radius: 8px; font-size: 0.88rem; color: var(--text-secondary); line-height: 1.5;">
                <div style="font-weight: 700; color: var(--text-primary); margin-bottom: 4px;">🔒 Tiêu chuẩn 5 trường bắt buộc để mở Làn A:</div>
                1. Mô tả ưu đãi &bull; 2. Điều khoản & điều kiện rõ ràng &bull; 3. Thời hạn hiệu lực có bằng chứng &bull; 4. Phạm vi áp dụng tại Đà Nẵng &bull; 5. Giá thực trả sau giảm.<br>
                <em>Hiện tại chưa có mã giảm giá công khai nào trên thị trường đạt đủ 5 tiêu chí đối soát thực tế. JayT kiên quyết giữ 0 để bảo vệ quyền lợi người dùng.</em>
              </div>
            </section>
          ` : ''}

          <!-- ==================== LANE B: IN-APP CHECKOUT (NEUTRAL PORTALS) ==================== -->
          ${(activeVoucherLane === 'ALL' || activeVoucherLane === 'LANE_B') ? `
            <section class="wallet-lane-section" style="margin-bottom: 32px; border: 1px solid var(--border-color); border-radius: 12px; padding: 20px; background: var(--bg-card-subtle);" aria-label="Làn B: Kênh chính thức để tự kiểm tra trong app">
              <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px; margin-bottom: 12px;">
                <div style="display: flex; align-items: center; gap: 8px;">
                  <span style="background: #f59e0b; color: #fff; padding: 4px 10px; border-radius: 6px; font-size: 0.78rem; font-weight: 700;">LÀN B • TỰ KIỂM TRONG APP</span>
                  <h2 style="font-size: 1.2rem; font-weight: 800; color: var(--text-primary); margin: 0;">Kênh Chính Thức Để Tự Kiểm (${laneBRecords.length} Mục)</h2>
                </div>
                <span style="font-size: 0.85rem; font-weight: 700; color: #d97706;">${laneBRecords.length} Kênh để tự kiểm</span>
              </div>

              <p style="font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 16px; line-height: 1.5;">
                💡 <strong>Nguyên tắc minh bạch tuyệt đối (Section EV):</strong> Các ưu đãi, nếu có, phụ thuộc hoàn toàn vào tài khoản cá nhân và giỏ hàng của bạn. <strong>JayT không hiển thị mã giả, không suy đoán chương trình hay số tiền giảm.</strong> Người dùng vui lòng mở ứng dụng hoặc website chính thức để tự kiểm tra trước khi thanh toán.
              </p>

              <div class="cards-layout-grid">
                ${laneBRecords.map(r => `
                  <div class="lane-b-card" style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 10px; padding: 16px; display: flex; flex-direction: column; justify-content: space-between;">
                    <div>
                      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
                        <span style="font-size: 0.75rem; font-weight: 700; color: #d97706; background: #fef3c7; padding: 2px 8px; border-radius: 4px;">CỔNG CHÍNH THỨC</span>
                        <span style="font-size: 0.78rem; color: var(--text-muted);">${r.category}</span>
                      </div>
                      <h3 style="font-size: 1.05rem; font-weight: 700; color: var(--text-primary); margin: 0 0 6px 0;">${r.merchant_subject}</h3>
                      <div style="background: var(--bg-card-subtle); border-left: 3px solid #f59e0b; padding: 8px 12px; border-radius: 4px; font-size: 0.82rem; color: var(--text-secondary); line-height: 1.45; margin-bottom: 12px;">
                        ${r.instruction_copy}
                      </div>
                    </div>
                    <div>
                      <div style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 8px;">📍 Phạm vi: ${r.scope_statement}</div>
                      <a href="${r.canonical_action_url}" target="_blank" rel="noopener noreferrer" class="btn-rail-action btn-action-portal" style="width: 100%; text-align: center; justify-content: center; min-height: 44px; display: inline-flex; align-items: center;" aria-label="Mở cổng chính thức của ${r.merchant_subject} để tự kiểm tra">
                        🏛️ Mở cổng ${new URL(r.canonical_action_url).hostname} để tự kiểm tra &rarr;
                      </a>
                    </div>
                  </div>
                `).join('')}
              </div>
            </section>
          ` : ''}

          <!-- ==================== LANE C: RADAR MONITORING (NEUTRAL RADAR) ==================== -->
          ${(activeVoucherLane === 'ALL' || activeVoucherLane === 'LANE_C') ? `
            <section class="wallet-lane-section" style="margin-bottom: 12px; border: 1px solid var(--border-color); border-radius: 12px; padding: 20px; background: var(--bg-card-subtle);" aria-label="Làn C: Radar theo dõi chương trình">
              <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px; margin-bottom: 12px;">
                <div style="display: flex; align-items: center; gap: 8px;">
                  <span style="background: #6366f1; color: #fff; padding: 4px 10px; border-radius: 6px; font-size: 0.78rem; font-weight: 700;">LÀN C • RADAR THEO DÕI</span>
                  <h2 style="font-size: 1.2rem; font-weight: 800; color: var(--text-primary); margin: 0;">Radar Theo Dõi Nguồn Tin (${laneCRecords.length} Mục)</h2>
                </div>
                <span style="font-size: 0.85rem; font-weight: 700; color: #6366f1;">${laneCRecords.length} Kênh</span>
              </div>

              <div class="cards-layout-grid">
                ${laneCRecords.map(r => `
                  <div class="lane-c-card" style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 10px; padding: 16px; display: flex; flex-direction: column; justify-content: space-between;">
                    <div>
                      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
                        <span style="font-size: 0.75rem; font-weight: 700; color: #4338ca; background: #e0e7ff; padding: 2px 8px; border-radius: 4px;">RADAR THEO DÕI</span>
                        <span style="font-size: 0.78rem; color: var(--text-muted);">${r.category}</span>
                      </div>
                      <h3 style="font-size: 1.05rem; font-weight: 700; color: var(--text-primary); margin: 0 0 6px 0;">${r.source_to_follow}</h3>
                      <div style="background: var(--bg-card-subtle); border-left: 3px solid #6366f1; padding: 8px 12px; border-radius: 4px; font-size: 0.82rem; color: var(--text-secondary); line-height: 1.45; margin-bottom: 12px;">
                        ${r.instruction_copy}
                      </div>
                    </div>
                    <div>
                      <div style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 8px;">📍 Phạm vi: ${r.scope_statement}</div>
                      <a href="${r.canonical_action_url}" target="_blank" rel="noopener noreferrer" class="btn-rail-action btn-action-portal" style="width: 100%; text-align: center; justify-content: center; min-height: 44px; display: inline-flex; align-items: center;" aria-label="Mở cổng chính thức của ${r.source_to_follow}">
                        🏛️ Mở cổng chính thức &rarr;
                      </a>
                    </div>
                  </div>
                `).join('')}
              </div>
            </section>
          ` : ''}
        </div>
      </div>
    `;
  }


  function attachVoucherHubEvents() {
    if (typeof document === 'undefined') return;
    document.querySelectorAll('[data-voucher-lane]').forEach(btn => {
      btn.onclick = () => {
        activeVoucherLane = btn.dataset.voucherLane;
        renderCurrentView();
      };
    });
  }


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
              <div class="drawer-section-title">🔍 Bằng Chứng Nguồn Tin & Đối Soát Thực Tế (Section EV)</div>
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
                <path d="M19 6 V19 C19 24.5 15.5 28 10 28 C6.5 28 4.2 26 3.5 24 C5.2 24 7 22.8 7.5 20.8 C8 18.5 6.5 16.5 4.5 16.5 C3.8 16.5 3 16.8 2.5 17.2 C3.5 10.5 11 6 19 6 Z" fill="url(#jflow-logo-grad-ep)"/>
                <path d="M19 14 C23.5 14 27.5 17 29.5 21 C31 24 32.5 28 33.5 31 C29.5 29 25 27.5 19 27.5 V21.5 C22 21.5 24.5 23 26 24.5 C24.5 20 20.5 17.5 16 17 L19 14 Z" fill="url(#jflow-logo-grad-ep)" opacity="0.9"/>
                <circle cx="27" cy="8" r="3.5" fill="#f43f5e"/>
                <defs>
                  <linearGradient id="jflow-logo-grad-ep" x1="4" y1="4" x2="34" y2="34" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#0284c7"/>
                    <stop offset="0.6" stop-color="#06b6d4"/>
                    <stop offset="1" stop-color="#f43f5e"/>
                  </linearGradient>
                </defs>
              </svg>
              <div class="brand-text-group">
                <span class="brand-title">JayT Đà Nẵng</span>
                <span class="brand-tagline">Khám Phá Mỗi Ngày &bull; v3.476.0-staging.ev</span>
              </div>
            </div>

            <nav class="nav-links-desktop" role="navigation" aria-label="Điều hướng chính">
              <button class="nav-btn ${activeView === 'HOME' ? 'active' : ''}" data-nav="HOME" aria-label="Mở trang Hôm nay">Hôm nay</button>
              <button class="nav-btn ${activeView === 'EXPLORE' ? 'active' : ''}" data-nav="EXPLORE" aria-label="Khám phá 50 mục">Khám phá (50)</button>
              <button class="nav-btn ${activeView === 'WALLET' ? 'active' : ''}" data-nav="WALLET" aria-label="Mở tra cứu chương trình 13 mục">Chương Trình (13)</button>
              <button class="nav-btn ${activeView === 'VOUCHER_HUB' ? 'active' : ''}" data-nav="VOUCHER_HUB" aria-label="Trung tâm tra cứu voucher 0 mục">Voucher (0)</button>
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
          <div>JayT Đà Nẵng &bull; Chuẩn Tuyển Chọn Bản Địa DQ &bull; v3.476.0-staging.ev</div>
        </footer>

        <nav class="jayt-mobile-bottom-nav" role="navigation" aria-label="Điều hướng di động">
          <button class="mobile-nav-btn ${activeView === 'HOME' ? 'active' : ''}" data-nav="HOME" aria-label="Trang Hôm nay">
            <span class="nav-icon">🔥</span>
            <span class="nav-text">Hôm nay</span>
          </button>
          <button class="mobile-nav-btn ${activeView === 'EXPLORE' ? 'active' : ''}" data-nav="EXPLORE" aria-label="Trang Khám phá">
            <span class="nav-icon">📚</span>
            <span class="nav-text">Khám phá</span>
          </button>
          <button class="mobile-nav-btn ${activeView === 'VOUCHER_HUB' ? 'active' : ''}" data-nav="VOUCHER_HUB" aria-label="Trang Ví Voucher">
            <span class="nav-icon">🏷️</span>
            <span class="nav-text">Ví Voucher</span>
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
    } else if (activeView === 'VOUCHER_HUB') {
      canvas.innerHTML = renderVoucherHubView();
      attachVoucherHubEvents();
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
    // 1. Situational Route Action Chips
    document.querySelectorAll('[data-situational-route]').forEach(btn => {
      btn.onclick = () => {
        const route = btn.dataset.situationalRoute;
        activeSituationalRoute = activeSituationalRoute === route ? 'ALL' : route;
        renderCurrentView();
      };
    });

    // 2. Time Filter Chips
    document.querySelectorAll('[data-time-filter]').forEach(btn => {
      btn.onclick = () => {
        activeTimeSlot = btn.dataset.timeFilter;
        renderCurrentView();
      };
    });

    // 3. Campus Zone Chips
    document.querySelectorAll('[data-campus-filter]').forEach(btn => {
      btn.onclick = () => {
        activeCampusZone = btn.dataset.campusFilter;
        renderCurrentView();
      };
    });

    // 4. Clear Filters Button
    const clearBtn = document.getElementById('btn-clear-discovery-filters');
    if (clearBtn) {
      clearBtn.onclick = () => {
        activeSituationalRoute = 'ALL';
        activeTimeSlot = 'ALL';
        activeCampusZone = 'ALL';
        renderCurrentView();
        showToast('✓ Đã xóa toàn bộ bộ lọc');
      };
    }

    const resetEmptyBtn = document.getElementById('btn-reset-empty-filters');
    if (resetEmptyBtn) {
      resetEmptyBtn.onclick = () => {
        activeSituationalRoute = 'ALL';
        activeTimeSlot = 'ALL';
        activeCampusZone = 'ALL';
        renderCurrentView();
      };
    }

    // Tier filters from hero
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
    if (typeof document === 'undefined') return;
    const inputPrice = document.getElementById('calc-item-price');
    const inputShip = document.getElementById('calc-shipping-fee');
    const inputDiscount = document.getElementById('calc-discount');
    const inputSplit = document.getElementById('calc-split-count');
    const resTotal = document.getElementById('res-total-amount');
    const resSplit = document.getElementById('res-split-amount');
    const resPeople = document.getElementById('res-people-count');
    const errBox = document.getElementById('calc-validation-error');
    const btnReset = document.getElementById('btn-calc-reset');

    function updateCalculation() {
      if (!inputPrice || !resTotal || !resSplit) return;
      let price = parseFloat(inputPrice.value) || 0;
      let ship = parseFloat(inputShip.value) || 0;
      let discount = parseFloat(inputDiscount.value) || 0;
      let split = parseInt(inputSplit.value, 10);
      if (isNaN(split)) split = 1;

      if (price < 0 || ship < 0 || discount < 0) {
        if (errBox) {
          errBox.innerText = '⚠️ Số tiền không được là số âm.';
          errBox.style.display = 'block';
        }
        return;
      }

      if (split < 1) {
        if (errBox) {
          errBox.innerText = '⚠️ Số người cùng chia tối thiểu là 1 người.';
          errBox.style.display = 'block';
        }
        return;
      }

      if (errBox) errBox.style.display = 'none';

      let total = price + ship - discount;
      if (total < 0) total = 0;
      let perPerson = Math.round(total / split);

      resTotal.innerText = total.toLocaleString('vi-VN') + ' đ';
      resSplit.innerText = perPerson.toLocaleString('vi-VN') + ' đ / người';
      if (resPeople) resPeople.innerText = split;
    }

    [inputPrice, inputShip, inputDiscount, inputSplit].forEach(el => {
      if (el) {
        el.addEventListener('input', updateCalculation);
        el.addEventListener('change', updateCalculation);
      }
    });

    if (btnReset) {
      btnReset.onclick = () => {
        if (inputPrice) inputPrice.value = '';
        if (inputShip) inputShip.value = '';
        if (inputDiscount) inputDiscount.value = '';
        if (inputSplit) inputSplit.value = '1';
        updateCalculation();
        showToast('✓ Đã đặt lại công cụ tính toán');
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
    renderAppShell();
    renderCurrentView();
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
      JAYT_STOREFRONT_VERSION: 'v3.476.0-staging.ev',
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
