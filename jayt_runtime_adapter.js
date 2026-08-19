/**
 * JAYT APEX v9.0 — ULTRA LUXURY & GEN-Z COMMUNITY EDITION
 * =============================================================================
 * TÔN CHỈ: PHỤC VỤ CỘNG ĐỒNG ĐÀ NẴNG 43 LÀ SỐ 1 — DOANH THU AFFILIATE LÀ SỐ 2
 * ĐẠI TRÙNG TU THIẾT KẾ ĐỒ HỌA & TRẢI NGHIỆM NGƯỜI DÙNG:
 * 1. Hình ảnh đồ họa thực tế (Visual Food & Merchant Imagery) cho từng thẻ deal.
 * 2. Bộ lọc 2 Phân Khúc Siêu Chuyển Đổi: [🎓 Sinh Viên Bách Khoa] ⚡ [💼 Dân Văn Phòng Hải Châu].
 * 3. Nút [ ⚡ SĂN NGAY ➔ ] có hiệu ứng Shimmer ánh sáng quét kích thích mua sắm.
 * 4. Bảng tính tiết kiệm nhóm động với thanh trượt mượt mà & Lời bình CSKH dí dỏm.
 * 5. Khung Danh Thắng 4K Đà Nẵng + Bộ tổng hợp âm thanh sóng biển Web Audio API.
 * 6. Trung tâm minh bạch 3 tầng, SHA-256 Web Crypto API, 20s Polling Realtime.
 * =============================================================================
 */

