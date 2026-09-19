// =============================================================================
// JAYT — TRỢ LÝ TIẾT KIỆM HẰNG NGÀY ĐÀ NẴNG 43 (APEX INTERFACE v9.0)
// Chỉ thị: JAYT-TRUST-FIRST-RETENTION-002 (Trust-First Honesty • Personal Brief • Strict Timing)
// =============================================================================
(function () {
  'use strict';

  if (window.__jaytApexInterface) return;
  window.__jaytApexInterface = true;

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

  const state = {
    persona: 'all',          // 'all' | 'student' | 'office'
    timeSlot: 'all',         // 'all' | 'morning' | 'lunch' | 'afternoon' | 'evening'
    needCollection: 'all',   // 'all' | 'lunch_under_50k' | 'coffee_work' | 'group_hangout' | 'campus_student' | 'ecommerce_freeship'
    budgetTier: 'all',       // 'all' | 'under_30k' | 'under_50k' | 'under_100k'
    durationMins: 'all',     // 'all' | '30' | '45' | '120'
    selectedZone: 'all',     // 'all' | zone_id
    viewMode: 'all',         // 'all' | 'saved' | 'plan' | 'intent_student' | 'intent_office' | 'intent_group'
    query: '',
    saved: [],
    todayPlan: [],
    planStatus: {},          // { [deal_id]: 'pending' | 'claimed' | 'skipped' }
    activeModal: null,
    onboardingModalOpen: false,
    onboardingDismissed: false,
    feedbackModalOpen: false,
    feedbackDealId: null,
    feedbackDealTitle: null
  };

  function getTrustedNow() {
    if (dataStore.isServerTimeTrusted && dataStore.serverTimeOffset !== 0) {
      return Date.now() + dataStore.serverTimeOffset;
    }
    return Date.now();
  }

  function getDaNangDateKey() {
    if (typeof window !== 'undefined' && window.__mockDateKey !== undefined) return window.__mockDateKey;
    try {
      const parts = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Ho_Chi_Minh',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }).formatToParts(new Date(getTrustedNow()));
      const d = parts.find(p => p.type === 'day')?.value || '20';
      const m = parts.find(p => p.type === 'month')?.value || '08';
      const y = parts.find(p => p.type === 'year')?.value || '2026';
      return `${y}-${m}-${d}`;
    } catch {
      const now = new Date(getTrustedNow());
      const y = now.getFullYear();
      const m = String(now.getMonth() + 1).padStart(2, '0');
      const d = String(now.getDate()).padStart(2, '0');
      return `${y}-${m}-${d}`;
    }
  }

  function syncTodayPlanState() {
    const currentKey = getDaNangDateKey();
    try {
      const raw = localStorage.getItem('jayt_today_plan');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && parsed.date_key === currentKey && Array.isArray(parsed.deal_ids)) {
          state.todayPlan = parsed.deal_ids;
          state.planStatus = parsed.plan_status || {};
          return;
        }
      }
    } catch (e) {
      console.warn('[JAYT-STATE] Lỗi đọc kế hoạch hôm nay, khởi tạo lại:', e);
    }
    state.todayPlan = [];
    state.planStatus = {};
    saveTodayPlanToStorage();
  }

  function saveTodayPlanToStorage() {
    const currentKey = getDaNangDateKey();
    const payload = {
      date_key: currentKey,
      deal_ids: state.todayPlan,
      plan_status: state.planStatus,
      updated_at: new Date(getTrustedNow()).toISOString()
    };
    try {
      localStorage.setItem('jayt_today_plan', JSON.stringify(payload));
    } catch (e) {
      console.warn('[JAYT-STATE] Lỗi lưu kế hoạch:', e);
    }
  }

  function getDaNangDiurnalContext() {
    let nowMinutes = 480;
    let timeStr = '08:00';
    let dayOfWeek = 'Thu';
    let dayOfWeekNum = 4; // 1=Mon, ..., 7=Sun
    let dateStr = 'Hôm nay';

    try {
      const trustedNow = new Date(getTrustedNow());
      const parts = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Ho_Chi_Minh',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        weekday: 'short',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }).formatToParts(trustedNow);

      const hPart = parts.find(p => p.type === 'hour')?.value || '08';
      const mPart = parts.find(p => p.type === 'minute')?.value || '00';
      const wPart = parts.find(p => p.type === 'weekday')?.value || 'Thu';
      const dPart = parts.find(p => p.type === 'day')?.value || '20';
      const moPart = parts.find(p => p.type === 'month')?.value || '08';
      const yPart = parts.find(p => p.type === 'year')?.value || '2026';

      const h = parseInt(hPart, 10);
      const m = parseInt(mPart, 10);
      nowMinutes = h * 60 + m;
      timeStr = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
      dayOfWeek = wPart;
      dateStr = `${dPart}/${moPart}/${yPart}`;

      const dayMap = { 'Mon': 1, 'Tue': 2, 'Wed': 3, 'Thu': 4, 'Fri': 5, 'Sat': 6, 'Sun': 7 };
      dayOfWeekNum = dayMap[wPart] || 4;
    } catch {
      const now = new Date(getTrustedNow());
      const h = now.getHours();
      const m = now.getMinutes();
      nowMinutes = h * 60 + m;
      timeStr = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
      dateStr = 'Hôm nay';
      dayOfWeekNum = now.getDay() === 0 ? 7 : now.getDay();
    }

    if (typeof window !== 'undefined' && window.__mockNowMinutes !== undefined) {
      nowMinutes = Number(window.__mockNowMinutes);
    }

    let slotKey = 'evening';
    let slotName = 'Tối';
    let slotIcon = '🎬';
    let vibeText = 'Khung giờ tham khảo giải trí, xem phim & tụ tập bạn bè (Helio / Vincom Sơn Trà).';

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
      vibeText = 'Khung giờ gợi ý giải trí, xem phim & tụ tập bạn bè (Helio / Vincom Sơn Trà).';
    }

    return { nowMinutes, timeStr, dayOfWeek, dayOfWeekNum, dateStr, slotKey, slotName, slotIcon, vibeText };
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
        'Mon': 'Thứ Hai',
        'Tue': 'Thứ Ba',
        'Wed': 'Thứ Tư',
        'Thu': 'Thứ Năm',
        'Fri': 'Thứ Sáu',
        'Sat': 'Thứ Bảy',
        'Sun': 'Chủ Nhật'
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

    if (evTime > trustedNow + 60000) return false;
    const MAX_AGE_MS = 30 * 24 * 3600 * 1000;
    if (trustedNow - evTime > MAX_AGE_MS) return false;

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

      const srvUnix = timeJson.timestamp_unix || timeJson.server_time_utc_seconds;
      if (Math.abs(Math.floor(serverMs / 1000) - srvUnix) > 2) {
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

  function isHttpRuntime() {
    return window.location.protocol.startsWith('http');
  }

  async function loadSourceOfTruthData() {
    try {
      if (isHttpRuntime()) {
        await syncTrustedServerTime();
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

        dataStore.deals = validDeals.map(d => {
          const rawPrice = d.deal_price !== undefined ? d.deal_price : (d.price_vnd !== undefined ? d.price_vnd : 0);
          return {
            ...d,
            price_num: Number(rawPrice) || 0,
            best_time: `${String(Math.floor(d.start_minutes / 60)).padStart(2, '0')}:${String(d.start_minutes % 60).padStart(2, '0')} - ${String(Math.floor(d.end_minutes / 60)).padStart(2, '0')}:${String(d.end_minutes % 60).padStart(2, '0')}`,
            saving: d.discount_pct ? `Tiết kiệm ~${d.discount_pct}%` : ''
          };
        });

        dataStore.evidence = ev;
        dataStore.zones = Array.isArray(json.zones) ? json.zones : [];
        dataStore.isLoaded = true;
        dataStore.loadError = null;
      } else {
        dataStore.deals = [];
        dataStore.evidence = {};
        dataStore.zones = [];
        dataStore.isServerTimeTrusted = false;
        dataStore.isLoaded = true;
        dataStore.loadError = 'SAFE_ISOLATION_FILE_PROTOCOL';
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

    let slotStart = 0;
    let slotEnd = 1440;
    if (slot === 'morning')   { slotStart = 420;  slotEnd = 660; }   // 07:00 - 11:00
    if (slot === 'lunch')     { slotStart = 660;  slotEnd = 840; }   // 11:00 - 14:00
    if (slot === 'afternoon') { slotStart = 840;  slotEnd = 1050; }  // 14:00 - 17:30
    if (slot === 'evening')   { slotStart = 1050; slotEnd = 1440; }  // 17:30 - 24:00

    return Math.max(ds, slotStart) < Math.min(de, slotEnd);
  }

  function isCurrentlyWithinTiming(deal, nowMin, dayNum) {
    const ds = Number(deal.start_minutes);
    const de = Number(deal.end_minutes);
    if (isNaN(ds) || isNaN(de) || ds >= de) return false;
    const days = Array.isArray(deal.days_of_week) ? deal.days_of_week : [1,2,3,4,5,6,7];
    if (!days.includes(dayNum)) return false;
    return ds <= nowMin && nowMin < de;
  }

  function matchNeedCollection(deal, need) {
    if (need === 'all') return true;
    return deal.need_collection === need;
  }

  function matchBudget(deal, budget) {
    if (budget === 'all') return true;
    if (budget === 'under_30k') return deal.price_num <= 30000;
    if (budget === 'under_50k') return deal.price_num <= 50000;
    if (budget === 'under_100k') return deal.price_num <= 100000;
    return true;
  }

  function matchDuration(deal, dur) {
    if (dur === 'all') return true;
    const durNum = Number(dur);
    if (isNaN(durNum)) return true;
    return (deal.duration_mins || 30) <= durNum;
  }

  function matchZone(deal, zone) {
    if (zone === 'all') return true;
    return deal.zone === zone;
  }

  function matchQuery(deal, q) {
    if (!q) return true;
    const s = q.toLowerCase();
    return (deal.merchant && deal.merchant.toLowerCase().includes(s)) ||
           (deal.brand && deal.brand.toLowerCase().includes(s)) ||
           (deal.title && deal.title.toLowerCase().includes(s)) ||
           (deal.category && deal.category.toLowerCase().includes(s)) ||
           (deal.zone && deal.zone.toLowerCase().includes(s)) ||
           (deal.contextual_reason && deal.contextual_reason.toLowerCase().includes(s));
  }

  function evaluateFilteredDeals() {
    if (!dataStore.isLoaded || !dataStore.deals) return [];
    syncTodayPlanState();
    return dataStore.deals.filter(d => {
      if (state.viewMode === 'saved' && !state.saved.includes(d.deal_id)) return false;
      if (state.viewMode === 'plan' && !state.todayPlan.includes(d.deal_id)) return false;
      if (!matchPersona(d, state.persona)) return false;
      if (!matchTimeSlot(d, state.timeSlot)) return false;
      if (!matchNeedCollection(d, state.needCollection)) return false;
      if (!matchBudget(d, state.budgetTier)) return false;
      if (!matchDuration(d, state.durationMins)) return false;
      if (!matchZone(d, state.selectedZone)) return false;
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

    const candidateDeals = dataStore.deals.filter(d => matchPersona(d, state.persona));

    // 1. Strict Timing: Deals currently active right now
    const inTimingDeals = candidateDeals.filter(d => isCurrentlyWithinTiming(d, nowMin, ctx.dayOfWeekNum));

    inTimingDeals.sort((a, b) => {
      const aScore = (state.todayPlan.includes(a.deal_id) ? 2 : 0) + (state.saved.includes(a.deal_id) ? 1 : 0);
      const bScore = (state.todayPlan.includes(b.deal_id) ? 2 : 0) + (state.saved.includes(b.deal_id) ? 1 : 0);
      if (aScore !== bScore) return bScore - aScore;
      return a.price_num - b.price_num;
    });

    if (inTimingDeals.length > 0) {
      return inTimingDeals.slice(0, 3).map(d => {
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
    return inSlotDeals.slice(0, 3).map(d => ({
      deal: d,
      statusLabel: `⏳ Khung giờ tiếp theo (${ctx.slotName})`,
      isTimingMatch: false,
      isPinned: state.saved.includes(d.deal_id),
      isInPlan: state.todayPlan.includes(d.deal_id)
    }));
  }

  function money(n) {
    return (Number(n) || 0).toLocaleString('vi-VN') + 'đ';
  }

  function esc(s) {
    if (!s) return '';
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
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
      border-radius: 12px; padding: 0 16px; height: 44px; display: flex; align-items: center; gap: 10px;
    }
    .apex-search input {
      background: none; border: 0; color: #fff; width: 100%; font-size: 13px; outline: 0;
    }

    .apex-content { padding: 24px clamp(16px, 3vw, 40px); max-width: 1280px; margin: 0 auto; display: grid; gap: 24px; }

    /* PERSONAL DAILY BRIEF (BRIEF CÁ NHÂN HÔM NAY) */
    .apex-daily-brief {
      background: linear-gradient(145deg, #103328, #09211a); border: 1px solid var(--apex-gold);
      border-radius: 20px; padding: 20px 24px; display: grid; gap: 12px; box-shadow: 0 10px 30px rgba(0,0,0,.4);
    }
    .apex-brief-top { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; }
    .apex-brief-title { font-weight: 900; font-size: 17px; color: var(--apex-gold); display: flex; align-items: center; gap: 8px; }
    .apex-brief-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; }
    .apex-brief-pill {
      background: rgba(0,0,0,.35); border: 1px solid var(--apex-line); border-radius: 12px;
      padding: 10px 14px; font-size: 12px; display: flex; flex-direction: column; gap: 4px;
    }
    .apex-brief-label { color: var(--apex-muted); font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: .05em; }
    .apex-brief-val { color: #fff; font-weight: 800; font-size: 13.5px; }

    /* 3 INTENT HERO SCENARIOS */
    .apex-hero-scenarios {
      background: linear-gradient(145deg, #0d2820, #061a14); border: 1px solid var(--apex-line);
      border-radius: 20px; padding: 22px; display: grid; gap: 16px;
    }
    .apex-hero-head { display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 8px; }
    .apex-hero-head h2 { margin: 0; color: var(--apex-gold); font-size: 18px; font-weight: 900; }
    .apex-hero-cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 12px; }
    .apex-intent-btn {
      min-height: 68px; background: rgba(255,255,255,.04); border: 1px solid var(--apex-line);
      border-radius: 14px; padding: 12px 14px; text-align: left; color: #fff; cursor: pointer;
      display: flex; flex-direction: column; justify-content: center; gap: 4px; transition: all .2s ease;
    }
    .apex-intent-btn:hover, .apex-intent-btn.active {
      background: rgba(212,175,55,.15); border-color: var(--apex-gold); transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(0,0,0,.4);
    }
    .apex-intent-title { font-weight: 800; font-size: 13.5px; color: var(--apex-gold-light); display: flex; align-items: center; gap: 6px; }
    .apex-intent-desc { font-size: 11.5px; color: var(--apex-muted); line-height: 1.35; }

    /* RIGHT NOW ASSISTANT MODULE */
    .apex-right-now-box {
      background: linear-gradient(145deg, #0d2820, #09211a); border: 1px solid var(--apex-line);
      border-radius: 20px; padding: 20px; display: grid; gap: 14px;
    }
    .apex-right-now-title { font-weight: 900; font-size: 16px; color: var(--apex-gold); display: flex; align-items: center; gap: 8px; }
    .apex-right-now-filters { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
    .apex-select-pill {
      min-height: 44px; background: #061a14; border: 1px solid var(--apex-line); color: #fff;
      padding: 0 12px; border-radius: 10px; font-size: 12px; font-weight: 700; cursor: pointer; outline: 0;
    }
    .apex-select-pill:focus { border-color: var(--apex-gold); }

    /* NEED-BASED COLLECTIONS BAR */
    .apex-needs-bar { display: flex; gap: 8px; overflow-x: auto; padding-bottom: 4px; scrollbar-width: none; }
    .apex-need-pill {
      min-height: 44px; white-space: nowrap; background: rgba(255,255,255,.05); border: 1px solid var(--apex-line);
      border-radius: 999px; padding: 0 16px; font-size: 12.5px; font-weight: 800; color: #d0dcd5; cursor: pointer;
      display: inline-flex; align-items: center; gap: 6px; transition: all .2s;
    }
    .apex-need-pill:hover, .apex-need-pill.active {
      background: var(--apex-gold); color: #061a14; border-color: var(--apex-gold); font-weight: 900;
    }

    /* 3 PICKS TODAY (RECOMMENDATIONS) */
    .apex-rec-box {
      background: linear-gradient(145deg, #0d2820, #09211a); border: 1px solid var(--apex-line);
      border-radius: 20px; padding: 22px; display: grid; gap: 14px;
    }
    .apex-rec-top { display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 8px; }
    .apex-rec-title { font-weight: 900; font-size: 16px; color: var(--apex-gold); letter-spacing: .04em; }
    .apex-rec-clock { font-size: 12px; color: #87e0a8; }
    .apex-rec-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 14px; }
    .apex-rec-card {
      background: #061a14; border: 1px solid rgba(212,175,55,.3); border-radius: 16px;
      padding: 16px; display: flex; flex-direction: column; gap: 8px; position: relative;
    }
    .apex-rec-card-badge-row { display: flex; gap: 6px; flex-wrap: wrap; }
    .apex-live-pill { font-size: 10px; font-weight: 900; padding: 2px 8px; border-radius: 999px; background: rgba(16,185,129,.2); color: #10b981; border: 1px solid rgba(16,185,129,.4); }
    .apex-pinned-pill { font-size: 10px; font-weight: 900; padding: 2px 8px; border-radius: 999px; background: rgba(212,175,55,.2); color: var(--apex-gold); border: 1px solid var(--apex-gold); }

    /* ACTION PLAN SECTION */
    .apex-schedule-box {
      background: linear-gradient(145deg, #09211a, #061a14); border: 1px solid var(--apex-line);
      border-radius: 20px; padding: 22px; display: grid; gap: 16px;
    }
    .apex-schedule-head { display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 8px; }
    .apex-schedule-title { font-weight: 900; font-size: 16px; color: var(--apex-gold); }
    .apex-schedule-progress { font-size: 12px; color: #10b981; font-weight: 800; }
    .apex-slots-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 14px; }
    .apex-slot-card {
      background: #0d2820; border: 1px solid rgba(255,255,255,.08); border-radius: 16px; padding: 16px;
      display: flex; flex-direction: column; gap: 10px;
    }
    .apex-slot-card.current-active { border-color: var(--apex-gold); box-shadow: 0 0 15px rgba(212,175,55,.15); }
    .apex-slot-header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px dashed rgba(255,255,255,.1); padding-bottom: 8px; }
    .apex-slot-name { font-weight: 900; font-size: 13.5px; color: #fff; }
    .apex-slot-time { font-size: 11px; color: var(--apex-gold); font-weight: 800; }
    .apex-mini-deal {
      background: #061a14; border: 1px solid rgba(255,255,255,.06); border-radius: 12px; padding: 12px;
      display: flex; flex-direction: column; gap: 6px;
    }
    .apex-mini-deal-top { display: flex; justify-content: space-between; align-items: baseline; }
    .apex-mini-deal-brand { font-size: 11px; font-weight: 900; color: var(--apex-gold); text-transform: uppercase; }
    .apex-mini-deal-price { font-weight: 900; font-size: 14px; color: #fff; }
    .apex-mini-deal-actions { display: flex; gap: 6px; margin-top: 4px; }
    .apex-mini-deal-actions button {
      min-height: 38px; border-radius: 8px; border: 0; font-size: 11px; font-weight: 800; cursor: pointer; padding: 0 8px;
    }

    /* TOMORROW PREVIEW */
    .apex-tomorrow-box {
      background: linear-gradient(145deg, #09211a, #061a14); border: 1px solid var(--apex-line);
      border-radius: 20px; padding: 22px; display: grid; gap: 14px;
    }
    .apex-tomorrow-head { display: flex; flex-direction: column; gap: 4px; }
    .apex-tomorrow-title { font-weight: 900; font-size: 16px; color: var(--apex-gold); }

    /* DISCOVERY CARD (THẺ KHÁM PHÁ NGUỒN) */
    .apex-deals { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; }
    .apex-deal {
      background: #0d2820; border: 1px solid var(--apex-line); border-radius: 18px;
      overflow: hidden; display: flex; flex-direction: column; transition: all .2s ease;
    }
    .apex-deal:hover { border-color: var(--apex-gold); transform: translateY(-2px); box-shadow: 0 10px 30px rgba(0,0,0,.5); }
    .apex-deal-top {
      padding: 10px 14px; display: flex; justify-content: space-between; align-items: center;
      background: linear-gradient(135deg, #103328, #09211a); border-bottom: 1px solid rgba(255,255,255,.06);
    }
    .apex-time { font-size: 11px; font-weight: 800; color: var(--apex-gold); }
    .apex-persona-tag { font-size: 10px; font-weight: 800; background: rgba(16,185,129,.15); color: #10b981; padding: 2px 7px; border-radius: 5px; border: 1px solid rgba(16,185,129,.3); }

    .apex-deal-body { padding: 16px; display: flex; flex-direction: column; gap: 8px; flex: 1; }
    .apex-deal-brand { font-size: 11px; font-weight: 900; color: var(--apex-gold); letter-spacing: .08em; text-transform: uppercase; }
    .apex-deal-name { font-weight: 800; font-size: 15px; color: #ffffff; line-height: 1.35; margin: 0; }

    .apex-contextual-reason {
      font-size: 12px; color: #f1df9a; background: rgba(212,175,55,.08);
      padding: 8px 10px; border-radius: 8px; border-left: 3px solid var(--apex-gold); line-height: 1.4;
    }

    .apex-deal-zone { font-size: 11.5px; color: var(--apex-muted); display: flex; align-items: center; gap: 4px; }
    .apex-price-row {
      display: flex; align-items: baseline; justify-content: space-between; margin-top: 2px;
      padding: 6px 0; border-top: 1px dashed rgba(255,255,255,.08); border-bottom: 1px dashed rgba(255,255,255,.08);
    }
    .apex-price-box { display: flex; align-items: baseline; gap: 6px; flex-wrap: wrap; }
    .apex-price { color: #ffffff; font-weight: 900; font-size: 20px; }
    .apex-price-note { color: var(--apex-gold); font-size: 11px; font-weight: 700; }
    .apex-price-orig { color: #788a82; text-decoration: line-through; font-size: 12px; font-weight: 600; }
    .apex-save-pill { font-size: 10px; font-weight: 800; color: #10b981; background: rgba(16,185,129,.14); padding: 3px 7px; border-radius: 6px; border: 1px solid rgba(16,185,129,.3); }

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
    .apex-modal-card .actions { display: flex; gap: 10px; margin-top: 20px; }
    .apex-modal-card button {
      min-height: 44px; flex: 1; padding: 10px; border-radius: 9px; border: 1px solid var(--apex-line);
      font-weight: 800; font-size: 13px; cursor: pointer;
    }
    .apex-modal-card .yes { background: var(--apex-gold); color: #061a14; border: 0; }
    .apex-modal-card .yes:hover { filter: brightness(1.08); }

    /* ONBOARDING MODAL */
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

    /* FEEDBACK MODAL */
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

    /* MOBILE BOTTOM NAV */
    .apex-mobile-nav-bar {
      display: none; position: fixed; bottom: 0; left: 0; right: 0; height: 62px;
      background: rgba(9,33,26,.97); border-top: 1px solid var(--apex-line);
      backdrop-filter: blur(15px); z-index: 10010; justify-content: space-around; align-items: center;
    }
    .apex-mobile-nav-item {
      min-height: 44px; flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center;
      background: none; border: 0; color: #9caaa4; font-size: 11px; font-weight: 700; cursor: pointer; gap: 2px;
    }
    .apex-mobile-nav-item.active { color: var(--apex-gold); font-weight: 900; }

    .apex-toast {
      position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%);
      background: #d4af37; color: #061a14; padding: 11px 18px; border-radius: 999px;
      font-weight: 900; font-size: 13px; z-index: 10030; box-shadow: 0 16px 40px rgba(0,0,0,.6);
      text-align: center; max-width: 90vw;
    }
    </style>`;
  }

  function renderPersonalBrief() {
    const ctx = getDaNangDiurnalContext();
    const personaLabel = state.persona === 'student' ? '🎓 Sinh Viên / Campus' : state.persona === 'office' ? '💼 Dân Văn Phòng Hải Châu' : '🌟 Toàn Bộ Đối Tượng';
    const planCount = state.todayPlan.length;

    return `
    <section class="apex-daily-brief" id="apex-personal-brief">
      <div class="apex-brief-top">
        <div class="apex-brief-title">
          <span>📋 BRIEF CÁ NHÂN HÔM NAY</span>
          <small style="color:var(--apex-gold-light);font-size:12px;font-weight:700;">(Đà Nẵng 43 • ${esc(ctx.dateStr)})</small>
        </div>
        <span style="font-size:11.5px;color:#10b981;font-weight:800;">⚡ Làm mới mỗi ngày theo giờ Đà Nẵng</span>
      </div>
      <div class="apex-brief-grid">
        <div class="apex-brief-pill">
          <span class="apex-brief-label">Nhu Cầu Hiện Tại</span>
          <span class="apex-brief-val">${esc(personaLabel)}</span>
        </div>
        <div class="apex-brief-pill">
          <span class="apex-brief-label">Thời Điểm Đà Nẵng</span>
          <span class="apex-brief-val">${esc(ctx.timeStr)} (${esc(ctx.slotIcon)} Buổi ${esc(ctx.slotName)})</span>
        </div>
        <div class="apex-brief-pill">
          <span class="apex-brief-label">Kế Hoạch Đã Chọn</span>
          <span class="apex-brief-val" style="color:var(--apex-gold);">${planCount}/3 Việc (Reset 00:00)</span>
        </div>
      </div>
    </section>`;
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
    const zoneObj = (dataStore.zones || []).find(z => z.zone_id === d.zone);
    const zoneName = zoneObj ? zoneObj.zone_name : (d.district || d.zone || 'Đà Nẵng');

    return `
    <article class="apex-deal" data-deal-id="${dealDomId}" data-taxonomy="${d.taxonomy}">
      <div class="apex-deal-top">
        <span class="apex-time">⏰ ${esc(d.best_time || 'Cả ngày')}</span>
        <span class="apex-persona-tag">${esc(personasText)}</span>
      </div>

      <div class="apex-deal-body">
        <div class="apex-deal-brand">${esc(brandName)}</div>
        <h3 class="apex-deal-name">${esc(d.merchant)}</h3>

        ${d.contextual_reason ? `
        <div class="apex-contextual-reason">
          💡 <b>Gợi ý tham khảo:</b> ${esc(d.contextual_reason)}
        </div>` : ''}

        <div class="apex-deal-zone">
          📍 <b>${esc(zoneName)}</b>
        </div>

        <div class="apex-price-row">
          <div class="apex-price-box">
            <span class="apex-price">${displayPrice}</span>
            <span class="apex-price-note">(Tham khảo)</span>
            ${displayOrig ? `<span class="apex-price-orig">${displayOrig}</span>` : ''}
          </div>
          ${d.saving ? `<span class="apex-save-pill">${esc(d.saving)}</span>` : ''}
        </div>

        <div class="apex-meta-row">
          <div class="apex-trust-tag">🔍 Nguồn khảo sát (Probing)</div>
          <div class="apex-partner-tag">${partnerTypeBadge}</div>
          <div class="apex-disclosure-text">🛡️ ${esc(d.disclosure)}</div>
        </div>

        <div class="apex-deal-actions">
          <button class="hunt" data-apex="hunt" data-id="${dealDomId}">🎯 Xem Điều Kiện Nguồn</button>
          <button class="plan-btn ${isInPlan ? 'active' : ''}" data-apex="toggle-plan" data-id="${idKey}">
            ${isInPlan ? '✔️ Đã Chọn' : '➕ Kế Hoạch'}
          </button>
          <button class="save ${isSaved ? 'active' : ''}" data-apex="save" data-id="${idKey}">
            ${isSaved ? '★ Đã Lưu' : '⭐ Lưu'}
          </button>
        </div>

        <button class="apex-report-link" data-apex="open-feedback" data-id="${idKey}">
          🚩 Báo thông tin chưa đúng / đã hết hạn
        </button>
      </div>
    </article>`;
  }

  function renderHeroScenarios() {
    return `
    <section class="apex-hero-scenarios">
      <div class="apex-hero-head">
        <h2>🎯 TRỢ LÝ TIẾT KIỆM HẰNG NGÀY ĐÀ NẴNG</h2>
        <span style="font-size:12px;color:var(--apex-muted);">Chọn nhanh theo nhu cầu thực tế của bạn lúc này:</span>
      </div>
      <div class="apex-hero-cards">
        <button class="apex-intent-btn ${state.viewMode==='intent_student'?'active':''}" data-apex="quick-intent" data-intent="student">
          <div class="apex-intent-title">🎓 Sinh Viên Giữa 2 Tiết</div>
          <div class="apex-intent-desc">Còn dưới 50K, ăn/uống gì nhanh 30 phút gần campus Bách Khoa / Sư Phạm?</div>
        </button>
        <button class="apex-intent-btn ${state.viewMode==='intent_office'?'active':''}" data-apex="quick-intent" data-intent="office">
          <div class="apex-intent-title">💼 Nghỉ Trưa Văn Phòng</div>
          <div class="apex-intent-desc">45 phút nghỉ trưa, ăn cơm văn phòng Hải Châu tiết kiệm dưới 50K?</div>
        </button>
        <button class="apex-intent-btn ${state.viewMode==='intent_group'?'active':''}" data-apex="quick-intent" data-intent="group">
          <div class="apex-intent-title">👥 Đi Chơi Nhóm 2–4 Bạn</div>
          <div class="apex-intent-desc">Xem phim Metiz/CGV, Gong Cha Mua 1 Tặng 1 chia tiền siêu hời?</div>
        </button>
      </div>
    </section>`;
  }

  function renderRightNowModule() {
    const ctx = getDaNangDiurnalContext();
    return `
    <section class="apex-right-now-box" id="apex-right-now-module">
      <div class="apex-right-now-title">
        <span>⚡ NGAY LÚC NÀY TẠI ĐÀ NẴNG</span>
        <small style="font-size:12px;color:#87e0a8;font-weight:700;">(${esc(ctx.timeStr)} • Buổi ${esc(ctx.slotName)})</small>
      </div>
      <div class="apex-right-now-filters">
        <select class="apex-select-pill" data-apex="select-zone">
          <option value="all" ${state.selectedZone==='all'?'selected':''}>📍 Toàn Đà Nẵng</option>
          ${(dataStore.zones || []).map(z => `<option value="${esc(z.zone_id)}" ${state.selectedZone===z.zone_id?'selected':''}>📍 ${esc(z.zone_name)}</option>`).join('')}
        </select>

        <select class="apex-select-pill" data-apex="select-budget">
          <option value="all" ${state.budgetTier==='all'?'selected':''}>💰 Mọi ngân sách</option>
          <option value="under_30k" ${state.budgetTier==='under_30k'?'selected':''}>💰 Dưới 30.000đ</option>
          <option value="under_50k" ${state.budgetTier==='under_50k'?'selected':''}>💰 Dưới 50.000đ</option>
          <option value="under_100k" ${state.budgetTier==='under_100k'?'selected':''}>💰 Dưới 100.000đ</option>
        </select>

        <select class="apex-select-pill" data-apex="select-duration">
          <option value="all" ${state.durationMins==='all'?'selected':''}>⏳ Mọi thời gian rảnh</option>
          <option value="30" ${state.durationMins==='30'?'selected':''}>⏳ 15 – 30 phút nhanh</option>
          <option value="45" ${state.durationMins==='45'?'selected':''}>⏳ 45 phút ăn trưa</option>
          <option value="120" ${state.durationMins==='120'?'selected':''}>⏳ 2h+ Thảnh thơi</option>
        </select>

        <button class="apex-select-pill" style="background:rgba(212,175,55,.15);color:var(--apex-gold);" data-apex="reset-filters">
          🔄 Đặt lại bộ lọc
        </button>
      </div>
    </section>`;
  }

  function renderNeedCollectionsBar() {
    const needs = [
      { id: 'all', label: '🌟 Tất Cả Nguồn' },
      { id: 'lunch_under_50k', label: '🍜 Cơm Trưa Dưới 50K' },
      { id: 'coffee_work', label: '☕ Cà Phê Làm Việc / Học Bài' },
      { id: 'group_hangout', label: '👥 Đi Nhóm 2–4 Người' },
      { id: 'campus_student', label: '🎓 Campus Sinh Viên' },
      { id: 'ecommerce_freeship', label: '📦 Sàn TMĐT & Freeship' }
    ];

    return `
    <div class="apex-needs-bar">
      ${needs.map(n => `
        <button class="apex-need-pill ${state.needCollection===n.id?'active':''}" data-apex="filter-need" data-need="${n.id}">
          ${n.label}
        </button>
      `).join('')}
    </div>`;
  }

  function renderRecommendationSection() {
    if (!dataStore.isLoaded || !dataStore.deals || dataStore.deals.length === 0) return '';
    const recItems = evaluateRecommendations();
    const ctx = getDaNangDiurnalContext();

    if (recItems.length === 0) {
      return `
      <section class="apex-rec-box" id="apex-rec-box">
        <div class="apex-rec-top">
          <div class="apex-rec-title">🎯 3 KÈO HỢP VỚI BẠN HÔM NAY • HÔM NAY NÊN SĂN GÌ?</div>
          <div class="apex-rec-clock">📍 Đà Nẵng 43 (ICT) • <b>${esc(ctx.timeStr)}</b> (${esc(ctx.slotIcon)} Buổi ${esc(ctx.slotName)})</div>
        </div>
        <p style="font-size:12.5px;color:var(--apex-muted);margin:0;">Chưa có nguồn ưu đãi nào đang trong khung giờ vàng lúc này khớp với đối tượng đã chọn.</p>
      </section>`;
    }

    return `
    <section class="apex-rec-box" id="apex-rec-box">
      <div class="apex-rec-top">
        <div class="apex-rec-title">🎯 3 KÈO HỢP VỚI BẠN HÔM NAY • HÔM NAY NÊN SĂN GÌ?</div>
        <div class="apex-rec-clock">📍 Đà Nẵng 43 (ICT) • <b>${esc(ctx.timeStr)}</b> (${esc(ctx.slotIcon)} Buổi ${esc(ctx.slotName)})</div>
      </div>
      <p style="font-size:12.5px;color:var(--apex-muted);margin:0;">${esc(ctx.vibeText)}</p>
      
      <div class="apex-rec-grid">
        ${recItems.map(item => {
          const d = item.deal;
          const idKey = d.deal_id || d.id;
          const dealDomId = idKey.toLowerCase().includes('metiz') ? 'metiz' : idKey;
          return `
          <div class="apex-rec-card" data-rec-deal-id="${dealDomId}">
            <div class="apex-rec-card-badge-row">
              <span class="apex-live-pill">${esc(item.statusLabel)}</span>
              ${item.isPinned ? `<span class="apex-pinned-pill">⭐ ĐÃ LƯU</span>` : ''}
            </div>
            <div style="font-size:11px;font-weight:900;color:var(--apex-gold);text-transform:uppercase;">${esc(d.brand || d.merchant)}</div>
            <div style="font-weight:800;font-size:14px;color:#fff;line-height:1.3;">${esc(d.merchant)}</div>
            ${d.contextual_reason ? `<div style="font-size:11.5px;color:#f1df9a;">💡 ${esc(d.contextual_reason)}</div>` : ''}
            <div style="display:flex;justify-content:space-between;align-items:baseline;margin:4px 0;">
              <span style="color:#fff;font-weight:900;font-size:18px;">${money(d.price_num)} <small style="font-size:10.5px;color:var(--apex-gold);font-weight:600;">(Tham khảo)</small></span>
              ${d.saving ? `<span class="apex-save-pill">${esc(d.saving)}</span>` : ''}
            </div>
            <div class="apex-trust-tag" style="font-size:11px;">🔍 Nguồn khảo sát (Probing)</div>
            <button class="apex-filter-btn" style="background:var(--apex-gold);color:#061a14;font-weight:900;margin-top:6px;width:100%;text-align:center;" data-apex="hunt" data-id="${dealDomId}">
              🎯 Xem Điều Kiện Nguồn
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
              const pStatus = state.planStatus[d.deal_id] || 'pending';
              return `
              <div class="apex-mini-deal">
                <div class="apex-mini-deal-top">
                  <span class="apex-mini-deal-brand">${esc(d.brand || d.merchant)}</span>
                  <span class="apex-mini-deal-price">${money(d.price_num)}</span>
                </div>
                <div style="font-size:12px;color:#fff;font-weight:700;">${esc(d.merchant)}</div>
                ${d.contextual_reason ? `<div style="font-size:10.5px;color:#f1df9a;">💡 ${esc(d.contextual_reason)}</div>` : ''}
                <div class="apex-mini-deal-actions">
                  <button style="flex:1;background:var(--apex-gold);color:#061a14;" data-apex="hunt" data-id="${d.deal_id.toLowerCase().includes('metiz')?'metiz':d.deal_id}">🎯 Xem Kèo</button>
                  <button style="flex:1;background:${inPlan?'#10b981':'rgba(255,255,255,.1)'};color:#fff;" data-apex="toggle-plan" data-id="${d.deal_id}">
                    ${inPlan ? (pStatus==='claimed'?'✔️ Đã Dùng':pStatus==='skipped'?'⏭️ Bỏ Qua':'✔️ Đã Chọn') : '➕ Thêm Vào Lịch'}
                  </button>
                </div>
              </div>`;
            }).join('') : `<div style="font-size:12px;color:var(--apex-muted);">Chưa có nguồn ưu đãi phù hợp đối tượng đã chọn.</div>`}
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
              const pStatus = state.planStatus[d.deal_id] || 'pending';
              return `
              <div class="apex-mini-deal">
                <div class="apex-mini-deal-top">
                  <span class="apex-mini-deal-brand">${esc(d.brand || d.merchant)}</span>
                  <span class="apex-mini-deal-price">${money(d.price_num)}</span>
                </div>
                <div style="font-size:12px;color:#fff;font-weight:700;">${esc(d.merchant)}</div>
                ${d.contextual_reason ? `<div style="font-size:10.5px;color:#f1df9a;">💡 ${esc(d.contextual_reason)}</div>` : ''}
                <div class="apex-mini-deal-actions">
                  <button style="flex:1;background:var(--apex-gold);color:#061a14;" data-apex="hunt" data-id="${d.deal_id.toLowerCase().includes('metiz')?'metiz':d.deal_id}">🎯 Xem Kèo</button>
                  <button style="flex:1;background:${inPlan?'#10b981':'rgba(255,255,255,.1)'};color:#fff;" data-apex="toggle-plan" data-id="${d.deal_id}">
                    ${inPlan ? (pStatus==='claimed'?'✔️ Đã Dùng':pStatus==='skipped'?'⏭️ Bỏ Qua':'✔️ Đã Chọn') : '➕ Thêm Vào Lịch'}
                  </button>
                </div>
              </div>`;
            }).join('') : `<div style="font-size:12px;color:var(--apex-muted);padding:8px 0;">Đang cập nhật thêm nguồn ưu đãi nghỉ trưa tại Đà Nẵng.</div>`}
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
              const pStatus = state.planStatus[d.deal_id] || 'pending';
              return `
              <div class="apex-mini-deal">
                <div class="apex-mini-deal-top">
                  <span class="apex-mini-deal-brand">${esc(d.brand || d.merchant)}</span>
                  <span class="apex-mini-deal-price">${money(d.price_num)}</span>
                </div>
                <div style="font-size:12px;color:#fff;font-weight:700;">${esc(d.merchant)}</div>
                ${d.contextual_reason ? `<div style="font-size:10.5px;color:#f1df9a;">💡 ${esc(d.contextual_reason)}</div>` : ''}
                <div class="apex-mini-deal-actions">
                  <button style="flex:1;background:var(--apex-gold);color:#061a14;" data-apex="hunt" data-id="${d.deal_id.toLowerCase().includes('metiz')?'metiz':d.deal_id}">🎯 Xem Kèo</button>
                  <button style="flex:1;background:${inPlan?'#10b981':'rgba(255,255,255,.1)'};color:#fff;" data-apex="toggle-plan" data-id="${d.deal_id}">
                    ${inPlan ? (pStatus==='claimed'?'✔️ Đã Dùng':pStatus==='skipped'?'⏭️ Bỏ Qua':'✔️ Đã Chọn') : '➕ Thêm Vào Lịch'}
                  </button>
                </div>
              </div>`;
            }).join('') : `<div style="font-size:12px;color:var(--apex-muted);">Chưa có nguồn ưu đãi phù hợp đối tượng đã chọn.</div>`}
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
        <div style="font-size:12px;color:var(--apex-muted);">Chuẩn bị trước lịch hẹn & tham khảo nguồn ưu đãi cùng bạn bè</div>
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
            ${d.contextual_reason ? `<div style="font-size:11.5px;color:#f1df9a;">💡 ${esc(d.contextual_reason)}</div>` : ''}
            <div class="apex-price-row">
              <span class="apex-price" style="font-size:18px;">${money(d.price_num)} <small style="font-size:10px;color:var(--apex-gold);">(Tham khảo)</small></span>
              ${d.saving ? `<span class="apex-save-pill">${esc(d.saving)}</span>` : ''}
            </div>
            <div style="font-size:11px;color:#d4af37;">📅 Dự kiến theo lịch — kiểm tra điều kiện trước khi dùng</div>
            <div class="apex-deal-actions">
              <button class="hunt" data-apex="hunt" data-id="${d.deal_id.toLowerCase().includes('metiz')?'metiz':d.deal_id}">🎯 Xem Chi Tiết Nguồn</button>
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
    try {
      if (!localStorage.getItem('jayt_onboarding_completed') && state.onboardingDismissed !== true) {
        state.onboardingModalOpen = true;
      }
    } catch {}
    let root = document.getElementById('jayt-apex');
    if (!root) {
      root = document.createElement('div');
      root.id = 'jayt-apex';
      document.body.prepend(root);
    }

    const filteredDeals = evaluateFilteredDeals();
    const savedCount = state.saved.length;
    const planCount = state.todayPlan.length;

    let dealsSectionContent = '';
    if (!isHttpRuntime()) {
      dealsSectionContent = `
      <div class="apex-safe-card">
        <h3>🛡️ CHẾ ĐỘ XEM TRƯỚC AN TOÀN (FILE PROTOCOL ISOLATED)</h3>
        <p>Giao diện đang mở trực tiếp từ tệp cục bộ (<code>file://</code>). Để bảo vệ người dùng, toàn bộ kết nối nạp dữ liệu khuyến mãi và điều hướng ra ngoài đã được chặn đứng an toàn.</p>
        <p style="color:var(--apex-gold);font-weight:700;">Vui lòng truy cập qua máy chủ cục bộ hoặc cổng Staging để sử dụng đầy đủ tính năng.</p>
      </div>`;
    } else if (filteredDeals.length === 0) {
      dealsSectionContent = `
      <div class="apex-safe-card" style="border-color:rgba(255,255,255,.1);background:#0d2820;">
        <h3 style="color:#fff;">🔍 CHƯA CÓ KÈO ĐỦ DỮ LIỆU PHÙ HỢP LÚC NÀY</h3>
        <p style="color:var(--apex-muted);">Không có nguồn ưu đãi nào khớp với bộ lọc hoặc từ khóa tìm kiếm hiện tại.</p>
        <button class="apex-filter-btn" style="background:var(--apex-gold);color:#061a14;font-weight:900;margin:10px auto 0;display:inline-block;padding:10px 20px;" data-apex="reset-filters">
          🔄 Đặt Lại Bộ Lọc
        </button>
      </div>`;
    } else {
      dealsSectionContent = `
      <div class="apex-deals">
        ${filteredDeals.map(card).join('')}
      </div>`;
    }

    root.innerHTML = `
    ${css()}
    <div class="apex-layout">
      <!-- SIDEBAR -->
      <aside class="apex-side">
        <div class="apex-brand">
          <div class="apex-mark">J</div>
          <div>
            <b>JAYT ĐÀ NẴNG</b>
            <small>BỘ NHỚ KHUYẾN MÃI 43</small>
          </div>
        </div>

        <nav class="apex-nav">
          <button class="${state.viewMode==='all'?'active':''}" data-apex="nav" data-view="all" data-persona="all">
            <span>🌟 Danh Mục Khảo Sát</span>
            <small style="color:var(--apex-muted);font-weight:800;">${dataStore.deals.length}</small>
          </button>
          <button class="${state.viewMode==='saved'?'active':''}" data-apex="nav" data-view="saved" data-persona="all">
            <span>⭐ Kèo Đã Lưu</span>
            <small style="color:var(--apex-gold);font-weight:900;">${savedCount}</small>
          </button>
          <button class="${state.viewMode==='plan'?'active':''}" data-apex="nav" data-view="plan" data-persona="all">
            <span>📋 Kế Hoạch Hôm Nay</span>
            <small style="color:#10b981;font-weight:900;">${planCount}</small>
          </button>
        </nav>

        <div style="border-top:1px solid var(--apex-line);padding-top:14px;display:grid;gap:6px;">
          <div style="font-size:11px;font-weight:800;color:var(--apex-gold);letter-spacing:.08em;padding:0 6px;">ĐỐI TƯỢNG</div>
          <button class="apex-filter-btn ${state.persona==='all'?'active':''}" data-apex="filter-persona" data-val="all">🌟 Toàn Bộ Đối Tượng</button>
          <button class="apex-filter-btn ${state.persona==='student'?'active':''}" data-apex="filter-persona" data-val="student">🎓 Sinh Viên / Giới Trẻ</button>
          <button class="apex-filter-btn ${state.persona==='office'?'active':''}" data-apex="filter-persona" data-val="office">💼 Dân Văn Phòng / Công Sở</button>
        </div>

        <div class="apex-side-foot">
          <b>🏛️ DỰ ÁN GIÁ TRỊ CỘNG ĐỒNG</b>
          <p style="margin:0;color:var(--apex-muted);line-height:1.4;">Phục vụ người dân & du khách Đà Nẵng. Không lưu PII, không cookie theo dõi.</p>
        </div>
      </aside>

      <!-- MAIN CONTENT AREA -->
      <main class="apex-main">
        <header class="apex-top">
          <div class="apex-location-tag">
            <span>📍 Đà Nẵng 43</span>
          </div>

          <div class="apex-search">
            <span>🔍</span>
            <input type="text" placeholder="Tìm cà phê, xem phim, ăn trưa, trà sữa, mua sắm..." value="${esc(state.query)}" data-apex="search-input" />
          </div>
        </header>

        <div class="apex-content">
          ${renderPersonalBrief()}
          ${renderHeroScenarios()}
          ${renderRightNowModule()}
          ${renderNeedCollectionsBar()}
          ${renderRecommendationSection()}
          ${renderDailyScheduleSection()}
          ${renderTomorrowPreviewSection()}

          <section class="apex-section">
            <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:14px;">
              <h3 style="margin:0;font-size:17px;color:var(--apex-gold);font-weight:900;">
                ${state.viewMode==='saved' ? '⭐ KÈO BẠN ĐÃ LƯU' : state.viewMode==='plan' ? '📋 KẾ HOẠCH SĂN KÈO HÔM NAY' : '🛍️ DANH MỤC ĐANG KHẢO SÁT — KIỂM TRA ĐIỀU KIỆN TẠI NGUỒN TRƯỚC KHI DÙNG'}
              </h3>
              <span style="font-size:12px;color:var(--apex-muted);">Hiển thị ${filteredDeals.length} nguồn tham khảo</span>
            </div>
            ${dealsSectionContent}
          </section>
        </div>
      </main>
    </div>

    <!-- MOBILE BOTTOM NAVIGATION BAR -->
    <div class="apex-mobile-nav-bar">
      <button class="apex-mobile-nav-item ${state.viewMode==='all'?'active':''}" data-apex="nav" data-view="all" data-persona="all">
        <span>🌟</span>
        <span>Khám Phá</span>
      </button>
      <button class="apex-mobile-nav-item ${state.viewMode==='plan'?'active':''}" data-apex="nav" data-view="plan" data-persona="all">
        <span>📋</span>
        <span>Kế Hoạch</span>
      </button>
      <button class="apex-mobile-nav-item ${state.viewMode==='saved'?'active':''}" data-apex="nav" data-view="saved" data-persona="all">
        <span>⭐</span>
        <span>Đã Lưu</span>
      </button>
    </div>

    <!-- MODALS CONTAINER -->
    ${renderActiveModal()}
    ${renderOnboardingModal()}
    ${renderFeedbackModal()}
    `;
  }

  function renderActiveModal() {
    if (!state.activeModal) return '';
    const d = state.activeModal;
    const isAffiliate = d.affiliate_type === 'AFFILIATE_LINK';
    const partnerUrl = d.source_url || d.url;

    return `
    <div class="apex-modal" id="apex-active-modal">
      <div class="apex-modal-card">
        <span class="apex-persona-tag">🔍 NGUỒN KHẢO SÁT (PROBING)</span>
        <h2>${esc(d.merchant)}</h2>
        <p><b>Chương trình:</b> ${esc(d.title || d.merchant)}</p>
        ${d.contextual_reason ? `<p style="color:#f1df9a;">💡 <b>Gợi ý tham khảo:</b> ${esc(d.contextual_reason)}</p>` : ''}
        <p><b>Mức giá tham khảo:</b> <span style="color:#fff;font-weight:900;font-size:16px;">${money(d.price_num)}</span> ${d.original_price ? `<del style="color:#788a82;font-size:12px;">${money(d.original_price)}</del>` : ''}</p>
        
        <div class="apex-feedback-local-notice">
          🛡️ <b>Kiểm tra điều kiện tại nguồn:</b> ${esc(d.disclosure || 'Chương trình tham khảo theo chính sách công khai. Vui lòng kiểm tra điều kiện áp dụng tại điểm bán / ứng dụng đối tác.')}
        </div>

        <div class="actions">
          <button class="no" data-apex="close" data-action="close-modal">Đóng / Hủy</button>
          <button class="yes" data-apex="confirm" data-id="${d.deal_id}" data-url="${esc(partnerUrl)}" data-aff="${isAffiliate}">
            Mở Trang Đối Tác →
          </button>
        </div>
      </div>
    </div>`;
  }

  function renderOnboardingModal() {
    if (!state.onboardingModalOpen) return '';
    return `
    <div class="apex-modal" id="apex-onboard-modal">
      <div class="apex-onboard-card">
        <div style="font-size:32px;margin-bottom:8px;">🌊</div>
        <h2 style="color:var(--apex-gold);margin:0 0 6px;">BỘ NHỚ KHUYẾN MÃI ĐÀ NẴNG 43 • Chào bạn đến với Trợ Lý Tiết Kiệm</h2>
        <p style="color:var(--apex-muted);font-size:13px;margin:0 0 16px;">Chọn đối tượng để JayT gợi ý chính xác những nguồn ưu đãi gần bạn nhất:</p>
        <div class="apex-onboard-options">
          <button class="apex-onboard-btn" data-apex="onboard-select" data-persona="student">
            <span>🎓</span> Sinh Viên / Giới Trẻ Đà Nẵng
          </button>
          <button class="apex-onboard-btn" data-apex="onboard-select" data-persona="office">
            <span>💼</span> Dân Văn Phòng / Công Sở
          </button>
        </div>
        <button class="apex-onboard-skip" data-apex="onboard-skip">Bỏ qua, xem tất cả nguồn</button>
      </div>
    </div>`;
  }

  function renderFeedbackModal() {
    if (!state.feedbackModalOpen) return '';
    return `
    <div class="apex-modal" id="apex-feedback-modal">
      <div class="apex-modal-card">
        <h2>🚩 Báo Cáo Thông Tin Nguồn</h2>
        <p style="margin:4px 0 12px;color:var(--apex-gold);font-weight:700;">${esc(state.feedbackDealTitle || 'Nguồn ưu đãi')}</p>
        <div class="apex-feedback-local-notice">
          📌 Phản hồi được ghi nhận trên thiết bị của bạn nhằm tối ưu trải nghiệm cá nhân hóa. Chưa có dữ liệu nào được chuyển ra khỏi trình duyệt.
        </div>
        <select class="apex-feedback-select" id="apex-feedback-reason">
          <option value="EXPIRED">Ưu đãi đã hết hạn / Quán thông báo kết thúc</option>
          <option value="PRICE_MISMATCH">Giá tại quán khác với giá hiển thị</option>
          <option value="POLICY_CHANGED">Điều kiện áp dụng có thay đổi</option>
          <option value="OUT_OF_STOCK">Hết món / Hết voucher khuyến mãi</option>
          <option value="OTHER">Lý do khác</option>
        </select>
        <textarea class="apex-feedback-textarea" id="apex-feedback-note" placeholder="Chi tiết phản hồi thêm (không bắt buộc)..."></textarea>
        <div class="actions">
          <button class="no" data-apex="close-feedback">Đóng</button>
          <button class="yes" data-apex="submit-feedback">Ghi Nhận Phản Hồi</button>
        </div>
      </div>
    </div>`;
  }

  function showToast(msg) {
    const existing = document.querySelector('.apex-toast');
    if (existing) existing.remove();
    const toast = document.createElement('div');
    toast.className = 'apex-toast';
    toast.innerText = msg;
    document.body.appendChild(toast);
    setTimeout(() => { if (toast.parentNode) toast.remove(); }, 3000);
  }

  async function handleEvent(e) {
    const target = e.target.closest('[data-apex]');
    if (!target) return;
    const action = target.dataset.apex;
    const val = target.dataset.val;
    const id = target.dataset.id;
    const persona = target.dataset.persona;
    const view = target.dataset.view;
    const need = target.dataset.need;
    const intent = target.dataset.intent;

    if (action === 'quick-intent') {
      const ctx = getDaNangDiurnalContext();
      if (intent === 'student') {
        state.persona = 'student';
        state.budgetTier = 'under_50k';
        state.durationMins = '30';
        state.needCollection = 'campus_student';
        state.viewMode = 'intent_student';
      } else if (intent === 'office') {
        state.persona = 'office';
        state.budgetTier = 'under_50k';
        state.durationMins = '45';
        state.needCollection = 'lunch_under_50k';
        state.viewMode = 'intent_office';
      } else if (intent === 'group') {
        state.persona = 'all';
        state.needCollection = 'group_hangout';
        state.viewMode = 'intent_group';
      }
      render();
    } else if (action === 'filter-need') {
      state.needCollection = need || 'all';
      render();
    } else if (action === 'select-zone') {
      state.selectedZone = target.value || 'all';
      render();
    } else if (action === 'select-budget') {
      state.budgetTier = target.value || 'all';
      render();
    } else if (action === 'select-duration') {
      state.durationMins = target.value || 'all';
      render();
    } else if (action === 'reset-filters') {
      state.persona = 'all';
      state.timeSlot = 'all';
      state.needCollection = 'all';
      state.budgetTier = 'all';
      state.durationMins = 'all';
      state.selectedZone = 'all';
      state.viewMode = 'all';
      state.query = '';
      render();
    } else if (action === 'nav') {
      state.viewMode = view || 'all';
      if (persona) state.persona = persona;
      render();
    } else if (action === 'filter-persona') {
      state.persona = val || 'all';
      try { localStorage.setItem('jayt_preferred_persona', state.persona); } catch {}
      render();
    } else if (action === 'filter-time') {
      state.timeSlot = val || 'all';
      render();
    } else if (action === 'save') {
      const idx = state.saved.indexOf(id);
      if (idx > -1) {
        state.saved.splice(idx, 1);
        showToast('Đã bỏ lưu nguồn.');
      } else {
        state.saved.push(id);
        showToast('⭐ Đã lưu nguồn vào danh sách cá nhân!');
      }
      try { localStorage.setItem('jayt_pinned_deals', JSON.stringify(state.saved)); } catch {}
      render();
    } else if (action === 'toggle-plan') {
      syncTodayPlanState();
      const idx = state.todayPlan.indexOf(id);
      if (idx > -1) {
        state.todayPlan.splice(idx, 1);
        delete state.planStatus[id];
        showToast('Đã xóa khỏi kế hoạch hôm nay.');
      } else {
        if (state.todayPlan.length >= 3) {
          showToast('⚠️ Kế hoạch hôm nay tối đa 3 nguồn!');
          return;
        }
        state.todayPlan.push(id);
        state.planStatus[id] = 'pending';
        showToast('📋 Đã thêm vào kế hoạch hôm nay!');
      }
      saveTodayPlanToStorage();
      render();
    } else if (action === 'hunt') {
      const found = dataStore.deals.find(d => (d.deal_id || d.id || '').toLowerCase().includes((id || '').toLowerCase()));
      if (found) {
        state.activeModal = found;
        render();
      }
    } else if (action === 'close-modal' || action === 'close') {
      state.activeModal = null;
      render();
    } else if (action === 'confirm-outbound' || action === 'confirm') {
      const dealId = target.dataset.id || id;
      const targetDeal = dataStore.deals.find(d => d.deal_id === dealId) || state.activeModal;
      state.activeModal = null;
      render();

      if (!isHttpRuntime()) {
        showToast('🛡️ Chế độ an toàn: Đã chặn điều hướng từ tệp cục bộ.');
        return;
      }

      try {
        const popup = window.open('about:blank', '_blank');
        const tokenResp = await fetch('/api/token/issue', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ deal_id: targetDeal?.deal_id || dealId })
        });
        if (!tokenResp.ok) throw new Error('ERR_TOKEN_ISSUE_FAILED');
        const tokenData = await tokenResp.json();
        const outboundUrl = tokenData.outbound_endpoint || `/out?token=${tokenData.token}&cid=${tokenData.correlation_id}`;
        
        if (popup && popup.location) {
          popup.location.href = outboundUrl;
        } else {
          window.location.href = outboundUrl;
        }
      } catch (err) {
        console.error('[JAYT-GATEWAY] Lỗi phát hành token:', err);
        showToast('⚠️ Không thể kết nối tới cổng bảo mật. Vui lòng thử lại sau.');
      }
    } else if (action === 'onboard-select') {
      state.persona = persona || 'all';
      state.onboardingModalOpen = false;
      state.onboardingDismissed = true;
      try {
        localStorage.setItem('jayt_preferred_persona', state.persona);
        localStorage.setItem('jayt_onboarding_completed', 'true');
      } catch {}
      render();
    } else if (action === 'onboard-skip') {
      state.onboardingModalOpen = false;
      state.onboardingDismissed = true;
      try { localStorage.setItem('jayt_onboarding_completed', 'true'); } catch {}
      render();
    } else if (action === 'open-feedback') {
      const dealObj = dataStore.deals.find(d => d.deal_id === id);
      state.feedbackDealId = id;
      state.feedbackDealTitle = dealObj ? dealObj.title : id;
      state.feedbackModalOpen = true;
      render();
    } else if (action === 'close-feedback') {
      state.feedbackModalOpen = false;
      render();
    } else if (action === 'submit-feedback') {
      const reasonEl = document.getElementById('apex-feedback-reason');
      const noteEl = document.getElementById('apex-feedback-note');
      const payload = {
        deal_id: state.feedbackDealId,
        reason: reasonEl ? reasonEl.value : 'OTHER',
        note: noteEl ? noteEl.value : '',
        timestamp: new Date().toISOString()
      };
      try {
        const storedFeedbacks = JSON.parse(localStorage.getItem('jayt_community_feedback') || '[]');
        storedFeedbacks.push(payload);
        localStorage.setItem('jayt_community_feedback', JSON.stringify(storedFeedbacks));
      } catch {}
      state.feedbackModalOpen = false;
      showToast('Cảm ơn bạn! Phản hồi đã được ghi nhận trên thiết bị.');
      render();
    }
  }

  function handleSearchInput(e) {
    if (e.target && e.target.dataset.apex === 'search-input') {
      state.query = e.target.value.trim();
      render();
    }
  }

  function handleKeydown(e) {
    if (e.key === 'Escape') {
      if (state.activeModal || state.onboardingModalOpen || state.feedbackModalOpen) {
        state.activeModal = null;
        state.onboardingModalOpen = false;
        state.feedbackModalOpen = false;
        render();
      }
    }
  }

  async function boot() {
    document.body.classList.add('jayt-apex-active');

    try {
      const savedPins = localStorage.getItem('jayt_pinned_deals');
      if (savedPins) state.saved = JSON.parse(savedPins);
      const savedPersona = localStorage.getItem('jayt_preferred_persona');
      if (savedPersona) state.persona = savedPersona;
      const onboardDone = localStorage.getItem('jayt_onboarding_completed');
      if (!onboardDone) state.onboardingModalOpen = true;
    } catch {}

    syncTodayPlanState();
    await loadSourceOfTruthData();
    render();

    document.addEventListener('click', handleEvent);
    document.addEventListener('input', handleSearchInput);
    document.addEventListener('keydown', handleKeydown);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
