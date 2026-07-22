// lang: javascript
// File: page-objects/dataset-explorer.page.js

const { BasePage } = require('./BasePage');

class DatasetExplorerPage extends BasePage {
  constructor(page) {
    super(page);
    this.datasetList = page.locator('#datasets');
    this.datasetRows = this.datasetList.locator('.dataset-row');
  }

  async goto() {
    await this.page.goto('https://app.example.com/dataset-explorer');
  }

  async searchDataset(name) {
    const searchBox = this.page.locator('#dataset-search');
    await searchBox.fill(name);
    await this.page.waitForTimeout(200); // debounce
  }

  async getDatasets(limit = 5) {
    const items = await this.datasetRows.elementHandles();
    const results = [];
    for (let i = 0; i < Math.min(limit, items.length); i++) {
      const row = items[i];
      const id = await row.$eval('.id', el => el.textContent);
      const title = await row.$eval('.title', el => el.textContent);
      results.push({ id, title });
    }
    return results;
  }
}

module.exports = { DatasetExplorerPage };
