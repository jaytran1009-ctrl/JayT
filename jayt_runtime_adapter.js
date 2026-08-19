/**
 * JAYT APEX v3.1 — INSTANT CLEAN RUNTIME ADAPTER (DIRECTIVE #003.1 HARDENED)
 * =============================================================================
 * TÔN CHỈ: THỰC THI NGAY LẬP TỨC · CHỮ ĐEN ĐẬM #0F172A · 159.000₫ XANH NGỌC
 * =============================================================================
 */

(function() {
    console.log("⚡ JAYT Instant Clean Adapter Fired");

    let allCanonicalDeals = [];

    function formatVND(amount) {
        if (typeof amount !== 'number' || isNaN(amount)) return '0₫';
        return new Intl.NumberFormat('vi-VN').format(amount) + '₫';
    }

    // 1. Dựng Toàn Bộ Giao Diện Sạch Chuẩn 100% Không Lỗi Tràn Viền
    function renderCompleteCleanApp() {
        const totalSavings = allCanonicalDeals.reduce((sum, d) => sum + (d.saving_amount_vnd || 0), 0);
        const displaySavings = totalSavings > 0 ? formatVND(totalSavings) : '159.000₫';

        document.body.innerHTML = `
            <div style="min-height: 100vh; background-color: #F8FAFC; color: #0F172A; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; box-sizing: border-box; padding-bottom: 3rem; margin: 0;">
                
                <!-- 1. Header Thanh Lịch -->
                <header style="background: #FFFFFF; border-bottom: 1px solid #E2E8F0; padding: 0.85rem 1.5rem; position: sticky; top: 0; z-index: 100; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
                    <div style="max-width: 1100px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center;">
                        <div style="display: flex; align-items: center; gap: 0.6rem;">
                            <div style="background: linear-gradient(135deg, #059669, #10B981); color: #FFF; font-weight: 900; font-size: 1.25rem; width: 36px; height: 36px; border-radius: 10px; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 6px rgba(5,150,105,0.3);">J</div>
                            <div>
                                <span style="font-size: 1.25rem; font-weight: 900; color: #0F172A; letter-spacing: -0.02em;">JayT</span>
                                <span style="font-size: 0.72rem; color: #D97706; font-weight: 800; margin-left: 0.3rem;">ĐÀ NẴNG 43</span>
                            </div>
                        </div>
                        <span style="font-size: 0.75rem; background: #FEF3C7; color: #92400E; border: 1px solid #FCD34D; padding: 0.25rem 0.65rem; border-radius: 9999px; font-weight: 800;">
                            🟡 KIỂM THỬ NỘI BỘ
                        </span>
                    </div>
                </header>

                <!-- 2. Main Container -->
                <main style="max-width: 1100px; margin: 0 auto; padding: 1.5rem 1rem; width: 100%; box-sizing: border-box;">
                    
                    <!-- Hero Lợi Ích 3 Giây -->
                    <div style="background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 20px; padding: 1.8rem 1.2rem; text-align: center; margin-bottom: 1.8rem; box-shadow: 0 4px 20px rgba(0,0,0,0.04);">
                        <div style="display: inline-flex; align-items: center; gap: 0.4rem; background: #ECFDF5; border: 1px solid #A7F3D0; padding: 0.25rem 0.8rem; border-radius: 9999px; font-size: 0.76rem; font-weight: 800; color: #065F46; margin-bottom: 0.6rem;">
                            ✨ ƯU ĐÃI ĐÃ ĐỐI SOÁT HÔM NAY
                        </div>
                        
                        <h1 style="font-size: clamp(1.6rem, 3.5vw, 2.4rem); font-weight: 900; color: #0F172A; line-height: 1.2; margin: 0 0 0.4rem;">
                            Hôm nay bạn có thể tiết kiệm đến <br>
                            <span style="color: #059669; font-size: clamp(2.2rem, 4.8vw, 3rem); font-weight: 900;">${displaySavings}</span>
                        </h1>
                        
                        <p style="font-size: 0.95rem; color: #64748B; margin: 0 auto 1.2rem; max-width: 540px; line-height: 1.45;">
                            Ăn gì • Uống gì • Đi đâu — JayT lọc sẵn những ưu đãi đáng tiền nhất cho bạn.
                        </p>

                        <!-- 5 Nút Lọc Nhu Cầu 1-Chạm -->
                        <div style="display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap; margin-bottom: 0.85rem;">
                            <button onclick="window.filterDeals('ALL', this)" class="filter-btn" style="background: #059669; color: #FFF; border: none; padding: 0.5rem 1.1rem; border-radius: 9999px; font-weight: 800; font-size: 0.82rem; cursor: pointer; box-shadow: 0 2px 8px rgba(5,150,105,0.25);">
                                ✨ Tất cả (6)
                            </button>
                            <button onclick="window.filterDeals('FOOD', this)" class="filter-btn" style="background: #F1F5F9; color: #1E293B; border: 1px solid #CBD5E1; padding: 0.5rem 1.1rem; border-radius: 9999px; font-weight: 700; font-size: 0.82rem; cursor: pointer;">
                                🍜 Ăn Trưa/Tối
                            </button>
                            <button onclick="window.filterDeals('DRINK', this)" class="filter-btn" style="background: #F1F5F9; color: #1E293B; border: 1px solid #CBD5E1; padding: 0.5rem 1.1rem; border-radius: 9999px; font-weight: 700; font-size: 0.82rem; cursor: pointer;">
                                ☕ Trà Sữa/Cafe
                            </button>
                            <button onclick="window.filterDeals('RIDE', this)" class="filter-btn" style="background: #F1F5F9; color: #1E293B; border: 1px solid #CBD5E1; padding: 0.5rem 1.1rem; border-radius: 9999px; font-weight: 700; font-size: 0.82rem; cursor: pointer;">
                                🚗 Xe Điện 0Đ
                            </button>
                            <button onclick="window.filterDeals('STUDENT', this)" class="filter-btn" style="background: #F1F5F9; color: #1E293B; border: 1px solid #CBD5E1; padding: 0.5rem 1.1rem; border-radius: 9999px; font-weight: 700; font-size: 0.82rem; cursor: pointer;">
                                🎓 Sinh Viên
                            </button>
                        </div>

                        <div style="font-size: 0.76rem; color: #64748B; background: #F8FAFC; border: 1px solid #E2E8F0; padding: 0.35rem 0.85rem; border-radius: 8px; display: inline-block;">
                            ⚡ Dữ liệu kiểm thử nội bộ · Kho ưu đãi làm mới hàng ngày lúc 07:00 & 11:30
                        </div>
                    </div>

                    <!-- Deal Grid 3 Cột Chuẩn Mực -->
                    <div id="cleanDealGrid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(310px, 1fr)); gap: 1.25rem; width: 100%;">
                        <!-- Dynamic Deal Cards Injected Here -->
                    </div>

                </main>
            </div>
        `;

        renderCards(allCanonicalDeals);
    }

    // 2. Render Deal Cards Chuẩn
    function renderCards(deals) {
        const grid = document.getElementById('cleanDealGrid');
        if (!grid) return;

        grid.innerHTML = '';
        deals.forEach(deal => {
            const card = document.createElement('div');
            card.style.cssText = `
                background: #FFFFFF;
                border: 1.5px solid #E2E8F0;
                border-radius: 18px;
                padding: 1.3rem;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                gap: 0.9rem;
                box-shadow: 0 4px 15px rgba(0,0,0,0.04);
            `;

            const validDate = deal.valid_until ? deal.valid_until.split('T')[0] : '31/08/2026';

            card.innerHTML = `
                <div>
                    <!-- Header Quán -->
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.6rem;">
                        <span style="font-size: 0.85rem; font-weight: 800; color: #D97706; letter-spacing: 0.02em;">[${deal.merchant_name}]</span>
                        <span style="font-size: 0.68rem; background: #FEF3C7; color: #92400E; border: 1px solid #FCD34D; padding: 0.15rem 0.45rem; border-radius: 6px; font-weight: 800;">🟡 KIỂM THỬ NỘI BỘ</span>
                    </div>

                    <!-- Khối TIẾT KIỆM Lớn Nhất -->
                    <div style="background: linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%); border: 1.5px solid #10B981; border-radius: 14px; padding: 0.8rem 0.9rem; margin-bottom: 0.8rem; text-align: center;">
                        <div style="font-size: 1.35rem; font-weight: 900; color: #047857; letter-spacing: -0.01em; line-height: 1.15;">
                            💰 TIẾT KIỆM ${formatVND(deal.saving_amount_vnd)}
                        </div>
                        <div style="font-size: 0.78rem; font-weight: 700; color: #065F46; margin-top: 0.2rem;">
                            Giảm ${Math.round(deal.saving_percentage || 0)}% · Chỉ còn ${formatVND(deal.discount_price_vnd)} <span style="color: #64748B; text-decoration: line-through; font-weight: normal; margin-left: 0.3rem;">${formatVND(deal.original_price_vnd)}</span>
                        </div>
                    </div>

                    <!-- Tên món & Địa chỉ -->
                    <h4 style="font-size: 1.05rem; font-weight: 800; color: #0F172A; line-height: 1.3; margin: 0 0 0.35rem;">${deal.item_name}</h4>
                    <p style="font-size: 0.78rem; color: #64748B; margin: 0 0 0.75rem;">📍 ${deal.branch_address || 'Đà Nẵng'} · ${deal.source_channel}</p>

                    <!-- Nguồn & Hạn -->
                    <div style="font-size: 0.74rem; color: #64748B; display: flex; justify-content: space-between; margin-bottom: 0.25rem;">
                        <span>Nguồn: <strong style="color: #334155;">${deal.source_channel}</strong></span>
                        <span>Hạn: <strong style="color: #0F172A;">${validDate}</strong></span>
                    </div>
                </div>

                <div>
                    <!-- Nút Hành Động -->
                    <div style="display: flex; gap: 0.5rem; margin-bottom: 0.55rem;">
                        <button onclick="navigator.clipboard.writeText('${deal.voucher_code}'); alert('Đã sao chép mã: ${deal.voucher_code}');" style="flex: 1; background: #F8FAFC; border: 1px solid #CBD5E1; color: #0F172A; padding: 0.65rem 0.4rem; border-radius: 10px; font-weight: 800; font-size: 0.78rem; cursor: pointer;">
                            📋 ${deal.voucher_code}
                        </button>
                        <a href="${deal.deep_link}" target="_blank" style="flex: 1.3; background: linear-gradient(135deg, #059669 0%, #047857 100%); color: #FFFFFF; padding: 0.65rem 0.4rem; border-radius: 10px; font-weight: 800; font-size: 0.82rem; text-align: center; text-decoration: none; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(5,150,105,0.25);">
                            SĂN NGAY ➔
                        </a>
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });
    }

    // 3. Bộ Lọc
    window.filterDeals = function(intent, btn) {
        document.querySelectorAll('.filter-btn').forEach(b => {
            b.style.background = '#F1F5F9';
            b.style.color = '#1E293B';
            b.style.border = '1px solid #CBD5E1';
            b.style.boxShadow = 'none';
        });
        if (btn) {
            btn.style.background = '#059669';
            btn.style.color = '#FFFFFF';
            btn.style.border = 'none';
            btn.style.boxShadow = '0 2px 8px rgba(5,150,105,0.25)';
        }

        let filtered = allCanonicalDeals;
        if (intent === 'FOOD') {
            filtered = allCanonicalDeals.filter(d => d.deal_id === 'DNG-01' || d.deal_id === 'DNG-02' || d.deal_id === 'DNG-05');
        } else if (intent === 'DRINK') {
            filtered = allCanonicalDeals.filter(d => d.deal_id === 'DNG-03' || d.deal_id === 'DNG-04');
        } else if (intent === 'RIDE') {
            filtered = allCanonicalDeals.filter(d => d.deal_id === 'DNG-06');
        } else if (intent === 'STUDENT') {
            filtered = allCanonicalDeals.filter(d => d.target_icp === 'STUDENT' || d.target_icp === 'STUDENT_OFFICE');
        }

        renderCards(filtered);
    };

    // 4. Khởi chạy ngay lập tức
    function init() {
        fetch('/api/deals')
            .then(res => res.json())
            .then(data => {
                allCanonicalDeals = data.deals || [];
                renderCompleteCleanApp();
            })
            .catch(err => {
                console.warn("⚠️ API error:", err);
            });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
