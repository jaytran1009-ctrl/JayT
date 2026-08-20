/**
 * =============================================================================
 * JAYT APEX v5.5 — XANH RÊU JAYT × VISUAL NORTH STAR MASTER EDITION
 * =============================================================================
 * BRAND IDENTITY: Xanh Rêu / Emerald Forest JayT (#059669, #10B981, #064E3B)
 * VISUAL STRUCTURE: 100% Approved Mockup Layout (Sidebar + Hero + 5 Deals + 7-Day)
 * LOCAL DNA: Đà Nẵng 43 (Helio, Bách Khoa, Sông Hàn, Sơn Trà, Cầu Rồng)
 * =============================================================================
 * RELEASE INTEGRITY: RC-1 / PARTIAL RUNTIME EVIDENCE (Khóa Tuyệt Đối)
 * =============================================================================
 */

(function () {
  'use strict';
  console.log("🚀 JayT Apex v5.5 [Xanh Rêu JayT × Visual North Star Master Initialized]");

  // 1. TIỆN ÍCH AN TOÀN
  function escapeHTML(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function sanitizeURL(url) {
    if (!url) return '#';
    const u = String(url).trim();
    if (/^(https?:\/\/|tel:|zalo:)/i.test(u)) return u.replace(/"/g, '&quot;');
    return '#';
  }

  function formatVND(n) {
    return new Intl.NumberFormat('vi-VN').format(Number(n) || 0) + 'đ';
  }

  const FALLBACK_IMAGE_SVG = "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22500%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20500%22%3E%3Crect%20fill%3D%22%23064E3B%22%20width%3D%22800%22%20height%3D%22500%22%2F%3E%3Ctext%20fill%3D%22%2310B981%22%20font-family%3D%22sans-serif%22%20font-size%3D%2226%22%20font-weight%3D%22bold%22%20x%3D%2250%25%22%20y%3D%2248%25%22%20text-anchor%3D%22middle%22%3EJAYT%20%C4%90%C3%80%20N%E1%BA%B5NG%2043%3C%2Ftext%3E%3Ctext%20fill%3D%22%23A7F3D0%22%20font-family%3D%22sans-serif%22%20font-size%3D%2215%22%20x%3D%2250%25%22%20y%3D%2258%25%22%20text-anchor%3D%22middle%22%3E%5B%20%E1%BA%A2nh%20Minh%20H%E1%BB%8Da%20%C4%90ang%20T%E1%BA%A3i%20%5D%3C%2Ftext%3E%3C%2Fsvg%3E";

  // 2. AUDIO & HAPTIC & CONFETTI
  function triggerHaptic(type = 'light') {
    if ('vibrate' in navigator) {
      try {
        if (type === 'light') navigator.vibrate(15);
        else if (type === 'medium') navigator.vibrate(25);
        else if (type === 'success') navigator.vibrate([20, 50, 20]);
      } catch (e) {}
    }
  }

  let audioCtx = null;
  function initAudio() {
    if (!audioCtx && (window.AudioContext || window.webkitAudioContext)) {
      try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) {}
    }
    if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
  }

  function playSound(type) {
    if (!audioCtx) return;
    try {
      const now = audioCtx.currentTime;
      const osc = audioCtx.createGain ? audioCtx.createOscillator() : null;
      const gain = audioCtx.createGain ? audioCtx.createGain() : null;
      if (!osc || !gain) return;
      osc.connect(gain); gain.connect(audioCtx.destination);

      if (type === 'click') {
        osc.type = 'sine'; osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(400, now + 0.04);
        gain.gain.setValueAtTime(0.04, now); gain.gain.linearRampToValueAtTime(0.001, now + 0.04);
        osc.start(now); osc.stop(now + 0.04);
      } else if (type === 'copy-success') {
        const osc2 = audioCtx.createOscillator();
        const gain2 = audioCtx.createGain();
        osc2.connect(gain2); gain2.connect(audioCtx.destination);
        osc.type = 'sine'; osc.frequency.setValueAtTime(523.25, now);
        gain.gain.setValueAtTime(0.05, now); gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
        osc2.type = 'sine'; osc2.frequency.setValueAtTime(659.25, now + 0.04);
        gain2.gain.setValueAtTime(0.05, now + 0.04); gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        osc.start(now); osc.stop(now + 0.16); osc2.start(now + 0.04); osc2.stop(now + 0.2);
      }
    } catch (e) {}
  }

  function fireConfetti() {
    try {
      let host = document.getElementById('jayt-overlay-root');
      if (!host) {
        host = document.createElement('div');
        host.id = 'jayt-overlay-root';
        host.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:999999;display:flex;align-items:center;justify-content:center;';
        document.body.appendChild(host);
      }
      const canvas = document.createElement('canvas');
      canvas.id = 'jayt-adapter-ephemeral-confetti';
      canvas.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:9999999;';
      host.appendChild(canvas);
      const ctx = canvas.getContext('2d');
      canvas.width = window.innerWidth; canvas.height = window.innerHeight;

      const particles = [];
      const colors = ['#10B981', '#059669', '#F59E0B', '#3B82F6', '#EC4899', '#8B5CF6'];
      for (let i = 0; i < 75; i++) {
        particles.push({
          x: window.innerWidth / 2, y: window.innerHeight / 2,
          vx: (Math.random() - 0.5) * 16, vy: (Math.random() - 0.5) * 16 - 3,
          size: Math.random() * 6 + 4, color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 1, decay: Math.random() * 0.02 + 0.015
        });
      }

      function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let alive = false;
        for (let p of particles) {
          p.x += p.vx; p.y += p.vy; p.vy += 0.35; p.alpha -= p.decay;
          if (p.alpha > 0) {
            alive = true; ctx.globalAlpha = p.alpha; ctx.fillStyle = p.color;
            ctx.fillRect(p.x, p.y, p.size, p.size);
          }
        }
        if (alive) requestAnimationFrame(animate);
        else canvas.remove();
      }
      requestAnimationFrame(animate);
    } catch (e) {}
  }

  // 3. DATABASE ĐÀ NẴNG 43
  const DEALS_DATABASE = [
    {
      deal_id: 'DNG-METIZ-45K',
      merchant: 'Metiz Helio Center',
      brand_logo_text: 'metiz CINEMAS',
      sub_title: 'Vé thành viên chỉ',
      category_label: 'XEM PHIM',
      category_icon: '🎬',
      time_slot: '17:30 - 23:59',
      header_bg: '#991B1B',
      card_accent: '#EF4444',
      btn_bg: 'linear-gradient(135deg, #EF4444, #DC2626)',
      btn_text: 'ĐẶT VÉ NGAY',
      code: 'METIZ45K',
      price: '45.000đ',
      saving_badge: 'TIẾT KIỆM 40K',
      district: 'Quận Hải Châu',
      rating: '4.8 (12.3K)',
      audit_label: 'Đã kiểm chứng',
      audit_type: 'verified',
      days_active: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
      highlight_day: 'MON',
      category: 'CINEMA',
      link: 'https://metiz.vn/lich-chieu/',
      image_bg: 'linear-gradient(135deg, #450A0A, #1C1917)'
    },
    {
      deal_id: 'DNG-JOLLIBEE-39K',
      merchant: 'Jollibee Co.opmart',
      brand_logo_text: 'Jollibee',
      sub_title: 'Combo Gà Giòn chỉ',
      category_label: 'GÀ RÁN',
      category_icon: '🍗',
      time_slot: '10:00 - 22:00',
      header_bg: '#EA580C',
      card_accent: '#F97316',
      btn_bg: 'linear-gradient(135deg, #F97316, #EA580C)',
      btn_text: 'XEM DEAL',
      code: 'JOLLIBEE39',
      price: '39.000đ',
      saving_badge: 'TIẾT KIỆM 30K',
      district: 'Quận Thanh Khê',
      rating: '4.7 (8.9K)',
      audit_label: 'Đã kiểm chứng',
      audit_type: 'verified',
      days_active: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
      highlight_day: 'TUE',
      category: 'FASTFOOD',
      link: 'https://jollibee.com.vn/thuc-don',
      image_bg: 'linear-gradient(135deg, #991B1B, #EA580C)'
    },
    {
      deal_id: 'DNG-MAYCHA-24K',
      merchant: 'MayCha Điện Biên Phủ',
      brand_logo_text: 'MAYCHA TEA & COFFEE',
      sub_title: 'Mua 1 Tặng 1 chỉ',
      category_label: 'TRÀ SỮA',
      category_icon: '🧋',
      time_slot: '14:00 - 17:30',
      header_bg: '#15803D',
      card_accent: '#10B981',
      btn_bg: 'linear-gradient(135deg, #10B981, #059669)',
      btn_text: 'XEM DEAL',
      code: 'MAYCHA0D',
      price: '24.000đ',
      saving_badge: 'TIẾT KIỆM 24K',
      district: 'Quận Thanh Khê',
      rating: '4.9 (6.5K)',
      audit_label: 'Đã kiểm chứng',
      audit_type: 'verified',
      days_active: ['MON', 'TUE', 'WED', 'THU', 'FRI'],
      highlight_day: 'WED',
      category: 'DRINK',
      link: 'https://shopeefood.vn/da-nang/tra-sua-maycha-dien-bien-phu',
      image_bg: 'linear-gradient(135deg, #064E3B, #047857)'
    },
    {
      deal_id: 'DNG-KATINAT-1D',
      merchant: 'Katinat Bạch Đằng',
      brand_logo_text: 'KATINAT COFFEE & TEA',
      sub_title: 'Tặng bánh nướng',
      category_label: 'CÀ PHÊ',
      category_icon: '☕',
      time_slot: '07:00 - 10:00',
      header_bg: '#1D4ED8',
      card_accent: '#3B82F6',
      btn_bg: 'linear-gradient(135deg, #3B82F6, #2563EB)',
      btn_text: 'XEM DEAL',
      code: 'KATINAT1D',
      price: '1.000đ',
      saving_badge: 'TIẾT KIỆM 20K',
      district: 'Quận Hải Châu',
      rating: '4.6 (4.2K)',
      audit_label: 'Đã kiểm chứng',
      audit_type: 'verified',
      days_active: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
      highlight_day: 'FRI',
      category: 'DRINK',
      link: 'https://katinat.vn/menu/',
      image_bg: 'linear-gradient(135deg, #1E3A8A, #1D4ED8)'
    },
    {
      deal_id: 'DNG-CHELIEN-20P',
      merchant: 'Chè Liên Hoàng Diệu',
      brand_logo_text: 'CHÈ LIÊN ĐÀ NẴNG',
      sub_title: 'Mua 4 Tặng 1',
      category_label: 'ĂN VẶT',
      category_icon: '🍧',
      time_slot: '11:00 - 21:00',
      header_bg: '#6D28D9',
      card_accent: '#8B5CF6',
      btn_bg: 'linear-gradient(135deg, #8B5CF6, #7C3AED)',
      btn_text: 'XEM DEAL',
      code: 'CHELIENFREE',
      price: 'Tiết kiệm 20%',
      saving_badge: '',
      district: 'Quận Hải Châu',
      rating: '4.8 (7.1K)',
      audit_label: 'Chưa kiểm chứng',
      audit_type: 'unverified',
      days_active: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
      highlight_day: 'THU',
      category: 'FOOD',
      link: 'https://food.grab.com/vn/vi/restaurant/ch%C3%A8-li%C3%AAn-ho%C3%A0ng-di%E1%BB%87u-delivery/',
      image_bg: 'linear-gradient(135deg, #3B0764, #6B21A8)'
    }
  ];

  const FAVORITES_DATABASE = [
    {
      deal_id: 'FAV-CGV-55K',
      merchant: 'CGV Vincom Sơn Trà',
      brand_tag: '🎬 Phim',
      brand_logo_text: 'CGV CINEMAS',
      sub_title: 'Vé U22 chỉ',
      price: '55.000đ',
      district: 'Sơn Trà',
      rating: '4.8 (15.2K)',
      audit_label: 'Đã kiểm chứng',
      audit_type: 'verified',
      btn_bg: '#EF4444',
      btn_text: 'ĐẶT VÉ NGAY',
      code: 'CGVU22DN',
      link: 'https://www.cgv.vn',
      category: 'CINEMA',
      image_bg: 'linear-gradient(135deg, #B91C1C, #991B1B)'
    },
    {
      deal_id: 'FAV-LOTTE-49K',
      merchant: 'Lotte Mart Đà Nẵng',
      brand_tag: '🎬 Phim',
      brand_logo_text: 'LOTTE CINEMA',
      sub_title: 'Vé thành viên chỉ',
      price: '49.000đ',
      district: 'Liên Chiểu',
      rating: '4.6 (9.1K)',
      audit_label: 'Chưa kiểm chứng',
      audit_type: 'unverified',
      btn_bg: '#EF4444',
      btn_text: 'XEM DEAL',
      code: 'LOTTEDN',
      link: 'https://www.lottecinemavn.com',
      category: 'CINEMA',
      image_bg: 'linear-gradient(135deg, #991B1B, #7F1D1D)'
    },
    {
      deal_id: 'FAV-METIZ-45K',
      merchant: 'Metiz Helio Center',
      brand_tag: '🎬 Phim',
      brand_logo_text: 'metiz CINEMAS',
      sub_title: 'Vé thành viên chỉ',
      price: '45.000đ',
      district: 'Hải Châu',
      rating: '4.8 (12.3K)',
      audit_label: 'Đã kiểm chứng',
      audit_type: 'verified',
      btn_bg: '#EF4444',
      btn_text: 'ĐẶT VÉ NGAY',
      code: 'METIZ45K',
      link: 'https://metiz.vn',
      category: 'CINEMA',
      image_bg: 'linear-gradient(135deg, #7F1D1D, #450A0A)'
    },
    {
      deal_id: 'FAV-KFC-49K',
      merchant: 'KFC Điện Biên Phủ',
      brand_tag: '🍗 Gà rán',
      brand_logo_text: 'KFC',
      sub_title: 'Combo chỉ từ',
      price: '49.000đ',
      district: 'Thanh Khê',
      rating: '4.6 (10.2K)',
      audit_label: 'Chưa kiểm chứng',
      audit_type: 'unverified',
      btn_bg: '#F59E0B',
      btn_text: 'XEM DEAL',
      code: 'KFCDN',
      link: 'https://kfcvietnam.com.vn',
      category: 'FASTFOOD',
      image_bg: 'linear-gradient(135deg, #B45309, #92400E)'
    },
    {
      deal_id: 'FAV-JOLLI-39K',
      merchant: 'Jollibee Co.opmart',
      brand_tag: '🍗 Gà rán',
      brand_logo_text: 'Jollibee',
      sub_title: 'Combo chỉ từ',
      price: '39.000đ',
      district: 'Thanh Khê',
      rating: '4.7 (8.9K)',
      audit_label: 'Đã kiểm chứng',
      audit_type: 'verified',
      btn_bg: '#10B981',
      btn_text: 'XEM DEAL',
      code: 'JOLLIBEE39',
      link: 'https://jollibee.com.vn',
      category: 'FASTFOOD',
      image_bg: 'linear-gradient(135deg, #991B1B, #B91C1C)'
    }
  ];

  // 4. STATE MANAGEMENT
  const State = {
    deals: DEALS_DATABASE,
    favorites: FAVORITES_DATABASE,
    activeNav: 'home',
    activeCategoryFilter: 'CINEMA',
    huntedCount: 28,
    actualSavedAmount: 1247000,
    streakDays: 16
  };

  // 5. HOST PROVISIONER
  function ensureApexHost() {
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.backgroundColor = '#F8FAFC';
    document.body.style.fontFamily = "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif";
    document.body.style.color = '#1E293B';
    document.body.style.overflowX = 'hidden';

    let root = document.getElementById('jayt-apex-root');
    if (!root) {
      root = document.createElement('div');
      root.id = 'jayt-apex-root';
      root.setAttribute('data-jayt-owned', 'apex');
      document.body.prepend(root);
    }
    return root;
  }

  // 6. RENDER GIAO DIỆN XANH RÊU JAYT × VISUAL NORTH STAR
  function renderApp() {
    const root = ensureApexHost();

    let filteredFavs = State.favorites;
    if (State.activeCategoryFilter !== 'ALL') {
      filteredFavs = State.favorites.filter(f => f.category === State.activeCategoryFilter);
      if (filteredFavs.length === 0) filteredFavs = State.favorites;
    }

    root.innerHTML = `
      <div style="display: flex; min-height: 100vh; background-color: #F8FAFC;">
        
        <!-- ========================================================= -->
        <!-- 1. LEFT SIDEBAR (STICKY, XANH RÊU JAYT BRAND ACCENT)      -->
        <!-- ========================================================= -->
        <aside style="width: 240px; background: #FFFFFF; border-right: 1px solid #E2E8F0; display: flex; flex-direction: column; justify-content: space-between; padding: 1.25rem 1rem; flex-shrink: 0; position: sticky; top: 0; height: 100vh; box-sizing: border-box; overflow-y: auto; z-index: 100;">
          <div>
            <!-- LOGO & BRAND (XANH RÊU JAYT) -->
            <div style="display: flex; align-items: center; gap: 0.6rem; margin-bottom: 1.5rem; cursor: pointer;" onclick="window.scrollTo({top:0, behavior:'smooth'});">
              <div style="width: 38px; height: 38px; border-radius: 10px; background: linear-gradient(135deg, #10B981, #059669, #047857); display: flex; align-items: center; justify-content: center; color: #FFF; font-weight: 900; font-size: 1.2rem; box-shadow: 0 4px 12px rgba(16,185,129,0.35);">
                ▲
              </div>
              <div>
                <div style="font-size: 1.15rem; font-weight: 900; color: #047857; letter-spacing: -0.5px; line-height: 1.1;">JAYT APEX</div>
                <div style="font-size: 0.7rem; font-weight: 700; color: #059669;">ĐÀ NẴNG 43</div>
              </div>
            </div>

            <!-- MAIN NAVIGATION (ACTIVE: XANH RÊU JAYT #059669) -->
            <nav style="display: flex; flex-direction: column; gap: 0.25rem; margin-bottom: 1.5rem;">
              ${[
                { id: 'home', icon: '🏠', label: 'Trang chủ', active: true },
                { id: 'today', icon: '📅', label: 'Hôm nay' },
                { id: 'calendar', icon: '🗓️', label: 'Lịch săn kèo' },
                { id: 'favorites', icon: '❤️', label: 'Kèo tôi hay săn' },
                { id: 'radar', icon: '📍', label: 'Radar tuyến' },
                { id: 'liked', icon: '🤍', label: 'Yêu thích' },
                { id: 'saved', icon: '🔖', label: 'Đã lưu' },
                { id: 'history', icon: '⏱️', label: 'Lịch sử' },
                { id: 'notifications', icon: '🔔', label: 'Thông báo', badge: '3' }
              ].map(item => `
                <button data-action="nav-item" data-nav="${item.id}" style="width: 100%; display: flex; align-items: center; justify-content: space-between; padding: 0.55rem 0.85rem; border-radius: 10px; font-size: 0.82rem; font-weight: ${item.active ? '800' : '600'}; border: none; cursor: pointer; background: ${item.active ? '#059669' : 'transparent'}; color: ${item.active ? '#FFFFFF' : '#475569'}; transition: all 0.2s ease;">
                  <span style="display: flex; align-items: center; gap: 0.6rem;">
                    <span style="font-size: 0.95rem;">${item.icon}</span>
                    <span>${item.label}</span>
                  </span>
                  ${item.badge ? `<span style="background: #EF4444; color: #FFF; font-size: 0.65rem; font-weight: 800; padding: 0.1rem 0.4rem; border-radius: 9999px;">${item.badge}</span>` : ''}
                </button>
              `).join('')}
            </nav>

            <!-- DANH MỤC ƯA THÍCH -->
            <div style="margin-bottom: 1.5rem;">
              <div style="font-size: 0.7rem; font-weight: 800; color: #94A3B8; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 0.6rem; padding-left: 0.5rem;">
                DANH MỤC ƯA THÍCH
              </div>
              <div style="display: flex; flex-direction: column; gap: 0.2rem;">
                ${[
                  { id: 'CINEMA', icon: '🎬', label: 'Phim' },
                  { id: 'FASTFOOD', icon: '🍗', label: 'Gà rán' },
                  { id: 'DRINK', icon: '🧋', label: 'Trà sữa' },
                  { id: 'CAFE', icon: '☕', label: 'Café' },
                  { id: 'FOOD', icon: '🍱', label: 'Cơm trưa' },
                  { id: 'SNACK', icon: '🍿', label: 'Ăn vặt' },
                  { id: 'OUTING', icon: '🎉', label: 'Đi chơi' },
                  { id: 'RIDE', icon: '🚗', label: 'Xe điện' },
                  { id: 'ALL', icon: '🎛️', label: 'Tất cả' }
                ].map(cat => `
                  <button data-action="filter-cat" data-cat="${cat.id}" style="width: 100%; display: flex; align-items: center; gap: 0.6rem; padding: 0.45rem 0.85rem; border-radius: 8px; font-size: 0.78rem; font-weight: 600; border: none; cursor: pointer; background: transparent; color: #475569; text-align: left;">
                    <span>${cat.icon}</span>
                    <span>${cat.label}</span>
                  </button>
                `).join('')}
              </div>
            </div>

            <!-- PREMIUM UPGRADE BANNER (XANH RÊU ĐẬM × GOLD ACCENT) -->
            <div style="background: linear-gradient(135deg, #064E3B, #047857); border-radius: 14px; padding: 1rem 0.9rem; color: #FFFFFF; margin-bottom: 1rem; box-shadow: 0 4px 15px rgba(4, 120, 87, 0.25);">
              <div style="display: flex; align-items: center; gap: 0.35rem; font-size: 0.8rem; font-weight: 800; color: #FDE047; margin-bottom: 0.6rem;">
                <span>👑</span> <span>NÂNG CẤP PREMIUM</span>
              </div>
              <ul style="list-style: none; padding: 0; margin: 0 0 0.8rem 0; font-size: 0.7rem; color: #D1FAE5; display: flex; flex-direction: column; gap: 0.25rem;">
                <li>✦ Deal độc quyền</li>
                <li>✦ Mã giảm thêm</li>
                <li>✦ Không quảng cáo</li>
                <li>✦ Lịch sử ưu đãi</li>
              </ul>
              <button data-action="upgrade-premium" style="width: 100%; min-height: 32px; background: linear-gradient(135deg, #F59E0B, #D97706); border: none; border-radius: 8px; color: #FFFFFF; font-weight: 800; font-size: 0.72rem; cursor: pointer; box-shadow: 0 2px 8px rgba(217, 119, 6, 0.35);">
                NÂNG CẤP NGAY
              </button>
            </div>
          </div>

          <!-- SIDEBAR FOOTER -->
          <div style="border-top: 1px solid #E2E8F0; padding-top: 0.8rem; font-size: 0.68rem; color: #94A3B8;">
            <div style="font-weight: 800; color: #059669; margin-bottom: 0.2rem;">JAYT CORP</div>
            <div style="margin-bottom: 0.4rem; font-size: 0.62rem;">V5.5 RC-1 PARTIAL RUNTIME EVIDENCE</div>
            <div style="display: flex; gap: 0.5rem; font-size: 0.65rem; color: #64748B;">
              <span style="cursor:pointer;">Điều khoản</span> · <span style="cursor:pointer;">Bảo mật</span> · <a href="https://zalo.me/0777511204" target="_blank" rel="noopener noreferrer" style="color:#059669; text-decoration:none; font-weight:700;">Liên hệ CSKH</a>
            </div>
          </div>
        </aside>

        <!-- ========================================================= -->
        <!-- 2. MAIN CONTENT AREA                                      -->
        <!-- ========================================================= -->
        <main style="flex: 1; min-width: 0; display: flex; flex-direction: column; overflow-y: auto;">
          
          <!-- TOP HEADER BAR -->
          <header style="background: #FFFFFF; border-bottom: 1px solid #E2E8F0; padding: 0.75rem 2rem; display: flex; justify-content: space-between; align-items: center; position: sticky; top: 0; z-index: 90;">
            <!-- SEARCH BAR -->
            <div style="position: relative; max-width: 480px; width: 100%;">
              <input type="text" placeholder="🔍  Tìm kèo, quán, rạp, thương hiệu..." style="width: 100%; height: 38px; background: #F1F5F9; border: 1px solid #E2E8F0; border-radius: 9999px; padding: 0 1.2rem; font-size: 0.82rem; color: #0F172A; outline: none; box-sizing: border-box;" />
            </div>

            <!-- RIGHT STATUS & USER AVATAR -->
            <div style="display: flex; align-items: center; gap: 1.2rem;">
              <div style="display: flex; align-items: center; gap: 0.4rem; font-size: 0.8rem; font-weight: 700; color: #475569;">
                <span>📍</span> <span>Đà Nẵng, Việt Nam</span>
              </div>
              <div style="display: flex; align-items: center; gap: 0.3rem; font-size: 0.8rem; font-weight: 700; color: #D97706; background: #FEF3C7; padding: 0.2rem 0.6rem; border-radius: 9999px;">
                <span>☀️</span> <span>31°C</span>
              </div>
              <div style="position: relative; cursor: pointer;">
                <span style="font-size: 1.25rem;">🔔</span>
                <span style="position: absolute; top: -4px; right: -4px; background: #EF4444; color: #FFF; font-size: 0.6rem; font-weight: 900; width: 16px; height: 16px; border-radius: 50%; display: flex; align-items: center; justify-content: center;">3</span>
              </div>
              <div style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
                <div style="position: relative;">
                  <div style="width: 36px; height: 36px; border-radius: 50%; background: linear-gradient(135deg, #10B981, #059669); color: #FFF; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 0.85rem;">
                    JT
                  </div>
                  <span style="position: absolute; bottom: -2px; right: -2px; background: #F59E0B; color: #000; font-size: 0.5rem; font-weight: 900; padding: 0.05rem 0.25rem; border-radius: 4px;">VIP</span>
                </div>
              </div>
            </div>
          </header>

          <div style="padding: 1.8rem 2rem; max-width: 1400px; width: 100%; box-sizing: border-box; margin: 0 auto;">
            
            <!-- ========================================================= -->
            <!-- 3. HERO GREETING BANNER (XANH RÊU JAYT GRADIENT × CẦU RỒNG)-->
            <!-- ========================================================= -->
            <div style="background: linear-gradient(125deg, #064E3B 0%, #047857 50%, #059669 100%); border-radius: 20px; padding: 2rem 2.2rem; color: #FFFFFF; margin-bottom: 2rem; position: relative; overflow: hidden; box-shadow: 0 10px 25px rgba(5, 150, 105, 0.25);">
              <div style="position: relative; z-index: 2; max-width: 650px;">
                <h1 style="font-size: 1.65rem; font-weight: 900; margin: 0 0 0.4rem 0; letter-spacing: -0.5px;">
                  👋 Chào buổi chiều, Sinh viên!
                </h1>
                <p style="font-size: 0.88rem; color: #D1FAE5; margin: 0 0 1.5rem 0; opacity: 0.95;">
                  Tan học rồi, xem ngay hôm nay có gì đáng săn để tự thưởng nào!
                </p>

                <!-- 4 METRIC STAT PILLS -->
                <div style="display: flex; gap: 0.6rem; flex-wrap: wrap;">
                  <div style="background: rgba(255, 255, 255, 0.16); backdrop-filter: blur(8px); border: 1px solid rgba(255, 255, 255, 0.25); border-radius: 12px; padding: 0.5rem 0.9rem; font-size: 0.76rem; display: flex; align-items: center; gap: 0.4rem;">
                    <span>🎁</span> <span>Tiết kiệm hôm nay: <strong style="color:#FDE047;">121.000đ</strong></span>
                  </div>
                  <div style="background: rgba(255, 255, 255, 0.16); backdrop-filter: blur(8px); border: 1px solid rgba(255, 255, 255, 0.25); border-radius: 12px; padding: 0.5rem 0.9rem; font-size: 0.76rem; display: flex; align-items: center; gap: 0.4rem;">
                    <span>🔥</span> <span>Đang mở: <strong>12 kèo hot</strong></span>
                  </div>
                  <div style="background: rgba(255, 255, 255, 0.16); backdrop-filter: blur(8px); border: 1px solid rgba(255, 255, 255, 0.25); border-radius: 12px; padding: 0.5rem 0.9rem; font-size: 0.76rem; display: flex; align-items: center; gap: 0.4rem;">
                    <span>📍</span> <span>Gần bạn: <strong>8 kèo &lt; 1km</strong></span>
                  </div>
                  <div style="background: rgba(255, 255, 255, 0.16); backdrop-filter: blur(8px); border: 1px solid rgba(255, 255, 255, 0.25); border-radius: 12px; padding: 0.5rem 0.9rem; font-size: 0.76rem; display: flex; align-items: center; gap: 0.4rem;">
                    <span>🛡️</span> <span>Đã kiểm chứng: <strong>9 kèo</strong></span>
                  </div>
                </div>
              </div>

              <!-- DECORATIVE SKYLINE WATERMARK -->
              <div style="position: absolute; right: 0; bottom: 0; height: 100%; width: 45%; background: radial-gradient(circle at right center, rgba(16,185,129,0.25), transparent 70%); pointer-events: none;"></div>
            </div>

            <!-- ========================================================= -->
            <!-- 4. SECTION: HÔM NAY SĂN GÌ? (5 VIBRANT DEAL CARDS)        -->
            <!-- ========================================================= -->
            <div style="margin-bottom: 2rem;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.2rem;">
                <div>
                  <h2 style="font-size: 1.25rem; font-weight: 800; color: #0F172A; margin: 0; display: flex; align-items: center; gap: 0.4rem;">
                    <span>🔥</span> <span>Hôm nay Săn gì?</span>
                  </h2>
                  <p style="font-size: 0.78rem; color: #64748B; margin: 0.2rem 0 0 0;">
                    Cập nhật ưu đãi hot nhất đang mở tại Đà Nẵng hôm nay!
                  </p>
                </div>
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                  <button style="background: #ECFDF5; color: #059669; border: none; border-radius: 8px; font-size: 0.75rem; font-weight: 800; padding: 0.35rem 0.8rem; cursor: pointer;">
                    Xem tất cả
                  </button>
                  <div style="display: flex; gap: 0.3rem;">
                    <button style="width: 28px; height: 28px; border-radius: 50%; border: 1px solid #E2E8F0; background: #FFF; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 0.8rem; color: #64748B;">&lt;</button>
                    <button style="width: 28px; height: 28px; border-radius: 50%; border: 1px solid #E2E8F0; background: #FFF; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 0.8rem; color: #64748B;">&gt;</button>
                  </div>
                </div>
              </div>

              <!-- 5 DEAL CARDS GRID -->
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: 1.1rem;">
                ${State.deals.map(deal => `
                  <div style="background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 16px; overflow: hidden; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 4px 15px rgba(0,0,0,0.03); transition: transform 0.2s ease;">
                    <div>
                      <!-- HEADER TIME & CATEGORY -->
                      <div style="background: ${deal.header_bg}; color: #FFFFFF; padding: 0.4rem 0.6rem; font-size: 0.68rem; font-weight: 800; display: flex; justify-content: space-between; align-items: center;">
                        <span>${deal.time_slot}</span>
                        <span>${deal.category_icon} ${deal.category_label}</span>
                      </div>

                      <!-- BRAND LOGO TEXT BANNER -->
                      <div style="height: 80px; background: ${deal.image_bg}; display: flex; align-items: center; justify-content: center; padding: 0.5rem; text-align: center;">
                        <span style="color: #FFFFFF; font-weight: 900; font-size: 1.1rem; letter-spacing: -0.5px; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">
                          ${deal.brand_logo_text}
                        </span>
                      </div>

                      <!-- CARD BODY -->
                      <div style="padding: 0.9rem;">
                        <div style="font-size: 0.82rem; font-weight: 800; color: #0F172A; margin-bottom: 0.15rem; line-height: 1.3;">
                          ${escapeHTML(deal.merchant)}
                        </div>
                        <div style="font-size: 0.72rem; color: #64748B; margin-bottom: 0.6rem;">
                          ${escapeHTML(deal.sub_title)}
                        </div>

                        <!-- PRICE & SAVING BADGE -->
                        <div style="display: flex; align-items: baseline; gap: 0.4rem; margin-bottom: 0.6rem; flex-wrap: wrap;">
                          <span style="font-size: 1.25rem; font-weight: 900; color: ${deal.card_accent};">
                            ${deal.price}
                          </span>
                          ${deal.saving_badge ? `
                            <span style="font-size: 0.62rem; font-weight: 800; color: #DC2626; background: #FEE2E2; padding: 0.1rem 0.35rem; border-radius: 4px;">
                              ${deal.saving_badge}
                            </span>
                          ` : ''}
                        </div>

                        <!-- LOCATION & RATING -->
                        <div style="font-size: 0.7rem; color: #64748B; display: flex; flex-direction: column; gap: 0.2rem; margin-bottom: 0.6rem;">
                          <div>📍 ${escapeHTML(deal.district)}</div>
                          <div style="display: flex; align-items: center; justify-content: space-between;">
                            <span style="font-weight: 700; color: #0F172A;">★ ${deal.rating}</span>
                            <span style="color: ${deal.audit_type === 'verified' ? '#059669' : '#D97706'}; font-weight: 700; font-size: 0.65rem;">
                              ${deal.audit_type === 'verified' ? '🟢' : '🟡'} ${deal.audit_label}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- FULL-WIDTH CTA BUTTON -->
                    <div style="padding: 0 0.9rem 0.9rem 0.9rem;">
                      <button data-action="hunt-deal" data-id="${deal.deal_id}" data-code="${deal.code}" data-link="${deal.link}" style="width: 100%; min-height: 38px; background: ${deal.btn_bg}; color: #FFFFFF; border: none; border-radius: 10px; font-size: 0.8rem; font-weight: 800; cursor: pointer; box-shadow: 0 4px 10px rgba(0,0,0,0.12); display: flex; align-items: center; justify-content: center; gap: 0.3rem;">
                        <span>${deal.btn_text}</span>
                        <span>➔</span>
                      </button>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- ========================================================= -->
            <!-- 5. SOCIAL PLANNING BANNER (LÊN PLAN NHÓM BẠN CHƯA?)        -->
            <!-- ========================================================= -->
            <div style="background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 16px; padding: 0.9rem 1.4rem; display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; flex-wrap: wrap; gap: 0.8rem;">
              <div style="display: flex; align-items: center; gap: 0.8rem;">
                <span style="font-size: 1.8rem;">👥</span>
                <div>
                  <div style="font-size: 0.88rem; font-weight: 800; color: #0F172A;">
                    Lên plan nhóm bạn chưa?
                  </div>
                  <div style="font-size: 0.75rem; color: #64748B;">
                    Chia sẻ kèo hot hôm nay cho hội bạn ngay!
                  </div>
                </div>
              </div>

              <div style="display: flex; align-items: center; gap: 0.6rem; flex-wrap: wrap;">
                <a href="https://zalo.me/share?url=${encodeURIComponent(window.location.href)}" target="_blank" rel="noopener noreferrer" style="background: #ECFDF5; border: 1px solid #A7F3D0; color: #059669; text-decoration: none; padding: 0.45rem 0.9rem; border-radius: 8px; font-size: 0.74rem; font-weight: 800; display: inline-flex; align-items: center; gap: 0.3rem;">
                  <span>💬 CHIA SẺ QUA ZALO</span>
                </a>
                <a href="https://www.messenger.com" target="_blank" rel="noopener noreferrer" style="background: #EFF6FF; border: 1px solid #BFDBFE; color: #2563EB; text-decoration: none; padding: 0.45rem 0.9rem; border-radius: 8px; font-size: 0.74rem; font-weight: 800; display: inline-flex; align-items: center; gap: 0.3rem;">
                  <span>💬 CHIA SẺ MESSENGER</span>
                </a>
                <button data-action="copy-link" style="background: #F1F5F9; border: 1px solid #E2E8F0; color: #475569; padding: 0.45rem 0.9rem; border-radius: 8px; font-size: 0.74rem; font-weight: 800; cursor: pointer; display: inline-flex; align-items: center; gap: 0.3rem;">
                  <span>🔗 COPY LINK KÈO</span>
                </button>
              </div>
            </div>

            <!-- ========================================================= -->
            <!-- 6. SECTION: LỊCH SĂN KÈO 7 NGÀY (7 HORIZONTAL COLUMNS)    -->
            <!-- ========================================================= -->
            <div style="margin-bottom: 2.2rem;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.2rem;">
                <div>
                  <h2 style="font-size: 1.25rem; font-weight: 800; color: #0F172A; margin: 0; display: flex; align-items: center; gap: 0.4rem;">
                    <span>📅</span> <span>Lịch săn kèo 7 ngày</span> <span>🗓️</span>
                  </h2>
                  <p style="font-size: 0.78rem; color: #64748B; margin: 0.2rem 0 0 0;">
                    Xem trước để lên kế hoạch — Không bỏ lỡ kèo ngon!
                  </p>
                </div>
                <button data-action="view-full-calendar" style="background: #ECFDF5; color: #059669; border: none; border-radius: 8px; font-size: 0.75rem; font-weight: 800; padding: 0.4rem 0.9rem; cursor: pointer; display: flex; align-items: center; gap: 0.3rem;">
                  <span>📅</span> <span>XEM LỊCH ĐẦY ĐỦ</span>
                </button>
              </div>

              <!-- 7-DAY CARDS ROW -->
              <div style="display: grid; grid-template-columns: repeat(7, minmax(130px, 1fr)); gap: 0.75rem; overflow-x: auto;">
                ${[
                  { day: 'T2', sub: 'HÔM NAY', bg: '#059669', text: '#FFF', list: ['Metiz 45K', 'Jollibee 39K', 'Katinat 1Đ'], more: '+2 kèo khác', active: true },
                  { day: 'T3', sub: 'NGÀY MAI', bg: '#EFF6FF', text: '#1E40AF', list: ['CGV 55K', 'Lotteria Deal', 'Xanh SM 30K'], more: '+3 kèo khác' },
                  { day: 'T4', sub: '24/04', bg: '#F0FDF4', text: '#166534', list: ['MayCha 24K', 'Chè Liên', 'Katinat 1Đ'], more: '+2 kèo khác' },
                  { day: 'T5', sub: '25/04', bg: '#FFF7ED', text: '#9A3412', list: ['Chè Liên -20%', 'Cơm Gà A Hải', 'Xanh SM 30K'], more: '+2 kèo khác' },
                  { day: 'T6', sub: '26/04', bg: '#FEF2F2', text: '#991B1B', list: ['CGV 55K', 'Katinat 1Đ', 'Jollibee 39K'], more: '+2 kèo khác' },
                  { day: 'T7', sub: '27/04', bg: '#FEFCE8', text: '#854D0E', list: ['Metiz 45K', 'Xanh SM 30K', 'An Thượng Deal'], more: '+2 kèo khác' },
                  { day: 'CN', sub: '28/04', bg: '#FFF1F2', text: '#9F1239', list: ['CGV 55K', 'Chè Liên', 'Jollibee 39K'], more: '+2 kèo khác' }
                ].map(col => `
                  <div style="background: #FFFFFF; border: ${col.active ? '2px solid #059669' : '1px solid #E2E8F0'}; border-radius: 14px; overflow: hidden; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 2px 8px rgba(0,0,0,0.02);">
                    <div style="background: ${col.bg}; color: ${col.text}; padding: 0.45rem 0.5rem; text-align: center;">
                      <div style="font-size: 0.95rem; font-weight: 900;">${col.day}</div>
                      <div style="font-size: 0.62rem; font-weight: 700; opacity: 0.9;">${col.sub}</div>
                    </div>
                    <div style="padding: 0.6rem 0.5rem; display: flex; flex-direction: column; gap: 0.35rem; font-size: 0.68rem; color: #334155;">
                      ${col.list.map(it => `<div style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">• ${it}</div>`).join('')}
                      <div style="color: #059669; font-weight: 700; font-size: 0.62rem; margin-top: 0.2rem;">${col.more}</div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- ========================================================= -->
            <!-- 7. SPLIT GRID: KÈO TÔI HAY SĂN (LEFT) & WIDGETS (RIGHT)   -->
            <!-- ========================================================= -->
            <div style="display: grid; grid-template-columns: 2.2fr 1fr; gap: 1.8rem; align-items: start;">
              
              <!-- LEFT COLUMN: KÈO TÔI HAY SĂN -->
              <div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                  <div>
                    <h3 style="font-size: 1.15rem; font-weight: 800; color: #0F172A; margin: 0; display: flex; align-items: center; gap: 0.4rem;">
                      <span>❤️</span> <span>Kèo tôi hay săn</span> <span style="font-size:0.75rem; color:#64748B; font-weight:600;">(Cá nhân hóa cho bạn)</span>
                    </h3>
                    <p style="font-size: 0.75rem; color: #64748B; margin: 0.15rem 0 0 0;">
                      Chỉ hiển thị kèo bạn thích!
                    </p>
                  </div>
                  <div style="display: flex; gap: 0.4rem;">
                    <button style="background: #F1F5F9; border: 1px solid #E2E8F0; color: #475569; padding: 0.3rem 0.65rem; border-radius: 6px; font-size: 0.7rem; font-weight: 700; cursor: pointer;">
                      ⚙️ QUẢN LÝ SỞ THÍCH
                    </button>
                    <button style="background: #ECFDF5; color: #059669; border: none; padding: 0.3rem 0.65rem; border-radius: 6px; font-size: 0.7rem; font-weight: 700; cursor: pointer;">
                      ✨ GỢI Ý CHO BẠN
                    </button>
                  </div>
                </div>

                <!-- CATEGORY PILLS (ACTIVE: XANH RÊU JAYT) -->
                <div style="display: flex; gap: 0.4rem; margin-bottom: 1.2rem; flex-wrap: wrap;">
                  ${[
                    { id: 'CINEMA', icon: '🎬', label: 'Phim' },
                    { id: 'FASTFOOD', icon: '🍗', label: 'Gà rán' },
                    { id: 'DRINK', icon: '🧋', label: 'Trà sữa' },
                    { id: 'CAFE', icon: '☕', label: 'Café' },
                    { id: 'FOOD', icon: '🍱', label: 'Cơm' },
                    { id: 'RIDE', icon: '🚗', label: 'Di chuyển' },
                    { id: 'ALL', icon: '➕', label: 'Thêm' }
                  ].map(p => `
                    <button data-action="filter-feed" data-cat="${p.id}" style="padding: 0.35rem 0.85rem; border-radius: 9999px; font-size: 0.74rem; font-weight: 800; cursor: pointer; border: 1px solid ${State.activeCategoryFilter === p.id ? '#059669' : '#E2E8F0'}; background: ${State.activeCategoryFilter === p.id ? '#059669' : '#FFFFFF'}; color: ${State.activeCategoryFilter === p.id ? '#FFFFFF' : '#475569'};">
                      ${p.icon} ${p.label}
                    </button>
                  `).join('')}
                </div>

                <!-- CAROUSEL / GRID OF CATEGORY DEALS -->
                <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(170px, 1fr)); gap: 0.9rem; margin-bottom: 2rem;">
                  ${filteredFavs.map(f => `
                    <div style="background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 14px; overflow: hidden; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 2px 8px rgba(0,0,0,0.02);">
                      <div>
                        <!-- IMAGE BANNER -->
                        <div style="height: 65px; background: ${f.image_bg}; display: flex; align-items: center; justify-content: center; padding: 0.4rem; position: relative;">
                          <span style="position: absolute; top: 6px; left: 6px; background: rgba(0,0,0,0.5); color: #FFF; font-size: 0.55rem; font-weight: 800; padding: 0.1rem 0.35rem; border-radius: 4px;">
                            ${f.brand_tag}
                          </span>
                          <span style="color: #FFFFFF; font-weight: 900; font-size: 0.95rem; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">
                            ${f.brand_logo_text}
                          </span>
                        </div>

                        <div style="padding: 0.75rem;">
                          <div style="font-size: 0.78rem; font-weight: 800; color: #0F172A; line-height: 1.25;">
                            ${f.merchant}
                          </div>
                          <div style="font-size: 0.68rem; color: #64748B; margin-bottom: 0.35rem;">
                            ${f.sub_title}
                          </div>
                          <div style="font-size: 1.05rem; font-weight: 900; color: #EF4444; margin-bottom: 0.35rem;">
                            ${f.price}
                          </div>
                          <div style="font-size: 0.65rem; color: #64748B;">
                            📍 ${f.district} · ★ ${f.rating}
                          </div>
                        </div>
                      </div>

                      <div style="padding: 0 0.75rem 0.75rem 0.75rem;">
                        <button data-action="hunt-deal" data-id="${f.deal_id}" data-code="${f.code}" data-link="${f.link}" style="width: 100%; min-height: 32px; background: ${f.btn_bg}; color: #FFFFFF; border: none; border-radius: 8px; font-size: 0.74rem; font-weight: 800; cursor: pointer;">
                          ${f.btn_text} ➔
                        </button>
                      </div>
                    </div>
                  `).join('')}
                </div>

                <!-- 3 SUMMARY BOTTOM WIDGETS -->
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.9rem;">
                  <!-- WIDGET 1: RADAR TUYẾN -->
                  <div style="background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 14px; padding: 0.9rem; font-size: 0.75rem;">
                    <div style="font-weight: 800; color: #0F172A; margin-bottom: 0.4rem;">🚗 Radar tuyến đi chơi</div>
                    <div style="color: #059669; font-weight: 700; font-size: 0.7rem; margin-bottom: 0.3rem;">TUYẾN SÔNG HÀN - CẦU RỒNG</div>
                    <div style="color: #64748B; font-size: 0.68rem; display: flex; flex-direction: column; gap: 0.2rem; margin-bottom: 0.5rem;">
                      <div>• Trạm 1: Ăn trưa A Hải (11:30)</div>
                      <div>• Trạm 2: Katinat Bạch Đằng (14:30)</div>
                      <div>• Trạm 3: Xanh SM đi dạo -30K (18:00)</div>
                    </div>
                    <div style="font-weight: 800; color: #059669; font-size: 0.72rem;">Tiết kiệm cả chuyến: 76.000đ</div>
                  </div>

                  <!-- WIDGET 2: LỜI NHẮC THÔNG MINH -->
                  <div style="background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 14px; padding: 0.9rem; font-size: 0.75rem;">
                    <div style="font-weight: 800; color: #0F172A; margin-bottom: 0.4rem;">🔔 Lời nhắc thông minh</div>
                    <div style="display: flex; flex-direction: column; gap: 0.4rem; font-size: 0.68rem; color: #475569;">
                      <div><strong>MayCha</strong> đang mở mã 24K <span style="color:#94A3B8;">(2 giờ trước)</span></div>
                      <div><strong>CGV Vincom</strong> vé 55K <span style="color:#94A3B8;">(3 giờ trước)</span></div>
                      <div><strong>Đi xe điện Xanh SM</strong> mã 30K <span style="color:#94A3B8;">(5 giờ trước)</span></div>
                    </div>
                  </div>

                  <!-- WIDGET 3: THỐNG KÊ CỦA BẠN -->
                  <div style="background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 14px; padding: 0.9rem; font-size: 0.75rem; text-align: center;">
                    <div style="font-weight: 800; color: #0F172A; margin-bottom: 0.3rem;">📊 Thống kê của bạn</div>
                    <div style="font-size: 1.35rem; font-weight: 900; color: #059669; margin: 0.2rem 0;">1.247.000đ</div>
                    <div style="font-size: 0.68rem; color: #64748B; margin-bottom: 0.4rem;">Đã săn: <strong>28 kèo</strong> · Chuỗi: <strong>16 ngày</strong></div>
                    <button style="background: #ECFDF5; color: #059669; border: none; padding: 0.25rem 0.6rem; border-radius: 6px; font-size: 0.68rem; font-weight: 700; cursor: pointer;">
                      XEM LỊCH SỬ SĂN KÈO
                    </button>
                  </div>
                </div>

              </div>

              <!-- RIGHT COLUMN: MEMBER PROMO + MAP + COMMITMENT (XANH RÊU JAYT GRADIENT) -->
              <div style="display: flex; flex-direction: column; gap: 1.2rem;">
                
                <!-- MEMBER DISCOUNT BOX -->
                <div style="background: linear-gradient(135deg, #064E3B, #047857); border-radius: 16px; padding: 1.2rem; color: #FFFFFF; box-shadow: 0 4px 15px rgba(4, 120, 87, 0.2);">
                  <div style="font-size: 0.7rem; font-weight: 800; color: #FDE047; text-transform: uppercase; margin-bottom: 0.3rem;">
                    ✨ KHUYẾN MÃI ĐỘC QUYỀN
                  </div>
                  <div style="font-size: 0.72rem; color: #D1FAE5; margin-bottom: 0.8rem;">
                    Dành riêng cho thành viên JayT
                  </div>
                  <div style="background: rgba(255,255,255,0.12); border-radius: 12px; padding: 0.8rem; text-align: center; margin-bottom: 0.8rem;">
                    <div style="font-size: 0.72rem; font-weight: 800; color: #FDE047;">GIÁ MEMBER</div>
                    <div style="font-size: 1.8rem; font-weight: 900;">15%</div>
                    <div style="font-size: 0.68rem; color: #D1FAE5;">Giảm thêm đến 15%</div>
                  </div>
                  <button style="width: 100%; min-height: 36px; background: #FFFFFF; color: #047857; border: none; border-radius: 10px; font-weight: 900; font-size: 0.76rem; cursor: pointer;">
                    KÍCH HOẠT NGAY
                  </button>
                </div>

                <!-- NEARBY MAP WIDGET -->
                <div style="background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 16px; padding: 1rem; box-shadow: 0 2px 8px rgba(0,0,0,0.02);">
                  <div style="font-size: 0.82rem; font-weight: 800; color: #0F172A; margin-bottom: 0.2rem;">
                    📍 Gần bạn nhất
                  </div>
                  <div style="font-size: 0.7rem; color: #64748B; margin-bottom: 0.6rem;">
                    8 kèo trong bán kính 1km
                  </div>
                  <div style="height: 120px; border-radius: 10px; background: #E2E8F0; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; color: #64748B; margin-bottom: 0.6rem; position: relative; overflow: hidden;">
                    <div style="position: absolute; inset: 0; background: url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=400&q=80') center/cover; opacity: 0.85;"></div>
                    <span style="position: relative; z-index: 2; background: rgba(0,0,0,0.65); color: #FFF; padding: 0.2rem 0.5rem; border-radius: 6px; font-weight: 700; font-size: 0.68rem;">ĐÀ NẴNG REAL-TIME</span>
                  </div>
                  <button style="width: 100%; background: #F1F5F9; border: 1px solid #E2E8F0; color: #475569; padding: 0.4rem 0; border-radius: 8px; font-size: 0.72rem; font-weight: 800; cursor: pointer;">
                    XEM TRÊN BẢN ĐỒ
                  </button>
                </div>

                <!-- JAYT COMMITMENT -->
                <div style="background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 16px; padding: 1rem; font-size: 0.72rem;">
                  <div style="font-weight: 800; color: #0F172A; margin-bottom: 0.5rem;">🛡️ Cam kết JayT</div>
                  <div style="display: flex; flex-direction: column; gap: 0.3rem; color: #64748B; font-size: 0.68rem; margin-bottom: 0.6rem;">
                    <div>🟢 Thông tin minh bạch</div>
                    <div>🟢 Địa điểm thực tế</div>
                    <div>🟢 Giá đúng cập nhật</div>
                    <div>🟢 Chỉ kèo đáng tin</div>
                  </div>
                  <a href="#cam-ket" style="color: #059669; font-weight: 800; text-decoration: none; font-size: 0.68rem;">TÌM HIỂU THÊM ➔</a>
                </div>

              </div>

            </div>

          </div>

          <!-- ========================================================= -->
          <!-- 8. MASTER FOOTER (XANH RÊU JAYT BRAND TOUCH)              -->
          <!-- ========================================================= -->
          <footer style="background: #FFFFFF; border-top: 1px solid #E2E8F0; padding: 1.5rem 2rem; display: flex; justify-content: space-between; align-items: center; margin-top: auto; font-size: 0.78rem; color: #64748B; flex-wrap: wrap; gap: 1rem;">
            <div style="display: flex; align-items: center; gap: 0.6rem;">
              <div style="width: 28px; height: 28px; border-radius: 8px; background: linear-gradient(135deg, #10B981, #059669); color: #FFF; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 0.9rem;">
                ▲
              </div>
              <div>
                <strong style="color:#0F172A;">JAYT APEX Đà Nẵng 43</strong> — Bộ nhớ khuyến mãi của người Đà Nẵng
                <div style="font-size: 0.68rem; color: #059669; font-weight: 600;">Mở mỗi ngày · Tiết kiệm mỗi ngày · Sống thông minh mỗi ngày</div>
              </div>
            </div>

            <div style="display: flex; align-items: center; gap: 0.8rem; font-size: 0.75rem;">
              <span>Made with ❤️ in Da Nang</span>
              <div style="display: flex; gap: 0.3rem;">
                <span style="background:#ECFDF5; padding:0.2rem 0.4rem; border-radius:4px; font-weight:800; color:#059669; font-size:0.65rem;">Zalo</span>
                <span style="background:#EFF6FF; padding:0.2rem 0.4rem; border-radius:4px; font-weight:800; color:#2563EB; font-size:0.65rem;">FB</span>
                <span style="background:#F1F5F9; padding:0.2rem 0.4rem; border-radius:4px; font-weight:800; color:#0F172A; font-size:0.65rem;">TikTok</span>
              </div>
            </div>
          </footer>

        </main>
      </div>
    `;
  }

  // 7. EVENT DELEGATION
  document.body.addEventListener('click', function (e) {
    initAudio();
    const btn = e.target.closest('[data-action]');
    if (!btn) return;

    const act = btn.getAttribute('data-action');
    playSound('click');
    triggerHaptic('light');

    if (act === 'hunt-deal') {
      const id = btn.getAttribute('data-id');
      const code = btn.getAttribute('data-code') || '';
      const link = btn.getAttribute('data-link') || '#';

      console.log(`[XanhReu-JayT-Visual] CTA_CLICK: deal_id=${id}, code=${code}`);

      if (navigator.clipboard) {
        navigator.clipboard.writeText(code).then(() => {
          playSound('copy-success');
          triggerHaptic('success');
          fireConfetti();
          setTimeout(() => { window.open(link, '_blank', 'noopener,noreferrer'); }, 400);
        });
      }
    } else if (act === 'filter-feed') {
      State.activeCategoryFilter = btn.getAttribute('data-cat');
      renderApp();
    } else if (act === 'filter-cat') {
      State.activeCategoryFilter = btn.getAttribute('data-cat');
      renderApp();
    } else if (act === 'copy-link') {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(window.location.href).then(() => {
          playSound('copy-success');
          triggerHaptic('success');
          alert('Đã sao chép liên kết JayT APEX để chia sẻ cho nhóm bạn!');
        });
      }
    }
  });

  // 8. BOOTSTRAP
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderApp);
  } else {
    renderApp();
  }

})();
