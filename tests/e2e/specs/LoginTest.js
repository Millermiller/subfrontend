// https://docs.cypress.io/api/introduction/api.html


describe('Login', () => {
  it('Correct login', () => {
    cy.visit('/')
    cy.get('[placeholder="Login"]').type('admin')
    cy.get('[placeholder="Password"]').type('123456')
    cy.get('[type="submit"]').click()
    cy.url().should('contain', '/is')
  });
  it('Incorrect login', () => {
    cy.visit('/')
    cy.get('[placeholder="Login"]').type('admin')
    cy.get('[placeholder="Password"]').type('1234567')
    cy.get('[type="submit"]').click()
    cy.contains('small', 'Неверный логин или пароль');
  });
});
