const fs = require('fs');
const path = require('path');

const jsPath = path.resolve(__dirname, '../03_SOURCE_OF_TRUTH/jayt_apex_interface.js');
let js = fs.readFileSync(jsPath, 'utf8');

const targetOldCard = `<span class="badge-status-neutral" style="font-size:9.5px;">🟢 ĐÃ ĐỐI SOÁT</span>
            </div>
            <div style="font-size:12px; color:var(--text-muted); margin-top:6px; line-height:1.45;">
              📍 \${loc.street_address || (loc.locality && loc.locality.street_address) || 'Đà Nẵng'}
            </div>
          </div>`;

const targetNewCard = `<span class="badge-status-neutral" style="font-size:9.5px; color:var(--sapphire); background:rgba(2,132,199,0.08); border:1px solid rgba(2,132,199,0.2);">🔵 ĐỊA ĐIỂM XÁC MINH</span>
            </div>
            <div style="font-size:12px; color:var(--text-muted); margin-top:6px; line-height:1.45;">
              📍 \${loc.street_address || (loc.locality && loc.locality.street_address) || 'Đà Nẵng'}
            </div>
            <div style="font-size:11px; color:var(--text-muted); margin-top:4px; font-style:italic;">
              ℹ️ Chỉ xác thực địa điểm cơ sở; menu và giá kiểm tra thực tế tại quán.
            </div>
          </div>`;

if (js.includes(targetOldCard)) {
  js = js.replace(targetOldCard, targetNewCard);
  console.log('✅ Updated card badge to 🔵 ĐỊA ĐIỂM XÁC MINH with disclaimer');
} else {
  // Regex replacement
  js = js.replace(/<span class="badge-status-neutral" style="font-size:9.5px;">🟢 ĐÃ ĐỐI SOÁT<\/span>/g, '<span class="badge-status-neutral" style="font-size:9.5px; color:var(--sapphire); background:rgba(2,132,199,0.08); border:1px solid rgba(2,132,199,0.2);">🔵 ĐỊA ĐIỂM XÁC MINH</span>');
  console.log('✅ Updated card badge via regex');
}

fs.writeFileSync(jsPath, js, 'utf8');
