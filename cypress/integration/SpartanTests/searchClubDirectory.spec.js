describe('Search for a Club Test', function () {
    it('Test page is working', function () {
        cy.visit('http://localhost:3000/clubDirectory')
    })
})

describe('Visible Test', function () {
    it('type 3d', function () {
        cy.visit('http://localhost:3000/clubDirectory')
        cy.get('input').type('3d')
        cy.get('a[href*="62275"]').should('be.visible')
    })
    it('type epsilon', function () {
        cy.visit('http://localhost:3000/clubDirectory')
        cy.get('input').type('epsilon')
        cy.get('a[href*="46235"]').should('be.visible')
        cy.get('a[href*="44891"]').should('be.visible')
        cy.get('a[href*="46069"]').should('be.visible')
        cy.get('a[href*="53771"]').should('be.visible')
        cy.get('a[href*="49347"]').should('be.visible')
        cy.get('a[href*="48181"]').should('be.visible')
        cy.get('a[href*="48728"]').should('be.visible')
    })
    it('type theta', function () {
        cy.visit('http://localhost:3000/clubDirectory')
        cy.get('input').type('theta')
        cy.get('a[href*="48200"]').should('be.visible')
        cy.get('a[href*="47449"]').should('be.visible')
        cy.get('a[href*="47702"]').should('be.visible')
        cy.get('a[href*="46245"]').should('be.visible')
        cy.get('a[href*="46021"]').should('be.visible')
        cy.get('a[href*="48181"]').should('be.visible')
        cy.get('a[href*="48330"]').should('be.visible')
        cy.get('a[href*="48067"]').should('be.visible')
    })
    it('type soccer', function () {
        cy.visit('http://localhost:3000/clubDirectory')
        cy.get('input').type('soccer')
        cy.get('a[href*="48639"]').should('be.visible')
        cy.get('a[href*="47463"]').should('be.visible')
    })
    it('type computer science', function () {
        cy.visit('http://localhost:3000/clubDirectory')
        cy.get('input').type('computer science')
        cy.get('a[href*="48262"]').should('be.visible')
    })
})
