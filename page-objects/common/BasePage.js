// lang: javascript
// File: page-objects/BasePage.js

class BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  async goto(url) {
    await this.page.goto(url);
  }

  // Lightweight logging
  log(message) {
    // hook into your logging system if needed
    console.log(`[${new Date().toISOString()}] ${message}`);
  }

  // Robust click with retry
  async click(locator, options = {}) {
    const { timeout = 5000 } = options;
    try {
      await locator.click({ timeout });
    } catch (e) {
      this.log(`Click failed, retrying: ${e.message}`);
      await locator.click({ timeout });
    }
  }

  // Safe fill with visibility check
  async fill(locator, value) {
    await locator.waitFor({ state: 'visible' });
    await locator.fill(value);
  }

  // Generic wait for network idle (adjust to your app)
  async waitForNetworkIdle(timeoutMs = 3000) {
    await this.page.waitForLoadState('networkidle', { timeout: timeoutMs });
  }

  // Error handling wrapper
  async safeExecute(asyncFn, context = 'operation') {
    try {
      return await asyncFn();
    } catch (err) {
      this.log(`Error in ${context}: ${err.message}`);
      throw err;
    }
  }
}

module.exports = { BasePage };
