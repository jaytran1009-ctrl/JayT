const fs = require('fs');
const path = require('path');

const jsPath = path.resolve(__dirname, '../03_SOURCE_OF_TRUTH/jayt_apex_interface.js');
const htmlPath = path.resolve(__dirname, '../03_SOURCE_OF_TRUTH/index.html');

let js = fs.readFileSync(jsPath, 'utf8');
let html = fs.readFileSync(htmlPath, 'utf8');

console.log('--- 1. ADDING REALTIME CSS TO index.html ---');

const realtimeCss = `
/* ==========================================================================
   JAYT REALTIME HEARTBEAT & RADAR ENGINE v10.0.0
   ========================================================================== */
.live-realtime-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(16, 185, 129, 0.12);
  border: 1px solid rgba(16, 185, 129, 0.35);
  border-radius: 999px;
  padding: 4px 10px;
  font-size: 11px;
  font-weight: 800;
  color: var(--emerald);
  letter-spacing: 0.3px;
}

.pulse-radar-dot {
  width: 7px;
  height: 7px;
  background: var(--emerald);
  border-radius: 50%;
  position: relative;
  display: inline-block;
}
.pulse-radar-dot::after {
  content: '';
  position: absolute;
  top: -2px; left: -2px;
  right: -2px; bottom: -2px;
  border-radius: 50%;
  border: 1.5px solid var(--emerald);
  animation: radarPulse 1.6s cubic-bezier(0.24, 0, 0.38, 1) infinite;
}

@keyframes radarPulse {
  0% { transform: scale(0.9); opacity: 1; }
  70% { transform: scale(2.4); opacity: 0; }
  100% { transform: scale(2.6); opacity: 0; }
}

.dynamic-deal-countdown {
  font-family: 'JetBrains Mono', 'SF Mono', Consolas, monospace;
  font-weight: 800;
  color: #EF4444;
}

.traffic-peak-alert-banner {
  background: linear-gradient(90deg, rgba(234, 88, 12, 0.15), rgba(245, 158, 11, 0.15));
  border: 1px solid rgba(234, 88, 12, 0.35);
  border-radius: 12px;
  padding: 10px 14px;
  margin-bottom: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;
  font-size: 12px;
  font-weight: 700;
  color: var(--text-main);
}
`;

if (!html.includes('JAYT REALTIME HEARTBEAT & RADAR ENGINE')) {
  const anchor = '/* ==========================================================================';
  html = html.replace(anchor, realtimeCss + '\n' + anchor);
  fs.writeFileSync(htmlPath, html, 'utf8');
  console.log('✅ Injected Realtime CSS to index.html');
}

console.log('\n--- 2. UPGRADING REALTIME HEARTBEAT ENGINE IN JS ---');

const realtimeEngineJs = `
  // --- JAYT REALTIME RADAR & HEARTBEAT ENGINE v10.0.0 (TICKING EVERY 1000MS) ---
  function startJaytRealtimeHeartbeatEngine() {
    if (typeof window === 'undefined') return;

    function updateRealtimeState() {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const mins = String(now.getMinutes()).padStart(2, '0');
      const secs = String(now.getSeconds()).padStart(2, '0');
      const timeStr = \`\${hours}:\${mins}:\${secs}\`;

      // 1. Update Live Clock Display
      const clockEl = document.getElementById('realtime-clock-display');
      if (clockEl) clockEl.innerText = timeStr;

      const flashClockEl = document.getElementById('flash-deal-clock');
      if (flashClockEl) {
        const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
        const diffSec = Math.max(0, Math.floor((endOfDay - now) / 1000));
        const remH = String(Math.floor(diffSec / 3600)).padStart(2, '0');
        const remM = String(Math.floor((diffSec % 3600) / 60)).padStart(2, '0');
        const remS = String(diffSec % 60).padStart(2, '0');
        flashClockEl.innerText = \`\${remH}:\${remM}:\${remS}\`;
      }

      // 2. Determine Dynamic Time-of-Day Moment
      const currentHour = now.getHours();
      const currentMin = now.getMinutes();
      const slotEl = document.getElementById('realtime-slot-display');
      const peakBanner = document.getElementById('realtime-peak-traffic-banner');

      let currentSlotName = 'Ăn Sáng (07:00 - 09:00)';
      let isPeak = false;

      if (currentHour >= 7 && currentHour < 11) {
        currentSlotName = 'Bữa Sáng & Cà Phê (07:00 - 11:00)';
      } else if (currentHour >= 11 && currentHour < 14) {
        currentSlotName = 'Bữa Trưa & Cứu Đói (11:30 - 13:30)';
      } else if (currentHour >= 14 && currentHour < 16) {
        currentSlotName = 'Trà Chiều & Deadline (14:00 - 16:00)';
      } else if (currentHour >= 16 && (currentHour < 18 || (currentHour === 18 && currentMin <= 30))) {
        currentSlotName = 'Giờ Tan Tầm & Di Chuyển (16:30 - 18:30)';
        isPeak = true;
      } else if (currentHour >= 18 && currentHour < 22) {
        currentSlotName = 'Kèo Tối & Xem Phim (19:00 - 22:00)';
      } else {
        currentSlotName = 'Cú Đêm & Ăn Khuya (22:00 - 03:00)';
      }

      if (slotEl) slotEl.innerText = currentSlotName;
      if (peakBanner) {
        if (isPeak) {
          peakBanner.style.display = 'flex';
        } else {
          peakBanner.style.display = 'none';
        }
      }

      // 3. Update Individual Deal Countdowns
      document.querySelectorAll('[data-countdown-target]').forEach(el => {
        const targetTimeStr = el.getAttribute('data-countdown-target');
        if (targetTimeStr) {
          const targetDate = new Date(targetTimeStr);
          const diff = Math.max(0, Math.floor((targetDate - now) / 1000));
          const h = String(Math.floor(diff / 3600)).padStart(2, '0');
          const m = String(Math.floor((diff % 3600) / 60)).padStart(2, '0');
          const s = String(diff % 60).padStart(2, '0');
          el.innerText = \`\${h}h \${m}m \${s}s\`;
        }
      });
    }

    updateRealtimeState();
    if (window.__jaytHeartbeatInterval) clearInterval(window.__jaytHeartbeatInterval);
    window.__jaytHeartbeatInterval = setInterval(updateRealtimeState, 1000);
  }
`;

