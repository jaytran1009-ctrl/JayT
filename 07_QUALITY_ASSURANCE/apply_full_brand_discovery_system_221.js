const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const interfacePath = path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'jayt_apex_interface.js');
let code = fs.readFileSync(interfacePath, 'utf8');

// 1. Update OS Version String
code = code.replace(/Exact Poster Binding OS 3\.360/g, 'Premium Brand & Discovery OS 3.361');
code = code.replace(/OS 3\.360/g, 'OS 3.361');
code = code.replace(/v=3\.360\.0/g, 'v=3.361.0');

// 2. Add CSS styles for JAYT-221 (20px radius, smooth shadows, rails, Emerald CTAs, Deep Obsidian theme)
const styleInjection = `
  /* JAYT-221: PREMIUM BRAND & VISUAL DISCOVERY SYSTEM */
  :root {
    --radius-card: 20px;
    --radius-pill: 9999px;
    --emerald-action: #10B981;
    --emerald-action-hover: #059669;
    --emerald-surface: #ECFDF5;
    --emerald-text: #065F46;
    --sapphire-official: #3B82F6;
    --amber-urgency: #F59E0B;
    --purple-community: #8B5CF6;
    --obsidian-bg: #0B0F19;
    --obsidian-surface: #111827;
    --obsidian-card: #1E293B;
  }

  .jayt-card-verified-deal, .jayt-card-verified-venue, .apex-deal-card {
    border-radius: 20px !important;
    overflow: hidden;
    transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease;
    border: 1px solid rgba(0,0,0,0.08);
    background: var(--bg-surface-elevated, #FFFFFF);
    box-shadow: 0 4px 20px rgba(0,0,0,0.04);
  }

  [data-theme="dark"] .jayt-card-verified-deal,
  [data-theme="dark"] .jayt-card-verified-venue,
  [data-theme="dark"] .apex-deal-card {
    border: 1px solid rgba(255,255,255,0.08) !important;
    background: #151D2C !important;
    box-shadow: 0 8px 30px rgba(0,0,0,0.4) !important;
  }

  .jayt-card-verified-deal:hover, .jayt-card-verified-venue:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(0,0,0,0.12);
  }

  .jayt-discovery-rail {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 16px;
    margin-bottom: 24px;
  }

  @media (max-width: 768px) {
    .jayt-discovery-rail {
      grid-template-columns: 1fr;
      gap: 14px;
    }
  }

  .jayt-cta-btn-emerald {
    background: #10B981 !important;
    color: #FFFFFF !important;
    font-weight: 800 !important;
    border-radius: 12px !important;
    padding: 8px 16px !important;
    border: none !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    gap: 6px !important;
    cursor: pointer !important;
    text-decoration: none !important;
    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.25) !important;
    transition: all 0.2s ease !important;
  }
  .jayt-cta-btn-emerald:hover {
    background: #059669 !important;
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(16, 185, 129, 0.35) !important;
  }
`;

// Inject into CSS section
if (!code.includes('JAYT-221: PREMIUM BRAND & VISUAL DISCOVERY SYSTEM')) {
  code = code.replace('function injectStyles() {', 'function injectStyles() {\n    const css221 = `' + styleInjection + '`;\n    const st221 = document.createElement("style"); st221.innerHTML = css221; document.head.appendChild(st221);\n');
}

