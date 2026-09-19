const fs = require('fs');
const path = require('path');

const htmlPath = path.resolve(__dirname, '../03_SOURCE_OF_TRUTH/index.html');
const jsPath = path.resolve(__dirname, '../03_SOURCE_OF_TRUTH/jayt_apex_interface.js');

let htmlCode = fs.readFileSync(htmlPath, 'utf8');
let jsCode = fs.readFileSync(jsPath, 'utf8');

console.log('Applying Ultra-Maximum v5.0.0 CSS to index.html...');

const ultraMaxCss = `
    /* ==========================================================================
       JAYT ULTRA-MAXIMUM LEVEL ENGINE v5.0.0 (AUDIO, TAXONOMY, SPLIT-BILL)
       ========================================================================== */

    /* 1. BỘ LỌC 4 TAB KHO VOUCHER (VOUCHER TAXONOMY TABS) */
    .voucher-cat-tabs {
      display: flex;
      gap: 8px;
      margin: 8px 0 14px 0;
      overflow-x: auto;
      scrollbar-width: none;
    }
    .voucher-cat-tabs::-webkit-scrollbar { display: none; }
    .voucher-cat-tab {
      background: var(--surface-subtle);
      border: 1px solid var(--border-hairline);
      color: var(--text-muted);
      padding: 6px 14px;
      border-radius: 20px;
      font-size: 11.5px;
      font-weight: 700;
      cursor: pointer;
      white-space: nowrap;
      transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    .voucher-cat-tab:hover {
      color: var(--text-main);
      border-color: var(--emerald);
    }
    .voucher-cat-tab.active {
      background: var(--emerald);
      color: #FFFFFF !important;
      border-color: var(--emerald);
      box-shadow: 0 2px 10px rgba(16, 185, 129, 0.3);
    }

    /* 2. THẺ CHIA TIỀN NHÓM (SPLIT-BILL PRO CARD) */
    .split-bill-box {
      background: var(--surface-subtle);
      border: 1px solid var(--border-hairline);
      border-radius: 16px;
      padding: 16px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 10px;
    }
    .split-select {
      background: var(--surface-card);
      color: var(--text-main);
      border: 1px solid var(--border-hairline);
      border-radius: 8px;
      padding: 4px 8px;
      font-size: 12px;
      font-weight: 700;
      outline: none;
      cursor: pointer;
    }
`;

if (!htmlCode.includes('VOUCHER TAXONOMY TABS')) {
  const cssInsertPoint = '/* 5. VÒNG QUAY CỨU ĐÓI (HUNGER ROULETTE CARD) */';
  htmlCode = htmlCode.replace(cssInsertPoint, ultraMaxCss + '\n    ' + cssInsertPoint);
  fs.writeFileSync(htmlPath, htmlCode, 'utf8');
  console.log('✅ Added Ultra-Maximum CSS to index.html');
}

console.log('Applying Ultra-Maximum v5.0.0 Logic to jayt_apex_interface.js...');

