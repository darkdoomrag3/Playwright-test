const { test, expect } = require('@playwright/test');
const { NavigationPage } = require('../page-objects/navigationPage')


test.beforeEach(async ({ page }) => {
    await page.goto('/');
});

test('navigation to the form page', async ({ page }) => {
    const navigation = new NavigationPage(page)
    await navigation.formsLayoutsPage();
    await navigation.DatePickerPage();
    await navigation.ModalOverlaysPage();
    await navigation.SmartTablePage();

    
})