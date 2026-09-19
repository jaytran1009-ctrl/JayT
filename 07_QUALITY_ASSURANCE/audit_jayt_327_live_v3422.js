// Read-only live verification; writes only a dedicated local audit receipt.
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const puppeteer = require('puppeteer');

const root = path.resolve(__dirname, '..');
const base = 'https://jayt-production-v3420.vercel.app';
const sha = b => crypto.createHash('sha256').update(b).digest('hex');
const read = p => fs.readFileSync(path.join(root, p));
const normalize = u => new URL(u).href;

const APPROVED_SLOT_EVIDENCE_ID_MAP = {
  'GITHUB_EDUCATION_PILOT_T2': 'FACT_EZ_G_01_GITHUB_DOCS_ELIGIBILITY',
  'BATCH03_DS_07': 'BATCH03_DS_07_DANABUS_INFORMATION',
  'J287-HK-STUDENT-POLICY-UED-20260903': 'J287_HK_STUDENT_POLICY_UED_20260903',
  'B04_02_KY_SO_TOAN_DAN_Y_TE': 'B04_02_KY_SO_TOAN_DAN_Y_TE',
  'B04_07_THU_VIEN_SO_HOC_LIEU_UED': 'B04_07_THU_VIEN_SO_HOC_LIEU_UED',
  'B04_06_AN_TOAN_TIEM_CHUNG_CDC_DANANG': 'B04_06_AN_TOAN_TIEM_CHUNG_CDC_DANANG',
  'B04_10_LICH_TIEM_CHUNG_TRE_EM_CDC_DANANG': 'B04_10_LICH_TIEM_CHUNG_TRE_EM_CDC_DANANG',
  'B05_01_LICH_TIEM_CHUNG_THAI_KY_CDC_DANANG': 'B05_01_LICH_TIEM_CHUNG_THAI_KY_CDC_DANANG',
  'B05_03_DANABUS_TUYEN_05_HOA_HIEP_NAM_BIEN_DONG': 'B05_03_DANABUS_TUYEN_05_HOA_HIEP_NAM_BIEN_DONG',
  'B06_01_DANABUS_CHUYEN_DOI_XE_BUYT_DIEN_02_13_21': 'B06_01_DANABUS_CHUYEN_DOI_XE_BUYT_DIEN_02_13_21',
  'B06_03_HUONG_DAN_DICH_VU_CONG_TRUC_TUYEN_DANANG': 'B06_03_HUONG_DAN_DICH_VU_CONG_TRUC_TUYEN_DANANG',
  'B06_02_BAN_TIN_SUC_KHOE_CONG_DONG_CDC_DANANG': 'B06_02_BAN_TIN_SUC_KHOE_CONG_DONG_CDC_DANANG',
  'B07_01_DANABUS_CHUYEN_DOI_XE_BUYT_DIEN_03_09_14': 'B07_01_DANABUS_CHUYEN_DOI_XE_BUYT_DIEN_03_09_14',
  'B07_02_CAM_NANG_AN_TOAN_SO_DEEPFAKE_1022': 'B07_02_CAM_NANG_AN_TOAN_SO_DEEPFAKE_1022',
  'B07_03_TRA_CUU_MAY_KHU_RUNG_TIM_AED_CONG_CONG_1022': 'B07_03_TRA_CUU_MAY_KHU_RUNG_TIM_AED_CONG_CONG_1022',
  'B08_01_BAN_DO_SO_UNG_PHO_LU_LUT_HOA_XUAN_1022': 'B08_01_BAN_DO_SO_UNG_PHO_LU_LUT_HOA_XUAN_1022',
  'B08_03_TIEN_ICH_SO_CONG_DONG_WIFI_AN_HAI_1022': 'B08_03_TIEN_ICH_SO_CONG_DONG_WIFI_AN_HAI_1022',
  'B09_01_DANABUS_TUYEN_11_XUAN_DIEU_BEN_XE_TIEN_SA': 'B09_01_DANABUS_TUYEN_11_XUAN_DIEU_BEN_XE_TIEN_SA',
  'B09_02_TRO_LY_SO_DANANG_AI_PHO_BIEN_PHAP_LUAT_1022': 'B09_02_TRO_LY_SO_DANANG_AI_PHO_BIEN_PHAP_LUAT_1022',
  'B09_03_CHIEN_DICH_BAO_VE_DANH_TINH_SO_MA_SO_THUE_1022': 'B09_03_CHIEN_DICH_BAO_VE_DANH_TINH_SO_MA_SO_THUE_1022',
  'B10_01_DIEM_TIEP_NHAN_THU_TUC_HANH_CHINH_TAM_KY_1022': 'B10_01_DIEM_TIEP_NHAN_THU_TUC_HANH_CHINH_TAM_KY_1022',
  'B10_02_PHO_CAP_KY_NANG_SO_VNEID_PHU_NU_1022': 'B10_02_PHO_CAP_KY_NANG_SO_VNEID_PHU_NU_1022',
  'B11_01_TRA_CUU_CHUYEN_BAY_DANANG_SMART_CITY_1022': 'B11_01_TRA_CUU_CHUYEN_BAY_DANANG_SMART_CITY_1022',
  'B11_02_HOAT_DONG_VAN_HOA_BAO_TANG_CHAM_1022': 'B11_02_HOAT_DONG_VAN_HOA_BAO_TANG_CHAM_1022'
};

