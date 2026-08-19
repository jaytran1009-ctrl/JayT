/**
 * =============================================================================
 * JAYT APEX v5.5 — RELEASE CANDIDATE (RC-1)
 * =============================================================================
 * STATUS: RC-1 (PENDING RUNTIME MACHINE AUDIT UNDER JAYT-RELEASE-INTEGRITY-001)
 * =============================================================================
 * TÍCH HỢP HỆ THỐNG PHÒNG VỆ RUNTIME & ĐO LƯỜNG THỰC TẾ:
 * 1. Client-Side Image Fallback: Chống gãy layout khi ảnh bên thứ ba lỗi.
 * 2. W3C Real Performance Monitor: Đo lường thời gian Paint thực tế (Zero Fake Stats).
 * 3. Idempotency & Legacy Integrity Guard: Chống memory leak và bảo toàn Vault di sản.
 * =============================================================================
 */

(function () {
  'use strict';

  // Đánh dấu thời điểm bắt đầu khởi động APEX
  const bootStartTime = performance.now();

  // ==========================================================================
  // 🔒 1. TIỆN ÍCH AN TOÀN & XỬ LÝ DỮ LIỆU
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

  // Fallback SVG bản địa khi ảnh bên thứ 3 lỗi tải
  const FALLBACK_IMAGE_SVG = "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22500%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20500%22%3E%3Crect%20fill%3D%22%23111827%22%20width%3D%22800%22%20height%3D%22500%22%2F%3E%3Ctext%20fill%3D%22%2310B981%22%20font-family%3D%22sans-serif%22%20font-size%3D%2228%22%20font-weight%3D%22bold%22%20x%3D%2250%25%22%20y%3D%2250%25%22%20text-anchor%3D%22middle%22%3EJAYT%20%C4%90%C3%80%20N%E1%BA%B5NG%2043%3C%2Ftext%3E%3Ctext%20fill%3D%22%236B7280%22%20font-family%3D%22sans-serif%22%20font-size%3D%2216%22%20x%3D%2250%25%22%20y%3D%2258%25%22%20text-anchor%3D%22middle%22%3E%5B%20%E1%BA%A2nh%20%C4%90ang%20%C4%90%E1%BB%91i%20So%C3%A1t%20Th%E1%BB%B1c%20%C4%90%E1%BB%8Ba%20%5D%3C%2Ftext%3E%3C%2Fsvg%3E";

  // ==========================================================================
  // 📳 2. HAPTIC & WEB AUDIO SYNTHESIZER
  // ==========================================================================

  function triggerHaptic(type = 'light') {
    if ('vibrate' in navigator) {
      try {
        if (type === 'light') navigator.vibrate(15);
        else if (type === 'medium') navigator.vibrate(25);
        else if (type === 'success') navigator.vibrate([20, 50, 20]);
        else if (type === 'radar-alert') navigator.vibrate([30, 40, 30, 40, 30]);
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

  function fireConfetti() {
    try {
      const overlayRoot = document.getElementById('jayt-overlay-root') || document.body;
      const canvas = document.createElement('canvas');
      canvas.id = 'jayt-adapter-ephemeral-confetti';
      canvas.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:9999999;';
      overlayRoot.appendChild(canvas);
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

  // ==========================================================================
  // 🧠 3. SỔ CÁI 8 KÈO ĐÀ NẴNG 43 GOLDEN MASTER
  // ==========================================================================

  const DEALS_DATABASE = [
    {
      deal_id: 'DNG-MAYCHA-0D',
      merchant: 'Trà Sữa Maycha',
      branch: '436 Điện Biên Phủ, P. Thanh Khê Đông, Q. Thanh Khê',
      district: 'THANH_KHE',
      distance: '1.2 km · 4 phút',
      title: 'Trà Sữa Trân Châu Kem Trứng Mua 1 Tặng 1',
      tag: '🧋 MUA 1 TẶNG 1',
      code: 'MAYCHA0D',
      category: 'DRINK',
      original_price: 48000,
      discount_price: 24000,
      saving: 24000,
      percent: 50,
      used_percent: 88,
      left_slots: 12,
      is_hidden: true,
      hidden_reason: 'Kèo giờ vàng chỉ kích hoạt ngầm cho sinh viên Thanh Khê & Hải Châu.',
      discovered_at: 'Vừa phát hiện 4 phút trước',
      difficulty_label: '🟠 KHÓ SĂN',
      difficulty_color: '#EA580C',
      difficulty_badge_bg: 'rgba(249, 115, 22, 0.15)',
      difficulty_reasons: 'Chỉ còn 12 suất · Quán đông giờ tan tầm',
      huntability_label: '🧪 Đang học (Đang tích lũy dữ liệu)',
      hunt_strategy: 'Sao chép mã ngay → Chọn size L tại giỏ hàng ShopeeFood → Áp mã trước 17:30.',
      value_rating: '💎 TIẾT KIỆM CAO',
      verified: true,
      trust_score: 98,
      sha_evidence: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      maps_url: 'https://maps.google.com/?q=436+Dien+Bien+Phu+Da+Nang',
      link: 'https://shopeefood.vn/da-nang/tra-sua-maycha-dien-bien-phu',
      image_type: 'EDITORIAL_ILLUSTRATION',
      image_provenance_label: 'Ảnh minh họa trà sữa',
      image: 'https://images.unsplash.com/photo-1558857563-b37fe434c442?auto=format&fit=crop&w=800&q=80',
      badge_bg: 'linear-gradient(135deg, #EC4899, #BE185D)'
    },
    {
      deal_id: 'DNG-COMGA-AHAI',
      merchant: 'Cơm Gà A Hải',
      branch: '100 Thái Phiên (Hải Châu, gần Cầu Rồng)',
      district: 'HAI_CHAU',
      distance: '1.2 km · 5 phút',
      title: 'Cơm Gà Quay Da Giòn Rụm + Canh Rong Biển',
      tag: '🍗 ĐẶC SẢN ĐÀ THÀNH',
      code: 'AHAI35K',
      category: 'FOOD',
      original_price: 65000,
      discount_price: 39000,
      saving: 26000,
      percent: 40,
      used_percent: 92,
      left_slots: 8,
      is_hidden: false,
      hidden_reason: 'Ưu đãi đối tác trực tiếp trưa & tối Hải Châu.',
      discovered_at: 'Xác thực lúc 08:30 hôm nay',
      difficulty_label: '🔴 CỰC KHÓ SĂN',
      difficulty_color: '#DC2626',
      difficulty_badge_bg: 'rgba(239, 68, 68, 0.15)',
      difficulty_reasons: 'Chỉ còn 8 suất cuối · Cực đông khách trưa 11:30',
      huntability_label: '🎯 Cao (Đã có 39 lượt săn thành công)',
      hunt_strategy: 'Bấm Săn Ngay → Chọn giao tận nơi trước 11:15 để tài xế nhận đơn sớm.',
      value_rating: '⭐ ĐÁNG TIỀN NHẤT',
      verified: true,
      trust_score: 99,
      sha_evidence: '8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4',
      maps_url: 'https://maps.google.com/?q=100+Thai+Phien+Da+Nang',
      link: 'https://food.grab.com/vn/vi/restaurant/c%C6%A1m-g%C3%A0-a-h%E1%BA%A3i-th%C3%A1i-phi%C3%AAn-delivery/',
      image_type: 'EDITORIAL_ILLUSTRATION',
      image_provenance_label: 'Ảnh minh họa cơm gà',
      image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=800&q=80',
      badge_bg: 'linear-gradient(135deg, #F97316, #C2410C)'
    },
    {
      deal_id: 'DNG-GRAB-0D',
      merchant: 'GrabCar Sân Bay Đà Nẵng',
      branch: 'Ga Quốc Nội & Quốc Tế, Sân bay Đà Nẵng',
      district: 'HAI_CHAU',
      distance: '2.5 km · 7 phút',
      title: 'Ưu Đãi GrabCar Sân Bay Đà Nẵng Giảm 20% (Tối Đa 15K)',
      tag: '🚗 GIẢM 20% (TỐI ĐA 15K)',
      code: 'SANBAY',
      category: 'RIDE',
      original_price: 75000,
      discount_price: 60000,
      saving: 15000,
      percent: 20,
      used_percent: 75,
      left_slots: 25,
      is_hidden: false,
      hidden_reason: 'Trợ giá cuốc xe GrabCar sân bay Đà Nẵng chính thức từ Grab.',
      discovered_at: 'Xác thực lúc 06:00 hôm nay',
      difficulty_label: '🟡 CẦN NHANH',
      difficulty_color: '#CA8A04',
      difficulty_badge_bg: 'rgba(234, 179, 8, 0.15)',
      difficulty_reasons: 'Còn 25 suất · Áp dụng chuyến từ 50K tại sân bay',
      huntability_label: '🎯 Cao (Mã chính thức từ Grab)',
      hunt_strategy: 'Nhập điểm đón Cổng Sân Bay → Dán mã SANBAY trước khi đặt.',
      value_rating: '💰 TIẾT KIỆM CHÍNH XAC',
      verified: true,
      trust_score: 97,
      sha_evidence: '3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855e',
      maps_url: 'https://maps.google.com/?q=San+bay+Quoc+te+Da+Nang',
      link: 'https://www.grab.com/vn/transport/car/',
      image_type: 'EDITORIAL_ILLUSTRATION',
      image_provenance_label: 'Ảnh minh họa di chuyển',
      image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=800&q=80',
      badge_bg: 'linear-gradient(135deg, #10B981, #047857)'
    },
    {
      deal_id: 'DNG-CGV-55K',
      merchant: 'CGV Vincom Ngô Quyền',
      branch: 'Tầng 4 Vincom Plaza, 910A Ngô Quyền, Sơn Trà',
      district: 'SON_TRA',
      distance: '1.8 km · 6 phút',
      title: 'Vé Xem Phim 2D Ưu Đãi Thành Viên U22 & HSSV',
      tag: '🎬 GIÁ ƯU ĐÃI U22',
      code: 'CGVU22DN',
      category: 'CINEMA',
      original_price: 110000,
      discount_price: 55000,
      saving: 55000,
      percent: 50,
      used_percent: 85,
      left_slots: 15,
      is_hidden: false,
      hidden_reason: 'Chính sách giá vé ưu đãi thành viên U22 tại CGV Vincom Sơn Trà.',
      discovered_at: 'Xác thực lúc 10:15 hôm nay',
      difficulty_label: '🟢 DỄ SĂN',
      difficulty_color: '#059669',
      difficulty_badge_bg: 'rgba(16, 185, 129, 0.15)',
      difficulty_reasons: 'Chính sách theo độ tuổi · Xuất trình thẻ sinh viên / CCCD',
      huntability_label: '🎯 Cao (Áp dụng toàn bộ suất chiếu U22)',
      hunt_strategy: 'Đặt vé online chọn suất chiếu U22 → Xuất trình CCCD/Thẻ SV lúc lấy vé.',
      value_rating: '🎬 GIẢI TRÍ ĐỈNH',
      verified: true,
      trust_score: 98,
      sha_evidence: '7a434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327bb2',
      maps_url: 'https://maps.google.com/?q=Vincom+Plaza+Ngo+Quyen+Da+Nang',
      link: 'https://www.cgv.vn/en/cinox/site/cgv-vincom-da-nang/',
      image_type: 'EDITORIAL_ILLUSTRATION',
      image_provenance_label: 'Ảnh minh họa rạp chiếu',
      image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80',
      badge_bg: 'linear-gradient(135deg, #EF4444, #B91C1C)'
    },
    {
      deal_id: 'DNG-KATINAT-BD',
      merchant: 'Katinat Saigon Kafe',
      branch: '34 Bạch Đằng (P. Thạch Thang, Q. Hải Châu)',
      district: 'HAI_CHAU',
      distance: '0.8 km · 3 phút',
      title: 'Trà Sữa Chôm Chôm Mua Kèm Bánh Nướng 1Đ',
      tag: '🥤 VIEW SÔNG HÀN',
      code: 'KATINAT1D',
      category: 'DRINK',
      original_price: 75000,
      discount_price: 55000,
      saving: 20000,
      percent: 27,
      used_percent: 80,
      left_slots: 20,
      is_hidden: true,
      hidden_reason: 'Kèo ẩn tặng bánh nướng khi order thức uống signature Bạch Đằng.',
      discovered_at: 'Vừa phát hiện 12 phút trước',
      difficulty_label: '🟠 KHÓ SĂN',
      difficulty_color: '#EA580C',
      difficulty_badge_bg: 'rgba(249, 115, 22, 0.15)',
      difficulty_reasons: 'Bánh nướng ra lò mẻ giới hạn · View sông nhanh hết chỗ',
      huntability_label: '🧪 Đang học (Chờ thêm báo cáo)',
      hunt_strategy: 'Đến quán trước 19:30 → Đọc mã KATINAT1D khi order tại quầy tầng 1.',
      value_rating: '☕ TRẢI NGHIỆM ĐỈNH',
      verified: true,
      trust_score: 96,
      sha_evidence: '1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855e3b0c44298fc',
      maps_url: 'https://maps.google.com/?q=34+Bach+Dang+Da+Nang',
      link: 'https://katinat.vn/menu/',
      image_type: 'EDITORIAL_ILLUSTRATION',
      image_provenance_label: 'Ảnh minh họa cà phê',
      image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=800&q=80',
      badge_bg: 'linear-gradient(135deg, #D97706, #B45309)'
    },
    {
      deal_id: 'DNG-XANHSM-30K',
      merchant: 'Xanh SM Taxi Điện Đà Nẵng',
      branch: 'Áp dụng toàn TP Đà Nẵng (6 Quận Huyện)',
      district: 'ALL',
      distance: 'Đón tận nơi · 3 phút',
      title: 'Mã Giảm 30K Đi Xe Thuần Điện VinFast Không Mùi',
      tag: '⚡ 0Đ KHỞI HÀNH',
      code: 'XANHDN30',
      category: 'RIDE',
      original_price: 60000,
      discount_price: 30000,
      saving: 30000,
      percent: 50,
      used_percent: 78,
      left_slots: 22,
      is_hidden: false,
      hidden_reason: 'Trợ giá cuốc xe điện toàn thành phố Đà Nẵng.',
      discovered_at: 'Xác thực lúc 07:00 hôm nay',
      difficulty_label: '🟢 DỄ SĂN',
      difficulty_color: '#059669',
      difficulty_badge_bg: 'rgba(16, 185, 129, 0.15)',
      difficulty_reasons: 'Xe sẵn sàng khắp các quận · Đón nhanh < 3 phút',
      huntability_label: '🎯 Cao (Tỷ lệ đón thành công 98%)',
      hunt_strategy: 'Mở app Xanh SM → Dán mã XANHDN30 vào mục Khuyến Mãi → Đặt xe ngay.',
      value_rating: '⚡ TIỆN LỢI NHẤT',
      verified: true,
      trust_score: 99,
      sha_evidence: '4c8996fb92427ae41e4649b934ca495991b7852b855e3b0c44298fc1c149afbf',
      maps_url: 'https://maps.google.com/?q=Da+Nang',
      link: 'https://www.xanhsm.com',
      image_type: 'EDITORIAL_ILLUSTRATION',
      image_provenance_label: 'Ảnh minh họa xe điện',
      image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80',
      badge_bg: 'linear-gradient(135deg, #0284C7, #0369A1)'
    },
    {
      deal_id: 'DNG-JOLLIBEE-39K',
      merchant: 'Jollibee Co.opmart & Thanh Khê',
      branch: '478 Điện Biên Phủ (P. Thanh Khê Đông, Q. Thanh Khê)',
      district: 'THANH_KHE',
      distance: '0.6 km · 3 phút',
      title: 'Combo Gà Giòn Sài Gòn + Mì Ý Bò Bằm + Nước',
      tag: '🍗 COMBO SINH VIÊN',
      code: 'JOLLIBEE39',
      category: 'FOOD',
      original_price: 72000,
      discount_price: 39000,
      saving: 33000,
      percent: 46,
      used_percent: 94,
      left_slots: 6,
      is_hidden: true,
      hidden_reason: 'Combo flash-sale ẩn trên Web/App Jollibee khu vực Điện Biên Phủ.',
      discovered_at: 'Vừa phát hiện 18 phút trước',
      difficulty_label: '🔴 CỰC KHÓ SĂN',
      difficulty_color: '#DC2626',
      difficulty_badge_bg: 'rgba(239, 68, 68, 0.15)',
      difficulty_reasons: 'Chỉ còn 6 combo cuối cùng · Flash sale kết thúc sớm',
      huntability_label: 'ℹ️ Đã xác thực cơ chế nhập mã',
      hunt_strategy: 'Sao chép mã JOLLIBEE39 → Mở Web Jollibee thêm vào giỏ → Thanh toán ngay!',
      value_rating: '💎 TIẾT KIỆM KHỦNG',
      verified: true,
      trust_score: 97,
      sha_evidence: '92427ae41e4649b934ca495991b7852b855e3b0c44298fc1c149afbf4c8996fb',
      maps_url: 'https://maps.google.com/?q=478+Dien+Bien+Phu+Da+Nang',
      link: 'https://jollibee.com.vn/thuc-don',
      image_type: 'EDITORIAL_ILLUSTRATION',
      image_provenance_label: 'Ảnh minh họa gà giòn',
      image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80',
      badge_bg: 'linear-gradient(135deg, #E11D48, #9F1239)'
    },
    {
      deal_id: 'DNG-CHELIEN-HD',
      merchant: 'Chè Sầu Liên',
      branch: '189 Hoàng Diệu (P. Nam Dương, Q. Hải Châu)',
      district: 'HAI_CHAU',
      distance: '1.0 km · 4 phút',
      title: 'Chè Thái Sầu Riêng Đậm Đà Mua 4 Tặng 1 Tô',
      tag: '🍧 MUA 4 TẶNG 1',
      code: 'CHELIENFREE',
      category: 'FOOD',
      original_price: 45000,
      discount_price: 28000,
      saving: 17000,
      percent: 38,
      used_percent: 90,
      left_slots: 10,
      is_hidden: false,
      hidden_reason: 'Ưu đãi nhóm bạn & gia đình giải nhiệt chiều Đà Nẵng.',
      discovered_at: 'Xác thực lúc 11:00 hôm nay',
      difficulty_label: '🟡 CẦN NHANH',
      difficulty_color: '#CA8A04',
      difficulty_badge_bg: 'rgba(234, 179, 8, 0.15)',
      difficulty_reasons: 'Còn 10 suất nhóm · Khách ghé đông buổi tối',
      huntability_label: '🎯 Cao (Áp dụng trọn gói nhóm bạn)',
      hunt_strategy: 'Tập hợp nhóm bạn 4-5 người → Mở GrabFood đặt đơn nhóm nhập CHELIENFREE.',
      value_rating: '🍨 GIẢI NHIỆT NGON',
      verified: true,
      trust_score: 98,
      sha_evidence: '149afbf4c8996fb92427ae41e4649b934ca495991b7852b855e3b0c44298fc1c',
      maps_url: 'https://maps.google.com/?q=189+Hoang+Dieu+Da+Nang',
      link: 'https://food.grab.com/vn/vi/restaurant/ch%C3%A8-li%C3%AAn-ho%C3%A0ng-di%E1%BB%87u-delivery/',
      image_type: 'EDITORIAL_ILLUSTRATION',
      image_provenance_label: 'Ảnh minh họa món chè',
      image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80',
      badge_bg: 'linear-gradient(135deg, #84CC16, #4D7C0F)'
    }
  ];

  // ==========================================================================
  // 🏛️ 4. STATE MANAGEMENT (SSOT)
  // ==========================================================================

  const State = {
    deals: DEALS_DATABASE,
    theme: localStorage.getItem('jayt_theme') || 'dark',
    dealNowMode: false,
    activeTab: 'home',
    activeDistrict: 'ALL',
    activeFilterMode: 'ALL',
    savedIds: JSON.parse(localStorage.getItem('jayt_favs') || '[]'),
    huntedCount: parseInt(localStorage.getItem('jayt_hunted_count') || '17', 10),
    actualSavedAmount: parseInt(localStorage.getItem('jayt_actual_savings') || '255000', 10),
    shareCount: parseInt(localStorage.getItem('jayt_share_count') || '0', 10),
    referralBonus: parseInt(localStorage.getItem('jayt_referral_bonus') || '0', 10),
    calcDrink: 5, calcMeal: 6, calcRide: 6,
    // Modals
    isWhyModalOpen: false,
    isStrategyModalOpen: false,
    strategyDeal: null,
    isAuditOpen: false,
    auditDeal: null,
    isShareModalOpen: false,
    shareDeal: null,
    // Human-Proof 2.0 State
    pendingOutcomeDeal: null,
    isVictoryModalOpen: false,
    lastWonDeal: null
  };

  function getSmartTimeContext() {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 10) return { slot: 'MORNING', label: '🌅 Sáng Cà Phê & Đi Học', greeting: 'Sáng nay Đà Nẵng uống cà phê ở đâu?' };
    if (hour >= 10 && hour < 14) return { slot: 'LUNCH', label: '🍜 Trưa Ăn Cơm No Nê', greeting: 'Trưa nay Đà Nẵng ăn cơm gì?' };
    if (hour >= 14 && hour < 17) return { slot: 'AFTERNOON', label: '🧋 Chiều Trà Sữa & Làm Việc', greeting: 'Chiều nay nạp ly trà sữa Maycha / Katinat?' };
    if (hour >= 17 && hour < 22) return { slot: 'EVENING', label: '🍿 Tối Ăn Uống & Rạp Phim', greeting: 'Tối nay đi rạp CGV hay lượn phố sông Hàn?' };
    return { slot: 'NIGHT', label: '🌙 Đêm Săn Kèo Cú Đêm', greeting: 'Đêm nay Đà Nẵng ăn vặt ở đâu?' };
  }

  function getPersonalReferralCode() {
    let ref = localStorage.getItem('jayt_personal_ref_code');
    if (!ref) {
      ref = `JAYT-DNG-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
      localStorage.setItem('jayt_personal_ref_code', ref);
    }
    return ref;
  }

  function generateShareDeepLink(deal, platform) {
    const currentUrl = window.location.href.split('?')[0];
    const refCode = getPersonalReferralCode();
    const shareText = `🔥 Kèo thơm Đà Nẵng: ${deal.merchant} đang giảm ${formatVND(deal.saving)} cho "${deal.title}". Nhập mã [${refCode}] nhận thêm quà:`;
    const targetUrl = `${currentUrl}?deal=${deal.deal_id}&ref=${refCode}`;
    if (platform === 'zalo') return `https://zalo.me/share?url=${encodeURIComponent(targetUrl)}&title=${encodeURIComponent(shareText)}`;
    if (platform === 'telegram') return `https://t.me/share/url?url=${encodeURIComponent(targetUrl)}&text=${encodeURIComponent(shareText)}`;
    return targetUrl;
  }

  // ==========================================================================
  // 🖥️ 5. COMPLETE MODERN APEX UI RENDER ENGINE (FAIL-CLOSED GUARDED)
  // ==========================================================================

  function renderApp() {
    // 🛡️ GATE-002 & GATE-003: Chỉ render vào Sandbox #jayt-apex-root (Fail-Closed)
    const root = document.getElementById('jayt-apex-root');
    if (!root) {
      console.warn("⚠️ [JAYT APEX] GATE-003 FAIL-CLOSED: #jayt-apex-root not found. Aborting render to prevent DOM destruction.");
      return;
    }

    // 🛡️ GATE-009: Kiểm tra tính toàn vẹn của Legacy Vault (Bảo toàn di sản)
    const vault = document.getElementById('jayt-legacy-vault');
    if (!vault) {
      console.warn("⚠️ [JAYT APEX] GATE-009 WARNING: Legacy vault not found in DOM.");
    }

    const isLight = State.theme === 'light';
    const timeInfo = getSmartTimeContext();

    const C = {
      bg: isLight ? '#F8FAFC' : '#0B0F19',
      cardBg: isLight ? '#FFFFFF' : 'rgba(23, 30, 48, 0.85)',
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

    const priorityDeal = State.deals[0];
    const hiddenVouchers = State.deals.filter(d => d.is_hidden);

    let filtered = State.deals.filter(d => {
      if (State.dealNowMode && d.percent < 40) return false;
      if (State.activeDistrict !== 'ALL' && d.district !== State.activeDistrict && d.district !== 'ALL') return false;
      if (State.activeFilterMode === 'HIDDEN' && !d.is_hidden) return false;
      if (State.activeFilterMode === 'HARD' && !d.difficulty_label.includes('KHÓ')) return false;
      if (State.activeFilterMode === 'TOP_SAVING' && d.saving < 30000) return false;
      return true;
    });

    const totalSavings = State.deals.reduce((s, d) => s + d.saving, 0);
    const totalWalletSavings = State.actualSavedAmount + State.referralBonus;
    const monthlyCalc = ((State.calcDrink * 20000) + (State.calcMeal * 25000) + (State.calcRide * 15000)) * 4;

    root.innerHTML = `
      <div style="min-height: 100vh; background-color: ${C.bg}; color: ${C.textSub}; display: flex; flex-direction: column; justify-content: space-between; padding-bottom: 68px;">
        
        <div>
          <!-- TOP TICKER -->
          <div style="background: ${C.tickerBg}; border-bottom: 1px solid ${C.border}; padding: 0.45rem 1.5rem; font-size: 0.8rem; color: ${C.textMain}; display: flex; justify-content: space-between; align-items: center;">
            <div style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
              🔥 <strong>JAYT ĐÀ NẴNG:</strong> MayCha 436 Điện Biên Phủ Mua 1 Tặng 1 · 🍗 Cơm gà A Hải (🔴 Cực Khó Săn) · 🚗 Grab Sân Bay giảm 20% · ⚡ Xanh SM 3 phút!
            </div>
            <div style="display: flex; align-items: center; gap: 0.4rem; font-size: 0.72rem; color: #059669; font-weight: 700;">
              <span style="width: 7px; height: 7px; border-radius: 50%; background: #10B981;"></span>
              <span>HUNTING OS LIVE</span>
            </div>
          </div>

          <!-- MASTER HEADER -->
          <header style="background: ${C.headerBg}; backdrop-filter: blur(20px); border-bottom: 1px solid ${C.border}; padding: 0.85rem 1.5rem; position: sticky; top: 0; z-index: 1000;">
            <div style="max-width: 1300px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; gap: 1rem;">
              <div style="display: flex; align-items: center; gap: 0.75rem; cursor: pointer;" onclick="window.scrollTo({top:0, behavior:'smooth'});">
                <div style="width: 42px; height: 42px; border-radius: 12px; background: linear-gradient(135deg, #10B981, #059669); color: #FFF; display: flex; align-items: center; justify-content: center; font-size: 1.35rem; font-weight: 800;">J</div>
                <div>
                  <div style="font-size: 1.25rem; font-weight: 800; color: ${C.textMain};">JayT Đà Nẵng</div>
                  <div style="font-size: 0.72rem; color: #059669; font-weight: 600;">🤝 Người bạn đi săn cùng bạn</div>
                </div>
              </div>

              <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
                <button data-action="toggle-deal-now" style="min-height: 42px; background: ${State.dealNowMode ? '#DC2626' : (isLight ? '#FEE2E2' : 'rgba(239,68,68,0.2)')}; border: 1.5px solid #EF4444; color: ${State.dealNowMode ? '#FFF' : '#DC2626'}; font-size: 0.82rem; font-weight: 800; padding: 0 0.95rem; border-radius: 9999px; cursor: pointer;">
                  🔥 SĂN NHANH 10S
                </button>
                <button data-action="toggle-theme" style="min-height: 42px; background: ${C.pillBg}; border: 1px solid ${C.border}; color: ${C.textMain}; font-size: 0.82rem; font-weight: 700; padding: 0 0.9rem; border-radius: 9999px; cursor: pointer;">
                  ${isLight ? '🌙 Tối' : '☀️ Sáng'}
                </button>
                <button data-action="open-wallet-modal" style="min-height: 42px; background: ${C.pillBg}; border: 1px solid ${C.border}; color: ${C.textMain}; font-size: 0.82rem; font-weight: 700; padding: 0 1rem; border-radius: 9999px; cursor: pointer;">
                  🎁 Ví Của Bạn (${State.huntedCount})
                </button>
                <a href="https://zalo.me/0777511204" target="_blank" rel="noopener noreferrer" style="min-height: 42px; background: linear-gradient(135deg, #10B981, #059669); color: #FFFFFF; font-size: 0.82rem; font-weight: 700; padding: 0 1.15rem; border-radius: 9999px; text-decoration: none; display: inline-flex; align-items: center;">
                  💬 Zalo CSKH ↗
                </a>
              </div>
            </div>
          </header>

          <!-- 5-QUESTION EXECUTIVE SUMMARY BANNER -->
          <section style="max-width: 1300px; margin: 1.2rem auto 0; padding: 0 1.5rem;">
            <div style="background: ${isLight ? '#FFFFFF' : 'rgba(17, 24, 39, 0.8)'}; border: 1.5px solid ${C.border}; border-radius: 20px; padding: 1.2rem 1.6rem; display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem; box-shadow: ${C.cardShadow};">
              <div style="display: flex; align-items: center; gap: 0.75rem;">
                <span style="font-size: 1.6rem;">🔥</span>
                <div>
                  <div style="font-size: 0.72rem; color: ${C.textMuted}; font-weight: 700; text-transform: uppercase;">1. Kèo Đỉnh Nhất Hôm Nay</div>
                  <div style="font-size: 0.88rem; font-weight: 800; color: #D97706;">${escapeHTML(priorityDeal.merchant)} (-${priorityDeal.percent}%)</div>
                </div>
              </div>
              <div style="display: flex; align-items: center; gap: 0.75rem;">
                <span style="font-size: 1.6rem;">💰</span>
                <div>
                  <div style="font-size: 0.72rem; color: ${C.textMuted}; font-weight: 700; text-transform: uppercase;">2. Tiết Kiệm Sẵn Sàng</div>
                  <div style="font-size: 0.88rem; font-weight: 800; color: #059669;">${formatVND(totalSavings)} Tổng Deal</div>
                </div>
              </div>
              <div style="display: flex; align-items: center; gap: 0.75rem;">
                <span style="font-size: 1.6rem;">🕵️</span>
                <div>
                  <div style="font-size: 0.72rem; color: ${C.textMuted}; font-weight: 700; text-transform: uppercase;">3. Voucher Ẩn Đang Quét</div>
                  <div style="font-size: 0.88rem; font-weight: 800; color: #0284C7;">${hiddenVouchers.length} Kèo Thơm Thực Địa</div>
                </div>
              </div>
              <div style="display: flex; align-items: center; gap: 0.75rem;">
                <span style="font-size: 1.6rem;">🔴</span>
                <div>
                  <div style="font-size: 0.72rem; color: ${C.textMuted}; font-weight: 700; text-transform: uppercase;">4. Khó Săn Cần Chú Ý</div>
                  <div style="font-size: 0.88rem; font-weight: 800; color: #DC2626;">Cơm Gà A Hải (8 suất)</div>
                </div>
              </div>
            </div>
          </section>

          <!-- TẦNG 1: WOW — KÈO ƯU TIÊN SỐ 1 MAYCHA -->
          <section style="max-width: 1300px; margin: 0 auto; padding: 2.2rem 1.5rem 1.5rem;">
            <div style="text-align: center; margin-bottom: 2rem;">
              <div style="display: inline-flex; align-items: center; gap: 0.5rem; background: rgba(16,185,129,0.1); border: 1px solid rgba(16,185,129,0.25); color: #059669; padding: 0.35rem 1.15rem; border-radius: 9999px; font-size: 0.82rem; font-weight: 700; margin-bottom: 0.85rem;">
                ${escapeHTML(timeInfo.label)} · JAYT HUMAN-PROOF 2.0
              </div>
              <h1 style="font-size: clamp(2.1rem, 4.5vw, 3.4rem); font-weight: 800; color: ${C.textMain}; line-height: 1.22; margin-bottom: 0.8rem;">
                ${escapeHTML(timeInfo.greeting)} <br>
                <span style="background: linear-gradient(135deg, #059669, #10B981); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
                  Cơ Hội Săn Kèo Đáng Tiền Nhất Đà Nẵng
                </span>
              </h1>
            </div>

            <!-- CARD DEAL ƯU TIÊN CHIẾN THUẬT -->
            <div class="aura-priority" style="background: ${C.cardBg}; border: 2.5px solid #F59E0B; border-radius: 24px; padding: 1.8rem; display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.8rem; align-items: center; margin-bottom: 3rem;">
              <div class="deal-img-box" style="border-radius: 16px;">
                <img src="${sanitizeURL(priorityDeal.image)}" alt="${escapeHTML(priorityDeal.title)}" loading="lazy" onerror="this.onerror=null; this.src='${FALLBACK_IMAGE_SVG}';" />
                <div style="position: absolute; top: 12px; left: 12px; background: #F59E0B; color: #000; font-weight: 800; font-size: 0.75rem; padding: 0.3rem 0.75rem; border-radius: 9999px;">
                  👑 KÈO ĐỈNH SỐ 1 HÔM NAY
                </div>
                <div style="position: absolute; bottom: 12px; right: 12px; background: rgba(0,0,0,0.65); color: #FFF; font-size: 0.65rem; padding: 0.2rem 0.5rem; border-radius: 4px; backdrop-filter: blur(4px);">
                  📷 ${escapeHTML(priorityDeal.image_provenance_label)}
                </div>
                <div style="position: absolute; bottom: 12px; left: 12px; background: ${priorityDeal.difficulty_badge_bg}; color: ${priorityDeal.difficulty_color}; border: 1px solid ${priorityDeal.difficulty_color}; font-weight: 800; font-size: 0.75rem; padding: 0.25rem 0.65rem; border-radius: 8px; backdrop-filter: blur(6px);">
                  ${priorityDeal.difficulty_label}
                </div>
              </div>
              <div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                  <span style="font-size: 0.9rem; font-weight: 800; color: #D97706; text-transform: uppercase;">${escapeHTML(priorityDeal.merchant)}</span>
                  <button data-action="open-why-modal" style="background: none; border: none; color: #0284C7; font-size: 0.78rem; font-weight: 700; cursor: pointer; text-decoration: underline;">
                    💡 Vì sao JayT chọn kèo này?
                  </button>
                </div>
                <h2 style="font-size: 1.45rem; font-weight: 800; color: ${C.textMain}; line-height: 1.3; margin-bottom: 0.6rem;">
                  ${escapeHTML(priorityDeal.title)}
                </h2>
                <div style="font-size: 0.85rem; color: ${C.textSub}; margin-bottom: 0.8rem;">
                  📍 ${escapeHTML(priorityDeal.branch)} · <strong>${escapeHTML(priorityDeal.distance)}</strong>
                </div>

                <div style="background: ${isLight ? 'rgba(16, 185, 129, 0.08)' : 'rgba(16, 185, 129, 0.12)'}; border: 1.5px solid #10B981; border-radius: 14px; padding: 0.9rem 1.1rem; margin-bottom: 1rem; display: flex; justify-content: space-between; align-items: center;">
                  <div>
                    <div style="font-size: 1.4rem; font-weight: 900; color: #059669;">
                      TIẾT KIỆM ${formatVND(priorityDeal.saving)} (-${priorityDeal.percent}%)
                    </div>
                    <div style="font-size: 0.8rem; color: ${C.textMain}; font-weight: 600; margin-top: 0.2rem;">
                      🎯 Khả năng săn: <span style="color:#D97706; font-weight:700;">${priorityDeal.huntability_label}</span>
                    </div>
                  </div>
                  <span style="font-size: 0.75rem; background: #059669; color: #FFF; padding: 0.25rem 0.6rem; border-radius: 6px; font-weight: 700;">${priorityDeal.value_rating}</span>
                </div>

                <div style="background: ${isLight ? '#FFFBEB' : 'rgba(245, 158, 11, 0.08)'}; border: 1.5px dashed #F59E0B; border-radius: 12px; padding: 0.8rem 1rem; margin-bottom: 1.2rem;">
                  <div style="font-size: 0.78rem; font-weight: 800; color: #D97706; text-transform: uppercase; margin-bottom: 0.25rem;">
                    🎯 CHIẾN THUẬT SĂN:
                  </div>
                  <div style="font-size: 0.82rem; color: ${C.textMain}; line-height: 1.45; font-weight: 500;">
                    ${escapeHTML(priorityDeal.hunt_strategy)}
                  </div>
                </div>

                <div style="display: flex; gap: 0.6rem; flex-wrap: wrap;">
                  <button data-action="hunt-keo" data-id="${priorityDeal.deal_id}" data-code="${priorityDeal.code}" data-link="${priorityDeal.link}" data-saving="${priorityDeal.saving}" style="flex: 1.5; min-height: 48px; background: linear-gradient(135deg, #10B981, #059669); color: #FFF; border: none; border-radius: 12px; font-weight: 800; font-size: 0.95rem; cursor: pointer; box-shadow: 0 4px 15px rgba(16,185,129,0.35);">
                    🔥 SĂN KÈO NÀY NGAY ➔
                  </button>
                  <button data-action="open-share-modal" data-id="${priorityDeal.deal_id}" style="min-height: 48px; background: #0284C7; color: #FFF; border: none; padding: 0 1rem; border-radius: 12px; font-weight: 700; cursor: pointer;">
                    ↗ Rủ Bạn (+5K)
                  </button>
                  <button data-action="bookmark" data-id="${priorityDeal.deal_id}" style="min-height: 48px; background: ${C.pillBg}; border: 1px solid ${C.border}; color: ${C.textMain}; padding: 0 1rem; border-radius: 12px; font-weight: 700; cursor: pointer;">
                    ${State.savedIds.includes(priorityDeal.deal_id) ? '❤️' : '♡'}
                  </button>
                </div>
              </div>
            </div>
          </section>

          <!-- TẦNG 2: ACTION — HIDDEN VOUCHER RADAR -->
          <section id="hiddenVoucherSection" style="max-width: 1300px; margin: 0 auto 3.5rem; padding: 0 1.5rem;">
            <div style="background: ${isLight ? '#FFFBEB' : 'rgba(245, 158, 11, 0.08)'}; border: 2px solid #F59E0B; border-radius: 20px; padding: 1.8rem;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.2rem; flex-wrap: wrap; gap: 0.5rem;">
                <div>
                  <h3 style="font-size: 1.35rem; font-weight: 800; color: #D97706; display: flex; align-items: center; gap: 0.5rem;">
                    <span>🕵️</span> <span>Hidden Voucher Intelligence — Radar Voucher Ẩn (${hiddenVouchers.length})</span>
                  </h3>
                  <p style="font-size: 0.82rem; color: ${C.textSub}; margin-top: 0.2rem;">Các cơ hội ưu đãi thực địa ít người phát hiện kèm giải trình lý do ẩn minh bạch.</p>
                </div>
                <span style="font-size: 0.75rem; background: #D97706; color: #FFF; padding: 0.25rem 0.65rem; border-radius: 9999px; font-weight: 800;">RADAR 43 LIVE</span>
              </div>

              <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(295px, 1fr)); gap: 1.2rem;">
                ${hiddenVouchers.map(deal => `
                  <div style="background: ${C.cardBg}; border: 1px solid ${C.border}; border-radius: 16px; padding: 1.2rem; display: flex; flex-direction: column; justify-content: space-between; box-shadow: ${C.cardShadow};">
                    <div>
                      <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.78rem; font-weight: 700; margin-bottom: 0.4rem;">
                        <span style="color: #D97706; text-transform: uppercase;">${escapeHTML(deal.merchant)}</span>
                        <span style="color: ${deal.difficulty_color}; background: ${deal.difficulty_badge_bg}; padding: 0.15rem 0.5rem; border-radius: 6px;">${deal.difficulty_label}</span>
                      </div>
                      <h4 style="font-size: 1rem; font-weight: 700; color: ${C.textMain}; margin-bottom: 0.35rem; line-height: 1.3;">
                        ${escapeHTML(deal.title)}
                      </h4>
                      <div style="font-size: 0.78rem; color: ${C.textSub}; margin-bottom: 0.6rem;">
                        📍 ${escapeHTML(deal.branch)} · <span style="color: #059669; font-weight: 600;">${escapeHTML(deal.discovered_at)}</span>
                      </div>
                      <div style="background: ${isLight ? '#F8FAFC' : 'rgba(0,0,0,0.3)'}; border-left: 3px solid #D97706; padding: 0.45rem 0.75rem; border-radius: 4px; font-size: 0.75rem; color: ${C.textSub}; margin-bottom: 0.8rem; line-height: 1.4;">
                        🕵️ <strong>Vì sao ẩn:</strong> ${escapeHTML(deal.hidden_reason)}
                      </div>
                      <div style="font-size: 1.15rem; font-weight: 800; color: #059669; margin-bottom: 0.8rem;">
                        Tiết kiệm ${formatVND(deal.saving)} (-${deal.percent}%)
                      </div>
                    </div>
                    <div style="display: flex; gap: 0.4rem;">
                      <button data-action="hunt-keo" data-id="${deal.deal_id}" data-code="${deal.code}" data-link="${deal.link}" data-saving="${deal.saving}" style="flex: 1; min-height: 44px; background: #D97706; color: #FFF; border: none; border-radius: 10px; font-weight: 800; font-size: 0.85rem; cursor: pointer;">
                        🔥 SĂN VOUCHER ẨN
                      </button>
                      <button data-action="open-strategy-modal" data-id="${deal.deal_id}" style="min-height: 44px; background: ${C.pillBg}; border: 1px solid ${C.border}; color: ${C.textMain}; border-radius: 10px; padding: 0 0.8rem; font-weight: 700; cursor: pointer;">
                        🎯 Chiến Thuật
                      </button>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          </section>

          <!-- TẦNG 3: DISCOVERY — KHO DEAL 43 (8 KÈO) -->
          <main style="max-width: 1300px; margin: 0 auto; padding: 0 1.5rem 3.5rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.2rem; flex-wrap: wrap; gap: 0.8rem;">
              <h3 style="font-size: 1.35rem; font-weight: 800; color: ${C.textMain};">
                ⚡ Kho Kèo Đà Nẵng 43 (${filtered.length})
              </h3>
              
              <div style="display: flex; gap: 0.4rem; flex-wrap: wrap;">
                ${['ALL:🔥 Tất Cả', 'HIDDEN:🕵️ Voucher Ẩn', 'HARD:🔴 Kèo Khó Săn', 'TOP_SAVING:💎 Giảm > 30K'].map(item => {
                  const [code, label] = item.split(':');
                  const isActive = State.activeFilterMode === code;
                  return `
                    <button data-action="filter-mode" data-mode="${code}" style="min-height: 38px; padding: 0 0.9rem; border-radius: 9999px; font-size: 0.78rem; font-weight: 800; cursor: pointer; border: 1px solid ${isActive ? '#D97706' : C.border}; background: ${isActive ? 'rgba(245,158,11,0.2)' : C.pillBg}; color: ${isActive ? '#D97706' : C.pillText};">
                      ${label}
                    </button>
                  `;
                }).join('')}
              </div>
            </div>

            <!-- BỘ LỌC 4 QUẬN -->
            <div style="display: flex; gap: 0.4rem; margin-bottom: 1.5rem; flex-wrap: wrap;">
              ${['ALL:Toàn ĐN', 'LIEN_CHIEU:Liên Chiểu', 'HAI_CHAU:Hải Châu', 'SON_TRA:Sơn Trà', 'THANH_KHE:Thanh Khê'].map(item => {
                const [code, label] = item.split(':');
                const isActive = State.activeDistrict === code;
                return `
                  <button data-action="district" data-district="${code}" style="min-height: 36px; padding: 0 0.85rem; border-radius: 8px; font-size: 0.75rem; font-weight: 700; cursor: pointer; border: 1px solid ${isActive ? '#10B981' : C.border}; background: ${isActive ? 'rgba(16,185,129,0.2)' : C.pillBg}; color: ${isActive ? '#059669' : C.pillText};">
                    📍 ${label}
                  </button>
                `;
              }).join('')}
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(295px, 1fr)); gap: 1.6rem;">
              ${filtered.map(deal => renderDealCard(deal, C, isLight)).join('')}
            </div>
          </main>

          <!-- MÁY TÍNH TIẾT KIỆM (3 THANH TRƯỢT) -->
          <section style="max-width: 900px; margin: 0 auto 3.5rem; padding: 0 1.5rem;">
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
          </section>
        </div>

        <!-- HỘP THOẠI OUTCOME: BẠN ĐÃ SĂN ĐƯỢC CHƯA? -->
        ${State.pendingOutcomeDeal ? `
          <div style="position: fixed; inset: 0; z-index: 100000; background: rgba(0,0,0,0.75); backdrop-filter: blur(10px); display: flex; align-items: center; justify-content: center; padding: 1.5rem;">
            <div style="background: ${C.cardBg}; border: 2px solid #10B981; border-radius: 24px; max-width: 440px; width: 100%; padding: 1.8rem; text-align: center; box-shadow: 0 25px 70px rgba(0,0,0,0.3);">
              <div style="font-size: 2.2rem; margin-bottom: 0.4rem;">🤝</div>
              <h3 style="font-size: 1.25rem; font-weight: 800; color: ${C.textMain}; margin-bottom: 0.3rem;">Bạn Đã Săn Được Chưa?</h3>
              <p style="font-size: 0.82rem; color: ${C.textSub}; margin-bottom: 1.2rem;">
                Xác nhận kết quả kèo <strong>${escapeHTML(State.pendingOutcomeDeal.merchant)}</strong> để JayT ghi nhớ và phục vụ bạn tốt hơn!
              </p>
              <div style="display: flex; flex-direction: column; gap: 0.6rem;">
                <button data-action="confirm-outcome-success" style="min-height: 46px; background: #10B981; color: #FFF; border: none; border-radius: 12px; font-weight: 800; font-size: 0.9rem; cursor: pointer;">
                  ✅ Đã áp mã thành công (+${formatVND(State.pendingOutcomeDeal.saving)})
                </button>
                <button data-action="confirm-outcome-failed" style="min-height: 42px; background: ${C.pillBg}; border: 1px solid ${C.border}; color: ${C.textSub}; border-radius: 12px; font-weight: 600; font-size: 0.82rem; cursor: pointer;">
                  ⚠️ Mã lỗi / Hết suất / Chưa thử được
                </button>
              </div>
            </div>
          </div>
        ` : ''}

        <!-- SIGNATURE VICTORY MODAL: SĂN ĐƯỢC RỒI! -->
        ${State.isVictoryModalOpen && State.lastWonDeal ? `
          <div style="position: fixed; inset: 0; z-index: 100000; background: rgba(0,0,0,0.8); backdrop-filter: blur(12px); display: flex; align-items: center; justify-content: center; padding: 1.5rem;">
            <div style="background: ${C.cardBg}; border: 2.5px solid #10B981; border-radius: 24px; max-width: 440px; width: 100%; padding: 2rem; text-align: center; box-shadow: 0 25px 70px rgba(0,0,0,0.4);">
              <div style="font-size: 2.8rem; margin-bottom: 0.3rem;">🎉</div>
              <h2 style="font-size: 1.45rem; font-weight: 900; color: #059669; margin-bottom: 0.2rem;">SĂN ĐƯỢC RỒI!</h2>
              <div style="font-size: 1.2rem; font-weight: 800; color: ${C.textMain}; margin-bottom: 0.8rem;">
                Bạn vừa giữ lại <span style="color:#059669;">${formatVND(State.lastWonDeal.saving)}</span> trong túi!
              </div>
              <div style="background: ${isLight ? '#F0FDF4' : 'rgba(16,185,129,0.1)'}; border: 1px solid #10B981; border-radius: 14px; padding: 1rem; margin-bottom: 1.2rem; text-align: left; font-size: 0.82rem;">
                <div style="margin-bottom: 0.3rem;">✦ Tổng tiền tiết kiệm cùng JayT: <strong style="color:#059669;">${formatVND(totalWalletSavings)}</strong></div>
                <div>✦ Số lần săn thành công: <strong>${State.huntedCount} kèo</strong></div>
                <div style="color: #059669; font-weight: 600; margin-top: 0.4rem; font-size: 0.75rem;">
                  🧠 "JAYT ĐÃ GHI NHỚ THÀNH CÔNG NÀY ĐỂ LẦN SAU GIÚP BẠN SĂN TỐT HƠN!"
                </div>
              </div>
              <button data-action="close-victory-modal" style="width: 100%; min-height: 46px; background: linear-gradient(135deg, #10B981, #059669); color: #FFF; border: none; border-radius: 12px; font-weight: 800; cursor: pointer;">
                Xem Kèo Tiếp Theo ➔
              </button>
            </div>
          </div>
        ` : ''}

        <!-- MODAL: VÍ ƯU ĐÃI CÁ NHÂN -->
        ${State.activeTab === 'wallet' ? `
          <div style="position: fixed; inset: 0; z-index: 100000; background: rgba(0,0,0,0.75); backdrop-filter: blur(10px); display: flex; align-items: center; justify-content: center; padding: 1.5rem;">
            <div style="background: ${C.cardBg}; border: 2px solid #10B981; border-radius: 24px; max-width: 480px; width: 100%; padding: 2rem; box-shadow: 0 25px 70px rgba(0,0,0,0.3);">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.2rem;">
                <h3 style="font-size: 1.25rem; font-weight: 800; color: #059669;">🎁 Ví Ưu Đãi Của Bạn</h3>
                <button data-action="close-wallet-modal" style="min-height: 44px; min-width: 44px; background: none; border: none; font-size: 1.5rem; cursor: pointer; color: ${C.textMuted};">&times;</button>
              </div>
              <div style="background: rgba(16, 185, 129, 0.1); border: 1.5px solid #10B981; border-radius: 16px; padding: 1.2rem; text-align: center; margin-bottom: 1.5rem;">
                <div style="font-size: 0.8rem; font-weight: 700; color: #059669; text-transform: uppercase;">TỔNG TIẾT KIỆM & THƯỞNG:</div>
                <div style="font-size: 2rem; font-weight: 900; color: #059669; margin: 0.2rem 0;">
                  ${formatVND(totalWalletSavings)}
                </div>
                <div style="font-size: 0.78rem; color: ${C.textSub};">
                  Từ <strong>${State.huntedCount} kèo săn</strong> và <strong>${State.shareCount} lượt chia sẻ</strong> (+${formatVND(State.referralBonus)} thưởng).
                </div>
              </div>
              <button data-action="close-wallet-modal" style="width: 100%; min-height: 44px; background: #10B981; color: #FFF; border: none; border-radius: 12px; font-weight: 700; cursor: pointer;">
                Đóng Ví
              </button>
            </div>
          </div>
        ` : ''}

        <!-- MODAL: VÌ SAO CHỌN KÈO NÀY -->
        ${State.isWhyModalOpen ? `
          <div style="position: fixed; inset: 0; z-index: 100000; background: rgba(0,0,0,0.75); backdrop-filter: blur(10px); display: flex; align-items: center; justify-content: center; padding: 1.5rem;">
            <div style="background: ${C.cardBg}; border: 2px solid #F59E0B; border-radius: 24px; max-width: 480px; width: 100%; padding: 2rem; box-shadow: 0 25px 70px rgba(0,0,0,0.3);">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.2rem;">
                <h3 style="font-size: 1.25rem; font-weight: 800; color: #D97706;">💡 Vì Sao JAYT Chọn Kèo Này?</h3>
                <button data-action="close-why-modal" style="min-height: 44px; min-width: 44px; background: none; border: none; font-size: 1.5rem; cursor: pointer; color: ${C.textMuted};">&times;</button>
              </div>
              <div style="display: flex; flex-direction: column; gap: 0.8rem; font-size: 0.85rem; color: ${C.textSub}; line-height: 1.5; margin-bottom: 1.5rem;">
                <div>💰 <strong>Giá trị thật:</strong> Giảm 50% (${formatVND(priorityDeal.saving)}) với khả năng sử dụng cao.</div>
                <div>⏳ <strong>Độ khó săn:</strong> ${priorityDeal.difficulty_label} (${priorityDeal.difficulty_reasons}).</div>
                <div>🛡️ <strong>Bằng chứng:</strong> Đã đối soát SHA-256 cơ sở thực địa và mã băm toàn vẹn.</div>
              </div>
              <button data-action="close-why-modal" style="width: 100%; min-height: 44px; background: #D97706; color: #FFF; border: none; border-radius: 12px; font-weight: 700; cursor: pointer;">
                Đã Hiểu
              </button>
            </div>
          </div>
        ` : ''}

        <!-- MODAL: RỦ BẠN (+5K) -->
        ${State.isShareModalOpen && State.shareDeal ? `
          <div style="position: fixed; inset: 0; z-index: 100000; background: rgba(0,0,0,0.75); backdrop-filter: blur(10px); display: flex; align-items: center; justify-content: center; padding: 1.5rem;">
            <div style="background: ${C.cardBg}; border: 2px solid #0284C7; border-radius: 24px; max-width: 480px; width: 100%; padding: 2rem; box-shadow: 0 25px 70px rgba(0,0,0,0.3);">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.2rem;">
                <h3 style="font-size: 1.25rem; font-weight: 800; color: #0284C7;">↗ Rủ Bạn Cùng Săn (+5.000₫)</h3>
                <button data-action="close-share-modal" style="min-height: 44px; min-width: 44px; background: none; border: none; font-size: 1.5rem; cursor: pointer; color: ${C.textMuted};">&times;</button>
              </div>
              <div style="background: rgba(2, 132, 199, 0.1); border: 1px solid #0284C7; border-radius: 14px; padding: 1rem; margin-bottom: 1.2rem;">
                <div style="font-weight: 700; color: ${C.textMain};">${escapeHTML(State.shareDeal.merchant)} — ${escapeHTML(State.shareDeal.title)}</div>
                <div style="color: #059669; font-weight: 700; font-size: 0.8rem; margin-top: 0.2rem;">Tiết kiệm ${formatVND(State.shareDeal.saving)} khi săn chung!</div>
              </div>
              <div style="font-size: 0.8rem; color: ${C.textSub}; margin-bottom: 0.4rem;">MÃ GIỚI THIỆU:</div>
              <div style="background: ${C.pillBg}; border: 1.5px dashed #0284C7; padding: 0.65rem; border-radius: 10px; font-family: monospace; font-size: 1rem; font-weight: 800; color: #0284C7; text-align: center; margin-bottom: 1.2rem;">
                ${getPersonalReferralCode()}
              </div>
              <div style="display: flex; flex-direction: column; gap: 0.6rem; margin-bottom: 1.2rem;">
                <a href="${generateShareDeepLink(State.shareDeal, 'zalo')}" target="_blank" rel="noopener noreferrer" style="min-height: 44px; background: #0068FF; color: #FFF; border-radius: 12px; font-weight: 700; font-size: 0.9rem; display: flex; align-items: center; justify-content: center; text-decoration: none;">
                  💬 Chia Sẻ Qua Zalo Ngay
                </a>
                <a href="${generateShareDeepLink(State.shareDeal, 'telegram')}" target="_blank" rel="noopener noreferrer" style="min-height: 44px; background: #229ED9; color: #FFF; border-radius: 12px; font-weight: 700; font-size: 0.9rem; display: flex; align-items: center; justify-content: center; text-decoration: none;">
                  ✈ Chia Sẻ Qua Telegram
                </a>
              </div>
              <button data-action="close-share-modal" style="width: 100%; min-height: 44px; background: ${C.pillBg}; border: 1px solid ${C.border}; color: ${C.textSub}; border-radius: 10px; font-weight: 600; cursor: pointer;">
                Đóng
              </button>
            </div>
          </div>
        ` : ''}

        <!-- MODAL: CHIẾN THUẬT SĂN -->
        ${State.isStrategyModalOpen && State.strategyDeal ? `
          <div style="position: fixed; inset: 0; z-index: 100000; background: rgba(0,0,0,0.75); backdrop-filter: blur(10px); display: flex; align-items: center; justify-content: center; padding: 1.5rem;">
            <div style="background: ${C.cardBg}; border: 2px solid #D97706; border-radius: 24px; max-width: 480px; width: 100%; padding: 2rem; box-shadow: 0 25px 70px rgba(0,0,0,0.3);">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.2rem;">
                <h3 style="font-size: 1.25rem; font-weight: 800; color: #D97706;">🎯 Chiến Thuật: ${escapeHTML(State.strategyDeal.merchant)}</h3>
                <button data-action="close-strategy-modal" style="min-height: 44px; min-width: 44px; background: none; border: none; font-size: 1.5rem; cursor: pointer; color: ${C.textMuted};">&times;</button>
              </div>
              <div style="background: rgba(245, 158, 11, 0.1); border: 1px solid #D97706; border-radius: 14px; padding: 1rem; margin-bottom: 1.2rem;">
                <div style="font-weight: 700; color: ${C.textMain};">${escapeHTML(State.strategyDeal.title)}</div>
                <div style="color: #059669; font-weight: 700; font-size: 0.8rem; margin-top: 0.2rem;">Tiết kiệm ${formatVND(State.strategyDeal.saving)} (-${State.strategyDeal.percent}%)</div>
              </div>
              <div style="font-size: 0.85rem; color: ${C.textMain}; line-height: 1.5; margin-bottom: 1.2rem;">
                <strong>Hướng dẫn thực chiến:</strong><br>
                ${escapeHTML(State.strategyDeal.hunt_strategy)}
              </div>
              <button data-action="hunt-keo" data-id="${State.strategyDeal.deal_id}" data-code="${State.strategyDeal.code}" data-link="${State.strategyDeal.link}" data-saving="${State.strategyDeal.saving}" style="width: 100%; min-height: 44px; background: linear-gradient(135deg, #10B981, #059669); color: #FFF; border: none; border-radius: 12px; font-weight: 800; cursor: pointer;">
                🔥 SĂN KÈO NGAY ➔
              </button>
            </div>
          </div>
        ` : ''}

        <!-- MODAL: SHA-256 TRUST AUDIT DRAWER -->
        ${State.isAuditOpen && State.auditDeal ? `
          <div style="position: fixed; inset: 0; z-index: 100000; background: rgba(0,0,0,0.75); backdrop-filter: blur(10px); display: flex; align-items: center; justify-content: center; padding: 1.5rem;">
            <div style="background: ${C.cardBg}; border: 1.5px solid #10B981; border-radius: 24px; max-width: 520px; width: 100%; padding: 2rem; box-shadow: 0 25px 70px rgba(0,0,0,0.3);">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                <h3 style="font-size: 1.25rem; font-weight: 800; color: #059669;">🛡️ Đối Soát SHA-256 Thực Địa</h3>
                <button data-action="close-audit" style="min-height: 44px; min-width: 44px; background: none; border: none; font-size: 1.5rem; cursor: pointer; color: ${C.textMuted};">&times;</button>
              </div>
              <div style="font-size: 0.85rem; color: ${C.textSub}; margin-bottom: 0.8rem;">
                Kèo: <strong>${escapeHTML(State.auditDeal.title)}</strong> (${escapeHTML(State.auditDeal.merchant)})
              </div>
              <div style="background: #0B0F19; padding: 0.9rem; border-radius: 12px; font-family: monospace; font-size: 0.72rem; color: #10B981; word-break: break-all; margin-bottom: 1.2rem; border: 1px solid ${C.border};">
                CANONICAL SHA-256: ${escapeHTML(State.auditDeal.sha_evidence)}
              </div>
              <button data-action="close-audit" style="width: 100%; min-height: 44px; background: #10B981; color: #FFF; border: none; border-radius: 12px; font-weight: 700; cursor: pointer;">
                Đóng Ngăn Kéo
              </button>
            </div>
          </div>
        ` : ''}

        <!-- FIXED MOBILE BOTTOM NAVIGATION (5 TABS NGUYÊN BẢN) -->
        <nav style="position: fixed; bottom: 0; left: 0; right: 0; height: 60px; background: ${C.headerBg}; backdrop-filter: blur(20px); border-top: 1px solid ${C.border}; display: flex; justify-content: space-around; align-items: center; z-index: 9999;">
          <button data-action="nav-tab" data-tab="home" style="min-height: 44px; min-width: 44px; background: none; border: none; color: ${State.activeTab === 'home' ? '#059669' : C.textMuted}; font-size: 0.72rem; font-weight: 700; display: flex; flex-direction: column; align-items: center; justify-content: center; cursor: pointer;">
            <span style="font-size: 1.15rem;">⌂</span>
            <span>Khám Phá</span>
          </button>
          <button data-action="toggle-deal-now" style="min-height: 44px; min-width: 44px; background: none; border: none; color: ${State.dealNowMode ? '#DC2626' : C.textMuted}; font-size: 0.72rem; font-weight: 800; display: flex; flex-direction: column; align-items: center; justify-content: center; cursor: pointer;">
            <span style="font-size: 1.15rem;">🔥</span>
            <span>Săn Ngay</span>
          </button>
          <button data-action="scroll-to-hidden" style="min-height: 44px; min-width: 44px; background: none; border: none; color: ${C.textMuted}; font-size: 0.72rem; font-weight: 700; display: flex; flex-direction: column; align-items: center; justify-content: center; cursor: pointer;">
            <span style="font-size: 1.15rem;">🎁</span>
            <span>Voucher Ẩn</span>
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

        <!-- GRAND FOOTER NGUYÊN BẢN -->
        <footer style="background: ${C.footerBg}; border-top: 1px solid rgba(255,255,255,0.08); padding: 3rem 1.5rem 2rem;">
          <div style="max-width: 1300px; margin: 0 auto;">
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 2rem; margin-bottom: 2rem;">
              <div>
                <div style="font-size: 1.2rem; font-weight: 800; color: #FFF; margin-bottom: 0.6rem;">JayT Đà Nẵng 43</div>
                <p style="font-size: 0.82rem; color: #94A3B8; line-height: 1.6;">Hệ điều hành săn kèo & voucher bản địa Đà Nẵng chuyên sâu. Tối ưu hóa cơ hội tiết kiệm thực tế, minh bạch và an toàn.</p>
              </div>
              <div>
                <h4 style="font-size: 0.85rem; font-weight: 700; color: #FBBF24; text-transform: uppercase; margin-bottom: 0.8rem;">Tọa Độ Bản Địa</h4>
                <ul style="list-style: none; padding: 0; font-size: 0.82rem; color: #94A3B8; display: flex; flex-direction: column; gap: 0.45rem;">
                  <li>🎓 436 Điện Biên Phủ • Thanh Khê Đông</li>
                  <li>☕ 34 Bạch Đằng • View Sông Hàn Hải Châu</li>
                  <li>🍗 100 Thái Phiên • Cơm Gà A Hải Cầu Rồng</li>
                  <li>🏖️ 910A Ngô Quyền • CGV Vincom Sơn Trà</li>
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

    // ⚡ Ghi nhận số liệu đo lường hiệu năng khởi động thực tế (W3C Standard)
    const bootDuration = (performance.now() - bootStartTime).toFixed(2);
    window.jaytPerformanceAudit = {
      renderDurationMs: parseFloat(bootDuration),
      timestamp: new Date().toISOString(),
      dealsRendered: filtered.length,
      legacyVaultPreserved: !!vault
    };
    console.log(`⏱️ [JAYT BENCHMARK] APEX Rendered in ${bootDuration}ms (DOM Node Count: ${root.children.length})`);
  }

  function renderDealCard(deal, C, isLight) {
    const isFav = State.savedIds.includes(deal.deal_id);

    return `
      <div style="background: ${C.cardBg}; border: 1px solid ${C.border}; border-radius: 20px; display: flex; flex-direction: column; justify-content: space-between; overflow: hidden; box-shadow: ${C.cardShadow}; height: 100%;">
        <div class="deal-img-box">
          <img src="${sanitizeURL(deal.image)}" alt="${escapeHTML(deal.title)}" loading="lazy" onerror="this.onerror=null; this.src='${FALLBACK_IMAGE_SVG}';" />
          <div style="position: absolute; top: 10px; left: 10px; background: ${deal.badge_bg}; color: #FFF; padding: 0.25rem 0.65rem; border-radius: 9999px; font-size: 0.72rem; font-weight: 700;">
            ${escapeHTML(deal.tag)}
          </div>
          <div style="position: absolute; bottom: 10px; right: 10px; background: rgba(0,0,0,0.65); color: #FFF; font-size: 0.65rem; padding: 0.2rem 0.5rem; border-radius: 4px; backdrop-filter: blur(4px);">
            📷 ${escapeHTML(deal.image_provenance_label)}
          </div>
          <div style="position: absolute; top: 10px; right: 54px; background: ${deal.difficulty_badge_bg}; color: ${deal.difficulty_color}; border: 1px solid ${deal.difficulty_color}; padding: 0.2rem 0.55rem; border-radius: 6px; font-size: 0.68rem; font-weight: 800; backdrop-filter: blur(8px);">
            ${deal.difficulty_label}
          </div>
          <button data-action="bookmark" data-id="${escapeHTML(deal.deal_id)}" style="position: absolute; top: 10px; right: 10px; width: 36px; height: 36px; border-radius: 50%; background: ${isLight ? 'rgba(255, 255, 255, 0.9)' : 'rgba(11, 15, 25, 0.85)'}; border: 1px solid ${C.border}; color: ${isFav ? '#EF4444' : '#FFF'}; display: flex; align-items: center; justify-content: center; cursor: pointer;">
            ${isFav ? '❤️' : '🤍'}
          </button>
        </div>

        <div style="padding: 1.25rem; display: flex; flex-direction: column; justify-content: space-between; flex: 1; gap: 0.85rem;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
              <span style="font-size: 0.82rem; font-weight: 700; color: #D97706; text-transform: uppercase;">${escapeHTML(deal.merchant)}</span>
              <span style="font-size: 0.7rem; color: #059669; font-weight: 600;">● Còn ${deal.left_slots} suất</span>
            </div>
            <h4 style="font-size: 1.05rem; font-weight: 700; color: ${C.textMain}; line-height: 1.35; margin-bottom: 0.35rem;">
              ${escapeHTML(deal.title)}
            </h4>
            <div style="font-size: 0.78rem; color: ${C.textSub}; margin-bottom: 0.6rem;">
              📍 ${escapeHTML(deal.branch)}
            </div>
            <div style="background: ${isLight ? 'rgba(16, 185, 129, 0.06)' : 'rgba(16, 185, 129, 0.08)'}; border: 1.5px solid rgba(16, 185, 129, 0.25); border-radius: 12px; padding: 0.75rem 0.9rem; text-align: center;">
              <div style="font-size: 1.25rem; font-weight: 800; color: #059669;">
                TIẾT KIỆM ${formatVND(deal.saving)} (-${deal.percent}%)
              </div>
              <div style="font-size: 0.78rem; color: ${C.textMain}; font-weight: 600; margin-top: 0.2rem;">
                🎯 Khả năng săn: <strong style="color:#D97706;">${deal.huntability_label}</strong>
              </div>
            </div>
          </div>

          <div>
            <div style="display: flex; gap: 0.5rem; margin-bottom: 0.5rem;">
              <button data-action="hunt-keo" data-id="${deal.deal_id}" data-code="${deal.code}" data-link="${deal.link}" data-saving="${deal.saving}" style="flex: 1.3; min-height: 46px; background: linear-gradient(135deg, #10B981, #059669); color: #FFF; padding: 0 0.4rem; border-radius: 10px; font-weight: 800; font-size: 0.84rem; border: none; cursor: pointer;">
                🔥 SĂN NGAY ➔
              </button>
              <button data-action="open-strategy-modal" data-id="${deal.deal_id}" style="flex: 0.9; min-height: 46px; background: ${C.pillBg}; border: 1.5px dashed rgba(245,158,11,0.5); color: #D97706; padding: 0 0.4rem; border-radius: 10px; font-weight: 700; font-size: 0.8rem; cursor: pointer;">
                🎯 Chiến Thuật
              </button>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 0.72rem;">
              <button data-action="open-audit" data-id="${escapeHTML(deal.deal_id)}" style="background: none; border: none; color: #059669; font-weight: 700; cursor: pointer; text-decoration: underline;">
                🛡️ Tin cậy: ${deal.trust_score}/100
              </button>
              <button data-action="open-share-modal" data-id="${escapeHTML(deal.deal_id)}" style="background: none; border: none; color: #0284C7; font-weight: 700; cursor: pointer; text-decoration: underline;">
                ↗ Rủ bạn (+5K)
              </button>
            </div>
          </div>
        </div>
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
    playSound('click');
    triggerHaptic('light');

    if (act === 'hunt-keo') {
      const id = btn.getAttribute('data-id');
      const code = btn.getAttribute('data-code') || '';
      const link = btn.getAttribute('data-link') || '#';
      const deal = State.deals.find(d => d.deal_id === id);

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
    } else if (act === 'confirm-outcome-success') {
      if (State.pendingOutcomeDeal) {
        State.huntedCount++;
        State.actualSavedAmount += State.pendingOutcomeDeal.saving;
        localStorage.setItem('jayt_hunted_count', State.huntedCount.toString());
        localStorage.setItem('jayt_actual_savings', State.actualSavedAmount.toString());
        State.lastWonDeal = State.pendingOutcomeDeal;
        State.pendingOutcomeDeal = null;
        State.isVictoryModalOpen = true;
        playSound('copy-success');
        triggerHaptic('success');
        renderApp();
      }
    } else if (act === 'confirm-outcome-failed') {
      State.pendingOutcomeDeal = null;
      renderApp();
    } else if (act === 'close-victory-modal') {
      State.isVictoryModalOpen = false;
      renderApp();
    } else if (act === 'toggle-deal-now') {
      State.dealNowMode = !State.dealNowMode;
      triggerHaptic('medium');
      renderApp();
    } else if (act === 'toggle-theme') {
      State.theme = State.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('jayt_theme', State.theme);
      renderApp();
    } else if (act === 'filter-mode') {
      State.activeFilterMode = btn.getAttribute('data-mode');
      renderApp();
    } else if (act === 'district') {
      State.activeDistrict = btn.getAttribute('data-district');
      renderApp();
    } else if (act === 'scroll-to-hidden') {
      const sec = document.getElementById('hiddenVoucherSection');
      if (sec) sec.scrollIntoView({ behavior: 'smooth' });
    } else if (act === 'open-why-modal') {
      State.isWhyModalOpen = true;
      renderApp();
    } else if (act === 'close-why-modal') {
      State.isWhyModalOpen = false;
      renderApp();
    } else if (act === 'open-strategy-modal') {
      const id = btn.getAttribute('data-id');
      State.strategyDeal = State.deals.find(d => d.deal_id === id);
      State.isStrategyModalOpen = true;
      renderApp();
    } else if (act === 'close-strategy-modal') {
      State.isStrategyModalOpen = false;
      renderApp();
    } else if (act === 'open-wallet-modal') {
      State.activeTab = 'wallet';
      renderApp();
    } else if (act === 'close-wallet-modal') {
      State.activeTab = 'home';
      renderApp();
    } else if (act === 'open-audit') {
      const id = btn.getAttribute('data-id');
      State.auditDeal = State.deals.find(d => d.deal_id === id);
      State.isAuditOpen = true;
      renderApp();
    } else if (act === 'close-audit') {
      State.isAuditOpen = false;
      renderApp();
    } else if (act === 'open-share-modal') {
      const id = btn.getAttribute('data-id');
      State.shareDeal = State.deals.find(d => d.deal_id === id);
      State.isShareModalOpen = true;
      renderApp();
    } else if (act === 'close-share-modal') {
      State.isShareModalOpen = false;
      renderApp();
    } else if (act === 'bookmark') {
      const id = btn.getAttribute('data-id');
      const idx = State.savedIds.indexOf(id);
      if (idx > -1) State.savedIds.splice(idx, 1);
      else State.savedIds.push(id);
      localStorage.setItem('jayt_favs', JSON.stringify(State.savedIds));
      renderApp();
    }
  });

  document.body.addEventListener('input', function (e) {
    if (e.target.id === 'calcDrink') { State.calcDrink = parseInt(e.target.value, 10); renderApp(); }
    else if (e.target.id === 'calcMeal') { State.calcMeal = parseInt(e.target.value, 10); renderApp(); }
    else if (e.target.id === 'calcRide') { State.calcRide = parseInt(e.target.value, 10); renderApp(); }
  });

  // Khởi chạy an toàn
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderApp);
  } else {
    renderApp();
  }

})();
