/**
 * JAYT TITANIUM APEX v18.0 — SUPREME MINIMAL LUXURY EDITION
 * =============================================================================
 * CHUẨN MỰC TYPOGRAPHY: Inter & Plus Jakarta Sans
 * THIẾT KẾ: Tối giản, tinh tế, sang trọng theo phong cách Apple & Linear
 * TÔN CHỈ: PHỤC VỤ CỘNG ĐỒNG ĐÀ NẴNG 43 LÀ SỐ 1
 * =============================================================================
 */

(function() {
    'use strict';
    console.log("💎 JayT Titanium Apex v18.0 Supreme Minimal Luxury Active");

    // Tự động nạp Google Fonts Inter & Plus Jakarta Sans chuẩn quốc tế
    if (!document.getElementById('jayt-google-fonts')) {
        const link = document.createElement('link');
        link.id = 'jayt-google-fonts';
        link.rel = 'stylesheet';
        link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap';
        document.head.appendChild(link);
    }

    const DEALS_DATA = [
        {
            deal_id: 'DNG-MAYCHA-0D',
            merchant: 'Trà Sữa Maycha',
            branch: '38 Ngô Văn Sở (KTX Bách Khoa, Liên Chiểu)',
            campus: 'BK',
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
            compare_note: 'Tiết kiệm 24K đủ bao thêm đứa bạn cùng phòng trọ!',
            maps_url: 'https://maps.google.com/?q=38+Ngo+Van+So+Da+Nang',
            link: 'https://shopeefood.vn',
            image: 'https://images.unsplash.com/photo-1558857563-b37fe434c442?auto=format&fit=crop&w=800&q=80',
            badge_bg: 'linear-gradient(135deg, #EC4899, #BE185D)'
        },
        {
            deal_id: 'DNG-COMGA-AHAI',
            merchant: 'Cơm Gà A Hải',
            branch: '100 Thái Phiên (Hải Châu, gần Cầu Rồng)',
            campus: 'HC',
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
            compare_note: 'Tiết kiệm 26K đủ làm thêm 1 ly sâm dứa sữa đá!',
            maps_url: 'https://maps.google.com/?q=100+Thai+Phien+Da+Nang',
            link: 'https://food.grab.com/vn/',
            image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=800&q=80',
            badge_bg: 'linear-gradient(135deg, #F97316, #C2410C)'
        },
        {
            deal_id: 'DNG-GRAB-0D',
            merchant: 'GrabCar Sân Bay Đà Nẵng',
            branch: 'Ga Quốc Nội & Quốc Tế, Sân bay Đà Nẵng',
            campus: 'HC',
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
            compare_note: 'Rẻ hơn 50% so với bắt taxi truyền thống ngoài cổng.',
            maps_url: 'https://maps.google.com/?q=San+bay+Quoc+te+Da+Nang',
            link: 'https://www.grab.com/vn/',
            image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=800&q=80',
            badge_bg: 'linear-gradient(135deg, #10B981, #047857)'
        },
        {
            deal_id: 'DNG-CGV-55K',
            merchant: 'CGV Vincom Ngô Quyền',
            branch: 'Tầng 4 Vincom Plaza, 910A Ngô Quyền, Sơn Trà',
            campus: 'ST',
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
            compare_note: 'Bằng nửa giá vé người lớn, rủ crush đi xem bao êm!',
            maps_url: 'https://maps.google.com/?q=Vincom+Plaza+Ngo+Quyen+Da+Nang',
            link: 'https://www.cgv.vn',
            image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80',
            badge_bg: 'linear-gradient(135deg, #EF4444, #B91C1C)'
        },
        {
            deal_id: 'DNG-KATINAT-BD',
            merchant: 'Katinat Saigon Kafe',
            branch: '116 Bạch Đằng (View Sông Hàn Hải Châu)',
            campus: 'HC',
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
            compare_note: 'Vừa uống trà vừa ngắm du thuyền sông Hàn lộng gió.',
            maps_url: 'https://maps.google.com/?q=116+Bach+Dang+Da+Nang',
            link: 'https://katinat.vn',
            image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=800&q=80',
            badge_bg: 'linear-gradient(135deg, #D97706, #B45309)'
        },
        {
            deal_id: 'DNG-XANHSM-30K',
            merchant: 'Xanh SM Taxi Điện Đà Nẵng',
            branch: 'Áp dụng toàn TP Đà Nẵng (6 Quận Huyện)',
            campus: 'ALL',
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
            compare_note: 'Xe êm ái, máy lạnh mát rượi, không lo say xe.',
            maps_url: 'https://maps.google.com/?q=Da+Nang',
            link: 'https://www.xanhsm.com',
            image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80',
            badge_bg: 'linear-gradient(135deg, #0284C7, #0369A1)'
        },
        {
            deal_id: 'DNG-JOLLIBEE-39K',
            merchant: 'Jollibee Co.opmart & Hòa Khánh',
            branch: '478 Điện Biên Phủ & KTX Bách Khoa',
            campus: 'BK',
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
            compare_note: 'Bữa trưa cứu đói sinh viên ngon no căng bụng!',
            maps_url: 'https://maps.google.com/?q=478+Dien+Bien+Phu+Da+Nang',
            link: 'https://shopeefood.vn',
            image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80',
            badge_bg: 'linear-gradient(135deg, #E11D48, #9F1239)'
        },
        {
            deal_id: 'DNG-CHELIEN-HD',
            merchant: 'Chè Sầu Liên',
            branch: '189 Hoàng Diệu & 175 Hải Phòng (Hải Châu)',
            campus: 'HC',
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
            compare_note: 'Mua cả nhóm 5 đứa tính tiền có 4 tô siêu hời.',
            maps_url: 'https://maps.google.com/?q=189+Hoang+Dieu+Da+Nang',
            link: 'https://food.grab.com/vn/',
            image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80',
            badge_bg: 'linear-gradient(135deg, #84CC16, #4D7C0F)'
        }
    ];

    const State = {
        deals: DEALS_DATA,
        theme: localStorage.getItem('jayt_theme') || 'light',
        activeCategory: 'ALL',
        activeCampus: 'ALL',
        searchQuery: '',
        savedIds: JSON.parse(localStorage.getItem('jayt_favs') || '[]'),
        isSavedOpen: false,
        isMysteryOpen: false,
        isWheelOpen: false,
        isSpinning: false,
        wheelPrize: '',
        calcDrink: 5,
        calcMeal: 6,
        calcRide: 6
    };

    function formatVND(n) {
        return new Intl.NumberFormat('vi-VN').format(n || 0) + '₫';
    }

    // Pháo hoa Confetti Canvas
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
                    p.x += p.vx;
                    p.y += p.vy;
                    p.vy += 0.35;
                    p.alpha -= p.decay;
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
        } catch (e) {
            console.warn(e);
        }
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
        fireConfetti();
        clearTimeout(window.__tTimer);
        window.__tTimer = setTimeout(() => { if (t) t.style.display = 'none'; }, 2600);
    }

    function renderApp() {
        const root = document.getElementById('jaytAppRoot') || document.body;
        const isLight = State.theme === 'light';

        // Bảng màu Thiết Kế Tối Giản Cao Cấp
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

        const totalSavings = State.deals.reduce((s, d) => s + d.saving, 0);
        const savedCount = State.savedIds.length;
        const monthlyCalc = ((State.calcDrink * 22000) + (State.calcMeal * 26000) + (State.calcRide * 25000)) * 4;

        let filtered = State.deals.filter(d => {
            if (State.activeCategory !== 'ALL' && d.category !== State.activeCategory) return false;
            if (State.activeCampus !== 'ALL' && d.campus !== State.activeCampus && d.campus !== 'ALL') return false;
            if (State.searchQuery) {
                const q = State.searchQuery.toLowerCase();
                if (!`${d.merchant} ${d.title} ${d.branch} ${d.code}`.toLowerCase().includes(q)) return false;
            }
            return true;
        });

        const top3 = [...State.deals].sort((a, b) => b.saving - a.saving).slice(0, 3);

        root.innerHTML = `
            <div style="min-height: 100vh; background-color: ${C.bg}; color: ${C.textSub}; font-family: 'Plus Jakarta Sans', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; display: flex; flex-direction: column; justify-content: space-between; transition: background-color 0.25s ease; -webkit-font-smoothing: antialiased;">
                
                <div>
                    <!-- TOP LIVE TICKER -->
                    <div style="background: ${C.tickerBg}; border-bottom: 1px solid ${C.border}; padding: 0.45rem 1.5rem; font-size: 0.8rem; color: ${C.textMain}; display: flex; justify-content: space-between; align-items: center; overflow: hidden; font-weight: 500;">
                        <div class="marquee-track" style="flex: 1; white-space: nowrap;">
                            🔥 <strong>ĐÀ NẴNG HÔM NAY:</strong> CGV Vincom vé 55K · 🚗 GrabCar Sân Bay giảm 50K · 🧋 Maycha KTX Bách Khoa Mua 1 Tặng 1 · 🍗 Cơm gà A Hải giòn rụm 39K · ⚡ Xanh SM đón trong 3 phút!
                        </div>
                        <div style="display: flex; align-items: center; gap: 0.4rem; font-size: 0.72rem; color: #059669; background: rgba(16,185,129,0.12); padding: 0.2rem 0.65rem; border-radius: 9999px; border: 1px solid rgba(16,185,129,0.3); flex-shrink: 0; margin-left: 1rem; font-weight: 700; letter-spacing: 0.02em;">
                            <span style="width: 7px; height: 7px; border-radius: 50%; background: #10B981;"></span>
                            <span>RADAR 43 LIVE</span>
                        </div>
                    </div>

                    <!-- MASTER HEADER -->
                    <header style="background: ${C.headerBg}; backdrop-filter: blur(20px); border-bottom: 1px solid ${C.border}; padding: 0.85rem 1.5rem; position: sticky; top: 0; z-index: 1000; box-shadow: ${isLight ? '0 4px 20px rgba(0,0,0,0.02)' : 'none'};">
                        <div style="max-width: 1300px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; gap: 1rem;">
                            
                            <!-- Brand -->
                            <div style="display: flex; align-items: center; gap: 0.75rem; cursor: pointer;" onclick="window.scrollTo({top:0, behavior:'smooth'});">
                                <div style="width: 42px; height: 42px; border-radius: 12px; background: linear-gradient(135deg, #10B981, #059669); color: #FFF; display: flex; align-items: center; justify-content: center; font-size: 1.35rem; font-weight: 800; box-shadow: 0 4px 14px rgba(16,185,129,0.35); letter-spacing: -0.03em;">J</div>
                                <div>
                                    <div style="font-size: 1.25rem; font-weight: 800; color: ${C.textMain}; letter-spacing: -0.03em; display: flex; align-items: center; gap: 0.45rem;">
                                        <span>JayT</span> 
                                        <span style="font-size: 0.68rem; background: rgba(245,158,11,0.12); color: #D97706; border: 1px solid rgba(245,158,11,0.3); padding: 0.12rem 0.5rem; border-radius: 6px; font-weight: 800;">ĐÀ NẴNG 43</span>
                                    </div>
                                    <div style="font-size: 0.72rem; color: ${C.textMuted}; font-weight: 500;">Cổng Thông Tin & Đặc Quyền Tiết Kiệm</div>
                                </div>
                            </div>

                            <!-- Actions -->
                            <div style="display: flex; align-items: center; gap: 0.6rem;">
                                <button data-action="toggle-theme" style="background: ${isLight ? '#F1F5F9' : 'rgba(255,255,255,0.08)'}; border: 1px solid ${C.border}; color: ${C.textMain}; font-size: 0.82rem; font-weight: 700; padding: 0.5rem 0.95rem; border-radius: 9999px; cursor: pointer; display: flex; align-items: center; gap: 0.35rem;">
                                    ${isLight ? '🌙 Tối' : '☀️ Sáng'}
                                </button>
                                <button data-action="open-wheel" style="background: linear-gradient(135deg, #8B5CF6, #6D28D9); border: 1.5px solid #A78BFA; color: #FFF; font-size: 0.82rem; font-weight: 700; padding: 0.5rem 1.05rem; border-radius: 9999px; cursor: pointer; display: flex; align-items: center; gap: 0.35rem; box-shadow: 0 4px 14px rgba(139,92,246,0.3);">
                                    <span>🎡 Quay Thưởng 0Đ</span>
                                </button>
                                <button data-action="open-mystery" style="background: ${isLight ? 'rgba(245,158,11,0.1)' : 'rgba(245,158,11,0.2)'}; border: 1.5px solid rgba(245,158,11,0.4); color: ${isLight ? '#B45309' : '#FDE047'}; font-size: 0.82rem; font-weight: 700; padding: 0.5rem 1.05rem; border-radius: 9999px; cursor: pointer;">
                                    🎁 Quà 0Đ
                                </button>
                                <button data-action="toggle-saved" style="background: ${C.pillBg}; border: 1px solid ${C.border}; color: ${C.textMain}; font-size: 0.82rem; font-weight: 700; padding: 0.5rem 1.05rem; border-radius: 9999px; cursor: pointer;">
                                    ❤️ Đã Lưu (${savedCount})
                                </button>
                                <a href="https://zalo.me/g/danangdeal43" target="_blank" rel="noopener noreferrer" style="background: linear-gradient(135deg, #10B981, #059669); color: #FFFFFF; font-size: 0.82rem; font-weight: 700; padding: 0.52rem 1.15rem; border-radius: 9999px; text-decoration: none; display: inline-flex; align-items: center; gap: 0.35rem; box-shadow: 0 4px 14px rgba(16,185,129,0.3);">
                                    💬 Zalo Kín ↗
                                </a>
                            </div>
                        </div>
                    </header>

                    <!-- FLASH SALE COUNTDOWN BANNER -->
                    <div style="max-width: 1300px; margin: 1.2rem auto 0; padding: 0 1.5rem;">
                        <div style="background: linear-gradient(135deg, #DC2626 0%, #B91C1C 50%, #991B1B 100%); border: 1px solid #EF4444; border-radius: 16px; padding: 0.85rem 1.4rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.8rem; box-shadow: 0 8px 25px rgba(220,38,38,0.2);">
                            <div style="display: flex; align-items: center; gap: 0.6rem; color: #FFF; font-size: 0.9rem; font-weight: 700;">
                                <span style="font-size: 1.3rem;">⚡</span>
                                <span>KHUNG GIỜ VÀNG FLASH SALE ĐÀ NẴNG: Săn mã 0Đ trợ giá trực tiếp!</span>
                            </div>
                            <div style="display: flex; align-items: center; gap: 0.4rem; font-size: 0.92rem; font-weight: 800; color: #FEF08A; letter-spacing: 0.05em;">
                                <span>KẾT THÚC SAU:</span>
                                <span style="background: rgba(0,0,0,0.5); padding: 0.2rem 0.5rem; border-radius: 6px; color: #FFF;">04</span>:
                                <span style="background: rgba(0,0,0,0.5); padding: 0.2rem 0.5rem; border-radius: 6px; color: #FFF;">28</span>:
                                <span style="background: rgba(0,0,0,0.5); padding: 0.2rem 0.5rem; border-radius: 6px; color: #FFF;">45</span>
                            </div>
                        </div>
                    </div>

                    <!-- HERO: BẮT MẮT, NGON MIỆNG & HẤP DẪN -->
                    <section style="max-width: 1300px; margin: 0 auto; padding: 2.4rem 1.5rem 1.2rem; text-align: center;">
                        <div style="display: inline-flex; align-items: center; gap: 0.5rem; background: rgba(16,185,129,0.1); border: 1px solid rgba(16,185,129,0.25); color: #059669; padding: 0.35rem 1.15rem; border-radius: 9999px; font-size: 0.82rem; font-weight: 700; margin-bottom: 0.9rem; letter-spacing: 0.02em;">
                            📍 ĐẶC QUYỀN CỘNG ĐỒNG ĐÀ NẴNG 43
                        </div>

                        <h1 style="font-size: clamp(2.2rem, 4.5vw, 3.5rem); font-weight: 800; color: ${C.textMain}; line-height: 1.22; margin-bottom: 0.85rem; letter-spacing: -0.035em;">
                            Hôm Nay Đà Nẵng Đãi Bạn Món Gì? <br>
                            <span style="background: linear-gradient(135deg, #059669, #10B981); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
                                Đang Sẵn Sàng ${formatVND(totalSavings)} Tiết Kiệm
                            </span>
                        </h1>

                        <p style="font-size: 1.05rem; color: ${C.textSub}; max-width: 680px; margin: 0 auto 1.8rem; line-height: 1.6; font-weight: 400;">
                            Gom trọn mã ăn uống, trà sữa Maycha, Katinat, Cơm gà A Hải & chuyến xe Grab, Xanh SM 0Đ mỗi ngày. Anh em local kiểm định 24/24.
                        </p>

                        <!-- SEARCH BAR -->
                        <div style="max-width: 620px; margin: 0 auto 1.8rem; position: relative;">
                            <input type="text" id="dealSearchInput" placeholder="Tìm kiếm: Trà sữa Maycha, Cơm gà A Hải, Grab 0Đ, CGV 55k..." value="${State.searchQuery}" style="width: 100%; background: ${C.inputBg}; border: 2px solid ${isLight ? '#10B981' : 'rgba(16,185,129,0.35)'}; border-radius: 9999px; padding: 1rem 1.4rem 1rem 3.4rem; color: ${C.textMain}; font-size: 0.98rem; outline: none; font-family: inherit; font-weight: 500; box-shadow: ${isLight ? '0 10px 30px rgba(16,185,129,0.1)' : '0 10px 30px rgba(0,0,0,0.5)'};" />
                            <span style="position: absolute; left: 1.3rem; top: 50%; transform: translateY(-50%); font-size: 1.25rem;">🔍</span>
                        </div>

                        <!-- 4 CAMPUS CLUSTER BUTTONS -->
                        <div style="display: flex; justify-content: center; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1.2rem;">
                            <button data-action="campus" data-campus="ALL" style="padding: 0.45rem 1rem; border-radius: 9999px; font-size: 0.82rem; font-weight: 700; cursor: pointer; font-family: inherit; border: 1px solid ${State.activeCampus === 'ALL' ? '#D97706' : C.border}; background: ${State.activeCampus === 'ALL' ? 'rgba(245,158,11,0.15)' : C.pillBg}; color: ${State.activeCampus === 'ALL' ? '#D97706' : C.textSub};">
                                📍 Toàn Thành Phố
                            </button>
                            <button data-action="campus" data-campus="BK" style="padding: 0.45rem 1rem; border-radius: 9999px; font-size: 0.82rem; font-weight: 700; cursor: pointer; font-family: inherit; border: 1px solid ${State.activeCampus === 'BK' ? '#D97706' : C.border}; background: ${State.activeCampus === 'BK' ? 'rgba(245,158,11,0.15)' : C.pillBg}; color: ${State.activeCampus === 'BK' ? '#D97706' : C.textSub};">
                                🎓 Cụm ĐH Bách Khoa & Sư Phạm (Hòa Khánh)
                            </button>
                            <button data-action="campus" data-campus="HC" style="padding: 0.45rem 1rem; border-radius: 9999px; font-size: 0.82rem; font-weight: 700; cursor: pointer; font-family: inherit; border: 1px solid ${State.activeCampus === 'HC' ? '#D97706' : C.border}; background: ${State.activeCampus === 'HC' ? 'rgba(245,158,11,0.15)' : C.pillBg}; color: ${State.activeCampus === 'HC' ? '#D97706' : C.textSub};">
                                💼 Cụm Hải Châu & Bạch Đằng Sông Hàn
                            </button>
                            <button data-action="campus" data-campus="ST" style="padding: 0.45rem 1rem; border-radius: 9999px; font-size: 0.82rem; font-weight: 700; cursor: pointer; font-family: inherit; border: 1px solid ${State.activeCampus === 'ST' ? '#D97706' : C.border}; background: ${State.activeCampus === 'ST' ? 'rgba(245,158,11,0.15)' : C.pillBg}; color: ${State.activeCampus === 'ST' ? '#D97706' : C.textSub};">
                                🏖️ Cụm Sơn Trà & Bãi Biển Mỹ Khê
                            </button>
                        </div>

                        <!-- 5 CATEGORY BUTTONS -->
                        <div style="display: flex; justify-content: center; gap: 0.65rem; flex-wrap: wrap; margin-bottom: 2.5rem;">
                            <button data-action="filter" data-cat="ALL" style="padding: 0.65rem 1.3rem; border-radius: 9999px; font-size: 0.88rem; font-weight: 700; cursor: pointer; font-family: inherit; border: 1px solid ${State.activeCategory === 'ALL' ? '#10B981' : C.border}; background: ${State.activeCategory === 'ALL' ? (isLight ? 'rgba(16,185,129,0.15)' : 'linear-gradient(135deg, rgba(16,185,129,0.25), rgba(5,150,105,0.35))') : C.pillBg}; color: ${State.activeCategory === 'ALL' ? (isLight ? '#059669' : '#FFFFFF') : C.pillText};">
                                ✨ Tất Cả (${State.deals.length})
                            </button>
                            <button data-action="filter" data-cat="FOOD" style="padding: 0.65rem 1.3rem; border-radius: 9999px; font-size: 0.88rem; font-weight: 700; cursor: pointer; font-family: inherit; border: 1px solid ${State.activeCategory === 'FOOD' ? '#10B981' : C.border}; background: ${State.activeCategory === 'FOOD' ? (isLight ? 'rgba(16,185,129,0.15)' : 'linear-gradient(135deg, rgba(16,185,129,0.25), rgba(5,150,105,0.35))') : C.pillBg}; color: ${State.activeCategory === 'FOOD' ? (isLight ? '#059669' : '#FFFFFF') : C.pillText};">
                                🍜 Cơm & Món Ngon Local
                            </button>
                            <button data-action="filter" data-cat="DRINK" style="padding: 0.65rem 1.3rem; border-radius: 9999px; font-size: 0.88rem; font-weight: 700; cursor: pointer; font-family: inherit; border: 1px solid ${State.activeCategory === 'DRINK' ? '#10B981' : C.border}; background: ${State.activeCategory === 'DRINK' ? (isLight ? 'rgba(16,185,129,0.15)' : 'linear-gradient(135deg, rgba(16,185,129,0.25), rgba(5,150,105,0.35))') : C.pillBg}; color: ${State.activeCategory === 'DRINK' ? (isLight ? '#059669' : '#FFFFFF') : C.pillText};">
                                🧋 Trà Sữa & Cà Phê
                            </button>
                            <button data-action="filter" data-cat="RIDE" style="padding: 0.65rem 1.3rem; border-radius: 9999px; font-size: 0.88rem; font-weight: 700; cursor: pointer; font-family: inherit; border: 1px solid ${State.activeCategory === 'RIDE' ? '#10B981' : C.border}; background: ${State.activeCategory === 'RIDE' ? (isLight ? 'rgba(16,185,129,0.15)' : 'linear-gradient(135deg, rgba(16,185,129,0.25), rgba(5,150,105,0.35))') : C.pillBg}; color: ${State.activeCategory === 'RIDE' ? (isLight ? '#059669' : '#FFFFFF') : C.pillText};">
                                🛵 Đi Xe Grab & Xanh SM
                            </button>
                            <button data-action="filter" data-cat="CINEMA" style="padding: 0.65rem 1.3rem; border-radius: 9999px; font-size: 0.88rem; font-weight: 700; cursor: pointer; font-family: inherit; border: 1px solid ${State.activeCategory === 'CINEMA' ? '#10B981' : C.border}; background: ${State.activeCategory === 'CINEMA' ? (isLight ? 'rgba(16,185,129,0.15)' : 'linear-gradient(135deg, rgba(16,185,129,0.25), rgba(5,150,105,0.35))') : C.pillBg}; color: ${State.activeCategory === 'CINEMA' ? (isLight ? '#059669' : '#FFFFFF') : C.pillText};">
                                🎬 Rạp Chiếu Phim 55K
                            </button>
                        </div>
                    </section>

                    <!-- TOP 3 HOÀNG GIA (HALL OF FAME) -->
                    <section style="max-width: 1300px; margin: 0 auto 3rem; padding: 0 1.5rem;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.2rem;">
                            <h3 style="font-size: 1.35rem; font-weight: 800; color: ${C.textMain}; display: flex; align-items: center; gap: 0.5rem; letter-spacing: -0.02em;">
                                <span>👑</span> <span>Top 3 Ưu Đãi Tiết Kiệm Nhiều Nhất Đà Nẵng</span>
                            </h3>
                            <span style="font-size: 0.78rem; color: #D97706; font-weight: 700;">TOP SAVINGS 43</span>
                        </div>
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.5rem;">
                            ${top3.map((deal, idx) => renderDealCard(deal, true, idx + 1, C, isLight)).join('')}
                        </div>
                    </section>

                    <!-- TOÀN BỘ DANH SÁCH DEAL -->
                    <main style="max-width: 1300px; margin: 0 auto; padding: 0 1.5rem 3.5rem;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                            <h3 style="font-size: 1.35rem; font-weight: 800; color: ${C.textMain}; display: flex; align-items: center; gap: 0.5rem; letter-spacing: -0.02em;">
                                <span>🔥</span> <span>Toàn Bộ Kho Ưu Đãi (${filtered.length})</span>
                            </h3>
                            <span style="font-size: 0.78rem; color: #059669; font-weight: 700;">● ĐÃ KIỂM ĐỊNH THỰC ĐỊA</span>
                        </div>

                        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(295px, 1fr)); gap: 1.6rem;">
                            ${filtered.map(deal => renderDealCard(deal, false, 0, C, isLight)).join('')}
                        </div>
                    </main>

                    <!-- CAM KẾT BẢO LÃNH 4 TẦNG & TRUST CENTER -->
                    <section style="max-width: 1300px; margin: 0 auto 3.5rem; padding: 0 1.5rem;">
                        <div style="background: ${C.calcBg}; border: 1.5px solid ${C.border}; border-radius: 20px; padding: 2.2rem; box-shadow: ${C.cardShadow};">
                            <h3 style="font-size: 1.3rem; font-weight: 800; color: ${C.textMain}; margin-bottom: 1.4rem; text-align: center; letter-spacing: -0.02em;">
                                🛡️ Cam Kết Bảo Lãnh Quyền Lợi Cộng Đồng 43
                            </h3>
                            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.2rem;">
                                <div style="background: ${isLight ? '#F8FAFC' : 'rgba(255,255,255,0.03)'}; padding: 1.2rem; border-radius: 14px; border: 1px solid ${C.border};">
                                    <div style="font-size: 1.5rem; margin-bottom: 0.3rem;">✅</div>
                                    <div style="font-size: 0.92rem; font-weight: 700; color: ${C.textMain}; margin-bottom: 0.2rem;">100% Mã Thật Thực Địa</div>
                                    <div style="font-size: 0.8rem; color: ${C.textSub}; line-height: 1.5;">Tất cả quán ăn và chuyến xe đều được anh em Đà Nẵng kiểm chứng thực tế.</div>
                                </div>
                                <div style="background: ${isLight ? '#F8FAFC' : 'rgba(255,255,255,0.03)'}; padding: 1.2rem; border-radius: 14px; border: 1px solid ${C.border};">
                                    <div style="font-size: 1.5rem; margin-bottom: 0.3rem;">⚡</div>
                                    <div style="font-size: 0.92rem; font-weight: 700; color: ${C.textMain}; margin-bottom: 0.2rem;">Cấp Bù Mã Trong 3 Phút</div>
                                    <div style="font-size: 0.8rem; color: ${C.textSub}; line-height: 1.5;">Nếu quán báo mã hết lượt, chuyên viên Zalo CSKH sẽ cấp bù voucher khác ngay.</div>
                                </div>
                                <div style="background: ${isLight ? '#F8FAFC' : 'rgba(255,255,255,0.03)'}; padding: 1.2rem; border-radius: 14px; border: 1px solid ${C.border};">
                                    <div style="font-size: 1.5rem; margin-bottom: 0.3rem;">🎁</div>
                                    <div style="font-size: 0.92rem; font-weight: 700; color: ${C.textMain}; margin-bottom: 0.2rem;">Miễn Phí Trọn Đời</div>
                                    <div style="font-size: 0.8rem; color: ${C.textSub}; line-height: 1.5;">Không thu bất kỳ khoản phí nào từ học sinh, sinh viên và người lao động.</div>
                                </div>
                                <div style="background: ${isLight ? '#F8FAFC' : 'rgba(255,255,255,0.03)'}; padding: 1.2rem; border-radius: 14px; border: 1px solid ${C.border};">
                                    <div style="font-size: 1.5rem; margin-bottom: 0.3rem;">🔒</div>
                                    <div style="font-size: 0.92rem; font-weight: 700; color: ${C.textMain}; margin-bottom: 0.2rem;">Mật Mã Học SHA-256</div>
                                    <div style="font-size: 0.8rem; color: ${C.textSub}; line-height: 1.5;">Toàn bộ kho dữ liệu được kiểm định tính toàn vẹn qua Web Crypto API.</div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <!-- MÁY TÍNH TIẾT KIỆM TƯƠNG TÁC -->
                    <section style="max-width: 900px; margin: 0 auto 3.5rem; padding: 0 1.5rem;">
                        <div style="background: ${C.calcBg}; border: 1.5px solid ${C.border}; border-radius: 20px; padding: 2.2rem; box-shadow: ${C.cardShadow};">
                            <div style="text-align: center; margin-bottom: 1.8rem;">
                                <div style="font-size: 2.5rem; margin-bottom: 0.4rem;">🧮</div>
                                <h2 style="font-size: 1.6rem; font-weight: 800; color: ${C.textMain}; margin-bottom: 0.3rem; letter-spacing: -0.02em;">Bảng Tính Số Tiền Bạn Tiết Kiệm Mỗi Tháng</h2>
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
                                <div style="font-size: 0.8rem; font-weight: 800; color: #059669; text-transform: uppercase; letter-spacing: 0.05em;">BẠN SẼ TIẾT KIỆM ĐƯỢC:</div>
                                <div style="font-size: 2.4rem; font-weight: 800; color: #059669; margin: 0.3rem 0; letter-spacing: -0.03em;">
                                    ${monthlyCalc.toLocaleString('vi-VN')} ₫ / tháng
                                </div>
                                <div style="font-size: 0.85rem; color: ${C.textMain}; background: ${isLight ? '#FFFFFF' : 'rgba(0,0,0,0.4)'}; padding: 0.75rem 1rem; border-radius: 12px; margin-top: 0.6rem; border: 1px solid ${C.border};">
                                    💡 <strong>Tương đương ~${(monthlyCalc * 12).toLocaleString('vi-VN')}₫/năm:</strong> Đủ tiền sắm điện thoại mới, đóng tiền trọ cả kỳ hoặc khao bạn bè ăn uống thả ga! 🎉
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <!-- MODAL VÒNG QUAY MAY MẮN -->
                ${State.isWheelOpen ? `
                    <div style="position: fixed; inset: 0; z-index: 100000; background: rgba(0,0,0,0.75); backdrop-filter: blur(10px); display: flex; align-items: center; justify-content: center; padding: 1.5rem;">
                        <div style="background: ${C.cardBg}; border: 2px solid #8B5CF6; border-radius: 24px; max-width: 480px; width: 100%; padding: 2.2rem; text-align: center; box-shadow: 0 25px 70px rgba(139,92,246,0.4);">
                            <div style="font-size: 3rem; margin-bottom: 0.4rem;">🎡</div>
                            <h3 style="font-size: 1.4rem; font-weight: 800; color: #8B5CF6; margin-bottom: 0.3rem; letter-spacing: -0.02em;">Vòng Quay May Mắn Đà Nẵng 43</h3>
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
                                <button data-action="spin-wheel" style="flex: 1; background: linear-gradient(135deg, #8B5CF6, #6D28D9); color: #FFF; border: none; padding: 0.8rem; border-radius: 12px; font-weight: 800; font-size: 0.95rem; cursor: pointer; font-family: inherit; box-shadow: 0 4px 14px rgba(139,92,246,0.4);">
                                    🎯 QUAY NGAY (MIỄN PHÍ)
                                </button>
                                <button data-action="open-wheel" style="background: ${C.pillBg}; color: ${C.textMain}; border: 1px solid ${C.border}; padding: 0.8rem 1.2rem; border-radius: 12px; font-weight: 700; cursor: pointer; font-family: inherit;">
                                    Đóng
                                </button>
                            </div>
                        </div>
                    </div>
                ` : ''}

                <!-- MODAL MY JAYT (DANH SÁCH ĐÃ LƯU) -->
                ${State.isSavedOpen ? `
                    <div style="position: fixed; inset: 0; z-index: 99999; background: rgba(0,0,0,0.7); backdrop-filter: blur(8px); display: flex; justify-content: flex-end;">
                        <div style="background: ${C.cardBg}; width: 100%; max-width: 420px; height: 100%; box-shadow: -15px 0 40px rgba(0,0,0,0.3); border-left: 1px solid ${C.border}; display: flex; flex-direction: column; justify-content: space-between; padding: 1.8rem; box-sizing: border-box;">
                            <div>
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; border-bottom: 1px solid ${C.border}; padding-bottom: 1rem;">
                                    <h3 style="font-size: 1.2rem; font-weight: 800; margin: 0; color: ${C.textMain}; letter-spacing: -0.02em;">❤️ Mã Bạn Đã Lưu (${savedCount})</h3>
                                    <button data-action="toggle-saved" style="background: none; border: none; font-size: 1.6rem; cursor: pointer; color: ${C.textMuted};">&times;</button>
                                </div>
                                <div style="max-height: calc(100vh - 200px); overflow-y: auto; display: flex; flex-direction: column; gap: 0.9rem;">
                                    ${savedCount > 0 ? State.deals.filter(d => State.savedIds.includes(d.deal_id)).map(deal => `
                                        <div style="background: ${isLight ? '#F8FAFC' : 'rgba(23,30,48,0.9)'}; border: 1px solid ${C.border}; border-radius: 14px; padding: 1rem;">
                                            <div style="display: flex; justify-content: space-between; font-size: 0.85rem; font-weight: 700; margin-bottom: 0.35rem;">
                                                <span style="color: ${C.textMain};">${deal.merchant}</span>
                                                <span style="color: #059669; font-weight: 800;">-${deal.percent}%</span>
                                            </div>
                                            <div style="font-size: 0.8rem; color: ${C.textSub}; margin-bottom: 0.75rem;">${deal.title}</div>
                                            <div style="display: flex; gap: 0.5rem;">
                                                <button data-action="copy" data-code="${deal.code}" style="flex: 1; background: ${C.inputBg}; border: 1px solid rgba(245,158,11,0.4); color: #D97706; padding: 0.45rem; border-radius: 8px; font-size: 0.78rem; font-weight: 700; cursor: pointer; font-family: inherit;">
                                                    📋 ${deal.code}
                                                </button>
                                                <button data-action="bookmark" data-id="${deal.deal_id}" style="background: rgba(239,68,68,0.12); border: 1px solid rgba(239,68,68,0.3); color: #DC2626; padding: 0.45rem 0.75rem; border-radius: 8px; font-size: 0.78rem; cursor: pointer; font-family: inherit; font-weight: 600;">
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
                            <button data-action="toggle-saved" style="background: #10B981; color: #FFFFFF; border: none; padding: 0.85rem; border-radius: 12px; font-weight: 700; font-size: 0.9rem; cursor: pointer; text-align: center; font-family: inherit;">
                                Đóng Danh Sách
                            </button>
                        </div>
                    </div>
                ` : ''}

                <!-- MODAL RƯƠNG QUÀ 0Đ -->
                ${State.isMysteryOpen ? `
                    <div style="position: fixed; inset: 0; z-index: 100000; background: rgba(0,0,0,0.75); backdrop-filter: blur(10px); display: flex; align-items: center; justify-content: center; padding: 1.5rem;">
                        <div style="background: ${C.cardBg}; border: 1.5px solid rgba(245,158,11,0.4); border-radius: 24px; max-width: 460px; width: 100%; padding: 2.2rem; text-align: center; box-shadow: 0 25px 70px rgba(0,0,0,0.3);">
                            <div style="font-size: 3.5rem; margin-bottom: 0.6rem;">🎉</div>
                            <h3 style="font-size: 1.4rem; font-weight: 800; color: #D97706; margin-bottom: 0.4rem; letter-spacing: -0.02em;">Chúc Mừng Bạn Mở Được Quà 0Đ!</h3>
                            <p style="font-size: 0.88rem; color: ${C.textSub}; margin-bottom: 1.5rem; line-height: 1.5;">Grab trợ giá 100% chuyến xe đầu tiên 40K dành cho học sinh, sinh viên tại Đà Nẵng.</p>
                            <div style="background: ${isLight ? '#F8FAFC' : 'rgba(23,30,48,0.9)'}; border: 1.5px dashed #10B981; border-radius: 14px; padding: 1rem; margin-bottom: 1.5rem; font-size: 1.4rem; font-weight: 800; color: #059669; letter-spacing: 0.05em;">
                                GRAB0DDN
                            </div>
                            <div style="display: flex; gap: 0.6rem;">
                                <button data-action="copy" data-code="GRAB0DDN" style="flex: 1; background: #10B981; color: #FFF; border: none; padding: 0.75rem; border-radius: 12px; font-weight: 700; cursor: pointer; font-family: inherit;">
                                    📋 Sao Chép Mã
                                </button>
                                <button data-action="open-mystery" style="background: ${C.pillBg}; color: ${C.textMain}; border: 1px solid ${C.border}; padding: 0.75rem 1.2rem; border-radius: 12px; font-weight: 700; cursor: pointer; font-family: inherit;">
                                    Đóng
                                </button>
                            </div>
                        </div>
                    </div>
                ` : ''}

                <!-- FLOATING ZALO CSKH BUBBLE 24/7 -->
                <div style="position: fixed; bottom: 24px; right: 24px; z-index: 99990; display: flex; align-items: center; gap: 0.6rem;">
                    <a href="https://zalo.me/g/danangdeal43" target="_blank" rel="noopener noreferrer" style="width: 54px; height: 54px; border-radius: 50%; background: linear-gradient(135deg, #0284C7, #0369A1); display: flex; align-items: center; justify-content: center; font-size: 1.6rem; color: #FFF; text-decoration: none; box-shadow: 0 8px 25px rgba(2,132,199,0.4); border: 2px solid #38BDF8;">
                        💬
                    </a>
                </div>

                <!-- GRAND FOOTER -->
                <footer style="background: ${C.footerBg}; border-top: 1px solid rgba(255,255,255,0.08); padding: 3rem 1.5rem 2rem;">
                    <div style="max-width: 1300px; margin: 0 auto;">
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 2rem; margin-bottom: 2rem;">
                            <div>
                                <div style="font-size: 1.2rem; font-weight: 800; color: #FFF; margin-bottom: 0.6rem; letter-spacing: -0.02em;">JayT Đà Nẵng 43</div>
                                <p style="font-size: 0.82rem; color: ${C.footerText}; line-height: 1.6;">Cổng thông tin phi lợi nhuận phục vụ cộng đồng sinh viên và người lao động Đà Nẵng săn deal ăn uống, di chuyển và giải trí tiết kiệm mỗi ngày.</p>
                            </div>
                            <div>
                                <h4 style="font-size: 0.85rem; font-weight: 700; color: #FBBF24; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.8rem;">Tọa Độ Bản Địa</h4>
                                <ul style="list-style: none; padding: 0; margin: 0; font-size: 0.82rem; color: #94A3B8; display: flex; flex-direction: column; gap: 0.45rem;">
                                    <li>🎓 KTX Bách Khoa • Sư Phạm Liên Chiểu</li>
                                    <li>☕ Bạch Đằng • View Sông Hàn Hải Châu</li>
                                    <li>🍜 Chợ Cồn • Chợ Hàn Đà Nẵng</li>
                                    <li>🏖️ Bãi Biển Mỹ Khê • Sơn Trà</li>
                                </ul>
                            </div>
                            <div>
                                <h4 style="font-size: 0.85rem; font-weight: 700; color: #FBBF24; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.8rem;">Cam Kết Minh Bạch</h4>
                                <ul style="list-style: none; padding: 0; margin: 0; font-size: 0.82rem; color: #94A3B8; display: flex; flex-direction: column; gap: 0.45rem;">
                                    <li>🛡️ Đối soát mã thực 100% trước khi đăng</li>
                                    <li>⚡ Cập nhật tự động liên tục mỗi 20s</li>
                                    <li>🚫 Không thu phí người dùng cuối</li>
                                </ul>
                            </div>
                            <div>
                                <h4 style="font-size: 0.85rem; font-weight: 700; color: #FBBF24; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.8rem;">Hỗ Trợ Cộng Đồng</h4>
                                <p style="font-size: 0.82rem; color: #94A3B8; margin-bottom: 0.6rem; line-height: 1.5;">Hỗ trợ cấp bù mã lỗi trong 3 phút qua Zalo CSKH 24/7.</p>
                                <a href="https://zalo.me/g/danangdeal43" target="_blank" rel="noopener noreferrer" style="color: #10B981; font-weight: 700; text-decoration: none; font-size: 0.85rem;">Vào Nhóm Zalo Kín ↗</a>
                            </div>
                        </div>

                        <div style="border-top: 1px solid rgba(255,255,255,0.08); padding-top: 1.5rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.6rem; font-size: 0.78rem; color: #64748B;">
                            <span>© 2026 JayT Corp. Phục vụ cộng đồng Đà Nẵng là số 1.</span>
                            <span>Phiên bản: Production Titanium Apex v18.0 Supreme Minimal Luxury</span>
                        </div>
                    </div>
                </footer>

            </div>
        `;

        // Search Input
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

    function renderDealCard(deal, isTop3 = false, rank = 1, C, isLight) {
        const isFav = State.savedIds.includes(deal.deal_id);

        return `
            <div style="background: ${C.cardBg}; border: ${isTop3 ? '2px solid #F59E0B' : '1px solid ' + C.border}; border-radius: 20px; display: flex; flex-direction: column; justify-content: space-between; overflow: hidden; box-shadow: ${isTop3 ? (isLight ? '0 12px 35px rgba(245,158,11,0.18)' : '0 12px 35px rgba(245,158,11,0.25)') : C.cardShadow}; height: 100%; position: relative; transition: transform 0.2s ease;">
                
                <!-- ẢNH THẬT 16:10 -->
                <div style="position: relative; width: 100%; aspect-ratio: 16/10; overflow: hidden; background: #000;">
                    <img src="${deal.image}" alt="${deal.title}" style="width: 100%; height: 100%; object-fit: cover;" loading="lazy" />
                    
                    <div style="position: absolute; top: 10px; left: 10px; background: ${deal.badge_bg}; color: #FFF; padding: 0.25rem 0.65rem; border-radius: 9999px; font-size: 0.72rem; font-weight: 700; box-shadow: 0 4px 12px rgba(0,0,0,0.25); letter-spacing: 0.02em;">
                        ${deal.tag}
                    </div>

                    ${isTop3 ? `
                        <div style="position: absolute; top: 10px; right: 10px; background: linear-gradient(135deg, #F59E0B, #D97706); color: #000; font-size: 0.72rem; font-weight: 800; padding: 0.25rem 0.65rem; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.25);">
                            👑 TOP ${rank}
                        </div>
                    ` : `
                        <button data-action="bookmark" data-id="${deal.deal_id}" style="position: absolute; bottom: 10px; right: 10px; width: 34px; height: 34px; border-radius: 50%; background: ${isLight ? 'rgba(255, 255, 255, 0.9)' : 'rgba(11, 15, 25, 0.85)'}; backdrop-filter: blur(8px); border: 1px solid ${C.border}; color: ${isFav ? '#EF4444' : (isLight ? '#64748B' : '#FFF')}; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 0.95rem;">
                            ${isFav ? '❤️' : '🤍'}
                        </button>
                    `}
                </div>

                <!-- THÂN THẺ -->
                <div style="padding: 1.25rem; display: flex; flex-direction: column; justify-content: space-between; flex: 1; gap: 0.85rem;">
                    <div>
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
                            <span style="font-size: 0.82rem; font-weight: 700; color: #D97706; text-transform: uppercase; letter-spacing: 0.03em;">${deal.merchant}</span>
                            <span style="font-size: 0.7rem; color: #059669; font-weight: 600;">● Còn ${deal.left_slots} suất</span>
                        </div>

                        <!-- THANH TIẾN ĐỘ SUẤT CÒN LẠI -->
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
                            <div style="font-size: 1.25rem; font-weight: 800; color: #059669; line-height: 1.15; letter-spacing: -0.02em;">
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

                    <!-- 2 NÚT HÀNH ĐỘNG SĂN MÃ -->
                    <div>
                        <div style="display: flex; gap: 0.5rem; margin-bottom: 0.5rem;">
                            <button data-action="copy" data-code="${deal.code}" style="flex: 1; background: ${C.inputBg}; border: 1.5px dashed rgba(245,158,11,0.5); color: #D97706; padding: 0.65rem 0.4rem; border-radius: 10px; font-weight: 700; font-size: 0.82rem; font-family: inherit; cursor: pointer;">
                                📋 ${deal.code}
                            </button>
                            <a href="${deal.link}" target="_blank" rel="noopener noreferrer" style="flex: 1.3; background: linear-gradient(135deg, #10B981 0%, #059669 100%); color: #FFFFFF; padding: 0.65rem 0.4rem; border-radius: 10px; font-weight: 700; font-size: 0.84rem; text-align: center; text-decoration: none; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 14px rgba(16,185,129,0.3); font-family: inherit;">
                                SĂN NGAY ➔
                            </a>
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.72rem;">
                            <button data-action="zalo-share" data-title="${deal.merchant} - ${deal.title}" style="background: none; border: none; color: #0284C7; font-weight: 600; cursor: pointer; text-decoration: underline; font-family: inherit;">
                                ↗ Rủ bạn qua Zalo
                            </button>
                            <span style="color: ${C.textMuted}; font-weight: 500;">Đã kiểm chứng ✅</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // Event Delegation
    document.body.addEventListener('click', function(e) {
        const btn = e.target.closest('[data-action]');
        if (!btn) return;

        const act = btn.getAttribute('data-action');

        if (act === 'toggle-theme') {
            State.theme = State.theme === 'light' ? 'dark' : 'light';
            localStorage.setItem('jayt_theme', State.theme);
            showToast(`Đã chuyển sang ${State.theme === 'light' ? 'Chế Độ Sáng Ngọc Trai ☀️' : 'Chế Độ Tối Hoàng Gia 🌙'}`);
            renderApp();
        } else if (act === 'filter') {
            State.activeCategory = btn.getAttribute('data-cat');
            renderApp();
        } else if (act === 'campus') {
            State.activeCampus = btn.getAttribute('data-campus');
            renderApp();
        } else if (act === 'open-mystery') {
            State.isMysteryOpen = !State.isMysteryOpen;
            renderApp();
        } else if (act === 'open-wheel') {
            State.isWheelOpen = !State.isWheelOpen;
            renderApp();
        } else if (act === 'spin-wheel') {
            if (State.isSpinning) return;
            State.isSpinning = true;
            const wheel = document.getElementById('wheelCanvasBox');
            const prizes = ['Grab 0Đ Đi Học 40K', 'Maycha Trân Châu Free', 'Cơm Gà A Hải Giảm 30K', 'Bắp Rang CGV Free', 'Xanh SM Voucher 20K', 'Katinat Bánh Nướng 1Đ'];
            const randomPrize = prizes[Math.floor(Math.random() * prizes.length)];
            const randomDeg = 1800 + Math.floor(Math.random() * 360);

            if (wheel) {
                wheel.style.transform = `rotate(${randomDeg}deg)`;
            }

            setTimeout(() => {
                State.isSpinning = false;
                State.wheelPrize = randomPrize;
                showToast(`Chúc mừng! Bạn đã trúng: ${randomPrize}`);
                renderApp();
            }, 3600);
        } else if (act === 'toggle-saved') {
            State.isSavedOpen = !State.isSavedOpen;
            renderApp();
        } else if (act === 'bookmark') {
            const id = btn.getAttribute('data-id');
            const idx = State.savedIds.indexOf(id);
            if (idx > -1) {
                State.savedIds.splice(idx, 1);
                showToast('Đã bỏ lưu ưu đãi.');
            } else {
                State.savedIds.push(id);
                showToast('❤️ Đã lưu vào danh sách của bạn!');
            }
            localStorage.setItem('jayt_favs', JSON.stringify(State.savedIds));
            renderApp();
        } else if (act === 'copy') {
            const code = btn.getAttribute('data-code') || '';
            if (navigator.clipboard) {
                navigator.clipboard.writeText(code).then(() => {
                    showToast(`Đã sao chép mã [${code}]! Mở app để dùng ngay.`);
                });
            }
        } else if (act === 'zalo-share') {
            const title = btn.getAttribute('data-title') || 'Đặc quyền Đà Nẵng 43';
            window.open(`https://zalo.me/share?url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(title)}`, '_blank', 'width=600,height=500');
        }
    });

    // Sliders
    document.body.addEventListener('input', function(e) {
        if (e.target.id === 'calcDrink') {
            State.calcDrink = parseInt(e.target.value, 10);
            renderApp();
        } else if (e.target.id === 'calcMeal') {
            State.calcMeal = parseInt(e.target.value, 10);
            renderApp();
        } else if (e.target.id === 'calcRide') {
            State.calcRide = parseInt(e.target.value, 10);
            renderApp();
        }
    });

    renderApp();
})();
