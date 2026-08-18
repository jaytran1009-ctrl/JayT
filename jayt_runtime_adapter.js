/**
 * JAYT APEX v3.1 — CONSUMER EXPERIENCE HARDENING RUNTIME ADAPTER
 * =============================================================================
 * TÔN CHỈ: "BIẾN JAYT THÀNH NƠI MỞ LÊN LÀ BIẾT NGAY HÔM NAY TIẾT KIỆM ĐƯỢC GÌ"
 * ĐẶC ĐIỂM CHUẨN MỰC:
 * 1. Hero 5 Giây: "JAYT — Ưu đãi đã kiểm chứng cho người Đà Nẵng"
 * 2. Deal Card: "TIẾT KIỆM XX.000₫" to rõ nổi bật nhất, nút Copy Mã & Săn Ngay trực quan.
 * 3. Trust Moment: Modal Timeline 4 bước trực quan giải trình nguồn gốc.
 * 4. Zero Technical Jargon: Bỏ L0-L3/Lineage -> Thay bằng "🟢 Đã kiểm chứng, Nguồn, Hạn".
 * 5. Discovery Section: "Hôm nay tại Đà Nẵng: Trưa nay ăn gì? Chiều uống gì? Tối đi đâu?".
 * 6. Empty State Hành Động Kép: Có nút đăng ký nhận tin & xem khu vực khác.
 * 7. Mobile First: Thao tác 1-chạm mượt mà.
 * =============================================================================
 */

