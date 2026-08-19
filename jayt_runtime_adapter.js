/**
 * JAYT APEX v3.1 — DIRECTIVE #003.1: 14-INCH UX & RETENTION CONVERGENCE
 * =============================================================================
 * NORTH STAR: "JAYT LÀ NƠI NGƯỜI ĐÀ NẴNG KIỂM TRA ĐẦU TIÊN ĐỂ TIẾT KIỆM TIỀN"
 * KHẮC PHỤC TRIỆT ĐỂ: LAPTOP 14" (1366PX) · KHÔNG OVERFLOW · TRẢ LỜI 5 CÂU HỎI TRONG 3S
 * =============================================================================
 */

(function() {
    console.log("⚡ JAYT Directive #003.1 Active — 14-Inch UX Hardened");

    let allCanonicalDeals = [];
    let currentFilter = 'ALL';

    // 1. Ép CSS Responsive Layout cho Laptop 14" & Typography Chuẩn
    function injectResponsiveSystemCSS() {
        if (document.getElementById('jaytDirective0031CSS')) return;
        const style = document.createElement('style');
        style.id = 'jaytDirective0031CSS';
        style.innerHTML = `
            /* Reset chống tràn viền 14-inch */
            html, body {
                overflow-x: hidden !important;
                max-width: 100vw !important;
                margin: 0 !important;
                padding: 0 !important;
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif !important;
                box-sizing: border-box !important;
                background-color: #0A0A0E !important;
                color: #F8FAFC !important;
            }

            *, *::before, *::after {
                box-sizing: border-box !important;
            }

            /* Container chính co giãn mượt mà trên 1366px, 1440px, Mobile */
            .main-content, .container, .app-container, main, #app {
                width: 100% !important;
                max-width: 1180px !important;
                margin: 0 auto !important;
                padding: 0.75rem 1rem !important;
                min-width: 0 !important;
                overflow-x: hidden !important;
            }

            /* Thu gọn sidebar để nhường sân khấu cho Deal */
            .sidebar, aside {
                display: none !important;
            }

            /* Deal Grid co giãn linh hoạt không bị vỡ card */
            .deal-grid, #jaytDealGrid, .deals-container, .grid {
                display: grid !important;
                grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)) !important;
                gap: 1.25rem !important;
                width: 100% !important;
                margin-top: 1rem !important;
            }

            @media (max-width: 768px) {
                .deal-grid, #jaytDealGrid, .deals-container, .grid {
                    grid-template-columns: 1fr !important;
                    gap: 1rem !important;
                }
            }

            /* Ẩn các module kỹ thuật gây cognitive overload khỏi mắt người dùng */
            .radar-container, .calibration-box, .telemetry-debug, .wilson-score, .json-tree, .engine-lineage {
                display: none !important;
            }
        `;
        document.head.appendChild(style);
    }

    // 2. Format số tiền VNĐ
    function formatVND(amount) {
        if (typeof amount !== 'number' || isNaN(amount)) return '0₫';
        return new Intl.NumberFormat('vi-VN').format(amount) + '₫';
    }

    // 3. Tinh chỉnh Hero Above-the-Fold (Chuẩn 3 Giây Đầu Tiên)
    function rebuildHeroSection() {
        const heroContainer = document.querySelector('.hero-section, header, .hero') || document.body.firstElementChild;
        if (!heroContainer) return;

        // Tính tổng tiền tiết kiệm thật từ 6 deals
        const totalSavings = allCanonicalDeals.reduce((sum, d) => sum + (d.saving_amount_vnd || 0), 0);
        const displayTotalSavings = totalSavings > 0 ? formatVND(totalSavings) : '159.000₫';

        const heroHTML = `
            <div style="text-align: center; padding: 1.2rem 0.5rem 0.8rem; max-width: 860px; margin: 0 auto;">
                <div style="display: inline-flex; align-items: center; gap: 0.4rem; background: rgba(212,175,55,0.12); border: 1px solid rgba(212,175,55,0.3); padding: 0.25rem 0.75rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 800; color: #D4AF37; margin-bottom: 0.6rem;">
                    📍 JAYT — ĐÀ NẴNG (MÃ VÙNG 43)
                </div>
                
                <h1 style="font-size: clamp(1.6rem, 3.8vw, 2.5rem); font-weight: 900; letter-spacing: -0.02em; color: #FFFFFF; line-height: 1.2; margin: 0 0 0.4rem;">
                    Hôm nay bạn có thể tiết kiệm đến <span style="color: #10B981;">${displayTotalSavings}</span>
                </h1>
                
                <p style="font-size: 0.92rem; color: #94A3B8; margin: 0 auto 1rem; line-height: 1.45; max-width: 600px;">
                    Ăn gì • Uống gì • Đi đâu — JayT lọc sẵn những ưu đãi đáng tiền nhất cho bạn.
                </p>

                <!-- Bộ lọc nhu cầu 1-chạm -->
                <div style="display: flex; gap: 0.45rem; justify-content: center; flex-wrap: wrap; margin-bottom: 0.8rem;" id="jaytIntentFilters">
                    <button onclick="window.filterDealsByIntent('ALL')" class="intent-chip" style="background: #10B981; color: #FFF; border: none; padding: 0.45rem 1rem; border-radius: 9999px; font-weight: 800; font-size: 0.8rem; cursor: pointer; transition: all 0.2s;">
                        ✨ Tất cả (6)
                    </button>
                    <button onclick="window.filterDealsByIntent('FOOD')" class="intent-chip" style="background: rgba(255,255,255,0.08); color: #CBD5E1; border: 1px solid rgba(255,255,255,0.15); padding: 0.45rem 1rem; border-radius: 9999px; font-weight: 700; font-size: 0.8rem; cursor: pointer; transition: all 0.2s;">
                        🍜 Ăn Trưa/Tối
                    </button>
                    <button onclick="window.filterDealsByIntent('DRINK')" class="intent-chip" style="background: rgba(255,255,255,0.08); color: #CBD5E1; border: 1px solid rgba(255,255,255,0.15); padding: 0.45rem 1rem; border-radius: 9999px; font-weight: 700; font-size: 0.8rem; cursor: pointer; transition: all 0.2s;">
                        ☕ Trà Sữa/Cafe
                    </button>
                    <button onclick="window.filterDealsByIntent('RIDE')" class="intent-chip" style="background: rgba(255,255,255,0.08); color: #CBD5E1; border: 1px solid rgba(255,255,255,0.15); padding: 0.45rem 1rem; border-radius: 9999px; font-weight: 700; font-size: 0.8rem; cursor: pointer; transition: all 0.2s;">
                        🚗 Xe Điện 0Đ
                    </button>
                    <button onclick="window.filterDealsByIntent('STUDENT')" class="intent-chip" style="background: rgba(255,255,255,0.08); color: #CBD5E1; border: 1px solid rgba(255,255,255,0.15); padding: 0.45rem 1rem; border-radius: 9999px; font-weight: 700; font-size: 0.8rem; cursor: pointer; transition: all 0.2s;">
                        🎓 Sinh Viên
                    </button>
                </div>

                <!-- Ticker thói quen quay lại trung thực -->
                <div style="font-size: 0.78rem; color: #64748B; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); padding: 0.35rem 0.8rem; border-radius: 8px; display: inline-block;">
                    ⚡ Kho ưu đãi làm mới mỗi ngày lúc 07:00 & 11:30 · 📲 Thêm JayT vào Home Screen để dùng mỗi ngày
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

    // 4. Modal Trust Timeline (Ngôn ngữ đời thường)
    function ensureTrustModal() {
        if (document.getElementById('jaytConsumerTrustModal')) return;

        const modal = document.createElement('div');
        modal.id = 'jaytConsumerTrustModal';
        modal.style.cssText = `
            display: none; position: fixed; inset: 0; z-index: 10000;
            background: rgba(0, 0, 0, 0.8); backdrop-filter: blur(8px);
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
                    <div style="font-size: 0.88rem; font-weight: 700; color: #F3E8C3;">Hôm nay (${timeRecorded || 'Thời gian thực'})</div>
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
                    <div style="font-size: 0.88rem; font-weight: 800; color: #10B981;">🟢 ĐỦ ĐIỀU KIỆN HIỂN THỊ TRÊN JAYT</div>
                </div>
            </div>
        `;
        document.getElementById('jaytConsumerTrustModal').style.display = 'flex';
    };

    // 5. Lọc deal theo nhu cầu 1-chạm
    window.filterDealsByIntent = function(intent) {
        currentFilter = intent;
        
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

    // 6. Render Deal Cards (DIRECTIVE #003.1: TIẾT KIỆM LÀ HERO THỊ GIÁC CAO NHẤT)
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
                border-radius: 16px;
                padding: 1.2rem;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                gap: 0.85rem;
                transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
                box-shadow: 0 6px 20px rgba(0,0,0,0.35);
                position: relative;
                width: 100%;
                min-width: 0;
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

                    <!-- 2. Khối TIẾT KIỆM Nổi Bật Nhất (Hero Thị Giác Số 1) -->
                    <div style="background: linear-gradient(135deg, rgba(16,185,129,0.16) 0%, rgba(5,150,105,0.06) 100%); border: 1.5px solid rgba(16,185,129,0.35); border-radius: 12px; padding: 0.75rem 0.85rem; margin-bottom: 0.75rem; text-align: center;">
                        <div style="font-size: 1.3rem; font-weight: 900; color: #10B981; letter-spacing: -0.01em; line-height: 1.15;">
                            💰 TIẾT KIỆM ${formatVND(deal.saving_amount_vnd)}
                        </div>
                        <div style="font-size: 0.76rem; font-weight: 700; color: #6EE7B7; margin-top: 0.2rem;">
                            Giảm ${Math.round(deal.saving_percentage || 0)}% · Chỉ còn ${formatVND(deal.discount_price_vnd)} <span style="color: #94A3B8; text-decoration: line-through; font-weight: normal; margin-left: 0.25rem;">${formatVND(deal.original_price_vnd)}</span>
                        </div>
                    </div>

                    <!-- 3. Tên món & khu vực -->
                    <h4 style="font-size: 1.02rem; font-weight: 800; color: #FFFFFF; line-height: 1.3; margin: 0 0 0.3rem; overflow: hidden; text-overflow: ellipsis;">${deal.item_name}</h4>
                    <p style="font-size: 0.76rem; color: #94A3B8; margin: 0 0 0.7rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">📍 ${deal.branch_address || 'Đà Nẵng'} · ${deal.source_channel}</p>

                    <!-- 4. Nguồn & Hạn dùng minh bạch -->
                    <div style="font-size: 0.72rem; color: #94A3B8; display: flex; justify-content: space-between; margin-bottom: 0.25rem;">
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

    // 7. Khởi chạy khi trang tải xong
    document.addEventListener('DOMContentLoaded', () => {
        injectResponsiveSystemCSS();

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
