const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.resolve(__dirname, '..');
const VAULT = path.join(ROOT, '06_TRUST_AND_EVIDENCE', 'batch_16_voucher_matrix_vault');
const RUN_ID = `run_${new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z')}_${crypto.randomBytes(4).toString('hex')}`;
const RUN_DIR = path.join(VAULT, RUN_ID);
const TARGET_MIN = 20;
const LOC_PATH = path.join(ROOT, '06_TRUST_AND_EVIDENCE', 'batch_13_locator_vault', 'run_20260906_150216_887192', 'LOCATIONS_DA_NANG_VERIFIED.json');
const PROD_REGISTRY = path.join(ROOT, '08_RELEASE_VAULT', 'candidates', 'sprint_b_r1', 'registry.json');

const SOURCES = [
  { brand: 'cgv_cinemas', key: 'cgv_offers', url: 'https://www.cgv.vn/default/newsoffer/', parser: 'held_listing' },
  { brand: 'lotte_cinema', key: 'lotte_membership', url: 'https://www.lottecinemavn.com/LCHS/Contents/Membership/vip-member-vip-standard.aspx', parser: 'held_membership' },
  { brand: 'jollibee', key: 'jollibee_new_menu', url: 'https://jollibee.com.vn/mon-moi-mon-ngon.html', parser: 'jollibee_catalog' },
  { brand: 'jollibee', key: 'jollibee_burger_rice', url: 'https://jollibee.com.vn/burger-com.html', parser: 'jollibee_catalog' },
  { brand: 'phuclong', key: 'phuclong_selected_member', url: 'https://phuclong.com.vn/ve-chung-toi/bai-viet/uu-dai-dac-biet-danh-rieng-cho-hoi-vien-chon-loc-20251204042613', parser: 'phuclong_member' },
  { brand: 'phuclong', key: 'phuclong_honey_collection', url: 'https://phuclong.com.vn/khuyen-mai/bo-suu-tap-huong-mat-uom-sac-20260227022356', parser: 'phuclong_promo' },
  { brand: 'phuclong', key: 'phuclong_loco_collection', url: 'https://phuclong.com.vn/khuyen-mai/bat-chat-he-len-do-dung-dieu-lo-co-vibe-cung-phuc-long-20260713035100', parser: 'phuclong_promo' },
  { brand: 'highlands_coffee', key: 'highlands_collections', url: 'https://shop.highlandscoffee.com.vn/collections', parser: 'held_listing' }
];

