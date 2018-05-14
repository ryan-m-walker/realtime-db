const fs = require('fs')
const path = require('path');

module.exports = {
  db: {
    url: 'mongodb://localhost/sockioTodo'
  },
  jwt: {
    secret: fs.readFileSync(path.join(__dirname, '../../secrets.key'))
  }
};
