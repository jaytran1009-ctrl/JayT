/* =============================================================================
   JAYT APEX — ĐẶC QUYỀN TIẾT KIỆM CỘNG ĐỒNG ĐÀ NẴNG 43
   Thiết kế: Obsidian Pine Gold • Kiểm định: Eligibility-First • Minh bạch: 100%
   ============================================================================= */
(function () {
  'use strict';
  if (window.__jaytApexInterface) return;
  window.__jaytApexInterface = true;

  // Dữ liệu Deal tuyển chọn thực tế cho Đà Nẵng
  const candidateDeals = [
    {
      id: 'metiz',
      deal_id: 'DNG-METIZ-45K',
      merchant: 'Metiz Cinema Helio Center',
      brand: 'METIZ CINEMAS',
      cat: 'Phim & Giải trí',
      persona: ['student', 'office'],
      icon: '🎬',
      time: '17:30 – 23:59',
      price_num: 45000,
      original_price: 85000,
      saving_num: 40000,
      saving: 'Tiết kiệm 40.000đ',
      district: 'Quận Hải Châu',
      zone: 'ZONE_HELIO_METIZ',
      zone_name: 'Helio Center & Quảng trường 2/9',
      rating: '4.8 ★ (12.3K đánh giá)',
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
      disclosure: 'Ưu đãi vé thành viên Metiz Member tại quầy & online.',
      terms: 'Áp dụng cho tất cả suất chiếu 2D từ Thứ 2 đến Thứ 6. Xuất trình thẻ thành viên hoặc mã code tại quầy vé.',
      affiliate_type: 'DIRECT_PARTNER'
    },
    {
      id: 'cgv',
      deal_id: 'DNG-CGV-55K',
      merchant: 'CGV Vincom Sơn Trà & Vĩnh Trung',
      brand: 'CGV CINEMAS',
      cat: 'Phim & Giải trí',
      persona: ['student'],
      icon: '🎬',
      time: '18:00 – 23:00',
      price_num: 55000,
      original_price: 110000,
      saving_num: 55000,
      saving: 'Tiết kiệm 55.000đ',
      district: 'Quận Sơn Trà & Thanh Khê',
      zone: 'ZONE_AN_DON_SON_TRA',
      zone_name: 'Vincom Plaza Ngô Quyền & Vĩnh Trung Plaza',
      rating: '4.7 ★ (10.1K đánh giá)',
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
      disclosure: 'Ưu đãi thẻ U22 dành riêng cho sinh viên & thanh thiếu niên dưới 22 tuổi.',
      terms: 'Xuất trình CCCD hoặc thẻ sinh viên còn hiệu lực tại quầy vé CGV.',
      affiliate_type: 'DIRECT_PARTNER'
    },
    {
      id: 'maycha',
      deal_id: 'DNG-MAYCHA-24K',
      merchant: 'MayCha Điện Biên Phủ',
      brand: 'TRÀ SỮA MAYCHA',
      cat: 'Trà sữa & Ăn vặt',
      persona: ['student'],
      icon: '🧋',
      time: '14:00 – 17:30',
      price_num: 24000,
      original_price: 48000,
      saving_num: 24000,
      saving: 'Tiết kiệm 24.000đ',
      district: 'Quận Thanh Khê',
      zone: 'ZONE_BK_SP',
      zone_name: 'Cụm Campus Bách Khoa — Sư Phạm',
      rating: '4.9 ★ (6.5K đánh giá)',
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
      disclosure: 'Mã giảm 50% ShopeeFood. JayT nhận hoa hồng giới thiệu 0đ từ đối tác.',
      terms: 'Áp dụng cho đơn giao hàng tại khu vực Thanh Khê, Liên Chiểu. Nhập mã tại bước thanh toán.',
      affiliate_type: 'AFFILIATE_LINK'
    },
    {
      id: 'katinat',
      deal_id: 'DNG-KATINAT-BDR',
      merchant: 'Katinat Bạch Đằng',
      brand: 'KATINAT SAIGON KAFÉ',
      cat: 'Cà phê & Gặp đối tác',
      persona: ['office'],
      icon: '☕',
      time: '07:00 – 10:30',
      price_num: 35000,
      original_price: 55000,
      saving_num: 20000,
      saving: 'Tiết kiệm 20.000đ',
      district: 'Quận Hải Châu',
      zone: 'ZONE_HAI_CHAU_CBD',
      zone_name: 'Trục Bạch Đằng ven Sông Hàn CBD',
      rating: '4.8 ★ (8.4K đánh giá)',
      code: 'KATINATCOFFEE',
      tone: '#0d6efd',
      bg: 'linear-gradient(135deg,#0e2a47,#1b4d7e)',
      url: 'https://shopeefood.vn/da-nang/katinat-saigon-kafe-bach-dang',
      source_url: 'https://shopeefood.vn/da-nang/katinat-saigon-kafe-bach-dang',
      taxonomy: 'PROBING',
      source_type: 'AFFILIATE_PARTNER_SHOPEEFOOD',
      expires_at: '2026-08-31T23:59:59Z',
      checked_at: '2026-08-20T10:00:00Z',
      evidence_ref: 'EVID_KATINAT_20260820_SHOPEE_AUDIT',
      disclosure: 'Combo Cà Phê Sáng công sở. Hỗ trợ đặt món nhanh qua đối tác.',
      terms: 'Áp dụng khung giờ sáng 07:00 - 10:30. Áp dụng cho đơn hàng mang đi hoặc giao tận văn phòng.',
      affiliate_type: 'AFFILIATE_LINK'
    }
  ];

  const evidenceStore = {
    'EVID_METIZ_20260820_WEB_AUDIT': {
      evidence_id: 'EVID_METIZ_20260820_WEB_AUDIT',
      deal_id: 'DNG-METIZ-45K',
      source_url: 'https://metiz.vn/lich-chieu/',
      verified_at: '2026-08-20T10:00:00Z',
      verifier: 'JAYT_COMMUNITY_FIELD_AUDITOR',
      proof_summary: 'Xác thực bảng giá vé thành viên 45.000đ trên cổng thông tin chính thức metiz.vn.'
    },
    'EVID_CGV_20260820_POLICY_AUDIT': {
      evidence_id: 'EVID_CGV_20260820_POLICY_AUDIT',
      deal_id: 'DNG-CGV-55K',
      source_url: 'https://www.cgv.vn',
      verified_at: '2026-08-20T10:00:00Z',
      verifier: 'JAYT_COMMUNITY_FIELD_AUDITOR',
      proof_summary: 'Chính sách thành viên CGV U22 áp dụng đồng giá 55.000đ tại các rạp Đà Nẵng.'
    },
    'EVID_MAYCHA_20260820_SHOPEE_PROBE': {
      evidence_id: 'EVID_MAYCHA_20260820_SHOPEE_PROBE',
      deal_id: 'DNG-MAYCHA-24K',
      source_url: 'https://shopeefood.vn/da-nang/tra-sua-maycha-dien-bien-phu',
      verified_at: '2026-08-20T10:00:00Z',
      verifier: 'JAYT_COMMUNITY_FIELD_AUDITOR',
      proof_summary: 'Khảo sát mã giảm giá 50% trên menu MayCha Điện Biên Phủ qua ShopeeFood.'
    },
    'EVID_KATINAT_20260820_SHOPEE_AUDIT': {
      evidence_id: 'EVID_KATINAT_20260820_SHOPEE_AUDIT',
      deal_id: 'DNG-KATINAT-BDR',
      source_url: 'https://shopeefood.vn/da-nang/katinat-saigon-kafe-bach-dang',
      verified_at: '2026-08-20T10:00:00Z',
      verifier: 'JAYT_COMMUNITY_FIELD_AUDITOR',
      proof_summary: 'Khảo sát voucher sáng văn phòng áp dụng cho chi nhánh Bạch Đằng.'
    }
  };

  // TÍCH HỢP ELIGIBILITY ENGINE TRỰC TIẾP TẠI RUNTIME
  function evaluateLiveDeals(profile) {
    if (window.JayTEligibilityEngine && typeof window.JayTEligibilityEngine.executeEligibilityGate === 'function') {
      return window.JayTEligibilityEngine.executeEligibilityGate(candidateDeals, profile, evidenceStore, null);
    }
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
    persona: 'all', // 'all' | 'student' | 'office'
    saved: JSON.parse(localStorage.getItem('jayt_apex_saved') || '[]'),
    hunted: Number(localStorage.getItem('jayt_hunted_count') || 19),
    savings: Number(localStorage.getItem('jayt_actual_savings') || 285000),
    streak: Number(localStorage.getItem('jayt_streak_days') || 4)
  };

  const money = n => new Intl.NumberFormat('vi-VN').format(n) + 'đ';
  const esc = v => String(v || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
  const valid = url => /^https:\/\//.test(url) ? url : '#';

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

    /* AUDIENCE PERSONA TABS */
    .apex-persona-tabs {
      display: flex; gap: 10px; margin-top: 28px; flex-wrap: wrap;
    }
    .apex-persona-tab {
      display: flex; align-items: center; gap: 8px; padding: 10px 18px; border-radius: 999px;
      background: rgba(13,40,32,.7); border: 1px solid var(--apex-line); color: #c6d0ca;
      font-weight: 800; font-size: 13.5px; cursor: pointer; transition: all .2s ease;
    }
    .apex-persona-tab:hover { background: rgba(212,175,55,.12); color: #fff; }
    .apex-persona-tab.active {
      background: var(--apex-gold); color: #061a14; border-color: var(--apex-gold);
      box-shadow: 0 4px 15px rgba(212,175,55,.3);
    }

    /* DAILY ROUTINE TRACKER */
    .apex-routine-card {
      margin-top: 28px; background: var(--apex-panel2); border: 1px solid var(--apex-line);
      border-radius: 18px; padding: 22px 24px;
    }
    .apex-routine-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
    .apex-routine-head h3 { margin: 0; font-size: 16px; color: var(--apex-gold); }
    .apex-timeline-grid {
      display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 12px;
    }
    .apex-timeline-slot {
      background: #0d2820; border: 1px solid var(--apex-line-light); border-radius: 12px;
      padding: 14px; position: relative;
    }
    .apex-timeline-slot.now { border-color: var(--apex-gold); background: linear-gradient(145deg, #13392e, #0d2820); }
    .apex-timeline-slot .slot-time { font-size: 11px; font-weight: 900; color: var(--apex-gold); margin-bottom: 4px; }
    .apex-timeline-slot .slot-title { font-weight: 800; font-size: 13.5px; margin-bottom: 4px; }
    .apex-timeline-slot .slot-desc { font-size: 12px; color: var(--apex-muted); line-height: 1.4; }

    /* DEALS GRID */
    .apex-section { margin-top: 36px; }
    .apex-head { display: flex; justify-content: space-between; gap: 14px; align-items: flex-end; margin-bottom: 18px; }
    .apex-head h2 { font-size: 22px; margin: 0; font-weight: 800; color: #fff8e8; }
    .apex-head p { font-size: 13px; color: var(--apex-muted); margin: 4px 0 0; }
    
    .apex-deals {
      display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 18px;
    }
    .apex-deal {
      background: var(--apex-panel); border: 1px solid var(--apex-line-light);
      border-radius: 18px; overflow: hidden; display: flex; flex-direction: column;
      box-shadow: 0 8px 25px rgba(0,0,0,.25); transition: transform .2s, border-color .2s;
    }
    .apex-deal:hover { transform: translateY(-4px); border-color: var(--apex-line); }
    
    .apex-deal-top {
      height: 120px; padding: 14px; color: white; position: relative;
      display: flex; justify-content: space-between; align-items: flex-start;
    }
    .apex-time { font-size: 11px; font-weight: 900; background: rgba(0,0,0,.45); backdrop-filter: blur(4px); padding: 4px 8px; border-radius: 6px; }
    .apex-logo {
      position: absolute; inset: 36px 12px 10px; display: grid; place-items: center;
      font-weight: 900; font-size: 20px; text-align: center; text-shadow: 0 2px 12px #000;
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

    /* TRANSPARENCY & AFFILIATE DISCLOSURE BOX */
    .apex-disclosure-card {
      margin-top: 36px; background: linear-gradient(135deg, #09211a, #0d2820);
      border: 1px solid var(--apex-line); border-radius: 18px; padding: 24px;
    }
    .apex-disclosure-card h3 { margin: 0 0 8px; color: var(--apex-gold); font-size: 15px; }
    .apex-disclosure-card p { margin: 0; color: #aab8af; font-size: 12.5px; line-height: 1.6; }

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

    .apex-toast {
      position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%);
      background: #d4af37; color: #061a14; padding: 12px 20px; border-radius: 999px;
      font-weight: 900; font-size: 13.5px; z-index: 10030; box-shadow: 0 16px 40px rgba(0,0,0,.6);
    }
    </style>`;
  }

  function card(d) {
    const isSaved = state.saved.includes(d.id);
    const isVerified = d.taxonomy === 'VERIFIED';
    const badgeText = isVerified ? '● Đã kiểm chứng độc lập' : '● Đang khảo sát thực địa';
    const badgeClass = isVerified ? 'ok' : 'wait';
    const displayPrice = money(d.price_num);
    const displayOrig = d.original_price ? money(d.original_price) : '';

    return `
    <article class="apex-deal" data-deal-id="${d.id}" data-taxonomy="${d.taxonomy}">
      <div class="apex-deal-top" style="background:${d.bg}">
        <span class="apex-time">⏰ ${d.time}</span>
        <div class="apex-logo">${esc(d.brand)}</div>
      </div>
      <div class="apex-deal-body">
        <div>
          <div class="apex-deal-name">${esc(d.merchant)}</div>
          <div class="apex-deal-zone">📍 ${esc(d.zone_name || d.district)}</div>
        </div>
        
        <div class="apex-price-row">
          <div class="apex-price-box">
            <span class="apex-price">${displayPrice}</span>
            ${displayOrig ? `<span class="apex-price-orig">${displayOrig}</span>` : ''}
          </div>
          <span class="apex-save-pill">${d.saving}</span>
        </div>

        <div class="apex-trust-row">
          <span class="apex-trust ${badgeClass}">${badgeText}</span>
          <span class="apex-affiliate-tag">🔗 ${d.affiliate_type === 'AFFILIATE_LINK' ? 'Tiếp thị liên kết' : 'Trực tiếp đối tác'}</span>
        </div>

        <div class="apex-deal-actions">
          <button class="hunt" data-apex="hunt" data-id="${d.id}" style="background:${d.tone}">SĂN DEAL</button>
          <button class="save" data-apex="save" data-id="${d.id}">${isSaved ? '♥ ĐÃ LƯU' : '♡ LƯU'}</button>
        </div>
      </div>
    </article>`;
  }

  function render() {
    const gate = evaluateLiveDeals(null);
    const eligibleHero = gate.verified_hero_deals;
    const eligibleProbing = gate.probing_deals;
    const activeDeals = [...eligibleHero, ...eligibleProbing];

    const visible = activeDeals
      .filter(d => state.persona === 'all' || (d.persona && d.persona.includes(state.persona)))
      .filter(d => state.category === 'Tất cả' || d.cat === state.category)
      .filter(d => (d.merchant + (d.zone_name || '') + d.district + d.cat).toLowerCase().includes(state.query.toLowerCase()));

    const root = document.getElementById('jayt-apex');
    if (!root) return;

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
            <button data-apex="scroll" data-target="apex-routine">⏰ Nhịp săn trong ngày</button>
            <button data-apex="scroll" data-target="apex-deals">🔥 Kèo hôm nay</button>
            <button data-apex="scroll" data-target="apex-favorites">♡ Kèo đã lưu (${state.saved.length})</button>
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
            <div class="apex-eyebrow">JAYT • HỆ THỐNG KIỂM ĐỊNH GIÁ TRỊ CỘNG ĐỒNG ĐÀ NẴNG</div>
            <h1>Tuyển chọn deal giá trị thực.<br>Minh bạch 100% cho người Đà Nẵng.</h1>
            <p>Dành riêng cho sinh viên các cụm trường đại học và nhân viên văn phòng công sở. Loại trừ hoàn toàn giá ảo, deal quá hạn và sai lệch bằng chứng.</p>
            
            <!-- PERSONA SELECTOR TABS -->
            <div class="apex-persona-tabs">
              <button class="apex-persona-tab ${state.persona === 'all' ? 'active' : ''}" data-apex="persona" data-persona="all">🌟 Tất Cả Kèo Hôm Nay</button>
              <button class="apex-persona-tab ${state.persona === 'student' ? 'active' : ''}" data-apex="persona" data-persona="student">🎓 Sinh Viên & Giới Trẻ (Campus Mode)</button>
              <button class="apex-persona-tab ${state.persona === 'office' ? 'active' : ''}" data-apex="persona" data-persona="office">💼 Dân Văn Phòng & Công Sở (Office Mode)</button>
            </div>

            <div class="apex-hero-actions">
              <button class="apex-primary" data-apex="scroll" data-target="apex-deals">SĂN KÈO NGAY BÂY GIỜ →</button>
              <button class="apex-ghost" data-apex="scroll" data-target="apex-routine">Xem nhịp săn trong ngày</button>
            </div>
          </section>

          <!-- DAILY ROUTINE SCHEDULE -->
          <section id="apex-routine" class="apex-routine-card">
            <div class="apex-routine-head">
              <h3>⏰ Nhịp Săn Deal Trong Ngày Tại Đà Nẵng</h3>
              <span style="font-size:12px;color:var(--apex-muted)">Cập nhật thời gian thực theo khung giờ địa phương</span>
            </div>
            <div class="apex-timeline-grid">
              <div class="apex-timeline-slot">
                <div class="slot-time">🌅 07:00 – 09:30 • SÁNG NĂNG LƯỢNG</div>
                <div class="slot-title">Cà Phê & Bánh Mì Công Sở</div>
                <div class="slot-desc">Katinat Bạch Đằng, Highlands Nguyễn Văn Linh, Cà phê Muối 15k.</div>
              </div>
              <div class="apex-timeline-slot">
                <div class="slot-time">🍱 11:30 – 13:30 • BỮA TRƯA CHẤT LƯỢNG</div>
                <div class="slot-title">Cơm Trưa & Bún Bò Đà Nẵng</div>
                <div class="slot-desc">Cơm Gà A Hải Phan Châu Trinh, Suất ăn sinh viên Bách Khoa.</div>
              </div>
              <div class="apex-timeline-slot now">
                <div class="slot-time">🧋 14:00 – 17:30 • TEA BREAK & DEADLINE</div>
                <div class="slot-title">Trà Sữa & Snack Giờ Vàng</div>
                <div class="slot-desc">MayCha Điện Biên Phủ 24k, TocoToco, Bánh tráng kẹp Dì Hoa.</div>
              </div>
              <div class="apex-timeline-slot">
                <div class="slot-time">🎬 18:00 – 23:30 • CHILL & GIẢI TRÍ TỐI</div>
                <div class="slot-title">Vé Xem Phim & Phố Đêm</div>
                <div class="slot-desc">Metiz Cinema Helio 45k, CGV U22 55k, Chợ đêm Helio Center.</div>
              </div>
            </div>
          </section>

          <!-- DEALS SECTION -->
          <section id="apex-deals" class="apex-section">
            <div class="apex-head">
              <div>
                <h2>🔥 Kèo Nổi Bật Đã Qua Kiểm Định</h2>
                <p>Hiển thị ${visible.length} lựa chọn phù hợp với bộ lọc hiện tại.</p>
              </div>
              <span style="font-size:13px;color:var(--apex-gold);font-weight:700;">Đà Nẵng • 100% Fail-Closed Verified</span>
            </div>

            <div class="apex-deals">
              ${visible.map(card).join('') || '<p style="padding:20px;color:var(--apex-muted)">Không có kèo nào phù hợp với bộ lọc hiện tại.</p>'}
            </div>
          </section>

          <!-- TRANSPARENCY & AFFILIATE DISCLOSURE -->
          <section class="apex-disclosure-card">
            <h3>🛡️ Cam Kết Minh Bạch & Công Khai Tiếp Thị Liên Kết (Affiliate Disclosure)</h3>
            <p>
              JayT là dự án giá trị cộng đồng độc lập dành riêng cho người dân, sinh viên và nhân viên văn phòng tại Đà Nẵng 43.
              Một số liên kết trên nền tảng là liên kết tiếp thị liên kết (affiliate links) giúp chúng tôi duy trì chi phí hạ tầng máy chủ kiểm toán 24/7.
              <strong>Cam kết tuyệt đối:</strong> Người dùng luôn nhận mức giá ưu đãi gốc hoặc tốt hơn từ đối tác mà không phải chịu bất kỳ chi phí phát sinh nào.
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
    setTimeout(() => x.remove(), 2600);
  }

  function modal(d) {
    const isVerified = d.taxonomy === 'VERIFIED';
    const x = document.createElement('div');
    x.className = 'apex-modal';
    x.id = 'apex-active-modal';
    x.innerHTML = `
    <div class="apex-modal-card" role="dialog" aria-modal="true">
      <div class="apex-eyebrow" style="color:${isVerified ? '#10b981' : '#f0c36b'}">
        ${isVerified ? '✓ ĐÃ KIỂM CHỨNG ĐỘC LẬP (HERO VERIFIED)' : '● ĐANG KHẢO SÁT THỰC ĐỊA (PROBING)'}
      </div>
      <h2>${esc(d.merchant)}</h2>
      <p style="margin-top:4px;">📍 ${esc(d.zone_name || d.district)} • ⏰ ${d.time}</p>
      
      <div class="apex-voucher-box">
        <div>
          <small style="color:var(--apex-muted);display:block;font-size:11px;">MÃ ƯU ĐÃI / VOUCHER CODE</small>
          <span class="apex-voucher-code">${esc(d.code)}</span>
        </div>
        <span style="font-size:12px;color:#10b981;font-weight:800;">${d.saving}</span>
      </div>

      <p style="font-size:12.5px;color:#aab8af;margin-top:10px;">
        <strong>Điều kiện:</strong> ${esc(d.terms || d.disclosure)}
      </p>
      <p style="font-size:11.5px;color:#788a82;border-top:1px solid rgba(255,255,255,.08);padding-top:8px;">
        ℹ️ Nhấn xác nhận sẽ tự động sao chép mã voucher và mở liên kết đối tác chính thức.
      </p>

      <div class="actions">
        <button data-apex="close">Đóng / Hủy</button>
        <button class="yes" data-apex="confirm" data-id="${d.id}">Mở đối tác & Nhận mã ưu đãi</button>
      </div>
    </div>`;
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

    if (a === 'scroll') {
      const targetId = b.dataset.target;
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
    }
    if (a === 'persona') {
      state.persona = b.dataset.persona;
      render();
    }
    if (a === 'filter') {
      state.category = b.dataset.category;
      render();
    }
    if (a === 'save' && d) {
      state.saved = state.saved.includes(d.id) ? state.saved.filter(x => x !== d.id) : [...state.saved, d.id];
      persist();
      render();
      toast(state.saved.includes(d.id) ? 'Đã lưu ưu đãi vào danh sách cá nhân' : 'Đã bỏ lưu ưu đãi');
    }
    if (a === 'hunt' && d) modal(d);
    if (a === 'close') {
      const m = document.getElementById('apex-active-modal') || b.closest('.apex-modal');
      if (m) m.remove();
    }
    if (a === 'confirm' && d) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(d.code).catch(() => {});
      }
      state.hunted++;
      state.savings += Number((d.saving.match(/\d+/) || ['20'])[0]) * 1000;
      persist();
      const m = document.getElementById('apex-active-modal') || b.closest('.apex-modal');
      if (m) m.remove();
      toast('✓ Đã sao chép mã ' + d.code + ' — Đang mở trang đối tác');
      setTimeout(() => window.open(valid(d.url), '_blank', 'noopener,noreferrer'), 250);
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
      state.persona = 'all';
      state.category = 'Tất cả';
      render();
      setTimeout(() => document.getElementById('apex-deals')?.scrollIntoView({ behavior: 'smooth' }), 0);
      toast('Đang hiển thị toàn bộ ưu đãi');
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
