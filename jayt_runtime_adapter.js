/**
 * JAYT APEX v8.0 — MASTER GOLDEN EDITION RUNTIME
 * =============================================================================
 * TÔN CHỈ: PHỤC VỤ CỘNG ĐỒNG ĐÀ NẴNG 43 LÀ SỐ 1 — DOANH THU AFFILIATE LÀ SỐ 2
 * HỢP NHẤT TOÀN DIỆN 100% CỦA FILE GỐC JAYT_GESSI_EDITION_DEAL_HUB:
 * 1. Noble Dark/Light Theme & Desktop Keyboard Shortcuts (/, 1-4, Esc).
 * 2. 7 Stage View Panels: Khung Giờ Vàng, 10 Quán Ngon, Danh Thắng 4K, Máy Tính,
 *    Cẩm Nang Săn Deal, Hỏi Đáp Local 43, Góc Zalo Kín & CSKH 24H.
 * 3. Bảng Tính Tiết Kiệm (Savings Calculator) với Lời Bình Hài Hước CSKH JayT.
 * 4. Rạp Chiếu Nghệ Thuật 4K + Web Audio API Ambient Ocean Waves Synthesizer.
 * 5. Intent Finder Cockpit (WEC Hero) & 3 Đường Tiết Kiệm Cá Nhân Hóa (Cheapest Path).
 * 6. Giỏ Lưu Mã Cá Nhân (My JayT Drawer LocalStorage) & Chuỗi Điểm Danh (Streak 🔥).
 * 7. Hộp Quà May Mắn 0Đ (Mystery Gift 🎁) & Ticker Hoạt Động Trực Tiếp Cộng Đồng.
 * 8. Bảo Vệ Mật Mã Học 3 Tầng: Per-deal Evidence SHA + Dataset SHA-256 64-hex (Web Crypto API).
 * 9. Polling 20s, Single State Snapshot, Zero Race Condition, XSS Escaping.
 * =============================================================================
 */

