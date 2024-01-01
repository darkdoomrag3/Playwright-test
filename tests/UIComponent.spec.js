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
        await usingTheGridEmailInput.pressSequentially('test@test.com', { delay: 100 });
        const inputValue = await usingTheGridEmailInput.inputValue();
        expect(inputValue).toEqual('test@test.com');
    })

})

test('radio Buttons', async ({ page }) => {
    await page.getByRole('link', { name: 'Forms' }).click();
    await page.getByRole('link', { name: 'Form Layouts' }).click();
    const usingTheGridEmailInput = page.locator('nb-card', { hasText: 'Using the Grid' })
    await usingTheGridEmailInput.getByLabel('Option 1').check({ force: true });
    await usingTheGridEmailInput.getByRole('radio', { name: 'Option 2' }).check({ force: true });
    const radioStatus = await usingTheGridEmailInput.getByRole('radio', { name: 'Option 1' }).isChecked();
    expect(await usingTheGridEmailInput.getByLabel('Option 1').isChecked()).toBeFalsy();
})

test('Check Box', async ({ page }) => {
    await page.getByRole('link', { name: 'Modal & Overlays' }).click();
    await page.getByRole('link', { name: 'Toastr' }).click();
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

test('List and Dropdown', async ({ page }) => {
    // await page.getByRole('button', { name: 'Light' }).click();
    // await page.getByText('Dark').click();
    const dropDown = page.locator('ngx-header nb-select');
    await dropDown.click();
    // await page
    //     .getByRole('list') //when the dom has UL tag we can use 'list' and when the list has LI tag we can use listitem
    //     .filter({ hasText: 'Dark' }).click();
    const optionList = page.locator('.options-list nb-option');
    await expect(optionList).toHaveText(["Light", "Dark", "Cosmic", "Corporate"]);
    await optionList.filter({ hasText: "Dark" }).click();
    const header = page.locator('nb-layout-header')
    // await expect(header).toHaveCSS('background-color', 'rgb(50, 50, 89)')
    const colors = {
        "Light": "rgb(255,255,255)",
        "Dark": "rgb(34,43,69)",
        "Cosmic": "rgb(50,50,89)",
        "Corporate": "rgb(255,255,255)"
    }

    // await dropDown.click();
    // for (const color in colors) {
    //     await optionList.filter({ hasText: color }).click();
    //     await expect(header).toHaveCSS('background-color', colors[color])
    //     if(color != "Cosmic") {
    //         await dropDown.click();
    //     }

    // }

})

test('tooltip', async ({ page }) => {
    await page.getByRole('link', { name: 'Modal & Overlays' }).click();
    await page.getByRole('link', { name: 'Tooltip' }).click();
    const tolltipButton = page.locator('nb-card', { hasText: "Tooltip Placements" })
    await tolltipButton.getByRole('button', { name: 'Top' }).hover();
    const tooltipText = page.locator('nb-tooltip').textContent();
    expect(await tooltipText).toEqual('This is a tooltip');
})

test('dialog', async ({ page }) => {
    await page.getByRole('link', { name: 'Tables & Data' }).click();
    await page.getByRole('link', { name: 'Smart Table' }).click();

    page.on('dialog', dialog => {
        expect(dialog.message()).toBe('Are you sure you want to delete?');
        dialog.accept();
    });
    await page.getByRole('table').locator('tr', { hasText: 'mdo@gmail.com' }).locator('.nb-trash').click();
    await expect(page.locator('table tr').first()).not.toHaveText('mdo@gmail.com');
})


test('table', async ({ page }) => {
    await page.getByRole('link', { name: 'Tables & Data' }).click();
    await page.getByRole('link', { name: 'Smart Table' }).click();

    const targetRow = page.getByRole('row', { name: "twitter@outlook.com" })
    await targetRow.locator('.nb-edit').click();
    await page.locator('input-editor').getByPlaceholder("Age").clear();
    await page.locator('input-editor').getByPlaceholder("Age").fill('30');
    await page.keyboard.press('Enter');
    await page.locator('.ng2-smart-pagination-nav').getByText('2').click();
    const targetByRowId = page.getByRole('row',{name:"11"}).filter({has:page.locator('td').nth(1).getByText("11")})
    await targetByRowId.locator('.nb-edit').click();
    await page.locator('input-editor').getByPlaceholder("E-mail").clear();
    await page.locator('input-editor').getByPlaceholder("E-mail").fill('test@test.com');
    await page.locator('.nb-checkmark').click();
})
