const express = require('express');
const mongoose = require('mongoose');
const requireDir = require('require-dir');
const cors = require('cors');


require('dotenv').config({  
  path: process.env.NODE_ENV === "test" ? ".env.testing" : ".env"
})

var whitelist = ['http://exemple.com']
var corsOptions = {
  origin: function (origin, callback) {
      //console.log(origin);
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

//Iniciando o APP
const app = express();


app.use(express.json());

app.use((req, res, next) => {
    //console.log(`Acessou o Middleware!: ${Date.now()}`);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
});

//Iniciando o DB
mongoose.connect(
    `mongodb://${process.env.DB_URL || 'localhost'}:${process.env.DB_PORT || 27017}/nodeapi`, 
    { 
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false 
    }
).then(() => {
    console.log("Conexão com MongoDB realizada com sucesso!");
}).catch((erro) => {
    console.log("Erro: Conexão com MongoDB não foi realizada com sucesso!");
});

requireDir('./src/app/models');

// Rotas
app.use('/api', require('./src/routes'));
// Fim Rotas

//Inicio Socket.IO
require('./src/modules/socket');
//Fim Socket.IO

app.listen(process.env.API_PORT || 3001, () => {
  console.log(`🔓-💾 - Servidor iniciado na porta ${process.env.API_PORT || 3001}: http://localhost:${process.env.API_PORT || 3001}/api`);
  console.log(`🔓-💾 - Servidor HTTP iniciado na porta ${process.env.API_PORT || 3001}: http://localhost:${process.env.API_PORT || 3001}/`);
  console.log(`Variaveis ambiente configuradas:`);
  console.log(`DB_URL: ${process.env.DB_URL} - DB_PORT: ${process.env.DB_PORT}`);
  console.log(`API_PORT: ${process.env.API_PORT} - SOCKET_PORT: ${process.env.SOCKET_PORT}`);
  console.log(`SMTP_HOST: ${process.env.SMTP_HOST} - SMTP_PORT: ${process.env.SMTP_PORT}`);
  console.log(`SMTP_USER: ${process.env.SMTP_USER} - SMTP_PASS: ${process.env.SMTP_PASS}`);
  console.log(`SMTP_EMAIL_FROM: ${process.env.SMTP_EMAIL_FROM} - SMTP_NOME_ENV: ${process.env.SMTP_NOME_ENV}`);
});