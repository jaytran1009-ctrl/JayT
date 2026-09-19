const fs = require('fs');
const path = require('path');

const htmlPath = path.resolve(__dirname, '../03_SOURCE_OF_TRUTH/index.html');
const jsPath = path.resolve(__dirname, '../03_SOURCE_OF_TRUTH/jayt_apex_interface.js');
const swPath = path.resolve(__dirname, '../03_SOURCE_OF_TRUTH/sw.js');

let htmlCode = fs.readFileSync(htmlPath, 'utf8');
let jsCode = fs.readFileSync(jsPath, 'utf8');
let swCode = fs.existsSync(swPath) ? fs.readFileSync(swPath, 'utf8') : '';

console.log('--- 1. APPLYING CSS PATCH TO index.html ---');

const cssPatch = `
/* ==========================================================================
   JAYT PRODUCTION PATCH: STUDENT HUB & MOBILE TOUCH STABILITY (v8.0.0)
   ========================================================================== */

/* 1. KHÓA TOUCH ACTION CHỐNG GIẬT TRANG KHI KÉO SLIDER */
#arbitrage-price-slider {
  touch-action: none !important;
  cursor: grab;
}
#arbitrage-price-slider:active {
  cursor: grabbing;
}

/* 2. KHUNG STUDENT HUB MASTER */
.student-hub-master {
  background: var(--surface-card);
  border: 1px solid var(--border-hairline);
  border-radius: 24px;
  padding: 24px;
  margin-top: 24px;
  box-shadow: 0 10px 30px -5px rgba(15, 23, 42, 0.05);
}

.hub-head-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  border-bottom: 1px solid var(--border-hairline);
  padding-bottom: 16px;
  margin-bottom: 20px;
}

.hub-main-title {
  font-size: 18px;
  font-weight: 800;
  color: var(--text-main);
  margin: 0;
}

.hub-sub-title {
  font-size: 12.5px;
  color: var(--text-muted);
  margin: 4px 0 0 0;
}

.hub-tab-dock {
  display: flex;
  gap: 6px;
  background: var(--surface-subtle);
  padding: 4px;
  border-radius: 12px;
}

.hub-btn-tab {
  background: transparent;
  border: none;
  color: var(--text-muted);
  font-weight: 700;
  font-size: 13px;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.hub-btn-tab.active {
  background: var(--surface-card);
  color: var(--emerald);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.hub-panel {
  display: none;
  animation: fadeIn 0.25s ease;
}
.hub-panel.active {
  display: block;
}

/* 3. LƯỚI QUÁN ĂN CỨU ĐÓI <= 25K */
.campus-filter-group {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 16px;
}

.campus-chip {
  background: var(--surface-subtle);
  border: 1px solid var(--border-hairline);
  color: var(--text-main);
  font-size: 12.5px;
  font-weight: 600;
  padding: 6px 14px;
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.2s;
}

.campus-chip.active {
  background: var(--emerald-bg);
  border-color: var(--emerald);
  color: var(--emerald);
}

.food-rescue-matrix {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 14px;
}

.rescue-food-card {
  background: var(--surface-subtle);
  border: 1px solid var(--border-hairline);
  border-radius: 16px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.edu-perks-matrix {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
}

.edu-perk-card {
  background: var(--surface-subtle);
  border: 1px solid var(--border-hairline);
  border-radius: 16px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.edu-card-top {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 8px;
}

.edu-icon {
  font-size: 26px;
  line-height: 1;
}

.edu-price-tag {
  font-size: 15px;
  font-weight: 800;
  color: var(--emerald);
  margin-top: 2px;
}
.edu-price-tag s {
  font-size: 12px;
  color: var(--text-muted);
  margin-left: 4px;
}

.edu-card-desc {
  font-size: 12px;
  color: var(--text-muted);
  line-height: 1.45;
  margin: 0 0 12px 0;
}

.btn-edu-link {
  background: var(--surface-card);
  border: 1px solid var(--border-hairline);
  color: var(--text-main);
  font-weight: 700;
  font-size: 12.5px;
  padding: 8px 14px;
  border-radius: 8px;
  text-align: center;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}
.btn-edu-link:hover {
  border-color: var(--emerald);
  color: var(--emerald);
}

.badge-ship-free {
  background: var(--emerald-bg);
  color: var(--emerald);
  font-size: 11px;
  font-weight: 800;
  padding: 2px 6px;
  border-radius: 4px;
}

.stack-calculator-box {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(5, 150, 105, 0.02) 100%);
  border: 1px dashed var(--emerald);
  border-radius: 14px;
  padding: 16px;
  margin-bottom: 20px;
}

.stack-calc-title {
  font-size: 13px;
  font-weight: 800;
  color: var(--text-main);
  margin-bottom: 6px;
}

.stack-calc-flow {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
  font-size: 12.5px;
  font-weight: 700;
}

.stack-calc-flow .flow-step {
  background: var(--surface-card);
  border: 1px solid var(--border-hairline);
  padding: 4px 10px;
  border-radius: 8px;
}
.stack-calc-flow .flow-op {
  color: var(--text-muted);
  font-weight: 800;
}
.stack-calc-flow .flow-result {
  color: #FFFFFF;
  background: var(--emerald);
  padding: 4px 12px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 900;
  box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);
}

.ktx-gear-matrix {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 14px;
}

.gear-card {
  background: var(--surface-subtle);
  border: 1px solid var(--border-hairline);
  border-radius: 16px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.gear-title {
  font-weight: 800;
  font-size: 14px;
  color: var(--text-main);
}

.gear-price {
  font-size: 15px;
  font-weight: 900;
  color: var(--emerald);
  margin: 6px 0 12px 0;
  display: flex;
  align-items: center;
  gap: 8px;
}
`;

