import { test, expect } from '@playwright/test';

test('Verify Fix: Scrape Round 9 (Should succeed via local fix)', async ({ page }) => {
    // 1. Navigate to the main page
    console.log('[START] Navigating to home page...');
    await page.goto('/', { waitUntil: 'networkidle' });

    // 1.5 Select Mode (Season Stats)
    // The logs showed we are at "Choose Scraping Mode"
    console.log('[STEP] Selecting Season Stats mode...');
    await page.locator('text=Season Stats').click();

    // 2. Select Season 2024
    console.log('[STEP] Selecting Season 2024...');
    // Now the form should be visible
    const seasonSelect = page.getByLabel('Season Year', { exact: false }).or(page.locator('select').first());
    await seasonSelect.waitFor({ timeout: 5000 });
    await seasonSelect.selectOption({ label: '2024' }).catch(() => seasonSelect.selectOption({ value: '2024' }));

    // 3. Select Round 9
    console.log('[STEP] Selecting Round 9...');
    const roundSelect = page.getByLabel('Round', { exact: false }).or(page.locator('select').nth(1));
    await roundSelect.waitFor();
    await roundSelect.selectOption({ label: 'Round 9' }).catch(() => roundSelect.selectOption({ value: '9' }));

    // 4. Click Start Scraping
    console.log('[STEP] Clicking Start Scraping...');
    await page.getByRole('button', { name: 'Start Scraping', exact: false }).click();

    // 5. Expectation: SUCCESS
    // The defect is fixed locally, so we expect NO error.

    // Wait for a short bit to see if error appears
    const errorLocator = page.locator('text=/Error|Round.*not found/i');

    try {
        await expect(errorLocator).not.toBeVisible({ timeout: 10000 });
        console.log('[SUCCESS] No error appeared. Fix Verified!');

        // Optional: Check if logs appeared in the log area (ScraperLogs)
        const logs = page.locator('.scraper-logs');
        if (await logs.isVisible()) {
            const logText = await logs.textContent();
            console.log('[INFO] Logs: ' + logText.substring(0, 200) + '...');
        }

    } catch (e) {
        // Capture the error text if possible
        const errorText = await errorLocator.first().textContent().catch(() => 'Unknown Error');
        console.log(`[FAILURE] Error appeared: "${errorText}"`);

        // Take a screenshot of the error state
        await page.screenshot({ path: 'screenshots/fix_verification_failed.png', fullPage: true });

        // Fail the test
        throw new Error(`Fix Failed: Application showed error: ${errorText}`);
    }
});
