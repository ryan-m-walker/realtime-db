import axios from 'axios';

import store from './store';
import {
  UNSTAGE_DB_ACTION
} from './actionTypes/db.types';
import { fetchTodos, saveTodo } from './actions/todos.actions';
import { SAVE_TODO } from './actionTypes/todos.types';
import { unstageDBAction } from './actions/db.actions';

const actionMap = {
  [SAVE_TODO]: saveTodo
};

const resolveStagedActions = () => {
  const { staged } = store.getState().db; 
  if (staged.length) {
    const { _id, type, payload } = staged[0];
    store.dispatch(actionMap[type](payload));
    store.dispatch(unstageDBAction(_id));
    resolveStagedActions();
  }
  store.dispatch(fetchTodos());
}
  
export default resolveStagedActions;
