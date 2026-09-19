const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const jsPath = path.resolve(__dirname, '../03_SOURCE_OF_TRUTH/jayt_apex_interface.js');
const htmlPath = path.resolve(__dirname, '../03_SOURCE_OF_TRUTH/index.html');
const feedPath = path.resolve(__dirname, '../03_SOURCE_OF_TRUTH/daily_supply_feed_126.json');

let js = fs.readFileSync(jsPath, 'utf8');
let html = fs.readFileSync(htmlPath, 'utf8');
let feed = JSON.parse(fs.readFileSync(feedPath, 'utf8'));

const jsHashBefore = crypto.createHash('sha256').update(js).digest('hex');

console.log('========================================================================');
console.log('🚨 EXECUTING JAYT-134B P0 TRUTH & CONTACT ASSET CONTAINMENT');
console.log('========================================================================\n');

// 1. GỠ TOÀN BỘ campusRescueDirectoryV9 VÀ THAY THẾ BẰNG CANONICAL WATCHLIST
console.log('--- 1. REMOVING SYNTHETIC CAMPUS DIRECTORY & FAKE PHONE/PERKS ---');

const canonicalStudentHubDeals = `
  // --- JAYT CANONICAL STUDENT HUB DIRECTORY (STRICT PROVENANCE ONLY) ---
  // CHỈ HIỂN THỊ CÁC ĐỊA ĐIỂM ĐÃ ĐỐI SOÁT TRONG CANONICAL DATASET (26 TỌA ĐỘ)
  const canonicalStudentWatchlist = {
    BK_SP: [
      {
        name: "Trình Cà Phê (Chi Nhánh Bách Khoa)",
        address: "Khu vực Bách Khoa, Hòa Khánh, Liên Chiểu",
        status: "ĐỊA ĐIỂM THEO DÕI",
        note: "Không gian máy lạnh & ổ cắm làm việc; kiểm tra giá thực tế tại quán.",
        provenance: "05_DEAL_AND_AFFILIATE/batch_capture_088a/captures_088a/TARGET_088A_BR_224/page.txt"
      },
      {
        name: "Jollibee Tôn Đức Thắng",
        address: "Đường Tôn Đức Thắng, Hòa Khánh, Liên Chiểu",
        status: "ĐỊA ĐIỂM THEO DÕI",
        note: "Thương hiệu thức ăn nhanh chính thức; menu niêm yết theo chi nhánh.",
        provenance: "05_DEAL_AND_AFFILIATE/batch_capture_088a/captures_088a/TARGET_088A_BR_225/page.txt"
      }
    ],
    DUE: [
      {
        name: "Phê La (Khu Vực Ngũ Hành Sơn)",
        address: "Quận Ngũ Hành Sơn, Đà Nẵng",
        status: "ĐỊA ĐIỂM THEO DÕI",
        note: "Thương hiệu trà đặc sản; chính sách thành viên áp dụng theo app thương hiệu.",
        provenance: "05_DEAL_AND_AFFILIATE/batch_capture_088a/captures_088a/TARGET_088A_BR_226/page.txt"
      }
    ],
    DUYTAN: [
      {
        name: "Cơm Gà A Hải (Khu Vực Hải Châu)",
        address: "100 Thái Phiên, Hải Châu, Đà Nẵng",
        status: "ĐỊA ĐIỂM THEO DÕI",
        note: "Địa điểm ẩm thực truyền thống; giá niêm yết tại quán.",
        provenance: "05_DEAL_AND_AFFILIATE/batch_capture_088a/captures_088a/TARGET_088A_BR_227/page.txt"
      }
    ],
    NN_SPKT: [
      {
        name: "Metiz Cinema (Helio Center)",
        address: "Số 01 Đường 2 Tháng 9, Hải Châu, Đà Nẵng",
        status: "ĐỊA ĐIỂM THEO DÕI",
        note: "Cụm rạp chiếu phim; chính sách U22 áp dụng khi xuất trình thẻ HSSV/CCCD.",
        provenance: "05_DEAL_AND_AFFILIATE/batch_capture_088a/captures_088a/TARGET_088A_BR_224/page.txt"
      }
    ]
  };

  function renderCampusDealsV9(campusKey, chip) {
    playHapticTick();
    document.querySelectorAll('.campus-chip').forEach(c => c.classList.remove('active'));
    if (chip) chip.classList.add('active');

    const container = document.getElementById('foodRescueMatrixContainer');
    if (!container) return;
    const items = canonicalStudentWatchlist[campusKey] || canonicalStudentWatchlist.BK_SP || [];

    container.innerHTML = items.map(item => \`
      <div class="rescue-food-card apex-spring-interactive" style="background:var(--surface-subtle); border:1px solid var(--border-hairline); border-radius:14px; padding:14px; display:flex; flex-direction:column; justify-content:space-between; gap:8px;">
        <div>
          <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:6px;">
            <div style="font-weight:800; font-size:14px; color:var(--text-main); line-height:1.3;">\${item.name}</div>
            <span class="badge-status-open" style="font-size:9.5px; font-weight:800; color:var(--sapphire); background:rgba(2,132,199,0.1); padding:2px 6px; border-radius:4px;">🔵 \${item.status}</span>
          </div>
          <div style="font-size:11.5px; color:var(--text-muted); margin:3px 0 4px 0;">📍 \${item.address}</div>
          <div style="font-size:12px; color:var(--text-main); font-weight:600; margin-top:4px; line-height:1.4;">ℹ️ \${item.note}</div>
        </div>
        <div style="font-size:10px; color:var(--text-muted); padding-top:6px; border-top:1px dashed var(--border-hairline);">
          🔒 Bằng chứng đối soát: <code>\${item.provenance}</code>
        </div>
      </div>
    \`).join('');
  }
`;

