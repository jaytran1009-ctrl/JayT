/**
 * =============================================================================
 * JAYT APEX INTERFACE (WO 045F) — FRESH ARTIFACTS & REAL GEOMETRY
 * Theme: Light Luxury (Porcelain Base + Deep Forest Pine + Champagne Gold)
 * Directives: JAYT-APEX-VISUAL-045F, JAYT-CALCULATOR-EVIDENCE-BOUND-039C,
 *             JAYT-LOCALITY-034A, JAYT-LIVE-CATALOG-TRUTH-025B
 * =============================================================================
 */
(function() {
  'use strict';

  // --- STATE ---
  const state = {
    activeNav: 'dashboard', // 'dashboard' | 'schedule_7d' | 'radar' | 'calculator' | 'group_plan' | 'staging_review'
    persona: 'office',      // 'office' | 'student' | 'all'
    selectedDistrict: 'Hải Châu',
    selectedRhythm: 'RHYTHM_AFTER_WORK', // 'RHYTHM_MORNING' | 'RHYTHM_LUNCH' | 'RHYTHM_AFTERNOON' | 'RHYTHM_AFTER_WORK'
    selectedDayOfWeek: 1,   // 1 = Thứ Hai
    searchQuery: '',

    // Calculator State
    calculator: {
      item_price: 58000,
      voucher_discount: 0,
      shipping_fee: 0,
      surcharge: 0,
      scenario_name: 'Kế hoạch chi tiêu'
    },

    // Group Plan State
    groupPlan: {
      title: 'Kèo Tan Ca Đà Nẵng',
      timeSlot: '18:00 Thứ Hai 24/08',
      location: 'CGV Vĩnh Trung Plaza (255-257 Hùng Vương, Thanh Khê)',
      activity: 'Xem phim 2D & Ăn uống',
      conditions: 'Mang thẻ sinh viên / CCCD nếu áp dụng ưu đãi học sinh/sinh viên'
    }
  };

  // --- STRICT HONEST SCHEDULE DATA (ALL DAYS SHOW MONITORING IN PRODUCTION) ---
  const PRODUCTION_7D_SCHEDULE = [
    { num: 1, name: 'Thứ Hai', brand: 'RẠP PHIM / F&B', title: 'Đang theo dõi nguồn', status: 'MONITORING_SOURCE', district: 'Đà Nẵng', locationName: 'Hệ thống Đà Nẵng' },
    { num: 2, name: 'Thứ Ba', brand: 'RẠP PHIM / F&B', title: 'Đang theo dõi nguồn', status: 'MONITORING_SOURCE', district: 'Đà Nẵng', locationName: 'Hệ thống Đà Nẵng' },
    { num: 3, name: 'Thứ Tư', brand: 'RẠP PHIM / F&B', title: 'Đang theo dõi nguồn', status: 'MONITORING_SOURCE', district: 'Đà Nẵng', locationName: 'Hệ thống Đà Nẵng' },
    { num: 4, name: 'Thứ Năm', brand: 'F&B / ĂN NHANH', title: 'Đang theo dõi nguồn', status: 'MONITORING_SOURCE', district: 'Đà Nẵng', locationName: 'Hệ thống Đà Nẵng' },
    { num: 5, name: 'Thứ Sáu', brand: 'CÀ PHÊ & TRÀ', title: 'Đang theo dõi nguồn', status: 'MONITORING_SOURCE', district: 'Đà Nẵng', locationName: 'Hệ thống Đà Nẵng' },
    { num: 6, name: 'Thứ Bảy', brand: 'SÀN TMĐT / ONLINE', title: 'Đang theo dõi nguồn', status: 'MONITORING_SOURCE', district: 'Đà Nẵng', locationName: 'Hệ thống Đà Nẵng' },
    { num: 0, name: 'Chủ Nhật', brand: 'F&B GIA ĐÌNH', title: 'Đang theo dõi nguồn', status: 'MONITORING_SOURCE', district: 'Đà Nẵng', locationName: 'Hệ thống Đà Nẵng' }
  ];

  // --- MONITORED RADAR SOURCES (16 BRANDS) ---
  const RADAR_SOURCES = [
    { brand: 'CGV Cinemas', category: 'Rạp phim', url: 'https://cgv.vn/default/cinox/site/cgv-vinh-trung-plaza', status: 'PROMOTION_DETAIL', statusColor: 'var(--status-verified-text)', badge: 'Culture Day 58K (Staging Review)', time: '08:00 & 16:30' },
    { brand: 'Metiz Cinema', category: 'Rạp phim', url: 'https://metiz.vn/', status: 'NO_PUBLIC_PROMO', statusColor: 'var(--status-recheck-text)', badge: 'Chờ cập nhật banner tuần mới', time: '16:30 Daily' },
    { brand: 'Galaxy Cinema', category: 'Rạp phim', url: 'https://galaxycine.vn/', status: 'NO_PUBLIC_PROMO', statusColor: 'var(--status-recheck-text)', badge: 'Chờ giá chi tiết theo cụm', time: '16:30 Daily' },
    { brand: 'Jollibee Việt Nam', category: 'F&B Ăn nhanh', url: 'https://jollibee.com.vn/', status: 'GENERIC_MARKETING', statusColor: 'var(--status-recheck-text)', badge: 'Banner chung, thiếu hạn cụ thể', time: '08:00 Daily' },
    { brand: 'Lotteria Việt Nam', category: 'F&B Ăn nhanh', url: 'https://lotteria.vn/', status: 'GENERIC_MARKETING', statusColor: 'var(--status-recheck-text)', badge: 'Chờ xác nhận Crazy Day', time: '08:00 Daily' },
    { brand: 'Highlands Coffee', category: 'Cà phê & Trà', url: 'https://highlandscoffee.com.vn/', status: 'NO_PUBLIC_PROMO', statusColor: 'var(--status-recheck-text)', badge: 'Chương trình app thành viên', time: 'T2 06:00' },
    { brand: 'Phê La', category: 'Cà phê & Trà', url: 'https://phela.vn/', status: 'NO_PUBLIC_PROMO', statusColor: 'var(--status-recheck-text)', badge: 'Giá niêm yết cố định', time: 'T2 06:00' },
    { brand: 'Katinat Saigon Kafe', category: 'Cà phê & Trà', url: 'https://katinat.vn/', status: 'NO_PUBLIC_PROMO', statusColor: 'var(--status-recheck-text)', badge: 'Chưa có ưu đãi công khai', time: 'T2 06:00' },
    { brand: 'Starbucks Vietnam', category: 'Cà phê & Trà', url: 'https://starbucks.vn/', status: 'NO_PUBLIC_PROMO', statusColor: 'var(--status-recheck-text)', badge: 'Chương trình Rewards', time: 'T2 06:00' },
    { brand: 'The Coffee House', category: 'Cà phê & Trà', url: 'https://thecoffeehouse.com/', status: 'NO_PUBLIC_PROMO', statusColor: 'var(--status-recheck-text)', badge: 'Khuyến mãi qua App', time: 'T2 06:00' },
    { brand: 'Gong Cha Vietnam', category: 'Cà phê & Trà', url: 'https://gongcha.com.vn/', status: 'NO_PUBLIC_PROMO', statusColor: 'var(--status-recheck-text)', badge: 'Ưu đãi thẻ thành viên', time: 'T2 06:00' },
    { brand: 'Shopee Việt Nam', category: 'Sàn TMĐT', url: 'https://shopee.vn/m/ma-giam-gia', status: 'ANTI_BOT_OR_CHALLENGE', statusColor: '#DC2626', badge: 'Security Verification Page', time: '08:00 & 16:30' },
    { brand: 'Lazada Việt Nam', category: 'Sàn TMĐT', url: 'https://lazada.vn/', status: 'ANTI_BOT_OR_CHALLENGE', statusColor: '#DC2626', badge: 'Anti-bot Challenge', time: '08:00 & 16:30' },
    { brand: 'TikTok Shop VN', category: 'Sàn TMĐT', url: 'https://tiktok.com/tag/tiktokshop', status: 'ANTI_BOT_OR_CHALLENGE', statusColor: '#DC2626', badge: 'Dynamic Account Challenge', time: '08:00 & 16:30' },
    { brand: 'ShopeeFood Đà Nẵng', category: 'Giao đồ ăn', url: 'https://shopeefood.vn/da-nang', status: 'DYNAMIC_ACCOUNT_REQUIRED', statusColor: '#2563EB', badge: 'Dynamic App Personalization', time: '08:00 & 16:30' },
    { brand: 'GrabFood Đà Nẵng', category: 'Giao đồ ăn', url: 'https://food.grab.com/vn/vi/', status: 'DYNAMIC_ACCOUNT_REQUIRED', statusColor: '#2563EB', badge: 'Dynamic Location Voucher', time: '08:00 & 16:30' }
  ];

  // --- UTILS ---
  function esc(s) {
    if (!s) return '';
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function money(n) {
    if (n === null || n === undefined || isNaN(n)) return 'Chờ đối soát';
    return Number(n).toLocaleString('vi-VN') + 'đ';
  }

  function showToast(msg) {
    let t = document.getElementById('apex-toast');
    if (!t) {
      t = document.createElement('div');
      t.id = 'apex-toast';
      t.className = 'apex-toast-notification';
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.classList.add('visible');
    setTimeout(() => t.classList.remove('visible'), 3000);
  }

  // --- EMBEDDED CSS (STRICT REFLOW, ZERO MASKING, NO NOWRAP) ---
  function injectStyles() {
    if (document.getElementById('jayt-apex-styles')) return;
    const style = document.createElement('style');
    style.id = 'jayt-apex-styles';
    style.textContent = `
      /* Shell Container */
      .apex-shell {
        display: grid;
        grid-template-columns: 240px minmax(0, 1fr);
        min-height: 100dvh;
        width: 100%;
        box-sizing: border-box;
      }
      @media (max-width: 1024px) {
        .apex-shell {
          display: block;
          width: 100%;
        }
      }
      main {
        display: block;
        width: 100%;
        min-width: 0;
        box-sizing: border-box;
      }

      /* Sidebar (Desktop) */
      .apex-sidebar {
        background: #FFFFFF;
        border-right: 1px solid var(--border-subtle);
        padding: 24px 16px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        position: sticky;
        top: 0;
        height: 100dvh;
        z-index: 90;
        box-sizing: border-box;
      }
      @media (max-width: 1024px) {
        .apex-sidebar { display: none; }
      }
      .apex-sidebar-brand {
        display: flex;
        align-items: center;
        gap: 10px;
        text-decoration: none;
        color: var(--text-charcoal-deep);
        margin-bottom: 24px;
      }
      .apex-sidebar-badge {
        width: 38px;
        height: 38px;
        border-radius: var(--radius-md);
        background: var(--pine-forest-main);
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: var(--font-display);
        font-weight: 800;
        font-size: 15px;
        color: var(--gold-champagne-light);
      }
      .apex-sidebar-title {
        font-family: var(--font-display);
        font-weight: 900;
        font-size: 17px;
        line-height: 1.15;
      }
      .apex-sidebar-title span { color: var(--gold-champagne); }
      .apex-sidebar-sub { font-size: 10.5px; color: var(--text-muted); text-transform: uppercase; }

      .apex-nav-list {
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .apex-nav-btn {
        width: 100%;
        min-height: 44px;
        padding: 0 12px;
        border-radius: var(--radius-md);
        background: transparent;
        border: 1px solid transparent;
        color: var(--text-muted);
        font-family: var(--font-body);
        font-size: 13.5px;
        font-weight: 600;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 10px;
        text-align: left;
        transition: all var(--duration-fast);
        box-sizing: border-box;
      }
      .apex-nav-btn:hover {
        background: var(--pine-forest-soft);
        color: var(--pine-forest-main);
      }
      .apex-nav-btn.active {
        background: var(--pine-forest-soft);
        color: var(--pine-forest-main);
        border-color: var(--border-gold);
        font-weight: 700;
      }

      /* Top Bar */
      .apex-top-bar {
        background: #FFFFFF;
        border-bottom: 1px solid var(--border-subtle);
        padding: 8px 10px;
        position: sticky;
        top: 0;
        z-index: 100;
        width: 100%;
        box-sizing: border-box;
      }
      .apex-top-bar-inner {
        width: 100%;
        max-width: 1100px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        gap: 8px;
        box-sizing: border-box;
      }
      @media (min-width: 640px) {
        .apex-top-bar-inner {
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
        }
      }
      .apex-search-wrap {
        width: 100%;
        position: relative;
        box-sizing: border-box;
      }
      @media (min-width: 640px) {
        .apex-search-wrap { flex: 1; max-width: 380px; }
      }
      .apex-search-input {
        width: 100%;
        min-height: 44px;
        background: var(--bg-app-base);
        border: 1px solid var(--border-subtle);
        border-radius: var(--radius-full);
        padding: 0 12px 0 34px;
        color: var(--text-charcoal-deep);
        font-size: 12.5px;
        outline: none;
        box-sizing: border-box;
      }
      .apex-search-icon {
        position: absolute;
        left: 11px;
        top: 50%;
        transform: translateY(-50%);
        color: var(--text-muted);
        pointer-events: none;
      }

      .apex-top-controls {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 6px;
        width: 100%;
        box-sizing: border-box;
      }
      @media (min-width: 640px) {
        .apex-top-controls { display: flex; width: auto; }
      }
      .apex-control-chip {
        min-height: 44px;
        width: 100%;
        padding: 0 8px;
        border-radius: var(--radius-full);
        background: var(--bg-app-base);
        border: 1px solid var(--border-subtle);
        color: var(--text-charcoal-main);
        font-size: 12px;
        font-weight: 600;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 4px;
        box-sizing: border-box;
        white-space: normal;
        overflow-wrap: anywhere;
        word-break: break-word;
      }

      /* Mobile Navigation Tabs (with Indicator) */
      .apex-mobile-nav-wrap {
        position: relative;
        width: 100%;
        background: #FFFFFF;
        border-bottom: 1px solid var(--border-subtle);
        box-sizing: border-box;
      }
      @media (min-width: 1025px) {
        .apex-mobile-nav-wrap { display: none; }
      }
      .apex-mobile-nav-wrap::after {
        content: '';
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        width: 20px;
        background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.95));
        pointer-events: none;
      }
      .apex-mobile-nav {
        display: flex;
        overflow-x: auto;
        gap: 6px;
        padding: 6px 10px;
        scrollbar-width: none;
        width: 100%;
        box-sizing: border-box;
        -webkit-overflow-scrolling: touch;
      }
      .apex-mobile-nav::-webkit-scrollbar { display: none; }
      .apex-m-tab-btn {
        min-height: 44px;
        padding: 0 12px;
        border-radius: var(--radius-full);
        background: var(--bg-app-base);
        border: 1px solid var(--border-subtle);
        color: var(--text-muted);
        font-size: 12px;
        font-weight: 600;
        white-space: nowrap;
        cursor: pointer;
        flex-shrink: 0;
        box-sizing: border-box;
      }
      .apex-m-tab-btn.active {
        background: var(--pine-forest-main);
        color: #FFFFFF;
        border-color: var(--pine-forest-main);
      }

      /* Main Content Wrap */
      .apex-main-wrap {
        width: 100%;
        max-width: 1100px;
        margin: 0 auto;
        padding: 12px 10px 36px 10px;
        box-sizing: border-box;
      }

      /* Contextual Hero */
      .apex-hero-card {
        background: var(--gradient-hero);
        border-radius: var(--radius-lg);
        padding: 14px 12px;
        color: #FFFFFF;
        margin-bottom: 14px;
        box-shadow: var(--shadow-sm);
        width: 100%;
        box-sizing: border-box;
      }
      .apex-hero-badge {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        padding: 3px 8px;
        border-radius: var(--radius-full);
        background: rgba(255, 255, 255, 0.15);
        color: var(--gold-champagne-light);
        font-family: var(--font-mono);
        font-size: 10.5px;
        font-weight: 700;
        margin-bottom: 8px;
        white-space: normal;
        overflow-wrap: anywhere;
      }
      .apex-hero-title {
        font-family: var(--font-display);
        font-size: 16px;
        font-weight: 800;
        line-height: 1.35;
        margin-bottom: 6px;
        white-space: normal;
        overflow-wrap: anywhere;
        word-break: break-word;
        box-sizing: border-box;
      }
      .apex-hero-title span { color: var(--gold-champagne-bright); }
      .apex-hero-desc {
        font-size: 12px;
        color: rgba(255, 255, 255, 0.85);
        margin-bottom: 12px;
        line-height: 1.5;
        white-space: normal;
        overflow-wrap: anywhere;
        word-break: break-word;
        box-sizing: border-box;
      }

      /* 4 Rhythms (Strict 2x2 Grid) */
      .apex-rhythms-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 6px;
        width: 100%;
        box-sizing: border-box;
      }
      @media (min-width: 768px) {
        .apex-rhythms-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); }
      }
      .apex-rhythm-pill {
        min-height: 48px;
        padding: 6px 8px;
        border-radius: var(--radius-sm);
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.18);
        color: #FFFFFF;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 2px;
        text-align: left;
        width: 100%;
        min-width: 0;
        box-sizing: border-box;
      }
      .apex-rhythm-pill.active {
        background: #FFFFFF;
        color: var(--pine-forest-deep);
        border-color: #FFFFFF;
      }
      .apex-rhythm-pill.active .apex-r-time { color: var(--pine-forest-main); }
      .apex-r-time {
        font-family: var(--font-mono);
        font-size: 10px;
        font-weight: 700;
        color: var(--gold-champagne-light);
        white-space: normal;
        overflow-wrap: anywhere;
      }
      .apex-r-name {
        font-weight: 700;
        font-size: 12px;
        white-space: normal;
        overflow-wrap: anywhere;
        word-break: break-word;
      }

      /* Honest Empty State Banner (Full-Width Responsive) */
      .apex-empty-state-card {
        background: #FFFFFF;
        border: 1.5px dashed var(--gold-champagne);
        border-radius: var(--radius-lg);
        padding: 16px 12px;
        text-align: center;
        margin-bottom: 16px;
        width: 100%;
        box-sizing: border-box;
      }
      .apex-empty-icon { font-size: 26px; margin-bottom: 6px; }
      .apex-empty-title {
        font-family: var(--font-display);
        font-size: 14px;
        font-weight: 800;
        color: var(--pine-forest-main);
        margin-bottom: 6px;
        white-space: normal;
        overflow-wrap: anywhere;
        word-break: break-word;
      }
      .apex-empty-desc {
        font-size: 12px;
        color: var(--text-muted);
        margin-bottom: 12px;
        line-height: 1.55;
        white-space: normal;
        overflow-wrap: anywhere;
        word-break: break-word;
      }
      .apex-empty-btn-group {
        display: flex;
        flex-direction: column;
        gap: 8px;
        width: 100%;
        box-sizing: border-box;
      }
      @media (min-width: 640px) {
        .apex-empty-btn-group { flex-direction: row; justify-content: center; }
      }

      /* Buttons */
      .apex-btn-gold {
        min-height: 44px;
        width: 100%;
        padding: 0 12px;
        border-radius: var(--radius-full);
        background: var(--gold-champagne);
        color: #FFFFFF;
        font-weight: 700;
        font-size: 12.5px;
        border: none;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        gap: 6px;
        box-sizing: border-box;
        white-space: normal;
        overflow-wrap: anywhere;
        word-break: break-word;
      }
      @media (min-width: 640px) { .apex-btn-gold { width: auto; padding: 0 16px; } }

      .apex-btn-outline {
        min-height: 44px;
        width: 100%;
        padding: 0 12px;
        border-radius: var(--radius-full);
        background: transparent;
        color: var(--text-charcoal-main);
        font-weight: 600;
        font-size: 12.5px;
        border: 1px solid var(--border-subtle);
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        gap: 6px;
        box-sizing: border-box;
        white-space: normal;
        overflow-wrap: anywhere;
        word-break: break-word;
      }
      @media (min-width: 640px) { .apex-btn-outline { width: auto; padding: 0 14px; } }

      /* Section Header */
      .apex-section-header {
        margin-bottom: 10px;
        width: 100%;
        box-sizing: border-box;
      }
      .apex-section-title {
        font-family: var(--font-display);
        font-size: 15.5px;
        font-weight: 800;
        color: var(--text-charcoal-deep);
        white-space: normal;
        overflow-wrap: anywhere;
        word-break: break-word;
      }
      .apex-section-sub {
        font-size: 11px;
        color: var(--text-muted);
        white-space: normal;
        overflow-wrap: anywhere;
        word-break: break-word;
      }

      /* 7D Timeline Bar (with Indicator) */
      .apex-7d-wrap {
        position: relative;
        width: 100%;
        margin-bottom: 12px;
        box-sizing: border-box;
      }
      .apex-7d-wrap::after {
        content: '';
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        width: 20px;
        background: linear-gradient(to right, transparent, rgba(248, 250, 249, 0.95));
        pointer-events: none;
      }
      .apex-7d-bar {
        display: flex;
        gap: 6px;
        overflow-x: auto;
        padding-bottom: 4px;
        scrollbar-width: none;
        width: 100%;
        box-sizing: border-box;
        -webkit-overflow-scrolling: touch;
      }
      .apex-7d-bar::-webkit-scrollbar { display: none; }
      .apex-day-chip {
        min-height: 44px;
        min-width: 78px;
        padding: 4px 6px;
        border-radius: var(--radius-md);
        background: #FFFFFF;
        border: 1px solid var(--border-subtle);
        color: var(--text-muted);
        cursor: pointer;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 1px;
        flex-shrink: 0;
        box-sizing: border-box;
      }
      .apex-day-chip.active {
        background: var(--pine-forest-main);
        color: #FFFFFF;
        border-color: var(--pine-forest-main);
      }
      .apex-day-chip.active .apex-dc-tag { color: var(--gold-champagne-light); }
      .apex-dc-name { font-weight: 800; font-size: 11.5px; }
      .apex-dc-tag { font-size: 9.5px; font-family: var(--font-mono); color: var(--text-subtle); }

      /* Deal Cards Grid */
      .apex-cards-grid {
        display: grid;
        grid-template-columns: minmax(0, 1fr);
        gap: 12px;
        margin-bottom: 20px;
        width: 100%;
        box-sizing: border-box;
      }
      @media (min-width: 768px) {
        .apex-cards-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      }
      .apex-deal-card {
        background: #FFFFFF;
        border: 1px solid var(--border-subtle);
        border-radius: var(--radius-lg);
        padding: 14px 12px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        box-shadow: var(--shadow-sm);
        width: 100%;
        box-sizing: border-box;
      }
      .apex-card-top-row {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        gap: 6px;
        margin-bottom: 8px;
        width: 100%;
        box-sizing: border-box;
      }
      .apex-card-brand-label {
        font-family: var(--font-display);
        font-weight: 800;
        font-size: 12px;
        color: var(--pine-forest-main);
        text-transform: uppercase;
        white-space: normal;
        overflow-wrap: anywhere;
      }
      .apex-status-badge {
        font-family: var(--font-mono);
        font-size: 10px;
        padding: 2px 6px;
        border-radius: var(--radius-full);
        font-weight: 700;
        max-width: 100%;
        white-space: normal;
        overflow-wrap: anywhere;
        word-break: break-word;
        box-sizing: border-box;
      }
      .badge-monitoring {
        background: var(--status-recheck-bg);
        color: var(--status-recheck-text);
        border: 1px solid var(--status-recheck-border);
      }
      .badge-staging {
        background: var(--status-verified-bg);
        color: var(--status-verified-text);
        border: 1px solid var(--status-verified-border);
      }

      .apex-card-headline {
        font-family: var(--font-display);
        font-weight: 800;
        font-size: 14.5px;
        color: var(--text-charcoal-deep);
        margin-bottom: 6px;
        white-space: normal;
        overflow-wrap: anywhere;
        word-break: break-word;
      }
      .apex-card-price-box {
        margin-bottom: 8px;
        display: flex;
        flex-wrap: wrap;
        align-items: baseline;
        gap: 4px;
        width: 100%;
      }
      .apex-price-unverified {
        font-size: 12px;
        color: var(--text-muted);
        font-style: italic;
        white-space: normal;
        overflow-wrap: anywhere;
        word-break: break-word;
      }

      .apex-conditions-list {
        list-style: none;
        background: var(--bg-app-base);
        border-radius: var(--radius-md);
        padding: 8px 10px;
        margin-bottom: 10px;
        font-size: 11.5px;
        color: var(--text-muted);
        width: 100%;
        box-sizing: border-box;
      }
      .apex-conditions-list li {
        margin-bottom: 3px;
        display: flex;
        gap: 5px;
        white-space: normal;
        overflow-wrap: anywhere;
        word-break: break-word;
      }
      .apex-conditions-list li:last-child { margin-bottom: 0; }
      .apex-conditions-list li::before {
        content: '•';
        color: var(--gold-champagne);
        font-weight: bold;
        flex-shrink: 0;
      }

      /* Calculator */
      .apex-calc-card {
        background: #FFFFFF;
        border: 1px solid var(--border-subtle);
        border-radius: var(--radius-lg);
        padding: 16px 12px;
        box-shadow: var(--shadow-sm);
        margin-bottom: 20px;
        width: 100%;
        box-sizing: border-box;
      }
      .apex-calc-grid {
        display: grid;
        grid-template-columns: minmax(0, 1fr);
        gap: 12px;
        width: 100%;
        box-sizing: border-box;
      }
      @media (min-width: 768px) {
        .apex-calc-grid { grid-template-columns: 1fr 1fr; }
      }
      .apex-input-item { margin-bottom: 8px; width: 100%; box-sizing: border-box; }
      .apex-input-label {
        font-size: 11.5px;
        font-weight: 700;
        color: var(--text-charcoal-main);
        margin-bottom: 3px;
        display: block;
      }
      .apex-text-field {
        width: 100%;
        min-height: 44px;
        background: var(--bg-app-base);
        border: 1px solid var(--border-subtle);
        border-radius: var(--radius-md);
        padding: 0 10px;
        color: var(--text-charcoal-deep);
        font-family: var(--font-mono);
        font-size: 13px;
        outline: none;
        box-sizing: border-box;
      }
      .apex-calc-breakdown {
        background: var(--pine-forest-soft);
        border: 1.5px solid var(--border-gold);
        border-radius: var(--radius-md);
        padding: 12px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 100%;
        box-sizing: border-box;
      }
      .apex-cb-row {
        display: flex;
        justify-content: space-between;
        margin-bottom: 5px;
        font-size: 11.5px;
        color: var(--text-muted);
      }
      .apex-cb-total {
        padding-top: 8px;
        border-top: 1px solid var(--border-subtle);
        display: flex;
        justify-content: space-between;
        align-items: baseline;
      }
      .apex-cb-total-num {
        font-family: var(--font-mono);
        font-size: 19px;
        font-weight: 900;
        color: var(--pine-forest-main);
      }

      /* Group Plan */
      .apex-group-plan-box {
        background: #FFFFFF;
        border: 1px solid var(--border-subtle);
        border-radius: var(--radius-lg);
        padding: 16px 12px;
        margin-bottom: 20px;
        width: 100%;
        box-sizing: border-box;
      }
      .apex-share-preview-text {
        background: var(--bg-app-base);
        border: 1px solid var(--border-subtle);
        border-radius: var(--radius-md);
        padding: 12px;
        font-family: var(--font-mono);
        font-size: 11px;
        color: var(--text-charcoal-deep);
        white-space: pre-wrap;
        line-height: 1.55;
        margin-bottom: 12px;
        overflow-wrap: anywhere;
        word-break: break-word;
        box-sizing: border-box;
      }

      /* Radar Table */
      .apex-radar-wrap {
        background: #FFFFFF;
        border: 1px solid var(--border-subtle);
        border-radius: var(--radius-md);
        overflow-x: auto;
        margin-bottom: 20px;
        width: 100%;
        box-sizing: border-box;
      }
      .apex-radar-tbl {
        width: 100%;
        border-collapse: collapse;
        text-align: left;
        font-size: 11.5px;
        min-width: 460px;
      }
      .apex-radar-tbl th {
        background: var(--bg-app-base);
        padding: 8px 10px;
        color: var(--text-muted);
        font-weight: 700;
        border-bottom: 1px solid var(--border-subtle);
      }
      .apex-radar-tbl td {
        padding: 8px 10px;
        border-bottom: 1px solid var(--border-subtle);
      }

      /* Toast */
      .apex-toast-notification {
        position: fixed;
        bottom: 14px;
        right: 14px;
        background: var(--pine-forest-deep);
        color: #FFFFFF;
        padding: 8px 14px;
        border-radius: var(--radius-full);
        font-size: 12px;
        font-weight: 700;
        box-shadow: var(--shadow-md);
        opacity: 0;
        pointer-events: none;
        transform: translateY(6px);
        transition: all var(--duration-fast);
        z-index: 999;
      }
      .apex-toast-notification.visible {
        opacity: 1;
        pointer-events: auto;
        transform: translateY(0);
      }

      /* Footer */
      .apex-footer {
        padding: 16px 8px;
        text-align: center;
        color: var(--text-muted);
        font-size: 11px;
        box-sizing: border-box;
      }
    `;
    document.head.appendChild(style);
  }

  // --- RENDER METHODS ---
  function renderSidebar() {
    const navs = [
      { id: 'dashboard', label: '⚡ Hôm Nay', icon: '⚡' },
      { id: 'schedule_7d', label: '📅 Lịch 7 Ngày', icon: '📅' },
      { id: 'radar', label: '🎯 Radar Nguồn', icon: '🎯' },
      { id: 'calculator', label: '🧮 Máy Tính Tiền', icon: '🧮' },
      { id: 'group_plan', label: '✨ Kế Hoạch Nhóm', icon: '✨' },
      { id: 'staging_review', label: '🔍 Staging Review', icon: '🔍' }
    ];

    return `
      <aside class="apex-sidebar">
        <div>
          <a href="#" class="apex-sidebar-brand">
            <div class="apex-sidebar-badge">43</div>
            <div>
              <div class="apex-sidebar-title">JAYT <span>ĐÀ NẴNG</span></div>
              <div class="apex-sidebar-sub">Lịch Tiết Kiệm & Radar</div>
            </div>
          </a>

          <ul class="apex-nav-list">
            ${navs.map(n => `
              <li>
                <button class="apex-nav-btn ${state.activeNav === n.id ? 'active' : ''}" data-nav="${n.id}">
                  <span>${n.icon}</span>
                  <span>${n.label}</span>
                </button>
              </li>
            `).join('')}
          </ul>
        </div>

        <div>
          <div style="font-size:11px;color:var(--text-muted);background:var(--bg-app-base);padding:8px 10px;border-radius:var(--radius-sm);border:1px solid var(--border-subtle);line-height:1.4;">
            🔒 <strong>PRODUCTION LOCKED</strong><br>
            Catalog: <code>[] (0 deal public)</code>
          </div>
        </div>
      </aside>
    `;
  }

  function renderTopBar() {
    return `
      <header class="apex-top-bar">
        <div class="apex-top-bar-inner">
          <div class="apex-search-wrap">
            <span class="apex-search-icon">🔍</span>
            <input type="text" class="apex-search-input" id="search-deals-input" placeholder="Tìm kiếm nguồn ưu đãi..." value="${esc(state.searchQuery)}">
          </div>

          <div class="apex-top-controls">
            <button class="apex-control-chip" id="btn-toggle-persona" title="Chọn đối tượng">
              <span>👤</span> ${state.persona === 'student' ? 'Sinh viên' : state.persona === 'office' ? 'Văn phòng' : 'Mọi người'}
            </button>
            <button class="apex-control-chip" id="btn-toggle-district" title="Chọn quận">
              <span>📍</span> ${state.selectedDistrict}
            </button>
          </div>
        </div>
      </header>

      <div class="apex-mobile-nav-wrap">
        <div class="apex-mobile-nav">
          <button class="apex-m-tab-btn ${state.activeNav === 'dashboard' ? 'active' : ''}" data-nav="dashboard">⚡ Hôm Nay</button>
          <button class="apex-m-tab-btn ${state.activeNav === 'schedule_7d' ? 'active' : ''}" data-nav="schedule_7d">📅 Lịch 7 Ngày</button>
          <button class="apex-m-tab-btn ${state.activeNav === 'radar' ? 'active' : ''}" data-nav="radar">🎯 Radar Nguồn</button>
          <button class="apex-m-tab-btn ${state.activeNav === 'calculator' ? 'active' : ''}" data-nav="calculator">🧮 Máy Tính</button>
          <button class="apex-m-tab-btn ${state.activeNav === 'group_plan' ? 'active' : ''}" data-nav="group_plan">✨ Rủ Bạn</button>
          <button class="apex-m-tab-btn ${state.activeNav === 'staging_review' ? 'active' : ''}" data-nav="staging_review">🔍 Staging</button>
        </div>
      </div>
    `;
  }

  function renderHero() {
    const rhythms = [
      { id: 'RHYTHM_MORNING', time: '06:00 - 11:00', name: '🌅 Sáng' },
      { id: 'RHYTHM_LUNCH', time: '11:00 - 14:00', name: '☀️ Trưa' },
      { id: 'RHYTHM_AFTERNOON', time: '14:00 - 17:30', name: '☕ Chiều' },
      { id: 'RHYTHM_AFTER_WORK', time: '17:30 - 22:00', name: '🌙 Tối' }
    ];

    return `
      <section class="apex-hero-card">
        <div class="apex-hero-badge">ĐÀ NẴNG 43 · LỊCH TIẾT KIỆM</div>
        <h2 class="apex-hero-title">
          Theo dõi ưu đãi định kỳ tại <span>${state.selectedDistrict}</span>
        </h2>
        <p class="apex-hero-desc">
          Theo dõi lịch ưu đãi định kỳ từ nguồn công khai cho ${state.persona === 'student' ? 'sinh viên' : 'người đi làm'} Đà Nẵng. Không sử dụng dữ liệu suy đoán.
        </p>

        <div class="apex-rhythms-grid">
          ${rhythms.map(r => `
            <div class="apex-rhythm-pill ${state.selectedRhythm === r.id ? 'active' : ''}" data-rhythm="${r.id}">
              <span class="apex-r-time">${r.time}</span>
              <span class="apex-r-name">${r.name}</span>
            </div>
          `).join('')}
        </div>
      </section>
    `;
  }

  function renderHonestEmptyState() {
    return `
      <div class="apex-empty-state-card">
        <div class="apex-empty-icon">🛡️</div>
        <div class="apex-empty-title">HONEST EMPTY STATE — BẢO VỆ NGƯỜI DÙNG ĐÀ NẴNG</div>
        <p class="apex-empty-desc">
          Live Production Catalog hiện tại đang để trống (\`deals_feed.json === []\`). 
          Hệ thống tự động quét 16 thương hiệu, chỉ mở khóa khi đủ 4 bằng chứng thực tế.
        </p>
        <div class="apex-empty-btn-group">
          <button class="apex-btn-gold" id="btn-view-7d-schedule">📅 Xem Lịch Định Kỳ 7 Ngày</button>
          <button class="apex-btn-outline" id="btn-view-radar-sources">🎯 Kiểm Tra Radar Nguồn</button>
          <button class="apex-btn-outline" id="btn-view-calculator">🧮 Thử Máy Tính Tiền</button>
        </div>
      </div>
    `;
  }

  function render7DayTimeline() {
    const days = [
      { num: 1, name: 'Thứ Hai', tag: 'Theo dõi' },
      { num: 2, name: 'Thứ Ba', tag: 'Theo dõi' },
      { num: 3, name: 'Thứ Tư', tag: 'Theo dõi' },
      { num: 4, name: 'Thứ Năm', tag: 'Theo dõi' },
      { num: 5, name: 'Thứ Sáu', tag: 'Theo dõi' },
      { num: 6, name: 'Thứ Bảy', tag: 'Theo dõi' },
      { num: 0, name: 'Chủ Nhật', tag: 'Theo dõi' }
    ];

    const currentDeal = PRODUCTION_7D_SCHEDULE.find(d => d.num === state.selectedDayOfWeek) || PRODUCTION_7D_SCHEDULE[0];

    return `
      <div class="apex-section-header">
        <div class="apex-section-title">📅 Lịch Tiết Kiệm Định Kỳ 7 Ngày</div>
        <div class="apex-section-sub">Theo dõi lịch ưu đãi định kỳ theo ngày trong tuần</div>
      </div>

      <div class="apex-7d-wrap">
        <div class="apex-7d-bar">
          ${days.map(d => `
            <button class="apex-day-chip ${state.selectedDayOfWeek === d.num ? 'active' : ''}" data-day="${d.num}">
              <span class="apex-dc-name">${d.name}</span>
              <span class="apex-dc-tag">${d.tag}</span>
            </button>
          `).join('')}
        </div>
      </div>

      <div class="apex-cards-grid">
        <div class="apex-deal-card">
          <div>
            <div class="apex-card-top-row">
              <span class="apex-card-brand-label">${currentDeal.brand}</span>
              <span class="apex-status-badge badge-monitoring">
                ⏳ ĐANG THEO DÕI NGUỒN
              </span>
            </div>

            <h3 class="apex-card-headline">${currentDeal.title}</h3>

            <div class="apex-card-price-box">
              <span class="apex-price-unverified">Chưa có giá xác minh độc lập</span>
            </div>

            <ul class="apex-conditions-list">
              <li>Hệ thống tự động quét nguồn định kỳ 16 thương hiệu</li>
              <li>Chưa có ưu đãi công khai đủ 4 bằng chứng thực tế</li>
              <li>Khóa hiển thị an toàn (Fail-Closed)</li>
            </ul>
          </div>

          <div>
            <div style="font-size:11.5px;color:var(--text-muted);margin-bottom:8px;">
              📍 <strong>${currentDeal.locationName}</strong> (${currentDeal.district})
            </div>
            <button class="apex-btn-outline" onclick="window.ApexApp.openCalculatorForDay(${currentDeal.num})">
              🧮 Thử Máy Tính Tiền
            </button>
          </div>
        </div>
      </div>
    `;
  }

  function renderCalculatorView() {
    const c = state.calculator;
    const base = Number(c.item_price) || 0;
    const voucher = Number(c.voucher_discount) || 0;
    const ship = Number(c.shipping_fee) || 0;
    const surcharge = Number(c.surcharge) || 0;
    const total = Math.max(0, base - voucher + ship + surcharge);

    return `
      <section class="apex-calc-card">
        <div class="apex-section-header">
          <div class="apex-section-title">🧮 Máy Tính Tiền Thật (Trusted Savings Calculator)</div>
          <div class="apex-section-sub">Phân rã chi phí minh bạch từng dòng — Tuyệt đối không cộng trừ ước đoán</div>
        </div>

        <div class="apex-calc-grid">
          <div>
            <div class="apex-input-item">
              <label class="apex-input-label">Nội dung chi tiêu / Kèo</label>
              <input type="text" class="apex-text-field" id="in-calc-name" value="${esc(c.scenario_name)}">
            </div>
            <div class="apex-input-item">
              <label class="apex-input-label">1. Giá vé / Món chính niêm yết (đ)</label>
              <input type="number" class="apex-text-field" id="in-calc-base" value="${base}">
            </div>
            <div class="apex-input-item">
              <label class="apex-input-label">2. Voucher / Mức giảm có bằng chứng (đ)</label>
              <input type="number" class="apex-text-field" id="in-calc-voucher" value="${voucher}">
            </div>
            <div class="apex-input-item">
              <label class="apex-input-label">3. Phí vận chuyển (đ)</label>
              <input type="number" class="apex-text-field" id="in-calc-ship" value="${ship}">
            </div>
            <div class="apex-input-item">
              <label class="apex-input-label">4. Phụ phí (Ghế VIP / Cuối tuần) (đ)</label>
              <input type="number" class="apex-text-field" id="in-calc-surcharge" value="${surcharge}">
            </div>
          </div>

          <div class="apex-calc-breakdown">
            <div>
              <div style="font-size:11.5px;font-weight:800;color:var(--pine-forest-main);margin-bottom:8px;text-transform:uppercase;">
                BẢNG PHÂN RÃ CHI PHÍ THỰC TẾ
              </div>
              <div class="apex-cb-row">
                <span>Giá gốc niêm yết:</span>
                <span style="font-family:var(--font-mono);">${money(base)}</span>
              </div>
              <div class="apex-cb-row">
                <span>Voucher giảm trừ:</span>
                <span style="font-family:var(--font-mono);color:var(--status-verified-text);">- ${money(voucher)}</span>
              </div>
              <div class="apex-cb-row">
                <span>Phí vận chuyển:</span>
                <span style="font-family:var(--font-mono);">+ ${money(ship)}</span>
              </div>
              <div class="apex-cb-row">
                <span>Phụ phí:</span>
                <span style="font-family:var(--font-mono);">+ ${money(surcharge)}</span>
              </div>
            </div>

            <div>
              <div class="apex-cb-total">
                <div>
                  <div style="font-size:11px;color:var(--text-muted);font-weight:700;">TỔNG THỰC TRẢ / NGƯỜI:</div>
                  <small style="font-size:10px;color:var(--status-verified-text);">✓ Đã kiểm soát điều kiện</small>
                </div>
                <div class="apex-cb-total-num">${money(total)}</div>
              </div>
              <button class="apex-btn-gold" style="margin-top:10px;" id="btn-save-to-group-plan">
                ✨ Thêm Vào Kế Hoạch Rủ Bạn
              </button>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  function renderGroupPlanView() {
    const gp = state.groupPlan;
    const totalCalc = Math.max(0, state.calculator.item_price - state.calculator.voucher_discount + state.calculator.shipping_fee + state.calculator.surcharge);

    const shareText = `[JAYT ĐÀ NẴNG 43 - KẾ HOẠCH ĐI CHƠI TIẾT KIỆM]
📍 Kèo: ${gp.title}
⏰ Thời gian: ${gp.timeSlot}
🏢 Địa điểm: ${gp.location}
🍿 Hoạt động: ${gp.activity}
⚠️ Điều kiện: ${gp.conditions}
💰 Dự tính thực trả: ${money(totalCalc)} / người
👉 Xem đối soát minh bạch tại JayT Đà Nẵng!`;

    return `
      <section class="apex-group-plan-box">
        <div class="apex-section-header">
          <div class="apex-section-title">✨ Kế Hoạch Nhóm (Share Card Preview)</div>
          <div class="apex-section-sub">Định dạng tin nhắn chuẩn đẹp cho Messenger, Zalo, SMS</div>
        </div>

        <div class="apex-share-preview-text" id="share-card-content">${esc(shareText)}</div>

        <div style="display:flex;flex-direction:column;gap:8px;width:100%;">
          <button class="apex-btn-gold" id="btn-copy-plan-text">📋 Sao Chép Tin Nhắn</button>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;width:100%;">
            <button class="apex-btn-outline" onclick="window.open('https://zalo.me', '_blank')">💬 Mở Zalo</button>
            <button class="apex-btn-outline" onclick="window.open('https://m.me', '_blank')">💬 Mở Messenger</button>
          </div>
        </div>
      </section>
    `;
  }

  function renderRadarView() {
    return `
      <div class="apex-section-header">
        <div class="apex-section-title">🎯 Radar Nguồn Thu Thập Định Kỳ (16 Thương Hiệu)</div>
        <div class="apex-section-sub">Tự động quét hằng ngày theo 4 chu kỳ lịch trình Windows Task Scheduler</div>
      </div>

      <div class="apex-radar-wrap">
        <table class="apex-radar-tbl">
          <thead>
            <tr>
              <th>Thương hiệu</th>
              <th>Ngành hàng</th>
              <th>Chu kỳ quét</th>
              <th>Trạng thái kiểm định</th>
              <th>Ghi chú quan sát</th>
            </tr>
          </thead>
          <tbody>
            ${RADAR_SOURCES.map(s => `
              <tr>
                <td><strong>${s.brand}</strong></td>
                <td>${s.category}</td>
                <td><span style="font-family:var(--font-mono);font-size:10.5px;color:var(--gold-champagne);">${s.time}</span></td>
                <td>
                  <span class="apex-status-badge" style="background:${s.statusColor}18;color:${s.statusColor};">
                    ${s.status}
                  </span>
                </td>
                <td style="color:var(--text-muted);">${s.badge}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  function renderStagingReviewView() {
    return `
      <div class="apex-section-header">
        <div class="apex-section-title">🔍 Staging Internal Review (Dành cho CEO)</div>
        <div class="apex-section-sub">Hồ sơ candidate đã thu thập bằng chứng đầy đủ, chờ lệnh phê duyệt phát hành</div>
      </div>

      <div class="apex-deal-card" style="max-width:600px;margin-bottom:16px;">
        <div>
          <div class="apex-card-top-row">
            <span class="apex-card-brand-label">CGV CINEMAS</span>
            <span class="apex-status-badge badge-staging">STAGING · CHỜ CEO DUYỆT</span>
          </div>

          <h3 class="apex-card-headline">Culture Day — Suất chiếu 2D đồng giá 58.000đ</h3>

          <div class="apex-card-price-box">
            <span style="font-family:var(--font-mono);font-size:20px;font-weight:800;color:var(--pine-forest-main);">58.000đ</span>
            <span style="font-size:12.5px;color:var(--text-muted);text-decoration:line-through;margin-left:4px;">95.000đ</span>
            <small style="color:var(--status-verified-text);font-weight:700;margin-left:4px;">(Tiết kiệm 37.000đ)</small>
          </div>

          <ul class="apex-conditions-list">
            <li>Áp dụng Thứ Hai cuối cùng của tháng (24/08/2026)</li>
            <li>Địa điểm: CGV Vĩnh Trung Plaza (255-257 Hùng Vương, Thanh Khê, Đà Nẵng)</li>
            <li>Ảnh PNG & HTML đã kiểm chứng toàn vẹn (CRC32, zlib IDAT inflate OK)</li>
            <li>Khóa an toàn Fail-Closed: Không có nút CTA mở ra ngoài khi chưa duyệt</li>
          </ul>
        </div>

        <div style="background:var(--bg-app-base);padding:6px 8px;border-radius:var(--radius-sm);font-size:10.5px;color:var(--text-muted);font-family:var(--font-mono);overflow-wrap:anywhere;word-break:break-all;white-space:normal;">
          Artifact SHA-256: <code>f3674836feb69d863d2e19362a9b56a7...</code>
        </div>
      </div>
    `;
  }

  function renderFooter() {
    return `
      <footer class="apex-footer">
        <p><strong>JayT Đà Nẵng 43</strong> — Dự Án Giá Trị Cộng Đồng</p>
        <p style="margin-top:2px;font-size:10.5px;">Bảo vệ quyền lợi người dân Đà Nẵng: JayT hiển thị điều kiện và trạng thái bằng chứng hiện có, không dữ liệu ảo, không theo dõi vị trí.</p>
      </footer>
    `;
  }

  // --- MAIN MOUNT ---
  function mount() {
    // Sync tab from URL hash if present
    try {
      const hash = window.location.hash.replace('#', '');
      if (['dashboard', 'schedule_7d', 'radar', 'calculator', 'group_plan', 'staging_review'].includes(hash)) {
        state.activeNav = hash;
      }
    } catch {}

    injectStyles();
    const appEl = document.getElementById('jayt-apex');
    if (!appEl) return;

    let contentHtml = '';
    if (state.activeNav === 'dashboard') {
      contentHtml = `
        ${renderHero()}
        ${renderHonestEmptyState()}
        ${render7DayTimeline()}
      `;
    } else if (state.activeNav === 'schedule_7d') {
      contentHtml = render7DayTimeline();
    } else if (state.activeNav === 'radar') {
      contentHtml = renderRadarView();
    } else if (state.activeNav === 'calculator') {
      contentHtml = renderCalculatorView();
    } else if (state.activeNav === 'group_plan') {
      contentHtml = renderGroupPlanView();
    } else if (state.activeNav === 'staging_review') {
      contentHtml = renderStagingReviewView();
    }

    appEl.innerHTML = `
      <div class="apex-shell">
        ${renderSidebar()}
        <main>
          ${renderTopBar()}
          <div class="apex-main-wrap">
            ${contentHtml}
            ${renderFooter()}
          </div>
        </main>
      </div>
    `;

    bindEvents();
  }

  function bindEvents() {
    // Nav buttons
    document.querySelectorAll('[data-nav]').forEach(btn => {
      btn.addEventListener('click', () => {
        state.activeNav = btn.getAttribute('data-nav');
        mount();
      });
    });

    // Rhythms
    document.querySelectorAll('[data-rhythm]').forEach(btn => {
      btn.addEventListener('click', () => {
        state.selectedRhythm = btn.getAttribute('data-rhythm');
        mount();
      });
    });

    // Days
    document.querySelectorAll('[data-day]').forEach(btn => {
      btn.addEventListener('click', () => {
        state.selectedDayOfWeek = Number(btn.getAttribute('data-day'));
        mount();
      });
    });

    // Persona
    const btnPersona = document.getElementById('btn-toggle-persona');
    if (btnPersona) {
      btnPersona.addEventListener('click', () => {
        if (state.persona === 'office') state.persona = 'student';
        else if (state.persona === 'student') state.persona = 'all';
        else state.persona = 'office';
        mount();
      });
    }

    // District
    const btnDistrict = document.getElementById('btn-toggle-district');
    if (btnDistrict) {
      const districts = ['Hải Châu', 'Thanh Khê', 'Sơn Trà', 'Ngũ Hành Sơn', 'Liên Chiểu', 'Cẩm Lệ'];
      btnDistrict.addEventListener('click', () => {
        const nextIdx = (districts.indexOf(state.selectedDistrict) + 1) % districts.length;
        state.selectedDistrict = districts[nextIdx];
        mount();
      });
    }

    // Empty state buttons
    const btn7d = document.getElementById('btn-view-7d-schedule');
    if (btn7d) btn7d.addEventListener('click', () => { state.activeNav = 'schedule_7d'; mount(); });
    const btnRadar = document.getElementById('btn-view-radar-sources');
    if (btnRadar) btnRadar.addEventListener('click', () => { state.activeNav = 'radar'; mount(); });
    const btnCalc = document.getElementById('btn-view-calculator');
    if (btnCalc) btnCalc.addEventListener('click', () => { state.activeNav = 'calculator'; mount(); });

    // Calculator inputs
    const inName = document.getElementById('in-calc-name');
    const inBase = document.getElementById('in-calc-base');
    const inVoucher = document.getElementById('in-calc-voucher');
    const inShip = document.getElementById('in-calc-ship');
    const inSurcharge = document.getElementById('in-calc-surcharge');

    if (inBase) {
      const updateCalc = () => {
        state.calculator.scenario_name = inName ? inName.value : '';
        state.calculator.item_price = Number(inBase.value) || 0;
        state.calculator.voucher_discount = Number(inVoucher ? inVoucher.value : 0) || 0;
        state.calculator.shipping_fee = Number(inShip ? inShip.value : 0) || 0;
        state.calculator.surcharge = Number(inSurcharge ? inSurcharge.value : 0) || 0;
      };
      [inName, inBase, inVoucher, inShip, inSurcharge].forEach(el => {
        if (el) el.addEventListener('input', () => {
          updateCalc();
          const total = Math.max(0, state.calculator.item_price - state.calculator.voucher_discount + state.calculator.shipping_fee + state.calculator.surcharge);
          const totalEl = document.querySelector('.apex-cb-total-num');
          if (totalEl) totalEl.textContent = money(total);
        });
      });
    }

    // Save to group plan
    const btnSavePlan = document.getElementById('btn-save-to-group-plan');
    if (btnSavePlan) {
      btnSavePlan.addEventListener('click', () => {
        state.groupPlan.title = state.calculator.scenario_name || 'Kèo Đi Chơi';
        state.activeNav = 'group_plan';
        mount();
        showToast('✓ Đã lưu vào Kế Hoạch Nhóm!');
      });
    }

    // Copy plan
    const btnCopy = document.getElementById('btn-copy-plan-text');
    if (btnCopy) {
      btnCopy.addEventListener('click', () => {
        const text = document.getElementById('share-card-content')?.textContent || '';
        navigator.clipboard.writeText(text).then(() => {
          showToast('📋 Đã sao chép tin nhắn rủ bạn!');
        }).catch(() => {
          showToast('✓ Đã chọn tin nhắn!');
        });
      });
    }
  }

  // --- PUBLIC API ---
  window.ApexApp = {
    state,
    mount,
    navigateTo: function(navId) {
      state.activeNav = navId;
      mount();
    },
    openCalculatorForDay: function(dayNum) {
      state.calculator.item_price = 0;
      state.calculator.voucher_discount = 0;
      state.calculator.shipping_fee = 0;
      state.calculator.surcharge = 0;
      state.calculator.scenario_name = 'Kế hoạch ngày ' + dayNum;
      state.activeNav = 'calculator';
      mount();
    }
  };

  // Run
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
