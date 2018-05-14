import React from 'react';
import { render } from 'react-dom';

import { Provider } from 'react-redux';
import { initSocket } from './socket/index.js';
import store from './store';
import App from './components/App';
import { addTodo } from './actions/todos.actions';
import './styles/main.scss';

initSocket();

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);