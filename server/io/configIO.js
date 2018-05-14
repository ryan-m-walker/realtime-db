const http = require('http');
const socketIO = require('socket.io');
const socketioJWT = require('socketio-jwt');

const config = require('../config');
const ioController = require('./ioController');
const ioJWTMiddleware = require('./ioJWTMiddleware');

let io;

// Set up io server and configure JWT authentication
exports.configIOServer = (server) => {
  io = socketIO(server);
  io.use(ioJWTMiddleware);
  io.sockets
    .on('connection', socketioJWT.authorize({
      secret: config.jwt.secret,
      timeout: 15000
    }))
    .on('authenticated', ioController(io));
};

exports.io = io;