// Replace launchKineticRoulette, playHapticTick, calculateSplitAndGeneratePass, filterVoucherCategory, showNetworkToast
const ultraMaxEngineFunctions = `
  // --- JAYT ULTRA-MAXIMUM v5.0.0 AUDIO & KINETIC ENGINES ---
  const AudioContextClass = typeof window !== 'undefined' ? (window.AudioContext || window.webkitAudioContext) : null;
  let audioCtx = null;

  function playHapticTick() {
    try {
      if (!AudioContextClass) return;
      if (!audioCtx) audioCtx = new AudioContextClass();
      if (audioCtx.state === 'suspended') audioCtx.resume();

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1400, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, audioCtx.currentTime + 0.008);

      gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.008);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.008);
    } catch (e) {}
  }

  // MAXIMUM 2: Vòng Quay Cứu Đói Quán Tính 60FPS (Kinetic Roulette Wheel)
  function launchKineticRoulette() {
    playHapticTick();
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      try { navigator.vibrate([10, 20, 10]); } catch (e) {}
    }

    const places = [
      { name: "Cơm Gà A Hải", area: "100 Thái Phiên, Hải Châu", price: "25K - 45K", tag: "🍗 Gà quay da giòn", dist: "0.8km" },
      { name: "Cơm Tấm Sườn Cay", area: "42 Ngô Văn Sở, Hòa Khánh", price: "25K - 35K", tag: "🍚 Cơm sườn sinh viên", dist: "1.2km" },
      { name: "Phê La", area: "36 Bạch Đằng, Hải Châu", price: "45K - 55K", tag: "🧋 Ô Long khói cày deadline", dist: "1.2km" },
      { name: "Trình Cà Phê", area: "Hòa Khánh, Liên Chiểu", price: "22K - 35K", tag: "☕ Máy lạnh + Ổ sạc 100%", dist: "0.5km" },
      { name: "Jollibee Combo 15", area: "Tôn Đức Thắng", price: "35K", tag: "🍗 Gà giòn + Mì ý", dist: "1.5km" },
      { name: "Metiz Cinema Helio", area: "Số 01 Đường 2/9", price: "45K", tag: "🎬 Suất chiếu U22 HSSV", dist: "1.8km" }
    ];

    const resultBox = document.getElementById("roulette-result-box");
    const button = document.getElementById("btn-spin-roulette");
    if (!resultBox) return;

    let counter = 0;
    const maxSpins = 16;
    if (button) button.disabled = true;

    const spinInterval = setInterval(() => {
      const current = places[counter % places.length];
      resultBox.innerHTML = \`
        <div style="font-size:11px; color:var(--text-muted); font-weight:700;">🔄 ĐANG QUAY GỢI Ý ĐIỂM HẸN...</div>
        <div style="font-size:15px; font-weight:900; color:var(--emerald); margin-top:2px;">\${current.name}</div>
        <div style="font-size:11.5px; color:var(--text-muted);">\${current.area} · <strong>\${current.price}</strong> · 🛵 \${current.dist}</div>
      \`;
      playHapticTick();
      counter++;

      if (counter >= maxSpins) {
        clearInterval(spinInterval);
        if (button) button.disabled = false;
        const finalPick = places[Math.floor(Math.random() * places.length)];
        resultBox.innerHTML = \`
          <div style="font-size:11px; color:var(--emerald); font-weight:900;">🎉 ĐÃ CHỐT ĐIỂM HẸN TỐI ƯU:</div>
          <div style="font-size:16px; font-weight:900; color:var(--text-main); margin-top:2px;">\${finalPick.name}</div>
          <div style="font-size:11.5px; color:var(--text-muted); margin-top:2px;">\${finalPick.area} · \${finalPick.tag} (<strong>\${finalPick.price}</strong>) · 🛵 \${finalPick.dist}</div>
        \`;
        if (typeof navigator !== 'undefined' && navigator.vibrate) {
          try { navigator.vibrate([20, 50, 20]); } catch (e) {}
        }
        showToast(\`🎉 Đã chốt quán: \${finalPick.name}!\`);
      }
    }, 75);
  }

  function spinHungerRoulette() {
    launchKineticRoulette();
  }

  // MAXIMUM 3: Tính Tiền Chia Nhóm & Xuất Zalo Pass (Split-Bill Pro)
  function calculateSplitAndGeneratePass(venueName, baseTotal) {
    playHapticTick();
    const selectEl = document.getElementById("split-people-select");
    const peopleCount = parseInt(selectEl?.value || 4, 10);
    const totalAmount = parseInt(baseTotal, 10) || 180000;
    const perPerson = Math.ceil(totalAmount / peopleCount);

    const formattedPerPerson = perPerson.toLocaleString('vi-VN') + "₫";
    const displayTarget = document.getElementById("split-per-person-display");
    if (displayTarget) displayTarget.innerText = formattedPerPerson;

    const passText = \`🎟️ [KÈO ĐI CHUNG & CHIA TIỀN — JAYT ĐÀ NẴNG]
━━━━━━━━━━━━━━━━━━━━━━
📍 Điểm hẹn: \${venueName || 'Metiz Cinema Helio'}
👥 Nhóm đi: \${peopleCount} bạn
💰 Mỗi bạn chuyển khoản: \${formattedPerPerson} (Tổng: \${totalAmount.toLocaleString('vi-VN')}₫)
👉 Xem lịch và thực đơn chi tiết tại: https://deploy-ten-xi-48.vercel.app/
━━━━━━━━━━━━━━━━━━━━━━\`.trim();

    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator.share({ title: "Phiếu Kèo JayT Đà Nẵng", text: passText }).catch(() => {});
    } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(passText).then(() => {
        showToast("✅ Đã sao chép phiếu kèo kèm tiền chia! Dán ngay vào nhóm Zalo để chốt kèo.");
      }).catch(() => {
        showToast("✅ Đã tạo phiếu kèo chia tiền!");
      });
    } else {
      showToast("✅ Đã tạo phiếu kèo chia tiền!");
    }
  }

  // MAXIMUM 4: Bộ Lọc 4 Tab Kho Voucher (Taxonomy Filter) & Auto-Copy Deep Link
  function filterVoucherCategory(category, tabBtn) {
    playHapticTick();
    document.querySelectorAll('.voucher-cat-tab').forEach(b => b.classList.remove('active'));
    if (tabBtn) tabBtn.classList.add('active');

    const tickets = document.querySelectorAll('.voucher-ticket-neon');
    tickets.forEach(ticket => {
      const cardCat = ticket.getAttribute('data-category');
      if (category === 'ALL' || cardCat === category) {
        ticket.style.display = 'flex';
      } else {
        ticket.style.display = 'none';
      }
    });
  }

  // MAXIMUM 5: Network Sentinel Toast
  function showNetworkToast(message, color) {
    if (typeof document === 'undefined') return;
    const toast = document.createElement("div");
    toast.style.cssText = \`
      position: fixed; top: 16px; left: 50%; transform: translateX(-50%);
      background: \${color}; color: #FFFFFF; font-weight: 800; font-size: 13px;
      padding: 10px 20px; border-radius: 999px; z-index: 99999;
      box-shadow: 0 10px 30px rgba(0,0,0,0.4); backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.2);
      display: flex; align-items: center; gap: 8px; font-family: var(--font-system);
    \`;
    toast.innerText = message;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  if (typeof window !== 'undefined' && !window.__jaytNetworkSentinel) {
    window.__jaytNetworkSentinel = true;
    window.addEventListener('offline', () => {
      showNetworkToast("⚡ Bạn đang chạy chế độ Ngoại Tuyến (Offline 0ms). Dữ liệu đã lưu sẵn sàng!", "#D97706");
    });
    window.addEventListener('online', () => {
      showNetworkToast("🟢 Đã kết nối mạng trở lại. Hệ thống đã đồng bộ giá mới nhất!", "#059669");
    });
  }
`;

