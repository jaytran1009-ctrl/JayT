/**
 * =============================================================================
 * JAYT APEX v5.2.3 — COMPLETE CLAIM-LEVEL EVIDENCE LEDGER RUNTIME ENGINE
 * =============================================================================
 * NORTH STAR: "JAYT ĐI SĂN CÙNG BẠN — KHÔNG CẦN XEM NHIỀU, CHỈ CẦN SĂN ĐÚNG"
 * =============================================================================
 * BẢO TỒN NGUYÊN BẢN 100% CẤU TRÚC GIAO DIỆN GOLDEN MASTER 6.116 DÒNG TRONG INDEX.HTML:
 * - Top Running Marquee Ticker
 * - Master Sticky Header + Nút Săn Nhanh 10s + Đổi Theme + Ví + Zalo CSKH
 * - 5-Question Executive Summary Banner
 * - Tầng 1 WOW: Priority Deal #1 MayCha + Breathing Aura + Giải Trình "Vì Sao Chọn?"
 * - Tầng 2 ACTION: Hidden Voucher Radar + 3 Voucher Ẩn + Lý Do Ẩn Minh Bạch
 * - Tầng 3 DISCOVERY: Kho Deal 43 + Bộ Lọc 4 Quận (Liên Chiểu/Hải Châu/Sơn Trà/Toàn ĐN)
 * - Interactive Savings Calculator (3 Thanh Trượt: Trà Sữa, Bữa Ăn, Xe Công Nghệ)
 * - Hệ Thống 5 Modals Nguyên Bản: Ví Cá Nhân, Rủ Bạn Zalo/Tele (+5K), SHA-256 Audit
 * - Human-Proof 2.0: Hộp Thoại Outcome "Bạn Đã Săn Được Chưa?" + Victory Modal Tiền Thật
 * - Mobile 5-Tab Bottom Navigation + Confetti Canvas + Web Audio API (Zero MP3)
 * - Grand 4-Column Footer Bản Địa Đà Nẵng
 * =============================================================================
 */

