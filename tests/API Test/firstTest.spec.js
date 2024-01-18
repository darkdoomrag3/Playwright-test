const { test, expect } = require('@playwright/test');
import tags from '../../test_data/test_data.json'

test.beforeEach(async ({ page }) => {

    await page.route('*/**/api/tags', async route => {

        await route.fulfill({
            body: JSON.stringify(tags)
        })
    })

    await page.route('*/**/api/articles*', async route => {
        const response = await route.fetch();
        const responseBody = await response.json();
        responseBody.articles[0].title = "this is a test article"
        responseBody.articles[0].description = "heeh this is the description of mock API with playwright"
        await route.fulfill({
            body: JSON.stringify(responseBody)
        })
    })


    await page.goto('https://angular.realworld.how/')
})


test('Mock API test', async ({ page }) => {
   
    await expect(page.locator('.navbar-brand')).toHaveText('conduit');
    await expect(page.locator('.preview-link h1').first()).toContainText('this is a test article')
    // await page.mouse.move(0, 100);
    // await page.getByRole('button', { name: "14" }).click()
    await page.waitForTimeout(2000)
})
