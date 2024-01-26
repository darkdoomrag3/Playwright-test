const { test, expect, defineConfig, devices } = require('@playwright/test');



test('Form layoutg page', (async ({ page }, testInfo) => {

    await page.goto('/')
    if (testInfo.project.name == 'Mobile') {
        await page.locator('.sidebar-toggle').click();
    }

    await page.getByRole('link', { name: 'Forms' }).click();
    await page.getByRole('link', { name: 'Form Layouts' }).click();

    if (testInfo.project.name == 'Mobile') {
        await page.locator('.sidebar-toggle').click();
    }
    const usingTheGridEmailInput = page.locator('nb-card', { hasText: 'Using the Grid' }).getByRole('textbox', { name: "Email" });
    await usingTheGridEmailInput.fill('test@test.com');
    await usingTheGridEmailInput.clear();
    await usingTheGridEmailInput.pressSequentially('test@test.com');
    const inputValue = await usingTheGridEmailInput.inputValue();
    expect(inputValue).toEqual('test@test.com');


}))