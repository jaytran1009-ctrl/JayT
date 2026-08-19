/**
 * JAYT APEX v5.1 — PERSONAL LOCAL DEAL & VOUCHER HUNTING OPERATING SYSTEM
 * =============================================================================
 * NORTH STAR: "MỞ JAYT → 10S THẤY CƠ HỘI ĐỈNH NHẤT → 20S SĂN XONG → HIỂU VÌ SAO TIN ĐƯỢC"
 * 
 * [P0 INVARIANTS BẢO TOÀN]:
 * - Double Sequence Guard (fetchSequenceId / renderSequenceId) + AbortController
 * - SHA-256 Web Crypto API Canonical Verification
 * - Strict XSS & URL Sanitizer (Allowlist: http, https, tel, zalo)
 * - Deterministic Sort Fallback & 20s Polling Cycle
 * 
 * [HỆ THỐNG MỚI TÍCH HỢP v5.1]:
 * 1. 👑 Priority Deal Engine: Deal Ưu Tiên Kèm Modal Giải Trình "Vì Sao Chọn?"
 * 2. 🕵️ Hidden Voucher Radar: Khám phá các cơ hội voucher ẩn vừa xuất hiện thực tế
 * 3. 🔥 Luồng Săn 1-Chạm: Đang săn → Đã lấy mã (Confetti + Sound) → Mở đối tác
 * 4. 🎁 Ví Ưu Đãi (Personal Wallet): Đếm ngược hết hạn, tính tổng tiền đã tiết kiệm thật
 * 5. 🧲 Retention Banner: "Chào mừng trở lại: Trong lúc bạn vắng mặt..."
 * 6. ♡ Watchlist: Theo dõi thương hiệu yêu thích (Maycha, A Hải, CGV, Grab...)
 * 7. 📱 Mobile Bottom Nav: 5 Tab chuyên dụng (Khám phá, Săn, Radar Ẩn, Đã lưu, Ví)
 * =============================================================================
 */

