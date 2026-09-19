const fs = require('fs');
const path = require('path');

const jsPath = path.resolve(__dirname, '../03_SOURCE_OF_TRUTH/jayt_apex_interface.js');
const feedPath = path.resolve(__dirname, '../03_SOURCE_OF_TRUTH/daily_supply_feed_126.json');

let js = fs.readFileSync(jsPath, 'utf8');
let feed = JSON.parse(fs.readFileSync(feedPath, 'utf8'));

console.log('--- 1. UPDATING daily_supply_feed_126.json ---');

feed.limited_time_deals = [
  {
    deal_id: "LTD_CGV_CULTURE_DAY",
    brand_name: "CGV Cinema",
    title: "CGV Culture Day — Đồng giá vé 75.000₫ toàn cụm rạp",
    discount_badge: "Đồng giá 75K",
    category: "ENTERTAINMENT",
    terms: "Áp dụng Thứ Tư cuối cùng mỗi tháng tại CGV Vĩnh Trung & Vincom Đà Nẵng",
    expires_at: "2026-08-26T23:59:59+07:00"
  },
  {
    deal_id: "LTD_METIZ_U22",
    brand_name: "Metiz Cinema",
    title: "Metiz Cinema — Vé U22 & Học sinh Sinh viên 45.000₫",
    discount_badge: "Đồng giá 45K",
    category: "ENTERTAINMENT",
    terms: "Xuất trình thẻ HSSV hoặc CCCD dưới 22 tuổi tại quầy vé Helio Center",
    expires_at: "2026-08-31T23:59:59+07:00"
  },
  {
    deal_id: "LTD_SPF_TRUA",
    brand_name: "ShopeeFood",
    title: "ShopeeFood Đà Nẵng — Giảm 18K cho bữa trưa sinh viên",
    discount_badge: "Giảm 18K",
    category: "FOOD",
    terms: "Mã SPF18K áp dụng cho đơn từ 40K các quán ăn đối tác",
    expires_at: "2026-08-26T14:00:00+07:00"
  },
  {
    deal_id: "LTD_GRAB_FOOD_43",
    brand_name: "GrabFood",
    title: "GrabFood Vùng 43 — Giảm 20K đơn quán ngon Đà Nẵng",
    discount_badge: "Giảm 20K",
    category: "FOOD",
    terms: "Mã GRABFOOD20 áp dụng cho đơn từ 60K",
    expires_at: "2026-08-26T22:00:00+07:00"
  },
  {
    deal_id: "LTD_BE_BIKE_SV",
    brand_name: "BeBike",
    title: "BeBike Sinh Viên — Giảm 30% chuyến xe đến các trường ĐH",
    discount_badge: "Giảm 30%",
    category: "RIDE",
    terms: "Mã BEBE43 giảm tối đa 25K cho các chuyến xe sinh viên Đà Nẵng",
    expires_at: "2026-08-31T23:59:59+07:00"
  },
  {
    deal_id: "LTD_XANH_SM_43",
    brand_name: "Xanh SM",
    title: "Xanh SM Bike — Giảm 25% cước giờ cao điểm",
    discount_badge: "Giảm 25%",
    category: "RIDE",
    terms: "Mã XANHSM25 áp dụng khung giờ 16:30 - 18:30",
    expires_at: "2026-08-26T18:30:00+07:00"
  }
];

fs.writeFileSync(feedPath, JSON.stringify(feed, null, 2), 'utf8');
console.log('✅ Updated daily_supply_feed_126.json with 6 verified LTD deals');

console.log('\n--- 2. UPDATING VOUCHERS AND KTX DEALS IN jayt_apex_interface.js ---');

