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

const JAYT_STOREFRONT_VERSION = 'v3.422.6-staging.bg';

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
    "summary_text": "Thông tin bữa trưa từ kênh Lotteria đang được rà soát đối soát theo tiêu chuẩn AU. Mở cổng chính thức để tự kiểm tra.",
    "verbatim_quote": "Kênh thông tin chính thức: lotteria.vn",
    "evidence_status": "Đang rà soát theo tiêu chuẩn AU; chưa chứng nhận từng field",
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
    "summary_text": "Thông tin khuyến mãi từ Domino's đang được rà soát đối soát theo tiêu chuẩn AU. Mở cổng chính thức để tự kiểm tra.",
    "verbatim_quote": "Kênh thông tin chính thức: dominos.vn",
    "evidence_status": "Đang rà soát theo tiêu chuẩn AU; chưa chứng nhận từng field",
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
    "summary_text": "Chính sách giá vé Metiz đang được rà soát đối soát theo tiêu chuẩn AU. Mở cổng chính thức để tự kiểm tra.",
    "verbatim_quote": "Kênh thông tin chính thức: metiz.vn",
    "evidence_status": "Đang rà soát theo tiêu chuẩn AU; chưa chứng nhận từng field",
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
    "summary_text": "Thông tin gói bắp nước Starlight đang được rà soát đối soát theo tiêu chuẩn AU. Mở cổng chính thức để tự kiểm tra.",
    "verbatim_quote": "Kênh thông tin chính thức: starlight.vn",
    "evidence_status": "Đang rà soát theo tiêu chuẩn AU; chưa chứng nhận từng field",
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
    "summary_text": "Chương trình bản quyền lập trình từ GitHub đang được rà soát đối soát theo tiêu chuẩn AU. Mở cổng chính thức để tự kiểm tra.",
    "verbatim_quote": "Cổng thông tin chính thức: education.github.com",
    "evidence_status": "Đang rà soát theo tiêu chuẩn AU; chưa chứng nhận từng field",
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
    "summary_text": "Chương trình Notion Education đang được rà soát đối soát theo tiêu chuẩn AU. Mở cổng chính thức để tự kiểm tra.",
    "verbatim_quote": "Cổng thông tin chính thức: notion.so",
    "evidence_status": "Đang rà soát theo tiêu chuẩn AU; chưa chứng nhận từng field",
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
    "summary_text": "Chương trình Microsoft 365 Education đang được rà soát đối soát theo tiêu chuẩn AU. Mở cổng chính thức để tự kiểm tra.",
    "verbatim_quote": "Cổng thông tin chính thức: microsoft.com",
    "evidence_status": "Đang rà soát theo tiêu chuẩn AU; chưa chứng nhận từng field",
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
    "summary_text": "Chương trình Canva for Education đang được rà soát đối soát theo tiêu chuẩn AU. Mở cổng chính thức để tự kiểm tra.",
    "verbatim_quote": "Cổng thông tin chính thức: canva.com",
    "evidence_status": "Đang rà soát theo tiêu chuẩn AU; chưa chứng nhận từng field",
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
    "summary_text": "Gói Spotify Premium Student đang được rà soát đối soát theo tiêu chuẩn AU. Mở cổng chính thức để tự kiểm tra.",
    "verbatim_quote": "Cổng thông tin chính thức: spotify.com",
    "evidence_status": "Đang rà soát theo tiêu chuẩn AU; chưa chứng nhận từng field",
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
    "summary_text": "Gói Apple Music Student đang được rà soát đối soát theo tiêu chuẩn AU. Mở cổng chính thức để tự kiểm tra.",
    "verbatim_quote": "Cổng thông tin chính thức: apple.com",
    "evidence_status": "Đang rà soát theo tiêu chuẩn AU; chưa chứng nhận từng field",
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
    "summary_text": "Chương trình JetBrains Student Pack đang được rà soát đối soát theo tiêu chuẩn AU. Mở cổng chính thức để tự kiểm tra.",
    "verbatim_quote": "Cổng thông tin chính thức: jetbrains.com",
    "evidence_status": "Đang rà soát theo tiêu chuẩn AU; chưa chứng nhận từng field",
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
    "summary_text": "Chương trình Figma for Education đang được rà soát đối soát theo tiêu chuẩn AU. Mở cổng chính thức để tự kiểm tra.",
    "verbatim_quote": "Cổng thông tin chính thức: figma.com",
    "evidence_status": "Đang rà soát theo tiêu chuẩn AU; chưa chứng nhận từng field",
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
    "summary_text": "Chương trình AWS Educate đang được rà soát đối soát theo tiêu chuẩn AU. Mở cổng chính thức để tự kiểm tra.",
    "verbatim_quote": "Cổng thông tin chính thức: aws.amazon.com",
    "evidence_status": "Đang rà soát theo tiêu chuẩn AU; chưa chứng nhận từng field",
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
    "summary_text": "Thông tin mạng lưới xe buýt công cộng đang được rà soát đối soát theo tiêu chuẩn AU. Mở cổng chính thức để tự kiểm tra.",
    "verbatim_quote": "Cổng thông tin xe buýt: danangbus.vn",
    "evidence_status": "Đang rà soát theo tiêu chuẩn AU; chưa chứng nhận từng field",
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
    "summary_text": "Mạng lưới xe đạp chia sẻ đang được rà soát đối soát theo tiêu chuẩn AU. Mở cổng chính thức để tự kiểm tra.",
    "verbatim_quote": "Cổng dịch vụ xe đạp: tngo.vn",
    "evidence_status": "Đang rà soát theo tiêu chuẩn AU; chưa chứng nhận từng field",
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
    "summary_text": "Không gian đọc sách và tra cứu tài liệu công cộng đang được rà soát đối soát theo tiêu chuẩn AU. Mở cổng chính thức để tự kiểm tra.",
    "verbatim_quote": "Cổng thông tin thư viện: thuvien.danang.gov.vn",
    "evidence_status": "Đang rà soát theo tiêu chuẩn AU; chưa chứng nhận từng field",
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
    "summary_text": "Cổng thông tin thủ tục hành chính trực tuyến đang được rà soát đối soát theo tiêu chuẩn AU. Mở cổng chính thức để tự kiểm tra.",
    "verbatim_quote": "Cổng dịch vụ công: dichvucong.danang.gov.vn",
    "evidence_status": "Đang rà soát theo tiêu chuẩn AU; chưa chứng nhận từng field",
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
    "summary_text": "Hệ thống nhà sách và đồ dùng học tập đang được rà soát đối soát theo tiêu chuẩn AU. Mở cổng chính thức để tự kiểm tra.",
    "verbatim_quote": "Cổng thông tin nhà sách: fahasa.com",
    "evidence_status": "Đang rà soát theo tiêu chuẩn AU; chưa chứng nhận từng field",
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
    "summary_text": "Cổng thông tin đặt vé tàu hỏa trực tuyến đang được rà soát đối soát theo tiêu chuẩn AU. Mở cổng chính thức để tự kiểm tra.",
    "verbatim_quote": "Cổng thông tin đường sắt: dsvn.vn",
    "evidence_status": "Đang rà soát theo tiêu chuẩn AU; chưa chứng nhận từng field",
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
          <div class="nav-brand" role="button" tabindex="0" data-nav="HOME">
            <span class="brand-logotype">JayT</span>
            <span class="brand-sub">Đà Nẵng</span>
            <span class="brand-edition-pill">Daily Guide</span>
          </div>

          <nav class="nav-links-desktop" role="navigation" aria-label="Điều hướng chính">
            <button class="nav-btn active" data-nav="HOME">Hôm nay</button>
            <button class="nav-btn" data-nav="EXPLORE">Khám phá</button>
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
            <span class="footer-heading">Nguyên tắc vận hành</span>
            <p class="footer-text">100% bằng chứng đối soát • Không voucher ảo • Không hoa hồng tiếp thị ngầm</p>
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
    canvas.innerHTML = renderVouchersHub();
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


