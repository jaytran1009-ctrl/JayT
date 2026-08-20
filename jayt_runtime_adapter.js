/**
 * =============================================================================
 * JAYT APEX v5.5 — P5.10 MASTER: BỘ NHỚ KHUYẾN MÃI HÀNG NGÀY ĐÀ NẴNG 43
 * =============================================================================
 * CORE MISSION: "Thay thế trí nhớ của người dùng về lịch giảm giá của toàn bộ
 *                rạp phim, gà rán, trà sữa, cafe và xe điện tại Đà Nẵng."
 * =============================================================================
 * 3-LAYER ARCHITECTURE:
 * 1. ☀️ HÔM NAY: Đang có gì đáng săn sau ngày học/làm mệt mỏi?
 * 2. 🔭 LỊCH SĂN KÈO 7 NGÀY (T2 ➔ CN): Xem trước để lên plan rủ nhóm bạn
 * 3. ❤️ KÈO TÔI HAY SĂN: Bộ lọc sở thích 1 chạm (Phim, Gà rán, Trà sữa...)
 * =============================================================================
 * RELEASE INTEGRITY: RC-1 / PARTIAL RUNTIME EVIDENCE (Khóa Chặt Bất Biến)
 * =============================================================================
 */

(function () {
  'use strict';
  console.log("🚀 JayT Apex v5.5 [P5.10: Đà Nẵng Daily Promo Memory Activated]");

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
    return new Intl.NumberFormat('vi-VN').format(Number(n) || 0) + '₫';
  }

  const FALLBACK_IMAGE_SVG = "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22500%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20500%22%3E%3Crect%20fill%3D%22%23111827%22%20width%3D%22800%22%20height%3D%22500%22%2F%3E%3Ctext%20fill%3D%22%2310B981%22%20font-family%3D%22sans-serif%22%20font-size%3D%2226%22%20font-weight%3D%22bold%22%20x%3D%2250%25%22%20y%3D%2248%25%22%20text-anchor%3D%22middle%22%3EJAYT%20%C4%90%C3%80%20N%E1%BA%B5NG%2043%3C%2Ftext%3E%3Ctext%20fill%3D%22%236B7280%22%20font-family%3D%22sans-serif%22%20font-size%3D%2215%22%20x%3D%2250%25%22%20y%3D%2258%25%22%20text-anchor%3D%22middle%22%3E%5B%20%E1%BA%A2nh%20Minh%20H%E1%BB%8Da%20%C4%90ang%20T%E1%BA%A3i%20%5D%3C%2Ftext%3E%3C%2Fsvg%3E";

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

  // 3. DATABASE ĐÀ NẴNG 43 — BỘ NHỚ LỊCH KHUYẾN MÃI ĐỊNH KỲ
  const DEALS_DATABASE = [
    {
      deal_id: 'DNG-METIZ-45K',
      merchant: 'Metiz Cinema Helio Center',
      brand_short: 'METIZ HELIO',
      micro_zone: 'MICRO_HELIO_HAI_CHAU',
      zone_label: 'Helio Center (Đường 2/9, Hải Châu)',
      branch: 'Tầng 1 Helio Center, Đường 2/9, Hải Châu (Khu chợ đêm Helio)',
      distance_km: 1.5,
      distance: '1.5 km · 5 phút',
      title: 'Vé Xem Phim Rạp Metiz Happy Day Đồng Giá 45K',
      tag: '🎬 THỨ 2 ĐỒNG GIÁ 45K',
      code: 'METIZ45K',
      category: 'CINEMA',
      days_active: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
      highlight_day: 'MON',
      missions: ['ENTERTAINMENT', 'GROUP', 'AFTER_WORK'],
      original_price: 75000,
      discount_price: 45000,
      saving: 30000,
      percent: 40,
      rating: 4.8,
      reviews: 4800,
      deal_value_score: 96,
      trust_risk_score: 80,
      price_psychology: '45K — Rạp siêu chất',
      why_reasons: [
        'Rạp Metiz Helio chuẩn xịn ghế êm chỉ 45.000₫ vào Thứ 2 (Tiết kiệm 30K)',
        'Kết hợp đi dạo chợ đêm Helio & phố ăn vặt ẩm thực bên cạnh',
        'Tự thưởng một buổi tối xả stress trọn vẹn sau ngày làm việc/học tập'
      ],
      why_not_reasons: [
        'Vé 45K áp dụng Thứ 2 hàng tuần hoặc thành viên U22 các ngày trong tuần',
        'Nên đặt trước online để chọn ghế đẹp góc nhìn trung tâm'
      ],
      terms: 'Áp dụng cho khách hàng thành viên Metiz vào Thứ 2 hoặc có thẻ HSSV/U22 từ T2 - T6.',
      is_hidden: false,
      hidden_reason: 'Chương trình Happy Monday cố định tại cụm rạp Metiz Cinema Helio.',
      audit_status_label: '🔵 Đang quét thực địa',
      audit_status_color: '#0284C7',
      audit_tip: 'Đăng ký thành viên Metiz miễn phí tại quầy hoặc trên web để áp giá 45K.',
      hunt_strategy: 'Bấm Săn Ngay → Chọn suất chiếu hôm nay tại Metiz Helio → Nhập mã thành viên để nhận vé 45K.',
      destination_label: '🎬 Mở trên Web Metiz ↗',
      maps_url: 'https://maps.google.com/?q=Helio+Center+Da+Nang',
      link: 'https://metiz.vn/lich-chieu/',
      image_provenance_label: 'Ảnh minh họa địa điểm',
      image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=800&q=80',
      badge_bg: 'linear-gradient(135deg, #6366F1, #4338CA)'
    },
    {
      deal_id: 'DNG-MAYCHA-0D',
      merchant: 'Trà Sữa Maycha',
      brand_short: 'MAYCHA',
      micro_zone: 'MICRO_DIEN_BIEN_PHU',
      zone_label: 'Điện Biên Phủ (Thanh Khê)',
      branch: '436 Điện Biên Phủ, Thanh Khê (Gần ĐH Bách Khoa / Sư Phạm)',
      distance_km: 1.2,
      distance: '1.2 km · 4 phút',
      title: 'Trà Sữa Trân Châu Kem Trứng (Mua 1 Tặng 1)',
      tag: '🧋 MUA 1 TẶNG 1 (THỨ 4)',
      code: 'MAYCHA0D',
      category: 'DRINK',
      days_active: ['MON', 'TUE', 'WED', 'THU', 'FRI'],
      highlight_day: 'WED',
      missions: ['DRINK_UNDER_30K', 'GROUP', 'AFTER_WORK'],
      original_price: 48000,
      discount_price: 24000,
      saving: 24000,
      percent: 50,
      rating: 4.7,
      reviews: 3200,
      deal_value_score: 95,
      trust_risk_score: 60,
      price_psychology: '24K — Dễ xuống tiền',
      why_reasons: [
        'Mức giá 24K cực dễ xuống tiền cho học sinh / sinh viên (Tiết kiệm 24K)',
        'Vị trí 436 Điện Biên Phủ ngay trục sinh viên ĐH Bách Khoa / Sư Phạm',
        'Đúng khung giờ giải lao / xả stress ca chiều (14:00 - 17:30)'
      ],
      why_not_reasons: [
        '🟡 Chưa kiểm chứng độc lập: Hãy thử mã trên ShopeeFood trước khi thanh toán',
        'Giới hạn khung giờ áp dụng 14:00 - 17:30 (12 suất/ngày)'
      ],
      terms: 'Áp dụng đặt qua ShopeeFood khung 14:00 - 17:30 hoặc đến khi hết 12 suất ngày.',
      is_hidden: true,
      hidden_reason: 'Chỉ kích hoạt ngầm tại chi nhánh Điện Biên Phủ cho sinh viên giờ tan tầm.',
      audit_status_label: '🟡 Chưa kiểm chứng độc lập',
      audit_status_color: '#D97706',
      audit_tip: 'Kiểm tra mã MAYCHA0D trên ShopeeFood trong khung giờ 14:00 - 17:30.',
      hunt_strategy: 'Sao chép mã MAYCHA0D → Mở ShopeeFood chọn size L → Dán mã trước khi ấn thanh toán.',
      destination_label: '🛒 Mở trên ShopeeFood ↗',
      maps_url: 'https://maps.google.com/?q=436+Dien+Bien+Phu+Da+Nang',
      link: 'https://shopeefood.vn/da-nang/tra-sua-maycha-dien-bien-phu',
      image_provenance_label: 'Ảnh minh họa địa điểm',
      image: 'https://images.unsplash.com/photo-1558857563-b37fe434c442?auto=format&fit=crop&w=800&q=80',
      badge_bg: 'linear-gradient(135deg, #EC4899, #BE185D)'
    },
    {
      deal_id: 'DNG-COMGA-AHAI',
      merchant: 'Cơm Gà A Hải',
      brand_short: 'A HẢI',
      micro_zone: 'MICRO_THAI_PHIEN_CAU_RONG',
      zone_label: 'Thái Phiên (Hải Châu / Cầu Rồng)',
      branch: '100 Thái Phiên, Hải Châu (Khu trung tâm Cầu Rồng)',
      distance_km: 1.2,
      distance: '1.2 km · 5 phút',
      title: 'Cơm Gà Quay Da Giòn Rụm + Canh Rong Biển',
      tag: '🍗 ĐẶC SẢN ĐÀ THÀNH',
      code: 'AHAI35K',
      category: 'FOOD',
      days_active: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
      highlight_day: 'THU',
      missions: ['MEAL_UNDER_50K', 'OFFICE_LUNCH'],
      original_price: 65000,
      discount_price: 39000,
      saving: 26000,
      percent: 40,
      rating: 4.8,
      reviews: 5800,
      deal_value_score: 92,
      trust_risk_score: 65,
      price_psychology: '39K — Ăn no dưới 40K',
      why_reasons: [
        'Bữa trưa đặc sản nổi tiếng 39K ăn no căng bụng',
        'Gần các tòa nhà văn phòng trung tâm Hải Châu & Cầu Rồng',
        'Đúng khung giờ vàng ăn trưa (10:30 - 13:30)'
      ],
      why_not_reasons: [
        'Quán thường đông khách khung 11:30 - 12:30 (nên đặt sớm)',
        'Giới hạn 8 suất ưu đãi mỗi ngày trên GrabFood'
      ],
      terms: 'Áp dụng đặt qua GrabFood khung trưa 11:00 - 13:00. Giới hạn 8 suất/ngày.',
      is_hidden: false,
      hidden_reason: 'Ưu đãi liên kết GrabFood khu vực trung tâm Hải Châu.',
      audit_status_label: '🔵 Đang quét thực địa',
      audit_status_color: '#0284C7',
      audit_tip: 'Đặt sớm trước 11:30 để tránh quán quá tải và hết mã AHAI35K.',
      hunt_strategy: 'Bấm Săn Ngay → Chọn món Cơm gà quay → Dán mã AHAI35K trước 11:30 để tài xế nhận đơn sớm.',
      destination_label: '🛵 Mở trên GrabFood ↗',
      maps_url: 'https://maps.google.com/?q=100+Thai+Phien+Da+Nang',
      link: 'https://food.grab.com/vn/vi/restaurant/c%C6%A1m-g%C3%A0-a-h%E1%BA%A3i-th%C3%A1i-phi%C3%AAn-delivery/',
      image_provenance_label: 'Ảnh minh họa địa điểm',
      image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=800&q=80',
      badge_bg: 'linear-gradient(135deg, #F97316, #C2410C)'
    },
    {
      deal_id: 'DNG-JOLLIBEE-39K',
      merchant: 'Jollibee Co.opmart & Thanh Khê',
      brand_short: 'JOLLIBEE',
      micro_zone: 'MICRO_DIEN_BIEN_PHU',
      zone_label: 'Điện Biên Phủ (Thanh Khê)',
      branch: '478 Điện Biên Phủ, Thanh Khê (Gần SVĐ Đĩa Bay & KTX)',
      distance_km: 0.6,
      distance: '0.6 km · 3 phút',
      title: 'Combo Gà Giòn Sài Gòn + Mì Ý Bò Bằm + Nước',
      tag: '🍗 COMBO SINH VIÊN (THỨ 3/5)',
      code: 'JOLLIBEE39',
      category: 'FASTFOOD',
      days_active: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
      highlight_day: 'TUE',
      missions: ['MEAL_UNDER_50K', 'FASTFOOD', 'OFFICE_LUNCH'],
      original_price: 72000,
      discount_price: 39000,
      saving: 33000,
      percent: 46,
      rating: 4.8,
      reviews: 6200,
      deal_value_score: 96,
      trust_risk_score: 58,
      price_psychology: '39K — Tiết kiệm 33K',
      why_reasons: [
        'Combo 2 món (Gà Giòn + Mì Ý) ăn no bụng chỉ 39K',
        'Khoảng cách siêu gần 0.6 km khu KTX / Co.opmart Thanh Khê'
      ],
      why_not_reasons: [
        'Mã flash-sale ngầm chỉ mở trên Web khi chọn đúng chi nhánh',
        'Giới hạn 6 combo mỗi ngày'
      ],
      terms: 'Áp dụng đặt qua Web/App Jollibee khu vực Thanh Khê. Số lượng 6 combo/ngày.',
      is_hidden: true,
      hidden_reason: 'Combo flash-sale ngầm dành riêng cho khu vực sinh viên lân cận ĐH Sư Phạm/Bách Khoa.',
      audit_status_label: '🟡 Chưa kiểm chứng độc lập',
      audit_status_color: '#D97706',
      audit_tip: 'Ưu đãi chỉ mở trên website Jollibee khi chọn đúng chi nhánh 478 Điện Biên Phủ.',
      hunt_strategy: 'Sao chép mã JOLLIBEE39 → Mở Web Jollibee → Thêm Combo Sinh Viên vào giỏ → Nhập mã thanh toán.',
      destination_label: '🍗 Mở trên Jollibee.vn ↗',
      maps_url: 'https://maps.google.com/?q=478+Dien+Bien+Phu+Da+Nang',
      link: 'https://jollibee.com.vn/thuc-don',
      image_provenance_label: 'Ảnh minh họa địa điểm',
      image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80',
      badge_bg: 'linear-gradient(135deg, #E11D48, #9F1239)'
    },
    {
      deal_id: 'DNG-CGV-55K',
      merchant: 'CGV Vincom Ngô Quyền',
      brand_short: 'CGV CINEMA',
      micro_zone: 'MICRO_VINCOM_SON_TRA',
      zone_label: 'Vincom Plaza (Sơn Trà)',
      branch: 'Tầng 4 Vincom Plaza, 910A Ngô Quyền, Sơn Trà',
      distance_km: 1.8,
      distance: '1.8 km · 6 phút',
      title: 'Vé Xem Phim 2D Ưu Đãi Thành Viên U22 & HSSV',
      tag: '🎬 VÉ U22 CGV (THỨ 3)',
      code: 'CGVU22DN',
      category: 'CINEMA',
      days_active: ['MON', 'TUE', 'WED', 'THU', 'FRI'],
      highlight_day: 'TUE',
      missions: ['ENTERTAINMENT', 'GROUP', 'AFTER_WORK'],
      original_price: 110000,
      discount_price: 55000,
      saving: 55000,
      percent: 50,
      rating: 4.7,
      reviews: 3500,
      deal_value_score: 91,
      trust_risk_score: 70,
      price_psychology: '55K — Rạp chuẩn quốc tế',
      why_reasons: [
        'Xem phim rạp chuẩn CGV Vincom đồng giá 55K (Tiết kiệm 55K)',
        'Phù hợp giải trí tối cùng bạn bè hoặc người thân'
      ],
      why_not_reasons: [
        'Bắt buộc xuất trình CCCD hoặc thẻ HSSV chính chủ tại quầy',
        'Chỉ áp dụng từ Thứ 2 đến Thứ 6'
      ],
      terms: 'Áp dụng từ Thứ 2 đến Thứ 6 cho thành viên CGV dưới 22 tuổi hoặc có thẻ HSSV/CCCD hợp lệ.',
      is_hidden: false,
      hidden_reason: 'Chính sách giá vé ưu đãi thành viên cố định tại cụm rạp CGV Vincom Sơn Trà.',
      audit_status_label: '🔵 Đang quét thực địa',
      audit_status_color: '#0284C7',
      audit_tip: 'Nhớ mang theo thẻ Học sinh/Sinh viên hoặc CCCD để nhân viên đối soát.',
      hunt_strategy: 'Đặt vé online chọn suất chiếu U22 → Xuất trình thẻ HSSV/CCCD khi nhận vé tại quầy.',
      destination_label: '🎬 Mở trên Web CGV ↗',
      maps_url: 'https://maps.google.com/?q=Vincom+Plaza+Ngo+Quyen+Da+Nang',
      link: 'https://www.cgv.vn/en/cinox/site/cgv-vincom-da-nang/',
      image_provenance_label: 'Ảnh minh họa địa điểm',
      image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80',
      badge_bg: 'linear-gradient(135deg, #EF4444, #B91C1C)'
    },
    {
      deal_id: 'DNG-KATINAT-BD',
      merchant: 'Katinat Saigon Kafe',
      brand_short: 'KATINAT',
      micro_zone: 'MICRO_BACH_DANG',
      zone_label: 'Bạch Đằng (Sông Hàn)',
      branch: '34 Bạch Đằng, Hải Châu (View trực diện Sông Hàn)',
      distance_km: 0.8,
      distance: '0.8 km · 3 phút',
      title: 'Trà Sữa Chôm Chôm Mua Kèm Bánh Nướng 1Đ',
      tag: '🥤 VIEW SÔNG HÀN (THỨ 6)',
      code: 'KATINAT1D',
      category: 'DRINK',
      days_active: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
      highlight_day: 'FRI',
      missions: ['CAFE_WORK', 'AFTER_WORK', 'GROUP'],
      original_price: 75000,
      discount_price: 55000,
      saving: 20000,
      percent: 27,
      rating: 4.7,
      reviews: 4100,
      deal_value_score: 84,
      trust_risk_score: 55,
      price_psychology: '55K — Kèm bánh 1Đ',
      why_reasons: [
        'View trực diện sông Hàn thoáng đãng thích hợp gặp đối tác / học bài',
        'Tặng bánh nướng 1Đ khi dùng tại quầy buổi tối'
      ],
      why_not_reasons: [
        'Mức giá 55K cao hơn các quán trà sữa sinh viên bình dân',
        'Chỉ áp dụng trực tiếp tại quầy 34 Bạch Đằng (không áp dụng online)'
      ],
      terms: 'Áp dụng trực tiếp tại quầy 34 Bạch Đằng khi gọi đồ uống signature từ 18:00 - 21:00.',
      is_hidden: true,
      hidden_reason: 'Chương trình tri ân khách hàng trải nghiệm view sông Hàn buổi tối.',
      audit_status_label: '🟡 Chưa kiểm chứng độc lập',
      audit_status_color: '#D97706',
      audit_tip: 'Đọc mã KATINAT1D trực tiếp với thu ngân tầng 1 trước khi gọi món.',
      hunt_strategy: 'Đến quán trước 19:30 → Đọc mã KATINAT1D khi gọi món tại quầy thu ngân tầng 1.',
      destination_label: '☕ Mở Menu Katinat ↗',
      maps_url: 'https://maps.google.com/?q=34+Bach+Dang+Da+Nang',
      link: 'https://katinat.vn/menu/',
      image_provenance_label: 'Ảnh minh họa địa điểm',
      image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=800&q=80',
      badge_bg: 'linear-gradient(135deg, #D97706, #B45309)'
    },
    {
      deal_id: 'DNG-XANHSM-30K',
      merchant: 'Xanh SM Taxi Điện Đà Nẵng',
      brand_short: 'XANH SM',
      micro_zone: 'ALL_DANANG',
      zone_label: 'Toàn Đà Nẵng (Đón tận nơi)',
      branch: 'Áp dụng toàn TP Đà Nẵng (Hải Châu, Thanh Khê, Sơn Trà, NHS)',
      distance_km: 0.3,
      distance: 'Đón tận nơi · 3 phút',
      title: 'Mã Giảm 30K Đi Xe Thuần Điện VinFast Không Mùi',
      tag: '⚡ 0Đ KHỞI HÀNH (TGIF)',
      code: 'XANHDN30',
      category: 'RIDE',
      days_active: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
      highlight_day: 'FRI',
      missions: ['RIDE', 'GROUP', 'OFFICE_LUNCH'],
      original_price: 60000,
      discount_price: 30000,
      saving: 30000,
      percent: 50,
      rating: 4.9,
      reviews: 8900,
      deal_value_score: 97,
      trust_risk_score: 72,
      price_psychology: '30K — Khởi hành êm ái',
      why_reasons: [
        'Xe thuần điện VinFast sạch sẽ, êm ái, không mùi say xe',
        'Giảm trực tiếp 30.000₫ cho chuyến đi'
      ],
      why_not_reasons: [
        'Chỉ áp dụng cho các cuốc xe có cước gốc từ 50.000₫ trở lên',
        'Số lượng mã có hạn theo khung giờ cao điểm'
      ],
      terms: 'Áp dụng cho chuyến xe Xanh SM Taxi / Taxi Luxury tại Đà Nẵng có cước từ 50K.',
      is_hidden: false,
      hidden_reason: 'Chính sách trợ giá cuốc xe điện toàn thành phố kích cầu người dùng mới.',
      audit_status_label: '🔵 Đang quét thực địa',
      audit_status_color: '#0284C7',
      audit_tip: 'Nhập mã XANHDN30 tại mục Khuyến Mãi trong app trước khi xác nhận cuốc xe.',
      hunt_strategy: 'Mở app Xanh SM → Vào mục Ưu Đãi → Nhập XANHDN30 → Đặt xe để áp dụng giảm trực tiếp.',
      destination_label: '⚡ Mở trên App XanhSM ↗',
      maps_url: 'https://maps.google.com/?q=Da+Nang',
      link: 'https://www.xanhsm.com',
      image_provenance_label: 'Ảnh minh họa địa điểm',
      image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80',
      badge_bg: 'linear-gradient(135deg, #0284C7, #0369A1)'
    },
    {
      deal_id: 'DNG-CHELIEN-HD',
      merchant: 'Chè Sầu Liên',
      brand_short: 'CHÈ LIÊN',
      micro_zone: 'MICRO_HOANG_DIEU',
      zone_label: 'Hoàng Diệu (Hải Châu)',
      branch: '189 Hoàng Diệu, Hải Châu (Cơ sở truyền thống nổi tiếng)',
      distance_km: 1.0,
      distance: '1.0 km · 4 phút',
      title: 'Chè Thái Sầu Riêng Đậm Đà Mua 4 Tặng 1 Tô',
      tag: '🍧 MUA 4 TẶNG 1 (THỨ 5)',
      code: 'CHELIENFREE',
      category: 'FOOD',
      days_active: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
      highlight_day: 'THU',
      missions: ['GROUP', 'DRINK_UNDER_30K', 'AFTER_WORK'],
      original_price: 45000,
      discount_price: 28000,
      saving: 17000,
      percent: 38,
      rating: 4.8,
      reviews: 9400,
      deal_value_score: 89,
      trust_risk_score: 68,
      price_psychology: '28K/tô — Đặc sản số 1',
      why_reasons: [
        'Đặc sản chè sầu trứ danh Đà Thành giải nhiệt xế chiều',
        'Mua 4 tặng 1 cực kỳ tiết kiệm cho nhóm bạn / đồng nghiệp'
      ],
      why_not_reasons: [
        'Cần đặt tối thiểu từ 4 tô trở lên để được tặng 1',
        'Mùi sầu riêng đặc trưng (cần lưu ý nếu ăn tại văn phòng)'
      ],
      terms: 'Áp dụng cho đơn nhóm từ 4 phần trở lên trên GrabFood hoặc mua mang về tại 189 Hoàng Diệu.',
      is_hidden: false,
      hidden_reason: 'Chương trình ưu đãi nhóm giải nhiệt mùa hè truyền thống tại cơ sở Hoàng Diệu.',
      audit_status_label: '🔵 Đang quét thực địa',
      audit_status_color: '#0284C7',
      audit_tip: 'Thêm tối thiểu 4 phần chè vào giỏ GrabFood để kích hoạt mã tự động.',
      hunt_strategy: 'Đặt đơn nhóm 4 tô trên GrabFood → Nhập mã CHELIENFREE tại bước thanh toán.',
      destination_label: '🍧 Mở trên GrabFood ↗',
      maps_url: 'https://maps.google.com/?q=189+Hoang+Dieu+Da+Nang',
      link: 'https://food.grab.com/vn/vi/restaurant/ch%C3%A8-li%C3%AAn-ho%C3%A0ng-di%E1%BB%87u-delivery/',
      image_provenance_label: 'Ảnh minh họa địa điểm',
      image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80',
      badge_bg: 'linear-gradient(135deg, #84CC16, #4D7C0F)'
    }
  ];

  // 4. STATE MANAGEMENT
  const State = {
    deals: DEALS_DATABASE,
    theme: localStorage.getItem('jayt_theme') || 'dark',
    dealNowMode: false,
    activeTab: 'home',
    // 3-LAYER SELECTION
    activeDay: 'ALL',
    activeCategoryPref: 'ALL', // 'ALL', 'CINEMA', 'FASTFOOD', 'DRINK', 'FOOD', 'RIDE'
    activeMission: 'ALL',
    activeBudget: 'ALL',
    activeMicroZone: 'ALL',
    savedIds: JSON.parse(localStorage.getItem('jayt_favs') || '[]'),
    huntedCount: parseInt(localStorage.getItem('jayt_hunted_count') || '17', 10),
    actualSavedAmount: parseInt(localStorage.getItem('jayt_actual_savings') || '255000', 10),
    shareCount: parseInt(localStorage.getItem('jayt_share_count') || '0', 10),
    referralBonus: parseInt(localStorage.getItem('jayt_referral_bonus') || '0', 10),
    calcDrink: 5, calcMeal: 6, calcRide: 6,
    pendingOutcomeDeal: null,
    isVictoryModalOpen: false,
    lastWonDeal: null
  };

  function calculateFitScore(deal, mission, budget, microZone, currentSlot, activeDay, activeCategoryPref) {
    let fit = 75;
    if (activeCategoryPref !== 'ALL' && deal.category === activeCategoryPref) fit += 25;
    if (mission !== 'ALL' && deal.missions && deal.missions.includes(mission)) fit += 15;
    if (microZone !== 'ALL' && deal.micro_zone === microZone) fit += 10;
    if (budget === 'UNDER_30K' && deal.discount_price <= 30000) fit += 10;
    if (budget === 'UNDER_50K' && deal.discount_price <= 50000) fit += 10;
    if (activeDay !== 'ALL' && deal.highlight_day === activeDay) fit += 20;
    return Math.min(99, fit);
  }

  function getSmartTimeContext() {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 10) return { slot: 'MORNING', label: '☀️ 06:30 - 09:00: Săn Cà Phê & Bánh Mì Sáng', greeting: 'Sáng nay Đà Nẵng nạp năng lượng ở đâu?' };
    if (hour >= 10 && hour < 14) return { slot: 'LUNCH', label: '💼 10:30 - 13:30: Giờ Vàng Cơm Trưa & Đồ Mặn', greeting: 'Trưa nay Đà Nẵng ăn gì dưới 50K?' };
    if (hour >= 14 && hour < 17) return { slot: 'AFTERNOON', label: '🧋 14:00 - 17:00: Giờ Vàng Trà Sữa & Ăn Vặt', greeting: 'Chiều nay săn ly trà sữa Maycha / Katinat?' };
    if (hour >= 17 && hour < 21) return { slot: 'EVENING', label: '👥 17:00 - 21:00: Tan Ca Đi Nhóm & Rạp Phim Metiz / CGV', greeting: 'Tối nay Metiz Helio 45K hay CGV 55K?' };
    return { slot: 'NIGHT', label: '🌙 21:00 - 23:30: Radar Săn Kèo Đêm & Cú Đêm', greeting: 'Đêm nay Đà Nẵng ăn vặt ở đâu ngon?' };
  }

  // 5. HOST PROVISIONER
  function ensureApexHost() {
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.backgroundColor = '#0B0F19';
    document.body.style.fontFamily = "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif";
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

  // 6. RENDER GIAO DIỆN APEX V5.5 — BỘ NHỚ KHUYẾN MÃI
  function renderApp() {
    const root = ensureApexHost();
    const isLight = State.theme === 'light';
    const timeInfo = getSmartTimeContext();

    const C = {
      bg: isLight ? '#F8FAFC' : '#0B0F19',
      cardBg: isLight ? '#FFFFFF' : 'rgba(23, 30, 48, 0.9)',
      border: isLight ? '#E2E8F0' : 'rgba(255, 255, 255, 0.08)',
      textMain: isLight ? '#0F172A' : '#FFFFFF',
      textSub: isLight ? '#475569' : '#94A3B8',
      textMuted: isLight ? '#94A3B8' : '#64748B',
      tickerBg: isLight ? '#F1F5F9' : '#0D1322',
      headerBg: isLight ? 'rgba(255, 255, 255, 0.95)' : 'rgba(11, 15, 25, 0.95)',
      calcBg: isLight ? '#FFFFFF' : 'rgba(17, 24, 39, 0.9)',
      pillBg: isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.04)',
      pillText: isLight ? '#334155' : '#E2E8F0',
      footerBg: isLight ? '#0F172A' : '#080C14',
      cardShadow: isLight ? '0 10px 30px rgba(0, 0, 0, 0.05)' : '0 10px 30px rgba(0,0,0,0.5)'
    };

    let processedDeals = State.deals.map(d => {
      const fitScore = calculateFitScore(d, State.activeMission, State.activeBudget, State.activeMicroZone, timeInfo.slot, State.activeDay, State.activeCategoryPref);
      return { ...d, calculated_fit_score: fitScore };
    });

    if (State.activeCategoryPref !== 'ALL') {
      processedDeals = processedDeals.filter(d => d.category === State.activeCategoryPref);
    }
    if (State.activeDay !== 'ALL') {
      processedDeals = processedDeals.filter(d => d.days_active && d.days_active.includes(State.activeDay));
    }
    if (State.activeMicroZone !== 'ALL') {
      processedDeals = processedDeals.filter(d => d.micro_zone === State.activeMicroZone || d.micro_zone === 'ALL_DANANG');
    }
    if (State.activeBudget === 'UNDER_30K') {
      processedDeals = processedDeals.filter(d => d.discount_price <= 30000);
    } else if (State.activeBudget === 'UNDER_50K') {
      processedDeals = processedDeals.filter(d => d.discount_price <= 50000);
    }

    if (State.dealNowMode) {
      processedDeals = processedDeals.filter(d => d.percent >= 40);
    }

    const bestForYouDeal = [...processedDeals].sort((a, b) => b.calculated_fit_score - a.calculated_fit_score)[0] || processedDeals[0];
    const bestValueDeal = [...processedDeals].sort((a, b) => b.saving - a.saving)[0] || processedDeals[0];
    const nearestDeal = [...processedDeals].sort((a, b) => a.distance_km - b.distance_km)[0] || processedDeals[0];

    const monthlyCalc = ((State.calcDrink * 20000) + (State.calcMeal * 25000) + (State.calcRide * 15000)) * 4;

    root.innerHTML = `
      <div style="min-height: 100vh; background-color: ${C.bg}; color: ${C.textSub}; display: flex; flex-direction: column; justify-content: space-between; padding-bottom: 68px; box-sizing: border-box;">
        
        <div style="display: block; width: 100%;">
          <!-- 1. TIME-OF-DAY RADAR -->
          <div style="background: ${C.tickerBg}; border-bottom: 1px solid ${C.border}; padding: 0.55rem 1.5rem; font-size: 0.8rem; color: ${C.textMain}; display: flex; justify-content: space-between; align-items: center;">
            <div style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
              ⚡ <strong>BỘ NHỚ KHUYẾN MÃI ĐÀ THÀNH:</strong> ${escapeHTML(timeInfo.label)} · Metiz Helio vé 45K · CGV 55K · Jollibee 39K!
            </div>
            <div style="display: flex; align-items: center; gap: 0.4rem; font-size: 0.72rem; color: #059669; font-weight: 700;">
              <span style="width: 7px; height: 7px; border-radius: 50%; background: #10B981; display: inline-block;"></span>
              <span>MEMORY LIVE</span>
            </div>
          </div>

          <!-- 2. MASTER STICKY HEADER -->
          <header style="background: ${C.headerBg}; backdrop-filter: blur(20px); border-bottom: 1px solid ${C.border}; padding: 0.85rem 1.5rem; position: sticky; top: 0; z-index: 1000; display: block;">
            <div style="max-width: 1300px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; gap: 1rem;">
              <div style="display: flex; align-items: center; gap: 0.75rem; cursor: pointer;" onclick="window.scrollTo({top:0, behavior:'smooth'});">
                <div style="width: 42px; height: 42px; border-radius: 12px; background: linear-gradient(135deg, #10B981, #059669); color: #FFF; display: flex; align-items: center; justify-content: center; font-size: 1.35rem; font-weight: 800;">J</div>
                <div>
                  <div style="font-size: 1.25rem; font-weight: 800; color: ${C.textMain};">JayT Đà Nẵng</div>
                  <div style="font-size: 0.72rem; color: #059669; font-weight: 600;">🧠 Bộ Nhớ Khuyến Mãi Hàng Ngày</div>
                </div>
              </div>

              <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
                <button data-action="toggle-deal-now" style="min-height: 42px; background: ${State.dealNowMode ? '#DC2626' : (isLight ? '#FEE2E2' : 'rgba(239,68,68,0.2)')}; border: 1.5px solid #EF4444; color: ${State.dealNowMode ? '#FFF' : '#DC2626'}; font-size: 0.82rem; font-weight: 800; padding: 0 0.95rem; border-radius: 9999px; cursor: pointer;">
                  🔥 SĂN NHANH 10S
                </button>
                <button data-action="toggle-theme" style="min-height: 42px; background: ${C.pillBg}; border: 1px solid ${C.border}; color: ${C.textMain}; font-size: 0.82rem; font-weight: 700; padding: 0 0.9rem; border-radius: 9999px; cursor: pointer;">
                  ${isLight ? '🌙' : '☀️'}
                </button>
                <button data-action="open-wallet-modal" style="min-height: 42px; background: ${C.pillBg}; border: 1px solid ${C.border}; color: ${C.textMain}; font-size: 0.82rem; font-weight: 700; padding: 0 1rem; border-radius: 9999px; cursor: pointer;">
                  🎁 Ví (${State.huntedCount})
                </button>
              </div>
            </div>
          </header>

          <!-- 3. TẦNG 1 & 2: HÔM NAY CÓ GÌ & LỊCH SĂN KÈO 7 NGÀY (UPCOMING PLANNER) -->
          <div style="max-width: 1300px; margin: 1.5rem auto 0; padding: 0 1.5rem; display: block;">
            <div style="background: linear-gradient(135deg, rgba(99, 102, 241, 0.12), rgba(16, 185, 129, 0.08)); border: 2px solid #6366F1; border-radius: 24px; padding: 1.5rem 1.8rem; box-shadow: ${C.cardShadow};">
              
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; flex-wrap: wrap; gap: 0.5rem;">
                <div>
                  <h3 style="font-size: 1.25rem; font-weight: 800; color: ${C.textMain}; margin: 0; display: flex; align-items: center; gap: 0.5rem;">
                    <span>📅</span> <span>Hôm Nay Săn Gì? & Lên Plan Trước Với Đám Bạn</span>
                  </h3>
                  <p style="font-size: 0.8rem; color: ${C.textSub}; margin: 0.25rem 0 0;">
                    Không cần nhớ lịch rạp phim hay quán giảm giá — Bấm vào từng ngày để xem trước kèo và rủ bạn bè!
                  </p>
                </div>
                <span style="font-size: 0.72rem; background: #6366F1; color: #FFF; padding: 0.25rem 0.65rem; border-radius: 9999px; font-weight: 800;">
                  PROMO MEMORY 43
                </span>
              </div>

              <!-- THANH CHỌN LỊCH 7 NGÀY (T2 ➔ CN) -->
              <div style="display: flex; gap: 0.45rem; overflow-x: auto; padding-bottom: 0.5rem; margin-bottom: 1rem;">
                ${[
                  { code: 'ALL', label: '✨ Tất Cả Tuần', sub: 'Toàn bộ 8 kèo' },
                  { code: 'MON', label: 'Thứ 2 (Hôm Nay)', sub: 'Metiz 45K · Katinat 1Đ' },
                  { code: 'TUE', label: 'Thứ 3', sub: 'CGV 55K · Jollibee 39K' },
                  { code: 'WED', label: 'Thứ 4', sub: 'MayCha 1 Tặng 1 (24K)' },
                  { code: 'THU', label: 'Thứ 5', sub: 'Chè Liên 4 Tặng 1' },
                  { code: 'FRI', label: 'Thứ 6', sub: 'TGIF · Xanh SM 30K' },
                  { code: 'SAT', label: 'Thứ 7', sub: 'Lượn Sông Hàn & Rạp' },
                  { code: 'SUN', label: 'Chủ Nhật', sub: 'Oanh tạc cuối tuần' }
                ].map(day => {
                  const isActive = State.activeDay === day.code;
                  return `
                    <button data-action="set-calendar-day" data-day="${day.code}" style="min-width: 140px; padding: 0.75rem 0.85rem; border-radius: 14px; text-align: left; cursor: pointer; border: 1.5px solid ${isActive ? '#6366F1' : C.border}; background: ${isActive ? 'linear-gradient(135deg, #6366F1, #4338CA)' : C.pillBg}; color: ${isActive ? '#FFF' : C.pillText}; box-shadow: ${isActive ? '0 4px 14px rgba(99,102,241,0.35)' : 'none'}; flex-shrink: 0;">
                      <div style="font-size: 0.82rem; font-weight: 800;">${day.label}</div>
                      <div style="font-size: 0.68rem; opacity: 0.85; margin-top: 0.15rem;">${day.sub}</div>
                    </button>
                  `;
                }).join('')}
              </div>

              <!-- LỜI NHẮC CẢM XÚC SAU NGÀY HỌC/LÀM MỆT MỎI -->
              <div style="background: ${isLight ? '#FFFFFF' : 'rgba(0,0,0,0.35)'}; border-left: 4px solid #10B981; border-radius: 10px; padding: 0.75rem 1rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.6rem;">
                <div style="font-size: 0.8rem; color: ${C.textMain};">
                  ☕ <strong>Sau 1 ngày vất vả:</strong> Đừng quên tự thưởng cho mình vé xem phim <strong>Metiz Helio 45K</strong> hoặc đùi gà <strong>Jollibee 39K</strong> tối nay nhé!
                </div>
                <a href="https://zalo.me/share?url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent('Lịch săn kèo Đà Nẵng hôm nay nè tụi bay ơi!')}" target="_blank" rel="noopener noreferrer" style="background: #10B981; color: #FFF; text-decoration: none; padding: 0.4rem 0.85rem; border-radius: 8px; font-size: 0.75rem; font-weight: 800; display: inline-flex; align-items: center; gap: 0.3rem;">
                  <span>📲 Lên Kèo Rủ Đám Bạn Qua Zalo</span>
                  <span>➔</span>
                </a>
              </div>

            </div>
          </div>

          <!-- 4. TẦNG 3: KÈO TÔI HAY SĂN (MY FAVORITES CHIPS) -->
          <div style="max-width: 1300px; margin: 1.5rem auto 0; padding: 0 1.5rem; display: block;">
            <div style="background: ${C.cardBg}; border: 1.5px solid ${C.border}; border-radius: 24px; padding: 1.2rem 1.8rem; box-shadow: ${C.cardShadow};">
              
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.8rem; flex-wrap: wrap; gap: 0.5rem;">
                <div>
                  <h4 style="font-size: 1.05rem; font-weight: 800; color: ${C.textMain}; margin: 0;">
                    ❤️ Kèo Tôi Hay Săn (Lọc Theo Sở Thích Cá Nhân)
                  </h4>
                  <p style="font-size: 0.75rem; color: ${C.textMuted}; margin: 0.15rem 0 0;">
                    Chọn loại bạn thích để JayT lọc ra đúng kèo hôm nay đang có.
                  </p>
                </div>
              </div>

              <!-- CHIPS SỞ THÍCH CÁ NHÂN -->
              <div style="display: flex; gap: 0.4rem; flex-wrap: wrap;">
                ${[
                  'ALL:✨ Tất Cả',
                  'CINEMA:🎬 Rạp Phim (Metiz 45K / CGV 55K)',
                  'FASTFOOD:🍗 Gà Rán (Jollibee 39K)',
                  'DRINK:🧋 Trà Sữa (MayCha 24K)',
                  'FOOD:🍲 Cơm Gà / Chè Sầu',
                  'RIDE:🛵 Xe Điện 0Đ'
                ].map(item => {
                  const [code, label] = item.split(':');
                  const isActive = State.activeCategoryPref === code;
                  return `
                    <button data-action="set-category-pref" data-cat="${code}" style="min-height: 36px; padding: 0 0.85rem; border-radius: 9999px; font-size: 0.76rem; font-weight: 800; cursor: pointer; border: 1.5px solid ${isActive ? '#10B981' : C.border}; background: ${isActive ? 'linear-gradient(135deg, #10B981, #059669)' : C.pillBg}; color: ${isActive ? '#FFF' : C.pillText}; box-shadow: ${isActive ? '0 4px 12px rgba(16,185,129,0.3)' : 'none'};">
                      ${label}
                    </button>
                  `;
                }).join('')}
              </div>

            </div>
          </div>

          <!-- 5. TOP 3 QUYẾT ĐỊNH CHO BẠN HÔM NAY -->
          <div style="max-width: 1300px; margin: 2rem auto 0; padding: 0 1.5rem; display: block;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.2rem;">
              <div>
                <h2 style="font-size: 1.45rem; font-weight: 800; color: ${C.textMain}; margin: 0;">
                  🧭 Ba Lựa Chọn Đáng Săn Nhất Lúc Này
                </h2>
                <p style="font-size: 0.82rem; color: ${C.textSub}; margin: 0.2rem 0 0;">
                  Minh bạch 2 chiều: Lý do đề xuất (Why) và Điểm cần lưu ý/Đánh đổi (Why Not).
                </p>
              </div>
            </div>

            <!-- GRID TOP 3 DECISIONS -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.5rem; margin-bottom: 3.5rem;">
              ${renderDecisionCard(bestForYouDeal, '🎯 ① BEST FOR YOU', 'Khớp sở thích bạn vừa chọn', '#10B981', C, isLight)}
              ${renderDecisionCard(bestValueDeal, '💰 ② BEST VALUE', 'Mức giảm tiền mặt sâu nhất', '#D97706', C, isLight)}
              ${renderDecisionCard(nearestDeal, '📍 ③ NEAREST', 'Vị trí gần bạn nhất (dưới 1 km)', '#0284C7', C, isLight)}
            </div>
          </div>

          <!-- 6. KHO TOÀN BỘ KÈO ĐÀ THÀNH 43 -->
          <div style="max-width: 1300px; margin: 0 auto; padding: 0 1.5rem 3.5rem; display: block;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.2rem;">
              <div>
                <h3 style="font-size: 1.35rem; font-weight: 800; color: ${C.textMain}; margin: 0;">
                  ⚡ Kho Kèo Đà Nẵng (${processedDeals.length} Kèo)
                </h3>
                <p style="font-size: 0.8rem; color: ${C.textMuted}; margin: 0.2rem 0 0;">
                  Minh bạch 3 chỉ số: Độ Hời · Độ Khớp (Fit) · Mức Kiểm Chứng (Risk Signal).
                </p>
              </div>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(295px, 1fr)); gap: 1.6rem;">
              ${processedDeals.map(deal => renderDealCard(deal, C, isLight)).join('')}
            </div>
          </div>

          <!-- 7. MÁY TÍNH TIẾT KIỆM -->
          <div style="max-width: 900px; margin: 0 auto 3.5rem; padding: 0 1.5rem; display: block;">
            <div style="background: ${C.calcBg}; border: 1.5px solid ${C.border}; border-radius: 20px; padding: 2.2rem; box-shadow: ${C.cardShadow};">
              <div style="text-align: center; margin-bottom: 1.8rem;">
                <div style="font-size: 2.5rem; margin-bottom: 0.4rem;">🧮</div>
                <h2 style="font-size: 1.6rem; font-weight: 800; color: ${C.textMain}; margin-bottom: 0.3rem;">Bảng Tính Tiết Kiệm Khi Săn Kèo Thực Chiến</h2>
                <p style="font-size: 0.88rem; color: ${C.textSub};">Kéo thanh trượt để xem số tiền dôi ra mỗi tháng/năm khi áp dụng chiến thuật JayT.</p>
              </div>

              <div style="display: flex; flex-direction: column; gap: 1.3rem; margin-bottom: 1.8rem;">
                <div>
                  <div style="display: flex; justify-content: space-between; font-size: 0.88rem; font-weight: 600; color: ${C.textMain}; margin-bottom: 0.4rem;">
                    <span>🧋 Trà sữa / Cà phê:</span>
                    <strong style="color: #D97706; font-weight: 700;">${State.calcDrink} ly / tuần</strong>
                  </div>
                  <input type="range" min="0" max="14" value="${State.calcDrink}" id="calcDrink" style="width: 100%; accent-color: #10B981; cursor: pointer;" />
                </div>
                <div>
                  <div style="display: flex; justify-content: space-between; font-size: 0.88rem; font-weight: 600; color: ${C.textMain}; margin-bottom: 0.4rem;">
                    <span>🍲 Bữa ăn ngoài (Grab / ShopeeFood):</span>
                    <strong style="color: #D97706; font-weight: 700;">${State.calcMeal} bữa / tuần</strong>
                  </div>
                  <input type="range" min="0" max="14" value="${State.calcMeal}" id="calcMeal" style="width: 100%; accent-color: #10B981; cursor: pointer;" />
                </div>
                <div>
                  <div style="display: flex; justify-content: space-between; font-size: 0.88rem; font-weight: 600; color: ${C.textMain}; margin-bottom: 0.4rem;">
                    <span>🛵 Chuyến xe công nghệ (Grab / Xanh SM):</span>
                    <strong style="color: #D97706; font-weight: 700;">${State.calcRide} chuyến / tuần</strong>
                  </div>
                  <input type="range" min="0" max="14" value="${State.calcRide}" id="calcRide" style="width: 100%; accent-color: #10B981; cursor: pointer;" />
                </div>
              </div>

              <div style="background: linear-gradient(135deg, rgba(16,185,129,0.15), rgba(5,150,105,0.08)); border: 1.5px solid #10B981; border-radius: 16px; padding: 1.5rem; text-align: center;">
                <div style="font-size: 0.8rem; font-weight: 800; color: #059669; text-transform: uppercase;">BẠN SẼ TIẾT KIỆM ĐƯỢC:</div>
                <div style="font-size: 2.4rem; font-weight: 800; color: #059669; margin: 0.3rem 0;">
                  ${monthlyCalc.toLocaleString('vi-VN')} ₫ / tháng
                </div>
                <div style="font-size: 0.85rem; color: ${C.textMain}; padding: 0.75rem 1rem; border-radius: 12px; margin-top: 0.6rem; border: 1px solid ${C.border};">
                  💡 <strong>Tương đương ~${(monthlyCalc * 12).toLocaleString('vi-VN')}₫/năm:</strong> Đủ mua thiết bị mới, đóng tiền trọ cả kỳ hoặc liên hoan thả ga! 🎉
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- FIXED MOBILE BOTTOM NAVIGATION -->
        <nav style="position: fixed; bottom: 0; left: 0; right: 0; height: 60px; background: ${C.headerBg}; backdrop-filter: blur(20px); border-top: 1px solid ${C.border}; display: flex; justify-content: space-around; align-items: center; z-index: 9999;">
          <button data-action="nav-tab" data-tab="home" style="min-height: 44px; min-width: 44px; background: none; border: none; color: ${State.activeTab === 'home' ? '#059669' : C.textMuted}; font-size: 0.72rem; font-weight: 700; display: flex; flex-direction: column; align-items: center; justify-content: center; cursor: pointer;">
            <span style="font-size: 1.15rem;">⌂</span>
            <span>Khám Phá</span>
          </button>
          <button data-action="toggle-deal-now" style="min-height: 44px; min-width: 44px; background: none; border: none; color: ${State.dealNowMode ? '#DC2626' : C.textMuted}; font-size: 0.72rem; font-weight: 800; display: flex; flex-direction: column; align-items: center; justify-content: center; cursor: pointer;">
            <span style="font-size: 1.15rem;">🔥</span>
            <span>Săn Nhanh</span>
          </button>
          <button data-action="open-wallet-modal" style="min-height: 44px; min-width: 44px; background: none; border: none; color: ${State.activeTab === 'wallet' ? '#059669' : C.textMuted}; font-size: 0.72rem; font-weight: 700; display: flex; flex-direction: column; align-items: center; justify-content: center; cursor: pointer;">
            <span style="font-size: 1.15rem;">👤</span>
            <span>Ví Của Tôi</span>
          </button>
          <a href="https://zalo.me/0777511204" target="_blank" rel="noopener noreferrer" style="min-height: 44px; min-width: 44px; color: ${C.textMuted}; font-size: 0.72rem; font-weight: 700; display: flex; flex-direction: column; align-items: center; justify-content: center; text-decoration: none;">
            <span style="font-size: 1.15rem;">💬</span>
            <span>CSKH 43</span>
          </a>
        </nav>

        <!-- 8. GRAND FOOTER -->
        <footer style="background: ${C.footerBg}; border-top: 1px solid rgba(255,255,255,0.08); padding: 3rem 1.5rem 2rem; display: block;">
          <div style="max-width: 1300px; margin: 0 auto;">
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 2rem; margin-bottom: 2rem;">
              <div>
                <div style="font-size: 1.2rem; font-weight: 800; color: #FFF; margin-bottom: 0.6rem;">JayT Đà Nẵng 43</div>
                <p style="font-size: 0.82rem; color: #94A3B8; line-height: 1.6;">Bộ nhớ khuyến mãi hàng ngày của người tiêu dùng Đà Nẵng.</p>
              </div>
              <div>
                <h4 style="font-size: 0.85rem; font-weight: 700; color: #FBBF24; text-transform: uppercase; margin-bottom: 0.8rem;">Cụm Rạp & Tọa Độ</h4>
                <ul style="list-style: none; padding: 0; font-size: 0.82rem; color: #94A3B8; display: flex; flex-direction: column; gap: 0.45rem;">
                  <li>🎬 Metiz Cinema • Helio Center Đường 2/9 (Vé T2 45K)</li>
                  <li>🍿 CGV Vincom • 910A Ngô Quyền (Vé T3 55K)</li>
                  <li>🍗 478 Điện Biên Phủ • Jollibee Co.opmart Thanh Khê</li>
                  <li>☕ 34 Bạch Đằng • Katinat View Sông Hàn</li>
                </ul>
              </div>
              <div>
                <h4 style="font-size: 0.85rem; font-weight: 700; color: #FBBF24; text-transform: uppercase; margin-bottom: 0.8rem;">Hỗ Trợ Cộng Đồng</h4>
                <p style="font-size: 0.82rem; color: #94A3B8; margin-bottom: 0.6rem;">Tiếp nhận và giải quyết phản hồi qua kênh Zalo CSKH Đà Nẵng 43.</p>
                <a href="https://zalo.me/0777511204" target="_blank" rel="noopener noreferrer" style="color: #10B981; font-weight: 700; text-decoration: none; font-size: 0.85rem;">Liên Hệ Zalo CSKH ↗</a>
              </div>
            </div>
            <div style="border-top: 1px solid rgba(255,255,255,0.08); padding-top: 1.5rem; display: flex; justify-content: space-between; font-size: 0.78rem; color: #64748B;">
              <span>© 2026 JayT Corp. Phục vụ cộng đồng Đà Nẵng là số 1.</span>
              <span>Phiên bản: JayT Apex v5.5 — RC-1</span>
            </div>
          </div>
        </footer>

      </div>
    `;
  }

  // 7. RENDER DECISION CARD
  function renderDecisionCard(deal, badgeTitle, badgeSubtitle, accentColor, C, isLight) {
    if (!deal) return '';
    return `
      <div style="background: ${C.cardBg}; border: 2px solid ${accentColor}; border-radius: 20px; padding: 1.4rem; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 10px 30px rgba(0,0,0,0.15); position: relative;">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.8rem;">
            <div>
              <span style="background: ${accentColor}; color: #000; font-size: 0.75rem; font-weight: 900; padding: 0.25rem 0.65rem; border-radius: 9999px;">
                ${badgeTitle}
              </span>
              <div style="font-size: 0.72rem; color: ${C.textMuted}; margin-top: 0.25rem;">${badgeSubtitle}</div>
            </div>
            <span style="font-size: 0.75rem; color: #059669; font-weight: 800;">★ ${deal.rating}</span>
          </div>

          <div style="position: relative; width: 100%; aspect-ratio: 16 / 10; background-color: #111827; overflow: hidden; border-radius: 12px; margin-bottom: 0.8rem;">
            <img src="${sanitizeURL(deal.image)}" alt="${escapeHTML(deal.title)}" style="width: 100%; height: 100%; object-fit: cover; display: block;" onerror="this.onerror=null; this.src='${FALLBACK_IMAGE_SVG}';" />
            <div style="position: absolute; bottom: 8px; left: 8px; background: rgba(0,0,0,0.75); color: ${deal.audit_status_color}; border: 1px solid ${deal.audit_status_color}; font-weight: 700; font-size: 0.68rem; padding: 0.2rem 0.5rem; border-radius: 6px;">
              ${deal.audit_status_label}
            </div>
          </div>

          <div style="font-size: 0.82rem; font-weight: 800; color: #D97706; text-transform: uppercase; margin-bottom: 0.25rem;">
            ${escapeHTML(deal.merchant)} · <span style="color:${C.textMuted};font-size:0.75rem;">${escapeHTML(deal.zone_label)}</span>
          </div>
          <h3 style="font-size: 1.1rem; font-weight: 800; color: ${C.textMain}; line-height: 1.35; margin: 0 0 0.6rem 0;">
            ${escapeHTML(deal.title)}
          </h3>

          <div style="background: ${isLight ? '#F8FAFC' : 'rgba(255,255,255,0.03)'}; border: 1px dashed ${C.border}; border-radius: 10px; padding: 0.75rem; margin-bottom: 0.8rem;">
            <div style="font-size: 0.74rem; font-weight: 800; color: #059669; text-transform: uppercase; margin-bottom: 0.25rem;">
              💡 Vì Sao Đề Xuất Theo Tiêu Chí Bạn Chọn?
            </div>
            <ul style="margin: 0 0 0.5rem 0; padding-left: 0.8rem; font-size: 0.72rem; color: ${C.textSub}; line-height: 1.45; list-style: square;">
              ${deal.why_reasons.map(r => `<li>${escapeHTML(r)}</li>`).join('')}
            </ul>

            <div style="font-size: 0.72rem; font-weight: 800; color: #D97706; text-transform: uppercase; margin-bottom: 0.2rem;">
              ⚠️ Điểm Cần Lưu Ý (Why Not?):
            </div>
            <ul style="margin: 0; padding-left: 0.8rem; font-size: 0.7rem; color: ${C.textMuted}; line-height: 1.4; list-style: square;">
              ${deal.why_not_reasons.map(r => `<li>${escapeHTML(r)}</li>`).join('')}
            </ul>
          </div>

          <div style="background: rgba(16,185,129,0.08); border: 1px solid #10B981; border-radius: 10px; padding: 0.65rem 0.8rem; margin-bottom: 1rem; display: flex; justify-content: space-between; align-items: center;">
            <div>
              <div style="font-size: 1.15rem; font-weight: 900; color: #059669;">
                TIẾT KIỆM ${formatVND(deal.saving)} (-${deal.percent}%)
              </div>
              <div style="font-size: 0.75rem; color: ${C.textSub};">
                Giá còn: <strong style="color:${C.textMain};">${formatVND(deal.discount_price)}</strong> (Gốc: ${formatVND(deal.original_price)})
              </div>
            </div>
          </div>
        </div>

        <button data-action="hunt-keo" data-id="${deal.deal_id}" data-code="${deal.code}" data-link="${deal.link}" data-saving="${deal.saving}" style="width: 100%; min-height: 48px; background: linear-gradient(135deg, #10B981, #059669); color: #FFF; border: none; border-radius: 12px; font-weight: 800; font-size: 0.9rem; cursor: pointer; box-shadow: 0 4px 14px rgba(16,185,129,0.35); display: flex; align-items: center; justify-content: center; gap: 0.4rem;">
          <span>🔥 SĂN ${escapeHTML(deal.brand_short)} (-${formatVND(deal.saving)})</span>
          <span>➔</span>
        </button>
      </div>
    `;
  }

  // 8. RENDER DEAL CARD
  function renderDealCard(deal, C, isLight) {
    const isFav = State.savedIds.includes(deal.deal_id);

    return `
      <div style="background: ${C.cardBg}; border: 1px solid ${C.border}; border-radius: 20px; display: flex; flex-direction: column; justify-content: space-between; overflow: hidden; box-shadow: ${C.cardShadow}; height: 100%; box-sizing: border-box;">
        
        <div style="position: relative; width: 100%; aspect-ratio: 16 / 10; background-color: #111827; overflow: hidden;">
          <img src="${sanitizeURL(deal.image)}" alt="${escapeHTML(deal.title)}" style="width: 100%; height: 100%; object-fit: cover; display: block;" onerror="this.onerror=null; this.src='${FALLBACK_IMAGE_SVG}';" />
          
          <div style="position: absolute; top: 10px; left: 10px; background: ${deal.badge_bg}; color: #FFF; padding: 0.25rem 0.65rem; border-radius: 9999px; font-size: 0.72rem; font-weight: 700;">
            ${escapeHTML(deal.tag)}
          </div>
          
          <div style="position: absolute; bottom: 10px; right: 10px; background: rgba(0,0,0,0.65); color: #FFF; font-size: 0.65rem; padding: 0.2rem 0.5rem; border-radius: 4px; backdrop-filter: blur(4px);">
            📷 ${escapeHTML(deal.image_provenance_label)}
          </div>
          
          <div style="position: absolute; bottom: 10px; left: 10px; background: rgba(0,0,0,0.75); color: ${deal.audit_status_color}; border: 1px solid ${deal.audit_status_color}; padding: 0.2rem 0.55rem; border-radius: 6px; font-size: 0.68rem; font-weight: 700; backdrop-filter: blur(8px);">
            ${deal.audit_status_label}
          </div>
        </div>

        <div style="padding: 1.25rem; display: flex; flex-direction: column; justify-content: space-between; flex: 1; gap: 0.85rem;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
              <span style="font-size: 0.82rem; font-weight: 800; color: #D97706; text-transform: uppercase;">${escapeHTML(deal.merchant)}</span>
              <span style="font-size: 0.74rem; color: #059669; font-weight: 700;">★ ${deal.rating}</span>
            </div>
            
            <h4 style="font-size: 1.05rem; font-weight: 700; color: ${C.textMain}; line-height: 1.35; margin-bottom: 0.35rem; margin-top: 0;">
              ${escapeHTML(deal.title)}
            </h4>

            <div style="display: flex; justify-content: space-between; font-size: 0.74rem; color: ${C.textMuted}; margin-bottom: 0.65rem;">
              <span>📍 ${escapeHTML(deal.distance)} · ${escapeHTML(deal.zone_label)}</span>
              <span style="color: #059669; font-weight: 700;">${escapeHTML(deal.price_psychology)}</span>
            </div>
            
            <div style="background: ${isLight ? 'rgba(16, 185, 129, 0.06)' : 'rgba(16, 185, 129, 0.08)'}; border: 1.5px solid rgba(16, 185, 129, 0.25); border-radius: 12px; padding: 0.75rem 0.9rem; text-align: center; margin-bottom: 0.65rem;">
              <div style="font-size: 1.25rem; font-weight: 800; color: #059669;">
                TIẾT KIỆM ${formatVND(deal.saving)} (-${deal.percent}%)
              </div>
              <div style="font-size: 0.75rem; color: ${C.textSub}; margin-top: 0.2rem;">
                Gốc: <span style="text-decoration: line-through;">${formatVND(deal.original_price)}</span> ➔ Còn: <strong style="color:${C.textMain};">${formatVND(deal.discount_price)}</strong>
              </div>
            </div>

            <div style="background: ${isLight ? '#F8FAFC' : 'rgba(255,255,255,0.03)'}; border: 1px dashed ${C.border}; border-radius: 8px; padding: 0.55rem 0.75rem; font-size: 0.74rem; color: ${C.textSub}; line-height: 1.45;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.2rem;">
                <span>🎟️ <strong>Điều kiện:</strong></span>
                <span style="color: #0284C7; font-weight: 700; font-size: 0.72rem;">${escapeHTML(deal.destination_label)}</span>
              </div>
              ${escapeHTML(deal.terms)}
            </div>
          </div>

          <button data-action="hunt-keo" data-id="${deal.deal_id}" data-code="${deal.code}" data-link="${deal.link}" data-saving="${deal.saving}" style="width: 100%; min-height: 48px; background: linear-gradient(135deg, #10B981, #059669); color: #FFF; border-radius: 12px; font-weight: 800; font-size: 0.88rem; border: none; cursor: pointer; box-shadow: 0 4px 14px rgba(16,185,129,0.3); display: flex; align-items: center; justify-content: center; gap: 0.4rem;">
            <span>🔥 SĂN ${escapeHTML(deal.brand_short)} (-${formatVND(deal.saving)})</span>
            <span>➔</span>
          </button>
        </div>
      </div>
    `;
  }

  // 9. EVENT DELEGATION
  document.body.addEventListener('click', function (e) {
    initAudio();
    const btn = e.target.closest('[data-action]');
    if (!btn) return;

    const act = btn.getAttribute('data-action');
    playSound('click');
    triggerHaptic('light');

    if (act === 'hunt-keo') {
      const id = btn.getAttribute('data-id');
      const code = btn.getAttribute('data-code') || '';
      const link = btn.getAttribute('data-link') || '#';
      const deal = State.deals.find(d => d.deal_id === id);

      console.log(`[P5.10-Memory-Telemetry] CTA_CLICK: deal_id=${id}, day=${State.activeDay}, cat=${State.activeCategoryPref}`);

      if (navigator.clipboard) {
        navigator.clipboard.writeText(code).then(() => {
          playSound('copy-success');
          triggerHaptic('success');
          fireConfetti();
          setTimeout(() => { window.open(link, '_blank', 'noopener,noreferrer'); }, 500);
          State.pendingOutcomeDeal = deal;
          renderApp();
        });
      }
    } else if (act === 'set-calendar-day') {
      State.activeDay = btn.getAttribute('data-day');
      console.log(`[P5.10-Memory] DAY_SELECTED: ${State.activeDay}`);
      renderApp();
    } else if (act === 'set-category-pref') {
      State.activeCategoryPref = btn.getAttribute('data-cat');
      console.log(`[P5.10-Memory] CATEGORY_PREF_SELECTED: ${State.activeCategoryPref}`);
      renderApp();
    } else if (act === 'toggle-deal-now') {
      State.dealNowMode = !State.dealNowMode;
      triggerHaptic('medium');
      renderApp();
    } else if (act === 'toggle-theme') {
      State.theme = State.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('jayt_theme', State.theme);
      renderApp();
    } else if (act === 'open-wallet-modal') {
      State.activeTab = 'wallet';
      renderApp();
    } else if (act === 'close-wallet-modal') {
      State.activeTab = 'home';
      renderApp();
    }
  });

  document.body.addEventListener('input', function (e) {
    if (e.target.id === 'calcDrink') { State.calcDrink = parseInt(e.target.value, 10); renderApp(); }
    else if (e.target.id === 'calcMeal') { State.calcMeal = parseInt(e.target.value, 10); renderApp(); }
    else if (e.target.id === 'calcRide') { State.calcRide = parseInt(e.target.value, 10); renderApp(); }
  });

  // 10. BOOTSTRAP
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderApp);
  } else {
    renderApp();
  }

})();
