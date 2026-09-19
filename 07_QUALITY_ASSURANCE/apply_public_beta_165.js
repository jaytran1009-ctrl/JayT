/**
 * JAYT PUBLIC BETA SYNCHRONIZATION SCRIPT (165)
 * Directive: JAYT-165: PUBLIC BETA SYNCHRONIZATION & TRANSPARENCY UPDATE
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..');
const jsSotPath = path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'jayt_apex_interface.js');
const jsDeployPath = path.join(repoRoot, 'deploy', 'jayt_apex_interface.js');
const htmlSotPath = path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'index.html');
const htmlDeployPath = path.join(repoRoot, 'deploy', 'index.html');

console.log('=== APPLYING PUBLIC BETA SYNCHRONIZATION & TRANSPARENCY UPDATE (165) ===');

// 1. Prepare CSS additions for index.html
const customCss165 = `
/* ==========================================================================
   JAYT-165: PUBLIC BETA TRANSPARENCY & "JAYT ĐANG XÂY GÌ" TIMELINE STYLES
   ========================================================================== */
.jayt-transparency-roadmap-card {
  background: linear-gradient(135deg, rgba(6, 78, 59, 0.03) 0%, rgba(255, 255, 255, 0.98) 100%);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-xl);
  padding: 22px;
  margin-top: 14px;
}
.jayt-roadmap-timeline {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 16px;
}
.jayt-roadmap-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  background: var(--bg-surface-subtle);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  padding: 12px 16px;
}
.jayt-roadmap-icon {
  font-size: 20px;
  flex-shrink: 0;
  margin-top: 2px;
}
.jayt-roadmap-title {
  font-size: 13.5px;
  font-weight: 800;
  color: var(--text-charcoal-deep);
  margin: 0 0 3px 0;
}
.jayt-roadmap-desc {
  font-size: 12px;
  color: var(--text-muted);
  line-height: 1.45;
}

