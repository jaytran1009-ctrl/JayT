const fs = require('fs');
const path = require('path');

const jsPath = path.resolve(__dirname, '../03_SOURCE_OF_TRUTH/jayt_apex_interface.js');
let js = fs.readFileSync(jsPath, 'utf8');

// 1. Replace KTX Gear Grid
const newKtxGearHtml = `
            <div class="ktx-gear-grid">
              <!-- ITEM 1: QUẠT KẸP TÍCH ĐIỆN -->
              <div class="gear-card apex-spring-interactive">
                <div style="font-size:24px; margin-bottom:6px;">🔋</div>
                <div class="gear-title">Quạt Kẹp Tích Điện KTX 3 Tốc Độ</div>
                <div class="gear-price-row">
                  <span class="gear-price-final">39.000₫</span>
                  <span class="gear-price-orig">85.000₫</span>
                </div>
                <div class="gear-badge-tag">🟢 Freeship Xtra 0đ</div>
                <button type="button" onclick="dispatchSmartAffiliate('SHOPEE', 'quat_kep_ktx_01', 'https://shopee.vn', 'ktx_gear')" class="btn-cta-emerald btn-action-primary apex-spring-interactive" style="width:100%; height:32px; font-size:11.5px; margin-top:8px; border:none; cursor:pointer; font-weight:800;">Săn Đáy 39K ↗</button>
              </div>

              <!-- ITEM 2: ĐÈN HỌC LED CHỐNG CẬN -->
              <div class="gear-card apex-spring-interactive">
                <div style="font-size:24px; margin-bottom:6px;">💡</div>
                <div class="gear-title">Đèn LED Kẹp Bàn Học 3 Chế Độ</div>
                <div class="gear-price-row">
                  <span class="gear-price-final">29.000₫</span>
                  <span class="gear-price-orig">69.000₫</span>
                </div>
                <div class="gear-badge-tag">🟢 Freeship Xtra 0đ</div>
                <button type="button" onclick="dispatchSmartAffiliate('SHOPEE', 'den_led_ktx_02', 'https://shopee.vn', 'ktx_gear')" class="btn-cta-emerald btn-action-primary apex-spring-interactive" style="width:100%; height:32px; font-size:11.5px; margin-top:8px; border:none; cursor:pointer; font-weight:800;">Săn Đáy 29K ↗</button>
              </div>

              <!-- ITEM 3: NỒI LẨU MINI NẤU MÌ -->
              <div class="gear-card apex-spring-interactive">
                <div style="font-size:24px; margin-bottom:6px;">🍲</div>
                <div class="gear-title">Nồi Lẩu Mini Nấu Mì 1.5L Chống Dính</div>
                <div class="gear-price-row">
                  <span class="gear-price-final">55.000₫</span>
                  <span class="gear-price-orig">115.000₫</span>
                </div>
                <div class="gear-badge-tag">🟢 Freeship Xtra 0đ</div>
                <button type="button" onclick="dispatchSmartAffiliate('SHOPEE', 'noi_lau_mini_03', 'https://shopee.vn', 'ktx_gear')" class="btn-cta-emerald btn-action-primary apex-spring-interactive" style="width:100%; height:32px; font-size:11.5px; margin-top:8px; border:none; cursor:pointer; font-weight:800;">Săn Đáy 55K ↗</button>
              </div>

              <!-- ITEM 4: CÁP SẠC 20W BỌC DÙ -->
              <div class="gear-card apex-spring-interactive">
                <div style="font-size:24px; margin-bottom:6px;">🔌</div>
                <div class="gear-title">Cáp Sạc Nhanh Type-C 20W Bọc Dù</div>
                <div class="gear-price-row">
                  <span class="gear-price-final">29.000₫</span>
                  <span class="gear-price-orig">55.000₫</span>
                </div>
                <div class="gear-badge-tag">🟢 Freeship Xtra 0đ</div>
                <button type="button" onclick="dispatchSmartAffiliate('SHOPEE', 'cap_sac_20w_04', 'https://shopee.vn', 'ktx_gear')" class="btn-cta-emerald btn-action-primary apex-spring-interactive" style="width:100%; height:32px; font-size:11.5px; margin-top:8px; border:none; cursor:pointer; font-weight:800;">Săn Đáy 29K ↗</button>
              </div>

              <!-- ITEM 5: Ổ CẮM ĐIỆN 4 CỔNG USB -->
              <div class="gear-card apex-spring-interactive">
                <div style="font-size:24px; margin-bottom:6px;">⚡</div>
                <div class="gear-title">Ổ Cắm Đa Năng 4 Cổng USB Chống Giật</div>
                <div class="gear-price-row">
                  <span class="gear-price-final">45.000₫</span>
                  <span class="gear-price-orig">95.000₫</span>
                </div>
                <div class="gear-badge-tag">🟢 Freeship Xtra 0đ</div>
                <button type="button" onclick="dispatchSmartAffiliate('SHOPEE', 'o_cam_usb_05', 'https://shopee.vn', 'ktx_gear')" class="btn-cta-emerald btn-action-primary apex-spring-interactive" style="width:100%; height:32px; font-size:11.5px; margin-top:8px; border:none; cursor:pointer; font-weight:800;">Săn Đáy 45K ↗</button>
              </div>

              <!-- ITEM 6: BÌNH GIỮ NHIỆT 500ML -->
              <div class="gear-card apex-spring-interactive">
                <div style="font-size:24px; margin-bottom:6px;">🧊</div>
                <div class="gear-title">Bình Giữ Nhiệt Inox 304 500ml 12h</div>
                <div class="gear-price-row">
                  <span class="gear-price-final">35.000₫</span>
                  <span class="gear-price-orig">75.000₫</span>
                </div>
                <div class="gear-badge-tag">🟢 Freeship Xtra 0đ</div>
                <button type="button" onclick="dispatchSmartAffiliate('SHOPEE', 'binh_giu_nhiet_06', 'https://shopee.vn', 'ktx_gear')" class="btn-cta-emerald btn-action-primary apex-spring-interactive" style="width:100%; height:32px; font-size:11.5px; margin-top:8px; border:none; cursor:pointer; font-weight:800;">Săn Đáy 35K ↗</button>
              </div>
            </div>`;

