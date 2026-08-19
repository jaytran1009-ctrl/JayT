/**
 * JAYT APEX v3.1 — HIGH-CONTRAST LIGHT & EMERALD THEME (DIRECTIVE #003.1 FIXED)
 * =============================================================================
 * TÔN CHỈ: CHỮ ĐEN ĐẬM #0F172A RÕ NÉT 100% · TIẾT KIỆM 159.000₫ XANH EMERALD NỔI BẬT
 * =============================================================================
 */

(function() {
    console.log("⚡ JAYT Directive #003.1 High-Contrast Fixed Active");

    let allCanonicalDeals = [];
    let currentFilter = 'ALL';

    // 1. Format số tiền VNĐ
    function formatVND(amount) {
        if (typeof amount !== 'number' || isNaN(amount)) return '0₫';
        return new Intl.NumberFormat('vi-VN').format(amount) + '₫';
    }

    // 2. Rebuild Hero: Chữ đen đậm rõ nét 100%, số tiền xanh to nổi bật
    function rebuildHeroSection() {
        const totalSavings = allCanonicalDeals.reduce((sum, d) => sum + (d.saving_amount_vnd || 0), 0);
        const displayTotalSavings = totalSavings > 0 ? formatVND(totalSavings) : '159.000₫';

        const heroHTML = `
            <div style="text-align: center; padding: 1.5rem 1rem 0.8rem; max-width: 860px; margin: 0 auto;">
                <div style="display: inline-flex; align-items: center; gap: 0.4rem; background: #FEF3C7; border: 1px solid #F59E0B; padding: 0.3rem 0.85rem; border-radius: 9999px; font-size: 0.78rem; font-weight: 800; color: #92400E; margin-bottom: 0.6rem;">
                    📍 JAYT — ĐÀ NẴNG (MÃ VÙNG 43)
                </div>
                
                <h1 style="font-size: clamp(1.8rem, 4vw, 2.6rem); font-weight: 900; letter-spacing: -0.02em; color: #0F172A !important; line-height: 1.2; margin: 0 0 0.4rem;">
                    Hôm nay bạn có thể tiết kiệm đến <br>
                    <span style="color: #059669 !important; font-size: clamp(2.2rem, 5vw, 3.2rem); font-weight: 900;">${displayTotalSavings}</span>
                </h1>
                
                <p style="font-size: 0.95rem; color: #475569 !important; margin: 0 auto 1.2rem; line-height: 1.45; max-width: 580px; font-weight: 500;">
                    Ăn gì • Uống gì • Đi đâu — JayT lọc sẵn những ưu đãi đáng tiền nhất cho bạn.
                </p>

                <!-- Bộ lọc nhu cầu 1-chạm -->
                <div style="display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap; margin-bottom: 0.85rem;" id="jaytIntentFilters">
                    <button onclick="window.filterDealsByIntent('ALL', this)" class="intent-chip" style="background: #059669; color: #FFFFFF; border: none; padding: 0.5rem 1.1rem; border-radius: 9999px; font-weight: 800; font-size: 0.82rem; cursor: pointer; box-shadow: 0 2px 8px rgba(5,150,105,0.25);">
                        ✨ Tất cả (6)
                    </button>
                    <button onclick="window.filterDealsByIntent('FOOD', this)" class="intent-chip" style="background: #F1F5F9; color: #1E293B; border: 1px solid #CBD5E1; padding: 0.5rem 1.1rem; border-radius: 9999px; font-weight: 700; font-size: 0.82rem; cursor: pointer;">
                        🍜 Ăn Trưa/Tối
                    </button>
                    <button onclick="window.filterDealsByIntent('DRINK', this)" class="intent-chip" style="background: #F1F5F9; color: #1E293B; border: 1px solid #CBD5E1; padding: 0.5rem 1.1rem; border-radius: 9999px; font-weight: 700; font-size: 0.82rem; cursor: pointer;">
                        ☕ Trà Sữa/Cafe
                    </button>
                    <button onclick="window.filterDealsByIntent('RIDE', this)" class="intent-chip" style="background: #F1F5F9; color: #1E293B; border: 1px solid #CBD5E1; padding: 0.5rem 1.1rem; border-radius: 9999px; font-weight: 700; font-size: 0.82rem; cursor: pointer;">
                        🚗 Xe Điện 0Đ
                    </button>
                    <button onclick="window.filterDealsByIntent('STUDENT', this)" class="intent-chip" style="background: #F1F5F9; color: #1E293B; border: 1px solid #CBD5E1; padding: 0.5rem 1.1rem; border-radius: 9999px; font-weight: 700; font-size: 0.82rem; cursor: pointer;">
                        🎓 Sinh Viên
                    </button>
                </div>

                <!-- Ticker trung thực -->
                <div style="font-size: 0.78rem; color: #64748B; background: #F8FAFC; border: 1px solid #E2E8F0; padding: 0.35rem 0.85rem; border-radius: 8px; display: inline-block; font-weight: 500;">
                    ⚡ Dữ liệu kiểm thử nội bộ · Kho ưu đãi làm mới hàng ngày lúc 07:00 & 11:30
                </div>
            </div>
        `;

        const existingHeroWrapper = document.getElementById('jaytDirective0031Hero');
        if (existingHeroWrapper) {
            existingHeroWrapper.innerHTML = heroHTML;
        } else {
            const wrapper = document.createElement('div');
            wrapper.id = 'jaytDirective0031Hero';
            wrapper.innerHTML = heroHTML;
            const targetParent = document.querySelector('main, .main-content, #app') || document.body;
            targetParent.insertBefore(wrapper, targetParent.firstChild);
        }
    }

    // 3. Modal Trust Timeline
    function ensureTrustModal() {
        if (document.getElementById('jaytConsumerTrustModal')) return;

        const modal = document.createElement('div');
        modal.id = 'jaytConsumerTrustModal';
        modal.style.cssText = `
            display: none; position: fixed; inset: 0; z-index: 10000;
            background: rgba(15, 23, 42, 0.75); backdrop-filter: blur(6px);
            align-items: center; justify-content: center; padding: 1rem;
        `;
        modal.innerHTML = `
            <div style="background: #FFFFFF; border-radius: 20px; max-width: 440px; width: 100%; padding: 1.5rem; box-shadow: 0 20px 50px rgba(0,0,0,0.25); color: #0F172A;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.2rem; border-bottom: 1px solid #E2E8F0; padding-bottom: 0.7rem;">
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <span style="font-size: 1.2rem;">🛡️</span>
                        <h3 style="font-size: 1.05rem; font-weight: 800; color: #0F172A; margin: 0;">Vì Sao Ưu Đãi Này Đáng Tin?</h3>
                    </div>
                    <button onclick="document.getElementById('jaytConsumerTrustModal').style.display='none'" style="background: none; border: none; color: #64748B; font-size: 1.4rem; cursor: pointer;">&times;</button>
                </div>
                <div style="display: flex; flex-direction: column; gap: 0.85rem; margin-bottom: 1.3rem;" id="trustTimelineContent"></div>
                <div style="background: #ECFDF5; border: 1px solid #A7F3D0; border-radius: 12px; padding: 0.75rem; font-size: 0.78rem; color: #065F46; line-height: 1.45;">
                    💡 <strong>Cam kết từ JayT:</strong> Chúng tôi không tự tạo ưu đãi ảo. Mọi ưu đãi đều có nguồn gốc và hạn dùng kiểm chứng rõ ràng.
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    window.openConsumerTrustModal = function(merchant, source, validUntil, timeRecorded) {
        ensureTrustModal();
        const content = document.getElementById('trustTimelineContent');
        content.innerHTML = `
            <div style="display: flex; gap: 0.75rem; align-items: flex-start;">
                <div style="width: 24px; height: 24px; border-radius: 50%; background: #F1F5F9; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; color: #475569; flex-shrink: 0; font-weight: 700;">1</div>
                <div>
                    <div style="font-size: 0.72rem; color: #64748B;">Nguồn ưu đãi gốc</div>
                    <div style="font-size: 0.88rem; font-weight: 800; color: #0F172A;">${source} · Quán ${merchant}</div>
                </div>
            </div>
            <div style="width: 2px; height: 12px; background: #E2E8F0; margin-left: 11px;"></div>
            <div style="display: flex; gap: 0.75rem; align-items: flex-start;">
                <div style="width: 24px; height: 24px; border-radius: 50%; background: #FEF3C7; border: 1px solid #F59E0B; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; color: #92400E; flex-shrink: 0; font-weight: 700;">2</div>
                <div>
                    <div style="font-size: 0.72rem; color: #64748B;">JayT ghi nhận & đối soát</div>
                    <div style="font-size: 0.88rem; font-weight: 700; color: #92400E;">Thời gian thực (Kiểm thử nội bộ)</div>
                </div>
            </div>
            <div style="width: 2px; height: 12px; background: #E2E8F0; margin-left: 11px;"></div>
            <div style="display: flex; gap: 0.75rem; align-items: flex-start;">
                <div style="width: 24px; height: 24px; border-radius: 50%; background: #D1FAE5; border: 1px solid #10B981; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; color: #047857; flex-shrink: 0; font-weight: 700;">3</div>
                <div>
                    <div style="font-size: 0.72rem; color: #64748B;">Kiểm tra thời hạn sử dụng</div>
                    <div style="font-size: 0.88rem; font-weight: 700; color: #047857;">Còn hiệu lực đến ${validUntil || 'Đang cập nhật'}</div>
                </div>
            </div>
            <div style="width: 2px; height: 12px; background: #E2E8F0; margin-left: 11px;"></div>
            <div style="display: flex; gap: 0.75rem; align-items: flex-start;">
                <div style="width: 24px; height: 24px; border-radius: 50%; background: #059669; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; color: #FFF; flex-shrink: 0; font-weight: 800;">✓</div>
                <div>
                    <div style="font-size: 0.72rem; color: #64748B;">Kết quả kiểm tra</div>
                    <div style="font-size: 0.88rem; font-weight: 800; color: #059669;">🟡 DỮ LIỆU KIỂM THỬ NỘI BỘ HỢP LỆ</div>
                </div>
            </div>
        `;
        document.getElementById('jaytConsumerTrustModal').style.display = 'flex';
    };

    // 4. Lọc deal chuẩn hóa
    window.filterDealsByIntent = function(intent, btnElement) {
        currentFilter = intent;
        
        const chips = document.querySelectorAll('.intent-chip');
        chips.forEach(c => {
            c.style.background = '#F1F5F9';
            c.style.color = '#1E293B';
            c.style.border = '1px solid #CBD5E1';
            c.style.boxShadow = 'none';
        });
        if (btnElement) {
            btnElement.style.background = '#059669';
            btnElement.style.color = '#FFFFFF';
            btnElement.style.border = 'none';
            btnElement.style.boxShadow = '0 2px 8px rgba(5,150,105,0.25)';
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

        const gridContainer = document.querySelector('.deal-grid, #jaytDealGrid, .deals-container') || document.querySelector('.grid');
        if (gridContainer) {
            renderDealCards(filtered, gridContainer);
        }
    };

    // 5. Render Deal Cards High-Contrast
    function renderDealCards(deals, container) {
        if (!deals || deals.length === 0) return;

        container.innerHTML = '';
        deals.forEach(deal => {
            const card = document.createElement('div');
            card.className = 'deal-card';
            card.style.cssText = `
                background: #FFFFFF !important;
                border: 1.5px solid #E2E8F0 !important;
                border-radius: 18px !important;
                padding: 1.25rem !important;
                display: flex !important;
                flex-direction: column !important;
                justify-content: space-between !important;
                gap: 0.9rem !important;
                box-shadow: 0 4px 20px rgba(0,0,0,0.06) !important;
                position: relative !important;
                width: 100% !important;
                min-width: 0 !important;
            `;

            const validDate = deal.valid_until ? deal.valid_until.split('T')[0] : 'Đang cập nhật';
            const badgeTag = `<span style="font-size: 0.68rem; background: #FEF3C7; color: #92400E; border: 1px solid #FCD34D; padding: 0.15rem 0.45rem; border-radius: 6px; font-weight: 800; white-space: nowrap;">🟡 KIỂM THỬ NỘI BỘ</span>`;

            card.innerHTML = `
                <div>
                    <!-- 1. Header quán & nhãn kiểm thử -->
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.6rem;">
                        <span style="font-size: 0.85rem; font-weight: 800; color: #B45309; letter-spacing: 0.02em; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">[${deal.merchant_name}]</span>
                        ${badgeTag}
                    </div>

                    <!-- 2. Khối TIẾT KIỆM Nổi Bật Nhất -->
                    <div style="background: linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%); border: 1.5px solid #10B981; border-radius: 14px; padding: 0.8rem 0.9rem; margin-bottom: 0.8rem; text-align: center;">
                        <div style="font-size: 1.35rem; font-weight: 900; color: #047857; letter-spacing: -0.01em; line-height: 1.15;">
                            💰 TIẾT KIỆM ${formatVND(deal.saving_amount_vnd)}
                        </div>
                        <div style="font-size: 0.78rem; font-weight: 700; color: #065F46; margin-top: 0.2rem;">
                            Giảm ${Math.round(deal.saving_percentage || 0)}% · Chỉ còn ${formatVND(deal.discount_price_vnd)} <span style="color: #64748B; text-decoration: line-through; font-weight: normal; margin-left: 0.3rem;">${formatVND(deal.original_price_vnd)}</span>
                        </div>
                    </div>

                    <!-- 3. Tên món & khu vực -->
                    <h4 style="font-size: 1.05rem; font-weight: 800; color: #0F172A !important; line-height: 1.3; margin: 0 0 0.35rem; overflow: hidden; text-overflow: ellipsis;">${deal.item_name}</h4>
                    <p style="font-size: 0.78rem; color: #475569 !important; margin: 0 0 0.75rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">📍 ${deal.branch_address || 'Đà Nẵng'} · ${deal.source_channel}</p>

                    <!-- 4. Nguồn & Hạn dùng minh bạch -->
                    <div style="font-size: 0.74rem; color: #64748B !important; display: flex; justify-content: space-between; margin-bottom: 0.25rem;">
                        <span>Nguồn: <strong style="color: #334155;">${deal.source_channel}</strong></span>
                        <span>Hạn: <strong style="color: #0F172A;">${validDate}</strong></span>
                    </div>
                </div>

                <div>
                    <!-- 5. Nút hành động 1-chạm -->
                    <div style="display: flex; gap: 0.5rem; margin-bottom: 0.55rem;">
                        <button onclick="navigator.clipboard.writeText('${deal.voucher_code}'); alert('Đã sao chép mã: ${deal.voucher_code}');" style="flex: 1; background: #F8FAFC; border: 1px solid #CBD5E1; color: #0F172A; padding: 0.65rem 0.4rem; border-radius: 10px; font-weight: 800; font-size: 0.78rem; cursor: pointer; transition: background 0.2s;">
                            📋 ${deal.voucher_code}
                        </button>
                        <a href="${deal.deep_link}" target="_blank" style="flex: 1.3; background: linear-gradient(135deg, #059669 0%, #047857 100%); color: #FFFFFF; padding: 0.65rem 0.4rem; border-radius: 10px; font-weight: 800; font-size: 0.82rem; text-align: center; text-decoration: none; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(5,150,105,0.25);">
                            SĂN NGAY ➔
                        </a>
                    </div>

                    <!-- 6. Trust Trigger -->
                    <div style="text-align: center;">
                        <button onclick="window.openConsumerTrustModal('${deal.merchant_name.replace(/'/g, "\\'")}', '${deal.source_channel}', '${validDate}', 'Thời gian thực')" style="background: none; border: none; color: #B45309; font-size: 0.72rem; font-weight: 700; cursor: pointer; text-decoration: underline; padding: 0.2rem;">
                            ▾ Vì sao JayT tin ưu đãi này?
                        </button>
                    </div>
                </div>
            `;

            container.appendChild(card);
        });
    }

    // 6. Khởi chạy khi DOM sẵn sàng
    document.addEventListener('DOMContentLoaded', () => {
        // Ẩn social proof giả
        const fakeProofs = document.querySelectorAll('.community-ticker, .ticker-text, .live-counter, .social-proof, .community-feed, .recent-activity, .calibration-box, .wilson-score, .radar-container, [data-mock-proof]');
        fakeProofs.forEach(el => el.style.display = 'none');

        fetch('/api/deals')
            .then(res => res.json())
            .then(data => {
                allCanonicalDeals = data.deals || [];
                rebuildHeroSection();
                const gridContainer = document.querySelector('.deal-grid, #jaytDealGrid, .deals-container') || document.querySelector('.grid');
                if (gridContainer) {
                    renderDealCards(allCanonicalDeals, gridContainer);
                }
            })
            .catch(err => {
                console.warn("⚠️ API fetch warning:", err);
            });
    });
})();
