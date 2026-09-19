/**
 * JAYT COMMUNITY OS — COMPLETE FOUNDATION (SECTION BT)
 * Release Candidate: v3.426.0-staging.bt
 * Governing Directive: JAYT-245 Section BT (Lines 1691-1730)
 * Architecture: BR Foundation + BQ Cinematic City + BS Voucher Wallet + 50 Tiered Supply + Value-First Buy Decision + Zero-PII Observability.
 */

if (typeof window !== 'undefined' && window.JAYT_OBSERVABILITY) {
  window.JAYT_OBSERVABILITY.recordEvent('STOREFRONT_INITIALIZED', {
    version: 'v3.426.0-staging.bt',
    environment: 'STAGING_REVIEW_BT'
  });
}

const JAYT_STOREFRONT_VERSION = 'v3.426.0-staging.bt';

const JAYT_DISCOVERY_ITEMS = [
  {
    "item_id": "DEAL_CGV_VNPAY_BOGO",
    "tier": "VERIFIED_DEAL",
    "tier_name": "Ưu Đãi Đã Đối Soát",
    "badge_label": "MÃ CHÍNH THỨC — ĐÃ XÁC THỰC",
    "title": "CGV Cinemas x VNPAY-QR: Mua 1 Tặng 1 Vé 2D",
    "brand": "CGV Cinemas",
    "monogram": "CGV",
    "color_accent": "#e11d48",
    "category": "Giải trí",
    "scope_text": "CGV Vĩnh Trung Plaza & Vincom Plaza Đà Nẵng",
    "audience_target": "Tất cả khán giả thanh toán qua VNPAY-QR",
    "timing_window": "Thứ 6, Thứ 7, Chủ Nhật hàng tuần",
    "conditions_limit": "Áp dụng cho vé 2D tiêu chuẩn tại rạp CGV Đà Nẵng qua VNPAY-QR",
    "observed_at": "2026-08-29 08:00",
    "summary_text": "Mua 1 vé xem phim 2D tặng 1 vé 2D vào cuối tuần khi thanh toán qua cổng VNPAY-QR.",
    "verbatim_quote": "Nhập mã VNPAYCGV trên cổng thanh toán VNPAY-QR tại ứng dụng ngân hàng.",
    "evidence_status": "Bằng chứng văn bản chính thức • Đối soát cgv.vn",
    "official_source_url": "https://www.cgv.vn/default/movies/offers/vnpay-bogo",
    "action_type": "COPY_CODE",
    "code_text": "VNPAYCGV",
    "action_label": "Sao chép mã VNPAYCGV",
    "gateway_group": "DI_DAU",
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "SLOT_EVENING",
    "allow_field_claims": true
  },
  {
    "item_id": "DEAL_DOMINOS_BOGO",
    "tier": "VERIFIED_DEAL",
    "tier_name": "Ưu Đãi Đã Đối Soát",
    "badge_label": "ƯU ĐÃI CHÍNH THỨC — MUA 1 TẶNG 1",
    "title": "Domino's Pizza: Mua 1 Tặng 1 Pizza Mỗi Thứ 3 & CN",
    "brand": "Domino's Pizza",
    "monogram": "DP",
    "color_accent": "#0284c7",
    "category": "Ăn uống",
    "scope_text": "Domino's Nguyễn Văn Linh & Pasteur Đà Nẵng",
    "audience_target": "Khách hàng cá nhân, học sinh sinh viên, nhóm bạn",
    "timing_window": "Thứ 3 & Chủ Nhật hàng tuần",
    "conditions_limit": "Áp dụng cho Pizza cỡ vừa/lớn khi đặt trực tuyến tại dominos.vn",
    "observed_at": "2026-08-29 08:00",
    "summary_text": "Mua 1 Pizza cỡ M/L tặng 1 Pizza cùng cỡ tại hệ thống Domino's Đà Nẵng.",
    "verbatim_quote": "Tự động áp dụng trên website chính thức vào thứ 3 và chủ nhật.",
    "evidence_status": "Bằng chứng khuyến mãi niêm yết • Đối soát dominos.vn",
    "official_source_url": "https://dominos.vn/khuyen-mai/mua-1-tang-1",
    "action_type": "CLAIM_OFFICIAL",
    "code_text": null,
    "action_label": "Nhận tại trang chính thức",
    "gateway_group": "AN_GI",
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "ALL_DAY",
    "allow_field_claims": true
  },
  {
    "item_id": "DEAL_LOTTERIA_HAPPY_LUNCH",
    "tier": "VERIFIED_DEAL",
    "tier_name": "Ưu Đãi Đã Đối Soát",
    "badge_label": "ƯU ĐÃI CHÍNH THỨC — HAPPY LUNCH",
    "title": "Lotteria: Happy Lunch Đồng Giá 38.000đ",
    "brand": "Lotteria Vietnam",
    "monogram": "LT",
    "color_accent": "#dc2626",
    "category": "Ăn uống",
    "scope_text": "Tất cả chi nhánh Lotteria TP. Đà Nẵng",
    "audience_target": "Học sinh, sinh viên, nhân viên văn phòng",
    "timing_window": "10:00 - 14:00 từ Thứ 2 đến Thứ 6",
    "conditions_limit": "Áp dụng cho thực đơn trưa cơm gà, burger bò tại quầy",
    "observed_at": "2026-08-29 08:00",
    "summary_text": "Thực đơn trưa cơm gà, burger bò giá ưu đãi 38.000đ từ 10h - 14h hàng ngày.",
    "verbatim_quote": "Áp dụng khung giờ trưa từ Thứ 2 đến Thứ 6 tại hệ thống Lotteria.",
    "evidence_status": "Bằng chứng niêm yết menu • Đối soát lotteria.vn",
    "official_source_url": "https://www.lotteria.vn/menu/happy-lunch",
    "action_type": "CLAIM_OFFICIAL",
    "code_text": null,
    "action_label": "Xem thực đơn trưa chính thức",
    "gateway_group": "AN_GI",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "SLOT_LUNCH",
    "allow_field_claims": true
  },
  {
    "item_id": "DEAL_METIZ_U22",
    "tier": "VERIFIED_DEAL",
    "tier_name": "Ưu Đãi Đã Đối Soát",
    "badge_label": "ĐẶC QUYỀN HỌC ĐƯỜNG — VÉ 45K",
    "title": "Metiz Cinema: Vé Xem Phim U22 Chỉ 45.000đ",
    "brand": "Metiz Cinema",
    "monogram": "MZ",
    "color_accent": "#0d9488",
    "category": "Giải trí",
    "scope_text": "Tầng 1 Helio Center, Đường 2 Tháng 9, Hải Châu, Đà Nẵng",
    "audience_target": "Khán giả dưới 22 tuổi và học sinh sinh viên",
    "timing_window": "Từ Thứ 2 đến Thứ 6 hàng tuần",
    "conditions_limit": "Xuất trình CCCD hoặc thẻ HSSV chính chủ tại quầy vé",
    "observed_at": "2026-08-29 08:00",
    "summary_text": "Giá vé ưu đãi 45.000đ/vé 2D cho khán giả U22 tại rạp Metiz Cinema.",
    "verbatim_quote": "Xuất trình thẻ học sinh sinh viên hoặc CCCD tại quầy vé.",
    "evidence_status": "Bằng chứng niêm yết tại quầy & website metiz.vn",
    "official_source_url": "https://metiz.vn/tin-tuc/khuyen-mai/gia-ve-u22-metiz/",
    "action_type": "VIEW_CONDITIONS",
    "code_text": null,
    "action_label": "Xem điều kiện tại rạp Metiz",
    "gateway_group": "DI_DAU",
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "SLOT_AFTERNOON",
    "allow_field_claims": true
  },
  {
    "item_id": "PROG_GITHUB_STUDENT",
    "tier": "VERIFIED_DEAL",
    "tier_name": "Ưu Đãi Đã Đối Soát",
    "badge_label": "BẢN QUYỀN HỌC THUẬT — MIỄN PHÍ",
    "title": "GitHub Student Developer Pack (Bộ Công Cụ Lập Trình)",
    "brand": "GitHub Education",
    "monogram": "GH",
    "color_accent": "#24292f",
    "category": "Học tập",
    "scope_text": "HSSV tại các trường ĐH, CĐ, THPT TP. Đà Nẵng",
    "audience_target": "Học sinh sinh viên có email trường học (@edu.vn)",
    "timing_window": "Áp dụng liên tục trong suốt thời gian học tập",
    "conditions_limit": "Yêu cầu xác thực thẻ sinh viên hoặc email giáo dục",
    "observed_at": "2026-08-29 08:00",
    "summary_text": "Miễn phí GitHub Copilot, Canva Pro, JetBrains, Namecheap domain cho sinh viên.",
    "verbatim_quote": "Xác thực qua cổng GitHub Education chính thức.",
    "evidence_status": "Chính sách toàn cầu chính thức • education.github.com",
    "official_source_url": "https://education.github.com/pack",
    "action_type": "CLAIM_OFFICIAL",
    "code_text": null,
    "action_label": "Đăng ký GitHub Student",
    "gateway_group": "MUA_SAM",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "ALL_DAY",
    "allow_field_claims": true
  },
  {
    "item_id": "PROG_NOTION_EDU",
    "tier": "VERIFIED_DEAL",
    "tier_name": "Ưu Đãi Đã Đối Soát",
    "badge_label": "BẢN QUYỀN HỌC THUẬT — MIỄN PHÍ",
    "title": "Notion Plus: Miễn Phí Trọn Đời Cho Sinh Viên & Giảng Viên",
    "brand": "Notion",
    "monogram": "NT",
    "color_accent": "#000000",
    "category": "Học tập",
    "scope_text": "Sinh viên & Giảng viên các trường tại Đà Nẵng",
    "audience_target": "Tất cả tài khoản đăng ký bằng email .edu.vn",
    "timing_window": "Miễn phí trọn đời tài khoản",
    "conditions_limit": "Đăng ký bằng email trường học hợp lệ",
    "observed_at": "2026-08-29 08:00",
    "summary_text": "Gói Notion Plus không giới hạn block và trang cộng tác cho việc học tập.",
    "verbatim_quote": "Kích hoạt trực tiếp tại cài đặt Notion bằng email sinh viên.",
    "evidence_status": "Chính sách chính thức notion.so/product/notion-for-education",
    "official_source_url": "https://www.notion.so/product/notion-for-education",
    "action_type": "CLAIM_OFFICIAL",
    "code_text": null,
    "action_label": "Kích hoạt Notion Plus",
    "gateway_group": "MUA_SAM",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "ALL_DAY",
    "allow_field_claims": true
  },
  {
    "item_id": "PROG_CANVA_EDU",
    "tier": "OFFICIAL_PROGRAM",
    "tier_name": "Chương Trình Chính Thức",
    "badge_label": "QUYỀN LỢI HỌC ĐƯỜNG",
    "title": "Canva Giáo Dục: Thiết Kế Cao Cấp Miễn Phí Cho HSSV",
    "brand": "Canva",
    "monogram": "CV",
    "color_accent": "#00c4cc",
    "category": "Học tập",
    "scope_text": "Giáo viên và học sinh sinh viên tại Đà Nẵng",
    "audience_target": "Giáo viên và học sinh phổ thông / sinh viên",
    "timing_window": "Liên tục",
    "conditions_limit": "Xác minh tư cách giáo dục",
    "observed_at": "2026-08-29 08:00",
    "summary_text": "Bộ công cụ thiết kế Canva Pro miễn phí phục vụ học tập và thuyết trình.",
    "verbatim_quote": "Đăng ký qua cổng Canva for Education.",
    "evidence_status": "Chính sách chính thức canva.com/education",
    "official_source_url": "https://www.canva.com/education/",
    "action_type": "CLAIM_OFFICIAL",
    "code_text": null,
    "action_label": "Đăng ký Canva Giáo dục",
    "gateway_group": "MUA_SAM",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "ALL_DAY",
    "allow_field_claims": false
  },
  {
    "item_id": "PROG_JETBRAINS_STUDENT",
    "tier": "OFFICIAL_PROGRAM",
    "tier_name": "Chương Trình Chính Thức",
    "badge_label": "BẢN QUYỀN LẬP TRÌNH",
    "title": "JetBrains: Miễn Phí Bộ IDE Chuyên Nghiệp Cho Sinh Viên IT",
    "brand": "JetBrains",
    "monogram": "JB",
    "color_accent": "#000000",
    "category": "Học tập",
    "scope_text": "Sinh viên CNTT các trường ĐH Bách Khoa, Sư Phạm KT, Duy Tân, FPT Đà Nẵng",
    "audience_target": "Sinh viên theo học ngành kỹ thuật công nghệ",
    "timing_window": "Gia hạn hàng năm bằng thẻ sinh viên",
    "conditions_limit": "Xác nhận sinh viên đang theo học",
    "observed_at": "2026-08-29 08:00",
    "summary_text": "Bản quyền IntelliJ IDEA Ultimate, PyCharm Pro, WebStorm miễn phí 100%.",
    "verbatim_quote": "Xác thực qua email trường hoặc ISIC.",
    "evidence_status": "Chính sách chính thức jetbrains.com/community/education",
    "official_source_url": "https://www.jetbrains.com/community/education/",
    "action_type": "CLAIM_OFFICIAL",
    "code_text": null,
    "action_label": "Nhận bản quyền JetBrains",
    "gateway_group": "MUA_SAM",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "ALL_DAY",
    "allow_field_claims": false
  },
  {
    "item_id": "PROG_SPOTIFY_STUDENT",
    "tier": "OFFICIAL_PROGRAM",
    "tier_name": "Chương Trình Chính Thức",
    "badge_label": "GÓI SINH VIÊN — GIẢM 50%",
    "title": "Spotify Premium Student: Âm Nhạc Bản Quyền 29.500đ/tháng",
    "brand": "Spotify",
    "monogram": "SP",
    "color_accent": "#1db954",
    "category": "Giải trí",
    "scope_text": "Sinh viên các trường đại học tại Đà Nẵng",
    "audience_target": "Sinh viên chính quy",
    "timing_window": "Tối đa 4 năm học",
    "conditions_limit": "Xác thực sinh viên qua SheerID",
    "observed_at": "2026-08-29 08:00",
    "summary_text": "Nghe nhạc không quảng cáo chất lượng cao với giá ưu đãi sinh viên 29.500đ/tháng.",
    "verbatim_quote": "Xác thực tài khoản sinh viên qua SheerID.",
    "evidence_status": "Chính sách chính thức spotify.com/vn-vi/student",
    "official_source_url": "https://www.spotify.com/vn-vi/student/",
    "action_type": "CLAIM_OFFICIAL",
    "code_text": null,
    "action_label": "Đăng ký Spotify Sinh viên",
    "gateway_group": "DI_DAU",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "ALL_DAY",
    "allow_field_claims": false
  },
  {
    "item_id": "PROG_APPLE_MUSIC_STUDENT",
    "tier": "OFFICIAL_PROGRAM",
    "tier_name": "Chương Trình Chính Thức",
    "badge_label": "GÓI SINH VIÊN — 35K/THÁNG",
    "title": "Apple Music Sinh Viên: Âm Nhạc Lossless 35.000đ/tháng",
    "brand": "Apple",
    "monogram": "AP",
    "color_accent": "#fa243c",
    "category": "Giải trí",
    "scope_text": "Sinh viên các trường ĐH tại Đà Nẵng",
    "audience_target": "Sinh viên các trường đại học cao đẳng",
    "timing_window": "Tối đa 48 tháng",
    "conditions_limit": "Xác thực qua UNiDAYS",
    "observed_at": "2026-08-29 08:00",
    "summary_text": "Apple Music gói sinh viên kèm theo quyền truy cập Apple TV+ miễn phí.",
    "verbatim_quote": "Xác minh sinh viên qua UNiDAYS.",
    "evidence_status": "Chính sách chính thức apple.com/vn/apple-music",
    "official_source_url": "https://www.apple.com/vn/apple-music/",
    "action_type": "CLAIM_OFFICIAL",
    "code_text": null,
    "action_label": "Xem gói Apple Music SV",
    "gateway_group": "DI_DAU",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "ALL_DAY",
    "allow_field_claims": false
  },
  {
    "item_id": "PROG_STARLIGHT_COMBO_10K",
    "tier": "OFFICIAL_PROGRAM",
    "tier_name": "Chương Trình Chính Thức",
    "badge_label": "ƯU ĐÃI THÀNH VIÊN — BẮP NƯỚC 10K",
    "title": "Starlight Cinema: Combo Bắp Nước 10.000đ Thứ 3 Hàng Tuần",
    "brand": "Starlight Cinema",
    "monogram": "SL",
    "color_accent": "#f59e0b",
    "category": "Giải trí",
    "scope_text": "Tầng 4 Tòa nhà Nguyễn Kim, Thanh Khê, Đà Nẵng",
    "audience_target": "Thành viên Starlight và học sinh sinh viên",
    "timing_window": "Thứ 3 hàng tuần",
    "conditions_limit": "Áp dụng khi mua vé xem phim tại rạp",
    "observed_at": "2026-08-29 08:00",
    "summary_text": "Mua vé xem phim kèm combo bắp nước chỉ 10.000đ vào ngày Happy Day.",
    "verbatim_quote": "Áp dụng thành viên Starlight tại quầy vé.",
    "evidence_status": "Bằng chứng niêm yết starlight.vn",
    "official_source_url": "https://starlight.vn/khuyen-mai/combo-bap-nuoc-10k.html",
    "action_type": "VIEW_CONDITIONS",
    "code_text": null,
    "action_label": "Xem thể lệ tại Starlight",
    "gateway_group": "DI_DAU",
    "locality_tag": "THANH_KHE",
    "time_slot_tag": "SLOT_EVENING",
    "allow_field_claims": false
  },
  {
    "item_id": "PROG_GALAXY_CINEMA_HAPPY_DAY",
    "tier": "OFFICIAL_PROGRAM",
    "tier_name": "Chương Trình Chính Thức",
    "badge_label": "NGÀY TRI ÂN — VÉ ĐỒNG GIÁ",
    "title": "Galaxy Cinema Đà Nẵng: Happy Day Vé Đồng Giá Thứ 3",
    "brand": "Galaxy Cinema",
    "monogram": "GLX",
    "color_accent": "#ff6b00",
    "category": "Giải trí",
    "scope_text": "Coop Mart Điện Biên Phủ, Thanh Khê, Đà Nẵng",
    "audience_target": "Khán giả đại chúng và học sinh sinh viên",
    "timing_window": "Thứ 3 hàng tuần",
    "conditions_limit": "Áp dụng cho mọi suất chiếu 2D tiêu chuẩn",
    "observed_at": "2026-08-29 08:00",
    "summary_text": "Vé xem phim 2D đồng giá cho tất cả khách hàng vào ngày Thứ 3 hàng tuần.",
    "verbatim_quote": "Đặt vé trên website hoặc ứng dụng Galaxy Cinema.",
    "evidence_status": "Bằng chứng niêm yết galaxycine.vn",
    "official_source_url": "https://www.galaxycine.vn/khuyen-mai/happy-day/",
    "action_type": "CLAIM_OFFICIAL",
    "code_text": null,
    "action_label": "Xem lịch chiếu Galaxy",
    "gateway_group": "DI_DAU",
    "locality_tag": "THANH_KHE",
    "time_slot_tag": "SLOT_EVENING",
    "allow_field_claims": false
  },
  {
    "item_id": "PROG_COOPMART_STUDENT_CARD",
    "tier": "OFFICIAL_PROGRAM",
    "tier_name": "Chương Trình Chính Thức",
    "badge_label": "TÍCH ĐIỂM TIÊU DÙNG",
    "title": "Co.opmart Đà Nẵng: Chương Trình Thẻ Thành Viên & Điểm Thưởng",
    "brand": "Co.opmart",
    "monogram": "CM",
    "color_accent": "#e11d48",
    "category": "Mua sắm",
    "scope_text": "Co.opmart Bình Thuận & Co.opmart Sơn Trà",
    "audience_target": "Người tiêu dùng, nội trợ, sinh viên",
    "timing_window": "Liên tục",
    "conditions_limit": "Tích điểm bằng số điện thoại hoặc thẻ thành viên",
    "observed_at": "2026-08-29 08:00",
    "summary_text": "Ưu đãi giảm giá hàng tươi sống và đồ dùng thiết yếu vào các ngày lễ hội thành viên.",
    "verbatim_quote": "Đăng ký thẻ miễn phí tại quầy dịch vụ khách hàng.",
    "evidence_status": "Niêm yết tại siêu thị và coopmart.vn",
    "official_source_url": "https://coopmart.vn",
    "action_type": "VIEW_CONDITIONS",
    "code_text": null,
    "action_label": "Xem ưu đãi thành viên",
    "gateway_group": "MUA_SAM",
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "ALL_DAY",
    "allow_field_claims": false
  },
  {
    "item_id": "PROG_SHOPEE_STUDENT_CLUB",
    "tier": "OFFICIAL_PROGRAM",
    "tier_name": "Chương Trình Chính Thức",
    "badge_label": "CÂU LẠC BỘ HỌC SINH SINH VIÊN",
    "title": "Shopee Student Club: Gói Voucher Mua Sắm Dành Cho Sinh Viên",
    "brand": "Shopee Vietnam",
    "monogram": "SHP",
    "color_accent": "#ee4d2d",
    "category": "Mua sắm",
    "scope_text": "Học sinh sinh viên tại TP. Đà Nẵng",
    "audience_target": "Sinh viên xác thực thẻ",
    "timing_window": "Mỗi tháng cấp lại gói voucher",
    "conditions_limit": "Xác minh thẻ sinh viên trên ứng dụng Shopee",
    "observed_at": "2026-08-29 08:00",
    "summary_text": "Gói voucher giảm giá đồ dùng học tập, sách vở và freeship dành riêng cho sinh viên.",
    "verbatim_quote": "Đăng ký tại mục Shopee Sinh Viên trong ứng dụng.",
    "evidence_status": "Chương trình chính thức shopee.vn/m/shopee-student-club",
    "official_source_url": "https://shopee.vn/m/shopee-student-club",
    "action_type": "CLAIM_OFFICIAL",
    "code_text": null,
    "action_label": "Nhận gói voucher Shopee SV",
    "gateway_group": "MUA_SAM",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "ALL_DAY",
    "allow_field_claims": false
  },
  {
    "item_id": "PROG_GRAB_STUDENT_UNLIMITED",
    "tier": "OFFICIAL_PROGRAM",
    "tier_name": "Chương Trình Chính Thức",
    "badge_label": "TIẾT KIỆM DI CHUYỂN & ĂN UỐNG",
    "title": "GrabUnlimited Gói Sinh Viên: Ưu Đãi Di Chuyển & Đặt Món",
    "brand": "Grab Vietnam",
    "monogram": "GRB",
    "color_accent": "#00b14f",
    "category": "Di chuyển",
    "scope_text": "Toàn TP. Đà Nẵng",
    "audience_target": "Sinh viên các trường đại học tại Đà Nẵng",
    "timing_window": "Gói gia hạn hàng tháng",
    "conditions_limit": "Áp dụng cho tài khoản đã xác thực gói sinh viên",
    "observed_at": "2026-08-29 08:00",
    "summary_text": "Giảm giá các chuyến GrabBike đến trường và ưu đãi freeship đồ ăn GrabFood.",
    "verbatim_quote": "Kích hoạt gói thành viên trên ứng dụng Grab.",
    "evidence_status": "Chương trình niêm yết trong ứng dụng Grab",
    "official_source_url": "https://www.grab.com/vn/",
    "action_type": "CLAIM_OFFICIAL",
    "code_text": null,
    "action_label": "Xem ưu đãi trên Grab",
    "gateway_group": "DI_DAU",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "ALL_DAY",
    "allow_field_claims": false
  },
  {
    "item_id": "PROG_BE_STUDENT_PACK",
    "tier": "OFFICIAL_PROGRAM",
    "tier_name": "Chương Trình Chính Thức",
    "badge_label": "ĐỒNG HÀNH HỌC ĐƯỜNG",
    "title": "Be Sinh Viên: Ưu Đãi Đặt Xe beBike Đến Trường",
    "brand": "Be Group",
    "monogram": "BE",
    "color_accent": "#ffc107",
    "category": "Di chuyển",
    "scope_text": "Toàn TP. Đà Nẵng",
    "audience_target": "Học sinh sinh viên tại Đà Nẵng",
    "timing_window": "Áp dụng khung giờ cao điểm đi học",
    "conditions_limit": "Nhập mã định kỳ theo chương trình của Be",
    "observed_at": "2026-08-29 08:00",
    "summary_text": "Giảm giá các chuyến beBike từ KTX, nhà trọ đến các cổng trường đại học.",
    "verbatim_quote": "Xem chi tiết tại mục Ưu đãi trường học trên ứng dụng Be.",
    "evidence_status": "Niêm yết trên be.com.vn",
    "official_source_url": "https://be.com.vn",
    "action_type": "CLAIM_OFFICIAL",
    "code_text": null,
    "action_label": "Xem ưu đãi trên Be",
    "gateway_group": "DI_DAU",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "SLOT_MORNING",
    "allow_field_claims": false
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
    "evidence_status": "Chính sách chính thức fptplay.vn",
    "official_source_url": "https://fptplay.vn",
    "action_type": "CLAIM_OFFICIAL",
    "code_text": null,
    "action_label": "Xem gói cước FPT Play",
    "gateway_group": "DI_DAU",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "ALL_DAY",
    "allow_field_claims": false
  },
  {
    "item_id": "PROG_CGV_CULTURE_DAY",
    "tier": "OFFICIAL_PROGRAM",
    "tier_name": "Chương Trình Chính Thức",
    "badge_label": "NGÀY VĂN HÓA — VÉ 50K",
    "title": "CGV Culture Day: Vé Xem Phim Đồng Giá Thứ Tư Cuối Tháng",
    "brand": "CGV Cinemas",
    "monogram": "CGV",
    "color_accent": "#e11d48",
    "category": "Giải trí",
    "scope_text": "CGV Vĩnh Trung Plaza & CGV Vincom Đà Nẵng",
    "audience_target": "Mọi khán giả yêu điện ảnh",
    "timing_window": "Thứ Tư cuối cùng của mỗi tháng",
    "conditions_limit": "Áp dụng cho tất cả các suất chiếu 2D trong ngày",
    "observed_at": "2026-08-29 08:00",
    "summary_text": "Vé xem phim 2D đồng giá 50.000đ - 65.000đ vào ngày Ngày Văn Hóa hàng tháng.",
    "verbatim_quote": "Xem thông tin tại cgv.vn/default/culture-day.",
    "evidence_status": "Bằng chứng niêm yết chính thức cgv.vn",
    "official_source_url": "https://www.cgv.vn/default/culture-day",
    "action_type": "CLAIM_OFFICIAL",
    "code_text": null,
    "action_label": "Xem thông tin Culture Day",
    "gateway_group": "DI_DAU",
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "SLOT_EVENING",
    "allow_field_claims": false
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
    "evidence_status": "Dữ liệu dịch vụ công • Đối soát danangbus.vn",
    "official_source_url": "https://danangbus.vn",
    "action_type": "VIEW_CONDITIONS",
    "code_text": null,
    "action_label": "Tra cứu tuyến xe & điểm làm vé",
    "gateway_group": "DI_DAU",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "SLOT_MORNING",
    "allow_field_claims": true
  },
  {
    "item_id": "FACILITY_TNGO_BIKE",
    "tier": "CIVIC_FACILITY",
    "tier_name": "Tiện Ích Đô Thị Xác Minh",
    "badge_label": "TIỆN ÍCH CÔNG CỘNG",
    "title": "TNGO: Xe Đạp Công Cộng Đà Nẵng (5.000đ/30 phút)",
    "brand": "TNGO Xe Đạp Đô Thị",
    "monogram": "TNG",
    "color_accent": "#0284c7",
    "category": "Giao thông",
    "scope_text": "Hơn 60 trạm tại Hải Châu, Sơn Trà, Ngũ Hành Sơn",
    "audience_target": "Cư dân, sinh viên dạo phố và du khách",
    "timing_window": "24/7 hàng ngày",
    "conditions_limit": "Mở khóa xe qua ứng dụng TNGO chính thức",
    "observed_at": "2026-08-29 08:00",
    "summary_text": "Hơn 60 trạm xe đạp thông minh khắp các trục đường ven sông Hàn, bờ biển Mỹ Khê và khu đại học.",
    "verbatim_quote": "Tải ứng dụng và tra cứu trạm gần nhất tại tngo.vn",
    "evidence_status": "Dữ liệu hạ tầng công cộng • Đối soát tngo.vn",
    "official_source_url": "https://tngo.vn",
    "action_type": "VIEW_CONDITIONS",
    "code_text": null,
    "action_label": "Xem trạm xe & mở khóa",
    "gateway_group": "DI_DAU",
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "SLOT_AFTERNOON",
    "allow_field_claims": true
  },
  {
    "item_id": "FACILITY_THU_VIEN_TONG_HOP",
    "tier": "CIVIC_FACILITY",
    "tier_name": "Tiện Ích Đô Thị Xác Minh",
    "badge_label": "KHÔNG GIAN HỌC TẬP MIỄN PHÍ",
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
    "evidence_status": "Dịch vụ công văn hóa • Đối soát thuvien.danang.gov.vn",
    "official_source_url": "http://thuvien.danang.gov.vn",
    "action_type": "VIEW_CONDITIONS",
    "code_text": null,
    "action_label": "Xem giờ mở cửa & làm thẻ",
    "gateway_group": "MUA_SAM",
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "SLOT_AFTERNOON",
    "allow_field_claims": true
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
    "evidence_status": "Cổng thông tin hành chính công • 1022.danang.gov.vn",
    "official_source_url": "https://1022.danang.gov.vn",
    "action_type": "VIEW_CONDITIONS",
    "code_text": null,
    "action_label": "Mở cổng tiếp nhận 1022",
    "gateway_group": "MUA_SAM",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "ALL_DAY",
    "allow_field_claims": true
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
    "conditions_limit": "Miễn phí 100%, cấm phương tiện lưu thông trên cầu trong thời gian phun lửa",
    "observed_at": "2026-08-29 08:00",
    "summary_text": "Biểu tượng kiến trúc tự hào của Đà Nẵng, trình diễn phun lửa và phun nước rực rỡ bên bờ sông Hàn.",
    "verbatim_quote": "Lịch phun lửa & phun nước cố định 21h00 thứ Bảy và Chủ Nhật.",
    "evidence_status": "Thông tin văn hóa du lịch chính thức Đà Nẵng",
    "official_source_url": "https://danang.gov.vn",
    "action_type": "VIEW_CONDITIONS",
    "code_text": null,
    "action_label": "Xem lịch trình & góc ngắm đẹp",
    "gateway_group": "DI_DAU",
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "SLOT_EVENING",
    "allow_field_claims": true
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
    "evidence_status": "Địa điểm công cộng xác minh",
    "official_source_url": "https://danang.gov.vn",
    "action_type": "VIEW_CONDITIONS",
    "code_text": null,
    "action_label": "Xem vị trí & đường đi",
    "gateway_group": "DI_DAU",
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "SLOT_AFTERNOON",
    "allow_field_claims": true
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
    "evidence_status": "Địa điểm công cộng xác minh",
    "official_source_url": "https://danang.gov.vn",
    "action_type": "VIEW_CONDITIONS",
    "code_text": null,
    "action_label": "Xem lộ trình phố đi bộ",
    "gateway_group": "DI_DAU",
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "SLOT_EVENING",
    "allow_field_claims": true
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
    "audience_target": "Học sinh sinh viên (vé ưu đãi 30k), nhà nghiên cứu",
    "timing_window": "07:30 – 17:00 hàng ngày",
    "conditions_limit": "Xuất trình thẻ sinh viên để nhận giá vé ưu đãi",
    "observed_at": "2026-08-29 08:00",
    "summary_text": "Nơi lưu giữ bộ sưu tập hiện vật điêu khắc Chăm Pa quy mô nhất thế giới trong không gian kiến trúc Pháp cổ kính.",
    "verbatim_quote": "Cổng thông tin bảo tàng: chammuseum.danang.vn",
    "evidence_status": "Bảo tàng công lập • chammuseum.danang.vn",
    "official_source_url": "http://chammuseum.danang.vn",
    "action_type": "VIEW_CONDITIONS",
    "code_text": null,
    "action_label": "Xem giá vé & giờ tham quan",
    "gateway_group": "DI_DAU",
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "SLOT_MORNING",
    "allow_field_claims": true
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
    "conditions_limit": "Miễn phí vé cho công dân thường trú và HSSV",
    "observed_at": "2026-08-29 08:00",
    "summary_text": "Trưng bày tư liệu lịch sử phát triển đô thị Đà Nẵng từ thời tiền sử đến hiện đại.",
    "verbatim_quote": "Cổng thông tin: baotangdanang.vn",
    "evidence_status": "Bảo tàng công lập • baotangdanang.vn",
    "official_source_url": "https://baotangdanang.vn",
    "action_type": "VIEW_CONDITIONS",
    "code_text": null,
    "action_label": "Xem thông tin trưng bày",
    "gateway_group": "DI_DAU",
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "SLOT_MORNING",
    "allow_field_claims": true
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
    "summary_text": "Bãi biển quyến rũ với bờ cát trắng mịn, nước trong xanh và nhiều tiện ích tập thể thao công cộng miễn phí.",
    "verbatim_quote": "Bãi biển công cộng văn minh, an toàn.",
    "evidence_status": "Địa điểm công cộng xác minh",
    "official_source_url": "https://danang.gov.vn",
    "action_type": "VIEW_CONDITIONS",
    "code_text": null,
    "action_label": "Xem bãi tắm an toàn & trạm cứu hộ",
    "gateway_group": "DI_DAU",
    "locality_tag": "SON_TRA",
    "time_slot_tag": "SLOT_MORNING",
    "allow_field_claims": true
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
    "evidence_status": "Khu bảo tồn thiên nhiên công cộng",
    "official_source_url": "https://danang.gov.vn",
    "action_type": "VIEW_CONDITIONS",
    "code_text": null,
    "action_label": "Xem hướng dẫn an toàn dã ngoại",
    "gateway_group": "DI_DAU",
    "locality_tag": "SON_TRA",
    "time_slot_tag": "SLOT_MORNING",
    "allow_field_claims": true
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
    "evidence_status": "Địa điểm thương mại truyền thống",
    "official_source_url": "https://danang.gov.vn",
    "action_type": "VIEW_CONDITIONS",
    "code_text": null,
    "action_label": "Xem vị trí & gian hàng",
    "gateway_group": "MUA_SAM",
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "SLOT_MORNING",
    "allow_field_claims": true
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
    "evidence_status": "Địa điểm ẩm thực truyền thống",
    "official_source_url": "https://danang.gov.vn",
    "action_type": "VIEW_CONDITIONS",
    "code_text": null,
    "action_label": "Khám phá bản đồ món ăn Chợ Cồn",
    "gateway_group": "AN_GI",
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "SLOT_AFTERNOON",
    "allow_field_claims": true
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
    "evidence_status": "Địa điểm ẩm thực đô thị",
    "official_source_url": "https://danang.gov.vn",
    "action_type": "VIEW_CONDITIONS",
    "code_text": null,
    "action_label": "Xem danh sách quán ngon",
    "gateway_group": "AN_GI",
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "SLOT_MORNING",
    "allow_field_claims": true
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
    "evidence_status": "Địa điểm công cộng xác minh",
    "official_source_url": "https://danang.gov.vn",
    "action_type": "VIEW_CONDITIONS",
    "code_text": null,
    "action_label": "Xem vị trí & không gian",
    "gateway_group": "DI_DAU",
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "SLOT_AFTERNOON",
    "allow_field_claims": true
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
    "evidence_status": "Cơ sở thể thao công lập",
    "official_source_url": "https://danang.gov.vn",
    "action_type": "VIEW_CONDITIONS",
    "code_text": null,
    "action_label": "Xem lịch sự kiện thể thao",
    "gateway_group": "DI_DAU",
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "SLOT_EVENING",
    "allow_field_claims": true
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
    "evidence_status": "Dịch vụ du lịch đường thủy chính thức",
    "official_source_url": "https://danang.gov.vn",
    "action_type": "VIEW_CONDITIONS",
    "code_text": null,
    "action_label": "Xem thông tin xuất bến",
    "gateway_group": "DI_DAU",
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "SLOT_EVENING",
    "allow_field_claims": true
  },
  {
    "item_id": "PLACE_TRUNG_TAM_VAN_HOA_DIEN_ANH",
    "tier": "CIVIC_FACILITY",
    "tier_name": "Tiện Ích Đô Thị Xác Minh",
    "badge_label": "VĂN HÓA NGHỆ THUẬT CỘNG ĐỒNG",
    "title": "Trung Tâm Văn Hóa — Điện Ảnh TP. Đà Nẵng",
    "brand": "Trung Tâm Văn Hóa TP",
    "monogram": "TTVH",
    "color_accent": "#7c3aed",
    "category": "Giải trí",
    "scope_text": "68 Trần Phú, Hải Châu, Đà Nẵng",
    "audience_target": "Cư dân yêu nghệ thuật truyền thống và điện ảnh",
    "timing_window": "08:00 – 21:00 hàng ngày",
    "conditions_limit": "Nhiều chương trình chiếu phim và biểu diễn miễn phí",
    "observed_at": "2026-08-29 08:00",
    "summary_text": "Tổ chức các buổi chiếu phim tài liệu, biểu diễn tuồng, hô hát bài chòi và liên hoan văn nghệ quần chúng.",
    "verbatim_quote": "Đơn vị sự nghiệp văn hóa thuộc Sở VHTT Đà Nẵng.",
    "evidence_status": "Cơ sở văn hóa công lập",
    "official_source_url": "https://danang.gov.vn",
    "action_type": "VIEW_CONDITIONS",
    "code_text": null,
    "action_label": "Xem lịch chiếu phim & biểu diễn",
    "gateway_group": "DI_DAU",
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "SLOT_EVENING",
    "allow_field_claims": true
  },
  {
    "item_id": "RADAR_HIGHLANDS_COFFEE",
    "tier": "RADAR_SOURCE",
    "tier_name": "Nguồn Theo Dõi Định Kỳ",
    "badge_label": "NGUỒN RADAR GIÁM SÁT",
    "title": "Highlands Coffee: Giám Sát Mã Ưu Đãi Đồ Uống",
    "brand": "Highlands Coffee",
    "monogram": "HL",
    "color_accent": "#b91c1c",
    "category": "Ăn uống",
    "scope_text": "Các chi nhánh Highlands Coffee Đà Nẵng",
    "audience_target": "Khách hàng uống cà phê, làm việc",
    "timing_window": "Giám sát định kỳ các đợt phát hành mã",
    "conditions_limit": "Chưa có mã voucher phát hành chính thức hôm nay",
    "observed_at": "2026-08-29 08:00",
    "summary_text": "Theo dõi các đợt tặng mã voucher Freeze và Trà sen vàng trên ứng dụng chính thức.",
    "verbatim_quote": "Kênh chính thức: highlandscoffee.com.vn",
    "evidence_status": "Kênh theo dõi radar tự động",
    "official_source_url": "https://highlandscoffee.com.vn",
    "action_type": "WATCH_MONITOR",
    "code_text": null,
    "action_label": "Theo dõi mở mã ưu đãi",
    "gateway_group": "AN_GI",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "ALL_DAY",
    "allow_field_claims": false
  },
  {
    "item_id": "RADAR_PHUC_LONG",
    "tier": "RADAR_SOURCE",
    "tier_name": "Nguồn Theo Dõi Định Kỳ",
    "badge_label": "NGUỒN RADAR GIÁM SÁT",
    "title": "Phúc Long Coffee & Tea: Giám Sát Ưu Đãi Thành Viên",
    "brand": "Phúc Long Tea",
    "monogram": "PL",
    "color_accent": "#047857",
    "category": "Ăn uống",
    "scope_text": "Phúc Long Bạch Đằng & Nguyễn Văn Linh, Đà Nẵng",
    "audience_target": "Khách hàng trà sữa, sinh viên",
    "timing_window": "Giám sát định kỳ",
    "conditions_limit": "Chưa có mã voucher hôm nay",
    "observed_at": "2026-08-29 08:00",
    "summary_text": "Theo dõi ưu đãi tích điểm và giảm giá trà đào, trà sữa định kỳ hàng tháng.",
    "verbatim_quote": "Kênh chính thức: phuclong.com.vn",
    "evidence_status": "Kênh theo dõi radar tự động",
    "official_source_url": "https://phuclong.com.vn",
    "action_type": "WATCH_MONITOR",
    "code_text": null,
    "action_label": "Theo dõi mở mã ưu đãi",
    "gateway_group": "AN_GI",
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "ALL_DAY",
    "allow_field_claims": false
  },
  {
    "item_id": "RADAR_VINCOM_PLAZA",
    "tier": "RADAR_SOURCE",
    "tier_name": "Nguồn Theo Dõi Định Kỳ",
    "badge_label": "NGUỒN RADAR GIÁM SÁT",
    "title": "Vincom Plaza Ngô Quyền: Giám Sát Lễ Hội Mua Sắm",
    "brand": "Vincom Plaza",
    "monogram": "VC",
    "color_accent": "#dc2626",
    "category": "Mua sắm",
    "scope_text": "910A Ngô Quyền, Sơn Trà, Đà Nẵng",
    "audience_target": "Người mua sắm cuối tuần",
    "timing_window": "Giám sát sự kiện định kỳ",
    "conditions_limit": "Theo từng đợt khuyến mãi của TTTM",
    "observed_at": "2026-08-29 08:00",
    "summary_text": "Theo dõi các sự kiện giảm giá thời trang, mỹ phẩm và ẩm thực tại TTTM Vincom.",
    "verbatim_quote": "Kênh chính thức: vincom.com.vn",
    "evidence_status": "Kênh theo dõi radar tự động",
    "official_source_url": "https://vincom.com.vn",
    "action_type": "WATCH_MONITOR",
    "code_text": null,
    "action_label": "Theo dõi sự kiện mua sắm",
    "gateway_group": "MUA_SAM",
    "locality_tag": "SON_TRA",
    "time_slot_tag": "ALL_DAY",
    "allow_field_claims": false
  },
  {
    "item_id": "RADAR_LOTTE_MART",
    "tier": "RADAR_SOURCE",
    "tier_name": "Nguồn Theo Dõi Định Kỳ",
    "badge_label": "NGUỒN RADAR GIÁM SÁT",
    "title": "Lotte Mart Đà Nẵng: Giám Sát Cẩm Nang Giảm Giá Siêu Thị",
    "brand": "Lotte Mart",
    "monogram": "LM",
    "color_accent": "#e11d48",
    "category": "Mua sắm",
    "scope_text": "Đường 2 Tháng 9, Hòa Cường Bắc, Hải Châu, Đà Nẵng",
    "audience_target": "Người mua sắm gia đình, sinh viên",
    "timing_window": "Cập nhật catalogue 2 tuần/lần",
    "conditions_limit": "Áp dụng theo kỳ cẩm nang siêu thị",
    "observed_at": "2026-08-29 08:00",
    "summary_text": "Theo dõi các đợt giảm giá thực phẩm nhập khẩu, đồ gia dụng và ưu đãi thẻ thành viên Lotte.",
    "verbatim_quote": "Kênh chính thức: lottemart.vn",
    "evidence_status": "Kênh theo dõi radar tự động",
    "official_source_url": "https://www.lottemart.vn",
    "action_type": "WATCH_MONITOR",
    "code_text": null,
    "action_label": "Theo dõi catalogue siêu thị",
    "gateway_group": "MUA_SAM",
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "ALL_DAY",
    "allow_field_claims": false
  },
  {
    "item_id": "RADAR_BIGC_GO_DANANG",
    "tier": "RADAR_SOURCE",
    "tier_name": "Nguồn Theo Dõi Định Kỳ",
    "badge_label": "NGUỒN RADAR GIÁM SÁT",
    "title": "GO! Đà Nẵng (Big C): Giám Sát Giá Rẻ Cho Mọi Nhà",
    "brand": "GO! Đà Nẵng",
    "monogram": "GO",
    "color_accent": "#dc2626",
    "category": "Mua sắm",
    "scope_text": "Vĩnh Trung Plaza, 255 Hùng Vương, Thanh Khê, Đà Nẵng",
    "audience_target": "Người tiêu dùng, sinh viên mua sắm tiết kiệm",
    "timing_window": "Giám sát khuyến mãi hàng tuần",
    "conditions_limit": "Áp dụng tại đại siêu thị GO! Đà Nẵng",
    "observed_at": "2026-08-29 08:00",
    "summary_text": "Theo dõi giá ưu đãi hàng tiêu dùng nhanh, thực phẩm thiết yếu và chương trình trợ giá cho sinh viên.",
    "verbatim_quote": "Kênh chính thức: go-vietnam.vn",
    "evidence_status": "Kênh theo dõi radar tự động",
    "official_source_url": "https://go-vietnam.vn",
    "action_type": "WATCH_MONITOR",
    "code_text": null,
    "action_label": "Theo dõi giá ưu đãi GO!",
    "gateway_group": "MUA_SAM",
    "locality_tag": "THANH_KHE",
    "time_slot_tag": "ALL_DAY",
    "allow_field_claims": false
  },
  {
    "item_id": "RADAR_KICHI_KICHI",
    "tier": "RADAR_SOURCE",
    "tier_name": "Nguồn Theo Dõi Định Kỳ",
    "badge_label": "NGUỒN RADAR GIÁM SÁT",
    "title": "Kichi-Kichi Lẩu Băng Chuyền: Giám Sát Ưu Đãi Nhóm & HSSV",
    "brand": "Kichi-Kichi",
    "monogram": "KK",
    "color_accent": "#e11d48",
    "category": "Ăn uống",
    "scope_text": "Vincom & Nguyễn Văn Linh, Đà Nẵng",
    "audience_target": "Nhóm bạn, sinh viên, liên hoan",
    "timing_window": "Giám sát chương trình đi 4 tặng 1",
    "conditions_limit": "Áp dụng theo đợt phát hành mã của Golden Gate",
    "observed_at": "2026-08-29 08:00",
    "summary_text": "Theo dõi các đợt tặng voucher buffet lẩu và chương trình ưu đãi cho học sinh sinh viên.",
    "verbatim_quote": "Kênh chính thức: kichi.com.vn",
    "evidence_status": "Kênh theo dõi radar tự động",
    "official_source_url": "https://kichi.com.vn",
    "action_type": "WATCH_MONITOR",
    "code_text": null,
    "action_label": "Theo dõi ưu đãi buffet lẩu",
    "gateway_group": "AN_GI",
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "SLOT_LUNCH",
    "allow_field_claims": false
  },
  {
    "item_id": "RADAR_GOGI_HOUSE",
    "tier": "RADAR_SOURCE",
    "tier_name": "Nguồn Theo Dõi Định Kỳ",
    "badge_label": "NGUỒN RADAR GIÁM SÁT",
    "title": "Gogi House Quán Thịt Nướng Hàn Quốc: Giám Sát Voucher Nướng",
    "brand": "Gogi House",
    "monogram": "GG",
    "color_accent": "#b45309",
    "category": "Ăn uống",
    "scope_text": "Nguyễn Tri Phương & Lotte Mart, Đà Nẵng",
    "audience_target": "Gia đình, nhóm sinh viên tụ họp",
    "timing_window": "Giám sát định kỳ",
    "conditions_limit": "Áp dụng khi có mã ưu đãi phát hành",
    "observed_at": "2026-08-29 08:00",
    "summary_text": "Theo dõi các chương trình tặng voucher thịt nướng và giảm giá combo nướng chuẩn vị Hàn Quốc.",
    "verbatim_quote": "Kênh chính thức: gogi.com.vn",
    "evidence_status": "Kênh theo dõi radar tự động",
    "official_source_url": "https://gogi.com.vn",
    "action_type": "WATCH_MONITOR",
    "code_text": null,
    "action_label": "Theo dõi voucher thịt nướng",
    "gateway_group": "AN_GI",
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "SLOT_EVENING",
    "allow_field_claims": false
  },
  {
    "item_id": "RADAR_THE_COFFEE_HOUSE",
    "tier": "RADAR_SOURCE",
    "tier_name": "Nguồn Theo Dõi Định Kỳ",
    "badge_label": "NGUỒN RADAR GIÁM SÁT",
    "title": "The Coffee House: Giám Sát Ưu Đãi Mua 2 Tặng 1 & Freeship",
    "brand": "The Coffee House",
    "monogram": "TCH",
    "color_accent": "#ea580c",
    "category": "Ăn uống",
    "scope_text": "Nguyễn Văn Linh, Trần Phú, Pasteur Đà Nẵng",
    "audience_target": "Sinh viên học nhóm, nhân viên văn phòng",
    "timing_window": "Giám sát chương trình trên ứng dụng Nhà",
    "conditions_limit": "Áp dụng theo từng voucher trong ví ứng dụng",
    "observed_at": "2026-08-29 08:00",
    "summary_text": "Theo dõi các đợt phát voucher giảm 50% và freeship khi đặt cà phê qua ứng dụng The Coffee House.",
    "verbatim_quote": "Kênh chính thức: thecoffeehouse.com",
    "evidence_status": "Kênh theo dõi radar tự động",
    "official_source_url": "https://thecoffeehouse.com",
    "action_type": "WATCH_MONITOR",
    "code_text": null,
    "action_label": "Theo dõi ưu đãi trên ứng dụng",
    "gateway_group": "AN_GI",
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "SLOT_MORNING",
    "allow_field_claims": false
  },
  {
    "item_id": "RADAR_TRUNG_NGUYEN_LEGEND",
    "tier": "RADAR_SOURCE",
    "tier_name": "Nguồn Theo Dõi Định Kỳ",
    "badge_label": "NGUỒN RADAR GIÁM SÁT",
    "title": "Trung Nguyên Legend: Giám Sát Không Gian Cà Phê Năng Lượng",
    "brand": "Trung Nguyên Legend",
    "monogram": "TN",
    "color_accent": "#78350f",
    "category": "Ăn uống",
    "scope_text": "Bạch Đằng, Nguyễn Thị Minh Khai, Đà Nẵng",
    "audience_target": "Người đọc sách, làm việc, đàm đạo",
    "timing_window": "Giám sát định kỳ",
    "conditions_limit": "Áp dụng theo chương trình từng chi nhánh",
    "observed_at": "2026-08-29 08:00",
    "summary_text": "Theo dõi các sự kiện tặng sách đổi đời và ưu đãi cà phê phin truyền thống bên sông Hàn.",
    "verbatim_quote": "Kênh chính thức: trungnguyenlegend.com",
    "evidence_status": "Kênh theo dõi radar tự động",
    "official_source_url": "https://trungnguyenlegend.com",
    "action_type": "WATCH_MONITOR",
    "code_text": null,
    "action_label": "Theo dõi không gian cà phê",
    "gateway_group": "AN_GI",
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "SLOT_MORNING",
    "allow_field_claims": false
  },
  {
    "item_id": "RADAR_MIXUE_DANANG",
    "tier": "RADAR_SOURCE",
    "tier_name": "Nguồn Theo Dõi Định Kỳ",
    "badge_label": "NGUỒN RADAR GIÁM SÁT",
    "title": "Mixue Đà Nẵng: Giám Sát Ưu Đãi Kem & Trà Trái Cây 10K",
    "brand": "Mixue Vietnam",
    "monogram": "MX",
    "color_accent": "#dc2626",
    "category": "Ăn uống",
    "scope_text": "Các cơ sở Mixue gần cổng trường học Đà Nẵng",
    "audience_target": "Học sinh, sinh viên",
    "timing_window": "Giám sát theo mùa",
    "conditions_limit": "Giá niêm yết tại quầy",
    "observed_at": "2026-08-29 08:00",
    "summary_text": "Theo dõi các chương trình trà kem tươi đồng giá và tặng quà linh vật Mixue cho học sinh sinh viên.",
    "verbatim_quote": "Kênh chính thức: mxbc.vn",
    "evidence_status": "Kênh theo dõi radar tự động",
    "official_source_url": "https://mxbc.vn",
    "action_type": "WATCH_MONITOR",
    "code_text": null,
    "action_label": "Theo dõi ưu đãi kem Mixue",
    "gateway_group": "AN_GI",
    "locality_tag": "TOAN_DANANG",
    "time_slot_tag": "SLOT_AFTERNOON",
    "allow_field_claims": false
  },
  {
    "item_id": "RADAR_CGV_VINCOM_SCHEDULE",
    "tier": "RADAR_SOURCE",
    "tier_name": "Nguồn Theo Dõi Định Kỳ",
    "badge_label": "NGUỒN RADAR GIÁM SÁT",
    "title": "CGV Vincom Đà Nẵng: Giám Sát Lịch Chiếu & Suất Chiếu Sớm",
    "brand": "CGV Cinemas",
    "monogram": "CGV",
    "color_accent": "#e11d48",
    "category": "Giải trí",
    "scope_text": "Tầng 4 Vincom Plaza, Ngô Quyền, Sơn Trà, Đà Nẵng",
    "audience_target": "Khán giả phim ảnh",
    "timing_window": "Giám sát lịch chiếu hàng ngày",
    "conditions_limit": "Theo lịch chiếu rạp CGV",
    "observed_at": "2026-08-29 08:00",
    "summary_text": "Theo dõi lịch chiếu phim bom tấn, suất chiếu sớm Sneak Show và ưu đãi vé xem phim tại CGV Vincom.",
    "verbatim_quote": "Kênh chính thức: cgv.vn",
    "evidence_status": "Kênh theo dõi radar tự động",
    "official_source_url": "https://www.cgv.vn",
    "action_type": "WATCH_MONITOR",
    "code_text": null,
    "action_label": "Xem lịch chiếu rạp Vincom",
    "gateway_group": "DI_DAU",
    "locality_tag": "SON_TRA",
    "time_slot_tag": "SLOT_EVENING",
    "allow_field_claims": false
  },
  {
    "item_id": "RADAR_GALAXY_DIEN_BIEN_PHU",
    "tier": "RADAR_SOURCE",
    "tier_name": "Nguồn Theo Dõi Định Kỳ",
    "badge_label": "NGUỒN RADAR GIÁM SÁT",
    "title": "Galaxy Điện Biên Phủ: Giám Sát Suất Chiếu & Combo Bắp Nước",
    "brand": "Galaxy Cinema",
    "monogram": "GLX",
    "color_accent": "#ff6b00",
    "category": "Giải trí",
    "scope_text": "478 Điện Biên Phủ, Thanh Khê, Đà Nẵng",
    "audience_target": "HSSV khu vực Thanh Khê, Liên Chiểu",
    "timing_window": "Giám sát lịch chiếu định kỳ",
    "conditions_limit": "Theo quy định cụm rạp",
    "observed_at": "2026-08-29 08:00",
    "summary_text": "Theo dõi bảng giá vé HSSV 45k và các combo ưu đãi xem phim cuối tuần tại rạp Galaxy.",
    "verbatim_quote": "Kênh chính thức: galaxycine.vn",
    "evidence_status": "Kênh theo dõi radar tự động",
    "official_source_url": "https://www.galaxycine.vn",
    "action_type": "WATCH_MONITOR",
    "code_text": null,
    "action_label": "Theo dõi suất chiếu Galaxy",
    "gateway_group": "DI_DAU",
    "locality_tag": "THANH_KHE",
    "time_slot_tag": "SLOT_EVENING",
    "allow_field_claims": false
  },
  {
    "item_id": "RADAR_CGV_VINH_TRUNG_PLAZA",
    "tier": "RADAR_SOURCE",
    "tier_name": "Nguồn Theo Dõi Định Kỳ",
    "badge_label": "NGUỒN RADAR GIÁM SÁT",
    "title": "CGV Vĩnh Trung Plaza: Giám Sát Vé Suất Chiếu Trưa & Tối",
    "brand": "CGV Cinemas",
    "monogram": "CGV",
    "color_accent": "#e11d48",
    "category": "Giải trí",
    "scope_text": "255 Hùng Vương, Thanh Khê, Đà Nẵng",
    "audience_target": "Khán giả trung tâm thành phố",
    "timing_window": "Giám sát hàng ngày",
    "conditions_limit": "Theo quy định cụm rạp",
    "observed_at": "2026-08-29 08:00",
    "summary_text": "Theo dõi các suất chiếu giá ưu đãi ngày trong tuần và sự kiện ra mắt phim tại CGV Vĩnh Trung.",
    "verbatim_quote": "Kênh chính thức: cgv.vn",
    "evidence_status": "Kênh theo dõi radar tự động",
    "official_source_url": "https://www.cgv.vn",
    "action_type": "WATCH_MONITOR",
    "code_text": null,
    "action_label": "Xem lịch chiếu Vĩnh Trung",
    "gateway_group": "DI_DAU",
    "locality_tag": "THANH_KHE",
    "time_slot_tag": "SLOT_AFTERNOON",
    "allow_field_claims": false
  },
  {
    "item_id": "RADAR_HELIO_CENTER_WEEKEND",
    "tier": "RADAR_SOURCE",
    "tier_name": "Nguồn Theo Dõi Định Kỳ",
    "badge_label": "NGUỒN RADAR GIÁM SÁT",
    "title": "Helio Center: Giám Sát Chợ Đêm & Sự Kiện Âm Nhạc Cuối Tuần",
    "brand": "Helio Center",
    "monogram": "HLIO",
    "color_accent": "#f59e0b",
    "category": "Đi chơi",
    "scope_text": "Đường 2 Tháng 9, Hòa Cường Nam, Hải Châu, Đà Nẵng",
    "audience_target": "Thanh thiếu niên, gia đình dạo chơi tối",
    "timing_window": "Giám sát sự kiện Thứ 6, Thứ 7, Chủ Nhật",
    "conditions_limit": "Vào cửa tự do khu chợ đêm",
    "observed_at": "2026-08-29 08:00",
    "summary_text": "Theo dõi các đêm nhạc Acoustic miễn phí, lễ hội ẩm thực đường phố và ưu đãi nạp thẻ game tại Helio.",
    "verbatim_quote": "Kênh chính thức: helio.vn",
    "evidence_status": "Kênh theo dõi radar tự động",
    "official_source_url": "https://helio.vn",
    "action_type": "WATCH_MONITOR",
    "code_text": null,
    "action_label": "Theo dõi sự kiện Chợ Đêm Helio",
    "gateway_group": "DI_DAU",
    "locality_tag": "HAI_CHAU",
    "time_slot_tag": "SLOT_EVENING",
    "allow_field_claims": false
  }
];

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