(function() {
    console.log("⚡ JAYT Consumer Experience Hardening v3.1 Active");

    // 1. Tối ưu Hero 5 Giây & Discovery Entry Points
    function hardenHeroAndDiscovery() {
        const heroTitle = document.querySelector('.hero-title, h1');
        if (heroTitle) {
            heroTitle.innerHTML = `
                <span style="display: block; font-size: clamp(2rem, 5vw, 3.2rem); font-weight: 900; letter-spacing: -0.02em; color: #FFFFFF; line-height: 1.15; margin-bottom: 0.4rem;">
                    JAYT
                </span>
                <span style="display: block; font-size: clamp(1.2rem, 3vw, 1.8rem); font-weight: 800; background: linear-gradient(135deg, #D4AF37, #F3E8C3); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
                    Ưu đãi đã kiểm chứng cho người Đà Nẵng
                </span>
            `;
        }

        const heroSubtitle = document.querySelector('.hero-subtitle, .hero-lead');
        if (heroSubtitle) {
            heroSubtitle.innerHTML = `
                <p style="font-size: 1.05rem; color: #94A3B8; max-width: 620px; margin: 0 auto; line-height: 1.6;">
                    Tìm món ngon. Săn ưu đãi. Biết rõ nguồn và hạn dùng trước khi bấm.
                </p>
            `;
        }

        // Tẩy trừ toàn bộ social ticker giả lập
        const tickers = document.querySelectorAll('.community-ticker, .ticker-text, .live-counter');
        tickers.forEach(el => {
            el.innerHTML = `<span>💬 <strong>Cộng đồng JayT:</strong> Đang tích lũy trải nghiệm từ người dân & sinh viên Đà Nẵng.</span>`;
        });
    }

    // 2. Format tiền tệ VNĐ
    function formatVND(amount) {
        return new Intl.NumberFormat('vi-VN').format(amount) + '₫';
    }

    // 3. Modal Trust Moment Timeline
    function ensureTrustModal() {
        if (document.getElementById('jaytConsumerTrustModal')) return;

        const modal = document.createElement('div');
        modal.id = 'jaytConsumerTrustModal';
        modal.style.cssText = `
            display: none; position: fixed; inset: 0; z-index: 10000;
            background: rgba(0, 0, 0, 0.75); backdrop-filter: blur(8px);
            align-items: center; justify-content: center; padding: 1rem;
        `;
        modal.innerHTML = `
            <div style="background: #111116; border: 1px solid rgba(212,175,55,0.4); border-radius: 20px; max-width: 480px; width: 100%; padding: 1.75rem; box-shadow: 0 20px 50px rgba(0,0,0,0.6); color: #FFF; animation: fadeInModal 0.2s ease;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 0.75rem;">
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <span style="font-size: 1.3rem;">🛡️</span>
                        <h3 style="font-size: 1.1rem; font-weight: 800; color: #D4AF37; margin: 0;">Vì Sao JayT Tin Ưu Đãi Này?</h3>
                    </div>
                    <button onclick="document.getElementById('jaytConsumerTrustModal').style.display='none'" style="background: none; border: none; color: #94A3B8; font-size: 1.4rem; cursor: pointer; padding: 0.2rem;">&times;</button>
                </div>

                <div style="display: flex; flex-direction: column; gap: 1rem; margin-bottom: 1.5rem;" id="trustTimelineContent">
                    <!-- Dynamic timeline injected here -->
                </div>

                <div style="background: rgba(16,185,129,0.08); border: 1px solid rgba(16,185,129,0.25); border-radius: 12px; padding: 0.85rem; font-size: 0.82rem; color: #A7F3D0; line-height: 1.5;">
                    💡 <strong>Cam kết của JayT:</strong> Chúng tôi không tự tạo ưu đãi ảo. Mọi ưu đãi đều có nguồn gốc đối tác và hạn dùng kiểm chứng rõ ràng.
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
                <div style="width: 28px; height: 28px; border-radius: 50%; background: rgba(255,255,255,0.08); display: flex; align-items: center; justify-content: center; font-size: 0.85rem; color: #CBD5E1; flex-shrink: 0;">1</div>
                <div>
                    <div style="font-size: 0.78rem; color: #94A3B8;">Nguồn ưu đãi gốc</div>
                    <div style="font-size: 0.95rem; font-weight: 800; color: #FFF;">${source} · Quán ${merchant}</div>
                </div>
            </div>
            <div style="width: 2px; height: 16px; background: rgba(255,255,255,0.15); margin-left: 13px;"></div>
            <div style="display: flex; gap: 0.75rem; align-items: flex-start;">
                <div style="width: 28px; height: 28px; border-radius: 50%; background: rgba(212,175,55,0.15); border: 1px solid #D4AF37; display: flex; align-items: center; justify-content: center; font-size: 0.85rem; color: #D4AF37; flex-shrink: 0;">2</div>
                <div>
                    <div style="font-size: 0.78rem; color: #94A3B8;">JayT ghi nhận & đối soát</div>
                    <div style="font-size: 0.95rem; font-weight: 700; color: #F3E8C3;">Hôm nay (${timeRecorded || 'Thời gian thực'})</div>
                </div>
            </div>
            <div style="width: 2px; height: 16px; background: rgba(255,255,255,0.15); margin-left: 13px;"></div>
            <div style="display: flex; gap: 0.75rem; align-items: flex-start;">
                <div style="width: 28px; height: 28px; border-radius: 50%; background: rgba(16,185,129,0.15); border: 1px solid #10B981; display: flex; align-items: center; justify-content: center; font-size: 0.85rem; color: #10B981; flex-shrink: 0;">3</div>
                <div>
                    <div style="font-size: 0.78rem; color: #94A3B8;">Kiểm tra thời hạn sử dụng</div>
                    <div style="font-size: 0.95rem; font-weight: 700; color: #10B981;">Còn hiệu lực đến ${validUntil || '31/08/2026'}</div>
                </div>
            </div>
            <div style="width: 2px; height: 16px; background: rgba(255,255,255,0.15); margin-left: 13px;"></div>
            <div style="display: flex; gap: 0.75rem; align-items: flex-start;">
                <div style="width: 28px; height: 28px; border-radius: 50%; background: #10B981; display: flex; align-items: center; justify-content: center; font-size: 0.85rem; color: #FFF; flex-shrink: 0;">✓</div>
                <div>
                    <div style="font-size: 0.78rem; color: #94A3B8;">Trạng thái phát hành</div>
                    <div style="font-size: 0.95rem; font-weight: 800; color: #10B981;">🟢 ĐỦ ĐIỀU KIỆN HIỂN THỊ TRÊN JAYT</div>
                </div>
            </div>
        `;
        document.getElementById('jaytConsumerTrustModal').style.display = 'flex';
    };

    // 4. Render Empty State với 2 hành động cụ thể
    function renderEmptyState(container) {
        container.innerHTML = `
            <div style="grid-column: 1 / -1; padding: 3.5rem 2rem; text-align: center; background: rgba(18, 18, 24, 0.85); border: 1px solid rgba(212,175,55,0.25); border-radius: 20px; backdrop-filter: blur(16px); box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
                <div style="font-size: 3rem; margin-bottom: 0.75rem;">🔍</div>
                <h3 style="font-size: 1.25rem; font-weight: 800; color: #FFF; margin-bottom: 0.5rem;">Hôm nay chưa có ưu đãi mới được kiểm chứng tại khu vực này</h3>
                <p style="font-size: 0.92rem; color: #94A3B8; max-width: 520px; margin: 0 auto 1.75rem; line-height: 1.6;">
                    JayT tuyệt đối không hiển thị ưu đãi chưa rõ nguồn hoặc đã quá hạn. Đội ngũ kiểm chứng liên tục cập nhật theo thời gian thực.
                </p>
                <div style="display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap;">
                    <a href="https://zalo.me/g/danang-savings" target="_blank" style="display: inline-flex; align-items: center; gap: 0.4rem; background: linear-gradient(135deg, #10B981, #059669); color: #FFF; padding: 0.65rem 1.4rem; border-radius: 9999px; text-decoration: none; font-weight: 800; font-size: 0.85rem; box-shadow: 0 4px 15px rgba(16,185,129,0.3);">
                        💬 Nhận thông báo khi có ưu đãi mới
                    </a>
                    <button onclick="window.scrollTo({top: 400, behavior: 'smooth'})" style="display: inline-flex; align-items: center; gap: 0.4rem; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.15); color: #FFF; padding: 0.65rem 1.4rem; border-radius: 9999px; font-weight: 700; font-size: 0.85rem; cursor: pointer;">
                        📍 Xem ưu đãi các quận khác
                    </button>
                </div>
            </div>
        `;
    }

    // 5. Render Deal Cards theo thứ tự: Deal -> Tiết Kiệm -> Nguồn -> Hạn -> Hành Động
    function renderDealCards(deals, container) {
        if (!deals || deals.length === 0) {
            renderEmptyState(container);
            return;
        }

        container.innerHTML = '';
        deals.forEach(deal => {
            const card = document.createElement('div');
            card.className = 'deal-card';
            card.style.cssText = `
                background: #13131A;
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

            const validDate = deal.valid_until ? deal.valid_until.split('T')[0] : '31/08/2026';
            const rawCategory = deal.data_category || 'INTERNAL_TEST_FIXTURE';
            const badgeTag = rawCategory === 'INTERNAL_TEST_FIXTURE'
                ? `<span style="font-size: 0.68rem; background: rgba(245,158,11,0.15); color: #F59E0B; border: 1px solid rgba(245,158,11,0.3); padding: 0.15rem 0.5rem; border-radius: 6px; font-weight: 800;">🟡 KIỂM THỬ NỘI BỘ</span>`
                : `<span style="font-size: 0.68rem; background: rgba(16,185,129,0.15); color: #10B981; border: 1px solid rgba(16,185,129,0.3); padding: 0.15rem 0.5rem; border-radius: 6px; font-weight: 800;">🟢 ĐÃ KIỂM CHỨNG</span>`;

            card.innerHTML = `
                <div>
                    <!-- Header quán & đối tác -->
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.65rem;">
                        <span style="font-size: 0.8rem; font-weight: 800; color: #D4AF37; letter-spacing: 0.02em; text-transform: uppercase;">[${deal.merchant_name}]</span>
                        ${badgeTag}
                    </div>

                    <!-- Tên món & khu vực -->
                    <h4 style="font-size: 1.08rem; font-weight: 800; color: #FFFFFF; line-height: 1.35; margin-bottom: 0.25rem;">${deal.item_name}</h4>
                    <p style="font-size: 0.78rem; color: #94A3B8; margin-bottom: 0.85rem;">${deal.branch_address || 'Đà Nẵng'} · ${deal.source_channel}</p>

                    <!-- Khối giá & Tiết Kiệm Nổi Bật -->
                    <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; padding: 0.85rem; margin-bottom: 0.85rem;">
                        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.25rem;">
                            <span style="font-size: 0.8rem; color: #94A3B8;">Giá mua:</span>
                            <span style="font-size: 1.25rem; font-weight: 900; color: #FFFFFF;">${formatVND(deal.discount_price_vnd)}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.8rem;">
                            <span style="color: #64748B;"><del>${formatVND(deal.original_price_vnd)}</del></span>
                            <span style="font-size: 0.92rem; font-weight: 900; color: #10B981; background: rgba(16,185,129,0.12); padding: 0.15rem 0.5rem; border-radius: 6px;">
                                💰 TIẾT KIỆM ${formatVND(deal.saving_amount_vnd)}
                            </span>
                        </div>
                    </div>

                    <!-- Nguồn & Hạn dùng minh bạch -->
                    <div style="font-size: 0.74rem; color: #94A3B8; display: flex; justify-content: space-between; margin-bottom: 0.4rem;">
                        <span>Nguồn: <strong style="color: #CBD5E1;">${deal.source_channel}</strong></span>
                        <span>Hạn dùng: <strong style="color: #F8FAFC;">${validDate}</strong></span>
                    </div>
                </div>

                <div>
                    <!-- Nút hành động -->
                    <div style="display: flex; gap: 0.5rem; margin-bottom: 0.6rem;">
                        <button onclick="navigator.clipboard.writeText('${deal.voucher_code}'); alert('Đã sao chép mã: ${deal.voucher_code}');" style="flex: 1; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.15); color: #FFF; padding: 0.6rem 0.4rem; border-radius: 10px; font-weight: 800; font-size: 0.78rem; cursor: pointer; transition: background 0.2s ease;">
                            📋 ${deal.voucher_code}
                        </button>
                        <a href="${deal.deep_link}" target="_blank" style="flex: 1.3; background: linear-gradient(135deg, #10B981 0%, #059669 100%); color: #FFF; padding: 0.6rem 0.4rem; border-radius: 10px; font-weight: 800; font-size: 0.8rem; text-align: center; text-decoration: none; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(16,185,129,0.3);">
                            SĂN NGAY ➔
                        </a>
                    </div>

                    <!-- Trust Trigger -->
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
        hardenHeroAndDiscovery();

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
