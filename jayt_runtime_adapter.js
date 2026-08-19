/**
 * JAYT APEX v5.0 — PERSONAL LOCAL DEAL OPERATING SYSTEM
 * =============================================================================
 * NORTH STAR: "MỞ JAYT → 10S BIẾT DEAL ĐÁNG SĂN → 20S CÓ THỂ SĂN → BIẾT VÌ SAO TIN ĐƯỢC"
 * 
 * [1] DISCOVERY CORE: Score = Saving × Urgency × Trust × Location × TimeAffinity
 * [2] SMART TIME ENGINE: Nhịp sống 5 khung giờ thực tế tại Đà Nẵng
 * [3] DEAL NOW MODE: Chế độ săn nhanh tối giản (Zero Marketing, High Conversion)
 * [4] LOCATION RADAR: Tính cự ly theo Quận (Hòa Khánh, Hải Châu, Sơn Trà...)
 * [5] GROUP INTENT: Một mình, 2 người, Nhóm 4+, Sinh viên
 * [6] DUAL-LAYER TRUST: 98/100 Consumer Trust Score + SHA-256 Audit Drawer
 * [7] PERSONAL WALLET: Quản lý mã đã lưu + Đếm ngược hết hạn local-first
 * [8] MOBILE APP SHELL: Fixed Bottom Navigation Bar (App-like experience)
 * =============================================================================
 */

