const http = require('http')
const { digaOla, subtraia } = require('./bemvindo.js')
const porta = 3000
const endereco = '127.0.0.1'
const funMatematica = require('./calculos.js')
const servidor = http.createServer((req,res) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain;charset=utf-8')
    res.end(`${digaOla('Ftec')}`)
})

servidor.listen(porta,endereco, () => {
    console.log(`Servidor rodando na porta ${endereco}:${porta}`)
    console.log(`Resultado da subtração: ${funMatematica.subtraia(10,5)}`)
    console.log(`Resultado da soma: ${funMatematica.some(10,5)}`)
    console.log(`Resultado da multiplicação: ${funMatematica.multiplique(10,5)}`)
    console.log(`Resultado da divisão: ${funMatematica.divide(10,5)}`)
})

const express = require('express')
const session = require('express-session')
const flash = require('express-flash')


const app = express();

app.use(
    express.urlencoded({
        extended: true
    }),
)
app.use(express.json())



//css
app.use(express.static('public'))

app.use((req,res,next) => {
    if(req.session.userid){ 
        res.locals.session = req.session
    }
    next()
})
