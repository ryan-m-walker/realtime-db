import { ADD_TODO, FETCH_TODOS } from '../actionTypes/todos.types';
import socket from '../socket';

export const addTodo = (todo) => (dispatch) => {
  console.log('calling add todo');
  socket.emit('add_todo', todo, (res) => {
    if (res.ok) {
      dispatch({
        type: ADD_TODO_SUCCESS
      });
    }
  });
};

export const deleteTodo = (todoId) => {
  console.log(`Deleting todo with id ${todoId}`);
  socket.emit('delete_todo', todoId, (res) => {
    
  });
};

export const fetchTodos = () => (dispatch) => {
  fetch('/todos')
    .then((data) => data.json())
    .then((todos) => {
      console.log(todos);
      dispatch({
        type: FETCH_TODOS,
        payload: todos
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
