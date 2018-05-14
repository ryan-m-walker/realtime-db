import axios from 'axios';
import {
  LOGIN,
  LOGOUT
} from '../actionTypes/user.types';
import {
  beginStoreLocalAutoSave,
  endStoreLocalAutoSave
} from '../store';

export const login = (email, password, history) => (dispatch) => {
  axios.post('/api/auth/login', {email, password})
    .then((res) => {
      beginStoreLocalAutoSave();
      localStorage.setItem('jwt', res.data.jwt);
      dispatch({
        type: LOGIN,
        payload: res.data.user
      });
      history.push('/dashboard');
    })
    .catch((err) => {
      console.log(err);
    });
}

export const logout = (history) => {
  localStorage.removeItem('jwt');
  localStorage.removeItem('state');
  history.push('/');
  endStoreLocalAutoSave();
  return {
    type: LOGOUT
  };
};