import { ADD_TODO, FETCH_TODOS, PUSH_NEW_TODO, SAVE_TODO, PUSH_DELETE_TODO } from '../actionTypes/todos.types';

const defaultState = [];

export default (state = defaultState, action) => {
  switch (action.type) {
    case FETCH_TODOS:
      return [...action.payload];
    case PUSH_NEW_TODO:
      return [...state, action.payload];
    case SAVE_TODO:
      return state;
    case PUSH_DELETE_TODO:
      const newState = state.filter((item) => 
         item._id !== action.payload
      );
      return newState;
    case 'REMOVE_TEMP_TODO':
      return state.filter((todo) => todo._id !== action.payload);
    case 'CLEAR_TODOS':
      return [];
    case 'PUSH_TODO_DELETE':
      return state.filter((todo) => todo._id !== action.payload);
    default:
      return state;
  }
};
