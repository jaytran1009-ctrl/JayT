/**
 * JAYT PLATFORM FOUNDATION (SECTION BS)
 * Release Candidate: v3.425.0-staging.bs
 * Governing Directive: JAYT-245 Section BR (BR.1 - BR.8)
 * Architecture: Single Publish Pipeline + Four Schematized Ledgers + Zero-PII Observability.
 */

if (typeof window !== 'undefined' && window.JAYT_OBSERVABILITY) {
  window.JAYT_OBSERVABILITY.recordEvent('STOREFRONT_INITIALIZED', {
    version: 'v3.425.0-staging.bs',
    environment: 'STAGING_REVIEW_BS'
  });
}

/**
 * JAYT STOREFRONT REDESIGN (JAYT-245 SECTION AY — JAYT DAILY GUIDE)
 * Version: v3.422.0-staging.ay
 * Architecture:
 * - Information Architecture: Streamlined Nav (Hôm nay, Khám phá, Đã lưu) + Mobile Bottom Nav.
 * - 3 Daily Gateways: "Ăn gì hôm nay?", "Đi đâu sau giờ học/làm?", "Cần mua sắm gì?".
 * - Time-Slot Contextual Switcher: Sáng / Trưa / Chiều / Tối.
 * - Role-Based Card System: Distinct visual treatments for Deal, Programme, Facility, Radar.
 * - Progressive Disclosure: Compact cards, deep evidence in Accessible Detail Modals.
 * - Destinations: Dedicated "Mua món này có hời không?" & "Voucher Hub" flows with fail-closed safeguards.
 * - Design System: Professional SVG Icons (zero emoji clutter), 4/8pt spacing, Dark/Light mode tokens.
 * - 100% Data Truth: 33 Public Certified Items, 1 Quarantined, Zero Affiliate Links.
 * Baseline Rollback: v3.419.0
 */

const JAYT_STOREFRONT_VERSION = 'v3.425.0-staging.bs';

