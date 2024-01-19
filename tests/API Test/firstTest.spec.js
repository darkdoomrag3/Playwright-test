const { test, expect, request } = require('@playwright/test');
import tags from '../../test_data/test_data.json'

test.beforeEach(async ({ page }) => {

    await page.route('*/**/api/tags', async route => {

        await route.fulfill({
            body: JSON.stringify(tags)
        })
    })


    await page.goto('https://angular.realworld.how/')
    await page.getByText('Sign in').click();
    await page.getByRole('textbox', { name: 'Email' }).fill('emadddddd@gmail.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('testPassword');
    await page.getByRole('button').click();
})


test('Mock API test', async ({ page }) => {
    await page.route('*/**/api/articles*', async route => {
        const response = await route.fetch();
        const responseBody = await response.json();
        responseBody.articles[0].title = "this is a Mock test article"
        responseBody.articles[0].description = "heeh this is the description of mock API with playwright"
        await route.fulfill({
            body: JSON.stringify(responseBody)
        })
    })


    await page.getByText('Global Feed').click();
    await expect(page.locator('.navbar-brand')).toHaveText('conduit');
    await expect(page.locator('.preview-link h1').first()).toContainText('this is a Mock test article')

    await page.waitForTimeout(2000)
})

test('delet article', async ({ page, request }) => {
    const response = await request.post('https://api.realworld.io/api/users/login', {
        data: { "user": { "email": "emaddeymasa@gmail.com", "password": "Emad@40304030" } }
    })
    const responsebody = await response.json();
    const accessToken= responsebody.user.token;
    
  const articleResponse = await request.post('https://api.realworld.io/api/articles/',{
        data: {"article":{"title":"this is a test title","description":"this is a test description ","body":"this is a test body","tagList":[]}},
        headers:{Authorization: `Token ${accessToken}`}
    })
    
    expect(articleResponse.status()).toEqual(201);
    await page.getByText('Global Feed').click();
    await page.getByText('this is a test title').click()
    await page.getByRole('button',{name:' Delete Article '}).first().click();
    await expect(page.locator('.preview-link h1').first()).not.toContainText('this is a Mock test article')
})
