const http = require('http');
const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../client/public');
const server = http.createServer(app);
const io = socketIO(server);
const Todos = require('./models/Todo');

mongoose.connect('mongodb://localhost/sockioTodo');
const db = mongoose.connection;

const ioController = require('./ioController');
io.on('connection', ioController(io));

app.use(express.static(publicPath));

app.get('/todos', (req, res) => {
  Todos.find().then((data) => {
    res.json(data);
    console.log('fetching...');
  });
});

db.on('open', () => {
  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});
