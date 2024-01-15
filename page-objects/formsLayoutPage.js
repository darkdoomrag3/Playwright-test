const { test, expect } = require('@playwright/test');
const { NavigationPage } = require('../page-objects/navigationPage')
/**
  * @param {import('playwright').Page} page
  * @param name -should be first and last name
  * @param email - valid email address
  * @param rememberMe -true or false if user session to be safed
  */

class FormsLayoutsPage {
    constructor(page) {
        this.page = page;

    }

    async submitUsingGridFormWithCredentialAndOption(email, password) {

        const usingTheGridEmailInput = this.page.locator('nb-card', { hasText: 'Using the Grid' })

        await usingTheGridEmailInput.getByRole('textbox', { name: "Email" }).fill(email);
        await usingTheGridEmailInput.getByPlaceholder('Password').fill(password);

        const inputValue = await usingTheGridEmailInput.getByRole('textbox', { name: "Email" }).inputValue();
        await usingTheGridEmailInput.getByLabel('Option 1').check({ force: true });
        await usingTheGridEmailInput.getByRole('radio', { name: 'Option 2' }).check({ force: true });

    }

    async submitInlineForm(name, email, rememberMe) {
        const usingInlineForm = this.page.locator('nb-card', { hasText: 'Inline form' });
        await usingInlineForm.getByPlaceholder('Jane Doe').fill(name);
        await usingInlineForm.getByPlaceholder('Email').fill(email);
        if (rememberMe) {

            await usingInlineForm.getByRole('checkbox').check({ force: true });
        }
    }
}

module.exports = { FormsLayoutsPage }