if (!htmlCode.includes('JAYT PRODUCTION PATCH: STUDENT HUB')) {
  const cssAnchor = '/* 1. BỘ LỌC 4 TAB KHO VOUCHER (VOUCHER TAXONOMY TABS) */';
  htmlCode = htmlCode.replace(cssAnchor, cssPatch + '\n    ' + cssAnchor);
  fs.writeFileSync(htmlPath, htmlCode, 'utf8');
  console.log('✅ Added Production Patch CSS to index.html');
}

console.log('\n--- 2. UPDATING JAYT APEX INTERFACE JS ---');

// Replace student hub section in JS with the full HTML template from directive
const hubHtmlBlock = `
        <!-- PHÂN KHU STUDENT HUB 3-IN-1 (ĐẶT TẠI TẦNG 4 TRANG CHỦ) -->
        <section class="student-hub-master apex-canvas-tier specular-glass-panel">
          <div class="hub-head-bar">
            <div>
              <h3 class="hub-main-title">🎓 JayT Student Hub — Đặc Quyền & Cứu Đói Vùng 43</h3>
              <p class="hub-sub-title">100% Đã đối soát chính sách sinh viên & menu thực tế tại Đà Nẵng</p>
            </div>
            <div class="hub-tab-dock">
              <button type="button" class="hub-btn-tab active apex-spring-interactive" data-action="switch-hub-section" data-tab="FOOD_25K">⚡ Cứu Đói ≤ 25K</button>
              <button type="button" class="hub-btn-tab apex-spring-interactive" data-action="switch-hub-section" data-tab="EDU_FREE">💎 Đặc Quyền .edu.vn (0đ)</button>
              <button type="button" class="hub-btn-tab apex-spring-interactive" data-action="switch-hub-section" data-tab="KTX_STACK">🛒 Săn Đồ KTX Xếp Mã</button>
            </div>
          </div>

          <!-- TAB 1: DEAL CỨU ĐÓI <= 25K THEO CỤM TRƯỜNG -->
          <div id="hub-tab-food" class="hub-panel active">
            <div class="campus-filter-group">
              <span style="font-size:12px; font-weight:800; color:var(--text-muted);">Cụm trường:</span>
              <button type="button" class="campus-chip active apex-spring-interactive" data-action="render-campus-deals" data-campus="BK_SP">Bách Khoa / Sư Phạm</button>
              <button type="button" class="campus-chip apex-spring-interactive" data-action="render-campus-deals" data-campus="DUE">Kinh Tế (DUE)</button>
              <button type="button" class="campus-chip apex-spring-interactive" data-action="render-campus-deals" data-campus="DUYTAN">ĐH Duy Tân</button>
              <button type="button" class="campus-chip apex-spring-interactive" data-action="render-campus-deals" data-campus="NN_SPKT">Ngoại Ngữ / SPKT</button>
            </div>
            <div class="food-rescue-matrix" id="foodRescueMatrixContainer">
              <div class="rescue-food-card apex-spring-interactive">
                <div style="font-weight: 800; font-size: 15px; color: var(--text-main);">Cơm Tấm Sườn Cay</div>
                <div style="font-size: 12px; color: var(--text-muted); margin: 3px 0 8px 0;">📍 42 Ngô Văn Sở, Hòa Khánh</div>
                <div style="font-size: 15px; font-weight: 800; color: var(--emerald);">20.000₫ - 25.000₫</div>
                <div style="font-size: 12px; color: var(--emerald); font-weight: 700; margin-top: 6px;">🎁 Trà đá + Canh thêm 0đ</div>
              </div>
              <div class="rescue-food-card apex-spring-interactive">
                <div style="font-weight: 800; font-size: 15px; color: var(--text-main);">Bún Mắm Dì Nga</div>
                <div style="font-size: 12px; color: var(--text-muted); margin: 3px 0 8px 0;">📍 Cổng Chợ Hòa Khánh</div>
                <div style="font-size: 15px; font-weight: 800; color: var(--emerald);">15.000₫ - 20.000₫</div>
                <div style="font-size: 12px; color: var(--emerald); font-weight: 700; margin-top: 6px;">🎁 Suất no lâu, phục vụ cả ngày</div>
              </div>
              <div class="rescue-food-card apex-spring-interactive">
                <div style="font-weight: 800; font-size: 15px; color: var(--text-main);">Bánh Mì Chả Bò Cô Bích</div>
                <div style="font-size: 12px; color: var(--text-muted); margin: 3px 0 8px 0;">📍 Khu F Bách Khoa</div>
                <div style="font-size: 15px; font-weight: 800; color: var(--emerald);">12.000₫ - 15.000₫</div>
                <div style="font-size: 12px; color: var(--emerald); font-weight: 700; margin-top: 6px;">🎁 Mở từ 06:00 - 22:00</div>
              </div>
            </div>
          </div>

          <!-- TAB 2: ĐẶC QUYỀN EMAIL .EDU.VN & THẺ HSSV -->
          <div id="hub-tab-edu" class="hub-panel">
            <div class="edu-perks-matrix">
              <div class="edu-perk-card apex-spring-interactive">
                <div class="edu-card-top">
                  <span class="edu-icon">🎵</span>
                  <div>
                    <h4 style="margin:0; font-size:15px; font-weight:800; color:var(--text-main);">Spotify Student</h4>
                    <div class="edu-price-tag">29.500₫/tháng <s>59.000₫</s></div>
                  </div>
                </div>
                <p class="edu-card-desc">Nghe nhạc offline, không quảng cáo, xác thực SheerID 1 lần/năm.</p>
                <a href="https://www.spotify.com/vn-vi/student/" target="_blank" rel="noopener noreferrer" class="btn-edu-link apex-spring-interactive">Xác Thực SheerID ↗</a>
              </div>

              <div class="edu-perk-card apex-spring-interactive">
                <div class="edu-card-top">
                  <span class="edu-icon">🎬</span>
                  <div>
                    <h4 style="margin:0; font-size:15px; font-weight:800; color:var(--text-main);">YouTube Premium HSSV</h4>
                    <div class="edu-price-tag">49.000₫/tháng <s>79.000₫</s></div>
                  </div>
                </div>
                <p class="edu-card-desc">Chặn 100% quảng cáo, phát video trong nền trên điện thoại & TV.</p>
                <a href="https://www.youtube.com/premium/student" target="_blank" rel="noopener noreferrer" class="btn-edu-link apex-spring-interactive">Xác Thực Email Edu ↗</a>
              </div>

              <div class="edu-perk-card apex-spring-interactive">
                <div class="edu-card-top">
                  <span class="edu-icon">💻</span>
                  <div>
                    <h4 style="margin:0; font-size:15px; font-weight:800; color:var(--text-main);">GitHub Student Pack</h4>
                    <div class="edu-price-tag">0₫/năm <s>~$1.200</s></div>
                  </div>
                </div>
                <p class="edu-card-desc">Miễn phí Copilot, Domain .me, Canva Pro, Namecheap, JetBrains.</p>
                <a href="https://education.github.com/pack" target="_blank" rel="noopener noreferrer" class="btn-edu-link apex-spring-interactive">Nhận Bằng Email Trường ↗</a>
              </div>

              <div class="edu-perk-card apex-spring-interactive">
                <div class="edu-card-top">
                  <span class="edu-icon">📝</span>
                  <div>
                    <h4 style="margin:0; font-size:15px; font-weight:800; color:var(--text-main);">Notion Plus & Canva Pro</h4>
                    <div class="edu-price-tag">0₫ trọn đời sinh viên</div>
                  </div>
                </div>
                <p class="edu-card-desc">Tạo workspace học nhóm không giới hạn khối lượng và thành viên.</p>
                <a href="https://www.notion.so/product/notion-for-education" target="_blank" rel="noopener noreferrer" class="btn-edu-link apex-spring-interactive">Kích Hoạt Bản Quyền 0đ ↗</a>
              </div>

              <div class="edu-perk-card apex-spring-interactive">
                <div class="edu-card-top">
                  <span class="edu-icon">🍎</span>
                  <div>
                    <h4 style="margin:0; font-size:15px; font-weight:800; color:var(--text-main);">Apple Education Store</h4>
                    <div class="edu-price-tag">-2.000.000₫ <s>Tặng Pencil/AirPods</s></div>
                  </div>
                </div>
                <p class="edu-card-desc">Ưu đãi giảm sâu iPad/MacBook + Tặng Apple Pencil chính hãng.</p>
                <a href="https://www.apple.com/vn-edu/store" target="_blank" rel="noopener noreferrer" class="btn-edu-link apex-spring-interactive">Vào Apple UNiDAYS ↗</a>
              </div>

              <div class="edu-perk-card apex-spring-interactive">
                <div class="edu-card-top">
                  <span class="edu-icon">⚡</span>
                  <div>
                    <h4 style="margin:0; font-size:15px; font-weight:800; color:var(--text-main);">JetBrains All Products</h4>
                    <div class="edu-price-tag">0₫/năm <s>$289</s></div>
                  </div>
                </div>
                <p class="edu-card-desc">Miễn phí trọn bộ IDE lập trình IntelliJ, WebStorm, PyCharm cho SV.</p>
                <a href="https://www.jetbrains.com/community/education/#students" target="_blank" rel="noopener noreferrer" class="btn-edu-link apex-spring-interactive">Nhận License Sinh Viên ↗</a>
              </div>
            </div>
          </div>

          <!-- TAB 3: TRÌNH MÔ PHỎNG XẾP CHỒNG 3 TẦNG MÃ KTX -->
          <div id="hub-tab-ktx" class="hub-panel">
            <div class="stack-calculator-box">
              <div class="stack-calc-title">🧮 CÔNG THỨC XẾP CHỒNG 3 TẦNG MÃ ĐÁY (SHOPEE / TIKTOK SHOP)</div>
              <div class="stack-calc-flow">
                <span class="flow-step">Giá Shop: 85.000₫</span>
                <span class="flow-op">-</span>
                <span class="flow-step">Mã Shop 10%: 8.500₫</span>
                <span class="flow-op">-</span>
                <span class="flow-step">Voucher Sàn: 15.000₫</span>
                <span class="flow-op">-</span>
                <span class="flow-step">Freeship Xtra: 21.000₫</span>
                <span class="flow-op">=</span>
                <span class="flow-result">Thực Trả: 40.500₫</span>
              </div>
            </div>
            <div class="ktx-gear-matrix">
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
            </div>
          </div>
        </section>
`;

