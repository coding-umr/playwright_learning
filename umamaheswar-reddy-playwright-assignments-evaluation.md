## Overall Feedback

Overall status: Needs revision

Recommended score band: 50-55%

You have made a genuine attempt at all three assignments and there are parts of the submission that show you understand basic Playwright concepts such as using `page`, locators, assertions, helpers, browser contexts, and filtering event cards. Some of the tests were able to run successfully after I removed the committed `test.only` markers in a temporary review copy.

However, the submission is not yet clean or assignment-complete. Multiple tests are left focused with `test.only`, one test is explicitly marked as not working, one assignment test is skipped, the configuration does not run in the required two browsers, and some assertions are missing `await` or are written in a way that does not actually validate the page. There are also duplicate copy files and hard-coded credentials in the helper file, which should not be submitted.

## Execution Summary

I reviewed the repository in an isolated temporary clone so the course project was not modified.

Initial run:

- Only 3 tests executed because `test.only` was committed in multiple files.
- The initial run failed before browser launch until Playwright browsers were installed.

Temporary full-suite run after removing `test.only` only in the review clone:

- 16 total tests discovered.
- 13 passed.
- 2 failed.
- 1 skipped.
- 1 browser-context cleanup error was reported outside an individual test.

Important: the passing count should not be treated as full assignment completion because several requirements were missing, skipped, or only partially asserted.

## Assignment 1: Playwright Project Setup and First Test

Assignment: Playwright Project Setup and First Test  
Status: Partially complete, needs revision

### What went well

- `package.json` exists and includes `@playwright/test` in `devDependencies`.
- `tests/get-started.spec.js` was created.
- The submission includes a helper named `openLoginPage(page)`.
- There is a basic login page test that checks the email field and Sign In button.
- A short note was added comparing `playwright` and `@playwright/test`.
- A short comment was added explaining why `async/await` matters in Playwright.

### Gaps

- The assignment asked for a test named `EventHub login page loads`, but the submitted test is named `open login page`. 
- `openLoginPage(page)` navigates to the site root instead of explicitly opening `/login`.
- The helper checks text using `page.getByText(...)` but does not assert visibility with `expect(...).toBeVisible()`.
- The second login-page test should assert the password field by label `Password`; the submitted code uses `getByLabel('password')`, which may be case-sensitive depending on the accessible label.
- Some lines create locators or text lookups without meaningful assertions, for example `await page.getByText(...)` by itself does not prove the heading is visible.
- A broken test was left in the file with the comment `this is not working leave and move to next section of assignment`.
- `test.only` was committed, which means this assignment's actual tests would not all run in a normal evaluation.
- The manual browser context test belongs more to the second assignment and should not be mixed into the first assignment file.

### Suggestions

- Keep this assignment focused on project setup and the first two login-page tests.
- Rename the first test to match the assignment intent.
- Update `openLoginPage(page)` to use `/login` and assert the heading with `await expect(...).toBeVisible()`.
- Remove the broken `validate configuration file` test from this assignment.
- Remove all `test.only` before submission.
- Make every UI check a real assertion, not just a locator call.

## Assignment 2: Browser Context Page Fixture and Config

Assignment: Browser Context Page Fixture and Config  
Status: Partially complete, needs revision

### What went well

- `playwright.config.js` was created.
- `baseURL` is configured.
- `testDir` is configured.
- `tests/config-smoke.spec.js` exists.
- The config smoke test uses `page.goto('/')`, which shows an attempt to rely on `baseURL`.
- There is an attempt to compare a built-in `page` fixture with a manually created browser context.
- The submission includes comments explaining the difference between a page fixture and browser context.

### Gaps

- The assignment required at least two browser projects: `chromium` and `firefox`. The submitted config only defines `chromium`.
- `retries` was placed inside `use`; it should be a top-level config option.
- The project is marked as CommonJS in `package.json`, but `playwright.config.js` uses `export default`. The test files also mix `require` and `import`. This is inconsistent and should be cleaned up.
- `openLoginPage(page)` does not use the configured `baseURL` with `/login`; it uses a full hard-coded URL.
- The assignment asked for a `getEmailField(page)` helper to be used. The test mostly uses direct locators instead.
- The manual browser context flow is incomplete in `config-smoke.spec.js`; it fills the fixture page but does not create and validate a fresh isolated context in the same test as requested.
- `await expect(emailField).toBeEmpty` is missing `()`, so it does not execute any assertion.
- The manual context close operation in the other file is missing `await`, which caused a browser protocol cleanup error during execution.
- `test.only` was committed in this assignment file, so only that focused test runs by default.

