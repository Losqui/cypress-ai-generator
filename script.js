document.addEventListener('DOMContentLoaded', () => {
    // Variáveis e elementos do DOM
    const loginForm = document.getElementById('login-form');
    const loginMessage = document.getElementById('login-message');
    const cadastroForm = document.getElementById('cadastro-form');
    const tabelaUsuarios = document.getElementById('tabela-usuarios');
    const cadastroMessage = document.getElementById('cadastro-message');
    const cadastroButton = document.getElementById('cadastro-button');
    const cancelarButton = document.getElementById('cancelar-button');

    let usuarios = [];
    let proximoId = 1;
    let modoEdicao = false;
    let usuarioEditandoId = null;

    // Dados de login fixos
    const emailValido = 'teste@example.com';
    const senhaValida = 'senha123';

    // Exibir mensagens
    function exibirMensagem(elemento, mensagem, tipo) {
        elemento.textContent = mensagem;
        elemento.className = 'message ' + tipo;
    }

    // Limpar validações
    function limparValidacoes() {
        const errorMessages = document.querySelectorAll('.ant-form-item-explain');
        errorMessages.forEach(el => el.remove());
        document.querySelectorAll('input.error, select.error').forEach(el => el.classList.remove('error'));
    }

    // Criar div de erro
    function criarDivErro(mensagem) {
        console.log('criarDivErro chamada com a mensagem:', mensagem);
        const divErro = document.createElement('div');
        divErro.className = 'ant-form-item-explain ant-form-item-explain-connected css-las8w0';
        divErro.setAttribute('role', 'alert');

        const divErroInterna = document.createElement('div');
        divErroInterna.className = 'ant-form-item-explain-error';
        divErroInterna.style.cssText = '';
        divErroInterna.textContent = mensagem;

        divErro.appendChild(divErroInterna);
        console.log('divErro criada:', divErro);
        return divErro;
    }

    // Validar formulário de cadastro
    function validarCadastro() {
        let valido = true;
        limparValidacoes();

        const nome = document.getElementById('cadastro-nome');
        const email = document.getElementById('cadastro-email');
        const password = document.getElementById('cadastro-password');
        const uf = document.getElementById('cadastro-uf');
        const sexo = document.querySelector('input[name="cadastro-sexo"]:checked');

        let erros = [];

        if (!nome.value) {
            erros.push({
                campo: nome,
                mensagem: "Por favor, insira o Nome."
            });
        }
        if (!email.value) {
            erros.push({
                campo: email,
                mensagem: "Por favor, insira o Email."
            });
        }
        if (!password.value) {
            erros.push({
                campo: password,
                mensagem: "Por favor, insira a Senha."
            });
        }
        if (!uf.value) {
            erros.push({
                campo: uf,
                mensagem: "Por favor, selecione o UF."
            });
        }
        // Adiciona a verificação para garantir que o elemento 'sexo' existe
        if (!sexo) {
            erros.push({
                campo: 'sexo',
                mensagem: "Por favor, selecione o Sexo."
            });
        }

        if (erros.length > 0) {
            valido = false;
            erros.forEach(erro => {
                if (erro.campo === 'sexo') {
                    const divErroSexo = criarDivErro(erro.mensagem);
                    const sexoContainer = document.querySelector('input[name="cadastro-sexo"]').closest('.form-group');
                    sexoContainer.appendChild(divErroSexo);
                } else {
                    const divErro = criarDivErro(erro.mensagem);
                    erro.campo.parentNode.appendChild(divErro);
                    erro.campo.classList.add('error');
                }
            });
        }

        return valido;
    }

    // Adicionar usuário à tabela
    function adicionarUsuarioNaTabela(usuario) {
        const tbody = tabelaUsuarios.querySelector('tbody');
        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td>${usuario.nome}</td>
            <td>${usuario.email}</td>
            <td>${usuario.uf}</td>
            <td>${usuario.sexo}</td>
            <td class="action-buttons">
                <button class="editar-button" data-id="${usuario.id}">Editar</button>
                <button class="excluir-button" data-id="${usuario.id}">Excluir</button>
            </td>
        `;
        tbody.appendChild(tr);
        console.log('adicionarUsuarioNaTabela chamada com o usuário:', usuario); // Adicionado console.log

        // Event listeners para editar e excluir
        tr.querySelector('.editar-button').addEventListener('click', () => editarUsuario(usuario.id));
        tr.querySelector('.excluir-button').addEventListener('click', () => excluirUsuario(usuario.id));
    }

    // Editar usuário
    function editarUsuario(id) {
        modoEdicao = true;
        usuarioEditandoId = id;
        cadastroButton.textContent = 'Editar';

        const usuario = usuarios.find(user => user.id === id);
        if (usuario) {
            document.getElementById('cadastro-nome').value = usuario.nome;
            document.getElementById('cadastro-email').value = usuario.email;
            document.getElementById('cadastro-password').value = usuario.password;
            document.getElementById('cadastro-uf').value = usuario.uf;
            document.querySelector(`input[name="cadastro-sexo"][value="${usuario.sexo}"]`).checked = true;
        }
    }

    // Excluir usuário
    function excluirUsuario(id) {
        usuarios = usuarios.filter(user => user.id !== id);
        atualizarTabela();
    }

    // Atualizar tabela
    function atualizarTabela() {
        // Verifica se a tabela existe antes de tentar manipulá-la
        if (tabelaUsuarios) {
            const tbody = tabelaUsuarios.querySelector('tbody');
            if (tbody) {
                tbody.innerHTML = ''; // Limpa a tabela
                usuarios.forEach(usuario => adicionarUsuarioNaTabela(usuario));
            }
        }
        console.log('atualizarTabela chamada'); // Adicionado console.log
    }

    // Limpar Formulário
    function limparFormulario() {
        const nomeInput = document.getElementById('cadastro-nome');
        const emailInput = document.getElementById('cadastro-email');
        const passwordInput = document.getElementById('cadastro-password');
        const ufSelect = document.getElementById('cadastro-uf');
        const sexoSelecionado = document.querySelector('input[name="cadastro-sexo"]:checked');

        if (nomeInput) nomeInput.value = '';
        if (emailInput) emailInput.value = '';
        if (passwordInput) passwordInput.value = '';
        if (ufSelect) ufSelect.value = '';
        if (sexoSelecionado) sexoSelecionado.checked = false;
    }

    // Evento de clique do botão "Cancelar"
    if (cancelarButton) {
        cancelarButton.addEventListener('click', () => {
            limparFormulario();
            modoEdicao = false;
            usuarioEditandoId = null;
            cadastroButton.textContent = 'Cadastrar';
        });
    }

    // Evento de submit do formulário de login
    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;

            if (email === emailValido && password === senhaValida) {
                // Login bem-sucedido, redirecionar para cadastro.html
                window.location.href = 'cadastro.html';
            } else {
                exibirMensagem(loginMessage, 'Email ou senha incorretos.', 'error');
            }
        });
    }

    // Evento de submit do formulário de cadastro
    if (cadastroForm) {
        cadastroForm.addEventListener('submit', (event) => {
            event.preventDefault();

            if (!validarCadastro()) {
                return;
            }

            const nome = document.getElementById('cadastro-nome').value;
            const email = document.getElementById('cadastro-email').value;
            const password = document.getElementById('cadastro-password').value;
            const uf = document.getElementById('cadastro-uf').value;
            //Modifiquei essa linha para verificar se o sexo foi selecionado
            const sexoElement = document.querySelector('input[name="cadastro-sexo"]:checked');
            const sexo = sexoElement ? sexoElement.value : '';
            if (modoEdicao) {
                // Editar usuário existente
                const usuarioIndex = usuarios.findIndex(user => user.id === usuarioEditandoId);
                if (usuarioIndex !== -1) {
                    usuarios[usuarioIndex] = {
                        id: usuarioEditandoId,
                        nome,
                        email,
                        password,
                        uf,
                        sexo
                    };
                    exibirMensagem(cadastroMessage, 'Usuário editado com sucesso!', 'success');
                }
                modoEdicao = false;
                usuarioEditandoId = null;
                cadastroButton.textContent = 'Cadastrar';
            } else {
                // Adicionar novo usuário
                const novoUsuario = {
                    id: proximoId++,
                    nome,
                    email,
                    password,
                    uf,
                    sexo
                };
                usuarios.push(novoUsuario);
                exibirMensagem(cadastroMessage, 'Cadastro realizado com sucesso!', 'success');
            }

            atualizarTabela();
            limparFormulario();
        });
    }

    // Inicialização da tabela na página de cadastro (se aplicável)
    if (tabelaUsuarios) {
        atualizarTabela();
    }
});