// Application State
let activeView = 'HOME'; // HOME | EXPLORE | VOUCHERS | BUY_DECISION | SAVED
let activeGateway = 'ALL'; // ALL | AN_GI | DI_DAU | MUA_SAM
let activeLocality = 'ALL'; // ALL | HAI_CHAU | THANH_KHE | SON_TRA | NGU_HANH_SON | HOA_KHANH | CAM_LE
let activeTier = 'ALL'; // ALL | VERIFIED_DEAL | OFFICIAL_PROGRAM | CIVIC_FACILITY | RADAR_SOURCE
let activeTimeSlot = 'ALL';
let currentTheme = 'light';
let savedItemIds = new Set();

try {
  if (typeof localStorage !== 'undefined') {
    const storedSaved = localStorage.getItem('jayt_saved_opportunities');
    if (storedSaved) savedItemIds = new Set(JSON.parse(storedSaved));
    const storedTheme = localStorage.getItem('jayt_theme_mode');
    if (storedTheme) currentTheme = storedTheme;
  }
} catch (e) {}

// ==========================================================================
// RENDER HELPERS & COMPONENTS
// ==========================================================================

function showToast(msg) {
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

function showCopyToast(msg) {
  showToast(msg);
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
  } else if (item.tier === 'OFFICIAL_PROGRAM') {
    tierKicker = 'Quyền lợi học đường';
    tierCardClass = 'card-tier-program';
    actionLabel = 'Xem điều kiện nhận &rarr;';
    secondaryMeta = 'Dành cho Học sinh / Sinh viên';
  } else if (item.tier === 'CIVIC_FACILITY') {
    tierKicker = 'Tiện ích công cộng';
    tierCardClass = 'card-tier-facility';
    secondaryMeta = 'Phục vụ cư dân & sinh viên';
    if (item.item_id === 'FACILITY_DANABUS') actionLabel = 'Xem lộ trình xe buýt &rarr;';
    else if (item.item_id === 'FACILITY_TNGO_BIKE') actionLabel = 'Xem vị trí trạm xe &rarr;';
    else if (item.item_id === 'FACILITY_THU_VIEN_TONG_HOP') actionLabel = 'Xem giờ mở cửa &rarr;';
    else if (item.item_id === 'FACILITY_DVC_DANANG') actionLabel = 'Tra cứu dịch vụ công &rarr;';
    else actionLabel = 'Xem hướng dẫn & địa điểm &rarr;';
  } else if (item.tier === 'RADAR_SOURCE') {
    tierKicker = 'Kênh theo dõi';
    tierCardClass = 'card-tier-radar';
    actionLabel = 'Xem kênh chính thức &nearr;';
    secondaryMeta = 'Giám sát định kỳ';
  }

  return `
    <article class="editorial-card ${tierCardClass} editorial-card-bl" id="card-${item.item_id}">
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

      <div class="card-content">
        <h3 class="card-title">${item.title}</h3>
        <p class="card-summary">${item.summary_text}</p>
        <div class="card-meta-chips">
          <span class="meta-chip">📍 ${item.locality_tag === 'TOAN_DANANG' ? 'Toàn TP. Đà Nẵng' : item.locality_tag}</span>
          <span class="meta-chip">ℹ️ ${secondaryMeta}</span>
        </div>
      </div>

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

function renderSpotlightLargeCard(item) {
  return `
    <div class="city-note-card-bq" tabindex="0" role="region" aria-label="Daily Pick Ưu Đãi Đà Nẵng">
      <div class="city-note-badge">
        <span class="city-note-pulse"></span>
        <span class="city-note-tag">DAILY PICK &bull; CGV VNPAY</span>
      </div>
      <h3 class="city-note-title">${item.title}</h3>
      <p class="city-note-fact">T6, T7, CN tại các rạp CGV Đà Nẵng qua VNPAY.</p>
      <div class="city-note-action">
        <button class="btn-city-note-cta" data-card-detail="${item.item_id}">
          Xem lịch rạp &rarr;
        </button>
        <a href="${item.official_source_url}" target="_blank" rel="noopener noreferrer" class="city-note-src">
          cgv.vn &nearr;
        </a>
      </div>
    </div>
  `;
}

function getCurrentTimeSlotInfo() {
  const hour = (typeof window !== 'undefined' && window.JAYT_TEST_HOUR !== undefined) 
    ? window.JAYT_TEST_HOUR 
    : new Date().getHours();
  
  if (hour >= 5 && hour < 11) {
    return {
      slot: 'SLOT_MORNING',
      label: 'Sáng nay',
      greeting: 'Chào buổi sáng Đà Nẵng',
      kicker: '🌅 SÁNG NAY CHỌN GÌ?',
      filterSlot: 'SLOT_MORNING'
    };
  } else if (hour >= 11 && hour < 14) {
    return {
      slot: 'SLOT_LUNCH',
      label: 'Trưa nay',
      greeting: 'Bữa trưa tiếp năng lượng',
      kicker: '🍜 TRƯA NAY ĂN GÌ?',
      filterSlot: 'SLOT_LUNCH'
    };
  } else if (hour >= 14 && hour < 18) {
    return {
      slot: 'SLOT_AFTERNOON',
      label: 'Chiều nay',
      greeting: 'Khám phá chiều mát Đà Nẵng',
      kicker: '☕ CHIỀU NAY ĐI ĐÂU?',
      filterSlot: 'SLOT_AFTERNOON'
    };
  } else {
    return {
      slot: 'SLOT_EVENING',
      label: 'Tối nay',
      greeting: 'Đêm Đà Nẵng lung linh',
      kicker: '🎯 TỐI NAY CHỌN GÌ?',
      filterSlot: 'SLOT_EVENING'
    };
  }
}

// 1. HOME VIEW (CINEMATIC ARRIVAL BQ — TIME-AWARE COMMUNITY OS)
function renderDailyGuideHome() {
  const timeInfo = getCurrentTimeSlotInfo();
  const verifiedDeals = JAYT_DISCOVERY_ITEMS.filter(i => i.tier === 'VERIFIED_DEAL');
  const facilityItems = JAYT_DISCOVERY_ITEMS.filter(i => i.tier === 'CIVIC_FACILITY');
  const officialItems = JAYT_DISCOVERY_ITEMS.filter(i => i.tier === 'OFFICIAL_PROGRAM');
  const radarItems = JAYT_DISCOVERY_ITEMS.filter(i => i.tier === 'RADAR_SOURCE');

  return `
    <div class="home-guide-layout-bq">
      <!-- 1. CINEMATIC DA NANG ARRIVAL HERO -->
      <section class="hero-cinematic-arrival-bq" aria-label="Hero Cẩm Nang Thành Phố Đà Nẵng">
        <div class="hero-cinematic-stage">
          <img 
            src="assets/images/dragon_bridge_hero_001.jpg" 
            alt="Ảnh chụp toàn cảnh Cầu Rồng bắc qua Sông Hàn rực rỡ tại trung tâm TP. Đà Nẵng" 
            class="hero-dragon-bridge-img-bq" 
            id="hero-main-photo"
            loading="eager"
          />
          <div class="hero-cinematic-scrim"></div>
          
          <div class="hero-compact-credit-tag" tabindex="0" role="note" aria-label="Thông tin bản quyền ảnh Cầu Rồng">
            📍 Cầu Rồng &bull; 📷 Bùi Thụy Đào Nguyên (CC BY-SA 3.0)
          </div>
        </div>

        <div class="hero-cinematic-overlay-content">
          <div class="hero-cinematic-quiet-space">
            <h1 class="hero-cinematic-headline">
              Đà Nẵng, Chọn Điều Hay Hôm Nay
            </h1>
            <p class="hero-cinematic-subcopy">
              Cẩm nang sống & khám phá thành phố đáng sống (Community OS) &bull; ${timeInfo.greeting}.
            </p>

            <div class="hero-cinematic-controls">
              <button class="cinematic-text-affordance active" data-quick-slot="${timeInfo.slot}">${timeInfo.label}</button>
              <span class="affordance-separator">&bull;</span>
              <button class="cinematic-text-affordance" data-quick-loc="HAI_CHAU">Gần bạn</button>
              <span class="affordance-separator">&bull;</span>
              <button class="cinematic-text-affordance" data-quick-budget="UNDER_100K">Khám phá</button>
              <button class="btn-cinematic-filter-icon" id="btn-trigger-filter-drawer" aria-label="Mở bộ lọc chi tiết" title="Mở bộ lọc chi tiết">
                <span>⚡</span>
              </button>
            </div>
          </div>

          <div class="hero-city-note-slot">
            ${verifiedDeals.map(item => renderSpotlightLargeCard(item)).join('')}
          </div>
        </div>
      </section>

      <!-- 2. 3 LARGE VISUAL ROUTES -->
      <section class="section-city-routes-bn" aria-label="3 Lộ Trình Khám Phá">
        <div class="section-header-editorial">
          <span class="section-kicker kicker-deal">${timeInfo.kicker}</span>
          <h2 class="section-title-editorial">Khám Phá Theo Nhu Cầu Của Bạn</h2>
        </div>

        <div class="city-routes-grid-bn">
          <div class="city-route-card-bn route-food" role="button" tabindex="0" data-gateway-target="AN_GI">
            <div class="route-icon-box">🍔</div>
            <div class="route-info-box">
              <span class="route-tag-pill">ẨM THỰC ĐÀ THÀNH</span>
              <h3 class="route-headline">Ăn ngon gần đây</h3>
              <p class="route-subcopy">Bữa tối phố Huỳnh Thúc Kháng, Chợ Cồn, gà giòn, pizza và trà sữa học sinh sinh viên.</p>
              <span class="route-action-link">Khám phá ẩm thực &rarr;</span>
            </div>
          </div>

          <div class="city-route-card-bn route-places" role="button" tabindex="0" data-gateway-target="DI_DAU">
            <div class="route-icon-box">🎬</div>
            <div class="route-info-box">
              <span class="route-tag-pill">GIẢI TRÍ & ĐI LẠI</span>
              <h3 class="route-headline">Đi chơi sau giờ học & làm</h3>
              <p class="route-subcopy">Suất chiếu CGV/Metiz, dạo Cầu Rồng, bờ Sông Hàn và mạng lưới xe buýt DanaBus.</p>
              <span class="route-action-link">Xem lịch rạp & đường đi &rarr;</span>
            </div>
          </div>

          <div class="city-route-card-bn route-tools" role="button" tabindex="0" data-gateway-target="MUA_SAM">
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

      <!-- 3. TIỆN ÍCH ĐÔ THỊ ĐÀ NẴNG -->
      <section class="section-editorial-rail" aria-label="Đi Gần Bạn — Tiện Ích Đô Thị">
        <div class="section-header-editorial">
          <span class="section-kicker kicker-fac">📍 ĐI GẦN BẠN — ĐỊA ĐIỂM ĐÔ THỊ</span>
          <h2 class="section-title-editorial">Tiện Ích & Dịch Vụ Công TP. Đà Nẵng</h2>
        </div>
        <div class="cards-layout-grid">
          ${facilityItems.slice(0, 4).map(item => renderEditorialCardWithPhoto(item)).join('')}
        </div>
      </section>

      <!-- 4. HAI CỔNG DESTINATIONS (BUY DECISION & VOUCHERS) -->
      <section class="feature-destinations-section">
        <div class="destination-card dest-buy" data-nav="BUY_DECISION" role="button" tabindex="0">
          <span class="dest-badge">TRA CỨU TRƯỚC KHI CHI TIÊU</span>
          <h3 class="dest-title">Mua món này có hời không?</h3>
          <p class="dest-sub">Kiểm định giá thực, phí ẩn và chính sách đổi trả trước khi thanh toán. Trả lời trung thực khi chưa đủ dữ liệu đối soát.</p>
          <span class="dest-cta">Mở công cụ kiểm tra giá thực &rarr;</span>
        </div>

        <div class="destination-card dest-voucher" data-nav="VOUCHERS" role="button" tabindex="0">
          <span class="dest-badge">KHO MÃ ƯU ĐÃI CHÍNH THỨC</span>
          <h3 class="dest-title">Ví Ưu Đãi & Voucher JayT</h3>
          <p class="dest-sub">Tổng hợp các mã ưu đãi chính thức có thể lệ rõ ràng, sao chép mã thật hoặc nhận tại trang gốc.</p>
          <span class="dest-cta">Mở Ví Ưu Đãi &rarr;</span>
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

      <!-- 6. RADAR THEO DÕI NGUỒN -->
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
    </div>
  `;
}

// 2. EXPLORE DIRECTORY VIEW (50 ITEMS TIERED)
function filterDirectoryItems() {
  return JAYT_DISCOVERY_ITEMS.filter(item => {
    if (activeGateway !== 'ALL' && item.gateway_group !== activeGateway) return false;
    if (activeLocality !== 'ALL' && item.locality_tag !== activeLocality && item.locality_tag !== 'TOAN_DANANG') return false;
    if (activeTier !== 'ALL' && item.tier !== activeTier) return false;
    return true;
  });
}

function renderExploreDirectory() {
  const filtered = filterDirectoryItems();

  return `
    <div class="explore-directory-layout">
      <div class="directory-header">
        <h1 class="directory-title">Khám Phá Toàn Diện Tiện Ích Đà Nẵng</h1>
        <p class="directory-sub">Nguồn cung 50 nội dung/ngày phân tầng minh bạch theo 4 Tiers kiểm định chất lượng.</p>

        <!-- Category Gateways Bar -->
        <div class="explore-gateways-bar directory-filters-bar">
          <button class="exp-gateway-btn ${activeGateway === 'ALL' ? 'active' : ''}" data-exp-gw="ALL">Tất cả (50)</button>
          <button class="exp-gateway-btn ${activeGateway === 'AN_GI' ? 'active' : ''}" data-exp-gw="AN_GI">🍔 Ăn uống</button>
          <button class="exp-gateway-btn ${activeGateway === 'DI_DAU' ? 'active' : ''}" data-exp-gw="DI_DAU">🗺️ Đi chơi & Giải trí</button>
          <button class="exp-gateway-btn ${activeGateway === 'MUA_SAM' ? 'active' : ''}" data-exp-gw="MUA_SAM">🛍️ Học tập & Mua sắm</button>
        </div>

        <!-- District Locality Bar -->
        <div class="explore-locality-bar">
          <span class="loc-bar-label">Quận:</span>
          <button class="exp-loc-pill ${activeLocality === 'ALL' ? 'active' : ''}" data-exp-loc="ALL">Toàn Đà Nẵng</button>
          <button class="exp-loc-pill ${activeLocality === 'HAI_CHAU' ? 'active' : ''}" data-exp-loc="HAI_CHAU">Hải Châu</button>
          <button class="exp-loc-pill ${activeLocality === 'THANH_KHE' ? 'active' : ''}" data-exp-loc="THANH_KHE">Thanh Khê</button>
          <button class="exp-loc-pill ${activeLocality === 'SON_TRA' ? 'active' : ''}" data-exp-loc="SON_TRA">Sơn Trà</button>
          <button class="exp-loc-pill ${activeLocality === 'NGU_HANH_SON' ? 'active' : ''}" data-exp-loc="NGU_HANH_SON">Ngũ Hành Sơn</button>
          <button class="exp-loc-pill ${activeLocality === 'HOA_KHANH' ? 'active' : ''}" data-exp-loc="HOA_KHANH">Liên Chiểu / Hòa Khánh</button>
          <button class="exp-loc-pill ${activeLocality === 'CAM_LE' ? 'active' : ''}" data-exp-loc="CAM_LE">Cẩm Lệ</button>
        </div>
      </div>

      <!-- Results Grid -->
      <div class="directory-results-container">
        ${filtered.length > 0 ? `
          <div class="cards-layout-grid">
            ${filtered.map(item => renderEditorialCardWithPhoto(item)).join('')}
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

// 3. VOUCHER WALLET VIEW (SECTION BS INTEGRATION)
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
      <section class="wallet-hero-section">
        <div class="wallet-header-editorial">
          <span class="section-kicker kicker-deal">🎟️ VÍ ƯU ĐÃI & VOUCHER JAYT</span>
          <h1 class="wallet-headline">Săn Ưu Đãi Thật Tại Đà Nẵng</h1>
          <p class="wallet-subcopy">Tổng hợp mã khuyến mãi, đặc quyền học đường và ưu đãi đô thị đã đối soát 100% nguồn gốc.</p>
        </div>

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

      <section class="wallet-grid-section">
        <div class="voucher-tickets-grid" id="voucher-tickets-grid">
          ${otherVouchers.map(v => renderVoucherCard(v)).join('')}
        </div>
      </section>
    </div>
  `;
}

// 4. BUY DECISION HUB VIEW (M3)
function renderBuyDecisionHub() {
  return `
    <div class="buy-decision-page">
      <div class="decision-hero">
        <span class="decision-tag">JAYT VALUE-FIRST DECISION HUB</span>
        <h1 class="decision-title">Mua món này có hời không?</h1>
        <p class="decision-sub">Công cụ tra cứu và đánh giá sự minh bạch của giá bán trước khi bạn đưa ra quyết định chi tiêu.</p>
        
        <div class="decision-search-box">
          <input type="text" id="input-check-deal" placeholder="Nhập tên khóa học, sản phẩm số, gói dịch vụ cần kiểm tra..." />
          <button id="btn-submit-check" class="btn-modal-primary">Kiểm tra ngay</button>
        </div>
      </div>

      <div class="decision-truth-card">
        <div class="truth-card-header">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d97706" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
          <h3>Trạng thái kiểm định: Chưa đủ dữ liệu để kết luận Mua / Chờ</h3>
        </div>
        <p class="truth-card-body">Theo Quy chế Data Truth JAYT-245: JayT chỉ đưa ra phán quyết "NÊN MUA" hoặc "NÊN CHỜ" khi đã thu thập đủ 6 bằng chứng kiểm định: (1) Giá thực trả cuối cùng, (2) Lịch sử giá thị trường tối thiểu 30 ngày, (3) Chính sách bảo hành, (4) Điều kiện sử dụng rõ ràng, (5) Không chứa hoa hồng tiếp thị ngầm, (6) Bằng chứng đối soát độc lập.</p>
      </div>
    </div>
  `;
}

// 5. SAVED VIEW (LOCAL BOOKMARKS)
function renderSavedView() {
  const savedItems = JAYT_DISCOVERY_ITEMS.filter(item => savedItemIds.has(item.item_id));

  return `
    <div class="saved-view-layout">
      <div class="directory-header">
        <h1 class="directory-title">Tiện Ích Đã Lưu Của Bạn</h1>
        <p class="directory-sub">Danh sách các quyền lợi, địa điểm và ưu đãi bạn đã đánh dấu trên thiết bị này.</p>
      </div>

      <div class="directory-results-container">
        ${savedItems.length > 0 ? `
          <div class="cards-layout-grid">
            ${savedItems.map(item => renderEditorialCardWithPhoto(item)).join('')}
          </div>
        ` : `
          <div class="empty-state-box">
            <h3>Chưa có tiện ích nào được lưu</h3>
            <p>Nhấn biểu tượng dấu trang trên các thẻ tiện ích để lưu lại và truy cập nhanh khi cần.</p>
            <button class="btn-modal-primary" data-nav="EXPLORE">Khám phá tiện ích ngay</button>
          </div>
        `}
      </div>
    </div>
  `;
}

// ==========================================================================
// APP SHELL & EVENT DISPATCHER
// ==========================================================================

function renderAppShell() {
  if (typeof document === 'undefined') return;
  const root = document.getElementById('jayt-app-root');
  if (!root) return;

  root.innerHTML = `
    <div class="jayt-app-shell theme-${currentTheme}">
      <header class="jayt-header-sticky" role="banner">
        <div class="header-inner">
          <div class="brand-lockup" role="button" tabindex="0" data-nav="HOME" aria-label="Về trang chủ JayT">
            <svg class="jflow-header-logo" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
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
              <span class="brand-tagline">Community OS &bull; v3.426.0-staging.bt</span>
            </div>
          </div>

          <nav class="nav-links-desktop" role="navigation" aria-label="Điều hướng chính">
            <button class="nav-btn ${activeView === 'HOME' ? 'active' : ''}" data-nav="HOME">Hôm nay</button>
            <button class="nav-btn ${activeView === 'EXPLORE' ? 'active' : ''}" data-nav="EXPLORE">Khám phá (50)</button>
            <button class="nav-btn ${activeView === 'VOUCHERS' ? 'active' : ''}" data-nav="VOUCHERS">Ví Ưu Đãi & Voucher</button>
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

      <main class="jayt-main-canvas" role="main" id="jayt-view-canvas">
      </main>

      <footer class="jayt-footer" role="contentinfo">
        <div class="footer-container">
          <div class="footer-brand-col">
            <span class="footer-logo">JayT Đà Nẵng</span>
            <p class="footer-mission">Hệ điều hành cộng đồng Đà Nẵng (Community OS) — Vận hành theo Chỉ thị JAYT-245.</p>
          </div>
          <div class="footer-links-col">
            <span class="footer-heading">Nhận diện & Nguyên tắc</span>
            <p class="footer-text">100% bằng chứng đối soát • Không voucher ảo • Thương hiệu độc quyền J-Flow</p>
          </div>
        </div>
      </footer>

      <nav class="jayt-mobile-bottom-nav" role="navigation" aria-label="Điều hướng di động">
        <button class="mobile-nav-btn ${activeView === 'HOME' ? 'active' : ''}" data-nav="HOME">
          <span>Hôm nay</span>
        </button>
        <button class="mobile-nav-btn ${activeView === 'EXPLORE' ? 'active' : ''}" data-nav="EXPLORE">
          <span>Khám phá</span>
        </button>
        <button class="mobile-nav-btn ${activeView === 'VOUCHERS' ? 'active' : ''}" data-nav="VOUCHERS">
          <span>Ví Voucher</span>
        </button>
        <button class="mobile-nav-btn ${activeView === 'SAVED' ? 'active' : ''}" data-nav="SAVED">
          <span>Đã lưu</span>
        </button>
      </nav>
    </div>

    <div id="jayt-modal-root" class="jayt-modal-backdrop" hidden style="display: none;"></div>
    <div class="copy-toast-notification" id="copy-toast" aria-live="polite" aria-hidden="true">
      <span class="toast-icon">✓</span>
      <span class="toast-msg" id="toast-message">Đã sao chép mã thành công!</span>
    </div>
  `;
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
  } else if (activeView === 'SAVED') {
    canvas.innerHTML = renderSavedView();
  }

  attachCardListeners();
}