### Suggestions

- Use one module style consistently. Since the project is CommonJS, use `module.exports = defineConfig(...)` and `require(...)`, or switch the full project cleanly to ESM.
- Configure both `chromium` and `firefox` projects.
- Move `retries` to the top level of `playwright.config.js`.
- Make `openLoginPage(page)` navigate with `page.goto('/login')` so it proves `baseURL` is working.
- Implement the page fixture and manual context comparison in the same test as requested.
- Always close manual contexts with `await isolatedContext.close()`.
- Remove `test.only` and verify the file runs in both configured browsers.

## Assignment 3: Events List Locators and Text Assertions

Assignment: Events List Locators and Text Assertions  
Status: Partially complete, closer than the first two but still needs revision

### What went well

- The submission includes helper functions for login, navigating to the events page, returning event cards, finding cards by title, getting event details, and parsing seat counts.
- The tests use several locator strategies: placeholder, role, combobox index, `data-testid`, text filtering, `first()`, `last()`, and `nth(1)`.
- The code attempts to extract event title, price, seat text, and numeric seat count.
- The selected event card is scoped before clicking the booking button in one test.
- The final list comparison test checks first, second, and last event titles and validates that the first and last titles differ.

### Gaps

- One event assignment test is skipped with `test.skip`, so part of the submission is intentionally not running.
- `test.only` was committed in the event assignment file, which prevents the full file from running normally.
- The assignment specifically asked to filter the search field with `World`, category `Conference`, and city `Hyderabad`. One submitted test uses `Los Angeles` as the search term, which does not match the requested scenario.
- The assignment required filtering to `World Tech Summit`; in the scoped click test, the code selects the first card after filtering by category and city instead of explicitly selecting the `World Tech Summit` card.
- `applyEventFilters` always clicks `Clear filters` after filling the search. When the clear button is not visible, this caused a timeout in the full-suite run.
- The detail-page price assertion uses raw text matching and may be fragile if formatting or whitespace differs.
- The tests depend on hard-coded real credentials inside the helper file. Credentials should come from environment variables or a safe config file that is not committed.
- There are duplicate files such as `section-2.spec - Copy.js` and `helper - Copy.js`, which make the submission look unclean and can confuse evaluation.

### Suggestions

- Remove skipped and focused tests before submission.
- Follow the exact requested filter flow: search `World`, category `Conference`, city `Hyderabad`.
- Use `findEventCardByTitle(page, 'World Tech Summit')` before extracting details and before clicking Book Now.
- Make `applyEventFilters` avoid clicking `Clear filters` unless the button is visible.
- Store credentials in environment variables and read them in the login helper.
- Delete duplicate copy files from the final submission.

## Code Quality and Submission Hygiene

The biggest issue is not only whether individual tests pass, but whether the submission is clean, repeatable, and aligned with the assignment instructions.

Please fix these before resubmitting:

- Remove all `test.only`.
- Remove or complete all skipped tests.
- Remove broken tests and comments saying the work is not working.
- Do not commit hard-coded passwords or real credentials.
- Delete duplicate copy files.
- Use one module system consistently.
- Make every assertion executable with `await expect(...).matcher()`.
- Run the full suite before submission, not only a focused test.

## Final Recommendation

I would not mark this submission as fully complete yet. There is a reasonable foundation here, especially in the events assignment, but the work needs revision before it can be accepted as assignment-complete.

My recommendation is to revise and resubmit after cleaning the project, removing focused/skipped tests, fixing the configuration for multiple browsers, completing the browser context comparison properly, and aligning the events flow exactly with the requested `World Tech Summit` scenario.

Recommended score band for the current submission: 50-55%.
