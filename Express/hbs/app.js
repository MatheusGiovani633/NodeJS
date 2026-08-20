const express = require('express');
const path = require('path');

const app = express();
const porta = process.env.PORT || 3002;

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('index', {
        titulo: 'Página Inicial com Handlebars',
        mensagem: 'Bem-vindo ao meu site!',
        itens: ['Express', 'Handlebars', 'Node']
    });
});

app.get('/sobre', (req, res) => {
    res.render('sobre', { titulo: 'Sobre' });
});

app.listen(porta, () => {
    console.log(`Servidor rodando em http://localhost:${porta}`);
});