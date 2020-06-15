const express = require('express');
const mongoose = require('mongoose');
const requireDir = require('require-dir');
const cors = require('cors');
require('dotenv').config();

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
    //console.log("Acessou o Middleware!");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
});

//Iniciando o DB
mongoose.connect(
    `mongodb://${process.env.DB_URL || localhost}:${process.env.DB_PORT || 27017}/nodeapi`, 
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


requireDir('./src/models');


// Rotas
app.use('/api', require('./src/routes'));

app.listen(process.env.API_PORT || 3001, () => {
  console.log(`Servidor iniciado na porta ${process.env.API_PORT || 3001}: http://localhost:${process.env.API_PORT || 3001}/api`);
});