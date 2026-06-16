# agency-e2e-monitor

> Playwright-based E2E monitoring framework — lets an AI agent explore an unknown project, write tests, and run them against any live URL.

A TypeScript testing harness built on Playwright. Includes a unified `agencyTest` fixture that auto-captures network errors and console failures, a reusable page-object pattern, and a workflow spec that guides autonomous agents from project exploration through test implementation.

## Features

- **Unified fixture** — `agencyTest` wraps every test with automatic network/console error capture
- **Agent-friendly workflow** — `AGENT_WORKFLOW.md` describes the explore → plan → implement → run cycle
- **Any target** — point `TARGET_URL` at any live deployment; no code changes needed
- **CI-ready** — standard Playwright config, works with GitHub Actions and any CI runner
- **TypeScript** — full type safety, path aliases via `tsconfig`

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Test runner | Playwright |
| Language | TypeScript |
| Fixture | Custom `agencyTest` wrapper |

## Getting Started

```bash
npm install
npx playwright install chromium

# Run against a target
TARGET_URL=https://your-app.example.com npx playwright test
```

## Project Structure

```
├── lib/
│   └── agency-test.ts    # Unified fixture with error capture
├── tests/                # E2E test specs
├── playwright.config.ts
└── AGENT_WORKFLOW.md     # Guide for AI-driven test authoring
```

## License

MIT
