import { combineReducers } from 'redux';
import dbReducer from './db.reducer';
import todosReducer from './todos.reducer';
import userReducer from './user.reducer';

export default combineReducers({
  db: dbReducer,
  todos: todosReducer,
  user: userReducer
});
