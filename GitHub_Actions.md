Goal: fast feedback with PR checks and nightly runs.

Key steps:

Use ubuntu-latest runner; set up Node.js.
	Install deps, install browsers, run tests.
	Upload artifacts (screenshots/videos) and publish JUnit-style results.

Example workflow (tests.yml):

name: CI - Playwright

on:
  push:
    branches: [ main ]
  pull_request:

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      fail-fast: false
      matrix:
        variant: [A, B, C]

    steps:
    - uses: actions/checkout@v4
    - name: Use Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
    - name: Install
      run: npm ci
    - name: Install browsers
      run: npx playwright install
    - name: Run tests
      run: npm test
    - name: Upload results
      if: always()
      uses: actions/upload-artifact@v4
      with:
        name: test-results
        path: test-results.xml