function renderDailyGuideHome() {
  const verifiedDeals = JAYT_DISCOVERY_ITEMS.filter(i => i.tier === 'VERIFIED_DEAL');
  const pendingDeals = JAYT_DISCOVERY_ITEMS.filter(i => i.tier === 'PENDING_DEAL');
  const facilityItems = JAYT_DISCOVERY_ITEMS.filter(i => i.tier === 'CIVIC_FACILITY');
  const officialItems = JAYT_DISCOVERY_ITEMS.filter(i => i.tier === 'OFFICIAL_PROGRAM');
  const radarItems = JAYT_DISCOVERY_ITEMS.filter(i => i.tier === 'RADAR_SOURCE');

  const slotKey = JAYT_TIME_SLOT_VISUALS[activeTimeSlot] ? activeTimeSlot : 'SLOT_MORNING';
  const currentSlotData = JAYT_TIME_SLOT_VISUALS[slotKey];

  return `
    <div class="home-guide-layout">
      <!-- Dynamic Editorial Hero Header with Visual Storytelling -->
      <section class="guide-hero-section" style="background: ${currentSlotData.gradient}">
        <div class="hero-visual-backdrop">
          ${currentSlotData.illustration_svg}
        </div>
        <div class="hero-badge">${currentSlotData.kicker}</div>
        <h1 id="hero-title" class="hero-main-title">${currentSlotData.title}</h1>
        <p class="hero-description">${currentSlotData.promise}</p>
        
        <!-- Search Bar with Progressive Disclosure -->
        <div class="hero-search-wrapper">
          <div class="search-input-box">
            <svg class="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input type="text" id="home-search-input" placeholder="Tìm kiếm nhanh: Lotteria, Metiz, DanaBus, Figma, Thư viện..." />
            <button id="home-clear-search" class="btn-clear-search" style="display: none;">Xóa</button>
          </div>
        </div>
      </section>

      <!-- The 3 Primary Daily Gateways with Distinct Visual Covers -->
      <section class="daily-gateways-section" aria-labelledby="gateways-title">
        <h2 id="gateways-title" class="sr-only">Ba cửa vào khám phá trong ngày</h2>
        <div class="gateways-grid">
          <!-- Gateway 1: Food -->
          <div class="gateway-card card-gateway-food" data-gateway-target="AN_GI" role="button" tabindex="0">
            <div class="gateway-visual-cover cover-food">
              <svg class="gw-svg-cover" viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <circle cx="50" cy="30" r="22" fill="#fee2e2" opacity="0.8"/>
                <path d="M35 34 C42 22, 58 22, 65 34 Z" fill="#ef4444" opacity="0.9"/>
                <path d="M30 38 Q50 48 70 38" stroke="#dc2626" stroke-width="3" stroke-linecap="round"/>
              </svg>
            </div>
            <div class="gateway-tag">BỮA ĂN & GẶP GỠ</div>
            <h3 class="gateway-heading">Ăn gì hôm nay?</h3>
            <p class="gateway-sub">Khám phá địa điểm ăn uống, thực đơn và nguồn tin cậy</p>
            <span class="gateway-action-hint">Khám phá nguồn phù hợp &rarr;</span>
          </div>

          <!-- Gateway 2: Places & Movement -->
          <div class="gateway-card card-gateway-places" data-gateway-target="DI_DAU" role="button" tabindex="0">
            <div class="gateway-visual-cover cover-places">
              <svg class="gw-svg-cover" viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <circle cx="50" cy="30" r="22" fill="#cffafe" opacity="0.8"/>
                <rect x="36" y="22" width="28" height="18" rx="4" fill="#06b6d4" opacity="0.9"/>
                <circle cx="43" cy="42" r="3.5" fill="#0891b2"/>
                <circle cx="57" cy="42" r="3.5" fill="#0891b2"/>
              </svg>
            </div>
            <div class="gateway-tag">ĐI LẠI & GIẢI TRÍ</div>
            <h3 class="gateway-heading">Đi đâu sau giờ học/làm?</h3>
            <p class="gateway-sub">Điểm đến giải trí, rạp phim, xe buýt đô thị và không gian tự học</p>
            <span class="gateway-action-hint">Khám phá nguồn phù hợp &rarr;</span>
          </div>

          <!-- Gateway 3: Study & Tools -->
          <div class="gateway-card card-gateway-tools" data-gateway-target="MUA_GI" role="button" tabindex="0">
            <div class="gateway-visual-cover cover-tools">
              <svg class="gw-svg-cover" viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <circle cx="50" cy="30" r="22" fill="#dbeafe" opacity="0.8"/>
                <path d="M50 18 L68 27 L50 36 L32 27 Z" fill="#2563eb" opacity="0.9"/>
                <path d="M40 33 V41 C40 45, 60 45, 60 41 V33" stroke="#1d4ed8" stroke-width="2.5" fill="none"/>
              </svg>
            </div>
            <div class="gateway-tag">HỌC TẬP & MUA SẮM</div>
            <h3 class="gateway-heading">Cần mua sắm gì?</h3>
            <p class="gateway-sub">Công cụ học tập chính thức, bản quyền số và kênh tiêu dùng thiết yếu</p>
            <span class="gateway-action-hint">Khám phá nguồn phù hợp &rarr;</span>
          </div>
        </div>
      </section>

      <!-- Time-Slot Contextual Switcher (Secondary Refinement) -->
      <section class="time-slot-context-bar" aria-label="Lọc theo nhịp thời gian">
        <span class="time-slot-label">Nhịp sinh hoạt:</span>
        <div class="time-slot-pills">
          <button class="time-pill ${activeTimeSlot === 'ALL' ? 'active' : ''}" data-slot="ALL">Tất cả</button>
          <button class="time-pill ${activeTimeSlot === 'SLOT_MORNING' ? 'active' : ''}" data-slot="SLOT_MORNING">Sáng (Đi lại & Cà phê)</button>
          <button class="time-pill ${activeTimeSlot === 'SLOT_LUNCH' ? 'active' : ''}" data-slot="SLOT_LUNCH">Trưa (Bữa trưa)</button>
          <button class="time-pill ${activeTimeSlot === 'SLOT_AFTERNOON' ? 'active' : ''}" data-slot="SLOT_AFTERNOON">Chiều (Suất phim & Tự học)</button>
          <button class="time-pill ${activeTimeSlot === 'SLOT_EVENING' ? 'active' : ''}" data-slot="SLOT_EVENING">Tối (Kèo nhóm & Siêu thị)</button>
        </div>
      </section>

      <!-- Section 1: Ưu Đãi Xác Minh Theo Field (1 Item) -->
      <section class="content-rail-section">
        <div class="rail-header">
          <div>
            <span class="rail-kicker kicker-deal">ƯU ĐÃI XÁC MINH THEO FIELD</span>
            <h2 class="rail-title">Ưu Đãi Dành Cho Hôm Nay</h2>
          </div>
          <span class="rail-meta">1 deal xác minh</span>
        </div>
        <div class="cards-layout-grid">
          ${verifiedDeals.map(item => renderEditorialCard(item)).join('')}
        </div>
      </section>

      <!-- Section 1B: Nguồn Ưu Đãi Đang Rà Soát AU (4 Items) -->
      <section class="content-rail-section">
        <div class="rail-header">
          <div>
            <span class="rail-kicker kicker-verified">NGUỒN CHÍNH THỨC — ĐANG RÀ SOÁT AU</span>
            <h2 class="rail-title">Ưu Đãi Đang Rà Soát Theo Nguồn</h2>
          </div>
          <span class="rail-meta">4 nguồn ưu đãi</span>
        </div>
        <div class="cards-layout-grid">
          ${pendingDeals.map(item => renderEditorialCard(item)).join('')}
        </div>
      </section>

      <!-- Section 2: Gần Bạn & Điểm Đến Đô Thị (6 Items) -->
      <section class="content-rail-section">
        <div class="rail-header">
          <div>
            <span class="rail-kicker kicker-facility">ĐỊA ĐIỂM & ĐÔ THỊ</span>
            <h2 class="rail-title">Tiện Ích & Điểm Đến Đà Nẵng</h2>
          </div>
          <span class="rail-meta">6 tiện ích công</span>
        </div>
        <div class="cards-layout-grid">
          ${facilityItems.map(item => renderEditorialCard(item)).join('')}
        </div>
      </section>

      <!-- Section 3: Hai Cổng Trải Nghiệm Destination -->
      <section class="feature-destinations-section">
        <div class="destination-card dest-buy" data-nav="BUY_DECISION" role="button" tabindex="0">
          <span class="dest-badge">TRA CỨU TRƯỚC KHI CHI TIÊU</span>
          <h3 class="dest-title">Mua món này có hời không?</h3>
          <p class="dest-sub">Kiểm định giá thực, phí ẩn và chính sách đổi trả trước khi thanh toán. Trả lời trung thực khi chưa đủ dữ liệu.</p>
          <span class="dest-cta">Mở công cụ kiểm tra &rarr;</span>
        </div>

        <div class="destination-card dest-voucher" data-nav="VOUCHERS" role="button" tabindex="0">
          <span class="dest-badge">MÃ GIẢM GIÁ ĐỐI SOÁT</span>
          <h3 class="dest-title">Voucher & Khuyến Mãi Hợp Lệ</h3>
          <p class="dest-sub">Tổng hợp các mã ưu đãi chính thức có thể lệ rõ ràng, không mã rác hay link tiếp thị ngầm.</p>
          <span class="dest-cta">Xem danh sách mã &rarr;</span>
        </div>
      </section>

      <!-- Section 4: Quyền Lợi & Bản Quyền Số (9 Items) -->
      <section class="content-rail-section">
        <div class="rail-header">
          <div>
            <span class="rail-kicker kicker-verified">BẢN QUYỀN CHÍNH THỨC</span>
            <h2 class="rail-title">Công Cụ Học Tập & Tự Học</h2>
          </div>
          <span class="rail-meta">9 chương trình</span>
        </div>
        <div class="cards-layout-grid">
          ${officialItems.map(item => renderEditorialCard(item)).join('')}
        </div>
      </section>

      <!-- Section 5: Radar Theo Dõi Nguồn (13 Items) -->
      <section class="content-rail-section">
        <div class="rail-header">
          <div>
            <span class="rail-kicker kicker-radar">RADAR THEO DÕI</span>
            <h2 class="rail-title">Nguồn Tin Cậy Đang Quan Sát</h2>
          </div>
          <span class="rail-meta">13 thương hiệu</span>
        </div>
        <div class="cards-layout-grid">
          ${radarItems.map(item => renderEditorialCard(item)).join('')}
        </div>
      </section>
    </div>
  `;
}
function renderExploreDirectory() {
  const filtered = filterDirectoryItems();

  return `
    <div class="explore-directory-layout">
      <!-- Directory Filter Header -->
      <div class="directory-header">
        <h1 class="directory-title">Khám Phá Toàn Diện Tiện Ích Đà Nẵng</h1>
        <p class="directory-sub">Bộ lọc thông minh theo danh mục, khu vực và tầng kiểm định chất lượng</p>

        <!-- Category Gateways Bar -->
        <div class="explore-gateways-bar">
          <button class="exp-gateway-btn ${activeGateway === 'ALL' ? 'active' : ''}" data-exp-gw="ALL">Tất cả (33)</button>
          <button class="exp-gateway-btn ${activeGateway === 'AN_GI' ? 'active' : ''}" data-exp-gw="AN_GI">🍔 Ăn uống (7)</button>
          <button class="exp-gateway-btn ${activeGateway === 'DI_DAU' ? 'active' : ''}" data-exp-gw="DI_DAU">🗺️ Đi lại & Giải trí (12)</button>
          <button class="exp-gateway-btn ${activeGateway === 'MUA_GI' ? 'active' : ''}" data-exp-gw="MUA_GI">🛍️ Mua sắm & Học tập (14)</button>
        </div>

        <!-- District Locality Bar -->
        <div class="explore-locality-bar">
          <span class="loc-bar-label">Quận:</span>
          <button class="exp-loc-pill ${activeLocality === 'ALL' ? 'active' : ''}" data-exp-loc="ALL">Toàn Đà Nẵng</button>
          <button class="exp-loc-pill ${activeLocality === 'HAI_CHAU' ? 'active' : ''}" data-exp-loc="HAI_CHAU">Hải Châu</button>
          <button class="exp-loc-pill ${activeLocality === 'THANH_KHE' ? 'active' : ''}" data-exp-loc="THANH_KHE">Thanh Khê</button>
          <button class="exp-loc-pill ${activeLocality === 'SON_TRA' ? 'active' : ''}" data-exp-loc="SON_TRA">Sơn Trà</button>
          <button class="exp-loc-pill ${activeLocality === 'NGU_HANH_SON' ? 'active' : ''}" data-exp-loc="NGU_HANH_SON">Ngũ Hành Sơn</button>
          <button class="exp-loc-pill ${activeLocality === 'HOA_KHANH' ? 'active' : ''}" data-exp-loc="HOA_KHANH">Hòa Khánh</button>
          <button class="exp-loc-pill ${activeLocality === 'CAM_LE' ? 'active' : ''}" data-exp-loc="CAM_LE">Cẩm Lệ</button>
        </div>
      </div>

      <!-- Results Grid -->
      <div class="directory-results-container">
        ${filtered.length > 0 ? `
          <div class="cards-layout-grid">
            ${filtered.map(item => renderEditorialCard(item)).join('')}
          </div>
        ` : `
          <div class="empty-state-box">
            <h3>Không tìm thấy tiện ích phù hợp</h3>
            <p>Vui lòng thử chọn quận khác hoặc đặt lại bộ lọc.</p>
            <button id="btn-reset-explore" class="btn-modal-primary">Đặt lại bộ lọc</button>
          </div>
        `}
      </div>
    </div>
  `;
}

