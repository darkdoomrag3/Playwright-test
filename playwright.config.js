// @ts-check
const { defineConfig, devices } = require('@playwright/test');
// import  {testOptions} from './test-options';




require('dotenv').config();

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: false,

  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['junit',{outputFile:'test-result/junitReporter.xml'}],
    ['allure-playwright']

], 
  
  timeout: 5 * 60 * 1000,
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: process.env.BASE_URL,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    timeout: 5 * 60 * 1000,
    extraHTTPHeaders: {
      'Authorization': `Token ${process.env.ACCESS_TOKEN}`
    }
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'setup',
      testMatch: 'auth.setup.js'
    },
    {
      name: 'articleSetUp',
      testMatch: 'newArticle.setup.js',
      dependencies: ['setup'],
      teardown: 'articleCleanUp'
    },
    {
      name: 'articleCleanUp',
      testMatch: 'ArticleCleanUp.setup.js',

    }, 
    {
      name: 'Mobile',
      testMatch: 'mobileTest.spec.js',
      use: {
        ...devices['iPhone 13'],
      },
    },
    {
      name: 'LikeCounter',
      testMatch: 'LikeCounter.spec.js',
      use: { ...devices['Desktop Safari'], storageState: './.auth/user.json' },
      dependencies: ['articleSetUp']
    },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], storageState: './.auth/user.json' },
      dependencies: ['setup']
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'], storageState: './.auth/user.json' },
      dependencies: ['setup']
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'], storageState: './.auth/user.json' },
      dependencies: ['setup']
    },


    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],


});

