const { expect } = require('@playwright/test');
 /**
   * @param {import('playwright').Page} page
   */

class NavigationPage {
    constructor(page) {
        this.page = page;
        this.form=page.getByText('Forms')
        this.fomLayouts = page.getByText('Form Layouts')
    }
    
    async formsLayoutsPage() {
    await this.form.click();
    await this.fomLayouts.click();
    }

}

module.exports = { NavigationPage }