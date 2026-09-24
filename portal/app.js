// Importar Bibliotecas
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bankConnect = require('./config/db');

// Importar Middlewares
const {logRequisicoes,rotaNaoEncontrada,manipuladorErros} = require('./middleware/gerenciamento');
const {sanitizarEntradas,verificarPermissaoAdmin} = require('./middleware/seguranca');

// Importar Rotas 
const rotasNavegacao = require('./routes/navegacao');
const rotasAdministracao = require('./routes/administracao');

const app = express();

// Inicializar o Banco
bankConnect();

// Configurar Motor de Vizualização
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Decodificar em Páginas Estáticas
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Middlewares Customizados
app.use(logRequisicoes);
app.use(sanitizarEntradas);

// Prefixos de Rotas
app.use('/', rotasNavegacao);
app.use('/admin', verificarPermissaoAdmin, rotasAdministracao);

// Capturar 404 e Tratar Erros
app.use(rotaNaoEncontrada);
app.use(manipuladorErros);

module.exports = app;