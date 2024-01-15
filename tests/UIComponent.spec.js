const { test, expect } = require('@playwright/test');
const exp = require('constants');
const moment = require('moment');
const { NavigationPage } = require('../page-objects/navigationPage')

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
    const modalPage = new NavigationPage(page);
    await modalPage.ModalPage();

    // await page.getByRole('link', { name: 'Modal & Overlays' }).click();
    // await page.getByRole('link', { name: 'Toastr' }).click();
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
    const targetByRowId = page.getByRole('row', { name: "11" }).filter({ has: page.locator('td').nth(1).getByText("11") })
    await targetByRowId.locator('.nb-edit').click();
    await page.locator('input-editor').getByPlaceholder("E-mail").clear();
    await page.locator('input-editor').getByPlaceholder("E-mail").fill('test@test.com');
    await page.locator('.nb-checkmark').click();


})

test('table with assertion', async ({ page }) => {

    await page.getByRole('link', { name: 'Tables & Data' }).click();
    await page.getByRole('link', { name: 'Smart Table' }).click();
    const ages = ["20", "30", "40", "200"];

    for (let age of ages) {
        await page.locator('input-filter').getByPlaceholder('Age').clear();

        await page.locator('input-filter').getByPlaceholder('Age').fill("20");
        await page.locator('input-filter').getByPlaceholder('Age').fill(age);

        // Assuming pressing Enter triggers the update
        await page.waitForTimeout(1000); // Adjust the delay time as needed

        const rowAge = page.locator('tbody tr');

        await page.waitForSelector('tbody tr'); // Wait for the table rows to be available

        for (let row of await rowAge.all()) {
            const cellValue = await row.locator('td').last().textContent();
            if (age == "200") {
                expect(await page.getByRole('table').textContent()).toContain('No data found');
            } else {

                expect(cellValue).toEqual(age);
            }
        }
    }
})


test('datePicker', async ({ page }) => {
    await page.getByRole('link', { name: 'Forms' }).click();
    await page.getByRole('link', { name: 'Datepicker' }).click();
    const calandarField = page.getByPlaceholder('Form Picker');
    await calandarField.click();

    //first method(not working for selecting 1)
    // await page.locator('nb-calendar-day-cell',{hasText:"1",exact:true}).click();

    //alternate method
    await page.locator('[class="day-cell ng-star-inserted"]').getByText("18", { exact: true }).click();

    const inputData = await page.getByPlaceholder('Form Picker').textContent();

    await expect(calandarField).toHaveValue('Jan 18, 2024');
})

test('dynamic datepicker', async ({ page }) => {

    // Get the current date, tomorrow's date, and next month's date in YYYY-MM-DD format
    const today = moment().format('MMM DD, YYYY');
    const tomorrow = moment().add(1, 'days').format('MMM DD, YYYY');
    const nextWeek = moment().add(7, 'days').format('MMM DD, YYYY');
    const nextMonth = moment().add(1, 'months').format('MMM DD, YYYY');
    const day = moment().add(7, 'days').format('MMM DD, YYYY');


    await page.getByRole('link', { name: 'Forms' }).click();
    await page.getByRole('link', { name: 'Datepicker' }).click();
    const calandarField = page.getByPlaceholder('Form Picker');
    await calandarField.click();
    await calandarField.fill(`${day}`)
    const inputDataClick = page.getByPlaceholder('Form Picker');
    // Get the selected date button
    await inputDataClick.click();
    const finalDay = moment().add(7, 'days').format('DD');

    await page.locator('nb-calendar-picker nb-calendar-day-cell').getByText(`${finalDay}`, { exact: true }).click()


})

test('dynamic datepicker with Data function', async ({ page }) => {
    await page.getByRole('link', { name: 'Forms' }).click();
    await page.getByRole('link', { name: 'Datepicker' }).click();
    const calendarField = page.getByPlaceholder('Form Picker');
    await calendarField.click();

    let currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 2); // Add 2 days to the current date

    const expectedDate = currentDate.getDate().toString();
    const expectedMonthShow = currentDate.toLocaleString('en-US', { month: 'short' });
    const expectedYear = currentDate.getFullYear().toString();
    const day = currentDate.toLocaleString('en-US', { weekday: 'short' });
    const month = currentDate.toLocaleString('en-US', { month: 'short' });
    const dayOfMonth = String(currentDate.getDate()).padStart(2, '0');
    const year = currentDate.getFullYear();
    const time = currentDate.toTimeString().split(' ')[0];
    const timeZoneOffsetHours = Math.abs(currentDate.getTimezoneOffset() / 60);
    const timeZoneOffsetSign = currentDate.getTimezoneOffset() > 0 ? '-' : '+';
    const timeZone = `GMT${timeZoneOffsetSign}${String(timeZoneOffsetHours).padStart(2, '0')}:00`;

    const expectedDate2 = `${day} ${month} ${dayOfMonth} ${year} ${time} ${timeZone}`;
    console.log(expectedDate2);

    await page.locator('[class="day-cell ng-star-inserted"]').getByText(expectedDate, { exact: true }).click();


    // const selectedDateButtonPredicate = async (element) => {
    //     const dateValue = await element.getProperty('nb-calendar-navigation');
    //     if (dateValue === `${expectedDate2}`) {
    //         return true;
    //     }
    //     return false;
    // };

    // // Select the button using the custom predicate
    // const selectedDateButton = page.locator('nb-calendar-navigation', {
    //     predicate: selectedDateButtonPredicate
    // });

    // // Click on the selected date button
    // //   await selectedDateButton.textContent();

    // let calendarMonthAndYear = await page.locator(`.nb-calendar-navigation[ng-reflect-date='${expectedDate2}']`).textContent();
    // const expectedMonthAndYear = `${month} ${year}`;

    // while (!calendarMonthAndYear.includes(expectedMonthAndYear)) {
    //     await page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click();
    //     calendarMonthAndYear = await page.locator('nb-calendar-navigation').textContent();
    // }


});

test('dynamic slider', async ({ page }) => {
    const tempBox = page.locator('[tabletitle="temprature"] ngx-temrature circle')
    // await tempGaue.evaluate(node=>{
    //     node.setAttribute('cx','232.63.')
    //     node.setAttribute('cy','232.63.')
    // })
    await tempBox.scrollIntoViewIfNeeded();
    const box = await tempBox.boundingBox();
    const x = box.x + box.width / 2
    const y = box.y + box.height / 2
    await page.mouse.move(x, y)
    await page.mouse.down()
    await page.mouse.move(x + 100, y)
    await page.mouse.move(x + 100, y + 100)
    await page.mouse.up()
    await expect(tempBox).toContainText('30')
})