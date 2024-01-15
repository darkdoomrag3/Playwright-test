const { test, expect } = require('@playwright/test');
const { NavigationPage } = require('../page-objects/navigationPage')
const { FormsLayoutsPage } = require('../page-objects/formsLayoutPage')
const { DatePicker } = require('../page-objects/datePickerPage')

/**
* @param {import('@playwright/test').Page} page
*/


class pageManager {
    constructor(page) {
        this.page = page;
        this.navigation = new NavigationPage(this.page);
        this.formsLayouts = new FormsLayoutsPage(this.page);
        this.datePicker = new DatePicker(this.page);
    }
    navigateTo() {
        return this.navigation
    }
    onFormsLayoutsPage() {
        return this.formsLayouts
    }
    onDatePickerPage() {
        return this.datePicker
    }

}

module.exports = { pageManager }