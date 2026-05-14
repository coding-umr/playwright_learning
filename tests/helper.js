export async function openLoginPage(page) {
	await page.goto('https://eventhub.rahulshettyacademy.com');
	await page.getByText('Sign in to EventHub', { exact: true });
}

export async function getEmailField(page) {
	const emailInput = await page.getByPlaceholder('you@email.com');
	return emailInput;
}

// login(page) helper that signs in and asserts the Browse Events link is visible
export async function login(page, expect) {
	await page.goto('https://eventhub.rahulshettyacademy.com');
	await page.locator('input#email').fill('umamaheswarreddy.t@gmail.com');
	await page.locator('input#password').fill('MxqKDd6Cxxs!3$H');
	await page.getByRole('button', { name: 'Sign In' }).click();
	await page.waitForLoadState('networkidle');
	await expect(page.getByRole('link', { name: 'Browse Events →' })).toBeVisible();
}

export function getEventCards(page) {
	return page.getByTestId('event-card');
}

export async function applyEventFilters(page, search, category, city) {
	await page.getByPlaceholder('Search events, venues…').fill(search);
	await page.getByRole('button', { name: 'Clear filters' }).click();
	await page.getByRole('combobox').nth(0).selectOption(category);
	await page.getByRole('combobox').nth(1).selectOption(city);
}

export function findEventCardByTitle(page, title) {
	return getEventCards(page).filter({ hasText: title });
}

export async function getEventDetails(card) {
	const eventTitle = await card.locator('h3').textContent();
	const eventPrice = await card.locator('p').filter({ hasText: '$' }).textContent();
	const eventSeats = await card.locator('span').filter({ hasText: 'seats' }).textContent();
	const seatCount = parseSeatCount(eventSeats);
	return { eventTitle, eventPrice, eventSeats, seatCount };
}

export function parseSeatCount(seatText) {
	const seats = parseInt(seatText.match(/\d+/)[0], 10);
	console.log(seats); // 10000
	return seats;
}

// helper function that navigates to the events page
export async function navigateToEventsPage(page, expect) {
	await login(page, expect);
	await page.getByRole('link', { name: 'Browse Events →' }).click();
	await expect(page.getByRole('heading', { name: 'Upcoming Events' })).toBeVisible();
}