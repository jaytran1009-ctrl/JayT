/**
 * JAYT UI UPDATE SCRIPT (168)
 * Directive: JAYT-168: UI RELEASE, KHÔNG CÒN “INTERNAL-ONLY”
 */

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const jsSotPath = path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'jayt_apex_interface.js');
const jsDeployPath = path.join(repoRoot, 'deploy', 'jayt_apex_interface.js');
const jsDeployPubPath = path.join(repoRoot, 'deploy', 'public', 'jayt_apex_interface.js');

let jsContent = fs.readFileSync(jsSotPath, 'utf8');

// 1. Update Hero Title with positioning class
jsContent = jsContent.replace(
  '<h1 class="jayt-hero-title">Lịch Tiết Kiệm Hằng Ngày Cho Người Đà Nẵng</h1>',
  '<h1 class="jayt-hero-title jayt-positioning-title">Lịch Tiết Kiệm Hằng Ngày Cho Người Đà Nẵng</h1>'
);

// 2. Update version badge
jsContent = jsContent.replace(
  '✨ Public Beta 3.308',
  '✨ Public Beta 3.311'
);

// 3. Add "Hôm Nay Trên JayT" Overview Card if not present
const todayOverviewHtml = `
        <!-- KHỐI "HÔM NAY TRÊN JAYT" (4 CÂU HỎI TRỌNG TÂM CHO NGƯỜI DÙNG) -->
        <section class="jayt-today-overview-card" id="jayt-today-overview" style="background:var(--bg-surface); border:1px solid var(--border-soft); border-radius:var(--radius-xl); padding:16px; margin-top:12px; margin-bottom:12px; box-shadow:var(--shadow-sm);">
          <div style="font-size:12px; font-weight:800; color:var(--emerald-accent); text-transform:uppercase; letter-spacing:0.5px; margin-bottom:10px;">
            ⚡ HÔM NAY TRÊN JAYT ĐÀ NẴNG
          </div>
          <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap:10px;">
            <div style="padding:10px 12px; background:var(--bg-surface-subtle); border-radius:var(--radius-md); border-left:3px solid #10B981;">
              <div style="font-size:11px; color:var(--text-muted); font-weight:600;">🟢 Ưu đãi đã đối soát</div>
              <div style="font-size:15px; font-weight:800; color:var(--text-charcoal-main); margin-top:2px;">0 Deal Trực Tiếp</div>
              <div style="font-size:11px; color:var(--text-muted); margin-top:2px;">Đang chuẩn bị thẩm định</div>
            </div>
            <div style="padding:10px 12px; background:var(--bg-surface-subtle); border-radius:var(--radius-md); border-left:3px solid #3B82F6;">
              <div style="font-size:11px; color:var(--text-muted); font-weight:600;">📁 Khám phá theo Hub</div>
              <div style="font-size:15px; font-weight:800; color:var(--text-charcoal-main); margin-top:2px;">5 Category Hubs</div>
              <div style="font-size:11px; color:var(--text-muted); margin-top:2px;">Ăn uống, Học bài, Phim, Bus, Đồ KTX</div>
            </div>
            <div style="padding:10px 12px; background:var(--bg-surface-subtle); border-radius:var(--radius-md); border-left:3px solid #8B5CF6;">
              <div style="font-size:11px; color:var(--text-muted); font-weight:600;">🟣 Nguồn theo dõi</div>
              <div style="font-size:15px; font-weight:800; color:var(--text-charcoal-main); margin-top:2px;">78 Nguồn Chính Thức</div>
              <div style="font-size:11px; color:var(--text-muted); margin-top:2px;">Phủ 5 cụm trường & văn phòng</div>
            </div>
            <div style="padding:10px 12px; background:var(--bg-surface-subtle); border-radius:var(--radius-md); border-left:3px solid #F59E0B;">
              <div style="font-size:11px; color:var(--text-muted); font-weight:600;">📣 Báo nguồn ưu đãi</div>
              <div style="font-size:15px; font-weight:800; color:var(--text-charcoal-main); margin-top:2px;">Đóng Góp Ngay</div>
              <div style="font-size:11px; color:var(--text-muted); margin-top:2px;"><a href="#jayt-community-proof-intake" style="color:var(--emerald-accent); font-weight:700; text-decoration:none;">Gửi quán bạn vừa thấy ↗</a></div>
            </div>
          </div>
        </section>
`;

if (!jsContent.includes('jayt-today-overview-card')) {
  jsContent = jsContent.replace(
    '<!-- 2. 5 CATEGORY HUBS HORIZONTAL SCROLL BAR -->',
    todayOverviewHtml + '\n        <!-- 2. 5 CATEGORY HUBS HORIZONTAL SCROLL BAR -->'
  );
  console.log('✅ Added "Hôm Nay Trên JayT" overview card.');
}

fs.writeFileSync(jsSotPath, jsContent, 'utf8');
fs.writeFileSync(jsDeployPath, jsContent, 'utf8');
fs.writeFileSync(jsDeployPubPath, jsContent, 'utf8');
console.log('✅ Saved updated jayt_apex_interface.js to SOT and Deploy.');
