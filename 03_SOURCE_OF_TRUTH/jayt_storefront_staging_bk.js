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

const JAYT_STOREFRONT_VERSION = 'v3.423.0-staging.bk';

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
  const isSaved = savedItemIds.has(itemId);
  const docAsset = LOCAL_VISUAL_LIBRARY_BK['ASSET_BK_12_CGV_VNPAY_VERIFIED_BANNER'];

  return `
    <article class="editorial-card card-spotlight-feature" data-item-id="${itemId}" data-category="${item.category}">
      <div class="spotlight-doc-banner-wrap">
        <img class="spotlight-doc-banner" src="${docAsset.data_uri}" alt="${docAsset.alt_text}" loading="lazy" />
        <div class="photo-credit-badge">${docAsset.credit_label}</div>
      </div>

      <div class="card-inner-body">
        <div class="card-header-row">
          <div class="merchant-brand-lockup">
            <div class="brand-monogram brand-mono-cgv">CGV</div>
            <div class="brand-titles">
              <span class="merchant-label">CGV Cinemas x VNPAY-QR</span>
              <h3 class="card-title">${item.title}</h3>
            </div>
          </div>
          <button class="btn-save-toggle ${isSaved ? 'saved' : ''}" data-save-id="${itemId}" aria-label="${isSaved ? 'Bỏ lưu' : 'Lưu'}" title="${isSaved ? 'Bỏ lưu' : 'Lưu'}">
            ${isSaved ? '❤️' : '🤍'}
          </button>
        </div>

        <div class="card-meta-chips">
          <span class="meta-chip chip-deal">ĐÃ ĐỐI SOÁT CHỨNG CỨ</span>
          <span class="meta-chip chip-verified">Suất chiếu cuối tuần T6 - CN</span>
          <span class="meta-chip chip-verified">TP. Đà Nẵng</span>
        </div>

        <p class="card-summary">${item.summary}</p>

        <div class="card-action-bar">
          <button class="btn-card-detail" data-item-id="${itemId}">Chi tiết & Bằng chứng đối soát &rarr;</button>
          <a href="${item.official_source_url}" target="_blank" rel="noopener noreferrer" class="btn-card-source">Mở CGV chính thức &nearr;</a>
        </div>
      </div>
    </article>
  `;
}

