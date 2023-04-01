const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('send-message', (msg) => {
    console.log('message: ' + msg);
    io.emit('new-message', msg);
  });
});

server.listen(4000, () => {
  console.log('listening on *:4000');
});