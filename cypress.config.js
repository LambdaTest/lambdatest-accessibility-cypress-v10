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