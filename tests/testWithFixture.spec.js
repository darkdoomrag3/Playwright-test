const { test, expect } = require('@playwright/test');
const { NavigationPage } = require('../page-objects/navigationPage')
const { FormsLayoutsPage } = require('../page-objects/formsLayoutPage')
const { DatePicker } = require('../page-objects/datePickerPage')
const { pageManager } = require('../page-objects/pageManager')
import { RandomData } from '../test_data/fakedata'



test.beforeEach(async ({ page }) => {
    await page.goto('/');
});


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

