import store from '../store';
import {
  PUSH_NEW_TODO
} from '../actionTypes/todos.types';
import { pushNewTodo, pushDeleteTodo } from '../actions/todos.actions';

const todoSocketController = (socket) => {
  
  socket.on('todo_saved', (todo) => {
    store.dispatch(pushNewTodo(todo));
  });

  socket.on('error_saving_todo', (err) => {
    console.log('ERROR SAVING TODO', err);
  });

  socket.on('todo_deleted', (id) => {
    store.dispatch(pushDeleteTodo(id));
  });

  socket.on('error_deleting_todo', (err) => {
    console.log('ERROR DELETING TODO', err);
  });

};

export default todoSocketController;