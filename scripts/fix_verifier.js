const fs = require('fs');

let verifier = fs.readFileSync('scripts/verify_pipeline_seal.cjs', 'utf8');

const replacement = `const SEALED_FILES = [
  ['03_SOURCE_OF_TRUTH/jayt_apex_interface.js', 1102767, '35760c0d70a32743acd3789a6a388fffaf7faecbfba0dc9d59bd13716b0ddf35'],
  ['deploy/jayt_apex_interface.js', 1102767, '35760c0d70a32743acd3789a6a388fffaf7faecbfba0dc9d59bd13716b0ddf35'],
  ['deploy/public/jayt_apex_interface.js', 1102767, '35760c0d70a32743acd3789a6a388fffaf7faecbfba0dc9d59bd13716b0ddf35'],`;

const broken = `const SEALED_FILES = [
  /jayt_apex_interface.js,,,
  /jayt_apex_interface.js,,,
  /jayt_apex_interface.js,,,`;

if (verifier.includes(broken)) {
  verifier = verifier.replace(broken, replacement);
  fs.writeFileSync('scripts/verify_pipeline_seal.cjs', verifier, 'utf8');
  console.log('Repaired scripts/verify_pipeline_seal.cjs successfully');
} else {
  console.log('Broken pattern not found, inspecting...');
}
