const { defineConfig } = require('@playwright/test');

//const BASE_URL = 'https://eventhub.rahulshettyacademy.com';

export default defineConfig({
    testDir: 'tests',
    use: {
        baseURL: 'https://eventhub.rahulshettyacademy.com',
        retries: 0,
    },

    projects: [
        {
            name: 'chromium',

        }
    ]

});

