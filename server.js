const dados = require('./dados.json');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

function gravar() {
    fs.writeFileSync('./dados.json', JSON.stringify(dados, null, 4));
}

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());

app.get('/salvarloginget/:email/:nome', (req, res) => {
    console.log('salvarloginget', req.params);
    dados[req.params.email] = {
        email: req.params.email,
        nome: req.params.nome
    }
    gravar();
    res.send(req.params);
});

app.get('/loginget/:email', (req, res) => {
    console.log("loginget", req.params);
    dados[req.params.email] && res.send(dados[req.params.email]);
});


app.post('/salvarloginpost', (req, res) => {
    console.log("salvarloginpost", req.body);
    dados[req.body.email] = {
        email: req.body.email,
        nome: req.body.nome
    }
    gravar();
    res.send(req.body);
});

app.post('/loginpost', (req, res) => {
    console.log("loginpost", req.body);
    dados[req.body.email] && res.send(dados[req.body.email]);
});

app.listen(9999, 'localhost', () => {
    console.log(`
    Servidor rodando na url http://localhost:9999
    Rotas
        GET     http://localhost:9999/salvarloginget/<email>/<nome>     Ex: http://localhost:9999/salvarloginget/alberto@gmail.com/alberto
        GET     http://localhost:9999/loginget/<email cadastrado>       Ex: http://localhost:9999/loginget/alberto@gmail.com
        POST    http://localhost:9999/salvarloginpost/                  Ex: body: { email: "alberto@outlook.com", nome: "alberto" }
        POST    http://localhost:9999/loginpost/                        Ex: body: { email: "alberto@outlook.com" }
    `);
});