const fs = require('fs');
const path = require('path');

const jsPath = path.resolve(__dirname, '../03_SOURCE_OF_TRUTH/jayt_apex_interface.js');
let js = fs.readFileSync(jsPath, 'utf8');

// 1. Remove synthetic Klook buttons
const targetKlookBlock = `<div style="display:flex; gap:8px; flex-wrap:wrap;">
              <button type="button" onclick="dispatchSmartAffiliate('KLOOK', 'bana_hills_aff', 'https://www.klook.com/vi/activity/bana-hills-danang/', 'weekend_klook')" class="btn-cta-emerald apex-spring-interactive" style="height:36px; padding:0 14px; font-size:12px; border:none; cursor:pointer; background:#EA580C; color:#FFF; font-weight:800;">Vé Bà Nà Hills ↗</button>
              <button type="button" onclick="dispatchSmartAffiliate('KLOOK', 'mikazuki_waterpark_aff', 'https://www.klook.com/vi/activity/mikazuki-water-park-danang/', 'weekend_klook')" class="btn-cta-emerald apex-spring-interactive" style="height:36px; padding:0 14px; font-size:12px; border:none; cursor:pointer; background:#F59E0B; color:#000; font-weight:800;">Vé Mikazuki ↗</button>
            </div>`;

if (js.includes(targetKlookBlock)) {
  js = js.replace(targetKlookBlock, '');
  console.log('✅ Removed synthetic Klook block');
}

// 2. Remove synthetic Fintech CPA button
const targetFintechBtn = `<button type="button" onclick="dispatchSmartAffiliate('FINTECH', 'cake_vpbank_student', 'https://shorten.asia/cake_vpbank_aff', 'student_cpa')" class="btn-cta-emerald btn-action-primary apex-spring-interactive" style="height:38px; padding:0 18px; font-size:12.5px; border:none; cursor:pointer; font-weight:800;">Mở Thẻ Nhận 50K ↗</button>
            </div>`;

if (js.includes(targetFintechBtn)) {
  js = js.replace(targetFintechBtn, '');
  console.log('✅ Removed synthetic Fintech CPA button');
}

fs.writeFileSync(jsPath, js, 'utf8');
console.log('✨ Cleaned target blocks successfully!');
