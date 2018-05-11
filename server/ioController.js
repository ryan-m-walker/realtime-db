const Todo = require('./models/Todo');

module.exports = (io) => (socket) => {
  console.log('New user connected');

  socket.on('add_todo', (todo, fn) => {
    console.log(todo);

    const newTodo = new Todo(todo);
    newTodo.save((err, data) => {
      if (err) console.error(err);
      console.log('saved succesfully');
      console.log(JSON.stringify(data));
      io.emit('todo_added_to_db', {
        ok: true,
        payload: { _id: data.id, text: data.text }
      });
    });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
};
