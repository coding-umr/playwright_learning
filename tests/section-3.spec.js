const { test, expect } = require('@playwright/test');
const { login, openLoginPage, createBookingFromFilters } = require('./helper');


  test('Test case 1 - Step 1 - Login and book the first event', async ({ page }) => {
    await openLoginPage(page);
    await login(page, 'umamaheswarreddy.t@gmail.com', 'MxqKDd6Cxxs!3$H');
    await createBookingFromFilters(page, {
      searchText: 'World',
      category: 'Conference',
      city: 'Hyderabad',
      quantity: 1,
      customerName: 'John Doe',
      customerEmail: 'john.doe@example.com',
      phone: '+1234567890'
    });
//Assert the returned eventTitle equals World Tech Summit
expect(await page.getByRole('heading', { name: 'World Tech Summit' }).textContent()).toContain('World Tech Summit');

      // Assert bookingRefTwo is different from bookingRefOne

  });


  //Step 2 - Return to the event catalog and book a second event
  test('Test case 1 - Step 2 - Book a second event', async ({ page }) => {
    //await openLoginPage(page);
    //await login(page, 'umamaheswarreddy.t@gmail.com', 'MxqKDd6Cxxs!3$H');
    await page.getByRole('button', { name: 'Browse More Events' }).click();
    await createBookingFromFilters(page, {
      searchText: 'Dilli',
      category: 'Festival',
      city: 'Delhi',
      quantity: 2,
      customerName: 'John Don',
      customerEmail: 'john.don@example.com',
      phone: '+1234567891'
    });

  // Assert bookingRefTwo is different from bookingRefOne
  // Assert the second eventTitle is different from the first eventTitle
  // Assert ticketCountTwo equals 2
  // Store both returned booking objects in an array or map for later assertions


  });