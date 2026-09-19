const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const manifest134dPath = path.resolve(__dirname, '../08_RELEASE_VAULT/INCIDENT_MANIFEST_JAYT_134D_CONTAINMENT.json');
const manifest134ePath = path.resolve(__dirname, '../08_RELEASE_VAULT/INCIDENT_MANIFEST_JAYT_134E_RESET.json');
const jsPath = path.resolve(__dirname, '../03_SOURCE_OF_TRUTH/jayt_apex_interface.js');
const htmlPath = path.resolve(__dirname, '../03_SOURCE_OF_TRUTH/index.html');

// 1. Update 134D status to REJECTED_INCOMPLETE_CONTAINMENT
if (fs.existsSync(manifest134dPath)) {
  const manifest134d = JSON.parse(fs.readFileSync(manifest134dPath, 'utf8'));
  manifest134d.status = 'REJECTED_CONTAINMENT_INCOMPLETE';
  manifest134d.ceo_rejection_reason = 'Audited code still rendered an underground catalog through hardcoded super-app renderers (ShopeeFood 17k, Freeship 18k, 7-day cinema schedule, Jollibee 15, Roulette, fallback prices/addresses).';
  manifest134d.superseded_by = 'INCIDENT-JAYT-134E';
  fs.writeFileSync(manifest134dPath, JSON.stringify(manifest134d, null, 2), 'utf8');
  console.log('✅ Updated 134D status to REJECTED_CONTAINMENT_INCOMPLETE');
}

// 2. Create 134E Incident Manifest
const jsContent = fs.readFileSync(jsPath);
const htmlContent = fs.readFileSync(htmlPath);

const manifest134e = {
  incident_id: "INCIDENT-JAYT-134E",
  directive: "JAYT-134E — P0 Truth Reset & Canonical Renderer Recovery",
  severity: "P0_CRITICAL",
  current_system_state: "P0_UNCONTAINED_PENDING_CEO_INDEPENDENT_AUDIT",
  reported_at: "2026-08-26T18:07:38+07:00",
  reset_at: "2026-08-26T18:10:20+07:00",
  executive_summary: "Comprehensive truth reset shutting down all super-app hardcoded commercial renderers, delivery arbitrage comparisons, 7-day cinema schedules, promo events, and establishing CanonicalRenderGate bound to on-disk cryptographic evidence.",
  quarantined_and_purged_renderers: [
    {
      component: "renderFiveTierDailyDealCanvas",
      reason: "Hardcoded 5-tier super-app canvas with delivery price arbitrage and unverified venue claims.",
      status: "REPLACED_WITH_CANONICAL_TRUTH_CENTER"
    },
    {
      component: "getCinemaSchedule",
      reason: "Hardcoded 7-day cinema discount schedule.",
      status: "PURGED"
    },
    {
      component: "handleArbitrageSliderChange",
      reason: "Synthetic delivery price calculations comparing ShopeeFood, GrabFood, BeFood.",
      status: "PURGED"
    },
    {
      component: "generateBoardingPassTicketCanvas / copyZaloGroupPlanPass",
      reason: "Ticket pass generators with hardcoded commercial prices and venues.",
      status: "PURGED"
    }
  ],
  canonical_gate_enforcement: {
    gate_name: "CanonicalRenderGate",
    strict_fields_required: [
      "id",
      "brand",
      "official_source_url",
      "artifact_path",
      "artifact_sha256",
      "quote",
      "district"
    ],
    rule: "Missing any single field results in instant render rejection."
  },
  source_hashes: {
    jayt_apex_interface_js: {
      sha256: crypto.createHash('sha256').update(jsContent).digest('hex'),
      bytes: jsContent.length
    },
    index_html: {
      sha256: crypto.createHash('sha256').update(htmlContent).digest('hex'),
      bytes: htmlContent.length
    }
  }
};

fs.writeFileSync(manifest134ePath, JSON.stringify(manifest134e, null, 2), 'utf8');
console.log('✅ Created INCIDENT_MANIFEST_JAYT_134E_RESET.json');
