// Events List Locators and Text Assertions

const { test, expect } = require('@playwright/test');
const {
	login,
	navigateToEventsPage,
	getEventCards,
	applyEventFilters,
	findEventCardByTitle,
	getEventDetails,
	parseSeatCount,
	getEventCardByTitle
} = require('./helper');


// Login and open the Events page

test('Step 1 — Login and open the Events page', async ({ page }) => {
	await login(page);
	await page.getByRole('link', { name: 'Browse Events →' }).click();
	if (expect) {
		await expect(page.getByRole('heading', { name: 'Upcoming Events' })).toBeVisible();
	}
});

// Practice multiple locator strategies on the filter area

test('Test1: Step2: multiple locatory strategies', async ({ page }) => {
	await navigateToEventsPage(page);
	await page.getByPlaceholder('Search events, venues…').fill('World');
	await page.getByRole('combobox').nth(0).selectOption('Conference');
	await page.getByRole('combobox').nth(1).selectOption('Hyderabad');

	const eventCards = getEventCards(page);
	await expect(eventCards).toHaveCount(1);
	await expect(eventCards.getByText('Conference', { exact: true })).toBeVisible();
	await expect(eventCards.locator('span:has-text("Hyderabad")')).toBeVisible();
});

// Work with multiple matching event cards

test('Test1: Step3: Work with multiple matching event cards', async ({ page }) => {
	await navigateToEventsPage(page);

	const eventCards = getEventCards(page);
	await expect(eventCards.first()).toBeVisible();
	const count = await eventCards.count();
	await expect(count).toBeGreaterThan(1);

	const filteredCards = findEventCardByTitle(page, 'World Tech Summit');
	await expect(filteredCards).toHaveCount(1);
	await expect(filteredCards).toContainText('World Tech Summit');
});

// Step 4 — Extract text and reuse it in assertions

test('Test1: Step4: Extract text and reuse it in assertions', async ({ page }) => {
	await navigateToEventsPage(page);
	await applyEventFilters(page, 'World Tech Summit', 'Conference', 'Hyderabad');

	//const eventCards = getEventCards(page);
	//await expect(eventCards).toHaveCount(1);

	const selectedCard = getEventCardByTitle(page, 'World Tech Summit');

	const details = await getEventDetails(selectedCard);
	await expect(details.eventTitle).toBe('World Tech Summit');
	await expect(details.eventPrice).toContain('$');
	//await expect(details.seatCount).toBeGreaterThan(0);
	const seatCount = await parseSeatCount(details.eventSeats);
	await expect(seatCount).toBeGreaterThan(0);
});

// Step 5 — Open the correct event using a scoped locator

test('Test1: Step5: Open the correct event using a scoped locator', async ({ page }) => {
	await navigateToEventsPage(page, expect);
	await applyEventFilters(page, '', 'Conference', 'Hyderabad');

	const selectedCard = getEventCardByTitle(page, 'World Tech Summit');
	const details = await getEventDetails(selectedCard);

	await selectedCard.getByTestId('book-now-btn').click();
	await expect(page).toHaveURL(/events/);
	await expect(page.getByRole('heading', { name: details.eventTitle })).toBeVisible();
	await expect(page.getByText(details.eventPrice.trim())).toBeVisible();
});

// Test 2 — Practice nth, first, and last on the event list

// Step 1 — Go back to the Events page
test('Test2: Step1: Go back to the Events page', async ({ page }) => {
	await navigateToEventsPage(page, expect);
	await applyEventFilters(page, 'World', 'Conference', 'Hyderabad');

	const eventCards = getEventCards(page);
	await expect(eventCards).toHaveCount(1);

	// Navigate back to /events
	await page.goBack();
	// Clear the search field
	await page.getByPlaceholder('Search events, venues…').fill('');
	// Reset category to All Categories and All Locations
	await page.getByRole('combobox').nth(0).selectOption('All Categories');
	await page.getByRole('combobox').nth(1).selectOption('All Cities');

	const eventCardsHome = getEventCards(page);
	const count = await eventCardsHome.count();
	await expect(count).toBeGreaterThanOrEqual(3);
}); 

//Step 2 — Compare specific items from the list

test('Test2: Step2: Compare specific items from the list', async ({ page }) => {
    await navigateToEventsPage(page, expect);

    // Extract details from the first, second, and last event cards
    const eventCards = getEventCards(page);
    const firstEventDetails = await getEventDetails(eventCards.first());
    const lastEventDetails = await getEventDetails(eventCards.last());
    const secondEventDetails = await getEventDetails(eventCards.nth(1))

   //Assert all extracted titles are non-empty strings
    await expect(firstEventDetails.eventTitle).toBeTruthy();
    await expect(lastEventDetails.eventTitle).toBeTruthy();
    await expect(secondEventDetails.eventTitle).toBeTruthy();   
    
    //Assert the first and last event titles are different
    await expect(firstEventDetails.eventTitle).not.toBe(lastEventDetails.eventTitle);
});

