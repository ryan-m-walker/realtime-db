import { 
  ADD_TODO, 
  FETCH_TODOS, 
  PUSH_NEW_TODO,
  DELETE_TODO,
  SAVE_TODO,
  STAGE_ADD_TODO,
  PUSH_DELETE_TODO,
  STAGE_DELETE_TODO
} from '../actionTypes/todos.types';
import { 
  STAGE_DB_ACTION, 
  UNSTAGE_DB_ACTION, 
  END_SYNCING 
} from '../actionTypes/db.types';
import socket from '../socket/index.js';
import axios from 'axios';
import uuid from 'uuid';
import store from '../store';
import { unstageDBAction } from './db.actions';

// If there is no socket connection this 
// action generator stages the action on the state
// to be saved to db when reconnected
export const stageAddTodo = (todo) => (dispatch) => {
  dispatch({ 
    type: STAGE_ADD_TODO,
    payload: {
      _id: '__STAGED__' + uuid(),
      type: SAVE_TODO,
      payload: todo
    }
  });
  dispatch(pushNewTodo({
    ...todo,
    _id: '__TEMP__' + uuid()
  }));
};

// If there is a socket connection
// emit the save to the server
export const saveTodo = (todo) => (dispatch) => {
  socket.emit('add_todo', todo);
  dispatch({type: SAVE_TODO});
};


export const pushNewTodo = (todo) => ({
  type: PUSH_NEW_TODO,
  payload: todo
});


export const stageDeleteTodo = (id) => (dispatch) => {
  if (id.indexOf('__TEMP__') !== -1) {
    dispatch(unstageDBAction())
    dispatch(pushDeleteTodo(id));
  } else {
    dispatch({ 
      type: STAGE_DELETE_TODO,
      payload: {
        _id: '__STAGED__' + uuid(),
        type: DELETE_TODO,
        payload: id
      }
    });
    dispatch(pushDeleteTodo(id));
  }
};


export const deleteTodo = (id) => (dispatch) => {
  // Check to see if it's a staged todo
  if (id.indexOf('__TEMP__') !== -1) {
    dispatch(unstageDBAction())
    dispatch(pushDeleteTodo(id));
  } else {
    socket.emit('delete_todo', id);
    dispatch({type: DELETE_TODO});
  }
};


export const pushDeleteTodo = (id) => ({
  type: PUSH_DELETE_TODO,
  payload: id
});



/*
// TODO - FINISH THIS
export const deleteTodo = (todoId) => (dispatch) => {
  if (todoId(0, 4) === 'TEMP') {
    dispatch({
      type: UNSTAGE_DB_ACTION,

    })
  }


  const actionID = uuid();
  if (store.getState().db.connected) {
    dispatch({
      type: 'REQUEST_DELETE_TODO'
    });
    axios.delete('/api/todos/' + todoId)
      .then((res) => {

      })
      .catch(console.error);
  } else {
    dispatch({
      type: STAGE_DB_ACTION,
      payload: {
        _id: actionID,
        type: 'DELETE_TODO',
        payload: todoId
      }
    });
  }
  
};
*/

export const fetchTodos = () => (dispatch) => {
  axios({
    method: 'get',
    url: '/api/todos',
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('jwt')
    }
  })
    .then((todos) => {
      dispatch({
        type: FETCH_TODOS,
        payload: todos.data
      });
      dispatch({
        type: END_SYNCING
      })
    })
    .catch((err) => {
      console.log(err);
    });
};



  // const actionID = uuid();
  // if (store.getState().db.connected) {
  //   dispatch({
  //     type: 'REQUEST_ADD_TODO'
  //   });
  //   axios.post('/api/todos', todo)
  //     .catch(console.error);
  // } else {
  //   dispatch({
  //     type: STAGE_DB_ACTION,
  //     payload: {
  //       _id: actionID,
  //       type: 'ADD_TODO',
  //       payload: todo
  //     }
  //   });
  //   dispatch({
  //     type: PUSH_NEW_TODO,
  //     payload: {
  //       _id: 'TEMP ' + uuid(),
  //       text: todo.text
  //     }
  //   });
  // }