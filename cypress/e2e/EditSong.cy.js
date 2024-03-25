describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:8081/')
    cy.contains('Your Songs').click()

    cy.get('button').eq(2).click()
      cy.get('input').eq(0).clear().type('Fly me to the moon')
      cy.get('input').eq(1).clear().type('Frank Sinatra')
      cy.get('input').eq(2).clear().type('Jazz')
      cy.contains('Save Changes').click()

    cy.get('button').eq(2).click()
      cy.get('input').eq(0).clear().type('Wake me up before you go-go')
      cy.get('input').eq(1).clear().type('Wham!')
      cy.get('input').eq(2).clear().type('Pop')
      cy.contains('Save Changes').click()
  })
})
