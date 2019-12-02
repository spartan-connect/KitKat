

describe('Home Page', function () {
  it('Tests if home page is working', function () {
    cy.visit('http://localhost:3000');
    cy.get('')
  })
})

describe('Channels Page', function () {
  it('Tests if channels page is working', function () {
    cy.visit('http://localhost:3000/channels');
  })
})

describe('Search for a Student Page', function () {
  it('Tests if home page is working', function () {
    cy.visit('http://localhost:3000/searchStudents');
    cy.get('#studentList>li').each(($el, index, $list) => {
      cy.get('#studentList>li').eq(index).click()
      cy.visit('http://localhost:3000/searchStudents');
  })
  })
})

/**
describe('Home Page', function() {
  it('Tests if home page is working', function() {
    cy.visit('http://localhost:3000');
  })
})

describe('Campus Map Page', function() {
  it('Tests if campus map page is working', function() {
    cy.visit('http://localhost:3000/campusMap');
  })
})

describe('Club Directory Page', function() {
  it('Tests if club directory page is working', function() {
    cy.visit('http://localhost:3000/clubDirectory');
  })
})

describe('Event Calendar Page', function() {
  it('Tests if event calendar page is working', function() {
    cy.visit('http://localhost:3000/eventCalendar');
  })
})
