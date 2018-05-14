import { 
  CONNECT_TO_DB, 
  DISCONNECT_FROM_DB, 
  UNSTAGE_DB_ACTION 
} from '../actionTypes/db.types';

export const connectToDB = () => ({
  type: CONNECT_TO_DB
});

export const disconnectFromDB = () => ({
  type: DISCONNECT_FROM_DB
});

export const unstageDBAction = (id) => ({
  type: UNSTAGE_DB_ACTION,
  payload: id
});