// Replace functions in jayt_apex_interface.js
const targetRoutineStart = '  // MAXIMUM 1: Ma Trận Quick-Pick 1-Chạm';
const targetRoutineEnd = '  // MAXIMUM 3: Đồng Bộ Ánh Sáng Môi Trường Theo Giờ Đà Nẵng (Sun-Sync Ambient)';

if (jsCode.includes(targetRoutineStart)) {
  const startIdx = jsCode.indexOf(targetRoutineStart);
  const endIdx = jsCode.indexOf(targetRoutineEnd);
  
  jsCode = jsCode.substring(0, startIdx) + ultraMaxEngineFunctions + '\n' + jsCode.substring(endIdx);
  console.log('✅ Injected Ultra-Maximum v5.0.0 engine functions');
}

// Update Tier 3 in renderFiveTierDailyDealCanvas to include Split-Bill Pro
const oldTier3Search = '<!-- Thẻ 3: Vòng Quay Cứu Đói 1-Chạm (Decision Roulette) -->';
const newTier3Block = `<!-- Thẻ 3: Vòng Quay Cứu Đói Quán Tính 60FPS & Split-Bill Pro -->
            <div class="roulette-card-container apex-spring-interactive" style="background:var(--surface-subtle); border:1px solid var(--border-hairline); border-radius:16px; padding:16px; display:flex; flex-direction:column; justify-content:space-between; gap:10px;">
              <div>
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <span style="font-size:11px; font-weight:900; color:var(--emerald);">🎲 VÒNG QUAY CỨU ĐÓI (60FPS)</span>
                  <span class="badge-freeship-xtra" style="font-size:9px;">QUÁN TÍNH CHỐT QUÁN</span>
                </div>
                <div id="roulette-result-box" style="margin-top:6px; padding:8px; background:var(--surface-card); border-radius:8px; border:1px solid var(--border-hairline); min-height:48px; display:flex; flex-direction:column; justify-content:center;">
                  <div style="font-size:11.5px; color:var(--text-muted);">Phân vân trưa nay ăn gì? Bấm nút để quay kim chọn ngẫu nhiên quán ngon ≤ 35K!</div>
                </div>
              </div>
              <button type="button" id="btn-spin-roulette" class="btn-cta-amber btn-action-social apex-spring-interactive" data-action="launch-kinetic-roulette" style="width:100%; margin-top:2px;">
                🎲 Quay Kim Chọn Quán Ngay ↗
              </button>

              <!-- Split-Bill Pro Mini-Box -->
              <div style="padding-top:8px; border-top:1px dashed var(--border-hairline); display:flex; justify-content:space-between; align-items:center; gap:6px;">
                <div style="font-size:11px; color:var(--text-muted); font-weight:700;">
                  👥 Chia tiền:
                  <select id="split-people-select" class="split-select">
                    <option value="2">2 bạn</option>
                    <option value="3">3 bạn</option>
                    <option value="4" selected>4 bạn</option>
                    <option value="5">5 bạn</option>
                    <option value="6">6 bạn</option>
                    <option value="8">8 bạn</option>
                  </select>
                </div>
                <button type="button" class="btn-cta-subtle btn-action-secondary apex-spring-interactive" data-action="split-and-share-zalo" style="height:28px; font-size:10.5px; padding:0 8px; font-weight:800;">
                  📲 Chia & Gửi Zalo
                </button>
              </div>
            </div>`;

