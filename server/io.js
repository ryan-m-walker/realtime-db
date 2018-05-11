const http = require('http');
const socketIO = require('socket.io');

exports.createSocketIOServer = (app) => {
  return http.createServer(app);
};
