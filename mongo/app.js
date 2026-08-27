const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Usuario = require('./model/schema');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

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

app.post('/salvar', async (req, res) => {
    const { nome, idade, email } = req.body;

    try {
        const usuario = await new Usuario({ nome, idade, email }).save();
        res.status(201).json(usuario);
    } catch (err) {
        console.error('Erro ao salvar usuário:', err);
        res.status(500).json({ erro: err.message });
    }
});


app.delete('/deletar/:id', async (req, res) => {
    try {
        await Usuario.findByIdAndDelete(req.params.id);
        res.json({ ok: true });
    } catch (err) {
        console.error('Erro ao deletar usuário:', err);
        res.status(500).json({ erro: err.message });
    }
});

app.put('/editar/:id', async (req, res) => {
    const { nome, idade, email } = req.body;

    try {
        const usuario = await Usuario.findByIdAndUpdate(
            req.params.id,
            { nome, idade, email },
            { new: true, runValidators: true }
        );

        if (!usuario) {
            return res.status(404).json({ erro: 'Usuário não encontrado' });
        }
        res.json(usuario);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
});



mongoose.connect('mongodb://127.0.0.1:27017/db')
    .then(() => {
        console.log('Conectado ao MongoDB');
        app.listen(3000, () => {
            console.log('Servidor rodando em http://localhost:3000');
        });
    })
    .catch((err) => {
        console.error('Erro ao conectar ao MongoDB:', err.message);
        process.exit(1);
    });
