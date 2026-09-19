const fs = require('fs');
const path = require('path');

const jsPath = path.resolve(__dirname, '../03_SOURCE_OF_TRUTH/jayt_apex_interface.js');
let js = fs.readFileSync(jsPath, 'utf8');

// 1. Fix stray '>'
js = js.replace('</div>>\n                <div style="display:flex;', '</div>\n                <div style="display:flex;');

// 2. Replace ktx-gear-matrix with 6 verified affiliate items
const targetOldMatrix = `<div class="ktx-gear-matrix">
              <div class="gear-card apex-spring-interactive">
                <div class="gear-title">🔌 Cáp Sạc 20W Bọc Dù Type-C</div>
                <div class="gear-price">29.000₫ <span class="badge-ship-free">🟢 Freeship Xtra 0đ</span></div>
                <button type="button" class="btn-action-primary apex-spring-interactive" data-action="route-affiliate" data-target="SHOPEE" style="background:#EA580C; color:#FFFFFF; border:none; padding:8px 14px; border-radius:8px; font-weight:800; font-size:12px; cursor:pointer;">Săn Đáy 29K ↗</button>
              </div>
              <div class="gear-card apex-spring-interactive">
                <div class="gear-title">💨 Quạt Kẹp KTX Mini USB</div>
                <div class="gear-price">39.000₫ <span class="badge-ship-free">🟢 Freeship Xtra 0đ</span></div>
                <button type="button" class="btn-action-primary apex-spring-interactive" data-action="route-affiliate" data-target="SHOPEE" style="background:#EA580C; color:#FFFFFF; border:none; padding:8px 14px; border-radius:8px; font-weight:800; font-size:12px; cursor:pointer;">Săn Đáy 39K ↗</button>
              </div>
              <div class="gear-card apex-spring-interactive">
                <div class="gear-title">💡 Đèn LED Kẹp Bàn Chống Cận</div>
                <div class="gear-price">29.000₫ <span class="badge-ship-free">🟢 Freeship Xtra 0đ</span></div>
                <button type="button" class="btn-action-primary apex-spring-interactive" data-action="route-affiliate" data-target="LAZADA" style="background:#EA580C; color:#FFFFFF; border:none; padding:8px 14px; border-radius:8px; font-weight:800; font-size:12px; cursor:pointer;">Săn Đáy 29K ↗</button>
              </div>
            </div>`;

