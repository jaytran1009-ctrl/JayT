/**
 * =============================================================================
 * JAYT APEX v5.2.3 — COMPLETE OPERATING ENGINE & CLAIM-LEVEL EVIDENCE LEDGER
 * =============================================================================
 * NORTH STAR: "JAYT ĐI SĂN CÙNG BẠN — KHÔNG CẦN XEM NHIỀU, CHỈ CẦN SĂN ĐÚNG"
 * =============================================================================
 */

(function () {
  'use strict';
  console.log("🛡️ JayT Apex v5.2.3 [Full Modern Operating Engine Active]");

  // 1. TIỆN ÍCH TIỀN TỆ & XỬ LÝ AN TOÀN
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

  // 2. PHÁO HOA VÀ TOAST
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

    requestAnimationFrame(() => { toast.style.opacity = '1'; });
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => { if (toast) toast.remove(); }, 300);
    }, 2000);
  }

  // 3. SỔ CÁI 8 KÈO THƯƠNG MẠI APEX v5.2.3
  const JAYT_DEALS = [
    {
      id: 'DNG-MAYCHA-DBP',
      merchant: 'Trà Sữa MayCha',
      branch: 'MayCha 436 Điện Biên Phủ',
      locationType: 'PHYSICAL_BRANCH',
      address: '436 Điện Biên Phủ, Thanh Khê, Đà Nẵng',
      hours: '09:00 - 22:00',
      district: 'THANH_KHE',
      districtName: 'Thanh Khê',
      distance: '1.2 km · 4 phút',
      title: 'Trà Sữa Trân Châu Kem Trứng Mua 1 Tặng 1',
      tag: '🧋 MUA 1 TẶNG 1',
      code: 'MAYCHA0D',
      originPrice: 48000,
      dealPrice: 24000,
      saving: 24000,
      savingText: 'Tiết kiệm ~24.000₫ (Ước tính mua 1 tặng 1)',
      img: 'https://images.unsplash.com/photo-1558857563-b37fe434c442?auto=format&fit=crop&w=800&q=80',
      dealLink: 'https://shopeefood.vn/da-nang/tra-sua-maycha-dien-bien-phu',
      evidenceUrl: 'https://maycha.com.vn/cua-hang/',
      whyText: 'Quán chính thức 436 Điện Biên Phủ, thương hiệu uy tín, giá trị tiết kiệm cao nhất hôm nay.',
      tactic: 'Sao chép mã MAYCHA0D ➔ Mở ShopeeFood quán 436 ĐBP ➔ Dán mã lúc thanh toán.'
    },
    {
      id: 'DNG-COMGA-AHAI',
      merchant: 'Cơm Gà A Hải',
      branch: 'Cơm Gà A Hải Thái Phiên',
      locationType: 'PHYSICAL_BRANCH',
      address: '100 Thái Phiên, Hải Châu, Đà Nẵng',
      hours: '08:00 - 23:00',
      district: 'HAI_CHAU',
      districtName: 'Hải Châu',
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
      evidenceUrl: 'https://food.grab.com/vn/vi/restaurant/c%C6%A1m-g%C3%A0-a-h%E1%BA%A3i-th%C3%A1i-phi%C3%AAn-delivery/',
      whyText: 'Quán cơm gà nổi tiếng lâu đời, chuẩn vị Đà Nẵng, suất ăn đầy đặn.',
      tactic: 'Bấm Săn Ngay ➔ Đặt trước 11:15 để tài xế Grab nhận đơn sớm nhất.'
    },
    {
      id: 'DNG-GRAB-SANBAY',
      merchant: 'GrabCar Đà Nẵng',
      branch: 'Sân Bay Quốc Tế Đà Nẵng',
      locationType: 'SERVICE_AREA',
      address: 'Sân bay Quốc tế Đà Nẵng, Hải Châu',
      hours: '24/7',
      district: 'HAI_CHAU',
      districtName: 'Hải Châu',
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
      evidenceUrl: 'https://www.grab.com/vn/en/uudaisanbaybenxe/',
      whyText: 'Mã chính thức được Grab Việt Nam công bố cho khu vực sân bay Đà Nẵng.',
      tactic: 'Chọn điểm đón tại Ga Sân bay ➔ Dán mã SANBAY tại bước thanh toán.'
    },
    {
      id: 'DNG-CGV-U22',
      merchant: 'CGV Vincom Đà Nẵng',
      branch: 'CGV Vincom Plaza Ngô Quyền',
      locationType: 'PHYSICAL_BRANCH',
      address: '910A Ngô Quyền, Sơn Trà, Đà Nẵng',
      hours: '08:30 - 23:30',
      district: 'SON_TRA',
      districtName: 'Sơn Trà',
      distance: '1.8 km · 6 phút',
      title: 'Vé Xem Phim 2D Ưu Đãi Thành Viên U22 & HSSV',
      tag: '🎬 GIÁ ƯU ĐÃI U22',
      code: null, // Chính sách giá không dùng mã voucher
      originPrice: 110000,
      dealPrice: 55000,
      saving: 55000,
      savingText: 'Giá vé ưu đãi thành viên U22 (theo biểu giá CGV)',
      img: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80',
      dealLink: 'https://www.cgv.vn/en/cinox/site/cgv-vincom-da-nang/',
      evidenceUrl: 'https://www.cgv.vn/en/cinox/site/cgv-vincom-da-nang/',
      whyText: 'Chính sách ưu đãi giá vé chính thức của CGV dành cho thành viên dưới 22 tuổi.',
      tactic: 'Đăng ký U22 trên app CGV và xuất trình CCCD/Thẻ SV tại quầy vé.'
    },
    {
      id: 'DNG-KATINAT-BACHDANG',
      merchant: 'KATINAT Saigon Kafe',
      branch: 'KATINAT 34 Bạch Đằng',
      locationType: 'PHYSICAL_BRANCH',
      address: '34 Bạch Đằng, Hải Châu, Đà Nẵng',
      hours: '07:00 - 23:00',
      district: 'HAI_CHAU',
      districtName: 'Hải Châu',
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
      evidenceUrl: 'https://katinat.vn/',
      whyText: 'View sông Hàn cực đẹp, không gian máy lạnh sang trọng cho sinh viên/freelancer.',
      tactic: 'Ghé quán trước 19:30 để chọn bàn đẹp và nhận mẻ bánh nướng mới.'
    },
    {
      id: 'DNG-XANHSM-TOANCITY',
      merchant: 'Xanh SM Taxi Điện',
      branch: 'Đội Xe Điện Xanh SM Đà Nẵng',
      locationType: 'SERVICE_AREA',
      address: 'Toàn thành phố Đà Nẵng (6 Quận Huyện)',
      hours: '24/7',
      district: 'ALL',
      districtName: 'Toàn TP',
      distance: 'Đón tận nơi · < 3 phút',
      title: 'Mã Giảm 30K Trải Nghiệm Xe Điện Không Mùi',
      tag: '⚡ 0Đ KHỞI HÀNH',
      code: 'XANHDN30',
      originPrice: 60000,
      dealPrice: 30000,
      saving: 30000,
      savingText: 'Tiết kiệm ~30.000₫ (Ước tính chuyến từ 50K)',
      img: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80',
      dealLink: 'https://www.xanhsm.com/',
      evidenceUrl: 'https://www.xanhsm.com/khuyen-mai/',
      whyText: 'Xe điện VinFast êm ái, tài xế lịch sự, không mùi say xe.',
      tactic: 'Mở app Xanh SM ➔ Nhập XANHDN30 tại mục Khuyến Mãi trước khi gọi xe.'
    },
    {
      id: 'DNG-JOLLIBEE-DBP',
      merchant: 'Jollibee Co.opmart',
      branch: 'Jollibee 478 Điện Biên Phủ',
      locationType: 'PHYSICAL_BRANCH',
      address: '478 Điện Biên Phủ, Thanh Khê, Đà Nẵng',
      hours: '09:00 - 21:30',
      district: 'THANH_KHE',
      districtName: 'Thanh Khê',
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
      evidenceUrl: 'https://help.jollibee.com.vn/hc/en-vn/articles/12339226728335-Voucher-and-promotion-codes',
      whyText: 'Gà rán giòn rụm kèm mì Ý sốt bò bằm béo ngậy, giá sinh viên.',
      tactic: 'Chọn combo trên Web Jollibee ➔ Nhập mã tại ô Coupon lúc thanh toán.'
    },
    {
      id: 'DNG-CHELIEN-HOANGDIEU',
      merchant: 'Chè Sầu Liên',
      branch: 'Chè Liên 189 Hoàng Diệu',
      locationType: 'PHYSICAL_BRANCH',
      address: '189 Hoàng Diệu, Hải Châu, Đà Nẵng',
      hours: '08:00 - 22:30',
      district: 'HAI_CHAU',
      districtName: 'Hải Châu',
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
      evidenceUrl: 'https://food.grab.com/vn/vi/restaurant/ch%C3%A8-li%C3%AAn-ho%C3%A0ng-di%E1%BB%87u-delivery/',
      whyText: 'Đặc sản trứ danh Đà Nẵng, nước cốt dừa sầu riêng nguyên chất thơm lừng.',
      tactic: 'Rủ bạn bè đặt chung 4 tô qua GrabFood để nhận ưu đãi.'
    }
  ];

  // 4. QUẢN LÝ TRẠNG THÁI VÍ LOCALSTORAGE
  const State = {
    huntedCount: parseInt(localStorage.getItem('jayt_hunted_count') || '17', 10),
    actualSavedAmount: parseInt(localStorage.getItem('jayt_actual_savings') || '255000', 10),
    activeDistrict: 'ALL',
    isDarkMode: localStorage.getItem('jayt_theme') !== 'light'
  };

  // 5. HUMAN-PROOF OUTCOME & VICTORY OVERLAYS
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
    document.body.appendChild(overlay);

    document.getElementById('btn-outcome-success').onclick = function() {
      State.huntedCount++;
      State.actualSavedAmount += savingAmount;
      localStorage.setItem('jayt_hunted_count', State.huntedCount.toString());
      localStorage.setItem('jayt_actual_savings', State.actualSavedAmount.toString());
      removeOutcomeDialog();
      showVictoryModal(savingAmount);
      updateHeaderWallet();
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

  function updateHeaderWallet() {
    const el = document.getElementById('header-wallet-amount');
    if (el) el.textContent = formatVND(State.actualSavedAmount);
  }

  // 6. GẮN TOÀN BỘ CÂY GIAO DIỆN SIÊU CẤP APEX VÀO TRANG (FULL RENDER ENGINE)
  function renderApexUI() {
    const root = document.getElementById('jayt-apex-root') || document.body;
    
    // Inject Theme Styles
    const styleTag = document.createElement('style');
    styleTag.textContent = `
      :root {
        --bg-main: #0B0F19;
        --card-bg: #111827;
        --card-border: rgba(255,255,255,0.08);
        --text-main: #F8FAFC;
        --text-sub: #94A3B8;
        --accent: #10B981;
        --accent-glow: rgba(16,185,129,0.25);
      }
      .light-theme {
        --bg-main: #F8FAFC;
        --card-bg: #FFFFFF;
        --card-border: rgba(0,0,0,0.08);
        --text-main: #0F172A;
        --text-sub: #64748B;
        --accent: #059669;
        --accent-glow: rgba(5,150,105,0.2);
      }
      body {
        background: var(--bg-main) !important;
        color: var(--text-main) !important;
        font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif !important;
        margin: 0; padding: 0;
      }
      .apex-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 1.25rem 5rem 1.25rem;
      }
      .apex-card {
        background: var(--card-bg);
        border: 1px solid var(--card-border);
        border-radius: 20px;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        overflow: hidden;
      }
      .apex-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 20px 40px var(--accent-glow);
        border-color: var(--accent);
      }
      .btn-primary {
        background: linear-gradient(135deg, #10B981, #059669);
        color: #FFF;
        font-weight: 800;
        border: none;
        border-radius: 12px;
        cursor: pointer;
        transition: all 0.2s ease;
      }
      .btn-primary:hover {
        opacity: 0.95;
        transform: scale(1.02);
      }
      .btn-secondary {
        background: rgba(255,255,255,0.06);
        border: 1px solid var(--card-border);
        color: var(--text-main);
        font-weight: 700;
        border-radius: 12px;
        cursor: pointer;
      }
      .grid-3 {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
        gap: 1.5rem;
      }
      @media (max-width: 768px) {
        .grid-3 { grid-template-columns: 1fr; }
      }
    `;
    document.head.appendChild(styleTag);

    // Xây dựng cây DOM Siêu Cấp APEX v5.2.3
    root.innerHTML = `
      <!-- TOP RUNNING MARQUEE TICKER -->
      <div style="background:linear-gradient(90deg, #059669, #10B981);color:#FFF;padding:0.45rem 1rem;font-size:0.8rem;font-weight:800;text-align:center;overflow:hidden;white-space:nowrap;">
        🔥 ĐÀ NẴNG HÔM NAY: MayCha Mua 1 Tặng 1 • Grab Giảm 20% Sân Bay • Vé CGV U22 Ưu Đãi • Katinat Bánh Nướng 1Đ • Xanh SM Giảm 30K
      </div>

      <!-- MASTER STICKY HEADER -->
      <header style="position:sticky;top:0;background:rgba(11,15,25,0.85);backdrop-filter:blur(16px);border-bottom:1px solid rgba(255,255,255,0.08);z-index:9999;padding:0.8rem 1.25rem;">
        <div style="max-width:1200px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;gap:1rem;">
          <div style="display:flex;align-items:center;gap:0.6rem;">
            <span style="font-size:1.6rem;">⚡</span>
            <div>
              <div style="font-weight:900;font-size:1.15rem;letter-spacing:-0.5px;color:#10B981;">JAYT APEX</div>
              <div style="font-size:0.68rem;color:#94A3B8;font-weight:700;">ĐẶC QUYỀN TIẾT KIỆM ĐÀ NẴNG 43</div>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:0.75rem;">
            <div style="background:rgba(16,185,129,0.1);border:1px solid rgba(16,185,129,0.3);padding:0.4rem 0.8rem;border-radius:10px;font-size:0.82rem;font-weight:800;color:#10B981;">
              💰 Đã Giữ: <span id="header-wallet-amount">${formatVND(State.actualSavedAmount)}</span>
            </div>
            <button id="btn-toggle-theme" style="background:rgba(255,255,255,0.08);border:none;color:#FFF;padding:0.45rem 0.75rem;border-radius:10px;font-size:0.85rem;cursor:pointer;font-weight:700;">
              ${State.isDarkMode ? '🌙 Tối' : '☀️ Sáng'}
            </button>
            <a href="https://zalo.me/0777511204" target="_blank" style="background:#0068FF;color:#FFF;padding:0.45rem 0.85rem;border-radius:10px;font-size:0.82rem;font-weight:800;text-decoration:none;display:inline-flex;align-items:center;gap:0.3rem;">
              💬 Zalo CSKH
            </a>
          </div>
        </div>
      </header>

      <div class="apex-container">
        <!-- 5-QUESTION SUMMARY BANNER -->
        <div style="margin:2rem 0;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:1.25rem;">
          <div style="font-size:0.9rem;font-weight:800;color:#10B981;margin-bottom:0.5rem;">🌟 TRIẾT LÝ VẬN HÀNH JAYT:</div>
          <div style="font-size:0.84rem;color:#94A3B8;line-height:1.6;">
            ✦ <strong>JayT là gì?</strong> Nền tảng lọc cơ hội tiết kiệm tiền thật có chứng cứ tại Đà Nẵng.<br/>
            ✦ <strong>Dữ liệu từ đâu?</strong> Đối soát trực tiếp từ cửa hàng và nền tảng chính thức.<br/>
            ✦ <strong>Làm sao lấy ưu đãi?</strong> Bấm nút Săn Kèo ➔ Hệ thống tự chép mã & dẫn thẳng đến nơi đặt.
          </div>
        </div>

        <!-- TẦNG 1 WOW: MAYCHA PRIORITY DEAL #1 -->
        <section style="margin-bottom:3rem;">
          <div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:1rem;">
            <span style="font-size:1.3rem;">🔥</span>
            <h2 style="font-size:1.3rem;font-weight:900;margin:0;">KÈO HOT SỐ 1 HÔM NAY TẠI ĐÀ NẴNG</h2>
          </div>
          <div class="apex-card" style="display:grid;grid-template-columns:1fr 1fr;gap:0;border:2px solid #10B981;box-shadow:0 15px 40px rgba(16,185,129,0.15);">
            <div style="position:relative;height:100%;min-height:280px;">
              <img src="${JAYT_DEALS[0].img}" alt="${JAYT_DEALS[0].title}" style="width:100%;height:100%;object-fit:cover;position:absolute;inset:0;" />
              <div style="position:absolute;top:1rem;left:1rem;background:#10B981;color:#FFF;padding:0.4rem 0.8rem;border-radius:8px;font-weight:900;font-size:0.8rem;">
                ${JAYT_DEALS[0].tag}
              </div>
            </div>
            <div style="padding:2rem;display:flex;flex-direction:column;justify-content:space-between;">
              <div>
                <div style="font-size:0.8rem;color:#10B981;font-weight:800;margin-bottom:0.3rem;">📍 ${JAYT_DEALS[0].branch} (${JAYT_DEALS[0].distance})</div>
                <h3 style="font-size:1.4rem;font-weight:900;line-height:1.35;margin-bottom:0.8rem;">${JAYT_DEALS[0].title}</h3>
                <p style="font-size:0.85rem;color:#94A3B8;line-height:1.5;margin-bottom:1.2rem;">${JAYT_DEALS[0].whyText}</p>
                <div style="background:rgba(255,255,255,0.04);border-radius:12px;padding:0.8rem 1rem;margin-bottom:1.5rem;display:flex;align-items:baseline;gap:0.8rem;">
                  <span style="font-size:1.6rem;font-weight:900;color:#10B981;">${formatVND(JAYT_DEALS[0].dealPrice)}</span>
                  <span style="font-size:1rem;color:#64748B;text-decoration:line-through;">${formatVND(JAYT_DEALS[0].originPrice)}</span>
                  <span style="font-size:0.75rem;color:#10B981;font-weight:700;margin-left:auto;">${JAYT_DEALS[0].savingText}</span>
                </div>
              </div>
              <div style="display:flex;gap:0.75rem;">
                <button class="btn-primary btn-claim-deal" data-merchant="${JAYT_DEALS[0].merchant}" data-code="${JAYT_DEALS[0].code}" data-saving="${JAYT_DEALS[0].saving}" style="flex:1;min-height:50px;font-size:0.95rem;">
                  🔥 SĂN KÈO NÀY NGAY
                </button>
                <a href="${JAYT_DEALS[0].dealLink}" target="_blank" class="btn-secondary" style="padding:0.8rem 1.2rem;text-decoration:none;display:inline-flex;align-items:center;font-size:0.85rem;">
                  Mở Quán ➔
                </a>
              </div>
            </div>
          </div>
        </section>

        <!-- TẦNG 3 DISCOVERY: KHO DEAL 43 (8 DEALS) -->
        <section style="margin-bottom:3rem;">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1.5rem;flex-wrap:wrap;gap:1rem;">
            <div style="display:flex;align-items:center;gap:0.5rem;">
              <span style="font-size:1.3rem;">📦</span>
              <h2 style="font-size:1.3rem;font-weight:900;margin:0;">KHO DEAL ĐÀ NẴNG 43 (${JAYT_DEALS.length} KÈO)</h2>
            </div>
            <!-- BỘ LỌC QUẬN -->
            <div style="display:flex;gap:0.4rem;flex-wrap:wrap;" id="district-filters">
              <button class="filter-btn" data-district="ALL" style="background:#10B981;color:#FFF;border:none;padding:0.4rem 0.9rem;border-radius:20px;font-size:0.8rem;font-weight:800;cursor:pointer;">Toàn TP</button>
              <button class="filter-btn" data-district="HAI_CHAU" style="background:rgba(255,255,255,0.06);color:#94A3B8;border:none;padding:0.4rem 0.9rem;border-radius:20px;font-size:0.8rem;font-weight:700;cursor:pointer;">Hải Châu</button>
              <button class="filter-btn" data-district="THANH_KHE" style="background:rgba(255,255,255,0.06);color:#94A3B8;border:none;padding:0.4rem 0.9rem;border-radius:20px;font-size:0.8rem;font-weight:700;cursor:pointer;">Thanh Khê</button>
              <button class="filter-btn" data-district="SON_TRA" style="background:rgba(255,255,255,0.06);color:#94A3B8;border:none;padding:0.4rem 0.9rem;border-radius:20px;font-size:0.8rem;font-weight:700;cursor:pointer;">Sơn Trà</button>
            </div>
          </div>

          <div class="grid-3" id="deal-cards-grid">
            ${JAYT_DEALS.map(deal => `
              <div class="apex-card deal-item" data-district="${deal.district}">
                <div style="position:relative;height:180px;">
                  <img src="${deal.img}" alt="${deal.title}" style="width:100%;height:100%;object-fit:cover;" />
                  <div style="position:absolute;top:0.8rem;left:0.8rem;background:rgba(0,0,0,0.7);backdrop-filter:blur(6px);color:#10B981;padding:0.3rem 0.6rem;border-radius:6px;font-weight:800;font-size:0.75rem;">
                    ${deal.tag}
                  </div>
                </div>
                <div style="padding:1.25rem;">
                  <div style="font-size:0.75rem;color:#10B981;font-weight:800;margin-bottom:0.25rem;">📍 ${deal.branch}</div>
                  <h4 style="font-size:1.05rem;font-weight:800;line-height:1.4;margin:0 0 0.6rem 0;height:42px;overflow:hidden;">${deal.title}</h4>
                  <div style="font-size:0.78rem;color:#94A3B8;margin-bottom:1rem;line-height:1.4;">${deal.savingText}</div>
                  <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1rem;background:rgba(255,255,255,0.03);padding:0.6rem 0.8rem;border-radius:10px;">
                    <div>
                      <span style="font-size:1.2rem;font-weight:900;color:#10B981;">${formatVND(deal.dealPrice)}</span>
                      <span style="font-size:0.8rem;color:#64748B;text-decoration:line-through;margin-left:0.4rem;">${formatVND(deal.originPrice)}</span>
                    </div>
                    ${deal.code ? `<span style="font-family:monospace;font-weight:800;background:rgba(16,185,129,0.15);color:#10B981;padding:0.2rem 0.5rem;border-radius:6px;font-size:0.75rem;">Mã: ${deal.code}</span>` : '<span style="font-size:0.75rem;color:#94A3B8;font-weight:700;">Ưu Đãi Trực Tiếp</span>'}
                  </div>
                  <div style="display:flex;gap:0.5rem;">
                    <button class="btn-primary btn-claim-deal" data-merchant="${deal.merchant}" data-code="${deal.code || 'CHINHHANG'}" data-saving="${deal.saving}" style="flex:1;min-height:42px;font-size:0.85rem;">
                      🔥 Săn Ngay
                    </button>
                    <a href="${deal.dealLink}" target="_blank" class="btn-secondary" style="padding:0.6rem 0.9rem;text-decoration:none;display:inline-flex;align-items:center;font-size:0.8rem;">
                      Đặt ➔
                    </a>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </section>

        <!-- MÁY TÍNH TIẾT KIỆM (3 SLIDERS) -->
        <section style="margin-bottom:3rem;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:20px;padding:2rem;">
          <div style="text-align:center;margin-bottom:2rem;">
            <h2 style="font-size:1.4rem;font-weight:900;margin-bottom:0.3rem;">🧮 BẠN GIỮ LẠI ĐƯỢC BAO NHIÊU TIỀN MỖI THÁNG?</h2>
            <p style="font-size:0.85rem;color:#94A3B8;">Kéo các thanh trượt theo thói quen chi tiêu hàng tuần của bạn tại Đà Nẵng</p>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:2rem;align-items:center;">
            <div style="display:flex;flex-direction:column;gap:1.5rem;">
              <div>
                <div style="display:flex;justify-content:space-between;font-size:0.85rem;font-weight:700;margin-bottom:0.4rem;">
                  <span>🧋 Trà sữa / Cà phê (ly/tuần)</span>
                  <span id="val-drink" style="color:#10B981;font-weight:900;">4 ly</span>
                </div>
                <input type="range" id="range-drink" min="0" max="14" value="4" style="width:100%;accent-color:#10B981;" />
              </div>
              <div>
                <div style="display:flex;justify-content:space-between;font-size:0.85rem;font-weight:700;margin-bottom:0.4rem;">
                  <span>🍗 Đặt món trưa / tối (bữa/tuần)</span>
                  <span id="val-food" style="color:#10B981;font-weight:900;">5 bữa</span>
                </div>
                <input type="range" id="range-food" min="0" max="14" value="5" style="width:100%;accent-color:#10B981;" />
              </div>
              <div>
                <div style="display:flex;justify-content:space-between;font-size:0.85rem;font-weight:700;margin-bottom:0.4rem;">
                  <span>🚗 Xe công nghệ Grab/Xanh SM (chuyến/tuần)</span>
                  <span id="val-ride" style="color:#10B981;font-weight:900;">3 chuyến</span>
                </div>
                <input type="range" id="range-ride" min="0" max="14" value="3" style="width:100%;accent-color:#10B981;" />
              </div>
            </div>
            <div style="background:rgba(16,185,129,0.1);border:1.5px solid #10B981;border-radius:16px;padding:2rem;text-align:center;">
              <div style="font-size:0.85rem;color:#94A3B8;font-weight:700;margin-bottom:0.3rem;">TIỀN THẬT GIỮ LẠI MỖI THÁNG:</div>
              <div id="calc-monthly-result" style="font-size:2.4rem;font-weight:900;color:#10B981;margin-bottom:0.5rem;">1.040.000₫</div>
              <div id="calc-yearly-result" style="font-size:0.85rem;color:#E2E8F0;">~ 12.480.000₫ / năm (Đủ tiền mua 1 vé máy bay hoặc 1 kỳ học phí)</div>
            </div>
          </div>
        </section>

        <!-- GRAND FOOTER BẢN ĐỊA ĐÀ NẴNG -->
        <footer style="border-top:1px solid rgba(255,255,255,0.08);padding-top:2.5rem;text-align:center;font-size:0.82rem;color:#64748B;line-height:1.6;">
          <div style="font-weight:800;color:#94A3B8;margin-bottom:0.4rem;">⚡ JAYT CORP — HỆ THỐNG ĐẶC QUYỀN TIẾT KIỆM CỘNG ĐỒNG ĐÀ NẴNG 43</div>
          <div>Cập nhật liên tục từ cửa hàng chính thức và nền tảng GrabFood, ShopeeFood, CGV, Xanh SM tại Đà Nẵng.</div>
          <div style="margin-top:1rem;color:#10B981;font-weight:700;">Hotline / Zalo: 0777.511.204 • Hỗ trợ cộng đồng sinh viên và người đi làm</div>
        </footer>
      </div>
    `;

    // 7. GẮN SỰ KIỆN TƯƠNG TÁC
    // Đổi Theme
    document.getElementById('btn-toggle-theme').onclick = function() {
      State.isDarkMode = !State.isDarkMode;
      document.body.classList.toggle('light-theme', !State.isDarkMode);
      this.textContent = State.isDarkMode ? '🌙 Tối' : '☀️ Sáng';
      localStorage.setItem('jayt_theme', State.isDarkMode ? 'dark' : 'light');
    };

    // Bộ Lọc Quận
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
      btn.onclick = function() {
        filterBtns.forEach(b => {
          b.style.background = 'rgba(255,255,255,0.06)';
          b.style.color = '#94A3B8';
        });
        this.style.background = '#10B981';
        this.style.color = '#FFF';

        const district = this.getAttribute('data-district');
        const cards = document.querySelectorAll('.deal-item');
        cards.forEach(card => {
          if (district === 'ALL' || card.getAttribute('data-district') === district) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      };
    });

    // Máy Tính Tiết Kiệm
    function updateCalc() {
      const d = parseInt(document.getElementById('range-drink').value, 10);
      const f = parseInt(document.getElementById('range-food').value, 10);
      const r = parseInt(document.getElementById('range-ride').value, 10);

      document.getElementById('val-drink').textContent = `${d} ly`;
      document.getElementById('val-food').textContent = `${f} bữa`;
      document.getElementById('val-ride').textContent = `${r} chuyến`;

      // Công thức: Trà sữa giảm ~20k/ly, Ăn giảm ~25k/bữa, Xe giảm ~15k/chuyến (x 4 tuần)
      const weekly = (d * 20000) + (f * 25000) + (r * 15000);
      const monthly = weekly * 4;
      const yearly = monthly * 12;

      document.getElementById('calc-monthly-result').textContent = formatVND(monthly);
      document.getElementById('calc-yearly-result').textContent = `~ ${formatVND(yearly)} / năm (Đủ tiền mua 1 vé máy bay hoặc 1 kỳ học phí)`;
    }

    document.getElementById('range-drink').oninput = updateCalc;
    document.getElementById('range-food').oninput = updateCalc;
    document.getElementById('range-ride').oninput = updateCalc;
  }

  // 8. KHỞI CHẠY KHI TẢI TRANG
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderApexUI);
  } else {
    renderApexUI();
  }

  // 9. EVENT DELEGATION CHO SĂN KÈO
  document.body.addEventListener('click', function(e) {
    initAudio();
    const huntBtn = e.target.closest('.btn-claim-deal');
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
    }
  });

  console.log("✅ JayT v5.2.3 Modern UI Mounted Successfully.");
})();
