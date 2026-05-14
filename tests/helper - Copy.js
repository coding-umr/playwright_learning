export async function openLoginPage(page) {
	await page.goto('https://eventhub.rahulshettyacademy.com');
	await page.getByText('Sign in to EventHub', { exact: true });

}

export async function getEmailField(page) {
	const emailInput = await page.getByPlaceholder("you@email.com");
	return emailInput;
}

//login(page) helper that signs in and asserts the Browse Events link is visible

export async function login(page, expect){
	await page.goto('https://eventhub.rahulshettyacademy.com');
	await page.locator('input#email').fill('umamaheswarreddy.t@gmail.com');
	await page.locator('input#password').fill('MxqKDd6Cxxs!3$H');
	await page.getByRole('button', {name : 'Sign In'}).click();
	await page.waitForLoadState('networkidle');
	await expect(page.getByRole('link', {name: 'Browse Events →'})).toBeVisible();

}

// helper function that return all events cards from events page


export async function getEventCards (page) {

	const eventCards = await page.locator('article[data-testid="event-card"]');
	const count = await eventCards.count();
	console.log(count);
	
	
}

//extracts the numeric available-seat value

export async function parseSeatCount(seatText){
	const seats = parseInt(seatText.match(/\d+/)[0], 10);
	console.log(seats); // 10000
	return seats;
}

//helper function that navigates to the events page
export async function navigateToEventsPage(page, expect){
	await login(page, expect);
	await page.getByRole('link', {name: 'Browse Events →'}).click();
	await expect(page.getByRole('heading', { name: 'Upcoming Events' })).toBeVisible();
}