// Replace startFlashCountdownTimer with the full heartbeat engine
const timerRegex = /function startFlashCountdownTimer\(\)[\s\S]*?setInterval\(updateClock, 1000\);\s*}\s*}/;
if (timerRegex.test(js)) {
  js = js.replace(timerRegex, realtimeEngineJs.trim());
  console.log('✅ Replaced countdown timer with startJaytRealtimeHeartbeatEngine');
}

// In mount(), replace startFlashCountdownTimer() with startJaytRealtimeHeartbeatEngine()
js = js.replace(/startFlashCountdownTimer\(\);/g, 'startJaytRealtimeHeartbeatEngine();');

// In navbar / top header, add the live pulsing realtime pill
const oldNavbarPill = `<div class="nav-brand-badge">Bản Đà Nẵng · Độc Quyền</div>`;
const newNavbarPill = `<div class="live-realtime-badge"><span class="pulse-radar-dot"></span> <span>LIVE SYNC:</span> <strong id="realtime-clock-display">--:--:--</strong> · <span id="realtime-slot-display">Giờ Xế Chiều 16:30</span></div>`;

if (js.includes(oldNavbarPill)) {
  js = js.replace(oldNavbarPill, newNavbarPill);
  console.log('✅ Injected Live Realtime Heartbeat Pill to Navbar');
}

// Add Peak Traffic Alert Banner to Tier 2 if not present
const peakBannerHtml = `
          <!-- REALTIME PEAK TRAFFIC RADAR BANNER (16:30 - 18:30) -->
          <div id="realtime-peak-traffic-banner" class="traffic-peak-alert-banner" style="display:flex;">
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="font-size:16px;">⚡</span>
              <span><strong>RADAR CAO ĐIỂM CHIỀU (16:30 - 18:30):</strong> Cước Grab/Be đang tăng ~25% do tắc đường cầu Rồng/cầu Sông Hàn. Đã tự động kích hoạt mã <strong>XANHSM25</strong> & <strong>BEBE43</strong>.</span>
            </div>
            <a href="#hub-tab-ktx" onclick="switchHubSection('KTX_STACK', this)" class="btn-cta-emerald" style="height:28px; font-size:11px; padding:0 10px; text-decoration:none;">Lấy Mã Giảm ↗</a>
          </div>
`;

const tier2Anchor = '<div class="arbitrage-calculator-panel"';
if (js.includes(tier2Anchor) && !js.includes('realtime-peak-traffic-banner')) {
  js = js.replace(tier2Anchor, peakBannerHtml + '\n          ' + tier2Anchor);
  console.log('✅ Injected Peak Traffic Realtime Banner to Tier 2');
}

fs.writeFileSync(jsPath, js, 'utf8');
console.log('✨ JAYT REALTIME ENGINE v10.0.0 SUCCESSFULLY INTEGRATED!');