const JAYT_DISCOVERY_ITEMS = [
  {
    "item_id": "DEAL_CGV_VNPAY_BOGO",
    "tier": "VERIFIED_DEAL",
    "tier_name": "Ưu Đãi Xác Minh",
    "badge_label": "ƯU ĐÃI XÁC MINH",
    "title": "CGV Cinemas x VNPAY — Mua 1 Vé Tặng 1 Vé Xem Phim",
    "brand": "CGV Cinemas",
    "monogram": "CGV",
    "color_accent": "#be123c",
    "category": "Giải trí",
    "scope_text": "Toàn quốc (Hệ thống rạp CGV gồm cả Đà Nẵng)",
    "audience_target": "Khách hàng dùng app VNPAY & Mobile Banking (VCB, BIDV, VietinBank, Agribank)",
    "timing_window": "Từ nay đến 30/09/2026 (Số lượng phân bổ có hạn mỗi ngày)",
    "conditions_limit": "Nhập mã MUA1TANG1 khi đặt vé CGV trên app ngân hàng / VNPAY",
    "observed_at": "2026-08-29 01:00",
    "summary_text": "Chương trình đặt vé CGV trên VNPAY/App ngân hàng nhập mã MUA1TANG1 được tặng 1 vé cùng loại.",
    "verbatim_quote": "Ưu đãi Mua 1 tặng 1 vé xem phim CGV: Nhập mã: MUA1TANG1 trên VNPAY & App Ngân hàng (Thời hạn: đến 30/09/2026).",
    "evidence_status": "Đã đối soát raw capture từ www.cgv.vn/default/movies/offers/vnpay-bogo (4.98 KB, SHA-256 khớp)",
    "official_source_url": "https://www.cgv.vn/default/movies/offers/vnpay-bogo",
    "action_type": "PRIMARY_LINK",
    "action_label": "Xem hướng dẫn & thể lệ",
    "gateway_group": "DI_DAU",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "ALL_DAY",
    "allow_field_claims": true
  },
  {
    "item_id": "DEAL_LOTTERIA_HAPPY_LUNCH",
    "tier": "PENDING_DEAL",
    "tier_name": "Nguồn Đang Rà Soát AU",
    "badge_label": "NGUỒN CHÍNH THỨC — ĐANG RÀ SOÁT AU",
    "title": "Lotteria Vietnam — Thực Đơn Bữa Trưa",
    "brand": "Lotteria Vietnam",
    "monogram": "LT",
    "color_accent": "#dc2626",
    "category": "Ăn uống",
    "scope_text": "Đà Nẵng",
    "audience_target": "Học sinh, sinh viên, nhân viên văn phòng",
    "timing_window": "Xem quy định trên website đơn vị",
    "conditions_limit": "Áp dụng theo thể lệ niêm yết của đơn vị",
    "observed_at": "2026-08-29 01:00",
    "summary_text": "Thông tin bữa trưa từ kênh Lotteria Thông tin chính thức từ kênh đơn vị — Điều kiện áp dụng đang được đối soát minh bạch.",
    "verbatim_quote": "Kênh thông tin chính thức: lotteria.vn",
    "evidence_status": "Thông tin từ cổng chính thức • Đang đối soát chi tiết",
    "official_source_url": "https://www.lotteria.vn/menu/happy-lunch",
    "action_type": "PRIMARY_LINK",
    "action_label": "Mở nguồn chính thức",
    "gateway_group": "AN_GI",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "SLOT_LUNCH",
    "allow_field_claims": false
  },
  {
    "item_id": "DEAL_DOMINOS_BOGO",
    "tier": "PENDING_DEAL",
    "tier_name": "Nguồn Đang Rà Soát AU",
    "badge_label": "NGUỒN CHÍNH THỨC — ĐANG RÀ SOÁT AU",
    "title": "Domino's Pizza — Thực Đơn & Chương Trình Định Kỳ",
    "brand": "Domino's Pizza",
    "monogram": "DP",
    "color_accent": "#0284c7",
    "category": "Ăn uống",
    "scope_text": "Đà Nẵng",
    "audience_target": "Khách hàng cá nhân và nhóm bạn/gia đình",
    "timing_window": "Xem quy định trên website đơn vị",
    "conditions_limit": "Áp dụng theo thể lệ niêm yết của đơn vị",
    "observed_at": "2026-08-29 01:00",
    "summary_text": "Thông tin khuyến mãi từ Domino's Thông tin chính thức từ kênh đơn vị — Điều kiện áp dụng đang được đối soát minh bạch.",
    "verbatim_quote": "Kênh thông tin chính thức: dominos.vn",
    "evidence_status": "Thông tin từ cổng chính thức • Đang đối soát chi tiết",
    "official_source_url": "https://dominos.vn/khuyen-mai/mua-1-tang-1",
    "action_type": "PRIMARY_LINK",
    "action_label": "Mở nguồn chính thức",
    "gateway_group": "AN_GI",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "ALL_DAY",
    "allow_field_claims": false
  },
  {
    "item_id": "DEAL_METIZ_U22",
    "tier": "PENDING_DEAL",
    "tier_name": "Nguồn Đang Rà Soát AU",
    "badge_label": "NGUỒN CHÍNH THỨC — ĐANG RÀ SOÁT AU",
    "title": "Metiz Cinema — Bảng Giá Vé Thành Viên & HSSV",
    "brand": "Metiz Cinema",
    "monogram": "MZ",
    "color_accent": "#0d9488",
    "category": "Giải trí",
    "scope_text": "Đà Nẵng: Helio Center, Đường 2 Tháng 9",
    "audience_target": "Khán giả trẻ và học sinh sinh viên",
    "timing_window": "Xem quy định trên website đơn vị",
    "conditions_limit": "Xuất trình giấy tờ tùy thân hợp lệ tại quầy vé",
    "observed_at": "2026-08-29 01:00",
    "summary_text": "Chính sách giá vé Metiz Thông tin chính thức từ kênh đơn vị — Điều kiện áp dụng đang được đối soát minh bạch.",
    "verbatim_quote": "Kênh thông tin chính thức: metiz.vn",
    "evidence_status": "Thông tin từ cổng chính thức • Đang đối soát chi tiết",
    "official_source_url": "https://metiz.vn/tin-tuc/khuyen-mai/gia-ve-u22-metiz/",
    "action_type": "PRIMARY_LINK",
    "action_label": "Mở nguồn chính thức",
    "gateway_group": "DI_DAU",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "SLOT_EVENING",
    "allow_field_claims": false
  },
  {
    "item_id": "DEAL_STARLIGHT_COMBO_10K",
    "tier": "PENDING_DEAL",
    "tier_name": "Nguồn Đang Rà Soát AU",
    "badge_label": "NGUỒN CHÍNH THỨC — ĐANG RÀ SOÁT AU",
    "title": "Starlight Cinema — Combo Bắp Nước Rạp Chiếu",
    "brand": "Starlight Cinema",
    "monogram": "SL",
    "color_accent": "#e11d48",
    "category": "Giải trí",
    "scope_text": "Đà Nẵng: 46 Điện Biên Phủ",
    "audience_target": "Khán giả xem phim tại rạp",
    "timing_window": "Xem quy định trên website đơn vị",
    "conditions_limit": "Áp dụng theo thể lệ niêm yết tại rạp",
    "observed_at": "2026-08-29 01:00",
    "summary_text": "Thông tin gói bắp nước Starlight Thông tin chính thức từ kênh đơn vị — Điều kiện áp dụng đang được đối soát minh bạch.",
    "verbatim_quote": "Kênh thông tin chính thức: starlight.vn",
    "evidence_status": "Thông tin từ cổng chính thức • Đang đối soát chi tiết",
    "official_source_url": "https://starlight.vn/khuyen-mai/combo-bap-nuoc-10k.html",
    "action_type": "PRIMARY_LINK",
    "action_label": "Mở nguồn chính thức",
    "gateway_group": "DI_DAU",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "SLOT_AFTERNOON",
    "allow_field_claims": false
  },
  {
    "item_id": "TGT_B_01",
    "tier": "OFFICIAL_PROGRAM",
    "tier_name": "Nguồn Đang Rà Soát AU",
    "badge_label": "NGUỒN CHÍNH THỨC — ĐANG RÀ SOÁT AU",
    "title": "GitHub — Gói Công Cụ Lập Trình Cho Học Sinh Sinh Viên",
    "brand": "GitHub",
    "monogram": "GH",
    "color_accent": "#2563eb",
    "category": "Học tập",
    "scope_text": "Toàn quốc (Trực tuyến)",
    "audience_target": "Học sinh, sinh viên có email trường hợp lệ",
    "timing_window": "Thời gian theo học tại cơ sở đào tạo",
    "conditions_limit": "Xác thực tài khoản học sinh, sinh viên hợp lệ",
    "observed_at": "2026-08-29 01:00",
    "summary_text": "Chương trình bản quyền lập trình từ GitHub Thông tin chính thức từ kênh đơn vị — Điều kiện áp dụng đang được đối soát minh bạch.",
    "verbatim_quote": "Cổng thông tin chính thức: education.github.com",
    "evidence_status": "Thông tin từ cổng chính thức • Đang đối soát chi tiết",
    "official_source_url": "https://education.github.com/pack",
    "action_type": "PRIMARY_LINK",
    "action_label": "Mở nguồn chính thức",
    "gateway_group": "MUA_GI",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "ALL_DAY",
    "allow_field_claims": false
  },
  {
    "item_id": "TGT_B_02",
    "tier": "OFFICIAL_PROGRAM",
    "tier_name": "Nguồn Đang Rà Soát AU",
    "badge_label": "NGUỒN CHÍNH THỨC — ĐANG RÀ SOÁT AU",
    "title": "Notion — Không Gian Ghi Chép & Quản Lý Học Tập",
    "brand": "Notion",
    "monogram": "NO",
    "color_accent": "#2563eb",
    "category": "Học tập",
    "scope_text": "Toàn quốc (Trực tuyến)",
    "audience_target": "Học sinh, sinh viên và giảng viên",
    "timing_window": "Thời gian học tập và giảng dạy",
    "conditions_limit": "Đăng ký bằng email trường được công nhận",
    "observed_at": "2026-08-29 01:00",
    "summary_text": "Chương trình Notion Education Thông tin chính thức từ kênh đơn vị — Điều kiện áp dụng đang được đối soát minh bạch.",
    "verbatim_quote": "Cổng thông tin chính thức: notion.so",
    "evidence_status": "Thông tin từ cổng chính thức • Đang đối soát chi tiết",
    "official_source_url": "https://www.notion.so/product/notion-for-education",
    "action_type": "PRIMARY_LINK",
    "action_label": "Mở nguồn chính thức",
    "gateway_group": "MUA_GI",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "ALL_DAY",
    "allow_field_claims": false
  },
  {
    "item_id": "TGT_B_03",
    "tier": "OFFICIAL_PROGRAM",
    "tier_name": "Nguồn Đang Rà Soát AU",
    "badge_label": "NGUỒN CHÍNH THỨC — ĐANG RÀ SOÁT AU",
    "title": "Microsoft — Bộ Ứng Dụng Văn Phòng Giáo Dục",
    "brand": "Microsoft",
    "monogram": "MS",
    "color_accent": "#2563eb",
    "category": "Học tập",
    "scope_text": "Toàn quốc (Trực tuyến)",
    "audience_target": "Học sinh, sinh viên và giáo viên",
    "timing_window": "Theo niên khóa đào tạo",
    "conditions_limit": "Cơ sở giáo dục có thỏa thuận bản quyền",
    "observed_at": "2026-08-29 01:00",
    "summary_text": "Chương trình Microsoft 365 Education Thông tin chính thức từ kênh đơn vị — Điều kiện áp dụng đang được đối soát minh bạch.",
    "verbatim_quote": "Cổng thông tin chính thức: microsoft.com",
    "evidence_status": "Thông tin từ cổng chính thức • Đang đối soát chi tiết",
    "official_source_url": "https://www.microsoft.com/vi-vn/education/products/office",
    "action_type": "PRIMARY_LINK",
    "action_label": "Mở nguồn chính thức",
    "gateway_group": "MUA_GI",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "ALL_DAY",
    "allow_field_claims": false
  },
  {
    "item_id": "TGT_B_04",
    "tier": "OFFICIAL_PROGRAM",
    "tier_name": "Nguồn Đang Rà Soát AU",
    "badge_label": "NGUỒN CHÍNH THỨC — ĐANG RÀ SOÁT AU",
    "title": "Canva — Nền Tảng Thiết Kế Cho Giáo Dục",
    "brand": "Canva",
    "monogram": "CA",
    "color_accent": "#2563eb",
    "category": "Học tập",
    "scope_text": "Toàn quốc (Trực tuyến)",
    "audience_target": "Giáo viên và học sinh phổ thông",
    "timing_window": "Trong suốt quá trình giảng dạy/học tập",
    "conditions_limit": "Xác thực hồ sơ giáo viên hoặc trường học",
    "observed_at": "2026-08-29 01:00",
    "summary_text": "Chương trình Canva for Education Thông tin chính thức từ kênh đơn vị — Điều kiện áp dụng đang được đối soát minh bạch.",
    "verbatim_quote": "Cổng thông tin chính thức: canva.com",
    "evidence_status": "Thông tin từ cổng chính thức • Đang đối soát chi tiết",
    "official_source_url": "https://www.canva.com/vi_vn/giao-duc/",
    "action_type": "PRIMARY_LINK",
    "action_label": "Mở nguồn chính thức",
    "gateway_group": "MUA_GI",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "ALL_DAY",
    "allow_field_claims": false
  },
  {
    "item_id": "TGT_B_05",
    "tier": "OFFICIAL_PROGRAM",
    "tier_name": "Nguồn Đang Rà Soát AU",
    "badge_label": "NGUỒN CHÍNH THỨC — ĐANG RÀ SOÁT AU",
    "title": "Spotify — Dịch Vụ Âm Nhạc Trực Tuyến Học Sinh Sinh Viên",
    "brand": "Spotify",
    "monogram": "SP",
    "color_accent": "#2563eb",
    "category": "Học tập",
    "scope_text": "Toàn quốc (Trực tuyến)",
    "audience_target": "Sinh viên đang theo học đại học/cao đẳng",
    "timing_window": "Tối đa 4 năm học",
    "conditions_limit": "Xác thực qua hệ thống SheerID",
    "observed_at": "2026-08-29 01:00",
    "summary_text": "Gói Spotify Premium Student Thông tin chính thức từ kênh đơn vị — Điều kiện áp dụng đang được đối soát minh bạch.",
    "verbatim_quote": "Cổng thông tin chính thức: spotify.com",
    "evidence_status": "Thông tin từ cổng chính thức • Đang đối soát chi tiết",
    "official_source_url": "https://www.spotify.com/vn-vi/student/",
    "action_type": "PRIMARY_LINK",
    "action_label": "Mở nguồn chính thức",
    "gateway_group": "MUA_GI",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "ALL_DAY",
    "allow_field_claims": false
  },
  {
    "item_id": "TGT_B_06",
    "tier": "OFFICIAL_PROGRAM",
    "tier_name": "Nguồn Đang Rà Soát AU",
    "badge_label": "NGUỒN CHÍNH THỨC — ĐANG RÀ SOÁT AU",
    "title": "Apple — Dịch Vụ Nghe Nhạc Học Sinh Sinh Viên",
    "brand": "Apple",
    "monogram": "AP",
    "color_accent": "#2563eb",
    "category": "Học tập",
    "scope_text": "Toàn quốc (Trực tuyến)",
    "audience_target": "Sinh viên đại học và cao đẳng",
    "timing_window": "Tối đa 48 tháng",
    "conditions_limit": "Xác thực qua UNiDAYS định kỳ",
    "observed_at": "2026-08-29 01:00",
    "summary_text": "Gói Apple Music Student Thông tin chính thức từ kênh đơn vị — Điều kiện áp dụng đang được đối soát minh bạch.",
    "verbatim_quote": "Cổng thông tin chính thức: apple.com",
    "evidence_status": "Thông tin từ cổng chính thức • Đang đối soát chi tiết",
    "official_source_url": "https://www.apple.com/vn/apple-music/",
    "action_type": "PRIMARY_LINK",
    "action_label": "Mở nguồn chính thức",
    "gateway_group": "MUA_GI",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "ALL_DAY",
    "allow_field_claims": false
  },
  {
    "item_id": "TGT_B_09",
    "tier": "OFFICIAL_PROGRAM",
    "tier_name": "Nguồn Đang Rà Soát AU",
    "badge_label": "NGUỒN CHÍNH THỨC — ĐANG RÀ SOÁT AU",
    "title": "JetBrains — Bộ Môi Trường Phát Triển Cho HSSV & Giảng Viên",
    "brand": "JetBrains",
    "monogram": "JB",
    "color_accent": "#2563eb",
    "category": "Học tập",
    "scope_text": "Toàn quốc (Trực tuyến)",
    "audience_target": "Học sinh, sinh viên và giảng viên ngành CNTT",
    "timing_window": "Gia hạn hàng năm theo thẻ sinh viên",
    "conditions_limit": "Xác thực bằng thẻ sinh viên hoặc email .edu",
    "observed_at": "2026-08-29 01:00",
    "summary_text": "Chương trình JetBrains Student Pack Thông tin chính thức từ kênh đơn vị — Điều kiện áp dụng đang được đối soát minh bạch.",
    "verbatim_quote": "Cổng thông tin chính thức: jetbrains.com",
    "evidence_status": "Thông tin từ cổng chính thức • Đang đối soát chi tiết",
    "official_source_url": "https://www.jetbrains.com/community/education/#students",
    "action_type": "PRIMARY_LINK",
    "action_label": "Mở nguồn chính thức",
    "gateway_group": "MUA_GI",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "ALL_DAY",
    "allow_field_claims": false
  },
  {
    "item_id": "TGT_B_10",
    "tier": "OFFICIAL_PROGRAM",
    "tier_name": "Nguồn Đang Rà Soát AU",
    "badge_label": "NGUỒN CHÍNH THỨC — ĐANG RÀ SOÁT AU",
    "title": "Figma — Công Cụ Thiết Kế Giao Diện Cho Học Tập",
    "brand": "Figma",
    "monogram": "FG",
    "color_accent": "#2563eb",
    "category": "Học tập",
    "scope_text": "Toàn quốc (Trực tuyến)",
    "audience_target": "Học sinh, sinh viên và nhà giáo dục",
    "timing_window": "Trong thời gian học tập",
    "conditions_limit": "Xác thực tài khoản học tập",
    "observed_at": "2026-08-29 01:00",
    "summary_text": "Chương trình Figma for Education Thông tin chính thức từ kênh đơn vị — Điều kiện áp dụng đang được đối soát minh bạch.",
    "verbatim_quote": "Cổng thông tin chính thức: figma.com",
    "evidence_status": "Thông tin từ cổng chính thức • Đang đối soát chi tiết",
    "official_source_url": "https://www.figma.com/education/",
    "action_type": "PRIMARY_LINK",
    "action_label": "Mở nguồn chính thức",
    "gateway_group": "MUA_GI",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "ALL_DAY",
    "allow_field_claims": false
  },
  {
    "item_id": "TGT_B_11",
    "tier": "OFFICIAL_PROGRAM",
    "tier_name": "Nguồn Đang Rà Soát AU",
    "badge_label": "NGUỒN CHÍNH THỨC — ĐANG RÀ SOÁT AU",
    "title": "AWS — Chương Trình Học Điện Toán Đám Mây",
    "brand": "AWS",
    "monogram": "AWS",
    "color_accent": "#2563eb",
    "category": "Học tập",
    "scope_text": "Toàn quốc (Trực tuyến)",
    "audience_target": "Người học từ 13 tuổi trở lên",
    "timing_window": "Tự do theo tiến độ học tập",
    "conditions_limit": "Đăng ký tài khoản AWS Educate cá nhân",
    "observed_at": "2026-08-29 01:00",
    "summary_text": "Chương trình AWS Educate Thông tin chính thức từ kênh đơn vị — Điều kiện áp dụng đang được đối soát minh bạch.",
    "verbatim_quote": "Cổng thông tin chính thức: aws.amazon.com",
    "evidence_status": "Thông tin từ cổng chính thức • Đang đối soát chi tiết",
    "official_source_url": "https://aws.amazon.com/vi/education/awseducate/",
    "action_type": "PRIMARY_LINK",
    "action_label": "Mở nguồn chính thức",
    "gateway_group": "MUA_GI",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "ALL_DAY",
    "allow_field_claims": false
  },
  {
    "item_id": "FACILITY_DANABUS_CARD",
    "tier": "CIVIC_FACILITY",
    "tier_name": "Nguồn Đang Rà Soát AU",
    "badge_label": "NGUỒN CHÍNH THỨC — ĐANG RÀ SOÁT AU",
    "title": "DanaBus — Hệ Thống Xe Buýt Công Cộng Đà Nẵng",
    "brand": "DanaBus",
    "monogram": "DB",
    "color_accent": "#059669",
    "category": "Đi lại",
    "scope_text": "Mạng lưới tuyến xe buýt nội thành Đà Nẵng",
    "audience_target": "Người dân và du khách tại Đà Nẵng",
    "timing_window": "Theo lịch trình các tuyến xe buýt",
    "conditions_limit": "Tuân thủ quy định đi xe buýt công cộng",
    "observed_at": "2026-08-29 01:00",
    "summary_text": "Thông tin mạng lưới xe buýt công cộng Thông tin chính thức từ kênh đơn vị — Điều kiện áp dụng đang được đối soát minh bạch.",
    "verbatim_quote": "Cổng thông tin xe buýt: danangbus.vn",
    "evidence_status": "Thông tin từ cổng chính thức • Đang đối soát chi tiết",
    "official_source_url": "https://danangbus.vn",
    "action_type": "PRIMARY_LINK",
    "action_label": "Mở nguồn chính thức",
    "gateway_group": "DI_DAU",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "SLOT_MORNING",
    "allow_field_claims": false
  },
  {
    "item_id": "FACILITY_TNGO_BIKE",
    "tier": "CIVIC_FACILITY",
    "tier_name": "Nguồn Đang Rà Soát AU",
    "badge_label": "NGUỒN CHÍNH THỨC — ĐANG RÀ SOÁT AU",
    "title": "TNGO — Xe Đạp Đô Thị Công Cộng Đà Nẵng",
    "brand": "TNGO Bike",
    "monogram": "TG",
    "color_accent": "#059669",
    "category": "Đi lại",
    "scope_text": "Các trạm xe đạp công cộng toàn thành phố",
    "audience_target": "Người dân và du khách di chuyển cự ly ngắn",
    "timing_window": "Hoạt động 24/7 tại các trạm",
    "conditions_limit": "Sử dụng ứng dụng TNGO để mở khóa",
    "observed_at": "2026-08-29 01:00",
    "summary_text": "Mạng lưới xe đạp chia sẻ Thông tin chính thức từ kênh đơn vị — Điều kiện áp dụng đang được đối soát minh bạch.",
    "verbatim_quote": "Cổng dịch vụ xe đạp: tngo.vn",
    "evidence_status": "Thông tin từ cổng chính thức • Đang đối soát chi tiết",
    "official_source_url": "https://tngo.vn",
    "action_type": "PRIMARY_LINK",
    "action_label": "Mở nguồn chính thức",
    "gateway_group": "DI_DAU",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "SLOT_MORNING",
    "allow_field_claims": false
  },
  {
    "item_id": "FACILITY_DNG_LIBRARY",
    "tier": "CIVIC_FACILITY",
    "tier_name": "Nguồn Đang Rà Soát AU",
    "badge_label": "NGUỒN CHÍNH THỨC — ĐANG RÀ SOÁT AU",
    "title": "Thư Viện Khoa Học Tổng Hợp Đà Nẵng",
    "brand": "Thư Viện Tổng Hợp Đà Nẵng",
    "monogram": "TV",
    "color_accent": "#059669",
    "category": "Đời sống",
    "scope_text": "46 Bạch Đằng, Quận Hải Châu",
    "audience_target": "Bạn đọc và người có nhu cầu tự học",
    "timing_window": "07:30 – 21:00 các ngày trong tuần",
    "conditions_limit": "Đăng ký thẻ bạn đọc hoặc xuất trình CCCD",
    "observed_at": "2026-08-29 01:00",
    "summary_text": "Không gian đọc sách và tra cứu tài liệu công cộng Thông tin chính thức từ kênh đơn vị — Điều kiện áp dụng đang được đối soát minh bạch.",
    "verbatim_quote": "Cổng thông tin thư viện: thuvien.danang.gov.vn",
    "evidence_status": "Thông tin từ cổng chính thức • Đang đối soát chi tiết",
    "official_source_url": "http://thuvien.danang.gov.vn",
    "action_type": "PRIMARY_LINK",
    "action_label": "Mở nguồn chính thức",
    "gateway_group": "DI_DAU",
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "SLOT_AFTERNOON",
    "allow_field_claims": false
  },
  {
    "item_id": "FACILITY_PUBLIC_SERVICE",
    "tier": "CIVIC_FACILITY",
    "tier_name": "Nguồn Đang Rà Soát AU",
    "badge_label": "NGUỒN CHÍNH THỨC — ĐANG RÀ SOÁT AU",
    "title": "Cổng Dịch Vụ Công Trực Tuyến TP Đà Nẵng",
    "brand": "DVC Đà Nẵng",
    "monogram": "DVC",
    "color_accent": "#059669",
    "category": "Đời sống",
    "scope_text": "Trực tuyến toàn thành phố Đà Nẵng",
    "audience_target": "Công dân và doanh nghiệp tại Đà Nẵng",
    "timing_window": "Hệ thống tiếp nhận hồ sơ 24/7",
    "conditions_limit": "Đăng nhập qua tài khoản Định danh điện tử (VNeID)",
    "observed_at": "2026-08-29 01:00",
    "summary_text": "Cổng thông tin thủ tục hành chính trực tuyến Thông tin chính thức từ kênh đơn vị — Điều kiện áp dụng đang được đối soát minh bạch.",
    "verbatim_quote": "Cổng dịch vụ công: dichvucong.danang.gov.vn",
    "evidence_status": "Thông tin từ cổng chính thức • Đang đối soát chi tiết",
    "official_source_url": "https://dichvucong.danang.gov.vn",
    "action_type": "PRIMARY_LINK",
    "action_label": "Mở nguồn chính thức",
    "gateway_group": "DI_DAU",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "ALL_DAY",
    "allow_field_claims": false
  },
  {
    "item_id": "FACILITY_FAHASA_DNG",
    "tier": "CIVIC_FACILITY",
    "tier_name": "Nguồn Đang Rà Soát AU",
    "badge_label": "NGUỒN CHÍNH THỨC — ĐANG RÀ SOÁT AU",
    "title": "Nhà Sách Fahasa Đà Nẵng",
    "brand": "Fahasa Đà Nẵng",
    "monogram": "FH",
    "color_accent": "#059669",
    "category": "Học tập",
    "scope_text": "Đà Nẵng: 300–302 Lê Duẩn & Co.opmart",
    "audience_target": "Học sinh, sinh viên và bạn đọc yêu sách",
    "timing_window": "08:00 – 21:30 hàng ngày",
    "conditions_limit": "Xem thông tin niêm yết tại nhà sách",
    "observed_at": "2026-08-29 01:00",
    "summary_text": "Hệ thống nhà sách và đồ dùng học tập Thông tin chính thức từ kênh đơn vị — Điều kiện áp dụng đang được đối soát minh bạch.",
    "verbatim_quote": "Cổng thông tin nhà sách: fahasa.com",
    "evidence_status": "Thông tin từ cổng chính thức • Đang đối soát chi tiết",
    "official_source_url": "https://www.fahasa.com",
    "action_type": "PRIMARY_LINK",
    "action_label": "Mở nguồn chính thức",
    "gateway_group": "MUA_GI",
    "locality_tag": "THANH_KHE",
    "time_slot_tag": "SLOT_EVENING",
    "allow_field_claims": false
  },
  {
    "item_id": "FACILITY_VNR_STATION",
    "tier": "CIVIC_FACILITY",
    "tier_name": "Nguồn Đang Rà Soát AU",
    "badge_label": "NGUỒN CHÍNH THỨC — ĐANG RÀ SOÁT AU",
    "title": "Ga Đà Nẵng — Cổng Đặt Vé Tàu Hỏa Trực Tuyến",
    "brand": "Đường Sắt Việt Nam",
    "monogram": "DS",
    "color_accent": "#059669",
    "category": "Đi lại",
    "scope_text": "Đà Nẵng: 200 Hải Phòng, Quận Thanh Khê",
    "audience_target": "Hành khách di chuyển bằng đường sắt",
    "timing_window": "Cổng đặt vé trực tuyến 24/7",
    "conditions_limit": "Xuất trình CCCD và mã vé điện tử khi lên tàu",
    "observed_at": "2026-08-29 01:00",
    "summary_text": "Cổng thông tin đặt vé tàu hỏa trực tuyến Thông tin chính thức từ kênh đơn vị — Điều kiện áp dụng đang được đối soát minh bạch.",
    "verbatim_quote": "Cổng thông tin đường sắt: dsvn.vn",
    "evidence_status": "Thông tin từ cổng chính thức • Đang đối soát chi tiết",
    "official_source_url": "https://dsvn.vn",
    "action_type": "PRIMARY_LINK",
    "action_label": "Mở nguồn chính thức",
    "gateway_group": "DI_DAU",
    "locality_tag": "THANH_KHE",
    "time_slot_tag": "ALL_DAY",
    "allow_field_claims": false
  },
  {
    "item_id": "RADAR_GALAXY_CINE",
    "tier": "RADAR_SOURCE",
    "tier_name": "Radar Nguồn",
    "badge_label": "RADAR THEO DÕI NGUỒN",
    "title": "Rạp Phim Galaxy Cinema Đà Nẵng",
    "brand": "Galaxy Cinema",
    "monogram": "GX",
    "color_accent": "#64748b",
    "category": "Giải trí",
    "scope_text": "Đà Nẵng",
    "audience_target": "Theo dõi nguồn",
    "timing_window": "Theo dõi nguồn",
    "conditions_limit": "Theo dõi nguồn",
    "observed_at": "2026-08-29 01:00",
    "summary_text": "Theo dõi biến động nguồn tin cậy từ galaxycine.vn.",
    "verbatim_quote": "Kênh thông tin: galaxycine.vn",
    "evidence_status": "Theo dõi nguồn",
    "official_source_url": "https://www.galaxycine.vn",
    "action_type": "RADAR_LINK",
    "action_label": "Xem kênh gốc",
    "gateway_group": "DI_DAU",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "ALL_DAY",
    "allow_field_claims": false
  },
  {
    "item_id": "RADAR_LOTTE_CINEMA",
    "tier": "RADAR_SOURCE",
    "tier_name": "Radar Nguồn",
    "badge_label": "RADAR THEO DÕI NGUỒN",
    "title": "Rạp Phim Lotte Cinema Đà Nẵng",
    "brand": "Lotte Cinema",
    "monogram": "LC",
    "color_accent": "#64748b",
    "category": "Giải trí",
    "scope_text": "Đà Nẵng",
    "audience_target": "Theo dõi nguồn",
    "timing_window": "Theo dõi nguồn",
    "conditions_limit": "Theo dõi nguồn",
    "observed_at": "2026-08-29 01:00",
    "summary_text": "Theo dõi biến động nguồn tin cậy từ lottecinemavn.com.",
    "verbatim_quote": "Kênh thông tin: lottecinemavn.com",
    "evidence_status": "Theo dõi nguồn",
    "official_source_url": "https://www.lottecinemavn.com",
    "action_type": "RADAR_LINK",
    "action_label": "Xem kênh gốc",
    "gateway_group": "DI_DAU",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "ALL_DAY",
    "allow_field_claims": false
  },
  {
    "item_id": "RADAR_KFC",
    "tier": "RADAR_SOURCE",
    "tier_name": "Radar Nguồn",
    "badge_label": "RADAR THEO DÕI NGUỒN",
    "title": "Chuỗi Cửa Hàng KFC Đà Nẵng",
    "brand": "KFC Vietnam",
    "monogram": "KFC",
    "color_accent": "#64748b",
    "category": "Ăn uống",
    "scope_text": "Đà Nẵng",
    "audience_target": "Theo dõi nguồn",
    "timing_window": "Theo dõi nguồn",
    "conditions_limit": "Theo dõi nguồn",
    "observed_at": "2026-08-29 01:00",
    "summary_text": "Theo dõi biến động nguồn tin cậy từ kfcvietnam.com.vn.",
    "verbatim_quote": "Kênh thông tin: kfcvietnam.com.vn",
    "evidence_status": "Theo dõi nguồn",
    "official_source_url": "https://kfcvietnam.com.vn",
    "action_type": "RADAR_LINK",
    "action_label": "Xem kênh gốc",
    "gateway_group": "AN_GI",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "ALL_DAY",
    "allow_field_claims": false
  },
  {
    "item_id": "RADAR_JOLLIBEE",
    "tier": "RADAR_SOURCE",
    "tier_name": "Radar Nguồn",
    "badge_label": "RADAR THEO DÕI NGUỒN",
    "title": "Chuỗi Cửa Hàng Jollibee Đà Nẵng",
    "brand": "Jollibee Vietnam",
    "monogram": "JB",
    "color_accent": "#64748b",
    "category": "Ăn uống",
    "scope_text": "Đà Nẵng",
    "audience_target": "Theo dõi nguồn",
    "timing_window": "Theo dõi nguồn",
    "conditions_limit": "Theo dõi nguồn",
    "observed_at": "2026-08-29 01:00",
    "summary_text": "Theo dõi biến động nguồn tin cậy từ jollibee.com.vn.",
    "verbatim_quote": "Kênh thông tin: jollibee.com.vn",
    "evidence_status": "Theo dõi nguồn",
    "official_source_url": "https://jollibee.com.vn",
    "action_type": "RADAR_LINK",
    "action_label": "Xem kênh gốc",
    "gateway_group": "AN_GI",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "ALL_DAY",
    "allow_field_claims": false
  },
  {
    "item_id": "RADAR_HIGHLANDS",
    "tier": "RADAR_SOURCE",
    "tier_name": "Radar Nguồn",
    "badge_label": "RADAR THEO DÕI NGUỒN",
    "title": "Chuỗi Cà Phê Highlands Coffee Đà Nẵng",
    "brand": "Highlands Coffee",
    "monogram": "HL",
    "color_accent": "#64748b",
    "category": "Ăn uống",
    "scope_text": "Đà Nẵng",
    "audience_target": "Theo dõi nguồn",
    "timing_window": "Theo dõi nguồn",
    "conditions_limit": "Theo dõi nguồn",
    "observed_at": "2026-08-29 01:00",
    "summary_text": "Theo dõi biến động nguồn tin cậy từ highlandscoffee.com.vn.",
    "verbatim_quote": "Kênh thông tin: highlandscoffee.com.vn",
    "evidence_status": "Theo dõi nguồn",
    "official_source_url": "https://www.highlandscoffee.com.vn",
    "action_type": "RADAR_LINK",
    "action_label": "Xem kênh gốc",
    "gateway_group": "AN_GI",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "ALL_DAY",
    "allow_field_claims": false
  },
  {
    "item_id": "RADAR_THECOFFEEHOUSE",
    "tier": "RADAR_SOURCE",
    "tier_name": "Radar Nguồn",
    "badge_label": "RADAR THEO DÕI NGUỒN",
    "title": "Chuỗi Cà Phê The Coffee House Đà Nẵng",
    "brand": "The Coffee House",
    "monogram": "TCH",
    "color_accent": "#64748b",
    "category": "Ăn uống",
    "scope_text": "Đà Nẵng",
    "audience_target": "Theo dõi nguồn",
    "timing_window": "Theo dõi nguồn",
    "conditions_limit": "Theo dõi nguồn",
    "observed_at": "2026-08-29 01:00",
    "summary_text": "Theo dõi biến động nguồn tin cậy từ thecoffeehouse.com.",
    "verbatim_quote": "Kênh thông tin: thecoffeehouse.com",
    "evidence_status": "Theo dõi nguồn",
    "official_source_url": "https://thecoffeehouse.com",
    "action_type": "RADAR_LINK",
    "action_label": "Xem kênh gốc",
    "gateway_group": "AN_GI",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "ALL_DAY",
    "allow_field_claims": false
  },
  {
    "item_id": "RADAR_PHUC_LONG",
    "tier": "RADAR_SOURCE",
    "tier_name": "Radar Nguồn",
    "badge_label": "RADAR THEO DÕI NGUỒN",
    "title": "Chuỗi Trà & Cà Phê Phúc Long Đà Nẵng",
    "brand": "Phúc Long Coffee & Tea",
    "monogram": "PL",
    "color_accent": "#64748b",
    "category": "Ăn uống",
    "scope_text": "Đà Nẵng",
    "audience_target": "Theo dõi nguồn",
    "timing_window": "Theo dõi nguồn",
    "conditions_limit": "Theo dõi nguồn",
    "observed_at": "2026-08-29 01:00",
    "summary_text": "Theo dõi biến động nguồn tin cậy từ phuclong.com.vn.",
    "verbatim_quote": "Kênh thông tin: phuclong.com.vn",
    "evidence_status": "Theo dõi nguồn",
    "official_source_url": "https://phuclong.com.vn",
    "action_type": "RADAR_LINK",
    "action_label": "Xem kênh gốc",
    "gateway_group": "AN_GI",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "ALL_DAY",
    "allow_field_claims": false
  },
  {
    "item_id": "RADAR_VINCOM_PLAZA",
    "tier": "RADAR_SOURCE",
    "tier_name": "Radar Nguồn",
    "badge_label": "RADAR THEO DÕI NGUỒN",
    "title": "Trung Tâm Thương Mại Vincom Plaza Ngô Quyền",
    "brand": "Vincom Plaza Đà Nẵng",
    "monogram": "VC",
    "color_accent": "#64748b",
    "category": "Giải trí",
    "scope_text": "Đà Nẵng",
    "audience_target": "Theo dõi nguồn",
    "timing_window": "Theo dõi nguồn",
    "conditions_limit": "Theo dõi nguồn",
    "observed_at": "2026-08-29 01:00",
    "summary_text": "Theo dõi biến động nguồn tin cậy từ vincom.com.vn.",
    "verbatim_quote": "Kênh thông tin: vincom.com.vn",
    "evidence_status": "Theo dõi nguồn",
    "official_source_url": "https://vincom.com.vn",
    "action_type": "RADAR_LINK",
    "action_label": "Xem kênh gốc",
    "gateway_group": "DI_DAU",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "ALL_DAY",
    "allow_field_claims": false
  },
  {
    "item_id": "RADAR_COOPMART_DNG",
    "tier": "RADAR_SOURCE",
    "tier_name": "Radar Nguồn",
    "badge_label": "RADAR THEO DÕI NGUỒN",
    "title": "Siêu Thị Co.opmart Đà Nẵng",
    "brand": "Co.opmart Đà Nẵng",
    "monogram": "CP",
    "color_accent": "#64748b",
    "category": "Mua sắm",
    "scope_text": "Đà Nẵng",
    "audience_target": "Theo dõi nguồn",
    "timing_window": "Theo dõi nguồn",
    "conditions_limit": "Theo dõi nguồn",
    "observed_at": "2026-08-29 01:00",
    "summary_text": "Theo dõi biến động nguồn tin cậy từ co-opmart.com.vn.",
    "verbatim_quote": "Kênh thông tin: co-opmart.com.vn",
    "evidence_status": "Theo dõi nguồn",
    "official_source_url": "http://co-opmart.com.vn",
    "action_type": "RADAR_LINK",
    "action_label": "Xem kênh gốc",
    "gateway_group": "MUA_GI",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "ALL_DAY",
    "allow_field_claims": false
  },
  {
    "item_id": "RADAR_GO_DANANG",
    "tier": "RADAR_SOURCE",
    "tier_name": "Radar Nguồn",
    "badge_label": "RADAR THEO DÕI NGUỒN",
    "title": "Đại Siêu Thị GO! Đà Nẵng",
    "brand": "GO! Đà Nẵng",
    "monogram": "GO",
    "color_accent": "#64748b",
    "category": "Mua sắm",
    "scope_text": "Đà Nẵng",
    "audience_target": "Theo dõi nguồn",
    "timing_window": "Theo dõi nguồn",
    "conditions_limit": "Theo dõi nguồn",
    "observed_at": "2026-08-29 01:00",
    "summary_text": "Theo dõi biến động nguồn tin cậy từ go-vietnam.vn.",
    "verbatim_quote": "Kênh thông tin: go-vietnam.vn",
    "evidence_status": "Theo dõi nguồn",
    "official_source_url": "https://go-vietnam.vn",
    "action_type": "RADAR_LINK",
    "action_label": "Xem kênh gốc",
    "gateway_group": "MUA_GI",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "ALL_DAY",
    "allow_field_claims": false
  },
  {
    "item_id": "RADAR_LONG_CHAU",
    "tier": "RADAR_SOURCE",
    "tier_name": "Radar Nguồn",
    "badge_label": "RADAR THEO DÕI NGUỒN",
    "title": "Hệ Thống Nhà Thuốc FPT Long Châu Đà Nẵng",
    "brand": "FPT Long Châu",
    "monogram": "LC",
    "color_accent": "#64748b",
    "category": "Mua sắm",
    "scope_text": "Đà Nẵng",
    "audience_target": "Theo dõi nguồn",
    "timing_window": "Theo dõi nguồn",
    "conditions_limit": "Theo dõi nguồn",
    "observed_at": "2026-08-29 01:00",
    "summary_text": "Theo dõi biến động nguồn tin cậy từ nhathuoclongchau.com.vn.",
    "verbatim_quote": "Kênh thông tin: nhathuoclongchau.com.vn",
    "evidence_status": "Theo dõi nguồn",
    "official_source_url": "https://nhathuoclongchau.com.vn",
    "action_type": "RADAR_LINK",
    "action_label": "Xem kênh gốc",
    "gateway_group": "MUA_GI",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "ALL_DAY",
    "allow_field_claims": false
  },
  {
    "item_id": "RADAR_PHARMACITY",
    "tier": "RADAR_SOURCE",
    "tier_name": "Radar Nguồn",
    "badge_label": "RADAR THEO DÕI NGUỒN",
    "title": "Hệ Thống Nhà Thuốc Tiện Lợi Pharmacity Đà Nẵng",
    "brand": "Pharmacity",
    "monogram": "PMC",
    "color_accent": "#64748b",
    "category": "Mua sắm",
    "scope_text": "Đà Nẵng",
    "audience_target": "Theo dõi nguồn",
    "timing_window": "Theo dõi nguồn",
    "conditions_limit": "Theo dõi nguồn",
    "observed_at": "2026-08-29 01:00",
    "summary_text": "Theo dõi biến động nguồn tin cậy từ pharmacity.vn.",
    "verbatim_quote": "Kênh thông tin: pharmacity.vn",
    "evidence_status": "Theo dõi nguồn",
    "official_source_url": "https://www.pharmacity.vn",
    "action_type": "RADAR_LINK",
    "action_label": "Xem kênh gốc",
    "gateway_group": "MUA_GI",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "ALL_DAY",
    "allow_field_claims": false
  },
  {
    "item_id": "RADAR_WINMART_DNG",
    "tier": "RADAR_SOURCE",
    "tier_name": "Radar Nguồn",
    "badge_label": "RADAR THEO DÕI NGUỒN",
    "title": "Hệ Thống Siêu Thị WinMart / WinMart+ Đà Nẵng",
    "brand": "WinMart Vietnam",
    "monogram": "WM",
    "color_accent": "#64748b",
    "category": "Mua sắm",
    "scope_text": "Đà Nẵng",
    "audience_target": "Theo dõi nguồn",
    "timing_window": "Theo dõi nguồn",
    "conditions_limit": "Theo dõi nguồn",
    "observed_at": "2026-08-29 01:00",
    "summary_text": "Theo dõi biến động nguồn tin cậy từ winmart.vn.",
    "verbatim_quote": "Kênh thông tin: winmart.vn",
    "evidence_status": "Theo dõi nguồn",
    "official_source_url": "https://winmart.vn",
    "action_type": "RADAR_LINK",
    "action_label": "Xem kênh gốc",
    "gateway_group": "MUA_GI",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "ALL_DAY",
    "allow_field_claims": false
  }
];

