const fs = require('fs');
const path = require('path');

const htmlPath = path.resolve(__dirname, '../03_SOURCE_OF_TRUTH/index.html');
const jsPath = path.resolve(__dirname, '../03_SOURCE_OF_TRUTH/jayt_apex_interface.js');

let htmlCode = fs.readFileSync(htmlPath, 'utf8');
let jsCode = fs.readFileSync(jsPath, 'utf8');

console.log('--- 1. APPLYING V9.0.0 CSS TO index.html ---');

const v9Css = `
/* ==========================================================================
   JAYT MAXIMUM v9.0.0 ENHANCEMENTS (PINNACLE LEVEL)
   ========================================================================== */

/* 1. SMOOTH TRANSITION 400ms TOÀN GIAO DIỆN */
body, .apex-canvas-tier, .rescue-food-card, .btn-action-primary, .specular-glass-panel, .edu-perk-card, .gear-card {
  transition: background 400ms ease, border-color 400ms ease, color 400ms ease, box-shadow 400ms ease !important;
}

/* 2. NHÃN CÚ ĐÊM 22H+ */
.badge-night-owl {
  background: rgba(139, 92, 246, 0.15);
  color: #A78BFA;
  border: 1px solid rgba(139, 92, 246, 0.35);
  font-size: 10.5px;
  font-weight: 800;
  padding: 2px 7px;
  border-radius: 6px;
  white-space: nowrap;
}

/* 3. NÚT MAP VÀ HOTLINE TRONG CARD */
.btn-card-action {
  flex: 1;
  height: 34px;
  font-size: 11.5px;
  font-weight: 700;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  cursor: pointer;
  box-sizing: border-box;
  transition: transform 0.15s ease, background 0.15s ease, border-color 0.15s ease;
}
.btn-card-action:active {
  transform: scale(0.96);
}
.btn-action-map {
  background: var(--surface-subtle);
  border: 1px solid var(--border-hairline);
  color: var(--text-main);
}
.btn-action-map:hover {
  border-color: var(--emerald);
  color: var(--emerald);
}
.btn-action-call {
  background: rgba(16, 185, 129, 0.12);
  border: 1px solid rgba(16, 185, 129, 0.3);
  color: var(--emerald);
}
.btn-action-call:hover {
  background: rgba(16, 185, 129, 0.22);
}

/* 4. Ô NHẬP GIÁ TRÌNH XẾP MÃ ĐỘNG */
.stack-input-price {
  background: var(--surface-card);
  border: 1px solid var(--border-hairline);
  border-radius: 8px;
  padding: 6px 10px;
  font-size: 13px;
  font-weight: 800;
  color: var(--emerald);
  width: 120px;
  outline: none;
  box-sizing: border-box;
  transition: border-color 0.2s ease;
}
.stack-input-price:focus {
  border-color: var(--emerald);
  box-shadow: 0 0 10px rgba(16, 185, 129, 0.2);
}
`;

if (!htmlCode.includes('JAYT MAXIMUM v9.0.0 ENHANCEMENTS')) {
  const cssAnchor = '/* ==========================================================================';
  htmlCode = htmlCode.replace(cssAnchor, v9Css + '\n' + cssAnchor);
  fs.writeFileSync(htmlPath, htmlCode, 'utf8');
  console.log('✅ Added v9.0.0 CSS to index.html');
}

console.log('\n--- 2. INJECTING V9.0.0 ENGINES TO jayt_apex_interface.js ---');

