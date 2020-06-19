const mongoose = require('mongoose');

require('dotenv').config();

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

mongoose.Promise = global.Promise;

module.exports = mongoose;