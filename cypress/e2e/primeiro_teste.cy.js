describe('Teste da Página Inicial', () => {
  it('Visita a página inicial', () => {
    cy.visit('https://losqui.github.io/cypress-ai-generator/'); // Substitua pela URL da sua Página

    // Exemplo simples: verifica se o título da página contém a palavra 'Chatbot'
    cy.get('header').should('contain', 'Cadastro de Usuário'); // Adapte o texto esperado
    
  });
});