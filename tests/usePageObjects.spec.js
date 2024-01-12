const { test, expect } = require('@playwright/test');
const { NavigationPage } = require('../page-objects/navigationPage')
const { FormsLayoutsPage } = require('../page-objects/formsLayoutPage')
const moment = require('moment');

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200');
});

test('navigation to the form page', async ({ page }) => {
    const navigation = new NavigationPage(page)
    await navigation.formsLayoutsPage();

})

test('Check Box', async ({ page }) => {
    const modalPage = new NavigationPage(page);
    await modalPage.ModalOverlaysPage();

    await page.getByLabel('Prevent arising of duplicate toast').check({ force: true })
    await page.getByLabel('Hide on click').uncheck({ force: true });
    await page.getByRole('checkbox', { name: "Show toast with icon" }).click({ force: true })
    const allCheckBoxes = page.getByRole('checkbox')
    for (const box of await allCheckBoxes.all()) {
        await box.check({ force: true })
        expect(await box.isChecked()).toBeTruthy()
    }

    for (const box of await allCheckBoxes.all()) {
        await box.uncheck({ force: true })
        expect(await box.isChecked()).toBeFalsy();
    }
})

test('table', async ({ page }) => {
    const tablePage = new NavigationPage(page);
    tablePage.SmartTablePage();

    const targetRow = page.getByRole('row', { name: "twitter@outlook.com" })
    await targetRow.locator('.nb-edit').click();
    await page.locator('input-editor').getByPlaceholder("Age").clear();
    await page.locator('input-editor').getByPlaceholder("Age").fill('30');
    await page.keyboard.press('Enter');
    await page.locator('.ng2-smart-pagination-nav').getByText('2').click();
    const targetByRowId = page.getByRole('row', { name: "11" }).filter({ has: page.locator('td').nth(1).getByText("11") })
    await targetByRowId.locator('.nb-edit').click();
    await page.locator('input-editor').getByPlaceholder("E-mail").clear();
    await page.locator('input-editor').getByPlaceholder("E-mail").fill('test@test.com');
    await page.locator('.nb-checkmark').click();


})


test('dynamic datepicker', async ({ page }) => {

    // Get the current date, tomorrow's date, and next month's date in YYYY-MM-DD format
    const today = moment().format('MMM DD, YYYY');
    const tomorrow = moment().add(1, 'days').format('MMM DD, YYYY');
    const nextWeek = moment().add(7, 'days').format('MMM DD, YYYY');
    const nextMonth = moment().add(1, 'months').format('MMM DD, YYYY');
    const day = moment().add(7, 'days').format('MMM DD, YYYY');

    const datePickerPage = new NavigationPage(page);
    await datePickerPage.DatePickerPage();

    const calandarField = page.getByPlaceholder('Form Picker');
    await calandarField.click();
    await calandarField.fill(`${day}`)
    const inputDataClick = page.getByPlaceholder('Form Picker');
    // Get the selected date button
    await inputDataClick.click();
    const finalDay = moment().add(7, 'days').format('DD');

    await page.locator('nb-calendar-picker nb-calendar-day-cell').getByText(`${finalDay}`, { exact: true }).click()


})


test('Input fileds and radio Buttons', async ({ page }) => {
    const submitUsingGridForm = new FormsLayoutsPage(page);
    const navigation = new NavigationPage(page)
    await navigation.formsLayoutsPage();
   
    await submitUsingGridForm.submitUsingGridFormWithCredentialAndOption("test@test.com","Emad@dude!1377");
    await  submitUsingGridForm.submitInlineForm("Emad","Emad@dude!1377",true)

})