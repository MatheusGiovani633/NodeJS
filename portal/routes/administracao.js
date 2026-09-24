const express = require('express');
const router = express.Router();
const Artigo = require('../models/artigo');

// Converte id malformado em 404 em vez de erro de servidor
const tratarErro = (error, next) => {
    if (error.name === 'CastError') error.status = 404;
    next(error);
};

const naoEncontrado = () => {
    const erro = new Error('Artigo não encontrado');
    erro.status = 404;
    return erro;
};

router.get('/', async (req,res,next) => {
    try {
        const artigos = await Artigo.find({}).sort({ criadoEm: -1})
        res.render('admin/index', {
            titulo: 'Painel Administrativo Blog',
            artigos
        });
    } catch (error) {
        next(error);
    }
});

router.get('/novo', (req,res) => {
    res.render('admin/form', {
        titulo: 'Novo artigo',
        artigo: {},
        acao: '/admin/salvar'
    });
});

router.post('/salvar', async (req,res,next) => {
    try {
        const { titulo, resumo, conteudo, imagem, destaque } = req.body;
        await Artigo.create({
            titulo,
            resumo,
            conteudo,
            imagem,
            destaque: destaque === 'on'
        });
        res.redirect('/admin');
    } catch (error) {
        next(error);
    }
});

router.post('/excluir/:id', async (req,res,next) => {
    try {
        const { id } = req.params;
        const removido = await Artigo.findByIdAndDelete(id);
        if (!removido) return next(naoEncontrado());
        res.redirect('/admin');
    } catch (error) {
        tratarErro(error, next);
    }
});

router.get('/editar/:id', async (req,res,next) => {
    try {
        const { id } = req.params;
        const artigo = await Artigo.findById(id);
        if (!artigo) return next(naoEncontrado());

        res.render('admin/form', {
            titulo: 'Editar artigo',
            artigo,
            acao: `/admin/editar/${id}`
        });
    } catch (error) {
        tratarErro(error, next);
    }
});

router.post('/editar/:id', async (req,res,next) => {
    try {
        const { id } = req.params;
        const { titulo, resumo, conteudo, imagem, destaque } = req.body;

        const atualizado = await Artigo.findByIdAndUpdate(id, {
            titulo,
            resumo,
            conteudo,
            imagem,
            destaque: destaque === 'on'
        }, { new: true, runValidators: true });

        if (!atualizado) return next(naoEncontrado());
        res.redirect('/admin');
    } catch (error) {
        tratarErro(error, next);
    }
});

module.exports = router;
