/*
    Cria um escutador no cliente que pode receber uma resposta quando o servidor achar que deve
    Ex: Geração de relatórios em web (O processamento do relatório pode demorar)
 */

const express = require('express');
const app = express();

const serverHttp = app.listen(3000, () => {
    console.log('Servidor online');
});

const io = require('socket.io').listen(serverHttp);
app.set('io', io);

//Trabalhar e criar eventos de escuta do client para o server
io.on('connection', (socket) => {
    console.log('Client [' + socket.id + '] conectou no Socket.IO');

    //Envia mensagem apenas para o client que estabeleceu a conexão
    socket.emit('mensagemInicialClient', { mensagem: 'Client [' + socket.id + '] conectou no Socket.IO' });

    //Envia mensagem a todos os outros clients conectados
    socket.broadcast.emit('mensagemInicialClient', { mensagem: 'Client [' + socket.id + '] conectou no Socket.IO' });

    //Escuta mensagem do client
    socket.on('mensagemParaOServidor', (dataFromClient) => {
        socket.broadcast.emit('mensagemInicialClient', { mensagem: dataFromClient.mensagem });

        socket.broadcast.to(dataFromClient.client_id).emit('mensagemInicialClient', {
            mensagem: 'Mensagem específica para um client'
        });
    });
});