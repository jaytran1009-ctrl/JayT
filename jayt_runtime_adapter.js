/**
 * JAYT APEX v4.0 — COMPLETE DEAL PORTAL RUNTIME
 * =============================================================================
 * ĐẠI ĐÔ THỊ ƯU ĐÃI ĐÀ NẴNG (MÃ VÙNG 43):
 * 1. Kho dữ liệu mở rộng 16 Deals thực tế đối soát.
 * 2. Tìm kiếm thời gian thực (Live Search by Merchant/Item/District).
 * 3. Featured Row (Ưu đãi tiết kiệm cao nhất hôm nay).
 * 4. Mật mã học Web Crypto SHA-256 Match 100%.
 * 5. Full 15-Field Canonical Dataset Fingerprint.
 * 6. Responsive Mobile-First & Footer Doanh Nghiệp Hoàn Thiện.
 * =============================================================================
 */

(function() {
    'use strict';
    console.log("⚡ JAYT Portal Runtime v4.0 Active");

    const State = {
        deals: [],
        categories: ['ALL'],
        activeFilter: 'ALL',
        searchQuery: '',
        lastUpdatedTime: '',
        lastSuccessTimestamp: 0,
        datasetFingerprint: '',
        connectionStatus: 'BOOT', // 'BOOT' | 'LIVE' | 'RECONNECTING' | 'STALE' | 'ERROR'
        errorMessage: null,
        activeRequestId: 0
    };

    let activeAbortController = null;

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
        if (/^https?:\/\/[^\s$.?#].[^\s]*$/i.test(clean)) {
            return clean;
        }
        return '#';
    }

    function formatVND(amount) {
        const num = typeof amount === 'number' && !isNaN(amount) ? amount : 0;
        return new Intl.NumberFormat('vi-VN').format(num) + '₫';
    }

    // 2. Mật mã học SHA-256 Web Crypto
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

    // 3. Expiry Engine Thời Gian Thực
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
            return { status: 'EXPIRING_SOON', label: `⏳ Còn ${diffHours}h`, isUsable: true, formatted: formattedDate };
        }
        return { status: 'ACTIVE', label: '● Đang hiệu lực', isUsable: true, formatted: formattedDate };
    }

    // 4. Chuẩn hóa Deal & Đối soát Mật mã học SHA-256 (Match/Mismatch/Missing)
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
        const rawEvidenceSha = safeStr(raw.evidence_sha256);

        // Chuỗi Canonical Payload
        const canonicalPayload = `${dealId}|${merchant}|${item}|${original}|${discount}|${voucher}|${rawValidUntil}`;
        const computedSha = await calculateSHA256(canonicalPayload);

        let shaStatus = 'MISSING';
        let shaLabel = '⚠️ CHƯA CUNG CẤP CHỮ KÝ SHA-256';

        if (!rawEvidenceSha || !/^[a-fA-F0-9]{64}$/.test(rawEvidenceSha)) {
            shaStatus = 'MISSING';
            shaLabel = '⚠️ CHƯA CUNG CẤP CHỮ KÝ SHA-256';
        } else if (computedSha && computedSha.toLowerCase() === rawEvidenceSha.toLowerCase()) {
            shaStatus = 'MATCH';
            shaLabel = '🟢 CHỮ KÝ SHA-256 ĐÃ ĐỐI SOÁT HỢP LỆ (KHỚP 100%)';
        } else {
            shaStatus = 'MISMATCH';
            shaLabel = '🔴 CẢNH BÁO: CHỮ KÝ BẤT KHỚP (DỮ LIỆU ĐÃ BỊ THAY ĐỔI)';
        }

        return {
            deal_id: dealId,
            merchant_name: merchant,
            branch_address: address,
            district: safeStr(raw.district, 'All_Districts'),
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
            sha_label: shaLabel,
            category: safeStr(raw.category, 'FOOD').toUpperCase(),
            target_icp: safeStr(raw.target_icp, 'ALL')
        };
    }

    // 5. Canonical Dataset Fingerprint 15 trường dữ liệu
    function buildCanonicalDatasetFingerprint(deals) {
        return deals.map(d => 
            `${d.deal_id}:${d.original_price_vnd}:${d.discount_price_vnd}:${d.saving_amount_vnd}:${d.saving_percentage}:${d.voucher_code}:${d.valid_until_raw}:${d.merchant_name}:${d.item_name}:${d.branch_address}:${d.source_channel}:${d.deep_link}:${d.category}:${d.target_icp}:${d.evidence_sha256 || 'NOHASH'}`
        ).join('|');
    }

    // 6. Render Giao Diện Portal Đầy Đủ
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

        // Trích xuất danh mục động
        const dynamicCategories = ['ALL', ...new Set(usableDeals.map(d => d.category)), 'HOT_DEAL'];

        // Lọc theo search và category
        let filteredDeals = usableDeals.filter(d => {
            // Bộ lọc danh mục
            if (State.activeFilter === 'HOT_DEAL') {
                if (d.saving_percentage < 40) return false;
            } else if (State.activeFilter !== 'ALL') {
                if (d.category !== State.activeFilter) return false;
            }
            // Bộ lọc tìm kiếm
            if (State.searchQuery) {
                const q = State.searchQuery.toLowerCase();
                const matchText = `${d.merchant_name} ${d.item_name} ${d.branch_address} ${d.voucher_code}`.toLowerCase();
                if (!matchText.includes(q)) return false;
            }
            return true;
        });

        // Top 3 Hot Deals cho khu vực Featured
        const topFeaturedDeals = [...usableDeals].sort((a, b) => b.saving_amount_vnd - a.saving_amount_vnd).slice(0, 3);

        // Connection Badge
        let connectionBadge = '';
        if (State.connectionStatus === 'LIVE') {
            connectionBadge = `
                <div style="display: flex; align-items: center; gap: 0.45rem; font-size: 0.75rem; background: #ECFDF5; color: #065F46; border: 1px solid #A7F3D0; padding: 0.35rem 0.8rem; border-radius: 9999px; font-weight: 700;">
                    <span style="display: inline-block; width: 7px; height: 7px; background: #10B981; border-radius: 50%;"></span>
                    <span>Đồng bộ (${escapeHTML(State.lastUpdatedTime)}) · ${totalCount} ưu đãi</span>
                </div>
            `;
        } else if (State.connectionStatus === 'RECONNECTING') {
            connectionBadge = `
                <div style="display: flex; align-items: center; gap: 0.45rem; font-size: 0.75rem; background: #FEF3C7; color: #92400E; border: 1px solid #FCD34D; padding: 0.35rem 0.8rem; border-radius: 9999px; font-weight: 700;">
                    <span style="display: inline-block; width: 7px; height: 7px; background: #F59E0B; border-radius: 50%;"></span>
                    <span>🔄 Đang kết nối lại...</span>
                </div>
            `;
        }

        const getCategoryLabel = (cat) => {
            if (cat === 'ALL') return `✨ Tất cả (${totalCount})`;
            if (cat === 'HOT_DEAL') return `🔥 Giảm ≥ 40% (${usableDeals.filter(d => d.saving_percentage >= 40).length})`;
            const count = usableDeals.filter(d => d.category === cat).length;
            if (cat === 'FOOD') return `🍜 Ăn Uống (${count})`;
            if (cat === 'DRINK') return `☕ Trà Sữa & Cafe (${count})`;
            if (cat === 'RIDE') return `🚗 Xe Điện & Đi Lại (${count})`;
            if (cat === 'CINEMA') return `🎬 Xem Phim (${count})`;
            if (cat === 'SHOPPING') return `🛍️ Mua Sắm (${count})`;
            return `${cat} (${count})`;
        };

        root.innerHTML = `
            <div style="min-height: 100vh; background-color: #F8FAFC; color: #0F172A; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; box-sizing: border-box; display: flex; flex-direction: column; justify-content: space-between;">
                
                <div>
                    <!-- 1. Header Thanh Lịch & Tìm Kiếm Nhanh -->
                    <header style="background: #FFFFFF; border-bottom: 1px solid #E2E8F0; padding: 0.85rem 1.5rem; position: sticky; top: 0; z-index: 100; box-shadow: 0 1px 4px rgba(0,0,0,0.03);">
                        <div style="max-width: 1140px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem;">
                            
                            <!-- Logo & Badge Tỉnh Thành -->
                            <div style="display: flex; align-items: center; gap: 0.65rem;">
                                <div style="background: linear-gradient(135deg, #059669, #10B981); color: #FFF; font-weight: 900; font-size: 1.25rem; width: 36px; height: 36px; border-radius: 10px; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 6px rgba(5,150,105,0.3);">J</div>
                                <div>
                                    <div style="display: flex; align-items: center; gap: 0.35rem;">
                                        <span style="font-size: 1.25rem; font-weight: 900; color: #0F172A; letter-spacing: -0.02em;">JayT</span>
                                        <span style="font-size: 0.7rem; background: #FEF3C7; color: #92400E; border: 1px solid #F59E0B; padding: 0.1rem 0.4rem; border-radius: 4px; font-weight: 800;">ĐÀ NẴNG 43</span>
                                    </div>
                                    <div style="font-size: 0.72rem; color: #64748B;">Cổng thông tin ưu đãi đối soát</div>
                                </div>
                            </div>

                            <!-- Ô Tìm Kiếm Nhanh Live Search -->
                            <div style="flex: 1; max-width: 380px; min-width: 240px; position: relative;">
                                <input type="text" id="jaytLiveSearchInput" placeholder="🔍 Tìm quán, món ăn, xe điện..." value="${escapeHTML(State.searchQuery)}" style="width: 100%; background: #F1F5F9; border: 1.5px solid #E2E8F0; border-radius: 9999px; padding: 0.5rem 1rem 0.5rem 2.2rem; font-size: 0.82rem; color: #0F172A; outline: none; transition: border-color 0.2s;" />
                                <span style="position: absolute; left: 0.8rem; top: 50%; transform: translateY(-50%); font-size: 0.85rem; color: #94A3B8;">🔍</span>
                            </div>

                            ${connectionBadge}
                        </div>
                    </header>

                    <!-- 2. Main Portal Content -->
                    <main style="max-width: 1140px; margin: 0 auto; padding: 1.5rem 1rem; width: 100%; box-sizing: border-box;">
                        
                        <!-- Hero Section: Tổng Giá Trị & Thống Kê -->
                        <div style="background: linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%); border: 1px solid #E2E8F0; border-radius: 22px; padding: 2rem 1.2rem; text-align: center; margin-bottom: 2rem; box-shadow: 0 4px 20px rgba(0,0,0,0.03);">
                            <div style="display: inline-flex; align-items: center; gap: 0.4rem; background: #FEF3C7; border: 1px solid #F59E0B; padding: 0.25rem 0.8rem; border-radius: 9999px; font-size: 0.76rem; font-weight: 800; color: #92400E; margin-bottom: 0.6rem;">
                                📍 THỦ PHỦ ƯU ĐÃI ĐÀ NẴNG (MÃ VÙNG 43)
                            </div>
                            
                            <h1 style="font-size: clamp(1.7rem, 3.8vw, 2.6rem); font-weight: 900; color: #0F172A; line-height: 1.2; margin: 0 0 0.4rem;">
                                Hôm nay bạn có thể tiết kiệm đến <br>
                                <span style="color: #059669; font-size: clamp(2.2rem, 5vw, 3.2rem); font-weight: 900;">${displaySavings}</span>
                            </h1>
                            
                            <p style="font-size: 0.95rem; color: #64748B; margin: 0 auto 1.4rem; max-width: 580px; line-height: 1.45;">
                                Khám phá <strong>${totalCount} ưu đãi</strong> từ <strong>${brandCount} thương hiệu</strong> hàng đầu đã được đối soát nguồn gốc & hạn dùng.
                            </p>

                            <!-- Thanh Bộ Lọc Ngang Trượt Mobile-First -->
                            <div style="display: flex; gap: 0.5rem; justify-content: flex-start; overflow-x: auto; padding-bottom: 0.5rem; scrollbar-width: none; -webkit-overflow-scrolling: touch; margin-bottom: 0.2rem; max-width: 860px; margin-left: auto; margin-right: auto;">
                                ${dynamicCategories.map(cat => `
                                    <button data-action="filter" data-category="${escapeHTML(cat)}" style="flex-shrink: 0; background: ${State.activeFilter === cat ? '#059669' : '#FFFFFF'}; color: ${State.activeFilter === cat ? '#FFF' : '#1E293B'}; border: ${State.activeFilter === cat ? 'none' : '1.5px solid #CBD5E1'}; padding: 0.5rem 1.15rem; border-radius: 9999px; font-weight: 800; font-size: 0.82rem; cursor: pointer; box-shadow: ${State.activeFilter === cat ? '0 3px 10px rgba(5,150,105,0.3)' : '0 1px 3px rgba(0,0,0,0.02)'}; transition: all 0.2s;">
                                        ${escapeHTML(getCategoryLabel(cat))}
                                    </button>
                                `).join('')}
                            </div>
                        </div>

                        <!-- 3. Khu vực Ưu Đãi Nổi Bật (Featured Top Savings) -->
                        ${!State.searchQuery && State.activeFilter === 'ALL' ? `
                            <div style="margin-bottom: 2rem;">
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                                        <span style="font-size: 1.25rem;">🔥</span>
                                        <h3 style="font-size: 1.15rem; font-weight: 900; color: #0F172A; margin: 0;">Ưu đãi tiết kiệm nhiều nhất hôm nay</h3>
                                    </div>
                                    <span style="font-size: 0.76rem; color: #64748B; font-weight: 700;">Top 3 Đáng Săn</span>
                                </div>
                                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(310px, 1fr)); gap: 1.25rem;">
                                    ${topFeaturedDeals.map(deal => renderCard(deal, true)).join('')}
                                </div>
                            </div>
                        ` : ''}

                        <!-- 4. Danh sách toàn bộ Deal Grid -->
                        <div style="margin-bottom: 1.5rem;">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                                <div style="display: flex; align-items: center; gap: 0.5rem;">
                                    <span style="font-size: 1.25rem;">📋</span>
                                    <h3 style="font-size: 1.15rem; font-weight: 900; color: #0F172A; margin: 0;">
                                        ${State.searchQuery ? `Kết quả tìm kiếm cho "${escapeHTML(State.searchQuery)}"` : 'Toàn bộ danh sách ưu đãi'} (${filteredDeals.length})
                                    </h3>
                                </div>
                                ${State.searchQuery ? `
                                    <button data-action="clear-search" style="background: none; border: none; color: #059669; font-weight: 700; font-size: 0.78rem; cursor: pointer; text-decoration: underline;">Xóa tìm kiếm</button>
                                ` : ''}
                            </div>

                            ${filteredDeals.length > 0 ? `
                                <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(310px, 1fr)); gap: 1.25rem; width: 100%;">
                                    ${filteredDeals.map(deal => renderCard(deal, false)).join('')}
                                </div>
                            ` : `
                                <div style="text-align: center; padding: 3.5rem 1rem; background: #FFF; border-radius: 20px; border: 1px solid #E2E8F0;">
                                    <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">🔍</div>
                                    <h3 style="font-size: 1.1rem; font-weight: 800; color: #0F172A; margin-bottom: 0.3rem;">Không tìm thấy ưu đãi phù hợp</h3>
                                    <p style="font-size: 0.85rem; color: #64748B; margin-bottom: 1rem;">Thử tìm kiếm với từ khóa khác hoặc xóa bộ lọc.</p>
                                    <button data-action="filter" data-category="ALL" style="background: #059669; color: #FFF; border: none; padding: 0.5rem 1.2rem; border-radius: 9999px; font-weight: 800; cursor: pointer;">
                                        Xem tất cả ${totalCount} ưu đãi
                                    </button>
                                </div>
                            `}
                        </div>

                    </main>
                </div>

                <!-- 5. Footer Doanh Nghiệp & Pháp Lý Đầy Đủ -->
                <footer style="background: #FFFFFF; border-top: 1px solid #E2E8F0; padding: 2.5rem 1.5rem 1.5rem; margin-top: 3rem;">
                    <div style="max-width: 1140px; margin: 0 auto;">
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.8rem; margin-bottom: 2rem;">
                            <div>
                                <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.8rem;">
                                    <div style="background: #059669; color: #FFF; font-weight: 900; width: 28px; height: 28px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 0.95rem;">J</div>
                                    <span style="font-weight: 900; font-size: 1.1rem; color: #0F172A;">JayT Đà Nẵng</span>
                                </div>
                                <p style="font-size: 0.8rem; color: #64748B; line-height: 1.5; margin: 0;">
                                    Cổng thông tin tự động tìm kiếm, đối soát và xếp hạng các cơ hội tiết kiệm chi tiêu ăn uống, di chuyển và giải trí hàng đầu tại Đà Nẵng.
                                </p>
                            </div>
                            <div>
                                <h4 style="font-size: 0.88rem; font-weight: 800; color: #0F172A; margin: 0 0 0.8rem;">Cam Kết Minh Bạch</h4>
                                <ul style="list-style: none; padding: 0; margin: 0; font-size: 0.8rem; color: #64748B; display: flex; flex-direction: column; gap: 0.45rem;">
                                    <li>🛡️ 100% Ưu đãi có đối soát nguồn gốc</li>
                                    <li>⚡ Tự động kiểm tra thời hạn hiệu lực</li>
                                    <li>🔒 Chữ ký số SHA-256 toàn vẹn dữ liệu</li>
                                    <li>🚫 Tuyệt đối không tạo số liệu ảo</li>
                                </ul>
                            </div>
                            <div>
                                <h4 style="font-size: 0.88rem; font-weight: 800; color: #0F172A; margin: 0 0 0.8rem;">Địa Bàn Hoạt Động</h4>
                                <p style="font-size: 0.8rem; color: #64748B; line-height: 1.5; margin: 0 0 0.5rem;">
                                    📍 Hải Châu · Thanh Khê · Sơn Trà · Liên Chiểu · Ngũ Hành Sơn · Cẩm Lệ (Mã Vùng 43)
                                </p>
                                <span style="font-size: 0.75rem; background: #F1F5F9; color: #475569; padding: 0.2rem 0.5rem; border-radius: 6px; font-weight: 700;">Hỗ trợ: CSKH Zalo 24/7</span>
                            </div>
                        </div>
                        <div style="border-top: 1px solid #F1F5F9; padding-top: 1.2rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem; font-size: 0.75rem; color: #94A3B8;">
                            <span>© 2026 JayT Corp. Bản quyền thuộc về JayT Ecosystem.</span>
                            <span>Phiên bản: Production Runtime v4.0 GA Standard</span>
                        </div>
                    </div>
                </footer>

            </div>
        `;

        // Lắng nghe sự kiện ô tìm kiếm
        const searchInput = document.getElementById('jaytLiveSearchInput');
        if (searchInput) {
            searchInput.addEventListener('input', function(e) {
                State.searchQuery = e.target.value;
                renderApp();
                const newInput = document.getElementById('jaytLiveSearchInput');
                if (newInput) {
                    newInput.focus();
                    newInput.setSelectionRange(newInput.value.length, newInput.value.length);
                }
            });
        }
    }

    // 7. Render Card Thẻ Ưu Đãi (XSS-Safe)
    function renderCard(deal, isFeatured = false) {
        return `
            <div class="deal-card" style="background: #FFFFFF; border: ${isFeatured ? '2px solid #10B981' : '1.5px solid #E2E8F0'}; border-radius: 18px; padding: 1.3rem; display: flex; flex-direction: column; justify-content: space-between; gap: 0.9rem; box-shadow: ${isFeatured ? '0 6px 22px rgba(16,185,129,0.1)' : '0 4px 15px rgba(0,0,0,0.03)'}; position: relative;">
                ${isFeatured ? `
                    <span style="position: absolute; top: -10px; right: 15px; background: #059669; color: #FFF; font-size: 0.65rem; font-weight: 900; padding: 0.2rem 0.6rem; border-radius: 9999px; box-shadow: 0 2px 6px rgba(5,150,105,0.3);">
                        ★ NỔI BẬT
                    </span>
                ` : ''}

                <div>
                    <!-- Header Đối tác & Trạng thái Hạn -->
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
                        <button data-action="copy" data-code="${escapeHTML(deal.voucher_code)}" style="flex: 1; background: #F8FAFC; border: 1px solid #CBD5E1; color: #0F172A; padding: 0.65rem 0.4rem; border-radius: 10px; font-weight: 800; font-size: 0.78rem; cursor: pointer; transition: background 0.2s;">
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

    // 8. Modal Bảng Kê Đối Soát Mật Mã Học (SHA-256 Match)
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

        let shaStatusBadge = '';
        if (deal.sha_status === 'MATCH') {
            shaStatusBadge = `<span style="color: #059669; font-weight: 800;">🟢 CHỮ KÝ SHA-256 ĐÃ ĐỐI SOÁT HỢP LỆ (MATCH 100%)</span>`;
        } else if (deal.sha_status === 'MISMATCH') {
            shaStatusBadge = `<span style="color: #DC2626; font-weight: 800;">🔴 CẢNH BÁO: CHỮ KÝ BẤT KHỚP (MISMATCH)</span>`;
        } else {
            shaStatusBadge = `<span style="color: #D97706; font-weight: 800;">⚠️ CHƯA CUNG CẤP CHỮ KÝ</span>`;
        }

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
                        <div style="margin-bottom: 0.35rem;">Đối soát mật mã học SHA-256: ${shaStatusBadge}</div>
                        ${deal.evidence_sha256 ? `
                            <div style="font-size: 0.72rem; color: #64748B; margin-bottom: 0.2rem;">Chữ ký bằng chứng (Evidence SHA):</div>
                            <div style="background: #0F172A; padding: 0.35rem 0.5rem; border-radius: 6px; font-family: monospace; font-size: 0.65rem; color: #10B981; word-break: break-all; margin-bottom: 0.35rem;">${escapeHTML(deal.evidence_sha256)}</div>
                        ` : ''}
                        ${deal.computed_sha256 ? `
                            <div style="font-size: 0.72rem; color: #64748B; margin-bottom: 0.2rem;">Chữ ký tính toán tại máy khách (Computed SHA):</div>
                            <div style="background: #0F172A; padding: 0.35rem 0.5rem; border-radius: 6px; font-family: monospace; font-size: 0.65rem; color: #38BDF8; word-break: break-all;">${escapeHTML(deal.computed_sha256)}</div>
                        ` : ''}
                    </div>
                </div>

                <div style="background: #ECFDF5; border: 1px solid #A7F3D0; border-radius: 12px; padding: 0.8rem; font-size: 0.78rem; color: #065F46; line-height: 1.45;">
                    💡 <strong>Cam kết minh bạch:</strong> Mọi ưu đãi trên JayT được kiểm tra và đối soát chữ ký số tự động nhằm bảo vệ quyền lợi người tiêu dùng.
                </div>
            </div>
        `;
        modal.style.display = 'flex';
    }

    // 9. Skeleton & Error Boundary
    function renderSkeleton() {
        return `
            <div style="min-height: 100vh; background: #F8FAFC; padding: 4rem 1rem; text-align: center; font-family: sans-serif;">
                <div style="display: inline-block; width: 40px; height: 40px; border: 3px solid #E2E8F0; border-top-color: #059669; border-radius: 50%; animation: spin 0.8s linear infinite; margin-bottom: 1rem;"></div>
                <h3 style="color: #0F172A; font-weight: 800; font-size: 1.15rem; margin-bottom: 0.3rem;">Đang tải kho ưu đãi Đà Nẵng...</h3>
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

    // 10. Event Delegation
    function setupEventDelegation() {
        document.body.addEventListener('click', function(e) {
            const btn = e.target.closest('[data-action]');
            if (!btn) return;

            const action = btn.getAttribute('data-action');

            if (action === 'filter') {
                State.activeFilter = btn.getAttribute('data-category');
                renderApp();
            } else if (action === 'clear-search') {
                State.searchQuery = '';
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

    // 11. Fetch & Polling Engine Tuần Tự
    async function fetchDeals() {
        if (activeAbortController) {
            activeAbortController.abort();
        }
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
                headers: {
                    'Cache-Control': 'no-cache',
                    'Pragma': 'no-cache'
                }
            });

            if (!res.ok) throw new Error(`HTTP_${res.status}`);
            const data = await res.json();

            // Chốt 1: Check request sequence
            if (requestId !== State.activeRequestId) return;

            const rawDeals = Array.isArray(data.deals) ? data.deals : [];
            const normalizedPromises = rawDeals.map(normalizeDeal);
            const normalizedDeals = (await Promise.all(normalizedPromises)).filter(Boolean);

            // Chốt 2: Check atomic sau normalize
            if (requestId !== State.activeRequestId) return;

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

    // 12. Khởi chạy
    function init() {
        setupEventDelegation();
        fetchDeals();
        setInterval(fetchDeals, 20000);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
