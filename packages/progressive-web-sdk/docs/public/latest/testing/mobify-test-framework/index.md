The Mobify Test Framework is a package of testing tools used for performance 
and end-to-end (E2E) testing of your PWAs.

## Usage
```bash
mobify-test-framework [command]
Commands:
    lighthouse [options] <urls...>  Runs lighthouse tests on a list of URLs
    nightwatch [options]            Runs nightwatch end-to-end tests, using Mobify's recommended settings.
```

## Performance Testing with Lighthouse
[Lighthouse](https://github.com/GoogleChrome/lighthouse) is a tool we use to
assess an app against [Google's PWA
Checklist](https://developers.google.com/web/progressive-web-apps/checklist).

Lighthouse outputs a report (in HTML and JSON) and our tool will assert a
PASS or FAIL dependent on whether values meet configurable thresholds.

See the list of configurable thresholds and recommended values below:

```bash
# How to use:
mobify-test-framework lighthouse https://www.merlinspotions.com

# Basic Settings:
--maxTTI - Maximum time to interactive before reporting a failure (default: 10000 ms)
--minPWAScore - Minimum PWA score before reporting a failure (default: 90)
--minSEOScore - Minimum SEO score before reporting a failure (default: 100)
--minAccessibilityScore - Minimum accessibility score before reporting a failure (default: 100)
--checkConsoleErrors - Assert that browser errors are not logged to the console (default: false)
--mobifyPreview - set Mobify Preview parameters to the url (default: false)
--device - Form factor for tests (choices: 'mobile', 'desktop') (default: 'mobile')
--outputDir - set the Output directory for reports (default: 'tests/lighthouse-reports')

# We can also run Lighthouse against multiple URLs:
mobify-test-framework lighthouse https://www.merlinspotions.com https://www.merlinspotions.com/potions

# To run against local files with Mobify Preview, for when the PWA is not live:
# First run `npm start` in another tab
mobify-test-framework lighthouse https://www.merlinspotions.com --mobifyPreview
```

## End to End Testing with Nightwatch
[`Nightwatch.js`](http://nightwatchjs.org/) is a tool that automates user
interaction for browser end-to-end tests. The Mobify Test Framework manages the
installation of Chromedriver and the latest version is
automatically downloaded when the project is installed.

```bash
# The following are optional environment variables of which you can set before running:
Environment variables:
    NIGHTWATCH_SAUCE_USERNAME      Saucelabs username
    NIGHTWATCH_SAUCE_ACCESS_KEY    Saucelabs password
    NIGHTWATCH_SRC_FOLDERS         Space-separated list of folders containing tests (default ['./tests/e2e'])
    NIGHTWATCH_OUTPUT_FOLDER       Output folder for test reports (default './tests/reports')
    NIGHTWATCH_SCREENSHOTS_PATH    Output folder for test screenshots (default './tests/screenshots')

# Run all end-to-end tests
mobify-test-framework nightwatch
```

The `default` test environment is a Chrome instance that emulates a Pixel 2 device. You can
view the configuration file at
`node_modules/@mobify/test-framework/src/nightwatch-config.js`.

To specify a custom path to Chromedriver, or to create new test
configurations, you can create your own nightwatch-config and override it
entirely. Additionally, you can pass any regular nightwatch argument to the
Mobify Test Framwork.

```bash
# To run nightwatch while passing a custom nightwatch-config 
mobify-test-framework nightwatch -config <file_path>

# Use '--' to pass extra args directly to nightwatch.
# eg. mobify-test-framework.js nightwatch -- "--verbose --env chrome_incognito"

# Run all end-to-end tests for a given tag
mobify-test-framework nightwatch -- "--tag checkout"

# Run all tests within a subdirectory
mobify-test-framework nightwatch -- "--group workflows/smoke-test"

# Run all end-to-end tests under a specific test environment
mobify-test-framework nightwatch -- "-e safari"

# Run only one test
mobify-test-framework nightwatch -- tests/e2e/workflows/merlins/home-example.js

# Run end-to-end tests on the production environment
env SKIP_PREVIEW=1 mobify-test-framework nightwatch

# If a test has failed and you would like to debug a single test without the browser closing in the end
env DEBUG=1 mobify-test-framework nightwatch --test test/e2e/workflows/guest-checkout.js
```

A typical project will have the tests fall under the `web/tests/e2e/workflows/`
folder while page-objects (template-specific selectors and functions) are
located in the `web/tests/e2e/page-objects/` folder.

We recommend creating end-to-end tests go through the core flow of checkout for
both registered and guest to ensure the core flow does not break throughout the
development cycle.

<div id="toc"><p class="u-text-size-smaller u-margin-start u-margin-bottom"><b>IN THIS ARTICLE:</b></p></div>