import { test as setup,expect } from "@playwright/test"


setup('create new article', async ({ request }) => {

   const deletArticleResponse = await request.delete(`https://api.realworld.io/api/articles/${process.env.SLUGID}`)
   expect(deletArticleResponse.status()).toEqual(204);

});
