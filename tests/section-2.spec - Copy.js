// Events List Locators and Text Assertions

const {test, expect} = require('@playwright/test');
import { login, getEventCards, parseSeatCount, navigateToEventsPage} from './helper';

test.skip('locators and text assertions', async ({ page }) => {
    await login(page, expect);
    await getEventCards(page);
    const eventCard = await page.getByTestId('event-card').filter({hasText : 'Dilli Diwali Mela'});
    const seatsSpan= eventCard.locator('span:has-text(" seats available")');
    const spanText = await seatsSpan.textContent();
    const seats = await parseSeatCount(spanText);

});



//Login and open the Events page

test('Login and open the Events page', async({page}) => {
	await navigateToEventsPage(page, expect);
});

//Practice multiple locator strategies on the filter area

test('Test1: Step2: multiple locatory strategies', async({page}) => {
    await navigateToEventsPage(page, expect);

    await page.getByPlaceholder('Search events, venues…').fill('Los Angeles');
    await page.getByRole('button', { name: 'Clear filters' }).click();
    await page.getByRole('combobox').nth(0).selectOption('Conference');
    await page.getByRole('combobox').nth(1).selectOption('Hyderabad');
    const eventCards = await page.getByTestId('event-card');
    await expect(eventCards).toHaveCount(1);
    await expect(eventCards.getByText('Conference', { exact: true })).toBeVisible();
    await expect(eventCards.locator('span:has-text("Hyderabad")')).toBeVisible();

});

//Work with multiple matching event cards

test.only('Test1: Step3: Work with multiple matching event cards', async({page}) => {
    await navigateToEventsPage(page, expect);

    const eventCards = await page.getByTestId('event-card');
    await expect(eventCards.first()).toBeVisible();
    const count = await eventCards.count();
    await expect(count).toBeGreaterThan(1);
    const filteredCards = await eventCards.filter({hasText : 'World Tech Summit'});
    await expect(filteredCards).toHaveCount(1);
    await expect(filteredCards).toContainText('World Tech Summit');

    const card = filteredCards.first();
    const eventTitle = await card.locator('h2').textContent();
    const eventPriceText = await card.locator('span').filter({hasText: '$'}).textContent();
    const eventSeatsText = await card.locator('span').filter({hasText: 'seats'}).textContent();
    await expect(eventTitle).toBe('World Tech Summit');
    await expect(eventPriceText).toContain('$');
    const seats = await parseSeatCount(eventSeatsText);
    await expect(seats).toBeGreaterThan(0);

});

//Step 4 — Extract text and reuse it in assertions



