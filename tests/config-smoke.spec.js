const {test, expect} = require('@playwright/test');
const {openLoginPage} = require('./helper');

test('config based smoke test', async({page}) =>{
	await page.goto('/');
	await expect(page).toHaveTitle(/EventHub.*/);
	const emailField = page.locator('input#email');
	await expect(emailField).toBeVisible();
	await expect(page.getByRole('button', { name: 'Sign In' })).toBeVisible();
});

test('validate configuration file', async ({baseURL}) => {
	console.log(baseURL);
	expect(baseURL).toBeTruthy();
    const projectName = test.info().project.name;
    console.log(`Running in project: ${projectName}`);
});

test.only('use built-in page fixture', async ({page, browser}) => {
	const email = 'beginner@sample.com';
	await openLoginPage(page);
	await page.locator('input#email').fill(email);
	const emailField = page.locator('input#email');
    await expect(emailField).toHaveValue(email);
	await expect(emailField).toBeEmpty
});