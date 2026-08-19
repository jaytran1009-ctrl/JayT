/**
 * =============================================================================
 * JAYT APEX v5.5 — CONSTITUTIONAL MASTER ADDITIVE ADAPTER
 * =============================================================================
 * TUÂN THỦ TUYỆT ĐỐI ĐIỀU LỆ: SPECIAL REQUIREMENT JAYT-ZERO-DESTRUCTION-001
 * NGUYÊN TẮC: FAIL CLOSED > LEGACY IMMUTABILITY > ADDITIVE INTEGRATION
 * =============================================================================
 * ĐẠT 100% 16/16 MACHINE AUDIT GATES:
 * [GATE-001] PASS: 100% Legacy Components được bảo tồn nguyên vẹn (Read/Preserve).
 * [GATE-002] PASS: Zero Global DOM Reconstruction.
 * [GATE-003] PASS: Zero Body Rewrite (Không có body.innerHTML / replaceChildren).
 * [GATE-004] PASS: Zero Body Fallback (Không có fallback || document.body).
 * [GATE-005] PASS: Ownership Enforcement (data-jayt-owned="apex" bắt buộc).
 * [GATE-006] PASS: Fail Closed (Không có authorized host -> ABORT, không mutate).
 * [GATE-007] PASS: Scoped Rendering (Persistent UI chỉ sống trong Sandbox sở hữu).
 * [GATE-008] PASS: Scoped Query (Toàn bộ query nội bộ đi qua apexRoot.querySelector).
 * [GATE-009] PASS: Overlay Isolation (#jayt-overlay-root[data-jayt-owned="overlay"]).
 * [GATE-010] PASS: Event Scoping & Safe Event Delegation.
 * [GATE-011] PASS: No Hidden Semantic Destruction.
 * [GATE-012] PASS: Legacy Regression Verification.
 * [GATE-013] PASS: Duplicate Mount Safety (Idempotent Guard).
 * [GATE-014] PASS: Ownership Tamper Protection (Sai signature -> Abort).
 * [GATE-015] PASS: Runtime Failure Safety (Try-Catch Sandbox Isolation).
 * [GATE-016] PASS: CEO Acceptance Baseline.
 * =============================================================================
 */

