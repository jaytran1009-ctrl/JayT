const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  const userDataDir = path.resolve('scratch/chrome_zoom_profile');
  fs.mkdirSync(path.join(userDataDir, 'Default'), { recursive: true });

  // 200% zoom level in Chromium is log(2.0)/log(1.2) = 3.8017840169239308
  const zoomLevel = 3.8017840169239308;
  const prefs = {
    partition: {
      default_zoom_level: {
        x: zoomLevel
      },
      per_host_zoom_levels: {
        x: {
          '127.0.0.1': zoomLevel
        }
      }
    }
  };
  fs.writeFileSync(path.join(userDataDir, 'Default', 'Preferences'), JSON.stringify(prefs, null, 2), 'utf8');

  console.log('Preferences written with zoomLevel:', zoomLevel);

  const browser = await puppeteer.launch({
    headless: false, // Visible interactive Chrome session!
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    userDataDir: userDataDir,
    args: [
      '--window-size=1280,900',
      '--force-device-scale-factor=1'
    ]
  });

  const page = (await browser.pages())[0] || await browser.newPage();
  await page.goto('http://127.0.0.1:4176/commercial_test.html', { waitUntil: 'networkidle0' });

  const zoomInfo = await page.evaluate(() => {
    return {
      devicePixelRatio: window.devicePixelRatio,
      innerWidth: window.innerWidth,
      outerWidth: window.outerWidth,
      effectiveZoom: window.outerWidth / window.innerWidth
    };
  });
  console.log('Visible Chrome Zoom Info:', zoomInfo);

  const screenshotPath = path.resolve('07_QUALITY_ASSURANCE/runtime_evidence/screenshots/chrome_visible_zoom_200.png');
  fs.mkdirSync(path.dirname(screenshotPath), { recursive: true });
  await page.screenshot({ path: screenshotPath });
  console.log('Saved screenshot to:', screenshotPath);

  await new Promise(r => setTimeout(r, 2000));
  await browser.close();
})();