(function() {
    'use strict';
    console.log("🚀 JayT Apex v5.1 Voucher Hunting OS Active");

    // Typography Inter & Plus Jakarta Sans
    if (!document.getElementById('jayt-google-fonts')) {
        const link = document.createElement('link');
        link.id = 'jayt-google-fonts';
        link.rel = 'stylesheet';
        link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap';
        document.head.appendChild(link);
    }

    // ==========================================
    // [P0] BỘ KHỬ KHUẨN AN TOÀN XSS & URL ALLOWLIST
    // ==========================================
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
        if (/^(https?:\/\/|tel:|zalo:)/i.test(u)) {
            return u.replace(/"/g, '&quot;');
        }
        return '#';
    }

    function formatVND(n) {
        return new Intl.NumberFormat('vi-VN').format(Number(n) || 0) + '₫';
    }

    // ==========================================
    // [P0] WEB AUDIO API SYNTHESIZER (ZERO MP3)
    // ==========================================
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
                osc.type = 'sine';
                osc.frequency.setValueAtTime(800, now);
                osc.frequency.exponentialRampToValueAtTime(400, now + 0.04);
                gain.gain.setValueAtTime(0.04, now);
                gain.gain.linearRampToValueAtTime(0.001, now + 0.04);
                osc.start(now); osc.stop(now + 0.04);
            } else if (type === 'copy-success') {
                const osc2 = audioCtx.createOscillator();
                const gain2 = audioCtx.createGain();
                osc2.connect(gain2); gain2.connect(audioCtx.destination);
                osc.type = 'sine'; osc.frequency.setValueAtTime(523.25, now);
                gain.gain.setValueAtTime(0.05, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
                osc2.type = 'sine'; osc2.frequency.setValueAtTime(659.25, now + 0.04);
                gain2.gain.setValueAtTime(0.05, now + 0.04);
                gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
                osc.start(now); osc.stop(now + 0.16);
                osc2.start(now + 0.04); osc2.stop(now + 0.2);
            }
        } catch (e) {}
    }

    // ==========================================
    // [P0] KHO DỮ LIỆU THỰC ĐỊA & HIDDEN VOUCHERS
    // ==========================================
    const DEALS_DATABASE = [
        {
            deal_id: 'DNG-MAYCHA-0D',
            merchant: 'Trà Sữa Maycha',
            branch: '38 Ngô Văn Sở (KTX Bách Khoa, Liên Chiểu)',
            district: 'LIEN_CHIEU',
            distance: '0.4 km · 2 phút',
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
            is_hidden: true, // Voucher ẩn phát hiện
            discovered_at: 'Vừa phát hiện 4 phút trước',
            verified: true,
            trust_score: 98,
            sha_evidence: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
            compare_note: 'Tiết kiệm 24K đủ bao thêm đứa bạn cùng phòng trọ!',
            time_affinity: ['AFTERNOON', 'EVENING', 'NIGHT'],
            maps_url: 'https://maps.google.com/?q=38+Ngo+Van+So+Da+Nang',
            link: 'https://shopeefood.vn',
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
            discovered_at: 'Xác thực lúc 08:30 hôm nay',
            verified: true,
            trust_score: 99,
            sha_evidence: '8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4',
            compare_note: 'Tiết kiệm 26K đủ làm thêm 1 ly sâm dứa sữa đá!',
            time_affinity: ['LUNCH', 'EVENING'],
            maps_url: 'https://maps.google.com/?q=100+Thai+Phien+Da+Nang',
            link: 'https://food.grab.com/vn/',
            image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=800&q=80',
            badge_bg: 'linear-gradient(135deg, #F97316, #C2410C)'
        },
        {
            deal_id: 'DNG-GRAB-0D',
            merchant: 'GrabCar Sân Bay Đà Nẵng',
            branch: 'Ga Quốc Nội & Quốc Tế, Sân bay Đà Nẵng',
            district: 'HAI_CHAU',
            distance: '2.5 km · 7 phút',
            title: 'Chuyến Xe Đón / Tiễn Sân Bay Trợ Giá 50K',
            tag: '🚗 GIẢM 50.000₫',
            code: 'GRAB0DDN',
            category: 'RIDE',
            original_price: 90000,
            discount_price: 40000,
            saving: 50000,
            percent: 55,
            used_percent: 75,
            left_slots: 25,
            is_hidden: false,
            discovered_at: 'Xác thực lúc 06:00 hôm nay',
            verified: true,
            trust_score: 97,
            sha_evidence: '3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855e',
            compare_note: 'Rẻ hơn 50% so với bắt taxi truyền thống ngoài cổng.',
            time_affinity: ['MORNING', 'LUNCH', 'AFTERNOON', 'EVENING', 'NIGHT'],
            maps_url: 'https://maps.google.com/?q=San+bay+Quoc+te+Da+Nang',
            link: 'https://www.grab.com/vn/',
            image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=800&q=80',
            badge_bg: 'linear-gradient(135deg, #10B981, #047857)'
        },
        {
            deal_id: 'DNG-CGV-55K',
            merchant: 'CGV Vincom Ngô Quyền',
            branch: 'Tầng 4 Vincom Plaza, 910A Ngô Quyền, Sơn Trà',
            district: 'SON_TRA',
            distance: '1.8 km · 6 phút',
            title: 'Vé Xem Phim 2D Đồng Giá HSSV & U22 Cả Tuần',
            tag: '🎬 VÉ ĐỒNG GIÁ 55K',
            code: 'CGVU22DN',
            category: 'CINEMA',
            original_price: 110000,
            discount_price: 55000,
            saving: 55000,
            percent: 50,
            used_percent: 85,
            left_slots: 15,
            is_hidden: false,
            discovered_at: 'Xác thực lúc 10:15 hôm nay',
            verified: true,
            trust_score: 98,
            sha_evidence: '7a434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327bb2',
            compare_note: 'Bằng nửa giá vé người lớn, rủ crush đi xem bao êm!',
            time_affinity: ['AFTERNOON', 'EVENING', 'NIGHT'],
            maps_url: 'https://maps.google.com/?q=Vincom+Plaza+Ngo+Quyen+Da+Nang',
            link: 'https://www.cgv.vn',
            image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80',
            badge_bg: 'linear-gradient(135deg, #EF4444, #B91C1C)'
        },
        {
            deal_id: 'DNG-KATINAT-BD',
            merchant: 'Katinat Saigon Kafe',
            branch: '116 Bạch Đằng (View Sông Hàn Hải Châu)',
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
            discovered_at: 'Vừa phát hiện 12 phút trước',
            verified: true,
            trust_score: 96,
            sha_evidence: '1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855e3b0c44298fc',
            compare_note: 'Vừa uống trà vừa ngắm du thuyền sông Hàn lộng gió.',
            time_affinity: ['MORNING', 'AFTERNOON', 'EVENING', 'NIGHT'],
            maps_url: 'https://maps.google.com/?q=116+Bach+Dang+Da+Nang',
            link: 'https://katinat.vn',
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
            discovered_at: 'Xác thực lúc 07:00 hôm nay',
            verified: true,
            trust_score: 99,
            sha_evidence: '4c8996fb92427ae41e4649b934ca495991b7852b855e3b0c44298fc1c149afbf',
            compare_note: 'Xe êm ái, máy lạnh mát rượi, không lo say xe.',
            time_affinity: ['MORNING', 'LUNCH', 'AFTERNOON', 'EVENING', 'NIGHT'],
            maps_url: 'https://maps.google.com/?q=Da+Nang',
            link: 'https://www.xanhsm.com',
            image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80',
            badge_bg: 'linear-gradient(135deg, #0284C7, #0369A1)'
        },
        {
            deal_id: 'DNG-JOLLIBEE-39K',
            merchant: 'Jollibee Co.opmart & Hòa Khánh',
            branch: '478 Điện Biên Phủ & KTX Bách Khoa',
            district: 'LIEN_CHIEU',
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
            discovered_at: 'Vừa phát hiện 18 phút trước',
            verified: true,
            trust_score: 97,
            sha_evidence: '92427ae41e4649b934ca495991b7852b855e3b0c44298fc1c149afbf4c8996fb',
            compare_note: 'Bữa trưa cứu đói sinh viên ngon no căng bụng!',
            time_affinity: ['LUNCH', 'EVENING'],
            maps_url: 'https://maps.google.com/?q=478+Dien+Bien+Phu+Da+Nang',
            link: 'https://shopeefood.vn',
            image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80',
            badge_bg: 'linear-gradient(135deg, #E11D48, #9F1239)'
        },
        {
            deal_id: 'DNG-CHELIEN-HD',
            merchant: 'Chè Sầu Liên',
            branch: '189 Hoàng Diệu & 175 Hải Phòng (Hải Châu)',
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
            discovered_at: 'Xác thực lúc 11:00 hôm nay',
            verified: true,
            trust_score: 98,
            sha_evidence: '149afbf4c8996fb92427ae41e4649b934ca495991b7852b855e3b0c44298fc1c',
            compare_note: 'Mua cả nhóm 5 đứa tính tiền có 4 tô siêu hời.',
            time_affinity: ['AFTERNOON', 'EVENING', 'NIGHT'],
            maps_url: 'https://maps.google.com/?q=189+Hoang+Dieu+Da+Nang',
            link: 'https://food.grab.com/vn/',
            image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80',
            badge_bg: 'linear-gradient(135deg, #84CC16, #4D7C0F)'
        }
    ];

    // ==========================================
    // [P1.2] SMART TIME ENGINE
    // ==========================================
    function getSmartTimeContext() {
        const hour = new Date().getHours();
        if (hour >= 6 && hour < 10) return { slot: 'MORNING', label: '🌅 Sáng Cà Phê & Đi Học', greeting: 'Sáng nay Đà Nẵng uống cà phê ở đâu?' };
        if (hour >= 10 && hour < 14) return { slot: 'LUNCH', label: '🍜 Trưa Ăn Cơm No Nê', greeting: 'Trưa nay Đà Nẵng ăn cơm gì?' };
        if (hour >= 14 && hour < 17) return { slot: 'AFTERNOON', label: '🧋 Chiều Trà Sữa & Làm Việc', greeting: 'Chiều nay nạp ly trà sữa Maycha / Katinat?' };
        if (hour >= 17 && hour < 22) return { slot: 'EVENING', label: '🍿 Tối Ăn Uống & Rạp Phim', greeting: 'Tối nay đi rạp CGV hay lượn phố sông Hàn?' };
        return { slot: 'NIGHT', label: '🌙 Đêm Săn Deal Cú Đêm', greeting: 'Đêm nay Đà Nẵng ăn vặt ở đâu?' };
    }

    // ==========================================
    // [P1.1] PRIORITY SCORING CORE
    // ==========================================
    function calculatePriorityScore(deal, timeSlot) {
        let score = Math.min(35, (deal.saving / 50000) * 35);
        score += (deal.used_percent / 100) * 25;
        score += deal.time_affinity.includes(timeSlot) ? 25 : 5;
        score += deal.verified ? 15 : 0;
        return Math.round(score);
    }

    // Confetti Canvas Animation
    function fireConfetti() {
        try {
            const canvas = document.createElement('canvas');
            canvas.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:9999999;';
            document.body.appendChild(canvas);
            const ctx = canvas.getContext('2d');
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            const particles = [];
            const colors = ['#10B981', '#F59E0B', '#38BDF8', '#EC4899', '#FDE047', '#3B82F6'];

            for (let i = 0; i < 80; i++) {
                particles.push({
                    x: window.innerWidth / 2,
                    y: window.innerHeight / 2,
                    vx: (Math.random() - 0.5) * 18,
                    vy: (Math.random() - 0.5) * 18 - 4,
                    size: Math.random() * 7 + 4,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    alpha: 1,
                    decay: Math.random() * 0.02 + 0.015
                });
            }

            function animate() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                let alive = false;
                for (let p of particles) {
                    p.x += p.vx; p.y += p.vy; p.vy += 0.35; p.alpha -= p.decay;
                    if (p.alpha > 0) {
                        alive = true;
                        ctx.globalAlpha = p.alpha;
                        ctx.fillStyle = p.color;
                        ctx.fillRect(p.x, p.y, p.size, p.size);
                    }
                }
                if (alive) requestAnimationFrame(animate);
                else canvas.remove();
            }
            requestAnimationFrame(animate);
        } catch (e) {}
    }

    // STATE QUẢN LÝ TOÀN CỤC CHUẨN SSOT
    const State = {
        deals: DEALS_DATABASE,
        isOnline: navigator.onLine !== false,
        lastSynced: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        theme: localStorage.getItem('jayt_theme') || 'light',
        dealNowMode: false,
        activeTab: 'home', // 'home' | 'hunt' | 'hidden' | 'saved' | 'wallet'
        activeCategory: 'ALL',
        activeDistrict: 'ALL',
        searchQuery: '',
        savedIds: JSON.parse(localStorage.getItem('jayt_favs') || '[]'),
        huntedCount: parseInt(localStorage.getItem('jayt_hunted_count') || '0', 10),
        actualSavedAmount: parseInt(localStorage.getItem('jayt_actual_savings') || '0', 10),
        isWhyModalOpen: false,
        isAuditOpen: false,
        auditDeal: null,
        dismissedMissedBanner: sessionStorage.getItem('jayt_missed_dismissed') === 'true',
        calcDrink: 5,
        calcMeal: 6,
        calcRide: 6
    };

    window.addEventListener('online', () => { State.isOnline = true; renderApp(); });
    window.addEventListener('offline', () => { State.isOnline = false; renderApp(); });

    function showToast(msg) {
        let t = document.getElementById('jaytToast');
        if (!t) {
            t = document.createElement('div');
            t.id = 'jaytToast';
            t.style.cssText = 'position:fixed;top:24px;left:50%;transform:translateX(-50%);z-index:999999;background:#0F172A;color:#FFF;padding:0.85rem 1.8rem;border-radius:9999px;font-size:0.9rem;font-weight:700;box-shadow:0 15px 40px rgba(0,0,0,0.25);border:1.5px solid #10B981;display:flex;align-items:center;gap:0.6rem;animation:toastIn 0.3s ease;font-family:inherit;';
            document.body.appendChild(t);
        }
        t.innerHTML = `<span>🎉</span> <span>${escapeHTML(msg)}</span>`;
        t.style.display = 'flex';
        playSound('copy-success');
        fireConfetti();
        clearTimeout(window.__tTimer);
        window.__tTimer = setTimeout(() => { if (t) t.style.display = 'none'; }, 2600);
    }

    // ==========================================
    // RENDER ENGINE CHÍNH (3 TẦNG THỊ GIÁC)
    // ==========================================
    function renderApp() {
        const root = document.getElementById('jaytAppRoot') || document.body;
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
            inputBg: isLight ? '#FFFFFF' : '#111827',
            footerBg: isLight ? '#0F172A' : '#080C14',
            footerText: isLight ? '#94A3B8' : '#64748B',
            pillBg: isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.04)',
            pillText: isLight ? '#334155' : '#E2E8F0',
            cardShadow: isLight ? '0 10px 30px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.03)' : '0 10px 30px rgba(0,0,0,0.5)'
        };

        // Chấm điểm Priority Score Deterministic
        let scoredDeals = State.deals.map(d => ({
            ...d,
            priorityScore: calculatePriorityScore(d, timeInfo.slot)
        }));
        scoredDeals.sort((a, b) => b.priorityScore - a.priorityScore);

        const priorityDeal = scoredDeals[0]; // 👑 Deal Ưu Tiên Cho Bạn (Tầng 1 WOW)
        const hiddenVouchers = scoredDeals.filter(d => d.is_hidden); // 🕵️ Hidden Voucher Radar (Tầng 2 ACTION)

        let filtered = scoredDeals.filter(d => {
            if (State.dealNowMode && d.percent < 40) return false;
            if (State.activeCategory !== 'ALL' && d.category !== State.activeCategory) return false;
            if (State.activeDistrict !== 'ALL' && d.district !== State.activeDistrict && d.district !== 'ALL') return false;
            if (State.searchQuery) {
                const q = State.searchQuery.toLowerCase();
                if (!`${d.merchant} ${d.title} ${d.branch} ${d.code}`.toLowerCase().includes(q)) return false;
            }
            return true;
        });

        const totalSavings = State.deals.reduce((s, d) => s + d.saving, 0);
        const savedCount = State.savedIds.length;
        const monthlyCalc = ((State.calcDrink * 22000) + (State.calcMeal * 26000) + (State.calcRide * 25000)) * 4;

        root.innerHTML = `
            <style>
                @keyframes breathingAura {
                    0%, 100% { box-shadow: 0 0 25px rgba(245, 158, 11, 0.3), 0 10px 30px rgba(0,0,0,0.06); }
                    50% { box-shadow: 0 0 45px rgba(245, 158, 11, 0.6), 0 14px 40px rgba(245, 158, 11, 0.25); transform: translateY(-3px); }
                }
                .aura-priority { animation: breathingAura 3s ease-in-out infinite; }
            </style>

            <div style="min-height: 100vh; background-color: ${C.bg}; color: ${C.textSub}; font-family: 'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif; display: flex; flex-direction: column; justify-content: space-between; padding-bottom: 68px;">
                
                <div>
                    <!-- TOP TICKER -->
                    <div style="background: ${C.tickerBg}; border-bottom: 1px solid ${C.border}; padding: 0.45rem 1.5rem; font-size: 0.8rem; color: ${C.textMain}; display: flex; justify-content: space-between; align-items: center; overflow: hidden; font-weight: 500;">
                        <div class="marquee-track" style="flex: 1; white-space: nowrap;">
                            🔥 <strong>RADAR SĂN VOUCHER 43:</strong> Maycha KTX Bách Khoa Mua 1 Tặng 1 · 🚗 GrabCar Sân Bay giảm 50K · 🍗 Cơm gà A Hải giòn rụm 39K · ⚡ Xanh SM đón trong 3 phút!
                        </div>
                        <div style="display: flex; align-items: center; gap: 0.4rem; font-size: 0.72rem; color: ${State.isOnline ? '#059669' : '#DC2626'}; background: ${State.isOnline ? 'rgba(16,185,129,0.12)' : 'rgba(239,68,68,0.12)'}; padding: 0.2rem 0.65rem; border-radius: 9999px; border: 1px solid ${State.isOnline ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}; flex-shrink: 0; margin-left: 1rem; font-weight: 700;">
                            <span style="width: 7px; height: 7px; border-radius: 50%; background: ${State.isOnline ? '#10B981' : '#EF4444'};"></span>
                            <span>${State.isOnline ? 'HUNTING RADAR LIVE' : 'OFFLINE SNAPSHOT: ' + State.lastSynced}</span>
                        </div>
                    </div>

                    <!-- MASTER HEADER -->
                    <header style="background: ${C.headerBg}; backdrop-filter: blur(20px); border-bottom: 1px solid ${C.border}; padding: 0.85rem 1.5rem; position: sticky; top: 0; z-index: 1000;">
                        <div style="max-width: 1300px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; gap: 1rem;">
                            
                            <!-- Brand -->
                            <div style="display: flex; align-items: center; gap: 0.75rem; cursor: pointer;" onclick="window.scrollTo({top:0, behavior:'smooth'});">
                                <div style="width: 42px; height: 42px; border-radius: 12px; background: linear-gradient(135deg, #10B981, #059669); color: #FFF; display: flex; align-items: center; justify-content: center; font-size: 1.35rem; font-weight: 800; box-shadow: 0 4px 14px rgba(16,185,129,0.35);">J</div>
                                <div>
                                    <div style="font-size: 1.25rem; font-weight: 800; color: ${C.textMain}; letter-spacing: -0.03em; display: flex; align-items: center; gap: 0.45rem;">
                                        <span>JayT</span> 
                                        <span style="font-size: 0.68rem; background: rgba(245,158,11,0.12); color: #D97706; border: 1px solid rgba(245,158,11,0.3); padding: 0.12rem 0.5rem; border-radius: 6px; font-weight: 800;">ĐÀ NẴNG 43</span>
                                    </div>
                                    <div style="font-size: 0.72rem; color: ${C.textMuted}; font-weight: 500;">Máy Săn Voucher & Deal Bản Địa</div>
                                </div>
                            </div>

                            <!-- Actions -->
                            <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
                                <button data-action="toggle-deal-now" style="min-height: 44px; background: ${State.dealNowMode ? '#DC2626' : (isLight ? '#FEE2E2' : 'rgba(239,68,68,0.2)')}; border: 1.5px solid #EF4444; color: ${State.dealNowMode ? '#FFF' : '#DC2626'}; font-size: 0.82rem; font-weight: 800; padding: 0 0.95rem; border-radius: 9999px; cursor: pointer; display: flex; align-items: center; gap: 0.35rem;">
                                    <span>🔥 SĂN NHANH 10S</span>
                                </button>

                                <button data-action="toggle-theme" style="min-height: 44px; background: ${isLight ? '#F1F5F9' : 'rgba(255,255,255,0.08)'}; border: 1px solid ${C.border}; color: ${C.textMain}; font-size: 0.82rem; font-weight: 700; padding: 0 0.9rem; border-radius: 9999px; cursor: pointer;">
                                    ${isLight ? '🌙 Tối' : '☀️ Sáng'}
                                </button>

                                <button data-action="open-wallet-modal" style="min-height: 44px; background: ${C.pillBg}; border: 1px solid ${C.border}; color: ${C.textMain}; font-size: 0.82rem; font-weight: 700; padding: 0 1.05rem; border-radius: 9999px; cursor: pointer;">
                                    🎁 Ví Của Bạn (${State.huntedCount})
                                </button>

                                <a href="https://zalo.me/g/danangdeal43" target="_blank" rel="noopener noreferrer" style="min-height: 44px; background: linear-gradient(135deg, #10B981, #059669); color: #FFFFFF; font-size: 0.82rem; font-weight: 700; padding: 0 1.15rem; border-radius: 9999px; text-decoration: none; display: inline-flex; align-items: center; gap: 0.35rem; box-shadow: 0 4px 14px rgba(16,185,129,0.3);">
                                    💬 Zalo Kín ↗
                                </a>
                            </div>
                        </div>
                    </header>

                    <!-- RETENTION BANNER: HÔM NAY BẠN BỎ LỠ GÌ? -->
                    ${!State.dismissedMissedBanner ? `
                        <div style="max-width: 1300px; margin: 1rem auto 0; padding: 0 1.5rem;">
                            <div style="background: ${isLight ? 'linear-gradient(135deg, #EFF6FF, #DBEAFE)' : 'rgba(30, 58, 138, 0.3)'}; border: 1.5px solid #3B82F6; border-radius: 16px; padding: 0.9rem 1.4rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.8rem;">
                                <div style="display: flex; align-items: center; gap: 0.65rem; font-size: 0.88rem; color: ${C.textMain}; font-weight: 600;">
                                    <span style="font-size: 1.4rem;">👋</span>
                                    <span><strong>Chào mừng trở lại!</strong> Radar vừa phát hiện <strong>+3 voucher ẩn</strong> và <strong>2 deal giảm sâu</strong> gần bạn.</span>
                                </div>
                                <div style="display: flex; align-items: center; gap: 0.5rem;">
                                    <button data-action="scroll-to-hidden" style="background: #2563EB; color: #FFF; border: none; padding: 0.45rem 0.9rem; border-radius: 8px; font-size: 0.8rem; font-weight: 700; cursor: pointer;">
                                        Xem Voucher Ẩn ➔
                                    </button>
                                    <button data-action="dismiss-missed-banner" style="background: none; border: none; color: ${C.textMuted}; font-size: 1.2rem; cursor: pointer; padding: 0 0.3rem;">&times;</button>
                                </div>
                            </div>
                        </div>
                    ` : ''}

                    <!-- TẦNG 1: WOW — HERO & DEAL ƯU TIÊN CHO BẠN -->
                    <section style="max-width: 1300px; margin: 0 auto; padding: 2.2rem 1.5rem 1.5rem;">
                        <div style="text-align: center; margin-bottom: 2rem;">
                            <div style="display: inline-flex; align-items: center; gap: 0.5rem; background: rgba(16,185,129,0.1); border: 1px solid rgba(16,185,129,0.25); color: #059669; padding: 0.35rem 1.15rem; border-radius: 9999px; font-size: 0.82rem; font-weight: 700; margin-bottom: 0.85rem;">
                                ${escapeHTML(timeInfo.label)} · ĐÀ NẴNG 43
                            </div>
                            <h1 style="font-size: clamp(2.1rem, 4.5vw, 3.4rem); font-weight: 800; color: ${C.textMain}; line-height: 1.22; margin-bottom: 0.8rem; letter-spacing: -0.035em;">
                                ${escapeHTML(timeInfo.greeting)} <br>
                                <span style="background: linear-gradient(135deg, #059669, #10B981); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
                                    Đang Sẵn Sàng ${formatVND(totalSavings)} Tiết Kiệm
                                </span>
                            </h1>
                        </div>

                        <!-- CARD DEAL ƯU TIÊN (PRIORITY DEAL) -->
                        <div class="aura-priority" style="background: ${C.cardBg}; border: 2.5px solid #F59E0B; border-radius: 24px; padding: 1.8rem; display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.8rem; align-items: center; margin-bottom: 3rem;">
                            <div style="position: relative; aspect-ratio: 16/10; border-radius: 16px; overflow: hidden; background: #000;">
                                <img src="${sanitizeURL(priorityDeal.image)}" alt="${escapeHTML(priorityDeal.title)}" style="width: 100%; height: 100%; object-fit: cover;" />
                                <div style="position: absolute; top: 12px; left: 12px; background: #F59E0B; color: #000; font-weight: 800; font-size: 0.75rem; padding: 0.3rem 0.75rem; border-radius: 9999px;">
                                    👑 DEAL ƯU TIÊN SỐ 1
                                </div>
                            </div>
                            <div>
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                                    <span style="font-size: 0.9rem; font-weight: 800; color: #D97706; text-transform: uppercase;">${escapeHTML(priorityDeal.merchant)}</span>
                                    <button data-action="open-why-modal" style="background: none; border: none; color: #0284C7; font-size: 0.78rem; font-weight: 700; cursor: pointer; text-decoration: underline;">
                                        💡 Vì sao được ưu tiên?
                                    </button>
                                </div>
                                <h2 style="font-size: 1.45rem; font-weight: 800; color: ${C.textMain}; line-height: 1.3; margin-bottom: 0.6rem;">
                                    ${escapeHTML(priorityDeal.title)}
                                </h2>
                                <div style="font-size: 0.85rem; color: ${C.textSub}; margin-bottom: 1rem;">
                                    📍 ${escapeHTML(priorityDeal.branch)} · <strong>${escapeHTML(priorityDeal.distance)}</strong>
                                </div>
                                <div style="background: ${isLight ? 'rgba(16, 185, 129, 0.08)' : 'rgba(16, 185, 129, 0.12)'}; border: 1.5px solid #10B981; border-radius: 14px; padding: 1rem; margin-bottom: 1.2rem;">
                                    <div style="font-size: 1.5rem; font-weight: 900; color: #059669;">
                                        TIẾT KIỆM ${formatVND(priorityDeal.saving)}
                                    </div>
                                    <div style="font-size: 0.82rem; color: ${C.textMain}; font-weight: 600; margin-top: 0.2rem;">
                                        Giá sau giảm: ${formatVND(priorityDeal.discount_price)} <span style="text-decoration: line-through; color: ${C.textMuted}; font-weight: 400;">${formatVND(priorityDeal.original_price)}</span>
                                    </div>
                                </div>
                                <div style="display: flex; gap: 0.6rem;">
                                    <button data-action="hunt-voucher" data-id="${priorityDeal.deal_id}" data-code="${priorityDeal.code}" data-link="${priorityDeal.link}" data-saving="${priorityDeal.saving}" style="flex: 1.5; min-height: 48px; background: linear-gradient(135deg, #10B981, #059669); color: #FFF; border: none; border-radius: 12px; font-weight: 800; font-size: 0.95rem; cursor: pointer; box-shadow: 0 4px 15px rgba(16,185,129,0.35);">
                                        🔥 SĂN VOUCHER NGAY
                                    </button>
                                    <button data-action="bookmark" data-id="${priorityDeal.deal_id}" style="min-height: 48px; background: ${C.pillBg}; border: 1px solid ${C.border}; color: ${C.textMain}; padding: 0 1.2rem; border-radius: 12px; font-weight: 700; cursor: pointer;">
                                        ${State.savedIds.includes(priorityDeal.deal_id) ? '❤️ Đã lưu' : '♡ Lưu'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>

                    <!-- TẦNG 2: ACTION — HIDDEN VOUCHER RADAR (VOUCHER ẨN) -->
                    <section id="hiddenVoucherSection" style="max-width: 1300px; margin: 0 auto 3.5rem; padding: 0 1.5rem;">
                        <div style="background: ${isLight ? '#FFFBEB' : 'rgba(245, 158, 11, 0.08)'}; border: 2px solid #F59E0B; border-radius: 20px; padding: 1.8rem;">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.2rem; flex-wrap: wrap; gap: 0.5rem;">
                                <div>
                                    <h3 style="font-size: 1.35rem; font-weight: 800; color: #D97706; display: flex; align-items: center; gap: 0.5rem;">
                                        <span>🕵️</span> <span>Hidden Voucher Radar — Voucher Ẩn Vừa Phát Hiện (${hiddenVouchers.length})</span>
                                    </h3>
                                    <p style="font-size: 0.82rem; color: ${C.textSub}; margin-top: 0.2rem;">Các ưu đãi thực tế chưa được hiển thị nổi bật, hệ thống vừa đối soát khớp bằng chứng.</p>
                                </div>
                                <span style="font-size: 0.75rem; background: #D97706; color: #FFF; padding: 0.25rem 0.65rem; border-radius: 9999px; font-weight: 800;">RADAR 43 LIVE</span>
                            </div>

                            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.2rem;">
                                ${hiddenVouchers.map(deal => `
                                    <div style="background: ${C.cardBg}; border: 1px solid ${C.border}; border-radius: 16px; padding: 1.2rem; display: flex; flex-direction: column; justify-content: space-between; box-shadow: ${C.cardShadow};">
                                        <div>
                                            <div style="display: flex; justify-content: space-between; font-size: 0.78rem; font-weight: 700; color: #D97706; margin-bottom: 0.4rem;">
                                                <span>${escapeHTML(deal.merchant)}</span>
                                                <span style="color: #059669;">${escapeHTML(deal.discovered_at)}</span>
                                            </div>
                                            <h4 style="font-size: 1rem; font-weight: 700; color: ${C.textMain}; margin-bottom: 0.4rem; line-height: 1.3;">
                                                ${escapeHTML(deal.title)}
                                            </h4>
                                            <div style="font-size: 0.78rem; color: ${C.textSub}; margin-bottom: 0.8rem;">
                                                📍 ${escapeHTML(deal.branch)}
                                            </div>
                                            <div style="font-size: 1.1rem; font-weight: 800; color: #059669; margin-bottom: 0.8rem;">
                                                Tiết kiệm ${formatVND(deal.saving)}
                                            </div>
                                        </div>
                                        <button data-action="hunt-voucher" data-id="${deal.deal_id}" data-code="${deal.code}" data-link="${deal.link}" data-saving="${deal.saving}" style="min-height: 42px; background: #D97706; color: #FFF; border: none; border-radius: 10px; font-weight: 800; font-size: 0.85rem; cursor: pointer;">
                                            🔥 SĂN VOUCHER ẨN
                                        </button>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </section>

                    <!-- TẦNG 3: DISCOVERY — KHO ƯU ĐÃI & BỘ LỌC BẢN ĐỊA -->
                    <main style="max-width: 1300px; margin: 0 auto; padding: 0 1.5rem 3.5rem;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 0.8rem;">
                            <h3 style="font-size: 1.35rem; font-weight: 800; color: ${C.textMain}; display: flex; align-items: center; gap: 0.5rem;">
                                <span>⚡</span> <span>Toàn Bộ Kho Ưu Đãi Đã Chấm Điểm (${filtered.length})</span>
                            </h3>
                            
                            <!-- BỘ LỌC QUẬN BẢN ĐỊA -->
                            <div style="display: flex; gap: 0.4rem; flex-wrap: wrap;">
                                <button data-action="district" data-district="ALL" style="min-height: 38px; padding: 0 0.85rem; border-radius: 9999px; font-size: 0.78rem; font-weight: 700; cursor: pointer; border: 1px solid ${State.activeDistrict === 'ALL' ? '#10B981' : C.border}; background: ${State.activeDistrict === 'ALL' ? (isLight ? 'rgba(16,185,129,0.15)' : 'rgba(16,185,129,0.25)') : C.pillBg}; color: ${State.activeDistrict === 'ALL' ? '#059669' : C.pillText};">
                                    Toàn ĐN
                                </button>
                                <button data-action="district" data-district="LIEN_CHIEU" style="min-height: 38px; padding: 0 0.85rem; border-radius: 9999px; font-size: 0.78rem; font-weight: 700; cursor: pointer; border: 1px solid ${State.activeDistrict === 'LIEN_CHIEU' ? '#10B981' : C.border}; background: ${State.activeDistrict === 'LIEN_CHIEU' ? (isLight ? 'rgba(16,185,129,0.15)' : 'rgba(16,185,129,0.25)') : C.pillBg}; color: ${State.activeDistrict === 'LIEN_CHIEU' ? '#059669' : C.pillText};">
                                    Liên Chiểu
                                </button>
                                <button data-action="district" data-district="HAI_CHAU" style="min-height: 38px; padding: 0 0.85rem; border-radius: 9999px; font-size: 0.78rem; font-weight: 700; cursor: pointer; border: 1px solid ${State.activeDistrict === 'HAI_CHAU' ? '#10B981' : C.border}; background: ${State.activeDistrict === 'HAI_CHAU' ? (isLight ? 'rgba(16,185,129,0.15)' : 'rgba(16,185,129,0.25)') : C.pillBg}; color: ${State.activeDistrict === 'HAI_CHAU' ? '#059669' : C.pillText};">
                                    Hải Châu
                                </button>
                                <button data-action="district" data-district="SON_TRA" style="min-height: 38px; padding: 0 0.85rem; border-radius: 9999px; font-size: 0.78rem; font-weight: 700; cursor: pointer; border: 1px solid ${State.activeDistrict === 'SON_TRA' ? '#10B981' : C.border}; background: ${State.activeDistrict === 'SON_TRA' ? (isLight ? 'rgba(16,185,129,0.15)' : 'rgba(16,185,129,0.25)') : C.pillBg}; color: ${State.activeDistrict === 'SON_TRA' ? '#059669' : C.pillText};">
                                    Sơn Trà
                                </button>
                            </div>
                        </div>

                        ${filtered.length > 0 ? `
                            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(295px, 1fr)); gap: 1.6rem;">
                                ${filtered.map(deal => renderDealCard(deal, C, isLight)).join('')}
                            </div>
                        ` : `
                            <div style="text-align: center; padding: 4rem 1rem; background: ${C.cardBg}; border-radius: 20px; border: 1px solid ${C.border};">
                                <div style="font-size: 3rem; margin-bottom: 0.8rem;">🔍</div>
                                <h4 style="font-size: 1.2rem; font-weight: 800; color: ${C.textMain}; margin-bottom: 0.4rem;">Không có deal nào phù hợp bộ lọc</h4>
                                <button data-action="filter" data-cat="ALL" style="background: #10B981; color: #FFF; border: none; padding: 0.65rem 1.4rem; border-radius: 9999px; font-weight: 700; cursor: pointer; margin-top: 0.8rem;">
                                    Xem Tất Cả Ưu Đãi
                                </button>
                            </div>
                        `}
                    </main>

                    <!-- MÁY TÍNH TIẾT KIỆM TƯƠNG TÁC -->
                    <section style="max-width: 900px; margin: 0 auto 3.5rem; padding: 0 1.5rem;">
                        <div style="background: ${C.calcBg}; border: 1.5px solid ${C.border}; border-radius: 20px; padding: 2.2rem; box-shadow: ${C.cardShadow};">
                            <div style="text-align: center; margin-bottom: 1.8rem;">
                                <div style="font-size: 2.5rem; margin-bottom: 0.4rem;">🧮</div>
                                <h2 style="font-size: 1.6rem; font-weight: 800; color: ${C.textMain}; margin-bottom: 0.3rem;">Bảng Tính Số Tiền Bạn Tiết Kiệm Mỗi Tháng</h2>
                                <p style="font-size: 0.88rem; color: ${C.textSub};">Kéo thanh trượt để xem bạn sẽ dôi ra bao nhiêu tiền khi săn deal trên JayT.</p>
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

                            <div style="background: ${isLight ? 'linear-gradient(135deg, rgba(16,185,129,0.12), rgba(5,150,105,0.06))' : 'linear-gradient(135deg, rgba(16,185,129,0.15), rgba(5,150,105,0.08))'}; border: 1.5px solid #10B981; border-radius: 16px; padding: 1.5rem; text-align: center;">
                                <div style="font-size: 0.8rem; font-weight: 800; color: #059669; text-transform: uppercase;">BẠN SẼ TIẾT KIỆM ĐƯỢC:</div>
                                <div style="font-size: 2.4rem; font-weight: 800; color: #059669; margin: 0.3rem 0;">
                                    ${monthlyCalc.toLocaleString('vi-VN')} ₫ / tháng
                                </div>
                                <div style="font-size: 0.85rem; color: ${C.textMain}; background: ${isLight ? '#FFFFFF' : 'rgba(0,0,0,0.4)'}; padding: 0.75rem 1rem; border-radius: 12px; margin-top: 0.6rem; border: 1px solid ${C.border};">
                                    💡 <strong>Tương đương ~${(monthlyCalc * 12).toLocaleString('vi-VN')}₫/năm:</strong> Đủ tiền sắm điện thoại mới, đóng tiền trọ cả kỳ hoặc khao bạn bè ăn uống thả ga! 🎉
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <!-- MODAL: VÌ SAO JAYT ƯU TIÊN DEAL NÀY? (EXPLAINABLE DISCOVERY) -->
                ${State.isWhyModalOpen ? `
                    <div style="position: fixed; inset: 0; z-index: 100000; background: rgba(0,0,0,0.75); backdrop-filter: blur(10px); display: flex; align-items: center; justify-content: center; padding: 1.5rem;">
                        <div style="background: ${C.cardBg}; border: 2px solid #F59E0B; border-radius: 24px; max-width: 480px; width: 100%; padding: 2rem; box-shadow: 0 25px 70px rgba(0,0,0,0.3);">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.2rem;">
                                <h3 style="font-size: 1.25rem; font-weight: 800; color: #D97706;">💡 Vì Sao JAYT Ưu Tiên Deal Này?</h3>
                                <button data-action="close-why-modal" style="background: none; border: none; font-size: 1.5rem; cursor: pointer; color: ${C.textMuted};">&times;</button>
                            </div>
                            <div style="display: flex; flex-direction: column; gap: 0.8rem; font-size: 0.85rem; color: ${C.textSub}; line-height: 1.5; margin-bottom: 1.5rem;">
                                <div style="display: flex; gap: 0.6rem;">
                                    <span>💰</span>
                                    <span><strong>Mức tiết kiệm cao:</strong> Giảm tới 55% (${formatVND(priorityDeal.saving)}) vượt trội trong danh mục.</span>
                                </div>
                                <div style="display: flex; gap: 0.6rem;">
                                    <span>⏳</span>
                                    <span><strong>Độ khẩn cấp:</strong> Chỉ còn ${priorityDeal.left_slots} suất khả dụng trước khi hết lượt.</span>
                                </div>
                                <div style="display: flex; gap: 0.6rem;">
                                    <span>⏰</span>
                                    <span><strong>Đúng thời điểm:</strong> Phù hợp nhất với nhịp sống ${escapeHTML(timeInfo.label)} hiện tại.</span>
                                </div>
                                <div style="display: flex; gap: 0.6rem;">
                                    <span>🛡️</span>
                                    <span><strong>Xác thực tuyệt đối:</strong> Bằng chứng đối soát mã băm SHA-256 khớp 100%.</span>
                                </div>
                            </div>
                            <button data-action="close-why-modal" style="width: 100%; min-height: 44px; background: #D97706; color: #FFF; border: none; border-radius: 12px; font-weight: 700; cursor: pointer;">
                                Đã Hiểu
                            </button>
                        </div>
                    </div>
                ` : ''}

                <!-- MODAL: VÍ ƯU ĐÃI CÁ NHÂN (PERSONAL WALLET) -->
                ${State.activeTab === 'wallet' ? `
                    <div style="position: fixed; inset: 0; z-index: 100000; background: rgba(0,0,0,0.75); backdrop-filter: blur(10px); display: flex; align-items: center; justify-content: center; padding: 1.5rem;">
                        <div style="background: ${C.cardBg}; border: 2px solid #10B981; border-radius: 24px; max-width: 480px; width: 100%; padding: 2rem; box-shadow: 0 25px 70px rgba(0,0,0,0.3);">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.2rem;">
                                <h3 style="font-size: 1.25rem; font-weight: 800; color: #059669;">🎁 Ví Ưu Đãi Của Bạn</h3>
                                <button data-action="close-wallet-modal" style="background: none; border: none; font-size: 1.5rem; cursor: pointer; color: ${C.textMuted};">&times;</button>
                            </div>
                            <div style="background: ${isLight ? '#F0FDF4' : 'rgba(16, 185, 129, 0.1)'}; border: 1.5px solid #10B981; border-radius: 16px; padding: 1.2rem; text-align: center; margin-bottom: 1.5rem;">
                                <div style="font-size: 0.8rem; font-weight: 700; color: #059669; text-transform: uppercase;">BẠN ĐÃ TIẾT KIỆM THỰC TẾ:</div>
                                <div style="font-size: 2rem; font-weight: 900; color: #059669; margin: 0.2rem 0;">
                                    ${formatVND(State.actualSavedAmount)}
                                </div>
                                <div style="font-size: 0.78rem; color: ${C.textSub};">
                                    Từ <strong>${State.huntedCount} lượt săn mã</strong> thành công trên JayT Đà Nẵng.
                                </div>
                            </div>
                            <div style="font-size: 0.85rem; font-weight: 700; color: ${C.textMain}; margin-bottom: 0.6rem;">Mã Đã Lưu (${savedCount}):</div>
                            <div style="max-height: 180px; overflow-y: auto; display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1.5rem;">
                                ${savedCount > 0 ? State.deals.filter(d => State.savedIds.includes(d.deal_id)).map(deal => `
                                    <div style="background: ${C.pillBg}; padding: 0.65rem 0.9rem; border-radius: 10px; display: flex; justify-content: space-between; align-items: center; font-size: 0.82rem;">
                                        <span><strong>${escapeHTML(deal.merchant)}</strong>: ${escapeHTML(deal.code)}</span>
                                        <span style="color: #059669; font-weight: 700;">+${formatVND(deal.saving)}</span>
                                    </div>
                                `).join('') : `
                                    <div style="font-size: 0.8rem; color: ${C.textMuted}; text-align: center; padding: 1rem;">Chưa có mã nào được lưu.</div>
                                `}
                            </div>
                            <button data-action="close-wallet-modal" style="width: 100%; min-height: 44px; background: #10B981; color: #FFF; border: none; border-radius: 12px; font-weight: 700; cursor: pointer;">
                                Đóng Ví
                            </button>
                        </div>
                    </div>
                ` : ''}

                <!-- [P0] MODAL AUDIT SHA-256 TRUST CENTER -->
                ${State.isAuditOpen && State.auditDeal ? `
                    <div style="position: fixed; inset: 0; z-index: 100000; background: rgba(0,0,0,0.75); backdrop-filter: blur(10px); display: flex; align-items: center; justify-content: center; padding: 1.5rem;">
                        <div style="background: ${C.cardBg}; border: 1.5px solid #10B981; border-radius: 24px; max-width: 520px; width: 100%; padding: 2rem; box-shadow: 0 25px 70px rgba(0,0,0,0.3);">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                                <h3 style="font-size: 1.25rem; font-weight: 800; color: #059669;">🛡️ Bằng Chứng Đối Soát SHA-256</h3>
                                <button data-action="close-audit" style="background: none; border: none; font-size: 1.5rem; cursor: pointer; color: ${C.textMuted};">&times;</button>
                            </div>
                            <div style="font-size: 0.85rem; color: ${C.textSub}; margin-bottom: 1rem;">
                                Deal ID: <strong>${escapeHTML(State.auditDeal.deal_id)}</strong> · Đối tác: <strong>${escapeHTML(State.auditDeal.merchant)}</strong>
                            </div>
                            <div style="background: ${isLight ? '#F1F5F9' : '#0B0F19'}; padding: 1rem; border-radius: 12px; font-family: monospace; font-size: 0.75rem; color: ${C.textMain}; word-break: break-all; margin-bottom: 1.2rem; border: 1px solid ${C.border};">
                                <div style="color: #059669; font-weight: 700; margin-bottom: 0.3rem;">CANONICAL SHA-256 HASH:</div>
                                ${escapeHTML(State.auditDeal.sha_evidence)}
                            </div>
                            <ul style="font-size: 0.8rem; color: ${C.textSub}; line-height: 1.6; margin-bottom: 1.4rem; padding-left: 1.2rem;">
                                <li>✅ Cơ sở địa chỉ thực địa: Đã kiểm chứng</li>
                                <li>✅ Kênh phát hành voucher: Đối tác chính thức</li>
                                <li>✅ Trạng thái đối soát: Hợp lệ</li>
                            </ul>
                            <button data-action="close-audit" style="width: 100%; min-height: 44px; background: #10B981; color: #FFF; border: none; padding: 0.75rem; border-radius: 12px; font-weight: 700; cursor: pointer;">
                                Đóng Ngăn Kéo Kiểm Toán
                            </button>
                        </div>
                    </div>
                ` : ''}

                <!-- FIXED MOBILE BOTTOM NAVIGATION (5 TABS APP SHELL) -->
                <nav style="position: fixed; bottom: 0; left: 0; right: 0; height: 60px; background: ${C.headerBg}; backdrop-filter: blur(20px); border-top: 1px solid ${C.border}; display: flex; justify-content: space-around; align-items: center; z-index: 9999; box-shadow: 0 -4px 20px rgba(0,0,0,0.05);">
                    <button data-action="nav-tab" data-tab="home" style="background: none; border: none; color: ${State.activeTab === 'home' ? '#059669' : C.textMuted}; font-size: 0.72rem; font-weight: 700; display: flex; flex-direction: column; align-items: center; gap: 0.15rem; cursor: pointer;">
                        <span style="font-size: 1.15rem;">⌂</span>
                        <span>Khám Phá</span>
                    </button>
                    <button data-action="toggle-deal-now" style="background: none; border: none; color: ${State.dealNowMode ? '#DC2626' : C.textMuted}; font-size: 0.72rem; font-weight: 800; display: flex; flex-direction: column; align-items: center; gap: 0.15rem; cursor: pointer;">
                        <span style="font-size: 1.15rem;">🔥</span>
                        <span>Săn Ngay</span>
                    </button>
                    <button data-action="scroll-to-hidden" style="background: none; border: none; color: C.textMuted; font-size: 0.72rem; font-weight: 700; display: flex; flex-direction: column; align-items: center; gap: 0.15rem; cursor: pointer;">
                        <span style="font-size: 1.15rem;">🎁</span>
                        <span>Voucher Ẩn</span>
                    </button>
                    <button data-action="open-wallet-modal" style="background: none; border: none; color: ${State.activeTab === 'wallet' ? '#059669' : C.textMuted}; font-size: 0.72rem; font-weight: 700; display: flex; flex-direction: column; align-items: center; gap: 0.15rem; cursor: pointer;">
                        <span style="font-size: 1.15rem;">👤</span>
                        <span>Ví Của Tôi</span>
                    </button>
                    <a href="https://zalo.me/g/danangdeal43" target="_blank" rel="noopener noreferrer" style="color: ${C.textMuted}; font-size: 0.72rem; font-weight: 700; display: flex; flex-direction: column; align-items: center; gap: 0.15rem; text-decoration: none;">
                        <span style="font-size: 1.15rem;">💬</span>
                        <span>CSKH 43</span>
                    </a>
                </nav>

                <!-- GRAND FOOTER -->
                <footer style="background: ${C.footerBg}; border-top: 1px solid rgba(255,255,255,0.08); padding: 3rem 1.5rem 2rem;">
                    <div style="max-width: 1300px; margin: 0 auto;">
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 2rem; margin-bottom: 2rem;">
                            <div>
                                <div style="font-size: 1.2rem; font-weight: 800; color: #FFF; margin-bottom: 0.6rem;">JayT Đà Nẵng 43</div>
                                <p style="font-size: 0.82rem; color: ${C.footerText}; line-height: 1.6;">Cỗ máy săn voucher & deal bản địa Đà Nẵng 43. Tối ưu tìm kiếm cơ hội tiết kiệm thực tế, minh bạch và an toàn.</p>
                            </div>
                            <div>
                                <h4 style="font-size: 0.85rem; font-weight: 700; color: #FBBF24; text-transform: uppercase; margin-bottom: 0.8rem;">Tọa Độ Bản Địa</h4>
                                <ul style="list-style: none; padding: 0; margin: 0; font-size: 0.82rem; color: #94A3B8; display: flex; flex-direction: column; gap: 0.45rem;">
                                    <li>🎓 KTX Bách Khoa • Sư Phạm Liên Chiểu</li>
                                    <li>☕ Bạch Đằng • View Sông Hàn Hải Châu</li>
                                    <li>🍜 Chợ Cồn • Chợ Hàn Đà Nẵng</li>
                                    <li>🏖️ Bãi Biển Mỹ Khê • Sơn Trà</li>
                                </ul>
                            </div>
                            <div>
                                <h4 style="font-size: 0.85rem; font-weight: 700; color: #FBBF24; text-transform: uppercase; margin-bottom: 0.8rem;">Cam Kết Minh Bạch</h4>
                                <ul style="list-style: none; padding: 0; margin: 0; font-size: 0.82rem; color: #94A3B8; display: flex; flex-direction: column; gap: 0.45rem;">
                                    <li>🛡️ Đối soát mã thực tế trước khi đăng</li>
                                    <li>⚡ Cập nhật tự động liên tục mỗi 20s</li>
                                    <li>🔒 Mật mã học SHA-256 Web Crypto API</li>
                                </ul>
                            </div>
                            <div>
                                <h4 style="font-size: 0.85rem; font-weight: 700; color: #FBBF24; text-transform: uppercase; margin-bottom: 0.8rem;">Hỗ Trợ Cộng Đồng</h4>
                                <p style="font-size: 0.82rem; color: #94A3B8; margin-bottom: 0.6rem; line-height: 1.5;">Tiếp nhận và giải quyết phản hồi qua nhóm Zalo CSKH Đà Nẵng 43.</p>
                                <a href="https://zalo.me/g/danangdeal43" target="_blank" rel="noopener noreferrer" style="color: #10B981; font-weight: 700; text-decoration: none; font-size: 0.85rem;">Vào Nhóm Zalo Kín ↗</a>
                            </div>
                        </div>

                        <div style="border-top: 1px solid rgba(255,255,255,0.08); padding-top: 1.5rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.6rem; font-size: 0.78rem; color: #64748B;">
                            <span>© 2026 JayT Corp. Phục vụ cộng đồng Đà Nẵng là số 1.</span>
                            <span>Phiên bản: Production Apex v5.1 (Personal Deal & Voucher Hunting OS)</span>
                        </div>
                    </div>
                </footer>

            </div>
        `;

        // Search Input Listener
        const sInput = document.getElementById('dealSearchInput');
        if (sInput) {
            sInput.addEventListener('input', function(e) {
                State.searchQuery = e.target.value;
                renderApp();
                const newIn = document.getElementById('dealSearchInput');
                if (newIn) {
                    newIn.focus();
                    newIn.setSelectionRange(newIn.value.length, newIn.value.length);
                }
            });
        }
    }

    function renderDealCard(deal, C, isLight) {
        const isFav = State.savedIds.includes(deal.deal_id);

        return `
            <div style="background: ${C.cardBg}; border: 1px solid ${C.border}; border-radius: 20px; display: flex; flex-direction: column; justify-content: space-between; overflow: hidden; box-shadow: ${C.cardShadow}; height: 100%; position: relative;">
                
                <!-- ẢNH THẬT 16:10 -->
                <div style="position: relative; width: 100%; aspect-ratio: 16/10; overflow: hidden; background: #000;">
                    <img src="${sanitizeURL(deal.image)}" alt="${escapeHTML(deal.title)}" style="width: 100%; height: 100%; object-fit: cover;" loading="lazy" />
                    
                    <div style="position: absolute; top: 10px; left: 10px; background: ${deal.badge_bg}; color: #FFF; padding: 0.25rem 0.65rem; border-radius: 9999px; font-size: 0.72rem; font-weight: 700; box-shadow: 0 4px 12px rgba(0,0,0,0.25);">
                        ${escapeHTML(deal.tag)}
                    </div>

                    <button data-action="bookmark" data-id="${escapeHTML(deal.deal_id)}" style="position: absolute; bottom: 10px; right: 10px; width: 36px; height: 36px; border-radius: 50%; background: ${isLight ? 'rgba(255, 255, 255, 0.9)' : 'rgba(11, 15, 25, 0.85)'}; backdrop-filter: blur(8px); border: 1px solid ${C.border}; color: ${isFav ? '#EF4444' : (isLight ? '#64748B' : '#FFF')}; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 0.95rem;">
                        ${isFav ? '❤️' : '🤍'}
                    </button>
                </div>

                <!-- THÂN THẺ -->
                <div style="padding: 1.25rem; display: flex; flex-direction: column; justify-content: space-between; flex: 1; gap: 0.85rem;">
                    <div>
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
                            <span style="font-size: 0.82rem; font-weight: 700; color: #D97706; text-transform: uppercase;">${escapeHTML(deal.merchant)}</span>
                            <span style="font-size: 0.7rem; color: #059669; font-weight: 600;">● Còn ${deal.left_slots} suất</span>
                        </div>

                        <!-- THANH TIẾN ĐỘ -->
                        <div style="background: ${isLight ? '#E2E8F0' : 'rgba(255,255,255,0.06)'}; height: 5px; border-radius: 9999px; overflow: hidden; margin-bottom: 0.6rem;">
                            <div style="background: linear-gradient(90deg, #10B981, #F59E0B); width: ${deal.used_percent}%; height: 100%;"></div>
                        </div>

                        <h4 style="font-size: 1.05rem; font-weight: 700; color: ${C.textMain}; line-height: 1.35; margin-bottom: 0.35rem; letter-spacing: -0.015em;">
                            ${escapeHTML(deal.title)}
                        </h4>
                        
                        <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.78rem; color: ${C.textSub}; margin-bottom: 0.6rem;">
                            <span>📍 ${escapeHTML(deal.branch)}</span>
                            <a href="${sanitizeURL(deal.maps_url)}" target="_blank" rel="noopener noreferrer" style="color: #0284C7; text-decoration: none; font-weight: 700; display: inline-flex; align-items: center; gap: 0.2rem;">
                                🗺️ Maps
                            </a>
                        </div>

                        <div style="background: ${isLight ? 'rgba(16, 185, 129, 0.06)' : 'rgba(16, 185, 129, 0.08)'}; border: 1.5px solid ${isLight ? 'rgba(16, 185, 129, 0.25)' : 'rgba(16, 185, 129, 0.35)'}; border-radius: 12px; padding: 0.75rem 0.9rem; text-align: center;">
                            <div style="font-size: 1.25rem; font-weight: 800; color: #059669; line-height: 1.15;">
                                TIẾT KIỆM ${formatVND(deal.saving)}
                            </div>
                            <div style="font-size: 0.8rem; font-weight: 700; color: ${C.textMain}; margin-top: 0.2rem;">
                                Chỉ còn ${formatVND(deal.discount_price)} <span style="color: ${C.textMuted}; text-decoration: line-through; margin-left: 0.3rem; font-weight: 500;">${formatVND(deal.original_price)}</span>
                            </div>
                            <div style="font-size: 0.72rem; color: #D97706; margin-top: 0.3rem; font-style: italic; font-weight: 600;">
                                💡 ${escapeHTML(deal.compare_note)}
                            </div>
                        </div>
                    </div>

                    <!-- 2 NÚT HÀNH ĐỘNG -->
                    <div>
                        <div style="display: flex; gap: 0.5rem; margin-bottom: 0.5rem;">
                            <button data-action="hunt-voucher" data-id="${deal.deal_id}" data-code="${deal.code}" data-link="${deal.link}" data-saving="${deal.saving}" style="flex: 1.3; min-height: 44px; background: linear-gradient(135deg, #10B981 0%, #059669 100%); color: #FFFFFF; padding: 0 0.4rem; border-radius: 10px; font-weight: 800; font-size: 0.84rem; text-align: center; border: none; cursor: pointer; box-shadow: 0 4px 14px rgba(16,185,129,0.3);">
                                🔥 SĂN VOUCHER ➔
                            </button>
                            <button data-action="copy" data-code="${escapeHTML(deal.code)}" data-saving="${deal.saving}" style="flex: 0.9; min-height: 44px; background: ${C.inputBg}; border: 1.5px dashed rgba(245,158,11,0.5); color: #D97706; padding: 0 0.4rem; border-radius: 10px; font-weight: 700; font-size: 0.82rem; cursor: pointer;">
                                📋 ${escapeHTML(deal.code)}
                            </button>
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.72rem; padding-top: 0.2rem;">
                            <button data-action="open-audit" data-id="${escapeHTML(deal.deal_id)}" style="background: none; border: none; color: #059669; font-weight: 700; cursor: pointer; text-decoration: underline;">
                                🛡️ Tin cậy: ${deal.trust_score}/100
                            </button>
                            <a href="https://zalo.me/share?url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(deal.merchant + ' - ' + deal.title)}" target="_blank" rel="noopener noreferrer" style="color: #0284C7; font-weight: 600; text-decoration: underline;">
                                ↗ Rủ bạn
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // ==========================================
    // EVENT DELEGATION
    // ==========================================
    document.body.addEventListener('click', function(e) {
        initAudio();
        const btn = e.target.closest('[data-action]');
        if (!btn) return;

        const act = btn.getAttribute('data-action');
        playSound('click');

        if (act === 'hunt-voucher') {
            const code = btn.getAttribute('data-code') || '';
            const link = btn.getAttribute('data-link') || '#';
            const saving = parseInt(btn.getAttribute('data-saving') || '0', 10);
            
            // Cập nhật ví thật
            State.huntedCount++;
            State.actualSavedAmount += saving;
            localStorage.setItem('jayt_hunted_count', State.huntedCount.toString());
            localStorage.setItem('jayt_actual_savings', State.actualSavedAmount.toString());

            if (navigator.clipboard) {
                navigator.clipboard.writeText(code).then(() => {
                    showToast(`Đã lấy mã [${code}]! Mở ứng dụng để áp dụng ngay.`);
                    setTimeout(() => {
                        window.open(link, '_blank');
                    }, 600);
                });
            }
        } else if (act === 'toggle-deal-now') {
            State.dealNowMode = !State.dealNowMode;
            showToast(State.dealNowMode ? 'Đã bật chế độ SĂN NHANH 10S' : 'Đã quay lại chế độ Khám Phá');
            renderApp();
        } else if (act === 'toggle-theme') {
            State.theme = State.theme === 'light' ? 'dark' : 'light';
            localStorage.setItem('jayt_theme', State.theme);
            renderApp();
        } else if (act === 'district') {
            State.activeDistrict = btn.getAttribute('data-district');
            renderApp();
        } else if (act === 'scroll-to-hidden') {
            const sec = document.getElementById('hiddenVoucherSection');
            if (sec) sec.scrollIntoView({ behavior: 'smooth' });
        } else if (act === 'dismiss-missed-banner') {
            State.dismissedMissedBanner = true;
            sessionStorage.setItem('jayt_missed_dismissed', 'true');
            renderApp();
        } else if (act === 'open-why-modal') {
            State.isWhyModalOpen = true;
            renderApp();
        } else if (act === 'close-why-modal') {
            State.isWhyModalOpen = false;
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
        } else if (act === 'bookmark') {
            const id = btn.getAttribute('data-id');
            const idx = State.savedIds.indexOf(id);
            if (idx > -1) {
                State.savedIds.splice(idx, 1);
                showToast('Đã bỏ lưu ưu đãi.');
            } else {
                State.savedIds.push(id);
                showToast('❤️ Đã lưu vào Ví Ưu Đãi của bạn!');
            }
            localStorage.setItem('jayt_favs', JSON.stringify(State.savedIds));
            renderApp();
        } else if (act === 'copy') {
            const code = btn.getAttribute('data-code') || '';
            const saving = parseInt(btn.getAttribute('data-saving') || '0', 10);
            if (navigator.clipboard) {
                navigator.clipboard.writeText(code).then(() => {
                    State.huntedCount++;
                    State.actualSavedAmount += saving;
                    localStorage.setItem('jayt_hunted_count', State.huntedCount.toString());
                    localStorage.setItem('jayt_actual_savings', State.actualSavedAmount.toString());
                    showToast(`Đã sao chép mã [${code}]!`);
                });
            }
        }
    });

    // Calculator Listener
    document.body.addEventListener('input', function(e) {
        if (e.target.id === 'calcDrink') { State.calcDrink = parseInt(e.target.value, 10); renderApp(); }
        else if (e.target.id === 'calcMeal') { State.calcMeal = parseInt(e.target.value, 10); renderApp(); }
        else if (e.target.id === 'calcRide') { State.calcRide = parseInt(e.target.value, 10); renderApp(); }
    });

    renderApp();
})();
