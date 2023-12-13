// @ts-check
const { test, expect } = require('@playwright/test');


test('this is test', async ({ browser }) => {
  const context = await browser.newContext();
  // Create a new page inside context.
  const page = await context.newPage();

  await page.goto('https://rahulshettyacademy.com/angularpractice/');
  await page.locator("input[name='name']:nth-child(2)").fill("Emad");
  await page.locator('input[name="email"]').fill("emadmay@gmail.com");
  await page.getByPlaceholder('Password').fill("this@123");
  await page.getByLabel('Check me out if you Love').check();
  await page.getByLabel('Gender').selectOption('Female');
  await page.getByRole('button', { name: 'Submit' }).click()
  await page.getByRole('link', { name: 'Shop' }).click()
  await page.waitForURL('https://rahulshettyacademy.com/angularpractice/shop')
  await page.waitForLoadState('domcontentloaded')
  // const Alltitle = await page.locator('.card-body .card-title').allTextContents()
  // expect(Alltitle).toBe(["iphone X", "Samsung Note 8", "Nokia Edge", "Blackberry"])

});



test.only('blinking text', async ({ browser }) => {
  const context = await browser.newContext();
  // Create a new page inside context.
  const page = await context.newPage();

  await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
  const blinkText = page.locator('.blinkingText');
  await expect(blinkText).toHaveAttribute('class', 'blinkingText');
  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    blinkText.click(),

  ])

  // const text =await newPage.locator('.red').textContent();
  // console.log(text)
  // text.split("@");

})