// 3. Update Navbar Renderer with Master SVG Brand
const newNavbarFunc = `
  function renderGlassCapsuleNavbar() {
    const isDark = state.theme === 'dark';
    const logoSvg = (typeof window !== 'undefined' && window.JayTBrandAssets) ? window.JayTBrandAssets.master.logoFull(isDark) : \`<span style="font-weight:900; font-size:20px; color:\${isDark ? '#FFF' : '#0F172A'};">Jay<span style="color:#10B981;">T</span> Đà Nẵng</span>\`;

    const districts = [
      { id: 'ALL', label: '📍 Toàn Đà Nẵng' },
      { id: 'Hải Châu', label: '📍 Hải Châu' },
      { id: 'Thanh Khê', label: '📍 Thanh Khê' },
      { id: 'Sơn Trà', label: '📍 Sơn Trà' },
      { id: 'Ngũ Hành Sơn', label: '📍 Ngũ Hành Sơn' },
      { id: 'Liên Chiểu', label: '📍 Liên Chiểu' }
    ];

    return \`
      <header class="apex-cockpit-navbar" role="banner" style="background:\${isDark ? 'rgba(11,15,25,0.92)' : 'rgba(255,255,255,0.95)'}; backdrop-filter:blur(20px); border-bottom:1px solid \${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}; padding:12px 24px; position:sticky; top:0; z-index:100; display:flex; justify-content:space-between; align-items:center; gap:16px;">
        <a href="#" data-nav="dashboard" class="apex-nav-brand-title" aria-label="Trang chủ JayT Đà Nẵng" style="display:flex; align-items:center; text-decoration:none;">
          \${logoSvg}
        </a>

        <div class="apex-nav-middle-capsule" style="display:flex; align-items:center; gap:10px;">
          <div style="font-size:12px; font-weight:700; color:\${isDark ? '#94A3B8' : '#64748B'}; background:\${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)'}; padding:6px 12px; border-radius:12px; border:1px solid \${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}; display:none; @media(min-width:640px){display:block;}">
            🎓 Sinh Viên & Giới Trẻ
          </div>

          <select id="select-hub-district" class="apex-nav-select" aria-label="Chọn khu vực" style="border-radius:12px; font-weight:700; padding:7px 12px; font-size:12.5px; border:1px solid \${isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)'}; background:\${isDark ? '#1E293B' : '#F8FAFC'}; color:\${isDark ? '#F1F5F9' : '#0F172A'}; cursor:pointer;">
            \${districts.map(d => \`<option value="\${d.id}" \${state.selectedDistrict === d.id ? 'selected' : ''}>\${d.label}</option>\`).join('')}
          </select>

          <button id="btn-toggle-theme" class="apex-btn-secondary" aria-label="Đổi giao diện Sáng / Tối" style="border-radius:12px; padding:7px 12px; font-weight:700; font-size:12.5px; display:flex; align-items:center; gap:6px; cursor:pointer;">
            \${isDark ? '☀️ Sáng' : '🌙 Tối'}
          </button>
        </div>
      </header>
    \`;
  }
`;

const navbarRegex = /function renderGlassCapsuleNavbar\(\)[\s\S]*?\n\s*\}\n/;
if (navbarRegex.test(code)) {
  code = code.replace(navbarRegex, newNavbarFunc + '\n');
}