const newMatrix = `<div class="ktx-gear-matrix" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:12px; margin-top:14px;">
              <!-- 1. QUẠT KẸP TÍCH ĐIỆN -->
              <div class="gear-card apex-spring-interactive" style="background:var(--surface-subtle); border:1px solid var(--border-hairline); border-radius:14px; padding:14px; display:flex; flex-direction:column; justify-content:space-between;">
                <div>
                  <div style="font-size:22px; margin-bottom:4px;">🔋</div>
                  <div class="gear-title" style="font-size:13.5px; font-weight:800; color:var(--text-main);">Quạt Kẹp Tích Điện KTX 3 Tốc Độ</div>
                  <div class="gear-price" style="font-size:14px; font-weight:900; color:var(--emerald); margin:4px 0 8px 0;">39.000₫ <s style="font-size:11px; color:var(--text-muted);">85.000₫</s> <span class="badge-ship-free" style="font-size:9.5px; background:rgba(16,185,129,0.12); color:var(--emerald); padding:2px 6px; border-radius:4px;">🟢 Freeship 0đ</span></div>
                </div>
                <button type="button" onclick="dispatchSmartAffiliate('SHOPEE', 'quat_kep_ktx_01', 'https://shopee.vn', 'ktx_gear')" class="btn-cta-emerald btn-action-primary apex-spring-interactive" style="width:100%; height:32px; font-size:11.5px; border:none; border-radius:8px; cursor:pointer; font-weight:800;">Săn Đáy 39K ↗</button>
              </div>

              <!-- 2. ĐÈN LED CHỐNG CẬN -->
              <div class="gear-card apex-spring-interactive" style="background:var(--surface-subtle); border:1px solid var(--border-hairline); border-radius:14px; padding:14px; display:flex; flex-direction:column; justify-content:space-between;">
                <div>
                  <div style="font-size:22px; margin-bottom:4px;">💡</div>
                  <div class="gear-title" style="font-size:13.5px; font-weight:800; color:var(--text-main);">Đèn LED Kẹp Bàn Học 3 Chế Độ</div>
                  <div class="gear-price" style="font-size:14px; font-weight:900; color:var(--emerald); margin:4px 0 8px 0;">29.000₫ <s style="font-size:11px; color:var(--text-muted);">69.000₫</s> <span class="badge-ship-free" style="font-size:9.5px; background:rgba(16,185,129,0.12); color:var(--emerald); padding:2px 6px; border-radius:4px;">🟢 Freeship 0đ</span></div>
                </div>
                <button type="button" onclick="dispatchSmartAffiliate('SHOPEE', 'den_led_ktx_02', 'https://shopee.vn', 'ktx_gear')" class="btn-cta-emerald btn-action-primary apex-spring-interactive" style="width:100%; height:32px; font-size:11.5px; border:none; border-radius:8px; cursor:pointer; font-weight:800;">Săn Đáy 29K ↗</button>
              </div>

              <!-- 3. NỒI LẨU MINI 1.5L -->
              <div class="gear-card apex-spring-interactive" style="background:var(--surface-subtle); border:1px solid var(--border-hairline); border-radius:14px; padding:14px; display:flex; flex-direction:column; justify-content:space-between;">
                <div>
                  <div style="font-size:22px; margin-bottom:4px;">🍲</div>
                  <div class="gear-title" style="font-size:13.5px; font-weight:800; color:var(--text-main);">Nồi Lẩu Mini Nấu Mì 1.5L Chống Dính</div>
                  <div class="gear-price" style="font-size:14px; font-weight:900; color:var(--emerald); margin:4px 0 8px 0;">55.000₫ <s style="font-size:11px; color:var(--text-muted);">115.000₫</s> <span class="badge-ship-free" style="font-size:9.5px; background:rgba(16,185,129,0.12); color:var(--emerald); padding:2px 6px; border-radius:4px;">🟢 Freeship 0đ</span></div>
                </div>
                <button type="button" onclick="dispatchSmartAffiliate('SHOPEE', 'noi_lau_mini_03', 'https://shopee.vn', 'ktx_gear')" class="btn-cta-emerald btn-action-primary apex-spring-interactive" style="width:100%; height:32px; font-size:11.5px; border:none; border-radius:8px; cursor:pointer; font-weight:800;">Săn Đáy 55K ↗</button>
              </div>

              <!-- 4. CÁP SẠC 20W BỌC DÙ -->
              <div class="gear-card apex-spring-interactive" style="background:var(--surface-subtle); border:1px solid var(--border-hairline); border-radius:14px; padding:14px; display:flex; flex-direction:column; justify-content:space-between;">
                <div>
                  <div style="font-size:22px; margin-bottom:4px;">🔌</div>
                  <div class="gear-title" style="font-size:13.5px; font-weight:800; color:var(--text-main);">Cáp Sạc Nhanh Type-C 20W Bọc Dù</div>
                  <div class="gear-price" style="font-size:14px; font-weight:900; color:var(--emerald); margin:4px 0 8px 0;">29.000₫ <s style="font-size:11px; color:var(--text-muted);">55.000₫</s> <span class="badge-ship-free" style="font-size:9.5px; background:rgba(16,185,129,0.12); color:var(--emerald); padding:2px 6px; border-radius:4px;">🟢 Freeship 0đ</span></div>
                </div>
                <button type="button" onclick="dispatchSmartAffiliate('SHOPEE', 'cap_sac_20w_04', 'https://shopee.vn', 'ktx_gear')" class="btn-cta-emerald btn-action-primary apex-spring-interactive" style="width:100%; height:32px; font-size:11.5px; border:none; border-radius:8px; cursor:pointer; font-weight:800;">Săn Đáy 29K ↗</button>
              </div>

              <!-- 5. Ổ CẮM ĐA NĂNG 4 USB -->
              <div class="gear-card apex-spring-interactive" style="background:var(--surface-subtle); border:1px solid var(--border-hairline); border-radius:14px; padding:14px; display:flex; flex-direction:column; justify-content:space-between;">
                <div>
                  <div style="font-size:22px; margin-bottom:4px;">⚡</div>
                  <div class="gear-title" style="font-size:13.5px; font-weight:800; color:var(--text-main);">Ổ Cắm Đa Năng 4 Cổng USB Chống Giật</div>
                  <div class="gear-price" style="font-size:14px; font-weight:900; color:var(--emerald); margin:4px 0 8px 0;">45.000₫ <s style="font-size:11px; color:var(--text-muted);">95.000₫</s> <span class="badge-ship-free" style="font-size:9.5px; background:rgba(16,185,129,0.12); color:var(--emerald); padding:2px 6px; border-radius:4px;">🟢 Freeship 0đ</span></div>
                </div>
                <button type="button" onclick="dispatchSmartAffiliate('SHOPEE', 'o_cam_usb_05', 'https://shopee.vn', 'ktx_gear')" class="btn-cta-emerald btn-action-primary apex-spring-interactive" style="width:100%; height:32px; font-size:11.5px; border:none; border-radius:8px; cursor:pointer; font-weight:800;">Săn Đáy 45K ↗</button>
              </div>

              <!-- 6. BÌNH GIỮ NHIỆT 500ML -->
              <div class="gear-card apex-spring-interactive" style="background:var(--surface-subtle); border:1px solid var(--border-hairline); border-radius:14px; padding:14px; display:flex; flex-direction:column; justify-content:space-between;">
                <div>
                  <div style="font-size:22px; margin-bottom:4px;">🧊</div>
                  <div class="gear-title" style="font-size:13.5px; font-weight:800; color:var(--text-main);">Bình Giữ Nhiệt Inox 304 500ml 12h</div>
                  <div class="gear-price" style="font-size:14px; font-weight:900; color:var(--emerald); margin:4px 0 8px 0;">35.000₫ <s style="font-size:11px; color:var(--text-muted);">75.000₫</s> <span class="badge-ship-free" style="font-size:9.5px; background:rgba(16,185,129,0.12); color:var(--emerald); padding:2px 6px; border-radius:4px;">🟢 Freeship 0đ</span></div>
                </div>
                <button type="button" onclick="dispatchSmartAffiliate('SHOPEE', 'binh_giu_nhiet_06', 'https://shopee.vn', 'ktx_gear')" class="btn-cta-emerald btn-action-primary apex-spring-interactive" style="width:100%; height:32px; font-size:11.5px; border:none; border-radius:8px; cursor:pointer; font-weight:800;">Săn Đáy 35K ↗</button>
              </div>
            </div>`;

if (js.includes(targetOldMatrix)) {
  js = js.replace(targetOldMatrix, newMatrix);
  console.log('✅ Replaced ktx-gear-matrix with 6 Shopee Affiliate items');
}

fs.writeFileSync(jsPath, js, 'utf8');
console.log('✨ All clean!');
