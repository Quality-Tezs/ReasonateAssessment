// lang: javascript
// File: page-objects/alerts-notifications.page.js

const { BasePage } = require('./BasePage');

class AlertsNotificationsPage extends BasePage {
  constructor(page) {
    super(page);
    this.alertsPanel = page.locator('#alerts-panel');
    this.notificationsPanel = page.locator('#notifications-panel');
  }

  async goto() {
    await this.page.goto('https://app.example.com/alerts');
  }

  async getActiveAlerts() {
    const items = await this.alertsPanel.locator('.alert-item').elementHandles();
    const list = [];
    for (const it of items) {
      const t = await it.$eval('.title', el => el.textContent);
      list.push({ title: t });
    }
    return list;
  }

  async ackAlert(index) {
    const item = this.alertsPanel.locator(`.alert-item:nth-child(${index + 1})`);
    await this.click(item.locator('.ack-btn'));
  }

  async getNotifications() {
    const items = await this.notificationsPanel.locator('.notification-item').elementHandles();
    return Promise.all(items.map(async (n) => ({
      id: await n.getAttribute('data-id'),
      text: await n.textContent(),
    })));
  }
}

module.exports = { AlertsNotificationsPage };