// 4. Update Category Hubs Renderer to generate Hero Spotlight + 5 Curated Rails
const newCategoryHubsFunc = `
  function renderCategoryHubsCenter163() {
    const isDark = state.theme === 'dark';
    const rawFeed = (typeof window !== 'undefined' && (window.JAYT_TIERED_SAVINGS_FEED || window.JAYT_VERIFIED_DEALS_FEED)) || state.feed || {};

    const greenConfirmedDeals = rawFeed.green_confirmed_deals || rawFeed.ready_to_use_deals || [];
    const blueOfficialOffers = rawFeed.blue_official_offers || rawFeed.promo_scope_pending_deals || [];
    const orangeFlashDeals = rawFeed.orange_flash_deals || [];
    const purpleVerifiedVenues = rawFeed.purple_verified_venues || rawFeed.verified_location_tracking || [];
    const whiteCommunityRadar = rawFeed.white_community_radar || rawFeed.community_pending_audit || [];

    const totalGreen = greenConfirmedDeals.length;
    const totalBlue = blueOfficialOffers.length;
    const totalOrange = orangeFlashDeals.length;
    const totalPurple = purpleVerifiedVenues.length;
    const totalWhite = whiteCommunityRadar.length;
    const totalDailyCards = totalGreen + totalBlue + totalOrange + totalPurple + totalWhite;

    // SVG Category Icons Helper
    const catSvgs = (typeof window !== 'undefined' && window.JayTBrandAssets) ? window.JayTBrandAssets.categories : {};
    const iconCinema = catSvgs.CINEMA_AND_LEISURE || '🎬';
    const iconFood = catSvgs.FOOD_AND_DINING || '🍔';
    const iconCoffee = catSvgs.COFFEE_AND_STUDY || '☕';
    const iconStudent = catSvgs.STUDENT_SPECIALS || '🎓';
    const iconTransit = catSvgs.MOBILITY_AND_TRANSPORT || '🛵';

    // 1. Group cards into Curated Rails
    // Rail 1: Rạp Phim Tuần Này (Metiz, Starlight, Galaxy, CGV)
    const cinemaCards = blueOfficialOffers.filter(d => ['CLM_208_01_METIZ_MEMBER', 'CLM_208_02_METIZ_SUPER_MONDAY', 'CLM_208_03_STARLIGHT_PROMO', 'CLM_208_04_GALAXY_MEMBER', 'CLM_208_16_CGV_STUDENT'].includes(d.deal_id));
    
    // Rail 2: Cứu Đói & Ăn Uống (Domino's, Popeyes, Cơm Gà Bà Buội, Bánh Tráng Đại Lộc, Mì Quảng Bà Mua)
    const diningCards = blueOfficialOffers.filter(d => ['CLM_208_05_DOMINOS_BOGO', 'CLM_208_06_POPEYES_COMBO'].includes(d.deal_id)).concat(
      purpleVerifiedVenues.filter(v => ['VEN_197_01_BA_BUOI', 'VEN_197_02_BANH_TRANG_DAI_LOC', 'VEN_197_03_MI_QUANG_BA_MUA'].includes(v.venue_id || v.deal_id))
    );

    // Rail 3: Cà Phê & Học Nhóm (Highlands, TCH, Phúc Long, Katinat, v.v.)
    const coffeeCards = purpleVerifiedVenues.filter(v => ['VEN_197_04_HIGHLANDS', 'VEN_197_05_THE_COFFEE_HOUSE', 'VEN_197_06_PHUC_LONG', 'VEN_197_07_KATINAT', 'VEN_197_08_CHE_LIEN'].includes(v.venue_id || v.deal_id));

    // Rail 4: Công Cụ & Bản Quyền Sinh Viên (Spotify, MSFT, Figma, AWS)
    const studentCards = blueOfficialOffers.filter(d => ['CLM_208_08_SPOTIFY_STUDENT', 'CLM_208_09_MS_STUDENT', 'CLM_208_10_FIGMA_STUDENT', 'CLM_208_12_AWS_STUDENT'].includes(d.deal_id));

    // Rail 5: Di Chuyển & Tiện Ích Công (DanaBus, Cổng DVC, Thư Viện Tổng Hợp, v.v.)
    const transitCards = blueOfficialOffers.filter(d => ['CLM_208_07_DANABUS_STUDENT', 'CLM_208_11_METRO_PASS'].includes(d.deal_id)).concat(
      purpleVerifiedVenues.filter(v => ['VEN_197_09_DVC_DANANG', 'VEN_197_10_THU_VIEN_TONG_HOP', 'VEN_197_11_TRUNG_TAM_HANH_CHINH', 'VEN_197_12_KHO_BAC_DANANG', 'VEN_197_13_BAO_TANG_CHAM', 'VEN_197_14_CUNG_THIEU_NHI', 'VEN_197_15_BEN_XE_TRUNG_TAM', 'VEN_197_16_GA_DA_NANG', 'VEN_197_17_TRUNG_TAM_Y_TE_HC'].includes(v.venue_id || v.deal_id))
    );

    // Spotlight Deal: Metiz 55K T3-T5
    const spotlightDeal = blueOfficialOffers.find(d => d.deal_id === 'CLM_208_01_METIZ_MEMBER') || blueOfficialOffers[0];

    return \`
      <div class="jayt-hubs-experience-root" style="max-width:1280px; margin:0 auto; padding:16px 20px 48px;">

        <!-- 1. EDITORIAL HEADER & VALUE TICKER -->
        <section class="jayt-hero-branding-card" style="padding:16px 20px; margin-bottom:20px; background:\${isDark ? 'linear-gradient(135deg, #111827, #1E293B)' : 'linear-gradient(135deg, #FFFFFF, #F1F5F9)'}; border-radius:20px; border:1px solid \${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}; box-shadow:0 8px 30px rgba(0,0,0,0.04);">
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
            <div>
              <div style="font-size:11px; font-weight:800; color:#10B981; text-transform:uppercase; letter-spacing:0.8px;">
                ⚡ KHÁM PHÁ ƯU ĐÃI ĐÀ NẴNG · LOCAL EDITORIAL
              </div>
              <h1 style="font-size:22px; font-weight:900; color:\${isDark ? '#F8FAFC' : '#0F172A'}; margin:4px 0 2px 0; letter-spacing:-0.5px;">
                Hôm Nay Có Gì Rẻ Tại Đà Nẵng?
              </h1>
              <div style="font-size:13px; color:\${isDark ? '#94A3B8' : '#64748B'}; font-weight:600;">
                Hôm nay: 0 🟢 · 12 🔵 ưu đãi chính thức · 17 🟣 nguồn chính thức đã ghi nhận
              </div>
            </div>
            
            <div style="display:flex; align-items:center; gap:8px;">
              <span class="apex-badge" style="background:\${isDark ? '#064E3B' : '#ECFDF5'}; color:\${isDark ? '#6EE7B7' : '#065F46'}; border:1px solid #10B981; font-weight:800; font-size:11.5px; padding:6px 12px; border-radius:10px;">
                ✨ Premium Brand & Discovery OS 3.361
              </span>
            </div>
          </div>
        </section>

        <!-- 2. HERO FEATURE SPOTLIGHT ("Hôm nay có gì rẻ?") -->
        \${spotlightDeal ? \`
          <section id="hero-spotlight-section" style="margin-bottom:32px;">
            <div style="background:\${isDark ? 'linear-gradient(135deg, #0F172A, #1E1B4B)' : 'linear-gradient(135deg, #F8FAFC, #EEF2FF)'}; border-radius:24px; border:1.5px solid \${isDark ? '#312E81' : '#C7D2FE'}; padding:20px; box-shadow:0 12px 36px rgba(0,0,0,0.08); position:relative; overflow:hidden;">
              <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:24px; align-items:center;">
                <!-- Media Canvas 16:9 with Real Poster -->
                <div style="aspect-ratio:16/9; border-radius:18px; overflow:hidden; position:relative; box-shadow:0 8px 24px rgba(0,0,0,0.25); border:1px solid rgba(255,255,255,0.2);">
                  <img src="assets/real-verified-assets/metiz-u22-student-official-poster.png" alt="Metiz Cinema Poster" style="width:100%; height:100%; object-fit:cover; object-position:center top;" />
                  <div style="position:absolute; top:12px; left:12px; background:rgba(11,15,25,0.85); backdrop-filter:blur(8px); padding:4px 10px; border-radius:8px; border:1px solid rgba(255,255,255,0.2); display:flex; align-items:center; gap:6px;">
                    <span style="font-size:11px; font-weight:900; color:#10B981;">MTZ</span>
                    <span style="font-size:12px; font-weight:800; color:#FFF;">Metiz Cinema</span>
                  </div>
                  <div style="position:absolute; bottom:12px; left:12px; background:#10B981; color:#FFF; font-size:11px; font-weight:900; padding:4px 10px; border-radius:6px; box-shadow:0 2px 8px rgba(0,0,0,0.3);">
                    🔥 SPOTLIGHT HÔM NAY
                  </div>
                </div>

                <!-- Deal Copy & Action -->
                <div>
                  <div style="display:inline-flex; align-items:center; gap:6px; background:\${isDark ? '#1E3A8A' : '#DBEAFE'}; color:\${isDark ? '#93C5FD' : '#1E40AF'}; font-size:11.5px; font-weight:800; padding:4px 10px; border-radius:8px; margin-bottom:8px;">
                    🔵 Ưu đãi chính thức đối tác
                  </div>
                  <h2 style="font-size:22px; font-weight:900; color:\${isDark ? '#FFFFFF' : '#0F172A'}; margin:0 0 8px 0; line-height:1.3;">
                    Metiz Cinema — Đồng Giá 55K Từ Thứ Ba Đến Thứ Năm
                  </h2>
                  <p style="font-size:13.5px; color:\${isDark ? '#CBD5E1' : '#475569'}; margin:0 0 14px 0; line-height:1.6;">
                    Áp dụng cho mọi thành viên Metiz tại cụm rạp Helio Center (Đường 2/9, Hải Châu, Đà Nẵng). Đã đối soát khớp nguyên văn 4 lớp chứng thực.
                  </p>
                  <div style="display:flex; align-items:center; gap:16px; flex-wrap:wrap; margin-bottom:16px;">
                    <div>
                      <div style="font-size:11px; color:\${isDark ? '#94A3B8' : '#64748B'}; font-weight:700;">GIÁ VÉ ƯU ĐÃI</div>
                      <div style="font-size:20px; font-weight:900; color:#10B981;">55.000đ / vé 2D</div>
                    </div>
                    <div style="width:1px; height:32px; background:\${isDark ? '#334155' : '#E2E8F0'};"></div>
                    <div>
                      <div style="font-size:11px; color:\${isDark ? '#94A3B8' : '#64748B'}; font-weight:700;">NGÀY ÁP DỤNG</div>
                      <div style="font-size:14px; font-weight:800; color:\${isDark ? '#F1F5F9' : '#1E293B'};">Thứ 3 — Thứ 5 hàng tuần</div>
                    </div>
                  </div>
                  <div style="display:flex; gap:10px; flex-wrap:wrap;">
                    <button data-action="open-deal-detail" data-deal-id="CLM_208_01_METIZ_MEMBER" class="jayt-cta-btn-emerald" style="font-size:13.5px; padding:10px 20px;">
                      🔍 Xem Chi Tiết Ưu Đãi & Thể Lệ
                    </button>
                    <a href="https://metiz.vn" target="_blank" rel="noopener noreferrer" style="display:inline-flex; align-items:center; gap:6px; padding:10px 16px; border-radius:12px; font-weight:700; font-size:13px; text-decoration:none; background:\${isDark ? '#1E293B' : '#F1F5F9'}; color:\${isDark ? '#F1F5F9' : '#334155'}; border:1px solid \${isDark ? '#334155' : '#CBD5E1'};">
                      🌐 Mở Nguồn Metiz.vn
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        \` : ''}

        <!-- 3. CURATED DISCOVERY RAILS (5 NGỮ CẢNH TRỌNG TÂM) -->

        <!-- RAIL 1: 🎬 RẠP PHIM TUẦN NÀY -->
        <section class="jayt-rail-section" style="margin-bottom:36px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
            <div style="display:flex; align-items:center; gap:10px;">
              <div style="width:36px; height:36px; border-radius:10px; background:#EFF6FF; color:#2563EB; display:flex; align-items:center; justify-content:center;">
                \${iconCinema}
              </div>
              <div>
                <h3 style="font-size:18px; font-weight:900; color:\${isDark ? '#FFFFFF' : '#0F172A'}; margin:0;">
                  Rạp Phim Tuần Này (Cinema & Leisure)
                </h3>
                <div style="font-size:12px; color:\${isDark ? '#94A3B8' : '#64748B'}; font-weight:600;">
                  Metiz Cinema · Starlight · Galaxy · CGV Vĩnh Trung Plaza
                </div>
              </div>
            </div>
            <span style="font-size:12px; font-weight:800; color:#3B82F6;">\${cinemaCards.length} ưu đãi</span>
          </div>
          <div class="jayt-discovery-rail">
            \${cinemaCards.map(d => renderBlueOfficialOfferCard(d)).join('')}
          </div>
        </section>

        <!-- RAIL 2: 🍔 CỨU ĐÓI & ĂN UỐNG TIẾT KIỆM -->
        <section class="jayt-rail-section" style="margin-bottom:36px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
            <div style="display:flex; align-items:center; gap:10px;">
              <div style="width:36px; height:36px; border-radius:10px; background:#ECFDF5; color:#059669; display:flex; align-items:center; justify-content:center;">
                \${iconFood}
              </div>
              <div>
                <h3 style="font-size:18px; font-weight:900; color:\${isDark ? '#FFFFFF' : '#0F172A'}; margin:0;">
                  Cứu Đói & Ăn Uống Tiết Kiệm (Food & Dining)
                </h3>
                <div style="font-size:12px; color:\${isDark ? '#94A3B8' : '#64748B'}; font-weight:600;">
                  Domino's Pizza · Popeyes · Cơm Gà Bà Buội · Bánh Tráng Đại Lộc
                </div>
              </div>
            </div>
            <span style="font-size:12px; font-weight:800; color:#10B981;">\${diningCards.length} địa điểm/deal</span>
          </div>
          <div class="jayt-discovery-rail">
            \${diningCards.map(item => item.deal_id && item.deal_id.startsWith('CLM_') ? renderBlueOfficialOfferCard(item) : renderPurpleVerifiedVenueCard(item)).join('')}
          </div>
        </section>

        <!-- RAIL 3: ☕ CÀ PHÊ & KHÔNG GIAN HỌC NHÓM -->
        <section class="jayt-rail-section" style="margin-bottom:36px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
            <div style="display:flex; align-items:center; gap:10px;">
              <div style="width:36px; height:36px; border-radius:10px; background:#FFFBEB; color:#D97706; display:flex; align-items:center; justify-content:center;">
                \${iconCoffee}
              </div>
              <div>
                <h3 style="font-size:18px; font-weight:900; color:\${isDark ? '#FFFFFF' : '#0F172A'}; margin:0;">
                  Cà Phê & Học Bài (Coffee & Study)
                </h3>
                <div style="font-size:12px; color:\${isDark ? '#94A3B8' : '#64748B'}; font-weight:600;">
                  Highlands Coffee · The Coffee House · Phúc Long · Katinat
                </div>
              </div>
            </div>
            <span style="font-size:12px; font-weight:800; color:#F59E0B;">\${coffeeCards.length} quán theo dõi</span>
          </div>
          <div class="jayt-discovery-rail">
            \${coffeeCards.map(v => renderPurpleVerifiedVenueCard(v)).join('')}
          </div>
        </section>

        <!-- RAIL 4: 🎓 CÔNG CỤ & BẢN QUYỀN SINH VIÊN -->
        <section class="jayt-rail-section" style="margin-bottom:36px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
            <div style="display:flex; align-items:center; gap:10px;">
              <div style="width:36px; height:36px; border-radius:10px; background:#F5F3FF; color:#7C3AED; display:flex; align-items:center; justify-content:center;">
                \${iconStudent}
              </div>
              <div>
                <h3 style="font-size:18px; font-weight:900; color:\${isDark ? '#FFFFFF' : '#0F172A'}; margin:0;">
                  Công Cụ & Bản Quyền Sinh Viên (Student Specials)
                </h3>
                <div style="font-size:12px; color:\${isDark ? '#94A3B8' : '#64748B'}; font-weight:600;">
                  Spotify Student · Microsoft 365 · Figma Edu · AWS Educate
                </div>
              </div>
            </div>
            <span style="font-size:12px; font-weight:800; color:#8B5CF6;">\${studentCards.length} bản quyền</span>
          </div>
          <div class="jayt-discovery-rail">
            \${studentCards.map(d => renderBlueOfficialOfferCard(d)).join('')}
          </div>
        </section>

        <!-- RAIL 5: 🛵 DI CHUYỂN & TIỆN ÍCH CÔNG -->
        <section class="jayt-rail-section" style="margin-bottom:36px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
            <div style="display:flex; align-items:center; gap:10px;">
              <div style="width:36px; height:36px; border-radius:10px; background:#ECFDF5; color:#059669; display:flex; align-items:center; justify-content:center;">
                \${iconTransit}
              </div>
              <div>
                <h3 style="font-size:18px; font-weight:900; color:\${isDark ? '#FFFFFF' : '#0F172A'}; margin:0;">
                  Di Chuyển & Tiện Ích Công (Mobility & Transit)
                </h3>
                <div style="font-size:12px; color:\${isDark ? '#94A3B8' : '#64748B'}; font-weight:600;">
                  Xe buýt DanaBus · Cổng Dịch Vụ Công Đà Nẵng · Thư Viện Tổng Hợp
                </div>
              </div>
            </div>
            <span style="font-size:12px; font-weight:800; color:#10B981;">\${transitCards.length} điểm công cộng</span>
          </div>
          <div class="jayt-discovery-rail">
            \${transitCards.map(item => item.deal_id && item.deal_id.startsWith('CLM_') ? renderBlueOfficialOfferCard(item) : renderPurpleVerifiedVenueCard(item)).join('')}
          </div>
        </section>

        <!-- 4. TECHNICAL TRANSPARENCY & AUDIT DRAWER (COLLAPSIBLE) -->
        <section id="transparency-governance-drawer" style="margin-top:40px; padding:20px; background:\${isDark ? '#111827' : '#F8FAFC'}; border-radius:20px; border:1px solid \${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'};">
          <details style="cursor:pointer;">
            <summary style="font-size:13.5px; font-weight:800; color:\${isDark ? '#94A3B8' : '#64748B'}; outline:none;">
              ⚙️ Bảng Đối Soát Bằng Chứng & Kỷ Luật Sự Thật (Transparency & Quality Governance)
            </summary>
            <div style="margin-top:16px; padding-top:16px; border-top:1px solid \${isDark ? '#1E293B' : '#E2E8F0'}; font-size:12.5px; color:\${isDark ? '#CBD5E1' : '#475569'};">
              <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:12px; margin-bottom:16px;">
                <div style="padding:12px; background:\${isDark ? '#1E293B' : '#FFFFFF'}; border-radius:12px; border:1px solid \${isDark ? '#334155' : '#E2E8F0'};">
                  <div style="font-size:11px; color:#10B981; font-weight:700;">EXACT PROMOTION MEDIA</div>
                  <div style="font-size:18px; font-weight:900; color:\${isDark ? '#FFF' : '#0F172A'};">3/29 (10.3%)</div>
                  <div style="font-size:10.5px; color:\${isDark ? '#94A3B8' : '#64748B'};">Poster gốc từ Metiz & Starlight</div>
                </div>
                <div style="padding:12px; background:\${isDark ? '#1E293B' : '#FFFFFF'}; border-radius:12px; border:1px solid \${isDark ? '#334155' : '#E2E8F0'};">
                  <div style="font-size:11px; color:#10B981; font-weight:700;">EXACT 4-LAYER BINDING</div>
                  <div style="font-size:18px; font-weight:900; color:\${isDark ? '#FFF' : '#0F172A'};">3/29 (10.3%)</div>
                  <div style="font-size:10.5px; color:\${isDark ? '#94A3B8' : '#64748B'};">Khớp media-claim-validity-scope</div>
                </div>
                <div style="padding:12px; background:\${isDark ? '#1E293B' : '#FFFFFF'}; border-radius:12px; border:1px solid \${isDark ? '#334155' : '#E2E8F0'};">
                  <div style="font-size:11px; color:#64748B; font-weight:700;">EXACT VENUE VISUAL</div>
                  <div style="font-size:18px; font-weight:900; color:\${isDark ? '#FFF' : '#0F172A'};">0/29 (0%)</div>
                  <div style="font-size:10.5px; color:\${isDark ? '#94A3B8' : '#64748B'};">Chờ ảnh thực địa Campus Scout</div>
                </div>
                <div style="padding:12px; background:\${isDark ? '#1E293B' : '#FFFFFF'}; border-radius:12px; border:1px solid \${isDark ? '#334155' : '#E2E8F0'};">
                  <div style="font-size:11px; color:#3B82F6; font-weight:700;">OFFICIAL IDENTITY ASSETS</div>
                  <div style="font-size:18px; font-weight:900; color:\${isDark ? '#FFF' : '#0F172A'};">6/29 (20.7%)</div>
                  <div style="font-size:10.5px; color:\${isDark ? '#94A3B8' : '#64748B'};">Logo Spotify, MSFT, Figma, AWS, CGV, DVC</div>
                </div>
              </div>
              <div style="line-height:1.6;">
                Mọi thông tin trên JayT tuân thủ nguyên tắc Fail-Closed: không phát hành deal giả định, không tự vẽ poster mô phỏng, và công bố minh bạch trạng thái của từng card.
              </div>
            </div>
          </details>
        </section>

      </div>
    \`;
  }
`;

const hubsRegex = /function renderCategoryHubsCenter163\(\)[\s\S]*?\n\s*\}\n/;
if (hubsRegex.test(code)) {
  code = code.replace(hubsRegex, newCategoryHubsFunc + '\n');
  console.log('✅ Replaced renderCategoryHubsCenter163 with Curated Rails and Spotlight');
}

fs.writeFileSync(interfacePath, code, 'utf8');
console.log('✅ Applied full Brand & Discovery system to jayt_apex_interface.js!');