(function () {
  'use strict';
  console.log("🛡️ JayT Apex v5.2.3 [Complete Claim-Level Evidence Ledger Engine Active]");

  // ===========================================================================
  // 1. SỔ CÁI BẰNG CHỨNG THƯƠNG MẠI (CLAIM-LEVEL EVIDENCE LEDGER DATABASE)
  // ===========================================================================
  const JAYT_EVIDENCE_STORE = [
    {
      deal_id: 'DNG-MAYCHA-DBP',
      merchant_name: 'Trà Sữa MayCha',
      branch_name: 'MayCha 436 Điện Biên Phủ',
      location_type: 'PHYSICAL_BRANCH',
      address: '436 Điện Biên Phủ, P. Thanh Khê Đông, Q. Thanh Khê, Đà Nẵng',
      hours: '09:00 - 22:00',
      district: 'THANH_KHE',
      title: 'Trà Sữa Trân Châu Kem Trứng Nướng Mua 1 Tặng 1',
      tag: '🧋 MUA 1 TẶNG 1',
      voucher_code: 'MAYCHA0D',
      voucher_status: 'COMMUNITY_SIGNAL',
      pricing_type: 'CALCULATED_ILLUSTRATIVE',
      sample_saving: 24000,
      saving_display: 'Tiết kiệm ~24.000₫ (Ước tính theo giá ly Mua 1 Tặng 1)',
      deal_link: 'https://shopeefood.vn/da-nang/tra-sua-maycha-dien-bien-phu',
      evidence_url: 'https://maycha.com.vn/cua-hang/',
      image_primary: 'https://images.unsplash.com/photo-1558857563-b37fe434c442?auto=format&fit=crop&w=800&q=80',
      image_fallback: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80',
      image_type: 'GENERIC_FALLBACK',
      trust_state: 'PARTIAL'
    },
    {
      deal_id: 'DNG-COMGA-AHAI',
      merchant_name: 'Cơm Gà A Hải',
      branch_name: 'Cơm Gà A Hải Thái Phiên',
      location_type: 'PHYSICAL_BRANCH',
      address: '100 Thái Phiên, P. Phước Ninh, Q. Hải Châu, Đà Nẵng',
      hours: '08:00 - 23:00',
      district: 'HAI_CHAU',
      title: 'Cơm Gà Quay Da Giòn Rụm + Canh Rong Biển',
      tag: '🍗 ĐẶC SẢN ĐÀ THÀNH',
      voucher_code: 'AHAI35K',
      voucher_status: 'COMMUNITY_SIGNAL',
      pricing_type: 'CALCULATED_ILLUSTRATIVE',
      sample_saving: 26000,
      saving_display: 'Tiết kiệm ~26.000₫ (Ước tính theo suất cơm gà quay)',
      deal_link: 'https://food.grab.com/vn/vi/restaurant/c%C6%A1m-g%C3%A0-a-h%E1%BA%A3i-th%C3%A1i-phi%C3%AAn-delivery/',
      evidence_url: 'https://food.grab.com/vn/vi/restaurant/c%C6%A1m-g%C3%A0-a-h%E1%BA%A3i-th%C3%A1i-phi%C3%AAn-delivery/',
      image_primary: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=800&q=80',
      image_fallback: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=800&q=80',
      image_type: 'GENERIC_FALLBACK',
      trust_state: 'PARTIAL'
    },
    {
      deal_id: 'DNG-GRAB-SANBAY',
      merchant_name: 'GrabCar Đà Nẵng',
      branch_name: 'Vùng Đón Tiễn Sân Bay Quốc Tế Đà Nẵng',
      location_type: 'SERVICE_AREA',
      address: 'Sân bay Quốc tế Đà Nẵng, P. Hòa Thuận Tây, Q. Hải Châu',
      hours: '24/7',
      district: 'HAI_CHAU',
      title: 'Ưu Đãi GrabCar Sân Bay Đà Nẵng Giảm 20% (Tối Đa 15.000₫)',
      tag: '🚗 GIẢM 20% (TỐI ĐA 15K)',
      voucher_code: 'SANBAY',
      voucher_status: 'OFFICIAL_CODE_VERIFIED',
      pricing_type: 'TERMS_VERIFIED',
      sample_saving: 15000,
      saving_display: 'Giảm 20% tối đa 15.000₫ cho cuốc xe từ 50K',
      deal_link: 'https://www.grab.com/vn/transport/car/',
      evidence_url: 'https://www.grab.com/vn/en/uudaisanbaybenxe/',
      image_primary: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=800&q=80',
      image_fallback: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80',
      image_type: 'GENERIC_FALLBACK',
      trust_state: 'VERIFIED'
    },
    {
      deal_id: 'DNG-CGV-U22',
      merchant_name: 'CGV Cinemas Vincom Đà Nẵng',
      branch_name: 'CGV Vincom Plaza Ngô Quyền',
      location_type: 'PHYSICAL_BRANCH',
      address: 'Tầng 4, TTTM Vincom Plaza, 910A Ngô Quyền, P. An Hải Bắc, Q. Sơn Trà',
      hours: '08:30 - 23:30',
      district: 'SON_TRA',
      title: 'Vé Xem Phim 2D Ưu Đãi Thành Viên U22 & HSSV',
      tag: '🎬 GIÁ ƯU ĐÃI U22',
      voucher_code: null,
      voucher_status: 'MEMBERSHIP_PRICE_RULE',
      pricing_type: 'POLICY_VERIFIED',
      sample_saving: 55000,
      saving_display: 'Giá vé ưu đãi thành viên U22 (áp dụng theo biểu giá CGV Vincom)',
      deal_link: 'https://www.cgv.vn/en/cinox/site/cgv-vincom-da-nang/',
      evidence_url: 'https://www.cgv.vn/en/cinox/site/cgv-vincom-da-nang/',
      image_primary: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80',
      image_fallback: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=800&q=80',
      image_type: 'GENERIC_FALLBACK',
      trust_state: 'VERIFIED'
    },
    {
      deal_id: 'DNG-KATINAT-BACHDANG',
      merchant_name: 'KATINAT Saigon Kafe',
      branch_name: 'KATINAT 34 Bạch Đằng',
      location_type: 'PHYSICAL_BRANCH',
      address: '34 Bạch Đằng, P. Thạch Thang, Q. Hải Châu, Đà Nẵng',
      hours: '07:00 - 23:00',
      district: 'HAI_CHAU',
      title: 'Trà Sữa Chôm Chôm Signature Mua Kèm Bánh Nướng 1Đ',
      tag: '🥤 VIEW SÔNG HÀN',
      voucher_code: 'KATINAT1D',
      voucher_status: 'STORE_PROMO_SIGNAL',
      pricing_type: 'CALCULATED_ILLUSTRATIVE',
      sample_saving: 20000,
      saving_display: 'Tiết kiệm ~20.000₫ (Ước tính khi kèm bánh nướng)',
      deal_link: 'https://katinat.vn/menu/',
      evidence_url: 'https://katinat.vn/',
      image_primary: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=800&q=80',
      image_fallback: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80',
      image_type: 'GENERIC_FALLBACK',
      trust_state: 'PARTIAL'
    },
    {
      deal_id: 'DNG-XANHSM-TOANCITY',
      merchant_name: 'Xanh SM Taxi Thuần Điện',
      branch_name: 'Đội Xe Điện Xanh SM Đà Nẵng',
      location_type: 'SERVICE_AREA',
      address: 'Toàn thành phố Đà Nẵng (6 Quận Huyện)',
      hours: '24/7',
      district: 'ALL',
      title: 'Mã Giảm 30K Trải Nghiệm Xe Điện VinFast Không Mùi',
      tag: '⚡ 0Đ KHỞI HÀNH',
      voucher_code: 'XANHDN30',
      voucher_status: 'COMMUNITY_SIGNAL',
      pricing_type: 'CALCULATED_ILLUSTRATIVE',
      sample_saving: 30000,
      saving_display: 'Tiết kiệm ~30.000₫ (Ước tính chuyến từ 50K)',
      deal_link: 'https://www.xanhsm.com/',
      evidence_url: 'https://www.xanhsm.com/khuyen-mai/',
      image_primary: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80',
      image_fallback: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80',
      image_type: 'GENERIC_FALLBACK',
      trust_state: 'PARTIAL'
    },
    {
      deal_id: 'DNG-JOLLIBEE-DBP',
      merchant_name: 'Jollibee Co.opmart Đà Nẵng',
      branch_name: 'Jollibee 478 Điện Biên Phủ',
      location_type: 'PHYSICAL_BRANCH',
      address: '478 Điện Biên Phủ, P. Thanh Khê Đông, Q. Thanh Khê, Đà Nẵng',
      hours: '09:00 - 21:30',
      district: 'THANH_KHE',
      title: 'Combo Gà Giòn Sài Gòn + Mì Ý Bò Bằm + Nước Ngọt (39K)',
      tag: '🍗 COMBO SINH VIÊN',
      voucher_code: 'JOLLIBEE39',
      voucher_status: 'CHECKOUT_COUPON_SIGNAL',
      pricing_type: 'CALCULATED_ILLUSTRATIVE',
      sample_saving: 33000,
      saving_display: 'Tiết kiệm ~33.000₫ (Ước tính theo giá combo gà + mì Ý)',
      deal_link: 'https://jollibee.com.vn/thuc-don',
      evidence_url: 'https://help.jollibee.com.vn/hc/en-vn/articles/12339226728335-Voucher-and-promotion-codes',
      image_primary: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80',
      image_fallback: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80',
      image_type: 'GENERIC_FALLBACK',
      trust_state: 'PARTIAL'
    },
    {
      deal_id: 'DNG-CHELIEN-HOANGDIEU',
      merchant_name: 'Chè Sầu Liên Đà Nẵng',
      branch_name: 'Chè Liên 189 Hoàng Diệu',
      location_type: 'PHYSICAL_BRANCH',
      address: '189 Hoàng Diệu, P. Nam Dương, Q. Hải Châu, Đà Nẵng',
      hours: '08:00 - 22:30',
      district: 'HAI_CHAU',
      title: 'Chè Thái Sầu Riêng Đậm Đà Mua 4 Tặng 1 Tô',
      tag: '🍧 MUA 4 TẶNG 1',
      voucher_code: 'CHELIENFREE',
      voucher_status: 'COMMUNITY_SIGNAL',
      pricing_type: 'CALCULATED_ILLUSTRATIVE',
      sample_saving: 17000,
      saving_display: 'Tiết kiệm ~17.000₫ (Ước tính khi áp dụng đơn nhóm 4 tô)',
      deal_link: 'https://food.grab.com/vn/vi/restaurant/ch%C3%A8-li%C3%AAn-ho%C3%A0ng-di%E1%BB%87u-delivery/',
      evidence_url: 'https://food.grab.com/vn/vi/restaurant/ch%C3%A8-li%C3%AAn-ho%C3%A0ng-di%E1%BB%87u-delivery/',
      image_primary: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80',
      image_fallback: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
      image_type: 'GENERIC_FALLBACK',
      trust_state: 'PARTIAL'
    }
  ];

  // ===========================================================================
  // 2. HELPER FUNCTIONS & AUDIO HAPTIC FEEDBACK
  // ===========================================================================
  function formatVND(n) {
    return new Intl.NumberFormat('vi-VN').format(Number(n) || 0) + '₫';
  }

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
  // 3. EPHEMERAL CONFETTI & TOAST
  // ===========================================================================
  function fireAdapterEphemeralConfetti() {
    try {
      const canvas = document.createElement('canvas');
      canvas.id = 'jayt-adapter-ephemeral-confetti';
      canvas.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:9999999;';
      document.body.appendChild(canvas);
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
    const oldToast = document.getElementById('jayt-adapter-ephemeral-toast');
    if (oldToast) oldToast.remove();

    const toast = document.createElement('div');
    toast.id = 'jayt-adapter-ephemeral-toast';
    toast.style.cssText = 'position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:#10B981;color:#FFF;padding:0.6rem 1.2rem;border-radius:9999px;font-size:0.85rem;font-weight:700;box-shadow:0 10px 25px rgba(0,0,0,0.3);z-index:9999999;transition:opacity 0.25s ease;opacity:0;';
    toast.textContent = msg;
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
      toast.style.opacity = '1';
    });

    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => {
        if (toast) toast.remove();
      }, 300);
    }, 2000);
  }

  // ===========================================================================
  // 4. LOCALSTORAGE STATE MANAGEMENT
  // ===========================================================================
  const State = {
    huntedCount: parseInt(localStorage.getItem('jayt_hunted_count') || '17', 10),
    actualSavedAmount: parseInt(localStorage.getItem('jayt_actual_savings') || '255000', 10)
  };

  // ===========================================================================
  // 5. HUMAN-PROOF 2.0: OUTCOME & VICTORY OVERLAYS
  // ===========================================================================
  function showOutcomeDialog(dealName, savingAmount) {
    removeOutcomeDialog();
    const overlay = document.createElement('div');
    overlay.id = 'jayt-outcome-overlay';
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.8);backdrop-filter:blur(10px);z-index:999999;display:flex;align-items:center;justify-content:center;padding:1.5rem;';
    
    overlay.innerHTML = `
      <div style="background:#111827;border:2px solid #10B981;border-radius:24px;max-width:440px;width:100%;padding:2rem;text-align:center;box-shadow:0 25px 70px rgba(0,0,0,0.5);color:#FFF;font-family:inherit;">
        <div style="font-size:2.4rem;margin-bottom:0.4rem;">🤝</div>
        <h3 style="font-size:1.3rem;font-weight:800;color:#FFF;margin-bottom:0.3rem;">Bạn Đã Săn Được Chưa?</h3>
        <p style="font-size:0.85rem;color:#94A3B8;margin-bottom:1.4rem;line-height:1.45;">
          Xác nhận kết quả cho <strong>${dealName}</strong> để JayT ghi nhớ tiền thật bạn giữ lại được!
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
    document.body.appendChild(overlay);

    document.getElementById('btn-outcome-success').onclick = function() {
      State.huntedCount++;
      State.actualSavedAmount += savingAmount;
      localStorage.setItem('jayt_hunted_count', State.huntedCount.toString());
      localStorage.setItem('jayt_actual_savings', State.actualSavedAmount.toString());
      removeOutcomeDialog();
      showVictoryModal(savingAmount);
    };

    document.getElementById('btn-outcome-failed').onclick = function() {
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

    const overlay = document.createElement('div');
    overlay.id = 'jayt-victory-overlay';
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.85);backdrop-filter:blur(12px);z-index:999999;display:flex;align-items:center;justify-content:center;padding:1.5rem;';

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
    document.body.appendChild(overlay);

    document.getElementById('btn-close-victory').onclick = function() {
      removeVictoryModal();
    };
  }

  function removeVictoryModal() {
    const el = document.getElementById('jayt-victory-overlay');
    if (el) el.remove();
  }

  // ===========================================================================
  // 6. EVENT LISTENER PHẪU THUẬT (SURGICAL EVENT DELEGATION)
  // ===========================================================================
  document.body.addEventListener('click', function (e) {
    initAudio();

    // 1. LUỒNG HUNT_ACTION (Săn Kèo)
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

    // 2. LUỒNG COPY_ACTION (Sao Chép Mã Phụ)
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

  console.log("✅ JayT v5.2.3 Full Ledger Engine Mounted Successfully.");
})();