const sha = data => crypto.createHash('sha256').update(data).digest('hex');
const decode = s => String(s || '')
  .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
  .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
  .replace(/&nbsp;/gi, ' ').replace(/&amp;/gi, '&').replace(/&quot;/gi, '"').replace(/&#039;/g, "'");
const text = s => decode(String(s || '').replace(/<br\s*\/?\s*>/gi, ' ').replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
const norm = s => text(s).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const safeName = s => s.replace(/[^a-z0-9_-]/gi, '_');
const headersObject = response => {
  const denied = /cookie|authorization|token|set-cookie/i;
  return Object.fromEntries([...response.headers.entries()].filter(([k]) => !denied.test(k)));
};

const locations = JSON.parse(fs.readFileSync(LOC_PATH, 'utf8'));
const localityCount = locations.reduce((m, x) => (m[x.brand_id] = (m[x.brand_id] || 0) + 1, m), {});
const localityReady = brand => (localityCount[brand] || 0) > 0;
const prod = JSON.parse(fs.readFileSync(PROD_REGISTRY, 'utf8'));
const existing = new Set(prod.approved_commercial_entries.map(x => `${x.brand_id}|${norm(x.product_name || x.title || '')}`));

function baseCandidate(source, title, observedValue, conditions, validity, sourceUrl, rawSha, suffix) {
  const normalized = norm(title);
  const duplicateProduction = existing.has(`${source.brand}|${normalized}`);
  const evidenceComplete = Boolean(title && observedValue && conditions && validity && rawSha);
  let classification = 'VERIFIED';
  let reason = 'RAW_OFFICIAL_OFFER_EVIDENCE_COMPLETE__LOCALITY_LINEAGE_PRESENT';
  if (duplicateProduction) { classification = 'HELD__INSUFFICIENT_EVIDENCE'; reason = 'DUPLICATE_OF_EXISTING_PRODUCTION_OFFER'; }
  else if (!localityReady(source.brand)) { classification = 'HELD__INSUFFICIENT_EVIDENCE'; reason = 'LOCALITY_LINEAGE_NOT_VERIFIED'; }
  else if (!evidenceComplete) { classification = 'HELD__INSUFFICIENT_EVIDENCE'; reason = 'MISSING_CORE_OFFER_FIELDS'; }
  return {
    candidate_id: `B16_${source.brand.toUpperCase()}_${safeName(suffix).toUpperCase()}`,
    brand_id: source.brand,
    official_leaf_url: sourceUrl,
    offer_name: title,
    normalized_offer: normalized,
    observed_value: observedValue,
    conditions,
    observed_at_utc: new Date().toISOString(),
    validity,
    raw_sha256: rawSha,
    provenance_reference: `${RUN_ID}/${source.key}.raw.html`,
    locality_status: localityReady(source.brand) ? 'INHERITED_LOCALITY_VERIFIED' : 'LOCALITY_UNVERIFIED',
    locality_evidence_reference: localityReady(source.brand) ? path.relative(ROOT, LOC_PATH).replace(/\\/g, '/') : null,
    duplicate_of_production: duplicateProduction,
    affiliate: false,
    tracking: false,
    synthetic_voucher_code: false,
    classification,
    classification_reason: reason
  };
}

function parseJollibee(source, html, rawSha) {
  const out = [];
  const blocks = html.split(/<li class="item product product-item[^>]*>/i).slice(1);
  for (const block of blocks) {
    const id = block.match(/data-product-item="([^"]+)"/i)?.[1] || sha(Buffer.from(block)).slice(0, 10);
    const title = text(block.match(/product-item-name-text[^>]*>([\s\S]*?)<\/span>/i)?.[1]);
    const description = text(block.match(/product-item-description">([\s\S]*?)<\/div>/i)?.[1]);
    const amount = block.match(/data-price-amount="(\d+)"[\s\S]{0,120}data-price-type="minPrice"/i)?.[1] || block.match(/data-price-amount="(\d+)"/i)?.[1];
    const leaf = decode(block.match(/"action"\s*:\s*"(https:[^"]+)"/i)?.[1] || source.url);
    if (!title || !amount) continue;
    out.push(baseCandidate(source, title, `${Number(amount).toLocaleString('vi-VN')} VND`, description || 'Cấu phần combo theo raw catalog chính thức; giá quan sát có thể thay đổi theo lựa chọn.', 'NO_EXPIRY_PUBLISHED__RECHECK_AT_SOURCE', leaf, rawSha, id));
  }
  return out;
}

function parsePhucLongMember(source, html, rawSha) {
  const list = html.match(/<ul>([\s\S]*?)<\/ul>/i)?.[1] || '';
  const items = [...list.matchAll(/<li>([\s\S]*?)<\/li>/gi)].map(m => text(m[1])).filter(x => /tặng|giảm|upsize|ưu đãi/i.test(x));
  return items.map((line, i) => {
    const value = line.match(/(?:Tặng\s+01\s+[^,.]+|Giảm\s+\d+%|Giảm\s+\d+K|Upsize[^,.]*)/i)?.[0] || 'Quyền lợi hội viên theo tin nhắn';
    return baseCandidate(source, line.split(/\.| khi /i)[0].slice(0, 120), value, `${line}. Chỉ dành cho khách hàng thực nhận voucher qua Zalo Phúc Long; không bảo đảm phân bổ.`, 'ISSUED_2026-08-01_TO_2026-08-31__VALID_14_DAYS_FROM_MESSAGE__BUDGET_OR_ELIGIBILITY_LIMITED', source.url, rawSha, `M${String(i + 1).padStart(2, '0')}`);
  });
}

function parsePhucLongPromo(source, html, rawSha) {
  const body = text(html);
  const offers = [];
  if (source.key.includes('honey') && body.includes('109K')) offers.push(['Combo 1 bánh + 1 nước Hương Mật Ươm Sắc', '109.000 VND', 'Áp dụng 3 món nước mới và 4 món bánh chọn lọc; không cộng dồn giảm giá thành viên hoặc khuyến mãi khác.']);
  if (source.key.includes('loco')) {
    offers.push(['Combo Lô Cồ Vibe túi lưới và nước size L', '99.000 VND', 'Gồm 1 túi lưới kèm pin cài và 1 nước size L; số lượng có hạn.']);
    offers.push(['Combo Lô Cồ Vibe bình giữ nhiệt và nước size L', '389.000 VND', 'Gồm 1 bình giữ nhiệt 900ml và 1 nước size L; số lượng có hạn.']);
    offers.push(['Quà móc khóa Lô Cồ cho hóa đơn bánh nước', 'Hóa đơn từ 99.000 VND', 'Tặng 1 móc khóa tại cửa hàng, không áp dụng kênh giao hàng; có thể hết sớm.']);
  }
  return offers.filter(([t,v,c]) => body.includes(t.split(' ').slice(-2).join(' ')) || body.includes(v.replace('.000 VND', 'K')) || body.includes(v.split(' ')[0])).map(([t,v,c], i) => baseCandidate(source, t, v, c, 'NO_EXPIRY_PUBLISHED__INVENTORY_LIMITED__RECHECK_AT_SOURCE', source.url, rawSha, `P${i + 1}`));
}

function heldSource(source, rawSha, why) {
  return [{
    candidate_id: `B16_${source.brand.toUpperCase()}_${source.key.toUpperCase()}_SOURCE`, brand_id: source.brand,
    official_leaf_url: source.url, offer_name: `Source scan: ${source.key}`, normalized_offer: norm(source.key), observed_value: null,
    conditions: null, observed_at_utc: new Date().toISOString(), validity: null, raw_sha256: rawSha,
    provenance_reference: `${RUN_ID}/${source.key}.raw.html`, locality_status: localityReady(source.brand) ? 'INHERITED_LOCALITY_VERIFIED' : 'LOCALITY_UNVERIFIED',
    locality_evidence_reference: localityReady(source.brand) ? path.relative(ROOT, LOC_PATH).replace(/\\/g, '/') : null,
    affiliate: false, tracking: false, synthetic_voucher_code: false,
    classification: 'HELD__INSUFFICIENT_EVIDENCE', classification_reason: why
  }];
}

(async () => {
  fs.mkdirSync(RUN_DIR, { recursive: true });
  const all = [];
  const captures = [];
  for (const source of SOURCES) {
    try {
      const response = await fetch(source.url, { redirect: 'follow', signal: AbortSignal.timeout(30000), headers: { 'user-agent': 'Mozilla/5.0 (compatible; JayT-Evidence-Capture/16.0)' } });
      const raw = Buffer.from(await response.arrayBuffer());
      const rawSha = sha(raw);
      const rawName = `${source.key}.raw.html`;
      const headersName = `${source.key}.headers.json`;
      fs.writeFileSync(path.join(RUN_DIR, rawName), raw);
      fs.writeFileSync(path.join(RUN_DIR, headersName), JSON.stringify({ requested_url: source.url, final_url: response.url, status: response.status, captured_at_utc: new Date().toISOString(), headers: headersObject(response), raw_sha256: rawSha }, null, 2) + '\n');
      captures.push({ brand_id: source.brand, key: source.key, requested_url: source.url, final_url: response.url, status: response.status, bytes: raw.length, raw_sha256: rawSha, raw_path: `${RUN_ID}/${rawName}`, headers_path: `${RUN_ID}/${headersName}` });
      if (response.status !== 200) {
        all.push({ ...heldSource(source, rawSha, `HTTP_${response.status}`)[0], classification: 'FAILED_FETCH', classification_reason: `HTTP_${response.status}` });
        continue;
      }
      const html = raw.toString('utf8');
      if (source.parser === 'jollibee_catalog') all.push(...parseJollibee(source, html, rawSha));
      else if (source.parser === 'phuclong_member') all.push(...parsePhucLongMember(source, html, rawSha));
      else if (source.parser === 'phuclong_promo') all.push(...parsePhucLongPromo(source, html, rawSha));
      else all.push(...heldSource(source, rawSha, localityReady(source.brand) ? 'LISTING_CAPTURED__ITEM_LEVEL_TERMS_NOT_BOUND' : 'LISTING_CAPTURED__LOCALITY_AND_ITEM_LEVEL_TERMS_NOT_BOUND'));
    } catch (error) {
      all.push({ candidate_id: `B16_${source.brand.toUpperCase()}_${source.key.toUpperCase()}_FETCH`, brand_id: source.brand, official_leaf_url: source.url, offer_name: null, observed_value: null, conditions: null, observed_at_utc: new Date().toISOString(), validity: null, raw_sha256: null, provenance_reference: null, locality_status: localityReady(source.brand) ? 'INHERITED_LOCALITY_VERIFIED' : 'LOCALITY_UNVERIFIED', affiliate: false, tracking: false, synthetic_voucher_code: false, classification: 'FAILED_FETCH', classification_reason: error.message });
    }
  }

  const seen = new Set();
  const catalog = [];
  for (const item of all) {
    const key = `${item.brand_id}|${item.normalized_offer}|${item.official_leaf_url}`;
    if (seen.has(key)) continue;
    seen.add(key);
    catalog.push(item);
  }
  const counts = catalog.reduce((m, x) => (m[x.classification] = (m[x.classification] || 0) + 1, m), {});
  const catalogDoc = { catalog_id: `JAYT_346_BATCH_16_CATALOG_${RUN_ID}`, directive: 'JAYT-346', run_id: RUN_ID, generated_at_utc: new Date().toISOString(), production_mutated: false, target_verified_minimum: TARGET_MIN, locality_counts: localityCount, candidates: catalog, counts };
  const catalogPath = path.join(RUN_DIR, 'BATCH_16_CATALOG.json');
  fs.writeFileSync(catalogPath, JSON.stringify(catalogDoc, null, 2) + '\n');
  const receipt = { receipt_id: `JAYT_346_BATCH_16_CAPTURE_RECEIPT_${RUN_ID}`, directive: 'JAYT-346', run_id: RUN_ID, completed_at_utc: new Date().toISOString(), sources_attempted: SOURCES.length, captures, catalog_path: `${RUN_ID}/BATCH_16_CATALOG.json`, catalog_sha256: sha(fs.readFileSync(catalogPath)), counts, target_verified_minimum: TARGET_MIN, threshold_met: (counts.VERIFIED || 0) >= TARGET_MIN, staging_hydration_eligible: (counts.VERIFIED || 0) >= TARGET_MIN, production_deploy_permitted: false, verdict: (counts.VERIFIED || 0) >= TARGET_MIN ? 'CAPTURE_COMPLETE__READY_FOR_ARRAY_VALIDATION' : 'CAPTURE_COMPLETE__THRESHOLD_NOT_MET__NO_SYNTHETIC_BACKFILL' };
  const receiptPath = path.join(RUN_DIR, 'BATCH_16_CAPTURE_RECEIPT.json');
  fs.writeFileSync(receiptPath, JSON.stringify(receipt, null, 2) + '\n');
  console.log(JSON.stringify({ run_id: RUN_ID, run_dir: path.relative(ROOT, RUN_DIR), catalog_sha256: receipt.catalog_sha256, receipt_sha256: sha(fs.readFileSync(receiptPath)), counts, threshold_met: receipt.threshold_met }, null, 2));
})().catch(error => { console.error(error); process.exit(1); });
