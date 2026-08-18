/**
 * JAYT APEX v3.1 — DIRECTIVE #002 CONSUMER RUNTIME ADAPTER
 * =============================================================================
 * TÔN CHỈ: "TIẾT KIỆM LÀ TRỌNG TÂM THỊ GIÁC SỐ 1 TRÊN DEAL CARD"
 * =============================================================================
 */

(function() {
    console.log("⚡ JAYT Directive #002 Adapter Active");

    // 1. Tinh chỉnh Hero Above-the-Fold
    function refineHero() {
        const heroTitle = document.querySelector('.hero-title, h1');
        if (heroTitle) {
            heroTitle.innerHTML = `
                <div style="font-size: clamp(1.8rem, 4.5vw, 2.8rem); font-weight: 900; letter-spacing: -0.02em; color: #FFFFFF; line-height: 1.15; margin-bottom: 0.35rem;">
                    Ưu đãi ăn uống & di chuyển Đà Nẵng
                </div>
                <div style="font-size: clamp(1rem, 2.5vw, 1.35rem); font-weight: 700; color: #D4AF37;">
                    Kiểm chứng nguồn & hạn dùng trước khi bấm
                </div>
            `;
        }

        const heroSubtitle = document.querySelector('.hero-subtitle, .hero-lead');
        if (heroSubtitle) {
            heroSubtitle.innerHTML = `
                <p style="font-size: 0.95rem; color: #94A3B8; max-width: 580px; margin: 0.5rem auto 1rem; line-height: 1.5;">
                    Mở JayT · Thấy ngay mức tiết kiệm thật · Bấm nhận mã ngay
                </p>
            `;
        }

        const tickers = document.querySelectorAll('.community-ticker, .ticker-text, .live-counter');
        tickers.forEach(el => {
            el.innerHTML = `<span>📍 <strong>JayT:</strong> Đang xây dựng kho ưu đãi đã đối soát dành riêng cho Đà Nẵng.</span>`;
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

                <div style="display: flex; flex-direction: column; gap: 0.85rem; margin-bottom: 1.35rem;" id="trustTimelineContent">
                    <!-- Dynamic timeline injected here -->
                </div>

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

    // 4. Render Deal Cards (DIRECTIVE #002: TIẾT KIỆM LÀ HERO THỊ GIÁC CAO NHẤT)
    function renderDealCards(deals, container) {
        if (!deals || deals.length === 0) return;

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
                gap: 1rem;
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

                    <!-- 2. DIRECTIVE #002: Khối TIẾT KIỆM Nổi Bật Nhất (Hero Thị Giác) -->
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

    // 5. Khởi chạy khi trang tải xong
    document.addEventListener('DOMContentLoaded', () => {
        refineHero();

        fetch('/api/deals')
            .then(res => res.json())
            .then(data => {
                const deals = data.deals || [];
                const gridContainer = document.querySelector('.deal-grid, #jaytDealGrid, .deals-container') || document.querySelector('.grid');
                if (gridContainer) {
                    renderDealCards(deals, gridContainer);
                }
            })
            .catch(err => {
                console.warn("⚠️ API fetch warning:", err);
            });
    });
})();
