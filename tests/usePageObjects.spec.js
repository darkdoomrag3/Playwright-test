const { test, expect } = require('@playwright/test');
const { NavigationPage } = require('../page-objects/navigationPage')
const { FormsLayoutsPage } = require('../page-objects/formsLayoutPage')
const { DatePicker } = require('../page-objects/datePickerPage')
const { pageManager } = require('../page-objects/pageManager')
import { RandomData } from '../test_data/fakedata'


const moment = require('moment');

test.beforeEach(async ({ page }) => {
    await page.goto('/');
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
    await calandarField.fill(`${day}`);
    const inputDataClick = page.getByPlaceholder('Form Picker');
    // Get the selected date button
    await inputDataClick.click();
    const finalDay = moment().add(3, 'days').format('DD');

    await page.locator('nb-calendar-picker nb-calendar-day-cell').getByText(`${finalDay}`, { exact: true }).click();


})


test('Input fileds and radio Buttons', async ({ page }) => {
    const submitUsingGridForm = new FormsLayoutsPage(page);
    const navigation = new NavigationPage(page);
    // Correct way to instantiate RandomData
    const randomDataInstance = new RandomData();

    const randomUser = randomDataInstance.createRandomUser();
    const randomName = randomUser.name;
    const randomEmail = randomUser.email;
    const ramdomPassword = randomUser.password;

    await navigation.formsLayoutsPage();
    await submitUsingGridForm.submitUsingGridFormWithCredentialAndOption(randomName, ramdomPassword);
    await submitUsingGridForm.submitInlineForm(randomName, randomEmail, true);
    await page.screenshot({path : 'screenshots/Inputfileds.png'})

})

test('dynamic datepicker with Data function', async ({ page }) => {
    const datePickerNavigation = new NavigationPage(page);
    const datePickerpage = new DatePicker(page);
    await datePickerNavigation.DatePickerPage();
    await datePickerpage.singelDatePicker(2);

})

test('parametrize method', async ({ page }) => {
    //page object with page manager
    const pages = new pageManager(page);
    await pages.navigateTo().DatePickerPage();
    await pages.onDatePickerPage().singelDatePicker(2)
    await pages.onDatePickerPage().rangeDatePicker(5, 6)


    //page object without page manager
    // const datePickerNavigation = new NavigationPage(page);
    // const datePickerpage = new DatePicker(page);
    // await datePickerNavigation.DatePickerPage();
    // await datePickerpage.singelDatePicker(2);
    // await datePickerpage.rangeDatePicker(3,5);

})