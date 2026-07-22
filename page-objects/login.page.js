// lang: javascript
// File: page-objects/login.page.js

class LoginPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#loginBtn');
  }

  async goto() {
    await this.page.goto('https://app.example.com/login');
  }

  /**
   * Simple login helper
   * @param {string} username
   * @param {string} password
   */
  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    // wait for post-login navigation
    await this.page.waitForNavigation({ url: '**/dashboard' });
  }
}

module.exports = { LoginPage };