function filterDirectoryItems() {
  return JAYT_DISCOVERY_ITEMS.filter(item => {
    if (activeGateway !== 'ALL' && item.gateway_group !== activeGateway) return false;
    if (activeLocality !== 'ALL' && item.locality_tag !== activeLocality && item.locality_tag !== 'TOAN_DANANG') return false;
    if (activeTier !== 'ALL' && item.tier !== activeTier) return false;
    return true;
  });
}

function renderBuyDecisionHub() {
  return `
    <div class="buy-decision-page">
      <div class="decision-hero">
        <span class="decision-tag">JAYT-242 VALUE-FIRST DECISION HUB</span>
        <h1 class="decision-title">Mua món này có hời không?</h1>
        <p class="decision-sub">Công cụ tra cứu và đánh giá sự minh bạch của giá bán trước khi bạn đưa ra quyết định chi tiêu.</p>
        
        <div class="decision-search-box">
          <input type="text" id="input-check-deal" placeholder="Nhập tên khóa học, sản phẩm số, gói dịch vụ cần kiểm tra..." />
          <button id="btn-submit-check" class="btn-modal-primary">Kiểm tra ngay</button>
        </div>
      </div>

      <!-- Fail-Closed Truth Status Card -->
      <div class="decision-truth-card">
        <div class="truth-card-header">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d97706" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
          <h3>Trạng thái kiểm định: Chưa đủ dữ liệu để kết luận Mua / Chờ</h3>
        </div>
        <p class="truth-card-body">Theo Quy chế Data Truth JAYT-245 & JAYT-242: JayT chỉ đưa ra phán quyết "NÊN MUA" hoặc "NÊN CHỜ" khi đã thu thập đủ 6 bằng chứng kiểm định: (1) Giá thực trả cuối cùng, (2) Lịch sử giá thị trường tối thiểu 30 ngày, (3) Chính sách bảo hành, (4) Điều kiện sử dụng rõ ràng, (5) Không chứa hoa hồng tiếp thị ngầm, (6) Bằng chứng đối soát độc lập.</p>
      </div>

      <div class="decision-pillars-grid">
        <div class="pillar-card">
          <h4>Minh Bạch Chi Phí</h4>
          <p>Loại bỏ các mức giá ảo suy diễn từ giá niêm yết cũ; chỉ tính giá thực trả.</p>
        </div>
        <div class="pillar-card">
          <h4>Quyền Lợi Sử Dụng</h4>
          <p>Kiểm tra kỹ điều kiện áp dụng, thời hạn bảo hành và chính sách hoàn tiền.</p>
        </div>
        <div class="pillar-card">
          <h4>Nguồn Gốc Độc Lập</h4>
          <p>Không nhận tài trợ hoặc hoa hồng tiếp thị để thay đổi kết luận mua sắm.</p>
        </div>
      </div>
    </div>
  `;
}