// Replace previous student hub block in JS
const oldHubPattern = /<!-- 5\. JAYT STUDENT HUB:[\s\S]*?<\/section>/;
if (oldHubPattern.test(jsCode)) {
  jsCode = jsCode.replace(oldHubPattern, hubHtmlBlock.trim());
  console.log('✅ Replaced Student Hub HTML block in jayt_apex_interface.js');
}

// Controller functions in JS
const controllerFunctions = `
  // 1. ĐIỀU HƯỚNG TAB STUDENT HUB MASTER
  function switchHubSection(tabId, btn) {
    playHapticTick();
    document.querySelectorAll('.hub-btn-tab').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.hub-panel').forEach(p => p.classList.remove('active'));

    if (btn) btn.classList.add('active');

    if (tabId === 'FOOD_25K') {
      const p = document.getElementById('hub-tab-food');
      if (p) p.classList.add('active');
    } else if (tabId === 'EDU_FREE') {
      const p = document.getElementById('hub-tab-edu');
      if (p) p.classList.add('active');
    } else if (tabId === 'KTX_STACK') {
      const p = document.getElementById('hub-tab-ktx');
      if (p) p.classList.add('active');
    }
  }

  // 2. DỮ LIỆU ĐÃ ĐỐI SOÁT CỤM TRƯỜNG ĐÀ NẴNG
  const campusRescueDirectory = {
    BK_SP: [
      { name: "Cơm Tấm Sườn Cay", address: "42 Ngô Văn Sở, Hòa Khánh", price: "20.000₫ - 25.000₫", perk: "Trà đá + Canh thêm 0đ" },
      { name: "Bún Mắm Dì Nga", address: "Cổng Chợ Hòa Khánh", price: "15.000₫ - 20.000₫", perk: "Suất no lâu, phục vụ cả ngày" },
      { name: "Bánh Mì Chả Bò Cô Bích", address: "Khu F Bách Khoa", price: "12.000₫ - 15.000₫", perk: "Mở từ 06:00 - 22:00" }
    ],
    DUE: [
      { name: "Cơm Gà Xé Kiệt K48", address: "48 Hồ Xuân Hương, NHS", price: "25.000₫", perk: "Sinh viên xin thêm cơm 0đ" },
      { name: "Bánh Mì Que & Xôi Gà", address: "Chợ Bắc Mỹ An", price: "12.000₫ - 18.000₫", perk: "Ngon rẻ trứ danh sinh viên DUE" }
    ],
    DUYTAN: [
      { name: "Cơm Bình Dân Dì Mai", address: "100 Thái Phiên, Hải Châu", price: "20.000₫ - 25.000₫", perk: "Có phòng máy lạnh trưa" },
      { name: "Bún Bò Huế Bình Dân", address: "Kiệt Quang Trung", price: "20.000₫ - 25.000₫", perk: "Ưu tiên suất đầy đặn cho HSSV" }
    ],
    NN_SPKT: [
      { name: "Bún Chả Cá & Bánh Bột Lọc", address: "Đường Lương Nhữ Hộc", price: "15.000₫ - 20.000₫", perk: "Giá niêm yết chuẩn HSSV" },
      { name: "Cơm Phần Tự Chọn Dì Lan", address: "Gần ĐH Sư Phạm Kỹ Thuật", price: "20.000₫ - 25.000₫", perk: "Miễn phí trà sâm dứa" }
    ]
  };

  function renderCampusDeals(campusKey, chip) {
    playHapticTick();
    document.querySelectorAll('.campus-chip').forEach(c => c.classList.remove('active'));
    if (chip) chip.classList.add('active');

    const container = document.getElementById('foodRescueMatrixContainer');
    if (!container) return;
    const items = campusRescueDirectory[campusKey] || campusRescueDirectory.BK_SP || [];

    container.innerHTML = items.map(item => \`
      <div class="rescue-food-card apex-spring-interactive">
        <div style="font-weight: 800; font-size: 15px; color: var(--text-main);">\${item.name}</div>
        <div style="font-size: 12px; color: var(--text-muted); margin: 3px 0 8px 0;">📍 \${item.address}</div>
        <div style="font-size: 15px; font-weight: 800; color: var(--emerald);">\${item.price}</div>
        <div style="font-size: 12px; color: var(--emerald); font-weight: 700; margin-top: 6px;">🎁 \${item.perk}</div>
      </div>
    \`).join('');
  }
`;

