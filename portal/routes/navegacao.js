const express = require('express');
const router = express.Router();
const Parser = require('rss-parser');
const artigo = require('../models/artigo');

const parser = new Parser();

router.get('/', async (req,res,next) => {
    try {
        const slides = await artigo.find({
            imagem: { $nin: [null, ''] },
            destaque: true
        }).sort({ criadoEm: -1}).limit(5);

        let noticiasRss = [];
        try {
            const feed = await parser.parseURL('https://www.theguardian.com/technology/rss');
            noticiasRss = feed.items.slice(0,6);
        } catch (erroFeed) {
            console.error('Falha no RSS:', erroFeed.message);
        }

        res.render('index', {
            titulo: 'Portal Dev - Inicio',
            slides,
            noticiasRss
        });
    } catch (erro) {
        next(erro);
    }
});

router.get('/sobre', (req,res) => {
    res.render('sobre', {titulo: 'Sobre mim'});
});

router.get('/artigo/:id', async (req,res,next) => {
    try {
        const artigoEncontrado = await artigo.findById(req.params.id);

        if (!artigoEncontrado) {
            const erro = new Error('Artigo não encontrado');
            erro.status = 404;
            return next(erro);
        }

        res.render('artigo', {
            titulo: artigoEncontrado.titulo,
            artigo: artigoEncontrado
        });
    } catch (erro) {
        // id malformado vira 404 em vez de erro de servidor
        if (erro.name === 'CastError') erro.status = 404;
        next(erro);
    }
});

module.exports = router;
