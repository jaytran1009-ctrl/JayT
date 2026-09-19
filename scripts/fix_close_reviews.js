const fs = require('fs');

let code = fs.readFileSync('03_SOURCE_OF_TRUTH/jayt_apex_interface.js', 'utf8');

const target = `function closeAuthenticReviewsModal() {
  const modal = document.getElementById('jayt-authentic-reviews-modal');
  if (modal) {
    modal.classList.remove('is-open');
    modal.style.display = 'none';
  }
  if (typeof document !== 'undefined' && document.body) {
    document.body.style.overflow = '';
  }
}`;

const replacement = `function closeAuthenticReviewsModal() {
  const modal = document.getElementById('jayt-authentic-reviews-modal');
  if (modal) {
    modal.classList.remove('is-open');
    modal.style.display = 'none';
    modal._currentReview = null;
    modal._currentRadar = null;
    modal._currentBestPlatformId = null;
    modal._currentTargetPayload = null;
    modal._currentVoucherCode = null;
    modal._currentBestPrice = null;
    modal._currentBestPlatformName = null;
  }
  if (typeof document !== 'undefined' && document.body) {
    document.body.style.overflow = '';
  }
}`;

if (code.includes(target)) {
  code = code.replace(target, replacement);
  fs.writeFileSync('03_SOURCE_OF_TRUTH/jayt_apex_interface.js', code, 'utf8');
  console.log('Successfully updated closeAuthenticReviewsModal with complete state destruction');
} else {
  console.error('Target closeAuthenticReviewsModal not found');
  process.exit(1);
}
