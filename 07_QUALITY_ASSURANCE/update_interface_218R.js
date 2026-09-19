const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const interfacePath = path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'jayt_apex_interface.js');
let code = fs.readFileSync(interfacePath, 'utf8');

const registryPath = path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'card_visual_evidence_registry.json');
const registryJson = fs.readFileSync(registryPath, 'utf8');
const registryObj = JSON.parse(registryJson);

// 1. Build the registry replacement code
const registryJsSnippet = `  // =========================================================================
  // JAYT-218R: CARD-LEVEL REAL VISUAL EVIDENCE REGISTRY (RECLASSIFY & PROMO MEDIA)
  // =========================================================================
  const CARD_VISUAL_EVIDENCE_REGISTRY_218R = ${JSON.stringify(registryObj, null, 2)};
  const CARD_VISUAL_EVIDENCE_REGISTRY_218 = CARD_VISUAL_EVIDENCE_REGISTRY_218R;
  const CARD_VISUAL_EVIDENCE_REGISTRY_217 = CARD_VISUAL_EVIDENCE_REGISTRY_218R;
  const CARD_VISUAL_EVIDENCE_REGISTRY_216 = CARD_VISUAL_EVIDENCE_REGISTRY_218R;
  const CARD_VISUAL_EVIDENCE_REGISTRY_215 = CARD_VISUAL_EVIDENCE_REGISTRY_218R;
  const CARD_VISUAL_EVIDENCE_REGISTRY_213 = CARD_VISUAL_EVIDENCE_REGISTRY_218R;

  function findCardVisualEvidence(dealId, brandName) {
    if (dealId) {
      const found = CARD_VISUAL_EVIDENCE_REGISTRY_218R.cards.find(c => c.deal_id === dealId || c.card_id === dealId);
      if (found) return found;
    }
    if (brandName) {
      const norm = brandName.toLowerCase();
      const found = CARD_VISUAL_EVIDENCE_REGISTRY_218R.cards.find(c => c.brand && c.brand.toLowerCase().includes(norm));
      if (found) return found;
    }
    const initial = (brandName || 'JT').trim().substring(0, 2).toUpperCase();
    return {
      card_id: "CARD_FALLBACK_" + (dealId || "GENERIC"),
      deal_id: dealId || null,
      brand: brandName || "Đối tác đã ghi nhận",
      visual_kind: "IDENTITY_VISUAL",
      monogram: initial,
      gradient: "linear-gradient(135deg, #1E293B, #334155)",
      border: "#64748B",
      accent: "#E2E8F0",
      tagline: "Nguồn chính thức đã ghi nhận",
      render_label: "Nhận diện thương hiệu JayT — chưa có ảnh ưu đãi/địa điểm xác minh",
      rights_basis: "IDENTITY_CANVAS_NO_MEDIA_LICENSE_ASSERTED"
    };
  }

  // JAYT-218R: VISUAL TRUTH CARD HEADER RENDERER
  function renderCardVisualHeaderHTML(visualEv, brandName, categoryName, tierBadgeHTML) {
    // 1. EXACT PROMOTION POSTER (Real promotion poster from brand portal)
    if (visualEv && visualEv.visual_kind === 'EXACT_PROMOTION' && visualEv.asset_file_or_embed_url) {
      return \`
        <!-- Exact Promotion Poster Header (JAYT-218R) -->
        <div class="jayt-card-visual-canvas" style="min-height:165px; height:170px; position:relative; overflow:hidden; border-bottom:1px solid rgba(0,0,0,0.18); display:flex; flex-direction:column; justify-content:space-between; padding:16px;">
          <img src="\${esc(visualEv.asset_file_or_embed_url)}" alt="\${esc(brandName)}" style="position:absolute; top:0; left:0; width:100%; height:100%; object-fit:cover; object-position:center top; z-index:1;" />
          <div style="position:absolute; top:0; left:0; width:100%; height:100%; background:linear-gradient(180deg, rgba(15,23,42,0.68) 0%, rgba(15,23,42,0.15) 50%, rgba(15,23,42,0.85) 100%); z-index:1; pointer-events:none;"></div>
          <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:8px; position:relative; z-index:2;">
            <div style="display:flex; align-items:center; gap:10px;">
              <span style="font-size:11px; font-weight:900; color:#FFF; background:rgba(0,0,0,0.65); backdrop-filter:blur(4px); padding:4px 10px; border-radius:6px; border:1px solid rgba(255,255,255,0.35);">\${esc(visualEv.monogram)}</span>
              <span style="font-size:15px; font-weight:900; color:#FFF; text-shadow:0 2px 6px rgba(0,0,0,0.85);">\${esc(brandName)}</span>
            </div>
            \${tierBadgeHTML}
          </div>
          <div style="font-size:10px; color:#F8FAFC; background:rgba(15,23,42,0.75); backdrop-filter:blur(6px); padding:3.5px 8px; border-radius:4px; align-self:flex-start; border:1px solid rgba(255,255,255,0.3); position:relative; z-index:2; font-weight:600;">
            🏷️ \${esc(visualEv.render_label)}
          </div>
        </div>
      \`;
    }

    // 2. OFFICIAL IDENTITY ASSET (Official brand logo/emblem from press kit)
    if (visualEv && visualEv.visual_kind === 'OFFICIAL_IDENTITY_ASSET' && visualEv.asset_file_or_embed_url) {
      return \`
        <!-- Official Brand Logo Header (JAYT-218R) -->
        <div class="jayt-card-visual-canvas" style="min-height:156px; height:160px; position:relative; overflow:hidden; border-bottom:1px solid rgba(0,0,0,0.15); display:flex; flex-direction:column; justify-content:space-between; padding:16px; background:\${visualEv.theme_gradient || 'linear-gradient(135deg, #0F172A, #1E293B)'};">
          <div style="position:absolute; top:0; left:0; width:100%; height:100%; display:flex; align-items:center; justify-content:center; padding:16px; background:rgba(0,0,0,0.2); z-index:1;">
            <img src="\${esc(visualEv.asset_file_or_embed_url)}" alt="\${esc(brandName)}" style="max-width:80%; max-height:75px; object-fit:contain; filter:drop-shadow(0 4px 10px rgba(0,0,0,0.35));" />
          </div>
          <div style="position:absolute; top:0; left:0; width:100%; height:100%; background:linear-gradient(180deg, rgba(15,23,42,0.6) 0%, rgba(15,23,42,0.05) 50%, rgba(15,23,42,0.75) 100%); z-index:1; pointer-events:none;"></div>
          <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:8px; position:relative; z-index:2;">
            <div style="display:flex; align-items:center; gap:10px;">
              <span style="font-size:11px; font-weight:900; color:#FFF; background:rgba(0,0,0,0.6); backdrop-filter:blur(4px); padding:4px 10px; border-radius:6px; border:1px solid rgba(255,255,255,0.3);">\${esc(visualEv.monogram)}</span>
              <span style="font-size:15px; font-weight:900; color:#FFF; text-shadow:0 2px 6px rgba(0,0,0,0.8);">\${esc(brandName)}</span>
            </div>
            \${tierBadgeHTML}
          </div>
          <div style="font-size:10px; color:#F1F5F9; background:rgba(0,0,0,0.65); backdrop-filter:blur(6px); padding:3px 8px; border-radius:4px; align-self:flex-start; border:1px solid rgba(255,255,255,0.25); position:relative; z-index:2;">
            🏛️ \${esc(visualEv.render_label)}
          </div>
        </div>
      \`;
    }

    // 3. JAYT IDENTITY VISUAL (Standard Monogram & Brand Palette Canvas)
    const gradient = (visualEv && (visualEv.theme_gradient || visualEv.gradient)) || 'linear-gradient(135deg, #1E293B, #334155)';
    const border = (visualEv && (visualEv.border_color || visualEv.border)) || '#475569';
    const accent = (visualEv && visualEv.accent_color) || (visualEv && visualEv.accent) || '#93C5FD';
    const monogram = (visualEv && visualEv.monogram) || (brandName || 'JT').substring(0, 2).toUpperCase();
    const label = (visualEv && visualEv.render_label) || 'Nhận diện thương hiệu JayT — chưa có ảnh ưu đãi/địa điểm xác minh';

    return \`
      <!-- Large Visual Canvas Header (JayT Identity Visual - JAYT-218R) -->
      <div class="jayt-card-visual-canvas" style="background:\${gradient}; min-height:156px; padding:16px; border-bottom:1px solid \${border}; display:flex; flex-direction:column; justify-content:space-between; position:relative; overflow:hidden;">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:8px; position:relative; z-index:2;">
          <div style="display:flex; align-items:center; gap:12px;">
            <div style="width:56px; height:56px; border-radius:16px; background:rgba(255,255,255,0.22); backdrop-filter:blur(6px); border:1.5px solid rgba(255,255,255,0.38); color:#FFF; font-size:22px; font-weight:900; display:flex; align-items:center; justify-content:center; letter-spacing:0.5px; box-shadow:0 4px 12px rgba(0,0,0,0.15);">
              \${esc(monogram)}
            </div>
            <div>
              <span style="font-size:15px; font-weight:900; color:#FFF; display:block; text-shadow:0 1px 3px rgba(0,0,0,0.3);">\${esc(brandName)}</span>
              <span style="font-size:11.5px; color:\${accent}; font-weight:700; display:block; margin-top:2px;">📁 \${esc(categoryName || 'Nguồn chính thức')}</span>
            </div>
          </div>
          \${tierBadgeHTML}
        </div>
        <div style="font-size:10px; color:#E2E8F0; background:rgba(0,0,0,0.4); backdrop-filter:blur(4px); padding:3px 8px; border-radius:4px; align-self:flex-start; border:1px solid rgba(255,255,255,0.2); position:relative; z-index:2;">
          📷 \${esc(label)}
        </div>
      </div>
    \`;
  }`;

