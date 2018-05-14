import { LOGIN, LOGOUT } from '../actionTypes/user.types';


export default (state=null, action) => {
  switch (action.type) {
    case LOGIN:
      return action.payload;
    case LOGOUT:
      return null;
    default:
      return state;
  }
}