const ktxSearchAnchor = '<div class="ktx-gear-grid">';
const ktxGridIdx = js.indexOf(ktxSearchAnchor);
if (ktxGridIdx !== -1) {
  const ktxEndIdx = js.indexOf('</div>\n          </div>', ktxGridIdx);
  if (ktxEndIdx !== -1) {
    js = js.substring(0, ktxGridIdx) + newKtxGearHtml.trim() + js.substring(ktxEndIdx);
    console.log('✅ Replaced KTX gear grid with Shopee Affiliate dispatchers');
  }
}

// 2. Inject Klook Affiliate Touchpoint at Tier 3 end
const klookCardHtml = `
          <!-- KLOOK AFFILIATE TOUCHPOINT (HOA HỒNG 3% - 5%/VÉ) -->
          <div style="background:linear-gradient(135deg, rgba(245, 158, 11, 0.12), rgba(234, 88, 12, 0.12)); border:1px solid rgba(245, 158, 11, 0.35); border-radius:16px; padding:16px; margin-top:16px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
            <div style="flex:1; min-width:240px;">
              <div style="font-size:11px; font-weight:800; color:#EA580C; text-transform:uppercase; letter-spacing:0.5px;">🎡 KÈO CUỐI TUẦN VÙNG 43 · ĐỐI SOÁT KLOOK REVENUE</div>
              <div style="font-size:15px; font-weight:900; color:var(--text-main); margin:3px 0;">Săn Vé Bà Nà Hills, Công Viên Nước Mikazuki & Núi Thần Tài Rẻ Hơn 15%</div>
              <div style="font-size:12px; color:var(--text-muted);">Vé điện tử quét mã QR vào cổng không cần xếp hàng · Đảm bảo giá tốt nhất qua Klook Official</div>
            </div>
            <div style="display:flex; gap:8px; flex-wrap:wrap;">
              <button type="button" onclick="dispatchSmartAffiliate('KLOOK', 'bana_hills_aff', 'https://www.klook.com/vi/activity/bana-hills-danang/', 'weekend_klook')" class="btn-cta-emerald apex-spring-interactive" style="height:36px; padding:0 14px; font-size:12px; border:none; cursor:pointer; background:#EA580C; color:#FFF; font-weight:800;">Vé Bà Nà Hills ↗</button>
              <button type="button" onclick="dispatchSmartAffiliate('KLOOK', 'mikazuki_waterpark_aff', 'https://www.klook.com/vi/activity/mikazuki-water-park-danang/', 'weekend_klook')" class="btn-cta-emerald apex-spring-interactive" style="height:36px; padding:0 14px; font-size:12px; border:none; cursor:pointer; background:#F59E0B; color:#000; font-weight:800;">Vé Mikazuki ↗</button>
            </div>
          </div>
`;

const tier3EndAnchor = '<!-- 4. SĂN ĐÁY ĐỒ TIỆN ÍCH KTX ≤ 50K & KHO VOUCHER TOÀN SÀN -->';
if (js.includes(tier3EndAnchor) && !js.includes('bana_hills_aff')) {
  const insertPos = js.indexOf(tier3EndAnchor);
  // Find </section> right before it
  const secEnd = js.lastIndexOf('</section>', insertPos);
  if (secEnd !== -1) {
    js = js.substring(0, secEnd) + klookCardHtml + '\n        ' + js.substring(secEnd);
    console.log('✅ Injected Klook Affiliate Card into Tier 3');
  }
}

fs.writeFileSync(jsPath, js, 'utf8');
console.log('✨ All Affiliate touchpoints successfully written to JS!');
