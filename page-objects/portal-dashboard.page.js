// lang: javascript
// File: page-objects/portal-dashboard.page.js

class PortalDashboardPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.individualResultsPanel = page.locator('#individual-results');
    this.aggregatedMetricsPanel = page.locator('#aggregated-metrics');
  }

  async goto() {
    await this.page.goto('https://app.example.com/portal');
  }

  async getIndividualResults() {
    // Return an array of result objects for each individual
    const items = await this.individualResultsPanel.locator('.result-item').elementHandles();
    const results = [];
    for (const item of items) {
      const id = await item.$eval('.recipient-id', el => el.textContent);
      const score = await item.$eval('.score', el => el.textContent);
      results.push({ recipientId: id, score: Number(score) });
    }
    return results;
  }

  async getAggregatedMetrics() {
    // Return basic aggregates from the dashboard
    const totalDeliveries = parseInt(await this.aggregatedMetricsPanel.locator('#total-deliveries').textContent(), 10);
    const totalResponses = parseInt(await this.aggregatedMetricsPanel.locator('#total-responses').textContent(), 10);
    const averageScore = parseFloat(await this.aggregatedMetricsPanel.locator('#average-score').textContent());

    return {
      totalDelivered: totalDeliveries,
      totalRespondents: totalResponses,
      averageScore,
      totalResponsesPct: totalDeliveries > 0 ? totalResponses / totalDeliveries : 0
    };
  }
}

module.exports = { PortalDashboardPage };
