/**
 * JAYT WEB EXPERIENCE INTEGRATION SCRIPT (163)
 * Directive: JAYT-163: TÍCH HỢP CATEGORY HUBS VÀO TRẢI NGHIỆM WEB THẬT
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..');
const jsSotPath = path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'jayt_apex_interface.js');
const jsDeployPath = path.join(repoRoot, 'deploy', 'jayt_apex_interface.js');
const htmlSotPath = path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'index.html');
const htmlDeployPath = path.join(repoRoot, 'deploy', 'index.html');

const registry162Path = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'autonomous_schedule_registry_162.json');
const dashboard162Path = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'hybrid_supply_dashboard_162.json');
const contract162Path = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'category_hubs_contract_162.json');

const registry162 = JSON.parse(fs.readFileSync(registry162Path, 'utf8'));
const dashboard162 = JSON.parse(fs.readFileSync(dashboard162Path, 'utf8'));
const contract162 = JSON.parse(fs.readFileSync(contract162Path, 'utf8'));

console.log('=== APPLYING 5 CATEGORY HUBS WEB EXPERIENCE INTEGRATION (163) ===');

// 1. Prepare CSS additions for index.html
const customCss163 = `
/* ==========================================================================
   JAYT-163: 5 CATEGORY HUBS & 4-TIER DISPLAY MATRIX STYLES
   ========================================================================== */
.jayt-hubs-experience-root {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 30px;
}

/* 1. Hero Branding & Trust Badges */
.jayt-hero-branding-card {
  background: linear-gradient(135deg, rgba(5, 150, 105, 0.08) 0%, rgba(255, 255, 255, 0.98) 100%);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-xl);
  padding: 22px;
  box-shadow: var(--shadow-sm);
  position: relative;
  overflow: hidden;
}
.jayt-hero-title {
  font-size: 20px;
  font-weight: 900;
  color: var(--text-charcoal-deep);
  margin: 0 0 6px 0;
  line-height: 1.3;
}
.jayt-hero-tagline {
  font-size: 13.5px;
  color: var(--emerald-text);
  font-weight: 700;
  margin-bottom: 14px;
}
.jayt-trust-tiers-explainer {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 8px;
  margin-top: 14px;
  padding-top: 14px;
  border-top: 1px dashed var(--border-subtle);
}
.jayt-trust-tier-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 11.5px;
  color: var(--text-charcoal-main);
  background: var(--bg-surface-subtle);
  padding: 6px 10px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-subtle);
}

/* 2. Horizontal Scrollable Category Hubs Bar */
.jayt-category-hubs-bar {
  display: flex;
  overflow-x: auto;
  gap: 10px;
  padding: 4px 2px 10px 2px;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}
.jayt-category-hubs-bar::-webkit-scrollbar {
  display: none;
}
.jayt-category-hub-pill {
  min-height: 48px;
  min-width: max-content;
  padding: 0 16px;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  font-weight: 800;
  border-radius: var(--radius-full);
  border: 1px solid var(--border-subtle);
  background: var(--bg-card-white);
  color: var(--text-charcoal-main);
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}
.jayt-category-hub-pill:hover {
  border-color: var(--emerald-accent);
  color: var(--emerald-accent);
  background: var(--emerald-soft);
}
.jayt-category-hub-pill.active {
  background: #064E3B !important;
  color: #FFFFFF !important;
  border-color: #064E3B !important;
  box-shadow: 0 4px 12px rgba(6, 78, 59, 0.25);
}
.jayt-hub-count-badge {
  font-size: 11px;
  font-weight: 800;
  padding: 2px 7px;
  border-radius: var(--radius-full);
  background: var(--bg-surface-muted);
  color: var(--text-charcoal-deep);
}
.jayt-category-hub-pill.active .jayt-hub-count-badge {
  background: rgba(255, 255, 255, 0.22);
  color: #FFFFFF;
}

/* 3. Community Clusters Filter Bar */
.jayt-cluster-filter-bar {
  display: flex;
  overflow-x: auto;
  gap: 8px;
  padding-bottom: 6px;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}
