
describe('Teste Gerado Automaticamente', () => {
  it('Verifica o título da página', () => {
    cy.visit('https://losqui.github.io/cypress-ai-generator/'); // Substitua pela URL da sua página
    cy.title().should('include', 'Cadastro');
  });

  
    it('Clica no botão "Cadastrar"', () => {
      cy.visit('https://losqui.github.io/cypress-ai-generator/'); // Substitua pela URL da sua página
      cy.contains('button', 'Cadastrar').click();
      // Adicione asserções aqui para verificar o resultado do clique
       cy.get('#cadastro-form > div:nth-child(1)').within(() => {
              cy.get('.ant-form-item-explain-error').should('contain', 'Por favor, insira o Nome.');
          });

          cy.get('#cadastro-form > div:nth-child(2)').within(() => {
              cy.get('.ant-form-item-explain-error').should('contain', 'Por favor, insira o Email.');
          });

          cy.get('#cadastro-form > div:nth-child(3)').within(() => {
              cy.get('.ant-form-item-explain-error').should('contain', 'Por favor, insira a Senha.');
          });

          cy.get('#cadastro-form > div:nth-child(4)').within(() => {
              cy.get('.ant-form-item-explain-error').should('contain', 'Por favor, selecione o UF.');
          });

          cy.get('#cadastro-form > div:nth-child(5)').within(() => {
              cy.get('.ant-form-item-explain-error').should('contain', 'Por favor, selecione o Sexo.');
          });

    });
  

    it('Clica no botão "Cancelar"', () => {
      cy.visit('https://losqui.github.io/cypress-ai-generator/'); // Substitua pela URL da sua página
      cy.contains('button', 'Cancelar').click();
      // Adicione asserções aqui para verificar o resultado do clique
       cy.get('#cadastro-form > div:nth-child(1)').within(() => {
              cy.get('.ant-form-item-explain-error').should('contain', 'Por favor, insira o Nome.');
          });

          cy.get('#cadastro-form > div:nth-child(2)').within(() => {
              cy.get('.ant-form-item-explain-error').should('contain', 'Por favor, insira o Email.');
          });

          cy.get('#cadastro-form > div:nth-child(3)').within(() => {
              cy.get('.ant-form-item-explain-error').should('contain', 'Por favor, insira a Senha.');
          });

          cy.get('#cadastro-form > div:nth-child(4)').within(() => {
              cy.get('.ant-form-item-explain-error').should('contain', 'Por favor, selecione o UF.');
          });

          cy.get('#cadastro-form > div:nth-child(5)').within(() => {
              cy.get('.ant-form-item-explain-error').should('contain', 'Por favor, selecione o Sexo.');
          });

    });
  
});