function attachGlobalEvents() {
  if (typeof document === 'undefined') return;

  // Nav clicks + keyboard (Enter/Space)
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

  // Theme toggle
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

  // Report source modal with Zero-PII & Input Sanitization (WO-BU-C3-003)
  const reportBtn = document.getElementById('btn-open-report');
  if (reportBtn) {
    reportBtn.addEventListener('click', () => {
      const modalRoot = document.getElementById('jayt-modal-root');
      if (!modalRoot) return;
      modalRoot.innerHTML = `
        <div class="jayt-modal-box" role="dialog" aria-modal="true" aria-labelledby="report-modal-title">
          <div class="modal-header">
            <div>
              <span class="modal-kicker kicker-deal">CỘNG ĐỒNG ĐÓNG GÓP TIỆN ÍCH</span>
              <h2 id="report-modal-title" class="modal-title">+ Báo Nguồn / Ưu Đãi Mới</h2>
            </div>
            <button class="modal-close-btn" aria-label="Đóng" id="btn-close-modal">&times;</button>
          </div>
          <div class="modal-body">
            <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 8px;">
              Chia sẻ thông tin ưu đãi hoặc tiện ích công tại Đà Nẵng để Hội đồng đối soát minh bạch.
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
      modalRoot.hidden = false;
      modalRoot.style.display = 'flex';

      const closeBtn = document.getElementById('btn-close-modal');
      if (closeBtn) {
        closeBtn.addEventListener('click', () => {
          modalRoot.hidden = true;
          modalRoot.style.display = 'none';
        });
      }
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

          // Zero-PII Hardening: reject phone numbers & personal emails
          const phoneRegex = /(0\d{9,10})|(\+84\d{9})|(\d{3,4}[-.\s]\d{3,4}[-.\s]\d{3,4})/;
          const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
          if (phoneRegex.test(val) || emailRegex.test(val)) {
            errorDiv.innerText = '⚠️ Vì lý do bảo mật Zero-PII, vui lòng KHÔNG nhập số điện thoại hoặc email cá nhân.';
            errorDiv.style.display = 'block';
            return;
          }

          // Sanitize: strip dangerous script/HTML tags
          val = val.replace(/<[^>]*>?/gm, '').substring(0, 250);

          modalRoot.hidden = true;
          modalRoot.style.display = 'none';
          showToast('✓ Cảm ơn bạn! Thông tin nguồn đã được tiếp nhận để đối soát.');
        });
      }
    });
  }

  // Offline-First Resilience (WO-BU-C3-001)
  if (typeof window !== 'undefined') {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('jayt_cached_items_count', String(JAYT_DISCOVERY_ITEMS.length));
        localStorage.setItem('jayt_cached_vouchers_count', String(JAYT_VOUCHERS.length));
      }
    } catch (e) {}

    window.addEventListener('offline', () => {
      showToast('⚡ Bạn đang offline — Dữ liệu 50 tiện ích vẫn được bảo lưu để tra cứu.');
    });
    window.addEventListener('online', () => {
      showToast('✓ Đã kết nối lại mạng — Dữ liệu luôn cập nhật mới nhất.');
    });
  }
}

function attachHomeEvents() {
  document.querySelectorAll('[data-gateway-target]').forEach(card => {
    card.addEventListener('click', () => {
      activeView = 'EXPLORE';
      activeGateway = card.dataset.gatewayTarget;
      document.querySelectorAll('.nav-btn, .mobile-nav-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.nav === 'EXPLORE');
      });
      renderCurrentView();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  document.querySelectorAll('[data-quick-loc]').forEach(btn => {
    btn.addEventListener('click', () => {
      activeView = 'EXPLORE';
      activeLocality = btn.dataset.quickLoc;
      document.querySelectorAll('.nav-btn, .mobile-nav-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.nav === 'EXPLORE');
      });
      renderCurrentView();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  document.querySelectorAll('[data-quick-slot], [data-quick-budget]').forEach(btn => {
    btn.addEventListener('click', () => {
      activeView = 'EXPLORE';
      document.querySelectorAll('.nav-btn, .mobile-nav-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.nav === 'EXPLORE');
      });
      renderCurrentView();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  const filterDrawerBtn = document.getElementById('btn-trigger-filter-drawer');
  if (filterDrawerBtn) {
    filterDrawerBtn.addEventListener('click', () => {
      activeView = 'EXPLORE';
      renderCurrentView();
    });
  }
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

function attachVoucherWalletEvents() {
  document.querySelectorAll('.btn-copy-code').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const codeToCopy = btn.getAttribute('data-copy-code');
      const voucherId = btn.getAttribute('data-voucher-id');

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(codeToCopy).then(() => {
          showToast(`Đã sao chép: ${codeToCopy} — Kiểm tra điều kiện trước khi dùng!`);
        }).catch(() => {
          showToast(`Mã ưu đãi: ${codeToCopy}`);
        });
      } else {
        showToast(`Mã ưu đãi: ${codeToCopy}`);
      }

      if (window.JAYT_OBSERVABILITY) {
        window.JAYT_OBSERVABILITY.recordEvent('VOUCHER_CODE_COPIED', {
          voucher_id: voucherId,
          code: codeToCopy
        });
      }
    });
  });

  document.querySelectorAll('.btn-save-wallet').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const vId = btn.getAttribute('data-save-voucher');
      let saved = JSON.parse(localStorage.getItem('jayt_saved_vouchers') || '[]');
      if (!saved.includes(vId)) {
        saved.push(vId);
        localStorage.setItem('jayt_saved_vouchers', JSON.stringify(saved));
        btn.innerHTML = '❤️ Đã lưu';
        showToast('Đã lưu voucher vào ví trên thiết bị!');
      } else {
        saved = saved.filter(id => id !== vId);
        localStorage.setItem('jayt_saved_vouchers', JSON.stringify(saved));
        btn.innerHTML = '🤍 Lưu';
        showToast('Đã bỏ lưu voucher.');
      }
      const countEl = document.getElementById('saved-count');
      if (countEl) countEl.innerText = saved.length;
    });
  });

  document.querySelectorAll('.wallet-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.wallet-tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-wallet-filter');
      filterVoucherGrid(filter, 'CATEGORY');
    });
  });

  document.querySelectorAll('.wallet-chip-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.wallet-chip-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const statusFilter = btn.getAttribute('data-status-filter');
      filterVoucherGrid(statusFilter, 'STATUS');
    });
  });
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
}

function initStorefrontApp() {
  renderAppShell();
  attachGlobalEvents();
  renderCurrentView();
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
    JAYT_VOUCHERS,
    filterDirectoryItems
  };
}
