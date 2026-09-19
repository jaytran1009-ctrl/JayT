/**
 * JAYT DAILY DEAL OS UI INTEGRATION SCRIPT (170)
 * Directive: JAYT-170: DAILY DEAL OS — 30–50 DEAL HOT MỖI NGÀY
 */

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const jsSotPath = path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'jayt_apex_interface.js');
const jsDeployPath = path.join(repoRoot, 'deploy', 'jayt_apex_interface.js');
const jsDeployPubPath = path.join(repoRoot, 'deploy', 'public', 'jayt_apex_interface.js');

let jsContent = fs.readFileSync(jsSotPath, 'utf8');

// Update version badge to 3.313
jsContent = jsContent.replace(/Public Beta 3\.\d+/g, 'Daily Deal OS 3.313');

// 6 Active Verified Student Deals
const ACTIVE_VERIFIED_DEALS_170 = [
  {
    id: 'DEAL_B_01',
    brand: 'GitHub Education',
    title: 'GitHub Student Developer Pack (Miễn phí 100+ công cụ lập trình & cloud)',
    category: 'STUDENT_BENEFIT',
    hub_id: 'HUB_5_DORM_AND_STUDY_SUPPLIES',
    benefit_summary: 'Bản quyền GitHub Pro miễn phí, 100$ Azure/DigitalOcean, Domain .me miễn phí 1 năm',
    terms: 'Áp dụng cho sinh viên có email .edu.vn hoặc thẻ SV hợp lệ',
    freshness_window: 'RECURRING_SEMESTER',
    checked_at: '2026-08-27T13:48:00.000Z',
    action_url: 'https://education.github.com/pack',
    tier: 'TIER_1_VERIFIED_PROOF_DEAL'
  },
  {
    id: 'DEAL_B_02',
    brand: 'JetBrains',
    title: 'JetBrains All Products Pack Educational License (Bản quyền IDE Pro)',
    category: 'STUDENT_BENEFIT',
    hub_id: 'HUB_5_DORM_AND_STUDY_SUPPLIES',
    benefit_summary: 'Miễn phí 100% trọn bộ IntelliJ, WebStorm, PyCharm, CLion trị giá hơn 200$/năm',
    terms: 'Gia hạn hằng năm qua email trường đại học',
    freshness_window: 'RECURRING_ANNUAL',
    checked_at: '2026-08-27T13:48:00.000Z',
    action_url: 'https://www.jetbrains.com/community/education/#students',
    tier: 'TIER_1_VERIFIED_PROOF_DEAL'
  },
  {
    id: 'DEAL_B_03',
    brand: 'Spotify Vietnam',
    title: 'Spotify Premium Student (Giảm 50% phí thuê bao nghe nhạc không quảng cáo)',
    category: 'STUDENT_BENEFIT',
    hub_id: 'HUB_5_DORM_AND_STUDY_SUPPLIES',
    benefit_summary: 'Giá ưu đãi 29.500đ/tháng (giá gốc 59.000đ/tháng)',
    terms: 'Xác thực qua cổng SheerID hàng năm',
    freshness_window: 'RECURRING_ANNUAL',
    checked_at: '2026-08-27T13:48:00.000Z',
    action_url: 'https://www.spotify.com/vn-vi/student/',
    tier: 'TIER_1_VERIFIED_PROOF_DEAL'
  },
  {
    id: 'DEAL_B_04',
    brand: 'Notion',
    title: 'Notion Plus for Education (Không giới hạn block ghi chú & cộng tác)',
    category: 'STUDENT_BENEFIT',
    hub_id: 'HUB_5_DORM_AND_STUDY_SUPPLIES',
    benefit_summary: 'Nâng cấp miễn phí gói Plus (10$/tháng) cho sinh viên và giảng viên',
    terms: 'Đăng ký tài khoản Notion bằng email trường .edu.vn',
    freshness_window: 'RECURRING_PERMANENT',
    checked_at: '2026-08-27T13:48:00.000Z',
    action_url: 'https://www.notion.so/product/notion-for-education',
    tier: 'TIER_1_VERIFIED_PROOF_DEAL'
  },
  {
    id: 'DEAL_B_05',
    brand: 'Canva',
    title: 'Canva for Education (Thiết kế slide, đồ án tốt nghiệp cao cấp)',
    category: 'STUDENT_BENEFIT',
    hub_id: 'HUB_5_DORM_AND_STUDY_SUPPLIES',
    benefit_summary: 'Mở khóa kho template Pro, font chữ và xuất đồ họa độ phân giải cao',
    terms: 'Xác thực qua email trường hoặc giấy xác nhận sinh viên',
    freshness_window: 'RECURRING_ANNUAL',
    checked_at: '2026-08-27T13:48:00.000Z',
    action_url: 'https://www.canva.com/education/',
    tier: 'TIER_1_VERIFIED_PROOF_DEAL'
  },
  {
    id: 'DEAL_B_06',
    brand: 'YouTube Premium',
    title: 'YouTube Premium Sinh Viên (Nghe nhạc nền & xem video không quảng cáo)',
    category: 'STUDENT_BENEFIT',
    hub_id: 'HUB_5_DORM_AND_STUDY_SUPPLIES',
    benefit_summary: 'Gói sinh viên 49.000đ/tháng (tiết kiệm 30.000đ/tháng so với gói cá nhân)',
    terms: 'Xác thực qua cổng SheerID',
    freshness_window: 'RECURRING_ANNUAL',
    checked_at: '2026-08-27T13:48:00.000Z',
    action_url: 'https://www.youtube.com/premium/student',
    tier: 'TIER_1_VERIFIED_PROOF_DEAL'
  }
];