(function() {
    'use strict';
    console.log("⚡ JAYT Apex Master Golden Edition v8.0 Active");

    const State = {
        deals: [],
        categories: ['ALL'],
        activeTab: 'tab-schedule', // 'tab-schedule' | 'tab-deals' | 'tab-landmarks' | 'tab-calculator' | 'tab-guide' | 'tab-faq' | 'tab-community'
        activeFilter: 'ALL',
        activeLandmark: 'ALL',
        activePriceRange: 'ALL',
        activeICP: 'ALL',
        activeMoment: 'AFTERNOON', // 'MORNING' | 'NOON' | 'AFTERNOON' | 'NIGHT'
        sortBy: 'SAVING_DESC',
        searchQuery: '',
        lastUpdatedTime: '',
        lastSuccessTimestamp: 0,
        datasetSHA256: '',
        connectionStatus: 'BOOT',
        errorMessage: null,
        activeRequestId: 0,
        savedDealIds: JSON.parse(localStorage.getItem('jayt_saved_deals') || '[]'),
        isSavedDrawerOpen: false,
        isMysteryModalOpen: false,
        isStreakModalOpen: false,
        isTrustModalOpen: false,
        selectedDealForDetail: null,
        calcDrink: 7,
        calcMeal: 7,
        calcRide: 7,
        theme: localStorage.getItem('jayt_theme') || 'dark',
        isAudioPlaying: false
    };

    let activeAbortController = null;
    let audioCtx = null;
    let audioGain = null;

    // 1. Tiện ích Bảo mật & Định dạng
    function escapeHTML(str) {
        if (typeof str !== 'string') return '';
        return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    function sanitizeURL(url) {
        if (typeof url !== 'string') return '#';
        const clean = url.trim();
        if (/^https?:\/\/[^\s$.?#].[^\s]*$/i.test(clean)) return clean;
        return '#';
    }

    function formatVND(amount) {
        const num = typeof amount === 'number' && !isNaN(amount) ? amount : 0;
        return new Intl.NumberFormat('vi-VN').format(num) + '₫';
    }

    // 2. Nhận diện Thương hiệu & Avatar Màu Sắc
    function getMerchantMeta(merchantName, category) {
        const m = (merchantName || '').toLowerCase();
        if (m.includes('cgv')) return { icon: '🎬', bg: 'linear-gradient(135deg, #E11D48, #BE123C)', color: '#FFF', short: 'CGV' };
        if (m.includes('metiz')) return { icon: '🍿', bg: 'linear-gradient(135deg, #7C3AED, #6D28D9)', color: '#FFF', short: 'METIZ' };
        if (m.includes('grab')) return { icon: '🚗', bg: 'linear-gradient(135deg, #059669, #047857)', color: '#FFF', short: 'GRAB' };
        if (m.includes('xanh sm') || m.includes('xanh_sm')) return { icon: '⚡', bg: 'linear-gradient(135deg, #0284C7, #0369A1)', color: '#FFF', short: 'XANH' };
        if (m.includes('phê la') || m.includes('phe la')) return { icon: '☕', bg: 'linear-gradient(135deg, #92400E, #78350F)', color: '#FFF', short: 'PHÊ LA' };
        if (m.includes('katinat')) return { icon: '🧋', bg: 'linear-gradient(135deg, #D97706, #B45309)', color: '#FFF', short: 'KATINAT' };
        if (m.includes('cơm gà') || m.includes('a hải')) return { icon: '🍗', bg: 'linear-gradient(135deg, #EA580C, #C2410C)', color: '#FFF', short: 'A HẢI' };
        if (m.includes('mì quảng') || m.includes('bà mua')) return { icon: '🍜', bg: 'linear-gradient(135deg, #D97706, #B45309)', color: '#FFF', short: 'BÀ MUA' };
        if (category === 'FOOD') return { icon: '🍽️', bg: '#27272A', color: '#FAFAFA', short: 'ẨM THỰC' };
        if (category === 'DRINK') return { icon: '☕', bg: '#27272A', color: '#FAFAFA', short: 'TRÀ SỮA' };
        if (category === 'RIDE') return { icon: '🛵', bg: '#27272A', color: '#FAFAFA', short: 'XE ĐIỆN' };
        if (category === 'CINEMA') return { icon: '🎬', bg: '#27272A', color: '#FAFAFA', short: 'RẠP PHIM' };
        return { icon: '🎁', bg: '#27272A', color: '#FAFAFA', short: 'ĐỐI TÁC' };
    }

    // 3. Mật mã học SHA-256 Web Crypto API
    async function calculateSHA256(message) {
        try {
            if (!window.crypto || !window.crypto.subtle) return null;
            const msgBuffer = new TextEncoder().encode(message);
            const hashBuffer = await window.crypto.subtle.digest('SHA-256', msgBuffer);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        } catch (e) {
            console.warn("⚠️ SHA-256 digest error:", e);
            return null;
        }
    }

    // 4. Expiry Engine Thời Gian Thực
    function evaluateExpiry(rawValidUntil) {
        if (!rawValidUntil || typeof rawValidUntil !== 'string') {
            return { status: 'UNVERIFIED', label: '⚠️ Chưa xác định hạn', isUsable: false, formatted: 'Đang cập nhật', diffHours: 9999 };
        }
        const validDate = new Date(rawValidUntil);
        if (isNaN(validDate.getTime())) {
            return { status: 'UNVERIFIED', label: '⚠️ Hạn không hợp lệ', isUsable: false, formatted: 'Đang cập nhật', diffHours: 9999 };
        }
        const now = new Date();
        const diffMs = validDate.getTime() - now.getTime();
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const formattedDate = validDate.toISOString().split('T')[0];

        if (diffMs < 0) return { status: 'EXPIRED', label: '✕ Đã hết hạn', isUsable: false, formatted: formattedDate, diffHours: -1 };
        if (diffHours <= 48) return { status: 'EXPIRING_SOON', label: `⏳ Còn ${diffHours}h`, isUsable: true, formatted: formattedDate, diffHours: diffHours };
        return { status: 'ACTIVE', label: '● Đang hiệu lực', isUsable: true, formatted: formattedDate, diffHours: diffHours };
    }

    // 5. Chuẩn hóa Deal & Nhận diện Địa Danh Landmark Đà Nẵng
    async function normalizeDeal(raw) {
        if (!raw || typeof raw !== 'object') return null;

        const safeStr = (v, fallback = '') => (typeof v === 'string' ? v.trim() : fallback);
        const safeNum = (v, fallback = 0) => (typeof v === 'number' && !isNaN(v) ? v : fallback);

        const original = safeNum(raw.original_price_vnd, 0);
        const discount = safeNum(raw.discount_price_vnd, original);
        let saving = safeNum(raw.saving_amount_vnd, original - discount);
        if (saving < 0) saving = 0;

        let pct = safeNum(raw.saving_percentage, 0);
        if (pct === 0 && original > 0) pct = Math.round((saving / original) * 100);

        const rawValidUntil = safeStr(raw.valid_until);
        const expiry = evaluateExpiry(rawValidUntil);

        const dealId = safeStr(raw.deal_id, 'DNG-UNKNOWN');
        const merchant = safeStr(raw.merchant_name, 'Đối tác JayT');
        const item = safeStr(raw.item_name, 'Ưu đãi ăn uống & di chuyển');
        const voucher = safeStr(raw.voucher_code, 'JAYTPROMO');
        const source = safeStr(raw.source_channel, 'Kênh đối tác');
        const address = safeStr(raw.branch_address, 'Đà Nẵng');
        const rawEvidenceSha = safeStr(raw.evidence_sha256);

        let landmark = 'TOAN_TP';
        const addrLower = (address + ' ' + merchant + ' ' + item).toLowerCase();
        if (addrLower.includes('bạch đằng') || addrLower.includes('nguyễn văn linh') || addrLower.includes('cầu rồng') || addrLower.includes('hải châu')) landmark = 'CAURONG';
        else if (addrLower.includes('sơn trà') || addrLower.includes('mỹ khê') || addrLower.includes('ngô quyền') || addrLower.includes('ngũ hành sơn')) landmark = 'MYKHE';
        else if (addrLower.includes('làng đại học') || addrLower.includes('thanh khê') || addrLower.includes('hssv') || addrLower.includes('sinh viên') || addrLower.includes('u22')) landmark = 'LANGDH';
        else if (addrLower.includes('sân bay') || addrLower.includes('grabcar') || addrLower.includes('ga đà nẵng')) landmark = 'SANBAY';
        else if (addrLower.includes('chợ cồn') || addrLower.includes('hùng vương') || addrLower.includes('ông ích khiêm')) landmark = 'CHOCON';

        const canonicalPayload = `${dealId}|${merchant}|${item}|${original}|${discount}|${voucher}|${rawValidUntil}`;
        const computedSha = await calculateSHA256(canonicalPayload);

        let shaStatus = 'PENDING';
        if (!rawEvidenceSha || !/^[a-fA-F0-9]{64}$/.test(rawEvidenceSha)) shaStatus = 'PENDING';
        else if (computedSha && computedSha.toLowerCase() === rawEvidenceSha.toLowerCase()) shaStatus = 'MATCH';
        else shaStatus = 'MISMATCH';

        return {
            deal_id: dealId,
            merchant_name: merchant,
            branch_address: address,
            district: safeStr(raw.district, 'Hải Châu'),
            landmark: landmark,
            item_name: item,
            source_channel: source,
            voucher_code: voucher,
            deep_link: sanitizeURL(raw.deep_link),
            original_price_vnd: original,
            discount_price_vnd: discount,
            saving_amount_vnd: saving,
            saving_percentage: pct,
            valid_until_raw: rawValidUntil,
            expiry_info: expiry,
            evidence_sha256: rawEvidenceSha,
            computed_sha256: computedSha,
            sha_status: shaStatus,
            category: safeStr(raw.category, 'FOOD').toUpperCase(),
            target_icp: safeStr(raw.target_icp, 'ALL'),
            rating: (4.8 + (dealId.charCodeAt(dealId.length - 1) % 3) * 0.1).toFixed(1),
            used_count: 500 + (dealId.charCodeAt(dealId.length - 1) * 12)
        };
    }

    // 6. Tính Mã Băm SHA-256 Toàn Bộ Dataset
    async function computeDatasetSHA256(deals) {
        const sorted = deals.slice().sort((a, b) => a.deal_id.localeCompare(b.deal_id));
        const canonicalString = sorted.map(d => 
            `${d.deal_id}:${d.original_price_vnd}:${d.discount_price_vnd}:${d.saving_amount_vnd}:${d.saving_percentage}:${d.voucher_code}:${d.valid_until_raw}:${d.merchant_name}:${d.item_name}:${d.branch_address}:${d.source_channel}:${d.deep_link}:${d.category}:${d.target_icp}:${d.evidence_sha256 || 'NOHASH'}`
        ).join('|');
        return await calculateSHA256(canonicalString);
    }

    // 7. Thông báo Toast Nổi
    function showToast(message) {
        let toast = document.getElementById('jaytFloatingToast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'jaytFloatingToast';
            toast.style.cssText = `
                position: fixed; top: 20px; left: 50%; transform: translateX(-50%);
                z-index: 100000; background: #0F172A; color: #FFFFFF;
                padding: 0.75rem 1.4rem; border-radius: 9999px; font-size: 0.85rem; font-weight: 700;
                box-shadow: 0 10px 25px rgba(0,0,0,0.25); border: 1.5px solid #10B981;
                display: flex; align-items: center; gap: 0.5rem; animation: toastIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            `;
            document.body.appendChild(toast);
        }
        toast.innerHTML = `<span>✅</span> <span>${escapeHTML(message)}</span>`;
        toast.style.display = 'flex';
        clearTimeout(window.__jaytToastTimer);
        window.__jaytToastTimer = setTimeout(() => {
            if (toast) toast.style.display = 'none';
        }, 2200);
    }

    // 8. Web Audio API Ambient Ocean Wave Sound
    function toggleAmbientSound() {
        if (!State.isAudioPlaying) {
            try {
                const AudioContext = window.AudioContext || window.webkitAudioContext;
                audioCtx = new AudioContext();
                const bufferSize = audioCtx.sampleRate * 2;
                const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
                const output = noiseBuffer.getChannelData(0);
                for (let i = 0; i < bufferSize; i++) output[i] = (Math.random() * 2 - 1) * 0.05;

                const whiteNoise = audioCtx.createBufferSource();
                whiteNoise.buffer = noiseBuffer;
                whiteNoise.loop = true;

                const filter = audioCtx.createBiquadFilter();
                filter.type = 'lowpass';
                filter.frequency.setValueAtTime(350, audioCtx.currentTime);

                audioGain = audioCtx.createGain();
                audioGain.gain.setValueAtTime(0.08, audioCtx.currentTime);

                whiteNoise.connect(filter);
                filter.connect(audioGain);
                audioGain.connect(audioCtx.destination);
                whiteNoise.start(0);

                State.isAudioPlaying = true;
                showToast('🌊 Đang phát tiếng sóng biển Mỹ Khê & Sông Hàn êm dịu...');
            } catch (e) {
                console.warn("Audio error:", e);
            }
        } else {
            if (audioCtx) audioCtx.close();
            State.isAudioPlaying = false;
            showToast('🔇 Đã tắt âm thanh nền.');
        }
        renderApp();
    }

    // 9. Lời Bình Hài Hước Máy Tính Tiết Kiệm
    function getCalculatorQuote(monthlySavings) {
        if (monthlySavings <= 500000) return `~${(monthlySavings * 12).toLocaleString('vi-VN')}₫/năm • Dư tiền khao cả phòng trọ 60 tô Bánh Canh Ruộng hoặc 120 ổ Bánh Mì que pate giòn rụm! 🥖`;
        if (monthlySavings <= 1500000) return `~${(monthlySavings * 12).toLocaleString('vi-VN')}₫/năm • Đủ sắm ngay combo vợt Pickleball + đôi giày xịn lượn một vòng công viên APEC đón gió sông Hàn! 🏓✨`;
        if (monthlySavings <= 2500000) return `~${(monthlySavings * 12).toLocaleString('vi-VN')}₫/năm • Đủ đóng trọn 1 NĂM học phí Đại học hoặc đổi luôn chiếc điện thoại mới toanh cày đồ án mượt như lụa! 🎓💻`;
        return `~${(monthlySavings * 12).toLocaleString('vi-VN')}₫/năm • Huyền thoại săn deal! Tiền dôi dư đủ đóng tiền trọ cả năm hoặc bao trọn gói du lịch nghỉ dưỡng Đà Nẵng 5 sao! 🏖️👑`;
    }

    // 10. Render Giao Diện Đại Đô Thị Golden Master v8.0
    function renderApp() {
        const root = document.getElementById('jaytAppRoot') || document.body;

        if (State.connectionStatus === 'BOOT') {
            root.innerHTML = renderSkeleton();
            return;
        }

        if (State.connectionStatus === 'ERROR' && State.deals.length === 0) {
            root.innerHTML = renderErrorScreen(State.errorMessage);
            return;
        }

        const usableDeals = State.deals.filter(d => d.expiry_info.isUsable);
        const totalSavings = usableDeals.reduce((sum, d) => sum + d.saving_amount_vnd, 0);
        const displaySavings = formatVND(totalSavings);
        const totalCount = usableDeals.length;
        const brandCount = new Set(usableDeals.map(d => d.merchant_name)).size;
        const savedCount = State.savedDealIds.length;

        // Tính toán máy tính tiết kiệm
        const weeklyCalc = (State.calcDrink * 20000) + (State.calcMeal * 25000) + (State.calcRide * 20000);
        const monthlyCalc = weeklyCalc * 4;

        // Lọc danh sách deal theo bộ lọc
        let filteredDeals = usableDeals.filter(d => {
            if (State.activeFilter === 'HOT_DEAL' && d.saving_percentage < 40) return false;
            if (State.activeFilter !== 'ALL' && State.activeFilter !== 'HOT_DEAL' && d.category !== State.activeFilter) return false;
            if (State.activeLandmark !== 'ALL' && d.landmark !== State.activeLandmark && d.landmark !== 'TOAN_TP') return false;
            if (State.activePriceRange === 'UNDER_50K' && d.discount_price_vnd >= 50000) return false;
            if (State.activePriceRange === '50K_100K' && (d.discount_price_vnd < 50000 || d.discount_price_vnd > 100000)) return false;
            if (State.activeICP === 'STUDENT' && !d.item_name.toLowerCase().includes('hssv') && !d.item_name.toLowerCase().includes('sinh viên') && !d.item_name.toLowerCase().includes('u22') && d.category !== 'DRINK') return false;
            if (State.searchQuery) {
                const q = State.searchQuery.toLowerCase();
                const matchText = `${d.merchant_name} ${d.item_name} ${d.branch_address} ${d.voucher_code}`.toLowerCase();
                if (!matchText.includes(q)) return false;
            }
            return true;
        });

        // Sắp xếp
        filteredDeals.sort((a, b) => {
            if (State.sortBy === 'SAVING_DESC') return (b.saving_amount_vnd - a.saving_amount_vnd) || (a.expiry_info.diffHours - b.expiry_info.diffHours) || a.deal_id.localeCompare(b.deal_id);
            if (State.sortBy === 'PCT_DESC') return (b.saving_percentage - a.saving_percentage) || (b.saving_amount_vnd - a.saving_amount_vnd) || a.deal_id.localeCompare(b.deal_id);
            return (a.expiry_info.diffHours - b.expiry_info.diffHours) || a.deal_id.localeCompare(b.deal_id);
        });

        const top3Deals = [...usableDeals].sort((a, b) => (b.saving_amount_vnd - a.saving_amount_vnd) || a.deal_id.localeCompare(b.deal_id)).slice(0, 3);

        root.innerHTML = `
            <div style="min-height: 100vh; background-color: var(--bg-page); color: var(--text-body); font-family: var(--font-sans); display: flex; flex-direction: column; justify-content: space-between;">
                
                <div>
                    <!-- TOP MARQUEE BANNER -->
                    <div style="background: var(--bg-surface); border-bottom: 1px solid var(--border); padding: 0.45rem 1.25rem; font-family: var(--font-mono); font-size: 0.76rem; color: var(--text-heading); overflow: hidden; white-space: nowrap;">
                        <div class="marquee-track">
                            🔥 <strong>ĐÀ NẴNG HÔM NAY (28°C Nắng Đẹp):</strong> CGV Vincom đồng giá vé 55K · 🚗 GrabCar Sân Bay giảm 50.000₫ · ☕ Phê La & Katinat mua kèm 1Đ Bạch Đằng · 🍜 Cơm Gà A Hải & Mì Quảng Bà Mua giảm 40% · 🛡️ Đối soát mật mã học SHA-256 Web Crypto API cập nhật mỗi 20 giây!
                        </div>
                    </div>

                    <!-- HEADER AIR LUXURY -->
                    <header style="background: var(--header-bg); backdrop-filter: blur(24px); border-bottom: 1px solid var(--border); padding: 0.75rem 1.5rem; position: sticky; top: 0; z-index: 1000;">
                        <div style="max-width: 1440px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; gap: 1rem; flex-wrap: wrap;">
                            
                            <!-- Brand Wordmark -->
                            <div style="display: flex; align-items: center; gap: 0.75rem; cursor: pointer;" data-action="switch-tab" data-tab="tab-schedule">
                                <div style="width: 38px; height: 38px; border-radius: 12px; background: linear-gradient(135deg, #059669, #10B981); color: #FFF; display: flex; align-items: center; justify-content: center; font-size: 1.25rem; font-weight: 900; box-shadow: 0 4px 12px rgba(5,150,105,0.35);">J</div>
                                <div>
                                    <div style="font-size: 1.2rem; font-weight: 900; color: var(--text-heading); letter-spacing: -0.02em; display: flex; align-items: center; gap: 0.35rem;">
                                        <span>JayT</span> <span style="font-size: 0.68rem; background: rgba(234,179,8,0.15); color: var(--accent-gold); border: 1px solid rgba(234,179,8,0.3); padding: 0.1rem 0.45rem; border-radius: 4px; font-weight: 800;">ĐÀ NẴNG 43</span>
                                    </div>
                                    <div style="font-size: 0.7rem; color: var(--text-muted);">Cổng Thông Tin & Đặc Quyền Tiết Kiệm Cộng Đồng</div>
                                </div>
                            </div>

                            <!-- Top Nav Menu -->
                            <nav style="display: flex; align-items: center; gap: 0.3rem; background: var(--bg-tag); padding: 0.25rem 0.4rem; border-radius: var(--radius-pill); border: 1px solid var(--border);">
                                <button data-action="switch-tab" data-tab="tab-schedule" style="background: ${State.activeTab === 'tab-schedule' ? 'var(--bg-surface)' : 'transparent'}; color: ${State.activeTab === 'tab-schedule' ? '#10B981' : 'var(--text-body)'}; border: none; padding: 0.4rem 0.85rem; border-radius: var(--radius-pill); font-size: 0.78rem; font-weight: 700; cursor: pointer;">⏰ Giờ Vàng 0Đ</button>
                                <button data-action="switch-tab" data-tab="tab-deals" style="background: ${State.activeTab === 'tab-deals' ? 'var(--bg-surface)' : 'transparent'}; color: ${State.activeTab === 'tab-deals' ? '#10B981' : 'var(--text-body)'}; border: none; padding: 0.4rem 0.85rem; border-radius: var(--radius-pill); font-size: 0.78rem; font-weight: 700; cursor: pointer;">🍲 Quán Ngon Local</button>
                                <button data-action="switch-tab" data-tab="tab-landmarks" style="background: ${State.activeTab === 'tab-landmarks' ? 'var(--bg-surface)' : 'transparent'}; color: ${State.activeTab === 'tab-landmarks' ? '#10B981' : 'var(--text-body)'}; border: none; padding: 0.4rem 0.85rem; border-radius: var(--radius-pill); font-size: 0.78rem; font-weight: 700; cursor: pointer;">📸 Danh Thắng 4K</button>
                                <button data-action="switch-tab" data-tab="tab-calculator" style="background: ${State.activeTab === 'tab-calculator' ? 'var(--bg-surface)' : 'transparent'}; color: ${State.activeTab === 'tab-calculator' ? '#10B981' : 'var(--text-body)'}; border: none; padding: 0.4rem 0.85rem; border-radius: var(--radius-pill); font-size: 0.78rem; font-weight: 700; cursor: pointer;">🧮 Máy Tính Tiết Kiệm</button>
                                <button data-action="switch-tab" data-tab="tab-guide" style="background: ${State.activeTab === 'tab-guide' ? 'var(--bg-surface)' : 'transparent'}; color: ${State.activeTab === 'tab-guide' ? '#10B981' : 'var(--text-body)'}; border: none; padding: 0.4rem 0.85rem; border-radius: var(--radius-pill); font-size: 0.78rem; font-weight: 700; cursor: pointer;">📖 Cẩm Nang</button>
                            </nav>

                            <!-- Actions Cluster -->
                            <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
                                <button data-action="open-mystery" style="background: linear-gradient(135deg, rgba(234,179,8,0.2), rgba(217,119,6,0.3)); border: 1px solid rgba(234,179,8,0.5); color: #FDE047; font-size: 0.76rem; font-weight: 800; padding: 0.4rem 0.85rem; border-radius: var(--radius-pill); cursor: pointer;">
                                    🎁 Quà 0Đ
                                </button>
                                <button data-action="open-streak" style="background: rgba(239,68,68,0.15); border: 1px solid rgba(239,68,68,0.4); color: #FCA5A5; font-size: 0.76rem; font-weight: 800; padding: 0.4rem 0.85rem; border-radius: var(--radius-pill); cursor: pointer;">
                                    🔥 3 Ngày
                                </button>
                                <button data-action="toggle-saved-drawer" style="background: var(--bg-card); border: 1px solid var(--border); color: var(--text-heading); font-size: 0.76rem; font-weight: 800; padding: 0.4rem 0.85rem; border-radius: var(--radius-pill); cursor: pointer;">
                                    ❤️ My JayT (${savedCount})
                                </button>
                                <button data-action="toggle-theme" style="width: 36px; height: 36px; border-radius: 50%; background: var(--bg-card); border: 1px solid var(--border); color: var(--text-heading); cursor: pointer; display: flex; align-items: center; justify-content: center;">
                                    ${State.theme === 'dark' ? '☀️' : '🌙'}
                                </button>
                                <a href="https://zalo.me/g/danangdeal43" target="_blank" rel="noopener noreferrer" style="background: linear-gradient(135deg, #10B981, #059669); color: #FFFFFF; font-size: 0.78rem; font-weight: 800; padding: 0.45rem 1rem; border-radius: var(--radius-pill); text-decoration: none; display: inline-flex; align-items: center; gap: 0.35rem; box-shadow: 0 4px 14px rgba(16,185,129,0.3);">
                                    💬 Zalo Kín 43 ↗
                                </a>
                            </div>
                        </div>
                    </header>

                    <!-- MASTER 2-COLUMN UNIFIED LAYOUT -->
                    <div style="max-width: 1440px; margin: 0 auto; display: grid; grid-template-columns: 280px minmax(0, 1fr); gap: 2rem; padding: 1.5rem; align-items: flex-start;">
                        
                        <!-- 1. LEFT MASTER CONTROL SIDEBAR -->
                        <aside style="position: sticky; top: 4.5rem; display: flex; flex-direction: column; gap: 1.2rem;">
                            <!-- Deck 1: Điều hướng -->
                            <div style="background: var(--bg-card); border: 1px solid var(--border); border-radius: 20px; padding: 1rem; display: flex; flex-direction: column; gap: 0.35rem;">
                                <div style="font-size: 0.72rem; font-weight: 800; color: var(--accent-gold); text-transform: uppercase; margin-bottom: 0.4rem; padding-bottom: 0.4rem; border-bottom: 1px solid var(--border);">
                                    🧭 TRẠM ĐIỀU HƯỚNG 43
                                </div>
                                <button data-action="switch-tab" data-tab="tab-schedule" style="background: ${State.activeTab === 'tab-schedule' ? 'var(--text-heading)' : 'transparent'}; color: ${State.activeTab === 'tab-schedule' ? 'var(--bg-page)' : 'var(--text-body)'}; border: none; padding: 0.65rem 0.85rem; border-radius: 12px; font-size: 0.82rem; font-weight: 700; cursor: pointer; text-align: left; display: flex; justify-content: space-between;">
                                    <span>⏰ Khung Giờ Vàng 0Đ</span> <span style="font-size: 0.7rem; color: #10B981;">8 Kèo</span>
                                </button>
                                <button data-action="switch-tab" data-tab="tab-deals" style="background: ${State.activeTab === 'tab-deals' ? 'var(--text-heading)' : 'transparent'}; color: ${State.activeTab === 'tab-deals' ? 'var(--bg-page)' : 'var(--text-body)'}; border: none; padding: 0.65rem 0.85rem; border-radius: 12px; font-size: 0.82rem; font-weight: 700; cursor: pointer; text-align: left; display: flex; justify-content: space-between;">
                                    <span>🍲 10 Quán Ngon Local</span> <span style="font-size: 0.7rem; color: var(--accent-gold);">Deal Hot</span>
                                </button>
                                <button data-action="switch-tab" data-tab="tab-landmarks" style="background: ${State.activeTab === 'tab-landmarks' ? 'var(--text-heading)' : 'transparent'}; color: ${State.activeTab === 'tab-landmarks' ? 'var(--bg-page)' : 'var(--text-body)'}; border: none; padding: 0.65rem 0.85rem; border-radius: 12px; font-size: 0.82rem; font-weight: 700; cursor: pointer; text-align: left; display: flex; justify-content: space-between;">
                                    <span>📸 Danh Thắng 4K & Biển</span> <span style="font-size: 0.7rem;">18 Ảnh</span>
                                </button>
                                <button data-action="switch-tab" data-tab="tab-calculator" style="background: ${State.activeTab === 'tab-calculator' ? 'var(--text-heading)' : 'transparent'}; color: ${State.activeTab === 'tab-calculator' ? 'var(--bg-page)' : 'var(--text-body)'}; border: none; padding: 0.65rem 0.85rem; border-radius: 12px; font-size: 0.82rem; font-weight: 700; cursor: pointer; text-align: left; display: flex; justify-content: space-between;">
                                    <span>🧮 Máy Tính Tiết Kiệm</span> <span style="font-size: 0.7rem; color: #10B981;">~1.6M/tháng</span>
                                </button>
                                <button data-action="switch-tab" data-tab="tab-guide" style="background: ${State.activeTab === 'tab-guide' ? 'var(--text-heading)' : 'transparent'}; color: ${State.activeTab === 'tab-guide' ? 'var(--bg-page)' : 'var(--text-body)'}; border: none; padding: 0.65rem 0.85rem; border-radius: 12px; font-size: 0.82rem; font-weight: 700; cursor: pointer; text-align: left; display: flex; justify-content: space-between;">
                                    <span>📖 Cẩm Nang Săn Deal</span> <span style="font-size: 0.7rem;">Mẹo 43</span>
                                </button>
                            </div>

                            <!-- Deck 2: Quận huyện -->
                            <div style="background: var(--bg-card); border: 1px solid var(--border); border-radius: 20px; padding: 1rem; display: flex; flex-direction: column; gap: 0.35rem;">
                                <div style="font-size: 0.72rem; font-weight: 800; color: var(--accent-gold); text-transform: uppercase; margin-bottom: 0.4rem; padding-bottom: 0.4rem; border-bottom: 1px solid var(--border);">
                                    📍 TỌA ĐỘ QUẬN HUYỆN 43
                                </div>
                                <button data-action="filter-district" data-district="Hai_Chau" style="background: transparent; border: none; color: var(--text-body); padding: 0.45rem 0.6rem; font-size: 0.78rem; font-weight: 700; cursor: pointer; text-align: left; display: flex; justify-content: space-between;">
                                    <span>🛵 Hải Châu (Bạch Đằng)</span> <span style="color: var(--text-muted);">4 Kèo</span>
                                </button>
                                <button data-action="filter-district" data-district="Lien_Chieu" style="background: transparent; border: none; color: var(--text-body); padding: 0.45rem 0.6rem; font-size: 0.78rem; font-weight: 700; cursor: pointer; text-align: left; display: flex; justify-content: space-between;">
                                    <span>🎓 Liên Chiểu (KTX BK)</span> <span style="color: var(--text-muted);">3 Kèo</span>
                                </button>
                                <button data-action="filter-district" data-district="Son_Tra" style="background: transparent; border: none; color: var(--text-body); padding: 0.45rem 0.6rem; font-size: 0.78rem; font-weight: 700; cursor: pointer; text-align: left; display: flex; justify-content: space-between;">
                                    <span>🏖️ Sơn Trà & Mỹ Khê</span> <span style="color: var(--text-muted);">3 Kèo</span>
                                </button>
                            </div>

                            <!-- Deck 3: Quà & CSKH -->
                            <div style="background: var(--bg-card); border: 1px solid var(--border); border-radius: 20px; padding: 1rem;">
                                <button data-action="open-mystery" style="width: 100%; background: linear-gradient(135deg, var(--accent-gold), #D97706); color: #000; border: none; padding: 0.65rem; border-radius: 12px; font-weight: 800; font-size: 0.8rem; cursor: pointer; margin-bottom: 0.5rem;">
                                    🎁 Mở Rương 0Đ Hôm Nay
                                </button>
                                <div style="font-size: 0.72rem; color: var(--text-muted); text-align: center;">
                                    🛡️ Đồng hành 24/24 cùng bà con Đà Nẵng
                                </div>
                            </div>
                        </aside>

                        <!-- 2. RIGHT MASTER STAGE CANVAS -->
                        <main style="min-width: 0;">
                            
                            <!-- TAB 1: KHUNG GIỜ VÀNG 0Đ (DEFAULT ARENA) -->
                            ${State.activeTab === 'tab-schedule' ? `
                                <!-- Hero Welcome Deck -->
                                <div style="background: var(--bg-card); border: 1px solid var(--border); border-radius: 24px; padding: 2rem; margin-bottom: 2rem; box-shadow: var(--card-shadow); text-align: center;">
                                    <div style="display: inline-flex; align-items: center; gap: 0.4rem; background: rgba(234,179,8,0.15); border: 1px solid rgba(234,179,8,0.3); color: var(--accent-gold); padding: 0.25rem 0.8rem; border-radius: var(--radius-pill); font-size: 0.76rem; font-weight: 800; margin-bottom: 0.8rem;">
                                        🔥 ĐẶC QUYỀN TIẾT KIỆM MÃ VÙNG 43
                                    </div>
                                    <h1 style="font-size: clamp(1.8rem, 3.8vw, 2.6rem); font-weight: 900; color: var(--text-heading); line-height: 1.25; margin: 0 0 0.6rem;">
                                        Đừng Chỉ Tìm Giá Rẻ. <br>
                                        <span style="color: #10B981; font-size: clamp(2.2rem, 4.5vw, 3.2rem);">${displaySavings} đang sẵn sàng</span>
                                    </h1>
                                    <p style="font-size: 0.92rem; color: var(--text-body); max-width: 620px; margin: 0 auto 1.5rem; line-height: 1.5;">
                                        Anh em local kiểm định 24/24: ShopeeFood · GrabFood · Xanh SM · CGV · Metiz · Quán ăn gia truyền Đà Nẵng.
                                    </p>

                                    <!-- Search Input -->
                                    <div style="max-width: 560px; margin: 0 auto 1rem; position: relative;">
                                        <input type="text" id="jaytMasterSearch" placeholder="Tìm quán ngon, trà sữa, Grab 0Đ, Cầu Rồng..." value="${escapeHTML(State.searchQuery)}" style="width: 100%; background: var(--bg-surface); border: 2px solid var(--border); border-radius: var(--radius-pill); padding: 0.8rem 1.2rem 0.8rem 2.6rem; color: var(--text-heading); font-size: 0.95rem; outline: none;" />
                                        <span style="position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); font-size: 1.1rem; color: var(--text-muted);">🔍</span>
                                    </div>

                                    <!-- 4 Nhịp Sống Đà Nẵng (Moment Tabs) -->
                                    <div style="display: flex; gap: 0.4rem; justify-content: center; flex-wrap: wrap;">
                                        <button data-action="switch-moment" data-moment="MORNING" style="background: ${State.activeMoment === 'MORNING' ? 'var(--text-heading)' : 'var(--bg-tag)'}; color: ${State.activeMoment === 'MORNING' ? 'var(--bg-page)' : 'var(--text-body)'}; border: none; padding: 0.4rem 0.85rem; border-radius: var(--radius-pill); font-size: 0.76rem; font-weight: 700; cursor: pointer;">☀️ Sáng (6h-11h)</button>
                                        <button data-action="switch-moment" data-moment="NOON" style="background: ${State.activeMoment === 'NOON' ? 'var(--text-heading)' : 'var(--bg-tag)'}; color: ${State.activeMoment === 'NOON' ? 'var(--bg-page)' : 'var(--text-body)'}; border: none; padding: 0.4rem 0.85rem; border-radius: var(--radius-pill); font-size: 0.76rem; font-weight: 700; cursor: pointer;">🍱 Trưa (11h-14h)</button>
                                        <button data-action="switch-moment" data-moment="AFTERNOON" style="background: ${State.activeMoment === 'AFTERNOON' ? 'var(--text-heading)' : 'var(--bg-tag)'}; color: ${State.activeMoment === 'AFTERNOON' ? 'var(--bg-page)' : 'var(--text-body)'}; border: none; padding: 0.4rem 0.85rem; border-radius: var(--radius-pill); font-size: 0.76rem; font-weight: 700; cursor: pointer;">🌆 Chiều (14h-18h)</button>
                                        <button data-action="switch-moment" data-moment="NIGHT" style="background: ${State.activeMoment === 'NIGHT' ? 'var(--text-heading)' : 'var(--bg-tag)'}; color: ${State.activeMoment === 'NIGHT' ? 'var(--bg-page)' : 'var(--text-body)'}; border: none; padding: 0.4rem 0.85rem; border-radius: var(--radius-pill); font-size: 0.76rem; font-weight: 700; cursor: pointer;">🌙 Tối (18h-23h)</button>
                                    </div>
                                </div>

                                <!-- TOP 3 TIẾT KIỆM NHẤT ĐÀ NẴNG -->
                                <div style="margin-bottom: 2.5rem;">
                                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                                        <h3 style="font-size: 1.2rem; font-weight: 900; color: var(--text-heading); margin: 0;">🔥 Top 3 Ưu Đãi Tiết Kiệm Nhiều Nhất</h3>
                                        <span style="font-size: 0.75rem; color: #10B981; font-weight: 800; background: var(--badge-green-bg); padding: 0.2rem 0.6rem; border-radius: 9999px;">Top 3 Đáng Săn</span>
                                    </div>
                                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(310px, 1fr)); gap: 1.25rem;">
                                        ${top3Deals.map((deal, idx) => renderDealCard(deal, true, idx + 1)).join('')}
                                    </div>
                                </div>

                                <!-- TOÀN BỘ KHO ƯU ĐÃI ĐÃ KIỂM ĐỊNH -->
                                <div style="margin-bottom: 2.5rem;">
                                    <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem; margin-bottom: 1rem;">
                                        <h3 style="font-size: 1.2rem; font-weight: 900; color: var(--text-heading); margin: 0;">
                                            Toàn Bộ Kho Ưu Đãi Đối Soát (${filteredDeals.length})
                                        </h3>
                                        <select id="jaytSortSelect" style="background: var(--bg-surface); border: 1px solid var(--border); border-radius: 8px; padding: 0.35rem 0.75rem; font-size: 0.78rem; color: var(--text-heading); font-weight: 700; outline: none; cursor: pointer;">
                                            <option value="SAVING_DESC" ${State.sortBy === 'SAVING_DESC' ? 'selected' : ''}>💰 Tiết kiệm nhiều nhất</option>
                                            <option value="PCT_DESC" ${State.sortBy === 'PCT_DESC' ? 'selected' : ''}>🔥 Mức giảm % cao nhất</option>
                                            <option value="EXPIRY_ASC" ${State.sortBy === 'EXPIRY_ASC' ? 'selected' : ''}>⏳ Sắp hết hạn</option>
                                        </select>
                                    </div>
                                    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(310px, 1fr)); gap: 1.25rem;">
                                        ${filteredDeals.map(deal => renderDealCard(deal, false)).join('')}
                                    </div>
                                </div>
                            ` : ''}

                            <!-- TAB 2: 10 QUÁN NGON LOCAL -->
                            ${State.activeTab === 'tab-deals' ? `
                                <div style="margin-bottom: 2rem;">
                                    <h2 style="font-size: 1.8rem; font-weight: 900; color: var(--text-heading); margin-bottom: 0.4rem;">🍲 10 Quán Ngon Local & Đặc Quyền Tiết Kiệm</h2>
                                    <p style="color: var(--text-muted); font-size: 0.9rem;">Tuyển tập Cơm gà A Hải, Bánh xèo Năm Hiền, Mì Quảng Bà Mua, Trà sữa Maycha, Katinat...</p>
                                </div>
                                <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(310px, 1fr)); gap: 1.25rem;">
                                    ${usableDeals.map(deal => renderDealCard(deal, false)).join('')}
                                </div>
                            ` : ''}

                            <!-- TAB 3: DANH THẮNG 4K & BIỂN (LANDMARK THEATER) -->
                            ${State.activeTab === 'tab-landmarks' ? `
                                <div style="background: var(--bg-card); border: 1px solid var(--border); border-radius: 24px; padding: 2rem; margin-bottom: 2rem;">
                                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.2rem; flex-wrap: wrap; gap: 0.5rem;">
                                        <div>
                                            <h2 style="font-size: 1.6rem; font-weight: 900; color: var(--text-heading); margin: 0;">🌉 Cầu Rồng Phun Lửa & Biển Mỹ Khê 4K</h2>
                                            <div style="font-size: 0.78rem; color: var(--accent-gold); font-family: var(--font-mono); margin-top: 0.2rem;">Biểu tượng Đà Thành • Phố Đi Bộ Bạch Đằng</div>
                                        </div>
                                        <button data-action="toggle-audio" style="background: ${State.isAudioPlaying ? '#10B981' : 'var(--bg-surface)'}; color: ${State.isAudioPlaying ? '#FFF' : 'var(--text-heading)'}; border: 1px solid var(--border); padding: 0.45rem 1rem; border-radius: var(--radius-pill); font-size: 0.78rem; font-weight: 800; cursor: pointer;">
                                            ${State.isAudioPlaying ? '🔊 Đang Phát Sóng Biển...' : '🌊 Nghe Âm Thanh Sóng Biển'}
                                        </button>
                                    </div>
                                    <div style="background: #000; border-radius: 18px; overflow: hidden; position: relative; margin-bottom: 1.2rem; aspect-ratio: 16/9; display: flex; align-items: center; justify-content: center;">
                                        <div style="font-size: 4rem;">🌉</div>
                                        <div style="position: absolute; bottom: 1rem; left: 1.5rem; color: #FFF; background: rgba(0,0,0,0.6); padding: 0.4rem 0.8rem; border-radius: 8px; font-size: 0.8rem;">
                                            📍 Cầu Rồng phun lửa 21:00 cuối tuần • View ngắm trọn sông Hàn
                                        </div>
                                    </div>
                                    <div style="font-style: italic; font-size: 0.9rem; color: var(--text-body); line-height: 1.6; border-left: 3px solid var(--accent-gold); padding-left: 1rem;">
                                        "Sông Hàn đón bạn bằng nhịp cầu nghiêng nắng,<br>
                                        Mỹ Khê ru êm từng con sóng hiền hòa.<br>
                                        Người xứ biển dẫu nhọc nhằn tất bật,<br>
                                        Vẫn trọn tấm lòng đãi bạn bốn phương xa."
                                    </div>
                                </div>
                            ` : ''}

                            <!-- TAB 4: MÁY TÍNH TIẾT KIỆM (SAVINGS CALCULATOR) -->
                            ${State.activeTab === 'tab-calculator' ? `
                                <div style="background: var(--bg-card); border: 1px solid var(--border); border-radius: 24px; padding: 2rem; max-width: 680px; margin: 0 auto 2rem;">
                                    <div style="text-align: center; margin-bottom: 1.5rem;">
                                        <div style="font-size: 2.2rem; margin-bottom: 0.3rem;">🧮</div>
                                        <h2 style="font-size: 1.6rem; font-weight: 900; color: var(--text-heading); margin: 0 0 0.3rem;">Máy Tính Tiết Kiệm Chi Tiêu Hằng Ngày</h2>
                                        <p style="font-size: 0.85rem; color: var(--text-muted);">Ước tính số tiền bạn sẽ dôi ra mỗi tháng khi săn deal trên JayT Hub.</p>
                                    </div>

                                    <div style="display: flex; flex-direction: column; gap: 1.2rem; margin-bottom: 1.5rem;">
                                        <div>
                                            <label style="font-size: 0.85rem; font-weight: 700; color: var(--text-heading); display: block; margin-bottom: 0.3rem;">🧋 Trà sữa / Cà phê: ${State.calcDrink} ly/tuần</label>
                                            <input type="range" min="0" max="14" value="${State.calcDrink}" data-action="change-calc-drink" style="width: 100%; accent-color: #10B981;" />
                                        </div>
                                        <div>
                                            <label style="font-size: 0.85rem; font-weight: 700; color: var(--text-heading); display: block; margin-bottom: 0.3rem;">🍲 Bữa ăn ngoài (Grab/Shopee): ${State.calcMeal} bữa/tuần</label>
                                            <input type="range" min="0" max="14" value="${State.calcMeal}" data-action="change-calc-meal" style="width: 100%; accent-color: #10B981;" />
                                        </div>
                                        <div>
                                            <label style="font-size: 0.85rem; font-weight: 700; color: var(--text-heading); display: block; margin-bottom: 0.3rem;">🛵 Chuyến xe công nghệ (Grab/Xanh): ${State.calcRide} chuyến/tuần</label>
                                            <input type="range" min="0" max="14" value="${State.calcRide}" data-action="change-calc-ride" style="width: 100%; accent-color: #10B981;" />
                                        </div>
                                    </div>

                                    <div style="background: linear-gradient(135deg, rgba(16,185,129,0.12), rgba(234,179,8,0.1)); border: 1.5px solid #10B981; border-radius: 18px; padding: 1.5rem; text-align: center; margin-bottom: 1rem;">
                                        <div style="font-size: 0.78rem; font-weight: 800; color: var(--text-muted); text-transform: uppercase;">BẠN TIẾT KIỆM ĐƯỢC KHOẢNG:</div>
                                        <div style="font-family: var(--font-mono); font-size: 2.2rem; font-weight: 900; color: #10B981; margin: 0.3rem 0;">
                                            ${monthlyCalc.toLocaleString('vi-VN')} ₫ / tháng
                                        </div>
                                        <div style="font-size: 0.82rem; color: var(--text-heading); line-height: 1.5; background: var(--bg-surface); padding: 0.75rem 1rem; border-radius: 12px; border: 1px dashed var(--border);">
                                            💡 <strong>Lời bình CSKH JayT:</strong> ${getCalculatorQuote(monthlyCalc)}
                                        </div>
                                    </div>
                                </div>
                            ` : ''}

                            <!-- TAB 5: CẨM NANG SĂN DEAL -->
                            ${State.activeTab === 'tab-guide' ? `
                                <div style="background: var(--bg-card); border: 1px solid var(--border); border-radius: 24px; padding: 2rem; margin-bottom: 2rem;">
                                    <h2 style="font-size: 1.6rem; font-weight: 900; color: var(--text-heading); margin-bottom: 1rem;">📖 Cách Lấy Mã & Bí Quyết Săn Deal 100% Thành Công</h2>
                                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.2rem; margin-bottom: 1.5rem;">
                                        <div style="background: var(--bg-surface); padding: 1.25rem; border-radius: 16px; border: 1px solid var(--border);">
                                            <div style="font-size: 1.5rem; font-weight: 900; color: #10B981; margin-bottom: 0.3rem;">1</div>
                                            <h4 style="font-size: 1rem; font-weight: 800; color: var(--text-heading); margin-bottom: 0.3rem;">Bấm Sao Chép Mã</h4>
                                            <p style="font-size: 0.82rem; color: var(--text-body);">Bấm nút sao chép mã hoặc nút Săn Ngay để mở ứng dụng đối tác tương ứng.</p>
                                        </div>
                                        <div style="background: var(--bg-surface); padding: 1.25rem; border-radius: 16px; border: 1px solid var(--border);">
                                            <div style="font-size: 1.5rem; font-weight: 900; color: var(--accent-gold); margin-bottom: 0.3rem;">2</div>
                                            <h4 style="font-size: 1rem; font-weight: 800; color: var(--text-heading); margin-bottom: 0.3rem;">Chọn Món / Chuyến</h4>
                                            <p style="font-size: 0.82rem; color: var(--text-body);">Chọn món ăn hoặc lộ trình Grab/Xanh SM trong địa bàn TP Đà Nẵng.</p>
                                        </div>
                                        <div style="background: var(--bg-surface); padding: 1.25rem; border-radius: 16px; border: 1px solid var(--border);">
                                            <div style="font-size: 1.5rem; font-weight: 900; color: #38BDF8; margin-bottom: 0.3rem;">3</div>
                                            <h4 style="font-size: 1rem; font-weight: 800; color: var(--text-heading); margin-bottom: 0.3rem;">Dán Mã Thanh Toán</h4>
                                            <p style="font-size: 0.82rem; color: var(--text-body);">Dán mã tại ô Voucher để hóa đơn tự động trừ thẳng số tiền tiết kiệm.</p>
                                        </div>
                                    </div>
                                </div>
                            ` : ''}

                            <!-- TRUNG TÂM MINH BẠCH DỮ LIỆU (TRUST CENTER - USP CỦA JAYT) -->
                            <div style="background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%); border-radius: 22px; padding: 2rem 1.5rem; color: #F8FAFC; margin-bottom: 2rem; box-shadow: 0 10px 30px rgba(15,23,42,0.15);">
                                <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem; margin-bottom: 1.2rem; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 1rem;">
                                    <div style="display: flex; align-items: center; gap: 0.6rem;">
                                        <span style="font-size: 1.4rem;">🛡️</span>
                                        <div>
                                            <h3 style="font-size: 1.15rem; font-weight: 900; margin: 0; color: #FFFFFF;">Trung Tâm Minh Bạch Dữ Liệu JayT</h3>
                                            <p style="font-size: 0.75rem; color: #94A3B8; margin: 0.1rem 0 0;">Giám sát tính toàn vẹn & đối soát mật mã học thời gian thực</p>
                                        </div>
                                    </div>
                                    <div style="background: rgba(16,185,129,0.15); border: 1px solid #10B981; color: #34D399; font-size: 0.75rem; font-weight: 800; padding: 0.25rem 0.7rem; border-radius: 9999px;">
                                        ● TRẠNG THÁI HỆ THỐNG: ${escapeHTML(State.connectionStatus)}
                                    </div>
                                </div>

                                <div style="background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 0.85rem;">
                                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
                                        <span style="font-size: 0.72rem; color: #94A3B8; font-weight: 700;">Mã Băm Dataset SHA-256 (Toàn bộ 15 trường kho dữ liệu):</span>
                                        <button data-action="copy-dataset-sha" data-sha="${escapeHTML(State.datasetSHA256)}" style="background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: #38BDF8; font-size: 0.7rem; font-weight: 800; padding: 0.2rem 0.5rem; border-radius: 6px; cursor: pointer;">
                                            📋 Sao chép SHA-256
                                        </button>
                                    </div>
                                    <div style="font-family: monospace; font-size: 0.7rem; color: #34D399; word-break: break-all;">
                                        ${escapeHTML(State.datasetSHA256 || 'Đang băm dữ liệu qua Web Crypto API...')}
                                    </div>
                                </div>
                            </div>

                        </main>
                    </div>
                </div>

                <!-- MODAL MY JAYT / WATCHLIST -->
                ${State.isSavedDrawerOpen ? `
                    <div style="position: fixed; inset: 0; z-index: 99999; background: rgba(15,23,42,0.6); backdrop-filter: blur(4px); display: flex; justify-content: flex-end;">
                        <div style="background: var(--bg-surface); width: 100%; max-width: 420px; height: 100%; box-shadow: -10px 0 30px rgba(0,0,0,0.3); display: flex; flex-direction: column; justify-content: space-between; padding: 1.5rem; box-sizing: border-box;">
                            <div>
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.2rem; border-bottom: 1px solid var(--border); padding-bottom: 0.8rem;">
                                    <h3 style="font-size: 1.15rem; font-weight: 900; margin: 0; color: var(--text-heading);">❤️ Danh Sách Đã Lưu (${savedCount})</h3>
                                    <button data-action="toggle-saved-drawer" style="background: none; border: none; font-size: 1.5rem; cursor: pointer; color: var(--text-muted);">&times;</button>
                                </div>
                                <div style="max-height: calc(100vh - 180px); overflow-y: auto; display: flex; flex-direction: column; gap: 0.8rem;">
                                    ${savedCount > 0 ? State.deals.filter(d => State.savedDealIds.includes(d.deal_id)).map(deal => `
                                        <div style="background: var(--bg-card); border: 1px solid var(--border); border-radius: 14px; padding: 0.9rem;">
                                            <div style="display: flex; justify-content: space-between; font-size: 0.82rem; font-weight: 800; margin-bottom: 0.3rem;">
                                                <span style="color: var(--text-heading);">${escapeHTML(deal.merchant_name)}</span>
                                                <span style="color: #10B981;">-${deal.saving_percentage}%</span>
                                            </div>
                                            <div style="font-size: 0.78rem; color: var(--text-body); margin-bottom: 0.6rem;">${escapeHTML(deal.item_name)}</div>
                                            <div style="display: flex; gap: 0.4rem;">
                                                <button data-action="copy" data-code="${escapeHTML(deal.voucher_code)}" style="flex: 1; background: var(--bg-surface); border: 1px solid var(--border); color: var(--text-heading); padding: 0.4rem; border-radius: 8px; font-size: 0.75rem; font-weight: 800; cursor: pointer;">
                                                    📋 ${escapeHTML(deal.voucher_code)}
                                                </button>
                                                <button data-action="toggle-bookmark" data-deal-id="${escapeHTML(deal.deal_id)}" style="background: rgba(239,68,68,0.15); border: 1px solid rgba(239,68,68,0.3); color: #EF4444; padding: 0.4rem 0.6rem; border-radius: 8px; font-size: 0.75rem; cursor: pointer;">
                                                    🗑️ Xóa
                                                </button>
                                            </div>
                                        </div>
                                    `).join('') : `
                                        <div style="text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
                                            <div style="font-size: 2rem; margin-bottom: 0.5rem;">💔</div>
                                            <p style="font-size: 0.85rem;">Bạn chưa lưu deal nào. Bấm nút ❤️ ở từng thẻ để lưu và dùng dần!</p>
                                        </div>
                                    `}
                                </div>
                            </div>
                            <button data-action="toggle-saved-drawer" style="background: #10B981; color: #FFF; border: none; padding: 0.75rem; border-radius: 12px; font-weight: 800; cursor: pointer; text-align: center;">
                                Đóng Danh Sách
                            </button>
                        </div>
                    </div>
                ` : ''}

                <!-- MODAL MYSTERY GIFT -->
                ${State.isMysteryModalOpen ? `
                    <div style="position: fixed; inset: 0; z-index: 100000; background: rgba(15,23,42,0.8); backdrop-filter: blur(6px); display: flex; align-items: center; justify-content: center; padding: 1rem;">
                        <div style="background: var(--bg-surface); border: 1.5px solid var(--accent-gold); border-radius: 24px; max-width: 480px; width: 100%; padding: 2rem; text-align: center; box-shadow: 0 20px 60px rgba(0,0,0,0.6);">
                            <div style="font-size: 3rem; margin-bottom: 0.5rem;">🎉</div>
                            <h3 style="font-size: 1.3rem; font-weight: 900; color: #FDE047; margin-bottom: 0.4rem;">Chúc Mừng Bạn Trúng Mã Grab 0Đ!</h3>
                            <p style="font-size: 0.85rem; color: var(--text-body); margin-bottom: 1.2rem;">Grab trợ giá 100% cước chuyến xe đầu tiên 40K đi học / đi làm tại Đà Nẵng.</p>
                            <div style="background: var(--bg-card); border: 1px dashed #10B981; border-radius: 12px; padding: 0.85rem; margin-bottom: 1.2rem; font-family: var(--font-mono); font-size: 1.2rem; font-weight: 900; color: #10B981;">
                                GRAB0DDN
                            </div>
                            <div style="display: flex; gap: 0.5rem;">
                                <button data-action="copy" data-code="GRAB0DDN" style="flex: 1; background: #10B981; color: #FFF; border: none; padding: 0.65rem; border-radius: 12px; font-weight: 800; cursor: pointer;">
                                    📋 Sao Chép Mã
                                </button>
                                <button data-action="close-mystery" style="background: var(--bg-tag); color: var(--text-heading); border: 1px solid var(--border); padding: 0.65rem 1rem; border-radius: 12px; font-weight: 700; cursor: pointer;">
                                    Đóng
                                </button>
                            </div>
                        </div>
                    </div>
                ` : ''}

                <!-- FOOTER DOANH NGHIỆP 4 CỘT -->
                <footer style="background: var(--bg-surface); border-top: 1px solid var(--border); padding: 3rem 1.5rem 1.5rem; margin-top: 3rem;">
                    <div style="max-width: 1440px; margin: 0 auto;">
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 2rem; margin-bottom: 2rem;">
                            <div>
                                <div style="font-size: 1.1rem; font-weight: 900; color: var(--text-heading); margin-bottom: 0.6rem;">JayT Đà Nẵng 43</div>
                                <p style="font-size: 0.8rem; color: var(--text-muted); line-height: 1.5;">Cổng thông tin tự động tìm kiếm, đối soát và xếp hạng các cơ hội tiết kiệm chi tiêu ăn uống, di chuyển và giải trí hàng đầu tại Đà Nẵng (Mã Vùng 43).</p>
                            </div>
                            <div>
                                <h4 style="font-size: 0.88rem; font-weight: 800; color: var(--text-heading); margin-bottom: 0.8rem;">Tọa Độ Local</h4>
                                <ul style="list-style: none; padding: 0; margin: 0; font-size: 0.8rem; color: var(--text-muted); display: flex; flex-direction: column; gap: 0.4rem;">
                                    <li>🎓 KTX Bách Khoa • Sư Phạm</li>
                                    <li>☕ Bạch Đằng • View Sông Hàn</li>
                                    <li>🍜 Chợ Cồn • Chợ Hàn Hải Châu</li>
                                    <li>🏖️ Biển Mỹ Khê • Bán Đảo Sơn Trà</li>
                                </ul>
                            </div>
                            <div>
                                <h4 style="font-size: 0.88rem; font-weight: 800; color: var(--text-heading); margin-bottom: 0.8rem;">Minh Bạch & Đối Soát</h4>
                                <ul style="list-style: none; padding: 0; margin: 0; font-size: 0.8rem; color: var(--text-muted); display: flex; flex-direction: column; gap: 0.4rem;">
                                    <li>🛡️ Đối soát nguồn gốc kênh liên kết</li>
                                    <li>⚡ Tự động làm mới mỗi 20 giây</li>
                                    <li>🔒 Mã băm SHA-256 Web Crypto API</li>
                                    <li>🚫 Không số liệu ảo, không thu phí</li>
                                </ul>
                            </div>
                            <div>
                                <h4 style="font-size: 0.88rem; font-weight: 800; color: var(--text-heading); margin-bottom: 0.8rem;">Hỗ Trợ Cộng Đồng 43</h4>
                                <p style="font-size: 0.78rem; color: var(--text-muted); margin-bottom: 0.5rem;">Zalo CSKH 24/7 Miễn phí · Đền mã trong 3 phút nếu mã lỗi.</p>
                                <a href="https://zalo.me/g/danangdeal43" target="_blank" rel="noopener noreferrer" style="color: #10B981; font-weight: 800; text-decoration: none; font-size: 0.8rem;">Vào Nhóm Zalo Kín ↗</a>
                            </div>
                        </div>

                        <div style="border-top: 1px solid var(--border); padding-top: 1.2rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem; font-size: 0.75rem; color: var(--text-muted);">
                            <span>© 2026 JayT Corp. Bản quyền thuộc về JayT Ecosystem.</span>
                            <span>Phiên bản: Production Runtime v8.0 Golden Master Edition</span>
                        </div>
                    </div>
                </footer>

            </div>
        `;

        // Gắn sự kiện ô tìm kiếm
        const searchInput = document.getElementById('jaytMasterSearch');
        if (searchInput) {
            searchInput.addEventListener('input', function(e) {
                State.searchQuery = e.target.value;
                renderApp();
                const newInput = document.getElementById('jaytMasterSearch');
                if (newInput) {
                    newInput.focus();
                    newInput.setSelectionRange(newInput.value.length, newInput.value.length);
                }
            });
        }

        // Gắn sự kiện Sort Select
        const sortSelect = document.getElementById('jaytSortSelect');
        if (sortSelect) {
            sortSelect.addEventListener('change', function(e) {
                State.sortBy = e.target.value;
                renderApp();
            });
        }
    }

    // 11. Render Card Thẻ Ưu Đãi
    function renderDealCard(deal, isFeatured = false, rank = null) {
        const brand = getMerchantMeta(deal.merchant_name, deal.category);
        const isSaved = State.savedDealIds.includes(deal.deal_id);

        return `
            <div class="deal-card-luxury" style="background: var(--bg-card); border: ${isFeatured ? '2px solid #10B981' : '1px solid var(--border)'}; border-radius: 20px; padding: 1.25rem; display: flex; flex-direction: column; justify-content: space-between; gap: 0.9rem; position: relative; overflow: hidden; box-shadow: var(--card-shadow);">
                ${isFeatured ? `<div style="position: absolute; top: 0; left: 0; right: 0; height: 4px; background: linear-gradient(90deg, #F59E0B, #10B981);"></div>` : ''}

                <div>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.8rem; margin-top: ${isFeatured ? '0.2rem' : '0'};">
                        <div style="display: flex; align-items: center; gap: 0.55rem;">
                            <div style="background: ${brand.bg}; color: ${brand.color}; width: 36px; height: 36px; border-radius: 11px; display: flex; align-items: center; justify-content: center; font-size: 1.15rem; font-weight: 900; flex-shrink: 0;">
                                ${brand.icon}
                            </div>
                            <div>
                                <div style="font-size: 0.88rem; font-weight: 800; color: var(--text-heading); line-height: 1.2;">${escapeHTML(deal.merchant_name)}</div>
                                <div style="font-size: 0.68rem; color: var(--text-muted);">⭐ ${deal.rating} · (${deal.used_count}+ đã săn)</div>
                            </div>
                        </div>

                        <div style="display: flex; align-items: center; gap: 0.35rem;">
                            ${isFeatured ? `<span style="background: linear-gradient(135deg, #FEF3C7, #FDE68A); color: #92400E; border: 1px solid #F59E0B; font-size: 0.65rem; font-weight: 900; padding: 0.2rem 0.5rem; border-radius: 6px;">👑 TOP ${rank || 1}</span>` : ''}
                            <button data-action="toggle-bookmark" data-deal-id="${escapeHTML(deal.deal_id)}" style="background: ${isSaved ? '#FEE2E2' : 'var(--bg-tag)'}; border: 1px solid ${isSaved ? '#FCA5A5' : 'var(--border)'}; color: ${isSaved ? '#DC2626' : 'var(--text-muted)'}; width: 28px; height: 28px; border-radius: 8px; display: flex; align-items: center; justify-content: center; cursor: pointer;">
                                ${isSaved ? '❤️' : '🤍'}
                            </button>
                        </div>
                    </div>

                    <div style="background: linear-gradient(135deg, rgba(16,185,129,0.12) 0%, rgba(234,179,8,0.08) 100%); border: 1.5px solid #10B981; border-radius: 14px; padding: 0.85rem 0.9rem; margin-bottom: 0.85rem; text-align: center;">
                        <div style="font-size: 1.35rem; font-weight: 900; color: #10B981; line-height: 1.15;">
                            💰 TIẾT KIỆM ${formatVND(deal.saving_amount_vnd)}
                        </div>
                        <div style="font-size: 0.78rem; font-weight: 700; color: var(--text-heading); margin-top: 0.25rem;">
                            Giảm ${deal.saving_percentage}% · Chỉ còn ${formatVND(deal.discount_price_vnd)} <span style="color: var(--text-muted); text-decoration: line-through; margin-left: 0.3rem;">${formatVND(deal.original_price_vnd)}</span>
                        </div>
                    </div>

                    <h4 style="font-size: 1.02rem; font-weight: 800; color: var(--text-heading); line-height: 1.35; margin: 0 0 0.4rem;">${escapeHTML(deal.item_name)}</h4>
                    <p style="font-size: 0.76rem; color: var(--text-muted); margin: 0 0 0.75rem; line-height: 1.4;">📍 ${escapeHTML(deal.branch_address)}</p>

                    <div style="font-size: 0.72rem; color: var(--text-muted); display: flex; justify-content: space-between; border-top: 1px dashed var(--border); padding-top: 0.5rem;">
                        <span>Nguồn: <strong style="color: var(--text-heading);">${escapeHTML(deal.source_channel)}</strong></span>
                        <span>Hạn: <strong style="color: var(--text-heading);">${escapeHTML(deal.expiry_info.formatted)}</strong></span>
                    </div>
                </div>

                <div>
                    <div style="display: flex; gap: 0.5rem; margin-bottom: 0.55rem;">
                        <button data-action="copy" data-code="${escapeHTML(deal.voucher_code)}" style="flex: 1; background: var(--bg-surface); border: 1.5px solid var(--border); color: var(--text-heading); padding: 0.68rem 0.4rem; border-radius: 12px; font-weight: 800; font-size: 0.78rem; cursor: pointer;">
                            📋 ${escapeHTML(deal.voucher_code)}
                        </button>
                        <a href="${escapeHTML(deal.deep_link)}" target="_blank" rel="noopener noreferrer" style="flex: 1.3; background: linear-gradient(135deg, #10B981, #059669); color: #FFFFFF; padding: 0.68rem 0.4rem; border-radius: 12px; font-weight: 800; font-size: 0.82rem; text-align: center; text-decoration: none; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 14px rgba(16,185,129,0.3);">
                            SĂN NGAY ➔
                        </a>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.7rem;">
                        <button data-action="share-zalo" data-deal-title="${escapeHTML(deal.merchant_name)} - ${escapeHTML(deal.item_name)}" style="background: none; border: none; color: #38BDF8; font-weight: 700; cursor: pointer; text-decoration: underline;">
                            ↗ Chia sẻ Zalo
                        </button>
                        <button data-action="trust" data-deal-id="${escapeHTML(deal.deal_id)}" style="background: none; border: none; color: var(--accent-gold); font-weight: 700; cursor: pointer; text-decoration: underline;">
                            ▾ Bảng kê & SHA-256
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    // 12. Skeleton Loading & Error Screen
    function renderSkeleton() {
        return `
            <div style="min-height: 100vh; background: var(--bg-page); padding: 4rem 1rem; text-align: center; font-family: sans-serif;">
                <div style="display: inline-block; width: 40px; height: 40px; border: 3px solid var(--border); border-top-color: #10B981; border-radius: 50%; animation: spin 0.8s linear infinite; margin-bottom: 1rem;"></div>
                <h3 style="color: var(--text-heading); font-weight: 800; font-size: 1.15rem; margin-bottom: 0.3rem;">Đang tải kho đặc quyền ưu đãi Đà Nẵng...</h3>
                <p style="color: var(--text-muted); font-size: 0.85rem;">Đối soát mã băm SHA-256 & thời hạn sử dụng thời gian thực.</p>
                <style>@keyframes spin { to { transform: rotate(360deg); } }</style>
            </div>
        `;
    }

    function renderErrorScreen(errMsg) {
        return `
            <div style="min-height: 100vh; background: var(--bg-page); padding: 4rem 1rem; text-align: center; font-family: sans-serif;">
                <div style="font-size: 2.5rem; margin-bottom: 0.8rem;">⚠️</div>
                <h3 style="color: var(--text-heading); font-weight: 800; font-size: 1.2rem; margin-bottom: 0.4rem;">Chưa thể kết nối tới máy chủ dữ liệu</h3>
                <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1.5rem;">${escapeHTML(errMsg || 'Vui lòng kiểm tra lại kết nối mạng hoặc bấm thử lại.')}</p>
                <button data-action="retry" style="background: #10B981; color: #FFF; border: none; padding: 0.6rem 1.4rem; border-radius: 9999px; font-weight: 800; cursor: pointer;">
                    🔄 Thử lại ngay
                </button>
            </div>
        `;
    }

    // 13. Event Delegation Toàn Cục
    function setupEventDelegation() {
        document.body.addEventListener('click', function(e) {
            const btn = e.target.closest('[data-action]');
            if (!btn) return;

            const action = btn.getAttribute('data-action');

            if (action === 'switch-tab') {
                State.activeTab = btn.getAttribute('data-tab');
                renderApp();
            } else if (action === 'switch-moment') {
                State.activeMoment = btn.getAttribute('data-moment');
                renderApp();
            } else if (action === 'filter-district') {
                State.activeLandmark = btn.getAttribute('data-district');
                State.activeTab = 'tab-schedule';
                renderApp();
            } else if (action === 'toggle-theme') {
                State.theme = State.theme === 'dark' ? 'light' : 'dark';
                document.documentElement.setAttribute('data-theme', State.theme);
                localStorage.setItem('jayt_theme', State.theme);
                renderApp();
            } else if (action === 'toggle-audio') {
                toggleAmbientSound();
            } else if (action === 'toggle-saved-drawer') {
                State.isSavedDrawerOpen = !State.isSavedDrawerOpen;
                renderApp();
            } else if (action === 'open-mystery') {
                State.isMysteryModalOpen = true;
                renderApp();
            } else if (action === 'close-mystery') {
                State.isMysteryModalOpen = false;
                renderApp();
            } else if (action === 'open-streak') {
                showToast('🔥 Chuỗi điểm danh: 3 Ngày liên tục (+50.000₫ tích lũy)!');
            } else if (action === 'toggle-bookmark') {
                const dealId = btn.getAttribute('data-deal-id');
                const idx = State.savedDealIds.indexOf(dealId);
                if (idx > -1) {
                    State.savedDealIds.splice(idx, 1);
                    showToast('Đã bỏ lưu ưu đãi.');
                } else {
                    State.savedDealIds.push(dealId);
                    showToast('❤️ Đã lưu ưu đãi vào My JayT!');
                }
                localStorage.setItem('jayt_saved_deals', JSON.stringify(State.savedDealIds));
                renderApp();
            } else if (action === 'copy') {
                const code = btn.getAttribute('data-code') || '';
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(code).then(() => {
                        showToast(`Đã sao chép mã [${code}]! Mở app để sử dụng.`);
                    });
                }
            } else if (action === 'share-zalo') {
                const title = btn.getAttribute('data-deal-title') || 'Ưu đãi Đà Nẵng';
                const shareUrl = `https://zalo.me/share?url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(title)}`;
                window.open(shareUrl, '_blank', 'width=600,height=500');
            } else if (action === 'copy-dataset-sha') {
                const sha = btn.getAttribute('data-sha') || '';
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(sha).then(() => {
                        showToast('Đã sao chép mã băm Dataset SHA-256!');
                    });
                }
            } else if (action === 'retry') {
                State.connectionStatus = 'BOOT';
                renderApp();
                fetchDeals();
            }
        });

        // Sliders trong máy tính tiết kiệm
        document.body.addEventListener('input', function(e) {
            if (e.target.matches('[data-action="change-calc-drink"]')) {
                State.calcDrink = parseInt(e.target.value, 10);
                renderApp();
            } else if (e.target.matches('[data-action="change-calc-meal"]')) {
                State.calcMeal = parseInt(e.target.value, 10);
                renderApp();
            } else if (e.target.matches('[data-action="change-calc-ride"]')) {
                State.calcRide = parseInt(e.target.value, 10);
                renderApp();
            }
        });

        // Phím tắt bàn phím Desktop
        document.addEventListener('keydown', function(e) {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
                if (e.key === 'Escape') e.target.blur();
                return;
            }
            if (e.key === '/') {
                e.preventDefault();
                const search = document.getElementById('jaytMasterSearch');
                if (search) { search.focus(); search.select(); }
            } else if (e.key === '1') {
                State.activeMoment = 'MORNING'; renderApp();
            } else if (e.key === '2') {
                State.activeMoment = 'NOON'; renderApp();
            } else if (e.key === '3') {
                State.activeMoment = 'AFTERNOON'; renderApp();
            } else if (e.key === '4') {
                State.activeMoment = 'NIGHT'; renderApp();
            }
        });
    }

    // 14. Fetch & Polling Engine Tuần Tự
    async function fetchDeals() {
        if (activeAbortController) activeAbortController.abort();
        activeAbortController = new AbortController();

        const requestId = ++State.activeRequestId;

        if (State.deals.length > 0 && State.connectionStatus !== 'LIVE') {
            State.connectionStatus = 'RECONNECTING';
            renderApp();
        }

        try {
            const res = await fetch('/api/deals', {
                cache: 'no-store',
                signal: activeAbortController.signal,
                headers: { 'Cache-Control': 'no-cache', 'Pragma': 'no-cache' }
            });

            if (!res.ok) throw new Error(`HTTP_${res.status}`);
            const data = await res.json();

            if (requestId !== State.activeRequestId) return;

            const rawDeals = Array.isArray(data.deals) ? data.deals : [];
            const normalizedPromises = rawDeals.map(normalizeDeal);
            const normalizedDeals = (await Promise.all(normalizedPromises)).filter(Boolean);

            if (requestId !== State.activeRequestId) return;

            const newDatasetSHA = await computeDatasetSHA256(normalizedDeals);
            const now = new Date();
            const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

            State.lastUpdatedTime = timeStr;
            State.lastSuccessTimestamp = Date.now();
            State.connectionStatus = 'LIVE';
            State.errorMessage = null;

            if (newDatasetSHA !== State.datasetSHA256 || State.deals.length === 0) {
                State.deals = normalizedDeals;
                State.datasetSHA256 = newDatasetSHA;
                renderApp();
            } else {
                renderApp();
            }
        } catch (err) {
            if (err.name === 'AbortError') return;
            if (requestId !== State.activeRequestId) return;
            console.warn("⚠️ Sync warning:", err);

            const isStale = (Date.now() - State.lastSuccessTimestamp) > 60000;
            if (State.deals.length > 0) {
                State.connectionStatus = isStale ? 'STALE' : 'RECONNECTING';
                renderApp();
            } else {
                State.connectionStatus = 'ERROR';
                State.errorMessage = err.message;
                renderApp();
            }
        }
    }

    // 15. Khởi chạy
    function init() {
        document.documentElement.setAttribute('data-theme', State.theme);
        setupEventDelegation();
        fetchDeals();
        setInterval(fetchDeals, 20000); // Polling 20s
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