const B11_01_DISCLAIMER = "Thông tin tiện ích theo bài đăng của Cổng 1022 Đà Nẵng; không bán vé, không nhận đặt chỗ, không thu phí và không cam kết dữ liệu chuyến bay theo thời gian thực.";
const B11_02_DISCLAIMER = "Lịch biểu diễn văn hóa nghệ thuật định kỳ tại Bảo tàng Điêu khắc Chăm Đà Nẵng; người xem cần đối soát thông báo trực tiếp từ ban quản lý bảo tàng trong trường hợp có điều chỉnh thời tiết hoặc lịch đón tiếp ngoại giao.";
const B11_02_SCHEDULE = "buổi sáng các ngày 15 và 30 hằng tháng";

(async () => {
  const result = {
    receipt_id: 'JAYT_327_V3422_LIVE_POST_DEPLOY_AUDIT',
    checked_at_utc: new Date().toISOString(),
    url: base,
    deployment_id: 'dpl_E8GNxXFBYHfBoMuLVD3Dv39DTkSo',
    target_version: 'v3.422.0',
    artifacts: [],
    viewports: [],
    blockers: []
  };

  const manifest = JSON.parse(read('08_RELEASE_VAULT/candidates/v3.422.0/candidate_manifest.json'));
  const registry = JSON.parse(read('08_RELEASE_VAULT/RELEASE_CANDIDATE_v3.422.0_REGISTRY.json'));
  
  const files = Object.values(manifest.artifacts).map(a => ({ name: path.basename(a.path), expected: a.sha256 }));
  files.push({ name: 'candidate_manifest.json', expected: sha(read('08_RELEASE_VAULT/candidates/v3.422.0/candidate_manifest.json')) });

  console.log('--- 1. VERIFYING LIVE EDGE ARTIFACTS ---');
  for (const f of files) {
    const response = await fetch(base + '/' + f.name, { signal: AbortSignal.timeout(20000) });
    const actual = sha(Buffer.from(await response.arrayBuffer()));
    const pass = response.status === 200 && actual === f.expected;
    result.artifacts.push({ ...f, actual, http_status: response.status, pass });
    console.log(`  ${f.name}: status=${response.status}, sha=${actual.slice(0, 16)}... match=${pass}`);
    if (!pass) result.blockers.push('Artifact mismatch: ' + f.name + ' (expected ' + f.expected + ', got ' + actual + ')');
  }

  console.log('\n--- 2. VERIFYING LIVE VIEWPORTS WITH PUPPETEER ---');
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  try {
    for (const width of [1440, 768, 390]) {
      const page = await browser.newPage();
      await page.setCacheEnabled(false);
      await page.setViewport({ width, height: 900 });

      const errors = [], externalRequests = [];
      page.on('pageerror', e => errors.push(String(e)));
      page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
      page.on('request', req => {
        const u = req.url();
        if (!u.startsWith(base + '/') && !u.startsWith('data:') && !u.startsWith('https://vercel.live/')) {
          externalRequests.push(u);
        }
      });

      const response = await page.goto(base, { waitUntil: 'networkidle0', timeout: 30000 });

      const dom = await page.evaluate(() => {
        const cards = [...document.querySelectorAll('.t2-pilot-card-section')];
        const cardDetails = cards.map(c => {
          const id = c.id || '';
          const candidateId = c.dataset.candidateId || '';
          const evidenceBadge = c.querySelector('.t2-evidence-badge');
          const evidenceId = evidenceBadge ? evidenceBadge.textContent.replace('Nguồn đối chiếu:', '').trim() : '';
          const linkEl = c.querySelector('a[href^="http"]');
          const link = linkEl ? linkEl.href : '';
          return { id, candidateId, evidenceId, link };
        });

        const allLinks = [...document.querySelectorAll('.t2-pilot-card-section a[href^="http"]')].map(a => a.href);
        const bodyText = document.body.innerText || '';

        return {
          version: document.body.dataset.ledgerVersion,
          count: cards.length,
          cards: cardDetails,
          links: allLinks,
          overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
          bodyText
        };
      });

      // Verify exact URLs
      const expectedUrls = registry.approved_entities.map(e => normalize(e.external_url)).sort();
      const actualUrls = dom.links.map(u => normalize(u)).sort();
      const linksMatch = JSON.stringify(actualUrls) === JSON.stringify(expectedUrls);

      // Verify exact Evidence IDs
      let evidenceIdsMatch = true;
      const mismatchedEvidence = [];
      for (const card of dom.cards) {
        const expectedEvidence = APPROVED_SLOT_EVIDENCE_ID_MAP[card.candidateId];
        if (expectedEvidence) {
          if (card.evidenceId !== expectedEvidence) {
            evidenceIdsMatch = false;
            mismatchedEvidence.push({ candidateId: card.candidateId, expected: expectedEvidence, actual: card.evidenceId });
          }
        }
      }

      // Verify B11 disclaimers and schedule text
      const b11_01_ok = dom.bodyText.includes(B11_01_DISCLAIMER);
      const b11_02_ok = dom.bodyText.includes(B11_02_DISCLAIMER);
      const schedule_ok = dom.bodyText.includes(B11_02_SCHEDULE);

      const commercialLinks = dom.links.filter(u => /[?&](utm_[^=]*|affiliate|ref|voucher)=|s\.shopee\.vn|go\.isclix/i.test(u));

      const pass = response.status() === 200 &&
        dom.version === 'v3.422.0' &&
        dom.count === 24 &&
        linksMatch &&
        evidenceIdsMatch &&
        b11_01_ok &&
        b11_02_ok &&
        schedule_ok &&
        !dom.overflow &&
        !errors.length &&
        !externalRequests.length &&
        !commercialLinks.length;

      result.viewports.push({
        width,
        http_status: response.status(),
        version: dom.version,
        count: dom.count,
        linksMatch,
        evidenceIdsMatch,
        mismatchedEvidence,
        b11_01_ok,
        b11_02_ok,
        schedule_ok,
        overflow: dom.overflow,
        errors,
        externalRequests,
        commercialLinks,
        pass
      });

      console.log(`  Viewport ${width}px: count=${dom.count}, version=${dom.version}, linksMatch=${linksMatch}, evidenceIdsMatch=${evidenceIdsMatch}, b11_01=${b11_01_ok}, b11_02=${b11_02_ok}, overflow=${dom.overflow}, errors=${errors.length}, pass=${pass}`);

      if (!pass) {
        if (dom.version !== 'v3.422.0') result.blockers.push(`Version mismatch on ${width}px: expected v3.422.0, got ${dom.version}`);
        if (dom.count !== 24) result.blockers.push(`Card count mismatch on ${width}px: expected 24, got ${dom.count}`);
        if (!linksMatch) result.blockers.push(`Links mismatch on ${width}px`);
        if (!evidenceIdsMatch) result.blockers.push(`Evidence ID mismatch on ${width}px: ` + JSON.stringify(mismatchedEvidence));
        if (!b11_01_ok) result.blockers.push(`B11_01 disclaimer missing on ${width}px`);
        if (!b11_02_ok) result.blockers.push(`B11_02 disclaimer missing on ${width}px`);
        if (!schedule_ok) result.blockers.push(`B11_02 schedule rule missing on ${width}px`);
        if (dom.overflow) result.blockers.push(`Horizontal overflow detected on ${width}px`);
        if (errors.length) result.blockers.push(`Console errors on ${width}px: ` + errors.join('; '));
        if (externalRequests.length) result.blockers.push(`External requests on ${width}px: ` + externalRequests.join('; '));
        if (commercialLinks.length) result.blockers.push(`Commercial links detected on ${width}px`);
      }

      await page.close();
    }
  } finally {
    await browser.close();
  }

  console.log('\n--- 3. CHECKING LOCAL DEALS FEED ---');
  result.local_deals_feed_empty = JSON.stringify(JSON.parse(read('05_DEAL_AND_AFFILIATE/deals_feed.json'))) === '[]';
  console.log('  Local deals feed locked empty:', result.local_deals_feed_empty);
  if (!result.local_deals_feed_empty) result.blockers.push('Local deals feed not empty');

  result.pass = result.blockers.length === 0;
  const receiptPath = path.join(__dirname, 'runtime_evidence/JAYT_327_V3422_LIVE_POST_DEPLOY_AUDIT.json');
  fs.writeFileSync(receiptPath, JSON.stringify(result, null, 2) + '\n', 'utf8');

  console.log('\n================ AUDIT SUMMARY ================');
  console.log('Overall PASS:', result.pass);
  console.log('Blockers:', result.blockers);
  console.log('Receipt saved to:', receiptPath);
  console.log('================================================\n');

  if (!result.pass) {
    process.exitCode = 1;
  }
})().catch(e => {
  console.error(e);
  process.exitCode = 1;
});
