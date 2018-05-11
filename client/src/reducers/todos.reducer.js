import { ADD_TODO, FETCH_TODOS } from '../actionTypes/todos.types';

const defaultState = [];

export default (state = defaultState, action) => {
  switch (action.type) {
    case FETCH_TODOS:
      return [...action.payload];
    case 'SAVE_TODO':
      return [...state, action.payload];
    default:
      return state;
  }
};
