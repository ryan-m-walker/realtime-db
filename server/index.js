const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const mongoose = require('mongoose');
const http = require('http');

const app = express();
const PORT = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../client/public');
const server = http.createServer(app);
const io = socketIO(server);
const apiRouter = require('./api');

mongoose.connect('mongodb://localhost/sockioTodo');
const db = mongoose.connection;

const ioController = require('./ioController');
io.on('connection', ioController(io));

require('./middleware')(app);
app.use(express.static(publicPath));

app.use('/api', apiRouter);

db.on('open', () => {
  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});

module.exports = io;
