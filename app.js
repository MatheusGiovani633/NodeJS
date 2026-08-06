const http = require('http')
const servidor = http.createServer((req,res) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain;charset=utf-8')
    res.end('Servidor rodando \n')
})

servidor.listen(3000,'127.0.0.1', () => {
    console.log('Servidor rodando na porta 3000')
})

const express = require('express')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
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
