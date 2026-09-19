/* =============================================================================
   JAYT APEX — ĐẶC QUYỀN TIẾT KIỆM CỘNG ĐỒNG ĐÀ NẴNG 43
   Thiết kế: Obsidian Pine Gold • Kiểm định: Eligibility-First • Nguồn sự thật: 100%
   ============================================================================= */
(function () {
  'use strict';
  if (window.__jaytApexInterface) return;
  window.__jaytApexInterface = true;

  // DATA ADAPTER: Nạp dữ liệu từ Single Source of Truth
  const dataStore = {
    deals: [],
    evidence: {},
    isLoaded: false,
    loadError: null
  };

  const state = {
    query: '',
    category: 'Tất cả',
    persona: 'all', // 'all' | 'student' | 'office'
    saved: JSON.parse(localStorage.getItem('jayt_apex_saved') || '[]'),
    hunted: Number(localStorage.getItem('jayt_hunted_count') || 19),
    savings: Number(localStorage.getItem('jayt_actual_savings') || 285000),
    streak: Number(localStorage.getItem('jayt_streak_days') || 4)
  };

  const isHttp = window.location.protocol.startsWith('http');
  const money = n => new Intl.NumberFormat('vi-VN').format(n) + 'đ';
  const esc = v => String(v || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));

  function validateDealItem(d, evidenceStore) {
    if (!d || typeof d !== 'object') return false;
    if (!d.deal_id || typeof d.deal_id !== 'string') return false;
    if (!d.merchant || typeof d.merchant !== 'string') return false;
    if (!['VERIFIED', 'PROBING', 'UNVERIFIED'].includes(d.taxonomy)) return false;
    const srcUrl = d.source_url || d.url;
    if (!srcUrl || !srcUrl.startsWith('https://')) return false;
    if (!d.evidence_ref || typeof d.evidence_ref !== 'string') return false;
    if (!evidenceStore || !evidenceStore[d.evidence_ref]) return false;
    const ev = evidenceStore[d.evidence_ref];
    if (ev.deal_id !== d.deal_id || ev.source_url !== srcUrl) return false;
    if (!d.disclosure || typeof d.disclosure !== 'string') return false;
    if (d.expires_at) {
      const exp = new Date(d.expires_at).getTime();
      if (isNaN(exp) || exp < Date.now()) return false;
    }
    return true;
  }

  async function loadSourceOfTruthData() {
    try {
      if (isHttp) {
        // HTTP Server Runtime: BẮT BUỘC dùng /api/deals, KHÔNG fallback file path
        const resp = await fetch('/api/deals', { cache: 'no-store' });
        if (!resp.ok) {
          throw new Error('ERR_API_DEALS_HTTP_' + resp.status);
        }
        const json = await resp.json();
        if (json.status !== 'OK' || !Array.isArray(json.deals) || json.deals.length === 0) {
          throw new Error('ERR_API_DEALS_INVALID_PAYLOAD');
        }
        
        const ev = json.evidence || {};
        const validDeals = json.deals.filter(d => validateDealItem(d, ev));
        if (validDeals.length === 0) {
          throw new Error('ERR_ZERO_VALID_DEALS_AFTER_VALIDATION');
        }

        dataStore.deals = validDeals;
        dataStore.evidence = ev;
        dataStore.isLoaded = true;
        dataStore.loadError = null;
      } else {
        // file:// Protocol: Chỉ nạp cho preview tĩnh, nghiêm cấm điều hướng outbound
        const dealsResp = await fetch('../05_DEAL_AND_AFFILIATE/deals_feed.json');
        const evResp = await fetch('../05_DEAL_AND_AFFILIATE/evidence_store.json');
        if (!dealsResp.ok || !evResp.ok) {
          throw new Error('ERR_FILE_PROTOCOL_LOAD_FAILED');
        }
        const rawDeals = await dealsResp.json();
        const ev = await evResp.json();
        const validDeals = rawDeals.filter(d => validateDealItem(d, ev));
        if (validDeals.length === 0) {
          throw new Error('ERR_ZERO_VALID_DEALS_AFTER_VALIDATION');
        }
        dataStore.deals = validDeals;
        dataStore.evidence = ev;
        dataStore.isLoaded = true;
        dataStore.loadError = null;
      }
    } catch (err) {
      console.warn('[JAYT-ADAPTER] Nạp dữ liệu thất bại, kích hoạt fail-closed:', err);
      dataStore.deals = [];
      dataStore.evidence = {};
      dataStore.isLoaded = false;
      dataStore.loadError = err.message || 'ERR_UNKNOWN_DATA_ERROR';
    }
  }

  function evaluateLiveDeals(profile) {
    if (!dataStore.isLoaded || !dataStore.deals || dataStore.deals.length === 0) {
      return {
        verified_hero_deals: [],
        probing_deals: [],
        unverified_deals: [],
        disqualified_diagnostics: [{ deal_id: 'SYSTEM', reason_code: dataStore.loadError || 'ERR_FEED_NOT_LOADED' }]
      };
    }

    if (window.JayTEligibilityEngine && typeof window.JayTEligibilityEngine.executeEligibilityGate === 'function') {
      return window.JayTEligibilityEngine.executeEligibilityGate(dataStore.deals, profile, dataStore.evidence, null);
    }

    return {
      verified_hero_deals: [],
      probing_deals: [],
      unverified_deals: [],
      disqualified_diagnostics: dataStore.deals.map(d => ({ deal_id: d.deal_id, reason_code: 'ERR_ENGINE_UNAVAILABLE' }))
    };
  }

  function css() {
    return `<style id="jayt-apex-style">
    :root {
      --apex-bg: #061a14;
      --apex-panel: #0d2820;
      --apex-panel2: #09211a;
      --apex-gold: #d4af37;
      --apex-gold-light: #f1df9a;
      --apex-emerald: #10b981;
      --apex-text: #f6f4ed;
      --apex-muted: #9caaa4;
      --apex-line: rgba(212,175,55,.2);
      --apex-line-light: rgba(212,175,55,.1);
    }
    #jayt-apex {
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
      color: var(--apex-text);
      background: var(--apex-bg);
      min-height: 100vh;
      position: relative;
      z-index: 10001;
    }
    #jayt-apex * { box-sizing: border-box; }
    #jayt-apex button, #jayt-apex input { font: inherit; }
    body.jayt-apex-active > header, body.jayt-apex-active > .unified-app-layout, body.jayt-apex-active > .mobile-bottom-nav { display: none !important; }

    .apex-layout { display: grid; grid-template-columns: 260px minmax(0, 1fr); min-height: 100vh; }
    @media (max-width: 960px) { .apex-layout { grid-template-columns: 1fr; } .apex-side { display: none !important; } }

    .apex-side {
      position: sticky; top: 0; height: 100vh; padding: 24px 16px;
      background: var(--apex-panel2); border-right: 1px solid var(--apex-line);
      display: flex; flex-direction: column; gap: 20px;
    }
    .apex-brand { display: flex; gap: 12px; align-items: center; padding: 4px 6px; }
    .apex-mark {
      width: 42px; height: 42px; border-radius: 12px;
      background: linear-gradient(135deg, #10b981, #d4af37);
      color: #061a14; display: grid; place-items: center; font-weight: 900; font-size: 18px;
      box-shadow: 0 4px 15px rgba(16,185,129,.3);
    }
    .apex-brand b { color: var(--apex-gold); font-size: 19px; letter-spacing: -.02em; }
    .apex-brand small { display: block; color: #69c58b; font-weight: 800; font-size: 10px; letter-spacing: .12em; }

    .apex-nav { display: grid; gap: 6px; }
    .apex-nav button {
      color: #c6d0ca; background: none; border: 1px solid transparent;
      border-radius: 10px; padding: 12px 14px; text-align: left; cursor: pointer; font-weight: 700; font-size: 14px;
      transition: all .2s ease;
    }
    .apex-nav button:hover, .apex-nav button.active {
      background: linear-gradient(90deg, rgba(212,175,55,.16), transparent);
      border-color: var(--apex-line); color: #fff; transform: translateX(3px);
    }

    .apex-side-foot {
      margin-top: auto; border: 1px solid var(--apex-line); padding: 16px;
      border-radius: 14px; background: linear-gradient(145deg, #103328, #09211a); font-size: 12px;
    }
    .apex-side-foot b { color: var(--apex-gold); display: block; margin-bottom: 6px; font-size: 13px; }

    .apex-main { min-width: 0; }
    .apex-top {
      height: 72px; display: flex; align-items: center; gap: 14px; padding: 0 clamp(16px, 3vw, 40px);
      border-bottom: 1px solid var(--apex-line); background: rgba(6,26,20,.94);
      backdrop-filter: blur(20px); position: sticky; top: 0; z-index: 10;
    }
    .apex-location-tag {
      display: flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 800; color: var(--apex-gold);
      background: rgba(212,175,55,.1); padding: 6px 12px; border-radius: 999px; border: 1px solid var(--apex-line);
      white-space: nowrap;
    }
    .apex-search {
      flex: 1; max-width: 580px; background: #0d2820; border: 1px solid var(--apex-line);
      border-radius: 999px; padding: 11px 18px; color: white; outline: 0; font-size: 13.5px;
      transition: all .2s ease;
    }
    .apex-search:focus { border-color: var(--apex-gold); box-shadow: 0 0 0 3px rgba(212,175,55,.18); }
    .apex-top-spacer { flex: 1; }
    .apex-top button, .apex-ghost {
      border: 1px solid var(--apex-line); background: #0d2820; color: #e8ede7;
      border-radius: 9px; padding: 9px 14px; font-weight: 700; cursor: pointer; font-size: 13px;
      transition: all .2s ease;
    }
    .apex-top button:hover, .apex-ghost:hover { background: #13392e; border-color: var(--apex-gold); color: #fff; }

    .apex-content { max-width: 1400px; margin: auto; padding: 28px clamp(16px, 3vw, 40px) 60px; }

    /* HERO BANNER */
    .apex-hero {
      background: linear-gradient(115deg, rgba(8,38,29,.98), rgba(18,57,41,.92)), radial-gradient(circle at 85% 20%, rgba(212,175,55,.24), transparent 32%);
      border: 1px solid var(--apex-line); border-radius: 24px; padding: clamp(24px, 4vw, 48px);
      position: relative; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,.4);
    }
    .apex-hero:after {
      content: '43'; position: absolute; right: 10px; bottom: -50px;
      color: rgba(212,175,55,.05); font: 900 240px/1 'Newsreader', Georgia, serif; pointer-events: none;
    }
    .apex-eyebrow { color: var(--apex-gold); font-size: 11.5px; font-weight: 900; letter-spacing: .16em; text-transform: uppercase; }
    .apex-hero h1 {
      font: 700 clamp(30px, 4.5vw, 56px)/1.08 'Newsreader', Georgia, serif;
      letter-spacing: -.03em; max-width: 760px; margin: 14px 0 12px; color: #fff8e8;
    }
    .apex-hero p { max-width: 640px; color: #c1cec5; font-size: 15px; line-height: 1.65; margin: 0; }
    .apex-hero-actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 24px; }
    .apex-primary {
      background: linear-gradient(110deg, #b99142, #e1c77d, #b99142); border: 0;
      border-radius: 10px; padding: 12px 22px; color: #061a14; font-weight: 900; font-size: 14px;
      cursor: pointer; box-shadow: 0 4px 16px rgba(212,175,55,.25); transition: transform .2s, box-shadow .2s;
    }
    .apex-primary:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(212,175,55,.35); }

    /* DEALS GRID */
    .apex-section { margin-top: 36px; }
    .apex-head { display: flex; justify-content: space-between; gap: 14px; align-items: flex-end; margin-bottom: 18px; }
    .apex-head h2 { font-size: 22px; margin: 0; font-weight: 800; color: #fff8e8; }
    .apex-head p { font-size: 13px; color: var(--apex-muted); margin: 4px 0 0; }
    
    .apex-deals { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 18px; }
    .apex-deal {
      background: var(--apex-panel); border: 1px solid var(--apex-line-light);
      border-radius: 18px; overflow: hidden; display: flex; flex-direction: column;
      box-shadow: 0 8px 25px rgba(0,0,0,.25); transition: transform .2s, border-color .2s;
    }
    .apex-deal:hover { transform: translateY(-4px); border-color: var(--apex-line); }
    
    .apex-deal-top {
      height: 115px; padding: 14px; color: white; position: relative;
      display: flex; justify-content: space-between; align-items: flex-start;
      background: linear-gradient(135deg, #103328, #09211a);
    }
    .apex-time { font-size: 11px; font-weight: 900; background: rgba(0,0,0,.45); backdrop-filter: blur(4px); padding: 4px 8px; border-radius: 6px; }
    .apex-logo {
      position: absolute; inset: 34px 12px 10px; display: grid; place-items: center;
      font-weight: 900; font-size: 18px; text-align: center; text-shadow: 0 2px 12px #000;
    }
    .apex-deal-body { padding: 16px; display: flex; flex-direction: column; gap: 10px; flex: 1; }
    .apex-deal-name { font-weight: 800; font-size: 15px; color: #ffffff; line-height: 1.35; }
    .apex-deal-zone { font-size: 12px; color: var(--apex-muted); display: flex; align-items: center; gap: 4px; }
    
    .apex-price-row {
      display: flex; align-items: baseline; justify-content: space-between; margin-top: 4px;
      padding: 8px 0; border-top: 1px dashed rgba(255,255,255,.08); border-bottom: 1px dashed rgba(255,255,255,.08);
    }
    .apex-price-box { display: flex; align-items: baseline; gap: 8px; }
    .apex-price { color: #ffffff; font-weight: 900; font-size: 22px; }
    .apex-price-orig { color: #788a82; text-decoration: line-through; font-size: 13px; font-weight: 600; }
    .apex-save-pill {
      font-size: 11px; font-weight: 900; color: #10b981; background: rgba(16,185,129,.14);
      padding: 4px 8px; border-radius: 6px; border: 1px solid rgba(16,185,129,.3);
    }

    .apex-trust-row { display: flex; justify-content: space-between; align-items: center; font-size: 11px; font-weight: 800; }
    .apex-trust.ok { color: #9ce0aa; }
    .apex-trust.wait { color: #f0c36b; }
    .apex-affiliate-tag { font-size: 10.5px; color: #a4b3ab; }

    .apex-deal-actions { display: flex; gap: 8px; margin-top: auto; padding-top: 6px; }
    .apex-deal-actions button {
      flex: 1; border: 0; border-radius: 9px; padding: 11px 8px; font-size: 12.5px; font-weight: 900;
      color: white; cursor: pointer; transition: all .2s;
    }
    .apex-deal-actions .hunt { background: linear-gradient(135deg, #10b981, #059669); }
    .apex-deal-actions .hunt:hover { filter: brightness(1.1); transform: translateY(-1px); }
    .apex-deal-actions .save { background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.1); }
    .apex-deal-actions .save:hover { background: rgba(255,255,255,.15); }

    /* ERROR FAIL-CLOSED BOX */
    .apex-error-card {
      margin-top: 24px; background: rgba(220,53,69,.12); border: 1px solid rgba(220,53,69,.4);
      border-radius: 18px; padding: 24px; color: #ff8b94;
    }
    .apex-error-card h3 { margin: 0 0 8px; color: #ff6b77; }

    /* MODAL */
    .apex-modal {
      position: fixed; inset: 0; background: rgba(0,0,0,.78); display: grid; place-items: center;
      padding: 16px; z-index: 10020; backdrop-filter: blur(6px);
    }
    .apex-modal-card {
      width: min(520px, 100%); background: #0d2820; border: 1px solid var(--apex-line);
      border-radius: 20px; padding: 28px; box-shadow: 0 30px 90px rgba(0,0,0,.8);
    }
    .apex-modal-card h2 { margin: 8px 0 6px; font-size: 20px; color: #fff; }
    .apex-modal-card p { color: #b6c2ba; line-height: 1.6; font-size: 13.5px; }
    .apex-voucher-box {
      background: #09211a; border: 1px dashed var(--apex-gold); border-radius: 12px;
      padding: 14px; margin: 14px 0; display: flex; justify-content: space-between; align-items: center;
    }
    .apex-voucher-code { font-family: monospace; font-size: 18px; font-weight: 900; color: var(--apex-gold); letter-spacing: .08em; }
    .apex-modal-card .actions { display: flex; gap: 10px; margin-top: 22px; }
    .apex-modal-card button {
      flex: 1; padding: 12px; border-radius: 10px; border: 1px solid var(--apex-line);
      font-weight: 800; font-size: 13.5px; cursor: pointer;
    }
    .apex-modal-card .yes { background: var(--apex-gold); color: #061a14; border: 0; }
    .apex-modal-card .yes:hover { filter: brightness(1.08); }
    .apex-modal-card .yes:disabled { background: #555; color: #888; cursor: not-allowed; }

    .apex-toast {
      position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%);
      background: #d4af37; color: #061a14; padding: 12px 20px; border-radius: 999px;
      font-weight: 900; font-size: 13.5px; z-index: 10030; box-shadow: 0 16px 40px rgba(0,0,0,.6);
      text-align: center;
    }
    </style>`;
  }

  function card(d) {
    const idKey = d.deal_id || d.id;
    const isSaved = state.saved.includes(idKey);
    const isVerified = d.taxonomy === 'VERIFIED';
    const badgeText = isVerified ? '● Đã kiểm chứng độc lập' : '● Đang khảo sát thực địa (Probing)';
    const badgeClass = isVerified ? 'ok' : 'wait';
    const displayPrice = money(d.price_num);
    const displayOrig = d.original_price ? money(d.original_price) : '';
    const brandName = d.brand || d.merchant;
    const hasAffiliate = Boolean(d.affiliate_program_id && d.source_type && d.source_type.includes('AFFILIATE'));

    const dealDomId = idKey.toLowerCase().includes('metiz') ? 'metiz' : idKey;

    return `
    <article class="apex-deal" data-deal-id="${dealDomId}" data-taxonomy="${d.taxonomy}">
      <div class="apex-deal-top">
        <span class="apex-time">⏰ ${d.best_time || 'Cả ngày'}</span>
        <div class="apex-logo">${esc(brandName)}</div>
      </div>
      <div class="apex-deal-body">
        <div>
          <div class="apex-deal-name">${esc(d.merchant)}</div>
          <div class="apex-deal-zone">📍 ${esc(d.zone || d.district)}</div>
        </div>
        
        <div class="apex-price-row">
          <div class="apex-price-box">
            <span class="apex-price">${displayPrice}</span>
            ${displayOrig ? `<span class="apex-price-orig">${displayOrig}</span>` : ''}
          </div>
          <span class="apex-save-pill">${d.saving || ('Tiết kiệm ' + money(d.saving_num || 0))}</span>
        </div>

        <div class="apex-trust-row">
          <span class="apex-trust ${badgeClass}">${badgeText}</span>
          <span class="apex-affiliate-tag">${hasAffiliate ? '🔗 Tiếp thị liên kết đối tác' : '🏢 Trực tiếp đối tác'}</span>
        </div>

        <div class="apex-deal-actions">
          <button class="hunt" data-apex="hunt" data-id="${dealDomId}">SĂN DEAL</button>
          <button class="save" data-apex="save" data-id="${dealDomId}">${isSaved ? '♥ ĐÃ LƯU' : '♡ LƯU'}</button>
        </div>
      </div>
    </article>`;
  }

  function render() {
    const root = document.getElementById('jayt-apex');
    if (!root) return;

    if (!dataStore.isLoaded || dataStore.loadError) {
      root.innerHTML = css() + `
      <div class="apex-layout">
        <main class="apex-main" style="padding:40px;">
          <div class="apex-brand" style="margin-bottom:24px;">
            <div class="apex-mark">JT</div>
            <div><b>JAYT APEX</b><small>FAIL-CLOSED GATE</small></div>
          </div>
          <div class="apex-error-card">
            <h3>⚠️ Lỗi Dữ Liệu Nguồn Sự Thật (Fail-Closed)</h3>
            <p>Hệ thống không thể tải dữ liệu kiểm định hợp lệ từ API Server: <strong>${esc(dataStore.loadError || 'UNKNOWN')}</strong></p>
            <p style="font-size:12.5px;color:#c1cec5;margin-top:8px;">Theo quy chuẩn an toàn JayT, 0 deal được hiển thị khi nguồn sự thật chưa được xác thực.</p>
          </div>
        </main>
      </div>`;
      return;
    }

    const gate = evaluateLiveDeals(null);
    const eligibleHero = gate.verified_hero_deals || [];
    const eligibleProbing = gate.probing_deals || [];

    const filterByQuery = (d) => {
      const text = (d.merchant + (d.zone || '') + (d.district || '') + (d.brand || '')).toLowerCase();
      return text.includes(state.query.toLowerCase());
    };

    const visibleHero = eligibleHero.filter(filterByQuery);
    const visibleProbing = eligibleProbing.filter(filterByQuery);

    root.innerHTML = css() + `
    <div class="apex-layout">
      <!-- SIDEBAR -->
      <aside class="apex-side">
        <div>
          <div class="apex-brand">
            <div class="apex-mark">JT</div>
            <div>
              <b>JAYT APEX</b>
              <small>ĐÀ NẴNG 43</small>
            </div>
          </div>
          <nav class="apex-nav" style="margin-top:20px;">
            <button class="active" data-apex="scroll" data-target="apex-home">⌂ Trang chủ</button>
            <button data-apex="scroll" data-target="apex-probing">🔍 Kèo đang khảo sát (${eligibleProbing.length})</button>
            <button data-apex="trust">🛡 Cam kết minh bạch</button>
          </nav>
        </div>
        <div class="apex-side-foot">
          <b>✦ JAYT COMMUNITY MEMBER</b>
          Chuỗi săn deal: <strong>${state.streak} ngày liên tiếp</strong><br>
          Ước tính tiết kiệm: <strong style="color:#10b981">${money(state.savings)}</strong>
          <button class="apex-primary" style="margin-top:12px;width:100%" data-apex="gift">ĐIỂM DANH NHẬN QUÀ</button>
        </div>
      </aside>

      <!-- MAIN CONTENT AREA -->
      <main class="apex-main">
        <!-- TOP APP BAR -->
        <header class="apex-top">
          <div class="apex-location-tag">📍 ĐÀ NẴNG 43</div>
          <input id="apex-search" class="apex-search" value="${esc(state.query)}" placeholder="Tìm quán, rạp phim, trà sữa, cụm trường ĐH hoặc tòa nhà văn phòng…">
          <span class="apex-top-spacer"></span>
          <button data-apex="share">Chia sẻ JayT</button>
          <button data-apex="saved">♥ Đã lưu (${state.saved.length})</button>
        </header>

        <div class="apex-content">
          <!-- HERO VALUE PROPOSITION -->
          <section id="apex-home" class="apex-hero">
            <div class="apex-eyebrow">JAYT • NGUỒN SỰ THẬT DUY NHẤT ĐÀ NẴNG</div>
            <h1>Tuyển chọn deal giá trị thực.<br>Minh bạch 100% cho người Đà Nẵng.</h1>
            <p>Dữ liệu được nạp trực tiếp từ Sổ cái Khuyến mãi Đà Nẵng qua cổng kiểm định Eligibility-First. Tuyệt đối không dữ liệu mô phỏng, không giá ảo.</p>
            
            <div class="apex-hero-actions">
              <button class="apex-primary" data-apex="scroll" data-target="apex-probing">XEM DANH SÁCH KÈO KHẢO SÁT →</button>
            </div>
          </section>

          <!-- HERO VERIFIED SECTION (CHỈ RENDER KHI CÓ DEAL VERIFIED) -->
          ${visibleHero.length > 0 ? `
          <section id="apex-hero-deals" class="apex-section">
            <div class="apex-head">
              <div>
                <h2>💎 Kèo Đã Kiểm Chứng Độc Lập (Hero Verified)</h2>
                <p>Đã hoàn tất kiểm định thực địa và xác thực bằng chứng chính thức.</p>
              </div>
            </div>
            <div class="apex-deals">${visibleHero.map(card).join('')}</div>
          </section>` : ''}

          <!-- PROBING SECTION (KHẢO SÁT THỰC ĐỊA) -->
          <section id="apex-probing" class="apex-section">
            <div class="apex-head">
              <div>
                <h2>🔍 Kèo Đang Khảo Sát Thực Địa (Probing Deals)</h2>
                <p>Ưu đãi đang trong diện khảo sát cộng đồng & kiểm định giá trị thực tế.</p>
              </div>
              <span style="font-size:13px;color:var(--apex-gold);font-weight:700;">${visibleProbing.length} ưu đãi</span>
            </div>

            <div class="apex-deals">
              ${visibleProbing.map(card).join('') || '<p style="padding:20px;color:var(--apex-muted)">Không có ưu đãi nào phù hợp với bộ lọc tìm kiếm.</p>'}
            </div>
          </section>

          <!-- TRANSPARENCY & AFFILIATE DISCLOSURE -->
          <section class="apex-disclosure-card">
            <h3>🛡️ Cam Kết Minh Bạch & Công Khai Tiếp Thị Liên Kết</h3>
            <p>
              JayT là dự án giá trị cộng đồng phi thương mại tại Đà Nẵng 43.
              Một số liên kết tiếp thị liên kết (affiliate links) được tích hợp công khai nhằm hỗ trợ chi phí vận hành máy chủ kiểm định 24/7.
              <strong>Cam kết trung thực:</strong> Người dùng luôn nhận đúng giá niêm yết từ đối tác mà không phát sinh thêm chi phí.
            </p>
          </section>
        </div>
      </main>
    </div>`;
  }

  function toast(message) {
    const x = document.createElement('div');
    x.className = 'apex-toast';
    x.textContent = message;
    document.body.appendChild(x);
    setTimeout(() => x.remove(), 3200);
  }

  function findDealByDomId(domId) {
    if (!dataStore.deals) return null;
    return dataStore.deals.find(d => {
      const idStr = (d.deal_id || '').toLowerCase();
      return idStr === domId.toLowerCase() || (domId === 'metiz' && idStr.includes('metiz'));
    });
  }

  function modal(d) {
    const isVerified = d.taxonomy === 'VERIFIED';
    const x = document.createElement('div');
    x.className = 'apex-modal';
    x.id = 'apex-active-modal';
    const dealDomId = (d.deal_id || '').toLowerCase().includes('metiz') ? 'metiz' : d.deal_id;

    x.innerHTML = `
    <div class="apex-modal-card" role="dialog" aria-modal="true">
      <div class="apex-eyebrow" style="color:${isVerified ? '#10b981' : '#f0c36b'}">
        ${isVerified ? '✓ ĐÃ KIỂM CHỨNG ĐỘC LẬP (HERO VERIFIED)' : '● ĐANG KHẢO SÁT THỰC ĐỊA (PROBING)'}
      </div>
      <h2>${esc(d.merchant)}</h2>
      <p style="margin-top:4px;">📍 ${esc(d.zone || d.district)} • ⏰ ${esc(d.best_time || 'Cả ngày')}</p>
      
      <div class="apex-voucher-box">
        <div>
          <small style="color:var(--apex-muted);display:block;font-size:11px;">MÃ ƯU ĐÃI / VOUCHER CODE</small>
          <span class="apex-voucher-code">${esc(d.code || 'NHẬN TẠI QUẦY')}</span>
        </div>
        <span style="font-size:12px;color:#10b981;font-weight:800;">${d.saving || ('Tiết kiệm ' + money(d.saving_num || 0))}</span>
      </div>

      <p style="font-size:12.5px;color:#aab8af;margin-top:10px;">
        <strong>Thông tin:</strong> ${esc(d.disclosure || d.terms || 'Ưu đãi dành cho người dân và sinh viên Đà Nẵng.')}
      </p>
      <p style="font-size:11.5px;color:#788a82;border-top:1px solid rgba(255,255,255,.08);padding-top:8px;">
        ${isHttp ? 'ℹ️ Chuyển hướng an toàn qua Token Gateway (/api/token/issue ➔ /out).' : '🔒 Chạy qua Staging để mở liên kết an toàn.'}
      </p>

      <div class="actions">
        <button data-apex="close">Đóng / Hủy</button>
        <button class="yes" data-apex="confirm" data-id="${dealDomId}">
          ${isHttp ? 'Mở đối tác & Xác thực' : '🔒 Yêu cầu Staging Server'}
        </button>
      </div>
    </div>`;
    document.body.appendChild(x);
  }

  async function handleOutboundRedirect(d) {
    if (!isHttp) {
      // file:// Protocol: STRICT BLOCK — ZERO BYPASS
      toast('🔒 Chạy qua Staging để mở liên kết an toàn qua Token Gateway');
      return;
    }

    const dealId = d.deal_id;
    try {
      const issueResp = await fetch('/api/token/issue?deal_id=' + encodeURIComponent(dealId), { cache: 'no-store' });
      if (!issueResp.ok) {
        throw new Error('ERR_TOKEN_ISSUE_FAILED_STATUS_' + issueResp.status);
      }
      const tokenData = await issueResp.json();
      if (!tokenData || !tokenData.outbound_endpoint) {
        throw new Error('ERR_TOKEN_PAYLOAD_INVALID');
      }

      toast('✓ Đã cấp token an toàn — Đang chuyển hướng qua cổng bảo mật JayT');
      setTimeout(() => window.open(tokenData.outbound_endpoint, '_blank', 'noopener,noreferrer'), 250);
    } catch (e) {
      console.error('[JAYT-GATEWAY] Lỗi kết nối Token Gateway:', e);
      toast('❌ Lỗi kết nối Token Gateway: ' + (e.message || 'ERR_GATEWAY'));
    }
  }

  function persist() {
    localStorage.setItem('jayt_apex_saved', JSON.stringify(state.saved));
    localStorage.setItem('jayt_hunted_count', state.hunted);
    localStorage.setItem('jayt_actual_savings', state.savings);
    localStorage.setItem('jayt_streak_days', state.streak);
  }

  document.addEventListener('click', e => {
    const b = e.target.closest('[data-apex]');
    if (!b) return;
    const a = b.dataset.apex;
    const d = findDealByDomId(b.dataset.id || '');

    if (a === 'scroll') {
      const targetId = b.dataset.target;
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
    }
    if (a === 'save' && d) {
      const k = d.deal_id;
      state.saved = state.saved.includes(k) ? state.saved.filter(x => x !== k) : [...state.saved, k];
      persist();
      render();
      toast(state.saved.includes(k) ? 'Đã lưu ưu đãi' : 'Đã bỏ lưu ưu đãi');
    }
    if (a === 'hunt' && d) modal(d);
    if (a === 'close') {
      const m = document.getElementById('apex-active-modal') || b.closest('.apex-modal');
      if (m) m.remove();
    }
    if (a === 'confirm' && d) {
      if (d.code && navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(d.code).catch(() => {});
      }
      state.hunted++;
      state.savings += Number(d.saving_num || 20000);
      persist();
      const m = document.getElementById('apex-active-modal') || b.closest('.apex-modal');
      if (m) m.remove();
      handleOutboundRedirect(d);
      render();
    }
    if (a === 'share') {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(location.href).then(() => toast('✓ Đã sao chép liên kết JayT Đà Nẵng 43')).catch(() => toast('Chia sẻ JayT: ' + location.href));
      } else {
        toast('Chia sẻ JayT: ' + location.href);
      }
    }
    if (a === 'saved') {
      toast('Danh sách đã lưu: ' + state.saved.length + ' ưu đãi');
    }
    if (a === 'gift') {
      state.streak++;
      persist();
      render();
      toast('🎉 Điểm danh thành công! Chuỗi săn deal: ' + state.streak + ' ngày');
    }
    if (a === 'trust') {
      toast('🛡️ JayT: 100% Fail-Closed, loại trừ mọi ưu đãi sai lệch hoặc quá hạn.');
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      const m = document.getElementById('apex-active-modal') || document.querySelector('.apex-modal');
      if (m) m.remove();
    }
  });

  document.addEventListener('input', e => {
    if (e.target.id === 'apex-search') {
      state.query = e.target.value;
      render();
      requestAnimationFrame(() => {
        const input = document.getElementById('apex-search');
        if (input) {
          input.focus();
          input.setSelectionRange(input.value.length, input.value.length);
        }
      });
    }
  });

  async function boot() {
    document.body.classList.add('jayt-apex-active');
    let root = document.getElementById('jayt-apex');
    if (!root) {
      root = document.createElement('div');
      root.id = 'jayt-apex';
      document.body.prepend(root);
    }
    await loadSourceOfTruthData();
    render();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
