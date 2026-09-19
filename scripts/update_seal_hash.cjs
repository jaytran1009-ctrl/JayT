const fs = require('fs');
const path = require('path');

const file = path.resolve(__dirname, 'verify_pipeline_seal.cjs');
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
  /\['03_SOURCE_OF_TRUTH\/jayt_apex_interface\.js', \d+, '[a-f0-9]+'\]/,
  "['03_SOURCE_OF_TRUTH/jayt_apex_interface.js', 887613, 'bfefda1fb6295a3e24883ed99ae5efc30e05118708a154ecf6566b61c194d102']"
);
content = content.replace(
  /\['deploy\/jayt_apex_interface\.js', \d+, '[a-f0-9]+'\]/,
  "['deploy/jayt_apex_interface.js', 887613, 'bfefda1fb6295a3e24883ed99ae5efc30e05118708a154ecf6566b61c194d102']"
);
content = content.replace(
  /\['deploy\/public\/jayt_apex_interface\.js', \d+, '[a-f0-9]+'\]/,
  "['deploy/public/jayt_apex_interface.js', 887613, 'bfefda1fb6295a3e24883ed99ae5efc30e05118708a154ecf6566b61c194d102']"
);

fs.writeFileSync(file, content, 'utf8');
console.log('Updated verify_pipeline_seal.cjs successfully.');
