const { test, expect, request } = require('@playwright/test');

test('Like counter',async({page})=>{
    await page.goto('https://angular.realworld.how/')
    await page.getByText('Global Feed').click();
    const firstLikeButton= page.locator('app-article-preview').first().locator('button');
    await firstLikeButton.click();
    await expect(firstLikeButton).toContainText('1');

})