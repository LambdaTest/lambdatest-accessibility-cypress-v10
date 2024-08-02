# Step-by-Step guide to trigger your Selenium tests using Accessibility Tool

## Prerequisites

- Your [LambdaTest Username and Access key](/support/docs/using-environment-variables-for-authentication-credentials/)
- Setup your local machine as per your testing framework.

### Step 1: Setup Your Test Suite

You can use your own project to configure and test it. For demo purposes, we are using the sample repository.

```bash
git clone <URL_OF_THE_REPO>
```

If you are using your project, make sure you update the **Hub endpoint** in your tests file. By setting up the Hub endpoint, you establish the communication channel between your tests and the browser nodes, enabling effective test distribution and execution.

Configure the desired capabilities based on your test requirements. For example:

```javascript title="lambdatest-config.json"
{
  "lambdatest_auth": {
     "username": "<Your LambdaTest username>",
     "access_key": "<Your LambdaTest access key>"
  },
  "browsers": [
     {
        "browser": "Chrome",
        "platform": "Windows 10",
        "versions": [
           "latest-1"
        ]
     },
     {
        "browser": "Firefox",
        "platform": "Windows 10",
        "versions": [
           "latest-1"
        ]
     }
  ],
  "run_settings": {
     "cypress_config_file": "cypress.config.js",
     "reporter_config_file": "base_reporter_config.json",
     "build_name": "build-name",
     "parallels": 1,
     "specs": "./*.cy.js",
     "ignore_files": "",
     "network": false,
     "headless": false,
     "npm_dependencies": {
        "cypress": "10.0.0"
     }
  },
  "tunnel_settings": {
     "tunnel": false,
     "tunnel_name": null
  }
}
```

### Step 2: Establish User Authentication

Now, you need to export your environment variables *LT_USERNAME* and *LT_ACCESS_KEY* that are available in the [LambdaTest Profile page](https://accounts.lambdatest.com/detail/profile).

Run the below mentioned commands in your terminal to setup the CLI and the environment variables.

For Linux/macOS

```bash
export LT_USERNAME=YOUR_LAMBDATEST_USERNAME
export LT_ACCESS_KEY=YOUR_LAMBDATEST_ACCESS_KEY
```

For Windows

```bash
set LT_USERNAME=YOUR_LAMBDATEST_USERNAME
set LT_ACCESS_KEY=YOUR_LAMBDATEST_ACCESS_KEY
```

### Step 3: Update the Necessary Capabilities and Configurations in your project

#### 1. Install the Cypress CLI

- If you are passing npm dependencies through **package.json**, then add the below mentioned line there:

```javascript title="package.json"
"lambdatest-cypress-cli"
```

- If you are using **lambdatest-config.json** to pass the dependency, then pass the given line there:

```javascript title="lambdatest-config.json"
"lambdatest-cypress-cli": "^3.0.30"
```

- if you are not passing npm dependency in **lambdatest-config.json** you can run

```bash
npm i lambdatest-cypress-cli   
```

#### 2. In the `e2e.js` file

Add this import statement in your `e2e.js` file to import the acceessibility scanner dependency

```javascript
import 'lambdatest-cypress-cli/accessibility/scanner'
```

#### 3. In the `cypress.config.js` file

Add this template in your config file.

```javascript title="cypress.config.js"
const { defineConfig } = require("cypress");
const lambdatestAccessibility = require('lambdatest-cypress-cli/accessibility/plugin');
module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      
      lambdatestAccessibility(on, config);
      return config;
      
    },
  },
});
```

#### 4. Add the capabilities in the `lambdatest-config.json` file

To enable the accessibility testing within your automated test suite, set the `accessibility: true` in your configuration file. You can also define other settings capabilities as described below.

```javascript title="lambdatest-config.json"
capabilities: [{
    "accessibility" : true,                 // Enable accessibility testing
    "accessibility.wcagVersion": "wcag21a", // Specify WCAG version (e.g., WCAG 2.1 Level A)
    "accessibility.bestPractice": false,    // Exclude best practice issues from results
    "accessibility.needsReview": true       // Include issues that need review
}]
```

### Step 4: Execute and Monitor your Test

Now execute your tests and visit the [Automation Dashboard](https://accounts.lambdatest.com/dashboard). Click on the Accessibility tab and check the report generated.

```bash
lambdatest-cypress-cli run
```
