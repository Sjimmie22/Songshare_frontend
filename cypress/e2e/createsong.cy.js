describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:8081/')
    cy.contains('Your Songs').click()
    cy.contains('Nummer toevoegen').click()

    cy.get('input').eq(0).type('Wake me up before you go-go')
    cy.get('input').eq(1).type('Wham!')
    cy.get('input').eq(2).type('Pop')

    cy.contains('Add Song').click()

    cy.get('button').eq(4).click()
    cy.contains('Confirm').click()

  })
})
