const express = require('express');
const path = require('path');

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

// Serve os arquivos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Rota principal
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
);

// WebSocket
io.on('connection', (socket) => {
  console.log('Usuário conectado');

  socket.on('chat message', (data) => io.emit('chat message', data));

  socket.on('disconnect', () => console.log('Usuário desconectado'));
});

http.listen(3000, () => {
  console.log(`Servidor rodando na porta 3000 - Link http://localhost:3000`);
});
