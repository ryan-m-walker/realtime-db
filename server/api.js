const router = require('express').Router();
const db = require('mongoose').connection;
const Todos = require('./models/Todo');
const io = require('./index');

router.get('/todos', (req, res) => {
  Todos.find().then((data) => {
    res.json(data);
    console.log('fetching...');
  });
});

router.post('/todos', (req, res) => {
  const newTodo = new Todos(req.body);
  newTodo.save().then((data) => {
    console.log(data);
    io.emit('added_new_todo');
  });
});

module.exports = router;
