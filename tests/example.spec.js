// @ts-check
const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:4200');


});


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



test('blinking text', async ({ browser }) => {
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


test('test functions', async ({ page }) => {
  await page.getByRole('link', { name: 'Forms' }).click();
  await page.getByRole('link', { name: 'Form Layouts' }).click();

  await page.locator('label').filter({ hasText: 'Option 1' }).locator('span').nth(1).click()
  await page.locator('nb-card').getByRole('button', { name: 'Sign in' }).first().click()

})

test('test ', async ({ page }) => {
  await page.getByRole('link', { name: 'Forms' }).click();
  await page.getByRole('link', { name: 'Form Layouts' }).click();
  await page.locator('nb-card').filter({ hasText: 'Basic formEmail' }).locator('span').first().click()
  await page.getByRole('link', { name: 'Modal & Overlays' }).click();
  await page.getByRole('link', { name: 'Tooltip' }).click();

})

test('parent to child locating element', async ({ page }) => {
  await page.getByRole('link', { name: 'Forms' }).click();
  await page.getByRole('link', { name: 'Form Layouts' }).click();
  await page.locator('nb-card', { hasText: 'Using the Grid' }).locator('#inputEmail1').fill("email.gmail.com")
  await page.locator('nb-card', { has: page.locator('#inputPassword2') }).locator('#inputPassword2').fill("Emad Bay")
  await page.locator('nb-card').filter({ has: page.locator('#exampleInputPassword1') }).locator('#exampleInputPassword1').fill("Emad Bay")
  await page.locator('nb-card').filter({ hasText: 'Horizontal form' }).locator('#inputEmail3').fill('thisisthetest@gmail.com')

})


test('Reusing locators', async ({ page }) => {
  const clickOnForm = page.getByRole('link', { name: 'Forms' })
  const clickOnFormLayouts = page.getByRole('link', { name: 'Form Layouts' })
  const usingTheGrid = page.locator('nb-card', { hasText: 'Using the Grid' })
  await clickOnForm.click();
  await clickOnFormLayouts.click()

  await usingTheGrid.locator('#inputEmail1').fill("email@gmail.com")
  await usingTheGrid.locator('#inputPassword2').fill("passwordEmad")
  await usingTheGrid.getByRole('button').click()

})

