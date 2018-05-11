import React from 'react';
import { render } from 'react-dom';
import { initSocket } from './socket';
import { Provider } from 'react-redux';
import store from './store';
import App from './components/App';
import { addTodo } from './actions/todos.actions';

initSocket();

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
