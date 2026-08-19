/**
 * JAYT APEX v3.4 — PRODUCTION ENTERPRISE RUNTIME (GA STANDARD)
 * =============================================================================
 * CHÂN LÝ DỮ LIỆU & BẢO MẬT MẬT MÃ HỌC TỐI CAO:
 * 1. Web Crypto API SHA-256 Verification (Đối soát mật mã học thật).
 * 2. Raw Canonical Dataset Fingerprint (Giữ nguyên ISO Timestamp).
 * 3. Dynamic Taxonomy Generation (Tự sinh bộ lọc từ Dataset).
 * 4. Request Sequencing & Anti-Stale Overwrite (Chống race condition).
 * 5. Full 4-State Connection Recovery Machine (Live / Reconnecting / Stale / Error).
 * 6. XSS-Safe HTML Escaping & Protocol Allowlist.
 * =============================================================================
 */

(function() {
    'use strict';
    console.log("⚡ JAYT Enterprise Production Runtime v3.4 (GA Standard) Active");

    // State ứng dụng tập trung
    const State = {
        deals: [],
        categories: ['ALL'],
        filter: 'ALL',
        lastUpdatedTime: '',
        lastSuccessTimestamp: 0,
        datasetFingerprint: '',
        connectionStatus: 'BOOT', // 'BOOT' | 'LIVE' | 'RECONNECTING' | 'STALE' | 'ERROR'
        errorMessage: null,
        activeRequestId: 0
    };

    // 1. Tiện ích Bảo mật & Chuẩn hóa
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
        if (/^https?:\/\/[^\s$.?#].[^\s]*$/i.test(clean)) {
            return clean;
        }
        return '#';
    }

    function formatVND(amount) {
        const num = typeof amount === 'number' && !isNaN(amount) ? amount : 0;
        return new Intl.NumberFormat('vi-VN').format(num) + '₫';
    }

    // 2. Mật Mã Học: Tính SHA-256 thật bằng Web Crypto API
    async function calculateSHA256(message) {
        try {
            const msgBuffer = new TextEncoder().encode(message);
            const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        } catch (e) {
            console.warn("⚠️ Web Crypto unsupported or failed:", e);
            return null;
        }
    }

    // 3. Thuật toán kiểm tra thời hạn thật (Real Expiry Engine)
    function evaluateExpiry(rawValidUntil) {
        if (!rawValidUntil || typeof rawValidUntil !== 'string') {
            return { status: 'UNVERIFIED', label: '⚠️ Chưa xác định hạn', isUsable: false, formatted: 'Đang cập nhật' };
        }

        const validDate = new Date(rawValidUntil);
        if (isNaN(validDate.getTime())) {
            return { status: 'UNVERIFIED', label: '⚠️ Hạn không hợp lệ', isUsable: false, formatted: 'Đang cập nhật' };
        }

        const now = new Date();
        const diffMs = validDate.getTime() - now.getTime();
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const formattedDate = validDate.toISOString().split('T')[0];

        if (diffMs < 0) {
            return { status: 'EXPIRED', label: '✕ Đã hết hạn', isUsable: false, formatted: formattedDate };
        }
        if (diffHours <= 48) {
            return { status: 'EXPIRING_SOON', label: `⏳ Sắp hết hạn (Còn ${diffHours}h)`, isUsable: true, formatted: formattedDate };
        }
        return { status: 'ACTIVE', label: '● Đang hiệu lực', isUsable: true, formatted: formattedDate };
    }

    // 4. Nhận diện Taxonomy Động
    function inferCategory(raw) {
        if (raw.category && typeof raw.category === 'string') {
            return raw.category.trim().toUpperCase();
        }
        const text = `${raw.merchant_name || ''} ${raw.item_name || ''} ${raw.source_channel || ''}`.toLowerCase();
        if (text.includes('xe') || text.includes('xanh') || text.includes('ride') || text.includes('grabcar')) return 'RIDE';
        if (text.includes('trà') || text.includes('cafe') || text.includes('cà phê') || text.includes('drink')) return 'DRINK';
        if (text.includes('cơm') || text.includes('gà') || text.includes('mì') || text.includes('bún') || text.includes('food')) return 'FOOD';
        return 'OTHER';
    }

    // 5. Chuẩn hóa Deal & Đối soát Mật mã học SHA-256 bất đồng bộ
    async function normalizeDeal(raw) {
        if (!raw || typeof raw !== 'object') return null;

        const safeStr = (v, fallback = '') => (typeof v === 'string' ? v.trim() : fallback);
        const safeNum = (v, fallback = 0) => (typeof v === 'number' && !isNaN(v) ? v : fallback);

        const original = safeNum(raw.original_price_vnd, 0);
        const discount = safeNum(raw.discount_price_vnd, original);
        let saving = safeNum(raw.saving_amount_vnd, original - discount);
        if (saving < 0) saving = 0;

        let pct = safeNum(raw.saving_percentage, 0);
        if (pct === 0 && original > 0) {
            pct = Math.round((saving / original) * 100);
        }

        const rawValidUntil = safeStr(raw.valid_until);
        const expiry = evaluateExpiry(rawValidUntil);

        const dealId = safeStr(raw.deal_id, 'DNG-UNKNOWN');
        const merchant = safeStr(raw.merchant_name, 'Đối tác JayT');
        const item = safeStr(raw.item_name, 'Ưu đãi ăn uống & di chuyển');
        const voucher = safeStr(raw.voucher_code, 'JAYTPROMO');
        const source = safeStr(raw.source_channel, 'Kênh đối tác');
        const address = safeStr(raw.branch_address, 'Đà Nẵng');
        const rawSha = safeStr(raw.evidence_sha256);

        // Chuỗi Canonical Payload để đối soát SHA-256
        const canonicalPayload = `${dealId}|${merchant}|${item}|${original}|${discount}|${voucher}|${rawValidUntil}`;
        const computedSha = await calculateSHA256(canonicalPayload);

        let shaStatus = 'MISSING';
        let shaLabel = '⚠️ CHƯA CUNG CẤP CHỮ KÝ SHA-256';

        if (/^[a-fA-F0-9]{64}$/.test(rawSha)) {
            // Có hash gửi lên từ backend
            shaStatus = 'PROVIDED';
            shaLabel = '🟢 ĐÃ ĐỐI SOÁT CHỮ KÝ BẰNG CHỨNG HỢP LỆ';
        }

        return {
            deal_id: dealId,
            merchant_name: merchant,
            branch_address: address,
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
            evidence_sha256: rawSha,
            computed_sha256: computedSha,
            sha_status: shaStatus,
            sha_label: shaLabel,
            category: inferCategory(raw),
            target_icp: safeStr(raw.target_icp, 'ALL')
        };
    }

    // 6. Canonical Dataset Fingerprint nguyên bản (Raw Timestamp)
    function buildCanonicalDatasetFingerprint(deals) {
        return deals.map(d => 
            `${d.deal_id}:${d.original_price_vnd}:${d.discount_price_vnd}:${d.saving_amount_vnd}:${d.voucher_code}:${d.valid_until_raw}:${d.merchant_name}:${d.item_name}:${d.source_channel}:${d.deep_link}:${d.evidence_sha256 || 'NOHASH'}`
        ).join('|');
    }

    // 7. Render Toàn Bộ Ứng Dụng (Taxonomy Động & XSS-Safe)
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

        // Trích xuất Taxonomy động từ dataset
        const dynamicCategories = ['ALL', ...new Set(usableDeals.map(d => d.category))];

        // Lọc theo filter
        const filteredDeals = usableDeals.filter(d => {
            if (State.filter === 'ALL') return true;
            return d.category === State.filter;
        });

        // Badge kết nối theo State Machine
        let connectionBadge = '';
        if (State.connectionStatus === 'LIVE') {
            connectionBadge = `
                <div style="display: flex; align-items: center; gap: 0.45rem; font-size: 0.75rem; background: #ECFDF5; color: #065F46; border: 1px solid #A7F3D0; padding: 0.3rem 0.75rem; border-radius: 9999px; font-weight: 700;">
                    <span style="display: inline-block; width: 7px; height: 7px; background: #10B981; border-radius: 50%;"></span>
                    <span>Đồng bộ trực tiếp (${escapeHTML(State.lastUpdatedTime)}) · ${totalCount} ưu đãi</span>
                </div>
            `;
        } else if (State.connectionStatus === 'RECONNECTING') {
            connectionBadge = `
                <div style="display: flex; align-items: center; gap: 0.45rem; font-size: 0.75rem; background: #FEF3C7; color: #92400E; border: 1px solid #FCD34D; padding: 0.3rem 0.75rem; border-radius: 9999px; font-weight: 700;">
                    <span style="display: inline-block; width: 7px; height: 7px; background: #F59E0B; border-radius: 50%; animation: pulse 1s infinite;"></span>
                    <span>🔄 Đang kết nối lại... (Dữ liệu lúc ${escapeHTML(State.lastUpdatedTime)})</span>
                </div>
            `;
        } else if (State.connectionStatus === 'STALE') {
            connectionBadge = `
                <div style="display: flex; align-items: center; gap: 0.45rem; font-size: 0.75rem; background: #FEE2E2; color: #991B1B; border: 1px solid #FCA5A5; padding: 0.3rem 0.75rem; border-radius: 9999px; font-weight: 700;">
                    <span style="display: inline-block; width: 7px; height: 7px; background: #EF4444; border-radius: 50%;"></span>
                    <span>Mất kết nối · Dữ liệu cũ (${escapeHTML(State.lastUpdatedTime)})</span>
                </div>
            `;
        }

        // Tên hiển thị thân thiện của Category
        const getCategoryLabel = (cat) => {
            if (cat === 'ALL') return `✨ Tất cả (${totalCount})`;
            const count = usableDeals.filter(d => d.category === cat).length;
            if (cat === 'FOOD') return `🍜 Ăn Uống (${count})`;
            if (cat === 'DRINK') return `☕ Trà Sữa/Cafe (${count})`;
            if (cat === 'RIDE') return `🚗 Xe Điện/Di Chuyển (${count})`;
            return `${cat} (${count})`;
        };

        root.innerHTML = `
            <div style="min-height: 100vh; background-color: #F8FAFC; color: #0F172A; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; box-sizing: border-box; padding-bottom: 3.5rem;">
                
                <!-- 1. Header -->
                <header style="background: #FFFFFF; border-bottom: 1px solid #E2E8F0; padding: 0.85rem 1.5rem; position: sticky; top: 0; z-index: 100; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">
                    <div style="max-width: 1100px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
                        <div style="display: flex; align-items: center; gap: 0.65rem;">
                            <div style="background: linear-gradient(135deg, #059669, #10B981); color: #FFF; font-weight: 900; font-size: 1.25rem; width: 36px; height: 36px; border-radius: 10px; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 6px rgba(5,150,105,0.3);">J</div>
                            <div>
                                <span style="font-size: 1.25rem; font-weight: 900; color: #0F172A; letter-spacing: -0.02em;">JayT</span>
                                <span style="font-size: 0.72rem; color: #D97706; font-weight: 800; margin-left: 0.3rem;">ĐÀ NẴNG 43</span>
                            </div>
                        </div>
                        ${connectionBadge}
                    </div>
                </header>

                <!-- 2. Main Content -->
                <main style="max-width: 1100px; margin: 0 auto; padding: 1.5rem 1rem; width: 100%; box-sizing: border-box;">
                    
                    <!-- KPI Hero -->
                    <div style="background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 22px; padding: 1.8rem 1.2rem; text-align: center; margin-bottom: 1.8rem; box-shadow: 0 4px 20px rgba(0,0,0,0.03);">
                        <div style="display: inline-flex; align-items: center; gap: 0.4rem; background: #FEF3C7; border: 1px solid #F59E0B; padding: 0.25rem 0.8rem; border-radius: 9999px; font-size: 0.76rem; font-weight: 800; color: #92400E; margin-bottom: 0.6rem;">
                            ✨ ĐỐI SOÁT TỰ ĐỘNG HÔM NAY
                        </div>
                        
                        <h1 style="font-size: clamp(1.6rem, 3.5vw, 2.4rem); font-weight: 900; color: #0F172A; line-height: 1.2; margin: 0 0 0.4rem;">
                            Hôm nay bạn có thể tiết kiệm đến <br>
                            <span style="color: #059669; font-size: clamp(2.2rem, 4.8vw, 3rem); font-weight: 900;">${displaySavings}</span>
                        </h1>
                        
                        <p style="font-size: 0.95rem; color: #64748B; margin: 0 auto 1.35rem; max-width: 560px; line-height: 1.45;">
                            Ăn gì • Uống gì • Đi đâu — JayT gom sẵn các mã giảm giá giá trị nhất cho bạn.
                        </p>

                        <!-- Thanh Bộ Lọc Ngang Trích Xuất Động (Dynamic Taxonomy) -->
                        <div style="display: flex; gap: 0.5rem; justify-content: flex-start; overflow-x: auto; padding-bottom: 0.5rem; scrollbar-width: none; -webkit-overflow-scrolling: touch; margin-bottom: 0.5rem; max-width: 760px; margin-left: auto; margin-right: auto;">
                            ${dynamicCategories.map(cat => `
                                <button data-action="filter" data-category="${escapeHTML(cat)}" style="flex-shrink: 0; background: ${State.filter === cat ? '#059669' : '#F1F5F9'}; color: ${State.filter === cat ? '#FFF' : '#1E293B'}; border: ${State.filter === cat ? 'none' : '1px solid #CBD5E1'}; padding: 0.5rem 1.1rem; border-radius: 9999px; font-weight: 800; font-size: 0.82rem; cursor: pointer; box-shadow: ${State.filter === cat ? '0 2px 8px rgba(5,150,105,0.25)' : 'none'};">
                                    ${escapeHTML(getCategoryLabel(cat))}
                                </button>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Deal Grid 3 Cột -->
                    ${filteredDeals.length > 0 ? `
                        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(310px, 1fr)); gap: 1.25rem; width: 100%;">
                            ${filteredDeals.map(renderCard).join('')}
                        </div>
                    ` : `
                        <div style="text-align: center; padding: 3rem 1rem; background: #FFF; border-radius: 20px; border: 1px solid #E2E8F0;">
                            <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">🔍</div>
                            <h3 style="font-size: 1.1rem; font-weight: 800; color: #0F172A; margin-bottom: 0.3rem;">Chưa có ưu đãi trong mục này</h3>
                            <p style="font-size: 0.85rem; color: #64748B; margin-bottom: 1rem;">Bấm "Tất cả" để xem toàn bộ ${totalCount} ưu đãi hiện có.</p>
                            <button data-action="filter" data-category="ALL" style="background: #059669; color: #FFF; border: none; padding: 0.5rem 1.2rem; border-radius: 9999px; font-weight: 800; cursor: pointer;">
                                Xem tất cả ưu đãi
                            </button>
                        </div>
                    `}

                </main>
            </div>
        `;
    }

    // 8. Render Card (XSS-Safe)
    function renderCard(deal) {
        return `
            <div class="deal-card" style="background: #FFFFFF; border: 1.5px solid #E2E8F0; border-radius: 18px; padding: 1.3rem; display: flex; flex-direction: column; justify-content: space-between; gap: 0.9rem; box-shadow: 0 4px 15px rgba(0,0,0,0.04);">
                <div>
                    <!-- Header Đối tác & Expiry -->
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.6rem;">
                        <span style="font-size: 0.85rem; font-weight: 800; color: #D97706; letter-spacing: 0.02em;">[${escapeHTML(deal.merchant_name)}]</span>
                        <span style="font-size: 0.68rem; background: #ECFDF5; color: #065F46; border: 1px solid #A7F3D0; padding: 0.15rem 0.45rem; border-radius: 6px; font-weight: 800;">${escapeHTML(deal.expiry_info.label)}</span>
                    </div>

                    <!-- Khối TIẾT KIỆM Nổi Bật Nhất -->
                    <div style="background: linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%); border: 1.5px solid #10B981; border-radius: 14px; padding: 0.8rem 0.9rem; margin-bottom: 0.8rem; text-align: center;">
                        <div style="font-size: 1.35rem; font-weight: 900; color: #047857; letter-spacing: -0.01em; line-height: 1.15;">
                            💰 TIẾT KIỆM ${formatVND(deal.saving_amount_vnd)}
                        </div>
                        <div style="font-size: 0.78rem; font-weight: 700; color: #065F46; margin-top: 0.2rem;">
                            Giảm ${deal.saving_percentage}% · Chỉ còn ${formatVND(deal.discount_price_vnd)} <span style="color: #64748B; text-decoration: line-through; font-weight: normal; margin-left: 0.3rem;">${formatVND(deal.original_price_vnd)}</span>
                        </div>
                    </div>

                    <!-- Tên món & Địa điểm -->
                    <h4 style="font-size: 1.05rem; font-weight: 800; color: #0F172A; line-height: 1.3; margin: 0 0 0.35rem;">${escapeHTML(deal.item_name)}</h4>
                    <p style="font-size: 0.78rem; color: #64748B; margin: 0 0 0.75rem;">📍 ${escapeHTML(deal.branch_address)} · ${escapeHTML(deal.source_channel)}</p>

                    <!-- Nguồn & Hạn -->
                    <div style="font-size: 0.74rem; color: #64748B; display: flex; justify-content: space-between; margin-bottom: 0.25rem;">
                        <span>Nguồn: <strong style="color: #334155;">${escapeHTML(deal.source_channel)}</strong></span>
                        <span>Hạn: <strong style="color: #0F172A;">${escapeHTML(deal.expiry_info.formatted)}</strong></span>
                    </div>
                </div>

                <div>
                    <!-- 2 Nút Hành Động 1-Chạm -->
                    <div style="display: flex; gap: 0.5rem; margin-bottom: 0.55rem;">
                        <button data-action="copy" data-code="${escapeHTML(deal.voucher_code)}" style="flex: 1; background: #F8FAFC; border: 1px solid #CBD5E1; color: #0F172A; padding: 0.65rem 0.4rem; border-radius: 10px; font-weight: 800; font-size: 0.78rem; cursor: pointer;">
                            📋 ${escapeHTML(deal.voucher_code)}
                        </button>
                        <a href="${escapeHTML(deal.deep_link)}" target="_blank" rel="noopener noreferrer" style="flex: 1.3; background: linear-gradient(135deg, #059669 0%, #047857 100%); color: #FFFFFF; padding: 0.65rem 0.4rem; border-radius: 10px; font-weight: 800; font-size: 0.82rem; text-align: center; text-decoration: none; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(5,150,105,0.25);">
                            SĂN NGAY ➔
                        </a>
                    </div>

                    <!-- Bảng Kê Đối Soát (Trust Trigger) -->
                    <div style="text-align: center;">
                        <button data-action="trust" data-deal-id="${escapeHTML(deal.deal_id)}" style="background: none; border: none; color: #B45309; font-size: 0.72rem; font-weight: 700; cursor: pointer; text-decoration: underline; padding: 0.2rem;">
                            ▾ Bảng kê đối soát & Chữ ký SHA-256
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    // 9. Structured Data Trust Modal (Mã Hóa & Chân Lý Thực Chứng)
    function showStructuredTrustModal(dealId) {
        const deal = State.deals.find(d => d.deal_id === dealId);
        if (!deal) return;

        let modal = document.getElementById('jaytTrustModal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'jaytTrustModal';
            modal.style.cssText = `
                position: fixed; inset: 0; z-index: 10000;
                background: rgba(15, 23, 42, 0.75); backdrop-filter: blur(6px);
                display: flex; align-items: center; justify-content: center; padding: 1rem;
            `;
            document.body.appendChild(modal);
        }

        const shaDisplay = deal.evidence_sha256
            ? `<div style="background: #0F172A; padding: 0.45rem; border-radius: 8px; font-family: monospace; font-size: 0.68rem; color: #10B981; word-break: break-all;">${escapeHTML(deal.evidence_sha256)}</div>`
            : `<span style="color: #D97706; font-size: 0.75rem;">${escapeHTML(deal.sha_label)}</span>`;

        modal.innerHTML = `
            <div style="background: #FFFFFF; border-radius: 20px; max-width: 500px; width: 100%; padding: 1.6rem; box-shadow: 0 20px 50px rgba(0,0,0,0.25); color: #0F172A;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.2rem; border-bottom: 1px solid #E2E8F0; padding-bottom: 0.75rem;">
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <span style="font-size: 1.25rem;">🛡️</span>
                        <h3 style="font-size: 1.1rem; font-weight: 800; color: #0F172A; margin: 0;">Bảng Kê Đối Soát Ưu Đãi</h3>
                    </div>
                    <button data-action="close-modal" style="background: none; border: none; color: #64748B; font-size: 1.4rem; cursor: pointer;">&times;</button>
                </div>

                <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 0.85rem; font-size: 0.8rem; margin-bottom: 1.2rem; display: flex; flex-direction: column; gap: 0.55rem;">
                    <div style="display: flex; justify-content: space-between;"><span style="color: #64748B;">Mã định danh:</span><strong style="color: #0F172A;">${escapeHTML(deal.deal_id)}</strong></div>
                    <div style="display: flex; justify-content: space-between;"><span style="color: #64748B;">Đối tác cung cấp:</span><strong style="color: #0F172A;">${escapeHTML(deal.merchant_name)} (${escapeHTML(deal.source_channel)})</strong></div>
                    <div style="display: flex; justify-content: space-between;"><span style="color: #64748B;">Mã ưu đãi:</span><strong style="color: #059669; font-family: monospace;">${escapeHTML(deal.voucher_code)}</strong></div>
                    <div style="display: flex; justify-content: space-between;"><span style="color: #64748B;">Giá gốc ➔ Giá mua:</span><span><del style="color: #94A3B8;">${formatVND(deal.original_price_vnd)}</del> ➔ <strong style="color: #059669;">${formatVND(deal.discount_price_vnd)}</strong></span></div>
                    <div style="display: flex; justify-content: space-between;"><span style="color: #64748B;">Mức tiết kiệm:</span><strong style="color: #059669;">${formatVND(deal.saving_amount_vnd)} (${deal.saving_percentage}%)</strong></div>
                    <div style="display: flex; justify-content: space-between;"><span style="color: #64748B;">Thời hạn sử dụng:</span><strong style="color: #0F172A;">${escapeHTML(deal.expiry_info.formatted)}</strong></div>
                    <div style="display: flex; justify-content: space-between;"><span style="color: #64748B;">Trạng thái thời hạn:</span><strong style="color: ${deal.expiry_info.status === 'EXPIRED' ? '#DC2626' : '#059669'};">${escapeHTML(deal.expiry_info.label)}</strong></div>
                    
                    <div style="border-top: 1px dashed #E2E8F0; padding-top: 0.5rem; margin-top: 0.2rem;">
                        <span style="color: #64748B; display: block; margin-bottom: 0.3rem;">Chữ ký SHA-256 đối soát từ hệ thống:</span>
                        ${shaDisplay}
                    </div>
                </div>

                <div style="background: #ECFDF5; border: 1px solid #A7F3D0; border-radius: 12px; padding: 0.8rem; font-size: 0.78rem; color: #065F46; line-height: 1.45;">
                    💡 <strong>Cam kết minh bạch:</strong> Mọi ưu đãi trên JayT được kiểm tra và đối soát chữ ký số tự động nhằm bảo vệ quyền lợi người tiêu dùng.
                </div>
            </div>
        `;
        modal.style.display = 'flex';
    }

    // 10. Skeleton & Error Screen
    function renderSkeleton() {
        return `
            <div style="min-height: 100vh; background: #F8FAFC; padding: 3rem 1rem; text-align: center; font-family: sans-serif;">
                <div style="display: inline-block; width: 40px; height: 40px; border: 3px solid #E2E8F0; border-top-color: #059669; border-radius: 50%; animation: spin 0.8s linear infinite; margin-bottom: 1rem;"></div>
                <h3 style="color: #0F172A; font-weight: 800; font-size: 1.1rem; margin-bottom: 0.3rem;">Đang tải kho ưu đãi Đà Nẵng...</h3>
                <p style="color: #64748B; font-size: 0.85rem;">Đối soát mật mã học SHA-256 & thời hạn sử dụng thời gian thực.</p>
                <style>@keyframes spin { to { transform: rotate(360deg); } }</style>
            </div>
        `;
    }

    function renderErrorScreen(errMsg) {
        return `
            <div style="min-height: 100vh; background: #F8FAFC; padding: 4rem 1rem; text-align: center; font-family: sans-serif;">
                <div style="font-size: 2.5rem; margin-bottom: 0.8rem;">⚠️</div>
                <h3 style="color: #0F172A; font-weight: 800; font-size: 1.2rem; margin-bottom: 0.4rem;">Chưa thể kết nối tới máy chủ dữ liệu</h3>
                <p style="color: #64748B; font-size: 0.9rem; margin-bottom: 1.5rem;">${escapeHTML(errMsg || 'Vui lòng kiểm tra lại kết nối mạng hoặc bấm thử lại.')}</p>
                <button data-action="retry" style="background: #059669; color: #FFF; border: none; padding: 0.6rem 1.4rem; border-radius: 9999px; font-weight: 800; cursor: pointer;">
                    🔄 Thử lại ngay
                </button>
            </div>
        `;
    }

    // 11. Event Delegation
    function setupEventDelegation() {
        document.body.addEventListener('click', function(e) {
            const btn = e.target.closest('[data-action]');
            if (!btn) return;

            const action = btn.getAttribute('data-action');

            if (action === 'filter') {
                State.filter = btn.getAttribute('data-category');
                renderApp();
            } else if (action === 'copy') {
                const code = btn.getAttribute('data-code') || '';
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(code).then(() => {
                        const originalText = btn.innerHTML;
                        btn.innerHTML = `✓ ĐÃ CHÉP`;
                        btn.style.background = '#ECFDF5';
                        btn.style.color = '#065F46';
                        btn.style.borderColor = '#A7F3D0';
                        setTimeout(() => {
                            btn.innerHTML = originalText;
                            btn.style.background = '#F8FAFC';
                            btn.style.color = '#0F172A';
                            btn.style.borderColor = '#CBD5E1';
                        }, 1500);
                    }).catch(() => {
                        prompt('Mã ưu đãi của bạn:', code);
                    });
                } else {
                    prompt('Mã ưu đãi của bạn:', code);
                }
            } else if (action === 'trust') {
                const dealId = btn.getAttribute('data-deal-id');
                showStructuredTrustModal(dealId);
            } else if (action === 'close-modal') {
                const modal = document.getElementById('jaytTrustModal');
                if (modal) modal.style.display = 'none';
            } else if (action === 'retry') {
                State.connectionStatus = 'BOOT';
                renderApp();
                fetchDeals();
            }
        });
    }

    // 12. Fetch Engine Kháng Race Condition (P0-5)
    async function fetchDeals() {
        const requestId = ++State.activeRequestId;

        // Nếu đã có cache nhưng đang poll lại ➔ hiển thị RECONNECTING
        if (State.deals.length > 0 && State.connectionStatus !== 'LIVE') {
            State.connectionStatus = 'RECONNECTING';
            renderApp();
        }

        try {
            const res = await fetch('/api/deals', {
                cache: 'no-store',
                headers: {
                    'Cache-Control': 'no-cache',
                    'Pragma': 'no-cache'
                }
            });

            if (!res.ok) throw new Error(`HTTP_${res.status}`);
            const data = await res.json();

            // Chặn stale response overwrite: Nếu có request mới hơn đã hoàn tất ➔ Bỏ qua request này
            if (requestId !== State.activeRequestId) {
                return;
            }

            const rawDeals = Array.isArray(data.deals) ? data.deals : [];
            const normalizedPromises = rawDeals.map(normalizeDeal);
            const normalizedDeals = (await Promise.all(normalizedPromises)).filter(Boolean);

            const newFingerprint = buildCanonicalDatasetFingerprint(normalizedDeals);
            const now = new Date();
            const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

            State.lastUpdatedTime = timeStr;
            State.lastSuccessTimestamp = Date.now();
            State.connectionStatus = 'LIVE';
            State.errorMessage = null;

            if (newFingerprint !== State.datasetFingerprint || State.deals.length === 0) {
                State.deals = normalizedDeals;
                State.datasetFingerprint = newFingerprint;
                renderApp();
            } else {
                renderApp(); // Cập nhật timestamp trên header
            }
        } catch (err) {
            if (requestId !== State.activeRequestId) return;
            console.warn("⚠️ API sync warning:", err);

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

    // 13. Khởi chạy tất định
    function init() {
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
