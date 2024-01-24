const { test, expect } = require('@playwright/test');

test('Okala Happy with codegen', async ({ page }) => {
  await page.goto('https://okala.com/');
  await page.getByRole('button', { name: 'ورود به اکالا' }).click();
  await page.goto('https://okala.com/login');
  await page.getByPlaceholder('09123456789').click();
  await page.getByPlaceholder('09123456789').fill('09123456789');
  await page.getByRole('button', { name: 'ثبت و ادامه' }).click();
  await page.getByLabel('رمز عبور').click();
  await page.getByLabel('رمز عبور').fill('this is the test');
  await page.getByRole('button', { name: 'ورود به اکالا' }).click();
  await page.goto('https://okala.com/stores');
  await page.goto('https://okala.com/cart/4741');
  await page.locator('div').filter({ hasText: /^1۸۷۵٬۰۰۰۸۱۵٬۰۰۰ریال$/ }).getByLabel('add to cart').click();
  await page.locator('div:nth-child(2) > .flex-grow > .relative > .absolute > .buttonGroup > .MuiButtonBase-root').click();
  await page.locator('.absolute > .buttonGroup > .MuiButtonBase-root').first().click();
  await page.getByRole('button', { name: 'انتخاب زمان تحویل' }).click();
  await page.getByLabel('تحویل در 45 دقیقهرایگان').check();
  await page.getByRole('button', { name: 'پرداخت و ثبت نهایی' }).click();
 
});