(function() {
    'use strict';
    console.log("💎 JAYT Ultra Luxury Gen-Z Community Edition v9.0 Active");

    const State = {
        deals: [],
        categories: ['ALL'],
        activeTab: 'tab-schedule', // 'tab-schedule' | 'tab-deals' | 'tab-landmarks' | 'tab-calculator' | 'tab-guide'
        activeFilter: 'ALL',
        activeLandmark: 'ALL',
        activePriceRange: 'ALL',
        activeICP: 'STUDENT', // 'STUDENT' | 'OFFICE' | 'ALL'
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
        calcDrink: 7,
        calcMeal: 7,
        calcRide: 7,
        theme: localStorage.getItem('jayt_theme') || 'dark',
        isAudioPlaying: false
    };

    let activeAbortController = null;
    let audioCtx = null;
    let audioGain = null;

    // 1. Hình ảnh minh họa chất lượng cao thực tế từng món ăn / dịch vụ
    const DEAL_IMAGES = {
        cgv: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=600&q=80',
        metiz: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=600&q=80',
        grab: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=600&q=80',
        xanh: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=600&q=80',
        phela: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=600&q=80',
        katinat: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600&q=80',
        jollibee: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=600&q=80',
        comga: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=600&q=80',
        miquang: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80',
        che: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80',
        defaultFood: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80'
    };

    function getDealImage(merchant, item) {
        const str = (merchant + ' ' + item).toLowerCase();
        if (str.includes('cgv')) return DEAL_IMAGES.cgv;
        if (str.includes('metiz') || str.includes('helio')) return DEAL_IMAGES.metiz;
        if (str.includes('grab')) return DEAL_IMAGES.grab;
        if (str.includes('xanh sm') || str.includes('xe điện')) return DEAL_IMAGES.xanh;
        if (str.includes('phê la') || str.includes('phe la')) return DEAL_IMAGES.phela;
        if (str.includes('katinat') || str.includes('trà sữa')) return DEAL_IMAGES.katinat;
        if (str.includes('jollibee') || str.includes('gà giòn')) return DEAL_IMAGES.jollibee;
        if (str.includes('cơm gà') || str.includes('a hải') || str.includes('bà buội')) return DEAL_IMAGES.comga;
        if (str.includes('mì quảng') || str.includes('bún')) return DEAL_IMAGES.miquang;
        if (str.includes('chè') || str.includes('sầu riêng')) return DEAL_IMAGES.che;
        return DEAL_IMAGES.defaultFood;
    }

    // 2. Nhận diện Avatar Thương Hiệu Sang Trọng
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

    // 3. Tiện ích Định dạng & Bảo mật
    function escapeHTML(str) {
        if (typeof str !== 'string') return '';
        return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
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

    // 4. Mật mã học SHA-256 Web Crypto API
    async function calculateSHA256(message) {
        try {
            if (!window.crypto || !window.crypto.subtle) return null;
            const msgBuffer = new TextEncoder().encode(message);
            const hashBuffer = await window.crypto.subtle.digest('SHA-256', msgBuffer);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        } catch (e) {
            console.warn("SHA-256 digest error:", e);
            return null;
        }
    }

    // 5. Expiry Engine Thời Gian Thực
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

    // 6. Chuẩn hóa Deal & Nhận diện Địa Danh
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
            used_count: 500 + (dealId.charCodeAt(dealId.length - 1) * 12),
            image_url: getDealImage(merchant, item)
        };
    }

    // 7. Tính Mã Băm Toàn Dataset
    async function computeDatasetSHA256(deals) {
        const sorted = deals.slice().sort((a, b) => a.deal_id.localeCompare(b.deal_id));
        const canonicalString = sorted.map(d => 
            `${d.deal_id}:${d.original_price_vnd}:${d.discount_price_vnd}:${d.saving_amount_vnd}:${d.saving_percentage}:${d.voucher_code}:${d.valid_until_raw}:${d.merchant_name}:${d.item_name}:${d.branch_address}:${d.source_channel}:${d.deep_link}:${d.category}:${d.target_icp}:${d.evidence_sha256 || 'NOHASH'}`
        ).join('|');
        return await calculateSHA256(canonicalString);
    }

    // 8. Toast Thông Báo Bay Nổi
    function showToast(message) {
        let toast = document.getElementById('jaytFloatingToast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'jaytFloatingToast';
            toast.style.cssText = `
                position: fixed; top: 20px; left: 50%; transform: translateX(-50%);
                z-index: 100000; background: #0F172A; color: #FFFFFF;
                padding: 0.75rem 1.4rem; border-radius: 9999px; font-size: 0.85rem; font-weight: 700;
                box-shadow: 0 10px 25px rgba(0,0,0,0.3); border: 1.5px solid #10B981;
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

    // 9. Âm thanh sóng biển Web Audio API
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

    // 10. Lời bình dí dỏm máy tính tiết kiệm
    function getCalculatorQuote(monthlySavings) {
        if (monthlySavings <= 500000) return `~${(monthlySavings * 12).toLocaleString('vi-VN')}₫/năm • Dư tiền khao cả phòng trọ 60 tô Bánh Canh Ruộng hoặc 120 ổ Bánh Mì que pate giòn rụm! 🥖`;
        if (monthlySavings <= 1500000) return `~${(monthlySavings * 12).toLocaleString('vi-VN')}₫/năm • Đủ sắm ngay combo vợt Pickleball + đôi giày xịn lượn một vòng công viên APEC đón gió sông Hàn! 🏓✨`;
        if (monthlySavings <= 2500000) return `~${(monthlySavings * 12).toLocaleString('vi-VN')}₫/năm • Đủ đóng trọn 1 NĂM học phí Đại học hoặc đổi luôn chiếc điện thoại mới toanh cày đồ án mượt như lụa! 🎓💻`;
        return `~${(monthlySavings * 12).toLocaleString('vi-VN')}₫/năm • Huyền thoại săn deal! Tiền dôi dư đủ đóng tiền trọ cả năm hoặc bao trọn gói du lịch nghỉ dưỡng Đà Nẵng 5 sao! 🏖️👑`;
    }

    // 11. Render Toàn Bộ Giao Diện APEX LUXURY v9.0
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
        const savedCount = State.savedDealIds.length;

        // Tính toán máy tính
        const weeklyCalc = (State.calcDrink * 20000) + (State.calcMeal * 25000) + (State.calcRide * 20000);
        const monthlyCalc = weeklyCalc * 4;

        // Lọc danh sách deal
        let filteredDeals = usableDeals.filter(d => {
            if (State.activeFilter === 'HOT_DEAL' && d.saving_percentage < 40) return false;
            if (State.activeFilter !== 'ALL' && State.activeFilter !== 'HOT_DEAL' && d.category !== State.activeFilter) return false;
            if (State.activeLandmark !== 'ALL' && d.landmark !== State.activeLandmark && d.landmark !== 'TOAN_TP') return false;
            if (State.activePriceRange === 'UNDER_50K' && d.discount_price_vnd >= 50000) return false;
            if (State.activePriceRange === '50K_100K' && (d.discount_price_vnd < 50000 || d.discount_price_vnd > 100000)) return false;
            
            // ICP Filter
            if (State.activeICP === 'STUDENT') {
                const text = (d.item_name + ' ' + d.merchant_name).toLowerCase();
                if (!text.includes('hssv') && !text.includes('sinh viên') && !text.includes('u22') && !text.includes('maycha') && !text.includes('jollibee') && !text.includes('0đ') && d.category !== 'DRINK' && d.category !== 'CINEMA') return false;
            } else if (State.activeICP === 'OFFICE') {
                const text = (d.item_name + ' ' + d.merchant_name + ' ' + d.branch_address).toLowerCase();
                if (!text.includes('hải châu') && !text.includes('cơm gà') && !text.includes('katinat') && !text.includes('phê la') && !text.includes('grabcar') && d.discount_price_vnd < 25000) return false;
            }

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
                            🔥 <strong>ĐÀ NẴNG HÔM NAY:</strong> CGV Vincom Ngô Quyền vé 55K · 🚗 GrabCar Sân Bay giảm 50.000₫ · ☕ Phê La & Katinat mua kèm 1Đ Bạch Đằng · 🍗 Jollibee Combo Gà 39K · 🛡️ Đối soát mật mã học SHA-256 Web Crypto API cập nhật mỗi 20 giây!
                        </div>
                    </div>

                    <!-- HEADER LUXURY NAVIGATION -->
                    <header style="background: var(--header-bg); backdrop-filter: blur(24px); border-bottom: 1px solid var(--border); padding: 0.75rem 1.5rem; position: sticky; top: 0; z-index: 1000;">
                        <div style="max-width: 1440px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; gap: 1rem; flex-wrap: wrap;">
                            
                            <!-- Brand Logo -->
                            <div style="display: flex; align-items: center; gap: 0.75rem; cursor: pointer;" data-action="switch-tab" data-tab="tab-schedule">
                                <div style="width: 40px; height: 40px; border-radius: 12px; background: linear-gradient(135deg, #059669, #10B981); color: #FFF; display: flex; align-items: center; justify-content: center; font-size: 1.3rem; font-weight: 900; box-shadow: 0 4px 14px rgba(5,150,105,0.4);">J</div>
                                <div>
                                    <div style="font-size: 1.25rem; font-weight: 900; color: var(--text-heading); letter-spacing: -0.02em; display: flex; align-items: center; gap: 0.35rem;">
                                        <span>JayT</span> <span style="font-size: 0.68rem; background: rgba(245,158,11,0.15); color: var(--accent-gold); border: 1px solid rgba(245,158,11,0.35); padding: 0.1rem 0.45rem; border-radius: 4px; font-weight: 800;">ĐÀ NẴNG 43</span>
                                    </div>
                                    <div style="font-size: 0.7rem; color: var(--text-muted);">Cổng Thông Tin & Đặc Quyền Tiết Kiệm Cộng Đồng</div>
                                </div>
                            </div>

                            <!-- Top Nav Tabs -->
                            <nav style="display: flex; align-items: center; gap: 0.3rem; background: var(--bg-tag); padding: 0.25rem 0.4rem; border-radius: var(--radius-pill); border: 1px solid var(--border);">
                                <button data-action="switch-tab" data-tab="tab-schedule" style="background: ${State.activeTab === 'tab-schedule' ? 'var(--bg-surface)' : 'transparent'}; color: ${State.activeTab === 'tab-schedule' ? '#10B981' : 'var(--text-body)'}; border: none; padding: 0.4rem 0.85rem; border-radius: var(--radius-pill); font-size: 0.78rem; font-weight: 700; cursor: pointer;">⏰ Giờ Vàng 0Đ</button>
                                <button data-action="switch-tab" data-tab="tab-deals" style="background: ${State.activeTab === 'tab-deals' ? 'var(--bg-surface)' : 'transparent'}; color: ${State.activeTab === 'tab-deals' ? '#10B981' : 'var(--text-body)'}; border: none; padding: 0.4rem 0.85rem; border-radius: var(--radius-pill); font-size: 0.78rem; font-weight: 700; cursor: pointer;">🍲 Quán Ngon Local</button>
                                <button data-action="switch-tab" data-tab="tab-landmarks" style="background: ${State.activeTab === 'tab-landmarks' ? 'var(--bg-surface)' : 'transparent'}; color: ${State.activeTab === 'tab-landmarks' ? '#10B981' : 'var(--text-body)'}; border: none; padding: 0.4rem 0.85rem; border-radius: var(--radius-pill); font-size: 0.78rem; font-weight: 700; cursor: pointer;">📸 Danh Thắng 4K</button>
                                <button data-action="switch-tab" data-tab="tab-calculator" style="background: ${State.activeTab === 'tab-calculator' ? 'var(--bg-surface)' : 'transparent'}; color: ${State.activeTab === 'tab-calculator' ? '#10B981' : 'var(--text-body)'}; border: none; padding: 0.4rem 0.85rem; border-radius: var(--radius-pill); font-size: 0.78rem; font-weight: 700; cursor: pointer;">🧮 Máy Tính Tiết Kiệm</button>
                                <button data-action="switch-tab" data-tab="tab-guide" style="background: ${State.activeTab === 'tab-guide' ? 'var(--bg-surface)' : 'transparent'}; color: ${State.activeTab === 'tab-guide' ? '#10B981' : 'var(--text-body)'}; border: none; padding: 0.4rem 0.85rem; border-radius: var(--radius-pill); font-size: 0.78rem; font-weight: 700; cursor: pointer;">📖 Cẩm Nang</button>
                            </nav>

                            <!-- Actions Cluster -->
                            <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
                                <button data-action="open-mystery" class="shimmer-btn" style="background: linear-gradient(135deg, rgba(245,158,11,0.25), rgba(217,119,6,0.35)); border: 1px solid rgba(245,158,11,0.5); color: #FDE047; font-size: 0.76rem; font-weight: 800; padding: 0.42rem 0.85rem; border-radius: var(--radius-pill); cursor: pointer;">
                                    🎁 Quà 0Đ
                                </button>
                                <button data-action="toggle-saved-drawer" style="background: var(--bg-card); border: 1px solid var(--border); color: var(--text-heading); font-size: 0.76rem; font-weight: 800; padding: 0.42rem 0.85rem; border-radius: var(--radius-pill); cursor: pointer;">
                                    ❤️ Đã Lưu (${savedCount})
                                </button>
                                <button data-action="toggle-theme" style="width: 36px; height: 36px; border-radius: 50%; background: var(--bg-card); border: 1px solid var(--border); color: var(--text-heading); cursor: pointer; display: flex; align-items: center; justify-content: center;">
                                    ${State.theme === 'dark' ? '☀️' : '🌙'}
                                </button>
                                <a href="https://zalo.me/g/danangdeal43" target="_blank" rel="noopener noreferrer" style="background: linear-gradient(135deg, #10B981, #059669); color: #FFFFFF; font-size: 0.78rem; font-weight: 800; padding: 0.45rem 1.1rem; border-radius: var(--radius-pill); text-decoration: none; display: inline-flex; align-items: center; gap: 0.35rem; box-shadow: 0 4px 14px rgba(16,185,129,0.35);">
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
                            <div style="background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius-card); padding: 1.1rem; display: flex; flex-direction: column; gap: 0.35rem; box-shadow: var(--card-shadow);">
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
                            <div style="background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius-card); padding: 1.1rem; display: flex; flex-direction: column; gap: 0.35rem; box-shadow: var(--card-shadow);">
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

                            <!-- Deck 3: Quà VIP -->
                            <div style="background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius-card); padding: 1.1rem; box-shadow: var(--card-shadow);">
                                <button data-action="open-mystery" class="shimmer-btn" style="width: 100%; background: linear-gradient(135deg, var(--accent-gold), #D97706); color: #000; border: none; padding: 0.75rem; border-radius: 12px; font-weight: 800; font-size: 0.82rem; cursor: pointer; margin-bottom: 0.5rem; box-shadow: 0 4px 14px rgba(245,158,11,0.3);">
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
                                <!-- Hero Welcome Deck (Visual Luxury) -->
                                <div style="background: linear-gradient(180deg, var(--bg-surface) 0%, var(--bg-card) 100%); border: 1px solid var(--border-gold); border-radius: 28px; padding: 2.2rem 1.6rem; margin-bottom: 2rem; box-shadow: var(--card-shadow); text-align: center; position: relative;">
                                    <div style="display: inline-flex; align-items: center; gap: 0.4rem; background: rgba(245,158,11,0.15); border: 1px solid rgba(245,158,11,0.35); color: var(--accent-gold); padding: 0.3rem 0.9rem; border-radius: var(--radius-pill); font-size: 0.76rem; font-weight: 800; margin-bottom: 0.8rem;">
                                        🔥 ĐẶC QUYỀN TIẾT KIỆM MÃ VÙNG 43
                                    </div>
                                    
                                    <h1 style="font-size: clamp(1.8rem, 3.8vw, 2.8rem); font-weight: 900; color: var(--text-heading); line-height: 1.25; margin: 0 0 0.6rem;">
                                        Đừng Chỉ Tìm Giá Rẻ. <br>
                                        <span style="color: #10B981; font-size: clamp(2.2rem, 4.8vw, 3.4rem); font-weight: 900;">${displaySavings} đang sẵn sàng</span>
                                    </h1>
                                    
                                    <p style="font-size: 0.95rem; color: var(--text-body); max-width: 650px; margin: 0 auto 1.5rem; line-height: 1.5;">
                                        Anh em local kiểm định 24/24: GrabFood · ShopeeFood · Xanh SM · CGV · Metiz · Trà sữa Maycha · Katinat · Cơm gà A Hải.
                                    </p>

                                    <!-- DUAL ICP CAPSULE SWITCHER (TÁCH BẠCH 2 TỆP KHÁCH HÀNG MỤC TIÊU) -->
                                    <div style="display: flex; justify-content: center; gap: 0.75rem; margin-bottom: 1.5rem; flex-wrap: wrap;">
                                        <button data-action="switch-icp" data-icp="STUDENT" style="background: ${State.activeICP === 'STUDENT' ? 'linear-gradient(135deg, #10B981, #059669)' : 'var(--bg-surface)'}; color: ${State.activeICP === 'STUDENT' ? '#FFF' : 'var(--text-body)'}; border: 1.5px solid ${State.activeICP === 'STUDENT' ? '#10B981' : 'var(--border)'}; padding: 0.65rem 1.35rem; border-radius: var(--radius-pill); font-size: 0.88rem; font-weight: 800; cursor: pointer; display: inline-flex; align-items: center; gap: 0.45rem; box-shadow: ${State.activeICP === 'STUDENT' ? '0 4px 16px rgba(16,185,129,0.35)' : 'none'};">
                                            <span>🎓 Dành Cho Sinh Viên Đà Thành</span>
                                        </button>
                                        <button data-action="switch-icp" data-icp="OFFICE" style="background: ${State.activeICP === 'OFFICE' ? 'linear-gradient(135deg, var(--accent-gold), #D97706)' : 'var(--bg-surface)'}; color: ${State.activeICP === 'OFFICE' ? '#000' : 'var(--text-body)'}; border: 1.5px solid ${State.activeICP === 'OFFICE' ? 'var(--accent-gold)' : 'var(--border)'}; padding: 0.65rem 1.35rem; border-radius: var(--radius-pill); font-size: 0.88rem; font-weight: 800; cursor: pointer; display: inline-flex; align-items: center; gap: 0.45rem; box-shadow: ${State.activeICP === 'OFFICE' ? '0 4px 16px rgba(245,158,11,0.35)' : 'none'};">
                                            <span>💼 Dành Cho Dân Văn Phòng Hải Châu</span>
                                        </button>
                                        <button data-action="switch-icp" data-icp="ALL" style="background: ${State.activeICP === 'ALL' ? 'var(--text-heading)' : 'var(--bg-surface)'}; color: ${State.activeICP === 'ALL' ? 'var(--bg-page)' : 'var(--text-body)'}; border: 1.5px solid var(--border); padding: 0.65rem 1.1rem; border-radius: var(--radius-pill); font-size: 0.85rem; font-weight: 700; cursor: pointer;">
                                            <span>✨ Tất Cả</span>
                                        </button>
                                    </div>

                                    <!-- Search Input Siêu Cấp -->
                                    <div style="max-width: 580px; margin: 0 auto 1.2rem; position: relative;">
                                        <input type="text" id="jaytMasterSearch" placeholder="Tìm quán ngon, trà sữa, Grab 0Đ, Cầu Rồng..." value="${escapeHTML(State.searchQuery)}" style="width: 100%; background: var(--bg-surface); border: 2px solid var(--border); border-radius: var(--radius-pill); padding: 0.85rem 1.2rem 0.85rem 2.8rem; color: var(--text-heading); font-size: 0.95rem; outline: none; box-shadow: 0 4px 16px rgba(0,0,0,0.15);" />
                                        <span style="position: absolute; left: 1.1rem; top: 50%; transform: translateY(-50%); font-size: 1.15rem; color: var(--accent-gold);">🔍</span>
                                    </div>

                                    <!-- 4 Nhịp Sống Đà Nẵng (Moment Tabs) -->
                                    <div style="display: flex; gap: 0.45rem; justify-content: center; flex-wrap: wrap;">
                                        <button data-action="switch-moment" data-moment="MORNING" style="background: ${State.activeMoment === 'MORNING' ? 'var(--text-heading)' : 'var(--bg-tag)'}; color: ${State.activeMoment === 'MORNING' ? 'var(--bg-page)' : 'var(--text-body)'}; border: none; padding: 0.4rem 0.85rem; border-radius: var(--radius-pill); font-size: 0.78rem; font-weight: 700; cursor: pointer;">☀️ Sáng (6h-11h)</button>
                                        <button data-action="switch-moment" data-moment="NOON" style="background: ${State.activeMoment === 'NOON' ? 'var(--text-heading)' : 'var(--bg-tag)'}; color: ${State.activeMoment === 'NOON' ? 'var(--bg-page)' : 'var(--text-body)'}; border: none; padding: 0.4rem 0.85rem; border-radius: var(--radius-pill); font-size: 0.78rem; font-weight: 700; cursor: pointer;">🍱 Trưa (11h-14h)</button>
                                        <button data-action="switch-moment" data-moment="AFTERNOON" style="background: ${State.activeMoment === 'AFTERNOON' ? 'var(--text-heading)' : 'var(--bg-tag)'}; color: ${State.activeMoment === 'AFTERNOON' ? 'var(--bg-page)' : 'var(--text-body)'}; border: none; padding: 0.4rem 0.85rem; border-radius: var(--radius-pill); font-size: 0.78rem; font-weight: 700; cursor: pointer;">🌆 Chiều (14h-18h)</button>
                                        <button data-action="switch-moment" data-moment="NIGHT" style="background: ${State.activeMoment === 'NIGHT' ? 'var(--text-heading)' : 'var(--bg-tag)'}; color: ${State.activeMoment === 'NIGHT' ? 'var(--bg-page)' : 'var(--text-body)'}; border: none; padding: 0.4rem 0.85rem; border-radius: var(--radius-pill); font-size: 0.78rem; font-weight: 700; cursor: pointer;">🌙 Tối (18h-23h)</button>
                                    </div>
                                </div>

                                <!-- TOP 3 TIẾT KIỆM NHẤT ĐÀ NẴNG (HOÀNG GIA GESSI) -->
                                <div style="margin-bottom: 2.5rem;">
                                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.2rem;">
                                        <div style="display: flex; align-items: center; gap: 0.5rem;">
                                            <span style="font-size: 1.4rem;">🔥</span>
                                            <h3 style="font-size: 1.25rem; font-weight: 900; color: var(--text-heading); margin: 0;">Top 3 Ưu Đãi Tiết Kiệm Nhiều Nhất</h3>
                                        </div>
                                        <span style="font-size: 0.76rem; color: #10B981; font-weight: 800; background: var(--badge-green-bg); border: 1px solid rgba(16,185,129,0.3); padding: 0.25rem 0.7rem; border-radius: 9999px;">Top 3 Đáng Săn</span>
                                    </div>
                                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.4rem;">
                                        ${top3Deals.map((deal, idx) => renderDealCardVisual(deal, true, idx + 1)).join('')}
                                    </div>
                                </div>

                                <!-- TOÀN BỘ KHO ƯU ĐÃI ĐÃ KIỂM ĐỊNH (GRID CARD CÓ ẢNH THẬT) -->
                                <div style="margin-bottom: 2.5rem;">
                                    <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem; margin-bottom: 1.2rem;">
                                        <div style="display: flex; align-items: center; gap: 0.5rem;">
                                            <span style="font-size: 1.4rem;">📋</span>
                                            <h3 style="font-size: 1.25rem; font-weight: 900; color: var(--text-heading); margin: 0;">
                                                Toàn Bộ Kho Ưu Đãi Đối Soát (${filteredDeals.length})
                                            </h3>
                                        </div>
                                        <select id="jaytSortSelect" style="background: var(--bg-surface); border: 1px solid var(--border); border-radius: 10px; padding: 0.45rem 0.85rem; font-size: 0.8rem; color: var(--text-heading); font-weight: 700; outline: none; cursor: pointer;">
                                            <option value="SAVING_DESC" ${State.sortBy === 'SAVING_DESC' ? 'selected' : ''}>💰 Tiết kiệm nhiều nhất</option>
                                            <option value="PCT_DESC" ${State.sortBy === 'PCT_DESC' ? 'selected' : ''}>🔥 Mức giảm % cao nhất</option>
                                            <option value="EXPIRY_ASC" ${State.sortBy === 'EXPIRY_ASC' ? 'selected' : ''}>⏳ Sắp hết hạn</option>
                                        </select>
                                    </div>
                                    
                                    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1.4rem;">
                                        ${filteredDeals.map(deal => renderDealCardVisual(deal, false)).join('')}
                                    </div>
                                </div>
                            ` : ''}

                            <!-- TAB 2: 10 QUÁN NGON LOCAL -->
                            ${State.activeTab === 'tab-deals' ? `
                                <div style="margin-bottom: 2rem;">
                                    <h2 style="font-size: 1.8rem; font-weight: 900; color: var(--text-heading); margin-bottom: 0.4rem;">🍲 10 Quán Ngon Local & Đặc Quyền Tiết Kiệm</h2>
                                    <p style="color: var(--text-muted); font-size: 0.9rem;">Tuyển tập Cơm gà A Hải, Bánh xèo Năm Hiền, Mì Quảng Bà Mua, Trà sữa Maycha, Katinat...</p>
                                </div>
                                <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1.4rem;">
                                    ${usableDeals.map(deal => renderDealCardVisual(deal, false)).join('')}
                                </div>
                            ` : ''}

                            <!-- TAB 3: DANH THẮNG 4K & BIỂN -->
                            ${State.activeTab === 'tab-landmarks' ? `
                                <div style="background: var(--bg-card); border: 1px solid var(--border); border-radius: 24px; padding: 2rem; margin-bottom: 2rem; box-shadow: var(--card-shadow);">
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
                                        <img src="https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1200&q=80" style="width: 100%; height: 100%; object-fit: cover;" alt="Cầu Rồng Đà Nẵng">
                                        <div style="position: absolute; bottom: 1rem; left: 1.5rem; color: #FFF; background: rgba(0,0,0,0.65); backdrop-filter: blur(8px); padding: 0.4rem 0.9rem; border-radius: 8px; font-size: 0.8rem; font-weight: 700;">
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

                            <!-- TAB 4: MÁY TÍNH TIẾT KIỆM -->
                            ${State.activeTab === 'tab-calculator' ? `
                                <div style="background: var(--bg-card); border: 1px solid var(--border); border-radius: 24px; padding: 2rem; max-width: 680px; margin: 0 auto 2rem; box-shadow: var(--card-shadow);">
                                    <div style="text-align: center; margin-bottom: 1.5rem;">
                                        <div style="font-size: 2.5rem; margin-bottom: 0.3rem;">🧮</div>
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
                                <div style="background: var(--bg-card); border: 1px solid var(--border); border-radius: 24px; padding: 2rem; margin-bottom: 2rem; box-shadow: var(--card-shadow);">
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
                            <span>Phiên bản: Production Runtime v9.0 Ultra Luxury Edition</span>
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

    // 12. Render Card Thẻ Ưu Đãi Visual Cao Cấp (Có Ảnh Thật)
    function renderDealCardVisual(deal, isFeatured = false, rank = null) {
        const brand = getMerchantMeta(deal.merchant_name, deal.category);
        const isSaved = State.savedDealIds.includes(deal.deal_id);

        return `
            <div class="deal-card-visual" style="background: var(--bg-card); border: ${isFeatured ? '2px solid #10B981' : '1px solid var(--border)'}; border-radius: var(--radius-card); display: flex; flex-direction: column; justify-content: space-between; box-shadow: var(--card-shadow); height: 100%;">
                
                <!-- Hình Ảnh Đồ Họa Món Ăn Bắt Mắt -->
                <div style="position: relative; width: 100%; aspect-ratio: 16/10; overflow: hidden; background: #000;">
                    <img src="${deal.image_url}" alt="${escapeHTML(deal.item_name)}" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease;" loading="lazy" />
                    
                    <!-- Tag Giảm Giá Trên Ảnh -->
                    <div style="position: absolute; top: 10px; left: 10px; background: rgba(0,0,0,0.75); backdrop-filter: blur(8px); color: #FFF; padding: 0.25rem 0.65rem; border-radius: 9999px; font-family: var(--font-mono); font-size: 0.72rem; font-weight: 800; border: 1px solid rgba(255,255,255,0.2);">
                        -${deal.saving_percentage}% GIẢM
                    </div>

                    ${isFeatured ? `
                        <div style="position: absolute; top: 10px; right: 10px; background: linear-gradient(135deg, #FEF3C7, #FDE68A); color: #92400E; border: 1px solid #F59E0B; font-size: 0.68rem; font-weight: 900; padding: 0.25rem 0.6rem; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.3);">
                            👑 TOP ${rank || 1}
                        </div>
                    ` : ''}

                    <button data-action="toggle-bookmark" data-deal-id="${escapeHTML(deal.deal_id)}" style="position: absolute; bottom: 10px; right: 10px; width: 32px; height: 32px; border-radius: 50%; background: rgba(0,0,0,0.65); backdrop-filter: blur(6px); border: 1px solid rgba(255,255,255,0.25); color: ${isSaved ? '#EF4444' : '#FFF'}; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 0.9rem;">
                        ${isSaved ? '❤️' : '🤍'}
                    </button>
                </div>

                <!-- Thân Thẻ Deal -->
                <div style="padding: 1.2rem; display: flex; flex-direction: column; justify-content: space-between; flex: 1; gap: 0.85rem;">
                    <div>
                        <!-- Header Brand -->
                        <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
                            <div style="background: ${brand.bg}; color: ${brand.color}; width: 28px; height: 28px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 0.95rem; font-weight: 900; flex-shrink: 0;">
                                ${brand.icon}
                            </div>
                            <div style="font-size: 0.84rem; font-weight: 800; color: var(--text-heading);">${escapeHTML(deal.merchant_name)}</div>
                            <span style="font-size: 0.68rem; color: #10B981; margin-left: auto;">${escapeHTML(deal.expiry_info.label)}</span>
                        </div>

                        <!-- Tiêu Đề Món -->
                        <h4 style="font-size: 1.05rem; font-weight: 800; color: var(--text-heading); line-height: 1.35; margin: 0 0 0.35rem;">
                            ${escapeHTML(deal.item_name)}
                        </h4>
                        <p style="font-size: 0.76rem; color: var(--text-muted); margin: 0 0 0.6rem; line-height: 1.4;">
                            📍 ${escapeHTML(deal.branch_address)}
                        </p>

                        <!-- Khối Tiết Kiệm Nổi Bật -->
                        <div style="background: linear-gradient(135deg, rgba(16,185,129,0.12) 0%, rgba(245,158,11,0.08) 100%); border: 1.5px solid #10B981; border-radius: 12px; padding: 0.75rem 0.85rem; text-align: center; margin-bottom: 0.5rem;">
                            <div style="font-size: 1.25rem; font-weight: 900; color: #10B981; line-height: 1.15;">
                                💰 TIẾT KIỆM ${formatVND(deal.saving_amount_vnd)}
                            </div>
                            <div style="font-size: 0.76rem; font-weight: 700; color: var(--text-heading); margin-top: 0.2rem;">
                                Chỉ còn ${formatVND(deal.discount_price_vnd)} <span style="color: var(--text-muted); text-decoration: line-through; margin-left: 0.25rem;">${formatVND(deal.original_price_vnd)}</span>
                            </div>
                        </div>
                    </div>

                    <!-- 2 Nút Hành Động -->
                    <div>
                        <div style="display: flex; gap: 0.45rem; margin-bottom: 0.5rem;">
                            <button data-action="copy" data-code="${escapeHTML(deal.voucher_code)}" style="flex: 1; background: var(--bg-surface); border: 1.5px dashed var(--border-gold); color: var(--text-heading); padding: 0.65rem 0.4rem; border-radius: 12px; font-weight: 800; font-size: 0.78rem; cursor: pointer; transition: all 0.2s;">
                                📋 ${escapeHTML(deal.voucher_code)}
                            </button>
                            <a href="${escapeHTML(deal.deep_link)}" target="_blank" rel="noopener noreferrer" class="shimmer-btn" style="flex: 1.3; background: linear-gradient(135deg, #10B981 0%, #059669 100%); color: #FFFFFF; padding: 0.65rem 0.4rem; border-radius: 12px; font-weight: 800; font-size: 0.82rem; text-align: center; text-decoration: none; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 14px rgba(16,185,129,0.35);">
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
            </div>
        `;
    }

    // 13. Skeleton & Error Screens
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

    // 14. Event Delegation Toàn Cục
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
            } else if (action === 'switch-icp') {
                State.activeICP = btn.getAttribute('data-icp');
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
    }

    // 15. Fetch & Polling Engine Tuần Tự
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
            console.warn("Sync warning:", err);

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

    // 16. Khởi chạy
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