const oldControllerPattern = /\/\/ --- JAYT STUDENT HUB CONTROLLER[\s\S]*?function filterCampus[\s\S]*?`\)\.join\(''\);\s*}/;
if (oldControllerPattern.test(jsCode)) {
  jsCode = jsCode.replace(oldControllerPattern, '// --- JAYT STUDENT HUB MASTER CONTROLLER (v8.0.0) ---\n' + controllerFunctions.trim());
  console.log('✅ Injected Master Controller functions to JS');
}

// Add listeners for new Master Hub
const masterHubListeners = `
    // v8.0.0 Master Student Hub Listeners
    document.querySelectorAll('[data-action="switch-hub-section"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tab = e.currentTarget.getAttribute('data-tab') || 'FOOD_25K';
        switchHubSection(tab, e.currentTarget);
      });
    });

    document.querySelectorAll('[data-action="render-campus-deals"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const campus = e.currentTarget.getAttribute('data-campus') || 'BK_SP';
        renderCampusDeals(campus, e.currentTarget);
      });
    });
`;

if (!jsCode.includes('[data-action="switch-hub-section"]')) {
  const listenerPoint = 'document.querySelectorAll(\'[data-action="switch-student-tab"]\').forEach';
  if (jsCode.includes(listenerPoint)) {
    jsCode = jsCode.replace(listenerPoint, masterHubListeners + '\n    ' + listenerPoint);
  } else {
    const fallbackPoint = 'document.querySelectorAll(\'[data-action="launch-kinetic-roulette"]\').forEach';
    jsCode = jsCode.replace(fallbackPoint, masterHubListeners + '\n    ' + fallbackPoint);
  }
  console.log('✅ Added Master Hub event listeners');
}

// PWA Update notification listener in JS
if (!jsCode.includes('controllerchange')) {
  const pwaUpdateSnippet = `
  // PWA Dynamic Cache Update Listener
  if (typeof navigator !== 'undefined' && 'serviceWorker' in navigator) {
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      showToast("✨ Có bản cập nhật mới — Chạm để làm mới 0s");
    });
  }
  `;
  jsCode += '\n' + pwaUpdateSnippet;
  console.log('✅ Added PWA controllerchange listener in JS');
}

fs.writeFileSync(jsPath, jsCode, 'utf8');

// Update sw.js version cache
if (swCode.includes('jayt-cache-v')) {
  swCode = swCode.replace(/jayt-cache-v\d+/, 'jayt-cache-v8');
  fs.writeFileSync(swPath, swCode, 'utf8');
  console.log('✅ Updated sw.js cache name to jayt-cache-v8');
}

console.log('✨ FULL-SITE PRODUCTION PATCH v8.0.0 COMPLETED SUCCESSFULLY!');
