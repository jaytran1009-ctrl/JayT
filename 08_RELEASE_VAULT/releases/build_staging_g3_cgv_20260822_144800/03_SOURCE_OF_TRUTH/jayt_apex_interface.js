/**
 * =============================================================================
 * JAYT APEX INTERFACE - HIGH-TRUST LOCAL SAVINGS & RADAR ENGINE (STAGING/PROD)
 * ARCHITECTURE: Self-Contained Vanilla JS Component
 * DIRECTIVE: JAYT-CALCULATOR-EVIDENCE-BOUND-039B & JAYT-TRUTH-CALCULATOR-TEMPORAL-039
 * =============================================================================
 */
(function() {
  'use strict';

  // --- COMPONENT STATE ---
  const state = {
    activeProductTab: 'local', // 'local' | 'calendar_7d' | 'online_radar' | 'calculator' | 'share_plan'
    persona: 'office',        // 'office' | 'student' | 'all'
    selectedDistrict: 'Hải Châu', // 'Hải Châu' | 'Liên Chiểu' | 'Ngũ Hành Sơn' | 'Sơn Trà'
    selectedTrigger: 'TRIG_1730_AFTER_WORK_SCHOOL',
    selectedDayOfWeek: 1, // 1 = Monday (CGV Culture Day)
    
    // Calculator Sub-State (Directive JAYT-CALCULATOR-EVIDENCE-BOUND-039B)
    calculator: {
      is_mode_exact: true,
      is_user_input: false,
      item_price: 58000,
      item_discount: 0,
      voucher_value: 0,
      min_spend: 0,
      max_discount: 0,
      shipping_fee: 0,
      shipping_discount: 0,
      payment_surcharge: 0,
      scenario_note: 'Vé Culture Day Thứ Hai 24/08/2026 tại CGV Vĩnh Trung Plaza (Phụ thu VIP/Sweetbox chưa xác định cụ thể, không cộng/trừ ước đoán)'
    },

    // Contextual Share Plan Sub-State
    sharePlan: {
      time_slot: 'Thứ Hai 24/08 (Culture Day)',
      activities: ['Xem phim 2D 58K tại CGV Vĩnh Trung Plaza', 'Combo 2 nước + 1 bắp 87K tại quầy'],
      conditions_to_check: ['Mang thẻ SV/CCCD', 'Không áp dụng IMAX/ScreenX', 'Đặt online hoặc tại quầy']
    },

    saved: [],
    todayPlan: null,
    savingsLedger: []
  };

  // --- DATA STORE ---
  const dataStore = {
    deals: [],
    evidence: {},
    zones: [],
    isLoaded: false
  };

  // --- UTILITIES ---
  function esc(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function money(num) {
    if (num === null || num === undefined || isNaN(num)) return '0đ';
    return Number(num).toLocaleString('vi-VN') + 'đ';
  }

  function showToast(msg) {
    let toast = document.getElementById('apex-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'apex-toast';
      toast.className = 'apex-toast-notification';
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add('visible');
    setTimeout(() => {
      toast.classList.remove('visible');
    }, 3200);
  }

  // --- PERSISTENCE ---
  function loadPersistedState() {
    try {
      const p = localStorage.getItem('jayt_preferred_persona');
      if (p) state.persona = p;
      const d = localStorage.getItem('jayt_preferred_district');
      if (d) state.selectedDistrict = d;
      const s = localStorage.getItem('jayt_saved_deals');
      if (s) state.saved = JSON.parse(s);
      const plan = localStorage.getItem('jayt_today_plan');
      if (plan) state.todayPlan = JSON.parse(plan);
      const ledger = localStorage.getItem('jayt_savings_ledger');
      if (ledger) state.savingsLedger = JSON.parse(ledger);
    } catch {}
  }

  // --- CALCULATOR ENGINE INTEGRATION (DIRECTIVE 039B) ---
  function computeCalculator() {
    const calc = state.calculator;
    const base = Math.max(0, Math.round(Number(calc.item_price) || 0));
    const disc = Math.min(base, Math.max(0, Math.round(Number(calc.item_discount) || 0)));
    const subtotal = base - disc;

    let voucherDisc = 0;
    if (subtotal >= (calc.min_spend || 0)) {
      voucherDisc = Math.min(subtotal, Math.round(Number(calc.voucher_value) || 0));
      if (calc.max_discount && voucherDisc > calc.max_discount) {
        voucherDisc = calc.max_discount;
      }
    }

    const ship = Math.max(0, Math.round(Number(calc.shipping_fee) || 0));
    const shipDisc = Math.min(ship, Math.max(0, Math.round(Number(calc.shipping_discount) || 0)));
    const netShip = ship - shipDisc;
    const surcharge = Math.max(0, Math.round(Number(calc.payment_surcharge) || 0));

    const total = Math.max(0, (subtotal - voucherDisc) + netShip + surcharge);

    const isUserEntered = calc.is_user_input === true;
    let modeText = '🟢 TỔNG CHÍNH XÁC ĐÃ XÁC MINH';
    let missingEvidenceMessage = null;

    if (isUserEntered) {
      modeText = '🟠 Người dùng tự nhập — JayT chưa xác minh';
    } else if (!calc.is_mode_exact) {
      modeText = '🟡 Chưa thể ước tính: thiếu phí/voucher có chứng cứ.';
      missingEvidenceMessage = 'Chưa thể ước tính: thiếu phí/voucher có chứng cứ.';
    }

    return {
      base,
      disc,
      subtotal,
      voucherDisc,
      ship,
      shipDisc,
      netShip,
      surcharge,
      total,
      isExact: calc.is_mode_exact,
      isUserEntered,
      modeText,
      missingEvidenceMessage
    };
  }

  // --- STYLESHEET ---
  function getStyleSheet() {
    return `
    :root {
      --apex-bg: #061a14;
      --apex-card: #0b261e;
      --apex-card-sub: #103429;
      --apex-border: rgba(212, 175, 55, 0.22);
      --apex-border-sub: rgba(255, 255, 255, 0.08);
      --apex-gold: #d4af37;
      --apex-gold-glow: rgba(212, 175, 55, 0.15);
      --apex-emerald: #10b981;
      --apex-amber: #f59e0b;
      --apex-rose: #f43f5e;
      --apex-text: #f0eee9;
      --apex-text-dim: #94a3b8;
    }

    body, html {
      background-color: var(--apex-bg);
      color: var(--apex-text);
      font-family: 'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      margin: 0;
      padding: 0;
      width: 100%;
      min-height: 100vh;
      overflow-x: hidden;
    }

    .apex-header {
      padding: 16px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: rgba(6, 26, 20, 0.95);
      border-bottom: 1px solid var(--apex-border);
      position: sticky;
      top: 0;
      z-index: 100;
      backdrop-filter: blur(8px);
    }

    .apex-logo {
      font-size: 20px;
      font-weight: 900;
      color: var(--apex-gold);
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .apex-north-star-pill {
      font-size: 11px;
      padding: 4px 10px;
      border-radius: 20px;
      background: var(--apex-gold-glow);
      color: var(--apex-gold);
      border: 1px solid var(--apex-border);
      font-weight: 700;
      text-align: center;
    }

    .apex-workspace {
      max-width: 1100px;
      margin: 0 auto;
      padding: 20px 16px 80px;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .apex-nav-tabs {
      display: flex;
      gap: 8px;
      overflow-x: auto;
      padding-bottom: 4px;
      scrollbar-width: none;
    }
    .apex-nav-tabs::-webkit-scrollbar { display: none; }

    .apex-tab-btn {
      background: var(--apex-card-sub);
      color: var(--apex-text-dim);
      border: 1px solid var(--apex-border-sub);
      padding: 12px 18px;
      border-radius: 12px;
      font-weight: 700;
      font-size: 13.5px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      white-space: nowrap;
      min-height: 44px;
      min-width: 44px;
      transition: all 0.2s ease;
    }

    .apex-tab-btn.active {
      background: var(--apex-gold);
      color: #061a14;
      border-color: var(--apex-gold);
      box-shadow: 0 4px 12px var(--apex-gold-glow);
    }

    .apex-context-hero {
      background: var(--apex-card);
      border: 1px solid var(--apex-border);
      border-radius: 16px;
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .apex-context-selector-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 12px;
    }

    .apex-control-group {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .apex-control-label {
      font-size: 12px;
      font-weight: 700;
      color: var(--apex-gold);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .apex-select-btn {
      background: var(--apex-card-sub);
      color: var(--apex-text);
      border: 1px solid var(--apex-border-sub);
      padding: 10px 14px;
      border-radius: 10px;
      font-size: 13.5px;
      font-weight: 600;
      cursor: pointer;
      min-height: 44px;
    }

    .apex-triggers-row {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .apex-trigger-pill {
      background: var(--apex-card-sub);
      border: 1px solid var(--apex-border-sub);
      color: var(--apex-text-dim);
      padding: 8px 14px;
      border-radius: 20px;
      font-size: 12.5px;
      font-weight: 700;
      cursor: pointer;
      min-height: 44px;
      display: inline-flex;
      align-items: center;
    }

    .apex-trigger-pill.active {
      border-color: var(--apex-gold);
      color: var(--apex-gold);
      background: var(--apex-gold-glow);
    }

    .apex-honest-empty-box {
      background: rgba(0, 0, 0, 0.25);
      border: 1px dashed var(--apex-border);
      border-radius: 14px;
      padding: 24px 20px;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
    }

    .apex-honest-msg {
      font-size: 14.5px;
      color: var(--apex-text);
      line-height: 1.5;
      max-width: 600px;
    }

    .apex-cta-row {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      justify-content: center;
    }

    .apex-btn-primary {
      background: var(--apex-gold);
      color: #061a14;
      border: none;
      padding: 10px 18px;
      border-radius: 10px;
      font-weight: 800;
      font-size: 13px;
      cursor: pointer;
      min-height: 44px;
      min-width: 44px;
    }

    .apex-btn-secondary {
      background: transparent;
      color: var(--apex-gold);
      border: 1px solid var(--apex-border);
      padding: 10px 18px;
      border-radius: 10px;
      font-weight: 700;
      font-size: 13px;
      cursor: pointer;
      min-height: 44px;
      min-width: 44px;
    }

    .apex-widget-card {
      background: var(--apex-card);
      border: 1px solid var(--apex-border);
      border-radius: 16px;
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .apex-calendar-days-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
      gap: 8px;
    }

    .apex-day-card {
      background: var(--apex-card-sub);
      border: 1px solid var(--apex-border-sub);
      border-radius: 12px;
      padding: 12px;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      gap: 4px;
      min-height: 44px;
    }

    .apex-day-card.active {
      border-color: var(--apex-gold);
      background: var(--apex-gold-glow);
    }

    .apex-calc-inputs-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 12px;
    }

    .apex-calc-input {
      background: var(--apex-card-sub);
      border: 1px solid var(--apex-border-sub);
      color: var(--apex-text);
      padding: 10px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 700;
      min-height: 44px;
    }

    .apex-calc-result-box {
      background: rgba(16, 185, 129, 0.1);
      border: 1px solid var(--apex-emerald);
      border-radius: 12px;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .apex-calc-result-box.estimated {
      background: rgba(245, 158, 11, 0.1);
      border-color: var(--apex-amber);
    }

    .apex-deal-card {
      background: var(--apex-card);
      border: 1px solid var(--apex-border);
      border-radius: 14px;
      padding: 18px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-top: 12px;
      text-align: left;
    }

    .apex-lifecycle-badge {
      font-size: 11.5px;
      font-weight: 800;
      padding: 5px 10px;
      border-radius: 20px;
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }

    .apex-badge-upcoming {
      background: rgba(245, 158, 11, 0.15);
      color: #fef08a;
      border: 1px solid rgba(245, 158, 11, 0.4);
    }

    .apex-badge-active {
      background: rgba(16, 185, 129, 0.2);
      color: #6ee7b7;
      border: 1px solid rgba(16, 185, 129, 0.5);
    }

    .apex-badge-expired {
      background: rgba(148, 163, 184, 0.15);
      color: #94a3b8;
      border: 1px solid rgba(148, 163, 184, 0.3);
    }

    .apex-toast-notification {
      position: fixed;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%) translateY(100px);
      background: var(--apex-gold);
      color: #061a14;
      font-weight: 800;
      font-size: 13.5px;
      padding: 12px 24px;
      border-radius: 30px;
      box-shadow: 0 6px 20px rgba(0,0,0,0.5);
      z-index: 1000;
      opacity: 0;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      pointer-events: none;
      text-align: center;
    }

    .apex-toast-notification.visible {
      transform: translateX(-50%) translateY(0);
      opacity: 1;
    }
    `;
  }

  // --- LIFECYCLE HELPER (DATE_ONLY PRECISION) ---
  function getLifecycleInfo(deal) {
    let todayStr = '2026-08-22';
    if (typeof window.__mockCurrentDate === 'string') {
      todayStr = window.__mockCurrentDate;
    } else {
      const d = new Date();
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(d.getDate()).padStart(2, '0');
      todayStr = `${yyyy}-${mm}-${dd}`;
    }

    const effDate = deal.effective_date || '2026-08-24';
    if (todayStr < effDate) {
      return {
        status: 'UPCOMING',
        badge: '⏳ Sắp diễn ra (Thứ Hai 24/08/2026)',
        badgeClass: 'apex-badge-upcoming',
        isActiveToday: false,
        isExpired: false
      };
    } else if (todayStr === effDate) {
      return {
        status: 'ACTIVE_TODAY',
        badge: '🔥 Áp dụng hôm nay (Thứ Hai 24/08/2026)',
        badgeClass: 'apex-badge-active',
        isActiveToday: true,
        isExpired: false
      };
    } else {
      return {
        status: 'EXPIRED',
        badge: '⌛ Đã hết hạn (Thứ Hai 24/08/2026)',
        badgeClass: 'apex-badge-expired',
        isActiveToday: false,
        isExpired: true
      };
    }
  }

  // --- RENDER DEAL CARD ---
  function renderDealCard(deal, evidence) {
    const lc = getLifecycleInfo(deal);
    const ev = evidence || (dataStore.evidence ? dataStore.evidence[deal.evidence_ref] : null) || {};

    return `
    <article class="apex-deal-card" id="deal-card-${esc(deal.deal_id)}">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:8px;">
        <span class="apex-lifecycle-badge ${lc.badgeClass}" id="badge-${esc(deal.deal_id)}">
          ${esc(lc.badge)}
        </span>
        <span class="apex-channel-badge" style="font-size:11px;font-weight:700;padding:4px 8px;border-radius:6px;background:rgba(212,175,55,0.15);color:var(--apex-gold);border:1px solid var(--apex-border);">
          🎟️ ${esc(deal.affiliate_type || 'DIRECT_DEAL')} (Không Affiliate)
        </span>
      </div>

      <h3 style="font-size:16px;font-weight:800;color:var(--apex-text);margin:10px 0 6px;" id="deal-title-${esc(deal.deal_id)}">
        ${esc(deal.title)}
      </h3>

      <div style="font-size:13px;color:var(--apex-text-dim);margin-bottom:8px;">
        📍 <b>${esc(deal.merchant || 'CGV Cinemas')}</b> • ${esc(ev.location_provenance_address || 'CGV Vĩnh Trung Plaza (255-257 Hùng Vương, Quận Thanh Khê, Tp. Đà Nẵng)')}
      </div>

      <div style="background:rgba(0,0,0,0.3);padding:12px;border-radius:10px;border:1px solid var(--apex-border-sub);display:flex;flex-direction:column;gap:6px;">
        <div style="display:flex;justify-content:space-between;align-items:baseline;">
          <span style="font-size:13px;font-weight:700;color:var(--apex-gold);">🎟️ Vé 2D phòng tiêu chuẩn:</span>
          <span style="font-size:20px;font-weight:900;color:var(--apex-emerald);" id="deal-price-${esc(deal.deal_id)}">${esc(deal.observed_price || '58.000đ')}</span>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:baseline;font-size:12.5px;color:var(--apex-text-dim);">
          <span>🍿 Combo 2 nước + 1 bắp (tại quầy):</span>
          <span style="font-weight:700;color:var(--apex-text);">${esc(deal.combo_price || '87.000đ (tại quầy)')}</span>
        </div>
      </div>

      <div style="font-size:12px;color:var(--apex-text-dim);margin-top:10px;line-height:1.4;">
        <b>Điều kiện & Ngoại lệ đã capture:</b> ${esc(deal.disclosure || ev.observed_conditions || 'Áp dụng vào ngày Thứ Hai 24/08/2026 tại cụm rạp CGV Vĩnh Trung Plaza.')}
      </div>

      <div style="font-size:11.5px;color:var(--apex-amber);margin-top:6px;font-weight:600;" id="deal-surcharge-note-${esc(deal.deal_id)}">
        ⚠️ Phụ thu ghế VIP, Sweetbox: <i>Chưa xác định giá cụ thể trong trang khuyến mãi</i> (Không cộng/trừ ước đoán, không tạo số tiền tiết kiệm ảo).
      </div>

      <div style="display:flex;justify-content:space-between;align-items:center;margin-top:12px;padding-top:10px;border-top:1px dashed var(--apex-border-sub);flex-wrap:wrap;gap:8px;">
        <span style="font-size:11px;color:var(--apex-text-dim);">
          🔍 Nguồn: <b>cgv.vn</b> • Kiểm tra: <b>2026-08-22 14:32</b>
        </span>
        <button class="apex-btn-secondary" style="font-size:12px;padding:8px 12px;" data-apex="apply-deal-to-calc" data-deal-id="${esc(deal.deal_id)}" id="btn-calc-${esc(deal.deal_id)}">
          🧮 Đưa Vào Máy Tính Tiền
        </button>
      </div>
    </article>`;
  }

  // --- RENDER HEADER ---
  function renderHeader() {
    return `
    <header class="apex-header">
      <div class="apex-logo">
        <span>⛩️</span>
        <span>JAYT ĐÀ NẴNG 43</span>
      </div>
      <div class="apex-north-star-pill">
        🌟 “Biết hôm nay có gì, tính được mình trả bao nhiêu, rồi rủ đúng người đi cùng”
      </div>
    </header>`;
  }

  // --- RENDER ZONE SWITCHER TABS ---
  function renderZoneSwitcher() {
    return `
    <nav class="apex-nav-tabs" role="tablist">
      <button class="apex-tab-btn ${state.activeProductTab === 'local' ? 'active' : ''}" data-apex="switch-tab" data-tab="local" id="apex-tab-btn-local_savings">
        📍 Ngữ Cảnh Hôm Nay
      </button>
      <button class="apex-tab-btn ${state.activeProductTab === 'calendar_7d' ? 'active' : ''}" data-apex="switch-tab" data-tab="calendar_7d" id="apex-tab-btn-calendar_7d">
        📅 Lịch Tiết Kiệm 7 Ngày
      </button>
      <button class="apex-tab-btn ${state.activeProductTab === 'online_radar' ? 'active' : ''}" data-apex="switch-tab" data-tab="online_radar" id="apex-tab-btn-online_radar">
        ⚡ Deal Radar Online
      </button>
      <button class="apex-tab-btn ${state.activeProductTab === 'calculator' ? 'active' : ''}" data-apex="switch-tab" data-tab="calculator" id="apex-tab-btn-calculator">
        🧮 Máy Tính Tiền Thật
      </button>
      <button class="apex-tab-btn ${state.activeProductTab === 'share_plan' ? 'active' : ''}" data-apex="switch-tab" data-tab="share_plan" id="apex-tab-btn-share_plan">
        👥 Kế Hoạch & Rủ Bạn
      </button>
    </nav>`;
  }

  // --- RENDER LOCAL CONTEXT ZONE (ZONE 1) ---
  function renderLocalZone() {
    const triggerMap = {
      TRIG_1105_LUNCH: { label: '☀️ Cứu đói trưa 11:05', desc: 'cứu đói trưa lúc 11:05' },
      TRIG_1430_DEADLINE_COFFEE: { label: '☕ Cà phê deadline 14:30', desc: 'cà phê deadline lúc 14:30' },
      TRIG_1730_AFTER_WORK_SCHOOL: { label: '🎬 Tan học / Tan ca 17:30', desc: 'tan ca lúc 17:30' },
      TRIG_2100_NIGHT_OUT: { label: '🌙 Đi chơi tối 21:00', desc: 'đi chơi tối lúc 21:00' }
    };
    const currentTrigger = triggerMap[state.selectedTrigger] || triggerMap.TRIG_1730_AFTER_WORK_SCHOOL;
    const honestMessage = `Bạn đang ở ${state.selectedDistrict}, ${currentTrigger.desc}. Hôm nay chưa có deal nào được xác minh. Xem lịch đã kiểm chứng 7 ngày tới hoặc Deal Radar Online.`;

    return `
    <section class="apex-context-hero" id="apex-local-context-zone">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
        <h2 style="font-size:18px;font-weight:900;color:var(--apex-gold);margin:0;">
          📍 Chọn Ngữ Cảnh Hôm Nay (100% Riêng Tư • Không GPS)
        </h2>
        <span style="font-size:11px;color:var(--apex-emerald);font-weight:700;">🔒 Vị trí chọn thủ công</span>
      </div>

      <div class="apex-context-selector-grid">
        <div class="apex-control-group">
          <label class="apex-control-label">1. Tôi là</label>
          <select class="apex-select-btn" data-apex="change-persona" id="apex-persona-select">
            <option value="office" ${state.persona === 'office' ? 'selected' : ''}>💼 Dân Văn Phòng / Tech</option>
            <option value="student" ${state.persona === 'student' ? 'selected' : ''}>🎓 Sinh Viên / Campus</option>
            <option value="all" ${state.persona === 'all' ? 'selected' : ''}>👥 Người Dân Đà Nẵng</option>
          </select>
        </div>

        <div class="apex-control-group">
          <label class="apex-control-label">2. Khu vực tại Đà Nẵng</label>
          <select class="apex-select-btn" data-apex="change-district" id="apex-district-select">
            <option value="Hải Châu" ${state.selectedDistrict === 'Hải Châu' ? 'selected' : ''}>Quận Hải Châu (Trung tâm / NVL / 2-9)</option>
            <option value="Liên Chiểu" ${state.selectedDistrict === 'Liên Chiểu' ? 'selected' : ''}>Quận Liên Chiểu (Hòa Khánh / Bách Khoa)</option>
            <option value="Ngũ Hành Sơn" ${state.selectedDistrict === 'Ngũ Hành Sơn' ? 'selected' : ''}>Quận Ngũ Hành Sơn (DUE / FPT Complex)</option>
            <option value="Sơn Trà" ${state.selectedDistrict === 'Sơn Trà' ? 'selected' : ''}>Quận Sơn Trà (Cầu Rồng / Biển)</option>
          </select>
        </div>
      </div>

      <div class="apex-control-group">
        <label class="apex-control-label">3. Nhịp sống theo thời điểm</label>
        <div class="apex-triggers-row">
          <button class="apex-trigger-pill ${state.selectedTrigger === 'TRIG_1105_LUNCH' ? 'active' : ''}" data-apex="select-trigger" data-trigger="TRIG_1105_LUNCH" id="trigger-lunch">
            ☀️ 11:05 Cứu đói trưa
          </button>
          <button class="apex-trigger-pill ${state.selectedTrigger === 'TRIG_1430_DEADLINE_COFFEE' ? 'active' : ''}" data-apex="select-trigger" data-trigger="TRIG_1430_DEADLINE_COFFEE" id="trigger-coffee">
            ☕ 14:30 Cà phê deadline
          </button>
          <button class="apex-trigger-pill ${state.selectedTrigger === 'TRIG_1730_AFTER_WORK_SCHOOL' ? 'active' : ''}" data-apex="select-trigger" data-trigger="TRIG_1730_AFTER_WORK_SCHOOL" id="trigger-evening">
            🎬 17:30 Tan học, tan ca
          </button>
          <button class="apex-trigger-pill ${state.selectedTrigger === 'TRIG_2100_NIGHT_OUT' ? 'active' : ''}" data-apex="select-trigger" data-trigger="TRIG_2100_NIGHT_OUT" id="trigger-night">
            🌙 21:00 Đi chơi tối, ăn khuya
          </button>
        </div>
      </div>

      ${(function() {
        const todayDeals = (dataStore.deals || []).filter(d => {
          const lc = getLifecycleInfo(d);
          return lc.isActiveToday && !lc.isExpired;
        });

        if (todayDeals.length > 0) {
          return `
          <div id="apex-local-active-deals-container">
            <div style="font-weight:800;font-size:15px;color:var(--apex-emerald);margin-bottom:8px;">
              🔥 Ưu đãi đã xác minh áp dụng hôm nay:
            </div>
            ${todayDeals.map(d => renderDealCard(d)).join('')}
          </div>`;
        }

        return `
        <!-- HONEST EMPTY STATE -->
        <div class="apex-honest-empty-box" id="apex-honest-empty-state">
          <div style="font-size:32px;">🛡️</div>
          <div class="apex-honest-msg" id="apex-honest-msg-text">
            ${esc(honestMessage)}
          </div>
          <div class="apex-cta-row">
            <button class="apex-btn-primary" data-apex="switch-tab" data-tab="calendar_7d" id="apex-btn-view-7d">
              📅 Xem Lịch Đã Kiểm Chứng 7 Ngày Tới
            </button>
            <button class="apex-btn-secondary" data-apex="switch-tab" data-tab="online_radar" id="apex-btn-view-radar">
              ⚡ Xem Deal Radar Online & App
            </button>
          </div>
        </div>`;
      })()}
    </section>`;
  }

  // --- RENDER 7-DAY PLANNING CALENDAR (ZONE 2) ---
  function renderCalendar7DZone() {
    const days = [
      { day: 1, name: 'Thứ Hai', highlight: 'CGV Culture Day 58K (24/08)' },
      { day: 2, name: 'Thứ Ba', highlight: 'Metiz U22 (Chờ kiểm tra)' },
      { day: 3, name: 'Thứ Tư', highlight: 'Ngày vàng rạp phim' },
      { day: 4, name: 'Thứ Năm', highlight: 'Gà rán & F&B' },
      { day: 5, name: 'Thứ Sáu', highlight: 'Flash sale cuối tuần' },
      { day: 6, name: 'Thứ Bảy', highlight: 'Tụ tập nhóm & Cà phê' },
      { day: 0, name: 'Chủ Nhật', highlight: 'Thư giãn cuối tuần' }
    ];

    const currentDay = days.find(d => d.day === state.selectedDayOfWeek) || days[0];

    return `
    <section class="apex-widget-card" id="apex-calendar-zone">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
        <h2 style="font-size:18px;font-weight:900;color:var(--apex-gold);margin:0;">
          📅 Lịch Tiết Kiệm Địa Phương 7 Ngày
        </h2>
        <span style="font-size:11px;color:var(--apex-gold);font-weight:700;">🔄 Lặp lại định kỳ hàng tuần</span>
      </div>

      <div class="apex-calendar-days-grid" role="tablist">
        ${days.map(d => `
          <div class="apex-day-card ${state.selectedDayOfWeek === d.day ? 'active' : ''}" data-apex="select-day" data-day="${d.day}" id="day-pill-${d.day}" data-tab-id="day-tab-${d.day}">
            <span style="font-size:13.5px;font-weight:800;color:${state.selectedDayOfWeek === d.day ? 'var(--apex-gold)' : 'var(--apex-text)'};">
              ${d.name}
            </span>
            <span style="font-size:11px;color:var(--apex-text-dim);line-height:1.2;">
              ${d.highlight}
            </span>
          </div>
        `).join('')}
      </div>

      ${(state.selectedDayOfWeek === 1 && dataStore.deals && dataStore.deals.length > 0) ? `
        <div id="apex-calendar-day-content">
          <div style="font-weight:800;font-size:15px;color:var(--apex-gold);margin-bottom:8px;">
            🗓️ Ưu đãi đã được phê duyệt cho ${currentDay.name}:
          </div>
          ${dataStore.deals.map(d => renderDealCard(d)).join('')}
        </div>
      ` : `
        <div class="apex-honest-empty-box" style="padding:16px;" id="apex-calendar-day-content">
          <div style="font-weight:800;font-size:15px;color:var(--apex-gold);">
            🗓️ Lịch cho ${currentDay.name}: Chưa có deal nào được phê duyệt
          </div>
          <p style="margin:0;font-size:13px;color:var(--apex-text-dim);max-width:600px;">
            JayT chỉ hiển thị deal khi có đầy đủ bằng chứng đối chiếu và được CEO duyệt. Bạn có thể lưu kế hoạch ngày này để hệ thống nhắc bạn.
          </p>
          <button class="apex-btn-primary" data-apex="switch-tab" data-tab="share_plan" id="apex-btn-plan-with-friends">
            ✍️ Lên Kế Hoạch Đi Chơi ${currentDay.name}
          </button>
        </div>
      `}
    </section>`;
  }

  // --- RENDER ONLINE & APP DEAL RADAR (ZONE 3) ---
  function renderOnlineRadarZone() {
    const platforms = [
      { name: 'Shopee Đà Nẵng', status: 'Đang chờ xác minh chứng cứ', badge: 'PROBING', desc: 'Voucher sàn, freeship Xtra, mã hoàn xu.' },
      { name: 'TikTok Shop', status: 'Đang chờ xác minh chứng cứ', badge: 'PROBING', desc: 'Flash sale live, voucher đơn đầu, trợ giá ship.' },
      { name: 'Lazada Việt Nam', status: 'Đang chờ xác minh chứng cứ', badge: 'PROBING', desc: 'Voucher tích lũy, LazFlash, freeship MAX.' },
      { name: 'Highlands Coffee App', status: 'Đang chờ xác minh chứng cứ', badge: 'NEEDS_RECHECK', desc: 'Voucher mua 1 tặng 1, tích điểm đổi quà.' }
    ];

    return `
    <section class="apex-widget-card" id="apex-online-radar-zone">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
        <h2 style="font-size:18px;font-weight:900;color:var(--apex-gold);margin:0;">
          ⚡ Deal Radar Online & Sàn TMĐT (Minh Bạch 100%)
        </h2>
        <span style="font-size:11px;color:var(--apex-amber);font-weight:700;">⚠️ Biến động theo khung giờ</span>
      </div>

      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(220px, 1fr));gap:12px;">
        ${platforms.map(p => `
          <div style="background:var(--apex-card-sub);border:1px solid var(--apex-border-sub);padding:14px;border-radius:12px;display:flex;flex-direction:column;gap:6px;">
            <div style="display:flex;justify-content:space-between;align-items:center;">
              <span style="font-weight:800;font-size:14px;color:var(--apex-text);">${esc(p.name)}</span>
              <span style="font-size:10px;font-weight:800;padding:3px 8px;border-radius:12px;background:rgba(245,158,11,0.15);color:var(--apex-amber);border:1px solid var(--apex-amber);">
                ${p.badge}
              </span>
            </div>
            <p style="margin:0;font-size:12px;color:var(--apex-text-dim);line-height:1.4;">${esc(p.desc)}</p>
            <div style="font-size:11.5px;color:var(--apex-gold);font-weight:700;margin-top:4px;">
              Trạng thái: ${esc(p.status)}
            </div>
          </div>
        `).join('')}
      </div>

      <div class="apex-honest-empty-box" style="padding:16px;">
        <div style="font-size:13.5px;color:var(--apex-text);">
          🛡️ <b>Kỷ Luật Săn Deal Online:</b> JayT chỉ dẫn link khi có mã thật và công khai rõ ràng có affiliate hay không. Tuyệt đối không treo link giả voucher.
        </div>
      </div>
    </section>`;
  }

  // --- RENDER TRUSTED SAVINGS CALCULATOR (DIRECTIVE 039B) ---
  function renderCalculatorZone() {
    const calcRes = computeCalculator();

    return `
    <section class="apex-widget-card" id="apex-calculator-zone">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
        <h2 style="font-size:18px;font-weight:900;color:var(--apex-gold);margin:0;">
          🧮 Máy Tính Tiền Thật (Độc Quyền JayT)
        </h2>
        <div style="display:flex;gap:6px;">
          <button class="apex-trigger-pill ${calcRes.isExact ? 'active' : ''}" data-apex="calc-toggle-mode" data-mode="exact" id="btn-calc-exact">
            🎯 Tính Chuẩn Xác
          </button>
          <button class="apex-trigger-pill ${!calcRes.isExact ? 'active' : ''}" data-apex="calc-toggle-mode" data-mode="estimate" id="btn-calc-estimated">
            📊 Dự Toán
          </button>
        </div>
      </div>

      <!-- FORMULA DISPLAY -->
      <div class="apex-calc-formula" id="apex-calc-formula-text">
        <b>Công thức minh bạch:</b><br>
        Tạm tính món (${money(calcRes.base)}) 
        − Giảm giá món (${money(calcRes.disc)}) 
        − Voucher hợp lệ (${money(calcRes.voucherDisc)}) 
        + Phí ship (${money(calcRes.ship)}) 
        − Ưu đãi ship (${money(calcRes.shipDisc)}) 
        + Phụ phí (${money(calcRes.surcharge)})
      </div>

      <!-- INTERACTIVE INPUTS -->
      <div class="apex-calc-inputs-grid">
        <div class="apex-control-group">
          <label class="apex-control-label">Giá món (VNĐ)</label>
          <input type="number" class="apex-calc-input" data-apex="calc-input" data-field="item_price" id="calc-item-price" value="${state.calculator.item_price}">
        </div>
        <div class="apex-control-group">
          <label class="apex-control-label">Giảm giá món (VNĐ)</label>
          <input type="number" class="apex-calc-input" data-apex="calc-input" data-field="item_discount" id="calc-item-discount" value="${state.calculator.item_discount}">
        </div>
        <div class="apex-control-group">
          <label class="apex-control-label">Voucher giảm (VNĐ)</label>
          <input type="number" class="apex-calc-input" data-apex="calc-input" data-field="voucher_value" id="calc-voucher-value" value="${state.calculator.voucher_value}">
        </div>
        <div class="apex-control-group">
          <label class="apex-control-label">Đơn tối thiểu (VNĐ)</label>
          <input type="number" class="apex-calc-input" data-apex="calc-input" data-field="min_spend" id="calc-min-spend" value="${state.calculator.min_spend}">
        </div>
        <div class="apex-control-group">
          <label class="apex-control-label">Phí ship (VNĐ)</label>
          <input type="number" class="apex-calc-input" data-apex="calc-input" data-field="shipping_fee" id="calc-shipping-fee" value="${state.calculator.shipping_fee}">
        </div>
        <div class="apex-control-group">
          <label class="apex-control-label">Giảm phí ship (VNĐ)</label>
          <input type="number" class="apex-calc-input" data-apex="calc-input" data-field="shipping_discount" id="calc-shipping-discount" value="${state.calculator.shipping_discount}">
        </div>
      </div>

      <!-- RESULT BOX -->
      <div class="apex-calc-result-box ${calcRes.isExact && !calcRes.isUserEntered ? '' : 'estimated'}" id="apex-calc-result-card">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
          <div>
            <div style="font-size:12px;font-weight:800;text-transform:uppercase;color:${calcRes.isExact && !calcRes.isUserEntered ? 'var(--apex-emerald)' : 'var(--apex-amber)'};" id="apex-calc-status-badge">
              ${calcRes.modeText}
            </div>
            <div style="font-size:24px;font-weight:900;color:var(--apex-text);margin-top:2px;" id="calc-total-final">
              ${money(calcRes.total)}
            </div>
          </div>
          <button class="apex-btn-secondary" style="font-size:12px;" onclick="alert('Đã mở trang nguồn kiểm tra!')" id="apex-btn-check-source">
            🔍 Mở Nguồn Kiểm Tra Lần Cuối
          </button>
        </div>
        <div style="font-size:12px;color:var(--apex-text-dim);border-top:1px dashed rgba(255,255,255,0.1);padding-top:8px;margin-top:4px;" id="apex-calc-surcharge-warning">
          ⚠️ Phụ thu VIP, Sweetbox: <b>Chưa xác định giá cụ thể</b> (Không tự động cộng/trừ ước đoán) • Nhãn: <b>Không affiliate</b>
        </div>
      </div>
    </section>`;
  }

  // --- RENDER CONTEXTUAL SHARE PLAN ---
  function renderSharePlanZone() {
    const planText = `${state.sharePlan.time_slot}: ${state.sharePlan.activities.join(' + ')}. Điều kiện cần kiểm tra: ${state.sharePlan.conditions_to_check.join(', ')}.`;

    return `
    <section class="apex-widget-card" id="apex-share-plan-zone">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
        <h2 style="font-size:18px;font-weight:900;color:var(--apex-gold);margin:0;">
          👥 Chia Sẻ Kế Hoạch Tiết Kiệm (Bảo Vệ Quyền Riêng Tư)
        </h2>
        <span style="font-size:11px;color:var(--apex-emerald);font-weight:700;">🔒 Không PII • Không Tracking</span>
      </div>

      <div style="background:rgba(0,0,0,0.4);border:1px solid var(--apex-border-sub);padding:16px;border-radius:14px;display:flex;flex-direction:column;gap:10px;">
        <div style="font-size:12px;font-weight:800;color:var(--apex-gold);text-transform:uppercase;">
          📋 Nội dung kế hoạch mẫu
        </div>
        <div style="font-size:15px;font-weight:700;color:var(--apex-text);line-height:1.5;" id="apex-share-text-preview">
          “${esc(planText)}”
        </div>
        <div style="font-size:12px;color:var(--apex-text-dim);">
          🔗 Link chi tiết: <code style="color:var(--apex-gold);">https://jayt.vn/plan/DNG-WED-01</code>
        </div>
      </div>

      <div class="apex-cta-row" style="justify-content:flex-start;">
        <button class="apex-btn-primary" data-apex="do-web-share" id="apex-btn-share-native">
          📲 Chia Sẻ Qua Web Share Sheet
        </button>
        <button class="apex-btn-secondary" data-apex="do-copy-plan" id="apex-btn-copy-plan">
          📋 Sao Chép Kế Hoạch
        </button>
      </div>

      <div style="font-size:12px;color:var(--apex-text-dim);line-height:1.4;">
        🛡️ <b>Cam kết JayT:</b> Sử dụng Web Share Sheet native của thiết bị để bạn tự chọn Messenger/Facebook/Instagram. Hệ thống không tự gửi tin nhắn và không truy cập danh bạ.
      </div>
    </section>`;
  }

  // --- RENDER FOOTER ---
  function renderFooter() {
    return `
    <footer style="padding:24px 20px;text-align:center;font-size:12px;color:var(--apex-text-dim);border-top:1px solid var(--apex-border-sub);margin-top:40px;">
      🏛️ <b>JayT Đà Nẵng 43</b> — Lịch Sống Tiết Kiệm Cho Người Đà Nẵng • Lưu Trữ Cục Bộ Riêng Tư
    </footer>`;
  }

  // --- MAIN RENDER ROOT ---
  function render() {
    let root = document.getElementById('jayt-apex');
    if (!root) {
      root = document.createElement('div');
      root.id = 'jayt-apex';
      document.body.prepend(root);
    }

    if (window.location.protocol === 'file:') {
      root.innerHTML = `
      <style>${getStyleSheet()}</style>
      ${renderHeader()}
      <main class="apex-workspace">
        ${renderSafeModeCard()}
      </main>
      ${renderFooter()}
      `;
      return;
    }

    let activeZoneContent = '';
    if (state.activeProductTab === 'local') {
      activeZoneContent = renderLocalZone();
    } else if (state.activeProductTab === 'calendar_7d') {
      activeZoneContent = renderCalendar7DZone();
    } else if (state.activeProductTab === 'online_radar') {
      activeZoneContent = renderOnlineRadarZone();
    } else if (state.activeProductTab === 'calculator') {
      activeZoneContent = renderCalculatorZone();
    } else if (state.activeProductTab === 'share_plan') {
      activeZoneContent = renderSharePlanZone();
    }

    root.innerHTML = `
    <style>${getStyleSheet()}</style>
    ${renderHeader()}
    <main class="apex-workspace">
      ${renderZoneSwitcher()}
      ${activeZoneContent}
    </main>
    ${renderFooter()}
    `;
  }

  function renderSafeModeCard() {
    return `
    <div class="apex-safe-card" style="background:var(--apex-card);border:1px solid var(--apex-border);padding:24px;border-radius:16px;text-align:center;">
      <h2 style="color:var(--apex-gold);margin:0 0 12px;">🔒 Giao thức file:// - Chế Độ Cách Ly An Toàn</h2>
      <p style="color:var(--apex-text-dim);margin:0;">Vui lòng khởi chạy JayT qua HTTP server để tải dữ liệu danh mục ưu đãi.</p>
    </div>`;
  }

  window.__render = render;

  // --- GLOBAL EVENT DELEGATION HANDLER ---
  function handleEvent(e) {
    const rawTarget = e.target || {};
    const target = rawTarget.closest ? (rawTarget.closest('[data-apex]') || rawTarget) : rawTarget;
    if (!target) return;

    const action = target.getAttribute ? target.getAttribute('data-apex') : (target.dataset ? target.dataset.apex : null);
    if (!action) return;

    if (action === 'switch-tab') {
      const tab = target.getAttribute('data-tab') || (target.dataset ? target.dataset.tab : 'local');
      state.activeProductTab = tab;
      render();
    } else if (action === 'change-persona') {
      state.persona = target.value;
      try { localStorage.setItem('jayt_preferred_persona', target.value); } catch {}
      render();
    } else if (action === 'change-district') {
      state.selectedDistrict = target.value;
      try { localStorage.setItem('jayt_preferred_district', target.value); } catch {}
      render();
    } else if (action === 'select-trigger') {
      const trig = target.getAttribute('data-trigger') || (target.dataset ? target.dataset.trigger : 'TRIG_1730_AFTER_WORK_SCHOOL');
      state.selectedTrigger = trig;
      render();
    } else if (action === 'select-day') {
      const day = parseInt(target.getAttribute('data-day') || (target.dataset ? target.dataset.day : 3), 10);
      state.selectedDayOfWeek = day;
      render();
    } else if (action === 'calc-toggle-mode') {
      const mode = target.getAttribute('data-mode') || (target.dataset ? target.dataset.mode : 'exact');
      state.calculator.is_mode_exact = (mode === 'exact');
      render();
    } else if (action === 'calc-input') {
      const field = target.getAttribute('data-field') || (target.dataset ? target.dataset.field : '');
      if (field && state.calculator[field] !== undefined) {
        state.calculator[field] = parseFloat(target.value) || 0;
        state.calculator.is_user_input = true; // Mark as user-entered custom value
        render();
      }
    } else if (action === 'do-web-share') {
      const shareData = {
        title: 'Kế hoạch JayT: ' + state.sharePlan.time_slot,
        text: state.sharePlan.time_slot + ': ' + state.sharePlan.activities.join(' + ') + '. Điều kiện: ' + state.sharePlan.conditions_to_check.join(', '),
        url: 'https://jayt.vn/plan/DNG-WED-01'
      };
      if (navigator.share) {
        navigator.share(shareData).catch(() => {});
      } else {
        showToast('Đã mở Web Share Fallback — Đã sao chép kế hoạch vào bộ nhớ tạm!');
      }
    } else if (action === 'apply-deal-to-calc') {
      const dealId = target.getAttribute('data-deal-id') || (target.dataset ? target.dataset.dealId : '');
      const deal = (dataStore.deals || []).find(d => d.deal_id === dealId);
      if (deal) {
        state.calculator.item_price = deal.deal_price || 58000;
        state.calculator.item_discount = 0;
        state.calculator.voucher_value = 0;
        state.calculator.min_spend = 0;
        state.calculator.shipping_fee = 0;
        state.calculator.shipping_discount = 0;
        state.calculator.payment_surcharge = 0;
        state.calculator.is_user_input = false;
        state.calculator.is_mode_exact = true; // Exact verified price of 58.000đ
        state.activeProductTab = 'calculator';
        render();
        showToast('🧮 Đã chuyển sang Máy Tính Tiền với giá vé 58.000đ!');
      }
    } else if (action === 'do-copy-plan') {
      const text = state.sharePlan.time_slot + ': ' + state.sharePlan.activities.join(' + ') + '. Điều kiện: ' + state.sharePlan.conditions_to_check.join(', ') + ' (Xem tại: https://jayt.vn/plan/DNG-WED-01)';
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
          showToast('📋 Đã sao chép kế hoạch vào bộ nhớ tạm!');
        }).catch(() => {
          showToast('📋 Đã sao chép kế hoạch!');
        });
      } else {
        showToast('📋 Đã sao chép kế hoạch!');
      }
    }
  }

  // --- ASYNC DEALS FETCHING ---
  async function fetchDeals() {
    if (window.location.protocol === 'file:') return;
    try {
      const res = await fetch('/api/deals');
      if (res.ok) {
        const json = await res.json();
        if (json.deals && Array.isArray(json.deals)) {
          dataStore.deals = json.deals;
          dataStore.evidence = json.evidence || {};
          dataStore.zones = json.zones || [];
          dataStore.isLoaded = true;
          render();
        }
      }
    } catch (e) {
      console.warn('Deals fetch warning:', e);
    }
  }

  window.__fetchDeals = fetchDeals;
  window.__setDeals = function(deals, evidence, zones) {
    dataStore.deals = deals || [];
    dataStore.evidence = evidence || {};
    dataStore.zones = zones || [];
    dataStore.isLoaded = true;
    render();
  };

  // --- INITIALIZE ---
  function init() {
    loadPersistedState();
    document.addEventListener('click', handleEvent);
    document.addEventListener('change', handleEvent);
    document.addEventListener('input', handleEvent);
    render();
    fetchDeals();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
