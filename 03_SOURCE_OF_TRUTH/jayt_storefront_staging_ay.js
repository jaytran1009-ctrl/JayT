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

const JAYT_STOREFRONT_VERSION = 'v3.422.0-staging.ay';

const JAYT_DISCOVERY_ITEMS = [
  {
    "item_id": "DEAL_LOTTERIA_HAPPY_LUNCH",
    "tier": "VERIFIED_DEAL",
    "tier_name": "Ưu Đãi Xác Minh",
    "badge_label": "ƯU ĐÃI XÁC MINH",
    "title": "Lotteria Happy Lunch — Cơm Gà Sốt Đậu / Burger 40.000₫",
    "brand": "Lotteria Vietnam",
    "monogram": "LT",
    "color_accent": "#dc2626",
    "category": "Ăn uống",
    "scope_text": "Đà Nẵng: Nguyễn Thị Minh Khai, Lotte Mart, Big C",
    "audience_target": "Học sinh, sinh viên, nhân viên văn phòng",
    "timing_window": "10:00 – 14:00 các ngày Thứ 2 đến Thứ 6",
    "conditions_limit": "Áp dụng ăn tại quán & mua mang về trong khung giờ trưa",
    "observed_at": "2026-08-29 01:00",
    "summary_text": "Giá niêm yết Happy Lunch từ 40.000₫ – 45.000₫ gồm món chính và nước uống trong khung giờ trưa.",
    "verbatim_quote": "Lotteria Happy Lunch - Thực đơn trưa áp dụng 10h-14h Thứ 2 đến Thứ 6.",
    "evidence_status": "Đã đối soát menu niêm yết tại www.lotteria.vn/menu/happy-lunch",
    "official_source_url": "https://www.lotteria.vn/menu/happy-lunch",
    "action_type": "PRIMARY_LINK",
    "action_label": "Xem thực đơn trưa",
    "gateway_group": "AN_GI",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "SLOT_LUNCH"
  },
  {
    "item_id": "DEAL_DOMINOS_BOGO",
    "tier": "VERIFIED_DEAL",
    "tier_name": "Ưu Đãi Xác Minh",
    "badge_label": "ƯU ĐÃI XÁC MINH",
    "title": "Domino's Pizza — Mua 1 Tặng 1 Thứ 3 & Thứ 5 Hàng Tuần",
    "brand": "Domino's Pizza",
    "monogram": "DP",
    "color_accent": "#0284c7",
    "category": "Ăn uống",
    "scope_text": "Đà Nẵng: 405 Điện Biên Phủ & Nguyễn Tri Phương",
    "audience_target": "Khách hàng cá nhân và nhóm bạn/gia đình",
    "timing_window": "Cả ngày Thứ 3 và Thứ 5 hàng tuần",
    "conditions_limit": "Mua 1 Pizza cỡ M/L kèm nước uống, tặng 1 Pizza cùng cỡ",
    "observed_at": "2026-08-29 01:00",
    "summary_text": "Ưu đãi định kỳ hàng tuần Mua 1 Pizza cỡ M hoặc L được tặng 1 Pizza cùng cỡ khi đặt hàng.",
    "verbatim_quote": "Domino's Pizza - Mua 1 Tặng 1 Thứ 3 & Thứ 5 hàng tuần.",
    "evidence_status": "Đã đối soát thể lệ tại dominos.vn/khuyen-mai/mua-1-tang-1",
    "official_source_url": "https://dominos.vn/khuyen-mai/mua-1-tang-1",
    "action_type": "PRIMARY_LINK",
    "action_label": "Xem chi tiết ưu đãi",
    "gateway_group": "AN_GI",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "ALL_DAY"
  },
  {
    "item_id": "DEAL_METIZ_U22",
    "tier": "VERIFIED_DEAL",
    "tier_name": "Ưu Đãi Xác Minh",
    "badge_label": "ƯU ĐÃI XÁC MINH",
    "title": "Metiz Cinema — Vé U22 & Học Sinh Sinh Viên 45.000₫",
    "brand": "Metiz Cinema",
    "monogram": "MZ",
    "color_accent": "#0d9488",
    "category": "Giải trí",
    "scope_text": "Đà Nẵng: Tầng 1 Helio Center, Đường 2 Tháng 9",
    "audience_target": "Khán giả dưới 22 tuổi hoặc có thẻ HSSV hợp lệ",
    "timing_window": "Thứ 2 đến Thứ 6 (trước 18:00 và sau 20:00)",
    "conditions_limit": "Xuất trình CCCD dưới 22 tuổi hoặc thẻ Học sinh - Sinh viên tại quầy vé",
    "observed_at": "2026-08-29 01:00",
    "summary_text": "Giá vé ưu đãi 45.000₫/vé 2D tiêu chuẩn cho đối tượng học sinh, sinh viên và thành viên U22.",
    "verbatim_quote": "Chính sách giá vé U22 Metiz Cinema Đà Nẵng: 45.000đ/vé.",
    "evidence_status": "Đã đối soát bảng giá vé tại metiz.vn/tin-tuc/khuyen-mai/gia-ve-u22-metiz/",
    "official_source_url": "https://metiz.vn/tin-tuc/khuyen-mai/gia-ve-u22-metiz/",
    "action_type": "PRIMARY_LINK",
    "action_label": "Xem bảng giá vé",
    "gateway_group": "DI_DAU",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "SLOT_EVENING"
  },
  {
    "item_id": "DEAL_STARLIGHT_COMBO_10K",
    "tier": "VERIFIED_DEAL",
    "tier_name": "Ưu Đãi Xác Minh",
    "badge_label": "ƯU ĐÃI XÁC MINH",
    "title": "Starlight Cinema — Combo Bắp Nước 10.000₫ Suất Chiều",
    "brand": "Starlight Cinema",
    "monogram": "SL",
    "color_accent": "#e11d48",
    "category": "Giải trí",
    "scope_text": "Đà Nẵng: Tầng 4 Nguyễn Kim, 46 Điện Biên Phủ",
    "audience_target": "Khán giả xem phim suất chiếu buổi chiều",
    "timing_window": "Khung giờ chiều từ 13:30 đến 17:00 các ngày trong tuần",
    "conditions_limit": "Áp dụng mua kèm khi có vé xem phim suất chiều tại quầy",
    "observed_at": "2026-08-29 01:00",
    "summary_text": "Ưu đãi mua kèm bắp nước với giá 10.000₫ dành cho khách hàng xem phim suất chiếu buổi chiều.",
    "verbatim_quote": "Starlight Cinema - Ưu đãi bắp nước 10k suất chiều.",
    "evidence_status": "Đã đối soát thể lệ chương trình tại starlight.vn/khuyen-mai/combo-bap-nuoc-10k.html",
    "official_source_url": "https://starlight.vn/khuyen-mai/combo-bap-nuoc-10k.html",
    "action_type": "PRIMARY_LINK",
    "action_label": "Xem thể lệ ưu đãi",
    "gateway_group": "DI_DAU",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "SLOT_AFTERNOON"
  },
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
    "time_slot_tag": "ALL_DAY"
  },
  {
    "item_id": "TGT_B_01",
    "tier": "VERIFIED_OFFICIAL_PROGRAM",
    "tier_name": "Chương Trình Chính Thức",
    "badge_label": "NGUỒN CHÍNH THỨC",
    "title": "GitHub Student Developer Pack",
    "brand": "GitHub",
    "monogram": "GH",
    "color_accent": "#24292f",
    "category": "Học tập",
    "scope_text": "Phạm vi: Toàn cầu (Xác thực trực tuyến)",
    "audience_target": "Học sinh, sinh viên từ 13 tuổi có email trường hoặc thẻ SV",
    "timing_window": "Duy trì trong suốt thời gian học tập chính khóa",
    "conditions_limit": "Xác thực qua tài liệu minh chứng học tập (Student ID / Email .edu)",
    "observed_at": "2026-08-29 01:00",
    "summary_text": "Gói công cụ lập trình, hạ tầng đám mây và bản quyền phần mềm hỗ trợ học tập thực hành.",
    "verbatim_quote": "GitHub Student Developer Pack - Learn to ship software like a pro.",
    "evidence_status": "Đã đối soát raw capture từ education.github.com (271.4 KB, SHA-256 khớp)",
    "official_source_url": "https://education.github.com/pack",
    "action_type": "PRIMARY_LINK",
    "action_label": "Mở cổng đăng ký",
    "gateway_group": "MUA_GI",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "ALL_DAY"
  },
  {
    "item_id": "TGT_B_02",
    "tier": "VERIFIED_OFFICIAL_PROGRAM",
    "tier_name": "Chương Trình Chính Thức",
    "badge_label": "NGUỒN CHÍNH THỨC",
    "title": "Notion for Education",
    "brand": "Notion",
    "monogram": "N",
    "color_accent": "#000000",
    "category": "Học tập",
    "scope_text": "Phạm vi: Toàn cầu (Xác thực trực tuyến)",
    "audience_target": "Học sinh, sinh viên và giảng viên các trường học",
    "timing_window": "Duy trì trong thời gian tài khoản email học tập còn hiệu lực",
    "conditions_limit": "Đăng ký bằng email có tên miền giáo dục hợp lệ",
    "observed_at": "2026-08-29 01:00",
    "summary_text": "Nâng cấp gói Plus cho không gian làm việc cá nhân phục vụ ghi chú và quản lý học tập.",
    "verbatim_quote": "Notion for Education - Gói Plus hỗ trợ học tập và giảng dạy.",
    "evidence_status": "Đã đối soát raw capture từ www.notion.com (188.5 KB, SHA-256 khớp)",
    "official_source_url": "https://www.notion.com/product/notion-for-education",
    "action_type": "PRIMARY_LINK",
    "action_label": "Mở cổng đăng ký",
    "gateway_group": "MUA_GI",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "ALL_DAY"
  },
  {
    "item_id": "TGT_B_03",
    "tier": "VERIFIED_OFFICIAL_PROGRAM",
    "tier_name": "Chương Trình Chính Thức",
    "badge_label": "NGUỒN CHÍNH THỨC",
    "title": "Microsoft Education (Office 365 A1)",
    "brand": "Microsoft",
    "monogram": "MS",
    "color_accent": "#00a4ef",
    "category": "Học tập",
    "scope_text": "Phạm vi: Toàn cầu (Theo tên miền trường)",
    "audience_target": "Học sinh, sinh viên và cán bộ giảng dạy tại các cơ sở đào tạo",
    "timing_window": "Áp dụng theo niên khóa đào tạo",
    "conditions_limit": "Trường học phải thuộc danh sách đối tác giáo dục của Microsoft",
    "observed_at": "2026-08-29 01:00",
    "summary_text": "Truy cập các ứng dụng văn phòng trực tuyến (Word, Excel, PowerPoint, Teams) phục vụ nghiên cứu.",
    "verbatim_quote": "Microsoft Education - Bắt đầu sử dụng Office 365 miễn phí cho trường học.",
    "evidence_status": "Đã đối soát raw capture từ www.microsoft.com (212.2 KB, SHA-256 khớp)",
    "official_source_url": "https://www.microsoft.com/vi-vn/education/products/office",
    "action_type": "PRIMARY_LINK",
    "action_label": "Kiểm tra điều kiện email",
    "gateway_group": "MUA_GI",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "ALL_DAY"
  },
  {
    "item_id": "TGT_B_04",
    "tier": "VERIFIED_OFFICIAL_PROGRAM",
    "tier_name": "Chương Trình Chính Thức",
    "badge_label": "NGUỒN CHÍNH THỨC",
    "title": "Canva for Education",
    "brand": "Canva",
    "monogram": "CV",
    "color_accent": "#00c4cc",
    "category": "Học tập",
    "scope_text": "Phạm vi: Toàn cầu (Theo tiêu chuẩn giáo dục)",
    "audience_target": "Giáo viên và học sinh từ bậc mầm non đến phổ thông trung học (K-12)",
    "timing_window": "Duy trì theo tài khoản lớp học được xác minh",
    "conditions_limit": "Giáo viên nộp bằng chứng chứng chỉ sư phạm hoặc giấy xác nhận công tác",
    "observed_at": "2026-08-29 01:00",
    "summary_text": "Mở rộng tính năng thiết kế đồ họa giáo dục, bài giảng trực quan và tài liệu lớp học.",
    "verbatim_quote": "Canva for Education - Công cụ sáng tạo cho giáo viên và học sinh.",
    "evidence_status": "Đã đối soát raw capture từ www.canva.com (327.9 KB, SHA-256 khớp)",
    "official_source_url": "https://www.canva.com/education",
    "action_type": "PRIMARY_LINK",
    "action_label": "Xem điều kiện xác thực",
    "gateway_group": "MUA_GI",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "ALL_DAY"
  },
  {
    "item_id": "TGT_B_05",
    "tier": "VERIFIED_OFFICIAL_PROGRAM",
    "tier_name": "Chương Trình Chính Thức",
    "badge_label": "NGUỒN CHÍNH THỨC",
    "title": "Spotify Student Premium (29.500₫/tháng)",
    "brand": "Spotify",
    "monogram": "SP",
    "color_accent": "#1db954",
    "category": "Học tập",
    "scope_text": "Phạm vi: Việt Nam (Xác thực qua SheerID)",
    "audience_target": "Sinh viên đang theo học tại các trường Đại học, Cao đẳng được công nhận",
    "timing_window": "Gia hạn tối đa 4 năm học tập (xác thực lại mỗi 12 tháng)",
    "conditions_limit": "Xác thực tình trạng sinh viên hợp lệ qua cổng SheerID",
    "observed_at": "2026-08-29 01:00",
    "summary_text": "Gói thuê bao âm nhạc Premium với mức phí ưu đãi 29.500₫/tháng dành cho sinh viên.",
    "verbatim_quote": "Spotify Premium Student - Giá 29.500đ/tháng cho sinh viên hợp lệ.",
    "evidence_status": "Đã đối soát raw capture từ www.spotify.com (76.6 KB, SHA-256 khớp)",
    "official_source_url": "https://www.spotify.com/vn-vi/student",
    "action_type": "PRIMARY_LINK",
    "action_label": "Xem cổng xác thực",
    "gateway_group": "MUA_GI",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "SLOT_EVENING"
  },
  {
    "item_id": "TGT_B_06",
    "tier": "VERIFIED_OFFICIAL_PROGRAM",
    "tier_name": "Chương Trình Chính Thức",
    "badge_label": "NGUỒN CHÍNH THỨC",
    "title": "Apple Music Student (35.000₫/tháng)",
    "brand": "Apple",
    "monogram": "AP",
    "color_accent": "#fa243c",
    "category": "Học tập",
    "scope_text": "Phạm vi: Việt Nam (Xác thực qua UNiDAYS)",
    "audience_target": "Sinh viên đang theo học chương trình cấp bằng tại Đại học/Cao đẳng",
    "timing_window": "Hiệu lực tối đa 48 tháng (xác thực định kỳ hàng năm)",
    "conditions_limit": "Xác thực sinh viên qua cổng UNiDAYS",
    "observed_at": "2026-08-29 01:00",
    "summary_text": "Gói nghe nhạc bản quyền chất lượng cao với mức phí ưu đãi 35.000₫/tháng.",
    "verbatim_quote": "Apple Music Sinh Viên - Giá ưu đãi hàng tháng khi xác thực qua UNiDAYS.",
    "evidence_status": "Đã đối soát raw capture từ www.apple.com (265.3 KB, SHA-256 khớp)",
    "official_source_url": "https://www.apple.com/vn/apple-music",
    "action_type": "PRIMARY_LINK",
    "action_label": "Xem cổng xác thực",
    "gateway_group": "MUA_GI",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "SLOT_EVENING"
  },
  {
    "item_id": "TGT_B_09",
    "tier": "VERIFIED_OFFICIAL_PROGRAM",
    "tier_name": "Chương Trình Chính Thức",
    "badge_label": "NGUỒN CHÍNH THỨC",
    "title": "Free JetBrains Student Pack",
    "brand": "JetBrains",
    "monogram": "JB",
    "color_accent": "#ff318c",
    "category": "Học tập",
    "scope_text": "Phạm vi: Toàn cầu (Trực tuyến)",
    "audience_target": "Học sinh, sinh viên và giảng viên ngành công nghệ thông tin",
    "timing_window": "Giấy phép 1 năm, gia hạn miễn phí khi còn đang theo học",
    "conditions_limit": "Đăng ký bằng email trường học (.edu/.ac.vn) hoặc tài liệu chứng nhận",
    "observed_at": "2026-08-29 01:00",
    "summary_text": "Bộ công cụ lập trình chuyên nghiệp (IntelliJ IDEA Ultimate, PyCharm Pro, WebStorm, CLion).",
    "verbatim_quote": "Free JetBrains Educational License for Students and Teachers.",
    "evidence_status": "Đã đối soát raw capture từ www.jetbrains.com (61.6 KB, SHA-256 khớp)",
    "official_source_url": "https://www.jetbrains.com/community/education/#students",
    "action_type": "PRIMARY_LINK",
    "action_label": "Mở cổng đăng ký",
    "gateway_group": "MUA_GI",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "ALL_DAY"
  },
  {
    "item_id": "TGT_B_10",
    "tier": "VERIFIED_OFFICIAL_PROGRAM",
    "tier_name": "Chương Trình Chính Thức",
    "badge_label": "NGUỒN CHÍNH THỨC",
    "title": "Figma for Education",
    "brand": "Figma",
    "monogram": "FG",
    "color_accent": "#f24e1e",
    "category": "Học tập",
    "scope_text": "Phạm vi: Toàn cầu (Trực tuyến)",
    "audience_target": "Sinh viên và giáo viên các chuyên ngành thiết kế, công nghệ",
    "timing_window": "Hiệu lực 2 năm mỗi lần xác thực",
    "conditions_limit": "Khai báo tên cơ sở đào tạo và chứng minh tư cách người học",
    "observed_at": "2026-08-29 01:00",
    "summary_text": "Gói Figma Professional và FigJam phục vụ thực hành thiết kế giao diện và làm việc nhóm.",
    "verbatim_quote": "Figma for Education - Free professional design tools for students.",
    "evidence_status": "Đã đối soát raw capture từ www.figma.com (1.65 MB, SHA-256 khớp)",
    "official_source_url": "https://www.figma.com/education",
    "action_type": "PRIMARY_LINK",
    "action_label": "Mở cổng xác thực",
    "gateway_group": "MUA_GI",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "ALL_DAY"
  },
  {
    "item_id": "TGT_B_11",
    "tier": "VERIFIED_OFFICIAL_PROGRAM",
    "tier_name": "Chương Trình Chính Thức",
    "badge_label": "NGUỒN CHÍNH THỨC",
    "title": "AWS Educate",
    "brand": "AWS",
    "monogram": "AWS",
    "color_accent": "#ff9900",
    "category": "Học tập",
    "scope_text": "Phạm vi: Toàn cầu (Trực tuyến)",
    "audience_target": "Người học từ 13 tuổi muốn tiếp cận điện toán đám mây",
    "timing_window": "Duy trì tự do không giới hạn thời gian niên khóa",
    "conditions_limit": "Không yêu cầu thẻ tín dụng; đăng ký bằng tài khoản email cá nhân hoặc trường",
    "observed_at": "2026-08-29 01:00",
    "summary_text": "Khóa học thực hành đám mây, môi trường lab trải nghiệm và chứng chỉ hoàn thành từ AWS.",
    "verbatim_quote": "AWS Educate - No credit card required. Build cloud skills.",
    "evidence_status": "Đã đối soát raw capture từ aws.amazon.com (401.7 KB, SHA-256 khớp)",
    "official_source_url": "https://aws.amazon.com/education/awseducate",
    "action_type": "PRIMARY_LINK",
    "action_label": "Mở cổng học tập",
    "gateway_group": "MUA_GI",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "ALL_DAY"
  },
  {
    "item_id": "FACILITY_DANABUS_CARD",
    "tier": "VERIFIED_FACILITY",
    "tier_name": "Tiện Ích & Địa Điểm",
    "badge_label": "ĐỊA ĐIỂM XÁC MINH",
    "title": "Vé Tháng Xe Buýt DanaBus Trợ Giá (45.000₫ – 90.000₫)",
    "brand": "DanaBus Đà Nẵng",
    "monogram": "DB",
    "color_accent": "#15803d",
    "category": "Đi lại",
    "scope_text": "Đà Nẵng: Mạng lưới xe buýt trợ giá nội đô",
    "audience_target": "Học sinh, sinh viên, người cao tuổi và người dân Đà Nẵng",
    "timing_window": "Hoạt động hàng ngày từ 05:30 đến 21:00",
    "conditions_limit": "Làm thẻ vé tháng tại các điểm đăng ký vé buýt hoặc đăng ký trực tuyến",
    "observed_at": "2026-08-29 01:00",
    "summary_text": "Mức vé tháng ưu tiên 45.000₫/tháng (HSSV) và 90.000₫/tháng (phổ thông) đi lại không giới hạn các tuyến.",
    "verbatim_quote": "DanaBus - Biểu giá vé tháng xe buýt trợ giá thành phố Đà Nẵng.",
    "evidence_status": "Đã đối soát cổng vận tải công cộng tại danangbus.vn",
    "official_source_url": "https://danangbus.vn",
    "action_type": "PRIMARY_LINK",
    "action_label": "Xem lộ trình & biểu phí",
    "gateway_group": "DI_DAU",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "SLOT_MORNING"
  },
  {
    "item_id": "FACILITY_TNGO_BIKE",
    "tier": "VERIFIED_FACILITY",
    "tier_name": "Tiện Ích & Địa Điểm",
    "badge_label": "ĐỊA ĐIỂM XÁC MINH",
    "title": "Trạm Xe Đạp Công Cộng TNGO Đà Nẵng (5.000₫/30 phút)",
    "brand": "TNGO Đà Nẵng",
    "monogram": "TG",
    "color_accent": "#059669",
    "category": "Đi lại",
    "scope_text": "Đà Nẵng: 40+ trạm tại Hải Châu, Sơn Trà, Thanh Khê, Ngũ Hành Sơn",
    "audience_target": "Người dân và du khách di chuyển cự ly ngắn trong đô thị",
    "timing_window": "Phục vụ 24/7 tại các trạm xe công cộng",
    "conditions_limit": "Mở khóa và thanh toán qua ứng dụng TNGO trên điện thoại",
    "observed_at": "2026-08-29 01:00",
    "summary_text": "Mạng lưới xe đạp đô thị kết nối trạm xe buýt và điểm công cộng với chi phí 5.000₫ cho mỗi 30 phút.",
    "verbatim_quote": "TNGO - Dịch vụ xe đạp công cộng thành phố Đà Nẵng.",
    "evidence_status": "Đã đối soát mạng lưới trạm và giá dịch vụ tại tngo.vn",
    "official_source_url": "https://tngo.vn",
    "action_type": "PRIMARY_LINK",
    "action_label": "Xem bản đồ trạm xe",
    "gateway_group": "DI_DAU",
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "ALL_DAY"
  },
  {
    "item_id": "FACILITY_DNG_LIBRARY",
    "tier": "VERIFIED_FACILITY",
    "tier_name": "Tiện Ích & Địa Điểm",
    "badge_label": "ĐỊA ĐIỂM XÁC MINH",
    "title": "Thư Viện Khoa Học Tổng Hợp Đà Nẵng",
    "brand": "Thư Viện Tổng Hợp",
    "monogram": "TV",
    "color_accent": "#b45309",
    "category": "Học tập",
    "scope_text": "Đà Nẵng: 46 Bạch Đằng, Quận Hải Châu",
    "audience_target": "Bạn đọc, học sinh, sinh viên, nhà nghiên cứu và công chúng",
    "timing_window": "Mở cửa Thứ 3 đến Chủ Nhật (07:30 – 11:30 và 13:30 – 17:30)",
    "conditions_limit": "Đọc sách tại chỗ không thu phí; Thẻ mượn sách về nhà theo biểu phí quy định 20.000₫/năm",
    "observed_at": "2026-08-29 01:00",
    "summary_text": "Không gian đọc sách công cộng, phòng tra cứu máy tính và kho tài liệu phong phú bên bờ sông Hàn.",
    "verbatim_quote": "Thư viện Khoa học Tổng hợp Đà Nẵng - Phục vụ bạn đọc và phát triển văn hóa đọc.",
    "evidence_status": "Đã đối soát thông tin hoạt động tại thuvien.danang.gov.vn",
    "official_source_url": "https://thuvien.danang.gov.vn",
    "action_type": "PRIMARY_LINK",
    "action_label": "Xem quy chế bạn đọc",
    "gateway_group": "MUA_GI",
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "SLOT_MORNING"
  },
  {
    "item_id": "FACILITY_PUBLIC_SERVICE",
    "tier": "VERIFIED_FACILITY",
    "tier_name": "Tiện Ích & Địa Điểm",
    "badge_label": "ĐỊA ĐIỂM XÁC MINH",
    "title": "Cổng Dịch Vụ Công Trực Tuyến Thành Phố Đà Nẵng",
    "brand": "UBND TP Đà Nẵng",
    "monogram": "DVC",
    "color_accent": "#1e3a8a",
    "category": "Đời sống",
    "scope_text": "Đà Nẵng: Cổng hành chính công trực tuyến toàn thành phố",
    "audience_target": "Công dân, hộ kinh doanh và doanh nghiệp trên địa bàn",
    "timing_window": "Tiếp nhận hồ sơ trực tuyến 24/7",
    "conditions_limit": "Đăng nhập bằng tài khoản VNeID (Định danh điện tử)",
    "observed_at": "2026-08-29 01:00",
    "summary_text": "Nộp hồ sơ trực tuyến, tra cứu tiến độ xử lý và thanh toán nghĩa vụ tài chính công không cần xếp hàng.",
    "verbatim_quote": "Cổng Dịch vụ công trực tuyến thành phố Đà Nẵng - dichvucong.danang.gov.vn",
    "evidence_status": "Đã đối soát cổng dịch vụ công tại dichvucong.danang.gov.vn",
    "official_source_url": "https://dichvucong.danang.gov.vn",
    "action_type": "PRIMARY_LINK",
    "action_label": "Mở cổng dịch vụ công",
    "gateway_group": "DI_DAU",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "ALL_DAY"
  },
  {
    "item_id": "FACILITY_FAHASA_DNG",
    "tier": "VERIFIED_FACILITY",
    "tier_name": "Tiện Ích & Địa Điểm",
    "badge_label": "ĐỊA ĐIỂM XÁC MINH",
    "title": "Nhà Sách Fahasa Đà Nẵng — Điểm Văn Hóa Đọc & Thiết Bị Học Tập",
    "brand": "Fahasa",
    "monogram": "FH",
    "color_accent": "#c2410c",
    "category": "Mua sắm",
    "scope_text": "Đà Nẵng: 300-302 Lê Duẩn & 418 Hùng Vương",
    "audience_target": "Độc giả, phụ huynh, học sinh và sinh viên",
    "timing_window": "08:00 – 21:30 tất cả các ngày trong tuần",
    "conditions_limit": "Phục vụ mua sắm tại cửa hàng và đặt sách trực tuyến",
    "observed_at": "2026-08-29 01:00",
    "summary_text": "Không gian trưng bày sách quốc văn, ngoại văn, văn phòng phẩm và dụng cụ học tập thiết yếu.",
    "verbatim_quote": "Fahasa Đà Nẵng - Hệ thống nhà sách chuyên nghiệp.",
    "evidence_status": "Đã đối soát hệ thống điểm bán tại fahasa.com",
    "official_source_url": "https://fahasa.com",
    "action_type": "PRIMARY_LINK",
    "action_label": "Xem địa chỉ nhà sách",
    "gateway_group": "MUA_GI",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "SLOT_MORNING"
  },
  {
    "item_id": "FACILITY_VNR_STATION",
    "tier": "VERIFIED_FACILITY",
    "tier_name": "Tiện Ích & Địa Điểm",
    "badge_label": "ĐỊA ĐIỂM XÁC MINH",
    "title": "Ga Đường Sắt Đà Nẵng — Đặt Vé Tàu Hỏa Trực Tuyến",
    "brand": "Đường Sắt Việt Nam",
    "monogram": "DS",
    "color_accent": "#1e40af",
    "category": "Đi lại",
    "scope_text": "Đà Nẵng: 202 Hải Phòng, Phường Tân Chính, Thanh Khê",
    "audience_target": "Hành khách di chuyển liên tỉnh trên tuyến đường sắt Bắc - Nam",
    "timing_window": "Cổng bán vé dsvn.vn hoạt động 24/7; Quầy vé ga mở theo lịch tàu",
    "conditions_limit": "Tra cứu giá vé, chọn chỗ và thanh toán trực tuyến qua cổng chính thức",
    "observed_at": "2026-08-29 01:00",
    "summary_text": "Cổng thông tin giờ tàu, lịch trình chuyến đi và đặt vé tàu hỏa điện tử chính thức của ngành đường sắt.",
    "verbatim_quote": "Tổng công ty Đường sắt Việt Nam - Cổng bán vé điện tử dsvn.vn",
    "evidence_status": "Đã đối soát hệ thống bán vé tại dsvn.vn",
    "official_source_url": "https://dsvn.vn",
    "action_type": "PRIMARY_LINK",
    "action_label": "Tra cứu lịch tàu",
    "gateway_group": "DI_DAU",
    "locality_tag": "THANH_KHE",
    "time_slot_tag": "ALL_DAY"
  },
  {
    "item_id": "RADAR_GALAXY_CINE",
    "tier": "RADAR_TRACKING",
    "tier_name": "Radar Theo Dõi Nguồn",
    "badge_label": "RADAR THEO DÕI",
    "title": "Rạp Chiếu Phim Galaxy Cinema Đà Nẵng",
    "brand": "Galaxy Cinema",
    "monogram": "GX",
    "color_accent": "#64748b",
    "category": "Giải trí",
    "scope_text": "Đà Nẵng: Tầng 3 Co.opmart, 478 Điện Biên Phủ",
    "audience_target": "Khán giả yêu thích phim ảnh và thành viên Galaxy",
    "timing_window": "Suất chiếu từ 08:30 đến 23:00 hàng ngày",
    "conditions_limit": "Theo dõi lịch chiếu và giá vé ngày Thứ 3 thành viên",
    "observed_at": "2026-08-29 01:00",
    "summary_text": "JayT đang theo dõi biểu giá vé thành viên và lịch chiếu phim tại website galaxycine.vn.",
    "verbatim_quote": "Cổng thông tin rạp chiếu: galaxycine.vn",
    "evidence_status": "Đang theo dõi nguồn; chưa có capture giá vé ngày",
    "official_source_url": "https://galaxycine.vn",
    "action_type": "RADAR_MODAL",
    "action_label": "Xem tiêu chí kiểm định",
    "gateway_group": "DI_DAU",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "ALL_DAY"
  },
  {
    "item_id": "RADAR_LOTTE_CINEMA",
    "tier": "RADAR_TRACKING",
    "tier_name": "Radar Theo Dõi Nguồn",
    "badge_label": "RADAR THEO DÕI",
    "title": "Cụm Rạp Lotte Cinema Đà Nẵng",
    "brand": "Lotte Cinema",
    "monogram": "LC",
    "color_accent": "#64748b",
    "category": "Giải trí",
    "scope_text": "Đà Nẵng: Tầng 5 Lotte Mart, 06 Nại Nam, Hải Châu",
    "audience_target": "Thành viên Lotte Cinema và khán giả khu vực Hải Châu / Hòa Cường",
    "timing_window": "Hoạt động theo lịch chiếu công bố hàng tuần",
    "conditions_limit": "Theo dõi giá vé ưu đãi Thứ 3 Cinema Day và suất chiếu học sinh sinh viên",
    "observed_at": "2026-08-29 01:00",
    "summary_text": "JayT đang theo dõi cổng thông tin giá vé và các suất chiếu tại lottecinemavn.com.",
    "verbatim_quote": "Cổng thông tin rạp: lottecinemavn.com",
    "evidence_status": "Đang theo dõi nguồn; chưa có capture chi tiết rạp Đà Nẵng",
    "official_source_url": "https://lottecinemavn.com",
    "action_type": "RADAR_MODAL",
    "action_label": "Xem tiêu chí kiểm định",
    "gateway_group": "DI_DAU",
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "ALL_DAY"
  },
  {
    "item_id": "RADAR_KFC",
    "tier": "RADAR_TRACKING",
    "tier_name": "Radar Theo Dõi Nguồn",
    "badge_label": "RADAR THEO DÕI",
    "title": "Chuỗi Cửa Hàng KFC Vietnam Đà Nẵng",
    "brand": "KFC Vietnam",
    "monogram": "KFC",
    "color_accent": "#64748b",
    "category": "Ăn uống",
    "scope_text": "Đà Nẵng: Nguyễn Văn Linh, Big C, Lotte Mart",
    "audience_target": "Khách hàng dùng bữa trưa và gia đình",
    "timing_window": "Khung giờ trưa 10:30 – 14:00",
    "conditions_limit": "Theo dõi thực đơn combo ăn trưa niêm yết tại quầy và website",
    "observed_at": "2026-08-29 01:00",
    "summary_text": "JayT đang theo dõi các combo ăn trưa và chương trình ưu đãi thực đơn tại kfcvietnam.com.vn.",
    "verbatim_quote": "Cổng thông tin chính thức: kfcvietnam.com.vn",
    "evidence_status": "Đang theo dõi nguồn; chưa có capture chương trình cục bộ điểm bán",
    "official_source_url": "https://kfcvietnam.com.vn",
    "action_type": "RADAR_MODAL",
    "action_label": "Xem tiêu chí kiểm định",
    "gateway_group": "AN_GI",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "SLOT_LUNCH"
  },
  {
    "item_id": "RADAR_JOLLIBEE",
    "tier": "RADAR_TRACKING",
    "tier_name": "Radar Theo Dõi Nguồn",
    "badge_label": "RADAR THEO DÕI",
    "title": "Chuỗi Cửa Hàng Jollibee Đà Nẵng",
    "brand": "Jollibee Vietnam",
    "monogram": "JB",
    "color_accent": "#64748b",
    "category": "Ăn uống",
    "scope_text": "Đà Nẵng: Vincom Ngô Quyền, Co.opmart, Hòa Khánh",
    "audience_target": "Học sinh, sinh viên và phụ huynh",
    "timing_window": "09:00 – 21:30 hàng ngày",
    "conditions_limit": "Theo dõi các gói combo gà giòn và mì Ý trên cổng khuyến mãi",
    "observed_at": "2026-08-29 01:00",
    "summary_text": "JayT đang theo dõi các chương trình ưu đãi combo tại website jollibee.com.vn.",
    "verbatim_quote": "Cổng thông tin chính thức: jollibee.com.vn",
    "evidence_status": "Đang theo dõi nguồn; chưa đối soát áp dụng riêng cửa hàng Đà Nẵng",
    "official_source_url": "https://jollibee.com.vn",
    "action_type": "RADAR_MODAL",
    "action_label": "Xem tiêu chí kiểm định",
    "gateway_group": "AN_GI",
    "locality_tag": "HOA_KHANH",
    "time_slot_tag": "ALL_DAY"
  },
  {
    "item_id": "RADAR_HIGHLANDS",
    "tier": "RADAR_TRACKING",
    "tier_name": "Radar Theo Dõi Nguồn",
    "badge_label": "RADAR THEO DÕI",
    "title": "Hệ Thống Highlands Coffee Đà Nẵng",
    "brand": "Highlands Coffee",
    "monogram": "HL",
    "color_accent": "#64748b",
    "category": "Ăn uống",
    "scope_text": "Đà Nẵng: Bạch Đằng, Nguyễn Văn Linh, Điện Biên Phủ, Indochina",
    "audience_target": "Khách hàng làm việc, gặp gỡ và học tập",
    "timing_window": "07:00 – 22:30 hàng ngày",
    "conditions_limit": "Theo dõi điểm tích lũy thành viên và voucher trên app chính thức",
    "observed_at": "2026-08-29 01:00",
    "summary_text": "JayT đang theo dõi danh mục đồ uống và chương trình khách hàng thân thiết tại highlandscoffee.com.vn.",
    "verbatim_quote": "Cổng thông tin chính thức: highlandscoffee.com.vn",
    "evidence_status": "Đang theo dõi nguồn; chưa có capture giá theo chi nhánh",
    "official_source_url": "https://www.highlandscoffee.com.vn",
    "action_type": "RADAR_MODAL",
    "action_label": "Xem tiêu chí kiểm định",
    "gateway_group": "AN_GI",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "SLOT_MORNING"
  },
  {
    "item_id": "RADAR_THECOFFEEHOUSE",
    "tier": "RADAR_TRACKING",
    "tier_name": "Radar Theo Dõi Nguồn",
    "badge_label": "RADAR THEO DÕI",
    "title": "Chuỗi Cà Phê The Coffee House Đà Nẵng",
    "brand": "The Coffee House",
    "monogram": "TCH",
    "color_accent": "#64748b",
    "category": "Ăn uống",
    "scope_text": "Đà Nẵng: 80 Pasteur, 435 Lê Duẩn, Nguyễn Văn Thoại",
    "audience_target": "Sinh viên, người làm việc tự do và nhân viên văn phòng",
    "timing_window": "07:00 – 22:00 hàng ngày",
    "conditions_limit": "Theo dõi quyền lợi thành viên The Coffee House Club",
    "observed_at": "2026-08-29 01:00",
    "summary_text": "JayT đang theo dõi thực đơn cà phê, trà trái cây và điểm thành viên tại thecoffeehouse.com.",
    "verbatim_quote": "Cổng thông tin chính thức: thecoffeehouse.com",
    "evidence_status": "Đang theo dõi nguồn; chưa có capture ưu đãi điểm bán",
    "official_source_url": "https://thecoffeehouse.com",
    "action_type": "RADAR_MODAL",
    "action_label": "Xem tiêu chí kiểm định",
    "gateway_group": "AN_GI",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "SLOT_MORNING"
  },
  {
    "item_id": "RADAR_PHUC_LONG",
    "tier": "RADAR_TRACKING",
    "tier_name": "Radar Theo Dõi Nguồn",
    "badge_label": "RADAR THEO DÕI",
    "title": "Hệ Thống Trà & Cà Phê Phúc Long Đà Nẵng",
    "brand": "Phúc Long",
    "monogram": "PL",
    "color_accent": "#64748b",
    "category": "Ăn uống",
    "scope_text": "Đà Nẵng: 59-61 Nguyễn Văn Linh & Vincom Ngô Quyền",
    "audience_target": "Khách hàng thưởng thức trà truyền thống và trà sữa",
    "timing_window": "07:30 – 22:00 hàng ngày",
    "conditions_limit": "Theo dõi thực đơn đồ uống theo mùa và điểm thẻ thành viên",
    "observed_at": "2026-08-29 01:00",
    "summary_text": "JayT đang theo dõi danh mục sản phẩm trà và cà phê tại phuclong.com.vn.",
    "verbatim_quote": "Cổng thông tin chính thức: phuclong.com.vn",
    "evidence_status": "Đang theo dõi nguồn; chưa có capture giá theo cửa hàng",
    "official_source_url": "https://phuclong.com.vn",
    "action_type": "RADAR_MODAL",
    "action_label": "Xem tiêu chí kiểm định",
    "gateway_group": "AN_GI",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "SLOT_MORNING"
  },
  {
    "item_id": "RADAR_VINCOM_PLAZA",
    "tier": "RADAR_TRACKING",
    "tier_name": "Radar Theo Dõi Nguồn",
    "badge_label": "RADAR THEO DÕI",
    "title": "Trung Tâm Thương Mại Vincom Plaza Ngô Quyền Đà Nẵng",
    "brand": "Vincom Plaza",
    "monogram": "VC",
    "color_accent": "#64748b",
    "category": "Giải trí",
    "scope_text": "Đà Nẵng: 910A Ngô Quyền, Phường An Hải Bắc, Sơn Trà",
    "audience_target": "Gia đình, giới trẻ mua sắm và vui chơi giải trí",
    "timing_window": "09:30 – 22:00 (Thứ 2 - CN)",
    "conditions_limit": "Theo dõi lịch hoạt động gian hàng và sự kiện trung tâm",
    "observed_at": "2026-08-29 01:00",
    "summary_text": "JayT đang theo dõi danh mục tiện ích mua sắm, ẩm thực và rạp phim tại vincom.com.vn.",
    "verbatim_quote": "Cổng thông tin trung tâm thương mại: vincom.com.vn",
    "evidence_status": "Đang theo dõi nguồn; chưa có capture sự kiện theo tuần",
    "official_source_url": "https://vincom.com.vn",
    "action_type": "RADAR_MODAL",
    "action_label": "Xem tiêu chí kiểm định",
    "gateway_group": "DI_DAU",
    "locality_tag": "SON_TRA",
    "time_slot_tag": "ALL_DAY"
  },
  {
    "item_id": "RADAR_COOPMART_DNG",
    "tier": "RADAR_TRACKING",
    "tier_name": "Radar Theo Dõi Nguồn",
    "badge_label": "RADAR THEO DÕI",
    "title": "Siêu Thị Co.opmart Đà Nẵng — Bản Tin Tiêu Dùng",
    "brand": "Co.opmart Đà Nẵng",
    "monogram": "CP",
    "color_accent": "#64748b",
    "category": "Mua sắm",
    "scope_text": "Đà Nẵng: 478 Điện Biên Phủ, Phường Thanh Khê Đông, Thanh Khê",
    "audience_target": "Hộ gia đình, người nội trợ và cư dân khu vực Thanh Khê / Hòa Khê",
    "timing_window": "08:00 – 22:00 hàng ngày",
    "conditions_limit": "Theo dõi cẩm nang mua sắm định kỳ 2 tuần/lần",
    "observed_at": "2026-08-29 01:00",
    "summary_text": "JayT đang theo dõi bản tin giá hàng tiêu dùng thiết yếu tại co-opmart.com.vn.",
    "verbatim_quote": "Cổng thông tin siêu thị: co-opmart.com.vn",
    "evidence_status": "Đang theo dõi nguồn; chưa có capture catalogue tuần mới",
    "official_source_url": "https://co-opmart.com.vn",
    "action_type": "RADAR_MODAL",
    "action_label": "Xem tiêu chí kiểm định",
    "gateway_group": "MUA_GI",
    "locality_tag": "THANH_KHE",
    "time_slot_tag": "SLOT_MORNING"
  },
  {
    "item_id": "RADAR_GO_DANANG",
    "tier": "RADAR_TRACKING",
    "tier_name": "Radar Theo Dõi Nguồn",
    "badge_label": "RADAR THEO DÕI",
    "title": "Đại Siêu Thị GO! Đà Nẵng (Big C cũ)",
    "brand": "GO! Vietnam",
    "monogram": "GO",
    "color_accent": "#64748b",
    "category": "Mua sắm",
    "scope_text": "Đà Nẵng: 255-257 Hùng Vương, Phường Vĩnh Trung, Thanh Khê",
    "audience_target": "Người tiêu dùng đô thị mua sắm thực phẩm và đồ gia dụng",
    "timing_window": "08:00 – 22:00 hàng ngày",
    "conditions_limit": "Theo dõi giá niêm yết sản phẩm tươi sống và hàng tiêu dùng nhanh",
    "observed_at": "2026-08-29 01:00",
    "summary_text": "JayT đang theo dõi các danh mục sản phẩm tiêu dùng tại go-vietnam.vn.",
    "verbatim_quote": "Cổng thông tin đại siêu thị: go-vietnam.vn",
    "evidence_status": "Đang theo dõi nguồn; chưa có capture giá kệ siêu thị",
    "official_source_url": "https://go-vietnam.vn",
    "action_type": "RADAR_MODAL",
    "action_label": "Xem tiêu chí kiểm định",
    "gateway_group": "MUA_GI",
    "locality_tag": "THANH_KHE",
    "time_slot_tag": "SLOT_MORNING"
  },
  {
    "item_id": "RADAR_LONG_CHAU",
    "tier": "RADAR_TRACKING",
    "tier_name": "Radar Theo Dõi Nguồn",
    "badge_label": "RADAR THEO DÕI",
    "title": "Hệ Thống Nhà Thuốc FPT Long Châu Đà Nẵng",
    "brand": "FPT Long Châu",
    "monogram": "LC",
    "color_accent": "#64748b",
    "category": "Đời sống",
    "scope_text": "Đà Nẵng: 30+ điểm bán tại Hải Châu, Thanh Khê, Sơn Trà, Cẩm Lệ",
    "audience_target": "Người dân có nhu cầu tra cứu dược phẩm và sản phẩm y tế",
    "timing_window": "06:30 – 22:30 hàng ngày",
    "conditions_limit": "Theo dõi danh mục thuốc theo toa và sản phẩm chăm sóc sức khỏe chính hãng",
    "observed_at": "2026-08-29 01:00",
    "summary_text": "JayT đang theo dõi cổng tra cứu giá thuốc và sản phẩm chăm sóc sức khỏe tại nhathuoclongchau.com.vn.",
    "verbatim_quote": "Cổng thông tin dược phẩm: nhathuoclongchau.com.vn",
    "evidence_status": "Đang theo dõi nguồn; hỗ trợ tra cứu giá niêm yết chính hãng",
    "official_source_url": "https://nhathuoclongchau.com.vn",
    "action_type": "RADAR_MODAL",
    "action_label": "Xem tiêu chí kiểm định",
    "gateway_group": "DI_DAU",
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "ALL_DAY"
  },
  {
    "item_id": "RADAR_PHARMACITY",
    "tier": "RADAR_TRACKING",
    "tier_name": "Radar Theo Dõi Nguồn",
    "badge_label": "RADAR THEO DÕI",
    "title": "Chuỗi Nhà Thuốc Tiện Lợi Pharmacity Đà Nẵng",
    "brand": "Pharmacity",
    "monogram": "PMC",
    "color_accent": "#64748b",
    "category": "Đời sống",
    "scope_text": "Đà Nẵng: Hệ thống cửa hàng dược phẩm tiện lợi toàn thành phố",
    "audience_target": "Người dân cần mua vật tư y tế và sản phẩm chăm sóc cá nhân",
    "timing_window": "06:00 – 23:30 (Một số điểm mở cửa 24/7)",
    "conditions_limit": "Theo dõi quyền lợi thành viên Extra Care và sản phẩm thiết yếu",
    "observed_at": "2026-08-29 01:00",
    "summary_text": "JayT đang theo dõi danh mục thực phẩm chức năng và vật tư y tế tại pharmacity.vn.",
    "verbatim_quote": "Cổng thông tin chuỗi nhà thuốc: pharmacity.vn",
    "evidence_status": "Đang theo dõi nguồn; chưa có capture giá theo điểm bán",
    "official_source_url": "https://www.pharmacity.vn",
    "action_type": "RADAR_MODAL",
    "action_label": "Xem tiêu chí kiểm định",
    "gateway_group": "DI_DAU",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "ALL_DAY"
  },
  {
    "item_id": "RADAR_WINMART_DNG",
    "tier": "RADAR_TRACKING",
    "tier_name": "Radar Theo Dõi Nguồn",
    "badge_label": "RADAR THEO DÕI",
    "title": "Hệ Thống WinMart / WinMart+ Đà Nẵng",
    "brand": "WinMart Vietnam",
    "monogram": "WM",
    "color_accent": "#64748b",
    "category": "Mua sắm",
    "scope_text": "Đà Nẵng: Chuỗi siêu thị và cửa hàng tiện ích khu dân cư",
    "audience_target": "Người tiêu dùng mua sắm thực phẩm sạch và hàng thiết yếu mỗi ngày",
    "timing_window": "07:00 – 22:00 hàng ngày",
    "conditions_limit": "Theo dõi ưu đãi thành viên WiN tiết kiệm 20% rau sạch và thịt mát MEATDeli",
    "observed_at": "2026-08-29 01:00",
    "summary_text": "JayT đang theo dõi chính sách thành viên WiN và giá thực phẩm tươi tại winmart.vn.",
    "verbatim_quote": "Cổng thông tin bán lẻ: winmart.vn",
    "evidence_status": "Đang theo dõi nguồn; chưa có capture danh mục theo ngày",
    "official_source_url": "https://winmart.vn",
    "action_type": "RADAR_MODAL",
    "action_label": "Xem tiêu chí kiểm định",
    "gateway_group": "MUA_GI",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "SLOT_MORNING"
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
  const root = document.getElementById('jayt-app-root');
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
            <button class="nav-btn" data-nav="BUY_DECISION">Mua có hời không?</button>
            <button class="nav-btn" data-nav="VOUCHERS">Voucher Hub</button>
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
        <button class="mobile-nav-btn" data-nav="BUY_DECISION">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
          <span>Mua hời?</span>
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

function renderDailyGuideHome() {
  const dealItems = JAYT_DISCOVERY_ITEMS.filter(i => i.tier === 'VERIFIED_DEAL');
  const facilityItems = JAYT_DISCOVERY_ITEMS.filter(i => i.tier === 'VERIFIED_FACILITY');
  const officialItems = JAYT_DISCOVERY_ITEMS.filter(i => i.tier === 'VERIFIED_OFFICIAL_PROGRAM');
  const radarItems = JAYT_DISCOVERY_ITEMS.filter(i => i.tier === 'RADAR_TRACKING');

  return `
    <div class="home-guide-layout">
      <!-- Editorial Hero Header -->
      <section class="guide-hero-section">
        <div class="hero-badge">CẨM NANG TIỆN ÍCH ĐÀ NẴNG HÔM NAY</div>
        <h1 class="hero-main-title">Hôm nay bạn cần gì ở Đà Nẵng?</h1>
        <p class="hero-description">Bữa trưa tiết kiệm, suất xem phim rạp, xe buýt đô thị hay công cụ học tập — Tất cả đều có điều kiện rõ ràng, đã đối soát độc lập.</p>
        
        <!-- Search Bar with Progressive Disclosure -->
        <div class="hero-search-wrapper">
          <div class="search-input-box">
            <svg class="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input type="text" id="home-search-input" placeholder="Tìm kiếm nhanh: Lotteria, Metiz, DanaBus, Figma, Thư viện..." />
            <button id="home-clear-search" class="btn-clear-search" style="display: none;">Xóa</button>
          </div>
        </div>
      </section>

      <!-- The 3 Primary Daily Gateways (Distinct, Tactile Cards) -->
      <section class="daily-gateways-section" aria-labelledby="gateways-title">
        <h2 id="gateways-title" class="sr-only">Ba cửa vào khám phá trong ngày</h2>
        <div class="gateways-grid">
          <div class="gateway-card card-gateway-food" data-gateway-target="AN_GI" role="button" tabindex="0">
            <div class="gateway-tag">BỮA ĂN & GẶP GỠ</div>
            <h3 class="gateway-heading">Ăn gì hôm nay?</h3>
            <p class="gateway-sub">Ưu đãi bữa trưa từ 40k, combo nhóm Domino's, KFC, Jollibee</p>
            <span class="gateway-action-hint">Khám phá 7 địa điểm &rarr;</span>
          </div>

          <div class="gateway-card card-gateway-places" data-gateway-target="DI_DAU" role="button" tabindex="0">
            <div class="gateway-tag">ĐI LẠI & GIẢI TRÍ</div>
            <h3 class="gateway-heading">Đi đâu sau giờ học/làm?</h3>
            <p class="gateway-sub">Suất phim Metiz, Starlight, CGV, xe buýt DanaBus, thư viện</p>
            <span class="gateway-action-hint">Khám phá 12 địa điểm &rarr;</span>
          </div>

          <div class="gateway-card card-gateway-tools" data-gateway-target="MUA_GI" role="button" tabindex="0">
            <div class="gateway-tag">HỌC TẬP & MUA SẮM</div>
            <h3 class="gateway-heading">Cần mua sắm gì?</h3>
            <p class="gateway-sub">Bản quyền GitHub, Notion, Canva, đồ dùng KTX và siêu thị</p>
            <span class="gateway-action-hint">Khám phá 14 tiện ích &rarr;</span>
          </div>
        </div>
      </section>

      <!-- Time-Slot Contextual Switcher (Secondary Refinement) -->
      <section class="time-slot-context-bar" aria-label="Lọc theo nhịp thời gian">
        <span class="time-slot-label">Nhịp sinh hoạt:</span>
        <div class="time-slot-pills">
          <button class="time-pill ${activeTimeSlot === 'ALL' ? 'active' : ''}" data-slot="ALL">Tất cả</button>
          <button class="time-pill ${activeTimeSlot === 'SLOT_MORNING' ? 'active' : ''}" data-slot="SLOT_MORNING">Sáng (Đi lại & Cà phê)</button>
          <button class="time-pill ${activeTimeSlot === 'SLOT_LUNCH' ? 'active' : ''}" data-slot="SLOT_LUNCH">Trưa (Bữa trưa 40k)</button>
          <button class="time-pill ${activeTimeSlot === 'SLOT_AFTERNOON' ? 'active' : ''}" data-slot="SLOT_AFTERNOON">Chiều (Suất phim & Tự học)</button>
          <button class="time-pill ${activeTimeSlot === 'SLOT_EVENING' ? 'active' : ''}" data-slot="SLOT_EVENING">Tối (Kèo nhóm & Siêu thị)</button>
        </div>
      </section>

      <!-- Section 1: Ưu Đãi Đã Đối Soát (Verified Deals) -->
      <section class="content-rail-section">
        <div class="rail-header">
          <div>
            <span class="rail-kicker kicker-deal">ĐÃ ĐỐI SOÁT CHỨNG CỨ</span>
            <h2 class="rail-title">Ưu Đãi Dành Cho Hôm Nay</h2>
          </div>
          <span class="rail-meta">5 ưu đãi</span>
        </div>
        <div class="cards-layout-grid">
          ${dealItems.map(item => renderEditorialCard(item)).join('')}
        </div>
      </section>

      <!-- Section 2: Gần Bạn & Điểm Đến Đô Thị (Civic Facilities) -->
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

      <!-- Section 3: Hai Cổng Trải Nghiệm Destination (Buy Decision & Voucher Hub) -->
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

      <!-- Section 4: Quyền Lợi & Bản Quyền Số (Official Tooling) -->
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

      <!-- Section 5: Radar Theo Dõi Nguồn Tin Cậy -->
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
        <p class="vouchers-sub">100% mã khuyến mãi đều có đường dẫn thể lệ chính thức, thời hạn và số lượng phân bổ rõ ràng — Không mã rác, không voucher ảo.</p>
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
  let tierKicker = 'ƯU ĐÃI XÁC MINH';
  let tierCardClass = 'card-tier-deal';

  if (item.tier === 'VERIFIED_OFFICIAL_PROGRAM') {
    tierKicker = 'QUYỀN LỢI CHÍNH THỨC';
    tierCardClass = 'card-tier-verified';
  } else if (item.tier === 'VERIFIED_FACILITY') {
    tierKicker = 'TIỆN ÍCH ĐÔ THỊ';
    tierCardClass = 'card-tier-facility';
  } else if (item.tier === 'RADAR_TRACKING') {
    tierKicker = 'RADAR THEO DÕI';
    tierCardClass = 'card-tier-radar';
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

      <!-- Card Body: Program Title & Compact Condition Badges -->
      <div class="card-content">
        <h3 class="card-title">${item.title}</h3>
        <p class="card-summary">${item.summary_text}</p>
        
        <!-- Condition Snippet (Compact, Scannable) -->
        <div class="card-meta-chips">
          <span class="meta-chip">📍 ${item.scope_text}</span>
          <span class="meta-chip">⏰ ${item.timing_window}</span>
        </div>
      </div>

      <!-- Card Action Footer -->
      <div class="card-foot">
        ${item.action_type === 'PRIMARY_LINK' ? `
          <a href="${item.official_source_url}" target="_blank" rel="noopener noreferrer" class="btn-card-primary">
            ${item.action_label} &rarr;
          </a>
        ` : `
          <button class="btn-card-radar" data-card-detail="${item.item_id}">
            ${item.action_label}
          </button>
        `}
        <button class="btn-card-detail" data-card-detail="${item.item_id}">
          Chi tiết & Bằng chứng
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
  document.addEventListener('DOMContentLoaded', initStorefrontApp);
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
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
