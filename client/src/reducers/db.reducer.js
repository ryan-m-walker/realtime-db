import uuid from 'uuid';

import { 
  CONNECT_TO_DB, 
  DISCONNECT_FROM_DB, 
  POP_STAGED, 
  STAGE_DB_ACTION, 
  UNSTAGE_DB_ACTION,
  START_SYNCING,
  END_SYNCING
} from '../actionTypes/db.types';
import {
  STAGE_ADD_TODO
} from '../actionTypes/todos.types';

const defaultState = {
  connected: false,
  syncing: false,
  staged: []
};

console.log(STAGE_ADD_TODO);

export default (state = defaultState, action) => {
  switch (action.type) {
    case CONNECT_TO_DB:
      return {
        ...state,
        connected: true
      };
    case DISCONNECT_FROM_DB:
      return {
        ...state,
        connected: false
      };
    case STAGE_ADD_TODO:
      return {
        ...state,
        staged: [
          ...state.staged,
          action.payload
        ]
      }
    case STAGE_DB_ACTION:
      return {
        ...state,
        staged: [
          ...state.staged,
          action.payload
        ]
      };
    case UNSTAGE_DB_ACTION:
      // const [first, ...rest] = state.staged;
      const newStaged = state.staged.filter((item) => {
        return item._id !== action.payload
      });
      return {
        ...state,
        staged: newStaged
      };
    case START_SYNCING: 
      return {
        ...state,
        syncing: true
      };
    case END_SYNCING:
      return {
        ...state,
        syncing: false
      };
    default:
      return state;
  }
};
