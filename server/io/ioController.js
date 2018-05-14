const Todo = require('../models/Todo');

module.exports = (io) => (socket) => {
  
  socket.on('add_todo', (todo) => {
    const newTodo = new Todo({
      createdBy: socket.decoded.userId,
      text: todo.text
    });
    newTodo.save()
    .then((savedTodo) => {
      socket.emit('todo_saved', savedTodo);
    })
    .catch((err) => {
      console.log("DB ERROR", err);
      socket.emit('error_saving_todo', err);
    });
  });

  socket.on('delete_todo', (id) => {
    Todo.findByIdAndRemove(id)
      .then(() => {
        socket.emit('todo_deleted', id);
      })
      .catch((err) => {
        socket.emit('error_deleting_todo', err);
      });
  });
};

// socket.on('add_todo', (todo, fn) => {
//   const newTodo = new Todo(todo);
//   newTodo.save((err, data) => {
//     if (err) console.error(err);
//     console.log('saved succesfully');
//     console.log(JSON.stringify(data));
//     io.emit('todo_added_to_db', {
//       ok: true,
//       payload: { _id: data.id, text: data.text }
//     });
//   });
// });