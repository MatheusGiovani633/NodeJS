const lista = document.querySelector('#lista');
const form = document.querySelector('#form-usuario');

form.addEventListener('submit', async (evento) => {
    evento.preventDefault();          // <-- impede a navegação

    const dados = {
        nome:  form.nome.value,
        idade: form.idade.value,
        email: form.email.value
    };

    try {
        const resposta = await fetch('/salvar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        });

        if (!resposta.ok) {
            const erro = await resposta.json();
            throw new Error(erro.erro);
        }

        adicionarNaLista(await resposta.json());
        form.reset();
    } catch (err) {
        alert('Erro ao salvar: ' + err.message);
    }
});

function adicionarNaLista(usuario) {
    const li = document.createElement('li');
    li.dataset.id = usuario._id;

    li.innerHTML = `
        <input class="nome">
        <input class="idade" type="number">
        <input class="email" type="email">
        <button data-acao="salvar">Salvar</button>
        <button data-acao="deletar">Deletar</button>
        <span class="status"></span>`;

    li.querySelector('.nome').value  = usuario.nome;
    li.querySelector('.idade').value = usuario.idade;
    li.querySelector('.email').value = usuario.email;

    lista.appendChild(li);
}

lista.addEventListener('click', (evento) => {
    const botao = evento.target.closest('button');
    if (!botao) return;

    const li = botao.closest('li');

    if (botao.dataset.acao === 'salvar')  salvar(li);
    if (botao.dataset.acao === 'deletar') deletar(li);
});

async function salvar(li) {
    const status = li.querySelector('.status');

    const dados = {
        nome:  li.querySelector('.nome').value,
        idade: li.querySelector('.idade').value,
        email: li.querySelector('.email').value
    };

    status.textContent = 'salvando...';

    try {
        const resposta = await fetch('/editar/' + li.dataset.id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        });

        if (!resposta.ok) {
            const erro = await resposta.json();
            throw new Error(erro.erro);
        }

        status.textContent = '✓ salvo';
    } catch (err) {
        status.textContent = '✗ ' + err.message;
    }
}

async function deletar(li) {
    if (!confirm('Excluir este usuário?')) return;

    const resposta = await fetch('/deletar/' + li.dataset.id, { method: 'DELETE' });

    if (resposta.ok) {
        li.remove();
    } else {
        li.querySelector('.status').textContent = '✗ erro ao excluir';
    }
}