// Replace old registry definition
const oldRegRegex = /\/\/\s*==+\s*\n\s*\/\/\s*JAYT-218: CARD-LEVEL REAL VISUAL EVIDENCE REGISTRY[\s\S]*?const findBrandIdentityTile = findBrandVisualProfile;/;
if (!oldRegRegex.test(code)) {
  console.error('❌ Could not find old registry in jayt_apex_interface.js');
  process.exit(1);
}

code = code.replace(oldRegRegex, registryJsSnippet + `\n\n  const findBrandVisualProfile = (brand) => findCardVisualEvidence(null, brand);\n  const findBrandIdentityTile = findBrandVisualProfile;`);

// Update modal render Section 1
const modalSection1Old = /<!-- SECTION 1: HERO VISUAL LỚN[\s\S]*?<!-- SECTION 2: VISUAL GALLERY/;
const modalSection1New = `<!-- SECTION 1: HERO VISUAL LỚN (JAYT-218R PROMO & IDENTITY HERO) -->
            <div style="background:\${visualEv.theme_gradient || visualEv.gradient || 'linear-gradient(135deg, #1E1B4B, #312E81)'}; border-radius:14px; padding:20px; border:1px solid \${visualEv.border_color || visualEv.border || '#4338CA'}; color:#FFF; box-shadow:0 6px 24px rgba(0,0,0,0.18); position:relative; overflow:hidden;">
              \${visualEv.visual_kind === 'EXACT_PROMOTION' && visualEv.asset_file_or_embed_url ? \`
                <div style="position:absolute; top:0; right:0; bottom:0; width:45%; opacity:0.85; pointer-events:none;">
                  <img src="\${esc(visualEv.asset_file_or_embed_url)}" alt="\${esc(brand)}" style="width:100%; height:100%; object-fit:cover; object-position:center top; mask-image:linear-gradient(to left, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%); -webkit-mask-image:linear-gradient(to left, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%);" />
                </div>
              \` : visualEv.asset_file_or_embed_url ? \`
                <div style="position:absolute; top:0; right:20px; bottom:0; width:180px; display:flex; align-items:center; justify-content:center; opacity:0.85; pointer-events:none;">
                  <img src="\${esc(visualEv.asset_file_or_embed_url)}" alt="\${esc(brand)}" style="max-width:100%; max-height:80px; object-fit:contain;" />
                </div>
              \` : ''}
              <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:12px; position:relative; z-index:2;">
                <div style="display:flex; align-items:center; gap:14px;">
                  <div style="width:56px; height:56px; border-radius:16px; background:rgba(255,255,255,0.18); backdrop-filter:blur(6px); border:1.5px solid rgba(255,255,255,0.35); color:#FFF; font-size:22px; font-weight:900; display:flex; align-items:center; justify-content:center; letter-spacing:0.5px;">
                    \${esc(visualEv.monogram)}
                  </div>
                  <div>
                    <div style="font-size:19px; font-weight:900; color:#FFFFFF; letter-spacing:-0.2px;">\${esc(brand)}</div>
                    <div style="font-size:12px; color:\${visualEv.accent_color || visualEv.accent || '#93C5FD'}; font-weight:700; margin-top:3px;">📁 \${esc(deal.category || 'Ưu đãi')} · \${esc(visualEv.tagline || brand)}</div>
                  </div>
                </div>
                <div style="display:flex; flex-direction:column; align-items:flex-end; gap:6px;">
                  \${tierBadge}
                  <span style="font-size:10px; color:#E2E8F0; background:rgba(0,0,0,0.35); padding:2px 8px; border-radius:4px; border:1px solid rgba(255,255,255,0.2);">
                    \${visualEv.visual_kind === 'EXACT_PROMOTION' ? '🏷️' : '📷'} \${esc(visualEv.render_label || 'Nhận diện thương hiệu JayT — chưa có ảnh ưu đãi/địa điểm xác minh')}
                  </span>
                </div>
              </div>
            </div>

            <!-- SECTION 2: VISUAL GALLERY`;

