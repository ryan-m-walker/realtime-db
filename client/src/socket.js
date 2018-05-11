import io from 'socket.io-client';
import store from './store';

import { connectToIO, disconnectFromIO } from './actions/io.actions';
import { fetchTodos } from './actions/todos.actions';

const socket = io();

const initSocket = () => {
  socket.on('connect', () => {
    store.dispatch(connectToIO());
    store.dispatch(fetchTodos());
  });

  socket.on('todo_added_to_db', (data) => {
    console.log('got it yoooo');

    if (data.ok) {
      store.dispatch({
        type: 'SAVE_TODO',
        payload: data.payload
      });
    }
  });

  socket.on('disconnect', () => {
    store.dispatch(disconnectFromIO());
  });
};

export { socket as default, initSocket };
