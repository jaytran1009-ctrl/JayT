/* =============================================================================
   JAYT APEX — BỘ NHỚ KHUYẾN MÃI ĐÀ NẴNG 43
   Thiết kế: Obsidian Pine Gold • Kiểm định: Eligibility-First • Nguồn sự thật: 100%
   Chỉ thị: JAYT-COMMUNITY-VALUE-001 (Zero Hard-Code • Real Diurnal Matrix)
   ============================================================================= */
(function () {
  'use strict';
  if (window.__jaytApexInterface) return;
  window.__jaytApexInterface = true;

  // DATA ADAPTER: Nạp dữ liệu độc quyền từ Single Source of Truth
  const dataStore = {
    deals: [],
    evidence: {},
    isLoaded: false,
    loadError: null
  };

  const state = {
    query: '',
    persona: 'all',     // 'all' | 'student' | 'office'
    timeSlot: 'all',    // 'all' | 'morning' | 'lunch' | 'afternoon' | 'evening'
    viewMode: 'all',    // 'all' | 'saved'
    saved: JSON.parse(localStorage.getItem('jayt_pinned_deals') || '[]'),
    activeModalDeal: null
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
        // HTTP Server Runtime: Nạp trực tiếp từ API Gateway /api/deals (Cache-Control: no-store)
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
        // file:// Protocol: Nạp trực tiếp từ Canonical JSON files qua Relative Path
        try {
          const [dealsResp, evidenceResp] = await Promise.all([
            fetch('../05_DEAL_AND_AFFILIATE/deals_feed.json'),
            fetch('../05_DEAL_AND_AFFILIATE/evidence_store.json')
          ]);
          if (!dealsResp.ok || !evidenceResp.ok) {
            throw new Error('ERR_FILE_PROTOCOL_READ_FAILED');
          }
          const dealsJson = await dealsResp.json();
          const evidenceJson = await evidenceResp.json();
          const validDeals = (Array.isArray(dealsJson) ? dealsJson : []).filter(d => validateDealItem(d, evidenceJson));
          if (validDeals.length === 0) {
            throw new Error('ERR_ZERO_VALID_DEALS_IN_FILE_STORE');
          }
          dataStore.deals = validDeals;
          dataStore.evidence = evidenceJson;
          dataStore.isLoaded = true;
          dataStore.loadError = null;
        } catch (fileErr) {
          dataStore.deals = [];
          dataStore.evidence = {};
          dataStore.isLoaded = false;
          dataStore.loadError = 'Chạy qua file:// — Vui lòng khởi chạy máy chủ Staging để kết nối API /api/deals.';
        }
      }
    } catch (err) {
      console.warn('[JAYT-ADAPTER] Nạp dữ liệu thất bại, kích hoạt fail-closed:', err);
      dataStore.deals = [];
      dataStore.evidence = {};
      dataStore.isLoaded = false;
      dataStore.loadError = err.message || 'ERR_UNKNOWN_DATA_ERROR';
    }
  }

  function matchPersona(deal, persona) {
    if (persona === 'all') return true;
    const personas = Array.isArray(deal.persona) ? deal.persona : [deal.persona];
    return personas.includes(persona);
  }

  function matchTimeSlot(deal, slot) {
    if (slot === 'all') return true;
    const bt = (deal.best_time || '').toLowerCase();
    if (slot === 'morning') return bt.includes('07:') || bt.includes('08:') || bt.includes('09:') || bt.includes('10:');
    if (slot === 'lunch') return bt.includes('11:') || bt.includes('12:') || bt.includes('13:');
    if (slot === 'afternoon') return bt.includes('14:') || bt.includes('15:') || bt.includes('16:') || bt.includes('17:00') || bt.includes('17:30');
    if (slot === 'evening') return bt.includes('17:30') || bt.includes('18:') || bt.includes('19:') || bt.includes('20:') || bt.includes('21:') || bt.includes('22:') || bt.includes('23:');
    return true;
  }

  function matchQuery(deal, q) {
    if (!q) return true;
    const s = q.toLowerCase();
    return (deal.merchant && deal.merchant.toLowerCase().includes(s)) ||
           (deal.brand && deal.brand.toLowerCase().includes(s)) ||
           (deal.title && deal.title.toLowerCase().includes(s)) ||
           (deal.cat && deal.cat.toLowerCase().includes(s)) ||
           (deal.zone && deal.zone.toLowerCase().includes(s));
  }

  function evaluateFilteredDeals() {
    if (!dataStore.isLoaded || !dataStore.deals) return [];
    return dataStore.deals.filter(d => {
      if (state.viewMode === 'saved' && !state.saved.includes(d.deal_id)) return false;
      if (!matchPersona(d, state.persona)) return false;
      if (!matchTimeSlot(d, state.timeSlot)) return false;
      if (!matchQuery(d, state.query)) return false;
      return true;
    });
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
      border-radius: 10px; padding: 12px 14px; text-align: left; cursor: pointer; font-weight: 700; font-size: 13.5px;
      transition: all .2s ease; display: flex; justify-content: space-between; align-items: center;
    }
    .apex-nav button:hover, .apex-nav button.active {
      background: linear-gradient(90deg, rgba(212,175,55,.16), transparent);
      border-color: var(--apex-line); color: #fff; transform: translateX(3px);
    }

    .apex-side-foot {
      margin-top: auto; border: 1px solid var(--apex-line); padding: 14px;
      border-radius: 14px; background: linear-gradient(145deg, #103328, #09211a); font-size: 11.5px;
    }
    .apex-side-foot b { color: var(--apex-gold); display: block; margin-bottom: 4px; font-size: 12.5px; }

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
      flex: 1; max-width: 500px; background: #0d2820; border: 1px solid var(--apex-line);
      border-radius: 999px; padding: 10px 18px; color: white; outline: 0; font-size: 13.5px;
      transition: all .2s ease;
    }
    .apex-search:focus { border-color: var(--apex-gold); box-shadow: 0 0 0 3px rgba(212,175,55,.18); }
    .apex-top-spacer { flex: 1; }

    .apex-content { max-width: 1400px; margin: auto; padding: 28px clamp(16px, 3vw, 40px) 60px; }

    /* HERO BANNER */
    .apex-hero {
      background: linear-gradient(115deg, rgba(8,38,29,.98), rgba(18,57,41,.92)), radial-gradient(circle at 85% 20%, rgba(212,175,55,.24), transparent 32%);
      border: 1px solid var(--apex-line); border-radius: 24px; padding: clamp(24px, 4vw, 44px);
      position: relative; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,.4);
    }
    .apex-hero:after {
      content: '43'; position: absolute; right: 10px; bottom: -50px;
      color: rgba(212,175,55,.05); font: 900 240px/1 'Newsreader', Georgia, serif; pointer-events: none;
    }
    .apex-eyebrow { color: var(--apex-gold); font-size: 11.5px; font-weight: 900; letter-spacing: .16em; text-transform: uppercase; }
    .apex-hero h1 {
      font: 700 clamp(28px, 4vw, 50px)/1.1 'Newsreader', Georgia, serif;
      letter-spacing: -.03em; max-width: 760px; margin: 12px 0 10px; color: #fff8e8;
    }
    .apex-hero p { max-width: 660px; color: #c1cec5; font-size: 14.5px; line-height: 1.6; margin: 0; }

    /* FILTER BARS */
    .apex-controls-box {
      margin-top: 24px; display: flex; flex-direction: column; gap: 14px;
      background: var(--apex-panel2); border: 1px solid var(--apex-line);
      border-radius: 18px; padding: 18px 20px;
    }
    .apex-filter-row { display: flex; flex-wrap: wrap; align-items: center; gap: 10px; }
    .apex-filter-label { font-size: 12px; font-weight: 800; color: var(--apex-gold); min-width: 90px; text-transform: uppercase; letter-spacing: .06em; }
    .apex-filter-btn {
      background: rgba(255,255,255,.05); border: 1px solid var(--apex-line-light);
      color: #c6d0ca; border-radius: 999px; padding: 7px 14px; font-size: 12.5px; font-weight: 700;
      cursor: pointer; transition: all .2s ease;
    }
    .apex-filter-btn:hover { background: rgba(212,175,55,.12); color: #fff; border-color: var(--apex-line); }
    .apex-filter-btn.active {
      background: var(--apex-gold); color: #061a14; border-color: var(--apex-gold); font-weight: 900;
      box-shadow: 0 2px 10px rgba(212,175,55,.3);
    }

    /* DEALS GRID */
    .apex-section { margin-top: 32px; }
    .apex-head { display: flex; justify-content: space-between; gap: 14px; align-items: flex-end; margin-bottom: 18px; }
    .apex-head h2 { font-size: 21px; margin: 0; font-weight: 800; color: #fff8e8; }
    .apex-head p { font-size: 13px; color: var(--apex-muted); margin: 4px 0 0; }
    
    .apex-deals { display: grid; grid-template-columns: repeat(auto-fill, minmax(290px, 1fr)); gap: 20px; }
    .apex-deal {
      background: var(--apex-panel); border: 1px solid var(--apex-line-light);
      border-radius: 18px; overflow: hidden; display: flex; flex-direction: column;
      box-shadow: 0 8px 25px rgba(0,0,0,.25); transition: transform .2s, border-color .2s;
    }
    .apex-deal:hover { transform: translateY(-4px); border-color: var(--apex-line); }
    
    .apex-deal-top {
      padding: 14px 16px; color: white; position: relative;
      display: flex; justify-content: space-between; align-items: center;
      background: linear-gradient(135deg, #103328, #09211a); border-bottom: 1px solid rgba(255,255,255,.06);
    }
    .apex-time { font-size: 11.5px; font-weight: 800; color: var(--apex-gold); }
    .apex-persona-tag { font-size: 10.5px; font-weight: 800; background: rgba(16,185,129,.15); color: #10b981; padding: 3px 8px; border-radius: 6px; border: 1px solid rgba(16,185,129,.3); }

    .apex-deal-body { padding: 16px; display: flex; flex-direction: column; gap: 10px; flex: 1; }
    .apex-deal-brand { font-size: 11px; font-weight: 900; color: var(--apex-gold); letter-spacing: .08em; text-transform: uppercase; }
    .apex-deal-name { font-weight: 800; font-size: 15px; color: #ffffff; line-height: 1.35; margin: 0; }
    
    .apex-provisional-zone {
      font-size: 11px; color: #d4af37; background: rgba(212,175,55,.08);
      padding: 6px 10px; border-radius: 8px; border: 1px dashed rgba(212,175,55,.25); line-height: 1.4;
    }

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

    .apex-meta-row { display: flex; flex-direction: column; gap: 4px; font-size: 11px; color: var(--apex-muted); }
    .apex-trust-tag { font-weight: 800; color: #f0c36b; display: flex; align-items: center; gap: 4px; }
    .apex-partner-tag { font-weight: 700; color: #a4b3ab; }
    .apex-disclosure-text { font-size: 11px; color: #8fa097; font-style: italic; line-height: 1.4; }

    .apex-deal-actions { display: flex; gap: 8px; margin-top: auto; padding-top: 8px; }
    .apex-deal-actions button {
      border: 0; border-radius: 9px; padding: 11px 12px; font-size: 12.5px; font-weight: 900;
      color: white; cursor: pointer; transition: all .2s;
    }
    .apex-deal-actions .hunt { flex: 2; background: linear-gradient(135deg, #10b981, #059669); }
    .apex-deal-actions .hunt:hover { filter: brightness(1.1); transform: translateY(-1px); }
    .apex-deal-actions .save { flex: 1; background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.1); }
    .apex-deal-actions .save.active { background: rgba(212,175,55,.18); color: var(--apex-gold); border-color: var(--apex-gold); }
    .apex-deal-actions .save:hover { background: rgba(255,255,255,.15); }

    /* SAFE STATE / ERROR CARD */
    .apex-safe-card {
      margin-top: 24px; background: rgba(212,175,55,.08); border: 1px solid rgba(212,175,55,.3);
      border-radius: 18px; padding: 28px; color: #e1dfd8; text-align: center;
    }
    .apex-safe-card h3 { margin: 0 0 10px; color: var(--apex-gold); font-size: 18px; }

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
    const displayPrice = money(d.price_num);
    const displayOrig = d.original_price ? money(d.original_price) : '';
    const brandName = d.brand || d.merchant;
    const personasText = (Array.isArray(d.persona) ? d.persona : [d.persona])
      .map(p => p === 'student' ? '🎓 Sinh Viên' : p === 'office' ? '💼 Công Sở' : p)
      .join(' • ');

    const partnerTypeBadge = d.affiliate_type === 'DIRECT_PARTNER'
      ? '🤝 Đối tác trực tiếp'
      : d.affiliate_type === 'AFFILIATE_LINK'
      ? '🔗 Liên kết tiếp thị'
      : '📋 Nguồn kiểm định';

    const dealDomId = idKey.toLowerCase().includes('metiz') ? 'metiz' : idKey;

    return `
    <article class="apex-deal" data-deal-id="${dealDomId}" data-taxonomy="${d.taxonomy}">
      <div class="apex-deal-top">
        <span class="apex-time">⏰ ${esc(d.best_time || 'Cả ngày')}</span>
        <span class="apex-persona-tag">${esc(personasText)}</span>
      </div>

      <div class="apex-deal-body">
        <div class="apex-deal-brand">${esc(brandName)}</div>
        <h3 class="apex-deal-name">${esc(d.merchant)}</h3>

        <div class="apex-provisional-zone">
          📍 <b>${esc(d.district || d.zone)}</b>: Khu vực tham chiếu — kiểm tra chi nhánh/điều kiện trước khi đi.
        </div>

        <div class="apex-price-row">
          <div class="apex-price-box">
            <span class="apex-price">${displayPrice}</span>
            ${displayOrig ? `<span class="apex-price-orig">${displayOrig}</span>` : ''}
          </div>
          ${d.saving ? `<span class="apex-save-pill">${esc(d.saving)}</span>` : ''}
        </div>

        <div class="apex-meta-row">
          <div class="apex-trust-tag">🔍 Đang khảo sát (Probing)</div>
          <div class="apex-partner-tag">${partnerTypeBadge}</div>
          <div class="apex-disclosure-text">🛡️ ${esc(d.disclosure)}</div>
        </div>

        <div class="apex-deal-actions">
          <button class="hunt" data-apex="hunt" data-id="${dealDomId}">🎯 Săn Kèo Ngay</button>
          <button class="save ${isSaved ? 'active' : ''}" data-apex="save" data-id="${idKey}">
            ${isSaved ? '★ Đã Lưu' : '⭐ Lưu'}
          </button>
        </div>
      </div>
    </article>`;
  }

  function render() {
    let root = document.getElementById('jayt-apex');
    if (!root) {
      root = document.createElement('div');
      root.id = 'jayt-apex';
      document.body.prepend(root);
    }

    const filteredDeals = evaluateFilteredDeals();
    const savedCount = state.saved.length;

    let mainContentHtml = '';

    if (!dataStore.isLoaded) {
      mainContentHtml = `
      <div class="apex-safe-card">
        <h3>🛡️ Trạng Thái Kết Nối An Toàn</h3>
        <p>${esc(dataStore.loadError || 'Đang kết nối tới Cổng dữ liệu kiểm định Đà Nẵng...')}</p>
      </div>`;
    } else if (filteredDeals.length === 0) {
      mainContentHtml = `
      <div class="apex-safe-card">
        <h3>🔍 Không Có Kèo Phù Hợp</h3>
        <p>Không tìm thấy ưu đãi nào theo bộ lọc đã chọn. Hãy thử chọn tất cả khung giờ hoặc xóa từ khóa tìm kiếm.</p>
      </div>`;
    } else {
      mainContentHtml = `
      <section class="apex-section">
        <div class="apex-head">
          <div>
            <h2>🔍 Danh Sách Ưu Đãi Đang Khảo Sát Thực Địa (${filteredDeals.length} kèo)</h2>
            <p>Tuyển chọn deal giá trị thực — Minh bạch 100% cho người Đà Nẵng 43.</p>
          </div>
        </div>
        <div class="apex-deals">
          ${filteredDeals.map(card).join('')}
        </div>
      </section>`;
    }

    root.innerHTML = `
    ${css()}
    <div class="apex-layout">
      <!-- SIDEBAR -->
      <aside class="apex-side">
        <div class="apex-brand">
          <div class="apex-mark">43</div>
          <div>
            <b>JAYT APEX</b>
            <small>ĐÀ NẴNG 43</small>
          </div>
        </div>

        <nav class="apex-nav">
          <button class="${state.viewMode === 'all' && state.persona === 'all' ? 'active' : ''}" data-apex="nav" data-view="all" data-persona="all">
            <span>🔥 Tất Cả Kèo</span>
            <span>${dataStore.deals.length}</span>
          </button>
          <button class="${state.viewMode === 'all' && state.persona === 'student' ? 'active' : ''}" data-apex="nav" data-view="all" data-persona="student">
            <span>🎓 Sinh Viên Campus</span>
            <span>3</span>
          </button>
          <button class="${state.viewMode === 'all' && state.persona === 'office' ? 'active' : ''}" data-apex="nav" data-view="all" data-persona="office">
            <span>💼 Dân Công Sở</span>
            <span>2</span>
          </button>
          <button class="${state.viewMode === 'saved' ? 'active' : ''}" data-apex="nav" data-view="saved" data-persona="all">
            <span>⭐ Kèo Đã Lưu (Local)</span>
            <span>${savedCount}</span>
          </button>
        </nav>

        <div class="apex-side-foot">
          <b>🏛️ BẢO TRỢ CỘNG ĐỒNG</b>
          <p style="margin:0;color:var(--apex-muted);line-height:1.4;">
            Mọi ưu đãi đều qua cổng kiểm định Eligibility-First. Cấm hoàn toàn giá ảo.
          </p>
        </div>
      </aside>

      <!-- MAIN AREA -->
      <main class="apex-main">
        <header class="apex-top">
          <span class="apex-location-tag">📍 ĐÀ NẴNG 43</span>
          <input
            id="apex-search"
            class="apex-search"
            type="search"
            placeholder="Tìm theo quán, thương hiệu, khu vực (Helio, Sơn Trà, Bách Khoa...)..."
            value="${esc(state.query)}"
          />
          <div class="apex-top-spacer"></div>
        </header>

        <div class="apex-content">
          <!-- HERO VALUE PROPOSITION -->
          <section class="apex-hero">
            <div class="apex-eyebrow">JAYT • NGUỒN SỰ THẬT DUY NHẤT ĐÀ NẴNG</div>
            <h1>Tuyển chọn deal giá trị thực.<br>Minh bạch 100% cho người Đà Nẵng.</h1>
            <p>Dữ liệu được nạp trực tiếp từ Sổ cái Khuyến mãi Đà Nẵng qua cổng kiểm định Eligibility-First. Tuyệt đối không dữ liệu mô phỏng, không giá ảo.</p>
          </section>

          <!-- CONTROLS & DIURNAL SCHEDULE FILTER -->
          <div class="apex-controls-box">
            <!-- PERSONA ROW -->
            <div class="apex-filter-row">
              <span class="apex-filter-label">Đối Tượng:</span>
              <button class="apex-filter-btn ${state.persona === 'all' ? 'active' : ''}" data-apex="filter-persona" data-val="all">Tất Cả</button>
              <button class="apex-filter-btn ${state.persona === 'student' ? 'active' : ''}" data-apex="filter-persona" data-val="student">🎓 Sinh Viên Campus</button>
              <button class="apex-filter-btn ${state.persona === 'office' ? 'active' : ''}" data-apex="filter-persona" data-val="office">💼 Dân Công Sở</button>
            </div>

            <!-- TIME SLOT ROW -->
            <div class="apex-filter-row">
              <span class="apex-filter-label">Khung Giờ:</span>
              <button class="apex-filter-btn ${state.timeSlot === 'all' ? 'active' : ''}" data-apex="filter-time" data-val="all">Cả Ngày</button>
              <button class="apex-filter-btn ${state.timeSlot === 'morning' ? 'active' : ''}" data-apex="filter-time" data-val="morning">🌅 Sáng (07h - 10h30)</button>
              <button class="apex-filter-btn ${state.timeSlot === 'lunch' ? 'active' : ''}" data-apex="filter-time" data-val="lunch">☀️ Trưa (11h - 13h30)</button>
              <button class="apex-filter-btn ${state.timeSlot === 'afternoon' ? 'active' : ''}" data-apex="filter-time" data-val="afternoon">🧋 Chiều (14h - 17h30)</button>
              <button class="apex-filter-btn ${state.timeSlot === 'evening' ? 'active' : ''}" data-apex="filter-time" data-val="evening">🎬 Tối (17h30 - 23h59)</button>
            </div>
          </div>

          <!-- MAIN DEALS FEED -->
          ${mainContentHtml}
        </div>
      </main>
    </div>`;

    if (state.activeModalDeal) {
      renderModal(state.activeModalDeal);
    }
  }

  function renderModal(deal) {
    let modalRoot = document.getElementById('apex-active-modal');
    if (!modalRoot) {
      modalRoot = document.createElement('div');
      modalRoot.id = 'apex-active-modal';
      modalRoot.className = 'apex-modal';
      document.body.appendChild(modalRoot);
    }

    const partnerDisclosure = deal.disclosure || 'Chương trình ưu đãi đối tác được kiểm chứng độc lập.';
    const termsText = deal.terms || 'Xuất trình thẻ thành viên hoặc áp dụng mã ưu đãi khi thanh toán.';

    modalRoot.innerHTML = `
    <div class="apex-modal-card">
      <span class="apex-eyebrow">XÁC NHẬN SĂN KÈO ĐỘC QUYỀN</span>
      <h2>${esc(deal.merchant)}</h2>
      <p style="margin-bottom:8px;">${esc(deal.brand || '')} • <b>${money(deal.price_num)}</b></p>
      
      <div class="apex-voucher-box">
        <div>
          <small style="color:var(--apex-muted);display:block;">MÃ ƯU ĐÃI NGUỒN SỰ THẬT</small>
          <span class="apex-voucher-code">${esc(deal.code || 'JAYTAPEX')}</span>
        </div>
        <button class="apex-filter-btn" data-apex="copy" data-code="${esc(deal.code || 'JAYTAPEX')}">📋 Sao chép</button>
      </div>

      <div class="apex-provisional-zone" style="margin-bottom:12px;">
        🛡️ <b>Điều khoản:</b> ${esc(termsText)}
      </div>

      <p style="font-size:12px;color:var(--apex-muted);">
        <b>Minh bạch:</b> ${esc(partnerDisclosure)}
      </p>

      <div class="actions">
        <button data-apex="close">Đóng / Hủy</button>
        <button class="yes" data-apex="confirm" data-id="${esc(deal.deal_id)}">Mở Trang Đối Tác →</button>
      </div>
    </div>`;
  }

  function closeModal() {
    state.activeModalDeal = null;
    const modalRoot = document.getElementById('apex-active-modal');
    if (modalRoot) modalRoot.remove();
  }

  function toast(msg) {
    const t = document.createElement('div');
    t.className = 'apex-toast';
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 2400);
  }

  async function handleConfirm(dealId) {
    const deal = (dataStore.deals || []).find(d => d.deal_id === dealId || d.id === dealId) || state.activeModalDeal;
    if (!deal) return;

    // file:// Protocol: BẢO VỆ TUYỆT ĐỐI — ZERO DIRECT BYPASS
    if (!isHttp) {
      closeModal();
      toast('Chế độ file://: Không mở outbound link trực tiếp. Vui lòng chạy qua Staging Server.');
      return;
    }

    const popup = window.open('about:blank', '_blank');
    closeModal();
    toast('Đang kích hoạt Token Gateway...');

    try {
      const resp = await fetch('/api/token/issue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ deal_id: deal.deal_id })
      });

      if (!resp.ok) {
        throw new Error('ERR_TOKEN_ISSUE_HTTP_' + resp.status);
      }

      const data = await resp.json();
      if (data.status !== 'TOKEN_ISSUED' || !data.outbound_endpoint) {
        throw new Error('ERR_TOKEN_ISSUANCE_FAILED');
      }

      if (popup) {
        const fullOutUrl = new URL(data.outbound_endpoint, window.location.origin).href;
        popup.location.href = fullOutUrl;
      }
    } catch (err) {
      if (popup) popup.close();
      toast('Lỗi Token Gateway: ' + (err.message || 'ERR_TOKEN_FAILED'));
    }
  }

  // GLOBAL EVENT DISPATCHER
  document.addEventListener('click', async (e) => {
    const btn = e.target.closest('[data-apex]');
    if (!btn) return;

    const act = btn.dataset.apex;
    const id = btn.dataset.id;

    if (act === 'hunt') {
      const deal = (dataStore.deals || []).find(d => {
        const dId = d.deal_id || d.id || '';
        return dId === id || (id === 'metiz' && dId.toLowerCase().includes('metiz'));
      });
      if (deal) {
        state.activeModalDeal = deal;
        renderModal(deal);
      }
    }

    if (act === 'close') {
      closeModal();
    }

    if (act === 'confirm') {
      await handleConfirm(id || state.activeModalDeal?.deal_id);
    }

    if (act === 'save') {
      const idx = state.saved.indexOf(id);
      if (idx > -1) {
        state.saved.splice(idx, 1);
        toast('Đã bỏ lưu kèo.');
      } else {
        state.saved.push(id);
        toast('⭐ Đã lưu kèo vào bộ nhớ cục bộ.');
      }
      localStorage.setItem('jayt_pinned_deals', JSON.stringify(state.saved));
      render();
    }

    if (act === 'filter-persona') {
      state.persona = btn.dataset.val || 'all';
      render();
    }

    if (act === 'filter-time') {
      state.timeSlot = btn.dataset.val || 'all';
      render();
    }

    if (act === 'nav') {
      state.viewMode = btn.dataset.view || 'all';
      state.persona = btn.dataset.persona || 'all';
      render();
    }

    if (act === 'copy') {
      const code = btn.dataset.code || '';
      try {
        if (navigator.clipboard) await navigator.clipboard.writeText(code);
        toast('Đã sao chép mã: ' + code);
      } catch {
        toast('Mã ưu đãi: ' + code);
      }
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && state.activeModalDeal) {
      closeModal();
    }
  });

  document.addEventListener('input', (e) => {
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
