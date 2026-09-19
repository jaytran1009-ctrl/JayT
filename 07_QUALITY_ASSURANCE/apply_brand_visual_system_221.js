const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const interfacePath = path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'jayt_apex_interface.js');
let code = fs.readFileSync(interfacePath, 'utf8');

// 1. Update OS Version String
code = code.replace(/Exact Poster Binding OS 3\.360/g, 'Premium Brand & Discovery OS 3.361');
code = code.replace(/OS 3\.360/g, 'OS 3.361');
code = code.replace(/v=3\.360\.0/g, 'v=3.361.0');

// 2. Modernize Card Visual Header Renderer with 20px radius & Brand Marks
const newVisualHeaderFunc = `
  // JAYT-221: PREMIUM VISUAL CARD HEADER RENDERER (16:9, 20PX RADIUS, BRAND MARKS)
  function renderCardVisualHeaderHTML(visualEv, brandName, categoryName, tierBadgeHTML) {
    const isDark = state.theme === 'dark';
    const brandMark = (typeof window !== 'undefined' && window.JayTBrandAssets) ? window.JayTBrandAssets.getBrandMark(brandName) : null;
    const logoImgUrl = (brandMark && brandMark.logoUrl) ? brandMark.logoUrl : (visualEv && visualEv.asset_file_or_embed_url && (visualEv.visual_kind === 'OFFICIAL_IDENTITY_ASSET' || visualEv.visual_kind === 'EXACT_PROMOTION') ? visualEv.asset_file_or_embed_url : null);
    const brandTag = (brandMark && brandMark.tag) || (brandName || 'JT').substring(0, 3).toUpperCase();

    // 1. EXACT PROMOTION POSTER (Real promotion poster from brand portal)
    if (visualEv && visualEv.visual_kind === 'EXACT_PROMOTION' && visualEv.asset_file_or_embed_url) {
      return \`
        <!-- Exact Promotion Poster Canvas (16:9, JAYT-221) -->
        <div class="jayt-card-visual-canvas" style="aspect-ratio:16/9; width:100%; position:relative; overflow:hidden; border-top-left-radius:20px; border-top-right-radius:20px; background:#0B0F19; display:flex; flex-direction:column; justify-content:space-between; padding:14px;">
          <img src="\${esc(visualEv.asset_file_or_embed_url)}" alt="\${esc(brandName)}" style="position:absolute; top:0; left:0; width:100%; height:100%; object-fit:cover; object-position:center top; z-index:1; transition:transform 0.4s ease;" class="jayt-poster-img" />
          <div style="position:absolute; top:0; left:0; width:100%; height:100%; background:linear-gradient(180deg, rgba(11,15,25,0.72) 0%, rgba(11,15,25,0.1) 45%, rgba(11,15,25,0.88) 100%); z-index:1; pointer-events:none;"></div>
          <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:8px; position:relative; z-index:2;">
            <!-- Brand Anchor Badge -->
            <div style="display:flex; align-items:center; gap:8px; background:rgba(11,15,25,0.78); backdrop-filter:blur(8px); padding:4px 10px; border-radius:10px; border:1px solid rgba(255,255,255,0.22); box-shadow:0 4px 12px rgba(0,0,0,0.3);">
              <span style="font-size:11px; font-weight:900; color:#10B981; letter-spacing:0.5px;">\${esc(brandTag)}</span>
              <span style="font-size:13.5px; font-weight:800; color:#FFFFFF; text-shadow:0 1px 3px rgba(0,0,0,0.8);">\${esc(brandName)}</span>
            </div>
            \${tierBadgeHTML}
          </div>
          <div style="font-size:10.5px; color:#F8FAFC; background:rgba(11,15,25,0.8); backdrop-filter:blur(8px); padding:4px 10px; border-radius:6px; align-self:flex-start; border:1px solid rgba(255,255,255,0.25); position:relative; z-index:2; font-weight:700; display:flex; align-items:center; gap:5px;">
            <span style="width:6px; height:6px; border-radius:50%; background:#10B981; display:inline-block;"></span>
            \${esc(visualEv.render_label)}
          </div>
        </div>
      \`;
    }

    // 2. OFFICIAL IDENTITY ASSET (Official brand logo/emblem)
    if (visualEv && visualEv.visual_kind === 'OFFICIAL_IDENTITY_ASSET' && visualEv.asset_file_or_embed_url) {
      const grad = (brandMark && brandMark.bgGradient) || visualEv.theme_gradient || 'linear-gradient(135deg, #0F172A, #1E293B)';
      return \`
        <!-- Official Brand Logo Canvas (16:9, JAYT-221) -->
        <div class="jayt-card-visual-canvas" style="aspect-ratio:16/9; width:100%; position:relative; overflow:hidden; border-top-left-radius:20px; border-top-right-radius:20px; background:\${grad}; display:flex; flex-direction:column; justify-content:space-between; padding:14px;">
          <div style="position:absolute; top:0; left:0; width:100%; height:100%; display:flex; align-items:center; justify-content:center; padding:16px; background:radial-gradient(circle, rgba(255,255,255,0.06) 0%, rgba(0,0,0,0.3) 100%); z-index:1;">
            <img src="\${esc(visualEv.asset_file_or_embed_url)}" alt="\${esc(brandName)}" style="max-width:70%; max-height:65px; object-fit:contain; filter:drop-shadow(0 6px 14px rgba(0,0,0,0.45));" />
          </div>
          <div style="position:absolute; top:0; left:0; width:100%; height:100%; background:linear-gradient(180deg, rgba(11,15,25,0.55) 0%, rgba(11,15,25,0.05) 50%, rgba(11,15,25,0.78) 100%); z-index:1; pointer-events:none;"></div>
          <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:8px; position:relative; z-index:2;">
            <div style="display:flex; align-items:center; gap:8px; background:rgba(11,15,25,0.7); backdrop-filter:blur(6px); padding:4px 10px; border-radius:10px; border:1px solid rgba(255,255,255,0.2);">
              <span style="font-size:11px; font-weight:900; color:#38BDF8;">\${esc(brandTag)}</span>
              <span style="font-size:13.5px; font-weight:800; color:#FFFFFF;">\${esc(brandName)}</span>
            </div>
            \${tierBadgeHTML}
          </div>
          <div style="font-size:10.5px; color:#F1F5F9; background:rgba(11,15,25,0.75); backdrop-filter:blur(6px); padding:3.5px 9px; border-radius:6px; align-self:flex-start; border:1px solid rgba(255,255,255,0.2); position:relative; z-index:2; font-weight:600;">
            🏛️ \${esc(visualEv.render_label)}
          </div>
        </div>
      \`;
    }

    // 3. JAYT IDENTITY VISUAL (Standard Monogram & Brand Palette Canvas)
    const gradient = (brandMark && brandMark.bgGradient) || (visualEv && (visualEv.theme_gradient || visualEv.gradient)) || 'linear-gradient(135deg, #1E293B, #334155)';
    const accent = (brandMark && brandMark.accentColor) || (visualEv && visualEv.accent_color) || '#93C5FD';
    const monogram = (visualEv && visualEv.monogram) || brandTag;
    const label = (visualEv && visualEv.render_label) || 'Nhận diện thương hiệu JayT — chưa có ảnh ưu đãi/địa điểm xác minh';

    return \`
      <!-- Editorial Brand Canvas (16:9, JAYT-221) -->
      <div class="jayt-card-visual-canvas" style="aspect-ratio:16/9; width:100%; background:\${gradient}; padding:14px; border-top-left-radius:20px; border-top-right-radius:20px; display:flex; flex-direction:column; justify-content:space-between; position:relative; overflow:hidden;">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:8px; position:relative; z-index:2;">
          <div style="display:flex; align-items:center; gap:10px;">
            <div style="width:48px; height:48px; border-radius:14px; background:rgba(255,255,255,0.18); backdrop-filter:blur(8px); border:1px solid rgba(255,255,255,0.3); color:#FFFFFF; font-size:18px; font-weight:900; display:flex; align-items:center; justify-content:center; box-shadow:0 4px 12px rgba(0,0,0,0.2);">
              \${esc(monogram)}
            </div>
            <div>
              <span style="font-size:14.5px; font-weight:900; color:#FFFFFF; display:block; text-shadow:0 1px 3px rgba(0,0,0,0.4);">\${esc(brandName)}</span>
              <span style="font-size:11px; color:\${accent}; font-weight:700; display:block; margin-top:2px;">📁 \${esc(categoryName || 'Nguồn chính thức')}</span>
            </div>
          </div>
          \${tierBadgeHTML}
        </div>
        <div style="font-size:10px; color:#E2E8F0; background:rgba(11,15,25,0.65); backdrop-filter:blur(6px); padding:3.5px 8px; border-radius:6px; align-self:flex-start; border:1px solid rgba(255,255,255,0.18); position:relative; z-index:2; font-weight:600;">
          🏷️ \${esc(label)}
        </div>
      </div>
    \`;
  }`;