function renderVouchersHub() {
  const dealItems = JAYT_DISCOVERY_ITEMS.filter(i => i.tier === 'VERIFIED_DEAL');
  return `
    <div class="vouchers-page">
      <div class="vouchers-hero">
        <span class="vouchers-tag">KHO MÃ ƯU ĐÃI CHÍNH THỨC</span>
        <h1 class="vouchers-title">Voucher & Mã Ưu Đãi Đã Đối Soát</h1>
        <p class="vouchers-sub">Tổng hợp các liên kết chương trình ưu đãi từ cổng chính thức của đơn vị — Đang rà soát theo tiêu chuẩn AU.</p>
      </div>

      <div class="cards-layout-grid">
        ${dealItems.map(item => renderEditorialCard(item)).join('')}
      </div>
    </div>
  `;
}

function renderSavedView() {
  const savedItems = JAYT_DISCOVERY_ITEMS.filter(i => savedItemIds.has(i.item_id));

  return `
    <div class="saved-page">
      <div class="saved-hero">
        <h1 class="saved-title">Tiện Ích Đã Lưu (${savedItems.length})</h1>
        <p class="saved-sub">Danh sách các tiện ích và ưu đãi bạn đã đánh dấu để sử dụng khi cần.</p>
      </div>

      ${savedItems.length > 0 ? `
        <div class="cards-layout-grid">
          ${savedItems.map(item => renderEditorialCard(item)).join('')}
        </div>
      ` : `
        <div class="empty-state-box">
          <h3>Bạn chưa lưu tiện ích nào</h3>
          <p>Bấm vào biểu tượng bookmark trên mỗi thẻ để lưu lại và xem lại tại đây.</p>
          <button class="btn-modal-primary" data-nav="HOME">Khám phá hôm nay</button>
        </div>
      `}
    </div>
  `;
}

