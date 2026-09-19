const fs = require('fs');
const path = require('path');

/**
 * QA GATE: GENERIC STAGING & PUBLIC PROVENANCE AUDITOR
 * Architecture: JAYT-245 Section AB (Strict Neutral Schema & Non-Interference Contract)
 */

console.log('========================================================================');
console.log('🛡️ JAYT-245 QA GATE: GENERIC STAGING & PUBLIC PROVENANCE AUDITOR');
console.log('========================================================================\n');

function runGenericProvenanceAudit() {
  const PROJECT_ROOT = path.resolve(__dirname, '..');
  const DATA_DIR = path.join(PROJECT_ROOT, '04_DATA_PIPELINE');
  const SOT_DIR = path.join(PROJECT_ROOT, '03_SOURCE_OF_TRUTH');
  const DEPLOY_DIR = path.join(PROJECT_ROOT, 'deploy');

  let passed = true;

  // 1. Audit Staging Neutral Queue Schema
  console.log('🔍 [Check 1] Auditing staging_50_target_research_queue_neutral.json...');
  const queueFile = path.join(DATA_DIR, 'staging_50_target_research_queue_neutral.json');
  if (!fs.existsSync(queueFile)) {
    console.error('❌ Staging neutral queue file missing!');
    passed = false;
  } else {
    const queueData = JSON.parse(fs.readFileSync(queueFile, 'utf8'));
    const prohibitedTokens = ['giảm giá', 'voucher', 'miễn phí', 'free pro', 'quận hải châu', 'quận thanh khê', 'quận liên chiểu', 'đường bạch đằng', 'đường trần phú', 'combo ăn trưa'];
    
    let claimViolations = 0;
    queueData.targets.forEach(t => {
      const serialized = JSON.stringify(t).toLowerCase();
      for (const token of prohibitedTokens) {
        if (serialized.includes(token)) {
          console.error(`   ❌ Target ${t.target_id} contains prohibited synthetic claim token: "${token}"`);
          claimViolations++;
          passed = false;
        }
      }
    });

    if (claimViolations === 0) {
      console.log(`   ✅ All ${queueData.targets.length} targets follow strict neutral identifier schema.`);
    }
  }

  // 2. Audit Public Interface Source of Truth: No Staging References
  console.log('\n🔍 [Check 2] Auditing public interface for staging leakages & unbound claims...');
  const jsSotFile = path.join(SOT_DIR, 'jayt_apex_interface.js');
  const jsContent = fs.readFileSync(jsSotFile, 'utf8');

  if (jsContent.includes('staging_50_target_research_queue_neutral') || jsContent.includes('staging_50_stratified_candidates_queue')) {
    console.error('❌ Public JS references staging queues directly!');
    passed = false;
  } else {
    console.log('   ✅ Public JS contains zero references to internal staging queues.');
  }

  // 3. Audit Locality Binding in Public Items
  console.log('\n🔍 [Check 3] Auditing public items locality provenance...');
  const itemsMatch = jsContent.match(/const JAYT_DISCOVERY_ITEMS = (\[[\s\S]*?\]);/);
  if (!itemsMatch) {
    console.error('❌ Could not parse JAYT_DISCOVERY_ITEMS from public JS!');
    passed = false;
  } else {
    const items = JSON.parse(itemsMatch[1]);
    let localityViolations = 0;
    items.forEach(item => {
      if (item.tier === 'RADAR_TRACKING' && item.cluster !== 'Khu vực đang xác minh' && item.cluster !== 'Toàn quốc') {
        console.error(`   ❌ Radar item ${item.id} has unbound locality: "${item.cluster}"`);
        localityViolations++;
        passed = false;
      }
    });

    if (localityViolations === 0) {
      console.log(`   ✅ All ${items.length} public items adhere to strict locality provenance rules.`);
    }
  }

  // 4. Audit Affiliate Access Status
  console.log('\n🔍 [Check 4] Auditing affiliate disclosure status...');
  const affFile = path.join(DATA_DIR, 'affiliate_portal_inventory_survey.json');
  if (!fs.existsSync(affFile)) {
    console.error('❌ Affiliate survey file missing!');
    passed = false;
  } else {
    const affData = JSON.parse(fs.readFileSync(affFile, 'utf8'));
    if (affData.portal_access_status !== 'PORTAL_ACCESS_NOT_VERIFIED') {
      console.error(`❌ Invalid affiliate portal access status: ${affData.portal_access_status}`);
      passed = false;
    } else {
      console.log('   ✅ Affiliate survey explicitly discloses PORTAL_ACCESS_NOT_VERIFIED.');
    }
  }

  console.log('------------------------------------------------------------------------');
  if (!passed) {
    console.error('❌ [GENERIC-PROVENANCE-GATE-FAIL] Audit failed violations detected!');
    process.exit(1);
  }

  console.log('🟢 [GENERIC-PROVENANCE-GATE-PASS] 100% Staging Neutrality & Provenance Integrity Verified!');
  console.log('========================================================================');
}

runGenericProvenanceAudit();
