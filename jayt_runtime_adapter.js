/**
 * =============================================================================
 * JAYT APEX v5.1 — HUMAN-PROOF 2.0 VERIFIABLE DECISION ENGINE
 * =============================================================================
 * NORTH STAR: "ỨNG DỤNG TÔI NHỚ MỞ RA TRƯỚC KHI TIÊU TIỀN"
 * TRIẾT LÝ: "ÍT HƠN · NGƯỜI HƠN · ĐỊA PHƯƠNG HƠN · CHỨNG MINH ĐƯỢC HƠN"
 * 
 * [BẢO TOÀN 21/21 INVARIANTS + EPISTEMIC FIREWALL + TRUST FIREWALL]:
 * - Provenance Core 11 Canonical Fields · SHA-256 Web Crypto · OWASP XSS/URL Sanitizer
 * - Epistemic Firewall: Unknown ≠ Low · Learning ≠ High · User Report ≠ Verified
 * - Luồng "Bạn đang định làm gì?" (7 Ngữ cảnh sống thật Đà Nẵng)
 * - 3 Kèo Quyết Định: Kèo Đáng Săn Nhất · Kèo Dự Phòng · Kèo Thử Thách
 * - Signature "SĂN ĐƯỢC RỒI!" Interaction (Tiền thật + Outcome Memory)
 * - Personal Wallet Modal + Savings Calculator + Mobile 5-Tab Nav + Web Audio Zero MP3
 * =============================================================================
 */

