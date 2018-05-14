const router = require('express').Router();
const io = require('../main');
const Todos = require('../models/Todo');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const config = require('../config');

router.get('/', (req, res) => {
  const token = req.headers.authorization.slice(6).trim();
  jwt.verify(token, config.jwt.secret, (err, match) => {
    if (err) return res.code(401).json({error: 'Invalid token'});
    if (match) {
      Todos.find().then((data) => {
        res.json(data);
      });
    } else {
      res.code(401).json({error: 'Invalid token'});
    }
  });
});

module.exports = router;






// router.post('/', (req, res) => {
//   const { resolving, ...todo } = req.body;
//   console.log(resolving);
//   const newTodo = new Todos(todo);
//   newTodo.save().then((data) => {
//     res.json({ok: true});

//     io.emit('added_new_todo', {
//       _id: data._id,
//       text: data.text
//     });
    
//   });
// });

// router.delete('/:id', (req, res) => {
//   Todos.findByIdAndRemove(req.params.id, (err) => {
//     if (err) {
//       console.log(err);
//     }
//     res.json({ok: true});
//     io.emit('delete_todo', req.params.id);
//   })
// })