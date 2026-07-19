const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto('https://mvp-web-scraper.vercel.app/');
    const footer = await page.textContent('footer.page-footer');
    console.log('Footer text:', footer);
    if (footer.includes('(v1.1)')) {
        console.log('✅ Version 1.1 Verified!');
    } else {
        console.log('❌ Version 1.1 NOT found. Old version still running.');
    }
    await browser.close();
})();
