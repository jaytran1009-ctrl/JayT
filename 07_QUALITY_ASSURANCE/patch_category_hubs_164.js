const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const pSot = path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'jayt_apex_interface.js');
const pDeploy = path.join(repoRoot, 'deploy', 'jayt_apex_interface.js');

let content = fs.readFileSync(pSot, 'utf8');

const targetStr = `        <!-- TẦNG 3: 🟣 NGUỒN CÔNG KHAI ĐANG THEO DÕI (TRACKED SOURCES) -->`;
const replacementStr = `        \${renderWeeklySavingsScheduleSection()}

        \${renderOnlineStudentPortalsSection()}

        \${renderCommunityProofIntakePromptSection()}

        <!-- TẦNG 3: 🟣 NGUỒN CÔNG KHAI ĐANG THEO DÕI (TRACKED SOURCES) -->`;

if (content.includes(targetStr)) {
  content = content.replace(targetStr, replacementStr);
  fs.writeFileSync(pSot, content, 'utf8');
  fs.writeFileSync(pDeploy, content, 'utf8');
  console.log('✅ Successfully placed 5-stage sections inside renderCategoryHubsCenter163.');
} else {
  console.error('❌ Could not find targetStr!');
}