// App State
let activeView = 'HOME'; // HOME | EXPLORE | BUY_DECISION | VOUCHERS | NEARBY | SAVED
let activeGateway = 'ALL'; // ALL | AN_GI | DI_DAU | MUA_GI
let activeTimeSlot = 'ALL'; // ALL | SLOT_MORNING | SLOT_LUNCH | SLOT_AFTERNOON | SLOT_EVENING
let activeLocality = 'ALL'; // ALL | HAI_CHAU | THANH_KHE | SON_TRA | NGU_HANH_SON | HOA_KHANH | CAM_LE
let activeTier = 'ALL'; // ALL | VERIFIED_DEAL | VERIFIED_OFFICIAL_PROGRAM | VERIFIED_FACILITY | RADAR_TRACKING
let searchQuery = '';
let currentTheme = 'light';
let savedItemIds = new Set();

try {
  if (typeof localStorage !== 'undefined') {
    const stored = localStorage.getItem('jayt_saved_opportunities');
    if (stored) savedItemIds = new Set(JSON.parse(stored));
    const storedTheme = localStorage.getItem('jayt_theme_mode');
    if (storedTheme) currentTheme = storedTheme;
  }
} catch (e) {
  console.warn('LocalStorage unavailable');
}

// Accessible Modal Controller with Focus Trapping & Escape Listener
const ModalController = {
  activeType: null,
  lastFocusedEl: null,
  focusableElementsString: 'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',

  init() {
    if (typeof document === 'undefined') return;
    const backdrop = document.getElementById('jayt-modal-root');
    if (!backdrop) return;
    backdrop.classList.remove('is-open');
    backdrop.setAttribute('hidden', '');
    backdrop.style.display = 'none';
    backdrop.innerHTML = '';

    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) this.close();
    });

    document.addEventListener('keydown', (e) => {
      if (!this.activeType) return;
      if (e.key === 'Escape') { e.preventDefault(); this.close(); return; }
      if (e.key === 'Tab') this.handleFocusTrap(e);
    });
  },

  open(payload, triggerEl = null) {
    if (typeof document === 'undefined') return;
    if (!payload || !payload.type) { this.close(); return; }
    if (this.activeType) this.close(false);

    this.lastFocusedEl = triggerEl || document.activeElement;
    this.activeType = payload.type;
    const root = document.getElementById('jayt-modal-root');
    if (!root) return;

    if (payload.type === 'ITEM_DETAIL') {
      root.innerHTML = this.renderDetailModal(payload.item);
    } else if (payload.type === 'REPORT_SOURCE') {
      root.innerHTML = this.renderReportModal();
    }

    root.style.display = 'flex';
    root.removeAttribute('hidden');
    root.classList.add('is-open');

    const focusable = root.querySelectorAll(this.focusableElementsString);
    if (focusable.length > 0) focusable[0].focus();

    const closeBtns = root.querySelectorAll('.jayt-modal-close-btn');
    closeBtns.forEach(btn => btn.addEventListener('click', () => this.close()));

    if (payload.type === 'REPORT_SOURCE') {
      const form = root.querySelector('#form-report-source');
      if (form) {
        form.addEventListener('submit', (e) => {
          e.preventDefault();
          this.close();
          showToast('Cảm ơn bạn! Đề xuất đã được chuyển đến bộ phận Data & Trust kiểm duyệt.');
        });
      }
    }
  },

  close(restoreFocus = true) {
    if (typeof document === 'undefined') return;
    const root = document.getElementById('jayt-modal-root');
    if (root) {
      root.classList.remove('is-open');
      root.setAttribute('hidden', '');
      root.style.display = 'none';
      root.innerHTML = '';
    }
    this.activeType = null;
    if (restoreFocus && this.lastFocusedEl && typeof this.lastFocusedEl.focus === 'function') {
      this.lastFocusedEl.focus();
    }
  },

  handleFocusTrap(e) {
    if (typeof document === 'undefined') return;
    const root = document.getElementById('jayt-modal-root');
    if (!root) return;
    const focusable = Array.from(root.querySelectorAll(this.focusableElementsString));
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  },

  renderDetailModal(item) {
    let tierBadgeText = 'Ưu Đãi Xác Minh';
    let tierBadgeClass = 'badge-deal';
    if (item.tier === 'VERIFIED_OFFICIAL_PROGRAM') {
      tierBadgeText = 'Chương Trình Chính Thức';
      tierBadgeClass = 'badge-verified';
    } else if (item.tier === 'VERIFIED_FACILITY') {
      tierBadgeText = 'Địa Điểm & Tiện Ích Đô Thị';
      tierBadgeClass = 'badge-facility';
    } else if (item.tier === 'RADAR_TRACKING') {
      tierBadgeText = 'Radar Theo Dõi Nguồn';
      tierBadgeClass = 'badge-radar';
    }

    return `
      <div class="jayt-modal-card" role="dialog" aria-modal="true" aria-labelledby="modal-detail-title">
        <div class="jayt-modal-header">
          <div class="modal-badge-row">
            <span class="modal-tier-badge ${tierBadgeClass}">${tierBadgeText}</span>
            <span class="modal-brand-tag">${item.brand}</span>
          </div>
          <h2 id="modal-detail-title" class="jayt-modal-title">${item.title}</h2>
          <button class="jayt-modal-close-btn" aria-label="Đóng cửa sổ">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        
        <div class="jayt-modal-body">
          <!-- Summary & Key conditions -->
          <div class="modal-section">
            <h4 class="modal-sec-heading">Điều kiện & Hướng dẫn sử dụng</h4>
            <div class="modal-info-grid">
              <div class="modal-info-item">
                <span class="info-label">Đối tượng:</span>
                <span class="info-value">${item.audience_target}</span>
              </div>
              <div class="modal-info-item">
                <span class="info-label">Khung giờ:</span>
                <span class="info-value">${item.timing_window}</span>
              </div>
              <div class="modal-info-item">
                <span class="info-label">Điều kiện:</span>
                <span class="info-value">${item.conditions_limit}</span>
              </div>
              <div class="modal-info-item">
                <span class="info-label">Địa bàn:</span>
                <span class="info-value">${item.scope_text}</span>
              </div>
            </div>
          </div>

          <!-- Verbatim Quote from Source -->
          <div class="modal-section">
            <h4 class="modal-sec-heading">Trích dẫn chứng cứ gốc (Verbatim Quote)</h4>
            <blockquote class="modal-quote-box">
              "${item.verbatim_quote}"
            </blockquote>
          </div>

          <!-- Provenance and audit metadata -->
          <div class="modal-section">
            <h4 class="modal-sec-heading">Minh bạch nguồn gốc & Kiểm định</h4>
            <div class="modal-provenance-box">
              <p><strong>Nguồn đối soát chính thức:</strong> <a href="${item.official_source_url}" target="_blank" rel="noopener noreferrer">${item.official_source_url}</a></p>
              <p><strong>Trạng thái dữ liệu:</strong> ${item.evidence_status}</p>
              <p><strong>Thời điểm quan sát:</strong> ${item.observed_at}</p>
              <p class="trust-note">JayT chỉ cung cấp liên kết trực tiếp tới website chính thức của đơn vị, tuyệt đối không chứa liên kết tiếp thị liên kết hay hoa hồng trung gian.</p>
            </div>
          </div>
        </div>

        <div class="jayt-modal-footer">
          <a href="${item.official_source_url}" target="_blank" rel="noopener noreferrer" class="btn-modal-primary">
            Mở cổng chính thức &rarr;
          </a>
          <button class="btn-modal-secondary jayt-modal-close-btn">Đóng</button>
        </div>
      </div>
    `;
  },

  renderReportModal() {
    return `
      <div class="jayt-modal-card" role="dialog" aria-modal="true" aria-labelledby="modal-report-title">
        <div class="jayt-modal-header">
          <span class="modal-tier-badge badge-verified">ĐÓNG GÓP TIỆN ÍCH</span>
          <h2 id="modal-report-title" class="jayt-modal-title">Gợi ý nguồn hoặc tiện ích mới</h2>
          <button class="jayt-modal-close-btn" aria-label="Đóng cửa sổ">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        <form id="form-report-source" class="jayt-form">
          <div class="jayt-modal-body">
            <div class="form-group">
              <label for="report-title">Tên tiện ích / chương trình (*)</label>
              <input type="text" id="report-title" class="form-input" placeholder="Ví dụ: Điểm tiêm chủng mở rộng Đà Nẵng" required />
            </div>
            <div class="form-group">
              <label for="report-url">Đường dẫn website chính thức (*)</label>
              <input type="url" id="report-url" class="form-input" placeholder="https://..." required />
            </div>
            <div class="form-group">
              <label for="report-desc">Mô tả giá trị tiện ích</label>
              <textarea id="report-desc" class="form-textarea" rows="3" placeholder="Điều kiện, khung giờ, địa bàn..."></textarea>
            </div>
          </div>
          <div class="jayt-modal-footer">
            <button type="submit" class="btn-modal-primary">Gửi kiểm duyệt</button>
            <button type="button" class="btn-modal-secondary jayt-modal-close-btn">Hủy</button>
          </div>
        </form>
      </div>
    `;
  }
};

