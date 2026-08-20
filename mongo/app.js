const express = require('express');
const app = express();
const ejs = require('ejs');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/db')
.then(() => {
    console.log('Conectado ao MongoDB');
})
.catch((err) => {
    console.error('Erro ao conectar ao MongoDB:', err);
});

const usuarioSchema = new mongoose.Schema({
    nome: String,
    idade: Number,
    email: String
}, { collection: 'usuarios' });

const Usuario = mongoose.model('Usuario', usuarioSchema);

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (req, res) => {
    Usuario.find()
        .then((usuarios) => {
            res.render('index', { titulo: 'Usuários Atuais', usuarios });
        })
        .catch((err) => {
            console.error('Erro ao buscar usuários:', err);
            res.status(500).send('Erro ao buscar usuários');
        });
});

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});