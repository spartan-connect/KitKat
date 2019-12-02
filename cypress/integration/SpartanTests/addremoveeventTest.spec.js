describe('Add Event', function () {
    it('Test if adding event is working', function () {
        cy.visit('http://localhost:3000/eventsCalendar');
        cy.get('form button').click();
        cy.get('input[name*="date"]').type('2019-12-29');
        cy.get('input[name*="title"]').type('Test');
        cy.get('input[name*="description"]').type('Test');
        cy.get('input[type*="submit"]').click();
    })
});

describe('Check if event created', function () {
    it('Test if Event Visible', function () {
        cy.visit('http://localhost:3000/eventsCalendar');
        cy.get('td[id*="2019-12-29"]').click();
        cy.get('h2').should('have.text', 'Test');
    });
});

describe('Remove Event', function () {
    it('Test if removing an event is working', function () {
        cy.visit('http://localhost:3000/eventsCalendar');
        cy.get('td[id*="2019-12-29"]').click();
        cy.get('button[id*="Test~2019-12-29"]').click();
        cy.get('td[id*="2019-12-29"]').click();
        cy.get('p[id*="no event"').should('be.visible');
    })
});

describe('Add Event, check if cannot enter "~" in Title', function () {
    it('Test if adding an event, Test if cannot enter "~" in Title', function () {
        cy.visit('http://localhost:3000/eventsCalendar');
        cy.get('form button').click();
        cy.get('input[name*="date"]').type('2019-12-30');
        cy.get('input[name*="title"]').type('Test~jgkljkl;');
        cy.get('input[name*="description"]').type('Test');
        cy.get('input[type*="submit"]').click();
        cy.url().should('include', 'newEventForm?');
    })
});

