/**
 * JAYT APEX v14.0 — COMPLETE CONSUMER LIFESTYLE & COMMUNITY EDITION
 * =============================================================================
 * ĐẠI TRÙNG TU TOÀN DIỆN THẨM MỸ:
 * 1. XÓA BỎ HOÀN TOÀN HỘP RADAR GÂY RỐI MẮT Ở ĐẦU TRANG.
 * 2. ĐƯA HÌNH ẢNH MÓN ĂN THẬT & ƯU ĐÃI LÊN ĐẦU TRANG NGAY 1 GIÂY ĐẦU TIÊN!
 * 3. TIÊU ĐỀ ẤM ÁP: "Hôm Nay Đà Nẵng Đãi Bạn Món Gì? 🍜🧋"
 * 4. HEADER 1 HÀNG CO GIÃN TỰ NHIÊN, KHÔNG BAO GIỜ BỊ CẮT CHỮ ZALO KÍN.
 * 5. PHÂN LOẠI 1-CHẠM: Cơm Trưa 35K, Trà Sữa Mua 1 Tặng 1, Đi Xe 0Đ, Rạp Phim 55K.
 * =============================================================================
 */

(function() {
    'use strict';
    console.log("🚀 JayT Flagship Consumer Lifestyle Edition v14.0 Active");

    const DEALS_DATA = [
        {
            deal_id: 'DNG-MAYCHA-0D',
            merchant: 'Trà Sữa Maycha',
            branch: '38 Ngô Văn Sở (KTX Bách Khoa, Liên Chiểu)',
            title: 'Trà Sữa Trân Châu Kem Trứng Mua 1 Tặng 1',
            tag: '🧋 MUA 1 TẶNG 1',
            code: 'MAYCHA0D',
            category: 'DRINK',
            original_price: 48000,
            discount_price: 24000,
            saving: 24000,
            percent: 50,
            link: 'https://shopeefood.vn',
            image: 'https://images.unsplash.com/photo-1558857563-b37fe434c442?auto=format&fit=crop&w=800&q=80',
            badge_bg: 'linear-gradient(135deg, #EC4899, #BE185D)'
        },
        {
            deal_id: 'DNG-COMGA-AHAI',
            merchant: 'Cơm Gà A Hải',
            branch: '100 Thái Phiên (Hải Châu, gần Cầu Rồng)',
            title: 'Cơm Gà Quay Da Giòn Rụm + Canh Rong Biển',
            tag: '🍗 ĐẶC SẢN ĐÀ NẴNG',
            code: 'AHAI35K',
            category: 'FOOD',
            original_price: 65000,
            discount_price: 39000,
            saving: 26000,
            percent: 40,
            link: 'https://food.grab.com/vn/',
            image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=800&q=80',
            badge_bg: 'linear-gradient(135deg, #F97316, #C2410C)'
        },
        {
            deal_id: 'DNG-GRAB-0D',
            merchant: 'GrabCar Sân Bay Đà Nẵng',
            branch: 'Ga Quốc Nội & Quốc Tế, Sân bay Đà Nẵng',
            title: 'Chuyến Xe Đón / Tiễn Sân Bay Trợ Giá 50K',
            tag: '🚗 GIẢM 50.000₫',
            code: 'GRAB0DDN',
            category: 'RIDE',
            original_price: 90000,
            discount_price: 40000,
            saving: 50000,
            percent: 55,
            link: 'https://www.grab.com/vn/',
            image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=800&q=80',
            badge_bg: 'linear-gradient(135deg, #10B981, #047857)'
        },
        {
            deal_id: 'DNG-CGV-55K',
            merchant: 'CGV Vincom Ngô Quyền',
            branch: 'Tầng 4 Vincom Plaza, 910A Ngô Quyền, Sơn Trà',
            title: 'Vé Xem Phim 2D Đồng Giá HSSV & U22 Cả Tuần',
            tag: '🎬 VÉ ĐỒNG GIÁ 55K',
            code: 'CGVU22DN',
            category: 'CINEMA',
            original_price: 110000,
            discount_price: 55000,
            saving: 55000,
            percent: 50,
            link: 'https://www.cgv.vn',
            image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80',
            badge_bg: 'linear-gradient(135deg, #EF4444, #B91C1C)'
        },
        {
            deal_id: 'DNG-KATINAT-BD',
            merchant: 'Katinat Saigon Kafe',
            branch: '116 Bạch Đằng (View Sông Hàn Hải Châu)',
            title: 'Trà Sữa Chôm Chôm Mua Kèm Bánh Nướng 1Đ',
            tag: '🥤 VIEW SÔNG HÀN',
            code: 'KATINAT1D',
            category: 'DRINK',
            original_price: 75000,
            discount_price: 55000,
            saving: 20000,
            percent: 27,
            link: 'https://katinat.vn',
            image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=800&q=80',
            badge_bg: 'linear-gradient(135deg, #D97706, #B45309)'
        },
        {
            deal_id: 'DNG-XANHSM-30K',
            merchant: 'Xanh SM Taxi Điện Đà Nẵng',
            branch: 'Áp dụng toàn TP Đà Nẵng (6 Quận Huyện)',
            title: 'Mã Giảm 30K Đi Xe Thuần Điện VinFast Không Mùi',
            tag: '⚡ 0Đ KHỞI HÀNH',
            code: 'XANHDN30',
            category: 'RIDE',
            original_price: 60000,
            discount_price: 30000,
            saving: 30000,
            percent: 50,
            link: 'https://www.xanhsm.com',
            image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80',
            badge_bg: 'linear-gradient(135deg, #0284C7, #0369A1)'
        },
        {
            deal_id: 'DNG-JOLLIBEE-39K',
            merchant: 'Jollibee Co.opmart & Hòa Khánh',
            branch: '478 Điện Biên Phủ & KTX Bách Khoa',
            title: 'Combo Gà Giòn Sài Gòn + Mì Ý Bò Bằm + Nước',
            tag: '🍗 COMBO SINH VIÊN',
            code: 'JOLLIBEE39',
            category: 'FOOD',
            original_price: 72000,
            discount_price: 39000,
            saving: 33000,
            percent: 46,
            link: 'https://shopeefood.vn',
            image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80',
            badge_bg: 'linear-gradient(135deg, #E11D48, #9F1239)'
        },
        {
            deal_id: 'DNG-CHELIEN-HD',
            merchant: 'Chè Sầu Liên',
            branch: '189 Hoàng Diệu & 175 Hải Phòng (Hải Châu)',
            title: 'Chè Thái Sầu Riêng Đậm Đà Mua 4 Tặng 1 Tô',
            tag: '🍧 MUA 4 TẶNG 1',
            code: 'CHELIENFREE',
            category: 'FOOD',
            original_price: 45000,
            discount_price: 28000,
            saving: 17000,
            percent: 38,
            link: 'https://food.grab.com/vn/',
            image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80',
            badge_bg: 'linear-gradient(135deg, #84CC16, #4D7C0F)'
        }
    ];

    const State = {
        deals: DEALS_DATA,
        activeCategory: 'ALL',
        searchQuery: '',
        savedIds: JSON.parse(localStorage.getItem('jayt_favs') || '[]'),
        isSavedOpen: false,
        isMysteryOpen: false,
        calcDrink: 5,
        calcMeal: 6,
        calcRide: 6
    };

    function formatVND(n) {
        return new Intl.NumberFormat('vi-VN').format(n || 0) + '₫';
    }

    function showToast(msg) {
        let t = document.getElementById('jaytToast');
        if (!t) {
            t = document.createElement('div');
            t.id = 'jaytToast';
            t.style.cssText = 'position:fixed;top:24px;left:50%;transform:translateX(-50%);z-index:999999;background:#111827;color:#FFF;padding:0.75rem 1.6rem;border-radius:9999px;font-size:0.88rem;font-weight:700;box-shadow:0 15px 40px rgba(0,0,0,0.8);border:1.5px solid #10B981;display:flex;align-items:center;gap:0.6rem;animation:toastIn 0.3s ease;';
            document.body.appendChild(t);
        }
        t.innerHTML = `<span>✅</span> <span>${msg}</span>`;
        t.style.display = 'flex';
        clearTimeout(window.__tTimer);
        window.__tTimer = setTimeout(() => { if (t) t.style.display = 'none'; }, 2400);
    }

    function renderApp() {
        const root = document.getElementById('jaytAppRoot') || document.body;

        const totalSavings = State.deals.reduce((s, d) => s + d.saving, 0);
        const savedCount = State.savedIds.length;
        const monthlyCalc = ((State.calcDrink * 22000) + (State.calcMeal * 26000) + (State.calcRide * 25000)) * 4;

        let filtered = State.deals.filter(d => {
            if (State.activeCategory !== 'ALL' && d.category !== State.activeCategory) return false;
            if (State.searchQuery) {
                const q = State.searchQuery.toLowerCase();
                if (!`${d.merchant} ${d.title} ${d.branch} ${d.code}`.toLowerCase().includes(q)) return false;
            }
            return true;
        });

        root.innerHTML = `
            <div style="min-height: 100vh; background-color: #0B0F19; color: #94A3B8; font-family: 'Plus Jakarta Sans', -apple-system, sans-serif; display: flex; flex-direction: column; justify-content: space-between;">
                
                <div>
                    <!-- TOP LIVE MARQUEE -->
                    <div style="background: #0D1322; border-bottom: 1px solid rgba(255,255,255,0.08); padding: 0.45rem 1.5rem; font-size: 0.78rem; color: #E2E8F0; display: flex; justify-content: space-between; align-items: center; overflow: hidden;">
                        <div class="marquee-track" style="flex: 1; white-space: nowrap;">
                            🔥 <strong>HÔM NAY TẠI ĐÀ NẴNG:</strong> CGV Vincom vé 55K · 🚗 GrabCar Sân Bay giảm 50K · 🧋 Maycha KTX Bách Khoa Mua 1 Tặng 1 · 🍗 Cơm gà A Hải giòn rụm 39K · ⚡ Xanh SM đón trong 3 phút!
                        </div>
                        <div style="display: flex; align-items: center; gap: 0.4rem; font-family: monospace; font-size: 0.72rem; color: #34D399; background: rgba(16,185,129,0.15); padding: 0.15rem 0.6rem; border-radius: 9999px; border: 1px solid rgba(16,185,129,0.3); flex-shrink: 0; margin-left: 1rem;">
                            <span style="width: 7px; height: 7px; border-radius: 50%; background: #10B981;"></span>
                            <span>RADAR 43 LIVE</span>
                        </div>
                    </div>

                    <!-- MASTER HEADER -->
                    <header style="background: rgba(11, 15, 25, 0.95); backdrop-filter: blur(20px); border-bottom: 1px solid rgba(255,255,255,0.08); padding: 0.85rem 1.5rem; position: sticky; top: 0; z-index: 1000;">
                        <div style="max-width: 1300px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; gap: 1rem;">
                            
                            <!-- Brand -->
                            <div style="display: flex; align-items: center; gap: 0.75rem; cursor: pointer;" onclick="window.scrollTo({top:0, behavior:'smooth'});">
                                <div style="width: 40px; height: 40px; border-radius: 12px; background: linear-gradient(135deg, #10B981, #059669); color: #FFF; display: flex; align-items: center; justify-content: center; font-size: 1.3rem; font-weight: 900; box-shadow: 0 4px 14px rgba(16,185,129,0.4);">J</div>
                                <div>
                                    <div style="font-size: 1.25rem; font-weight: 900; color: #FFFFFF; letter-spacing: -0.02em; display: flex; align-items: center; gap: 0.4rem;">
                                        <span>JayT</span> 
                                        <span style="font-size: 0.68rem; background: rgba(245,158,11,0.18); color: #FBBF24; border: 1px solid rgba(245,158,11,0.4); padding: 0.1rem 0.45rem; border-radius: 6px; font-weight: 800; font-family: monospace;">ĐÀ NẴNG 43</span>
                                    </div>
                                    <div style="font-size: 0.7rem; color: #64748B;">Cổng Thông Tin & Đặc Quyền Tiết Kiệm</div>
                                </div>
                            </div>

                            <!-- Actions -->
                            <div style="display: flex; align-items: center; gap: 0.6rem;">
                                <button data-action="open-mystery" class="shimmer-btn" style="background: linear-gradient(135deg, rgba(245,158,11,0.2), rgba(217,119,6,0.35)); border: 1.5px solid rgba(245,158,11,0.4); color: #FDE047; font-size: 0.8rem; font-weight: 800; padding: 0.48rem 1rem; border-radius: 9999px; cursor: pointer;">
                                    🎁 Quà 0Đ
                                </button>
                                <button data-action="toggle-saved" style="background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.08); color: #FFFFFF; font-size: 0.8rem; font-weight: 800; padding: 0.48rem 1rem; border-radius: 9999px; cursor: pointer;">
                                    ❤️ Đã Lưu (${savedCount})
                                </button>
                                <a href="https://zalo.me/g/danangdeal43" target="_blank" rel="noopener noreferrer" style="background: linear-gradient(135deg, #10B981, #059669); color: #FFFFFF; font-size: 0.8rem; font-weight: 800; padding: 0.5rem 1.1rem; border-radius: 9999px; text-decoration: none; display: inline-flex; align-items: center; gap: 0.35rem; box-shadow: 0 4px 14px rgba(16,185,129,0.35);">
                                    💬 Zalo Kín ↗
                                </a>
                            </div>
                        </div>
                    </header>

                    <!-- HERO: BẮT MẮT, NGON MIỆNG & HẤP DẪN NGAY ĐẦU TRANG -->
                    <section style="max-width: 1300px; margin: 0 auto; padding: 2.5rem 1.5rem 1.5rem; text-align: center;">
                        <div style="display: inline-flex; align-items: center; gap: 0.5rem; background: rgba(16,185,129,0.12); border: 1px solid rgba(16,185,129,0.3); color: #34D399; padding: 0.35rem 1.1rem; border-radius: 9999px; font-size: 0.82rem; font-weight: 800; margin-bottom: 1rem;">
                            📍 ĐẶC QUYỀN CỘNG ĐỒNG ĐÀ NẴNG 43
                        </div>

                        <h1 style="font-size: clamp(2rem, 4.5vw, 3.2rem); font-weight: 900; color: #FFFFFF; line-height: 1.25; margin-bottom: 0.8rem; letter-spacing: -0.02em;">
                            Hôm Nay Đà Nẵng Đãi Bạn Món Gì? <br>
                            <span style="background: linear-gradient(135deg, #34D399, #10B981); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
                                Đang Sẵn Sàng ${formatVND(totalSavings)} Tiết Kiệm
                            </span>
                        </h1>

                        <p style="font-size: 1rem; color: #94A3B8; max-width: 650px; margin: 0 auto 1.8rem; line-height: 1.6;">
                            Gom trọn mã ăn uống, trà sữa Maycha, Katinat, Cơm gà A Hải & chuyến xe Grab, Xanh SM 0Đ mỗi ngày. Anh em local kiểm định 24/24.
                        </p>

                        <!-- SEARCH BAR -->
                        <div style="max-width: 600px; margin: 0 auto 2rem; position: relative;">
                            <input type="text" id="dealSearchInput" placeholder="Tìm kiếm: Trà sữa Maycha, Cơm gà A Hải, Grab 0Đ, CGV 55k..." value="${State.searchQuery}" style="width: 100%; background: #111827; border: 2px solid rgba(16,185,129,0.35); border-radius: 9999px; padding: 0.95rem 1.4rem 0.95rem 3.2rem; color: #FFFFFF; font-size: 0.98rem; outline: none; box-shadow: 0 10px 30px rgba(0,0,0,0.5);" />
                            <span style="position: absolute; left: 1.2rem; top: 50%; transform: translateY(-50%); font-size: 1.25rem;">🔍</span>
                        </div>

                        <!-- 5 CATEGORY BUTTONS -->
                        <div style="display: flex; justify-content: center; gap: 0.65rem; flex-wrap: wrap; margin-bottom: 2.5rem;">
                            <button data-action="filter" data-cat="ALL" style="padding: 0.6rem 1.2rem; border-radius: 9999px; font-size: 0.86rem; font-weight: 800; cursor: pointer; border: 1px solid ${State.activeCategory === 'ALL' ? '#10B981' : 'rgba(255,255,255,0.08)'}; background: ${State.activeCategory === 'ALL' ? 'linear-gradient(135deg, rgba(16,185,129,0.25), rgba(5,150,105,0.35))' : 'rgba(255,255,255,0.04)'}; color: ${State.activeCategory === 'ALL' ? '#FFFFFF' : '#E2E8F0'};">
                                ✨ Tất Cả (${State.deals.length})
                            </button>
                            <button data-action="filter" data-cat="FOOD" style="padding: 0.6rem 1.2rem; border-radius: 9999px; font-size: 0.86rem; font-weight: 800; cursor: pointer; border: 1px solid ${State.activeCategory === 'FOOD' ? '#10B981' : 'rgba(255,255,255,0.08)'}; background: ${State.activeCategory === 'FOOD' ? 'linear-gradient(135deg, rgba(16,185,129,0.25), rgba(5,150,105,0.35))' : 'rgba(255,255,255,0.04)'}; color: ${State.activeCategory === 'FOOD' ? '#FFFFFF' : '#E2E8F0'};">
                                🍜 Cơm & Món Ngon Local
                            </button>
                            <button data-action="filter" data-cat="DRINK" style="padding: 0.6rem 1.2rem; border-radius: 9999px; font-size: 0.86rem; font-weight: 800; cursor: pointer; border: 1px solid ${State.activeCategory === 'DRINK' ? '#10B981' : 'rgba(255,255,255,0.08)'}; background: ${State.activeCategory === 'DRINK' ? 'linear-gradient(135deg, rgba(16,185,129,0.25), rgba(5,150,105,0.35))' : 'rgba(255,255,255,0.04)'}; color: ${State.activeCategory === 'DRINK' ? '#FFFFFF' : '#E2E8F0'};">
                                🧋 Trà Sữa & Cà Phê
                            </button>
                            <button data-action="filter" data-cat="RIDE" style="padding: 0.6rem 1.2rem; border-radius: 9999px; font-size: 0.86rem; font-weight: 800; cursor: pointer; border: 1px solid ${State.activeCategory === 'RIDE' ? '#10B981' : 'rgba(255,255,255,0.08)'}; background: ${State.activeCategory === 'RIDE' ? 'linear-gradient(135deg, rgba(16,185,129,0.25), rgba(5,150,105,0.35))' : 'rgba(255,255,255,0.04)'}; color: ${State.activeCategory === 'RIDE' ? '#FFFFFF' : '#E2E8F0'};">
                                🛵 Đi Xe Grab & Xanh SM
                            </button>
                            <button data-action="filter" data-cat="CINEMA" style="padding: 0.6rem 1.2rem; border-radius: 9999px; font-size: 0.86rem; font-weight: 800; cursor: pointer; border: 1px solid ${State.activeCategory === 'CINEMA' ? '#10B981' : 'rgba(255,255,255,0.08)'}; background: ${State.activeCategory === 'CINEMA' ? 'linear-gradient(135deg, rgba(16,185,129,0.25), rgba(5,150,105,0.35))' : 'rgba(255,255,255,0.04)'}; color: ${State.activeCategory === 'CINEMA' ? '#FFFFFF' : '#E2E8F0'};">
                                🎬 Rạp Chiếu Phim 55K
                            </button>
                        </div>
                    </section>

                    <!-- GRID DEAL CARDS CÓ ẢNH THẬT ĐẸP MẮT -->
                    <main style="max-width: 1300px; margin: 0 auto; padding: 0 1.5rem 3rem;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                            <h3 style="font-size: 1.3rem; font-weight: 900; color: #FFFFFF; display: flex; align-items: center; gap: 0.5rem;">
                                <span>🔥</span> <span>Kho Ưu Đãi Đang Hoạt Động (${filtered.length})</span>
                            </h3>
                            <span style="font-size: 0.78rem; color: #34D399; font-weight: 800; font-family: monospace;">● 100% CÒN HIỆU LỰC</span>
                        </div>

                        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(290px, 1fr)); gap: 1.5rem;">
                            ${filtered.map(deal => renderDealCard(deal)).join('')}
                        </div>
                    </main>

                    <!-- MÁY TÍNH TIẾT KIỆM -->
                    <section style="max-width: 900px; margin: 0 auto 3.5rem; padding: 0 1.5rem;">
                        <div style="background: rgba(17, 24, 39, 0.9); border: 1.5px solid rgba(16,185,129,0.35); border-radius: 20px; padding: 2.2rem; box-shadow: 0 16px 40px rgba(0,0,0,0.5);">
                            <div style="text-align: center; margin-bottom: 1.8rem;">
                                <div style="font-size: 2.5rem; margin-bottom: 0.4rem;">🧮</div>
                                <h2 style="font-size: 1.6rem; font-weight: 900; color: #FFFFFF; margin-bottom: 0.3rem;">Bảng Tính Số Tiền Bạn Tiết Kiệm Mỗi Tháng</h2>
                                <p style="font-size: 0.88rem; color: #94A3B8;">Kéo thanh trượt để xem bạn sẽ dôi ra bao nhiêu tiền khi săn deal trên JayT.</p>
                            </div>

                            <div style="display: flex; flex-direction: column; gap: 1.3rem; margin-bottom: 1.8rem;">
                                <div>
                                    <div style="display: flex; justify-content: space-between; font-size: 0.88rem; font-weight: 700; color: #FFFFFF; margin-bottom: 0.4rem;">
                                        <span>🧋 Trà sữa / Cà phê:</span>
                                        <strong style="color: #FBBF24; font-family: monospace;">${State.calcDrink} ly / tuần</strong>
                                    </div>
                                    <input type="range" min="0" max="14" value="${State.calcDrink}" id="calcDrink" style="width: 100%; accent-color: #10B981; cursor: pointer;" />
                                </div>
                                <div>
                                    <div style="display: flex; justify-content: space-between; font-size: 0.88rem; font-weight: 700; color: #FFFFFF; margin-bottom: 0.4rem;">
                                        <span>🍲 Bữa ăn ngoài (Grab / ShopeeFood):</span>
                                        <strong style="color: #FBBF24; font-family: monospace;">${State.calcMeal} bữa / tuần</strong>
                                    </div>
                                    <input type="range" min="0" max="14" value="${State.calcMeal}" id="calcMeal" style="width: 100%; accent-color: #10B981; cursor: pointer;" />
                                </div>
                                <div>
                                    <div style="display: flex; justify-content: space-between; font-size: 0.88rem; font-weight: 700; color: #FFFFFF; margin-bottom: 0.4rem;">
                                        <span>🛵 Chuyến xe công nghệ (Grab / Xanh SM):</span>
                                        <strong style="color: #FBBF24; font-family: monospace;">${State.calcRide} chuyến / tuần</strong>
                                    </div>
                                    <input type="range" min="0" max="14" value="${State.calcRide}" id="calcRide" style="width: 100%; accent-color: #10B981; cursor: pointer;" />
                                </div>
                            </div>

                            <div style="background: linear-gradient(135deg, rgba(16,185,129,0.15), rgba(5,150,105,0.08)); border: 1.5px solid #10B981; border-radius: 16px; padding: 1.5rem; text-align: center;">
                                <div style="font-size: 0.8rem; font-weight: 800; color: #34D399; text-transform: uppercase; font-family: monospace;">BẠN SẼ TIẾT KIỆM ĐƯỢC:</div>
                                <div style="font-family: monospace; font-size: 2.4rem; font-weight: 900; color: #10B981; margin: 0.3rem 0;">
                                    ${monthlyCalc.toLocaleString('vi-VN')} ₫ / tháng
                                </div>
                                <div style="font-size: 0.85rem; color: #E2E8F0; background: rgba(0,0,0,0.4); padding: 0.75rem 1rem; border-radius: 12px; margin-top: 0.6rem;">
                                    💡 <strong>Tương đương ~${(monthlyCalc * 12).toLocaleString('vi-VN')}₫/năm:</strong> Đủ tiền sắm điện thoại mới, đóng tiền trọ cả kỳ hoặc khao bạn bè ăn uống thả ga! 🎉
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <!-- MODAL MY JAYT -->
                ${State.isSavedOpen ? `
                    <div style="position: fixed; inset: 0; z-index: 99999; background: rgba(0,0,0,0.8); backdrop-filter: blur(8px); display: flex; justify-content: flex-end;">
                        <div style="background: #111827; width: 100%; max-width: 420px; height: 100%; box-shadow: -15px 0 40px rgba(0,0,0,0.8); border-left: 1px solid rgba(16,185,129,0.4); display: flex; flex-direction: column; justify-content: space-between; padding: 1.8rem; box-sizing: border-box;">
                            <div>
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 1rem;">
                                    <h3 style="font-size: 1.2rem; font-weight: 900; margin: 0; color: #FFF;">❤️ Mã Bạn Đã Lưu (${savedCount})</h3>
                                    <button data-action="toggle-saved" style="background: none; border: none; font-size: 1.6rem; cursor: pointer; color: #94A3B8;">&times;</button>
                                </div>
                                <div style="max-height: calc(100vh - 200px); overflow-y: auto; display: flex; flex-direction: column; gap: 0.9rem;">
                                    ${savedCount > 0 ? State.deals.filter(d => State.savedIds.includes(d.deal_id)).map(deal => `
                                        <div style="background: rgba(23,30,48,0.9); border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; padding: 1rem;">
                                            <div style="display: flex; justify-content: space-between; font-size: 0.85rem; font-weight: 800; margin-bottom: 0.35rem;">
                                                <span style="color: #FFF;">${deal.merchant}</span>
                                                <span style="color: #10B981; font-family: monospace;">-${deal.percent}%</span>
                                            </div>
                                            <div style="font-size: 0.8rem; color: #94A3B8; margin-bottom: 0.75rem;">${deal.title}</div>
                                            <div style="display: flex; gap: 0.5rem;">
                                                <button data-action="copy" data-code="${deal.code}" style="flex: 1; background: #111827; border: 1px solid rgba(245,158,11,0.4); color: #FBBF24; padding: 0.45rem; border-radius: 8px; font-size: 0.78rem; font-weight: 800; font-family: monospace; cursor: pointer;">
                                                    📋 ${deal.code}
                                                </button>
                                                <button data-action="bookmark" data-id="${deal.deal_id}" style="background: rgba(239,68,68,0.15); border: 1px solid rgba(239,68,68,0.35); color: #EF4444; padding: 0.45rem 0.75rem; border-radius: 8px; font-size: 0.78rem; cursor: pointer;">
                                                    Xóa
                                                </button>
                                            </div>
                                        </div>
                                    `).join('') : `
                                        <div style="text-align: center; padding: 3.5rem 1rem; color: #64748B;">
                                            <div style="font-size: 2.5rem; margin-bottom: 0.6rem;">💔</div>
                                            <p style="font-size: 0.9rem;">Bạn chưa lưu mã nào. Bấm nút ❤️ ở từng thẻ để lưu lại dùng dần!</p>
                                        </div>
                                    `}
                                </div>
                            </div>
                            <button data-action="toggle-saved" style="background: #10B981; color: #FFFFFF; border: none; padding: 0.85rem; border-radius: 12px; font-weight: 800; font-size: 0.9rem; cursor: pointer; text-align: center;">
                                Đóng Danh Sách
                            </button>
                        </div>
                    </div>
                ` : ''}

                <!-- MODAL RƯƠNG QUÀ 0Đ -->
                ${State.isMysteryOpen ? `
                    <div style="position: fixed; inset: 0; z-index: 100000; background: rgba(0,0,0,0.85); backdrop-filter: blur(10px); display: flex; align-items: center; justify-content: center; padding: 1.5rem;">
                        <div style="background: #111827; border: 1.5px solid rgba(245,158,11,0.4); border-radius: 24px; max-width: 460px; width: 100%; padding: 2.2rem; text-align: center; box-shadow: 0 25px 70px rgba(0,0,0,0.9);">
                            <div style="font-size: 3.5rem; margin-bottom: 0.6rem;">🎉</div>
                            <h3 style="font-size: 1.4rem; font-weight: 900; color: #FDE047; margin-bottom: 0.4rem;">Chúc Mừng Bạn Mở Được Quà 0Đ!</h3>
                            <p style="font-size: 0.88rem; color: #94A3B8; margin-bottom: 1.5rem; line-height: 1.5;">Grab trợ giá 100% chuyến xe đầu tiên 40K dành cho học sinh, sinh viên tại Đà Nẵng.</p>
                            <div style="background: rgba(23,30,48,0.9); border: 1.5px dashed #10B981; border-radius: 14px; padding: 1rem; margin-bottom: 1.5rem; font-family: monospace; font-size: 1.4rem; font-weight: 900; color: #10B981;">
                                GRAB0DDN
                            </div>
                            <div style="display: flex; gap: 0.6rem;">
                                <button data-action="copy" data-code="GRAB0DDN" style="flex: 1; background: #10B981; color: #FFF; border: none; padding: 0.75rem; border-radius: 12px; font-weight: 800; cursor: pointer;">
                                    📋 Sao Chép Mã
                                </button>
                                <button data-action="open-mystery" style="background: rgba(255,255,255,0.06); color: #FFFFFF; border: 1px solid rgba(255,255,255,0.08); padding: 0.75rem 1.2rem; border-radius: 12px; font-weight: 700; cursor: pointer;">
                                    Đóng
                                </button>
                            </div>
                        </div>
                    </div>
                ` : ''}

                <!-- GRAND FOOTER -->
                <footer style="background: #080C14; border-top: 1px solid rgba(255,255,255,0.08); padding: 3rem 1.5rem 2rem;">
                    <div style="max-width: 1300px; margin: 0 auto;">
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 2rem; margin-bottom: 2rem;">
                            <div>
                                <div style="font-size: 1.2rem; font-weight: 900; color: #FFF; margin-bottom: 0.6rem;">JayT Đà Nẵng 43</div>
                                <p style="font-size: 0.82rem; color: #64748B; line-height: 1.6;">Cổng thông tin phi lợi nhuận phục vụ cộng đồng sinh viên và người lao động Đà Nẵng săn deal ăn uống, di chuyển và giải trí tiết kiệm mỗi ngày.</p>
                            </div>
                            <div>
                                <h4 style="font-size: 0.85rem; font-weight: 800; color: #FBBF24; text-transform: uppercase; font-family: monospace; margin-bottom: 0.8rem;">Tọa Độ Bản Địa</h4>
                                <ul style="list-style: none; padding: 0; margin: 0; font-size: 0.82rem; color: #94A3B8; display: flex; flex-direction: column; gap: 0.45rem;">
                                    <li>🎓 KTX Bách Khoa • Sư Phạm Liên Chiểu</li>
                                    <li>☕ Bạch Đằng • View Sông Hàn Hải Châu</li>
                                    <li>🍜 Chợ Cồn • Chợ Hàn Đà Nẵng</li>
                                    <li>🏖️ Bãi Biển Mỹ Khê • Sơn Trà</li>
                                </ul>
                            </div>
                            <div>
                                <h4 style="font-size: 0.85rem; font-weight: 800; color: #FBBF24; text-transform: uppercase; font-family: monospace; margin-bottom: 0.8rem;">Cam Kết Minh Bạch</h4>
                                <ul style="list-style: none; padding: 0; margin: 0; font-size: 0.82rem; color: #94A3B8; display: flex; flex-direction: column; gap: 0.45rem;">
                                    <li>🛡️ Đối soát mã thực 100% trước khi đăng</li>
                                    <li>⚡ Cập nhật tự động liên tục mỗi 20s</li>
                                    <li>🚫 Không thu phí người dùng cuối</li>
                                </ul>
                            </div>
                            <div>
                                <h4 style="font-size: 0.85rem; font-weight: 800; color: #FBBF24; text-transform: uppercase; font-family: monospace; margin-bottom: 0.8rem;">Hỗ Trợ Cộng Đồng</h4>
                                <p style="font-size: 0.82rem; color: #94A3B8; margin-bottom: 0.6rem; line-height: 1.5;">Hỗ trợ cấp bù mã lỗi trong 3 phút qua Zalo CSKH 24/7.</p>
                                <a href="https://zalo.me/g/danangdeal43" target="_blank" rel="noopener noreferrer" style="color: #10B981; font-weight: 800; text-decoration: none; font-size: 0.85rem;">Vào Nhóm Zalo Kín ↗</a>
                            </div>
                        </div>

                        <div style="border-top: 1px solid rgba(255,255,255,0.08); padding-top: 1.5rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.6rem; font-size: 0.78rem; color: #64748B;">
                            <span>© 2026 JayT Corp. Phục vụ cộng đồng Đà Nẵng là số 1.</span>
                            <span>Phiên bản: Production Apex v14.0 Flagship Edition</span>
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

    function renderDealCard(deal) {
        const isFav = State.savedIds.includes(deal.deal_id);

        return `
            <div style="background: rgba(23, 30, 48, 0.85); border: 1px solid rgba(255,255,255,0.08); border-radius: 20px; display: flex; flex-direction: column; justify-content: space-between; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5); height: 100%;">
                
                <!-- ẢNH THẬT 16:10 -->
                <div style="position: relative; width: 100%; aspect-ratio: 16/10; overflow: hidden; background: #000;">
                    <img src="${deal.image}" alt="${deal.title}" style="width: 100%; height: 100%; object-fit: cover;" loading="lazy" />
                    
                    <div style="position: absolute; top: 10px; left: 10px; background: ${deal.badge_bg}; color: #FFF; padding: 0.25rem 0.65rem; border-radius: 9999px; font-family: monospace; font-size: 0.72rem; font-weight: 800; box-shadow: 0 4px 12px rgba(0,0,0,0.4);">
                        ${deal.tag}
                    </div>

                    <button data-action="bookmark" data-id="${deal.deal_id}" style="position: absolute; bottom: 10px; right: 10px; width: 34px; height: 34px; border-radius: 50%; background: rgba(11, 15, 25, 0.85); backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,0.2); color: ${isFav ? '#EF4444' : '#FFF'}; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 0.95rem;">
                        ${isFav ? '❤️' : '🤍'}
                    </button>
                </div>

                <!-- THÂN THẺ -->
                <div style="padding: 1.2rem; display: flex; flex-direction: column; justify-content: space-between; flex: 1; gap: 0.9rem;">
                    <div>
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
                            <span style="font-size: 0.82rem; font-weight: 800; color: #FBBF24; text-transform: uppercase; font-family: monospace;">${deal.merchant}</span>
                            <span style="font-size: 0.68rem; color: #10B981; font-weight: 700;">● Còn hiệu lực</span>
                        </div>

                        <h4 style="font-size: 1.05rem; font-weight: 800; color: #FFFFFF; line-height: 1.35; margin-bottom: 0.35rem;">
                            ${deal.title}
                        </h4>
                        <p style="font-size: 0.76rem; color: #94A3B8; margin-bottom: 0.6rem; line-height: 1.4;">
                            📍 ${deal.branch}
                        </p>

                        <div style="background: rgba(16, 185, 129, 0.08); border: 1.5px solid rgba(16, 185, 129, 0.35); border-radius: 12px; padding: 0.75rem 0.9rem; text-align: center;">
                            <div style="font-family: monospace; font-size: 1.25rem; font-weight: 900; color: #10B981; line-height: 1.15;">
                                TIẾT KIỆM ${formatVND(deal.saving)}
                            </div>
                            <div style="font-size: 0.78rem; font-weight: 700; color: #E2E8F0; margin-top: 0.2rem;">
                                Chỉ còn ${formatVND(deal.discount_price)} <span style="color: #64748B; text-decoration: line-through; margin-left: 0.3rem;">${formatVND(deal.original_price)}</span>
                            </div>
                        </div>
                    </div>

                    <!-- 2 NÚT HÀNH ĐỘNG -->
                    <div>
                        <div style="display: flex; gap: 0.5rem; margin-bottom: 0.5rem;">
                            <button data-action="copy" data-code="${deal.code}" style="flex: 1; background: #111827; border: 1.5px dashed rgba(245,158,11,0.4); color: #FBBF24; padding: 0.65rem 0.4rem; border-radius: 10px; font-weight: 800; font-size: 0.8rem; font-family: monospace; cursor: pointer;">
                                📋 ${deal.code}
                            </button>
                            <a href="${deal.link}" target="_blank" rel="noopener noreferrer" style="flex: 1.3; background: linear-gradient(135deg, #10B981 0%, #059669 100%); color: #FFFFFF; padding: 0.65rem 0.4rem; border-radius: 10px; font-weight: 800; font-size: 0.82rem; text-align: center; text-decoration: none; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 14px rgba(16,185,129,0.35);">
                                SĂN NGAY ➔
                            </a>
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.7rem;">
                            <button data-action="zalo-share" data-title="${deal.merchant} - ${deal.title}" style="background: none; border: none; color: #38BDF8; font-weight: 700; cursor: pointer; text-decoration: underline;">
                                ↗ Rủ bạn qua Zalo
                            </button>
                            <span style="color: #64748B; font-family: monospace;">Đã kiểm chứng ✅</span>
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

        if (act === 'filter') {
            State.activeCategory = btn.getAttribute('data-cat');
            renderApp();
        } else if (act === 'open-mystery') {
            State.isMysteryOpen = !State.isMysteryOpen;
            renderApp();
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
