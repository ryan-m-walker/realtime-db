const bcrypt = require('bcryptjs');
// const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync("p");

console.log(hash);

const hashedPassword = '$2a$10$U6ZvD56Y2PoqT9vozefg2eK4PUZQZzhx0tNY6jTlLaVnzmXTMPy7O';
bcrypt.compare('ronspassword', hashedPassword, (err, res) => {
  console.log(res);
});