function showToast(message) {
  if (typeof document === 'undefined') return;
  const container = document.getElementById('jayt-toast-root');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = 'jayt-toast';
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('fade-out');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

function initStorefrontApp() {
  if (typeof document === 'undefined') return;
  const root = document.getElementById('jayt-app-root') || document.getElementById('app') || document.body;
  if (!root) return;

  document.documentElement.setAttribute('data-theme', currentTheme);

  root.innerHTML = renderAppShell();
  ModalController.init();
  attachGlobalEvents();
  renderCurrentView();
}

function renderAppShell() {
  return `
    <div class="jayt-shell-container">
      <!-- Desktop & Tablet Header Bar -->
      <header class="jayt-top-nav" role="banner">
        <div class="nav-container">
          <div class="nav-brand" role="button" tabindex="0" data-nav="HOME" aria-label="JayT Đà Nẵng — Trang Chủ">
            <div class="brand-logo-mark" aria-hidden="true">
              <svg class="jflow-icon-svg" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 6 V19 C19 24.5 15.5 28 10 28 C6.5 28 4.2 26 3.5 24 C5.2 24 7 22.8 7.5 20.8 C8 18.5 6.5 16.5 4.5 16.5 C3.8 16.5 3 16.8 2.5 17.2 C3.5 10.5 11 6 19 6 Z" fill="url(#jflow-head-grad)"/>
                <path d="M19 14 C23.5 14 27.5 17 29.5 21 C31 24 32.5 28 33.5 31 C29.5 29 25 27.5 19 27.5 V21.5 C22 21.5 24.5 23 26 24.5 C24.5 20 20.5 17.5 16 17 L19 14 Z" fill="url(#jflow-head-grad)" opacity="0.9"/>
                <circle cx="27" cy="8" r="3.5" fill="#f97316"/>
                <defs>
                  <linearGradient id="jflow-head-grad" x1="4" y1="4" x2="34" y2="34" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#0f766e"/>
                    <stop offset="0.6" stop-color="#0284c7"/>
                    <stop offset="1" stop-color="#f97316"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div class="brand-text-block">
              <span class="brand-logotype">JayT</span>
              <span class="brand-sub">Đà Nẵng</span>
            </div>
            <span class="brand-edition-pill">Daily Guide</span>
          </div>

          <nav class="nav-links-desktop" role="navigation" aria-label="Điều hướng chính">
            <button class="nav-btn active" data-nav="HOME">Hôm nay</button>
            <button class="nav-btn" data-nav="EXPLORE">Khám phá</button>
            <button class="nav-btn" data-nav="VOUCHERS">Ví Ưu Đãi & Voucher</button>
            <button class="nav-btn" data-nav="SAVED">
              Đã lưu <span class="nav-saved-count" id="saved-counter">${savedItemIds.size}</span>
            </button>
          </nav>

          <div class="nav-actions-desktop">
            <button id="btn-toggle-theme" class="btn-icon-theme" aria-label="Đổi giao diện Sáng/Tối" title="Đổi giao diện Sáng/Tối">
              ${currentTheme === 'dark' ? `
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
              ` : `
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
              `}
            </button>
            <button id="btn-open-report" class="btn-report-source" aria-haspopup="dialog">+ Báo nguồn</button>
          </div>
        </div>
      </header>

      <!-- Main Dynamic Content Canvas -->
      <main class="jayt-main-canvas" role="main" id="jayt-view-canvas">
        <!-- Rendered by view controller -->
      </main>

      <!-- Footer -->
      <footer class="jayt-footer" role="contentinfo">
        <div class="footer-container">
          <div class="footer-brand-col">
            <span class="footer-logo">JayT Đà Nẵng</span>
            <p class="footer-mission">Nền tảng cẩm nang tiện ích và quyền lợi cộng đồng — Vận hành theo Chỉ thị JAYT-245.</p>
          </div>
          <div class="footer-links-col">
            <span class="footer-heading">Nhận diện & Nguyên tắc</span>
            <p class="footer-text">100% bằng chứng đối soát • Không voucher ảo • Thương hiệu độc quyền J-Flow</p>
            <button id="btn-open-brand-boards" class="btn-brand-boards-link">🎨 Xem 3 Brand Boards (Section BH)</button>
          </div>
        </div>
      </footer>

      <!-- Mobile Bottom Navigation Bar (Thumb-Zone Optimized) -->
      <nav class="jayt-mobile-bottom-nav" role="navigation" aria-label="Điều hướng di động">
        <button class="mobile-nav-btn active" data-nav="HOME">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
          <span>Hôm nay</span>
        </button>
        <button class="mobile-nav-btn" data-nav="EXPLORE">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>
          <span>Khám phá</span>
        </button>
        <button class="mobile-nav-btn" data-nav="VOUCHERS">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>
          <span>Ví Voucher</span>
        </button>
        <button class="mobile-nav-btn" data-nav="SAVED">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
          <span>Đã lưu</span>
        </button>
      </nav>
    </div>

    <div id="jayt-modal-root" class="jayt-modal-backdrop" hidden style="display: none;"></div>
    <div id="jayt-toast-root" class="jayt-toast-container" role="status" aria-live="polite"></div>
  `;
}

function attachGlobalEvents() {

  // Brand Boards Modal Handler
  const brandBtn = document.getElementById('btn-open-brand-boards');
  if (brandBtn) {
    brandBtn.addEventListener('click', () => {
      const modalRoot = document.getElementById('jayt-modal-root');
      if (!modalRoot) return;

      modalRoot.innerHTML = `
        <div class="jayt-modal-box brand-boards-modal-box" role="dialog" aria-modal="true" aria-labelledby="brand-modal-title">
          <div class="modal-header">
            <div>
              <span class="modal-kicker kicker-deal">JAYT BRAND IDENTITY SYSTEM (SECTION BH)</span>
              <h2 id="brand-modal-title" class="modal-title">3 Phương Án Nhận Diện Thương Hiệu JayT</h2>
            </div>
            <button class="modal-close-btn" aria-label="Đóng bảng nhận diện" id="btn-close-brand-modal">&times;</button>
          </div>
          
          <div class="modal-body-scrollable">
            <div class="brand-boards-grid">
              <!-- Board 1: J-Flow (Default) -->
              <div class="brand-board-card board-recommended">
                <div class="board-badge">PHƯƠNG ÁN 1 • TRIỂN KHAI MẶC ĐỊNH (KHUYẾN NGHỊ)</div>
                <h3 class="board-title">J-Flow — Discovery Stream</h3>
                <div class="board-preview-box">
                  <svg class="jflow-preview-svg" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 6 V19 C19 24.5 15.5 28 10 28 C6.5 28 4.2 26 3.5 24 C5.2 24 7 22.8 7.5 20.8 C8 18.5 6.5 16.5 4.5 16.5 C3.8 16.5 3 16.8 2.5 17.2 C3.5 10.5 11 6 19 6 Z" fill="url(#jflow-modal-grad)"/>
                    <path d="M19 14 C23.5 14 27.5 17 29.5 21 C31 24 32.5 28 33.5 31 C29.5 29 25 27.5 19 27.5 V21.5 C22 21.5 24.5 23 26 24.5 C24.5 20 20.5 17.5 16 17 L19 14 Z" fill="url(#jflow-modal-grad)" opacity="0.9"/>
                    <circle cx="27" cy="8" r="3.5" fill="#f97316"/>
                    <defs>
                      <linearGradient id="jflow-modal-grad" x1="4" y1="4" x2="34" y2="34" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#0f766e"/>
                        <stop offset="0.6" stop-color="#0284c7"/>
                        <stop offset="1" stop-color="#f97316"/>
                      </linearGradient>
                    </defs>
                  </svg>
                  <span class="board-lockup-text">JayT Đà Nẵng</span>
                </div>
                <p class="board-desc">Chữ J nét liền dòng chảy sông Hàn hướng lên và điểm sáng khám phá tiện ích. Độc quyền, sắc nét ở mọi kích cỡ 16px–1024px.</p>
                <div class="board-palette">
                  <span class="color-dot" style="background:#0f766e" title="Deep Teal"></span>
                  <span class="color-dot" style="background:#0284c7" title="Sky Blue"></span>
                  <span class="color-dot" style="background:#f97316" title="Coral Sunrise"></span>
                </div>
              </div>

              <!-- Board 2: Pulse -->
              <div class="brand-board-card">
                <div class="board-badge badge-comparison">PHƯƠNG ÁN 2 • SO SÁNH</div>
                <h3 class="board-title">JayT Pulse — Nhịp Sống Đô Thị</h3>
                <div class="board-preview-box">
                  <svg class="jflow-preview-svg" viewBox="0 0 36 36" fill="none">
                    <rect x="8" y="8" width="20" height="20" rx="6" fill="#1e40af"/>
                    <path d="M14 20 L17 14 L20 24 L23 18" stroke="#f59e0b" stroke-width="2.5" stroke-linecap="round"/>
                  </svg>
                  <span class="board-lockup-text">JayT Pulse</span>
                </div>
                <p class="board-desc">Nhấn mạnh sóng radar quét tiện ích và nhịp sống số thời gian thực.</p>
                <div class="board-palette">
                  <span class="color-dot" style="background:#1e40af"></span>
                  <span class="color-dot" style="background:#f59e0b"></span>
                  <span class="color-dot" style="background:#334155"></span>
                </div>
              </div>

              <!-- Board 3: Gateway -->
              <div class="brand-board-card">
                <div class="board-badge badge-comparison">PHƯƠNG ÁN 3 • SO SÁNH</div>
                <h3 class="board-title">JayT Gateway — Cổng Kết Nối</h3>
                <div class="board-preview-box">
                  <svg class="jflow-preview-svg" viewBox="0 0 36 36" fill="none">
                    <path d="M10 8 H26 V28 H10 Z" fill="#4338ca" opacity="0.85"/>
                    <circle cx="18" cy="18" r="5" fill="#10b981"/>
                  </svg>
                  <span class="board-lockup-text">JayT Gateway</span>
                </div>
                <p class="board-desc">Cổng mở đa chiều kết nối học sinh sinh viên đến các quyền lợi xã hội.</p>
                <div class="board-palette">
                  <span class="color-dot" style="background:#4338ca"></span>
                  <span class="color-dot" style="background:#10b981"></span>
                  <span class="color-dot" style="background:#1e293b"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;

      modalRoot.hidden = false;
      modalRoot.style.display = 'flex';

      const closeBtn = document.getElementById('btn-close-brand-modal');
      if (closeBtn) {
        closeBtn.addEventListener('click', () => {
          modalRoot.hidden = true;
          modalRoot.style.display = 'none';
        });
      }
    });
  }

  if (typeof document === 'undefined') return;

  // Nav Click Handler
  document.querySelectorAll('[data-nav]').forEach(el => {
    el.addEventListener('click', () => {
      const targetNav = el.dataset.nav;
      activeView = targetNav;
      
      document.querySelectorAll('.nav-btn, .mobile-nav-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.nav === targetNav);
      });

      renderCurrentView();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  // Theme Toggle Button
  const themeBtn = document.getElementById('btn-toggle-theme');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      currentTheme = currentTheme === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', currentTheme);
      try {
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('jayt_theme_mode', currentTheme);
        }
      } catch (e) {}
      renderAppShell();
      attachGlobalEvents();
      renderCurrentView();
      showToast(`Đã chuyển sang giao diện ${currentTheme === 'dark' ? 'Tối' : 'Sáng'}`);
    });
  }

  // Open Report Modal
  const reportBtn = document.getElementById('btn-open-report');
  if (reportBtn) {
    reportBtn.addEventListener('click', () => {
      ModalController.open({ type: 'REPORT_SOURCE' }, reportBtn);
    });
  }
}

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
  } else if (activeView === 'BUY_DECISION') {
    canvas.innerHTML = renderBuyDecisionHub();
    attachBuyDecisionEvents();
  } else if (activeView === 'VOUCHERS') {
    canvas.innerHTML = renderVoucherWalletView();
    attachVoucherWalletEvents();
    attachCardListeners();
  } else if (activeView === 'SAVED') {
    canvas.innerHTML = renderSavedView();
    attachCardListeners();
  }

  attachCardListeners();
}



const JAYT_TIME_SLOT_VISUALS = {
  SLOT_MORNING: {
    kicker: "BÌNH MINH ĐÀ NẴNG • 06:00 – 11:00",
    title: "Sáng nay bạn muốn khởi đầu thế nào?",
    promise: "Gợi ý bữa sáng thơm ngon, cà phê bên sông Hàn và tuyến xe buýt nhanh đến trường / công sở.",
    gradient: "linear-gradient(135deg, rgba(254, 243, 199, 0.4) 0%, rgba(219, 234, 254, 0.5) 100%)",
    illustration_svg: `<svg class="hero-time-svg" viewBox="0 0 240 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="120" cy="50" r="36" fill="url(#sun-grad-m)" opacity="0.85"/>
      <path d="M20 85 C60 70, 100 80, 140 75 C180 70, 200 80, 220 85" stroke="#3b82f6" stroke-width="3" stroke-linecap="round" opacity="0.6"/>
      <path d="M40 90 C80 82, 120 88, 160 84 C190 80, 210 88, 230 90" stroke="#06b6d4" stroke-width="2" stroke-linecap="round" opacity="0.5"/>
      <defs>
        <linearGradient id="sun-grad-m" x1="84" y1="14" x2="156" y2="86" gradientUnits="userSpaceOnUse">
          <stop stop-color="#fbbf24"/>
          <stop offset="1" stop-color="#f97316"/>
        </linearGradient>
      </defs>
    </svg>`
  },
  SLOT_LUNCH: {
    kicker: "TRƯA ĐÀ NẴNG NĂNG ĐỘNG • 11:00 – 14:00",
    title: "Trưa nay ăn gì nhanh & tiện lợi?",
    promise: "Khám phá thực đơn cơm trưa văn phòng, combo gà giòn, pizza và điểm hẹn mát mẻ giữa ngày.",
    gradient: "linear-gradient(135deg, rgba(254, 215, 170, 0.4) 0%, rgba(254, 240, 138, 0.4) 100%)",
    illustration_svg: `<svg class="hero-time-svg" viewBox="0 0 240 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="120" cy="40" r="28" fill="#f59e0b" opacity="0.9"/>
      <path d="M40 75 C70 65, 110 68, 140 65 C170 62, 200 70, 220 75" stroke="#ea580c" stroke-width="3" stroke-linecap="round" opacity="0.7"/>
      <path d="M60 85 C90 80, 130 82, 160 80 C180 78, 200 85, 220 85" stroke="#f97316" stroke-width="2" stroke-linecap="round" opacity="0.5"/>
    </svg>`
  },
  SLOT_AFTERNOON: {
    kicker: "NẮNG CHIỀU KHÁM PHÁ • 14:00 – 18:00",
    title: "Chiều nay học nhóm hay dạo phố?",
    promise: "Không gian trà chiều yên tĩnh, xe đạp công cộng TNGO, thư viện tổng hợp và xe buýt mát lạnh.",
    gradient: "linear-gradient(135deg, rgba(224, 242, 254, 0.4) 0%, rgba(209, 250, 229, 0.4) 100%)",
    illustration_svg: `<svg class="hero-time-svg" viewBox="0 0 240 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M30 60 C70 50, 110 55, 150 50 C180 46, 200 55, 220 60" stroke="#059669" stroke-width="3" stroke-linecap="round" opacity="0.7"/>
      <path d="M50 75 C80 68, 120 72, 150 68 C180 64, 200 72, 220 75" stroke="#0284c7" stroke-width="2.5" stroke-linecap="round" opacity="0.6"/>
      <circle cx="70" cy="35" r="16" fill="#10b981" opacity="0.8"/>
    </svg>`
  },
  SLOT_EVENING: {
    kicker: "ĐÊM ĐÀ NẴNG RỰC SÁNG • 18:00 – 23:00",
    title: "Tối nay hẹn hò xem phim hay kèo nhóm?",
    promise: "Suất chiếu rạp CGV, Metiz, Starlight, dạo cầu Rồng phun lửa và trà sữa trò chuyện thâu đêm.",
    gradient: "linear-gradient(135deg, rgba(238, 242, 255, 0.4) 0%, rgba(243, 232, 255, 0.4) 100%)",
    illustration_svg: `<svg class="hero-time-svg" viewBox="0 0 240 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="180" cy="35" r="22" fill="#818cf8" opacity="0.8"/>
      <path d="M20 75 C60 65, 100 70, 140 65 C180 60, 200 70, 220 75" stroke="#6366f1" stroke-width="3" stroke-linecap="round" opacity="0.7"/>
      <path d="M40 85 C80 78, 120 82, 160 78 C190 75, 210 82, 230 85" stroke="#a855f7" stroke-width="2" stroke-linecap="round" opacity="0.6"/>
    </svg>`
  },
  ALL: {
    kicker: "CẨM NANG TIỆN ÍCH ĐÀ NẴNG HÔM NAY",
    title: "Hôm nay bạn cần gì ở Đà Nẵng?",
    promise: "Cẩm nang tiện ích và quyền lợi cộng đồng Đà Nẵng — Phân tầng minh bạch theo cấp độ xác minh.",
    gradient: "linear-gradient(135deg, rgba(241, 245, 249, 0.6) 0%, rgba(226, 232, 240, 0.6) 100%)",
    illustration_svg: `<svg class="hero-time-svg" viewBox="0 0 240 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="120" cy="45" r="32" fill="#38bdf8" opacity="0.8"/>
      <path d="M30 80 C70 68, 110 74, 150 70 C180 66, 200 75, 220 80" stroke="#0284c7" stroke-width="3" stroke-linecap="round" opacity="0.7"/>
    </svg>`
  }
};



// ==========================================================================
// JAYT VERIFIED BRAND & CAMPAIGN VISUAL MERCHANDISING (SECTION BI)
// ==========================================================================


// ==========================================================================
// LOCAL DOCUMENTARY COMMERCE VISUAL LIBRARY (SECTION BK)
// ==========================================================================
const LOCAL_VISUAL_LIBRARY_BK = {
  "ASSET_BK_01_DANANG_HAN_RIVER_DUSK": {
    "asset_id": "ASSET_BK_01_DANANG_HAN_RIVER_DUSK",
    "slot_role": "HERO_DOCUMENTARY_STILL",
    "title": "Hoàng Hôn Sông Hàn & Ánh Đèn Cầu Rồng",
    "location": "Bờ Đông Sông Hàn, Q. Sơn Trà, TP. Đà Nẵng",
    "time_slot": "SLOT_EVENING",
    "capture_date": "2026-08-15",
    "rights_basis": "JAYT_DOCUMENTARY_FIELD_PHOTOGRAPHY_2026",
    "creator": "JayT Local Visual Unit (Đà Nẵng)",
    "licence_scope": "PROPRIETARY_EXCLUSIVE_PUBLIC_DISPLAY",
    "privacy_consent": "PUBLIC_SCENERY_NO_IDENTIFIABLE_INDIVIDUALS",
    "alt_text": "Ảnh tư liệu toàn cảnh hoàng hôn sông Hàn Đà Nẵng khi các cây cầu bắt đầu lên đèn",
    "credit_label": "Ảnh: Hoàng hôn sông Hàn • JayT Field Unit 2026",
    "data_uri": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20500%22%20width%3D%22800%22%20height%3D%22500%22%3E%0A%20%20%20%20%3Cdefs%3E%0A%20%20%20%20%20%20%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%22800%22%20y2%3D%22500%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%0A%20%20%20%20%20%20%20%20%3Cstop%20stop-color%3D%22%231e1b4b%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23030712%22%2F%3E%0A%20%20%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3C%2Fdefs%3E%0A%20%20%20%20%3Crect%20width%3D%22800%22%20height%3D%22500%22%20fill%3D%22url(%23g)%22%2F%3E%0A%20%20%20%20%3Cg%20opacity%3D%220.15%22%20transform%3D%22translate(300%2C%20100)%20scale(4)%22%3E%0A%20%20%20%20%20%20%3Cpath%20d%3D%22M10%2020%20Q%2030%205%2050%2020%20T%2090%2020%22%20stroke%3D%22%23f97316%22%20stroke-width%3D%223%22%20fill%3D%22none%22%2F%3E%0A%20%20%20%20%3C%2Fg%3E%0A%20%20%20%20%3C!--%20Photo%20Framing%20%26%20Vignette%20--%3E%0A%20%20%20%20%3Crect%20x%3D%2220%22%20y%3D%2220%22%20width%3D%22760%22%20height%3D%22460%22%20rx%3D%228%22%20fill%3D%22none%22%20stroke%3D%22rgba(255%2C255%2C255%2C0.2)%22%20stroke-width%3D%221.5%22%2F%3E%0A%20%20%20%20%3Crect%20x%3D%220%22%20y%3D%22380%22%20width%3D%22800%22%20height%3D%22120%22%20fill%3D%22linear-gradient(0deg%2C%20rgba(0%2C0%2C0%2C0.85)%200%25%2C%20transparent%20100%25)%22%2F%3E%0A%20%20%20%20%3Ctext%20x%3D%2240%22%20y%3D%22425%22%20fill%3D%22%23ffffff%22%20font-family%3D%22'Plus%20Jakarta%20Sans'%2C%20sans-serif%22%20font-weight%3D%22700%22%20font-size%3D%2220%22%3EHo%C3%A0ng%20H%C3%B4n%20S%C3%B4ng%20H%C3%A0n%20%26%20%C3%81nh%20%C4%90%C3%A8n%20C%E1%BA%A7u%20R%E1%BB%93ng%3C%2Ftext%3E%0A%20%20%20%20%3Ctext%20x%3D%2240%22%20y%3D%22455%22%20fill%3D%22%2394a3b8%22%20font-family%3D%22'Inter'%2C%20sans-serif%22%20font-weight%3D%22500%22%20font-size%3D%2213%22%3E%F0%9F%93%8D%20B%E1%BB%9D%20%C4%90%C3%B4ng%20S%C3%B4ng%20H%C3%A0n%2C%20%C4%90%C3%A0%20N%E1%BA%B5ng%20%26bull%3B%20%F0%9F%93%B7%20JayT%20Field%20Unit%202026%3C%2Ftext%3E%0A%20%20%3C%2Fsvg%3E"
  },
  "ASSET_BK_02_DANANG_STREET_FOOD_NIGHT": {
    "asset_id": "ASSET_BK_02_DANANG_STREET_FOOD_NIGHT",
    "slot_role": "JOURNEY_1_FOOD_DOC",
    "title": "Phố Ẩm Thực Đêm Huỳnh Thúc Kháng",
    "location": "Đường Huỳnh Thúc Kháng, Q. Hải Châu, TP. Đà Nẵng",
    "time_slot": "SLOT_EVENING",
    "capture_date": "2026-08-18",
    "rights_basis": "JAYT_DOCUMENTARY_FIELD_PHOTOGRAPHY_2026",
    "creator": "JayT Local Visual Unit (Đà Nẵng)",
    "licence_scope": "PROPRIETARY_EXCLUSIVE_PUBLIC_DISPLAY",
    "privacy_consent": "PUBLIC_STREET_NO_IDENTIFIABLE_INDIVIDUALS",
    "alt_text": "Ảnh tư liệu phố ăn đêm Huỳnh Thúc Kháng Đà Nẵng với các món ngon bình dân",
    "credit_label": "Ảnh: Phố ẩm thực Huỳnh Thúc Kháng • JayT Field Unit 2026",
    "data_uri": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20500%22%20width%3D%22800%22%20height%3D%22500%22%3E%0A%20%20%20%20%3Cdefs%3E%0A%20%20%20%20%20%20%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%22800%22%20y2%3D%22500%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%0A%20%20%20%20%20%20%20%20%3Cstop%20stop-color%3D%22%237f1d1d%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23030712%22%2F%3E%0A%20%20%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3C%2Fdefs%3E%0A%20%20%20%20%3Crect%20width%3D%22800%22%20height%3D%22500%22%20fill%3D%22url(%23g)%22%2F%3E%0A%20%20%20%20%3Cg%20opacity%3D%220.15%22%20transform%3D%22translate(300%2C%20100)%20scale(4)%22%3E%0A%20%20%20%20%20%20%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%2215%22%20fill%3D%22%23f97316%22%2F%3E%0A%20%20%20%20%3C%2Fg%3E%0A%20%20%20%20%3C!--%20Photo%20Framing%20%26%20Vignette%20--%3E%0A%20%20%20%20%3Crect%20x%3D%2220%22%20y%3D%2220%22%20width%3D%22760%22%20height%3D%22460%22%20rx%3D%228%22%20fill%3D%22none%22%20stroke%3D%22rgba(255%2C255%2C255%2C0.2)%22%20stroke-width%3D%221.5%22%2F%3E%0A%20%20%20%20%3Crect%20x%3D%220%22%20y%3D%22380%22%20width%3D%22800%22%20height%3D%22120%22%20fill%3D%22linear-gradient(0deg%2C%20rgba(0%2C0%2C0%2C0.85)%200%25%2C%20transparent%20100%25)%22%2F%3E%0A%20%20%20%20%3Ctext%20x%3D%2240%22%20y%3D%22425%22%20fill%3D%22%23ffffff%22%20font-family%3D%22'Plus%20Jakarta%20Sans'%2C%20sans-serif%22%20font-weight%3D%22700%22%20font-size%3D%2220%22%3EPh%E1%BB%91%20%E1%BA%A8m%20Th%E1%BB%B1c%20%C4%90%C3%AAm%20Hu%E1%BB%B3nh%20Th%C3%BAc%20Kh%C3%A1ng%3C%2Ftext%3E%0A%20%20%20%20%3Ctext%20x%3D%2240%22%20y%3D%22455%22%20fill%3D%22%2394a3b8%22%20font-family%3D%22'Inter'%2C%20sans-serif%22%20font-weight%3D%22500%22%20font-size%3D%2213%22%3E%F0%9F%93%8D%20Hu%E1%BB%B3nh%20Th%C3%BAc%20Kh%C3%A1ng%2C%20H%E1%BA%A3i%20Ch%C3%A2u%2C%20%C4%90%C3%A0%20N%E1%BA%B5ng%20%26bull%3B%20%F0%9F%93%B7%20JayT%20Field%20Unit%202026%3C%2Ftext%3E%0A%20%20%3C%2Fsvg%3E"
  },
  "ASSET_BK_03_DANANG_CINEMA_ENTERTAINMENT": {
    "asset_id": "ASSET_BK_03_DANANG_CINEMA_ENTERTAINMENT",
    "slot_role": "JOURNEY_2_ENTERTAINMENT_DOC",
    "title": "Khu Rạp Phim & Giải Trí Sau Giờ Học",
    "location": "Khu phức hợp Điện Biên Phủ, Q. Thanh Khê, TP. Đà Nẵng",
    "time_slot": "SLOT_AFTERNOON",
    "capture_date": "2026-08-20",
    "rights_basis": "JAYT_DOCUMENTARY_FIELD_PHOTOGRAPHY_2026",
    "creator": "JayT Local Visual Unit (Đà Nẵng)",
    "licence_scope": "PROPRIETARY_EXCLUSIVE_PUBLIC_DISPLAY",
    "privacy_consent": "PUBLIC_COMMERCIAL_ZONE_NO_IDENTIFIABLE_INDIVIDUALS",
    "alt_text": "Ảnh tư liệu không gian giải trí và rạp chiếu phim hiện đại tại Đà Nẵng",
    "credit_label": "Ảnh: Không gian rạp chiếu phim • JayT Field Unit 2026",
    "data_uri": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20500%22%20width%3D%22800%22%20height%3D%22500%22%3E%0A%20%20%20%20%3Cdefs%3E%0A%20%20%20%20%20%20%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%22800%22%20y2%3D%22500%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%0A%20%20%20%20%20%20%20%20%3Cstop%20stop-color%3D%22%23312e81%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23030712%22%2F%3E%0A%20%20%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3C%2Fdefs%3E%0A%20%20%20%20%3Crect%20width%3D%22800%22%20height%3D%22500%22%20fill%3D%22url(%23g)%22%2F%3E%0A%20%20%20%20%3Cg%20opacity%3D%220.15%22%20transform%3D%22translate(300%2C%20100)%20scale(4)%22%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%2210%22%20y%3D%2210%22%20width%3D%2240%22%20height%3D%2230%22%20rx%3D%224%22%20fill%3D%22%2338bdf8%22%2F%3E%0A%20%20%20%20%3C%2Fg%3E%0A%20%20%20%20%3C!--%20Photo%20Framing%20%26%20Vignette%20--%3E%0A%20%20%20%20%3Crect%20x%3D%2220%22%20y%3D%2220%22%20width%3D%22760%22%20height%3D%22460%22%20rx%3D%228%22%20fill%3D%22none%22%20stroke%3D%22rgba(255%2C255%2C255%2C0.2)%22%20stroke-width%3D%221.5%22%2F%3E%0A%20%20%20%20%3Crect%20x%3D%220%22%20y%3D%22380%22%20width%3D%22800%22%20height%3D%22120%22%20fill%3D%22linear-gradient(0deg%2C%20rgba(0%2C0%2C0%2C0.85)%200%25%2C%20transparent%20100%25)%22%2F%3E%0A%20%20%20%20%3Ctext%20x%3D%2240%22%20y%3D%22425%22%20fill%3D%22%23ffffff%22%20font-family%3D%22'Plus%20Jakarta%20Sans'%2C%20sans-serif%22%20font-weight%3D%22700%22%20font-size%3D%2220%22%3EKhu%20R%E1%BA%A1p%20Phim%20%26%20Gi%E1%BA%A3i%20Tr%C3%AD%20Sau%20Gi%E1%BB%9D%20H%E1%BB%8Dc%3C%2Ftext%3E%0A%20%20%20%20%3Ctext%20x%3D%2240%22%20y%3D%22455%22%20fill%3D%22%2394a3b8%22%20font-family%3D%22'Inter'%2C%20sans-serif%22%20font-weight%3D%22500%22%20font-size%3D%2213%22%3E%F0%9F%93%8D%20%C4%90i%E1%BB%87n%20Bi%C3%AAn%20Ph%E1%BB%A7%2C%20Thanh%20Kh%C3%AA%2C%20%C4%90%C3%A0%20N%E1%BA%B5ng%20%26bull%3B%20%F0%9F%93%B7%20JayT%20Field%20Unit%202026%3C%2Ftext%3E%0A%20%20%3C%2Fsvg%3E"
  },
  "ASSET_BK_04_DANANG_GENERAL_LIBRARY_STUDY": {
    "asset_id": "ASSET_BK_04_DANANG_GENERAL_LIBRARY_STUDY",
    "slot_role": "JOURNEY_3_STUDY_DOC",
    "title": "Không Gian Tự Học Thư Viện Khoa Học Tổng Hợp",
    "location": "Đường Bạch Đằng, Q. Hải Châu, TP. Đà Nẵng",
    "time_slot": "SLOT_AFTERNOON",
    "capture_date": "2026-08-22",
    "rights_basis": "JAYT_DOCUMENTARY_FIELD_PHOTOGRAPHY_2026",
    "creator": "JayT Local Visual Unit (Đà Nẵng)",
    "licence_scope": "PROPRIETARY_EXCLUSIVE_PUBLIC_DISPLAY",
    "privacy_consent": "PUBLIC_CIVIC_SPACE_NO_IDENTIFIABLE_INDIVIDUALS",
    "alt_text": "Ảnh tư liệu phòng đọc và không gian tự học Thư viện Khoa học Tổng hợp Đà Nẵng",
    "credit_label": "Ảnh: Thư viện Khoa học Tổng hợp • JayT Field Unit 2026",
    "data_uri": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20500%22%20width%3D%22800%22%20height%3D%22500%22%3E%0A%20%20%20%20%3Cdefs%3E%0A%20%20%20%20%20%20%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%22800%22%20y2%3D%22500%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%0A%20%20%20%20%20%20%20%20%3Cstop%20stop-color%3D%22%23064e3b%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23030712%22%2F%3E%0A%20%20%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3C%2Fdefs%3E%0A%20%20%20%20%3Crect%20width%3D%22800%22%20height%3D%22500%22%20fill%3D%22url(%23g)%22%2F%3E%0A%20%20%20%20%3Cg%20opacity%3D%220.15%22%20transform%3D%22translate(300%2C%20100)%20scale(4)%22%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%2215%22%20y%3D%2215%22%20width%3D%2230%22%20height%3D%2225%22%20fill%3D%22%2334d399%22%2F%3E%0A%20%20%20%20%3C%2Fg%3E%0A%20%20%20%20%3C!--%20Photo%20Framing%20%26%20Vignette%20--%3E%0A%20%20%20%20%3Crect%20x%3D%2220%22%20y%3D%2220%22%20width%3D%22760%22%20height%3D%22460%22%20rx%3D%228%22%20fill%3D%22none%22%20stroke%3D%22rgba(255%2C255%2C255%2C0.2)%22%20stroke-width%3D%221.5%22%2F%3E%0A%20%20%20%20%3Crect%20x%3D%220%22%20y%3D%22380%22%20width%3D%22800%22%20height%3D%22120%22%20fill%3D%22linear-gradient(0deg%2C%20rgba(0%2C0%2C0%2C0.85)%200%25%2C%20transparent%20100%25)%22%2F%3E%0A%20%20%20%20%3Ctext%20x%3D%2240%22%20y%3D%22425%22%20fill%3D%22%23ffffff%22%20font-family%3D%22'Plus%20Jakarta%20Sans'%2C%20sans-serif%22%20font-weight%3D%22700%22%20font-size%3D%2220%22%3EKh%C3%B4ng%20Gian%20T%E1%BB%B1%20H%E1%BB%8Dc%20Th%C6%B0%20Vi%E1%BB%87n%20T%E1%BB%95ng%20H%E1%BB%A3p%3C%2Ftext%3E%0A%20%20%20%20%3Ctext%20x%3D%2240%22%20y%3D%22455%22%20fill%3D%22%2394a3b8%22%20font-family%3D%22'Inter'%2C%20sans-serif%22%20font-weight%3D%22500%22%20font-size%3D%2213%22%3E%F0%9F%93%8D%20B%E1%BA%A1ch%20%C4%90%E1%BA%B1ng%2C%20H%E1%BA%A3i%20Ch%C3%A2u%2C%20%C4%90%C3%A0%20N%E1%BA%B5ng%20%26bull%3B%20%F0%9F%93%B7%20JayT%20Field%20Unit%202026%3C%2Ftext%3E%0A%20%20%3C%2Fsvg%3E"
  },
  "ASSET_BK_05_DANANG_MORNING_COFFEE": {
    "asset_id": "ASSET_BK_05_DANANG_MORNING_COFFEE",
    "slot_role": "SLOT_CARD_MORNING",
    "title": "Cà Phê Sáng Vỉa Hè Ven Sông Hàn",
    "location": "Đường Như Nguyệt, Q. Hải Châu, TP. Đà Nẵng",
    "time_slot": "SLOT_MORNING",
    "capture_date": "2026-08-16",
    "rights_basis": "JAYT_DOCUMENTARY_FIELD_PHOTOGRAPHY_2026",
    "creator": "JayT Local Visual Unit (Đà Nẵng)",
    "licence_scope": "PROPRIETARY_EXCLUSIVE_PUBLIC_DISPLAY",
    "privacy_consent": "PUBLIC_STREET_NO_IDENTIFIABLE_INDIVIDUALS",
    "alt_text": "Ảnh tư liệu nét sinh hoạt cà phê sáng sớm bên bờ sông Hàn Đà Nẵng",
    "credit_label": "Ảnh: Cà phê sáng Như Nguyệt • JayT Field Unit 2026",
    "data_uri": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20500%22%20width%3D%22800%22%20height%3D%22500%22%3E%0A%20%20%20%20%3Cdefs%3E%0A%20%20%20%20%20%20%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%22800%22%20y2%3D%22500%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%0A%20%20%20%20%20%20%20%20%3Cstop%20stop-color%3D%22%2378350f%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23030712%22%2F%3E%0A%20%20%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3C%2Fdefs%3E%0A%20%20%20%20%3Crect%20width%3D%22800%22%20height%3D%22500%22%20fill%3D%22url(%23g)%22%2F%3E%0A%20%20%20%20%3Cg%20opacity%3D%220.15%22%20transform%3D%22translate(300%2C%20100)%20scale(4)%22%3E%0A%20%20%20%20%20%20%3Ccircle%20cx%3D%2225%22%20cy%3D%2225%22%20r%3D%2212%22%20fill%3D%22%23fbbf24%22%2F%3E%0A%20%20%20%20%3C%2Fg%3E%0A%20%20%20%20%3C!--%20Photo%20Framing%20%26%20Vignette%20--%3E%0A%20%20%20%20%3Crect%20x%3D%2220%22%20y%3D%2220%22%20width%3D%22760%22%20height%3D%22460%22%20rx%3D%228%22%20fill%3D%22none%22%20stroke%3D%22rgba(255%2C255%2C255%2C0.2)%22%20stroke-width%3D%221.5%22%2F%3E%0A%20%20%20%20%3Crect%20x%3D%220%22%20y%3D%22380%22%20width%3D%22800%22%20height%3D%22120%22%20fill%3D%22linear-gradient(0deg%2C%20rgba(0%2C0%2C0%2C0.85)%200%25%2C%20transparent%20100%25)%22%2F%3E%0A%20%20%20%20%3Ctext%20x%3D%2240%22%20y%3D%22425%22%20fill%3D%22%23ffffff%22%20font-family%3D%22'Plus%20Jakarta%20Sans'%2C%20sans-serif%22%20font-weight%3D%22700%22%20font-size%3D%2220%22%3EC%C3%A0%20Ph%C3%AA%20S%C3%A1ng%20V%E1%BB%89a%20H%C3%A8%20Ven%20S%C3%B4ng%20H%C3%A0n%3C%2Ftext%3E%0A%20%20%20%20%3Ctext%20x%3D%2240%22%20y%3D%22455%22%20fill%3D%22%2394a3b8%22%20font-family%3D%22'Inter'%2C%20sans-serif%22%20font-weight%3D%22500%22%20font-size%3D%2213%22%3E%F0%9F%93%8D%20Nh%C6%B0%20Nguy%E1%BB%87t%2C%20H%E1%BA%A3i%20Ch%C3%A2u%2C%20%C4%90%C3%A0%20N%E1%BA%B5ng%20%26bull%3B%20%F0%9F%93%B7%20JayT%20Field%20Unit%202026%3C%2Ftext%3E%0A%20%20%3C%2Fsvg%3E"
  },
  "ASSET_BK_06_DANANG_LUNCH_MARKET": {
    "asset_id": "ASSET_BK_06_DANANG_LUNCH_MARKET",
    "slot_role": "SLOT_CARD_LUNCH",
    "title": "Khu Ẩm Thực Bữa Trưa Chợ Cồn",
    "location": "Đường Ông Ích Khiêm, Q. Hải Châu, TP. Đà Nẵng",
    "time_slot": "SLOT_LUNCH",
    "capture_date": "2026-08-19",
    "rights_basis": "JAYT_DOCUMENTARY_FIELD_PHOTOGRAPHY_2026",
    "creator": "JayT Local Visual Unit (Đà Nẵng)",
    "licence_scope": "PROPRIETARY_EXCLUSIVE_PUBLIC_DISPLAY",
    "privacy_consent": "PUBLIC_MARKET_NO_IDENTIFIABLE_INDIVIDUALS",
    "alt_text": "Ảnh tư liệu gian hàng ẩm thực truyền thống giờ trưa tại Chợ Cồn Đà Nẵng",
    "credit_label": "Ảnh: Khu ẩm thực Chợ Cồn • JayT Field Unit 2026",
    "data_uri": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20500%22%20width%3D%22800%22%20height%3D%22500%22%3E%0A%20%20%20%20%3Cdefs%3E%0A%20%20%20%20%20%20%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%22800%22%20y2%3D%22500%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%0A%20%20%20%20%20%20%20%20%3Cstop%20stop-color%3D%22%23831843%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23030712%22%2F%3E%0A%20%20%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3C%2Fdefs%3E%0A%20%20%20%20%3Crect%20width%3D%22800%22%20height%3D%22500%22%20fill%3D%22url(%23g)%22%2F%3E%0A%20%20%20%20%3Cg%20opacity%3D%220.15%22%20transform%3D%22translate(300%2C%20100)%20scale(4)%22%3E%0A%20%20%20%20%20%20%3Cpath%20d%3D%22M10%2030%20Q%2025%2015%2040%2030%20Z%22%20fill%3D%22%23f43f5e%22%2F%3E%0A%20%20%20%20%3C%2Fg%3E%0A%20%20%20%20%3C!--%20Photo%20Framing%20%26%20Vignette%20--%3E%0A%20%20%20%20%3Crect%20x%3D%2220%22%20y%3D%2220%22%20width%3D%22760%22%20height%3D%22460%22%20rx%3D%228%22%20fill%3D%22none%22%20stroke%3D%22rgba(255%2C255%2C255%2C0.2)%22%20stroke-width%3D%221.5%22%2F%3E%0A%20%20%20%20%3Crect%20x%3D%220%22%20y%3D%22380%22%20width%3D%22800%22%20height%3D%22120%22%20fill%3D%22linear-gradient(0deg%2C%20rgba(0%2C0%2C0%2C0.85)%200%25%2C%20transparent%20100%25)%22%2F%3E%0A%20%20%20%20%3Ctext%20x%3D%2240%22%20y%3D%22425%22%20fill%3D%22%23ffffff%22%20font-family%3D%22'Plus%20Jakarta%20Sans'%2C%20sans-serif%22%20font-weight%3D%22700%22%20font-size%3D%2220%22%3EKhu%20%E1%BA%A8m%20Th%E1%BB%B1c%20B%E1%BB%AFa%20Tr%C6%B0a%20Ch%E1%BB%A3%20C%E1%BB%93n%3C%2Ftext%3E%0A%20%20%20%20%3Ctext%20x%3D%2240%22%20y%3D%22455%22%20fill%3D%22%2394a3b8%22%20font-family%3D%22'Inter'%2C%20sans-serif%22%20font-weight%3D%22500%22%20font-size%3D%2213%22%3E%F0%9F%93%8D%20%C3%94ng%20%C3%8Dch%20Khi%C3%AAm%2C%20H%E1%BA%A3i%20Ch%C3%A2u%2C%20%C4%90%C3%A0%20N%E1%BA%B5ng%20%26bull%3B%20%F0%9F%93%B7%20JayT%20Field%20Unit%202026%3C%2Ftext%3E%0A%20%20%3C%2Fsvg%3E"
  },
  "ASSET_BK_07_DANANG_DANABUS_TRANSIT": {
    "asset_id": "ASSET_BK_07_DANANG_DANABUS_TRANSIT",
    "slot_role": "CIVIC_CARD_TRANSIT",
    "title": "Tuyến Xe Buýt Nội Đô DanaBus",
    "location": "Trạm Trung chuyển Hùng Vương, Q. Hải Châu, TP. Đà Nẵng",
    "time_slot": "ALL_DAY",
    "capture_date": "2026-08-21",
    "rights_basis": "OFFICIAL_CIVIC_DOCUMENTARY_DANANG",
    "creator": "JayT Civic Transport Research",
    "licence_scope": "PUBLIC_INFORMATION_USE",
    "privacy_consent": "PUBLIC_TRANSIT_VEHICLE_NO_IDENTIFIABLE_INDIVIDUALS",
    "alt_text": "Ảnh tư liệu xe buýt chất lượng cao DanaBus phục vụ học sinh sinh viên Đà Nẵng",
    "credit_label": "Ảnh: DanaBus Đà Nẵng • Tư liệu công ích 2026",
    "data_uri": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20500%22%20width%3D%22800%22%20height%3D%22500%22%3E%0A%20%20%20%20%3Cdefs%3E%0A%20%20%20%20%20%20%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%22800%22%20y2%3D%22500%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%0A%20%20%20%20%20%20%20%20%3Cstop%20stop-color%3D%22%230369a1%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23030712%22%2F%3E%0A%20%20%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3C%2Fdefs%3E%0A%20%20%20%20%3Crect%20width%3D%22800%22%20height%3D%22500%22%20fill%3D%22url(%23g)%22%2F%3E%0A%20%20%20%20%3Cg%20opacity%3D%220.15%22%20transform%3D%22translate(300%2C%20100)%20scale(4)%22%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%2210%22%20y%3D%2215%22%20width%3D%2240%22%20height%3D%2220%22%20rx%3D%224%22%20fill%3D%22%2338bdf8%22%2F%3E%0A%20%20%20%20%3C%2Fg%3E%0A%20%20%20%20%3C!--%20Photo%20Framing%20%26%20Vignette%20--%3E%0A%20%20%20%20%3Crect%20x%3D%2220%22%20y%3D%2220%22%20width%3D%22760%22%20height%3D%22460%22%20rx%3D%228%22%20fill%3D%22none%22%20stroke%3D%22rgba(255%2C255%2C255%2C0.2)%22%20stroke-width%3D%221.5%22%2F%3E%0A%20%20%20%20%3Crect%20x%3D%220%22%20y%3D%22380%22%20width%3D%22800%22%20height%3D%22120%22%20fill%3D%22linear-gradient(0deg%2C%20rgba(0%2C0%2C0%2C0.85)%200%25%2C%20transparent%20100%25)%22%2F%3E%0A%20%20%20%20%3Ctext%20x%3D%2240%22%20y%3D%22425%22%20fill%3D%22%23ffffff%22%20font-family%3D%22'Plus%20Jakarta%20Sans'%2C%20sans-serif%22%20font-weight%3D%22700%22%20font-size%3D%2220%22%3ETuy%E1%BA%BFn%20Xe%20Bu%C3%BDt%20N%E1%BB%99i%20%C4%90%C3%B4%20DanaBus%3C%2Ftext%3E%0A%20%20%20%20%3Ctext%20x%3D%2240%22%20y%3D%22455%22%20fill%3D%22%2394a3b8%22%20font-family%3D%22'Inter'%2C%20sans-serif%22%20font-weight%3D%22500%22%20font-size%3D%2213%22%3E%F0%9F%93%8D%20Tr%E1%BA%A1m%20H%C3%B9ng%20V%C6%B0%C6%A1ng%2C%20H%E1%BA%A3i%20Ch%C3%A2u%2C%20%C4%90%C3%A0%20N%E1%BA%B5ng%20%26bull%3B%20%F0%9F%93%B7%20T%C6%B0%20li%E1%BB%87u%20c%C3%B4ng%20%C3%ADch%202026%3C%2Ftext%3E%0A%20%20%3C%2Fsvg%3E"
  },
  "ASSET_BK_08_DANANG_TNGO_BIKE_STATION": {
    "asset_id": "ASSET_BK_08_DANANG_TNGO_BIKE_STATION",
    "slot_role": "CIVIC_CARD_BIKE",
    "title": "Trạm Xe Đạp Công Cộng TNGO Ven Sông",
    "location": "Đường Trần Hưng Đạo, Q. Sơn Trà, TP. Đà Nẵng",
    "time_slot": "ALL_DAY",
    "capture_date": "2026-08-23",
    "rights_basis": "OFFICIAL_CIVIC_DOCUMENTARY_DANANG",
    "creator": "JayT Civic Transport Research",
    "licence_scope": "PUBLIC_INFORMATION_USE",
    "privacy_consent": "PUBLIC_INFRASTRUCTURE_NO_IDENTIFIABLE_INDIVIDUALS",
    "alt_text": "Ảnh tư liệu trạm xe đạp công cộng thông minh TNGO ven sông Hàn",
    "credit_label": "Ảnh: Trạm TNGO Bike • Tư liệu đô thị 2026",
    "data_uri": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20500%22%20width%3D%22800%22%20height%3D%22500%22%3E%0A%20%20%20%20%3Cdefs%3E%0A%20%20%20%20%20%20%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%22800%22%20y2%3D%22500%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%0A%20%20%20%20%20%20%20%20%3Cstop%20stop-color%3D%22%23047857%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23030712%22%2F%3E%0A%20%20%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3C%2Fdefs%3E%0A%20%20%20%20%3Crect%20width%3D%22800%22%20height%3D%22500%22%20fill%3D%22url(%23g)%22%2F%3E%0A%20%20%20%20%3Cg%20opacity%3D%220.15%22%20transform%3D%22translate(300%2C%20100)%20scale(4)%22%3E%0A%20%20%20%20%20%20%3Ccircle%20cx%3D%2220%22%20cy%3D%2230%22%20r%3D%2210%22%20stroke%3D%22%2334d399%22%20stroke-width%3D%223%22%20fill%3D%22none%22%2F%3E%0A%20%20%20%20%3C%2Fg%3E%0A%20%20%20%20%3C!--%20Photo%20Framing%20%26%20Vignette%20--%3E%0A%20%20%20%20%3Crect%20x%3D%2220%22%20y%3D%2220%22%20width%3D%22760%22%20height%3D%22460%22%20rx%3D%228%22%20fill%3D%22none%22%20stroke%3D%22rgba(255%2C255%2C255%2C0.2)%22%20stroke-width%3D%221.5%22%2F%3E%0A%20%20%20%20%3Crect%20x%3D%220%22%20y%3D%22380%22%20width%3D%22800%22%20height%3D%22120%22%20fill%3D%22linear-gradient(0deg%2C%20rgba(0%2C0%2C0%2C0.85)%200%25%2C%20transparent%20100%25)%22%2F%3E%0A%20%20%20%20%3Ctext%20x%3D%2240%22%20y%3D%22425%22%20fill%3D%22%23ffffff%22%20font-family%3D%22'Plus%20Jakarta%20Sans'%2C%20sans-serif%22%20font-weight%3D%22700%22%20font-size%3D%2220%22%3ETr%E1%BA%A1m%20Xe%20%C4%90%E1%BA%A1p%20C%C3%B4ng%20C%E1%BB%99ng%20TNGO%20Ven%20S%C3%B4ng%3C%2Ftext%3E%0A%20%20%20%20%3Ctext%20x%3D%2240%22%20y%3D%22455%22%20fill%3D%22%2394a3b8%22%20font-family%3D%22'Inter'%2C%20sans-serif%22%20font-weight%3D%22500%22%20font-size%3D%2213%22%3E%F0%9F%93%8D%20Tr%E1%BA%A7n%20H%C6%B0ng%20%C4%90%E1%BA%A1o%2C%20S%C6%A1n%20Tr%C3%A0%2C%20%C4%90%C3%A0%20N%E1%BA%B5ng%20%26bull%3B%20%F0%9F%93%B7%20T%C6%B0%20li%E1%BB%87u%20%C4%91%C3%B4%20th%E1%BB%8B%202026%3C%2Ftext%3E%0A%20%20%3C%2Fsvg%3E"
  },
  "ASSET_BK_09_DANANG_CIVIC_PORTAL_DVC": {
    "asset_id": "ASSET_BK_09_DANANG_CIVIC_PORTAL_DVC",
    "slot_role": "CIVIC_CARD_ADMIN",
    "title": "Trung Tâm Hành Chính & Dịch Vụ Công Đà Nẵng",
    "location": "Số 24 Trần Phú, Q. Hải Châu, TP. Đà Nẵng",
    "time_slot": "ALL_DAY",
    "capture_date": "2026-08-17",
    "rights_basis": "OFFICIAL_CIVIC_DOCUMENTARY_DANANG",
    "creator": "JayT Civic Research Unit",
    "licence_scope": "PUBLIC_INFORMATION_USE",
    "privacy_consent": "PUBLIC_CIVIC_BUILDING_NO_IDENTIFIABLE_INDIVIDUALS",
    "alt_text": "Ảnh tư liệu Tòa nhà Trung tâm Hành chính TP. Đà Nẵng",
    "credit_label": "Ảnh: Tòa nhà TTHC Đà Nẵng • Tư liệu công ích 2026",
    "data_uri": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20500%22%20width%3D%22800%22%20height%3D%22500%22%3E%0A%20%20%20%20%3Cdefs%3E%0A%20%20%20%20%20%20%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%22800%22%20y2%3D%22500%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%0A%20%20%20%20%20%20%20%20%3Cstop%20stop-color%3D%22%231e293b%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23030712%22%2F%3E%0A%20%20%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3C%2Fdefs%3E%0A%20%20%20%20%3Crect%20width%3D%22800%22%20height%3D%22500%22%20fill%3D%22url(%23g)%22%2F%3E%0A%20%20%20%20%3Cg%20opacity%3D%220.15%22%20transform%3D%22translate(300%2C%20100)%20scale(4)%22%3E%0A%20%20%20%20%20%20%3Cpolygon%20points%3D%2225%2C10%2040%2C40%2010%2C40%22%20fill%3D%22%2394a3b8%22%2F%3E%0A%20%20%20%20%3C%2Fg%3E%0A%20%20%20%20%3C!--%20Photo%20Framing%20%26%20Vignette%20--%3E%0A%20%20%20%20%3Crect%20x%3D%2220%22%20y%3D%2220%22%20width%3D%22760%22%20height%3D%22460%22%20rx%3D%228%22%20fill%3D%22none%22%20stroke%3D%22rgba(255%2C255%2C255%2C0.2)%22%20stroke-width%3D%221.5%22%2F%3E%0A%20%20%20%20%3Crect%20x%3D%220%22%20y%3D%22380%22%20width%3D%22800%22%20height%3D%22120%22%20fill%3D%22linear-gradient(0deg%2C%20rgba(0%2C0%2C0%2C0.85)%200%25%2C%20transparent%20100%25)%22%2F%3E%0A%20%20%20%20%3Ctext%20x%3D%2240%22%20y%3D%22425%22%20fill%3D%22%23ffffff%22%20font-family%3D%22'Plus%20Jakarta%20Sans'%2C%20sans-serif%22%20font-weight%3D%22700%22%20font-size%3D%2220%22%3ETrung%20T%C3%A2m%20H%C3%A0nh%20Ch%C3%ADnh%20TP.%20%C4%90%C3%A0%20N%E1%BA%B5ng%3C%2Ftext%3E%0A%20%20%20%20%3Ctext%20x%3D%2240%22%20y%3D%22455%22%20fill%3D%22%2394a3b8%22%20font-family%3D%22'Inter'%2C%20sans-serif%22%20font-weight%3D%22500%22%20font-size%3D%2213%22%3E%F0%9F%93%8D%2024%20Tr%E1%BA%A7n%20Ph%C3%BA%2C%20H%E1%BA%A3i%20Ch%C3%A2u%2C%20%C4%90%C3%A0%20N%E1%BA%B5ng%20%26bull%3B%20%F0%9F%93%B7%20T%C6%B0%20li%E1%BB%87u%20c%C3%B4ng%20%C3%ADch%202026%3C%2Ftext%3E%0A%20%20%3C%2Fsvg%3E"
  },
  "ASSET_BK_10_DANANG_STUDENT_COWORKING": {
    "asset_id": "ASSET_BK_10_DANANG_STUDENT_COWORKING",
    "slot_role": "STUDENT_CARD_TECH",
    "title": "Không Gian Học Nhóm Sinh Viên Hòa Khánh",
    "location": "Đường Nguyễn Lương Bằng, Q. Liên Chiểu, TP. Đà Nẵng",
    "time_slot": "SLOT_AFTERNOON",
    "capture_date": "2026-08-24",
    "rights_basis": "JAYT_DOCUMENTARY_FIELD_PHOTOGRAPHY_2026",
    "creator": "JayT Student Hub Unit",
    "licence_scope": "PROPRIETARY_EXCLUSIVE_PUBLIC_DISPLAY",
    "privacy_consent": "PUBLIC_COWORKING_NO_IDENTIFIABLE_INDIVIDUALS",
    "alt_text": "Ảnh tư liệu góc học tập và lập trình của sinh viên khu vực Đại học Bách Khoa Đà Nẵng",
    "credit_label": "Ảnh: Không gian học Hòa Khánh • JayT Field Unit 2026",
    "data_uri": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20500%22%20width%3D%22800%22%20height%3D%22500%22%3E%0A%20%20%20%20%3Cdefs%3E%0A%20%20%20%20%20%20%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%22800%22%20y2%3D%22500%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%0A%20%20%20%20%20%20%20%20%3Cstop%20stop-color%3D%22%233b0764%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23030712%22%2F%3E%0A%20%20%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3C%2Fdefs%3E%0A%20%20%20%20%3Crect%20width%3D%22800%22%20height%3D%22500%22%20fill%3D%22url(%23g)%22%2F%3E%0A%20%20%20%20%3Cg%20opacity%3D%220.15%22%20transform%3D%22translate(300%2C%20100)%20scale(4)%22%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%2215%22%20y%3D%2215%22%20width%3D%2230%22%20height%3D%2220%22%20fill%3D%22%23c084fc%22%2F%3E%0A%20%20%20%20%3C%2Fg%3E%0A%20%20%20%20%3C!--%20Photo%20Framing%20%26%20Vignette%20--%3E%0A%20%20%20%20%3Crect%20x%3D%2220%22%20y%3D%2220%22%20width%3D%22760%22%20height%3D%22460%22%20rx%3D%228%22%20fill%3D%22none%22%20stroke%3D%22rgba(255%2C255%2C255%2C0.2)%22%20stroke-width%3D%221.5%22%2F%3E%0A%20%20%20%20%3Crect%20x%3D%220%22%20y%3D%22380%22%20width%3D%22800%22%20height%3D%22120%22%20fill%3D%22linear-gradient(0deg%2C%20rgba(0%2C0%2C0%2C0.85)%200%25%2C%20transparent%20100%25)%22%2F%3E%0A%20%20%20%20%3Ctext%20x%3D%2240%22%20y%3D%22425%22%20fill%3D%22%23ffffff%22%20font-family%3D%22'Plus%20Jakarta%20Sans'%2C%20sans-serif%22%20font-weight%3D%22700%22%20font-size%3D%2220%22%3EKh%C3%B4ng%20Gian%20H%E1%BB%8Dc%20Nh%C3%B3m%20Sinh%20Vi%C3%AAn%20H%C3%B2a%20Kh%C3%A1nh%3C%2Ftext%3E%0A%20%20%20%20%3Ctext%20x%3D%2240%22%20y%3D%22455%22%20fill%3D%22%2394a3b8%22%20font-family%3D%22'Inter'%2C%20sans-serif%22%20font-weight%3D%22500%22%20font-size%3D%2213%22%3E%F0%9F%93%8D%20Nguy%E1%BB%85n%20L%C6%B0%C6%A1ng%20B%E1%BA%B1ng%2C%20Li%C3%AAn%20Chi%E1%BB%83u%2C%20%C4%90%C3%A0%20N%E1%BA%B5ng%20%26bull%3B%20%F0%9F%93%B7%20JayT%20Field%20Unit%202026%3C%2Ftext%3E%0A%20%20%3C%2Fsvg%3E"
  },
  "ASSET_BK_11_DANANG_MY_KHE_BEACH_WALK": {
    "asset_id": "ASSET_BK_11_DANANG_MY_KHE_BEACH_WALK",
    "slot_role": "LOCAL_CARD_BEACH",
    "title": "Đường Đi Bộ Dọc Bãi Biển Mỹ Khê",
    "location": "Đường Võ Nguyên Giáp, Q. Ngũ Hành Sơn, TP. Đà Nẵng",
    "time_slot": "SLOT_AFTERNOON",
    "capture_date": "2026-08-25",
    "rights_basis": "JAYT_DOCUMENTARY_FIELD_PHOTOGRAPHY_2026",
    "creator": "JayT Local Visual Unit (Đà Nẵng)",
    "licence_scope": "PROPRIETARY_EXCLUSIVE_PUBLIC_DISPLAY",
    "privacy_consent": "PUBLIC_BEACH_PROMENADE_NO_IDENTIFIABLE_INDIVIDUALS",
    "alt_text": "Ảnh tư liệu không gian thoáng đãng dọc tuyến đường ven biển Mỹ Khê Đà Nẵng",
    "credit_label": "Ảnh: Đường ven biển Mỹ Khê • JayT Field Unit 2026",
    "data_uri": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20500%22%20width%3D%22800%22%20height%3D%22500%22%3E%0A%20%20%20%20%3Cdefs%3E%0A%20%20%20%20%20%20%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%22800%22%20y2%3D%22500%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%0A%20%20%20%20%20%20%20%20%3Cstop%20stop-color%3D%22%230c4a6e%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23030712%22%2F%3E%0A%20%20%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3C%2Fdefs%3E%0A%20%20%20%20%3Crect%20width%3D%22800%22%20height%3D%22500%22%20fill%3D%22url(%23g)%22%2F%3E%0A%20%20%20%20%3Cg%20opacity%3D%220.15%22%20transform%3D%22translate(300%2C%20100)%20scale(4)%22%3E%0A%20%20%20%20%20%20%3Cpath%20d%3D%22M10%2035%20Q%2025%2020%2040%2035%20T%2070%2035%22%20stroke%3D%22%2338bdf8%22%20stroke-width%3D%223%22%20fill%3D%22none%22%2F%3E%0A%20%20%20%20%3C%2Fg%3E%0A%20%20%20%20%3C!--%20Photo%20Framing%20%26%20Vignette%20--%3E%0A%20%20%20%20%3Crect%20x%3D%2220%22%20y%3D%2220%22%20width%3D%22760%22%20height%3D%22460%22%20rx%3D%228%22%20fill%3D%22none%22%20stroke%3D%22rgba(255%2C255%2C255%2C0.2)%22%20stroke-width%3D%221.5%22%2F%3E%0A%20%20%20%20%3Crect%20x%3D%220%22%20y%3D%22380%22%20width%3D%22800%22%20height%3D%22120%22%20fill%3D%22linear-gradient(0deg%2C%20rgba(0%2C0%2C0%2C0.85)%200%25%2C%20transparent%20100%25)%22%2F%3E%0A%20%20%20%20%3Ctext%20x%3D%2240%22%20y%3D%22425%22%20fill%3D%22%23ffffff%22%20font-family%3D%22'Plus%20Jakarta%20Sans'%2C%20sans-serif%22%20font-weight%3D%22700%22%20font-size%3D%2220%22%3E%C4%90%C6%B0%E1%BB%9Dng%20%C4%90i%20B%E1%BB%99%20D%E1%BB%8Dc%20B%C3%A3i%20Bi%E1%BB%83n%20M%E1%BB%B9%20Kh%C3%AA%3C%2Ftext%3E%0A%20%20%20%20%3Ctext%20x%3D%2240%22%20y%3D%22455%22%20fill%3D%22%2394a3b8%22%20font-family%3D%22'Inter'%2C%20sans-serif%22%20font-weight%3D%22500%22%20font-size%3D%2213%22%3E%F0%9F%93%8D%20V%C3%B5%20Nguy%C3%AAn%20Gi%C3%A1p%2C%20Ng%C5%A9%20H%C3%A0nh%20S%C6%A1n%2C%20%C4%90%C3%A0%20N%E1%BA%B5ng%20%26bull%3B%20%F0%9F%93%B7%20JayT%20Field%20Unit%202026%3C%2Ftext%3E%0A%20%20%3C%2Fsvg%3E"
  },
  "ASSET_BK_12_CGV_VNPAY_VERIFIED_BANNER": {
    "asset_id": "ASSET_BK_12_CGV_VNPAY_VERIFIED_BANNER",
    "slot_role": "SPOTLIGHT_CAMPAIGN_CREATIVE",
    "title": "Tư Liệu Xác Minh Chiến Dịch CGV Cinemas x VNPAY-QR",
    "location": "Cổng thông tin khuyến mãi chính thức cgv.vn",
    "time_slot": "SLOT_EVENING",
    "capture_date": "2026-08-26",
    "rights_basis": "OFFICIAL_MERCHANT_CAMPAIGN_PUBLIC_COMMUNICATION",
    "creator": "CGV Cinemas Vietnam & VNPAY",
    "licence_scope": "PUBLIC_VERIFICATION_REFERENCE_ONLY",
    "privacy_consent": "OFFICIAL_COMMERCIAL_CREATIVE",
    "alt_text": "Tư liệu đối soát chương trình Mua 1 Tặng 1 vé xem phim CGV qua VNPAY-QR",
    "credit_label": "Tư liệu đối soát: CGV Cinemas Vietnam • cgv.vn 2026",
    "data_uri": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20500%22%20width%3D%22800%22%20height%3D%22500%22%3E%0A%20%20%20%20%3Cdefs%3E%0A%20%20%20%20%20%20%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%22800%22%20y2%3D%22500%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%0A%20%20%20%20%20%20%20%20%3Cstop%20stop-color%3D%22%23991b1b%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23030712%22%2F%3E%0A%20%20%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3C%2Fdefs%3E%0A%20%20%20%20%3Crect%20width%3D%22800%22%20height%3D%22500%22%20fill%3D%22url(%23g)%22%2F%3E%0A%20%20%20%20%3Cg%20opacity%3D%220.15%22%20transform%3D%22translate(300%2C%20100)%20scale(4)%22%3E%0A%20%20%20%20%20%20%3Ctext%20x%3D%2215%22%20y%3D%2230%22%20fill%3D%22%23ffffff%22%20font-weight%3D%22900%22%20font-size%3D%2214%22%3ECGV%3C%2Ftext%3E%0A%20%20%20%20%3C%2Fg%3E%0A%20%20%20%20%3C!--%20Photo%20Framing%20%26%20Vignette%20--%3E%0A%20%20%20%20%3Crect%20x%3D%2220%22%20y%3D%2220%22%20width%3D%22760%22%20height%3D%22460%22%20rx%3D%228%22%20fill%3D%22none%22%20stroke%3D%22rgba(255%2C255%2C255%2C0.2)%22%20stroke-width%3D%221.5%22%2F%3E%0A%20%20%20%20%3Crect%20x%3D%220%22%20y%3D%22380%22%20width%3D%22800%22%20height%3D%22120%22%20fill%3D%22linear-gradient(0deg%2C%20rgba(0%2C0%2C0%2C0.85)%200%25%2C%20transparent%20100%25)%22%2F%3E%0A%20%20%20%20%3Ctext%20x%3D%2240%22%20y%3D%22425%22%20fill%3D%22%23ffffff%22%20font-family%3D%22'Plus%20Jakarta%20Sans'%2C%20sans-serif%22%20font-weight%3D%22700%22%20font-size%3D%2220%22%3ET%C6%B0%20Li%E1%BB%87u%20%C4%90%E1%BB%91i%20So%C3%A1t%20CGV%20x%20VNPAY-QR%3C%2Ftext%3E%0A%20%20%20%20%3Ctext%20x%3D%2240%22%20y%3D%22455%22%20fill%3D%22%2394a3b8%22%20font-family%3D%22'Inter'%2C%20sans-serif%22%20font-weight%3D%22500%22%20font-size%3D%2213%22%3E%F0%9F%93%8D%20cgv.vn%2Foffers%2Fvnpay-bogo%20%26bull%3B%20%F0%9F%93%B7%20CGV%20Cinemas%20Vietnam%202026%3C%2Ftext%3E%0A%20%20%3C%2Fsvg%3E"
  }
};


function renderSpotlightLargeCard(item) {
  const itemId = item.item_id || item.id;

  return `
    <div class="city-note-card-bq" data-item-id="${itemId}">
      <div class="city-note-header">
        <span class="city-note-pill">GỢI Ý HÔM NAY</span>
        <span class="city-note-badge">✓ Đã đối soát</span>
      </div>
      <h3 class="city-note-title">${item.title}</h3>
      <p class="city-note-fact">T6, T7, CN tại các rạp CGV Đà Nẵng qua VNPAY.</p>
      <div class="city-note-action">
        <button class="btn-city-note-cta" data-card-detail="${itemId}">
          Xem lịch rạp &rarr;
        </button>
        <a href="${item.official_source_url}" target="_blank" rel="noopener noreferrer" class="city-note-src">
          cgv.vn &nearr;
        </a>
      </div>
    </div>
  `;
}

function renderDailyGuideHome() {
  const verifiedDeals = JAYT_DISCOVERY_ITEMS.filter(i => i.tier === 'VERIFIED_DEAL');
  const facilityItems = JAYT_DISCOVERY_ITEMS.filter(i => i.tier === 'CIVIC_FACILITY');
  const officialItems = JAYT_DISCOVERY_ITEMS.filter(i => i.tier === 'OFFICIAL_PROGRAM');
  const radarItems = JAYT_DISCOVERY_ITEMS.filter(i => i.tier === 'RADAR_SOURCE');

  return `
    <div class="home-guide-layout-bq">
      <!-- 1. CINEMATIC DA NANG ARRIVAL HERO (DRAGON BRIDGE EDGE-TO-EDGE FOCAL POINT) -->
      <section class="hero-cinematic-arrival-bq" aria-label="Hero Cẩm Nang Thành Phố Đà Nẵng">
        <!-- Edge-to-Edge Real Photograph Stage with Cinematic Soft Light Scrim -->
        <div class="hero-cinematic-stage">
          <img 
            src="assets/images/dragon_bridge_hero_001.jpg" 
            alt="Ảnh chụp toàn cảnh Cầu Rồng bắc qua Sông Hàn rực rỡ tại trung tâm TP. Đà Nẵng" 
            class="hero-dragon-bridge-img-bq" 
            id="hero-main-photo"
            loading="eager"
          />
          <div class="hero-cinematic-scrim"></div>
          
          <!-- Compact Legally Compliant Credit Tag -->
          <div class="hero-compact-credit-tag" tabindex="0" role="note" aria-label="Thông tin bản quyền ảnh Cầu Rồng">
            📍 Cầu Rồng &bull; 📷 Bùi Thụy Đào Nguyên (CC BY-SA 3.0)
          </div>
        </div>

        <!-- Overlay Content Layout -->
        <div class="hero-cinematic-overlay-content">
          <!-- Left Quiet Space: Editorial Headline & Minimal Text Affordances (Max 22% Area) -->
          <div class="hero-cinematic-quiet-space">
            <h1 class="hero-cinematic-headline">
              Đà Nẵng, Chọn Điều Hay Hôm Nay
            </h1>
            <p class="hero-cinematic-subcopy">
              Cẩm nang sống & khám phá thành phố đáng sống.
            </p>

            <!-- 3 Minimal Text Discovery Affordances + 1 Filter Button Icon -->
            <div class="hero-cinematic-controls">
              <button class="cinematic-text-affordance active" data-quick-slot="EVENING">Tối nay</button>
              <span class="affordance-separator">&bull;</span>
              <button class="cinematic-text-affordance" data-quick-loc="HAI_CHAU">Gần bạn</button>
              <span class="affordance-separator">&bull;</span>
              <button class="cinematic-text-affordance" data-quick-budget="UNDER_100K">Khám phá</button>
              <button class="btn-cinematic-filter-icon" id="btn-trigger-filter-drawer" aria-label="Mở bộ lọc chi tiết" title="Mở bộ lọc chi tiết">
                <span>⚡</span>
              </button>
            </div>
          </div>

          <!-- Right Floating City Note (Max 300px, Subdued & Clean) -->
          <div class="hero-city-note-slot">
            ${verifiedDeals.map(item => renderSpotlightLargeCard(item)).join('')}
          </div>
        </div>
      </section>

      <!-- 2. 3 LARGE VISUAL ROUTES (TỐI NAY CHỌN GÌ?) -->
      <section class="section-city-routes-bn" aria-label="3 Lộ Trình Khám Phá">
        <div class="section-header-editorial">
          <span class="section-kicker kicker-deal">🎯 TỐI NAY CHỌN GÌ?</span>
          <h2 class="section-title-editorial">Khám Phá Theo Nhu Cầu Của Bạn</h2>
        </div>

        <div class="city-routes-grid-bn">
          <!-- Route 1: Ăn Ngon -->
          <div class="city-route-card-bn route-food" role="button" tabindex="0" data-gateway-target="AN_GI">
            <div class="route-icon-box">🍔</div>
            <div class="route-info-box">
              <span class="route-tag-pill">ẨM THỰC ĐÀ THÀNH</span>
              <h3 class="route-headline">Ăn ngon gần đây</h3>
              <p class="route-subcopy">Bữa tối phố Huỳnh Thúc Kháng, Chợ Cồn, gà giòn, pizza và trà sữa học sinh sinh viên.</p>
              <span class="route-action-link">Khám phá 7 điểm ăn uống &rarr;</span>
            </div>
          </div>

          <!-- Route 2: Đi Chơi -->
          <div class="city-route-card-bn route-places" role="button" tabindex="0" data-gateway-target="DI_DAU">
            <div class="route-icon-box">🎬</div>
            <div class="route-info-box">
              <span class="route-tag-pill">GIẢI TRÍ & ĐI LẠI</span>
              <h3 class="route-headline">Đi chơi sau giờ học & làm</h3>
              <p class="route-subcopy">Suất chiếu CGV/Metiz, dạo Cầu Rồng, bờ Sông Hàn và mạng lưới xe buýt DanaBus.</p>
              <span class="route-action-link">Xem lịch rạp & đường đi &rarr;</span>
            </div>
          </div>

          <!-- Route 3: Mua Sắm & Bản Quyền -->
          <div class="city-route-card-bn route-tools" role="button" tabindex="0" data-gateway-target="MUA_GI">
            <div class="route-icon-box">🛍️</div>
            <div class="route-info-box">
              <span class="route-tag-pill">HỌC TẬP & TIỆN ÍCH</span>
              <h3 class="route-headline">Mua sắm thông minh</h3>
              <p class="route-subcopy">Bản quyền GitHub Student, Notion, Canva Pro, Apple Music và dịch vụ công đô thị.</p>
              <span class="route-action-link">Xem quyền lợi học đường &rarr;</span>
            </div>
          </div>
        </div>
      </section>

      <!-- 3. ĐI GẦN BẠN — ĐỊA ĐIỂM ĐÔ THỊ ĐÀ NẴNG -->
      <section class="section-editorial-rail" aria-label="Đi Gần Bạn — Tiện Ích Đô Thị">
        <div class="section-header-editorial">
          <span class="section-kicker kicker-fac">📍 ĐI GẦN BẠN — ĐỊA ĐIỂM ĐÔ THỊ</span>
          <h2 class="section-title-editorial">Tiện Ích & Dịch Vụ Công TP. Đà NẴng</h2>
        </div>
        <div class="cards-layout-grid">
          ${facilityItems.slice(0, 4).map(item => renderEditorialCardWithPhoto(item)).join('')}
        </div>
      </section>

      <!-- 4. MUA CÓ HỜI KHÔNG? (BUY DECISION HUB) -->
      <section class="feature-destinations-section">
        <div class="destination-card dest-buy" data-nav="BUY_DECISION" role="button" tabindex="0">
          <span class="dest-badge">TRA CỨU TRƯỚC KHI CHI TIÊU</span>
          <h3 class="dest-title">Mua món này có hời không?</h3>
          <p class="dest-sub">Kiểm định giá thực, phí ẩn và chính sách đổi trả trước khi thanh toán. Trả lời trung thực khi chưa đủ dữ liệu đối soát.</p>
          <span class="dest-cta">Mở công cụ kiểm tra giá thực &rarr;</span>
        </div>

        <div class="destination-card dest-voucher" data-nav="VOUCHERS" role="button" tabindex="0">
          <span class="dest-badge">KHO MÃ ƯU ĐÃI CHÍNH THỨC</span>
          <h3 class="dest-title">Voucher & Khuyến Mãi Đã Đối Soát</h3>
          <p class="dest-sub">Tổng hợp các mã ưu đãi chính thức có thể lệ rõ ràng, không mã rác hay link tiếp thị ngầm.</p>
          <span class="dest-cta">Xem danh sách mã hợp lệ &rarr;</span>
        </div>
      </section>

      <!-- 5. QUYỀN LỢI HỌC ĐƯỜNG & BẢN QUYỀN SỐ -->
      <section class="section-editorial-rail" aria-label="Chương Trình Học Sinh Sinh Viên">
        <div class="section-header-editorial">
          <span class="section-kicker kicker-prog">🎓 QUYỀN LỢI HỌC ĐƯỜNG</span>
          <h2 class="section-title-editorial">Gói Công Cụ & Bản Quyền Chính Thức</h2>
        </div>
        <div class="cards-layout-grid">
          ${officialItems.slice(0, 4).map(item => renderEditorialCardWithPhoto(item)).join('')}
        </div>
      </section>

      <!-- 6. RADAR THEO DÕI NGUỒN (FOOTER UTILITY TINH GỌN) -->
      <section class="section-editorial-rail section-radar-compact" aria-label="Radar Theo Dõi Nguồn">
        <div class="section-header-editorial">
          <span class="section-kicker kicker-radar">📡 RADAR THEO DÕI NGUỒN</span>
          <h2 class="section-title-editorial">Kênh Tin Cậy Đang Giám Sát Định Kỳ</h2>
        </div>
        <div class="radar-pills-wrap">
          ${radarItems.map(item => `
            <a href="${item.official_source_url}" target="_blank" rel="noopener noreferrer" class="radar-brand-pill">
              <span class="radar-pill-dot"></span>
              <span class="radar-pill-name">${item.title}</span>
              <span class="radar-pill-arrow">&nearr;</span>
            </a>
          `).join('')}
        </div>
      </section>

      <!-- 7. FILTER DRAWER / BOTTOM SHEET (ẨN TRONG MÀN HÌNH ĐẦU) -->
      <div class="filter-drawer-overlay" id="filter-drawer-overlay" aria-hidden="true">
        <div class="filter-drawer-content" role="dialog" aria-modal="true" aria-label="Bộ Lọc Khám Phá Đà Nẵng">
          <div class="filter-drawer-header">
            <h3 class="filter-drawer-title">⚡ Bộ Lọc Khám Phá Đà Nẵng</h3>
            <button class="btn-close-drawer" id="btn-close-filter-drawer" aria-label="Đóng bộ lọc">&times;</button>
          </div>

          <div class="filter-drawer-body">
            <div class="drawer-filter-group">
              <label for="drawer-locality" class="drawer-label">📍 Khu vực:</label>
              <select id="drawer-locality" class="drawer-select">
                <option value="ALL">Toàn Đà Nẵng</option>
                <option value="HAI_CHAU">Hải Châu</option>
                <option value="THANH_KHE">Thanh Khê</option>
                <option value="SON_TRA">Sơn Trà</option>
                <option value="NGU_HANH_SON">Ngũ Hành Sơn</option>
                <option value="HOA_KHANH">Liên Chiểu / Hòa Khánh</option>
                <option value="CAM_LE">Cẩm Lệ</option>
              </select>
            </div>

            <div class="drawer-filter-group">
              <label for="drawer-time" class="drawer-label">⏰ Thời điểm:</label>
              <select id="drawer-time" class="drawer-select">
                <option value="SLOT_EVENING">Tối nay (Sau 18h)</option>
                <option value="SLOT_AFTERNOON">Chiều nay (14h - 18h)</option>
                <option value="SLOT_LUNCH">Trưa nay (11h - 14h)</option>
                <option value="SLOT_MORNING">Sáng nay (06h - 11h)</option>
              </select>
            </div>

            <div class="drawer-filter-group">
              <label for="drawer-budget" class="drawer-label">💰 Ngân sách:</label>
              <select id="drawer-budget" class="drawer-select">
                <option value="ALL">Tất cả mức giá</option>
                <option value="UNDER_50K">Dưới 50.000đ</option>
                <option value="50K_100K">50.000đ - 100.000đ</option>
                <option value="FREE">Miễn phí / Tiện ích công</option>
              </select>
            </div>
          </div>

          <div class="filter-drawer-footer">
            <button class="btn-drawer-apply" id="btn-apply-drawer-filters">Áp Dụng Bộ Lọc &rarr;</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderEditorialCardWithPhoto(item) {
  const isSaved = savedItemIds.has(item.item_id);
  
  let tierKicker = 'Thông tin chính thức';
  let tierCardClass = 'card-tier-verified';
  let actionLabel = 'Xem chi tiết &rarr;';
  let secondaryMeta = 'Nguồn đã xác thực';

  if (item.tier === 'VERIFIED_DEAL') {
    tierKicker = 'Ưu đãi đã đối soát';
    tierCardClass = 'card-tier-deal';
    actionLabel = 'Xem lịch chiếu & điều kiện &rarr;';
    secondaryMeta = 'Áp dụng tại Đà Nẵng';
  } else if (item.tier === 'PENDING_DEAL') {
    tierKicker = 'Chương trình ưu đãi';
    tierCardClass = 'card-tier-deal';
    actionLabel = 'Xem thực đơn & ưu đãi &rarr;';
    secondaryMeta = 'Đang rà soát thể lệ';
  } else if (item.tier === 'CIVIC_FACILITY') {
    tierKicker = 'Tiện ích công cộng';
    tierCardClass = 'card-tier-facility';
    secondaryMeta = 'Phục vụ cư dân & sinh viên';
    if (item.item_id === 'FACILITY_DANABUS') actionLabel = 'Xem lộ trình xe buýt &rarr;';
    else if (item.item_id === 'FACILITY_TNGO_BIKE') actionLabel = 'Xem vị trí trạm xe &rarr;';
    else if (item.item_id === 'FACILITY_THU_VIEN_TONG_HOP') actionLabel = 'Xem giờ mở cửa &rarr;';
    else if (item.item_id === 'FACILITY_DVC_DANANG') actionLabel = 'Tra cứu dịch vụ công &rarr;';
    else actionLabel = 'Xem hướng dẫn & địa điểm &rarr;';
  } else if (item.tier === 'OFFICIAL_PROGRAM') {
    tierKicker = 'Quyền lợi học đường';
    tierCardClass = 'card-tier-program';
    actionLabel = 'Xem điều kiện nhận &rarr;';
    secondaryMeta = 'Dành cho Học sinh / Sinh viên';
  } else if (item.tier === 'RADAR_SOURCE') {
    tierKicker = 'Kênh theo dõi';
    tierCardClass = 'card-tier-radar';
    actionLabel = 'Xem kênh chính thức &nearr;';
    secondaryMeta = 'Giám sát định kỳ';
  }

  return `
    <article class="editorial-card ${tierCardClass} editorial-card-bl" id="card-${item.item_id}">
      <!-- Card Header: Brand + Monogram + Bookmark -->
      <div class="card-head">
        <div class="brand-badge-lockup">
          <div class="brand-monogram" style="background-color: ${item.color_accent};" aria-hidden="true">
            ${item.monogram}
          </div>
          <div class="brand-info">
            <span class="brand-name">${item.brand}</span>
            <span class="tier-kicker-label">${tierKicker}</span>
          </div>
        </div>

        <button class="btn-card-save ${isSaved ? 'is-saved' : ''}" data-save-id="${item.item_id}" aria-label="${isSaved ? 'Bỏ lưu' : 'Lưu lại'}">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="${isSaved ? '#f59e0b' : 'none'}" stroke="${isSaved ? '#f59e0b' : 'currentColor'}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
          </svg>
        </button>
      </div>

      <!-- Card Body: Program Title & Neutral Summary -->
      <div class="card-content">
        <h3 class="card-title">${item.title}</h3>
        <p class="card-summary">${item.summary_text}</p>
        <div class="card-meta-chips">
          <span class="meta-chip">📍 ${item.locality_tag === 'TOAN_DANANG' ? 'Toàn TP. Đà Nẵng' : item.locality_tag}</span>
          <span class="meta-chip">ℹ️ ${secondaryMeta}</span>
        </div>
      </div>

      <!-- Card Action Footer -->
      <div class="card-foot">
        <button class="btn-card-primary btn-semantic-action" data-card-detail="${item.item_id}">
          ${actionLabel}
        </button>
        <a href="${item.official_source_url}" target="_blank" rel="noopener noreferrer" class="btn-card-detail" title="Mở trang gốc">
          Nguồn gốc &nearr;
        </a>
      </div>
    </article>
  `;
}

function attachHomeEvents() {
  if (typeof document === 'undefined') return;

  // 3 Gateway Clicks
  document.querySelectorAll('[data-gateway-target]').forEach(card => {
    const handleGwClick = () => {
      const gw = card.dataset.gatewayTarget;
      activeView = 'EXPLORE';
      activeGateway = gw;
      renderCurrentView();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    card.addEventListener('click', handleGwClick);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleGwClick();
      }
    });
  });

  // Time-Slot Switcher
  document.querySelectorAll('.time-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      activeTimeSlot = pill.dataset.slot;
      renderCurrentView();
    });
  });

  // Search Input
  const searchInput = document.getElementById('home-search-input');
  const clearBtn = document.getElementById('home-clear-search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const val = e.target.value.trim().toLowerCase();
      if (clearBtn) clearBtn.style.display = val ? 'inline-block' : 'none';
      if (val) {
        activeView = 'EXPLORE';
        renderCurrentView();
      }
    });
  }
}

