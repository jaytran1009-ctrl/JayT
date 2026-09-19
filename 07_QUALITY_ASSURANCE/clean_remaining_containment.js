const fs = require('fs');
const path = require('path');

const jsPath = path.resolve(__dirname, '../03_SOURCE_OF_TRUTH/jayt_apex_interface.js');
const northStarPath = path.resolve(__dirname, '../03_SOURCE_OF_TRUTH/customer_journey_north_star.json');

let js = fs.readFileSync(jsPath, 'utf8');
let northStar = fs.readFileSync(northStarPath, 'utf8');

// 1. Clean JS line 4632
js = js.replace('const shipSavings = 21000; // Freeship Xtra', 'const shipSavings = 0; // Hỗ trợ ship theo chính sách sàn');

// 2. Clean Tier 3 synthetic Klook affiliate CTA
const oldTier3Klook = `<div style="display:flex; gap:8px; align-items:center;">
              <button type="button" onclick="dispatchSmartAffiliate('KLOOK', 'bana_hills_aff', 'https://www.klook.com/vi/activity/bana-hills-danang/', 'weekend_klook')" class="btn-cta-emerald apex-spring-interactive" style="height:36px; padding:0 14px; font-size:12px; border:none; cursor:pointer; background:#EA580C; color:#FFF; font-weight:800;">Vé Bà Nà Hills ↗</button>
              <button type="button" onclick="dispatchSmartAffiliate('KLOOK', 'mikazuki_waterpark_aff', 'https://www.klook.com/vi/activity/mikazuki-water-park-danang/', 'weekend_klook')" class="btn-cta-subtle apex-spring-interactive" style="height:36px; padding:0 14px; font-size:12px; border:none; cursor:pointer; font-weight:800;">Vé Mikazuki ↗</button>
            </div>`;

const honestTier3Guide = `<div style="font-size:11px; color:var(--text-muted); padding:6px 10px; background:var(--surface-card); border-radius:8px; border:1px solid var(--border-hairline);">
              ℹ️ Lịch trình dã ngoại cuối tuần vùng 43 — Vui lòng kiểm tra giá vé tại cổng chính thức của khu du lịch.
            </div>`;

if (js.includes(oldTier3Klook)) {
  js = js.replace(oldTier3Klook, honestTier3Guide);
  console.log('✅ Replaced synthetic Klook CTA with honest attraction notice in Tier 3');
}

// 3. Clean Student Hub Tab 2 synthetic Fintech banner
const oldFintechBanner = `<!-- BANNER FINTECH CPA -->
            <div style="background:linear-gradient(135deg, rgba(16,185,129,0.12) 0%, rgba(2,132,199,0.12) 100%); border:1px solid rgba(16,185,129,0.3); border-radius:16px; padding:18px; display:flex; justify-content:space-between; align-items:center; gap:14px; flex-wrap:wrap; margin-bottom:16px;">
              <div>
                <div style="display:flex; align-items:center; gap:6px;">
                  <span style="font-size:16px;">💳</span>
                  <strong style="font-size:14.5px; color:var(--text-main);">Mở Tài Khoản Số Cake / MBBank 0đ — Nhận Ngay 50K</strong>
                  <span class="badge-status-open" style="font-size:9.5px; font-weight:800; color:var(--emerald); background:rgba(16,185,129,0.15); padding:2px 6px; border-radius:4px;">TIỀN TƯƠI</span>
                </div>
                <div style="font-size:12px; color:var(--text-muted); margin-top:4px;">Đặc quyền sinh viên các trường ĐH Đà Nẵng: 0đ phí duy trì, nhận tiền mặt 50.000₫ vào tài khoản sau khi eKYC.</div>
              </div>
              <button type="button" onclick="dispatchSmartAffiliate('FINTECH', 'cake_vpbank_student', 'https://shorten.asia/cake_vpbank_aff', 'student_cpa')" class="btn-cta-emerald btn-action-primary apex-spring-interactive" style="height:38px; padding:0 18px; font-size:12.5px; border:none; cursor:pointer; font-weight:800;">Mở Thẻ Nhận 50K ↗</button>
            </div>`;

if (js.includes(oldFintechBanner)) {
  js = js.replace(oldFintechBanner, '');
  console.log('✅ Removed synthetic Fintech CPA banner in Tab 2');
}

// 4. Clean customer_journey_north_star.json
northStar = northStar.replace(/Freeship Xtra/g, 'Hỗ trợ vận chuyển');
fs.writeFileSync(northStarPath, northStar, 'utf8');
console.log('✅ Cleaned customer_journey_north_star.json');

fs.writeFileSync(jsPath, js, 'utf8');
console.log('✨ All remaining synthetic claims cleaned!');
