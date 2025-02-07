const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs'); // Importa o módulo 'fs' para escrever arquivos

async function analisarPagina(url) {
  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    const titulo = $('title').text();
    const botoes = $('button').map((i, el) => $(el).text()).get();

    return { titulo, botoes };
  } catch (error) {
    console.error('Erro ao analisar a página:', error);
    return null;
  }
}

function gerarTesteCypress(dados) {
  if (!dados) {
    return null;
  }

  const nomeArquivo = 'cypress/e2e/gerado_automaticamente.cy.js';
  const codigoCypress = `
describe('Teste Gerado Automaticamente', () => {
  it('Verifica o título da página', () => {
    cy.visit('https://losqui.github.io/cypress-ai-generator/'); // Substitua pela URL da sua página
    cy.title().should('include', '${dados.titulo}');
  });

  ${dados.botoes.map(botao => `
    it('Clica no botão "${botao}"', () => {
      cy.visit('https://losqui.github.io/cypress-ai-generator/'); // Substitua pela URL da sua página
      cy.contains('button', '${botao}').click();
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
  `).join('\n')}
});
`;

  fs.writeFileSync(nomeArquivo, codigoCypress); // Escreve o código no arquivo

  console.log(`Teste Cypress gerado e salvo em ${nomeArquivo}`);
  return nomeArquivo;
}

const urlDaPagina = 'https://losqui.github.io/cypress-ai-generator/'; // Substitua pela URL da sua página
analisarPagina(urlDaPagina)
  .then(dados => {
    if (dados) {
      const arquivoTeste = gerarTesteCypress(dados);
      if (arquivoTeste) {
        console.log(`Arquivo de teste Cypress gerado: ${arquivoTeste}`);
      }
    }
  });