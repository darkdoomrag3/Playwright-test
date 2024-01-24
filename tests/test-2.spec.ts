import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.okala.com/');
  await page.getByRole('button', { name: 'ورود به اکالا' }).click();
  await page.getByPlaceholder('09123456789').click();
  await page.getByPlaceholder('09123456789').fill('09376681856');
  await page.getByRole('button', { name: 'ثبت و ادامه' }).click();
  await page.getByLabel('رمز عبور').click();
  await page.getByLabel('رمز عبور').fill('Emad@40304030');
  await page.getByRole('button', { name: 'ورود به اکالا' }).click();
  await page.waitForTimeout(5000);
  await page.getByLabel('سبد خرید').click();
  await page.waitForTimeout(5000);
  await page.locator('div').filter({ hasText: /^جمع کل: ۱۰۰٬۰۰۰ ریالتکمیل سفارش$/ }).getByRole('button').click();
  await page.getByLabel('مشاهده فروشگاه‌ها').click();
  await page.getByLabel('open hamburger menu').click();
  await page.getByRole('button', { name: 'لبنیات' }).click();
  await page.locator('div').filter({ hasText: /^شیر$/ }).click();
});