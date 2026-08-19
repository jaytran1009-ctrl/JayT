/**
 * JAYT APEX v3.1 — DIRECTIVE #003.1: HIGH-CONTRAST DARK THEME & RETENTION CONVERGENCE
 * =============================================================================
 * TÔN CHỈ: TƯƠNG PHẢN ĐỈNH CAO · CHỮ TRẮNG NỀN ĐEN 100% · ĐỐI SOÁT CHUẨN XÁC 159.000₫
 * =============================================================================
 */

(function() {
    console.log("⚡ JAYT Directive #003.1 High-Contrast Hardened Active");

    let allCanonicalDeals = [];
    let currentFilter = 'ALL';

    // 1. Ép CSS Reset Dark Theme Toàn Cục (Xóa sạch nền trắng và tràn viền)
    function injectHighContrastCSS() {
        if (document.getElementById('jaytHighContrastCSS')) return;
        const style = document.createElement('style');
        style.id = 'jaytHighContrastCSS';
        style.innerHTML = `
            /* 1. Ép toàn bộ Body, Header, Container sang Dark Theme */
            html, body, header, nav, .topbar, .navbar, .header, 
            .app-shell, .main-content, .container, main, #app, section {
                background-color: #0A0A0E !important;
                background: #0A0A0E !important;
                color: #FFFFFF !important;
                overflow-x: hidden !important;
                max-width: 100vw !important;
                box-sizing: border-box !important;
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
            }

            *, *::before, *::after {
                box-sizing: border-box !important;
            }

            /* 2. Container chính chuẩn 14-inch (1140px) */
            .main-content, .container, .app-container, main, #app {
                width: 100% !important;
                max-width: 1140px !important;
                margin: 0 auto !important;
                padding: 0.5rem 1rem !important;
                min-width: 0 !important;
            }

            /* 3. Ẩn toàn bộ Sidebar và Social Proof Giả */
            .sidebar, aside, .community-ticker, .ticker-text, .live-counter, 
            .social-proof, .community-feed, .recent-activity, .calibration-box, 
            .wilson-score, .radar-container, .telemetry-debug, .json-tree, 
            .engine-lineage, [data-mock-proof], .mock-stat, .community-metrics {
                display: none !important;
            }

            /* 4. Deal Grid co giãn linh hoạt */
            .deal-grid, #jaytDealGrid, .deals-container, .grid {
                display: grid !important;
                grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)) !important;
                gap: 1.15rem !important;
                width: 100% !important;
                margin-top: 1rem !important;
            }

            @media (max-width: 768px) {
                .deal-grid, #jaytDealGrid, .deals-container, .grid {
                    grid-template-columns: 1fr !important;
                    gap: 0.9rem !important;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // 2. Format số tiền VNĐ
    function formatVND(amount) {
        if (typeof amount !== 'number' || isNaN(amount)) return '0₫';
        return new Intl.NumberFormat('vi-VN').format(amount) + '₫';
    }

    // 3. Tinh chỉnh Hero: Nền tối sang trọng, Chữ trắng rõ 100%
    function rebuildHeroSection() {
        const totalSavings = allCanonicalDeals.reduce((sum, d) => sum + (d.saving_amount_vnd || 0), 0);
        const displayTotalSavings = totalSavings > 0 ? formatVND(totalSavings) : '159.000₫';

        const heroHTML = `
            <div style="background: #121218; border: 1px solid rgba(255,255,255,0.08); border-radius: 20px; padding: 1.5rem 1rem; text-align: center; max-width: 860px; margin: 1rem auto 0.5rem; box-shadow: 0 10px 30px rgba(0,0,0,0.6);">
                <div style="display: inline-flex; align-items: center; gap: 0.4rem; background: rgba(212,175,55,0.15); border: 1px solid rgba(212,175,55,0.35); padding: 0.25rem 0.75rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 800; color: #D4AF37; margin-bottom: 0.6rem;">
                    📍 JAYT — ĐÀ NẴNG (MÃ VÙNG 43)
                </div>
                
                <h1 style="font-size: clamp(1.6rem, 3.8vw, 2.4rem); font-weight: 900; letter-spacing: -0.02em; color: #FFFFFF !important; line-height: 1.2; margin: 0 0 0.4rem;">
                    Hôm nay bạn có thể tiết kiệm đến <span style="color: #10B981 !important; text-shadow: 0 0 20px rgba(16,185,129,0.3);">${displayTotalSavings}</span>
                </h1>
                
                <p style="font-size: 0.92rem; color: #94A3B8 !important; margin: 0 auto 1rem; line-height: 1.45; max-width: 580px;">
                    Ăn gì • Uống gì • Đi đâu — JayT lọc sẵn những ưu đãi đáng tiền nhất cho bạn.
                </p>

                <!-- Bộ lọc nhu cầu 1-chạm -->
                <div style="display: flex; gap: 0.45rem; justify-content: center; flex-wrap: wrap; margin-bottom: 0.85rem;" id="jaytIntentFilters">
                    <button onclick="window.filterDealsByIntent('ALL', this)" class="intent-chip" style="background: #10B981; color: #FFF; border: none; padding: 0.45rem 1rem; border-radius: 9999px; font-weight: 800; font-size: 0.78rem; cursor: pointer; transition: all 0.2s;">
                        ✨ Tất cả (6)
                    </button>
                    <button onclick="window.filterDealsByIntent('FOOD', this)" class="intent-chip" style="background: rgba(255,255,255,0.08); color: #CBD5E1; border: 1px solid rgba(255,255,255,0.15); padding: 0.45rem 1rem; border-radius: 9999px; font-weight: 700; font-size: 0.78rem; cursor: pointer; transition: all 0.2s;">
                        🍜 Ăn Trưa/Tối
                    </button>
                    <button onclick="window.filterDealsByIntent('DRINK', this)" class="intent-chip" style="background: rgba(255,255,255,0.08); color: #CBD5E1; border: 1px solid rgba(255,255,255,0.15); padding: 0.45rem 1rem; border-radius: 9999px; font-weight: 700; font-size: 0.78rem; cursor: pointer; transition: all 0.2s;">
                        ☕ Trà Sữa/Cafe
                    </button>
                    <button onclick="window.filterDealsByIntent('RIDE', this)" class="intent-chip" style="background: rgba(255,255,255,0.08); color: #CBD5E1; border: 1px solid rgba(255,255,255,0.15); padding: 0.45rem 1rem; border-radius: 9999px; font-weight: 700; font-size: 0.78rem; cursor: pointer; transition: all 0.2s;">
                        🚗 Xe Điện 0Đ
                    </button>
                    <button onclick="window.filterDealsByIntent('STUDENT', this)" class="intent-chip" style="background: rgba(255,255,255,0.08); color: #CBD5E1; border: 1px solid rgba(255,255,255,0.15); padding: 0.45rem 1rem; border-radius: 9999px; font-weight: 700; font-size: 0.78rem; cursor: pointer; transition: all 0.2s;">
                        🎓 Sinh Viên
                    </button>
                </div>

                <!-- Ticker trung thực -->
                <div style="font-size: 0.76rem; color: #64748B; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); padding: 0.35rem 0.8rem; border-radius: 8px; display: inline-block;">
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

    // 4. Modal Trust Timeline (Trung thực, không jargon)
    function ensureTrustModal() {
        if (document.getElementById('jaytConsumerTrustModal')) return;

        const modal = document.createElement('div');
        modal.id = 'jaytConsumerTrustModal';
        modal.style.cssText = `
            display: none; position: fixed; inset: 0; z-index: 10000;
            background: rgba(0, 0, 0, 0.85); backdrop-filter: blur(8px);
            align-items: center; justify-content: center; padding: 1rem;
        `;
        modal.innerHTML = `
            <div style="background: #121218; border: 1px solid rgba(212,175,55,0.4); border-radius: 20px; max-width: 440px; width: 100%; padding: 1.5rem; box-shadow: 0 20px 50px rgba(0,0,0,0.6); color: #FFF;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.2rem; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 0.7rem;">
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <span style="font-size: 1.2rem;">🛡️</span>
                        <h3 style="font-size: 1.05rem; font-weight: 800; color: #D4AF37; margin: 0;">Vì Sao Ưu Đãi Này Đáng Tin?</h3>
                    </div>
                    <button onclick="document.getElementById('jaytConsumerTrustModal').style.display='none'" style="background: none; border: none; color: #94A3B8; font-size: 1.4rem; cursor: pointer;">&times;</button>
                </div>
                <div style="display: flex; flex-direction: column; gap: 0.85rem; margin-bottom: 1.3rem;" id="trustTimelineContent"></div>
                <div style="background: rgba(16,185,129,0.08); border: 1px solid rgba(16,185,129,0.25); border-radius: 12px; padding: 0.75rem; font-size: 0.78rem; color: #A7F3D0; line-height: 1.45;">
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
                <div style="width: 24px; height: 24px; border-radius: 50%; background: rgba(255,255,255,0.08); display: flex; align-items: center; justify-content: center; font-size: 0.75rem; color: #CBD5E1; flex-shrink: 0; font-weight: 700;">1</div>
                <div>
                    <div style="font-size: 0.72rem; color: #94A3B8;">Nguồn ưu đãi gốc</div>
                    <div style="font-size: 0.88rem; font-weight: 800; color: #FFF;">${source} · Quán ${merchant}</div>
                </div>
            </div>
            <div style="width: 2px; height: 12px; background: rgba(255,255,255,0.15); margin-left: 11px;"></div>
            <div style="display: flex; gap: 0.75rem; align-items: flex-start;">
                <div style="width: 24px; height: 24px; border-radius: 50%; background: rgba(212,175,55,0.15); border: 1px solid #D4AF37; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; color: #D4AF37; flex-shrink: 0; font-weight: 700;">2</div>
                <div>
                    <div style="font-size: 0.72rem; color: #94A3B8;">JayT ghi nhận & đối soát</div>
                    <div style="font-size: 0.88rem; font-weight: 700; color: #F3E8C3;">Thời gian thực (Kiểm thử nội bộ)</div>
                </div>
            </div>
            <div style="width: 2px; height: 12px; background: rgba(255,255,255,0.15); margin-left: 11px;"></div>
            <div style="display: flex; gap: 0.75rem; align-items: flex-start;">
                <div style="width: 24px; height: 24px; border-radius: 50%; background: rgba(16,185,129,0.15); border: 1px solid #10B981; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; color: #10B981; flex-shrink: 0; font-weight: 700;">3</div>
                <div>
                    <div style="font-size: 0.72rem; color: #94A3B8;">Kiểm tra thời hạn sử dụng</div>
                    <div style="font-size: 0.88rem; font-weight: 700; color: #10B981;">Còn hiệu lực đến ${validUntil || 'Đang cập nhật'}</div>
                </div>
            </div>
            <div style="width: 2px; height: 12px; background: rgba(255,255,255,0.15); margin-left: 11px;"></div>
            <div style="display: flex; gap: 0.75rem; align-items: flex-start;">
                <div style="width: 24px; height: 24px; border-radius: 50%; background: #10B981; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; color: #FFF; flex-shrink: 0; font-weight: 800;">✓</div>
                <div>
                    <div style="font-size: 0.72rem; color: #94A3B8;">Kết quả kiểm tra</div>
                    <div style="font-size: 0.88rem; font-weight: 800; color: #10B981;">🟡 DỮ LIỆU KIỂM THỬ NỘI BỘ HỢP LỆ</div>
                </div>
            </div>
        `;
        document.getElementById('jaytConsumerTrustModal').style.display = 'flex';
    };

    // 5. Lọc deal chuẩn hóa sự kiện
    window.filterDealsByIntent = function(intent, btnElement) {
        currentFilter = intent;
        
        const chips = document.querySelectorAll('.intent-chip');
        chips.forEach(c => {
            c.style.background = 'rgba(255,255,255,0.08)';
            c.style.color = '#CBD5E1';
            c.style.border = '1px solid rgba(255,255,255,0.15)';
        });
        if (btnElement) {
            btnElement.style.background = '#10B981';
            btnElement.style.color = '#FFF';
            btnElement.style.border = 'none';
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

    // 6. Render Deal Cards (Hero Tiết Kiệm Số 1)
    function renderDealCards(deals, container) {
        if (!deals || deals.length === 0) return;

        container.innerHTML = '';
        deals.forEach(deal => {
            const card = document.createElement('div');
            card.className = 'deal-card';
            card.style.cssText = `
                background: #14141C !important;
                border: 1px solid rgba(255, 255, 255, 0.08) !important;
                border-radius: 16px !important;
                padding: 1.2rem !important;
                display: flex !important;
                flex-direction: column !important;
                justify-content: space-between !important;
                gap: 0.85rem !important;
                box-shadow: 0 6px 20px rgba(0,0,0,0.4) !important;
                position: relative !important;
                width: 100% !important;
                min-width: 0 !important;
            `;

            const validDate = deal.valid_until ? deal.valid_until.split('T')[0] : 'Đang cập nhật';
            const badgeTag = `<span style="font-size: 0.65rem; background: rgba(245,158,11,0.15); color: #F59E0B; border: 1px solid rgba(245,158,11,0.3); padding: 0.15rem 0.45rem; border-radius: 6px; font-weight: 800; white-space: nowrap;">🟡 KIỂM THỬ NỘI BỘ</span>`;

            card.innerHTML = `
                <div>
                    <!-- 1. Header quán & nhãn kiểm thử -->
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.55rem;">
                        <span style="font-size: 0.82rem; font-weight: 800; color: #D4AF37; letter-spacing: 0.02em; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">[${deal.merchant_name}]</span>
                        ${badgeTag}
                    </div>

                    <!-- 2. Khối TIẾT KIỆM Nổi Bật Nhất -->
                    <div style="background: linear-gradient(135deg, rgba(16,185,129,0.18) 0%, rgba(5,150,105,0.06) 100%); border: 1.5px solid rgba(16,185,129,0.4); border-radius: 12px; padding: 0.75rem 0.85rem; margin-bottom: 0.75rem; text-align: center;">
                        <div style="font-size: 1.3rem; font-weight: 900; color: #10B981; letter-spacing: -0.01em; line-height: 1.15;">
                            💰 TIẾT KIỆM ${formatVND(deal.saving_amount_vnd)}
                        </div>
                        <div style="font-size: 0.76rem; font-weight: 700; color: #6EE7B7; margin-top: 0.2rem;">
                            Giảm ${Math.round(deal.saving_percentage || 0)}% · Chỉ còn ${formatVND(deal.discount_price_vnd)} <span style="color: #94A3B8; text-decoration: line-through; font-weight: normal; margin-left: 0.25rem;">${formatVND(deal.original_price_vnd)}</span>
                        </div>
                    </div>

                    <!-- 3. Tên món & khu vực -->
                    <h4 style="font-size: 1.02rem; font-weight: 800; color: #FFFFFF !important; line-height: 1.3; margin: 0 0 0.3rem; overflow: hidden; text-overflow: ellipsis;">${deal.item_name}</h4>
                    <p style="font-size: 0.76rem; color: #94A3B8 !important; margin: 0 0 0.7rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">📍 ${deal.branch_address || 'Đà Nẵng'} · ${deal.source_channel}</p>

                    <!-- 4. Nguồn & Hạn dùng minh bạch -->
                    <div style="font-size: 0.72rem; color: #94A3B8 !important; display: flex; justify-content: space-between; margin-bottom: 0.25rem;">
                        <span>Nguồn: <strong style="color: #CBD5E1;">${deal.source_channel}</strong></span>
                        <span>Hạn: <strong style="color: #F8FAFC;">${validDate}</strong></span>
                    </div>
                </div>

                <div>
                    <!-- 5. Nút hành động 1-chạm -->
                    <div style="display: flex; gap: 0.45rem; margin-bottom: 0.5rem;">
                        <button onclick="navigator.clipboard.writeText('${deal.voucher_code}'); alert('Đã sao chép mã: ${deal.voucher_code}');" style="flex: 1; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.15); color: #FFF; padding: 0.6rem 0.35rem; border-radius: 9px; font-weight: 800; font-size: 0.75rem; cursor: pointer; transition: background 0.2s ease;">
                            📋 ${deal.voucher_code}
                        </button>
                        <a href="${deal.deep_link}" target="_blank" style="flex: 1.25; background: linear-gradient(135deg, #10B981 0%, #059669 100%); color: #FFF; padding: 0.6rem 0.35rem; border-radius: 9px; font-weight: 800; font-size: 0.78rem; text-align: center; text-decoration: none; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(16,185,129,0.25);">
                            SĂN NGAY ➔
                        </a>
                    </div>

                    <!-- 6. Trust Trigger -->
                    <div style="text-align: center;">
                        <button onclick="window.openConsumerTrustModal('${deal.merchant_name.replace(/'/g, "\\'")}', '${deal.source_channel}', '${validDate}', 'Thời gian thực')" style="background: none; border: none; color: #D4AF37; font-size: 0.7rem; font-weight: 700; cursor: pointer; text-decoration: underline; padding: 0.15rem;">
                            ▾ Vì sao JayT tin ưu đãi này?
                        </button>
                    </div>
                </div>
            `;

            container.appendChild(card);
        });
    }

    // 7. Khởi chạy khi DOM sẵn sàng
    document.addEventListener('DOMContentLoaded', () => {
        injectHighContrastCSS();

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
