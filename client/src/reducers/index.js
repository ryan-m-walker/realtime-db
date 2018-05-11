import { combineReducers } from 'redux';
import ioReducer from './io.reducer';
import todosReducer from './todos.reducer';

export default combineReducers({
  io: ioReducer,
  todos: todosReducer
});