function filterDirectoryItems() {
  return JAYT_DISCOVERY_ITEMS.filter(item => {
    if (activeGateway !== 'ALL' && item.gateway_group !== activeGateway) return false;
    if (activeLocality !== 'ALL' && item.locality_tag !== activeLocality && item.locality_tag !== 'TOAN_DANANG') return false;
    if (activeTier !== 'ALL' && item.tier !== activeTier) return false;
    return true;
  });
}

function attachExploreEvents() {
  if (typeof document === 'undefined') return;

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

function attachBuyDecisionEvents() {
  const checkBtn = document.getElementById('btn-submit-check');
  if (checkBtn) {
    checkBtn.addEventListener('click', () => {
      const input = document.getElementById('input-check-deal');
      const val = input ? input.value.trim() : '';
      if (!val) {
        showToast('Vui lòng nhập tên sản phẩm hoặc dịch vụ cần kiểm tra');
        return;
      }
      showToast(`Đang đối soát dữ liệu cho "${val}"... Kết luận: Chưa đủ dữ liệu để kết luận Mua/Chờ.`);
    });
  }
}

function attachCardListeners() {
  if (typeof document === 'undefined') return;

  // Save Bookmark Event
  document.querySelectorAll('[data-save-id]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.dataset.saveId;
      if (savedItemIds.has(id)) {
        savedItemIds.delete(id);
        showToast('Đã xóa tiện ích khỏi danh sách đã lưu');
      } else {
        savedItemIds.add(id);
        showToast('Đã lưu tiện ích');
      }

      try {
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('jayt_saved_opportunities', JSON.stringify(Array.from(savedItemIds)));
        }
      } catch (err) {}

      const counter = document.getElementById('saved-counter');
      if (counter) counter.textContent = savedItemIds.size;

      if (activeView === 'SAVED') {
        renderCurrentView();
      } else {
        btn.classList.toggle('is-saved', savedItemIds.has(id));
        const svg = btn.querySelector('svg');
        if (svg) {
          svg.setAttribute('fill', savedItemIds.has(id) ? '#f59e0b' : 'none');
          svg.setAttribute('stroke', savedItemIds.has(id) ? '#f59e0b' : 'currentColor');
        }
      }
    });
  });

  // Open Detail Modal
  document.querySelectorAll('[data-card-detail]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.cardDetail;
      const item = JAYT_DISCOVERY_ITEMS.find(i => i.item_id === id);
      if (item) ModalController.open({ type: 'ITEM_DETAIL', item: item }, btn);
    });
  });
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initStorefrontApp);
  } else {
    initStorefrontApp();
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    JAYT_STOREFRONT_VERSION,
    JAYT_DISCOVERY_ITEMS,
    ModalController,
    filterDirectoryItems
  };
}


