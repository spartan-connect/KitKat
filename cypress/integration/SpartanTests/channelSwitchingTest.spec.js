
describe('Switching to another channel', function() { // Test: on channels page, switching to another channel
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
