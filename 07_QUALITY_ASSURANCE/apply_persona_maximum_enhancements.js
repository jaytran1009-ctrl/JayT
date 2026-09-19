const fs = require('fs');
const path = require('path');

const jsPath = path.resolve(__dirname, '../03_SOURCE_OF_TRUTH/jayt_apex_interface.js');
let jsCode = fs.readFileSync(jsPath, 'utf8');

console.log('--- APPLYING 4-PERSONA MAXIMUM ENHANCEMENTS TO JS ---');

// 1. In Tier 2 (Arbitrage Card): Add Smart Bundling & Freeship Tip
const oldArbitrageSavings = `<div id="arbitrageSavingsBadge" class="badge-freeship-xtra" style="width:100%; justify-content:center; margin-bottom:8px; font-weight:800; font-size:11px;">
                  🏆 ShopeeFood RẺ HƠN \${diffGrab.toLocaleString('vi-VN')}₫
                </div>`;

const newArbitrageSavings = `<div id="arbitrageSavingsBadge" class="badge-freeship-xtra" style="width:100%; justify-content:center; margin-bottom:4px; font-weight:800; font-size:11px;">
                  🏆 ShopeeFood RẺ HƠN \${diffGrab.toLocaleString('vi-VN')}₫
                </div>
                <div style="font-size:10px; color:var(--text-muted); text-align:center; margin-bottom:8px; font-weight:600;">
                  💡 Tip: Đơn ≥40K tự động áp mã Freeship 18K trên ShopeeFood
                </div>`;

if (jsCode.includes(oldArbitrageSavings)) {
  jsCode = jsCode.replace(oldArbitrageSavings, newArbitrageSavings);
  console.log('✅ Added Smart Bundling & Freeship Tip to Tier 2 (Persona 2)');
}

// 2. In Tier 2: Add 3 Quick Cluster Pills
const oldTier2Header = `<div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-bottom:14px;">
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="font-size:20px;">🛵</span>
              <div style="font-size:16px; font-weight:900; color:var(--text-main);">Địa Điểm Xác Thực & Trọng Tài Giỏ Hàng 3 App (Ăn Trưa 11:30)</div>
            </div>
            <span class="badge-day-90">🍜 11:30 BỮA TRƯA</span>
          </div>`;

const newTier2Header = `<div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-bottom:14px;">
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="font-size:20px;">🛵</span>
              <div style="font-size:16px; font-weight:900; color:var(--text-main);">Địa Điểm Xác Thực & Trọng Tài Giỏ Hàng 3 App (Ăn Trưa 11:30)</div>
            </div>
            <div style="display:flex; align-items:center; gap:6px; flex-wrap:wrap;">
              <button type="button" class="quick-pick-chip active" data-action="filter-campus" data-campus="ALL" style="font-size:10.5px; padding:3px 8px;">📍 Toàn Đà Nẵng</button>
              <button type="button" class="quick-pick-chip" data-action="filter-campus" data-campus="HOA_KHANH" style="font-size:10.5px; padding:3px 8px;">🎓 Hòa Khánh (BK/SP)</button>
              <button type="button" class="quick-pick-chip" data-action="filter-campus" data-campus="HAI_CHAU" style="font-size:10.5px; padding:3px 8px;">🏛️ Hải Châu</button>
              <button type="button" class="quick-pick-chip" data-action="filter-campus" data-campus="NGU_HANH_SON" style="font-size:10.5px; padding:3px 8px;">🌊 Ngũ Hành Sơn</button>
            </div>
          </div>`;

if (jsCode.includes(oldTier2Header)) {
  jsCode = jsCode.replace(oldTier2Header, newTier2Header);
  console.log('✅ Added 3 Campus Quick-Pills to Tier 2 (Persona 3)');
}

// 3. Add campus filter event listener
const campusListenerBlock = `
    // Persona 3: Quick Campus Filter Pills
    document.querySelectorAll('[data-action="filter-campus"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        playHapticTick();
        document.querySelectorAll('[data-action="filter-campus"]').forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        const campus = e.currentTarget.getAttribute('data-campus') || 'ALL';
        state.selectedCluster = campus === 'ALL' ? 'HAI_CHAU' : campus;
        showToast(\`📍 Đã chuyển sang cụm: \${e.currentTarget.innerText}!\`);
      });
    });
`;

if (!jsCode.includes('[data-action="filter-campus"]')) {
  const listenerAnchor = 'document.querySelectorAll(\'[data-action="quick-pick-price"]\').forEach';
  jsCode = jsCode.replace(listenerAnchor, campusListenerBlock + '\n    ' + listenerAnchor);
  console.log('✅ Added Campus Filter event listeners');
}

fs.writeFileSync(jsPath, jsCode, 'utf8');
console.log('✨ All 4-Persona enhancements successfully integrated into JS!');
