const {test, expect} = require('@playwright/test');
const {openLoginPage, getEmailField} = require('./helper');

test('config based smoke test', async({page}) =>{
	await page.goto('/login');
	await expect(page).toHaveTitle(/EventHub.*/);
	const emailField = await getEmailField(page);
	await expect(emailField).toBeVisible();
	await expect(page.getByRole('button', { name: 'Sign In' })).toBeVisible();
});

test('use built-in page fixture', async ({page, browser}) => {
	const email = 'beginner@sample.com';
	await openLoginPage(page);
	const emailField = await getEmailField(page);
	await emailField.fill(email);
    await expect(emailField).toHaveValue(email);
	await expect(emailField).toBeEmpty
});

test('creating a fresh browser context manually', async ({browser}) => {
   // create a fresh, isolated context and page
   const context = await browser.newContext();
   const page = await context.newPage();

    // navigate and assert isolated state
   await page.goto('/login');
   await expect(page.getByText('Sign in to EventHub', { exact: true })).toBeVisible();
   const emailField = await getEmailField(page);
   await expect(emailField).toBeEmpty();

   //clean up
   await context.close();
   await browser.close();
   //page fixture gives you one ready-to-use page for the test
   //browser context is a separate browser session container that can create its own pages
   //a fresh browser context starts with isolated state
});