// Replace renderCardVisualHeaderHTML
const headerRegex = /function renderCardVisualHeaderHTML[\s\S]*?\n\s*\}\n/;
if (headerRegex.test(code)) {
  code = code.replace(headerRegex, newVisualHeaderFunc + '\n');
  console.log('✅ Replaced renderCardVisualHeaderHTML with 16:9 and 20px radius');
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
      <header class="apex-cockpit-navbar" role="banner" style="background:\${isDark ? 'rgba(11,15,25,0.85)' : 'rgba(255,255,255,0.92)'}; backdrop-filter:blur(16px); border-bottom:1px solid \${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}; padding:10px 20px; position:sticky; top:0; z-index:100; display:flex; justify-content:space-between; align-items:center; gap:12px;">
        <a href="#" data-nav="dashboard" class="apex-nav-brand-title" aria-label="Trang chủ JayT Đà Nẵng" style="display:flex; align-items:center; text-decoration:none;">
          \${logoSvg}
        </a>

        <div class="apex-nav-middle-capsule" style="display:flex; align-items:center; gap:8px;">
          <select id="select-hub-district" class="apex-nav-select" aria-label="Chọn khu vực" style="border-radius:12px; font-weight:700; padding:6px 12px; font-size:12.5px; border:1px solid \${isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)'}; background:\${isDark ? '#1E293B' : '#F8FAFC'}; color:\${isDark ? '#F1F5F9' : '#0F172A'};">
            \${districts.map(d => \`<option value="\${d.id}" \${state.selectedDistrict === d.id ? 'selected' : ''}>\${d.label}</option>\`).join('')}
          </select>

          <button id="btn-toggle-theme" class="apex-btn-secondary" aria-label="Đổi giao diện Sáng / Tối" style="border-radius:12px; padding:6px 12px; font-weight:700; font-size:12.5px; display:flex; align-items:center; gap:6px;">
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
  console.log('✅ Replaced renderGlassCapsuleNavbar with Master Brand SVG');
}

fs.writeFileSync(interfacePath, code, 'utf8');
console.log('✅ Successfully applied JAYT-221 brand updates to jayt_apex_interface.js!');
