

describe('Home Page', function() {
  it('Tests if home page is working', function() {
    cy.visit('http://localhost:3000');
  })
})

// Test: on channels page, switching to another channel
describe('Channels Page', function() {
  it('Tests if channels page is working', function() {
	cy.setCookie('currentUser', encodeURIComponent('{"currentUser":"currentUser=BobSmith;"}'));
    cy.visit('http://localhost:3000/channels');
	cy.getCookie('viewedChannelId').should('have.property', 'value', '-1');
	cy.get('#myChannels').click();
	cy.getCookie('viewedChannelId').should('have.property', 'value', '3');
	cy.contains('Fun Channel').click();
	cy.getCookie('viewedChannelId').should('have.property', 'value', '1');
	cy.contains('Lost and Found').click();
	cy.getCookie('viewedChannelId').should('have.property', 'value', '2');
	cy.contains('Marketplace!').click();
	cy.getCookie('viewedChannelId').should('have.property', 'value', '3');
	cy.contains('CS160').click();
	cy.getCookie('viewedChannelId').should('have.property', 'value', '0');
  })
})

describe('Search for a Student Page', function() {
  it('Tests if search for a student page is working', function() {
    cy.visit('http://localhost:3000/searchStudents');
    cy.get('#studentList>li').each(($el, index, $list) => {
      cy.get('#studentList>li').eq(index).click()
      cy.visit('http://localhost:3000/searchStudents');
  })
  })
})

describe('Profile Page', function() {
  it('Tests if profile page is working', function() {
    cy.visit('http://localhost:3000/profile');
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
