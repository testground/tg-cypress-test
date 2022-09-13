/// <reference types="cypress" />

const cypress = require("cypress");
const { invokeMap } = require("@testground/sdk");

const { start, port } = require("../../../src/server");

async function runTest(runenv, client) {
  const server = await start();

  cypress
    .run({
      reporter: "junit",
      browser: "electron",
      spec: "./cypress/e2e/1-getting-started/hello.cy.js",
      config: {
        baseUrl: "http://localhost:3001/",
        video: false,
      },
      env: {
        anything: "goes",
      },
    })
    .then((results) => {
      runenv.recordMessage("Cypress test finished");
      server.close();
      return null;
    })
    .catch((err) => {
      console.error(err);
      return err;
    });
}

module.exports = {
  basicTest: runTest,
};
