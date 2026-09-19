const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert');

const repoRoot = path.resolve(__dirname, '..');

const harvestDirs = [
  path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'evidence_198_leaf_harvest'),
  path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'evidence_200_autopilot_harvest'),
  path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'evidence_201_actionable_harvest'),
  path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'evidence_197_harvest')
];

function sha256Buf(buf) { return crypto.createHash('sha256').update(buf).digest('hex'); }
function sha256File(p) { return fs.existsSync(p) ? sha256Buf(fs.readFileSync(p)) : null; }

function findArtifactPath(fileName) {
  for (const dir of harvestDirs) {
    const full = path.join(dir, fileName);
    if (fs.existsSync(full)) return full;
  }
  return null;
}

function normalize(str) {
  if (!str) return '';
  return str.toLowerCase().replace(/[\r\n\t]+/g, ' ').replace(/\s+/g, ' ').trim();
}

function runPromotedSourcesTests208() {
  console.log('========================================================================');
  console.log('🧪 JAYT-208: PROMOTED SOURCES & REAL SAVINGS TEST SUITE');
  console.log('   Timestamp: ' + new Date().toISOString());
  console.log('========================================================================\n');

  const tests = [];
  function record(name, pass, details) {
    tests.push({ name, pass, details });
    console.log((pass ? '  ✅ PASS: ' : '  ❌ FAIL: ') + name + '\n     ' + details);
  }

  const feed208Path = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'generated_promoted_savings_feed_208.json');
  assert(fs.existsSync(feed208Path), 'Feed 208 not found');
  const feed = JSON.parse(fs.readFileSync(feed208Path, 'utf8'));

  const ledgerPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'CLAIM_LEDGER_208.json');
  assert(fs.existsSync(ledgerPath), 'Claim Ledger 208 not found');
  const ledger = JSON.parse(fs.readFileSync(ledgerPath, 'utf8'));

  const cards = feed.source_bound_cards || [];

  // --- TEST 1: CLAIM-LEDGER 1-TO-1 AUDIT BINDING ---
  try {
    assert.strictEqual(cards.length, ledger.total_claims, 'Feed card count must match ledger claim count');
    for (const card of cards) {
      assert(card.claim_id, `Card ${card.deal_id} missing claim_id`);
      const ledgerEntry = ledger.claims.find(c => c.claim_id === card.claim_id);
      assert(ledgerEntry, `Claim ID ${card.claim_id} not found in Claim Ledger`);
      assert.strictEqual(ledgerEntry.quote, card.offer_quote, `Quote mismatch for ${card.claim_id}`);
      assert.strictEqual(ledgerEntry.evidence_file, card.evidence_file, `File mismatch for ${card.claim_id}`);
      assert.strictEqual(ledgerEntry.evidence_sha256, card.evidence_sha256, `SHA mismatch for ${card.claim_id}`);
    }
    record('TEST_01_CLAIM_LEDGER_1_TO_1_AUDIT', true, `100% (${cards.length}/${cards.length}) cards strictly bound to verified Claim-Ledger entries.`);
  } catch (err) {
    record('TEST_01_CLAIM_LEDGER_1_TO_1_AUDIT', false, err.message);
  }

  // --- TEST 2: PHYSICAL ARTIFACT INTEGRITY & VERBATIM INCLUSION ---
  try {
    for (const card of cards) {
      const diskPath = findArtifactPath(card.evidence_file);
      assert(diskPath && fs.existsSync(diskPath), `Physical file ${card.evidence_file} missing on disk`);

      const actualSha = sha256File(diskPath);
      assert.strictEqual(actualSha, card.evidence_sha256, `SHA mismatch for ${card.claim_id}`);

      const raw = fs.readFileSync(diskPath, 'utf8');
      const clean = raw.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');

      const normRaw = normalize(raw);
      const normClean = normalize(clean);
      const normQuote = normalize(card.offer_quote);

      assert(normRaw.includes(normQuote) || normClean.includes(normQuote), `Quote "${card.offer_quote}" not verbatim in artifact ${card.evidence_file}`);
    }
    record('TEST_02_PHYSICAL_VERBATIM_INTEGRITY', true, `100% (${cards.length}/${cards.length}) cards have verified verbatim grounding and SHA-256 integrity.`);
  } catch (err) {
    record('TEST_02_PHYSICAL_VERBATIM_INTEGRITY', false, err.message);
  }

  // --- TEST 3: STRICT PURGING OF SYNTHETIC EDITORIAL CLAIMS ---
  try {
    for (const card of cards) {
      const forbiddenTokens = ['combo bữa sáng', '90 phút', 'wifi', 'máy lạnh', '60 trạm'];
      for (const token of forbiddenTokens) {
        if (card.disclaimer && card.disclaimer.toLowerCase().includes(token)) {
          throw new Error(`Forbidden editorial claim "${token}" found in card ${card.claim_id}`);
        }
      }
      assert(card.brand, `Card ${card.claim_id} missing brand`);
      assert(card.offer_quote, `Card ${card.claim_id} missing offer_quote`);
      assert(card.source_url, `Card ${card.claim_id} missing source_url`);
    }
    record('TEST_03_STRICT_ZERO_SYNTHETIC_CLAIMS', true, 'Zero synthetic/editorial claims found across all cards. Pure 3-layer data achieved.');
  } catch (err) {
    record('TEST_03_STRICT_ZERO_SYNTHETIC_CLAIMS', false, err.message);
  }

  // --- TEST 4: PROMOTION KPI THRESHOLD MET (>= 10 BLUE CARDS) ---
  try {
    const blueCount = cards.filter(c => c.tier === 'TIER_BLUE_OFFICIAL').length;
    const purpleCount = cards.filter(c => c.tier === 'TIER_PURPLE_RECORDED').length;
    const greenCount = cards.filter(c => c.tier === 'TIER_GREEN_CONFIRMED').length;

    assert(blueCount >= 10, `Expected at least 10 blue official offers, got ${blueCount}`);
    assert.strictEqual(blueCount, 12, `Expected exactly 12 blue official offers, got ${blueCount}`);
    assert.strictEqual(purpleCount, 17, `Expected exactly 17 purple sources, got ${purpleCount}`);
    assert.strictEqual(greenCount, 0, `Expected 0 green, got ${greenCount}`);

    record('TEST_04_PROMOTION_KPI_MET', true, `Promotion KPI exceeded: ${blueCount} 🔵 Ưu đãi chính thức (Min: 10) + ${purpleCount} 🟣 Nguồn ghi nhận.`);
  } catch (err) {
    record('TEST_04_PROMOTION_KPI_MET', false, err.message);
  }

  // --- TEST 5: HEADLINE EXACT MATCH & SOT BINDING ---
  try {
    const expectedHeadline = 'Hôm nay: 0 🟢 · 12 🔵 ưu đãi chính thức · 17 🟣 nguồn chính thức đã ghi nhận';
    assert.strictEqual(feed.strategic_kpi_summary.headline_kpi_string, expectedHeadline, 'Feed headline mismatch');

    const uiCode = fs.readFileSync(path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'jayt_apex_interface.js'), 'utf8');
    assert(uiCode.includes('Hôm nay: 0 🟢 · ${totalBlue} 🔵 ưu đãi chính thức · ${totalPurple} 🟣 nguồn chính thức đã ghi nhận'), 'UI code missing exact headline template');
    assert(uiCode.includes('Real Savings OS 3.348'), 'UI code missing Real Savings OS 3.348 badge');

    record('TEST_05_HEADLINE_AND_SOT_EXACT_MATCH', true, `Headline matches: "${expectedHeadline}" with Real Savings OS 3.348.`);
  } catch (err) {
    record('TEST_05_HEADLINE_AND_SOT_EXACT_MATCH', false, err.message);
  }

  console.log('\n========================================================================');
  const allPassed = tests.every(t => t.pass);
  if (!allPassed) {
    console.error('❌ JAYT-208 TEST SUITE FAILED!');
    process.exit(1);
  } else {
    console.log(`🎉 ALL ${tests.length}/${tests.length} JAYT-208 TESTS PASSED [100% EXCELLENCE]`);
  }
}

if (require.main === module) {
  runPromotedSourcesTests208();
}

module.exports = { runPromotedSourcesTests208 };
