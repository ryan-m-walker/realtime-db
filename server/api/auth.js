const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const config = require('../config');
const Users = require('../models/User');

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  Users.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({error: 'No user with that email'});
      }
      bcrypt.compare(password, user.password, (err, match) => {
        if (!match) {
          return res.status(401).json({error: 'Incorrect password'});
        }
        jwt.sign({ userId: user._id }, config.jwt.secret, { expiresIn: '64h' }, (err, token) => {
          if (err) console.log(error);
          res.json({ 
            user: {
              userId: user._id,
              username: user.username,
              icon: user.icon
            },
            jwt: token 
          });
        });
      });
    });
});

module.exports = router;