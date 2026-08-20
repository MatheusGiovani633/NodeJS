const express = require('express');
const app = express();
const porta = 3000
const endereco = '127.0.0.1'

const service = require('./service/funcalc.js');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use
app.listen(porta, endereco, () => {
    console.log(`Servidor rodando em http://${endereco}:${porta}`);
});



app.get('/ola/:nome', (req, res) => {
    const nome = req.params.nome;
    res.send(`Olá, ${nome}!`);
});

app.get('/sobre', (req, res) => {
    res.send('Página sobre');
});

app.post('/calc', (req, res) => {
    const { num1, num2, operacao } = req.body;

    // converte (resolve o caso do formulário) e valida
    const a = Number(num1);
    const b = Number(num2);

    if (Number.isNaN(a) || Number.isNaN(b)) {
        return res.status(400).json({ erro: 'num1 e num2 precisam ser números' });
    }

    try {
        const resultado = service.calc(a, b, operacao);
        res.json({ num1: a, num2: b, operacao, resultado });
    } catch (error) {
        return res.status(400).json({ erro: error.message });
    }
})