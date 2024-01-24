import { test as setup } from "@playwright/test"
import user from '../../.auth/user.json'
import fs from 'fs'


const authFile = '.auth/user.json'

setup('authentication', async ({ request }) => {
    // await page.goto('https://angular.realworld.how/')
    // await page.getByText('Sign in').click();
    // await page.getByRole('textbox', { name: 'Email' }).fill('emadtest@gmail.com');
    // await page.getByRole('textbox', { name: 'Password' }).fill('Test@test123');
    // await page.getByRole('button').click();
    // await page.waitForResponse('https://api.realworld.io/api/tags')
    // await page.context().storageState({path:authFile})

    const response = await request.post('https://api.realworld.io/api/users/login', {
        data: { "user": { "email": "emadtest@gmail.com", "password": "Test@test123" } }
    })
    const responsebody = await response.json();
    const accessToken = responsebody.user.token;
    user.origins[0].localStorage[0].value = accessToken
    fs.writeFileSync(authFile, JSON.stringify(user))
    process.env['ACCESS_TOKEN']= accessToken

});
