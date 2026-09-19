const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const DEPLOY_DIR = path.join(ROOT_DIR, 'deploy');
const SOT_DIR = path.join(ROOT_DIR, '03_SOURCE_OF_TRUTH');

const SECRET_PATTERNS = [
  /-----BEGIN [A-Z]+ PRIVATE KEY-----/,
  /ghp_[0-9a-zA-Z]{36}/,
  /vercel_[a-zA-Z0-9]{24,}/i,
  /aws_secret_access_key/i,
  /eyJhbGciOiJSUzI1NiIs[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+/
];

let issues = [];
let filesScanned = 0;

function scanDir(dir, isDeploy = false) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const ent of entries) {
    const fullPath = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      if (ent.name === '.git' || ent.name === 'node_modules' || ent.name === '.vercel') continue;
      scanDir(fullPath, isDeploy);
    } else if (ent.isFile()) {
      if (ent.name.startsWith('.env') && ent.name !== '.env.example') continue; // gitignored
      filesScanned++;
      const content = fs.readFileSync(fullPath, 'utf8');
      
      for (const pat of SECRET_PATTERNS) {
        if (pat.test(content)) {
          issues.push({
            file: path.relative(ROOT_DIR, fullPath),
            issue: `Matched secret pattern: ${pat.toString()}`
          });
        }
      }
    }
  }
}

scanDir(DEPLOY_DIR, true);
scanDir(SOT_DIR, false);

// Check affiliate_enabled in deals_feed.json
const dealsFeedPath = path.join(DEPLOY_DIR, 'deals_feed.json');
let affiliateCheck = 'UNKNOWN';
if (fs.existsSync(dealsFeedPath)) {
  const dealsFeed = JSON.parse(fs.readFileSync(dealsFeedPath, 'utf8'));
  if (dealsFeed.governance && dealsFeed.governance.affiliate_enabled === false) {
    affiliateCheck = 'FAIL_CLOSED_VERIFIED_FALSE';
  } else if (dealsFeed.metadata && dealsFeed.metadata.affiliate_enabled === false) {
    affiliateCheck = 'FAIL_CLOSED_VERIFIED_FALSE';
  } else if (dealsFeed.affiliate_enabled === false) {
    affiliateCheck = 'FAIL_CLOSED_VERIFIED_FALSE';
  } else {
    issues.push({
      file: 'deploy/deals_feed.json',
      issue: 'affiliate_enabled is not false'
    });
  }
}

const report = {
  timestamp: new Date().toISOString(),
  authority: "CEO_DISPATCH_20260919_JAYT_473_PREVIEW_AND_DIRECT_CAPTURE_CANARY",
  status: issues.length === 0 ? "PASSED" : "FAILED",
  files_scanned: filesScanned,
  affiliate_enabled_status: affiliateCheck,
  secret_leaks_detected: issues.length,
  issues: issues
};

fs.writeFileSync(
  path.join(ROOT_DIR, '07_QUALITY_ASSURANCE', 'SECURITY_SCAN_REPORT.json'),
  JSON.stringify(report, null, 2)
);

console.log(`Security Scan Complete. Status: ${report.status}. Scanned ${filesScanned} files. Leaks: ${issues.length}. Affiliate: ${affiliateCheck}`);
if (issues.length > 0) {
  console.error(JSON.stringify(issues, null, 2));
  process.exit(1);
}
