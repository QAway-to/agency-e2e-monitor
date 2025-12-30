import { agencyTest as test, expect } from '../lib/agency-test';

test('Smoke Check: Main Page Load', async ({ page }) => {
    // Note: Logging and Error Monitoring are now handled automatically by 'agencyTest'

    console.log(`[START] Navigating to ${process.env.TARGET_URL || '/'}`);

    // 1. Navigate to the project URL
    try {
        await page.goto('/', { timeout: 30000, waitUntil: 'networkidle' });
    } catch (e: any) {
        throw new Error(`Failed to navigate to home page: ${e.message}`);
    }

    // 2. Basic sanity check (Page Title)
    const title = await page.title();
    console.log(`[INFO] Page Title: "${title}"`);
    expect(title).not.toBe('');

    // 3. Screenshot
    await page.screenshot({ path: 'screenshots/smoke_refactored.png', fullPage: true });
    console.log('[INFO] Screenshot saved to screenshots/smoke_refactored.png');

    console.log('[SUCCESS] Main page loaded.');
});