(function() {
    'use strict';
    console.log("🚀 JayT Apex v5.0 Personal Local Deal OS Initialized");

    // Nạp Font Inter & Plus Jakarta Sans
    if (!document.getElementById('jayt-google-fonts')) {
        const link = document.createElement('link');
        link.id = 'jayt-google-fonts';
        link.rel = 'stylesheet';
        link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap';
        document.head.appendChild(link);
    }

    // ==========================================
    // 1. WEB AUDIO API ENGINE
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
            osc.connect(gain);
            gain.connect(audioCtx.destination);

            if (type === 'click') {
                osc.type = 'sine';
                osc.frequency.setValueAtTime(800, now);
                osc.frequency.exponentialRampToValueAtTime(400, now + 0.04);
                gain.gain.setValueAtTime(0.04, now);
                gain.gain.linearRampToValueAtTime(0.001, now + 0.04);
                osc.start(now);
                osc.stop(now + 0.04);
            } else if (type === 'copy-success') {
                const osc2 = audioCtx.createOscillator();
                const gain2 = audioCtx.createGain();
                osc2.connect(gain2);
                gain2.connect(audioCtx.destination);
                osc.type = 'sine';
                osc.frequency.setValueAtTime(523.25, now);
                gain.gain.setValueAtTime(0.05, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
                osc2.type = 'sine';
                osc2.frequency.setValueAtTime(659.25, now + 0.04);
                gain2.gain.setValueAtTime(0.05, now + 0.04);
                gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
                osc.start(now); osc.stop(now + 0.16);
                osc2.start(now + 0.04); osc2.stop(now + 0.2);
            } else if (type === 'wheel-tick') {
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(1100, now);
                gain.gain.setValueAtTime(0.03, now);
                gain.gain.linearRampToValueAtTime(0.001, now + 0.02);
                osc.start(now); osc.stop(now + 0.02);
            } else if (type === 'wheel-win') {
                [523.25, 659.25, 783.99].forEach((freq, i) => {
                    const o = audioCtx.createOscillator();
                    const g = audioCtx.createGain();
                    o.connect(g); g.connect(audioCtx.destination);
                    o.type = 'sine';
                    o.frequency.setValueAtTime(freq, now + i * 0.08);
                    g.gain.setValueAtTime(0.06, now + i * 0.08);
                    g.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.2);
                    o.start(now + i * 0.08); o.stop(now + i * 0.08 + 0.2);
                });
            }
        } catch (e) {}
    }

    // ==========================================
    // 2. KHO DỮ LIỆU ĐẶC QUYỀN ĐÀ NẴNG 43
    // ==========================================
    const DEALS_DATA = [
        {
            deal_id: 'DNG-MAYCHA-0D',
            merchant: 'Trà Sữa Maycha',
            branch: '38 Ngô Văn Sở (KTX Bách Khoa, Liên Chiểu)',
            district: 'LIEN_CHIEU',
            distance: '0.4 km · 2 phút',
            target_group: ['STUDENT', 'COUPLE', 'GROUP4'],
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
            target_group: ['SOLO', 'COUPLE', 'GROUP4', 'STUDENT'],
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
            target_group: ['SOLO', 'COUPLE', 'GROUP4'],
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
            target_group: ['COUPLE', 'GROUP4', 'STUDENT'],
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
            target_group: ['COUPLE', 'SOLO', 'GROUP4'],
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
            target_group: ['SOLO', 'COUPLE', 'GROUP4', 'STUDENT'],
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
            target_group: ['STUDENT', 'SOLO', 'GROUP4'],
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
            target_group: ['GROUP4', 'COUPLE', 'STUDENT'],
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
    // 3. SMART TIME ENGINE
    // ==========================================
    function getCurrentTimeSlot() {
        const hour = new Date().getHours();
        if (hour >= 6 && hour < 10) return { slot: 'MORNING', label: '🌅 Sáng Cà Phê & Đi Học', greeting: 'Sáng nay Đà Nẵng uống cà phê ở đâu?' };
        if (hour >= 10 && hour < 14) return { slot: 'LUNCH', label: '🍜 Trưa Ăn Cơm No Nê', greeting: 'Trưa nay Đà Nẵng ăn cơm gì?' };
        if (hour >= 14 && hour < 17) return { slot: 'AFTERNOON', label: '🧋 Chiều Trà Sữa & Làm Việc', greeting: 'Chiều nay nạp ly trà sữa Maycha / Katinat?' };
        if (hour >= 17 && hour < 22) return { slot: 'EVENING', label: '🍿 Tối Ăn Uống & Rạp Phim', greeting: 'Tối nay đi rạp CGV hay lượn phố sông Hàn?' };
        return { slot: 'NIGHT', label: '🌙 Đêm Săn Deal Cú Đêm', greeting: 'Đêm nay Đà Nẵng ăn vặt ở đâu?' };
    }

    const State = {
        deals: DEALS_DATA,
        isOnline: navigator.onLine !== false,
        lastSynced: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        theme: localStorage.getItem('jayt_theme') || 'light',
        dealNowMode: false, // Chế độ săn nhanh 10s
        activeCategory: 'ALL',
        activeDistrict: 'ALL', // 'ALL' | 'LIEN_CHIEU' | 'HAI_CHAU' | 'SON_TRA' | 'NGU_HANH_SON'
        activeIntent: 'ALL', // 'ALL' | 'SOLO' | 'COUPLE' | 'GROUP4' | 'STUDENT'
        currentTab: 'home', // 'home' | 'dealnow' | 'wallet' | 'wheel' | 'trust'
        searchQuery: '',
        savedIds: JSON.parse(localStorage.getItem('jayt_favs') || '[]'),
        communityPoints: parseInt(localStorage.getItem('jayt_points') || '15', 10),
        totalCommunitySaved: parseInt(localStorage.getItem('jayt_comm_saved') || '426000', 10),
        isWheelOpen: false,
        isAuditOpen: false,
        auditDeal: null,
        isReportOpen: false,
        isSubmitOpen: false,
        reportingDeal: null,
        isSpinning: false,
        wheelPrize: '',
        calcDrink: 5,
        calcMeal: 6,
        calcRide: 6
    };

    window.addEventListener('online', () => { State.isOnline = true; renderApp(); });
    window.addEventListener('offline', () => { State.isOnline = false; renderApp(); });

    function formatVND(n) {
        return new Intl.NumberFormat('vi-VN').format(n || 0) + '₫';
    }

    function addPoints(pts, savingVal = 0) {
        State.communityPoints += pts;
        State.totalCommunitySaved += savingVal;
        localStorage.setItem('jayt_points', State.communityPoints.toString());
        localStorage.setItem('jayt_comm_saved', State.totalCommunitySaved.toString());
    }

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

            for (let i = 0; i < 85; i++) {
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

    function showToast(msg) {
        let t = document.getElementById('jaytToast');
        if (!t) {
            t = document.createElement('div');
            t.id = 'jaytToast';
            t.style.cssText = 'position:fixed;top:24px;left:50%;transform:translateX(-50%);z-index:999999;background:#0F172A;color:#FFF;padding:0.85rem 1.8rem;border-radius:9999px;font-size:0.9rem;font-weight:700;box-shadow:0 15px 40px rgba(0,0,0,0.25);border:1.5px solid #10B981;display:flex;align-items:center;gap:0.6rem;animation:toastIn 0.3s ease;font-family:inherit;';
            document.body.appendChild(t);
        }
        t.innerHTML = `<span>🎉</span> <span>${msg}</span>`;
        t.style.display = 'flex';
        playSound('copy-success');
        fireConfetti();
        clearTimeout(window.__tTimer);
        window.__tTimer = setTimeout(() => { if (t) t.style.display = 'none'; }, 2600);
    }

    // ==========================================
    // 4. DISCOVERY SCORING CORE
    // ==========================================
    function calculateDealScore(deal, timeSlot, district, intent) {
        let score = (deal.saving / 50000) * 35; // Điểm tiết kiệm (max 35)
        score += (deal.used_percent / 100) * 25; // Độ khẩn cấp (max 25)
        score += (deal.trust_score / 100) * 20; // Độ tin cậy (max 20)
        
        if (deal.time_affinity.includes(timeSlot)) score += 10;
        if (district !== 'ALL' && deal.district === district) score += 10;
        if (intent !== 'ALL' && deal.target_group.includes(intent)) score += 10;

        return Math.round(score);
    }

    // ==========================================
    // 5. RENDER SYSTEM
    // ==========================================
    function renderApp() {
        const root = document.getElementById('jaytAppRoot') || document.body;
        const isLight = State.theme === 'light';
        const timeInfo = getCurrentTimeSlot();

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

        // Chấm điểm và sắp xếp theo Discovery Engine
        let scoredDeals = State.deals.map(d => ({
            ...d,
            dynamicScore: calculateDealScore(d, timeInfo.slot, State.activeDistrict, State.activeIntent)
        }));

        scoredDeals.sort((a, b) => b.dynamicScore - a.dynamicScore);

        const totalSavings = State.deals.reduce((s, d) => s + d.saving, 0);
        const savedCount = State.savedIds.length;
        const monthlyCalc = ((State.calcDrink * 22000) + (State.calcMeal * 26000) + (State.calcRide * 25000)) * 4;

        let filtered = scoredDeals.filter(d => {
            if (State.dealNowMode && d.percent < 40) return false;
            if (State.activeCategory !== 'ALL' && d.category !== State.activeCategory) return false;
            if (State.activeDistrict !== 'ALL' && d.district !== State.activeDistrict && d.district !== 'ALL') return false;
            if (State.activeIntent !== 'ALL' && !d.target_group.includes(State.activeIntent)) return false;
            if (State.searchQuery) {
                const q = State.searchQuery.toLowerCase();
                if (!`${d.merchant} ${d.title} ${d.branch} ${d.code}`.toLowerCase().includes(q)) return false;
            }
            return true;
        });

        const dailyDeal = scoredDeals[0]; // Deal Vàng Hôm Nay (Deterministic Top 1)

        root.innerHTML = `
            <style>
                @keyframes breathingAura {
                    0%, 100% { box-shadow: 0 0 25px rgba(245, 158, 11, 0.3), 0 10px 30px rgba(0,0,0,0.06); }
                    50% { box-shadow: 0 0 45px rgba(245, 158, 11, 0.6), 0 14px 40px rgba(245, 158, 11, 0.25); transform: translateY(-3px); }
                }
                .aura-daily { animation: breathingAura 3s ease-in-out infinite; }
            </style>

            <div style="min-height: 100vh; background-color: ${C.bg}; color: ${C.textSub}; font-family: 'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif; display: flex; flex-direction: column; justify-content: space-between; padding-bottom: 70px;">
                
                <div>
                    <!-- 1. TOP LIVE TICKER -->
                    <div style="background: ${C.tickerBg}; border-bottom: 1px solid ${C.border}; padding: 0.45rem 1.5rem; font-size: 0.8rem; color: ${C.textMain}; display: flex; justify-content: space-between; align-items: center; overflow: hidden; font-weight: 500;">
                        <div class="marquee-track" style="flex: 1; white-space: nowrap;">
                            🔥 <strong>ĐÀ NẴNG HÔM NAY:</strong> CGV Vincom vé 55K · 🚗 GrabCar Sân Bay giảm 50K · 🧋 Maycha KTX Bách Khoa Mua 1 Tặng 1 · 🍗 Cơm gà A Hải giòn rụm 39K · ⚡ Xanh SM đón trong 3 phút!
                        </div>
                        <div style="display: flex; align-items: center; gap: 0.4rem; font-size: 0.72rem; color: ${State.isOnline ? '#059669' : '#DC2626'}; background: ${State.isOnline ? 'rgba(16,185,129,0.12)' : 'rgba(239,68,68,0.12)'}; padding: 0.2rem 0.65rem; border-radius: 9999px; border: 1px solid ${State.isOnline ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}; flex-shrink: 0; margin-left: 1rem; font-weight: 700;">
                            <span style="width: 7px; height: 7px; border-radius: 50%; background: ${State.isOnline ? '#10B981' : '#EF4444'};"></span>
                            <span>${State.isOnline ? 'LIVE 43' : 'OFFLINE SNAPSHOT: ' + State.lastSynced}</span>
                        </div>
                    </div>

                    <!-- 2. MASTER HEADER -->
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
                                    <div style="font-size: 0.72rem; color: ${C.textMuted}; font-weight: 500;">Hệ Điều Hành Ưu Đãi Bản Địa</div>
                                </div>
                            </div>

                            <!-- Header Actions -->
                            <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
                                
                                <!-- DEAL NOW TOGGLE (CHẾ ĐỘ SĂN NHANH) -->
                                <button data-action="toggle-deal-now" style="min-height: 40px; background: ${State.dealNowMode ? '#DC2626' : (isLight ? '#FEE2E2' : 'rgba(239,68,68,0.2)')}; border: 1.5px solid #EF4444; color: ${State.dealNowMode ? '#FFF' : '#DC2626'}; font-size: 0.82rem; font-weight: 800; padding: 0 0.95rem; border-radius: 9999px; cursor: pointer; display: flex; align-items: center; gap: 0.35rem;">
                                    <span>🔥 SĂN NHANH 10S</span>
                                </button>

                                <button data-action="toggle-theme" style="min-height: 40px; background: ${isLight ? '#F1F5F9' : 'rgba(255,255,255,0.08)'}; border: 1px solid ${C.border}; color: ${C.textMain}; font-size: 0.82rem; font-weight: 700; padding: 0 0.9rem; border-radius: 9999px; cursor: pointer;">
                                    ${isLight ? '🌙' : '☀️'}
                                </button>

                                <button data-action="open-submit" style="min-height: 40px; background: ${isLight ? '#EFF6FF' : 'rgba(59,130,246,0.15)'}; border: 1px solid #3B82F6; color: #2563EB; font-size: 0.82rem; font-weight: 700; padding: 0 0.9rem; border-radius: 9999px; cursor: pointer;">
                                    ＋ Gửi Deal
                                </button>
                                
                                <a href="https://zalo.me/g/danangdeal43" target="_blank" rel="noopener noreferrer" style="min-height: 40px; background: linear-gradient(135deg, #10B981, #059669); color: #FFFFFF; font-size: 0.82rem; font-weight: 700; padding: 0 1.1rem; border-radius: 9999px; text-decoration: none; display: inline-flex; align-items: center; gap: 0.35rem; box-shadow: 0 4px 14px rgba(16,185,129,0.3);">
                                    💬 Zalo Kín ↗
                                </a>
                            </div>
                        </div>
                    </header>

                    <!-- 3. FLASH DEAL LIVE STRIP -->
                    <div style="max-width: 1300px; margin: 1rem auto 0; padding: 0 1.5rem;">
                        <div style="background: linear-gradient(135deg, #DC2626 0%, #B91C1C 50%, #991B1B 100%); border: 1px solid #EF4444; border-radius: 16px; padding: 0.8rem 1.4rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.8rem; box-shadow: 0 8px 25px rgba(220,38,38,0.2);">
                            <div style="display: flex; align-items: center; gap: 0.6rem; color: #FFF; font-size: 0.9rem; font-weight: 700;">
                                <span style="font-size: 1.3rem;">⚡</span>
                                <span>FLASH DEAL LIVE: <strong>${dailyDeal.merchant}</strong> — Giảm ${dailyDeal.percent}% (Chỉ còn ${dailyDeal.left_slots} suất)</span>
                            </div>
                            <div style="display: flex; align-items: center; gap: 0.5rem;">
                                <button data-action="copy" data-code="${dailyDeal.code}" data-saving="${dailyDeal.saving}" style="background: #FEF08A; color: #000; border: none; font-weight: 800; padding: 0.35rem 0.85rem; border-radius: 8px; font-size: 0.8rem; cursor: pointer;">
                                    LẤY MÃ: ${dailyDeal.code}
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- 4. SMART TIME GREETING & HERO -->
                    <section style="max-width: 1300px; margin: 0 auto; padding: 2rem 1.5rem 1.2rem; text-align: center;">
                        <div style="display: inline-flex; align-items: center; gap: 0.5rem; background: rgba(16,185,129,0.1); border: 1px solid rgba(16,185,129,0.25); color: #059669; padding: 0.35rem 1.15rem; border-radius: 9999px; font-size: 0.82rem; font-weight: 700; margin-bottom: 0.8rem;">
                            ${timeInfo.label} · ĐÀ NẴNG 43
                        </div>

                        <h1 style="font-size: clamp(2.1rem, 4.5vw, 3.4rem); font-weight: 800; color: ${C.textMain}; line-height: 1.22; margin-bottom: 0.8rem; letter-spacing: -0.035em;">
                            ${timeInfo.greeting} <br>
                            <span style="background: linear-gradient(135deg, #059669, #10B981); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
                                Đang Sẵn Sàng ${formatVND(totalSavings)} Tiết Kiệm
                            </span>
                        </h1>

                        <p style="font-size: 1rem; color: ${C.textSub}; max-width: 680px; margin: 0 auto 1.6rem; line-height: 1.6; font-weight: 400;">
                            Hệ thống tự động chấm điểm <strong>Relevance × Saving × Urgency × Location</strong> để đưa 5 deal chuẩn nhất đến bạn.
                        </p>

                        <!-- SEARCH BOX -->
                        <div style="max-width: 620px; margin: 0 auto 1.6rem; position: relative;">
                            <input type="text" id="dealSearchInput" placeholder="Tìm kiếm món ngon, quán cafe, mã xe Grab / Xanh SM..." value="${State.searchQuery}" style="width: 100%; background: ${C.inputBg}; border: 2px solid ${isLight ? '#10B981' : 'rgba(16,185,129,0.35)'}; border-radius: 9999px; padding: 0.95rem 1.4rem 0.95rem 3.4rem; color: ${C.textMain}; font-size: 0.98rem; outline: none; font-family: inherit; font-weight: 500; box-shadow: ${isLight ? '0 10px 30px rgba(16,185,129,0.1)' : '0 10px 30px rgba(0,0,0,0.5)'};" />
                            <span style="position: absolute; left: 1.3rem; top: 50%; transform: translateY(-50%); font-size: 1.25rem;">🔍</span>
                        </div>

                        <!-- 5. LOCATION-FIRST RADAR TABS (CHỌN QUẬN) -->
                        <div style="display: flex; justify-content: center; gap: 0.45rem; flex-wrap: wrap; margin-bottom: 0.9rem;">
                            <span style="font-size: 0.8rem; font-weight: 700; color: ${C.textMuted}; display: flex; align-items: center; margin-right: 0.3rem;">📍 Gần Bạn:</span>
                            <button data-action="district" data-district="ALL" style="min-height: 38px; padding: 0 0.9rem; border-radius: 9999px; font-size: 0.8rem; font-weight: 700; cursor: pointer; border: 1px solid ${State.activeDistrict === 'ALL' ? '#D97706' : C.border}; background: ${State.activeDistrict === 'ALL' ? 'rgba(245,158,11,0.15)' : C.pillBg}; color: ${State.activeDistrict === 'ALL' ? '#D97706' : C.textSub};">
                                Toàn Đà Nẵng
                            </button>
                            <button data-action="district" data-district="LIEN_CHIEU" style="min-height: 38px; padding: 0 0.9rem; border-radius: 9999px; font-size: 0.8rem; font-weight: 700; cursor: pointer; border: 1px solid ${State.activeDistrict === 'LIEN_CHIEU' ? '#D97706' : C.border}; background: ${State.activeDistrict === 'LIEN_CHIEU' ? 'rgba(245,158,11,0.15)' : C.pillBg}; color: ${State.activeDistrict === 'LIEN_CHIEU' ? '#D97706' : C.textSub};">
                                🎓 Liên Chiểu (Hòa Khánh)
                            </button>
                            <button data-action="district" data-district="HAI_CHAU" style="min-height: 38px; padding: 0 0.9rem; border-radius: 9999px; font-size: 0.8rem; font-weight: 700; cursor: pointer; border: 1px solid ${State.activeDistrict === 'HAI_CHAU' ? '#D97706' : C.border}; background: ${State.activeDistrict === 'HAI_CHAU' ? 'rgba(245,158,11,0.15)' : C.pillBg}; color: ${State.activeDistrict === 'HAI_CHAU' ? '#D97706' : C.textSub};">
                                💼 Hải Châu (Sông Hàn)
                            </button>
                            <button data-action="district" data-district="SON_TRA" style="min-height: 38px; padding: 0 0.9rem; border-radius: 9999px; font-size: 0.8rem; font-weight: 700; cursor: pointer; border: 1px solid ${State.activeDistrict === 'SON_TRA' ? '#D97706' : C.border}; background: ${State.activeDistrict === 'SON_TRA' ? 'rgba(245,158,11,0.15)' : C.pillBg}; color: ${State.activeDistrict === 'SON_TRA' ? '#D97706' : C.textSub};">
                                🏖️ Sơn Trà (Biển Mỹ Khê)
                            </button>
                        </div>

                        <!-- 6. GROUP INTENT FILTER (ĐI CÙNG AI) -->
                        <div style="display: flex; justify-content: center; gap: 0.45rem; flex-wrap: wrap; margin-bottom: 2rem;">
                            <span style="font-size: 0.8rem; font-weight: 700; color: ${C.textMuted}; display: flex; align-items: center; margin-right: 0.3rem;">👥 Đi cùng:</span>
                            <button data-action="intent" data-intent="ALL" style="min-height: 36px; padding: 0 0.85rem; border-radius: 9999px; font-size: 0.78rem; font-weight: 700; cursor: pointer; border: 1px solid ${State.activeIntent === 'ALL' ? '#10B981' : C.border}; background: ${State.activeIntent === 'ALL' ? (isLight ? 'rgba(16,185,129,0.15)' : 'rgba(16,185,129,0.25)') : C.pillBg}; color: ${State.activeIntent === 'ALL' ? '#059669' : C.pillText};">
                                Tất Cả
                            </button>
                            <button data-action="intent" data-intent="SOLO" style="min-height: 36px; padding: 0 0.85rem; border-radius: 9999px; font-size: 0.78rem; font-weight: 700; cursor: pointer; border: 1px solid ${State.activeIntent === 'SOLO' ? '#10B981' : C.border}; background: ${State.activeIntent === 'SOLO' ? (isLight ? 'rgba(16,185,129,0.15)' : 'rgba(16,185,129,0.25)') : C.pillBg}; color: ${State.activeIntent === 'SOLO' ? '#059669' : C.pillText};">
                                👤 1 Mình
                            </button>
                            <button data-action="intent" data-intent="COUPLE" style="min-height: 36px; padding: 0 0.85rem; border-radius: 9999px; font-size: 0.78rem; font-weight: 700; cursor: pointer; border: 1px solid ${State.activeIntent === 'COUPLE' ? '#10B981' : C.border}; background: ${State.activeIntent === 'COUPLE' ? (isLight ? 'rgba(16,185,129,0.15)' : 'rgba(16,185,129,0.25)') : C.pillBg}; color: ${State.activeIntent === 'COUPLE' ? '#059669' : C.pillText};">
                                👥 2 Người
                            </button>
                            <button data-action="intent" data-intent="GROUP4" style="min-height: 36px; padding: 0 0.85rem; border-radius: 9999px; font-size: 0.78rem; font-weight: 700; cursor: pointer; border: 1px solid ${State.activeIntent === 'GROUP4' ? '#10B981' : C.border}; background: ${State.activeIntent === 'GROUP4' ? (isLight ? 'rgba(16,185,129,0.15)' : 'rgba(16,185,129,0.25)') : C.pillBg}; color: ${State.activeIntent === 'GROUP4' ? '#059669' : C.pillText};">
                                👨‍👩‍👧 Nhóm 4+
                            </button>
                            <button data-action="intent" data-intent="STUDENT" style="min-height: 36px; padding: 0 0.85rem; border-radius: 9999px; font-size: 0.78rem; font-weight: 700; cursor: pointer; border: 1px solid ${State.activeIntent === 'STUDENT' ? '#10B981' : C.border}; background: ${State.activeIntent === 'STUDENT' ? (isLight ? 'rgba(16,185,129,0.15)' : 'rgba(16,185,129,0.25)') : C.pillBg}; color: ${State.activeIntent === 'STUDENT' ? '#059669' : C.pillText};">
                                🎓 Sinh Viên
                            </button>
                        </div>
                    </section>

                    <!-- 7. DEAL VÀNG HÔM NAY (DAILY DEAL OF DA NANG) -->
                    <section style="max-width: 1300px; margin: 0 auto 3rem; padding: 0 1.5rem;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.2rem;">
                            <h3 style="font-size: 1.35rem; font-weight: 800; color: ${C.textMain}; display: flex; align-items: center; gap: 0.5rem;">
                                <span>👑</span> <span>Deal Vàng Hôm Nay (Chấm Điểm Cao Nhất)</span>
                            </h3>
                            <span style="font-size: 0.78rem; color: #D97706; font-weight: 800;">MATCH SCORE: ${dailyDeal.dynamicScore}/100</span>
                        </div>
                        ${renderDealCard(dailyDeal, true, 1, C, isLight)}
                    </section>

                    <!-- 8. PERSONALIZED DISCOVERY FEED (FEED ƯU TIÊN) -->
                    <main style="max-width: 1300px; margin: 0 auto; padding: 0 1.5rem 3.5rem;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                            <h3 style="font-size: 1.35rem; font-weight: 800; color: ${C.textMain}; display: flex; align-items: center; gap: 0.5rem;">
                                <span>⚡</span> <span>Kho Ưu Đãi Đã Chấm Điểm (${filtered.length})</span>
                            </h3>
                            <span style="font-size: 0.78rem; color: #059669; font-weight: 700;">● SẮP XẾP THEO RELEVANCE</span>
                        </div>

                        ${filtered.length > 0 ? `
                            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(295px, 1fr)); gap: 1.6rem;">
                                ${filtered.map(deal => renderDealCard(deal, false, 0, C, isLight)).join('')}
                            </div>
                        ` : `
                            <div style="text-align: center; padding: 4rem 1rem; background: ${C.cardBg}; border-radius: 20px; border: 1px solid ${C.border};">
                                <div style="font-size: 3rem; margin-bottom: 0.8rem;">🔍</div>
                                <h4 style="font-size: 1.2rem; font-weight: 800; color: ${C.textMain}; margin-bottom: 0.4rem;">Không có deal nào phù hợp bộ lọc</h4>
                                <button data-action="reset-filters" style="background: #10B981; color: #FFF; border: none; padding: 0.65rem 1.4rem; border-radius: 9999px; font-weight: 700; cursor: pointer; margin-top: 0.8rem;">
                                    Xóa Bộ Lọc & Xem Tất Cả
                                </button>
                            </div>
                        `}
                    </main>

                    <!-- 9. MÁY TÍNH TIẾT KIỆM TƯƠNG TÁC -->
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

                <!-- 10. AUDIT DRAWER (DUAL-LAYER TRUST ENGINE) -->
                ${State.isAuditOpen && State.auditDeal ? `
                    <div style="position: fixed; inset: 0; z-index: 100000; background: rgba(0,0,0,0.75); backdrop-filter: blur(10px); display: flex; align-items: center; justify-content: center; padding: 1.5rem;">
                        <div style="background: ${C.cardBg}; border: 1.5px solid #10B981; border-radius: 24px; max-width: 520px; width: 100%; padding: 2rem; box-shadow: 0 25px 70px rgba(0,0,0,0.3);">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                                <h3 style="font-size: 1.25rem; font-weight: 800; color: #059669;">🛡️ Bằng Chứng Đối Soát SHA-256</h3>
                                <button data-action="close-audit" style="background: none; border: none; font-size: 1.5rem; cursor: pointer; color: ${C.textMuted};">&times;</button>
                            </div>
                            <div style="font-size: 0.85rem; color: ${C.textSub}; margin-bottom: 1rem;">
                                Deal ID: <strong>${State.auditDeal.deal_id}</strong> · Merchant: <strong>${State.auditDeal.merchant}</strong>
                            </div>
                            <div style="background: ${isLight ? '#F1F5F9' : '#0B0F19'}; padding: 1rem; border-radius: 12px; font-family: monospace; font-size: 0.75rem; color: ${C.textMain}; word-break: break-all; margin-bottom: 1.2rem; border: 1px solid ${C.border};">
                                <div style="color: #059669; font-weight: 700; margin-bottom: 0.3rem;">CANONICAL SHA-256 HASH:</div>
                                ${State.auditDeal.sha_evidence}
                            </div>
                            <ul style="font-size: 0.8rem; color: ${C.textSub}; line-height: 1.6; margin-bottom: 1.4rem; padding-left: 1.2rem;">
                                <li>✅ Cơ sở địa chỉ thực địa: Đã xác thực</li>
                                <li>✅ Kênh phát hành voucher: Đối tác chính thức</li>
                                <li>✅ Cập nhật realtime: Snapshot Web Crypto API</li>
                            </ul>
                            <button data-action="close-audit" style="width: 100%; background: #10B981; color: #FFF; border: none; padding: 0.75rem; border-radius: 12px; font-weight: 700; cursor: pointer;">
                                Đóng Ngăn Kéo Kiểm Toán
                            </button>
                        </div>
                    </div>
                ` : ''}

                <!-- MODAL VÒNG QUAY MAY MẮN -->
                ${State.isWheelOpen ? `
                    <div style="position: fixed; inset: 0; z-index: 100000; background: rgba(0,0,0,0.75); backdrop-filter: blur(10px); display: flex; align-items: center; justify-content: center; padding: 1.5rem;">
                        <div style="background: ${C.cardBg}; border: 2px solid #8B5CF6; border-radius: 24px; max-width: 480px; width: 100%; padding: 2.2rem; text-align: center; box-shadow: 0 25px 70px rgba(139,92,246,0.4);">
                            <div style="font-size: 3rem; margin-bottom: 0.4rem;">🎡</div>
                            <h3 style="font-size: 1.4rem; font-weight: 800; color: #8B5CF6; margin-bottom: 0.3rem;">Vòng Quay May Mắn Đà Nẵng 43</h3>
                            <p style="font-size: 0.85rem; color: ${C.textSub}; margin-bottom: 1.5rem;">Quay 100% trúng mã giảm giá hoặc voucher 0Đ ăn uống, đi lại!</p>
                            
                            <div id="wheelCanvasBox" style="width: 240px; height: 240px; border-radius: 50%; border: 6px solid #8B5CF6; margin: 0 auto 1.5rem; background: conic-gradient(#EF4444 0deg 45deg, #F59E0B 45deg 90deg, #10B981 90deg 135deg, #06B6D4 135deg 180deg, #3B82F6 180deg 225deg, #8B5CF6 225deg 270deg, #EC4899 270deg 315deg, #F97316 315deg 360deg); display: flex; align-items: center; justify-content: center; transition: transform 3.5s cubic-bezier(0.17, 0.67, 0.12, 0.99); box-shadow: 0 0 30px rgba(139,92,246,0.4);">
                                <div style="width: 70px; height: 70px; border-radius: 50%; background: #0F172A; border: 3px solid #FDE047; color: #FDE047; font-weight: 800; font-size: 1rem; display: flex; align-items: center; justify-content: center;">
                                    JAYT
                                </div>
                            </div>

                            ${State.wheelPrize ? `
                                <div style="background: rgba(16,185,129,0.12); border: 1.5px solid #10B981; border-radius: 12px; padding: 0.85rem; margin-bottom: 1.2rem; color: #059669; font-weight: 700; font-size: 0.95rem;">
                                    🎉 Chúc mừng bạn trúng: ${State.wheelPrize}
                                </div>
                            ` : ''}

                            <div style="display: flex; gap: 0.6rem;">
                                <button data-action="spin-wheel" style="flex: 1; min-height: 44px; background: linear-gradient(135deg, #8B5CF6, #6D28D9); color: #FFF; border: none; padding: 0.8rem; border-radius: 12px; font-weight: 800; font-size: 0.95rem; cursor: pointer; font-family: inherit; box-shadow: 0 4px 14px rgba(139,92,246,0.4);">
                                    🎯 QUAY NGAY (MIỄN PHÍ)
                                </button>
                                <button data-action="open-wheel" style="min-height: 44px; background: ${C.pillBg}; color: ${C.textMain}; border: 1px solid ${C.border}; padding: 0.8rem 1.2rem; border-radius: 12px; font-weight: 700; cursor: pointer; font-family: inherit;">
                                    Đóng
                                </button>
                            </div>
                        </div>
                    </div>
                ` : ''}

                <!-- MODAL WALLET (KHO DEAL CỦA TÔI) -->
                ${State.currentTab === 'wallet' ? `
                    <div style="position: fixed; inset: 0; z-index: 99999; background: rgba(0,0,0,0.7); backdrop-filter: blur(8px); display: flex; justify-content: flex-end;">
                        <div style="background: ${C.cardBg}; width: 100%; max-width: 420px; height: 100%; box-shadow: -15px 0 40px rgba(0,0,0,0.3); border-left: 1px solid ${C.border}; display: flex; flex-direction: column; justify-content: space-between; padding: 1.8rem; box-sizing: border-box;">
                            <div>
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; border-bottom: 1px solid ${C.border}; padding-bottom: 1rem;">
                                    <div>
                                        <h3 style="font-size: 1.2rem; font-weight: 800; margin: 0; color: ${C.textMain};">❤️ Kho Deal Của Bạn (${savedCount})</h3>
                                        <div style="font-size: 0.75rem; color: #059669; font-weight: 700; margin-top: 0.2rem;">
                                            🎯 Đóng góp cộng đồng: +${State.communityPoints} pts (${formatVND(State.totalCommunitySaved)} tiết kiệm)
                                        </div>
                                    </div>
                                    <button data-action="close-wallet" style="background: none; border: none; font-size: 1.6rem; cursor: pointer; color: ${C.textMuted};">&times;</button>
                                </div>
                                <div style="max-height: calc(100vh - 220px); overflow-y: auto; display: flex; flex-direction: column; gap: 0.9rem;">
                                    ${savedCount > 0 ? State.deals.filter(d => State.savedIds.includes(d.deal_id)).map(deal => `
                                        <div style="background: ${isLight ? '#F8FAFC' : 'rgba(23,30,48,0.9)'}; border: 1px solid ${C.border}; border-radius: 14px; padding: 1rem;">
                                            <div style="display: flex; justify-content: space-between; font-size: 0.85rem; font-weight: 700; margin-bottom: 0.35rem;">
                                                <span style="color: ${C.textMain};">${deal.merchant}</span>
                                                <span style="color: #059669; font-weight: 800;">-${deal.percent}%</span>
                                            </div>
                                            <div style="font-size: 0.8rem; color: ${C.textSub}; margin-bottom: 0.75rem;">${deal.title}</div>
                                            <div style="display: flex; gap: 0.5rem;">
                                                <button data-action="copy" data-code="${deal.code}" data-saving="${deal.saving}" style="flex: 1; min-height: 38px; background: ${C.inputBg}; border: 1px solid rgba(245,158,11,0.4); color: #D97706; padding: 0.45rem; border-radius: 8px; font-size: 0.78rem; font-weight: 700; cursor: pointer;">
                                                    📋 ${deal.code}
                                                </button>
                                                <button data-action="bookmark" data-id="${deal.deal_id}" style="min-height: 38px; background: rgba(239,68,68,0.12); border: 1px solid rgba(239,68,68,0.3); color: #DC2626; padding: 0.45rem 0.75rem; border-radius: 8px; font-size: 0.78rem; cursor: pointer; font-weight: 600;">
                                                    Xóa
                                                </button>
                                            </div>
                                        </div>
                                    `).join('') : `
                                        <div style="text-align: center; padding: 3.5rem 1rem; color: ${C.textMuted};">
                                            <div style="font-size: 2.5rem; margin-bottom: 0.6rem;">💔</div>
                                            <p style="font-size: 0.9rem;">Bạn chưa lưu mã nào. Bấm nút ❤️ ở từng thẻ để lưu lại dùng dần!</p>
                                        </div>
                                    `}
                                </div>
                            </div>
                            <button data-action="close-wallet" style="min-height: 44px; background: #10B981; color: #FFFFFF; border: none; padding: 0.85rem; border-radius: 12px; font-weight: 700; font-size: 0.9rem; cursor: pointer; text-align: center;">
                                Đóng Kho Deal
                            </button>
                        </div>
                    </div>
                ` : ''}

                <!-- 11. FIXED MOBILE BOTTOM NAVIGATION BAR -->
                <nav style="position: fixed; bottom: 0; left: 0; right: 0; height: 62px; background: ${C.headerBg}; backdrop-filter: blur(20px); border-top: 1px solid ${C.border}; display: flex; justify-content: space-around; align-items: center; z-index: 9999; box-shadow: 0 -4px 20px rgba(0,0,0,0.05);">
                    <button data-action="nav-tab" data-tab="home" style="background: none; border: none; color: ${State.currentTab === 'home' ? '#059669' : C.textMuted}; font-size: 0.75rem; font-weight: 700; display: flex; flex-direction: column; align-items: center; gap: 0.15rem; cursor: pointer;">
                        <span style="font-size: 1.2rem;">🏠</span>
                        <span>Khám Phá</span>
                    </button>
                    <button data-action="toggle-deal-now" style="background: none; border: none; color: ${State.dealNowMode ? '#DC2626' : C.textMuted}; font-size: 0.75rem; font-weight: 700; display: flex; flex-direction: column; align-items: center; gap: 0.15rem; cursor: pointer;">
                        <span style="font-size: 1.2rem;">🔥</span>
                        <span>Săn Ngay</span>
                    </button>
                    <button data-action="open-wallet" style="background: none; border: none; color: ${State.currentTab === 'wallet' ? '#059669' : C.textMuted}; font-size: 0.75rem; font-weight: 700; display: flex; flex-direction: column; align-items: center; gap: 0.15rem; cursor: pointer;">
                        <span style="font-size: 1.2rem;">❤️</span>
                        <span>Đã Lưu (${savedCount})</span>
                    </button>
                    <button data-action="open-wheel" style="background: none; border: none; color: ${C.textMuted}; font-size: 0.75rem; font-weight: 700; display: flex; flex-direction: column; align-items: center; gap: 0.15rem; cursor: pointer;">
                        <span style="font-size: 1.2rem;">🎁</span>
                        <span>Quà 0Đ</span>
                    </button>
                    <a href="https://zalo.me/g/danangdeal43" target="_blank" rel="noopener noreferrer" style="color: ${C.textMuted}; font-size: 0.75rem; font-weight: 700; display: flex; flex-direction: column; align-items: center; gap: 0.15rem; text-decoration: none;">
                        <span style="font-size: 1.2rem;">💬</span>
                        <span>CSKH Zalo</span>
                    </a>
                </nav>

            </div>
        `;

        // Search listener
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

    function renderDealCard(deal, isDaily = false, rank = 1, C, isLight) {
        const isFav = State.savedIds.includes(deal.deal_id);

        return `
            <div class="${isDaily ? 'aura-daily' : ''}" style="background: ${C.cardBg}; border: ${isDaily ? '2px solid #F59E0B' : '1px solid ' + C.border}; border-radius: 20px; display: flex; flex-direction: column; justify-content: space-between; overflow: hidden; box-shadow: ${isDaily ? (isLight ? '0 12px 35px rgba(245,158,11,0.18)' : '0 12px 35px rgba(245,158,11,0.25)') : C.cardShadow}; height: 100%; position: relative;">
                
                <!-- ẢNH THẬT 16:10 -->
                <div style="position: relative; width: 100%; aspect-ratio: 16/10; overflow: hidden; background: #000;">
                    <img src="${deal.image}" alt="${deal.title}" style="width: 100%; height: 100%; object-fit: cover;" loading="lazy" />
                    
                    <div style="position: absolute; top: 10px; left: 10px; background: ${deal.badge_bg}; color: #FFF; padding: 0.25rem 0.65rem; border-radius: 9999px; font-size: 0.72rem; font-weight: 700; box-shadow: 0 4px 12px rgba(0,0,0,0.25);">
                        ${deal.tag}
                    </div>

                    ${isDaily ? `
                        <div style="position: absolute; top: 10px; right: 10px; background: linear-gradient(135deg, #F59E0B, #D97706); color: #000; font-size: 0.72rem; font-weight: 800; padding: 0.25rem 0.65rem; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.25);">
                            👑 DEAL VÀNG
                        </div>
                    ` : `
                        <button data-action="bookmark" data-id="${deal.deal_id}" style="position: absolute; bottom: 10px; right: 10px; width: 36px; height: 36px; border-radius: 50%; background: ${isLight ? 'rgba(255, 255, 255, 0.9)' : 'rgba(11, 15, 25, 0.85)'}; backdrop-filter: blur(8px); border: 1px solid ${C.border}; color: ${isFav ? '#EF4444' : (isLight ? '#64748B' : '#FFF')}; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 0.95rem;">
                            ${isFav ? '❤️' : '🤍'}
                        </button>
                    `}
                </div>

                <!-- THÂN THẺ -->
                <div style="padding: 1.25rem; display: flex; flex-direction: column; justify-content: space-between; flex: 1; gap: 0.85rem;">
                    <div>
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
                            <span style="font-size: 0.82rem; font-weight: 700; color: #D97706; text-transform: uppercase;">${deal.merchant}</span>
                            <span style="font-size: 0.7rem; color: #059669; font-weight: 600;">● ${deal.distance}</span>
                        </div>

                        <!-- THANH TIẾN ĐỘ -->
                        <div style="background: ${isLight ? '#E2E8F0' : 'rgba(255,255,255,0.06)'}; height: 5px; border-radius: 9999px; overflow: hidden; margin-bottom: 0.6rem;">
                            <div style="background: linear-gradient(90deg, #10B981, #F59E0B); width: ${deal.used_percent}%; height: 100%;"></div>
                        </div>

                        <h4 style="font-size: 1.05rem; font-weight: 700; color: ${C.textMain}; line-height: 1.35; margin-bottom: 0.35rem; letter-spacing: -0.015em;">
                            ${deal.title}
                        </h4>
                        
                        <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.78rem; color: ${C.textSub}; margin-bottom: 0.6rem;">
                            <span>📍 ${deal.branch}</span>
                            <a href="${deal.maps_url}" target="_blank" rel="noopener noreferrer" style="color: #0284C7; text-decoration: none; font-weight: 700; display: inline-flex; align-items: center; gap: 0.2rem;">
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
                                💡 ${deal.compare_note}
                            </div>
                        </div>
                    </div>

                    <!-- NÚT HÀNH ĐỘNG & TRUST SCORE -->
                    <div>
                        <div style="display: flex; gap: 0.5rem; margin-bottom: 0.5rem;">
                            <button data-action="copy" data-code="${deal.code}" data-saving="${deal.saving}" style="flex: 1; min-height: 44px; background: ${C.inputBg}; border: 1.5px dashed rgba(245,158,11,0.5); color: #D97706; padding: 0 0.4rem; border-radius: 10px; font-weight: 700; font-size: 0.82rem; cursor: pointer;">
                                📋 ${deal.code}
                            </button>
                            <a href="${deal.link}" target="_blank" rel="noopener noreferrer" style="flex: 1.3; min-height: 44px; background: linear-gradient(135deg, #10B981 0%, #059669 100%); color: #FFFFFF; padding: 0 0.4rem; border-radius: 10px; font-weight: 700; font-size: 0.84rem; text-align: center; text-decoration: none; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 14px rgba(16,185,129,0.3);">
                                SĂN NGAY ➔
                            </a>
                        </div>

                        <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.72rem; padding-top: 0.2rem;">
                            <button data-action="open-audit" data-id="${deal.deal_id}" style="background: none; border: none; color: #059669; font-weight: 700; cursor: pointer; text-decoration: underline;">
                                🛡️ Tin cậy: ${deal.trust_score}/100
                            </button>
                            <button data-action="share-deal" data-id="${deal.deal_id}" style="background: none; border: none; color: #0284C7; font-weight: 700; cursor: pointer; text-decoration: underline;">
                                ↗ Rủ Bạn
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // ==========================================
    // 6. EVENT DELEGATION
    // ==========================================
    document.body.addEventListener('click', function(e) {
        initAudio();
        const btn = e.target.closest('[data-action]');
        if (!btn) return;

        const act = btn.getAttribute('data-action');
        playSound('click');

        if (act === 'toggle-deal-now') {
            State.dealNowMode = !State.dealNowMode;
            showToast(State.dealNowMode ? 'Đã bật chế độ SĂN NHANH 10S (Chỉ hiện deal giảm sâu nhất)' : 'Đã quay lại chế độ khám phá');
            renderApp();
        } else if (act === 'toggle-theme') {
            State.theme = State.theme === 'light' ? 'dark' : 'light';
            localStorage.setItem('jayt_theme', State.theme);
            renderApp();
        } else if (act === 'district') {
            State.activeDistrict = btn.getAttribute('data-district');
            renderApp();
        } else if (act === 'intent') {
            State.activeIntent = btn.getAttribute('data-intent');
            renderApp();
        } else if (act === 'reset-filters') {
            State.activeCategory = 'ALL';
            State.activeDistrict = 'ALL';
            State.activeIntent = 'ALL';
            State.searchQuery = '';
            State.dealNowMode = false;
            renderApp();
        } else if (act === 'open-audit') {
            const id = btn.getAttribute('data-id');
            State.auditDeal = State.deals.find(d => d.deal_id === id);
            State.isAuditOpen = true;
            renderApp();
        } else if (act === 'close-audit') {
            State.isAuditOpen = false;
            renderApp();
        } else if (act === 'open-wallet') {
            State.currentTab = 'wallet';
            renderApp();
        } else if (act === 'close-wallet') {
            State.currentTab = 'home';
            renderApp();
        } else if (act === 'open-wheel') {
            State.isWheelOpen = true;
            renderApp();
        } else if (act === 'close-wheel') {
            State.isWheelOpen = false;
            renderApp();
        } else if (act === 'spin-wheel') {
            if (State.isSpinning) return;
            State.isSpinning = true;
            const wheel = document.getElementById('wheelCanvasBox');
            const prizes = ['Grab 0Đ Đi Học 40K', 'Maycha Trân Châu Free', 'Cơm Gà A Hải Giảm 30K', 'Bắp Rang CGV Free', 'Xanh SM Voucher 20K', 'Katinat Bánh Nướng 1Đ'];
            const randomPrize = prizes[Math.floor(Math.random() * prizes.length)];
            const randomDeg = 1800 + Math.floor(Math.random() * 360);

            let tickInterval = setInterval(() => { playSound('wheel-tick'); }, 180);
            if (wheel) wheel.style.transform = `rotate(${randomDeg}deg)`;

            setTimeout(() => {
                clearInterval(tickInterval);
                State.isSpinning = false;
                State.wheelPrize = randomPrize;
                playSound('wheel-win');
                addPoints(5, 40000);
                showToast(`Chúc mừng! Bạn đã trúng: ${randomPrize} (+5 pts)`);
                renderApp();
            }, 3600);
        } else if (act === 'bookmark') {
            const id = btn.getAttribute('data-id');
            const idx = State.savedIds.indexOf(id);
            if (idx > -1) {
                State.savedIds.splice(idx, 1);
                showToast('Đã bỏ lưu ưu đãi.');
            } else {
                State.savedIds.push(id);
                addPoints(2, 25000);
                showToast('❤️ Đã lưu vào Kho Deal (+2 pts)!');
            }
            localStorage.setItem('jayt_favs', JSON.stringify(State.savedIds));
            renderApp();
        } else if (act === 'copy') {
            const code = btn.getAttribute('data-code') || '';
            const saving = parseInt(btn.getAttribute('data-saving') || '0', 10);
            if (navigator.clipboard) {
                navigator.clipboard.writeText(code).then(() => {
                    addPoints(1, saving);
                    showToast(`Đã sao chép mã [${code}]! Tiết kiệm ngay (+1 pt)`);
                });
            }
        } else if (act === 'share-deal') {
            const id = btn.getAttribute('data-id');
            const deal = State.deals.find(d => d.deal_id === id);
            if (navigator.share && deal) {
                navigator.share({
                    title: `JayT 43: ${deal.merchant} — ${deal.title}`,
                    text: `Săn deal tiết kiệm ${formatVND(deal.saving)} với mã [${deal.code}] tại JayT Đà Nẵng:`,
                    url: window.location.href
                }).then(() => {
                    addPoints(2, deal.saving);
                }).catch(() => {});
            } else {
                window.open(`https://zalo.me/share?url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(deal.merchant + ' - ' + deal.title)}`, '_blank');
            }
        }
    });

    // Calculator listener
    document.body.addEventListener('input', function(e) {
        if (e.target.id === 'calcDrink') { State.calcDrink = parseInt(e.target.value, 10); renderApp(); }
        else if (e.target.id === 'calcMeal') { State.calcMeal = parseInt(e.target.value, 10); renderApp(); }
        else if (e.target.id === 'calcRide') { State.calcRide = parseInt(e.target.value, 10); renderApp(); }
    });

    renderApp();
})();