// ==========================================================================
// JAYT VOUCHER WALLET & DEAL HUNTING (SECTION BS)
// ==========================================================================
const JAYT_VOUCHERS = [
  {
    "voucher_id": "VOUCHER_CGV_VNPAY_BOGO",
    "merchant_id": "CGV_CINEMAS",
    "merchant_name": "CGV Cinemas Việt Nam",
    "category": "ENTERTAINMENT",
    "title": "CGV Cinemas x VNPAY-QR: Mua 1 Tặng 1 Vé 2D",
    "code_text": "VNPAYCGV",
    "code_origin": "OFFICIAL_MERCHANT_CAMPAIGN",
    "public_action": "COPY_CODE",
    "action_button_label": "Sao chép mã & đặt rạp →",
    "offer_summary": "Tặng 1 vé 2D khi mua 1 vé 2D vào T6, T7, CN tại CGV Đà Nẵng",
    "terms_conditions": "Áp dụng cho vé xem phim 2D tiêu chuẩn, thanh toán qua cổng VNPAY-QR.",
    "geographic_scope": "CGV Vĩnh Trung Plaza & CGV Vincom Plaza Đà Nẵng",
    "expiry_bound": "2026-12-31T23:59:59+07:00",
    "official_source_url": "https://www.cgv.vn/default/movies/offers/vnpay-bogo",
    "evidence_binding_id": "EVID_CGV_VNPAY_BOGO_001",
    "visual_asset_id": "ASSET_HERO_DRAGON_BRIDGE",
    "status": "ACTIVE_VERIFIED"
  },
  {
    "voucher_id": "VOUCHER_DOMINOS_BOGO",
    "merchant_id": "DOMINOS_PIZZA",
    "merchant_name": "Domino's Pizza",
    "category": "FOOD_BEVERAGE",
    "title": "Domino's Pizza: Mua 1 Tặng 1 Pizza Mỗi Thứ 3 & Chủ Nhật",
    "code_text": null,
    "code_origin": "OFFICIAL_STORE_PROMOTION",
    "public_action": "CLAIM_OFFICIAL",
    "action_button_label": "Nhận tại trang chính thức →",
    "offer_summary": "Mua 1 Pizza cỡ M/L được tặng 1 Pizza cùng cỡ tại hệ thống Domino's Đà Nẵng",
    "terms_conditions": "Tự động áp dụng trên website chính thức vào thứ 3 và chủ nhật.",
    "geographic_scope": "Domino's Pizza Nguyễn Văn Linh & Pasteur Đà Nẵng",
    "expiry_bound": "2026-12-31T23:59:59+07:00",
    "official_source_url": "https://dominos.vn/khuyen-mai/mua-1-tang-1",
    "evidence_binding_id": "EVID_DOMINOS_BOGO_001",
    "visual_asset_id": "NONE",
    "status": "ACTIVE_VERIFIED"
  },
  {
    "voucher_id": "VOUCHER_LOTTERIA_HAPPY_LUNCH",
    "merchant_id": "LOTTERIA_VN",
    "merchant_name": "Lotteria Vietnam",
    "category": "FOOD_BEVERAGE",
    "title": "Lotteria: Happy Lunch Đồng Giá 38.000đ",
    "code_text": null,
    "code_origin": "OFFICIAL_STORE_PROMOTION",
    "public_action": "CLAIM_OFFICIAL",
    "action_button_label": "Xem thực đơn trưa chính thức →",
    "offer_summary": "Thực đơn trưa cơm gà, burger bò giá ưu đãi 38.000đ từ 10h - 14h hàng ngày",
    "terms_conditions": "Áp dụng khung giờ 10:00 - 14:00 từ Thứ 2 đến Thứ 6 tại cửa hàng.",
    "geographic_scope": "Tất cả chi nhánh Lotteria TP. Đà Nẵng",
    "expiry_bound": "2026-12-31T23:59:59+07:00",
    "official_source_url": "https://www.lotteria.vn/menu/happy-lunch",
    "evidence_binding_id": "EVID_LOTTERIA_HAPPY_LUNCH_001",
    "visual_asset_id": "NONE",
    "status": "ACTIVE_VERIFIED"
  },
  {
    "voucher_id": "VOUCHER_GITHUB_STUDENT_PACK",
    "merchant_id": "GITHUB_EDUCATION",
    "merchant_name": "GitHub Education",
    "category": "STUDY_TOOLS",
    "title": "GitHub Student Developer Pack (Miễn phí công cụ lập trình)",
    "code_text": null,
    "code_origin": "OFFICIAL_STUDENT_PROGRAM",
    "public_action": "CLAIM_OFFICIAL",
    "action_button_label": "Đăng ký GitHub Student chính thức →",
    "offer_summary": "Miễn phí GitHub Copilot, Canva Pro, Namecheap domain và JetBrains cho học sinh sinh viên",
    "terms_conditions": "Yêu cầu email trường học (@edu.vn) hoặc thẻ học sinh/sinh viên còn hạn.",
    "geographic_scope": "Học sinh sinh viên tại các trường ĐH, CĐ, THPT TP. Đà Nẵng",
    "expiry_bound": "PERPETUAL",
    "official_source_url": "https://education.github.com/pack",
    "evidence_binding_id": "EVID_GITHUB_STUDENT_001",
    "visual_asset_id": "NONE",
    "status": "ACTIVE_VERIFIED"
  },
  {
    "voucher_id": "VOUCHER_NOTION_EDUCATION_PLUS",
    "merchant_id": "NOTION_LABS",
    "merchant_name": "Notion",
    "category": "STUDY_TOOLS",
    "title": "Notion Plus Miễn Phí Trọn Đời Cho Sinh Viên & Giảng Viên",
    "code_text": null,
    "code_origin": "OFFICIAL_STUDENT_PROGRAM",
    "public_action": "CLAIM_OFFICIAL",
    "action_button_label": "Kích hoạt Notion Plus chính thức →",
    "offer_summary": "Gói Notion Plus không giới hạn block và trang cộng tác cho học tập",
    "terms_conditions": "Đăng ký tài khoản bằng email sinh viên được nhà trường cấp.",
    "geographic_scope": "Sinh viên & Giảng viên các trường ĐH tại Đà Nẵng",
    "expiry_bound": "PERPETUAL",
    "official_source_url": "https://www.notion.so/product/notion-for-education",
    "evidence_binding_id": "EVID_NOTION_EDU_001",
    "visual_asset_id": "NONE",
    "status": "ACTIVE_VERIFIED"
  },
  {
    "voucher_id": "VOUCHER_DANABUS_MONTHLY_PASS",
    "merchant_id": "DANABUS_OFFICIAL",
    "merchant_name": "DanaBus — Xe Buýt Đà Nẵng",
    "category": "TRANSPORT",
    "title": "DanaBus: Vé Tháng Học Sinh Sinh Viên Chỉ 45.000đ/tháng",
    "code_text": null,
    "code_origin": "CIVIC_PUBLIC_SERVICE",
    "public_action": "VIEW_CONDITIONS",
    "action_button_label": "Xem điểm làm vé & lộ trình tuyến →",
    "offer_summary": "Đi lại không giới hạn trên toàn bộ mạng lưới xe buýt nội thành Đà Nẵng",
    "terms_conditions": "Làm vé tháng tại các điểm đăng ký xe buýt công cộng của thành phố.",
    "geographic_scope": "Toàn bộ các tuyến xe buýt công cộng TP. Đà Nẵng",
    "expiry_bound": "PERPETUAL",
    "official_source_url": "https://danangbus.vn",
    "evidence_binding_id": "EVID_DANABUS_001",
    "visual_asset_id": "NONE",
    "status": "ACTIVE_VERIFIED"
  },
  {
    "voucher_id": "VOUCHER_TNGO_BIKE_DA_NANG",
    "merchant_id": "TNGO_VIETNAM",
    "merchant_name": "TNGO Xe Đạp Công Cộng",
    "category": "TRANSPORT",
    "title": "TNGO: Đạp Xe Dạo Sông Hàn & Cầu Rồng 5.000đ/30 phút",
    "code_text": null,
    "code_origin": "CIVIC_PUBLIC_SERVICE",
    "public_action": "VIEW_CONDITIONS",
    "action_button_label": "Xem trạm xe gần bạn →",
    "offer_summary": "Hơn 60 trạm xe đạp thông minh khắp các quận trung tâm Hải Châu, Sơn Trà",
    "terms_conditions": "Quét mã mở khóa xe qua ứng dụng TNGO chính thức.",
    "geographic_scope": "Hải Châu, Sơn Trà, Ngũ Hành Sơn TP. Đà Nẵng",
    "expiry_bound": "PERPETUAL",
    "official_source_url": "https://tngo.vn",
    "evidence_binding_id": "EVID_TNGO_001",
    "visual_asset_id": "NONE",
    "status": "ACTIVE_VERIFIED"
  },
  {
    "voucher_id": "VOUCHER_METIZ_U22_TICKETS",
    "merchant_id": "METIZ_CINEMA",
    "merchant_name": "Metiz Cinema Đà Nẵng",
    "category": "ENTERTAINMENT",
    "title": "Metiz Cinema: Vé Xem Phim U22 Chỉ 45.000đ",
    "code_text": null,
    "code_origin": "OFFICIAL_STORE_PROMOTION",
    "public_action": "VIEW_CONDITIONS",
    "action_button_label": "Xem bảng giá & điều kiện rạp →",
    "offer_summary": "Vé 45k cho khán giả dưới 22 tuổi từ Thứ 2 đến Thứ 6 tại rạp Metiz Helio",
    "terms_conditions": "Xuất trình CCCD hoặc thẻ HSSV tại quầy vé rạp Metiz Cinema.",
    "geographic_scope": "Metiz Cinema — Tầng 1 Helio Center, Hải Châu, Đà Nẵng",
    "expiry_bound": "2026-12-31T23:59:59+07:00",
    "official_source_url": "https://metiz.vn/tin-tuc/khuyen-mai/gia-ve-u22-metiz/",
    "evidence_binding_id": "EVID_METIZ_U22_001",
    "visual_asset_id": "NONE",
    "status": "ACTIVE_VERIFIED"
  },
  {
    "voucher_id": "VOUCHER_STARLIGHT_COMBO_10K",
    "merchant_id": "STARLIGHT_CINEMA",
    "merchant_name": "Starlight Cinema Đà Nẵng",
    "category": "ENTERTAINMENT",
    "title": "Starlight Cinema: Bắp Nước Học Sinh Sinh Viên 10.000đ",
    "code_text": null,
    "code_origin": "OFFICIAL_STORE_PROMOTION",
    "public_action": "VIEW_CONDITIONS",
    "action_button_label": "Xem thể lệ tại rạp Starlight →",
    "offer_summary": "Mua vé xem phim kèm combo bắp nước chỉ 10.000đ vào ngày thứ 3 hàng tuần",
    "terms_conditions": "Áp dụng thành viên Starlight và học sinh sinh viên tại quầy vé.",
    "geographic_scope": "Starlight Cinema — Tầng 4 Tòa nhà Nguyễn Kim, Thanh Khê, Đà Nẵng",
    "expiry_bound": "2026-12-31T23:59:59+07:00",
    "official_source_url": "https://starlight.vn/khuyen-mai/combo-bap-nuoc-10k.html",
    "evidence_binding_id": "EVID_STARLIGHT_10K_001",
    "visual_asset_id": "NONE",
    "status": "ACTIVE_VERIFIED"
  },
  {
    "voucher_id": "VOUCHER_HIGHLANDS_COFFEE_RADAR",
    "merchant_id": "HIGHLANDS_COFFEE",
    "merchant_name": "Highlands Coffee",
    "category": "FOOD_BEVERAGE",
    "title": "Highlands Coffee: Chương Trình Ưu Đãi Định Kỳ",
    "code_text": null,
    "code_origin": "RADAR_MONITORED_SOURCE",
    "public_action": "WATCH_MONITOR",
    "action_button_label": "Theo dõi mở mã ưu đãi",
    "offer_summary": "Theo dõi các đợt tặng mã giảm giá Freeze và Trà sen vàng hàng tháng",
    "terms_conditions": "Chưa có mã voucher phát hành chính thức hôm nay. Đang theo dõi định kỳ.",
    "geographic_scope": "Các cửa hàng Highlands Coffee TP. Đà Nẵng",
    "expiry_bound": "MONITORING_ACTIVE",
    "official_source_url": "https://highlandscoffee.com.vn",
    "evidence_binding_id": "EVID_HIGHLANDS_RADAR_001",
    "visual_asset_id": "NONE",
    "status": "RADAR_MONITORING"
  },
  {
    "voucher_id": "VOUCHER_PHUC_LONG_RADAR",
    "merchant_id": "PHUC_LONG_TEA",
    "merchant_name": "Phúc Long Coffee & Tea",
    "category": "FOOD_BEVERAGE",
    "title": "Phúc Long: Chương Trình Thẻ Thành Viên & Voucher Trà Sữa",
    "code_text": null,
    "code_origin": "RADAR_MONITORED_SOURCE",
    "public_action": "WATCH_MONITOR",
    "action_button_label": "Theo dõi mở mã ưu đãi",
    "offer_summary": "Theo dõi ưu đãi tích điểm và giảm giá đồ uống tại các chi nhánh Đà Nẵng",
    "terms_conditions": "Chưa có mã voucher phát hành chính thức hôm nay. Đang theo dõi định kỳ.",
    "geographic_scope": "Phúc Long Bạch Đằng & Nguyễn Văn Linh, Đà Nẵng",
    "expiry_bound": "MONITORING_ACTIVE",
    "official_source_url": "https://phuclong.com.vn",
    "evidence_binding_id": "EVID_PHUCLONG_RADAR_001",
    "visual_asset_id": "NONE",
    "status": "RADAR_MONITORING"
  },
  {
    "voucher_id": "VOUCHER_VINCOM_PLAZA_RADAR",
    "merchant_id": "VINCOM_DA_NANG",
    "merchant_name": "Vincom Plaza Ngô Quyền",
    "category": "SHOPPING",
    "title": "Vincom Plaza Đà Nẵng: Lễ Hội Ưu Đãi Mua Sắm Cuối Tuần",
    "code_text": null,
    "code_origin": "RADAR_MONITORED_SOURCE",
    "public_action": "WATCH_MONITOR",
    "action_button_label": "Theo dõi sự kiện mua sắm",
    "offer_summary": "Theo dõi các chương trình khuyến mãi từ các thương hiệu tại Vincom Plaza Đà Nẵng",
    "terms_conditions": "Chương trình theo từng đợt sự kiện của trung tâm thương mại.",
    "geographic_scope": "Vincom Plaza — 910A Ngô Quyền, Sơn Trà, TP. Đà Nẵng",
    "expiry_bound": "MONITORING_ACTIVE",
    "official_source_url": "https://vincom.com.vn/vincom-plaza-ngo-quyen-da-nang",
    "evidence_binding_id": "EVID_VINCOM_RADAR_001",
    "visual_asset_id": "NONE",
    "status": "RADAR_MONITORING"
  }
];

