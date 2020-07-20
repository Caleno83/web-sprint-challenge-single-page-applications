describe('form test that form is working properly', () => {
    it('test that form is working properly', () => {
        cy.visit("/pizza")
        //get name iput and type a name in it.
        const name = "Jorge Jimenez"
        cy.get('[data-cy="name"]')
        .type(name)
        .should('have.value', name)
        //to get all the toppings
        cy.get('[data-cy="anchovies"]')
        .click()
        .should('have.checked', true)
        cy.get('[data-cy="pepperoni"]')
        .click()
        .should('have.checked', true)
        cy.get('[data-cy="olive"]')
        .click()
        .should('have.checked', true)
        cy.get('[data-cy="bacon"]')
        .click()
        .should('have.checked', true)
        //Check to see if I can type and verify instructions
        cy.get('[data-cy="instructions"]')
        .type("Here are the instructions")
        .should('have.value',"Here are the instructions")
        //test to check if I can submit the form, and button is disabled
        cy.get('[data-cy="submit-button"]')
        .click()
        .should('be.disabled')
    })
})