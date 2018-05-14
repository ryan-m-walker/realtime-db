const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const mongoose = require('mongoose');
const http = require('http');
const socketioJWT = require('socketio-jwt');

const config = require('./config');


// Server cofig --------------
const app = express();
const server = http.createServer(app);


// MongoDB -------------------
mongoose.connect(config.db.url);
const db = mongoose.connection;


// Socket.io config -----------
const configIO = require('./io/configIO');
configIO.configIOServer(server);
const io = configIO.io;


// Express config -------------
require('./middleware')(app);
const apiRouter = require('./api');
app.use(express.static(config.publicPath));
app.use('/api', apiRouter);


// Needed to allow SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(config.publicPath, 'index.html'));
});


// Start app after db connection
db.on('open', () => {
  server.listen(config.port, () => {
    console.log(`Server listening config.port ${config.port}`);
  });
});

