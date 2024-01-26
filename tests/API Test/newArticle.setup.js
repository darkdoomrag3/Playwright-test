import { test as setup,expect } from "@playwright/test"


setup('create new article', async ({ request }) => {

    const articleResponse = await request.post('https://api.realworld.io/api/articles/',{
        data: {"article":{"title":"Like Test Article","description":"this is a test description ","body":"this is a test body","tagList":[]}},
      
    })
    
    expect(articleResponse.status()).toEqual(201);
    const respons= await articleResponse.json();
    const slugId = respons.article.slug
    process.env['SLUGID']= slugId
});
