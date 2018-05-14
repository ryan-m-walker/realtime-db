const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const config = require('../config');

module.exports = (socket, next) => {
  if (socket.handshake.query && socket.handshake.query.token) {
    jwt.verify(socket.handshake.query.token, config.jwt.secret, (err, decoded) => {
      if (err) return console.log('Authentication error');
      socket.decoded = decoded;
      next();
    });
  } else {
    console.log('Failed to Authenticate');
  }  
};