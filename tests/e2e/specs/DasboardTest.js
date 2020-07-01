describe('Dashboard', () => {
  it('Dashboard vidgets', () => {
    cy.visit('/')
    cy.get('[placeholder="Login"]').type('admin')
    cy.get('[placeholder="Password"]').type('123456')
    cy.get('[type="submit"]').click()
    cy.contains('.widget-title', 'Слова');
    cy.contains('.widget-title', 'Предложения');
    cy.contains('.widget-title', 'Переводы');
    cy.contains('.widget-title', 'Мои словари');
    cy.contains('.widget-title', 'Паззлы');
  });
});
