import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.digikala.com/');
  await page.locator('span').filter({ hasText: 'دسته‌بندی کالاها' }).getByRole('img').click();
  await page.goto('https://www.digikala.com/users/login/?backUrl=/');
  await page.getByLabel('').click();
  await page.getByLabel('').fill('09376681856');
  await page.getByRole('button', { name: 'ورود' }).click();
  await page.getByLabel('').click();
  await page.getByLabel('').fill('Emad@40304030');
  await page.getByLabel('').press('Enter');
  await page.getByRole('link', { name: 'شگفت‌انگیزها' }).click();
  await page.getByText('جستجو').click();
  await page.getByPlaceholder('جستجو').fill('nothing phone');
  await page.getByPlaceholder('جستجو').press('Enter');
});