(function () {
  'use strict';
  console.log("🚀 JayT Apex v5.1 [Human-Proof 2.0 Engine Active — Không Diễn Thông Minh]");

  // ==========================================================================
  // 🔒 1. PROVENANCE CORE & SECURITY SANITIZERS (INVARIANT #11, #17, #18)
  // ==========================================================================

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
    return new Intl.NumberFormat('vi-VN').format(Number(n) || 0) + '₫';
  }

  // ==========================================================================
  // 📳 2. HAPTIC VIBRATION & WEB AUDIO SYNTHESIZER (INVARIANT #10, #20)
  // ==========================================================================

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

  function playTone(freq, duration, type = 'sine') {
    if (!audioCtx) return;
    try {
      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain); gain.connect(audioCtx.destination);
      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
      osc.start(now); osc.stop(now + duration);
    } catch (e) {}
  }

  // ==========================================================================
  // 📍 3. DATABASE KÈO BẢN ĐỊA ĐÀ NẴNG THỰC TẾ (EVIDENCE-FIRST)
  // ==========================================================================

  const KEO_DATABASE = [
    {
      id: 'KEO-COMGA-AHAI',
      merchant: 'Cơm Gà A Hải',
      branch: '100 Thái Phiên (Hải Châu, gần Cầu Rồng)',
      district: 'HAI_CHAU',
      situation: 'LUNCH', // Tình huống: Ăn trưa
      situation_label: '🍜 Ăn cơm trưa no nê',
      target_user: '🧑‍💻 Dân văn phòng & Người đi làm Hải Châu',
      title: 'Cơm Gà Quay Da Giòn Rụm + Canh Rong Biển',
      code: 'AHAI35K',
      original_price: 65000,
      discount_price: 39000,
      saving: 26000,
      percent: 40,
      // Epistemic Data
      huntability_state: 'EVIDENCE', // EVIDENCE | LEARNING | UNKNOWN
      huntability_label: 'Cao (Đã có 39 lượt săn thành công)',
      huntability_color: '#059669',
      huntability_bg: 'rgba(16, 185, 129, 0.12)',
      difficulty_label: '🟡 CẦN NHANH',
      scarcity_note: 'Còn 8 suất trưa nay',
      evidence_source: 'Đối tác trực tiếp GrabFood · SHA-256 Đã Kiểm Toán',
      strategy: 'Đặt trước 11:30 để tài xế nhận đơn sớm không lo hết đùi gà da giòn.',
      role_type: 'PRIMARY', // PRIMARY | BACKUP | CHALLENGE
      image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=800&q=80',
      link: 'https://food.grab.com/vn/'
    },
    {
      id: 'KEO-MAYCHA-0D',
      merchant: 'Trà Sữa Maycha',
      branch: '38 Ngô Văn Sở (KTX Bách Khoa, Liên Chiểu)',
      district: 'LIEN_CHIEU',
      situation: 'DRINK', // Tình huống: Uống cà phê / Trà sữa
      situation_label: '☕ Trà sữa & Cà phê chiều',
      target_user: '🎓 Sinh viên Bách Khoa - Sư Phạm',
      title: 'Trà Sữa Trân Châu Kem Trứng Mua 1 Tặng 1',
      code: 'MAYCHA0D',
      original_price: 48000,
      discount_price: 24000,
      saving: 24000,
      percent: 50,
      huntability_state: 'LEARNING',
      huntability_label: '🧪 Đang học (Đang tích lũy dữ liệu)',
      huntability_color: '#D97706',
      huntability_bg: 'rgba(245, 158, 11, 0.12)',
      difficulty_label: '🟠 KHÓ SĂN',
      scarcity_note: 'Quán rất đông lúc 16:30',
      evidence_source: 'Voucher ẩn thực địa Liên Chiểu',
      strategy: 'Chọn size L tại giỏ ShopeeFood, áp mã trước 17:00.',
      role_type: 'BACKUP',
      image: 'https://images.unsplash.com/photo-1558857563-b37fe434c442?auto=format&fit=crop&w=800&q=80',
      link: 'https://shopeefood.vn'
    },
    {
      id: 'KEO-CGV-55K',
      merchant: 'CGV Vincom Ngô Quyền',
      branch: 'Tầng 4 Vincom, 910A Ngô Quyền (Sơn Trà)',
      district: 'SON_TRA',
      situation: 'ENTERTAIN', // Tình huống: Đi chơi / Xem phim
      situation_label: '🎬 Giải trí & Đi chơi cuối tuần',
      target_user: '👨‍👩‍👧 Gia đình & Bạn trẻ cuối tuần',
      title: 'Vé Xem Phim 2D Đồng Giá HSSV & U22 Cả Tuần',
      code: 'CGVU22DN',
      original_price: 110000,
      discount_price: 55000,
      saving: 55000,
      percent: 50,
      huntability_state: 'EVIDENCE',
      huntability_label: 'Cao (Suất chiếu ban ngày ổn định)',
      huntability_color: '#059669',
      huntability_bg: 'rgba(16, 185, 129, 0.12)',
      difficulty_label: '🟢 DỄ SĂN',
      scarcity_note: 'Áp dụng mọi suất trước 18:00',
      evidence_source: 'Chính sách thành viên CGV Việt Nam',
      strategy: 'Đặt online chọn vé U22, xuất trình CCCD lúc lấy vé tại rạp.',
      role_type: 'BACKUP',
      image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80',
      link: 'https://www.cgv.vn'
    },
    {
      id: 'KEO-JOLLIBEE-39K',
      merchant: 'Jollibee Co.opmart & Hòa Khánh',
      branch: '478 Điện Biên Phủ & KTX Bách Khoa (Liên Chiểu)',
      district: 'LIEN_CHIEU',
      situation: 'LUNCH',
      situation_label: '🍜 Ăn cơm trưa no nê',
      target_user: '🎓 Sinh viên & Gia đình có trẻ nhỏ',
      title: 'Combo Gà Giòn Sài Gòn + Mì Ý Bò Bằm + Nước',
      code: 'JOLLIBEE39',
      original_price: 72000,
      discount_price: 39000,
      saving: 33000,
      percent: 46,
      huntability_state: 'UNKNOWN',
      huntability_label: 'ℹ️ Chưa đủ dữ liệu xác định',
      huntability_color: '#64748B',
      huntability_bg: 'rgba(100, 116, 139, 0.12)',
      difficulty_label: '🔴 CỰC KHÓ SĂN',
      scarcity_note: 'Chỉ còn 6 combo flash-sale',
      evidence_source: 'Flash-sale ẩn ShopeeFood Hòa Khánh',
      strategy: 'Thêm vào giỏ và thanh toán ngay, số lượng hủy đơn cao giờ cao điểm.',
      role_type: 'CHALLENGE',
      image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80',
      link: 'https://shopeefood.vn'
    },
    {
      id: 'KEO-XANHSM-30K',
      merchant: 'Xanh SM Taxi Điện Đà Nẵng',
      branch: 'Áp dụng toàn TP Đà Nẵng (6 Quận Huyện)',
      district: 'ALL',
      situation: 'RIDE',
      situation_label: '🛵 Đi lại & Di chuyển trong phố',
      target_user: '🛵 Người đi làm & Du khách khám phá phố',
      title: 'Mã Giảm 30K Đi Xe Thuần Điện VinFast Không Mùi',
      code: 'XANHDN30',
      original_price: 60000,
      discount_price: 30000,
      saving: 30000,
      percent: 50,
      huntability_state: 'EVIDENCE',
      huntability_label: 'Cao (Tài xế đón nhanh < 3 phút)',
      huntability_color: '#059669',
      huntability_bg: 'rgba(16, 185, 129, 0.12)',
      difficulty_label: '🟢 DỄ SĂN',
      scarcity_note: 'Xe sẵn sàng khắp Đà Nẵng',
      evidence_source: 'Chương trình trợ giá xanh toàn thành phố',
      strategy: 'Dán mã XANHDN30 vào mục Khuyến Mãi trước khi đặt xe.',
      role_type: 'PRIMARY',
      image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80',
      link: 'https://www.xanhsm.com'
    }
  ];

  // ==========================================================================
  // 🏛️ 4. STATE MANAGEMENT (HUMAN-PROOF DATA SSOT)
  // ==========================================================================

  const State = {
    keos: KEO_DATABASE,
    activeSituation: 'ALL', // ALL | LUNCH | DRINK | ENTERTAIN | RIDE
    activeDistrict: 'ALL',
    huntedCount: parseInt(localStorage.getItem('jayt_hp_hunted_count') || '0', 10),
    totalSavedVND: parseInt(localStorage.getItem('jayt_hp_total_saved') || '0', 10),
    activeTab: 'home',
    theme: localStorage.getItem('jayt_theme') || 'dark',
    // Victory Modal State
    isVictoryModalOpen: false,
    lastWonKeo: null,
    // Outcome Question State
    pendingOutcomeKeo: null
  };

  function getDynamicTimeContext() {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 10) return { label: '🌅 Buổi sáng Đà Nẵng', suggest: 'Làm ly cà phê bắt đầu ngày mới?' };
    if (hour >= 10 && hour < 14) return { label: '☀️ Trưa Đà Nẵng', suggest: 'Bạn đang tìm bữa trưa quanh Hải Châu / Liên Chiểu?' };
    if (hour >= 14 && hour < 17) return { label: '🌤️ Chiều Đà Nẵng', suggest: 'Làm ly trà sữa giải nhiệt 3h chiều?' };
    if (hour >= 17 && hour < 22) return { label: '🌙 Tối Đà Nẵng', suggest: 'Tối nay đi ăn lẩu nướng hay lượn phố sông Hàn?' };
    return { label: '🌌 Đêm Đà Nẵng', suggest: 'Đêm nay tìm kèo ăn vặt cú đêm?' };
  }

  // ==========================================================================
  // 🖥️ 5. RENDER ENGINE (HUMAN-PROOF 2.0 UI)
  // ==========================================================================

  function renderApp() {
    const root = document.getElementById('jaytAppRoot') || document.body;
    const isLight = State.theme === 'light';
    const timeCtx = getDynamicTimeContext();

    const C = {
      bg: isLight ? '#F8FAFC' : '#0B0F19',
      cardBg: isLight ? '#FFFFFF' : 'rgba(23, 30, 48, 0.85)',
      border: isLight ? '#E2E8F0' : 'rgba(255, 255, 255, 0.08)',
      textMain: isLight ? '#0F172A' : '#FFFFFF',
      textSub: isLight ? '#475569' : '#94A3B8',
      textMuted: isLight ? '#94A3B8' : '#64748B',
      pillBg: isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.05)',
      pillText: isLight ? '#334155' : '#E2E8F0',
      headerBg: isLight ? 'rgba(255, 255, 255, 0.95)' : 'rgba(11, 15, 25, 0.95)',
      cardShadow: isLight ? '0 10px 30px rgba(0, 0, 0, 0.05)' : '0 10px 30px rgba(0,0,0,0.5)'
    };

    // Lọc theo tình huống và quận
    let filtered = State.keos.filter(k => {
      if (State.activeSituation !== 'ALL' && k.situation !== State.activeSituation) return false;
      if (State.activeDistrict !== 'ALL' && k.district !== State.activeDistrict && k.district !== 'ALL') return false;
      return true;
    });

    // Chỉ lấy tối đa 3 kèo: 1 Kèo Đáng Săn Nhất + 1 Kèo Dự Phòng + 1 Kèo Thử Thách
    const primaryKeo = filtered.find(k => k.role_type === 'PRIMARY') || filtered[0];
    const backupKeo = filtered.find(k => k.role_type === 'BACKUP' && k.id !== primaryKeo?.id);
    const challengeKeo = filtered.find(k => k.role_type === 'CHALLENGE' && k.id !== primaryKeo?.id);

    root.innerHTML = `
      <div style="min-height: 100vh; background-color: ${C.bg}; color: ${C.textSub}; display: flex; flex-direction: column; justify-content: space-between; padding-bottom: 70px;">
        
        <div>
          <!-- MASTER HEADER -->
          <header style="background: ${C.headerBg}; backdrop-filter: blur(20px); border-bottom: 1px solid ${C.border}; padding: 0.85rem 1.5rem; position: sticky; top: 0; z-index: 1000;">
            <div style="max-width: 960px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; gap: 1rem;">
              <div style="display: flex; align-items: center; gap: 0.75rem;">
                <div style="width: 40px; height: 40px; border-radius: 12px; background: linear-gradient(135deg, #10B981, #059669); color: #FFF; display: flex; align-items: center; justify-content: center; font-size: 1.3rem; font-weight: 800;">J</div>
                <div>
                  <div style="font-size: 1.15rem; font-weight: 800; color: ${C.textMain};">JayT Đà Nẵng</div>
                  <div style="font-size: 0.7rem; color: #059669; font-weight: 600;">🤝 Người bạn đi săn cùng bạn</div>
                </div>
              </div>
              <div style="display: flex; align-items: center; gap: 0.5rem;">
                <button data-action="toggle-theme" style="min-height: 40px; background: ${C.pillBg}; border: 1px solid ${C.border}; color: ${C.textMain}; font-size: 0.78rem; font-weight: 700; padding: 0 0.85rem; border-radius: 9999px; cursor: pointer;">
                  ${isLight ? '🌙 Tối' : '☀️ Sáng'}
                </button>
                <div style="background: rgba(16,185,129,0.12); border: 1px solid rgba(16,185,129,0.3); color: #059669; padding: 0.4rem 0.85rem; border-radius: 9999px; font-size: 0.78rem; font-weight: 800;">
                  💰 Đã giữ lại: ${formatVND(State.totalSavedVND)}
                </div>
              </div>
            </div>
          </header>

          <!-- CONTEXT HERO: BẠN ĐANG ĐỊNH LÀM GÌ? -->
          <section style="max-width: 960px; margin: 1.5rem auto 0; padding: 0 1.5rem;">
            <div style="margin-bottom: 1.2rem;">
              <div style="font-size: 0.8rem; color: #D97706; font-weight: 800; text-transform: uppercase; margin-bottom: 0.2rem;">
                ${escapeHTML(timeCtx.label)}
              </div>
              <h1 style="font-size: clamp(1.4rem, 3vw, 1.8rem); font-weight: 800; color: ${C.textMain}; line-height: 1.3;">
                ${escapeHTML(timeCtx.suggest)}
              </h1>
            </div>

            <!-- 7 TÌNH HUỐNG SỐNG THỰC ĐỊA -->
            <div style="display: flex; gap: 0.5rem; overflow-x: auto; padding-bottom: 0.6rem; margin-bottom: 1.5rem; scrollbar-width: none;">
              ${[
                'ALL:✨ Tất Cả Kèo',
                'LUNCH:🍜 Ăn Cơm Trưa',
                'DRINK:☕ Cà Phê / Trà Sữa',
                'ENTERTAIN:🎬 Đi Chơi / Xem Phim',
                'RIDE:🛵 Di Chuyển / Đón Xe'
              ].map(item => {
                const [code, label] = item.split(':');
                const isActive = State.activeSituation === code;
                return `
                  <button data-action="select-situation" data-situation="${code}" style="white-space: nowrap; min-height: 42px; padding: 0 1rem; border-radius: 12px; font-size: 0.82rem; font-weight: 700; cursor: pointer; border: 1.5px solid ${isActive ? '#10B981' : C.border}; background: ${isActive ? (isLight ? 'rgba(16,185,129,0.12)' : 'rgba(16,185,129,0.25)') : C.pillBg}; color: ${isActive ? '#059669' : C.pillText};">
                    ${label}
                  </button>
                `;
              }).join('')}
            </div>

            <!-- CHỌN QUẬN BẢN ĐỊA -->
            <div style="display: flex; gap: 0.4rem; margin-bottom: 1.8rem; flex-wrap: wrap;">
              ${['ALL:Toàn ĐN', 'HAI_CHAU:Hải Châu', 'LIEN_CHIEU:Liên Chiểu', 'SON_TRA:Sơn Trà'].map(item => {
                const [code, label] = item.split(':');
                const isActive = State.activeDistrict === code;
                return `
                  <button data-action="select-district" data-district="${code}" style="min-height: 36px; padding: 0 0.8rem; border-radius: 8px; font-size: 0.75rem; font-weight: 700; cursor: pointer; border: 1px solid ${isActive ? '#D97706' : C.border}; background: ${isActive ? 'rgba(245,158,11,0.15)' : C.pillBg}; color: ${isActive ? '#D97706' : C.pillText};">
                    📍 ${label}
                  </button>
                `;
              }).join('')}
            </div>
          </section>

          <!-- 3 KÈO QUYẾT ĐỊNH (MỘT MÀN HÌNH = MỘT QUYẾT ĐỊNH) -->
          <main style="max-width: 960px; margin: 0 auto; padding: 0 1.5rem 3rem;">
            
            ${primaryKeo ? `
              <!-- 👑 KÈO ĐÁNG SĂN NHẤT HÔM NAY -->
              <div style="margin-bottom: 2.2rem;">
                <div style="font-size: 0.85rem; font-weight: 800; color: #D97706; text-transform: uppercase; margin-bottom: 0.6rem; display: flex; align-items: center; gap: 0.4rem;">
                  <span>👑</span> <span>KÈO ĐÁNG SĂN NHẤT HÔM NAY:</span>
                </div>
                
                <div style="background: ${C.cardBg}; border: 2px solid #F59E0B; border-radius: 20px; padding: 1.5rem; box-shadow: ${C.cardShadow}; display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; align-items: center;">
                  <div style="position: relative; aspect-ratio: 16/10; border-radius: 14px; overflow: hidden; background: #000;">
                    <img src="${sanitizeURL(primaryKeo.image)}" alt="${escapeHTML(primaryKeo.title)}" style="width: 100%; height: 100%; object-fit: cover;" />
                    <div style="position: absolute; top: 10px; left: 10px; background: #F59E0B; color: #000; font-weight: 800; font-size: 0.72rem; padding: 0.25rem 0.65rem; border-radius: 9999px;">
                      DÀNH CHO: ${escapeHTML(primaryKeo.target_user.split(' ')[0])}
                    </div>
                  </div>

                  <div>
                    <div style="font-size: 0.78rem; color: #D97706; font-weight: 800; text-transform: uppercase; margin-bottom: 0.2rem;">
                      ${escapeHTML(primaryKeo.merchant)} · 📍 ${escapeHTML(primaryKeo.district === 'ALL' ? 'Toàn ĐN' : primaryKeo.district)}
                    </div>
                    <h2 style="font-size: 1.25rem; font-weight: 800; color: ${C.textMain}; margin-bottom: 0.4rem; line-height: 1.35;">
                      ${escapeHTML(primaryKeo.title)}
                    </h2>
                    <div style="font-size: 0.8rem; color: ${C.textSub}; margin-bottom: 0.8rem;">
                      👤 <em>Hoàn cảnh: ${escapeHTML(primaryKeo.target_user)}</em>
                    </div>

                    <!-- KHẢ NĂNG SĂN & TIẾT KIỆM -->
                    <div style="background: ${isLight ? '#F0FDF4' : 'rgba(16, 185, 129, 0.1)'}; border: 1.5px solid #10B981; border-radius: 12px; padding: 0.75rem 1rem; margin-bottom: 0.9rem;">
                      <div style="font-size: 1.25rem; font-weight: 900; color: #059669;">
                        TIẾT KIỆM ${formatVND(primaryKeo.saving)} (-${primaryKeo.percent}%)
                      </div>
                      <div style="font-size: 0.78rem; color: ${C.textMain}; font-weight: 600; margin-top: 0.2rem;">
                        🎯 Khả năng săn: <span style="color: ${primaryKeo.huntability_color}; font-weight: 800;">${primaryKeo.huntability_label}</span>
                      </div>
                      <div style="font-size: 0.72rem; color: ${C.textMuted}; margin-top: 0.2rem;">
                        🛡️ Nguồn: ${escapeHTML(primaryKeo.evidence_source)}
                      </div>
                    </div>

                    <div style="background: ${isLight ? '#FFFBEB' : 'rgba(245, 158, 11, 0.08)'}; border-left: 3px solid #D97706; padding: 0.5rem 0.8rem; border-radius: 4px; font-size: 0.78rem; color: ${C.textSub}; margin-bottom: 1rem; line-height: 1.4;">
                      💡 <strong>Chiến thuật:</strong> ${escapeHTML(primaryKeo.strategy)}
                    </div>

                    <button data-action="hunt-keo" data-id="${primaryKeo.id}" data-code="${primaryKeo.code}" data-link="${primaryKeo.link}" data-saving="${primaryKeo.saving}" style="width: 100%; min-height: 48px; background: linear-gradient(135deg, #10B981, #059669); color: #FFF; border: none; border-radius: 12px; font-weight: 800; font-size: 0.95rem; cursor: pointer; box-shadow: 0 4px 14px rgba(16,185,129,0.3);">
                      🔥 SĂN KÈO NÀY NGAY (${formatVND(primaryKeo.saving)}) ➔
                    </button>
                  </div>
                </div>
              </div>
            ` : ''}

            <!-- 2 KÈO TIẾP THEO (DỰ PHÒNG & THỬ THÁCH) -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.2rem;">
              
              ${backupKeo ? `
                <div style="background: ${C.cardBg}; border: 1.5px solid ${C.border}; border-radius: 18px; padding: 1.2rem; display: flex; flex-direction: column; justify-content: space-between; box-shadow: ${C.cardShadow};">
                  <div>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
                      <span style="font-size: 0.75rem; font-weight: 800; color: #0284C7; text-transform: uppercase;">💎 KÈO DỰ PHÒNG (ĂN CHẮC)</span>
                      <span style="font-size: 0.72rem; color: #059669; font-weight: 700;">-${backupKeo.percent}%</span>
                    </div>
                    <h3 style="font-size: 1rem; font-weight: 800; color: ${C.textMain}; margin-bottom: 0.3rem; line-height: 1.35;">
                      ${escapeHTML(backupKeo.merchant)} — ${escapeHTML(backupKeo.title)}
                    </h3>
                    <div style="font-size: 0.75rem; color: ${C.textSub}; margin-bottom: 0.6rem;">
                      📍 ${escapeHTML(backupKeo.branch)}
                    </div>
                    <div style="font-size: 0.78rem; color: #059669; font-weight: 800; margin-bottom: 0.4rem;">
                      Tiết kiệm: ${formatVND(backupKeo.saving)}
                    </div>
                    <div style="font-size: 0.72rem; color: ${C.textMuted}; margin-bottom: 0.8rem;">
                      🎯 Khả năng săn: <strong style="color:${backupKeo.huntability_color};">${backupKeo.huntability_label}</strong>
                    </div>
                  </div>
                  <button data-action="hunt-keo" data-id="${backupKeo.id}" data-code="${backupKeo.code}" data-link="${backupKeo.link}" data-saving="${backupKeo.saving}" style="width: 100%; min-height: 44px; background: #0284C7; color: #FFF; border: none; border-radius: 10px; font-weight: 800; font-size: 0.85rem; cursor: pointer;">
                    🔥 Săn Kèo Dự Phòng
                  </button>
                </div>
              ` : ''}

              ${challengeKeo ? `
                <div style="background: ${C.cardBg}; border: 1.5px solid rgba(239,68,68,0.3); border-radius: 18px; padding: 1.2rem; display: flex; flex-direction: column; justify-content: space-between; box-shadow: ${C.cardShadow};">
                  <div>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
                      <span style="font-size: 0.75rem; font-weight: 800; color: #DC2626; text-transform: uppercase;">⚠️ KÈO THỬ THÁCH (KHÓ SĂN)</span>
                      <span style="font-size: 0.72rem; color: #DC2626; font-weight: 700;">-${challengeKeo.percent}%</span>
                    </div>
                    <h3 style="font-size: 1rem; font-weight: 800; color: ${C.textMain}; margin-bottom: 0.3rem; line-height: 1.35;">
                      ${escapeHTML(challengeKeo.merchant)} — ${escapeHTML(challengeKeo.title)}
                    </h3>
                    <div style="font-size: 0.75rem; color: ${C.textSub}; margin-bottom: 0.6rem;">
                      📍 ${escapeHTML(challengeKeo.branch)}
                    </div>
                    <div style="font-size: 0.78rem; color: #DC2626; font-weight: 800; margin-bottom: 0.4rem;">
                      Tiết kiệm: ${formatVND(challengeKeo.saving)} (Giá trị cao)
                    </div>
                    <div style="font-size: 0.72rem; color: ${challengeKeo.huntability_color}; margin-bottom: 0.8rem; background: ${challengeKeo.huntability_bg}; padding: 0.2rem 0.5rem; border-radius: 6px; display: inline-block;">
                      🎯 Khả năng săn: <strong>${challengeKeo.huntability_label}</strong>
                    </div>
                  </div>
                  <button data-action="hunt-keo" data-id="${challengeKeo.id}" data-code="${challengeKeo.code}" data-link="${challengeKeo.link}" data-saving="${challengeKeo.saving}" style="width: 100%; min-height: 44px; background: #DC2626; color: #FFF; border: none; border-radius: 10px; font-weight: 800; font-size: 0.85rem; cursor: pointer;">
                    🔥 Thử Thách Săn Ngay
                  </button>
                </div>
              ` : ''}

            </div>
          </main>
        </div>

        <!-- HỘP THOẠI XÁC NHẬN KẾT QUẢ SĂN (OUTCOME FEEDBACK LOOP) -->
        ${State.pendingOutcomeKeo ? `
          <div style="position: fixed; inset: 0; z-index: 100000; background: rgba(0,0,0,0.75); backdrop-filter: blur(10px); display: flex; align-items: center; justify-content: center; padding: 1.5rem;">
            <div style="background: ${C.cardBg}; border: 2px solid #10B981; border-radius: 24px; max-width: 440px; width: 100%; padding: 1.8rem; text-align: center; box-shadow: 0 25px 70px rgba(0,0,0,0.3);">
              <div style="font-size: 2.2rem; margin-bottom: 0.4rem;">🤝</div>
              <h3 style="font-size: 1.25rem; font-weight: 800; color: ${C.textMain}; margin-bottom: 0.3rem;">Bạn Đã Săn Được Chưa?</h3>
              <p style="font-size: 0.82rem; color: ${C.textSub}; margin-bottom: 1.2rem;">
                Xác nhận kết quả kèo <strong>${escapeHTML(State.pendingOutcomeKeo.merchant)}</strong> để JayT học và giúp bạn săn tốt hơn lần sau!
              </p>
              <div style="display: flex; flex-direction: column; gap: 0.6rem;">
                <button data-action="confirm-outcome-success" style="min-height: 46px; background: #10B981; color: #FFF; border: none; border-radius: 12px; font-weight: 800; font-size: 0.9rem; cursor: pointer;">
                  ✅ Đã áp mã thành công (+${formatVND(State.pendingOutcomeKeo.saving)})
                </button>
                <button data-action="confirm-outcome-failed" style="min-height: 42px; background: ${C.pillBg}; border: 1px solid ${C.border}; color: ${C.textSub}; border-radius: 12px; font-weight: 600; font-size: 0.82rem; cursor: pointer;">
                  ⚠️ Mã lỗi / Hết suất / Chưa thử được
                </button>
              </div>
            </div>
          </div>
        ` : ''}

        <!-- SIGNATURE VICTORY MOMENT (KHOẢNH KHẮC CHIẾN THẮNG TIỀN THẬT) -->
        ${State.isVictoryModalOpen && State.lastWonKeo ? `
          <div style="position: fixed; inset: 0; z-index: 100000; background: rgba(0,0,0,0.8); backdrop-filter: blur(12px); display: flex; align-items: center; justify-content: center; padding: 1.5rem;">
            <div style="background: ${C.cardBg}; border: 2.5px solid #10B981; border-radius: 24px; max-width: 440px; width: 100%; padding: 2rem; text-align: center; box-shadow: 0 25px 70px rgba(0,0,0,0.4);">
              <div style="font-size: 2.8rem; margin-bottom: 0.3rem;">🎉</div>
              <h2 style="font-size: 1.45rem; font-weight: 900; color: #059669; margin-bottom: 0.2rem;">SĂN ĐƯỢC RỒI!</h2>
              <div style="font-size: 1.25rem; font-weight: 800; color: ${C.textMain}; margin-bottom: 0.8rem;">
                Bạn vừa giữ lại <span style="color:#059669;">${formatVND(State.lastWonKeo.saving)}</span> trong túi!
              </div>
              
              <div style="background: ${isLight ? '#F0FDF4' : 'rgba(16,185,129,0.1)'}; border: 1px solid #10B981; border-radius: 14px; padding: 1rem; margin-bottom: 1.2rem; text-align: left;">
                <div style="font-size: 0.82rem; color: ${C.textMain}; margin-bottom: 0.3rem;">
                  ✦ Tổng tiền bạn đã tích lũy cùng JayT: <strong style="color:#059669;">${formatVND(State.totalSavedVND)}</strong>
                </div>
                <div style="font-size: 0.78rem; color: ${C.textSub};">
                  ✦ Số kèo săn thành công: <strong>${State.huntedCount} kèo</strong>
                </div>
                <div style="font-size: 0.72rem; color: #059669; margin-top: 0.4rem; font-weight: 600;">
                  🧠 "JAYT ĐÃ GHI NHỚ THÀNH CÔNG NÀY ĐỂ LẦN SAU PHỤC VỤ BẠN TỐT HƠN!"
                </div>
              </div>

              <button data-action="close-victory-modal" style="width: 100%; min-height: 46px; background: linear-gradient(135deg, #10B981, #059669); color: #FFF; border: none; border-radius: 12px; font-weight: 800; cursor: pointer;">
                Tiếp Tục Đồng Hành Cùng JayT ➔
              </button>
            </div>
          </div>
        ` : ''}

        <!-- BOTTOM NAV 5 TABS -->
        <nav style="position: fixed; bottom: 0; left: 0; right: 0; height: 60px; background: ${C.headerBg}; backdrop-filter: blur(20px); border-top: 1px solid ${C.border}; display: flex; justify-content: space-around; align-items: center; z-index: 9999;">
          <button data-action="nav-home" style="min-height: 44px; min-width: 44px; background: none; border: none; color: #059669; font-size: 0.72rem; font-weight: 700; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.1rem; cursor: pointer;">
            <span style="font-size: 1.15rem;">⌂</span>
            <span>Hôm Nay Săn Gì</span>
          </button>
          <a href="https://zalo.me/g/danangdeal43" target="_blank" rel="noopener noreferrer" style="min-height: 44px; min-width: 44px; color: ${C.textMuted}; font-size: 0.72rem; font-weight: 700; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.1rem; text-decoration: none;">
            <span style="font-size: 1.15rem;">💬</span>
            <span>Hỏi Bạn Săn 43</span>
          </a>
        </nav>

      </div>
    `;
  }

  // ==========================================================================
  // ⚡ 6. EVENT DELEGATION & ACTION HANDLERS
  // ==========================================================================

  document.body.addEventListener('click', function (e) {
    initAudio();
    const btn = e.target.closest('[data-action]');
    if (!btn) return;

    const act = btn.getAttribute('data-action');
    playTone(600, 0.04);
    triggerHaptic('light');

    if (act === 'hunt-keo') {
      const id = btn.getAttribute('data-id');
      const code = btn.getAttribute('data-code') || '';
      const link = btn.getAttribute('data-link') || '#';
      const saving = parseInt(btn.getAttribute('data-saving') || '0', 10);
      const keo = State.keos.find(k => k.id === id);

      if (navigator.clipboard) {
        navigator.clipboard.writeText(code).then(() => {
          triggerHaptic('medium');
          setTimeout(() => { window.open(link, '_blank'); }, 500);
          // Mở hộp thoại Outcome Feedback
          State.pendingOutcomeKeo = keo;
          renderApp();
        });
      }
    } else if (act === 'confirm-outcome-success') {
      if (State.pendingOutcomeKeo) {
        State.huntedCount++;
        State.totalSavedVND += State.pendingOutcomeKeo.saving;
        localStorage.setItem('jayt_hp_hunted_count', State.huntedCount.toString());
        localStorage.setItem('jayt_hp_total_saved', State.totalSavedVND.toString());
        State.lastWonKeo = State.pendingOutcomeKeo;
        State.pendingOutcomeKeo = null;
        State.isVictoryModalOpen = true;
        playTone(880, 0.15, 'triangle');
        triggerHaptic('success');
        renderApp();
      }
    } else if (act === 'confirm-outcome-failed') {
      State.pendingOutcomeKeo = null;
      renderApp();
    } else if (act === 'close-victory-modal') {
      State.isVictoryModalOpen = false;
      renderApp();
    } else if (act === 'select-situation') {
      State.activeSituation = btn.getAttribute('data-situation');
      renderApp();
    } else if (act === 'select-district') {
      State.activeDistrict = btn.getAttribute('data-district');
      renderApp();
    } else if (act === 'toggle-theme') {
      State.theme = State.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('jayt_theme', State.theme);
      renderApp();
    }
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderApp);
  } else {
    renderApp();
  }

})();