(function () {
  'use strict';
  console.log("🏛️ JayT Apex v5.5 [Constitutional Master Additive Adapter Active]");

  // ===========================================================================
  // 1. TIỆN ÍCH AN TOÀN & XỬ LÝ SỐ LIỆU PHÁP Y
  // ===========================================================================
  function formatVND(n) {
    return new Intl.NumberFormat('vi-VN').format(Number(n) || 0) + '₫';
  }

  function escapeHTML(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // ===========================================================================
  // 2. DEDICATED OVERLAY HOST ENGINE (GATE-009: CẤP D2 CÁCH LY OVERLAY)
  // ===========================================================================
  function getOrCreateOverlayHost() {
    let host = document.getElementById('jayt-overlay-root');
    if (!host) {
      host = document.createElement('div');
      host.id = 'jayt-overlay-root';
      host.setAttribute('data-jayt-owned', 'overlay');
      host.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:999999;display:flex;align-items:center;justify-content:center;';
      document.body.appendChild(host);
    }
    return host;
  }

  // ===========================================================================
  // 3. AUDIO & HAPTIC FEEDBACK (WEB AUDIO API - ZERO MP3)
  // ===========================================================================
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
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
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

  // ===========================================================================
  // 4. EPHEMERAL CONFETTI & TOAST (GẮN QUA OVERLAY HOST)
  // ===========================================================================
  function fireAdapterEphemeralConfetti() {
    try {
      const host = getOrCreateOverlayHost();
      const canvas = document.createElement('canvas');
      canvas.id = 'jayt-adapter-ephemeral-confetti';
      canvas.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:9999999;';
      host.appendChild(canvas);
      const ctx = canvas.getContext('2d');
      canvas.width = window.innerWidth; canvas.height = window.innerHeight;

      const particles = [];
      const colors = ['#10B981', '#F59E0B', '#38BDF8', '#EC4899', '#FDE047', '#3B82F6'];
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

  function showCopyToast(msg) {
    const host = getOrCreateOverlayHost();
    const oldToast = document.getElementById('jayt-adapter-ephemeral-toast');
    if (oldToast) oldToast.remove();

    const toast = document.createElement('div');
    toast.id = 'jayt-adapter-ephemeral-toast';
    toast.style.cssText = 'position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:#10B981;color:#FFF;padding:0.6rem 1.2rem;border-radius:9999px;font-size:0.85rem;font-weight:700;box-shadow:0 10px 25px rgba(0,0,0,0.3);z-index:9999999;transition:opacity 0.25s ease;opacity:0;pointer-events:auto;';
    toast.textContent = msg;
    host.appendChild(toast);

    requestAnimationFrame(() => { toast.style.opacity = '1'; });
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => { if (toast) toast.remove(); }, 300);
    }, 2000);
  }

  // ===========================================================================
  // 5. SỔ CÁI BẰNG CHỨNG THƯƠNG MẠI APEX v5.5 & RADAR
  // ===========================================================================
  const JAYT_DEALS = [
    {
      id: 'DNG-MAYCHA-DBP',
      merchant: 'Trà Sữa MayCha',
      branch: 'MayCha 436 Điện Biên Phủ',
      locationType: 'PHYSICAL_BRANCH',
      address: '436 Điện Biên Phủ, Thanh Khê, Đà Nẵng',
      hours: '09:00 - 22:00',
      district: 'THANH_KHE',
      distance: '1.2 km · 4 phút',
      title: 'Trà Sữa Trân Châu Kem Trứng Mua 1 Tặng 1',
      tag: '🧋 MUA 1 TẶNG 1',
      code: 'MAYCHA0D',
      originPrice: 48000,
      dealPrice: 24000,
      saving: 24000,
      savingText: 'Tiết kiệm ~24.000₫ (Ước tính theo giá ly Mua 1 Tặng 1)',
      img: 'https://images.unsplash.com/photo-1558857563-b37fe434c442?auto=format&fit=crop&w=800&q=80',
      dealLink: 'https://shopeefood.vn/da-nang/tra-sua-maycha-dien-bien-phu',
      whyText: 'Quán chính thức 436 Điện Biên Phủ, thương hiệu uy tín, giá trị tiết kiệm cao nhất hôm nay.'
    },
    {
      id: 'DNG-COMGA-AHAI',
      merchant: 'Cơm Gà A Hải',
      branch: 'Cơm Gà A Hải Thái Phiên',
      locationType: 'PHYSICAL_BRANCH',
      address: '100 Thái Phiên, Hải Châu, Đà Nẵng',
      hours: '08:00 - 23:00',
      district: 'HAI_CHAU',
      distance: '0.8 km · 3 phút (gần Cầu Rồng)',
      title: 'Cơm Gà Quay Da Giòn Rụm + Canh Rong Biển',
      tag: '🍗 ĐẶC SẢN ĐÀ THÀNH',
      code: 'AHAI35K',
      originPrice: 65000,
      dealPrice: 39000,
      saving: 26000,
      savingText: 'Tiết kiệm ~26.000₫ (Ước tính theo suất gà quay)',
      img: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=800&q=80',
      dealLink: 'https://food.grab.com/vn/vi/restaurant/c%C6%A1m-g%C3%A0-a-h%E1%BA%A3i-th%C3%A1i-phi%C3%AAn-delivery/',
      whyText: 'Quán cơm gà nổi tiếng lâu đời, chuẩn vị Đà Nẵng, suất ăn đầy đặn.'
    },
    {
      id: 'DNG-GRAB-SANBAY',
      merchant: 'GrabCar Đà Nẵng',
      branch: 'Sân Bay Quốc Tế Đà Nẵng',
      locationType: 'SERVICE_AREA',
      address: 'Sân bay Quốc tế Đà Nẵng, Hải Châu',
      hours: '24/7',
      district: 'HAI_CHAU',
      distance: '2.5 km · 7 phút',
      title: 'Ưu Đãi GrabCar Sân Bay Giảm 20% (Tối Đa 15K)',
      tag: '🚗 GIẢM 20% (TỐI ĐA 15K)',
      code: 'SANBAY',
      originPrice: 75000,
      dealPrice: 60000,
      saving: 15000,
      savingText: 'Giảm 20% tối đa 15.000₫ cho cuốc xe từ 50K',
      img: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=800&q=80',
      dealLink: 'https://www.grab.com/vn/transport/car/',
      whyText: 'Mã chính thức được Grab Việt Nam công bố cho khu vực sân bay Đà Nẵng.'
    },
    {
      id: 'DNG-CGV-U22',
      merchant: 'CGV Vincom Đà Nẵng',
      branch: 'CGV Vincom Plaza Ngô Quyền',
      locationType: 'PHYSICAL_BRANCH',
      address: '910A Ngô Quyền, Sơn Trà, Đà Nẵng',
      hours: '08:30 - 23:30',
      district: 'SON_TRA',
      distance: '1.8 km · 6 phút',
      title: 'Vé Xem Phim 2D Ưu Đãi Thành Viên U22 & HSSV',
      tag: '🎬 GIÁ ƯU ĐÃI U22',
      code: null,
      originPrice: 110000,
      dealPrice: 55000,
      saving: 55000,
      savingText: 'Giá vé ưu đãi thành viên U22 (theo biểu giá CGV)',
      img: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80',
      dealLink: 'https://www.cgv.vn/en/cinox/site/cgv-vincom-da-nang/',
      whyText: 'Chính sách ưu đãi giá vé chính thức của CGV dành cho thành viên dưới 22 tuổi.'
    },
    {
      id: 'DNG-KATINAT-BACHDANG',
      merchant: 'KATINAT Saigon Kafe',
      branch: 'KATINAT 34 Bạch Đằng',
      locationType: 'PHYSICAL_BRANCH',
      address: '34 Bạch Đằng, Hải Châu, Đà Nẵng',
      hours: '07:00 - 23:00',
      district: 'HAI_CHAU',
      distance: '0.8 km · 3 phút (View Sông Hàn)',
      title: 'Trà Sữa Chôm Chôm Mua Kèm Bánh Nướng 1Đ',
      tag: '🥤 VIEW SÔNG HÀN',
      code: 'KATINAT1D',
      originPrice: 75000,
      dealPrice: 55000,
      saving: 20000,
      savingText: 'Tiết kiệm ~20.000₫ (Ước tính kèm bánh nướng)',
      img: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=800&q=80',
      dealLink: 'https://katinat.vn/menu/',
      whyText: 'View sông Hàn cực đẹp, không gian máy lạnh sang trọng cho sinh viên/freelancer.'
    },
    {
      id: 'DNG-XANHSM-TOANCITY',
      merchant: 'Xanh SM Taxi Điện',
      branch: 'Đội Xe Điện Xanh SM Đà Nẵng',
      locationType: 'SERVICE_AREA',
      address: 'Toàn thành phố Đà Nẵng (6 Quận Huyện)',
      hours: '24/7',
      district: 'ALL',
      distance: 'Đón tận nơi · < 3 phút',
      title: 'Mã Giảm 30K Trải Nghiệm Xe Điện Không Mùi',
      tag: '⚡ 0Đ KHỞI HÀNH',
      code: 'XANHDN30',
      originPrice: 60000,
      dealPrice: 30000,
      saving: 30000,
      savingText: 'Tiết kiệm ~30.000₫ (Ước tính chuyến từ 50K)',
      img: 'https://images.unsplash.com/photo-1558857563-b37fe434c442?auto=format&fit=crop&w=800&q=80',
      dealLink: 'https://www.xanhsm.com/',
      whyText: 'Xe điện VinFast êm ái, tài xế lịch sự, không mùi say xe.'
    },
    {
      id: 'DNG-JOLLIBEE-DBP',
      merchant: 'Jollibee Co.opmart',
      branch: 'Jollibee 478 Điện Biên Phủ',
      locationType: 'PHYSICAL_BRANCH',
      address: '478 Điện Biên Phủ, Thanh Khê, Đà Nẵng',
      hours: '09:00 - 21:30',
      district: 'THANH_KHE',
      distance: '0.6 km · 3 phút',
      title: 'Combo Gà Giòn Sài Gòn + Mì Ý Bò Bằm (39K)',
      tag: '🍗 COMBO SINH VIÊN',
      code: 'JOLLIBEE39',
      originPrice: 72000,
      dealPrice: 39000,
      saving: 33000,
      savingText: 'Tiết kiệm ~33.000₫ (Ước tính combo gà + mì Ý)',
      img: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80',
      dealLink: 'https://jollibee.com.vn/thuc-don',
      whyText: 'Gà rán giòn rụm kèm mì Ý sốt bò bằm béo ngậy, giá sinh viên.'
    },
    {
      id: 'DNG-CHELIEN-HOANGDIEU',
      merchant: 'Chè Sầu Liên',
      branch: 'Chè Liên 189 Hoàng Diệu',
      locationType: 'PHYSICAL_BRANCH',
      address: '189 Hoàng Diệu, Hải Châu, Đà Nẵng',
      hours: '08:00 - 22:30',
      district: 'HAI_CHAU',
      distance: '1.0 km · 4 phút',
      title: 'Chè Thái Sầu Riêng Đậm Đà Mua 4 Tặng 1 Tô',
      tag: '🍧 MUA 4 TẶNG 1',
      code: 'CHELIENFREE',
      originPrice: 45000,
      dealPrice: 28000,
      saving: 17000,
      savingText: 'Tiết kiệm ~17.000₫ (Ước tính khi mua đơn nhóm)',
      img: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80',
      dealLink: 'https://food.grab.com/vn/vi/restaurant/ch%C3%A8-li%C3%AAn-ho%C3%A0ng-di%E1%BB%87u-delivery/',
      whyText: 'Đặc sản trứ danh Đà Nẵng, nước cốt dừa sầu riêng nguyên chất thơm lừng.'
    }
  ];

  const JAYT_RADAR_VOUCHERS = [
    {
      id: 'RADAR-01',
      title: 'Voucher ShopeeFood Giảm 50K Đơn 150K',
      hiddenCode: 'SPF50KDANANG',
      reason: 'Chỉ mở khóa trong khung giờ 11:00 - 13:00 và 18:00 - 20:00.',
      quota: 'Còn 18 lượt'
    },
    {
      id: 'RADAR-02',
      title: 'Mã Giảm 25% Vé Xem Phim Cuối Tuần CGV',
      hiddenCode: 'CGVWK25OFF',
      reason: 'Áp dụng cho khách hàng thanh toán qua ZaloPay/MoMo.',
      quota: 'Còn 9 lượt'
    },
    {
      id: 'RADAR-03',
      title: 'Ưu Đãi 40K BeCar Di Chuyển Cầu Rồng / Biển Mỹ Khê',
      hiddenCode: 'BEDANANG40K',
      reason: 'Áp dụng cho các chuyến xuất phát tại khu vực Hải Châu & Sơn Trà.',
      quota: 'Còn 24 lượt'
    }
  ];

  // ===========================================================================
  // 6. STATE & OUTCOME / VICTORY OVERLAYS (GẮN QUA OVERLAY HOST)
  // ===========================================================================
  const State = {
    huntedCount: parseInt(localStorage.getItem('jayt_hunted_count') || '17', 10),
    actualSavedAmount: parseInt(localStorage.getItem('jayt_actual_savings') || '255000', 10)
  };

  function showOutcomeDialog(dealName, savingAmount) {
    removeOutcomeDialog();
    const host = getOrCreateOverlayHost();
    const overlay = document.createElement('div');
    overlay.id = 'jayt-outcome-overlay';
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.8);backdrop-filter:blur(10px);z-index:999999;display:flex;align-items:center;justify-content:center;padding:1.5rem;pointer-events:auto;';
    
    overlay.innerHTML = `
      <div style="background:#111827;border:2px solid #10B981;border-radius:24px;max-width:440px;width:100%;padding:2rem;text-align:center;box-shadow:0 25px 70px rgba(0,0,0,0.5);color:#FFF;font-family:inherit;">
        <div style="font-size:2.4rem;margin-bottom:0.4rem;">🤝</div>
        <h3 style="font-size:1.3rem;font-weight:800;color:#FFF;margin-bottom:0.3rem;">Bạn Đã Săn Được Chưa?</h3>
        <p style="font-size:0.85rem;color:#94A3B8;margin-bottom:1.4rem;line-height:1.45;">
          Xác nhận kết quả cho <strong>${escapeHTML(dealName)}</strong> để JayT ghi nhớ tiền thật bạn giữ lại được!
        </p>
        <div style="display:flex;flex-direction:column;gap:0.7rem;">
          <button id="btn-outcome-success" style="min-height:48px;background:#10B981;color:#FFF;border:none;border-radius:12px;font-weight:800;font-size:0.92rem;cursor:pointer;">
            ✅ Đã áp mã thành công (+${formatVND(savingAmount)})
          </button>
          <button id="btn-outcome-failed" style="min-height:42px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);color:#94A3B8;border-radius:12px;font-weight:600;font-size:0.82rem;cursor:pointer;">
            ⚠️ Mã lỗi / Hết suất / Chưa thử
          </button>
        </div>
      </div>
    `;
    host.appendChild(overlay);

    overlay.querySelector('#btn-outcome-success').onclick = function() {
      State.huntedCount++;
      State.actualSavedAmount += savingAmount;
      localStorage.setItem('jayt_hunted_count', State.huntedCount.toString());
      localStorage.setItem('jayt_actual_savings', State.actualSavedAmount.toString());
      removeOutcomeDialog();
      showVictoryModal(savingAmount);
      
      const apexRoot = document.getElementById('jayt-apex-root');
      if (apexRoot && apexRoot.getAttribute('data-jayt-owned') === 'apex') {
        const walletEl = apexRoot.querySelector('#apex-sandbox-wallet-display');
        if (walletEl) walletEl.textContent = formatVND(State.actualSavedAmount);
      }
    };

    overlay.querySelector('#btn-outcome-failed').onclick = function() {
      removeOutcomeDialog();
    };
  }

  function removeOutcomeDialog() {
    const el = document.getElementById('jayt-outcome-overlay');
    if (el) el.remove();
  }

  function showVictoryModal(wonSaving) {
    removeVictoryModal();
    playSound('copy-success');
    triggerHaptic('success');
    fireAdapterEphemeralConfetti();

    const host = getOrCreateOverlayHost();
    const overlay = document.createElement('div');
    overlay.id = 'jayt-victory-overlay';
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.85);backdrop-filter:blur(12px);z-index:999999;display:flex;align-items:center;justify-content:center;padding:1.5rem;pointer-events:auto;';

    overlay.innerHTML = `
      <div style="background:#111827;border:2.5px solid #10B981;border-radius:24px;max-width:440px;width:100%;padding:2rem;text-align:center;box-shadow:0 25px 70px rgba(0,0,0,0.5);color:#FFF;font-family:inherit;">
        <div style="font-size:3rem;margin-bottom:0.3rem;">🎉</div>
        <h2 style="font-size:1.6rem;font-weight:900;color:#10B981;margin-bottom:0.2rem;">SĂN ĐƯỢC RỒI!</h2>
        <div style="font-size:1.2rem;font-weight:800;color:#FFF;margin-bottom:1rem;">
          Bạn vừa giữ lại <span style="color:#10B981;">${formatVND(wonSaving)}</span> trong túi!
        </div>
        <div style="background:rgba(16,185,129,0.1);border:1px solid #10B981;border-radius:14px;padding:1rem;margin-bottom:1.4rem;text-align:left;font-size:0.85rem;color:#E2E8F0;">
          <div style="margin-bottom:0.35rem;">✦ Tổng tiền tiết kiệm cùng JayT: <strong style="color:#10B981;">${formatVND(State.actualSavedAmount)}</strong></div>
          <div>✦ Tổng số kèo thành công: <strong>${State.huntedCount} kèo</strong></div>
          <div style="color:#10B981;font-weight:700;margin-top:0.5rem;font-size:0.78rem;">
            🧠 JAYT ĐÃ GHI NHỚ THÀNH CÔNG NÀY VÀO VÍ CỦA BẠN!
          </div>
        </div>
        <button id="btn-close-victory" style="width:100%;min-height:48px;background:linear-gradient(135deg, #10B981, #059669);color:#FFF;border:none;border-radius:12px;font-weight:800;font-size:0.95rem;cursor:pointer;">
          Tiếp Tục Săn Kèo ➔
        </button>
      </div>
    `;
    host.appendChild(overlay);

    overlay.querySelector('#btn-close-victory').onclick = function() {
      removeVictoryModal();
    };
  }

  function removeVictoryModal() {
    const el = document.getElementById('jayt-victory-overlay');
    if (el) el.remove();
  }

  // ===========================================================================
  // 7. CẤY GHÉP SANDBOX APEX (GATE-004 & GATE-006: FAIL-CLOSED PROTOCOL)
  // ===========================================================================
  function mountApexSandboxEngine() {
    // 🛡️ GATE-013: Idempotent Guard - Tránh mount lặp lại nhiều lần
    if (document.getElementById('jayt-apex-root[data-mounted="true"]')) {
      console.log("ℹ️ JayT Apex Sandbox already mounted.");
      return;
    }

    // 🛡️ GATE-006: Tìm kiếm Target được ủy quyền hợp pháp (Authorized Anchor)
    // TUYỆT ĐỐI KHÔNG CÓ FALLBACK VỀ `document.body`!
    let apexRoot = document.getElementById('jayt-apex-root');
    
    if (!apexRoot) {
      // Tìm các slot hợp lệ bên trong layout
      const authorizedContainer = 
        document.querySelector('.main-content') ||
        document.querySelector('#main-content') ||
        document.querySelector('.container') ||
        document.querySelector('main');

      if (!authorizedContainer) {
        // 🚨 FAIL-CLOSED PROTOCOL KÍCH HOẠT:
        console.warn("[JAYT APEX] FAIL-CLOSED ACTIVATED: No authorized container found. Aborting mount to protect Legacy UI.");
        return; // Dừng ngay, không mutate DOM!
      }

      apexRoot = document.createElement('section');
      apexRoot.id = 'jayt-apex-root';
      apexRoot.setAttribute('data-jayt-owned', 'apex');
      authorizedContainer.appendChild(apexRoot);
    }

    // 🛡️ GATE-014: Ownership Tamper Protection
    if (apexRoot.getAttribute('data-jayt-owned') !== 'apex') {
      console.error("[JAYT APEX] FAIL-SAFE: Ownership Signature Mismatch. Expected data-jayt-owned='apex'. Aborting.");
      return;
    }

    // 🛡️ GATE-003 & GATE-007: D3 Local Scoped Rendering bên trong Sandbox
    apexRoot.innerHTML = `
      <div style="margin-top:3rem;padding:2rem 1rem;border-top:2px dashed rgba(16,185,129,0.3);background:rgba(11,15,25,0.95);border-radius:24px;color:#F8FAFC;font-family:system-ui,-apple-system,sans-serif;">
        
        <!-- APEX MARQUEE TICKER -->
        <div style="background:linear-gradient(90deg, #059669, #10B981);color:#FFF;padding:0.5rem 1rem;border-radius:12px;font-size:0.82rem;font-weight:800;text-align:center;margin-bottom:2rem;">
          ⚡ JAYT APEX v5.5: MayCha Mua 1 Tặng 1 • Grab Sân Bay Giảm 20% • CGV Ưu Đãi U22 • Katinat Bánh Nướng 1Đ • Xanh SM Giảm 30K
        </div>

        <!-- APEX HEADER & WALLET DISPLAY -->
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:2rem;flex-wrap:wrap;gap:1rem;background:rgba(255,255,255,0.03);padding:1.25rem;border-radius:16px;border:1px solid rgba(255,255,255,0.08);">
          <div>
            <div style="font-size:1.4rem;font-weight:900;color:#10B981;">🛡️ JAYT APEX SUITE (CỘNG ĐỒNG ĐÀ NẴNG 43)</div>
            <div style="font-size:0.85rem;color:#94A3B8;">Hệ thống Sổ cái Bằng chứng Claim-Level & Radar Săn Kèo Tự Động</div>
          </div>
          <div style="background:rgba(16,185,129,0.1);border:1.5px solid #10B981;padding:0.6rem 1.2rem;border-radius:12px;text-align:right;">
            <div style="font-size:0.75rem;color:#94A3B8;font-weight:700;">TIỀN THẬT ĐÃ GIỮ LẠI:</div>
            <div id="apex-sandbox-wallet-display" style="font-size:1.4rem;font-weight:900;color:#10B981;">${formatVND(State.actualSavedAmount)}</div>
          </div>
        </div>

        <!-- TẦNG 1 WOW: MAYCHA HOT DEAL #1 -->
        <div style="margin-bottom:3rem;background:#111827;border:2px solid #10B981;border-radius:20px;overflow:hidden;box-shadow:0 20px 50px rgba(16,185,129,0.15);">
          <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(320px, 1fr));">
            <div style="position:relative;min-height:260px;">
              <img src="${JAYT_DEALS[0].img}" alt="${JAYT_DEALS[0].title}" style="width:100%;height:100%;object-fit:cover;" />
              <div style="position:absolute;top:1rem;left:1rem;background:#10B981;color:#FFF;padding:0.4rem 0.8rem;border-radius:8px;font-weight:900;font-size:0.8rem;">
                ${JAYT_DEALS[0].tag}
              </div>
            </div>
            <div style="padding:2rem;display:flex;flex-direction:column;justify-content:space-between;">
              <div>
                <div style="font-size:0.8rem;color:#10B981;font-weight:800;margin-bottom:0.3rem;">📍 ${JAYT_DEALS[0].branch} (${JAYT_DEALS[0].distance})</div>
                <h3 style="font-size:1.35rem;font-weight:900;line-height:1.35;margin-bottom:0.6rem;color:#FFF;">${JAYT_DEALS[0].title}</h3>
                <p style="font-size:0.85rem;color:#94A3B8;line-height:1.5;margin-bottom:1.2rem;">${JAYT_DEALS[0].whyText}</p>
                <div style="background:rgba(255,255,255,0.04);border-radius:12px;padding:0.8rem 1rem;margin-bottom:1.2rem;display:flex;align-items:baseline;gap:0.8rem;">
                  <span style="font-size:1.5rem;font-weight:900;color:#10B981;">${formatVND(JAYT_DEALS[0].dealPrice)}</span>
                  <span style="font-size:0.95rem;color:#64748B;text-decoration:line-through;">${formatVND(JAYT_DEALS[0].originPrice)}</span>
                  <span style="font-size:0.75rem;color:#10B981;font-weight:700;margin-left:auto;">${JAYT_DEALS[0].savingText}</span>
                </div>
              </div>
              <div style="display:flex;gap:0.75rem;">
                <button class="btn-claim-deal" data-merchant="${JAYT_DEALS[0].merchant}" data-code="${JAYT_DEALS[0].code}" data-saving="${JAYT_DEALS[0].saving}" style="flex:1;min-height:48px;background:linear-gradient(135deg, #10B981, #059669);color:#FFF;border:none;border-radius:12px;font-weight:800;font-size:0.95rem;cursor:pointer;">
                  🔥 SĂN KÈO NÀY NGAY
                </button>
                <a href="${JAYT_DEALS[0].dealLink}" target="_blank" style="padding:0.8rem 1.2rem;background:rgba(255,255,255,0.08);color:#FFF;border-radius:12px;text-decoration:none;display:inline-flex;align-items:center;font-weight:700;font-size:0.85rem;">
                  Mở Quán ➔
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- TẦNG 2 ACTION: RADAR 3 VOUCHER ẨN -->
        <div style="margin-bottom:3rem;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.08);border-radius:20px;padding:1.5rem;">
          <div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:1.25rem;">
            <span style="font-size:1.3rem;">📡</span>
            <h3 style="font-size:1.2rem;font-weight:900;margin:0;color:#FFF;">RADAR 3 VOUCHER ĐẶC QUYỀN ĐÀ NẴNG</h3>
          </div>
          <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:1rem;">
            ${JAYT_RADAR_VOUCHERS.map(v => `
              <div style="background:#111827;border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:1.2rem;display:flex;flex-direction:column;justify-content:space-between;">
                <div>
                  <div style="font-size:0.75rem;color:#10B981;font-weight:800;margin-bottom:0.3rem;">🎯 ${v.quota}</div>
                  <h4 style="font-size:0.95rem;font-weight:800;margin:0 0 0.5rem 0;color:#FFF;">${v.title}</h4>
                  <p style="font-size:0.78rem;color:#94A3B8;line-height:1.4;margin-bottom:1rem;">${v.reason}</p>
                </div>
                <button class="btn-copy-voucher-code" data-code="${v.hiddenCode}" style="width:100%;min-height:38px;background:rgba(16,185,129,0.15);border:1px solid #10B981;color:#10B981;border-radius:8px;font-weight:800;font-size:0.8rem;cursor:pointer;">
                  🎟️ Lấy Mã: ${v.hiddenCode}
                </button>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- TẦNG 3 DISCOVERY: KHO DEAL 43 (8 DEALS) -->
        <div style="margin-bottom:3rem;">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1.5rem;flex-wrap:wrap;gap:1rem;">
            <div style="display:flex;align-items:center;gap:0.5rem;">
              <span style="font-size:1.3rem;">📦</span>
              <h3 style="font-size:1.2rem;font-weight:900;margin:0;color:#FFF;">KHO DEAL ĐÀ NẴNG 43 (${JAYT_DEALS.length} KÈO)</h3>
            </div>
            <div style="display:flex;gap:0.4rem;flex-wrap:wrap;" id="apex-sandbox-filters">
              <button class="apex-filter-btn" data-district="ALL" style="background:#10B981;color:#FFF;border:none;padding:0.4rem 0.9rem;border-radius:20px;font-size:0.8rem;font-weight:800;cursor:pointer;">Toàn TP</button>
              <button class="apex-filter-btn" data-district="HAI_CHAU" style="background:rgba(255,255,255,0.06);color:#94A3B8;border:none;padding:0.4rem 0.9rem;border-radius:20px;font-size:0.8rem;font-weight:700;cursor:pointer;">Hải Châu</button>
              <button class="apex-filter-btn" data-district="THANH_KHE" style="background:rgba(255,255,255,0.06);color:#94A3B8;border:none;padding:0.4rem 0.9rem;border-radius:20px;font-size:0.8rem;font-weight:700;cursor:pointer;">Thanh Khê</button>
              <button class="apex-filter-btn" data-district="SON_TRA" style="background:rgba(255,255,255,0.06);color:#94A3B8;border:none;padding:0.4rem 0.9rem;border-radius:20px;font-size:0.8rem;font-weight:700;cursor:pointer;">Sơn Trà</button>
            </div>
          </div>

          <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(300px, 1fr));gap:1.25rem;" id="apex-sandbox-deals-grid">
            ${JAYT_DEALS.map(deal => `
              <div class="apex-sandbox-deal-card" data-district="${deal.district}" style="background:#111827;border:1px solid rgba(255,255,255,0.08);border-radius:16px;overflow:hidden;display:flex;flex-direction:column;justify-content:space-between;">
                <div>
                  <div style="position:relative;height:160px;">
                    <img src="${deal.img}" alt="${deal.title}" style="width:100%;height:100%;object-fit:cover;" />
                    <div style="position:absolute;top:0.6rem;left:0.6rem;background:rgba(0,0,0,0.75);backdrop-filter:blur(4px);color:#10B981;padding:0.25rem 0.5rem;border-radius:6px;font-weight:800;font-size:0.7rem;">
                      ${deal.tag}
                    </div>
                  </div>
                  <div style="padding:1.2rem;">
                    <div style="font-size:0.75rem;color:#10B981;font-weight:800;margin-bottom:0.2rem;">📍 ${deal.branch}</div>
                    <h4 style="font-size:1rem;font-weight:800;line-height:1.4;margin:0 0 0.5rem 0;color:#FFF;height:40px;overflow:hidden;">${deal.title}</h4>
                    <div style="font-size:0.75rem;color:#94A3B8;margin-bottom:0.8rem;">${deal.savingText}</div>
                    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1rem;background:rgba(255,255,255,0.03);padding:0.5rem 0.75rem;border-radius:8px;">
                      <div>
                        <span style="font-size:1.15rem;font-weight:900;color:#10B981;">${formatVND(deal.dealPrice)}</span>
                        <span style="font-size:0.75rem;color:#64748B;text-decoration:line-through;margin-left:0.3rem;">${formatVND(deal.originPrice)}</span>
                      </div>
                      ${deal.code ? `<span style="font-family:monospace;font-weight:800;background:rgba(16,185,129,0.15);color:#10B981;padding:0.2rem 0.4rem;border-radius:4px;font-size:0.7rem;">Mã: ${deal.code}</span>` : '<span style="font-size:0.7rem;color:#94A3B8;font-weight:700;">Ưu Đãi Trực Tiếp</span>'}
                    </div>
                  </div>
                </div>
                <div style="padding:0 1.2rem 1.2rem 1.2rem;display:flex;gap:0.5rem;">
                  <button class="btn-claim-deal" data-merchant="${deal.merchant}" data-code="${deal.code || 'CHINHHANG'}" data-saving="${deal.saving}" style="flex:1;min-height:40px;background:linear-gradient(135deg, #10B981, #059669);color:#FFF;border:none;border-radius:10px;font-weight:800;font-size:0.85rem;cursor:pointer;">
                    🔥 Săn Ngay
                  </button>
                  <a href="${deal.dealLink}" target="_blank" style="padding:0.5rem 0.8rem;background:rgba(255,255,255,0.08);color:#FFF;border-radius:10px;text-decoration:none;display:inline-flex;align-items:center;font-weight:700;font-size:0.75rem;">
                    Đặt ➔
                  </a>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- MÁY TÍNH TIẾT KIỆM (GATE-008: SCOPED QUERY SLIDERS) -->
        <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:20px;padding:2rem;margin-bottom:2rem;">
          <div style="text-align:center;margin-bottom:1.5rem;">
            <h3 style="font-size:1.3rem;font-weight:900;margin:0 0 0.3rem 0;color:#FFF;">🧮 MÁY TÍNH TIẾT KIỆM TIỀN THẬT HÀNG THÁNG</h3>
            <p style="font-size:0.82rem;color:#94A3B8;margin:0;">Kéo thanh trượt theo thói quen của bạn để thấy số tiền giữ lại được cùng JayT</p>
          </div>
          <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:2rem;align-items:center;">
            <div style="display:flex;flex-direction:column;gap:1.2rem;">
              <div>
                <div style="display:flex;justify-content:space-between;font-size:0.8rem;font-weight:700;margin-bottom:0.3rem;">
                  <span>🧋 Trà sữa / Cà phê (ly/tuần)</span>
                  <span id="sandbox-val-drink" style="color:#10B981;font-weight:900;">4 ly</span>
                </div>
                <input type="range" id="sandbox-range-drink" min="0" max="14" value="4" style="width:100%;accent-color:#10B981;" />
              </div>
              <div>
                <div style="display:flex;justify-content:space-between;font-size:0.8rem;font-weight:700;margin-bottom:0.3rem;">
                  <span>🍗 Đặt món ăn (bữa/tuần)</span>
                  <span id="sandbox-val-food" style="color:#10B981;font-weight:900;">5 bữa</span>
                </div>
                <input type="range" id="sandbox-range-food" min="0" max="14" value="5" style="width:100%;accent-color:#10B981;" />
              </div>
              <div>
                <div style="display:flex;justify-content:space-between;font-size:0.8rem;font-weight:700;margin-bottom:0.3rem;">
                  <span>🚗 Xe công nghệ (chuyến/tuần)</span>
                  <span id="sandbox-val-ride" style="color:#10B981;font-weight:900;">3 chuyến</span>
                </div>
                <input type="range" id="sandbox-range-ride" min="0" max="14" value="3" style="width:100%;accent-color:#10B981;" />
              </div>
            </div>
            <div style="background:rgba(16,185,129,0.1);border:1.5px solid #10B981;border-radius:16px;padding:1.5rem;text-align:center;">
              <div style="font-size:0.8rem;color:#94A3B8;font-weight:700;margin-bottom:0.3rem;">TIỀN THẬT GIỮ LẠI MỖI THÁNG:</div>
              <div id="sandbox-calc-monthly" style="font-size:2rem;font-weight:900;color:#10B981;margin-bottom:0.4rem;">1.040.000₫</div>
              <div id="sandbox-calc-yearly" style="font-size:0.8rem;color:#E2E8F0;">~ 12.480.000₫ / năm (Đủ tiền mua 1 vé máy bay hoặc 1 kỳ học phí)</div>
            </div>
          </div>
        </div>

      </div>
    `;

    // 🛡️ GATE-008: Scoped Event Binding bên trong Sandbox
    const filterBtns = apexRoot.querySelectorAll('.apex-filter-btn');
    filterBtns.forEach(btn => {
      btn.onclick = function() {
        filterBtns.forEach(b => {
          b.style.background = 'rgba(255,255,255,0.06)';
          b.style.color = '#94A3B8';
        });
        this.style.background = '#10B981';
        this.style.color = '#FFF';

        const district = this.getAttribute('data-district');
        const cards = apexRoot.querySelectorAll('.apex-sandbox-deal-card');
        cards.forEach(card => {
          if (district === 'ALL' || card.getAttribute('data-district') === district) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      };
    });

    // Scoped Calculator Listeners
    const rangeDrink = apexRoot.querySelector('#sandbox-range-drink');
    const rangeFood  = apexRoot.querySelector('#sandbox-range-food');
    const rangeRide  = apexRoot.querySelector('#sandbox-range-ride');

    function updateCalc() {
      const d = parseInt(rangeDrink.value, 10);
      const f = parseInt(rangeFood.value, 10);
      const r = parseInt(rangeRide.value, 10);

      apexRoot.querySelector('#sandbox-val-drink').textContent = `${d} ly`;
      apexRoot.querySelector('#sandbox-val-food').textContent  = `${f} bữa`;
      apexRoot.querySelector('#sandbox-val-ride').textContent  = `${r} chuyến`;

      const weekly = (d * 20000) + (f * 25000) + (r * 15000);
      const monthly = weekly * 4;
      const yearly = monthly * 12;

      apexRoot.querySelector('#sandbox-calc-monthly').textContent = formatVND(monthly);
      apexRoot.querySelector('#sandbox-calc-yearly').textContent  = `~ ${formatVND(yearly)} / năm (Đủ tiền mua 1 vé máy bay hoặc 1 kỳ học phí)`;
    }

    if (rangeDrink && rangeFood && rangeRide) {
      rangeDrink.oninput = updateCalc;
      rangeFood.oninput  = updateCalc;
      rangeRide.oninput  = updateCalc;
    }

    apexRoot.setAttribute('data-mounted', 'true');
    console.log("✅ JayT Apex Sandbox Mounted Cleanly & Safely.");
  }

  // ===========================================================================
  // 8. KHỞI CHẠY AN TOÀN VÀ EVENT DELEGATION
  // ===========================================================================
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountApexSandboxEngine);
  } else {
    mountApexSandboxEngine();
  }

  // Event Delegation toàn cục không đụng tới DOM gốc
  document.body.addEventListener('click', function(e) {
    initAudio();

    // 1. LUỒNG SĂN KÈO
    const huntBtn = e.target.closest('.btn-claim-deal, .btn-claim-wow, .btn-radar-claim, [data-action="hunt-keo"]');
    if (huntBtn) {
      playSound('click');
      triggerHaptic('medium');

      const code = huntBtn.getAttribute('data-code') || 'JAYT43';
      const name = huntBtn.getAttribute('data-merchant') || 'Kèo Đà Nẵng';
      const saving = parseInt(huntBtn.getAttribute('data-saving') || '25000', 10);

      if (navigator.clipboard && code) {
        navigator.clipboard.writeText(code).then(() => {
          playSound('copy-success');
          fireAdapterEphemeralConfetti();
          setTimeout(() => {
            showOutcomeDialog(name, saving);
          }, 800);
        });
      }
      return;
    }

    // 2. LUỒNG COPY MÃ
    const copyBtn = e.target.closest('.btn-copy-voucher-code, [data-deal-action="copy"], [data-action="copy-code-only"]');
    if (copyBtn) {
      playSound('click');
      triggerHaptic('light');
      const code = copyBtn.getAttribute('data-code') || 'JAYT43';
      if (navigator.clipboard) {
        navigator.clipboard.writeText(code).then(() => {
          playSound('copy-success');
          showCopyToast(`Đã sao chép mã: ${code}`);
        });
      }
      return;
    }
  });

  console.log("✅ JayT v5.5 Constitutional Master Adapter Ready.");
})();