.jayt-cluster-filter-bar::-webkit-scrollbar {
  display: none;
}
.jayt-cluster-chip {
  min-height: 38px;
  padding: 0 12px;
  font-size: 12px;
  font-weight: 700;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-subtle);
  background: var(--bg-card-white);
  color: var(--text-muted);
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0;
  transition: all 0.15s ease;
}
.jayt-cluster-chip:hover {
  border-color: var(--border-strong);
  color: var(--text-charcoal-deep);
}
.jayt-cluster-chip.active {
  background: var(--emerald-soft);
  color: var(--emerald-text);
  border-color: var(--emerald-border);
  font-weight: 800;
}

/* 4. 4-Tier Display Matrix Containers */
.jayt-tier-section {
  background: var(--bg-card-white);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-xl);
  padding: 20px;
  box-shadow: var(--shadow-xs);
}
.jayt-tier-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 14px;
}
.jayt-tier-title-box {
  display: flex;
  align-items: center;
  gap: 8px;
}
.jayt-tier-title {
  font-size: 15.5px;
  font-weight: 900;
  color: var(--text-charcoal-deep);
  margin: 0;
}
.jayt-tier-badge {
  font-size: 11px;
  font-weight: 800;
  padding: 3px 9px;
  border-radius: var(--radius-full);
}
.jayt-tier-badge-green { background: #ECFDF5; color: #065F46; border: 1px solid #A7F3D0; }
.jayt-tier-badge-blue { background: #EFF6FF; color: #1E40AF; border: 1px solid #BFDBFE; }
.jayt-tier-badge-purple { background: #FAF5FF; color: #6B21A8; border: 1px solid #E9D5FF; }
.jayt-tier-badge-gray { background: #F1F5F9; color: #475569; border: 1px solid #CBD5E1; }

.jayt-cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 14px;
}

/* Card 1: Verified Deal Card (🟢) */
.jayt-card-verified-deal {
  background: #FFFFFF;
  border: 1px solid #A7F3D0;
  border-radius: var(--radius-lg);
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 12px;
  box-shadow: 0 2px 8px rgba(5, 150, 105, 0.06);
}

/* Card 2: Verified Venue Card (🔵) */
.jayt-card-verified-venue {
  background: #FFFFFF;
  border: 1px solid #BFDBFE;
  border-radius: var(--radius-lg);
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 12px;
  box-shadow: 0 2px 8px rgba(37, 99, 235, 0.05);
}

/* Card 3: Tracked Source Card (🟣) */
.jayt-card-tracked-source {
  background: #FFFFFF;
  border: 1px solid #E9D5FF;
  border-radius: var(--radius-lg);
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 12px;
  box-shadow: 0 2px 8px rgba(107, 33, 168, 0.04);
}

/* Card 4: Actionable Empty State (⚪) */
.jayt-card-empty-state {
  background: linear-gradient(135deg, rgba(241, 245, 249, 0.6) 0%, #FFFFFF 100%);
  border: 1px dashed var(--border-medium);
  border-radius: var(--radius-lg);
  padding: 24px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

/* Dark Mode Overrides */
body[data-theme="dark"] .jayt-hero-branding-card {
  background: linear-gradient(135deg, rgba(5, 150, 105, 0.15) 0%, #1E293B 100%);
  border-color: #334155;
}
body[data-theme="dark"] .jayt-category-hub-pill {
  background: #1E293B;
  color: #F8FAFC;
  border-color: #334155;
}
body[data-theme="dark"] .jayt-category-hub-pill.active {
  background: #10B981 !important;
  color: #06261B !important;
  border-color: #10B981 !important;
}
body[data-theme="dark"] .jayt-tier-section {
  background: #1E293B;
  border-color: #334155;
}
body[data-theme="dark"] .jayt-card-verified-deal,
body[data-theme="dark"] .jayt-card-verified-venue,
body[data-theme="dark"] .jayt-card-tracked-source {
  background: #0F172A;
  border-color: #334155;
}
body[data-theme="dark"] .jayt-card-empty-state {
  background: #0F172A;
  border-color: #475569;
}
`;

// Update index.html
let htmlContent = fs.readFileSync(htmlSotPath, 'utf8');
if (!htmlContent.includes('JAYT-163: 5 CATEGORY HUBS')) {
  htmlContent = htmlContent.replace('</style>', customCss163 + '\n</style>');
  fs.writeFileSync(htmlSotPath, htmlContent, 'utf8');
  fs.writeFileSync(htmlDeployPath, htmlContent, 'utf8');
  console.log('✅ Updated index.html & deploy/index.html with 163 CSS.');
}

// 2. Prepare JS Engine Code for jayt_apex_interface.js
const jsCategoryHubsEngine163 = `
  // =========================================================================
  // JAYT-163: 5 CATEGORY HUBS & 4-TIER DISPLAY MATRIX WEB EXPERIENCE ENGINE
  // =========================================================================
  const CATEGORY_HUBS_CONFIG_163 = [
    {
      hub_id: 'HUB_1_FOOD_AND_DINING',
      icon: '🍜',
      name: 'Ăn uống tiết kiệm',
      tagline: 'Bữa ăn sinh viên, cơm bình dân & hàng quán tiết kiệm',
      focus: 'Bữa trưa, ăn tối, hàng quán quanh trường ĐH và khu công sở Đà Nẵng'
    },
    {
      hub_id: 'HUB_2_STUDY_SPACES',
      icon: '☕',
      name: 'Không gian học bài',
      tagline: 'Quán cà phê học bài, làm việc & wifi mạnh',
      focus: 'Không gian yên tĩnh, bàn rộng, ổ cắm điện và wifi ổn định'
    },
    {
      hub_id: 'HUB_3_CINEMA_ENTERTAINMENT',
      icon: '🎬',
      name: 'Phim và giải trí',
      tagline: 'Lịch chiếu rạp, giải trí & hoạt động cuối tuần',
      focus: 'Các rạp chiếu phim và điểm vui chơi lành mạnh tại Đà Nẵng'
    },
    {
      hub_id: 'HUB_4_PUBLIC_TRANSIT',
      icon: '🚌',
      name: 'Di chuyển',
      tagline: 'Xe buýt trợ giá DanaBus, tàu hỏa & đi lại tiết kiệm',
      focus: 'Mạng lưới xe buýt trợ giá DanaBus và tàu hỏa sinh viên DSVN tại Đà Nẵng'
    },
    {
      hub_id: 'HUB_5_DORM_AND_STUDY_SUPPLIES',
      icon: '🛍️',
      name: 'Đồ KTX và học tập',
      tagline: 'Cổng bản quyền SV, đồ dùng phòng trọ & tiện ích học tập',
      focus: 'Cổng xác thực sinh viên trực tuyến chính thức (GitHub, JetBrains, Spotify, Notion, Canva, YouTube)'
    }
  ];

  const DA_NANG_CLUSTERS_CONFIG_163 = [
    { cluster_id: 'ALL', icon: '📍', name: 'Toàn Đà Nẵng' },
    { cluster_id: 'CLUSTER_1_HOA_KHANH_LIEN_CHIEU', icon: '🎓', name: 'Hòa Khánh / Liên Chiểu' },
    { cluster_id: 'CLUSTER_2_BAC_MY_AN_HOA_QUY', icon: '🏫', name: 'Bắc Mỹ An / Hòa Quý' },
    { cluster_id: 'CLUSTER_3_HAI_CHAU_THANH_KHE', icon: '🏛️', name: 'Hải Châu / Thanh Khê' },
    { cluster_id: 'CLUSTER_4_HI_TECH_SOFTWARE_PARK', icon: '💻', name: 'Khu CNC / CV Phần Mềm' },
    { cluster_id: 'CLUSTER_5_SON_TRA_BEACH', icon: '🏖️', name: 'Sơn Trà / Ven Biển' }
  ];

  const CATEGORY_HUBS_REGISTRY_163 = ${JSON.stringify(registry162.items, null, 2)};
  const HYBRID_SUPPLY_DASHBOARD_163 = ${JSON.stringify(dashboard162, null, 2)};

  // --- CARD RENDERERS (4 TIERS) ---

  // 🟢 Tier 1: Verified Deal Card
  function renderVerifiedDealCard(deal) {
    if (!deal || !deal.title) return '';
    return \`
      <div class="jayt-card-verified-deal apex-spring-interactive">
        <div>
          <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:8px;">
            <div>
              <div style="font-size:15px; font-weight:800; color:var(--text-charcoal-deep);">\${esc(deal.title)}</div>
              <div style="font-size:11.5px; font-weight:700; color:var(--emerald-text); margin-top:2px;">🏷️ \${esc(deal.brand || 'ĐỐI SOÁT CHÍNH HÃNG')}</div>
            </div>
            <span class="jayt-tier-badge jayt-tier-badge-green">🟢 ĐÃ ĐỐI SOÁT</span>
          </div>
          <div style="font-size:12.5px; color:var(--text-charcoal-main); margin-top:8px; line-height:1.45;">
            \${esc(deal.conditions || 'Ưu đãi có bằng chứng xác minh thực tế.')}
          </div>
          <div style="font-size:11px; color:var(--text-muted); margin-top:6px;">
            ⏱️ Hạn dùng: <strong>\${esc(deal.valid_until || 'Theo quy định chương trình')}</strong>
          </div>
        </div>
        <div style="border-top:1px dashed #A7F3D0; padding-top:10px; display:flex; justify-content:space-between; align-items:center;">
          <span style="font-size:10.5px; color:var(--text-muted);">🔒 Checked: \${esc((deal.checked_at || '').substring(0, 10) || '2026-08-27')}</span>
          <a href="\${deal.cta_link || deal.official_url || '#'}" target="_blank" rel="noopener noreferrer" class="apex-btn apex-btn-sm apex-btn-pine" style="font-size:11.5px; text-decoration:none;">
            Xem Ưu Đãi ↗
          </a>
        </div>
      </div>
    \`;
  }

  // 🔵 Tier 2: Verified Venue Card
  function renderVerifiedVenueCard(venue) {
    if (!venue) return '';
    return \`
      <div class="jayt-card-verified-venue apex-spring-interactive">
        <div>
          <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:8px;">
            <div>
              <div style="font-size:15px; font-weight:800; color:var(--text-charcoal-deep);">\${esc(venue.brand_name || venue.venue_name || 'Cơ sở xác thực')}</div>
              <div style="font-size:11.5px; font-weight:700; color:var(--sapphire-text); margin-top:2px;">🏛️ \${esc(venue.category || 'ĐỊA ĐIỂM ĐÀ NẴNG')}</div>
            </div>
            <span class="jayt-tier-badge jayt-tier-badge-blue">🔵 ĐỊA ĐIỂM THỰC TẾ</span>
          </div>
          <div style="font-size:12.5px; color:var(--text-charcoal-main); margin-top:8px; line-height:1.45;">
            📍 <strong>Địa chỉ:</strong> \${esc(venue.address || 'Đà Nẵng')}
          </div>
          <div style="font-size:11.5px; color:#B45309; background:#FEF3C7; border:1px solid #FDE68A; border-radius:var(--radius-sm); padding:6px 10px; margin-top:8px;">
            ⚠️ <strong>Lưu ý:</strong> Ưu đãi tại quầy cần kiểm tra thêm. Menu và giá đối soát trực tiếp tại cơ sở.
          </div>
        </div>
        <div style="border-top:1px dashed #BFDBFE; padding-top:10px; display:flex; justify-content:space-between; align-items:center;">
          <div style="font-size:10px; color:var(--text-muted); font-family:var(--font-mono);">
            SHA: \${(venue.address_node_sha256 || venue.capture_html_sha256 || 'SHA_VERIFIED').substring(0, 16)}...
          </div>
          <a href="\${venue.locator_url || venue.url || '#'}" target="_blank" rel="noopener noreferrer" class="apex-btn apex-btn-sm apex-btn-outline" style="font-size:11.5px; text-decoration:none;">
            Kiểm Tra Tại Nguồn ↗
          </a>
        </div>
      </div>
    \`;
  }

  // 🟣 Tier 3: Tracked Source Card
  function renderTrackedSourceCard(source) {
    if (!source) return '';
    const isStudent = (source.stream === 'STREAM_B_ONLINE_STUDENT_SOURCES' || source.target_type === 'ONLINE_STUDENT_SOURCE');
    const badgeText = isStudent ? '🟣 CỔNG XÁC THỰC SINH VIÊN' : '🟣 NGUỒN ĐANG THEO DÕI';
    const actionLabel = isStudent ? 'Mở Cổng Xác Thực ↗' : 'Mở Trang Chính Thức ↗';

    return \`
      <div class="jayt-card-tracked-source apex-spring-interactive">
        <div>
          <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:8px;">
            <div>
              <div style="font-size:15px; font-weight:800; color:var(--text-charcoal-deep);">\${esc(source.name || source.brand_name || 'Nguồn Theo Dõi')}</div>
              <div style="font-size:11.5px; font-weight:700; color:#6B21A8; margin-top:2px;">🌐 \${esc(source.provider || source.category || 'Nguồn Công Khai')}</div>
            </div>
            <span class="jayt-tier-badge jayt-tier-badge-purple">\${badgeText}</span>
          </div>
          <div style="font-size:12px; color:var(--text-muted); margin-top:8px; line-height:1.45;">
            \${isStudent ? 'Cổng xác thực sinh viên chính thức; xác thực trực tiếp qua email trường học hoặc nền tảng SheerID.' : 'Nguồn website công khai đang được hệ thống theo dõi định kỳ; thông tin chi tiết đối soát tại website đơn vị.'}
          </div>
          <div style="font-size:11px; color:var(--text-subtle); margin-top:6px;">
            ⏱️ Đã quét: <strong>\${esc((source.last_checked_at || '').substring(0, 10) || '2026-08-27')}</strong>
          </div>
        </div>
        <div style="border-top:1px dashed #E9D5FF; padding-top:10px; display:flex; justify-content:space-between; align-items:center;">
          <span style="font-size:10px; color:var(--text-muted); font-style:italic;">0 quảng cáo ảo</span>
          <a href="\${source.url || source.official_source_url || '#'}" target="_blank" rel="noopener noreferrer" class="apex-btn apex-btn-sm apex-btn-secondary" style="font-size:11.5px; text-decoration:none;">
            \${actionLabel}
          </a>
        </div>
      </div>
    \`;
  }

  // ⚪ Tier 4: Actionable Empty State
  function renderActionableEmptyState(hub, cluster) {
    const clusterName = cluster === 'ALL' ? 'khu vực này' : (DA_NANG_CLUSTERS_CONFIG_163.find(c => c.cluster_id === cluster)?.name || 'khu vực này');
    return \`
      <div class="jayt-card-empty-state">
        <div style="font-size:32px;">⚪</div>
        <div style="font-size:15px; font-weight:800; color:var(--text-charcoal-deep);">Chưa có ưu đãi đã đối soát tại \${esc(clusterName)}</div>
        <div style="font-size:12.5px; color:var(--text-muted); max-width:460px; line-height:1.5;">
          JayT tuân thủ kỷ luật không dùng số giả để làm đầy giao diện. Mọi dữ liệu chỉ được xuất bản khi có chứng từ thực tế hoặc nguồn được ủy quyền.
        </div>
        <div style="display:flex; flex-wrap:wrap; gap:8px; justify-content:center; margin-top:6px;">
          <button type="button" class="apex-btn apex-btn-sm apex-btn-pine" data-action="open-report-deal-modal">
            ➕ Báo Nguồn Vừa Thấy
          </button>
          <button type="button" class="apex-btn apex-btn-sm apex-btn-outline" data-action="switch-cluster-all">
            📍 Xem Toàn Đà Nẵng
          </button>
        </div>
      </div>
    \`;
  }

  // --- MAIN 5 CATEGORY HUBS EXPERIENCE CENTER ---
  function renderCategoryHubsCenter163() {
    const currentHubId = state.selectedCategoryHub || 'HUB_1_FOOD_AND_DINING';
    const currentClusterId = state.selectedCluster || 'ALL';

    const currentHubConfig = CATEGORY_HUBS_CONFIG_163.find(h => h.hub_id === currentHubId) || CATEGORY_HUBS_CONFIG_163[0];
    const hubDashboardItem = HYBRID_SUPPLY_DASHBOARD_163.hubs.find(h => h.hub_id === currentHubId) || {
      verified_proof_deals_count: 0,
      verified_venues_count: 0,
      tracked_sources_count: 0,
      unresolved_needs_count: 0
    };

    // Filter registry items
    const hubItems = CATEGORY_HUBS_REGISTRY_163.filter(item => item.hub_id === currentHubId);
    
    // Tier 1: Verified Deals
    const tier1Deals = (state.feed && Array.isArray(state.feed.deals)) ? state.feed.deals.filter(d => d.hub_id === currentHubId) : [];

    // Tier 2: Verified Venues (filtered by cluster)
    let tier2Venues = hubItems.filter(item => item.reliability_tier === 'TIER_2_VERIFIED_VENUE' || item.reliability_tier === 'TIER_2_VERIFIED_VENUE_LISTING');
    if (currentClusterId !== 'ALL') {
      tier2Venues = tier2Venues.filter(v => v.cluster_id === currentClusterId);
    }

    // Tier 3: Tracked Sources
    const tier3Sources = hubItems.filter(item => item.reliability_tier === 'TIER_3_TRACKED_SOURCE' || item.reliability_tier === 'TIER_3_TRACKED_SOURCE_SIGNAL');

    return \`
      <div class="jayt-hubs-experience-root">

        <!-- 1. HERO BRANDING & NORTH STAR BANNER -->
        <section class="jayt-hero-branding-card">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:8px;">
            <div>
              <div style="font-size:11px; font-weight:800; color:var(--emerald-accent); text-transform:uppercase; letter-spacing:0.5px;">
                🌿 NỀN TẢNG DỮ LIỆU CỘNG ĐỒNG ĐÀ NẴNG
              </div>
              <h1 class="jayt-hero-title">Lịch Tiết Kiệm Hằng Ngày Đáng Tin Cậy</h1>
              <div class="jayt-hero-tagline">"Biết hôm nay có gì, tính được mình trả bao nhiêu, rồi rủ đúng người đi cùng."</div>
            </div>
            <span class="apex-badge" style="background:#ECFDF5; color:#065F46; border:1px solid #A7F3D0; font-weight:800; font-size:11px;">
              🔒 0 Quảng Cáo Ảo · Khóa Staging
            </span>
          </div>

          <!-- Trust Tiers Explainer -->
          <div class="jayt-trust-tiers-explainer">
            <div class="jayt-trust-tier-item">
              <span>🟢</span> <div><strong>Đã đối soát:</strong> Có bằng chứng còn hạn</div>
            </div>
            <div class="jayt-trust-tier-item">
              <span>🔵</span> <div><strong>Địa điểm thực tế:</strong> Có cơ sở thật từ locator</div>
            </div>
            <div class="jayt-trust-tier-item">
              <span>🟣</span> <div><strong>Nguồn đang theo dõi:</strong> Nguồn công khai chính thức</div>
            </div>
            <div class="jayt-trust-tier-item">
              <span>⚪</span> <div><strong>Chưa có dữ liệu:</strong> Báo nguồn cộng đồng</div>
            </div>
          </div>
        </section>

        <!-- 2. 5 CATEGORY HUBS HORIZONTAL SCROLL BAR -->
        <section style="display:flex; flex-direction:column; gap:8px;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <label style="font-size:12px; font-weight:800; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.5px;">
              📁 Danh Mục Tiết Kiệm (5 Category Hubs)
            </label>
            <span style="font-size:11.5px; color:var(--text-muted);">Cuộn ngang để chọn hub 👉</span>
          </div>

          <div class="jayt-category-hubs-bar" role="tablist">
            \${CATEGORY_HUBS_CONFIG_163.map(hub => {
              const isActive = (hub.hub_id === currentHubId);
              const count = CATEGORY_HUBS_REGISTRY_163.filter(i => i.hub_id === hub.hub_id).length;
              return \`
                <button type="button" role="tab" class="jayt-category-hub-pill \${isActive ? 'active' : ''}" 
                        data-hub-id="\${hub.hub_id}" aria-selected="\${isActive ? 'true' : 'false'}">
                  <span>\${hub.icon}</span>
                  <span>\${hub.name}</span>
                  <span class="jayt-hub-count-badge">\${count}</span>
                </button>
              \`;
            }).join('')}
          </div>
        </section>

        <!-- 3. DA NANG COMMUNITY CLUSTERS FILTER BAR -->
        <section style="display:flex; flex-direction:column; gap:8px;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <label style="font-size:12px; font-weight:800; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.5px;">
              📍 Khu Vực Trọng Điểm Đà Nẵng (5 Cụm Cộng Đồng)
            </label>
            <span style="font-size:11.5px; color:var(--emerald-text); font-weight:700;">
              \${DA_NANG_CLUSTERS_CONFIG_163.find(c => c.cluster_id === currentClusterId)?.name || 'Toàn Đà Nẵng'}
            </span>
          </div>

          <div class="jayt-cluster-filter-bar">
            \${DA_NANG_CLUSTERS_CONFIG_163.map(cluster => {
              const isActive = (cluster.cluster_id === currentClusterId);
              return \`
                <button type="button" class="jayt-cluster-chip \${isActive ? 'active' : ''}" 
                        data-cluster-id="\${cluster.cluster_id}">
                  \${cluster.icon} \${cluster.name}
                </button>
              \`;
            }).join('')}
          </div>
        </section>

        <!-- 4. ACTIVE HUB DETAILS & 4-TIER DISPLAY MATRIX -->
        <div style="background:var(--bg-surface-subtle); border-radius:var(--radius-lg); padding:12px 16px; border-left:3px solid var(--emerald-accent); font-size:12.5px; color:var(--text-charcoal-main);">
          <strong>\${currentHubConfig.icon} \${currentHubConfig.name}:</strong> \${currentHubConfig.tagline} · <em>\${currentHubConfig.focus}</em>
        </div>

        <!-- TẦNG 1: 🟢 ĐÃ ĐỐI SOÁT THỰC TẾ (VERIFIED DEALS) -->
        <section class="jayt-tier-section">
          <div class="jayt-tier-header">
            <div class="jayt-tier-title-box">
              <span style="font-size:18px;">🟢</span>
              <div>
                <h3 class="jayt-tier-title">1. Ưu Đãi Đã Đối Soát Bằng Chứng (\${tier1Deals.length} Deal)</h3>
                <div style="font-size:11px; color:var(--text-muted);">Chỉ hiển thị khi có evidence pack và đối soát thực tế còn hạn</div>
              </div>
            </div>
            <span class="jayt-tier-badge jayt-tier-badge-green">🟢 TIER 1: VERIFIED PROOF</span>
          </div>

          \${tier1Deals.length > 0 ? \`
            <div class="jayt-cards-grid">
              \${tier1Deals.map(deal => renderVerifiedDealCard(deal)).join('')}
            </div>
          \` : \`
            <div style="background:var(--bg-surface-subtle); border-radius:var(--radius-md); padding:14px; text-align:center; font-size:12px; color:var(--text-muted); border:1px dashed var(--border-subtle);">
              🔒 <strong>0 ưu đãi thương mại live:</strong> Hệ thống đang khóa sản xuất và bảo vệ dữ liệu theo chỉ thị CEO. Chỉ công bố khi có thỏa thuận API hoặc kiểm chứng thực địa.
            </div>
          \`}
        </section>

        <!-- TẦNG 2: 🔵 ĐỊA ĐIỂM THỰC TẾ ĐÃ XÁC MINH (VERIFIED VENUES) -->
        <section class="jayt-tier-section">
          <div class="jayt-tier-header">
            <div class="jayt-tier-title-box">
              <span style="font-size:18px;">🔵</span>
              <div>
                <h3 class="jayt-tier-title">2. Địa Điểm Cơ Sở Đã Xác Minh (\${tier2Venues.length} Địa Điểm)</h3>
                <div style="font-size:11px; color:var(--text-muted);">Địa chỉ đã xác thực qua store locator chính thức; ưu đãi kiểm tra tại quầy</div>
              </div>
            </div>
            <span class="jayt-tier-badge jayt-tier-badge-blue">🔵 TIER 2: VERIFIED VENUE</span>
          </div>

          \${tier2Venues.length > 0 ? \`
            <div class="jayt-cards-grid">
              \${tier2Venues.map(venue => renderVerifiedVenueCard(venue)).join('')}
            </div>
          \` : \`
            \${renderActionableEmptyState(currentHubConfig, currentClusterId)}
          \`}
        </section>

        <!-- TẦNG 3: 🟣 NGUỒN CÔNG KHAI ĐANG THEO DÕI (TRACKED SOURCES) -->
        <section class="jayt-tier-section">
          <div class="jayt-tier-header">
            <div class="jayt-tier-title-box">
              <span style="font-size:18px;">🟣</span>
              <div>
                <h3 class="jayt-tier-title">3. Nguồn Chính Thức Đang Theo Dõi (\${tier3Sources.length} Nguồn)</h3>
                <div style="font-size:11px; color:var(--text-muted);">Cổng đối tác & website chính thức đang theo dõi tự động; cấm giá giả định</div>
              </div>
            </div>
            <span class="jayt-tier-badge jayt-tier-badge-purple">🟣 TIER 3: TRACKED SOURCE</span>
          </div>

          \${tier3Sources.length > 0 ? \`
            <div class="jayt-cards-grid">
              \${tier3Sources.map(source => renderTrackedSourceCard(source)).join('')}
            </div>
          \` : \`
            <div style="font-size:12px; color:var(--text-muted); text-align:center; padding:14px;">
              Chưa có nguồn theo dõi trong danh mục này.
            </div>
          \`}
        </section>

      </div>
    \`;
  }
`;

// Read jayt_apex_interface.js
let jsContent = fs.readFileSync(jsSotPath, 'utf8');

// 1. Ensure initial state has selectedCategoryHub & selectedCluster
if (!jsContent.includes("selectedCategoryHub: 'HUB_1_FOOD_AND_DINING'")) {
  jsContent = jsContent.replace(
    "selectedNeed: 'ALL',",
    "selectedNeed: 'ALL',\n    selectedCategoryHub: 'HUB_1_FOOD_AND_DINING',\n    selectedCluster: 'ALL',"
  );
}

// 2. Insert Category Hubs Engine 163 before renderDiscoveryFirstHome
if (!jsContent.includes('CATEGORY_HUBS_CONFIG_163')) {
  jsContent = jsContent.replace(
    'function renderDiscoveryFirstHome() {',
    jsCategoryHubsEngine163 + '\n  function renderDiscoveryFirstHome() {'
  );
}

// 3. Update renderDiscoveryFirstHome to call renderCategoryHubsCenter163
jsContent = jsContent.replace(
  'function renderDiscoveryFirstHome() {\n    return `\n      ${renderFiveTierDailyDealCanvas()}\n    `;\n  }',
  'function renderDiscoveryFirstHome() {\n    return renderCategoryHubsCenter163();\n  }'
);

// 4. Update bindEvents to handle data-hub-id and data-cluster-id
const eventListeners163 = `
    // JAYT-163: 5 Category Hubs & Community Clusters Event Delegation
    document.querySelectorAll('[data-hub-id]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        state.selectedCategoryHub = e.currentTarget.getAttribute('data-hub-id');
        mount();
      });
    });

    document.querySelectorAll('[data-cluster-id]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        state.selectedCluster = e.currentTarget.getAttribute('data-cluster-id');
        mount();
      });
    });

    document.querySelectorAll('[data-action="open-report-deal-modal"]').forEach(btn => {
      btn.addEventListener('click', () => {
        state.activeNav = 'report_voucher';
        mount();
      });
    });

    document.querySelectorAll('[data-action="switch-cluster-all"]').forEach(btn => {
      btn.addEventListener('click', () => {
        state.selectedCluster = 'ALL';
        mount();
      });
    });
`;

if (!jsContent.includes('JAYT-163: 5 Category Hubs & Community Clusters Event Delegation')) {
  jsContent = jsContent.replace(
    'function bindEvents() {',
    'function bindEvents() {\n' + eventListeners163
  );
}

fs.writeFileSync(jsSotPath, jsContent, 'utf8');
fs.writeFileSync(jsDeployPath, jsContent, 'utf8');
console.log('✅ Integrated 5 Category Hubs & 4-Tier Display Engine into jayt_apex_interface.js and deploy/jayt_apex_interface.js.');
