import { defineConfig, devices, test as base } from '@playwright/test';


export const testOptions = {
    globalQAUrl

};


export const test = base.extend({
    globalQAUrl: ['', { option: true }],
})