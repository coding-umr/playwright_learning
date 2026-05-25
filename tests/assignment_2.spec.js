const {test, expect} = require('@playwright/test');
const config = require('../playwright.config');

//Test 1 — Create and use playwright.config.js

test('Step 1 — Create the configuration file', async () => {
	await expect(config.use.baseURL).toBeTruthy();
	await expect(config.projects).toHaveLength(2);
	await expect(config.projects.map(project => project.name)).toEqual(['chromium', 'firefox']);
});

