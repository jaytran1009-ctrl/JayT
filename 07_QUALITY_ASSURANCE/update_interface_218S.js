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
  // JAYT-218S: CARD-LEVEL REAL VISUAL EVIDENCE REGISTRY (EXACT POSTER BINDING)
  // =========================================================================
  const CARD_VISUAL_EVIDENCE_REGISTRY_218S = ${JSON.stringify(registryObj, null, 2)};
  const CARD_VISUAL_EVIDENCE_REGISTRY_218R = CARD_VISUAL_EVIDENCE_REGISTRY_218S;
  const CARD_VISUAL_EVIDENCE_REGISTRY_218 = CARD_VISUAL_EVIDENCE_REGISTRY_218S;
  const CARD_VISUAL_EVIDENCE_REGISTRY_217 = CARD_VISUAL_EVIDENCE_REGISTRY_218S;
  const CARD_VISUAL_EVIDENCE_REGISTRY_216 = CARD_VISUAL_EVIDENCE_REGISTRY_218S;
  const CARD_VISUAL_EVIDENCE_REGISTRY_215 = CARD_VISUAL_EVIDENCE_REGISTRY_218S;
  const CARD_VISUAL_EVIDENCE_REGISTRY_213 = CARD_VISUAL_EVIDENCE_REGISTRY_218S;

  function findCardVisualEvidence(dealId, brandName) {
    if (dealId) {
      const found = CARD_VISUAL_EVIDENCE_REGISTRY_218S.cards.find(c => c.deal_id === dealId || c.card_id === dealId);
      if (found) return found;
    }
    if (brandName) {
      const norm = brandName.toLowerCase();
      const found = CARD_VISUAL_EVIDENCE_REGISTRY_218S.cards.find(c => c.brand && c.brand.toLowerCase().includes(norm));
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

  // JAYT-218S: VISUAL TRUTH CARD HEADER RENDERER
  function renderCardVisualHeaderHTML(visualEv, brandName, categoryName, tierBadgeHTML) {
    // 1. EXACT PROMOTION POSTER (Real promotion poster from brand portal)
    if (visualEv && visualEv.visual_kind === 'EXACT_PROMOTION' && visualEv.asset_file_or_embed_url) {
      return \`
        <!-- Exact Promotion Poster Header (JAYT-218S) -->
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
        <!-- Official Brand Logo Header (JAYT-218S) -->
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
      <!-- Large Visual Canvas Header (JayT Identity Visual - JAYT-218S) -->
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
const oldRegRegex = /\/\/\s*==+\s*\n\s*\/\/\s*JAYT-218S: CARD-LEVEL REAL VISUAL EVIDENCE REGISTRY[\s\S]*?const findBrandIdentityTile = findBrandVisualProfile;/;
if (!oldRegRegex.test(code)) {
  console.error('❌ Could not find old registry in jayt_apex_interface.js');
  process.exit(1);
}

code = code.replace(oldRegRegex, registryJsSnippet + `\n\n  const findBrandVisualProfile = (brand) => findCardVisualEvidence(null, brand);\n  const findBrandIdentityTile = findBrandVisualProfile;`);

fs.writeFileSync(interfacePath, code, 'utf8');
console.log('✅ Corrected jayt_apex_interface.js with renderCardVisualHeaderHTML intact!');
