const {test, expect} = require('@playwright/test');
const {openLoginPage, BASE_URL} = require('./helper');

// @playwright/test is framework this package is recommened for building e2e testing
  // playwright package is best for general browser automation 

test('EventHub login page loads', async ({ page }) => {
    await openLoginPage(page);
    const emailInput = await page.getByPlaceholder("you@email.com");
    await expect(emailInput).toBeVisible();
    await expect(page.getByRole('button', { name: 'Sign In' })).toBeVisible();
});

test('explain async and await', async ({ page }) => {
	await page.goto(BASE_URL);
	await page.getByText('Sign in to EventHub', { exact: true });
    // Playwright actions return promises and await prevents timing issues and flaky behavior
});

test('verify password label', async({page}) => {
	await openLoginPage(page);
    await expect(page.getByLabel('Password')).toBeVisible();
	await expect(page).toHaveURL(/login/);
	await expect(page.getByText('Sign in to EventHub', { exact: true })).toBeVisible();
});
