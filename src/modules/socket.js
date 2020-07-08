const express = require('express');
const path = require('path');
const http = express();
//Dados persistentes
const mongoose = require('mongoose');
const Message = mongoose.model('Message');

//Inicio SocketIO
const server = require('http').createServer(http);
const io = require('socket.io')(server);

//Inicio Serviço HTML

http.use('/chat', express.static(path.join(__dirname, '../public')));
http.set('views', path.join(__dirname, '../public'));
http.engine('html', require('ejs').renderFile);
http.set('view engine', 'html');

http.use('/chat', (req, res) => {
  res.render('index.html');
});

//Fim Serviço HTML

async function loadDBMessages(){
    try{
        const messagesDB = await Message.find()
        messages = messagesDB
    } catch(err){
        const response = 'Erro ao listar mensagens';
        console.log(response);
    }
}

async function storeDBMessage(data){
    try {
        await Message.create(data);
    } catch (error) {
        console.log(error);
    }
    loadDBMessages();
} 

let messages = [];
let connectedUsers = [];
loadDBMessages();



io.on('connection', socket => {
    //Gerando lista de usuários On-Line
    const userID = socket.id;
    connectedUsers.push(userID);
    var address = socket.request.connection._peername.address;
    var address2 = socket.request.connection.remoteAddress;
    console.log(address, address2);
    socket.emit('previousMessages', messages);
    socket.emit('connectedUsers', connectedUsers);
    socket.broadcast.emit('connectedUsers', connectedUsers);

    socket.on('sendMessage', data => {
        storeDBMessage(data);
        socket.broadcast.emit('receivedMessage', data);
    });
    initStatus = false;
    socket.on('disconnect', () => {
        const pos = connectedUsers.indexOf(userID);
        connectedUsers.splice(pos, 1);
        socket.broadcast.emit('connectedUsers', connectedUsers);
        loadDBMessages();
    })
});

server.listen(3002, () =>{
    console.log(`🔓-💾 - Servidor Socket.IO iniciado na porta ${process.env.SOCKET_PORT || 3002}: http://localhost:${process.env.SOCKET_PORT || 3002}`);
});
  