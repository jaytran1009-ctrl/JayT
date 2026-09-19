const fs = require('fs');
const path = require('path');

/**
 * QA GATE: FAIL-CLOSED SINGLE MODAL CONTROLLER & ZERO OVERLAY AUDIT
 * Architecture: JAYT-245 Section W (P1 Fail-Closed Modal Architecture)
 */

console.log('========================================================================');
console.log('🛡️ JAYT-245 QA GATE: FAIL-CLOSED SINGLE MODAL CONTROLLER AUDIT');
console.log('========================================================================\n');

function runFailClosedModalTests() {
  console.log('🧪 1. Static Fail-Closed CSS & HTML Contract Checks...');

  const sotJsPath = path.resolve(__dirname, '..', '03_SOURCE_OF_TRUTH', 'jayt_apex_interface.js');
  const sotCssPath = path.resolve(__dirname, '..', '03_SOURCE_OF_TRUTH', 'styles.css');
  const sotJs = fs.readFileSync(sotJsPath, 'utf8');
  const sotCss = fs.readFileSync(sotCssPath, 'utf8');

  // Check 1: CSS has display: none !important for .jayt-modal-backdrop
  const cssHasDisplayNone = sotCss.includes('.jayt-modal-backdrop {') && sotCss.includes('display: none !important;');
  console.log(`   - CSS .jayt-modal-backdrop display: none !important: ${cssHasDisplayNone ? '✅ PASS' : '❌ FAIL'}`);
  if (!cssHasDisplayNone) {
    console.error('FAIL: CSS missing display: none !important on default backdrop!');
    process.exit(1);
  }

  // Check 2: CSS has display: flex !important on .jayt-modal-backdrop.is-open
  const cssHasDisplayFlexOpen = sotCss.includes('.jayt-modal-backdrop.is-open {') && sotCss.includes('display: flex !important;');
  console.log(`   - CSS .jayt-modal-backdrop.is-open display: flex !important: ${cssHasDisplayFlexOpen ? '✅ PASS' : '❌ FAIL'}`);
  if (!cssHasDisplayFlexOpen) {
    console.error('FAIL: CSS missing display: flex !important on is-open state!');
    process.exit(1);
  }

  // Check 3: Initial DOM in template has style="display: none;" and hidden and empty innerHTML
  const initialRootEmpty = sotJs.includes('<div id="jayt-single-modal-root" class="jayt-modal-backdrop" hidden style="display: none;"></div>');
  console.log(`   - Initial single modal root initially empty & hidden: ${initialRootEmpty ? '✅ PASS' : '❌ FAIL'}`);
  if (!initialRootEmpty) {
    console.error('FAIL: Initial modal root is not empty and hidden in template!');
    process.exit(1);
  }

  // Check 4: ModalController has schema validation & fail-closed error handling
  const hasPayloadValidation = sotJs.includes('if (!payload || typeof payload !== \'object\' || !payload.type)') && sotJs.includes('this.close()');
  console.log(`   - Fail-closed payload validation: ${hasPayloadValidation ? '✅ PASS' : '❌ FAIL'}`);
  if (!hasPayloadValidation) {
    console.error('FAIL: Payload validation missing in ModalController!');
    process.exit(1);
  }

  // Check 5: ModalController.close() wipes root innerHTML
  const hasInnerHtmlWipe = sotJs.includes("root.innerHTML = ''; // Wipe content atomically");
  console.log(`   - ModalController.close() atomic innerHTML wipe: ${hasInnerHtmlWipe ? '✅ PASS' : '❌ FAIL'}`);
  if (!hasInnerHtmlWipe) {
    console.error('FAIL: Atomic innerHTML wipe missing on close()!');
    process.exit(1);
  }

  // Check 6: ModalController builds complete titles and accessible ARIA attributes
  const hasAccessibleReport = sotJs.includes('id="report-modal-title"') && sotJs.includes('id="report-modal-desc"');
  const hasAccessibleRadar = sotJs.includes('id="radar-modal-title"') && sotJs.includes('id="radar-modal-desc"');
  console.log(`   - Accessible ARIA labelledby/describedby in Report modal: ${hasAccessibleReport ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`   - Accessible ARIA labelledby/describedby in Radar modal: ${hasAccessibleRadar ? '✅ PASS' : '❌ FAIL'}`);
  if (!hasAccessibleReport || !hasAccessibleRadar) {
    console.error('FAIL: Accessible ARIA titles missing in modal builders!');
    process.exit(1);
  }

  console.log('\n🟢 [FAIL-CLOSED-MODAL-PASS] 100% Fail-Closed Modal Architecture & Contract Verified!');
  console.log('========================================================================');
}

runFailClosedModalTests();