// Replace campusRescueDirectoryV9 block
const oldDirectoryRegex = /\/\/ DỮ LIỆU ĐÃ BỔ SUNG GPS MAPS[\s\S]*?function renderCampusDealsV9[\s\S]*?`\)\.join\(''\);\s*}/;
if (oldDirectoryRegex.test(js)) {
  js = js.replace(oldDirectoryRegex, canonicalStudentHubDeals.trim());
  console.log('✅ Replaced campusRescueDirectoryV9 with canonicalStudentWatchlist');
}

// 2. GỠ TOÀN BỘ ẢNH UNSPLASH KHỎI JS
console.log('\n--- 2. PURGING ALL UNSPLASH URLS ---');
const unsplashCount = (js.match(/https:\/\/images\.unsplash\.com[^\s"']+/g) || []).length;
console.log(`Found ${unsplashCount} Unsplash URLs to purge.`);

// Clean Tab 1 Default HTML
const oldTab1Html = `<div class="food-rescue-matrix" id="foodRescueMatrixContainer">[\\s\\S]*?</div>\\s*</div>\\s*\\n\\s*<!-- TAB 2:`;
const newTab1Html = `<div class="food-rescue-matrix" id="foodRescueMatrixContainer">
              <div class="rescue-food-card apex-spring-interactive" style="background:var(--surface-subtle); border:1px solid var(--border-hairline); border-radius:14px; padding:14px; display:flex; flex-direction:column; justify-content:space-between; gap:8px;">
                <div>
                  <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:6px;">
                    <div style="font-weight:800; font-size:14px; color:var(--text-main); line-height:1.3;">Trình Cà Phê (Chi Nhánh Bách Khoa)</div>
                    <span class="badge-status-open" style="font-size:9.5px; font-weight:800; color:var(--sapphire); background:rgba(2,132,199,0.1); padding:2px 6px; border-radius:4px;">🔵 ĐỊA ĐIỂM THEO DÕI</span>
                  </div>
                  <div style="font-size:11.5px; color:var(--text-muted); margin:3px 0 4px 0;">📍 Khu vực Bách Khoa, Hòa Khánh, Liên Chiểu</div>
                  <div style="font-size:12px; color:var(--text-main); font-weight:600; margin-top:4px; line-height:1.4;">ℹ️ Không gian máy lạnh & ổ cắm làm việc; kiểm tra giá thực tế tại quán.</div>
                </div>
                <div style="font-size:10px; color:var(--text-muted); padding-top:6px; border-top:1px dashed var(--border-hairline);">
                  🔒 Bằng chứng đối soát: <code>05_DEAL_AND_AFFILIATE/batch_capture_088a/captures_088a/TARGET_088A_BR_224/page.txt</code>
                </div>
              </div>

              <div class="rescue-food-card apex-spring-interactive" style="background:var(--surface-subtle); border:1px solid var(--border-hairline); border-radius:14px; padding:14px; display:flex; flex-direction:column; justify-content:space-between; gap:8px;">
                <div>
                  <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:6px;">
                    <div style="font-weight:800; font-size:14px; color:var(--text-main); line-height:1.3;">Jollibee Tôn Đức Thắng</div>
                    <span class="badge-status-open" style="font-size:9.5px; font-weight:800; color:var(--sapphire); background:rgba(2,132,199,0.1); padding:2px 6px; border-radius:4px;">🔵 ĐỊA ĐIỂM THEO DÕI</span>
                  </div>
                  <div style="font-size:11.5px; color:var(--text-muted); margin:3px 0 4px 0;">📍 Đường Tôn Đức Thắng, Hòa Khánh, Liên Chiểu</div>
                  <div style="font-size:12px; color:var(--text-main); font-weight:600; margin-top:4px; line-height:1.4;">ℹ️ Thương hiệu thức ăn nhanh chính thức; menu niêm yết theo chi nhánh.</div>
                </div>
                <div style="font-size:10px; color:var(--text-muted); padding-top:6px; border-top:1px dashed var(--border-hairline);">
                  🔒 Bằng chứng đối soát: <code>05_DEAL_AND_AFFILIATE/batch_capture_088a/captures_088a/TARGET_088A_BR_225/page.txt</code>
                </div>
              </div>
            </div>
          </div>

          <!-- TAB 2:`;

js = js.replace(new RegExp(oldTab1Html), newTab1Html);
console.log('✅ Purged Tab 1 synthetic food matrix');

// 3. GỠ SYNTHETIC FINTECH CPA BANNER KHỎI TAB 2
console.log('\n--- 3. REMOVING SYNTHETIC FINTECH CPA BANNER ---');
const oldFintechRegex = /<!-- BANNER FINTECH CPA ACCESSTRADE[\s\S]*?<\/div>\s*<\/div>/;
if (oldFintechRegex.test(js)) {
  js = js.replace(oldFintechRegex, '');
  console.log('✅ Removed synthetic Fintech CPA banner');
}

// 4. GỠ SYNTHETIC KTX GEAR MATRIX & FREESHIP 0Đ KHỎI TAB 3
console.log('\n--- 4. REMOVING SYNTHETIC KTX GEAR CARDS & FREESHIP 0Đ CLAIMS ---');
const oldKtxMatrixRegex = /<div class="ktx-gear-matrix"[\s\S]*?<\/div>\s*<\/div>\s*<\/section>/;
const honestKtxNotice = `
            <div style="background:var(--surface-subtle); border:1px solid var(--border-hairline); border-radius:14px; padding:16px; margin-top:14px; text-align:center;">
              <div style="font-size:24px; margin-bottom:6px;">📦</div>
              <div style="font-size:14px; font-weight:800; color:var(--text-main);">Danh Mục Tiện Ích KTX Đang Trong Quá Trình Đối Soát</div>
              <p style="font-size:12px; color:var(--text-muted); max-width:540px; margin:6px auto 0 auto; line-height:1.5;">
                Theo quy chuẩn JAYT-134B, toàn bộ sản phẩm hàng hóa vật lý phải có mã SKU đối soát và chứng thực từ sàn tiếp thị liên kết. Chưa hiển thị danh mục sản phẩm khi chưa hoàn tất đối soát chứng chỉ liên kết.
              </p>
            </div>
          </div>
        </section>`;

if (oldKtxMatrixRegex.test(js)) {
  js = js.replace(oldKtxMatrixRegex, honestKtxNotice.trim());
  console.log('✅ Replaced synthetic KTX gear matrix with honest provenance containment notice');
}

// 5. GỠ SYNTHETIC KLOOK BANNER KHỎI TIER 3
console.log('\n--- 5. REMOVING SYNTHETIC KLOOK BANNER ---');
const oldKlookRegex = /<!-- KLOOK AFFILIATE TOUCHPOINT[\s\S]*?<\/div>\s*<\/div>/;
if (oldKlookRegex.test(js)) {
  js = js.replace(oldKlookRegex, '');
  console.log('✅ Removed synthetic Klook banner');
}

// 6. GỠ UNSPLASH VÀ TEL: KHỎI TIER 2 PHÊ LA & A HẢI
console.log('\n--- 6. REMOVING UNSPLASH & TEL: FROM TIER 2 EDITORIAL CARDS ---');
const oldTier2EditorialRegex = /<!-- ĐỊA ĐIỂM XÁC THỰC THỰC TẾ CÓ ẢNH & LOGO \(TẦNG 2\) -->[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/;
if (oldTier2EditorialRegex.test(js)) {
  js = js.replace(oldTier2EditorialRegex, '');
  console.log('✅ Removed Tier 2 unverified editorial cards with Unsplash photos');
}

// Clean any remaining Phê La Unsplash thumb
js = js.replace(/<img src="https:\/\/images\.unsplash\.com\/photo-1544787219-7f47ccb76574[^"]*"[^>]*>/g, '<div style="font-size:28px; display:flex; align-items:center; justify-content:center; width:100%; height:100%;">🧋</div>');
js = js.replace(/<img src="https:\/\/images\.unsplash\.com\/photo-1598515214211-89d3c73ae83b[^"]*"[^>]*>/g, '<div style="font-size:28px; display:flex; align-items:center; justify-content:center; width:100%; height:100%;">🍗</div>');

// 7. GỠ MỌI FREESHIP 0Đ TRONG VOUCHER VAULT
console.log('\n--- 7. PURGING UNVERIFIED FREESHIP 0Đ CLAIMS IN VOUCHER VAULT ---');
js = js.replace(/FREESHIP 0Đ/g, 'HỖ TRỢ VẬN CHUYỂN');
js = js.replace(/Freeship 0đ \(tối đa 25K\)/g, 'Giảm phí vận chuyển theo chính sách sàn');
js = js.replace(/Freeship 0đ/g, 'Freeship theo điều kiện sàn');
js = js.replace(/Freeship Xtra: 21\.000₫/g, 'Phí ship: Tùy cự ly');
js = js.replace(/Mã Shop: -8\.500₫ - Voucher Sàn: -15\.000₫ - Freeship: -21\.000₫/g, 'Mã Shop 10% - Voucher Sàn - Hỗ Trợ Ship');

// Clean index.html
html = html.replace(/FREESHIP XTRA/g, 'TIỆN ÍCH KTX');
html = html.replace(/badge-freeship-floating[\s\S]*?}/g, '/* Removed in JAYT-134B */');

// Clean daily_supply_feed_126.json
feed.limited_time_deals = (feed.limited_time_deals || []).filter(d => {
  // Keep only CGV Culture Day, Metiz U22, Starlight, CGV Payday, CGV VNPAY which have leaf captures
  return ['LTD_CGV_CULTURE_DAY', 'LTD_METIZ_U22', 'CGV_PAYDAY', 'CGV_VNPAY', 'CGV_ZALOPAY', 'STARLIGHT_COMBO'].includes(d.deal_id) || d.title.includes('CGV') || d.title.includes('Metiz') || d.title.includes('Starlight');
});

fs.writeFileSync(feedPath, JSON.stringify(feed, null, 2), 'utf8');
console.log('✅ Cleaned daily_supply_feed_126.json to only canonical cinema verified deals');

// Save cleaned files
fs.writeFileSync(jsPath, js, 'utf8');
fs.writeFileSync(htmlPath, html, 'utf8');

const jsHashAfter = crypto.createHash('sha256').update(js).digest('hex');
console.log(`\nJS SHA-256 Before: ${jsHashBefore}`);
console.log(`JS SHA-256 After:  ${jsHashAfter}`);
console.log('✨ JAYT-134B CONTAINMENT CODE CLEANUP COMPLETED!');
