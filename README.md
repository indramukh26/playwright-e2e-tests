 # Playwright Installation Guide

This guide explains how to install and run [Playwright](https://playwright.dev/) for end-to-end testing.

## Prerequisites

- Node.js 18 or newer (the current LTS version is recommended)
- npm, pnpm, or Yarn
- A terminal or command prompt

Check your installed versions:

```bash
node --version
npm --version
```

If Node.js is not installed, download it from [nodejs.org](https://nodejs.org/).

## Create a New Playwright Project

Run the following command in the directory where you want to create the project:

```bash
npm init playwright@latest
```

The installer asks you to choose:

1. TypeScript or JavaScript
2. The test directory name
3. Whether to add a GitHub Actions workflow
4. Whether to install Playwright browsers

Accept the browser installation option, or install browsers manually afterward:

```bash
npx playwright install
```

To install only specific browsers:

```bash
npx playwright install chromium
npx playwright install firefox
npx playwright install webkit
```

On Linux, install browser system dependencies when required:

```bash
npx playwright install --with-deps
```

## Install Playwright in an Existing Node.js Project

Install the test runner as a development dependency:

```bash
npm install --save-dev @playwright/test
npx playwright install
```

Equivalent commands for other package managers:

```bash
pnpm add -D @playwright/test
pnpm exec playwright install

yarn add --dev @playwright/test
yarn playwright install
```

## Run Tests

Run all tests:

```bash
npx playwright test
```

Run tests with the browser visible:

```bash
npx playwright test --headed
```

Run a specific test file or project:

```bash
npx playwright test tests/example.spec.ts
npx playwright test --project=chromium
```

Open the HTML test report:

```bash
npx playwright show-report
```

## Open the Playwright Test UI

```bash
npx playwright test --ui
```

## Record a Test

Use code generation to record browser actions:

```bash
npx playwright codegen https://example.com
```

Save the generated test code in the project's test directory.

## Useful Commands

```bash
npx playwright --version       # Display the installed version
npx playwright install         # Install supported browsers
npx playwright test --debug    # Debug tests with the Playwright Inspector
npx playwright test --trace on # Collect traces
```

## Configuration

The generated project includes `playwright.config.ts` (or `.js`). Use it to configure browsers, retries, parallel execution, base URLs, reporters, and timeouts. A typical base URL setting is:

```ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
	use: {
		baseURL: 'http://localhost:3000',
	},
});
```

## Troubleshooting

- If a browser is missing, run `npx playwright install`.
- If Linux libraries are missing, run `npx playwright install --with-deps`.
- Delete `node_modules` and the lockfile, reinstall dependencies, and run the browser install command again if the installation is corrupted.
- Use `npx playwright test --debug` to investigate failing tests.

For complete documentation, visit the [official Playwright documentation](https://playwright.dev/docs/intro).