code = code.replace(modalSection1Old, modalSection1New);

// Update OS badge and tags
code = code.replace(/Real Content Supply OS 3\.358/g, 'Promo Media Truth OS 3.359');
code = code.replace(/Chuẩn JAYT-218/g, 'Chuẩn JAYT-218R');

// Update visual evidence dashboard snippet to the exact 4 metrics required by JAYT-218R
const oldDashboardRegex = /<!-- KHỐI ĐỐI SOÁT HÌNH ẢNH CẤP CARD[\s\S]*?<!-- KHỐI TỔNG QUAN 5 TẦNG NGUỒN CUNG/;
const newDashboardSnippet = `<!-- KHỐI ĐỐI SOÁT HÌNH ẢNH CẤP CARD (PROMO MEDIA TRUTH - JAYT-218R) -->
        <section class="jayt-visual-evidence-dashboard-card" style="background:var(--bg-surface); border:1.5px solid #3B82F6; border-radius:var(--radius-lg); padding:12px 14px; margin-top:8px; margin-bottom:10px; box-shadow:var(--shadow-sm);">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; flex-wrap:wrap; gap:6px;">
            <div style="font-size:11.5px; font-weight:800; color:#1D4ED8; text-transform:uppercase; letter-spacing:0.5px;">
              📊 ĐỐI SOÁT NGUỒN CUNG HÌNH ẢNH (PROMO MEDIA TRUTH)
            </div>
            <span class="apex-badge" style="background:#EFF6FF; color:#1E40AF; border:1px solid #BFDBFE; font-weight:800; font-size:10.5px; padding:2px 8px;">
              🎯 3 Poster Ưu Đãi Thật · 6 Logo Nhận Diện Gốc
            </span>
          </div>

          <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap:8px;">
            <div style="padding:8px 10px; background:var(--bg-surface-subtle); border-radius:var(--radius-sm); border-left:3px solid #059669;">
              <div style="font-size:10.5px; color:var(--text-muted); font-weight:600;">🏷️ Exact Promotion Visual</div>
              <div style="font-size:14px; font-weight:800; color:#059669; margin-top:2px;">3/29 (10.3%)</div>
              <div style="font-size:10px; color:var(--text-muted);">Metiz U22, Metiz 55k, Starlight U22</div>
            </div>
            <div style="padding:8px 10px; background:var(--bg-surface-subtle); border-radius:var(--radius-sm); border-left:3px solid #64748B;">
              <div style="font-size:10.5px; color:var(--text-muted); font-weight:600;">🏢 Exact Venue Visual</div>
              <div style="font-size:14px; font-weight:800; color:var(--text-charcoal-main); margin-top:2px;">0/29 (0%)</div>
              <div style="font-size:10px; color:var(--text-muted);">Chờ ảnh chụp thực địa của Scout</div>
            </div>
            <div style="padding:8px 10px; background:var(--bg-surface-subtle); border-radius:var(--radius-sm); border-left:3px solid #3B82F6;">
              <div style="font-size:10.5px; color:var(--text-muted); font-weight:600;">🏛️ Official Identity Assets</div>
              <div style="font-size:14px; font-weight:800; color:#1D4ED8; margin-top:2px;">6/29 (20.7%)</div>
              <div style="font-size:10px; color:var(--text-muted);">Spotify, MSFT, Figma, AWS, CGV, DVC</div>
            </div>
            <div style="padding:8px 10px; background:var(--bg-surface-subtle); border-radius:var(--radius-sm); border-left:3px solid #D97706;">
              <div style="font-size:10.5px; color:var(--text-muted); font-weight:600;">🎨 JayT Identity Visuals</div>
              <div style="font-size:14px; font-weight:800; color:#B45309; margin-top:2px;">20/29 (69.0%)</div>
              <div style="font-size:10px; color:var(--text-muted);">Khung nhận diện Monogram JayT</div>
            </div>
          </div>
        </section>

        <!-- KHỐI TỔNG QUAN 5 TẦNG NGUỒN CUNG`;

code = code.replace(oldDashboardRegex, newDashboardSnippet);

fs.writeFileSync(interfacePath, code, 'utf8');
console.log('✅ Successfully updated jayt_apex_interface.js for JAYT-218R Promo Media Truth!');
