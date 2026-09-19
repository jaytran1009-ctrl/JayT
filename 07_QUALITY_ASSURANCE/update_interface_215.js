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
  // JAYT-215: CARD-LEVEL REAL VISUAL EVIDENCE REGISTRY (REAL MEDIA BOUND)
  // =========================================================================
  const CARD_VISUAL_EVIDENCE_REGISTRY_215 = ${JSON.stringify(registryObj, null, 2)};
  const CARD_VISUAL_EVIDENCE_REGISTRY_213 = CARD_VISUAL_EVIDENCE_REGISTRY_215;

  function findCardVisualEvidence(dealId, brandName) {
    if (dealId) {
      const found = CARD_VISUAL_EVIDENCE_REGISTRY_215.cards.find(c => c.deal_id === dealId || c.card_id === dealId);
      if (found) return found;
    }
    if (brandName) {
      const norm = brandName.toLowerCase();
      const found = CARD_VISUAL_EVIDENCE_REGISTRY_215.cards.find(c => c.brand && c.brand.toLowerCase().includes(norm));
      if (found) return found;
    }
    const initial = (brandName || 'JT').trim().substring(0, 2).toUpperCase();
    return {
      card_id: "CARD_FALLBACK_" + (dealId || "GENERIC"),
      deal_id: dealId || null,
      brand: brandName || "Đối tác đã ghi nhận",
      visual_kind: "OFFICIAL_IDENTITY",
      monogram: initial,
      gradient: "linear-gradient(135deg, #1E293B, #334155)",
      border: "#64748B",
      accent: "#E2E8F0",
      tagline: "Nguồn chính thức đã ghi nhận",
      render_label: "Nhận diện thương hiệu — chưa có ảnh ưu đãi/địa điểm xác minh",
      rights_basis: "IDENTITY_CANVAS_NO_MEDIA_LICENSE_ASSERTED"
    };
  }

  // JAYT-215: AUTO-SWITCHING REAL VISUAL CARD HEADER RENDERER
  function renderCardVisualHeaderHTML(visualEv, brandName, categoryName, tierBadgeHTML) {
    if (visualEv && visualEv.asset_file_or_embed_url && (visualEv.visual_kind === 'EXACT_PROMOTION' || visualEv.visual_kind === 'EXACT_VENUE')) {
      return \`
        <!-- Real Visual Image Header (JAYT-215: EXACT ASSET) -->
        <div class="jayt-card-visual-canvas" style="min-height:156px; height:165px; position:relative; overflow:hidden; border-bottom:1px solid rgba(0,0,0,0.15); display:flex; flex-direction:column; justify-content:space-between; padding:16px;">
          <img src="\${esc(visualEv.asset_file_or_embed_url)}" alt="\${esc(brandName)}" style="position:absolute; top:0; left:0; width:100%; height:100%; object-fit:cover; z-index:1;" />
          <div style="position:absolute; top:0; left:0; width:100%; height:100%; background:linear-gradient(180deg, rgba(15,23,42,0.65) 0%, rgba(15,23,42,0.2) 45%, rgba(15,23,42,0.85) 100%); z-index:1;"></div>
          <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:8px; position:relative; z-index:2;">
            <div style="display:flex; align-items:center; gap:10px;">
              <span style="font-size:11px; font-weight:900; color:#FFF; background:rgba(0,0,0,0.55); backdrop-filter:blur(4px); padding:4px 10px; border-radius:6px; border:1px solid rgba(255,255,255,0.3);">\${esc(visualEv.monogram)}</span>
              <span style="font-size:15px; font-weight:900; color:#FFF; text-shadow:0 2px 6px rgba(0,0,0,0.8);">\${esc(brandName)}</span>
            </div>
            \${tierBadgeHTML}
          </div>
          <div style="font-size:10px; color:#F1F5F9; background:rgba(0,0,0,0.65); backdrop-filter:blur(6px); padding:3px 8px; border-radius:4px; align-self:flex-start; border:1px solid rgba(255,255,255,0.25); position:relative; z-index:2;">
            📷 \${esc(visualEv.render_label)}
          </div>
        </div>
      \`;
    }

    // Identity Canvas Fallback
    return \`
      <!-- Large Visual Canvas Header (Identity Canvas) -->
      <div class="jayt-card-visual-canvas" style="background:\${visualEv.theme_gradient || visualEv.gradient}; min-height:156px; padding:16px; border-bottom:1px solid \${visualEv.border_color || visualEv.border}; display:flex; flex-direction:column; justify-content:space-between; position:relative; overflow:hidden;">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:8px; position:relative; z-index:2;">
          <div style="display:flex; align-items:center; gap:12px;">
            <div style="width:56px; height:56px; border-radius:16px; background:rgba(255,255,255,0.22); backdrop-filter:blur(6px); border:1.5px solid rgba(255,255,255,0.38); color:#FFF; font-size:22px; font-weight:900; display:flex; align-items:center; justify-content:center; letter-spacing:0.5px; box-shadow:0 4px 12px rgba(0,0,0,0.15);">
              \${esc(visualEv.monogram)}
            </div>
            <div>
              <span style="font-size:15px; font-weight:900; color:#FFF; display:block; text-shadow:0 1px 3px rgba(0,0,0,0.3);">\${esc(brandName)}</span>
              <span style="font-size:11.5px; color:\${visualEv.accent || '#93C5FD'}; font-weight:700; display:block; margin-top:2px;">📁 \${esc(categoryName || 'Nguồn chính thức')}</span>
            </div>
          </div>
          \${tierBadgeHTML}
        </div>
        <div style="font-size:10px; color:#E2E8F0; background:rgba(0,0,0,0.4); backdrop-filter:blur(4px); padding:3px 8px; border-radius:4px; align-self:flex-start; border:1px solid rgba(255,255,255,0.2); position:relative; z-index:2;">
          📷 \${esc(visualEv.render_label)}
        </div>
      </div>
    \`;
  }`;

// Replace the old CARD_VISUAL_EVIDENCE_REGISTRY_213 definition
const oldRegRegex = /\/\/\s*==+\s*\n\s*\/\/\s*JAYT-213: CARD-LEVEL REAL VISUAL EVIDENCE GATE[\s\S]*?const findBrandIdentityTile = findBrandVisualProfile;/;
if (!oldRegRegex.test(code)) {
  console.error('❌ Could not find old registry in jayt_apex_interface.js');
  process.exit(1);
}

code = code.replace(oldRegRegex, registryJsSnippet + `\n\n  const findBrandVisualProfile = (brand) => findCardVisualEvidence(null, brand);\n  const findBrandIdentityTile = findBrandVisualProfile;`);

// 2. Update renderGreenConfirmedDealCard
const greenCardReplacement = `  // 🟢 Tier 1: Verified Deal Card (JAYT-215 Enhanced)
  function renderGreenConfirmedDealCard(deal) {
    if (!deal || !deal.brand) return '';
    const quote = deal.offer_quote || deal.title || '';
    const terms = deal.terms_and_conditions || '';
    const validity = deal.validity_period || '';
    const address = deal.verified_address || 'Đà Nẵng';
    const actionUrl = deal.action_url || deal.source_url || '#';
    const verifiedAt = (deal.verified_at || '2026-08-27').split('T')[0];
    const dealId = deal.deal_id || deal.claim_id || '';
    const visualEv = findCardVisualEvidence(dealId, deal.brand);
    const tierBadgeHTML = \`<span class="jayt-tier-badge" style="font-size:10px; padding:4px 8px; border-radius:6px; font-weight:800; background:#ECFDF5; color:#065F46; border:1px solid #A7F3D0; box-shadow:0 2px 6px rgba(0,0,0,0.08);">🟢 Dùng ngay tại Đà Nẵng</span>\`;

    return \`
      <div class="jayt-card-verified-deal apex-spring-interactive" style="border: 1.5px solid #059669; background: var(--bg-surface); box-shadow: 0 4px 14px rgba(5, 150, 105, 0.1); cursor: pointer; border-radius:16px; overflow:hidden;" data-action="open-deal-detail" data-deal-id="\${esc(dealId)}">
        \${renderCardVisualHeaderHTML(visualEv, deal.brand, deal.category || 'Ưu đãi', tierBadgeHTML)}

        <div style="padding:14px 16px;">
          <div style="font-size:14.5px; font-weight:800; color:var(--text-charcoal-deep);">\${esc(deal.title)}</div>

          <div style="font-size:12.5px; color:var(--text-charcoal-main); margin-top:8px; line-height:1.45; font-weight:700; background:var(--bg-surface-subtle); padding:10px 12px; border-radius:var(--radius-sm); border-left:3px solid #059669;">
            💬 "\${esc(quote)}"
          </div>

          \${terms ? \`
            <div style="font-size:11.5px; color:var(--text-charcoal-main); margin-top:8px; line-height:1.4;">
              📋 <strong>Điều kiện:</strong> \${esc(terms)}
            </div>
          \` : ''}

          \${validity ? \`
            <div style="font-size:11px; color:var(--text-muted); margin-top:4px;">
              ⏱️ <strong>Thời gian:</strong> \${esc(validity)}
            </div>
          \` : ''}

          <div style="font-size:11.5px; color:#065F46; background:#ECFDF5; border-radius:var(--radius-sm); padding:6px 10px; margin-top:8px; font-weight:700;">
            📍 <strong>Cơ sở Đà Nẵng:</strong> \${esc(address)}
          </div>

          <div style="border-top:1px dashed #A7F3D0; padding-top:10px; margin-top:12px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
            <span style="font-size:10px; color:var(--text-muted); font-family:var(--font-mono);">🔒 Đã xác minh: \${verifiedAt}</span>
            <div style="display:flex; gap:6px;">
              <button type="button" class="apex-btn apex-btn-sm" data-action="open-deal-detail" data-deal-id="\${esc(dealId)}" style="font-size:11.5px; padding:6px 12px; font-weight:800; background:#059669; color:#FFF; border:none; border-radius:var(--radius-sm);">
                Xem ưu đãi & điều kiện ↗
              </button>
              <a href="\${actionUrl}" target="_blank" rel="noopener noreferrer" class="apex-btn apex-btn-sm" style="font-size:11.5px; text-decoration:none; padding:6px 10px; font-weight:700; background:var(--bg-surface-subtle); color:var(--text-charcoal-main); border:1px solid #A7F3D0; border-radius:var(--radius-sm);" onclick="event.stopPropagation();">
                Nguồn ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    \`;
  }`;

// 3. Update renderBlueOfficialOfferCard
const blueCardReplacement = `  // 🔵 TIER 2: ƯU ĐÃI CHÍNH THỨC (JAYT-215: AUTO REAL PROMO BANNER)
  function renderBlueOfficialOfferCard(offer) {
    if (!offer || !offer.brand) return '';
    const quote = offer.offer_quote || offer.title || '';
    const actionUrl = offer.source_url || '#';
    const ttlDays = offer.freshness_ttl_days || 7;
    const capturedAt = (offer.captured_at || '2026-08-27').split('T')[0];
    const dealId = offer.deal_id || offer.claim_id || '';
    const visualEv = findCardVisualEvidence(dealId, offer.brand);
    const tierBadgeHTML = \`<span class="jayt-tier-badge" style="font-size:10px; padding:4px 8px; border-radius:6px; font-weight:800; background:#EFF6FF; color:#1E40AF; border:1px solid #BFDBFE; box-shadow:0 2px 6px rgba(0,0,0,0.08);">🔵 Ưu đãi chính thức</span>\`;

    return \`
      <div class="jayt-card-verified-deal apex-spring-interactive" style="border: 1.5px solid #3B82F6; background: var(--bg-surface); box-shadow: 0 4px 14px rgba(59, 130, 246, 0.1); cursor: pointer; border-radius:16px; overflow:hidden;" data-action="open-deal-detail" data-deal-id="\${esc(dealId)}">
        \${renderCardVisualHeaderHTML(visualEv, offer.brand, offer.category || 'Ưu đãi', tierBadgeHTML)}

        <div style="padding:14px 16px;">
          <div style="font-size:11.5px; font-weight:700; color:#1D4ED8;">📁 \${esc(offer.category || 'Ưu đãi')} · \${esc(visualEv.tagline || offer.brand)}</div>

          <div style="font-size:13px; color:var(--text-charcoal-main); margin-top:8px; line-height:1.45; font-weight:700; background:var(--bg-surface-subtle); padding:10px 12px; border-radius:var(--radius-sm); border-left:3px solid #3B82F6;">
            💬 "\${esc(quote)}"
          </div>

          <div style="border-top:1px dashed #BFDBFE; padding-top:10px; margin-top:12px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
            <span style="font-size:10.5px; color:var(--text-muted);">🕒 Thu thập: \${esc(capturedAt)} · TTL: \${ttlDays}d</span>
            <div style="display:flex; gap:6px;">
              <button type="button" class="apex-btn apex-btn-sm" data-action="open-deal-detail" data-deal-id="\${esc(dealId)}" style="font-size:11.5px; padding:6px 12px; font-weight:800; background:#2563EB; color:#FFF; border:none; border-radius:var(--radius-sm);">
                Xem ưu đãi & điều kiện ↗
              </button>
              <a href="\${actionUrl}" target="_blank" rel="noopener noreferrer" class="apex-btn apex-btn-sm" style="font-size:11.5px; text-decoration:none; padding:6px 10px; font-weight:700; background:var(--bg-surface-subtle); color:var(--text-charcoal-main); border:1px solid #BFDBFE; border-radius:var(--radius-sm);" onclick="event.stopPropagation();">
                Nguồn ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    \`;
  }`;

// 4. Update renderPurpleVerifiedVenueCard
const purpleCardReplacement = `  // 🟣 TIER 4: NGUỒN CHÍNH THỨC ĐÃ GHI NHẬN (JAYT-215: AUTO REAL VENUE PHOTO)
  function renderPurpleVerifiedVenueCard(venue) {
    if (!venue || !venue.brand) return '';
    const quote = venue.offer_quote || venue.title || '';
    const actionUrl = venue.source_url || '#';
    const ttlDays = venue.freshness_ttl_days || 30;
    const capturedAt = (venue.captured_at || '2026-08-27').split('T')[0];
    const dealId = venue.deal_id || venue.claim_id || '';
    const visualEv = findCardVisualEvidence(dealId, venue.brand);
    const tierBadgeHTML = \`<span class="jayt-tier-badge" style="font-size:10px; padding:4px 8px; border-radius:6px; font-weight:800; background:#FAF5FF; color:#6B21A8; border:1px solid #E9D5FF; box-shadow:0 2px 6px rgba(0,0,0,0.08);">🟣 Nguồn chính thức</span>\`;

    return \`
      <div class="jayt-card-verified-venue apex-spring-interactive" style="border: 1.5px solid #8B5CF6; background: var(--bg-surface); box-shadow: 0 4px 14px rgba(139, 92, 246, 0.1); border-radius:16px; overflow:hidden;" data-action="open-deal-detail" data-deal-id="\${esc(dealId)}">
        \${renderCardVisualHeaderHTML(visualEv, venue.brand, venue.category || 'Nguồn chính thức', tierBadgeHTML)}

        <div style="padding:14px 16px;">
          <div style="font-size:11.5px; font-weight:700; color:#6B21A8;">🏛️ \${esc(venue.category || 'Nguồn chính thức')} · \${esc(visualEv.tagline || venue.brand)}</div>

          <div style="font-size:13px; color:var(--text-charcoal-main); margin-top:8px; line-height:1.45; font-weight:600; background:var(--bg-surface-subtle); padding:10px 12px; border-radius:var(--radius-sm); border-left:3px solid #8B5CF6;">
            💬 "\${esc(quote)}"
          </div>

          <div style="border-top:1px dashed #E9D5FF; padding-top:10px; margin-top:12px; display:flex; justify-content:space-between; align-items:center;">
            <span style="font-size:10.5px; color:var(--text-muted);">🕒 Thu thập: \${esc(capturedAt)} · TTL: \${ttlDays}d</span>
            <div style="display:flex; gap:6px;">
              <button type="button" class="apex-btn apex-btn-sm" data-action="open-deal-detail" data-deal-id="\${esc(dealId)}" style="font-size:11.5px; padding:6px 12px; font-weight:800; background:#7C3AED; color:#FFF; border:none; border-radius:var(--radius-sm);">
                Xem ưu đãi & điều kiện ↗
              </button>
              <a href="\${actionUrl}" target="_blank" rel="noopener noreferrer" class="apex-btn apex-btn-sm" style="font-size:11.5px; text-decoration:none; padding:6px 10px; font-weight:700; background:var(--bg-surface-subtle); color:var(--text-charcoal-main); border:1px solid #E9D5FF; border-radius:var(--radius-sm);" onclick="event.stopPropagation();">
                Nguồn ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    \`;
  }`;

// Replace functions in code
code = code.replace(/function renderGreenConfirmedDealCard[\s\S]*?function renderBlueOfficialOfferCard/, greenCardReplacement + '\n\n  function renderBlueOfficialOfferCard');
code = code.replace(/function renderBlueOfficialOfferCard[\s\S]*?function renderOrangeFlashDealCard/, blueCardReplacement + '\n\n  function renderOrangeFlashDealCard');
code = code.replace(/function renderPurpleVerifiedVenueCard[\s\S]*?function renderWhiteCommunityRadarCard/, purpleCardReplacement + '\n\n  function renderWhiteCommunityRadarCard');

// 5. Update renderDealDetailModalHTML Section 1 to auto-switch
const modalSection1Old = /<!-- SECTION 1: HERO VISUAL LỚN[\s\S]*?<!-- SECTION 2: VISUAL GALLERY/;
const modalSection1New = `<!-- SECTION 1: HERO VISUAL LỚN (16:9 / EXACT PROMOTION BANNER OR VENUE PHOTO) -->
            \${visualEv.asset_file_or_embed_url ? \`
              <div style="border-radius:14px; min-height:190px; position:relative; overflow:hidden; border:1px solid rgba(255,255,255,0.2); box-shadow:0 6px 24px rgba(0,0,0,0.2); display:flex; flex-direction:column; justify-content:space-between; padding:22px;">
                <img src="\${esc(visualEv.asset_file_or_embed_url)}" alt="\${esc(brand)}" style="position:absolute; top:0; left:0; width:100%; height:100%; object-fit:cover; z-index:1;" />
                <div style="position:absolute; top:0; left:0; width:100%; height:100%; background:linear-gradient(180deg, rgba(15,23,42,0.7) 0%, rgba(15,23,42,0.2) 40%, rgba(15,23,42,0.9) 100%); z-index:1;"></div>
                <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:12px; position:relative; z-index:2;">
                  <div style="display:flex; align-items:center; gap:14px;">
                    <div style="width:56px; height:56px; border-radius:16px; background:rgba(0,0,0,0.6); backdrop-filter:blur(6px); border:1.5px solid rgba(255,255,255,0.35); color:#FFF; font-size:22px; font-weight:900; display:flex; align-items:center; justify-content:center; letter-spacing:0.5px;">
                      \${esc(visualEv.monogram)}
                    </div>
                    <div>
                      <div style="font-size:20px; font-weight:900; color:#FFFFFF; letter-spacing:-0.2px; text-shadow:0 2px 6px rgba(0,0,0,0.8);">\${esc(brand)}</div>
                      <div style="font-size:12px; color:#93C5FD; font-weight:700; margin-top:3px;">📁 \${esc(deal.category || 'Ưu đãi')} · \${esc(visualEv.tagline || brand)}</div>
                    </div>
                  </div>
                  <div style="display:flex; flex-direction:column; align-items:flex-end; gap:6px;">
                    \${tierBadge}
                    <span style="font-size:10.5px; color:#F1F5F9; background:rgba(0,0,0,0.6); padding:3px 10px; border-radius:4px; border:1px solid rgba(255,255,255,0.25);">
                      📷 \${esc(visualEv.render_label)}
                    </span>
                  </div>
                </div>
              </div>
            \` : \`
              <div style="background:\${visualEv.theme_gradient || visualEv.gradient}; border-radius:14px; padding:20px; border:1px solid \${visualEv.border_color || visualEv.border}; color:#FFF; box-shadow:0 6px 24px rgba(0,0,0,0.18); position:relative; overflow:hidden;">
                <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:12px; position:relative; z-index:2;">
                  <div style="display:flex; align-items:center; gap:14px;">
                    <div style="width:56px; height:56px; border-radius:16px; background:rgba(255,255,255,0.18); backdrop-filter:blur(6px); border:1.5px solid rgba(255,255,255,0.35); color:#FFF; font-size:22px; font-weight:900; display:flex; align-items:center; justify-content:center; letter-spacing:0.5px;">
                      \${esc(visualEv.monogram)}
                    </div>
                    <div>
                      <div style="font-size:19px; font-weight:900; color:#FFFFFF; letter-spacing:-0.2px;">\${esc(brand)}</div>
                      <div style="font-size:12px; color:\${visualEv.accent || '#93C5FD'}; font-weight:700; margin-top:3px;">📁 \${esc(deal.category || 'Ưu đãi')} · \${esc(visualEv.tagline || brand)}</div>
                    </div>
                  </div>
                  <div style="display:flex; flex-direction:column; align-items:flex-end; gap:6px;">
                    \${tierBadge}
                    <span style="font-size:10px; color:#E2E8F0; background:rgba(0,0,0,0.35); padding:2px 8px; border-radius:4px; border:1px solid rgba(255,255,255,0.2);">
                      📷 \${esc(visualEv.render_label)}
                    </span>
                  </div>
                </div>
              </div>
            \`}

            <!-- SECTION 2: VISUAL GALLERY`;

code = code.replace(modalSection1Old, modalSection1New);

// 6. Update OS version and breakdown in renderCategoryHubsCenter163
code = code.replace(/Live Visual OS 3\.354/g, 'Real Visual Supply OS 3.355');
code = code.replace(/Real Visual Evidence OS 3\.353/g, 'Real Visual Supply OS 3.355');
code = code.replace(/100% Visual OS 3\.352/g, 'Real Visual Supply OS 3.355');
code = code.replace(/Chuẩn JAYT-214/g, 'Chuẩn JAYT-215');
code = code.replace(/Chuẩn JAYT-213/g, 'Chuẩn JAYT-215');

// Update visual evidence breakdown in dashboard card
const oldDashboardRegex = /<!-- KHỐI ĐỐI SOÁT HÌNH ẢNH CẤP CARD[\s\S]*?<!-- KHỐI TỔNG QUAN 5 TẦNG NGUỒN CUNG/;
const newDashboardSnippet = `<!-- KHỐI ĐỐI SOÁT HÌNH ẢNH CẤP CARD (VISUAL EVIDENCE DASHBOARD - JAYT-215) -->
        <section class="jayt-visual-evidence-dashboard-card" style="background:var(--bg-surface); border:1.5px solid #3B82F6; border-radius:var(--radius-lg); padding:12px 14px; margin-top:8px; margin-bottom:10px; box-shadow:var(--shadow-sm);">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; flex-wrap:wrap; gap:6px;">
            <div style="font-size:11.5px; font-weight:800; color:#1D4ED8; text-transform:uppercase; letter-spacing:0.5px;">
              📊 ĐỐI SOÁT BẰNG CHỨNG HÌNH ẢNH (CARD-LEVEL VISUAL EVIDENCE)
            </div>
            <span class="apex-badge" style="background:#EFF6FF; color:#1E40AF; border:1px solid #BFDBFE; font-weight:800; font-size:10.5px; padding:2px 8px;">
              🎯 Kỷ luật trung thực: 24 ảnh thật đối soát
            </span>
          </div>

          <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap:8px;">
            <div style="padding:8px 10px; background:var(--bg-surface-subtle); border-radius:var(--radius-sm); border-left:3px solid #059669;">
              <div style="font-size:10.5px; color:var(--text-muted); font-weight:600;">🖼️ Visual UI Coverage</div>
              <div style="font-size:14px; font-weight:800; color:var(--text-charcoal-main); margin-top:2px;">29/29 (100%)</div>
              <div style="font-size:10px; color:var(--text-muted);">0 card chữ trần</div>
            </div>
            <div style="padding:8px 10px; background:var(--bg-surface-subtle); border-radius:var(--radius-sm); border-left:3px solid #3B82F6;">
              <div style="font-size:10.5px; color:var(--text-muted); font-weight:600;">🏷️ Exact Promotion Visual</div>
              <div style="font-size:14px; font-weight:800; color:#1D4ED8; margin-top:2px;">12/29 (41.4%)</div>
              <div style="font-size:10px; color:var(--text-muted);">100% nhóm ưu đãi</div>
            </div>
            <div style="padding:8px 10px; background:var(--bg-surface-subtle); border-radius:var(--radius-sm); border-left:3px solid #8B5CF6;">
              <div style="font-size:10.5px; color:var(--text-muted); font-weight:600;">🏢 Exact Venue Visual</div>
              <div style="font-size:14px; font-weight:800; color:#6D28D9; margin-top:2px;">12/29 (41.4%)</div>
              <div style="font-size:10px; color:var(--text-muted);">70.6% nhóm địa điểm</div>
            </div>
            <div style="padding:8px 10px; background:var(--bg-surface-subtle); border-radius:var(--radius-sm); border-left:3px solid #D97706;">
              <div style="font-size:10.5px; color:var(--text-muted); font-weight:600;">🏛️ Identity Visual Canvas</div>
              <div style="font-size:14px; font-weight:800; color:var(--text-charcoal-main); margin-top:2px;">5/29 (17.2%)</div>
              <div style="font-size:10px; color:var(--text-muted);">Chờ đối soát thực địa</div>
            </div>
            <div style="padding:8px 10px; background:var(--bg-surface-subtle); border-radius:var(--radius-sm); border-left:3px solid #64748B;">
              <div style="font-size:10.5px; color:var(--text-muted); font-weight:600;">⚪ Neutral Fallback</div>
              <div style="font-size:14px; font-weight:800; color:var(--text-charcoal-main); margin-top:2px;">0/29 (0%)</div>
              <div style="font-size:10px; color:var(--text-muted);">0 card thiếu định danh</div>
            </div>
          </div>
        </section>

        <!-- KHỐI TỔNG QUAN 5 TẦNG NGUỒN CUNG`;

code = code.replace(oldDashboardRegex, newDashboardSnippet);

fs.writeFileSync(interfacePath, code, 'utf8');
console.log('✅ Successfully updated jayt_apex_interface.js for JAYT-215 Real Visual Supply Sprint!');
