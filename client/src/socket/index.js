import io from 'socket.io-client';
import axios from 'axios';

import store, { beginStoreLocalAutoSave } from '../store';
import { connectToDB, disconnectFromDB } from '../actions/db.actions';
import { fetchTodos, addTodo } from '../actions/todos.actions';
import { UNSTAGE_DB_ACTION, START_SYNCING, END_SYNCING } from '../actionTypes/db.types';
import { CLEAR_TODOS } from '../actionTypes/todos.types';

import resolveStagedActions from '../resolveStagedActions';
import todoSocketController from '../socket/todo.socket';

const token = localStorage.getItem('jwt');

const socket = io.connect('http://localhost:3000', {
  query: {token}
});

const initSocket = () => {
  socket.on('connect', () => {
    // AUTHORIZED
    socket.on('authenticated', () => {

      beginStoreLocalAutoSave();
      store.dispatch(connectToDB());
      store.dispatch({ type: START_SYNCING });
      store.dispatch({ type: CLEAR_TODOS });
      resolveStagedActions();

      // socket.on('added_new_todo', (todo) => {
      //   store.dispatch({
      //     type: PUSH_NEW_TODO,
      //     payload: todo
      //   });
      // });

      // Initialize todo listeners
      todoSocketController(socket);
    
      socket.on('delete_todo', (id) => {
        store.dispatch({
          type: 'PUSH_TODO_DELETE',
          payload: id
        });
      });
    
      socket.on('disconnect', () => {
        store.dispatch(disconnectFromDB());
      });

      
    })
    .emit('authenticate', { token });

    // UNAUTHORIZED
    socket.on("unauthorized", (error, callback) => {
      console.log('failed');
      
    });
  });
};


export { socket as default, initSocket };