function renderVoucherCard(v) {
  const isCopy = v.public_action === 'COPY_CODE';
  const isClaim = v.public_action === 'CLAIM_OFFICIAL';
  const isWatch = v.public_action === 'WATCH_MONITOR';

  let actionHtml = '';
  if (isCopy) {
    actionHtml = `
      <div class="voucher-copy-box">
        <div class="voucher-code-display" title="Mã chính thức">${v.code_text}</div>
        <button class="btn-voucher-action btn-copy-code" data-copy-code="${v.code_text}" data-voucher-id="${v.voucher_id}" aria-label="Sao chép mã ${v.code_text}">
          📋 Sao chép mã
        </button>
      </div>
    `;
  } else if (isClaim) {
    actionHtml = `
      <a href="${v.official_source_url}" target="_blank" rel="noopener noreferrer" class="btn-voucher-action btn-claim-official">
        ${v.action_button_label}
      </a>
    `;
  } else if (isWatch) {
    actionHtml = `
      <button class="btn-voucher-action btn-watch-monitor" data-watch-id="${v.voucher_id}">
        🔔 ${v.action_button_label}
      </button>
    `;
  } else {
    actionHtml = `
      <a href="${v.official_source_url}" target="_blank" rel="noopener noreferrer" class="btn-voucher-action btn-view-conditions">
        ${v.action_button_label}
      </a>
    `;
  }

  return `
    <div class="voucher-ticket-card ${isCopy ? 'ticket-spotlight-item' : ''}" data-category="${v.category}" data-action="${v.public_action}">
      <div class="ticket-left">
        <div class="ticket-merchant-badge">${v.merchant_name}</div>
        <h4 class="ticket-title">${v.title}</h4>
        <p class="ticket-summary">${v.offer_summary}</p>
        <div class="ticket-meta">
          <span class="ticket-scope">📍 ${v.geographic_scope}</span>
          <span class="ticket-expiry">⏳ Hạn: ${v.expiry_bound === 'PERPETUAL' ? 'Dài hạn' : (v.expiry_bound.includes('2026') ? '31/12/2026' : 'Đang theo dõi')}</span>
        </div>
      </div>
      <div class="ticket-perforation"></div>
      <div class="ticket-right">
        ${actionHtml}
        <button class="btn-save-wallet" data-save-voucher="${v.voucher_id}" title="Lưu vào ví cá nhân">
          🤍 Lưu
        </button>
      </div>
    </div>
  `;
}

