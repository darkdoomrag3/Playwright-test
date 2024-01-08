const { test, expect } = require('@playwright/test');


test('drag and drop with iframe',async({page})=>{
    await page.goto('https://www.w3schools.com/html/tryit.asp?filename=tryhtml5_draganddrop')
    const frame = page.frameLocator('iframe[name="iframeResult"]')
    await frame.locator('#drag1').dragTo(frame.locator('#div1'))
    await frame.locator('#drag1').hover();
    await page.mouse.down();
    await frame.locator('#div1').hover();
    await page.mouse.up();  


})
