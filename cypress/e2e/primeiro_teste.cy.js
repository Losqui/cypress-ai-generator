describe('Teste da Página Inicial', () => {
  it('Visita a página inicial', () => {
    cy.visit('cadastro.html'); // Substitua pela URL da sua página

    // Exemplo simples: verifica se o título da página contém a palavra 'Chatbot'
    cy.get('header').should('contain', 'Cadastro de Usuário'); // Adapte o texto esperado
    
  });
});