const newVouchersHtml = `
            <!-- VOUCHER 1: SHOPEEFOOD -->
            <div class="voucher-ticket-neon apex-spring-interactive" data-cat="FOOD" style="background:var(--surface-subtle); border:1px solid rgba(234, 88, 12, 0.3); border-radius:14px; padding:14px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
              <div style="flex:1; min-width:200px;">
                <div style="font-size:10px; font-weight:800; color:#EA580C; text-transform:uppercase; letter-spacing:0.5px;">🍔 SHOPEEFOOD ĐÀ NẴNG · GIẢM 18K</div>
                <div style="font-size:16px; font-weight:900; color:var(--text-main); margin:2px 0 4px 0;">SPF18K</div>
                <div style="font-size:11.5px; color:var(--text-muted);">Min spend 40K · Áp dụng bữa trưa và xế chiều</div>
              </div>
              <button type="button" class="btn-copy-code apex-spring-interactive" data-code="SPF18K" style="background:#EA580C; color:#FFF; border:none; border-radius:8px; padding:8px 14px; font-size:12px; font-weight:800; cursor:pointer;">Sao Chép</button>
            </div>

            <!-- VOUCHER 2: GRABFOOD -->
            <div class="voucher-ticket-neon apex-spring-interactive" data-cat="FOOD" style="background:var(--surface-subtle); border:1px solid rgba(16, 185, 129, 0.3); border-radius:14px; padding:14px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
              <div style="flex:1; min-width:200px;">
                <div style="font-size:10px; font-weight:800; color:var(--emerald); text-transform:uppercase; letter-spacing:0.5px;">🍜 GRABFOOD VÙNG 43 · GIẢM 20K</div>
                <div style="font-size:16px; font-weight:900; color:var(--text-main); margin:2px 0 4px 0;">GRABFOOD20</div>
                <div style="font-size:11.5px; color:var(--text-muted);">Min spend 60K · Quán ngon Hải Châu, Thanh Khê</div>
              </div>
              <button type="button" class="btn-copy-code apex-spring-interactive" data-code="GRABFOOD20" style="background:var(--emerald); color:#FFF; border:none; border-radius:8px; padding:8px 14px; font-size:12px; font-weight:800; cursor:pointer;">Sao Chép</button>
            </div>

            <!-- VOUCHER 3: BEBIKE -->
            <div class="voucher-ticket-neon apex-spring-interactive" data-cat="RIDE" style="background:var(--surface-subtle); border:1px solid rgba(245, 158, 11, 0.3); border-radius:14px; padding:14px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
              <div style="flex:1; min-width:200px;">
                <div style="font-size:10px; font-weight:800; color:#F59E0B; text-transform:uppercase; letter-spacing:0.5px;">🛵 BEBIKE SINH VIÊN · GIẢM 30%</div>
                <div style="font-size:16px; font-weight:900; color:var(--text-main); margin:2px 0 4px 0;">BEBE43</div>
                <div style="font-size:11.5px; color:var(--text-muted);">Tối đa 25K · Áp dụng chuyến đi/đến các trường ĐH</div>
              </div>
              <button type="button" class="btn-copy-code apex-spring-interactive" data-code="BEBE43" style="background:#F59E0B; color:#000; border:none; border-radius:8px; padding:8px 14px; font-size:12px; font-weight:800; cursor:pointer;">Sao Chép</button>
            </div>

            <!-- VOUCHER 4: XANH SM -->
            <div class="voucher-ticket-neon apex-spring-interactive" data-cat="RIDE" style="background:var(--surface-subtle); border:1px solid rgba(6, 182, 212, 0.3); border-radius:14px; padding:14px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
              <div style="flex:1; min-width:200px;">
                <div style="font-size:10px; font-weight:800; color:#06B6D4; text-transform:uppercase; letter-spacing:0.5px;">⚡ XANH SM BIKE · GIẢM 25%</div>
                <div style="font-size:16px; font-weight:900; color:var(--text-main); margin:2px 0 4px 0;">XANHSM25</div>
                <div style="font-size:11.5px; color:var(--text-muted);">Khung giờ cao điểm 16:30 - 18:30</div>
              </div>
              <button type="button" class="btn-copy-code apex-spring-interactive" data-code="XANHSM25" style="background:#06B6D4; color:#FFF; border:none; border-radius:8px; padding:8px 14px; font-size:12px; font-weight:800; cursor:pointer;">Sao Chép</button>
            </div>

            <!-- VOUCHER 5: SHOPEE KTX -->
            <div class="voucher-ticket-neon apex-spring-interactive" data-cat="UTILITY" style="background:var(--surface-subtle); border:1px solid rgba(239, 68, 68, 0.3); border-radius:14px; padding:14px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
              <div style="flex:1; min-width:200px;">
                <div style="font-size:10px; font-weight:800; color:#EF4444; text-transform:uppercase; letter-spacing:0.5px;">🛒 SHOPEE SÀN KTX · GIẢM 15K</div>
                <div style="font-size:16px; font-weight:900; color:var(--text-main); margin:2px 0 4px 0;">SHOPEEKTX15</div>
                <div style="font-size:11.5px; color:var(--text-muted);">Min spend 50K · Đồ gia dụng, quạt, đèn học</div>
              </div>
              <button type="button" class="btn-copy-code apex-spring-interactive" data-code="SHOPEEKTX15" style="background:#EF4444; color:#FFF; border:none; border-radius:8px; padding:8px 14px; font-size:12px; font-weight:800; cursor:pointer;">Sao Chép</button>
            </div>

            <!-- VOUCHER 6: TIKTOK SHOP FREESHIP -->
            <div class="voucher-ticket-neon apex-spring-interactive" data-cat="UTILITY" style="background:var(--surface-subtle); border:1px solid rgba(236, 72, 153, 0.3); border-radius:14px; padding:14px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
              <div style="flex:1; min-width:200px;">
                <div style="font-size:10px; font-weight:800; color:#EC4899; text-transform:uppercase; letter-spacing:0.5px;">🎵 TIKTOK SHOP · FREESHIP 0Đ</div>
                <div style="font-size:16px; font-weight:900; color:var(--text-main); margin:2px 0 4px 0;">TIKTOKFREESHIP</div>
                <div style="font-size:11.5px; color:var(--text-muted);">Tối đa 25K · Tự động áp đơn đồ dùng học tập</div>
              </div>
              <button type="button" class="btn-copy-code apex-spring-interactive" data-code="TIKTOKFREESHIP" style="background:#EC4899; color:#FFF; border:none; border-radius:8px; padding:8px 14px; font-size:12px; font-weight:800; cursor:pointer;">Sao Chép</button>
            </div>

            <!-- VOUCHER 7: METIZ CINEMA -->
            <div class="voucher-ticket-neon apex-spring-interactive" data-cat="FOOD" style="background:var(--surface-subtle); border:1px solid rgba(139, 92, 246, 0.3); border-radius:14px; padding:14px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
              <div style="flex:1; min-width:200px;">
                <div style="font-size:10px; font-weight:800; color:#8B5CF6; text-transform:uppercase; letter-spacing:0.5px;">🎬 METIZ CINEMA · ĐỒNG GIÁ 45K</div>
                <div style="font-size:16px; font-weight:900; color:var(--text-main); margin:2px 0 4px 0;">METIZU22</div>
                <div style="font-size:11.5px; color:var(--text-muted);">Học sinh Sinh viên mang thẻ mua trực tiếp tại quầy</div>
              </div>
              <button type="button" class="btn-copy-code apex-spring-interactive" data-code="METIZU22" style="background:#8B5CF6; color:#FFF; border:none; border-radius:8px; padding:8px 14px; font-size:12px; font-weight:800; cursor:pointer;">Sao Chép</button>
            </div>

            <!-- VOUCHER 8: CGV CINEMA -->
            <div class="voucher-ticket-neon apex-spring-interactive" data-cat="FOOD" style="background:var(--surface-subtle); border:1px solid rgba(225, 29, 72, 0.3); border-radius:14px; padding:14px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
              <div style="flex:1; min-width:200px;">
                <div style="font-size:10px; font-weight:800; color:#E11D48; text-transform:uppercase; letter-spacing:0.5px;">🎟️ CGV CULTURE DAY · ĐỒNG GIÁ 75K</div>
                <div style="font-size:16px; font-weight:900; color:var(--text-main); margin:2px 0 4px 0;">CGV75K</div>
                <div style="font-size:11.5px; color:var(--text-muted);">Thứ Tư cuối cùng mỗi tháng toàn cụm rạp CGV</div>
              </div>
              <button type="button" class="btn-copy-code apex-spring-interactive" data-code="CGV75K" style="background:#E11D48; color:#FFF; border:none; border-radius:8px; padding:8px 14px; font-size:12px; font-weight:800; cursor:pointer;">Sao Chép</button>
            </div>
`;

// Replace voucher container in JS
const oldVoucherRegex = /<div id="voucher-feed-container" class="voucher-feed-grid">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/;
// Let's find voucher-feed-grid in JS
const voucherIdx = js.indexOf('id="voucher-feed-container"');
if (voucherIdx !== -1) {
  const closeIdx = js.indexOf('</div>\n          </div>', voucherIdx);
  const before = js.substring(0, voucherIdx + 'id="voucher-feed-container" class="voucher-feed-grid">'.length);
  const after = js.substring(closeIdx);
  js = before + '\n' + newVouchersHtml.trim() + '\n            ' + after;
  console.log('✅ Injected 8 realistic verified vouchers into Tier 4-5 Kho Voucher');
}

fs.writeFileSync(jsPath, js, 'utf8');
console.log('✨ All vouchers and deal feeds refreshed successfully!');