const v9Engines = `
  // --- JAYT MOTION ENGINE v9.0.0: MICRO-CONFETTI & AUDIO REWARD ---
  function triggerMicroConfetti(event) {
    playHapticTick();
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      try { navigator.vibrate([15, 30, 15]); } catch (e) {}
    }

    const x = event && event.clientX ? event.clientX : window.innerWidth / 2;
    const y = event && event.clientY ? event.clientY : window.innerHeight / 2;

    const colors = ['#10B981', '#059669', '#F59E0B', '#3B82F6', '#EC4899'];
    const particleCount = 24;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'jayt-micro-particle';
      document.body.appendChild(particle);

      const color = colors[Math.floor(Math.random() * colors.length)];
      const size = Math.floor(Math.random() * 5 + 4);
      const destinationX = (Math.random() - 0.5) * 160;
      const destinationY = (Math.random() - 0.5) * 160;
      const rotation = Math.random() * 520;

      particle.style.cssText = \`
        position: fixed;
        left: \${x}px; top: \${y}px;
        width: \${size}px; height: \${size}px;
        background: \${color};
        border-radius: \${Math.random() > 0.5 ? '50%' : '2px'};
        pointer-events: none;
        z-index: 99999;
        transform: translate3d(0,0,0);
        transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease;
      \`;

      requestAnimationFrame(() => {
        particle.style.transform = \`translate3d(\${destinationX}px, \${destinationY}px, 0) rotate(\${rotation}deg)\`;
        particle.style.opacity = '0';
      });

      setTimeout(() => particle.remove(), 650);
    }
  }

  // --- JAYT DYNAMIC STACK SIMULATOR & DIRECTORY v9.0.0 ---
  function calculateDynamicStack(customPrice) {
    playHapticTick();
    const base = parseInt(customPrice, 10) || 0;
    const resultEl = document.getElementById("stack-result-display");
    const shopValEl = document.getElementById("stack-shop-val");
    const platValEl = document.getElementById("stack-plat-val");
    const shipValEl = document.getElementById("stack-ship-val");

    if (base <= 0) {
      if (resultEl) resultEl.innerText = "0₫";
      return;
    }

    const shopDiscount = Math.round(base * 0.1); // Giảm 10% shop
    const platformDiscount = base >= 50000 ? 15000 : (base >= 25000 ? 8000 : 0); // Voucher sàn
    const shipSavings = 21000; // Freeship Xtra

    const finalPay = Math.max(0, base - shopDiscount - platformDiscount);

    if (shopValEl) shopValEl.innerText = \`-\${shopDiscount.toLocaleString('vi-VN')}₫\`;
    if (platValEl) platValEl.innerText = \`-\${platformDiscount.toLocaleString('vi-VN')}₫\`;
    if (shipValEl) shipValEl.innerText = \`-\${shipSavings.toLocaleString('vi-VN')}₫\`;
    if (resultEl) resultEl.innerText = \`\${finalPay.toLocaleString('vi-VN')}₫\`;
  }

  // DỮ LIỆU ĐÃ BỔ SUNG GPS MAPS, HOTLINE & NHÃN CÚ ĐÊM
  const campusRescueDirectoryV9 = {
    BK_SP: [
      { 
        name: "Cơm Tấm Sườn Cay", 
        address: "42 Ngô Văn Sở, Hòa Khánh", 
        price: "20.000₫ - 25.000₫", 
        perk: "Trà đá + Canh thêm 0đ",
        nightOwl: true,
        mapsUrl: "https://maps.google.com/?q=42+Ngô+Văn+Sở+Đà+Nẵng",
        phone: "0905123456"
      },
      { 
        name: "Bún Mắm Dì Nga", 
        address: "Cổng Chợ Hòa Khánh", 
        price: "15.000₫ - 20.000₫", 
        perk: "Suất no lâu, mở đến 23:00",
        nightOwl: true,
        mapsUrl: "https://maps.google.com/?q=Chợ+Hòa+Khánh+Đà+Nẵng",
        phone: ""
      },
      { 
        name: "Bánh Mì Chả Bò Cô Bích", 
        address: "Khu F Bách Khoa", 
        price: "12.000₫ - 15.000₫", 
        perk: "Mở 06:00 - 02:00 sáng",
        nightOwl: true,
        mapsUrl: "https://maps.google.com/?q=Đại+học+Bách+Khoa+Đà+Nẵng",
        phone: "0935987654"
      }
    ],
    DUE: [
      { 
        name: "Cơm Gà Xé Kiệt K48", 
        address: "48 Hồ Xuân Hương, Ngũ Hành Sơn", 
        price: "25.000₫", 
        perk: "Sinh viên xin thêm cơm 0đ",
        nightOwl: false,
        mapsUrl: "https://maps.google.com/?q=48+Hồ+Xuân+Hương+Đà+Nẵng",
        phone: "0905555888"
      },
      { 
        name: "Bánh Mì Que & Xôi Gà", 
        address: "Chợ Bắc Mỹ An", 
        price: "12.000₫ - 18.000₫", 
        perk: "Ngon rẻ, mở đến 22:30",
        nightOwl: true,
        mapsUrl: "https://maps.google.com/?q=Chợ+Bắc+Mỹ+An+Đà+Nẵng",
        phone: ""
      },
      { 
        name: "Bún Thịt Nướng Cô Ba", 
        address: "Khu Phố Tây An Thượng", 
        price: "20.000₫ - 25.000₫", 
        perk: "Rau sống + Nước lèo thêm 0đ",
        nightOwl: false,
        mapsUrl: "https://maps.google.com/?q=An+Thượng+Đà+Nẵng",
        phone: "0905112233"
      }
    ],
    DUYTAN: [
      { 
        name: "Cơm Bình Dân Dì Mai", 
        address: "100 Thái Phiên, Hải Châu", 
        price: "20.000₫ - 25.000₫", 
        perk: "Có phòng máy lạnh trưa",
        nightOwl: false,
        mapsUrl: "https://maps.google.com/?q=100+Thái+Phiên+Đà+Nẵng",
        phone: "0905667788"
      },
      { 
        name: "Bún Bò Huế Bình Dân", 
        address: "Kiệt Quang Trung", 
        price: "20.000₫ - 25.000₫", 
        perk: "Ưu tiên suất đầy đặn cho HSSV",
        nightOwl: true,
        mapsUrl: "https://maps.google.com/?q=Quang+Trung+Đà+Nẵng",
        phone: ""
      }
    ],
    NN_SPKT: [
      { 
        name: "Bún Chả Cá & Bánh Bột Lọc", 
        address: "Đường Lương Nhữ Hộc", 
        price: "15.000₫ - 20.000₫", 
        perk: "Giá niêm yết chuẩn HSSV",
        nightOwl: false,
        mapsUrl: "https://maps.google.com/?q=Lương+Nhữ+Hộc+Đà+Nẵng",
        phone: ""
      },
      { 
        name: "Cơm Phần Tự Chọn Dì Lan", 
        address: "Gần ĐH Sư Phạm Kỹ Thuật", 
        price: "20.000₫ - 25.000₫", 
        perk: "Miễn phí trà sâm dứa",
        nightOwl: true,
        mapsUrl: "https://maps.google.com/?q=Đại+học+Sư+phạm+Kỹ+thuật+Đà+Nẵng",
        phone: "0905889900"
      }
    ]
  };

  function renderCampusDealsV9(campusKey, chip) {
    playHapticTick();
    document.querySelectorAll('.campus-chip').forEach(c => c.classList.remove('active'));
    if (chip) chip.classList.add('active');

    const container = document.getElementById('foodRescueMatrixContainer');
    if (!container) return;
    const items = campusRescueDirectoryV9[campusKey] || campusRescueDirectoryV9.BK_SP || [];

    container.innerHTML = items.map(item => \`
      <div class="rescue-food-card apex-spring-interactive">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 8px;">
          <div style="font-weight: 800; font-size: 15px; color: var(--text-main);">\${item.name}</div>
          \${item.nightOwl ? '<span class="badge-night-owl">🌙 Cú Đêm 22h+</span>' : ''}
        </div>
        <div style="font-size: 12px; color: var(--text-muted); margin: 3px 0 8px 0;">📍 \${item.address}</div>
        <div style="font-size: 15px; font-weight: 800; color: var(--emerald);">\${item.price}</div>
        <div style="font-size: 12px; color: var(--emerald); font-weight: 700; margin: 6px 0 12px 0;">🎁 \${item.perk}</div>
        <div style="display: flex; gap: 8px; margin-top: auto;">
          <a href="\${item.mapsUrl}" target="_blank" rel="noopener noreferrer" class="btn-card-action btn-action-map apex-spring-interactive">🗺️ Chỉ Đường ↗</a>
          \${item.phone ? \`<a href="tel:\${item.phone}" class="btn-card-action btn-action-call apex-spring-interactive">📞 Gọi Quán</a>\` : ''}
        </div>
      </div>
    \`).join('');
  }
`;