/* Dark Mode Overrides for 165 */
body[data-theme="dark"] .jayt-transparency-roadmap-card {
  background: #1E293B;
  border-color: #334155;
}
body[data-theme="dark"] .jayt-roadmap-item {
  background: #0F172A;
  border-color: #334155;
}
body[data-theme="dark"] .jayt-roadmap-title {
  color: #F8FAFC;
}
`;

let htmlContent = fs.readFileSync(htmlSotPath, 'utf8');
if (!htmlContent.includes('JAYT-165: PUBLIC BETA TRANSPARENCY')) {
  htmlContent = htmlContent.replace('</style>', customCss165 + '\n</style>');
  fs.writeFileSync(htmlSotPath, htmlContent, 'utf8');
  fs.writeFileSync(htmlDeployPath, htmlContent, 'utf8');
  console.log('✅ Updated index.html & deploy/index.html with 165 CSS.');
}

// 2. Prepare Enhanced Code for jayt_apex_interface.js
const jsHeroHeader165 = `
        <!-- 1. HERO BRANDING & POSITIONING BANNER -->
        <section class="jayt-hero-branding-card">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:8px;">
            <div>
              <div style="font-size:11px; font-weight:800; color:var(--emerald-accent); text-transform:uppercase; letter-spacing:0.5px;">
                🌿 NỀN TẢNG TIẾT KIỆM CHO NGƯỜI ĐÀ NẴNG
              </div>
              <h1 class="jayt-hero-title">Lịch Tiết Kiệm Hằng Ngày Cho Người Đà Nẵng</h1>
              <div class="jayt-hero-tagline">"Biết hôm nay có gì, tính được mình trả bao nhiêu, rồi rủ đúng người đi cùng."</div>
            </div>
            <span class="apex-badge" style="background:#ECFDF5; color:#065F46; border:1px solid #A7F3D0; font-weight:800; font-size:11.5px; padding:4px 10px;">
              ✨ Public Beta 3.308
            </span>
          </div>

          <!-- Transparency Indicators -->
          <div style="display:flex; flex-wrap:wrap; gap:12px; margin-top:8px; font-size:12px; color:var(--text-muted);">
            <div>🛡️ <strong>Minh bạch:</strong> Ưu đãi chỉ hiển thị khi có bằng chứng đối soát</div>
            <div>⏱️ <strong>Cập nhật:</strong> 27/08/2026 (Đà Nẵng)</div>
            <div>🔗 <a href="#jayt-building-roadmap" style="color:var(--emerald-accent); font-weight:700; text-decoration:none;">Xem lộ trình & nguồn ↗</a></div>
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
`;

const jsRoadmapSection165 = `
  // 🏗️ Public "JayT Đang Xây Gì" Section Definition
  function renderJaytBuildingRoadmapSection() {
    return \`
      <!-- 6. KHU "JAYT ĐANG XÂY GÌ" (PUBLIC CHANGELOG & ROADMAP) -->
      <section id="jayt-building-roadmap" class="jayt-transparency-roadmap-card">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
          <div>
            <div style="font-size:11px; font-weight:800; color:var(--emerald-accent); text-transform:uppercase; letter-spacing:0.5px;">
              🏗️ MINH BẠCH & LỘ TRÌNH PHÁT TRIỂN
            </div>
            <h3 style="font-size:16.5px; font-weight:900; color:var(--text-charcoal-deep); margin:2px 0 0 0;">
              JayT Đang Xây Gì Cho Người Đà Nẵng?
            </h3>
          </div>
          <span class="apex-badge" style="background:#F1F5F9; color:#475569; border:1px solid #CBD5E1; font-weight:800; font-size:11px;">
            🔒 KỶ LUẬT SỰ THẬT
          </span>
        </div>

        <div class="jayt-roadmap-timeline">
          <div class="jayt-roadmap-item">
            <span class="jayt-roadmap-icon">📂</span>
            <div>
              <h4 class="jayt-roadmap-title">1. Vận Hành 5 Category Hubs Trực Tiếp</h4>
              <div class="jayt-roadmap-desc">Tập trung 5 nhu cầu thiết yếu: Ăn uống tiết kiệm, Không gian học bài, Phim & giải trí, Di chuyển, Đồ KTX & học tập.</div>
            </div>
          </div>

          <div class="jayt-roadmap-item">
            <span class="jayt-roadmap-icon">🌐</span>
            <div>
              <h4 class="jayt-roadmap-title">2. Theo Dõi 38+ Nguồn Công Khai Chính Thức</h4>
              <div class="jayt-roadmap-desc">Tự động theo dõi website chính hãng của các cụm rạp, xe buýt trợ giá DanaBus, đường sắt DSVN và 6 cổng bản quyền sinh viên quốc tế.</div>
            </div>
          </div>

          <div class="jayt-roadmap-item">
            <span class="jayt-roadmap-icon">📝</span>
            <div>
              <h4 class="jayt-roadmap-title">3. Cổng Đóng Góp "Báo Nguồn Ưu Đãi"</h4>
              <div class="jayt-roadmap-desc">Mọi người dùng có thể gửi thông tin ưu đãi vừa thấy. Hệ thống tự động lọc thông tin cá nhân (PII) trước khi đối soát thực địa.</div>
            </div>
          </div>

          <div class="jayt-roadmap-item">
            <span class="jayt-roadmap-icon">🛡️</span>
            <div>
              <h4 class="jayt-roadmap-title">4. Cơ Chế Đối Soát Bằng Chứng & Freshness</h4>
              <div class="jayt-roadmap-desc">Chỉ cấp nhãn 🟢 khi có bằng chứng đối soát còn hạn. Khi một nguồn báo đóng, chuyển trạng thái cần kiểm tra lại chứ không tự ý xóa lịch sử.</div>
            </div>
          </div>

          <div class="jayt-roadmap-item">
            <span class="jayt-roadmap-icon">✨</span>
            <div>
              <h4 class="jayt-roadmap-title">5. Bản Thử Nghiệm Public Beta</h4>
              <div class="jayt-roadmap-desc">JayT cam kết 0 quảng cáo ảo, 0 deal giả định. Mọi số liệu trên giao diện đều có thể truy ngược về nguồn chứng từ thực tế.</div>
            </div>
          </div>
        </div>
      </section>
    \`;
  }
`;

let jsContent = fs.readFileSync(jsSotPath, 'utf8');

// 1. Insert renderJaytBuildingRoadmapSection before renderCategoryHubsCenter163
if (!jsContent.includes('function renderJaytBuildingRoadmapSection()')) {
  jsContent = jsContent.replace(
    '// --- MAIN 5 CATEGORY HUBS EXPERIENCE CENTER ---',
    jsRoadmapSection165 + '\n  // --- MAIN 5 CATEGORY HUBS EXPERIENCE CENTER ---'
  );
}

// 2. Update renderCategoryHubsCenter163 Hero Header
if (jsContent.includes('<!-- 1. HERO BRANDING & NORTH STAR BANNER -->')) {
  const startHero = jsContent.indexOf('<!-- 1. HERO BRANDING & NORTH STAR BANNER -->');
  const endHero = jsContent.indexOf('<!-- 2. 5 CATEGORY HUBS HORIZONTAL SCROLL BAR -->');
  jsContent = jsContent.substring(0, startHero) + jsHeroHeader165.trim() + '\n\n        ' + jsContent.substring(endHero);
}

// 3. Add renderJaytBuildingRoadmapSection to renderCategoryHubsCenter163 return string
if (!jsContent.includes('${renderJaytBuildingRoadmapSection()}')) {
  jsContent = jsContent.replace(
    '${renderCommunityProofIntakePromptSection()}',
    '${renderCommunityProofIntakePromptSection()}\n\n        ${renderJaytBuildingRoadmapSection()}'
  );
}

fs.writeFileSync(jsSotPath, jsContent, 'utf8');
fs.writeFileSync(jsDeployPath, jsContent, 'utf8');
console.log('✅ Integrated Public Beta Header & "JayT Đang Xây Gì" section into jayt_apex_interface.js and deploy/jayt_apex_interface.js.');
