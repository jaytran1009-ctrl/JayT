const fs = require('fs');
let code = fs.readFileSync('03_SOURCE_OF_TRUTH/jayt_apex_interface.js', 'utf8');

const target = "<button type=\"button\" class=\"btn-open-reviews-from-radar\" onclick=\"triggerJaytSensoryFeedback(event); openAuthenticReviewsModal((this.closest('.j401-voucher-result') && this.closest('.j401-voucher-result')._currentRadar) || null);\"";
const replacement = "<button type=\"button\" class=\"btn-open-reviews-from-radar\" onclick=\"triggerJaytSensoryFeedback(event); openAuthenticReviewsModal((this.closest(\\'j401-voucher-result\\') && this.closest(\\'.j401-voucher-result\\')._currentRadar) || null);\"";

// Actually, in line 10088 it is inside a single-quoted JS string:
// '<button type="button" ... onclick="triggerJaytSensoryFeedback(event); openAuthenticReviewsModal((this.closest(\'.j401-voucher-result\') ...'
const oldLine = "'<button type=\"button\" class=\"btn-open-reviews-from-radar\" onclick=\"triggerJaytSensoryFeedback(event); openAuthenticReviewsModal((this.closest('.j401-voucher-result') && this.closest('.j401-voucher-result')._currentRadar) || null);\"";
const newLine = "'<button type=\"button\" class=\"btn-open-reviews-from-radar\" onclick=\"triggerJaytSensoryFeedback(event); openAuthenticReviewsModal((this.closest(\\'.j401-voucher-result\\') && this.closest(\\'.j401-voucher-result\\')._currentRadar) || null);\"";

if (code.includes(oldLine)) {
  code = code.replace(oldLine, newLine);
  fs.writeFileSync('03_SOURCE_OF_TRUTH/jayt_apex_interface.js', code, 'utf8');
  console.log('Fixed successfully!');
} else {
  console.log('Target line not found directly, finding via split');
  const lines = code.split('\n');
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes("class=\"btn-open-reviews-from-radar\"") && lines[i].includes("j401-voucher-result")) {
      console.log('Found line', i + 1, lines[i]);
      lines[i] = "      '<button type=\"button\" class=\"btn-open-reviews-from-radar\" onclick=\"triggerJaytSensoryFeedback(event); openAuthenticReviewsModal((this.closest(\\x27.j401-voucher-result\\x27) && this.closest(\\x27.j401-voucher-result\\x27)._currentRadar) || null);\" style=\"width: 100%; padding: 10px 14px; border-radius: 10px; font-size: 12px; font-weight: 750; border: 1.5px solid rgba(16,185,129,0.5); background: rgba(16,185,129,0.12); color: #34D399; cursor: pointer; display: flex; justify-content: center; align-items: center; gap: 6px; margin-bottom: 14px; box-shadow: 0 2px 10px rgba(16,185,129,0.15);\">' +";
      break;
    }
  }
  fs.writeFileSync('03_SOURCE_OF_TRUTH/jayt_apex_interface.js', lines.join('\n'), 'utf8');
  console.log('Fixed via line replacement!');
}
