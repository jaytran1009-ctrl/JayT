/**
 * JAYT APEX v3.1 — DIRECTIVE #003: CUSTOMER PSYCHOLOGY & RETENTION CONVERGENCE
 * =============================================================================
 * NORTH STAR: "JAYT LÀ NƠI NGƯỜI ĐÀ NẴNG KIỂM TRA ĐẦU TIÊN ĐỂ TIẾT KIỆM TIỀN"
 * VÒNG LẶP TÂM LÝ: VALUE SEEN ➔ VALUE TAKEN ➔ VALUE REMEMBERED ➔ RETURN INTENT
 * =============================================================================
 */

(function() {
    console.log("⚡ JAYT Directive #003 Retention Adapter Active");

    let allCanonicalDeals = [];
    let currentFilter = 'ALL';

    // 1. Tinh chỉnh Hero: Gọn gàng, loại bỏ khoảng trắng thừa, tập trung vào Lợi Ích
    function refineHero() {
        const heroTitle = document.querySelector('.hero-title, h1');
        if (heroTitle) {
            heroTitle.innerHTML = `
                <div style="font-size: clamp(1.6rem, 4vw, 2.4rem); font-weight: 900; letter-spacing: -0.02em; color: #FFFFFF; line-height: 1.2; margin-bottom: 0.35rem;">
                    Hôm nay JayT giúp bạn tiết kiệm đến <span style="color: #10B981;">40.000₫</span>
                </div>
                <div style="font-size: clamp(0.95rem, 2vw, 1.15rem); font-weight: 600; color: #D4AF37;">
                    Ăn uống & di chuyển Đà Nẵng · Kiểm chứng nguồn & hạn dùng trước khi bấm
                </div>
            `;
        }

        const heroSubtitle = document.querySelector('.hero-subtitle, .hero-lead');
        if (heroSubtitle) {
            heroSubtitle.innerHTML = `
                <!-- Bộ lọc nhu cầu thực dụng 1-chạm -->
                <div style="display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap; margin: 0.85rem 0 0.5rem;" id="jaytIntentFilters">
                    <button onclick="window.filterDealsByIntent('ALL')" class="intent-chip active-chip" style="background: #10B981; color: #FFF; border: none; padding: 0.4rem 0.9rem; border-radius: 9999px; font-weight: 800; font-size: 0.78rem; cursor: pointer;">
                        ✨ Tất cả (6)
                    </button>
                    <button onclick="window.filterDealsByIntent('FOOD')" class="intent-chip" style="background: rgba(255,255,255,0.08); color: #CBD5E1; border: 1px solid rgba(255,255,255,0.15); padding: 0.4rem 0.9rem; border-radius: 9999px; font-weight: 700; font-size: 0.78rem; cursor: pointer;">
                        🍜 Ăn Trưa/Tối
                    </button>
                    <button onclick="window.filterDealsByIntent('DRINK')" class="intent-chip" style="background: rgba(255,255,255,0.08); color: #CBD5E1; border: 1px solid rgba(255,255,255,0.15); padding: 0.4rem 0.9rem; border-radius: 9999px; font-weight: 700; font-size: 0.78rem; cursor: pointer;">
                        ☕ Trà Sữa & Cafe
                    </button>
                    <button onclick="window.filterDealsByIntent('RIDE')" class="intent-chip" style="background: rgba(255,255,255,0.08); color: #CBD5E1; border: 1px solid rgba(255,255,255,0.15); padding: 0.4rem 0.9rem; border-radius: 9999px; font-weight: 700; font-size: 0.78rem; cursor: pointer;">
                        🚗 Xe Điện 0Đ
                    </button>
                    <button onclick="window.filterDealsByIntent('STUDENT')" class="intent-chip" style="background: rgba(255,255,255,0.08); color: #CBD5E1; border: 1px solid rgba(255,255,255,0.15); padding: 0.4rem 0.9rem; border-radius: 9999px; font-weight: 700; font-size: 0.78rem; cursor: pointer;">
                        🎓 Sinh Viên
                    </button>
                </div>
            `;
        }

        // Ticker trung thực & nhắc nhở thói quen quay lại
        const tickers = document.querySelectorAll('.community-ticker, .ticker-text, .live-counter');
        tickers.forEach(el => {
            el.innerHTML = `<span>⚡ <strong>Mẹo tiết kiệm:</strong> Thêm JayT vào màn hình chính điện thoại để kiểm tra ưu đãi trước mỗi bữa ăn.</span>`;
        });
    }

    // 2. Format số tiền VNĐ
    function formatVND(amount) {
        if (typeof amount !== 'number' || isNaN(amount)) return '0₫';
        return new Intl.NumberFormat('vi-VN').format(amount) + '₫';
    }

    // 3. Modal Trust Timeline (Ngôn ngữ đời thường)
    function ensureTrustModal() {
        if (document.getElementById('jaytConsumerTrustModal')) return;

        const modal = document.createElement('div');
        modal.id = 'jaytConsumerTrustModal';
        modal.style.cssText = `
            display: none; position: fixed; inset: 0; z-index: 10000;
            background: rgba(0, 0, 0, 0.78); backdrop-filter: blur(8px);
            align-items: center; justify-content: center; padding: 1rem;
        `;
        modal.innerHTML = `
            <div style="background: #121218; border: 1px solid rgba(212,175,55,0.4); border-radius: 20px; max-width: 460px; width: 100%; padding: 1.6rem; box-shadow: 0 20px 50px rgba(0,0,0,0.6); color: #FFF; animation: fadeInModal 0.2s ease;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.2rem; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 0.7rem;">
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <span style="font-size: 1.25rem;">🛡️</span>
                        <h3 style="font-size: 1.05rem; font-weight: 800; color: #D4AF37; margin: 0;">Vì Sao Ưu Đãi Này Đáng Tin?</h3>
                    </div>
                    <button onclick="document.getElementById('jaytConsumerTrustModal').style.display='none'" style="background: none; border: none; color: #94A3B8; font-size: 1.4rem; cursor: pointer; padding: 0.2rem;">&times;</button>
                </div>

                <div style="display: flex; flex-direction: column; gap: 0.85rem; margin-bottom: 1.35rem;" id="trustTimelineContent"></div>

                <div style="background: rgba(16,185,129,0.08); border: 1px solid rgba(16,185,129,0.25); border-radius: 12px; padding: 0.8rem; font-size: 0.8rem; color: #A7F3D0; line-height: 1.45;">
                    💡 <strong>Cam kết từ JayT:</strong> Chúng tôi không tự tạo ưu đãi ảo. Mọi ưu đãi đều có nguồn gốc đối tác và hạn dùng kiểm chứng rõ ràng.
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
                <div style="width: 26px; height: 26px; border-radius: 50%; background: rgba(255,255,255,0.08); display: flex; align-items: center; justify-content: center; font-size: 0.8rem; color: #CBD5E1; flex-shrink: 0; font-weight: 700;">1</div>
                <div>
                    <div style="font-size: 0.75rem; color: #94A3B8;">Nguồn ưu đãi gốc</div>
                    <div style="font-size: 0.92rem; font-weight: 800; color: #FFF;">${source} · Quán ${merchant}</div>
                </div>
            </div>
            <div style="width: 2px; height: 14px; background: rgba(255,255,255,0.15); margin-left: 12px;"></div>
            <div style="display: flex; gap: 0.75rem; align-items: flex-start;">
                <div style="width: 26px; height: 26px; border-radius: 50%; background: rgba(212,175,55,0.15); border: 1px solid #D4AF37; display: flex; align-items: center; justify-content: center; font-size: 0.8rem; color: #D4AF37; flex-shrink: 0; font-weight: 700;">2</div>
                <div>
                    <div style="font-size: 0.75rem; color: #94A3B8;">JayT ghi nhận & đối soát</div>
                    <div style="font-size: 0.92rem; font-weight: 700; color: #F3E8C3;">Hôm nay (${timeRecorded || 'Thời gian thực'})</div>
                </div>
            </div>
            <div style="width: 2px; height: 14px; background: rgba(255,255,255,0.15); margin-left: 12px;"></div>
            <div style="display: flex; gap: 0.75rem; align-items: flex-start;">
                <div style="width: 26px; height: 26px; border-radius: 50%; background: rgba(16,185,129,0.15); border: 1px solid #10B981; display: flex; align-items: center; justify-content: center; font-size: 0.8rem; color: #10B981; flex-shrink: 0; font-weight: 700;">3</div>
                <div>
                    <div style="font-size: 0.75rem; color: #94A3B8;">Kiểm tra thời hạn sử dụng</div>
                    <div style="font-size: 0.92rem; font-weight: 700; color: #10B981;">Còn hiệu lực đến ${validUntil || 'Đang cập nhật'}</div>
                </div>
            </div>
            <div style="width: 2px; height: 14px; background: rgba(255,255,255,0.15); margin-left: 12px;"></div>
            <div style="display: flex; gap: 0.75rem; align-items: flex-start;">
                <div style="width: 26px; height: 26px; border-radius: 50%; background: #10B981; display: flex; align-items: center; justify-content: center; font-size: 0.8rem; color: #FFF; flex-shrink: 0; font-weight: 800;">✓</div>
                <div>
                    <div style="font-size: 0.75rem; color: #94A3B8;">Kết quả kiểm tra</div>
                    <div style="font-size: 0.92rem; font-weight: 800; color: #10B981;">🟢 ĐỦ ĐIỀU KIỆN HIỂN THỊ TRÊN JAYT</div>
                </div>
            </div>
        `;
        document.getElementById('jaytConsumerTrustModal').style.display = 'flex';
    };

    // 4. Lọc deal theo nhu cầu thực dụng (Intent-Based Dynamic Filtering)
    window.filterDealsByIntent = function(intent) {
        currentFilter = intent;
        
        // Cập nhật giao diện nút bấm
        const chips = document.querySelectorAll('.intent-chip');
        chips.forEach(c => {
            c.style.background = 'rgba(255,255,255,0.08)';
            c.style.color = '#CBD5E1';
            c.style.border = '1px solid rgba(255,255,255,0.15)';
        });
        if (event && event.target) {
            event.target.style.background = '#10B981';
            event.target.style.color = '#FFF';
            event.target.style.border = 'none';
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

    // 5. Render Deal Cards (DIRECTIVE #003: TIẾT KIỆM LÀ HERO THỊ GIÁC SỐ 1)
    function renderDealCards(deals, container) {
        if (!deals || deals.length === 0) {
            container.innerHTML = `
                <div style="grid-column: 1 / -1; padding: 2.5rem 1.5rem; text-align: center; background: rgba(18, 18, 24, 0.85); border: 1px solid rgba(212,175,55,0.25); border-radius: 18px;">
                    <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">🔍</div>
                    <h3 style="font-size: 1.1rem; font-weight: 800; color: #FFF; margin-bottom: 0.3rem;">Chưa có ưu đãi phù hợp trong mục này</h3>
                    <p style="font-size: 0.85rem; color: #94A3B8; margin-bottom: 1rem;">Bấm "Tất cả" để xem toàn bộ 6 ưu đãi đã kiểm chứng hôm nay.</p>
                    <button onclick="window.filterDealsByIntent('ALL')" style="background: #10B981; color: #FFF; padding: 0.5rem 1.2rem; border-radius: 9999px; font-weight: 800; border: none; cursor: pointer;">
                        Xem tất cả ưu đãi
                    </button>
                </div>
            `;
            return;
        }

        container.innerHTML = '';
        deals.forEach(deal => {
            const card = document.createElement('div');
            card.className = 'deal-card';
            card.style.cssText = `
                background: #14141C;
                border: 1px solid rgba(255, 255, 255, 0.08);
                border-radius: 18px;
                padding: 1.35rem;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                gap: 0.9rem;
                transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
                box-shadow: 0 6px 24px rgba(0,0,0,0.3);
                position: relative;
            `;

            const validDate = deal.valid_until ? deal.valid_until.split('T')[0] : 'Đang cập nhật';
            const badgeTag = `<span style="font-size: 0.68rem; background: rgba(245,158,11,0.15); color: #F59E0B; border: 1px solid rgba(245,158,11,0.3); padding: 0.15rem 0.45rem; border-radius: 6px; font-weight: 800;">🟡 KIỂM THỬ NỘI BỘ</span>`;

            card.innerHTML = `
                <div>
                    <!-- 1. Header quán & nhãn kiểm thử -->
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.65rem;">
                        <span style="font-size: 0.85rem; font-weight: 800; color: #D4AF37; letter-spacing: 0.02em;">[${deal.merchant_name}]</span>
                        ${badgeTag}
                    </div>

                    <!-- 2. DIRECTIVE #003: Khối TIẾT KIỆM Nổi Bật Nhất (Hero Thị Giác) -->
                    <div style="background: linear-gradient(135deg, rgba(16,185,129,0.18) 0%, rgba(5,150,105,0.08) 100%); border: 1.5px solid rgba(16,185,129,0.4); border-radius: 14px; padding: 0.85rem 1rem; margin-bottom: 0.85rem; text-align: center; box-shadow: 0 4px 15px rgba(16,185,129,0.15);">
                        <div style="font-size: 1.35rem; font-weight: 900; color: #10B981; letter-spacing: -0.01em; line-height: 1.2;">
                            💰 TIẾT KIỆM ${formatVND(deal.saving_amount_vnd)}
                        </div>
                        <div style="font-size: 0.78rem; font-weight: 700; color: #6EE7B7; margin-top: 0.2rem;">
                            Giảm ${Math.round(deal.saving_percentage || 0)}% · Chỉ còn ${formatVND(deal.discount_price_vnd)} <span style="color: #94A3B8; text-decoration: line-through; font-weight: normal; margin-left: 0.3rem;">${formatVND(deal.original_price_vnd)}</span>
                        </div>
                    </div>

                    <!-- 3. Tên món & khu vực -->
                    <h4 style="font-size: 1.05rem; font-weight: 800; color: #FFFFFF; line-height: 1.35; margin-bottom: 0.35rem;">${deal.item_name}</h4>
                    <p style="font-size: 0.78rem; color: #94A3B8; margin-bottom: 0.85rem;">${deal.branch_address || 'Đà Nẵng'} · ${deal.source_channel}</p>

                    <!-- 4. Nguồn & Hạn dùng minh bạch -->
                    <div style="font-size: 0.74rem; color: #94A3B8; display: flex; justify-content: space-between; margin-bottom: 0.35rem;">
                        <span>Nguồn: <strong style="color: #CBD5E1;">${deal.source_channel}</strong></span>
                        <span>Hạn dùng: <strong style="color: #F8FAFC;">${validDate}</strong></span>
                    </div>
                </div>

                <div>
                    <!-- 5. Nút hành động 1-chạm -->
                    <div style="display: flex; gap: 0.5rem; margin-bottom: 0.55rem;">
                        <button onclick="navigator.clipboard.writeText('${deal.voucher_code}'); alert('Đã sao chép mã: ${deal.voucher_code}');" style="flex: 1; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.15); color: #FFF; padding: 0.65rem 0.4rem; border-radius: 10px; font-weight: 800; font-size: 0.78rem; cursor: pointer; transition: background 0.2s ease;">
                            📋 ${deal.voucher_code}
                        </button>
                        <a href="${deal.deep_link}" target="_blank" style="flex: 1.3; background: linear-gradient(135deg, #10B981 0%, #059669 100%); color: #FFF; padding: 0.65rem 0.4rem; border-radius: 10px; font-weight: 800; font-size: 0.82rem; text-align: center; text-decoration: none; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(16,185,129,0.3);">
                            SĂN NGAY ➔
                        </a>
                    </div>

                    <!-- 6. Trust Trigger -->
                    <div style="text-align: center;">
                        <button onclick="window.openConsumerTrustModal('${deal.merchant_name.replace(/'/g, "\\'")}', '${deal.source_channel}', '${validDate}', '10:32')" style="background: none; border: none; color: #D4AF37; font-size: 0.72rem; font-weight: 700; cursor: pointer; text-decoration: underline; padding: 0.2rem;">
                            ▾ Vì sao JayT tin ưu đãi này?
                        </button>
                    </div>
                </div>
            `;

            container.appendChild(card);
        });
    }

    // 6. Khởi chạy khi trang tải xong
    document.addEventListener('DOMContentLoaded', () => {
        refineHero();

        fetch('/api/deals')
            .then(res => res.json())
            .then(data => {
                allCanonicalDeals = data.deals || [];
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