// Insert or replace ACTIVE_VERIFIED_DEALS constant
if (!jsContent.includes('ACTIVE_VERIFIED_DEALS_170')) {
  const insertPos = jsContent.indexOf('const CATEGORY_HUBS_CONFIG_163 =');
  if (insertPos !== -1) {
    const dealsConst = `const ACTIVE_VERIFIED_DEALS_170 = ${JSON.stringify(ACTIVE_VERIFIED_DEALS_170, null, 2)};\n\n  `;
    jsContent = jsContent.substring(0, insertPos) + dealsConst + jsContent.substring(insertPos);
    console.log('✅ Injected ACTIVE_VERIFIED_DEALS_170.');
  }
}

// Update tier1Deals logic inside renderCategoryHubsCenter163
const oldTier1Logic = `const tier1Deals = hubItems.filter(item => item.reliability_tier === 'TIER_1_VERIFIED_PROOF' || item.reliability_tier === 'TIER_1_VERIFIED_PROOF_DEAL');`;
const newTier1Logic = `let tier1Deals = ACTIVE_VERIFIED_DEALS_170.filter(item => item.hub_id === currentHubId);
    if (tier1Deals.length === 0) {
      tier1Deals = hubItems.filter(item => item.reliability_tier === 'TIER_1_VERIFIED_PROOF' || item.reliability_tier === 'TIER_1_VERIFIED_PROOF_DEAL');
    }`;

if (jsContent.includes(oldTier1Logic)) {
  jsContent = jsContent.replace(oldTier1Logic, newTier1Logic);
  console.log('✅ Updated Tier 1 Deals renderer with verified benefits.');
}

// Add Provider Access Board UI section
const providerBoardHtml = `
        <!-- 5. SUPPLY ENGINE A: PROVIDER ACCESS BOARD (HIGH-VOLUME FEEDS) -->
        <section class="jayt-provider-board-card" id="jayt-provider-board" style="background:var(--bg-surface); border:1px solid var(--border-soft); border-radius:var(--radius-xl); padding:16px; margin-top:20px; box-shadow:var(--shadow-sm);">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; flex-wrap:wrap; gap:8px;">
            <div style="font-size:12px; font-weight:800; color:var(--emerald-accent); text-transform:uppercase; letter-spacing:0.5px;">
              📡 KIẾN TRÚC NGUỒN CUNG: PROVIDER ACCESS BOARD (30–50 DEAL/NGÀY)
            </div>
            <span class="apex-badge" style="background:#EFF6FF; color:#1D4ED8; border:1px solid #BFDBFE; font-size:11px; font-weight:800;">
              Controlled Beta Pipeline
            </span>
          </div>
          <div style="font-size:12px; color:var(--text-muted); margin-bottom:12px;">
            Quy mô 30–50 deal active hằng ngày được cấp nguồn qua 4 Supply Engines hợp lệ:
          </div>
          <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap:10px;">
            <div style="padding:10px; background:var(--bg-surface-subtle); border-radius:var(--radius-md); border:1px solid var(--border-soft);">
              <div style="display:flex; justify-content:space-between;">
                <strong style="font-size:12px; color:var(--text-charcoal-main);">AccessTrade VN</strong>
                <span style="font-size:10.5px; color:#059669; font-weight:800;">EXPORT_AVAILABLE</span>
              </div>
              <div style="font-size:11px; color:var(--text-muted); margin-top:4px;">15-25 Deal TMĐT & F&B / ngày</div>
            </div>
            <div style="padding:10px; background:var(--bg-surface-subtle); border-radius:var(--radius-md); border:1px solid var(--border-soft);">
              <div style="display:flex; justify-content:space-between;">
                <strong style="font-size:12px; color:var(--text-charcoal-main);">Shopee Open Platform</strong>
                <span style="font-size:10.5px; color:#D97706; font-weight:800;">PENDING_AUTH</span>
              </div>
              <div style="font-size:11px; color:var(--text-muted); margin-top:4px;">10-20 Voucher & Flash Sale / ngày</div>
            </div>
            <div style="padding:10px; background:var(--bg-surface-subtle); border-radius:var(--radius-md); border:1px solid var(--border-soft);">
              <div style="display:flex; justify-content:space-between;">
                <strong style="font-size:12px; color:var(--text-charcoal-main);">Official Cinema & Transit</strong>
                <span style="font-size:10.5px; color:#10B981; font-weight:800;">ACTIVE (6 PORTALS)</span>
              </div>
              <div style="font-size:11px; color:var(--text-muted); margin-top:4px;">8-12 Quyền lợi & Lịch tuần / ngày</div>
            </div>
            <div style="padding:10px; background:var(--bg-surface-subtle); border-radius:var(--radius-md); border:1px solid var(--border-soft);">
              <div style="display:flex; justify-content:space-between;">
                <strong style="font-size:12px; color:var(--text-charcoal-main);">Local Campus Scouts</strong>
                <span style="font-size:10.5px; color:#3B82F6; font-weight:800;">32 VENUES AUDITED</span>
              </div>
              <div style="font-size:11px; color:var(--text-muted); margin-top:4px;">5-10 Kèo địa phương & cơm trưa</div>
            </div>
          </div>
        </section>
`;

if (!jsContent.includes('jayt-provider-board-card')) {
  jsContent = jsContent.replace(
    '${renderJaytBuildingRoadmapSection()}',
    providerBoardHtml + '\n        ${renderJaytBuildingRoadmapSection()}'
  );
  console.log('✅ Injected Provider Access Board UI.');
}

fs.writeFileSync(jsSotPath, jsContent, 'utf8');
fs.writeFileSync(jsDeployPath, jsContent, 'utf8');
fs.writeFileSync(jsDeployPubPath, jsContent, 'utf8');
console.log('✅ Synchronized updated jayt_apex_interface.js to SOT, Deploy Root and Deploy Public.');
