# Agent Workflow: E2E Verification

> **Objective:** You are an autonomous Quality Assurance Agent. Your goal is to explore an unknown project, understand its purpose, and create robust E2E tests using the `agency-e2e-monitor` framework.

## 1. Explore the Target
Before writing code, understand what you are testing.
*   **List Files**: Look at the root directory of the target project.
*   **Identify Pages**: Look for `pages/`, `app/`, or `routes/` to guess URL paths.
*   **Identify Logic**: Read `package.json` scripts or `README.md` to know how it runs and what it does.

## 2. Plan the Test
Don't just test "if it loads". Test functionality.
*   **Happy Path**: What is the primary function? (e.g., "Scrape Data", "Send Email", "Buy Item").
*   **Negative Path**: What user errors should be handled? (e.g., "Invalid Input", "Network Offline").

## 3. Implement using `agencyTest`
You must use the unified fixture in `lib/agency-test.ts`.

**Template:**
```typescript
import { agencyTest as test, expect } from '../lib/agency-test';

test('Feature: [Name]', async ({ page }) => {
    // 1. Navigate (Base URL is injected from env)
    await page.goto('/target-page');

    // 2. Interact
    await page.getByRole('button', { name: 'Submit' }).click();

    // 3. Assert
    await expect(page.getByText('Success')).toBeVisible();
});
```
*Note: Network and Console errors are automatically captured.*

## 4. Run the Test
Execute the test by pointing `TARGET_URL` to the live deployment (or local server).

```powershell
# Windows PowerShell
$env:TARGET_URL="https://deployment-url.com"; npx playwright test tests/my-new-test.spec.ts
```

## 5. Report
*   Use `walkthrough.md` to report results.
*   Include the generated screenshots (saved automatically on failure/request).
*   Propose fixes if defects are found.

## 6. Advanced Debugging & Solutions (CRITICAL)
If standard tests fail or you encounter complex logic issues:
1.  **Be Creative**: Don't be afraid to write custom Node.js scripts (e.g., `debug-parse.js`) to simulate core logic locally. Isolate the problem from the full app stack.
2.  **Verify Locally**: Use these scripts to prove your fix works on your machine.
3.  **Deploy First**: Once fixed locally, **IMMEDIATELY PUSH** to the repo to trigger a deployment.
4.  **Verify in Production**:
    *   **GOLDEN RULE**: Tests must pass against the **Deployed URL** (`$env:TARGET_URL`), not just localhost.
    *   If a test passes locally but fails in production, assume **Production is Truth**. Investigate deployment sync issues or environment differences.
