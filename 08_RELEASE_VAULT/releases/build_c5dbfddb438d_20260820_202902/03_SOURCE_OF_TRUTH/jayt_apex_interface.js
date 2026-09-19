/* =============================================================================
   JAYT APEX — BỘ NHỚ KHUYẾN MÃI ĐÀ NẴNG 43
   Thiết kế: Obsidian Pine Gold • Kiểm định: Eligibility-First • Nguồn sự thật: 100%
   Chỉ thị: JAYT-UX-VALIDATION-001 (Multi-Viewport Mobile-First • First-Visit Onboarding)
   ============================================================================= */
(function () {
  'use strict';
  if (window.__jaytApexInterface) return;
  window.__jaytApexInterface = true;

  // DATA ADAPTER: Nạp dữ liệu độc quyền từ Single Source of Truth
  const dataStore = {
    deals: [],
    evidence: {},
    zones: [],
    serverTimeIso: null,
    serverTimeOffset: 0,
    isServerTimeTrusted: false,
    isLoaded: false,
    loadError: null
  };

  function getTrustedNow() {
    return Date.now() + (dataStore.serverTimeOffset || 0);
  }

  function getDaNangDateKey(mockDate = null) {
    if (typeof window.__mockDateKey === 'string') {
      return window.__mockDateKey;
    }
    try {
      const now = mockDate ? new Date(mockDate) : new Date(getTrustedNow());
      const parts = new Intl.DateTimeFormat('en-CA', {
        timeZone: 'Asia/Ho_Chi_Minh',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }).format(now);
      return parts; // 'YYYY-MM-DD'
    } catch {
      const d = mockDate ? new Date(mockDate) : new Date(getTrustedNow());
      return d.toISOString().split('T')[0];
    }
  }

  function getStoredTodayPlan(currentDateKey) {
    try {
      const raw = localStorage.getItem('jayt_today_plan');
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== 'object' || parsed.date_key !== currentDateKey || !Array.isArray(parsed.deal_ids)) {
        return [];
      }
      return parsed.deal_ids;
    } catch {
      return [];
    }
  }

  const state = {
    query: '',
    persona: localStorage.getItem('jayt_preferred_persona') || 'all', // 'all' | 'student' | 'office' (Persistent)
    timeSlot: 'all',    // 'all' | 'morning' | 'lunch' | 'afternoon' | 'evening'
    viewMode: 'all',    // 'all' | 'plan' | 'tomorrow' | 'saved'
    saved: JSON.parse(localStorage.getItem('jayt_pinned_deals') || '[]'),
    todayPlan: getStoredTodayPlan(getDaNangDateKey()),
    get showOnboarding() {
      try { return localStorage.getItem('jayt_onboarding_completed') !== 'true'; } catch { return false; }
    },
    activeModalDeal: null,
    activeFeedbackDeal: null
  };

  const isHttpRuntime = () => typeof window !== 'undefined' && window.location && typeof window.location.protocol === 'string' && window.location.protocol.startsWith('http');
  const money = n => new Intl.NumberFormat('vi-VN').format(n) + 'đ';
  const esc = v => String(v || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));

  function syncTodayPlanState() {
    const curKey = getDaNangDateKey();
    state.todayPlan = getStoredTodayPlan(curKey);
  }

  function getDaNangDiurnalContext(mockMinutes = null, mockDay = null) {
    let nowMinutes = 0;
    let timeStr = '12:00';
    let dayOfWeek = mockDay || 'Mon';
    let dateStr = '';

    if (typeof mockMinutes === 'number') {
      nowMinutes = mockMinutes;
      const mh = Math.floor(mockMinutes / 60);
      const mm = mockMinutes % 60;
      timeStr = `${String(mh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`;
    } else if (typeof window.__mockNowMinutes === 'number') {
      nowMinutes = window.__mockNowMinutes;
      const mh = Math.floor(window.__mockNowMinutes / 60);
      const mm = window.__mockNowMinutes % 60;
      timeStr = `${String(mh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`;
      if (typeof window.__mockDayOfWeek === 'string') {
        dayOfWeek = window.__mockDayOfWeek;
      }
    } else {
      try {
        const now = new Date(getTrustedNow());
        const parts = new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Asia/Ho_Chi_Minh',
          hour: '2-digit',
          minute: '2-digit',
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour12: false,
          weekday: 'short'
        }).formatToParts(now);

        const hPart = parts.find(p => p.type === 'hour')?.value || '12';
        const mPart = parts.find(p => p.type === 'minute')?.value || '00';
        const wPart = parts.find(p => p.type === 'weekday')?.value || 'Mon';
        const dPart = parts.find(p => p.type === 'day')?.value || '20';
        const moPart = parts.find(p => p.type === 'month')?.value || '08';
        const yPart = parts.find(p => p.type === 'year')?.value || '2026';

        const h = parseInt(hPart, 10);
        const m = parseInt(mPart, 10);
        nowMinutes = h * 60 + m;
        timeStr = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
        dayOfWeek = wPart;
        dateStr = `${dPart}/${moPart}/${yPart}`;
      } catch {
        const now = new Date(getTrustedNow());
        const h = now.getHours();
        const m = now.getMinutes();
        nowMinutes = h * 60 + m;
        timeStr = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
        dateStr = 'Hôm nay';
      }
    }

    let slotKey = 'evening';
    let slotName = 'Tối';
    let slotIcon = '🎬';
    let vibeText = 'Khung giờ gợi ý giải trí, xem phim & tụ tập bạn bè tại Helio / Vincom Sơn Trà.';

    if (nowMinutes >= 420 && nowMinutes < 660) {
      slotKey = 'morning';
      slotName = 'Sáng';
      slotIcon = '🌅';
      vibeText = 'Khởi đầu ngày mới với cà phê & đồ uống năng lượng ngắm sông Hàn.';
    } else if (nowMinutes >= 660 && nowMinutes < 840) {
      slotKey = 'lunch';
      slotName = 'Trưa';
      slotIcon = '☀️';
      vibeText = 'Khung giờ gợi ý nạp năng lượng & nghỉ trưa công sở / campus sinh viên.';
    } else if (nowMinutes >= 840 && nowMinutes < 1050) {
      slotKey = 'afternoon';
      slotName = 'Chiều';
      slotIcon = '🧋';
      vibeText = 'Khung giờ gợi ý trà sữa, tán gẫu & giờ tan trường / tan sở Điện Biên Phủ.';
    } else {
      slotKey = 'evening';
      slotName = 'Tối';
      slotIcon = '🎬';
      vibeText = 'Khung giờ gợi ý giải trí, xem phim & tụ tập bạn bè tại Helio / Vincom Sơn Trà.';
    }

    return { nowMinutes, timeStr, dayOfWeek, dateStr, slotKey, slotName, slotIcon, vibeText };
  }

  function getTomorrowContext() {
    try {
      const tomorrow = new Date(getTrustedNow() + 24 * 3600 * 1000);
      const parts = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Ho_Chi_Minh',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        weekday: 'short'
      }).formatToParts(tomorrow);

      const wPart = parts.find(p => p.type === 'weekday')?.value || 'Tue';
      const dPart = parts.find(p => p.type === 'day')?.value || '21';
      const moPart = parts.find(p => p.type === 'month')?.value || '08';
      const yPart = parts.find(p => p.type === 'year')?.value || '2026';

      const weekdayVnMap = {
        'Mon': 'Thứ Hai', 'Tue': 'Thứ Ba', 'Wed': 'Thứ Tư',
        'Thu': 'Thứ Năm', 'Fri': 'Thứ Sáu', 'Sat': 'Thứ Bảy', 'Sun': 'Chủ Nhật'
      };

      return {
        dayOfWeek: wPart,
        dayOfWeekVn: weekdayVnMap[wPart] || wPart,
        dateStr: `${dPart}/${moPart}/${yPart}`
      };
    } catch {
      return { dayOfWeek: 'Tue', dayOfWeekVn: 'Ngày mai', dateStr: 'Ngày mai' };
    }
  }

  function verifyLiveAvailability(deal, evidenceStore, daNangCtx, options = {}) {
    // Gate 0: Trusted Server Time Requirement (Fail-Closed if not trusted)
    const isTrusted = options.isServerTimeTrusted !== undefined ? options.isServerTimeTrusted : dataStore.isServerTimeTrusted;
    if (!isTrusted) return false;

    if (!deal || deal.taxonomy !== 'VERIFIED') return false;
    const sched = deal.availability_schedule;
    if (!sched || typeof sched !== 'object') return false;
    if (sched.timezone !== 'Asia/Ho_Chi_Minh') return false;

    if (!Array.isArray(sched.eligible_days) || !sched.eligible_days.includes(daNangCtx.dayOfWeek)) {
      return false;
    }

    const sm = Number(sched.start_minutes);
    const em = Number(sched.end_minutes);
    if (isNaN(sm) || isNaN(em) || sm >= em || daNangCtx.nowMinutes < sm || daNangCtx.nowMinutes >= em) {
      return false;
    }

    if (!deal.evidence_ref || !evidenceStore || !evidenceStore[deal.evidence_ref]) {
      return false;
    }

    const ev = evidenceStore[deal.evidence_ref];
    const evTimeStr = ev.checked_at || ev.timestamp;
    if (!evTimeStr) return false;
    const evTime = new Date(evTimeStr).getTime();
    if (isNaN(evTime)) return false;

    const trustedNow = typeof options.trustedNowMs === 'number' ? options.trustedNowMs : getTrustedNow();

    // Gate: Anti-Future Timestamp Protection (Skew tolerance: 60 seconds)
    if (evTime > trustedNow + 60000) {
      return false;
    }

    // Gate: Max Freshness Window (30 days)
    const MAX_AGE_MS = 30 * 24 * 3600 * 1000;
    if (trustedNow - evTime > MAX_AGE_MS) {
      return false;
    }

    return true;
  }
  window.__verifyLiveAvailability = verifyLiveAvailability;
  window.__dataStore = dataStore;

  function validateDealItem(d, evidenceStore) {
    if (!d || typeof d !== 'object') return false;
    if (!d.deal_id || typeof d.deal_id !== 'string') return false;
    if (!d.merchant || typeof d.merchant !== 'string') return false;
    if (!['VERIFIED', 'PROBING', 'UNVERIFIED'].includes(d.taxonomy)) return false;
    const srcUrl = d.source_url || d.url;
    if (!srcUrl || !srcUrl.startsWith('https://')) return false;
    if (!d.evidence_ref || typeof d.evidence_ref !== 'string') return false;
    if (!evidenceStore || !evidenceStore[d.evidence_ref]) return false;
    const ev = evidenceStore[d.evidence_ref];
    if (ev.deal_id !== d.deal_id || ev.source_url !== srcUrl) return false;
    if (!d.disclosure || typeof d.disclosure !== 'string') return false;
    
    // Numeric minute validation
    const sm = Number(d.start_minutes);
    const em = Number(d.end_minutes);
    if (isNaN(sm) || isNaN(em) || sm < 0 || em > 1440 || sm >= em) return false;

    if (d.expires_at) {
      const exp = new Date(d.expires_at).getTime();
      if (isNaN(exp) || exp < Date.now()) return false;
    }
    return true;
  }

  async function syncTrustedServerTime() {
    try {
      const timeResp = await fetch('/api/time', { cache: 'no-store' });
      if (!timeResp.ok) throw new Error('ERR_TIME_HTTP_' + timeResp.status);
      const timeJson = await timeResp.json();
      
      // Strict Contract Verification (JAYT-COMMUNITY-RETENTION-006)
      if (!timeJson || typeof timeJson !== 'object') throw new Error('ERR_TIME_NOT_OBJECT');
      if (timeJson.status !== 'OK') throw new Error('ERR_TIME_STATUS_NOT_OK');
      if (timeJson.is_trusted_baseline !== true) throw new Error('ERR_TIME_UNTRUSTED_BASELINE_FLAG');
      if (typeof timeJson.server_time_iso !== 'string') throw new Error('ERR_TIME_MISSING_ISO');
      if (timeJson.timezone !== 'Asia/Ho_Chi_Minh') throw new Error('ERR_TIME_INVALID_TIMEZONE');
      if (typeof timeJson.timestamp_unix !== 'number' && typeof timeJson.server_time_utc_seconds !== 'number') {
        throw new Error('ERR_TIME_MISSING_UNIX_TIMESTAMP');
      }

      const serverMs = new Date(timeJson.server_time_iso).getTime();
      if (isNaN(serverMs)) throw new Error('ERR_TIME_INVALID_ISO_DATE');

      const unixSec = typeof timeJson.timestamp_unix === 'number' ? timeJson.timestamp_unix : timeJson.server_time_utc_seconds;
      const unixMs = unixSec * 1000;
      // Internal consistency check: server_time_iso and unix timestamp must match within 2 seconds
      if (Math.abs(serverMs - unixMs) > 2000) {
        throw new Error('ERR_TIME_INTERNAL_INCONSISTENCY');
      }

      dataStore.serverTimeIso = timeJson.server_time_iso;
      dataStore.serverTimeOffset = serverMs - Date.now();
      dataStore.isServerTimeTrusted = true;
      syncTodayPlanState();
      return true;
    } catch (err) {
      console.warn('[JAYT-ADAPTER] Đồng bộ giờ máy chủ thất bại, kích hoạt fail-closed:', err);
      dataStore.serverTimeIso = null;
      dataStore.serverTimeOffset = 0;
      dataStore.isServerTimeTrusted = false;
      syncTodayPlanState();
      return false;
    }
  }
  window.__syncTrustedServerTime = syncTrustedServerTime;

  async function loadSourceOfTruthData() {
    try {
      if (isHttpRuntime()) {
        // 1. Sync Trusted Server Time via /api/time (Strict Contract)
        await syncTrustedServerTime();

        // 2. Fetch Deals Feed via /api/deals
        const resp = await fetch('/api/deals', { cache: 'no-store' });
        if (!resp.ok) {
          throw new Error('ERR_API_DEALS_HTTP_' + resp.status);
        }
        const json = await resp.json();
        if (json.status !== 'OK' || !Array.isArray(json.deals) || json.deals.length === 0) {
          throw new Error('ERR_API_DEALS_INVALID_PAYLOAD');
        }
        
        const ev = json.evidence || {};
        const validDeals = json.deals.filter(d => validateDealItem(d, ev));
        if (validDeals.length === 0) {
          throw new Error('ERR_ZERO_VALID_DEALS_AFTER_VALIDATION');
        }

        dataStore.deals = validDeals;
        dataStore.evidence = ev;
        dataStore.zones = Array.isArray(json.zones) ? json.zones : [];
        dataStore.isLoaded = true;
        dataStore.loadError = null;
      } else {
        // file:// Protocol: CHẾ ĐỘ XEM TRƯỚC AN TOÀN — KHÔNG NẠP DEAL, KHÔNG ĐIỀU HƯỚNG
        dataStore.deals = [];
        dataStore.evidence = {};
        dataStore.zones = [];
        dataStore.isServerTimeTrusted = false;
        dataStore.isLoaded = false;
        dataStore.loadError = 'Chế độ xem trước qua tệp cục bộ file:// — Vui lòng khởi chạy qua máy chủ Staging để kết nối Cổng API /api/deals.';
      }
    } catch (err) {
      console.warn('[JAYT-ADAPTER] Nạp dữ liệu thất bại, kích hoạt fail-closed:', err);
      dataStore.deals = [];
      dataStore.evidence = {};
      dataStore.zones = [];
      dataStore.isServerTimeTrusted = false;
      dataStore.isLoaded = false;
      dataStore.loadError = err.message || 'ERR_UNKNOWN_DATA_ERROR';
    }
  }

  function matchPersona(deal, persona) {
    if (persona === 'all') return true;
    const personas = Array.isArray(deal.persona) ? deal.persona : [deal.persona];
    return personas.includes(persona);
  }

  function matchTimeSlot(deal, slot) {
    if (slot === 'all') return true;
    const ds = Number(deal.start_minutes);
    const de = Number(deal.end_minutes);
    if (isNaN(ds) || isNaN(de) || ds >= de) return false;

    // Define standard half-open diurnal intervals [start, end)
    let slotStart = 0;
    let slotEnd = 1440;
    if (slot === 'morning')   { slotStart = 420;  slotEnd = 660; }   // 07:00 - 11:00
    if (slot === 'lunch')     { slotStart = 660;  slotEnd = 840; }   // 11:00 - 14:00
    if (slot === 'afternoon') { slotStart = 840;  slotEnd = 1050; }  // 14:00 - 17:30
    if (slot === 'evening')   { slotStart = 1050; slotEnd = 1440; }  // 17:30 - 24:00

    // Overlap condition for half-open intervals [a, b) and [c, d)
    return Math.max(ds, slotStart) < Math.min(de, slotEnd);
  }

  function matchQuery(deal, q) {
    if (!q) return true;
    const s = q.toLowerCase();
    return (deal.merchant && deal.merchant.toLowerCase().includes(s)) ||
           (deal.brand && deal.brand.toLowerCase().includes(s)) ||
           (deal.title && deal.title.toLowerCase().includes(s)) ||
           (deal.cat && deal.cat.toLowerCase().includes(s)) ||
           (deal.zone && deal.zone.toLowerCase().includes(s));
  }

  function evaluateFilteredDeals() {
    if (!dataStore.isLoaded || !dataStore.deals) return [];
    syncTodayPlanState();
    return dataStore.deals.filter(d => {
      if (state.viewMode === 'saved' && !state.saved.includes(d.deal_id)) return false;
      if (state.viewMode === 'plan' && !state.todayPlan.includes(d.deal_id)) return false;
      if (!matchPersona(d, state.persona)) return false;
      if (!matchTimeSlot(d, state.timeSlot)) return false;
      if (!matchQuery(d, state.query)) return false;
      return true;
    });
  }

  function getDailyPlanSlots() {
    if (!dataStore.isLoaded || !dataStore.deals) return { morning: [], lunch: [], evening: [] };
    const candidates = dataStore.deals.filter(d => matchPersona(d, state.persona));
    return {
      morning: candidates.filter(d => matchTimeSlot(d, 'morning')),
      lunch: candidates.filter(d => matchTimeSlot(d, 'lunch')),
      evening: candidates.filter(d => matchTimeSlot(d, 'afternoon') || matchTimeSlot(d, 'evening'))
    };
  }

  function evaluateRecommendations() {
    if (!dataStore.isLoaded || !dataStore.deals || dataStore.deals.length === 0) return [];
    syncTodayPlanState();
    const ctx = getDaNangDiurnalContext();
    const nowMin = ctx.nowMinutes;

    // Filter deals matching current persona if selected
    const candidateDeals = dataStore.deals.filter(d => matchPersona(d, state.persona));

    // 1. Deals active in current minute
    const inTimingDeals = candidateDeals.filter(d => {
      const ds = Number(d.start_minutes);
      const de = Number(d.end_minutes);
      return ds <= nowMin && nowMin < de;
    });

    // Sort: pinned first, then plan first, then lowest price
    inTimingDeals.sort((a, b) => {
      const aScore = (state.todayPlan.includes(a.deal_id) ? 2 : 0) + (state.saved.includes(a.deal_id) ? 1 : 0);
      const bScore = (state.todayPlan.includes(b.deal_id) ? 2 : 0) + (state.saved.includes(b.deal_id) ? 1 : 0);
      if (aScore !== bScore) return bScore - aScore;
      return a.price_num - b.price_num;
    });

    if (inTimingDeals.length > 0) {
      return inTimingDeals.map(d => {
        // Strict Fail-Closed Availability Gate with Trusted Server Time
        const isLiveVerified = verifyLiveAvailability(d, dataStore.evidence, ctx);
        const statusLabel = isLiveVerified
          ? '🟢 ĐANG ÁP DỤNG NGAY'
          : '🕒 Phù hợp khung giờ này — kiểm tra điều kiện trước khi dùng';
        return {
          deal: d,
          statusLabel: statusLabel,
          isTimingMatch: true,
          isPinned: state.saved.includes(d.deal_id),
          isInPlan: state.todayPlan.includes(d.deal_id)
        };
      });
    }

    // 2. Fallback: deals in the current slot
    const inSlotDeals = candidateDeals.filter(d => matchTimeSlot(d, ctx.slotKey));
    inSlotDeals.sort((a, b) => a.price_num - b.price_num);
    return inSlotDeals.map(d => ({
      deal: d,
      statusLabel: `⏳ Khung giờ tiếp theo (${ctx.slotName})`,
      isTimingMatch: false,
      isPinned: state.saved.includes(d.deal_id),
      isInPlan: state.todayPlan.includes(d.deal_id)
    }));
  }

  function css() {
    return `<style id="jayt-apex-style">
    :root {
      --apex-bg: #061a14;
      --apex-panel: #0d2820;
      --apex-panel2: #09211a;
      --apex-gold: #d4af37;
      --apex-gold-light: #f1df9a;
      --apex-emerald: #10b981;
      --apex-text: #f6f4ed;
      --apex-muted: #9caaa4;
      --apex-line: rgba(212,175,55,.2);
      --apex-line-light: rgba(212,175,55,.1);
      --apex-danger: #f87171;
    }
    #jayt-apex {
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
      color: var(--apex-text);
      background: var(--apex-bg);
      min-height: 100vh;
      position: relative;
      z-index: 10001;
    }
    #jayt-apex * { box-sizing: border-box; }
    #jayt-apex button, #jayt-apex input, #jayt-apex select, #jayt-apex textarea { font: inherit; }
    body.jayt-apex-active > header, body.jayt-apex-active > .unified-app-layout, body.jayt-apex-active > .mobile-bottom-nav { display: none !important; }

    .apex-layout { display: grid; grid-template-columns: 260px minmax(0, 1fr); min-height: 100vh; }
    @media (max-width: 960px) {
      .apex-layout { grid-template-columns: 1fr; }
      .apex-side { display: none !important; }
      .apex-mobile-nav-bar { display: flex !important; }
    }

    .apex-side {
      position: sticky; top: 0; height: 100vh; padding: 24px 16px;
      background: var(--apex-panel2); border-right: 1px solid var(--apex-line);
      display: flex; flex-direction: column; gap: 14px;
    }
    .apex-brand { display: flex; gap: 12px; align-items: center; padding: 4px 6px; }
    .apex-mark {
      width: 42px; height: 42px; border-radius: 12px;
      background: linear-gradient(135deg, #10b981, #d4af37);
      color: #061a14; display: grid; place-items: center; font-weight: 900; font-size: 18px;
      box-shadow: 0 4px 15px rgba(16,185,129,.3);
    }
    .apex-brand b { color: var(--apex-gold); font-size: 19px; letter-spacing: -.02em; }
    .apex-brand small { display: block; color: #69c58b; font-weight: 800; font-size: 10px; letter-spacing: .12em; }

    .apex-nav { display: grid; gap: 6px; }
    .apex-nav button {
      min-height: 44px; color: #c6d0ca; background: none; border: 1px solid transparent;
      border-radius: 10px; padding: 10px 12px; text-align: left; cursor: pointer; font-weight: 700; font-size: 13px;
      transition: all .2s ease; display: flex; justify-content: space-between; align-items: center;
    }
    .apex-nav button:hover, .apex-nav button.active {
      background: linear-gradient(90deg, rgba(212,175,55,.16), transparent);
      border-color: var(--apex-line); color: #fff; transform: translateX(3px);
    }

    .apex-side-foot {
      margin-top: auto; border: 1px solid var(--apex-line); padding: 14px;
      border-radius: 14px; background: linear-gradient(145deg, #103328, #09211a); font-size: 11.5px;
    }
    .apex-side-foot b { color: var(--apex-gold); display: block; margin-bottom: 4px; font-size: 12.5px; }

    .apex-main { min-width: 0; padding-bottom: 80px; }
    .apex-top {
      height: 72px; display: flex; align-items: center; gap: 12px; padding: 0 clamp(16px, 3vw, 40px);
      border-bottom: 1px solid var(--apex-line); background: rgba(6,26,20,.94);
      backdrop-filter: blur(20px); position: sticky; top: 0; z-index: 10;
    }
    .apex-location-tag {
      display: flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 800; color: var(--apex-gold);
      background: rgba(212,175,55,.1); padding: 6px 12px; border-radius: 999px; border: 1px solid var(--apex-line);
      white-space: nowrap; min-height: 40px;
    }
    .apex-search {
      flex: 1; max-width: 500px; background: #0d2820; border: 1px solid var(--apex-line);
      border-radius: 999px; padding: 10px 18px; color: white; outline: 0; font-size: 13.5px;
      transition: all .2s ease; min-height: 44px;
    }
    .apex-search:focus { border-color: var(--apex-gold); box-shadow: 0 0 0 3px rgba(212,175,55,.18); }
    .apex-top-spacer { flex: 1; }

    .apex-content { max-width: 1400px; margin: auto; padding: 20px clamp(14px, 3vw, 40px) 60px; }

    /* MOBILE NAVIGATION TABS */
    .apex-mobile-nav-bar {
      display: none; position: fixed; bottom: 0; left: 0; right: 0; height: 62px;
      background: rgba(6,26,20,.97); border-top: 1px solid var(--apex-line);
      z-index: 10015; backdrop-filter: blur(15px); padding: 0 8px;
      justify-content: space-around; align-items: center;
    }
    .apex-mobile-nav-btn {
      flex: 1; min-height: 44px; background: none; border: 0; color: #a4b2ab;
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      font-size: 11px; font-weight: 800; cursor: pointer; gap: 2px;
    }
    .apex-mobile-nav-btn.active { color: var(--apex-gold); font-weight: 900; }

    /* HERO BANNER */
    .apex-hero {
      background: linear-gradient(115deg, rgba(8,38,29,.98), rgba(18,57,41,.92)), radial-gradient(circle at 85% 20%, rgba(212,175,55,.24), transparent 32%);
      border: 1px solid var(--apex-line); border-radius: 24px; padding: clamp(18px, 3.5vw, 36px);
      position: relative; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,.4);
    }
    .apex-hero:after {
      content: '43'; position: absolute; right: 10px; bottom: -50px;
      color: rgba(212,175,55,.05); font: 900 240px/1 'Newsreader', Georgia, serif; pointer-events: none;
    }
    .apex-eyebrow { color: var(--apex-gold); font-size: 11.5px; font-weight: 900; letter-spacing: .16em; text-transform: uppercase; }
    .apex-hero h1 {
      font: 700 clamp(22px, 3.5vw, 44px)/1.15 'Newsreader', Georgia, serif;
      letter-spacing: -.03em; max-width: 760px; margin: 10px 0 8px; color: #fff8e8;
    }
    .apex-hero p { max-width: 660px; color: #c1cec5; font-size: 13.5px; line-height: 1.55; margin: 0; }

    /* REAL-TIME "HÔM NAY NÊN SĂN GÌ?" WIDGET */
    .apex-rec-box {
      margin-top: 20px; background: linear-gradient(145deg, #0e3025, #082019);
      border: 1px solid var(--apex-gold); border-radius: 20px; padding: 20px;
      box-shadow: 0 12px 35px rgba(0,0,0,.35);
    }
    .apex-rec-top { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 10px; margin-bottom: 8px; }
    .apex-rec-title { font-size: 16.5px; font-weight: 900; color: var(--apex-gold); display: flex; align-items: center; gap: 8px; }
    .apex-rec-clock { font-size: 12px; font-weight: 800; color: #b6c4bc; background: rgba(0,0,0,.3); padding: 4px 12px; border-radius: 999px; border: 1px solid var(--apex-line-light); }
    .apex-rec-vibe { font-size: 13px; color: #d6e2db; margin: 0 0 14px; line-height: 1.5; }
    .apex-rec-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(270px, 1fr)); gap: 14px; }

    .apex-rec-card {
      background: rgba(6,26,20,.85); border: 1px solid var(--apex-line);
      border-radius: 14px; padding: 14px; display: flex; flex-direction: column; gap: 8px;
    }
    .apex-rec-card-badge-row { display: flex; justify-content: space-between; align-items: center; gap: 6px; }
    .apex-live-pill {
      font-size: 11px; font-weight: 800; background: rgba(212,175,55,.15); color: var(--apex-gold);
      padding: 4px 10px; border-radius: 6px; border: 1px solid rgba(212,175,55,.3); display: flex; align-items: center; gap: 4px;
    }
    .apex-pinned-pill {
      font-size: 10.5px; font-weight: 900; background: rgba(212,175,55,.25); color: #fff;
      padding: 3px 8px; border-radius: 6px; border: 1px solid rgba(212,175,55,.45);
    }

    /* SECTION 1: 3-SLOT DAILY HUNT SCHEDULE */
    .apex-schedule-box {
      margin-top: 20px; background: linear-gradient(145deg, #0e3025, #082019);
      border: 1px solid var(--apex-gold); border-radius: 20px; padding: 20px;
      box-shadow: 0 12px 35px rgba(0,0,0,.35);
    }
    .apex-schedule-head { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 10px; margin-bottom: 12px; }
    .apex-schedule-title { font-size: 16.5px; font-weight: 900; color: var(--apex-gold); display: flex; align-items: center; gap: 8px; }
    .apex-schedule-progress {
      font-size: 12px; font-weight: 800; color: #10b981; background: rgba(16,185,129,.12);
      padding: 5px 12px; border-radius: 999px; border: 1px solid rgba(16,185,129,.3);
    }
    .apex-slots-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(270px, 1fr)); gap: 14px; }
    
    .apex-slot-card {
      background: rgba(6,26,20,.88); border: 1px solid var(--apex-line);
      border-radius: 16px; padding: 14px; display: flex; flex-direction: column; gap: 10px;
      position: relative;
    }
    .apex-slot-card.current-active {
      border-color: var(--apex-gold);
      box-shadow: 0 0 20px rgba(212,175,55,.15);
    }
    .apex-slot-header { display: flex; justify-content: space-between; align-items: center; }
    .apex-slot-name { font-size: 14px; font-weight: 800; color: #fff; display: flex; align-items: center; gap: 6px; }
    .apex-slot-time { font-size: 11px; font-weight: 700; color: var(--apex-gold); }
    .apex-slot-deals { display: flex; flex-direction: column; gap: 8px; }

    /* DEALS IN SLOT CARD */
    .apex-mini-deal {
      background: rgba(255,255,255,.03); border: 1px solid rgba(255,255,255,.07);
      border-radius: 10px; padding: 10px 12px; display: flex; flex-direction: column; gap: 6px;
    }
    .apex-mini-deal-top { display: flex; justify-content: space-between; align-items: baseline; }
    .apex-mini-deal-brand { font-size: 10.5px; font-weight: 900; color: var(--apex-gold); text-transform: uppercase; }
    .apex-mini-deal-price { font-size: 14px; font-weight: 900; color: #fff; }
    .apex-mini-deal-actions { display: flex; gap: 6px; margin-top: 4px; }
    .apex-mini-deal-actions button {
      min-height: 40px; padding: 6px 10px; font-size: 11px; font-weight: 800; border-radius: 6px; border: 0; cursor: pointer;
    }

    /* SECTION 2: TOMORROW'S PREVIEW */
    .apex-tomorrow-box {
      margin-top: 20px; background: linear-gradient(145deg, #09241b, #051813);
      border: 1px solid rgba(212,175,55,.3); border-radius: 20px; padding: 20px;
    }
    .apex-tomorrow-head { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 8px; margin-bottom: 14px; }
    .apex-tomorrow-title { font-size: 16px; font-weight: 900; color: #f1df9a; display: flex; align-items: center; gap: 8px; }

    /* CONTROLS & FILTER BAR */
    .apex-controls-box {
      margin-top: 20px; display: flex; flex-direction: column; gap: 12px;
      background: var(--apex-panel2); border: 1px solid var(--apex-line);
      border-radius: 18px; padding: 14px 18px;
    }
    .apex-filter-row { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; }
    .apex-filter-label { font-size: 11.5px; font-weight: 800; color: var(--apex-gold); min-width: 85px; text-transform: uppercase; letter-spacing: .06em; }
    .apex-filter-btn {
      min-height: 42px; background: rgba(255,255,255,.05); border: 1px solid var(--apex-line-light);
      color: #c6d0ca; border-radius: 999px; padding: 6px 14px; font-size: 12px; font-weight: 700;
      cursor: pointer; transition: all .2s ease; display: inline-flex; align-items: center; justify-content: center;
    }
    .apex-filter-btn:hover { background: rgba(212,175,55,.12); color: #fff; border-color: var(--apex-line); }
    .apex-filter-btn.active {
      background: var(--apex-gold); color: #061a14; border-color: var(--apex-gold); font-weight: 900;
      box-shadow: 0 2px 10px rgba(212,175,55,.3);
    }

    /* DEALS GRID */
    .apex-section { margin-top: 28px; }
    .apex-head { display: flex; justify-content: space-between; gap: 14px; align-items: flex-end; margin-bottom: 16px; }
    .apex-head h2 { font-size: 19px; margin: 0; font-weight: 800; color: #fff8e8; }
    .apex-head p { font-size: 12.5px; color: var(--apex-muted); margin: 4px 0 0; }
    
    .apex-deals { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; }
    .apex-deal {
      background: var(--apex-panel); border: 1px solid var(--apex-line-light);
      border-radius: 18px; overflow: hidden; display: flex; flex-direction: column;
      box-shadow: 0 8px 25px rgba(0,0,0,.25); transition: transform .2s, border-color .2s;
    }
    .apex-deal:hover { transform: translateY(-4px); border-color: var(--apex-line); }
    
    .apex-deal-top {
      padding: 12px 16px; color: white; position: relative;
      display: flex; justify-content: space-between; align-items: center;
      background: linear-gradient(135deg, #103328, #09211a); border-bottom: 1px solid rgba(255,255,255,.06);
    }
    .apex-time { font-size: 11px; font-weight: 800; color: var(--apex-gold); }
    .apex-persona-tag { font-size: 10px; font-weight: 800; background: rgba(16,185,129,.15); color: #10b981; padding: 2px 7px; border-radius: 5px; border: 1px solid rgba(16,185,129,.3); }

    .apex-deal-body { padding: 16px; display: flex; flex-direction: column; gap: 9px; flex: 1; }
    .apex-deal-brand { font-size: 11px; font-weight: 900; color: var(--apex-gold); letter-spacing: .08em; text-transform: uppercase; }
    .apex-deal-name { font-weight: 800; font-size: 15px; color: #ffffff; line-height: 1.35; margin: 0; }
    
    .apex-provisional-zone {
      font-size: 11px; color: #d4af37; background: rgba(212,175,55,.08);
      padding: 6px 10px; border-radius: 8px; border: 1px dashed rgba(212,175,55,.25); line-height: 1.4;
    }
    .apex-deal-zone {
      font-size: 11.5px; color: var(--apex-muted); display: flex; align-items: center; gap: 4px;
    }

    .apex-price-row {
      display: flex; align-items: baseline; justify-content: space-between; margin-top: 2px;
      padding: 6px 0; border-top: 1px dashed rgba(255,255,255,.08); border-bottom: 1px dashed rgba(255,255,255,.08);
    }
    .apex-price-box { display: flex; align-items: baseline; gap: 8px; }
    .apex-price { color: #ffffff; font-weight: 900; font-size: 21px; }
    .apex-price-orig { color: #788a82; text-decoration: line-through; font-size: 12.5px; font-weight: 600; }
    .apex-save-pill {
      font-size: 10.5px; font-weight: 900; color: #10b981; background: rgba(16,185,129,.14);
      padding: 3px 7px; border-radius: 6px; border: 1px solid rgba(16,185,129,.3);
    }

    .apex-meta-row { display: flex; flex-direction: column; gap: 4px; font-size: 11px; color: var(--apex-muted); }
    .apex-trust-tag { font-weight: 800; color: #f0c36b; display: flex; align-items: center; gap: 4px; }
    .apex-partner-tag { font-weight: 700; color: #a4b3ab; }
    .apex-disclosure-text { font-size: 10.5px; color: #8fa097; font-style: italic; line-height: 1.35; }

    .apex-deal-actions { display: flex; flex-wrap: wrap; gap: 6px; margin-top: auto; padding-top: 8px; }
    .apex-deal-actions button {
      min-height: 44px; border: 0; border-radius: 8px; padding: 8px 10px; font-size: 12px; font-weight: 800;
      color: white; cursor: pointer; transition: all .2s;
    }
    .apex-deal-actions .hunt { flex: 2; background: linear-gradient(135deg, #10b981, #059669); }
    .apex-deal-actions .hunt:hover { filter: brightness(1.1); transform: translateY(-1px); }
    .apex-deal-actions .plan-btn { flex: 1.2; background: rgba(212,175,55,.15); color: var(--apex-gold); border: 1px solid rgba(212,175,55,.3); }
    .apex-deal-actions .plan-btn.active { background: var(--apex-gold); color: #061a14; font-weight: 900; }
    .apex-deal-actions .save { flex: 0.8; background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.1); }
    .apex-deal-actions .save.active { background: rgba(212,175,55,.18); color: var(--apex-gold); border-color: var(--apex-gold); }
    .apex-report-link {
      min-height: 40px; font-size: 11px; color: #7f9087; text-align: right; background: none; border: 0;
      cursor: pointer; padding: 6px 0; margin-top: 2px; display: inline-flex; align-items: center; justify-content: flex-end;
    }
    .apex-report-link:hover { color: #f87171; text-decoration: underline; }

    /* SAFE STATE CARD */
    .apex-safe-card {
      margin-top: 20px; background: rgba(212,175,55,.08); border: 1px solid rgba(212,175,55,.3);
      border-radius: 18px; padding: 28px; color: #e1dfd8; text-align: center;
    }
    .apex-safe-card h3 { margin: 0 0 10px; color: var(--apex-gold); font-size: 18px; }

    /* MODALS */
    .apex-modal {
      position: fixed; inset: 0; background: rgba(0,0,0,.78); display: grid; place-items: center;
      padding: 16px; z-index: 10020; backdrop-filter: blur(6px);
    }
    .apex-modal-card {
      width: min(520px, 100%); background: #0d2820; border: 1px solid var(--apex-line);
      border-radius: 20px; padding: 26px; box-shadow: 0 30px 90px rgba(0,0,0,.8);
    }
    .apex-modal-card h2 { margin: 8px 0 6px; font-size: 19px; color: #fff; }
    .apex-modal-card p { color: #b6c2ba; line-height: 1.55; font-size: 13px; }
    .apex-voucher-box {
      background: #09211a; border: 1px dashed var(--apex-gold); border-radius: 12px;
      padding: 12px; margin: 12px 0; display: flex; justify-content: space-between; align-items: center;
    }
    .apex-voucher-code { font-family: monospace; font-size: 17px; font-weight: 900; color: var(--apex-gold); letter-spacing: .08em; }
    .apex-modal-card .actions { display: flex; gap: 10px; margin-top: 20px; }
    .apex-modal-card button {
      min-height: 44px; flex: 1; padding: 10px; border-radius: 9px; border: 1px solid var(--apex-line);
      font-weight: 800; font-size: 13px; cursor: pointer;
    }
    .apex-modal-card .yes { background: var(--apex-gold); color: #061a14; border: 0; }
    .apex-modal-card .yes:hover { filter: brightness(1.08); }

    /* ONBOARDING MODAL SPECIFIC */
    .apex-onboard-card {
      width: min(500px, 100%); background: linear-gradient(145deg, #0d2820, #061a14);
      border: 1px solid var(--apex-gold); border-radius: 22px; padding: 28px;
      box-shadow: 0 35px 100px rgba(0,0,0,.85); text-align: center;
    }
    .apex-onboard-options { display: grid; gap: 10px; margin: 20px 0; }
    .apex-onboard-btn {
      min-height: 52px; background: rgba(255,255,255,.05); border: 1px solid var(--apex-line);
      border-radius: 12px; color: #fff; font-size: 14px; font-weight: 800; cursor: pointer;
      display: flex; align-items: center; justify-content: center; gap: 8px; transition: all .2s;
    }
    .apex-onboard-btn:hover { background: rgba(212,175,55,.15); border-color: var(--apex-gold); transform: translateY(-1px); }
    .apex-onboard-skip {
      min-height: 44px; background: none; border: 0; color: var(--apex-muted);
      font-size: 13px; font-weight: 700; cursor: pointer; text-decoration: underline; margin-top: 4px;
    }
    .apex-onboard-skip:hover { color: #fff; }

    /* FEEDBACK MODAL SPECIFIC */
    .apex-feedback-select {
      min-height: 44px; width: 100%; background: #09211a; border: 1px solid var(--apex-line); color: #fff;
      padding: 10px 12px; border-radius: 9px; margin: 10px 0; font-size: 13px; outline: 0;
    }
    .apex-feedback-textarea {
      width: 100%; background: #09211a; border: 1px solid var(--apex-line); color: #fff;
      padding: 10px 12px; border-radius: 9px; margin-bottom: 12px; font-size: 12.5px; outline: 0; resize: vertical; min-height: 70px;
    }
    .apex-feedback-local-notice {
      font-size: 11.5px; color: #f1df9a; background: rgba(212,175,55,.1);
      padding: 8px 12px; border-radius: 8px; border: 1px solid rgba(212,175,55,.25); margin-bottom: 14px; line-height: 1.4;
    }

    .apex-toast {
      position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%);
      background: #d4af37; color: #061a14; padding: 11px 18px; border-radius: 999px;
      font-weight: 900; font-size: 13px; z-index: 10030; box-shadow: 0 16px 40px rgba(0,0,0,.6);
      text-align: center; max-width: 90vw;
    }
    </style>`;
  }

  function card(d) {
    const idKey = d.deal_id || d.id;
    const isSaved = state.saved.includes(idKey);
    const isInPlan = state.todayPlan.includes(idKey);
    const displayPrice = money(d.price_num);
    const displayOrig = d.original_price ? money(d.original_price) : '';
    const brandName = d.brand || d.merchant;
    const personasText = (Array.isArray(d.persona) ? d.persona : [d.persona])
      .map(p => p === 'student' ? '🎓 Sinh Viên' : p === 'office' ? '💼 Công Sở' : p)
      .join(' • ');

    const partnerTypeBadge = d.affiliate_type === 'DIRECT_PARTNER'
      ? '🤝 Đối tác trực tiếp'
      : d.affiliate_type === 'AFFILIATE_LINK'
      ? '🔗 Liên kết tiếp thị'
      : '📋 Nguồn kiểm định';

    const dealDomId = idKey.toLowerCase().includes('metiz') ? 'metiz' : idKey;

    // Check if zone has PROVISIONAL status
    const zoneObj = (dataStore.zones || []).find(z => z.zone_id === d.zone);
    const isProvisional = zoneObj ? (zoneObj.status === 'PROVISIONAL') : false;

    return `
    <article class="apex-deal" data-deal-id="${dealDomId}" data-taxonomy="${d.taxonomy}">
      <div class="apex-deal-top">
        <span class="apex-time">⏰ ${esc(d.best_time || 'Cả ngày')}</span>
        <span class="apex-persona-tag">${esc(personasText)}</span>
      </div>

      <div class="apex-deal-body">
        <div class="apex-deal-brand">${esc(brandName)}</div>
        <h3 class="apex-deal-name">${esc(d.merchant)}</h3>

        ${isProvisional ? `
        <div class="apex-provisional-zone">
          📍 <b>${esc(d.district || d.zone)}</b>: Khu vực tham chiếu — kiểm tra chi nhánh/điều kiện trước khi đi.
        </div>` : `
        <div class="apex-deal-zone">
          📍 <b>${esc(d.district || d.zone)}</b>
        </div>`}

        <div class="apex-price-row">
          <div class="apex-price-box">
            <span class="apex-price">${displayPrice}</span>
            ${displayOrig ? `<span class="apex-price-orig">${displayOrig}</span>` : ''}
          </div>
          ${d.saving ? `<span class="apex-save-pill">${esc(d.saving)}</span>` : ''}
        </div>

        <div class="apex-meta-row">
          <div class="apex-trust-tag">🔍 Đang khảo sát (Probing)</div>
          <div class="apex-partner-tag">${partnerTypeBadge}</div>
          <div class="apex-disclosure-text">🛡️ ${esc(d.disclosure)}</div>
        </div>

        <div class="apex-deal-actions">
          <button class="hunt" data-apex="hunt" data-id="${dealDomId}">🎯 Săn Kèo</button>
          <button class="plan-btn ${isInPlan ? 'active' : ''}" data-apex="toggle-plan" data-id="${idKey}">
            ${isInPlan ? '✔️ Đã Chọn' : '➕ Kế Hoạch'}
          </button>
          <button class="save ${isSaved ? 'active' : ''}" data-apex="save" data-id="${idKey}">
            ${isSaved ? '★ Đã Lưu' : '⭐ Lưu'}
          </button>
        </div>

        <button class="apex-report-link" data-apex="open-feedback" data-id="${idKey}">
          🚩 Báo deal đã hết / thông tin chưa đúng
        </button>
      </div>
    </article>`;
  }

  function renderRecommendationSection() {
    if (!dataStore.isLoaded || !dataStore.deals || dataStore.deals.length === 0) return '';
    const recItems = evaluateRecommendations();
    if (recItems.length === 0) return '';
    const ctx = getDaNangDiurnalContext();

    return `
    <section class="apex-rec-box" id="apex-rec-box">
      <div class="apex-rec-top">
        <div class="apex-rec-title">🎯 HÔM NAY NÊN SĂN GÌ?</div>
        <div class="apex-rec-clock">📍 Đà Nẵng 43 (ICT) • <b>${esc(ctx.timeStr)}</b> (${esc(ctx.slotIcon)} Buổi ${esc(ctx.slotName)})</div>
      </div>
      <p class="apex-rec-vibe">${esc(ctx.vibeText)}</p>
      
      <div class="apex-rec-grid">
        ${recItems.map(item => {
          const d = item.deal;
          const idKey = d.deal_id || d.id;
          const dealDomId = idKey.toLowerCase().includes('metiz') ? 'metiz' : idKey;
          return `
          <div class="apex-rec-card" data-rec-deal-id="${dealDomId}">
            <div class="apex-rec-card-badge-row">
              <span class="apex-live-pill">${esc(item.statusLabel)}</span>
              ${item.isPinned ? `<span class="apex-pinned-pill">⭐ KÈO BẠN ĐÃ LƯU</span>` : ''}
            </div>
            <div style="font-size:11px;font-weight:900;color:var(--apex-gold);text-transform:uppercase;">${esc(d.brand || d.merchant)}</div>
            <div style="font-weight:800;font-size:14px;color:#fff;line-height:1.3;">${esc(d.merchant)}</div>
            <div style="display:flex;justify-content:space-between;align-items:baseline;margin:4px 0;">
              <span style="color:#fff;font-weight:900;font-size:18px;">${money(d.price_num)}</span>
              ${d.saving ? `<span class="apex-save-pill">${esc(d.saving)}</span>` : ''}
            </div>
            <div class="apex-trust-tag" style="font-size:11px;">🔍 Đang khảo sát (Probing)</div>
            <button class="apex-filter-btn" style="background:var(--apex-gold);color:#061a14;font-weight:900;margin-top:6px;width:100%;text-align:center;" data-apex="hunt" data-id="${dealDomId}">
              🎯 Săn Kèo Ngay (${esc(d.best_time || '')})
            </button>
          </div>`;
        }).join('')}
      </div>
    </section>`;
  }

  function renderDailyScheduleSection() {
    if (!dataStore.isLoaded || !dataStore.deals || dataStore.deals.length === 0) return '';
    syncTodayPlanState();
    const ctx = getDaNangDiurnalContext();
    const planSlots = getDailyPlanSlots();
    const selectedCount = ['morning', 'lunch', 'evening'].filter(s => {
      const dealsInS = planSlots[s] || [];
      return dealsInS.some(d => state.todayPlan.includes(d.deal_id));
    }).length;

    return `
    <section class="apex-schedule-box" id="apex-today-schedule">
      <div class="apex-schedule-head">
        <div class="apex-schedule-title">
          <span>📋 KẾ HOẠCH SĂN KÈO HÔM NAY (${esc(ctx.dateStr)})</span>
        </div>
        <div class="apex-schedule-progress">
          Tiến độ: <b>${selectedCount}/3</b> thời điểm đã chọn
        </div>
      </div>

      <div class="apex-slots-grid">
        <!-- SLOT 1: SÁNG -->
        <div class="apex-slot-card ${ctx.slotKey === 'morning' ? 'current-active' : ''}" data-slot="morning">
          <div class="apex-slot-header">
            <span class="apex-slot-name">🌅 Sáng ${ctx.slotKey === 'morning' ? '• <small style="color:var(--apex-gold);">ĐANG DIỄN RA</small>' : ''}</span>
            <span class="apex-slot-time">07:00 - 11:00</span>
          </div>
          <div class="apex-slot-deals">
            ${planSlots.morning.length > 0 ? planSlots.morning.map(d => {
              const inPlan = state.todayPlan.includes(d.deal_id);
              return `
              <div class="apex-mini-deal">
                <div class="apex-mini-deal-top">
                  <span class="apex-mini-deal-brand">${esc(d.brand || d.merchant)}</span>
                  <span class="apex-mini-deal-price">${money(d.price_num)}</span>
                </div>
                <div style="font-size:12px;color:#fff;font-weight:700;">${esc(d.merchant)}</div>
                <div style="font-size:10.5px;color:var(--apex-muted);">🕒 Gợi ý theo khung giờ</div>
                <div class="apex-mini-deal-actions">
                  <button style="flex:1;background:var(--apex-gold);color:#061a14;" data-apex="hunt" data-id="${d.deal_id.toLowerCase().includes('metiz')?'metiz':d.deal_id}">🎯 Xem Kèo</button>
                  <button style="flex:1;background:${inPlan?'#10b981':'rgba(255,255,255,.1)'};color:#fff;" data-apex="toggle-plan" data-id="${d.deal_id}">
                    ${inPlan ? '✔️ Đã Chọn' : '➕ Thêm Vào Lịch'}
                  </button>
                </div>
              </div>`;
            }).join('') : `<div style="font-size:12px;color:var(--apex-muted);">Chưa có ưu đãi phù hợp đối tượng đã chọn.</div>`}
          </div>
        </div>

        <!-- SLOT 2: TRƯA -->
        <div class="apex-slot-card ${ctx.slotKey === 'lunch' ? 'current-active' : ''}" data-slot="lunch">
          <div class="apex-slot-header">
            <span class="apex-slot-name">☀️ Trưa ${ctx.slotKey === 'lunch' ? '• <small style="color:var(--apex-gold);">ĐANG DIỄN RA</small>' : ''}</span>
            <span class="apex-slot-time">11:00 - 14:00</span>
          </div>
          <div class="apex-slot-deals">
            ${planSlots.lunch.length > 0 ? planSlots.lunch.map(d => {
              const inPlan = state.todayPlan.includes(d.deal_id);
              return `
              <div class="apex-mini-deal">
                <div class="apex-mini-deal-top">
                  <span class="apex-mini-deal-brand">${esc(d.brand || d.merchant)}</span>
                  <span class="apex-mini-deal-price">${money(d.price_num)}</span>
                </div>
                <div style="font-size:12px;color:#fff;font-weight:700;">${esc(d.merchant)}</div>
                <div style="font-size:10.5px;color:var(--apex-muted);">🕒 Gợi ý theo khung giờ</div>
                <div class="apex-mini-deal-actions">
                  <button style="flex:1;background:var(--apex-gold);color:#061a14;" data-apex="hunt" data-id="${d.deal_id.toLowerCase().includes('metiz')?'metiz':d.deal_id}">🎯 Xem Kèo</button>
                  <button style="flex:1;background:${inPlan?'#10b981':'rgba(255,255,255,.1)'};color:#fff;" data-apex="toggle-plan" data-id="${d.deal_id}">
                    ${inPlan ? '✔️ Đã Chọn' : '➕ Thêm Vào Lịch'}
                  </button>
                </div>
              </div>`;
            }).join('') : `<div style="font-size:12px;color:var(--apex-muted);padding:8px 0;">Đang cập nhật thêm ưu đãi nghỉ trưa cho người Đà Nẵng.</div>`}
          </div>
        </div>

        <!-- SLOT 3: TAN CA & TỐI -->
        <div class="apex-slot-card ${ctx.slotKey === 'afternoon' || ctx.slotKey === 'evening' ? 'current-active' : ''}" data-slot="evening">
          <div class="apex-slot-header">
            <span class="apex-slot-name">🎬 Tan Ca & Tối ${ctx.slotKey === 'afternoon' || ctx.slotKey === 'evening' ? '• <small style="color:var(--apex-gold);">ĐANG DIỄN RA</small>' : ''}</span>
            <span class="apex-slot-time">14:00 - 24:00</span>
          </div>
          <div class="apex-slot-deals">
            ${planSlots.evening.length > 0 ? planSlots.evening.map(d => {
              const inPlan = state.todayPlan.includes(d.deal_id);
              return `
              <div class="apex-mini-deal">
                <div class="apex-mini-deal-top">
                  <span class="apex-mini-deal-brand">${esc(d.brand || d.merchant)}</span>
                  <span class="apex-mini-deal-price">${money(d.price_num)}</span>
                </div>
                <div style="font-size:12px;color:#fff;font-weight:700;">${esc(d.merchant)}</div>
                <div style="font-size:10.5px;color:var(--apex-muted);">🕒 Gợi ý theo khung giờ</div>
                <div class="apex-mini-deal-actions">
                  <button style="flex:1;background:var(--apex-gold);color:#061a14;" data-apex="hunt" data-id="${d.deal_id.toLowerCase().includes('metiz')?'metiz':d.deal_id}">🎯 Xem Kèo</button>
                  <button style="flex:1;background:${inPlan?'#10b981':'rgba(255,255,255,.1)'};color:#fff;" data-apex="toggle-plan" data-id="${d.deal_id}">
                    ${inPlan ? '✔️ Đã Chọn' : '➕ Thêm Vào Lịch'}
                  </button>
                </div>
              </div>`;
            }).join('') : `<div style="font-size:12px;color:var(--apex-muted);">Chưa có ưu đãi phù hợp đối tượng đã chọn.</div>`}
          </div>
        </div>
      </div>
    </section>`;
  }

  function renderTomorrowPreviewSection() {
    if (!dataStore.isLoaded || !dataStore.deals || dataStore.deals.length === 0) return '';
    const tmr = getTomorrowContext();
    const candidateDeals = dataStore.deals.filter(d => matchPersona(d, state.persona));

    return `
    <section class="apex-tomorrow-box" id="apex-tomorrow-preview">
      <div class="apex-tomorrow-head">
        <div class="apex-tomorrow-title">
          <span>📅 NGÀY MAI CÓ GÌ? (${esc(tmr.dayOfWeekVn)}, ${esc(tmr.dateStr)})</span>
        </div>
        <div style="font-size:12px;color:var(--apex-muted);">Chuẩn bị trước lịch hẹn & săn ưu đãi cùng bạn bè</div>
      </div>

      <div class="apex-deals" style="grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));">
        ${candidateDeals.map(d => `
        <article class="apex-deal" style="background:#09211a;">
          <div class="apex-deal-top">
            <span class="apex-time">⏰ ${esc(d.best_time || 'Cả ngày')}</span>
            <span class="apex-persona-tag">📅 Dự kiến theo lịch</span>
          </div>
          <div class="apex-deal-body">
            <div class="apex-deal-brand">${esc(d.brand || d.merchant)}</div>
            <h4 class="apex-deal-name" style="font-size:14px;">${esc(d.merchant)}</h4>
            <div class="apex-price-row">
              <span class="apex-price" style="font-size:18px;">${money(d.price_num)}</span>
              ${d.saving ? `<span class="apex-save-pill">${esc(d.saving)}</span>` : ''}
            </div>
            <div style="font-size:11px;color:#d4af37;">📅 Dự kiến theo lịch — kiểm tra điều kiện trước khi dùng</div>
            <div class="apex-deal-actions">
              <button class="hunt" data-apex="hunt" data-id="${d.deal_id.toLowerCase().includes('metiz')?'metiz':d.deal_id}">🎯 Xem Chi Tiết</button>
              <button class="save ${state.saved.includes(d.deal_id)?'active':''}" data-apex="save" data-id="${d.deal_id}">
                ${state.saved.includes(d.deal_id)?'★ Đã Lưu':'⭐ Lưu'}
              </button>
            </div>
          </div>
        </article>`).join('')}
      </div>
    </section>`;
  }

  function render() {
    let root = document.getElementById('jayt-apex');
    if (!root) {
      root = document.createElement('div');
      root.id = 'jayt-apex';
      document.body.prepend(root);
    }

    const filteredDeals = evaluateFilteredDeals();
    const savedCount = state.saved.length;
    const planCount = state.todayPlan.length;

    let mainContentHtml = '';

    if (!dataStore.isLoaded) {
      mainContentHtml = `
      <div class="apex-safe-card">
        <h3>🛡️ Trạng Thái An Toàn Nguồn Sự Thật</h3>
        <p>${esc(dataStore.loadError || 'Đang kết nối tới Cổng dữ liệu kiểm định Đà Nẵng...')}</p>
      </div>`;
    } else if (state.viewMode === 'tomorrow') {
      mainContentHtml = renderTomorrowPreviewSection();
    } else if (filteredDeals.length === 0) {
      mainContentHtml = `
      <div class="apex-safe-card">
        <h3>🔍 Không Có Kèo Phù Hợp</h3>
        <p>Không tìm thấy ưu đãi nào theo bộ lọc đã chọn. Hãy thử chọn tất cả khung giờ hoặc xóa từ khóa tìm kiếm.</p>
      </div>`;
    } else {
      const sectionTitle = state.viewMode === 'plan'
        ? `📋 Kế Hoạch Hôm Nay Của Bạn (${filteredDeals.length} kèo)`
        : state.viewMode === 'saved'
        ? `⭐ Kèo Đã Lưu Bộ Nhớ Cục Bộ (${filteredDeals.length} kèo)`
        : `🔍 Danh Sách Ưu Đãi Đang Khảo Sát Thực Địa (${filteredDeals.length} kèo)`;

      mainContentHtml = `
      <section class="apex-section">
        <div class="apex-head">
          <div>
            <h2>${sectionTitle}</h2>
            <p>Tuyển chọn deal giá trị thực — Minh bạch 100% cho người Đà Nẵng 43.</p>
          </div>
        </div>
        <div class="apex-deals">
          ${filteredDeals.map(card).join('')}
        </div>
      </section>`;
    }

    root.innerHTML = `
    ${css()}
    <div class="apex-layout">
      <!-- SIDEBAR -->
      <aside class="apex-side">
        <div class="apex-brand">
          <div class="apex-mark">43</div>
          <div>
            <b>JAYT APEX</b>
            <small>ĐÀ NẴNG 43</small>
          </div>
        </div>

        <nav class="apex-nav">
          <button class="${state.viewMode === 'all' && state.persona === 'all' ? 'active' : ''}" data-apex="nav" data-view="all" data-persona="all">
            <span>🔥 Tất Cả Kèo</span>
            <span>${dataStore.deals.length}</span>
          </button>
          <button class="${state.viewMode === 'all' && state.persona === 'student' ? 'active' : ''}" data-apex="nav" data-view="all" data-persona="student">
            <span>🎓 Sinh Viên Campus</span>
            <span>3</span>
          </button>
          <button class="${state.viewMode === 'all' && state.persona === 'office' ? 'active' : ''}" data-apex="nav" data-view="all" data-persona="office">
            <span>💼 Dân Công Sở</span>
            <span>2</span>
          </button>
          <button class="${state.viewMode === 'plan' ? 'active' : ''}" data-apex="nav" data-view="plan" data-persona="all">
            <span>📋 Kế Hoạch Hôm Nay</span>
            <span>${planCount}</span>
          </button>
          <button class="${state.viewMode === 'tomorrow' ? 'active' : ''}" data-apex="nav" data-view="tomorrow" data-persona="all">
            <span>📅 Ngày Mai Có Gì?</span>
            <span>4</span>
          </button>
          <button class="${state.viewMode === 'saved' ? 'active' : ''}" data-apex="nav" data-view="saved" data-persona="all">
            <span>⭐ Kèo Đã Lưu (Local)</span>
            <span>${savedCount}</span>
          </button>
        </nav>

        <div class="apex-side-foot">
          <b>🏛️ BẢO TRỢ CỘNG ĐỒNG</b>
          <p style="margin:0;color:var(--apex-muted);line-height:1.4;">
            Mọi ưu đãi đều qua cổng kiểm định Eligibility-First. Cấm hoàn toàn giá ảo.
          </p>
        </div>
      </aside>

      <!-- MAIN AREA -->
      <main class="apex-main">
        <header class="apex-top">
          <span class="apex-location-tag">📍 ĐÀ NẴNG 43</span>
          <input
            id="apex-search"
            class="apex-search"
            type="search"
            placeholder="Tìm theo quán, thương hiệu, khu vực (Helio, Sơn Trà, Bách Khoa...)..."
            value="${esc(state.query)}"
          />
          <div class="apex-top-spacer"></div>
        </header>

        <div class="apex-content">
          <!-- HERO VALUE PROPOSITION -->
          <section class="apex-hero">
            <div class="apex-eyebrow">JAYT • NGUỒN SỰ THẬT DUY NHẤT ĐÀ NẴNG</div>
            <h1>Tuyển chọn deal giá trị thực.<br>Minh bạch 100% cho người Đà Nẵng.</h1>
            <p>Dữ liệu được nạp trực tiếp từ Sổ cái Khuyến mãi Đà Nẵng qua cổng kiểm định Eligibility-First. Tuyệt đối không dữ liệu mô phỏng, không giá ảo.</p>
          </section>

          <!-- REAL-TIME DIURNAL RECOMMENDATION WIDGET ("HÔM NAY NÊN SĂN GÌ?") -->
          ${renderRecommendationSection()}

          <!-- 3-SLOT DAILY HUNT SCHEDULE -->
          ${renderDailyScheduleSection()}

          <!-- CONTROLS & DIURNAL SCHEDULE FILTER -->
          <div class="apex-controls-box">
            <!-- PERSONA ROW -->
            <div class="apex-filter-row">
              <span class="apex-filter-label">Đối Tượng:</span>
              <button class="apex-filter-btn ${state.persona === 'all' ? 'active' : ''}" data-apex="filter-persona" data-val="all">Tất Cả</button>
              <button class="apex-filter-btn ${state.persona === 'student' ? 'active' : ''}" data-apex="filter-persona" data-val="student">🎓 Sinh Viên Campus</button>
              <button class="apex-filter-btn ${state.persona === 'office' ? 'active' : ''}" data-apex="filter-persona" data-val="office">💼 Dân Công Sở</button>
            </div>

            <!-- TIME SLOT ROW -->
            <div class="apex-filter-row">
              <span class="apex-filter-label">Khung Giờ:</span>
              <button class="apex-filter-btn ${state.timeSlot === 'all' ? 'active' : ''}" data-apex="filter-time" data-val="all">Cả Ngày</button>
              <button class="apex-filter-btn ${state.timeSlot === 'morning' ? 'active' : ''}" data-apex="filter-time" data-val="morning">🌅 Sáng (07h - 11h)</button>
              <button class="apex-filter-btn ${state.timeSlot === 'lunch' ? 'active' : ''}" data-apex="filter-time" data-val="lunch">☀️ Trưa (11h - 14h)</button>
              <button class="apex-filter-btn ${state.timeSlot === 'afternoon' ? 'active' : ''}" data-apex="filter-time" data-val="afternoon">🧋 Chiều (14h - 17h30)</button>
              <button class="apex-filter-btn ${state.timeSlot === 'evening' ? 'active' : ''}" data-apex="filter-time" data-val="evening">🎬 Tối (17h30 - 24h)</button>
            </div>
          </div>

          <!-- MAIN DEALS FEED / SECTIONS -->
          ${mainContentHtml}
        </div>
      </main>

      <!-- MOBILE BOTTOM NAVIGATION BAR -->
      <nav class="apex-mobile-nav-bar">
        <button class="apex-mobile-nav-btn ${state.viewMode === 'all' ? 'active' : ''}" data-apex="nav" data-view="all" data-persona="all">
          <span>🔥</span>
          <span>Tất Cả</span>
        </button>
        <button class="apex-mobile-nav-btn ${state.viewMode === 'plan' ? 'active' : ''}" data-apex="nav" data-view="plan" data-persona="all">
          <span>📋</span>
          <span>Kế Hoạch</span>
        </button>
        <button class="apex-mobile-nav-btn ${state.viewMode === 'tomorrow' ? 'active' : ''}" data-apex="nav" data-view="tomorrow" data-persona="all">
          <span>📅</span>
          <span>Ngày Mai</span>
        </button>
        <button class="apex-mobile-nav-btn ${state.viewMode === 'saved' ? 'active' : ''}" data-apex="nav" data-view="saved" data-persona="all">
          <span>⭐</span>
          <span>Đã Lưu</span>
        </button>
      </nav>
    </div>`;

    if (state.showOnboarding) {
      renderOnboardingModal();
    }
    if (state.activeModalDeal) {
      renderModal(state.activeModalDeal);
    }
    if (state.activeFeedbackDeal) {
      renderFeedbackModal(state.activeFeedbackDeal);
    }
  }

  function renderOnboardingModal() {
    let modalRoot = document.getElementById('apex-onboard-modal');
    if (!modalRoot) {
      modalRoot = document.createElement('div');
      modalRoot.id = 'apex-onboard-modal';
      modalRoot.className = 'apex-modal';
      document.body.appendChild(modalRoot);
    }

    modalRoot.innerHTML = `
    <div class="apex-onboard-card">
      <div class="apex-mark" style="margin:0 auto 12px;">43</div>
      <span class="apex-eyebrow">CHÀO BẠN ĐẾN VỚI JAYT APEX</span>
      <h2 style="font-size:20px;color:#fff;margin:8px 0;">BỘ NHỚ KHUYẾN MÃI ĐÀ NẴNG 43</h2>
      <p style="font-size:13px;color:#b6c2ba;line-height:1.5;">
        Chọn đối tượng ưu tiên để JayT sắp xếp ưu đãi phù hợp nhất với bạn (có thể thay đổi bất kỳ lúc nào):
      </p>

      <div class="apex-onboard-options">
        <button class="apex-onboard-btn" data-apex="onboard-select" data-persona="student">
          <span>🎓</span>
          <span>Sinh Viên Campus (Bách Khoa, Sư Phạm, Kinh Tế...)</span>
        </button>
        <button class="apex-onboard-btn" data-apex="onboard-select" data-persona="office">
          <span>💼</span>
          <span>Dân Công Sở (Văn phòng, IT, Startup Hải Châu, Sơn Trà...)</span>
        </button>
        <button class="apex-onboard-btn" data-apex="onboard-select" data-persona="all">
          <span>🔥</span>
          <span>Xem Tất Cả Ưu Đãi Đà Nẵng</span>
        </button>
      </div>

      <button class="apex-onboard-skip" data-apex="onboard-skip">Bỏ qua & Xem ngay →</button>
    </div>`;
  }

  function closeOnboarding() {
    try { localStorage.setItem('jayt_onboarding_completed', 'true'); } catch {}
    const modalRoot = document.getElementById('apex-onboard-modal');
    if (modalRoot) modalRoot.remove();
  }

  function renderModal(deal) {
    let modalRoot = document.getElementById('apex-active-modal');
    if (!modalRoot) {
      modalRoot = document.createElement('div');
      modalRoot.id = 'apex-active-modal';
      modalRoot.className = 'apex-modal';
      document.body.appendChild(modalRoot);
    }

    const partnerDisclosure = deal.disclosure || 'Chương trình ưu đãi đối tác được kiểm chứng độc lập.';
    const termsText = deal.terms || 'Xuất trình thẻ thành viên hoặc áp dụng mã ưu đãi khi thanh toán.';

    modalRoot.innerHTML = `
    <div class="apex-modal-card">
      <span class="apex-eyebrow">XÁC NHẬN SĂN KÈO ĐỘC QUYỀN</span>
      <h2>${esc(deal.merchant)}</h2>
      <p style="margin-bottom:8px;">${esc(deal.brand || '')} • <b>${money(deal.price_num)}</b></p>
      
      <div class="apex-voucher-box">
        <div>
          <small style="color:var(--apex-muted);display:block;">MÃ ƯU ĐÃI NGUỒN SỰ THẬT</small>
          <span class="apex-voucher-code">${esc(deal.code || 'JAYTAPEX')}</span>
        </div>
        <button class="apex-filter-btn" data-apex="copy" data-code="${esc(deal.code || 'JAYTAPEX')}">📋 Sao chép</button>
      </div>

      <div class="apex-provisional-zone" style="margin-bottom:12px;">
        🛡️ <b>Điều khoản:</b> ${esc(termsText)}
      </div>

      <p style="font-size:12px;color:var(--apex-muted);">
        <b>Minh bạch:</b> ${esc(partnerDisclosure)}
      </p>

      <div class="actions">
        <button data-apex="close">Đóng / Hủy</button>
        <button class="yes" data-apex="confirm" data-id="${esc(deal.deal_id)}">Mở Trang Đối Tác →</button>
      </div>
    </div>`;
  }

  function renderFeedbackModal(deal) {
    let modalRoot = document.getElementById('apex-feedback-modal');
    if (!modalRoot) {
      modalRoot = document.createElement('div');
      modalRoot.id = 'apex-feedback-modal';
      modalRoot.className = 'apex-modal';
      document.body.appendChild(modalRoot);
    }

    modalRoot.innerHTML = `
    <div class="apex-modal-card">
      <span class="apex-eyebrow" style="color:#f87171;">PHẢN HỒI CỘNG ĐỒNG ĐÀ NẴNG</span>
      <h2>🚩 Báo Thông Tin Chưa Đúng</h2>
      <p>Deal: <b>${esc(deal.merchant)}</b> (${esc(deal.brand || '')})</p>

      <div class="apex-feedback-local-notice">
        🛡️ <b>Lưu ý:</b> Phản hồi hiện chỉ được lưu cục bộ trên trình duyệt của bạn (chưa gửi đến máy chủ JayT).
      </div>

      <label style="font-size:12px;font-weight:700;color:var(--apex-muted);">LÝ DO PHẢN HỒI:</label>
      <select id="apex-feedback-reason" class="apex-feedback-select">
        <option value="EXPIRED_OR_OUT_OF_STOCK">Hết voucher / hết chương trình ưu đãi</option>
        <option value="TERMS_MISMATCH">Điều kiện thực tế khác với mô tả</option>
        <option value="LOCATION_CHANGED">Chi nhánh đã đổi địa điểm / đóng cửa</option>
        <option value="PRICE_MISMATCH">Giá thực tế không đúng</option>
        <option value="OTHER">Lý do khác</option>
      </select>

      <label style="font-size:12px;font-weight:700;color:var(--apex-muted);">CHI TIẾT BỔ SUNG (TÙY CHỌN):</label>
      <textarea id="apex-feedback-notes" class="apex-feedback-textarea" placeholder="Nhập thêm ghi chú cá nhân..."></textarea>

      <div class="actions">
        <button data-apex="close-feedback">Đóng</button>
        <button class="yes" style="background:#f87171;color:#fff;" data-apex="submit-feedback" data-id="${esc(deal.deal_id)}">Lưu Phản Hồi Cục Bộ</button>
      </div>
    </div>`;
  }

  function closeModal() {
    state.activeModalDeal = null;
    const modalRoot = document.getElementById('apex-active-modal');
    if (modalRoot) modalRoot.remove();
  }

  function closeFeedbackModal() {
    state.activeFeedbackDeal = null;
    const modalRoot = document.getElementById('apex-feedback-modal');
    if (modalRoot) modalRoot.remove();
  }

  function toast(msg) {
    const t = document.createElement('div');
    t.className = 'apex-toast';
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 2600);
  }

  async function handleConfirm(dealId) {
    const deal = (dataStore.deals || []).find(d => d.deal_id === dealId || d.id === dealId) || state.activeModalDeal;
    if (!deal) return;

    // file:// Protocol: BẢO VỆ TUYỆT ĐỐI — ZERO DIRECT BYPASS
    if (!isHttpRuntime()) {
      closeModal();
      toast('Chế độ file://: Không mở outbound link trực tiếp. Vui lòng chạy qua Staging Server.');
      return;
    }

    const popup = window.open('about:blank', '_blank');
    closeModal();
    toast('Đang kích hoạt Token Gateway...');

    try {
      const resp = await fetch('/api/token/issue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ deal_id: deal.deal_id })
      });

      if (!resp.ok) {
        throw new Error('ERR_TOKEN_ISSUE_HTTP_' + resp.status);
      }

      const data = await resp.json();
      if (data.status !== 'TOKEN_ISSUED' || !data.outbound_endpoint) {
        throw new Error('ERR_TOKEN_ISSUANCE_FAILED');
      }

      if (popup) {
        const fullOutUrl = new URL(data.outbound_endpoint, window.location.origin).href;
        popup.location.href = fullOutUrl;
      }
    } catch (err) {
      if (popup) popup.close();
      toast('Lỗi Token Gateway: ' + (err.message || 'ERR_TOKEN_FAILED'));
    }
  }

  // GLOBAL EVENT DISPATCHER
  document.addEventListener('click', async (e) => {
    const btn = e.target.closest('[data-apex]');
    if (!btn) return;

    const act = btn.dataset.apex;
    const id = btn.dataset.id;

    if (act === 'onboard-select') {
      const personaChoice = btn.dataset.persona || 'all';
      state.persona = personaChoice;
      try { localStorage.setItem('jayt_preferred_persona', personaChoice); } catch {}
      closeOnboarding();
      render();
    }

    if (act === 'onboard-skip') {
      closeOnboarding();
      render();
    }

    if (act === 'hunt') {
      const deal = (dataStore.deals || []).find(d => {
        const dId = d.deal_id || d.id || '';
        return dId === id || (id === 'metiz' && dId.toLowerCase().includes('metiz'));
      });
      if (deal) {
        state.activeModalDeal = deal;
        renderModal(deal);
      }
    }

    if (act === 'close') {
      closeModal();
    }

    if (act === 'open-feedback') {
      const deal = (dataStore.deals || []).find(d => (d.deal_id || d.id) === id);
      if (deal) {
        state.activeFeedbackDeal = deal;
        renderFeedbackModal(deal);
      }
    }

    if (act === 'close-feedback') {
      closeFeedbackModal();
    }

    if (act === 'submit-feedback') {
      const reasonEl = document.getElementById('apex-feedback-reason');
      const notesEl = document.getElementById('apex-feedback-notes');
      const feedbackItem = {
        deal_id: id,
        reason: reasonEl ? reasonEl.value : 'UNKNOWN',
        notes: notesEl ? notesEl.value : '',
        timestamp: new Date().toISOString()
      };

      try {
        const curFeedback = JSON.parse(localStorage.getItem('jayt_community_feedback') || '[]');
        curFeedback.push(feedbackItem);
        localStorage.setItem('jayt_community_feedback', JSON.stringify(curFeedback));
      } catch {}

      closeFeedbackModal();
      toast('🚩 Phản hồi hiện được lưu trên thiết bị này (chưa gửi đến máy chủ JayT).');
    }

    if (act === 'confirm') {
      await handleConfirm(id || state.activeModalDeal?.deal_id);
    }

    if (act === 'toggle-plan') {
      syncTodayPlanState();
      const idx = state.todayPlan.indexOf(id);
      if (idx > -1) {
        state.todayPlan.splice(idx, 1);
        toast('Đã bỏ khỏi kế hoạch hôm nay.');
      } else {
        state.todayPlan.push(id);
        toast('📋 Đã thêm vào kế hoạch săn kèo hôm nay.');
      }
      try {
        const payload = {
          date_key: getDaNangDateKey(),
          deal_ids: state.todayPlan
        };
        localStorage.setItem('jayt_today_plan', JSON.stringify(payload));
      } catch {}
      render();
    }

    if (act === 'save') {
      const idx = state.saved.indexOf(id);
      if (idx > -1) {
        state.saved.splice(idx, 1);
        toast('Đã bỏ lưu kèo.');
      } else {
        state.saved.push(id);
        toast('⭐ Đã lưu kèo vào bộ nhớ cục bộ.');
      }
      localStorage.setItem('jayt_pinned_deals', JSON.stringify(state.saved));
      render();
    }

    if (act === 'filter-persona') {
      state.persona = btn.dataset.val || 'all';
      try { localStorage.setItem('jayt_preferred_persona', state.persona); } catch {}
      render();
    }

    if (act === 'filter-time') {
      state.timeSlot = btn.dataset.val || 'all';
      render();
    }

    if (act === 'nav') {
      state.viewMode = btn.dataset.view || 'all';
      if (btn.dataset.persona) {
        state.persona = btn.dataset.persona;
        try { localStorage.setItem('jayt_preferred_persona', state.persona); } catch {}
      }
      render();
    }

    if (act === 'copy') {
      const code = btn.dataset.code || '';
      try {
        if (navigator.clipboard) await navigator.clipboard.writeText(code);
        toast('Đã sao chép mã: ' + code);
      } catch {
        toast('Mã ưu đãi: ' + code);
      }
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (state.showOnboarding) closeOnboarding();
      if (state.activeModalDeal) closeModal();
      if (state.activeFeedbackDeal) closeFeedbackModal();
    }
  });

  document.addEventListener('input', (e) => {
    if (e.target.id === 'apex-search') {
      state.query = e.target.value;
      render();
      requestAnimationFrame(() => {
        const input = document.getElementById('apex-search');
        if (input) {
          input.focus();
          input.setSelectionRange(input.value.length, input.value.length);
        }
      });
    }
  });

  async function boot() {
    document.body.classList.add('jayt-apex-active');
    let root = document.getElementById('jayt-apex');
    if (!root) {
      root = document.createElement('div');
      root.id = 'jayt-apex';
      document.body.prepend(root);
    }
    await loadSourceOfTruthData();
    render();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