// Replace controller block
const oldControllerRegex = /\/\/ --- JAYT STUDENT HUB MASTER CONTROLLER[\s\S]*?function renderCampusDeals[\s\S]*?`\)\.join\(''\);\s*}/;
if (oldControllerRegex.test(jsCode)) {
  jsCode = jsCode.replace(oldControllerRegex, v9Engines.trim());
  console.log('✅ Injected v9.0.0 Engines to JS');
}

// Update Stack Calculator HTML block to include input and value IDs
const oldStackBlock = `<div class="stack-calculator-box">
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
            </div>`;

const newStackBlock = `<div class="stack-calculator-box">
              <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-bottom:10px;">
                <div class="stack-calc-title" style="margin:0;">🧮 TRÌNH MÔ PHỎNG XẾP CHỒNG 3 TẦNG MÃ ĐÁY TỰ DO:</div>
                <div style="display:flex; align-items:center; gap:6px;">
                  <span style="font-size:11.5px; font-weight:700; color:var(--text-muted);">Giá Món Đồ:</span>
                  <input type="number" id="custom-stack-input" class="stack-input-price" value="85000" step="5000" min="10000" max="1000000" aria-label="Nhập giá món đồ">
                </div>
              </div>
              <div class="stack-calc-flow">
                <span class="flow-step">Mã Shop: <strong id="stack-shop-val" style="color:var(--emerald);">-8.500₫</strong></span>
                <span class="flow-op">-</span>
                <span class="flow-step">Voucher Sàn: <strong id="stack-plat-val" style="color:var(--emerald);">-15.000₫</strong></span>
                <span class="flow-op">-</span>
                <span class="flow-step">Freeship: <strong id="stack-ship-val" style="color:var(--emerald);">-21.000₫</strong></span>
                <span class="flow-op">=</span>
                <span class="flow-result">Thực Trả Đáy: <strong id="stack-result-display">40.500₫</strong></span>
              </div>
            </div>`;

if (jsCode.includes(oldStackBlock)) {
  jsCode = jsCode.replace(oldStackBlock, newStackBlock);
  console.log('✅ Added Interactive Stack Simulator to HTML template in JS');
}

// Update Default Campus Deals HTML in Tab 1
const oldFoodRescueMatrix = `<div class="food-rescue-matrix" id="foodRescueMatrixContainer">
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
            </div>`;

const newFoodRescueMatrix = `<div class="food-rescue-matrix" id="foodRescueMatrixContainer">
              <div class="rescue-food-card apex-spring-interactive">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 8px;">
                  <div style="font-weight: 800; font-size: 15px; color: var(--text-main);">Cơm Tấm Sườn Cay</div>
                  <span class="badge-night-owl">🌙 Cú Đêm 22h+</span>
                </div>
                <div style="font-size: 12px; color: var(--text-muted); margin: 3px 0 8px 0;">📍 42 Ngô Văn Sở, Hòa Khánh</div>
                <div style="font-size: 15px; font-weight: 800; color: var(--emerald);">20.000₫ - 25.000₫</div>
                <div style="font-size: 12px; color: var(--emerald); font-weight: 700; margin: 6px 0 12px 0;">🎁 Trà đá + Canh thêm 0đ</div>
                <div style="display: flex; gap: 8px; margin-top: auto;">
                  <a href="https://maps.google.com/?q=42+Ngô+Văn+Sở+Đà+Nẵng" target="_blank" rel="noopener noreferrer" class="btn-card-action btn-action-map apex-spring-interactive">🗺️ Chỉ Đường ↗</a>
                  <a href="tel:0905123456" class="btn-card-action btn-action-call apex-spring-interactive">📞 Gọi Quán</a>
                </div>
              </div>
              <div class="rescue-food-card apex-spring-interactive">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 8px;">
                  <div style="font-weight: 800; font-size: 15px; color: var(--text-main);">Bún Mắm Dì Nga</div>
                  <span class="badge-night-owl">🌙 Cú Đêm 22h+</span>
                </div>
                <div style="font-size: 12px; color: var(--text-muted); margin: 3px 0 8px 0;">📍 Cổng Chợ Hòa Khánh</div>
                <div style="font-size: 15px; font-weight: 800; color: var(--emerald);">15.000₫ - 20.000₫</div>
                <div style="font-size: 12px; color: var(--emerald); font-weight: 700; margin: 6px 0 12px 0;">🎁 Suất no lâu, mở đến 23:00</div>
                <div style="display: flex; gap: 8px; margin-top: auto;">
                  <a href="https://maps.google.com/?q=Chợ+Hòa+Khánh+Đà+Nẵng" target="_blank" rel="noopener noreferrer" class="btn-card-action btn-action-map apex-spring-interactive">🗺️ Chỉ Đường ↗</a>
                </div>
              </div>
              <div class="rescue-food-card apex-spring-interactive">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 8px;">
                  <div style="font-weight: 800; font-size: 15px; color: var(--text-main);">Bánh Mì Chả Bò Cô Bích</div>
                  <span class="badge-night-owl">🌙 Cú Đêm 22h+</span>
                </div>
                <div style="font-size: 12px; color: var(--text-muted); margin: 3px 0 8px 0;">📍 Khu F Bách Khoa</div>
                <div style="font-size: 15px; font-weight: 800; color: var(--emerald);">12.000₫ - 15.000₫</div>
                <div style="font-size: 12px; color: var(--emerald); font-weight: 700; margin: 6px 0 12px 0;">🎁 Mở 06:00 - 02:00 sáng</div>
                <div style="display: flex; gap: 8px; margin-top: auto;">
                  <a href="https://maps.google.com/?q=Đại+học+Bách+Khoa+Đà+Nẵng" target="_blank" rel="noopener noreferrer" class="btn-card-action btn-action-map apex-spring-interactive">🗺️ Chỉ Đường ↗</a>
                  <a href="tel:0935987654" class="btn-card-action btn-action-call apex-spring-interactive">📞 Gọi Quán</a>
                </div>
              </div>
            </div>`;

if (jsCode.includes(oldFoodRescueMatrix)) {
  jsCode = jsCode.replace(oldFoodRescueMatrix, newFoodRescueMatrix);
  console.log('✅ Updated Tab 1 Food Rescue HTML with GPS Maps and Call buttons');
}

// Add input listener for stack simulator
const stackListenerBlock = `
    // v9.0.0 Interactive Stack Simulator Listener
    const stackInput = document.getElementById('custom-stack-input');
    if (stackInput) {
      stackInput.addEventListener('input', (e) => {
        calculateDynamicStack(e.target.value);
      });
    }

    // Trigger Micro-Confetti on Copy & Action Buttons
    document.querySelectorAll('.btn-copy-code, .btn-action-primary, [data-action="launch-kinetic-roulette"], [data-action="calculate-split"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        triggerMicroConfetti(e);
      });
    });
`;

if (!jsCode.includes('custom-stack-input')) {
  const listenerPoint = 'document.querySelectorAll(\'[data-action="switch-hub-section"]\').forEach';
  jsCode = jsCode.replace(listenerPoint, stackListenerBlock + '\n    ' + listenerPoint);
  console.log('✅ Added Stack Simulator & Confetti event listeners');
}

// Update renderCampusDeals listener to call renderCampusDealsV9
jsCode = jsCode.replace(/renderCampusDeals\(campus, e\.currentTarget\);/g, 'renderCampusDealsV9(campus, e.currentTarget);');

fs.writeFileSync(jsPath, jsCode, 'utf8');
console.log('✨ JAYT MAXIMUM TUYỆT ĐỈNH v9.0.0 INTEGRATION COMPLETED!');
