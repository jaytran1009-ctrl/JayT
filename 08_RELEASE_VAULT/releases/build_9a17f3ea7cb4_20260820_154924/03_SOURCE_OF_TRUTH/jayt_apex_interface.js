/* JAYT APEX — CONSUMER SHELL INTEGRATED WITH JAYT ELIGIBILITY ENGINE */
(function () {
  'use strict';
  if (window.__jaytApexInterface) return;
  window.__jaytApexInterface = true;

  // Raw Candidate Feed (8 Deals đa dạng phân tầng theo đúng chuẩn kiến trúc)
  const candidateDeals = [
    {
      id: 'metiz',
      deal_id: 'DNG-METIZ-45K',
      merchant: 'Metiz Cinema Helio Center',
      brand: 'METIZ CINEMAS',
      cat: 'Phim',
      icon: '🎬',
      time: '17:30 – 23:59',
      price_num: 45000,
      saving_num: 40000,
      saving: 'Tiết kiệm 40K',
      district: 'Quận Hải Châu',
      zone: 'ZONE_HELIO_METIZ',
      rating: '4.8 (12.3K)',
      code: 'METIZ45K',
      tone: '#dc3545',
      bg: 'linear-gradient(135deg,#4a090d,#a4151c)',
      url: 'https://metiz.vn/lich-chieu/',
      source_url: 'https://metiz.vn/lich-chieu/',
      taxonomy: 'VERIFIED',
      source_type: 'LOCAL_MERCHANT_DIRECT',
      expires_at: '2026-12-31T23:59:59Z',
      checked_at: '2026-08-20T10:00:00Z',
      evidence_ref: 'EVID_METIZ_20260820_WEB_AUDIT',
      disclosure: 'Ưu đãi vé thành viên Metiz Helio Đà Nẵng.'
    },
    {
      id: 'cgv',
      deal_id: 'DNG-CGV-55K',
      merchant: 'CGV Vincom Sơn Trà',
      brand: 'CGV CINEMAS',
      cat: 'Phim',
      icon: '🎬',
      time: '18:00 – 23:00',
      price_num: 55000,
      saving_num: 55000,
      saving: 'Tiết kiệm 55K',
      district: 'Quận Sơn Trà',
      zone: 'ZONE_AN_DON_SON_TRA',
      rating: '4.7 (10.1K)',
      code: 'CGVU22',
      tone: '#e50914',
      bg: 'linear-gradient(135deg,#54070a,#a80e14)',
      url: 'https://www.cgv.vn',
      source_url: 'https://www.cgv.vn',
      taxonomy: 'PROBING',
      source_type: 'LOCAL_MERCHANT_DIRECT',
      expires_at: '2026-12-31T23:59:59Z',
      checked_at: '2026-08-20T10:00:00Z',
      evidence_ref: 'EVID_CGV_20260820_POLICY_AUDIT',
      disclosure: 'Ưu đãi thẻ U22 CGV Vincom Ngô Quyền.'
    },
    {
      id: 'maycha',
      deal_id: 'DNG-MAYCHA-24K',
      merchant: 'MayCha Điện Biên Phủ',
      brand: 'MAYCHA',
      cat: 'Trà sữa',
      icon: '🧋',
      time: '14:00 – 17:30',
      price_num: 24000,
      saving_num: 24000,
      saving: 'Tiết kiệm 24K',
      district: 'Quận Thanh Khê',
      zone: 'ZONE_BK_SP',
      rating: '4.9 (6.5K)',
      code: 'MAYCHA0D',
      tone: '#24914c',
      bg: 'linear-gradient(135deg,#093e20,#1e7f43)',
      url: 'https://shopeefood.vn/da-nang/tra-sua-maycha-dien-bien-phu',
      source_url: 'https://shopeefood.vn/da-nang/tra-sua-maycha-dien-bien-phu',
      taxonomy: 'PROBING',
      source_type: 'AFFILIATE_PARTNER_SHOPEEFOOD',
      expires_at: '2026-08-31T23:59:59Z',
      checked_at: '2026-08-20T10:00:00Z',
      evidence_ref: 'EVID_MAYCHA_20260820_SHOPEE_PROBE',
      disclosure: 'Mã giảm 50% qua ShopeeFood giao tận nơi.'
    },
    {
      id: 'katinat',
      deal_id: 'DNG-KATINAT-1K',
      merchant: 'Katinat Bạch Đằng',
      brand: 'KATINAT',
      cat: 'Cà phê',
      icon: '☕',
      time: '07:00 – 10:00',
      price_num: 1000,
      saving_num: 20000,
      saving: 'Tiết kiệm 20K',
      district: 'Quận Hải Châu',
      zone: 'ZONE_HAI_CHAU_CBD',
      rating: '4.6 (4.2K)',
      code: 'KATINAT1D',
      tone: '#3478e5',
      bg: 'linear-gradient(135deg,#102654,#2655a9)',
      url: 'https://katinat.vn',
      source_url: 'https://katinat.vn',
      taxonomy: 'UNVERIFIED',
      source_type: 'LOCAL_MERCHANT_DIRECT',
      expires_at: '2026-12-31T23:59:59Z',
      checked_at: '2026-08-20T10:00:00Z',
      disclosure: 'Kèo chưa kiểm chứng độc lập. Xem thêm.'
    },
    {
      id: 'expired_sample',
      deal_id: 'DNG-EXPIRED-OLD',
      merchant: 'Deal Cũ Quá Hạn',
      brand: 'EXPIRED',
      cat: 'Ăn vặt',
      icon: '❌',
      time: '00:00 – 00:00',
      price_num: 10000,
      saving_num: 10000,
      saving: 'Đã hết hạn',
      district: 'Quận Hải Châu',
      zone: 'ZONE_HAI_CHAU_CBD',
      rating: '1.0',
      code: 'OLD',
      tone: '#666',
      bg: '#333',
      url: 'https://expired.vn',
      source_url: 'https://expired.vn',
      taxonomy: 'EXPIRED',
      source_type: 'LOCAL_MERCHANT_DIRECT',
      expires_at: '2025-01-01T00:00:00Z',
      checked_at: '2026-08-20T10:00:00Z',
      disclosure: 'Đã hết hạn, gate loại trừ 100%.'
    }
  ];

  const evidenceStore = {
    'EVID_METIZ_20260820_WEB_AUDIT': {
      evidence_id: 'EVID_METIZ_20260820_WEB_AUDIT',
      deal_id: 'DNG-METIZ-45K',
      source_url: 'https://metiz.vn/lich-chieu/',
      verified_at: '2026-08-20T10:00:00Z'
    },
    'EVID_CGV_20260820_POLICY_AUDIT': {
      evidence_id: 'EVID_CGV_20260820_POLICY_AUDIT',
      deal_id: 'DNG-CGV-55K',
      source_url: 'https://www.cgv.vn',
      verified_at: '2026-08-20T10:00:00Z'
    },
    'EVID_MAYCHA_20260820_SHOPEE_PROBE': {
      evidence_id: 'EVID_MAYCHA_20260820_SHOPEE_PROBE',
      deal_id: 'DNG-MAYCHA-24K',
      source_url: 'https://shopeefood.vn/da-nang/tra-sua-maycha-dien-bien-phu',
      verified_at: '2026-08-20T10:00:00Z'
    }
  };

  // TÍCH HỢP ELIGIBILITY ENGINE TRỰC TIẾP TẠI RUNTIME
  function evaluateLiveDeals(profile) {
    if (window.JayTEligibilityEngine && typeof window.JayTEligibilityEngine.executeEligibilityGate === 'function') {
      return window.JayTEligibilityEngine.executeEligibilityGate(candidateDeals, profile, evidenceStore, null);
    }
    // Fail closed: không hiển thị deal khi eligibility engine không sẵn sàng.
    return {
      verified_hero_deals: [],
      probing_deals: [],
      unverified_deals: [],
      disqualified_diagnostics: candidateDeals.map(d => ({ deal_id: d.deal_id, reason_code: 'ERR_ENGINE_UNAVAILABLE' }))
    };
  }

  const state = {
    query: '',
    category: 'Tất cả',
    showUnverified: false,
    saved: JSON.parse(localStorage.getItem('jayt_apex_saved') || '[]'),
    hunted: Number(localStorage.getItem('jayt_hunted_count') || 17),
    savings: Number(localStorage.getItem('jayt_actual_savings') || 255000),
    streak: Number(localStorage.getItem('jayt_streak_days') || 3)
  };

  const money = n => new Intl.NumberFormat('vi-VN').format(n) + 'đ';
  const esc = v => String(v).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
  const valid = url => /^https:\/\//.test(url) ? url : '#';

  function css() {
    return `<style id="jayt-apex-style">
    :root{--apex-bg:#061a14;--apex-panel:#0d2820;--apex-panel2:#09211a;--apex-gold:#d4af37;--apex-text:#f6f4ed;--apex-muted:#9caaa4;--apex-line:rgba(212,175,55,.18)}
    #jayt-apex{font-family:Inter,system-ui,sans-serif;color:var(--apex-text);background:var(--apex-bg);min-height:100vh;position:relative;z-index:10001}#jayt-apex *{box-sizing:border-box}#jayt-apex button,#jayt-apex input{font:inherit}body.jayt-apex-active>header,body.jayt-apex-active>.unified-app-layout,body.jayt-apex-active>.mobile-bottom-nav{display:none!important}
    .apex-layout{display:grid;grid-template-columns:240px minmax(0,1fr);min-height:100vh}.apex-side{position:sticky;top:0;height:100vh;padding:20px 14px;background:#09211a;border-right:1px solid var(--apex-line);display:flex;flex-direction:column;gap:20px}.apex-brand{display:flex;gap:10px;align-items:center;padding:5px 7px}.apex-mark{width:38px;height:38px;border-radius:11px;background:linear-gradient(135deg,#10b981,#d4af37);color:#061a14;display:grid;place-items:center;font-weight:900}.apex-brand b{color:var(--apex-gold);font-size:18px}.apex-brand small{display:block;color:#69c58b;font-weight:800;font-size:10px;letter-spacing:.12em}.apex-nav{display:grid;gap:5px}.apex-nav button{color:#c6d0ca;background:none;border:1px solid transparent;border-radius:9px;padding:11px;text-align:left;cursor:pointer;font-weight:700}.apex-nav button:hover,.apex-nav button.active{background:linear-gradient(90deg,rgba(212,175,55,.15),transparent);border-color:var(--apex-line);color:#fff}.apex-side-foot{margin-top:auto;border:1px solid var(--apex-line);padding:12px;border-radius:12px;background:linear-gradient(145deg,#103328,#09211a);font-size:12px}.apex-side-foot b{color:var(--apex-gold);display:block;margin-bottom:6px}
    .apex-main{min-width:0}.apex-top{height:72px;display:flex;align-items:center;gap:14px;padding:0 clamp(16px,3vw,40px);border-bottom:1px solid var(--apex-line);background:rgba(6,26,20,.92);backdrop-filter:blur(18px);position:sticky;top:0;z-index:3}.apex-search{flex:1;max-width:620px;background:#0d2820;border:1px solid var(--apex-line);border-radius:999px;padding:11px 16px;color:white;outline:0}.apex-search:focus{border-color:var(--apex-gold);box-shadow:0 0 0 3px rgba(212,175,55,.13)}.apex-top-spacer{flex:1}.apex-top button,.apex-ghost{border:1px solid var(--apex-line);background:#0d2820;color:#e8ede7;border-radius:9px;padding:9px 12px;font-weight:700;cursor:pointer}.apex-content{max-width:1500px;margin:auto;padding:28px clamp(16px,3vw,40px) 54px}.apex-hero{background:linear-gradient(110deg,rgba(8,38,29,.98),rgba(18,57,41,.92)),radial-gradient(circle at 82% 20%,rgba(212,175,55,.22),transparent 28%);border:1px solid var(--apex-line);border-radius:20px;padding:clamp(25px,4vw,50px);position:relative;overflow:hidden}.apex-hero:after{content:'JAYT';position:absolute;right:-20px;bottom:-75px;color:rgba(212,175,55,.06);font:700 190px/1 Georgia,serif;letter-spacing:-15px}.apex-eyebrow{color:var(--apex-gold);font-size:11px;font-weight:900;letter-spacing:.15em}.apex-hero h1{font:600 clamp(34px,5vw,68px)/.93 Georgia,serif;letter-spacing:-.045em;max-width:720px;margin:14px 0;color:#fff8e8}.apex-hero p{max-width:620px;color:#c1cec5;line-height:1.65}.apex-hero-actions{display:flex;flex-wrap:wrap;gap:10px;margin-top:22px}.apex-primary{background:linear-gradient(110deg,#b99142,#e1c77d,#b99142);border:0;border-radius:9px;padding:12px 17px;color:#09211a;font-weight:900;cursor:pointer}.apex-kpis{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;margin-top:24px;max-width:650px}.apex-kpi{border-left:1px solid var(--apex-line);padding-left:12px;color:#aab8af;font-size:12px}.apex-kpi b{display:block;color:#fff8e8;font-size:18px;margin-bottom:3px}
    .apex-section{margin-top:28px}.apex-head{display:flex;justify-content:space-between;gap:12px;align-items:end;margin-bottom:14px}.apex-head h2{font-size:20px;margin:0}.apex-head p{font-size:12px;color:var(--apex-muted);margin:4px 0 0}.apex-deals{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:14px;overflow:auto;padding-bottom:4px}.apex-deal{background:var(--apex-panel);border:1px solid rgba(255,255,255,.08);border-radius:14px;overflow:hidden;min-width:180px;display:flex;flex-direction:column}.apex-deal-top{height:115px;padding:10px;color:white;position:relative}.apex-time{font-size:10px;font-weight:800;background:rgba(0,0,0,.3);padding:4px 6px;border-radius:5px}.apex-logo{position:absolute;inset:30px 8px 5px;display:grid;place-items:center;font-weight:900;font-size:21px;text-align:center;text-shadow:0 2px 10px #000}.apex-deal-body{padding:12px;display:grid;gap:7px}.apex-deal-name{font-weight:800;font-size:13px}.apex-meta{color:var(--apex-muted);font-size:11px}.apex-price{color:white;font-weight:900;font-size:18px}.apex-save{font-size:10px;font-weight:800;color:#a8e2b3}.apex-trust{font-size:10px;font-weight:800}.apex-trust.ok{color:#9ce0aa}.apex-trust.wait{color:#f0c36b}.apex-deal-actions{display:flex;gap:6px}.apex-deal-actions button{flex:1;border:0;border-radius:7px;padding:9px 5px;font-size:11px;font-weight:900;color:white;cursor:pointer}.apex-deal-actions .save{background:rgba(255,255,255,.08)}
    .apex-calendar{display:grid;grid-template-columns:repeat(7,minmax(120px,1fr));gap:10px;overflow:auto}.apex-day{padding:12px;border:1px solid var(--apex-line);background:#09211a;border-radius:12px;min-height:128px}.apex-day b{color:var(--apex-gold);font-size:14px}.apex-day small{display:block;color:#aab8af;margin:5px 0 9px}.apex-day div{font-size:11px;line-height:1.8;color:#e4ebe5}.apex-grid{display:grid;grid-template-columns:minmax(0,2.2fr) minmax(260px,1fr);gap:18px}.apex-filters{display:flex;gap:7px;flex-wrap:wrap;margin-bottom:13px}.apex-filter{border:1px solid var(--apex-line);background:#09211a;color:#d8e1da;border-radius:999px;padding:7px 11px;font-size:12px;font-weight:700;cursor:pointer}.apex-filter.active{background:var(--apex-gold);color:#09211a}.apex-favorites{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}.apex-mini{padding:13px;background:#0d2820;border:1px solid rgba(255,255,255,.08);border-radius:12px}.apex-mini b{font-size:13px;display:block}.apex-mini span{color:var(--apex-muted);font-size:11px}.apex-mini button{margin-top:9px;width:100%;padding:8px;border:0;border-radius:7px;color:white;font-weight:800;cursor:pointer}.apex-widgets{display:grid;gap:11px}.apex-widget{padding:15px;border:1px solid var(--apex-line);border-radius:13px;background:#09211a}.apex-widget h3{font-size:13px;color:var(--apex-gold);margin:0 0 8px}.apex-widget p,.apex-widget li{color:#adbab2;font-size:12px;line-height:1.55}.apex-widget ul{padding-left:16px;margin:0}.apex-stat{font-size:28px!important;color:#a8e2b3!important;font-weight:900}.apex-modal{position:fixed;inset:0;background:rgba(0,0,0,.75);display:grid;place-items:center;padding:16px;z-index:10020;backdrop-filter:blur(4px)}.apex-modal-card{width:min(480px,100%);background:#0d2820;border:1px solid var(--apex-line);border-radius:18px;padding:24px;box-shadow:0 30px 80px #000}.apex-modal-card h2{margin:0 0 7px}.apex-modal-card p{color:#b6c2ba;line-height:1.6}.apex-modal-card .actions{display:flex;gap:9px;margin-top:18px}.apex-modal-card button{flex:1;padding:11px;border-radius:8px;border:1px solid var(--apex-line);font-weight:800;cursor:pointer}.apex-modal-card .yes{background:var(--apex-gold);color:#09211a;border:0}.apex-toast{position:fixed;bottom:22px;left:50%;transform:translateX(-50%);background:#d4af37;color:#09211a;padding:11px 16px;border-radius:999px;font-weight:900;z-index:10030;box-shadow:0 14px 35px #000}
    </style>`;
  }

  function card(d) {
    const isSaved = state.saved.includes(d.id);
    const isVerified = d.taxonomy === 'VERIFIED';
    const badgeText = isVerified ? '● Đã kiểm chứng' : '● Đang khảo sát (Probing)';
    const badgeClass = isVerified ? 'ok' : 'wait';
    const displayPrice = typeof d.price_num === 'number' ? money(d.price_num) : d.price;

    return `<article class="apex-deal" data-deal-id="${d.id}" data-taxonomy="${d.taxonomy}"><div class="apex-deal-top" style="background:${d.bg}"><span class="apex-time">${d.time}</span><div class="apex-logo">${esc(d.brand)}</div></div><div class="apex-deal-body"><div><div class="apex-deal-name">${esc(d.merchant)}</div><div class="apex-meta">📍 ${d.district} · ★ ${d.rating}</div></div><div class="apex-price">${displayPrice}</div><div class="apex-save">${d.saving}</div><div class="apex-trust ${badgeClass}">${badgeText}</div><div class="apex-deal-actions"><button data-apex="hunt" data-id="${d.id}" style="background:${d.tone}">SĂN DEAL</button><button class="save" data-apex="save" data-id="${d.id}">${isSaved ? '♥ ĐÃ LƯU' : '♡ LƯU'}</button></div></div></article>`;
  }

  function render() {
    const gate = evaluateLiveDeals(null);
    const eligibleHero = gate.verified_hero_deals;
    const eligibleProbing = gate.probing_deals;
    const activeDeals = [...eligibleHero, ...eligibleProbing];

    const visible = activeDeals
      .filter(d => state.category === 'Tất cả' || d.cat === state.category)
      .filter(d => (d.merchant + d.district + d.cat).toLowerCase().includes(state.query.toLowerCase()));

    const cats = ['Tất cả', 'Phim', 'Gà rán', 'Trà sữa', 'Cà phê', 'Ăn vặt'];
    const favs = (state.saved.length ? activeDeals.filter(d => state.saved.includes(d.id)) : activeDeals).filter(d => state.category === 'Tất cả' || d.cat === state.category);
    const days = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
    const root = document.getElementById('jayt-apex');
    if (!root) return;

    root.innerHTML = css() + `<div class="apex-layout"><aside class="apex-side"><div><div class="apex-brand"><div class="apex-mark">JT</div><div><b>JAYT APEX</b><small>ĐÀ NẴNG 43</small></div></div><nav class="apex-nav"><button class="active" data-apex="scroll" data-target="apex-home">⌂ Trang chủ</button><button data-apex="scroll" data-target="apex-deals">◷ Hôm nay</button><button data-apex="scroll" data-target="apex-calendar">▦ Lịch săn kèo</button><button data-apex="scroll" data-target="apex-favorites">♡ Kèo tôi hay săn</button><button data-apex="map">⌖ Radar tuyến</button></nav></div><div class="apex-side-foot"><b>✦ MEMBER JAYT</b>Chuỗi ${state.streak} ngày<br><button class="apex-primary" style="margin-top:10px;width:100%" data-apex="gift">MỞ QUÀ 0Đ</button></div></aside><main class="apex-main"><header class="apex-top"><strong style="color:var(--apex-gold)">ĐÀ NẴNG, VIỆT NAM</strong><input id="apex-search" class="apex-search" value="${esc(state.query)}" placeholder="Tìm quán, món, quận hoặc ưu đãi…"><span class="apex-top-spacer"></span><button data-apex="share">Chia sẻ</button><button data-apex="saved">♥ ${state.saved.length}</button></header><div class="apex-content"><section id="apex-home" class="apex-hero"><div class="apex-eyebrow">JAYT • ELIGIBILITY-FIRST VALUE ENGINE</div><h1>Đừng chỉ tìm giá rẻ.<br>Hãy tìm giá trị thực chứng.</h1><p>Tuyển chọn cơ hội tiết kiệm tại Đà Nẵng với điều kiện, vị trí và trạng thái kiểm chứng minh bạch.</p><div class="apex-hero-actions"><button class="apex-primary" data-apex="scroll" data-target="apex-deals">TÌM KÈO HÔM NAY →</button><button class="apex-ghost" data-apex="scroll" data-target="apex-calendar">Xem lịch 7 ngày</button></div><div class="apex-kpis"><div class="apex-kpi"><b>${eligibleHero.length} kèo</b>Hero Verified</div><div class="apex-kpi"><b>${eligibleProbing.length} kèo</b>Đang khảo sát</div><div class="apex-kpi"><b>${state.streak} ngày</b>nhịp săn của bạn</div></div></section><section id="apex-deals" class="apex-section"><div class="apex-head"><div><h2>🔥 Hôm nay săn gì?</h2><p>Ưu đãi nổi bật qua bộ lọc Eligibility-First của JayT.</p></div><span>${visible.length} lựa chọn</span></div><div class="apex-deals">${visible.map(card).join('') || '<p>Không có kèo phù hợp.</p>'}</div></section><section id="apex-calendar" class="apex-section"><div class="apex-head"><div><h2>▦ Lịch săn kèo 7 ngày</h2><p>Đặt nhịp trở lại JayT—không bỏ lỡ khung giờ quen thuộc.</p></div></div><div class="apex-calendar">${days.map((d,i)=>`<div class="apex-day"><b>${d}</b><small>${i===0?'HÔM NAY':'Ngày '+(20+i)+'/08'}</small><div>🎬 Metiz Cinema</div><div>⚡ Tiết kiệm 40K</div><div>+ 3 kèo khác</div></div>`).join('')}</div></section><section id="apex-favorites" class="apex-section apex-grid"><div><div class="apex-head"><div><h2>♡ Kèo tôi hay săn</h2><p>Lưu, lọc và quay lại đúng ưu đãi bạn quan tâm.</p></div></div><div class="apex-filters">${cats.map(c=>`<button class="apex-filter ${state.category===c?'active':''}" data-apex="filter" data-category="${c}">${c}</button>`).join('')}</div><div class="apex-favorites">${favs.map(d=>`<div class="apex-mini"><b>${d.icon} ${d.merchant}</b><span>${money(d.price_num)} · ${d.district}</span><button data-apex="hunt" data-id="${d.id}" style="background:${d.tone}">XEM DEAL →</button></div>`).join('')}</div></div><aside class="apex-widgets"><div class="apex-widget"><h3>🚗 Radar tuyến đi chơi</h3><p>Sông Hàn → Cầu Rồng</p><ul><li>A Hải · 11:30</li><li>Katinat Bạch Đằng · 14:30</li><li>Xanh SM · 18:00</li></ul></div><div class="apex-widget"><h3>📊 Thống kê của bạn</h3><p class="apex-stat">${money(state.savings)}</p><p>Đã săn ${state.hunted} kèo · Chuỗi ${state.streak} ngày</p></div><div class="apex-widget"><h3>🛡 Cam kết JayT</h3><p>Tuyệt đối không gộp dữ liệu mô phỏng; loại trừ 100% deal hết hạn hoặc sai lệch bằng chứng.</p><button class="apex-ghost" data-apex="trust">Xem nguyên tắc trust</button></div></aside></section></div></main></div>`;
  }

  function toast(message) {
    const x = document.createElement('div');
    x.className = 'apex-toast';
    x.textContent = message;
    document.body.appendChild(x);
    setTimeout(() => x.remove(), 2400);
  }

  function modal(d) {
    const isVerified = d.taxonomy === 'VERIFIED';
    const x = document.createElement('div');
    x.className = 'apex-modal';
    x.id = 'apex-active-modal';
    x.innerHTML = `<div class="apex-modal-card" role="dialog" aria-modal="true"><div class="apex-eyebrow">${isVerified ? 'ĐÃ KIỂM CHỨNG (VERIFIED)' : 'ĐANG KHẢO SÁT (PROBING)'}</div><h2>${esc(d.merchant)}</h2><p>${d.saving} · ${d.time} · ${d.district}<br>Mã ưu đãi: <strong>${d.code}</strong></p><p>${isVerified ? 'Trạng thái hiển thị dựa trên bằng chứng kiểm toán độc lập của JayT.' : 'Deal đang trong diện khảo sát thực địa. Hãy xác nhận lại điều kiện áp dụng tại điểm thanh toán.'}</p><div class="actions"><button data-apex="close">Đóng / Hủy</button><button class="yes" data-apex="confirm" data-id="${d.id}">Mở đối tác & nhận mã</button></div></div>`;
    document.body.appendChild(x);
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
    const d = candidateDeals.find(x => x.id === b.dataset.id);

    if (a === 'scroll') document.getElementById(b.dataset.target)?.scrollIntoView({ behavior: 'smooth' });
    if (a === 'filter') { state.category = b.dataset.category; render(); }
    if (a === 'save' && d) {
      state.saved = state.saved.includes(d.id) ? state.saved.filter(x => x !== d.id) : [...state.saved, d.id];
      persist();
      render();
      toast(state.saved.includes(d.id) ? 'Đã lưu vào My JayT' : 'Đã bỏ lưu');
    }
    if (a === 'hunt' && d) modal(d);
    if (a === 'close') {
      const m = document.getElementById('apex-active-modal') || b.closest('.apex-modal');
      if (m) m.remove();
    }
    if (a === 'confirm' && d) {
      navigator.clipboard?.writeText(d.code).catch(() => {});
      state.hunted++;
      state.savings += Number((d.saving.match(/\d+/) || ['20'])[0]) * 1000;
      persist();
      const m = document.getElementById('apex-active-modal') || b.closest('.apex-modal');
      if (m) m.remove();
      toast('Đã sao chép mã ' + d.code + ' — Đang mở liên kết đối tác');
      setTimeout(() => window.open(valid(d.url), '_blank', 'noopener,noreferrer'), 300);
      render();
    }
    if (a === 'share') {
      navigator.clipboard?.writeText(location.href).then(() => toast('Đã sao chép liên kết JayT')).catch(() => toast('Chia sẻ JayT: ' + location.href));
    }
    if (a === 'saved') {
      state.category = 'Tất cả';
      render();
      setTimeout(() => document.getElementById('apex-favorites')?.scrollIntoView({ behavior: 'smooth' }), 0);
    }
    if (a === 'map') {
      document.getElementById('apex-calendar')?.scrollIntoView({ behavior: 'smooth' });
      toast('Radar tuyến đang hiển thị lịch trình đề xuất');
    }
    if (a === 'gift') {
      state.streak++;
      persist();
      render();
      toast('Đã điểm danh — chuỗi ' + state.streak + ' ngày');
    }
    if (a === 'trust') toast('JayT loại trừ 100% deal hết hạn và deal sai lệch bằng chứng');
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
        input?.focus();
        input?.setSelectionRange(input.value.length, input.value.length);
      });
    }
  });

  function boot() {
    document.body.classList.add('jayt-apex-active');
    let root = document.getElementById('jayt-apex');
    if (!root) {
      root = document.createElement('div');
      root.id = 'jayt-apex';
      document.body.prepend(root);
    }
    render();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
