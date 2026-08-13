const express = require('express');
const app = express();
const porta = 3000
const endereco = '127.0.0.1'


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(porta, endereco, () => {
    console.log(`Servidor rodando em http://${endereco}:${porta}`);
});

app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/plain ;charset=utf-8')
    res.send('Olá, mundo!');
});

app.get('/ola/:nome', (req, res) => {
    const nome = req.params.nome;
    res.send(`Olá, ${nome}!`);
});

app.get('/sobre', (req, res) => {
    res.send('Página sobre');
});

// app.get('/calc/:num1/:num2', (req, res) => {
//     const num1 = parseFloat(req.params.num1);
//     const num2 = parseFloat(req.params.num2);
//     const resultado = num1 + num2;
//     res.send(`O resultado da soma de ${num1} e ${num2} é: ${resultado}`);
// });

function sayhello() {
    return 'Olá, mundo!';
}

app.post('/calc', (req, res) => {
    const { num1, num2, operacao } = req.body;

    // converte (resolve o caso do formulário) e valida
    const a = Number(num1);
    const b = Number(num2);

    if (Number.isNaN(a) || Number.isNaN(b)) {
        return res.status(400).json({ erro: 'num1 e num2 precisam ser números' });
    }

    let resultado;
    switch (operacao) {
        case 'soma':      resultado = a + b; break;
        case 'subtracao': resultado = a - b; break;
        case 'multiplicacao': resultado = a * b; break;
        case 'divisao':
            if (b === 0) {
                return res.status(400).json({ erro: 'Divisão por zero' });
            }
            resultado = a / b;
            break;
        default:
            return res.status(400).json({ erro: `Operação inválida: ${operacao}` });
    }

    res.json({ num1: a, num2: b, operacao, resultado });
})