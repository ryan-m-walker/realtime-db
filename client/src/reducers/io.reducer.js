import { CONNECT_TO_IO, DISCONNECT_FROM_IO } from '../actionTypes/io.types';

const defaultState = {
  connected: false
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case CONNECT_TO_IO:
      return {
        ...state,
        connected: true
      };
    case DISCONNECT_FROM_IO:
      return {
        ...state,
        connected: false
      };
    default:
      return state;
  }
};