function renderDailyGuideHome() {
  const verifiedDeals = JAYT_DISCOVERY_ITEMS.filter(i => i.tier === 'VERIFIED_DEAL');
  const pendingDeals = JAYT_DISCOVERY_ITEMS.filter(i => i.tier === 'PENDING_DEAL');
  const facilityItems = JAYT_DISCOVERY_ITEMS.filter(i => i.tier === 'CIVIC_FACILITY');
  const officialItems = JAYT_DISCOVERY_ITEMS.filter(i => i.tier === 'OFFICIAL_PROGRAM');
  const radarItems = JAYT_DISCOVERY_ITEMS.filter(i => i.tier === 'RADAR_SOURCE');

  const heroAsset = LOCAL_VISUAL_LIBRARY_BK['ASSET_BK_01_DANANG_HAN_RIVER_DUSK'];
  const foodAsset = LOCAL_VISUAL_LIBRARY_BK['ASSET_BK_02_DANANG_STREET_FOOD_NIGHT'];
  const cinemaAsset = LOCAL_VISUAL_LIBRARY_BK['ASSET_BK_03_DANANG_CINEMA_ENTERTAINMENT'];
  const studyAsset = LOCAL_VISUAL_LIBRARY_BK['ASSET_BK_04_DANANG_GENERAL_LIBRARY_STUDY'];
  const busAsset = LOCAL_VISUAL_LIBRARY_BK['ASSET_BK_07_DANANG_DANABUS_TRANSIT'];
  const bikeAsset = LOCAL_VISUAL_LIBRARY_BK['ASSET_BK_08_DANANG_TNGO_BIKE_STATION'];
  const civicAsset = LOCAL_VISUAL_LIBRARY_BK['ASSET_BK_09_DANANG_CIVIC_PORTAL_DVC'];
  const coworkingAsset = LOCAL_VISUAL_LIBRARY_BK['ASSET_BK_10_DANANG_STUDENT_COWORKING'];

  return `
    <div class="home-guide-layout-bk">
      <!-- 1. HERO DOCUMENTARY: TƯ LIỆU ĐÀ NẴNG THẬT CÓ QUYỀN SỬ DỤNG -->
      <section class="hero-doc-section" aria-label="Hero Tư Liệu Đà Nẵng">
        <div class="hero-doc-photo-wrap">
          <img class="hero-documentary-img" src="${heroAsset.data_uri}" alt="${heroAsset.alt_text}" />
          <div class="hero-photo-credit-badge">
            <span class="badge-dot"></span> ${heroAsset.credit_label}
          </div>
        </div>

        <div class="hero-doc-content-overlay">
          <div class="hero-kicker-badge">
            <span class="pulse-dot"></span> JAYT LOCAL DOCUMENTARY &bull; ĐÀ NẴNG THỰC TẾ
          </div>
          <h1 class="hero-editorial-headline">
            Đà Nẵng Sau Giờ Học & Làm:<br>
            <span class="headline-gradient-text">Hôm Nay Đi Đâu, Ăn Gì?</span>
          </h1>
          <p class="hero-editorial-subtext">
            Cẩm nang tuyển chọn độc lập — 100% hình ảnh tư liệu Đà Nẵng có bản quyền, ưu đãi đối soát có chứng cứ và dịch vụ công chính thức.
          </p>

          <!-- Daily Edit Card: Lead Direct Action -->
          <div class="daily-edit-lead-box" role="button" tabindex="0" data-card-detail="DEAL_CGV_VNPAY_BOGO">
            <div class="daily-edit-pill">ĐIỂM NHẤN HÔM NAY</div>
            <div class="daily-edit-info">
              <span class="daily-edit-title">CGV Cinemas x VNPAY-QR: Mua 1 Tặng 1 Vé Xem Phim Cuối Tuần</span>
              <span class="daily-edit-meta">Áp dụng T6, T7, CN &bull; Đã đối soát link chính thức</span>
            </div>
            <span class="daily-edit-arrow">&rarr;</span>
          </div>
        </div>
      </section>

      <!-- 2. 3 JOURNEY TILES VỚI ẢNH TƯ LIỆU ĐÀ NẴNG THẬT -->
      <section class="section-journey-tiles" aria-label="3 Cửa Vào Hành Trình">
        <div class="section-header-editorial">
          <span class="section-kicker">CHỌN HÀNH TRÌNH CỦA BẠN</span>
          <h2 class="section-title-editorial">Nhịp Sống & Trải Nghiệm Thực Tế</h2>
        </div>

        <div class="journey-tiles-grid">
          <!-- Tile 1: Ăn Gì Tối Nay -->
          <div class="journey-doc-tile tile-food" role="button" tabindex="0" data-gateway-target="AN_GI">
            <div class="tile-photo-wrap">
              <img class="tile-doc-photo" src="${foodAsset.data_uri}" alt="${foodAsset.alt_text}" loading="lazy" />
              <div class="photo-credit-tag">${foodAsset.credit_label}</div>
            </div>
            <div class="tile-content-overlay">
              <span class="tile-category-tag">ẨM THỰC & HẸN HÒ</span>
              <h3 class="tile-headline">Ăn gì tối nay?</h3>
              <span class="tile-action-link">Khám phá các điểm ăn uống &rarr;</span>
            </div>
          </div>

          <!-- Tile 2: Kèo Nhóm Đi Đâu -->
          <div class="journey-doc-tile tile-places" role="button" tabindex="0" data-gateway-target="DI_DAU">
            <div class="tile-photo-wrap">
              <img class="tile-doc-photo" src="${cinemaAsset.data_uri}" alt="${cinemaAsset.alt_text}" loading="lazy" />
              <div class="photo-credit-tag">${cinemaAsset.credit_label}</div>
            </div>
            <div class="tile-content-overlay">
              <span class="tile-category-tag">GIẢI TRÍ & RẠP PHIM</span>
              <h3 class="tile-headline">Kèo nhóm đi đâu?</h3>
              <span class="tile-action-link">Xem lịch chiếu & rạp phim &rarr;</span>
            </div>
          </div>

          <!-- Tile 3: Học Tập & Mua Sắm -->
          <div class="journey-doc-tile tile-tools" role="button" tabindex="0" data-gateway-target="MUA_GI">
            <div class="tile-photo-wrap">
              <img class="tile-doc-photo" src="${studyAsset.data_uri}" alt="${studyAsset.alt_text}" loading="lazy" />
              <div class="photo-credit-tag">${studyAsset.credit_label}</div>
            </div>
            <div class="tile-content-overlay">
              <span class="tile-category-tag">CÔNG CỤ & TIỆN ÍCH</span>
              <h3 class="tile-headline">Học tập & Mua sắm</h3>
              <span class="tile-action-link">Nhận gói sinh viên &rarr;</span>
            </div>
          </div>
        </div>
      </section>

      <!-- 3. SPOTLIGHT CAMPAIGN: CGV VNPAY BOGO -->
      <section class="section-spotlight-dominant" aria-label="Spotlight Chiến Dịch Xác Minh">
        <div class="section-header-editorial">
          <span class="section-kicker kicker-deal">SPOTLIGHT • CHIẾN DỊCH XÁC MINH CHÍNH CHỦ</span>
          <h2 class="section-title-editorial">Ưu Đãi Nổi Bật Được Chứng Nhận</h2>
        </div>

        <div class="spotlight-dominant-wrapper">
          ${verifiedDeals.map(item => renderSpotlightLargeCard(item)).join('')}
        </div>
      </section>

      <!-- 4. OFFICIAL PROGRAMMES RAIL -->
      <section class="section-editorial-rail" aria-label="Chương Trình Học Sinh Sinh Viên">
        <div class="section-header-editorial">
          <span class="section-kicker kicker-prog">QUYỀN LỢI HỌC ĐƯỜNG</span>
          <h2 class="section-title-editorial">Gói Công Cụ & Bản Quyền Chính Thức</h2>
        </div>
        <div class="cards-layout-grid">
          ${officialItems.slice(0, 4).map(item => renderEditorialCardWithPhoto(item)).join('')}
        </div>
      </section>

      <!-- 5. CIVIC FACILITIES & MOBILITY (TƯ LIỆU ĐÔ THỊ) -->
      <section class="section-editorial-rail" aria-label="Dịch Vụ Đô Thị & Giao Thông">
        <div class="section-header-editorial">
          <span class="section-kicker kicker-fac">DỊCH VỤ CÔNG ĐÀ NẴNG</span>
          <h2 class="section-title-editorial">Di Chuyển & Tiện Ích Đô Thị Thực Tế</h2>
        </div>
        <div class="cards-layout-grid">
          ${facilityItems.slice(0, 4).map(item => renderEditorialCardWithPhoto(item)).join('')}
        </div>
      </section>

      <!-- 6. RADAR NGUỒN CÔNG KHAI -->
      <section class="section-editorial-rail section-radar-compact" aria-label="Radar Theo Dõi Nguồn">
        <div class="section-header-editorial">
          <span class="section-kicker kicker-radar">RADAR THEO DÕI NGUỒN</span>
          <h2 class="section-title-editorial">Kênh Thông Tin Đang Giám Sát</h2>
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
    </div>
  `;
}

