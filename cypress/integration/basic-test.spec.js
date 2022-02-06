// basic-test.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

describe('Basic function', () => {
    it('should search for a street name and find it', () => {
      // Start from the index page
      cy.visit('http://localhost:3000/')
  
      cy.get('[data-cy=header]').contains('Weather App');
  
      cy.get('.esri-popup__header-title').should('not.exist');

      cy.get('.esri-search__input').type('Hammerstraße 100 Münster {enter}');

      cy.get('.esri-popup__header-title').should('be.visible').and('have.text', 'Search result')
      
      cy.get('.esri-search-result-renderer__more-results-item').should('be.visible').and('contains.text', 'Hammer Straße 100, 48153, Münster, Geist, Nordrhein-Westfalen')

    })
  })