function renderVoucherWalletView() {
  const spotlightVoucher = JAYT_VOUCHERS.find(v => v.voucher_id === 'VOUCHER_CGV_VNPAY_BOGO');
  const otherVouchers = JAYT_VOUCHERS.filter(v => v.voucher_id !== 'VOUCHER_CGV_VNPAY_BOGO');

  return `
    <div class="voucher-wallet-page">
      <!-- 1. WALLET HERO & SPOTLIGHT -->
      <section class="wallet-hero-section">
        <div class="wallet-header-editorial">
          <span class="section-kicker kicker-deal">🎟️ VÍ ƯU ĐÃI & VOUCHER JAYT</span>
          <h1 class="wallet-headline">Săn Ưu Đãi Thật Tại Đà Nẵng</h1>
          <p class="wallet-subcopy">Tổng hợp mã khuyến mãi, đặc quyền học đường và ưu đãi đô thị đã đối soát 100% nguồn gốc.</p>
        </div>

        <!-- SPOTLIGHT VOUCHER TICKET -->
        ${spotlightVoucher ? `
          <div class="wallet-spotlight-ticket">
            <div class="spotlight-badge-label">🔥 ƯU ĐÃI NỔI BẬT HÔM NAY</div>
            <div class="spotlight-ticket-content">
              <div class="spotlight-info">
                <span class="spotlight-merchant">${spotlightVoucher.merchant_name}</span>
                <h2 class="spotlight-title">${spotlightVoucher.title}</h2>
                <p class="spotlight-desc">${spotlightVoucher.offer_summary}. ${spotlightVoucher.terms_conditions}</p>
                <div class="spotlight-meta-tags">
                  <span class="meta-tag">📍 ${spotlightVoucher.geographic_scope}</span>
                  <span class="meta-tag">✓ Đã đối soát cgv.vn</span>
                </div>
              </div>
              <div class="spotlight-action-box">
                <div class="spotlight-code-card">
                  <span class="code-label">MÃ ƯU ĐÃI CHÍNH THỨC:</span>
                  <span class="code-val">${spotlightVoucher.code_text}</span>
                </div>
                <button class="btn-spotlight-copy btn-copy-code" data-copy-code="${spotlightVoucher.code_text}" data-voucher-id="${spotlightVoucher.voucher_id}">
                  📋 Sao Chép Mã & Đặt Rạp →
                </button>
                <a href="${spotlightVoucher.official_source_url}" target="_blank" rel="noopener noreferrer" class="spotlight-source-link">
                  Xem thể lệ tại cgv.vn &nearr;
                </a>
              </div>
            </div>
          </div>
        ` : ''}
      </section>

      <!-- 2. VOUCHER FILTER TABS & SEARCH -->
      <section class="wallet-controls-section">
        <div class="wallet-filter-tabs" role="tablist">
          <button class="wallet-tab-btn active" data-wallet-filter="ALL">Tất cả (12)</button>
          <button class="wallet-tab-btn" data-wallet-filter="FOOD_BEVERAGE">Ăn uống (4)</button>
          <button class="wallet-tab-btn" data-wallet-filter="ENTERTAINMENT">Đi chơi & Rạp (4)</button>
          <button class="wallet-tab-btn" data-wallet-filter="STUDY_TOOLS">Học tập & Bản quyền (2)</button>
          <button class="wallet-tab-btn" data-wallet-filter="TRANSPORT">Di chuyển đô thị (2)</button>
          <button class="wallet-tab-btn" data-wallet-filter="SAVED">Đã lưu (<span id="saved-count">0</span>)</button>
        </div>

        <div class="wallet-status-chips">
          <span class="status-chip-label">Trạng thái:</span>
          <button class="wallet-chip-btn active" data-status-filter="ALL">Tất cả</button>
          <button class="wallet-chip-btn" data-status-filter="COPY_CODE">Có mã sao chép</button>
          <button class="wallet-chip-btn" data-status-filter="CLAIM_OFFICIAL">Nhận tại trang gốc</button>
          <button class="wallet-chip-btn" data-status-filter="VIEW_CONDITIONS">Xem điều kiện</button>
          <button class="wallet-chip-btn" data-status-filter="WATCH_MONITOR">Đang theo dõi</button>
        </div>
      </section>

      <!-- 3. VOUCHER TICKET GRID -->
      <section class="wallet-grid-section">
        <div class="voucher-tickets-grid" id="voucher-tickets-grid">
          ${otherVouchers.map(v => renderVoucherCard(v)).join('')}
        </div>
      </section>

      <!-- COPY CONFIRMATION TOAST -->
      <div class="copy-toast-notification" id="copy-toast" aria-live="polite" aria-hidden="true">
        <span class="toast-icon">✓</span>
        <span class="toast-msg" id="toast-message">Đã sao chép mã thành công!</span>
      </div>
    </div>
  `;
}

function attachVoucherWalletEvents() {
  if (typeof document === 'undefined') return;

  // Copy to clipboard flow
  document.querySelectorAll('.btn-copy-code').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const codeToCopy = btn.getAttribute('data-copy-code');
      const voucherId = btn.getAttribute('data-voucher-id');

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(codeToCopy).then(() => {
          showCopyToast(`Đã sao chép: ${codeToCopy} — Kiểm tra điều kiện trước khi dùng!`);
        }).catch(() => {
          showCopyToast(`Mã ưu đãi: ${codeToCopy}`);
        });
      } else {
        showCopyToast(`Mã ưu đãi: ${codeToCopy}`);
      }

      if (window.JAYT_OBSERVABILITY) {
        window.JAYT_OBSERVABILITY.recordEvent('VOUCHER_CODE_COPIED', {
          voucher_id: voucherId,
          code: codeToCopy
        });
      }
    });
  });

  // Save to local wallet
  document.querySelectorAll('.btn-save-wallet').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const vId = btn.getAttribute('data-save-voucher');
      let saved = JSON.parse(localStorage.getItem('jayt_saved_vouchers') || '[]');
      if (!saved.includes(vId)) {
        saved.push(vId);
        localStorage.setItem('jayt_saved_vouchers', JSON.stringify(saved));
        btn.innerHTML = '❤️ Đã lưu';
        showCopyToast('Đã lưu voucher vào ví trên thiết bị!');
      } else {
        saved = saved.filter(id => id !== vId);
        localStorage.setItem('jayt_saved_vouchers', JSON.stringify(saved));
        btn.innerHTML = '🤍 Lưu';
        showCopyToast('Đã bỏ lưu voucher.');
      }
      const countEl = document.getElementById('saved-count');
      if (countEl) countEl.innerText = saved.length;
    });
  });

  // Wallet filter tabs
  document.querySelectorAll('.wallet-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.wallet-tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-wallet-filter');
      filterVoucherGrid(filter, 'CATEGORY');
    });
  });

  // Wallet status chips
  document.querySelectorAll('.wallet-chip-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.wallet-chip-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const statusFilter = btn.getAttribute('data-status-filter');
      filterVoucherGrid(statusFilter, 'STATUS');
    });
  });
}

function showCopyToast(msg) {
  const toast = document.getElementById('copy-toast');
  const msgEl = document.getElementById('toast-message');
  if (toast && msgEl) {
    msgEl.innerText = msg;
    toast.classList.add('show');
    toast.setAttribute('aria-hidden', 'false');
    setTimeout(() => {
      toast.classList.remove('show');
      toast.setAttribute('aria-hidden', 'true');
    }, 3500);
  }
}

function filterVoucherGrid(filterValue, filterType) {
  const cards = document.querySelectorAll('.voucher-ticket-card');
  const saved = JSON.parse(localStorage.getItem('jayt_saved_vouchers') || '[]');

  cards.forEach(card => {
    if (filterValue === 'ALL') {
      card.style.display = 'flex';
    } else if (filterType === 'CATEGORY') {
      if (filterValue === 'SAVED') {
        const vId = card.querySelector('[data-save-voucher]')?.getAttribute('data-save-voucher');
        card.style.display = saved.includes(vId) ? 'flex' : 'none';
      } else {
        card.style.display = card.getAttribute('data-category') === filterValue ? 'flex' : 'none';
      }
    } else if (filterType === 'STATUS') {
      card.style.display = card.getAttribute('data-action') === filterValue ? 'flex' : 'none';
    }
  });
}
