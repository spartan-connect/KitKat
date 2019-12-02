
describe('Calendar Page is Reachable', function() {
    it('Test page is reachable', function() {
      cy.visit('http://localhost:3000/eventsCalendar')
    })
  })

describe('All dates are reachable', function() {
    it('Tests if all calendar page dates are reachable', function() {
      cy.visit('http://localhost:3000/eventsCalendar');
      for (let i = 1; i <= 31; i++) {
          let dateString = "2019-12-";
          dateString += (i < 10) ? ('0' + i) : i
          cy.get("#" + dateString).click()
          cy.contains(dateString)
          cy.visit('http://localhost:3000/eventsCalendar')
      }
    })
})

describe('Events show on corresponding dates', function() {
    it('Tests if all events in database are correctly displayed on pages of corresponding dates', function() {
        cy.visit('http://localhost:3000/eventsCalendar');
        cy.get('#2019-12-03').click()
        cy.contains('Game night')
    })
})

describe('Next button', function() {
    it('Tests if next button works properly', function() {
        cy.visit('http://localhost:3000/eventsCalendar');
        cy.contains('Next').click()
        cy.contains('January')
    })
})

describe('Previous button', function() {
    it('Tests if previous button works properly', function() {
        cy.visit('http://localhost:3000/eventsCalendar');
        cy.contains('Previous').click()
        cy.contains('November')
    })
})