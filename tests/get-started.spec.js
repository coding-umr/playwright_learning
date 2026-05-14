const {test, expect} = require('@playwright/test');
const {openLoginPage} = require('./helper');

// @playwright/test is framework this package is recommened for building e2e testing
  // playwright package is best for general browser automation 

test('open login page', async ({ page }) => {
    await openLoginPage(page);
    const emailInput = await page.getByPlaceholder("you@email.com");
    await expect(emailInput).toBeVisible();
    await expect(page.getByRole('button', { name: 'Sign In' })).toBeVisible();
});

test('explain async and await', async ({ page }) => {
	await page.goto('https://eventhub.rahulshettyacademy.com');
	await page.getByText('Sign in to EventHub', { exact: true });
    // Playwright actions return promises and await prevents timing issues and flaky behavior
});

test('verify password label', async({page}) => {
	await openLoginPage(page);
	await expect(page.getByLabel('password')).toBeVisible();
	await expect(page).toHaveURL(/login/);
	await page.getByText('Sign in to EventHub', { exact: true });
});

// this is not working leave and move to next section of assignment
test('validate configuration file', async () => {
	console.log(baseURL);
	expect(baseURL).toBeTruthy();
});

test.only('creating a fresh browser context manually', async ({browser}) => {
   const context = await browser.newContext();
   const page = await context.newPage();
   await page.goto('https://eventhub.rahulshettyacademy.com');
   expect(page.getByText('Sign in to EventHub', { exact: true })).toBeVisible();
   const email = page.locator('input#email');
   await expect(email).toBeEmpty();
   context.close();
   //page fixture gives you one ready-to-use page for the test
   //browser context is a separate browser session container that can create its own pages
   //a fresh browser context starts with isolated state
});