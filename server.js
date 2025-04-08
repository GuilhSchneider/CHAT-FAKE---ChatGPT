const express = require('express');
const path = require('path');
const req = require('express/lib/request');
const res = require('express/lib/response');


const app = require('express')();

const http = require('http').createServer(app);

const io = require('socket.io')(http);

app.use(express.static(__dirname))


app.get('/',(req,res) =>

res.sendFile(path.join(__dirname, 'index.html')));


io.on('connection', (socket) => {
  console.log('Usuário conectado');


  socket.on('chat message', (data) => io.emit('chat message', data));


  socket.on('disconnect', () => console.log('Usuário desconectado'));
});


http.listen(3000, () => {
  console.log(`Servidor rodando na porta 3000 - Link http://localhost:3000`);
});
