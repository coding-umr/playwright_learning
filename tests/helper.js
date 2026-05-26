const {expect} = require('@playwright/test');
require('dotenv').config(); 
const config = require('../playwright.config');


const TEST_EMAIL = process.env.TEST_EMAIL;
const TEST_PASSWORD = process.env.TEST_PASSWORD;

const BASE_URL = config.use.baseURL;
//globalThis.BASE_URL = BASE_URL;

async function openLoginPage(page) {
	await page.goto(BASE_URL + '/login');
	await expect(page.getByText('Sign in to EventHub', { exact: true })).toBeVisible();
}

async function getEmailField(page) {
	const emailInput = await page.getByPlaceholder('you@email.com');
	return emailInput;
}

async function loginWithCredentials(page, email, password) {
	await page.goto(BASE_URL);
	await page.locator('input#email').fill(email);
	await page.locator('input#password').fill(password);
	await page.getByRole('button', { name: 'Sign In' }).click();
	await page.waitForLoadState('networkidle');
	await page.getByRole('link', { name: 'Browse Events →' }).waitFor();
}

// login(page) helper that signs in and asserts the Browse Events link is visible
async function login(page) {
	await page.goto(BASE_URL);
	await page.locator('input#email').fill(TEST_EMAIL);
	await page.locator('input#password').fill(TEST_PASSWORD);
	await page.getByRole('button', { name: 'Sign In' }).click();
	await page.waitForLoadState('networkidle');
	await page.getByRole('link', { name: 'Browse Events →' }).waitFor();
}

function getEventCards(page) {
	const eventCards = page.getByTestId('event-card');
	return eventCards;
}

function getEventCardByTitle(page, title) {
    return page.locator('h3', { hasText: title }).locator('xpath=ancestor::*[@data-testid="event-card"]');
}

async function applyEventFilters(page, search, category, city) {
	await page.getByPlaceholder('Search events, venues…').fill(search);
	//await page.getByRole('button', { name: 'Clear filters' }).click();
	await page.getByRole('combobox').nth(0).selectOption(category);
	await page.getByRole('combobox').nth(1).selectOption(city);
}

function findEventCardByTitle(page, title) {
	return getEventCards(page).filter({ hasText: title });
}

async function getEventDetails(card) {
	const eventTitle = await card.locator('h3').textContent();
	const eventPrice = await card.locator('p').filter({ hasText: '$' }).textContent();
	const eventSeats = await card.locator('span').filter({ hasText: 'seats' }).textContent();
	const seatCount = parseSeatCount(eventSeats);
	return { eventTitle, eventPrice, eventSeats, seatCount };
}

async function parseSeatCount(seatText) {
	const seats = parseInt(seatText.match(/\d+/)[0], 10);
	//console.log(seats);
	return seats;
}

// helper function that navigates to the events page
async function navigateToEventsPage(page) {
	//await page.goto('https://eventhub.rahulshettyacademy.com');
	//await openLoginPage(page, expect);
	await login(page);
	await page.getByRole('link', { name: 'Browse Events →' }).click();
	if (expect) {
		await expect(page.getByRole('heading', { name: 'Upcoming Events' })).toBeVisible();
	}
}

async function createBookingFromFilters(page, { searchText, category, city, quantity, customerName, customerEmail, phone }) {
	await page.getByRole('link', { name: 'Browse Events →' }).click();
	await page.getByPlaceholder('Search events, venues…').fill(searchText);
	await page.getByRole('combobox').nth(0).selectOption(category);
	await page.getByRole('combobox').nth(1).selectOption(city);
	const selectedCard = getEventCards(page).first();
	//await selectedCard.getByTestId('book-now-btn').click();
	await selectedCard.getByRole('link', { name: 'Book Now' }).click();	
	
}


module.exports = {
	BASE_URL,
	openLoginPage,
	getEmailField,
	login,
	getEventCards,
	applyEventFilters,
	findEventCardByTitle,
	getEventDetails,
	parseSeatCount,
	navigateToEventsPage,
	createBookingFromFilters,
	getEventCardByTitle
};