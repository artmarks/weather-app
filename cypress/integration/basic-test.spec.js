// basic-test.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

describe('Navigation', () => {
    it('should navigate to the about page', () => {
      // Start from the index page
      cy.visit('http://localhost:3000/')
  
      // Find a link with an href attribute containing "about" and click it
      cy.get('h1').contains('Welcome to');
  
      // The new url should include "/about"
      cy.visit('http://localhost:3000/tailwind')
  
      // The new page should contain an h1 with "About page"
      cy.get('h1').contains('Welcome a lot to')
    })
  })