

describe('Home Page', function() {
  it('Tests if home page is working', function() {
    cy.visit('http://localhost:3000');
  })
})

describe('Channels Page', function() {
  it('Tests if channels page is working', function() {
    cy.visit('http://localhost:3000/channels');
  })
})

describe('Search for a Student Page', function() {
  it('Tests if home page is working', function() {
    cy.visit('http://localhost:3000/searchStudents');
  })
})
/** 
describe('Home Page', function() {
  it('Tests if home page is working', function() {
    cy.visit('http://localhost:3000');
  })
})

describe('Home Page', function() {
  it('Tests if home page is working', function() {
    cy.visit('http://localhost:3000');
  })
})*/