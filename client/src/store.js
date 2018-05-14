import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { loadState, saveState } from './localStorage';

const initialState = loadState();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  rootReducer, 
  initialState, 
  composeEnhancers(applyMiddleware(thunk))
);

let unsubscribeFromStore;

export const beginStoreLocalAutoSave = () => {
  unsubscribeFromStore = store.subscribe(() => {
    saveState(store.getState());
  });
}

export const endStoreLocalAutoSave = () => {
  unsubscribeFromStore();
}

export default store;
