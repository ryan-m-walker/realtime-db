import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { loadState, saveState } from './localStorage';

const initialState = loadState();

const store = createStore(rootReducer, initialState, applyMiddleware(thunk));

store.subscribe(() => {
  console.log(store.getState());
  saveState(store.getState());
});

export default store;
