const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
    testDir: './tests',
    retries: 0,
    use: {
        baseURL: 'https://eventhub.rahulshettyacademy.com'
    },

    projects: [
        {
            name: 'chromium',

        },
        {
            name: 'firefox',
        }
    ]

});

