const express = require('express');
const app = express();
const ejs = require('ejs');
const porta = 3000


app.set('view engine', 'ejs');
app.set('views', './views');


app.get('/', (req, res) => {
    res.render('index', { titulo: 'Página Inicial com EJS', mensagem: 'Bem-vindo ao meu site!' });
});

app.get('/sobre', (req, res) => {
    res.render('sobre', { titulo: 'Sobre' });
});

app.listen(porta, () => {
    console.log(`Servidor rodando em http://localhost:${porta}`);
});