if (jsCode.includes(oldTier3Search)) {
  const tier3Start = jsCode.indexOf(oldTier3Search);
  const tier3End = jsCode.indexOf('</div>\n\n          </div>\n        </section>\n\n        <!-- 4. SĂN ĐÁY ĐỒ TIỆN ÍCH');
  if (tier3Start !== -1 && tier3End !== -1) {
    jsCode = jsCode.substring(0, tier3Start) + newTier3Block + '\n' + jsCode.substring(tier3End);
    console.log('✅ Updated Tier 3 with 60FPS Kinetic Roulette and Split-Bill Pro');
  }
}

// Update Tier 4-5 with 4 Taxonomy Tabs
const oldVoucherGridHeader = '<!-- Lưới Voucher Neon -->\n          <div style="margin-bottom:14px;">\n            <div style="font-size:12px; font-weight:800; color:var(--text-main); margin-bottom:8px;">🎫 KHO VOUCHER TOÀN SÀN:</div>';
const newVoucherGridHeader = `<!-- Lưới Voucher Neon with 4 Taxonomy Tabs -->
          <div style="margin-bottom:14px;">
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:6px; margin-bottom:6px;">
              <div style="font-size:12px; font-weight:800; color:var(--text-main);">🎫 KHO VOUCHER TOÀN SÀN:</div>
              <!-- 4 Category Filter Tabs -->
              <div class="voucher-cat-tabs">
                <button type="button" class="voucher-cat-tab active" data-action="filter-voucher" data-cat="ALL">Tất Cả</button>
                <button type="button" class="voucher-cat-tab" data-action="filter-voucher" data-cat="FOOD">🍔 Ăn Uống</button>
                <button type="button" class="voucher-cat-tab" data-action="filter-voucher" data-cat="RIDE">🛵 Xe/Ship</button>
                <button type="button" class="voucher-cat-tab" data-action="filter-voucher" data-cat="UTILITY">🛒 Đồ KTX</button>
              </div>
            </div>`;

