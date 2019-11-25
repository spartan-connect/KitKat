describe('Search for a Student Page Reachable', function() {
  it('Test page is working', function() {
    cy.visit('http://localhost:3000/searchStudents')
  })
  
})

describe('Visible Test', function() {
  it('type lan', function() {
    cy.visit('http://localhost:3000/searchStudents')
    cy.get('input').type('lan')
    cy.get('a[href*="Dylan Ceronio"]').should('be.visible')
    cy.get('a[href*="Alora Clem"]').should('not.be.visible')
    cy.get('a[href*="Maan Singh"]').should('not.be.visible')
    cy.get('a[href*="Crystal Kwong"]').should('not.be.visible')
    cy.get('a[href*="Carson Sanders"]').should('not.be.visible')
  })
  it('type l', function() {
    cy.visit('http://localhost:3000/searchStudents')
    cy.get('input').type('l')
    //cy.get('#studentList>li').get('a[href*="l"]').should('be.visible')
    cy.get('a[href*="Dylan Ceronio"]').should('be.visible')
    cy.get('a[href*="Alora Clem"]').should('be.visible')
    cy.get('a[href*="Maan Singh"]').should('not.be.visible')
    cy.get('a[href*="Crystal Kwong"]').should('be.visible')
    cy.get('a[href*="Carson Sanders"]').should('not.be.visible')
  })
})

describe('Click Test', function() {
  it('Get to Dylan profile', function() {
    cy.visit('http://localhost:3000/searchStudents')
    cy.get('input').type('lan')
    cy.get('a[href*="Dylan Ceronio"]').should('be.visible')
    cy.get('a[href*="Dylan Ceronio"]').click()
    cy.url().should('include', '/searchProfile/Dylan%20Ceronio')
    cy.contains("Dylan Ceronio's Profile")
    cy.contains("Bio")
    cy.contains("Major")
    cy.contains("Classes")
    cy.contains("Clubs")
    cy.contains("Profile Picture")
  })
})