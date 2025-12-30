import { test as base, Page, TestInfo } from '@playwright/test';

// Define the custom fixture type if we want to extend it later
// For now, we mainly override the 'page' fixture to add auto-listeners
type AgencyFixtures = {
    // We can add custom fixtures here like 'authWorker', 'apiClient' etc.
};

export const agencyTest = base.extend<AgencyFixtures>({
    page: async ({ page }, use, testInfo) => {
        // 1. Setup Auto-Logging
        const errorLogs: string[] = [];
        const failedRequests: string[] = [];

        // Console listener
        page.on('console', msg => {
            if (msg.type() === 'error') {
                const text = `[CONSOLE] ${msg.text()}`;
                console.log(text);
                errorLogs.push(text);
            }
        });

        // Network listener
        page.on('response', response => {
            const status = response.status();
            if (status >= 400 && status < 600) {
                const msg = `[NETWORK] ${response.request().method()} ${response.url()} -> ${status}`;
                console.log(msg);
                failedRequests.push(msg);
            }
        });

        // 2. Use the page
        await use(page);

        // 3. Post-Test Verification (Implicit Assertions)
        // If the test failed explicitly, we don't need to do anything extra, Playwright handles it.
        // But if we want to fail on "silent" errors (console/network) that happened during the test:

        if (testInfo.status === 'passed' || testInfo.status === 'skipped') {
            // Optional: strict mode - fail if any console errors occurred even if logic passed
            // In many legacy apps this might be too strict, but for Agency work it's good to know.
            if (failedRequests.length > 0) {
                console.warn(`[WARNING] Test passed logic but had ${failedRequests.length} network errors.`);
                // Uncomment to enforce strict network cleanliness:
                // throw new Error(`Network Errors Detected:\n${failedRequests.join('\n')}`);
            }
        }
    }
});

export { expect } from '@playwright/test';
