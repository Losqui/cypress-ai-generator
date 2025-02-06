const axios = require('axios'); // Importa a biblioteca axios para fazer requisições HTTP
const cheerio = require('cheerio');

async function analisarPagina(url) {
  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    // Extrai informações básicas (exemplo)
    const titulo = $('title').text();
    const botoes = $('button').map((i, el) => $(el).text()).get(); // Pega o texto de todos os botões

    console.log('Título da página:', titulo);
    console.log('Textos dos botões:', botoes);

    return { titulo, botoes }; // Retorna um objeto com as informações
  } catch (error) {
    console.error('Erro ao analisar a página:', error);
    return null;
  }
}

// Exemplo de uso (substitua pela URL da sua página)
const urlDaPagina = 'cadastro.html'; // Substitua pela URL da sua página
analisarPagina(urlDaPagina)
  .then(dados => {
    if (dados) {
      console.log('Dados da página:', dados);
    }
  });