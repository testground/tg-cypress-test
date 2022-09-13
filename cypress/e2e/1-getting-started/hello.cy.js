/// <reference types="cypress" />

const { getAddress } = require("./addr");

describe("local server", () => {
  it("Has hello world text", () => {
    let addr = getAddress();
    cy.log("Visiting " + addr + " in Cypress");
    cy.visit(addr);
    const header = cy.get(`[id="greeting"]`, { withinSubject: null });
    header.should("have.text", "Hello world");
  });

  it("Does nothing", () => {
    cy.log("This test does nothing");
  });
});
