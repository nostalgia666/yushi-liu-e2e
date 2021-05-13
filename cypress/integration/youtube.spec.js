/// <reference types= "cypress" />

describe('My RISE assignment', () => {
    it('Check YouTube video title & uploader', () => {
        // Open YouTube
        cy.visit('https://www.youtube.com')
        // Check whether YouTube is correctly opened in the browser
        cy.url().should('include', 'www.youtube.com')

        // Type the video title in the search box
        cy.get('input[id=search]').type('The whole working-from-home thing — Apple')
          // Assert the input is correct
          .should('have.value', 'The whole working-from-home thing — Apple') 
        // Click search button
        cy.get('button[id=search-icon-legacy]').click()

        // Open the video and wait for the page to load
        cy.intercept('GET', '/videoplayback?*').as('getPage')
        cy.get('a[title="The whole working-from-home thing — Apple"]').eq(0).click()
        cy.wait('@getPage').its('response.statusCode').should('eq', 200)

        // Assert that the title of video matches the search 
        cy.get('div[id=info-contents]').find('h1').should('have.text', 'The whole working-from-home thing — Apple')
        // Assert the uploader is "Apple"
        cy.get('div[id=meta-contents]').find('div[id=upload-info]').find('a')
          .should('have.text', 'Apple')
    })
})