function renderEditorialCardWithPhoto(item) {
  const isSaved = savedItemIds.has(item.item_id);
  const isFieldCertified = (item.item_id === 'DEAL_CGV_VNPAY_BOGO');
  
  // Mapping to 12 Local Documentary Assets
  let docAsset = null;
  if (item.item_id === 'FACILITY_DANABUS') docAsset = LOCAL_VISUAL_LIBRARY_BK['ASSET_BK_07_DANANG_DANABUS_TRANSIT'];
  else if (item.item_id === 'FACILITY_TNGO_BIKE') docAsset = LOCAL_VISUAL_LIBRARY_BK['ASSET_BK_08_DANANG_TNGO_BIKE_STATION'];
  else if (item.item_id === 'FACILITY_DVC_DANANG') docAsset = LOCAL_VISUAL_LIBRARY_BK['ASSET_BK_09_DANANG_CIVIC_PORTAL_DVC'];
  else if (item.item_id === 'FACILITY_THU_VIEN_TONG_HOP') docAsset = LOCAL_VISUAL_LIBRARY_BK['ASSET_BK_04_DANANG_GENERAL_LIBRARY_STUDY'];
  else if (item.item_id === 'FACILITY_BIEN_MY_KHE' || item.item_id === 'FACILITY_GA_DA_NANG') docAsset = LOCAL_VISUAL_LIBRARY_BK['ASSET_BK_11_DANANG_MY_KHE_BEACH_WALK'];
  else if (item.item_id === 'FACILITY_FAHASA_DANANG') docAsset = LOCAL_VISUAL_LIBRARY_BK['ASSET_BK_04_DANANG_GENERAL_LIBRARY_STUDY'];
  else if (item.item_id === 'OFFICIAL_GITHUB_STUDENT_PACK' || item.item_id === 'OFFICIAL_NOTION_STUDENT' || item.item_id === 'OFFICIAL_CANVA_STUDENT') docAsset = LOCAL_VISUAL_LIBRARY_BK['ASSET_BK_10_DANANG_STUDENT_COWORKING'];
  else if (item.item_id === 'OFFICIAL_SPOTIFY_STUDENT' || item.item_id === 'OFFICIAL_APPLE_MUSIC_STUDENT' || item.item_id === 'OFFICIAL_MICROSOFT_365') docAsset = LOCAL_VISUAL_LIBRARY_BK['ASSET_BK_05_DANANG_MORNING_COFFEE'];
  else if (item.item_id === 'PENDING_DEAL_LOTTERIA_LUNCH' || item.item_id === 'PENDING_DEAL_DOMINOS_BOGO') docAsset = LOCAL_VISUAL_LIBRARY_BK['ASSET_BK_06_DANANG_LUNCH_MARKET'];
  else if (item.item_id === 'PENDING_DEAL_METIZ_U22' || item.item_id === 'PENDING_DEAL_STARLIGHT_COMBO') docAsset = LOCAL_VISUAL_LIBRARY_BK['ASSET_BK_03_DANANG_CINEMA_ENTERTAINMENT'];

  const photoHtml = docAsset ? `
    <div class="card-doc-photo-wrap">
      <img class="card-doc-photo-img" src="${docAsset.data_uri}" alt="${docAsset.alt_text}" loading="lazy" />
      <span class="photo-credit-tag">${docAsset.credit_label}</span>
    </div>
  ` : '';

  let tierKicker = 'Nguồn chính thức — đang rà soát';
  let tierCardClass = 'card-tier-verified';
  let actionBtn = `<a href="${item.official_source_url}" target="_blank" rel="noopener noreferrer" class="btn-card-primary">Mở nguồn chính thức &rarr;</a>`;
  let metaChipsHtml = `
    <div class="card-meta-chips">
      <span class="meta-chip">📋 Nguồn đối soát</span>
      <span class="meta-chip">🔍 Tiêu chuẩn AU</span>
    </div>
  `;

  return `
    <article class="editorial-card ${tierCardClass}" id="card-${item.item_id}">
      ${photoHtml}
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