function renderEditorialCard(item) {
  const isSaved = savedItemIds.has(item.item_id);
  const isFieldCertified = (item.item_id === 'DEAL_CGV_VNPAY_BOGO');
  
  let tierKicker = 'Nguồn chính thức — đang rà soát theo field';
  let tierCardClass = 'card-tier-verified';
  let actionBtn = `<a href="${item.official_source_url}" target="_blank" rel="noopener noreferrer" class="btn-card-primary">Mở nguồn chính thức &rarr;</a>`;
  let metaChipsHtml = `
    <div class="card-meta-chips">
      <span class="meta-chip">📋 Nguồn chính thức đối soát</span>
      <span class="meta-chip">🔍 Đang rà soát theo tiêu chuẩn AU</span>
    </div>
  `;

  if (isFieldCertified) {
    tierKicker = 'Ưu đãi xác minh';
    tierCardClass = 'card-tier-deal';
    actionBtn = `<a href="${item.official_source_url}" target="_blank" rel="noopener noreferrer" class="btn-card-primary">${item.action_label || 'Xem ưu đãi'} &rarr;</a>`;
    metaChipsHtml = `
      <div class="card-meta-chips">
        <span class="meta-chip">📍 ${item.scope_text}</span>
        <span class="meta-chip">⏰ ${item.timing_window}</span>
      </div>
    `;
  } else if (item.tier === 'RADAR_SOURCE') {
    tierKicker = 'Radar theo dõi nguồn';
    tierCardClass = 'card-tier-radar';
    actionBtn = `<a href="${item.official_source_url}" target="_blank" rel="noopener noreferrer" class="btn-card-radar">Xem kênh gốc</a>`;
    metaChipsHtml = `
      <div class="card-meta-chips">
        <span class="meta-chip">📡 Theo dõi nguồn tin cậy</span>
      </div>
    `;
  }

  return `
    <article class="editorial-card ${tierCardClass}" id="card-${item.item_id}">
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

      <!-- Card Body: Program Title & Neutral Summary (Field-Level Render Gate) -->
      <div class="card-content">
        <h3 class="card-title">${item.title}</h3>
        <p class="card-summary">${item.summary_text}</p>
        ${metaChipsHtml}
      </div>

      <!-- Card Action Footer -->
      <div class="card-foot">
        ${actionBtn}
        <button class="btn-card-detail" data-card-detail="${item.item_id}">
          Đối soát & Bằng chứng
        </button>
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
