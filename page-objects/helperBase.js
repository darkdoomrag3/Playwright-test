const { expect } = require('@playwright/test');
/**
  * @param {import('playwright').Page} page
  */

class HelperBase {
    constructor(page){
        this.page=page;
    }
    async waitForNumberOfSecond(timeInSeconds){
        await this.page.waitForTimeout(timeInSeconds * 1000)
    }

}

module.exports = { HelperBase }