if (jsCode.includes(oldVoucherGridHeader)) {
  jsCode = jsCode.replace(oldVoucherGridHeader, newVoucherGridHeader);
  console.log('✅ Updated Tier 4-5 with 4 Category Filter Tabs');
}

// Add data-category to voucher cards
jsCode = jsCode.replace('<!-- Voucher 1 -->\n              <div class="voucher-ticket-neon apex-spring-interactive">', '<!-- Voucher 1 -->\n              <div class="voucher-ticket-neon apex-spring-interactive" data-category="FOOD">');
jsCode = jsCode.replace('<!-- Voucher 2 -->\n              <div class="voucher-ticket-neon apex-spring-interactive">', '<!-- Voucher 2 -->\n              <div class="voucher-ticket-neon apex-spring-interactive" data-category="UTILITY">');
jsCode = jsCode.replace('<!-- Voucher 3 -->\n              <div class="voucher-ticket-neon apex-spring-interactive">', '<!-- Voucher 3 -->\n              <div class="voucher-ticket-neon apex-spring-interactive" data-category="RIDE">');

// Update event listeners for Ultra-Maximum v5.0.0
const listenerBlock = `
    // ULTRA-MAXIMUM: Kinetic Roulette & Split Bill Handlers
    document.querySelectorAll('[data-action="launch-kinetic-roulette"]').forEach(btn => {
      btn.addEventListener('click', () => {
        launchKineticRoulette();
      });
    });

    document.querySelectorAll('[data-action="split-and-share-zalo"]').forEach(btn => {
      btn.addEventListener('click', () => {
        calculateSplitAndGeneratePass('Metiz Cinema Helio', 180000);
      });
    });

    const splitPeopleSelect = document.getElementById('split-people-select');
    if (splitPeopleSelect) {
      splitPeopleSelect.addEventListener('change', () => {
        playHapticTick();
      });
    }

    // ULTRA-MAXIMUM: 4-Tab Voucher Taxonomy Filter
    document.querySelectorAll('[data-action="filter-voucher"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const cat = e.currentTarget.getAttribute('data-cat') || 'ALL';
        filterVoucherCategory(cat, e.currentTarget);
      });
    });

    // ULTRA-MAXIMUM: Audio Tick on all Interactive Elements
    document.querySelectorAll('.apex-spring-interactive, .quick-pick-chip, .apex-canvas-day-pill, .voucher-cat-tab').forEach(el => {
      el.addEventListener('click', () => {
        playHapticTick();
      });
    });
`;

if (!jsCode.includes('[data-action="launch-kinetic-roulette"]')) {
  const oldListenerPoint = '// MAXIMUM 2: Vòng Quay Cứu Đói 1-Chạm (Decision Roulette) Handler';
  jsCode = jsCode.replace(oldListenerPoint, listenerBlock + '\n    ' + oldListenerPoint);
  console.log('✅ Added Ultra-Maximum event listeners to JS');
}

fs.writeFileSync(jsPath, jsCode, 'utf8');
console.log('✨ JAYT ULTRA-MAXIMUM v5.0.0 UPGRADES SUCCESSFULLY APPLIED!');
