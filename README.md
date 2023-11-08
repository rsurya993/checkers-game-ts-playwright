# The Checkers Game - UI Automated Tests

This repository contains automated tests for the Checkers Game. The tests were written using Playwright and TypeScript and implemented following steps:

1. Navigate to [https://www.gamesforthebrain.com/game/checkers/](https://www.gamesforthebrain.com/game/checkers/)
2. Confirm that the site is up
3. Make attempt to move blue.
4. Make five legal moves as orange
5. Restart the game after five moves
6. Confirm that the restarting had been successful

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/en/download/) (v16.x)

### Setup

1. Clone the repository to your local machine.

```bash
git clone https://github.com/rsurya993/checkers-game-ts-playwright
cd checkers-game-automation
```

2. Install the project dependencies.

```bash
npm install
```

3. Create .env file in the root of your project and insert your key/value pairs in the following format of `KEY=VALUE`:

```bash
BASE_URL="https://www.gamesforthebrain.com"
```

⚠️ The .env file is included in .gitignore to prevent commiting secrets into the repository.
In pipeline uses GitHub secrets to store sensitive information like the BASE_URL.

## Running the Tests

This project uses Playwright, so it allows testing with multiple browser types (Chromium, Firefox, and WebKit).
To run the tests locally, execute the following command:

```bash
npx playwright test
```

This command will run the tests in a headless browser. Setting for headed mode is in playwright.config.ts file.

## CI/CD

This project is configured with GitHub Actions for Continuous Integration.

The current configuration (.github/workflows/playwright.yml) is setup to run tests on both push and pull_request events against the main and master branches. The job will setup Node.js environment, install dependencies, and run tests using Playwright. After the tests are completed, it uploads the test report as an artifact.

## Reports

The Playwright HTML report for the tests is available [here](https://github.com/antonrosh/checkers-game-ts-playwright/actions/workflows/playwright.yml). You can download the report by clicking on the "playwright-report" link under the "Artifacts" section in each workflow run.

## Implementation

This project uses Playwright for writing end-to-end tests in JavaScript/TypeScript. Playwright is a Node.js library for browser automation. It provides a high-level API to control headless or non-headless browsers.

A page object model is used to structure the tests, making the test code more readable, maintainable, and reusable.

## Project Structure

```bash
├── .github/                       # Contains GitHub files
│   └── workflows/                 # Contains GitHub Action files
│       └── playwright.yml         # GitHub Actions Playwright workflow
├── pages/                         # Contains page classes
│   ├── games/
│   │   └── checker.page.ts        # CheckersPage class
│   └── home.page.ts               # HomePage class
├── tests/                         # Contains all tests
│   ├── games/
│   │   └── checker.test.ts        # Tests for CheckersPage
│   └── home.test.ts               # Tests for HomePage
├── .env                           # Contains environment variables
├── .gitignore                     # Specifies intentionally untracked files to ignore
├── package-lock.json              # Locks down the versions of a project's dependencies
├── package.json                   # Contains scripts and dependencies of the project
├── playwright.config.ts           # Playwright test runner configuration file
└── README.md                      # README file with a template for your project
```