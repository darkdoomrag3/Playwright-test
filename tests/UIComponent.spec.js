const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200');
});

test.describe('Form layoutg page', () => {
    test.beforeEach(async ({ page }) => {
        await page.getByRole('link', { name: 'Forms' }).click();
        await page.getByRole('link', { name: 'Form Layouts' }).click();
    })
    test('Input filed', async ({ page }) => {
        const usingTheGridEmailInput = page.locator('nb-card', { hasText: 'Using the Grid' }).getByRole('textbox', { name: "Email" });
        await usingTheGridEmailInput.fill('test@test.com');
        await usingTheGridEmailInput.clear();
        await usingTheGridEmailInput.pressSequentially('test@test.com',{delay: 100});
        const inputValue = await usingTheGridEmailInput.inputValue();
        expect(inputValue).toEqual('test@test.com');
    })

})

test('radio Buttons', async ({ page }) => {
    await page.getByRole('link', { name: 'Forms' }).click();
    await page.getByRole('link', { name: 'Form Layouts' }).click();
    const usingTheGridEmailInput = page.locator('nb-card', { hasText: 'Using the Grid' })
    await usingTheGridEmailInput.getByLabel('Option 1').check({force: true});
    await usingTheGridEmailInput.getByRole('radio', { name: 'Option 2' }).check({force: true});
    const radioStatus = await usingTheGridEmailInput.getByRole('radio', { name: 'Option 1' }).isChecked();
}) 