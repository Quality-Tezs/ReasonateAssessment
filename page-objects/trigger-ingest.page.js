// lang: javascript
// File: page-objects/trigger-ingest.page.js

class TriggerIngestPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.uploadInput = page.locator('input[type="file"]#trigger-upload');
    this.ingestStatus = page.locator('#ingestion-status');
    this.deliveryQueue = page.locator('#delivery-queue');
    this.deliveryEvents = page.locator('#delivery-events');
    this.responsesIngestion = page.locator('#responses-ingestion');
  }

  async goto() {
    await this.page.goto('https://app.example.com/trigger-ingest');
  }

  async uploadTriggerFile(filePath) {
    await this.uploadInput.setInputFiles(filePath);
    // assume an automatic ingestion trigger after upload
    await this.page.waitForTimeout(500); // small wait for processing
  }

  async getIngestionStatus() {
    return await this.ingestStatus.textContent();
  }

  async waitForDeliveryQueue() {
    await this.page.waitForSelector(this.deliveryQueue, { state: 'visible' });
  }

  async getDeliveryEvents() {
    // return array of events extracted from the UI; adapt selectors as needed
    const items = await this.deliveryEvents.locator('.delivery-item').elementHandles();
    const events = [];
    for (const it of items) {
      const recipientId = await it.$eval('.recipient-id', el => el.textContent);
      events.push({ recipientId });
    }
    return events;
  }

  async simulateSurveyCompletions(expectedRate) {
    // Abstracted: in real test, you might call an API or simulate via mocks
    // Here we trigger a mock completion by hitting a test endpoint
    await this.page.evaluate((_rate) => {
      // placeholder for backend mock trigger
      // window.triggerMockSurveyCompletions(_rate);
    }, expectedRate);
  }

  async waitForIngestionOfResponses() {
    await this.page.waitForSelector(this.responsesIngestion, { state: 'visible' });
  }
}

module.exports = { TriggerIngestPage };
