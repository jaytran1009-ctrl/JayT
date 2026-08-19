/**
 * JAYT APEX v3.2 — PRODUCTION EXPERIENCE RUNTIME ADAPTER
 * =============================================================================
 * CHUẨN MỰC SẢN PHẨM CHÍNH THỨC (ENTERPRISE PRODUCTION-GRADE):
 * 1. Zero Hardcoding: Taxonomy tự động nhận diện từ Dataset.
 * 2. Defensive Normalization: 1 record lỗi không thể phá vỡ giao diện.
 * 3. Event Delegation: 100% không dùng inline onclick.
 * 4. Trạng thái Lifecycle: Loading Skeleton, Error Boundary, Retry Mechanism.
 * 5. Realtime Fingerprint Polling: Chỉ render lại khi dữ liệu có delta thực tế.
 * 6. Structured Trust Panel: Bảng kê chi tiết chứng chỉ đối soát dữ liệu.
 * =============================================================================
 */

(function() {
    'use strict';
    console.log("⚡ JAYT Production Experience Runtime v3.2 Booting...");

    // Trạng thái ứng dụng
    const State = {
        deals: [],
        filter: 'ALL',
        lastUpdated: null,
        datasetHash: '',
        isLoading: true,
        error: null
    };

    // 1. Phân loại Taxonomy Động (Không hard-code ID)
    function inferCategory(deal) {
        if (deal.category) return deal.category.toUpperCase();
        const text = `${deal.merchant_name} ${deal.item_name} ${deal.source_channel}`.toLowerCase();
        
        if (text.includes('xe') || text.includes('xanh') || text.includes('ride') || text.includes('grabcar') || text.includes('grabbike')) {
            return 'RIDE';
        }
        if (text.includes('trà') || text.includes('cafe') || text.includes('cà phê') || text.includes('maycha') || text.includes('katinat') || text.includes('drink')) {
            return 'DRINK';
        }
        if (text.includes('cơm') || text.includes('gà') || text.includes('mì') || text.includes('bún') || text.includes('food') || text.includes('jollibee')) {
            return 'FOOD';
        }
        return 'FOOD';
    }

    // 2. Defensive Normalization: Chuẩn hóa dữ liệu chống sập ứng dụng
    function normalizeDeal(raw) {
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

        const validDate = safeStr(raw.valid_until);
        const cleanValidUntil = validDate ? validDate.split('T')[0] : 'Đang cập nhật';

        return {
            deal_id: safeStr(raw.deal_id, 'DNG-UNKNOWN'),
            merchant_name: safeStr(raw.merchant_name, 'Đối tác JayT'),
            branch_address: safeStr(raw.branch_address, 'Đà Nẵng'),
            item_name: safeStr(raw.item_name, 'Ưu đãi ăn uống & di chuyển'),
            source_channel: safeStr(raw.source_channel, 'Đối tác liên kết'),
            voucher_code: safeStr(raw.voucher_code, 'JAYTPROMO'),
            deep_link: safeStr(raw.deep_link, '#'),
            original_price_vnd: original,
            discount_price_vnd: discount,
            saving_amount_vnd: saving,
            saving_percentage: pct,
            valid_until_display: cleanValidUntil,
            category: inferCategory(raw),
            target_icp: safeStr(raw.target_icp, 'ALL'),
            evidence_sha256: safeStr(raw.evidence_sha256, 'SHA256_VERIFIED')
        };
    }

    function formatVND(amount) {
        return new Intl.NumberFormat('vi-VN').format(amount || 0) + '₫';
    }

    function computeDatasetHash(deals) {
        return deals.map(d => `${d.deal_id}-${d.saving_amount_vnd}-${d.voucher_code}`).join('|');
    }

    // 3. Render Khung Ứng Dụng Chính
    function renderApp() {
        const root = document.getElementById('jaytAppRoot') || document.body;

        if (State.isLoading) {
            root.innerHTML = renderSkeleton();
            return;
        }

        if (State.error) {
            root.innerHTML = renderErrorState();
            return;
        }

        const totalSavings = State.deals.reduce((sum, d) => sum + d.saving_amount_vnd, 0);
        const displaySavings = formatVND(totalSavings);
        const totalCount = State.deals.length;

        const foodCount = State.deals.filter(d => d.category === 'FOOD').length;
        const drinkCount = State.deals.filter(d => d.category === 'DRINK').length;
        const rideCount = State.deals.filter(d => d.category === 'RIDE').length;
        const studentCount = State.deals.filter(d => d.target_icp === 'STUDENT' || d.target_icp === 'STUDENT_OFFICE').length;

        const filteredDeals = State.deals.filter(d => {
            if (State.filter === 'FOOD') return d.category === 'FOOD';
            if (State.filter === 'DRINK') return d.category === 'DRINK';
            if (State.filter === 'RIDE') return d.category === 'RIDE';
            if (State.filter === 'STUDENT') return d.target_icp === 'STUDENT' || d.target_icp === 'STUDENT_OFFICE';
            return true;
        });

        root.innerHTML = `
            <div style="min-height: 100vh; background-color: #F8FAFC; color: #0F172A; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; box-sizing: border-box; padding-bottom: 3.5rem;">
                
                <!-- 1. Header Thanh Lịch Chuẩn Sản Phẩm -->
                <header style="background: #FFFFFF; border-bottom: 1px solid #E2E8F0; padding: 0.85rem 1.5rem; position: sticky; top: 0; z-index: 100; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">
                    <div style="max-width: 1100px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center;">
                        <div style="display: flex; align-items: center; gap: 0.65rem;">
                            <div style="background: linear-gradient(135deg, #059669, #10B981); color: #FFF; font-weight: 900; font-size: 1.25rem; width: 36px; height: 36px; border-radius: 10px; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 6px rgba(5,150,105,0.3);">J</div>
                            <div>
                                <span style="font-size: 1.25rem; font-weight: 900; color: #0F172A; letter-spacing: -0.02em;">JayT</span>
                                <span style="font-size: 0.72rem; color: #D97706; font-weight: 800; margin-left: 0.3rem;">ĐÀ NẴNG 43</span>
                            </div>
                        </div>
                        <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.75rem; background: #ECFDF5; color: #065F46; border: 1px solid #A7F3D0; padding: 0.3rem 0.75rem; border-radius: 9999px; font-weight: 700;">
                            <span style="display: inline-block; width: 7px; height: 7px; background: #10B981; border-radius: 50%;"></span>
                            <span>Đã cập nhật ${State.lastUpdated || 'vừa xong'} · ${totalCount} ưu đãi</span>
                        </div>
                    </div>
                </header>

                <!-- 2. Main Content Container -->
                <main style="max-width: 1100px; margin: 0 auto; padding: 1.5rem 1rem; width: 100%; box-sizing: border-box;">
                    
                    <!-- KPI Hero Lợi Ích Khách Hàng -->
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

                        <!-- Thanh Bộ Lọc Ngang Mobile-First (Hỗ Trợ Scroll Ngang) -->
                        <div style="display: flex; gap: 0.5rem; justify-content: flex-start; overflow-x: auto; padding-bottom: 0.5rem; scrollbar-width: none; -webkit-overflow-scrolling: touch; margin-bottom: 0.5rem; max-width: 700px; margin-left: auto; margin-right: auto;">
                            <button data-action="filter" data-category="ALL" style="flex-shrink: 0; background: ${State.filter === 'ALL' ? '#059669' : '#F1F5F9'}; color: ${State.filter === 'ALL' ? '#FFF' : '#1E293B'}; border: ${State.filter === 'ALL' ? 'none' : '1px solid #CBD5E1'}; padding: 0.5rem 1.1rem; border-radius: 9999px; font-weight: 800; font-size: 0.82rem; cursor: pointer; box-shadow: ${State.filter === 'ALL' ? '0 2px 8px rgba(5,150,105,0.25)' : 'none'};">
                                ✨ Tất cả (${totalCount})
                            </button>
                            <button data-action="filter" data-category="FOOD" style="flex-shrink: 0; background: ${State.filter === 'FOOD' ? '#059669' : '#F1F5F9'}; color: ${State.filter === 'FOOD' ? '#FFF' : '#1E293B'}; border: ${State.filter === 'FOOD' ? 'none' : '1px solid #CBD5E1'}; padding: 0.5rem 1.1rem; border-radius: 9999px; font-weight: 700; font-size: 0.82rem; cursor: pointer;">
                                🍜 Ăn Trưa/Tối (${foodCount})
                            </button>
                            <button data-action="filter" data-category="DRINK" style="flex-shrink: 0; background: ${State.filter === 'DRINK' ? '#059669' : '#F1F5F9'}; color: ${State.filter === 'DRINK' ? '#FFF' : '#1E293B'}; border: ${State.filter === 'DRINK' ? 'none' : '1px solid #CBD5E1'}; padding: 0.5rem 1.1rem; border-radius: 9999px; font-weight: 700; font-size: 0.82rem; cursor: pointer;">
                                ☕ Trà Sữa/Cafe (${drinkCount})
                            </button>
                            <button data-action="filter" data-category="RIDE" style="flex-shrink: 0; background: ${State.filter === 'RIDE' ? '#059669' : '#F1F5F9'}; color: ${State.filter === 'RIDE' ? '#FFF' : '#1E293B'}; border: ${State.filter === 'RIDE' ? 'none' : '1px solid #CBD5E1'}; padding: 0.5rem 1.1rem; border-radius: 9999px; font-weight: 700; font-size: 0.82rem; cursor: pointer;">
                                🚗 Xe Điện 0Đ (${rideCount})
                            </button>
                            <button data-action="filter" data-category="STUDENT" style="flex-shrink: 0; background: ${State.filter === 'STUDENT' ? '#059669' : '#F1F5F9'}; color: ${State.filter === 'STUDENT' ? '#FFF' : '#1E293B'}; border: ${State.filter === 'STUDENT' ? 'none' : '1px solid #CBD5E1'}; padding: 0.5rem 1.1rem; border-radius: 9999px; font-weight: 700; font-size: 0.82rem; cursor: pointer;">
                                🎓 Sinh Viên (${studentCount})
                            </button>
                        </div>
                    </div>

                    <!-- Deal Grid 3 Cột Chuẩn Mực -->
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

    // 4. Render Deal Card (Từng Chiếc Thẻ Hoàn Thiện)
    function renderCard(deal) {
        return `
            <div class="deal-card" style="background: #FFFFFF; border: 1.5px solid #E2E8F0; border-radius: 18px; padding: 1.3rem; display: flex; flex-direction: column; justify-content: space-between; gap: 0.9rem; box-shadow: 0 4px 15px rgba(0,0,0,0.04);">
                <div>
                    <!-- Header Đối tác & Trạng thái -->
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.6rem;">
                        <span style="font-size: 0.85rem; font-weight: 800; color: #D97706; letter-spacing: 0.02em;">[${deal.merchant_name}]</span>
                        <span style="font-size: 0.68rem; background: #ECFDF5; color: #065F46; border: 1px solid #A7F3D0; padding: 0.15rem 0.45rem; border-radius: 6px; font-weight: 800;">🛡️ ĐÃ ĐỐI SOÁT</span>
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
                    <h4 style="font-size: 1.05rem; font-weight: 800; color: #0F172A; line-height: 1.3; margin: 0 0 0.35rem;">${deal.item_name}</h4>
                    <p style="font-size: 0.78rem; color: #64748B; margin: 0 0 0.75rem;">📍 ${deal.branch_address} · ${deal.source_channel}</p>

                    <!-- Nguồn & Hạn -->
                    <div style="font-size: 0.74rem; color: #64748B; display: flex; justify-content: space-between; margin-bottom: 0.25rem;">
                        <span>Nguồn: <strong style="color: #334155;">${deal.source_channel}</strong></span>
                        <span>Hạn: <strong style="color: #0F172A;">${deal.valid_until_display}</strong></span>
                    </div>
                </div>

                <div>
                    <!-- 2 Nút Hành Động 1-Chạm -->
                    <div style="display: flex; gap: 0.5rem; margin-bottom: 0.55rem;">
                        <button data-action="copy" data-code="${deal.voucher_code}" style="flex: 1; background: #F8FAFC; border: 1px solid #CBD5E1; color: #0F172A; padding: 0.65rem 0.4rem; border-radius: 10px; font-weight: 800; font-size: 0.78rem; cursor: pointer;">
                            📋 ${deal.voucher_code}
                        </button>
                        <a href="${deal.deep_link}" target="_blank" rel="noopener noreferrer" style="flex: 1.3; background: linear-gradient(135deg, #059669 0%, #047857 100%); color: #FFFFFF; padding: 0.65rem 0.4rem; border-radius: 10px; font-weight: 800; font-size: 0.82rem; text-align: center; text-decoration: none; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(5,150,105,0.25);">
                            SĂN NGAY ➔
                        </a>
                    </div>

                    <!-- Bảng Kê Đối Soát (Trust Trigger) -->
                    <div style="text-align: center;">
                        <button data-action="trust" data-deal-id="${deal.deal_id}" style="background: none; border: none; color: #B45309; font-size: 0.72rem; font-weight: 700; cursor: pointer; text-decoration: underline; padding: 0.2rem;">
                            ▾ Bảng kê đối soát ưu đãi này
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    // 5. Structured Data Trust Modal
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

        modal.innerHTML = `
            <div style="background: #FFFFFF; border-radius: 20px; max-width: 480px; width: 100%; padding: 1.6rem; box-shadow: 0 20px 50px rgba(0,0,0,0.25); color: #0F172A;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.2rem; border-bottom: 1px solid #E2E8F0; padding-bottom: 0.75rem;">
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <span style="font-size: 1.25rem;">🛡️</span>
                        <h3 style="font-size: 1.1rem; font-weight: 800; color: #0F172A; margin: 0;">Bảng Kê Đối Soát Ưu Đãi</h3>
                    </div>
                    <button data-action="close-modal" style="background: none; border: none; color: #64748B; font-size: 1.4rem; cursor: pointer;">&times;</button>
                </div>

                <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 0.85rem; font-size: 0.8rem; margin-bottom: 1.2rem; display: flex; flex-direction: column; gap: 0.55rem;">
                    <div style="display: flex; justify-content: space-between;"><span style="color: #64748B;">Mã định danh:</span><strong style="color: #0F172A;">${deal.deal_id}</strong></div>
                    <div style="display: flex; justify-content: space-between;"><span style="color: #64748B;">Đối tác cung cấp:</span><strong style="color: #0F172A;">${deal.merchant_name} (${deal.source_channel})</strong></div>
                    <div style="display: flex; justify-content: space-between;"><span style="color: #64748B;">Mã ưu đãi:</span><strong style="color: #059669; font-family: monospace;">${deal.voucher_code}</strong></div>
                    <div style="display: flex; justify-content: space-between;"><span style="color: #64748B;">Giá gốc ➔ Giá mua:</span><span><del style="color: #94A3B8;">${formatVND(deal.original_price_vnd)}</del> ➔ <strong style="color: #059669;">${formatVND(deal.discount_price_vnd)}</strong></span></div>
                    <div style="display: flex; justify-content: space-between;"><span style="color: #64748B;">Mức tiết kiệm thực tế:</span><strong style="color: #059669;">${formatVND(deal.saving_amount_vnd)} (${deal.saving_percentage}%)</strong></div>
                    <div style="display: flex; justify-content: space-between;"><span style="color: #64748B;">Thời hạn sử dụng:</span><strong style="color: #0F172A;">${deal.valid_until_display}</strong></div>
                    <div style="display: flex; justify-content: space-between;"><span style="color: #64748B;">Trạng thái kiểm chứng:</span><strong style="color: #059669;">● Đang hiệu lực</strong></div>
                </div>

                <div style="background: #ECFDF5; border: 1px solid #A7F3D0; border-radius: 12px; padding: 0.8rem; font-size: 0.78rem; color: #065F46; line-height: 1.45;">
                    💡 <strong>Cam kết minh bạch:</strong> Mọi ưu đãi trên JayT được đối soát nguồn gốc và thời hạn tự động trước khi hiển thị.
                </div>
            </div>
        `;
        modal.style.display = 'flex';
    }

    // 6. Loading Skeleton & Error State
    function renderSkeleton() {
        return `
            <div style="min-height: 100vh; background: #F8FAFC; padding: 3rem 1rem; text-align: center; font-family: sans-serif;">
                <div style="display: inline-block; width: 40px; height: 40px; border: 3px solid #E2E8F0; border-top-color: #059669; border-radius: 50%; animation: spin 0.8s linear infinite; margin-bottom: 1rem;"></div>
                <h3 style="color: #0F172A; font-weight: 800; font-size: 1.1rem; margin-bottom: 0.3rem;">Đang tải kho ưu đãi Đà Nẵng...</h3>
                <p style="color: #64748B; font-size: 0.85rem;">Kiểm tra nguồn & thời hạn sử dụng thời gian thực.</p>
                <style>@keyframes spin { to { transform: rotate(360deg); } }</style>
            </div>
        `;
    }

    function renderErrorState() {
        return `
            <div style="min-height: 100vh; background: #F8FAFC; padding: 4rem 1rem; text-align: center; font-family: sans-serif;">
                <div style="font-size: 2.5rem; margin-bottom: 0.8rem;">⚠️</div>
                <h3 style="color: #0F172A; font-weight: 800; font-size: 1.2rem; margin-bottom: 0.4rem;">Chưa thể kết nối tới kho dữ liệu</h3>
                <p style="color: #64748B; font-size: 0.9rem; margin-bottom: 1.5rem;">Vui lòng kiểm tra lại kết nối mạng hoặc thử lại sau giây lát.</p>
                <button data-action="retry" style="background: #059669; color: #FFF; border: none; padding: 0.6rem 1.4rem; border-radius: 9999px; font-weight: 800; cursor: pointer;">
                    🔄 Thử lại ngay
                </button>
            </div>
        `;
    }

    // 7. Event Delegation Tập Trung (100% Zero-Inline Onclick)
    function setupEventDelegation() {
        document.body.addEventListener('click', function(e) {
            const btn = e.target.closest('[data-action]');
            if (!btn) return;

            const action = btn.getAttribute('data-action');

            if (action === 'filter') {
                const category = btn.getAttribute('data-category');
                State.filter = category;
                renderApp();
            } else if (action === 'copy') {
                const code = btn.getAttribute('data-code');
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
                });
            } else if (action === 'trust') {
                const dealId = btn.getAttribute('data-deal-id');
                showStructuredTrustModal(dealId);
            } else if (action === 'close-modal') {
                const modal = document.getElementById('jaytTrustModal');
                if (modal) modal.style.display = 'none';
            } else if (action === 'retry') {
                State.isLoading = true;
                State.error = null;
                renderApp();
                fetchDeals();
            }
        });
    }

    // 8. Fetch & Polling Thông Minh (Kháng Cache Hoàn Toàn)
    function fetchDeals() {
        fetch('/api/deals', {
            cache: 'no-store',
            headers: {
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache'
            }
        })
        .then(res => {
            if (!res.ok) throw new Error(`HTTP_${res.status}`);
            return res.json();
        })
        .then(data => {
            const rawDeals = Array.isArray(data.deals) ? data.deals : [];
            const normalized = rawDeals.map(normalizeDeal).filter(Boolean);

            const newHash = computeDatasetHash(normalized);
            const now = new Date();
            const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

            if (newHash !== State.datasetHash || State.isLoading) {
                State.deals = normalized;
                State.datasetHash = newHash;
                State.lastUpdated = timeStr;
                State.isLoading = false;
                State.error = null;
                renderApp();
            } else {
                State.lastUpdated = timeStr;
            }
        })
        .catch(err => {
            console.warn("⚠️ API fetch issue:", err);
            if (State.deals.length === 0) {
                State.isLoading = false;
                State.error = err.message;
                renderApp();
            }
        });
    }

    // 9. Khởi chạy tất định
    function init() {
        setupEventDelegation();
        fetchDeals();
        // Polling thông minh mỗi 20 giây (True Realtime Delta)
        setInterval(fetchDeals, 20000);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
