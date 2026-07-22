// lang: javascript
// File: page-objects/audit-logs.page.js

const { BasePage } = require('./BasePage');

class AuditLogsPage extends BasePage {
  constructor(page) {
    super(page);
    this.logsTable = page.locator('#audit-logs-table');
  }

  async goto() {
    await this.page.goto('https://app.example.com/audit-logs');
  }

  async getRecentEntries(limit = 10) {
    const rows = await this.logsTable.locator('tbody tr').elementHandles();
    const results = [];
    for (let i = 0; i < Math.min(limit, rows.length); i++) {
      const row = rows[i];
      const action = await row.$eval('.action', el => el.textContent);
      const user = await row.$eval('.user', el => el.textContent);
      const ts = await row.$eval('.timestamp', el => el.textContent);
      results.push({ action, user, timestamp: ts });
    }
    return results;
  }
}

module.exports = { AuditLogsPage };
